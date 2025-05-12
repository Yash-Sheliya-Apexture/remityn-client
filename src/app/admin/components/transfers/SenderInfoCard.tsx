// "use client";
// import React from "react";
// import { User, Calendar } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface SenderInfoCardProps {
//   user: any; // Consider defining a User type/interface
// }

// const FallbackAvatar: React.FC<{ name: string }> = ({ name }) => (
//   <span className="font-bold text-xl">
//     {name ? name.charAt(0).toUpperCase() : "U"}
//   </span>
// );

// const SenderInfoCard: React.FC<SenderInfoCardProps> = ({ user }) => {
//   if (!user) return <p>Sender information not available.</p>; // Handle null user case

//   const memberSince = user.createdAt
//     ? new Date(user.createdAt).toLocaleDateString()
//     : "N/A";

//   return (
//     <div className="mb-8">
//       <h4 className="inline-flex items-center bg-sky-50 text-sky-600 dark:bg-sky-600/15 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-sky-600/50">
//         <User className="size-4 mr-1.5 flex-shrink-0" />
//         Sender Information
//       </h4>

//       <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
//         {/* Avatar */}
//         <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-sky-100 text-sky-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
//           {user.profileImage ? (
//             <img
//               src={user.profileImage}
//               alt="Sender"
//               className="w-full h-full object-cover"
//               onError={(e) => (e.currentTarget.style.display = "none")} // Hide img on error
//             />
//           ) : (
//              // Render fallback directly if image fails or isn't present
//              <FallbackAvatar name={user.fullName} />
//           )}
//            {/* Conditional fallback display using CSS/JS might be complex, simpler to always have fallback structure */}
//            {!user.profileImage && <FallbackAvatar name={user.fullName} />}
//         </div>

//         {/* Details */}
//         <div className="ml-0 sm:ml-4 flex-grow w-full">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//             <h5 className="font-semibold text-neutral-900 dark:text-white text-lg break-words mr-2">
//               {user.fullName || "N/A"}
//             </h5>
//             <Badge
//               variant="outline"
//               className="bg-sky-50 text-sky-600 border-sky-600/50 hover:bg-sky-100 dark:bg-sky-600/15 text-xs mt-1 sm:mt-0 flex-shrink-0"
//             >
//               Sender
//             </Badge>
//           </div>
//           <p className="text-gray-500 dark:text-gray-300 text-sm break-words">
//             {user.email || "Email not available"}
//           </p>

//           {/* Extra Info */}
//           <div className="mt-3 pt-3 border-t">
//             <div className="flex flex-wrap gap-x-6 gap-y-3">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
//                   <User className="w-4 h-4 text-neutral-900 dark:text-white" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">User ID</p>
//                   <p
//                     className="text-sm font-medium text-neutral-900 dark:text-white"
//                     title={user._id}
//                   >
//                     {user._id ? `${user._id}` : "N/A"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
//                   <Calendar className="w-4 h-4 text-neutral-900 dark:text-white" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">Member Since</p>
//                   <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                     {memberSince}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SenderInfoCard;




// "use client";
// import React from "react";
// import Image from "next/image"; // Import next/image
// import { User, Calendar } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// // Define a specific type for the user object
// interface SenderUser {
//   _id?: string | null;
//   fullName?: string | null;
//   email?: string | null;
//   profileImage?: string | null;
//   createdAt?: string | Date | null; // Allow string (ISO date) or Date object
// }

// interface SenderInfoCardProps {
//   // Use the defined type and allow null/undefined
//   user: SenderUser | null | undefined;
// }

// const FallbackAvatar: React.FC<{ name: string }> = ({ name }) => (
//   <span className="font-bold text-xl">
//     {/* Ensure name is a string before charAt */}
//     {name ? name.charAt(0).toUpperCase() : "U"}
//   </span>
// );

// const SenderInfoCard: React.FC<SenderInfoCardProps> = ({ user }) => {
//   // Handle null or undefined user case early
//   if (!user) {
//     return <p>Sender information not available.</p>;
//   }

//   const memberSince = user.createdAt
//     ? new Date(user.createdAt).toLocaleDateString()
//     : "N/A";

//   // Provide a default empty string for name if null/undefined for FallbackAvatar
//   const fallbackName = user.fullName || "";
//   // Improve alt text
//   const altText = user.fullName ? `${user.fullName}'s profile picture` : "Sender's profile picture";


//   return (
//     <div className="mb-8">
//       <h4 className="inline-flex items-center bg-sky-50 text-sky-600 dark:bg-sky-600/15 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-sky-600/50">
//         <User className="size-4 mr-1.5 flex-shrink-0" />
//         Sender Information
//       </h4>

//       <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
//         {/* Avatar Container - needs position: relative for Image with fill */}
//         <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-sky-100 text-sky-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
//           {user.profileImage ? (
//             // Use next/image component
//             <Image
//               src={user.profileImage}
//               alt={altText} // Use improved alt text
//               fill // Use fill to cover the container
//               className="object-cover" // Ensure image covers, not stretches
//               // onError can be handled by next/image, or add custom logic if needed
//               // For simplicity, we rely on the conditional rendering
//             />
//           ) : (
//              // Render fallback if image isn't present
//              <FallbackAvatar name={fallbackName} />
//           )}
//            {/* Removed redundant fallback rendering */}
//         </div>

//         {/* Details */}
//         <div className="ml-0 sm:ml-4 flex-grow w-full">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//             <h5 className="font-semibold text-neutral-900 dark:text-white text-lg break-words mr-2">
//               {user.fullName || "N/A"}
//             </h5>
//             <Badge
//               variant="outline"
//               className="bg-sky-50 text-sky-600 border-sky-600/50 hover:bg-sky-100 dark:bg-sky-600/15 text-xs mt-1 sm:mt-0 flex-shrink-0"
//             >
//               Sender
//             </Badge>
//           </div>
//           <p className="text-gray-500 dark:text-gray-300 text-sm break-words">
//             {user.email || "Email not available"}
//           </p>

//           {/* Extra Info */}
//           <div className="mt-3 pt-3 border-t">
//             <div className="flex flex-wrap gap-x-6 gap-y-3">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
//                   <User className="w-4 h-4 text-neutral-900 dark:text-white" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">User ID</p>
//                   <p
//                     className="text-sm font-medium text-neutral-900 dark:text-white"
//                     title={user._id || ""} // Add default value for title
//                   >
//                     {/* Use optional chaining for safer access */}
//                     {user._id ? `${user._id}` : "N/A"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
//                   <Calendar className="w-4 h-4 text-neutral-900 dark:text-white" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">Member Since</p>
//                   <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                     {memberSince}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SenderInfoCard;



// FILE: src/app/admin/components/transfers/SenderInfoCard.tsx
// No changes needed based on the errors provided for this file.
// Keeping the optimized version from the prompt.
"use client";
import React from "react";
import Image from "next/image"; // Import next/image
import { User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define a specific type for the user object
interface SenderUser {
  _id?: string | null;
  fullName?: string | null;
  email?: string | null;
  profileImage?: string | null;
  createdAt?: string | Date | null; // Allow string (ISO date) or Date object
}

interface SenderInfoCardProps {
  // Use the defined type and allow null/undefined
  user: SenderUser | null | undefined;
}

const FallbackAvatar: React.FC<{ name: string }> = ({ name }) => (
  <span className="font-bold text-xl">
    {/* Ensure name is a string before charAt */}
    {name ? name.charAt(0).toUpperCase() : "U"}
  </span>
);

const SenderInfoCard: React.FC<SenderInfoCardProps> = ({ user }) => {
  // Handle null or undefined user case early
  if (!user) {
    return <p>Sender information not available.</p>;
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString() // Handles both string and Date
    : "N/A";

  // Provide a default empty string for name if null/undefined for FallbackAvatar
  const fallbackName = user.fullName || "";
  // Improve alt text
  const altText = user.fullName ? `${user.fullName}'s profile picture` : "Sender's profile picture";


  return (
    <div className="mb-8">
      <h4 className="inline-flex items-center bg-sky-50 text-sky-600 dark:bg-sky-600/15 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-sky-600/50">
        <User className="size-4 mr-1.5 flex-shrink-0" />
        Sender Information
      </h4>

      <div className="flex items-start sm:items-center rounded-xl border p-4 flex-col sm:flex-row">
        {/* Avatar Container */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-sky-100 text-sky-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt={altText}
              fill
              className="object-cover"
            />
          ) : (
             <FallbackAvatar name={fallbackName} />
          )}
        </div>

        {/* Details */}
        <div className="ml-0 sm:ml-4 flex-grow w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
            <h5 className="font-semibold text-neutral-900 dark:text-white text-lg break-words mr-2">
              {user.fullName || "N/A"}
            </h5>
            <Badge
              variant="outline"
              className="bg-sky-50 text-sky-600 border-sky-600/50 hover:bg-sky-100 dark:bg-sky-600/15 text-xs mt-1 sm:mt-0 flex-shrink-0"
            >
              Sender
            </Badge>
          </div>
          <p className="text-gray-500 dark:text-gray-300 text-sm break-words">
            {user.email || "Email not available"}
          </p>

          {/* Extra Info */}
          <div className="mt-3 pt-3 border-t">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
                  <User className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">User ID</p>
                  <p
                    className="text-sm font-medium text-neutral-900 dark:text-white"
                    title={user._id || ""}
                  >
                    {user._id ? `${user._id}` : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Member Since</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderInfoCard;