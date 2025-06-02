// // frontend/src/app/admin/transfers/[transferId]/page.tsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import adminTransferService from '../../../services/admin/transfer';
// import { useAuth } from '../../../hooks/useAuth';
// import { useParams, useRouter } from 'next/navigation';
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from 'next/link';

// interface AdminTransferDetailPageParams {
//     transferId: string;
// }

// const AdminTransferDetailPage = () => {
//     const params = useParams<AdminTransferDetailPageParams>();
//     const { transferId } = params;
//     const [transfer, setTransfer] = useState<any>(null); // Type as 'any' initially, refine later based on your TransferType
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token, isAdmin, loadingAuth } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!token) {
//             return;
//         }
//         if (!isAdmin) {
//             router.push('/dashboard');
//             return;
//         }
//         fetchTransferDetails();
//     }, [transferId, token, isAdmin, router]);

//     const fetchTransferDetails = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const data = await adminTransferService.getAdminTransferById(transferId, token);
//             setTransfer(data);
//         } catch (err: any) {
//             setError(err.message || 'Failed to load transfer details.');
//             console.error("Error fetching transfer details:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleStatusUpdated = () => {
//         fetchTransferDetails();
//     };

//     if (loadingAuth || isLoading) {
//         return (
//             <div className="p-6 container mx-auto max-w-3xl">
//                 <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//                 <div className="space-y-4">
//                     {Array(7).fill(0).map((_, i) => <Skeleton key={i} height={40} />)}
//                 </div>
//             </div>
//         );
//     }

//     if (error || !transfer) {
//         return (
//             <div className="p-6 container mx-auto max-w-3xl text-center">
//                 <h2 className="text-2xl font-semibold mb-4">Transfer Details</h2>
//                 <p className="text-red-500 mb-4">{error || "Transfer details not found."}</p>
//                 <div className="flex justify-center">
//                     <button
//                         onClick={fetchTransferDetails}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         Retry Loading
//                     </button>
//                     <Link href="/admin/transfer" className="ml-4 text-blue-600 underline">Back to Transfers List</Link>
//                 </div>
//             </div>
//         );
//     }

//     if (!isAdmin) {
//         return (
//             <div className="p-6 container mx-auto max-w-3xl text-center">
//                 <h2 className="text-2xl font-semibold mb-6">Unauthorized</h2>
//                 <p className="text-gray-700 mb-8">
//                     You are not authorized to view this page. Please ensure you have administrator privileges.
//                 </p>
//                 <Link href="/dashboard" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Back to Dashboard
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 container mx-auto max-w-3xl">
//             <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//             <Link href="/admin/transfer" className="inline-block mb-4 text-blue-600 underline">Back to Transfers List</Link>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Left Side - Basic Transfer Info */}
//                 <div>
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Information</h3>
//                         <div className="mb-4">
//                             <p className="text-gray-700"><span className="font-semibold">Transfer ID:</span> {transfer._id}</p>
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700"><span className="font-semibold">Status:</span> {transfer.status}</p>
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700"><span className="font-semibold">Created At:</span> {new Date(transfer.createdAt).toLocaleString()}</p>
//                         </div>
//                         {transfer.failureReason && (
//                             <div className="mb-4">
//                                 <p className="text-red-500"><span className="font-semibold text-gray-700">Failure Reason:</span> {transfer.failureReason}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Side - User, Recipient, Amount Details */}
//                 <div>
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>

//                         <div className="mb-6">
//                             <h4 className="text-md font-semibold text-gray-700 mb-2">Sender</h4>
//                             <div className="flex items-center space-x-4">
//                                 {/* Assuming user has a profile image, replace with actual path if available */}
//                                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                                     {transfer.user?.profileImage ? (
//                                         <img src={transfer.user.profileImage} alt="Sender Profile" className="w-full h-full object-cover" />
//                                     ) : (
//                                         <span className="text-xl font-semibold text-gray-600">{transfer.user?.fullName?.charAt(0).toUpperCase() || 'U'}</span>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-700 font-semibold">{transfer.user?.fullName || 'N/A'}</p>
//                                     <p className="text-gray-500">{transfer.user?.email || 'Email N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-6">
//                             <h4 className="text-md font-semibold text-gray-700 mb-2">Recipient</h4>
//                             <div className="flex items-center space-x-4">
//                                 {/* Assuming recipient has a profile image, replace with actual path if available */}
//                                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                                     {transfer.recipient?.profileImage ? (
//                                         <img src={transfer.recipient.profileImage} alt="Recipient Profile" className="w-full h-full object-cover" />
//                                     ) : (
//                                         <span className="text-xl font-semibold text-gray-600">{transfer.recipient?.accountHolderName?.charAt(0).toUpperCase() || 'R'}</span>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-700 font-semibold">{transfer.recipient?.accountHolderName || 'N/A'}</p>
//                                     <p className="text-gray-500">{transfer.recipient?.bankName || 'Bank N/A'}</p>
//                                     <p className="text-gray-500">Account: {transfer.recipient?.accountNumber || 'N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-6">
//                             <h4 className="text-md font-semibold text-gray-700 mb-2">Amount</h4>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Sent:</span> {transfer.sendAmount} {transfer.sendCurrency?.code}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Received:</span> {transfer.receiveAmount} {transfer.receiveCurrency?.code}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Exchange Rate:</span> {transfer.exchangeRate}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">Fees:</span> {transfer.fees} {transfer.sendCurrency?.code}
//                             </p>
//                         </div>

//                         {/* Update Status Section - Conditionally render based on status? */}
//                         <div className="mt-4">
//                             <TransferStatusDropdown transferId={transfer._id} currentStatus={transfer.status} token={token} onStatusUpdated={handleStatusUpdated} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// interface TransferStatusDropdownProps {
//     transferId: string;
//     currentStatus: string;
//     token: string;
//     onStatusUpdated: () => void;
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({ transferId, currentStatus, token, onStatusUpdated }) => {
//     const [status, setStatus] = useState(currentStatus);
//     const [failureReasonInput, setFailureReasonInput] = useState<string>('');
//     const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);

//     useEffect(() => {
//         setStatus(currentStatus);
//     }, [currentStatus]);

//     const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const newStatus = event.target.value;
//         setStatus(newStatus);
//         if (newStatus === 'failed' || newStatus === 'canceled') {
//             setIsFailureReasonOpen(true);
//         } else {
//             setIsFailureReasonOpen(false);
//             setFailureReasonInput(''); // Clear failure reason if status is not failed/canceled
//             await updateTransferStatus(newStatus, null); // No failure reason for other statuses
//         }
//     };

//     const handleFailureReasonSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         await updateTransferStatus(status, failureReasonInput);
//         setIsFailureReasonOpen(false);
//         setFailureReasonInput('');
//     };

//     const updateTransferStatus = async (newStatus: string, failureReason: string | null) => {
//         try {
//             await adminTransferService.updateAdminTransferStatus(transferId, newStatus, failureReason, token);
//             onStatusUpdated(); // Refresh transfer details
//         } catch (error: any) {
//             console.error("Error updating transfer status:", error);
//             alert(`Failed to update status: ${error.message}`);
//             // Revert status in dropdown on failure
//             setStatus(currentStatus);
//         }
//     };

//     return (
//         <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status</label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//                 <select
//                     id="status"
//                     className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={status}
//                     onChange={handleStatusChange}
//                 >
//                     <option value="pending">Pending</option>
//                     <option value="processing">Processing</option>
//                     <option value="completed">Completed</option>
//                     <option value="failed">Failed</option>
//                     <option value="canceled">Canceled</option>
//                 </select>
//             </div>

//             {isFailureReasonOpen && (
//                 <form onSubmit={handleFailureReasonSubmit} className="mt-2">
//                     <label htmlFor="failureReason" className="block text-sm font-medium text-gray-700">Failure/Cancellation Reason</label>
//                     <div className="mt-1">
//                         <textarea
//                             id="failureReason"
//                             rows={3}
//                             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
//                             placeholder="Provide a reason for failure or cancellation"
//                             value={failureReasonInput}
//                             onChange={(e) => setFailureReasonInput(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                         Submit Reason & Update Status
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AdminTransferDetailPage;

// frontend/src/app/admin/transfers/[transferId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import adminTransferService from "../../../services/admin/transfer";
// import adminCurrencyService from "../../../services/admin/currency"; // Import currency service
// import { useAuth } from "../../../hooks/useAuth";
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";

// interface AdminTransferDetailPageParams {
//   transferId: string;
// }

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<any>(null); // Type as 'any' initially, refine later based on your TransferType
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: any }>(
//     {}
//   ); // State to store currencies

//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }
//     fetchTransferDetails();
//     fetchCurrencies(); // Fetch currencies on component mount
//   }, [transferId, token, isAdmin, router]);

//   const fetchTransferDetails = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await adminTransferService.getAdminTransferById(
//         transferId,
//         token
//       );
//       setTransfer(data);
//       console.log("transfer:", data); // Add this line to inspect the transfer object
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfer details.");
//       console.error("Error fetching transfer details:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCurrencies = async () => {
//     try {
//       const currenciesData = await adminCurrencyService.getAllCurrenciesAdmin(
//         token
//       );
//       const map: { [key: string]: any } = {};
//       currenciesData.forEach((currency) => {
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);
//       console.log("currenciesMap:", map); // Add this line
//     } catch (error) {
//       console.error("Error fetching currencies:", error);
//       // Optionally handle error, maybe set an error state for currencies if needed
//     }
//   };

//   const handleStatusUpdated = () => {
//     fetchTransferDetails();
//   };

//   if (loadingAuth || isLoading) {
//     return (
//       <div className="p-6 container mx-auto max-w-3xl">
//         <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//         <div className="space-y-4">
//           {Array(7)
//             .fill(0)
//             .map((_, i) => (
//               <Skeleton key={i} height={40} />
//             ))}
//         </div>
//       </div>
//     );
//   }

//   if (error || !transfer) {
//     return (
//       <div className="container mx-auto max-w-3xl text-center">
//         <h2 className="text-3xl font-semibold mb-4">Transfer Details</h2>
//         <p className="text-red-500 mb-4">
//           {error || "Transfer details not found."}
//         </p>
//         <div className="flex justify-center">
//           <button
//             onClick={fetchTransferDetails}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Retry Loading
//           </button>
//           <Link href="/admin/transfer" className="ml-4 text-blue-600 underline">
//             Back to Transfers List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-6 container mx-auto max-w-3xl text-center">
//         <h2 className="text-2xl font-semibold mb-6">Unauthorized</h2>
//         <p className="text-gray-700 mb-8">
//           You are not authorized to view this page. Please ensure you have
//           administrator privileges.
//         </p>
//         <Link
//           href="/dashboard"
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 container mx-auto max-w-3xl">
//       <h2 className="text-2xl font-semibold mb-6">Transfer Details</h2>
//       <Link
//         href="/admin/transfer"
//         className="inline-block mb-4 text-blue-600 underline"
//       >
//         Back to Transfers List
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Side - Basic Transfer Info */}
//         <div>
//           <div className="bg-white shadow-md border rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Transfer Information
//             </h3>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Transfer ID:</span>
//                 {transfer._id}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Status:</span> {transfer.status}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Created At:</span>
//                 {new Date(transfer.createdAt).toLocaleString()}
//               </p>
//             </div>
//             {transfer.failureReason && (
//               <div className="mb-4">
//                 <p className="text-red-500">
//                   <span className="font-semibold text-gray-700">
//                     Failure Reason:
//                   </span>
//                   {transfer.failureReason}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Side - User, Recipient, Amount Details */}
//         <div>
//           <div className="bg-white shadow-md border rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Details
//             </h3>

//             <div className="mb-6">
//               <h4 className="text-md font-semibold text-gray-700 mb-2">
//                 Sender
//               </h4>
//               <div className="flex items-center space-x-4">
//                 {/* Assuming user has a profile image, replace with actual path if available */}
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                   {transfer.user?.profileImage ? (
//                     <img
//                       src={transfer.user.profileImage}
//                       alt="Sender Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-xl font-semibold text-gray-600">
//                       {transfer.user?.fullName?.charAt(0).toUpperCase() || "U"}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-semibold">
//                     {transfer.user?.fullName || "N/A"}
//                   </p>
//                   <p className="text-gray-500">
//                     {transfer.user?.email || "Email N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-md font-semibold text-gray-700 mb-2">
//                 Recipient
//               </h4>
//               <div className="flex items-center space-x-4">
//                 {/* Assuming recipient has a profile image, replace with actual path if available */}
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                   {transfer.recipient?.profileImage ? (
//                     <img
//                       src={transfer.recipient.profileImage}
//                       alt="Recipient Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-xl font-semibold text-gray-600">
//                       {transfer.recipient?.accountHolderName
//                         ?.charAt(0)
//                         .toUpperCase() || "R"}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-semibold">
//                     {transfer.recipient?.accountHolderName || "N/A"}
//                   </p>
//                   <p className="text-gray-500">
//                     {transfer.recipient?.bankName || "Bank N/A"}
//                   </p>
//                   <p className="text-gray-500">
//                     Account: {transfer.recipient?.accountNumber || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-md font-semibold text-gray-700 mb-2">
//                 Amount
//               </h4>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Sent:</span>
//                 {transfer.sendAmount} {transfer.sendCurrency?.code}
//                 {currenciesMap[transfer.sendCurrency?._id]?.flagImage && (
//                   <img
//                     src={currenciesMap[transfer.sendCurrency?._id]?.flagImage}
//                     alt={`${transfer.sendCurrency?.code} Flag`}
//                     className="inline-block h-5 w-5 ml-1"
//                   />
//                 )}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Received:</span>
//                 {transfer.receiveAmount} {transfer.receiveCurrency?.code}
//                 {currenciesMap[transfer.receiveCurrency?._id]?.flagImage && (
//                   <img
//                     src={
//                       currenciesMap[transfer.receiveCurrency?._id]?.flagImage
//                     }
//                     alt={`${transfer.receiveCurrency?.code} Flag`}
//                     className="inline-block h-5 w-5 ml-1"
//                   />
//                 )}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Exchange Rate:</span>
//                 {transfer.exchangeRate}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Fees:</span> {transfer.fees}
//                 {transfer.sendCurrency?.code}
//               </p>
//             </div>

//             {/* Update Status Section - Conditionally render based on status? */}
//             <div className="mt-4">
//               <TransferStatusDropdown
//                 transferId={transfer._id}
//                 currentStatus={transfer.status}
//                 token={token}
//                 onStatusUpdated={handleStatusUpdated}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface TransferStatusDropdownProps {
//   transferId: string;
//   currentStatus: string;
//   token: string;
//   onStatusUpdated: () => void;
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
//   transferId,
//   currentStatus,
//   token,
//   onStatusUpdated,
// }) => {
//   const [status, setStatus] = useState(currentStatus);
//   const [failureReasonInput, setFailureReasonInput] = useState<string>("");
//   const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);

//   useEffect(() => {
//     setStatus(currentStatus);
//   }, [currentStatus]);

//   const handleStatusChange = async (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const newStatus = event.target.value;
//     setStatus(newStatus);
//     if (newStatus === "failed" || newStatus === "canceled") {
//       setIsFailureReasonOpen(true);
//     } else {
//       setIsFailureReasonOpen(false);
//       setFailureReasonInput(""); // Clear failure reason if status is not failed/canceled
//       await updateTransferStatus(newStatus, null); // No failure reason for other statuses
//     }
//   };

//   const handleFailureReasonSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     await updateTransferStatus(status, failureReasonInput);
//     setIsFailureReasonOpen(false);
//     setFailureReasonInput("");
//   };

//   const updateTransferStatus = async (
//     newStatus: string,
//     failureReason: string | null
//   ) => {
//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newStatus,
//         failureReason,
//         token
//       );
//       onStatusUpdated(); // Refresh transfer details
//     } catch (error: any) {
//       console.error("Error updating transfer status:", error);
//       alert(`Failed to update status: ${error.message}`);
//       // Revert status in dropdown on failure
//       setStatus(currentStatus);
//     }
//   };

//   return (
//     <div>
//       <label
//         htmlFor="status"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Update Status
//       </label>
//       <div className="mt-1 relative rounded-md shadow-sm">
//         <select
//           id="status"
//           className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={status}
//           onChange={handleStatusChange}
//         >
//           <option value="pending">Pending</option>
//           <option value="processing">Processing</option>
//           <option value="completed">Completed</option>
//           <option value="failed">Failed</option>
//           <option value="canceled">Canceled</option>
//         </select>
//       </div>

//       {isFailureReasonOpen && (
//         <form onSubmit={handleFailureReasonSubmit} className="mt-2">
//           <label
//             htmlFor="failureReason"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Failure/Cancellation Reason
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="failureReason"
//               rows={3}
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
//               placeholder="Provide a reason for failure or cancellation"
//               value={failureReasonInput}
//               onChange={(e) => setFailureReasonInput(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Submit Reason & Update Status
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import adminTransferService from "../../../services/admin/transfer";
// import adminCurrencyService from "../../../services/admin/currency";
// import { useAuth } from "../../../hooks/useAuth";
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
// import {
//   ChevronDown,
//   ChevronLeft,
//   Circle,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   User,
//   RefreshCcw,
// } from "lucide-react";
// import { BiTransfer } from "react-icons/bi";
// import { GrTransaction } from "react-icons/gr";

// interface AdminTransferDetailPageParams {
//   transferId: string;
// }

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: any }>(
//     {}
//   );

//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }
//     fetchTransferDetails();
//     fetchCurrencies();
//   }, [transferId, token, isAdmin, router]);

//   const fetchTransferDetails = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await adminTransferService.getAdminTransferById(
//         transferId,
//         token
//       );
//       setTransfer(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfer details.");
//       console.error("Error fetching transfer details:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCurrencies = async () => {
//     try {
//       const currenciesData = await adminCurrencyService.getAllCurrenciesAdmin(
//         token
//       );
//       const map: { [key: string]: any } = {};
//       currenciesData.forEach((currency) => {
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);
//     } catch (error) {
//       console.error("Error fetching currencies:", error);
//     }
//   };

//   const handleStatusUpdated = () => {
//     fetchTransferDetails();
//   };

//   // Function to get status icon
//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "pending":
//         return <Clock className="size-5 text-yellow-500" />;
//       case "processing":
//         return <RefreshCcw className="size-5 text-blue-500 animate-spin" />;
//       case "completed":
//         return <CheckCircle2 className="size-5 text-green-500" />;
//       case "failed":
//         return <XCircle className="size-5 text-red-500" />;
//       case "canceled":
//         return <AlertCircle className="size-5 text-gray-500" />;
//       default:
//         return <Circle className="size-5 text-gray-400" />;
//     }
//   };

//   if (loadingAuth || isLoading) {
//     return (
//       <div className="p-6 container mx-auto max-w-5xl">
//         <div className="flex items-center mb-8">
//           <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
//           <div className="ml-4">
//             <Skeleton className="h-8 w-48" />
//             <Skeleton className="h-4 w-32 mt-2" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-1">
//             <Skeleton className="h-10 w-full mb-4" />
//             <Skeleton className="h-64 w-full rounded-xl" />
//           </div>
//           <div className="lg:col-span-2">
//             <Skeleton className="h-10 w-full mb-4" />
//             <Skeleton className="h-96 w-full rounded-xl" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !transfer) {
//     return (
//       <div className="container mx-auto max-w-5xl p-8 text-center">
//         <h2 className="text-3xl font-semibold mb-4">Transfer Details</h2>
//         <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
//           <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <p className="text-red-500 text-lg mb-4">
//             {error || "Transfer details not found."}
//           </p>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={fetchTransferDetails}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               Retry Loading
//             </button>
//             <Link
//               href="/admin/transfer"
//               className="text-blue-600 font-medium py-2 px-6 rounded-full border border-blue-300 hover:bg-blue-50 transition-all"
//             >
//               Back to Transfers List
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-8 container mx-auto max-w-5xl text-center">
//         <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-8">
//           <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-semibold mb-4 text-orange-700">
//             Unauthorized Access
//           </h2>
//           <p className="text-gray-700 mb-8 max-w-md mx-auto">
//             You do not have the required permissions to view this page. Please
//             ensure you have administrator privileges.
//           </p>
//           <Link
//             href="/dashboard"
//             className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none"
//           >
//             Return to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Calculate the time since creation
//   const getTimeAgo = (dateString: string) => {
//     const createdDate = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor(
//       (now.getTime() - createdDate.getTime()) / 1000
//     );

//     if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   return (
//     <div className="container mx-auto max-w-5xl p-6">
//       <div className="flex items-center mb-8">
//         <Link
//           href="/admin/transfer"
//           className="flex items-center text-primary font-medium transition-colors"
//         >
//           <ChevronLeft className="size-5 mr-1" />
//           Back to Transfers
//         </Link>
//         <div className="mx-4 h-6 border-r border-gray-300"></div>
//         <h2 className="text-2xl font-bold text-main">Transfer Details</h2>
//       </div>

//       <div className="bg-primary/10 rounded-2xl p-4 mb-8 flex items-center">
//         <div className="p-4 bg-white border border-gray-300/50 rounded-full mr-4">
//           {getStatusIcon(transfer.status)}
//         </div>
//         <div className="space-y-1">
//           <p className="text-gray">Transfer ID: {transfer._id}</p>
//           <div className="flex items-center gap-2">
//             <h3 className="font-semibold capitalize">
//               {transfer.status} Transfer
//             </h3>
//             <span className="text-gray">
//               • {getTimeAgo(transfer.createdAt)}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
//         {/* Left Column - Basic Info & Status */}
//         <div className="lg:col-span-1">
//           <div className="bg-white shadow-md border rounded-2xl border-gray-300/50">
//             <div className="bg-primary rounded-t-xl px-6 py-4">
//               <h3 className="text-lg font-medium text-secondary">
//                 Transfer Information
//               </h3>
//             </div>

//             <div className="p-4">
//               <div className="mb-4">
//                 <p className="text-gray mb-1.5">Status</p>
//                 <div className="flex items-center">
//                   {getStatusIcon(transfer.status)}
//                   <span className="ml-2 font-medium capitalize">
//                     {transfer.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <p className=" text-gray-500 mb-1">Transfer ID</p>
//                 <p className="font-mono px-4 py-3 rounded-lg border border-gray-200 break-all">
//                   {transfer._id}
//                 </p>
//               </div>

//               <div className="mb-4">
//                 <p className="text-gray mb-1.5">Created On</p>
//                 <p className="font-medium border border-gray-200 font-mono px-4 py-3 rounded-lg break-all">
//                   {new Date(transfer.createdAt).toLocaleString(undefined, {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>

//               {transfer.failureReason && (
//                 <div className="mb-4">
//                   <p className="text-gray mb-1">Failure Reason</p>
//                   <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md">
//                     <p className="text-red-700">{transfer.failureReason}</p>
//                   </div>
//                 </div>
//               )}

//               <TransferStatusDropdown
//                 transferId={transfer._id}
//                 currentStatus={transfer.status}
//                 token={token}
//                 onStatusUpdated={handleStatusUpdated}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Sender, Recipient, Amount Details */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300/50">
//             <div className="bg-primary px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-secondary">Transfer Details</h3>
//             </div>

//             <div className="px-4 py-4">
//               {/* Sender Information */}
//               <div className="mb-8 bg-blue-100 rounded-xl p-4">
//                 <h4 className="text-md font-semibold text-blue-800 mb-3 flex items-center">
//                   <User className="size-5 mr-2" />
//                   Sender Information
//                 </h4>
//                 <div className="flex items-start">
//                   <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white">
//                     {transfer.user?.profileImage ? (
//                       <img
//                         src={transfer.user.profileImage}
//                         alt="Sender Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-xl font-semibold text-blue-600">
//                         {transfer.user?.fullName?.charAt(0).toUpperCase() ||
//                           "U"}
//                       </span>
//                     )}
//                   </div>
//                   <div className="ml-4">
//                     <p className="font-medium text-main capitalize">
//                       {transfer.user?.fullName || "N/A"}
//                     </p>
//                     <p className="text-gray-600">
//                       {transfer.user?.email || "Email N/A"}
//                     </p>
//                     <div className="mt-2 flex items-center">
//                       <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                         Sender
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Recipient Information */}
//               <div className="mb-8 bg-purple-100 rounded-xl p-4">
//                 <h4 className="text-md font-semibold text-purple-500 mb-3 flex items-center">
//                   <User className="h-5 w-5 mr-2" />
//                   Recipient Information
//                 </h4>
//                 <div className="flex items-start">
//                   <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white">
//                     {transfer.recipient?.profileImage ? (
//                       <img
//                         src={transfer.recipient.profileImage}
//                         alt="Recipient Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-xl font-semibold text-purple-500">
//                         {transfer.recipient?.accountHolderName
//                           ?.charAt(0)
//                           .toUpperCase() || "R"}
//                       </span>
//                     )}
//                   </div>
//                   <div className="ml-4">
//                     <p className="font-medium text-main">
//                       {transfer.recipient?.accountHolderName || "N/A"}
//                     </p>
//                     <div className="space-y-1 mt-1">
//                       <p className="text-gray-600 flex items-center">
//                         <span className="inline-block w-20 font-medium text-gray-500">
//                           Bank:
//                         </span>
//                         <span>{transfer.recipient?.bankName || "N/A"}</span>
//                       </p>
//                       <p className="text-gray-600 flex items-center">
//                         <span className="inline-block w-20 font-medium text-gray-500">
//                           Account:
//                         </span>
//                         <span className="font-mono">
//                           {transfer.recipient?.accountNumber || "N/A"}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Amount Information */}
//               <div className="bg-green-100 rounded-xl p-4">
//                 <h4 className="text-md flex items-center gap-2 font-semibold text-green-800 mb-3">
//                 <GrTransaction />
//                   Transaction Details
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-white rounded-lg border border-green-100 shadow-sm p-4">
//                     <p className="font-medium text-gray-500 mb-1">
//                       Sent Amount
//                     </p>
//                     <div className="flex items-center">
//                       <span className="text-xl font-bold">
//                         {transfer.sendAmount}
//                       </span>
//                       <span className="ml-2 font-medium text-gray">
//                         {transfer.sendCurrency?.code}
//                       </span>
//                       {currenciesMap[transfer.sendCurrency?._id]?.flagImage && (
//                         <img
//                           src={
//                             currenciesMap[transfer.sendCurrency?._id]?.flagImage
//                           }
//                           alt={`${transfer.sendCurrency?.code} Flag`}
//                           className="ml-2 size-5 rounded-full"
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-lg border border-green-100 shadow-sm p-4">
//                     <p className="font-medium text-gray-500 mb-1">
//                       Received Amount
//                     </p>
//                     <div className="flex items-center">
//                       <span className="text-xl font-bold">
//                         {transfer.receiveAmount}
//                       </span>
//                       <span className="ml-2 font-medium text-gray-600">
//                         {transfer.receiveCurrency?.code}
//                       </span>
//                       {currenciesMap[transfer.receiveCurrency?._id]
//                         ?.flagImage && (
//                         <img
//                           src={
//                             currenciesMap[transfer.receiveCurrency?._id]
//                               ?.flagImage
//                           }
//                           alt={`${transfer.receiveCurrency?.code} Flag`}
//                           className="ml-2 size-4 rounded-full"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-4">
//                   <div className="bg-white bg-opacity-70 rounded-lg p-3">
//                     <p className="font-medium text-gray-500">
//                       Exchange Rate
//                     </p>
//                     <p className="font-mono font-medium mt-2">
//                       1 {transfer.sendCurrency?.code} = {transfer.exchangeRate}
//                       {transfer.receiveCurrency?.code}
//                     </p>
//                   </div>

//                   <div className="bg-white bg-opacity-70 rounded-lg p-3">
//                     <p className="font-medium text-gray-500">Fees</p>
//                     <p className="font-medium mt-2">
//                       {transfer.fees} {transfer.sendCurrency?.code}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface TransferStatusDropdownProps {
//   transferId: string;
//   currentStatus: string;
//   token: string;
//   onStatusUpdated: () => void;
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
//   transferId,
//   currentStatus,
//   token,
//   onStatusUpdated,
// }) => {
//   const [status, setStatus] = useState(currentStatus);
//   const [failureReasonInput, setFailureReasonInput] = useState<string>("");
//   const [isFailureReasonOpen, setIsFailureReasonOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setStatus(currentStatus);
//   }, [currentStatus]);

//   useEffect(() => {
//     // Close dropdown when clicking outside
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleStatusChange = async (newStatus: string) => {
//     setStatus(newStatus);
//     setIsDropdownOpen(false);

//     if (newStatus === "failed" || newStatus === "canceled") {
//       setIsFailureReasonOpen(true);
//     } else {
//       setIsFailureReasonOpen(false);
//       setFailureReasonInput(""); // Clear failure reason if status is not failed/canceled
//       await updateTransferStatus(newStatus, null); // No failure reason for other statuses
//     }
//   };

//   const handleFailureReasonSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     await updateTransferStatus(status, failureReasonInput);
//     setIsFailureReasonOpen(false);
//     setFailureReasonInput("");
//   };

//   const updateTransferStatus = async (
//     newStatus: string,
//     failureReason: string | null
//   ) => {
//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newStatus,
//         failureReason,
//         token
//       );
//       onStatusUpdated(); // Refresh transfer details
//     } catch (error: any) {
//       console.error("Error updating transfer status:", error);
//       alert(`Failed to update status: ${error.message}`);
//       // Revert status in dropdown on failure
//       setStatus(currentStatus);
//     }
//   };

//   // Status option configurations
//   const statusOptions = [
//     {
//       value: "pending",
//       label: "Pending",
//       color: "bg-yellow-500",
//       icon: <Clock className="size-4" />,
//     },
//     {
//       value: "processing",
//       label: "Processing",
//       color: "bg-blue-500",
//       icon: <RefreshCcw className="size-4" />,
//     },
//     {
//       value: "completed",
//       label: "Completed",
//       color: "bg-green-500",
//       icon: <CheckCircle2 className="size-4" />,
//     },
//     {
//       value: "failed",
//       label: "Failed",
//       color: "bg-red-500",
//       icon: <XCircle className="size-4" />,
//     },
//     {
//       value: "canceled",
//       label: "Canceled",
//       color: "bg-gray-500",
//       icon: <AlertCircle className="size-4" />,
//     },
//   ];

//   // Find current status option
//   const currentOption =
//     statusOptions.find((option) => option.value === status) || statusOptions[0];

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray mb-1.5">
//         Update Transfer Status
//       </label>

//       <div className="relative" ref={dropdownRef}>
//         <button
//           type="button"
//           className="w-full flex items-center justify-between cursor-pointer p-3 border border-gray-300 rounded-lg bg-white transition-colors focus:outline-none"
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           <div className="flex items-center">
//             <span
//               className={`inline-block size-3 rounded-full ${currentOption.color} mr-2 `}
//             ></span>
//             <span className="capitalize">{currentOption.label}</span>
//           </div>
//           <ChevronDown
//             className={`size-5 text-gray transition-transform ${
//               isDropdownOpen ? "transform rotate-180" : ""
//             }`}
//           />
//         </button>

//         {isDropdownOpen && (
//           <div className="absolute z-10 mt-1.5 w-full origin-top-right rounded-md bg-white shadow-sm border border-gray-200 focus:outline-none overflow-hidden">
//             <div className="space-y-1">
//               {statusOptions.map((option) => (
//                 <div
//                   key={option.value}
//                   className={`px-4 py-3.5 flex items-center cursor-pointer hover:bg-gray-100 transition-colors ${
//                     status === option.value ? "bg-blue-50" : ""
//                   }`}
//                   onClick={() => handleStatusChange(option.value)}
//                 >
//                   <span
//                     className={`inline-block size-3 rounded-full ${option.color} mr-2`}
//                   ></span>
//                   <span className="capitalize">{option.label}</span>
//                   {status === option.value && (
//                     <CheckCircle2 className="size-5 text-primary ml-auto" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {isFailureReasonOpen && (
//         <form
//           onSubmit={handleFailureReasonSubmit}
//           className="mt-4 bg-red-50 p-4 rounded-lg"
//         >
//           <label className="inline-block text-sm capitalize font-medium text-error mb-2">
//             Please provide a reason for
//             {status === "failed" ? "failure" : "cancellation"}
//           </label>
//           <textarea
//             className="w-full p-2 border border-error/50 text-main font-medium rounded-lg focus:outline-none resize-none bg-white"
//             rows={3}
//             placeholder={`Why is this transfer being ${
//               status === "failed" ? "failed" : "canceled"
//             }?`}
//             value={failureReasonInput}
//             onChange={(e) => setFailureReasonInput(e.target.value)}
//             required
//           />
//           <div className="flex justify-end mt-3 gap-2">
//             <button
//               type="button"
//               className="w-full py-2.5 cursor-pointer text-sm font-medium text-main bg-white border border-gray-300 rounded-lg focus:outline-none"
//               onClick={() => {
//                 setIsFailureReasonOpen(false);
//                 setStatus(currentStatus);
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="w-full py-2.5 cursor-pointer text-sm font-medium text-white bg-error border border-transparent rounded-lg hover:bg-error focus:outline-none"
//             >
//               Confirm {status === "failed" ? "Failure" : "Cancellation"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import adminTransferService from "../../../services/admin/transfer";
// import adminCurrencyService from "../../../services/admin/currency";
// import { useAuth } from "../../../hooks/useAuth";
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   User,
//   RefreshCw,
//   ChevronDown,
//   ChevronRight,
//   Check,
//   CreditCard,
//   Building,
//   DollarSign,
//   Calendar,
//   Info,
// } from "lucide-react";
// import { GrTransaction } from "react-icons/gr";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"; // Assuming Shadcn UI Select
// import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button

// interface AdminTransferDetailPageParams {
//   transferId: string;
// }

// // Placeholder/Example for TransferStatusDropdown - replace with actual component if needed
// // This uses Shadcn UI components as suggested by the imports in the original code.
// const TransferStatusDropdown = ({
//   transferId,
//   currentStatus,
//   token,
//   onStatusUpdated,
// }: {
//   transferId: string;
//   currentStatus: string;
//   token: string | null;
//   onStatusUpdated: () => void;
// }) => {
//   const [selectedStatus, setSelectedStatus] = useState(currentStatus);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [updateError, setUpdateError] = useState<string | null>(null);
//   const statuses = ["pending", "processing", "completed", "failed", "canceled"];
//   const isFinalStatus = ["completed", "failed", "canceled"].includes(
//     currentStatus
//   );

//   useEffect(() => {
//     setSelectedStatus(currentStatus); // Sync with parent updates
//   }, [currentStatus]);

//   const handleStatusChange = async (newStatus: string) => {
//     if (newStatus === currentStatus || isUpdating || !token || isFinalStatus)
//       return;

//     setIsUpdating(true);
//     setUpdateError(null);

//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newStatus,
//         null, // Explicitly pass null for the failureReason parameter
//         token // Pass the token in the correct (fourth) position
//       );
//       console.log(`Transfer ${transferId} status updated to ${newStatus}`);
//       setSelectedStatus(newStatus); // Update local state on success
//       onStatusUpdated(); // Refresh details on parent page
//     } catch (err: any) {
//       console.error("Failed to update status:", err);
//       setUpdateError(err.message || "Failed to update status.");
//       // No need to revert selectedStatus as Select component manages its own value display
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <Select
//         value={selectedStatus}
//         onValueChange={handleStatusChange}
//         disabled={isUpdating || isFinalStatus}
//       >
//         <SelectTrigger
//           className={`w-full ${isUpdating ? "cursor-not-allowed" : ""} ${
//             isFinalStatus ? "bg-slate-100 cursor-not-allowed opacity-70" : ""
//           }`}
//         >
//           <SelectValue placeholder="Select status" />
//           {isUpdating && (
//             <RefreshCw className="ml-auto mr-2 size-4 animate-spin text-slate-500" />
//           )}
//         </SelectTrigger>
//         <SelectContent>
//           {statuses.map((status) => (
//             <SelectItem
//               key={status}
//               value={status}
//               disabled={status === currentStatus}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       {updateError && (
//         <p className="text-xs text-rose-600 mt-1">{updateError}</p>
//       )}
//       {isFinalStatus && (
//         <p className="text-xs text-slate-500 mt-1 italic">
//           Final status reached, cannot be changed.
//         </p>
//       )}
//     </div>
//   );
// };

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: any }>(
//     {}
//   );

//   useEffect(() => {
//     // Wait for auth check to complete
//     if (loadingAuth) return;

//     if (!token) {
//       // Redirect to login if not authenticated
//       // Consider showing a message or redirecting to login
//       router.push("/login"); // Or appropriate login route
//       return;
//     }
//     if (!isAdmin) {
//       // Redirect non-admins
//       router.push("/dashboard");
//       return;
//     }
//     // Fetch data only if authenticated and admin
//     fetchTransferDetails();
//     fetchCurrencies();
//   }, [transferId, token, isAdmin, loadingAuth, router]); // Added loadingAuth dependency

//   const fetchTransferDetails = async () => {
//     if (!token) return; // Ensure token exists before fetching
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await adminTransferService.getAdminTransferById(
//         transferId,
//         token
//       );
//       setTransfer(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfer details.");
//       console.error("Error fetching transfer details:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCurrencies = async () => {
//     if (!token) return; // Ensure token exists before fetching
//     try {
//       const currenciesData = await adminCurrencyService.getAllCurrenciesAdmin(
//         token
//       );
//       const map: { [key: string]: any } = {};
//       currenciesData.forEach((currency: any) => {
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);
//     } catch (error) {
//       console.error("Error fetching currencies:", error);
//     }
//   };

//   const handleStatusUpdated = () => {
//     fetchTransferDetails(); // Re-fetch details after status update
//   };

//   // Function to get status badge
//   const getStatusBadge = (status: string) => {
//     const variants = {
//       pending: "bg-amber-100 text-amber-800 border-amber-200",
//       processing: "bg-blue-100 text-blue-800 border-blue-200",
//       completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
//       failed: "bg-rose-100 text-rose-800 border-rose-200",
//       canceled: "bg-slate-100 text-slate-800 border-slate-200",
//     };

//     const icons = {
//       pending: <Clock className="size-4 mr-1.5" />,
//       processing: <RefreshCw className="size-4 mr-1.5 animate-spin" />,
//       completed: <CheckCircle className="size-4 mr-1.5" />,
//       failed: <XCircle className="size-4 mr-1.5" />,
//       canceled: <AlertCircle className="size-4 mr-1.5" />,
//     };

//     const variant =
//       variants[status as keyof typeof variants] || variants.pending;
//     const icon = icons[status as keyof typeof icons] || icons.pending;

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variant}`}
//       >
//         {icon}
//         <span className="capitalize">{status}</span>
//       </span>
//     );
//   };

//   // Calculate the time since creation/update
//   const getTimeAgo = (dateString: string | undefined) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//     if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   // Display skeleton while auth is loading or data is fetching
//   if (loadingAuth || isLoading) {
//     return (
//       <div className="container mx-auto max-w-6xl p-8">
//         <div className="flex items-center mb-8">
//           <Skeleton className="h-10 w-40" />
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="flex items-center">
//             <Skeleton className="h-12 w-12 rounded-full" />
//             <div className="ml-4">
//               <Skeleton className="h-6 w-48" />
//               <Skeleton className="h-4 w-32 mt-2" />
//             </div>
//             <div className="ml-auto">
//               <Skeleton className="h-8 w-32 rounded-full" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-1">
//             <Skeleton className="h-96 w-full rounded-xl" />
//           </div>
//           <div className="lg:col-span-2">
//             <Skeleton className="h-[500px] w-full rounded-xl" />
//             {/* Adjusted height */}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Display error state
//   if (error) {
//     return (
//       <div className="container mx-auto max-w-6xl p-8">
//         <div className="bg-white shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mb-6">
//             <XCircle className="h-8 w-8 text-rose-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900">
//             Unable to Load Transfer
//           </h2>
//           <p className="text-slate-600 text-lg mb-6 max-w-lg mx-auto">
//             {error ||
//               "The requested transfer details could not be found or accessed."}
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Button onClick={fetchTransferDetails} variant="default">
//               <RefreshCw className="size-4 mr-2" />
//               Retry
//             </Button>
//             <Button asChild variant="outline">
//               <Link href="/admin/transfer">
//                 <ArrowLeft className="size-4 mr-2" />
//                 Back to Transfers
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Display access restricted if user is not admin (should have been redirected by useEffect, but as fallback)
//   if (!isAdmin) {
//     return (
//       <div className="container mx-auto max-w-6xl p-8">
//         <div className="bg-white shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900">
//             Access Restricted
//           </h2>
//           <p className="text-slate-600 mb-6 max-w-lg mx-auto">
//             This page requires administrator privileges. You don't have the
//             necessary permissions to view this content.
//           </p>
//           <Button asChild variant="secondary">
//             <Link href="/dashboard">
//               <ArrowLeft className="size-4 mr-2" />
//               Return to Dashboard
//             </Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // Display transfer details if data loaded successfully and user is admin
//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <div className="container mx-auto max-w-6xl p-6 py-8">
//         {/* Header with breadcrumb */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div>
//             <div className="flex items-center text-sm text-slate-500 mb-2 flex-wrap">
//               <Link href="/admin" className="hover:text-indigo-600">
//                 Admin
//               </Link>
//               <ChevronRight className="size-4 mx-1 flex-shrink-0" />
//               <Link href="/admin/transfer" className="hover:text-indigo-600">
//                 Transfers
//               </Link>
//               <ChevronRight className="size-4 mx-1 flex-shrink-0" />
//               <span
//                 className="text-slate-800 font-medium truncate"
//                 title={transfer._id}
//               >
//                 Details ({transfer._id?.substring(0, 8)}...)
//               </span>
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
//               Transfer Details
//             </h1>
//           </div>

//           <Button
//             asChild
//             variant="link"
//             className="text-indigo-600 hover:text-indigo-800 p-0 h-auto self-start sm:self-center"
//           >
//             <Link href="/admin/transfer">
//               <ArrowLeft className="size-5 mr-1.5" />
//               All Transfers
//             </Link>
//           </Button>
//         </div>
//         {/* Overview Card */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center">
//               <div className="mr-4">{getStatusBadge(transfer.status)}</div>
//               <div>
//                 <p className="text-sm font-medium text-slate-500">
//                   Transfer ID
//                 </p>
//                 <p className="font-mono text-slate-800 text-sm break-all">
//                   {transfer._id}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
//               <div className="bg-slate-50 rounded-lg px-4 py-2 flex items-center border border-slate-100">
//                 <Calendar className="size-4 text-slate-500 mr-2 flex-shrink-0" />
//                 <div>
//                   <p className="text-xs text-slate-500">Created</p>
//                   <p className="text-sm font-medium">
//                     {getTimeAgo(transfer.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-slate-50 rounded-lg px-4 py-2 flex items-center border border-slate-100">
//                 <DollarSign className="size-4 text-slate-500 mr-2 flex-shrink-0" />
//                 <div>
//                   <p className="text-xs text-slate-500">Amount Sent</p>
//                   <p className="text-sm font-medium">
//                     {transfer.sendAmount?.toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                     {transfer.sendCurrency?.code}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Status & Action */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
//                 <h3 className="text-lg font-semibold text-white">
//                   Transfer Status
//                 </h3>
//               </div>

//               <div className="p-6">
//                 {/* Current Status */}
//                 <div className="mb-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <h4 className="text-sm font-medium text-slate-500">
//                       Current Status
//                     </h4>
//                     <span className="text-xs font-medium text-slate-500">
//                       Updated {getTimeAgo(transfer.updatedAt)}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     {getStatusBadge(transfer.status)}
//                   </div>
//                 </div>

//                 {/* Timeline - Simplified */}
//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-slate-500 mb-4">
//                     Timeline
//                   </h4>
//                   <ul className="space-y-3">
//                     <li className="flex items-start">
//                       <CheckCircle className="size-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
//                       <div>
//                         <p className="text-sm font-medium text-slate-800">
//                           Transfer Created
//                         </p>
//                         <p className="text-xs text-slate-500">
//                           {new Date(transfer.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                     </li>
//                     {["processing", "completed", "failed", "canceled"].includes(
//                       transfer.status
//                     ) && (
//                       <li className="flex items-start">
//                         {transfer.status === "processing" && (
//                           <RefreshCw className="size-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0 animate-spin" />
//                         )}
//                         {transfer.status === "completed" && (
//                           <CheckCircle className="size-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
//                         )}
//                         {transfer.status === "failed" && (
//                           <XCircle className="size-4 text-rose-500 mr-2 mt-0.5 flex-shrink-0" />
//                         )}
//                         {transfer.status === "canceled" && (
//                           <AlertCircle className="size-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
//                         )}
//                         {transfer.status !== "pending" && (
//                           <div>
//                             <p className="text-sm font-medium text-slate-800 capitalize">
//                               {transfer.status}
//                             </p>
//                             <p className="text-xs text-slate-500">
//                               {new Date(transfer.updatedAt).toLocaleString()}
//                             </p>
//                           </div>
//                         )}
//                       </li>
//                     )}
//                   </ul>
//                 </div>

//                 {/* Failure Reason if applicable */}
//                 {transfer.status === "failed" && transfer.failureReason && (
//                   <div className="mb-6 bg-rose-50 border border-rose-100 rounded-lg p-4">
//                     <h4 className="flex items-center text-rose-700 font-medium mb-2 text-sm">
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                       Failure Reason
//                     </h4>
//                     <p className="text-rose-700 text-sm">
//                       {transfer.failureReason}
//                     </p>
//                   </div>
//                 )}
//                 {transfer.status === "canceled" &&
//                   transfer.cancellationReason && (
//                     <div className="mb-6 bg-slate-50 border border-slate-100 rounded-lg p-4">
//                       <h4 className="flex items-center text-slate-700 font-medium mb-2 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-2" />
//                         Cancellation Reason
//                       </h4>
//                       <p className="text-slate-700 text-sm">
//                         {transfer.cancellationReason || "No reason provided."}
//                       </p>
//                     </div>
//                   )}

//                 {/* Admin Actions */}
//                 <div className="pt-4 border-t border-slate-100">
//                   <h4 className="text-sm font-medium text-slate-500 mb-3">
//                     Update Status
//                   </h4>
//                   <TransferStatusDropdown
//                     transferId={transfer._id}
//                     currentStatus={transfer.status}
//                     token={token}
//                     onStatusUpdated={handleStatusUpdated}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Transfer ID Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="px-6 py-4 border-b border-slate-100">
//                 <h3 className="text-lg font-semibold text-slate-800">
//                   Transfer Information
//                 </h3>
//               </div>
//               <div className="p-6 space-y-4">
//                 <div>
//                   <p className="text-sm font-medium text-slate-500 mb-1">
//                     Transfer ID
//                   </p>
//                   <div className="font-mono text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 break-all">
//                     {transfer._id}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-slate-500 mb-1">
//                     Created On
//                   </p>
//                   <div className="font-mono text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
//                     {new Date(transfer.createdAt).toLocaleString(undefined, {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       second: "2-digit",
//                     })}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-slate-500 mb-1">
//                     Last Updated
//                   </p>
//                   <div className="font-mono text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
//                     {new Date(transfer.updatedAt).toLocaleString(undefined, {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       second: "2-digit",
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* End Left Column */}
//           {/* Right Column - Transfer Details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
//                 <h3 className="text-lg font-semibold text-white">
//                   Transfer Details
//                 </h3>
//               </div>
//               <div className="p-6">
//                 {/* Sender Information */}
//                 <div className="mb-8">
//                   <h4 className="inline-flex items-center bg-sky-50 text-sky-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-sky-100">
//                     <User className="size-4 mr-1.5" />
//                     Sender Information
//                   </h4>

//                   <div className="flex items-start sm:items-center bg-white rounded-xl border border-slate-200 p-4 flex-col sm:flex-row">
//                     <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-sky-100 text-sky-600 font-bold text-xl flex-shrink-0 mb-3 sm:mb-0">
//                       {transfer.user?.profileImage ? (
//                         <img
//                           src={transfer.user.profileImage}
//                           alt="Sender"
//                           className="w-full h-full object-cover rounded-full"
//                           onError={(e) =>
//                             (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                               transfer.user?.fullName || "U"
//                             )}&background=random`)
//                           } // Fallback avatar
//                         />
//                       ) : (
//                         <span>
//                           {transfer.user?.fullName?.charAt(0).toUpperCase() ||
//                             "U"}
//                         </span>
//                       )}
//                     </div>

//                     <div className="ml-0 sm:ml-4 flex-grow w-full">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//                         <h5 className="font-semibold text-slate-900 text-lg break-words mr-2">
//                           {transfer.user?.fullName || "N/A"}
//                         </h5>
//                         <Badge
//                           variant="outline"
//                           className="bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 text-xs mt-1 sm:mt-0 flex-shrink-0"
//                         >
//                           Sender
//                         </Badge>
//                       </div>
//                       <p className="text-slate-500 text-sm break-words">
//                         {transfer.user?.email || "Email not available"}
//                       </p>

//                       <div className="mt-3 pt-3 border-t border-slate-100">
//                         <div className="flex flex-wrap gap-x-6 gap-y-3">
//                           <div className="flex items-center">
//                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                               <User className="w-4 h-4 text-slate-500" />
//                             </div>
//                             <div>
//                               <p className="text-xs text-slate-500">User ID</p>
//                               <p
//                                 className="text-sm font-medium font-mono text-slate-700"
//                                 title={transfer.user?._id}
//                               >
//                                 {transfer.user?._id
//                                   ? transfer.user._id.substring(0, 8) + "..."
//                                   : "N/A"}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex items-center">
//                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                               <Calendar className="w-4 h-4 text-slate-500" />
//                             </div>
//                             <div>
//                               <p className="text-xs text-slate-500">
//                                 Member Since
//                               </p>
//                               <p className="text-sm font-medium text-slate-700">
//                                 {transfer.user?.createdAt
//                                   ? new Date(
//                                       transfer.user.createdAt
//                                     ).toLocaleDateString()
//                                   : "N/A"}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* End Sender Info */}
//                 {/* Recipient Information */}
//                 <div className="mb-8">
//                   <h4 className="inline-flex items-center bg-purple-50 text-purple-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-purple-100">
//                     <User className="size-4 mr-1.5" />
//                     Recipient Information
//                   </h4>

//                   <div className="flex flex-col bg-white rounded-xl border border-slate-200 p-4">
//                     <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
//                       <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 font-bold text-xl flex-shrink-0 mb-3 sm:mb-0">
//                         {transfer.recipient?.profileImage ? ( // Assuming recipient might have an image stored, adjust if not
//                           <img
//                             src={transfer.recipient.profileImage}
//                             alt="Recipient"
//                             className="w-full h-full object-cover rounded-full"
//                             onError={(e) =>
//                               (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                 transfer.recipient?.accountHolderName || "R"
//                               )}&background=random`)
//                             } // Fallback avatar
//                           />
//                         ) : (
//                           <span>
//                             {transfer.recipient?.accountHolderName
//                               ?.charAt(0)
//                               .toUpperCase() || "R"}
//                           </span>
//                         )}
//                       </div>

//                       <div className="ml-0 sm:ml-4 flex-grow w-full">
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//                           <h5 className="font-semibold text-slate-900 text-lg break-words mr-2">
//                             {transfer.recipient?.accountHolderName || "N/A"}
//                           </h5>
//                           <Badge
//                             variant="outline"
//                             className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 text-xs mt-1 sm:mt-0 flex-shrink-0"
//                           >
//                             Recipient
//                           </Badge>
//                         </div>
//                         {transfer.recipient?.email && (
//                           <p className="text-slate-500 text-sm break-words">
//                             {transfer.recipient.email}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3 border-t border-slate-100">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">Bank Name</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.bankName || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">Account Holder Name</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.accountHolderName || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">Bank Name</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.bankName || "N/A"}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">Nick Name</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.nickname || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">Account Type</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.accountType || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">email</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.email || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <Building className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">IFSC Code</p>
//                           <p className="text-sm font-medium text-slate-700 break-words">
//                             {transfer.recipient?.ifscCode || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                           <CreditCard className="w-4 h-4 text-slate-500" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500">
//                             Account Number
//                           </p>
//                           <p className="text-sm font-medium font-mono text-slate-700 break-words">
//                             {transfer.recipient?.accountNumber || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       {transfer.recipient?.swiftCode && (
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                             <Info className="w-4 h-4 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-slate-500">
//                               SWIFT/BIC Code
//                             </p>
//                             <p className="text-sm font-medium font-mono text-slate-700 break-words">
//                               {transfer.recipient.swiftCode}
//                             </p>
//                           </div>
//                         </div>
//                       )}

//                       {transfer.recipient?.iban && (
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0">
//                             <Info className="w-4 h-4 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-slate-500">IBAN</p>
//                             <p className="text-sm font-medium font-mono text-slate-700 break-words">
//                               {transfer.recipient.iban}
//                             </p>
//                           </div>
//                         </div>
//                       )}

//                       {transfer.recipient?.address && (
//                         <div className="flex items-start md:col-span-2">

//                           {/* Allow address to span full width if long */}
//                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                             <Info className="w-4 h-4 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="text-xs text-slate-500">Address</p>
//                             <p className="text-sm font-medium text-slate-700 break-words">
//                               {transfer.recipient.address}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {/* End Recipient Info */}
//                 {/* Transaction Details */}
//                 <div>
//                   <h4 className="inline-flex items-center bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-100">
//                     <GrTransaction className="size-4 mr-1.5" />
//                     Transaction Details
//                   </h4>

//                   <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//                     {/* Exchange Information */}
//                     <div className="p-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                         {/* Sent Amount */}
//                         <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-100">
//                           <p className="text-slate-500 text-sm font-medium mb-1">
//                             Sent Amount
//                           </p>
//                           <div className="flex items-baseline">
//                             <div className="text-2xl font-bold text-slate-900 mr-2">
//                               {transfer.sendAmount?.toLocaleString(undefined, {
//                                 minimumFractionDigits: 2,
//                                 maximumFractionDigits: 2,
//                               })}
//                             </div>
//                             <div className="flex items-center text-sm">
//                               <span className="text-slate-600 font-medium mr-1">
//                                 {transfer.sendCurrency?.code}
//                               </span>
//                               {transfer.sendCurrency?._id &&
//                                 currenciesMap[transfer.sendCurrency._id]
//                                   ?.flagImage && (
//                                   <img
//                                     src={
//                                       currenciesMap[transfer.sendCurrency._id]
//                                         ?.flagImage
//                                     }
//                                     alt={transfer.sendCurrency?.code}
//                                     className="w-5 h-5 rounded-full object-cover border border-slate-200"
//                                     loading="lazy"
//                                   />
//                                 )}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Received Amount */}
//                         <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-100">
//                           <p className="text-slate-500 text-sm font-medium mb-1">
//                             Recipient Gets (approx)
//                           </p>
//                           <div className="flex items-baseline">
//                             <div className="text-2xl font-bold text-slate-900 mr-2">
//                               {transfer.receiveAmount?.toLocaleString(
//                                 undefined,
//                                 {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 }
//                               )}
//                             </div>
//                             <div className="flex items-center text-sm">
//                               <span className="text-slate-600 font-medium mr-1">
//                                 {transfer.receiveCurrency?.code}
//                               </span>
//                               {transfer.receiveCurrency?._id &&
//                                 currenciesMap[transfer.receiveCurrency._id]
//                                   ?.flagImage && (
//                                   <img
//                                     src={
//                                       currenciesMap[
//                                         transfer.receiveCurrency._id
//                                       ]?.flagImage
//                                     }
//                                     alt={transfer.receiveCurrency?.code}
//                                     className="w-5 h-5 rounded-full object-cover border border-slate-200"
//                                     loading="lazy"
//                                   />
//                                 )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Additional Info */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 border-t border-slate-100">
//                       <div className="p-4">
//                         <p className="text-sm text-slate-500 mb-1">
//                           Exchange Rate
//                         </p>
//                         <p className="font-mono text-slate-800 font-medium text-sm">
//                           1 {transfer.sendCurrency?.code} ≈
//                           {transfer.exchangeRate?.toLocaleString(undefined, {
//                             minimumFractionDigits: 4,
//                             maximumFractionDigits: 6,
//                           })}
//                           {transfer.receiveCurrency?.code}
//                         </p>
//                       </div>
//                       <div className="p-4">
//                         <p className="text-sm text-slate-500 mb-1">Fee</p>
//                         <p className="font-mono text-slate-800 font-medium text-sm">
//                           {transfer.fees?.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {transfer.sendCurrency?.code}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Summary */}
//                     <div className="bg-slate-50 p-4 border-t border-slate-200">
//                       <div className="flex items-center justify-between">
//                         <p className="text-sm font-medium text-slate-600">
//                           Total Debit Amount
//                         </p>
//                         <p className="font-semibold text-lg text-slate-900">
//                           {(
//                             transfer.sendAmount + (transfer.fees || 0)
//                           )?.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {transfer.sendCurrency?.code}
//                         </p>
//                       </div>
//                       <p className="text-xs text-slate-500 mt-1 text-right">
//                         (Amount + Fee)
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* End Transaction Details */}
//               </div>
//               {/* End Right Column Content Padding */}
//             </div>
//             {/* End Right Column Card */}
//           </div>
//           {/* End Right Column */}
//         </div>
//         {/* End Main Grid */}
//       </div>
//       {/* End Container */}
//     </div> /* End Page Wrapper */
//   );
// };

// export default AdminTransferDetailPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import adminCurrencyService from "../../../services/admin/currency"; // Adjust path
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button
// import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
// import Link from "next/link";
// import { Toaster } from "@/components/ui/sonner"; // Import Toaster for notifications

// // Import the new components
// import TransferHeader from "../../components/transfers/TransferHeader"; // Adjust path
// import TransferOverviewCard from "../../components/transfers/TransferOverviewCard"; // Adjust path
// import TransferStatusSection from "../../components/transfers/TransferStatusSection"; // Adjust path
// import TransferInfoCard from "../../components/transfers/TransferInfoCard"; // Adjust path
// import SenderInfoCard from "../../components/transfers/SenderInfoCard"; // Adjust path
// import RecipientInfoCard from "../../components/transfers/RecipientInfoCard"; // Adjust path
// import TransactionDetailsCard from "../../components/transfers/TransactionDetailsCard"; // Adjust path

// interface AdminTransferDetailPageParams {
//   transferId: string;
// }

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto p-6 py-8">
//     {/* Header Skeleton */}
//     <div className="flex items-center mb-8">
//       <Skeleton className="h-10 w-40" />
//       <Skeleton className="h-8 w-32 ml-auto rounded" />
//     </div>

//     {/* Overview Skeleton */}
//     <Skeleton className="h-28 w-full rounded-xl mb-8" />

//     {/* Main Grid Skeleton */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-1 space-y-6">
//         <Skeleton className="h-96 w-full rounded-xl" />
//         <Skeleton className="h-64 w-full rounded-xl" />
//       </div>
//       <div className="lg:col-span-2">
//         <Skeleton className="h-[700px] w-full rounded-xl" />
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//   <div className="container mx-auto p-8">
//     <div className="bg-white shadow-sm rounded-xl p-8 text-center">
//       <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mb-6">
//         <XCircle className="h-8 w-8 text-rose-600" />
//       </div>
//       <h2 className="text-2xl font-semibold mb-3 text-slate-900">
//         Unable to Load Transfer
//       </h2>
//       <p className="text-slate-600 text-lg mb-6 max-w-lg mx-auto">
//         {error || "The requested transfer details could not be found or accessed."}
//       </p>
//       <div className="flex flex-wrap justify-center gap-4">
//         <Button onClick={onRetry} variant="default">
//           <RefreshCw className="size-4 mr-2" />
//           Retry
//         </Button>
//         <Button asChild variant="outline">
//           <Link href="/admin/transfer">
//             <ArrowLeft className="size-4 mr-2" />
//             Back to Transfers
//           </Link>
//         </Button>
//       </div>
//     </div>
//   </div>
// );

// // --- Access Restricted Component ---
// const AccessRestrictedDisplay = () => (
//      <div className="container mx-auto p-8">
//         <div className="bg-white shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900">
//             Access Restricted
//           </h2>
//           <p className="text-slate-600 mb-6 max-w-lg mx-auto">
//             This page requires administrator privileges. You do not have the
//             necessary permissions to view this content.
//           </p>
//           <Button asChild variant="secondary">
//             <Link href="/dashboard">
//               <ArrowLeft className="size-4 mr-2" />
//               Return to Dashboard
//             </Link>
//           </Button>
//         </div>
//       </div>
// );

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: any }>({});

//   const fetchData = async () => {
//     if (!token || !transferId) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       const [transferData, currenciesData] = await Promise.all([
//         adminTransferService.getAdminTransferById(transferId, token),
//         adminCurrencyService.getAllCurrenciesAdmin(token),
//       ]);

//       setTransfer(transferData);

//       const map: { [key: string]: any } = {};
//       currenciesData.forEach((currency: any) => {
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);

//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || err.message || "Failed to load transfer details.";
//       setError(errorMessage);
//       console.error("Error fetching transfer details:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (loadingAuth) return; // Wait for auth check

//     if (!token) {
//       router.push("/login?redirect=/admin/transfer/" + transferId); // Redirect to login if not authenticated
//       return;
//     }
//     if (!isAdmin) {
//       // Don't set error here, let the component render the AccessRestrictedDisplay
//       setIsLoading(false); // Stop loading as we know the status
//       return;
//     }

//     fetchData(); // Fetch data if authenticated and admin

//   }, [transferId, token, isAdmin, loadingAuth, router]);

//   const handleStatusUpdated = () => {
//     fetchData(); // Re-fetch details after status update
//   };

//   // --- Render Logic ---

//   if (loadingAuth || (isLoading && !error && isAdmin)) {
//     return <LoadingSkeleton />;
//   }

//   if (!isAdmin && !loadingAuth) {
//       return <AccessRestrictedDisplay />;
//   }

//   if (error) {
//     return <ErrorDisplay error={error} onRetry={fetchData} />;
//   }

//   if (!transfer) {
//     // This case might happen briefly or if fetch fails without error state set properly
//     return (
//          <div className="container mx-auto p-8 text-center text-slate-600">
//             Transfer data not found.
//          </div>
//      )
//   }

//   // --- Main Content Render ---
//   return (
//     <div className="min-h-screen">
//       <Toaster richColors position="top-right" />
//       <div className="container mx-auto p-6 py-8">
//         <TransferHeader transferId={transfer._id} />
//         <TransferOverviewCard transfer={transfer} />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-1 space-y-6">
//             <TransferStatusSection
//               transfer={transfer}
//               token={token}
//               onStatusUpdated={handleStatusUpdated}
//             />
//             <TransferInfoCard transfer={transfer} />
//           </div>

//           {/* Right Column */}
//           <div className="lg:col-span-2">
//              <div className="rounded-xl bg-white dark:bg-primarybox border overflow-hidden">
//               <div className="bg-lightgray dark:bg-secondarybox px-6 py-4">
//                 <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
//                   Detailed Information
//                 </h3>
//               </div>
//               <div className="p-6 space-y-8">
//                  <SenderInfoCard user={transfer.user} />
//                  <RecipientInfoCard recipient={transfer.recipient} />
//                  <TransactionDetailsCard transfer={transfer} currenciesMap={currenciesMap} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// "use client";
// import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import adminCurrencyService from "../../../services/admin/currency"; // Adjust path
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button
// import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
// import Link from "next/link";
// import { Toaster } from "@/components/ui/sonner"; // Import Toaster for notifications

// // Import the new components
// import TransferHeader from "../../components/transfers/TransferHeader"; // Adjust path
// import TransferOverviewCard from "../../components/transfers/TransferOverviewCard"; // Adjust path
// import TransferStatusSection from "../../components/transfers/TransferStatusSection"; // Adjust path
// import TransferInfoCard from "../../components/transfers/TransferInfoCard"; // Adjust path
// import SenderInfoCard from "../../components/transfers/SenderInfoCard"; // Adjust path
// import RecipientInfoCard from "../../components/transfers/RecipientInfoCard"; // Adjust path
// import TransactionDetailsCard from "../../components/transfers/TransactionDetailsCard"; // Adjust path

// // --- Define Interfaces ---

// // Basic User structure (adjust based on actual data)
// interface User {
//   _id: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   // Add other relevant user fields
// }

// // Basic Recipient structure (adjust based on actual data)
// interface Recipient {
//   _id: string;
//   name?: string;
//   email?: string;
//   accountNumber?: string;
//   bankName?: string;
//   // Add other relevant recipient fields
// }

// // Basic Currency structure (adjust based on actual data)
// interface Currency {
//   _id: string;
//   name: string;
//   code: string;
//   symbol: string;
//   // Add other relevant currency fields
// }

// // Transfer structure (adjust based on actual data)
// interface Transfer {
//   _id: string;
//   user: User; // Use the User interface
//   recipient: Recipient; // Use the Recipient interface
//   sourceCurrency: string; // Assuming currency IDs are strings
//   targetCurrency: string; // Assuming currency IDs are strings
//   sourceAmount: number;
//   targetAmount: number;
//   status: string; // e.g., 'pending', 'completed', 'failed'
//   exchangeRate?: number;
//   fee?: number;
//   createdAt: string; // Or Date if you parse it
//   updatedAt: string; // Or Date
//   // Add any other fields present in your transfer object
//   reference?: string;
//   paymentMethod?: string;
//   transferPurpose?: string;
//   // ... other fields
// }

// interface AdminTransferDetailPageParams {
//   transferId: string;
// }

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//     // ... (Skeleton code remains the same)
//     <div className="container mx-auto p-6 py-8">
//     {/* Header Skeleton */}
//     <div className="flex items-center mb-8">
//       <Skeleton className="h-10 w-40" />
//       <Skeleton className="h-8 w-32 ml-auto rounded" />
//     </div>

//     {/* Overview Skeleton */}
//     <Skeleton className="h-28 w-full rounded-xl mb-8" />

//     {/* Main Grid Skeleton */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-1 space-y-6">
//         <Skeleton className="h-96 w-full rounded-xl" />
//         <Skeleton className="h-64 w-full rounded-xl" />
//       </div>
//       <div className="lg:col-span-2">
//         <Skeleton className="h-[700px] w-full rounded-xl" />
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//     // ... (ErrorDisplay code remains the same)
//       <div className="container mx-auto p-8">
//     <div className="bg-white shadow-sm rounded-xl p-8 text-center">
//       <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mb-6">
//         <XCircle className="h-8 w-8 text-rose-600" />
//       </div>
//       <h2 className="text-2xl font-semibold mb-3 text-slate-900">
//         Unable to Load Transfer
//       </h2>
//       <p className="text-slate-600 text-lg mb-6 max-w-lg mx-auto">
//         {error || "The requested transfer details could not be found or accessed."}
//       </p>
//       <div className="flex flex-wrap justify-center gap-4">
//         <Button onClick={onRetry} variant="default">
//           <RefreshCw className="size-4 mr-2" />
//           Retry
//         </Button>
//         <Button asChild variant="outline">
//           <Link href="/admin/transfer">
//             <ArrowLeft className="size-4 mr-2" />
//             Back to Transfers
//           </Link>
//         </Button>
//       </div>
//     </div>
//   </div>
// );

// // --- Access Restricted Component ---
// const AccessRestrictedDisplay = () => (
//     // ... (AccessRestrictedDisplay code remains the same)
//      <div className="container mx-auto p-8">
//         <div className="bg-white shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900">
//             Access Restricted
//           </h2>
//           <p className="text-slate-600 mb-6 max-w-lg mx-auto">
//             This page requires administrator privileges. You do not have the
//             necessary permissions to view this content.
//           </p>
//           <Button asChild variant="secondary">
//             <Link href="/dashboard">
//               <ArrowLeft className="size-4 mr-2" />
//               Return to Dashboard
//             </Link>
//           </Button>
//         </div>
//       </div>
// );

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   // Use the defined Transfer interface for state
//   const [transfer, setTransfer] = useState<Transfer | null>(null); // FIX: Use Transfer type
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   // Use the defined Currency interface for the map values
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: Currency }>({}); // FIX: Use Currency type

//   // Wrap fetchData in useCallback
//   const fetchData = useCallback(async () => { // FIX: Wrap in useCallback
//     // Guard clauses remain the same
//     if (!token || !transferId) {
//         console.log("FetchData aborted: Missing token or transferId");
//         return;
//     }
//     if (!isAdmin) { // Added this check inside fetchData as well for safety, although useEffect handles redirection
//         console.log("FetchData aborted: User is not admin");
//         setIsLoading(false); // Ensure loading stops if called somehow when not admin
//         return;
//     }

//     console.log(`Fetching data for transferId: ${transferId} with token...`);
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Assume service functions return appropriately typed data
//       // If not, you might need to cast or adjust service function return types
//       const [transferData, currenciesData]: [Transfer, Currency[]] = await Promise.all([
//         adminTransferService.getAdminTransferById(transferId, token),
//         adminCurrencyService.getAllCurrenciesAdmin(token),
//       ]);

//        console.log("Fetched Transfer Data:", transferData);
//        console.log("Fetched Currencies Data:", currenciesData);

//       setTransfer(transferData);

//       // Build the currencies map with the correct type
//       const map: { [key: string]: Currency } = {};
//       currenciesData.forEach((currency: Currency) => { // FIX: Use Currency type
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);
//        console.log("Built Currencies Map:", map);

//     } catch (err: unknown) { // FIX: Use unknown for caught error
//       // Type-safe error handling
//       let errorMessage = "Failed to load transfer details.";
//       if (typeof err === 'object' && err !== null) {
//            // Check for common error structures (e.g., Axios error)
//            // Using 'as any' here is a pragmatic choice if the structure is known
//            // but complex to type guard fully, but ideally use specific error types
//            // if available from the library.
//            const potentialError = err as any;
//            errorMessage = potentialError.response?.data?.message || potentialError.message || errorMessage;
//       } else if (err instanceof Error) {
//          errorMessage = err.message;
//       } else if (typeof err === 'string') {
//          errorMessage = err;
//       }

//       setError(errorMessage);
//       console.error("Error fetching transfer details:", err); // Log the original error too
//     } finally {
//       setIsLoading(false);
//       console.log("Fetching process finished.");
//     }
//   // Add dependencies for useCallback
//   }, [token, transferId, isAdmin]); // FIX: Add dependencies

//   useEffect(() => {
//     if (loadingAuth) {
//         console.log("useEffect waiting: Auth loading");
//         return; // Wait for auth check
//     }

//     if (!token) {
//         console.log("useEffect redirecting: No token found");
//         router.push("/login?redirect=/admin/transfer/" + transferId); // Redirect to login if not authenticated
//         return;
//     }
//     if (!isAdmin) {
//       // Don't set error here, let the component render the AccessRestrictedDisplay
//       console.log("useEffect stopped: User is not admin");
//       setIsLoading(false); // Stop loading as we know the status
//       return;
//     }

//     console.log("useEffect triggering fetchData");
//     fetchData(); // Fetch data if authenticated and admin

//   // Add fetchData to the dependency array
//   }, [transferId, token, isAdmin, loadingAuth, router, fetchData]); // FIX: Add fetchData dependency

//   const handleStatusUpdated = () => {
//     console.log("Status updated, re-fetching data...");
//     fetchData(); // Re-fetch details after status update
//   };

//   // --- Render Logic ---

//   if (loadingAuth || (isLoading && !error && isAdmin)) {
//      console.log("Rendering: Loading Skeleton");
//     return <LoadingSkeleton />;
//   }

//   // Check for admin status *after* auth loading is complete
//   if (!loadingAuth && !isAdmin) {
//       console.log("Rendering: Access Restricted");
//       return <AccessRestrictedDisplay />;
//   }

//   if (error) {
//      console.log("Rendering: Error Display");
//     return <ErrorDisplay error={error} onRetry={fetchData} />;
//   }

//   if (!transfer) {
//     // This case might happen briefly or if fetch fails without error state set properly
//      console.log("Rendering: Transfer Not Found (after loading/error checks)");
//     return (
//          <div className="container mx-auto p-8 text-center text-slate-600">
//             Transfer data not found or could not be loaded. Please try refreshing.
//          </div>
//      )
//   }

//   // --- Main Content Render ---
//   console.log("Rendering: Main Content for Transfer ID:", transfer._id);
//   return (
//     <div className="min-h-screen">
//       <Toaster richColors position="top-right" />
//       <div className="container mx-auto p-6 py-8">
//         {/* Pass typed data to components */}
//         <TransferHeader transferId={transfer._id} />
//         <TransferOverviewCard transfer={transfer} />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-1 space-y-6">
//             <TransferStatusSection
//               transfer={transfer}
//               token={token!} // Assert token is not null here as checks are done above
//               onStatusUpdated={handleStatusUpdated}
//             />
//             <TransferInfoCard transfer={transfer} />
//           </div>

//           {/* Right Column */}
//           <div className="lg:col-span-2">
//              <div className="rounded-xl bg-white dark:bg-primarybox border overflow-hidden">
//               <div className="bg-lightgray dark:bg-secondarybox px-6 py-4">
//                 <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
//                   Detailed Information
//                 </h3>
//               </div>
//               <div className="p-6 space-y-8">
//                  <SenderInfoCard user={transfer.user} />
//                  <RecipientInfoCard recipient={transfer.recipient} />
//                  <TransactionDetailsCard transfer={transfer} currenciesMap={currenciesMap} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// "use client";
// import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import adminCurrencyService from "../../../services/admin/currency"; // Adjust path
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button
// import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
// import Link from "next/link";
// import { Toaster } from "@/components/ui/sonner"; // Import Toaster for notifications

// // Import the new components
// import TransferHeader from "../../components/transfers/TransferHeader"; // Adjust path
// import TransferOverviewCard from "../../components/transfers/TransferOverviewCard"; // Adjust path
// import TransferStatusSection from "../../components/transfers/TransferStatusSection"; // Adjust path
// import TransferInfoCard from "../../components/transfers/TransferInfoCard"; // Adjust path
// import SenderInfoCard from "../../components/transfers/SenderInfoCard"; // Adjust path
// import RecipientInfoCard from "../../components/transfers/RecipientInfoCard"; // Adjust path
// import TransactionDetailsCard from "../../components/transfers/TransactionDetailsCard"; // Adjust path

// // --- Define Interfaces ---

// // Basic User structure (adjust based on actual data)
// interface User {
//   _id: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   // Add other relevant user fields
// }

// // Basic Recipient structure (adjust based on actual data)
// interface Recipient {
//   _id: string;
//   name?: string;
//   email?: string;
//   accountNumber?: string;
//   bankName?: string;
//   // Add other relevant recipient fields
// }

// // Basic Currency structure (adjust based on actual data)
// interface Currency {
//   _id: string;
//   name: string;
//   code: string;
//   symbol: string;
//   // Add other relevant currency fields
// }

// // Transfer structure (adjust based on actual data)
// interface Transfer {
//   _id: string;
//   user: User; // Use the User interface
//   recipient: Recipient; // Use the Recipient interface
//   sourceCurrency: string; // Assuming currency IDs are strings
//   targetCurrency: string; // Assuming currency IDs are strings
//   sourceAmount: number;
//   targetAmount: number;
//   status: string; // e.g., 'pending', 'completed', 'failed'
//   exchangeRate?: number;
//   fee?: number;
//   createdAt: string; // Or Date if you parse it
//   updatedAt: string; // Or Date
//   // Add any other fields present in your transfer object
//   reference?: string;
//   paymentMethod?: string;
//   transferPurpose?: string;
//   // ... other fields
// }

// // FIX 1: Correctly type the params for useParams
// // Ensure it satisfies the Record<string, string | string[]> constraint
// interface AdminTransferDetailPageParams extends Record<string, string | string[]> {
//   transferId: string;
// }

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//     <div className="container mx-auto p-6 py-8">
//     {/* Header Skeleton */}
//     <div className="flex items-center mb-8">
//       <Skeleton className="h-10 w-40" />
//       <Skeleton className="h-8 w-32 ml-auto rounded" />
//     </div>

//     {/* Overview Skeleton */}
//     <Skeleton className="h-28 w-full rounded-xl mb-8" />

//     {/* Main Grid Skeleton */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-1 space-y-6">
//         <Skeleton className="h-96 w-full rounded-xl" />
//         <Skeleton className="h-64 w-full rounded-xl" />
//       </div>
//       <div className="lg:col-span-2">
//         <Skeleton className="h-[700px] w-full rounded-xl" />
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//     <div className="container mx-auto p-8">
//       <div className="bg-white dark:bg-secondarybox shadow-sm rounded-xl p-8 text-center">
//         <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mb-6">
//           <XCircle className="h-8 w-8 text-rose-600" />
//         </div>
//         <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
//           Unable to Load Transfer
//         </h2>
//         <p className="text-slate-600 dark:text-neutral-300 text-lg mb-6 max-w-lg mx-auto">
//           {error || "The requested transfer details could not be found or accessed."}
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <Button onClick={onRetry} variant="default">
//             <RefreshCw className="size-4 mr-2" />
//             Retry
//           </Button>
//           <Button asChild variant="outline">
//             <Link href="/admin/transfer">
//               <ArrowLeft className="size-4 mr-2" />
//               Back to Transfers
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
// );

// // --- Access Restricted Component ---
// const AccessRestrictedDisplay = () => (
//      <div className="container mx-auto p-8">
//         <div className="bg-white dark:bg-secondarybox shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
//             Access Restricted
//           </h2>
//           <p className="text-slate-600 dark:text-neutral-300 mb-6 max-w-lg mx-auto">
//             This page requires administrator privileges. You do not have the
//             necessary permissions to view this content.
//           </p>
//           <Button asChild variant="secondary">
//             <Link href="/dashboard">
//               <ArrowLeft className="size-4 mr-2" />
//               Return to Dashboard
//             </Link>
//           </Button>
//         </div>
//       </div>
// );

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>(); // Use the corrected interface
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<Transfer | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   // FIX 2: Use 'loading' instead of 'loadingAuth'
//   const { token, isAdmin, loading } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: Currency }>({});

//   const fetchData = useCallback(async () => {
//     if (!token || !transferId) {
//         console.log("FetchData aborted: Missing token or transferId");
//         setIsLoading(false); // Stop loading if prerequisites aren't met
//         return;
//     }
//     // No need to check isAdmin here again as useEffect handles redirection
//     // if (!isAdmin) { ... }

//     console.log(`Fetching data for transferId: ${transferId} with token...`);
//     setIsLoading(true);
//     setError(null);
//     try {
//       const [transferData, currenciesData]: [Transfer, Currency[]] = await Promise.all([
//         adminTransferService.getAdminTransferById(transferId, token),
//         adminCurrencyService.getAllCurrenciesAdmin(token),
//       ]);

//        console.log("Fetched Transfer Data:", transferData);
//        console.log("Fetched Currencies Data:", currenciesData);

//       setTransfer(transferData);

//       const map: { [key: string]: Currency } = {};
//       currenciesData.forEach((currency: Currency) => {
//         map[currency._id] = currency;
//       });
//       setCurrenciesMap(map);
//        console.log("Built Currencies Map:", map);

//     } catch (err: unknown) {
//       let errorMessage = "Failed to load transfer details.";
//       if (typeof err === 'object' && err !== null) {
//            const potentialError = err as any; // Use 'as any' carefully or type guard better
//            errorMessage = potentialError.response?.data?.message || potentialError.message || errorMessage;
//       } else if (err instanceof Error) {
//          errorMessage = err.message;
//       } else if (typeof err === 'string') {
//          errorMessage = err;
//       }

//       setError(errorMessage);
//       console.error("Error fetching transfer details:", err);
//     } finally {
//       setIsLoading(false);
//       console.log("Fetching process finished.");
//     }
//   }, [token, transferId]); // Removed isAdmin from here, useEffect handles the guard

//   useEffect(() => {
//     // Use 'loading' from useAuth
//     if (loading) {
//         console.log("useEffect waiting: Auth loading");
//         return; // Wait for auth check
//     }

//     if (!token) {
//         console.log("useEffect redirecting: No token found");
//         router.push("/auth/login?redirect=/admin/transfer/" + transferId); // Ensure login path is correct
//         return;
//     }

//     if (!isAdmin) {
//       console.log("useEffect stopped: User is not admin, rendering access restricted.");
//       // Allow rendering AccessRestrictedDisplay, don't set error
//       setIsLoading(false); // Stop loading as we know the user is not admin
//       return;
//     }

//     // Only fetch if token exists, user is admin, and auth is loaded
//     console.log("useEffect triggering fetchData");
//     fetchData();

//   // Depend on loading state from useAuth
//   }, [transferId, token, isAdmin, loading, router, fetchData]);

//   const handleStatusUpdated = () => {
//     console.log("Status updated, re-fetching data...");
//     fetchData(); // Re-fetch details after status update
//   };

//   // --- Render Logic ---

//   // Use 'loading' from useAuth for initial skeleton display
//   if (loading) {
//      console.log("Rendering: Loading Skeleton (Auth Check)");
//     return <LoadingSkeleton />;
//   }

//   // Check for admin status *after* auth loading is complete
//   if (!isAdmin) {
//       console.log("Rendering: Access Restricted");
//       return <AccessRestrictedDisplay />;
//   }

//   // Show loading skeleton if fetching data (and user is admin)
//   if (isLoading && !error) {
//      console.log("Rendering: Loading Skeleton (Data Fetch)");
//     return <LoadingSkeleton />;
//   }

//   if (error) {
//      console.log("Rendering: Error Display");
//     return <ErrorDisplay error={error} onRetry={fetchData} />;
//   }

//   if (!transfer) {
//     // This case handles potential race conditions or fetch failures not caught by error state
//      console.log("Rendering: Transfer Not Found (after loading/error checks)");
//     return (
//          <div className="container mx-auto p-8 text-center text-slate-600 dark:text-neutral-300">
//             Transfer data not found or could not be loaded. Please try refreshing.
//          </div>
//      )
//   }

//   // --- Main Content Render ---
//   console.log("Rendering: Main Content for Transfer ID:", transfer._id);
//   return (
//     <div className="min-h-screen bg-background"> {/* Add background color */}
//       <Toaster richColors position="top-right" />
//       <div className="container mx-auto p-6 py-8">
//         <TransferHeader transferId={transfer._id} />
//         <TransferOverviewCard transfer={transfer} />

//         <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Added mt-8 */}
//           {/* Left Column */}
//           <div className="lg:col-span-1 space-y-6">
//             <TransferStatusSection
//               transfer={transfer}
//               token={token!} // Assert token is not null here as checks are done above
//               onStatusUpdated={handleStatusUpdated}
//             />
//             <TransferInfoCard transfer={transfer} />
//           </div>

//           {/* Right Column */}
//           <div className="lg:col-span-2">
//              <div className="rounded-xl bg-white dark:bg-primarybox border dark:border-secondarybox overflow-hidden shadow-sm"> {/* Added shadow and border */}
//               <div className="bg-lightgray dark:bg-secondarybox px-6 py-4 border-b dark:border-b-neutral-700"> {/* Added border-b */}
//                 <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
//                   Detailed Information
//                 </h3>
//               </div>
//               <div className="p-6 space-y-8">
//                  <SenderInfoCard user={transfer.user} />
//                  <RecipientInfoCard recipient={transfer.recipient} />
//                  <TransactionDetailsCard transfer={transfer} currenciesMap={currenciesMap} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// // Last latest code
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import adminCurrencyService from "../../../services/admin/currency"; // Adjust path
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
// import Link from "next/link";
// import { Toaster } from "@/components/ui/sonner";

// // Import the new components
// import TransferHeader from "../../components/transfers/TransferHeader"; // Adjust path
// import TransferOverviewCard from "../../components/transfers/TransferOverviewCard"; // Adjust path
// import TransferStatusSection from "../../components/transfers/TransferStatusSection"; // Adjust path
// import TransferInfoCard from "../../components/transfers/TransferInfoCard"; // Adjust path
// import SenderInfoCard from "../../components/transfers/SenderInfoCard"; // Adjust path
// import RecipientInfoCard from "../../components/transfers/RecipientInfoCard"; // Adjust path
// import TransactionDetailsCard from "../../components/transfers/TransactionDetailsCard"; // Adjust path

// // --- Define Interfaces (Ideally move to a central types file) ---

// // Basic User structure
// interface User {
//   _id: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   // Add other relevant user fields
// }

// // Basic Recipient structure
// interface Recipient {
//   _id: string;
//   name?: string;
//   email?: string;
//   accountNumber?: string;
//   bankName?: string;
//   // Add other relevant recipient fields
// }

// // Basic Currency structure (used for map and potentially TransactionDetailsCard)
// interface Currency {
//   _id: string; // Essential for map key
//   name: string;
//   code: string;
//   symbol: string;
//   flagImage?: string | null;
// }

// // CurrencyRef structure expected by TransferOverviewCard
// interface CurrencyRef {
//     _id?: string;
//     code?: string | null;
// }

// // Transfer structure - Align with fetched data
// interface Transfer {
//   _id: string;
//   user: User;
//   recipient: Recipient;
//   sourceCurrency: string; // Usually Currency ID as string
//   targetCurrency: string; // Usually Currency ID as string
//   sourceAmount: number;
//   targetAmount: number;
//   status: string;
//   exchangeRate?: number;
//   fee?: number;
//   fees?: number; // Alternative naming for fee
//   createdAt: string;
//   updatedAt: string;
//   reference?: string;
//   paymentMethod?: string;
//   transferPurpose?: string;
//   // These might exist in API response, potentially pre-populated or just IDs
//   sendAmount?: number | null; // Might be same as sourceAmount
//   receiveAmount?: number | null; // Might be same as targetAmount
//   sendCurrency?: string | { _id?: string; code: string; } | null; // Can be ID string or object
//   receiveCurrency?: string | { _id?: string; code: string; } | null; // Can be ID string or object
// }

// // Params Type
// interface AdminTransferDetailPageParams extends Record<string, string | string[]> {
//   transferId: string;
// }

// // --- Loading Skeleton Component (Using divs and Tailwind) ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8">
//     {" "}
//     {/* Container and padding */}
//     {/* Header Skeleton */}
//    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//              <div>
//                <Skeleton className="h-4 w-64 mb-3 rounded " /> {/* Breadcrumbs */}
//                <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//              </div>
//              <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}
//            </div>
//     {/* Overview Card Skeleton (as div) */}
//     <div className="bg-lightgray dark:bg-primarybox rounded-xl  sm:p-6 p-4 mb-8">
//       {" "}
//       {/* Mimic Card */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         {/* Left Side Skeleton */}
//         <div className="flex items-center gap-4">
//           <Skeleton className="h-8 w-24 rounded-full" /> {/* Status Badge */}
//           <div className="space-y-1.5">
//             <Skeleton className="h-3 w-16 rounded" /> {/* Label */}
//             <Skeleton className="h-4 w-32 rounded" /> {/* Value */}
//           </div>
//         </div>
//         {/* Right Side Skeleton */}
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mt-4 md:mt-0">
//           <Skeleton className="h-14 w-40 rounded-lg" /> {/* Date Box */}
//           <Skeleton className="h-14 w-44 rounded-lg" /> {/* Amount Box */}
//         </div>
//       </div>
//     </div>

//     {/* Main Grid Skeleton */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {" "}
//       {/* Use correct gap */}
//       {/* Left Column Skeleton */}
//       <div className="lg:col-span-1 space-y-6">
//         {/* TransferStatusSection Skeleton (as div) */}
//         <div className="bg-white dark:bg-primarybox rounded-xl overflow-hidden">
//           {" "}
//           {/* Mimic Card */}
//           {/* Mimic CardHeader */}
//           <div className="bg-lightgray dark:bg-primarybox px-6 py-4">
//             <Skeleton className="h-6 w-3/5 rounded" />
//           </div>
//           {/* Mimic CardContent */}
//           <div className="sm:p-6 p-4 space-y-6">
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-1/3 rounded" />
//               <Skeleton className="h-8 w-28 rounded-full" /> {/* Status */}
//             </div>
//             <div className="space-y-3">
//               <Skeleton className="h-4 w-1/4 rounded mb-3" />{" "}
//               {/* Timeline Title */}
//               <Skeleton className="h-10 w-full rounded" />{" "}
//               {/* Timeline Item 1 */}
//               <Skeleton className="h-10 w-full rounded" />{" "}
//               {/* Timeline Item 2 */}
//             </div>
//             {/* Mimic Footer/Action area */}
//             <div className="pt-4">
//               <Skeleton className="h-4 w-1/3 rounded mb-3" />{" "}
//               {/* Action title */}
//               <Skeleton className="h-10 w-full rounded-md" /> {/* Dropdown */}
//             </div>
//           </div>
//         </div>

//         {/* TransferInfoCard Skeleton (as div) */}
//         <div className="bg-white dark:bg-primarybox rounded-xl overflow-hidden">
//           {" "}
//           {/* Mimic Card */}
//           {/* Mimic CardHeader */}
//           <div className="bg-lightgray dark:bg-primarybox px-6 py-4">
//             <Skeleton className="h-6 w-1/2 rounded" />
//           </div>
//           {/* Mimic CardContent */}
//           <div className="sm:p-6 p-4 space-y-4">
//             <Skeleton className="h-14 w-full rounded-lg" />
//             <Skeleton className="h-14 w-full rounded-lg" />
//             <Skeleton className="h-14 w-full rounded-lg" />
//           </div>
//         </div>
//       </div>
//       {/* Right Column Skeleton */}
//       <div className="lg:col-span-2">
//         {/* Wrapper div (mimics Card) */}
//         <div className="rounded-xl bg-white dark:bg-primarybox overflow-hidden">
//           {/* Mimic CardHeader */}
//           <div className="bg-lightgray dark:bg-primarybox px-6 py-4">
//             <Skeleton className="h-6 w-48 rounded" />{" "}
//             {/* Detailed Info Title */}
//           </div>
//           {/* Mimic CardContent */}
//           <div className="sm:p-6 p-4 space-y-8">
//             {/* SenderInfoCard Skeleton (as div) */}
//             <div>
//               <Skeleton className="h-6 w-40 rounded-full mb-4" />{" "}
//               {/* Title Badge */}
//               {/* Inner container mimicking Card structure */}
//               <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
//                 <Skeleton className="size-12 sm:size-16 rounded-full flex-shrink-0 mb-3 sm:mb-0" />
//                 <div className="ml-0 sm:ml-4 flex-grow w-full space-y-2">
//                   <div className="flex justify-between items-center">
//                     <Skeleton className="h-5 w-1/2 rounded" /> {/* Name */}
//                     <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
//                   </div>
//                   <Skeleton className="h-4 w-3/4 rounded" /> {/* Email */}
//                   <div className="mt-3 pt-3 flex gap-6">
//                     <Skeleton className="h-10 w-1/2 rounded" /> {/* Detail 1 */}
//                     <Skeleton className="h-10 w-1/2 rounded" /> {/* Detail 2 */}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RecipientInfoCard Skeleton (as div) */}
//             <div>
//               <Skeleton className="h-6 w-44 rounded-full mb-4" />{" "}
//               {/* Title Badge */}
//               {/* Inner container mimicking Card structure */}
//               <div className="rounded-xl border p-4">
//                 <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
//                   <Skeleton className="size-12 sm:size-16 rounded-full flex-shrink-0 mb-3 sm:mb-0" />
//                   <div className="ml-0 sm:ml-4 flex-grow w-full space-y-2">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/2 rounded" /> {/* Name */}
//                       <Skeleton className="h-5 w-20 rounded-full" />{" "}
//                       {/* Badge */}
//                     </div>
//                     <Skeleton className="h-4 w-full rounded" />{" "}
//                     {/* Email/Nickname */}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3">
//                   <Skeleton className="h-12 w-full rounded" />{" "}
//                   {/* Detail Item */}
//                   <Skeleton className="h-12 w-full rounded" />{" "}
//                   {/* Detail Item */}
//                   <Skeleton className="h-12 w-full rounded" />{" "}
//                   {/* Detail Item */}
//                   <Skeleton className="h-12 w-full rounded" />{" "}
//                   {/* Detail Item */}
//                 </div>
//               </div>
//             </div>

//             {/* TransactionDetailsCard Skeleton (as div) */}
//             <div>
//               <Skeleton className="h-6 w-48 rounded-full mb-4" />{" "}
//               {/* Title Badge */}
//               {/* Inner container mimicking Card structure */}
//               <div className="rounded-xl border overflow-hidden">
//                 {/* Mimic CardContent */}
//                 <div className="sm:p-5 p-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                     <Skeleton className="h-20 w-full rounded-lg" />{" "}
//                     {/* Sent Amount */}
//                     <Skeleton className="h-20 w-full rounded-lg" />{" "}
//                     {/* Received Amount */}
//                   </div>
//                 </div>
//                 {/* Mimic Divider Area */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-y">
//                   <div className="p-4">
//                     <Skeleton className="h-10 w-full rounded" />
//                   </div>{" "}
//                   {/* Rate */}
//                   <div className="p-4">
//                     <Skeleton className="h-10 w-full rounded" />
//                   </div>{" "}
//                   {/* Fee */}
//                 </div>
//                 {/* Mimic CardFooter Area */}
//                 <div className="p-4">
//                   <Skeleton className="h-10 w-full rounded-lg" />{" "}
//                   {/* Total Debit */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//     <div className="container mx-auto p-8">
//       <div className="bg-white dark:bg-secondarybox shadow-sm rounded-xl p-8 text-center">
//         <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mb-6">
//           <XCircle className="h-8 w-8 text-rose-600" />
//         </div>
//         <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
//           Unable to Load Transfer
//         </h2>
//         <p className="text-slate-600 dark:text-neutral-300 text-lg mb-6 max-w-lg mx-auto">
//           {error || "The requested transfer details could not be found or accessed."}
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <Button onClick={onRetry} variant="default">
//             <RefreshCw className="size-4 mr-2" />
//             Retry
//           </Button>
//           <Button asChild variant="outline">
//             <Link href="/admin/transfer">
//               <ArrowLeft className="size-4 mr-2" />
//               Back to Transfers
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
// );

// // --- Access Restricted Component ---
// const AccessRestrictedDisplay = () => (
//      <div className="container mx-auto p-8">
//         <div className="bg-white dark:bg-secondarybox shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
//             Access Restricted
//           </h2>
//           <p className="text-slate-600 dark:text-neutral-300 mb-6 max-w-lg mx-auto">
//             This page requires administrator privileges. You do not have the
//             necessary permissions to view this content.
//           </p>
//           <Button asChild variant="secondary">
//             <Link href="/dashboard">
//               <ArrowLeft className="size-4 mr-2" />
//               Return to Dashboard
//             </Link>
//           </Button>
//         </div>
//       </div>
// );

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<Transfer | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loading } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: Currency }>({});

//   const fetchData = useCallback(async () => {
//     if (!token || !transferId) {
//         console.log("FetchData aborted: Missing token or transferId");
//         setIsLoading(false); // Ensure loading stops if aborted early
//         return;
//     }

//     console.log(`Fetching data for transferId: ${transferId} with token...`);
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Fetch both data concurrently
//       const [transferData, currenciesData] = await Promise.all([
//         adminTransferService.getAdminTransferById(transferId, token),
//         adminCurrencyService.getAllCurrenciesAdmin(token), // Assume this returns an array of objects
//       ]);

//        console.log("Fetched Transfer Data:", transferData);
//        console.log("Fetched Currencies Data:", currenciesData);

//        // Set the transfer state - assuming transferData matches the Transfer interface
//        setTransfer(transferData as Transfer); // Use assertion if confident in the shape

//        // Build the currencies map
//        const map: { [key: string]: Currency } = {};
//        // Ensure currenciesData is an array before iterating
//        if (Array.isArray(currenciesData)) {
//             // FIX 1: Removed the `as Currency[]` assertion here.
//             // Iterate directly over the fetched data.
//             currenciesData.forEach((currency: any) => { // Use `any` or a broader type if service return type is uncertain
//                 // Check if it's a valid object with an _id property
//                 if (currency && typeof currency === 'object' && typeof currency._id === 'string') {
//                     // Assume the object matches the local Currency interface structure
//                     map[currency._id] = currency as Currency; // Assert here *after* check if needed
//                 } else {
//                     console.warn("Skipping invalid currency entry:", currency);
//                 }
//             });
//        } else {
//             console.warn("Currencies data received is not an array:", currenciesData);
//        }
//       setCurrenciesMap(map);
//       console.log("Built Currencies Map:", map);

//     } catch (err: unknown) {
//       let errorMessage = "Failed to load transfer details.";
//        // Improved error message extraction
//        if (err instanceof Error) {
//          errorMessage = err.message;
//        }
//        if (typeof err === 'object' && err !== null) {
//            const potentialError = err as any;
//            errorMessage = potentialError.response?.data?.message || potentialError.message || errorMessage;
//        } else if (typeof err === 'string') {
//            errorMessage = err;
//        }

//       setError(errorMessage);
//       console.error("Error fetching transfer details:", errorMessage, err); // Log full error too
//     } finally {
//       setIsLoading(false);
//       console.log("Fetching process finished.");
//     }
//   }, [token, transferId]); // Keep dependencies minimal

//   useEffect(() => {
//     if (loading) {
//         console.log("useEffect waiting: Auth loading");
//         return;
//     }
//     if (!token) {
//         console.log("useEffect redirecting: No token found");
//         // Ensure redirect happens only once if possible, maybe check if already redirecting
//         router.push("/auth/login?redirect=/admin/transfer/" + transferId);
//         return;
//     }
//     if (!isAdmin) {
//       console.log("useEffect stopped: User is not admin, rendering access restricted.");
//       setIsLoading(false); // Stop loading if access denied
//       return;
//     }
//     // Only fetch if token and isAdmin are confirmed and not loading
//     console.log("useEffect triggering fetchData");
//     fetchData();
//     // Add fetchData to dependency array as it's defined with useCallback
//   }, [transferId, token, isAdmin, loading, router, fetchData]);

//   const handleStatusUpdated = () => {
//     console.log("Status updated, re-fetching data...");
//     fetchData(); // Re-trigger fetch
//   };

//   // --- Render Logic ---

//   if (loading) { // Check auth loading first
//      console.log("Rendering: Loading Skeleton (Auth Check)");
//     return <LoadingSkeleton />;
//   }

//   if (!isAdmin && !loading) { // Check isAdmin *after* auth loading is done
//       console.log("Rendering: Access Restricted");
//       return <AccessRestrictedDisplay />;
//   }

//   if (isLoading) { // Check data fetching loading state
//      console.log("Rendering: Loading Skeleton (Data Fetch)");
//     return <LoadingSkeleton />;
//   }

//   if (error) { // Check for errors after loading attempts
//      console.log("Rendering: Error Display");
//     return <ErrorDisplay error={error} onRetry={fetchData} />;
//   }

//   if (!transfer) { // Check if transfer data is available after loading and no error
//      console.log("Rendering: Transfer Not Found (after loading/error checks)");
//     return (
//          <div className="container mx-auto p-8 text-center text-slate-600 dark:text-neutral-300">
//             Transfer data not found or could not be loaded. Please try refreshing or check the transfer ID.
//          </div>
//      )
//   }

//   // --- FIX 2: Prepare data specifically for TransferOverviewCard ---
//   // Define the structure TransferOverviewCard expects
//   type TransferOverviewForCard = {
//     _id?: string | null;
//     status?: string | null | undefined;
//     createdAt?: string | Date | null | undefined;
//     sendAmount?: number | null;
//     sendCurrency?: CurrencyRef | null; // Use CurrencyRef type defined earlier
//   };

//   // Helper function to resolve currency identifier (string ID or object) to CurrencyRef
//   const getCurrencyRef = (
//       currencyIdentifier: string | { _id?: string; code: string; } | null | undefined,
//       map: { [key: string]: Currency }
//   ): CurrencyRef | null => {
//       if (!currencyIdentifier) return null;

//       // If it's already an object with a code
//       if (typeof currencyIdentifier === 'object' && currencyIdentifier !== null && typeof currencyIdentifier.code === 'string') {
//           return { _id: currencyIdentifier._id, code: currencyIdentifier.code };
//       }

//       // If it's a string ID, look it up in the map
//       if (typeof currencyIdentifier === 'string') {
//           const foundCurrency = map[currencyIdentifier];
//           // Return the expected structure if found, otherwise null
//           return foundCurrency ? { _id: foundCurrency._id, code: foundCurrency.code } : null;
//       }

//       // Fallback if it's an object but doesn't have 'code' (shouldn't happen per Transfer type)
//       if (typeof currencyIdentifier === 'object' && currencyIdentifier !== null) {
//          return { _id: currencyIdentifier._id, code: null }; // Indicate missing code
//       }

//       return null; // Fallback for unexpected types
//   };

//   // Create the data object for the card, prioritizing sendAmount/sendCurrency if available
//   const overviewData: TransferOverviewForCard = {
//     _id: transfer._id,
//     status: transfer.status,
//     createdAt: transfer.createdAt,
//     // Use sendAmount if present, otherwise fall back to sourceAmount
//     sendAmount: transfer.sendAmount ?? transfer.sourceAmount,
//     // Resolve sendCurrency if present, otherwise fall back to resolving sourceCurrency ID
//     sendCurrency: getCurrencyRef(transfer.sendCurrency ?? transfer.sourceCurrency, currenciesMap),
//   };
//   // --- End of FIX 2 ---

//   // --- Main Content Render ---
//   console.log("Rendering: Main Content for Transfer ID:", transfer._id);
//   return (
//     <div className="min-h-screen bg-background">
//       <Toaster richColors position="top-right" />
//       <div className="container mx-auto px-4 py-5">
//         <TransferHeader transferId={transfer._id} />

//         {/* Pass the prepared overviewData */}
//         <TransferOverviewCard transfer={overviewData} />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-1 space-y-6">
//             <TransferStatusSection
//               transfer={transfer}
//               token={token!} // Token is guaranteed here due to checks above
//               onStatusUpdated={handleStatusUpdated}
//             />
//             {/* TransferInfoCard might need similar treatment if its props are strict */}
//             <TransferInfoCard transfer={transfer} />
//           </div>

//           {/* Right Column */}
//           <div className="lg:col-span-2">
//              <div className="rounded-xl bg-white dark:bg-primarybox overflow-hidden">
//               <div className="bg-lightgray dark:bg-secondarybox px-6 py-4 border-b dark:border-b-neutral-700">
//                 <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
//                   Detailed Information
//                 </h3>
//               </div>
//               <div className="sm:p-6 p-4 space-y-8">
//                  <SenderInfoCard user={transfer.user} />
//                  <RecipientInfoCard recipient={transfer.recipient} />
//                  {/* TransactionDetailsCard receives the original transfer and the map for its own resolutions */}
//                  <TransactionDetailsCard transfer={transfer} currenciesMap={currenciesMap} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// // frontend/src/app/admin/transfers/[transferId]/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import adminCurrencyService from "../../../services/admin/currency"; // Adjust path
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import { useParams, useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
// import Link from "next/link";

// // Import react-toastify
// import { ToastContainer, toast, Slide, ToastContainerProps, TypeOptions } from 'react-toastify'; // Ensured TypeOptions is here
// import 'react-toastify/dist/ReactToastify.css';

// // Import CustomToast (adjust path as per your project structure)
// import CustomToast, { CustomToastProps } from "../../../../app/components/CustomToast";

// // Import the new components
// import TransferHeader from "../../components/transfers/TransferHeader"; // Adjust path
// import TransferOverviewCard from "../../components/transfers/TransferOverviewCard"; // Adjust path
// import TransferStatusSection from "../../components/transfers/TransferStatusSection"; // Adjust path
// import TransferInfoCard from "../../components/transfers/TransferInfoCard"; // Adjust path
// import SenderInfoCard from "../../components/transfers/SenderInfoCard"; // Adjust path
// import RecipientInfoCard from "../../components/transfers/RecipientInfoCard"; // Adjust path
// import TransactionDetailsCard from "../../components/transfers/TransactionDetailsCard"; // Adjust path

// // --- Define Interfaces (Ideally move to a central types file) ---
// interface User { _id: string; firstName?: string; lastName?: string; email?: string; }
// interface Recipient { _id: string; name?: string; email?: string; accountNumber?: string; bankName?: string; }
// interface Currency { _id: string; name: string; code: string; symbol: string; flagImage?: string | null; }
// interface CurrencyRef { _id?: string; code?: string | null; }
// interface Transfer {
//   _id: string; user: User; recipient: Recipient; sourceCurrency: string; targetCurrency: string;
//   sourceAmount: number; targetAmount: number; status: string; exchangeRate?: number; fee?: number; fees?: number;
//   createdAt: string; updatedAt: string; reference?: string; paymentMethod?: string; transferPurpose?: string;
//   sendAmount?: number | null; receiveAmount?: number | null;
//   sendCurrency?: string | { _id?: string; code: string; } | null;
//   receiveCurrency?: string | { _id?: string; code: string; } | null;
// }
// interface AdminTransferDetailPageParams extends Record<string, string | string[]> { transferId: string; }

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8">
//    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//              <div>
//                <Skeleton className="h-4 w-64 mb-3 rounded " />
//                <Skeleton className="h-8 w-48 rounded " />
//              </div>
//              <Skeleton className="h-9 w-32 rounded-md " />
//            </div>

//     <div className="bg-lightgray dark:bg-primarybox rounded-xl  sm:p-6 p-4 mb-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <Skeleton className="h-8 w-24 bg-lightborder dark:bg-secondarybox rounded-full" />
//           <div className="space-y-1.5">
//             <Skeleton className="h-3 w-16 bg-lightborder dark:bg-secondarybox rounded" />
//             <Skeleton className="h-4 w-32 bg-lightborder dark:bg-secondarybox rounded" />
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mt-4 md:mt-0">
//           <Skeleton className="h-14 sm:w-40 w-full bg-lightborder dark:bg-secondarybox rounded-lg" />
//           <Skeleton className="h-14 sm:w-44 w-full bg-lightborder dark:bg-secondarybox rounded-lg" />
//         </div>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-1 space-y-6">
//         <div className="bg-white dark:bg-primarybox rounded-xl overflow-hidden border">
//           <div className="bg-lightgray dark:bg-primarybox px-6 py-4">
//             <Skeleton className="h-6 w-3/5 rounded" />
//           </div>
//           <div className="sm:p-6 p-4 space-y-6">
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-1/3 rounded" />
//               <Skeleton className="h-8 w-28 rounded-full" />
//             </div>
//             <div className="space-y-3">
//               <Skeleton className="h-4 w-1/4 rounded mb-3" />
//               <Skeleton className="h-10 w-full rounded" />
//               <Skeleton className="h-10 w-full rounded" />
//             </div>
//             <div className="pt-4">
//               <Skeleton className="h-4 w-1/3 rounded mb-3" />
//               <Skeleton className="h-10 w-full rounded-md" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-primarybox rounded-xl overflow-hidden border">
//           <div className="bg-lightgray dark:bg-primarybox px-6 py-4">
//             <Skeleton className="h-6 w-1/2 rounded" />
//           </div>
//           <div className="sm:p-6 p-4 space-y-4">
//             <Skeleton className="h-14 w-full rounded-lg" />
//             <Skeleton className="h-14 w-full rounded-lg" />
//             <Skeleton className="h-14 w-full rounded-lg" />
//           </div>
//         </div>
//       </div>

//       <div className="lg:col-span-2 border rounded-2xl">
//         <div className="rounded-xl bg-white dark:bg-primarybox overflow-hidden">
//           <div className="bg-lightgray dark:bg-primarybox px-6 py-4">
//             <Skeleton className="h-6 w-48 rounded" />
//           </div>
//           <div className="sm:p-6 p-4 space-y-8">
//             <div>
//               <Skeleton className="h-6 w-40 rounded-full mb-4" />
//               <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
//                 <Skeleton className="size-12 sm:size-16 rounded-full flex-shrink-0 mb-3 sm:mb-0" />
//                 <div className="ml-0 sm:ml-4 flex-grow w-full space-y-2">
//                   <div className="flex justify-between items-center">
//                     <Skeleton className="h-5 w-1/2 rounded" />
//                     <Skeleton className="h-5 w-16 rounded-full" />
//                   </div>
//                   <Skeleton className="h-4 w-3/4 rounded" />
//                   <div className="mt-3 pt-3 flex gap-6">
//                     <Skeleton className="h-10 w-1/2 rounded" />
//                     <Skeleton className="h-10 w-1/2 rounded" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <Skeleton className="h-6 w-44 rounded-full mb-4" />
//               <div className="rounded-xl border p-4">
//                 <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
//                   <Skeleton className="size-12 sm:size-16 rounded-full flex-shrink-0 mb-3 sm:mb-0" />
//                   <div className="ml-0 sm:ml-4 flex-grow w-full space-y-2">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/2 rounded" />
//                       <Skeleton className="h-5 w-20 rounded-full" />
//                     </div>
//                     <Skeleton className="h-4 w-full rounded" />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3">
//                   <Skeleton className="h-12 w-full rounded" />
//                   <Skeleton className="h-12 w-full rounded" />
//                   <Skeleton className="h-12 w-full rounded" />
//                   <Skeleton className="h-12 w-full rounded" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <Skeleton className="h-6 w-48 rounded-full mb-4" />
//               <div className="rounded-xl border overflow-hidden">
//                 <div className="sm:p-5 p-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                     <Skeleton className="h-20 w-full rounded-lg" />
//                     <Skeleton className="h-20 w-full rounded-lg" />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-y">
//                   <div className="p-4"> <Skeleton className="h-10 w-full rounded" /> </div>
//                   <div className="p-4"> <Skeleton className="h-10 w-full rounded" /> </div>
//                 </div>
//                 <div className="p-4"> <Skeleton className="h-10 w-full rounded-lg" /> </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// // --- Error Display Component ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//     <div className="container mx-auto p-8">
//       <div className="bg-white dark:bg-secondarybox shadow-sm rounded-xl p-8 text-center">
//         <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mb-6">
//           <XCircle className="h-8 w-8 text-rose-600" />
//         </div>
//         <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
//           Unable to Load Transfer
//         </h2>
//         <p className="text-slate-600 dark:text-neutral-300 text-lg mb-6 max-w-lg mx-auto">
//           {error || "The requested transfer details could not be found or accessed."}
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <Button onClick={onRetry} variant="default">
//             <RefreshCw className="size-4 mr-2" /> Retry
//           </Button>
//           <Button asChild variant="outline">
//             <Link href="/admin/transfers">
//               <ArrowLeft className="size-4 mr-2" /> Back to Transfers
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
// );
// // --- Access Restricted Component ---
// const AccessRestrictedDisplay = () => (
//      <div className="container mx-auto p-8">
//         <div className="bg-white dark:bg-secondarybox shadow-sm rounded-xl p-8 text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
//             Access Restricted
//           </h2>
//           <p className="text-slate-600 dark:text-neutral-300 mb-6 max-w-lg mx-auto">
//             This page requires administrator privileges. You do not have the
//             necessary permissions to view this content.
//           </p>
//           <Button asChild variant="secondary">
//             <Link href="/dashboard">
//               <ArrowLeft className="size-4 mr-2" /> Return to Dashboard
//             </Link>
//           </Button>
//         </div>
//       </div>
// );

// // Helper to map transfer status to Toast type
// const mapTransferStatusToToastType = (status: string): CustomToastProps['type'] => {
//     const lowerStatus = status.toLowerCase();
//     switch (lowerStatus) {
//         case "completed": return "success";
//         case "pending": case "processing": return "info";
//         case "canceled": case "cancelled": case "failed": return "error";
//         case "unknown": return "warning";
//         default: return "default";
//     }
// };

// // Helper to get currency reference for cards
// const getCurrencyRef = (
//     currencyIdentifier: string | { _id?: string; code: string; } | null | undefined,
//     map: { [key: string]: Currency }
// ): CurrencyRef | null => {
//     if (!currencyIdentifier) return null;
//     if (typeof currencyIdentifier === 'object' && currencyIdentifier !== null && typeof currencyIdentifier.code === 'string') {
//         return { _id: currencyIdentifier._id, code: currencyIdentifier.code };
//     }
//     if (typeof currencyIdentifier === 'string') {
//         const foundCurrency = map[currencyIdentifier];
//         return foundCurrency ? { _id: foundCurrency._id, code: foundCurrency.code } : null;
//     }
//     if (typeof currencyIdentifier === 'object' && currencyIdentifier !== null) {
//        return { _id: (currencyIdentifier as any)._id, code: null };
//     }
//     return null;
// };

// const AdminTransferDetailPage = () => {
//   const params = useParams<AdminTransferDetailPageParams>();
//   const { transferId } = params;
//   const [transfer, setTransfer] = useState<Transfer | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const router = useRouter();
//   const [currenciesMap, setCurrenciesMap] = useState<{ [key: string]: Currency }>({});
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const showToast = useCallback((
//     message: string,
//     type?: CustomToastProps['type']
//   ) => {
//     const effectiveType = type || 'default';
//     let progressClassName: string;

//     switch(effectiveType) {
//       case 'success':
//         progressClassName = "toast-progress-success";
//         break;
//       case 'error':
//         progressClassName = "toast-progress-error";
//         break;
//       case 'info':
//         progressClassName = "toast-progress-info";
//         break;
//       case 'warning':
//         progressClassName = "toast-progress-warning";
//         break;
//       case 'default':
//       default:
//         progressClassName = "toast-progress-default";
//         break;
//     }

//     toast(<CustomToast message={message} type={effectiveType} />, {
//         progressClassName: progressClassName,
//         type: effectiveType as TypeOptions, // MODIFIED: Pass type to react-toastify
//         icon: false, // MODIFIED: Disable react-toastify's default icon
//     });
//   }, []);

//   const fetchData = useCallback(async () => {
//     if (!token || !transferId) { setIsLoading(false); return; }
//     setIsLoading(true);
//     setError(null);
//     try {
//       const [transferData, currenciesData] = await Promise.all([
//         adminTransferService.getAdminTransferById(transferId, token),
//         adminCurrencyService.getAllCurrenciesAdmin(token),
//       ]);
//        setTransfer(transferData as Transfer);
//        const map: { [key: string]: Currency } = {};
//        if (Array.isArray(currenciesData)) {
//             currenciesData.forEach((currency: any) => {
//                 if (currency && typeof currency === 'object' && typeof currency._id === 'string') {
//                     map[currency._id] = currency as Currency;
//                 }
//             });
//        }
//       setCurrenciesMap(map);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load transfer details.";
//        if (err instanceof Error) errorMessage = err.message;
//        if (typeof err === 'object' && err !== null) {
//            const potentialError = err as any;
//            errorMessage = potentialError.response?.data?.message || potentialError.message || errorMessage;
//        } else if (typeof err === 'string') errorMessage = err;
//       showToast(errorMessage, 'error');
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, transferId, showToast]);

//   useEffect(() => {
//     if (authLoading) return;
//     if (!token) { router.push("/auth/login?redirect=/admin/transfers/" + transferId); return; }
//     if (!isAdmin) { setIsLoading(false); return; }
//     fetchData();
//   }, [transferId, token, isAdmin, authLoading, router, fetchData]);

//   const handleStatusUpdated = () => {
//     fetchData();
//     // Optionally, show a success toast after status update + refetch
//     // showToast("Transfer status refreshed.", "info");
//   };

//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right", autoClose: 5000, hideProgressBar: false, newestOnTop: true,
//     closeOnClick: false, closeButton: false, rtl: false, pauseOnFocusLoss: true,
//     draggable: true, pauseOnHover: true, transition: Slide,
//     toastClassName: () => "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
//   };

//   const getToastContainerStyle = (): React.CSSProperties & { [key: `--${string}`]: string | number } => {
//     const baseStyle = { zIndex: 30 };
//     if (isMobile) return { ...baseStyle, top: "1rem", left: "1rem", right: "1rem", width: "auto" };
//     return { ...baseStyle, top: "0.75rem", right: "0.75rem", width: "320px" };
//   };

//   const overviewDataForCard = (() => {
//     if (!transfer) return null;
//     return {
//       _id: transfer._id, status: transfer.status, createdAt: transfer.createdAt,
//       sendAmount: transfer.sendAmount ?? transfer.sourceAmount,
//       sendCurrency: getCurrencyRef(transfer.sendCurrency ?? transfer.sourceCurrency, currenciesMap),
//     };
//   })();

//   if (authLoading) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <ToastContainer {...toastContainerProps} style={getToastContainerStyle()} />

//       {!isAdmin ? (
//         <AccessRestrictedDisplay />
//       ) : isLoading ? (
//         <LoadingSkeleton />
//       ) : error && !transfer ? (
//         <div className="container mx-auto px-4 py-5">
//           <ErrorDisplay error={error} onRetry={fetchData} />
//         </div>
//       ) : !transfer ? (
//         <div className="container mx-auto p-8 text-center text-slate-600 dark:text-neutral-300">
//           Transfer data not found. Please try refreshing or check the transfer ID.
//         </div>
//       ) : (
//         <div className="container mx-auto px-4 py-5">
//           <TransferHeader transferId={transfer._id} />
//           {overviewDataForCard && <TransferOverviewCard transfer={overviewDataForCard} />}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1 space-y-6">
//               <TransferStatusSection
//                 transfer={transfer}
//                 token={token!}
//                 onStatusUpdated={handleStatusUpdated}
//                 showToast={showToast} // Pass the updated showToast
//                 mapStatusToToastType={mapTransferStatusToToastType}
//               />
//               <TransferInfoCard transfer={transfer} />
//             </div>
//             <div className="lg:col-span-2">
//               <div className="rounded-xl border bg-primarybox overflow-hidden">
//                 <div className="bg-secondarybox px-6 py-4 border-b ">
//                   <h3 className="text-lg font-semibold text-mainheadingWhite">Detailed Information</h3>
//                 </div>
//                 <div className="sm:p-6 p-4 space-y-8">
//                   <SenderInfoCard user={transfer.user} />
//                   <RecipientInfoCard recipient={transfer.recipient} />
//                   <TransactionDetailsCard transfer={transfer} currenciesMap={currenciesMap} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTransferDetailPage;

// frontend/src/app/admin/transfers/[transferId]/page.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import adminTransferService from "../../../services/admin/transfer";
import adminCurrencyService from "../../../services/admin/currency";
import { useAuth } from "../../../contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

// Import react-toastify
import {
  ToastContainer,
  toast,
  Slide,
  ToastContainerProps,
  TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import CustomToast (adjust path as per your project structure)
import CustomToast, {
  CustomToastProps,
} from "../../../../app/components/CustomToast";

// Import the new components
import TransferHeader from "../../components/transfers/TransferHeader";
import TransferOverviewCard from "../../components/transfers/TransferOverviewCard";
import TransferStatusSection from "../../components/transfers/TransferStatusSection";
import TransferInfoCard from "../../components/transfers/TransferInfoCard";
import SenderInfoCard from "../../components/transfers/SenderInfoCard";
import RecipientInfoCard from "../../components/transfers/RecipientInfoCard";
import TransactionDetailsCard from "../../components/transfers/TransactionDetailsCard";

// --- Define Interfaces (Ideally move to a central types file, e.g., types/index.ts) ---
// Note: These interfaces are defined here for direct reference within the provided code context.
// In a real project, put these in a shared types file.

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  fullName?: string; // Added for SenderInfoCard, often a computed field or separate
  profileImage?: string;
  createdAt?: string | Date; // Added for SenderInfoCard
}

interface Recipient {
  _id: string;
  name?: string;
  email?: string;
  accountNumber?: string;
  bankName?: string;
  accountHolderName?: string; // For RecipientInfoCard
  profileImage?: string;
  nickname?: string;
  accountType?: string;
  ifscCode?: string;
  swiftCode?: string;
  iban?: string;
  address?: string;
}

// Currency reference for cases where only ID or code is present
interface CurrencyRef {
  _id?: string;
  code: string;
}

// Full Currency object as returned by currency service
interface Currency {
  _id: string;
  name: string;
  code: string;
  symbol: string;
  flagImage?: string | null;
}

// Main Transfer interface combining potential fields from various APIs/stages
interface Transfer {
  _id: string;
  user: User;
  recipient: Recipient;
  // Original fields
  sourceCurrency: string; // Typically an ID
  targetCurrency: string; // Typically an ID
  sourceAmount: number;
  targetAmount: number;
  // More flexible fields that might be used
  sendAmount?: number | null; // Preferred if available
  receiveAmount?: number | null; // Preferred if available
  sendCurrency?: string | CurrencyRef | null; // ID or object with code
  receiveCurrency?: string | CurrencyRef | null; // ID or object with code
  status: string;
  exchangeRate?: number | null;
  fee?: number | null; // Original fee
  fees?: number | null; // Alternative fee field
  createdAt: string;
  updatedAt: string;
  reference?: string;
  paymentMethod?: string;
  transferPurpose?: string;
  failureReason?: string | null; // For failed transfers
  cancellationReason?: string | null; // For cancelled transfers
}

interface AdminTransferDetailPageParams
  extends Record<string, string | string[]> {
  transferId: string;
}

// --- Loading Skeleton Component ---
const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div>
        <Skeleton className="h-4 w-64 mb-3 rounded" />
        <Skeleton className="h-8 w-48 rounded" />
      </div>
      <Skeleton className="h-12 w-43 rounded-full" />
    </div>

    <div className="bg-primarybox rounded-xl sm:p-6 p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-24 bg-background/50 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16 bg-background/50 rounded" />
            <Skeleton className="h-4 w-32 bg-background/50 rounded" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mt-4 md:mt-0">
          <Skeleton className="h-14 sm:w-40 w-full bg-background/50 rounded-lg" />
          <Skeleton className="h-14 sm:w-44 w-full bg-background/50 rounded-lg" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-primarybox rounded-xl overflow-hidden border">
          <div className="bg-secondarybox px-6 py-4">
            <Skeleton className="h-6 w-3/5 rounded bg-background/50" />
          </div>
          <div className="sm:p-6 p-4 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3 rounded bg-background/50" />
              <Skeleton className="h-8 w-28 rounded-full bg-background/50" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-1/4 rounded mb-3" />
              <Skeleton className="h-10 w-full rounded bg-background/50" />
              <Skeleton className="h-10 w-full rounded bg-background/50" />
            </div>
            <div className="pt-4">
              <Skeleton className="h-4 w-1/3 rounded mb-3 bg-background/50" />
              <Skeleton className="h-10 w-full rounded-md bg-background/50" />
            </div>
          </div>
        </div>

        <div className="bg-primarybox rounded-xl overflow-hidden border">
          <div className="bg-secondarybox px-6 py-4">
            <Skeleton className="h-6 w-1/2 rounded bg-background/50" />
          </div>
          <div className="sm:p-6 p-4 space-y-4">
            <Skeleton className="h-14 w-full rounded-lg bg-background/50" />
            <Skeleton className="h-14 w-full rounded-lg bg-background/50" />
            <Skeleton className="h-14 w-full rounded-lg bg-background/50" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 border rounded-2xl">
        <div className="rounded-xl bg-primarybox overflow-hidden">
          <div className="bg-secondarybox px-6 py-4">
            <Skeleton className="h-6 w-48 rounded bg-background/50" />
          </div>
          <div className="sm:p-6 p-4 space-y-8">
            <div>
              <Skeleton className="h-6 w-40 rounded-full mb-4" />
              <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
                <Skeleton className="size-12 sm:size-16 rounded-full flex-shrink-0 mb-3 sm:mb-0 bg-background/50" />
                <div className="ml-0 sm:ml-4 flex-grow w-full space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/2 rounded bg-background/50" />
                    <Skeleton className="h-5 w-16 rounded-full bg-background/50" />
                  </div>
                  <Skeleton className="h-4 w-3/4 rounded bg-background/50" />
                  <div className="mt-3 pt-3 flex gap-6">
                    <Skeleton className="h-10 w-1/2 rounded bg-background/50" />
                    <Skeleton className="h-10 w-1/2 rounded bg-background/50" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-44 rounded-full mb-4 bg-background/50" />
              <div className="rounded-xl border p-4">
                <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
                  <Skeleton className="size-12 sm:size-16 rounded-full flex-shrink-0 mb-3 sm:mb-0 bg-background/50" />
                  <div className="ml-0 sm:ml-4 flex-grow w-full space-y-2">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-1/2 rounded bg-background/50" />
                      <Skeleton className="h-5 w-20 rounded-full bg-background/50" />
                    </div>
                    <Skeleton className="h-4 w-full rounded bg-background/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3">
                  <Skeleton className="h-12 w-full rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded bg-background/50" />
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-48 rounded-full mb-4 bg-background/50" />
              <div className="rounded-xl border overflow-hidden">
                <div className="sm:p-5 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <Skeleton className="h-20 w-full rounded-lg bg-background/50" />
                    <Skeleton className="h-20 w-full rounded-lg bg-background/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-y">
                  <div className="p-4">
                    {" "}
                    <Skeleton className="h-10 w-full rounded bg-background/50" />{" "}
                  </div>
                  <div className="p-4">
                    {" "}
                    <Skeleton className="h-10 w-full rounded bg-background/50" />{" "}
                  </div>
                </div>
                <div className="p-4">
                  {" "}
                  <Skeleton className="h-10 w-full rounded-lg bg-background/50" />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Error Display Component ---
const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) => (
  <div className="container mx-auto px-4 py-5">
    <div className="bg-primarybox space-y-3 rounded-xl p-4 text-center">
      <div className="sm:size-12 mx-auto size-10 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
        <XCircle className="text-mainheading sm:size-6 size-5 flex-shrink-0" />
      </div>

      <h2 className="lg:text-2xl text-xl font-semibold text-mainheadingWhite">
        Unable to Load Transfer
      </h2>

      <p className="text-subheadingWhite lg:text-base test-sm max-w-lg mx-auto">
        {error ||
          "The requested transfer details could not be found or accessed."}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={onRetry}
          className="flex justify-center items-center gap-2 bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12 transition-all cursor-pointer duration-75 ease-linear"
        >
          <RefreshCw className="size-4" /> Retry
        </button>

        <Link
          href="/admin/transfers"
          className=" flex justify-center items-center gap-2 text-primary bg-secondarybox hover:bg-secondaryboxhover font-medium rounded-full px-8 py-3 h-12 transition-all duration-75 ease-linear"
        >
          <ArrowLeft className="size-4" /> Back to Transfers
        </Link>
      </div>
    </div>
  </div>
);

// --- Access Restricted Component ---
const AccessRestrictedDisplay = () => (
  <div className="container mx-auto px-4 py-5">
    <div className="bg-secondarybox rounded-xl p-4 text-center space-y-4">
      <div className="mx-auto sm:size-12 size-10 flex items-center font-medium justify-center rounded-full bg-primary">
        <AlertCircle className="size-6 text-mainheading" />
      </div>
      <h2 className="lg:text-2xl text-xl font-semibold text-mainheadingWhite">
        Access Restricted
      </h2>
      <p className="text-subheadyingWhite max-w-lg lg:text-base text-sm mx-auto">
        This page requires administrator privileges. You do not have the
        necessary permissions to view this content.
      </p>

      <div className="inline-block">
        <Link
          href="/dashboard"
          className="flex justify-center gap-2 items-center bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12 transition-all cursor-pointer duration-75 ease-linear"
        >
          <ArrowLeft className="size-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  </div>
);

// Helper to map transfer status to Toast type
const mapTransferStatusToToastType = (
  status: string
): CustomToastProps["type"] => {
  const lowerStatus = status.toLowerCase();
  switch (lowerStatus) {
    case "completed":
      return "success";
    case "pending":
    case "processing":
    case "in-progress": // Added for robustness if 'in-progress' is used
      return "info";
    case "canceled":
    case "cancelled":
    case "failed":
    case "rejected": // Added for robustness
      return "error";
    case "on-hold": // Added for robustness
    case "requires-action": // Added for robustness
    case "unknown":
      return "warning";
    default:
      return "default";
  }
};

// Helper to get currency reference for cards
// This helper needs to handle string IDs (from `sourceCurrency`/`targetCurrency`)
// AND objects (from `sendCurrency`/`receiveCurrency`)
const getCurrencyRefForOverviewCard = (
  currencyIdentifier: string | CurrencyRef | null | undefined,
  map: { [key: string]: Currency } // Map of ID to full Currency object
): CurrencyRef | null => {
  if (!currencyIdentifier) return null;

  if (typeof currencyIdentifier === "string") {
    // If it's a string, it's an ID. Look up in the map.
    const foundCurrency = map[currencyIdentifier];
    return foundCurrency
      ? { _id: foundCurrency._id, code: foundCurrency.code }
      : null;
  }
  // If it's an object, it's already a CurrencyRef (or similar).
  // Ensure it has a 'code' property.
  if (
    typeof currencyIdentifier === "object" &&
    currencyIdentifier !== null &&
    typeof currencyIdentifier.code === "string"
  ) {
    return { _id: currencyIdentifier._id, code: currencyIdentifier.code };
  }
  return null;
};

const AdminTransferDetailPage = () => {
  const params = useParams<AdminTransferDetailPageParams>();
  const { transferId } = params;
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  // currenciesMap: key is Currency._id, value is Currency object
  const [currenciesMap, setCurrenciesMap] = useState<{
    [key: string]: Currency;
  }>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showToast = useCallback(
    (message: string, type?: CustomToastProps["type"]) => {
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

      toast(<CustomToast message={message} type={effectiveType} />, {
        progressClassName: progressClassName,
        type: effectiveType as TypeOptions, // Pass type to react-toastify
        icon: false, // Disable react-toastify's default icon
        // Consider adding a unique toastId if multiple toasts could appear rapidly
        // toastId: message, // Example: simple unique ID for prevent duplicates
      });
    },
    []
  );

  const fetchData = useCallback(async () => {
    if (!token || !transferId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const [transferData, currenciesData] = await Promise.all([
        adminTransferService.getAdminTransferById(transferId, token),
        adminCurrencyService.getAllCurrenciesAdmin(token),
      ]);

      setTransfer(transferData as Transfer);

      const map: { [key: string]: Currency } = {};
      if (Array.isArray(currenciesData)) {
        currenciesData.forEach((currency: any) => {
          if (
            currency &&
            typeof currency === "object" &&
            typeof currency._id === "string"
          ) {
            map[currency._id] = currency as Currency;
          }
        });
      }
      setCurrenciesMap(map);
    } catch (err: unknown) {
      let errorMessage = "Failed to load transfer details.";
      if (err instanceof Error) errorMessage = err.message;
      if (typeof err === "object" && err !== null) {
        const potentialError = err as any; // Cast to any to access potential 'response.data.message'
        errorMessage =
          potentialError.response?.data?.message ||
          potentialError.message ||
          errorMessage;
      } else if (typeof err === "string") errorMessage = err;
      showToast(errorMessage, "error");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [token, transferId, showToast]); // fetchData depends on showToast now

  useEffect(() => {
    if (authLoading) return; // Wait for authentication status to resolve
    if (!token) {
      router.push("/auth/login?redirect=/admin/transfers/" + transferId);
      return;
    }
    if (!isAdmin) {
      setIsLoading(false); // Stop loading if not admin
      return;
    }
    fetchData();
  }, [transferId, token, isAdmin, authLoading, router, fetchData]); // Re-run if auth or transferId changes

  const handleStatusUpdated = () => {
    fetchData(); // Refetch data after status update
    // Optionally, show a success toast after status update + refetch
    // showToast("Transfer status refreshed.", "info");
  };

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
    const baseStyle = { zIndex: 30 }; // Ensure toast is above other elements
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

  const overviewDataForCard = (() => {
    if (!transfer) return null;
    return {
      _id: transfer._id,
      status: transfer.status,
      createdAt: transfer.createdAt,
      sendAmount: transfer.sendAmount ?? transfer.sourceAmount,
      // Pass the sendCurrency directly, let TransferOverviewCard handle resolution
      sendCurrency: getCurrencyRefForOverviewCard(
        transfer.sendCurrency ?? transfer.sourceCurrency,
        currenciesMap
      ),
    };
  })();

  if (authLoading) {
    return <LoadingSkeleton />;
  }

  if (!isAdmin) {
    return <AccessRestrictedDisplay />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error && !transfer) {
    return (
      <div className="container mx-auto px-4 py-5">
        <ErrorDisplay error={error} onRetry={fetchData} />
      </div>
    );
  }

  if (!transfer) {
    return (
      <div className="container mx-auto p-8 text-center text-slate-600 dark:text-neutral-300">
        Transfer data not found. Please try refreshing or check the transfer ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer
        {...toastContainerProps}
        style={getToastContainerStyle()}
      />

      <div className="container mx-auto px-4 py-5">
        <TransferHeader transferId={transfer._id} />
        {overviewDataForCard && (
          <TransferOverviewCard transfer={overviewDataForCard} />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TransferStatusSection
              transfer={transfer}
              token={token!} // token is guaranteed to be present here due to checks above
              onStatusUpdated={handleStatusUpdated}
              showToast={showToast}
              mapStatusToToastType={mapTransferStatusToToastType}
            />
            <TransferInfoCard transfer={transfer} />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-primarybox overflow-hidden">
              <div className="bg-secondarybox px-6 py-4">
                <h3 className="text-lg font-semibold text-mainheadingWhite">
                  Detailed Information
                </h3>
              </div>
              <div className="sm:p-6 p-4 space-y-8">
                {/* Sender's full name might be constructed from firstName/lastName or provided directly */}
                <SenderInfoCard
                  user={{
                    _id: transfer.user._id,
                    fullName:
                      `${transfer.user.firstName || ""} ${
                        transfer.user.lastName || ""
                      }`.trim() || transfer.user.email,
                    email: transfer.user.email,
                    // profileImage and createdAt are not directly on transfer.user in provided interfaces,
                    // but often exist on a full User object. Assuming their presence for the component.
                    // If not present, remove from prop, or extend User interface if service provides.
                  }}
                />
                <RecipientInfoCard recipient={transfer.recipient} />
                <TransactionDetailsCard
                  transfer={transfer}
                  currenciesMap={currenciesMap}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransferDetailPage;
