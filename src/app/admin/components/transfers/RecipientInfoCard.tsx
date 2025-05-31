// "use client";
// import React from "react";
// import { User, Building, CreditCard, Info, Mail, Type, MapPin, Hash, Star } from "lucide-react"; // Added more specific icons
// import { Badge } from "@/components/ui/badge";

// interface RecipientInfoCardProps {
//   recipient: any; // Consider defining a Recipient type/interface
// }

// const FallbackAvatar: React.FC<{ name: string }> = ({ name }) => (
//     <span className="font-bold text-xl">
//       {name ? name.charAt(0).toUpperCase() : "R"}
//     </span>
//   );

// const RecipientInfoCard: React.FC<RecipientInfoCardProps> = ({ recipient }) => {
//   if (!recipient) return <p>Recipient information not available.</p>;

//   const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | undefined | null }> = ({ icon: Icon, label, value }) => (
//     value ? (
//         <div className="flex items-start"> {/* Changed to items-start for long values */}
//             <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                 <Icon className="w-4 h-4 text-neutral-900 dark:text-white" />
//             </div>
//             <div className="min-w-0"> {/* Allow text wrapping */}
//                 <p className="text-xs text-gray-500 dark:text-gray-300">{label}</p>
//                 <p className="text-sm font-medium text-neutral-900 dark:text-white break-words">
//                     {value}
//                 </p>
//             </div>
//         </div>
//     ) : null // Don't render if value is missing
//   );


//   return (
//     <div className="mb-8">
//       <h4 className="inline-flex items-center bg-purple-50 dark:bg-purple-600/15 text-purple-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-purple-600/50">
//         <User className="size-4 mr-1.5 flex-shrink-0" />
//         Recipient Information
//       </h4>

//       <div className="flex flex-col rounded-xl border p-4">
//         {/* Recipient Header */}
//         <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
//             {recipient.profileImage ? (
//               <img
//                 src={recipient.profileImage}
//                 alt="Recipient"
//                 className="w-full h-full object-cover"
//                  onError={(e) => (e.currentTarget.style.display = "none")}
//               />
//              ) : (
//                  <FallbackAvatar name={recipient.accountHolderName} />
//              )}
//               {!recipient.profileImage && <FallbackAvatar name={recipient.accountHolderName} />}
//           </div>

//           <div className="ml-0 sm:ml-4 flex-grow w-full">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//               <h5 className="font-semibold text-neutral-900 dark:text-white text-lg break-words mr-2">
//                 {recipient.accountHolderName || "N/A"}
//               </h5>
//               <Badge
//                 variant="outline"
//                 className="bg-purple-50 dark:bg-purple-600/15 text-purple-600 border-purple-600/50 hover:bg-purple-100 text-xs mt-1 sm:mt-0 flex-shrink-0"
//               >
//                 Recipient
//               </Badge>
//             </div>
//             {recipient.email && (
//                <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm break-words mt-1">
//                   <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-500 dark:text-gray-300" />
//                   {recipient.email}
//                </div>
//             )}
//              {recipient.nickname && (
//                 <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm break-words mt-1">
//                     <Star className="w-3.5 h-3.5 mr-1.5 text-gray-500 dark:text-gray-300" />
//                     Nickname: {recipient.nickname}
//                 </div>
//             )}
//           </div>
//         </div>

//         {/* Recipient Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3 border-t">
//              <DetailItem icon={User} label="Account Holder Name" value={recipient.accountHolderName} />
//              <DetailItem icon={Building} label="Bank Name" value={recipient.bankName} />
//              <DetailItem icon={Type} label="Account Type" value={recipient.accountType} />
//              <DetailItem icon={CreditCard} label="Account Number" value={recipient.accountNumber} />
//              <DetailItem icon={Hash} label="IFSC Code" value={recipient.ifscCode} />
//              <DetailItem icon={Info} label="SWIFT/BIC Code" value={recipient.swiftCode} />
//              <DetailItem icon={Info} label="IBAN" value={recipient.iban} />

//             {/* Address spans full width on medium screens and up if present */}
//              {recipient.address && (
//                 <div className="md:col-span-2 flex items-start">
//                     <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                         <MapPin className="w-4 h-4 text-neutral-900 dark:text-white" />
//                     </div>
//                     <div className="min-w-0">
//                         <p className="text-xs text-gray-500 dark:text-gray-300">Address</p>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white break-words">
//                             {recipient.address}
//                         </p>
//                     </div>
//                 </div>
//              )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientInfoCard;



// "use client";
// import React from "react";
// import Image from 'next/image'; // Import next/image
// import { User, Building, CreditCard, Info, Mail, Type, MapPin, Hash, Star } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// // Define a specific type for the recipient object
// interface Recipient {
//   profileImage?: string | null;
//   accountHolderName?: string | null; // Allow null/undefined based on usage
//   email?: string | null;
//   nickname?: string | null;
//   bankName?: string | null;
//   accountType?: string | null;
//   accountNumber?: string | null;
//   ifscCode?: string | null;
//   swiftCode?: string | null;
//   iban?: string | null;
//   address?: string | null;
// }

// interface RecipientInfoCardProps {
//   recipient: Recipient | null | undefined; // Use the defined type, allow null/undefined based on the check
// }

// const FallbackAvatar: React.FC<{ name?: string | null }> = ({ name }) => ( // Allow name to be optional/null
//     <span className="font-bold text-xl">
//       {name ? name.charAt(0).toUpperCase() : "R"} {/* Handle potentially missing name */}
//     </span>
//   );

// const RecipientInfoCard: React.FC<RecipientInfoCardProps> = ({ recipient }) => {
//   // Handle the case where the entire recipient object might be null or undefined
//   if (!recipient) return <p>Recipient information not available.</p>;

//   const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | undefined | null }> = ({ icon: Icon, label, value }) => (
//     value ? (
//         <div className="flex items-start">
//             <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                 <Icon className="w-4 h-4 text-neutral-900 dark:text-white" />
//             </div>
//             <div className="min-w-0">
//                 <p className="text-xs text-gray-500 dark:text-gray-300">{label}</p>
//                 <p className="text-sm font-medium text-neutral-900 dark:text-white break-words">
//                     {value}
//                 </p>
//             </div>
//         </div>
//     ) : null
//   );


//   return (
//     <div className="mb-8">
//       <h4 className="inline-flex items-center bg-purple-50 dark:bg-purple-600/15 text-purple-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-purple-600/50">
//         <User className="size-4 mr-1.5 flex-shrink-0" />
//         Recipient Information
//       </h4>

//       <div className="flex flex-col rounded-xl border p-4">
//         {/* Recipient Header */}
//         <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
//           {/* Use relative positioning for next/image with layout="fill" */}
//           <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
//             {recipient.profileImage ? (
//               <Image
//                 src={recipient.profileImage}
//                 alt={recipient.accountHolderName || "Recipient Avatar"} // Provide alt text
//                 layout="fill" // Fill the parent container
//                 objectFit="cover" // Mimic object-cover class
//                 // Note: The onError behavior of hiding the element cannot be directly
//                 // replicated with next/image without using state. The fallback below
//                 // handles the case where profileImage is initially missing.
//                 // If the image URL is valid but fails to load, next/image might show
//                 // a broken image icon or the alt text, depending on the browser.
//               />
//              ) : (
//                  <FallbackAvatar name={recipient.accountHolderName} />
//              )}
//              {/* Removed redundant FallbackAvatar check here */}
//           </div>

//           <div className="ml-0 sm:ml-4 flex-grow w-full">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//               {/* Use fallback directly in the text display */}
//               <h5 className="font-semibold text-neutral-900 dark:text-white text-lg break-words mr-2">
//                 {recipient.accountHolderName || "N/A"}
//               </h5>
//               <Badge
//                 variant="outline"
//                 className="bg-purple-50 dark:bg-purple-600/15 text-purple-600 border-purple-600/50 hover:bg-purple-100 text-xs mt-1 sm:mt-0 flex-shrink-0"
//               >
//                 Recipient
//               </Badge>
//             </div>
//             {recipient.email && (
//                <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm break-words mt-1">
//                   <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-500 dark:text-gray-300" />
//                   {recipient.email}
//                </div>
//             )}
//              {recipient.nickname && (
//                 <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm break-words mt-1">
//                     <Star className="w-3.5 h-3.5 mr-1.5 text-gray-500 dark:text-gray-300" />
//                     Nickname: {recipient.nickname}
//                 </div>
//             )}
//           </div>
//         </div>

//         {/* Recipient Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3 border-t">
//              {/* Pass potentially null/undefined values safely */}
//              <DetailItem icon={User} label="Account Holder Name" value={recipient.accountHolderName} />
//              <DetailItem icon={Building} label="Bank Name" value={recipient.bankName} />
//              <DetailItem icon={Type} label="Account Type" value={recipient.accountType} />
//              <DetailItem icon={CreditCard} label="Account Number" value={recipient.accountNumber} />
//              <DetailItem icon={Hash} label="IFSC Code" value={recipient.ifscCode} />
//              <DetailItem icon={Info} label="SWIFT/BIC Code" value={recipient.swiftCode} />
//              <DetailItem icon={Info} label="IBAN" value={recipient.iban} />

//             {/* Address spans full width on medium screens and up if present */}
//              {recipient.address && (
//                 <div className="md:col-span-2 flex items-start">
//                     <div className="w-8 h-8 rounded-full bg-lightgray dark:bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                         <MapPin className="w-4 h-4 text-neutral-900 dark:text-white" />
//                     </div>
//                     <div className="min-w-0">
//                         <p className="text-xs text-gray-500 dark:text-gray-300">Address</p>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white break-words">
//                             {recipient.address}
//                         </p>
//                     </div>
//                 </div>
//              )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientInfoCard;


// // FILE: src/app/admin/components/transfers/RecipientInfoCard.tsx
// // No changes needed based on the errors provided for this file.
// // Keeping the optimized version from the prompt.
// "use client";
// import React from "react";
// import Image from 'next/image'; // Import next/image
// import { User, Building, CreditCard, Info, Mail, Type, MapPin, Hash, Star } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// // Define a specific type for the recipient object
// interface Recipient {
//   profileImage?: string | null;
//   accountHolderName?: string | null; // Allow null/undefined based on usage
//   email?: string | null;
//   nickname?: string | null;
//   bankName?: string | null;
//   accountType?: string | null;
//   accountNumber?: string | null;
//   ifscCode?: string | null;
//   swiftCode?: string | null;
//   iban?: string | null;
//   address?: string | null;
// }

// interface RecipientInfoCardProps {
//   recipient: Recipient | null | undefined; // Use the defined type, allow null/undefined based on the check
// }

// const FallbackAvatar: React.FC<{ name?: string | null }> = ({ name }) => ( // Allow name to be optional/null
//     <span className="font-bold text-xl">
//       {name ? name.charAt(0).toUpperCase() : "R"} {/* Handle potentially missing name */}
//     </span>
//   );

// const RecipientInfoCard: React.FC<RecipientInfoCardProps> = ({ recipient }) => {
//   // Handle the case where the entire recipient object might be null or undefined
//   if (!recipient) return <p className="text-mainheadingWhite">Recipient information not available.</p>;

//   const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | undefined | null }> = ({ icon: Icon, label, value }) => (
//     value ? (
//         <div className="flex items-start">
//             <div className="w-8 h-8 rounded-full bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                 <Icon className="w-4 h-4 text-white" />
//             </div>
//             <div className="min-w-0">
//                 <p className="text-xs text-subheadingWhite">{label}</p>
//                 <p className="text-sm font-medium text-mainheadingWhite break-words">
//                     {value}
//                 </p>
//             </div>
//         </div>
//     ) : null
//   );


//   return (
//     <div className="mb-8">
//       <h4 className="inline-flex items-center bg-purple-500/15 text-purple-500 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-purple-600/50">
//         <User className="size-4 mr-1.5 flex-shrink-0" />
//         Recipient Information
//       </h4>

//       <div className="flex flex-col rounded-xl border p-4">
//         {/* Recipient Header */}
//         <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
//           {/* Use relative positioning for next/image */}
//           <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
//             {recipient.profileImage ? (
//               <Image
//                 src={recipient.profileImage}
//                 alt={recipient.accountHolderName || "Recipient Avatar"}
//                 fill // Use fill instead of layout="fill" and objectFit
//                 className="object-cover" // Use className for object-fit
//               />
//              ) : (
//                  <FallbackAvatar name={recipient.accountHolderName} />
//              )}
//           </div>

//           <div className="ml-0 sm:ml-4 flex-grow w-full">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
//               <h5 className="font-semibold text-mainheadingWhite text-lg break-words mr-2">
//                 {recipient.accountHolderName || "N/A"}
//               </h5>
//               <Badge
//                 variant="outline"
//                 className="bg-purple-500/15 text-purple-500 border-purple-600/50 text-sm mt-1 sm:mt-0 flex-shrink-0 px-2 py-1"
//               >
//                 Recipient
//               </Badge>
//             </div>
//             {recipient.email && (
//                <div className="flex items-center text-subheadingWhite text-sm break-words mt-1">
//                   <Mail className="w-3.5 h-3.5 mr-1.5" />
//                   {recipient.email}
//                </div>
//             )}
//              {recipient.nickname && (
//                 <div className="flex items-center text-subheadingWhite text-sm break-words mt-1">
//                     <Star className="w-3.5 h-3.5 mr-1.5" />
//                     Nickname: {recipient.nickname}
//                 </div>
//             )}
//           </div>
//         </div>

//         {/* Recipient Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3 border-t">
//              <DetailItem icon={User} label="Account Holder Name" value={recipient.accountHolderName} />
//              <DetailItem icon={Building} label="Bank Name" value={recipient.bankName} />
//              <DetailItem icon={Type} label="Account Type" value={recipient.accountType} />
//              <DetailItem icon={CreditCard} label="Account Number" value={recipient.accountNumber} />
//              <DetailItem icon={Hash} label="IFSC Code" value={recipient.ifscCode} />
//              <DetailItem icon={Info} label="SWIFT/BIC Code" value={recipient.swiftCode} />
//              <DetailItem icon={Info} label="IBAN" value={recipient.iban} />

//             {/* Address spans full width on medium screens and up if present */}
//              {recipient.address && (
//                 <div className="md:col-span-2 flex items-start">
//                     <div className="w-8 h-8 rounded-full bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
//                         <MapPin className="w-4 h-4 text-white" />
//                     </div>
//                     <div className="min-w-0">
//                         <p className="text-xs text-subheadingWhite">Address</p>
//                         <p className="text-sm font-medium text-mainheadingWhite break-words">
//                             {recipient.address}
//                         </p>
//                     </div>
//                 </div>
//              )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientInfoCard;

// FILE: src/app/admin/components/transfers/RecipientInfoCard.tsx
"use client";
import React from "react";
import Image from 'next/image';
import { User, Building, CreditCard, Info, Mail, Type, MapPin, Hash, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define a specific type for the recipient object, aligning with what might be passed
interface Recipient {
  profileImage?: string | null;
  accountHolderName?: string | null;
  email?: string | null;
  nickname?: string | null;
  bankName?: string | null;
  accountType?: string | null;
  accountNumber?: string | null;
  ifscCode?: string | null;
  swiftCode?: string | null;
  iban?: string | null;
  address?: string | null;
}

interface RecipientInfoCardProps {
  recipient: Recipient | null | undefined;
}

const FallbackAvatar: React.FC<{ name?: string | null }> = ({ name }) => (
  <span className="font-bold text-xl">
    {name ? name.charAt(0).toUpperCase() : "R"}
  </span>
);

// Re-using the DetailItem component for consistent styling and conditional rendering
const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | undefined | null }> = ({ icon: Icon, label, value }) => {
  if (!value) return null; // Only render if value is present
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-full bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-subheadingWhite">{label}</p>
        <p className="text-sm font-medium text-mainheadingWhite break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

const RecipientInfoCard: React.FC<RecipientInfoCardProps> = ({ recipient }) => {
  // Handle the case where the entire recipient object might be null or undefined
  if (!recipient) return <p className="text-mainheadingWhite">Recipient information not available.</p>;

  return (
    <div className="mb-8">
      <h4 className="inline-flex items-center bg-purple-500/15 text-purple-500 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-purple-600/50">
        <User className="size-4 mr-1.5 flex-shrink-0" />
        Recipient Information
      </h4>

      <div className="flex flex-col rounded-xl border p-4">
        {/* Recipient Header */}
        <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 flex-shrink-0 mb-3 sm:mb-0 overflow-hidden">
            {recipient.profileImage ? (
              <Image
                src={recipient.profileImage}
                alt={recipient.accountHolderName || "Recipient Avatar"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 48px, 64px" // Add sizes for better performance
              />
            ) : (
              <FallbackAvatar name={recipient.accountHolderName} />
            )}
          </div>

          <div className="ml-0 sm:ml-4 flex-grow w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-0">
              <h5 className="font-semibold text-mainheadingWhite text-lg break-words mr-2">
                {recipient.accountHolderName || "N/A"}
              </h5>
              <Badge
                variant="outline"
                className="bg-purple-500/15 text-purple-500 border-purple-600/50 text-sm mt-1 sm:mt-0 flex-shrink-0 px-2 py-1"
              >
                Recipient
              </Badge>
            </div>
            {recipient.email && (
              <div className="flex items-center text-subheadingWhite text-sm break-words mt-1">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                {recipient.email}
              </div>
            )}
            {recipient.nickname && (
              <div className="flex items-center text-subheadingWhite text-sm break-words mt-1">
                <Star className="w-3.5 h-3.5 mr-1.5" />
                Nickname: {recipient.nickname}
              </div>
            )}
          </div>
        </div>

        {/* Recipient Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-3 border-t">
          <DetailItem icon={User} label="Account Holder Name" value={recipient.accountHolderName} />
          <DetailItem icon={Building} label="Bank Name" value={recipient.bankName} />
          <DetailItem icon={Type} label="Account Type" value={recipient.accountType} />
          <DetailItem icon={CreditCard} label="Account Number" value={recipient.accountNumber} />
          <DetailItem icon={Hash} label="IFSC Code" value={recipient.ifscCode} />
          <DetailItem icon={Info} label="SWIFT/BIC Code" value={recipient.swiftCode} />
          <DetailItem icon={Info} label="IBAN" value={recipient.iban} />

          {/* Address spans full width on medium screens and up if present */}
          {recipient.address && (
            <div className="md:col-span-2 flex items-start">
              <div className="w-8 h-8 rounded-full bg-secondarybox flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-subheadingWhite">Address</p>
                <p className="text-sm font-medium text-mainheadingWhite break-words">
                  {recipient.address}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipientInfoCard;