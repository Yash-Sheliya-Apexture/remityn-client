// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons\
// type AccountCardProps = {
//   username: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level
//   const popupRef = useRef<HTMLDivElement>(null); // Ref for the popup content

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//     setUploadedImage(null); // Clear uploaded image as well
//     setZoom(1);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 2 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 2000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   const handleChooseAnotherPhoto = () => {
//     setSelectedFile(null);
//     setZoom(1); // Reset zoom
//     triggerFileInput(); // Open file selector again
//   };

//   const handleRemovePhoto = () => {
//     setUploadedImage(null); // Remove the uploaded image
//     setSelectedFile(null); // Clear the selected file as well
//     setZoom(1);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         handleClosePhotoPopup();
//       }
//     };

//     if (showPhotoPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPhotoPopup]);

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl overflow-hidden">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center overflow-hidden">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-20 object-cover"
//                   style={{ maxWidth: "100%", maxHeight: "100%" }}
//                 />
//               ) : (
//                 <div className="p-5">
//                   <FiUser className="size-6" />
//                 </div>
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
//             </div>
//           </div>
//         </div>

//         <h1 className="text-4xl font-black tracking-tighter text-center mb-2">
//           {username}
//         </h1>
//         <p className="text-center font-medium capitalize mb-6">
//           Your personal account
//         </p>
//       </div>

//       <div className="text-center mt-6">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div
//           className="fixed top-0 left-0 w-full h-full  bg-black/50 backdrop-blur-xs flex items-center justify-center
//         "
//         >
//           <div
//             className="relative bg-white lg:rounded-2xl lg:h-9/10 shadow-xl w-full h-full max-w-xl"
//             ref={popupRef}
//           >
//             <div className="flex items-center justify-between p-2 mt-5">
//               <h2 className="lg:text-xl text-lg font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10 text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="lg:p-8 p-4">
//               {uploading ? (
//                 <>
//                   <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                     <div className="animate-spin rounded-full size-16 border-t-2 border-b-2 border-primary"></div>
//                     <p className="text-main font-semibold text-xl capitalize mb-2">
//                       Uploading...
//                     </p>
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                   <div>
//                     {/* text */}
//                     <p className="text-gray leading-relaxed text-center mb-10">
//                       It should be smaller than 2MB, and it should show your
//                       face. That way, your friends and family will know it's
//                       you.
//                     </p>

//                     {/* buttons */}
//                     <div className="flex flex-col justify-center">
//                       <button
//                         onClick={handleClosePhotoPopup}
//                         className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleRemovePhoto}
//                         className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
//                       >
//                         Remove current photo
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full lg:size-36 size-24 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-3">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full lg:py-3 py-2 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleChooseAnotherPhoto}
//                       className="text-secondary cursor-pointer lg:text-lg text-base font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="lg:p-3.5 p-2 bg-white rounded-full">
//                     <IoCloudUploadOutline className="lg:size-8 size-6 text-main" />
//                   </div>
//                   <p className="text-main font-semibold lg:text-xl text-lg text-center capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover text-sm mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 lg:text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10 text-sm lg:text-base">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full lg:py-3 py-2 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="text-secondary cursor-pointer lg:text-lg text-base font-medium text-center lg:mt-8 mt-5 underline underline-offset-4 capitalize"
//                     >
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;



// // src/app/components/AccountCard.tsx
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";

// type AccountCardProps = {
//   username: string;
// };

// // Helper function to get initials
// const getInitials = (name: string): string => {
//   if (!name) return "??"; // Handle empty or null name

//   const nameParts = name.trim().split(/\s+/); // Split by one or more spaces, handles multiple spaces

//   if (nameParts.length === 1 && nameParts[0].length > 0) {
//     // If only one name, take the first two letters if possible
//     return nameParts[0].substring(0, 2).toUpperCase();
//   } else if (nameParts.length > 1) {
//     // If multiple names, take the first letter of the first and last name part
//     const firstInitial = nameParts[0][0] || "";
//     const lastInitial = nameParts[nameParts.length - 1][0] || "";
//     return (firstInitial + lastInitial).toUpperCase();
//   }

//   return "??"; // Fallback for unexpected cases
// };

// const AccountCard: React.FC<AccountCardProps> = ({ username }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false); // Keep or remove based on actual need

//   const router = useRouter();
//   // const pathname = usePathname(); // Removed if not used
//   const { logout } = useAuth();

//   // Removed refs related to photo upload: fileInputRef, popupRef

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   // Calculate initials
//   const initials = getInitials(username);

//   return (
//     <>
//       {/* Main card container */}
//       <div className="bg-lightgray dark:bg-primarybox p-8 rounded-3xl overflow-hidden z-20 relative">
//         {/* Profile initials display */}
//         <div className="flex flex-col items-center mb-4">
//           {/* Removed the relative positioning and camera icon overlay */}
//           <div className="bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center size-20 overflow-hidden">
//             {/* Display Initials instead of Icon/Image */}
//             <span className="text-3xl font-semibold text-neutral-900 dark:text-white select-none">
//               {initials}
//             </span>
//             {/* Removed FiUser icon fallback and uploadedImage img tag */}
//           </div>
//         </div>

//         {/* User details */}
//         <h1 className="text-4xl text-mainheading dark:text-white font-black tracking-tighter text-center mb-2">
//           {username}
//         </h1>
//         <p className="text-center text-subheading dark:text-gray-300 font-medium capitalize mb-6">
//           Your personal account
//         </p>

//         {/* Logout button */}
//         <div className="text-center mt-6">
//           <button
//             onClick={handleLogout}
//             className="bg-primary hover:bg-primaryhover text-neutral-900 px-4 py-1.5 rounded-full font-semibold transition-all duration-75 ease-linear cursor-pointer"
//           >
//             Log Out
//           </button>
//         </div>
//       </div>

//       {/* Confirmation message (if needed for something else, otherwise remove) */}
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied! {/* Adjust text if needed */}
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;



// // src/app/components/AccountCard.tsx
// "use client";
// import React from "react"; // Removed useState as it's no longer needed
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/contexts/AuthContext";

// type AccountCardProps = {
//   username: string;
// };

// // Helper function to get initials
// const getInitials = (name: string): string => {
//   if (!name) return "??"; // Handle empty or null name

//   const nameParts = name.trim().split(/\s+/); // Split by one or more spaces, handles multiple spaces

//   if (nameParts.length === 1 && nameParts[0].length > 0) {
//     // If only one name, take the first two letters if possible
//     return nameParts[0].substring(0, 2).toUpperCase();
//   } else if (nameParts.length > 1) {
//     // If multiple names, take the first letter of the first and last name part
//     const firstInitial = nameParts[0][0] || "";
//     const lastInitial = nameParts[nameParts.length - 1][0] || "";
//     return (firstInitial + lastInitial).toUpperCase();
//   }

//   return "??"; // Fallback for unexpected cases
// };

// const AccountCard: React.FC<AccountCardProps> = ({ username }) => {
//   const router = useRouter();
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   // Calculate initials
//   const initials = getInitials(username);

//   return (
//     <>
//       {/* Main card container */}
//       <div className="bg-lightgray dark:bg-primarybox p-8 rounded-3xl overflow-hidden relative">
//         {/* Profile initials display */}
//         <div className="flex flex-col items-center mb-4">
//           <div className="bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center size-20 overflow-hidden">
//             {/* Display Initials instead of Icon/Image */}
//             <span className="text-3xl font-semibold text-neutral-900 dark:text-white select-none">
//               {initials}
//             </span>
//           </div>
//         </div>

//         {/* User details */}
//         <h1 className="text-4xl text-mainheading dark:text-white font-black tracking-tighter text-center mb-2">
//           {username}
//         </h1>
//         <p className="text-center text-subheading dark:text-gray-300 font-medium capitalize mb-6">
//           Your personal account
//         </p>

//         {/* Logout button */}
//         <div className="text-center mt-6">
//           <button
//             onClick={handleLogout}
//             className="bg-primary hover:bg-primaryhover text-neutral-900 px-4 py-1.5 rounded-full font-semibold transition-all duration-75 ease-linear cursor-pointer"
//           >
//             Log Out
//           </button>
//         </div>
//       </div>

//       {/* Removed the unused confirmation message block */}
//       {/*
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}
//       */}
//     </>
//   );
// };

// export default AccountCard;



// src/app/components/AccountCard.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext"; // Adjust path if needed
import { BsFillCheckCircleFill } from "react-icons/bs"; // Verification icon

// --- Interface for User object from AuthContext ---
// IMPORTANT: Ensure this structure matches your actual useAuth hook's user object.
// Especially the path to the KYC status.
interface AuthUser {
  fullName?: string; // Or firstName, lastName, etc. depending on your structure
  kyc?: {
    status:
      | "verified"
      | "pending"
      | "not_started"
      | "rejected"
      | null
      | undefined;
  };
  // Add other fields like email, id, etc., if needed by the component or context
}

// --- Interface for the AuthContext value ---
interface AuthContextType {
  user: AuthUser | null;
  logout: () => void;
  loading: boolean; // Include loading if provided and needed
}

// --- Component Prop Types ---
type AccountCardProps = {
  username: string; // Display name passed as prop
};

// --- Helper function to get initials ---
const getInitials = (name: string): string => {
  if (!name) return "??"; // Handle empty or null name

  const nameParts = name.trim().split(/\s+/); // Split by one or more spaces

  if (nameParts.length === 1 && nameParts[0].length > 0) {
    // Single name: first two letters
    return nameParts[0].substring(0, 2).toUpperCase();
  } else if (nameParts.length > 1) {
    // Multiple names: first letter of first and last name part
    const firstInitial = nameParts[0][0] || "";
    const lastInitial = nameParts[nameParts.length - 1][0] || "";
    return (firstInitial + lastInitial).toUpperCase();
  }

  return "??"; // Fallback
};

// --- AccountCard Component ---
const AccountCard: React.FC<AccountCardProps> = ({ username }) => {
  const router = useRouter();
  // Explicitly type the context value for better safety
  const { user, logout } = useAuth() as AuthContextType;

  const handleLogout = () => {
    logout(); // Call the logout function from context
    router.push("/auth/login"); // Redirect to login page
  };

  const isVerified = user?.kyc?.status === 'verified';

  // Calculate initials from the passed username prop
  const initials = getInitials(username);

  return (
    <>
      {/* Main card container */}
      <div className="bg-lightgray dark:bg-primarybox sm:p-8 p-4 rounded-3xl overflow-hidden relative">
        {/* Profile initials display area */}
        <div className="flex flex-col items-center mb-4">
          {/* Initials circle container - Added 'relative' for icon positioning */}
          <div className="relative bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center size-20">
            {/* Display Initials */}
            <span className="text-3xl font-semibold text-neutral-900 dark:text-white select-none">
              {initials}
            </span>

            {/* --- Verification Icon (Conditionally Re ndered) --- */}
            {isVerified && (
              <div
                className="absolute -bottom-1 -right-1 bg-lightgray dark:bg-[#2E2E2E] p-1 rounded-full" // Adjusted background/border for visibility
                title="Verified Account" // Tooltip for accessibility
              >
                <BsFillCheckCircleFill
                  className="size-5 text-green-500" // Changed to green, adjust size/color as needed
                />
              </div>
            )}
            {/* --- End Verification Icon --- */}
          </div>
        </div>

        {/* User details */}
        <div>
          <h1 className="lg:text-4xl md:text-3xl text-2xl text-center font-black font-mont text-mainheading dark:text-white uppercase wrap-break-word mb-2">
            {username} {/* Display the username passed via props */}
          </h1>
          <p className="text-center text-gray-700 dark:text-gray-300 font-medium capitalize mb-6">
            Your personal account
          </p>
        </div>

        {/* Logout button */}
        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-primary hover:bg-primaryhover text-neutral-900 px-6 py-2 rounded-full font-semibold transition-all duration-75 ease-linear cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountCard;