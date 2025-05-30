// import React from "react";
// import { GoArrowLeft } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";

// export default function AddRecipientPage() {
//   // Currency Data (embedded JSON) with image paths
//   const currencies = [
//     {
//       "code": "INR",
//       "name": "Indian rupee",
//       "flag": "/assets/icon/inr.svg" // Path as string
//     },
//     {
//       "code": "AED",
//       "name": "United Arab Emirates dirham",
//       "flag": "/assets/icon/aed.svg" // Path as string
//     },
//     {
//       "code": "AUD",
//       "name": "Australian dollar",
//       "flag": "/assets/icon/aud.svg" // Path as string
//     },

//      {
//       "code": "USD",
//       "name": "United States dollar",
//       "flag": "/assets/icon/usa.svg" // Path as string
//     },
//     {
//       "code": "EUR",
//       "name": "Euro",
//       "flag": "/assets/icon/eur.svg" // Path as string
//     },
//     {
//       "code": "GBP",
//       "name": "British pound",
//       "flag": "/assets/icon/gbp.svg" // Path as string
//     },

//   ];

//   // Recent currencies (select from the currencies array)
//   const recentCurrencies = currencies.filter(currency => ["INR"].includes(currency.code));

//   // All currencies (excluding recent ones for demonstration, you can adjust as needed)
//   const allCurrencies = currencies.filter(currency => !recentCurrencies.includes(currency));

//   return (
//     <section className="Add-Recipient-Page py-12 bg-[#181A1B] h-screen">
//       <div className="container mx-auto px-4">
//         {/* Back and Title */}
//         <div className="relative mb-8">
//           <div className="w-full flex justify-center items-center">
//             <h3 className="text-2xl text-white font-semibold ">
//               Select their currency
//             </h3>
//           </div>
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full absolute left-0 top-1/2 -translate-y-1/2 bg-[#242728]">
//             <GoArrowLeft size={20} className="text-[#A3E769]" />
//             <button className="text-[#A3E769] font-bold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-[#A3E769]">
//               Back
//             </button>
//           </div>
//         </div>

//         {/* Search Currency */}
//         <div className="mb-8">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search currency"
//               className="w-full bg-[#242728] py-3 px-12 rounded-lg text-white focus:outline-none"
//             />
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//               <FiSearch size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Recent currencies */}
//         <div className="mb-8">
//           <h4 className="text-gray-400 text-sm mb-4">Recent currencies</h4>
//           <ul className="bg-[#242728] rounded-lg overflow-hidden">
//             {recentCurrencies.map((currency) => (
//               <li key={currency.code} className="p-4 border-b border-[#303334] last:border-b-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <img src={currency.flag} alt={`${currency.code} Flag`} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-white font-semibold">{currency.code}</p>
//                       <p className="text-gray-400 text-sm">{currency.name}</p>
//                     </div>
//                   </div>
//                   <div className="text-gray-400">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M8.25 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM15.75 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M3.59 7.79a.75.75 0 011.06 0l6.75 6.75a.75.75 0 01-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06zm16.92 0a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* All currencies */}
//         <div>
//           <h4 className="text-gray-400 text-sm mb-4">All currencies</h4>
//           <ul className="bg-[#242728] rounded-lg overflow-hidden">
//             {allCurrencies.map((currency) => (
//               <li key={currency.code} className="p-4 border-b border-[#303334] last:border-b-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <img src={currency.flag} alt={`${currency.code} Flag`} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-white font-semibold">{currency.code}</p>
//                       <p className="text-gray-400 text-sm">{currency.name}</p>
//                     </div>
//                   </div>
//                   <div className="text-gray-400">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M8.25 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM15.75 4.5a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z"
//                         clipRule="evenodd"
//                       />
//                       <path
//                         fillRule="evenodd"
//                         d="M3.59 7.79a.75.75 0 011.06 0l6.75 6.75a.75.75 0 01-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06zm16.92 0a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward } from 'react-icons/io';
// import { IoClose } from 'react-icons/io5';
// import Link from 'next/link';

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();
//     const [step, setStep] = useState(1);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             setFormError(error.message || 'Failed to add recipient. Please try again.');
//             console.error("Error adding recipient:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search currency"
//                                 className="block w-full pl-10 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                                 disabled
//                                 readOnly // Added readOnly prop here
//                             />
//                         </div>
//                         <div className="space-y-3">
//                             <div
//                                 className="hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
//                                 onClick={() => handleCurrencySelect('INR')}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/inr.svg" width={30} height={30} alt="INR Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">INR</h4>
//                                             <p className="text-sm text-gray-600">Indian rupee</p>
//                                         </div>
//                                     </div>
//                                     <IoArrowForward className="text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed opacity-50">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/usd.svg" width={30} height={30} alt="USD Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">USD</h4>
//                                             <p className="text-sm text-gray-600">US dollar (Coming soon)</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-500">Coming soon</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6" // Added mb-6 for spacing
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoClose
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}> {/* Reduced mt-10 to mt-2, Increased space-y-5 to space-y-6 */}
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex" // Added placeholder
//                                     onChange={(e) => setEmail(e.target.value)} // Added onChange handler
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder" // Added placeholder
//                                     onChange={(e) => setAccountHolderName(e.target.value)} // Added onChange handler
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5"> {/* Reduced text-base to text-sm */}
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" /> {/* Reduced size-5 to size-4 */}
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041" // Added placeholder
//                                     onChange={(e) => setIfscCode(e.target.value)} // Added onChange handler
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5"> {/* Reduced text-base to text-sm */}
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" /> {/* Reduced size-5 to size-4 */}
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1" // Added mb-1 for spacing
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891" // Added placeholder
//                                     onChange={(e) => setAccountNumber(e.target.value)} // Added onChange handler
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5"> {/* Reduced text-base to text-sm */}
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" /> {/* Reduced size-5 to size-4 */}
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between items-center mb-4 mt-8"> {/* Added mt-8 for spacing */}
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;

// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5'; // Renamed IoClose to IoCloseIcon to avoid conflict with component name
// import Link from 'next/link';

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();

//     const [step, setStep] = useState(1);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [bankName, setBankName] = useState(''); // New state for Bank name
//     const [address, setAddress] = useState('');   // New state for Address
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//                 bankName,    // Include Bank name
//                 address,     // Include Address
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             setFormError(error.message || 'Failed to add recipient. Please try again.');
//             console.error("Error adding recipient:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search currency"
//                                 className="block w-full pl-10 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                                 disabled
//                                 readOnly
//                             />
//                         </div>
//                         <div className="space-y-3">
//                             <div
//                                 className="hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
//                                 onClick={() => handleCurrencySelect('INR')}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/inr.svg" width={30} height={30} alt="INR Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">INR</h4>
//                                             <p className="text-sm text-gray-600">Indian rupee</p>
//                                         </div>
//                                     </div>
//                                     <IoArrowForward className="text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed opacity-50">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/usd.svg" width={30} height={30} alt="USD Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">USD</h4>
//                                             <p className="text-sm text-gray-600">US dollar (Coming soon)</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-500">Coming soon</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoCloseIcon
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder"
//                                     onChange={(e) => setAccountHolderName(e.target.value)}
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041"
//                                     onChange={(e) => setIfscCode(e.target.value)}
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891"
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* New Bank Name Field */}
//                             <div>
//                                 <label
//                                     htmlFor="bankName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Bank name (optional)
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="bankName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={bankName}
//                                     placeholder="Bank of Baroda"
//                                     onChange={(e) => setBankName(e.target.value)}
//                                 />
//                             </div>

//                             {/* New Address Field */}
//                             <div>
//                                 <label
//                                     htmlFor="address"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Address (optional)
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="address"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={address}
//                                     placeholder="216A High Street North, London, E6 2JA, GB"
//                                     onChange={(e) => setAddress(e.target.value)}
//                                 />
//                             </div>

//                             <div className="flex justify-between items-center mb-4 mt-8">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;

// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import Link from 'next/link';

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();

//     const [step, setStep] = useState(1);
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [bankName, setBankName] = useState('');
//     const [address, setAddress] = useState('');
//     const [accountType, setAccountType] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');
//     const [bankNameError, setBankNameError] = useState('');
//     const [addressError, setAddressError] = useState('');
//     const [accountTypeError, setAccountTypeError] = useState('');

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');
//         setBankNameError('');
//         setAddressError('');
//         setAccountTypeError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }
//         if (!bankName) {
//             setBankNameError('Bank name is required');
//             isValid = false;
//         }
//         if (!address) {
//             setAddressError('Address is required');
//             isValid = false;
//         }
//         if (!accountType) {
//             setAccountTypeError('Account type is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//                 bankName,
//                 address,
//                 accountType,
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             if (error.response && error.response.status === 400 && error.response.data.errors) {
//                 const backendErrors = error.response.data.errors;
//                 setAccountHolderNameError(backendErrors.accountHolderName || '');
//                 setIfscCodeError(backendErrors.ifscCode || '');
//                 setAccountNumberError(backendErrors.accountNumber || '');
//                 setBankNameError(backendErrors.bankName || '');
//                 setAddressError(backendErrors.address || '');
//                 setAccountTypeError(backendErrors.accountType || '');
//                 setFormError('');
//             } else {
//                 setFormError(error.message || 'Failed to add recipient. Please try again.');
//                 console.error("Error adding recipient:", error);
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search currency"
//                                 className="block w-full pl-10 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                                 disabled
//                                 readOnly
//                             />
//                         </div>
//                         <div className="space-y-3">
//                             <div
//                                 className="hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
//                                 onClick={() => handleCurrencySelect('INR')}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/inr.svg" width={30} height={30} alt="INR Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">INR</h4>
//                                             <p className="text-sm text-gray-600">Indian rupee</p>
//                                         </div>
//                                     </div>
//                                     <IoArrowForward className="text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed opacity-50">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <Image src="/assets/icon/usd.svg" width={30} height={30} alt="USD Flag" />
//                                         <div>
//                                             <h4 className="font-semibold text-main">USD</h4>
//                                             <p className="text-sm text-gray-600">US dollar (Coming soon)</p>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-500">Coming soon</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoCloseIcon
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder"
//                                     onChange={(e) => setAccountHolderName(e.target.value)}
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041"
//                                     onChange={(e) => setIfscCode(e.target.value)}
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891"
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountType"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account type <span className="text-error">*</span>
//                                 </label>
//                                 <select
//                                     id="accountType"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountTypeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountType}
//                                     onChange={(e) => setAccountType(e.target.value)}
//                                 >
//                                     <option value="" disabled>Select account type</option>
//                                     <option value="Savings">Savings</option>
//                                     <option value="Current">Current</option>
//                                     <option value="Salary">Salary</option>
//                                 </select>
//                                 {accountTypeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountTypeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="bankName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Bank name <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="bankName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${bankNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={bankName}
//                                     placeholder="Bank of Baroda"
//                                     onChange={(e) => setBankName(e.target.value)}
//                                 />
//                                 {bankNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {bankNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="address"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="address"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${addressError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={address}
//                                     placeholder="216A High Street North, London, E6 2JA, GB"
//                                     onChange={(e) => setAddress(e.target.value)}
//                                 />
//                                 {addressError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {addressError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between items-center mb-4 mt-8">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import currencyService from '../../../services/currency'; // Import currency service
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

// const AddRecipientPage = () => {
//     const router = useRouter();
//     const { token } = useAuth();

//     const [step, setStep] = useState(1);
//     const [currencies, setCurrencies] = useState<any[]>([]); // State to hold currencies
//     const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
//     const [email, setEmail] = useState('');
//     const [accountHolderName, setAccountHolderName] = useState('');
//     const [ifscCode, setIfscCode] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [bankName, setBankName] = useState('');
//     const [address, setAddress] = useState('');
//     const [accountType, setAccountType] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [accountHolderNameError, setAccountHolderNameError] = useState('');
//     const [ifscCodeError, setIfscCodeError] = useState('');
//     const [accountNumberError, setAccountNumberError] = useState('');
//     const [bankNameError, setBankNameError] = useState('');
//     const [addressError, setAddressError] = useState('');
//     const [accountTypeError, setAccountTypeError] = useState('');
//     const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true); // Loading state for currencies

//     useEffect(() => {
//         const fetchCurrencies = async () => {
//             setIsLoadingCurrencies(true);
//             try {
//                 const fetchedCurrencies = await currencyService.getAllCurrencies();
//                 setCurrencies(fetchedCurrencies);
//             } catch (error) {
//                 console.error("Error fetching currencies:", error);
//                 setFormError("Failed to load currencies.");
//             } finally {
//                 setIsLoadingCurrencies(false);
//             }
//         };

//         fetchCurrencies();
//     }, []);

//     const handleCurrencySelect = (currencyCode: string) => {
//         setSelectedCurrencyCode(currencyCode);
//         setStep(2);
//     };

//     const handleBackToCurrencySelect = () => {
//         setStep(1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setFormError('');
//         setAccountHolderNameError('');
//         setIfscCodeError('');
//         setAccountNumberError('');
//         setBankNameError('');
//         setAddressError('');
//         setAccountTypeError('');

//         let isValid = true;
//         if (!accountHolderName) {
//             setAccountHolderNameError('Account holder name is required');
//             isValid = false;
//         }
//         if (!ifscCode) {
//             setIfscCodeError('IFSC code is required');
//             isValid = false;
//         }
//         if (!accountNumber) {
//             setAccountNumberError('Account number is required');
//             isValid = false;
//         }
//         if (!bankName) {
//             setBankNameError('Bank name is required');
//             isValid = false;
//         }
//         if (!address) {
//             setAddressError('Address is required');
//             isValid = false;
//         }
//         if (!accountType) {
//             setAccountTypeError('Account type is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const recipientData = {
//                 currencyCode: selectedCurrencyCode,
//                 email,
//                 accountHolderName,
//                 ifscCode,
//                 accountNumber,
//                 bankName,
//                 address,
//                 accountType,
//             };
//             const newRecipient = await recipientService.addRecipient(recipientData, token);
//             router.push(`/dashboard/recipients/${newRecipient._id}`);
//         } catch (error: any) {
//             if (error.response && error.response.status === 400 && error.response.data.errors) {
//                 const backendErrors = error.response.data.errors;
//                 setAccountHolderNameError(backendErrors.accountHolderName || '');
//                 setIfscCodeError(backendErrors.ifscCode || '');
//                 setAccountNumberError(backendErrors.accountNumber || '');
//                 setBankNameError(backendErrors.bankName || '');
//                 setAddressError(backendErrors.address || '');
//                 setAccountTypeError(backendErrors.accountType || '');
//                 setFormError('');
//             } else {
//                 setFormError(error.message || 'Failed to add recipient. Please try again.');
//                 console.error("Error adding recipient:", error);
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseFormError = () => {
//         setFormError("");
//     };

//     return (
//         <div className="AddRecipientPage">
//             <DashboardHeader title="Recipients" />
//             <div className="flex flex-col lg:flex-row justify-center px-4 mt-8">
//                 {step === 1 && (
//                     <div key="currency-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 lg:mr-4">
//                         <Link href="/dashboard/recipients" className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back
//                         </Link>
//                         <h2 className="text-2xl font-semibold text-main text-center mb-6">Select their currency</h2>

//                         <div className="space-y-3">
//                             {isLoadingCurrencies ? (
//                                 <>
//                                     <Skeleton className="h-16 rounded-xl" />
//                                     <Skeleton className="h-16 rounded-xl" />
//                                     <Skeleton className="h-16 rounded-xl" />
//                                 </>
//                             ) : (
//                                 currencies.map((currency) => (
//                                     <div
//                                         key={currency.code}
//                                         className={`hover:bg-lightgray p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out ${currency.code !== 'INR' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
//                                         onClick={() => currency.code === 'INR' ? handleCurrencySelect(currency.code) : {}}
//                                     >
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center gap-4">
//                                                 {currency.flagImage && (
//                                                     <Image src={currency.flagImage} width={30} height={30} alt={`${currency.currencyName} Flag`} />
//                                                 )}
//                                                 <div>
//                                                     <h4 className="font-semibold text-main">{currency.code}</h4>
//                                                     <p className="text-sm text-gray-600">{currency.currencyName} {currency.code !== 'INR' ? '(Coming soon)' : ''}</p>
//                                                 </div>
//                                             </div>
//                                             {currency.code === 'INR' ? <IoArrowForward className="text-gray-500" /> : <span className="text-gray-500">Coming soon</span>}
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div key="account-step" className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//                         <button onClick={handleBackToCurrencySelect} className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out">
//                             ← Back to Currency
//                         </button>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Enter their account details
//                         </h2>

//                         {formError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{formError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseFormError}
//                                 >
//                                     <IoCloseIcon
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Their email (optional)
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                                     value={email}
//                                     placeholder="example@example.ex"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountHolderName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Recipient's bank details <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountHolderName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountHolderNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountHolderName}
//                                     placeholder="Full name of the account holder"
//                                     onChange={(e) => setAccountHolderName(e.target.value)}
//                                 />
//                                 {accountHolderNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountHolderNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="ifscCode"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     IFSC code <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="ifscCode"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${ifscCodeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={ifscCode}
//                                     placeholder="YESB0236041"
//                                     onChange={(e) => setIfscCode(e.target.value)}
//                                 />
//                                 {ifscCodeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {ifscCodeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountNumber"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account number <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="accountNumber"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountNumberError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountNumber}
//                                     placeholder="678911234567891"
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                 />
//                                 {accountNumberError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountNumberError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="accountType"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Account type <span className="text-error">*</span>
//                                 </label>
//                                 <select
//                                     id="accountType"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${accountTypeError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={accountType}
//                                     onChange={(e) => setAccountType(e.target.value)}
//                                 >
//                                     <option value="" disabled>Select account type</option>
//                                     <option value="Savings">Savings</option>
//                                     <option value="Current">Current</option>
//                                     <option value="Salary">Salary</option>
//                                 </select>
//                                 {accountTypeError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {accountTypeError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="bankName"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Bank name <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="bankName"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${bankNameError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={bankName}
//                                     placeholder="Bank of Baroda"
//                                     onChange={(e) => setBankName(e.target.value)}
//                                 />
//                                 {bankNameError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {bankNameError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="address"
//                                     className="text-gray text-sm block capitalize font-medium mb-1"
//                                 >
//                                     Address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="address"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${addressError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={address}
//                                     placeholder="216A High Street North, London, E6 2JA, GB"
//                                     onChange={(e) => setAddress(e.target.value)}
//                                 />
//                                 {addressError && (
//                                     <p className="flex text-error text-sm items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-4" />
//                                         </span>
//                                         {addressError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between items-center mb-4 mt-8">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                     `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Confirming...
//                                         </div>
//                                     ) : (
//                                         'Confirm'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddRecipientPage;

// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import currencyService from '../../../services/currency';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();

//   const [step, setStep] = useState(1);
//   const [currencies, setCurrencies] = useState<any[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState("");
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       try {
//         const fetchedCurrencies = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         setFormError("Failed to load currencies.");
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   // Separate currencies into available and coming soon arrays directly and then filter them
//   const availableCurrenciesBase = useMemo(() => {
//     return currencies.filter((currency) =>
//       ["INR", "CAD"].includes(currency.code)
//     );
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo(() => {
//     return currencies.filter(
//       (currency) =>
//         !["INR"].includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   // Use useMemo to filter available currencies based on searchCurrency
//   const filteredAvailableCurrencies = useMemo(() => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   // Use useMemo to filter coming soon currencies based on searchCurrency
//   const filteredComingSoonCurrencies = useMemo(() => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);

//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   // Generic step back handler
//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1); // Decrement step to go back to the previous step
//     } else {
//       router.back(); // If already on step 1 or no steps, go back in history
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");

//     let isValid = true;
//     if (!accountHolderName) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }
//     if (!ifscCode) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     }
//     if (!accountNumber) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     if (!bankName) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }
//     if (!address) {
//       setAddressError("Address is required");
//       isValid = false;
//     }
//     if (!accountType) {
//       setAccountTypeError("Account type is required");
//       isValid = false;
//     }

//     if (!isValid) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email,
//         accountHolderName,
//         ifscCode,
//         accountNumber,
//         bankName,
//         address,
//         accountType,
//       };
//       const newRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );
//       router.push(`/dashboard/recipients/${newRecipient._id}`);
//     } catch (error: any) {
//       if (
//         error.response &&
//         error.response.status === 400 &&
//         error.response.data.errors
//       ) {
//         const backendErrors = error.response.data.errors;
//         setAccountHolderNameError(backendErrors.accountHolderName || "");
//         setIfscCodeError(backendErrors.ifscCode || "");
//         setAccountNumberError(backendErrors.accountNumber || "");
//         setBankNameError(backendErrors.bankName || "");
//         setAddressError(backendErrors.address || "");
//         setAccountTypeError(backendErrors.accountType || "");
//         setFormError("");
//       } else {
//         setFormError(
//           error.message || "Failed to add recipient. Please try again."
//         );
//         console.error("Error adding recipient:", error);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");
//   };

//   return (
//     <div className="AddRecipientPage pt-6">
//       <DashboardHeader
//         title="Recipients"
//         onBack={handleBackStep} // Pass handleBackStep as onBack
//       />
//       <div className="">
//         {step === 1 && (
//           <div key="currency-step" className=" bg-white p-6 md:p-8 relative">
//             {/* <Link
//                 href="/dashboard/recipients"
//                 className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out"
//               >
//                 ← Back
//               </Link> */}
//             <h2 className="text-2xl font-semibold text-main text-center mb-6">
//               Select their currency
//             </h2>

//             <div className="relative mb-6">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-14 pr-10 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                 placeholder="Search currency..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-main focus:outline-none"
//                 >
//                   <MdCancel size={24} aria-hidden="true" />
//                 </button>
//               )}
//             </div>

//             <div className="space-y-3">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                 </>
//               ) : (
//                 <>
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div className="mb-6">
//                       <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency.code}
//                             className={`hover:bg-lightgray p-4 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out`}
//                             onClick={() => handleCurrencySelect(currency.code)}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-semibold text-main">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-sm text-gray-600">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <IoArrowForward className="text-gray-500" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {filteredComingSoonCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency.code}
//                             className={`hover:bg-lightgray p-4 rounded-xl cursor-no-drop transition-colors duration-200 ease-in-out opacity-50`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-semibold text-main">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-sm text-gray-600">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <span className="text-gray-500">Coming soon</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 &&
//                     searchCurrency.trim() !== "" && (
//                       <div className="text-center text-gray-500 mt-6">
//                         No currencies found for "{searchCurrency}".
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div key="account-step" className=" bg-white p-6 md:p-8">
//             {/* <button
//               onClick={handleBackToCurrencySelect}
//               className="inline-flex items-center mb-6 text-secondary hover:text-secondary-hover transition-colors duration-200 ease-in-out"
//             >
//               ← Back to Currency
//             </button> */}
//             <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//               Enter their account details
//             </h2>

//             {formError && (
//               <div
//                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                 role="alert"
//               >
//                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                   <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray block max-w-60">{formError}</span>
//                 </div>

//                 <button
//                   className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                   onClick={handleCloseFormError}
//                 >
//                   <IoCloseIcon
//                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                     role="button"
//                   />
//                 </button>
//               </div>
//             )}

//             <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray text-sm block capitalize font-medium mb-1"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                   value={email}
//                   placeholder="example@example.ex"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//                 Recipient's bank details
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Recipient's bank details
//                     <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       accountHolderNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountHolderName}
//                     placeholder="Full name of the account holder"
//                     onChange={(e) => setAccountHolderName(e.target.value)}
//                   />
//                   {accountHolderNameError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     IFSC code <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       ifscCodeError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={ifscCode}
//                     placeholder="YESB0236041"
//                     onChange={(e) => setIfscCode(e.target.value)}
//                   />
//                   {ifscCodeError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Account number <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountNumber"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       accountNumberError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountNumber}
//                     placeholder="678911234567891"
//                     onChange={(e) => setAccountNumber(e.target.value)}
//                   />
//                   {accountNumberError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type */}
//                 <div>
//                   <label
//                     htmlFor="accountType"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Account type <span className="text-error">*</span>
//                   </label>
//                   <select
//                     id="accountType"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       accountTypeError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountType}
//                     onChange={(e) => setAccountType(e.target.value)}
//                   >
//                     <option value="" disabled>
//                       Select account type
//                     </option>
//                     <option value="Savings">Savings</option>
//                     <option value="Current">Current</option>
//                     <option value="Salary">Salary</option>
//                   </select>
//                   {accountTypeError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountTypeError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="bankName"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Bank name <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       bankNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={bankName}
//                     placeholder="Bank of Baroda"
//                     onChange={(e) => setBankName(e.target.value)}
//                   />
//                   {bankNameError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Bank Branch Address <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       addressError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={address}
//                     placeholder="216A High Street North, London, E6 2JA, GB"
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                   {addressError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-4 mt-8">
//                 <button
//                   type="button"
//                   className={`rounded-full sm:order-1 order-2 text-gray-600 text-lg md:w-64 w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors border border-gray-300 hover:bg-gray-100`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   className={`rounded-full sm:order-2 order-1 text-green text-lg md:w-64 w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${
//                                           isSubmitting
//                                             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                             : "bg-primary hover:bg-primary-hover text-secondary"
//                                         }
//                                     `}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
//                         className="h-5 text-green w-5 animate-spin mr-3"
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
//                       Confirming...
//                     </div>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// // pages/dashboard/recipients/add/index.tsx
// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import currencyService from '../../../services/currency';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';
// import AccountTypeDropdown from '@/app/components/ui/AccountTypeDropdown'; // Import the reusable component

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();

//   const [step, setStep] = useState(1);
//   const [currencies, setCurrencies] = useState<any[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState(""); // Use state for AccountTypeDropdown
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState("");
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       try {
//         const fetchedCurrencies = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         setFormError("Failed to load currencies.");
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   // Separate currencies into available and coming soon arrays directly and then filter them
//   const availableCurrenciesBase = useMemo(() => {
//     return currencies.filter((currency) =>
//       ["INR", "CAD"].includes(currency.code)
//     );
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo(() => {
//     return currencies.filter(
//       (currency) =>
//         !["INR"].includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   // Use useMemo to filter available currencies based on searchCurrency
//   const filteredAvailableCurrencies = useMemo(() => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   // Use useMemo to filter coming soon currencies based on searchCurrency
//   const filteredComingSoonCurrencies = useMemo(() => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);

//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   // Generic step back handler
//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1); // Decrement step to go back to the previous step
//     } else {
//       router.back(); // If already on step 1 or no steps, go back in history
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");

//     let isValid = true;
//     if (!accountHolderName) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }
//     if (!ifscCode) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     }
//     if (!accountNumber) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     if (!bankName) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }
//     if (!address) {
//       setAddressError("Address is required");
//       isValid = false;
//     }
//     if (!accountType) {
//       setAccountTypeError("Account type is required");
//       isValid = false;
//     }

//     if (!isValid) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email,
//         accountHolderName,
//         ifscCode,
//         accountNumber,
//         bankName,
//         address,
//         accountType,
//       };
//       const newRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );
//       router.push(`/dashboard/recipients/${newRecipient._id}`);
//     } catch (error: any) {
//       if (
//         error.response &&
//         error.response.status === 400 &&
//         error.response.data.errors
//       ) {
//         const backendErrors = error.response.data.errors;
//         setAccountHolderNameError(backendErrors.accountHolderName || "");
//         setIfscCodeError(backendErrors.ifscCode || "");
//         setAccountNumberError(backendErrors.accountNumber || "");
//         setBankNameError(backendErrors.bankName || "");
//         setAddressError(backendErrors.address || "");
//         setAccountTypeError(backendErrors.accountType || "");
//         setFormError("");
//       } else {
//         setFormError(
//           error.message || "Failed to add recipient. Please try again."
//         );
//         console.error("Error adding recipient:", error);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");
//   };

//   return (
//     <div className="AddRecipientPage pt-6">
//       <DashboardHeader
//         title="Recipients"
//         onBack={handleBackStep} // Pass handleBackStep as onBack
//       />
//       <div className="">
//         {step === 1 && (
//           <div key="currency-step" className=" bg-white p-6 md:p-8 relative">
//             <h2 className="text-2xl font-semibold text-main text-center mb-6">
//               Select their currency
//             </h2>

//             <div className="relative mb-6">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-14 pr-10 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
//                 placeholder="Search currency..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-main focus:outline-none"
//                 >
//                   <MdCancel size={24} aria-hidden="true" />
//                 </button>
//               )}
//             </div>

//             <div className="space-y-3">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                 </>
//               ) : (
//                 <>
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div className="mb-6">
//                       <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency.code}
//                             className={`hover:bg-lightgray p-4 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out`}
//                             onClick={() => handleCurrencySelect(currency.code)}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-semibold text-main">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-sm text-gray-600">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <IoArrowForward className="text-gray-500" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {filteredComingSoonCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency.code}
//                             className={`hover:bg-lightgray p-4 rounded-xl cursor-no-drop transition-colors duration-200 ease-in-out opacity-50`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-semibold text-main">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-sm text-gray-600">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <span className="text-gray-500">Coming soon</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 &&
//                     searchCurrency.trim() !== "" && (
//                       <div className="text-center text-gray-500 mt-6">
//                         No currencies found for "{searchCurrency}".
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div key="account-step" className=" bg-white p-6 md:p-8">
//             <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//               Enter their account details
//             </h2>

//             {formError && (
//               <div
//                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                 role="alert"
//               >
//                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                   <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray block max-w-60">{formError}</span>
//                 </div>

//                 <button
//                   className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                   onClick={handleCloseFormError}
//                 >
//                   <IoCloseIcon
//                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                     role="button"
//                   />
//                 </button>
//               </div>
//             )}

//             <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray text-sm block capitalize font-medium mb-1"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color`}
//                   value={email}
//                   placeholder="example@example.ex"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-3">
//                 Recipient's bank details
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Recipient's bank details
//                     <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       accountHolderNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountHolderName}
//                     placeholder="Full name of the account holder"
//                     onChange={(e) => setAccountHolderName(e.target.value)}
//                   />
//                   {accountHolderNameError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     IFSC code <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       ifscCodeError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={ifscCode}
//                     placeholder="YESB0236041"
//                     onChange={(e) => setIfscCode(e.target.value)}
//                   />
//                   {ifscCodeError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Account number <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountNumber"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       accountNumberError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountNumber}
//                     placeholder="678911234567891"
//                     onChange={(e) => setAccountNumber(e.target.value)}
//                   />
//                   {accountNumberError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type */}
//                 <div>
//                   <label
//                     htmlFor="accountType"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Account type <span className="text-error">*</span>
//                   </label>
//                   <AccountTypeDropdown
//                     value={accountType}
//                     onChange={setAccountType}
//                     error={accountTypeError}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="bankName"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Bank name <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       bankNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={bankName}
//                     placeholder="Bank of Baroda"
//                     onChange={(e) => setBankName(e.target.value)}
//                   />
//                   {bankNameError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="text-gray text-sm block capitalize font-medium mb-1"
//                   >
//                     Bank Branch Address <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className={`mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 ${
//                       addressError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={address}
//                     placeholder="216A High Street North, London, E6 2JA, GB"
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                   {addressError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-4 mt-8">
//                 <button
//                   type="button"
//                   className={`rounded-full sm:order-1 order-2 text-gray-600 text-lg md:w-64 w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors border border-gray-300 hover:bg-gray-100`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   className={`rounded-full sm:order-2 order-1 text-green text-lg md:w-64 w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                         ${
//                                           isSubmitting
//                                             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                             : "bg-primary hover:bg-primary-hover text-secondary"
//                                         }
//                                     `}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
//                         className="h-5 text-green w-5 animate-spin mr-3"
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
//                       Confirming...
//                     </div>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// // pages/dashboard/recipients/add/index.tsx -> renamed to frontend/src/app/dashboard/recipients/addrecipient/page.tsx
// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// // Import useSearchParams
// import { useRouter, useSearchParams } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import currencyService from '../../../services/currency';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';
// import AccountTypeDropdown from '@/app/components/ui/AccountTypeDropdown';

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();
//   // Get search params
//   const searchParams = useSearchParams();

//   const [step, setStep] = useState(1);
//   const [currencies, setCurrencies] = useState<any[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState("");
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");

//   // --- Existing useEffect, useMemo hooks, handlers (handleCurrencySelect, handleBackStep, etc.) remain the same ---
//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       try {
//         const fetchedCurrencies = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         setFormError("Failed to load currencies.");
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   // Separate currencies into available and coming soon arrays directly and then filter them
//   const availableCurrenciesBase = useMemo(() => {
//     return currencies.filter((currency) =>
//       ["INR"].includes(currency.code)
//     );
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo(() => {
//     return currencies.filter(
//       (currency) =>
//         !["INR"].includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   // Use useMemo to filter available currencies based on searchCurrency
//   const filteredAvailableCurrencies = useMemo(() => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   // Use useMemo to filter coming soon currencies based on searchCurrency
//   const filteredComingSoonCurrencies = useMemo(() => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);

//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   // Generic step back handler
//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1); // Decrement step to go back to the previous step
//     } else {
//       router.back(); // If already on step 1 or no steps, go back in history
//     }
//   };

//   // --- MODIFIED handleSubmit ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // --- Reset errors (keep this part) ---
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");

//     // --- Validation (keep this part) ---
//     let isValid = true;
//     if (!accountHolderName) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }
//     if (!ifscCode) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     }
//     if (!accountNumber) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     if (!bankName) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }
//     if (!address) {
//       setAddressError("Address is required");
//       isValid = false;
//     }
//     if (!accountType) {
//       setAccountTypeError("Account type is required");
//       isValid = false;
//     }

//     if (!isValid) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email,
//         accountHolderName,
//         ifscCode,
//         accountNumber,
//         bankName,
//         address,
//         accountType,
//       };
//       const newRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );

//       // <<<--- START: Conditional Redirect Logic --->>>
//       const returnToParam = searchParams.get('returnTo');

//       if (returnToParam) {
//         const decodedReturnUrl = decodeURIComponent(returnToParam);
//         // Try to extract balanceId from the URL like /dashboard/balances/BALANCE_ID/send/select-recipient
//         const match = decodedReturnUrl.match(/\/dashboard\/balances\/([^/]+)\/send\/select-recipient/);

//         if (match && match[1]) {
//           const balanceId = match[1];
//           // Redirect to the Amount page for the Send flow
//           const targetUrl = `/dashboard/balances/${balanceId}/send/amount?recipientId=${newRecipient._id}`;
//           console.log("Redirecting back to send flow:", targetUrl);
//           router.push(targetUrl);
//         } else {
//           // Fallback if URL parsing fails - go to recipient details (or list for safety)
//           console.warn("Could not parse balanceId from returnTo URL, redirecting to recipient details:", decodedReturnUrl);
//           router.push(`/dashboard/recipients/${newRecipient._id}`);
//         }
//       } else {
//         // Original flow (e.g., adding from main recipients page)
//         // Redirect to the Recipient Details page
//         console.log("Redirecting to recipient details page (standard flow)");
//         router.push(`/dashboard/recipients/${newRecipient._id}`);
//       }
//       // <<<--- END: Conditional Redirect Logic --->>>

//     } catch (error: any) {
//        // --- Error handling (keep this part) ---
//       if (
//         error.response &&
//         error.response.status === 400 &&
//         error.response.data.errors
//       ) {
//         const backendErrors = error.response.data.errors;
//         setAccountHolderNameError(backendErrors.accountHolderName || "");
//         setIfscCodeError(backendErrors.ifscCode || "");
//         setAccountNumberError(backendErrors.accountNumber || "");
//         setBankNameError(backendErrors.bankName || "");
//         setAddressError(backendErrors.address || "");
//         setAccountTypeError(backendErrors.accountType || "");
//         setFormError("");
//       } else {
//         setFormError(
//           error.message || "Failed to add recipient. Please try again."
//         );
//         console.error("Error adding recipient:", error);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Other handlers (handleCloseFormError, clearSearchTerm, handleClearForm) remain the same ---
//    const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");
//   };

//   // --- Return JSX (keep the structure, no changes needed here) ---
//   return (
//     <div className="AddRecipientPage pt-6">
//       <DashboardHeader
//         title="Recipients"
//         onBack={handleBackStep} // Pass handleBackStep as onBack
//       />
//       <div className="container mx-auto">
//         {step === 1 && (
//           // ... Currency selection UI ...
//           <div
//             key="currency-step"
//             className=" bg-white dark:bg-background relative"
//           >
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white text-center mb-6">
//               Select their currency
//             </h2>

//             <div className="relative mb-6">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                 placeholder="Search currency..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 >
//                   <MdCancel size={24} aria-hidden="true" />
//                 </button>
//               )}
//             </div>

//             <div className="space-y-3">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                 </>
//               ) : (
//                 <>
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div className="mb-6">
//                       <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency.code}
//                             className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer`}
//                             onClick={() => handleCurrencySelect(currency.code)}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <IoArrowForward className="h-5 w-5 text-neutral-900 dark:text-white" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {filteredComingSoonCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency.code}
//                             className={`hover:bg-lightgray dark:hover:bg-primarybox p-4 rounded-xl cursor-no-drop transition-colors duration-200 ease-in-out opacity-50`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <span className="text-gray-500 dark:text-gray-300">Coming soon</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 &&
//                     searchCurrency.trim() !== "" && (
//                       <div className="text-center text-gray-500 mt-6">
//                         No currencies found for "{searchCurrency}".
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           // ... Account details form UI ...
//           <div key="account-step" className=" bg-white dark:bg-background w-full lg:max-w-lg ">
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6">
//               Enter their account details
//             </h2>

//             {formError && (
//               <div
//                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6"
//                 role="alert"
//               >
//                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                   <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray block max-w-60">{formError}</span>
//                 </div>

//                 <button
//                   className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                   onClick={handleCloseFormError}
//                 >
//                   <IoCloseIcon
//                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                     role="button"
//                   />
//                 </button>
//               </div>
//             )}

//             <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white`}
//                   value={email}
//                   placeholder="example@example.ex"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Recipient's bank details
//               </h3>
//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Full name of the account holder {/* Adjusted label */}
//                     <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       accountHolderNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountHolderName}
//                     placeholder="e.g., John Doe" // Added placeholder
//                     onChange={(e) => setAccountHolderName(e.target.value)}
//                   />
//                   {accountHolderNameError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     IFSC code <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       ifscCodeError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={ifscCode}
//                     placeholder="e.g., YESB0236041" // Changed placeholder format
//                     onChange={(e) => setIfscCode(e.target.value)}
//                   />
//                   {ifscCodeError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Account number <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountNumber"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       accountNumberError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={accountNumber}
//                     placeholder="e.g., 678911234567891" // Changed placeholder format
//                     onChange={(e) => setAccountNumber(e.target.value)}
//                   />
//                   {accountNumberError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type */}
//                 <div>
//                   <label
//                     htmlFor="accountType"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Account type <span className="text-error">*</span>
//                   </label>
//                   <AccountTypeDropdown
//                     value={accountType}
//                     onChange={setAccountType}
//                     error={accountTypeError}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="bankName"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Bank name <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       bankNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={bankName}
//                     placeholder="e.g., Bank of Baroda" // Changed placeholder format
//                     onChange={(e) => setBankName(e.target.value)}
//                   />
//                   {bankNameError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Recipient Address (Street, City, Postcode, Country)
//                     {/* Adjusted label */}
//                     <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       addressError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     value={address}
//                     placeholder="e.g., 123 Main St, Anytown, 12345, USA" // Changed placeholder format
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                   {addressError && (
//                     <p className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-4 mt-8">
//                 <button
//                   type="button"
//                   className={`sm:order-1 order-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   className={`sm:order-2 order-1 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
//                         className="h-5 text-green w-5 animate-spin mr-3"
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
//                       Confirming...
//                     </div>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// // frontend/src/app/dashboard/recipients/addrecipient/page.tsx
// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// // Import useSearchParams
// import { useRouter, useSearchParams } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../contexts/AuthContext';
// import recipientService from '../../../services/recipient';
// import currencyService from '../../../services/currency';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// // Removed unused Link import
// // import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';
// import AccountTypeDropdown from '@/app/components/ui/AccountTypeDropdown';

// // Define an interface for the Currency object
// interface Currency {
//   _id: string; // Assuming there's an ID
//   code: string;
//   currencyName: string;
//   flagImage?: string; // Optional flag image
//   // Add other relevant properties if needed
// }

// // Define an interface for the expected API error structure
// interface ApiErrorData {
//   errors?: Record<string, string>; // e.g., { accountNumber: "Account number is required" }
//   message?: string; // General error message
// }

// interface ApiErrorResponse {
//   status: number;
//   data: ApiErrorData;
// }

// interface ApiError {
//   response?: ApiErrorResponse;
//   message?: string; // Fallback message if not an API error structure
// }

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();
//   // Get search params
//   const searchParams = useSearchParams();

//   const [step, setStep] = useState(1);
//   // Use the Currency interface for the state
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState("");
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       try {
//         // Assume currencyService.getAllCurrencies() returns Currency[]
//         const fetchedCurrencies: Currency[] = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         setFormError("Failed to load currencies.");
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   // Separate currencies into available and coming soon arrays directly and then filter them
//   const availableCurrenciesBase = useMemo((): Currency[] => {
//     return currencies.filter((currency) =>
//       ["INR"].includes(currency.code)
//     );
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo((): Currency[] => {
//     return currencies.filter(
//       (currency) =>
//         !["INR"].includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   // Use useMemo to filter available currencies based on searchCurrency
//   const filteredAvailableCurrencies = useMemo((): Currency[] => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   // Use useMemo to filter coming soon currencies based on searchCurrency
//   const filteredComingSoonCurrencies = useMemo((): Currency[] => {
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(searchTerm)) ||
//         (currency.code && currency.code.toLowerCase().includes(searchTerm))
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);

//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   // Generic step back handler
//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1); // Decrement step to go back to the previous step
//     } else {
//       router.back(); // If already on step 1 or no steps, go back in history
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // --- Reset errors ---
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");

//     // --- Validation ---
//     let isValid = true;
//     if (!accountHolderName) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }
//     if (!ifscCode) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     }
//     if (!accountNumber) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     if (!bankName) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }
//     if (!address) {
//       setAddressError("Address is required");
//       isValid = false;
//     }
//     if (!accountType) {
//       setAccountTypeError("Account type is required");
//       isValid = false;
//     }

//     if (!isValid) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email,
//         accountHolderName,
//         ifscCode,
//         accountNumber,
//         bankName,
//         address,
//         accountType,
//       };
//       // Assuming addRecipient returns the new recipient object with an _id
//       const newRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );

//       // <<<--- START: Conditional Redirect Logic --->>>
//       const returnToParam = searchParams.get('returnTo');

//       if (returnToParam) {
//         const decodedReturnUrl = decodeURIComponent(returnToParam);
//         // Try to extract balanceId from the URL like /dashboard/balances/BALANCE_ID/send/select-recipient
//         const match = decodedReturnUrl.match(/\/dashboard\/balances\/([^/]+)\/send\/select-recipient/);

//         if (match && match[1]) {
//           const balanceId = match[1];
//           // Redirect to the Amount page for the Send flow
//           const targetUrl = `/dashboard/balances/${balanceId}/send/amount?recipientId=${newRecipient._id}`;
//           console.log("Redirecting back to send flow:", targetUrl);
//           router.push(targetUrl);
//         } else {
//           // Fallback if URL parsing fails - go to recipient details (or list for safety)
//           console.warn("Could not parse balanceId from returnTo URL, redirecting to recipient details:", decodedReturnUrl);
//           router.push(`/dashboard/recipients/${newRecipient._id}`);
//         }
//       } else {
//         // Original flow (e.g., adding from main recipients page)
//         // Redirect to the Recipient Details page
//         console.log("Redirecting to recipient details page (standard flow)");
//         router.push(`/dashboard/recipients/${newRecipient._id}`);
//       }
//       // <<<--- END: Conditional Redirect Logic --->>>

//     } catch (error: unknown) { // Catch as unknown for better type safety
//       // --- Error handling ---
//        const apiError = error as ApiError; // Type assertion (use carefully, or use type guards)

//       if (
//         apiError.response &&
//         apiError.response.status === 400 &&
//         apiError.response.data.errors
//       ) {
//         const backendErrors = apiError.response.data.errors;
//         setAccountHolderNameError(backendErrors.accountHolderName || "");
//         setIfscCodeError(backendErrors.ifscCode || "");
//         setAccountNumberError(backendErrors.accountNumber || "");
//         setBankNameError(backendErrors.bankName || "");
//         setAddressError(backendErrors.address || "");
//         setAccountTypeError(backendErrors.accountType || "");
//         setFormError(""); // Clear general form error if specific field errors are set
//       } else {
//          // Try to get a message, checking both apiError structure and standard Error
//          const errorMessage = apiError.message || (error instanceof Error ? error.message : "An unknown error occurred");
//          setFormError(
//            errorMessage || "Failed to add recipient. Please try again."
//          );
//          console.error("Error adding recipient:", error); // Log the original error object
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");
//   };

//   return (
//     <div className="AddRecipientPage pt-6">
//       <DashboardHeader
//         title="Recipients"
//         onBack={handleBackStep} // Pass handleBackStep as onBack
//       />
//       <div className="container mx-auto">
//         {step === 1 && (
//           <div
//             key="currency-step"
//             className=" bg-white dark:bg-background relative"
//           >
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white text-center mb-6">
//               Select their currency
//             </h2>

//             <div className="relative mb-6">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                 placeholder="Search currency..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 >
//                   <MdCancel size={24} aria-hidden="true" />
//                 </button>
//               )}
//             </div>

//             <div className="space-y-3">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                   <Skeleton className="h-16 rounded-xl" />
//                 </>
//               ) : (
//                 <>
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div className="mb-6">
//                       <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency.code} // Assuming code is unique, otherwise use _id
//                             className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer`}
//                             onClick={() => handleCurrencySelect(currency.code)}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <IoArrowForward className="h-5 w-5 text-neutral-900 dark:text-white" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {filteredComingSoonCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency.code} // Assuming code is unique, otherwise use _id
//                             className={`hover:bg-lightgray dark:hover:bg-primarybox p-4 rounded-xl cursor-no-drop transition-colors duration-200 ease-in-out opacity-50`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                 {currency.flagImage && (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={44}
//                                     height={44}
//                                     alt={`${currency.currencyName} Flag`}
//                                   />
//                                 )}
//                                 <div>
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                                     {currency.code}
//                                   </h4>
//                                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                                     {currency.currencyName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <span className="text-gray-500 dark:text-gray-300">Coming soon</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 &&
//                     searchCurrency.trim() !== "" && (
//                       <div className="text-center text-gray-500 mt-6">
//                         {/* Escaped double quotes */}
//                         No currencies found for &quot;{searchCurrency}&quot;.
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div key="account-step" className=" bg-white dark:bg-background w-full lg:max-w-lg ">
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6">
//               Enter their account details
//             </h2>

//             {formError && (
//               <div
//                 className="flex bg-red-100 dark:bg-red-900/30 border border-error text-error dark:text-red-300 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-6" // Adjusted background and border for error
//                 role="alert"
//               >
//                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12 size-10 flex-shrink-0"> {/* Added flex-shrink-0 */}
//                   <IoMdCloseCircle className="p-0.5 text-white size-8" />
//                 </div>

//                 <div className="flex-grow"> {/* Added flex-grow */}
//                   <span className="block">{formError}</span> {/* Removed max-w */}
//                 </div>

//                 <button
//                   className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4 text-error dark:text-red-300" // Adjusted button positioning and color
//                   onClick={handleCloseFormError}
//                 >
//                   <IoCloseIcon
//                     className="p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800/50 size-8" // Adjusted hover and size
//                     role="button"
//                   />
//                 </button>
//               </div>
//             )}

//             <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white`}
//                   value={email}
//                   placeholder="example@example.ex"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 {/* Escaped apostrophe */}
//                 Recipient&apos;s bank details
//               </h3>
//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Full name of the account holder {/* Adjusted label */}
//                     <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       accountHolderNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] dark:border-neutral-600 hover:shadow-color" // Ensure dark mode border is set
//                     }`}
//                     value={accountHolderName}
//                     placeholder="e.g., John Doe" // Added placeholder
//                     onChange={(e) => setAccountHolderName(e.target.value)}
//                     aria-invalid={!!accountHolderNameError} // Add accessibility attribute
//                     aria-describedby={accountHolderNameError ? "accountHolderName-error" : undefined}
//                   />
//                   {accountHolderNameError && (
//                     <p id="accountHolderName-error" className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     IFSC code <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                      className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       ifscCodeError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] dark:border-neutral-600 hover:shadow-color" // Ensure dark mode border is set
//                     }`}
//                     value={ifscCode}
//                     placeholder="e.g., YESB0236041" // Changed placeholder format
//                     onChange={(e) => setIfscCode(e.target.value)}
//                     aria-invalid={!!ifscCodeError}
//                     aria-describedby={ifscCodeError ? "ifscCode-error" : undefined}
//                   />
//                   {ifscCodeError && (
//                     <p id="ifscCode-error" className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Account number <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountNumber"
//                      className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       accountNumberError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] dark:border-neutral-600 hover:shadow-color" // Ensure dark mode border is set
//                     }`}
//                     value={accountNumber}
//                     placeholder="e.g., 678911234567891" // Changed placeholder format
//                     onChange={(e) => setAccountNumber(e.target.value)}
//                     aria-invalid={!!accountNumberError}
//                      aria-describedby={accountNumberError ? "accountNumber-error" : undefined}
//                   />
//                   {accountNumberError && (
//                     <p id="accountNumber-error" className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type */}
//                 <div>
//                   <label
//                     htmlFor="accountType" // Ensure this matches the dropdown's id if it has one
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Account type <span className="text-error">*</span>
//                   </label>
//                   <AccountTypeDropdown
//                     value={accountType}
//                     onChange={setAccountType}
//                     error={accountTypeError}
//                     // Pass aria-invalid and aria-describedby if AccountTypeDropdown supports them
//                     // aria-invalid={!!accountTypeError}
//                     // aria-describedby={accountTypeError ? "accountType-error" : undefined}
//                   />
//                    {/* Error message moved out of dropdown component if needed */}
//                    {accountTypeError && (
//                     <p id="accountType-error" className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {accountTypeError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="bankName"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Bank name <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                      className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       bankNameError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] dark:border-neutral-600 hover:shadow-color" // Ensure dark mode border is set
//                     }`}
//                     value={bankName}
//                     placeholder="e.g., Bank of Baroda" // Changed placeholder format
//                     onChange={(e) => setBankName(e.target.value)}
//                      aria-invalid={!!bankNameError}
//                      aria-describedby={bankNameError ? "bankName-error" : undefined}
//                   />
//                   {bankNameError && (
//                     <p id="bankName-error" className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                   >
//                     Recipient Address (Street, City, Postcode, Country)
//                     {/* Adjusted label */}
//                     <span className="text-error">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className={`autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white ${
//                       addressError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] dark:border-neutral-600 hover:shadow-color" // Ensure dark mode border is set
//                     }`}
//                     value={address}
//                     placeholder="e.g., 123 Main St, Anytown, 12345, USA" // Changed placeholder format
//                     onChange={(e) => setAddress(e.target.value)}
//                      aria-invalid={!!addressError}
//                      aria-describedby={addressError ? "address-error" : undefined}
//                   />
//                   {addressError && (
//                     <p id="address-error" className="flex text-error text-sm items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-4" />
//                       </span>
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-4 mt-8">
//                 <button
//                   type="button"
//                   className={`sm:order-1 order-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   className={`sm:order-2 order-1 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed`} // Added disabled styles
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
//                         className="h-5 text-neutral-900 w-5 animate-spin mr-3" // Adjusted spinner color
//                         viewBox="0 0 24 24"
//                         fill="none" // Use fill none for better stroke visibility
//                         stroke="currentColor"
//                         strokeWidth="4"
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
//                       Confirming...
//                     </div>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// // frontend/src/app/dashboard/recipients/addrecipient/page.tsx
// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import { useAuth } from '../../../contexts/AuthContext';
// import recipientService from '../../../services/recipient';
// import currencyService, { Currency } from '../../../services/currency';
// import { IoMdCloseCircle } from 'react-icons/io';
// import Image from 'next/image';
// import { IoArrowForward, IoClose as IoCloseIcon } from 'react-icons/io5';
// import { Skeleton } from '@/components/ui/skeleton';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';
// // Correctly import the AccountTypeDropdown component
// import AccountTypeDropdown from '../../../components/ui/AccountTypeDropdown'; // Adjusted path assuming it's in frontend/src/app/components/ui

// // Define an interface for the expected API error structure from recipientService
// interface ApiErrorData {
//   errors?: Record<string, string>;
//   message?: string;
// }

// interface ApiErrorResponse {
//   status: number;
//   data: ApiErrorData;
// }

// interface ApiError {
//   response?: ApiErrorResponse;
//   message?: string;
// }

// // Define a type for the expected response from addRecipient
// interface NewRecipient {
//     _id: string;
// }

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();
//   const searchParams = useSearchParams();

//   const [step, setStep] = useState(1);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState(""); // This holds the error string
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       setFormError("");
//       try {
//         const fetchedCurrencies = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         const errorMessage = error instanceof Error ? error.message : "Failed to load currencies.";
//         setFormError(errorMessage);
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   // useMemo hooks remain the same
//   const availableCurrenciesBase = useMemo((): Currency[] => {
//     return currencies.filter((currency) =>
//       ["INR"].includes(currency.code)
//     );
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo((): Currency[] => {
//     const availableCodes = ["INR"];
//     return currencies.filter(
//       (currency) =>
//         !availableCodes.includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   const filteredAvailableCurrencies = useMemo((): Currency[] => {
//     if (!searchCurrency) return availableCurrenciesBase;
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         currency.currencyName?.toLowerCase().includes(searchTerm) ||
//         currency.code?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   const filteredComingSoonCurrencies = useMemo((): Currency[] => {
//     if (!searchCurrency) return comingSoonCurrenciesBase;
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         currency.currencyName?.toLowerCase().includes(searchTerm) ||
//         currency.code?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);

//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     } else {
//       router.back();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError(""); // Reset account type error

//     let isValid = true;
//     if (!accountHolderName.trim()) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }
//     if (!ifscCode.trim()) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     }
//     if (!accountNumber.trim()) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     // Add specific validation for account number format if needed
//     if (!bankName.trim()) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }
//     if (!address.trim()) {
//       setAddressError("Address is required");
//       isValid = false;
//     }
//     if (!accountType) { // Check if accountType string is empty
//       setAccountTypeError("Account type is required"); // Set the error message string
//       isValid = false;
//     }

//     if (!isValid) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email: email.trim() || undefined,
//         accountHolderName: accountHolderName.trim(),
//         ifscCode: ifscCode.trim().toUpperCase(), // Often IFSC is uppercase
//         accountNumber: accountNumber.trim(),
//         bankName: bankName.trim(),
//         address: address.trim(),
//         accountType,
//       };

//       const newRecipient: NewRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );

//       const returnToParam = searchParams.get('returnTo');
//       if (returnToParam) {
//         const decodedReturnUrl = decodeURIComponent(returnToParam);
//         const match = decodedReturnUrl.match(/\/dashboard\/balances\/([^/]+)\/send\/select-recipient/);

//         if (match?.[1] && newRecipient?._id) {
//           const balanceId = match[1];
//           const targetUrl = `/dashboard/balances/${balanceId}/send/amount?recipientId=${newRecipient._id}`;
//           console.log("Redirecting back to send flow:", targetUrl);
//           router.push(targetUrl);
//         } else {
//           console.warn("Could not parse balanceId from returnTo URL or missing recipient ID, redirecting to recipient details:", decodedReturnUrl, newRecipient?._id);
//           router.push(newRecipient?._id ? `/dashboard/recipients/${newRecipient._id}` : '/dashboard/recipients');
//         }
//       } else if (newRecipient?._id) {
//         console.log("Redirecting to recipient details page (standard flow)");
//         router.push(`/dashboard/recipients/${newRecipient._id}`);
//       } else {
//          console.warn("Recipient added, but no ID received or standard flow error. Redirecting to recipient list.");
//          setFormError("Recipient added, but failed to redirect. Please check the recipients list.");
//          router.push('/dashboard/recipients');
//       }

//     } catch (error: unknown) {
//       console.error("Error adding recipient:", error);
//       const apiError = error as ApiError;

//       if (
//         apiError.response?.data &&
//         apiError.response.status === 400
//       ) {
//         const backendErrors = apiError.response.data.errors;
//         if (backendErrors && typeof backendErrors === 'object') {
//             setAccountHolderNameError(backendErrors.accountHolderName || "");
//             setIfscCodeError(backendErrors.ifscCode || "");
//             setAccountNumberError(backendErrors.accountNumber || "");
//             setBankNameError(backendErrors.bankName || "");
//             setAddressError(backendErrors.address || "");
//             setAccountTypeError(backendErrors.accountType || ""); // Set string error from backend
//         }

//         if (apiError.response.data.message) {
//             setFormError(apiError.response.data.message);
//         } else if (!backendErrors || Object.keys(backendErrors).length === 0) {
//             setFormError("Invalid data submitted. Please check the fields.");
//         }

//       } else {
//          const errorMessage = apiError?.response?.data?.message
//                             || apiError?.message
//                             || (error instanceof Error ? error.message : "An unknown error occurred");
//          setFormError(
//            errorMessage || "Failed to add recipient. Please try again."
//          );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError(""); // Clear account type error string
//   };

//   // --- JSX Section ---
//   return (
//     <div className="AddRecipientPage pt-6 pb-12"> {/* Added pb */}
//       <DashboardHeader
//         title="Recipients"
//         onBack={handleBackStep}
//       />
//       <div className=""> {/* Added horizontal padding */}
//         {step === 1 && (
//           <div
//             key="currency-step"
//             className="bg-white dark:bg-background relative" // Centered content
//           >
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white text-center mb-6">
//               Select their currency
//             </h2>

//             {/* Currency Search Input */}
//             <div className="relative mb-6">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-none placeholder:text-neutral-600 dark:placeholder:text-white bg-white dark:bg-background" // Updated styles
//                 placeholder="Search currency by name or code..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   type="button"
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary focus:outline-none cursor-pointer" // Adjusted colors
//                   aria-label="Clear search"
//                 >
//                   <MdCancel size={20} aria-hidden="true" /> {/* Adjusted size */}
//                 </button>
//               )}
//             </div>

//              {/* General Form Error Display for Currency Step */}
//             {formError && !isLoadingCurrencies && ( // Show only if not loading and error exists
//               <div
//                 className="flex bg-red-100 dark:bg-red-900/30 border border-error text-error dark:text-red-300 p-4 rounded-2xl gap-3 items-start relative mb-6"
//                 role="alert"
//               >
//                  <div className="flex-shrink-0 mt-0.5">
//                    <IoMdCloseCircle className="text-error size-5" />
//                 </div>
//                 <div className="flex-grow">
//                   <span className="block text-sm font-medium">{formError}</span>
//                 </div>
//                 <button
//                   type="button"
//                   className="absolute cursor-pointer right-2 top-2 text-error dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full p-1"
//                    onClick={handleCloseFormError}
//                    aria-label="Close error message"
//                 >
//                   <IoCloseIcon className="size-5" />
//                 </button>
//               </div>
//             )}

//             {/* Currency List Section */}
//             <div className="space-y-6">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                 </>
//               ) : (
//                 <>
//                   {/* Available Currencies */}
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency._id || currency.code}
//                             role="button"
//                             tabIndex={0}
//                             className={`block hover:bg-lightgray dark:hover:bg-primarybox p-3 sm:p-4 rounded-xl transition-all duration-100 ease-linear cursor-pointer focus:outline-none`} // Adjusted padding/rounding/duration
//                             onClick={() => handleCurrencySelect(currency.code)}
//                             onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleCurrencySelect(currency.code) : null}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-3 sm:gap-4"> {/* Adjusted gap */}
//                                 {currency.flagImage ? (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={40} // Slightly smaller image
//                                     height={40}
//                                     alt={`${currency.currencyName} Flag`}
//                                     className="rounded-full object-cover flex-shrink-0" // Added flex-shrink-0
//                                   />
//                                 ) : (
//                                   <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium flex-shrink-0">
//                                     {currency.code}
//                                   </div>
//                                 )}
//                                 <div className="flex-grow"> {/* Allow text to take space */}
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate"> {/* Added truncate */}
//                                     {currency.code} - {currency.currencyName} {/* Combine code and name */}
//                                   </h4>
//                                   {/* Optional: Remove subtext or use it for something else */}
//                                   {/* <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                                     {currency.currencyName}
//                                   </p> */}
//                                 </div>
//                               </div>
//                               <IoArrowForward className="h-5 w-5 text-neutral-600 dark:text-neutral-400 flex-shrink-0 ml-2" /> {/* Adjusted color */}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Coming Soon Currencies */}
//                   {filteredComingSoonCurrencies.length > 0 && (
//                      <div>
//                       <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"> {/* Dimmed title */}
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency._id || currency.code}
//                             className={`p-3 sm:p-4 rounded-xl cursor-not-allowed opacity-60 border border-transparent dark:border-transparent`} // Removed hover, added border for structure if needed
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-3 sm:gap-4">
//                                 {currency.flagImage ? (
//                                   <Image
//                                     src={currency.flagImage}
//                                      width={40}
//                                     height={40}
//                                     alt={`${currency.currencyName} Flag`}
//                                     className="rounded-full object-cover flex-shrink-0"
//                                   />
//                                 ) : (
//                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium flex-shrink-0">
//                                     {currency.code}
//                                   </div>
//                                 )}
//                                 <div className="flex-grow">
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                                      {currency.code} - {currency.currencyName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0 ml-2">Coming soon</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* No Results Message */}
//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 && (
//                       <div className="text-center text-gray-500 dark:text-gray-400 mt-8 py-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
//                         {searchCurrency.trim() !== ""
//                           ? `No currencies found for "${searchCurrency}".`
//                           : "No currencies available at the moment." // More specific message
//                         }
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Step 2: Account Details Form */}
//         {step === 2 && (
//           <div key="account-step" className="bg-white dark:bg-background w-full lg:max-w-lg">
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6 text-center sm:text-left">
//               Enter their account details
//             </h2>

//             {/* General Form Error Display */}
//             {formError && (
//               <div
//                 className="flex bg-red-100 dark:bg-red-900/30 border border-error text-error dark:text-red-300 p-4 rounded-2xl gap-3 items-start relative mb-6"
//                 role="alert"
//               >
//                 <div className="flex-shrink-0 mt-0.5">
//                    <IoMdCloseCircle className="text-error size-5" />
//                 </div>
//                 <div className="flex-grow">
//                   <span className="block text-sm font-medium">{formError}</span>
//                 </div>
//                 <button
//                   type="button"
//                   className="absolute cursor-pointer right-2 top-2 text-error dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full p-1"
//                    onClick={handleCloseFormError}
//                    aria-label="Close error message"
//                 >
//                   <IoCloseIcon className="size-5" />
//                 </button>
//               </div>
//             )}

//             {/* Recipient Form */}
//             <form className="mt-2 space-y-5" onSubmit={handleSubmit}>
//               {/* Email Input */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor`}
//                   value={email}
//                   placeholder="example@domain.com"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white pt-2 pb-1 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Recipient's bank details
//               </h3>

//               {/* Bank Details Section */}
//               <div className="space-y-5">
//                 {/* Account Holder Name */}
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Full name of the account holder
//                     <span className="text-error ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       accountHolderNameError
//                         ? "border-error border-2 !shadow-none focus:!ring-error"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={accountHolderName}
//                     placeholder="e.g., John Doe"
//                     onChange={(e) => { setAccountHolderName(e.target.value); setAccountHolderNameError(""); }}
//                     required
//                     aria-invalid={!!accountHolderNameError}
//                     aria-describedby={accountHolderNameError ? "accountHolderName-error" : undefined}
//                   />
//                   {/* Error message handled inside the input field styling and potentially by the browser */}
//                   {/* Optional: Display inline error if preferred over border */}
//                    {accountHolderNameError && (
//                     <p id="accountHolderName-error" className="flex text-error text-xs items-center mt-1">
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 {/* IFSC Code */}
//                  <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     IFSC code <span className="text-error ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                      className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       ifscCodeError
//                         ? "border-error border-2 !shadow-none focus:!ring-error"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={ifscCode}
//                     placeholder="e.g., YESB0123456"
//                     onChange={(e) => { setIfscCode(e.target.value.toUpperCase()); setIfscCodeError(""); }}
//                     required
//                     aria-invalid={!!ifscCodeError}
//                     aria-describedby={ifscCodeError ? "ifscCode-error" : undefined}
//                     maxLength={11} // Standard IFSC length
//                     minLength={11} // Standard IFSC length
//                   />
//                   {ifscCodeError && (
//                     <p id="ifscCode-error" className="flex text-error text-xs items-center mt-1">
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Number */}
//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Account number <span className="text-error ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     id="accountNumber"
//                      className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       accountNumberError
//                         ? "border-error border-2 !shadow-none focus:!ring-error"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={accountNumber}
//                     placeholder="Enter account number"
//                     onChange={(e) => { setAccountNumber(e.target.value.replace(/\D/g, '')); setAccountNumberError(""); }}
//                     required
//                     aria-invalid={!!accountNumberError}
//                      aria-describedby={accountNumberError ? "accountNumber-error" : undefined}
//                   />
//                   {accountNumberError && (
//                     <p id="accountNumber-error" className="flex text-error text-xs items-center mt-1">
//                        <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type Dropdown */}
//                 <div>
//                   <label
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Account type <span className="text-error ml-1">*</span>
//                   </label>
//                   <AccountTypeDropdown
//                     value={accountType}
//                     onChange={(value) => { setAccountType(value); setAccountTypeError(""); }}
//                     // --- MODIFIED: Pass the error string ---
//                     error={accountTypeError} // Pass the actual error string or empty string
//                     // --- END MODIFIED ---
//                   />

//                 </div>

//                 {/* Bank Name */}
//                  <div>
//                   <label
//                     htmlFor="bankName"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Bank name <span className="text-error ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                      className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       bankNameError
//                         ? "border-error border-2 !shadow-none focus:!ring-error"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={bankName}
//                     placeholder="e.g., State Bank of India"
//                     onChange={(e) => { setBankName(e.target.value); setBankNameError(""); }}
//                     required
//                      aria-invalid={!!bankNameError}
//                      aria-describedby={bankNameError ? "bankName-error" : undefined}
//                   />
//                   {bankNameError && (
//                     <p id="bankName-error" className="flex text-error text-xs items-center mt-1">
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Recipient Address */}
//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Recipient Address (Street, City, Postcode, Country)
//                     <span className="text-error ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       addressError
//                         ? "border-error border-2 !shadow-none focus:!ring-error"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={address}
//                     placeholder="e.g., 123 Main St, Anytown, 12345, India"
//                     onChange={(e) => { setAddress(e.target.value); setAddressError(""); }}
//                     required
//                      aria-invalid={!!addressError}
//                      aria-describedby={addressError ? "address-error" : undefined}
//                   />
//                   {addressError && (
//                     <p id="address-error" className="flex text-error text-xs items-center mt-1">
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Form Action Buttons */}
//               <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-4 pt-4">
//                 <button
//                   type="button"
//                   className={`sm:order-1 order-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-200 ease-linear`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   className={`sm:order-2 order-1 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
//                   disabled={isSubmitting || !selectedCurrencyCode}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                            <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                            <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                         </svg>
//                       <span>Confirming...</span>
//                     </>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// // frontend/src/app/dashboard/recipients/addrecipient/page.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import DashboardHeader from "../../../components/layout/DashboardHeader";
// import { useAuth } from "../../../contexts/AuthContext";
// import recipientService from "../../../services/recipient";
// import currencyService, { Currency } from "../../../services/currency";
// import { IoMdCloseCircle } from "react-icons/io";
// import Image from "next/image";
// import { IoArrowForward, IoClose as IoCloseIcon } from "react-icons/io5";
// import { Skeleton } from "@/components/ui/skeleton";
// import { FiSearch } from "react-icons/fi"; // Kept FiSearch as it was in original
// import { MdCancel } from "react-icons/md";
// // Correctly import the AccountTypeDropdown component
// import AccountTypeDropdown from "../../../components/ui/AccountTypeDropdown"; // Adjusted path assuming it's in frontend/src/app/components/ui

// // Define an interface for the expected API error structure from recipientService
// interface ApiErrorData {
//   errors?: Record<string, string>;
//   message?: string;
// }

// interface ApiErrorResponse {
//   status: number;
//   data: ApiErrorData;
// }

// interface ApiError {
//   response?: ApiErrorResponse;
//   message?: string;
// }

// // Define a type for the expected response from addRecipient
// interface NewRecipient {
//   _id: string;
// }

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();
//   const searchParams = useSearchParams();

//   const [step, setStep] = useState(1);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState(""); // This holds the error string
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       setFormError("");
//       try {
//         const fetchedCurrencies = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         const errorMessage =
//           error instanceof Error ? error.message : "Failed to load currencies.";
//         setFormError(errorMessage);
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   // Memoized currency lists (Unchanged)
//   const availableCurrenciesBase = useMemo((): Currency[] => {
//     return currencies.filter((currency) => ["INR"].includes(currency.code));
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo((): Currency[] => {
//     const availableCodes = ["INR"];
//     return currencies.filter(
//       (currency) =>
//         !availableCodes.includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   const filteredAvailableCurrencies = useMemo((): Currency[] => {
//     if (!searchCurrency) return availableCurrenciesBase;
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         currency.currencyName?.toLowerCase().includes(searchTerm) ||
//         currency.code?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   const filteredComingSoonCurrencies = useMemo((): Currency[] => {
//     if (!searchCurrency) return comingSoonCurrenciesBase;
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         currency.currencyName?.toLowerCase().includes(searchTerm) ||
//         currency.code?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);

//   // --- useMemo hook to determine if the form is invalid (Kept) ---
//   const isFormInvalid = useMemo(() => {
//     // Return true if any REQUIRED field is empty (or just whitespace)
//     return (
//       !accountHolderName.trim() ||
//       !ifscCode.trim() ||
//       !accountNumber.trim() ||
//       !accountType || // Check if the string is empty (not selected)
//       !bankName.trim() ||
//       !address.trim()
//     );
//   }, [
//     accountHolderName,
//     ifscCode,
//     accountNumber,
//     accountType,
//     bankName,
//     address,
//   ]);
//   // --- END ---

//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     } else {
//       router.back();
//     }
//   };

//   // Manual validation function (Kept, but simplified error setting)
//   const validateForm = (): boolean => {
//     let isValid = true;
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");

//     if (!accountHolderName.trim()) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }
//     if (!ifscCode.trim()) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     }
//     // Add specific validation for IFSC format if needed (e.g., length)
//     // else if (ifscCode.trim().length !== 11) {
//     //   setIfscCodeError("IFSC code must be 11 characters");
//     //   isValid = false;
//     // }
//     if (!accountNumber.trim()) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     // Add specific validation for account number format if needed here
//     if (!bankName.trim()) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }
//     if (!address.trim()) {
//       setAddressError("Address is required");
//       isValid = false;
//     }
//     if (!accountType) {
//       // Check if accountType string is empty
//       setAccountTypeError("Account type is required");
//       isValid = false;
//     }
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(""); // Reset general form error

//     // Perform validation
//     const isValid = validateForm();

//     if (!isValid) {
//       // Optional: Maybe set a general error, or rely on individual field errors.
//       // setFormError("Please correct the errors below.");
//       return; // Stop submission if validation fails
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email: email.trim() || undefined, // Send undefined if empty
//         accountHolderName: accountHolderName.trim(),
//         ifscCode: ifscCode.trim().toUpperCase(),
//         accountNumber: accountNumber.trim(),
//         bankName: bankName.trim(),
//         address: address.trim(),
//         accountType,
//       };

//       const newRecipient: NewRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );

//       // --- Redirection Logic (Unchanged) ---
//       const returnToParam = searchParams.get("returnTo");
//       if (returnToParam) {
//         const decodedReturnUrl = decodeURIComponent(returnToParam);
//         const match = decodedReturnUrl.match(
//           /\/dashboard\/balances\/([^/]+)\/send\/select-recipient/
//         );

//         if (match?.[1] && newRecipient?._id) {
//           const balanceId = match[1];
//           const targetUrl = `/dashboard/balances/${balanceId}/send/amount?recipientId=${newRecipient._id}`;
//           console.log("Redirecting back to send flow:", targetUrl);
//           router.push(targetUrl);
//         } else {
//           console.warn(
//             "Could not parse balanceId from returnTo URL or missing recipient ID, redirecting to recipient details:",
//             decodedReturnUrl,
//             newRecipient?._id
//           );
//           router.push(
//             newRecipient?._id
//               ? `/dashboard/recipients/${newRecipient._id}`
//               : "/dashboard/recipients"
//           );
//         }
//       } else if (newRecipient?._id) {
//         console.log("Redirecting to recipient details page (standard flow)");
//         router.push(`/dashboard/recipients/${newRecipient._id}`);
//       } else {
//         console.warn(
//           "Recipient added, but no ID received or standard flow error. Redirecting to recipient list."
//         );
//         setFormError(
//           "Recipient added, but failed to redirect. Please check the recipients list."
//         );
//         router.push("/dashboard/recipients");
//       }
//       // --- End Redirection Logic ---
//     } catch (error: unknown) {
//       console.error("Error adding recipient:", error);
//       const apiError = error as ApiError;

//       // Handle Backend Validation Errors (400 Bad Request) (Unchanged)
//       if (apiError.response?.data && apiError.response.status === 400) {
//         const backendErrors = apiError.response.data.errors;
//         if (backendErrors && typeof backendErrors === "object") {
//           setAccountHolderNameError(backendErrors.accountHolderName || "");
//           setIfscCodeError(backendErrors.ifscCode || "");
//           setAccountNumberError(backendErrors.accountNumber || "");
//           setBankNameError(backendErrors.bankName || "");
//           setAddressError(backendErrors.address || "");
//           setAccountTypeError(backendErrors.accountType || "");
//         }

//         if (apiError.response.data.message) {
//           setFormError(apiError.response.data.message);
//         } else if (!backendErrors || Object.keys(backendErrors).length === 0) {
//           setFormError("Invalid data submitted. Please check the fields.");
//         }
//       } else {
//         // Handle other types of errors (Unchanged)
//         const errorMessage =
//           apiError?.response?.data?.message ||
//           apiError?.message ||
//           (error instanceof Error
//             ? error.message
//             : "An unknown error occurred");
//         setFormError(
//           errorMessage || "Failed to add recipient. Please try again."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");
//   };

//   // --- JSX Section ---
//   return (
//     // Original container classes
//     <div className="AddRecipientPage py-5">
//       <DashboardHeader title="Recipients" onBack={handleBackStep} />
//       {/* Removed extra padding div */}
//       <div className="Steps">
//         {/* Step 1: Currency Selection (Original UI) */}
//         {step === 1 && (
//           <div
//             key="currency-step"
//             // Original class structure
//             className="bg-white dark:bg-background relative"
//           >
//             <h2 className="lg:text-3xl md:text-2xl text-xl capitalize font-semibold text-mainheading dark:text-white text-left md:text-center mb-4">
//               Select their currency
//             </h2>

//             {/* Currency Search Input (Original UI) */}
//             <div className="relative mb-4">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch
//                   className="h-5 w-5 text-neutral-900 dark:text-white"
//                   aria-hidden="true"
//                 />
//               </div>
//               <input
//                 type="text"
//                 // Original classes
//                 className="w-full rounded-full h-14 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-none focus:border-[#5f5f5f] placeholder:text-neutral-600 dark:placeholder:text-white bg-white dark:bg-background"
//                 placeholder="Search currency by name or code..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   type="button"
//                   onClick={clearSearchTerm}
//                   // Original classes
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                   aria-label="Clear search"
//                 >
//                   <MdCancel size={28} aria-hidden="true" />
//                 </button>
//               )}
//             </div>

//             {/* General Form Error Display for Currency Step (Original UI) */}
//             {formError && !isLoadingCurrencies && (
//               <div
//                 // Original classes
//                 className="bg-red-100 dark:bg-red-600/20 border border-red-400 dark:border-red-600/50 rounded-xl p-4 relative mb-3"
//                 role="alert"
//               >
//                 <span className="text-red-600 dark:text-red-400 text-sm font-medium">
//                   {formError}
//                 </span>
//                 {/* Optional: Add a close button if needed, using original styles */}
//                 {/* <button onClick={handleCloseFormError} className="absolute top-0 right-0 p-2">
//                       <IoCloseIcon className="h-5 w-5" />
//                    </button> */}
//               </div>
//             )}

//             {/* Currency List Section (Original UI) */}
//             <div className="space-y-6">
//               {isLoadingCurrencies ? (
//                 // Original Skeletons
//                 <>
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                 </>
//               ) : (
//                 <>
//                   {/* Available Currencies (Original UI) */}
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="font-medium text-gray-500 dark:text-gray-300 mb-3 tracking-wide leading-8 border-b">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency._id || currency.code}
//                             role="button"
//                             tabIndex={0}
//                             // Original classes
//                             className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer`}
//                             onClick={() => handleCurrencySelect(currency.code)}
//                             onKeyDown={(e) =>
//                               e.key === "Enter" || e.key === " "
//                                 ? handleCurrencySelect(currency.code)
//                                 : null
//                             }
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-3 sm:gap-4">
//                                 {currency.flagImage ? (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={40}
//                                     height={40}
//                                     alt={`${currency.currencyName} Flag`}
//                                     className="rounded-full object-cover flex-shrink-0"
//                                   />
//                                 ) : (
//                                   <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium flex-shrink-0">
//                                     {currency.code}
//                                   </div>
//                                 )}
//                                 <div className="flex-grow">
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                                     {currency.code} - {currency.currencyName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <IoArrowForward className="size-5 text-neutral-900 dark:text-white" />
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Coming Soon Currencies (Original UI) */}
//                   {filteredComingSoonCurrencies.length > 0 && (
//                     <div>
//                       {/* Original heading */}
//                       <h3 className="font-medium text-gray-500 dark:text-gray-300 mb-3 tracking-wide leading-8 border-b">
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency._id || currency.code}
//                             // Original classes
//                             className={`p-3 sm:p-4 rounded-xl cursor-not-allowed opacity-60 border border-transparent dark:border-transparent`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-3 sm:gap-4">
//                                 {currency.flagImage ? (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={40}
//                                     height={40}
//                                     alt={`${currency.currencyName} Flag`}
//                                     className="rounded-full object-cover flex-shrink-0"
//                                   />
//                                 ) : (
//                                   <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium flex-shrink-0">
//                                     {currency.code}
//                                   </div>
//                                 )}
//                                 <div className="flex-grow">
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                                     {currency.code} - {currency.currencyName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <span className="text-xs bg-lightgray dark:bg-primarybox text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0 ml-2">
//                                 Coming soon
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* No Results Message (Original UI) */}
//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 && (
//                       <div className="text-center text-gray-700 dark:bg-white/5 bg-lightgray dark:text-gray-300 mt-8 py-5 rounded-lg">
//                         {searchCurrency.trim() !== ""
//                           ? `No currencies found for "${searchCurrency}".`
//                           : "No currencies available at the moment."}
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Step 2: Account Details Form (Original UI) */}
//         {step === 2 && (
//           <div
//             key="account-step"
//             // Original classes
//             className="bg-white dark:bg-background w-full lg:max-w-lg"
//           >
//             <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6 text-center sm:text-left">
//               Enter their account details ({selectedCurrencyCode})
//               {/* Added selected code here */}
//             </h2>

//             {/* General Form Error Display (Original UI) */}
//             {formError && (
//               <div
//                 // Original classes
//                 className="bg-red-100 dark:bg-red-600/20 border border-red-400 dark:border-red-600/50 rounded-xl p-4 relative mb-3"
//                 role="alert"
//               >
//                 <span className="text-red-600 dark:text-red-400 text-sm font-medium">
//                   {formError}
//                 </span>
//                 {/* Optional: Add a close button if needed */}
//                 {/* <button onClick={handleCloseFormError} className="absolute top-0 right-0 p-2">
//                      <IoCloseIcon className="h-5 w-5 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200" />
//                  </button> */}
//               </div>
//             )}

//             {/* Recipient Form */}
//             <form className="mt-2 space-y-5" onSubmit={handleSubmit} noValidate>
//
//               {/* Added noValidate */}
//               {/* Email Input (Original UI) */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   // Original classes
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]`}
//                   value={email}
//                   placeholder="example@domain.com"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               {/* Heading (Original UI) */}
//               <h3 className="font-medium text-gray-600 dark:text-white pt-2 pb-1 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Recipient's bank details
//               </h3>
//               {/* Bank Details Section (Original UI for Inputs, Kept Error Logic) */}
//               <div className="space-y-5">
//                 {/* Account Holder Name */}
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Full name of the account holder
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     // Original input classes, error border logic kept
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       accountHolderNameError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" // Error style
//                         : "focus:border-[#5f5f5f]" // Normal style
//                     }`}
//                     value={accountHolderName}
//                     placeholder="e.g., John Doe"
//                     onChange={(e) => {
//                       setAccountHolderName(e.target.value);
//                       if (e.target.value.trim()) setAccountHolderNameError("");
//                     }}
//                     required
//                     aria-invalid={!!accountHolderNameError}
//                     aria-describedby={
//                       accountHolderNameError
//                         ? "accountHolderName-error"
//                         : undefined
//                     }
//                   />
//                   {/* Original error message display */}
//                   {accountHolderNameError && (
//                     <p
//                       id="accountHolderName-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 {/* IFSC Code */}
//                 <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     IFSC code <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                     // Original input classes, error border logic kept
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       ifscCodeError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={ifscCode}
//                     placeholder="e.g., YESB0123456"
//                     onChange={(e) => {
//                       // Keep validation logic
//                       const val = e.target.value
//                         .toUpperCase()
//                         .replace(/[^A-Z0-9]/g, "");
//                       setIfscCode(val.slice(0, 11));
//                       if (val.trim()) setIfscCodeError("");
//                     }}
//                     required
//                     aria-invalid={!!ifscCodeError}
//                     aria-describedby={
//                       ifscCodeError ? "ifscCode-error" : undefined
//                     }
//                     maxLength={11}
//                     // Removed minLength as it's handled by validation
//                   />
//                   {/* Original error message display */}
//                   {ifscCodeError && (
//                     <p
//                       id="ifscCode-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Number */}
//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Account number <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     inputMode="numeric" // Keep hint
//                     id="accountNumber"
//                     // Original input classes, error border logic kept
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       accountNumberError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={accountNumber}
//                     placeholder="Enter account number"
//                     onChange={(e) => {
//                       // Keep validation logic
//                       const val = e.target.value.replace(/\D/g, "");
//                       setAccountNumber(val);
//                       if (val.trim()) setAccountNumberError("");
//                     }}
//                     required
//                     aria-invalid={!!accountNumberError}
//                     aria-describedby={
//                       accountNumberError ? "accountNumber-error" : undefined
//                     }
//                   />
//                   {/* Original error message display */}
//                   {accountNumberError && (
//                     <p
//                       id="accountNumber-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type Dropdown */}
//                 <div>
//                   <label className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base">
//                     Account type <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <AccountTypeDropdown
//                     value={accountType}
//                     onChange={(value) => {
//                       setAccountType(value);
//                       if (value) setAccountTypeError(""); // Clear error on selection
//                     }}
//                     error={accountTypeError} // Pass error string
//                   />
//                   {/* Error is displayed within the Dropdown component, no separate <p> needed here */}
//                 </div>

//                 {/* Bank Name */}
//                 <div>
//                   <label
//                     htmlFor="bankName"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Bank name <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                     // Original input classes, error border logic kept
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       bankNameError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={bankName}
//                     placeholder="e.g., State Bank of India"
//                     onChange={(e) => {
//                       setBankName(e.target.value);
//                       if (e.target.value.trim()) setBankNameError("");
//                     }}
//                     required
//                     aria-invalid={!!bankNameError}
//                     aria-describedby={
//                       bankNameError ? "bankName-error" : undefined
//                     }
//                   />
//                   {/* Original error message display */}
//                   {bankNameError && (
//                     <p
//                       id="bankName-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Recipient Address */}
//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Recipient Address (Street, City, Postcode, Country)
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     // Original input classes, error border logic kept
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       addressError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={address}
//                     placeholder="e.g., 123 Main St, Anytown, 12345, India"
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                       if (e.target.value.trim()) setAddressError("");
//                     }}
//                     required
//                     aria-invalid={!!addressError}
//                     aria-describedby={
//                       addressError ? "address-error" : undefined
//                     }
//                   />
//                   {/* Original error message display */}
//                   {addressError && (
//                     <p
//                       id="address-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               {/* Form Action Buttons (Original UI) */}
//               <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-4 pt-4">
//                 <button
//                   type="button"
//                   // Original classes
//                   className={`sm:order-1 order-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   // Original classes
//                   className={`sm:order-2 order-1 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
//                   // --- KEPT: Logic to disable button ---
//                   disabled={isSubmitting || isFormInvalid}
//                   // --- END KEPT ---
//                 >
//                   {isSubmitting ? (
//                     <>
//                       {/* Original SVG Loader */}
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
//                       <span>Confirming...</span>
//                     </>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// // frontend/src/app/dashboard/recipients/addrecipient/page.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import DashboardHeader from "../../../components/layout/DashboardHeader";
// import { useAuth } from "../../../contexts/AuthContext";
// import recipientService from "../../../services/recipient";
// import currencyService, { Currency } from "../../../services/currency";
// import { IoMdCloseCircle } from "react-icons/io";
// import Image from "next/image";
// import { IoArrowForward, IoClose as IoCloseIcon } from "react-icons/io5";
// import { Skeleton } from "@/components/ui/skeleton";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import AccountTypeDropdown from "../../../components/ui/AccountTypeDropdown";
// import { AlertTriangle } from "lucide-react";

// // Interfaces (ApiErrorData, ApiErrorResponse, ApiError, NewRecipient) remain the same...
// interface ApiErrorData {
//   errors?: Record<string, string>;
//   message?: string;
// }

// interface ApiErrorResponse {
//   status: number;
//   data: ApiErrorData;
// }

// interface ApiError {
//   response?: ApiErrorResponse;
//   message?: string;
// }

// interface NewRecipient {
//   _id: string;
// }
// // --- End Interfaces ---

// const AddRecipientPage = () => {
//   const router = useRouter();
//   const { token } = useAuth();
//   const searchParams = useSearchParams();

//   // State variables remain the same...
//   const [step, setStep] = useState(1);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [address, setAddress] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [accountHolderNameError, setAccountHolderNameError] = useState("");
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [accountNumberError, setAccountNumberError] = useState("");
//   const [bankNameError, setBankNameError] = useState("");
//   const [addressError, setAddressError] = useState("");
//   const [accountTypeError, setAccountTypeError] = useState("");
//   const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
//   const [searchCurrency, setSearchCurrency] = useState("");
//   // --- End State Variables ---

//   // useEffect for fetching currencies remains the same...
//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoadingCurrencies(true);
//       setFormError("");
//       try {
//         const fetchedCurrencies = await currencyService.getAllCurrencies();
//         setCurrencies(fetchedCurrencies);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//         const errorMessage =
//           error instanceof Error ? error.message : "Failed to load currencies.";
//         setFormError(errorMessage);
//       } finally {
//         setIsLoadingCurrencies(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);
//   // --- End useEffect ---

//   // Memoized currency lists remain the same...
//   const availableCurrenciesBase = useMemo((): Currency[] => {
//     return currencies.filter((currency) => ["INR"].includes(currency.code));
//   }, [currencies]);

//   const comingSoonCurrenciesBase = useMemo((): Currency[] => {
//     const availableCodes = ["INR"];
//     return currencies.filter(
//       (currency) =>
//         !availableCodes.includes(currency.code) &&
//         ["EUR", "USD", "GBP"].includes(currency.code)
//     );
//   }, [currencies]);

//   const filteredAvailableCurrencies = useMemo((): Currency[] => {
//     if (!searchCurrency) return availableCurrenciesBase;
//     const searchTerm = searchCurrency.toLowerCase();
//     return availableCurrenciesBase.filter((currency) => {
//       return (
//         currency.currencyName?.toLowerCase().includes(searchTerm) ||
//         currency.code?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [availableCurrenciesBase, searchCurrency]);

//   const filteredComingSoonCurrencies = useMemo((): Currency[] => {
//     if (!searchCurrency) return comingSoonCurrenciesBase;
//     const searchTerm = searchCurrency.toLowerCase();
//     return comingSoonCurrenciesBase.filter((currency) => {
//       return (
//         currency.currencyName?.toLowerCase().includes(searchTerm) ||
//         currency.code?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [comingSoonCurrenciesBase, searchCurrency]);
//   // --- End Memoized Lists ---

//   // useMemo hook for isFormInvalid remains the same...
//   const isFormInvalid = useMemo(() => {
//     return (
//       !accountHolderName.trim() ||
//       !ifscCode.trim() ||
//       !accountNumber.trim() ||
//       !accountType ||
//       !bankName.trim() ||
//       !address.trim()
//     );
//   }, [
//     accountHolderName,
//     ifscCode,
//     accountNumber,
//     accountType,
//     bankName,
//     address,
//   ]);
//   // --- End useMemo ---

//   // handleCurrencySelect and handleBackStep remain the same...
//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrencyCode(currencyCode);
//     setStep(2);
//   };

//   const handleBackStep = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     } else {
//       router.back();
//     }
//   };
//   // --- End Navigation Handlers ---

//   // --- MODIFIED: validateForm function ---
//   const validateForm = (): boolean => {
//     let isValid = true;
//     // Reset errors first
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");

//     // Name Validation
//     if (!accountHolderName.trim()) {
//       setAccountHolderNameError("Account holder name is required");
//       isValid = false;
//     }

//     // IFSC Code Validation
//     const trimmedIfsc = ifscCode.trim();
//     // Regex for IFSC: 4 letters, 1 zero, 6 alphanumeric chars (total 11)
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
//     if (!trimmedIfsc) {
//       setIfscCodeError("IFSC code is required");
//       isValid = false;
//     } else if (!ifscRegex.test(trimmedIfsc)) {
//       setIfscCodeError("Invalid IFSC code format (e.g., ABCD0123456)");
//       isValid = false;
//     }
//     // Note: The length check (11 chars) is implicitly handled by the regex.

//     // Account Number Validation
//     if (!accountNumber.trim()) {
//       setAccountNumberError("Account number is required");
//       isValid = false;
//     }
//     // Add specific validation for account number format if needed here
//     // e.g., length checks, specific bank rules if applicable

//     // Bank Name Validation
//     if (!bankName.trim()) {
//       setBankNameError("Bank name is required");
//       isValid = false;
//     }

//     // Address Validation
//     if (!address.trim()) {
//       setAddressError("Address is required");
//       isValid = false;
//     }

//     // Account Type Validation
//     if (!accountType) {
//       setAccountTypeError("Account type is required");
//       isValid = false;
//     }

//     return isValid;
//   };
//   // --- END MODIFIED: validateForm function ---

//   // handleSubmit remains largely the same, relies on the updated validateForm
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError("");

//     const isValid = validateForm(); // Uses the updated validation

//     if (!isValid) {
//       // Errors are already set by validateForm
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const recipientData = {
//         currencyCode: selectedCurrencyCode,
//         email: email.trim() || undefined,
//         accountHolderName: accountHolderName.trim(),
//         ifscCode: ifscCode.trim().toUpperCase(), // Ensure it's uppercase for consistency
//         accountNumber: accountNumber.trim(),
//         bankName: bankName.trim(),
//         address: address.trim(),
//         accountType,
//       };

//       const newRecipient: NewRecipient = await recipientService.addRecipient(
//         recipientData,
//         token
//       );

//       // Redirection logic remains the same...
//       const returnToParam = searchParams.get("returnTo");
//       if (returnToParam) {
//           const decodedReturnUrl = decodeURIComponent(returnToParam);
//           const match = decodedReturnUrl.match(
//               /\/dashboard\/balances\/([^/]+)\/send\/select-recipient/
//           );

//           if (match?.[1] && newRecipient?._id) {
//               const balanceId = match[1];
//               const targetUrl = `/dashboard/balances/${balanceId}/send/amount?recipientId=${newRecipient._id}`;
//               console.log("Redirecting back to send flow:", targetUrl);
//               router.push(targetUrl);
//           } else {
//               console.warn(
//                   "Could not parse balanceId from returnTo URL or missing recipient ID, redirecting to recipient details:",
//                   decodedReturnUrl,
//                   newRecipient?._id
//               );
//               router.push(
//                   newRecipient?._id
//                       ? `/dashboard/recipients/${newRecipient._id}`
//                       : "/dashboard/recipients"
//               );
//           }
//       } else if (newRecipient?._id) {
//           console.log("Redirecting to recipient details page (standard flow)");
//           router.push(`/dashboard/recipients/${newRecipient._id}`);
//       } else {
//           console.warn(
//               "Recipient added, but no ID received or standard flow error. Redirecting to recipient list."
//           );
//           setFormError(
//               "Recipient added, but failed to redirect. Please check the recipients list."
//           );
//           router.push("/dashboard/recipients");
//       }
//       // --- End Redirection Logic ---

//     } catch (error: unknown) {
//       console.error("Error adding recipient:", error);
//       const apiError = error as ApiError;

//       // Backend error handling remains the same...
//        if (apiError.response?.data && apiError.response.status === 400) {
//            const backendErrors = apiError.response.data.errors;
//            if (backendErrors && typeof backendErrors === 'object') {
//                setAccountHolderNameError(backendErrors.accountHolderName || '');
//                setIfscCodeError(backendErrors.ifscCode || ''); // Will be overridden by frontend validation first usually
//                setAccountNumberError(backendErrors.accountNumber || '');
//                setBankNameError(backendErrors.bankName || '');
//                setAddressError(backendErrors.address || '');
//                setAccountTypeError(backendErrors.accountType || '');
//            }

//            if (apiError.response.data.message) {
//                setFormError(apiError.response.data.message);
//            } else if (!backendErrors || Object.keys(backendErrors).length === 0) {
//                setFormError('Invalid data submitted. Please check the fields.');
//            }
//        } else {
//            // Handle other types of errors (Unchanged)
//            const errorMessage = apiError?.response?.data?.message || apiError?.message || (error instanceof Error ? error.message : "An unknown error occurred");
//            setFormError(errorMessage || "Failed to add recipient. Please try again.");
//        }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // --- End handleSubmit ---

//   // handleCloseFormError, clearSearchTerm, handleClearForm remain the same...
//   const handleCloseFormError = () => {
//     setFormError("");
//   };

//   const clearSearchTerm = () => {
//     setSearchCurrency("");
//   };

//   const handleClearForm = () => {
//     setEmail("");
//     setAccountHolderName("");
//     setIfscCode("");
//     setAccountNumber("");
//     setBankName("");
//     setAddress("");
//     setAccountType("");
//     setFormError("");
//     setAccountHolderNameError("");
//     setIfscCodeError("");
//     setAccountNumberError("");
//     setBankNameError("");
//     setAddressError("");
//     setAccountTypeError("");
//   };
//   // --- End Utility Handlers ---

//   // --- JSX Section (No changes needed here for IFSC validation logic, but showing relevant part) ---
//   return (
//     <div className="AddRecipientPage">
//       <DashboardHeader title="Recipients" onBack={handleBackStep} />
//       <div className="Steps">
//         {/* Step 1: Currency Selection (No changes needed) */}
//         {step === 1 && (
//           <div
//             key="currency-step"
//             className="bg-white dark:bg-background relative"
//           >
//             {/* ... Currency selection UI ... */}
//             <h2 className="lg:text-3xl md:text-2xl text-xl capitalize font-semibold text-mainheading dark:text-white text-left md:text-center mb-4">
//               Select their currency
//             </h2>

//             {/* Currency Search Input */}
//             <div className="relative mb-4">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch
//                   className="h-5 w-5 text-neutral-900 dark:text-white"
//                   aria-hidden="true"
//                 />
//               </div>
//               <input
//                 type="text"
//                 className="w-full rounded-full h-14 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-none focus:border-[#5f5f5f] placeholder:text-neutral-600 dark:placeholder:text-white bg-white dark:bg-background"
//                 placeholder="Search currency by name or code..."
//                 value={searchCurrency}
//                 onChange={(e) => setSearchCurrency(e.target.value)}
//               />
//               {searchCurrency && (
//                 <button
//                   type="button"
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                   aria-label="Clear search"
//                 >
//                   <MdCancel size={28} aria-hidden="true" />
//                 </button>
//               )}
//             </div>

//             {/* General Form Error Display for Currency Step */}
//             {formError && !isLoadingCurrencies && (
//               <div
//                 className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-xl p-3 flex items-center gap-3 relative mb-3"
//                 role="alert"
//               >
//                 <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-red-600/20">
//                   <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                 </div>
//                 <span className="text-red-700 dark:text-red-300/90 text-sm font-medium">
//                   {formError}
//                 </span>
//               </div>
//             )}

//             {/* Currency List Section */}
//             <div className="space-y-6">
//               {isLoadingCurrencies ? (
//                 <>
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                   <Skeleton className="h-16 rounded-xl w-full" />
//                 </>
//               ) : (
//                 <>
//                   {/* Available Currencies */}
//                   {filteredAvailableCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="font-medium text-gray-500 dark:text-gray-300 mb-3 tracking-wide leading-8 border-b">
//                         All currencies
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredAvailableCurrencies.map((currency) => (
//                           <div
//                             key={currency._id || currency.code}
//                             role="button"
//                             tabIndex={0}
//                             className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer`}
//                             onClick={() => handleCurrencySelect(currency.code)}
//                             onKeyDown={(e) =>
//                               e.key === "Enter" || e.key === " "
//                                 ? handleCurrencySelect(currency.code)
//                                 : null
//                             }
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-3 sm:gap-4">
//                                 {currency.flagImage ? (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={40}
//                                     height={40}
//                                     alt={`${currency.currencyName} Flag`}
//                                     className="rounded-full object-cover flex-shrink-0"
//                                   />
//                                 ) : (
//                                   <div className="w-10 h-10 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs font-medium flex-shrink-0">
//                                     {currency.code}
//                                   </div>
//                                 )}
//                                 <div className="flex-grow text-wrap">
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                                     {currency.code} - {currency.currencyName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <IoArrowForward className="size-5 text-neutral-900 dark:text-white" />
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Coming Soon Currencies */}
//                   {filteredComingSoonCurrencies.length > 0 && (
//                     <div>
//                       <h3 className="font-medium text-gray-500 dark:text-gray-300 mb-3 tracking-wide leading-8 border-b">
//                         Coming soon
//                       </h3>
//                       <div className="space-y-2">
//                         {filteredComingSoonCurrencies.map((currency) => (
//                           <div
//                             key={currency._id || currency.code}
//                             className={`p-2 sm:p-4 rounded-xl cursor-not-allowed opacity-60 border border-transparent dark:border-transparent`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-3 sm:gap-4">
//                                 {currency.flagImage ? (
//                                   <Image
//                                     src={currency.flagImage}
//                                     width={40}
//                                     height={40}
//                                     alt={`${currency.currencyName} Flag`}
//                                     className="rounded-full object-cover flex-shrink-0"
//                                   />
//                                 ) : (
//                                   <div className="w-10 h-10 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs font-medium flex-shrink-0">
//                                     {currency.code}
//                                   </div>
//                                 )}
//                                 <div className="flex-grow text-wrap">
//                                   <h4 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                                     {currency.code} - {currency.currencyName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <span className="text-xs bg-lightgray dark:bg-primarybox text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0 ml-2">
//                                 Coming soon
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* No Results Message */}
//                   {!isLoadingCurrencies &&
//                     filteredAvailableCurrencies.length === 0 &&
//                     filteredComingSoonCurrencies.length === 0 && (
//                       <div className="text-center text-gray-700 dark:bg-white/5 bg-lightgray dark:text-gray-300 mt-8 py-5 rounded-lg">
//                         {searchCurrency.trim() !== ""
//                           ? `No currencies found for "${searchCurrency}".`
//                           : "No currencies available at the moment."}
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Step 2: Account Details Form */}
//         {step === 2 && (
//           <div
//             key="account-step"
//             className="bg-white dark:bg-background w-full lg:max-w-lg"
//           >
//             <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white mb-6 text-left">
//               Enter their account details ({selectedCurrencyCode})
//             </h2>

//             {/* General Form Error Display */}
//             {formError && (
//               <div
//                 className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-xl p-3 flex items-center gap-3 relative mb-3"
//                 role="alert"
//               >
//                 <div className="flex-shrink-0 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//                   <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                 </div>
//                 <span className="text-red-700 dark:text-red-300/90 text-sm font-medium">
//                   {formError}
//                 </span>
//               </div>
//             )}

//             {/* Recipient Form */}
//             <form className="mt-2 space-y-5" onSubmit={handleSubmit} noValidate>
//               {/* Email Input */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Their email (optional)
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]`}
//                   value={email}
//                   placeholder="example@domain.com"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               {/* Heading */}
//               <h3 className="font-medium text-gray-600 dark:text-white pt-2 pb-1 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Recipient's bank details
//               </h3>
//               {/* Bank Details Section */}
//               <div className="space-y-5">
//                 {/* Account Holder Name */}
//                 <div>
//                   <label
//                     htmlFor="accountHolderName"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Full name of the account holder
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       accountHolderNameError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={accountHolderName}
//                     placeholder="e.g., John Doe"
//                     onChange={(e) => {
//                       setAccountHolderName(e.target.value);
//                       // Clear error as user types
//                       if (accountHolderNameError) setAccountHolderNameError("");
//                     }}
//                     required
//                     aria-invalid={!!accountHolderNameError}
//                     aria-describedby={
//                       accountHolderNameError
//                         ? "accountHolderName-error"
//                         : undefined
//                     }
//                   />
//                   {accountHolderNameError && (
//                     <p
//                       id="accountHolderName-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {accountHolderNameError}
//                     </p>
//                   )}
//                 </div>

//                 {/* IFSC Code - Input remains the same, error handling works with new logic */}
//                 <div>
//                   <label
//                     htmlFor="ifscCode"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     IFSC code <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="ifscCode"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       ifscCodeError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={ifscCode}
//                     placeholder="e.g., YESB0123456"
//                     // --- MODIFIED: onChange for IFSC ---
//                     onChange={(e) => {
//                       // Convert to uppercase, remove non-alphanumeric, limit length
//                       const val = e.target.value
//                         .toUpperCase()
//                         .replace(/[^A-Z0-9]/g, "");
//                       setIfscCode(val.slice(0, 11));
//                       // Clear error as user types
//                       if (ifscCodeError) {
//                         setIfscCodeError("");
//                       }
//                     }}
//                     required
//                     aria-invalid={!!ifscCodeError}
//                     aria-describedby={
//                       ifscCodeError ? "ifscCode-error" : undefined
//                     }
//                     maxLength={11}
//                     // The pattern attribute can provide browser-level hints but validation is primarily JS
//                     // pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
//                   />
//                   {ifscCodeError && (
//                     <p
//                       id="ifscCode-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {ifscCodeError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Number */}
//                 <div>
//                   <label
//                     htmlFor="accountNumber"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Account number <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     id="accountNumber"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       accountNumberError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={accountNumber}
//                     placeholder="Enter account number"
//                     onChange={(e) => {
//                       // Only allow digits
//                       const val = e.target.value.replace(/\D/g, "");
//                       setAccountNumber(val);
//                       // Clear error as user types
//                       if (accountNumberError) setAccountNumberError("");
//                     }}
//                     required
//                     aria-invalid={!!accountNumberError}
//                     aria-describedby={
//                       accountNumberError ? "accountNumber-error" : undefined
//                     }
//                   />
//                   {accountNumberError && (
//                     <p
//                       id="accountNumber-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {accountNumberError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Account Type Dropdown */}
//                 <div>
//                   <label className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base">
//                     Account type <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <AccountTypeDropdown
//                     value={accountType}
//                     onChange={(value) => {
//                       setAccountType(value);
//                       // Clear error on selection
//                       if (accountTypeError) setAccountTypeError("");
//                     }}
//                     error={accountTypeError} // Pass error string
//                   />
//                   {/* Error displayed within component */}
//                 </div>

//                 {/* Bank Name */}
//                 <div>
//                   <label
//                     htmlFor="bankName"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Bank name <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="bankName"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       bankNameError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={bankName}
//                     placeholder="e.g., State Bank of India"
//                     onChange={(e) => {
//                       setBankName(e.target.value);
//                       // Clear error as user types
//                       if (bankNameError) setBankNameError("");
//                     }}
//                     required
//                     aria-invalid={!!bankNameError}
//                     aria-describedby={
//                       bankNameError ? "bankName-error" : undefined
//                     }
//                   />
//                   {bankNameError && (
//                     <p
//                       id="bankName-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {bankNameError}
//                     </p>
//                   )}
//                 </div>

//                 {/* Recipient Address */}
//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Recipient Address (Street, City, Postcode, Country)
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       addressError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={address}
//                     placeholder="e.g., 123 Main St, Anytown, 12345, India"
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                       // Clear error as user types
//                       if (addressError) setAddressError("");
//                     }}
//                     required
//                     aria-invalid={!!addressError}
//                     aria-describedby={
//                       addressError ? "address-error" : undefined
//                     }
//                   />
//                   {addressError && (
//                     <p
//                       id="address-error"
//                       className="flex text-red-500 text-xs items-center mt-1"
//                       role="alert"
//                     >
//                       <IoMdCloseCircle className="size-3.5 mr-1 flex-shrink-0" />
//                       {addressError}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               {/* Form Action Buttons */}
//               <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-4 pt-4">
//                 <button
//                   type="button"
//                   className={`sm:order-1 order-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex items-center justify-center`}
//                   onClick={handleClearForm}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   type="submit"
//                   className={`sm:order-2 order-1 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
//                   disabled={isSubmitting || isFormInvalid} // isFormInvalid still useful for initial disabling
//                 >
//                   {isSubmitting ? (
//                     <>
//                       {/* SVG Loader */}
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         {/* paths... */}
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
//                       <span>Confirming...</span>
//                     </>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddRecipientPage;

// frontend/src/app/dashboard/recipients/addrecipient/page.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "../../../components/layout/DashboardHeader";
import { useAuth } from "../../../contexts/AuthContext";
import recipientService from "../../../services/recipient"; // Adjusted path if needed
import currencyService, { Currency } from "../../../services/currency"; // Adjusted path
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import AccountTypeDropdown from "../../../components/ui/AccountTypeDropdown"; // Adjusted path
import { AlertTriangle } from "lucide-react";

// Interfaces
interface ApiErrorData {
  errors?: Record<string, string>;
  message?: string;
}

interface ApiErrorResponse {
  status: number;
  data: ApiErrorData;
}

// This interface should now correctly reflect an Axios-like error object
interface ApiError {
  response?: ApiErrorResponse; // This will be populated by Axios errors
  message: string; // Default message or message from Axios error itself
  // We don't need 'status' or 'data' at the top level of ApiError
  // if we are relying on error.response.status and error.response.data
}

interface NewRecipient {
  _id: string;
}
// --- End Interfaces ---

const AddRecipientPage = () => {
  const router = useRouter();
  const { token } = useAuth();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [email, setEmail] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountHolderNameError, setAccountHolderNameError] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [accountTypeError, setAccountTypeError] = useState("");
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
  const [searchCurrency, setSearchCurrency] = useState("");

  const [fetchedBankName, setFetchedBankName] = useState("");
  const [fetchedAddress, setFetchedAddress] = useState("");
  const [isFetchingBankDetails, setIsFetchingBankDetails] = useState(false);
  const [ifscApiError, setIfscApiError] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoadingCurrencies(true);
      setFormError("");
      try {
        const fetchedCurrencies = await currencyService.getAllCurrencies();
        setCurrencies(fetchedCurrencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load currencies.";
        setFormError(errorMessage);
      } finally {
        setIsLoadingCurrencies(false);
      }
    };
    fetchCurrencies();
  }, []);

  const availableCurrenciesBase = useMemo(
    (): Currency[] => currencies.filter((c) => ["INR"].includes(c.code)),
    [currencies]
  );
  const comingSoonCurrenciesBase = useMemo((): Currency[] => {
    const availableCodes = ["INR"];
    return currencies.filter(
      (c) =>
        !availableCodes.includes(c.code) &&
        ["EUR", "USD", "GBP"].includes(c.code)
    );
  }, [currencies]);
  const filteredAvailableCurrencies = useMemo((): Currency[] => {
    if (!searchCurrency) return availableCurrenciesBase;
    const searchTerm = searchCurrency.toLowerCase();
    return availableCurrenciesBase.filter(
      (c) =>
        c.currencyName?.toLowerCase().includes(searchTerm) ||
        c.code?.toLowerCase().includes(searchTerm)
    );
  }, [availableCurrenciesBase, searchCurrency]);
  const filteredComingSoonCurrencies = useMemo((): Currency[] => {
    if (!searchCurrency) return comingSoonCurrenciesBase;
    const searchTerm = searchCurrency.toLowerCase();
    return comingSoonCurrenciesBase.filter(
      (c) =>
        c.currencyName?.toLowerCase().includes(searchTerm) ||
        c.code?.toLowerCase().includes(searchTerm)
    );
  }, [comingSoonCurrenciesBase, searchCurrency]);

  const isFormInvalid = useMemo(
    () =>
      !accountHolderName.trim() ||
      !ifscCode.trim() ||
      !accountNumber.trim() ||
      !accountType ||
      !fetchedBankName ||
      !fetchedAddress,
    [
      accountHolderName,
      ifscCode,
      accountNumber,
      accountType,
      fetchedBankName,
      fetchedAddress,
    ]
  );

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
    setStep(2);
  };
  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  const fetchBankDetailsByIFSC = async (ifsc: string) => {
    setIsFetchingBankDetails(true);
    setIfscApiError("");
    setFetchedBankName("");
    setFetchedAddress("");
    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (!response.ok) {
        if (response.status === 404)
          throw new Error("Invalid IFSC code. Bank details not found.");
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Failed to fetch bank details. Status: ${response.status}`
        );
      }
      const data = await response.json();
      if (data && data.BANK && data.ADDRESS) {
        setFetchedBankName(data.BANK);
        setFetchedAddress(data.ADDRESS);
      } else {
        throw new Error("Incomplete bank details received.");
      }
    } catch (error: any) {
      setIfscApiError(error.message || "Could not retrieve bank details.");
      setFetchedBankName("");
      setFetchedAddress("");
    } finally {
      setIsFetchingBankDetails(false);
    }
  };
  const handleIfscBlur = async () => {
    const trimmedIfsc = ifscCode.trim();
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!trimmedIfsc) {
      setIfscCodeError("");
      setIfscApiError("");
      setFetchedBankName("");
      setFetchedAddress("");
      return;
    }
    if (!ifscRegex.test(trimmedIfsc)) {
      setIfscCodeError("Invalid IFSC code format (e.g., ABCD0123456)");
      setIfscApiError("");
      setFetchedBankName("");
      setFetchedAddress("");
      return;
    }
    setIfscCodeError("");
    await fetchBankDetailsByIFSC(trimmedIfsc);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setAccountHolderNameError("");
    setIfscCodeError("");
    setIfscApiError("");
    setAccountNumberError("");
    setAccountTypeError("");
    setFormError("");

    if (!accountHolderName.trim()) {
      setAccountHolderNameError("Account holder name is required");
      isValid = false;
    }
    const trimmedIfsc = ifscCode.trim();
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!trimmedIfsc) {
      setIfscCodeError("IFSC code is required");
      isValid = false;
    } else if (!ifscRegex.test(trimmedIfsc)) {
      setIfscCodeError("Invalid IFSC code format");
      isValid = false;
    } else if (!fetchedBankName || !fetchedAddress) {
      setIfscApiError(
        "Bank details could not be verified. Please check IFSC or try again."
      );
      isValid = false;
    }
    if (!accountNumber.trim()) {
      setAccountNumberError("Account number is required");
      isValid = false;
    }
    if (!accountType) {
      setAccountTypeError("Account type is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setAccountHolderNameError("");
    setIfscCodeError("");
    setIfscApiError("");
    setAccountNumberError("");
    setAccountTypeError("");

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      const recipientData = {
        currencyCode: selectedCurrencyCode,
        email: email.trim() || undefined,
        accountHolderName: accountHolderName.trim(),
        ifscCode: ifscCode.trim().toUpperCase(),
        accountNumber: accountNumber.trim(),
        bankName: fetchedBankName,
        address: fetchedAddress,
        accountType,
      };

      const newRecipient: NewRecipient = await recipientService.addRecipient(
        recipientData,
        token
      );

      const returnToParam = searchParams.get("returnTo");
      if (returnToParam) {
        const decodedReturnUrl = decodeURIComponent(returnToParam);
        const match = decodedReturnUrl.match(
          /\/dashboard\/balances\/([^/]+)\/send\/select-recipient/
        );
        if (match?.[1] && newRecipient?._id) {
          const balanceId = match[1];
          router.push(
            `/dashboard/balances/${balanceId}/send/amount?recipientId=${newRecipient._id}`
          );
        } else {
          router.push(
            newRecipient?._id
              ? `/dashboard/recipients/${newRecipient._id}`
              : "/dashboard/recipients"
          );
        }
      } else if (newRecipient?._id) {
        router.push(`/dashboard/recipients/${newRecipient._id}`);
      } else {
        setFormError("Recipient added, but failed to redirect.");
        router.push("/dashboard/recipients");
      }
    } catch (error: unknown) {
      // Log the raw error to inspect its structure in the console
      console.error("handleSubmit caught error:", error);

      const apiError = error as ApiError; // Cast to our updated ApiError interface

      if (apiError.response) {
        // Check if 'response' property exists (standard Axios error)
        const status = apiError.response.status;
        const responseData = apiError.response.data;

        if (status === 409 && responseData?.message) {
          setAccountNumberError(responseData.message);
        } else if (status === 400 && responseData) {
          const backendErrors = responseData.errors;
          if (backendErrors && typeof backendErrors === "object") {
            setAccountHolderNameError(backendErrors.accountHolderName || "");
            setIfscCodeError(backendErrors.ifscCode || "");
            setAccountNumberError(
              (prevError) => backendErrors.accountNumber || prevError
            );
            setAccountTypeError(backendErrors.accountType || "");
            if (backendErrors.bankName || backendErrors.address) {
              setIfscApiError(
                backendErrors.bankName ||
                  backendErrors.address ||
                  "Server validation failed for bank details."
              );
            }
          }
          if (
            responseData.message &&
            (!backendErrors || Object.keys(backendErrors).length === 0)
          ) {
            setFormError(responseData.message);
          } else if (
            !backendErrors ||
            (Object.keys(backendErrors).length === 0 && !responseData.message)
          ) {
            setFormError("Invalid data submitted. Please check the fields.");
          }
        } else {
          // Other errors with a response object
          setFormError(
            responseData?.message ||
              apiError.message ||
              "An unknown error occurred."
          );
        }
      } else {
        // Errors without a .response property (e.g., network errors, or if service threw a simple string before)
        // The `apiError.message` should contain the string thrown by your service or a default Axios message.
        setFormError(
          apiError.message ||
            "An unknown network error occurred. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseFormError = () => setFormError("");
  const clearSearchTerm = () => setSearchCurrency("");
  const handleClearForm = () => {
    setEmail("");
    setAccountHolderName("");
    setIfscCode("");
    setAccountNumber("");
    setAccountType("");
    setFormError("");
    setAccountHolderNameError("");
    setIfscCodeError("");
    setAccountNumberError("");
    setAccountTypeError("");
    setFetchedBankName("");
    setFetchedAddress("");
    setIsFetchingBankDetails(false);
    setIfscApiError("");
  };

  return (
    <div className="AddRecipientPage">
      <DashboardHeader title="Recipients" onBack={handleBackStep} />
      <div className="Steps">
        {step === 1 && (
          <div key="currency-step" className="relative">
            <h2 className="md:text-2xl text-xl capitalize font-semibold text-mainheadingWhite mb-4">
              Select their currency
            </h2>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FiSearch
                  className="size-5 text-mainheadingWhite"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                className="w-full rounded-full h-12.5 py-3 pl-12 pr-3  focus:outline-0 transition-all duration-75 ease-in-out placeholder:text-gray-400 border border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white bg-primarybox/50"
                placeholder="Search currency by name or code..."
                value={searchCurrency}
                onChange={(e) => setSearchCurrency(e.target.value)}
              />
              {searchCurrency && (
                <button
                  type="button"
                  onClick={clearSearchTerm}
                  className="absolute inset-y-0 right-3 flex items-center text-primary focus:outline-none cursor-pointer"
                  aria-label="Clear search"
                >
                  <MdCancel size={22} aria-hidden="true" />
                </button>
              )}
            </div>
            {formError && !isLoadingCurrencies && (
              <div
                className="bg-red-900/25 border border-red-500 rounded-xl p-3 flex items-center gap-3 relative mb-3"
                role="alert"
              >
                <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-red-600/20">
                  <AlertTriangle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <span className="text-red-300/90 text-sm font-medium">
                  {formError}
                </span>
              </div>
            )}
            <div className="space-y-6">
              {isLoadingCurrencies ? (
                <>
                  <Skeleton className="h-16 rounded-xl w-full" />
                  <Skeleton className="h-16 rounded-xl w-full" />
                  <Skeleton className="h-16 rounded-xl w-full" />
                </>
              ) : (
                <>
                  {filteredAvailableCurrencies.length > 0 && (
                    <div>
                      <h3 className="font-medium text-white/90 mb-3 leading-8 border-b">
                        All currencies
                      </h3>
                      <div className="space-y-2">
                        {filteredAvailableCurrencies.map((currency) => (
                          <div
                            key={currency._id || currency.code}
                            role="button"
                            tabIndex={0}
                            className={`block hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all cursor-pointer`}
                            onClick={() => handleCurrencySelect(currency.code)}
                            onKeyDown={(e) =>
                              e.key === "Enter" || e.key === " "
                                ? handleCurrencySelect(currency.code)
                                : null
                            }
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                {currency.flagImage ? (
                                  <Image
                                    src={currency.flagImage}
                                    width={40}
                                    height={40}
                                    alt={`${currency.currencyName} Flag`}
                                    className="rounded-full object-cover shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-secondarybox rounded-full flex items-center justify-center text-mainheadingWhite text-xs font-medium shrink-0">
                                    {currency.code}
                                  </div>
                                )}
                                <div className="grow text-wrap">
                                  <h4 className="font-medium text-mainheadingWhite text-sm md:text-base">
                                    {currency.code} - {currency.currencyName}
                                  </h4>
                                </div>
                              </div>
                              <div className="ml-4">
                                <IoArrowForward className="size-5 text-mainheadingWhite" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {filteredComingSoonCurrencies.length > 0 && (
                    <div>
                      <h3 className="font-medium text-white/90 mb-3 leading-8 border-b">
                        Coming soon
                      </h3>
                      <div className="space-y-2">
                        {filteredComingSoonCurrencies.map((currency) => (
                          <div
                            key={currency._id || currency.code}
                            className={`p-2 sm:p-4 rounded-xl cursor-not-allowed opacity-60 border border-transparent dark:border-transparent`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                {currency.flagImage ? (
                                  <Image
                                    src={currency.flagImage}
                                    width={40}
                                    height={40}
                                    alt={`${currency.currencyName} Flag`}
                                    className="rounded-full object-cover shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-secondarybox rounded-full flex items-center justify-center text-mainheadingWhite text-xs font-medium shrink-0">
                                    {currency.code}
                                  </div>
                                )}
                                <div className="grow text-wrap">
                                  <h4 className="font-medium text-mainheadingWhite text-sm md:text-base">
                                    {currency.code} - {currency.currencyName}
                                  </h4>
                                </div>
                              </div>
                              <span className="text-xs bg-primarybox text-mainheadingWhite px-2 py-1 rounded-full shrink-0 ml-2">
                                Coming soon
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {!isLoadingCurrencies &&
                    !filteredAvailableCurrencies.length &&
                    !filteredComingSoonCurrencies.length && (
                      <div className="text-center bg-primarybox text-subheadingWhite mt-8 py-5 rounded-lg">
                        {searchCurrency.trim() !== ""
                          ? `No currencies found for "${searchCurrency}".`
                          : "No currencies available."}
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="account-step" className="w-full lg:max-w-lg">
            <h2 className="lg:text-2xl text-xl font-semibold text-mainheadingWhite mb-6 text-left">
              Enter their account details ({selectedCurrencyCode})
            </h2>
            {formError && (
              <div
                className="bg-red-900/25 border border-red-500 rounded-xl p-3 flex items-center gap-3 relative mb-3"
                role="alert"
              >
                <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-red-600/20">
                  <AlertTriangle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <span className="text-red-300/90 text-sm font-medium">
                  {formError}
                </span>
              </div>
            )}
            <form className="mt-2 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="text-mainheadingWhite block capitalize text-sm lg:text-base"
                >
                  Their email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  className={`mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0`}
                  value={email}
                  placeholder="example@domain.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <h3 className="font-medium text-white/90 mb-3 leading-8 border-b">
                Recipient's bank details
              </h3>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="accountHolderName"
                    className="text-mainheadingWhite block capitalize text-sm lg:text-base"
                  >
                    Full name of the account holder
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="accountHolderName"
                    className={`mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500  text-white focus:outline-0 ${
                      accountHolderNameError
                        ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
                        : "focus:border-gray-500"
                    }`}
                    value={accountHolderName}
                    placeholder="e.g., John Doe"
                    onChange={(e) => {
                      setAccountHolderName(e.target.value);
                      if (accountHolderNameError) setAccountHolderNameError("");
                    }}
                    required
                    aria-invalid={!!accountHolderNameError}
                    aria-describedby={
                      accountHolderNameError
                        ? "accountHolderName-error"
                        : undefined
                    }
                  />
                  {accountHolderNameError && (
                    <p
                      id="accountHolderName-error"
                      className="flex text-red-500 text-xs items-center mt-1"
                      role="alert"
                    >
                      <IoMdCloseCircle className="size-3.5 mr-1 shrink-0" />
                      {accountHolderNameError}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="ifscCode"
                    className="text-mainheadingWhite block capitalize text-sm lg:text-base"
                  >
                    IFSC code <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    className={`mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500  text-white focus:outline-0 ${
                      ifscCodeError || ifscApiError
                        ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
                        : "focus:border-gray-500"
                    }`}
                    value={ifscCode}
                    placeholder="e.g., YESB0123456"
                    onChange={(e) => {
                      const val = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "");
                      setIfscCode(val.slice(0, 11));
                      if (ifscCodeError) setIfscCodeError("");
                      if (ifscApiError) setIfscApiError("");
                      setFetchedBankName("");
                      setFetchedAddress("");
                    }}
                    onBlur={handleIfscBlur}
                    required
                    aria-invalid={!!ifscCodeError || !!ifscApiError}
                    aria-describedby={
                      ifscCodeError
                        ? "ifscCode-error"
                        : ifscApiError
                        ? "ifsc-api-error"
                        : undefined
                    }
                    maxLength={11}
                  />
                  {ifscCodeError && (
                    <p
                      id="ifscCode-error"
                      className="flex text-red-500 text-xs items-center mt-1"
                      role="alert"
                    >
                      <IoMdCloseCircle className="size-3.5 mr-1 shrink-0" />
                      {ifscCodeError}
                    </p>
                  )}
                  {isFetchingBankDetails && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Fetching bank details...
                    </div>
                  )}
                  {ifscApiError && !isFetchingBankDetails && (
                    <p
                      id="ifsc-api-error"
                      className="flex text-red-500 text-xs items-center mt-1"
                      role="alert"
                    >
                      <IoMdCloseCircle className="size-3.5 mr-1 shrink-0" />
                      {ifscApiError}
                    </p>
                  )}
                  {!isFetchingBankDetails &&
                    fetchedBankName &&
                    fetchedAddress &&
                    !ifscApiError &&
                    !ifscCodeError && (
                      <div className="mt-3 p-3 bg-primarybox rounded-lg border space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-subheadingWhite">
                            Bank Name
                          </label>
                          <p className="text-sm text-mainheadingWhite">
                            {fetchedBankName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-subheadingWhite">
                            Branch Address
                          </label>
                          <p className="text-sm text-mainheadingWhite">
                            {fetchedAddress}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="accountNumber"
                    className="text-mainheadingWhite block capitalize text-sm lg:text-base"
                  >
                    Account number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="accountNumber"
                    className={`mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500  text-white focus:outline-0 ${
                      accountNumberError
                        ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
                        : "focus:border-gray-500"
                    }`}
                    value={accountNumber}
                    placeholder="Enter account number"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setAccountNumber(val);
                      if (accountNumberError) setAccountNumberError("");
                    }}
                    required
                    aria-invalid={!!accountNumberError}
                    aria-describedby={
                      accountNumberError ? "accountNumber-error" : undefined
                    }
                  />
                  {accountNumberError && (
                    <p
                      id="accountNumber-error"
                      className="flex text-red-500 text-xs items-center mt-1"
                      role="alert"
                    >
                      <IoMdCloseCircle className="size-3.5 mr-1 shrink-0" />
                      {accountNumberError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-mainheadingWhite block capitalize text-sm lg:text-base">
                    Account type <span className="text-red-500 ml-1">*</span>
                  </label>
                  <AccountTypeDropdown
                    value={accountType}
                    onChange={(value) => {
                      setAccountType(value);
                      if (accountTypeError) setAccountTypeError("");
                    }}
                    error={accountTypeError}
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-4 pt-4">
                <button
                  type="button"
                  className={`sm:order-1 order-2 text-primary bg-primarybox hover:bg-secondarybox font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all flex items-center justify-center`}
                  onClick={handleClearForm}
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className={`sm:order-2 order-1 bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                  disabled={isSubmitting || isFormInvalid}
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
                      <span>Confirming...</span>
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecipientPage;
