// import DashboardHeader from "@/app/components/layout/DashboardHeader";
// import React from "react";

// export default function ChangePersonalDetails() {
//   return (
//     <section className="change-personal-details pb-10">
//       <div className="container mx-auto ">
//         <div className="bg-white dark:bg-background w-full lg:max-w-lg ">
//           <DashboardHeader title="Tell us about yourself" />
//           <form className="space-y-6  ">
//             {/* Country of residence */}
//             <div>
//               <label
//                 htmlFor="country"
//                 className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//               >
//                 Country of residence
//               </label>
//               <div className="relative">
//                 <select
//                   id="country"
//                   name="country"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                   <option>India</option>
//                   <option>United States</option>
//                   <option>Canada</option>
//                   {/* Add more countries as needed */}
//                 </select>
//               </div>
//             </div>

//             {/* Personal details */}
//             <div className="space-y-6">
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Personal details
//               </h3>

//               {/* Full legal first and middle name(s) */}
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Full legal first and middle name(s)
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   placeholder="Kartavya"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Full legal last name(s) */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Full legal last name(s)
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   placeholder="Patel"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Date of birth */}
//               <div>
//                 <h3
//                   className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"
//                 >
//                   Date of birth
//                 </h3>
//                 <div className="flex gap-2">
//                   {/* Day */}
//                   <div className="w-1/3">
//                     <label
//                       htmlFor="dob-day"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Day
//                     </label>

//                     <input
//                       type="text"
//                       id="dob-day"
//                       name="dob-day"
//                       placeholder="27"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                       defaultValue={27}
//                     />
//                   </div>
//                   {/* Month */}
//                   <div className="w-1/2 relative">
//                     <label
//                       htmlFor="dob-month"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Month
//                     </label>

//                     <select
//                       id="dob-month"
//                       name="dob-month"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                     >
//                       <option>January</option>
//                       <option>February</option>
//                       <option>March</option>
//                       <option>April</option>
//                       <option>May</option>
//                       <option>June</option>
//                       <option>July</option>
//                       <option>August</option>
//                       <option>September</option>
//                       <option>October</option>
//                       <option>November</option>
//                       <option>December</option>
//                     </select>
//                   </div>
//                   {/* Year */}
//                   <div className="w-1/3">
//                     <label
//                       htmlFor="dob-year"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Year
//                     </label>

//                     <input
//                       type="text"
//                       id="dob-year"
//                       name="dob-year"
//                       placeholder="2004"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                       defaultValue={2002}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Phone number */}
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Phone number
//                 </label>
//                 <div className="flex">
//                   {/* Country code */}
//                   <div className="relative w-44 mr-2">
//                     <select
//                       id="country-code"
//                       name="country-code"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                     >
//                       <option>+91</option>
//                       <option>+1</option>
//                       {/* Add more country codes as needed */}
//                     </select>
//                   </div>

//                   {/* Phone number input */}
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="8849498140"
//                     className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                   />
//                 </div>
//               </div>

//               {/* Change phone number link */}
//               <div className="text-center mt-2">
//                 <a href="#" className="text-primary font-bold underline">
//                   Change phone number
//                 </a>
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Address
//               </h3>

//               {/* Home Address */}
//               <div>
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Home address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   defaultValue="Mota Varachha"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* City */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   defaultValue="Surat"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Pincode */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="pincode"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Pincode
//                 </label>
//                 <input
//                   type="text"
//                   id="pincode"
//                   name="picode"
//                   defaultValue="395006"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Additional Information
//               </h3>

//               {/* Occupation */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="occupation"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Occupation
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="occupation"
//                     name="occupation"
//                     className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                   >
//                     <option>Salaried personnel</option>
//                     <option>Self-employed</option>
//                     <option>Retired</option>
//                     <option>Enterpreneur</option>
//                     <option>Student</option>
//                     <option>Stay at home partner</option>
//                     <option>Other</option>
//                     {/* Add more countries as needed */}
//                   </select>
//                 </div>
//               </div>

//             </div>

//             {/* Save Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
//               >
//                 Save Changes
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }










// "use client";

// import DashboardHeader from "@/app/components/layout/DashboardHeader";
// import React, { useState } from "react";
// import ReusableDropdown from "@/app/components/ui/ReusableDropdown"; // Assuming ReusableDropdown is in this path

// export default function ChangePersonalDetails() {
//   // State to manage dropdown values
//   const [country, setCountry] = useState<string | undefined>("");
//   const [month, setMonth] = useState<string | undefined>("");
//   const [countryCode, setCountryCode] = useState<string | undefined>("");
//   const [occupation, setOccupation] = useState<string | undefined>("");

//   // Options for dropdowns
//   const countryOptions = [
//     { value: "India", label: "India" },
//     { value: "United States", label: "United States" },
//     { value: "Canada", label: "Canada" },
//     // Add more countries as needed
//   ];

//   const monthOptions = [
//     { value: "January", label: "January" },
//     { value: "February", label: "February" },
//     { value: "March", label: "March" },
//     { value: "April", label: "April" },
//     { value: "May", label: "May" },
//     { value: "June", label: "June" },
//     { value: "July", label: "July" },
//     { value: "August", label: "August" },
//     { value: "September", label: "September" },
//     { value: "October", label: "October" },
//     { value: "November", label: "November" },
//     { value: "December", label: "December" },
//   ];

//   const countryCodeOptions = [
//     { value: "+91", label: "+91 (India)" },
//     { value: "+1", label: "+1 (United States)" },
//     // Add more country codes as needed
//   ];

//   const occupationOptions = [
//     { value: "Salaried personnel", label: "Salaried personnel" },
//     { value: "Self-employed", label: "Self-employed" },
//     { value: "Retired", label: "Retired" },
//     { value: "Enterpreneur", label: "Enterpreneur" },
//     { value: "Student", label: "Student" },
//     { value: "Stay at home partner", label: "Stay at home partner" },
//     { value: "Other", label: "Other" },
//     // Add more occupations as needed
//   ];

//   return (
//     <section className="change-personal-details pb-10">
//       <div className="container mx-auto ">
//         <div className="bg-white dark:bg-background w-full lg:max-w-lg ">
//           <DashboardHeader title="Tell us about yourself" />
//           <form className="space-y-6  ">
//             {/* Country of residence */}
//             <div>
//               <label
//                 htmlFor="country"
//                 className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//               >
//                 Country of residence
//               </label>
//               <div className="relative">
//                 <ReusableDropdown
//                   condition={true} // Add condition prop here
//                   options={countryOptions}
//                   value={country}
//                   onChange={(value) => setCountry(value)}
//                   placeholder="Select Country"
//                   className="w-full"
//                 />
//               </div>
//             </div>

//             {/* Personal details */}
//             <div className="space-y-6">
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Personal details
//               </h3>

//               {/* Full legal first and middle name(s) */}
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Full legal first and middle name(s)
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   placeholder="Kartavya"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Full legal last name(s) */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Full legal last name(s)
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   placeholder="Patel"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Date of birth */}
//               <div>
//                 <h3
//                   className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"
//                 >
//                   Date of birth
//                 </h3>
//                 <div className="flex gap-2">
//                   {/* Day */}
//                   <div className="w-1/3">
//                     <label
//                       htmlFor="dob-day"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Day
//                     </label>

//                     <input
//                       type="text"
//                       id="dob-day"
//                       name="dob-day"
//                       placeholder="27"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                       defaultValue={27}
//                     />
//                   </div>
//                   {/* Month */}
//                   <div className="w-1/2 relative">
//                     <label
//                       htmlFor="dob-month"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Month
//                     </label>

//                     <ReusableDropdown
//                       condition={true} // Add condition prop here
//                       options={monthOptions}
//                       value={month}
//                       onChange={(value) => setMonth(value)}
//                       placeholder="Select Month"
//                       className="w-full"
//                     />
//                   </div>
//                   {/* Year */}
//                   <div className="w-1/3">
//                     <label
//                       htmlFor="dob-year"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Year
//                     </label>

//                     <input
//                       type="text"
//                       id="dob-year"
//                       name="dob-year"
//                       placeholder="2004"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                       defaultValue={2002}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Phone number */}
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Phone number
//                 </label>
//                 <div className="flex">
//                   {/* Country code */}
//                   <div className="relative w-44 mr-2">
//                     <ReusableDropdown
//                       condition={true} // Add condition prop here
//                       options={countryCodeOptions}
//                       value={countryCode}
//                       onChange={(value) => setCountryCode(value)}
//                       placeholder="Select Code"
//                       className="w-full"
//                     />
//                   </div>

//                   {/* Phone number input */}
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="8849498140"
//                     className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                   />
//                 </div>
//               </div>

//               {/* Change phone number link */}
//               <div className="text-center mt-2">
//                 <a href="#" className="text-primary font-bold underline">
//                   Change phone number
//                 </a>
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Address
//               </h3>

//               {/* Home Address */}
//               <div>
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Home address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   defaultValue="Mota Varachha"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* City */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   defaultValue="Surat"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Pincode */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="pincode"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Pincode
//                 </label>
//                 <input
//                   type="text"
//                   id="pincode"
//                   name="picode"
//                   defaultValue="395006"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Additional Information
//               </h3>

//               {/* Occupation */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="occupation"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Occupation
//                 </label>
//                 <div className="relative">
//                   <ReusableDropdown
//                     condition={true} // Add condition prop here
//                     options={occupationOptions}
//                     value={occupation}
//                     onChange={(value) => setOccupation(value)}
//                     placeholder="Select Occupation"
//                     className="w-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import DashboardHeader from "@/app/components/layout/DashboardHeader";
// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/app/contexts/AuthContext";
// import kycService, { UpdateDetailsPayload, type KycDetails } from "@/app/services/kyc"; // Import types if needed
// import { getData as getCountryData } from 'country-list';
// import { all as getAllCountryCodes } from 'country-codes-list';

// // Shadcn UI & Form Handling Imports
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList, // Import CommandList
// } from "@/components/ui/command";
// import { Check, ChevronsUpDown, Globe, Phone, Loader2 } from "lucide-react"; // Added Icons + Loader2
// import { cn } from "@/lib/utils"; // For Shadcn class merging

// import { format, parseISO, isValid } from 'date-fns'; // Removed formatISO, not needed for display

// // --- Zod Schema Definition ---
// const formSchema = z.object({
//     firstName: z.string().min(1, { message: "First name is required." }).trim(),
//     lastName: z.string().min(1, { message: "Last name is required." }).trim(),
//     nationality: z.string().min(1, { message: "Nationality is required." }), // Expecting country code (e.g., 'US')
//     mobileCountryCode: z.string().min(1, { message: "Code is required." }), // Expecting calling code (e.g., '+1')
//     mobileNumber: z.string()
//         .min(5, { message: "Phone number seems too short." }) // Basic length check
//         .regex(/^[0-9]+$/, { message: "Please enter only numbers." }) // Ensure only digits
//         .trim(),
//     occupation: z.string().optional().nullable(), // Allow optional and explicitly null/undefined
//     // dobDay, dobMonth, dobYear are display-only, not part of submission schema
// });

// // Infer the TypeScript type from the Zod schema
// type ProfileFormValues = z.infer<typeof formSchema>;

// // Helper function for date formatting (remains the same)
// const formatDateForInput = (date: string | Date | undefined | null): { day: string; month: string; year: string } => {
//     const result = { day: '', month: '', year: '' };
//     if (!date) return result;
//     try {
//         const dateObj = typeof date === 'string' ? parseISO(date) : date;
//         if (isValid(dateObj)) {
//             result.day = format(dateObj, 'dd');
//             result.month = format(dateObj, 'MM'); // Use MM for month number key
//             result.year = format(dateObj, 'yyyy');
//         }
//     } catch (e) {
//         console.error("Error formatting date:", date, e);
//     }
//     return result;
// };

// export default function ChangePersonalDetails() {
//     const { user, loading: authLoading, refetchUser, updateAuthUserKyc } = useAuth();
//     const router = useRouter();

//     // State for display-only DOB parts
//     const [displayDob, setDisplayDob] = useState({ day: '', month: '', year: '' });

//     // State for dropdown options
//     const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
//     const [monthLabels, setMonthLabels] = useState<Record<string, string>>({}); // For displaying month name
//     const [countryCodeOptions, setCountryCodeOptions] = useState<{ value: string; label: string }[]>([]);
//     const [occupationOptions, setOccupationOptions] = useState<{ value: string; label: string }[]>([]);

//     // State for Popovers
//     const [nationalityPopoverOpen, setNationalityPopoverOpen] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);
//     const [occupationPopoverOpen, setOccupationPopoverOpen] = useState(false); // Added for occupation

//     // UI state
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     // --- Initialize React Hook Form ---
//     const form = useForm<ProfileFormValues>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             firstName: '',
//             lastName: '',
//             nationality: '',
//             mobileCountryCode: '',
//             mobileNumber: '',
//             occupation: '', // Or null depending on preference
//         },
//         mode: "onChange", // Validate on change for better UX
//     });

//     // --- Populate Dropdown/Combobox Options ---
//     useEffect(() => {
//         // Countries (for Nationality dropdown - use CODE as value)
//         const countries = getCountryData()
//             .map(c => ({ value: c.code, label: c.name }))
//             .sort((a, b) => a.label.localeCompare(b.label));
//         setCountryOptions(countries);

//         // Months (for display only)
//         const monthsMap: Record<string, string> = {
//             "01": "January", "02": "February", "03": "March", "04": "April",
//             "05": "May", "06": "June", "07": "July", "08": "August",
//             "09": "September", "10": "October", "11": "November", "12": "December",
//         };
//         setMonthLabels(monthsMap);

//         // Country Codes (for Phone)
//         const codes = getAllCountryCodes();
//         const formattedCodes = codes
//             .map(c => ({
//                 value: `+${c.countryCallingCode}`, // Use '+' prefixed code as value
//                 label: `${c.countryNameEn} (+${c.countryCallingCode})`
//             }))
//             .filter(c => c.value && c.value !== '+undefined' && c.value.length > 1) // Filter out invalid codes
//             .sort((a, b) => a.label.localeCompare(b.label)); // Sort by label
//         setCountryCodeOptions(formattedCodes);

//         // Occupations (Static list for Combobox)
//         const occupations = [
//             { value: 'Student', label: 'Student' },
//             { value: 'Employed', label: 'Employed' },
//             { value: 'Self-Employed', label: 'Self-Employed' },
//             { value: 'Business Owner', label: 'Business Owner' },
//             { value: 'Investor', label: 'Investor' },
//             { value: 'Retired', label: 'Retired' },
//             { value: 'Unemployed', label: 'Unemployed' },
//             { value: "Other", label: "Other" },
//         ];
//         setOccupationOptions(occupations);

//     }, []); // Runs only once on mount

//     // --- Pre-fill Form Data using react-hook-form ---
//     useEffect(() => {
//         // Ensure user data and country options are available before pre-filling
//         if (user?.kyc && countryOptions.length > 0) {
//             const kyc = user.kyc;
//             const dobParts = formatDateForInput(kyc.dateOfBirth);
//             setDisplayDob(dobParts); // Update display state for DOB

//             // --- FIX: Translate nationality name from API to code for the form ---
//             const nationalityNameFromApi = kyc.nationality;
//             let nationalityCodeForForm = ''; // Default to empty

//             if (nationalityNameFromApi) {
//                 // Find the country option by matching the label (name) case-insensitively
//                 const foundCountry = countryOptions.find(
//                     option => option.label.toLowerCase() === nationalityNameFromApi.toLowerCase()
//                 );
//                 if (foundCountry) {
//                     nationalityCodeForForm = foundCountry.value; // Get the code (e.g., "US")
//                 } else {
//                     // Fallback: Check if API mistakenly sent a code instead of name
//                     const foundByCode = countryOptions.find(
//                          option => option.value.toLowerCase() === nationalityNameFromApi.toLowerCase()
//                     );
//                     if(foundByCode) {
//                         nationalityCodeForForm = foundByCode.value;
//                     } else {
//                        console.warn(`Nationality name "${nationalityNameFromApi}" from API didn't match known country options.`);
//                     }
//                 }
//             }
//             // --- End Fix ---

//             // Use form.reset to update multiple fields efficiently
//             form.reset({
//                 firstName: kyc.firstName || '',
//                 lastName: kyc.lastName || '',
//                 nationality: nationalityCodeForForm, // Use the translated code
//                 mobileCountryCode: kyc.mobile?.countryCode ? (String(kyc.mobile.countryCode).startsWith('+') ? String(kyc.mobile.countryCode) : `+${kyc.mobile.countryCode}`) : '',
//                 mobileNumber: kyc.mobile?.number || '',
//                 occupation: kyc.occupation || '', // Default to '' if null/undefined
//             });
//         }
//     // Dependency array includes user, form instance, and countryOptions list
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [user, form, countryOptions]);

//     // --- Handle Form Submission ---
//     const onSubmit = useCallback(async (data: ProfileFormValues) => {
//         setError(null);
//         setSuccessMessage(null);
//         setIsSubmitting(true);

//         // Construct payload from validated form data
//         const payload: UpdateDetailsPayload = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             nationality: data.nationality, // Sends the country code (e.g., 'US')
//             mobile: {
//                 countryCode: data.mobileCountryCode, // e.g., '+1'
//                 number: data.mobileNumber,
//             },
//             // Ensure optional fields are sent as undefined or null if empty/not selected
//             occupation: data.occupation || undefined,
//         };

//         try {
//             console.log("Submitting KYC Update Payload:", payload);
//             const updatedKycResult = await kycService.updateMyKycDetails(payload);

//             // Update Auth Context state locally for immediate feedback
//             if (updatedKycResult?.kyc) {
//                  console.log("Updating AuthContext with API result:", updatedKycResult.kyc);
//                  // Trust the structure returned by the API
//                  updateAuthUserKyc(updatedKycResult.kyc as Partial<KycDetails>);
//             } else {
//                  console.warn("API did not return updated KYC details, updating context with submitted payload (might be incomplete).");
//                  // Fallback update - uses the submitted data, which might miss some fields
//                  // Note: If backend returns only { message: "success" }, this is the only update.
//                  updateAuthUserKyc(payload as Partial<KycDetails>);
//             }

//             setSuccessMessage("Personal details updated successfully!");
//             // Keep the form values displayed but reset dirty/touched state
//             form.reset(data, { keepValues: true, keepDirty: false, keepTouched: false });

//             // Optional: Navigate after success
//             // setTimeout(() => {
//             //      router.push('/dashboard/your-account/personal-details'); // Example target route
//             // }, 1500);

//         } catch (err: any) {
//             const message = err.message || "Failed to update details. Please try again.";
//             console.error("KYC Update Error:", err);
//             setError(message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     // Dependencies: updateAuthUserKyc function and form instance
//     // router is only needed if you uncomment the navigation
//     }, [updateAuthUserKyc, form /*, router */]);

//     // --- Loading State ---
//     if (authLoading) {
//       return (
//         <section className="change-personal-details py-10 flex justify-center items-center min-h-[400px]">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </section>
//       );
//     }

//     // --- No User State ---
//     if (!user) {
//         return (
//             <section className="change-personal-details py-10">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
//                     <p>Could not load user data. Please <Link href="/auth/login" className="underline">log in</Link> again.</p>
//                 </div>
//             </section>
//         );
//     }

//     // --- Render Form ---
//     return (
//         <section className="change-personal-details pb-10">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="bg-white dark:bg-background w-full lg:max-w-lg mx-auto rounded-lg shadow-md overflow-hidden">
//                     <DashboardHeader title="Update your personal details" />

//                     <div className="p-6 md:p-8">
//                         {error && <p className="mb-4 text-center text-red-600 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-sm">{error}</p>}
//                         {successMessage && <p className="mb-4 text-center text-green-700 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-sm">{successMessage}</p>}

//                         {/* Use Shadcn Form component */}
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

//                                 {/* Personal details Section */}
//                                 <div className="space-y-6">
//                                     <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 border-b pb-2 dark:border-border/50">
//                                         Personal Details
//                                     </h3>

//                                     {/* First Name */}
//                                     <FormField control={form.control} name="firstName" render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Legal First Name(s) *</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your first name(s)" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />

//                                     {/* Last Name */}
//                                     <FormField control={form.control} name="lastName" render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Legal Last Name(s) *</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your last name(s)" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />

//                                     {/* Nationality Combobox (Required) */}
//                                     <FormField control={form.control} name="nationality" render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality *</FormLabel>
//                                             <Popover open={nationalityPopoverOpen} onOpenChange={setNationalityPopoverOpen}>
//                                                 <PopoverTrigger asChild>
//                                                     <FormControl>
//                                                         <Button variant="outline" role="combobox" aria-expanded={nationalityPopoverOpen} aria-label="Select nationality" className={cn( "w-full justify-between", !field.value && "text-muted-foreground" )} >
//                                                              {field.value ? countryOptions.find((country) => country.value === field.value)?.label : "Select nationality..."}
//                                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                          </Button>
//                                                     </FormControl>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent align="start" className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
//                                                     <Command filter={(value, search) => { // Filter based on label matching search
//                                                         const country = countryOptions.find(c => c.value.toLowerCase() === value.toLowerCase());
//                                                         const label = country?.label ?? '';
//                                                         return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
//                                                     }}>
//                                                         <CommandInput placeholder="Search nationality..." />
//                                                         <CommandList>
//                                                             <CommandEmpty>No nationality found.</CommandEmpty>
//                                                             <CommandGroup>
//                                                                 {countryOptions.map((country) => (
//                                                                     <CommandItem
//                                                                         value={country.value} // Value submitted is the code
//                                                                         key={country.value} // Use unique code as key
//                                                                         onSelect={(currentValue) => { // currentValue is the code
//                                                                             form.setValue("nationality", currentValue === field.value ? "" : currentValue, { shouldValidate: true });
//                                                                             setNationalityPopoverOpen(false);
//                                                                         }}
//                                                                     >
//                                                                         <Check className={cn( "mr-2 h-4 w-4", country.value === field.value ? "opacity-100" : "opacity-0" )} />
//                                                                         {country.label} {/* Display the name */}
//                                                                     </CommandItem>
//                                                                 ))}
//                                                             </CommandGroup>
//                                                         </CommandList>
//                                                     </Command>
//                                                 </PopoverContent>
//                                             </Popover>
//                                             <FormDescription>Your country of citizenship.</FormDescription>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />

//                                     {/* Date of birth - Read Only Section */}
//                                     <div>
//                                         <h4 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-3">
//                                             Date of birth (Read-only)
//                                         </h4>
//                                         <div className="flex gap-2">
//                                             <div className="w-1/3">
//                                                 <Label htmlFor="dob-day" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Day</Label>
//                                                 <Input id="dob-day" name="dob-day" value={displayDob.day} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
//                                             </div>
//                                             <div className="w-1/2">
//                                                 <Label htmlFor="dob-month" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Month</Label>
//                                                 <Input id="dob-month" name="dob-month" value={monthLabels[displayDob.month] || ''} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
//                                             </div>
//                                             <div className="w-1/3">
//                                                 <Label htmlFor="dob-year" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Year</Label>
//                                                 <Input id="dob-year" name="dob-year" value={displayDob.year} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
//                                             </div>
//                                         </div>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Date of birth usually cannot be changed after verification. Contact support if incorrect.</p>
//                                     </div>

//                                      {/* Mobile Number Fields */}
//                                     <div className="space-y-2 pt-2">
//                                         <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                                         <div className="flex items-start gap-2">
//                                             {/* Country Code Combobox */}
//                                             <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                                 <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                                     <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                                         <PopoverTrigger asChild>
//                                                           <FormControl>
//                                                             <Button variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen} className={cn("w-full justify-between", !field.value && "text-muted-foreground")} aria-label="Select country calling code" >
//                                                                 {field.value || "Code"} {/* Display selected code or "Code" */}
//                                                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                             </Button>
//                                                           </FormControl>
//                                                         </PopoverTrigger>
//                                                         <PopoverContent className="w-[300px] p-0">
//                                                             <Command filter={(value, search) => { // Enhanced filter for name and code
//                                                                 const option = countryCodeOptions.find(opt => opt.value.toLowerCase() === value.toLowerCase());
//                                                                 if (!option) return 0;
//                                                                 const searchTerm = search.toLowerCase().trim();
//                                                                 if (!searchTerm) return 1; // Show all if search is empty
//                                                                 const labelMatches = option.label.toLowerCase().includes(searchTerm);
//                                                                 const codeMatches = option.value.includes(searchTerm.startsWith('+') ? searchTerm : `+${searchTerm}`);
//                                                                 return labelMatches || codeMatches ? 1 : 0;
//                                                             }}>
//                                                                 <CommandInput placeholder="Search country or code..." />
//                                                                  <CommandList>
//                                                                     <CommandEmpty>No country found.</CommandEmpty>
//                                                                     <CommandGroup>
//                                                                         {countryCodeOptions.map((option) => (
//                                                                             <CommandItem
//                                                                                 key={option.label} // Use label as key for display items
//                                                                                 value={option.value} // Use code (+1) as value
//                                                                                 onSelect={(currentValue) => { // currentValue is code (+1)
//                                                                                     form.setValue("mobileCountryCode", currentValue === field.value ? "" : currentValue, { shouldValidate: true });
//                                                                                     setCountryCodePopoverOpen(false);
//                                                                                 }}
//                                                                             >
//                                                                                 <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} />
//                                                                                 {option.label} {/* Display "Country Name (+Code)" */}
//                                                                             </CommandItem>
//                                                                         ))}
//                                                                     </CommandGroup>
//                                                                 </CommandList>
//                                                             </Command>
//                                                         </PopoverContent>
//                                                     </Popover>
//                                                     <FormMessage /> {/* Validation message for country code */}
//                                                 </FormItem>
//                                             )} />
//                                             {/* Number Input */}
//                                             <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                                 <FormItem className="flex-grow">
//                                                     <FormControl>
//                                                         <Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} />
//                                                     </FormControl>
//                                                     <FormMessage /> {/* Validation message for number */}
//                                                 </FormItem>
//                                             )} />
//                                         </div>
//                                         <FormDescription>Used for verification and communications.</FormDescription>
//                                         {/* Removed the confusing link about changing phone via another page */}
//                                     </div>
//                                 </div>

//                                 {/* Additional Information Section */}
//                                 <div className="space-y-6 pt-4 border-t dark:border-border/50">
//                                     <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
//                                         Additional Information
//                                     </h3>

//                                     {/* Occupation Combobox (Optional) */}
//                                     <FormField control={form.control} name="occupation" render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel>Occupation (Optional)</FormLabel>
//                                              <Popover open={occupationPopoverOpen} onOpenChange={setOccupationPopoverOpen}>
//                                                 <PopoverTrigger asChild>
//                                                     <FormControl>
//                                                         <Button variant="outline" role="combobox" aria-label="Select occupation" className={cn( "w-full justify-between", !field.value && "text-muted-foreground" )} >
//                                                              {field.value ? occupationOptions.find( (option) => option.value === field.value )?.label : "Select Occupation"}
//                                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                          </Button>
//                                                     </FormControl>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
//                                                     <Command>
//                                                         <CommandInput placeholder="Search occupation..." />
//                                                          <CommandList>
//                                                             <CommandEmpty>No occupation found.</CommandEmpty>
//                                                             <CommandGroup>
//                                                                 {occupationOptions.map((option) => (
//                                                                      <CommandItem
//                                                                          value={option.value} // Use value for selection logic
//                                                                          key={option.value}
//                                                                          onSelect={(currentValue) => {
//                                                                              form.setValue("occupation", currentValue === field.value ? null : currentValue, { shouldValidate: true }); // Allow deselecting by setting to null
//                                                                              setOccupationPopoverOpen(false);
//                                                                          }}
//                                                                      >
//                                                                          <Check className={cn( "mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0" )} />
//                                                                          {option.label}
//                                                                       </CommandItem>
//                                                                 ))}
//                                                             </CommandGroup>
//                                                         </CommandList>
//                                                     </Command>
//                                                 </PopoverContent>
//                                             </Popover>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />
//                                 </div>

//                                 {/* Save Button */}
//                                 <div className="mt-8 pt-6 border-t dark:border-border/50">
//                                     <Button
//                                         type="submit"
//                                         className="w-full"
//                                         disabled={isSubmitting || !form.formState.isDirty} // Disable if submitting or no changes
//                                         size="lg"
//                                     >
//                                         {isSubmitting ? (
//                                             <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
//                                         ) : ( 'Save Changes' )}
//                                     </Button>
//                                      {/* Show message if form isn't dirty and not submitting */}
//                                      {!form.formState.isDirty && !isSubmitting && (
//                                         <p className="text-xs text-center text-muted-foreground mt-2">No changes detected to save.</p>
//                                     )}
//                                 </div>
//                             </form>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// // --- Shadcn UI Label component (keep if not globally available) ---
// const Label = React.forwardRef<
//     React.ElementRef<"label">,
//     React.ComponentPropsWithoutRef<"label">
// >(({ className, ...props }, ref) => (
//     <label
//         ref={ref}
//         className={cn(
//             "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
//             className
//         )}
//         {...props}
//     />
// ));
// Label.displayName = "Label";







// "use client";

// import DashboardHeader from "@/app/components/layout/DashboardHeader";
// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/app/contexts/AuthContext";
// import kycService, { UpdateDetailsPayload, type KycDetails } from "@/app/services/kyc"; // Import types if needed
// import { getData as getCountryData } from 'country-list';
// import { all as getAllCountryCodes } from 'country-codes-list';

// // Shadcn UI & Form Handling Imports
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList, // Import CommandList
// } from "@/components/ui/command";
// import { Check, ChevronsUpDown, Globe, Phone, Loader2 } from "lucide-react"; // Added Icons + Loader2
// import { cn } from "@/lib/utils"; // For Shadcn class merging

// import { format, parseISO, isValid } from 'date-fns'; // Removed formatISO, not needed for display

// // --- Zod Schema Definition ---
// const formSchema = z.object({
//     firstName: z.string().min(1, { message: "First name is required." }).trim(),
//     lastName: z.string().min(1, { message: "Last name is required." }).trim(),
//     nationality: z.string().min(1, { message: "Nationality is required." }), // Expecting country code (e.g., 'US')
//     mobileCountryCode: z.string().min(1, { message: "Code is required." }), // Expecting calling code (e.g., '+1')
//     mobileNumber: z.string()
//         .min(5, { message: "Phone number seems too short." }) // Basic length check
//         .regex(/^[0-9]+$/, { message: "Please enter only numbers." }) // Ensure only digits
//         .trim(),
//     occupation: z.string().optional().nullable(), // Allow optional and explicitly null/undefined
//     // dobDay, dobMonth, dobYear are display-only, not part of submission schema
// });

// // Infer the TypeScript type from the Zod schema
// type ProfileFormValues = z.infer<typeof formSchema>;

// // Helper function for date formatting (remains the same)
// const formatDateForInput = (date: string | Date | undefined | null): { day: string; month: string; year: string } => {
//     const result = { day: '', month: '', year: '' };
//     if (!date) return result;
//     try {
//         const dateObj = typeof date === 'string' ? parseISO(date) : date;
//         if (isValid(dateObj)) {
//             result.day = format(dateObj, 'dd');
//             result.month = format(dateObj, 'MM'); // Use MM for month number key
//             result.year = format(dateObj, 'yyyy');
//         }
//     } catch (e) {
//         console.error("Error formatting date:", date, e);
//     }
//     return result;
// };

// export default function ChangePersonalDetails() {
//     const { user, loading: authLoading, refetchUser, updateAuthUserKyc } = useAuth();
//     const router = useRouter();

//     // State for display-only DOB parts
//     const [displayDob, setDisplayDob] = useState({ day: '', month: '', year: '' });

//     // State for dropdown options
//     const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
//     const [monthLabels, setMonthLabels] = useState<Record<string, string>>({}); // For displaying month name
//     const [countryCodeOptions, setCountryCodeOptions] = useState<{ value: string; label: string }[]>([]);
//     const [occupationOptions, setOccupationOptions] = useState<{ value: string; label: string }[]>([]);

//     // State for Popovers
//     const [nationalityPopoverOpen, setNationalityPopoverOpen] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);
//     const [occupationPopoverOpen, setOccupationPopoverOpen] = useState(false); // Added for occupation

//     // UI state
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     // --- Initialize React Hook Form ---
//     const form = useForm<ProfileFormValues>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             firstName: '',
//             lastName: '',
//             nationality: '',
//             mobileCountryCode: '',
//             mobileNumber: '',
//             occupation: '', // Or null depending on preference
//         },
//         mode: "onChange", // Validate on change for better UX
//     });

//     // --- Populate Dropdown/Combobox Options ---
//     useEffect(() => {
//         // Countries (for Nationality dropdown - use CODE as value)
//         const countries = getCountryData()
//             .map(c => ({ value: c.code, label: c.name }))
//             .sort((a, b) => a.label.localeCompare(b.label));
//         setCountryOptions(countries);

//         // Months (for display only)
//         const monthsMap: Record<string, string> = {
//             "01": "January", "02": "February", "03": "March", "04": "April",
//             "05": "May", "06": "June", "07": "July", "08": "August",
//             "09": "September", "10": "October", "11": "November", "12": "December",
//         };
//         setMonthLabels(monthsMap);

//         // Country Codes (for Phone)
//         const codes = getAllCountryCodes();
//         const formattedCodes = codes
//             .map(c => ({
//                 value: `+${c.countryCallingCode}`, // Use '+' prefixed code as value
//                 label: `${c.countryNameEn} (+${c.countryCallingCode})`
//             }))
//             .filter(c => c.value && c.value !== '+undefined' && c.value.length > 1) // Filter out invalid codes
//             .sort((a, b) => a.label.localeCompare(b.label)); // Sort by label
//         setCountryCodeOptions(formattedCodes);

//         // Occupations (Static list for Combobox)
//         const occupations = [
//             { value: 'Student', label: 'Student' },
//             { value: 'Employed', label: 'Employed' },
//             { value: 'Self-Employed', label: 'Self-Employed' },
//             { value: 'Business Owner', label: 'Business Owner' },
//             { value: 'Investor', label: 'Investor' },
//             { value: 'Retired', label: 'Retired' },
//             { value: 'Unemployed', label: 'Unemployed' },
//             { value: "Other", label: "Other" },
//         ];
//         setOccupationOptions(occupations);

//     }, []); // Runs only once on mount

//     // --- Pre-fill Form Data using react-hook-form ---
//     useEffect(() => {
//         // Ensure user data and country options are available before pre-filling
//         if (user?.kyc && countryOptions.length > 0) {
//             const kyc = user.kyc;
//             const dobParts = formatDateForInput(kyc.dateOfBirth);
//             setDisplayDob(dobParts); // Update display state for DOB

//             // --- FIX: Translate nationality name from API to code for the form ---
//             const nationalityNameFromApi = kyc.nationality;
//             let nationalityCodeForForm = ''; // Default to empty

//             if (nationalityNameFromApi) {
//                 // Find the country option by matching the label (name) case-insensitively
//                 const foundCountry = countryOptions.find(
//                     option => option.label.toLowerCase() === nationalityNameFromApi.toLowerCase()
//                 );
//                 if (foundCountry) {
//                     nationalityCodeForForm = foundCountry.value; // Get the code (e.g., "US")
//                 } else {
//                     // Fallback: Check if API mistakenly sent a code instead of name
//                     const foundByCode = countryOptions.find(
//                          option => option.value.toLowerCase() === nationalityNameFromApi.toLowerCase()
//                     );
//                     if(foundByCode) {
//                         nationalityCodeForForm = foundByCode.value;
//                     } else {
//                        console.warn(`Nationality name "${nationalityNameFromApi}" from API didn't match known country options.`);
//                     }
//                 }
//             }
//             // --- End Fix ---

//             // Use form.reset to update multiple fields efficiently
//             form.reset({
//                 firstName: kyc.firstName || '',
//                 lastName: kyc.lastName || '',
//                 nationality: nationalityCodeForForm, // Use the translated code
//                 mobileCountryCode: kyc.mobile?.countryCode ? (String(kyc.mobile.countryCode).startsWith('+') ? String(kyc.mobile.countryCode) : `+${kyc.mobile.countryCode}`) : '',
//                 mobileNumber: kyc.mobile?.number || '',
//                 occupation: kyc.occupation || '', // Default to '' if null/undefined
//             });
//         }
//     // Dependency array includes user, form instance, and countryOptions list
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [user, form, countryOptions]);

//     // --- Handle Form Submission ---
//     const onSubmit = useCallback(async (data: ProfileFormValues) => {
//         setError(null);
//         setSuccessMessage(null);
//         setIsSubmitting(true);

//         // Construct payload from validated form data
//         const payload: UpdateDetailsPayload = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             nationality: data.nationality, // Sends the country code (e.g., 'US')
//             mobile: {
//                 countryCode: data.mobileCountryCode, // e.g., '+1'
//                 number: data.mobileNumber,
//             },
//             // Ensure optional fields are sent as undefined or null if empty/not selected
//             occupation: data.occupation || undefined,
//         };

//         try {
//             console.log("Submitting KYC Update Payload:", payload);
//             const updatedKycResult = await kycService.updateMyKycDetails(payload);

//             // Update Auth Context state locally for immediate feedback
//             if (updatedKycResult?.kyc) {
//                  console.log("Updating AuthContext with API result:", updatedKycResult.kyc);
//                  // Trust the structure returned by the API
//                  updateAuthUserKyc(updatedKycResult.kyc as Partial<KycDetails>);
//             } else {
//                  console.warn("API did not return updated KYC details, updating context with submitted payload (might be incomplete).");
//                  // Fallback update - uses the submitted data, which might miss some fields
//                  // Note: If backend returns only { message: "success" }, this is the only update.
//                  updateAuthUserKyc(payload as Partial<KycDetails>);
//             }

//             setSuccessMessage("Personal details updated successfully!");
//             // Keep the form values displayed but reset dirty/touched state
//             form.reset(data, { keepValues: true, keepDirty: false, keepTouched: false });

//             // Optional: Navigate after success
//             // setTimeout(() => {
//             //      router.push('/dashboard/your-account/personal-details'); // Example target route
//             // }, 1500);

//         } catch (err: any) {
//             const message = err.message || "Failed to update details. Please try again.";
//             console.error("KYC Update Error:", err);
//             setError(message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     // Dependencies: updateAuthUserKyc function and form instance
//     // router is only needed if you uncomment the navigation
//     }, [updateAuthUserKyc, form /*, router */]);

//     // --- Loading State ---
//     if (authLoading) {
//       return (
//         <section className="change-personal-details py-10 flex justify-center items-center min-h-[400px]">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </section>
//       );
//     }

//     // --- No User State ---
//     if (!user) {
//         return (
//             <section className="change-personal-details py-10">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
//                     <p>Could not load user data. Please <Link href="/auth/login" className="underline">log in</Link> again.</p>
//                 </div>
//             </section>
//         );
//     }

//     // --- Render Form ---
//     return (
//         <section className="change-personal-details pb-10">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="bg-white dark:bg-background w-full lg:max-w-lg mx-auto rounded-lg">
//                     <DashboardHeader title="Update your personal details" />

//                     <div className="">
//                         {error && <p className="mb-4 text-center text-red-600 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-sm">{error}</p>}
//                         {successMessage && <p className="mb-4 text-center text-green-700 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-sm">{successMessage}</p>}

//                         {/* Use Shadcn Form component */}
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

//                                 {/* Personal details Section */}
//                                 <div className="space-y-6">
//                                     <h3 className="text-lg font-semibold text-mainheading dark:text-white mb-4 border-b pb-2 dark:border-border/50">
//                                         Personal Details
//                                     </h3>

//                                     {/* First Name */}
//                                     <FormField control={form.control} name="firstName" render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Legal First Name(s) *</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your first name(s)" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />

//                                     {/* Last Name */}
//                                     <FormField control={form.control} name="lastName" render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Legal Last Name(s) *</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your last name(s)" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />

//                                     {/* Nationality Combobox (Required) */}
//                                     <FormField control={form.control} name="nationality" render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality *</FormLabel>
//                                             <Popover open={nationalityPopoverOpen} onOpenChange={setNationalityPopoverOpen}>
//                                                 <PopoverTrigger asChild>
//                                                     <FormControl>
//                                                         <Button variant="outline" role="combobox" aria-expanded={nationalityPopoverOpen} aria-label="Select nationality" className={cn( "w-full justify-between px-4 py-3 h-12", !field.value && "text-muted-foreground" )} >
//                                                              {field.value ? countryOptions.find((country) => country.value === field.value)?.label : "Select nationality..."}
//                                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                          </Button>
//                                                     </FormControl>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent align="start" className="sm:w-[450px] max-h-[--radix-popover-content-available-height]">
//                                                     <Command filter={(value, search) => { // Filter based on label matching search
//                                                         const country = countryOptions.find(c => c.value.toLowerCase() === value.toLowerCase());
//                                                         const label = country?.label ?? '';
//                                                         return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
//                                                     }}>
//                                                         <CommandInput placeholder="Search nationality..." />
//                                                         <CommandList>
//                                                             <CommandEmpty>No nationality found.</CommandEmpty>
//                                                             <CommandGroup>
//                                                                 <div className="space-y-1">
//                                                                     {countryOptions.map((country) => (
//                                                                         <CommandItem
//                                                                             value={country.value} // Value submitted is the code
//                                                                             key={country.value} // Use unique code as key
//                                                                             onSelect={(currentValue) => { // currentValue is the code
//                                                                                 form.setValue("nationality", currentValue === field.value ? "" : currentValue, { shouldValidate: true });
//                                                                                 setNationalityPopoverOpen(false);
//                                                                             }} >
//                                                                             {country.label} {/* Display the name */}
//                                                                             <Check className={cn( "ml-2 h-4 w-4", country.value === field.value ? "opacity-100" : "opacity-0" )} />
//                                                                         </CommandItem>
//                                                                     ))}
//                                                                 </div>

//                                                             </CommandGroup>
//                                                         </CommandList>
//                                                     </Command>
//                                                 </PopoverContent>
//                                             </Popover>
//                                             <FormDescription>Your country of citizenship.</FormDescription>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />

//                                     {/* Date of birth - Read Only Section */}
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-mainheading dark:text-white mb-4 border-b pb-2 dark:border-border/50">
//                                             Date of birth (Read-only)
//                                         </h3>
//                                         <div className="flex gap-2">
//                                             <div className="w-1/3">
//                                                 <Label htmlFor="dob-day" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Day</Label>
//                                                 <Input id="dob-day" name="dob-day" value={displayDob.day} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
//                                             </div>
//                                             <div className="w-1/2">
//                                                 <Label htmlFor="dob-month" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Month</Label>
//                                                 <Input id="dob-month" name="dob-month" value={monthLabels[displayDob.month] || ''} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
//                                             </div>
//                                             <div className="w-1/3">
//                                                 <Label htmlFor="dob-year" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Year</Label>
//                                                 <Input id="dob-year" name="dob-year" value={displayDob.year} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
//                                             </div>
//                                         </div>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Date of birth usually cannot be changed after verification. Contact support if incorrect.</p>
//                                     </div>

//                                      {/* Mobile Number Fields */}
//                                     <div className="space-y-2 pt-2">
//                                         <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                                         <div className="flex items-start gap-2">
//                                             {/* Country Code Combobox */}
//                                             <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                                 <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                                     <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                                         <PopoverTrigger asChild>
//                                                           <FormControl>
//                                                             <Button variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen} className={cn("w-full h-12 justify-between", !field.value && "text-muted-foreground")} aria-label="Select country calling code" >
//                                                                 {field.value || "Code"} {/* Display selected code or "Code" */}
//                                                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                             </Button>
//                                                           </FormControl>
//                                                         </PopoverTrigger>
//                                                         <PopoverContent align="start" className="sm:w-[450px] max-h-[--radix-popover-content-available-height]">
//                                                             <Command filter={(value, search) => { // Enhanced filter for name and code
//                                                                 const option = countryCodeOptions.find(opt => opt.value.toLowerCase() === value.toLowerCase());
//                                                                 if (!option) return 0;
//                                                                 const searchTerm = search.toLowerCase().trim();
//                                                                 if (!searchTerm) return 1; // Show all if search is empty
//                                                                 const labelMatches = option.label.toLowerCase().includes(searchTerm);
//                                                                 const codeMatches = option.value.includes(searchTerm.startsWith('+') ? searchTerm : `+${searchTerm}`);
//                                                                 return labelMatches || codeMatches ? 1 : 0;
//                                                             }}>
//                                                                 <CommandInput placeholder="Search country or code..." />
//                                                                  <CommandList>
//                                                                     <CommandEmpty>No country found.</CommandEmpty>
//                                                                     <CommandGroup>
//                                                                         <div className="space-y-1">
//                                                                             {countryCodeOptions.map((option) => (
//                                                                                 <CommandItem
//                                                                                     key={option.label} // Use label as key for display items
//                                                                                     value={option.value} // Use code (+1) as value
//                                                                                     onSelect={(currentValue) => { // currentValue is code (+1)
//                                                                                         form.setValue("mobileCountryCode", currentValue === field.value ? "" : currentValue, { shouldValidate: true });
//                                                                                         setCountryCodePopoverOpen(false);
//                                                                                     }}
//                                                                                 >
//                                                                                     {option.label} {/* Display "Country Name (+Code)" */}
//                                                                                     <Check className={cn("ml-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} />
//                                                                                 </CommandItem>
//                                                                             ))}
//                                                                         </div>
//                                                                     </CommandGroup>
//                                                                 </CommandList>
//                                                             </Command>
//                                                         </PopoverContent>
//                                                     </Popover>
//                                                     <FormMessage /> {/* Validation message for country code */}
//                                                 </FormItem>
//                                             )} />
//                                             {/* Number Input */}
//                                             <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                                 <FormItem className="flex-grow">
//                                                     <FormControl>
//                                                         <Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} />
//                                                     </FormControl>
//                                                     <FormMessage /> {/* Validation message for number */}
//                                                 </FormItem>
//                                             )} />
//                                         </div>
//                                         <FormDescription>Used for verification and communications.</FormDescription>
//                                         {/* Removed the confusing link about changing phone via another page */}
//                                     </div>
//                                 </div>

//                                 {/* Additional Information Section */}
//                                 <div className="space-y-6 pt-4 border-t dark:border-border/50">
//                                     <h3 className="text-lg font-semibold text-mainheading dark:text-white mb-4 border-b pb-2 dark:border-border/50">
//                                         Additional Information
//                                     </h3>

//                                     {/* Occupation Combobox (Optional) */}
//                                     <FormField control={form.control} name="occupation" render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel>Occupation (Optional)</FormLabel>
//                                              <Popover open={occupationPopoverOpen} onOpenChange={setOccupationPopoverOpen}>
//                                                 <PopoverTrigger asChild>
//                                                     <FormControl>
//                                                         <Button variant="outline" role="combobox" aria-label="Select occupation" className={cn( "w-full h-12 justify-between", !field.value && "text-muted-foreground" )} >
//                                                              {field.value ? occupationOptions.find( (option) => option.value === field.value )?.label : "Select Occupation"}
//                                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                          </Button>
//                                                     </FormControl>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent align="start" className="sm:w-[450px] max-h-[--radix-popover-content-available-height]">
//                                                     <Command>
//                                                         <CommandInput placeholder="Search occupation..." />
//                                                          <CommandList>
//                                                             <CommandEmpty>No occupation found.</CommandEmpty>
//                                                             <CommandGroup>
//                                                                 {occupationOptions.map((option) => (
//                                                                      <CommandItem
//                                                                          value={option.value} // Use value for selection logic
//                                                                          key={option.value}
//                                                                          onSelect={(currentValue) => {
//                                                                              form.setValue("occupation", currentValue === field.value ? null : currentValue, { shouldValidate: true }); // Allow deselecting by setting to null
//                                                                              setOccupationPopoverOpen(false);
//                                                                          }}
//                                                                      >
//                                                                          {option.label}
//                                                                          <Check className={cn( "ml-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0" )} />
//                                                                       </CommandItem>
//                                                                 ))}
//                                                             </CommandGroup>
//                                                         </CommandList>
//                                                     </Command>
//                                                 </PopoverContent>
//                                             </Popover>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />
//                                 </div>

//                                 {/* Save Button */}
//                                 <div className="mt-8 pt-6 border-t dark:border-border/50">
//                                     <Button
//                                         type="submit"
//                                         className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                                         disabled={isSubmitting || !form.formState.isDirty} // Disable if submitting or no changes
//                                     >
//                                         {isSubmitting ? (
//                                             <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
//                                         ) : ( 'Save Changes' )}
//                                     </Button>
//                                      {/* Show message if form isn't dirty and not submitting */}
//                                      {!form.formState.isDirty && !isSubmitting && (
//                                         <p className="text-xs text-center text-muted-foreground mt-2">No changes detected to save.</p>
//                                     )}
//                                 </div>
//                             </form>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// // --- Shadcn UI Label component (keep if not globally available) ---
// const Label = React.forwardRef<
//     React.ElementRef<"label">,
//     React.ComponentPropsWithoutRef<"label">
// >(({ className, ...props }, ref) => (
//     <label
//         ref={ref}
//         className={cn(
//             "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
//             className
//         )}
//         {...props}
//     />
// ));
// Label.displayName = "Label";



"use client";

import DashboardHeader from "@/app/components/layout/DashboardHeader";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import kycService, { UpdateDetailsPayload, type KycDetails, KycMobile } from "@/app/services/kyc"; // Import types
import { getData as getCountryData } from 'country-list';

// Shadcn UI & Form Handling Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Globe, Phone, Loader2 } from "lucide-react"; // Keep Icons + Loader2
import { cn } from "@/lib/utils"; // For Shadcn class merging
import { format, parseISO, isValid } from 'date-fns';
import { FiAlertTriangle } from "react-icons/fi";

// --- Zod Schema Definition (REVISED) ---
// Only include fields that the user CAN edit
const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }).trim(),
    lastName: z.string().min(1, { message: "Last name is required." }).trim(),
    occupation: z.string().optional().nullable(), // Allow optional and explicitly null/undefined
    // REMOVED: nationality, mobileCountryCode, mobileNumber
});

// Infer the TypeScript type from the REVISED Zod schema
type ProfileFormValues = z.infer<typeof formSchema>;

// Helper function for date formatting (remains the same)
const formatDateForInput = (date: string | Date | undefined | null): { day: string; month: string; year: string } => {
    const result = { day: '', month: '', year: '' };
    if (!date) return result;
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        if (isValid(dateObj)) {
            result.day = format(dateObj, 'dd');
            result.month = format(dateObj, 'MM'); // Use MM for month number key
            result.year = format(dateObj, 'yyyy');
        }
    } catch (e) {
        console.error("Error formatting date:", date, e);
    }
    return result;
};

// Helper function for displaying mobile (new)
const formatMobileForDisplay = (mobile: KycMobile | undefined | null): string => {
    if (!mobile || !mobile.countryCode || !mobile.number) return 'N/A';
    // Ensure country code always starts with '+'
    const formattedCode = mobile.countryCode.startsWith('+') ? mobile.countryCode : `+${mobile.countryCode}`;
    return `${formattedCode} ${mobile.number}`;
}

export default function ChangePersonalDetails() {
    const { user, loading: authLoading, updateAuthUserKyc } = useAuth();
    const router = useRouter();

    // State for display-only values
    const [displayDob, setDisplayDob] = useState({ day: '', month: '', year: '' });
    const [displayNationality, setDisplayNationality] = useState<string>('N/A');
    const [displayMobile, setDisplayMobile] = useState<string>('N/A');

    // State for dropdown options (only Occupation needed now for editing)
    const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]); // Keep for display lookup
    const [monthLabels, setMonthLabels] = useState<Record<string, string>>({}); // For displaying month name
    const [occupationOptions, setOccupationOptions] = useState<{ value: string; label: string }[]>([]);
    const [occupationPopoverOpen, setOccupationPopoverOpen] = useState(false);

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // --- Initialize React Hook Form (REVISED defaultValues) ---
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            occupation: null, // Set default to null for optional combobox
        },
        mode: "onChange", // Validate on change for better UX
    });

    // --- Populate Dropdown/Display Options ---
    useEffect(() => {
        // Countries (for Nationality display lookup - CODE as value)
        const countries = getCountryData()
            .map(c => ({ value: c.code, label: c.name }))
            .sort((a, b) => a.label.localeCompare(b.label));
        setCountryOptions(countries);

        // Months (for display only)
        const monthsMap: Record<string, string> = {};
        monthsMap["01"] = "January"; monthsMap["02"] = "February"; monthsMap["03"] = "March"; monthsMap["04"] = "April";
        monthsMap["05"] = "May"; monthsMap["06"] = "June"; monthsMap["07"] = "July"; monthsMap["08"] = "August";
        monthsMap["09"] = "September"; monthsMap["10"] = "October"; monthsMap["11"] = "November"; monthsMap["12"] = "December";
        setMonthLabels(monthsMap);

        // Occupations (Static list for Combobox)
        const occupations = [
            { value: 'Student', label: 'Student' },
            { value: 'Employed', label: 'Employed' },
            { value: 'Self-Employed', label: 'Self-Employed' },
            { value: 'Business Owner', label: 'Business Owner' },
            { value: 'Investor', label: 'Investor' },
            { value: 'Retired', label: 'Retired' },
            { value: 'Unemployed', label: 'Unemployed' },
            { value: "Other", label: "Other" },
        ];
        setOccupationOptions(occupations);

    }, []); // Runs only once on mount

    // --- Pre-fill Form Data & Display-Only Fields (REVISED) ---
    useEffect(() => {
        // Ensure user data and country options are available before pre-filling
        if (user?.kyc && countryOptions.length > 0) {
            const kyc = user.kyc;

            // Set display-only states
            const dobParts = formatDateForInput(kyc.dateOfBirth);
            setDisplayDob(dobParts);
            setDisplayMobile(formatMobileForDisplay(kyc.mobile));

            // Find nationality name for display
            const nationalityCodeOrName = kyc.nationality;
            let nationalityDisplay = 'N/A';
            if (nationalityCodeOrName) {
                // Try finding by code first (assuming backend might send 'US')
                const foundByCode = countryOptions.find(opt => opt.value.toUpperCase() === nationalityCodeOrName.toUpperCase());
                if (foundByCode) {
                    nationalityDisplay = foundByCode.label;
                } else {
                    // Fallback: Try finding by name (assuming backend might send 'United States')
                    const foundByName = countryOptions.find(opt => opt.label.toLowerCase() === nationalityCodeOrName.toLowerCase());
                     if (foundByName) {
                         nationalityDisplay = foundByName.label;
                     } else {
                         // If neither code nor name matches, display the raw value from API
                         nationalityDisplay = nationalityCodeOrName;
                         console.warn(`Nationality "${nationalityCodeOrName}" from API couldn't be matched to country list. Displaying raw value.`);
                     }
                }
            }
            setDisplayNationality(nationalityDisplay);

            // Use form.reset ONLY for editable fields
            form.reset({
                firstName: kyc.firstName || '',
                lastName: kyc.lastName || '',
                occupation: kyc.occupation || null, // Use null if occupation is undefined/null/empty string
            });
        }
    // Dependency array includes user, form instance, and countryOptions list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, form, countryOptions]);

    // --- Handle Form Submission (REVISED payload) ---
    const onSubmit = useCallback(async (data: ProfileFormValues) => {
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        // Construct payload ONLY from editable form data
        const payload: Partial<UpdateDetailsPayload> = { // Use Partial as not all fields are sent
            firstName: data.firstName,
            lastName: data.lastName,
            // Ensure optional fields are sent as undefined or null if empty/not selected
            // Send 'undefined' if null, so backend can distinguish between explicit null and not provided
            occupation: data.occupation === null ? undefined : data.occupation,
            // REMOVED: nationality, mobile
        };

        // Check if payload is empty (no actual changes made to editable fields)
        // This check might be redundant if the submit button is disabled when form is not dirty
        if (Object.keys(payload).length === 0 || !form.formState.isDirty) {
             setError("No changes detected to save.");
             setIsSubmitting(false);
             return;
        }


        try {
            console.log("Submitting KYC Update Payload:", payload);
            // Ensure the payload type matches what the service expects, even if partial
            const updatedKycResult = await kycService.updateMyKycDetails(payload as UpdateDetailsPayload);

            // Update Auth Context state locally for immediate feedback
            if (updatedKycResult?.kyc) {
                 console.log("Updating AuthContext with API result:", updatedKycResult.kyc);
                 // Update the specific fields that were changed + potentially others returned by API
                 updateAuthUserKyc({
                     firstName: updatedKycResult.kyc.firstName,
                     lastName: updatedKycResult.kyc.lastName,
                     occupation: updatedKycResult.kyc.occupation,
                     lastUpdatedAt: updatedKycResult.kyc.lastUpdatedAt, // Track update time
                     // Keep existing mobile/nationality/dob from context as they weren't submitted/changed
                 });
            } else {
                 console.warn("API did not return updated KYC details, updating context with submitted payload.");
                 // Fallback update - uses the submitted data
                 updateAuthUserKyc(payload as Partial<KycDetails>);
            }

            setSuccessMessage("Personal details updated successfully!");
            // Keep the form values displayed but reset dirty/touched state
            form.reset(data, { keepValues: true, keepDirty: false, keepTouched: false });

        } catch (err: any) {
            const message = err.message || "Failed to update details. Please try again.";
            console.error("KYC Update Error:", err);
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    // Dependencies: updateAuthUserKyc function and form instance
    }, [updateAuthUserKyc, form]);

    // --- Loading State ---
    if (authLoading) {
      return (
        <section className="change-personal-details py-10 flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </section>
      );
    }

    // --- No User State ---
    if (!user) {
        return (
          <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-4 flex items-center gap-3">
            <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
              <FiAlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
            </div>
           
              <p className="text-red-700 dark:text-red-300/90">
                Could not load user data. Please{" "}
                <Link href="/auth/login" className="text-primary font-medium underline">
                  log in
                </Link>{" "}
                again.
              </p>
            
          </div>
        );
    }

    // --- Render Form ---
    return (
        <section className="Change-Personal-Details-Wrapper">
            <div className="Change-Personal-Information">
                    <DashboardHeader title="Update your personal details" />
                <div className="bg-white dark:bg-background w-full lg:max-w-xl rounded-lg">

                    <div className="">
                        {error && <p className="mb-4 text-center text-red-600 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-sm">{error}</p>}
                        {successMessage && <p className="mb-4 text-center text-green-700 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-sm">{successMessage}</p>}

                        {/* Use Shadcn Form component */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Personal details Section */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-mainheading dark:text-white mb-4 border-b pb-2 dark:border-border/50">
                                        Personal Details
                                    </h3>

                                    {/* First Name (Editable) */}
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Legal First Name(s) *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your first name(s)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    {/* Last Name (Editable) */}
                                    <FormField control={form.control} name="lastName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Legal Last Name(s) *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your last name(s)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    {/* Nationality */}
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality</FormLabel>
                                        <FormControl>
                                            <Input value={displayNationality} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
                                        </FormControl>
                                        <FormDescription>Nationality cannot be changed here. Contact support if incorrect.</FormDescription>
                                        {/* No FormMessage needed as it's not validated/submitted */}
                                    </FormItem>

                                    {/* Date of birth - Read Only Section */}
                                    <div>
                                         <h3 className="text-lg font-semibold text-mainheading dark:text-white mb-4 border-b pb-2 dark:border-border/50">
                                             Date of birth
                                         </h3>
                                         <div className="flex gap-2">
                                             <div className="w-1/3">
                                                 <Label htmlFor="dob-day" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Day</Label>
                                                 <Input id="dob-day" name="dob-day" value={displayDob.day} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
                                             </div>
                                             <div className="w-1/2">
                                                 <Label htmlFor="dob-month" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Month</Label>
                                                 <Input id="dob-month" name="dob-month" value={monthLabels[displayDob.month] || ''} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
                                             </div>
                                             <div className="w-1/3">
                                                 <Label htmlFor="dob-year" className="block text-sm font-medium text-gray dark:text-gray-300 mb-1">Year</Label>
                                                 <Input id="dob-year" name="dob-year" value={displayDob.year} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
                                             </div>
                                         </div>
                                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Date of birth usually cannot be changed after verification. Contact support if incorrect.</p>
                                     </div>


                                     {/* Mobile Number Fields*/}
                                    <div className="space-y-2 pt-2">
                                        <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number</FormLabel>
                                        <FormControl>
                                             <Input value={displayMobile} readOnly className="bg-gray-100 dark:bg-secondarybox cursor-not-allowed" />
                                         </FormControl>
                                         <FormDescription>Mobile number cannot be changed here. Contact support if needed.</FormDescription>
                                         {/* No FormMessage needed */}
                                     </div>
                                </div>

                                {/* Additional Information Section */}
                                <div className="space-y-6 pt-4 border-t dark:border-border/50">
                                    <h3 className="text-lg font-semibold text-mainheading dark:text-white mb-4 border-b pb-2 dark:border-border/50">
                                        Additional Information
                                    </h3>

                                    {/* Occupation Combobox (Editable - Optional) */}
                                    <FormField control={form.control} name="occupation" render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Occupation (Optional)</FormLabel>
                                             <Popover open={occupationPopoverOpen} onOpenChange={setOccupationPopoverOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant="outline" role="combobox" aria-label="Select occupation" className={cn( "w-full h-12 justify-between", !field.value && "text-muted-foreground" )} >
                                                             {field.value ? occupationOptions.find( (option) => option.value === field.value )?.label : "Select Occupation"}
                                                             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                         </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className="sm:w-[450px] max-h-[--radix-popover-content-available-height]">
                                                    <Command>
                                                        <CommandInput placeholder="Search occupation..." />
                                                         <CommandList>
                                                            <CommandEmpty>No occupation found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {occupationOptions.map((option) => (
                                                                     <CommandItem
                                                                         value={option.value} // Use value for selection logic
                                                                         key={option.value}
                                                                         onSelect={(currentValue) => {
                                                                             form.setValue("occupation", currentValue === field.value ? null : currentValue, { shouldValidate: true }); // Allow deselecting by setting to null
                                                                             setOccupationPopoverOpen(false);
                                                                         }}
                                                                     >
                                                                         {option.label}
                                                                         <Check className={cn( "ml-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0" )} />
                                                                      </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                {/* Save Button */}
                                <div className="mt-8 pt-6 border-t dark:border-border/50">
                                    <Button
                                        type="submit"
                                        className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isSubmitting || !form.formState.isDirty} // Disable if submitting or no changes
                                    >
                                        {isSubmitting ? (
                                            <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
                                        ) : ( 'Save Changes' )}
                                    </Button>
                                     {/* Show message if form isn't dirty and not submitting */}
                                     {!form.formState.isDirty && !isSubmitting && (
                                        <p className="text-xs text-center text-muted-foreground mt-2">No changes detected to save.</p>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

// --- Shadcn UI Label component (keep if not globally available) ---
const Label = React.forwardRef<
    React.ElementRef<"label">,
    React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
));
Label.displayName = "Label";