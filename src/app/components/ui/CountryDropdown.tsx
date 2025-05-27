// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// interface Currency {
//   code: string;
//   name: string;
//   flag: string; //  URL or path to the flag image
// }

// interface CountryDropdownProps {
//   selectedCurrency: Currency;
//   onCurrencyChange: (currency: Currency) => void;
//   currencies: Currency[]; //pass all currencies data
//   label?:string,
//   className?:string
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
//   currencies,
//   label,
//   className
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencySelect = (currency: Currency) => {
//     onCurrencyChange(currency);
//     setIsOpen(false);
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {/* Label (if provided) */}
//       {label && (
//           <label className="block font-medium text-main mb-1">
//             {label}
//           </label>
//         )
//       }
//       <button
//         type="button"
//         className="w-full h-16 p-3 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main"
//         onClick={toggleDropdown}
//       >
//          <div className="flex items-center gap-2 w-28">
//             <div className="flex items-center gap-2">
//               <Image
//                 src={selectedCurrency.flag}
//                 alt={`${selectedCurrency.code}-Flag`}
//                 width={24}
//                 height={24}
//               />
//               <p>{selectedCurrency.code}</p>
//             </div>
//             {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//           </div>
//       </button>

//       {/* Dropdown List */}
//       {isOpen && (
//         <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-300 overflow-y-auto max-h-72">

//           {/* Search Input (Optional, but recommended) */}
//           <div className="p-2 sticky top-0 bg-white z-10">
//             <input
//               type="text"
//               placeholder="Type a currency / country"
//               className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//                // Add onChange event handling for filtering if needed
//             />
//           </div>

//           {/* Popular Currencies */}
//           {currencies.length > 0 && (
//             <>
//             <div className="p-2">
//                   <p className="text-sm font-medium text-gray-500 uppercase">Popular currencies</p>
//                 </div>
//                 {currencies.slice(0,3).map((currency) => (  //  Show first 3 as popular.  Adjust as needed.
//               <button
//                 key={currency.code}
//                 type="button"
//                 className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
//                 onClick={() => handleCurrencySelect(currency)}
//               >
//                 <Image
//                   src={currency.flag}
//                   alt={`${currency.code} Flag`}
//                   width={24}
//                   height={24}
//                   className="mr-2"
//                 />
//                 <span className="font-medium mr-2">{currency.code}</span>
//                 <span className="text-gray-600">{currency.name}</span>
//                  {/* Checkmark for Selected */}
//                 {currency.code === selectedCurrency.code && (
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-auto text-green">
//                     <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
//                     </svg>

//                 )}
//               </button>
//             ))}

//             <div className="p-2">
//               <p className="text-sm font-medium text-gray-500 uppercase">All currencies</p>
//             </div>
//             {/* List of all the currencies */}
//             {currencies.slice(3).map((currency) => (  // Show rest currencies
//               <button
//                 key={currency.code}
//                 type="button"
//                 className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
//                 onClick={() => handleCurrencySelect(currency)}
//               >
//                 <Image
//                   src={currency.flag}
//                   alt={`${currency.code} Flag`}
//                   width={24}
//                   height={24}
//                   className="mr-2"
//                 />
//                 <span className="font-medium mr-2">{currency.code}</span>
//                 <span className="text-gray-600">{currency.name}</span>
//                  {/* Checkmark for Selected */}
//                 {currency.code === selectedCurrency.code && (
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-auto text-green">
//                     <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
//                   </svg>

//                 )}
//               </button>
//             ))}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;

// components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";

// // Import the SVG files directly
// import aed from '../../../public/assets/icons/aed.svg'
// import gbp from '../../../public/assets/icons/gbp.svg'
// import inr from '../../../public/assets/icons/inr.svg'
// import usd from '../../../public/assets/icons/usd.svg'
// import aud from '../../../public/assets/icons/aud.svg'
// import bgn from '../../../public/assets/icons/bgn.svg'
// import brl from '../../../public/assets/icons/brl.svg'

// // Define interface for Country data
// interface Country {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we're importing the SVG directly
//   popular?: boolean;
// }

// // Static data for countries (replace with API call or data file for real app)
// const countriesData: Country[] = [
//   { code: "GBP", name: "British pound", flag: gbp, popular: true },
//   { code: "INR", name: "Indian rupee", flag: inr, popular: true },
//   { code: "USD", name: "United States dollar", flag: usd, popular: true },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "AUD", name: "Australian dollar", flag: aud },
//   { code: "BGN", name: "Bulgarian lev", flag: bgn },
//   { code: "BRL", name: "Brazilian real", flag: brl },

// ];

// interface CountryDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({ selectedCurrency, onCurrencyChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   const handleCountryChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     closeDropdown();
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCountries = countriesData.filter(country =>
//     country.name.toLowerCase().includes(searchQuery.toLowerCase()) || country.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const popularCountries = filteredCountries.filter(country => country.popular);
//   const allCountries = filteredCountries.filter(country => !country.popular);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         closeDropdown();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {countriesData.find(c => c.code === selectedCurrency) && (
//              <Image
//                 src={countriesData.find(c => c.code === selectedCurrency)!.flag} // Removed the async function
//                 alt={`${selectedCurrency}-Flag`}
//                 width={24}
//                 height={24}
//               />
//           )}
//           <p>{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-[300px] bg-white rounded-xl shadow-lg border overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green dark:focus:border-green"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/* Popular Currencies */}
//             {popularCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mb-2 px-2">
//                   Popular currencies
//                 </h3>
//                 <ul>
//                   {popularCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                             src={country.flag} // Removed the async function
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">- {country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <span className="text-green-500 font-bold">✔</span> // Checkmark
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* All Currencies */}
//             {allCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2 px-2">
//                   All currencies
//                 </h3>
//                 <ul>
//                   {allCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                            src={country.flag} // Removed the async function
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">- {country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <span className="text-green-500 font-bold">✔</span> // Checkmark
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//              {filteredCountries.length === 0 && searchQuery && (
//                 <div className="p-4 text-center text-gray-500">
//                     No currencies found for "{searchQuery}"
//                 </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;

// // components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import all the SVG files directly
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import bgn from "../../../public/assets/icons/bgn.svg";
// import brl from "../../../public/assets/icons/brl.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import chf from "../../../public/assets/icons/chf.svg";
// import cny from "../../../public/assets/icons/cny.svg";
// import czk from "../../../public/assets/icons/czk.svg";
// import dkk from "../../../public/assets/icons/dkk.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import gbp from "../../../public/assets/icons/gbp.svg";
// import hkd from "../../../public/assets/icons/hkd.svg";
// import huf from "../../../public/assets/icons/huf.svg";
// import ils from "../../../public/assets/icons/ils.svg";
// import inr from "../../../public/assets/icons/inr.svg";
// import jpy from "../../../public/assets/icons/jpy.svg";
// import mxn from "../../../public/assets/icons/mxn.svg";
// import myr from "../../../public/assets/icons/myr.svg";
// import nok from "../../../public/assets/icons/nok.svg";
// import nzd from "../../../public/assets/icons/nzd.svg";
// import php from "../../../public/assets/icons/php.svg";
// import pln from "../../../public/assets/icons/pln.svg";
// import ron from "../../../public/assets/icons/ron.svg";
// import sek from "../../../public/assets/icons/sek.svg";
// import sgd from "../../../public/assets/icons/sgd.svg";
// import try_ from "../../../public/assets/icons/try.svg"; // 'try' is a reserved keyword, so rename
// import uah from "../../../public/assets/icons/uah.svg";
// import usd from "../../../public/assets/icons/usd.svg";

// // Define interface for Country data
// interface Country {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we're importing the SVG directly
//   popular?: boolean;
// }

// // Static data for countries
// const countriesData: Country[] = [
//   { code: "GBP", name: "British pound", flag: gbp, popular: true },
//   { code: "INR", name: "Indian rupee", flag: inr, popular: true },
//   { code: "USD", name: "United States dollar", flag: usd, popular: true },
//   { code: "EUR", name: "Euro", flag: eur, popular: true }, // Added EUR as popular
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "AUD", name: "Australian dollar", flag: aud },
//   { code: "BGN", name: "Bulgarian lev", flag: bgn },
//   { code: "BRL", name: "Brazilian real", flag: brl },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "CHF", name: "Swiss franc", flag: chf },
//   { code: "CNY", name: "Chinese yuan", flag: cny },
//   { code: "CZK", name: "Czech koruna", flag: czk },
//   { code: "DKK", name: "Danish krone", flag: dkk },
//   { code: "HKD", name: "Hong Kong dollar", flag: hkd },
//   { code: "HUF", name: "Hungarian forint", flag: huf },
//   { code: "ILS", name: "Israeli new shekel", flag: ils },
//   { code: "JPY", name: "Japanese yen", flag: jpy },
//   { code: "MXN", name: "Mexican peso", flag: mxn },
//   { code: "MYR", name: "Malaysian ringgit", flag: myr },
//   { code: "NOK", name: "Norwegian krone", flag: nok },
//   { code: "NZD", name: "New Zealand dollar", flag: nzd },
//   { code: "PHP", name: "Philippine peso", flag: php },
//   { code: "PLN", name: "Polish złoty", flag: pln },
//   { code: "RON", name: "Romanian leu", flag: ron },
//   { code: "SEK", name: "Swedish krona", flag: sek },
//   { code: "SGD", name: "Singapore dollar", flag: sgd },
//   { code: "TRY", name: "Turkish lira", flag: try_ },
//   { code: "UAH", name: "Ukrainian hryvnia", flag: uah },

// ];

// interface CountryDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({ selectedCurrency, onCurrencyChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   const handleCountryChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     closeDropdown();
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCountries = countriesData.filter(country =>
//     country.name.toLowerCase().includes(searchQuery.toLowerCase()) || country.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const popularCountries = filteredCountries.filter(country => country.popular);
//   const allCountries = filteredCountries.filter(country => !country.popular);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         closeDropdown();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {countriesData.find(c => c.code === selectedCurrency) && (
//              <Image
//                 src={countriesData.find(c => c.code === selectedCurrency)!.flag}
//                 alt={`${selectedCurrency}-Flag`}
//                 width={24}
//                 height={24}
//               />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green dark:focus:border-green"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/* Popular Currencies */}
//             {popularCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-medium text-gray p-2">
//                   Popular currencies
//                 </h3>
//                 <ul>
//                   {popularCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                             src={country.flag}
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">{country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <AiOutlineCheck className="text-main"/>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* All Currencies */}
//             {allCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2 px-2">
//                   All currencies
//                 </h3>
//                 <ul>
//                   {allCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                          <Image
//                            src={country.flag}
//                             alt={`${country.code}-Flag`}
//                             width={20}
//                             height={20}
//                           />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">{country.name}</span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <span className="text-green-500 font-bold">✔</span> // Checkmark
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//              {filteredCountries.length === 0 && searchQuery && (
//                 <div className="p-4 text-center text-gray-500">
//                     No currencies found for "{searchQuery}"
//                 </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;

// components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import all the SVG files directly (same as before)
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import bgn from "../../../public/assets/icons/bgn.svg";
// import brl from "../../../public/assets/icons/brl.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import chf from "../../../public/assets/icons/chf.svg";
// import cny from "../../../public/assets/icons/cny.svg";
// import czk from "../../../public/assets/icons/czk.svg";
// import dkk from "../../../public/assets/icons/dkk.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import gbp from "../../../public/assets/icons/gbp.svg";
// import hkd from "../../../public/assets/icons/hkd.svg";
// import huf from "../../../public/assets/icons/huf.svg";
// import ils from "../../../public/assets/icons/ils.svg";
// import inr from "../../../public/assets/icons/inr.svg";
// import jpy from "../../../public/assets/icons/jpy.svg";
// import mxn from "../../../public/assets/icons/mxn.svg";
// import myr from "../../../public/assets/icons/myr.svg";
// import nok from "../../../public/assets/icons/nok.svg";
// import nzd from "../../../public/assets/icons/nzd.svg";
// import php from "../../../public/assets/icons/php.svg";
// import pln from "../../../public/assets/icons/pln.svg";
// import ron from "../../../public/assets/icons/ron.svg";
// import sek from "../../../public/assets/icons/sek.svg";
// import sgd from "../../../public/assets/icons/sgd.svg";
// import try_ from "../../../public/assets/icons/try.svg"; // 'try' is a reserved keyword
// import uah from "../../../public/assets/icons/uah.svg";
// import usd from "../../../public/assets/icons/usd.svg";

// interface Country {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
//   popular?: boolean;
// }

// const countriesData: Country[] = [
//   { code: "GBP", name: "British pound", flag: gbp, popular: true },
//   { code: "INR", name: "Indian rupee", flag: inr, popular: true },
//   { code: "USD", name: "United States dollar", flag: usd, popular: true },
//   { code: "EUR", name: "Euro", flag: eur},
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "AUD", name: "Australian dollar", flag: aud },
//   { code: "BGN", name: "Bulgarian lev", flag: bgn },
//   { code: "BRL", name: "Brazilian real", flag: brl },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "CHF", name: "Swiss franc", flag: chf },
//   { code: "CNY", name: "Chinese yuan", flag: cny },
//   { code: "CZK", name: "Czech koruna", flag: czk },
//   { code: "DKK", name: "Danish krone", flag: dkk },
//   { code: "HKD", name: "Hong Kong dollar", flag: hkd },
//   { code: "HUF", name: "Hungarian forint", flag: huf },
//   { code: "ILS", name: "Israeli new shekel", flag: ils },
//   { code: "JPY", name: "Japanese yen", flag: jpy },
//   { code: "MXN", name: "Mexican peso", flag: mxn },
//   { code: "MYR", name: "Malaysian ringgit", flag: myr },
//   { code: "NOK", name: "Norwegian krone", flag: nok },
//   { code: "NZD", name: "New Zealand dollar", flag: nzd },
//   { code: "PHP", name: "Philippine peso", flag: php },
//   { code: "PLN", name: "Polish złoty", flag: pln },
//   { code: "RON", name: "Romanian leu", flag: ron },
//   { code: "SEK", name: "Swedish krona", flag: sek },
//   { code: "SGD", name: "Singapore dollar", flag: sgd },
//   { code: "TRY", name: "Turkish lira", flag: try_ },
//   { code: "UAH", name: "Ukrainian hryvnia", flag: uah },
// ];

// interface CountryDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//     // Simplified closeDropdown; no need for a separate function
//   const handleCountryChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false); // Close directly
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Use .filter() and .some() for a cleaner search
//     const filteredCountries = countriesData.filter(country =>
//       country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       country.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   const popularCountries = filteredCountries.filter((country) => country.popular);
//   const allCountries = filteredCountries.filter((country) => !country.popular);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false); // Close directly
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//     // Added a useMemo to prevent unnecessary filtering if the selectedCurrency and countriesData haven't changed.
//   const selectedCountry = React.useMemo(() => {
//     return countriesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, countriesData]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCountry && ( // Use the memoized value
//             <Image
//               src={selectedCountry.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/* Popular Currencies */}
//             {popularCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-medium text-gray p-2">
//                   Popular currencies
//                 </h3>
//                 <ul>
//                   {popularCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={country.flag}
//                           alt={`${country.code}-Flag`}
//                           width={20}
//                           height={20}
//                         />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">
//                           {country.name}
//                         </span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <AiOutlineCheck className="text-main" />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* All Currencies */}
//             {allCountries.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2 px-2">
//                   All currencies
//                 </h3>
//                 <ul>
//                   {allCountries.map((country) => (
//                     <li
//                       key={country.code}
//                       onClick={() => handleCountryChange(country.code)}
//                       className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={country.flag}
//                           alt={`${country.code}-Flag`}
//                           width={20}
//                           height={20}
//                         />
//                         <span>{country.code}</span>
//                         <span className="text-gray-500 text-sm ml-1">
//                           {country.name}
//                         </span>
//                       </div>
//                       {selectedCurrency === country.code && (
//                         <AiOutlineCheck className="text-main" />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {filteredCountries.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountryDropdown;

// // components/CurrencyDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";  // Keep for the search bar version
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import inr from "../../../public/assets/icons/inr.svg";
// import usd from "../../../public/assets/icons/usd.svg";

// interface Currency {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
// }

// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur }, //add EUR
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // Keep for search bar version
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCurrencies = currenciesData.filter(currency =>
//       currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, currenciesData]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul>
//                 {filteredCurrencies.map((currency) => (
//                   <li
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={20}
//                         height={20}
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <AiOutlineCheck className="text-main" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// Last Complete Code
// // components/CurrencyDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files
// import aed from "../../../public/assets/icons/aed.svg";
// import aud from "../../../public/assets/icons/aud.svg";
// import cad from "../../../public/assets/icons/cad.svg";
// import eur from "../../../public/assets/icons/eur.svg";
// import inr from "../../../public/assets/icons/inr.svg"; // Keep this, but we'll filter it out
// import usd from "../../../public/assets/icons/usd.svg";

// interface Currency {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
// }

// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Correctly filter out INR *before* applying search
//   const filteredCurrencies = currenciesData
//     .filter((currency) => currency.code !== "INR") // Exclude INR FIRST
//     .filter(
//       (currency) =>
//         currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // UseMemo is fine here, and currenciesData is not strictly needed but harmless
//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, currenciesData]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul>
//                 {filteredCurrencies.map((currency) => (
//                   <li
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={20}
//                         height={20}
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <AiOutlineCheck className="text-main" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // New Latest Code
// //app/components/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files
// import aed from "../../../../public/assets/icon/aed.svg";
// import aud from "../../../../public/assets/icon/aud.svg";
// import cad from "../../../../public/assets/icon/cad.svg";
// import eur from "../../../../public/assets/icon/eur.svg";
// import inr from "../../../../public/assets/icon/inr.svg"; // Keep this, but we'll filter it out
// import usd from "../../../../public/assets/icon/usd.svg";

// interface Currency {
//   code: string;
//   name: string;
//   flag: any; // Use 'any' because we are directly importing SVG
// }

// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Correctly filter out INR *before* applying search
//   const filteredCurrencies = currenciesData
//     .filter((currency) => currency.code !== "INR") // Exclude INR FIRST
//     .filter(
//       (currency) =>
//         currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // UseMemo is fine here, and currenciesData is not strictly needed but harmless
//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, currenciesData]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>

//           <div className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul>
//                 {filteredCurrencies.map((currency) => (
//                   <li
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={20}
//                         height={20}
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <AiOutlineCheck className="text-main" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // app/components/ui/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image, { StaticImageData } from "next/image"; // Import StaticImageData
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files (assuming they resolve correctly)
// import aed from "../../../../public/assets/icon/aed.svg";
// import aud from "../../../../public/assets/icon/aud.svg";
// import cad from "../../../../public/assets/icon/cad.svg";
// import eur from "../../../../public/assets/icon/eur.svg";
// import inr from "../../../../public/assets/icon/inr.svg"; // Keep this, but we'll filter it out
// import usd from "../../../../public/assets/icon/usd.svg";

// interface Currency {
//   code: string;
//   name: string;
//   flag: StaticImageData | string; // Use StaticImageData or string if it's just a path
// }

// // Type the flags explicitly if possible, otherwise keep as string/StaticImageData
// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Correctly filter out INR *before* applying search
//   const filteredCurrencies = currenciesData
//     .filter((currency) => currency.code !== "INR") // Exclude INR FIRST
//     .filter(
//       (currency) =>
//         currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // Removed 'currenciesData' from dependency array
//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button // Changed div to button for better accessibility
//         type="button"
//         className="flex items-center gap-2 w-24 cursor-pointer p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green"
//         onClick={toggleDropdown}
//         aria-haspopup="listbox" // Added aria attributes
//         aria-expanded={isOpen}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//               className="rounded-full" // Added rounded-full for consistency
//             />
//           )}
//           <p className="text-main font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="bg-gray-50 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full pl-10 p-2.5"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 aria-label="Search Currencies" // Added aria-label
//               />
//             </div>
//           </div>

//           <div
//             className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
//             role="listbox" // Added role
//           >
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul>
//                 {filteredCurrencies.map((currency) => (
//                   <li // Changed to button for better interaction
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer focus:outline-none focus:bg-gray-100"
//                     role="option" // Added role
//                     aria-selected={selectedCurrency === currency.code} // Added aria-selected
//                     tabIndex={0} // Make focusable
//                     onKeyDown={(e) => { // Allow selection with Enter/Space
//                         if (e.key === 'Enter' || e.key === ' ') {
//                            handleCurrencyChange(currency.code);
//                         }
//                     }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={20}
//                         height={20}
//                         className="rounded-full"
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <AiOutlineCheck className="text-main" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-4 text-center text-gray-500">
//                  {/* Fixed unescaped entity */}
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // app/components/ui/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image, { StaticImageData } from "next/image"; // Import StaticImageData
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCheck } from "react-icons/ai";

// // Import only the required SVG files (assuming they resolve correctly)
// import aed from "../../../../public/assets/icon/aed.svg";
// import aud from "../../../../public/assets/icon/aud.svg";
// import cad from "../../../../public/assets/icon/cad.svg";
// import eur from "../../../../public/assets/icon/eur.svg";
// import inr from "../../../../public/assets/icon/inr.svg"; // Keep this, but we'll filter it out
// import usd from "../../../../public/assets/icon/usd.svg";
// import { GiCheckMark } from "react-icons/gi";

// interface Currency {
//   code: string;
//   name: string;
//   flag: StaticImageData | string; // Use StaticImageData or string if it's just a path
// }

// // Type the flags explicitly if possible, otherwise keep as string/StaticImageData
// const currenciesData: Currency[] = [
//   { code: "USD", name: "United States dollar", flag: usd },
//   { code: "INR", name: "Indian rupee", flag: inr },
//   { code: "EUR", name: "Euro", flag: eur },
//   { code: "AED", name: "United Arab Emirates dirham", flag: aed },
//   { code: "CAD", name: "Canadian dollar", flag: cad },
//   { code: "AUD", name: "Australian dollar", flag: aud },
// ];

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Correctly filter out INR *before* applying search
//   const filteredCurrencies = currenciesData
//     .filter((currency) => currency.code !== "INR") // Exclude INR FIRST
//     .filter(
//       (currency) =>
//         currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // Removed 'currenciesData' from dependency array
//   const selectedCurrencyData = React.useMemo(() => {
//     return currenciesData.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button // Changed div to button for better accessibility
//         type="button"
//         className="flex items-center gap-2 w-24 cursor-pointer"
//         onClick={toggleDropdown}
//         aria-haspopup="listbox" // Added aria attributes
//         aria-expanded={isOpen}
//       >
//         <div className="flex items-center gap-2">
//           {selectedCurrencyData && (
//             <Image
//               src={selectedCurrencyData.flag}
//               alt={`${selectedCurrency}-Flag`}
//               width={24}
//               height={24}
//               className="rounded-full" // Added rounded-full for consistency
//             />
//           )}
//           <p className="text-mainheading dark:text-white font-semibold">{selectedCurrency}</p>
//         </div>
//         {isOpen ? <IoIosArrowUp size={18} className="text-mainheading dark:text-white"/> : <IoIosArrowDown size={18} className="text-mainheading dark:text-white"/>}
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] top-12 right-0 bg-white dark:bg-background rounded-lg  border overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white dark:bg-background p-2 border-b">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className=" shadow-inner border text-mainheading dark:text-white text-sm rounded-lg focus:outline-none block w-full pl-10 px-4 py-3 hover:shadow-darkcolor dark:hover:shadow-whitecolor transition-shadow ease-in-out duration-300"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 aria-label="Search Currencies" // Added aria-label
//               />
//             </div>
//           </div>

//           <div
//             className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
//             role="listbox" // Added role
//           >
//             {/*  Currencies */}
//             {filteredCurrencies.length > 0 && (
//               <ul className="space-y-2">
//                 {filteredCurrencies.map((currency) => (
//                   <li // Changed to button for better interaction
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className="flex items-center justify-between p-2 rounded-md dark:hover:bg-secondary hover:bg-lightgray  cursor-pointer focus:outline-none focus:bg-gray-100"
//                     role="option" // Added role
//                     aria-selected={selectedCurrency === currency.code} // Added aria-selected
//                     tabIndex={0} // Make focusable
//                     onKeyDown={(e) => { // Allow selection with Enter/Space
//                         if (e.key === 'Enter' || e.key === ' ') {
//                             e.preventDefault(); // Prevent default space scroll
//                            handleCurrencyChange(currency.code);
//                         }
//                     }}
//                   >
//                     <div className="flex items-center gap-2.5">
//                       <Image
//                         src={currency.flag}
//                         alt={`${currency.code}-Flag`}
//                         width={100}
//                         height={100}
//                         className="size-8"
//                       />
//                       <span>{currency.code}</span>
//                       <span className="text-gray-500 dark:text-gray-300 text-sm ml-1">
//                         {currency.name}
//                       </span>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <GiCheckMark  className="text-mainheading dark:text-white size-5" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                  {/* FIXED: Replaced literal quotes with HTML entities */}
//                 No currencies found for &quot;{searchQuery}&quot;
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // app/components/ui/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect, useMemo } from "react"; // Added useMemo
// import Image, { StaticImageData } from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { GiCheckMark } from "react-icons/gi";
// import { Loader2 } from "lucide-react"; // For loading state

// // Import currency service and type
// import currencyService, { Currency } from "../../services/currency"; // Adjust path as needed

// // Default flag if flagImage is missing (optional)
// import defaultFlag from "../../../../public/assets/icon/inr.svg"; // Create or find a default flag image

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
//   // Optional: Add a prop to pass pre-fetched currencies to avoid double fetching
//   // initialCurrencies?: Currency[];
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
//   // initialCurrencies
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // --- State for dynamic currencies ---
//   const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   // --- End State ---

//   // --- Fetch Currencies Effect ---
//   useEffect(() => {
//     // Optional: Use initialCurrencies if provided
//     // if (initialCurrencies && initialCurrencies.length > 0) {
//     //   setAvailableCurrencies(initialCurrencies);
//     //   setIsLoading(false);
//     //   return;
//     // }

//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         // Fetch WITHOUT rate adjustments for the dropdown
//         const currencies = await currencyService.getAllCurrencies(false);
//         setAvailableCurrencies(currencies);
//       } catch (err: any) {
//         console.error("Error fetching currencies for dropdown:", err);
//         setError(err.message || "Failed to load currencies");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrencies();
//     // }, [initialCurrencies]); // Add initialCurrencies if using the optional prop
//   }, []); // Run once on mount

//   // --- Event Handlers (mostly unchanged) ---
//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//     setSearchQuery(""); // Clear search on selection
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // --- Filtered Currencies Logic ---
//   const filteredCurrencies = useMemo(() => {
//     // Start with fetched available currencies
//     return availableCurrencies
//       .filter((currency) => currency.code !== "INR") // Exclude INR
//       .filter( // Apply search
//         (currency) =>
//           currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .sort((a, b) => a.code.localeCompare(b.code)); // Optional: Sort alphabetically by code
//   }, [availableCurrencies, searchQuery]);

//   // --- Click Outside Handler (unchanged) ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // --- Get Selected Currency Data ---
//   const selectedCurrencyData = useMemo(() => {
//     // Find from the fetched list
//     return availableCurrencies.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, availableCurrencies]);

//   // --- Get Flag Source ---
//   const getFlagSrc = (currency: Currency | undefined): StaticImageData | string => {
//      // Check if flagImage exists and is not an empty string
//     if (currency?.flagImage) {
//         // If flagImage is a full URL (starts with http/https) or a local path (/assets/...), use it directly
//         if (currency.flagImage.startsWith('http') || currency.flagImage.startsWith('/')) {
//             return currency.flagImage;
//         } else {
//             // Assume it's just the filename like 'usd.svg' and prepend the path
//             // IMPORTANT: Adjust this path if your assets are structured differently
//             return `/assets/icon/${currency.flagImage}`;
//         }
//     }
//     // Fallback to default flag if flagImage is missing or empty
//     return defaultFlag;
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         className="flex items-center justify-between gap-2 w-28 px-3 h-full cursor-pointer" // Adjusted width & added padding/height
//         onClick={toggleDropdown}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         disabled={isLoading} // Disable while loading currencies
//       >
//         {isLoading ? (
//           <Loader2 className="size-5 animate-spin mx-auto" />
//         ) : (
//           <>
//             <div className="flex items-center gap-2 overflow-hidden"> {/* Added overflow-hidden */}
//               <Image
//                   src={getFlagSrc(selectedCurrencyData)}
//                   alt={`${selectedCurrency}-Flag`}
//                   width={24}
//                   height={24}
//                   className="rounded-full flex-shrink-0" // Added flex-shrink-0
//                   unoptimized={typeof getFlagSrc(selectedCurrencyData) === 'string' && getFlagSrc(selectedCurrencyData).startsWith('http')} // Add unoptimized for external URLs
//                   onError={(e) => { (e.target as HTMLImageElement).src = defaultFlag.src; }} // Fallback on error
//               />
//               <p className="text-mainheading dark:text-white font-semibold truncate">{selectedCurrency}</p> {/* Added truncate */}
//             </div>
//             {isOpen ? <IoIosArrowUp size={18} className="text-mainheading dark:text-white flex-shrink-0"/> : <IoIosArrowDown size={18} className="text-mainheading dark:text-white flex-shrink-0"/>}
//           </>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 w-[400px] max-w-[90vw] top-14 -right-4 sm:right-0 bg-white dark:bg-background rounded-lg border shadow-lg overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white dark:bg-background p-2 border-b z-10">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="border text-mainheading dark:text-white text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary block w-full pl-10 px-4 py-3"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 aria-label="Search Currencies"
//               />
//             </div>
//           </div>

//           <div
//             className="p-2 pb-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
//             role="listbox"
//           >
//             {/* Loading State */}
//             {isLoading && (
//                  <div className="flex justify-center items-center py-10">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  </div>
//             )}

//             {/* Error State */}
//             {!isLoading && error && (
//                 <div className="p-3 text-center text-red-600">
//                     Error: {error}
//                 </div>
//             )}

//             {/* Currency List */}
//             {!isLoading && !error && filteredCurrencies.length > 0 && (
//               <ul className="space-y-1">
//                 {filteredCurrencies.map((currency) => (
//                   <li
//                     key={currency.code}
//                     onClick={() => handleCurrencyChange(currency.code)}
//                     className={`flex items-center justify-between p-3 rounded-md dark:hover:bg-secondary hover:bg-lightgray cursor-pointer focus:outline-none focus:bg-gray-100 ${selectedCurrency === currency.code ? 'bg-primary/10' : ''}`}
//                     role="option"
//                     aria-selected={selectedCurrency === currency.code}
//                     tabIndex={0}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter' || e.key === ' ') {
//                             e.preventDefault();
//                            handleCurrencyChange(currency.code);
//                         }
//                     }}
//                   >
//                     <div className="flex items-center gap-3">
//                        <Image
//                            src={getFlagSrc(currency)}
//                            alt={`${currency.code}-Flag`}
//                            width={32} // Slightly larger in list
//                            height={32}
//                            className="size-8 rounded-full"
//                            unoptimized={typeof getFlagSrc(currency) === 'string' && getFlagSrc(currency).startsWith('http')}
//                            onError={(e) => { (e.target as HTMLImageElement).src = defaultFlag.src; }}
//                        />
//                        <div className="flex flex-col">
//                          <span className="font-medium text-mainheading dark:text-white">{currency.code}</span>
//                          <span className="text-gray-500 dark:text-gray-400 text-xs">
//                             {currency.currencyName}
//                          </span>
//                        </div>
//                     </div>
//                     {selectedCurrency === currency.code && (
//                       <GiCheckMark className="text-primary size-5" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* No Results */}
//             {!isLoading && !error && filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//              {/* No Currencies Loaded */}
//             {!isLoading && !error && availableCurrencies.length === 0 && !searchQuery && (
//               <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                 No currencies available.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // app/components/ui/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect, useMemo } from "react";
// import Image, { StaticImageData } from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { GiCheckMark } from "react-icons/gi";
// import { Loader2 } from "lucide-react";

// import currencyService, { Currency } from "../../services/currency"; // Adjust path as needed
// import defaultFlag from "../../../../public/assets/icon/inr.svg"; // Adjust path if needed

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
//   disabled?: boolean; // <-- Add the optional disabled prop here
//   // initialCurrencies?: Currency[];
// }

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
//   disabled = false, // <-- Provide a default value
//   // initialCurrencies
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>([]);
//   const [isLoading, setIsLoading] = useState(true); // Keep internal loading state for fetching
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const currencies = await currencyService.getAllCurrencies(false);
//         setAvailableCurrencies(currencies);
//       } catch (err: any) {
//         console.error("Error fetching currencies for dropdown:", err);
//         setError(err.message || "Failed to load currencies");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCurrencies();
//   }, []);

//   const toggleDropdown = () => {
//     if (!disabled && !isLoading) { // Only toggle if not disabled or loading internally
//        setIsOpen(!isOpen);
//     }
//   };

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//     setSearchQuery("");
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCurrencies = useMemo(() => {
//     return availableCurrencies
//       .filter((currency) => currency.code !== "INR")
//       .filter(
//         (currency) =>
//           currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .sort((a, b) => a.code.localeCompare(b.code));
//   }, [availableCurrencies, searchQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const selectedCurrencyData = useMemo(() => {
//     return availableCurrencies.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, availableCurrencies]);

//   // --- Get Flag Source (Type Guard added) ---
//   const getFlagSrc = (currency: Currency | undefined): StaticImageData | string => {
//     if (currency?.flagImage) {
//       if (currency.flagImage.startsWith('http') || currency.flagImage.startsWith('/')) {
//         return currency.flagImage;
//       } else {
//         return `/assets/icon/${currency.flagImage}`; // Adjust path if needed
//       }
//     }
//     return defaultFlag;
//   };

//   // Helper to check if src is a string URL
//   const isExternalUrl = (src: string | StaticImageData): src is string => {
//     return typeof src === 'string' && src.startsWith('http');
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         className={`flex items-center justify-between gap-2 px-3 h-full cursor-pointer ${ (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`} // Style disabled state
//         onClick={toggleDropdown}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         disabled={disabled || isLoading} // Use combined disabled state
//       >
//         {isLoading ? ( // Internal loading state for fetching currencies
//           <Loader2 className="size-5 animate-spin mx-auto text-primary" />
//         ) : (
//           <>
//             <div className="flex items-center gap-2">
//               <Image
//                   src={getFlagSrc(selectedCurrencyData)}
//                   alt={`${selectedCurrency}-Flag`}
//                   width={24}
//                   height={24}
//                   className="rounded-full flex-shrink-0"
//                   // --- Updated unoptimized logic ---
//                   unoptimized={isExternalUrl(getFlagSrc(selectedCurrencyData))}
//                   onError={(e) => { (e.target as HTMLImageElement).src = defaultFlag.src; }}
//               />
//               <p className="text-mainheading dark:text-white lg:text-base text-sm font-semibold">{selectedCurrency || "..."}</p> {/* Show ... if no currency yet */}
//             </div>
//             {isOpen ? <IoIosArrowUp size={20} className="text-mainheading size-4 dark:text-white flex-shrink-0"/> : <IoIosArrowDown size={20} className="text-mainheading size-4 dark:text-white flex-shrink-0"/>}
//           </>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 lg:w-[400px] w-72 max-w-[90vw] top-14 -right-5 sm:right-0 bg-white dark:bg-background rounded-lg border shadow-lg overflow-hidden">
//           {/* Search Input */}
//           <div className="sticky top-0 bg-white dark:bg-background p-2 border-b z-10">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <BiSearch className="lg:size-5 size-4 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type a currency / country"
//                 className="border text-mainheading dark:text-white text-sm rounded-lg focus:outline-none block w-full pl-10 px-4 py-3 bg-white dark:bg-background" // Ensure bg color for input
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 aria-label="Search Currencies"
//                 autoFocus // Focus input when dropdown opens
//               />
//             </div>
//           </div>

//           <div
//             className="p-2 pb-4 max-h-[310px] overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox" // Added dark scrollbar styles
//             role="listbox"
//           >
//             {/* Loading State (Internal) */}
//             {isLoading && (
//                  <div className="flex justify-center items-center py-10">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  </div>
//             )}

//             {/* Error State */}
//             {!isLoading && error && (
//                 <div className="p-3 text-center text-red-600">
//                     Error: {error}
//                 </div>
//             )}

//             {/* Currency List */}
//             {!isLoading && !error && filteredCurrencies.length > 0 && (
//               <ul className="space-y-2">
//                 {filteredCurrencies.map((currency) => {
//                     const flagSrc = getFlagSrc(currency); // Get src once
//                     return (
//                       <li
//                         key={currency.code}
//                         onClick={() => handleCurrencyChange(currency.code)}
//                         className={`flex items-center justify-between p-3 rounded-md dark:hover:bg-white/5 hover:bg-lightgray cursor-pointer focus:outline-none focus:bg-gray-100 ${selectedCurrency === currency.code ? 'dark:bg-white/5 bg-lightgray' : ''}`} // Added dark mode selection style
//                         role="option"
//                         aria-selected={selectedCurrency === currency.code}
//                         tabIndex={0}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter' || e.key === ' ') {
//                                 e.preventDefault();
//                                handleCurrencyChange(currency.code);
//                             }
//                         }}
//                       >
//                         <div className="flex items-center gap-3">
//                            <Image
//                                src={flagSrc}
//                                alt={`${currency.code}-Flag`}
//                                width={32}
//                                height={32}
//                                className="size-8 rounded-full"
//                                // --- Updated unoptimized logic ---
//                                unoptimized={isExternalUrl(flagSrc)}
//                                onError={(e) => { (e.target as HTMLImageElement).src = defaultFlag.src; }}
//                            />
//                            <div className="flex flex-col">
//                              <span className="font-medium text-mainheading lg:text-base text-sm dark:text-white">{currency.code}</span>
//                              <span className="text-gray-500 dark:text-gray-300 lg:text-sm text-[10px]">
//                                 {currency.currencyName}
//                              </span>
//                            </div>
//                         </div>
//                         {selectedCurrency === currency.code && (
//                           <GiCheckMark className="text-primary size-5" />
//                         )}
//                       </li>
//                     );
//                 })}
//               </ul>
//             )}

//             {/* No Results */}
//             {!isLoading && !error && filteredCurrencies.length === 0 && searchQuery && (
//               <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                 No currencies found for "{searchQuery}"
//               </div>
//             )}
//              {/* No Currencies Loaded */}
//             {!isLoading && !error && availableCurrencies.length === 0 && !searchQuery && (
//               <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                 No currencies available.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // app/components/ui/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect, useMemo } from "react";
// import Image, { StaticImageData } from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { GiCheckMark } from "react-icons/gi";
// import { Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// import currencyService, { Currency } from "../../services/currency"; // Adjust path as needed
// import defaultFlag from "../../../../public/assets/icon/inr.svg"; // Adjust path if needed

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
//   disabled?: boolean;
// }

// // --- Animation Variants for Dropdown ---
// const dropdownVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.97, // Start slightly smaller
//     y: -10, // Start slightly above
//     transition: { duration: 0.2, ease: "easeOut" },
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.2, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.97,
//     y: -10,
//     transition: { duration: 0.15, ease: "easeIn" },
//   },
// };

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const currencies = await currencyService.getAllCurrencies(false);
//         setAvailableCurrencies(currencies);
//       } catch (err: any) {
//         console.error("Error fetching currencies for dropdown:", err);
//         setError(err.message || "Failed to load currencies");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCurrencies();
//   }, []);

//   const toggleDropdown = () => {
//     if (!disabled && !isLoading) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//     setSearchQuery("");
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCurrencies = useMemo(() => {
//     return availableCurrencies
//       .filter((currency) => currency.code !== "INR")
//       .filter(
//         (currency) =>
//           currency.currencyName
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .sort((a, b) => a.code.localeCompare(b.code));
//   }, [availableCurrencies, searchQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const selectedCurrencyData = useMemo(() => {
//     return availableCurrencies.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, availableCurrencies]);

//   const getFlagSrc = (
//     currency: Currency | undefined
//   ): StaticImageData | string => {
//     if (currency?.flagImage) {
//       if (
//         currency.flagImage.startsWith("http") ||
//         currency.flagImage.startsWith("/")
//       ) {
//         return currency.flagImage;
//       } else {
//         return `/assets/icon/${currency.flagImage}`;
//       }
//     }
//     return defaultFlag;
//   };

//   const isExternalUrl = (src: string | StaticImageData): src is string => {
//     return (
//       typeof src === "string" && (src.startsWith("http") || src.startsWith("/"))
//     ); // Also handle absolute internal paths
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         className={`flex items-center justify-between gap-2 px-3 h-full cursor-pointer ${
//           disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={toggleDropdown}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         disabled={disabled || isLoading}
//       >
//         {isLoading ? (
//           <Loader2 className="size-5 animate-spin mx-auto text-primary" />
//         ) : (
//           <>
//             <div className="flex items-center gap-2">
//               <Image
//                 src={getFlagSrc(selectedCurrencyData)}
//                 alt={`${selectedCurrency || "flag"}-Flag`}
//                 width={24}
//                 height={24}
//                 className="rounded-full flex-shrink-0"
//                 unoptimized={isExternalUrl(getFlagSrc(selectedCurrencyData))}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = defaultFlag.src;
//                 }}
//               />
//               <p className="text-mainheading dark:text-white lg:text-base text-sm font-semibold">
//                 {selectedCurrency || "Select"}
//               </p>{" "}
//               {/* Changed placeholder */}
//             </div>
//             {isOpen ? (
//               <IoIosArrowUp
//                 size={20}
//                 className="text-mainheading size-4 dark:text-white flex-shrink-0"
//               />
//             ) : (
//               <IoIosArrowDown
//                 size={20}
//                 className="text-mainheading size-4 dark:text-white flex-shrink-0"
//               />
//             )}
//           </>
//         )}
//       </button>
//       {/* Wrap the dropdown content with AnimatePresence */}
//       <AnimatePresence>
//         {isOpen && (
//           // Add motion.div for animation
//           <motion.div
//             key="dropdown-content" // Add a unique key
//             className="absolute z-50 lg:w-[400px] w-72 max-w-[90vw] top-14 -right-5 sm:right-0 bg-white dark:bg-background rounded-lg border shadow-lg overflow-hidden"
//             style={{ transformOrigin: "top right" }} // Set origin for scale animation
//             variants={dropdownVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {/* Search Input */}
//             <div className="sticky top-0 bg-white dark:bg-background p-2 border-b z-10">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   {" "}
//                   <BiSearch className="lg:size-5 size-4 text-gray-400" />{" "}
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Type a currency / country"
//                   className="border text-mainheading dark:text-white text-sm rounded-lg focus:outline-none block w-full pl-10 px-4 py-3 bg-white dark:bg-background"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   aria-label="Search Currencies"
//                   autoFocus
//                 />
//               </div>
//             </div>

//             {/* Scrollable List */}
//             <div
//               className="p-2 pb-4 max-h-[310px] overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox"
//               role="listbox"
//             >
//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-10">
//                   {" "}
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />{" "}
//                 </div>
//               )}
//               {/* Error State */}
//               {!isLoading && error && (
//                 <div className="p-3 text-center text-red-600">
//                   {" "}
//                   Error: {error}{" "}
//                 </div>
//               )}
//               {/* Currency List */}
//               {!isLoading && !error && filteredCurrencies.length > 0 && (
//                 <ul className="space-y-2">
//                   {filteredCurrencies.map((currency) => {
//                     const flagSrc = getFlagSrc(currency);
//                     return (
//                       <li
//                         key={currency.code}
//                         onClick={() => handleCurrencyChange(currency.code)}
//                         className={`flex items-center justify-between p-3 rounded-md dark:hover:bg-white/5 hover:bg-lightgray cursor-pointer focus:outline-none focus:bg-gray-100 ${
//                           selectedCurrency === currency.code
//                             ? "dark:bg-white/5 bg-lightgray"
//                             : ""
//                         }`}
//                         role="option"
//                         aria-selected={selectedCurrency === currency.code}
//                         tabIndex={0}
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter" || e.key === " ") {
//                             e.preventDefault();
//                             handleCurrencyChange(currency.code);
//                           }
//                         }}
//                       >
//                         <div className="flex items-center gap-3">
//                           <Image
//                             src={flagSrc}
//                             alt={`${currency.code}-Flag`}
//                             width={32}
//                             height={32}
//                             className="size-8 rounded-full"
//                             unoptimized={isExternalUrl(flagSrc)}
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src =
//                                 defaultFlag.src;
//                             }}
//                           />
//                           <div className="flex flex-col">
//                             {" "}
//                             <span className="font-medium text-mainheading lg:text-base text-sm dark:text-white">
//                               {currency.code}
//                             </span>{" "}
//                             <span className="text-gray-500 dark:text-gray-300 lg:text-sm text-[10px]">
//                               {" "}
//                               {currency.currencyName}{" "}
//                             </span>{" "}
//                           </div>
//                         </div>
//                         {selectedCurrency === currency.code && (
//                           <GiCheckMark className="text-primary size-5" />
//                         )}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//               {/* No Results */}
//               {!isLoading &&
//                 !error &&
//                 filteredCurrencies.length === 0 &&
//                 searchQuery && (
//                   <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                     {" "}
//                     No currencies found for "{searchQuery}"{" "}
//                   </div>
//                 )}
//               {/* No Currencies Loaded */}
//               {!isLoading &&
//                 !error &&
//                 availableCurrencies.length === 0 &&
//                 !searchQuery && (
//                   <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                     {" "}
//                     No currencies available.{" "}
//                   </div>
//                 )}
//             </div>
//           </motion.div> // End motion.div for dropdown content
//         )}
//       </AnimatePresence>{" "}
//       {/* End AnimatePresence */}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// // app/components/ui/CountryDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect, useMemo } from "react";
// import Image, { StaticImageData } from "next/image";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
// import { GiCheckMark } from "react-icons/gi";
// import { Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// import currencyService, { Currency } from "../../services/currency"; // Adjust path as needed
// import defaultFlag from "../../../../public/assets/icon/inr.svg"; // Adjust path if needed

// interface CurrencyDropdownProps {
//   selectedCurrency: string;
//   onCurrencyChange: (currencyCode: string) => void;
//   disabled?: boolean;
// }

// // --- Animation Variants ---

// // For the main dropdown container (Slide down + Fade)
// const dropdownContainerVariants = {
//   hidden: {
//     opacity: 0,
//     y: -15, // Start slightly above
//     height: 0, // Start collapsed
//     transition: {
//       duration: 0.25,
//       ease: [0.4, 0, 0.2, 1], // Smooth ease-out-quint
//       when: "afterChildren", // Animate container *after* children exit (if any)
//       staggerChildren: 0.03, // Faster stagger on exit
//       staggerDirection: -1, // Stagger exit in reverse
//     },
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     height: "auto", // Animate to auto height
//     transition: {
//       duration: 0.3,
//       ease: [0.4, 0, 0.2, 1], // Smooth ease-out-quint
//       when: "beforeChildren", // Animate container *before* children enter
//       staggerChildren: 0.05, // Stagger children entering
//     },
//   },
// };

// // For individual list items (Slide from left + Fade)
// const listItemVariants = {
//   hidden: {
//     opacity: 0,
//     x: -20, // Start slightly to the left
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     // Optional: subtle exit animation for items
//     opacity: 0,
//     x: -10,
//     transition: {
//       duration: 0.15,
//       ease: "easeIn",
//     },
//   },
// };

// const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
//   selectedCurrency,
//   onCurrencyChange,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const currencies = await currencyService.getAllCurrencies(false);
//         setAvailableCurrencies(currencies);
//       } catch (err: any) {
//         console.error("Error fetching currencies for dropdown:", err);
//         setError(err.message || "Failed to load currencies");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCurrencies();
//   }, []);

//   const toggleDropdown = () => {
//     if (!disabled && !isLoading) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const handleCurrencyChange = (currencyCode: string) => {
//     onCurrencyChange(currencyCode);
//     setIsOpen(false);
//     setSearchQuery("");
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredCurrencies = useMemo(() => {
//     return availableCurrencies
//       .filter((currency) => currency.code !== "INR") // Exclude INR if needed
//       .filter(
//         (currency) =>
//           currency.currencyName
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           currency.code.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .sort((a, b) => a.code.localeCompare(b.code));
//   }, [availableCurrencies, searchQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const selectedCurrencyData = useMemo(() => {
//     return availableCurrencies.find((c) => c.code === selectedCurrency);
//   }, [selectedCurrency, availableCurrencies]);

//   const getFlagSrc = (
//     currency: Currency | undefined
//   ): StaticImageData | string => {
//     if (currency?.flagImage) {
//       if (
//         currency.flagImage.startsWith("http") ||
//         currency.flagImage.startsWith("/")
//       ) {
//         return currency.flagImage;
//       } else {
//         return `/assets/icon/${currency.flagImage}`;
//       } // Adjust path if needed
//     }
//     return defaultFlag;
//   };

//   const isExternalUrl = (src: string | StaticImageData): src is string => {
//     return (
//       typeof src === "string" && (src.startsWith("http") || src.startsWith("/"))
//     );
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         className={`flex items-center justify-between gap-2 px-3 h-full cursor-pointer ${
//           disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={toggleDropdown}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         disabled={disabled || isLoading}
//       >
//         {isLoading ? (
//           <Loader2 className="size-5 animate-spin mx-auto text-primary" />
//         ) : (
//           <>
//             <div className="flex items-center gap-2">
//               <Image
//                 src={getFlagSrc(selectedCurrencyData)}
//                 alt={`${selectedCurrency || "flag"}-Flag`}
//                 width={24}
//                 height={24}
//                 className="rounded-full flex-shrink-0"
//                 unoptimized={isExternalUrl(getFlagSrc(selectedCurrencyData))}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = defaultFlag.src;
//                 }}
//               />
//               <p className="text-mainheading dark:text-white lg:text-base text-sm font-semibold">
//                 {selectedCurrency || "Select"}
//               </p>
//             </div>
//             {/* Animate Arrow Rotation */}
//             <motion.div
//               animate={{ rotate: isOpen ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <IoIosArrowDown
//                 size={20}
//                 className="text-mainheading size-4 dark:text-white flex-shrink-0"
//               />
//             </motion.div>
//           </>
//         )}
//       </button>
//       {/* Wrap the dropdown content with AnimatePresence */}
//       <AnimatePresence>
//         {isOpen && (
//           // Add motion.div for container animation
//           <motion.div
//             key="dropdown-content"
//             className="absolute z-50 lg:w-[400px] w-72 max-w-[90vw] top-14 -right-5 sm:right-0 bg-white dark:bg-background rounded-lg border shadow-lg overflow-hidden"
//             // Origin for potential scale transforms, though we primarily use y here
//             style={{ transformOrigin: "top center" }}
//             variants={dropdownContainerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden" // Use hidden state for exit to reverse entrance
//           >
//             {/* Search Input (Static within the animated container) */}
//             <div className="sticky top-0 bg-white dark:bg-background p-2 border-b z-10">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   {" "}
//                   <BiSearch className="lg:size-5 size-4 text-gray-400" />{" "}
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Type a currency / country"
//                   className="border text-mainheading dark:text-white text-sm rounded-lg focus:outline-none block w-full pl-10 px-4 py-3 bg-white dark:bg-background"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   aria-label="Search Currencies"
//                   autoFocus
//                 />
//               </div>
//             </div>

//             {/* Scrollable List */}
//             <div
//               className="p-2 pb-4 max-h-[310px] overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox"
//               role="listbox"
//             >
//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-10">
//                   {" "}
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />{" "}
//                 </div>
//               )}
//               {/* Error State */}
//               {!isLoading && error && (
//                 <div className="p-3 text-center text-red-600">
//                   {" "}
//                   Error: {error}{" "}
//                 </div>
//               )}
//               {/* Currency List */}
//               {!isLoading && !error && filteredCurrencies.length > 0 && (
//                 <ul className="space-y-1">
//                   {" "}
//                   {/* Slightly reduced spacing */}
//                   {filteredCurrencies.map((currency) => {
//                     const flagSrc = getFlagSrc(currency);
//                     return (
//                       // Wrap each list item with motion.li for staggered animation
//                       <motion.li
//                         key={currency.code}
//                         variants={listItemVariants}
//                         // initial, animate, exit will be handled by the parent's stagger
//                         onClick={() => handleCurrencyChange(currency.code)}
//                         className={`flex items-center justify-between p-3 rounded-md dark:hover:bg-white/10 hover:bg-lightgray cursor-pointer focus:outline-none focus:bg-gray-100 dark:focus:bg-white/10 ${
//                           selectedCurrency === currency.code
//                             ? "dark:bg-white/10 bg-lightgray"
//                             : ""
//                         }`} // Improved dark focus/selection
//                         role="option"
//                         aria-selected={selectedCurrency === currency.code}
//                         tabIndex={0}
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter" || e.key === " ") {
//                             e.preventDefault();
//                             handleCurrencyChange(currency.code);
//                           }
//                         }}
//                       >
//                         <div className="flex items-center gap-3">
//                           <Image
//                             src={flagSrc}
//                             alt={`${currency.code}-Flag`}
//                             width={32}
//                             height={32}
//                             className="size-8 rounded-full"
//                             unoptimized={isExternalUrl(flagSrc)}
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src =
//                                 defaultFlag.src;
//                             }}
//                           />
//                           <div className="flex flex-col">
//                             {" "}
//                             <span className="font-medium text-mainheading lg:text-base text-sm dark:text-white">
//                               {currency.code}
//                             </span>{" "}
//                             <span className="text-gray-500 dark:text-gray-300 lg:text-sm text-[10px]">
//                               {" "}
//                               {currency.currencyName}{" "}
//                             </span>{" "}
//                           </div>
//                         </div>
//                         {selectedCurrency === currency.code && (
//                           <GiCheckMark className="text-primary size-5" />
//                         )}
//                       </motion.li> // End motion.li
//                     );
//                   })}
//                 </ul>
//               )}
//               {/* No Results */}
//               {!isLoading &&
//                 !error &&
//                 filteredCurrencies.length === 0 &&
//                 searchQuery && (
//                   <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                     {" "}
//                     No currencies found for "{searchQuery}"{" "}
//                   </div>
//                 )}
//               {/* No Currencies Loaded */}
//               {!isLoading &&
//                 !error &&
//                 availableCurrencies.length === 0 &&
//                 !searchQuery && (
//                   <div className="p-3 text-center text-gray-500 dark:text-gray-300">
//                     {" "}
//                     No currencies available.{" "}
//                   </div>
//                 )}
//             </div>
//           </motion.div> // End motion.div for dropdown content
//         )}
//       </AnimatePresence>{" "}
//       {/* End AnimatePresence */}
//     </div>
//   );
// };

// export default CurrencyDropdown;

// app/components/ui/CountryDropdown.tsx
"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

import currencyService, { Currency } from "../../services/currency"; // Adjust path as needed
import defaultFlag from "../../../../public/assets/icon/inr.svg"; // Adjust path if needed

interface CurrencyDropdownProps {
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
  disabled?: boolean;
}

// --- Animation Variants ---

// For the main dropdown container (Slide down + Fade)
const dropdownContainerVariants = {
  hidden: {
    opacity: 0,
    y: -15, // Start slightly above
    height: 0, // Start collapsed
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1], // Smooth ease-out-quint
      when: "afterChildren", // Animate container *after* children exit (if any)
      staggerChildren: 0.03, // Faster stagger on exit
      staggerDirection: -1, // Stagger exit in reverse
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto", // Animate to auto height
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // Smooth ease-out-quint
      when: "beforeChildren", // Animate container *before* children enter
      staggerChildren: 0.05, // Stagger children entering
    },
  },
};

// For individual list items (Slide from left + Fade)
const listItemVariants = {
  hidden: {
    opacity: 0,
    x: -20, // Start slightly to the left
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    // Optional: subtle exit animation for items
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const currencies = await currencyService.getAllCurrencies(false);
        setAvailableCurrencies(currencies);
      } catch (err: any) {
        console.error("Error fetching currencies for dropdown:", err);
        setError(err.message || "Failed to load currencies");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  const toggleDropdown = () => {
    if (!disabled && !isLoading) {
      setIsOpen(!isOpen);
    }
  };

  const handleCurrencyChange = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCurrencies = useMemo(() => {
    return availableCurrencies
      .filter((currency) => currency.code !== "INR") // Exclude INR if needed
      .filter(
        (currency) =>
          currency.currencyName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          currency.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [availableCurrencies, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedCurrencyData = useMemo(() => {
    return availableCurrencies.find((c) => c.code === selectedCurrency);
  }, [selectedCurrency, availableCurrencies]);

  const getFlagSrc = (
    currency: Currency | undefined
  ): StaticImageData | string => {
    if (currency?.flagImage) {
      if (
        currency.flagImage.startsWith("http") ||
        currency.flagImage.startsWith("/")
      ) {
        return currency.flagImage;
      } else {
        // Assuming your flags are in public/assets/icon/flags/{currency.flagImage}
        // And currency.flagImage is something like "eur.svg" or "usd.png"
        // Adjust this path if your structure is different.
        // For example, if flagImage is 'flags/eur.svg', then just use `${currency.flagImage}`
        return `/assets/icon/flags/${currency.flagImage}`; // Example adjustment
      }
    }
    return defaultFlag;
  };

  const isExternalUrl = (src: string | StaticImageData): src is string => {
    return (
      typeof src === "string" && (src.startsWith("http") || src.startsWith("/"))
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between gap-2 px-3 cursor-pointer ${
          disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin mx-auto text-primary" />
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Image
                src={getFlagSrc(selectedCurrencyData)}
                alt={`${selectedCurrency || "flag"}-Flag`}
                width={30}
                height={30}
                className="rounded-full flex-shrink-0"
                unoptimized={isExternalUrl(getFlagSrc(selectedCurrencyData))}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultFlag.src;
                }}
              />
              <p className="text-white lg:text-base text-sm font-semibold">
                {selectedCurrency || "Select"}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowDown
                size={20}
                className="size-5 text-white flex-shrink-0"
              />
            </motion.div>
          </>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown-content"
            className="absolute z-80 lg:w-[400px] w-72 max-w-[90vw] top-14 -right-5 sm:right-0 bg-primary-foreground rounded-lg border shadow-lg overflow-hidden"
            style={{ transformOrigin: "top center" }}
            variants={dropdownContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="sticky top-0 border-b z-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BiSearch className="lg:size-5 size-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Type a currency / country"
                  className="text-white text-sm rounded-lg focus:outline-none block w-full pl-10 px-4 py-3 placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  aria-label="Search Currencies"
                  // autoFocus attribute removed from here
                />
              </div>
            </div>

            <div
              className="p-2 pb-4 max-h-[310px] overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primarybox "
              role="listbox"
            >
              {isLoading && (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoading && error && (
                <div className="p-3 text-center text-red-600">
                  Error: {error}
                </div>
              )}
              {!isLoading && !error && filteredCurrencies.length > 0 && (
                <ul className="space-y-1">
                  {filteredCurrencies.map((currency) => {
                    const flagSrc = getFlagSrc(currency);
                    return (
                      <li
                        key={currency.code}
                        onClick={() => handleCurrencyChange(currency.code)}
                        className={`flex items-center justify-between p-3 rounded-lg hover:bg-primarybox cursor-pointer focus:outline-none focus:bg-bg-primarybox ${
                          selectedCurrency === currency.code
                            ? " bg-primarybox"
                            : ""
                        }`}
                        role="option"
                        aria-selected={selectedCurrency === currency.code}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCurrencyChange(currency.code);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Image
                            src={flagSrc}
                            alt={`${currency.code}-Flag`}
                            width={32}
                            height={32}
                            className="size-8 rounded-full"
                            unoptimized={isExternalUrl(flagSrc)}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                defaultFlag.src;
                            }}
                          />
                          <div className="flex justify-between w-full">
                            <span className="font-medium text-mainheadingWhite lg:text-base text-sm">
                              {currency.code}
                            </span>
                            <span className="text-subheadingWhite lg:text-sm text-[10px]">
                              {currency.currencyName}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              {!isLoading &&
                !error &&
                filteredCurrencies.length === 0 &&
                searchQuery && (
                  <div className="p-3 text-center text-gray-500 dark:text-gray-300">
                    No currencies found for "{searchQuery}"
                  </div>
                )}
              {!isLoading &&
                !error &&
                availableCurrencies.length === 0 &&
                !searchQuery && (
                  <div className="p-3 text-center text-gray-500 dark:text-gray-300">
                    No currencies available.
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencyDropdown;
