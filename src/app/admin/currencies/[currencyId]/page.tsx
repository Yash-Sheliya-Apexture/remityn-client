// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import { useAuth } from '../../../hooks/useAuth';
// import { Skeleton } from '@/components/ui/skeleton';
// import apiConfig from '../../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//     _id: string;
//     code: string;
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//     wiseFeePercentage?: number;
//     bankTransferFee?: number;
// }

// const AdminEditCurrencyPage = () => {
//     const params = useParams();
//     const router = useRouter();
//     const { currencyId } = params;
//     const [currency, setCurrency] = useState<Currency | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchCurrency = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`/admin/currencies/${currencyId}`, { // ADD /api prefix here
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setCurrency(response.data);
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load currency details');
//                 setIsLoading(false);
//             }
//         };

//         if (currencyId) {
//             fetchCurrency();
//         }
//     }, [currencyId, token]);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         setIsSubmitting(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await axios.put(`/admin/currencies/${currencyId}`, currency, { // ADD /api prefix here
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setIsSubmitting(false);
//             setSuccessMessage('Currency details updated successfully!');
//             // Optionally redirect after a delay to show success message
//             setTimeout(() => {
//                 router.push('/admin/currencies');
//             }, 1500);
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Failed to update currency');
//             setIsSubmitting(false);
//             setSuccessMessage(null);
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
//         setCurrency({ ...currency, [e.target.name]: value });
//     };

//     if (isLoading) return <div className="p-4"><Skeleton count={10} className="h-5" /></div>;
//     if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
//     if (!currency) return <div className="p-4">Currency not found.</div>;

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">Edit Currency: {currency.code}</h1>
//             {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//                 <strong className="font-bold">Success!</strong>
//                 <span className="inline-block sm:inmainsssa1 font-mediume}</span>
//             </div>}
//             <form onSubmit={handleSubmit} className="max-w-lg">
//                 <div className="mb-4">
//                     <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">Currency Code</label>
//                     <input type="text" id="code" name="code" value={currency.code} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="payeeName" className="block text-gray-700 text-sm font-bold mb-2">Payee Name</label>
//                     <input type="text" id="payeeName" name="payeeName" value={currency.payeeName || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="iban" className="block text-gray-700 text-sm font-bold mb-2">IBAN</label>
//                     <input type="text" id="iban" name="iban" value={currency.iban || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="bicSwift" className="block text-gray-700 text-sm font-bold mb-2">BIC/SWIFT</label>
//                     <input type="text" id="bicSwift" name="bicSwift" value={currency.bicSwift || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="bankAddress" className="block text-gray-700 text-sm font-bold mb-2">Bank Address</label>
//                     <textarea id="bankAddress" name="bankAddress" value={currency.bankAddress || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="wiseFeePercentage" className="block text-gray-700 text-sm font-bold mb-2">remityn Fee Percentage</label>
//                     <input type="number" id="wiseFeePercentage" name="wiseFeePercentage" value={currency.wiseFeePercentage !== undefined ? currency.wiseFeePercentage : 0} onChange={handleChange} step="0.0001" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div className="mb-6">
//                     <label htmlFor="bankTransferFee" className="block text-gray-700 text-sm font-bold mb-2">Bank Transfer Fee</label>
//                     <input type="number" id="bankTransferFee" name="bankTransferFee" value={currency.bankTransferFee !== undefined ? currency.bankTransferFee : 0} onChange={handleChange} step="0.01" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>

//                 <button type="submit" disabled={isSubmitting || isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
//                     {isSubmitting ? 'Updating...' : 'Update Currency'}
//                 </button>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency details updated successfully!");

//       // // Optional: Auto-redirect after success
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//       setSuccessMessage(null);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="w-full max-w-4xl animate-pulse">
//           <div className="space-y-4">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="h-10 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
//         <div className="text-red-600 text-xl font-medium">Error: {error}</div>
//       </div>
//     );

//   if (!currency)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="text-gray-600 text-xl font-semibold">
//           Currency not found.
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       {/* Success Message Overlay */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ y: -50, opacity: 0 }} // Start slightly above and faded out
//             animate={{ y: 0, opacity: 1 }} // Slide down to position and fade in
//             exit={{ y: -50, opacity: 0 }} // Slide back up and fade out
//             transition={{
//               type: "spring", // Use spring for a bouncy effect
//               stiffness: 100, // Stiffness of the spring (higher = stiffer)
//               damping: 10, // Damping of the spring (higher = less bouncy)
//             }}
//             className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
//           >
//             <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span className="md:text-lg text-base">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Back Arrow option create */}

//       <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden">
//         <div className="bg-gradient-to-tr from-[#78d3ff] to-[#326f7d] p-6">
//           <h1 className="text-2xl text-end font-medium text-white">
//             Edit Currency: {currency.code}
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-4">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Currency Code (Read-only) */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Currency Code
//               </label>
//               <input
//                 type="text"
//                 value={currency.code}
//                 readOnly
//                 className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Currency Name */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Currency Name
//               </label>
//               <input
//                 type="text"
//                 name="currencyName"
//                 value={currency.currencyName || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Flag Image Path Input */}
//             <div className="relative">
//               <label
//                 htmlFor="flagImage"
//                 className="inline-block text-main mb-1 font-medium"
//               >
//                 Flag Image Path
//               </label>
//               <input
//                 type="text"
//                 id="flagImage"
//                 name="flagImage"
//                 value={currency.flagImage || ""}
//                 onChange={handleChange}
//                 placeholder="/assets/icon/flags/curreny-code.png"
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//               {currency.flagImage && (
//                 <div className="mt-2 flex gap-1 items-center absolute top-7 right-2">
//                   {/* <h1 className="text-main text-sm">Preview</h1> */}
//                   <img
//                     src={currency.flagImage}
//                     alt="Current Flag"
//                     className="size-8"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* IBAN */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 IBAN
//               </label>
//               <input
//                 type="text"
//                 name="iban"
//                 value={currency.iban || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* BIC/SWIFT */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 BIC/SWIFT
//               </label>
//               <input
//                 type="text"
//                 name="bicSwift"
//                 value={currency.bicSwift || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* remityn Fee Percentage */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 remityn Fee Percentage
//               </label>
//               <input
//                 type="number"
//                 name="wiseFeePercentage"
//                 value={currency.wiseFeePercentage || 0}
//                 onChange={handleChange}
//                 step="0.0001"
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>

//             {/* Bank Transfer Fee */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Bank Transfer Fee
//               </label>
//               <input
//                 type="number"
//                 name="bankTransferFee"
//                 value={currency.bankTransferFee || 0}
//                 onChange={handleChange}
//                 step="0.01"
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* Bank Address */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Bank Address
//             </label>
//             <textarea
//               name="bankAddress"
//               value={currency.bankAddress || ""}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none min-h-[120px]"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-[#78d3ff] to-[#326f7d] text-main font-medium text-lg py-4 rounded-lg transition duration-300 hover:opacity-90 disabled:opacity-50"
//             >
//               {isSubmitting ? "Updating..." : "Update Currency"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link"; // Import Link from next/link
// import { FaArrowLeftLong } from "react-icons/fa6";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency details updated successfully!");

//       // // Optional: Auto-redirect after success
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//       setSuccessMessage(null);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="w-full max-w-4xl animate-pulse">
//           <div className="space-y-4">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="h-10 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
//         <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
//       </div>
//     );

//   if (!currency)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
//         <div className="text-gray-600 text-xl font-semibold">
//           Currency not found.
//         </div>
//       </div>
//     );

//   return (
//     <>
//       {/* Back Arrow option create */}
//       <div className="container mx-auto my-4">
//         <Link
//           href="/admin/currencies"
//           className="text-secondary text-lg font-medium py-2 px-4 inline-flex  gap-2 items-center"
//         >
//           <FaArrowLeftLong />
//           <span>Go Back</span>
//         </Link>
//       </div>

//       <div className="min-h-screen flex  items-center justify-center p-4">
//         {/* Success Message Overlay */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -50, opacity: 0 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 10,
//               }}
//               className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
//             >
//               <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 <span className="text-lg">{successMessage}</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden">
//           <div className="bg-gradient-to-tr from-[#78d3ff] to-[#326f7d] p-6">
//             <h1 className="text-2xl text-center font-medium text-secondary" >
//               Edit Currency: {currency.code}
//             </h1>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Currency Code (Read-only) */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Currency Code
//                 </label>
//                 <input
//                   type="text"
//                   value={currency.code}
//                   readOnly
//                   className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Currency Name */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   Currency Name
//                 </label>
//                 <input
//                   type="text"
//                   name="currencyName"
//                   value={currency.currencyName || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Flag Image Path Input */}
//               <div className="relative">
//                 <label
//                   htmlFor="flagImage"
//                   className="inline-block text-gray mb-2 font-medium"
//                 >
//                   Flag Image Path (e.g., /assets/flags/usd.png)
//                 </label>
//                 <input
//                   type="text"
//                   id="flagImage"
//                   name="flagImage"
//                   value={currency.flagImage || ""}
//                   onChange={handleChange}
//                   placeholder="/assets/icon/flags/curreny-code.png"
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//                 {currency.flagImage && (
//                   <div className="mt-2 flex gap-1 items-center absolute top-8 right-2">
//                     {/* <h1 className="text-main text-sm">Preview</h1> */}
//                     <img
//                       src={currency.flagImage}
//                       alt="Current Flag"
//                       className="size-8"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* IBAN */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   IBAN
//                 </label>
//                 <input
//                   type="text"
//                   name="iban"
//                   value={currency.iban || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* BIC/SWIFT */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   BIC/SWIFT
//                 </label>
//                 <input
//                   type="text"
//                   name="bicSwift"
//                   value={currency.bicSwift || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* remityn Fee Percentage */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   remityn Fee Percentage
//                 </label>
//                 <input
//                   type="number"
//                   name="wiseFeePercentage"
//                   value={currency.wiseFeePercentage || 0}
//                   onChange={handleChange}
//                   step="0.0001"
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>

//               {/* Bank Transfer Fee */}
//               <div>
//                 <label className="inline-block text-gray font-medium mb-2">
//                   Bank Transfer Fee
//                 </label>
//                 <input
//                   type="number"
//                   name="bankTransferFee"
//                   value={currency.bankTransferFee || 0}
//                   onChange={handleChange}
//                   step="0.01"
//                   className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Bank Address */}
//             <div>
//               <label className="inline-block text-gray font-medium mb-2">
//                 Bank Address
//               </label>
//               <textarea
//                 name="bankAddress"
//                 value={currency.bankAddress || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 hover:shadow-color transition-shadow duration-300 ease-in-out rounded-lg focus:outline-none min-h-[120px]"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r text-lg from-[#78d3ff] to-[#326f7d] text-main font-medium py-4 rounded-lg disabled:opacity-50"
//               >
//                 {isSubmitting ? "Updating..." : "Update Currency"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import { FaArrowLeftLong } from "react-icons/fa6";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency details updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//       setSuccessMessage(null);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-slate-50 p-6">
//         <div className="w-full max-w-4xl">
//           <div className="space-y-4">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-10 bg-slate-200 rounded-md animate-pulse"
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
//         <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
//           <h2 className="text-red-600 text-xl font-semibold mb-2">Error</h2>
//           <p className="text-slate-700">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!currency) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-slate-50 p-6">
//         <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-amber-500">
//           <h2 className="text-amber-600 text-xl font-semibold mb-2">
//             Not Found
//           </h2>
//           <p className="text-slate-700">Currency not found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Success Message Toast */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -50, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 100, damping: 10 }}
//             className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
//           >
//             <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Back Navigation */}
//       <div className="container mx-auto pt-6 px-4">
//         <Link
//           href="/admin/currencies"
//           className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
//         >
//           <FaArrowLeftLong className="text-sm" />
//           <span>Back to Currencies</span>
//         </Link>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Currency Card */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//             {/* Header */}
//             <div className="relative">
//               <div className="bg-gradient-to-r from-sky-400 to-cyan-600 h-16"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="bg-white px-8 py-3 rounded-full shadow-md">
//                   <h1 className="text-xl font-semibold text-slate-800">
//                     Edit Currency:
//                     <span className="text-cyan-600">{currency.code}</span>
//                   </h1>
//                 </div>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-8">
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Currency Code */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Currency Code
//                   </label>
//                   <input
//                     type="text"
//                     value={currency.code}
//                     readOnly
//                     className="w-full px-4 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg focus:outline-none"
//                   />
//                 </div>

//                 {/* Currency Name */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Currency Name
//                   </label>
//                   <input
//                     type="text"
//                     name="currencyName"
//                     value={currency.currencyName || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
//                   />
//                 </div>

//                 {/* Flag Image */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Flag Image Path
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="flagImage"
//                       name="flagImage"
//                       value={currency.flagImage || ""}
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/currency-code.png"
//                       className="w-full pl-4 pr-12 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                     />
//                     {currency.flagImage && (
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         <img
//                           src={currency.flagImage}
//                           alt="Flag"
//                           className="h-6 w-auto rounded-sm"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* IBAN */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     IBAN
//                   </label>
//                   <input
//                     type="text"
//                     name="iban"
//                     value={currency.iban || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 {/* BIC/SWIFT */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     BIC/SWIFT
//                   </label>
//                   <input
//                     type="text"
//                     name="bicSwift"
//                     value={currency.bicSwift || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 {/* remityn Fee Percentage */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     remityn Fee Percentage
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       value={currency.wiseFeePercentage || 0}
//                       onChange={handleChange}
//                       step="0.0001"
//                       className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <span className="text-slate-400">%</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bank Transfer Fee */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Bank Transfer Fee
//                   </label>
//                   <div className="relative">
//                     <input
//                       name="bankTransferFee"
//                       value={currency.bankTransferFee || 0}
//                       onChange={handleChange}
//                       step="0.01"
//                       className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Bank Address */}
//               <div className="mt-6 space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">
//                   Bank Address
//                 </label>
//                 <textarea
//                   name="bankAddress"
//                   value={currency.bankAddress || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-32 resize-y"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       <span>Updating...</span>
//                     </div>
//                   ) : (
//                     "Update Currency"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaGlobe,
//   FaMoneyBillWave,
//   FaUniversity,
//   FaCreditCard,
//   FaPercentage,
// } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("details");
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   // Skeleton loading component
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-20 bg-gray-200 animate-pulse"></div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//                 <div className="md:col-span-2 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//                   <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-red-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currency) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-yellow-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-yellow-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Currency Not Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               The requested currency could not be found in our system.
//             </p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="font-medium">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Navigation */}
//         <div className="mb-6 px-4 sm:px-0">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
//           >
//             <FaArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
//             Back to Currencies
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Currency Header */}
//           <div className="relative">
//             <div className="bg-gradient-to-r from-blue-500 via-pri to-purple-500 h-48 flex items-end">
//               <div className="absolute top-0 left-0 w-full h-full opacity-20">
//                 <div
//                   className="absolute inset-0"
//                   style={{
//                     backgroundImage:
//                       "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
//                   }}
//                 ></div>
//               </div>
//               <div className="flex items-center mx-auto container px-4 sm:px-6 lg:px-8 relative z-10 pb-8">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="flex items-center"
//                 >
//                   {currency.flagImage && (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.code} flag`}
//                       className="h-12 w-auto mr-4 rounded shadow-md"
//                     />
//                   )}
//                   <div>
//                     <h1 className="text-3xl font-bold text-white">
//                       {currency.code}
//                     </h1>
//                     <p className="text-blue-100">
//                       {currency.currencyName || "Currency Details"}
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>

//           {/* Currency Card */}
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-8">
//             <div className="bg-white rounded-xl shadow-lg p-1">
//               {/* Tab Navigation */}
//               <div className="flex border-b border-gray-200">
//                 <button
//                   className={`flex-1 py-4 px-4 text-center font-medium text-sm rounded-tl-lg ${
//                     activeTab === "details"
//                       ? "text-indigo-600 border-b-2 border-pri"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("details")}
//                 >
//                   General Details
//                 </button>
//                 <button
//                   className={`flex-1 py-4 px-4 text-center font-medium text-sm ${
//                     activeTab === "banking"
//                       ? "text-indigo-600 border-b-2 border-pri"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("banking")}
//                 >
//                   Banking Details
//                 </button>
//                 <button
//                   className={`flex-1 py-4 px-4 text-center font-medium text-sm rounded-tr-lg ${
//                     activeTab === "fees"
//                       ? "text-indigo-600 border-b-2 border-indigo-500"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("fees")}
//                 >
//                   Fees
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit}>
//                 <div className="p-6">
//                   {/* General Details */}
//                   <div className={activeTab === "details" ? "block" : "hidden"}>
//                     <div className="space-y-6">
//                       {/* Code Field */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <FaGlobe className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Currency Code
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           value={currency.code}
//                           readOnly
//                           className="w-full px-4 py-3 bg-gray-100 text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent"
//                         />
//                         <p className="mt-1 text-xs text-gray-500">
//                           Currency code cannot be changed
//                         </p>
//                       </div>

//                       {/* Currency Name */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaMoneyBillWave className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Currency Name
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="currencyName"
//                           value={currency.currencyName || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. Euro, US Dollar"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                         />
//                       </div>

//                       {/* Flag Image */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="h-5 w-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <label className="block text-sm font-medium text-gray-700">
//                             Flag Image Path
//                           </label>
//                         </div>
//                         <div className="flex space-x-4">
//                           <div className="flex-grow">
//                             <input
//                               type="text"
//                               id="flagImage"
//                               name="flagImage"
//                               value={currency.flagImage || ""}
//                               onChange={handleChange}
//                               placeholder="/assets/flags/currency-code.png"
//                               className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                             />
//                           </div>
//                           {currency.flagImage && (
//                             <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg border border-gray-200">
//                               <img
//                                 src={currency.flagImage}
//                                 alt="Flag preview"
//                                 className="max-w-full max-h-full"
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Banking Details */}
//                   <div className={activeTab === "banking" ? "block" : "hidden"}>
//                     <div className="space-y-6">
//                       {/* IBAN */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaCreditCard className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             IBAN
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="iban"
//                           value={currency.iban || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DE89370400440532013000"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                         />
//                       </div>

//                       {/* BIC/SWIFT */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="h-5 w-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                             />
//                           </svg>
//                           <label className="block text-sm font-medium text-gray-700">
//                             BIC/SWIFT
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="bicSwift"
//                           value={currency.bicSwift || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DEUTDEFF"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300"
//                         />
//                       </div>

//                       {/* Bank Address */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaUniversity className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             Bank Address
//                           </label>
//                         </div>
//                         <textarea
//                           name="bankAddress"
//                           value={currency.bankAddress || ""}
//                           onChange={handleChange}
//                           placeholder="Enter complete bank address"
//                           className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300 min-h-32"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fees */}
//                   <div className={activeTab === "fees" ? "block" : "hidden"}>
//                     <div className="space-y-6">
//                       {/* remityn Fee Percentage */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaPercentage className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="block text-sm font-medium text-gray-700">
//                             remityn Fee Percentage
//                           </label>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             name="wiseFeePercentage"
//                             value={currency.wiseFeePercentage || 0}
//                             onChange={handleChange}
//                             step="0.0001"
//                             placeholder="0.0000"
//                             className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300 pr-12"
//                           />
//                           <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                             <span className="text-gray-500">%</span>
//                           </div>
//                         </div>
//                         <p className="mt-1 text-xs text-gray-500">
//                           The fee percentage charged by remityn for this currency
//                         </p>
//                       </div>

//                       {/* Bank Transfer Fee */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="h-5 w-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <label className="block text-sm font-medium text-gray-700">
//                             Bank Transfer Fee
//                           </label>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             name="bankTransferFee"
//                             value={currency.bankTransferFee || 0}
//                             onChange={handleChange}
//                             step="0.01"
//                             placeholder="0.00"
//                             className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-transparent transition-all hover:border-indigo-300 pr-16"
//                           />
//                           <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                             <span className="text-gray-500">
//                               {currency.code}
//                             </span>
//                           </div>
//                         </div>
//                         <p className="mt-1 text-xs text-gray-500">
//                           The fixed fee charged for bank transfers in this
//                           currency
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
//                   <Link
//                     href="/admin/currencies"
//                     className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         <span>Updating...</span>
//                       </span>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaGlobe,
//   FaMoneyBillWave,
//   FaUniversity,
//   FaCreditCard,
//   FaPercentage,
// } from "react-icons/fa";
// import { TbPointFilled } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));
//   };

//   // Skeleton loading component
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-20 bg-gray-200 animate-pulse"></div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//                 <div className="md:col-span-2 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//                   <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-red-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-7"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currency) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-yellow-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-yellow-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Currency Not Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               The requested currency could not be found in our system.
//             </p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="font-medium">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-4xl mx-auto py-6 sm:px-6">
//         {/* Navigation */}
//         <div className="mb-6 px-4 sm:px-0">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center  font-medium text-main transition-colors"
//           >
//             <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
//             Back to Currencies
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
//           {/* Currency Header */}
//           <div className="relative">
//             <div className="h-26 flex items-end bg-indigo-300/50">
//               <div className="flex items-center mx-auto container px-4 relative z-10 pb-6">
//                 <div className="flex items-center">
//                   {currency.flagImage && (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.code} flag`}
//                       className="h-18 w-auto mr-4"
//                     />
//                   )}
//                   <div className="text-main leading-relaxed">
//                     <h1 className="font-bold text-2xl">{currency.code}</h1>
//                     <p className="font-medium">
//                       {currency.currencyName || "Currency Details"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Currency Form */}
//           <div className="container mx-auto px-4">
//             {/* General Details Section */}
//             <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
//               <TbPointFilled className="size-5" />
//               General Details
//             </h2>
//             <div className="bg-white rounded-xl p-4">
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-8">
//                   <div className="">
//                     <div className="space-y-6">
//                       {/* Code Field */}
//                       <div className="General-Code">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FaGlobe className="size-5 text-indigo-500" />
//                           <label className="inline-block font-medium text-main">
//                             Currency Code
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           value={currency.code}
//                           readOnly
//                           className="w-full p-4 bg-gray-100 text-main border border-gray-300 rounded-lg focus:outline-none"
//                         />
//                         <p className="mt-1 capitalize text-sm text-main font-medium">
//                           Currency code cannot be changed
//                         </p>
//                       </div>

//                       {/* Currency Name */}
//                       <div>
//                         <div className="flex items-center mb-2 gap-2">
//                           <FaMoneyBillWave className="h-5 w-5 text-indigo-500" />
//                           <label className="inline-block font-medium text-main">
//                             Currency Name
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="currencyName"
//                           value={currency.currencyName || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. Euro, US Dollar"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* Flag Image */}
//                       <div>
//                         <div className="flex items-center gap-2 mb-2">
//                           <svg
//                             className="size-6 text-indigo-500"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <label className="inline-block font-medium text-main">
//                             Flag Image Path
//                           </label>
//                         </div>

//                         <div className="flex">
//                           <div className="flex-grow relative">
//                             <input
//                               type="text"
//                               id="flagImage"
//                               name="flagImage"
//                               value={currency.flagImage || ""}
//                               onChange={handleChange}
//                               placeholder="/assets/flags/currency-code.png"
//                               className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                             />
//                             {currency.flagImage && (
//                               <div className="absolute top-1 right-1 size-12">
//                                 <img
//                                   src={currency.flagImage}
//                                   alt="Flag preview"
//                                   className="max-w-full max-h-full p-0.5"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h2 className="text-2xl flex items-center gap-2 -ml-4 font-medium text-main my-6">
//                       <TbPointFilled className="size-5" />
//                       Bank Details
//                     </h2>
//                     <div className="space-y-6">
//                       {/* IBAN */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaCreditCard className="size-5 text-indigo-500 mr-2" />
//                           <label className="inline-block font-medium text-main">
//                             IBAN
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="iban"
//                           value={currency.iban || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DE89370400440532013000"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* BIC/SWIFT */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="size-5 text-indigo-500 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                             />
//                           </svg>
//                           <label className="inline-block font-medium text-main">
//                             BIC/SWIFT
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="bicSwift"
//                           value={currency.bicSwift || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DEUTDEFF"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* Bank Address */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaUniversity className="h-5 w-5 text-indigo-500 mr-2" />
//                           <label className="inline-block font-medium text-main">
//                             Bank Address
//                           </label>
//                         </div>
//                         <textarea
//                           name="bankAddress"
//                           value={currency.bankAddress || ""}
//                           onChange={handleChange}
//                           cols={10}
//                           rows={3}
//                           placeholder="Enter complete bank address"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-4 flex justify-end space-x-4">
//                   <Link
//                     href="/admin/currencies"
//                     className="inline-flex justify-center py-3 px-10 border border-gray-300 font-medium rounded-lg text-main bg-white focus:outline-none"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="inline-flex justify-center cursor-pointer py-3 px-10 border border-transparent font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 transition-colors ease-in-out duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-2 size-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         <span>Updating...</span>
//                       </span>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaGlobe,
//   FaMoneyBillWave,
//   FaUniversity,
//   FaCreditCard,
//   FaPercentage,
// } from "react-icons/fa";
// import { TbPointFilled } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();
//   const [flagImageError, setFlagImageError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const validateForm = () => {
//     let isValid = true;
//     setFlagImageError(null);

//     if (!currency?.flagImage?.trim()) {
//       setFlagImageError("Flag Image Path is required.");
//       isValid = false;
//     } else if (currency.flagImage.includes(" ")) {
//       setFlagImageError("Flag Image Path should not contain spaces.");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value = e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));

//     if (e.target.name === "flagImage") {
//       setFlagImageError(null); // Clear error when user types
//     }
//   };

//   // Skeleton loading component
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-20 bg-gray-200 animate-pulse"></div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//                 <div className="md:col-span-2 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//                   <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-red-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-7"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currency) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-yellow-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-yellow-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Currency Not Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               The requested currency could not be found in our system.
//             </p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="font-medium">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-4xl mx-auto py-6 sm:px-6">
//         {/* Navigation */}
//         <div className="mb-6 px-4 sm:px-0">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center  font-medium text-main transition-colors"
//           >
//             <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
//             Back to Currencies
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
//           {/* Currency Header */}
//           <div className="relative">
//             <div className="h-26 flex items-end bg-primary/40">
//               <div className="flex items-center mx-auto container px-4 relative z-10 pb-6">
//                 <div className="flex items-center">
//                   {currency.flagImage && (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.code} flag`}
//                       className="h-18 w-auto mr-4"
//                     />
//                   )}
//                   <div className="text-main leading-relaxed">
//                     <h1 className="font-bold text-2xl">{currency.code}</h1>
//                     <p className="font-medium">
//                       {currency.currencyName || "Currency Details"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Currency Form */}
//           <div className="container mx-auto px-4">
//             {/* General Details Section */}
//             <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
//               <TbPointFilled className="size-5" />
//               General Details
//             </h2>
//             <div className="bg-white rounded-xl p-4">
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-8">
//                   <div className="">
//                     <div className="space-y-6">
//                       {/* Code Field */}
//                       <div className="General-Code">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FaGlobe className="size-5 text-primary dark:text-main" />
//                           <label className="inline-block font-medium text-main">
//                             Currency Code
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           value={currency.code}
//                           readOnly
//                           className="w-full p-4 bg-gray-100 text-main border border-gray-300 rounded-lg focus:outline-none"
//                         />
//                         <p className="mt-1 capitalize text-sm text-main font-medium">
//                           Currency code cannot be changed
//                         </p>
//                       </div>

//                       {/* Currency Name */}
//                       <div>
//                         <div className="flex items-center mb-2 gap-2">
//                           <FaMoneyBillWave className="h-5 w-5 text-primary dark:text-main" />
//                           <label className="inline-block font-medium text-main">
//                             Currency Name
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="currencyName"
//                           value={currency.currencyName || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. Euro, US Dollar"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* Flag Image */}
//                       <div>
//                         <div className="flex items-center gap-2 mb-2">
//                           <svg
//                             className="size-6 text-primary dark:text-main"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <label className="inline-block font-medium text-main">
//                             Flag Image Path
//                           </label>
//                         </div>

//                         <div className="flex flex-col">
//                           <div className="flex-grow relative">
//                             <input
//                               type="text"
//                               id="flagImage"
//                               name="flagImage"
//                               value={currency.flagImage || ""}
//                               onChange={handleChange}
//                               placeholder="/assets/flags/currency-code.png"
//                               className={`w-full p-4 bg-white text-main font-medium border ${
//                                 flagImageError
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } rounded-lg focus:outline-none transition-all`}
//                             />
//                             {currency.flagImage && (
//                               <div className="absolute top-1 right-1 size-12">
//                                 <img
//                                   src={currency.flagImage}
//                                   alt="Flag preview"
//                                   className="max-w-full max-h-full p-0.5"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           {flagImageError && (
//                             <p className="mt-1 text-sm text-red-500 font-medium">
//                               {flagImageError}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h2 className="text-2xl flex items-center gap-2 -ml-4 font-medium text-main my-6">
//                       <TbPointFilled className="size-5" />
//                       Bank Details
//                     </h2>
//                     <div className="space-y-6">
//                       {/* IBAN */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaCreditCard className="size-5 text-primary dark:text-main mr-2" />
//                           <label className="inline-block font-medium text-main">
//                             IBAN
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="iban"
//                           value={currency.iban || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DE89370400440532013000"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* BIC/SWIFT */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="size-5 text-primary dark:text-main mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                             />
//                           </svg>
//                           <label className="inline-block font-medium text-main">
//                             BIC/SWIFT
//                           </label>
//                         </div>
//                         <input
//                           type="text"
//                           name="bicSwift"
//                           value={currency.bicSwift || ""}
//                           onChange={handleChange}
//                           placeholder="e.g. DEUTDEFF"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>

//                       {/* Bank Address */}
//                       <div>
//                         <div className="flex items-center mb-2">
//                           <FaUniversity className="h-5 w-5 text-primary  mr-2" />
//                           <label className="inline-block font-medium text-main">
//                             Bank Address
//                           </label>
//                         </div>
//                         <textarea
//                           name="bankAddress"
//                           value={currency.bankAddress || ""}
//                           onChange={handleChange}
//                           cols={10}
//                           rows={3}
//                           placeholder="Enter complete bank address"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-4 flex justify-end space-x-4">
//                   <Link
//                     href="/admin/currencies"
//                     className="inline-flex justify-center py-3 px-10 border border-gray-300 font-medium rounded-lg text-main bg-white focus:outline-none"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="inline-flex justify-center cursor-pointer py-3 px-10 border border-transparent font-medium rounded-lg text-secondary bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-2 size-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         <span>Updating...</span>
//                       </span>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaGlobe,
//   FaMoneyBillWave,
//   FaUniversity,
//   FaCreditCard,
//   FaPercentage,
// } from "react-icons/fa";
// import { TbPointFilled } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   payeeName?: string;
//   iban?: string;
//   bicSwift?: string;
//   bankAddress?: string;
//   wiseFeePercentage?: number;
//   bankTransferFee?: number;
//   flagImage?: string;
//   currencyName?: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();
//   const [flagImageError, setFlagImageError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCurrency = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCurrency(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load currency details"
//         );
//         setIsLoading(false);
//       }
//     };

//     if (currencyId) {
//       fetchCurrency();
//     }
//   }, [currencyId, token]);

//   const validateForm = () => {
//     let isValid = true;
//     setFlagImageError(null);

//     if (!currency?.flagImage?.trim()) {
//       setFlagImageError("Flag Image Path is required.");
//       isValid = false;
//     } else if (currency.flagImage.includes(" ")) {
//       setFlagImageError("Flag Image Path should not contain spaces.");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await axios.put(`/admin/currencies/${currencyId}`, currency, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsSubmitting(false);
//       setSuccessMessage("Currency updated successfully!");

//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update currency");
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const value =
//       e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
//     setCurrency((prev) => (prev ? { ...prev, [e.target.name]: value } : null));

//     if (e.target.name === "flagImage") {
//       setFlagImageError(null); // Clear error when user types
//     }
//   };

//   // Skeleton loading component
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-20 bg-gray-200 animate-pulse"></div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
//                     <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//                 <div className="md:col-span-2 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//                   <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="h-12 bg-blue-100 rounded animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-red-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-7"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currency) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-yellow-500 h-2"></div>
//           <div className="p-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
//               <svg
//                 className="w-8 h-8 text-yellow-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Currency Not Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               The requested currency could not be found in our system.
//             </p>
//             <Link
//               href="/admin/currencies"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Return to Currencies
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="font-medium">{successMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-4xl mx-auto py-6 sm:px-6">
//         {/* Navigation */}
//         <div className="mb-6 px-4 sm:px-0">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center  font-medium text-main transition-colors"
//           >
//             <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
//             Back to Currencies
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
//           {/* Currency Header */}
//           <div className="relative">
//             <div className="h-26 flex items-end bg-primary/40">
//               <div className="flex items-center mx-auto container px-4 relative z-10 pb-6">
//                 <div className="flex items-center">
//                   {currency.flagImage && (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.code} flag`}
//                       className="h-18 w-auto mr-4"
//                     />
//                   )}
//                   <div className="text-main leading-relaxed">
//                     <h1 className="font-bold text-2xl">{currency.code}</h1>
//                     <p className="font-medium">
//                       {currency.currencyName || "Currency Details"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Currency Form */}
//           <div className="container mx-auto px-4 pb-8">
//             <form onSubmit={handleSubmit}>
//               {/* General Details Section */}
//               <section className="mt-6">
//                 <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
//                   <TbPointFilled className="size-5" />
//                   General Details
//                 </h2>
//                 <div className="bg-white rounded-xl p-4 border border-gray-200">
//                   <div className="space-y-8">
//                     <div className="">
//                       <div className="space-y-6">
//                         {/* Code Field */}
//                         <div className="General-Code">
//                           <div className="flex items-center gap-2 mb-2">
//                             <FaGlobe className="size-5 text-primary dark:text-main" />
//                             <label className="inline-block font-medium text-main">
//                               Currency Code
//                             </label>
//                           </div>
//                           <input
//                             type="text"
//                             value={currency?.code}
//                             readOnly
//                             className="w-full p-4 bg-gray-100 text-main border border-gray-300 rounded-lg focus:outline-none"
//                           />
//                           <p className="mt-1 capitalize text-sm text-main font-medium">
//                             Currency code cannot be changed
//                           </p>
//                         </div>

//                         {/* Currency Name */}
//                         <div>
//                           <div className="flex items-center mb-2 gap-2">
//                             <FaMoneyBillWave className="h-5 w-5 text-primary dark:text-main" />
//                             <label className="inline-block font-medium text-main">
//                               Currency Name
//                             </label>
//                           </div>
//                           <input
//                             type="text"
//                             name="currencyName"
//                             value={currency?.currencyName || ""}
//                             onChange={handleChange}
//                             placeholder="e.g. Euro, US Dollar"
//                             className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                           />
//                         </div>

//                         {/* Flag Image */}
//                         <div>
//                           <div className="flex items-center gap-2 mb-2">
//                             <svg
//                               className="size-6 text-primary dark:text-main"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               />
//                             </svg>
//                             <label className="inline-block font-medium text-main">
//                               Flag Image Path
//                             </label>
//                           </div>

//                           <div className="flex flex-col">
//                             <div className="flex-grow relative">
//                               <input
//                                 type="text"
//                                 id="flagImage"
//                                 name="flagImage"
//                                 value={currency?.flagImage || ""}
//                                 onChange={handleChange}
//                                 placeholder="/assets/flags/currency-code.png"
//                                 className={`w-full p-4 bg-white text-main font-medium border ${
//                                   flagImageError
//                                     ? "border-red-500"
//                                     : "border-gray-300"
//                                 } rounded-lg focus:outline-none transition-all`}
//                               />
//                               {currency?.flagImage && (
//                                 <div className="absolute top-1 right-1 size-12">
//                                   <img
//                                     src={currency.flagImage}
//                                     alt="Flag preview"
//                                     className="max-w-full max-h-full p-0.5"
//                                   />
//                                 </div>
//                               )}
//                             </div>
//                             {flagImageError && (
//                               <p className="mt-1 text-sm text-red-500 font-medium">
//                                 {flagImageError}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Bank Details Section */}
//               <section className="mt-6">
//                 <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
//                   <TbPointFilled className="size-5" />
//                   Bank Details
//                 </h2>
//                 <div className="bg-white rounded-xl p-4 border border-gray-200">
//                   <div className="space-y-6">
//                     {/* IBAN */}
//                     <div>
//                       <div className="flex items-center mb-2">
//                         <FaCreditCard className="size-5 text-primary dark:text-main mr-2" />
//                         <label className="inline-block font-medium text-main">
//                           IBAN
//                         </label>
//                       </div>
//                       <input
//                         type="text"
//                         name="iban"
//                         value={currency?.iban || ""}
//                         onChange={handleChange}
//                         placeholder="e.g. DE89370400440532013000"
//                         className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                       />
//                     </div>

//                     {/* BIC/SWIFT */}
//                     <div>
//                       <div className="flex items-center mb-2">
//                         <svg
//                           className="size-5 text-primary dark:text-main mr-2"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                           />
//                         </svg>
//                         <label className="inline-block font-medium text-main">
//                           BIC/SWIFT
//                         </label>
//                       </div>
//                       <input
//                         type="text"
//                         name="bicSwift"
//                         value={currency?.bicSwift || ""}
//                         onChange={handleChange}
//                         placeholder="e.g. DEUTDEFF"
//                         className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                       />
//                     </div>

//                     {/* Bank Address */}
//                     <div>
//                       <div className="flex items-center mb-2">
//                         <FaUniversity className="h-5 w-5 text-primary  mr-2" />
//                         <label className="inline-block font-medium text-main">
//                           Bank Address
//                         </label>
//                       </div>
//                       <textarea
//                         name="bankAddress"
//                         value={currency?.bankAddress || ""}
//                         onChange={handleChange}
//                         cols={10}
//                         rows={3}
//                         placeholder="Enter complete bank address"
//                         className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Fees Section */}
//               <section className="mt-6">
//                 <h2 className="text-2xl flex items-center gap-2 font-medium text-main my-4">
//                   <TbPointFilled className="size-5" />
//                   Fees
//                 </h2>
//                 <div className="bg-white rounded-xl p-4 border border-gray-200">
//                   <div className="space-y-6">
//                     {/* remityn Fee Percentage */}
//                     <div>
//                       <div className="flex items-center mb-2">
//                         <FaPercentage className="h-5 w-5 text-primary mr-2" />
//                         <label className="block font-medium text-main">
//                           remityn Fee Percentage
//                         </label>
//                       </div>
//                       <div className="relative">
//                         <input
//                           type="number"
//                           name="wiseFeePercentage"
//                           value={currency?.wiseFeePercentage || 0}
//                           onChange={handleChange}
//                           step="0.0001"
//                           placeholder="0.0000"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all pr-12"
//                         />
//                         <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                           <span className="text-gray-500">%</span>
//                         </div>
//                       </div>
//                       <p className="mt-1 text-xs text-gray-500">
//                         The fee percentage charged by remityn for this currency
//                       </p>
//                     </div>

//                     {/* Bank Transfer Fee */}
//                     <div>
//                       <div className="flex items-center mb-2">
//                         <svg
//                           className="h-5 w-5 text-primary mr-2"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <label className="block font-medium text-main">
//                           Bank Transfer Fee
//                         </label>
//                       </div>
//                       <div className="relative">
//                         <input
//                           type="number"
//                           name="bankTransferFee"
//                           value={currency?.bankTransferFee || 0}
//                           onChange={handleChange}
//                           step="0.01"
//                           placeholder="0.00"
//                           className="w-full p-4 bg-white text-main font-medium border border-gray-300 rounded-lg focus:outline-none transition-all pr-16"
//                         />
//                         <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                           <span className="text-gray-500">
//                             {currency?.code}
//                           </span>
//                         </div>
//                       </div>
//                       <p className="mt-1 text-xs text-gray-500">
//                         The fixed fee charged for bank transfers in this
//                         currency
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Action Buttons */}
//               <div className="mt-8 flex justify-end space-x-4">
//                 <Link
//                   href="/admin/currencies"
//                   className="inline-flex justify-center py-3 px-10 border border-gray-300 font-medium rounded-lg text-main bg-white focus:outline-none"
//                 >
//                   Cancel
//                 </Link>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="inline-flex justify-center cursor-pointer py-3 px-10 border border-transparent font-medium rounded-lg text-secondary bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-2 size-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       <span>Updating...</span>
//                     </span>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   Loader2,
//   ArrowLeft,
//   Save,
//   Globe,
//   DollarSign,
//   Building,
//   Landmark,
//   Hash,
//   Percent, // Use Percent icon
//   Image as ImageIcon,
//   AlertTriangle,
//   Check,
//   X,
// } from "lucide-react";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   // Keep interface updated
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string | null;
//   payeeName?: string | null;
//   iban?: string | null;
//   bicSwift?: string | null;
//   bankAddress?: string | null;
//   wiseFeePercentage?: number | null;
//   bankTransferFee?: number | null;
//   rateAdjustmentPercentage?: number | null; // Updated field
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CurrencyFormState {
//   // Updated state
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   payeeName: string;
//   iban: string;
//   bicSwift: string;
//   bankAddress: string;
//   wiseFeePercentage: string;
//   bankTransferFee: string;
//   rateAdjustmentPercentage: string; // Updated field
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const { token } = useAuth();

//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [formState, setFormState] = useState<CurrencyFormState | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // Fetch Currency Data
//   useEffect(() => {
//     const fetchCurrency = async () => {
//       if (!token || !currencyId) {
//         setIsLoading(false);
//         setError("Missing token or currency ID.");
//         // Consider redirecting if token is missing
//         if (!token) router.push("/auth/login");
//         return;
//       }
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get<Currency>(
//           `/admin/currencies/${currencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCurrency(response.data);
//         // Initialize form state from fetched data
//         setFormState({
//           code: response.data.code || "",
//           currencyName: response.data.currencyName || "",
//           flagImage: response.data.flagImage || "",
//           payeeName: response.data.payeeName || "",
//           iban: response.data.iban || "",
//           bicSwift: response.data.bicSwift || "",
//           bankAddress: response.data.bankAddress || "",
//           wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//           bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//           rateAdjustmentPercentage:
//             response.data.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string
//         });
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         if (err.response?.status === 404) {
//           setError("Currency not found.");
//         } else if (
//           err.response?.status === 401 ||
//           err.response?.status === 403
//         ) {
//           setError("Unauthorized. Redirecting to login...");
//           setTimeout(() => router.push("/auth/login"), 2000);
//         } else {
//           setError(
//             err.response?.data?.message || "Failed to load currency details"
//           );
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrency();
//   }, [currencyId, token, router]);

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => (prev ? { ...prev, [name]: value } : null));
//     setError(null); // Clear error on change
//     setSuccessMessage(null); // Clear success on change
//   };

//   // Handle Form Submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!formState || !currencyId || !token) {
//       setError("Form data or required parameters missing.");
//       return;
//     }

//     setError(null);
//     setSuccessMessage(null);
//     setIsSubmitting(true);

//     // Prepare payload, converting numbers and handling nulls/empty strings
//     const payload: Partial<Currency> = {
//       code: formState.code.toUpperCase().trim(), // Keep code, though backend service might ignore it
//       currencyName: formState.currencyName.trim(),
//       flagImage: formState.flagImage.trim() || null,
//       payeeName: formState.payeeName.trim() || null,
//       iban: formState.iban.trim() || null,
//       bicSwift: formState.bicSwift.trim() || null,
//       bankAddress: formState.bankAddress.trim() || null,
//       wiseFeePercentage:
//         formState.wiseFeePercentage !== ""
//           ? parseFloat(formState.wiseFeePercentage)
//           : null,
//       bankTransferFee:
//         formState.bankTransferFee !== ""
//           ? parseFloat(formState.bankTransferFee)
//           : null,
//       // Parse rateAdjustmentPercentage
//       rateAdjustmentPercentage:
//         formState.rateAdjustmentPercentage !== ""
//           ? parseFloat(formState.rateAdjustmentPercentage)
//           : 0, // Default to 0 if empty
//     };
//     // Validation
//     if (
//       payload.wiseFeePercentage !== null &&
//       (isNaN(payload.wiseFeePercentage) || payload.wiseFeePercentage < 0)
//     ) {
//       setError("remityn Fee % must be non-negative.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.bankTransferFee !== null &&
//       (isNaN(payload.bankTransferFee) || payload.bankTransferFee < 0)
//     ) {
//       setError("Bank Fee must be non-negative.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.rateAdjustmentPercentage !== null &&
//       isNaN(payload.rateAdjustmentPercentage)
//     ) {
//       setError("Rate Adjustment must be a number.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.put<Currency>(
//         `/admin/currencies/${currencyId}`,
//         payload,
//         {
//           /* ... headers ... */
//         }
//       );
//       setCurrency(response.data);
//       // Re-initialize form state AFTER successful save to reflect saved data
//       setFormState({
//         code: response.data.code || "",
//         currencyName: response.data.currencyName || "",
//         flagImage: response.data.flagImage || "",
//         payeeName: response.data.payeeName || "",
//         iban: response.data.iban || "",
//         bicSwift: response.data.bicSwift || "",
//         bankAddress: response.data.bankAddress || "",
//         wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//         bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//         rateAdjustmentPercentage:
//           response.data.rateAdjustmentPercentage?.toString() ?? "0", // Update form state
//       });
//       setSuccessMessage("Currency updated successfully!");
//       // setTimeout(() => router.push('/admin/currencies'), 2000);
//     } catch (err: any) {
//       /* ... error handling ... */
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- RENDER LOGIC ---

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//         <Loader2 size={48} className="text-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   if (error && !currency) {
//     // Show error prominently if loading failed entirely
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-red-500">
//           <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">
//             Loading Error
//           </h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Link
//             href="/admin/currencies"
//             className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover"
//           >
//             <ArrowLeft size={16} className="mr-2" /> Back to Currencies
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!currency || !formState) {
//     // Should be caught by above, but fallback
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <p className="text-gray-600">Currency data could not be loaded.</p>
//         <Link
//           href="/admin/currencies"
//           className="ml-4 text-primary hover:underline"
//         >
//           Go back
//         </Link>
//       </div>
//     );
//   }

//   // Main component render
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Sticky Header with Save/Cancel */}
//       <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
//           <Link
//             href="/admin/currencies"
//             className="group flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <ArrowLeft
//               size={18}
//               className="mr-2 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:-translate-x-1"
//             />
//             Back to Currencies
//           </Link>
//           <div className="flex items-center gap-3">
//             <Link
//               href="/admin/currencies"
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Cancel
//             </Link>
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               type="submit"
//               form="currency-edit-form"
//               className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <Loader2 size={16} className="animate-spin" />
//               ) : (
//                 <Save size={16} />
//               )}
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm flex items-center"
//             >
//               <Check size={20} className="text-green-600 mr-3" />
//               <p className="text-sm font-medium text-green-800">
//                 {successMessage}
//               </p>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="ml-auto text-green-500 hover:text-green-700"
//               >
//
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm flex items-center"
//             >
//               <AlertTriangle size={20} className="text-red-600 mr-3" />
//               <p className="text-sm font-medium text-red-800">{error}</p>
//               <button
//                 onClick={() => setError(null)}
//                 className="ml-auto text-red-500 hover:text-red-700"
//               >
//
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Form Card */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//           <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-4">
//             {formState.flagImage && (
//               <img
//                 src={formState.flagImage}
//                 alt={`${formState.code} flag`}
//                 className="h-10 w-auto object-contain border rounded-full p-0.5"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).style.display = "none";
//                 }}
//               />
//             )}
//             <h2 className="text-lg font-semibold text-gray-900">
//
//               Edit Currency: {formState.code} - {formState.currencyName}
//             </h2>
//           </div>

//           <form
//             id="currency-edit-form"
//             onSubmit={handleSubmit}
//             className="p-6 space-y-8"
//           >
//             {/* General Details Section */}
//             <section>
//               <h3 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-200 pb-2 mb-4">
//                 General Information
//               </h3>
//               <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
//                 {/* Code (Readonly) */}
//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="code"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <Globe size={18} /> Code
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="code"
//                       value={formState.code}
//                       readOnly
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
//                     />
//                   </div>
//                 </div>
//                 {/* Currency Name */}
//                 <div className="sm:col-span-4">
//                   <label
//                     htmlFor="currencyName"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <DollarSign size={18} /> Currency Name
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="currencyName"
//                       id="currencyName"
//                       value={formState.currencyName}
//                       onChange={handleChange}
//                       required
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition"
//                     />
//                   </div>
//                 </div>
//                 {/* Flag Image Path */}
//                 <div className="sm:col-span-6">
//                   <label
//                     htmlFor="flagImage"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <ImageIcon size={18} /> Flag Image Path
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="flagImage"
//                       id="flagImage"
//                       value={formState.flagImage}
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/eur.png"
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition"
//                     />
//                     <p className="mt-1 text-xs text-gray-500">
//                       Provide the relative path to the flag image.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Bank Details Section */}
//             <section>
//               <h3 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-200 pb-2 mb-4">
//                 Bank Details (Optional)
//               </h3>
//               <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
//                 {/* Payee Name */}
//                 <div className="sm:col-span-6">
//                   <label
//                     htmlFor="payeeName"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <Building size={18} /> Payee Name
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="payeeName"
//                       id="payeeName"
//                       value={formState.payeeName}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition"
//                     />
//                   </div>
//                 </div>
//                 {/* IBAN */}
//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="iban"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <Hash size={18} /> IBAN
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="iban"
//                       id="iban"
//                       value={formState.iban}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition"
//                     />
//                   </div>
//                 </div>
//                 {/* BIC/SWIFT */}
//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="bicSwift"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <Hash size={18} /> BIC/SWIFT
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="bicSwift"
//                       id="bicSwift"
//                       value={formState.bicSwift}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition"
//                     />
//                   </div>
//                 </div>
//                 {/* Bank Address */}
//                 <div className="col-span-full">
//                   <label
//                     htmlFor="bankAddress"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <Landmark size={18} /> Bank Address
//                   </label>
//                   <div className="mt-1">
//                     <textarea
//                       id="bankAddress"
//                       name="bankAddress"
//                       rows={3}
//                       value={formState.bankAddress}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition"
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Fees & Rates Section */}
//             <section>
//               <h3 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-200 pb-2 mb-4">
//                 Fees & Custom Rate
//               </h3>
//               <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
//                 {/* remityn Fee Percentage */}
//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="wiseFeePercentage"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <Percent size={18} /> remityn Fee %
//                   </label>
//                   <div className="relative mt-1 rounded-md shadow-sm">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       id="wiseFeePercentage"
//                       value={formState.wiseFeePercentage}
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition pr-10"
//                       placeholder="0.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//
//                       <span className="text-gray-500 sm:text-sm">%</span>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Bank Transfer Fee */}
//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="bankTransferFee"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//
//                     <DollarSign size={18} /> Bank Fee
//                   </label>
//                   <div className="relative mt-1 rounded-md shadow-sm">
//                     <input
//                       type="number"
//                       name="bankTransferFee"
//                       id="bankTransferFee"
//                       value={formState.bankTransferFee}
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition pr-12"
//                       placeholder="0.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//
//                       <span className="text-gray-500 sm:text-sm">
//                         {formState.code || "CUR"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Rate Adjustment Percentage - UPDATED */}
//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="rateAdjustmentPercentage"
//                     className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-1.5"
//                   >
//                     <Percent size={18} /> Rate Adjustment
//                   </label>
//                   <div className="relative mt-1 rounded-md shadow-sm">
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage" // Correct name
//                       id="rateAdjustmentPercentage"
//                       value={formState.rateAdjustmentPercentage}
//                       onChange={handleChange}
//                       step="any" // Allow decimals
//                       className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition pr-10"
//                       placeholder="e.g., 0.5"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//
//                       <span className="text-gray-500 sm:text-sm">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-1 text-xs text-gray-500">
//                     Adjustment vs market rate. (+0.5%, -0.1%)
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* Timestamps (Readonly) */}
//             <section>
//               <h3 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-200 pb-2 mb-4">
//                 Metadata
//               </h3>
//               <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
//                 <div className="sm:col-span-3">
//                   <p className="block text-sm font-medium text-gray-500">
//                     Created At
//                   </p>
//                   <p className="mt-1 text-sm text-gray-700">
//                     {currency.createdAt
//                       ? new Date(currency.createdAt).toLocaleString()
//                       : "N/A"}
//                   </p>
//                 </div>
//                 <div className="sm:col-span-3">
//                   <p className="block text-sm font-medium text-gray-500">
//                     Last Updated
//                   </p>
//                   <p className="mt-1 text-sm text-gray-700">
//                     {currency.updatedAt
//                       ? new Date(currency.updatedAt).toLocaleString()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* Form action buttons are in the sticky header */}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion, AnimatePresence } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   Loader2,
//   ArrowLeft,
//   Save,
//   Globe,
//   DollarSign,
//   Building,
//   Landmark,
//   Hash,
//   Percent,
//   Image as ImageIcon,
//   AlertTriangle,
//   Check,
//   X,
//   ChevronRight,
//   CreditCard,
//   BarChart4,
//   Trash2,
//   RefreshCw,
//   Lock,
// } from "lucide-react";
// import {
//   FaArrowLeftLong,
//   FaCreditCard,
//   FaGlobe,
//   FaIdCard,
// } from "react-icons/fa6";
// import { FaPercentage } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string | null;
//   payeeName?: string | null;
//   iban?: string | null;
//   bicSwift?: string | null;
//   bankAddress?: string | null;
//   wiseFeePercentage?: number | null;
//   bankTransferFee?: number | null;
//   rateAdjustmentPercentage?: number | null;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CurrencyFormState {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   payeeName: string;
//   iban: string;
//   bicSwift: string;
//   bankAddress: string;
//   wiseFeePercentage: string;
//   bankTransferFee: string;
//   rateAdjustmentPercentage: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const { token } = useAuth();

//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [formState, setFormState] = useState<CurrencyFormState | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"general" | "bank" | "fees">(
//     "general"
//   );
//   const [formChanged, setFormChanged] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   const tabVariants = {
//     inactive: {
//       color: "#6B7280",
//       backgroundColor: "transparent",
//       boxShadow: "none",
//     },
//     active: {
//       color: "#FFFFFF",
//       backgroundColor: "#1D4ED8",
//       boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//     },
//   };

//   // Fetch Currency Data
//   useEffect(() => {
//     const fetchCurrency = async () => {
//       if (!token || !currencyId) {
//         setIsLoading(false);
//         setError("Missing token or currency ID.");
//         if (!token) router.push("/auth/login");
//         return;
//       }
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get<Currency>(
//           `/admin/currencies/${currencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCurrency(response.data);
//         // Initialize form state from fetched data
//         setFormState({
//           code: response.data.code || "",
//           currencyName: response.data.currencyName || "",
//           flagImage: response.data.flagImage || "",
//           payeeName: response.data.payeeName || "",
//           iban: response.data.iban || "",
//           bicSwift: response.data.bicSwift || "",
//           bankAddress: response.data.bankAddress || "",
//           wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//           bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//           rateAdjustmentPercentage:
//             response.data.rateAdjustmentPercentage?.toString() ?? "0",
//         });
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         if (err.response?.status === 404) {
//           setError("Currency not found.");
//         } else if (
//           err.response?.status === 401 ||
//           err.response?.status === 403
//         ) {
//           setError("Unauthorized. Redirecting to login...");
//           setTimeout(() => router.push("/auth/login"), 2000);
//         } else {
//           setError(
//             err.response?.data?.message || "Failed to load currency details"
//           );
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrency();
//   }, [currencyId, token, router]);

//   // Track form changes
//   useEffect(() => {
//     if (!currency || !formState) return;

//     const isChanged =
//       formState.currencyName !== (currency.currencyName || "") ||
//       formState.flagImage !== (currency.flagImage || "") ||
//       formState.payeeName !== (currency.payeeName || "") ||
//       formState.iban !== (currency.iban || "") ||
//       formState.bicSwift !== (currency.bicSwift || "") ||
//       formState.bankAddress !== (currency.bankAddress || "") ||
//       formState.wiseFeePercentage !==
//         (currency.wiseFeePercentage?.toString() ?? "") ||
//       formState.bankTransferFee !==
//         (currency.bankTransferFee?.toString() ?? "") ||
//       formState.rateAdjustmentPercentage !==
//         (currency.rateAdjustmentPercentage?.toString() ?? "0");

//     setFormChanged(isChanged);
//   }, [currency, formState]);

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => (prev ? { ...prev, [name]: value } : null));
//     setError(null);
//     setSuccessMessage(null);
//   };

//   // Handle Form Submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!formState || !currencyId || !token) {
//       setError("Form data or required parameters missing.");
//       return;
//     }

//     setError(null);
//     setSuccessMessage(null);
//     setIsSubmitting(true);

//     // Prepare payload, converting numbers and handling nulls/empty strings
//     const payload: Partial<Currency> = {
//       code: formState.code.toUpperCase().trim(),
//       currencyName: formState.currencyName.trim(),
//       flagImage: formState.flagImage.trim() || null,
//       payeeName: formState.payeeName.trim() || null,
//       iban: formState.iban.trim() || null,
//       bicSwift: formState.bicSwift.trim() || null,
//       bankAddress: formState.bankAddress.trim() || null,
//       wiseFeePercentage:
//         formState.wiseFeePercentage !== ""
//           ? parseFloat(formState.wiseFeePercentage)
//           : null,
//       bankTransferFee:
//         formState.bankTransferFee !== ""
//           ? parseFloat(formState.bankTransferFee)
//           : null,
//       rateAdjustmentPercentage:
//         formState.rateAdjustmentPercentage !== ""
//           ? parseFloat(formState.rateAdjustmentPercentage)
//           : 0,
//     };

//     // Validation
//     if (
//       payload.wiseFeePercentage !== null &&
//       (isNaN(payload.wiseFeePercentage) || payload.wiseFeePercentage < 0)
//     ) {
//       setError("remityn Fee % must be non-negative.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.bankTransferFee !== null &&
//       (isNaN(payload.bankTransferFee) || payload.bankTransferFee < 0)
//     ) {
//       setError("Bank Fee must be non-negative.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.rateAdjustmentPercentage !== null &&
//       isNaN(payload.rateAdjustmentPercentage)
//     ) {
//       setError("Rate Adjustment must be a number.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.put<Currency>(
//         `/admin/currencies/${currencyId}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCurrency(response.data);
//       setFormState({
//         code: response.data.code || "",
//         currencyName: response.data.currencyName || "",
//         flagImage: response.data.flagImage || "",
//         payeeName: response.data.payeeName || "",
//         iban: response.data.iban || "",
//         bicSwift: response.data.bicSwift || "",
//         bankAddress: response.data.bankAddress || "",
//         wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//         bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//         rateAdjustmentPercentage:
//           response.data.rateAdjustmentPercentage?.toString() ?? "0",
//       });
//       setSuccessMessage("Currency updated successfully!");
//       setFormChanged(false);
//     } catch (err: any) {
//       console.error("Update error:", err);
//       setError(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form to initial values
//   const handleReset = () => {
//     if (!currency) return;

//     setFormState({
//       code: currency.code || "",
//       currencyName: currency.currencyName || "",
//       flagImage: currency.flagImage || "",
//       payeeName: currency.payeeName || "",
//       iban: currency.iban || "",
//       bicSwift: currency.bicSwift || "",
//       bankAddress: currency.bankAddress || "",
//       wiseFeePercentage: currency.wiseFeePercentage?.toString() ?? "",
//       bankTransferFee: currency.bankTransferFee?.toString() ?? "",
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });

//     setError(null);
//     setSuccessMessage("Form reset to saved values");
//     setTimeout(() => setSuccessMessage(null), 3000);
//   };

//   // Render tabs content
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "general":
//         return (
//           <motion.div
//             key="general"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white border p-6 shadow-md"
//             >
//               <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
//                 General Information
//               </h3>
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Code (Readonly) */}
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Globe size={18} className="text-primary" />
//                     Currency Code
//                   </label>
//                   <div className="relative mt-1">
//                     <input
//                       type="text"
//                       id="code"
//                       value={formState?.code}
//                       readOnly
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                     <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                       <Lock size={18} />
//                     </span>
//                   </div>
//                 </div>

//                 {/* Currency Name */}
//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <DollarSign size={18} className="text-primary" />
//                     Currency Name
//                   </label>
//                   <input
//                     type="text"
//                     name="currencyName"
//                     id="currencyName"
//                     value={formState?.currencyName}
//                     onChange={handleChange}
//                     required
//                     className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* Flag Image Path */}
//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="flagImage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <ImageIcon size={18} className="text-primary" />
//                     Flag Image Path
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="flagImage"
//                       id="flagImage"
//                       value={formState?.flagImage}
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/eur.png"
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                     {formState?.flagImage && (
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         <img
//                           src={formState.flagImage}
//                           alt={`${formState.code} flag`}
//                           className="h-10 w-auto object-cover"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).style.display =
//                               "none";
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500">
//                     Provide the relative path to the flag image (e.g.,
//                     /assets/icon/flags/eur.png)
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white border shadow-md"
//             >
//               <h3 className="border-b px-6 py-3 text-lg font-semibold text-gray-800">
//                 Metadata
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//                 <div>
//                   <p className="font-medium text-gray">Created At :</p>
//                   <div className="rounded-md bg-gray-50 py-2  text-gray-700">
//                     {currency?.createdAt
//                       ? new Date(currency.createdAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray">Last Updated :</p>
//                   <div className="rounded-md bg-gray-50 py-2  text-gray-700">
//                     {currency?.updatedAt
//                       ? new Date(currency.updatedAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "bank":
//         return (
//           <motion.div
//             key="bank"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white p-6 shadow-md"
//             >
//               <div className="mb-4 flex items-center justify-between border-b pb-2">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Bank Details
//                 </h3>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-6">
//                 {/* Payee Name */}
//                 <div>
//                   <label
//                     htmlFor="payeeName"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <Building size={18} className="text-primary" />
//                     Payee Name
//                   </label>
//                   <input
//                     type="text"
//                     name="payeeName"
//                     id="payeeName"
//                     value={formState?.payeeName}
//                     onChange={handleChange}
//                     className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* IBAN and BIC/SWIFT */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label
//                       htmlFor="iban"
//                       className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                     >
//                       <Hash size={18} className="text-primary" />
//                       IBAN
//                     </label>
//                     <input
//                       type="text"
//                       name="iban"
//                       id="iban"
//                       value={formState?.iban}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="bicSwift"
//                       className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                     >
//                       <Hash size={18} className="text-primary" />
//                       BIC/SWIFT
//                     </label>
//                     <input
//                       type="text"
//                       name="bicSwift"
//                       id="bicSwift"
//                       value={formState?.bicSwift}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                   </div>
//                 </div>

//                 {/* Bank Address */}
//                 <div>
//                   <label
//                     htmlFor="bankAddress"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <Landmark size={18} className="text-primary" />
//                     Bank Address
//                   </label>
//                   <textarea
//                     id="bankAddress"
//                     name="bankAddress"
//                     rows={3}
//                     value={formState?.bankAddress}
//                     onChange={handleChange}
//                     className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium"
//                   ></textarea>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "fees":
//         return (
//           <motion.div
//             key="fees"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white p-6 shadow-md"
//             >
//               <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
//                 Fees & Exchange Rate Settings
//               </h3>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* remityn Fee Percentage */}
//                 <div>
//                   <label
//                     htmlFor="wiseFeePercentage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <Percent size={18} className="text-primary" />
//                     remityn Fee Percentage
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       id="wiseFeePercentage"
//                       value={formState?.wiseFeePercentage}
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium pr-12"
//                       placeholder="0.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500">
//                     Applicable fee percentage for remityn transfers
//                   </p>
//                 </div>

//                 {/* Bank Transfer Fee */}
//                 <div>
//                   <label
//                     htmlFor="bankTransferFee"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <DollarSign size={18} className="text-primary" />
//                     Bank Transfer Fee
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="bankTransferFee"
//                       id="bankTransferFee"
//                       value={formState?.bankTransferFee}
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium pr-16"
//                       placeholder="0.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">
//                         {formState?.code || "CUR"}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500">
//                     Fixed fee applied to bank transfers
//                   </p>
//                 </div>

//                 {/* Rate Adjustment Percentage */}
//                 <div>
//                   <label
//                     htmlFor="rateAdjustmentPercentage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <Percent size={18} className="text-primary" />
//                     Rate Adjustment
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage"
//                       id="rateAdjustmentPercentage"
//                       value={formState?.rateAdjustmentPercentage}
//                       onChange={handleChange}
//                       step="any"
//                       className="block w-full rounded-md border border-gray-300 py-3 px-4 text-main placeholder:text-gray-400 focus:outline-none font-medium pr-12"
//                       placeholder="e.g., 0.5"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500">
//                     Adjustment vs market rate (positive or negative)
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 rounded-md bg-blue-50 p-4">
//                 <h4 className="mb-4 flex items-center gap-1.5 font-bold text-main">
//                   <BarChart4 size={20} />
//                   Exchange Rate Info
//                 </h4>
//                 <p className="text-main">
//                   The Rate Adjustment percentage modifies the market exchange
//                   rate. A positive value increases the rate (favorable for
//                   buyers), while a negative value decreases it (favorable for
//                   sellers).
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Main component render
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen bg-gray-100 py-6"
//     >
//       <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="mb-4 flex justify-between items-center"
//         >
//           <Link
//             href="/admin/currencies"
//             className="inline-flex items-center font-medium text-base gap-2 text-main"
//           >
//             <FaArrowLeftLong size={20} /> Back to Currencies
//           </Link>
//           <h2 className="text-2xl text-main">
//             Edit Currency:
//             <span className="font-bold">
//               {currency?.currencyName || "Loading..."}
//             </span>
//           </h2>
//         </motion.div>

//         {/* Loading, Error, Success States */}
//         <AnimatePresence initial={false}>
//           {error && (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="mb-6 rounded-md bg-red-50 p-4 ring-1 ring-red-200"
//             >
//               <div className="flex items-center justify-start gap-3">
//                 <AlertTriangle className="text-red-500" />
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </motion.div>
//           )}

//           {successMessage && (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="mb-6 rounded-md bg-green-50 p-4 ring-1 ring-green-200"
//             >
//               <div className="flex items-center justify-start gap-3">
//                 <Check className="text-green-500" />
//                 <p className="text-sm text-green-700">{successMessage}</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {!isLoading && !error && formState && (
//           <motion.form
//             onSubmit={handleSubmit}
//             className="space-y-8"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Tabs Navigation */}
//             <motion.nav
//               variants={itemVariants}
//               className="relative z-0 rounded-lg shadow-xs overflow-hidden flex divide-x divide-gray-300 bg-white border border-gray-200 mb-6"
//             >
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("general")}
//                 className={`relative min-w-0 flex-1 group py-4 px-6 text-center font-medium cursor-pointer transition-colors ${
//                   activeTab === "general"
//                     ? "bg-primary text-main"
//                     : "bg-white text-gray-700"
//                 } first:rounded-l-lg last:rounded-r-lg`}
//               >
//                 <FaGlobe size={20} className="mx-auto mb-1.5 " />
//                 General
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setActiveTab("bank")}
//                 className={`relative min-w-0 flex-1 group py-4 px-6 text-center font-medium cursor-pointer transition-colors ${
//                   activeTab === "bank"
//                     ? "bg-primary text-main"
//                     : "bg-white text-gray-700"
//                 } first:rounded-l-lg last:rounded-r-lg`}
//               >
//                 <FaIdCard size={20} className="mx-auto mb-1.5 " />
//                 Bank Details
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setActiveTab("fees")}
//                 className={`relative min-w-0 flex-1 group py-4 px-6 text-center font-medium cursor-pointer transition-colors ${
//                   activeTab === "fees"
//                     ? "bg-primary text-main"
//                     : "bg-white text-gray-700"
//                 } first:rounded-l-lg last:rounded-r-lg`}
//               >
//                 <FaPercentage size={20} className="mx-auto mb-1.5 " />
//                 Fees & Rates
//               </button>
//             </motion.nav>

//             {renderTabContent()}

//             {/* Action Buttons */}
//             <motion.div
//               variants={itemVariants}
//               className="flex justify-end gap-3"
//             >
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 disabled={isSubmitting || !formChanged}
//                 className="rounded-md w-full bg-gray-300 cursor-pointer px-4 py-4 font-medium text-gray-700 hover:bg-gray-300 focus:outline-none disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw
//                   size={20}
//                   className="inline-block mr-2 align-middle"
//                 />
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting || !formChanged}
//                 className="inline-flex w-full items-center cursor-pointer justify-center rounded-md bg-primary px-4 py-4 font-medium text-main focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" size={20} />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} className="mr-2" /> Save Changes
//                   </>
//                 )}
//               </button>
//             </motion.div>
//           </motion.form>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import { motion } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import {
//   Loader2,
//   Save,
//   Globe,
//   DollarSign,
//   Building,
//   Landmark,
//   Hash,
//   Percent,
//   Image as ImageIcon,
//   RefreshCw,
//   Lock,
//   BarChart4,
// } from "lucide-react";
// import { FaArrowLeftLong, FaIdCard } from "react-icons/fa6";
// import { FaGlobe, FaPercentage } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string | null;
//   payeeName?: string | null;
//   iban?: string | null;
//   bicSwift?: string | null;
//   bankAddress?: string | null;
//   wiseFeePercentage?: number | null;
//   bankTransferFee?: number | null;
//   rateAdjustmentPercentage?: number | null;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CurrencyFormState {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   payeeName: string;
//   iban: string;
//   bicSwift: string;
//   bankAddress: string;
//   wiseFeePercentage: string;
//   bankTransferFee: string;
//   rateAdjustmentPercentage: string;
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const { token } = useAuth();

//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [formState, setFormState] = useState<CurrencyFormState | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState<"general" | "bank" | "fees">(
//     "general"
//   );
//   const [formChanged, setFormChanged] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   // Fetch Currency Data
//   useEffect(() => {
//     const fetchCurrency = async () => {
//       if (!token || !currencyId) {
//         setIsLoading(false);
//         toast.error("Missing token or currency ID.");
//         if (!token) router.push("/auth/login");
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get<Currency>(
//           `/admin/currencies/${currencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCurrency(response.data);
//         // Initialize form state from fetched data
//         setFormState({
//           code: response.data.code || "",
//           currencyName: response.data.currencyName || "",
//           flagImage: response.data.flagImage || "",
//           payeeName: response.data.payeeName || "",
//           iban: response.data.iban || "",
//           bicSwift: response.data.bicSwift || "",
//           bankAddress: response.data.bankAddress || "",
//           wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//           bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//           rateAdjustmentPercentage:
//             response.data.rateAdjustmentPercentage?.toString() ?? "0",
//         });
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         if (err.response?.status === 404) {
//           toast.error("Currency not found.");
//         } else if (
//           err.response?.status === 401 ||
//           err.response?.status === 403
//         ) {
//           toast.error("Unauthorized. Redirecting to login...");
//           setTimeout(() => router.push("/auth/login"), 2000);
//         } else {
//           toast.error(
//             err.response?.data?.message || "Failed to load currency details"
//           );
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrency();
//   }, [currencyId, token, router]);

//   // Track form changes
//   useEffect(() => {
//     if (!currency || !formState) return;

//     const isChanged =
//       formState.currencyName !== (currency.currencyName || "") ||
//       formState.flagImage !== (currency.flagImage || "") ||
//       formState.payeeName !== (currency.payeeName || "") ||
//       formState.iban !== (currency.iban || "") ||
//       formState.bicSwift !== (currency.bicSwift || "") ||
//       formState.bankAddress !== (currency.bankAddress || "") ||
//       formState.wiseFeePercentage !==
//         (currency.wiseFeePercentage?.toString() ?? "") ||
//       formState.bankTransferFee !==
//         (currency.bankTransferFee?.toString() ?? "") ||
//       formState.rateAdjustmentPercentage !==
//         (currency.rateAdjustmentPercentage?.toString() ?? "0");

//     setFormChanged(isChanged);
//   }, [currency, formState]);

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => (prev ? { ...prev, [name]: value } : null));
//   };

//   // Handle Form Submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!formState || !currencyId || !token) {
//       toast.error("Form data or required parameters missing.");
//       return;
//     }

//     setIsSubmitting(true);

//     // Prepare payload, converting numbers and handling nulls/empty strings
//     const payload: Partial<Currency> = {
//       code: formState.code.toUpperCase().trim(),
//       currencyName: formState.currencyName.trim(),
//       flagImage: formState.flagImage.trim() || null,
//       payeeName: formState.payeeName.trim() || null,
//       iban: formState.iban.trim() || null,
//       bicSwift: formState.bicSwift.trim() || null,
//       bankAddress: formState.bankAddress.trim() || null,
//       wiseFeePercentage:
//         formState.wiseFeePercentage !== ""
//           ? parseFloat(formState.wiseFeePercentage)
//           : null,
//       bankTransferFee:
//         formState.bankTransferFee !== ""
//           ? parseFloat(formState.bankTransferFee)
//           : null,
//       rateAdjustmentPercentage:
//         formState.rateAdjustmentPercentage !== ""
//           ? parseFloat(formState.rateAdjustmentPercentage)
//           : 0,
//     };

//     // Validation
//     if (
//       payload.wiseFeePercentage !== null &&
//       (isNaN(payload.wiseFeePercentage) || payload.wiseFeePercentage < 0)
//     ) {
//       toast.error("remityn Fee % must be non-negative.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.bankTransferFee !== null &&
//       (isNaN(payload.bankTransferFee) || payload.bankTransferFee < 0)
//     ) {
//       toast.error("Bank Fee must be non-negative.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.rateAdjustmentPercentage !== null &&
//       isNaN(payload.rateAdjustmentPercentage)
//     ) {
//       toast.error("Rate Adjustment must be a number.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.put<Currency>(
//         `/admin/currencies/${currencyId}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCurrency(response.data);
//       setFormState({
//         code: response.data.code || "",
//         currencyName: response.data.currencyName || "",
//         flagImage: response.data.flagImage || "",
//         payeeName: response.data.payeeName || "",
//         iban: response.data.iban || "",
//         bicSwift: response.data.bicSwift || "",
//         bankAddress: response.data.bankAddress || "",
//         wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//         bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//         rateAdjustmentPercentage:
//           response.data.rateAdjustmentPercentage?.toString() ?? "0",
//       });
//       toast.success("Currency updated successfully!");
//       setFormChanged(false);

//       // Redirect to currencies page after successful update and toast display
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 1500); // Delay the redirection by 1.5 seconds (adjust as needed)
//     } catch (err: any) {
//       console.error("Update error:", err);
//       toast.error(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form to initial values
//   const handleReset = () => {
//     if (!currency) return;

//     setFormState({
//       code: currency.code || "",
//       currencyName: currency.currencyName || "",
//       flagImage: currency.flagImage || "",
//       payeeName: currency.payeeName || "",
//       iban: currency.iban || "",
//       bicSwift: currency.bicSwift || "",
//       bankAddress: currency.bankAddress || "",
//       wiseFeePercentage: currency.wiseFeePercentage?.toString() ?? "",
//       bankTransferFee: currency.bankTransferFee?.toString() ?? "",
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });

//     toast.success("Form reset to saved values");
//   };

//   // Render tabs content
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "general":
//         return (
//           <motion.div
//             key="general"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <h3 className="border-b pb-2 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 General Information
//               </h3>
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Code (Readonly) */}
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Globe size={18} className="text-primary" />
//                     Currency Code
//                   </label>
//                   <div className="relative mt-1">
//                     <input
//                       type="text"
//                       id="code"
//                       value={formState?.code}
//                       readOnly
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 placeholder:text-gray-400 dark:text-white dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow ease-in-out duration-300 focus:outline-none font-medium"
//                     />
//                     <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-900 dark:text-white">
//                       <Lock size={18} />
//                     </span>
//                   </div>
//                 </div>

//                 {/* Currency Name */}
//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <DollarSign size={18} className="text-primary" />
//                     Currency Name
//                   </label>
//                   <input
//                     type="text"
//                     name="currencyName"
//                     id="currencyName"
//                     placeholder="Currency Name"
//                     value={formState?.currencyName}
//                     onChange={handleChange}
//                     required
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-400 focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* Flag Image Path */}
//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="flagImage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray"
//                   >
//                     <ImageIcon size={18} className="text-primary" />
//                     Flag Image Path
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="flagImage"
//                       id="flagImage"
//                       value={formState?.flagImage}
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/eur.png"
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                     {formState?.flagImage && (
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         <img
//                           src={formState.flagImage}
//                           alt={`${formState.code} flag`}
//                           className="md:h-8 h-6 w-auto object-cover"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).style.display =
//                               "none";
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Provide the relative path to the flag image (e.g.,
//                     /assets/icon/flags/eur.png)
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border shadow-sm"
//             >
//               <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 Metadata
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
//                 <div className="space-y-1.5">
//                   <p className="font-medium text-gray-500 dark:text-gray-300">Created At : </p>
//                   <div className="rounded-md bg-gray-100 dark:bg-gray-50 p-2.5 text-neutral-900">
//                     {currency?.createdAt
//                       ? new Date(currency.createdAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//                 <div className="space-y-1.5">
//                   <p className="font-medium text-gray-500 dark:text-gray-300">Last Updated : </p>
//                   <div className="rounded-md bg-gray-100 dark:bg-gray-50 p-2.5 text-neutral-900">
//                     {currency?.updatedAt
//                       ? new Date(currency.updatedAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "bank":
//         return (
//           <motion.div
//             key="bank"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <div className="mb-4 flex items-center justify-between border-b pb-2">
//                 <h3 className="md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                   Bank Details
//                 </h3>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-6">
//                 {/* Payee Name */}
//                 <div>
//                   <label
//                     htmlFor="payeeName"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Building size={18} className="text-primary" />
//                     Payee Name
//                   </label>
//                   <input
//                     type="text"
//                     name="payeeName"
//                     id="payeeName"
//                     value={formState?.payeeName}
//                     onChange={handleChange}
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* IBAN and BIC/SWIFT */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label
//                       htmlFor="iban"
//                       className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                     >
//                       <Hash size={18} className="text-primary" />
//                       IBAN
//                     </label>
//                     <input
//                       type="text"
//                       name="iban"
//                       id="iban"
//                       value={formState?.iban}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="bicSwift"
//                       className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                     >
//                       <Hash size={18} className="text-primary" />
//                       BIC/SWIFT
//                     </label>
//                     <input
//                       type="text"
//                       name="bicSwift"
//                       id="bicSwift"
//                       value={formState?.bicSwift}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                   </div>
//                 </div>

//                 {/* Bank Address */}
//                 <div>
//                   <label
//                     htmlFor="bankAddress"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Landmark size={18} className="text-primary" />
//                     Bank Address
//                   </label>
//                   <textarea
//                     id="bankAddress"
//                     name="bankAddress"
//                     rows={3}
//                     value={formState?.bankAddress}
//                     onChange={handleChange}
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                   ></textarea>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "fees":
//         return (
//           <motion.div
//             key="fees"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <h3 className="border-b pb-2 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 Fees & Exchange Rate Settings
//               </h3>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* remityn Fee Percentage */}
//                 <div>
//                   <label
//                     htmlFor="wiseFeePercentage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Percent size={18} className="text-primary" />
//                     remityn Fee Percentage
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       id="wiseFeePercentage"
//                       value={formState?.wiseFeePercentage}
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12"
//                       placeholder="0.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Applicable fee percentage for remityn transfers
//                   </p>
//                 </div>

//                 {/* Bank Transfer Fee */}
//                 <div>
//                   <label
//                     htmlFor="bankTransferFee"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <DollarSign size={18} className="text-primary" />
//                     Bank Transfer Fee
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="bankTransferFee"
//                       id="bankTransferFee"
//                       value={formState?.bankTransferFee}
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12"
//                       placeholder="0.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">
//                         {formState?.code || "CUR"}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Fixed fee applied to bank transfers
//                   </p>
//                 </div>

//                 {/* Rate Adjustment Percentage */}
//                 <div>
//                   <label
//                     htmlFor="rateAdjustmentPercentage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Percent size={18} className="text-primary" />
//                     Rate Adjustment
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage"
//                       id="rateAdjustmentPercentage"
//                       value={formState?.rateAdjustmentPercentage}
//                       onChange={handleChange}
//                       step="any"
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12"
//                       placeholder="e.g., 0.5"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Adjustment vs market rate (positive or negative)
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 rounded-md border shadow-sm p-4">
//                 <h4 className="mb-4 flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white">
//                   <BarChart4 size={20} />
//                   Exchange Rate Info
//                 </h4>
//                 <p className="text-gray-500 dark:text-gray-300">
//                   The Rate Adjustment percentage modifies the market exchange
//                   rate. A positive value increases the rate (favorable for
//                   buyers), while a negative value decreases it (favorable for
//                   sellers).
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Main component render
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen py-6"
//     >
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div className="mx-auto max-w-5xl px-4">
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="mb-4 flex justify-between items-center"
//         >
//           <Link
//             href="/admin/currencies"
//             className="inline-flex items-center font-medium lg:text-xl text-sm gap-2 text-neutral-900 dark:text-white"
//           >
//             <FaArrowLeftLong className="size-4" /> Back to Currencies
//           </Link>
//           <h2 className="md:text-xl text-sm text-neutral-900 dark:text-white hidden md:block">
//             Edit Currency:
//             <span>
//               {currency?.currencyName || "Loading..."}
//             </span>
//           </h2>
//         </motion.div>

//         {isLoading && !currency && (
//           <div className="text-center">
//             <Loader2 className="inline-block animate-spin mr-2" size={20} />
//             Loading currency details...
//           </div>
//         )}

//         {!isLoading && !currency && !formState && (
//           <div className="text-center text-red-500">
//             Failed to load currency details.
//           </div>
//         )}

//         {!isLoading && currency && formState && (
//           <motion.form
//             onSubmit={handleSubmit}
//             className="space-y-8"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Tabs Navigation */}
//             <motion.nav
//               variants={itemVariants}
//               className="relative z-0 rounded-lg shadow-xs overflow-hidden flex sm:flex-row flex-col divide-x border mb-6"
//             >
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("general")}
//                 className={`relative min-w-0 flex-1 group py-4 px-6 text-center font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
//                   activeTab === "general"
//                     ? "bg-primary text-neutral-900 dark:text-neutral-900"
//                     : "bg-white dark:bg-background dark:text-white"
//                 }last:rounded-r-lg`}
//               >
//                 <FaGlobe size={20} className="mx-auto mb-1.5 " />
//                 General
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setActiveTab("bank")}
//                 className={`relative min-w-0 flex-1 group py-4 px-6 text-center font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
//                   activeTab === "bank"
//                     ? "bg-primary text-neutral-900 dark:text-neutral-900"
//                     : "bg-white dark:bg-background dark:text-white"
//                 }last:rounded-r-lg`}
//               >
//                 <FaIdCard size={20} className="mx-auto mb-1.5 " />
//                 Bank Details
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setActiveTab("fees")}
//                 className={`relative min-w-0 flex-1 group py-4 px-6 text-center font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
//                   activeTab === "fees"
//                     ? "bg-primary text-neutral-900 dark:text-neutral-900"
//                     : "bg-white dark:bg-background dark:text-white"
//                 }last:rounded-r-lg`}
//               >
//                 <FaPercentage size={20} className="mx-auto mb-1.5 " />
//                 Fees & Rates
//               </button>
//             </motion.nav>

//             {renderTabContent()}

//             {/* Action Buttons */}
//             <motion.div
//               variants={itemVariants}
//               className="flex justify-end gap-3"
//             >
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 disabled={isSubmitting || !formChanged}
//                 className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 <RefreshCw
//                   size={20}
//                   className="inline-block mr-2 align-middle"
//                 />
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting || !formChanged}
//                 className="bg-primary flex justify-center text-neutral-900 hover:bg-primaryhover text-nowrap font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" size={20} />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} className="mr-2" /> Save Changes
//                   </>
//                 )}
//               </button>
//             </motion.div>
//           </motion.form>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import { useAuth } from "../../../contexts/AuthContext";
// import { motion } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import Image from "next/image"; // Import next/image
// import {
//   Loader2,
//   Save,
//   Globe,
//   DollarSign,
//   Building,
//   Landmark,
//   Hash,
//   Percent,
//   Image as ImageIcon, // Rename to avoid conflict
//   RefreshCw,
//   Lock,
//   BarChart4,
// } from "lucide-react";
// import { FaArrowLeftLong, FaIdCard } from "react-icons/fa6";
// import { FaGlobe, FaPercentage } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces remain the same
// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string | null;
//   payeeName?: string | null;
//   iban?: string | null;
//   bicSwift?: string | null;
//   bankAddress?: string | null;
//   wiseFeePercentage?: number | null;
//   bankTransferFee?: number | null;
//   rateAdjustmentPercentage?: number | null;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CurrencyFormState {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   payeeName: string;
//   iban: string;
//   bicSwift: string;
//   bankAddress: string;
//   wiseFeePercentage: string;
//   bankTransferFee: string;
//   rateAdjustmentPercentage: string;
// }

// // --- Helper to check for AxiosError ---
// function isAxiosError(error: unknown): error is AxiosError {
//   return axios.isAxiosError(error);
// }

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const { token } = useAuth();

//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [formState, setFormState] = useState<CurrencyFormState | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState<"general" | "bank" | "fees">(
//     "general"
//   );
//   const [formChanged, setFormChanged] = useState(false);
//   const [flagImageError, setFlagImageError] = useState(false); // State to track image loading error

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   // Fetch Currency Data
//   useEffect(() => {
//     const fetchCurrency = async () => {
//       if (!token || !currencyId) {
//         setIsLoading(false);
//         toast.error("Missing token or currency ID.");
//         if (!token) router.push("/auth/login");
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get<Currency>(
//           `/admin/currencies/${currencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCurrency(response.data);
//         // Initialize form state from fetched data
//         setFormState({
//           code: response.data.code || "",
//           currencyName: response.data.currencyName || "",
//           flagImage: response.data.flagImage || "",
//           payeeName: response.data.payeeName || "",
//           iban: response.data.iban || "",
//           bicSwift: response.data.bicSwift || "",
//           bankAddress: response.data.bankAddress || "",
//           wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//           bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//           rateAdjustmentPercentage:
//             response.data.rateAdjustmentPercentage?.toString() ?? "0",
//         });
//         setFlagImageError(false); // Reset image error on successful fetch
//       } catch (err: unknown) { // Changed from any to unknown
//         console.error("Fetch error:", err);
//         // Type guard for AxiosError
//         if (isAxiosError(err)) {
//           if (err.response?.status === 404) {
//             toast.error("Currency not found.");
//           } else if (
//             err.response?.status === 401 ||
//             err.response?.status === 403
//           ) {
//             toast.error("Unauthorized. Redirecting to login...");
//             setTimeout(() => router.push("/auth/login"), 2000);
//           } else {
//             toast.error(
//               err.response?.data?.message || "Failed to load currency details"
//             );
//           }
//         } else if (err instanceof Error) { // Fallback for generic errors
//             toast.error(err.message || "An unexpected error occurred.");
//         } else {
//             toast.error("An unexpected error occurred.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrency();
//   }, [currencyId, token, router]);

//   // Track form changes
//   useEffect(() => {
//     if (!currency || !formState) return;

//     const isChanged =
//       formState.currencyName !== (currency.currencyName || "") ||
//       formState.flagImage !== (currency.flagImage || "") ||
//       formState.payeeName !== (currency.payeeName || "") ||
//       formState.iban !== (currency.iban || "") ||
//       formState.bicSwift !== (currency.bicSwift || "") ||
//       formState.bankAddress !== (currency.bankAddress || "") ||
//       formState.wiseFeePercentage !==
//         (currency.wiseFeePercentage?.toString() ?? "") ||
//       formState.bankTransferFee !==
//         (currency.bankTransferFee?.toString() ?? "") ||
//       formState.rateAdjustmentPercentage !==
//         (currency.rateAdjustmentPercentage?.toString() ?? "0");

//     setFormChanged(isChanged);
//   }, [currency, formState]);

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => {
//         if (!prev) return null;
//         const newState = { ...prev, [name]: value };
//         // Reset flag image error if the flagImage path changes
//         if (name === "flagImage") {
//             setFlagImageError(false);
//         }
//         return newState;
//     });
//   };

//   // Handle Form Submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!formState || !currencyId || !token) {
//       toast.error("Form data or required parameters missing.");
//       return;
//     }

//     setIsSubmitting(true);

//     // Prepare payload, converting numbers and handling nulls/empty strings
//     const payload: Partial<Currency> = {
//       code: formState.code.toUpperCase().trim(),
//       currencyName: formState.currencyName.trim(),
//       flagImage: formState.flagImage.trim() || null,
//       payeeName: formState.payeeName.trim() || null,
//       iban: formState.iban.trim() || null,
//       bicSwift: formState.bicSwift.trim() || null,
//       bankAddress: formState.bankAddress.trim() || null,
//       wiseFeePercentage:
//         formState.wiseFeePercentage !== ""
//           ? parseFloat(formState.wiseFeePercentage)
//           : null,
//       bankTransferFee:
//         formState.bankTransferFee !== ""
//           ? parseFloat(formState.bankTransferFee)
//           : null,
//       rateAdjustmentPercentage:
//         formState.rateAdjustmentPercentage !== ""
//           ? parseFloat(formState.rateAdjustmentPercentage)
//           : 0, // Keep default as 0 if empty string
//     };

//     // Validation
//     if (!payload.currencyName) {
//       toast.error("Currency Name is required.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.wiseFeePercentage !== null &&
//       (isNaN(payload.wiseFeePercentage) || payload.wiseFeePercentage < 0)
//     ) {
//       toast.error("remityn Fee % must be a non-negative number.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.bankTransferFee !== null &&
//       (isNaN(payload.bankTransferFee) || payload.bankTransferFee < 0)
//     ) {
//       toast.error("Bank Fee must be a non-negative number.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.rateAdjustmentPercentage !== null &&
//       isNaN(payload.rateAdjustmentPercentage)
//     ) {
//       toast.error("Rate Adjustment must be a number.");
//       setIsSubmitting(false);
//       return;
//     }
//      // Validate flag image path starts with / or is http(s)://
//      if (payload.flagImage && !payload.flagImage.startsWith('/') && !payload.flagImage.startsWith('http')) {
//         toast.error("Flag Image Path must be a relative path starting with '/' or a full URL.");
//         setIsSubmitting(false);
//         return;
//     }

//     try {
//       const response = await axios.put<Currency>(
//         `/admin/currencies/${currencyId}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCurrency(response.data);
//       // Re-initialize form state from the *response* data
//       setFormState({
//         code: response.data.code || "",
//         currencyName: response.data.currencyName || "",
//         flagImage: response.data.flagImage || "",
//         payeeName: response.data.payeeName || "",
//         iban: response.data.iban || "",
//         bicSwift: response.data.bicSwift || "",
//         bankAddress: response.data.bankAddress || "",
//         wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//         bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//         rateAdjustmentPercentage:
//           response.data.rateAdjustmentPercentage?.toString() ?? "0",
//       });
//       toast.success("Currency updated successfully!");
//       setFormChanged(false); // Reset form changed status
//       setFlagImageError(false); // Reset image error on successful save

//       // Redirect to currencies page after successful update and toast display
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 1500);
//     } catch (err: unknown) { // Changed from any to unknown
//       console.error("Update error:", err);
//       // Type guard for AxiosError
//       if (isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Failed to update currency");
//       } else if (err instanceof Error) { // Fallback for generic errors
//         toast.error(err.message || "An unexpected error occurred during update.");
//       } else {
//         toast.error("An unexpected error occurred during update.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form to initial values
//   const handleReset = () => {
//     if (!currency) return;

//     setFormState({
//       code: currency.code || "",
//       currencyName: currency.currencyName || "",
//       flagImage: currency.flagImage || "",
//       payeeName: currency.payeeName || "",
//       iban: currency.iban || "",
//       bicSwift: currency.bicSwift || "",
//       bankAddress: currency.bankAddress || "",
//       wiseFeePercentage: currency.wiseFeePercentage?.toString() ?? "",
//       bankTransferFee: currency.bankTransferFee?.toString() ?? "",
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//     setFlagImageError(false); // Reset image error on reset
//     toast.info("Form reset to last saved values"); // Changed to info for reset
//   };

//   // Render tabs content
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "general":
//         return (
//           <motion.div
//             key="general"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <h3 className="border-b pb-2 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 General Information
//               </h3>
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Code (Readonly) */}
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Globe size={18} className="text-primary" />
//                     Currency Code
//                   </label>
//                   <div className="relative mt-1">
//                     <input
//                       type="text"
//                       id="code"
//                       value={formState?.code}
//                       readOnly
//                       className="block w-full rounded-md border bg-gray-100 dark:bg-gray-700 py-3 px-4 text-neutral-900 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none font-medium cursor-not-allowed"
//                     />
//                     <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-gray-400">
//                       <Lock size={18} />
//                     </span>
//                   </div>
//                 </div>

//                 {/* Currency Name */}
//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <DollarSign size={18} className="text-primary" />
//                     Currency Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="currencyName"
//                     id="currencyName"
//                     placeholder="e.g., Euro"
//                     value={formState?.currencyName}
//                     onChange={handleChange}
//                     required
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-400 focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* Flag Image Path */}
//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="flagImage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300" // Corrected dark mode color
//                   >
//                     <ImageIcon size={18} className="text-primary" />
//                     Flag Image Path
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="flagImage"
//                       id="flagImage"
//                       value={formState?.flagImage}
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/eur.png or https://..."
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12 md:pr-16" // Add padding for image
//                     />
//                     {formState?.flagImage && !flagImageError && (
//                       // --- Replaced img with next/image Image ---
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-8 md:h-8 md:w-10 pointer-events-none">
//                         <Image
//                           src={formState.flagImage}
//                           alt={`${formState.code || 'Currency'} flag`}
//                           fill // Use fill to adapt to parent div size
//                           style={{ objectFit: 'contain' }} // Use contain to avoid cropping
//                           onError={() => setFlagImageError(true)} // Set error state if image fails to load
//                           unoptimized={formState.flagImage.startsWith('http')} // Unoptimize external URLs
//                         />
//                       </div>
//                     )}
//                     {flagImageError && formState?.flagImage && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs">
//                             Load Error
//                         </div>
//                     )}
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Relative path (e.g., /assets/icon/flags/eur.png) or full URL. Must be accessible.
//                   </p>
//                    {flagImageError && (
//                     <p className="mt-1 text-xs text-red-500">
//                         Could not load the flag image. Check the path/URL.
//                     </p>
//                    )}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Metadata Section */}
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border shadow-sm"
//             >
//               <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 Metadata
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
//                 <div className="space-y-1.5">
//                   <p className="font-medium text-sm text-gray-500 dark:text-gray-300">Created At</p>
//                   <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2.5 text-neutral-900 dark:text-gray-200 text-sm">
//                     {currency?.createdAt
//                       ? new Date(currency.createdAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//                 <div className="space-y-1.5">
//                   <p className="font-medium text-sm text-gray-500 dark:text-gray-300">Last Updated</p>
//                   <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2.5 text-neutral-900 dark:text-gray-200 text-sm">
//                     {currency?.updatedAt
//                       ? new Date(currency.updatedAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "bank":
//         return (
//           <motion.div
//             key="bank"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <div className="mb-4 border-b pb-2">
//                 <h3 className="md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                   Bank Details (Optional)
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Provide these details if you need to store bank information associated with this currency.
//                 </p>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-6">
//                 {/* Payee Name */}
//                 <div>
//                   <label
//                     htmlFor="payeeName"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Building size={18} className="text-primary" />
//                     Payee Name
//                   </label>
//                   <input
//                     type="text"
//                     name="payeeName"
//                     id="payeeName"
//                     placeholder="Recipient's full name or company name"
//                     value={formState?.payeeName}
//                     onChange={handleChange}
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* IBAN and BIC/SWIFT */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label
//                       htmlFor="iban"
//                       className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                     >
//                       <Hash size={18} className="text-primary" />
//                       IBAN
//                     </label>
//                     <input
//                       type="text"
//                       name="iban"
//                       id="iban"
//                       placeholder="International Bank Account Number"
//                       value={formState?.iban}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="bicSwift"
//                       className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                     >
//                       <Hash size={18} className="text-primary" />
//                       BIC/SWIFT
//                     </label>
//                     <input
//                       type="text"
//                       name="bicSwift"
//                       id="bicSwift"
//                       placeholder="Bank Identifier Code"
//                       value={formState?.bicSwift}
//                       onChange={handleChange}
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                     />
//                   </div>
//                 </div>

//                 {/* Bank Address */}
//                 <div>
//                   <label
//                     htmlFor="bankAddress"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Landmark size={18} className="text-primary" />
//                     Bank Address
//                   </label>
//                   <textarea
//                     id="bankAddress"
//                     name="bankAddress"
//                     rows={3}
//                     placeholder="Full address of the recipient's bank"
//                     value={formState?.bankAddress}
//                     onChange={handleChange}
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 placeholder:text-gray-400 focus:outline-none font-medium"
//                   ></textarea>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "fees":
//         return (
//           <motion.div
//             key="fees"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-6"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <h3 className="border-b pb-2 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 Fees & Exchange Rate Settings (Optional)
//               </h3>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* remityn Fee Percentage */}
//                 <div>
//                   <label
//                     htmlFor="wiseFeePercentage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Percent size={18} className="text-primary" />
//                     remityn Fee %
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       id="wiseFeePercentage"
//                       value={formState?.wiseFeePercentage}
//                       onChange={handleChange}
//                       step="any" // Allow decimals
//                       min="0" // Ensure non-negative
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide number spinners
//                       placeholder="e.g., 0.5"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Percentage fee for remityn transfers (leave blank if none).
//                   </p>
//                 </div>

//                 {/* Bank Transfer Fee */}
//                 <div>
//                   <label
//                     htmlFor="bankTransferFee"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <DollarSign size={18} className="text-primary" />
//                     Bank Transfer Fee
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="bankTransferFee"
//                       id="bankTransferFee"
//                       value={formState?.bankTransferFee}
//                       onChange={handleChange}
//                       step="any" // Allow decimals
//                       min="0" // Ensure non-negative
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide number spinners
//                       placeholder="e.g., 5.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500 text-sm font-medium">
//                         {formState?.code || "CUR"}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Fixed fee in {formState?.code || 'currency'} (leave blank if none).
//                   </p>
//                 </div>

//                 {/* Rate Adjustment Percentage */}
//                 <div>
//                   <label
//                     htmlFor="rateAdjustmentPercentage"
//                     className="mb-2 flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Percent size={18} className="text-primary" />
//                     Rate Adjustment %
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage"
//                       id="rateAdjustmentPercentage"
//                       value={formState?.rateAdjustmentPercentage}
//                       onChange={handleChange}
//                       step="any" // Allow decimals
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-400 focus:outline-none font-medium pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide number spinners
//                       placeholder="e.g., -0.5 or 1.2"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500">%</span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Adjustment vs market rate (default 0).
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 rounded-md border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm p-4">
//                 <h4 className="mb-2 flex items-center gap-1.5 font-semibold text-blue-800 dark:text-blue-200">
//                   <BarChart4 size={20} />
//                   Exchange Rate Info
//                 </h4>
//                 <p className="text-sm text-blue-700 dark:text-blue-300">
//                   The <strong>Rate Adjustment %</strong> modifies the market exchange rate used in calculations.
//                   A positive value (e.g., 1%) increases the rate, making the foreign currency relatively cheaper.
//                   A negative value (e.g., -0.5%) decreases the rate, making the foreign currency relatively more expensive.
//                   Set to 0 to use the market rate directly.
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Main component render
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen py-6 bg-gray-50 dark:bg-gray-900" // Added background color
//     >
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored" // Use colored theme for better visibility
//       />
//       <div className="mx-auto max-w-5xl px-4">
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="mb-6 flex justify-between items-center" // Increased bottom margin
//         >
//           <Link
//             href="/admin/currencies"
//             className="inline-flex items-center font-medium lg:text-base text-sm gap-2 text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors"
//           >
//             <FaArrowLeftLong className="size-4" /> Back to Currencies
//           </Link>
//           <h1 className="md:text-xl text-lg font-semibold text-neutral-900 dark:text-white"> {/* Changed to h1 */}
//             Edit Currency:{" "}
//             <span className="text-primary font-bold">
//               {currency?.currencyName || formState?.currencyName || "Loading..."} ({currency?.code || formState?.code})
//             </span>
//           </h1>
//         </motion.div>

//         {isLoading && !currency && (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="animate-spin mr-3 text-primary" size={32} />
//             <span className="text-lg text-gray-600 dark:text-gray-400">Loading currency details...</span>
//           </div>
//         )}

//         {!isLoading && !currency && !formState && (
//            <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4 rounded-lg">
//              Failed to load currency details. Please check the ID or try again later.
//            </div>
//         )}

//         {!isLoading && (currency || formState) && formState && ( // Ensure formState exists before rendering form
//           <motion.form
//             onSubmit={handleSubmit}
//             className="space-y-8"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Tabs Navigation */}
//             <motion.nav
//               variants={itemVariants}
//               className="relative z-0 rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 mb-6" // Adjusted styling
//             >
//               {(["general", "bank", "fees"] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   type="button"
//                   onClick={() => setActiveTab(tab)}
//                   className={`relative min-w-0 flex-1 group py-3 px-4 text-center font-medium cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm sm:text-base ${
//                     activeTab === tab
//                       ? "bg-primary text-neutral-900 dark:text-neutral-900 shadow-inner inset-x-0" // Active tab style
//                       : "bg-white dark:bg-background text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" // Inactive tab style
//                   }`}
//                 >
//                   {tab === "general" && <FaGlobe size={18} />}
//                   {tab === "bank" && <FaIdCard size={18} />}
//                   {tab === "fees" && <FaPercentage size={18} />}
//                   <span className="capitalize">{tab === "fees" ? "Fees & Rates" : tab}</span>
//                 </button>
//               ))}
//             </motion.nav>

//             {/* Render Active Tab Content */}
//             {renderTabContent()}

//             {/* Action Buttons */}
//             <motion.div
//               variants={itemVariants}
//               className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700" // Added top border
//             >
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 disabled={isSubmitting || !formChanged}
//                 className="inline-flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-md px-5 py-2.5 h-11 text-center w-full sm:w-auto transition-colors duration-150 ease-linear" // Adjusted styles
//               >
//                 <RefreshCw
//                   size={18} // Adjusted size
//                   className={`mr-2 ${isSubmitting ? '' : (formChanged ? 'group-hover:animate-spin-slow' : '')}`} // Conditional spin on hover
//                 />
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting || !formChanged}
//                 className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-md px-5 py-2.5 h-11 text-center w-full sm:w-auto transition-colors duration-150 ease-linear" // Adjusted styles
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" size={18} /> {/* Adjusted size */}
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={18} className="mr-2" /> {/* Adjusted size */}
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </motion.div>
//           </motion.form>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdminEditCurrencyPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import { useAuth } from "../../../contexts/AuthContext";
// import { motion } from "framer-motion";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";
// import Image from "next/image"; // Import next/image
// import {
//   Loader2,
//   Save,
//   Globe,
//   DollarSign,
//   Building,
//   Landmark,
//   Hash,
//   Percent,
//   Image as ImageIcon, // Rename to avoid conflict
//   RefreshCw,
//   Lock,
//   BarChart4,
// } from "lucide-react";
// import { FaArrowLeftLong, FaIdCard } from "react-icons/fa6";
// import { FaGlobe, FaPercentage } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CurrencyEditHeader from "../../components/currencies/CurrencyEditHeader";
// import { Skeleton } from "@/components/ui/skeleton";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces remain the same
// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string | null;
//   payeeName?: string | null;
//   iban?: string | null;
//   bicSwift?: string | null;
//   bankAddress?: string | null;
//   wiseFeePercentage?: number | null;
//   bankTransferFee?: number | null;
//   rateAdjustmentPercentage?: number | null; // Can be 0 or other numbers, potentially null from DB
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CurrencyFormState {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   payeeName: string;
//   iban: string;
//   bicSwift: string;
//   bankAddress: string;
//   wiseFeePercentage: string; // Keep as string for input control
//   bankTransferFee: string; // Keep as string for input control
//   rateAdjustmentPercentage: string; // Keep as string for input control
// }

// // --- Helper to check for AxiosError ---
// function isAxiosError(error: unknown): error is AxiosError {
//   return axios.isAxiosError(error);
// }

// // Define a potential structure for API error responses
// interface ApiErrorData {
//   message?: string;
//   error?: string; // Add other potential error fields if known
//   // Add other fields if your API returns them on error
// }

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8">
//     <motion.div className="py-6">
//       <div className="mx-auto max-w-5xl space-y-8">
//         {" "}
//         {/* Added space-y-8 */}
//         {/* Header Skeleton */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div>
//             <Skeleton className="h-4 w-64 mb-3 rounded " /> {/* Breadcrumbs */}
//             <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//           </div>
//           <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}
//         </div>
//         {/* Form Skeleton */}
//         <div className="space-y-8">
//           {/* Tabs Navigation Skeleton */}
//           <div className="relative z-0 rounded-lg overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x  mb-6">
//             <Skeleton className="h-12 flex-1 " />
//             <Skeleton className="h-12 flex-1 " />
//             <Skeleton className="h-12 flex-1 " />
//           </div>

//           {/* General Tab Content Skeleton (Default Visible) */}
//           <div className="space-y-6">
//             {/* General Info Section Skeleton */}
//             <div className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4">
//               <Skeleton className="h-5 w-1/3 rounded mb-4 border-b border-transparent pb-2" />{" "}
//               {/* Section Title */}
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Code Skeleton */}
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/4 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//                 {/* Name Skeleton */}
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//                 {/* Flag Image Skeleton */}
//                 <div className="md:col-span-2 space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                   <Skeleton className="h-3 w-3/4 rounded" /> {/* Help text */}
//                 </div>
//               </div>
//             </div>

//             {/* Metadata Section Skeleton */}
//             <div className="rounded-xl bg-white dark:bg-background border">
//               <Skeleton className="h-5 w-1/4 rounded m-4 lg:m-6 mb-0 border-b border-transparent pb-3" />{" "}
//               {/* Section Title */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons Skeleton */}
//           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
//             <Skeleton className="h-12 w-full sm:w-28 rounded-full" />
//             <Skeleton className="h-12 w-full sm:w-36 rounded-full" />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   </div>
// );
// // --- END: Loading Skeleton Component ---

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const { token } = useAuth();

//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [formState, setFormState] = useState<CurrencyFormState | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState<"general" | "bank" | "fees">(
//     "general"
//   );
//   const [formChanged, setFormChanged] = useState(false);
//   const [flagImageError, setFlagImageError] = useState(false); // State to track image loading error

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   // Fetch Currency Data
//   useEffect(() => {
//     const fetchCurrency = async () => {
//       if (!token || !currencyId) {
//         setIsLoading(false);
//         toast.error("Missing token or currency ID.");
//         if (!token) router.push("/auth/login");
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get<Currency>(
//           `/admin/currencies/${currencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCurrency(response.data);
//         // Initialize form state from fetched data
//         setFormState({
//           code: response.data.code || "",
//           currencyName: response.data.currencyName || "",
//           flagImage: response.data.flagImage || "",
//           payeeName: response.data.payeeName || "",
//           iban: response.data.iban || "",
//           bicSwift: response.data.bicSwift || "",
//           bankAddress: response.data.bankAddress || "",
//           wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//           bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//           rateAdjustmentPercentage:
//             // Ensure rateAdjustmentPercentage is never null/undefined in form state, default to '0' string
//             response.data.rateAdjustmentPercentage?.toString() ?? "0",
//         });
//         setFlagImageError(false); // Reset image error on successful fetch
//       } catch (err: unknown) {
//         console.error("Fetch error:", err);
//         if (isAxiosError(err)) {
//           // FIX 1: Handle potential error message structure safely
//           const errorData = err.response?.data as ApiErrorData | undefined; // Cast to potential structure
//           let message = "Failed to load currency details"; // Default message
//           if (errorData?.message) {
//             message = errorData.message;
//           } else if (errorData?.error) {
//             message = errorData.error;
//           } else if (err.response?.statusText) {
//             message = `Error ${err.response.status}: ${err.response.statusText}`;
//           }

//           if (err.response?.status === 404) {
//             toast.error("Currency not found.");
//           } else if (
//             err.response?.status === 401 ||
//             err.response?.status === 403
//           ) {
//             toast.error("Unauthorized. Redirecting to login...");
//             setTimeout(() => router.push("/auth/login"), 2000);
//           } else {
//             toast.error(message); // Use the safely extracted message
//           }
//         } else if (err instanceof Error) {
//           toast.error(err.message || "An unexpected error occurred.");
//         } else {
//           toast.error("An unexpected error occurred.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrency();
//   }, [currencyId, token, router]);

//   // Track form changes
//   useEffect(() => {
//     if (!currency || !formState) return;

//     // Compare form state (strings) with currency data (potentially numbers/null)
//     // Convert currency numbers to strings for comparison, handling nulls gracefully
//     const currentWiseFee = currency.wiseFeePercentage?.toString() ?? "";
//     const currentBankFee = currency.bankTransferFee?.toString() ?? "";
//     const currentRateAdj = currency.rateAdjustmentPercentage?.toString() ?? "0"; // Match default form state '0'

//     const isChanged =
//       formState.currencyName !== (currency.currencyName || "") ||
//       formState.flagImage !== (currency.flagImage || "") ||
//       formState.payeeName !== (currency.payeeName || "") ||
//       formState.iban !== (currency.iban || "") ||
//       formState.bicSwift !== (currency.bicSwift || "") ||
//       formState.bankAddress !== (currency.bankAddress || "") ||
//       formState.wiseFeePercentage !== currentWiseFee ||
//       formState.bankTransferFee !== currentBankFee ||
//       formState.rateAdjustmentPercentage !== currentRateAdj;

//     setFormChanged(isChanged);
//   }, [currency, formState]);

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => {
//       if (!prev) return null;
//       const newState = { ...prev, [name]: value };
//       // Reset flag image error if the flagImage path changes
//       if (name === "flagImage") {
//         setFlagImageError(false);
//       }
//       return newState;
//     });
//   };

//   // Handle Form Submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!formState || !currencyId || !token) {
//       toast.error("Form data or required parameters missing.");
//       return;
//     }

//     setIsSubmitting(true);

//     // Prepare payload, converting numbers and handling nulls/empty strings
//     // Perform parsing and validation *before* creating the final payload object
//     let wiseFee: number | null = null;
//     if (formState.wiseFeePercentage.trim() !== "") {
//       const parsed = parseFloat(formState.wiseFeePercentage);
//       // FIX 2 & 3 & 4: Validate parsed number before assignment
//       if (isNaN(parsed) || parsed < 0) {
//         toast.error("remityn Fee % must be a non-negative number.");
//         setIsSubmitting(false);
//         return;
//       }
//       wiseFee = parsed;
//     }

//     let bankFee: number | null = null;
//     if (formState.bankTransferFee.trim() !== "") {
//       const parsed = parseFloat(formState.bankTransferFee);
//       // FIX 5 & 6 & 7: Validate parsed number before assignment
//       if (isNaN(parsed) || parsed < 0) {
//         toast.error("Bank Fee must be a non-negative number.");
//         setIsSubmitting(false);
//         return;
//       }
//       bankFee = parsed;
//     }

//     let rateAdj: number = 0; // Default to 0
//     if (formState.rateAdjustmentPercentage.trim() !== "") {
//       const parsed = parseFloat(formState.rateAdjustmentPercentage);
//       // FIX 8: Validate parsed number before assignment
//       if (isNaN(parsed)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         setIsSubmitting(false);
//         return;
//       }
//       rateAdj = parsed;
//     } else {
//       // If the input is cleared, explicitly set payload to 0
//       rateAdj = 0;
//     }

//     const payload: Partial<Currency> = {
//       // Code is generally not editable, but include if needed by API
//       // code: formState.code.toUpperCase().trim(),
//       currencyName: formState.currencyName.trim(),
//       flagImage: formState.flagImage.trim() || null,
//       payeeName: formState.payeeName.trim() || null,
//       iban: formState.iban.trim() || null,
//       bicSwift: formState.bicSwift.trim() || null,
//       bankAddress: formState.bankAddress.trim() || null,
//       wiseFeePercentage: wiseFee,
//       bankTransferFee: bankFee,
//       rateAdjustmentPercentage: rateAdj,
//     };

//     // --- Simplified Validation (checks moved before payload creation) ---
//     if (!payload.currencyName) {
//       toast.error("Currency Name is required.");
//       setIsSubmitting(false);
//       return;
//     }
//     // Validate flag image path starts with / or is http(s)://
//     if (
//       payload.flagImage &&
//       !payload.flagImage.startsWith("/") &&
//       !payload.flagImage.startsWith("http")
//     ) {
//       toast.error(
//         "Flag Image Path must be a relative path starting with '/' or a full URL."
//       );
//       setIsSubmitting(false);
//       return;
//     }
//     // --- Number validations are now handled above during parsing ---

//     try {
//       const response = await axios.put<Currency>(
//         `/admin/currencies/${currencyId}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCurrency(response.data);
//       // Re-initialize form state from the *response* data
//       setFormState({
//         code: response.data.code || "",
//         currencyName: response.data.currencyName || "",
//         flagImage: response.data.flagImage || "",
//         payeeName: response.data.payeeName || "",
//         iban: response.data.iban || "",
//         bicSwift: response.data.bicSwift || "",
//         bankAddress: response.data.bankAddress || "",
//         wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//         bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//         rateAdjustmentPercentage:
//           response.data.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string
//       });
//       toast.success("Currency updated successfully!");
//       setFormChanged(false); // Reset form changed status
//       setFlagImageError(false); // Reset image error on successful save

//       // Redirect to currencies page after successful update and toast display
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 1500);
//     } catch (err: unknown) {
//       console.error("Update error:", err);
//       if (isAxiosError(err)) {
//         // FIX 9: Handle potential error message structure safely
//         const errorData = err.response?.data as ApiErrorData | undefined; // Cast to potential structure
//         let message = "Failed to update currency"; // Default message
//         if (errorData?.message) {
//           message = errorData.message;
//         } else if (errorData?.error) {
//           message = errorData.error;
//         } else if (err.response?.statusText) {
//           message = `Error ${err.response.status}: ${err.response.statusText}`;
//         }
//         // Handle specific update errors if needed, e.g., validation errors
//         toast.error(message); // Use the safely extracted message
//       } else if (err instanceof Error) {
//         toast.error(
//           err.message || "An unexpected error occurred during update."
//         );
//       } else {
//         toast.error("An unexpected error occurred during update.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form to initial values
//   const handleReset = () => {
//     if (!currency) return;

//     setFormState({
//       code: currency.code || "",
//       currencyName: currency.currencyName || "",
//       flagImage: currency.flagImage || "",
//       payeeName: currency.payeeName || "",
//       iban: currency.iban || "",
//       bicSwift: currency.bicSwift || "",
//       bankAddress: currency.bankAddress || "",
//       wiseFeePercentage: currency.wiseFeePercentage?.toString() ?? "",
//       bankTransferFee: currency.bankTransferFee?.toString() ?? "",
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string
//     });
//     setFlagImageError(false); // Reset image error on reset
//     setFormChanged(false); // Also reset form changed status on reset
//     toast.info("Form reset to last saved values");
//   };

//   // Render tabs content
//   const renderTabContent = () => {
//     // Ensure formState is loaded before rendering form elements
//     if (!formState) {
//       return (
//         <div className="flex justify-center items-center p-10">
//           <Loader2 className="animate-spin mr-3 text-primary" size={24} />
//           <span>Loading form...</span>
//         </div>
//       );
//     }
//     switch (activeTab) {
//       case "general":
//         return (
//           <motion.div
//             key="general"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-4"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <h3 className="border-b pb-2 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 General Information
//               </h3>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Code (Readonly) */}
//                 <div>
//                   <label
//                     htmlFor="code"
//                     className="text-gray-500 dark:text-gray-300 capitalize text-sm flex items-center gap-3   lg:text-base"
//                   >
//                     <Globe size={20} className="text-primary" />
//                     Currency Code
//                   </label>

//                   <div className="relative mt-1">
//                     <input
//                       type="text"
//                       id="code"
//                       value={formState.code} // Use formState directly
//                       readOnly
//                       className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border cursor-not-allowed rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                     <span className="pointer-events-none absolute right-4.5 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-gray-300">
//                       <Lock size={20} />
//                     </span>
//                   </div>
//                 </div>

//                 {/* Currency Name */}
//                 <div>
//                   <label
//                     htmlFor="currencyName"
//                     className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//                   >
//                     <DollarSign size={20} className="text-primary" />
//                     Currency Name <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="currencyName"
//                     id="currencyName"
//                     placeholder="e.g., Euro"
//                     value={formState.currencyName} // Use formState directly
//                     onChange={handleChange}
//                     required
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* Flag Image Path */}
//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="flagImage"
//                     className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <ImageIcon size={20} className="text-primary" />
//                     Flag Image Path
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="flagImage"
//                       id="flagImage"
//                       value={formState.flagImage} // Use formState directly
//                       onChange={handleChange}
//                       placeholder="/assets/icon/flags/eur.png or https://..."
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 dark:text-white dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300 hover:shadow-darkcolor placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium pr-12 md:pr-16" // Add padding for image
//                     />
//                     {formState.flagImage &&
//                       !flagImageError && ( // Use formState directly
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-8 md:h-8 md:w-10 pointer-events-none">
//                           <Image
//                             src={formState.flagImage}
//                             alt={`${formState.code || "Currency"} flag`}
//                             fill
//                             style={{ objectFit: "contain" }}
//                             onError={() => setFlagImageError(true)}
//                             unoptimized={formState.flagImage.startsWith("http")}
//                           />
//                         </div>
//                       )}
//                     {flagImageError &&
//                       formState.flagImage && ( // Use formState directly
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 text-xs">
//                           Load Error
//                         </div>
//                       )}
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Relative path (e.g., /assets/icon/flags/eur.png) or full
//                     URL. Must be accessible.
//                   </p>
//                   {flagImageError && (
//                     <p className="mt-1 text-xs text-red-600">
//                       Could not load the flag image. Check the path/URL.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Metadata Section */}
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border shadow-sm"
//             >
//               <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 Metadata
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
//                 <div className="space-y-2">
//                   <p className="font-medium text-gray-500 dark:text-gray-300">
//                     Created At
//                   </p>
//                   <div className="rounded-md border bg-gray-100 dark:bg-white/5 py-3 px-4 text-neutral-900 dark:text-gray-300 ">
//                     {currency?.createdAt
//                       ? new Date(currency.createdAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="font-medium text-gray-500 dark:text-gray-300">
//                     Last Updated
//                   </p>
//                   <div className="rounded-md border bg-gray-100 dark:bg-white/5 py-3 px-4 text-neutral-900 dark:text-gray-300 ">
//                     {currency?.updatedAt
//                       ? new Date(currency.updatedAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "bank":
//         return (
//           <motion.div
//             key="bank"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-4"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <div className="mb-4 border-b pb-2">
//                 <h3 className="md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                   Bank Details (Optional)
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                   Provide these details if you need to store bank information
//                   associated with this currency.
//                 </p>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-6">
//                 {/* Payee Name */}
//                 <div>
//                   <label
//                     htmlFor="payeeName"
//                     className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Building size={20} className="text-primary" />
//                     Payee Name
//                   </label>
//                   <input
//                     type="text"
//                     name="payeeName"
//                     id="payeeName"
//                     placeholder="Recipient's full name or company name"
//                     value={formState.payeeName} // Use formState directly
//                     onChange={handleChange}
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium"
//                   />
//                 </div>

//                 {/* IBAN and BIC/SWIFT */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label
//                       htmlFor="iban"
//                       className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                     >
//                       <Hash size={20} className="text-primary" />
//                       IBAN
//                     </label>
//                     <input
//                       type="text"
//                       name="iban"
//                       id="iban"
//                       placeholder="International Bank Account Number"
//                       value={formState.iban} // Use formState directly
//                       onChange={handleChange}
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="bicSwift"
//                       className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                     >
//                       <Hash size={20} className="text-primary" />
//                       BIC/SWIFT
//                     </label>
//                     <input
//                       type="text"
//                       name="bicSwift"
//                       id="bicSwift"
//                       placeholder="Bank Identifier Code"
//                       value={formState.bicSwift} // Use formState directly
//                       onChange={handleChange}
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium"
//                     />
//                   </div>
//                 </div>

//                 {/* Bank Address */}
//                 <div>
//                   <label
//                     htmlFor="bankAddress"
//                     className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Landmark size={20} className="text-primary" />
//                     Bank Address
//                   </label>
//                   <textarea
//                     id="bankAddress"
//                     name="bankAddress"
//                     rows={3}
//                     placeholder="Full address of the recipient's bank"
//                     value={formState.bankAddress} // Use formState directly
//                     onChange={handleChange}
//                     className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium"
//                   ></textarea>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         );

//       case "fees":
//         return (
//           <motion.div
//             key="fees"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="space-y-4"
//           >
//             <motion.div
//               variants={itemVariants}
//               className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4 shadow-sm"
//             >
//               <h3 className="border-b pb-2 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//                 Fees & Exchange Rate Settings (Optional)
//               </h3>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* remityn Fee Percentage */}
//                 <div>
//                   <label
//                     htmlFor="wiseFeePercentage"
//                     className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Percent size={20} className="text-primary" />
//                     remityn Fee %
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="wiseFeePercentage"
//                       id="wiseFeePercentage"
//                       value={formState.wiseFeePercentage} // Use formState directly
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                       placeholder="e.g., 0.5"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500 dark:text-gray-300">
//                         %
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Percentage fee for remityn transfers (leave blank if none).
//                   </p>
//                 </div>

//                 {/* Bank Transfer Fee */}
//                 <div>
//                   <label
//                     htmlFor="bankTransferFee"
//                     className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <DollarSign size={20} className="text-primary" />
//                     Bank Transfer Fee
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="bankTransferFee"
//                       id="bankTransferFee"
//                       value={formState.bankTransferFee} // Use formState directly
//                       onChange={handleChange}
//                       step="any"
//                       min="0"
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                       placeholder="e.g., 5.00"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500 dark:text-gray-300 text-sm font-medium">
//                         {formState.code || "CUR"} {/* Use formState */}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Fixed fee in {formState.code || "currency"} (leave blank if
//                     none). {/* Use formState */}
//                   </p>
//                 </div>

//                 {/* Rate Adjustment Percentage */}
//                 <div>
//                   <label
//                     htmlFor="rateAdjustmentPercentage"
//                     className="mb-2 flex items-center gap-2 font-medium text-gray-500 dark:text-gray-300"
//                   >
//                     <Percent size={20} className="text-primary" />
//                     Our Adjustment %
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage"
//                       id="rateAdjustmentPercentage"
//                       value={formState.rateAdjustmentPercentage} // Use formState directly
//                       onChange={handleChange}
//                       step="any" // Allow negative/positive decimals
//                       className="block w-full rounded-md border py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                       placeholder="e.g., -0.5 or 1.2"
//                     />
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                       <span className="text-gray-500 dark:text-gray-300">
//                         %
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                     Adjustment vs market rate (default 0).
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 rounded-md border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm p-4">
//                 <h4 className="mb-2 flex items-center gap-1.5 font-semibold text-blue-800 dark:text-blue-200">
//                   <BarChart4 size={20} />
//                   Exchange Rate Info
//                 </h4>
//                 <p className="text-sm text-blue-700 dark:text-blue-300">
//                   The <strong>Our Adjustment %</strong> modifies the market
//                   exchange rate used in calculations. A positive value (e.g.,
//                   1%) increases the rate, making the foreign currency relatively
//                   cheaper. A negative value (e.g., -0.5%) decreases the rate,
//                   making the foreign currency relatively more expensive. Set to
//                   0 (or leave blank) to use the market rate directly.
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         );
//       default:
//         return null;
//     }
//   };

//   // --- Main component render ---
//   // Render Skeleton if loading
//   if (isLoading) {
//     return (
//       <div className=" bg-white dark:bg-background">
//         <LoadingSkeleton />;
//       </div>
//     );
//   }

//   // Render error state or not found state (optional, could be handled by toast)
//   if (!isLoading && !currency && !formState) {
//     return (
//       <div className="container mx-auto px-4 py-8 relative">
//         {/* Still render header for context and back navigation */}
//         <CurrencyEditHeader currencyName="Error" currencyCode="XXX" />
//         <div className="mt-8 text-center text-red-600 bg-red-600/10 border border-red-400 dark:border-red-600 p-4 rounded-lg">
//           Failed to load currency details. Please check the ID or try again
//           later.
//           <Link
//             href="/admin/currencies"
//             className="mt-4 inline-block text-primary underline"
//           >
//             Back to Currencies
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Main component render
//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="py-6 bg-white dark:bg-background" // Added background color
//       >
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />
//         <div className="mx-auto max-w-5xl">
//           <CurrencyEditHeader
//             currencyName={currency?.currencyName || formState?.currencyName}
//             currencyCode={currency?.code || formState?.code}
//           />

//           {isLoading && !currency && (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="animate-spin mr-3 text-primary" size={32} />
//               <span className="text-lg text-gray-500 dark:text-gray-300">
//                 Loading currency details...
//               </span>
//             </div>
//           )}

//           {!isLoading && !currency && !formState && (
//             <div className="text-center text-red-600 bg-red-600/20 border border-red-400 dark:border-red-600 p-4 rounded-lg">
//               Failed to load currency details. Please check the ID or try again
//               later.
//             </div>
//           )}

//           {/* Ensure formState exists before rendering form */}
//           {!isLoading && formState && (
//             <motion.form
//               onSubmit={handleSubmit}
//               className="space-y-8"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {/* Tabs Navigation */}
//               <motion.nav
//                 variants={itemVariants}
//                 className="relative z-0 rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x border mb-6"
//               >
//                 {(["general", "bank", "fees"] as const).map((tab) => (
//                   <button
//                     key={tab}
//                     type="button"
//                     onClick={() => setActiveTab(tab)}
//                     className={`relative min-w-0 flex-1 group py-3 px-4 text-center font-medium cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm sm:text-base ${
//                       activeTab === tab
//                         ? "bg-primary text-neutral-900 shadow-inner inset-x-0"
//                         : "bg-white dark:bg-background text-gray-500 dark:text-gray-300 hover:bg-lightgray dark:hover:bg-primarybox"
//                     }`}
//                   >
//                     {tab === "general" && <FaGlobe size={20} />}
//                     {tab === "bank" && <FaIdCard size={20} />}
//                     {tab === "fees" && <FaPercentage size={20} />}
//                     <span className="capitalize">
//                       {tab === "fees" ? "Fees & Rates" : tab}
//                     </span>
//                   </button>
//                 ))}
//               </motion.nav>

//               {/* Render Active Tab Content */}
//               {renderTabContent()}

//               {/* Action Buttons */}
//               <motion.div
//                 variants={itemVariants}
//                 className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t"
//               >
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   disabled={isSubmitting || !formChanged} // Disable reset if submitting or form hasn't changed
//                   className="inline-flex items-center justify-center gap-2 cursor-pointer bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-6 py-3 h-12 text-center w-full sm:w-auto transition-all duration-75 ease-linear group" // Added group for potential hover effects
//                 >
//                   {/* px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed */}
//                   <RefreshCw
//                     size={20}
//                     className={`transition-transform duration-300 ${
//                       formChanged && !isSubmitting
//                         ? "group-hover:rotate-[-180deg]"
//                         : ""
//                     }`} // Spin on hover only if changed and not submitting
//                   />
//                   Reset
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !formChanged} // Disable save if submitting or form hasn't changed
//                   className="inline-flex items-center justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-6 py-3 h-12 text-center w-full sm:w-auto transition-all duration-75 ease-linear"
//                 >
//                   {isSubmitting ? (
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
//                         />{" "}
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
//                       <span>Saving...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Save Changes</span>
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             </motion.form>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// // Last code
// // frontend/src/app/admin/currencies/[currencyId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import { useAuth } from "../../../contexts/AuthContext"; // Corrected path
// import { motion } from "framer-motion";
// import apiConfig from "../../../config/apiConfig"; // Corrected path
// import Link from "next/link";
// import Image from "next/image"; // Import next/image
// import {
//   Loader2,
//   Save,
//   // Globe, // Icon for general tab, will use FaGlobe
//   DollarSign,
//   Building,
//   Landmark,
//   Hash,
//   Percent,
//   Image as ImageIcon, // Rename to avoid conflict
//   RefreshCw,
//   Lock,
//   BarChart4,
// } from "lucide-react";
// import { FaArrowLeftLong, FaIdCard } from "react-icons/fa6";
// import { FaGlobe, FaPercentage } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CurrencyEditHeader from "../../components/currencies/CurrencyEditHeader"; // Corrected path
// import { Skeleton } from "@/components/ui/skeleton";

// // Shadcn UI Components for Tabs
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/lib/utils"; // Import cn utility
// import { AiOutlineCalendar } from "react-icons/ai";
// import { MdUpdate } from "react-icons/md";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces remain the same
// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string | null;
//   payeeName?: string | null;
//   iban?: string | null;
//   bicSwift?: string | null;
//   bankAddress?: string | null;
//   wiseFeePercentage?: number | null;
//   bankTransferFee?: number | null;
//   rateAdjustmentPercentage?: number | null;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CurrencyFormState {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   payeeName: string;
//   iban: string;
//   bicSwift: string;
//   bankAddress: string;
//   wiseFeePercentage: string;
//   bankTransferFee: string;
//   rateAdjustmentPercentage: string;
// }

// // --- Helper to check for AxiosError ---
// function isAxiosError(error: unknown): error is AxiosError {
//   return axios.isAxiosError(error);
// }

// // Define a potential structure for API error responses
// interface ApiErrorData {
//   message?: string;
//   error?: string;
// }

// // --- Loading Skeleton Component (remains the same) ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-5">
//     <motion.div className="py-6">
//       <div className="mx-auto max-w-5xl space-y-8">
//         {" "}
//         {/* Added space-y-8 */}
//         {/* Header Skeleton */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div>
//             <Skeleton className="h-4 w-64 mb-3 rounded " /> {/* Breadcrumbs */}
//             <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//           </div>
//           <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}
//         </div>
//         {/* Form Skeleton */}
//         <div className="space-y-8">
//           {/* Tabs Navigation Skeleton - Updated to match new style */}
//           <div className="overflow-hidden mb-4">
//             <div className="relative flex w-full h-full overflow-x-auto gap-3 whitespace-nowrap bg-lightborder dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//               <Skeleton className="h-9 flex-1 rounded-full" />
//               <Skeleton className="h-9 flex-1 rounded-full" />
//               <Skeleton className="h-9 flex-1 rounded-full" />
//             </div>
//           </div>

//           {/* General Tab Content Skeleton (Default Visible) */}
//           <div className="space-y-6">
//             {/* General Info Section Skeleton */}
//             <div className="rounded-xl bg-white dark:bg-background border lg:p-6 p-4">
//               <Skeleton className="h-5 w-1/3 rounded mb-4 border-b border-transparent pb-2" />{" "}
//               {/* Section Title */}
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Code Skeleton */}
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/4 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//                 {/* Name Skeleton */}
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//                 {/* Flag Image Skeleton */}
//                 <div className="md:col-span-2 space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                   <Skeleton className="h-3 w-3/4 rounded" /> {/* Help text */}
//                 </div>
//               </div>
//             </div>

//             {/* Metadata Section Skeleton */}
//             <div className="rounded-xl bg-white dark:bg-background border">
//               <Skeleton className="h-5 w-1/4 rounded m-4 lg:m-6 mb-0 border-b border-transparent pb-3" />{" "}
//               {/* Section Title */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <Skeleton className="h-12 w-full rounded-md" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons Skeleton */}
//           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
//             <Skeleton className="h-12 w-full sm:w-28 rounded-full" />
//             <Skeleton className="h-12 w-full sm:w-36 rounded-full" />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   </div>
// );

// // --- Tab Configuration ---
// const TABS_CONFIG = [
//   { value: "general", label: "General Info", icon: FaGlobe },
//   { value: "bank", label: "Bank Details", icon: FaIdCard },
//   { value: "fees", label: "Fees & Rates", icon: FaPercentage },
// ];

// const AdminEditCurrencyPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { currencyId } = params;
//   const { token } = useAuth();

//   const [currency, setCurrency] = useState<Currency | null>(null);
//   const [formState, setFormState] = useState<CurrencyFormState | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState<"general" | "bank" | "fees">(
//     "general"
//   );
//   const [formChanged, setFormChanged] = useState(false);
//   const [flagImageError, setFlagImageError] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   // Fetch Currency Data (remains the same)
//   useEffect(() => {
//     const fetchCurrency = async () => {
//       if (!token || !currencyId) {
//         setIsLoading(false);
//         toast.error("Missing token or currency ID.");
//         if (!token) router.push("/auth/login");
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get<Currency>(
//           `/admin/currencies/${currencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCurrency(response.data);
//         setFormState({
//           code: response.data.code || "",
//           currencyName: response.data.currencyName || "",
//           flagImage: response.data.flagImage || "",
//           payeeName: response.data.payeeName || "",
//           iban: response.data.iban || "",
//           bicSwift: response.data.bicSwift || "",
//           bankAddress: response.data.bankAddress || "",
//           wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//           bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//           rateAdjustmentPercentage:
//             response.data.rateAdjustmentPercentage?.toString() ?? "0",
//         });
//         setFlagImageError(false);
//       } catch (err: unknown) {
//         console.error("Fetch error:", err);
//         if (isAxiosError(err)) {
//           const errorData = err.response?.data as ApiErrorData | undefined;
//           let message = "Failed to load currency details";
//           if (errorData?.message) {
//             message = errorData.message;
//           } else if (errorData?.error) {
//             message = errorData.error;
//           } else if (err.response?.statusText) {
//             message = `Error ${err.response.status}: ${err.response.statusText}`;
//           }

//           if (err.response?.status === 404) {
//             toast.error("Currency not found.");
//           } else if (
//             err.response?.status === 401 ||
//             err.response?.status === 403
//           ) {
//             toast.error("Unauthorized. Redirecting to login...");
//             setTimeout(() => router.push("/auth/login"), 2000);
//           } else {
//             toast.error(message);
//           }
//         } else if (err instanceof Error) {
//           toast.error(err.message || "An unexpected error occurred.");
//         } else {
//           toast.error("An unexpected error occurred.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrency();
//   }, [currencyId, token, router]);

//   // Track form changes (remains the same)
//   useEffect(() => {
//     if (!currency || !formState) return;
//     const currentWiseFee = currency.wiseFeePercentage?.toString() ?? "";
//     const currentBankFee = currency.bankTransferFee?.toString() ?? "";
//     const currentRateAdj = currency.rateAdjustmentPercentage?.toString() ?? "0";
//     const isChanged =
//       formState.currencyName !== (currency.currencyName || "") ||
//       formState.flagImage !== (currency.flagImage || "") ||
//       formState.payeeName !== (currency.payeeName || "") ||
//       formState.iban !== (currency.iban || "") ||
//       formState.bicSwift !== (currency.bicSwift || "") ||
//       formState.bankAddress !== (currency.bankAddress || "") ||
//       formState.wiseFeePercentage !== currentWiseFee ||
//       formState.bankTransferFee !== currentBankFee ||
//       formState.rateAdjustmentPercentage !== currentRateAdj;
//     setFormChanged(isChanged);
//   }, [currency, formState]);

//   // Handle Input Changes (remains the same)
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => {
//       if (!prev) return null;
//       const newState = { ...prev, [name]: value };
//       if (name === "flagImage") {
//         setFlagImageError(false);
//       }
//       return newState;
//     });
//   };

//   // Handle Form Submission (remains the same)
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!formState || !currencyId || !token) {
//       toast.error("Form data or required parameters missing.");
//       return;
//     }
//     setIsSubmitting(true);
//     let wiseFee: number | null = null;
//     if (formState.wiseFeePercentage.trim() !== "") {
//       const parsed = parseFloat(formState.wiseFeePercentage);
//       if (isNaN(parsed) || parsed < 0) {
//         toast.error("remityn Fee % must be a non-negative number.");
//         setIsSubmitting(false);
//         return;
//       }
//       wiseFee = parsed;
//     }
//     let bankFee: number | null = null;
//     if (formState.bankTransferFee.trim() !== "") {
//       const parsed = parseFloat(formState.bankTransferFee);
//       if (isNaN(parsed) || parsed < 0) {
//         toast.error("Bank Fee must be a non-negative number.");
//         setIsSubmitting(false);
//         return;
//       }
//       bankFee = parsed;
//     }
//     let rateAdj: number = 0;
//     if (formState.rateAdjustmentPercentage.trim() !== "") {
//       const parsed = parseFloat(formState.rateAdjustmentPercentage);
//       if (isNaN(parsed)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         setIsSubmitting(false);
//         return;
//       }
//       rateAdj = parsed;
//     } else {
//       rateAdj = 0;
//     }
//     const payload: Partial<Currency> = {
//       currencyName: formState.currencyName.trim(),
//       flagImage: formState.flagImage.trim() || null,
//       payeeName: formState.payeeName.trim() || null,
//       iban: formState.iban.trim() || null,
//       bicSwift: formState.bicSwift.trim() || null,
//       bankAddress: formState.bankAddress.trim() || null,
//       wiseFeePercentage: wiseFee,
//       bankTransferFee: bankFee,
//       rateAdjustmentPercentage: rateAdj,
//     };
//     if (!payload.currencyName) {
//       toast.error("Currency Name is required.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (
//       payload.flagImage &&
//       !payload.flagImage.startsWith("/") &&
//       !payload.flagImage.startsWith("http")
//     ) {
//       toast.error(
//         "Flag Image Path must be a relative path starting with '/' or a full URL."
//       );
//       setIsSubmitting(false);
//       return;
//     }
//     try {
//       const response = await axios.put<Currency>(
//         `/admin/currencies/${currencyId}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCurrency(response.data);
//       setFormState({
//         code: response.data.code || "",
//         currencyName: response.data.currencyName || "",
//         flagImage: response.data.flagImage || "",
//         payeeName: response.data.payeeName || "",
//         iban: response.data.iban || "",
//         bicSwift: response.data.bicSwift || "",
//         bankAddress: response.data.bankAddress || "",
//         wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
//         bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
//         rateAdjustmentPercentage:
//           response.data.rateAdjustmentPercentage?.toString() ?? "0",
//       });
//       toast.success("Currency updated successfully!");
//       setFormChanged(false);
//       setFlagImageError(false);
//       setTimeout(() => {
//         router.push("/admin/currencies");
//       }, 1500);
//     } catch (err: unknown) {
//       console.error("Update error:", err);
//       if (isAxiosError(err)) {
//         const errorData = err.response?.data as ApiErrorData | undefined;
//         let message = "Failed to update currency";
//         if (errorData?.message) {
//           message = errorData.message;
//         } else if (errorData?.error) {
//           message = errorData.error;
//         } else if (err.response?.statusText) {
//           message = `Error ${err.response.status}: ${err.response.statusText}`;
//         }
//         toast.error(message);
//       } else if (err instanceof Error) {
//         toast.error(
//           err.message || "An unexpected error occurred during update."
//         );
//       } else {
//         toast.error("An unexpected error occurred during update.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form (remains the same)
//   const handleReset = () => {
//     if (!currency) return;
//     setFormState({
//       code: currency.code || "",
//       currencyName: currency.currencyName || "",
//       flagImage: currency.flagImage || "",
//       payeeName: currency.payeeName || "",
//       iban: currency.iban || "",
//       bicSwift: currency.bicSwift || "",
//       bankAddress: currency.bankAddress || "",
//       wiseFeePercentage: currency.wiseFeePercentage?.toString() ?? "",
//       bankTransferFee: currency.bankTransferFee?.toString() ?? "",
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//     setFlagImageError(false);
//     setFormChanged(false);
//     toast.info("Form reset to last saved values");
//   };

//   // --- Refactored Tab Content Rendering Functions ---
//   const renderGeneralContent = () => {
//     if (!formState) return null;
//     return (
//       <motion.div
//         key="general-content"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="space-y-4"
//       >
//         <motion.div
//           variants={itemVariants}
//           className="rounded-xl bg-white dark:bg-background border shadow-sm"
//         >
//           <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//             General Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:p-6 p-4">
//             <div>
//               <label
//                 htmlFor="code"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <FaGlobe size={18} className="text-primary" />
//                 Currency Code
//                 <span className="text-red-600">*</span>
//               </label>
//               <div className="relative mt-1">
//                 <input
//                   type="text"
//                   id="code"
//                   value={formState.code}
//                   readOnly
//                   className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 w-full border cursor-not-allowed rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                 />
//                 <span className="pointer-events-none absolute right-4.5 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-gray-300">
//                   <Lock size={18} />
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="currencyName"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <DollarSign size={18} className="text-primary" />
//                 Currency Name <span className="text-red-600">*</span>
//               </label>

//               <input
//                 type="text"
//                 name="currencyName"
//                 id="currencyName"
//                 placeholder="e.g., Euro"
//                 value={formState.currencyName}
//                 onChange={handleChange}
//                 required
//                 className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 focus:border-[#5f5f5f] w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//               />
//             </div>

//             <div className="md:col-span-1">
//               {/* Image input feild with logic */}
//               <label
//                 htmlFor="flagImage"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <ImageIcon size={18} className="text-primary" />
//                 Flag Image Path
//                 <span className="text-red-600">*</span>
//               </label>

//               <div className="relative">
//                 <input
//                   type="text"
//                   name="flagImage"
//                   id="flagImage"
//                   value={formState.flagImage}
//                   onChange={handleChange}
//                   placeholder="/assets/icon/flags/eur.png or https://..."
//                   className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                 />
//                 {formState.flagImage && !flagImageError && (
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 size-8 pointer-events-none">
//                     <Image
//                       src={formState.flagImage}
//                       alt={`${formState.code || "Currency"} flag`}
//                       fill
//                       style={{ objectFit: "contain" }}
//                       onError={() => setFlagImageError(true)}
//                       unoptimized={formState.flagImage.startsWith("http")}
//                     />
//                   </div>
//                 )}

//                 {flagImageError && formState.flagImage && (
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-medium text-xs">
//                     Load Error
//                   </div>
//                 )}
//               </div>

//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
//                 Relative path (e.g., /assets/icon/flags/eur.png) or full URL.
//                 Must be accessible.
//               </p>

//               {flagImageError && (
//                 <p className="mt-2 text-xs font-medium text-red-600">
//                   Could not load the flag image. Check the path/URL.
//                 </p>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           variants={itemVariants}
//           className="rounded-xl bg-white dark:bg-background border shadow-sm"
//         >
//           <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//             Metadata
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
//             <div className="space-y-2">
//               <p className="font-medium text-gray-500 flex items-center gap-1 dark:text-gray-300">
//                 <AiOutlineCalendar size={18} className="text-primary" />
//                 Created At
//               </p>

//               <div className="rounded-md bg-lightgray dark:bg-primarybox py-3 px-4 text-neutral-900 dark:text-gray-300">
//                 {currency?.createdAt
//                   ? new Date(currency.createdAt).toLocaleString()
//                   : "N/A"}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <p className="font-medium text-gray-500 flex items-center gap-1 dark:text-gray-300">
//                 <MdUpdate className="text-primary" size={18} />
//                 Last Updated
//               </p>

//               <div className="rounded-md bg-lightgray dark:bg-primarybox py-3 px-4 text-neutral-900 dark:text-gray-300">
//                 {currency?.updatedAt
//                   ? new Date(currency.updatedAt).toLocaleString()
//                   : "N/A"}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   const renderBankContent = () => {
//     if (!formState) return null;
//     return (
//       <motion.div
//         key="bank-content"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="space-y-4"
//       >
//         <motion.div
//           variants={itemVariants}
//           className="rounded-xl bg-white dark:bg-background border shadow-sm"
//         >
//           <div className="border-b pb-2 px-4 py-3">
//             <h3 className="md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//               Bank Details (Optional)
//             </h3>

//             <p className="text-sm text-gray-500 dark:text-gray-300">
//               Provide these details if you need to store bank information
//               associated with this currency.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:p-6 p-4 gap-6">
//             <div>
//               <label
//                 htmlFor="payeeName"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <Building size={18} className="text-primary" />
//                 Payee Name
//                 <span className="text-red-600">*</span>
//               </label>

//               <input
//                 type="text"
//                 name="payeeName"
//                 id="payeeName"
//                 placeholder="Recipient's full name or company name"
//                 value={formState.payeeName}
//                 onChange={handleChange}
//                 className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 w-full border focus:border-[#5f5f5f] rounded-lg transition-all focus:outline-none ease-linear duration-75"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="iban"
//                   className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//                 >
//                   <Hash size={18} className="text-primary" />
//                   IBAN
//                   <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="iban"
//                   id="iban"
//                   placeholder="International Bank Account Number"
//                   value={formState.iban}
//                   onChange={handleChange}
//                   className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 focus:border-[#5f5f5f] w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="bicSwift"
//                   className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//                 >
//                   <Hash size={18} className="text-primary" />
//                   BIC/SWIFT
//                   <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="bicSwift"
//                   id="bicSwift"
//                   placeholder="Bank Identifier Code"
//                   value={formState.bicSwift}
//                   onChange={handleChange}
//                   className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 focus:border-[#5f5f5f] w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="bankAddress"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <Landmark size={18} className="text-primary" />
//                 Bank Address
//                 <span className="text-red-600">*</span>
//               </label>

//               <div className="mt-2 overflow-y-auto rounded-lg">
//                 <textarea
//                   id="bankAddress"
//                   name="bankAddress"
//                   rows={3}
//                   placeholder="Full address of the recipient's bank"
//                   value={formState.bankAddress}
//                   onChange={handleChange}
//                   className="min-h-[100px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                 ></textarea>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   const renderFeesContent = () => {
//     if (!formState) return null;
//     return (
//       <motion.div
//         key="fees-content"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="space-y-4"
//       >
//         <motion.div
//           variants={itemVariants}
//           className="rounded-xl bg-white dark:bg-background border shadow-sm"
//         >
//           <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-neutral-900 dark:text-white">
//             Fees & Exchange Rate Settings (Optional)
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:p-6 p-4">
//             <div>
//               <label
//                 htmlFor="wiseFeePercentage"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <Percent size={18} className="text-primary" />
//                 remityn Fees <span className="text-red-600">*</span>
//               </label>

//               <div className="relative">
//                 <input
//                   type="number"
//                   name="wiseFeePercentage"
//                   id="wiseFeePercentage"
//                   value={formState.wiseFeePercentage}
//                   onChange={handleChange}
//                   step="any"
//                   min="0"
//                   className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 w-full border focus:border-[#5f5f5f] rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                   placeholder="e.g., 0.5"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                   <span className="text-gray-500 dark:text-gray-300">%</span>
//                 </div>
//               </div>
//               <p className="mt-2 text-sm text-gray-500  dark:text-gray-300">
//                 Percentage fee for remityn transfers (leave blank if none).
//               </p>
//             </div>
//             <div>
//               <label
//                 htmlFor="bankTransferFee"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <DollarSign size={18} className="text-primary" />
//                 Bank Transfer Fees
//                 <span className="text-red-600">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   name="bankTransferFee"
//                   id="bankTransferFee"
//                   value={formState.bankTransferFee}
//                   onChange={handleChange}
//                   step="any"
//                   min="0"
//                   className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 w-full border focus:border-[#5f5f5f] rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                   placeholder="e.g., 5.00"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                   <span className="text-gray-500 dark:text-gray-300 text-sm font-medium">
//                     {formState.code || "CUR"}
//                   </span>
//                 </div>
//               </div>
//               <p className="mt-2 text-sm text-gray-500  dark:text-gray-300">
//                 Fixed Fees in {formState.code || "currency"} (leave blank if
//                 none).
//               </p>
//             </div>
//             <div>
//               <label
//                 htmlFor="rateAdjustmentPercentage"
//                 className="text-mainheadingWhite capitalize text-sm flex items-center gap-1 lg:text-base"
//               >
//                 <Percent size={18} className="text-primary" />
//                 Our Adjustment <span className="text-red-600">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   name="rateAdjustmentPercentage"
//                   id="rateAdjustmentPercentage"
//                   value={formState.rateAdjustmentPercentage}
//                   onChange={handleChange}
//                   step="any"
//                   className="mt-2 block px-4 py-3 bg-white dark:bg-background h-14 w-full border focus:border-[#5f5f5f] rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                   placeholder="e.g., -0.5 or 1.2"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
//                   <span className="text-gray-500 dark:text-gray-300">%</span>
//                 </div>
//               </div>
//               <p className="mt-2 text-sm text-gray-500  dark:text-gray-300">
//                 Adjustment vs market rate (default 0).
//               </p>
//             </div>
//           </div>

//           <div className="lg:p-6 p-4">
//             <div className="rounded-md bg-lightgray dark:bg-background border overflow-hidden">

//               <h4 className="px-4 py-3 md:text-lg text-base font-medium bg-lightborder border-b dark:bg-primarybox text-neutral-900 dark:text-white">
//                 Exchange Rate Info
//               </h4>

//               <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
//                 The Our Adjustment % modifies the market exchange rate used in
//                 calculations. A positive value (e.g., 1%) increases the rate,
//                 making the foreign currency relatively cheaper. A negative value
//                 (e.g., -0.5%) decreases the rate, making the foreign currency
//                 relatively more expensive. Set to 0 (or leave blank) to use the
//                 market rate directly.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // --- Main component render ---
//   if (isLoading) {
//     return (
//       <div className=" bg-white dark:bg-background">
//         <LoadingSkeleton />;
//       </div>
//     );
//   }

//   if (!isLoading && !currency && !formState) {
//     return (
//       <div className="container mx-auto px-4 py-5 relative">
//         <CurrencyEditHeader currencyName="Error" currencyCode="XXX" />
//         <div className="mt-5 text-center text-red-600 bg-red-600/10 border border-red-400 dark:border-red-600 p-4 rounded-lg">
//           Failed to load currency details. Please check the ID or try again
//           later.
//           <Link
//             href="/admin/currencies"
//             className="mt-4 inline-block text-primary underline"
//           >
//             Back to Currencies
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-5">
//       <CurrencyEditHeader
//         currencyName={currency?.currencyName || formState?.currencyName}
//         currencyCode={currency?.code || formState?.code}
//       />

//       <div className="container mx-auto px-4 relative">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="bg-white dark:bg-background"
//         >

//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="colored"
//           />

//           <div className="mx-auto max-w-5xl">
//             {!isLoading && formState && (
//               <motion.form
//                 onSubmit={handleSubmit}
//                 className="space-y-8"
//                 initial="hidden" // Moved initial animation props here if form itself should animate
//                 animate="visible"
//                 variants={containerVariants} // Use containerVariants for the form to stagger children
//               >
//                 {/* --- New Tabs Section --- */}
//                 <Tabs
//                   value={activeTab}
//                   onValueChange={(value) =>
//                     setActiveTab(value as "general" | "bank" | "fees")
//                   }
//                   className="w-full"
//                 >
//                   <motion.div
//                     variants={itemVariants}
//                     className="mb-4 rounded-full overflow-hidden"
//                   >
//                     {" "}
//                     {/* itemVariant for the TabsList container */}
//                     <TabsList className="relative z-0 flex w-full h-full whitespace-nowrap overflow-x-auto  dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//                       {TABS_CONFIG.map((tabInfo) => (
//                         <TabsTrigger
//                           key={tabInfo.value}
//                           value={tabInfo.value}
//                           className={cn(
//                             "relative px-4 py-3 flex items-center justify-center gap-2 text-base shrink-0 min-w-max rounded-full text-neutral-900 dark:text-white data-[state=active]:text-neutral-900 dark:data-[state=active]:text-primary border-none data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                           )}
//                         >
//                           {activeTab === tabInfo.value && (
//                             <motion.div
//                               layoutId="active-currency-tab-indicator" // Unique layoutId
//                               className="absolute inset-0 -z-10 bg-primary dark:bg-secondarybox rounded-full shadow-sm"
//                               transition={{ stiffness: 350, damping: 30 }}
//                             />
//                           )}
//                           <tabInfo.icon className="size-5" />{" "}
//                           <span className="truncate">{tabInfo.label}</span>
//                         </TabsTrigger>
//                       ))}
//                     </TabsList>
//                   </motion.div>

//                   <TabsContent value="general">
//                     {renderGeneralContent()}
//                   </TabsContent>
//                   <TabsContent value="bank">{renderBankContent()}</TabsContent>
//                   <TabsContent value="fees">{renderFeesContent()}</TabsContent>
//                 </Tabs>

//                 {/* Action Buttons */}
//                 <motion.div
//                   variants={itemVariants} // itemVariant for the buttons container
//                   className="flex flex-col sm:flex-row justify-end gap-3"
//                 >
//                   <button
//                     type="button"
//                     onClick={handleReset}
//                     disabled={isSubmitting || !formChanged}
//                     className="inline-flex items-center justify-center gap-2 cursor-pointer bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-6 py-3 h-12 text-center w-full sm:w-auto transition-all duration-75 ease-linear group"
//                   >
//                     <RefreshCw
//                       size={20}
//                       className={`transition-transform duration-300 ${
//                         formChanged && !isSubmitting
//                           ? "group-hover:rotate-[-180deg]"
//                           : ""
//                       }`}
//                     />
//                     Reset
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting || !formChanged}
//                     className="inline-flex items-center justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-6 py-3 h-12 text-center w-full sm:w-auto transition-all duration-75 ease-linear"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M12 2V6"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
//                           <path
//                             d="M12 18V22"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M4.93 4.93L7.76 7.76"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M16.24 16.24L19.07 19.07"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M2 12H6"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M18 12H22"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M4.93 19.07L7.76 16.24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M16.24 7.76L19.07 4.93"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <span>Saving...</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>Save Changes</span>
//                       </>
//                     )}
//                   </button>
//                 </motion.div>
//               </motion.form>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCurrencyPage;

// frontend/src/app/admin/currencies/[currencyId]/page.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { motion } from "framer-motion";
import apiConfig from "../../../config/apiConfig";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  Save,
  DollarSign,
  Building,
  Landmark,
  Hash,
  Percent,
  Image as ImageIcon,
  RefreshCw,
  Lock,
  BarChart4,
} from "lucide-react";
import { FaArrowLeftLong, FaIdCard } from "react-icons/fa6";
import { FaGlobe, FaPercentage } from "react-icons/fa";

// Import react-toastify components and CustomToast
import {
  ToastContainer,
  toast as reactToastifyToast,
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// **IMPORTANT**: Adjust this path to your CustomToast component
import CustomToast, { CustomToastProps } from "../../../components/CustomToast";
// Example if CustomToast is in frontend/src/app/components/CustomToast.tsx:
// import CustomToast, { CustomToastProps } from "../../../../components/CustomToast";

import CurrencyEditHeader from "../../components/currencies/CurrencyEditHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

axios.defaults.baseURL = apiConfig.baseUrl;

// Interfaces
interface Currency {
  _id: string;
  code: string;
  currencyName: string;
  flagImage?: string | null;
  payeeName?: string | null;
  iban?: string | null;
  bicSwift?: string | null;
  bankAddress?: string | null;
  wiseFeePercentage?: number | null;
  bankTransferFee?: number | null;
  rateAdjustmentPercentage?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

interface CurrencyFormState {
  code: string;
  currencyName: string;
  flagImage: string;
  payeeName: string;
  iban: string;
  bicSwift: string;
  bankAddress: string;
  wiseFeePercentage: string;
  bankTransferFee: string;
  rateAdjustmentPercentage: string;
}

function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

interface ApiErrorData {
  message?: string;
  error?: string;
}

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4">
    <motion.div className="py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <Skeleton className="h-4 w-64 mb-3 rounded" />
          <Skeleton className="h-8 w-48 rounded " />
        </div>
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-8">
          <div className="overflow-hidden mb-4">
            <div className="relative flex w-full h-full overflow-x-auto gap-3 whitespace-nowrap bg-secondarybox p-1.5 rounded-full justify-normal items-center">
              <Skeleton className="h-10 flex-1 rounded-full bg-background/50" />
              <Skeleton className="h-10 flex-1 rounded-full bg-background/50" />
              <Skeleton className="h-10 flex-1 rounded-full bg-background/50" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-primarybox border lg:p-6 p-4">
              <Skeleton className="h-5 w-1/3 rounded mb-4 border-b border-transparent pb-2 bg-background/50" />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4 rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded-md bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3 rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded-md bg-background/50" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Skeleton className="h-4 w-1/3 rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded-md bg-background/50" />
                  <Skeleton className="h-3 w-3/4 rounded bg-background/50" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-primarybox border">
              <Skeleton className="h-5 w-1/4 rounded m-4 lg:m-6 mb-0 border-b border-transparent pb-3 bg-background/50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3 rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded-md bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3 rounded bg-background/50" />
                  <Skeleton className="h-12 w-full rounded-md bg-background/50" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t">
            <Skeleton className="h-12 w-full sm:w-28 rounded-full" />
            <Skeleton className="h-12 w-full sm:w-36 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const TABS_CONFIG = [
  { value: "general", label: "General Info", icon: FaGlobe },
  { value: "bank", label: "Bank Details", icon: FaIdCard },
  { value: "fees", label: "Fees & Rates", icon: FaPercentage },
];

const AdminEditCurrencyPage = () => {
  const params = useParams();
  const router = useRouter();
  const { currencyId } = params;
  const { token } = useAuth();

  const [currency, setCurrency] = useState<Currency | null>(null);
  const [formState, setFormState] = useState<CurrencyFormState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "bank" | "fees">(
    "general"
  );
  const [formChanged, setFormChanged] = useState(false);
  const [flagImageError, setFlagImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // For ToastContainer

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
  const customToastContainerProps: ToastContainerProps = {
    // Renamed to avoid conflict with react-toastify's ToastContainer import if used directly
    position: "top-right",
    autoClose: 5000, // Default autoClose, can be overridden by showToast
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: false, // Important: keep false if onClose actions are used
    closeButton: false, // CustomToast handles its own close or relies on autoClose
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      if (!token || !currencyId) {
        setIsLoading(false);
        showToast("Missing token or currency ID.", "error");
        if (!token) router.push("/auth/login");
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get<Currency>(
          `/admin/currencies/${currencyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCurrency(response.data);
        setFormState({
          code: response.data.code || "",
          currencyName: response.data.currencyName || "",
          flagImage: response.data.flagImage || "",
          payeeName: response.data.payeeName || "",
          iban: response.data.iban || "",
          bicSwift: response.data.bicSwift || "",
          bankAddress: response.data.bankAddress || "",
          wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
          bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
          rateAdjustmentPercentage:
            response.data.rateAdjustmentPercentage?.toString() ?? "0",
        });
        setFlagImageError(false);
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        let message = "Failed to load currency details";
        if (isAxiosError(err)) {
          const errorData = err.response?.data as ApiErrorData | undefined;
          if (errorData?.message) message = errorData.message;
          else if (errorData?.error) message = errorData.error;
          else if (err.response?.statusText)
            message = `Error ${err.response.status}: ${err.response.statusText}`;

          if (err.response?.status === 404) message = "Currency not found.";
          else if (
            err.response?.status === 401 ||
            err.response?.status === 403
          ) {
            message = "Unauthorized. Redirecting to login...";
            showToast(message, "error", {
              onClose: () => router.push("/auth/login"),
              autoClose: 2000,
            });
            // setLoading(false) will be handled in finally
            // return here to prevent further execution if redirecting
            setIsLoading(false); // Set loading false before returning
            return;
          }
        } else if (err instanceof Error) {
          message = err.message || "An unexpected error occurred.";
        }
        showToast(message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrency();
  }, [currencyId, token, router, showToast]); // Added showToast

  useEffect(() => {
    if (!currency || !formState) return;
    const currentWiseFee = currency.wiseFeePercentage?.toString() ?? "";
    const currentBankFee = currency.bankTransferFee?.toString() ?? "";
    const currentRateAdj = currency.rateAdjustmentPercentage?.toString() ?? "0";
    const isChanged =
      formState.currencyName !== (currency.currencyName || "") ||
      formState.flagImage !== (currency.flagImage || "") ||
      formState.payeeName !== (currency.payeeName || "") ||
      formState.iban !== (currency.iban || "") ||
      formState.bicSwift !== (currency.bicSwift || "") ||
      formState.bankAddress !== (currency.bankAddress || "") ||
      formState.wiseFeePercentage !== currentWiseFee ||
      formState.bankTransferFee !== currentBankFee ||
      formState.rateAdjustmentPercentage !== currentRateAdj;
    setFormChanged(isChanged);
  }, [currency, formState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      if (!prev) return null;
      const newState = { ...prev, [name]: value };
      if (name === "flagImage") setFlagImageError(false);
      return newState;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState || !currencyId || !token) {
      showToast("Form data or required parameters missing.", "error");
      return;
    }
    setIsSubmitting(true);
    let wiseFee: number | null = null;
    if (formState.wiseFeePercentage.trim() !== "") {
      const parsed = parseFloat(formState.wiseFeePercentage);
      if (isNaN(parsed) || parsed < 0) {
        showToast("remityn Fee % must be a non-negative number.", "error");
        setIsSubmitting(false);
        return;
      }
      wiseFee = parsed;
    }
    let bankFee: number | null = null;
    if (formState.bankTransferFee.trim() !== "") {
      const parsed = parseFloat(formState.bankTransferFee);
      if (isNaN(parsed) || parsed < 0) {
        showToast("Bank Fee must be a non-negative number.", "error");
        setIsSubmitting(false);
        return;
      }
      bankFee = parsed;
    }
    let rateAdj: number = 0;
    if (formState.rateAdjustmentPercentage.trim() !== "") {
      const parsed = parseFloat(formState.rateAdjustmentPercentage);
      if (isNaN(parsed)) {
        showToast("Rate Adjustment must be a valid number.", "error");
        setIsSubmitting(false);
        return;
      }
      rateAdj = parsed;
    }
    const payload: Partial<Currency> = {
      currencyName: formState.currencyName.trim(),
      flagImage: formState.flagImage.trim() || null,
      payeeName: formState.payeeName.trim() || null,
      iban: formState.iban.trim() || null,
      bicSwift: formState.bicSwift.trim() || null,
      bankAddress: formState.bankAddress.trim() || null,
      wiseFeePercentage: wiseFee,
      bankTransferFee: bankFee,
      rateAdjustmentPercentage: rateAdj,
    };
    if (!payload.currencyName) {
      showToast("Currency Name is required.", "error");
      setIsSubmitting(false);
      return;
    }
    if (
      payload.flagImage &&
      !payload.flagImage.startsWith("/") &&
      !payload.flagImage.startsWith("http")
    ) {
      showToast(
        "Flag Image Path must be a relative path starting with '/' or a full URL.",
        "error"
      );
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.put<Currency>(
        `/admin/currencies/${currencyId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrency(response.data);
      setFormState({
        code: response.data.code || "",
        currencyName: response.data.currencyName || "",
        flagImage: response.data.flagImage || "",
        payeeName: response.data.payeeName || "",
        iban: response.data.iban || "",
        bicSwift: response.data.bicSwift || "",
        bankAddress: response.data.bankAddress || "",
        wiseFeePercentage: response.data.wiseFeePercentage?.toString() ?? "",
        bankTransferFee: response.data.bankTransferFee?.toString() ?? "",
        rateAdjustmentPercentage:
          response.data.rateAdjustmentPercentage?.toString() ?? "0",
      });
      showToast("Currency updated successfully!", "success", {
        onClose: () => router.push("/admin/currencies"),
        autoClose: 1500, // Shorter autoClose before redirect
      });
      setFormChanged(false);
      setFlagImageError(false);
      // Navigation is handled by toast onClose
    } catch (err: unknown) {
      console.error("Update error:", err);
      let message = "Failed to update currency";
      if (isAxiosError(err)) {
        const errorData = err.response?.data as ApiErrorData | undefined;
        if (errorData?.message) message = errorData.message;
        else if (errorData?.error) message = errorData.error;
        else if (err.response?.statusText)
          message = `Error ${err.response.status}: ${err.response.statusText}`;
      } else if (err instanceof Error) {
        message = err.message || "An unexpected error occurred during update.";
      }
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (!currency) return;
    setFormState({
      code: currency.code || "",
      currencyName: currency.currencyName || "",
      flagImage: currency.flagImage || "",
      payeeName: currency.payeeName || "",
      iban: currency.iban || "",
      bicSwift: currency.bicSwift || "",
      bankAddress: currency.bankAddress || "",
      wiseFeePercentage: currency.wiseFeePercentage?.toString() ?? "",
      bankTransferFee: currency.bankTransferFee?.toString() ?? "",
      rateAdjustmentPercentage:
        currency.rateAdjustmentPercentage?.toString() ?? "0",
    });
    setFlagImageError(false);
    setFormChanged(false);
    showToast("Form reset to last saved values", "info");
  };

  const renderGeneralContent = () => {
    if (!formState) return null;
    return (
      <motion.div
        key="general-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-4"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-background border"
        >
          <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-mainheadingWhite">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:p-6 p-4">
            <div>
              <label
                htmlFor="code"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 not-last:lg:text-base"
              >
                <FaGlobe size={18} className="text-primary" />
                Currency Code<span className="text-red-600">*</span>
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="code"
                  value={formState.code}
                  readOnly
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                />
                <span className="pointer-events-none absolute right-4.5 top-1/2 -translate-y-1/2 text-mainheadingWhite">
                  <Lock size={20} />
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="currencyName"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <DollarSign size={18} className="text-primary" />
                Currency Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="currencyName"
                id="currencyName"
                placeholder="e.g., Euro"
                value={formState.currencyName}
                onChange={handleChange}
                required
                className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
              />
            </div>
            <div className="md:col-span-1">
              <label
                htmlFor="flagImage"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <ImageIcon size={18} className="text-primary" />
                Flag Image Path<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="flagImage"
                  id="flagImage"
                  value={formState.flagImage}
                  onChange={handleChange}
                  placeholder="/assets/icon/flags/eur.png or https://..."
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                />

                {formState.flagImage && !flagImageError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 size-8 pointer-events-none">
                    <Image
                      src={formState.flagImage}
                      alt={`${formState.code || "Currency"} flag`}
                      fill
                      style={{ objectFit: "contain" }}
                      onError={() => setFlagImageError(true)}
                      unoptimized={formState.flagImage.startsWith("http")}
                    />
                  </div>
                )}
                {flagImageError && formState.flagImage && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-medium text-xs">
                    Load Error
                  </div>
                )}
              </div>

              <p className="mt-1 text-sm text-subheadingWhite">
                Relative path (e.g., /assets/icon/flags/eur.png) or full URL.
                Must be accessible.
              </p>

              {flagImageError && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  Could not load the flag image. Check the path/URL.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-background border"
        >
          <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-mainheadingWhite">
            Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 p-4">
            <div className="space-y-2">
              <p className="font-medium text-mainheadingWhite flex items-center gap-1.5 ">
                <AiOutlineCalendar size={18} className="text-primary" />
                Created At
              </p>
              <div className="rounded-md text-mainheadingWhite bg-primarybox py-3 px-4">
                {currency?.createdAt
                  ? new Date(currency.createdAt).toLocaleString()
                  : "N/A"}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-mainheadingWhite flex items-center gap-1.5">
                <MdUpdate className="text-primary" size={18} />
                Last Updated
              </p>
              <div className="rounded-md text-mainheadingWhite bg-primarybox py-3 px-4">
                {currency?.updatedAt
                  ? new Date(currency.updatedAt).toLocaleString()
                  : "N/A"}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderBankContent = () => {
    if (!formState) return null;
    return (
      <motion.div
        key="bank-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-4"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-background border"
        >
          <div className="border-b pb-2 px-4 py-3">
            <h3 className="md:text-lg text-base font-medium text-mainheadingWhite">
              Bank Details (Optional)
            </h3>
            <p className="text-sm text-subheadingWhite">
              Provide these details if you need to store bank information
              associated with this currency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:p-6 p-4 gap-6">
            <div>
              <label
                htmlFor="payeeName"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <Building size={18} className="text-primary" />
                Payee Name<span className="text-red-600">*</span>
              </label>

              <input
                type="text"
                name="payeeName"
                id="payeeName"
                placeholder="Recipient's full name or company name"
                value={formState.payeeName}
                onChange={handleChange}
                className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="iban"
                  className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
                >
                  <Hash size={18} className="text-primary" />
                  IBAN<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="iban"
                  id="iban"
                  placeholder="International Bank Account Number"
                  value={formState.iban}
                  onChange={handleChange}
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                />
              </div>
              <div>
                <label
                  htmlFor="bicSwift"
                  className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
                >
                  <Hash size={18} className="text-primary" />
                  BIC/SWIFT<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="bicSwift"
                  id="bicSwift"
                  placeholder="Bank Identifier Code"
                  value={formState.bicSwift}
                  onChange={handleChange}
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="bankAddress"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <Landmark size={18} className="text-primary" />
                Bank Address<span className="text-red-600">*</span>
              </label>
              <div className="mt-2 overflow-y-auto rounded-lg">
                <textarea
                  id="bankAddress"
                  name="bankAddress"
                  rows={3}
                  placeholder="Full address of the recipient's bank"
                  value={formState.bankAddress}
                  onChange={handleChange}
                  className="min-h-[100px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-background h-14 w-full transition-all border rounded-lg focus:outline-none border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white ease-linear duration-75"
                ></textarea>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderFeesContent = () => {
    if (!formState) return null;
    return (
      <motion.div
        key="fees-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-4"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-background border shadow-sm"
        >
          <h3 className="border-b px-4 py-3 md:text-lg text-base font-medium text-mainheadingWhite">
            Fees & Exchange Rate Settings (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:p-6 p-4">
            <div>
              <label
                htmlFor="wiseFeePercentage"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <Percent size={18} className="text-primary" />
                remityn Fees <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="wiseFeePercentage"
                  id="wiseFeePercentage"
                  value={formState.wiseFeePercentage}
                  onChange={handleChange}
                  step="any"
                  min="0"
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 no-spinner"
                  placeholder="e.g., 0.5"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-mainheadingWhite">%</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-subheadingWhite">
                Percentage fee for remityn transfers (leave blank if none).
              </p>
            </div>

            <div>
              <label
                htmlFor="bankTransferFee"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <DollarSign size={18} className="text-primary" />
                Bank Transfer Fees<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="bankTransferFee"
                  id="bankTransferFee"
                  value={formState.bankTransferFee}
                  onChange={handleChange}
                  step="any"
                  min="0"
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 no-spinner"
                  placeholder="e.g., 5.00"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-mainheadingWhite text-sm font-medium">
                    {formState.code || "CUR"}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm text-subheadingWhite">
                Fixed Fees in {formState.code || "currency"} (leave blank if
                none).
              </p>
            </div>
            <div>
              <label
                htmlFor="rateAdjustmentPercentage"
                className="text-mainheadingWhite capitalize text-sm flex items-center gap-1.5 lg:text-base"
              >
                <Percent size={18} className="text-primary" />
                Our Adjustment <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  type="number"
                  name="rateAdjustmentPercentage"
                  id="rateAdjustmentPercentage"
                  value={formState.rateAdjustmentPercentage}
                  onChange={handleChange}
                  step="any"
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 no-spinner"
                  placeholder="e.g., -0.5 or 1.2"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-mainheadingWhite">%</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-subheadingWhite">
                Adjustment vs market rate (default 0).
              </p>
            </div>
          </div>

          <div className="lg:p-6 p-4">
            <div className="rounded-md bg-background border overflow-hidden">
              <h4 className="px-4 py-3 md:text-lg text-base font-medium bg-primarybox text-mainheadingWhite border-b">
                Exchange Rate Info
              </h4>

              <p className="px-4 py-3 text-sm text-subheadingWhite">
                The Our Adjustment % modifies the market exchange rate used in
                calculations. A positive value (e.g., 1%) increases the rate,
                making the foreign currency relatively cheaper. A negative value
                (e.g., -0.5%) decreases the rate, making the foreign currency
                relatively more expensive. Set to 0 (or leave blank) to use the
                market rate directly.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  /* salu karvanu che  */
  if (isLoading) {
    return (
      <div className="bg-background relative">
        {" "}
        {/* Added relative for ToastContainer */}
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!isLoading && !currency && !formState) {
    // This case is usually hit if fetchCurrency failed critically
    // showToast would have been called in fetchCurrency for specific errors
    return (
      <div className="py-5 relative">
        {" "}
        {/* Added relative for ToastContainer */}
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <CurrencyEditHeader currencyName="Error" currencyCode="XXX" />
        <div className="container mx-auto px-4">
          <div className="mt-5 text-center text-red-600 bg-red-600/10 border border-red-400 dark:border-red-600 p-4 rounded-lg">
            Failed to load currency details. Please check the ID or try again
            later.
            <Link
              href="/admin/currencies"
              className="mt-4 inline-block text-primary underline"
            >
              Back to Currencies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 relative">
      {" "}
      {/* Added relative for ToastContainer */}
      <ToastContainer
        {...customToastContainerProps}
        style={getToastContainerStyle()}
      />
      <CurrencyEditHeader
        currencyName={
          currency?.currencyName || formState?.currencyName || "Loading..."
        }
        currencyCode={currency?.code || formState?.code || "..."}
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-background"
        >
          <div className="mx-auto max-w-5xl">
            {!isLoading && formState && (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "general" | "bank" | "fees")
                  }
                  className="w-full"
                >
                  <motion.div
                    variants={itemVariants}
                    className="mb-4 rounded-full overflow-hidden"
                  >
                    <TabsList className="relative z-0 flex w-full h-full whitespace-nowrap overflow-x-auto bg-secondarybox p-1.5 rounded-full justify-normal items-center">
                      {TABS_CONFIG.map((tabInfo) => (
                        <TabsTrigger
                          key={tabInfo.value}
                          value={tabInfo.value}
                          className={cn(
                            "relative px-4 py-3 flex items-center justify-center gap-2 text-base shrink-0 min-w-max rounded-full text-white data-[state=active]:text-mainheading dark:data-[state=active]:text-primary border-none data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          )}
                        >
                          {activeTab === tabInfo.value && (
                            <motion.div
                              layoutId="active-currency-tab-indicator"
                              className="absolute inset-0 -z-10 bg-primary rounded-full shadow-sm"
                              transition={{ stiffness: 350, damping: 30 }}
                            />
                          )}
                          <tabInfo.icon className="size-5" />{" "}
                          <span className="truncate">{tabInfo.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </motion.div>
                  <TabsContent value="general">
                    {renderGeneralContent()}
                  </TabsContent>
                  <TabsContent value="bank">{renderBankContent()}</TabsContent>
                  <TabsContent value="fees">{renderFeesContent()}</TabsContent>
                </Tabs>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row justify-end gap-3"
                >
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isSubmitting || !formChanged}
                    className="flex items-center justify-center cursor-pointer gap-2 bg-primarybox text-primary hover:bg-primaryboxhover px-4 sm:px-8 py-3 h-[50px] w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw
                      size={20}
                      className={`transition-transform duration-300 class="lucide lucide-refresh-cw size-5" ${
                        formChanged && !isSubmitting
                          ? "group-hover:rotate-[-180deg]"
                          : ""
                      }`}
                    />{" "}
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formChanged}
                    className="inline-flex items-center justify-center cursor-pointer bg-primary hover:bg-primaryhover text-mainheading disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-6 py-3 h-12 text-center w-full sm:w-auto transition-all duration-75 ease-linear"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="size-5 text-mainheading animate-spin mr-2"
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
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminEditCurrencyPage;
