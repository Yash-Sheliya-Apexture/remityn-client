// // RecipientsPage.tsx
// "use client";
// import React, { useState, ChangeEvent } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { sampleRecipients } from "../../../data/transactions";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation'; // Import useRouter hook

// export default function RecipientsPag() {
// const [searchTerm, setSearchTerm] = useState<string>("");
// const router = useRouter(); // Initialize useRouter hook for navigation

// const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
// setSearchTerm(event.target.value);
// };

// const filteredRecipients = sampleRecipients.filter((recipient) => {
// const recipientName = recipient.accountHolderName;
// if (recipientName) {
// return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
// }
// return false;
// });

// const handleAddRecipientClick = () => {
// // Navigate to the add recipient page when the button is clicked
// router.push('/dashboard/recipients/addrecipient'); // Assuming your add recipient page is located at /dashboard/recipients/add
// };

// return (
// <section className="Beneficiaries-Page py-10">
// <div className="container mx-auto">
// <div className="mb-8">
// {/* Recipients Title */}
// <h1 className="text-3xl font-semibold text-main">Recipients</h1>
// </div>

// {/* Search and Add Recipient */}
// <div className="flex items-center space-x-4 mb-6">
// <div className="relative flex-1">
// <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
// <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
// </div>
// <input
// type="text"
// className="block w-full pl-14 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
// placeholder="Search existing recipients"
// value={searchTerm}
// onChange={handleSearchChange}
// />
// </div>
// {/* Add recipient button with onClick handler */}
// <button
// type="button"
// className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
// onClick={handleAddRecipientClick} // Call handleAddRecipientClick function on button click
// >
// Add recipient
// </button>
// </div>

// {/* Conditional Rendering of Sections */}
// {filteredRecipients.length > 0 ? (
// <div>
// {/* All Label */}
// <div>
// <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
// All
// </h3>

// {/* Recipients List */}
// <div className="pt-4 space-y-2">
// {filteredRecipients.map((recipient) => (
// <RecipientList
// key={recipient.id}
// recipient={recipient}
// isSelected={false}
// showCheckbox={false}
// />
// ))}
// </div>
// </div>
// </div>
// ) : (
// <div>
// {/* Can't find Label */}
// <div>
// <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
// Can't find your recipient?
// </h3>

// <div className="mt-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
// <div className="flex items-center justify-between">
// <div className="flex items-center">
// <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
// <CiBank size={24}/>

// <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
// <FaCirclePlus className="text-green-400 bg-white" />
// </div>
// </div>
// <div className="ml-4">
// <h5 className="font-medium text-main capitalize">
// Enter their bank detials
// </h5>

// <p className="text-sm text-gray-600">
// you'll need their acoount information
// </p>
// </div>
// </div>
// <div className="">
// <IoIosArrowForward className="h-5 w-5 text-gray-500" />
// </div>
// </div>
// </div>
// </div>
// </div>
// )}
// </div>
// </section>
// );
// }

// // frontend/src/app/dashboard/recipients/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';

// export default function RecipientsPage() {
// const [searchTerm, setSearchTerm] = useState<string>("");
// const router = useRouter();
// const { token } = useAuth();
// const [recipients, setRecipients] = useState([]);
// const [loadingRecipients, setLoadingRecipients] = useState(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
// const fetchRecipients = async () => {
// setLoadingRecipients(true);
// setError(null);
// try {
// const data = await recipientService.getUserRecipients(token);
// setRecipients(data);
// } catch (err: any) {
// setError(err.message || 'Failed to load recipients.');
// console.error("Error fetching recipients:", err);
// } finally {
// setLoadingRecipients(false);
// }
// };

// if (token) {
// fetchRecipients();
// }
// }, [token]);

// const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
// setSearchTerm(event.target.value);
// };

// const filteredRecipients = recipients.filter((recipient) => {
// const recipientName = recipient.accountHolderName;
// if (recipientName) {
// return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
// }
// return false;
// });

// const handleAddRecipientClick = () => {
// router.push('/dashboard/recipients/addrecipient');
// };

// if (loadingRecipients) {
// return <section className="Beneficiaries-Page py-10"><div className="container mx-auto">Loading recipients...</div></section>;
// }

// if (error) {
// return <section className="Beneficiaries-Page py-10"><div className="container mx-auto text-red-500">Error loading recipients: {error}</div></section>;
// }

// return (
// <section className="Beneficiaries-Page py-10">
// <div className="container mx-auto">
// <div className="mb-8">
// <h1 className="text-3xl font-semibold text-main">Recipients</h1>
// {/* Conditionally render in small screen */}
// {isSmallScreen && ( // Conditionally render based on isSmallScreen state
// <button
// className="bg-primary text-secondary font-medium px-4 py-1 rounded-full"
// onClick={handleAddRecipientClick} // Add onClick handler for small screen button
// >
// Add
// </button>
// )}
// </div>

// <div className="flex items-center space-x-4 mb-6">
// <div className="relative flex-1">
// <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
// <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
// </div>
// <input
// type="text"
// className="block w-full pl-14 pr-10 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main" // Increased pr-10 to accommodate cancel icon
// placeholder="Search existing recipients"
// value={searchTerm}
// onChange={handleSearchChange}
// />
// {searchTerm && ( // Conditionally render the cancel icon
// <button
// onClick={clearSearchTerm}
// className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-main focus:outline-none" // Position cancel icon
// >
// <MdCancel size={24} aria-hidden="true" />
// </button>
// )}
// </div>
// <button
// type="button"
// className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
// onClick={handleAddRecipientClick}
// >
// Add recipient
// </button>
// </div>

// {filteredRecipients.length > 0 ? (
// <div>
// <div>
// <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
// All
// </h3>
// <div className="pt-4 space-y-2">
// {filteredRecipients.map((recipient) => (
// <RecipientList
// key={recipient._id}
// recipient={recipient}
// isSelected={false}
// showCheckbox={false}
// />
// ))}
// </div>
// </div>
// </div>
// ) : (
// <div>
// <div>
// <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
// Can't find your recipient?
// </h3>

// <div className="mt-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer" onClick={handleAddRecipientClick}>
// <div className="flex items-center justify-between">
// <div className="flex items-center">
// <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
// <CiBank size={24}/>
// <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
// <FaCirclePlus className="text-green-400 bg-white" />
// </div>
// </div>
// <div className="ml-4">
// <h5 className="font-medium text-main capitalize">
// Enter their bank detials
// </h5>
// <p className="text-sm text-gray-600">
// you'll need their acoount information
// </p>
// </div>
// </div>
// <div className="">
// <IoIosArrowForward className="h-5 w-5 text-gray-500" />
// </div>
// </div>
// </div>
// </div>
// </div>
// )}
// </div>
// </section>
// );
// }

// // frontend/src/app/dashboard/recipients/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../hooks/useAuth";
// import recipientService from "../../../services/recipient";
// import { MdCancel } from "react-icons/md"; // Import MdCancel icon
// import { Skeleton } from "@/components/ui/skeleton";

// export default function RecipientsPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const { token } = useAuth();
//   const [recipients, setRecipients] = useState([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // State to track screen size

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 768); // Example breakpoint, adjust as needed
//     };

//     checkScreenSize(); // Check initial screen size
//     window.addEventListener("resize", checkScreenSize); // Add listener for resize

//     return () => {
//       window.removeEventListener("resize", checkScreenSize); // Cleanup listener on unmount
//     };
//   }, []);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipients.");
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     }
//   }, [token]);

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   const filteredRecipients = recipients.filter((recipient) => {
//     const recipientName = recipient.accountHolderName;
//     if (recipientName) {
//       return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//     return false;
//   });

//   const handleAddRecipientClick = () => {
//     router.push("/dashboard/recipients/addrecipient");
//   };

//   if (loadingRecipients) {
//     return (
//       <>
//         <div className="flex justify-between">
//           <Skeleton className="h-8 w-36 mb-4 rounded-full" />
//           <Skeleton className="h-8 w-16 mb-4 rounded-full md:hidden block" />
//         </div>

//         <div className="mb-8 flex justify-between gap-4">
//           <Skeleton className="h-10 w-full rounded-full" />

//           <Skeleton className="h-10 w-40 rounded-full md:block hidden" />
//         </div>
//         <div className="space-y-2">
//           {Array(3)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="block">
//                 <div className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     {/* Icon Skeleton */}
//                     <div className="relative flex-shrink-0">
//                       <div className="flex items-center justify-center">
//                         <Skeleton className="h-12 w-12 rounded-full" />
//                       </div>
//                     </div>
//                     {/* Text and Button Skeletons */}
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         <Skeleton className="h-4 w-40 mb-2" />
//                         <Skeleton className="h-3 w-32" />
//                       </div>
//                       <div className="shrink-0">
//                         <Skeleton className="h-5 w-10 rounded-full" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Beneficiaries-Page py-10">
//         <div className="container mx-auto text-red-500">
//           Error loading recipients: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-6 flex items-center justify-between ">
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Recipients</h1>
//           {/* Conditionally render in small screen */}
//           {isSmallScreen && ( // Conditionally render based on isSmallScreen state
//             <button
//               className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium px-4 py-1 rounded-full transition-all duration-75 ease-linear cursor-pointer"
//               onClick={handleAddRecipientClick} // Add onClick handler for small screen button
//             >
//               Add
//             </button>
//           )}
//         </div>

//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Increased pr-10 to accommodate cancel icon
//               placeholder="Search existing recipients"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             {searchTerm && ( // Conditionally render the cancel icon
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer" // Position cancel icon
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//           {!isSmallScreen && (
//             <button
//               type="button"
//               className="inline-flex items-center bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
//               onClick={handleAddRecipientClick}
//             >
//               Add recipient
//             </button>
//           )}
//         </div>

//         {filteredRecipients.length > 0 ? (
//           <div>
//             <div>
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 All
//               </h3>
//               <div className="space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient._id}
//                     recipient={recipient}
//                     isSelected={false}
//                     showCheckbox={false}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div>
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Can't find your recipient?
//               </h3>

//               <div
//                 className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={handleAddRecipientClick}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative">
//                       <CiBank size={24} className="text-neutral-900 dark:text-white"/>
//                       <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                         <FaCirclePlus className="text-green-400 bg-white" />
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <h5 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                         Enter their bank detials
//                       </h5>
//                       <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                         you'll need their acoount information
//                       </p>
//                     </div>
//                   </div>
//                   <div className="">
//                     <IoIosArrowForward className="h-5 w-5 text-neutral-900 dark:text-white" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// // frontend/src/app/dashboard/recipients/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../contexts/AuthContext";
// import recipientService from "../../../services/recipient";
// import { MdCancel } from "react-icons/md"; // Import MdCancel icon
// import { Skeleton } from "@/components/ui/skeleton";

// // Define an interface for the Recipient object
// interface Recipient {
//   _id: string;
//   accountHolderName: string;
// }

// export default function RecipientsPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const { token } = useAuth();
//   const [recipients, setRecipients] = useState<Recipient[]>([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // State to track screen size

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 768); // Example breakpoint, adjust as needed
//     };

//     checkScreenSize(); // Check initial screen size
//     window.addEventListener("resize", checkScreenSize); // Add listener for resize

//     return () => {
//       window.removeEventListener("resize", checkScreenSize); // Cleanup listener on unmount
//     };
//   }, []);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         // Assuming recipientService.getUserRecipients returns an array of Recipient
//         const data: Recipient[] = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//       } catch (err: unknown) { // <-- Changed from 'any' to 'unknown'
//         // Type guard to safely access error message
//         let message = "Failed to load recipients.";
//         if (err instanceof Error) {
//           message = err.message;
//         } else if (typeof err === 'string') {
//             message = err;
//         }
//         setError(message);
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     }
//   }, [token]);

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   // Explicitly type the recipient parameter in the filter callback
//   const filteredRecipients = recipients.filter((recipient: Recipient) => {
//     const recipientName = recipient.accountHolderName;
//     // Ensure recipientName is truthy before calling toLowerCase
//     return recipientName ? recipientName.toLowerCase().includes(searchTerm.toLowerCase()) : false;
//   });

//   const handleAddRecipientClick = () => {
//     router.push("/dashboard/recipients/addrecipient");
//   };

//   if (loadingRecipients) {
//     return (
//       <>
//         <div className="flex justify-between">
//           <Skeleton className="h-8 w-36 mb-4 rounded-full" />
//           <Skeleton className="h-8 w-16 mb-4 rounded-full md:hidden block" />
//         </div>

//         <div className="mb-8 flex justify-between gap-4">
//           <Skeleton className="h-10 w-full rounded-full" />

//           <Skeleton className="h-10 w-40 rounded-full md:block hidden" />
//         </div>
//         <div className="space-y-2">
//           {Array(3)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="block">
//                 <div className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     {/* Icon Skeleton */}
//                     <div className="relative flex-shrink-0">
//                       <div className="flex items-center justify-center">
//                         <Skeleton className="h-12 w-12 rounded-full" />
//                       </div>
//                     </div>
//                     {/* Text and Button Skeletons */}
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         <Skeleton className="h-4 w-40 mb-2" />
//                         <Skeleton className="h-3 w-32" />
//                       </div>
//                       <div className="shrink-0">
//                         <Skeleton className="h-5 w-10 rounded-full" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Beneficiaries-Page py-10">
//         <div className="container mx-auto text-red-500">
//           Error loading recipients: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-6 flex items-center justify-between ">
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Recipients</h1>
//           {/* Conditionally render in small screen */}
//           {isSmallScreen && ( // Conditionally render based on isSmallScreen state
//             <button
//               className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium px-4 py-1 rounded-full transition-all duration-75 ease-linear cursor-pointer"
//               onClick={handleAddRecipientClick} // Add onClick handler for small screen button
//             >
//               Add
//             </button>
//           )}
//         </div>

//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Increased pr-10 to accommodate cancel icon
//               placeholder="Search existing recipients"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             {searchTerm && ( // Conditionally render the cancel icon
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer" // Position cancel icon
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//           {!isSmallScreen && (
//             <button
//               type="button"
//               className="inline-flex items-center bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
//               onClick={handleAddRecipientClick}
//             >
//               Add recipient
//             </button>
//           )}
//         </div>

//         {filteredRecipients.length > 0 ? (
//           <div>
//             <div>
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 All
//               </h3>
//               <div className="space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient._id}
//                     recipient={recipient}
//                     isSelected={false} // These props seem static, confirm if needed
//                     showCheckbox={false} // These props seem static, confirm if needed
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div>
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 {/* Fixed unescaped entity */}
//                 Can&apos;t find your recipient?
//               </h3>

//               <div
//                 className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={handleAddRecipientClick}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative">
//                       <CiBank size={24} className="text-neutral-900 dark:text-white"/>
//                       <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                         <FaCirclePlus className="text-green-400 bg-white" />
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <h5 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                         Enter their bank details
//                       </h5>
//                       <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
//                         {/* Fixed unescaped entity and typo */}
//                         you&apos;ll need their account information
//                       </p>
//                     </div>
//                   </div>
//                   <div className="">
//                     <IoIosArrowForward className="h-5 w-5 text-neutral-900 dark:text-white" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// // frontend/src/app/dashboard/recipients/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect, useCallback } from "react"; // Added useCallback
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList"; // Adjust path if needed
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import recipientService from "../../../services/recipient"; // Adjust path if needed
// import { MdCancel } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import KycRequiredModal from "@/app/dashboard/components/KycRequiredModal"; // *** IMPORT KYC MODAL *** Adjust path if needed

// // --- Interfaces ---
// interface Recipient {
//   _id: string;
//   accountHolderName: string;
//   // Add other recipient fields if needed by RecipientList
// }
// // --- Assumed User structure from useAuth ---
// interface AuthUser {
//   kycStatus:
//     | "verified"
//     | "pending"
//     | "not_started"
//     | "rejected"
//     | null
//     | undefined;
// }
// interface AuthContextType {
//   token: string | null;
//   user: AuthUser | null;
// }

// export default function RecipientsPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const { token, user } = useAuth() as AuthContextType; // *** Get user from useAuth ***
//   const [recipients, setRecipients] = useState<Recipient[]>([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false); // *** State for KYC Modal ***

//   // --- Determine KYC Status ---
//   const isKycVerified = user?.kycStatus === "verified";

//   // --- Screen Size Effect ---
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 768); // md breakpoint
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // --- Fetch Recipients Effect ---
//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         const data: Recipient[] = await recipientService.getUserRecipients(
//           token
//         );
//         setRecipients(data);
//       } catch (err: unknown) {
//         let message = "Failed to load recipients.";
//         if (err instanceof Error) message = err.message;
//         else if (typeof err === "string") message = err;
//         setError(message);
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     } else {
//       setLoadingRecipients(false); // Stop loading if no token
//       // Optional: Redirect to login if needed, or rely on parent layout checks
//       // if (!loadingRecipients && !error) router.replace('/auth/login');
//     }
//   }, [token]); // Removed router from dependencies here unless redirect is added

//   // --- Search Handlers ---
//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   // --- Filter Recipients ---
//   const filteredRecipients = recipients.filter((recipient: Recipient) => {
//     const recipientName = recipient.accountHolderName;
//     return recipientName
//       ? recipientName.toLowerCase().includes(searchTerm.toLowerCase())
//       : false;
//   });

//   // --- KYC Modal Actions ---
//   const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//   const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//   const handleStartVerification = useCallback(() => {
//     router.push("/dashboard/kyc"); // Adjust path to your KYC page
//     handleCloseKycModal();
//   }, [router, handleCloseKycModal]);

//   // --- Add Recipient Handler (with KYC Check) ---
//   const handleAddRecipientClick = useCallback(() => {
//     // *** Check KYC Status FIRST ***
//     if (!isKycVerified) {
//       console.log("KYC not verified. Showing KYC modal.");
//       handleOpenKycModal();
//       return; // Stop processing
//     }

//     // --- Proceed only if KYC is verified ---
//     console.log("KYC verified. Navigating to add recipient page.");
//     router.push("/dashboard/recipients/addrecipient"); // Adjust path if needed
//   }, [isKycVerified, handleOpenKycModal, router]); // Add dependencies

//   // --- Loading State ---
//   if (loadingRecipients) {
//     return (
//       <section className="py-10">
        
//         {/* Added section wrapper for consistency */}
//         <div className="container mx-auto">
          
//           {/* Added container */}
//           <div className="flex justify-between items-center mb-6">
            
//             {/* Matched header structure */}
//             <Skeleton className="h-8 w-36 rounded-md" />
//             <Skeleton className="h-10 w-24 rounded-full md:hidden block" />
//           </div>
//           <div className="mb-8 flex items-center gap-4">
            
//             {/* Matched search/button structure */}
//             <Skeleton className="h-12.5 flex-1 rounded-full" />
//             <Skeleton className="h-12.5 w-36 rounded-full hidden md:block" />
//           </div>
//           {/* List Skeleton */}
//           <Skeleton className="h-6 w-20 mb-3 rounded-md" />
//           {/* "All" heading skeleton */}
//           <div className="space-y-2">
//             {Array(3)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block">
//                   <div className="block p-2 sm:p-4 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                       {/* Icon Skeleton */}
//                       <div className="relative flex-shrink-0">
//                         <div className="flex items-center justify-center">
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                       </div>
//                       {/* Text and Button Skeletons */}
//                       <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                         <div className="flex-grow">
//                           <Skeleton className="h-4 w-40 mb-2" />
//                           <Skeleton className="h-3 w-32" />
//                         </div>
//                         <div className="shrink-0">
//                           <Skeleton className="h-5 w-10 rounded-full" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // --- Error State ---
//   if (error) {
//     return (
//       <section className="py-10">
//         <div className="container mx-auto text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md">
//           Error loading recipients: {error}
//         </div>
//       </section>
//     );
//   }

//   // --- Main Content ---
//   return (
//     <>
//       {/* Use Fragment to render section and modal */}
//       <section className="Beneficiaries-Page py-10">
//         <div className="container mx-auto">
//           {/* Header */}
//           <div className="mb-6 flex items-center justify-between ">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Recipients
//             </h1>
//             {/* Add Button (Small Screens) */}
//             {isSmallScreen && (
//               <button
//                 className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium px-4 py-1 h-10 rounded-full transition-all duration-75 ease-linear cursor-pointer flex items-center justify-center" // Added height and flex for consistency
//                 onClick={handleAddRecipientClick} // Uses the KYC-aware handler
//               >
//                 Add
//               </button>
//             )}
//           </div>

//           {/* Search and Add Button (Larger Screens) */}
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch
//                   className="size-5 text-neutral-900 dark:text-white"
//                   aria-hidden="true"
//                 />
//               </div>
//               <input
//                 type="text"
//                 className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Adjusted styles
//                 placeholder="Search existing recipients"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               {searchTerm && (
//                 <button
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-600 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white focus:outline-none cursor-pointer"
//                 >
//                   <MdCancel size={20} aria-hidden="true" />
//                 </button>
//               )}
//             </div>
//             {/* Add Button (Larger Screens) */}
//             {!isSmallScreen && (
//               <button
//                 type="button"
//                 className="inline-flex items-center bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={handleAddRecipientClick} // Uses the KYC-aware handler
//               >
//                 Add recipient
//               </button>
//             )}
//           </div>

//           {/* Recipient List or "Add New" Prompt */}
//           {filteredRecipients.length > 0 ? (
//             // Display List
//             <div>
//               <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
//                 All Recipients
//               </h3>
//               <div className="space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient._id}
//                     recipient={recipient}
//                     isSelected={false} // Keep as is unless dynamic selection is needed
//                     showCheckbox={false} // Keep as is unless needed
//                     // Pass any other necessary props to RecipientList
//                   />
//                 ))}
//               </div>
//             </div>
//           ) : (
//             // Display "Add New" Prompt
//             <div>
//               <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
//                 {searchTerm
//                   ? "No matching recipients found"
//                   : "No recipients yet"}
//               </h3>
//               {/* "Add New" Card */}
//               <div
//                 className="block hover:bg-lightgray dark:hover:bg-primarybox p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer border border-dashed border-gray-300 dark:border-gray-600" // Added border style
//                 onClick={handleAddRecipientClick} // Uses the KYC-aware handler
//                 role="button" // Accessibility
//                 tabIndex={0} // Accessibility
//                 onKeyPress={(e) =>
//                   e.key === "Enter" && handleAddRecipientClick()
//                 } // Accessibility
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
                    
//                     {/* Added gap */}
//                     <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative flex-shrink-0">
                      
//                       {/* Added flex-shrink-0 */}
//                       <CiBank
//                         size={24}
//                         className="text-neutral-900 dark:text-white"
//                       />
//                       <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden bg-white dark:bg-secondarybox flex items-center justify-center border-2 border-white dark:border-background">
                        
//                         {/* Adjusted plus icon container */}
//                         <FaCirclePlus size={18} className="text-green-500" />
//                       </div>
//                     </div>
//                     <div className="min-w-0">
                      
//                       {/* Added min-w-0 for truncation */}
//                       <h5 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                         Add a new recipient
//                       </h5>
//                       <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 truncate">
//                         You'll need their bank details
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex-shrink-0">
                    
//                     {/* Added flex-shrink-0 */}
//                     <IoIosArrowForward className="h-5 w-5 text-neutral-600 dark:text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//       {/* Render KYC Modal */}
//       <KycRequiredModal
//         isOpen={isKycModalOpen}
//         onClose={handleCloseKycModal}
//         onStartVerification={handleStartVerification}
//       />
//     </>
//   );
// }




// "use client";
// import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList"; // Adjust path if needed
// import { CiBank } from "react-icons/ci";
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import recipientService from "../../../services/recipient"; // Adjust path if needed
// import { MdCancel } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import KycRequiredModal from "@/app/dashboard/components/KycRequiredModal"; // Adjust path if needed

// // --- Interfaces ---
// interface Recipient {
//   _id: string;
//   accountHolderName: string;
//   // Add other recipient fields if needed by RecipientList
// }

// // --- Updated AuthUser structure to match AddMoney page ---
// interface AuthUser {
//   kyc: { // *** Assume nested structure is correct ***
//     status:
//       | "verified"
//       | "pending"
//       | "not_started"
//       | "rejected"
//       | null
//       | undefined;
//   };
//   // Add other relevant user fields if necessary
// }

// // --- Updated AuthContextType ---
// interface AuthContextType {
//   token: string | null;
//   user: AuthUser | null;
//   loading: boolean; // *** Add loading state from useAuth ***
// }

// export default function RecipientsPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   // *** Get loading state from useAuth ***
//   const { token, user, loading: isAuthLoading } = useAuth() as AuthContextType;
//   const [recipients, setRecipients] = useState<Recipient[]>([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);

//   // --- Determine KYC Status (consider auth loading state) ---
//   // *** Check nested structure and ensure auth is loaded ***
//   const isKycVerified = !isAuthLoading && user?.kyc?.status === "verified";

//   // --- Screen Size Effect ---
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 768); // md breakpoint
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // --- Fetch Recipients Effect ---
//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         // Only fetch if token exists
//         if (token) {
//             const data: Recipient[] = await recipientService.getUserRecipients(
//               token
//             );
//             setRecipients(data);
//         } else {
//             // No token, don't try to fetch, maybe rely on parent layout/redirect
//              console.log("RecipientsPage: No token found, skipping recipient fetch.");
//              // Set recipients to empty array if needed
//              setRecipients([]);
//         }
//       } catch (err: unknown) {
//         let message = "Failed to load recipients.";
//         if (err instanceof Error) message = err.message;
//         else if (typeof err === "string") message = err;
//         setError(message);
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     // Fetch only when token is available. If token disappears later, this effect won't refetch.
//     // If login/logout updates token, this will trigger correctly.
//     fetchRecipients();

//     // Optional: Redirect if no token *after* auth has loaded
//     if (!isAuthLoading && !token) {
//         console.log("RecipientsPage: No token after auth check, redirecting.");
//         // Consider a slight delay or check if component is still mounted if needed
//         // router.replace('/auth/login'); // Uncomment if redirect is desired here
//     }

//   }, [token, isAuthLoading, router]); // Add isAuthLoading and router (if redirecting)

//   // --- Search Handlers ---
//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   // --- Filter Recipients ---
//   const filteredRecipients = recipients.filter((recipient: Recipient) => {
//     const recipientName = recipient.accountHolderName;
//     return recipientName
//       ? recipientName.toLowerCase().includes(searchTerm.toLowerCase())
//       : false;
//   });

//   // --- KYC Modal Actions ---
//   const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//   const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//   const handleStartVerification = useCallback(() => {
//     // *** Ensure this path matches your KYC start page ***
//     router.push("/kyc/start"); // Or maybe '/kyc/start' depending on your routes
//     handleCloseKycModal();
//   }, [router, handleCloseKycModal]);

//   // --- Add Recipient Handler (with Auth Loading and KYC Check) ---
//   const handleAddRecipientClick = useCallback(() => {
//     // 1. Wait for auth loading to finish
//     if (isAuthLoading) {
//       console.log("Add Recipient Click: Waiting for auth...");
//       // Button should ideally be disabled while isAuthLoading is true
//       return;
//     }

//     // 2. Check KYC Status using the LATEST user object state
//     // *** Use the correct nested path ***
//     const currentKycStatus = user?.kyc?.status;
//     if (currentKycStatus !== "verified") {
//       console.log(
//         `Add Recipient Click: KYC status is '${currentKycStatus}'. Showing KYC modal.`
//       );
//       handleOpenKycModal();
//       return; // Stop processing
//     }

//     // --- Proceed only if KYC is verified ---
//     console.log("Add Recipient Click: KYC verified. Navigating to add recipient page.");
//     router.push("/dashboard/recipients/addrecipient"); // Adjust path if needed
//   }, [isAuthLoading, user, handleOpenKycModal, router]); // *** Depend on isAuthLoading and user ***

//   // Combined Loading State for Skeleton
//   const isLoading = loadingRecipients || isAuthLoading;

//   // --- Loading State ---
//   if (isLoading) { // *** Use combined loading state ***
//     return (
//       <section className="py-10">
//         <div className="">
//           {/* Header Skeleton */}
//           <div className="flex justify-between items-center mb-6">
//             <Skeleton className="h-8 w-36 rounded-md" />
//             <Skeleton className="h-10 w-24 rounded-full md:hidden block" />
//           </div>
//           {/* Search/Button Skeleton */}
//           <div className="mb-8 flex items-center gap-4">
//             <Skeleton className="h-12.5 flex-1 rounded-full" />
//             <Skeleton className="h-12.5 w-36 rounded-full hidden md:block" />
//           </div>
//           {/* List Skeleton */}
//           <Skeleton className="h-6 w-20 mb-3 rounded-md" />
//           <div className="space-y-2">
//             {Array(3)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block">
//                   <div className="block p-2 sm:p-4 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                       <div className="relative flex-shrink-0">
//                         <div className="flex items-center justify-center">
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                       </div>
//                       <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                         <div className="flex-grow">
//                           <Skeleton className="h-4 w-40 mb-2" />
//                           <Skeleton className="h-3 w-32" />
//                         </div>
//                         <div className="shrink-0">
//                           <Skeleton className="h-5 w-10 rounded-full" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // --- Error State (Only show recipient fetch error for now) ---
//   if (error) {
//     return (
//       <section className="py-10">
//         <div className="container mx-auto text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md">
//           Error loading recipients: {error}
//         </div>
//       </section>
//     );
//   }

//   // --- Main Content ---
//   return (
//     <>
//       <section className="Recipients-Page-Wrapper">
//         <div className="Recipients-Page">
//           {/* Header */}
//           <div className="mb-6 flex items-center justify-between ">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Recipients
//             </h1>
//             {/* Add Button (Small Screens) */}
//             {isSmallScreen && (
//               <button
//                 className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium px-4 py-1 h-12.5 w-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
//                 onClick={handleAddRecipientClick}
//                 disabled={isAuthLoading} // *** Disable button while auth is loading ***
//               >
//                 Add
//               </button>
//             )}
//           </div>

//           {/* Search and Add Button (Larger Screens) */}
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                 <FiSearch
//                   className="size-5 text-neutral-900 dark:text-white"
//                   aria-hidden="true"
//                 />
//               </div>
//               <input
//                 type="text"
//                 className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                 placeholder="Search existing recipients"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               {searchTerm && (
//                 <button
//                   onClick={clearSearchTerm}
//                   className="absolute inset-y-0 right-3 flex items-center text-neutral-600 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white focus:outline-none cursor-pointer"
//                 >
//                   <MdCancel size={20} aria-hidden="true" />
//                 </button>
//               )}
//             </div>
//             {/* Add Button (Larger Screens) */}
//             {!isSmallScreen && (
//               <button
//                 type="button"
//                 className="inline-flex items-center bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-8 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
//                 onClick={handleAddRecipientClick}
//                 disabled={isAuthLoading} // *** Disable button while auth is loading ***
//               >
//                 Add recipient
//               </button>
//             )}
//           </div>

//           {/* Recipient List or "Add New" Prompt */}
//           {/* Check if token exists before showing list/prompt */}
//           {!token && !isAuthLoading ? (
//             <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
//                 Please log in to view or add recipients.
//             </div>
//           ) : filteredRecipients.length > 0 ? (
//             // Display List
//             <div className="All-+Recipients">
//               <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
//                 All Recipients
//               </h3>
//               <div className="space-y-2">
//                 {filteredRecipients.map((recipient) => (
//                   <RecipientList
//                     key={recipient._id}
//                     recipient={recipient}
//                     isSelected={false}
//                     showCheckbox={false}
//                   />
//                 ))}
//               </div>
//             </div>
//           ) : (
//             // Display "Add New" Prompt
//             <div className="Add-New-Recipients">
//               <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
//                 {searchTerm
//                   ? "No matching recipients found"
//                   : "No recipients yet"}
//               </h3>
//               {/* "Add New" Card - Make it disabled if auth is loading */}
//               <div
//                 className={`block p-4 rounded-2xl transition-all duration-75 ease-linear border border-dashed border-gray-300 dark:border-gray-600 ${
//                   isAuthLoading
//                     ? "opacity-50 cursor-not-allowed" // Style for disabled state
//                     : "hover:bg-lightgray dark:hover:bg-primarybox cursor-pointer" // Style for enabled state
//                 }`}
//                 onClick={!isAuthLoading ? handleAddRecipientClick : undefined} // Prevent click if loading
//                 role="button"
//                 tabIndex={isAuthLoading ? -1 : 0} // Remove from tab order if loading
//                 onKeyPress={(e) =>
//                   !isAuthLoading && e.key === "Enter" && handleAddRecipientClick()
//                 }
//                 aria-disabled={isAuthLoading} // Accessibility
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative flex-shrink-0">
//                       <CiBank
//                         size={24}
//                         className="text-neutral-900 dark:text-white"
//                       />
//                       <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden bg-white dark:bg-secondarybox flex items-center justify-center border-2 border-white dark:border-background">
//                         <FaCirclePlus size={18} className="text-green-500" />
//                       </div>
//                     </div>
//                     <div className="min-w-0">
//                       <h5 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                         Add a new recipient
//                       </h5>
//                       <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 truncate">
//                         You'll need their bank details
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex-shrink-0">
//                     <IoIosArrowForward className="h-5 w-5 text-neutral-600 dark:text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//       {/* Render KYC Modal */}
//       <KycRequiredModal
//         isOpen={isKycModalOpen}
//         onClose={handleCloseKycModal}
//         onStartVerification={handleStartVerification}
//       />
//     </>
//   );
// }



"use client";
import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import RecipientList from "@/app/dashboard/components/RecipientList"; // Adjust path if needed
import { CiBank } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
import recipientService from "../../../services/recipient"; // Adjust path if needed
import { MdCancel } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
import KycRequiredModal from "@/app/dashboard/components/KycRequiredModal"; // Adjust path if needed

// --- Interfaces ---
interface Recipient {
  _id: string;
  accountHolderName: string;
  // Add other recipient fields if needed by RecipientList
}

// --- Updated AuthUser structure to match AddMoney page ---
interface AuthUser {
  kyc: { // *** Assume nested structure is correct ***
    status:
      | "verified"
      | "pending"
      | "not_started"
      | "rejected"
      | null
      | undefined;
  };
  // Add other relevant user fields if necessary
}

// --- Updated AuthContextType ---
interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  loading: boolean; // *** Add loading state from useAuth ***
}

export default function RecipientsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  // *** Get loading state from useAuth ***
  const { token, user, loading: isAuthLoading } = useAuth() as AuthContextType;
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  // --- Determine KYC Status (consider auth loading state) ---
  // *** Check nested structure and ensure auth is loaded ***
  const isKycVerified = !isAuthLoading && user?.kyc?.status === "verified";

  // --- Screen Size Effect ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // --- Fetch Recipients Effect ---
  useEffect(() => {
    const fetchRecipients = async () => {
      setLoadingRecipients(true);
      setError(null);
      try {
        // Only fetch if token exists
        if (token) {
            const data: Recipient[] = await recipientService.getUserRecipients(
              token
            );
            setRecipients(data);
        } else {
            // No token, don't try to fetch, maybe rely on parent layout/redirect
             console.log("RecipientsPage: No token found, skipping recipient fetch.");
             // Set recipients to empty array if needed
             setRecipients([]);
        }
      } catch (err: unknown) {
        let message = "Failed to load recipients.";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        setError(message);
        console.error("Error fetching recipients:", err);
      } finally {
        setLoadingRecipients(false);
      }
    };

    // Fetch only when token is available. If token disappears later, this effect won't refetch.
    // If login/logout updates token, this will trigger correctly.
    fetchRecipients();

    // Optional: Redirect if no token *after* auth has loaded
    if (!isAuthLoading && !token) {
        console.log("RecipientsPage: No token after auth check, redirecting.");
        // Consider a slight delay or check if component is still mounted if needed
        // router.replace('/auth/login'); // Uncomment if redirect is desired here
    }

  }, [token, isAuthLoading, router]); // Add isAuthLoading and router (if redirecting)

  // --- Search Handlers ---
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  // --- Filter Recipients ---
  const filteredRecipients = recipients.filter((recipient: Recipient) => {
    const recipientName = recipient.accountHolderName;
    return recipientName
      ? recipientName.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
  });

  // --- KYC Modal Actions ---
  const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
  const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
  const handleStartVerification = useCallback(() => {
    // *** Ensure this path matches your KYC start page ***
    router.push("/kyc/start"); // Or maybe '/kyc/start' depending on your routes
    handleCloseKycModal();
  }, [router, handleCloseKycModal]);

  // --- Add Recipient Handler (with Auth Loading and KYC Check) ---
  const handleAddRecipientClick = useCallback(() => {
    // 1. Wait for auth loading to finish
    if (isAuthLoading) {
      console.log("Add Recipient Click: Waiting for auth...");
      // Button should ideally be disabled while isAuthLoading is true
      return;
    }

    // 2. Check KYC Status using the LATEST user object state
    // *** Use the correct nested path ***
    const currentKycStatus = user?.kyc?.status;
    if (currentKycStatus !== "verified") {
      console.log(
        `Add Recipient Click: KYC status is '${currentKycStatus}'. Showing KYC modal.`
      );
      handleOpenKycModal();
      return; // Stop processing
    }

    // --- Proceed only if KYC is verified ---
    console.log("Add Recipient Click: KYC verified. Navigating to add recipient page.");
    router.push("/dashboard/recipients/addrecipient"); // Adjust path if needed
  }, [isAuthLoading, user, handleOpenKycModal, router]); // *** Depend on isAuthLoading and user ***

  // Combined Loading State for Skeleton
  const isLoading = loadingRecipients || isAuthLoading;

  // --- Loading State ---
  if (isLoading) { // *** Use combined loading state ***
    return (
      <section className="py-10">
        <div className="">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-36 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-full md:hidden block" />
          </div>
          {/* Search/Button Skeleton */}
          <div className="mb-8 flex items-center gap-4">
            <Skeleton className="h-12.5 flex-1 rounded-full" />
            <Skeleton className="h-12.5 w-36 rounded-full hidden md:block" />
          </div>
          {/* List Skeleton */}
          <Skeleton className="h-6 w-20 mb-3 rounded-md" />
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="block">
                  <div className="block p-2 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="flex items-center justify-center">
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-grow flex flex-row justify-between items-center gap-4">
                        <div className="flex-grow">
                          <Skeleton className="h-4 w-40 mb-2" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <div className="shrink-0">
                          <Skeleton className="h-5 w-10 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  // --- Error State (Only show recipient fetch error for now) ---
  if (error) {
    return (
      <section className="py-10">
        <div className="container mx-auto text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md">
          Error loading recipients: {error}
        </div>
      </section>
    );
  }

  // --- Main Content ---
  return (
    <>
      <section className="Recipients-Page-Wrapper">
        <div className="Recipients-Page">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between ">
            <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
              Recipients
            </h1>
            {/* Add Button (Small Screens) */}
            {isSmallScreen && (
              <button
                className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium px-4 py-1 h-12.5 w-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                onClick={handleAddRecipientClick}
                disabled={isAuthLoading} // *** Disable button while auth is loading ***
              >
                Add
              </button>
            )}
          </div>

          {/* Search and Add Button (Larger Screens) */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FiSearch
                  className="size-5 text-neutral-900 dark:text-white"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
                placeholder="Search existing recipients"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button
                  onClick={clearSearchTerm}
                  className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
                >
                  <MdCancel size={20} aria-hidden="true" />
                </button>
              )}
            </div>
            {/* Add Button (Larger Screens) */}
            {!isSmallScreen && (
              <button
                type="button"
                className="inline-flex items-center bg-primary text-neutral-900 hover:bg-primaryhover space-x-3 py-3 px-8 h-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                onClick={handleAddRecipientClick}
                disabled={isAuthLoading} // *** Disable button while auth is loading ***
              >
                Add recipient
              </button>
            )}
          </div>

          {/* Recipient List or "Add New" Prompt */}
          {/* Check if token exists before showing list/prompt */}
          {!token && !isAuthLoading ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                Please log in to view or add recipients.
            </div>
          ) : filteredRecipients.length > 0 ? (
            // Display List
            <div className="All-+Recipients">
              <h3 className="font-medium text-sm text-gray-500 dark:text-gray-300 mb-3 uppercase tracking-wide leading-8 border-b">
                All Recipients
              </h3>
              <div className="space-y-2">
                {filteredRecipients.map((recipient) => (
                  <RecipientList
                    key={recipient._id}
                    recipient={recipient}
                    isSelected={false}
                    showCheckbox={false}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Display "Add New" Prompt
            <div className="Add-New-Recipients">
              <h3 className="font-medium text-sm text-gray-500 dark:text-gray-300 mb-3 uppercase tracking-wide leading-8 border-b">
                {searchTerm
                  ? "No matching recipients found"
                  : "No recipients yet"}
              </h3>
              {/* "Add New" Card - Make it disabled if auth is loading */}
              <div
                className={`block p-4 rounded-2xl transition-all duration-75 ease-linear border-2 border-dashed ${
                  isAuthLoading
                    ? "opacity-50 cursor-not-allowed" // Style for disabled state
                    : "hover:bg-lightgray dark:hover:bg-primarybox cursor-pointer" // Style for enabled state
                }`}
                onClick={!isAuthLoading ? handleAddRecipientClick : undefined} // Prevent click if loading
                role="button"
                tabIndex={isAuthLoading ? -1 : 0} // Remove from tab order if loading
                onKeyPress={(e) =>
                  !isAuthLoading && e.key === "Enter" && handleAddRecipientClick()
                }
                aria-disabled={isAuthLoading} // Accessibility
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12.5 h-12.5 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative flex-shrink-0">
                      <CiBank
                        size={24}
                        className="text-neutral-900 dark:text-white"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden bg-white dark:bg-secondarybox flex items-center justify-center border-2 border-white dark:border-background">
                        <FaCirclePlus size={18} className="text-green-500" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
                        Add a new recipient
                      </h5>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 truncate">
                        You'll need their bank details
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <IoIosArrowForward className="h-5 w-5 text-neutral-600 dark:text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Render KYC Modal */}
      <KycRequiredModal
        isOpen={isKycModalOpen}
        onClose={handleCloseKycModal}
        onStartVerification={handleStartVerification}
      />
    </>
  );
}