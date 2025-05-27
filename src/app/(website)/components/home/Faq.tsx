// import React, { useState, useRef, useEffect, useCallback } from 'react';

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: 'q1',
//     question: 'What is ScopeX?',
//     answer: 'ScopeX is a platform designed to simplify international money transfers, offering competitive rates and fast processing times. We focus on transparency and security for all your transactions.',
//   },
//   {
//     id: 'q2',
//     question: 'What documents do I need to verify my account?',
//     answer: 'Typically, you will need a government-issued photo ID (like a passport or driver\'s license) and sometimes proof of address (like a recent utility bill or bank statement). Requirements may vary slightly by region.',
//   },
//   {
//     id: 'q3',
//     question: 'How fast are ScopeX transfers?',
//     answer: 'Transfer speeds depend on the destination country and the recipient\'s bank. Many transfers are completed within minutes or hours, while some might take 1-2 business days. We always provide an estimated delivery time before you confirm the transfer.',
//   },
//   {
//     id: 'q4',
//     question: 'How much money can I transfer with ScopeX at once?',
//     answer: 'Transfer limits vary based on your verification level and the regulations of the sending and receiving countries. Please check your account details or contact support for specific limits applicable to you.',
//   },
//   {
//     id: 'q5',
//     question: 'What security measures does ScopeX take to safeguard my money?',
//     answer: 'We use industry-standard security protocols, including encryption for data transmission and storage, multi-factor authentication, and regular security audits. Your funds are held securely in segregated accounts with reputable financial institutions.',
//   },
// ];

// const FaqSection: React.FC = () => {
//   // State to track the currently open accordion item's ID (null means none are open)
//   const [openItemId, setOpenItemId] = useState<string | null>(null);

//   // Ref to store references to the content divs for height calculation
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   // Function to toggle an item's open state
//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId(prevOpenId => (prevOpenId === id ? null : id));
//   }, []);

//   // Effect to calculate and set content height for animations
//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         // Temporarily remove hidden to measure scrollHeight if needed,
//         // but setting the style directly might be enough if initially rendered.
//         const scrollHeight = contentDiv.scrollHeight;
//         contentDiv.style.setProperty('--radix-accordion-content-height', `${scrollHeight}px`);
//       }
//     });
//     // Dependency array can be complex; recalculate if faqData changes or window resizes
//     // For simplicity, running once on mount and when openItemId changes might suffice
//     // Add other dependencies like faqData if it can change dynamically
//   }, [openItemId, faqData]); // Re-run if the open item changes or data changes

//   return (
//     <div
//       className="grid items-start gap-14 md:grid-cols-5 md:grid-rows-2"
//       id="faq" // Keep the ID if needed for navigation/linking
//     >
//       {/* Left Column: Title and Description */}
//       <div className="flex flex-col gap-5 self-start md:col-span-2">
//         <h2 className="text-2xl font-medium leading-[125%] text-gray-800 md:text-5xl">
//           Common Questions, <br /> Clear Answers
//         </h2>
//         <p className="text-[1rem] font-normal leading-[140%] text-gray-600 md:text-lg">
//           Find answers to your most frequently asked questions about sending money
//           with ScopeX. Can’t find what you are looking for? Contact our
//           support team.
//         </p>
//       </div>

//       {/* Right Column: Accordion Items */}
//       <div className="md:col-span-3 md:row-span-2">
//         {/* Accordion Container */}
//         <div
//           className="flex flex-col gap-3"
//           data-orientation="vertical" // Keep data attributes if styling relies on them
//         >
//           {faqData.map((item) => {
//             const isOpen = openItemId === item.id;
//             const uniqueTriggerId = `faq-trigger-${item.id}`;
//             const uniqueContentId = `faq-content-${item.id}`;

//             return (
//               <div
//                 key={item.id}
//                 data-state={isOpen ? 'open' : 'closed'}
//                 data-orientation="vertical"
//                 className="rounded-xl bg-white p-5"
//               >
//                 {/* Accordion Header/Trigger */}
//                 <h3
//                   data-orientation="vertical"
//                   data-state={isOpen ? 'open' : 'closed'}
//                   className="flex"
//                 >
//                   <button
//                     type="button"
//                     aria-controls={uniqueContentId}
//                     aria-expanded={isOpen}
//                     data-state={isOpen ? 'open' : 'closed'}
//                     data-orientation="vertical"
//                     id={uniqueTriggerId}
//                     className="flex w-full flex-1 items-center justify-between text-start text-lg font-medium text-[#182230] transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
//                     onClick={() => handleToggle(item.id)}
//                     data-radix-collection-item="" // Keep if needed
//                   >
//                     {item.question}
//                     {/* SVG Icon */}
//                     <svg
//                       width="15"
//                       height="15"
//                       viewBox="0 0 15 15"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
//                         // Using data attribute selector in className for rotation
//                         // Or keep the simple isOpen check: isOpen ? 'rotate-180' : ''
//                       }`}
//                       aria-hidden // Decorative icon
//                     >
//                       <path
//                         d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
//                         fill="currentColor"
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>
//                   </button>
//                 </h3>
//                 {/* Accordion Content Panel */}
//                 <div
//                   ref={(el) => contentRefs.current.set(item.id, el)} // Assign ref to map
//                   data-state={isOpen ? 'open' : 'closed'}
//                   id={uniqueContentId}
//                   role="region"
//                   aria-labelledby={uniqueTriggerId}
//                   data-orientation="vertical"
//                   className="overflow-hidden text-lg leading-[140%] text-[#667085] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//                   // Style is needed for the CSS variable if using the specific keyframes
//                   style={{
//                       // The CSS variable is set dynamically via the useEffect hook
//                   }}
//                   hidden={!isOpen} // Controls visibility for non-JS/initial state & helps animation
//                 >
//                   {/* Inner div for padding, applied only when open */}
//                   <div className="pt-3">
//                      {item.answer}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FaqSection;

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is currency exchange and how does it work? ",
//     answer:
//       "Currency exchange is the process of converting one currency into another, typically for travel, business, or international transactions. The amount you get depends on current exchange rates, which fluctuate based on global market conditions.",
//   },
//   {
//     id: "2",
//     question: "How are currency exchange rates calculated? ",
//     answer:
//       "Exchange rates are influenced by factors like interest rates, inflation, political stability, and market demand. These rates are constantly changing and are set by the foreign exchange (forex) market. Banks and exchange providers may also add a margin to the rate.",
//   },
//   {
//     id: "3",
//     question: "Where can I get the best currency exchange rates? ",
//     answer:
//       "You can get the best currency exchange rates from licensed online platforms, banks, or trusted currency exchange centers. Avoid airport kiosks and hotels, as they often charge higher fees. Always compare rates and check for hidden charges before exchanging.",
//   },
//   {
//     id: "4",
//     question: "Is it better to exchange currency before traveling or after? ",
//     answer:
//       "It’s usually smarter to exchange some currency before you travel to avoid high fees at airports or foreign ATMs. However, using a travel-friendly debit card abroad can also be convenient if it offers low or no foreign transaction fees.",
//   },
//   {
//     id: "5",
//     question: "Are there fees involved in currency exchange? ",
//     answer:
//       "Many banks and exchange services add hidden charges through transaction fees or marked-up rates. However, some modern platforms offer zero-fee currency exchange with transparent, real-time rates. To get truly fee-free service",
//   },
//   {
//     id: "6",
//     question: "What is the best time to exchange currency? ",
//     answer:
//       "The best time is when your local currency is strong compared to the foreign currency you need. Checking live exchange rates and avoiding weekends or holidays—when rates may be less favorable—can help you get better value",
//   }
// ];

// // React Functional Component for the FAQ Section using Accordion Pattern
// const FaqSection: React.FC = () => {
//   const [openItemId, setOpenItemId] = useState<string | null>(null);
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         const scrollHeight = contentDiv.scrollHeight;
//         contentDiv.style.setProperty(
//           "--radix-accordion-content-height",
//           `${scrollHeight}px`
//         );
//       }
//     });
//   }, [openItemId, faqData]);

//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-background">
//       <section
//         className="grid items-start gap-14 md:grid-cols-5 md:grid-rows-2 container mx-auto px-4"
//         id="faq"
//       >
//         <div className="flex flex-col gap-5 self-start md:col-span-2">
//           <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300 mt-5">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </div>

//         <div className="md:col-span-3 md:row-span-2">
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 <div
//                   key={item.id}
//                   data-state={isOpen ? "open" : "closed"}
//                   data-orientation="vertical"
//                   className="rounded-xl bg-white p-5"
//                 >
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       className="flex w-full cursor-pointer flex-1 items-center justify-between text-start text-xl text-mainheading transition-all font-medium [&[data-state=open]>svg]:rotate-180"
//                       onClick={() => handleToggle(item.id)}
//                       data-radix-collection-item=""
//                     >
//                       {item.question}
//                       <SlArrowDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
//                     </button>
//                   </h3>
//                   <div
//                     ref={(el) => {
//                       if (el) {
//                         contentRefs.current.set(item.id, el);
//                       } else {
//                         contentRefs.current.delete(item.id);
//                       }
//                     }}
//                     data-state={isOpen ? "open" : "closed"}
//                     id={uniqueContentId}
//                     role="region"
//                     aria-labelledby={uniqueTriggerId}
//                     data-orientation="vertical"
//                     className="overflow-hidden text-lg leading-relaxed text-gray-500 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//                     style={{}} // CSS variable is set via JS
//                     hidden={!isOpen}
//                   >
//                     <div className="pt-5 pb-1">{item.answer}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";

// import Link from "next/link";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { FaTelegram } from "react-icons/fa6";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Apexture?",
//     answer:
//       "Apexture is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Apexture transfers? ",
//     answer:
//       "Apexture transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Apexture at once? ",
//     answer:
//       "With Apexture, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question: "What security measures does Apexture take to safeguard my money? ",
//     answer:
//       "Apexture uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // React Functional Component for the FAQ Section using Accordion Pattern
// const FaqSection: React.FC = () => {
//   // Initialize state with the ID of the first FAQ item, if faqData is not empty
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   useEffect(() => {
//     // Calculate and set the height for the content div when it's open or when data changes
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         // Always recalculate scrollHeight in case content changes dynamically
//         const scrollHeight = contentDiv.scrollHeight;
//         contentDiv.style.setProperty(
//           "--radix-accordion-content-height", // Ensure this matches your CSS animation if you use one
//           `${scrollHeight}px`
//         );

//         // Additionally, explicitly set height for the initially open item without animation interference
//         // Note: The animation classes might override this, so ensure your CSS handles the initial state correctly
//         if (id === openItemId) {
//           contentDiv.style.height = `${scrollHeight}px`;
//         } else if (contentDiv.style.height !== "0px") {
//           // Only set to 0 if not already closed by animation
//           contentDiv.style.height = "0px";
//         }
//       }
//     });
//   }, [openItemId, faqData]); // Rerun effect if open item or data changes

//   // Ensure initial height is set correctly for the first item on mount
//   useEffect(() => {
//     if (openItemId && contentRefs.current.has(openItemId)) {
//       const initialOpenContent = contentRefs.current.get(openItemId);
//       if (initialOpenContent) {
//         const scrollHeight = initialOpenContent.scrollHeight;
//         initialOpenContent.style.setProperty(
//           "--radix-accordion-content-height",
//           `${scrollHeight}px`
//         );
//         initialOpenContent.style.height = `${scrollHeight}px`; // Set initial height directly
//       }
//     }
//     // Set other items' height to 0 initially
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (id !== openItemId && contentDiv) {
//         contentDiv.style.height = "0px";
//       }
//     });
//   }, []); // Run only once on mount

//   return (
//     <div className="lg:py-10 py-5 bg-[#F2F4F7] dark:bg-background border-b">
//       <section
//         className="grid items-start lg:gap-14 gap-10 lg:grid-cols-5 container mx-auto px-4"
//         id="faq"
//       >
//         <div className="flex flex-col gap-5 self-start md:col-span-2">
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </div>

//         <div className="md:col-span-3 md:row-span-2">
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 <div
//                   key={item.id}
//                   data-state={isOpen ? "open" : "closed"}
//                   data-orientation="vertical"
//                   className="rounded-xl bg-white md:p-6 p-4 dark:bg-white/5" // Added dark mode bg and shadow
//                 >
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       className="flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-gray-100 transition-all font-medium [&[data-state=open]>svg]:rotate-180" // Adjusted text size and dark mode color
//                       onClick={() => handleToggle(item.id)}
//                       data-radix-collection-item=""
//                     >
//                       {item.question}
//                       <SlArrowDown
//                         className={`lg:size-3 size-2.5 shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>
//                   </h3>
//                   <div
//                     ref={(el) => {
//                       if (el) {
//                         contentRefs.current.set(item.id, el);
//                       } else {
//                         contentRefs.current.delete(item.id);
//                       }
//                     }}
//                     data-state={isOpen ? "open" : "closed"}
//                     id={uniqueContentId}
//                     role="region"
//                     aria-labelledby={uniqueTriggerId}
//                     data-orientation="vertical"
//                     // Updated className for smooth transition using height and opacity
//                     className={`overflow-hidden md:text-base text-sm lg:text-lg leading-relaxed text-[#667085] dark:text-gray-300 transition-all duration-300 ease-in-out ${
//                       isOpen ? "mt-4" : "mt-0"
//                     }`}
//                     style={{
//                       height: isOpen ? "auto" : "0px", // Start with auto height when open to let content flow naturally
//                       opacity: isOpen ? 1 : 0,
//                     }}
//                   >
//                     {/* Add padding within the content div itself */}
//                     <div
//                       className={`lg:pt-2 pt-2 pb-1 ${
//                         isOpen ? "visible" : "invisible"
//                       }`}
//                     >
//                       {item.answer}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="lg:col-span-2 md:col-span-3 md:self-end sticky top-0">
//           <div className="flex flex-col items-start gap-5 rounded-2xl bg-white dark:bg-white/5 p-4 md:p-6">
//             <div>
//               <h3 className="md:text-2xl text-lg font-semibold text-gray-900 dark:text-gray-300">
//                 More questions?
//               </h3>
//               <p className="mt-1 lg:text-lg text-xs font-normal text-gray-500 dark:text-gray-300">
//                 We're always ready to help you out.
//               </p>
//             </div>
//             <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap mt-1">
//               <div className="flex gap-2.5">
//                 <a href="">
//                   <IoLogoWhatsapp className="lg:size-8 size-5 text-[#25D366]" />
//                 </a>
//                 <a href="">
//                   <FaTelegram className="lg:size-8 size-5 text-[#3390EC]" />
//                 </a>
//               </div>
//               <Link
//                 href="/faqs"
//                 className="px-4 lg:py-1.5 py-1
//                  rounded-full font-medium lg:text-base text-sm text-mainheading dark:text-primary hover:bg-gray/5 dark:bg-secondary transition-colors duration-300"
//               >
//                 Read more FAQs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";

// import Link from "next/link";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { FaTelegram } from "react-icons/fa6";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Apexture?",
//     answer:
//       "Apexture is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Apexture transfers? ",
//     answer:
//       "Apexture transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Apexture at once? ",
//     answer:
//       "With Apexture, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question:
//       "What security measures does Apexture take to safeguard my money? ",
//     answer:
//       "Apexture uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // React Functional Component for the FAQ Section using Accordion Pattern
// const FaqSection: React.FC = () => {
//   // Initialize state with the ID of the first FAQ item, if faqData is not empty
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   // Use a Map to store refs for each content div
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   // Toggle function: close if clicking the open one, otherwise open the clicked one
//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   // Effect to handle the height transition
//   useEffect(() => {
//     // Iterate over all refs
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         // If this is the currently open item
//         if (id === openItemId) {
//           // Set height to its scrollHeight to open it
//           contentDiv.style.height = `${contentDiv.scrollHeight}px`;
//           // Make sure it's visible (removes potential initial 'invisible' state)
//           contentDiv.style.visibility = "visible";
//           contentDiv.style.opacity = "1"; // Fade in
//         } else {
//           // Otherwise, close it by setting height to 0
//           contentDiv.style.height = "0px";
//           // Optionally hide completely when closed after transition
//           contentDiv.style.visibility = "hidden";
//           contentDiv.style.opacity = "0"; // Fade out
//         }
//       }
//     });
//     // Rerun this effect whenever the openItemId changes
//   }, [openItemId]);

//   // Effect to set initial height correctly on mount (handles default open item)
//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         if (id === openItemId) {
//           // Use requestAnimationFrame to ensure scrollHeight is calculated after layout
//           requestAnimationFrame(() => {
//             contentDiv.style.height = `${contentDiv.scrollHeight}px`;
//             contentDiv.style.visibility = "visible";
//             contentDiv.style.opacity = "1";
//           });
//         } else {
//           contentDiv.style.height = "0px";
//           contentDiv.style.visibility = "hidden";
//           contentDiv.style.opacity = "0";
//         }
//       }
//     });
//   }, []); // Empty dependency array ensures this runs only once on mount

//   return (
//     <div className="lg:py-10 py-5 bg-[#F2F4F7] dark:bg-background border-b">
//       <section
//         className="grid items-start lg:gap-14 gap-5 lg:grid-cols-5 container mx-auto px-4"
//         id="faq"
//       >
//         {/* Left Side: Title and Description */}
//         <div className="flex flex-col gap-5 self-start md:col-span-2">
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>
//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </div>

//         {/* Right Side: Accordion */}
//         <div className="md:col-span-3 md:row-span-2">
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 <div
//                   key={item.id}
//                   data-state={isOpen ? "open" : "closed"}
//                   data-orientation="vertical"
//                   className="rounded-xl bg-white md:p-6 p-4 dark:bg-white/5" // Adjusted padding and dark mode bg
//                 >
//                   {/* Accordion Trigger (Question) */}
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       // Removed [&[data-state=open]>svg]:rotate-180 as we handle rotation directly
//                       className="flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-gray-100 transition-all font-medium hover:underline underline-offset-2"
//                       onClick={() => handleToggle(item.id)}
//                       data-radix-collection-item=""
//                     >
//                       {item.question}
//                       <SlArrowDown
//                         className={`lg:size-3 size-2.5 shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${
//                           // Increased duration slightly
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                         aria-hidden // Add aria-hidden for decorative icons
//                       />
//                     </button>
//                   </h3>

//                   {/* Accordion Content (Answer) */}
//                   <div
//                     ref={(el) => {
//                       // Add or remove the ref from the Map
//                       if (el) {
//                         contentRefs.current.set(item.id, el);
//                       } else {
//                         contentRefs.current.delete(item.id);
//                       }
//                     }}
//                     id={uniqueContentId}
//                     role="region"
//                     aria-labelledby={uniqueTriggerId}
//                     data-state={isOpen ? "open" : "closed"}
//                     data-orientation="vertical"
//                     // Core styles for animation: overflow-hidden and transitions
//                     className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-[#667085] dark:text-gray-300 transition-all duration-300 ease-in-out"
//                     // Initial style set to height 0 and invisible/opacity 0
//                     // Height will be controlled by the useEffect hook
//                     style={{
//                       height: "0px",
//                       visibility: "hidden",
//                       opacity: "0",
//                     }}
//                     // Use hidden attribute for better accessibility when closed (though CSS handles visibility)
//                     // hidden={!isOpen} // Can be added, but visibility: hidden also works
//                   >
//                     {/* Inner div for padding, applied only when content is visible */}
//                     <div className="pt-4 pb-1">
//
//                       {/* Adjusted padding */}
//                       {item.answer}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Left: More Questions Box */}
//         <div className="lg:col-span-2 md:col-span-3 md:self-end sticky top-0">
//
//           {/* Made sticky */}
//           <div className="flex flex-col items-start gap-5 rounded-2xl bg-white dark:bg-white/5 p-4 md:p-6">
//             <div>
//               <h3 className="md:text-2xl text-lg font-semibold text-gray-900 dark:text-gray-300">
//                 More questions?
//               </h3>
//               <p className="mt-1 lg:text-lg text-xs font-normal text-gray-500 dark:text-gray-300">
//                 We're always ready to help you out.
//               </p>
//             </div>
//             <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap mt-1">
//               <div className="flex gap-2">
//                 {/* Added placeholder href */}
//                 <a href="#" aria-label="Chat on WhatsApp">
//                   <IoLogoWhatsapp className="lg:size-8 size-5 text-[#25D366]" />
//                 </a>
//                 {/* Added placeholder href */}
//                 <a href="#" aria-label="Chat on Telegram">
//                   <FaTelegram className="lg:size-8 size-5 text-[#3390EC]" />
//                 </a>
//               </div>
//               <Link
//                 href="/faqs" // Assuming this is the link to your full FAQ page
//                 className="px-4 lg:py-1.5 py-1 rounded-full font-medium lg:text-base text-sm text-mainheading dark:text-primary hover:bg-gray-100 border dark:bg-secondary transition-colors duration-300" // Added subtle border and hover effects
//               >
//                 Read more FAQs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";
// import Link from "next/link";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { FaTelegramPlane } from "react-icons/fa";
// import { FaTelegram } from "react-icons/fa6";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Apexture?",
//     answer:
//       "Apexture is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Apexture transfers? ",
//     answer:
//       "Apexture transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Apexture at once? ",
//     answer:
//       "With Apexture, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question:
//       "What security measures does Apexture take to safeguard my money? ",
//     answer:
//       "Apexture uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // React Functional Component for the FAQ Section using Accordion Pattern
// const FaqSection: React.FC = () => {
//   // Initialize state with the ID of the first FAQ item, if faqData is not empty
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   // Use a Map to store refs for each *container* content div
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   // Toggle function: close if clicking the open one, otherwise open the clicked one
//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   // Effect to handle the height transition of the container div
//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         const isOpen = id === openItemId;
//         if (isOpen) {
//           // When opening, set height to scrollHeight AFTER content is rendered (next frame)
//           // We need to ensure the inner content (conditionally rendered) is present
//           // before calculating scrollHeight. requestAnimationFrame helps here.
//           requestAnimationFrame(() => {
//             // Check again inside rAF in case state changed rapidly
//             if (id === openItemId && contentRefs.current.get(id)) {
//               contentDiv.style.height = `${contentDiv.scrollHeight}px`;
//               contentDiv.style.visibility = "visible";
//               contentDiv.style.opacity = "1";
//             }
//           });
//         } else {
//           // When closing, set height to 0
//           contentDiv.style.height = "0px";
//           contentDiv.style.visibility = "hidden";
//           contentDiv.style.opacity = "0";
//         }
//       }
//     });
//   }, [openItemId]); // Rerun this effect whenever the openItemId changes

//   // Effect to set initial height correctly on mount (handles default open item)
//   // This effect might be redundant now due to the main useEffect handling
//   // initial state via openItemId, but keep it for robustness if needed.
//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         if (id === openItemId) {
//           requestAnimationFrame(() => {
//             // Check again inside rAF
//             if (id === openItemId && contentRefs.current.get(id)) {
//               contentDiv.style.height = `${contentDiv.scrollHeight}px`;
//               contentDiv.style.visibility = "visible";
//               contentDiv.style.opacity = "1";
//             }
//           });
//         } else {
//           contentDiv.style.height = "0px";
//           contentDiv.style.visibility = "hidden";
//           contentDiv.style.opacity = "0";
//         }
//       }
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty dependency array ensures this runs only once on mount

//   return (
//     <div className="lg:py-10 py-5 bg-[#F2F4F7] dark:bg-background border-b">
//       <section
//         className="grid items-start lg:gap-14 gap-5 lg:grid-cols-5 container mx-auto px-4"
//         id="faq"
//       >
//         {/* Left Side: Title and Description */}
//         <div className="flex flex-col gap-5 self-start md:col-span-2">
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>
//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </div>

//         {/* Right Side: Accordion */}
//         <div className="md:col-span-3 md:row-span-2">
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 <div
//                   key={item.id}
//                   data-state={isOpen ? "open" : "closed"}
//                   data-orientation="vertical"
//                   className="rounded-xl bg-white md:p-6 p-4 dark:bg-white/5"
//                 >
//                   {/* Accordion Trigger (Question) */}
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       className="flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-gray-100 transition-all font-medium"
//                       onClick={() => handleToggle(item.id)}
//                       data-radix-collection-item=""
//                     >
//                       {item.question}
//                       <SlArrowDown
//                         className={`lg:size-3 size-2.5 shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                         aria-hidden
//                       />
//                     </button>
//                   </h3>

//                   {/* Accordion Content Container (Handles Animation) */}
//                   {isOpen && (
//                     <div
//                       ref={(el) => {
//                         if (el) {
//                           contentRefs.current.set(item.id, el);
//                         } else {
//                           contentRefs.current.delete(item.id);
//                         }
//                       }}
//                       id={uniqueContentId}
//                       role="region"
//                       aria-labelledby={uniqueTriggerId}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       // Styles for animation: overflow-hidden and transitions
//                       className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-[#667085] dark:text-gray-300 transition-all duration-300 ease-in-out"
//                       // Initial style set to height 0 and invisible/opacity 0
//                       style={{
//                         height: "0px",
//                         visibility: "hidden",
//                         opacity: "0",
//                       }}
//                     >
//                       <div className="pt-4 pb-1">{item.answer}</div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Left: More Questions Box */}
//         <div className="lg:col-span-2 md:col-span-3 md:self-end sticky top-0">
//           <div className="flex flex-col items-start gap-5 rounded-2xl bg-white dark:bg-white/5 p-4 md:p-6">
//             <div>
//               <h3 className="md:text-2xl text-lg font-semibold text-gray-900 dark:text-gray-300">
//                 More questions?
//               </h3>
//               <p className="mt-1 lg:text-lg text-xs font-normal text-gray-500 dark:text-gray-300">
//                 We're always ready to help you out.
//               </p>
//             </div>
//             <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap">
//               <div className="flex gap-2">
//                 <a href="#" aria-label="Chat on WhatsApp">
//                   <button className="inline-flex items-center justify-center rounded-full text-sm bg-[#25D366] lg:text-base px-4 lg:py-2 py-1.5 text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#1ebe5a] focus:outline-none">
//                     <IoLogoWhatsapp className="mr-2 lg:size-6 size-4" />
//                     <span>WhatsApp</span>
//                   </button>
//                 </a>

//                 <a href="#" aria-label="Chat on Telegram">
//                   <button
//                     className="
//       inline-flex items-center justify-center
//       rounded-full
//       bg-[#2DA5E0]
//       px-4
//       lg:py-2
//       py-1.5
//       text-sm
//       text-white
//       font-medium
//       transition-colors duration-200 ease-in-out
//       focus:outline-none
//       lg:text-base
//     "
//                   >
//                     <FaTelegramPlane className="mr-2 lg:size-6 size-4" />
//                     <span>Telegram</span>
//                   </button>
//                 </a>
//               </div>

//               <Link
//                 href="/faqs"
//                 className="px-4 lg:py-1.5 py-1.5 rounded-full font-medium lg:text-base text-xs text-mainheading dark:text-primary hover:bg-gray-100 border dark:bg-secondary transition-colors duration-300"
//               >
//                 Read more FAQs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";
// import Link from "next/link";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// // Assuming icons are correctly imported, if not, adjust paths or imports
// import { FaTelegramPlane } from "react-icons/fa";
// // import { FaTelegram } from "react-icons/fa6"; // This seemed unused, removed for clarity unless needed elsewhere
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Wise?",
//     answer:
//       "Wise is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Wise transfers? ",
//     answer:
//       "Wise transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Wise at once? ",
//     answer:
//       "With Wise, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question:
//       "What security measures does Wise take to safeguard my money? ",
//     answer:
//       "Wise uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // React Functional Component for the FAQ Section using Accordion Pattern
// const FaqSection: React.FC = () => {
//   // Initialize state with the ID of the first FAQ item, if faqData is not empty
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   // Use a Map to store refs for each *content* div (the answer container)
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   // Toggle function: close if clicking the open one, otherwise open the clicked one
//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   // Effect to handle the height transition of the answer container div
//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         const isOpen = id === openItemId;
//         // Set height based on scrollHeight if open, otherwise 0
//         // Control visibility and opacity for fade effect alongside height transition
//         if (isOpen) {
//           // Use rAF to ensure scrollHeight calculation happens after potential DOM updates
//           requestAnimationFrame(() => {
//             if (id === openItemId && contentRefs.current.get(id)) {
//               // Check again inside rAF
//               contentDiv.style.height = `${contentDiv.scrollHeight}px`;
//               contentDiv.style.visibility = "visible";
//               contentDiv.style.opacity = "1";
//             }
//           });
//         } else {
//           contentDiv.style.height = "0px";
//           // Delay hiding visibility until after transition
//           const transitionDuration = 300; // Match CSS duration
//           setTimeout(() => {
//             // Check if it's still closed before hiding
//             if (openItemId !== id) {
//               contentDiv.style.visibility = "hidden";
//             }
//           }, transitionDuration);
//           contentDiv.style.opacity = "0";
//         }
//       }
//     });
//   }, [openItemId]); // Rerun this effect whenever the openItemId changes

//   return (
//     // Main container for the FAQ section
//     <div className="lg:py-10 py-5 bg-white dark:bg-background px-4">
//       <section
//         className="grid items-start lg:gap-14 gap-5 lg:grid-cols-5 container mx-auto"
//         id="faq"
//       >
//         {/* Left Side: Title and Description */}
//         <div className="flex flex-col gap-5 self-start md:col-span-2">
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </div>

//         {/* Right Side: Accordion */}
//         <div className="md:col-span-3 md:row-span-2">
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 // Outer container for each FAQ item - background and rounding
//                 <div
//                   key={item.id}
//                   data-state={isOpen ? "open" : "closed"}
//                   data-orientation="vertical"
//                   // Removed padding here, it's moved to the button
//                   className="rounded-lg bg-lightgray dark:bg-white/5 overflow-hidden" // Added overflow-hidden for rounded corners
//                 >
//                   {/* Accordion Trigger (Question) - Now a full-width button */}
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0" // Removed padding/margin just in case
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       // Button now takes full width and padding, making the whole area clickable
//                       className="flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-main font-medium dark:text-white transition-colors duration-300 lg:p-5 p-4" // Added padding here and hover effect
//                       onClick={() => handleToggle(item.id)}
//                       data-radix-collection-item=""
//                     >
//                       {item.question}
//                       <SlArrowDown
//                         className={`lg:size-3 size-2.5 shrink-0 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                         aria-hidden
//                       />
//                     </button>
//                   </h3>

//                   {/* Accordion Content Container (Handles Animation) */}
//                   <div
//                     ref={(el) => {
//                       // Store or remove the ref in the map
//                       if (el) {
//                         contentRefs.current.set(item.id, el);
//                       } else {
//                         contentRefs.current.delete(item.id);
//                       }
//                     }}
//                     id={uniqueContentId}
//                     role="region"
//                     aria-labelledby={uniqueTriggerId}
//                     data-state={isOpen ? "open" : "closed"} // Keep state for styling/debugging
//                     data-orientation="vertical"
//                     className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
//                     style={{
//                       height: "0px",
//                       visibility: "hidden", // Start hidden
//                       opacity: "0", // Start faded out
//                     }}
//                   >
//                     {/* Inner div for padding the answer content */}
//                     <div className="pt-2 pb-4 md:px-6 px-4">
//                       {/* Adjusted padding for content */}
//                       {item.answer}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Left: More Questions Box */}
//         <div className="lg:col-span-2 md:col-span-3 md:self-end">
//           {/* Removed sticky for simplicity, add back if needed */}
//           <div className="flex flex-col items-start gap-5 rounded-2xl bg-lightgray dark:bg-white/5 p-4 lg:p-6">
//             <div>
//               <h3 className="md:text-2xl text-lg font-semibold text-mainheading dark:text-gray-100">
//                 More questions?
//               </h3>
//               <p className="mt-1 lg:text-lg text-sm font-normal text-gray-700 dark:text-gray-300">
//                 We're always ready to help you out.
//               </p>
//             </div>
//             <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap">
//               <div className="flex gap-2">
//                 {/* WhatsApp Button */}
//                 <Link
//                   href="/WhatsApp"
//                   aria-label="Chat on WhatsApp"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {/* Added target/rel */}
//                   <button className="inline-flex items-center cursor-pointer justify-center rounded-full text-sm bg-[#25D366] lg:text-base px-4 lg:py-2 py-1.5 text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#1ebe5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]">
//                     <IoLogoWhatsapp className="mr-2 lg:size-6 size-4" />
//                     <span>WhatsApp</span>
//                   </button>
//                 </Link>

//                 {/* Telegram Button */}
//                 <Link
//                   href="/Telegram"
//                   aria-label="Chat on Telegram"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {/* Added target/rel */}
//                   <button className="inline-flex items-center justify-center cursor-pointer rounded-full bg-[#2DA5E0] px-4 lg:py-2 py-1.5 text-sm text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#249bd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2DA5E0] lg:text-base">
//                     <FaTelegramPlane className="mr-2 lg:size-6 size-4" />
//                     <span>Telegram</span>
//                   </button>
//                 </Link>
//               </div>

//               {/* Read More FAQs Link */}
//               <Link
//                 href="/faqs" // Ensure this path is correct
//                 className="px-4 py-1.5 rounded-full font-medium lg:text-base text-xs border border-gray text-mainheading dark:text-primary dark:hover:bg-white/10 dark:border-white/20 dark:bg-secondary transition-colors duration-300 focus:outline-none"
//               >
//                 Read more FAQs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";
// import Link from "next/link";
// import React, { useState, useCallback } from "react"; // Removed useRef, useEffect for height
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
// // Assuming icons are correctly imported
// import { FaTelegramPlane } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Wise?",
//     answer:
//       "Wise is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Wise transfers? ",
//     answer:
//       "Wise transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Wise at once? ",
//     answer:
//       "With Wise, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question: "What security measures does Wise take to safeguard my money? ",
//     answer:
//       "Wise uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // --- Animation Variants ---

// const sectionVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const accordionContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.08, // Stagger the entrance of each FAQ item
//       delayChildren: 0.2, // Delay slightly after left block
//     },
//   },
// };

// const faqItemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const answerVariants = {
//   // `AnimatePresence` uses these for enter/exit
//   initial: { opacity: 0, height: 0, marginTop: 0 }, // Start closed
//   animate: {
//     opacity: 1,
//     height: "auto", // Animate height automatically
//     marginTop: "8px", // Add margin when open (adjust as needed)
//     transition: {
//       height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, // Smooth ease for height
//       opacity: { duration: 0.2, delay: 0.05 }, // Fade in slightly after height starts expanding
//       marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
//   exit: {
//     opacity: 0,
//     height: 0,
//     marginTop: 0, // Remove margin when closing
//     transition: {
//       height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }, // Faster ease out for height
//       opacity: { duration: 0.15 }, // Faster fade out
//       marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
// };

// // --- FAQ Section Component ---
// const FaqSection: React.FC = () => {
//   // Keep state for the currently open item ID
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   // Removed contentRefs and useEffect for height animation

//   // Toggle function remains simple
//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   return (
//     <div className="lg:py-10 py-5 bg-white dark:bg-background px-4 overflow-hidden">
//       {" "}
//       {/* Added overflow */}
//       {/* Section entrance animation */}
//       <motion.section
//         className="grid items-start lg:gap-14 gap-5 lg:grid-cols-5 container mx-auto"
//         id="faq"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }}
//       >
//         {/* Left Side: Title and Description - Animated */}
//         <motion.div
//           className="flex flex-col gap-5 self-start md:col-span-2"
//           variants={leftBlockVariants}
//         >
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>
//           <p className="lg:text-lg sm:text-base text-sm text-gray-700 leading-relaxed dark:text-gray-300">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </motion.div>

//         {/* Right Side: Accordion Container - Animated */}
//         <motion.div
//           className="md:col-span-3 md:row-span-2"
//           variants={accordionContainerVariants} // Staggers the items inside
//         >
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 // FAQ Item Entrance Animation Wrapper
//                 <motion.div
//                   key={item.id}
//                   variants={faqItemVariants} // Animate each item's entrance
//                   layout // Helps AnimatePresence with layout shifts smoothly
//                   className="rounded-lg bg-lightgray dark:bg-white/5 overflow-hidden" // Keep overflow hidden
//                 >
//                   {/* Accordion Trigger (Question Button) */}
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       className={`flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-main font-medium dark:text-white transition-colors duration-200 lg:p-5 p-4 ${
//                         isOpen
//                           ? "bg-gray-200 dark:bg-white/10"
//                           : "hover:bg-gray-100 dark:hover:bg-white/10"
//                       }`} // Subtle hover/open background
//                       onClick={() => handleToggle(item.id)}
//                     >
//                       {item.question}
//                       <motion.span // Animate the arrow rotation
//                         animate={{ rotate: isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         style={{ display: "inline-block" }} // Needed for rotation
//                       >
//                         <SlArrowDown
//                           className="lg:size-3 size-2.5 shrink-0 text-gray-700 dark:text-gray-300"
//                           aria-hidden
//                         />
//                       </motion.span>
//                     </button>
//                   </h3>

//                   {/* AnimatePresence handles the mounting/unmounting animation */}
//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       // Accordion Content Container - Animated
//                       <motion.div
//                         key="content" // Important for AnimatePresence
//                         id={uniqueContentId}
//                         role="region"
//                         aria-labelledby={uniqueTriggerId}
//                         variants={answerVariants} // Use variants for open/close
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300" // Keep overflow hidden
//                       >
//                         {/* Inner div for padding */}
//                         <div className="pt-0 pb-4 md:px-6 px-4">
//                           {" "}
//                           {/* Removed top padding as margin added */}
//                           {item.answer}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div> // End FAQ Item Wrapper
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Bottom Left: More Questions Box (Can be animated similarly if desired) */}
//         <motion.div
//           className="lg:col-span-2 md:col-span-3 md:self-end"
//           variants={leftBlockVariants} // Re-use left block animation or create a new one
//         >
//           <div className="flex flex-col items-start gap-5 rounded-2xl bg-lightgray dark:bg-white/5 p-4 lg:p-6">
//             <div>
//               <h3 className="md:text-2xl text-lg font-semibold text-mainheading dark:text-gray-100">
//                 More questions?
//               </h3>
//               <p className="mt-1 lg:text-lg text-sm font-normal text-gray-700 dark:text-gray-300">
//                 We're always ready to help you out.
//               </p>
//             </div>
//             <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap">
//               <div className="flex gap-2">
//                 {/* WhatsApp Button */}
//                 <Link
//                   href="/WhatsApp"
//                   aria-label="Chat on WhatsApp"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button className="inline-flex items-center cursor-pointer justify-center rounded-full text-sm bg-[#25D366] lg:text-base px-4 lg:py-2 py-1.5 text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#1ebe5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]">
//                     <IoLogoWhatsapp className="mr-2 lg:size-6 size-4" />
//                     <span>WhatsApp</span>
//                   </button>
//                 </Link>
//                 {/* Telegram Button */}
//                 <Link
//                   href="/Telegram"
//                   aria-label="Chat on Telegram"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button className="inline-flex items-center justify-center cursor-pointer rounded-full bg-[#2DA5E0] px-4 lg:py-2 py-1.5 text-sm text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#249bd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2DA5E0] lg:text-base">
//                     <FaTelegramPlane className="mr-2 lg:size-6 size-4" />
//                     <span>Telegram</span>
//                   </button>
//                 </Link>
//               </div>
//               {/* Read More FAQs Link */}
//               <Link
//                 href="/faqs"
//                 className="px-4 py-1.5 rounded-full font-medium lg:text-base text-xs border border-gray text-mainheading dark:text-primary dark:hover:bg-white/10 dark:border-white/20 dark:bg-secondary transition-colors duration-300 focus:outline-none"
//               >
//                 Read more FAQs
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";
// import Link from "next/link";
// import React, { useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
// // Assuming icons are correctly imported
// import { FaTelegramPlane } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Wise?",
//     answer:
//       "Wise is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Wise transfers? ",
//     answer:
//       "Wise transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Wise at once? ",
//     answer:
//       "With Wise, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question: "What security measures does Wise take to safeguard my money? ",
//     answer:
//       "Wise uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // --- Animation Variants ---

// const sectionVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const accordionContainerVariants = {
//   hidden: {}, // Container itself doesn't animate visually
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger the entrance of each FAQ item
//       delayChildren: 0.2, // Delay slightly after left block
//     },
//   },
// };

// // --- NEW Variants for FAQ Item Entrance (Slide from Right) ---
// const faqItemVariants = {
//   hidden: {
//     opacity: 0,
//     x: 80, // Start 80px to the right (off-screen)
//   },
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to final horizontal position (x=0)
//     transition: {
//       duration: 0.6, // Animation duration
//       ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing
//     },
//   },
// };

// // Variants for Answer Open/Close (Remains the same)
// const answerVariants = {
//   initial: { opacity: 0, height: 0, marginTop: 0 },
//   animate: {
//     opacity: 1,
//     height: "auto",
//     marginTop: "8px",
//     transition: {
//       height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//       opacity: { duration: 0.2, delay: 0.05 },
//       marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
//   exit: {
//     opacity: 0,
//     height: 0,
//     marginTop: 0,
//     transition: {
//       height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//       opacity: { duration: 0.15 },
//       marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
// };

// // --- FAQ Section Component ---
// const FaqSection: React.FC = () => {
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   return (
//     <div className="lg:py-10 py-5 bg-white dark:bg-background px-4 overflow-hidden">
//       <motion.section
//         className="grid items-start lg:gap-14 gap-5 lg:grid-cols-5 container mx-auto"
//         id="faq"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }}
//       >
//         {/* Left Side: Title and Description - Animated */}
//         <motion.div
//           className="flex flex-col gap-5 self-start md:col-span-2"
//           variants={leftBlockVariants}
//         >
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>
//           <p className="lg:text-lg sm:text-base text-sm text-gray-700 leading-relaxed dark:text-gray-300">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </motion.div>

//         {/* Right Side: Accordion Container - Animated */}
//         <motion.div
//           className="md:col-span-3 md:row-span-2"
//           variants={accordionContainerVariants} // Staggers the items inside
//         >
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 // FAQ Item Entrance Animation Wrapper
//                 <motion.div
//                   key={item.id}
//                   variants={faqItemVariants} // Apply NEW slide-from-right animation
//                   layout // Keep layout for smooth answer animation
//                   className="rounded-lg bg-lightgray dark:bg-white/5 overflow-hidden"
//                 >
//                   {/* Accordion Trigger (Question Button) */}
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       className={`flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-main font-medium dark:text-white transition-colors duration-200 lg:p-5 p-4 ${
//                         isOpen
//                           ? ""
//                           : "hover:bg-gray-100 dark:hover:bg-white/10"
//                       }`}
//                       onClick={() => handleToggle(item.id)}
//                     >
//                       {item.question}
//                       <motion.span
//                         animate={{ rotate: isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         style={{ display: "inline-block" }}
//                       >
//                         <SlArrowDown
//                           className="lg:size-3 size-2.5 shrink-0 text-gray-700 dark:text-gray-300"
//                           aria-hidden
//                         />
//                       </motion.span>
//                     </button>
//                   </h3>

//                   {/* AnimatePresence for Answer Open/Close */}
//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         key="content"
//                         id={uniqueContentId}
//                         role="region"
//                         aria-labelledby={uniqueTriggerId}
//                         variants={answerVariants}
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300"
//                       >
//                         <div className="pt-0 pb-4 md:px-6 px-4">
//                           {item.answer}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div> // End FAQ Item Wrapper
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Bottom Left: More Questions Box (Can be animated similarly if desired) */}
//         <motion.div
//           className="lg:col-span-2 md:col-span-3 md:self-end"
//           variants={leftBlockVariants} // Re-use left block animation
//         >
//           {/* ... (Content of More Questions box remains the same) ... */}
//           <div className="flex flex-col items-start gap-5 rounded-2xl bg-lightgray dark:bg-white/5 p-4 lg:p-6">
//             <div>
//               <h3 className="md:text-2xl text-lg font-semibold text-mainheading dark:text-gray-100">
//                 More questions?
//               </h3>
//               <p className="mt-1 lg:text-lg text-sm font-normal text-gray-700 dark:text-gray-300">
//                 We're always ready to help you out.
//               </p>
//             </div>
//             <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap">
//               <div className="flex gap-2">
//                 {/* WhatsApp Button */}
//                 <Link
//                   href="/WhatsApp"
//                   aria-label="Chat on WhatsApp"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button className="inline-flex items-center cursor-pointer justify-center rounded-full text-sm bg-[#25D366] lg:text-base px-4 lg:py-2 py-1.5 text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#1ebe5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]">
//                     <IoLogoWhatsapp className="mr-2 lg:size-6 size-4" />
//                     <span>WhatsApp</span>
//                   </button>
//                 </Link>
//                 {/* Telegram Button */}
//                 <Link
//                   href="/Telegram"
//                   aria-label="Chat on Telegram"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button className="inline-flex items-center justify-center cursor-pointer rounded-full bg-[#2DA5E0] px-4 lg:py-2 py-1.5 text-sm text-white font-medium transition-colors duration-200 ease-in-out hover:bg-[#249bd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2DA5E0] lg:text-base">
//                     <FaTelegramPlane className="mr-2 lg:size-6 size-4" />
//                     <span>Telegram</span>
//                   </button>
//                 </Link>
//               </div>
//               {/* Read More FAQs Link */}
//               <Link
//                 href="/faqs"
//                 className="px-4 py-1.5 rounded-full font-medium lg:text-base text-xs border border-gray text-mainheading dark:text-primary dark:hover:bg-white/10 dark:border-white/20 dark:bg-secondary transition-colors duration-300 focus:outline-none"
//               >
//                 Read more FAQs
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// };

// export default FaqSection;

// "use client";
// import Link from "next/link";
// import React, { useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
// // Assuming icons are correctly imported
// import { FaTelegramPlane } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is Remityn?",
//     answer:
//       "Remityn is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//   },
//   {
//     id: "2",
//     question: "What documents do I need to verify my account? ",
//     answer:
//       "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
//   },
//   {
//     id: "3",
//     question: "How fast are Remityn transfers? ",
//     answer:
//       "Remityn transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
//   },
//   {
//     id: "4",
//     question: "How much money can I transfer with Remityn at once? ",
//     answer:
//       "With Remityn, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
//   },
//   {
//     id: "5",
//     question: "What security measures does Remityn take to safeguard my money? ",
//     answer:
//       "Remityn uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
//   },
// ];

// // --- Animation Variants (No changes needed) ---

// const sectionVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const accordionContainerVariants = {
//   hidden: {}, // Container itself doesn't animate visually
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger the entrance of each FAQ item
//       delayChildren: 0.2, // Delay slightly after left block
//     },
//   },
// };

// // Variants for FAQ Item Entrance (Slide from Right)
// const faqItemVariants = {
//   hidden: {
//     opacity: 0,
//     x: 80, // Start 80px to the right (off-screen)
//   },
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to final horizontal position (x=0)
//     transition: {
//       duration: 0.6, // Animation duration
//       ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing
//     },
//   },
// };

// // Variants for Answer Open/Close
// const answerVariants = {
//   initial: { opacity: 0, height: 0, marginTop: 0 },
//   animate: {
//     opacity: 1,
//     height: "auto",
//     marginTop: "8px",
//     transition: {
//       height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//       opacity: { duration: 0.2, delay: 0.05 },
//       marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
//   exit: {
//     opacity: 0,
//     height: 0,
//     marginTop: 0,
//     transition: {
//       height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//       opacity: { duration: 0.15 },
//       marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
// };

// // --- FAQ Section Component ---
// const FaqSection: React.FC = () => {
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   return (
//     <motion.section
//       className="Faq-Section lg:py-10 py-5 bg-white dark:bg-background overflow-hidden"
//       id="faq"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ amount: 0.2, once: true }}
//     >
//       <div className="container mx-auto px-4">
//         <div className="grid items-start gap-6 lg:grid-cols-5">
//           {/* Left Side: Title and Description - Animated */}
//           <motion.div
//             className="flex flex-col space-y-4 self-start md:col-span-2"
//             variants={leftBlockVariants}
//             // Inherits trigger from parent section
//           >
//             <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//               Quick Currency
//               <span className="text-primary"> Exchange Help </span>
//             </h1>
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//               Get quick answers to common currency exchange questions — rates,
//               fees, timing, and more. Simple, clear, and reliable info at your
//               fingertips.
//             </p>
//           </motion.div>

//           {/* Right Side: Accordion Container - Animated */}
//           <motion.div
//             className="md:col-span-3 md:row-span-2"
//             variants={accordionContainerVariants} // Staggers the items inside
//             // Inherits trigger from parent section
//           >
//             <div className="flex flex-col gap-3" data-orientation="vertical">
//               {faqData.map((item) => {
//                 const isOpen = openItemId === item.id;
//                 const uniqueTriggerId = `faq-trigger-${item.id}`;
//                 const uniqueContentId = `faq-content-${item.id}`;

//                 return (
//                   // FAQ Item Entrance Animation Wrapper
//                   <motion.div
//                     key={item.id}
//                     variants={faqItemVariants} // Apply NEW slide-from-right animation
//                     layout // Keep layout for smooth answer animation
//                     className="rounded-lg bg-lightgray dark:bg-primarybox overflow-hidden"
//                     // Timing controlled by parent stagger
//                   >
//                     {/* Accordion Trigger (Question Button) */}
//                     <h3
//                       data-orientation="vertical"
//                       data-state={isOpen ? "open" : "closed"}
//                       className="flex m-0"
//                     >
//                       <button
//                         type="button"
//                         aria-controls={uniqueContentId}
//                         aria-expanded={isOpen}
//                         data-state={isOpen ? "open" : "closed"}
//                         data-orientation="vertical"
//                         id={uniqueTriggerId}
//                         className={`flex w-full cursor-pointer flex-1  gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-neutral-900 font-medium dark:text-white transition-colors ease-linear duration-75 lg:p-5 p-4 ${
//                           isOpen ? "" : ""
//                         }`}
//                         onClick={() => handleToggle(item.id)}
//                       >
//                         {item.question}
//                         <motion.span
//                           animate={{ rotate: isOpen ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                           style={{ display: "inline-block" }}
//                         >
//                           <SlArrowDown
//                             className="lg:size-3 size-2.5 shrink-0 text-gray-500 dark:text-gray-300"
//                             aria-hidden
//                           />
//                         </motion.span>
//                       </button>
//                     </h3>

//                     {/* AnimatePresence for Answer Open/Close */}
//                     <AnimatePresence initial={false}>
//                       {isOpen && (
//                         <motion.div
//                           key="content"
//                           id={uniqueContentId}
//                           role="region"
//                           aria-labelledby={uniqueTriggerId}
//                           variants={answerVariants}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                           className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-gray-500 dark:text-gray-300"
//                         >
//                           <div className="pt-0 pb-4 md:px-6 px-4">
//                             {item.answer}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div> // End FAQ Item Wrapper
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Bottom Left: More Questions Box - Animated */}
//           <motion.div
//             className="lg:col-span-2 md:col-span-3 md:self-end"
//             variants={leftBlockVariants} // Re-use left block animation
//           >
//             <div className="flex flex-col sm:items-start items-center gap-5 rounded-2xl bg-lightgray dark:bg-primarybox p-4 lg:p-6">
//               <div className="sm:text-left text-center">
//                 <h3 className="sm:text-2xl text-lg font-semibold text-mainheading dark:text-gray-100">
//                   More questions?
//                 </h3>
//                 <p className="mt-1 sm:text-lg text-sm font-normal text-gray-500 dark:text-gray-300">
//                   We're always ready to help you out.
//                 </p>
//               </div>

//               <div className="flex w-full flex-wrap items-center sm:justify-between justify-center gap-4">
//                 <div className="flex gap-2">
//                   {/* WhatsApp Button */}
//                   <Link
//                     href="https://web.whatsapp.com/" // Replace with your actual WhatsApp link/handler
//                     aria-label="Chat on WhatsApp"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <button className="inline-flex items-center cursor-pointer justify-center rounded-full text-sm bg-[#25D366] lg:text-base px-4 lg:py-2 py-1.5 text-white font-medium transition-all duration-75 ease-linear hover:bg-[#1ebe5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]">
//                       <IoLogoWhatsapp className="mr-2 lg:size-6 size-4" />
//                       <span>WhatsApp</span>
//                     </button>
//                   </Link>

//                   {/* Telegram Button */}
//                   <Link
//                     href="/https://web.telegram.org/k/" // Replace with your actual Telegram link/handler
//                     aria-label="Chat on Telegram"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <button className="inline-flex items-center justify-center cursor-pointer rounded-full bg-[#2DA5E0] px-4 lg:py-2 py-1.5 text-sm text-white font-medium transition-all duration-75 ease-linear hover:bg-[#249bd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2DA5E0] lg:text-base">
//                       <FaTelegramPlane className="mr-2 lg:size-6 size-4" />
//                       <span>Telegram</span>
//                     </button>
//                   </Link>
//                 </div>
                
//                 {/* Read More FAQs Link */}
//                 <Link
//                   href="/faqs" // Link to your full FAQs page
//                   className="px-4 py-1.5 rounded-full font-medium lg:text-base text-sm text-neutral-900 dark:text-primary bg-primary hover:bg-primaryhover dark:hover:bg-secondarybox dark:bg-primarybox transition-all ease-linear duration-75 focus:outline-none"
//                 >
//                   Read more FAQs
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default FaqSection;



"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the structure for each FAQ item
interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

// Sample FAQ Data
const faqData: FaqItemData[] = [
  {
    id: "1",
    question: "What is Remityn?",
    answer:
      "Remityn is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
  },
  {
    id: "2",
    question: "What documents do I need to verify my account? ",
    answer:
      "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
  },
  {
    id: "3",
    question: "How fast are Remityn transfers? ",
    answer:
      "Remityn transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
  },
  {
    id: "4",
    question: "How much money can I transfer with Remityn at once? ",
    answer:
      "With Remityn, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
  },
  {
    id: "5",
    question: "What security measures does Remityn take to safeguard my money? ",
    answer:
      "Remityn uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
  },
];


// Variants for Answer Open/Close
const answerVariants = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    marginTop: "8px",
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, delay: 0.05 },
      marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.15 },
      marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
  },
};

// --- FAQ Section Component ---
const FaqSection: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<string | null>(
    faqData.length > 0 ? faqData[0].id : null
  );

  const handleToggle = useCallback((id: string) => {
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
  }, []);

  return (
    <section
      className="Faq-Section py-20 overflow-hidden"
      id="faq"
    >
      <div className="container mx-auto px-4">

        <div className="lg:max-w-3xl max-w-full">
          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Quick Currency
            <span className="text-primary"> Exchange Help </span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Get quick answers to common currency exchange questions — rates,
            fees, timing, and more. Simple, clear, and reliable info at your
            fingertips.
          </p>
        </div>

        {/* FAQ */}
        <div
          className="sm:mt-25 mt-16"
        >
          <div className="flex flex-col" data-orientation="vertical">
            {faqData.map((item) => {
              const isOpen = openItemId === item.id;
              const uniqueTriggerId = `faq-trigger-${item.id}`;
              const uniqueContentId = `faq-content-${item.id}`;

              return (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden py-10 border-t border-t-gray-600/50"
                >
                  {/* Accordion Trigger (Question Button) */}
                  <h3
                    data-orientation="vertical"
                    data-state={isOpen ? "open" : "closed"}
                    className="flex m-0"
                  >
                    <button
                      type="button"
                      aria-controls={uniqueContentId}
                      aria-expanded={isOpen}
                      data-state={isOpen ? "open" : "closed"}
                      data-orientation="vertical"
                      id={uniqueTriggerId}
                      className={`flex w-full cursor-pointer flex-1 gap-4 items-start justify-between text-start xl:text-[28px] text-2xl font-medium transition-all ease-linear duration-75 ${
                        isOpen
                          ? "text-primary hover:text-primaryhover" // Color when OPEN and hover color for OPEN
                          : "text-mainheadingWhite hover:text-[#92A6B0]" // Color when CLOSED and hover color for CLOSED
                      }`}
                      onClick={() => handleToggle(item.id)}
                    >
                      {item.question}
                      {/* New Animated Plus/Minus Icon */}
                      <div
                        className="size-6 shrink-0 relative xl:mt-2 mt-1" // MODIFIED: Removed text-mainheadingWhite to allow color inheritance
                        aria-hidden="true"
                      >
                        {/* Line 1 (Initially vertical, rotates to form the minus stroke) */}
                        <motion.div
                          className="absolute bg-current" // Inherits text color from parent button
                          style={{
                            width: "2px",
                            height: "100%",
                            left: "50%",
                            top: "0%",
                            translateX: "-50%",
                          }}
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        {/* Line 2 (Initially horizontal, rotates and fades out) */}
                        <motion.div
                          className="absolute bg-current" // Inherits text color from parent button
                          style={{
                            width: "100%",
                            height: "2px",
                            left: "0%",
                            top: "50%",
                            translateY: "-50%",
                          }}
                          animate={{
                            rotate: isOpen ? 90 : 0,
                            opacity: isOpen ? 0 : 1,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </div>
                    </button>
                  </h3>

                  {/* AnimatePresence for Answer Open/Close */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={uniqueContentId}
                        role="region"
                        aria-labelledby={uniqueTriggerId}
                        variants={answerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <p className="text-subheadingWhite xl:text-xl text-lg leading-relaxed ">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;