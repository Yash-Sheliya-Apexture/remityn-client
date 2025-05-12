// // frontend/src/app/admin/components/transfers/TransferFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from '../add-money/CustomDropdown'; // Reusing CustomDropdown, adjust path if needed

// interface TransferFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     statusFilter: string;
//     setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyFilter: string;
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     transferIdFilter: string;
//     setTransferIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
//     recipientFilter: string;
//     setRecipientFilter: React.Dispatch<React.SetStateAction<string>>;
// }

// const TransferFilters: React.FC<TransferFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm,
//     setSearchTerm,
//     dateRange,
//     setDateRange,
//     statusFilter,
//     setStatusFilter,
//     currencyFilter,
//     setCurrencyFilter,
//     transferIdFilter,
//     setTransferIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
//     recipientFilter,
//     setRecipientFilter,
// }) => {
//     const filterModalRef = useRef(null);
//     const [showCalendar, setShowCalendar] = useState(false);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, setShowFilterModal]);


//     return (
//         <AnimatePresence>
//             {showFilterModal && (
//                 <motion.div
//                     ref={filterModalRef}
//                     initial={{ opacity: 0, x: '100%' }}
//                     animate={{ opacity: 1, x: '0%' }}
//                     exit={{ opacity: 0, x: '100%' }}
//                     transition={{ duration: 0.3 }}
//                     className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                 >
//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-medium text-gray-900">Filter Transfers</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Transfer ID Filter */}
//                         <div className="mb-4">
//                             <label htmlFor="transferIdFilter" className="block font-medium text-gray-700 mb-2">
//                                 Transfer ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="transferIdFilter"
//                                 value={transferIdFilter}
//                                 onChange={(e) => setTransferIdFilter(e.target.value)}
//                                 placeholder="Filter by Transfer ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div className="mb-4">
//                             <label htmlFor="amountFilter" className="block font-medium text-gray-700 mb-2">
//                                 Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 id="amountFilter"
//                                 value={amountFilter}
//                                 onChange={(e) => setAmountFilter(e.target.value)}
//                                 placeholder="Filter by Amount"
//                                 className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                             />
//                         </div>

//                         {/* Currency Filter - Custom Dropdown */}
//                         <div className="mb-4">
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />
//                         </div>

//                         {/* Status Filter - Custom Dropdown */}
//                         <div className="mb-4">
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />
//                         </div>

//                         {/* Recipient Filter */}
//                         <div className="mb-4">
//                             <label htmlFor="recipientFilter" className="block font-medium text-gray-700 mb-2">
//                                 Recipient Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="recipientFilter"
//                                 value={recipientFilter}
//                                 onChange={(e) => setRecipientFilter(e.target.value)}
//                                 placeholder="Filter by Recipient Name"
//                                 className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                             />
//                         </div>


//                         {/* Date Range Filter */}
//                         <div className="mb-4">
//                             <label htmlFor="dateRange" className="block font-medium text-gray-700 mb-2">
//                                 Date Range
//                             </label>
//                             <div className="relative">
//                                 <button className='w-full'>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowCalendar(!showCalendar)}
//                                         className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                     >
//                                         <span>
//                                             {dateRange.from ? (
//                                                 dateRange.to ? (
//                                                     `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                 )
//                                             ) : dateRange.to ? (
//                                                 `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                             ) : (
//                                                 'Select date range'
//                                             )}
//                                         </span>
//                                         <CalendarIcon className="size-5 text-gray-400" />
//                                     </button>
//                                 </button>

//                                 <AnimatePresence>
//                                     {showCalendar && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: 10 }}
//                                             className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                         >
//                                             <Calendar
//                                                 mode="range"
//                                                 selected={dateRange}
//                                                 onSelect={(range) => {
//                                                     setDateRange(range);
//                                                     setShowCalendar(false);
//                                                 }}
//                                             />
//                                             {(dateRange.from || dateRange.to) && (
//                                                 <div className="mt-2 flex justify-end">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             setDateRange({ from: null, to: null });
//                                                             setShowCalendar(false);
//                                                         }}
//                                                         className="text-sm text-error"
//                                                     >
//                                                         Clear dates
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="px-6 flex justify-end gap-3 pb-6 border-b border-gray-200">
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none hover:border-gray-400 transition-colors"
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none"
//                         >
//                             Apply Filters
//                         </button>
//                     </div>
//                     {/* Applied Filters Display inside Sidebar */}
//                     <div className="px-6 py-4">
//                         <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                         <div className="space-y-2">
//                             {searchTerm && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {transferIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Transfer ID: {transferIdFilter}</span>
//                                     <button onClick={() => setTransferIdFilter('')} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {recipientFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Recipient: {recipientFilter}</span>
//                                     <button onClick={() => setRecipientFilter('')} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {(dateRange.from || dateRange.to) && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                         {dateRange.from && dateRange.to ? ' - ' : ''}
//                                         {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                     </span>
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {Object.keys(dateRange).length > 0 && !dateRange.from && !dateRange.to && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Date: No range selected</span>
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default TransferFilters;




// // frontend/src/app/admin/components/transfers/TransferFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from '../add-money/CustomDropdown'; // Reusing CustomDropdown, adjust path if needed
// import { DateRange } from 'react-day-picker'; // Import DateRange type

// // --- Define the specific status type ---
// type TransferStatus = 'all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';

// interface TransferFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     // --- FIX: Use the specific TransferStatus type ---
//     statusFilter: TransferStatus;
//     setStatusFilter: React.Dispatch<React.SetStateAction<TransferStatus>>;
//     // --- End of FIX ---
//     currencyFilter: string; // Keep as string if 'all' is used generally
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     transferIdFilter: string;
//     setTransferIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     // --- FIX: Use the specific TransferStatus type for options ---
//     statusOptions: TransferStatus[];
//     // --- End of FIX ---
//     clearFilters: () => void;
//     recipientFilter: string;
//     setRecipientFilter: React.Dispatch<React.SetStateAction<string>>;
// }

// const TransferFilters: React.FC<TransferFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm,
//     setSearchTerm,
//     dateRange,
//     setDateRange,
//     statusFilter,
//     setStatusFilter, // Now correctly typed
//     currencyFilter,
//     setCurrencyFilter,
//     transferIdFilter,
//     setTransferIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions, // Now correctly typed
//     clearFilters,
//     recipientFilter,
//     setRecipientFilter,
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null);
//     const [showCalendar, setShowCalendar] = useState(false);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (!filterModalRef.current || !event.target) return;
//             if (!(event.target instanceof Node)) return;

//             const isClickOutsideModal = !filterModalRef.current.contains(event.target);
//             const isClickOutsidePopper = event.target instanceof Element && !event.target.closest('[data-radix-popper-content-wrapper]');

//             if (showFilterModal && isClickOutsideModal && isClickOutsidePopper) {
//                 setShowFilterModal(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [showFilterModal, setShowFilterModal]);

//     const getCalendarSelectedRange = (): DateRange | undefined => {
//         if (!dateRange.from && !dateRange.to) return undefined;
//         return { from: dateRange.from ?? undefined, to: dateRange.to ?? undefined };
//     };

//     // Helper function to handle setting status filter (ensures 'all' is treated correctly if needed)
//     const handleStatusChange = (value: string | null) => {
//         // Assuming CustomDropdown passes null if nothing selected, or the value string
//         // Map null back to 'all' or handle as needed by your CustomDropdown logic
//         const newStatus = (value as TransferStatus) ?? 'all'; // Cast to TransferStatus or default to 'all'
//         setStatusFilter(newStatus);
//     }

//     // Helper function to handle setting currency filter
//     const handleCurrencyChange = (value: string | null) => {
//         const newCurrency = value ?? 'all'; // Map null back to 'all'
//         setCurrencyFilter(newCurrency);
//     }


//     return (
//         <AnimatePresence>
//             {showFilterModal && (
//                 <motion.div
//                     ref={filterModalRef}
//                     initial={{ opacity: 0, x: '100%' }}
//                     animate={{ opacity: 1, x: '0%' }}
//                     exit={{ opacity: 0, x: '100%' }}
//                     transition={{ duration: 0.3 }}
//                     className="fixed top-0 right-0 h-full w-80 md:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 border-l border-gray-200 dark:border-gray-700 overflow-y-auto flex flex-col" // Added flex layout
//                 >
//                     {/* Header */}
//                     <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Transfers</h3>
//                         <button
//                             onClick={() => setShowFilterModal(false)}
//                             className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
//                             aria-label="Close filters"
//                         >
//                             <X size={20} />
//                         </button>
//                     </div>

//                     {/* Filters Form Area */}
//                     <div className="p-6 space-y-6 overflow-y-auto flex-grow">
//                         {/* Transfer ID Filter */}
//                         <div> {/* Removed mb-4, using space-y-6 on parent */}
//                             <label htmlFor="transferIdFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                 Transfer ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="transferIdFilter"
//                                 value={transferIdFilter}
//                                 onChange={(e) => setTransferIdFilter(e.target.value)}
//                                 placeholder="Filter by Transfer ID"
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div>
//                             <label htmlFor="amountFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                 Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 id="amountFilter"
//                                 value={amountFilter}
//                                 onChange={(e) => setAmountFilter(e.target.value)}
//                                 placeholder="Filter by Amount"
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
//                             />
//                         </div>

//                         {/* Currency Filter - Custom Dropdown */}
//                         <div>
//                              {/* Ensure CustomDropdown is adapted for dark mode if necessary */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 // Pass null if 'all', otherwise the value. Adapt based on CustomDropdown needs.
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={handleCurrencyChange} // Use handler
//                                 options={currencyOptions.filter(opt => opt !== 'all')} // Exclude 'all' if dropdown handles placeholder
//                                 placeholder="Select Currency" // Add placeholder if CustomDropdown supports it
//                             />
//                         </div>

//                         {/* Status Filter - Custom Dropdown */}
//                         <div>
//                              {/* Ensure CustomDropdown is adapted for dark mode if necessary */}
//                             <CustomDropdown
//                                 label="Status"
//                                 // Pass null if 'all', otherwise the value
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={handleStatusChange} // Use handler
//                                 options={statusOptions.filter(opt => opt !== 'all')} // Exclude 'all' if dropdown handles placeholder
//                                 placeholder="Select Status" // Add placeholder
//                             />
//                         </div>

//                         {/* Recipient Filter */}
//                         <div>
//                             <label htmlFor="recipientFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                 Recipient Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="recipientFilter"
//                                 value={recipientFilter}
//                                 onChange={(e) => setRecipientFilter(e.target.value)}
//                                 placeholder="Filter by Recipient Name"
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
//                             />
//                         </div>


//                         {/* Date Range Filter */}
//                         <div>
//                             <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                 Date Range
//                             </label>
//                             <div className="relative">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowCalendar(!showCalendar)}
//                                     className="flex items-center w-full justify-between border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                                 >
//                                     <span>
//                                         {dateRange.from ? (
//                                             dateRange.to ? (
//                                                 `${format(dateRange.from, 'PP')} - ${format(dateRange.to, 'PP')}` // Use PP for locale-aware short date
//                                             ) : (
//                                                 `From ${format(dateRange.from, 'PP')}`
//                                             )
//                                         ) : dateRange.to ? (
//                                             `Until ${format(dateRange.to, 'PP')}`
//                                         ) : (
//                                             'Select date range'
//                                         )}
//                                     </span>
//                                     <CalendarIcon className="size-4 text-gray-400 dark:text-gray-500" />
//                                 </button>

//                                 <AnimatePresence>
//                                     {showCalendar && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: 10 }}
//                                             data-radix-popper-content-wrapper // Keep for click outside detection
//                                             className="absolute mt-2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg z-10 border border-gray-300 dark:border-gray-600"
//                                         >
//                                             <Calendar
//                                                 mode="range"
//                                                 selected={getCalendarSelectedRange()}
//                                                 onSelect={(range: DateRange | undefined) => {
//                                                     setDateRange({
//                                                         from: range?.from ?? null,
//                                                         to: range?.to ?? null
//                                                     });
//                                                     setShowCalendar(false); // Close calendar after selection
//                                                 }}
//                                                 numberOfMonths={1}
//                                                  // Apply Shadcn styles if using its Calendar component
//                                                  className="[&>div]:space-x-0 [&>div]:gap-6" // Example adjustments
//                                                  classNames={{
//                                                     caption_label: "text-sm font-medium dark:text-white",
//                                                     head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] dark:text-gray-400",
//                                                     cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 dark:[&:has([aria-selected])]:bg-primary/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//                                                     day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white",
//                                                     day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white dark:bg-primary dark:text-secondary dark:hover:bg-primary/90",
//                                                     day_range_middle: "aria-selected:bg-primary/10 aria-selected:text-primary dark:aria-selected:bg-primary/20 dark:aria-selected:text-primary",
//                                                     day_range_start: "aria-selected:rounded-r-none",
//                                                     day_range_end: "aria-selected:rounded-l-none",
//                                                     day_outside: "text-muted-foreground opacity-50 dark:text-gray-500",
//                                                     day_disabled: "text-muted-foreground opacity-50 dark:text-gray-600",
//                                                     // Add other classes as needed from Shadcn examples
//                                                   }}
//                                             />
//                                             {(dateRange.from || dateRange.to) && (
//                                                 <div className="mt-2 flex justify-end">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             setDateRange({ from: null, to: null });
//                                                             setShowCalendar(false);
//                                                         }}
//                                                         className="text-xs text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400" // Adjusted style
//                                                     >
//                                                         Clear dates
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div> {/* End Filters Form Area */}

//                      {/* Applied Filters Display Area */}
//                     <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 max-h-40 overflow-y-auto">
//                         <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Applied Filters</h4>
//                         <div className="flex flex-wrap gap-2">
//                             {/* Helper function for rendering filter pills */}
//                             {renderFilterPill('Search', searchTerm, () => setSearchTerm(''))}
//                             {renderFilterPill('Transfer ID', transferIdFilter, () => setTransferIdFilter(''))}
//                             {renderFilterPill('Amount', amountFilter, () => setAmountFilter(''))}
//                             {renderFilterPill('Currency', currencyFilter !== 'all' ? currencyFilter : null, () => setCurrencyFilter('all'))}
//                             {renderFilterPill('Status', statusFilter !== 'all' ? statusFilter : null, () => setStatusFilter('all'))}
//                             {renderFilterPill('Recipient', recipientFilter, () => setRecipientFilter(''))}
//                             {renderFilterPill(
//                                 'Date',
//                                 (dateRange.from || dateRange.to)
//                                     ? `${dateRange.from ? format(dateRange.from, 'PP') : '...'} - ${dateRange.to ? format(dateRange.to, 'PP') : '...'}`
//                                     : null,
//                                 () => setDateRange({ from: null, to: null })
//                             )}
//                         </div>
//                     </div>

//                     {/* Actions Area */}
//                     <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 flex-shrink-0">
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium focus:outline-none hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)} // Apply is implicit by closing
//                             className="inline-flex justify-center px-4 py-2 text-sm cursor-pointer text-white dark:text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none dark:bg-primary dark:hover:bg-primary/90"
//                         >
//                             Done
//                         </button>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// // Helper function to render filter pills conditionally
// const renderFilterPill = (label: string, value: string | number | null | undefined, onClear: () => void) => {
//     if (!value) return null;
//     return (
//         <div className="bg-indigo-100 text-indigo-800 rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5 dark:bg-indigo-900 dark:text-indigo-200">
//             <span>{label}: {value}</span>
//             <button onClick={onClear} className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200" aria-label={`Clear ${label} filter`}>
//                 <X size={12} />
//             </button>
//         </div>
//     );
// };


// export default TransferFilters;


// frontend/src/app/admin/components/transfers/TransferFilters.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import CustomDropdown from '../add-money/CustomDropdown'; // Reusing CustomDropdown, adjust path if needed
import { DateRange } from 'react-day-picker'; // Import DateRange type

// --- Define the specific status type ---
type TransferStatus = 'all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';

interface TransferFiltersProps {
    showFilterModal: boolean;
    setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    dateRange: { from: Date | null; to: Date | null };
    setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
    statusFilter: TransferStatus;
    setStatusFilter: React.Dispatch<React.SetStateAction<TransferStatus>>;
    currencyFilter: string; // Keep as string if 'all' is used generally
    setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
    transferIdFilter: string;
    setTransferIdFilter: React.Dispatch<React.SetStateAction<string>>;
    amountFilter: string;
    setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
    currencyOptions: string[];
    statusOptions: TransferStatus[];
    clearFilters: () => void;
    recipientFilter: string;
    setRecipientFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TransferFilters: React.FC<TransferFiltersProps> = ({
    showFilterModal,
    setShowFilterModal,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    statusFilter,
    setStatusFilter,
    currencyFilter,
    setCurrencyFilter,
    transferIdFilter,
    setTransferIdFilter,
    amountFilter,
    setAmountFilter,
    currencyOptions,
    statusOptions,
    clearFilters,
    recipientFilter,
    setRecipientFilter,
}) => {
    const filterModalRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!filterModalRef.current || !event.target) return;
            if (!(event.target instanceof Node)) return;

            const isClickOutsideModal = !filterModalRef.current.contains(event.target);
            const isClickOutsidePopper = event.target instanceof Element && !event.target.closest('[data-radix-popper-content-wrapper]');

            if (showFilterModal && isClickOutsideModal && isClickOutsidePopper) {
                setShowFilterModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showFilterModal, setShowFilterModal]);

    const getCalendarSelectedRange = (): DateRange | undefined => {
        if (!dateRange.from && !dateRange.to) return undefined;
        return { from: dateRange.from ?? undefined, to: dateRange.to ?? undefined };
    };

    const handleStatusChange = (value: string | null) => {
        const newStatus = (value as TransferStatus) ?? 'all';
        setStatusFilter(newStatus);
    }

    const handleCurrencyChange = (value: string | null) => {
        const newCurrency = value ?? 'all';
        setCurrencyFilter(newCurrency);
    }


    return (
        <AnimatePresence>
            {showFilterModal && (
                <motion.div
                    ref={filterModalRef}
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: '0%' }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 right-0 h-full w-80 md:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 border-l border-gray-200 dark:border-gray-700 overflow-y-auto flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Transfers</h3>
                        <button
                            onClick={() => setShowFilterModal(false)}
                            className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label="Close filters"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Filters Form Area */}
                    <div className="p-6 space-y-6 overflow-y-auto flex-grow">
                        {/* Transfer ID Filter */}
                        <div>
                            <label htmlFor="transferIdFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Transfer ID
                            </label>
                            <input
                                type="text"
                                id="transferIdFilter"
                                value={transferIdFilter}
                                onChange={(e) => setTransferIdFilter(e.target.value)}
                                placeholder="Filter by Transfer ID"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        {/* Amount Filter */}
                        <div>
                            <label htmlFor="amountFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amountFilter"
                                value={amountFilter}
                                onChange={(e) => setAmountFilter(e.target.value)}
                                placeholder="Filter by Amount"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        {/* Currency Filter - Custom Dropdown */}
                        <div>
                            <CustomDropdown
                                label="Currency"
                                value={currencyFilter === 'all' ? null : currencyFilter}
                                onChange={handleCurrencyChange}
                                options={currencyOptions.filter(opt => opt !== 'all')}
                                // --- FIX: Use displayAllOption instead of placeholder ---
                                displayAllOption="Select Currency"
                                // --- End of FIX ---
                            />
                        </div>

                        {/* Status Filter - Custom Dropdown */}
                        <div>
                            <CustomDropdown
                                label="Status"
                                value={statusFilter === 'all' ? null : statusFilter}
                                onChange={handleStatusChange}
                                options={statusOptions.filter(opt => opt !== 'all')}
                                // --- FIX: Use displayAllOption instead of placeholder ---
                                displayAllOption="Select Status"
                                // --- End of FIX ---
                            />
                        </div>

                        {/* Recipient Filter */}
                        <div>
                            <label htmlFor="recipientFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Recipient Name
                            </label>
                            <input
                                type="text"
                                id="recipientFilter"
                                value={recipientFilter}
                                onChange={(e) => setRecipientFilter(e.target.value)}
                                placeholder="Filter by Recipient Name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                            />
                        </div>


                        {/* Date Range Filter */}
                        <div>
                            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date Range
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    className="flex items-center w-full justify-between border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                    <span>
                                        {dateRange.from ? (
                                            dateRange.to ? (
                                                `${format(dateRange.from, 'PP')} - ${format(dateRange.to, 'PP')}`
                                            ) : (
                                                `From ${format(dateRange.from, 'PP')}`
                                            )
                                        ) : dateRange.to ? (
                                            `Until ${format(dateRange.to, 'PP')}`
                                        ) : (
                                            'Select date range'
                                        )}
                                    </span>
                                    <CalendarIcon className="size-4 text-gray-400 dark:text-gray-500" />
                                </button>

                                <AnimatePresence>
                                    {showCalendar && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            data-radix-popper-content-wrapper
                                            className="absolute mt-2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg z-10 border border-gray-300 dark:border-gray-600"
                                        >
                                            <Calendar
                                                mode="range"
                                                selected={getCalendarSelectedRange()}
                                                onSelect={(range: DateRange | undefined) => {
                                                    setDateRange({
                                                        from: range?.from ?? null,
                                                        to: range?.to ?? null
                                                    });
                                                    setShowCalendar(false);
                                                }}
                                                numberOfMonths={1}
                                                 className="[&>div]:space-x-0 [&>div]:gap-6"
                                                 classNames={{
                                                    caption_label: "text-sm font-medium dark:text-white",
                                                    head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] dark:text-gray-400",
                                                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 dark:[&:has([aria-selected])]:bg-primary/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                    day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white",
                                                    day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white dark:bg-primary dark:text-secondary dark:hover:bg-primary/90",
                                                    day_range_middle: "aria-selected:bg-primary/10 aria-selected:text-primary dark:aria-selected:bg-primary/20 dark:aria-selected:text-primary",
                                                    day_range_start: "aria-selected:rounded-r-none",
                                                    day_range_end: "aria-selected:rounded-l-none",
                                                    day_outside: "text-muted-foreground opacity-50 dark:text-gray-500",
                                                    day_disabled: "text-muted-foreground opacity-50 dark:text-gray-600",
                                                  }}
                                            />
                                            {(dateRange.from || dateRange.to) && (
                                                <div className="mt-2 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setDateRange({ from: null, to: null });
                                                            setShowCalendar(false);
                                                        }}
                                                        className="text-xs text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                                                    >
                                                        Clear dates
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div> {/* End Filters Form Area */}

                     {/* Applied Filters Display Area */}
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 max-h-40 overflow-y-auto">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Applied Filters</h4>
                        <div className="flex flex-wrap gap-2">
                            {renderFilterPill('Search', searchTerm, () => setSearchTerm(''))}
                            {renderFilterPill('Transfer ID', transferIdFilter, () => setTransferIdFilter(''))}
                            {renderFilterPill('Amount', amountFilter, () => setAmountFilter(''))}
                            {renderFilterPill('Currency', currencyFilter !== 'all' ? currencyFilter : null, () => setCurrencyFilter('all'))}
                            {renderFilterPill('Status', statusFilter !== 'all' ? statusFilter : null, () => setStatusFilter('all'))}
                            {renderFilterPill('Recipient', recipientFilter, () => setRecipientFilter(''))}
                            {renderFilterPill(
                                'Date',
                                (dateRange.from || dateRange.to)
                                    ? `${dateRange.from ? format(dateRange.from, 'PP') : '...'} - ${dateRange.to ? format(dateRange.to, 'PP') : '...'}`
                                    : null,
                                () => setDateRange({ from: null, to: null })
                            )}
                        </div>
                    </div>

                    {/* Actions Area */}
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 flex-shrink-0">
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium focus:outline-none hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowFilterModal(false)}
                            className="inline-flex justify-center px-4 py-2 text-sm cursor-pointer text-white dark:text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none dark:bg-primary dark:hover:bg-primary/90"
                        >
                            Done
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Helper function to render filter pills conditionally (no changes needed here)
const renderFilterPill = (label: string, value: string | number | null | undefined, onClear: () => void) => {
    if (!value) return null;
    return (
        <div className="bg-indigo-100 text-indigo-800 rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5 dark:bg-indigo-900 dark:text-indigo-200">
            <span>{label}: {value}</span>
            <button onClick={onClear} className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200" aria-label={`Clear ${label} filter`}>
                <X size={12} />
            </button>
        </div>
    );
};


export default TransferFilters;