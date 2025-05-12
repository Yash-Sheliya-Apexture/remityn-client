// // frontend/src/components/FilterModal.tsx
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// // ... other imports
// import { Account } from "@/types/account";
// import { IoClose } from "react-icons/io5";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";
// import DirectionFilter from "./Filter/DirectionFilter";
// import Status from "./Filter/Status";
// import BalanceComponent, { CurrencyBalance } from "./Filter/Balance";
// import { motion, AnimatePresence } from "framer-motion";

// // *** EXPORT THIS INTERFACE ***
// export interface AppliedFilters {
//   selectedRecipients: (string | number)[];
//   selectedDirection: string; // Keep as string, default is 'all'
//   selectedStatus: string | null;
//   selectedBalance: string[];
//   fromDate: string; // Keep as string, empty if not set
//   toDate: string; // Keep as string, empty if not set
// }

// interface FilterModalProps {
//   userAccounts: Account[];
//   onFiltersApply: (filters: AppliedFilters) => void; // Uses the exported interface
//   isOpen: boolean;
//   onClose: () => void;
// }

// const FilterModal: React.FC<FilterModalProps> = ({
//   userAccounts,
//   onFiltersApply,
//   isOpen,
//   onClose,
// }) => {
//   const popupRef = useRef<HTMLDivElement>(null);
//   // Initialize state consistent with AppliedFilters interface
//   const [fromDate, setFromDate] = useState(""); // string, empty initially
//   const [toDate, setToDate] = useState(""); // string, empty initially
//   const [selectedRecipients, setSelectedRecipients] = useState<
//     (string | number)[]
//   >([]);
//   const [selectedDirection, setSelectedDirection] = useState<string>("all"); // string, 'all' initially
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [selectedBalance, setSelectedBalance] = useState<string[]>([]);

//   // State for UI interaction (date range buttons)
//   const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
//     null
//   );
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLastMonthActive, setIsLastMonthActive] = useState(false);
//   const [isLastQuarterActive, setIsLastQuarterActive] = useState(false);
//   const [isLastYearActive, setIsLastYearActive] = useState(false);

//   // --- useEffects --- (Keep existing useEffects for outside click, resize, body scroll)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // --- Handlers ---
//   const handleRecipientSelectionChange = (
//     recipientIds: (string | number)[]
//   ) => {
//     setSelectedRecipients(recipientIds);
//   };
//   const handleDirectionChange = (direction: string) => {
//     setSelectedDirection(direction); // Ensure it's always a string
//   };
//   const handleStatusChange = (status: string | null) => {
//     setSelectedStatus(status);
//   };
//   const handleBalanceChange = (isSelected: boolean, currencyCode: string) => {
//     setSelectedBalance((currentBalances) =>
//       isSelected
//         ? [...currentBalances, currencyCode]
//         : currentBalances.filter((code) => code !== currencyCode)
//     );
//   };

//   // --- Date range functions ---
//   const formatDate = (date: Date): string =>
//     `${String(date.getDate()).padStart(2, "0")}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}-${date.getFullYear()}`;

//   const setDateRangeAndStates = (
//     startDate: Date,
//     endDate: Date,
//     activeRange: "month" | "quarter" | "year" | null
//   ) => {
//     setFromDate(formatDate(startDate));
//     setToDate(formatDate(endDate));
//     setSelectedDateRange(activeRange);
//     setIsLastMonthActive(activeRange === "month");
//     setIsLastQuarterActive(activeRange === "quarter");
//     setIsLastYearActive(activeRange === "year");
//   };

//   const getLastMonthRange = () => {
//     const now = new Date();
//     const lastMonth = new Date(now);
//     lastMonth.setMonth(now.getMonth() - 1);
//     const startOfMonth = new Date(
//       lastMonth.getFullYear(),
//       lastMonth.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       lastMonth.getFullYear(),
//       lastMonth.getMonth() + 1,
//       0
//     );
//     setDateRangeAndStates(startOfMonth, endOfMonth, "month");
//   };

//   const getLastQuarterRange = () => {
//     const now = new Date();
//     const currentQuarter = Math.floor(now.getMonth() / 3);
//     const startMonthOfLastQuarter = (currentQuarter - 1) * 3;
//     const startOfLastQuarter = new Date(
//       now.getFullYear(),
//       startMonthOfLastQuarter,
//       1
//     );
//     if (startMonthOfLastQuarter < 0) {
//       startOfLastQuarter.setFullYear(now.getFullYear() - 1);
//     }
//     const endOfLastQuarter = new Date(now.getFullYear(), currentQuarter * 3, 0);
//     if (currentQuarter === 0) {
//       endOfLastQuarter.setFullYear(now.getFullYear() - 1);
//     }
//     setDateRangeAndStates(startOfLastQuarter, endOfLastQuarter, "quarter");
//   };

//   const getLastYearRange = () => {
//     const now = new Date();
//     const lastYear = now.getFullYear() - 1;
//     const startOfYear = new Date(lastYear, 0, 1);
//     const endOfYear = new Date(lastYear, 11, 31);
//     setDateRangeAndStates(startOfYear, endOfYear, "year");
//   };

//   const handleClearDateRange = (rangeType: "month" | "quarter" | "year") => {
//     if (rangeType === "month") setIsLastMonthActive(false);
//     else if (rangeType === "quarter") setIsLastQuarterActive(false);
//     else if (rangeType === "year") setIsLastYearActive(false);
//     setFromDate("");
//     setToDate("");
//     setSelectedDateRange(null);
//   };

//   const handleDateInputChange = (value: string, type: "from" | "to") => {
//     if (type === "from") setFromDate(value);
//     else setToDate(value);
//     setSelectedDateRange(null);
//     setIsLastMonthActive(false);
//     setIsLastQuarterActive(false);
//     setIsLastYearActive(false);
//   };

//   // --- Apply and Clear Filters handlers ---
//   const handleApplyFilters = () => {
//     onFiltersApply({
//       // Pass data matching the exported AppliedFilters interface
//       selectedRecipients,
//       selectedDirection, // Will be 'all', 'add', or 'send' (string)
//       selectedStatus,
//       selectedBalance,
//       fromDate, // string
//       toDate, // string
//     });
//     onClose();
//   };

//   const handleClearAllFilters = () => {
//     // Clear internal state
//     setFromDate("");
//     setToDate("");
//     setSelectedRecipients([]);
//     setSelectedDirection("all");
//     setSelectedStatus(null);
//     setSelectedBalance([]);
//     setSelectedDateRange(null);
//     setIsLastMonthActive(false);
//     setIsLastQuarterActive(false);
//     setIsLastYearActive(false);
//     // Apply cleared filters externally
//     onFiltersApply({
//       selectedRecipients: [],
//       selectedDirection: "all",
//       selectedStatus: null,
//       selectedBalance: [],
//       fromDate: "",
//       toDate: "", // Pass empty strings
//     });
//     onClose();
//   };

//   // --- Render Logic --- (Keep existing JSX, ensure all button clicks etc. are correct)
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//             onClick={onClose}
//           />
//           {/* Filter Popup Content */}
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className={`fixed ${
//               isMobile
//                 ? "bottom-0 left-0 right-0 h-[100dvh]"
//                 : "top-0 right-0 sm:w-[600px] h-full"
//             } bg-white dark:bg-background z-80 flex flex-col`}
//             initial={
//               isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//             }
//             animate={
//               isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
//             }
//             exit={
//               isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//             }
//             transition={{ type: "tween", duration: 0.3 }}
//           >
//             {/* Header */}
//             <div className="sm:p-6 p-4 h-20 flex items-center justify-between flex-shrink-0 border-b relative">
//               <h3 className="font-semibold text-mainheading dark:text-white text-xl lg:text-2xl">
//                 {" "}
//                 Filters{" "}
//               </h3>
//               <button
//                 onClick={onClose}
//                 className="p-2.5 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//               >
//                 <IoClose
//                   className="text-neutral-900 dark:text-primary"
//                   size={28}
//                 />
//               </button>
//             </div>

//             {/* Scrollable Content Area */}
//             <div className="sm:p-6 p-4 flex-grow overflow-y-auto scrollbar-hide space-y-6">
//               {/* Date Section */}
//               <div>
//                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b">
//                   Date{" "}
//                 </h4>
//                 <div className="flex items-center flex-wrap gap-2 mb-4">
//                   {/* Date Buttons */}
//                   <button
//                     className={`font-medium border flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer ${
//                       isLastMonthActive
//                         ? "bg-neutral-900 text-primary dark:bg-green-600/20"
//                         : "text-mainheading dark:bg-background dark:text-white  bg-white"
//                     }`}
//                     onClick={getLastMonthRange}
//                   >
//                     Last month{" "}
//                     {isLastMonthActive && (
//                       <IoIosCloseCircleOutline
//                         size={24}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("month");
//                         }}
//                       />
//                     )}
//                   </button>
//                   <button
//                     className={`font-medium border flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer ${
//                       isLastQuarterActive
//                         ? "bg-neutral-900 text-primary dark:bg-green-600/20"
//                         : "text-mainheading dark:bg-background dark:text-white bg-white"
//                     }`}
//                     onClick={getLastQuarterRange}
//                   >
//                     Last quarter{" "}
//                     {isLastQuarterActive && (
//                       <IoIosCloseCircleOutline
//                         size={24}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("quarter");
//                         }}
//                       />
//                     )}
//                   </button>
//                   <button
//                     className={`font-medium border flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer ${
//                       isLastYearActive
//                         ? "bg-neutral-900 text-primary dark:bg-green-600/20"
//                         : "text-mainheading dark:bg-background dark:text-white bg-white"
//                     }`}
//                     onClick={getLastYearRange}
//                   >
//                     Last year{" "}
//                     {isLastYearActive && (
//                       <IoIosCloseCircleOutline
//                         size={24}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("year");
//                         }}
//                       />
//                     )}
//                   </button>
//                 </div>
//                 <div className="space-y-3">
//                   <DateInput
//                     placeholder="From date"
//                     value={fromDate}
//                     onChange={(date) => handleDateInputChange(date, "from")}
//                   />
//                   <DateInput
//                     placeholder="To date"
//                     value={toDate}
//                     onChange={(date) => handleDateInputChange(date, "to")}
//                   />
//                 </div>
//               </div>
//               {/* Recipients Section */}
//               <div>
//                 {" "}
//                 <Recipients
//                   onRecipientSelectionChange={handleRecipientSelectionChange}
//                   selectedRecipientIds={selectedRecipients}
//                 />{" "}
//               </div>
//               {/* Status Section */}
//               <div>
//                 {" "}
//                 <Status
//                   selectedStatus={selectedStatus}
//                   onStatusChange={handleStatusChange}
//                 />{" "}
//               </div>
//               {/* Direction Section */}
//               <div>
//                 {" "}
//                 <DirectionFilter
//                   selectedDirection={selectedDirection}
//                   onDirectionChange={handleDirectionChange}
//                 />{" "}
//               </div>
//               {/* Balance Section */}
//               {userAccounts && userAccounts.length > 0 && (
//                 <div>
//                   <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b">
//                     {" "}
//                     Balance{" "}
//                   </h4>
//                   <div className="space-y-2">
//                     {userAccounts.map((account) => {
//                       const currencyBalanceProps: CurrencyBalance = {
//                         currencyCode: account.currency.code,
//                         currencyName:
//                           account.currency.currencyName ||
//                           `${account.currency.code} Balance`,
//                         currencySymbolPath:
//                           account.currency.flagImage?.trim() ||
//                           `/assets/icon/${account.currency.code.toLowerCase()}.svg`,
//                       };
//                       return (
//                         <BalanceComponent
//                           key={account.currency.code}
//                           currencyBalance={currencyBalanceProps}
//                           onBalanceChange={handleBalanceChange}
//                           isSelected={selectedBalance.includes(
//                             account.currency.code
//                           )}
//                         />
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="sm:p-6 p-4 border-t bg-white dark:bg-background flex-shrink-0">
//               <div className="flex items-center gap-3">
//                 <button
//                   type="button"
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={handleClearAllFilters}
//                 >
//                   {" "}
//                   Clear all{" "}
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={handleApplyFilters}
//                 >
//                   {" "}
//                   Apply{" "}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default FilterModal;

// // frontend/src/app/dashboard/components/TransactionPageSection/FilterModal.tsx
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Account } from "@/types/account";
// import { IoClose } from "react-icons/io5";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients"; // Ensure this path points to the corrected Recipients component
// import DirectionFilter from "./Filter/DirectionFilter";
// import Status from "./Filter/Status";
// import BalanceComponent, { CurrencyBalance } from "./Filter/Balance";
// import { motion, AnimatePresence } from "framer-motion";

// // *** EXPORT THIS INTERFACE ***
// export interface AppliedFilters {
//   selectedRecipients: (string | number)[];
//   selectedDirection: string;
//   selectedStatus: string | null;
//   selectedBalance: string[];
//   fromDate: string;
//   toDate: string;
// }

// interface FilterModalProps {
//   userAccounts: Account[];
//   onFiltersApply: (filters: AppliedFilters) => void;
//   isOpen: boolean;
//   onClose: () => void;
//   initialFilters?: AppliedFilters; // Optional: To pre-fill the modal
// }

// const FilterModal: React.FC<FilterModalProps> = ({
//   userAccounts,
//   onFiltersApply,
//   isOpen,
//   onClose,
//   initialFilters,
// }) => {
//   const popupRef = useRef<HTMLDivElement>(null);

//   // Default empty state for filters
//   const defaultFilterState: AppliedFilters = {
//     selectedRecipients: [],
//     selectedDirection: "all",
//     selectedStatus: null,
//     selectedBalance: [],
//     fromDate: "",
//     toDate: "",
//   };

//   // Initialize state - Use initialFilters if provided and modal is open, otherwise default
//   const [fromDate, setFromDate] = useState<string>(
//     initialFilters?.fromDate ?? defaultFilterState.fromDate
//   );
//   const [toDate, setToDate] = useState<string>(
//     initialFilters?.toDate ?? defaultFilterState.toDate
//   );
//   // This state holds the selected recipients within the modal
//   const [selectedRecipients, setSelectedRecipients] = useState<
//     (string | number)[]
//   >(
//     initialFilters?.selectedRecipients ?? defaultFilterState.selectedRecipients
//   );
//   const [selectedDirection, setSelectedDirection] = useState<string>(
//     initialFilters?.selectedDirection ?? defaultFilterState.selectedDirection
//   );
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(
//     initialFilters?.selectedStatus ?? defaultFilterState.selectedStatus
//   );
//   const [selectedBalance, setSelectedBalance] = useState<string[]>(
//     initialFilters?.selectedBalance ?? defaultFilterState.selectedBalance
//   );

//   // State for UI interaction (date range buttons)
//   const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
//     null
//   );
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLastMonthActive, setIsLastMonthActive] = useState(false);
//   const [isLastQuarterActive, setIsLastQuarterActive] = useState(false);
//   const [isLastYearActive, setIsLastYearActive] = useState(false);

//   // Reset internal state when the modal opens, based on initialFilters passed in props
//   useEffect(() => {
//     if (isOpen) {
//       const currentInitial = initialFilters ?? defaultFilterState;
//       setFromDate(currentInitial.fromDate);
//       setToDate(currentInitial.toDate);
//       setSelectedRecipients([...currentInitial.selectedRecipients]); // Use spread for new array
//       setSelectedDirection(currentInitial.selectedDirection);
//       setSelectedStatus(currentInitial.selectedStatus);
//       setSelectedBalance([...currentInitial.selectedBalance]); // Use spread for new array

//       // Reset date button active states initially when opening
//       setIsLastMonthActive(false);
//       setIsLastQuarterActive(false);
//       setIsLastYearActive(false);
//       setSelectedDateRange(null);
//       // Note: Logic to re-activate date buttons based on dates could be added here if needed
//     }
//   }, [isOpen, initialFilters]); // Rerun when isOpen changes or initialFilters potentially change

//   // --- useEffects --- (outside click, resize, body scroll)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // --- Handlers ---
//   // This function updates the modal's internal state when the Recipients component signals a change
//   const handleRecipientSelectionChange = (ids: (string | number)[]) => {
//     setSelectedRecipients(ids);
//   };
//   const handleDirectionChange = (direction: string) => {
//     setSelectedDirection(direction);
//   };
//   const handleStatusChange = (status: string | null) => {
//     setSelectedStatus(status);
//   };
//   const handleBalanceChange = (isSelected: boolean, currencyCode: string) => {
//     setSelectedBalance((curr) =>
//       isSelected
//         ? [...curr, currencyCode]
//         : curr.filter((c) => c !== currencyCode)
//     );
//   };

//   // --- Date range functions ---
//   const formatDate = (date: Date): string =>
//     `${String(date.getDate()).padStart(2, "0")}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}-${date.getFullYear()}`;
//   const setDateRangeAndStates = (
//     start: Date,
//     end: Date,
//     range: "month" | "quarter" | "year" | null
//   ) => {
//     setFromDate(formatDate(start));
//     setToDate(formatDate(end));
//     setSelectedDateRange(range);
//     setIsLastMonthActive(range === "month");
//     setIsLastQuarterActive(range === "quarter");
//     setIsLastYearActive(range === "year");
//   };
//   const getLastMonthRange = () => {
//     const now = new Date();
//     const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//     const endOfMonth = new Date(
//       lastMonth.getFullYear(),
//       lastMonth.getMonth() + 1,
//       0
//     );
//     setDateRangeAndStates(lastMonth, endOfMonth, "month");
//   };
//   const getLastQuarterRange = () => {
//     const now = new Date();
//     const currentQuarter = Math.floor(now.getMonth() / 3);
//     const startMonthOfLastQuarter = (currentQuarter - 1) * 3;
//     const startOfLastQuarter = new Date(
//       now.getFullYear(),
//       startMonthOfLastQuarter,
//       1
//     );
//     if (startMonthOfLastQuarter < 0)
//       startOfLastQuarter.setFullYear(now.getFullYear() - 1);
//     const endOfLastQuarter = new Date(now.getFullYear(), currentQuarter * 3, 0);
//     if (currentQuarter === 0)
//       endOfLastQuarter.setFullYear(now.getFullYear() - 1);
//     setDateRangeAndStates(startOfLastQuarter, endOfLastQuarter, "quarter");
//   };
//   const getLastYearRange = () => {
//     const now = new Date();
//     const lastYear = now.getFullYear() - 1;
//     const startOfYear = new Date(lastYear, 0, 1);
//     const endOfYear = new Date(lastYear, 11, 31);
//     setDateRangeAndStates(startOfYear, endOfYear, "year");
//   };

//   const handleClearDateRange = (rangeType: "month" | "quarter" | "year") => {
//     if (
//       (rangeType === "month" && isLastMonthActive) ||
//       (rangeType === "quarter" && isLastQuarterActive) ||
//       (rangeType === "year" && isLastYearActive)
//     ) {
//       setFromDate("");
//       setToDate("");
//       setSelectedDateRange(null);
//       setIsLastMonthActive(false);
//       setIsLastQuarterActive(false);
//       setIsLastYearActive(false);
//     }
//   };

//   const handleDateInputChange = (value: string, type: "from" | "to") => {
//     if (type === "from") setFromDate(value);
//     else setToDate(value);
//     setSelectedDateRange(null);
//     setIsLastMonthActive(false);
//     setIsLastQuarterActive(false);
//     setIsLastYearActive(false);
//   };

//   // --- Apply and Clear Filters handlers ---
//   const handleApplyFilters = () => {
//     // Passes the current internal state up to the parent
//     onFiltersApply({
//       selectedRecipients,
//       selectedDirection,
//       selectedStatus,
//       selectedBalance,
//       fromDate,
//       toDate,
//     });
//     // Parent component should close the modal (e.g., inside its own onFiltersApply handler)
//   };

//   const handleClearAllFilters = () => {
//     // Clear internal state first
//     setFromDate("");
//     setToDate("");
//     setSelectedRecipients([]); // Explicitly clear the recipients state here
//     setSelectedDirection("all");
//     setSelectedStatus(null);
//     setSelectedBalance([]);
//     setSelectedDateRange(null);
//     setIsLastMonthActive(false);
//     setIsLastQuarterActive(false);
//     setIsLastYearActive(false);
//     // Then call the apply function with the cleared default state
//     onFiltersApply({ ...defaultFilterState });
//      // Parent component should close the modal
//   };

//   // --- Render Logic ---
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//             onClick={onClose}
//           />

//           {/* Filter Popup Content */}
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className={`fixed ${
//               isMobile
//                 ? "bottom-0 left-0 right-0 h-[100dvh]"
//                 : "top-0 right-0 sm:w-[600px] h-full"
//             } bg-white dark:bg-background z-80 flex flex-col`}
//             initial={
//               isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//             }
//             animate={
//               isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
//             }
//             exit={
//               isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//             }
//             transition={{ type: "tween", duration: 0.3 }}
//           >
//             {/* Header */}
//             <div className="sm:p-6 p-4 h-20 flex items-center justify-between flex-shrink-0 border-b border-neutral-200 dark:border-neutral-700 relative">
//               <h3 className="font-semibold text-mainheading dark:text-white text-xl lg:text-2xl">
//                 Filters
//               </h3>
//               <button
//                 onClick={onClose}
//                 className="p-2.5 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                 aria-label="Close filters"
//               >
//                 <IoClose
//                   className="text-neutral-900 dark:text-primary"
//                   size={28}
//                 />
//               </button>
//             </div>

//             {/* Scrollable Content Area */}
//             <div className="sm:p-6 p-4 flex-grow overflow-y-auto scrollbar-hide space-y-6">
//               {/* Date Section */}
//               <div>
//                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                   Date
//                 </h4>
//                 <div className="flex items-center flex-wrap gap-2 mb-4">
//                   {/* Date Buttons */}
//                   <button
//                     className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
//                       isLastMonthActive
//                         ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
//                         : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
//                     }`}
//                     onClick={() =>
//                       isLastMonthActive
//                         ? handleClearDateRange("month")
//                         : getLastMonthRange()
//                     }
//                   >
//                     Last month
//                     {isLastMonthActive && (
//                       <IoIosCloseCircleOutline
//                         size={20}
//                         className="ml-1" // Add some space
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent button click
//                           handleClearDateRange("month");
//                         }}
//                       />
//                     )}
//                   </button>
//                    <button
//                     className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
//                       isLastQuarterActive
//                         ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
//                         : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
//                     }`}
//                     onClick={() =>
//                       isLastQuarterActive
//                         ? handleClearDateRange("quarter")
//                         : getLastQuarterRange()
//                     }
//                   >
//                     Last quarter
//                     {isLastQuarterActive && (
//                       <IoIosCloseCircleOutline
//                         size={20}
//                         className="ml-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("quarter");
//                         }}
//                       />
//                     )}
//                   </button>
//                    <button
//                     className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
//                       isLastYearActive
//                         ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
//                         : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
//                     }`}
//                     onClick={() =>
//                       isLastYearActive
//                         ? handleClearDateRange("year")
//                         : getLastYearRange()
//                     }
//                   >
//                     Last year
//                     {isLastYearActive && (
//                       <IoIosCloseCircleOutline
//                         size={20}
//                         className="ml-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("year");
//                         }}
//                       />
//                     )}
//                   </button>
//                 </div>

//                 <div className="space-y-3">
//                   <DateInput
//                     placeholder="From date (DD-MM-YYYY)"
//                     value={fromDate}
//                     onChange={(date) => handleDateInputChange(date, "from")}
//                   />
//                   <DateInput
//                     placeholder="To date (DD-MM-YYYY)"
//                     value={toDate}
//                     onChange={(date) => handleDateInputChange(date, "to")}
//                   />
//                 </div>
//               </div>
//               {/* Recipients Section - Passing state and handler */}
//               <div>
//                 <Recipients
//                   selectedRecipientIds={selectedRecipients}
//                   onRecipientSelectionChange={handleRecipientSelectionChange}
//                 />
//               </div>
//               {/* Status Section */}
//               <div>
//                 <Status
//                   selectedStatus={selectedStatus}
//                   onStatusChange={handleStatusChange}
//                 />
//               </div>
//               {/* Direction Section */}
//               <div>
//                 <DirectionFilter
//                   selectedDirection={selectedDirection}
//                   onDirectionChange={handleDirectionChange}
//                 />
//               </div>
//               {/* Balance Section */}
//               {userAccounts && userAccounts.length > 0 && (
//                 <div>
//                   <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                     Balance
//                   </h4>
//                   <div className="space-y-2">
//                     {userAccounts.map((account) => {
//                       const currencyBalanceProps: CurrencyBalance = {
//                         currencyCode: account.currency.code,
//                         currencyName:
//                           account.currency.currencyName ||
//                           `${account.currency.code} Balance`,
//                         currencySymbolPath:
//                           account.currency.flagImage?.trim() ||
//                           `/assets/icon/${account.currency.code.toLowerCase()}.svg`,
//                       };
//                       return (
//                         <BalanceComponent
//                           key={account.currency.code}
//                           currencyBalance={currencyBalanceProps}
//                           onBalanceChange={handleBalanceChange}
//                           isSelected={selectedBalance.includes(
//                             account.currency.code
//                           )}
//                         />
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="sm:p-6 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0">
//               <div className="flex items-center gap-3">
//                 <button
//                   type="button"
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={handleClearAllFilters}
//                 >
//                   Clear all
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={handleApplyFilters}
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default FilterModal;

// // frontend/src/app/dashboard/components/TransactionPageSection/FilterModal.tsx
// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Account } from "@/types/account";
// import { IoClose } from "react-icons/io5";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";
// import DirectionFilter from "./Filter/DirectionFilter";
// import Status from "./Filter/Status";
// import BalanceComponent, { CurrencyBalance } from "./Filter/Balance";
// import { motion, AnimatePresence } from "framer-motion";

// export interface AppliedFilters {
//   selectedRecipients: (string | number)[];
//   selectedDirection: string;
//   selectedStatus: string | null;
//   selectedBalance: string[];
//   fromDate: string;
//   toDate: string;
// }

// interface FilterModalProps {
//   userAccounts: Account[];
//   onFiltersApply: (filters: AppliedFilters) => void;
//   isOpen: boolean;
//   onClose: () => void;
//   initialFilters?: AppliedFilters;
// }

// const FilterModal: React.FC<FilterModalProps> = ({
//   userAccounts,
//   onFiltersApply,
//   isOpen,
//   onClose,
//   initialFilters,
// }) => {
//   const popupRef = useRef<HTMLDivElement>(null);

//   const defaultFilterState: AppliedFilters = {
//     selectedRecipients: [],
//     selectedDirection: "all",
//     selectedStatus: null,
//     selectedBalance: [],
//     fromDate: "",
//     toDate: "",
//   };

//   const [fromDate, setFromDate] = useState<string>(
//     initialFilters?.fromDate ?? defaultFilterState.fromDate
//   );
//   const [toDate, setToDate] = useState<string>(
//     initialFilters?.toDate ?? defaultFilterState.toDate
//   );
//   const [selectedRecipients, setSelectedRecipients] = useState<
//     (string | number)[]
//   >(
//     initialFilters?.selectedRecipients ?? defaultFilterState.selectedRecipients
//   );
//   const [selectedDirection, setSelectedDirection] = useState<string>(
//     initialFilters?.selectedDirection ?? defaultFilterState.selectedDirection
//   );
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(
//     initialFilters?.selectedStatus ?? defaultFilterState.selectedStatus
//   );
//   const [selectedBalance, setSelectedBalance] = useState<string[]>(
//     initialFilters?.selectedBalance ?? defaultFilterState.selectedBalance
//   );

//   const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
//     null
//   );
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLastMonthActive, setIsLastMonthActive] = useState(false);
//   const [isLastQuarterActive, setIsLastQuarterActive] = useState(false);
//   const [isLastYearActive, setIsLastYearActive] = useState(false);

//   // --- Date Formatting Utility ---
//   const formatDate = useCallback((date: Date): string =>
//     `${String(date.getDate()).padStart(2, "0")}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}-${date.getFullYear()}`,
//   []);

//   // --- Helper functions to get formatted date ranges for comparison ---
//   const getFormattedDateRangeForLastMonth = useCallback((): { start: string; end: string } => {
//     const now = new Date();
//     const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//     const lastMonthEnd = new Date(lastMonthStart.getFullYear(), lastMonthStart.getMonth() + 1, 0);
//     return { start: formatDate(lastMonthStart), end: formatDate(lastMonthEnd) };
//   }, [formatDate]);

//   const getFormattedDateRangeForLastQuarter = useCallback((): { start: string; end: string } => {
//     const now = new Date();
//     const currentQuarter = Math.floor(now.getMonth() / 3);
//     let startYear = now.getFullYear();
//     let endYear = now.getFullYear();
//     let startMonthIndex = (currentQuarter - 1) * 3;

//     if (currentQuarter === 0) { // Current is Q1 (Jan-Mar), so last quarter was Q4 of previous year
//         startYear--;
//         endYear--;
//         startMonthIndex = 9; // October (month index 9)
//     }

//     const startOfLastQuarter = new Date(startYear, startMonthIndex, 1);
//     // For end of quarter, get the last day of the 3rd month of that quarter
//     // e.g., if startMonthIndex is 0 (Jan for Q1), end is March 31st (month index 2). (0+3, day 0)
//     const endOfLastQuarter = new Date(endYear, startMonthIndex + 3, 0);

//     return { start: formatDate(startOfLastQuarter), end: formatDate(endOfLastQuarter) };
//   }, [formatDate]);

//   const getFormattedDateRangeForLastYear = useCallback((): { start: string; end: string } => {
//     const now = new Date();
//     const lastYearNum = now.getFullYear() - 1;
//     const startOfYear = new Date(lastYearNum, 0, 1); // Jan 1st
//     const endOfYear = new Date(lastYearNum, 11, 31); // Dec 31st
//     return { start: formatDate(startOfYear), end: formatDate(endOfYear) };
//   }, [formatDate]);

//   useEffect(() => {
//     if (isOpen) {
//       const currentInitial = initialFilters ?? defaultFilterState;
//       setFromDate(currentInitial.fromDate);
//       setToDate(currentInitial.toDate);
//       setSelectedRecipients([...currentInitial.selectedRecipients]);
//       setSelectedDirection(currentInitial.selectedDirection);
//       setSelectedStatus(currentInitial.selectedStatus);
//       setSelectedBalance([...currentInitial.selectedBalance]);

//       // Determine active date button based on initialFilters.fromDate and toDate
//       const { start: lastMonthStart, end: lastMonthEnd } = getFormattedDateRangeForLastMonth();
//       const { start: lastQuarterStart, end: lastQuarterEnd } = getFormattedDateRangeForLastQuarter();
//       const { start: lastYearStart, end: lastYearEnd } = getFormattedDateRangeForLastYear();

//       let newSelectedDateRange: string | null = null;
//       let newIsLastMonthActive = false;
//       let newIsLastQuarterActive = false;
//       let newIsLastYearActive = false;

//       if (currentInitial.fromDate && currentInitial.toDate) { // Only check if dates are present
//         if (currentInitial.fromDate === lastMonthStart && currentInitial.toDate === lastMonthEnd) {
//           newSelectedDateRange = "month";
//           newIsLastMonthActive = true;
//         } else if (currentInitial.fromDate === lastQuarterStart && currentInitial.toDate === lastQuarterEnd) {
//           newSelectedDateRange = "quarter";
//           newIsLastQuarterActive = true;
//         } else if (currentInitial.fromDate === lastYearStart && currentInitial.toDate === lastYearEnd) {
//           newSelectedDateRange = "year";
//           newIsLastYearActive = true;
//         }
//       }

//       setSelectedDateRange(newSelectedDateRange);
//       setIsLastMonthActive(newIsLastMonthActive);
//       setIsLastQuarterActive(newIsLastQuarterActive);
//       setIsLastYearActive(newIsLastYearActive);

//     }
//   }, [isOpen, initialFilters, formatDate, getFormattedDateRangeForLastMonth, getFormattedDateRangeForLastQuarter, getFormattedDateRangeForLastYear]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   const handleRecipientSelectionChange = (ids: (string | number)[]) => {
//     setSelectedRecipients(ids);
//   };
//   const handleDirectionChange = (direction: string) => {
//     setSelectedDirection(direction);
//   };
//   const handleStatusChange = (status: string | null) => {
//     setSelectedStatus(status);
//   };
//   const handleBalanceChange = (isSelected: boolean, currencyCode: string) => {
//     setSelectedBalance((curr) =>
//       isSelected
//         ? [...curr, currencyCode]
//         : curr.filter((c) => c !== currencyCode)
//     );
//   };

//   const setDateRangeAndStates = (
//     start: Date,
//     end: Date,
//     range: "month" | "quarter" | "year" | null
//   ) => {
//     setFromDate(formatDate(start));
//     setToDate(formatDate(end));
//     setSelectedDateRange(range);
//     setIsLastMonthActive(range === "month");
//     setIsLastQuarterActive(range === "quarter");
//     setIsLastYearActive(range === "year");
//   };

//   const getLastMonthRange = () => {
//     const { start, end } = getFormattedDateRangeForLastMonth();
//     setDateRangeAndStates(new Date(start.split('-').reverse().join('-')), new Date(end.split('-').reverse().join('-')), "month");
//   };
//   const getLastQuarterRange = () => {
//     const { start, end } = getFormattedDateRangeForLastQuarter();
//      setDateRangeAndStates(new Date(start.split('-').reverse().join('-')), new Date(end.split('-').reverse().join('-')), "quarter");
//   };
//   const getLastYearRange = () => {
//     const { start, end } = getFormattedDateRangeForLastYear();
//     setDateRangeAndStates(new Date(start.split('-').reverse().join('-')), new Date(end.split('-').reverse().join('-')), "year");
//   };

//   const handleClearDateRange = (rangeType: "month" | "quarter" | "year") => {
//     if (
//       (rangeType === "month" && isLastMonthActive) ||
//       (rangeType === "quarter" && isLastQuarterActive) ||
//       (rangeType === "year" && isLastYearActive)
//     ) {
//       setFromDate("");
//       setToDate("");
//       setSelectedDateRange(null);
//       setIsLastMonthActive(false);
//       setIsLastQuarterActive(false);
//       setIsLastYearActive(false);
//     }
//   };

//   const handleDateInputChange = (value: string, type: "from" | "to") => {
//     if (type === "from") setFromDate(value);
//     else setToDate(value);
//     // Deselect any active date range button if manual input occurs
//     setSelectedDateRange(null);
//     setIsLastMonthActive(false);
//     setIsLastQuarterActive(false);
//     setIsLastYearActive(false);
//   };

//   const handleApplyFilters = () => {
//     onFiltersApply({
//       selectedRecipients,
//       selectedDirection,
//       selectedStatus,
//       selectedBalance,
//       fromDate,
//       toDate,
//     });
//     // Parent component is responsible for closing the modal via `onClose`
//     // No need to change `is...Active` states here.
//   };

//   const handleClearAllFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setSelectedRecipients([]);
//     setSelectedDirection("all");
//     setSelectedStatus(null);
//     setSelectedBalance([]);
//     setSelectedDateRange(null);
//     setIsLastMonthActive(false);
//     setIsLastQuarterActive(false);
//     setIsLastYearActive(false);
//     onFiltersApply({ ...defaultFilterState });
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//             // onClick={onClose} // Keep if you want backdrop click to close, can be annoying during interaction
//           />

//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className={`fixed ${
//               isMobile
//                 ? "bottom-0 left-0 right-0 h-[100dvh]"
//                 : "top-0 right-0 sm:w-[600px] h-full"
//             } bg-white dark:bg-background z-80 flex flex-col`}
//             initial={
//               isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//             }
//             animate={
//               isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
//             }
//             exit={
//               isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//             }
//             transition={{ type: "tween", duration: 0.3 }}
//           >
//             <div className="sm:p-6 p-4 h-20 flex items-center justify-between flex-shrink-0 border-b border-neutral-200 dark:border-neutral-700 relative">
//               <h3 className="font-semibold text-mainheading dark:text-white text-xl lg:text-2xl">
//                 Filters
//               </h3>
//               <button
//                 onClick={onClose}
//                 className="p-2.5 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                 aria-label="Close filters"
//               >
//                 <IoClose
//                   className="text-neutral-900 dark:text-primary"
//                   size={28}
//                 />
//               </button>
//             </div>

//             <div className="sm:p-6 p-4 flex-grow overflow-y-auto scrollbar-hide space-y-6">
//               <div>
//                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                   Date
//                 </h4>
//                 <div className="flex items-center flex-wrap gap-2 mb-4">
//                   <button
//                     className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
//                       isLastMonthActive
//                         ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
//                         : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
//                     }`}
//                     onClick={() =>
//                       isLastMonthActive
//                         ? handleClearDateRange("month")
//                         : getLastMonthRange()
//                     }
//                   >
//                     Last month
//                     {isLastMonthActive && (
//                       <IoIosCloseCircleOutline
//                         size={20}
//                         className="ml-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("month");
//                         }}
//                       />
//                     )}
//                   </button>
//                    <button
//                     className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
//                       isLastQuarterActive
//                         ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
//                         : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
//                     }`}
//                     onClick={() =>
//                       isLastQuarterActive
//                         ? handleClearDateRange("quarter")
//                         : getLastQuarterRange()
//                     }
//                   >
//                     Last quarter
//                     {isLastQuarterActive && (
//                       <IoIosCloseCircleOutline
//                         size={20}
//                         className="ml-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("quarter");
//                         }}
//                       />
//                     )}
//                   </button>
//                    <button
//                     className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
//                       isLastYearActive
//                         ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
//                         : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
//                     }`}
//                     onClick={() =>
//                       isLastYearActive
//                         ? handleClearDateRange("year")
//                         : getLastYearRange()
//                     }
//                   >
//                     Last year
//                     {isLastYearActive && (
//                       <IoIosCloseCircleOutline
//                         size={20}
//                         className="ml-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleClearDateRange("year");
//                         }}
//                       />
//                     )}
//                   </button>
//                 </div>

//                 <div className="space-y-3">
//                   <DateInput
//                     placeholder="From date (DD-MM-YYYY)"
//                     value={fromDate}
//                     onChange={(date) => handleDateInputChange(date, "from")}
//                   />
//                   <DateInput
//                     placeholder="To date (DD-MM-YYYY)"
//                     value={toDate}
//                     onChange={(date) => handleDateInputChange(date, "to")}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Recipients
//                   selectedRecipientIds={selectedRecipients}
//                   onRecipientSelectionChange={handleRecipientSelectionChange}
//                 />
//               </div>
//               <div>
//                 <Status
//                   selectedStatus={selectedStatus}
//                   onStatusChange={handleStatusChange}
//                 />
//               </div>
//               <div>
//                 <DirectionFilter
//                   selectedDirection={selectedDirection}
//                   onDirectionChange={handleDirectionChange}
//                 />
//               </div>
//               {userAccounts && userAccounts.length > 0 && (
//                 <div>
//                   <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                     Balance
//                   </h4>
//                   <div className="space-y-2">
//                     {userAccounts.map((account) => {
//                       const currencyBalanceProps: CurrencyBalance = {
//                         currencyCode: account.currency.code,
//                         currencyName:
//                           account.currency.currencyName ||
//                           `${account.currency.code} Balance`,
//                         currencySymbolPath:
//                           account.currency.flagImage?.trim() ||
//                           `/assets/icon/${account.currency.code.toLowerCase()}.svg`,
//                       };
//                       return (
//                         <BalanceComponent
//                           key={account.currency.code}
//                           currencyBalance={currencyBalanceProps}
//                           onBalanceChange={handleBalanceChange}
//                           isSelected={selectedBalance.includes(
//                             account.currency.code
//                           )}
//                         />
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="sm:p-6 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0">
//               <div className="flex items-center gap-3">
//                 <button
//                   type="button"
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={handleClearAllFilters}
//                 >
//                   Clear all
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={handleApplyFilters}
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default FilterModal;

// frontend/src/app/dashboard/components/TransactionPageSection/FilterModal.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Account } from "@/types/account";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DateInput from "./Filter/DateInput";
import Recipients from "./Filter/Recipients";
import DirectionFilter from "./Filter/DirectionFilter";
import Status from "./Filter/Status";
import BalanceComponent, { CurrencyBalance } from "./Filter/Balance";
import { motion, AnimatePresence } from "framer-motion";

export interface AppliedFilters {
  selectedRecipients: (string | number)[];
  selectedDirection: string;
  selectedStatus: string | null;
  selectedBalance: string[];
  fromDate: string;
  toDate: string;
}

interface FilterModalProps {
  userAccounts: Account[];
  onFiltersApply: (filters: AppliedFilters) => void;
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: AppliedFilters;
}

const FilterModal: React.FC<FilterModalProps> = ({
  userAccounts,
  onFiltersApply,
  isOpen,
  onClose,
  initialFilters,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const defaultFilterState: AppliedFilters = {
    selectedRecipients: [],
    selectedDirection: "all",
    selectedStatus: null,
    selectedBalance: [],
    fromDate: "",
    toDate: "",
  };

  const [fromDate, setFromDate] = useState<string>(
    initialFilters?.fromDate ?? defaultFilterState.fromDate
  );
  const [toDate, setToDate] = useState<string>(
    initialFilters?.toDate ?? defaultFilterState.toDate
  );
  const [selectedRecipients, setSelectedRecipients] = useState<
    (string | number)[]
  >(
    initialFilters?.selectedRecipients ?? defaultFilterState.selectedRecipients
  );
  const [selectedDirection, setSelectedDirection] = useState<string>(
    initialFilters?.selectedDirection ?? defaultFilterState.selectedDirection
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    initialFilters?.selectedStatus ?? defaultFilterState.selectedStatus
  );
  const [selectedBalance, setSelectedBalance] = useState<string[]>(
    initialFilters?.selectedBalance ?? defaultFilterState.selectedBalance
  );

  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isLastMonthActive, setIsLastMonthActive] = useState(false);
  const [isLastQuarterActive, setIsLastQuarterActive] = useState(false);
  const [isLastYearActive, setIsLastYearActive] = useState(false);

  // --- Date Formatting Utility ---
  const formatDate = useCallback(
    (date: Date): string =>
      `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`,
    []
  );

  // --- Helper functions to get formatted date ranges for comparison ---
  const getFormattedDateRangeForLastMonth = useCallback((): {
    start: string;
    end: string;
  } => {
    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(
      lastMonthStart.getFullYear(),
      lastMonthStart.getMonth() + 1,
      0
    );
    return { start: formatDate(lastMonthStart), end: formatDate(lastMonthEnd) };
  }, [formatDate]);

  const getFormattedDateRangeForLastQuarter = useCallback((): {
    start: string;
    end: string;
  } => {
    const now = new Date();
    const currentQuarter = Math.floor(now.getMonth() / 3);
    let startYear = now.getFullYear();
    let endYear = now.getFullYear();
    let startMonthIndex = (currentQuarter - 1) * 3;

    if (currentQuarter === 0) {
      // Current is Q1 (Jan-Mar), so last quarter was Q4 of previous year
      startYear--;
      endYear--;
      startMonthIndex = 9; // October (month index 9)
    }

    const startOfLastQuarter = new Date(startYear, startMonthIndex, 1);
    // For end of quarter, get the last day of the 3rd month of that quarter
    // e.g., if startMonthIndex is 0 (Jan for Q1), end is March 31st (month index 2). (0+3, day 0)
    const endOfLastQuarter = new Date(endYear, startMonthIndex + 3, 0);

    return {
      start: formatDate(startOfLastQuarter),
      end: formatDate(endOfLastQuarter),
    };
  }, [formatDate]);

  const getFormattedDateRangeForLastYear = useCallback((): {
    start: string;
    end: string;
  } => {
    const now = new Date();
    const lastYearNum = now.getFullYear() - 1;
    const startOfYear = new Date(lastYearNum, 0, 1); // Jan 1st
    const endOfYear = new Date(lastYearNum, 11, 31); // Dec 31st
    return { start: formatDate(startOfYear), end: formatDate(endOfYear) };
  }, [formatDate]);

  useEffect(() => {
    if (isOpen) {
      const currentInitial = initialFilters ?? defaultFilterState;
      setFromDate(currentInitial.fromDate);
      setToDate(currentInitial.toDate);
      setSelectedRecipients([...currentInitial.selectedRecipients]);
      setSelectedDirection(currentInitial.selectedDirection);
      setSelectedStatus(currentInitial.selectedStatus);
      setSelectedBalance([...currentInitial.selectedBalance]);

      // Determine active date button based on initialFilters.fromDate and toDate
      const { start: lastMonthStart, end: lastMonthEnd } =
        getFormattedDateRangeForLastMonth();
      const { start: lastQuarterStart, end: lastQuarterEnd } =
        getFormattedDateRangeForLastQuarter();
      const { start: lastYearStart, end: lastYearEnd } =
        getFormattedDateRangeForLastYear();

      let newSelectedDateRange: string | null = null;
      let newIsLastMonthActive = false;
      let newIsLastQuarterActive = false;
      let newIsLastYearActive = false;

      if (currentInitial.fromDate && currentInitial.toDate) {
        // Only check if dates are present
        if (
          currentInitial.fromDate === lastMonthStart &&
          currentInitial.toDate === lastMonthEnd
        ) {
          newSelectedDateRange = "month";
          newIsLastMonthActive = true;
        } else if (
          currentInitial.fromDate === lastQuarterStart &&
          currentInitial.toDate === lastQuarterEnd
        ) {
          newSelectedDateRange = "quarter";
          newIsLastQuarterActive = true;
        } else if (
          currentInitial.fromDate === lastYearStart &&
          currentInitial.toDate === lastYearEnd
        ) {
          newSelectedDateRange = "year";
          newIsLastYearActive = true;
        }
      }

      setSelectedDateRange(newSelectedDateRange);
      setIsLastMonthActive(newIsLastMonthActive);
      setIsLastQuarterActive(newIsLastQuarterActive);
      setIsLastYearActive(newIsLastYearActive);
    }
  }, [
    isOpen,
    initialFilters,
    formatDate,
    getFormattedDateRangeForLastMonth,
    getFormattedDateRangeForLastQuarter,
    getFormattedDateRangeForLastYear,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRecipientSelectionChange = (ids: (string | number)[]) => {
    setSelectedRecipients(ids);
  };
  const handleDirectionChange = (direction: string) => {
    setSelectedDirection(direction);
  };
  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
  };
  const handleBalanceChange = (isSelected: boolean, currencyCode: string) => {
    setSelectedBalance((curr) =>
      isSelected
        ? [...curr, currencyCode]
        : curr.filter((c) => c !== currencyCode)
    );
  };

  const setDateRangeAndStates = (
    start: Date,
    end: Date,
    range: "month" | "quarter" | "year" | null
  ) => {
    setFromDate(formatDate(start));
    setToDate(formatDate(end));
    setSelectedDateRange(range);
    setIsLastMonthActive(range === "month");
    setIsLastQuarterActive(range === "quarter");
    setIsLastYearActive(range === "year");
  };

  const getLastMonthRange = () => {
    const { start, end } = getFormattedDateRangeForLastMonth();
    setDateRangeAndStates(
      new Date(start.split("-").reverse().join("-")),
      new Date(end.split("-").reverse().join("-")),
      "month"
    );
  };
  const getLastQuarterRange = () => {
    const { start, end } = getFormattedDateRangeForLastQuarter();
    setDateRangeAndStates(
      new Date(start.split("-").reverse().join("-")),
      new Date(end.split("-").reverse().join("-")),
      "quarter"
    );
  };
  const getLastYearRange = () => {
    const { start, end } = getFormattedDateRangeForLastYear();
    setDateRangeAndStates(
      new Date(start.split("-").reverse().join("-")),
      new Date(end.split("-").reverse().join("-")),
      "year"
    );
  };

  const handleClearDateRange = (rangeType: "month" | "quarter" | "year") => {
    if (
      (rangeType === "month" && isLastMonthActive) ||
      (rangeType === "quarter" && isLastQuarterActive) ||
      (rangeType === "year" && isLastYearActive)
    ) {
      setFromDate("");
      setToDate("");
      setSelectedDateRange(null);
      setIsLastMonthActive(false);
      setIsLastQuarterActive(false);
      setIsLastYearActive(false);
    }
  };

  const handleDateInputChange = (value: string, type: "from" | "to") => {
    if (type === "from") setFromDate(value);
    else setToDate(value);
    // Deselect any active date range button if manual input occurs
    setSelectedDateRange(null);
    setIsLastMonthActive(false);
    setIsLastQuarterActive(false);
    setIsLastYearActive(false);
  };

  const handleApplyFilters = () => {
    onFiltersApply({
      selectedRecipients,
      selectedDirection,
      selectedStatus,
      selectedBalance,
      fromDate,
      toDate,
    });
    // Parent component is responsible for closing the modal via `onClose`
    // No need to change `is...Active` states here.
  };

  const handleClearAllFilters = () => {
    setFromDate("");
    setToDate("");
    setSelectedRecipients([]);
    setSelectedDirection("all");
    setSelectedStatus(null);
    setSelectedBalance([]);
    setSelectedDateRange(null);
    setIsLastMonthActive(false);
    setIsLastQuarterActive(false);
    setIsLastYearActive(false);
    onFiltersApply({ ...defaultFilterState });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
            // onClick={onClose} // Keep if you want backdrop click to close, can be annoying during interaction
          />

          <motion.div
            id="filter-popup"
            ref={popupRef}
            className={`fixed ${
              isMobile
                ? "bottom-0 left-0 right-0 h-[100dvh]"
                : "top-0 right-0 sm:w-[600px] h-full"
            } bg-white dark:bg-background z-80 flex flex-col`}
            initial={
              isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
            }
            animate={
              isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
            }
            exit={
              isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
            }
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="sm:p-6 p-4 h-20 flex items-center justify-between flex-shrink-0 border-b border-neutral-200 dark:border-neutral-700 relative">
              <h3 className="font-semibold text-mainheading dark:text-white text-xl lg:text-2xl">
                Filters
              </h3>
              <button
                onClick={onClose}
                className="p-2.5 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                aria-label="Close filters"
              >
                <IoClose
                  className="text-neutral-900 dark:text-primary"
                  size={28}
                />
              </button>
            </div>

            <div className="sm:p-6 p-4 flex-grow overflow-y-auto scrollbar-hide space-y-6">
              <div>
                <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
                  Date
                </h4>
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <button
                    className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
                      isLastMonthActive
                        ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
                        : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
                    }`}
                    onClick={() =>
                      isLastMonthActive
                        ? handleClearDateRange("month")
                        : getLastMonthRange()
                    }
                  >
                    Last month
                    {isLastMonthActive && (
                      <IoIosCloseCircleOutline
                        size={20}
                        className="ml-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearDateRange("month");
                        }}
                      />
                    )}
                  </button>
                  <button
                    className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
                      isLastQuarterActive
                        ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
                        : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
                    }`}
                    onClick={() =>
                      isLastQuarterActive
                        ? handleClearDateRange("quarter")
                        : getLastQuarterRange()
                    }
                  >
                    Last quarter
                    {isLastQuarterActive && (
                      <IoIosCloseCircleOutline
                        size={20}
                        className="ml-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearDateRange("quarter");
                        }}
                      />
                    )}
                  </button>
                  <button
                    className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${
                      isLastYearActive
                        ? "bg-neutral-900 text-primary dark:bg-primarybox border-transparent"
                        : "text-mainheading dark:text-white bg-white dark:bg-background border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
                    }`}
                    onClick={() =>
                      isLastYearActive
                        ? handleClearDateRange("year")
                        : getLastYearRange()
                    }
                  >
                    Last year
                    {isLastYearActive && (
                      <IoIosCloseCircleOutline
                        size={20}
                        className="ml-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearDateRange("year");
                        }}
                      />
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  <DateInput
                    placeholder="From date (DD-MM-YYYY)"
                    value={fromDate}
                    onChange={(date) => handleDateInputChange(date, "from")}
                  />
                  <DateInput
                    placeholder="To date (DD-MM-YYYY)"
                    value={toDate}
                    onChange={(date) => handleDateInputChange(date, "to")}
                  />
                </div>
              </div>
              <div>
                <Recipients
                  selectedRecipientIds={selectedRecipients}
                  onRecipientSelectionChange={handleRecipientSelectionChange}
                />
              </div>
              <div>
                <Status
                  selectedStatus={selectedStatus}
                  onStatusChange={handleStatusChange}
                />
              </div>
              <div>
                <DirectionFilter
                  selectedDirection={selectedDirection}
                  onDirectionChange={handleDirectionChange}
                />
              </div>
              {userAccounts && userAccounts.length > 0 && (
                <div>
                  <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
                    Balance
                  </h4>
                  <div className="space-y-2">
                    {userAccounts.map((account) => {
                      const currencyBalanceProps: CurrencyBalance = {
                        currencyCode: account.currency.code,
                        currencyName:
                          account.currency.currencyName ||
                          `${account.currency.code} Balance`,
                        currencySymbolPath:
                          account.currency.flagImage?.trim() ||
                          `/assets/icon/${account.currency.code.toLowerCase()}.svg`,
                      };
                      return (
                        <BalanceComponent
                          key={account.currency.code}
                          currencyBalance={currencyBalanceProps}
                          onBalanceChange={handleBalanceChange}
                          isSelected={selectedBalance.includes(
                            account.currency.code
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="sm:p-6 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                  onClick={handleClearAllFilters}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
