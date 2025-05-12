// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt  } from "react-icons/ai";
// import { SlLock  } from "react-icons/sl";
// import { IoIosInformationCircleOutline } from "react-icons/io";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";

// const HeroSection: React.FC = () => {
//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">

//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <PiCurrencyCircleDollar size={22} className="text-green" />
//                 <span className="font-medium text-main">Low fees</span>
//                 <span className="">- fees get cheaper the more you send</span>
//               </div>
//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <AiOutlineThunderbolt size={22} className="text-green " />
//                 <span className="font-medium text-main">Lightning fast</span>
//                 <span className="">
//                   - money typically arrives in seconds{" "}
//                   <IoIosInformationCircleOutline size={18} className="inline-block ml-2" />
//                 </span>
//               </div>
//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <SlLock size={22} className="text-green" />
//                 <span className="font-medium text-main">
//                   Perfectly predictable
//                 </span>
//                 <span className="">
//                   - lock in an exchange rate for up to 48 hours
//                 </span>
//               </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSendAmount(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setReceiveAmount(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleSendCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSendCurrency(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedReceiveCurrency(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full h-16 p-3 border rounded-lg flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full"
//                     />
//                     {/* Country Dropdown :- Change Country */}
//                     <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={INR}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>INR</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full h-16 p-3 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full"
//                     />

//                     {/* Country Dropdown :- Change Country */}
//                     <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={USD}
//                           alt="USD-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>USD</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-md flex items-center justify-between transition-colors duration-300 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-lg p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSendAmount(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setReceiveAmount(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleSendCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSendCurrency(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedReceiveCurrency(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3      border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}
//                     {/* <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={INR}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>INR</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div> */}
//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={handleSendCurrencyChange}
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}
//                     {/* <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={USD}
//                           alt="USD-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>USD</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div> */}
//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={handleReceiveCurrencyChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   // Placeholder exchange rates (replace with API call in a real application)
//   const exchangeRates: { [key: string]: { [key: string]: number } } = {
//     INR: {
//       USD: 0.012, // 1 INR = 0.012 USD
//       EUR: 0.011, // 1 INR = 0.011 EUR
//       GBP: 0.0095, // 1 INR = 0.0095 GBP
//       INR: 1, // 1 INR = 1 INR
//     },
//     USD: {
//       INR: 83.33, // 1 USD = 83.33 INR
//       EUR: 0.92, // 1 USD = 0.92 EUR
//       GBP: 0.79, // 1 USD = 0.79 GBP
//       USD: 1, // 1 USD = 1 USD
//     },
//     EUR: {
//       INR: 90.91, // 1 EUR = 90.90 INR
//       USD: 1.09, // 1 EUR = 1.09 USD
//       GBP: 0.86, // 1 EUR = 0.86 GBP
//       EUR: 1,
//     },
//     GBP: {
//       INR: 105.26, // 1 GBP = 105.26 INR
//       USD: 1.27, // 1 GBP = 1.27 USD
//       EUR: 1.17, //1 GBP = 1.17 EUR
//       GBP: 1, // 1 GBP = 1 GBP
//     },
//   };

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "0.00"; // Or some other default/error handling
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);

//     const rate =
//       exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;
//     setReceiveAmount(convertAndFormat(newSendAmount, rate));
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     // Calculate the inverse rate for conversion
//     const rate =
//       exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//     setSendAmount(convertAndFormat(newReceiveAmount, rate));
//   };

//   // Generic currency change handler (used for both send and receive)
//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     // Use the selected currencies for rate lookup.  Default to 1 if not found.
//     const rate = isSendCurrency
//       ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//       : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;

//     if (isSendCurrency) {
//       setReceiveAmount(
//         convertAndFormat(
//           sendAmount,
//           exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         )
//       );
//     } else {
//       setSendAmount(
//         convertAndFormat(
//           receiveAmount,
//           exchangeRates[newCurrency]?.[selectedSendCurrency] || 1
//         )
//       );
//     }
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// interface ExchangeRates {
//   [key: string]: number;
// }
// interface ApiResponse {
//     success: boolean;
//     timestamp: number;
//     base: string;
//     date: string;
//     rates: ExchangeRates
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState(""); // Default to empty
//   const [receiveAmount, setReceiveAmount] = useState(""); // Default to empty
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0); // For displayed locked-in rate
//     const [sendFee, setSendFee] = useState(0)
//     const [gst, setGst] = useState(0)

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1&symbols=USD,INR,EUR,GBP"
//         );
//         const data:ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: { [key: string]: { [key: string]: number } } = {};
//           const baseRate = data.rates; // Rates relative to EUR

//             //Add base rate to Transformed Rate
//            Object.keys(baseRate).forEach(baseCurrency => {
//             transformedRates[baseCurrency] = {};
//             Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//               });
//                transformedRates[baseCurrency][baseCurrency] = 1; //1:1 conversion
//             });

//             //Added EUR to object
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//             //console.log("Transformed Rates ", transformedRates);
//           setExchangeRates(transformedRates);

//             const initialRate =
//                 transformedRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;
//             setRate(initialRate)
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount

//     // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   // Generic currency change handler (used for both send and receive)
//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       // Use the selected currencies for rate lookup.  Default to 1 if not found.
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;

//          setRate(newRate);

//       if (isSendCurrency) {
//         setReceiveAmount(
//           convertAndFormat(sendAmount, newRate)
//         );
//       } else {
//           // Using newRate directly because we already looked it up
//         setSendAmount(
//           convertAndFormat(receiveAmount, 1/newRate)
//         );
//       }
//     }
//   };

//   // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                     <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg"; // You might not need these if you use the dropdown for all currencies
// import INR from "../../../../public/assets/icons/inr.svg"; // You might not need these if you use the dropdown for all currencies

// import CountryDropdown from "../../components/CountryDropdown";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number }; // Corrected: Nested object for rates
// }
// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number }; // Rates are relative to the base
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Initialize as empty object
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1" // Removed symbols, fetch all
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates; // Rates relative to EUR (from the API)

//           // Build the transformed rates, including the base currency (EUR) itself.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // Add the 1:1 conversion
//           }
//             // Add EUR explicitly (it is already relative to itself)
//             transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.[
//               selectedReceiveCurrency
//             ] || 1;
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message.
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors.
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount.

//   // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;
//       setRate(newRate);

//       if (isSendCurrency) {
//           // New send currency, update receive amount
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       } else {
//           // New receive currency, update send amount
//         setSendAmount(convertAndFormat(receiveAmount, 1/newRate));
//       }
//     }
//   };

//     // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex md:flex-row flex-col md:items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore}
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store <span className="text-gray">1.5L reviews</span>
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore}
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play <span className="text-gray">11L reviews</span>
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (2.15%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosArrowForward,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number }; // Corrected: Nested object for rates
// }
// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number }; // Rates are relative to the base
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Initialize as empty object
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1" // Removed symbols, fetch all
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates; // Rates relative to EUR (from the API)

//           // Build the transformed rates, including the base currency (EUR) itself.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // Add the 1:1 conversion
//           }
//             // Add EUR explicitly (it is already relative to itself)
//             transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.[
//               selectedReceiveCurrency
//             ] || 1;
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message.
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors.
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount.

//   // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;
//       setRate(newRate);

//       if (isSendCurrency) {
//           // New send currency, update receive amount
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       } else {
//           // New receive currency, update send amount
//         setSendAmount(convertAndFormat(receiveAmount, 1/newRate));
//       }
//     }
//   };

//     // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div>
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (2.15%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image"; // Import Image from next/image
// import inr from "../../../../../public/assets/icons/inr.svg"; // Import INR SVG

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD"); // Default to USD
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1"
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1;
//           }
//            transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.["INR"] || 1; // INR is fixed for receive
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   // useEffect(() => {
//   //     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //     const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //     const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//   //     const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//   //       setSendFee(calculatedSendFee);
//   //       setGst(calculatedGST);
//   // }, [sendAmount]);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//       if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//         setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//       }
//   };

//  const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//         setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//     return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//                 <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold">&nbsp;2.2%&nbsp;</span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icons/inr.svg";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   date: string;
//   base: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=87da35d4dd2e48fd8c736c5fc4cfc359"
//         );
//         const data: ApiResponse = await response.json();

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   //  useEffect(() => {
//   //       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //       const calculatedSendFee = numericSendAmount * (1337 / 80000); // Example calculation based on sample data
//   //       const calculatedGST = numericSendAmount * (381.57 / 80000) // Example calculation based on sample data

//   //         setSendFee(calculatedSendFee);
//   //         setGst(calculatedGST);
//   //   }, [sendAmount]);

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// Last Complete Code
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icons/inr.svg";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   date: string;
//   base: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         // Access the API key from the environment variable
//         const apiKey = process.env.NEXT_PUBLIC_CURRENCY_FREAKS_API_KEY;

//         if (!apiKey) {
//           console.error("API key is not defined in environment variables.");
//           // Handle the missing API key appropriately, e.g., display an error message.
//           setLoadingRates(false); // Stop loading even if there's an error.
//           return;  // Exit the function
//         }

//         const response = await fetch(
//           `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`
//         );
//         const data: ApiResponse = await response.json();

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   //  useEffect(() => {
//   //       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //       const calculatedSendFee = numericSendAmount * (1337 / 80000); // Example calculation based on sample data
//   //       const calculatedGST = numericSendAmount * (381.57 / 80000) // Example calculation based on sample data

//   //         setSendFee(calculatedSendFee);
//   //         setGst(calculatedGST);
//   //   }, [sendAmount]);

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // New Latest Code
// // app/components/Home/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../layout"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   rates: {
//     date: string;
//     base: string;
//     rates: { [key: string]: number };
//   }
// }

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown  //CountryDropdown is not defined in this file its in down of this page
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../layout"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// // Removed unused ApiResponse interface

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   // Removed unused selectedReceiveCurrency state and its setter
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee] = useState(0); // Removed unused setSendFee
//   const [gst] = useState(0); // Removed unused setGst
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   {/* Fixed unescaped entity */}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// // Removed unused ApiResponse interface

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   // Removed unused selectedReceiveCurrency state and its setter
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee] = useState(0); // Removed unused setSendFee
//   const [gst] = useState(0); // Removed unused setGst
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   {/* Fixed unescaped entity */}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee {/* Changed ' to ' */}
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext";
// import exchangeRateService from '../../../services/exchangeRate'; // Corrected path assuming it's in src/app/services

// // Define an interface for the expected structure of the rates object
// interface RatesMap {
//   [key: string]: number;
// }

// // Define an interface for the expected service response structure
// interface ExchangeRateResponse {
//   // Adjust this based on the actual structure returned by your service
//   // Common examples include: base, date, success, timestamp etc.
//   // The crucial part is the 'rates' property.
//   rates: RatesMap;
//   // Add other properties if they exist, e.g., base?: string;
// }

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0); // Rate: 1 SendCurrency = X INR
//   const [sendFee] = useState(0);
//   const [gst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         // Assume the service returns an object like { rates: { USD: 1, INR: 83.5, ... } }
//         // Adding a type assertion here helps TypeScript, but ideally, the service function
//         // should have a specific return type (Promise<ExchangeRateResponse>).
//         const response = await exchangeRateService.getExchangeRatesForCurrencies() as ExchangeRateResponse; // Type assertion

//         // Access the rates map directly
//         const fetchedRates = response?.rates; // Use optional chaining for safety

//         if (fetchedRates && typeof fetchedRates === 'object' && Object.keys(fetchedRates).length > 0) {
//           const transformedRates: ExchangeRates = {};
//           const baseCurrencyRates = fetchedRates; // This is the map like { "USD": 1, "EUR": 0.9, "INR": 83 }

//           // Build the cross-rates object
//           // This assumes the fetchedRates are relative to a single base (e.g., USD or EUR)
//           // Let's find the base currency if not explicitly provided (often it's USD or EUR in free APIs)
//           // For simplicity, let's assume the API gives rates relative to USD or you know the base.
//           // If the API provides rates relative to EUR, adjust calculations accordingly.

//           // Example: Assuming fetchedRates are relative to a base (like USD)
//           // We want to calculate rate from ANY currency to ANY OTHER currency
//           const allCurrencies = Object.keys(baseCurrencyRates);

//           for (const fromCurrency of allCurrencies) {
//             transformedRates[fromCurrency] = {};
//             for (const toCurrency of allCurrencies) {
//                 // Rate formula: (Rate of ToCurrency / Rate of FromCurrency)
//                 // Example: USD to INR = (INR rate / USD rate)
//                 // Example: GBP to INR = (INR rate / GBP rate)
//                 transformedRates[fromCurrency][toCurrency] =
//                     (baseCurrencyRates[toCurrency] || 0) / (baseCurrencyRates[fromCurrency] || 1); // Avoid division by zero
//             }
//             transformedRates[fromCurrency][fromCurrency] = 1; // 1:1 for same currency
//           }

//           setExchangeRates(transformedRates);

//           // Set the initial rate based on the *selected* send currency to INR
//           const initialRateToINR = transformedRates[selectedSendCurrency]?.["INR"];

//           if (initialRateToINR) {
//              setRate(initialRateToINR);
//              // Recalculate receive amount if send amount already exists
//               if (sendAmount) {
//                  setReceiveAmount(convertAndFormat(sendAmount, initialRateToINR));
//               }
//           } else {
//              console.warn(`Rate from ${selectedSendCurrency} to INR not found. Defaulting.`);
//              // Provide a fallback or handle the error appropriately
//              setRate(87.2); // Fallback default
//              if (sendAmount) {
//                  setReceiveAmount(convertAndFormat(sendAmount, 87.2));
//              }
//           }

//         } else {
//           console.error("Failed to fetch exchange rates: 'rates' property missing or invalid in response", response);
//           // Handle error state, maybe set a default rate
//            setRate(87.2); // Fallback default on error
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error); // Log the actual error
//         // Handle error state
//          setRate(87.2); // Fallback default on error
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//     // Re-fetch when selectedSendCurrency changes
//   }, [selectedSendCurrency]); // Dependency array is correct

//   const convertAndFormat = (amount: string, conversionRate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount) || !conversionRate) { // Also check if rate is valid
//       return "0.00"; // Return formatted zero or empty string
//     }
//     const convertedAmount = numericAmount * conversionRate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;
//     const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, ''); // Allow only numbers and one dot
//     // Prevent multiple dots
//     if (sanitizedAmount.split('.').length > 2) {
//         return;
//     }
//     setSendAmount(sanitizedAmount);

//     if (!loadingRates && exchangeRates[selectedSendCurrency]) {
//        const currentRateToINR = exchangeRates[selectedSendCurrency]?.["INR"] || 0; // Get rate to INR
//        setRate(currentRateToINR); // Update the displayed rate
//        setReceiveAmount(convertAndFormat(sanitizedAmount, currentRateToINR));
//     } else if (!loadingRates) {
//         // Handle case where rates are loaded but the specific currency pair isn't available
//         console.warn(`Rate for ${selectedSendCurrency} to INR not available.`);
//         setReceiveAmount("0.00");
//         setRate(0); // Reset rate display
//     }
//   };

//  const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency && newCurrency !== selectedSendCurrency) { // Prevent unnecessary updates
//       setSelectedSendCurrency(newCurrency); // Update context

//       // Recalculation will happen automatically via the useEffect hook
//       // triggered by the change in selectedSendCurrency.
//       // We can also update the rate display immediately if rates are available:
//       if (!loadingRates && exchangeRates[newCurrency]) {
//           const newRateToINR = exchangeRates[newCurrency]?.["INR"] || 0;
//           setRate(newRateToINR);
//           setReceiveAmount(convertAndFormat(sendAmount, newRateToINR)); // Recalculate with new rate
//       } else if (!loadingRates) {
//            console.warn(`Rates not loaded or rate for ${newCurrency} to INR not available.`);
//            setRate(0); // Reset rate display
//            setReceiveAmount("0.00"); // Reset receive amount
//       }
//     }
//     // Receive currency is fixed to INR, so no 'else' block needed.
//   };

//   useEffect(() => {
//     const today = new Date();
//     const arrival = new Date(today);
//     // Basic estimate: add 2 business days (skipping weekends)
//     let daysToAdd = 2;
//     let currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
//     while (daysToAdd > 0) {
//         arrival.setDate(arrival.getDate() + 1);
//         currentDay = arrival.getDay();
//         if (currentDay !== 0 && currentDay !== 6) { // If not Sunday or Saturday
//             daysToAdd--;
//         }
//     }

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     if (rate > 0) {
//         // Show rate from selected Send Currency to INR
//         return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`;
//     }
//     return "Rate unavailable"; // Handle case where rate couldn't be determined
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white dark:bg-background">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto"> {/* Consider max-w-xl instead of w-xl */}
//             <div className="bg-white dark:bg-background rounded-3xl shadow-lg md:p-8 p-4 border">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-2 text-primary font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-primary text-mainheading  rounded-full py-1 px-2 inline-block mt-1"> {/* Adjusted text size */}
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label htmlFor="sendAmountInput" className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border rounded-xl  flex items-center justify-between"> {/* Added focus styles */}
//                     <input
//                       id="sendAmountInput"
//                       type="text" // Use text to allow formatting, validation handles numbers
//                       inputMode="decimal" // Hint for mobile keyboards
//                       placeholder="0.00"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-14 p-3 text-mainheading dark:text-white text-2xl font-black focus:outline-none" // Ensure input bg is transparent
//                     />
//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-mainheading dark:text-white mt-1 text-sm rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?
//                   <button type="button" className="underline cursor-pointer text-primary font-medium">
//                     We&apos;ll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label htmlFor="receiveAmountInput" className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border rounded-xl flex items-center justify-between"> {/* Added subtle bg for readonly */}
//                   <input
//                     id="receiveAmountInput"
//                     type="text" // Display only, so text is fine
//                     placeholder="0.00" // Show decimal format
//                     value={receiveAmount || "0.00"} // Display 0.00 if empty
//                     readOnly
//                     className="block w-full h-14 p-3 text-mainheading dark:text-white text-2xl font-black focus:outline-none" // Ensure input bg is transparent
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2"> {/* Adjusted padding/width */}
//                     <Image src={inr} alt="INR Flag" width={24} height={24} />
//                     <p className="text-mainheading dark:text-white  font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
//                   Paying with
//                 </label>
//                 <div className="bg-lightgray dark:bg-background p-3 h-16 border rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-mainheading dark:text-white font-semibold">Bank transfer</span>
//                   </div>
//                   <button type="button" className="text-green font-medium bg-green/10 hover:bg-green/20 px-3 py-2 rounded-full text-sm inline-flex items-center gap-1 transition-colors"> {/* Adjusted gap */}
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between"> {/* Removed text- alignment */}
//                   <span className="text-mainheading dark:text-white">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-300">0 {selectedSendCurrency}</span> {/* Adjusted color */}
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-mainheading dark:text-white ">Our fee</span>
//                   <span className="text-gray-500 dark:text-gray-300">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-mainheading dark:text-white ">GST</span>
//                   <span className="text-gray-500 dark:text-gray-300">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2" /> {/* Adjusted color */}
//                 <div className="flex justify-between text-mainheading dark:text-white font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300"> {/* Adjusted margin/color/spacing */}
//                 <p>You could save<span className="text-primary font-bold">2.2%</span>on the payment you make.</p> {/* Use mx-1 for spacing */}
//                 <p>
//                   Should arrive by
//                   <span className="text-primary font-medium">{arrivalDate || '...'}</span> {/* Fallback for arrival date */}
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2"> {/* Adjusted gap */}
//                 <button type="button" className="w-full inline-flex items-center justify-center px-6 py-3 h-14 cursor-pointer border dark:text-white font-medium rounded-full text-mainheading  hover:bg-button transition-colors duration-300 ease-in-out"> {/* Adjusted hover */}
//                   Compare fees
//                 </button>
//                 <button type="button" className="w-full inline-flex items-center justify-center px-6 py-3 h-14 cursor-pointer border border-transparent font-medium rounded-full text-mainheading bg-primary hover:bg-primaryhover transition-colors duration-300 ease-in-out"> {/* Standard green button */}
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt  } from "react-icons/ai";
// import { SlLock  } from "react-icons/sl";
// import { IoIosInformationCircleOutline } from "react-icons/io";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";

// const HeroSection: React.FC = () => {
//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">

//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <PiCurrencyCircleDollar size={22} className="text-green" />
//                 <span className="font-medium text-main">Low fees</span>
//                 <span className="">- fees get cheaper the more you send</span>
//               </div>
//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <AiOutlineThunderbolt size={22} className="text-green " />
//                 <span className="font-medium text-main">Lightning fast</span>
//                 <span className="">
//                   - money typically arrives in seconds{" "}
//                   <IoIosInformationCircleOutline size={18} className="inline-block ml-2" />
//                 </span>
//               </div>
//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <SlLock size={22} className="text-green" />
//                 <span className="font-medium text-main">
//                   Perfectly predictable
//                 </span>
//                 <span className="">
//                   - lock in an exchange rate for up to 48 hours
//                 </span>
//               </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSendAmount(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setReceiveAmount(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleSendCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSendCurrency(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedReceiveCurrency(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full h-16 p-3 border rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full"
//                     />
//                     {/* Country Dropdown :- Change Country */}
//                     <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={INR}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>INR</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full h-16 p-3 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full"
//                     />

//                     {/* Country Dropdown :- Change Country */}
//                     <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={USD}
//                           alt="USD-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>USD</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-md flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-lg p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSendAmount(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setReceiveAmount(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleSendCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSendCurrency(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedReceiveCurrency(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}
//                     {/* <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={INR}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>INR</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div> */}
//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={handleSendCurrencyChange}
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}
//                     {/* <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={USD}
//                           alt="USD-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>USD</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div> */}
//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={handleReceiveCurrencyChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   // Placeholder exchange rates (replace with API call in a real application)
//   const exchangeRates: { [key: string]: { [key: string]: number } } = {
//     INR: {
//       USD: 0.012, // 1 INR = 0.012 USD
//       EUR: 0.011, // 1 INR = 0.011 EUR
//       GBP: 0.0095, // 1 INR = 0.0095 GBP
//       INR: 1, // 1 INR = 1 INR
//     },
//     USD: {
//       INR: 83.33, // 1 USD = 83.33 INR
//       EUR: 0.92, // 1 USD = 0.92 EUR
//       GBP: 0.79, // 1 USD = 0.79 GBP
//       USD: 1, // 1 USD = 1 USD
//     },
//     EUR: {
//       INR: 90.91, // 1 EUR = 90.90 INR
//       USD: 1.09, // 1 EUR = 1.09 USD
//       GBP: 0.86, // 1 EUR = 0.86 GBP
//       EUR: 1,
//     },
//     GBP: {
//       INR: 105.26, // 1 GBP = 105.26 INR
//       USD: 1.27, // 1 GBP = 1.27 USD
//       EUR: 1.17, //1 GBP = 1.17 EUR
//       GBP: 1, // 1 GBP = 1 GBP
//     },
//   };

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "0.00"; // Or some other default/error handling
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);

//     const rate =
//       exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;
//     setReceiveAmount(convertAndFormat(newSendAmount, rate));
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     // Calculate the inverse rate for conversion
//     const rate =
//       exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//     setSendAmount(convertAndFormat(newReceiveAmount, rate));
//   };

//   // Generic currency change handler (used for both send and receive)
//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     // Use the selected currencies for rate lookup.  Default to 1 if not found.
//     const rate = isSendCurrency
//       ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//       : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;

//     if (isSendCurrency) {
//       setReceiveAmount(
//         convertAndFormat(
//           sendAmount,
//           exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         )
//       );
//     } else {
//       setSendAmount(
//         convertAndFormat(
//           receiveAmount,
//           exchangeRates[newCurrency]?.[selectedSendCurrency] || 1
//         )
//       );
//     }
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// interface ExchangeRates {
//   [key: string]: number;
// }
// interface ApiResponse {
//     success: boolean;
//     timestamp: number;
//     base: string;
//     date: string;
//     rates: ExchangeRates
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState(""); // Default to empty
//   const [receiveAmount, setReceiveAmount] = useState(""); // Default to empty
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0); // For displayed locked-in rate
//     const [sendFee, setSendFee] = useState(0)
//     const [gst, setGst] = useState(0)

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1&symbols=USD,INR,EUR,GBP"
//         );
//         const data:ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: { [key: string]: { [key: string]: number } } = {};
//           const baseRate = data.rates; // Rates relative to EUR

//             //Add base rate to Transformed Rate
//            Object.keys(baseRate).forEach(baseCurrency => {
//             transformedRates[baseCurrency] = {};
//             Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//               });
//                transformedRates[baseCurrency][baseCurrency] = 1; //1:1 conversion
//             });

//             //Added EUR to object
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//             //console.log("Transformed Rates ", transformedRates);
//           setExchangeRates(transformedRates);

//             const initialRate =
//                 transformedRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;
//             setRate(initialRate)
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount

//     // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   // Generic currency change handler (used for both send and receive)
//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       // Use the selected currencies for rate lookup.  Default to 1 if not found.
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;

//          setRate(newRate);

//       if (isSendCurrency) {
//         setReceiveAmount(
//           convertAndFormat(sendAmount, newRate)
//         );
//       } else {
//           // Using newRate directly because we already looked it up
//         setSendAmount(
//           convertAndFormat(receiveAmount, 1/newRate)
//         );
//       }
//     }
//   };

//   // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                     <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg"; // You might not need these if you use the dropdown for all currencies
// import INR from "../../../../public/assets/icons/inr.svg"; // You might not need these if you use the dropdown for all currencies

// import CountryDropdown from "../../components/CountryDropdown";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number }; // Corrected: Nested object for rates
// }
// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number }; // Rates are relative to the base
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Initialize as empty object
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1" // Removed symbols, fetch all
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates; // Rates relative to EUR (from the API)

//           // Build the transformed rates, including the base currency (EUR) itself.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // Add the 1:1 conversion
//           }
//             // Add EUR explicitly (it is already relative to itself)
//             transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.[
//               selectedReceiveCurrency
//             ] || 1;
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message.
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors.
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount.

//   // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;
//       setRate(newRate);

//       if (isSendCurrency) {
//           // New send currency, update receive amount
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       } else {
//           // New receive currency, update send amount
//         setSendAmount(convertAndFormat(receiveAmount, 1/newRate));
//       }
//     }
//   };

//     // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex md:flex-row flex-col md:items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore}
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store <span className="text-gray">1.5L reviews</span>
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore}
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play <span className="text-gray">11L reviews</span>
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (2.15%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosArrowForward,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number }; // Corrected: Nested object for rates
// }
// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number }; // Rates are relative to the base
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Initialize as empty object
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1" // Removed symbols, fetch all
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates; // Rates relative to EUR (from the API)

//           // Build the transformed rates, including the base currency (EUR) itself.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // Add the 1:1 conversion
//           }
//             // Add EUR explicitly (it is already relative to itself)
//             transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.[
//               selectedReceiveCurrency
//             ] || 1;
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message.
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors.
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount.

//   // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;
//       setRate(newRate);

//       if (isSendCurrency) {
//           // New send currency, update receive amount
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       } else {
//           // New receive currency, update send amount
//         setSendAmount(convertAndFormat(receiveAmount, 1/newRate));
//       }
//     }
//   };

//     // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div>
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (2.15%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "@/app/components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image"; // Import Image from next/image
// import inr from "../../../../../public/assets/icon/inr.svg"; // Import INR SVG

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD"); // Default to USD
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1"
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1;
//           }
//            transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.["INR"] || 1; // INR is fixed for receive
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   // useEffect(() => {
//   //     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //     const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //     const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//   //     const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data

//   //       setSendFee(calculatedSendFee);
//   //       setGst(calculatedGST);
//   // }, [sendAmount]);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//       if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//         setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//       }
//   };

//  const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//         setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//     return (
//     <section className="Hero-Section py-12 bg-white dark:bg-background">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//                 <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold">&nbsp;2.2%&nbsp;</span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icons/inr.svg";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   date: string;
//   base: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=87da35d4dd2e48fd8c736c5fc4cfc359"
//         );
//         const data: ApiResponse = await response.json();

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   //  useEffect(() => {
//   //       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //       const calculatedSendFee = numericSendAmount * (1337 / 80000); // Example calculation based on sample data
//   //       const calculatedGST = numericSendAmount * (381.57 / 80000) // Example calculation based on sample data

//   //         setSendFee(calculatedSendFee);
//   //         setGst(calculatedGST);
//   //   }, [sendAmount]);

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// Last Complete Code
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icons/inr.svg";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   date: string;
//   base: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         // Access the API key from the environment variable
//         const apiKey = process.env.NEXT_PUBLIC_CURRENCY_FREAKS_API_KEY;

//         if (!apiKey) {
//           console.error("API key is not defined in environment variables.");
//           // Handle the missing API key appropriately, e.g., display an error message.
//           setLoadingRates(false); // Stop loading even if there's an error.
//           return;  // Exit the function
//         }

//         const response = await fetch(
//           `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`
//         );
//         const data: ApiResponse = await response.json();

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   //  useEffect(() => {
//   //       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //       const calculatedSendFee = numericSendAmount * (1337 / 80000); // Example calculation based on sample data
//   //       const calculatedGST = numericSendAmount * (381.57 / 80000) // Example calculation based on sample data

//   //         setSendFee(calculatedSendFee);
//   //         setGst(calculatedGST);
//   //   }, [sendAmount]);

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // New Latest Code
// // app/components/Home/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../layout"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   rates: {
//     date: string;
//     base: string;
//     rates: { [key: string]: number };
//   }
// }

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown  //CountryDropdown is not defined in this file its in down of this page
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../layout"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// // Removed unused ApiResponse interface

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   // Removed unused selectedReceiveCurrency state and its setter
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee] = useState(0); // Removed unused setSendFee
//   const [gst] = useState(0); // Removed unused setGst
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   {/* Fixed unescaped entity */}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// // Removed unused ApiResponse interface

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   // Removed unused selectedReceiveCurrency state and its setter
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee] = useState(0); // Removed unused setSendFee
//   const [gst] = useState(0); // Removed unused setGst
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);

//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   {/* Fixed unescaped entity */}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee {/* Changed ' to ' */}
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import {
//   IoIosArrowForward,
//   IoIosInformationCircleOutline,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect, useMemo } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext";
// import exchangeRateService from "../../../services/exchangeRate";
// import currencyService, { Currency } from "../../../services/currency"; // Ensure Currency type includes rateAdjustmentPercentage?
// import { FaLock, FaInfoCircle } from "react-icons/fa";
// import { Loader2 } from "lucide-react";

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially due to debugging
// }

// const HeroSection: React.FC = () => {
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fees and Arrival
//   const [sendFee] = useState(0);
//   const [gst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true),
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse &&
//           typeof ratesResponse.rates === "object" &&
//           ratesResponse.rates !== null &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//           console.log("HeroSection: Raw Rates Set", ratesResponse.rates);
//         } else {
//           console.error(
//             "HeroSection: Invalid raw exchange rate data received:",
//             ratesResponse
//           );
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//           console.log("HeroSection: Currencies Set", currenciesResponse);
//         } else {
//           console.error(
//             "HeroSection: Invalid currency data received:",
//             currenciesResponse
//           );
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   // --- Rate Calculation Effect ---
//   useEffect(() => {
//     console.log("HeroSection Rate Effect Triggered:", {
//       isLoading,
//       rawRatesExists: !!rawRates,
//       rawRatesKeys: rawRates ? Object.keys(rawRates).length : "N/A",
//       currenciesLength: currencies.length,
//       selectedSendCurrency,
//     });

//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculation (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//       }
//       return;
//     }

//     try {
//       // --- 1. Calculate Market Rate ---
//       const baseCurrency = "USD"; // Adjust if API base is different
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       // --- Safeguard & Type Check ---
//       // Log the raw values and types BEFORE any conversion
//       console.log(
//         `HeroSection: Raw Value Check - Selected (${selectedSendCurrency}):`,
//         rawRateSelectedValue,
//         `(Type: ${typeof rawRateSelectedValue})`
//       );
//       console.log(
//         `HeroSection: Raw Value Check - INR (${receiveCurrencyCode}):`,
//         rawRateINRValue,
//         `(Type: ${typeof rawRateINRValue})`
//       );

//       // Attempt conversion if they are strings, otherwise use the value directly
//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN; // Handle non-string/non-number as NaN

//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN; // Handle non-string/non-number as NaN

//       // Log the values and types AFTER potential conversion
//       console.log(
//         `HeroSection: Numeric Check - rateBaseToSelected (${selectedSendCurrency}):`,
//         rateBaseToSelected,
//         `(Type: ${typeof rateBaseToSelected})`
//       );
//       console.log(
//         `HeroSection: Numeric Check - rateBaseToINR (${receiveCurrencyCode}):`,
//         rateBaseToINR,
//         `(Type: ${typeof rateBaseToINR})`
//       );

//       // **Critical Check:** Ensure they are valid numbers AFTER potential conversion
//       if (
//         typeof rateBaseToSelected !== "number" ||
//         isNaN(rateBaseToSelected) ||
//         typeof rateBaseToINR !== "number" ||
//         isNaN(rateBaseToINR)
//       ) {
//         console.error(
//           `HeroSection: Failed numeric check after conversion. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw Rates Object:`,
//           rawRates
//         );
//         // Provide a more specific error based on which value failed, if possible
//         let specificError = `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`;
//         if (isNaN(rateBaseToSelected))
//           specificError += ` Invalid rate value for ${selectedSendCurrency}.`;
//         if (isNaN(rateBaseToINR))
//           specificError += ` Invalid rate value for ${receiveCurrencyCode}.`;
//         throw new Error(specificError);
//       }

//       // Check for zero rate after confirming it's a number
//       if (rateBaseToSelected === 0) {
//         console.error(
//           `HeroSection: Rate for selected currency ${selectedSendCurrency} is zero.`
//         );
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate cross rate
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(calculatedMarketRate);
//       console.log(
//         `HeroSection: Calculated Market Rate (${selectedSendCurrency}->${receiveCurrencyCode}):`,
//         calculatedMarketRate
//       );

//       // --- 2. Find Sending Currency Details & Adjustment ---
// const sendingCurrencyDetails = currencies.find(c => c.code === selectedSendCurrency);
// const adjustmentPercent = sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
// setRateAdjustment(adjustmentPercent);
// console.log(`HeroSection: Rate Adjustment fetched for ${selectedSendCurrency}: ${adjustmentPercent}%`);

// // --- 3. Calculate "Our Rate" ---
// // This calculation correctly applies the adjustment/margin, resulting in a less favorable rate for the sender
// const calculatedOurRate = calculatedMarketRate * (1 + adjustmentPercent / 100);
// setOurRate(calculatedOurRate);
// console.log(`HeroSection: Calculated Our Rate (${selectedSendCurrency}->${receiveCurrencyCode}):`, calculatedOurRate);

//       // Clear calculation-specific errors if successful
//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         // Now, if error is truthy, we check if it starts with *either* string.
//         setError(null); // Clear calculation errors
//       } else if (error) {
//         // This else-if still correctly handles the case where 'error' exists but isn't one of the specific calculation errors.
//         console.log("HeroSection: Keeping previous load error:", error); // Keep load errors
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates:", err);
//       setError(
//         err.message || `Could not calculate rate for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     error,
//     receiveCurrencyCode,
//   ]);

//   // --- Amount Calculation Effect ---
//   useEffect(() => {
//     if (ourRate === null || isNaN(ourRate)) {
//       setReceiveAmount("");
//       return;
//     }
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, ""));
//     if (isNaN(numericSendAmount) || numericSendAmount <= 0) {
//       setReceiveAmount("");
//     } else {
//       setReceiveAmount((numericSendAmount * ourRate).toFixed(2));
//     }
//   }, [sendAmount, ourRate]);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null); // Reset for immediate feedback
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null); // Clear previous errors
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (isLoading) return "Loading rate...";
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency) return "Calculating...";
//     if (ourRate === null) return "Select currency"; // Initial state
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       4
//     )} ${receiveCurrencyCode}`;
//   }, [isLoading, error, ourRate, selectedSendCurrency, receiveCurrencyCode]);

//   const displayMarketRate = useMemo(() => {
//     if (isLoading || marketRate === null) return null;
//     if (error && !marketRate) return null; // Don't show if calc failed for market rate
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       4
//     )} ${receiveCurrencyCode}`;
//   }, [isLoading, error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   // Calculate Savings/Difference
//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, ""));
//     if (
//       isNaN(numericSendAmount) ||
//       numericSendAmount <= 0 ||
//       marketRate === null ||
//       ourRate === null ||
//       ourRate >= marketRate
//     ) {
//       return null;
//     }
//     const receivedAtMarket = numericSendAmount * marketRate;
//     const receivedAtOurRate = numericSendAmount * ourRate;
//     const marketDifference = receivedAtMarket - receivedAtOurRate;
//     if (marketDifference <= 0.01) return null;
//     return marketDifference.toFixed(2);
//   }, [sendAmount, marketRate, ourRate]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2);
//     const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []);

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section py-12 bg-white dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background rounded-3xl shadow-lg md:p-8 p-4 border border-gray-200 dark:border-secondarybox">
//               {/* Rate Display Section */}
//               <div className="text-right mb-4 min-h-[60px] space-y-1.5 flex flex-col items-end">
//                 {isLoading && (
//                   <div className="flex justify-end items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
//                     <Loader2 size={16} className="animate-spin" />{" "}
//                     <span>Loading rates...</span>
//                   </div>
//                 )}
//                 {!isLoading && error && (
//                   <div className="font-medium text-sm p-1.5 px-2.5 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 inline-flex items-center gap-1.5">
//                     <IoIosInformationCircleOutline size={16} /> Error: {error}
//                   </div>
//                 )}
//                  {!isLoading && ourRate !== null && (
//                     <div
//                         className="font-semibold p-2 px-4 rounded-md bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light inline-flex items-center gap-1.5 cursor-default text-sm"
//                         // --- UPDATED TOOLTIP ---
//                         title={`Rate includes our rates of ${rateAdjustment.toFixed(2)}%. This is the rate applied to your transfer.`}
//                         // --- END UPDATED TOOLTIP ---
//                     >
//                         <FaLock size={14} /> Our Rate: {displayOurRate}
//                     </div>
//                  )}
//                 {!isLoading &&
//                   !error &&
//                   ourRate === null &&
//                   selectedSendCurrency && (
//                     <div className="text-sm text-gray-500 dark:text-gray-400">
//                       Calculating rate...
//                     </div>
//                   )}
//                 {!isLoading &&
//                   marketRate !== null &&
//                   displayMarketRate && ( // Only show if market rate is available
//                     <div
//                       className="font-medium text-xs p-1.5 px-2.5 rounded-md bg-gray-100 dark:bg-secondarybox text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help"
//                       title="Current mid-market rate. For comparison only."
//                     >
//                       <FaInfoCircle size={14} /> Market Rate:{" "}
//                       {displayMarketRate}
//                     </div>
//                   )}
//               </div>

//               {/* You Send Input */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main dark:text-gray-200 mb-1">
//                   You send exactly
//                 </label>
//                 <div className="w-full border rounded-xl shadow-sm flex items-center justify-between transition-all duration-150">
//                   <input
//                     type="text"
//                     inputMode="decimal"
//                     placeholder="0"
//                     value={sendAmount}
//                     onChange={handleSendAmountChange}
//                     className="block w-full h-16 p-3 text-main dark:text-white text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-400 dark:placeholder-gray-500"
//                     disabled={isLoading}
//                     aria-label="Amount to send"
//                   />
//                   <div className="flex-shrink-0 h-full">
//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={handleCurrencyChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Recipient Gets Input */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main dark:text-gray-200 mb-1">
//                   Recipient gets (approx.)
//                 </label>
//                 <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl shadow-sm flex items-center justify-between bg-gray-50 dark:bg-secondarybox/30">
//                   <input
//                     type="text"
//                     inputMode="decimal"
//                     placeholder="0.00"
//                     value={receiveAmount}
//                     readOnly
//                     className="block w-full h-16 p-3 text-main dark:text-gray-300 text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-400 dark:placeholder-gray-500"
//                     aria-label="Amount recipient gets"
//                   />
//                   <div className="flex items-center gap-2 w-auto px-3 flex-shrink-0">
//                     <Image
//                       src={inr}
//                       alt="INR-Flag"
//                       width={24}
//                       height={24}
//                       className="rounded-full"
//                     />
//                     <p className="text-main dark:text-gray-200 font-semibold">
//                       INR
//                     </p>
//                   </div>
//                 </div>
//                 {/* Savings Display */}
//                 {savingsAmount && !isLoading && !error && (
//                   <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right pr-1">
//                     Market rate would give approx.{" "}
//                     <span className="font-medium text-main dark:text-gray-300">
//                       {savingsAmount} {receiveCurrencyCode}
//                     </span>{" "}
//                     more.
//                   </p>
//                 )}
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main dark:text-gray-200 mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 dark:hover:bg-green/20 p-3 h-16 border border-green hover:border-green-dark dark:border-green/50 dark:hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out text-main dark:text-gray-200">
//                   <div className="flex items-center gap-2">
//
//                     <CiBank size={24} />{" "}
//                     <span className="font-semibold">Bank transfer</span>{" "}
//                   </div>
//                   <button className="text-green dark:text-green-light font-medium bg-green/10 dark:bg-green/20 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2 hover:bg-green/20 dark:hover:bg-green/30">
//
//                     Change <IoIosArrowForward size={18} />{" "}
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 dark:border-secondarybox rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between">
//                   {" "}
//                   <span className="text-main dark:text-gray-300">
//                     {" "}
//                     Bank transfer fee{" "}
//                   </span>{" "}
//                   <span className="text-gray-600 dark:text-gray-400">
//                     0.00 {selectedSendCurrency}
//                   </span>{" "}
//                 </div>
//                 <div className="flex justify-between">
//                   {" "}
//                   <span className="text-main dark:text-gray-300">
//                     Our fee
//                   </span>{" "}
//                   <span className="text-gray-600 dark:text-gray-400">
//                     {sendFee.toFixed(2)} {selectedSendCurrency}
//                   </span>{" "}
//                 </div>
//                 <div className="flex justify-between">
//                   {" "}
//                   <span className="text-main dark:text-gray-300">GST</span>{" "}
//                   <span className="text-gray-600 dark:text-gray-400">
//                     {gst.toFixed(2)} {selectedSendCurrency}
//                   </span>{" "}
//                 </div>
//                 <hr className="my-2 border-gray-200 dark:border-secondarybox" />
//                 <div className="flex justify-between text-main dark:text-gray-200 font-semibold">
//                   {" "}
//                   <span>Total included fees (0%)</span>{" "}
//                   <span>
//                     {(sendFee + gst).toFixed(2)} {selectedSendCurrency}
//                   </span>{" "}
//                 </div>
//               </div>

//               {/* Arrival Info */}
//               <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                 <p>
//                   {" "}
//                   Should arrive around{" "}
//                   <span className="text-main dark:text-gray-300 font-medium">
//                     {arrivalDate || "..."}
//                   </span>{" "}
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-6 flex sm:flex-row flex-col items-center gap-3">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-secondarybox hover:bg-gray-100 dark:hover:bg-secondarybox font-medium rounded-full text-green dark:text-primary bg-white dark:bg-background hover:text-green-dark dark:hover:text-primary-light transition-colors duration-150 ease-in-out h-12 text-base">
//                   {" "}
//                   Compare fees{" "}
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base shadow-sm">
//                   {" "}
//                   Send money{" "}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import {
//   IoIosArrowForward,
//   IoIosInformationCircleOutline,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect, useMemo } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext";
// import exchangeRateService from "../../../services/exchangeRate";
// import currencyService, { Currency } from "../../../services/currency";
// import { FaLock, FaInfoCircle } from "react-icons/fa";
// import { Loader2 } from "lucide-react";

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0); // Store percentage for display/calc

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setRawRates(null); setCurrencies([]);
//       setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//       setOurFeeAmount(0); setBankTransferFeeAmount(0); setWiseFeePercentage(0); // Reset all states

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch currency details WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         // Validate and set raw rates
//         if (ratesResponse && typeof ratesResponse.rates === "object" && ratesResponse.rates !== null && Object.keys(ratesResponse.rates).length > 0) {
//           setRawRates(ratesResponse.rates);
//           console.log("HeroSection: Raw Rates Set", ratesResponse.rates);
//         } else {
//           console.error("HeroSection: Invalid raw exchange rate data received:", ratesResponse);
//           throw new Error("Could not load current exchange rates.");
//         }

//         // Validate and set currencies
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//           console.log("HeroSection: Currencies Set", currenciesResponse);
//         } else {
//           console.error("HeroSection: Invalid currency data received:", currenciesResponse);
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null); setCurrencies([]); // Ensure reset on error
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     console.log("HeroSection Rate & Fee Effect Triggered:", { isLoading, rawRatesExists: !!rawRates, currenciesLength: currencies.length, selectedSendCurrency });

//     if (isLoading || !rawRates || currencies.length === 0 || !selectedSendCurrency) {
//       console.log("HeroSection: Skipping calculations (loading or missing data/currency).");
//       if (!isLoading && (!rawRates || currencies.length === 0)) { // If loading finished but data missing
//         setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//         setWiseFeePercentage(0); setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     try {
//       // --- 1. Calculate Market Rate ---
//       const baseCurrency = "USD"; // Adjust if API base is different
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       console.log(`HeroSection: Raw Value Check - Selected (${selectedSendCurrency}):`, rawRateSelectedValue, `(Type: ${typeof rawRateSelectedValue})`);
//       console.log(`HeroSection: Raw Value Check - INR (${receiveCurrencyCode}):`, rawRateINRValue, `(Type: ${typeof rawRateINRValue})`);

//       const rateBaseToSelected = typeof rawRateSelectedValue === 'string' ? parseFloat(rawRateSelectedValue) : (typeof rawRateSelectedValue === 'number' ? rawRateSelectedValue : NaN);
//       const rateBaseToINR = typeof rawRateINRValue === 'string' ? parseFloat(rawRateINRValue) : (typeof rawRateINRValue === 'number' ? rawRateINRValue : NaN);

//       console.log(`HeroSection: Numeric Check - rateBaseToSelected (${selectedSendCurrency}):`, rateBaseToSelected, `(Type: ${typeof rateBaseToSelected})`);
//       console.log(`HeroSection: Numeric Check - rateBaseToINR (${receiveCurrencyCode}):`, rateBaseToINR, `(Type: ${typeof rateBaseToINR})`);

//       if (typeof rateBaseToSelected !== "number" || isNaN(rateBaseToSelected) || typeof rateBaseToINR !== "number" || isNaN(rateBaseToINR)) {
//         console.error(`HeroSection: Failed numeric check after conversion. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw Rates Object:`, rawRates);
//         let specificError = `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`;
//         if (isNaN(rateBaseToSelected)) specificError += ` Invalid rate value for ${selectedSendCurrency}.`;
//         if (isNaN(rateBaseToINR)) specificError += ` Invalid rate value for ${receiveCurrencyCode}.`;
//         throw new Error(specificError);
//       }
//       if (rateBaseToSelected === 0) {
//         console.error(`HeroSection: Rate for selected currency ${selectedSendCurrency} is zero.`);
//         throw new Error(`Invalid market rate (zero) for ${selectedSendCurrency}.`);
//       }

//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(calculatedMarketRate);
//       console.log(`HeroSection: Calculated Market Rate (${selectedSendCurrency}->${receiveCurrencyCode}):`, calculatedMarketRate);

//       // --- 2. Find Currency Details & Set Fees/Adjustments ---
//       const sendingCurrencyDetails = currencies.find(c => c.code === selectedSendCurrency);
//       const adjustmentPercent = sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent = sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee = sendingCurrencyDetails?.bankTransferFee ?? 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent); // Store percentage for later use
//       setBankTransferFeeAmount(fetchedBankFee);     // Store fixed bank fee
//       console.log(`HeroSection: Set Fees/Adjust - Adjust: ${adjustmentPercent}%, Wise Fee %: ${fetchedWiseFeePercent}%, Bank Fee: ${fetchedBankFee}`);

//       // --- 3. Calculate "Our Rate" ---
//       // Apply adjustment (margin makes rate less favorable for sender)
//       const calculatedOurRate = calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(calculatedOurRate);
//       console.log(`HeroSection: Calculated Our Rate (${selectedSendCurrency}->${receiveCurrencyCode}):`, calculatedOurRate);

//       // --- 4. Clear specific calculation errors if successful ---
//       if (error && (error.startsWith("Market rate unavailable") || error.startsWith("Invalid market rate"))) {
//         setError(null);
//       } else if (error) {
//         console.log("HeroSection: Keeping previous load error:", error)
//       }

//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(err.message || `Could not calculate rates/fees for ${selectedSendCurrency}.`);
//       // Reset all calculated values on error
//       setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//       setWiseFeePercentage(0); setBankTransferFeeAmount(0); setOurFeeAmount(0);
//     }
//   }, [selectedSendCurrency, rawRates, currencies, isLoading, error, receiveCurrencyCode]); // Dependencies

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     // Ensure sendAmount is parsed correctly, default to 0 if invalid/empty
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     // Calculate Receive Amount based on Our Rate
//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedReceive = numericSendAmount * ourRate;
//     }

//     // Calculate Our Fee (Variable based on Percentage)
//     if (wiseFeePercentage > 0 && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//     }
//     setOurFeeAmount(calculatedOurFee); // Update fee amount state

//     // Update receive amount state (display 0.00 if calculation results in 0 or less)
//     setReceiveAmount(calculatedReceive > 0 ? calculatedReceive.toFixed(2) : (numericSendAmount > 0 ? "0.00" : ""));

//   }, [sendAmount, ourRate, wiseFeePercentage]); // Dependencies

//   // --- Input Handlers ---
//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const sanitizedAmount = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     // Reset everything that depends on the currency or calculated rates/fees
//     setSendAmount(""); setReceiveAmount("");
//     setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0); setBankTransferFeeAmount(0); setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (isLoading) return "Loading rate...";
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error) return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(4)} ${receiveCurrencyCode}`;
//   }, [isLoading, error, ourRate, selectedSendCurrency, receiveCurrencyCode]);

//   const displayMarketRate = useMemo(() => {
//     if (isLoading || marketRate === null) return null;
//     if (error && !marketRate) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(4)} ${receiveCurrencyCode}`;
//   }, [isLoading, error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   // Calculate Savings/Difference
//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null || ourRate >= marketRate) {
//       return null;
//     }
//     const receivedAtMarket = numericSendAmount * marketRate;
//     const receivedAtOurRate = numericSendAmount * ourRate;
//     const marketDifference = receivedAtMarket - receivedAtOurRate;
//     if (marketDifference <= 0.01) return null;
//     return marketDifference.toFixed(2);
//   }, [sendAmount, marketRate, ourRate]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // Example: 2 days
//     const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []);

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section py-12 bg-white dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background rounded-3xl shadow-lg md:p-8 p-4 border border-gray-200 dark:border-secondarybox">

//               {/* Rate Display Section */}
//               <div className="text-right mb-4 min-h-[60px] space-y-1.5 flex flex-col items-end">
//                  {isLoading && ( <div className="flex justify-end items-center gap-2 text-gray-500 dark:text-gray-400 text-sm"> <Loader2 size={16} className="animate-spin" /> <span>Loading rates...</span> </div> )}
//                  {!isLoading && error && ( <div className="font-medium text-sm p-1.5 px-2.5 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 inline-flex items-center gap-1.5"> <IoIosInformationCircleOutline size={16} /> Error: {error} </div> )}
//                  {!isLoading && ourRate !== null && (
//                     <div className="font-semibold p-2 px-4 rounded-md bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light inline-flex items-center gap-1.5 cursor-default text-sm"
//                          title={`Rate includes our rates of ${rateAdjustment.toFixed(2)}%. This is the rate applied to your transfer.`}>
//                         <FaLock size={14} /> Our Rate: {displayOurRate}
//                     </div>
//                  )}
//                  {!isLoading && !error && ourRate === null && selectedSendCurrency && ( <div className="text-sm text-gray-500 dark:text-gray-400">Calculating rate...</div> )}
//                  {!isLoading && marketRate !== null && displayMarketRate && (
//                      <div className="font-medium text-xs p-1.5 px-2.5 rounded-md bg-gray-100 dark:bg-secondarybox text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help"
//                           title="Current mid-market rate. For comparison only.">
//                         <FaInfoCircle size={14} /> Market Rate: {displayMarketRate}
//                      </div>
//                  )}
//               </div>

//               {/* You Send Input */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main dark:text-gray-200 mb-1"> You send exactly </label>
//                 <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl shadow-sm flex items-center justify-between transition-all duration-150">
//                   <input type="text" inputMode="decimal" placeholder="0" value={sendAmount} onChange={handleSendAmountChange} className="block w-full h-16 p-3 text-main dark:text-white text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-400 dark:placeholder-gray-500" disabled={isLoading} aria-label="Amount to send" />
//                   <div className="flex-shrink-0 h-full"> <CountryDropdown selectedCurrency={selectedSendCurrency} onCurrencyChange={handleCurrencyChange} /> </div>
//                 </div>
//               </div>

//               {/* Recipient Gets Input */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main dark:text-gray-200 mb-1"> Recipient gets (approx.) </label>
//                 <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl shadow-sm flex items-center justify-between bg-gray-50 dark:bg-secondarybox/30">
//                   <input type="text" inputMode="decimal" placeholder="0.00" value={receiveAmount} readOnly className="block w-full h-16 p-3 text-main dark:text-gray-300 text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-400 dark:placeholder-gray-500" aria-label="Amount recipient gets" />
//                   <div className="flex items-center gap-2 w-auto px-3 flex-shrink-0"> <Image src={inr} alt="INR-Flag" width={24} height={24} className="rounded-full" /> <p className="text-main dark:text-gray-200 font-semibold"> INR </p> </div>
//                 </div>
//                 {/* Savings Display */}
//                 {savingsAmount && !isLoading && !error && ( <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right pr-1"> Market rate would give approx.{" "} <span className="font-medium text-main dark:text-gray-300">{savingsAmount} {receiveCurrencyCode}</span> more. </p> )}
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                  <label className="block font-medium text-main dark:text-gray-200 mb-1">Paying with</label>
//                  <div className="hover:bg-green/10 dark:hover:bg-green/20 p-3 h-16 border border-green hover:border-green-dark dark:border-green/50 dark:hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out text-main dark:text-gray-200">
//                    <div className="flex items-center gap-2"> <CiBank size={24} /> <span className="font-semibold">Bank transfer</span> </div>
//                    <button className="text-green dark:text-green-light font-medium bg-green/10 dark:bg-green/20 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2 hover:bg-green/20 dark:hover:bg-green/30"> Change <IoIosArrowForward size={18} /> </button>
//                  </div>
//               </div>

//               {/* Fee Details (Dynamically Calculated) */}
//               <div className="text-sm border border-gray-300 dark:border-secondarybox rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between">
//                   <span className="text-main dark:text-gray-300"> Bank transfer fee </span>
//                   <span className="text-gray-600 dark:text-gray-400"> {bankTransferFeeAmount.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                    <span className="text-main dark:text-gray-300"> Our fee ({wiseFeePercentage > 0 ? `${wiseFeePercentage.toFixed(2)}%` : '...'}) </span> {/* Show % if available */}
//                    <span className="text-gray-600 dark:text-gray-400"> {ourFeeAmount.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 {/* GST Removed */}
//                 <hr className="my-2 border-gray-200 dark:border-secondarybox" />
//                 <div className="flex justify-between text-main dark:text-gray-200 font-semibold">
//                   <span>Total included fees</span>
//                   <span> {(bankTransferFeeAmount + ourFeeAmount).toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//               </div>

//               {/* Arrival Info */}
//               <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                  <p> Should arrive around{" "} <span className="text-main dark:text-gray-300 font-medium">{arrivalDate || '...'}</span> </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-6 flex sm:flex-row flex-col items-center gap-3">
//                  <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-secondarybox hover:bg-gray-100 dark:hover:bg-secondarybox font-medium rounded-full text-green dark:text-primary bg-white dark:bg-background hover:text-green-dark dark:hover:text-primary-light transition-colors duration-150 ease-in-out h-12 text-base"> Compare fees </button>
//                  <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base shadow-sm"> Send money </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import {
//   IoIosInformationCircleOutline,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect, useMemo } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext";
// import exchangeRateService from "../../../services/exchangeRate";
// import currencyService, { Currency } from "../../../services/currency";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import {TrendingUp } from "lucide-react"; // Make sure TrendingUp is imported
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0); // Store percentage for display/calc (assuming this represents Wise fee)

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true); // Start loading
//       setError(null);
//       setRawRates(null); setCurrencies([]);
//       setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//       setOurFeeAmount(0); setBankTransferFeeAmount(0); setWiseFeePercentage(0); // Reset all states

//       // Simulate loading delay for visibility (remove in production)
//       // await new Promise(resolve => setTimeout(resolve, 1500));

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch currency details WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         // Validate and set raw rates
//         if (ratesResponse && typeof ratesResponse.rates === "object" && ratesResponse.rates !== null && Object.keys(ratesResponse.rates).length > 0) {
//           setRawRates(ratesResponse.rates);
//           console.log("HeroSection: Raw Rates Set", ratesResponse.rates);
//         } else {
//           console.error("HeroSection: Invalid raw exchange rate data received:", ratesResponse);
//           throw new Error("Could not load current exchange rates.");
//         }

//         // Validate and set currencies
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//           console.log("HeroSection: Currencies Set", currenciesResponse);
//         } else {
//           console.error("HeroSection: Invalid currency data received:", currenciesResponse);
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null); setCurrencies([]); // Ensure reset on error
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false); // Stop loading
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     // Skip calculations if initial data is still loading
//     if (isLoading || !rawRates || currencies.length === 0 || !selectedSendCurrency) {
//         console.log("HeroSection: Skipping calculations (loading or missing data/currency).");
//         // Keep calculated values null/zero while loading
//         if (!isLoading && (!rawRates || currencies.length === 0)) { // If loading finished but data missing
//           setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//           setWiseFeePercentage(0); setBankTransferFeeAmount(0);
//         }
//         return;
//       }

//     // Proceed with calculations only after isLoading is false and data is available
//     console.log("HeroSection Rate & Fee Effect Triggered:", { isLoading, rawRatesExists: !!rawRates, currenciesLength: currencies.length, selectedSendCurrency });

//     try {
//       // --- 1. Calculate Market Rate ---
//       const baseCurrency = "USD"; // Adjust if API base is different
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       // (Keep the rest of the calculation logic as before)
//       // ... [Calculation logic remains the same] ...
//       const rateBaseToSelected = typeof rawRateSelectedValue === 'string' ? parseFloat(rawRateSelectedValue) : (typeof rawRateSelectedValue === 'number' ? rawRateSelectedValue : NaN);
//       const rateBaseToINR = typeof rawRateINRValue === 'string' ? parseFloat(rawRateINRValue) : (typeof rawRateINRValue === 'number' ? rawRateINRValue : NaN);

//       if (typeof rateBaseToSelected !== "number" || isNaN(rateBaseToSelected) || typeof rateBaseToINR !== "number" || isNaN(rateBaseToINR)) {
//         console.error(`HeroSection: Failed numeric check after conversion. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw Rates Object:`, rawRates);
//         let specificError = `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`;
//         if (isNaN(rateBaseToSelected)) specificError += ` Invalid rate value for ${selectedSendCurrency}.`;
//         if (isNaN(rateBaseToINR)) specificError += ` Invalid rate value for ${receiveCurrencyCode}.`;
//         throw new Error(specificError);
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(`Invalid market rate (zero) for ${selectedSendCurrency}.`);
//       }

//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(calculatedMarketRate);

//       // --- 2. Find Currency Details & Set Fees/Adjustments ---
//       const sendingCurrencyDetails = currencies.find(c => c.code === selectedSendCurrency);
//       const adjustmentPercent = sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent = sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee = sendingCurrencyDetails?.bankTransferFee ?? 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);

//       // --- 3. Calculate "Our Rate" (Wise Rate) ---
//       const calculatedOurRate = calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(calculatedOurRate);

//       // --- 4. Clear specific calculation errors if successful ---
//       if (error && (error.startsWith("Market rate unavailable") || error.startsWith("Invalid market rate"))) {
//         setError(null);
//       }

//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(err.message || `Could not calculate rates/fees for ${selectedSendCurrency}.`);
//       setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//       setWiseFeePercentage(0); setBankTransferFeeAmount(0); setOurFeeAmount(0);
//     }
//   }, [selectedSendCurrency, rawRates, currencies, isLoading, error, receiveCurrencyCode]); // Dependencies include isLoading now

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     // This effect depends on calculated rates/fees, so it should implicitly wait for isLoading to be false
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       const amountToSendAfterFees = numericSendAmount - (numericSendAmount * (wiseFeePercentage / 100)) - bankTransferFeeAmount;
//       if (amountToSendAfterFees > 0) {
//           calculatedReceive = amountToSendAfterFees * ourRate;
//       } else {
//           calculatedReceive = 0;
//       }
//     }

//     if (wiseFeePercentage > 0 && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//     }
//     setOurFeeAmount(calculatedOurFee);

//     setReceiveAmount(calculatedReceive > 0 ? calculatedReceive.toFixed(2) : (numericSendAmount > 0 ? "0.00" : ""));

//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const sanitizedAmount = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     // Reset dependent states immediately, but rely on useEffect for recalculation after data fetch if needed
//     setSendAmount(""); setReceiveAmount("");
//     setMarketRate(null); setOurRate(null); setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0); setBankTransferFeeAmount(0); setOurFeeAmount(0);
//     // No need to manually set isLoading here, the main useEffect handles it
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     // No need to check isLoading here, relying on the conditional rendering in JSX
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error) return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(4)} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode]); // Removed isLoading dependency

//   const displayMarketRate = useMemo(() => {
//     // No need to check isLoading here
//     if (marketRate === null || (error && !marketRate)) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(4)} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]); // Removed isLoading dependency

//   // Calculate Savings/Difference
//   const savingsAmount = useMemo(() => {
//     // This calculation depends on rates, will be null if rates are null (which happens during loading)
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null || ourRate >= marketRate) {
//       return null;
//     }
//     const amountToConvert = numericSendAmount;
//     const receivedAtMarket = amountToConvert * marketRate;
//     const receivedAtOurRate = amountToConvert * ourRate;
//     const marketDifference = receivedAtMarket - receivedAtOurRate;
//     if (marketDifference <= 0.01) return null;
//     return marketDifference.toFixed(2);
//   }, [sendAmount, marketRate, ourRate]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // Example: 2 days
//     const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []);

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-[#f2f4f7] dark:bg-background py-12 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5">
//              {/* Add Skeleton for HeroText if needed, or keep as is if it doesn't load data */}
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background rounded-3xl shadow-lg md:p-8 p-4 border border-gray-200 dark:border-secondarybox">

//               {/* --- Loading State --- */}
//               {isLoading && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Skeleton for Rate Display */}
//                   <div className="flex flex-col items-end space-y-2 mb-4">
//                     <Skeleton className="h-8 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Skeleton for Inputs */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="h-16 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="h-16 w-full rounded-xl" />
//                   </div>
//                   {/* Skeleton for Paying With */}
//                   <div className="space-y-3">
//                      <Skeleton className="h-4 w-24" />
//                      <Skeleton className="h-16 w-full rounded-xl" />
//                   </div>
//                   {/* Skeleton for Fee Details */}
//                   <div className="border border-gray-200 dark:border-secondarybox rounded-xl p-4 space-y-3">
//                      <div className="flex justify-between items-center"> <Skeleton className="h-4 w-2/5" /> <Skeleton className="h-4 w-1/4" /> </div>
//                      <div className="flex justify-between items-center"> <Skeleton className="h-4 w-2/5" /> <Skeleton className="h-4 w-1/4" /> </div>
//                      <Skeleton className="h-px w-full bg-gray-200 dark:bg-secondarybox my-2" />
//                      <div className="flex justify-between items-center"> <Skeleton className="h-5 w-1/3" /> <Skeleton className="h-5 w-1/4" /> </div>
//                   </div>
//                    {/* Skeleton for Arrival Info */}
//                    <Skeleton className="h-4 w-3/4 mt-2" />
//                   {/* Skeleton for Actions */}
//                   <div className="mt-6 flex sm:flex-row flex-col items-center gap-3">
//                     <Skeleton className="h-12 w-full rounded-full" />
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State --- */}
//               {!isLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                      {/* Error Display */}
//                      {error && ( <div className="font-medium text-sm p-1.5 px-2.5 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 inline-flex items-center gap-1.5"> <IoIosInformationCircleOutline size={16} /> Error: {error} </div> )}
//                      {/* Our Rate Display */}
//                      {!error && ourRate !== null && (
//                         <div className="font-semibold p-2 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm"
//                              title={`Rate includes our rates of ${rateAdjustment.toFixed(2)}%. This is the rate applied to your transfer.`}>
//                             <FaLock size={14} /> Our Rate: {displayOurRate}
//                         </div>
//                      )}
//                      {/* Calculating Rate */}
//                      {!error && ourRate === null && selectedSendCurrency && ( <div className="text-sm text-gray-500 dark:text-gray-400">Calculating rate...</div> )}
//                       {/* Market Rate Display */}
//                      {!error && marketRate !== null && displayMarketRate && (
//                          <div className="font-medium text-xs p-1.5 px-2.5 rounded-full bg-lightgray dark:bg-secondarybox text-gray-300 dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help"
//                               title="Current mid-market rate. For comparison only.">
//                             <FaInfoCircle size={14} /> Market Rate: {displayMarketRate}
//                          </div>
//                      )}
//                       {/* Default message if no currency selected */}
//                       {!selectedSendCurrency && !error && ( <div className="text-sm text-gray-500 dark:text-gray-400">Select sending currency</div> )}
//                   </div>

//                   {/* --- Wise Savings Banner --- */}
//                   {/* Conditionally rendered when there are calculated savings */}
//                   {savingsAmount && !error && ourRate !== null && marketRate !== null && (
//                     <div className="mb-4 bg-gradient-to-r from-green-50 to-primary/10 dark:from-green-900/30 dark:to-primary/20 rounded-xl p-3 border-l-4 border-primary shadow-sm">
//                       <div className="flex items-center gap-2">
//                         <div className="bg-primary rounded-full p-2 text-white dark:text-black flex-shrink-0">
//                           <FaPiggyBank size={20} /> {/* Piggy bank icon */}
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light flex items-center gap-1">
//                             <span>Save up to ₹{savingsAmount} with Wise</span> {/* Changed Wise to Wise */}
//                             <TrendingUp size={16} className="text-green-600 dark:text-green-400" /> {/* Trend up icon */}
//                           </p>
//                           <p className="text-xs text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks! {/* Supporting text */}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Wise Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label className="block font-medium text-main dark:text-gray-200 mb-1"> You send exactly </label>
//                     <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl shadow-sm flex items-center justify-between transition-all duration-150">
//                       <input type="text" inputMode="decimal" placeholder="0" value={sendAmount} onChange={handleSendAmountChange} className="block w-full h-16 p-3 text-main dark:text-white text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-400 dark:placeholder-gray-500" disabled={isLoading} aria-label="Amount to send" />
//                       {/* CountryDropdown now only renders when not loading */}
//                       <div className="flex-shrink-0 h-full"> <CountryDropdown selectedCurrency={selectedSendCurrency} onCurrencyChange={handleCurrencyChange} disabled={isLoading} /> </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label className="block font-medium text-main dark:text-gray-200 mb-1"> Recipient gets (approx.) </label>
//                     <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl shadow-sm flex items-center justify-between bg-gray-50 dark:bg-secondarybox/30">
//                       <input type="text" inputMode="decimal" placeholder="0.00" value={receiveAmount} readOnly className="block w-full h-16 p-3 text-main dark:text-gray-300 text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-400 dark:placeholder-gray-500" aria-label="Amount recipient gets" />
//                       <div className="flex items-center gap-2 w-auto px-3 flex-shrink-0"> <Image src={inr} alt="INR-Flag" width={24} height={24} className="rounded-full" /> <p className="text-main dark:text-gray-200 font-semibold"> INR </p> </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                      <label className="block font-medium text-main dark:text-gray-200 mb-1">Paying with</label>
//                      <div className="p-3 h-16 border border-gray-300 dark:border-secondarybox rounded-xl flex items-center justify-between text-main dark:text-gray-200">
//                        <div className="flex items-center gap-2"> <CiBank size={24} /> <span className="font-semibold">Bank transfer</span> </div>
//                        {/* Optionally add back the change button if needed */}
//                        {/* <button className="text-green dark:text-green-light font-medium bg-green/10 dark:bg-green/20 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2 hover:bg-green/20 dark:hover:bg-green/30"> Change <IoIosArrowForward size={18} /> </button> */}
//                      </div>
//                   </div>

//                   {/* Fee Details (Dynamically Calculated) */}
//                   <div className="text-sm border border-gray-300 dark:border-secondarybox rounded-xl p-4 space-y-2.5">
//                     <div className="flex justify-between">
//                       <span className="text-main dark:text-gray-300"> Bank transfer fee </span>
//                       <span className="text-gray-600 dark:text-gray-400">
//                         {/* Show actual fee or '...' if rate not yet calculated */}
//                         {ourRate !== null ? `${bankTransferFeeAmount.toFixed(2)} ${selectedSendCurrency}` : '...'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                        <span className="text-main dark:text-gray-300"> Wise fee ({wiseFeePercentage > 0 ? `${wiseFeePercentage.toFixed(2)}%` : '...'}) </span>
//                        <span className="text-gray-600 dark:text-gray-400">
//                         {/* Show actual fee or '...' if rate not yet calculated */}
//                         {ourRate !== null ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}` : '...'}
//                       </span>
//                     </div>
//                     <hr className="my-2 border-gray-200 dark:border-secondarybox" />
//                     <div className="flex justify-between text-main dark:text-gray-200 font-semibold">
//                       <span>Total included fees</span>
//                       <span>
//                         {/* Show total fee or '...' if rate not yet calculated */}
//                         {ourRate !== null ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(2)} ${selectedSendCurrency}` : '...'}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                      <p> Should arrive around <span className="text-main dark:text-gray-300 font-medium">{arrivalDate || '...'}</span> </p>
//                   </div>

//                   {/* Actions */}
//                   <div className="mt-6 flex sm:flex-row flex-col items-center gap-3">
//                      <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-secondarybox hover:bg-gray-100 dark:hover:bg-secondarybox font-medium rounded-full text-green dark:text-primary bg-white dark:bg-background hover:text-green-dark dark:hover:text-primary-light transition-colors duration-150 ease-in-out h-12 text-base" disabled={isLoading || !ourRate}> Compare fees </button>
//                      <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base shadow-sm" disabled={isLoading || !ourRate || !sendAmount || parseFloat(sendAmount) <= 0}> Send money </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";

// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed
// import inrFlag from "../../../../../public/assets/icon/inr.svg"; // Adjust path if needed, ensure 'inrFlag' is a good name

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states at the beginning of the fetch
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount(""); // Reset receive amount too

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch currency details WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         // Validate and set raw rates
//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         // Validate and set currencies
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]); // Ensure reset on error
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false); // Stop loading
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     // Skip calculations if initial data is loading, missing, or no currency selected
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping calculations (loading or missing data/currency)."
//       );
//       // Ensure rates/fees are nullified if data becomes unavailable after load
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       // Validate parsed rates
//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected} (${typeof rawRateSelectedValue}), INR: ${rateBaseToINR} (${typeof rawRateINRValue}). Raw Rates:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(calculatedMarketRate);

//       // Find Currency Details & Set Fees/Adjustments
//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee = sendingCurrencyDetails?.bankTransferFee ?? 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);

//       // Calculate "Our Rate" (Wise Rate)
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(calculatedOurRate);

//       // Clear specific calculation errors if successful
//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       // Reset calculated values on error
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount(""); // Also reset receive amount
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     error,
//     receiveCurrencyCode,
//   ]); // Dependencies

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     // Calculate only if rates and send amount are valid
//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       // Calculate Wise fee based on the send amount
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       setOurFeeAmount(calculatedOurFee);

//       // Calculate the amount remaining after ALL fees (bank + Wise)
//       const totalFeesDeducted = bankTransferFeeAmount + calculatedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       // Calculate received amount only if there's a positive amount left after fees
//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//       } else {
//         calculatedReceive = 0; // Avoid negative receive amount
//       }
//     } else {
//       // If no rate or zero send amount, Wise fee is zero
//       setOurFeeAmount(0);
//     }

//     // Update receive amount display: show calculated, "0.00", or empty
//     setReceiveAmount(
//       calculatedReceive > 0
//         ? calculatedReceive.toFixed(2)
//         : numericSendAmount > 0 && ourRate !== null
//         ? "0.00"
//         : "" // Show "0.00" if user typed amount but fees exceed it
//     );
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]); // Dependencies

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       // Simple logic: Add 2 business days (skip weekends)
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []); // Run once on mount

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     // Allow only numbers and a single decimal point
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     // Reset dependent states immediately for responsiveness
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null); // Clear previous errors
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//     // Recalculations will happen via the useEffect hooks
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable"; // Prioritize error message
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating..."; // Show calc only when not loading/error
//     if (ourRate === null) return "Select currency"; // Default if no rate or still loading initial data
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     // Don't show market rate if there's an error or rate is null
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     // Cannot calculate savings without both rates or a send amount
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }

//     // Only calculate savings if Our Rate is strictly better than Market Rate
//     // (A higher rate means recipient gets more INR per unit of send currency)
//     if (ourRate <= marketRate) {
//       // If our rate is the same or worse, there's no "savings" in this context
//       return null;
//     }

//     // Calculate the difference: (Amount * OurRate) - (Amount * MarketRate)
//     // This represents how much *more* INR the recipient gets with our rate.
//     const ourConverted = numericSendAmount * ourRate;
//     const marketConverted = numericSendAmount * marketRate;
//     const rateDifferenceValue = ourConverted - marketConverted;

//     // Only show meaningful savings (e.g., more than 1 paisa)
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }

//     return rateDifferenceValue.toFixed(2); // Format to 2 decimal places
//   }, [sendAmount, marketRate, ourRate]); // Dependencies are correct

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center gap-6">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     {" "}
//                     <Skeleton className="h-4 w-32" />{" "}
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />{" "}
//                   </div>
//                   <div className="space-y-3">
//                     {" "}
//                     <Skeleton className="h-4 w-40" />{" "}
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />{" "}
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     {" "}
//                     <Skeleton className="h-4 w-24" />{" "}
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />{" "}
//                   </div>
//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       {" "}
//                       <Skeleton className="h-4 w-2/5" />{" "}
//                       <Skeleton className="h-4 w-1/4" />{" "}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       {" "}
//                       <Skeleton className="h-4 w-2/5" />{" "}
//                       <Skeleton className="h-4 w-1/4" />{" "}
//                     </div>
//                     <Skeleton className="h-px w-full dark:bg-secondarybox my-2" />
//                     <div className="flex justify-between items-center">
//                       {" "}
//                       <Skeleton className="h-5 w-1/3" />{" "}
//                       <Skeleton className="h-5 w-1/4" />{" "}
//                     </div>
//                   </div>
//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-3/4 mt-2" />
//                   {/* Action Button Skeleton */}
//                   <div className="mt-6">
//                     {" "}
//                     <Skeleton className="h-12 w-full rounded-full" />{" "}
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium text-sm p-2.5 rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 dark:text-white inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline className="size-4" />{" "}
//                         Error:
//                         {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <div
//                         className="font-semibold lg:p-2 p-1.5  lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm"
//                         title={`Rate includes our adjustment of ${rateAdjustment.toFixed(
//                           2
//                         )}%. This is the rate applied to your transfer.`}
//                       >
//                         <FaLock size={14} /> Our Rate: {displayOurRate}
//                       </div>
//                     )}
//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && ( // Render only if displayMarketRate returns a string
//                       <div
//                         className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help"
//                         title="Current mid-market rate. For comparison only."
//                       >
//                         <FaInfoCircle size={14} /> Market Rate:{" "}
//                         {displayMarketRate}
//                       </div>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && ( // Render only if savingsAmount has a value
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-black flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={16}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16  p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading} // Disable input while initial data is loading
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading} // Disable dropdown while initial data is loading
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src={inrFlag}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR{" "}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />{" "}
//                         <span className="font-medium lg:text-base text-sm">Bank transfer</span>{" "}
//                       </div>
//                       {/* Optional: Add a tooltip or info icon explaining this is the assumed method */}
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {/* Show '...' if rate/fees not yet calculated */}
//                         {ourRate !== null
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {/* Show calculated fee or '...' */}
//                         {ourRate !== null && ourFeeAmount > 0
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : ourRate !== null
//                           ? "0.00 " + selectedSendCurrency
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300">
//                       <span>Total included fees</span>
//                       <span>
//                         {/* Show total or '...' */}
//                         {ourRate !== null
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         {/* Adjust href if needed */}
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error || // <--- CORRECTED: Use double negation
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             // <--- APPLY SAME CORRECTION HERE ---
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error || // <--- CORRECTED: Use double negation
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments (store with potentially higher precision internally if needed, but display/use rounded)
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate and round it for display/comparison state
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       // Store the rounded market rate
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2))); // <-- Round to 2 decimal places

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       // Use parseFloat to ensure bank fee is a number, default to 0
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee); // Already a number

//       // Calculate "Our Rate" (using the potentially *unrounded* market rate for intermediate precision)
//       // Apply adjustment to the more precise market rate before rounding the final "Our Rate"
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       // Store the final "Our Rate" rounded to 2 decimal places
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2))); // <-- Round final rate to 2 decimal places

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6), // Log higher precision
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6), // Log higher precision
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       // Clear specific calculation errors if successful
//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     // Removed 'error' as a dependency to prevent potential loops if setting error triggers recalc
//     receiveCurrencyCode,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     // Ensure ourRate is a valid number for calculation
//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       // Calculate Wise fee based on the send amount
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       // Round the calculated Wise fee to 2 decimal places for state storage
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       // Calculate total fees (ensure bank fee is a number)
//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         // Calculate received amount using the rounded "ourRate"
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         // Round the final received amount to 2 decimal places for display
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         // If fees exceed send amount, show 0.00
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       // Reset if conditions aren't met
//       setOurFeeAmount(0);
//       setReceiveAmount(""); // Clear if no valid send amount or rate
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]); // Dependencies

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     // Use the state value which is already rounded
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     // Use the state value which is already rounded
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     // Compare the rounded rates stored in state
//     if (ourRate <= marketRate) {
//       return null;
//     }

//     // Calculate savings based on amount *after* fees (more accurate representation)
//     // Note: Fees are already deducted before calculating receive amount
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null; // No receive amount means no savings

//     // Calculate what would have been received with the market rate after fees
//     // Note: This assumes the same fees apply regardless of rate, which might be complex in reality
//     // For simplicity, we compare the final receive amounts based on the rates applied *after* fees
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//     if (amountToSendAfterFees <= 0) return null; // Can't save if fees exceed amount

//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate; // Use the rounded market rate
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;

//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }

//     return rateDifferenceValue.toFixed(2); // Format to 2 decimal places
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]); // Added fee dependencies

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center gap-6">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>

//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>

//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-1/2" />
//                   {/* Action Button Skeleton */}
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <div
//                         className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm"
//                         title={`Rate includes our adjustment of ${rateAdjustment.toFixed(
//                           2
//                         )}%. This is the rate applied to your transfer.`}
//                       >
//                         <FaLock size={14} /> Our Rate:{" "}
//                         {displayOurRate /* Already formatted */}
//                       </div>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && ( // Render only if displayMarketRate returns a string
//                       <div
//                         className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help"
//                         title="Current mid-market rate. For comparison only."
//                       >
//                         <FaInfoCircle size={14} /> Market Rate:{" "}
//                         {displayMarketRate /* Already formatted */}
//                       </div>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && ( // Render only if savingsAmount has a value
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-black flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             {/* Savings amount is already formatted to .toFixed(2) */}
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={16}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount} // Already formatted to .toFixed(2) or "0.00" or ""
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}` // Ensure bank fee is formatted
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}` // Use state value, already rounded
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2 dark:border-white/10 border-gray-200" />{" "}
//                     {/* Added dark mode border */}
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       {/* Made total bold */}
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}` // Calculate and format total
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             // Disable if receive amount is explicitly "0.00" (meaning fees exceeded send amount)
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Import Shadcn UI Tooltip components
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipProvider, // Provider should wrap the app, not be here usually
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate and round it for display/comparison state
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       // Store the rounded market rate
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2))); // <-- Round to 2 decimal places

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       // Use parseFloat to ensure bank fee is a number, default to 0
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee); // Already a number

//       // Calculate "Our Rate"
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       // Store the final "Our Rate" rounded to 2 decimal places
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2))); // <-- Round final rate to 2 decimal places

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6),
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6),
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     if (ourRate <= marketRate) {
//       return null;
//     }
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;

//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;

//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center gap-6">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 // ... Skeleton remains the same ...
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>

//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>

//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-1/2" />
//                   {/* Action Button Skeleton */}
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           {/* REMOVED title attribute here */}
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate:{" "}
//                             {displayOurRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>

//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-66 xl:max-w-lg">
//                           {/* Tooltip Content */}
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>

//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-66 xl:max-w-lg">
//                           {/* Tooltip Content */}
//                           <p>Current mid-market rate. For comparison only.</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-black flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={16}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2 dark:border-white/10 border-gray-200" />
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Import Shadcn UI Tooltip components
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipProvider, // Provider should wrap the app, not be here usually
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate and round it for display/comparison state
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       // Store the rounded market rate
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2))); // <-- Round to 2 decimal places

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       // Use parseFloat to ensure bank fee is a number, default to 0
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee); // Already a number

//       // Calculate "Our Rate"
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       // Store the final "Our Rate" rounded to 2 decimal places
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2))); // <-- Round final rate to 2 decimal places

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6),
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6),
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     if (ourRate <= marketRate) {
//       return null;
//     }
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;

//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;

//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center gap-6">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>

//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>

//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-1/2" />
//                   {/* Action Button Skeleton */}
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           {/* REMOVED title attribute here */}
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate:{" "}
//                             {displayOurRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>

//                         {/* -------- TOOLTIP CONTENT FOR OUR RATE -------- */}
//                         {/* The classes 'bg-lightgray dark:bg-secondarybox' control the background color */}
//                         {/* of the tooltip bubble AND the arrow/icon pointing from it. */}
//                         {/* Change these classes to change the color. */}
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           {/* Tooltip Content */}
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                         {/* -------- END TOOLTIP CONTENT FOR OUR RATE -------- */}
//                       </Tooltip>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>

//                         {/* -------- TOOLTIP CONTENT FOR MARKET RATE -------- */}
//                         {/* The classes 'bg-lightgray dark:bg-secondarybox' control the background color */}
//                         {/* of the tooltip bubble AND the arrow/icon pointing from it. */}
//                         {/* Change these classes to change the color. */}
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-50 xl:max-w-lg">
//                           {/* Tooltip Content */}
//                           <p>
//                             Current mid-market rates.for comparison only
//                             purpose.
//                           </p>
//                         </TooltipContent>
//                         {/* -------- END TOOLTIP CONTENT FOR MARKET RATE -------- */}
//                       </Tooltip>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-black flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={16}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border border-gray-300 dark:border-secondarybox rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2 dark:border-white/10 border-gray-200" />
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Import Shadcn UI Tooltip components
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipProvider, // Provider should wrap the app, not be here usually
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate and round it for display/comparison state
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       // Store the rounded market rate
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2))); // <-- Round to 2 decimal places

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       // Use parseFloat to ensure bank fee is a number, default to 0
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee); // Already a number

//       // Calculate "Our Rate"
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       // Store the final "Our Rate" rounded to 2 decimal places
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2))); // <-- Round final rate to 2 decimal places

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6),
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6),
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     if (ourRate <= marketRate) {
//       return null;
//     }
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;

//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;

//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-start gap-4">
//           {/* Left Column */}
//           <div className="lg:w-1/2 space-y-5">
//             <HeroText />
//           </div>

//           {/* Right Column: Calculator Card */}
//           <div className="lg:w-xl lg:ml-auto w-full max-w-lg">
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>

//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>

//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-1/2" />
//                   {/* Action Button Skeleton */}
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           {/* REMOVED title attribute here */}
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate:{" "}
//                             {displayOurRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>

//                         {/* -------- TOOLTIP CONTENT FOR OUR RATE -------- */}
//                         {/* The classes 'bg-lightgray dark:bg-secondarybox' control the background color */}
//                         {/* of the tooltip bubble AND the arrow/icon pointing from it. */}
//                         {/* Change these classes to change the color. */}
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           {/* Tooltip Content */}
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                         {/* -------- END TOOLTIP CONTENT FOR OUR RATE -------- */}
//                       </Tooltip>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>

//                         {/* -------- TOOLTIP CONTENT FOR MARKET RATE -------- */}
//                         {/* The classes 'bg-lightgray dark:bg-secondarybox' control the background color */}
//                         {/* of the tooltip bubble AND the arrow/icon pointing from it. */}
//                         {/* Change these classes to change the color. */}
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           {/* Tooltip Content */}
//                           <p className="font-medium dark:text-gray-300 text-gray-700">
//                             Current mid-market rates.for comparison only
//                             purpose Now.
//                           </p>
//                         </TooltipContent>
//                         {/* -------- END TOOLTIP CONTENT FOR MARKET RATE -------- */}
//                       </Tooltip>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-mainheading flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={18}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion } from "framer-motion"; // Import Framer Motion
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Import Shadcn UI Tooltip components
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipProvider, // Best practice: Provider should wrap the app root layout
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate and round it for display/comparison state
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       // Store the rounded market rate
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2))); // <-- Round to 2 decimal places

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       // Use parseFloat to ensure bank fee is a number, default to 0
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee); // Already a number

//       // Calculate "Our Rate"
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       // Store the final "Our Rate" rounded to 2 decimal places
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2))); // <-- Round final rate to 2 decimal places

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6),
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6),
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     if (ourRate <= marketRate) {
//       return null;
//     }
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;

//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;

//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -80 }, // Start position for left column
//     hiddenRight: { opacity: 0, x: 80 }, // Start position for right column
//     visible: {
//       opacity: 1,
//       x: 0, // End position (on screen)
//       transition: {
//         duration: 0.6, // Animation duration
//         ease: "easeOut", // Animation easing
//       },
//     },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4 overflow-hidden">
//       {" "}
//       {/* Added overflow-hidden to contain initial off-screen elements */}
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-start gap-4">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft" // Start state name from variants
//             whileInView="visible" // Animate when the element enters the viewport
//             // viewport={{ once: true, amount: 0.2 }} // <-- REMOVED once: true
//             viewport={{ amount: 0.2 }} // <-- UPDATED: Animate every time 20% is visible
//             variants={variants} // Apply the defined variants
//           >
//             <HeroText />
//           </motion.div>
//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight" // Start state name from variants
//             whileInView="visible" // Animate when the element enters the viewport
//             // viewport={{ once: true, amount: 0.2 }} // <-- REMOVED once: true
//             viewport={{ amount: 0.2 }} // <-- UPDATED: Animate every time 20% is visible
//             variants={variants} // Apply the defined variants
//             transition={{ delay: 0.15, ...variants.visible.transition }} // Add a slight delay and inherit base transition
//           >
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>

//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>

//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-1/2" />
//                   {/* Action Button Skeleton */}
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate:{" "}
//                             {displayOurRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           <p className="font-medium dark:text-gray-300 text-gray-700">
//                             Current mid-market rates.for comparison only purpose
//                             Now.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-mainheading flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={18}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>{" "}
//           {/* End Right Column motion.div */}
//         </div>
//       </div>
//     </section>
//     // </TooltipProvider> // <-- Close if added
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion } from "framer-motion"; // Import Framer Motion
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Import Shadcn UI Tooltip components
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipProvider, // Best practice: Provider should wrap the app root layout
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API (e.g., { USD: 1, EUR: 0.9, ... })
// interface RawExchangeRates {
//   [key: string]: number | string; // Allow string initially for robust parsing
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       // Calculate Market Rate and round it for display/comparison state
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       // Store the rounded market rate
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2))); // <-- Round to 2 decimal places

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       // Use parseFloat to ensure bank fee is a number, default to 0
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee); // Already a number

//       // Calculate "Our Rate"
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       // Store the final "Our Rate" rounded to 2 decimal places
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2))); // <-- Round final rate to 2 decimal places

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6),
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6),
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const sanitizedAmount = event.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     if (ourRate <= marketRate) {
//       return null;
//     }
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;

//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;

//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 }, // Start position for left column
//     hiddenRight: { opacity: 0, x: 100 }, // Start position for right column
//     visible: {
//       opacity: 1,
//       x: 0, // End position (on screen)
//       transition: {
//         duration: 0.5, // Animation duration
//         ease: "easeOut", // Animation easing
//       },
//     },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4 overflow-hidden">
//       {" "}
//       {/* Added overflow-hidden to contain initial off-screen elements */}
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-start gap-4">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft" // Start state name from variants
//             whileInView="visible" // Animate when the element enters the viewport
//             viewport={{ once: true, amount: 0.2 }} // <-- CHANGED: Added once: true
//             variants={variants} // Apply the defined variants
//           >
//             <HeroText />
//           </motion.div>
//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight" // Start state name from variants
//             whileInView="visible" // Animate when the element enters the viewport
//             viewport={{ once: true, amount: 0.2 }} // <-- CHANGED: Added once: true
//             variants={variants} // Apply the defined variants
//             transition={{ delay: 0.15, ...variants.visible.transition }} // Add a slight delay and inherit base transition
//           >
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Rate Skeletons */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   {/* Input Skeletons */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   {/* Paying With Skeleton */}
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>

//                   {/* Fee Details Skeleton */}
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>

//                   {/* Arrival Skeleton */}
//                   <Skeleton className="h-4 w-1/2" />
//                   {/* Action Button Skeleton */}
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate:{" "}
//                             {displayOurRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate /* Already formatted */}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg">
//                           <p className="font-medium dark:text-gray-300 text-gray-700">
//                             Current mid-market rates.for comparison only purpose
//                             Now.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-mainheading flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>
//                             <TrendingUp
//                               size={18}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* --- End Savings Banner --- */}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* Bank Transfer Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     {/* Wise Fee */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     {/* Total Fees */}
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       // --- Logged In: Send Money Button ---
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       // --- Logged Out: Create Account Button ---
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>{" "}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion } from "framer-motion"; // Import Framer Motion
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed

// // Import Shadcn UI Tooltip components
// import {
//   Tooltip,
//   TooltipContent,
//   // TooltipProvider, // Provider should wrap the app root layout
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API
// interface RawExchangeRates {
//   [key: string]: number | string;
// }

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       // ... (data fetching logic remains the same) ...
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount("");

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true),
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     // ... (rate calculation logic remains the same) ...
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       console.log(
//         "HeroSection: Skipping rate calculations (loading or missing data/currency)."
//       );
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     console.log("HeroSection Rate & Fee Effect Triggered:", {
//       selectedSendCurrency,
//     });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];
//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0)
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );

//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);

//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2)));

//       console.log("HeroSection: Rates Calculated", {
//         marketRate: calculatedMarketRate.toFixed(6),
//         roundedMarketRate: parseFloat(calculatedMarketRate.toFixed(2)),
//         adjustmentPercent,
//         ourRate: calculatedOurRate.toFixed(6),
//         roundedOurRate: parseFloat(calculatedOurRate.toFixed(2)),
//         wiseFeePercent: fetchedWiseFeePercent,
//         bankFee: fetchedBankFee,
//       });

//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//     error,
//   ]); // Added error to dep array

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     // ... (amount calculation logic remains the same) ...
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       console.log("HeroSection: Amounts Calculated", {
//         sendAmount: numericSendAmount,
//         wiseFeePercent: wiseFeePercentage,
//         calculatedWiseFee: calculatedOurFee,
//         roundedWiseFee: roundedOurFee,
//         bankFee: bankTransferFeeAmount,
//         totalFees: totalFeesDeducted,
//         amountAfterFees: amountToSendAfterFees,
//         ourRate,
//         calculatedReceive,
//         finalReceiveAmount:
//           calculatedReceive > 0 ? calculatedReceive.toFixed(2) : "0.00",
//       });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     // ... (arrival date logic remains the same) ...
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay();
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Input Handlers ---
//   const handleSendAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // ... (input handling logic remains the same) ...
//     const sanitizedAmount = e.target.value
//       .replace(/[^0-9.]/g, "")
//       .replace(/(\..*)\./g, "$1");
//     setSendAmount(sanitizedAmount);
//   };

//   const handleCurrencyChange = (newCurrency: string) => {
//     // ... (input handling logic remains the same) ...
//     console.log("HeroSection: Currency changed to:", newCurrency);
//     setSelectedSendCurrency(newCurrency);
//     setSendAmount("");
//     setReceiveAmount("");
//     setMarketRate(null);
//     setOurRate(null);
//     setRateAdjustment(0);
//     setError(null);
//     setWiseFeePercentage(0);
//     setBankTransferFeeAmount(0);
//     setOurFeeAmount(0);
//   };

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     // ... (display logic remains the same) ...
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     // ... (display logic remains the same) ...
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     // ... (savings calculation logic remains the same) ...
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null) {
//       return null;
//     }
//     if (ourRate <= marketRate) {
//       return null;
//     }
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;
//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 },
//     hiddenRight: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4 overflow-hidden">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-start gap-4">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//           >
//             <HeroText />
//           </motion.div>

//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//             transition={{ delay: 0.15, ...variants.visible.transition }}
//           >
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* ... (Skeleton structure remains the same) ... */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-1/2" />
//                   <div>
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end" >
//                     {/* Error Display */}
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} />
//                         Error: {error}
//                       </div>
//                     )}

//                     {/* Our Rate Display */}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate: {displayOurRate}
//                           </div>
//                         </TooltipTrigger>
//                         {/* *** MODIFIED HERE *** */}
//                         <TooltipContent
//                           side="bottom" // <-- Tell tooltip to appear below
//                           sideOffset={5} // Optional: Add a small gap
//                           className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}

//                     {/* Calculating Rate Placeholder */}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}

//                     {/* Market Rate Display */}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate}
//                           </div>
//                         </TooltipTrigger>
//                         {/* *** MODIFIED HERE *** */}
//                         <TooltipContent
//                           side="bottom" // <-- Tell tooltip to appear below
//                           sideOffset={5} // Optional: Add a small gap
//                           className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className="font-medium dark:text-gray-300 text-gray-700">
//                             Current mid-market rates for comparison only.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {/* Default message if no currency selected */}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       {/* ... (Savings banner content remains the same) ... */}
//                       <div className="flex items-center gap-2">
//                         {" "}
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-mainheading flex-shrink-0">
//                           {" "}
//                           <FaPiggyBank
//                             size={20}
//                             className="lg:size-6 size-4"
//                           />{" "}
//                         </div>{" "}
//                         <div>
//                           {" "}
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             {" "}
//                             <span>
//                               Save up to ₹{savingsAmount} with Wise
//                             </span>{" "}
//                             <TrendingUp
//                               size={18}
//                               className="text-green-600 dark:text-green-400"
//                             />{" "}
//                           </p>{" "}
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             {" "}
//                             Better rates than traditional banks!{" "}
//                           </p>{" "}
//                         </div>{" "}
//                       </div>
//                     </div>
//                   )}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     {/* ... (Send input remains the same) ... */}
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       {" "}
//                       You send exactly{" "}
//                     </label>{" "}
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       {" "}
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0"
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading}
//                         aria-label="Amount to send"
//                       />{" "}
//                       <div className="flex-shrink-0 h-full">
//                         {" "}
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />{" "}
//                       </div>{" "}
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     {/* ... (Receive input remains the same) ... */}
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       {" "}
//                       Recipient gets (approx.){" "}
//                     </label>{" "}
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5">
//                       {" "}
//                       <input
//                         id="receiveAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder="0.00"
//                         value={receiveAmount}
//                         readOnly
//                         className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                         aria-label="Amount recipient gets"
//                       />{" "}
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0">
//                         {" "}
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />{" "}
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           {" "}
//                           INR{" "}
//                         </p>{" "}
//                       </div>{" "}
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     {/* ... (Paying with remains the same) ... */}
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       {" "}
//                       Paying with{" "}
//                     </label>{" "}
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       {" "}
//                       <div className="flex items-center gap-2">
//                         {" "}
//                         <CiBank size={24} />{" "}
//                         <span className="font-medium lg:text-base text-sm">
//                           {" "}
//                           Bank transfer{" "}
//                         </span>{" "}
//                       </div>{" "}
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     {/* ... (Fee details remain the same) ... */}
//                     <div className="flex justify-between">
//                       {" "}
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {" "}
//                         Bank transfer fee{" "}
//                       </span>{" "}
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {" "}
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}{" "}
//                       </span>{" "}
//                     </div>
//                     <div className="flex justify-between">
//                       {" "}
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {" "}
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         ){" "}
//                       </span>{" "}
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {" "}
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}{" "}
//                       </span>{" "}
//                     </div>{" "}
//                     <hr className="my-2" />
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       {" "}
//                       <span>Total included fees</span>{" "}
//                       <span>
//                         {" "}
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}{" "}
//                       </span>{" "}
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     {/* ... (Arrival info remains the same) ... */}
//                     <p>
//                       {" "}
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {" "}
//                         {arrivalDate || "..."}{" "}
//                       </span>{" "}
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {/* ... (Button logic remains the same) ... */}
//                     {user ? (
//                       <Link href="/send-money" passHref>
//                         {" "}
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           {" "}
//                           Send money{" "}
//                         </button>{" "}
//                       </Link>
//                     ) : (
//                       <Link href="/auth/register" passHref>
//                         {" "}
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           {" "}
//                           Create A Free Account{" "}
//                         </button>{" "}
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>{" "}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
//   useCallback,
// } from "react"; // Added useRef, useCallback
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API
// interface RawExchangeRates {
//   [key: string]: number | string;
// }

// // --- Constants ---
// const CYCLE_AMOUNTS = ["100", "200", "500", "1000" , "1500"];
// const CYCLE_DELAY = 5000; // 5 seconds

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState(""); // Controlled input value
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR"; // Fixed receive currency

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true); // Component data loading
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- NEW State for Auto-Cycling ---
//   const [isAutoCycling, setIsAutoCycling] = useState(true); // Start cycling by default
//   const [currentCycleIndex, setCurrentCycleIndex] = useState(-1); // Start at -1 so first update goes to index 0
//   const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       // Reset all relevant states
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount(""); // Also reset send amount on full reload
//       setIsAutoCycling(true); // Reset cycle state on full load/reload
//       setCurrentCycleIndex(-1); // Reset index
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current); // Clear timer

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true), // Fetch WITH fees/adjustments
//         ]);

//         console.log("HeroSection: Rates Response Raw", ratesResponse);
//         console.log("HeroSection: Currencies Response", currenciesResponse);

//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load current exchange rates.");
//         }

//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currency details.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load required conversion data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         console.log("HeroSection: Initial data fetch complete.");
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once on mount

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       // console.log("HeroSection: Skipping rate calculations (loading or missing data/currency).");
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }

//     // console.log("HeroSection Rate & Fee Effect Triggered:", { selectedSendCurrency });

//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];

//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;

//       if (isNaN(rateBaseToSelected) || isNaN(rateBaseToINR)) {
//         console.error(
//           `HeroSection: Invalid numeric rate value. Selected: ${rateBaseToSelected}, INR: ${rateBaseToINR}. Raw:`,
//           rawRates
//         );
//         throw new Error(
//           `Market rate unavailable for ${selectedSendCurrency} to ${receiveCurrencyCode}.`
//         );
//       }
//       if (rateBaseToSelected === 0) {
//         throw new Error(
//           `Invalid market rate (zero) for ${selectedSendCurrency}.`
//         );
//       }

//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));

//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;

//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);

//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2)));

//       // console.log("HeroSection: Rates Calculated", { /* ... */ });

//       // Clear error if calculation succeeds
//       if (
//         error &&
//         (error.startsWith("Market rate unavailable") ||
//           error.startsWith("Invalid market rate"))
//       ) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message ||
//           `Could not calculate rates/fees for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//     error, // Include error to potentially clear it
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;

//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//       // console.log("HeroSection: Amounts Calculated", { /* ... */ });
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount(""); // Clear receive amount if send amount is 0 or rate is invalid
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay(); // 0 = Sun, 6 = Sat
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Auto-Cycle Effect ---
//   useEffect(() => {
//     const performCycle = () => {
//       // Ensure we only cycle if allowed and data is ready
//       if (!isAutoCycling || isLoading || !ourRate) return;

//       setCurrentCycleIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % CYCLE_AMOUNTS.length;
//         // console.log(`Auto-cycling to index ${nextIndex}, amount ${CYCLE_AMOUNTS[nextIndex]}`);
//         setSendAmount(CYCLE_AMOUNTS[nextIndex]); // Update state, triggers calculation effect
//         return nextIndex;
//       });
//     };

//     if (cycleTimerRef.current) {
//       clearInterval(cycleTimerRef.current);
//       cycleTimerRef.current = null;
//     }

//     if (isAutoCycling && !isLoading && !authLoading && ourRate !== null) {
//       // Only start if rates are calculated
//       if (currentCycleIndex === -1) {
//         performCycle(); // Start immediately if reset
//       }
//       cycleTimerRef.current = setInterval(performCycle, CYCLE_DELAY);
//     }

//     return () => {
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//       }
//     };
//   }, [isAutoCycling, isLoading, authLoading, ourRate]); // Add ourRate dependency

//   // --- Input Handlers ---
//   const handleSendAmountChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       if (isAutoCycling) {
//         // console.log("User typing - stopping auto-cycle");
//         setIsAutoCycling(false);
//         if (cycleTimerRef.current) {
//           clearInterval(cycleTimerRef.current);
//           cycleTimerRef.current = null;
//         }
//       }
//       const sanitizedAmount = event.target.value
//         .replace(/[^0-9.]/g, "")
//         .replace(/(\..*)\./g, "$1");
//       setSendAmount(sanitizedAmount);
//     },
//     [isAutoCycling]
//   ); // Depend on isAutoCycling

//   const handleSendAmountFocus = useCallback(() => {
//     if (isAutoCycling) {
//       // console.log("User focused input - stopping auto-cycle");
//       setIsAutoCycling(false);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     }
//   }, [isAutoCycling]); // Depend on isAutoCycling

//   const handleCurrencyChange = useCallback(
//     (newCurrency: string) => {
//       console.log("HeroSection: Currency changed to:", newCurrency);
//       setSelectedSendCurrency(newCurrency);
//       // Reset everything, including cycle state
//       setSendAmount(""); // Clear amount
//       setReceiveAmount("");
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setError(null);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setIsAutoCycling(true); // Restart cycling
//       setCurrentCycleIndex(-1); // Reset cycle index
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current); // Clear old timer
//         cycleTimerRef.current = null;
//       }
//     },
//     [setSelectedSendCurrency]
//   ); // Depend on setter

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null)
//       return null;
//     if (ourRate <= marketRate) return null;
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;
//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) return null;
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 },
//     hiddenRight: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   // Variants for the number change animation
//   const numberChangeVariants = {
//     initial: { opacity: 0, y: -10 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4 overflow-hidden">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-start gap-4">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//           >
//             <HeroText />
//           </motion.div>

//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//             transition={{ delay: 0.15, ...variants.visible.transition }}
//           >
//             <div className="bg-white dark:bg-background border rounded-3xl shadow-lg lg:p-6 p-4 dark:border">
//               {/* --- Loading State Skeleton --- */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-1/2" />
//                   <div className="mt-6">
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* --- Loaded State Content --- */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display Section */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} /> Error:{" "}
//                         {error}
//                       </div>
//                     )}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate: {displayOurRate}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className="font-medium dark:text-gray-300 text-gray-700">
//                             Current mid-market rates for comparison only.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* --- Savings Banner --- */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-gray/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-gray rounded-full p-2 text-white dark:text-mainheading flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>{" "}
//                             <TrendingUp
//                               size={18}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder={isAutoCycling ? " " : "0"} // Placeholder logic
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         onFocus={handleSendAmountFocus}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500"
//                         disabled={isLoading || !selectedSendCurrency}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5 lg:h-16 h-auto min-h-[64px] relative overflow-hidden">
//                       {/* AnimatePresence manages mount/unmount */}
//                       <AnimatePresence mode="wait">
//                         {/* Motion component wraps the input field */}
//                         {/* Use a div wrapper if input animation causes issues */}
//                         <motion.div
//                           key={receiveAmount || "empty"} // Use key to trigger animation on change
//                           className="absolute inset-0" // Position wrapper
//                           variants={numberChangeVariants}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                         >
//                           <input
//                             id="receiveAmountInput"
//                             type="text"
//                             inputMode="decimal"
//                             placeholder="0.00"
//                             value={receiveAmount}
//                             readOnly
//                             // Input is now full size of the motion div
//                             className="block w-full h-full p-3 text-mainheading dark:text-gray-300 text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-500 cursor-default"
//                             aria-label="Amount recipient gets"
//                           />
//                         </motion.div>
//                       </AnimatePresence>
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0 z-10 ml-auto relative">
//                         {" "}
//                         {/* Ensure flag/currency is above input */}
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* --- Conditional Action Button --- */}
//                   <div className="mt-6">
//                     {user ? (
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
//   useCallback,
// } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import CountryDropdown from "../../../components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useAppContext } from "../../../contexts/WebsiteAppContext";
// import { useAuth } from "../../../contexts/AuthContext";
// import exchangeRateService from "../../../services/exchangeRate";
// import currencyService, { Currency } from "../../../services/currency";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Ensure this path is correct

// // Interface for the raw rates object received from the API
// interface RawExchangeRates {
//   [key: string]: number | string;
// }

// // --- Constants ---
// const CYCLE_AMOUNTS = ["100", "300", "500" , "700" , "1000"];
// const CYCLE_DELAY = 2500; // 2.5 seconds

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR";

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Auto-Cycling State ---
//   const [isAutoCycling, setIsAutoCycling] = useState(true);
//   const [currentCycleIndex, setCurrentCycleIndex] = useState(-1);
//   const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Helper Function to Stop Cycling ---
//   const stopAutoCycling = useCallback(() => {
//     if (isAutoCycling) {
//       setIsAutoCycling(false);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     }
//   }, [isAutoCycling]);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount("");
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true),
//         ]);
//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load rates.");
//         }
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currencies.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         setIsLoading(false);
//         console.log("HeroSection: Initial data fetch complete.");
//       }
//     };
//     fetchInitialData();
//     return () => {
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }
//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];
//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;
//       if (
//         isNaN(rateBaseToSelected) ||
//         isNaN(rateBaseToINR) ||
//         rateBaseToSelected === 0
//       ) {
//         throw new Error(`Rate unavailable/invalid for ${selectedSendCurrency}`);
//       }
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));
//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;
//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2)));
//       if (error && error.startsWith("Rate unavailable")) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message || `Could not calculate rates for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//     error,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);
//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay();
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Auto-Cycle Effect ---
//   useEffect(() => {
//     const performCycle = () => {
//       if (!isAutoCycling || isLoading || !ourRate) return;
//       setCurrentCycleIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % CYCLE_AMOUNTS.length;
//         setSendAmount(CYCLE_AMOUNTS[nextIndex]);
//         return nextIndex;
//       });
//     };
//     if (cycleTimerRef.current) {
//       clearInterval(cycleTimerRef.current);
//       cycleTimerRef.current = null;
//     }
//     if (isAutoCycling && !isLoading && !authLoading && ourRate !== null) {
//       if (currentCycleIndex === -1) {
//         setTimeout(performCycle, 200);
//       } // Slightly delay first cycle
//       else {
//         cycleTimerRef.current = setInterval(performCycle, CYCLE_DELAY);
//       }
//     }
//     return () => {
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//       }
//     };
//   }, [isAutoCycling, isLoading, authLoading, ourRate, currentCycleIndex]); // Added currentCycleIndex dependency

//   // --- Input Handlers ---
//   const handleSendAmountChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       stopAutoCycling();
//       const sanitizedAmount = event.target.value
//         .replace(/[^0-9.]/g, "")
//         .replace(/(\..*)\./g, "$1");
//       setSendAmount(sanitizedAmount);
//     },
//     [stopAutoCycling]
//   );

//   const handleSendAmountFocus = useCallback(() => {
//     stopAutoCycling();
//   }, [stopAutoCycling]);

//   const handleSendAmountKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (event.key === "ArrowUp" || event.key === "ArrowDown") {
//         stopAutoCycling();
//         event.preventDefault();
//         const currentValue = parseFloat(sendAmount.replace(/,/g, "") || "0");
//         let newValue: number;
//         if (event.key === "ArrowUp") {
//           newValue = currentValue + 1;
//         } else {
//           newValue = Math.max(0, currentValue - 1);
//         }
//         setSendAmount(newValue.toString());
//       }
//     },
//     [sendAmount, setSendAmount, stopAutoCycling]
//   );

//   const handleCurrencyChange = useCallback(
//     (newCurrency: string) => {
//       console.log("HeroSection: Currency changed to:", newCurrency);
//       setSelectedSendCurrency(newCurrency);
//       setSendAmount("");
//       setReceiveAmount("");
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setError(null);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     },
//     [setSelectedSendCurrency]
//   );

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null)
//       return null;
//     if (ourRate <= marketRate) return null;
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;
//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) return null;
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 },
//     hiddenRight: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };
//   const numberChangeVariants = {
//     initial: { opacity: 0, y: -10 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4 overflow-hidden">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-start gap-4">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//           >
//             <HeroText />
//           </motion.div>

//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//             transition={{ delay: 0.15, ...variants.visible.transition }}
//           >
//             <div className="bg-white dark:bg-background border rounded-2xl lg:p-6 p-4 dark:border">
//               {/* Loading Skeleton */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Skeleton structure */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="h-5 w-40 rounded-full" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-1/2" />
//                   <div className="mt-6">
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* Loaded Content */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} /> Error:{" "}
//                         {error}
//                       </div>
//                     )}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         {/* *** MODIFIED: Removed asChild *** */}
//                         <TooltipTrigger>
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate: {displayOurRate}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className=" font-medium dark:text-gray-300 text-gray-700">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         {/* *** MODIFIED: Removed asChild *** */}
//                         <TooltipTrigger>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-lightgray dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className="font-medium dark:text-gray-300 text-gray-700">
//                             Current mid-market rates for comparison only.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* Savings Banner */}
//                   {savingsAmount && (
//                     <div className="mb-4 bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-mainheading/50 dark:border-primary">
//                       <div className="flex items-center gap-2">
//                         <div className="dark:bg-primary bg-secondarybox rounded-full p-2 text-white dark:text-mainheading flex-shrink-0">
//                           <FaPiggyBank size={20} className="lg:size-6 size-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                             <span>Save up to ₹{savingsAmount} with Wise</span>{" "}
//                             <TrendingUp
//                               size={18}
//                               className="text-green-600 dark:text-green-400"
//                             />
//                           </p>
//                           <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                             Better rates than traditional banks!
//                           </p>
//                         </div>
//                       </div>{" "}
//                     </div>
//                   )}

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder={isAutoCycling ? " " : "0"}
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         onFocus={handleSendAmountFocus}
//                         onKeyDown={handleSendAmountKeyDown}
//                         className="block w-full lg:h-16 p-3 text-main dark:text-white text-2xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-300"
//                         disabled={isLoading || !selectedSendCurrency}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full z-20">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5 lg:h-16 h-auto min-h-[64px] relative overflow-hidden">
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={receiveAmount || "empty"}
//                           className="absolute inset-0"
//                           variants={numberChangeVariants}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                         >
//                           <input
//                             id="receiveAmountInput"
//                             type="text"
//                             inputMode="decimal"
//                             placeholder="0.00"
//                             value={receiveAmount}
//                             readOnly
//                             className="block w-full lg:h-16 p-3 text-mainheading dark:text-gray-300 text-2xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-300 cursor-default"
//                             aria-label="Amount recipient gets"
//                           />
//                         </motion.div>
//                       </AnimatePresence>
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0 z-10 ml-auto relative">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Conditional Action Button */}
//                   <div className="mt-6">
//                     {user ? (
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

//30-04-2025

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
//   useCallback,
// } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion"; // Ensure AnimatePresence is imported
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API
// interface RawExchangeRates {
//   [key: string]: number | string;
// }

// // --- Constants ---
// const CYCLE_AMOUNTS = ["100", "300", "500", "700", "1000"]; // Updated cycle amounts
// const CYCLE_DELAY = 2500; // 2.5 seconds

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState(""); // Controlled input value
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR";

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Auto-Cycling State ---
//   const [isAutoCycling, setIsAutoCycling] = useState(true);
//   const [currentCycleIndex, setCurrentCycleIndex] = useState(-1);
//   const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Helper Function to Stop Cycling ---
//   const stopAutoCycling = useCallback(() => {
//     if (isAutoCycling) {
//       setIsAutoCycling(false);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     }
//   }, [isAutoCycling]);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount("");
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true),
//         ]);
//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load rates.");
//         }
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currencies.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         setIsLoading(false);
//         console.log("HeroSection: Initial data fetch complete.");
//       }
//     };
//     fetchInitialData();
//     return () => {
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }
//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];
//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;
//       if (
//         isNaN(rateBaseToSelected) ||
//         isNaN(rateBaseToINR) ||
//         rateBaseToSelected === 0
//       ) {
//         throw new Error(`Rate unavailable/invalid for ${selectedSendCurrency}`);
//       }
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));
//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;
//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2)));
//       if (error && error.startsWith("Rate unavailable")) {
//         setError(null);
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message || `Could not calculate rates for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//     error,
//   ]);

//   // --- Amount & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);
//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//     } else {
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [sendAmount, ourRate, wiseFeePercentage, bankTransferFeeAmount]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay();
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Auto-Cycle Effect ---
//   useEffect(() => {
//     const performCycle = () => {
//       if (!isAutoCycling || isLoading || !ourRate) return;
//       setCurrentCycleIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % CYCLE_AMOUNTS.length;
//         setSendAmount(CYCLE_AMOUNTS[nextIndex]);
//         return nextIndex;
//       });
//     };
//     if (cycleTimerRef.current) {
//       clearInterval(cycleTimerRef.current);
//       cycleTimerRef.current = null;
//     }
//     if (isAutoCycling && !isLoading && !authLoading && ourRate !== null) {
//       if (currentCycleIndex === -1) {
//         setTimeout(performCycle, 200); // Slightly delay first cycle
//       }
//       // Set interval only if starting or resuming
//       cycleTimerRef.current = setInterval(performCycle, CYCLE_DELAY);
//     }
//     return () => {
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//       }
//     };
//   }, [isAutoCycling, isLoading, authLoading, ourRate, currentCycleIndex]); // Added currentCycleIndex

//   // --- Input Handlers ---
//   const handleSendAmountChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       stopAutoCycling();
//       const sanitizedAmount = event.target.value
//         .replace(/[^0-9.]/g, "")
//         .replace(/(\..*)\./g, "$1");
//       setSendAmount(sanitizedAmount);
//     },
//     [stopAutoCycling]
//   );

//   const handleSendAmountFocus = useCallback(() => {
//     stopAutoCycling();
//   }, [stopAutoCycling]);

//   const handleSendAmountKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (event.key === "ArrowUp" || event.key === "ArrowDown") {
//         stopAutoCycling();
//         event.preventDefault();
//         const currentValue = parseFloat(sendAmount.replace(/,/g, "") || "0");
//         let newValue: number;
//         if (event.key === "ArrowUp") {
//           newValue = currentValue + 1;
//         } else {
//           newValue = Math.max(0, currentValue - 1);
//         }
//         setSendAmount(newValue.toString());
//       }
//     },
//     [sendAmount, setSendAmount, stopAutoCycling]
//   );

//   const handleCurrencyChange = useCallback(
//     (newCurrency: string) => {
//       console.log("HeroSection: Currency changed to:", newCurrency);
//       setSelectedSendCurrency(newCurrency);
//       setSendAmount("");
//       setReceiveAmount("");
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setError(null);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     },
//     [setSelectedSendCurrency]
//   );

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !ourRate) return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null)
//       return null;
//     if (ourRate <= marketRate) return null;
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;
//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) return null;
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 },
//     hiddenRight: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };
//   const numberChangeVariants = {
//     initial: { opacity: 0, y: -10 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
//   };
//   const savingsBannerVariants = {
//     hidden: { opacity: 0, y: -10, scaleY: 0.9, height: 0 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scaleY: 1,
//       height: "auto",
//       transition: {
//         duration: 0.4,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         height: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: -15,
//       scaleY: 0.95,
//       height: 0,
//       transition: {
//         duration: 0.50,
//         ease: "easeIn",
//         height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
//       },
//     },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 px-4 overflow-hidden">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//           >
//             <HeroText />
//           </motion.div>

//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//             transition={{ delay: 0.15, ...variants.visible.transition }}
//           >
//             <div className="bg-white dark:bg-background border rounded-2xl lg:p-6 p-4 dark:border">
//               {/* Loading Skeleton */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Skeleton structure */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                     <Skeleton className="lg:h-8 h-6 w-48 rounded-full" />
//                   </div>
//                     <Skeleton className="h-16 w-full rounded-xl" />
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-1/2" />
//                   <div className="mt-6">
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* Loaded Content */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {error && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} /> Error:{" "}
//                         {error}
//                       </div>
//                     )}
//                     {!error && ourRate !== null && (
//                       <Tooltip>
//                         {" "}
//                         <TooltipTrigger>
//                           <div className="font-semibold lg:p-2 p-1.5 lg:px-6 px-4 rounded-full bg-primary text-neutral-900 inline-flex items-center gap-1.5 cursor-default text-sm">
//                             <FaLock size={14} /> Our Rate: {displayOurRate}
//                           </div>
//                         </TooltipTrigger>{" "}
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-60 xl:max-w-lg"
//                         >
//                           <p className=" font-medium dark:text-gray-300 text-neutral-900">
//                             Rate includes Our Rate of{" "}
//                             {rateAdjustment.toFixed(2)}%. This is the rate
//                             applied to your transfer.
//                           </p>
//                         </TooltipContent>{" "}
//                       </Tooltip>
//                     )}
//                     {!error && ourRate === null && selectedSendCurrency && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                         Calculating rate...
//                       </div>
//                     )}
//                     {displayMarketRate && (
//                       <Tooltip>
//                         {" "}
//                         <TooltipTrigger>
//                           <div className="font-medium text-xs lg:p-2.5 p-1.5 px-2 rounded-full bg-gray/10 dark:bg-white/5 text-mainheading dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={14} /> Market Rate:{" "}
//                             {displayMarketRate}
//                           </div>
//                         </TooltipTrigger>{" "}
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 w-full rounded-2xl max-w-50   xl:max-w-lg"
//                         >
//                           <p className="font-medium dark:text-gray-300 text-neutral-900">
//                             Current mid-market rates it's for comparison only propose.
//                           </p>
//                         </TooltipContent>{" "}
//                       </Tooltip>
//                     )}
//                     {!selectedSendCurrency && !error && (
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         Select sending currency
//                       </div>
//                     )}
//                   </div>

//                   {/* Savings Banner */}
//                   <AnimatePresence>
//                     {savingsAmount && (
//                       <motion.div
//                         key="savings-banner"
//                         className="mb-4 overflow-hidden"
//                         variants={savingsBannerVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                       >
//                         <div className="bg-lightgray dark:bg-white/5 rounded-xl lg:p-3 p-2 border-l-4 border-primary">
//                           <div className="flex items-center gap-2">
//                             <div className="bg-primary rounded-full p-2 flex-shrink-0">
//                               <FaPiggyBank
//                                 size={20}
//                                 className="lg:size-6 size-4 text-mainheading"
//                               />
//                             </div>
//                             <div>
//                               <p className="font-bold text-primary-dark dark:text-primary-light lg:text-base text-sm flex items-center gap-2">
//                                 <span>
//                                   Save up to ₹{savingsAmount} with Wise
//                                 </span>
//                                 <TrendingUp
//                                   size={18}
//                                   className="text-green-600 dark:text-green-400"
//                                 />
//                               </p>
//                               <p className="lg:text-xs text-[12px] text-gray-700 dark:text-gray-300">
//                                 Better rates than traditional banks!
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* You Send Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div className="w-full border rounded-xl flex items-center justify-between">
//                       <input
//                         id="sendAmountInput"
//                         type="text"
//                         inputMode="decimal"
//                         placeholder={isAutoCycling ? " " : "0"}
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         onFocus={handleSendAmountFocus}
//                         onKeyDown={handleSendAmountKeyDown}
//                         className="block w-full h-16 p-3 text-main dark:text-white md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-300"
//                         disabled={isLoading || !selectedSendCurrency}
//                         aria-label="Amount to send"
//                       />
//                       <div className="flex-shrink-0 h-full z-20">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5 lg:h-16 h-auto min-h-[64px] relative overflow-hidden">
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={receiveAmount || "empty"}
//                           className="absolute inset-0"
//                           variants={numberChangeVariants}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                         >
//                           <input
//                             id="receiveAmountInput"
//                             type="text"
//                             inputMode="decimal"
//                             placeholder="0.00"
//                             value={receiveAmount}
//                             readOnly
//                             className="block w-full h-16 p-3 text-mainheading dark:text-gray-300 md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-700 dark:placeholder-gray-300 cursor-default"
//                             aria-label="Amount recipient gets"
//                           />
//                         </motion.div>
//                       </AnimatePresence>
//                       <div className="flex items-center gap-2 w-auto px-10 flex-shrink-0 z-10 ml-auto relative">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-main dark:text-gray-200 font-semibold">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 lg:h-16 border rounded-xl flex items-center justify-between text-gray-700 dark:text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Wise fee (
//                         {wiseFeePercentage > 0
//                           ? `${wiseFeePercentage.toFixed(2)}%`
//                           : "..."}
//                         )
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2" />
//                     <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null && selectedSendCurrency
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-700 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Conditional Action Button */}
//                   <div className="mt-6">
//                     {user ? (
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-black dark:text-black bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-colors duration-150 ease-in-out h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               receiveAmount === "0.00")
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base text-sm justify-center px-6 lg:py-3 py-2.5 border border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out lg:h-12.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
//   useCallback,
// } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion"; // Ensure AnimatePresence is imported
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API
// interface RawExchangeRates {
//   [key: string]: number | string;
// }

// // --- Constants ---
// const CYCLE_AMOUNTS = ["100", "300", "500", "700", "1000"]; // Updated cycle amounts
// const CYCLE_DELAY = 2500; // 2.5 seconds
// const MAX_SEND_AMOUNT = 50000; // Define the maximum allowed amount (exclusive of 50000)

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState(""); // Controlled input value
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR";

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null); // General API/Rate error
//   const [sendAmountError, setSendAmountError] = useState<string | null>(null); // Specific input validation error

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Auto-Cycling State ---
//   const [isAutoCycling, setIsAutoCycling] = useState(true);
//   const [currentCycleIndex, setCurrentCycleIndex] = useState(-1);
//   const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Helper Function to Stop Cycling ---
//   const stopAutoCycling = useCallback(() => {
//     if (isAutoCycling) {
//       setIsAutoCycling(false);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     }
//   }, [isAutoCycling]);

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setSendAmountError(null); // Reset specific error on load
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount("");
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true),
//         ]);
//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load rates.");
//         }
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currencies.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         setIsLoading(false);
//         console.log("HeroSection: Initial data fetch complete.");
//       }
//     };
//     fetchInitialData();
//     return () => {
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }
//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];
//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;
//       if (
//         isNaN(rateBaseToSelected) ||
//         isNaN(rateBaseToINR) ||
//         rateBaseToSelected === 0
//       ) {
//         throw new Error(`Rate unavailable/invalid for ${selectedSendCurrency}`);
//       }
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));
//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;
//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2)));
//       if (error && error.startsWith("Rate unavailable")) {
//         setError(null); // Clear rate error if rate becomes available
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message || `Could not calculate rates for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//     error, // Keep dependency on general error
//   ]);

//   // --- Amount Validation & Variable Fee Calculation Effect ---
//   useEffect(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;
//     let currentSendAmountError = null; // Local variable for error checking

//     // --- VALIDATION ---
//     if (numericSendAmount >= MAX_SEND_AMOUNT + 0.01) {
//       // Check against 50000
//       currentSendAmountError = `Amount must be less than ${selectedSendCurrency} ${
//         MAX_SEND_AMOUNT + 0.01
//       }.`;
//       setSendAmountError(currentSendAmountError);
//       setReceiveAmount("0.00"); // Reset receive amount on error
//       setOurFeeAmount(0); // Reset fee on error
//       return; // Stop further calculation if invalid
//     } else {
//       // Clear error only if it was previously set for this reason
//       if (sendAmountError?.includes("Amount must be less than")) {
//         setSendAmountError(null);
//       }
//     }

//     // --- CALCULATION (only if valid) ---
//     if (ourRate !== null && !isNaN(ourRate) && numericSendAmount > 0) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         // Handles cases where fees exceed send amount slightly
//         setReceiveAmount("0.00");
//       }
//     } else {
//       // Reset if no rate, or amount is 0 or invalid
//       setOurFeeAmount(0);
//       setReceiveAmount(""); // Show placeholder instead of 0.00 if amount is empty
//     }
//   }, [
//     sendAmount,
//     ourRate,
//     wiseFeePercentage,
//     bankTransferFeeAmount,
//     sendAmountError,
//     selectedSendCurrency,
//   ]); // Added sendAmountError and selectedSendCurrency dependencies

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay();
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Auto-Cycle Effect ---
//   useEffect(() => {
//     const performCycle = () => {
//       if (!isAutoCycling || isLoading || !ourRate) return;
//       setCurrentCycleIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % CYCLE_AMOUNTS.length;
//         // Only set amount if it doesn't trigger the validation error
//         const nextAmount = parseFloat(CYCLE_AMOUNTS[nextIndex]);
//         if (nextAmount < MAX_SEND_AMOUNT + 0.01) {
//           setSendAmount(CYCLE_AMOUNTS[nextIndex]);
//           setSendAmountError(null); // Ensure no error from cycling
//         } else {
//           // Skip this cycle amount if it's too large (though current CYCLE_AMOUNTS are safe)
//           console.warn(
//             "Skipping auto-cycle amount due to validation limit:",
//             nextAmount
//           );
//         }
//         return nextIndex;
//       });
//     };
//     if (cycleTimerRef.current) {
//       clearInterval(cycleTimerRef.current);
//       cycleTimerRef.current = null;
//     }
//     if (isAutoCycling && !isLoading && !authLoading && ourRate !== null) {
//       if (currentCycleIndex === -1) {
//         setTimeout(performCycle, 200); // Slightly delay first cycle
//       }
//       cycleTimerRef.current = setInterval(performCycle, CYCLE_DELAY);
//     }
//     return () => {
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAutoCycling, isLoading, authLoading, ourRate, currentCycleIndex]); // Rerun if dependencies change

//   // --- Input Handlers ---
//   const handleSendAmountChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       stopAutoCycling();
//       const sanitizedAmount = event.target.value
//         .replace(/[^0-9.]/g, "")
//         .replace(/(\..*)\./g, "$1");

//       // Basic check during input change to provide immediate feedback if needed,
//       // but the main validation logic is in the useEffect.
//       const numericValue = parseFloat(sanitizedAmount) || 0;
//       if (numericValue >= MAX_SEND_AMOUNT + 0.01) {
//         // You could set the error here for instant feedback, but useEffect handles the calculation logic.
//         // setSendAmountError(`Amount must be less than ${selectedSendCurrency} ${MAX_SEND_AMOUNT + 0.01}.`);
//       } else {
//         // Clear only the validation error if user corrects it, keep API errors
//         if (sendAmountError?.includes("Amount must be less than")) {
//           setSendAmountError(null);
//         }
//       }
//       setSendAmount(sanitizedAmount); // Update state to trigger useEffect
//     },
//     [stopAutoCycling, sendAmountError, selectedSendCurrency] // Added sendAmountError dependency
//   );

//   const handleSendAmountFocus = useCallback(() => {
//     stopAutoCycling();
//   }, [stopAutoCycling]);

//   const handleSendAmountKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (event.key === "ArrowUp" || event.key === "ArrowDown") {
//         stopAutoCycling();
//         event.preventDefault();
//         const currentValue = parseFloat(sendAmount.replace(/,/g, "") || "0");
//         let newValue: number;
//         if (event.key === "ArrowUp") {
//           newValue = currentValue + 1;
//         } else {
//           newValue = Math.max(0, currentValue - 1);
//         }
//         // Check validation before setting
//         if (newValue < MAX_SEND_AMOUNT + 0.01) {
//           setSendAmount(newValue.toString());
//           // Clear validation error if arrow keys bring it back into range
//           if (sendAmountError?.includes("Amount must be less than")) {
//             setSendAmountError(null);
//           }
//         } else {
//           // Optionally set error immediately or just don't update
//           setSendAmountError(
//             `Amount must be less than ${selectedSendCurrency} ${
//               MAX_SEND_AMOUNT + 0.01
//             }.`
//           );
//           // Keep the old value if the new one is invalid
//           // setSendAmount(sendAmount); // Or setSendAmount(MAX_SEND_AMOUNT.toString()) ?
//         }
//       }
//     },
//     [
//       sendAmount,
//       setSendAmount,
//       stopAutoCycling,
//       sendAmountError,
//       selectedSendCurrency,
//     ] // Added sendAmountError dependency
//   );

//   const handleCurrencyChange = useCallback(
//     (newCurrency: string) => {
//       console.log("HeroSection: Currency changed to:", newCurrency);
//       setSelectedSendCurrency(newCurrency);
//       // Reset everything related to the previous currency/amount
//       setSendAmount("");
//       setReceiveAmount("");
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setError(null); // Clear general errors
//       setSendAmountError(null); // Clear validation error
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       // Restart auto-cycling for the new currency
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     },
//     [setSelectedSendCurrency] // No other dependencies needed here
//   );

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     // Prioritize general error over specific rate issues if both exist
//     if (error && !error.startsWith("Rate unavailable"))
//       return "Rate unavailable";
//     if (error && error.startsWith("Rate unavailable") && !ourRate)
//       return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     // Don't show savings if there's an input validation error
//     if (sendAmountError) return null;
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (numericSendAmount <= 0 || marketRate === null || ourRate === null)
//       return null;
//     if (ourRate <= marketRate) return null;
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;
//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) return null;
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//     sendAmountError, // Add dependency
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 },
//     hiddenRight: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };
//   const numberChangeVariants = {
//     initial: { opacity: 0, y: -10 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
//   };
//   const savingsBannerVariants = {
//     hidden: { opacity: 0, y: -10, scaleY: 0.9, height: 0 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scaleY: 1,
//       height: "auto",
//       transition: {
//         duration: 0.4,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         height: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: -15,
//       scaleY: 0.95,
//       height: 0,
//       transition: {
//         duration: 0.35, // Faster exit
//         ease: "easeIn",
//         height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
//       },
//     },
//   };

//   // NEW: Variants for the input error message
//   const errorVariants = {
//     hidden: { opacity: 0, y: -10, height: 0 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       height: "auto",
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: {
//       opacity: 0,
//       y: -5,
//       height: 0,
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col items-center lg:flex-row gap-6">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//           >
//             <HeroText />
//           </motion.div>

//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}  // ViewPort Visiable 20% Componets
//             variants={variants}
//             transition={{ delay: 0.15, ...variants.visible.transition }}
//           >
//             <div className="bg-white dark:bg-background border rounded-2xl text-mainheading font-medium lg:p-6 p-4">
//               {" "}
//               {/* Added dark border */}
//               {/* Loading Skeleton */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Skeleton structure */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-10 h-6 w-68 rounded-full" />
//                     <Skeleton className="lg:h-8 h-6 w-64 rounded-full" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-1/2" />
//                   <div className="mt-6">
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* Loaded Content */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* General API/Rate Error Display */}

//                     {error &&
//                       !error.startsWith("Rate unavailable") && ( // Only show major errors here
//                         <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                           <IoIosInformationCircleOutline size={24} /> Error:{" "}
//                           {error}
//                         </div>
//                       )}

//                     {/* Our Rate */}
//                     {
//                       !error || error.startsWith("Rate unavailable") ? ( // Show rate or loading/unavailable unless major error
//                         ourRate !== null ? (
//                           <Tooltip>
//                             <TooltipTrigger>
//                               <div className="font-semibold p-1.5 px-5 rounded-full bg-primary text-mainheading flex items-center gap-1.5 cursor-default">
//                                 <FaLock size={16} /> Our Rate: {displayOurRate}
//                               </div>
//                             </TooltipTrigger>

//                             <TooltipContent
//                               side="bottom"
//                               sideOffset={5}
//                               className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-60 xl:max-w-lg"
//                             >
//                               <p className="font-medium dark:text-white text-neutral-900 text-xs">
//                                 {" "}
//                                 {/* Made text smaller */}
//                                 Rate includes Our Rate of{" "}
//                                 {rateAdjustment.toFixed(2)}%. This is the rate
//                                 applied to your transfer.
//                               </p>
//                             </TooltipContent>
//                           </Tooltip>
//                         ) : selectedSendCurrency ? (
//                           <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                             Calculating rate...
//                           </div>
//                         ) : (
//                           <div className="text-sm text-gray-500 dark:text-gray-400">
//                             Select sending currency
//                           </div>
//                         )
//                       ) : null /* Hide rate display if major error */
//                     }

//                     {/* Market Rate */}
//                     {displayMarketRate &&
//                       !error && ( // Hide if major error
//                         <Tooltip>
//                           <TooltipTrigger>
//                             <div className="font-medium text-sm p-1.5 px-4 rounded-full bg-lightgray dark:bg-primarybox text-mainheading dark:text-white inline-flex items-center gap-1.5 cursor-help">
//                               {" "}
//                               {/* Adjusted background */}
//                               <FaInfoCircle size={16} /> Market Rate:{" "}
//                               {displayMarketRate}
//                             </div>
//                           </TooltipTrigger>
//                           <TooltipContent
//                             side="bottom"
//                             sideOffset={5}
//                             className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-50 xl:max-w-lg"
//                           >
//                             <p className="font-medium dark:text-white text-neutral-900 text-xs">
//                               {" "}
//                               {/* Made text smaller */}
//                               Current mid-market rate. For comparison purposes
//                               only.
//                             </p>
//                           </TooltipContent>
//                         </Tooltip>
//                       )}
//                   </div>

//                   {/* Savings Banner */}
//                   <AnimatePresence>
//                     {savingsAmount &&
//                       !sendAmountError && ( // Hide if validation error
//                         <motion.div
//                           key="savings-banner"
//                           className="mb-6 overflow-hidden"
//                           variants={savingsBannerVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                         >
//                           <div className="bg-lightgray dark:bg-primarybox rounded-xl lg:p-4 p-3 border-l-4 border-primary">
//                             <div className="flex items-center gap-2">
//                               <div className="bg-primary rounded-full p-2 flex-shrink-0">
//                                 <FaPiggyBank
//                                   size={20}
//                                   className="lg:size-6 size-4 text-mainheading"
//                                 />
//                               </div>
//                               <div>
//                                 <p className="font-bold text-neutral-900 dark:text-primary lg:text-base text-sm flex items-center gap-1">
//                                   {" "}
//                                   {/* Reduced gap */}
//                                   <span>
//                                     Save up to ₹{savingsAmount} with Wise
//                                   </span>
//                                   <TrendingUp
//                                     size={18} // Slightly smaller icon
//                                   />
//                                 </p>
//                                 <p className="text-xs text-gray-500 dark:text-gray-300">
//                                   {/* Smaller text */}
//                                   Better rates than traditional banks!
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                   </AnimatePresence>

//                   {/* You Send Input */}
//                   <div className="mb-6 relative">
//                     {/* Increased margin-bottom and added relative */}
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>

//                     {/* Input Container with Dynamic Border */}
//                     <div
//                       className={`w-full border rounded-xl flex items-center justify-between transition-colors duration-75 ${
//                         sendAmountError
//                           ? "border-red-700" // Error state style
//                           : "" // Normal state style
//                       }`}
//                     >
//                       <input
//                         id="sendAmountInput"
//                         type="text" // Keep as text to handle formatting if needed, inputMode="decimal" helps mobile
//                         inputMode="decimal"
//                         placeholder={isAutoCycling ? " " : "0.00"} // Show placeholder only when not cycling
//                         value={sendAmount}
//                         onChange={handleSendAmountChange}
//                         onFocus={handleSendAmountFocus}
//                         onKeyDown={handleSendAmountKeyDown}
//                         className="block w-full h-16 p-3 text-mainheading dark:text-white md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-500 dark:placeholder-gray-300" // Adjusted placeholder color
//                         disabled={isLoading || !selectedSendCurrency}
//                         aria-label="Amount to send"
//                         aria-invalid={!!sendAmountError} // Accessibility for invalid state
//                         aria-describedby={
//                           sendAmountError ? "send-amount-error-msg" : undefined
//                         } // Link error msg
//                       />
//                       <div className="flex-shrink-0 h-full z-20">
//                         {" "}
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Animated Error Message Display */}
//                     <AnimatePresence>
//                       {sendAmountError && (
//                         <motion.p
//                           id="send-amount-error-msg" // ID for aria-describedby
//                           key="send-amount-error"
//                           className="text-red-700 text-sm absolute left-1 -bottom-6" // Positioned below the input
//                           variants={errorVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           aria-live="assertive" // Announce error changes
//                         >
//                           {sendAmountError}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-6">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5 lg:h-16 h-auto min-h-[64px] relative overflow-hidden">
//                       {/* Added min-height */}
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={receiveAmount || "empty"} // Use receiveAmount as key
//                           className="absolute inset-0 flex items-center" // Ensure vertical centering
//                           variants={numberChangeVariants}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                         >
//                           <input
//                             id="receiveAmountInput"
//                             type="text"
//                             inputMode="decimal"
//                             placeholder="0.00"
//                             value={
//                               // Show formatted amount or placeholder
//                               receiveAmount && parseFloat(receiveAmount) > 0
//                                 ? parseFloat(receiveAmount).toLocaleString(
//                                     undefined,
//                                     {
//                                       minimumFractionDigits: 2,
//                                       maximumFractionDigits: 2,
//                                     }
//                                   )
//                                 : sendAmount && !sendAmountError
//                                 ? "0.00"
//                                 : "" // Show 0.00 if send amount exists and no error, else empty
//                             }
//                             readOnly
//                             className="block w-full h-full p-3 text-mainheading dark:text-gray-300 md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-500 dark:placeholder-gray-300 cursor-default"
//                             aria-label="Amount recipient gets"
//                           />
//                         </motion.div>
//                       </AnimatePresence>

//                       <div className="flex items-center gap-2 w-auto px-10 py-3 flex-shrink-0 z-10 ml-auto relative h-full">
//                         {/* Ensure consistent height and padding */}
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-mainheading dark:text-gray-300 font-semibold text-sm md:text-base">
//                           {" "}
//                           {/* Responsive text */}
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 h-16 border rounded-xl flex items-center justify-between text-gray-500 dark:text-gray-300 ">
//                       {" "}
//                       {/* Consistent border */}
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5 ">
//                     {" "}
//                     {/* Consistent border */}
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-500 dark:text-gray-300 font-medium">
//                         {" "}
//                         {/* Added font-medium */}
//                         {ourRate !== null &&
//                         selectedSendCurrency &&
//                         !sendAmountError // Hide if validation error
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-300">
//                         Wise fee{" "}
//                         {ourRate !== null &&
//                           selectedSendCurrency &&
//                           wiseFeePercentage > 0 &&
//                           !sendAmountError && // Conditional percentage display
//                           `(${wiseFeePercentage.toFixed(2)}%)`}
//                       </span>
//                       <span className="text-gray-500 dark:text-gray-300 font-medium">
//                         {" "}
//                         {/* Added font-medium */}
//                         {ourRate !== null &&
//                         selectedSendCurrency &&
//                         !sendAmountError // Hide if validation error
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2 " /> {/* Consistent border */}
//                     <div className="flex justify-between text-gray-500 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null &&
//                         selectedSendCurrency &&
//                         !sendAmountError // Hide if validation error
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-500 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Conditional Action Button */}
//                   <div className="mt-6">
//                     {user ? (
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-8 lg:py-3 py-2.5 h-12.5 border border-transparent capitalize cursor-pointer font-medium rounded-full text-mainheading bg-primary hover:bg-primaryhover transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error || // Disable on API errors
//                             !!sendAmountError || // Disable on validation errors
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               (!receiveAmount || receiveAmount === "0.00")) // Disable if sending > 0 but receiving 0
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !!sendAmountError ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               (!receiveAmount || receiveAmount === "0.00"))
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base justify-center px-8 lg:py-3 py-2.5 h-12.5 border capitalize border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Corrected h-12.5
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
//   useCallback,
// } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
// import { TrendingUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
// import HeroText from "./HeroText"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
// import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"; // Adjust path as needed

// // Interface for the raw rates object received from the API
// interface RawExchangeRates {
//   [key: string]: number | string;
// }

// // --- Constants ---
// const CYCLE_AMOUNTS = ["100", "300", "500", "700", "1000"];
// const CYCLE_DELAY = 2500;
// const MAX_SEND_AMOUNT = 50000; // Define the maximum allowed amount (inclusive of 50000)

// const HeroSection: React.FC = () => {
//   // --- Contexts ---
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const { user, loading: authLoading } = useAuth();

//   // --- State Declarations ---
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const receiveCurrencyCode = "INR";

//   // State for fetched data
//   const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
//   const [currencies, setCurrencies] = useState<Currency[]>([]);

//   // State for calculated rates & adjustments
//   const [marketRate, setMarketRate] = useState<number | null>(null);
//   const [ourRate, setOurRate] = useState<number | null>(null);
//   const [rateAdjustment, setRateAdjustment] = useState<number>(0);

//   // State for calculated fees
//   const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
//   const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
//   const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

//   // Operational State
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [sendAmountError, setSendAmountError] = useState<string | null>(null); // Validation error (e.g., > MAX)

//   // Arrival Date
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);

//   // --- Auto-Cycling State ---
//   const [isAutoCycling, setIsAutoCycling] = useState(true);
//   const [currentCycleIndex, setCurrentCycleIndex] = useState(-1);
//   const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Helper Function to Stop Cycling ---
//   const stopAutoCycling = useCallback(() => {
//     if (isAutoCycling) {
//       setIsAutoCycling(false);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//       // Clear specific error when user interacts manually
//       if (sendAmountError?.includes("Amount must be")) {
//         setSendAmountError(null);
//       }
//     }
//   }, [isAutoCycling, sendAmountError]); // Added sendAmountError

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       console.log("HeroSection: Fetching initial data...");
//       setIsLoading(true);
//       setError(null);
//       setSendAmountError(null);
//       setRawRates(null);
//       setCurrencies([]);
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setOurFeeAmount(0);
//       setBankTransferFeeAmount(0);
//       setWiseFeePercentage(0);
//       setReceiveAmount("");
//       setSendAmount("");
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);

//       try {
//         const [ratesResponse, currenciesResponse] = await Promise.all([
//           exchangeRateService.getExchangeRatesForCurrencies(),
//           currencyService.getAllCurrencies(true),
//         ]);
//         if (
//           ratesResponse?.rates &&
//           typeof ratesResponse.rates === "object" &&
//           Object.keys(ratesResponse.rates).length > 0
//         ) {
//           setRawRates(ratesResponse.rates);
//         } else {
//           throw new Error("Could not load rates.");
//         }
//         if (Array.isArray(currenciesResponse)) {
//           setCurrencies(currenciesResponse);
//         } else {
//           throw new Error("Could not load currencies.");
//         }
//       } catch (err: any) {
//         console.error("HeroSection: Error fetching initial data:", err);
//         setError(err.message || "Failed to load data.");
//         setRawRates(null);
//         setCurrencies([]);
//       } finally {
//         setIsLoading(false);
//         console.log("HeroSection: Initial data fetch complete.");
//       }
//     };
//     fetchInitialData();
//     return () => {
//       if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- Rate and Fee Calculation Effect ---
//   useEffect(() => {
//     if (
//       isLoading ||
//       !rawRates ||
//       currencies.length === 0 ||
//       !selectedSendCurrency
//     ) {
//       if (!isLoading && (!rawRates || currencies.length === 0)) {
//         setMarketRate(null);
//         setOurRate(null);
//         setRateAdjustment(0);
//         setWiseFeePercentage(0);
//         setBankTransferFeeAmount(0);
//       }
//       return;
//     }
//     try {
//       let rawRateSelectedValue = rawRates[selectedSendCurrency];
//       let rawRateINRValue = rawRates[receiveCurrencyCode];
//       const rateBaseToSelected =
//         typeof rawRateSelectedValue === "string"
//           ? parseFloat(rawRateSelectedValue)
//           : typeof rawRateSelectedValue === "number"
//           ? rawRateSelectedValue
//           : NaN;
//       const rateBaseToINR =
//         typeof rawRateINRValue === "string"
//           ? parseFloat(rawRateINRValue)
//           : typeof rawRateINRValue === "number"
//           ? rawRateINRValue
//           : NaN;
//       if (
//         isNaN(rateBaseToSelected) ||
//         isNaN(rateBaseToINR) ||
//         rateBaseToSelected === 0
//       ) {
//         throw new Error(`Rate unavailable/invalid for ${selectedSendCurrency}`);
//       }
//       const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
//       setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));
//       const sendingCurrencyDetails = currencies.find(
//         (c) => c.code === selectedSendCurrency
//       );
//       const adjustmentPercent =
//         sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
//       const fetchedWiseFeePercent =
//         sendingCurrencyDetails?.wiseFeePercentage ?? 0;
//       const fetchedBankFee =
//         parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;
//       setRateAdjustment(adjustmentPercent);
//       setWiseFeePercentage(fetchedWiseFeePercent);
//       setBankTransferFeeAmount(fetchedBankFee);
//       const calculatedOurRate =
//         calculatedMarketRate * (1 + adjustmentPercent / 100);
//       setOurRate(parseFloat(calculatedOurRate.toFixed(2)));
//       if (error && error.startsWith("Rate unavailable")) {
//         setError(null); // Clear rate error if rate becomes available
//       }
//     } catch (err: any) {
//       console.error("HeroSection: Error calculating rates/fees:", err);
//       setError(
//         err.message || `Could not calculate rates for ${selectedSendCurrency}.`
//       );
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setReceiveAmount("");
//     }
//   }, [
//     selectedSendCurrency,
//     rawRates,
//     currencies,
//     isLoading,
//     receiveCurrencyCode,
//     error,
//   ]);

//   // --- Receive Amount & Fee Calculation Effect (Based on validated sendAmount) ---
//   useEffect(() => {
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     let calculatedReceive = 0;
//     let calculatedOurFee = 0;

//     // Reset send amount error if the amount is now valid (e.g., user deleted digits)
//     // The input handlers prevent exceeding MAX, so we mainly check if it's <= MAX here.
//     if (numericSendAmount <= MAX_SEND_AMOUNT) {
//       if (sendAmountError?.includes("Amount must be")) {
//         setSendAmountError(null);
//       }
//     } else {
//       // This case should technically not be reached due to input handler,
//       // but keep as a safeguard or if logic changes.
//       setSendAmountError(
//         `Amount must be less than or equal to ${selectedSendCurrency} ${MAX_SEND_AMOUNT}.`
//       );
//       setReceiveAmount("0.00");
//       setOurFeeAmount(0);
//       return; // Stop calculation if invalid
//     }

//     // --- CALCULATION (only if valid and rate exists) ---
//     if (
//       ourRate !== null &&
//       !isNaN(ourRate) &&
//       numericSendAmount > 0 &&
//       numericSendAmount <= MAX_SEND_AMOUNT
//     ) {
//       calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
//       const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
//       setOurFeeAmount(roundedOurFee);

//       const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
//       const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

//       if (amountToSendAfterFees > 0) {
//         calculatedReceive = amountToSendAfterFees * ourRate;
//         setReceiveAmount(calculatedReceive.toFixed(2));
//       } else {
//         setReceiveAmount("0.00");
//       }
//     } else {
//       // Reset if no rate, or amount is 0 or invalid
//       setOurFeeAmount(0);
//       // Show placeholder if sendAmount is truly empty, otherwise show 0.00
//       setReceiveAmount(sendAmount === "" ? "" : "0.00");
//     }
//   }, [
//     sendAmount, // Main trigger
//     ourRate,
//     wiseFeePercentage,
//     bankTransferFeeAmount,
//     selectedSendCurrency, // Needed for error message text
//     sendAmountError, // Track error state
//   ]);

//   // --- Arrival Date Effect ---
//   useEffect(() => {
//     const calculateArrivalDate = () => {
//       const today = new Date();
//       const arrival = new Date(today);
//       let daysToAdd = 2;
//       let addedDays = 0;
//       while (addedDays < daysToAdd) {
//         arrival.setDate(arrival.getDate() + 1);
//         const dayOfWeek = arrival.getDay();
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//           addedDays++;
//         }
//       }
//       const options: Intl.DateTimeFormatOptions = { weekday: "long" };
//       setArrivalDate(arrival.toLocaleDateString(undefined, options));
//     };
//     calculateArrivalDate();
//   }, []);

//   // --- Auto-Cycle Effect ---
//   useEffect(() => {
//     const performCycle = () => {
//       if (!isAutoCycling || isLoading || !ourRate) return;
//       setCurrentCycleIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % CYCLE_AMOUNTS.length;
//         const nextAmountStr = CYCLE_AMOUNTS[nextIndex];
//         const nextAmount = parseFloat(nextAmountStr);

//         // Ensure cycle amount respects the limit
//         if (nextAmount <= MAX_SEND_AMOUNT) {
//           setSendAmount(nextAmountStr);
//           // Clear any lingering validation error from manual input before cycling
//           if (sendAmountError?.includes("Amount must be")) {
//             setSendAmountError(null);
//           }
//         } else {
//           console.warn(
//             "Skipping auto-cycle amount as it exceeds limit:",
//             nextAmount
//           );
//           // Optionally stop cycling or just skip this value
//           // stopAutoCycling(); // Uncomment to stop if a cycle value is too high
//         }
//         return nextIndex;
//       });
//     };
//     if (cycleTimerRef.current) {
//       clearInterval(cycleTimerRef.current);
//       cycleTimerRef.current = null;
//     }
//     if (isAutoCycling && !isLoading && !authLoading && ourRate !== null) {
//       if (currentCycleIndex === -1) {
//         setTimeout(performCycle, 200); // Slightly delay first cycle
//       }
//       cycleTimerRef.current = setInterval(performCycle, CYCLE_DELAY);
//     }
//     return () => {
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//       }
//     };
//   }, [
//     isAutoCycling,
//     isLoading,
//     authLoading,
//     ourRate,
//     currentCycleIndex,
//     sendAmountError, // Depend on error to clear it during cycling if needed
//     // stopAutoCycling // Removed stopAutoCycling from deps array
//   ]);

//   // --- Input Handlers ---
//   const handleSendAmountChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       stopAutoCycling();
//       const rawValue = event.target.value;
//       // Allow empty string, otherwise sanitize
//       const sanitizedAmount =
//         rawValue === ""
//           ? ""
//           : rawValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

//       // If sanitized is empty, set it and return
//       if (sanitizedAmount === "") {
//         setSendAmount("");
//         if (sendAmountError?.includes("Amount must be")) {
//           setSendAmountError(null); // Clear error if field is emptied
//         }
//         return;
//       }

//       // Check against MAX_SEND_AMOUNT
//       const numericValue = parseFloat(sanitizedAmount);

//       if (!isNaN(numericValue) && numericValue > MAX_SEND_AMOUNT) {
//         // If entered value exceeds max, cap it at MAX_SEND_AMOUNT
//         setSendAmount(MAX_SEND_AMOUNT.toString());
//         // Optionally set error briefly or just prevent going higher
//         setSendAmountError(`Maximum amount is ${selectedSendCurrency} ${MAX_SEND_AMOUNT}.`);
//       } else if (!isNaN(numericValue)) {
//         // If valid and within limits, update the state
//         setSendAmount(sanitizedAmount);
//         if (sendAmountError?.includes("Amount must be")) {
//           setSendAmountError(null); // Clear error if value becomes valid
//         }
//       } else {
//         // Handle cases like ".." or just "." after sanitizing - treat as invalid for numeric check but keep input state
//         setSendAmount(sanitizedAmount); // Keep the sanitized string (e.g., allows typing '.')
//         if (sendAmountError?.includes("Amount must be")) {
//           setSendAmountError(null); // Clear max amount error if input becomes non-numeric temporarily
//         }
//       }
//     },
//     [stopAutoCycling, selectedSendCurrency, sendAmountError] // Added sendAmountError
//   );

//   const handleSendAmountFocus = useCallback(() => {
//     stopAutoCycling();
//   }, [stopAutoCycling]);

//   const handleSendAmountKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (event.key === "ArrowUp" || event.key === "ArrowDown") {
//         stopAutoCycling();
//         event.preventDefault();
//         const currentValue = parseFloat(sendAmount.replace(/,/g, "") || "0");
//         let newValue: number;

//         if (event.key === "ArrowUp") {
//           newValue = currentValue + 1;
//           // Prevent going over MAX_SEND_AMOUNT
//           if (newValue > MAX_SEND_AMOUNT) {
//             newValue = MAX_SEND_AMOUNT;
//             // Optionally set error briefly
//             // setSendAmountError(`Maximum amount is ${selectedSendCurrency} ${MAX_SEND_AMOUNT}.`);
//           } else {
//             if (sendAmountError?.includes("Amount must be")) {
//               setSendAmountError(null); // Clear error if brought back in range
//             }
//           }
//         } else {
//           // ArrowDown
//           newValue = Math.max(0, currentValue - 1);
//           if (sendAmountError?.includes("Amount must be")) {
//             setSendAmountError(null); // Clear error if brought back in range
//           }
//         }
//         setSendAmount(newValue.toString());
//       }
//     },
//     [
//       sendAmount,
//       setSendAmount,
//       stopAutoCycling,
//       selectedSendCurrency,
//       sendAmountError,
//     ] // Added sendAmountError
//   );

//   const handleCurrencyChange = useCallback(
//     (newCurrency: string) => {
//       console.log("HeroSection: Currency changed to:", newCurrency);
//       setSelectedSendCurrency(newCurrency);
//       setSendAmount("");
//       setReceiveAmount("");
//       setMarketRate(null);
//       setOurRate(null);
//       setRateAdjustment(0);
//       setError(null);
//       setSendAmountError(null); // Clear validation error on currency change
//       setWiseFeePercentage(0);
//       setBankTransferFeeAmount(0);
//       setOurFeeAmount(0);
//       setIsAutoCycling(true);
//       setCurrentCycleIndex(-1);
//       if (cycleTimerRef.current) {
//         clearInterval(cycleTimerRef.current);
//         cycleTimerRef.current = null;
//       }
//     },
//     [setSelectedSendCurrency]
//   );

//   // --- Display Logic ---
//   const displayOurRate = useMemo(() => {
//     if (error && !error.startsWith("Rate unavailable"))
//       return "Rate unavailable";
//     if (error && error.startsWith("Rate unavailable") && !ourRate)
//       return "Rate unavailable";
//     if (ourRate === null && selectedSendCurrency && !error && !isLoading)
//       return "Calculating...";
//     if (ourRate === null) return "Select currency";
//     return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

//   const displayMarketRate = useMemo(() => {
//     if (error || marketRate === null) return null;
//     return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
//       2
//     )} ${receiveCurrencyCode}`;
//   }, [error, marketRate, selectedSendCurrency, receiveCurrencyCode]);

//   const savingsAmount = useMemo(() => {
//     if (sendAmountError) return null; // Don't show savings if there's an input validation error
//     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//     if (
//       numericSendAmount <= 0 ||
//       marketRate === null ||
//       ourRate === null ||
//       numericSendAmount > MAX_SEND_AMOUNT
//     )
//       return null; // Added check for > MAX_SEND_AMOUNT
//     if (ourRate <= marketRate) return null;
//     const numericReceiveAmount = parseFloat(receiveAmount) || 0;
//     if (numericReceiveAmount <= 0) return null;
//     const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
//     const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
//     if (amountToSendAfterFees <= 0) return null;
//     const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
//     const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;
//     if (rateDifferenceValue <= 0.01) return null;
//     return rateDifferenceValue.toFixed(2);
//   }, [
//     sendAmount,
//     receiveAmount,
//     marketRate,
//     ourRate,
//     bankTransferFeeAmount,
//     ourFeeAmount,
//     sendAmountError, // Keep dependency
//   ]);

//   // --- Framer Motion Variants ---
//   const variants = {
//     hiddenLeft: { opacity: 0, x: -100 },
//     hiddenRight: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };
//   const numberChangeVariants = {
//     initial: { opacity: 0, y: -10 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
//   };
//   const savingsBannerVariants = {
//     hidden: { opacity: 0, y: -10, scaleY: 0.9, height: 0 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scaleY: 1,
//       height: "auto",
//       transition: {
//         duration: 0.4,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         height: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: -15,
//       scaleY: 0.95,
//       height: 0,
//       transition: {
//         duration: 0.35,
//         ease: "easeIn",
//         height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
//       },
//     },
//   };
//   const errorVariants = {
//     hidden: { opacity: 0, y: -10, height: 0 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       height: "auto",
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: {
//       opacity: 0,
//       y: -5,
//       height: 0,
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };

//   // --- JSX Render ---
//   return (
//     <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col items-center lg:flex-row gap-6">
//           {/* Left Column */}
//           <motion.div
//             className="lg:w-1/2 space-y-5"
//             initial="hiddenLeft"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//           >
//             <HeroText />
//           </motion.div>

//           {/* Right Column: Calculator Card */}
//           <motion.div
//             className="lg:w-xl lg:ml-auto w-full max-w-lg"
//             initial="hiddenRight"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={variants}
//             transition={{ delay: 0.15, ...variants.visible.transition }}
//           >
//             <div className="bg-white dark:bg-background border rounded-2xl text-mainheading font-medium lg:p-6 p-4">
//               {/* Loading Skeleton */}
//               {(isLoading || authLoading) && (
//                 <div className="space-y-6 animate-pulse">
//                   {/* Skeleton structure */}
//                   <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
//                     <Skeleton className="lg:h-10 h-6 w-68 rounded-full" />
//                     <Skeleton className="lg:h-8 h-6 w-64 rounded-full" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
//                   </div>
//                   <div className="border rounded-xl p-4 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-2/5" />
//                       <Skeleton className="h-4 w-1/4" />
//                     </div>
//                     <Skeleton className="h-px w-full my-2" />
//                     <div className="flex justify-between items-center">
//                       <Skeleton className="h-5 w-1/3" />
//                       <Skeleton className="h-5 w-1/4" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-1/2" />
//                   <div className="mt-6">
//                     <Skeleton className="h-12 w-full rounded-full" />
//                   </div>
//                 </div>
//               )}

//               {/* Loaded Content */}
//               {!isLoading && !authLoading && (
//                 <>
//                   {/* Rate Display */}
//                   <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
//                     {/* General API/Rate Error Display */}
//                     {error && !error.startsWith("Rate unavailable") && (
//                       <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
//                         <IoIosInformationCircleOutline size={24} /> Error:{" "}
//                         {error}
//                       </div>
//                     )}

//                     {/* Our Rate */}
//                     {!error || error.startsWith("Rate unavailable") ? (
//                       ourRate !== null ? (
//                         <Tooltip>
//                           <TooltipTrigger>
//                             <div className="font-semibold p-1.5 px-5 rounded-full bg-primary text-mainheading flex items-center gap-1.5 cursor-default">
//                               <FaLock size={16} /> Our Rate: {displayOurRate}
//                             </div>
//                           </TooltipTrigger>
//                           <TooltipContent
//                             side="bottom"
//                             sideOffset={5}
//                             className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-60 xl:max-w-lg"
//                           >
//                             <p className="font-medium dark:text-white text-neutral-900 text-xs">
//                               Rate includes Our Rate of{" "}
//                               {rateAdjustment.toFixed(2)}%. This is the rate
//                               applied to your transfer.
//                             </p>
//                           </TooltipContent>
//                         </Tooltip>
//                       ) : selectedSendCurrency ? (
//                         <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//                           Calculating rate...
//                         </div>
//                       ) : (
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           Select sending currency
//                         </div>
//                       )
//                     ) : null}

//                     {/* Market Rate */}
//                     {displayMarketRate && !error && (
//                       <Tooltip>
//                         <TooltipTrigger>
//                           <div className="font-medium text-sm p-1.5 px-4 rounded-full bg-lightgray dark:bg-primarybox text-mainheading dark:text-white inline-flex items-center gap-1.5 cursor-help">
//                             <FaInfoCircle size={16} /> Market Rate:{" "}
//                             {displayMarketRate}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-50 xl:max-w-lg"
//                         >
//                           <p className="font-medium dark:text-white text-neutral-900 text-xs">
//                             Current mid-market rate. For comparison purposes
//                             only.
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                   </div>

//                   {/* Savings Banner */}
//                   <AnimatePresence>
//                     {savingsAmount && !sendAmountError && (
//                       <motion.div
//                         key="savings-banner"
//                         className="mb-6 overflow-hidden"
//                         variants={savingsBannerVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                       >
//                         <div className="bg-lightgray dark:bg-primarybox rounded-xl lg:p-4 p-3 border-l-4 border-primary">
//                           <div className="flex items-center gap-2">
//                             <div className="bg-primary rounded-full p-2 flex-shrink-0">
//                               <FaPiggyBank
//                                 size={20}
//                                 className="lg:size-6 size-4 text-mainheading"
//                               />
//                             </div>
//                             <div>
//                               <p className="font-bold text-neutral-900 dark:text-primary lg:text-base text-sm flex items-center gap-1">
//                                 <span>
//                                   Save up to ₹{savingsAmount} with Wise
//                                 </span>
//                                 <TrendingUp size={18} />
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-300">
//                                 Better rates than traditional banks!
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* You Send Input */}
//                   <div className="mb-6 relative">
//                     <label
//                       htmlFor="sendAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       You send exactly
//                     </label>
//                     <div
//                       className={`w-full border rounded-xl flex items-center justify-between transition-colors duration-75 ${
//                         sendAmountError ? "border-red-700" : "" // Apply red border on error
//                       }`}
//                     >
//                       <input
//                         id="sendAmountInput"
//                         type="text" // Still text for flexibility with formatting/decimals
//                         inputMode="decimal" // Hint for mobile keyboards
//                         placeholder={isAutoCycling ? " " : "0.00"}
//                         value={sendAmount} // Controlled by state
//                         onChange={handleSendAmountChange} // Handles validation/capping
//                         onFocus={handleSendAmountFocus}
//                         onKeyDown={handleSendAmountKeyDown} // Handles arrow keys with capping
//                         className="block w-full h-16 p-3 text-mainheading dark:text-white md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-500 dark:placeholder-gray-300"
//                         disabled={isLoading || !selectedSendCurrency}
//                         aria-label="Amount to send"
//                         aria-invalid={!!sendAmountError}
//                         aria-describedby={
//                           sendAmountError ? "send-amount-error-msg" : undefined
//                         }
//                       />
//                       <div className="flex-shrink-0 h-full z-20">
//                         <CountryDropdown
//                           selectedCurrency={selectedSendCurrency}
//                           onCurrencyChange={handleCurrencyChange}
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Animated Error Message Display (Only if error exists) */}
//                     <AnimatePresence>
//                       {sendAmountError && (
//                         <motion.p
//                           id="send-amount-error-msg"
//                           key="send-amount-error"
//                           className="text-red-700 text-sm absolute left-1 -bottom-6"
//                           variants={errorVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           aria-live="assertive"
//                         >
//                           {sendAmountError}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Recipient Gets Input */}
//                   <div className="mb-6">
//                     <label
//                       htmlFor="receiveAmountInput"
//                       className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1"
//                     >
//                       Recipient gets (approx.)
//                     </label>
//                     <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5 lg:h-16 h-auto min-h-[64px] relative overflow-hidden">
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={receiveAmount || "empty"}
//                           className="absolute inset-0 flex items-center"
//                           variants={numberChangeVariants}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                         >
//                           <input
//                             id="receiveAmountInput"
//                             type="text"
//                             inputMode="decimal"
//                             placeholder="0.00"
//                             value={
//                               receiveAmount && parseFloat(receiveAmount) > 0
//                                 ? parseFloat(receiveAmount).toLocaleString(
//                                     undefined,
//                                     {
//                                       minimumFractionDigits: 2,
//                                       maximumFractionDigits: 2,
//                                     }
//                                   )
//                                 : sendAmount &&
//                                   !sendAmountError &&
//                                   parseFloat(sendAmount.replace(/,/g, "")) > 0
//                                 ? "0.00" // Show 0.00 if send amount > 0 and no error
//                                 : "" // Otherwise empty
//                             }
//                             readOnly
//                             className="block w-full h-full p-3 text-mainheading dark:text-gray-300 md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-500 dark:placeholder-gray-300 cursor-default"
//                             aria-label="Amount recipient gets"
//                           />
//                         </motion.div>
//                       </AnimatePresence>
//                       <div className="flex items-center gap-2 w-auto px-10 py-3 flex-shrink-0 z-10 ml-auto relative h-full">
//                         <Image
//                           src="/assets/icon/flags/inr.svg"
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                           className="rounded-full"
//                         />
//                         <p className="text-mainheading dark:text-gray-300 font-semibold text-sm md:text-base">
//                           INR
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Paying With */}
//                   <div className="mb-4">
//                     <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
//                       Paying with
//                     </label>
//                     <div className="p-3 h-16 border rounded-xl flex items-center justify-between text-gray-500 dark:text-gray-300">
//                       <div className="flex items-center gap-2">
//                         <CiBank size={24} />
//                         <span className="font-medium lg:text-base text-sm">
//                           Bank transfer
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fee Details */}
//                   <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-300">
//                         Bank transfer fee
//                       </span>
//                       <span className="text-gray-500 dark:text-gray-300 font-medium">
//                         {ourRate !== null &&
//                         selectedSendCurrency &&
//                         !sendAmountError // Hide if validation error
//                           ? `${bankTransferFeeAmount.toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-300">
//                         Wise fee{" "}
//                         {ourRate !== null &&
//                           selectedSendCurrency &&
//                           wiseFeePercentage > 0 &&
//                           !sendAmountError &&
//                           `(${wiseFeePercentage.toFixed(2)}%)`}
//                       </span>
//                       <span className="text-gray-500 dark:text-gray-300 font-medium">
//                         {ourRate !== null &&
//                         selectedSendCurrency &&
//                         !sendAmountError // Hide if validation error
//                           ? `${ourFeeAmount.toFixed(2)} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                     <hr className="my-2 " />
//                     <div className="flex justify-between text-gray-500 dark:text-gray-300 font-medium">
//                       <span>Total included fees</span>
//                       <span>
//                         {ourRate !== null &&
//                         selectedSendCurrency &&
//                         !sendAmountError // Hide if validation error
//                           ? `${(bankTransferFeeAmount + ourFeeAmount).toFixed(
//                               2
//                             )} ${selectedSendCurrency}`
//                           : "..."}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Arrival Info */}
//                   <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-500 dark:text-gray-300 font-medium">
//                     <p>
//                       Should arrive around{" "}
//                       <span className="text-lime-500 font-bold">
//                         {arrivalDate || "..."}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Conditional Action Button */}
//                   <div className="mt-6">
//                     {user ? (
//                       <Link href="/send-money" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center justify-center px-8 lg:py-3 py-2.5 h-12.5 border border-transparent capitalize cursor-pointer font-medium rounded-full text-mainheading bg-primary hover:bg-primaryhover transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !!sendAmountError || // Disable on validation error
//                             !sendAmount || // Disable if empty
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 || // Disable if 0 or less
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               (!receiveAmount || receiveAmount === "0.00")) // Disable if sending > 0 but receiving 0 (e.g., fees > amount)
//                           }
//                           aria-disabled={
//                             isLoading ||
//                             authLoading ||
//                             !ourRate ||
//                             !!error ||
//                             !!sendAmountError ||
//                             !sendAmount ||
//                             parseFloat(sendAmount.replace(/,/g, "")) <= 0 ||
//                             (parseFloat(sendAmount.replace(/,/g, "")) > 0 &&
//                               (!receiveAmount || receiveAmount === "0.00"))
//                           }
//                         >
//                           Send money
//                         </button>
//                       </Link>
//                     ) : (
//                       <Link href="/auth/register" passHref>
//                         <button
//                           type="button"
//                           className="w-full inline-flex items-center lg:text-base justify-center px-8 lg:py-3 py-2.5 h-12.5 border capitalize border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isLoading || authLoading}
//                           aria-disabled={isLoading || authLoading}
//                         >
//                           Create A Free Account
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// app/(website)/components/Hero/HeroSection.tsx
"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiBank } from "react-icons/ci";
import { FaLock, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountryDropdown from "../../../components/ui/CountryDropdown"; // Adjust path if needed
import HeroText from "./HeroText"; // Adjust path if needed
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Adjust path if needed
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
import exchangeRateService from "../../../services/exchangeRate"; // Adjust path if needed
import currencyService, { Currency } from "../../../services/currency"; // Adjust path if needed
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Adjust path as needed

// Interface for the raw rates object received from the API
interface RawExchangeRates {
  [key: string]: number | string;
}

// --- Constants ---
const CYCLE_AMOUNTS = ["100", "300", "500", "700", "1000"];
const CYCLE_DELAY = 2500;
const MAX_SEND_AMOUNT = 50000; // Define the maximum allowed amount

const HeroSection: React.FC = () => {
  // --- Contexts ---
  const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
  const { user, loading: authLoading } = useAuth();

  // --- State Declarations ---
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const receiveCurrencyCode = "INR";

  // State for fetched data
  const [rawRates, setRawRates] = useState<RawExchangeRates | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  // State for calculated rates & adjustments
  const [marketRate, setMarketRate] = useState<number | null>(null);
  const [ourRate, setOurRate] = useState<number | null>(null);
  const [rateAdjustment, setRateAdjustment] = useState<number>(0);

  // State for calculated fees
  const [ourFeeAmount, setOurFeeAmount] = useState<number>(0);
  const [bankTransferFeeAmount, setBankTransferFeeAmount] = useState<number>(0);
  const [wiseFeePercentage, setWiseFeePercentage] = useState<number>(0);

  // Operational State
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null); // For API/rate errors
  const [sendAmountError, setSendAmountError] = useState<string | null>(null); // Specific validation error for send amount input

  // Arrival Date
  const [arrivalDate, setArrivalDate] = useState<string | null>(null);

  // --- Auto-Cycling State ---
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(-1);
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Helper Function to Stop Cycling ---
  const stopAutoCycling = useCallback(() => {
    if (isAutoCycling) {
      setIsAutoCycling(false);
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    }
  }, [isAutoCycling]);

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchInitialData = async () => {
      console.log("HeroSection: Fetching initial data...");
      setIsLoading(true);
      setApiError(null);
      setSendAmountError(null);
      setRawRates(null);
      setCurrencies([]);
      setMarketRate(null);
      setOurRate(null);
      setRateAdjustment(0);
      setOurFeeAmount(0);
      setBankTransferFeeAmount(0);
      setWiseFeePercentage(0);
      setReceiveAmount("");
      setSendAmount("");
      setIsAutoCycling(true);
      setCurrentCycleIndex(-1);
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);

      try {
        const [ratesResponse, currenciesResponse] = await Promise.all([
          exchangeRateService.getExchangeRatesForCurrencies(),
          currencyService.getAllCurrencies(true),
        ]);
        if (
          ratesResponse?.rates &&
          typeof ratesResponse.rates === "object" &&
          Object.keys(ratesResponse.rates).length > 0
        ) {
          setRawRates(ratesResponse.rates);
        } else {
          throw new Error("Could not load rates.");
        }
        if (Array.isArray(currenciesResponse)) {
          setCurrencies(currenciesResponse);
        } else {
          throw new Error("Could not load currencies.");
        }
      } catch (err: any) {
        console.error("HeroSection: Error fetching initial data:", err);
        setApiError(err.message || "Failed to load data.");
        setRawRates(null);
        setCurrencies([]);
      } finally {
        setIsLoading(false);
        console.log("HeroSection: Initial data fetch complete.");
      }
    };
    fetchInitialData();
    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Rate and Fee Calculation Effect ---
  useEffect(() => {
    if (
      isLoading ||
      !rawRates ||
      currencies.length === 0 ||
      !selectedSendCurrency
    ) {
      if (!isLoading && (!rawRates || currencies.length === 0)) {
        setMarketRate(null);
        setOurRate(null);
        setRateAdjustment(0);
        setWiseFeePercentage(0);
        setBankTransferFeeAmount(0);
      }
      return;
    }
    try {
      let rawRateSelectedValue = rawRates[selectedSendCurrency];
      let rawRateINRValue = rawRates[receiveCurrencyCode];
      const rateBaseToSelected =
        typeof rawRateSelectedValue === "string"
          ? parseFloat(rawRateSelectedValue)
          : typeof rawRateSelectedValue === "number"
          ? rawRateSelectedValue
          : NaN;
      const rateBaseToINR =
        typeof rawRateINRValue === "string"
          ? parseFloat(rawRateINRValue)
          : typeof rawRateINRValue === "number"
          ? rawRateINRValue
          : NaN;
      if (
        isNaN(rateBaseToSelected) ||
        isNaN(rateBaseToINR) ||
        rateBaseToSelected === 0
      ) {
        throw new Error(`Rate unavailable/invalid for ${selectedSendCurrency}`);
      }
      const calculatedMarketRate = rateBaseToINR / rateBaseToSelected;
      setMarketRate(parseFloat(calculatedMarketRate.toFixed(2)));
      const sendingCurrencyDetails = currencies.find(
        (c) => c.code === selectedSendCurrency
      );
      const adjustmentPercent =
        sendingCurrencyDetails?.rateAdjustmentPercentage ?? 0;
      const fetchedWiseFeePercent =
        sendingCurrencyDetails?.wiseFeePercentage ?? 0;
      const fetchedBankFee =
        parseFloat(String(sendingCurrencyDetails?.bankTransferFee ?? 0)) || 0;
      setRateAdjustment(adjustmentPercent);
      setWiseFeePercentage(fetchedWiseFeePercent);
      setBankTransferFeeAmount(fetchedBankFee);
      const calculatedOurRate =
        calculatedMarketRate * (1 + adjustmentPercent / 100);
      setOurRate(parseFloat(calculatedOurRate.toFixed(2)));

      if (apiError?.startsWith("Rate unavailable")) {
        setApiError(null);
      }
    } catch (err: any) {
      console.error("HeroSection: Error calculating rates/fees:", err);
      setApiError(
        err.message || `Could not calculate rates for ${selectedSendCurrency}.`
      );
      setMarketRate(null);
      setOurRate(null);
      setRateAdjustment(0);
      setWiseFeePercentage(0);
      setBankTransferFeeAmount(0);
      setOurFeeAmount(0);
      setReceiveAmount("");
    }
  }, [
    selectedSendCurrency,
    rawRates,
    currencies,
    isLoading,
    receiveCurrencyCode,
    apiError,
  ]);

  // --- Receive Amount & Fee Calculation Effect (Based on validated sendAmount) ---
  useEffect(() => {
    // If there's a validation error on send amount, reset receive amount/fees
    if (sendAmountError) {
      setReceiveAmount("");
      setOurFeeAmount(0);
      return;
    }

    // If rates aren't ready or there's an API error, reset
    if (ourRate === null || apiError) {
      setReceiveAmount(sendAmount === "" ? "" : "0.00");
      setOurFeeAmount(0);
      return;
    }

    const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
    let calculatedReceive = 0;
    let calculatedOurFee = 0;

    if (numericSendAmount > 0 && !isNaN(ourRate)) {
      calculatedOurFee = numericSendAmount * (wiseFeePercentage / 100);
      const roundedOurFee = parseFloat(calculatedOurFee.toFixed(2));
      setOurFeeAmount(roundedOurFee);

      const totalFeesDeducted = bankTransferFeeAmount + roundedOurFee;
      const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;

      if (amountToSendAfterFees > 0) {
        calculatedReceive = amountToSendAfterFees * ourRate;
        setReceiveAmount(calculatedReceive.toFixed(2));
      } else {
        setReceiveAmount("0.00");
      }
    } else {
      setOurFeeAmount(0);
      setReceiveAmount(sendAmount === "" ? "" : "0.00");
    }
  }, [
    sendAmount,
    ourRate,
    wiseFeePercentage,
    bankTransferFeeAmount,
    sendAmountError, // Added dependency
    apiError, // Added dependency
  ]);

  // --- Arrival Date Effect ---
  useEffect(() => {
    const calculateArrivalDate = () => {
      const today = new Date();
      const arrival = new Date(today);
      let daysToAdd = 2;
      let addedDays = 0;
      while (addedDays < daysToAdd) {
        arrival.setDate(arrival.getDate() + 1);
        const dayOfWeek = arrival.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          addedDays++;
        }
      }
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      setArrivalDate(arrival.toLocaleDateString(undefined, options));
    };
    calculateArrivalDate();
  }, []);

  // --- Auto-Cycle Effect ---
  useEffect(() => {
    const performCycle = () => {
      if (!isAutoCycling || isLoading || authLoading || !ourRate || apiError) {
        if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
        return;
      }

      setCurrentCycleIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % CYCLE_AMOUNTS.length;
        const nextAmountStr = CYCLE_AMOUNTS[nextIndex];
        const nextAmount = parseFloat(nextAmountStr);

        if (nextAmount <= MAX_SEND_AMOUNT) {
          setSendAmount(nextAmountStr);
          setSendAmountError(null); // Clear validation error when cycling
        } else {
          console.warn(
            `HeroSection: Auto-cycle amount ${nextAmountStr} exceeds limit ${MAX_SEND_AMOUNT}. Skipping.`
          );
        }
        return nextIndex;
      });
    };

    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }

    if (
      isAutoCycling &&
      !isLoading &&
      !authLoading &&
      ourRate !== null &&
      !apiError
    ) {
      const initialDelay = currentCycleIndex === -1 ? 300 : CYCLE_DELAY;
      cycleTimerRef.current = setTimeout(() => {
        performCycle();
        if (
          isAutoCycling &&
          !isLoading &&
          !authLoading &&
          ourRate !== null &&
          !apiError
        ) {
          cycleTimerRef.current = setInterval(performCycle, CYCLE_DELAY);
        }
      }, initialDelay);
    }

    return () => {
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
      }
    };
  }, [
    isAutoCycling,
    isLoading,
    authLoading,
    ourRate,
    currentCycleIndex,
    apiError,
    selectedSendCurrency, // Re-evaluate cycling on currency change
    // Removed stopAutoCycling from deps
  ]);

  // --- Input Handlers ---
  const handleSendAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      stopAutoCycling();
      const rawValue = event.target.value;
      const sanitizedAmount =
        rawValue === ""
          ? ""
          : rawValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

      if (sanitizedAmount === "") {
        setSendAmount("");
        setSendAmountError(null); // Clear error when input is empty
        return;
      }

      const numericValue = parseFloat(sanitizedAmount);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_SEND_AMOUNT) {
          setSendAmountError(
            `Maximum amount is ${
              selectedSendCurrency || ""
            } ${MAX_SEND_AMOUNT.toLocaleString()}`
          );
          setSendAmount(MAX_SEND_AMOUNT.toString()); // Cap the value shown
        } else {
          setSendAmount(sanitizedAmount);
          setSendAmountError(null); // Clear error if input is now valid
        }
      } else {
        setSendAmount(sanitizedAmount); // Allow temporary invalid states like "."
        setSendAmountError(null); // Clear max amount error if input becomes non-numeric temporarily
      }
    },
    [stopAutoCycling, selectedSendCurrency] // Dependencies
  );

  const handleSendAmountFocus = useCallback(() => {
    stopAutoCycling();
  }, [stopAutoCycling]);

  const handleSendAmountKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        stopAutoCycling();
        event.preventDefault();

        const currentValue = parseFloat(sendAmount.replace(/,/g, "")) || 0;
        let newValue: number;

        if (event.key === "ArrowUp") {
          newValue = Math.min(currentValue + 1, MAX_SEND_AMOUNT); // Cap at max
          if (newValue <= MAX_SEND_AMOUNT) {
            // Clear error if result is valid
            setSendAmountError(null);
          }
        } else {
          // ArrowDown
          newValue = Math.max(0, currentValue - 1);
          setSendAmountError(null); // Clear error when decreasing
        }
        setSendAmount(newValue.toString());
      }
    },
    [sendAmount, stopAutoCycling] // Dependencies
  );

  const handleCurrencyChange = useCallback(
    (newCurrency: string) => {
      console.log("HeroSection: Currency changed to:", newCurrency);
      stopAutoCycling();
      setSelectedSendCurrency(newCurrency);
      setSendAmount("");
      setReceiveAmount("");
      setMarketRate(null);
      setOurRate(null);
      setRateAdjustment(0);
      setApiError(null); // Clear API error
      setSendAmountError(null); // Clear validation error
      setWiseFeePercentage(0);
      setBankTransferFeeAmount(0);
      setOurFeeAmount(0);
      setCurrentCycleIndex(-1); // Reset cycle
      setIsAutoCycling(true); // Re-enable cycle
    },
    [setSelectedSendCurrency, stopAutoCycling] // Dependencies
  );

  // --- Display Logic ---
  const displayOurRate = useMemo(() => {
    // Keep original display logic structure
    if (apiError && !apiError.startsWith("Rate unavailable"))
      return "Rate unavailable";
    if (apiError && apiError.startsWith("Rate unavailable") && !ourRate)
      return "Rate unavailable";
    if (ourRate === null && selectedSendCurrency && !apiError && !isLoading)
      return "Calculating...";
    if (ourRate === null || !selectedSendCurrency) return "Select currency";
    return `1 ${selectedSendCurrency} = ${ourRate.toFixed(
      2
    )} ${receiveCurrencyCode}`;
  }, [apiError, ourRate, selectedSendCurrency, receiveCurrencyCode, isLoading]);

  const displayMarketRate = useMemo(() => {
    if (apiError || marketRate === null || !selectedSendCurrency) return null;
    return `1 ${selectedSendCurrency} ≈ ${marketRate.toFixed(
      2
    )} ${receiveCurrencyCode}`;
  }, [apiError, marketRate, selectedSendCurrency, receiveCurrencyCode]);

  const savingsAmount = useMemo(() => {
    // Add checks for errors
    if (sendAmountError || apiError || marketRate === null || ourRate === null)
      return null;

    const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
    // Keep original checks + MAX_SEND_AMOUNT + rate comparison
    if (
      numericSendAmount <= 0 ||
      numericSendAmount > MAX_SEND_AMOUNT ||
      ourRate <= marketRate
    )
      return null;

    const numericReceiveAmount = parseFloat(receiveAmount) || 0;
    if (numericReceiveAmount <= 0) return null;

    const totalFeesDeducted = bankTransferFeeAmount + ourFeeAmount;
    const amountToSendAfterFees = numericSendAmount - totalFeesDeducted;
    if (amountToSendAfterFees <= 0) return null;

    const marketConvertedAfterFees = amountToSendAfterFees * marketRate;
    const rateDifferenceValue = numericReceiveAmount - marketConvertedAfterFees;

    if (rateDifferenceValue <= 0.01) return null;
    return rateDifferenceValue.toFixed(2);
  }, [
    sendAmount,
    receiveAmount,
    marketRate,
    ourRate,
    bankTransferFeeAmount,
    ourFeeAmount,
    sendAmountError, // Added dependency
    apiError, // Added dependency
  ]);

  // --- Framer Motion Variants ---
  // Keep original variants
  const variants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const numberChangeVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
  };
  const savingsBannerVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0.9, height: 0, marginBottom: 0 }, // Add marginBottom: 0
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      height: "auto",
      marginBottom: "1.5rem", // Corresponds to mb-6
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
        marginBottom: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 }, // Animate margin
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      scaleY: 0.95,
      height: 0,
      marginBottom: 0, // Animate margin back to 0
      transition: {
        duration: 0.35,
        ease: "easeIn",
        height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
        marginBottom: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }, // Animate margin
      },
    },
  };
  const errorVariants = {
    // Variant for the validation error message
    hidden: { opacity: 0, y: -10, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      marginTop: "0.35rem", // Small space below input
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      marginTop: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // --- JSX Render ---
  // Use the original JSX structure and class names
  return (
    <section className="Hero-Section bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row gap-6">
          {/* Left Column */}
          <motion.div
            className="lg:w-1/2 space-y-5"
            initial="hiddenLeft"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
          >
            <HeroText />
          </motion.div>

          {/* Right Column: Calculator Card */}
          <motion.div
            className="lg:w-xl lg:ml-auto w-full max-w-lg" // Original classes
            initial="hiddenRight"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
            transition={{ delay: 0.15, ...variants.visible.transition }}
          >
            {/* Original Card Styling */}
            <div className="bg-white dark:bg-background border rounded-2xl text-mainheading font-medium lg:p-6 p-4">
              {/* Loading Skeleton (Original Structure) */}
              {(isLoading || authLoading) && (
                <div className="space-y-6 animate-pulse">
                  <div className="flex flex-col items-end space-y-2 mb-4 min-h-[60px]">
                    <Skeleton className="lg:h-10 h-6 w-68 rounded-full" />
                    <Skeleton className="lg:h-8 h-6 w-64 rounded-full" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="lg:h-16 h-14 w-full rounded-xl" />
                  </div>
                  <div className="border rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-2/5" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-2/5" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-px w-full my-2" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-5 w-1/4" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-6">
                    <Skeleton className="h-12 w-full rounded-full" />
                  </div>
                </div>
              )}

              {/* Loaded Content (Original Structure) */}
              {!isLoading && !authLoading && (
                <>
                  {/* Rate Display (Original Structure) */}
                  <div className="text-right mb-4 min-h-[60px] space-y-2 flex flex-col items-end">
                    {/* General API Error Display */}
                    {apiError && !apiError.startsWith("Rate unavailable") && (
                      <div className="font-medium p-2 dark:border-red-700/20 dark:border rounded-md bg-red-700/20 dark:bg-red-700/20 text-red-700 inline-flex items-center gap-1.5">
                        <IoIosInformationCircleOutline size={24} /> Error:{" "}
                        {apiError}
                      </div>
                    )}

                    {/* Our Rate (Original Structure) */}
                    {!apiError || apiError.startsWith("Rate unavailable") ? (
                      ourRate !== null ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="font-semibold p-1.5 px-5 rounded-full bg-primary text-mainheading flex items-center gap-1.5 cursor-default">
                              {" "}
                              {/* Original classes */}
                              <FaLock size={16} /> Our Rate: {displayOurRate}
                            </div>
                          </TooltipTrigger>

                          <TooltipContent
                            side="bottom"
                            sideOffset={5}
                            className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-60 xl:max-w-lg" // Original classes
                          >
                            <p className="font-medium dark:text-white text-neutral-900 text-xs">
                              {" "}
                              {/* Original classes */}
                              Rate includes Our Rate of{" "}
                              {rateAdjustment.toFixed(2)}%. This is the rate
                              applied to your transfer.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        
                      ) : selectedSendCurrency ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                          {" "}
                          {/* Original classes */}
                          Calculating rate...
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {" "}
                          {/* Original classes */}
                          Select sending currency
                        </div>
                      )
                    ) : null}

                    {/* Market Rate (Original Structure) */}
                    {displayMarketRate && ( // Use displayMarketRate which includes !apiError check
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="font-medium text-sm p-1.5 px-4 rounded-full bg-lightgray dark:bg-primarybox text-mainheading dark:text-white inline-flex items-center gap-1.5 cursor-help">
                            {" "}
                            {/* Original classes */}
                            <FaInfoCircle size={16} /> Market Rate:{" "}
                            {displayMarketRate}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          sideOffset={5}
                          className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-50 xl:max-w-lg" // Original classes
                        >
                          <p className="font-medium dark:text-white text-neutral-900 text-xs">
                            {" "}
                            {/* Original classes */}
                            Current mid-market rate. For comparison purposes
                            only.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  {/* Savings Banner (Original Structure + Animation) */}
                  <AnimatePresence>
                    {savingsAmount && ( // Use savingsAmount which includes error checks
                      <motion.div
                        key="savings-banner"
                        className="overflow-hidden" // mb-6 is applied by variant
                        variants={savingsBannerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {/* Original Savings Banner Structure */}
                        <div className="bg-lightgray dark:bg-primarybox rounded-xl lg:p-4 p-3 border-l-4 border-primary">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary rounded-full p-2 flex-shrink-0">
                              <FaPiggyBank
                                size={20}
                                className="lg:size-6 size-4 text-mainheading" // Original classes
                              />
                            </div>
                            <div>
                              <p className="font-bold text-neutral-900 dark:text-primary lg:text-base text-sm flex items-center gap-1">
                                {" "}
                                {/* Original classes */}
                                <span>
                                  Save up to ₹{savingsAmount} with Wise
                                </span>
                                <TrendingUp size={18} />
                              </p>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                {" "}
                                {/* Original classes */}
                                Better rates than traditional banks!
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* You Send Input (Original Structure + Error Handling) */}
                  <div className="mb-6 relative">
                    {/* Added relative positioning for error message */}
                    <label
                      htmlFor="sendAmountInput"
                      className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1" // Original classes
                    >
                      You send exactly
                    </label>
                    {/* Container Div for Input and Dropdown - Apply Error Border Here */}
                    <div
                      className={`w-full border rounded-xl flex items-center justify-between transition-colors duration-150 ease-in-out ${
                        sendAmountError
                          ? "border-red-600 dark:border-red-500"
                          : "" // Original default border, conditional red border
                      }`}
                    >
                      <input
                        id="sendAmountInput"
                        type="text"
                        inputMode="decimal"
                        placeholder={isAutoCycling ? " " : "0.00"} // Original placeholder logic
                        value={sendAmount}
                        onChange={handleSendAmountChange}
                        onFocus={handleSendAmountFocus}
                        onKeyDown={handleSendAmountKeyDown}
                        className="block w-full h-16 p-3 text-mainheading dark:text-white md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl transition-all ease-linear duration-75 placeholder-gray-500 dark:placeholder-gray-300" // Original classes
                        disabled={
                          isLoading || !selectedSendCurrency || !!apiError
                        } // Added apiError disable
                        aria-label="Amount to send"
                        aria-invalid={!!sendAmountError}
                        aria-describedby={
                          sendAmountError ? "send-amount-error-msg" : undefined
                        }
                      />
                      <div className="flex-shrink-0 h-full z-20">
                        {" "}
                        {/* z-10 was z-20, adjusted based on original */}
                        <CountryDropdown
                          selectedCurrency={selectedSendCurrency}
                          onCurrencyChange={handleCurrencyChange}
                          disabled={isLoading || !!apiError} // Added apiError disable
                        />
                      </div>
                    </div>
                    {/* Animated Error Message Display (Positioned below input) */}
                    <AnimatePresence>
                      {sendAmountError && (
                        <motion.p
                          id="send-amount-error-msg"
                          key="send-amount-error"
                          className="text-red-600 dark:text-red-500 text-xs font-medium absolute left-1 flex items-center gap-1" // Adjusted styling for error message
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          aria-live="polite" // Changed from assertive
                        >
                          <IoIosInformationCircleOutline
                            className="flex-shrink-0"
                            size={14}
                          />{" "}
                          {sendAmountError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Recipient Gets Input (Original Structure + Animation) */}
                  <div className="mb-6">
                    <label
                      htmlFor="receiveAmountInput"
                      className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1" // Original classes
                    >
                      Recipient gets (approx.)
                    </label>
                    {/* Original Container */}
                    <div className="w-full rounded-xl flex items-center justify-between bg-lightgray dark:bg-white/5 lg:h-16 h-auto min-h-[64px] relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={receiveAmount || "empty"}
                          className="absolute inset-0 flex items-center"
                          variants={numberChangeVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <input
                            id="receiveAmountInput"
                            type="text"
                            inputMode="decimal" // Although readonly, keep for consistency
                            placeholder="0.00" // Original placeholder
                            value={
                              // Logic to show formatted amount, 0.00, or empty based on state and errors
                              receiveAmount && parseFloat(receiveAmount) > 0
                                ? parseFloat(receiveAmount).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )
                                : sendAmount &&
                                  !sendAmountError &&
                                  !apiError &&
                                  parseFloat(sendAmount.replace(/,/g, "")) > 0
                                ? "0.00" // Show 0.00 if sending > 0 and no errors
                                : "" // Otherwise empty
                            }
                            readOnly
                            className="block w-full h-full p-3 text-mainheading dark:text-gray-300 md:text-2xl text-xl font-bold focus:outline-none bg-transparent rounded-l-xl placeholder-gray-500 dark:placeholder-gray-300 cursor-default" // Original classes
                            aria-label="Amount recipient gets"
                          />
                        </motion.div>
                      </AnimatePresence>
                      {/* Original Flag/Label */}
                      <div className="flex items-center gap-2 w-auto px-10 py-3 flex-shrink-0 z-10 ml-auto relative h-full">
                        {" "}
                        {/* z-10 was default */}
                        <Image
                          src="/assets/icon/flags/inr.svg" // Ensure path is correct
                          alt="INR-Flag"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <p className="text-mainheading dark:text-gray-300 font-semibold text-sm md:text-base">
                          {" "}
                          {/* Original classes */}
                          INR
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Paying With (Original Structure) */}
                  <div className="mb-4">
                    <label className="block text-gray-500 lg:text-base text-sm dark:text-gray-300 mb-1">
                      {" "}
                      {/* Original classes */}
                      Paying with
                    </label>
                    <div className="p-3 h-16 border rounded-xl flex items-center justify-between text-gray-500 dark:text-gray-300">
                      {" "}
                      {/* Original classes */}
                      <div className="flex items-center gap-2">
                        <CiBank size={24} />
                        <span className="font-medium lg:text-base text-sm">
                          {" "}
                          {/* Original classes */}
                          Bank transfer
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fee Details (Original Structure + Error Logic) */}
                  <div className="lg:text-sm text-xs border rounded-xl lg:p-4 p-3 space-y-2.5">
                    {" "}
                    {/* Original classes */}
                    {/* Helper function to conditionally display fees */}
                    {(() => {
                      const showFees =
                        ourRate !== null &&
                        selectedSendCurrency &&
                        !sendAmountError &&
                        !apiError;
                      const feePlaceholder = "...";
                      const totalFees = bankTransferFeeAmount + ourFeeAmount;
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-300">
                              Bank transfer fee
                            </span>
                            <span className="text-gray-500 dark:text-gray-300 font-medium">
                              {" "}
                              {/* Original classes */}
                              {showFees
                                ? `${bankTransferFeeAmount.toFixed(
                                    2
                                  )} ${selectedSendCurrency}`
                                : feePlaceholder}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-300">
                              Wise fee{" "}
                              {showFees &&
                                wiseFeePercentage > 0 &&
                                `(${wiseFeePercentage.toFixed(2)}%)`}
                            </span>
                            <span className="text-gray-500 dark:text-gray-300 font-medium">
                              {" "}
                              {/* Original classes */}
                              {showFees
                                ? `${ourFeeAmount.toFixed(
                                    2
                                  )} ${selectedSendCurrency}`
                                : feePlaceholder}
                            </span>
                          </div>
                          <hr className="my-2 border-gray-200 dark:border-gray-700" />{" "}
                          {/* Use original hr style */}
                          <div className="flex justify-between text-gray-500 dark:text-gray-300 font-medium">
                            {" "}
                            {/* Original classes */}
                            <span>Total included fees</span>
                            <span>
                              {showFees
                                ? `${totalFees.toFixed(
                                    2
                                  )} ${selectedSendCurrency}`
                                : feePlaceholder}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Arrival Info (Original Structure) */}
                  <div className="mt-2 ml-2 lg:text-sm text-xs text-gray-500 dark:text-gray-300 font-medium">
                    {" "}
                    {/* Original classes */}
                    <p>
                      Should arrive around{" "}
                      <span className="text-lime-500 font-bold">
                        {" "}
                        {/* Original classes */}
                        {arrivalDate || "..."}
                      </span>
                    </p>
                  </div>

                  {/* Conditional Action Button (Original Structure + Updated Disable Logic) */}
                  <div className="mt-6">
                    {/* IIFE to determine button state and content */}
                    {(() => {
                      const isButtonDisabled =
                        isLoading ||
                        authLoading ||
                        !ourRate || // No rate calculated
                        !!apiError || // API error occurred
                        !!sendAmountError || // Input validation error exists <--- NEW CHECK
                        !sendAmount || // Input is empty
                        parseFloat(sendAmount.replace(/,/g, "")) <= 0 || // Input is zero or less
                        (parseFloat(sendAmount.replace(/,/g, "")) > 0 && // Sending > 0 but receiving <= 0
                          (!receiveAmount ||
                            parseFloat(receiveAmount.replace(/,/g, "")) <= 0));

                      return user ? (
                        <Link href="/send-money" passHref>
                          <button
                            type="button"
                            className="w-full inline-flex items-center justify-center px-8 lg:py-3 py-2.5 h-12.5 border border-transparent capitalize cursor-pointer font-medium rounded-full text-mainheading bg-primary hover:bg-primaryhover transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Original classes
                            disabled={isButtonDisabled} // Use calculated disabled state
                            aria-disabled={isButtonDisabled}
                          >
                            Send money
                          </button>
                        </Link>
                      ) : (
                        <Link href="/auth/register" passHref>
                          <button
                            type="button"
                            className="w-full inline-flex items-center lg:text-base justify-center px-8 lg:py-3 py-2.5 h-12.5 border capitalize border-transparent cursor-pointer hover:bg-primaryhover font-medium rounded-full text-mainheading bg-primary transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Original classes
                            disabled={isLoading || authLoading} // Original disable logic for non-logged-in user
                            aria-disabled={isLoading || authLoading}
                          >
                            Create A Free Account
                          </button>
                        </Link>
                      );
                    })()}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
