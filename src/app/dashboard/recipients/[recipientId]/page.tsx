// // app/dashboard/beneficiaries/[recipientId]/page.tsx
// "use client";
// import React from "react";
// import { useParams } from "next/navigation";
// import { sampleRecipients, Recipient } from "@/app/data/transactions";
// import Image from "next/image";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;

//   // Find the recipient based on recipientId
//   const recipient: Recipient | undefined = sampleRecipients.find(
//     (rec) => String(rec.id) === recipientId
//   );

//   if (!recipient) {
//     return <div>Recipient not found</div>; // Handle case where recipient is not found
//   }

//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={24}
//                   height={24}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="text-3xl font-semibold text-main capitalize">
//             {recipient.accountHolderName}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//               Send
//             </button>
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer">
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//             Account Details
//           </h3>
//           <div className="grid grid-cols-2 gap-8">
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main font-medium capitalize">
//                 {recipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               {/* Add Nickname Button */}
//               <div className="flex items-center gap-4">
//                 <p className="text-main font-medium hidden">{recipient.nickname}</p>
//                 <button className="cursor-pointer text-sm underline text-secondary font-medium">
//                   Add Nickname
//                 </button>
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.accountType}
//               </p>{" "}
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.ifscCode}</p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.bankName}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.address}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;

// // app/dashboard/beneficiaries/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { sampleRecipients, Recipient } from "@/app/data/transactions";
// import Image from "next/image";
// import NicknamePopup from "../../components/NicknamePopup"; // Import the component
// import { IoPencilOutline } from "react-icons/io5";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;

//   // State to hold the current recipient data (mutable for nickname update)
//   const [currentRecipient, setCurrentRecipient] = useState<Recipient | undefined>(undefined);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState(""); // Initialize nicknameInput outside useEffect

//   useEffect(() => {
//     // Find the recipient based on recipientId
//     const recipient: Recipient | undefined = sampleRecipients.find(
//       (rec) => String(rec.id) === recipientId
//     );
//     setCurrentRecipient(recipient);

//     // Initialize nicknameInput only after currentRecipient is set
//     if (recipient) {
//       setNicknameInput(recipient.nickname || "");
//     } else {
//       setNicknameInput(""); // Ensure nicknameInput is set even if recipient is not found
//     }

//   }, [recipientId]); // nicknameInput removed from dependency array

//   if (!currentRecipient) {
//     return <div>Recipient not found</div>; // Handle case where recipient is not found
//   }

//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || ""); // Reset input to current nickname when opening
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = () => {
//     // Find the index of the recipient in sampleRecipients
//     const recipientIndex = sampleRecipients.findIndex(rec => String(rec.id) === recipientId);

//     if (recipientIndex !== -1) {
//       // Update the nickname in sampleRecipients (for demonstration)
//       sampleRecipients[recipientIndex] = { ...sampleRecipients[recipientIndex], nickname: nicknameInput || undefined }; // Save as undefined if input is empty

//       // Update the local state to re-render with the new nickname
//       setCurrentRecipient({ ...currentRecipient, nickname: nicknameInput || undefined });
//     }
//     setIsNicknamePopupOpen(false);
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(currentRecipient.accountHolderName)}
//             </span>
//             {currentRecipient.countryCode === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={24}
//                   height={24}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="text-3xl font-semibold text-main capitalize">
//             {currentRecipient.nickname || currentRecipient.accountHolderName}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//               Send
//             </button>
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer">
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//             Account Details
//           </h3>
//           <div className="grid grid-cols-2 gap-8">
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main font-medium capitalize">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               {/* Nickname Display and Add/Edit Button */}
//               <div className="flex items-center gap-4">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main font-medium">{currentRecipient.nickname}</p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>

//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountType}
//               </p>{" "}
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.bankName}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.address}</p>
//             </div>
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-1 text-gray font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
//             onClick={handleSaveNickname}
//           >
//             Save
//           </button>
//         </NicknamePopup>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;

// // frontend/src/app/dashboard/recipients/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { IoPencilOutline } from "react-icons/io5";
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// // import DashboardHeader from '@/components/layout/DashboardHeader';

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;
//   const { token } = useAuth();

//   const [currentRecipient, setCurrentRecipient] = useState<any | null>(null); // Use 'any' for now, refine type later
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         const data = await recipientService.getRecipientById(recipientId, token);
//         setCurrentRecipient(data);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load recipient details.');
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     if (token && recipientId) {
//       fetchRecipientDetails();
//     }
//   }, [token, recipientId]);

//   if (loadingRecipient) {
//     return <div className="RecipientDetailsPage py-10"><div className="container mx-auto">Loading recipient details...</div></div>;
//   }

//   if (error || !currentRecipient) {
//     return <div className="RecipientDetailsPage py-10"><div className="container mx-auto text-red-500">Error loading recipient: {error || 'Recipient not found.'}</div></div>;
//   }

//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     try {
//       const updatedRecipient = await recipientService.updateRecipient(recipientId, { nickname: nicknameInput }, token);
//       setCurrentRecipient(updatedRecipient); // Update local state with updated recipient
//     } catch (err: any) {
//       setError(err.message || 'Failed to update nickname.');
//       console.error("Error updating nickname:", err);
//     }
//     setIsNicknamePopupOpen(false);
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       {/* <DashboardHeader title="Recipients" /> */}
//       <div className="container mx-auto px-4 max-w-2xl">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(currentRecipient.accountHolderName)}
//             </span>
//             {currentRecipient.currency.code === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   onError={() => console.error(`Error loading image for ${currentRecipient.currency.code}`)}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="text-3xl font-semibold text-main capitalize">
//             {currentRecipient.nickname || currentRecipient.accountHolderName}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//               Send
//             </button>
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer">
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//             Account Details
//           </h3>
//           <div className="grid grid-cols-2 gap-8">
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main font-medium capitalize">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main font-medium">{currentRecipient.nickname}</p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>

//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountType || "N/A"}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.bankName || "N/A"}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.address || "N/A"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-1 text-gray font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
//             onClick={handleSaveNickname}
//           >
//             Save
//           </button>
//         </NicknamePopup>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;

// // frontend/src/app/dashboard/recipients/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal"; // Import DeleteRecipientModal

// interface RecipientDetailsPageProps {
//     params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//     const params = useParams();
//     const recipientId = params.recipientId;
//     const { token } = useAuth();
//     const router = useRouter();

//     const [currentRecipient, setCurrentRecipient] = useState<any | null>(null);
//     const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//     const [nicknameInput, setNicknameInput] = useState("");
//     const [loadingRecipient, setLoadingRecipient] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal

//     useEffect(() => {
//         const fetchRecipientDetails = async () => {
//             setLoadingRecipient(true);
//             setError(null);
//             try {
//                 const data = await recipientService.getRecipientById(recipientId, token);
//                 setCurrentRecipient(data);
//             } catch (err: any) {
//                 setError(err.message || 'Failed to load recipient details.');
//                 console.error("Error fetching recipient details:", err);
//             } finally {
//                 setLoadingRecipient(false);
//             }
//         };

//         if (token && recipientId) {
//             fetchRecipientDetails();
//         }
//     }, [token, recipientId]);

//     if (loadingRecipient) {
//         return <div className="RecipientDetailsPage py-10"><div className="container mx-auto">Loading recipient details...</div></div>;
//     }

//     if (error || !currentRecipient) {
//         return <div className="RecipientDetailsPage py-10"><div className="container mx-auto text-red-500">Error loading recipient: {error || 'Recipient not found.'}</div></div>;
//     }

//     const getInitials = (accountHolderName: string) => {
//         const nameParts = accountHolderName.toUpperCase().split(" ");
//         let initials = "";
//         if (nameParts.length >= 2) {
//             initials = nameParts[0][0] + nameParts[1][0];
//         } else if (nameParts.length === 1) {
//             initials = nameParts[0].slice(0, 2);
//         }
//         return initials;
//     };

//     const handleAddNicknameClick = () => {
//         setNicknameInput(currentRecipient.nickname || "");
//         setIsNicknamePopupOpen(true);
//     };

//     const handleCloseNicknamePopup = () => {
//         setIsNicknamePopupOpen(false);
//     };

//     const handleSaveNickname = async () => {
//         try {
//             const updatedRecipient = await recipientService.updateRecipient(recipientId, { nickname: nicknameInput }, token);
//             setCurrentRecipient(updatedRecipient);
//         } catch (err: any) {
//             setError(err.message || 'Failed to update nickname.');
//             console.error("Error updating nickname:", err);
//         }
//         setIsNicknamePopupOpen(false);
//     };

//     const handleDeleteRecipientClick = () => {
//         setIsDeleteModalOpen(true); // Open delete confirmation modal
//     };

//     const handleCancelDeleteRecipient = () => {
//         setIsDeleteModalOpen(false); // Close delete confirmation modal
//     };

//     const handleConfirmDeleteRecipient = async () => {
//         setIsDeleteModalOpen(false); // Close modal after initiating delete
//         setLoadingRecipient(true); // Start loading state during deletion
//         setError(null); // Clear any previous errors
//         try {
//             await recipientService.deleteRecipient(recipientId, token);
//             router.push('/dashboard/recipients'); // Redirect to recipients list after successful deletion
//         } catch (err: any) {
//             setError(err.message || 'Failed to delete recipient.');
//             console.error("Error deleting recipient:", err);
//             setLoadingRecipient(false); // Stop loading state in case of error
//         }
//     };

//     return (
//         <div className="RecipientDetailsPage py-10">
//             <DashboardHeader title="Recipients" />
//             <div className="container mx-auto px-4 max-w-2xl">
//                 {/* Profile Section */}
//                 <div className="flex flex-col mb-8 space-y-4">
//                     <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//                         <span className="font-bold text-2xl text-gray-700">
//                             {getInitials(currentRecipient.accountHolderName)}
//                         </span>
//                         {currentRecipient.currency.code === "INR" && (
//                             <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                                 <Image
//                                     src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                                     alt={`${currentRecipient.currency.code} flag`}
//                                     width={24}
//                                     height={24}
//                                     onError={() => console.error(`Error loading image for ${currentRecipient.currency.code}`)}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                     <h2 className="text-3xl font-semibold text-main capitalize">
//                         {currentRecipient.nickname || currentRecipient.accountHolderName}
//                     </h2>
//                     <div className="flex items-center gap-4">
//                         <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//                             Send
//                         </button>
//                         <button
//                             className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer"
//                             onClick={handleDeleteRecipientClick} // Open delete modal on click
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </div>

//                 {/* Account Details Section */}
//                 <div className="mb-6 pb-4">
//                     <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//                         Account Details
//                     </h3>
//                     <div className="grid grid-cols-2 gap-8">
//                         {/* ... (rest of Account Details section remains the same) */}
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Account holder name
//                             </label>
//                             <p className="mt-1 text-main font-medium capitalize">
//                                 {currentRecipient.accountHolderName}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray">
//                                 Nickname
//                             </label>
//                             <div className="flex items-center gap-4">
//                                 {currentRecipient.nickname ? (
//                                     <div className="flex items-center gap-2">
//                                         <p className="text-main font-medium">{currentRecipient.nickname}</p>
//                                         <button
//                                             className="cursor-pointer text-sm underline text-secondary font-medium"
//                                             onClick={handleAddNicknameClick}
//                                         >
//                                             Edit
//                                         </button>
//                                     </div>

//                                 ) : (
//                                     <button
//                                         className="cursor-pointer text-sm underline text-secondary font-medium"
//                                         onClick={handleAddNicknameClick}
//                                     >
//                                         Add Nickname
//                                     </button>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Account type
//                             </label>
//                             <p className="mt-1 text-main font-medium">
//                                 {currentRecipient.accountType || "N/A"}
//                             </p>
//                         </div>
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 IFSC code
//                             </label>
//                             <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
//                         </div>

//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Account number
//                             </label>
//                             <p className="mt-1 text-main font-medium">
//                                 {currentRecipient.accountNumber}
//                             </p>
//                         </div>
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Email (Optional)
//                             </label>
//                             <p className="mt-1 text-main font-medium">
//                                 {currentRecipient.email || "-"}
//                             </p>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray">
//                                 Bank name
//                             </label>
//                             <p className="mt-1 text-main font-medium">{currentRecipient.bankName || "N/A"}</p>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray">
//                                 Address
//                             </label>
//                             <p className="mt-1 text-main font-medium">{currentRecipient.address || "N/A"}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Nickname Popup Component */}
//                 <NicknamePopup
//                     isOpen={isNicknamePopupOpen}
//                     onClose={handleCloseNicknamePopup}
//                     title="Add nickname"
//                     description="Add a nickname so you can easily find this account."
//                 >
//                     <div className="mb-4">
//                         <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
//                             Account nickname
//                         </label>
//                         <input
//                             type="text"
//                             id="nickname"
//                             className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
//                             placeholder="Enter nickname"
//                             maxLength={40}
//                             value={nicknameInput}
//                             onChange={(e) => setNicknameInput(e.target.value)}
//                         />
//                         <p className="mt-1 text-gray font-semibold text-xs">
//                             {nicknameInput.length}/40
//                         </p>
//                     </div>
//                     <button
//                         className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
//                         onClick={handleSaveNickname}
//                     >
//                         Save
//                     </button>
//                 </NicknamePopup>

//                 {/* Delete Recipient Modal */}
//                 <DeleteRecipientModal
//                     isOpen={isDeleteModalOpen}
//                     onClose={handleCancelDeleteRecipient}
//                     recipientName={currentRecipient.accountHolderName}
//                     onConfirmDelete={handleConfirmDeleteRecipient}
//                 />
//             </div>
//         </div>
//     );
// };

// export default RecipientDetailsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from "../../../hooks/useAuth";
// import recipientService from "../../../services/recipient";
// import DashboardHeader from "../../../components/layout/DashboardHeader";
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;
//   const { token } = useAuth();
//   const router = useRouter();

//   const [currentRecipient, setCurrentRecipient] = useState<any | null>(null);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         const data = await recipientService.getRecipientById(
//           recipientId,
//           token
//         );
//         setCurrentRecipient(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipient details.");
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     if (token && recipientId) {
//       fetchRecipientDetails();
//     }
//   }, [token, recipientId]);

//   if (loadingRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <div className="container mx-auto">Loading recipient details...</div>
//       </div>
//     );
//   }

//   if (error || !currentRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <div className="container mx-auto text-red-500">
//           Error loading recipient: {error || "Recipient not found."}
//         </div>
//       </div>
//     );
//   }

//   const getInitials = (accountHolderName: string) => {
//     const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
//     const nameParts = trimmedName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 1 && nameParts[0] !== "") { // Ensure there's a word after trimming
//       initials += nameParts[0][0]; // First letter of the first word
//       if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") { // Ensure there's a last word after trimming
//         initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
//       }
//     }
//     return initials;
//   };

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     try {
//       const updatedRecipient = await recipientService.updateRecipient(
//         recipientId,
//         { nickname: nicknameInput },
//         token
//       );
//       setCurrentRecipient(updatedRecipient);
//     } catch (err: any) {
//       setError(err.message || "Failed to update nickname.");
//       console.error("Error updating nickname:", err);
//     }
//     setIsNicknamePopupOpen(false);
//   };

//   const handleDeleteRecipientClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const handleCancelDeleteRecipient = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleConfirmDeleteRecipient = async () => {
//     setIsDeleteModalOpen(false);
//     setLoadingRecipient(true);
//     setError(null);
//     try {
//       await recipientService.deleteRecipient(recipientId, token);
//       router.push("/dashboard/recipients");
//     } catch (err: any) {
//       setError(err.message || "Failed to delete recipient.");
//       console.error("Error deleting recipient:", err);
//       setLoadingRecipient(false);
//     }
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <DashboardHeader title="Recipients" />
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <span className="font-bold text-2xl text-neutral-900 dark:text-white">
//               {getInitials(
//                 currentRecipient.nickname || currentRecipient.accountHolderName
//               )}
//             </span>
//             {currentRecipient.currency.code === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   onError={() =>
//                     console.error(
//                       `Error loading image for ${currentRecipient.currency.code}`
//                     )
//                   }
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="sm:text-[26px] text-xl font-semibold text-mainheading dark:text-white">
//             {currentRecipient.nickname || currentRecipient.accountHolderName}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium bg-primary text-neutral-900 rounded-full w-32 h-10 flex items-center justify-center cursor-pointer">
//               Send
//             </button>
//             <button
//               className="font-medium bg-red-600 text-white rounded-full w-32 h-10 flex items-center justify-center cursor-pointer"
//               onClick={handleDeleteRecipientClick}
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-lg font-medium text-gray-600 dark:text-white mb-6 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             Account Details
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-8 mb-8">
//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4 mt-1">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main dark:text-gray-300">
//                       {currentRecipient.nickname}
//                     </p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account type
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountType}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.ifscCode}
//               </p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account number
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             {currentRecipient.email && (
//               <div className="">
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Email (Optional)
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.email}
//                 </p>
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Bank name
//               </label>
//               {currentRecipient.bankName && ( // Conditionally render if bankName exists
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.bankName}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Address
//               </label>
//               {currentRecipient.address && ( // Conditionally render if address exists
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.address}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="nickname"
//               className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//             >
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-2 text-gray dark:text-gray-300 font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//             onClick={handleSaveNickname}
//           >
//             Save
//           </button>
//         </NicknamePopup>

//         {/* Delete Recipient Modal */}
//         <DeleteRecipientModal
//           isOpen={isDeleteModalOpen}
//           onClose={handleCancelDeleteRecipient}
//           recipientName={currentRecipient.accountHolderName}
//           onConfirmDelete={handleConfirmDeleteRecipient}
//         />
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;


// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from "../../../hooks/useAuth";
// import recipientService from "../../../services/recipient";
// import DashboardHeader from "../../../components/layout/DashboardHeader";
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";

// // Define the structure for the Currency object
// interface Currency {
//   code: string;
//   // Add other properties if your currency object has them, e.g., name, symbol
// }

// // Define the structure for the Recipient object
// interface Recipient {
//   id: string; // Good practice to include ID if available
//   accountHolderName: string;
//   nickname?: string | null;
//   accountType: string;
//   ifscCode: string;
//   accountNumber: string;
//   email?: string | null;
//   bankName?: string | null;
//   address?: string | null;
//   currency: Currency;
//   // Add any other relevant properties returned by the API
// }


// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId as string; // Assert type since useParams can return string | string[]
//   const { token } = useAuth();
//   const router = useRouter();

//   // Use the specific Recipient type here
//   const [currentRecipient, setCurrentRecipient] = useState<Recipient | null>(null);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       if (!token || !recipientId) {
//          // Don't fetch if token or id is missing
//          setLoadingRecipient(false); // Ensure loading state is turned off
//          setError("Missing authentication token or recipient ID.");
//          return;
//       }

//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         // Assuming getRecipientById returns data conforming to the Recipient interface
//         const data: Recipient = await recipientService.getRecipientById(
//           recipientId,
//           token
//         );
//         setCurrentRecipient(data);
//       } catch (err: unknown) { // Type error as unknown
//         let errorMessage = "Failed to load recipient details.";
//         // Check the type of error before accessing properties
//         if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         }
//         setError(errorMessage);
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     fetchRecipientDetails();
//   }, [token, recipientId]);

//   if (loadingRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <DashboardHeader title="Recipients" />
//         <div className="container mx-auto">Loading recipient details...</div>
//       </div>
//     );
//   }

//   if (error || !currentRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <DashboardHeader title="Recipients" />
//         <div className="container mx-auto text-red-500">
//           Error loading recipient: {error || "Recipient not found."}
//         </div>
//       </div>
//     );
//   }

//   const getInitials = (accountHolderName: string | undefined | null): string => {
//     const name = (accountHolderName || "").trim(); // Handle null/undefined safely
//     if (!name) return ""; // Return empty if no name

//     const nameParts = name.toUpperCase().split(" ").filter(part => part.length > 0); // Filter empty strings after split
//     if (nameParts.length === 0) return "";

//     let initials = nameParts[0][0]; // First letter of the first word
//     if (nameParts.length > 1) {
//       initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
//     }
//     return initials;
//   };


//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     if (!token || !recipientId) {
//         setError("Cannot save nickname without token or recipient ID.");
//         return;
//     }
//     setIsNicknamePopupOpen(false); // Close popup immediately for better UX
//     try {
//       // Assuming updateRecipient returns the updated Recipient object
//       const updatedRecipient: Recipient = await recipientService.updateRecipient(
//         recipientId,
//         { nickname: nicknameInput || null }, // Send null if empty, adjust based on API expectation
//         token
//       );
//       setCurrentRecipient(updatedRecipient);
//       setNicknameInput(""); // Clear input after successful save
//     } catch (err: unknown) { // Type error as unknown
//       let errorMessage = "Failed to update nickname.";
//       // Check the type of error
//        if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         }
//       setError(errorMessage); // Consider showing error feedback to the user more prominently
//       console.error("Error updating nickname:", err);
//       // Re-open popup or provide other feedback if save failed?
//       // Maybe revert nicknameInput state? Depends on desired UX.
//     }
//   };

//   const handleDeleteRecipientClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const handleCancelDeleteRecipient = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleConfirmDeleteRecipient = async () => {
//     if (!token || !recipientId) {
//         setError("Cannot delete recipient without token or recipient ID.");
//         setIsDeleteModalOpen(false);
//         return;
//     }
//     setIsDeleteModalOpen(false);
//     setLoadingRecipient(true); // Show loading indicator during deletion
//     setError(null);
//     try {
//       await recipientService.deleteRecipient(recipientId, token);
//       router.push("/dashboard/recipients"); // Navigate away on success
//     } catch (err: unknown) { // Type error as unknown
//       let errorMessage = "Failed to delete recipient.";
//       // Check the type of error
//       if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         }
//       setError(errorMessage); // Show error feedback
//       console.error("Error deleting recipient:", err);
//       setLoadingRecipient(false); // Turn off loading on error
//     }
//     // No finally needed here as loading is turned off on error, and navigation happens on success
//   };

//   // Determine the name to use for display and initials
//   const displayName = currentRecipient.nickname || currentRecipient.accountHolderName;

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <DashboardHeader title="Recipients" />
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <span className="font-bold text-2xl text-neutral-900 dark:text-white">
//               {getInitials(displayName)} {/* Use displayName */}
//             </span>
//             {/* Consider making the flag display logic more generic if needed */}
//             {currentRecipient.currency?.code === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 {/* Use a try/catch or onError for image loading if needed */}
//                 <Image
//                   src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   onError={(e) => {
//                      // Optional: Handle image loading error, e.g., show default icon
//                      console.error(`Error loading image for ${currentRecipient.currency.code}:`, e.currentTarget.src);
//                      e.currentTarget.style.display = 'none'; // Hide broken image icon
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="sm:text-[26px] text-xl font-semibold text-mainheading dark:text-white">
//             {displayName} {/* Use displayName */}
//           </h2>
//           <div className="flex items-center gap-4">
//             {/* Add onClick handler for Send button if needed */}
//             <button className="font-medium bg-primary text-neutral-900 rounded-full w-32 h-10 flex items-center justify-center cursor-pointer">
//               Send
//             </button>
//             <button
//               className="font-medium bg-red-600 text-white rounded-full w-32 h-10 flex items-center justify-center cursor-pointer"
//               onClick={handleDeleteRecipientClick}
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-lg font-medium text-gray-600 dark:text-white mb-6 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             Account Details
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-8 mb-8">
//             {/* Account Holder Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             {/* Nickname */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4 mt-1">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main dark:text-gray-300">
//                       {currentRecipient.nickname}
//                     </p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Account Type */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account type
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountType}
//               </p>
//             </div>

//             {/* IFSC Code */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.ifscCode}
//               </p>
//             </div>

//             {/* Account Number */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account number
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>

//             {/* Email (Optional) */}
//             {currentRecipient.email && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Email (Optional)
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.email}
//                 </p>
//               </div>
//             )}

//              {/* Bank Name (Optional) */}
//             {currentRecipient.bankName && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Bank name
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.bankName}
//                 </p>
//               </div>
//             )}

//             {/* Address (Optional) */}
//             {currentRecipient.address && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Address
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.address}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="nickname"
//               className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//             >
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-2 text-gray dark:text-gray-300 font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//             onClick={handleSaveNickname}
//             disabled={loadingRecipient} // Disable save button while another operation might be in progress
//           >
//             Save
//           </button>
//         </NicknamePopup>

//         {/* Delete Recipient Modal */}
//         {/* Ensure DeleteRecipientModal can handle recipientName being potentially long */}
//         <DeleteRecipientModal
//           isOpen={isDeleteModalOpen}
//           onClose={handleCancelDeleteRecipient}
//           recipientName={currentRecipient.accountHolderName} // Pass the base name for clarity
//           onConfirmDelete={handleConfirmDeleteRecipient}
//         />
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;




// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from "../../../contexts/AuthContext";
// import recipientService from "../../../services/recipient";
// import DashboardHeader from "../../../components/layout/DashboardHeader";
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";
// import Link from "next/link";

// // Define the structure for the Currency object
// interface Currency {
//   code: string;
//   // Add other properties if your currency object has them, e.g., name, symbol
// }

// // Define the structure for the Recipient object
// interface Recipient {
//   id: string; // Good practice to include ID if available
//   accountHolderName: string;
//   nickname?: string | null;
//   accountType: string;
//   ifscCode: string;
//   accountNumber: string;
//   email?: string | null;
//   bankName?: string | null;
//   address?: string | null;
//   currency: Currency;
//   // Add any other relevant properties returned by the API
// }


// interface RecipientDetailsPageProps {
//   // No explicit props needed if using useParams, but kept for potential future use
//   // params: { recipientId: string }; // This is handled by useParams now
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   // Ensure recipientId is treated as a string. Handle potential undefined/array if necessary.
//   const recipientId = typeof params.recipientId === 'string' ? params.recipientId : '';
//   const { token } = useAuth();
//   const router = useRouter();

//   // Use the specific Recipient type here
//   const [currentRecipient, setCurrentRecipient] = useState<Recipient | null>(null);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       if (!token || !recipientId) {
//          // Don't fetch if token or id is missing or invalid
//          setLoadingRecipient(false); // Ensure loading state is turned off
//          setError("Missing authentication token or invalid recipient ID.");
//          // Optionally redirect or show a more specific error message
//          if (!recipientId) {
//             console.error("Recipient ID is missing from parameters.");
//             // router.push('/dashboard/recipients'); // Example redirect
//          }
//          return;
//       }

//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         // Assuming getRecipientById returns data conforming to the Recipient interface
//         const data: Recipient = await recipientService.getRecipientById(
//           recipientId,
//           token
//         );
//         setCurrentRecipient(data);
//         // Pre-fill nickname input if nickname exists when fetching details
//         setNicknameInput(data.nickname || "");
//       } catch (err: unknown) { // Use 'unknown' instead of 'any'
//         let errorMessage = "Failed to load recipient details.";
//         // Type check the error before accessing properties
//         if (err instanceof Error) {
//           errorMessage = err.message; // Standard Error object
//         } else if (typeof err === 'string') {
//           errorMessage = err; // Error might be a string
//         } else if (typeof err === 'object' && err !== null && 'message' in err) {
//             // Handle cases where error is an object with a message property
//             errorMessage = String((err as { message: unknown }).message);
//         }
//         setError(errorMessage);
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     fetchRecipientDetails();
//   }, [token, recipientId, router]); // Add router to dependency array if used inside effect

//   if (!recipientId && !loadingRecipient) {
//       // Handle the case where recipientId was invalid early
//        return (
//         <div className="RecipientDetailsPage py-10">
//           <DashboardHeader title="Recipients" />
//           <div className="container mx-auto text-red-500">
//             Invalid or missing Recipient ID.
//           </div>
//         </div>
//       );
//   }


//   if (loadingRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <DashboardHeader title="Recipients" />
//         <div className="container mx-auto">Loading recipient details...</div>
//       </div>
//     );
//   }

//   if (error || !currentRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <DashboardHeader title="Recipients" />
//         <div className="container mx-auto text-red-500">
//           Error loading recipient: {error || "Recipient not found."}
//         </div>
//       </div>
//     );
//   }

//   const getInitials = (accountHolderName: string | undefined | null): string => {
//     const name = (accountHolderName || "").trim(); // Handle null/undefined safely
//     if (!name) return "?"; // Return placeholder if no name

//     const nameParts = name.toUpperCase().split(" ").filter(part => part.length > 0); // Filter empty strings after split
//     if (nameParts.length === 0) return "?"; // Return placeholder if name consists only of spaces

//     let initials = nameParts[0][0]; // First letter of the first word
//     if (nameParts.length > 1) {
//       initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
//     } else if (nameParts[0].length > 1) {
//         initials += nameParts[0][1]; // Use second letter if only one word with more than one letter
//     }
//     return initials;
//   };


//   const handleAddNicknameClick = () => {
//     // Ensure currentRecipient is not null before accessing its properties
//     setNicknameInput(currentRecipient?.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     if (!token || !recipientId) {
//         setError("Cannot save nickname without token or recipient ID.");
//         return;
//     }
//     // Optionally add validation for nicknameInput here

//     setIsNicknamePopupOpen(false); // Close popup immediately for better UX
//     // Consider showing a loading state specific to the nickname save action
//     try {
//       // Assuming updateRecipient returns the updated Recipient object
//       const updatedRecipient: Recipient = await recipientService.updateRecipient(
//         recipientId,
//         { nickname: nicknameInput.trim() || null }, // Send null if empty after trim, adjust based on API
//         token
//       );
//       setCurrentRecipient(updatedRecipient);
//       // Keep nicknameInput as the saved value, or clear it if desired
//       // setNicknameInput(""); // Clear input after successful save
//     } catch (err: unknown) { // Use 'unknown' instead of 'any'
//       let errorMessage = "Failed to update nickname.";
//       // Type check the error
//        if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         } else if (typeof err === 'object' && err !== null && 'message' in err) {
//              errorMessage = String((err as { message: unknown }).message);
//         }
//       setError(errorMessage); // Show error feedback to the user
//       console.error("Error updating nickname:", err);
//       // Re-open popup or provide other feedback if save failed?
//       setIsNicknamePopupOpen(true); // Example: Re-open popup on error
//     }
//   };

//   const handleDeleteRecipientClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const handleCancelDeleteRecipient = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleConfirmDeleteRecipient = async () => {
//     if (!token || !recipientId) {
//         setError("Cannot delete recipient without token or recipient ID.");
//         setIsDeleteModalOpen(false);
//         return;
//     }
//     setIsDeleteModalOpen(false);
//     setLoadingRecipient(true); // Show loading indicator during deletion
//     setError(null);
//     try {
//       await recipientService.deleteRecipient(recipientId, token);
//       // Optional: Add a success message/toast before redirecting
//       router.push("/dashboard/recipients"); // Navigate away on success
//     } catch (err: unknown) { // Use 'unknown' instead of 'any'
//       let errorMessage = "Failed to delete recipient.";
//       // Type check the error
//       if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         } else if (typeof err === 'object' && err !== null && 'message' in err) {
//              errorMessage = String((err as { message: unknown }).message);
//         }
//       setError(errorMessage); // Show error feedback
//       console.error("Error deleting recipient:", err);
//       setLoadingRecipient(false); // Turn off loading on error ONLY
//     }
//     // No finally needed here as loading is turned off on error, and navigation happens on success
//   };

//   // Determine the name to use for display and initials
//   // Ensure currentRecipient is not null before accessing its properties
//   const displayName = currentRecipient.nickname || currentRecipient.accountHolderName;

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <DashboardHeader title="Recipients" />
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <span className="font-bold text-2xl text-neutral-900 dark:text-white">
//               {getInitials(displayName)} {/* Use calculated displayName */}
//             </span>
//             {/* Conditional Flag Display */}
//             {currentRecipient.currency?.code && ( // Check if currency and code exist
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   // Construct the path safely, handle potential errors
//                   src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   onError={(e) => {
//                     // Handle image loading error gracefully
//                     console.error(
//                       `Error loading flag for ${currentRecipient.currency.code}:`,
//                       e.currentTarget.src
//                     );
//                     e.currentTarget.style.display = "none"; // Hide broken image icon
//                     // Optionally display a default icon or placeholder here
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="sm:text-[26px] text-xl font-semibold text-mainheading dark:text-white break-words">
//             {displayName} {/* Use calculated displayName */}
//           </h2>
//           <div className="flex items-center gap-4 flex-wrap">
//             {" "}
//             {/* Added flex-wrap for responsiveness */}
//             {/* Add onClick handler for Send button if needed */}
//             <Link href={"/dashboard/send/select-balance"}>
//               <button className="font-medium bg-primary text-neutral-900 rounded-full w-32 h-10 flex items-center justify-center cursor-pointer hover:bg-primaryhover transition-colors duration-200">
//                 Send
//               </button>
//             </Link>
//             <button
//               className="font-medium bg-red-600 text-white rounded-full w-32 h-10 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors duration-200"
//               onClick={handleDeleteRecipientClick}
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-lg font-medium text-gray-600 dark:text-white mb-6 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             Account Details
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
//             {" "}
//             {/* Adjusted gap */}
//             {/* Account Holder Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300 break-words">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>
//             {/* Nickname */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4 mt-1">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2 flex-wrap">
//                     {" "}
//                     {/* Added flex-wrap */}
//                     <p className="text-main dark:text-gray-300 break-words">
//                       {currentRecipient.nickname}
//                     </p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary whitespace-nowrap" // Prevent wrap
//                       onClick={handleAddNicknameClick}
//                       aria-label="Edit nickname" // Accessibility
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                     onClick={handleAddNicknameClick}
//                     aria-label="Add nickname" // Accessibility
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>
//             {/* Account Type */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account type
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300 break-words">
//                 {currentRecipient.accountType}
//               </p>
//             </div>
//             {/* IFSC Code */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300 break-words">
//                 {currentRecipient.ifscCode}
//               </p>
//             </div>
//             {/* Account Number */}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account number
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300 break-words">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             {/* Email (Optional) */}
//             {currentRecipient.email && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Email (Optional)
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300 break-words">
//                   {currentRecipient.email}
//                 </p>
//               </div>
//             )}
//             {/* Bank Name (Optional) */}
//             {currentRecipient.bankName && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Bank name
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300 break-words">
//                   {currentRecipient.bankName}
//                 </p>
//               </div>
//             )}
//             {/* Address (Optional) */}
//             {currentRecipient.address && (
//               <div className="sm:col-span-2">
//                 {" "}
//                 {/* Allow address to span full width on small screens if long */}
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Address
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300 break-words">
//                   {currentRecipient.address}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title={currentRecipient.nickname ? "Edit nickname" : "Add nickname"} // Dynamic title
//           description={
//             currentRecipient.nickname
//               ? "Update the nickname for this account."
//               : "Add a nickname so you can easily find this account."
//           } // Dynamic description
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="nickname"
//               className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//             >
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="autofill:!bg-transparent dark:autofill:!bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-900 dark:border-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary dark:text-white dark:bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400" // Improved styling and focus state
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//               aria-describedby="nickname-char-count" // Accessibility
//             />
//             <p
//               id="nickname-char-count"
//               className="mt-2 text-gray dark:text-gray-300 font-semibold text-xs"
//             >
//               {nicknameInput.length}/40 characters
//             </p>
//           </div>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-150 ease-linear"
//             onClick={handleSaveNickname}
//             disabled={loadingRecipient} // Simplified: disable only during network ops
//           >
//             Save
//           </button>
//         </NicknamePopup>

//         {/* Delete Recipient Modal */}
//         <DeleteRecipientModal
//           isOpen={isDeleteModalOpen}
//           onClose={handleCancelDeleteRecipient}
//           // Use display name for the modal confirmation text for consistency
//           recipientName={displayName}
//           onConfirmDelete={handleConfirmDeleteRecipient}
//         />
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;


// // frontend/src/app/dashboard/recipients/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from "../../../contexts/AuthContext";
// import recipientService from "../../../services/recipient";
// import DashboardHeader from "../../../components/layout/DashboardHeader"; // Assuming this is the correct path
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
// import { AlertCircle, AlertTriangle, ReceiptText, ReceiptTextIcon } from "lucide-react";

// // Define the structure for the Currency object
// interface Currency {
//   _id: string; // Add _id if it exists in your API response
//   code: string;
//   name?: string; // Optional name
//   flagImage?: string; // Optional flag image path
// }

// // Define the structure for the Recipient object
// interface Recipient {
//   _id: string; // Use _id consistently if that's what your API uses
//   accountHolderName: string;
//   nickname?: string | null;
//   accountType: string;
//   ifscCode: string; // Assuming these fields exist based on usage below
//   accountNumber: string;
//   email?: string | null;
//   bankName?: string | null;
//   address?: string | null;
//   currency: Currency;
//   // Add any other relevant properties returned by the API
// }


// interface RecipientDetailsPageProps {
//   // No explicit props needed if using useParams
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   // Ensure recipientId is treated as a string. Handle potential undefined/array.
//   const recipientId = typeof params.recipientId === 'string' ? params.recipientId : '';
//   const { token } = useAuth();
//   const router = useRouter();

//   const [currentRecipient, setCurrentRecipient] = useState<Recipient | null>(null);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       if (!token || !recipientId) {
//          setLoadingRecipient(false);
//          if (!recipientId) {
//              setError("Invalid or missing Recipient ID.");
//              console.error("Recipient ID is missing or invalid:", params.recipientId);
//          } else {
//              // No token case - might redirect later or rely on AuthProvider context
//              setError("Authentication required.");
//              // Potentially redirect to login if preferred: router.replace('/auth/login');
//          }
//          return;
//       }

//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         // Use recipientId directly here
//         const data: Recipient = await recipientService.getRecipientById(recipientId, token);
//         // Ensure API response includes _id if you use it elsewhere
//         // If API uses 'id', map it: const mappedData = { ...data, _id: data.id };
//         setCurrentRecipient(data);
//         setNicknameInput(data.nickname || "");
//       } catch (err: unknown) {
//         let errorMessage = "Failed to load recipient details.";
//         if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         } else if (typeof err === 'object' && err !== null && 'message' in err) {
//             errorMessage = String((err as { message: unknown }).message);
//         }
//         setError(errorMessage);
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     fetchRecipientDetails();
//   // Add params.recipientId to dependency array to refetch if the ID changes client-side
//   }, [token, recipientId, params.recipientId, router]);

//   // Handle invalid ID more explicitly after attempting fetch or validation
//   if (!recipientId && !loadingRecipient) {
//        return (
//         <div className="RecipientDetailsPage py-10">
//           <DashboardHeader title="Recipients" />
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-red-600 dark:bg-transparent dark:bg-gradient-to-t dark:from-red-600 rounded-full mb-2">
//             <AlertTriangle className="lg:size-8 size-6 mx-auto text-white dark:text-red-400" />
//           </div>
//           <p className="lg:text-xl text-lg text-subheadingWhite max-w-lg mx-auto">Error: Invalid or missing Recipient ID provided in the URL.</p>
            
//             <Link href="/dashboard/recipients" className="text-primary hover:underline">Go back to Recipients</Link>
//           </div>
//         </div>
//       );
//   }


//   if (loadingRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <Skeleton className="h-8 w-48 rounded-md mb-6" />
        
//             {/* Enhanced Skeleton Loading State */}
//             <div className="flex flex-col mb-8 space-y-4">
//                 <Skeleton className="w-20 h-20 rounded-full" />
//                 <Skeleton className="h-8 w-48 sm:w-64 rounded-md" />
//                 <div className="flex items-center gap-4">
//                     <Skeleton className="w-32 h-10 rounded-full" />
//                     <Skeleton className="w-32 h-10 rounded-full" />
//                 </div>
//             </div>
//              <Skeleton className="h-8 w-32 mb-6 rounded-md" />
//              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
//                 {Array(6).fill(0).map((_, i) => (
//                     <div key={i}>
//                         <Skeleton className="h-4 w-24 mb-2 rounded-md"/>
//                         <Skeleton className="h-5 w-40 rounded-md"/>
//                     </div>
//                 ))}
//              </div>
        
//       </div>
//     );
//   }

//   if (error || !currentRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <DashboardHeader title="Recipients" />
//         <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//           <div className="lg:size-16 size-14 flex items-center justify-center bg-red-600 dark:bg-transparent dark:bg-gradient-to-t dark:from-red-600 rounded-full mb-2">
//             <ReceiptText className="lg:size-8 size-6 mx-auto text-white dark:text-red-400" />
//           </div>
//           <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//             Error loading recipient
//           </h2>
//           <p className="text-subheadingWhite max-w-lg mx-auto">
//             {error || "Recipient not found."}{" "}
//             <Link
//               href="/dashboard/recipients"
//               className="text-primary hover:underline"
//             >
//               Go back to Recipients
//             </Link>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --- Helper Functions ---
//   const getInitials = (accountHolderName: string | undefined | null): string => {
//     const name = (accountHolderName || "").trim();
//     if (!name) return "?";

//     const nameParts = name.toUpperCase().split(" ").filter(part => part.length > 0);
//     if (nameParts.length === 0) return "?";

//     let initials = nameParts[0][0];
//     if (nameParts.length > 1) {
//       initials += nameParts[nameParts.length - 1][0];
//     } else if (nameParts[0].length > 1) {
//         initials += nameParts[0][1];
//     }
//     return initials;
//   };

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient?.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     if (!token || !recipientId || !currentRecipient) {
//         setError("Cannot save nickname. Missing required information.");
//         return;
//     }

//     // Basic validation example (can be more complex)
//     if (nicknameInput.trim().length > 40) {
//         setError("Nickname cannot exceed 40 characters.");
//         // Optionally keep the popup open
//         return;
//     }

//     setIsNicknamePopupOpen(false);
//     // Consider a specific loading state for the nickname save action
//     // setLoadingNickname(true);
//     try {
//       const updatedRecipient: Recipient = await recipientService.updateRecipient(
//         recipientId, // Use the validated recipientId
//         { nickname: nicknameInput.trim() || null },
//         token
//       );
//       setCurrentRecipient(updatedRecipient);
//       // Keep nicknameInput as the saved value
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update nickname.";
//        if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         } else if (typeof err === 'object' && err !== null && 'message' in err) {
//              errorMessage = String((err as { message: unknown }).message);
//         }
//       setError(errorMessage);
//       console.error("Error updating nickname:", err);
//       setIsNicknamePopupOpen(true); // Re-open popup on error
//     } finally {
//         // setLoadingNickname(false);
//     }
//   };

//   const handleDeleteRecipientClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const handleCancelDeleteRecipient = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleConfirmDeleteRecipient = async () => {
//     if (!token || !recipientId) {
//         setError("Cannot delete recipient. Missing required information.");
//         setIsDeleteModalOpen(false);
//         return;
//     }
//     setIsDeleteModalOpen(false);
//     setLoadingRecipient(true); // Use main loading state or a specific delete loading state
//     setError(null);
//     try {
//       await recipientService.deleteRecipient(recipientId, token);
//       // Optional: Add a success message/toast
//       // toast.success("Recipient deleted successfully!");
//       router.push("/dashboard/recipients");
//     } catch (err: unknown) {
//       let errorMessage = "Failed to delete recipient.";
//       if (err instanceof Error) {
//           errorMessage = err.message;
//         } else if (typeof err === 'string') {
//           errorMessage = err;
//         } else if (typeof err === 'object' && err !== null && 'message' in err) {
//              errorMessage = String((err as { message: unknown }).message);
//         }
//       setError(errorMessage);
//       console.error("Error deleting recipient:", err);
//       setLoadingRecipient(false); // Turn off loading only on error
//     }
//   };

//   // Use nickname if available, otherwise fall back to account holder name
//   const displayName = currentRecipient.nickname || currentRecipient.accountHolderName;
//   const initials = getInitials(displayName); // Use display name for initials

//   // --- Render ---
//   return (
//     <section className="Recipient-Details-Page">
//       <DashboardHeader title="Recipients"/>
//       <div className="">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <span className="font-bold text-2xl text-neutral-900 dark:text-white">
//               {initials} {/* Use calculated initials */}
//             </span>
//             {/* Conditional Flag Display - Robust check */}
//             {currentRecipient.currency?.code && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white dark:border-gray-800">
//                 <Image
//                   src={currentRecipient.currency.flagImage || `/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   unoptimized // Consider if optimization is needed based on source
//                   onError={(e) => {
//                     console.error(`Error loading flag for ${currentRecipient.currency.code}:`, e.currentTarget.src);
//                     e.currentTarget.src = "/assets/icon/default.svg"; // Fallback image
//                     e.currentTarget.alt = "Default flag";
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="sm:text-[26px] text-xl font-semibold text-mainheading dark:text-white break-words">
//             {displayName} {/* Use calculated displayName */}
//           </h2>
//           <div className="flex items-center gap-4">
//             {/* === MODIFIED LINK FOR SEND BUTTON === */}
//             <Link
//               href={recipientId ? `/dashboard/send/select-balance?recipientId=${recipientId}` : '#'} // Add recipientId as query param
//               onClick={(e) => !recipientId && e.preventDefault()} // Prevent navigation if recipientId is somehow missing
//               className={`font-medium bg-primary text-neutral-900 rounded-full sm:w-32 w-full h-10 flex items-center justify-center cursor-pointer hover:bg-primaryhover transition-colors duration-200 ${!recipientId ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable visually if no ID
//               aria-disabled={!recipientId}
//             >
//               Send
//             </Link>
//             {/* === END MODIFIED LINK === */}
//             <button
//               className="font-medium bg-red-600 text-white rounded-full sm:w-32 w-full h-10 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors duration-200"
//               onClick={handleDeleteRecipientClick}
//               disabled={loadingRecipient} // Disable during loading/deleting
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="Account-Details">
//           <h3 className="font-medium text-subheadingWhite mb-3 tracking-wide leading-8 border-b">
//             Account Details
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
//             {/* Account Holder Name */}
//             <div>
//               <label className="block font-semibold text-neutral-900 dark:text-white">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-sm text-subheadingWhite break-words">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>
//             {/* Nickname */}
//             <div>
//               <label className="block font-semibold text-neutral-900 dark:text-white">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4 mt-1">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <p className="text-sm text-subheadingWhite break-words">
//                       {currentRecipient.nickname}
//                     </p>
//                     <button
//                       className="cursor-pointer text-sm underline font-medium text-primary hover:text-primaryhover transition-all duration-75 ease-linear whitespace-nowrap"
//                       onClick={handleAddNicknameClick}
//                       aria-label="Edit nickname"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline font-medium text-primary"
//                     onClick={handleAddNicknameClick}
//                     aria-label="Add nickname"
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>
//             {/* Account Type */}
//             <div>
//               <label className="block font-semibold text-neutral-900 dark:text-white">
//                 Account type
//               </label>
//               <p className="mt-1 text-sm text-subheadingWhite break-words">
//                 {currentRecipient.accountType || "N/A"} {/* Handle potential missing value */}
//               </p>
//             </div>
//             {/* IFSC Code */}
//             <div>
//               <label className="block font-semibold text-neutral-900 dark:text-white">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-sm text-subheadingWhite break-words">
//                 {currentRecipient.ifscCode || "N/A"} {/* Handle potential missing value */}
//               </p>
//             </div>
//             {/* Account Number */}
//             <div>
//               <label className="block font-semibold text-neutral-900 dark:text-white">
//                 Account number
//               </label>
//               <p className="mt-1 text-sm text-subheadingWhite break-words">
//                 {currentRecipient.accountNumber || "N/A"} {/* Handle potential missing value */}
//               </p>
//             </div>
//             {/* Email (Optional) */}
//             {currentRecipient.email && (
//               <div>
//                 <label className="block font-semibold text-neutral-900 dark:text-white">
//                   Email (Optional)
//                 </label>
//                 <p className="mt-1 text-sm text-subheadingWhite break-words">
//                   {currentRecipient.email}
//                 </p>
//               </div>
//             )}
//             {/* Bank Name (Optional) */}
//             {currentRecipient.bankName && (
//               <div>
//                 <label className="block font-semibold text-neutral-900 dark:text-white">
//                   Bank name
//                 </label>
//                 <p className="mt-1 text-sm text-subheadingWhite break-words">
//                   {currentRecipient.bankName}
//                 </p>
//               </div>
//             )}
//             {/* Address (Optional) */}
//             {currentRecipient.address && (
//               <div className="sm:col-span-2">
//                 <label className="block font-semibold text-neutral-900 dark:text-white">
//                   Address
//                 </label>
//                 <p className="mt-1 text-sm text-subheadingWhite break-words">
//                   {currentRecipient.address}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title={currentRecipient.nickname ? "Edit nickname" : "Add nickname"}
//           description={
//             currentRecipient.nickname
//               ? "Update the nickname for this account."
//               : "Add a nickname so you can easily find this account."
//           }
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="nickname"
//               className="block font-semibold text-neutral-900 dark:text-white"
//             >
//               Account nickname (Optional)
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all ease-linear duration-75 focus:outline-none focus:border-[#5f5f5f]"
//               placeholder="E.g., Savings, John Doe USD"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => {
//                 setNicknameInput(e.target.value);
//                 // Clear error instantly when user types
//                 if (error?.toLowerCase().includes('nickname')) setError(null);
//               }}
//               aria-describedby="nickname-char-count nickname-error"
//             />
//             <p
//               id="nickname-char-count"
//               className="mt-2 text-subheadingWhite font-semibold text-xs"
//             >
//               {nicknameInput.length}/40 characters
//             </p>
//             {/* Display nickname-specific errors here */}
//             {error?.toLowerCase().includes('nickname') && (
//                 <p id="nickname-error" className="mt-1 text-red-500 text-xs">{error}</p>
//             )}
//           </div>
//           <button
//             className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-8 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//             onClick={handleSaveNickname}
//             // Disable save if nickname hasn't changed or during loading
//             disabled={loadingRecipient || nicknameInput === (currentRecipient.nickname || "")}
//           >
//             Save
//           </button>
//         </NicknamePopup>

//         {/* Delete Recipient Modal */}
//         <DeleteRecipientModal
//           isOpen={isDeleteModalOpen}
//           onClose={handleCancelDeleteRecipient}
//           recipientName={displayName} // Use display name for consistency
//           onConfirmDelete={handleConfirmDeleteRecipient}
//         />
//       </div>
//     </section>
//   );
// };

// export default RecipientDetailsPage;


// frontend/src/app/dashboard/recipients/[recipientId]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
import { useAuth } from "../../../contexts/AuthContext";
import recipientService from "../../../services/recipient";
import DashboardHeader from "../../../components/layout/DashboardHeader"; // Assuming this is the correct path
import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { AlertCircle, AlertTriangle, ReceiptText, ReceiptTextIcon } from "lucide-react";

// Define the structure for the Currency object
interface Currency {
  _id: string; // Add _id if it exists in your API response
  code: string;
  name?: string; // Optional name
  flagImage?: string; // Optional flag image path
}

// Define the structure for the Recipient object
interface Recipient {
  _id: string; // Use _id consistently if that's what your API uses
  accountHolderName: string;
  nickname?: string | null;
  accountType: string;
  ifscCode: string; // Assuming these fields exist based on usage below
  accountNumber: string;
  email?: string | null;
  bankName?: string | null;
  address?: string | null;
  currency: Currency;
  // Add any other relevant properties returned by the API
}


interface RecipientDetailsPageProps {
  // No explicit props needed if using useParams
}

const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
  const params = useParams();
  // Ensure recipientId is treated as a string. Handle potential undefined/array.
  const recipientId = typeof params.recipientId === 'string' ? params.recipientId : '';
  const { token } = useAuth();
  const router = useRouter();

  const [currentRecipient, setCurrentRecipient] = useState<Recipient | null>(null);
  const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [loadingRecipient, setLoadingRecipient] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      if (!token || !recipientId) {
         setLoadingRecipient(false);
         if (!recipientId) {
             setError("Invalid or missing Recipient ID.");
             console.error("Recipient ID is missing or invalid:", params.recipientId);
         } else {
             // No token case - might redirect later or rely on AuthProvider context
             setError("Authentication required.");
             // Potentially redirect to login if preferred: router.replace('/auth/login');
         }
         return;
      }

      setLoadingRecipient(true);
      setError(null);
      try {
        // Use recipientId directly here
        const data: Recipient = await recipientService.getRecipientById(recipientId, token);
        // Ensure API response includes _id if you use it elsewhere
        // If API uses 'id', map it: const mappedData = { ...data, _id: data.id };
        setCurrentRecipient(data);
        setNicknameInput(data.nickname || "");
      } catch (err: unknown) {
        let errorMessage = "Failed to load recipient details.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
            errorMessage = String((err as { message: unknown }).message);
        }
        setError(errorMessage);
        console.error("Error fetching recipient details:", err);
      } finally {
        setLoadingRecipient(false);
      }
    };

    fetchRecipientDetails();
  // Add params.recipientId to dependency array to refetch if the ID changes client-side
  }, [token, recipientId, params.recipientId, router]);

  // Handle invalid ID more explicitly after attempting fetch or validation
  if (!recipientId && !loadingRecipient) {
       return (
        <div className="RecipientDetailsPage py-10">
          <DashboardHeader title="Recipients" />
          <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
            <div className="lg:size-16 size-14 flex items-center justify-center bg-red-600 dark:bg-transparent dark:bg-gradient-to-t dark:from-red-600 rounded-full mb-2">
            <AlertTriangle className="lg:size-8 size-6 mx-auto text-white dark:text-red-400" />
          </div>
          <p className="lg:text-xl text-lg text-subheadingWhite max-w-lg mx-auto">Error: Invalid or missing Recipient ID provided in the URL.</p>
            
            <Link href="/dashboard/recipients" className="text-primary hover:underline">Go back to Recipients</Link>
          </div>
        </div>
      );
  }


  if (loadingRecipient) {
    return (
      <div className="RecipientDetailsPage">
        <Skeleton className="h-8 w-48 rounded-md mb-6" />
            {/* Enhanced Skeleton Loading State */}
            <div className="flex flex-col mb-8 space-y-4">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-8 w-48 sm:w-64 rounded-md" />
                <div className="flex items-center gap-4">
                    <Skeleton className="w-32 h-10 rounded-full" />
                    <Skeleton className="w-32 h-10 rounded-full" />
                </div>
            </div>
             <Skeleton className="h-4 w-32 rounded-md mb-6" />
             <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-8  border-t py-6">
                {Array(7).fill(0).map((_, i) => (
                    <div key={i}>
                        <Skeleton className="h-4 w-40 mb-2 rounded-md"/>
                        <Skeleton className="h-2 w-26 rounded-md"/>
                    </div>
                ))}
             </div>
        
      </div>
    );
  }

  if (error || !currentRecipient) {
    return (
      <div className="RecipientDetailsPage py-10">
        <DashboardHeader title="Recipients" />
        <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
          <div className="lg:size-16 size-14 flex items-center justify-center bg-red-600 dark:bg-transparent dark:bg-gradient-to-t dark:from-red-600 rounded-full mb-2">
            <ReceiptText className="lg:size-8 size-6 mx-auto text-white dark:text-red-400" />
          </div>
          <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
            Error loading recipient
          </h2>
          <p className="text-subheadingWhite max-w-lg mx-auto">
            {error || "Recipient not found."}{" "}
            <Link
              href="/dashboard/recipients"
              className="text-primary hover:underline"
            >
              Go back to Recipients
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // --- Helper Functions ---
  const getInitials = (accountHolderName: string | undefined | null): string => {
    const name = (accountHolderName || "").trim();
    if (!name) return "?";

    const nameParts = name.toUpperCase().split(" ").filter(part => part.length > 0);
    if (nameParts.length === 0) return "?";

    let initials = nameParts[0][0];
    if (nameParts.length > 1) {
      initials += nameParts[nameParts.length - 1][0];
    } else if (nameParts[0].length > 1) {
        initials += nameParts[0][1];
    }
    return initials;
  };

  const handleAddNicknameClick = () => {
    setNicknameInput(currentRecipient?.nickname || "");
    setIsNicknamePopupOpen(true);
  };

  const handleCloseNicknamePopup = () => {
    setIsNicknamePopupOpen(false);
  };

  const handleSaveNickname = async () => {
    if (!token || !recipientId || !currentRecipient) {
        setError("Cannot save nickname. Missing required information.");
        return;
    }

    // Basic validation example (can be more complex)
    if (nicknameInput.trim().length > 40) {
        setError("Nickname cannot exceed 40 characters.");
        // Optionally keep the popup open
        return;
    }

    setIsNicknamePopupOpen(false);
    // Consider a specific loading state for the nickname save action
    // setLoadingNickname(true);
    try {
      const updatedRecipient: Recipient = await recipientService.updateRecipient(
        recipientId, // Use the validated recipientId
        { nickname: nicknameInput.trim() || null },
        token
      );
      setCurrentRecipient(updatedRecipient);
      // Keep nicknameInput as the saved value
    } catch (err: unknown) {
      let errorMessage = "Failed to update nickname.";
       if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
             errorMessage = String((err as { message: unknown }).message);
        }
      setError(errorMessage);
      console.error("Error updating nickname:", err);
      setIsNicknamePopupOpen(true); // Re-open popup on error
    } finally {
        // setLoadingNickname(false);
    }
  };

  const handleDeleteRecipientClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDeleteRecipient = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteRecipient = async () => {
    if (!token || !recipientId) {
        setError("Cannot delete recipient. Missing required information.");
        setIsDeleteModalOpen(false);
        return;
    }
    setIsDeleteModalOpen(false);
    setLoadingRecipient(true); // Use main loading state or a specific delete loading state
    setError(null);
    try {
      await recipientService.deleteRecipient(recipientId, token);
      // Optional: Add a success message/toast
      // toast.success("Recipient deleted successfully!");
      router.push("/dashboard/recipients");
    } catch (err: unknown) {
      let errorMessage = "Failed to delete recipient.";
      if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
             errorMessage = String((err as { message: unknown }).message);
        }
      setError(errorMessage);
      console.error("Error deleting recipient:", err);
      setLoadingRecipient(false); // Turn off loading only on error
    }
  };

  // Use nickname if available, otherwise fall back to account holder name
  const displayName = currentRecipient.nickname || currentRecipient.accountHolderName;
  const initials = getInitials(displayName); // Use display name for initials

  // --- Render ---
  return (
    <section className="Recipient-Details-Page">
      <DashboardHeader title="Recipients"/>
      <div className="">
        {/* Profile Section */}
        <div className="flex flex-col mb-8 space-y-4">
          <div className="relative size-20 rounded-full bg-[#52636C] flex items-center justify-center">
            <span className="font-bold text-2xl text-white/90">
              {initials} {/* Use calculated initials */}
            </span>
            {/* Conditional Flag Display - Robust check */}
            {currentRecipient.currency?.code && (
              <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={currentRecipient.currency.flagImage || `/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
                  alt={`${currentRecipient.currency.code} flag`}
                  width={24}
                  height={24}
                  unoptimized // Consider if optimization is needed based on source
                  onError={(e) => {
                    console.error(`Error loading flag for ${currentRecipient.currency.code}:`, e.currentTarget.src);
                    e.currentTarget.src = "/assets/icon/default.svg"; // Fallback image
                    e.currentTarget.alt = "Default flag";
                  }}
                />
              </div>
            )}
          </div>

          <h2 className="sm:text-[26px] text-xl font-semibold text-white break-words">
            {displayName} {/* Use calculated displayName */}
          </h2>

          <div className="flex items-center gap-4">
            {/* === MODIFIED LINK FOR SEND BUTTON === */}
            <Link
              href={recipientId ? `/dashboard/send/select-balance?recipientId=${recipientId}` : '#'} // Add recipientId as query param
              onClick={(e) => !recipientId && e.preventDefault()} // Prevent navigation if recipientId is somehow missing
              className={`font-medium bg-primary text-neutral-900 rounded-full sm:w-32 w-full h-10 flex items-center justify-center cursor-pointer hover:bg-primaryhover transition-colors duration-200 ${!recipientId ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable visually if no ID
              aria-disabled={!recipientId}
            >
              Send
            </Link>
            {/* === END MODIFIED LINK === */}
            <button
              className="font-medium bg-red-600 text-white rounded-full sm:w-32 w-full h-10 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors duration-200"
              onClick={handleDeleteRecipientClick}
              disabled={loadingRecipient} // Disable during loading/deleting
            >
              Delete
            </button>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="Account-Details">
          <h3 className="font-medium text-mainheadingWhite mb-3 tracking-wide leading-8 border-b">
            Account Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {/* Account Holder Name */}
            <div>
              <label className="block font-semibold text-white">
                Account holder name 
              </label>
              <p className="mt-1 text-sm text-subheadingWhite break-words">
                {currentRecipient.accountHolderName}
              </p>
            </div>
            {/* Nickname */}
            <div>
              <label className="block font-semibold text-white">
                Nickname
              </label>
              <div className="flex items-center gap-4 mt-1">
                {currentRecipient.nickname ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-subheadingWhite break-words">
                      {currentRecipient.nickname}
                    </p>
                    <button
                      className="cursor-pointer text-sm underline font-medium text-primary hover:text-primaryhover transition-all duration-75 ease-linear whitespace-nowrap"
                      onClick={handleAddNicknameClick}
                      aria-label="Edit nickname"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    className="cursor-pointer text-sm underline font-medium text-primary"
                    onClick={handleAddNicknameClick}
                    aria-label="Add nickname"
                  >
                    Add Nickname
                  </button>
                )}
              </div>
            </div>
            {/* Account Type */}
            <div>
              <label className="block font-semibold text-white">
                Account type
              </label>
              <p className="mt-1 text-sm text-subheadingWhite break-words">
                {currentRecipient.accountType || "N/A"} {/* Handle potential missing value */}
              </p>
            </div>
            {/* IFSC Code */}
            <div>
              <label className="block font-semibold text-white">
                IFSC code
              </label>
              <p className="mt-1 text-sm text-subheadingWhite break-words">
                {currentRecipient.ifscCode || "N/A"} {/* Handle potential missing value */}
              </p>
            </div>
            {/* Account Number */}
            <div>
              <label className="block font-semibold text-white">
                Account number
              </label>
              <p className="mt-1 text-sm text-subheadingWhite break-words">
                {currentRecipient.accountNumber || "N/A"} {/* Handle potential missing value */}
              </p>
            </div>
            {/* Email (Optional) */}
            {currentRecipient.email && (
              <div>
                <label className="block font-semibold text-white">
                  Email (Optional)
                </label>
                <p className="mt-1 text-sm text-subheadingWhite break-words">
                  {currentRecipient.email}
                </p>
              </div>
            )}
            {/* Bank Name (Optional) */}
            {currentRecipient.bankName && (
              <div>
                <label className="block font-semibold text-white">
                  Bank name
                </label>
                <p className="mt-1 text-sm text-subheadingWhite break-words">
                  {currentRecipient.bankName}
                </p>
              </div>
            )}
            {/* Address (Optional) */}
            {currentRecipient.address && (
              <div className="sm:col-span-2">
                <label className="block font-semibold text-white">
                  Address
                </label>
                <p className="mt-1 text-sm text-subheadingWhite break-words">
                  {currentRecipient.address}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Nickname Popup Component */}
        <NicknamePopup
          isOpen={isNicknamePopupOpen}
          onClose={handleCloseNicknamePopup}
          title={currentRecipient.nickname ? "Edit nickname" : "Add nickname"}
          description={
            currentRecipient.nickname
              ? "Update the nickname for this account."
              : "Add a nickname so you can easily find this account."
          }
        >
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block font-semibold text-white/90 text-left"
            >
              Account nickname (Optional)
            </label>
            <input
              type="text"
              id="nickname"
              className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all ease-linear duration-75 focus:outline-none focus:border-[#5f5f5f]"
              placeholder="E.g., Savings, John Doe USD"
              maxLength={40}
              value={nicknameInput}
              onChange={(e) => {
                setNicknameInput(e.target.value);
                // Clear error instantly when user types
                if (error?.toLowerCase().includes('nickname')) setError(null);
              }}
              aria-describedby="nickname-char-count nickname-error"
            />
            <p
              id="nickname-char-count"
              className="mt-2 text-subheadingWhite font-semibold text-xs"
            >
              {nicknameInput.length}/40 characters
            </p>
            {/* Display nickname-specific errors here */}
            {error?.toLowerCase().includes('nickname') && (
                <p id="nickname-error" className="mt-1 text-red-500 text-xs">{error}</p>
            )}
          </div>
          <button
            className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full px-8 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
            onClick={handleSaveNickname}
            // Disable save if nickname hasn't changed or during loading
            disabled={loadingRecipient || nicknameInput === (currentRecipient.nickname || "")}
          >
            Save
          </button>
        </NicknamePopup>

        {/* Delete Recipient Modal */}
        <DeleteRecipientModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDeleteRecipient}
          recipientName={displayName} // Use display name for consistency
          onConfirmDelete={handleConfirmDeleteRecipient}
        />
      </div>
    </section>
  );
};

export default RecipientDetailsPage;
