// import Link from "next/link";
// import React from "react";
// import { BsExclamationLg } from "react-icons/bs";

// export default function ChangePassword() {
//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Change password</h2>

//         <div className="space-y-4">
//           <div className="bg-lightgray rounded-xl p-4 flex items-start gap-4 mt-8">
//             <div className="p-3 bg-yellow-400 rounded-full">
//               <BsExclamationLg size={24} className="text-main" />
//             </div>

//             <div className="flex flex-col gap-3">
//               <p className="text-gray">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 that’s only known by you.
//               </p>

//               <Link
//                 href={""}
//                 className="text-secondary w-fit text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-secondary after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           <div>
//             <form className="space-y-6 max-w-sm">
//               <div className="">
//                 <label
//                   htmlFor="accountNumber"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="text"
//                   id="accountNumber"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a current password"
//                 />
//               </div>

//               <div className="">
//                 <label
//                   htmlFor="ifscCode"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Your new password
//                 </label>
//                 <input
//                   type="text"
//                   id="ifscCode"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a new password"

//                 />
//               </div>

//                 {/* Save Button */}
//               <div className="w-full text-center">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-secondary font-medium rounded-full border border-transparent hover:bg-primary/80 cursor-pointer transition-colors duration-150 ease-in-out "
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
















// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { BsExclamationLg } from "react-icons/bs";
// import { ChangeEvent, FormEvent } from "react"; // Import ChangeEvent and FormEvent from React
// import { FiX } from "react-icons/fi";
// import { LuCheck } from "react-icons/lu";

// export default function ChangePassword() {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const isSaveButtonDisabled = !currentPassword || !newPassword;

//   const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
//     setCurrentPassword(e.target.value);
//   };

//   const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
//     setNewPassword(e.target.value);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     // Explicitly type 'e' as FormEvent<HTMLFormElement>
//     e.preventDefault();
//     if (!isSaveButtonDisabled) {
//       // Handle form submission logic here (e.g., API call to change password)
//       console.log("Form submitted with:", { currentPassword, newPassword });
//       // Reset form fields after submission if needed
//       setCurrentPassword("");
//       setNewPassword("");
//     }
//   };

//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Change password</h2>

//         <div className="space-y-4 max-w-md">
//           <div className="bg-lightgray rounded-xl p-4 flex items-start gap-4 mt-8">
//             <div className="p-3 bg-yellow-400 rounded-full">
//               <BsExclamationLg size={24} className="text-main" />
//             </div>

//             <div className="flex flex-col gap-3">
//               <p className="text-gray">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 that’s only known by you.
//               </p>

//               <Link
//                 href={""}
//                 className="text-secondary w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-secondary after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           {/* Error Message :- Current Password */}
//           <div className="bg-lightgray rounded-xl p-4 flex items-center gap-4">
//             <div className="p-1 bg-red-700 rounded-full">
//               <FiX size={24} className="text-lightgray" />
//             </div>

//             <p className="text-gray">Invalid current password</p>
//           </div>

//           {/* Error Message :- Don't allow same password */}
//           <div className="bg-lightgray rounded-xl p-4 flex items-center gap-4">
//             <div className="p-1 bg-red-700 rounded-full">
//               <FiX size={24} className="text-lightgray" />
//             </div>

//             <p className="text-gray">
//               Your new password can't be the same as the current one.
//             </p>
//           </div>

//           <div>
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Current Password */}
//               <div className="">
//                 <label
//                   htmlFor="currentPassword"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="password"
//                   id="currentPassword"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a current password"
//                   value={currentPassword}
//                   onChange={handleCurrentPasswordChange}
//                 />
//               </div>

//               {/* New Password */}
//               <div className="">
//                 <label
//                   htmlFor="newPassword"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Your new password
//                 </label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a new password"
//                   value={newPassword}
//                   onChange={handleNewPasswordChange}
//                 />
//               </div>

//               {/* Password Message */}
//               <div className="flex items-start gap-4 mt-4">
//                 <div className="p-1 bg-yellow-400 rounded-full mt-1">
//                   <BsExclamationLg size={12} className="text-main" />
//                 </div>

//                 <p className="text-gray text-sm">
//                   Password must contain a{" "}
//                   <span className="line-through font-semibold">
//                     &nbsp;letter&nbsp;
//                   </span>
//                   and<span className="font-semibold">&nbsp;a number</span>, and
//                   be minimum of
//                   <span className="font-semibold">&nbsp;9 characters</span>
//                 </p>
//               </div>

//               {/* Sorted Message */}
//               <div className="flex items-start gap-4">
//                 <div className="p-1 bg-green rounded-full mt-1">
//                   <LuCheck size={12} className="text-white" />
//                 </div>
//                 <p className="text-gray text-sm">
//                   That’s your password sorted.
//                 </p>
//               </div>

//               {/* Save Button */}
//               <div className="w-full text-center">
//                 <button
//                   type="submit"
//                   disabled={isSaveButtonDisabled}
//                   className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-medium rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
//                     isSaveButtonDisabled
//                       ? "bg-lightgray cursor-not-allowed"
//                       : "bg-primary hover:bg-primary/80 cursor-pointer"
//                   }`}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { BsExclamationLg } from "react-icons/bs";
// import { ChangeEvent, FormEvent } from "react";
// import { FiX } from "react-icons/fi";
// import { LuCheck, LuEye, LuEyeClosed } from "react-icons/lu"; // Import LuEye and LuEyeClosed

// export default function ChangePassword() {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [showSamePasswordError, setShowSamePasswordError] = useState(false);
//   const [showInvalidCurrentPasswordError, setShowInvalidCurrentPasswordError] =
//     useState(false);
//   const [showPasswordMessage, setShowPasswordMessage] = useState(true);
//   const [showSortedMessage, setShowSortedMessage] = useState(false);
//   const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // State for password visibility

//   // Declare isNewPasswordValid function BEFORE isSaveButtonDisabled
//   const isNewPasswordValid = () => {
//     const hasLetter = /[a-zA-Z]/.test(newPassword);
//     const hasNumber = /[0-9]/.test(newPassword);
//     const isLongEnough = newPassword.length >= 9;
//     return hasLetter && hasNumber && isLongEnough;
//   };

//   const isSaveButtonDisabled =
//     !currentPassword || !newPassword || !isNewPasswordValid();
//   const correctCurrentPassword = "kartavya27";

//   const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCurrentPassword(e.target.value);
//     setShowInvalidCurrentPasswordError(false);
//     setShowSamePasswordError(false);
//   };

//   const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const passwordValue = e.target.value;
//     setNewPassword(passwordValue);
//     setShowSamePasswordError(false);
//     setShowInvalidCurrentPasswordError(false);
//     validateNewPassword(passwordValue);
//   };

//   const validateNewPassword = (password: string) => {
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const isLongEnough = password.length >= 9;

//     if (hasLetter && hasNumber && isLongEnough) {
//       setShowPasswordMessage(false);
//       setShowSortedMessage(true);
//     } else {
//       setShowPasswordMessage(true);
//       setShowSortedMessage(false);
//     }
//   };

//   useEffect(() => {
//     validateNewPassword(newPassword);
//   }, [newPassword]);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setShowSamePasswordError(false);
//     setShowInvalidCurrentPasswordError(false);

//     if (!isSaveButtonDisabled) {
//       if (currentPassword === newPassword) {
//         setShowSamePasswordError(true);
//         setShowInvalidCurrentPasswordError(false);
//       } else if (currentPassword !== correctCurrentPassword) {
//         setShowInvalidCurrentPasswordError(true);
//         setShowSamePasswordError(false);
//       } else {
//         console.log("Password changed successfully!");
//         setCurrentPassword("");
//         setNewPassword("");
//         setShowPasswordMessage(true);
//         setShowSortedMessage(false);
//       }
//     }
//   };

//   const toggleNewPasswordVisibility = () => {
//     setIsNewPasswordVisible(!isNewPasswordVisible);
//   };

//   const handleCopyPassword = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Change password</h2>

//         <div className="space-y-4 w-full md:max-w-lg">
//           <div className="bg-lightgray dark:bg-primarybox rounded-xl p-4 flex items-start gap-4 mt-8">
//             <div className="p-3 bg-yellow-400 rounded-full">
//               <BsExclamationLg size={24} className="text-main" />
//             </div>

//             <div className="flex flex-col gap-3">
//               <p className="text-gray-500 dark:text-gray-300">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 that’s only known by you.
//               </p>

//               <Link
//                 href={""}
//                 className="text-neutral-900 dark:text-white w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-neutral-900 dark:after:bg-white after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           {/* Error Message :- Current Password */}
//           {showInvalidCurrentPasswordError && (
//             <div className="bg-lightgray rounded-xl p-4 flex items-center gap-4">
//               <div className="p-1 bg-red-700 rounded-full">
//                 <FiX size={24} className="text-lightgray" />
//               </div>
//               <p className="text-gray">Invalid current password</p>
//             </div>
//           )}

//           {/* Error Message :- Don't allow same password */}
//           {showSamePasswordError && (
//             <div className="bg-lightgray rounded-xl p-4 flex items-center gap-4">
//               <div className="p-1 bg-red-700 rounded-full">
//                 <FiX size={24} className="text-lightgray" />
//               </div>
//               <p className="text-gray">
//                 Your new password can't be the same as the current one.
//               </p>
//             </div>
//           )}

//           <div>
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Current Password */}
//               <div className="">
//                 <label
//                   htmlFor="currentPassword"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="password"
//                   id="currentPassword"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80"
//                   placeholder="Enter a current password"
//                   value={currentPassword}
//                   onChange={handleCurrentPasswordChange}
//                 />  
//               </div>

//               {/* New Password */}
//               <div className="relative"> {/* Make position relative for icon positioning */}
//                 <label
//                   htmlFor="newPassword"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Your new password
//                 </label>
//                 <input
//                   type={isNewPasswordVisible ? "text" : "password"} // Conditional type
//                   id="newPassword"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80"
//                   placeholder="Enter a new password"
//                   value={newPassword}
//                   onChange={handleNewPasswordChange}
//                   onCopy={handleCopyPassword} // Disable copy
//                   onCut={handleCopyPassword} // Disable cut (optional, for extra precaution)
//                   />
//                 <button
//                   type="button" // Important: type="button" to prevent form submission
//                   className="absolute right-4 top-10 focus:outline-none"
//                   onClick={toggleNewPasswordVisibility}
//                 >
//                   {isNewPasswordVisible ? (
//                     <LuEye size={20} className="text-gray-500 dark:text-gray-300" />
//                   ) : (
//                     <LuEyeClosed size={20} className="text-gray-500 dark:text-gray-300" />
//                   )}
//                 </button>
//               </div>

//               {/* Password Message */}
//               {showPasswordMessage && (
//                 <div className="flex items-start gap-4 mt-4">
//                   <div className="p-1 bg-yellow-400 rounded-full">
//                     <BsExclamationLg size={14} className="text-main" />
//                   </div>

//                   <p className="text-neutral-900 dark:text-white text-sm">
//                     Password must contain a{" "}
//                     <span className="line-through font-semibold">
//                        letter 
//                     </span>
//                     and<span className="font-semibold"> a number</span>, and
//                     be minimum of
//                     <span className="font-semibold"> 9 characters</span>
//                   </p>
//                 </div>
//               )}

//               {/* Sorted Message */}
//               {showSortedMessage && (
//                 <div className="flex items-start gap-4">
//                   <div className="p-1 bg-green dark:bg-green-600/20 rounded-full">
//                     <LuCheck size={14} className="text-lightgray dark:text-green-600 " />
//                   </div>
//                   <p className="text-neutral-900 dark:text-white text-sm">
//                     That’s your password sorted.
//                   </p>
//                 </div>
//               )}

//               {/* Save Button */}
//               <div className="w-full text-center">
//                 <button
//                   type="submit"
//                   disabled={isSaveButtonDisabled}
//                   className={`inline-flex items-center justify-center w-full px-6 py-3 h-12.5 text-secondary font-medium rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
//                     isSaveButtonDisabled
//                       ? "bg-lightborder cursor-not-allowed opacity-60"
//                       : "bg-primary text-neutral-900 hover:bg-primaryhover cursor-pointer"
//                   }`}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { BsExclamationLg } from "react-icons/bs";
// import { ChangeEvent, FormEvent } from "react";
// import { FiX } from "react-icons/fi";
// import { LuCheck, LuEye, LuEyeClosed } from "react-icons/lu"; // Import LuEye and LuEyeClosed

// export default function ChangePassword() {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [showSamePasswordError, setShowSamePasswordError] = useState(false);
//   const [showInvalidCurrentPasswordError, setShowInvalidCurrentPasswordError] =
//     useState(false);
//   const [showPasswordMessage, setShowPasswordMessage] = useState(true);
//   const [showSortedMessage, setShowSortedMessage] = useState(false);
//   const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // State for password visibility

//   // Declare isNewPasswordValid function BEFORE isSaveButtonDisabled
//   const isNewPasswordValid = () => {
//     const hasLetter = /[a-zA-Z]/.test(newPassword);
//     const hasNumber = /[0-9]/.test(newPassword);
//     const isLongEnough = newPassword.length >= 9;
//     return hasLetter && hasNumber && isLongEnough;
//   };

//   const isSaveButtonDisabled =
//     !currentPassword || !newPassword || !isNewPasswordValid();
//   const correctCurrentPassword = "kartavya27"; // In a real app, this should come from auth state/API

//   const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCurrentPassword(e.target.value);
//     setShowInvalidCurrentPasswordError(false);
//     setShowSamePasswordError(false);
//   };

//   const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const passwordValue = e.target.value;
//     setNewPassword(passwordValue);
//     setShowSamePasswordError(false);
//     setShowInvalidCurrentPasswordError(false);
//     validateNewPassword(passwordValue);
//   };

//   const validateNewPassword = (password: string) => {
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const isLongEnough = password.length >= 9;

//     if (hasLetter && hasNumber && isLongEnough) {
//       setShowPasswordMessage(false);
//       setShowSortedMessage(true);
//     } else {
//       setShowPasswordMessage(true);
//       setShowSortedMessage(false);
//     }
//   };

//   useEffect(() => {
//     // Validate initial state or when newPassword changes
//     validateNewPassword(newPassword);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [newPassword]); // Dependency array includes newPassword

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setShowSamePasswordError(false);
//     setShowInvalidCurrentPasswordError(false);

//     if (isSaveButtonDisabled) {
//       return; // Don't proceed if the button should be disabled
//     }

//     if (currentPassword === newPassword) {
//       setShowSamePasswordError(true);
//     } else if (currentPassword !== correctCurrentPassword) {
//       // In a real app, you'd verify against the actual current password via API
//       setShowInvalidCurrentPasswordError(true);
//     } else {
//       // --- Success ---
//       // In a real app, you would make an API call here to change the password
//       console.log("Password change initiated (simulated)");
//       alert("Password changed successfully!"); // Simple feedback for now

//       // Reset state after successful change
//       setCurrentPassword("");
//       setNewPassword("");
//       setShowPasswordMessage(true); // Reset validation message visibility
//       setShowSortedMessage(false);
//       setIsNewPasswordVisible(false); // Hide password again
//       setShowInvalidCurrentPasswordError(false); // Ensure errors are cleared
//       setShowSamePasswordError(false);
//     }
//   };

//   const toggleNewPasswordVisibility = () => {
//     setIsNewPasswordVisible(!isNewPasswordVisible);
//   };

//   const handleCopyPassword = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     // Prevent copying/cutting password fields for security
//     e.preventDefault();
//   };

//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Change password</h2>

//         <div className="space-y-4 w-full md:max-w-lg">
//           {/* Informational Message */}
//           <div className="bg-lightgray dark:bg-primarybox rounded-xl p-4 flex items-start gap-4 mt-8">
//             <div className="p-3 bg-yellow-400 rounded-full flex-shrink-0"> {/* Added flex-shrink-0 */}
//               <BsExclamationLg size={24} className="text-main" />
//             </div>
//             <div className="flex flex-col gap-3">
//               <p className="text-gray-500 dark:text-gray-300">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 {/* Fixed: Replaced ’ with ’ */}
//                 that’s only known by you.
//               </p>
//               <Link
//                 href="#" // Use a valid href or "#" for placeholder links
//                 className="text-neutral-900 dark:text-white w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-neutral-900 dark:after:bg-white after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           {/* Error Message: Invalid Current Password */}
//           {showInvalidCurrentPasswordError && (
//             <div className="bg-lightgray dark:bg-red-600/20 border rounded-xl p-4 flex items-center gap-4">
//               <div className="p-1 bg-red-700 rounded-full">
//                 <FiX size={24} className="text-lightgray" />
//               </div>
//               <p className="text-gray-500 dark:text-white">Invalid current password</p>
//             </div>
//           )}

//           {/* Error Message: Same Password */}
//           {showSamePasswordError && (
//             <div className="bg-lightgray dark:bg-red-600/20 border rounded-xl p-4 flex items-center gap-4">
//               <div className="p-1 bg-red-700 rounded-full">
//                 <FiX size={24} className="text-lightgray" />
//               </div>
//               <p className="text-red-700 dark:text-red-400">
//                 {/* Fixed: Replaced ' with ' */}
//                 Your new password can&apos;t be the same as the current one.
//               </p>
//             </div>
//           )}

//           {/* Password Change Form */}
//           <div>
//             <form className="space-y-6" onSubmit={handleSubmit} noValidate> {/* Added noValidate */}
//               {/* Current Password Input */}
//               <div>
//                 <label
//                   htmlFor="currentPassword"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="password"
//                   id="currentPassword"
//                   name="currentPassword" // Added name attribute
//                   autoComplete="current-password" // Added autocomplete attribute
//                   className={`autofill:bg-transparent  w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 placeholder:text-neutral-600 dark:placeholder:text-white/80 focus:outline-none focus:ring-2 dark:focus:ring-offset-0 dark:bg-primarybox ${
//                     showInvalidCurrentPasswordError
//                       ? "border-red-500 dark:border-red-700 focus:ring-red-500/50 dark:focus:ring-red-700/50"
//                       : "border-neutral-600 dark:border-white/40 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:ring-primary/50 dark:focus:ring-white/50 dark:focus:shadow-whitecolor focus:shadow-darkcolor"
//                    }`}
//                   placeholder="Enter current password"
//                   value={currentPassword}
//                   onChange={handleCurrentPasswordChange}
//                   required // Added required attribute
//                 />
//               </div>

//               {/* New Password Input */}
//               <div className="relative">
//                 <label
//                   htmlFor="newPassword"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   New password
//                 </label>
//                 <input
//                   type={isNewPasswordVisible ? "text" : "password"}
//                   id="newPassword"
//                   name="newPassword" // Added name attribute
//                   autoComplete="new-password" // Added autocomplete attribute
//                   className={`autofill:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 pr-12 border transition-shadow ease-in-out duration-300 placeholder:text-neutral-600 dark:placeholder:text-white/80 focus:outline-none focus:ring-2 dark:focus:ring-offset-0 dark:bg-primarybox ${
//                     (showSamePasswordError || (newPassword && !isNewPasswordValid())) && !showSortedMessage // Show error border if same password or invalid (and not yet sorted)
//                       ? "border-red-500 dark:border-red-700 focus:ring-red-500/50 dark:focus:ring-red-700/50"
//                       : "border-neutral-600 dark:border-white/40 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:ring-primary/50 dark:focus:ring-white/50 dark:focus:shadow-whitecolor focus:shadow-darkcolor"
//                   }`}
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={handleNewPasswordChange}
//                   onCopy={handleCopyPassword} // Prevent copy
//                   onCut={handleCopyPassword}  // Prevent cut
//                   required // Added required attribute
//                   aria-describedby="password-hint" // Link to hint text
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none" // Adjusted positioning and styling
//                   onClick={toggleNewPasswordVisibility}
//                   aria-label={isNewPasswordVisible ? "Hide password" : "Show password"} // Accessibility
//                 >
//                   {isNewPasswordVisible ? (
//                     <LuEye size={20} />
//                   ) : (
//                     <LuEyeClosed size={20} />
//                   )}
//                 </button>
//               </div>

//               {/* Password Hint/Validation Message Area */}
//               <div id="password-hint">
//                 {/* Password Requirements Message */}
//                 {showPasswordMessage && (
//                   <div className="flex items-start gap-3 mt-2 p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600/50">
//                      <div className="flex-shrink-0 pt-0.5">
//                        <BsExclamationLg size={16} className="text-yellow-600 dark:text-yellow-400" />
//                     </div>
//                     <p className="text-yellow-800 dark:text-yellow-200 text-sm">
//                       Password must contain a letter and a number, and be minimum 9 characters long.
//                     </p>
//                   </div>
//                 )}

//                 {/* Password Valid Message */}
//                 {showSortedMessage && (
//                   <div className="flex items-start gap-3 mt-2 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-600/50">
//                      <div className="flex-shrink-0 pt-0.5">
//                        <LuCheck size={16} className="text-green-600 dark:text-green-400" />
//                      </div>
//                     <p className="text-green-800 dark:text-green-200 text-sm">
//                       {/* Fixed: Replaced ’ with ’ */}
//                       That’s your new password sorted.
//                     </p>
//                   </div>
//                 )}
//               </div>


//               {/* Save Button */}
//               <div className="pt-2"> {/* Added padding top for spacing */}
//                 <button
//                   type="submit"
//                   disabled={isSaveButtonDisabled}
//                   className={`inline-flex items-center justify-center w-full px-6 py-3 h-12.5 text-base font-medium rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-primarybox ${
//                     isSaveButtonDisabled
//                       ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                       : "bg-primary text-neutral-900 hover:bg-primaryhover focus:ring-primary"
//                   }`}
//                 >
//                   Save changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { BsExclamationLg } from "react-icons/bs";
// import { FiX } from "react-icons/fi";
// import { LuCheck, LuEye, LuEyeClosed } from "react-icons/lu";
// import { useAuth } from "@/app/contexts/AuthContext"; // Import useAuth
// import userService from "@/app/services/user"; // Import user service
// import { Loader2 } from "lucide-react"; // For loading indicator

// export default function ChangePassword() {
//   const { token, logout } = useAuth(); // Get token and logout function from context
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [showSamePasswordError, setShowSamePasswordError] = useState(false);
//   const [showInvalidCurrentPasswordError, setShowInvalidCurrentPasswordError] = useState(false);
//   const [showPasswordMessage, setShowPasswordMessage] = useState(true);
//   const [showSortedMessage, setShowSortedMessage] = useState(false);
//   const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false); // API loading state
//   const [apiError, setApiError] = useState<string | null>(null); // General API error message
//   const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message

//   // --- Existing functions: isNewPasswordValid, handleCurrentPasswordChange, handleNewPasswordChange, validateNewPassword, toggleNewPasswordVisibility, handleCopyPassword ---

//   const isNewPasswordValid = () => {
//     const hasLetter = /[a-zA-Z]/.test(newPassword);
//     const hasNumber = /[0-9]/.test(newPassword);
//     const isLongEnough = newPassword.length >= 8; // Match backend minimum length
//     return hasLetter && hasNumber && isLongEnough;
//   };

//   const isSaveButtonDisabled =
//     !currentPassword || !newPassword || !isNewPasswordValid() || loading; // Disable during loading

//   // Removed hardcoded 'correctCurrentPassword'

//   const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCurrentPassword(e.target.value);
//     setShowInvalidCurrentPasswordError(false); // Clear specific error on change
//     setApiError(null); // Clear general API error
//     setSuccessMessage(null); // Clear success message
//   };

//   const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const passwordValue = e.target.value;
//     setNewPassword(passwordValue);
//     setShowSamePasswordError(false); // Clear specific error on change
//     setApiError(null); // Clear general API error
//     setSuccessMessage(null); // Clear success message
//     validateNewPassword(passwordValue);
//   };

//   const validateNewPassword = (password: string) => {
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const isLongEnough = password.length >= 8; // Match backend minimum length

//     if (hasLetter && hasNumber && isLongEnough) {
//       setShowPasswordMessage(false);
//       setShowSortedMessage(true);
//     } else {
//       setShowPasswordMessage(true);
//       setShowSortedMessage(false);
//     }
//   };

//   useEffect(() => {
//     validateNewPassword(newPassword);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [newPassword]);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Clear previous errors/messages
//     setShowSamePasswordError(false);
//     setShowInvalidCurrentPasswordError(false);
//     setApiError(null);
//     setSuccessMessage(null);

//     if (isSaveButtonDisabled) {
//       return;
//     }

//     // Client-side check for same password (optional, backend does it too)
//     if (currentPassword === newPassword) {
//       setShowSamePasswordError(true);
//       return;
//     }

//     // Ensure token exists
//     if (!token) {
//       setApiError("Authentication error. Please log in again.");
//       // Optionally logout or redirect here
//       // logout('manual');
//       return;
//     }

//     setLoading(true); // Start loading indicator

//     try {
//       // Call the API service function
//       const response = await userService.changePassword(
//         { currentPassword, newPassword },
//         token
//       );

//       // --- Success ---
//       console.log("Password change successful:", response.message);
//       setSuccessMessage(response.message || "Password changed successfully!"); // Use message from API

//       // Reset state after successful change
//       setCurrentPassword("");
//       setNewPassword("");
//       setShowPasswordMessage(true);
//       setShowSortedMessage(false);
//       setIsNewPasswordVisible(false);
//       setShowInvalidCurrentPasswordError(false);
//       setShowSamePasswordError(false);
//       setApiError(null);

//       // Optional: Keep success message for a few seconds
//       // setTimeout(() => setSuccessMessage(null), 5000);

//     } catch (error: any) {
//       console.error("Password change failed:", error);
//       const errorMessage = error.message || "An unexpected error occurred.";

//       // Handle specific error messages from the backend
//       if (errorMessage.includes('Incorrect current password')) {
//         setShowInvalidCurrentPasswordError(true);
//         setApiError(null); // Don't show general error if specific one is shown
//       } else if (errorMessage.includes('New password cannot be the same')) {
//         setShowSamePasswordError(true);
//          setApiError(null);
//       } else {
//         // Show general API error message
//         setApiError(errorMessage);
//         setShowInvalidCurrentPasswordError(false); // Hide specific error if showing general one
//         setShowSamePasswordError(false);
//       }
//     } finally {
//       setLoading(false); // Stop loading indicator
//     }
//   };

//   const toggleNewPasswordVisibility = () => {
//     setIsNewPasswordVisible(!isNewPasswordVisible);
//   };

//   const handleCopyPassword = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Change password</h2>

//         <div className="space-y-4 w-full md:max-w-lg mt-8"> {/* Added mt-8 */}
//           {/* Informational Message */}
//           <div className="bg-lightgray dark:bg-primarybox rounded-xl p-4 flex items-start gap-4 ">
//             <div className="p-3 bg-yellow-400 rounded-full flex-shrink-0">
//               <BsExclamationLg size={24} className="text-main" />
//             </div>
//             <div className="flex flex-col gap-3">
//               <p className="text-gray-500 dark:text-gray-300">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 that’s only known by you.
//               </p>
//               <Link
//                 href="#"
//                 className="text-neutral-900 dark:text-white w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-neutral-900 dark:after:bg-white after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           {/* --- Messages Area --- */}
//           <div className="space-y-3">
//             {/* API Error Message */}
//             {apiError && (
//               <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-600/50 rounded-xl p-4 flex items-center gap-4">
//                 <div className="p-1 bg-red-600 rounded-full flex-shrink-0">
//                   <FiX size={20} className="text-white" />
//                 </div>
//                 <p className="text-red-700 dark:text-red-300 text-sm font-medium">{apiError}</p>
//               </div>
//             )}

//             {/* Success Message */}
//             {successMessage && (
//               <div className="bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-600/50 rounded-xl p-4 flex items-center gap-4">
//                 <div className="p-1 bg-green-600 rounded-full flex-shrink-0">
//                   <LuCheck size={20} className="text-white" />
//                 </div>
//                 <p className="text-green-700 dark:text-green-300 text-sm font-medium">{successMessage}</p>
//               </div>
//             )}

//             {/* Error Message: Invalid Current Password */}
//             {showInvalidCurrentPasswordError && (
//               <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-600/50 rounded-xl p-4 flex items-center gap-4">
//                 <div className="p-1 bg-red-600 rounded-full flex-shrink-0">
//                   <FiX size={20} className="text-white" />
//                 </div>
//                 <p className="text-red-700 dark:text-red-300 text-sm font-medium">Incorrect current password.</p>
//               </div>
//             )}

//             {/* Error Message: Same Password */}
//             {showSamePasswordError && (
//               <div className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-600/50 rounded-xl p-4 flex items-center gap-4">
//                 <div className="p-1 bg-red-600 rounded-full flex-shrink-0">
//                   <FiX size={20} className="text-white" />
//                 </div>
//                 <p className="text-red-700 dark:text-red-300 text-sm font-medium">
//                   Your new password can't be the same as the current one.
//                 </p>
//               </div>
//             )}
//           </div>
//           {/* --- End Messages Area --- */}


//           {/* Password Change Form */}
//           <div>
//             <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//               {/* Current Password Input */}
//               <div>
//                 <label
//                   htmlFor="currentPassword"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="password"
//                   id="currentPassword"
//                   name="currentPassword"
//                   autoComplete="current-password"
//                   className={`autofill:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 placeholder:text-neutral-600 dark:placeholder:text-white/80 focus:outline-none focus:ring-2 dark:focus:ring-offset-0 dark:bg-primarybox ${
//                     showInvalidCurrentPasswordError
//                       ? "border-red-500 dark:border-red-700 focus:ring-red-500/50 dark:focus:ring-red-700/50"
//                       : "border-neutral-600 dark:border-white/40 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:ring-primary/50 dark:focus:ring-white/50 dark:focus:shadow-whitecolor focus:shadow-darkcolor"
//                   }`}
//                   placeholder="Enter current password"
//                   value={currentPassword}
//                   onChange={handleCurrentPasswordChange}
//                   required
//                   disabled={loading} // Disable input when loading
//                 />
//               </div>

//               {/* New Password Input */}
//               <div className="relative">
//                 <label
//                   htmlFor="newPassword"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   New password
//                 </label>
//                 <input
//                   type={isNewPasswordVisible ? "text" : "password"}
//                   id="newPassword"
//                   name="newPassword"
//                   autoComplete="new-password"
//                   className={`autofill:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 pr-12 border transition-shadow ease-in-out duration-300 placeholder:text-neutral-600 dark:placeholder:text-white/80 focus:outline-none focus:ring-2 dark:focus:ring-offset-0 dark:bg-primarybox ${
//                     (showSamePasswordError || (newPassword && !isNewPasswordValid())) && !showSortedMessage && !successMessage // Show error border if same password or invalid (and not yet sorted/successful)
//                       ? "border-red-500 dark:border-red-700 focus:ring-red-500/50 dark:focus:ring-red-700/50"
//                       : "border-neutral-600 dark:border-white/40 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:ring-primary/50 dark:focus:ring-white/50 dark:focus:shadow-whitecolor focus:shadow-darkcolor"
//                   }`}
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={handleNewPasswordChange}
//                   onCopy={handleCopyPassword}
//                   onCut={handleCopyPassword}
//                   required
//                   aria-describedby="password-hint"
//                   disabled={loading} // Disable input when loading
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
//                   onClick={toggleNewPasswordVisibility}
//                   aria-label={isNewPasswordVisible ? "Hide password" : "Show password"}
//                   disabled={loading} // Disable button when loading
//                 >
//                   {isNewPasswordVisible ? (
//                     <LuEye size={20} />
//                   ) : (
//                     <LuEyeClosed size={20} />
//                   )}
//                 </button>
//               </div>

//               {/* Password Hint/Validation Message Area */}
//               {/* Only show hints if no success message */}
//               {!successMessage && (
//                  <div id="password-hint">
//                   {/* Password Requirements Message */}
//                   {showPasswordMessage && (
//                     <div className="flex items-start gap-3 mt-2 p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600/50">
//                       <div className="flex-shrink-0 pt-0.5">
//                         <BsExclamationLg size={16} className="text-yellow-600 dark:text-yellow-400" />
//                       </div>
//                       <p className="text-yellow-800 dark:text-yellow-200 text-sm">
//                         Password must contain a letter and a number, and be minimum 8 characters long.
//                       </p>
//                     </div>
//                   )}

//                   {/* Password Valid Message */}
//                   {showSortedMessage && !showPasswordMessage && ( // Only show if requirements met and initial message hidden
//                     <div className="flex items-start gap-3 mt-2 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-600/50">
//                       <div className="flex-shrink-0 pt-0.5">
//                         <LuCheck size={16} className="text-green-600 dark:text-green-400" />
//                       </div>
//                       <p className="text-green-800 dark:text-green-200 text-sm">
//                         That’s your new password sorted.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}


//               {/* Save Button */}
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={isSaveButtonDisabled} // Updated condition
//                   className={`inline-flex items-center justify-center w-full px-6 py-3 h-12.5 text-base font-medium rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-primarybox ${
//                     isSaveButtonDisabled
//                       ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                       : "bg-primary text-neutral-900 hover:bg-primaryhover focus:ring-primary"
//                   }`}
//                 >
//                   {loading ? (
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   ) : null}
//                   {loading ? "Saving..." : "Save changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import Link from "next/link";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { LuCheck, LuEye, LuEyeClosed } from "react-icons/lu";
import { useAuth } from "@/app/contexts/AuthContext"; // Import useAuth
import userService from "@/app/services/user"; // Import user service
import { Loader2 } from "lucide-react"; // For loading indicator
import DashboardHeader from "@/app/components/layout/DashboardHeader";

export default function ChangePassword() {
  const { token, logout } = useAuth(); // Get token and logout function from context
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showSamePasswordError, setShowSamePasswordError] = useState(false);
  const [showInvalidCurrentPasswordError, setShowInvalidCurrentPasswordError] = useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(true);
  const [showSortedMessage, setShowSortedMessage] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // API loading state
  const [apiError, setApiError] = useState<string | null>(null); // General API error message
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message

  // --- Existing functions: isNewPasswordValid, handleCurrentPasswordChange, handleNewPasswordChange, validateNewPassword, toggleNewPasswordVisibility, handleCopyPassword ---

  const isNewPasswordValid = () => {
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const isLongEnough = newPassword.length >= 8; // Match backend minimum length
    return hasLetter && hasNumber && isLongEnough;
  };

  const isSaveButtonDisabled =
    !currentPassword || !newPassword || !isNewPasswordValid() || loading; // Disable during loading

  // Removed hardcoded 'correctCurrentPassword'

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    setShowInvalidCurrentPasswordError(false); // Clear specific error on change
    setApiError(null); // Clear general API error
    setSuccessMessage(null); // Clear success message
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setNewPassword(passwordValue);
    setShowSamePasswordError(false); // Clear specific error on change
    setApiError(null); // Clear general API error
    setSuccessMessage(null); // Clear success message
    validateNewPassword(passwordValue);
  };

  const validateNewPassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8; // Match backend minimum length

    if (hasLetter && hasNumber && isLongEnough) {
      setShowPasswordMessage(false);
      setShowSortedMessage(true);
    } else {
      setShowPasswordMessage(true);
      setShowSortedMessage(false);
    }
  };

  useEffect(() => {
    validateNewPassword(newPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear previous errors/messages
    setShowSamePasswordError(false);
    setShowInvalidCurrentPasswordError(false);
    setApiError(null);
    setSuccessMessage(null);

    if (isSaveButtonDisabled) {
      return;
    }

    // Client-side check for same password (optional, backend does it too)
    if (currentPassword === newPassword) {
      setShowSamePasswordError(true);
      return;
    }

    // Ensure token exists
    if (!token) {
      setApiError("Authentication error. Please log in again.");
      // Optionally logout or redirect here
      // logout('manual');
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      // Call the API service function
      const response = await userService.changePassword(
        { currentPassword, newPassword },
        token
      );

      // --- Success ---
      console.log("Password change successful:", response.message);
      setSuccessMessage(response.message || "Password changed successfully!"); // Use message from API

      // Reset state after successful change
      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordMessage(true);
      setShowSortedMessage(false);
      setIsNewPasswordVisible(false);
      setShowInvalidCurrentPasswordError(false);
      setShowSamePasswordError(false);
      setApiError(null);

      // Optional: Keep success message for a few seconds
      // setTimeout(() => setSuccessMessage(null), 5000);

    } catch (error: any) {
      console.error("Password change failed:", error);
      const errorMessage = error.message || "An unexpected error occurred.";

      // Handle specific error messages from the backend
      if (errorMessage.includes('Incorrect current password')) {
        setShowInvalidCurrentPasswordError(true);
        setApiError(null); // Don't show general error if specific one is shown
      } else if (errorMessage.includes('New password cannot be the same')) {
        setShowSamePasswordError(true);
         setApiError(null);
      } else {
        // Show general API error message
        setApiError(errorMessage);
        setShowInvalidCurrentPasswordError(false); // Hide specific error if showing general one
        setShowSamePasswordError(false);
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleCopyPassword = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <section className="ChangePasswor">
      <div className="">
        <DashboardHeader title="Change Password" />

        <div className="space-y-4 w-full lg:max-w-lg mt-8">
          {" "}
          {/* Added mt-8 */}
          {/* Informational Message */}
          <div className="bg-lightgray dark:bg-primarybox rounded-xl p-4 flex items-start gap-4 ">
            <div className="p-3 bg-yellow-400 rounded-full flex-shrink-0">
              <BsExclamationLg size={24} className="text-main" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 dark:text-gray-300">
                We will never send you a temporary password by phone, email or
                text message. When changing your password, always use something
                that’s only known by you.
              </p>
              <Link
                href="#"
                className="text-neutral-900 dark:text-white w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-900 dark:after:bg-white after:mt-1"
              >
                Learn how to keep your account safe
              </Link>
            </div>
          </div>
          {/* --- Messages Area --- */}
          <div className="space-y-3">
            {/* API Error Message */}

            {apiError && (
              <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
                <div className="flex-shrink-0 size-10  rounded-full flex items-center justify-center bg-red-600/20">
                  <FiAlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <p className="text-red-700 dark:text-red-300/90">{apiError}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 dark:bg-green-900/25 border border-green-500 rounded-lg p-3 flex items-center gap-3">
                <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-green-600/20">
                  <LuCheck className="text-green-600 dark:text-green-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <p className="text-green-700 dark:text-green-300/90">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Error Message: Invalid Current Password */}
            {showInvalidCurrentPasswordError && (
              <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
                <div className="flex-shrink-0 size-10  rounded-full flex items-center justify-center bg-red-600/20">
                  <FiAlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <p className="text-red-700 dark:text-red-300/90">
                  Incorrect current password.
                </p>
              </div>
            )}

            {/* Error Message: Same Password */}
            {showSamePasswordError && (
              <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
                <div className="flex-shrink-0 size-10  rounded-full flex items-center justify-center bg-red-600/20">
                  <FiAlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <p className="text-red-700 dark:text-red-300/90">
                  Your new password can't be the same as the current one.
                </p>
              </div>
            )}
          </div>
          {/* --- End Messages Area --- */}
          {/* Password Change Form */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Current Password Input */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                >
                  Current password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  autoComplete="current-password"
                  className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
                    showInvalidCurrentPasswordError
                      ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
                      : "focus:border-[#5f5f5f]"
                  }`}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  required
                  disabled={loading} // Disable input when loading
                />
              </div>

              {/* New Password Input */}
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                >
                  New password
                </label>
                <input
                  type={isNewPasswordVisible ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  autoComplete="new-password"
                  className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
                    (showSamePasswordError ||
                      (newPassword && !isNewPasswordValid())) &&
                    !showSortedMessage &&
                    !successMessage // Show error border if same password or invalid (and not yet sorted/successful)
                      ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
                      : "focus:border-[#5f5f5f]"
                  }`}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  onCopy={handleCopyPassword}
                  onCut={handleCopyPassword}
                  required
                  aria-describedby="password-hint"
                  disabled={loading} // Disable input when loading
                />
                <button
                  type="button"
                  className="absolute right-4 top-11.5 text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
                  onClick={toggleNewPasswordVisibility}
                  aria-label={
                    isNewPasswordVisible ? "Hide password" : "Show password"
                  }
                  disabled={loading} // Disable button when loading
                >
                  {isNewPasswordVisible ? (
                    <LuEye size={20} />
                  ) : (
                    <LuEyeClosed size={20} />
                  )}
                </button>
              </div>

              {/* Password Hint/Validation Message Area */}
              {/* Only show hints if no success message */}
              {!successMessage && (
                <div id="password-hint">
                  {/* Password Requirements Message */}
                  {showPasswordMessage && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/25 border border-yellow-500 rounded-lg p-3 flex items-start gap-3">
                      <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-yellow-600/20">
                        <BsExclamationLg className="text-yellow-600 dark:text-yellow-500 size-5 sm:size-6 flex-shrink-0" />
                      </div>
                      <p className="text-yellow-700 dark:text-yellow-300/90">
                        Password must contain a letter and a number, and be
                        minimum 8 characters long.
                      </p>
                    </div>
                  )}

                  {/* Password Valid Message */}
                  {/* Only show if requirements met and initial message hidden */}
                  {showSortedMessage && !showPasswordMessage && (
                      <div className="bg-green-50 dark:bg-green-900/25 border border-green-500 rounded-lg p-3 flex items-center gap-3">
                        <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-green-600/20">
                          <LuCheck className="text-green-600 dark:text-green-500 size-5 sm:size-6 flex-shrink-0" />
                        </div>
                        <p className="text-green-700 dark:text-green-300/90">
                          That’s your new password sorted.
                        </p>
                      </div>
                    )}
                </div>
              )}

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaveButtonDisabled} // Updated condition
                  className={` flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed `}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : null}
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}