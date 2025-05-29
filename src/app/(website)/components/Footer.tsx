// components/Footer.tsx

// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";

// import { LuFacebook, LuInstagram } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";

// const Footer: React.FC = () => {
//   const currencyPairs = [
//     "USD to INR",
//     "AED to INR",
//     "AUD to INR",
//     "CAD to INR",
//     "EUR to INR",
//   ];
//   return (
//     <footer className="py-12">
//       <div className="container mx-auto px-4 ">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src={logo} alt="logo" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">Company</h3>
//             <ul className="space-y-3 text-gray font-light">
//               <li>
//                 <Link href="">About Us</Link>
//               </li>
//               <li>
//                 <Link href="">Careers</Link>
//               </li>
//               <li>
//                 <Link href="">Customer Reviews</Link>
//               </li>
//               <li>
//                 <Link href="">Pricing</Link>
//               </li>
//               <li>
//                 <Link href="">Help</Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">Products</h3>
//             <ul className="space-y-3 text-gray font-light">
//               <li>
//                 <Link href="">Send money to India</Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">
//               Resources
//             </h3>
//             <ul className="space-y-3 text-gray font-light">
//               <li>
//                 <Link href="">News and Blogs</Link>
//               </li>
//               <li>
//                 <Link href="">Privacy Policy</Link>
//               </li>
//               <li>
//                 <Link href="">Terms of Use</Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-green text-2xl font-semibold pb-4">
//               Follow Us
//             </h3>
//             <ul className="flex items-center gap-4">
//               <li className="p-2 bg-green/10 rounded-full">
//                 <Link href="" className="text-gray font-light">
//                   <LuFacebook size={20} className="text-main" />
//                 </Link>
//               </li>
//               <li className="p-2 bg-green/10 rounded-full">
//                 <Link href="" className="text-gray font-light">
//                   <FaXTwitter size={20} className="text-main" />
//                 </Link>
//               </li>
//               <li className="p-2 bg-green/10 rounded-full">
//                 <Link href="" className="text-gray font-light">
//                   <LuInstagram size={20} className="text-main" />
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           <div className="flex flex-wrap ">
//             {currencyPairs.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <Link href="#">{pair}</Link>
//                 {index !== currencyPairs.length - 1 && (
//                   <span className="mx-4">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">
//             © Wise Payments Limited {new Date().getFullYear()}
//           </p>
//           <p className="text-gray font-light">Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// "use client"
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import logo from "../../../../public/assets/icons/logo.svg";
// import { LuFacebook, LuInstagram, LuChevronDown } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";

// const Footer: React.FC = () => {
//   const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

//   const toggleSection = (section: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const sections = [
//     {
//       title: "Company",
//       key: "company",
//       links: ["About Us", "Careers", "Customer Reviews", "Pricing", "Help"],
//     },
//     {
//       title: "Products",
//       key: "products",
//       links: ["Send money to India"],
//     },
//     {
//       title: "Resources",
//       key: "resources",
//       links: ["News and Blogs", "Privacy Policy", "Terms of Use"],
//     },
//     {
//       title: "Follow Us",
//       key: "followUs",
//       links: [
//         { icon: <LuFacebook size={20} />, href: "#" },
//         { icon: <FaXTwitter size={20} />, href: "#" },
//         { icon: <LuInstagram size={20} />, href: "#" },
//       ],
//     },
//   ];

//   const currencyPairs = [
//     "USD to INR",
//     "AED to INR",
//     "AUD to INR",
//     "CAD to INR",
//     "EUR to INR",
//   ];

//   return (
//     <footer className="py-12">
//       <div className="container mx-auto px-4">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src={logo} alt="logo" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {sections.map(({ title, key, links }) => (
//             <div key={key}>
//               {/* Normal Heading for Large Screens */}
//               <h3 className="text-green text-2xl font-semibold pb-4 hidden sm:block">{title}</h3>

//               {/* Toggle Dropdown for Small Screens */}
//               <div
//                 className="flex justify-between items-center cursor-pointer pb-4 sm:hidden"
//                 onClick={() => toggleSection(key)}
//               >
//                 <h3 className="text-green text-2xl font-semibold">{title}</h3>
//                 <button>
//                   <LuChevronDown
//                     size={20}
//                     className={`text-green transition-transform duration-300 ${
//                       openSections[key] ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               </div>

//               {/* Small Screen Dropdown */}
//               <ul
//                 className={`sm:hidden space-y-3 text-gray font-light overflow-hidden transition-all duration-300 ${
//                   openSections[key] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 {key === "followUs"
//                   ? links.map(({ icon, href }, index) => (
//                       <li key={index} className="p-2 bg-green/10 rounded-full inline-block">
//                         <Link href={href}>{icon}</Link>
//                       </li>
//                     ))
//                   : links.map((link, index) => (
//                       <li key={index}>
//                         <Link href="#">{link}</Link>
//                       </li>
//                     ))}
//               </ul>

//               {/* Normal Display for Larger Screens */}
//               <ul className="hidden sm:block space-y-3 text-gray font-light">
//                 {key === "followUs"
//                   ? links.map(({ icon, href }, index) => (
//                       <li key={index} className="p-2 bg-green/10 rounded-full inline-block">
//                         <Link href={href}>{icon}</Link>
//                       </li>
//                     ))
//                   : links.map((link, index) => (
//                       <li key={index}>
//                         <Link href="#">{link}</Link>
//                       </li>
//                     ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           <div className="flex flex-wrap">
//             {currencyPairs.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <Link href="#">{pair}</Link>
//                 {index !== currencyPairs.length - 1 && <span className="mx-4">|</span>}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />
//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">
//             © Wise Payments Limited {new Date().getFullYear()}
//           </p>
//           <p className="text-gray font-light">
//             Wise is authorised by the Financial Conduct Authority under the Electronic Money
//             Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise
//             works with a local bank partner to offer the service in India with the approval of the
//             Reserve Bank of India.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../public/assets/icons/logo.svg";
// import { LuFacebook, LuInstagram } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown } from "react-icons/ti";

// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";

// interface FooterLink {
//   href: string;
//   label: string;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   copyright: string;
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "", label: "About Us" },
//           { href: "", label: "Careers" },
//           { href: "", label: "Customer Reviews" },
//           { href: "", label: "Pricing" },
//           { href: "", label: "Help" },
//         ],
//       },
//       {
//         title: "Products",
//         links: [{ href: "", label: "Send money to India" }],
//       },
//       {
//         title: "Resources",
//         links: [
//           { href: "", label: "News and Blogs" },
//           { href: "", label: "Privacy Policy" },
//           { href: "", label: "Terms of Use" },
//         ],
//       },
//       {
//         title: "Follow Us",
//         socialLinks: [
//           { href: "", label: "Facebook", icon: LuFacebook },
//           { href: "", label: "Twitter", icon: FaXTwitter },
//           { href: "", label: "Instagram", icon: LuInstagram },
//         ],
//       },
//     ],
//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     copyright: `Wise Payments Limited ${new Date().getFullYear()}`,
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const toggleDropdown = (title: string) => {
//     setOpenDropdown(openDropdown === title ? null : title);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     <ul className="space-y-3 text-gray font-light">
//       {links?.map((link) => (
//         <li key={link.label}>
//           <div className="relative group w-fit">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     <ul className="flex items-center gap-4 mt-4">
//       {socialLinks?.map((link) => (
//         <li key={link.label} className="p-2 bg-green/10 rounded-full">
//           <Link
//             href={link.href}
//             className="text-gray font-light"
//             aria-label={link.label}
//           >
//             <link.icon size={18} className="text-main" />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <footer className="py-12">
//       <div className="container mx-auto px-4 ">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src={logo} alt="logo" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               {/* Heading and Toggle (Common to both views) */}
//               <div
//                 className={`${
//                   isMobile
//                     ? "flex justify-between items-center pb-4 cursor-pointer"
//                     : "pb-4"
//                 }`}
//                 onClick={
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//               >
//                 <h3 className="text-green md:text-2xl text-xl font-semibold">
//                   {section.title}
//                 </h3>
//                 {isMobile && (
//                   <button
//                     aria-expanded={openDropdown === section.title}
//                     aria-controls={`${section.title.toLowerCase()}-dropdown-menu`}
//                   >
//                     {openDropdown === section.title ? (
//                       <HiX size={24} className="text-green" />
//                     ) : (
//                       <TiArrowSortedDown size={24} className="text-green" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Conditionally Rendered Content with Animation */}
//               <AnimatePresence>
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.links && ( // Corrected condition
//                     <motion.div
//                       key={`${section.title}-links`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderLinkList(section.links)}
//                     </motion.div>
//                   )}

//                 {/* Conditionally render social links with animation */}
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.socialLinks && ( //correct condition
//                     <motion.div
//                       key={`${section.title}-social`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderSocialLinks(section.socialLinks)}
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>

//         {/* ... (rest of the footer: currency converters, copyright, etc.) ... */}
//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           {/* currency converters */}
//           <div className="flex flex-wrap">
//             {footerData.currencyConverters.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <div className="relative group w-fit inline-block">
//                   <button className="relative z-10">
//                     {pair}
//                   </button>
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//                 </div>
//                 {index !== footerData.currencyConverters.length - 1 && (
//                   <span className="mx-4">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">{footerData.copyright}</p>
//           <p className="text-gray font-light">{footerData.disclaimer}</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // app/components/Footer.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { LuFacebook, LuInstagram } from "react-icons/lu";
// import { FaXTwitter } from "react-icons/fa6";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown } from "react-icons/ti";

// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAppContext } from "../layout"; // Import
// import { useRouter } from "next/navigation"; // Import useRouter

// interface FooterLink {
//   href: string;
//   label: string;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   copyright: string;
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     // ... (footerData remains the same) ...
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "", label: "About Us" },
//           { href: "", label: "Careers" },
//           { href: "", label: "Customer Reviews" },
//           { href: "", label: "Pricing" },
//           { href: "", label: "Help" },
//         ],
//       },
//       {
//         title: "Products",
//         links: [{ href: "", label: "Send money to India" }],
//       },
//       {
//         title: "Resources",
//         links: [
//           { href: "", label: "News and Blogs" },
//           { href: "", label: "Privacy Policy" },
//           { href: "", label: "Terms of Use" },
//         ],
//       },
//       {
//         title: "Follow Us",
//         socialLinks: [
//           { href: "", label: "Facebook", icon: LuFacebook },
//           { href: "", label: "Twitter", icon: FaXTwitter },
//           { href: "", label: "Instagram", icon: LuInstagram },
//         ],
//       },
//     ],
//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     copyright: `Wise Payments Limited ${new Date().getFullYear()}`,
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const { setSelectedSendCurrency } = useAppContext();
//   const router = useRouter(); // Initialize useRouter

//   const toggleDropdown = (title: string) => {
//     setOpenDropdown(openDropdown === title ? null : title);
//   };

//   useEffect(() => {
//     // ... (useEffect for window resize remains the same) ...
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     // ... (renderLinkList remains the same) ...
//     <ul className="space-y-3 text-gray font-light">
//       {links?.map((link) => (
//         <li key={link.label}>
//           <div className="relative group w-fit">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     // ... (renderSocialLinks remains the same) ...
//     <ul className="flex items-center gap-4 mt-4">
//       {socialLinks?.map((link) => (
//         <li key={link.label} className="p-2 bg-green/10 rounded-full">
//           <Link
//             href={link.href}
//             className="text-gray font-light"
//             aria-label={link.label}
//           >
//             <link.icon size={18} className="text-main" />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   const handleCurrencyConverterClick = (converter: string) => {
//     const currencyCode = converter.split(" ")[0];
//     setSelectedSendCurrency(currencyCode);
//     router.push("/"); // Redirect to the homepage (where HeroSection is)
//   };

//   return (
//     // ... (rest of the Footer JSX remains the same, except for the onClick) ...
//     <footer className="py-12">
//       <div className="container mx-auto px-4 ">
//         <div className="inline-flex items-center w-full mb-12">
//           <Image src="/assets/images/wise-logo.svg" alt="logo" height={100} width={100} />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               {/* Heading and Toggle (Common to both views) */}
//               <div
//                 className={`${
//                   isMobile
//                     ? "flex justify-between items-center pb-4 cursor-pointer"
//                     : "pb-4"
//                 }`}
//                 onClick={
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//               >
//                 <h3 className="text-green md:text-2xl text-xl font-semibold">
//                   {section.title}
//                 </h3>
//                 {isMobile && (
//                   <button
//                     aria-expanded={openDropdown === section.title}
//                     aria-controls={`${section.title.toLowerCase()}-dropdown-menu`}
//                   >
//                     {openDropdown === section.title ? (
//                       <HiX size={24} className="text-green" />
//                     ) : (
//                       <TiArrowSortedDown size={24} className="text-green" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Conditionally Rendered Content with Animation */}
//               <AnimatePresence>
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.links && ( // Corrected condition
//                     <motion.div
//                       key={`${section.title}-links`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderLinkList(section.links)}
//                     </motion.div>
//                   )}

//                 {/* Conditionally render social links with animation */}
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.socialLinks && ( //correct condition
//                     <motion.div
//                       key={`${section.title}-social`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderSocialLinks(section.socialLinks)}
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>

//         {/* ... (rest of the footer: currency converters, copyright, etc.) ... */}
//         <hr className="my-6" />
//         <div>
//           <h3 className="text-green text-lg font-semibold pb-4">
//             Currency Converters
//           </h3>

//           {/* currency converters */}
//           <div className="flex flex-wrap">
//             {footerData.currencyConverters.map((pair, index) => (
//               <div className="text-gray font-light" key={pair}>
//                 <div className="relative group w-fit inline-block">
//                   <button
//                     className="relative z-10"
//                     onClick={() => handleCurrencyConverterClick(pair)} // Add click handler
//                   >
//                     {pair}
//                   </button>
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//                 </div>
//                 {index !== footerData.currencyConverters.length - 1 && (
//                   <span className="mx-4">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="space-y-4 text-center">
//           <p className="text-green font-medium">{footerData.copyright}</p>
//           <p className="text-gray font-light">{footerData.disclaimer}</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // app/components/Footer.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAppContext } from "../../contexts/WebsiteAppContext";
// import { useRouter } from "next/navigation";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { FaTelegram } from "react-icons/fa";
// import { ReactNode } from "react";

// interface FooterLink {
//   href: string;
//   label: string | ReactNode;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   copyright: string;
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "/", label: "Home" },
//           { href: "/about-us", label: "About" },
//           { href: "/features", label: "Features" },
//           { href: "/reviews", label: "Reviews" },
//         ],
//       },
//       {
//         title: "Help",
//         links: [
//           { href: "/privacy-policy", label: "Privacy Policy" },
//           {
//             href: "/terms-and-conditions",
//             label: <>Terms and Conditions</>,
//           },
//           { href: "#faq", label: "FAQs" },
//         ],
//       },
//     ],

//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     copyright: `Apexture Payments Limited @${new Date().getFullYear()}`,
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const { setSelectedSendCurrency } = useAppContext();
//   const router = useRouter();

//   const toggleDropdown = (title: string) => {
//     setOpenDropdown(openDropdown === title ? null : title);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     <ul className="space-y-3 text-mainheading font-medium dark:text-white">
//       {links?.map((link) => (
//         <li key={link.href}>
//           <div className="relative group w-fit lg:text-base text-sm">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     <ul className="flex flex-col w-fit gap-4">
//       {socialLinks?.map((link) => (
//         <li
//           key={link.href}
//           className="p-2.5 bg-black/10 dark:bg-secondary inline-block rounded-full group transition-colors ease-in-out duration-300"
//         >
//           <Link
//             href={link.href}
//             className="text-gray-500 dark:text-gray-300"
//             aria-label={typeof link.label === "string" ? link.label : undefined}
//           >
//             {link.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   const handleCurrencyConverterClick = (converter: string) => {
//     const currencyCode = converter.split(" ")[0];
//     setSelectedSendCurrency(currencyCode);
//     router.push("/");
//   };

//   return (
//     <footer className="bg-white dark:bg-background px-4 pb-6">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-start w-full lg:gap-6">
//         <div className="flex flex-col">
//           <Image
//             src="/assets/images/wise-logo.svg"
//             alt="logo"
//             height={100}
//             width={100}
//             className="lg:size-28  size-18"
//           />

//           <p className="max-w-3xl text-mainheading dark:text-white lg:text-lg text-sm">
//             We provide reliable and competitive currency exchange services with
//             real-time rates, secure transactions, and excellent customer
//             support. Whether you're traveling, investing, or sending money
//             abroad, trust us to handle your currency needs with transparency and
//             speed.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 space-y-2.5 mt-4">
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               <div
//                 className={`${
//                   isMobile
//                     ? "flex items-center justify-between gap-2 lg:pb-4 pb-2 cursor-pointer"
//                     : "pb-4"
//                 }`}
//                 onClick={
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//               >
//                 <h3 className="text-lime-500 dark:text-primary lg:text-xl font-medium">
//                   {section.title}
//                 </h3>

//                 {isMobile && (
//                   <button
//                     aria-expanded={openDropdown === section.title}
//                     aria-controls={`${section.title.toLowerCase()}-dropdown-menu`}
//                   >
//                     {openDropdown === section.title ? (
//                       <HiX className="dark:text-white text-mainheading size-4 mt-0.5" />
//                     ) : (
//                       <TiArrowSortedDown className="dark:text-white text-mainheading size-4 mt-0.5" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               <AnimatePresence>
//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.links && (
//                     <motion.div
//                       key={`${section.title}-links`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderLinkList(section.links)}
//                     </motion.div>
//                   )}

//                 {(!isMobile || (isMobile && openDropdown === section.title)) &&
//                   section.socialLinks && (
//                     <motion.div
//                       key={`${section.title}-social`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       {renderSocialLinks(section.socialLinks)}
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       <hr className="lg:my-6 my-2 container mx-auto" />
//       <div className="container mx-auto">
//         <h3 className="text-lime-500 lg:text-lg text-base font-semibold pb-4">
//           Currency Converters
//         </h3>

//         <div className="flex flex-wrap">
//           {footerData.currencyConverters.map((pair, index) => (
//             <div className="text-mainheading dark:text-white" key={pair}>
//               <div className="relative group w-fit inline-block">
//                 <button
//                   className="relative z-10 cursor-pointer text-sm lg:text-base"
//                   onClick={() => handleCurrencyConverterClick(pair)}
//                 >
//                   {pair}
//                 </button>
//                 <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//               </div>
//               {index !== footerData.currencyConverters.length - 1 && (
//                 <span className="mx-4">|</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <hr className="container mx-auto my-5" />
//       <div className="flex justify-between items-center container mx-auto">
//         <p className="text-mainheading dark:text-primary lg:text-lg text-sm">
//           {footerData.copyright}
//         </p>
//         <div className="flex gap-2">
//           <a href="">
//             <IoLogoWhatsapp className="lg:size-8 size-6 text-[#25D366]" />
//           </a>
//           <a href="">
//             <FaTelegram className="lg:size-8 size-6 text-[#3390EC]" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // app/components/Footer.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAppContext } from "../../contexts/WebsiteAppContext";
// import { useRouter } from "next/navigation";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { FaTelegram } from "react-icons/fa";
// import { ReactNode } from "react";

// interface FooterLink {
//   href: string;
//   label: string | ReactNode;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   copyright: string;
//   disclaimer: string; // Added disclaimer based on original text, though not explicitly used in layout provided
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "/", label: "Home" },
//           { href: "/about-us", label: "About" },
//           { href: "/features", label: "Features" },
//           { href: "/reviews", label: "Reviews" },
//         ],
//       },
//       {
//         title: "Help",
//         links: [
//           { href: "/privacy-policy", label: "Privacy Policy" },
//           {
//             href: "/terms-and-conditions",
//             label: <>Terms and Conditions</>,
//           },
//           { href: "#faq", label: "FAQs" }, // Assuming FAQ might be a section on the page
//         ],
//       },
//     ],

//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     copyright: `Apexture Payments Limited @${new Date().getFullYear()}`,
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   // --- CHANGE HERE ---
//   // Initialize openDropdown state with "Company" to make it active by default on mobile
//   const [openDropdown, setOpenDropdown] = useState<string | null>("Company");
//   // --- END CHANGE ---

//   const [isMobile, setIsMobile] = useState(false);
//   const { setSelectedSendCurrency } = useAppContext();
//   const router = useRouter();

//   const toggleDropdown = (title: string) => {
//     setOpenDropdown(openDropdown === title ? null : title);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const mobileCheck = window.innerWidth < 768; // Use md breakpoint (768px) for consistency with grid classes
//       setIsMobile(mobileCheck);
//       // If screen becomes non-mobile, ensure dropdowns are conceptually 'open' (as they are always visible)
//       // If screen becomes mobile, retain the currently open dropdown or the default ("Company")
//       if (!mobileCheck) {
//         setOpenDropdown(null); // Resetting might be clearer for desktop logic, though visibility isn't controlled by this state there
//       } else {
//         // If it becomes mobile and nothing was selected (e.g. resized from desktop), default to "Company"
//         // If already mobile, keep the current state
//         if (openDropdown === null) {
//           setOpenDropdown("Company");
//         }
//       }
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);

//     // Check initial state on mount as well, specifically for mobile
//     if (window.innerWidth < 768 && openDropdown === null) {
//       setOpenDropdown("Company");
//     }

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [openDropdown]); // Add openDropdown dependency to handle edge case on resize

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     <ul className="space-y-3 text-mainheading font-medium dark:text-white">
//       {links?.map((link) => (
//         <li key={link.href}>
//           <div className="relative group w-fit lg:text-base text-sm">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     <ul className="flex flex-col w-fit gap-4">
//       {socialLinks?.map((link) => (
//         <li
//           key={link.href}
//           className="p-2.5 bg-black/10 dark:bg-secondary inline-block rounded-full group transition-colors ease-in-out duration-300"
//         >
//           <Link
//             href={link.href}
//             className="text-gray-500 dark:text-gray-300"
//             aria-label={typeof link.label === "string" ? link.label : undefined}
//           >
//             {link.label} {/* Assuming label is the icon component */}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   const handleCurrencyConverterClick = (converter: string) => {
//     const currencyCode = converter.split(" ")[0];
//     // Ensure useAppContext provides setSelectedSendCurrency
//     if (setSelectedSendCurrency) {
//       setSelectedSendCurrency(currencyCode);
//     }
//     router.push("/"); // Navigate to home page after setting currency
//   };

//   return (
//     <footer className="bg-white dark:bg-background px-4 pb-6 pt-8  border-t">
//       {/* Added pt-8 for spacing */}
//       <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start w-full lg:gap-12">
//         {/* Increased gap */}
//         {/* Logo and Description Section */}
//         <div className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0">
//           <Image
//             src="/assets/images/wise-logo.svg" // Ensure this path is correct
//             alt="7Wise logo"
//             height={100} // Adjusted size
//             width={100} // Adjusted size
//             className="mb-4 lg:h-10 h-5 -ml-2" // Removed specific size classes, using width/height props
//           />
//           <p className="text-mainheading dark:text-white lg:text-lg text-sm leading-relaxed">
//             {/* Adjusted text size and leading */}
//             We provide reliable and competitive currency exchange services with
//             real-time rates, secure transactions, and excellent customer
//             support. Whether you're traveling, investing, or sending money
//             abroad, trust us to handle your currency needs with transparency and
//             speed.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full lg:w-1/3">
//           {/* Added gaps */}
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               {/* Section Header (Mobile Accordion Trigger) */}
//               <div
//                 className={`flex items-center justify-between lg:pb-4 pb-2 ${
//                   isMobile ? "cursor-pointer" : ""
//                 }`}
//                 onClick={
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//                 aria-expanded={isMobile ? openDropdown === section.title : true} // Aria expanded relevant for mobile
//                 aria-controls={
//                   isMobile
//                     ? `${section.title.toLowerCase()}-dropdown-menu`
//                     : undefined
//                 }
//               >
//                 <h3 className="text-lime-500 dark:text-primary lg:text-lg text-base font-semibold">
//                   {section.title}
//                 </h3>
//                 {isMobile && ( // Only show icons on mobile
//                   <button
//                     className="text-mainheading dark:text-white" // Consistent icon color
//                     aria-label={
//                       openDropdown === section.title
//                         ? `Collapse ${section.title} section`
//                         : `Expand ${section.title} section`
//                     }
//                   >
//                     {openDropdown === section.title ? (
//                       <HiX className="size-5" /> // Slightly larger icon
//                     ) : (
//                       <TiArrowSortedDown className="size-5" /> // Slightly larger icon
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Section Content (Mobile Accordion Content) */}
//               <AnimatePresence initial={false}>
//                 {/* Set initial=false for Framer Motion > 2.0 to respect initial state */}
//                 {(!isMobile ||
//                   (isMobile && openDropdown === section.title)) && (
//                   <motion.div
//                     id={
//                       isMobile
//                         ? `${section.title.toLowerCase()}-dropdown-menu`
//                         : undefined
//                     }
//                     key={`${section.title}-content`} // Unique key for motion component
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     style={{ overflow: "hidden" }} // Keep overflow hidden during animation
//                   >
//                     {section.links && renderLinkList(section.links)}
//                     {section.socialLinks &&
//                       renderSocialLinks(section.socialLinks)}
//                     {/* Add a little padding below the content inside the accordion */}
//                     <div className="pt-2"></div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Currency Converters Section */}
//       <hr className="lg:my-8 my-6 container mx-auto" />
//       {/* Adjusted margin and color */}
//       <div className="container mx-auto">
//         <h3 className="text-lime-500 dark:text-primary lg:text-lg text-base font-semibold pb-4">
//           Currency Converters
//         </h3>
//         <div className="flex flex-wrap gap-x-4 gap-y-2">
//           {/* Added gaps for wrapping items */}
//           {footerData.currencyConverters.map((pair, index) => (
//             <div
//               className="text-mainheading dark:text-white flex items-center"
//               key={pair}
//             >
//               {/* Use flex for alignment */}
//               <div className="relative group inline-block">
//                 <button
//                   className="relative z-10 cursor-pointer text-sm lg:text-base hover:text-lime-600 dark:hover:text-primary transition-colors" // Added hover effect
//                   onClick={() => handleCurrencyConverterClick(pair)}
//                 >
//                   {pair}
//                 </button>
//                 <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//               </div>
//               {index !== footerData.currencyConverters.length - 1 && (
//                 <span className="mx-2 text-gray-400 dark:text-gray-600">|</span> // Adjusted margin and color
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Copyright and Social Icons Section */}
//       <hr className="container mx-auto lg:my-8 my-6" />{" "}
//       {/* Adjusted margin and color */}
//       <div className="flex flex-col md:flex-row justify-between items-center container mx-auto gap-4">
//         {/* Added gap for spacing */}
//         <p className="text-mainheading dark:text-primary lg:text-base text-sm text-center md:text-left">
//           {/* Adjusted text size and alignment */}
//           {footerData.copyright}
//         </p>
//         <div className="flex gap-4">
//           {/* Increased gap */}
//           {/* Ensure you have actual links for these */}
//           <a href="#" aria-label="Chat on WhatsApp">
//             <IoLogoWhatsapp className="lg:size-7 size-6 text-[#25D366] hover:opacity-80 transition-opacity" />{" "}
//             {/* Adjusted size, added hover */}
//           </a>
//           <a href="#" aria-label="Contact us on Telegram">
//             <FaTelegram className="lg:size-7 size-6 text-[#3390EC] hover:opacity-80 transition-opacity" />{" "}
//             {/* Adjusted size, added hover */}
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // app/components/Footer.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { HiX } from "react-icons/hi";
// import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAppContext } from "../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useRouter } from "next/navigation";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { FaTelegram } from "react-icons/fa";
// import { ReactNode } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// interface FooterLink {
//   href: string;
//   label: string | ReactNode;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "/", label: "Home" },
//           { href: "/about-us", label: "About" },
//           { href: "/features", label: "Features" },
//           { href: "/reviews", label: "Reviews" },
//         ],
//       },
//       {
//         title: "Help",
//         links: [
//           { href: "/privacy-policy", label: "Privacy Policy" },
//           {
//             href: "/terms-and-conditions",
//             label: <>Terms and Conditions</>,
//           },
//           { href: "/faqs", label: "FAQs" }, // Assuming FAQ might be a section on the page
//         ],
//       },
//     ],

//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   // --- STATE ---
//   // Start with "Company" open by default for mobile experience
//   const [openDropdown, setOpenDropdown] = useState<string | null>("Company");
//   const [isMobile, setIsMobile] = useState(false);
//   // --- END STATE ---

//   const { setSelectedSendCurrency } = useAppContext();
//   const router = useRouter();

//   // --- TOGGLE FUNCTION ---
//   // This function correctly handles opening and closing
//   const toggleDropdown = (title: string) => {
//     setOpenDropdown((currentOpen) => (currentOpen === title ? null : title));
//   };
//   // --- END TOGGLE FUNCTION ---

//   // --- EFFECT FOR RESIZE ---
//   useEffect(() => {
//     // Function to check window size and update isMobile state
//     const handleResize = () => {
//       const mobileCheck = window.innerWidth < 768; // md breakpoint
//       setIsMobile(mobileCheck);
//       // Optional: If resizing TO desktop, you might want to ensure all accordions appear open
//       // by setting openDropdown to null, but the conditional rendering already handles visibility.
//       // We don't need to force 'Company' open here on every resize, only check the screen size.
//     };

//     // Initial check on component mount
//     handleResize();

//     // Add resize event listener
//     window.addEventListener("resize", handleResize);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []); // Empty dependency array: runs only once on mount for setup and cleanup on unmount
//   // --- END EFFECT ---

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     <ul className="space-y-3 text-mainheading font-medium dark:text-white pt-2">
//       {links?.map((link) => (
//         <li key={link.href}>
//           <div className="relative group w-fit lg:text-base text-sm">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const renderSocialLinks = (socialLinks: SocialLink[] | undefined) => (
//     <ul className="flex flex-col w-fit gap-4">
//       {socialLinks?.map((link) => (
//         <li
//           key={link.href}
//           className="p-2.5 bg-black/10 dark:bg-secondary inline-block rounded-full group transition-colors ease-in-out duration-300"
//         >
//           <Link
//             href={link.href}
//             className="text-gray-500 dark:text-gray-300"
//             aria-label={typeof link.label === "string" ? link.label : undefined}
//           >
//             {link.label} {/* Assuming label is the icon component */}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   const handleCurrencyConverterClick = (converter: string) => {
//     const currencyCode = converter.split(" ")[0];
//     if (setSelectedSendCurrency) {
//       setSelectedSendCurrency(currencyCode);
//     }
//     router.push("/");
//   };

//   return (
//     <footer className="bg-white dark:bg-background px-4 pb-6 pt-8">
//       <div className="container mx-auto flex flex-col lg:flex-row justify-between w-full">
//         {/* Logo and Description Section */}
//         <div className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0">
//           <Image
//             src="/assets/images/wise-logo.svg" // Ensure this path is correct
//             alt="7Wise logo"
//             height={100} // Adjusted size
//             width={100} // Adjusted size
//             className="mb-4 lg:h-14 h-6"
//           />
//           <p className="text-mainheading dark:text-white lg:text-lg text-sm leading-relaxed">
//             {/* Adjusted text size and leading */}
//             We provide reliable and competitive currency exchange services with
//             real-time rates, secure transactions, and excellent customer
//             support. Whether you're traveling, investing, or sending money
//             abroad, trust us to handle your currency needs with transparency and
//             speed.
//           </p>
//         </div>

//         <div className="grid grid-cols-1  md:grid-cols-2 lg:gap-y-6 gap-y-4 w-full lg:w-1/4">
//           {footerData.sections.map((section) => (
//             <div key={section.title}>
//               {/* Section Header (Mobile Accordion Trigger) */}
//               <div
//                 className={`flex items-center justify-between lg:pb-4 pb-2 ${
//                   isMobile ? "cursor-pointer" : "" // Make header clickable only on mobile
//                 }`}
//                 onClick={
//                   // Assign toggle only if mobile
//                   isMobile ? () => toggleDropdown(section.title) : undefined
//                 }
//                 // Add accessibility attributes for the accordion header
//                 role={isMobile ? "button" : undefined}
//                 aria-expanded={isMobile ? openDropdown === section.title : true}
//                 aria-controls={
//                   isMobile
//                     ? `${section.title.toLowerCase()}-dropdown-menu`
//                     : undefined
//                 }
//                 tabIndex={isMobile ? 0 : -1} // Make it focusable on mobile
//               >
//                 <h3 className="text-lime-500 dark:text-primary lg:text-lg text-base font-semibold">
//                   {section.title}
//                 </h3>
//                 {/* Icon container - important: don't put onClick here, keep it on parent div */}
//                 {isMobile && (
//                   <span className="text-mainheading dark:text-white pointer-events-none">
//                     {/* Prevent nested clicks */}
//                     {openDropdown === section.title ? (
//                       <FiChevronDown className="size-4" />
//                     ) : (
//                       <FiChevronUp className="size-4" />
//                     )}
//                   </span>
//                 )}
//               </div>

//               {/* Section Content (Mobile Accordion Content) */}
//               <AnimatePresence initial={false}>
//                 {/* Show content if NOT mobile OR if mobile AND it's the open dropdown */}
//                 {(!isMobile ||
//                   (isMobile && openDropdown === section.title)) && (
//                   <motion.div
//                     id={
//                       isMobile
//                         ? `${section.title.toLowerCase()}-dropdown-menu`
//                         : undefined
//                     }
//                     key={`${section.title}-content`}
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     style={{ overflow: "hidden" }}
//                     // Add role region for accessibility
//                     role="region"
//                     aria-labelledby={
//                       isMobile
//                         ? section.title.toLowerCase() + "-heading"
//                         : undefined
//                     } // Assuming h3 gets an id
//                   >
//                     {/* Render links or social links */}
//                     {section.links && renderLinkList(section.links)}
//                     {section.socialLinks &&
//                       renderSocialLinks(section.socialLinks)}
//                     {/* Add padding below content inside accordion for spacing */}
//                     <div className="pt-2"></div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Currency Converters Section */}
//       <hr className="lg:my-4 my-2 container mx-auto" />
//       <div className="container mx-auto">
//         <h3 className="text-lime-500 dark:text-primary lg:text-lg text-base font-semibold pb-4">
//           Currency Converters
//         </h3>
//         <div className="flex flex-wrap gap-x-4 gap-y-2">
//           {footerData.currencyConverters.map((pair, index) => (
//             <div
//               className="text-mainheading dark:text-white flex items-center"
//               key={pair}
//             >
//               <div className="relative group inline-block">
//                 <button
//                   className="relative z-10 cursor-pointer text-sm lg:text-base hover:text-lime-600 dark:hover:text-primary transition-colors"
//                   onClick={() => handleCurrencyConverterClick(pair)}
//                 >
//                   {pair}
//                 </button>
//                 <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mainheading dark:bg-primary transform scale-x-0 origin-right transition-transform duration-300 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//               </div>
//               {index !== footerData.currencyConverters.length - 1 && (
//                 <span className="mx-2 text-gray-400 dark:text-gray-600">|</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Copyright and Social Icons Section */}
//       <hr className="container mx-auto lg:my-6 my-4" />
//       <div className="flex flex-col md:flex-row justify-between items-center container mx-auto gap-4">
//         <p className="text-mainheading dark:text-primary capitalize lg:text-base text-sm text-center md:text-left">
//           <span className="text-gray-500 dark:text-gray-300">create by,</span> Apexture Private Limited @{new Date().getFullYear()}
//         </p>
//         <div className="flex lg:gap-4 gap-2">
//           <a href="#" aria-label="Chat on WhatsApp">
//             {/* Replace # with actual link */}
//             <IoLogoWhatsapp className="lg:size-7 size-6 text-[#25D366] hover:opacity-80 transition-opacity" />
//           </a>
//           <a href="#" aria-label="Contact us on Telegram">
//             {/* Replace # with actual link */}
//             <FaTelegram className="lg:size-7 size-6 text-[#3390EC] hover:opacity-80 transition-opacity" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // app/components/Footer.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { IconType } from "react-icons";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAppContext } from "../../contexts/WebsiteAppContext"; // Adjust path if needed
// import { useRouter } from "next/navigation";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { FaTelegram } from "react-icons/fa";
// import { ReactNode } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// interface FooterLink {
//   href: string;
//   label: string | ReactNode;
// }

// interface SocialLink extends FooterLink {
//   icon: IconType;
// }

// interface FooterSection {
//   title: string;
//   links?: FooterLink[];
//   socialLinks?: SocialLink[];
// }

// interface FooterData {
//   sections: FooterSection[];
//   currencyConverters: string[];
//   disclaimer: string;
// }

// const Footer: React.FC = () => {
//   const footerData: FooterData = {
//     sections: [
//       {
//         title: "Company",
//         links: [
//           { href: "/", label: "Home" },
//           { href: "/about-us", label: "About" },
//           { href: "/features", label: "Features" },
//           { href: "/reviews", label: "Reviews" },
//         ],
//       },
//       {
//         title: "Help",
//         links: [
//           { href: "/privacy-policy", label: "Privacy Policy" },
//           {
//             href: "/terms-and-conditions",
//             label: <>Terms and Conditions</>,
//           },
//           { href: "/faqs", label: "FAQs" }, // Assuming FAQ might be a section on the page
//         ],
//       },
//     ],

//     currencyConverters: [
//       "USD to INR",
//       "AED to INR",
//       "AUD to INR",
//       "CAD to INR",
//       "EUR to INR",
//     ],
//     disclaimer:
//       "Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise works with a local bank partner to offer the service in India with the approval of the Reserve Bank of India.",
//   };

//   // --- STATE ---
//   // Start with "Company" open by default for mobile experience
//   const [openDropdown, setOpenDropdown] = useState<string | null>("Company");
//   const [isMobile, setIsMobile] = useState(false);
//   // --- END STATE ---

//   const { setSelectedSendCurrency } = useAppContext();
//   const router = useRouter();

//   // --- TOGGLE FUNCTION ---
//   // This function correctly handles opening and closing
//   const toggleDropdown = (title: string) => {
//     setOpenDropdown((currentOpen) => (currentOpen === title ? null : title));
//   };
//   // --- END TOGGLE FUNCTION ---

//   // --- EFFECT FOR RESIZE ---
//   useEffect(() => {
//     // Function to check window size and update isMobile state
//     const handleResize = () => {
//       const mobileCheck = window.innerWidth < 640; // md breakpoint
//       setIsMobile(mobileCheck);
//       // Optional: If resizing TO desktop, you might want to ensure all accordions appear open
//       // by setting openDropdown to null, but the conditional rendering already handles visibility.
//       // We don't need to force 'Company' open here on every resize, only check the screen size.
//     };

//     // Initial check on component mount
//     handleResize();

//     // Add resize event listener
//     window.addEventListener("resize", handleResize);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []); // Empty dependency array: runs only once on mount for setup and cleanup on unmount
//   // --- END EFFECT ---

//   const renderLinkList = (links: FooterLink[] | undefined) => (
//     <ul className="space-y-3 py-2">
//       {links?.map((link) => (
//         <li key={link.href}>
//           <div className="relative group w-fit  text-neutral-900 dark:text-white font-medium lg:text-base text-sm">
//             <Link href={link.href} className="relative z-10">
//               {link.label}
//             </Link>
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900 dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   const handleCurrencyConverterClick = (converter: string) => {
//     const currencyCode = converter.split(" ")[0];
//     if (setSelectedSendCurrency) {
//       setSelectedSendCurrency(currencyCode);
//     }
//     router.push("/");
//   };

//   return (
//     <footer className="bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className=" flex flex-col lg:flex-row justify-between w-full">
//           <div className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0">
//             <Link href="/">
//               <Image
//                 src="/assets/images/white_logo.svg"
//                 alt="Wise Logo"
//                 width={160}
//                 height={50}
//                 priority
//                 className=" mb-4 w-40 h-auto dark:hidden block"
//               />

//               <Image
//                 src="/assets/images/dark_logo.svg"
//                 alt="Wise Logo"
//                 width={160}
//                 height={50}
//                 priority
//                 className="mb-4 w-40 h-auto dark:block hidden"
//               />
//             </Link>
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//               {/* Adjusted text size and leading */}
//               We provide reliable and competitive currency exchange services
//               with real-time rates, secure transactions, and excellent customer
//               support. Whether you're traveling, investing, or sending money
//               abroad, trust us to handle your currency needs with transparency
//               and speed.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-y-6 gap-y-4 w-full lg:w-1/4">
//             {footerData.sections.map((section) => (
//               <div key={section.title}>
//                 {/* Section Header (Mobile Accordion Trigger) */}
//                 <div
//                   className={`flex items-center justify-between lg:pb-4 pb-2 ${
//                     isMobile ? "cursor-pointer" : "" // Make header clickable only on mobile
//                   }`}
//                   onClick={
//                     // Assign toggle only if mobile
//                     isMobile ? () => toggleDropdown(section.title) : undefined
//                   }
//                   // Add accessibility attributes for the accordion header
//                   role={isMobile ? "button" : undefined}
//                   aria-expanded={
//                     isMobile ? openDropdown === section.title : true
//                   }
//                   aria-controls={
//                     isMobile
//                       ? `${section.title.toLowerCase()}-dropdown-menu`
//                       : undefined
//                   }
//                   tabIndex={isMobile ? 0 : -1} // Make it focusable on mobile
//                 >
//                   <h3 className="text-primary lg:text-lg text-base font-semibold">
//                     {section.title}
//                   </h3>
//                   {/* Icon container - important: don't put onClick here, keep it on parent div */}
//                   {isMobile && (
//                     <span className="text-mainheading dark:text-white pointer-events-none">
//                       {/* Prevent nested clicks */}
//                       {openDropdown === section.title ? (
//                         <FiChevronUp className="size-4" />
//                       ) : (
//                         <FiChevronDown className="size-4" />
//                       )}
//                     </span>
//                   )}
//                 </div>

//                 {/* Section Content (Mobile Accordion Content) */}
//                 <AnimatePresence initial={false}>
//                   {/* Show content if NOT mobile OR if mobile AND it's the open dropdown */}
//                   {(!isMobile ||
//                     (isMobile && openDropdown === section.title)) && (
//                     <motion.div
//                       id={
//                         isMobile
//                           ? `${section.title.toLowerCase()}-dropdown-menu`
//                           : undefined
//                       }
//                       key={`${section.title}-content`}
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       style={{ overflow: "hidden" }}
//                       // Add role region for accessibility
//                       role="region"
//                       aria-labelledby={
//                         isMobile
//                           ? section.title.toLowerCase() + "-heading"
//                           : undefined
//                       } // Assuming h3 gets an id
//                     >
//                       {/* Render links or social links */}
//                       {section.links && renderLinkList(section.links)}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Currency Converters Section */}
//         <hr className="lg:my-6 my-4" />
//         <div className="Currency-Convertors">
//           <h3 className="text-primary lg:text-lg text-base font-semibold pb-4">
//             Currency Converters
//           </h3>
//           <div className="flex flex-wrap gap-y-2">
//             {footerData.currencyConverters.map((pair, index) => (
//               <div className="flex items-center" key={pair}>
//                 <div className="relative group inline-block">
//                   <button
//                     className="relative z-10 cursor-pointer text-sm lg:text-base text-neutral-900 dark:text-white"
//                     onClick={() => handleCurrencyConverterClick(pair)}
//                   >
//                     {pair}
//                   </button>
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900 dark:bg-primary transform scale-x-0 origin-right transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100"></span>
//                 </div>
//                 {index !== footerData.currencyConverters.length - 1 && (
//                   <span className="mx-4 text-gray-500 dark:text-gray-300">
//                     |
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Copyright and Social Icons Section */}
//         <hr className="lg:my-6 my-4" />
//         <div className="flex flex-col md:flex-row justify-between items-center container mx-auto gap-4">
//           <p className="text-mainheading dark:text-primary capitalize lg:text-base text-sm text-center md:text-left">
//             <span className="text-gray-500 dark:text-gray-300">
//               Created by{" "}
//             </span>
//             <span className="font-medium">Apexture Private Limited</span> ©{" "}
//             {new Date().getFullYear()}
//           </p>
//           <div className="flex lg:gap-4 gap-2 pb-10 sm:pb-0">
//             <Link href="#" aria-label="Chat on WhatsApp">
//               {/* Replace # with actual link */}
//               <IoLogoWhatsapp className="lg:size-7 size-6 text-[#25D366] hover:opacity-80 transition-opacity" />
//             </Link>
//             <Link href="#" aria-label="Contact us on Telegram">
//               {/* Replace # with actual link */}
//               <FaTelegram className="lg:size-7 size-6 text-[#3390EC] hover:opacity-80 transition-opacity" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// app/components/Footer.tsx
"use client";
import Link from "next/link";
import { IconType } from "react-icons";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaTwitter } from "react-icons/fa"; // FaLinkedinIn was imported but not used, FaLinkedin is used.
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { useRouter } from "next/navigation"; // Added for currency converter logic
import { useAppContext } from "../../contexts/WebsiteAppContext"; // Added for currency converter logic - Adjust path if needed

interface NavLinkItem {
  href: string;
  label: string;
}

interface ContactInfoItem {
  icon: IconType;
  text: string;
  href?: string;
  ariaLabel?: string;
}

interface SocialLinkItem {
  icon: IconType;
  href: string;
  label: string; // for aria-label
}

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faqs", label: "Help" },
];

const contactInfo: ContactInfoItem[] = [
  {
    icon: MdEmail,
    text: "hello@skillbirdge.com",
    href: "mailto:hello@skillbirdge.com",
    ariaLabel: "Email us at hello@skillbirdge.com",
  },
  {
    icon: MdPhone,
    text: "+91 8849498140",
    href: "tel:+91 8849498140",
    ariaLabel: "Call us at +91 91813 23 2309",
  },
  {
    icon: MdLocationOn,
    text: "Somewhere in the World",
    ariaLabel: "Our location: Somewhere in the World ",
  },
];

const socialLinks: SocialLinkItem[] = [
  { icon: FaFacebook, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: FaTwitter, href: "https://x.com/home", label: "Twitter" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/apextureprivatelimited/posts/?feedView=all",
    label: "LinkedIn",
  },
];

const copyrightText = "Remityn. All Rights Reserved";
const currentYear = new Date().getFullYear();

// Data for Currency Converters
const currencyConverterLinksData = [
  "USD to INR",
  "AED to INR",
  "AUD to INR",
  "CAD to INR",
  "EUR to INR",
];

const Footer: React.FC = () => {
  const router = useRouter();
  const { setSelectedSendCurrency } = useAppContext(); // Ensure WebsiteAppContext is provided in your app

  const handleCurrencyConverterClick = (converter: string) => {
    const currencyCode = converter.split(" ")[0];
    if (setSelectedSendCurrency) {
      setSelectedSendCurrency(currencyCode);
    }
    router.push("/"); // Navigate to home page or a relevant page
  };

  return (
    <footer className="lg:py-20 py-10">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo and Nav Links */}
        <div className="flex flex-col items-center ">
          {/* Logo */}
          <div className="sm:mb-12.5 mb-7.5">
            {/* Footer-Logo */}
            <Link href="/">
              <Image
                src="/assets/images/main_logo.svg"
                alt="Wise Logo"
                width={160}
                height={50}
                priority
                className="w-46 h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center space-x-6 mb-12.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg lg:text-xl text-subheadingWhite hover:text-primary transition-colors duration-75 ease-linear "
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>


        {/* Mobile Navigation Links (appears below logo, above contact on mobile) */}
        <nav className="sm:hidden flex flex-wrap items-center justify-center gap-3.5 sm:mb-10 mb-7.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-subheadingWhite hover:text-primary transition-colors duration-75 ease-linear"
            >
              {link.label}
            </Link>
          ))}
        </nav>


        {/* Middle Section: Contact Info */}
        <div className="flex items-center flex-row justify-center gap-3.5 sm:text-lg text-base mb-7.5 sm:mb-12.5 shrink-0 flex-wrap border-t border-b py-12.5">
          {contactInfo.map((item, index) => (
            <a // Use <a> tag for mailto and tel links
              key={index}
              href={item.href}
              aria-label={item.ariaLabel}
              target={
                item.href &&
                (item.href.startsWith("mailto:") ||
                  item.href.startsWith("tel:"))
                  ? "_blank"
                  : undefined
              }
              rel={
                item.href &&
                (item.href.startsWith("mailto:") ||
                  item.href.startsWith("tel:"))
                  ? "noopener noreferrer"
                  : undefined
              }
              className={`flex items-center ${
                item.href ? "hover:text-[#A5CC3D]" : "cursor-default"
              } transition-colors duration-200 group`}
            >
              <item.icon className="sm:size-6 size-5 text-primary mr-1.5 transition-colors duration-200 shrink" />
              <span className="text-subheadingWhite max-w-48 sm:max-w-full">
                {item.text}
              </span>
            </a>
          ))}
        </div>


        <div className="Currency-Convertors text-center sm:text-left mb-7.5 sm:mb-12.5">
          <div className="flex flex-wrap justify-center gap-3.5">
            {currencyConverterLinksData.map((pair, index) => (
              <div className="flex items-center" key={pair}>
                <div className="relative group inline-block">
                  <button
                    className="relative z-10 cursor-pointer bg-primary-foreground font-medium hover:bg-primaryhover px-4 py-2 rounded-full sm:text-base text-sm text-subheadingWhite transition-all duration-75 ease-linear hover:text-subheading"
                    onClick={() => handleCurrencyConverterClick(pair)}
                  >
                    {pair}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom Bar: Social, Copyright, Legal */}
        <div className="bg-primary-foreground border-gray-700/50 sm:p-3 p-4 mt-16 pb-8 sm:mt-0 border rounded-xl sm:rounded-full ">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-5 sm:space-y-0">
            {/* Social Media Icons */}
            <div className="flex space-x-3.5 items-center order-1 -mt-10 sm:mt-0">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-mainheading rounded-full flex items-center justify-center
sm:size-13 size-11
transition-all duration-300"
                >
                  <link.icon className="w-5 h-5 sm:size-6" />{" "}
                </a>
              ))}
            </div>

            {/* Copyright Text */}
            <p className="text-subheadingWhite text-center order-2 sm:text-center">
              {copyrightText} © {currentYear}
            </p>

            {/* Legal Links */}
            <div className="flex sm:flex-row items-center gap-3 order-3">
              <Link
                href="/privacy-policy"
                className="text-base text-subheadingWhite hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-subheadingWhite">|</span>
              <Link
                href="/terms-and-conditions"
                className="text-subheadingWhite hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
