// import React from "react";
// import Link from 'next/link';
// import { LuUser, LuMail, LuPhone } from "react-icons/lu";
// import { IoIosArrowForward } from "react-icons/io";



// export default function PersonalDetails() {
//   return (
//     <section className="personal-details py-10">
//       <div className="container-mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Personal details</h2>
        
//         <div className="mt-8 space-y-2">
//             {/* user account */}
//             <div>
//               <Link href="accout">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder rounded-full p-3 ">
//                     <LuUser  size={24} className="text-main" />
//                   </div>

//                   <div className="flex-grow">
//                     <span className="font-semibold text-main">Complete your account</span>
//                     <div className=" text-gray text-sm">
                     
//                     </div>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div>
//                     <IoIosArrowForward size={20} className="text-gray" />
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* user Email */}
//             <div>
//               <Link href="change-email">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder rounded-full p-3 ">
//                     <LuMail size={24} className="text-main" />
//                   </div>

//                   <div className="flex-grow">
//                     <span className="font-semibold text-main">Email Address</span>
//                     <div className=" text-gray text-sm">
//                         kartavyatech@gmail.com
//                     </div>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div>
//                     <IoIosArrowForward size={20} className="text-gray" />
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* user phone no */}
//             <div>
//               <Link href="change-email">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder rounded-full p-3 ">
//                     <LuMail size={24} className="text-main" />
//                   </div>

//                   <div className="flex-grow">
//                     <span className="font-semibold text-main">Phone number</span>
//                     <div className=" text-gray text-sm">
//                         +919265348797
//                     </div>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div>
//                     <IoIosArrowForward size={20} className="text-gray" />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// }







// import React from "react";
// import Link from 'next/link';
// import { LuUser, LuMail, LuPhone } from "react-icons/lu";
// import { IoIosArrowForward } from "react-icons/io";

// export default function PersonalDetails() {
//   // Assume you have a way to check if the user's account is verified and complete
//   // For this example, let's use a boolean variable.
//   const isAccountComplete = true; // Replace with your actual logic to check account completion

//   return (
//     <section className="Personal-Details py-10">
//       <div className="container-mx-auto">
//         <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Personal details</h2>

//         <div className="mt-8 space-y-2">
//           {/* user account */}
//           <div>
//             <Link href={isAccountComplete ? "change-personal-details" : "/dashboard"}>
//               {/* Wrap with Link */}
//               <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//                 {/* Icon Container */}
//                 <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                   <LuUser size={24} className="text-neutral-900 dark:text-white" />
//                 </div>

//                 <div className="flex-grow">
//                   <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">
//                     {isAccountComplete ? "Personal Information" : "Complete your account"}
//                   </p>
//                   <p className=" text-sm text-gray-500 dark:text-gray-300 mt-1">
//                     {isAccountComplete ? "Manage your personal information" : ""}
//                   </p>
//                 </div>

//                 {/* Right Arrow Icon */}
//                 <div>
//                   <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                 </div>
//               </div>
//             </Link>
//           </div>

//           {/* user Email */}
//           <div>
//             <Link href="change-email">
//               {/* Wrap with Link */}
//               <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//                 {/* Icon Container */}
//                 <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                   <LuMail size={24} className="text-neutral-900 dark:text-white" />
//                 </div>

//                 <div className="flex-grow">
//                   <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">Email Address</p>
//                   <p className=" text-sm text-gray-500 dark:text-gray-300 mt-1">
//                     kartavyatech@gmail.com
//                   </p>
//                 </div>

//                 {/* Right Arrow Icon */}
//                 <div>
//                   <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                 </div>
//               </div>
//             </Link>
//           </div>

//           {/* user phone no */}
//           <div>
//             <Link href="change-email">
//               {/* Wrap with Link */}
//               <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//                 {/* Icon Container */}
//                 <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                   <LuPhone size={24} className="text-neutral-900 dark:text-white" />
//                 </div>

//                 <div className="flex-grow">
//                   <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">Phone number</p>
//                   <p className=" text-sm text-gray-500 dark:text-gray-300 mt-1">
//                     +919265348797
//                   </p>
//                 </div>

//                 {/* Right Arrow Icon */}
//                 <div>
//                   <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                 </div>
//               </div>
//             </Link>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// 'use client';

// import React from "react";
// import Link from 'next/link';
// import { LuUser, LuMail, LuPhone } from "react-icons/lu";
// import { IoIosArrowForward } from "react-icons/io";
// import { useAuth } from '@/app/contexts/AuthContext'; // Import useAuth
// import { Loader2 } from "lucide-react"; // For loading indicator

// export default function PersonalDetails() {
//   const { user, loading } = useAuth(); // Get user and loading state

//   // Loading State
//   if (loading) {
//     return (
//       <section className="Personal-Details py-10 flex justify-center items-center min-h-[300px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </section>
//     );
//   }

//   // Not Logged In / Error State
//   if (!user) {
//     return (
//       <section className="Personal-Details py-10">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-600">
//           <p>Could not load user information. Please <Link href="/auth/login" className="underline">log in</Link> again.</p>
//         </div>
//       </section>
//     );
//   }

//  // --- Access kyc status from the nested object ---
//  const kycStatus = user.kyc?.status || 'not_started'; // Optional chaining is good here

//  // --- Determine the correct link and text based on KYC status ---
//  const needsKycStart = ['not_started', 'rejected', 'skipped'].includes(kycStatus);
//  const personalInfoLink = needsKycStart ? "/kyc/start" : "change-personal-details";
//  const personalInfoLabel = needsKycStart ? "Complete your account" : "Personal Information";
//  const personalInfoDescription = needsKycStart
//    ? "Provide details to start your account verification"
//    : "View or update your personal information";

//   // --- Check if email exists ---
//   const hasEmail = !!user.email; // Convert to boolean

//  // --- Check if phone number exists and format it ---
//   // The check correctly uses optional chaining
//   const hasPhoneNumber = !!(user.kyc?.mobile?.countryCode && user.kyc?.mobile?.number);
//   const displayPhoneNumber = hasPhoneNumber
//     ? `${user.kyc.mobile!.countryCode} ${user.kyc.mobile!.number}`
//     : "Not provided";

//   return (
//     <section className="Personal-Details py-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-1">
//            {user.fullName || 'Your Profile'}
//         </h2>
//          <p className="text-gray-500 dark:text-gray-300 mb-8">
//             Manage your personal details, email and phone number.
//          </p>

//         <div className="mt-8 space-y-2">
//           {/* Personal Information / Complete Account Section (Always Shown) */}
//           <div>
//             <Link href={personalInfoLink} passHref>
//               <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//                 <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                   <LuUser size={24} className="text-neutral-900 dark:text-white" />
//                 </div>
//                 <div className="flex-grow">
//                   <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">
//                     {personalInfoLabel}
//                   </p>
//                   <p className=" text-sm text-gray-500 dark:text-gray-300 mt-1">
//                     {personalInfoDescription}
//                   </p>
//                 </div>
//                 <div>
//                   <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                 </div>
//               </div>
//             </Link>
//           </div>

//           {/* Email Address (Conditionally Rendered) */}
//           {hasEmail && ( // Only render if email exists
//                 <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear group">
//                   <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                     <LuMail size={24} className="text-neutral-900 dark:text-white" />
//                   </div>
//                   <div className="flex-grow">
//                     <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">Email Address</p>
//                     <p className=" text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       {user.email} {/* Display user's email */}
//                     </p>
//                   </div>
//                   <div>
//                     <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                   </div>
//                 </div>
//           )}

//           {/* Phone number (Conditionally Rendered) */}
//           {hasPhoneNumber && ( // Only render if phone number exists
//                 <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear group">
//                   <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                     <LuPhone size={24} className="text-neutral-900 dark:text-white" />
//                   </div>
//                   <div className="flex-grow">
//                     <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">Phone number</p>
//                     <p className=" text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       {displayPhoneNumber} {/* Display formatted phone number */}
//                     </p>
//                   </div>
//                   <div>
//                     <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                   </div>
//                 </div>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }




'use client';

import React from "react";
import Link from 'next/link';
import { LuUser, LuMail, LuPhone } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from '@/app/contexts/AuthContext'; // Import useAuth
import { Loader2 } from "lucide-react"; // For loading indicator

export default function PersonalDetails() {
  const { user, loading } = useAuth(); // Get user and loading state

  // Loading State
  if (loading) {
    return (
      <section className="Personal-Details py-10 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  // Not Logged In / Error State
  if (!user) {
    return (
      <section className="Personal-Details py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-600">
          <p>Could not load user information. Please <Link href="/auth/login" className="underline">log in</Link> again.</p>
        </div>
      </section>
    );
  }

 // --- Access kyc status from the nested object ---
 const kycStatus = user.kyc?.status || 'not_started'; // Optional chaining is good here

 // --- Determine the correct link and text based on KYC status ---
 const needsKycStart = ['not_started', 'rejected', 'skipped'].includes(kycStatus);
 const personalInfoLink = needsKycStart ? "/kyc/start" : "change-personal-details";
 const personalInfoLabel = needsKycStart ? "Complete your account" : "Personal Information";
 const personalInfoDescription = needsKycStart
   ? "Provide details to start your account verification"
   : "View or update your personal information";

  // --- Check if email exists ---
  const hasEmail = !!user.email; // Convert to boolean

 // --- Check if phone number exists and format it ---
  // The check correctly uses optional chaining
  const hasPhoneNumber = !!(user.kyc?.mobile?.countryCode && user.kyc?.mobile?.number);
  const displayPhoneNumber = hasPhoneNumber
    ? `${user.kyc.mobile!.countryCode} ${user.kyc.mobile!.number}`
    : "Not provided";

  return (
    <section className="Personal-Details-Wrapper">
      <div className="Personal-Details">
        <div className="mb-6">
          <h2 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite mb-1">
            {user.fullName || "Your Profile"}
          </h2>
          <p className="lg:text-base text-sm text-subheadingWhite">
            Manage your personal details, email and phone number.
          </p>
        </div>

        <div className="space-y-2">
          {/* Personal Information / Complete Account Section (Always Shown) */}
          <div>
            <Link href={personalInfoLink} passHref>
              <div className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
                <div className="bg-secondarybox p-3 rounded-full">
                  <LuUser
                    size={24}
                    className="text-white/90"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                    {personalInfoLabel}
                  </p>
                  <p className=" text-sm text-subheadingWhite mt-1">
                    {personalInfoDescription}
                  </p>
                </div>
                <div>
                  <IoIosArrowForward
                    size={20}
                    className="text-white/90 group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Email Address (Conditionally Rendered) */}
          {hasEmail && ( // Only render if email exists
            <div className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear group">
              <div className="bg-secondarybox p-3 rounded-full">
                <LuMail
                  size={24}
                  className="text-white/90"
                />
              </div>
              <div className="flex-grow">
                <p className="font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                  Email Address
                </p>
                <p className=" text-sm text-subheadingWhite mt-1">
                  {user.email} {/* Display user's email */}
                </p>
              </div>
              <div>
                <IoIosArrowForward
                  size={20}
                  className="text-white/90 group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300"
                />
              </div>
            </div>
          )}

          {/* Phone number (Conditionally Rendered) */}
          {hasPhoneNumber && ( // Only render if phone number exists
            <div className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear group">
              <div className="bg-secondarybox p-3 rounded-full">
                <LuPhone
                  size={24}
                  className="text-white/90"
                />
              </div>
              <div className="flex-grow">
                <p className="font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                  Phone number
                </p>
                <p className=" text-sm text-subheadingWhite mt-1">
                  {displayPhoneNumber} {/* Display formatted phone number */}
                </p>
              </div>
              <div>
                <IoIosArrowForward
                  size={20}
                  className="text-white/90 group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}