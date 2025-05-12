// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';

// interface PaymentFiltersProps {
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
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
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
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
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
//                             <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Payment ID Filter */}
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-1">
//                                 Payment ID
//                             </label>
//                             <input
//                                 type="text"
//                                 value={paymentIdFilter}
//                                 onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                 placeholder="Filter by Payment ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-1">
//                                 Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 value={amountFilter}
//                                 onChange={(e) => setAmountFilter(e.target.value)}
//                                 placeholder="Filter by Amount"
//                                 className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                             />
//                         </div>

//                         {/* Currency Filter - Custom Dropdown */}
//                         <CustomDropdown
//                             label="Currency"
//                             value={currencyFilter === 'all' ? null : currencyFilter}
//                             onChange={setCurrencyFilter}
//                             options={currencyOptions}
//                         />

//                         {/* Status Filter - Custom Dropdown */}
//                         <CustomDropdown
//                             label="Status"
//                             value={statusFilter === 'all' ? null : statusFilter}
//                             onChange={setStatusFilter}
//                             options={statusOptions}
//                         />

//                         {/* Date Range Filter */}
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-1">
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

//                     <div className="px-6 flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
//                                     <span>User Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {paymentIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Payment ID: {paymentIdFilter}</span>
//                                     <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2">
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
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
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

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';

// interface PaymentFiltersProps {
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
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
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
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
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
//                             <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Payment ID Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="paymentIdFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
//                                 Payment ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="paymentIdFilter"
//                                 value={paymentIdFilter}
//                                 onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                 placeholder="Filter by Payment ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="amountFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
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
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />
//                         </div>

//                         {/* Status Filter - Custom Dropdown */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />
//                         </div>

//                         {/* Date Range Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="dateRange" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
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

//                     <div className="px-6 flex justify-end gap-3 pb-6 border-b border-gray-200"> {/* Added padding bottom and border */}
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none hover:border-gray-400 transition-colors" // Improved hover effect
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none" // Improved hover effect
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
//                                     <span>User Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {paymentIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Payment ID: {paymentIdFilter}</span>
//                                     <button onClick={() => setPaymentIdFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
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
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
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

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';

// interface PaymentFiltersProps {
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
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
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
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
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
//                             <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Payment ID Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="paymentIdFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
//                                 Payment ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="paymentIdFilter"
//                                 value={paymentIdFilter}
//                                 onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                 placeholder="Filter by Payment ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="amountFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
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
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />
//                         </div>

//                         {/* Status Filter - Custom Dropdown */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />
//                         </div>

//                         {/* Date Range Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="dateRange" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
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

//                     <div className="px-6 flex justify-end gap-3 pb-6 border-b border-gray-200"> {/* Added padding bottom and border */}
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none hover:border-gray-400 transition-colors" // Improved hover effect
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none" // Improved hover effect
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
//                                     <span>User Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {paymentIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Payment ID: {paymentIdFilter}</span>
//                                     <button onClick={() => setPaymentIdFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
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
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
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

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';
// import { IoClose } from 'react-icons/io5';

// interface PaymentFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     // Keep general filters as string/simple types
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyFilter: string; // Can remain string or 'all' | string
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[]; // string array is fine
//     // Date range type
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     // Use specific types for status filter
//     statusFilter: PaymentStatus; // Use the specific union type
//     setStatusFilter: React.Dispatch<React.SetStateAction<PaymentStatus>>; // Use the specific state setter type
//     statusOptions: PaymentStatus[]; // Expect an array of the specific statuses
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm, // Not used directly in this component's UI, but kept for props consistency
//     setSearchTerm, // Not used directly in this component's UI
//     dateRange,
//     setDateRange,
//     statusFilter,
//     setStatusFilter, // Now correctly typed
//     currencyFilter,
//     setCurrencyFilter,
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions, // Now correctly typed
//     clearFilters,
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [isMobile, setIsMobile] = useState(false); // State to track mobile view

//     // --- Temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
//     const [tempDateRange, setTempDateRange] = useState(dateRange);
//     const [tempStatusFilter, setTempStatusFilter] = useState(statusFilter);
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(currencyFilter);
//     const [tempPaymentIdFilter, setTempPaymentIdFilter] = useState(paymentIdFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => { // Type event as MouseEvent
//             // Ensure event.target is a Node before calling contains
//             if (
//                 showFilterModal &&
//                 filterModalRef.current &&
//                 event.target instanceof Node && // Type guard
//                 !filterModalRef.current.contains(event.target) &&
//                  // Keep Radix check using closest which works on Element
//                 !(event.target instanceof Element && event.target.closest('[id^="radix-ui-popper-"]'))
//             ) {
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
//                             <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <IoClose className="text-neutral-900 dark:text-white size-7" />
//                             </button>
//                         </div>

//                     <div className="p-6 space-y-6">
//                         {/* Payment ID Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="paymentIdFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
//                                 Payment ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="paymentIdFilter"
//                                 value={paymentIdFilter}
//                                 onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                 placeholder="Filter by Payment ID"
//                                 className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                             />
//                         </div>
//                         {/* Amount Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="amountFilter" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
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
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Currency"
//                                 value={currencyFilter === 'all' ? null : currencyFilter}
//                                 onChange={setCurrencyFilter}
//                                 options={currencyOptions}
//                             />
//                         </div>

//                         {/* Status Filter - Custom Dropdown */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <CustomDropdown
//                                 label="Status"
//                                 value={statusFilter === 'all' ? null : statusFilter}
//                                 onChange={setStatusFilter}
//                                 options={statusOptions}
//                             />
//                         </div>

//                         {/* Date Range Filter */}
//                         <div className="mb-4"> {/* Added margin bottom for spacing */}
//                             <label htmlFor="dateRange" className="block font-medium text-gray-700 mb-2"> {/* mb-2 for label spacing */}
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

//                     <div className="px-6 flex justify-end gap-3 pb-6 border-b border-gray-200"> {/* Added padding bottom and border */}
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none hover:border-gray-400 transition-colors" // Improved hover effect
//                         >
//                             Clear All
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setShowFilterModal(false)}
//                             className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none" // Improved hover effect
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
//                                     <span>User Search: {searchTerm}</span>
//                                     <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {paymentIdFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Payment ID: {paymentIdFilter}</span>
//                                     <button onClick={() => setPaymentIdFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {amountFilter && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Amount: {amountFilter}</span>
//                                     <button onClick={() => setAmountFilter('')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {currencyFilter && currencyFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Currency: {currencyFilter}</span>
//                                     <button onClick={() => setCurrencyFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                             {statusFilter !== 'all' && (
//                                 <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                     <span>Status: {statusFilter}</span>
//                                     <button onClick={() => setStatusFilter('all')} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
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
//                                     <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2 hover:text-indigo-900 transition-colors"> {/* Improved hover effect */}
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
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';
// import { IoClose } from "react-icons/io5"; // Import IoClose icon

// interface PaymentFiltersProps {
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
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: string[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
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
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
// }) => {
//     const filterModalRef = useRef(null);
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [isMobile, setIsMobile] = useState(false); // State to track mobile view

//     // --- Temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
//     const [tempDateRange, setTempDateRange] = useState(dateRange);
//     const [tempStatusFilter, setTempStatusFilter] = useState(statusFilter);
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(currencyFilter);
//     const [tempPaymentIdFilter, setTempPaymentIdFilter] = useState(paymentIdFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter);

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

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640);
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Sync props to temp state when modal opens
//     useEffect(() => {
//         if (showFilterModal) {
//             setTempSearchTerm(searchTerm);
//             setTempDateRange(dateRange);
//             setTempStatusFilter(statusFilter);
//             setTempCurrencyFilter(currencyFilter);
//             setTempPaymentIdFilter(paymentIdFilter);
//             setTempAmountFilter(amountFilter);
//         }
//     }, [showFilterModal, searchTerm, dateRange, statusFilter, currencyFilter, paymentIdFilter, amountFilter]);

//     const closePopup = () => setShowFilterModal(false);

//     const applyFilters = () => {
//         setSearchTerm(tempSearchTerm);
//         setDateRange(tempDateRange);
//         setStatusFilter(tempStatusFilter);
//         setCurrencyFilter(tempCurrencyFilter);
//         setPaymentIdFilter(tempPaymentIdFilter);
//         setAmountFilter(tempAmountFilter);
//         setShowFilterModal(false);
//     };

//     const handleClearAllFilters = () => {
//         setTempSearchTerm('');
//         setTempDateRange({ from: null, to: null });
//         setTempStatusFilter('all');
//         setTempCurrencyFilter('all');
//         setTempPaymentIdFilter('');
//         setTempAmountFilter('');
//         clearFilters(); // Call parent clearFilters to reset external state
//         setShowFilterModal(false); // Close modal after clearing
//     };

//     return (
//         <AnimatePresence>
//             {showFilterModal && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 0.5 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//                         onClick={closePopup}
//                     />

//                     <motion.div
//                         ref={filterModalRef}
//                         initial={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
//                         animate={isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }}
//                         exit={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
//                         transition={{ type: "tween", duration: 0.3 }}
//                         className={`fixed ${
//                             isMobile
//                               ? "bottom-0 left-0 right-0 h-[100vh]"
//                               : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200"
//                           } bg-white dark:bg-background z-50 flex flex-col shadow-xl overflow-y-auto`} // Apply similar popup styles and scrollable
//                     >
//                         {/* Header */}
//                         <div className="p-5 flex items-center justify-between flex-shrink-0 border-b relative">
//                             <h3 className="font-semibold text-mainheading dark:text-white text-lg">
//                                 Filter Payments
//                             </h3>
//                             <button
//                                 onClick={() => setShowFilterModal(false)}
//                                 className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                             >
//                                 <IoClose className="text-neutral-900 dark:text-white size-7" />
//                             </button>
//                         </div>

//                         {/* Scrollable Content Area */}
//                         <div className="p-6 space-y-6 flex-grow overflow-y-auto scrollbar-hide"> {/* Apply scrollable content styles */}
//                             {/* Payment ID Filter */}
//                             <div className="mb-4">
//                                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                     Payment ID
//                                 </h4>
//                                 <input
//                                     type="text"
//                                     id="paymentIdFilter"
//                                     value={tempPaymentIdFilter}
//                                     onChange={(e) => setTempPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div className="mb-4">
//                                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                     Amount
//                                 </h4>
//                                 <input
//                                     type="number"
//                                     id="amountFilter"
//                                     value={tempAmountFilter}
//                                     onChange={(e) => setTempAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                 />
//                             </div>

//                             {/* Currency Filter - Custom Dropdown */}
//                             <div className="mb-4">
//                                 <CustomDropdown
//                                     label={
//                                         <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                             Currency
//                                         </h4>
//                                     }
//                                     value={tempCurrencyFilter === 'all' ? null : tempCurrencyFilter}
//                                     onChange={setTempCurrencyFilter}
//                                     options={currencyOptions}
//                                 />
//                             </div>

//                             {/* Status Filter - Custom Dropdown */}
//                             <div className="mb-4">
//                                 <CustomDropdown
//                                     label={
//                                         <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                             Status
//                                         </h4>
//                                     }
//                                     value={tempStatusFilter === 'all' ? null : tempStatusFilter}
//                                     onChange={setTempStatusFilter}
//                                     options={statusOptions}
//                                 />
//                             </div>

//                             {/* Date Range Filter */}
//                             <div className="mb-4">
//                                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1"> {/* Styled Date Label */}
//                                     Date Range
//                                 </h4>
//                                 <div className="relative">
//                                     <button className='w-full'>
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowCalendar(!showCalendar)}
//                                             className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                         >
//                                             <span>
//                                                 {tempDateRange.from ? (
//                                                     tempDateRange.to ? (
//                                                         `${format(tempDateRange.from, 'MMM dd, yyyy')} - ${format(tempDateRange.to, 'MMM dd, yyyy')}`
//                                                     ) : (
//                                                         `From ${format(tempDateRange.from, 'MMM dd, yyyy')}`
//                                                     )
//                                                 ) : tempDateRange.to ? (
//                                                     `Until ${format(tempDateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     'Select date range'
//                                                 )}
//                                             </span>
//                                             <CalendarIcon className="size-5 text-gray-400" />
//                                         </button>
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     selected={tempDateRange}
//                                                     onSelect={(range) => {
//                                                         setTempDateRange(range);
//                                                         setShowCalendar(false);
//                                                     }}
//                                                 />
//                                                 {(tempDateRange.from || tempDateRange.to) && (
//                                                     <div className="mt-2 flex justify-end">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setTempDateRange({ from: null, to: null });
//                                                                 setShowCalendar(false);
//                                                             }}
//                                                             className="text-sm text-error"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="p-4 border-t bg-white dark:bg-background flex-shrink-0"> {/* Apply footer styles */}
//                             <div className="flex items-center gap-3">
//                                 {/* Clear all Button */}
//                                 <button
//                                     type="button"
//                                     onClick={handleClearAllFilters}
//                                     className="w-full bg-white border text-main font-medium cursor-pointer py-3 px-4 rounded-full hover:bg-gray-50"
//                                 >
//                                     Clear all
//                                 </button>
//                                 {/* Apply Filters Button */}
//                                 <button
//                                     type="button"
//                                     onClick={applyFilters}
//                                     className="w-full bg-primary text-main font-medium py-3 px-4 cursor-pointer rounded-full hover:bg-primary/90"
//                                 >
//                                     Apply Filters
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// };

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon } from 'lucide-react'; // Removed X import as IoClose is used
// import CustomDropdown from './CustomDropdown';
// import { IoClose } from "react-icons/io5"; // Import IoClose icon
// import { DateRange } from 'react-day-picker'; // Import DateRange type
// import { PaymentStatus } from '../../../../types/payment'; // Import shared PaymentStatus type

// interface PaymentFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     dateRange: { from: Date | null; to: Date | null };
//     setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | null; to: Date | null }>>;
//     statusFilter: PaymentStatus; // Use PaymentStatus type
//     setStatusFilter: React.Dispatch<React.SetStateAction<PaymentStatus>>; // Use PaymentStatus type
//     currencyFilter: string; // Keep as string ('all' or specific code)
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: PaymentStatus[]; // Use PaymentStatus type
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
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
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null); // Added correct ref type
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     // --- Temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
//     const [tempDateRange, setTempDateRange] = useState(dateRange);
//     const [tempStatusFilter, setTempStatusFilter] = useState<PaymentStatus>(statusFilter); // Use PaymentStatus
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(currencyFilter);
//     const [tempPaymentIdFilter, setTempPaymentIdFilter] = useState(paymentIdFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter);

//     // Click outside handler
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => { // Added MouseEvent type
//             if (
//                 showFilterModal &&
//                 filterModalRef.current &&
//                 !filterModalRef.current.contains(event.target as Node) && // Check if contains exists before calling
//                 !(event.target as Element).closest('[id^="radix-ui-popper-"]') // Keep Radix check
//             ) {
//                 setShowFilterModal(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, setShowFilterModal]); // Added setShowFilterModal dependency

//     // Mobile check
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640);
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Sync props to temp state when modal opens
//     useEffect(() => {
//         if (showFilterModal) {
//             setTempSearchTerm(searchTerm);
//             setTempDateRange(dateRange);
//             setTempStatusFilter(statusFilter); // Sync PaymentStatus
//             setTempCurrencyFilter(currencyFilter);
//             setTempPaymentIdFilter(paymentIdFilter);
//             setTempAmountFilter(amountFilter);
//         }
//     }, [showFilterModal, searchTerm, dateRange, statusFilter, currencyFilter, paymentIdFilter, amountFilter]);

//     const closePopup = () => setShowFilterModal(false);

//     const applyFilters = () => {
//         setSearchTerm(tempSearchTerm);
//         setDateRange(tempDateRange);
//         setStatusFilter(tempStatusFilter); // Apply PaymentStatus
//         setCurrencyFilter(tempCurrencyFilter);
//         setPaymentIdFilter(tempPaymentIdFilter);
//         setAmountFilter(tempAmountFilter);
//         setShowFilterModal(false);
//     };

//     const handleClearAllFilters = () => {
//         setTempSearchTerm('');
//         setTempDateRange({ from: null, to: null });
//         setTempStatusFilter('all'); // Reset to 'all' (PaymentStatus)
//         setTempCurrencyFilter('all');
//         setTempPaymentIdFilter('');
//         setTempAmountFilter('');
//         clearFilters(); // Call parent clearFilters to reset external state
//         setShowFilterModal(false); // Close modal after clearing
//     };

//     // Handler for CustomDropdown (assuming it returns string)
//     const handleStatusChange = (value: string | null) => {
//         // Ensure 'all' or a valid status is set. Cast to PaymentStatus.
//         setTempStatusFilter((value as PaymentStatus) ?? 'all');
//     };

//     const handleCurrencyChange = (value: string | null) => {
//         setTempCurrencyFilter(value ?? 'all');
//     }

//     return (
//         <AnimatePresence>
//             {showFilterModal && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 0.5 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//                         onClick={closePopup}
//                         aria-hidden="true" // Add for accessibility
//                     />

//                     <motion.div
//                         ref={filterModalRef}
//                         initial={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
//                         animate={isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }}
//                         exit={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
//                         transition={{ type: "tween", duration: 0.3 }}
//                         className={`fixed ${
//                             isMobile
//                               ? "bottom-0 left-0 right-0 h-[100vh]" // Consider max-h-screen or similar if full height isn't always needed
//                               : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200 dark:border-neutral-700" // Dark mode border
//                           } bg-white dark:bg-background z-50 flex flex-col shadow-xl overflow-y-auto`}
//                         role="dialog" // Add role
//                         aria-modal="true" // Add aria-modal
//                         aria-labelledby="filter-payments-heading" // Add label reference
//                     >
//                         {/* Header */}
//                         <div className="p-5 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-neutral-700 relative">
//                             <h3 id="filter-payments-heading" className="font-semibold text-mainheading dark:text-white text-lg">
//                                 Filter Payments
//                             </h3>
//                             <button
//                                 onClick={closePopup}
//                                 aria-label="Close filter panel" // Add aria-label
//                                 className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                             >
//                                 <IoClose className="text-neutral-900 dark:text-white size-7" />
//                             </button>
//                         </div>

//                         {/* Scrollable Content Area */}
//                         <div className="p-6 space-y-6 flex-grow overflow-y-auto scrollbar-hide">
//                             {/* Payment ID Filter */}
//                             <div className="mb-4">
//                                 <label htmlFor="paymentIdFilter" className="text-gray-500 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                     Payment ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="paymentIdFilter"
//                                     value={tempPaymentIdFilter}
//                                     onChange={(e) => setTempPaymentIdFilter(e.target.value)}
//                                     placeholder="Filter by Payment ID"
//                                     className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 dark:border-neutral-600 rounded-md border sm:text-sm bg-white dark:bg-primarybox dark:text-white dark:placeholder:text-neutral-400" // Dark mode styles
//                                 />
//                             </div>
//                             {/* Amount Filter */}
//                             <div className="mb-4">
//                                 <label htmlFor="amountFilter" className="text-gray-500 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="amountFilter"
//                                     value={tempAmountFilter}
//                                     onChange={(e) => setTempAmountFilter(e.target.value)}
//                                     placeholder="Filter by Amount"
//                                     className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 dark:border-neutral-600 rounded-md sm:text-sm bg-white dark:bg-primarybox dark:text-white dark:placeholder:text-neutral-400" // Dark mode styles
//                                     // Hide number input spinners (optional styling)
//                                     style={{ appearance: 'textfield' }} // For Firefox
//                                     // For Chrome, Safari, Edge, Opera: add CSS in a global file or style block
//                                     // input[type=number]::-webkit-inner-spin-button,
//                                     // input[type=number]::-webkit-outer-spin-button {
//                                     //   -webkit-appearance: none;
//                                     //   margin: 0;
//                                     // }
//                                 />
//                             </div>

//                             {/* Currency Filter - Custom Dropdown */}
//                             <div className="mb-4">
//                                 <CustomDropdown
//                                     label={
//                                         <span className="text-gray-500 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                             Currency
//                                         </span>
//                                     }
//                                     value={tempCurrencyFilter === 'all' ? null : tempCurrencyFilter}
//                                     onChange={handleCurrencyChange} // Use specific handler
//                                     options={currencyOptions} // Pass string[]
//                                 />
//                             </div>

//                             {/* Status Filter - Custom Dropdown */}
//                             <div className="mb-4">
//                                 <CustomDropdown
//                                     label={
//                                         <span className="text-gray-500 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                             Status
//                                         </span>
//                                     }
//                                     // CustomDropdown expects string|null, 'all' is mapped to null
//                                     value={tempStatusFilter === 'all' ? null : tempStatusFilter}
//                                     onChange={handleStatusChange} // Use specific handler
//                                     options={statusOptions} // Pass PaymentStatus[] (dropdown should handle displaying them)
//                                 />
//                             </div>

//                             {/* Date Range Filter */}
//                             <div className="mb-4">
//                                 <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//                                     Date Range
//                                 </h4>
//                                 <div className="relative">
//                                      {/* The inner button was redundant, keep only one trigger */}
//                                     <button
//                                         type="button"
//                                         id="date-range-picker-button"
//                                         onClick={() => setShowCalendar(!showCalendar)}
//                                         className="flex items-center w-full justify-between border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-3 bg-white dark:bg-primarybox font-medium text-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary"
//                                         aria-haspopup="dialog" // Indicate it opens a dialog/calendar
//                                         aria-expanded={showCalendar} // Indicate expanded state
//                                     >
//                                         <span>
//                                             {tempDateRange.from ? (
//                                                 tempDateRange.to ? (
//                                                     `${format(tempDateRange.from, 'MMM dd, yyyy')} - ${format(tempDateRange.to, 'MMM dd, yyyy')}`
//                                                 ) : (
//                                                     `From ${format(tempDateRange.from, 'MMM dd, yyyy')}`
//                                                 )
//                                             ) : tempDateRange.to ? (
//                                                 `Until ${format(tempDateRange.to, 'MMM dd, yyyy')}`
//                                             ) : (
//                                                 'Select date range'
//                                             )}
//                                         </span>
//                                         <CalendarIcon className="size-5 text-gray-400 dark:text-gray-500" />
//                                     </button>

//                                     <AnimatePresence>
//                                         {showCalendar && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: 10 }}
//                                                 className="absolute mt-2 bg-white dark:bg-secondarybox p-4 rounded-md shadow-lg z-10 border border-gray-300 dark:border-neutral-700"
//                                                 role="dialog" // Role for calendar popup
//                                                 aria-label="Date range selection" // Aria label
//                                             >
//                                                 <Calendar
//                                                     mode="range"
//                                                     // Fix: Pass undefined instead of null to 'selected'
//                                                     selected={{
//                                                         from: tempDateRange.from ?? undefined,
//                                                         to: tempDateRange.to ?? undefined,
//                                                     }}
//                                                     // Fix: Handle DateRange | undefined from onSelect
//                                                     onSelect={(range: DateRange | undefined) => {
//                                                         setTempDateRange({
//                                                             from: range?.from ?? null, // Map undefined back to null
//                                                             to: range?.to ?? null,   // Map undefined back to null
//                                                         });
//                                                         // Optionally close calendar on selection, or keep it open
//                                                         // Consider adding a button within the calendar div to confirm selection if keeping it open
//                                                         // setShowCalendar(false); // Uncomment if you want it to close immediately
//                                                     }}
//                                                     className="dark:bg-secondarybox dark:text-white" // Basic dark mode for calendar
//                                                     // Add styles for dark mode calendar selection etc. if needed
//                                                     // e.g., using classNames prop from react-day-picker
//                                                 />
//                                                 <div className="mt-4 flex justify-between gap-2 border-t pt-3 dark:border-neutral-600">
//                                                      {(tempDateRange.from || tempDateRange.to) && (
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => {
//                                                                 setTempDateRange({ from: null, to: null });
//                                                                 // Don't close calendar here, let user confirm or close manually
//                                                             }}
//                                                             className="text-sm text-error dark:text-red-400 hover:underline"
//                                                         >
//                                                             Clear dates
//                                                         </button>
//                                                     )}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => setShowCalendar(false)}
//                                                         className="text-sm text-primary dark:text-blue-400 hover:underline ml-auto"
//                                                     >
//                                                         Done
//                                                     </button>
//                                                 </div>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0">
//                             <div className="flex items-center gap-3">
//                                 {/* Clear all Button */}
//                                 <button
//                                     type="button"
//                                     onClick={handleClearAllFilters}
//                                     className="w-full bg-white dark:bg-secondarybox border border-gray-300 dark:border-neutral-600 text-mainheading dark:text-white font-medium cursor-pointer py-3 px-4 rounded-full hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
//                                 >
//                                     Clear all
//                                 </button>
//                                 {/* Apply Filters Button */}
//                                 <button
//                                     type="button"
//                                     onClick={applyFilters}
//                                     className="w-full bg-primary text-white dark:text-black font-medium py-3 px-4 cursor-pointer rounded-full hover:bg-primary/90 transition-colors"
//                                 >
//                                     Apply Filters
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// };

// export default PaymentFilters;

// // components/admin/payments/PaymentFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IoClose } from "react-icons/io5";
// import CustomDropdown from './CustomDropdown';
// import DateInput from '../../../dashboard/components/TransactionPageSection/Filter/DateInput'; // Import DateInput component
// import { PaymentStatus } from '../../../../types/payment';

// interface PaymentFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     searchTerm: string;
//     setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//     fromDate: string; // Use string for DateInput value
//     setFromDate: React.Dispatch<React.SetStateAction<string>>; // Use string for DateInput value
//     toDate: string; // Use string for DateInput value
//     setToDate: React.Dispatch<React.SetStateAction<string>>; // Use string for DateInput value
//     statusFilter: PaymentStatus;
//     setStatusFilter: React.Dispatch<React.SetStateAction<PaymentStatus>>;
//     currencyFilter: string;
//     setCurrencyFilter: React.Dispatch<React.SetStateAction<string>>;
//     paymentIdFilter: string;
//     setPaymentIdFilter: React.Dispatch<React.SetStateAction<string>>;
//     amountFilter: string;
//     setAmountFilter: React.Dispatch<React.SetStateAction<string>>;
//     currencyOptions: string[];
//     statusOptions: PaymentStatus[];
//     clearFilters: () => void;
// }

// const PaymentFilters: React.FC<PaymentFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     searchTerm,
//     setSearchTerm,
//     fromDate,
//     setFromDate,
//     toDate,
//     setToDate,
//     statusFilter,
//     setStatusFilter,
//     currencyFilter,
//     setCurrencyFilter,
//     paymentIdFilter,
//     setPaymentIdFilter,
//     amountFilter,
//     setAmountFilter,
//     currencyOptions,
//     statusOptions,
//     clearFilters,
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null);
//     const [isMobile, setIsMobile] = useState(false);

//     // --- Temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
//     const [tempStatusFilter, setTempStatusFilter] = useState<PaymentStatus>(statusFilter);
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(currencyFilter);
//     const [tempPaymentIdFilter, setTempPaymentIdFilter] = useState(paymentIdFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter);
//     const [tempFromDate, setTempFromDate] = useState(fromDate);
//     const [tempToDate, setTempToDate] = useState(toDate);

//     // Click outside handler
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 showFilterModal &&
//                 filterModalRef.current &&
//                 !filterModalRef.current.contains(event.target as Node) &&
//                 !(event.target as Element).closest('[id^="radix-ui-popper-"]')
//             ) {
//                 setShowFilterModal(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, setShowFilterModal]);

//     // Mobile check
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640);
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Sync props to temp state when modal opens
//     useEffect(() => {
//         if (showFilterModal) {
//             setTempSearchTerm(searchTerm);
//             setTempStatusFilter(statusFilter);
//             setTempCurrencyFilter(currencyFilter);
//             setTempPaymentIdFilter(paymentIdFilter);
//             setTempAmountFilter(amountFilter);
//             setTempFromDate(fromDate);
//             setTempToDate(toDate);
//         }
//     }, [showFilterModal, searchTerm, statusFilter, currencyFilter, paymentIdFilter, amountFilter, fromDate, toDate]);

//     const closePopup = () => setShowFilterModal(false);

//     const applyFilters = () => {
//         setSearchTerm(tempSearchTerm);
//         setStatusFilter(tempStatusFilter);
//         setCurrencyFilter(tempCurrencyFilter);
//         setPaymentIdFilter(tempPaymentIdFilter);
//         setAmountFilter(tempAmountFilter);
//         setFromDate(tempFromDate);
//         setToDate(tempToDate);
//         setShowFilterModal(false);
//     };

//     const handleClearAllFilters = () => {
//         setTempSearchTerm('');
//         setTempStatusFilter('all');
//         setTempCurrencyFilter('all');
//         setTempPaymentIdFilter('');
//         setTempAmountFilter('');
//         setTempFromDate('');
//         setTempToDate('');
//         clearFilters();
//         setShowFilterModal(false);
//     };

//     // Handler for CustomDropdown
//     const handleStatusChange = (value: string | null) => {
//         setTempStatusFilter((value as PaymentStatus) ?? 'all');
//     };

//     const handleCurrencyChange = (value: string | null) => {
//         setTempCurrencyFilter(value ?? 'all');
//     }

//     const handleFromDateChange = (date: string) => {
//         setTempFromDate(date);
//     };

//     const handleToDateChange = (date: string) => {
//         setTempToDate(date);
//     };

//     return (
//       <AnimatePresence>
//         {showFilterModal && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//               onClick={closePopup}
//               aria-hidden="true"
//             />

//             <motion.div
//               ref={filterModalRef}
//               initial={
//                 isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//               }
//               animate={
//                 isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
//               }
//               exit={
//                 isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//               }
//               transition={{ type: "tween", duration: 0.3 }}
//               className={`fixed ${
//                 isMobile
//                   ? "bottom-0 left-0 right-0 h-[100vh]"
//                   : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200 dark:border-neutral-700"
//               } bg-white dark:bg-background z-50 flex flex-col shadow-xl overflow-y-auto`}
//               role="dialog"
//               aria-modal="true"
//               aria-labelledby="filter-payments-heading"
//             >
//               {/* Header */}
//               <div className="p-5 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-neutral-700 relative">
//                 <h3
//                   id="filter-payments-heading"
//                   className="font-semibold text-mainheading dark:text-white text-lg"
//                 >
//                   Filter Payments
//                 </h3>
//                 <button
//                   onClick={closePopup}
//                   aria-label="Close filter panel"
//                   className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 >
//                   <IoClose className="text-neutral-900 dark:text-white size-7" />
//                 </button>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="p-6 space-y-6 flex-grow overflow-y-auto scrollbar-hide">
//                 {/* Payment ID Filter */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="paymentIdFilter"
//                     className="text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"
//                   >
//                     Payment ID
//                   </label>
//                   <div className="bg-white dark:bg-background border rounded-lg focus:ring-0">
//                     <div className="flex items-center justify-between">
//                       <input
//                         type="text"
//                         id="paymentIdFilter"
//                         value={tempPaymentIdFilter}
//                         onChange={(e) => setTempPaymentIdFilter(e.target.value)}
//                         placeholder="Filter by Payment ID"
//                         className="block h-12.5 w-full rounded-md py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white focus:outline-none font-medium"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {/* Amount Filter */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="amountFilter"
//                     className="text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1"
//                   >
//                     Amount
//                   </label>
//                   <div className="bg-white dark:bg-background border rounded-lg focus:ring-0">
//                     <div className="flex items-center justify-between">
//                       <input
//                         type="number"
//                         id="amountFilter"
//                         value={tempAmountFilter}
//                         onChange={(e) => setTempAmountFilter(e.target.value)}
//                         placeholder="Filter by Amount"
//                         className="block h-12.5 w-full rounded-md py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white focus:outline-none font-medium"
//                         style={{ appearance: "textfield" }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Currency Filter - Custom Dropdown */}
//                 <div className="mb-4">
//                   <CustomDropdown
//                     label={
//                       <span className="text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1">
//                         Currency
//                       </span>
//                     }
//                     value={
//                       tempCurrencyFilter === "all" ? null : tempCurrencyFilter
//                     }
//                     onChange={handleCurrencyChange}
//                     options={currencyOptions}
//                     displayAllOption={`All Currencies`}
//                   />
//                 </div>

//                 {/* Status Filter - Custom Dropdown */}
//                 <div className="mb-4">
//                   <CustomDropdown
//                     label={
//                       <span className="text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1">
//                         Status
//                       </span>
//                     }
//                     value={tempStatusFilter === "all" ? null : tempStatusFilter}
//                     onChange={handleStatusChange}
//                     options={statusOptions}
//                     displayAllOption={`All Statuses`}
//                   />
//                 </div>

//                 {/* Date */}
//                 <div>
//                   <h4 className="text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1">
//                     Date
//                   </h4>
//                   <div className="space-y-3">
//                     {/* From Date Filter */}
//                     <DateInput
//                       placeholder="From Date"
//                       value={tempFromDate}
//                       onChange={handleFromDateChange}
//                     />
//                     {/* To Date Filter */}

//                     <DateInput
//                       placeholder="To Date"
//                       value={tempToDate}
//                       onChange={handleToDateChange}
//                     />
//                   </div>
//                 </div>

//               </div>

//               {/* Footer */}
//               <div className="p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0">
//                 <div className="flex items-center gap-3">
//                   {/* Clear all Button */}
//                   <button
//                     type="button"
//                     onClick={handleClearAllFilters}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Clear all
//                   </button>
//                   {/* Apply Filters Button */}
//                   <button
//                     type="button"
//                     onClick={applyFilters}
//                     className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
// };

// export default PaymentFilters;

// // components/admin/shared/GenericFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IoClose } from "react-icons/io5";
// // Adjust paths based on the new file location or keep original paths if not moving
// import CustomDropdown from './CustomDropdown'; // Example path adjustment
// import DateInput from '../../../dashboard/components/TransactionPageSection/Filter/DateInput'; // Example path adjustment

// // Define a more generic structure for the filter state object
// export interface FiltersState {
//     searchTerm: string;
//     fromDate: string; // Keep using string for DateInput compatibility
//     toDate: string;   // Keep using string for DateInput compatibility
//     statusFilter: string; // Use string for broader compatibility
//     currencyFilter: string;
//     idFilter: string;       // Renamed paymentIdFilter to idFilter
//     amountFilter: string;
//     recipientFilter?: string; // Added optional recipient filter
//     // Add other generic filters if needed
// }

// interface GenericFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     // Initial values passed from the parent
//     initialFilters: FiltersState;
//     // Callbacks to update the parent state
//     onApplyFilters: (filters: FiltersState) => void;
//     onClearFilters: () => void;
//     // Options for dropdowns
//     currencyOptions: string[]; // Expects ['all', 'USD', 'EUR', ...]
//     statusOptions: string[];   // Expects ['all', 'pending', 'completed', ...] - Use string array
//     // Optional props to customize labels/placeholders if needed
//     idFilterLabel?: string;
//     idFilterPlaceholder?: string;
//     amountFilterLabel?: string;
//     amountFilterPlaceholder?: string;
//     statusFilterLabel?: string;
//     currencyFilterLabel?: string;
//     dateFilterLabel?: string;
//     recipientFilterLabel?: string; // Label for the new filter
//     recipientFilterPlaceholder?: string; // Placeholder for the new filter
//     showRecipientFilter?: boolean; // Control visibility of the recipient filter
//     showIdFilter?: boolean; // Control visibility of ID filter
//     showAmountFilter?: boolean; // Control visibility of amount filter
//     showCurrencyFilter?: boolean; // Control visibility of currency filter
//     showStatusFilter?: boolean; // Control visibility of status filter
//     showDateFilter?: boolean; // Control visibility of date filter
//     // Labels for the 'all' options
//     allCurrenciesLabel?: string;
//     allStatusesLabel?: string;
// }

// const GenericFilters: React.FC<GenericFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     initialFilters,
//     onApplyFilters,
//     onClearFilters,
//     currencyOptions,
//     statusOptions,
//     // Default labels/placeholders
//     idFilterLabel = "ID Filter",
//     idFilterPlaceholder = "Filter by ID",
//     amountFilterLabel = "Amount",
//     amountFilterPlaceholder = "Filter by Amount",
//     statusFilterLabel = "Status",
//     currencyFilterLabel = "Currency",
//     dateFilterLabel = "Date Range",
//     recipientFilterLabel = "Recipient",
//     recipientFilterPlaceholder = "Filter by Recipient Name",
//     // Visibility flags
//     showRecipientFilter = false,
//     showIdFilter = true,
//     showAmountFilter = true,
//     showCurrencyFilter = true,
//     showStatusFilter = true,
//     showDateFilter = true,
//     // Labels for 'all' options
//     allCurrenciesLabel = "All Currencies", // Default text for 'all' currency
//     allStatusesLabel = "All Statuses",     // Default text for 'all' status
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null);
//     const [isMobile, setIsMobile] = useState(false);

//     // --- Internal temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(initialFilters.searchTerm);
//     const [tempStatusFilter, setTempStatusFilter] = useState<string>(initialFilters.statusFilter);
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(initialFilters.currencyFilter);
//     const [tempIdFilter, setTempIdFilter] = useState(initialFilters.idFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(initialFilters.amountFilter);
//     const [tempFromDate, setTempFromDate] = useState(initialFilters.fromDate);
//     const [tempToDate, setTempToDate] = useState(initialFilters.toDate);
//     const [tempRecipientFilter, setTempRecipientFilter] = useState(initialFilters.recipientFilter ?? '');

//     // Click outside handler (remains the same)
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 showFilterModal &&
//                 filterModalRef.current &&
//                 !filterModalRef.current.contains(event.target as Node) &&
//                 !(event.target as Element).closest('[id^="radix-ui-popper-"]') &&
//                 !(event.target as Element).closest('[data-radix-popper-content-wrapper]')
//             ) {
//                 setShowFilterModal(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [showFilterModal, setShowFilterModal]);

//     // Mobile check (remains the same)
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640);
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Sync temp state with initialFilters when modal opens or initialFilters change
//     useEffect(() => {
//         if (showFilterModal) {
//             setTempSearchTerm(initialFilters.searchTerm);
//             setTempStatusFilter(initialFilters.statusFilter);
//             setTempCurrencyFilter(initialFilters.currencyFilter);
//             setTempIdFilter(initialFilters.idFilter);
//             setTempAmountFilter(initialFilters.amountFilter);
//             setTempFromDate(initialFilters.fromDate);
//             setTempToDate(initialFilters.toDate);
//             setTempRecipientFilter(initialFilters.recipientFilter ?? '');
//         }
//     }, [showFilterModal, initialFilters]);

//     const closePopup = () => setShowFilterModal(false);

//     const handleApplyFilters = () => {
//         const currentFilters: FiltersState = {
//             searchTerm: tempSearchTerm,
//             statusFilter: tempStatusFilter,
//             currencyFilter: tempCurrencyFilter,
//             idFilter: tempIdFilter,
//             amountFilter: tempAmountFilter,
//             fromDate: tempFromDate,
//             toDate: tempToDate,
//             recipientFilter: tempRecipientFilter,
//         };
//         onApplyFilters(currentFilters);
//         setShowFilterModal(false);
//     };

//     const handleClearInternalFilters = () => {
//         setTempSearchTerm('');
//         setTempStatusFilter('all'); // Reset to 'all'
//         setTempCurrencyFilter('all'); // Reset to 'all'
//         setTempIdFilter('');
//         setTempAmountFilter('');
//         setTempFromDate('');
//         setTempToDate('');
//         setTempRecipientFilter('');
//         onClearFilters();
//         setShowFilterModal(false);
//     };

//     // --- Handler Updates ---
//     // These handlers now expect 'all' as a potential value from the dropdown selection
//     // or null if an internal clear button within CustomDropdown is used.
//     const handleStatusChange = (value: string | null) => {
//         setTempStatusFilter(value ?? 'all'); // If null (cleared), set to 'all'; otherwise, use the value ('all' or specific status)
//     };

//     const handleCurrencyChange = (value: string | null) => {
//         setTempCurrencyFilter(value ?? 'all'); // If null (cleared), set to 'all'; otherwise, use the value ('all' or specific currency)
//     }

//     // Date handlers remain the same
//     const handleFromDateChange = (date: string) => setTempFromDate(date);
//     const handleToDateChange = (date: string) => setTempToDate(date);

//     // Common label/input styles (remain the same)
//     const labelClassName = "text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1";
//     const inputWrapperClassName = "flex items-center justify-between";
//     const inputClassName = "block h-12.5 w-full border rounded-md py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium";

//     return (
//       <AnimatePresence>
//         {showFilterModal && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//               onClick={closePopup}
//               aria-hidden="true"
//             />

//             {/* Modal Content */}
//             <motion.div
//               ref={filterModalRef}
//               initial={
//                 isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//               }
//               animate={
//                 isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
//               }
//               exit={
//                 isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//               }
//               transition={{ type: "tween", duration: 0.3 }}
//               className={`fixed ${
//                 isMobile
//                   ? "bottom-0 left-0 right-0 h-[100vh] max-h-screen"
//                   : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200 dark:border-neutral-700"
//               } bg-white dark:bg-background z-[51] flex flex-col overflow-hidden`}
//               role="dialog"
//               aria-modal="true"
//               aria-labelledby="filter-modal-heading"
//             >
//               {/* Header (remains the same) */}
//               <div className="p-5 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-neutral-700 relative">
//                 <h3
//                   id="filter-modal-heading"
//                   className="font-semibold text-mainheading dark:text-white text-lg"
//                 >
//                   Filters
//                 </h3>
//                 <button
//                   onClick={closePopup}
//                   aria-label="Close filter panel"
//                   className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 >
//                   <IoClose className="text-neutral-900 dark:text-white size-7" />
//                 </button>
//               </div>

//               {/* Scrollable Content Area */}
//               <div
//                 className={`flex-grow overflow-y-auto scrollbar-hide p-6 space-y-6 ${
//                   isMobile ? "pb-[100px]" : ""
//                 }`}
//               >
//                 {/* Search Term Filter (remains the same) */}
//                 <div className="mb-4">
//                   <label htmlFor="searchTermFilter" className={labelClassName}>
//                     Search Term
//                   </label>
//                   <div className={inputWrapperClassName}>
//                     <input
//                       type="text"
//                       id="searchTermFilter"
//                       value={tempSearchTerm}
//                       onChange={(e) => setTempSearchTerm(e.target.value)}
//                       placeholder="Search ID, Name, Email, Ref..."
//                       className={inputClassName}
//                     />
//                   </div>
//                 </div>

//                 {/* ID Filter (remains the same) */}
//                 {showIdFilter && (
//                   <div className="mb-4">
//                     <label htmlFor="idFilter" className={labelClassName}>
//                       {idFilterLabel}
//                     </label>
//                     <div className={inputWrapperClassName}>
//                       <input
//                         type="text"
//                         id="idFilter"
//                         value={tempIdFilter}
//                         onChange={(e) => setTempIdFilter(e.target.value)}
//                         placeholder={idFilterPlaceholder}
//                         className={inputClassName}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Amount Filter (remains the same) */}
//                 {showAmountFilter && (
//                   <div className="mb-4">
//                     <label htmlFor="amountFilter" className={labelClassName}>
//                       {amountFilterLabel}
//                     </label>
//                     <div className={inputWrapperClassName}>
//                       <input
//                         type="number"
//                         id="amountFilter"
//                         value={tempAmountFilter}
//                         onChange={(e) => setTempAmountFilter(e.target.value)}
//                         placeholder={amountFilterPlaceholder}
//                         className={`${inputClassName} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Recipient Filter (remains the same) */}
//                 {showRecipientFilter && (
//                   <div className="mb-4">
//                     <label htmlFor="recipientFilter" className={labelClassName}>
//                       {recipientFilterLabel}
//                     </label>
//                     <div className={inputWrapperClassName}>
//                       <input
//                         type="text"
//                         id="recipientFilter"
//                         value={tempRecipientFilter}
//                         onChange={(e) => setTempRecipientFilter(e.target.value)}
//                         placeholder={recipientFilterPlaceholder}
//                         className={inputClassName}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Currency Filter Updates --- */}
//                 {showCurrencyFilter && (
//                   <div className="mb-4">
//                     <CustomDropdown
//                       label={
//                         <span className={labelClassName}>
//                           {currencyFilterLabel}
//                         </span>
//                       }
//                       // Pass the actual value ('all' or specific currency)
//                       value={tempCurrencyFilter}
//                       onChange={handleCurrencyChange}
//                       // Pass the FULL options array including 'all'
//                       options={currencyOptions}
//                       // Still provide the label for the 'all' option display
//                       displayAllOption={allCurrenciesLabel}
//                     />
//                   </div>
//                 )}

//                 {/* --- Status Filter Updates --- */}
//                 {showStatusFilter && (
//                   <div className="mb-4">
//                     <CustomDropdown
//                       label={
//                         <span className={labelClassName}>
//                           {statusFilterLabel}
//                         </span>
//                       }
//                       // Pass the actual value ('all' or specific status)
//                       value={tempStatusFilter}
//                       onChange={handleStatusChange}
//                       // Pass the FULL options array including 'all'
//                       options={statusOptions}
//                       // Still provide the label for the 'all' option display
//                       displayAllOption={allStatusesLabel}
//                     />
//                   </div>
//                 )}

//                 {/* Date Range (remains the same) */}
//                 {showDateFilter && (
//                   <div>
//                     <h4 className={labelClassName}>{dateFilterLabel}</h4>
//                     <div className="space-y-3">
//                       <DateInput
//                         placeholder="From Date"
//                         value={tempFromDate}
//                         onChange={handleFromDateChange}
//                       />
//                       <DateInput
//                         placeholder="To Date"
//                         value={tempToDate}
//                         onChange={handleToDateChange}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Footer (remains the same) */}
//               <div
//                 className={`p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0 ${
//                   isMobile ? "fixed bottom-0 left-0 right-0" : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <button
//                     type="button"
//                     onClick={handleClearInternalFilters}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Clear all
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleApplyFilters}
//                     className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
// };

// export default GenericFilters;

//
// // components/admin/shared/GenericFilters.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IoClose } from "react-icons/io5";
// // Adjust paths based on the new file location or keep original paths if not moving
// import CustomDropdown from './add-money/CustomDropdown'; // Example path adjustment
// import DateInput from '../../dashboard/components/TransactionPageSection/Filter/DateInput'; // Example path adjustment

// // Define a more generic structure for the filter state object
// export interface FiltersState {
//     searchTerm: string;
//     fromDate: string; // Keep using string for DateInput compatibility
//     toDate: string;   // Keep using string for DateInput compatibility
//     statusFilter: string; // Use string for broader compatibility
//     currencyFilter: string;
//     idFilter: string;       // Renamed paymentIdFilter to idFilter
//     amountFilter: string;
//     recipientFilter?: string; // Added optional recipient filter
//     // Add other generic filters if needed
// }

// interface GenericFiltersProps {
//     showFilterModal: boolean;
//     setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
//     // Initial values passed from the parent
//     initialFilters: FiltersState;
//     // Callbacks to update the parent state
//     onApplyFilters: (filters: FiltersState) => void;
//     onClearFilters: () => void;
//     // Options for dropdowns
//     currencyOptions: string[]; // Expects ['all', 'USD', 'EUR', ...]
//     statusOptions: string[];   // Expects ['all', 'pending', 'completed', ...] - Use string array
//     // Optional props to customize labels/placeholders if needed
//     idFilterLabel?: string;
//     idFilterPlaceholder?: string;
//     amountFilterLabel?: string;
//     amountFilterPlaceholder?: string;
//     statusFilterLabel?: string;
//     currencyFilterLabel?: string;
//     dateFilterLabel?: string;
//     recipientFilterLabel?: string; // Label for the new filter
//     recipientFilterPlaceholder?: string; // Placeholder for the new filter
//     showRecipientFilter?: boolean; // Control visibility of the recipient filter
//     showIdFilter?: boolean; // Control visibility of ID filter
//     showAmountFilter?: boolean; // Control visibility of amount filter
//     showCurrencyFilter?: boolean; // Control visibility of currency filter
//     showStatusFilter?: boolean; // Control visibility of status filter
//     showDateFilter?: boolean; // Control visibility of date filter
//     // Labels for the 'all' options
//     allCurrenciesLabel?: string;
//     allStatusesLabel?: string;
// }

// const GenericFilters: React.FC<GenericFiltersProps> = ({
//     showFilterModal,
//     setShowFilterModal,
//     initialFilters,
//     onApplyFilters,
//     onClearFilters,
//     currencyOptions,
//     statusOptions,
//     // Default labels/placeholders
//     idFilterLabel = "ID Filter",
//     idFilterPlaceholder = "Filter by ID",
//     amountFilterLabel = "Amount",
//     amountFilterPlaceholder = "Filter by Amount",
//     statusFilterLabel = "Status",
//     currencyFilterLabel = "Currency",
//     dateFilterLabel = "Date Range",
//     recipientFilterLabel = "Recipient",
//     recipientFilterPlaceholder = "Filter by Recipient Name",
//     // Visibility flags
//     showRecipientFilter = false,
//     showIdFilter = true,
//     showAmountFilter = true,
//     showCurrencyFilter = true,
//     showStatusFilter = true,
//     showDateFilter = true,
//     // Labels for 'all' options
//     allCurrenciesLabel = "All Currencies", // Default text for 'all' currency
//     allStatusesLabel = "All Statuses",     // Default text for 'all' status
// }) => {
//     const filterModalRef = useRef<HTMLDivElement>(null);
//     const [isMobile, setIsMobile] = useState(false);

//     // --- Internal temporary filter states ---
//     const [tempSearchTerm, setTempSearchTerm] = useState(initialFilters.searchTerm);
//     const [tempStatusFilter, setTempStatusFilter] = useState<string>(initialFilters.statusFilter);
//     const [tempCurrencyFilter, setTempCurrencyFilter] = useState(initialFilters.currencyFilter);
//     const [tempIdFilter, setTempIdFilter] = useState(initialFilters.idFilter);
//     const [tempAmountFilter, setTempAmountFilter] = useState(initialFilters.amountFilter);
//     const [tempFromDate, setTempFromDate] = useState(initialFilters.fromDate);
//     const [tempToDate, setTempToDate] = useState(initialFilters.toDate);
//     const [tempRecipientFilter, setTempRecipientFilter] = useState(initialFilters.recipientFilter ?? '');

//     // Click outside handler (remains the same)
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 showFilterModal &&
//                 filterModalRef.current &&
//                 !filterModalRef.current.contains(event.target as Node) &&
//                 !(event.target as Element).closest('[id^="radix-ui-popper-"]') &&
//                 !(event.target as Element).closest('[data-radix-popper-content-wrapper]')
//             ) {
//                 setShowFilterModal(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [showFilterModal, setShowFilterModal]);

//     // Mobile check (remains the same)
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 640);
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Sync temp state with initialFilters when modal opens or initialFilters change
//     useEffect(() => {
//         if (showFilterModal) {
//             setTempSearchTerm(initialFilters.searchTerm);
//             setTempStatusFilter(initialFilters.statusFilter);
//             setTempCurrencyFilter(initialFilters.currencyFilter);
//             setTempIdFilter(initialFilters.idFilter);
//             setTempAmountFilter(initialFilters.amountFilter);
//             setTempFromDate(initialFilters.fromDate);
//             setTempToDate(initialFilters.toDate);
//             setTempRecipientFilter(initialFilters.recipientFilter ?? '');
//         }
//     }, [showFilterModal, initialFilters]);

//     const closePopup = () => setShowFilterModal(false);

//     const handleApplyFilters = () => {
//         const currentFilters: FiltersState = {
//             searchTerm: tempSearchTerm,
//             statusFilter: tempStatusFilter,
//             currencyFilter: tempCurrencyFilter,
//             idFilter: tempIdFilter,
//             amountFilter: tempAmountFilter,
//             fromDate: tempFromDate,
//             toDate: tempToDate,
//             recipientFilter: tempRecipientFilter,
//         };
//         onApplyFilters(currentFilters);
//         setShowFilterModal(false);
//     };

//     const handleClearInternalFilters = () => {
//         setTempSearchTerm('');
//         setTempStatusFilter('all'); // Reset to 'all'
//         setTempCurrencyFilter('all'); // Reset to 'all'
//         setTempIdFilter('');
//         setTempAmountFilter('');
//         setTempFromDate('');
//         setTempToDate('');
//         setTempRecipientFilter('');
//         onClearFilters();
//         setShowFilterModal(false);
//     };

//     // --- Handler Updates ---
//     // These handlers now expect 'all' as a potential value from the dropdown selection
//     // or null if an internal clear button within CustomDropdown is used.
//     const handleStatusChange = (value: string | null) => {
//         setTempStatusFilter(value ?? 'all'); // If null (cleared), set to 'all'; otherwise, use the value ('all' or specific status)
//     };

//     const handleCurrencyChange = (value: string | null) => {
//         setTempCurrencyFilter(value ?? 'all'); // If null (cleared), set to 'all'; otherwise, use the value ('all' or specific currency)
//     }

//     // Date handlers remain the same
//     const handleFromDateChange = (date: string) => setTempFromDate(date);
//     const handleToDateChange = (date: string) => setTempToDate(date);

//     // Common label/input styles (remain the same)
//     const labelClassName = "text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b";
//     const inputWrapperClassName = "flex items-center justify-between";
//     const inputClassName = "`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]";

//     return (
//       <AnimatePresence>
//         {showFilterModal && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
//               onClick={closePopup}
//               aria-hidden="true"
//             />

//             {/* Modal Content */}
//             <motion.div
//               ref={filterModalRef}
//               initial={
//                 isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//               }
//               animate={
//                 isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
//               }
//               exit={
//                 isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
//               }
//               transition={{ type: "tween", duration: 0.3 }}
//               className={`fixed ${
//                 isMobile
//                   ? "bottom-0 left-0 right-0 h-[100vh] max-h-screen"
//                   : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200 dark:border-neutral-700"
//               } bg-white dark:bg-background z-[51] flex flex-col overflow-hidden`}
//               role="dialog"
//               aria-modal="true"
//               aria-labelledby="filter-modal-heading"
//             >
//               {/* Header (remains the same) */}
//               <div className="p-5 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-neutral-700 relative">
//                 <h3
//                   id="filter-modal-heading"
//                   className="font-semibold text-mainheading dark:text-white text-lg"
//                 >
//                   Filters
//                 </h3>
//                 <button
//                   onClick={closePopup}
//                   aria-label="Close filter panel"
//                   className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 >
//                   <IoClose className="text-neutral-900 dark:text-white size-7" />
//                 </button>
//               </div>

//               {/* Scrollable Content Area */}
//               <div
//                 className={`flex-grow overflow-y-auto scrollbar-hide p-6 space-y-6 ${
//                   isMobile ? "pb-[100px]" : ""
//                 }`}
//               >
//                 {/* Search Term Filter (remains the same) */}
//                 <div className="mb-4">
//                   <h4 className={labelClassName}>
//                     Search Term
//                   </h4>
//                   <div className={inputWrapperClassName}>
//                     <input
//                       type="text"
//                       id="searchTermFilter"
//                       value={tempSearchTerm}
//                       onChange={(e) => setTempSearchTerm(e.target.value)}
//                       placeholder="Search ID, Name, Email, Ref..."
//                       className={inputClassName}
//                     />
//                   </div>
//                 </div>

//                 {/* ID Filter (remains the same) */}
//                 {showIdFilter && (
//                   <div className="mb-4">
//                     <h4 className={labelClassName}>
//                       {idFilterLabel}
//                     </h4>
//                     <div className={inputWrapperClassName}>
//                       <input
//                         type="text"
//                         id="idFilter"
//                         value={tempIdFilter}
//                         onChange={(e) => setTempIdFilter(e.target.value)}
//                         placeholder={idFilterPlaceholder}
//                         className={inputClassName}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Amount Filter (remains the same) */}
//                 {showAmountFilter && (
//                   <div className="mb-4">
//                     <h4 className={labelClassName}>
//                       {amountFilterLabel}
//                     </h4>
//                     <div className={inputWrapperClassName}>
//                       <input
//                         type="number"
//                         id="amountFilter"
//                         value={tempAmountFilter}
//                         onChange={(e) => setTempAmountFilter(e.target.value)}
//                         placeholder={amountFilterPlaceholder}
//                         className={`${inputClassName} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Recipient Filter (remains the same) */}
//                 {showRecipientFilter && (
//                   <div className="mb-4">
//                     <h4 className={labelClassName}>
//                       {recipientFilterLabel}
//                     </h4>
//                     <div className={inputWrapperClassName}>
//                       <input
//                         type="text"
//                         id="recipientFilter"
//                         value={tempRecipientFilter}
//                         onChange={(e) => setTempRecipientFilter(e.target.value)}
//                         placeholder={recipientFilterPlaceholder}
//                         className={inputClassName}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Currency Filter Updates --- */}
//                 {showCurrencyFilter && (
//                   <div className="mb-4">
//                     <CustomDropdown
//                       label={
//                         <span className={labelClassName}>
//                           {currencyFilterLabel}
//                         </span>
//                       }
//                       // Pass the actual value ('all' or specific currency)
//                       value={tempCurrencyFilter}
//                       onChange={handleCurrencyChange}
//                       // Pass the FULL options array including 'all'
//                       options={currencyOptions}
//                       // Still provide the label for the 'all' option display
//                       displayAllOption={allCurrenciesLabel}
//                     />
//                   </div>
//                 )}

//                 {/* --- Status Filter Updates --- */}
//                 {showStatusFilter && (
//                   <div className="mb-4">
//                     <CustomDropdown
//                       label={
//                         <span className={labelClassName}>
//                           {statusFilterLabel}
//                         </span>
//                       }
//                       // Pass the actual value ('all' or specific status)
//                       value={tempStatusFilter}
//                       onChange={handleStatusChange}
//                       // Pass the FULL options array including 'all'
//                       options={statusOptions}
//                       // Still provide the label for the 'all' option display
//                       displayAllOption={allStatusesLabel}
//                     />
//                   </div>
//                 )}

//                 {/* Date Range (remains the same) */}
//                 {showDateFilter && (
//                   <div>
//                     <h4 className={labelClassName}>{dateFilterLabel}</h4>
//                     <div className="space-y-3">
//                       <DateInput
//                         placeholder="From Date"
//                         value={tempFromDate}
//                         onChange={handleFromDateChange}
//                       />
//                       <DateInput
//                         placeholder="To Date"
//                         value={tempToDate}
//                         onChange={handleToDateChange}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Footer (remains the same) */}
//               <div
//                 className={`p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0 ${
//                   isMobile ? "fixed bottom-0 left-0 right-0" : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <button
//                     type="button"
//                     onClick={handleClearInternalFilters}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Clear all
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleApplyFilters}
//                     className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
// };

// export default GenericFilters;

// components/admin/shared/GenericFilters.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
// Adjust paths based on the new file location or keep original paths if not moving
import CustomDropdown from "./add-money/CustomDropdown"; // Example path adjustment
import DateInput from "../../dashboard/components/TransactionPageSection/Filter/DateInput"; // Example path adjustment

// Define a more generic structure for the filter state object
export interface FiltersState {
  searchTerm: string;
  fromDate: string; // Keep using string for DateInput compatibility
  toDate: string; // Keep using string for DateInput compatibility
  statusFilter: string; // Use string for broader compatibility
  currencyFilter: string;
  idFilter: string; // Renamed paymentIdFilter to idFilter
  amountFilter: string;
  recipientFilter?: string; // Added optional recipient filter
  // Add other generic filters if needed
}

interface GenericFiltersProps {
  showFilterModal: boolean;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  // Initial values passed from the parent
  initialFilters: FiltersState;
  // Callbacks to update the parent state
  onApplyFilters: (filters: FiltersState) => void;
  onClearFilters: () => void;
  // Options for dropdowns
  currencyOptions: string[]; // Expects ['all', 'USD', 'EUR', ...]
  statusOptions: string[]; // Expects ['all', 'pending', 'completed', ...] - Use string array
  // Optional props to customize labels/placeholders if needed
  searchTermLabel?: string; // Added search term label prop
  searchTermPlaceholder?: string; // Added search term placeholder prop
  idFilterLabel?: string;
  idFilterPlaceholder?: string;
  amountFilterLabel?: string;
  amountFilterPlaceholder?: string;
  statusFilterLabel?: string;
  currencyFilterLabel?: string;
  dateFilterLabel?: string;
  recipientFilterLabel?: string; // Label for the new filter
  recipientFilterPlaceholder?: string; // Placeholder for the new filter
  showRecipientFilter?: boolean; // Control visibility of the recipient filter
  showIdFilter?: boolean; // Control visibility of ID filter
  showAmountFilter?: boolean; // Control visibility of amount filter
  showCurrencyFilter?: boolean; // Control visibility of currency filter
  showStatusFilter?: boolean; // Control visibility of status filter
  showDateFilter?: boolean; // Control visibility of date filter
  showSearchTermFilter?: boolean; // Control visibility of search term filter

  // Labels for the 'all' options
  allCurrenciesLabel?: string;
  allStatusesLabel?: string;
}

const GenericFilters: React.FC<GenericFiltersProps> = ({
  showFilterModal,
  setShowFilterModal,
  initialFilters,
  onApplyFilters,
  onClearFilters,
  currencyOptions,
  statusOptions,
  // Default labels/placeholders
  searchTermLabel = "Search Term", // Default search term label
  searchTermPlaceholder = "Search ID, Name, Email...", // Default search term placeholder
  idFilterLabel = "ID Filter",
  idFilterPlaceholder = "Filter by ID",
  amountFilterLabel = "Amount",
  amountFilterPlaceholder = "Filter by Amount",
  statusFilterLabel = "Status",
  currencyFilterLabel = "Currency",
  dateFilterLabel = "Date Range",
  recipientFilterLabel = "Recipient",
  recipientFilterPlaceholder = "Filter by Recipient Name",
  // Visibility flags
  showRecipientFilter = false,
  showIdFilter = true,
  showAmountFilter = true,
  showCurrencyFilter = true,
  showStatusFilter = true,
  showDateFilter = true,
  showSearchTermFilter = true, // Default to show search term filter
  // Labels for 'all' options
  allCurrenciesLabel = "All Currencies", // Default text for 'all' currency
  allStatusesLabel = "All Statuses", // Default text for 'all' status
}) => {
  const filterModalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Internal temporary filter states ---
  const [tempSearchTerm, setTempSearchTerm] = useState(
    initialFilters.searchTerm
  );
  const [tempStatusFilter, setTempStatusFilter] = useState<string>(
    initialFilters.statusFilter
  );
  const [tempCurrencyFilter, setTempCurrencyFilter] = useState(
    initialFilters.currencyFilter
  );
  const [tempIdFilter, setTempIdFilter] = useState(initialFilters.idFilter);
  const [tempAmountFilter, setTempAmountFilter] = useState(
    initialFilters.amountFilter
  );
  const [tempFromDate, setTempFromDate] = useState(initialFilters.fromDate);
  const [tempToDate, setTempToDate] = useState(initialFilters.toDate);
  const [tempRecipientFilter, setTempRecipientFilter] = useState(
    initialFilters.recipientFilter ?? ""
  );

  // Click outside handler (remains the same)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilterModal &&
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[id^="radix-ui-popper-"]') &&
        !(event.target as Element).closest(
          "[data-radix-popper-content-wrapper]"
        )
      ) {
        setShowFilterModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilterModal, setShowFilterModal]);

  // Mobile check (remains the same)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync temp state with initialFilters when modal opens or initialFilters change
  useEffect(() => {
    if (showFilterModal) {
      setTempSearchTerm(initialFilters.searchTerm);
      setTempStatusFilter(initialFilters.statusFilter);
      setTempCurrencyFilter(initialFilters.currencyFilter);
      setTempIdFilter(initialFilters.idFilter);
      setTempAmountFilter(initialFilters.amountFilter);
      setTempFromDate(initialFilters.fromDate);
      setTempToDate(initialFilters.toDate);
      setTempRecipientFilter(initialFilters.recipientFilter ?? "");
    }
  }, [showFilterModal, initialFilters]);

  const closePopup = () => setShowFilterModal(false);

  const handleApplyFilters = () => {
    const currentFilters: FiltersState = {
      searchTerm: tempSearchTerm,
      statusFilter: tempStatusFilter,
      currencyFilter: tempCurrencyFilter,
      idFilter: tempIdFilter,
      amountFilter: tempAmountFilter,
      fromDate: tempFromDate,
      toDate: tempToDate,
      recipientFilter: tempRecipientFilter,
    };
    onApplyFilters(currentFilters);
    setShowFilterModal(false);
  };

  const handleClearInternalFilters = () => {
    setTempSearchTerm("");
    setTempStatusFilter("all"); // Reset to 'all'
    setTempCurrencyFilter("all"); // Reset to 'all'
    setTempIdFilter("");
    setTempAmountFilter("");
    setTempFromDate("");
    setTempToDate("");
    setTempRecipientFilter("");
    onClearFilters();
    setShowFilterModal(false);
  };

  // --- Handler Updates ---
  // These handlers now expect 'all' as a potential value from the dropdown selection
  // or null if an internal clear button within CustomDropdown is used.
  const handleStatusChange = (value: string | null) => {
    setTempStatusFilter(value ?? "all"); // If null (cleared), set to 'all'; otherwise, use the value ('all' or specific status)
  };

  const handleCurrencyChange = (value: string | null) => {
    setTempCurrencyFilter(value ?? "all"); // If null (cleared), set to 'all'; otherwise, use the value ('all' or specific currency)
  };

  // Date handlers remain the same
  const handleFromDateChange = (date: string) => setTempFromDate(date);
  const handleToDateChange = (date: string) => setTempToDate(date);

  // Common label/input styles (remain the same)
  const labelClassName =
    "text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8";
  const inputWrapperClassName = "flex items-center justify-between";
  const inputClassName =
    "`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]";

  return (
    <AnimatePresence>
      {showFilterModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
            onClick={closePopup}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={filterModalRef}
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
            className={`fixed ${
              isMobile
                ? "bottom-0 left-0 right-0 h-[100vh] max-h-screen"
                : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200 dark:border-neutral-700"
            } bg-white dark:bg-background z-[51] flex flex-col overflow-hidden`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-modal-heading"
          >
            {/* Header (remains the same) */}
            <div className="p-6 flex items-center justify-between flex-shrink-0 border-b relative h-20">
              <h3
                id="filter-modal-heading"
                className="font-semibold text-mainheading dark:text-white text-lg"
              >
                Filters
              </h3>

              <div onClick={closePopup} className="size-12 bg-lightgray hover:bg-lightborder cursor-pointer dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear">
                  <button className="text-neutral-900 dark:text-primary cursor-pointer">
                    <IoClose size={28} />
                  </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div
              className={`flex-grow overflow-y-auto scrollbar-hide p-6 space-y-6 ${
                isMobile ? "pb-[100px]" : ""
              }`}
            >
              {/* Search Term Filter (remains the same) */}
              {showSearchTermFilter && (
                <div className="mb-4">
                  <h4 className={labelClassName}>{searchTermLabel}</h4>
                  <div className={inputWrapperClassName}>
                    <input
                      type="text"
                      id="searchTermFilter"
                      value={tempSearchTerm}
                      onChange={(e) => setTempSearchTerm(e.target.value)}
                      placeholder={searchTermPlaceholder}
                      className={inputClassName}
                    />
                  </div>
                </div>
              )}

              {/* ID Filter (remains the same) */}
              {showIdFilter && (
                <div className="mb-4">
                  <h4 className={labelClassName}>{idFilterLabel}</h4>
                  <div className={inputWrapperClassName}>
                    <input
                      type="text"
                      id="idFilter"
                      value={tempIdFilter}
                      onChange={(e) => setTempIdFilter(e.target.value)}
                      placeholder={idFilterPlaceholder}
                      className={inputClassName}
                    />
                  </div>
                </div>
              )}

              {/* Amount Filter (remains the same) */}
              {showAmountFilter && (
                <div className="mb-4">
                  <h4 className={labelClassName}>{amountFilterLabel}</h4>
                  <div className={inputWrapperClassName}>
                    <input
                      type="number"
                      id="amountFilter"
                      value={tempAmountFilter}
                      onChange={(e) => setTempAmountFilter(e.target.value)}
                      placeholder={amountFilterPlaceholder}
                      className={`${inputClassName} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </div>
                </div>
              )}


              {/* Recipient Filter (remains the same) */}
              {showRecipientFilter && (
                <div className="mb-4">
                  <h4 className={labelClassName}>{recipientFilterLabel}</h4>
                  <div className={inputWrapperClassName}>
                    <input
                      type="text"
                      id="recipientFilter"
                      value={tempRecipientFilter}
                      onChange={(e) => setTempRecipientFilter(e.target.value)}
                      placeholder={recipientFilterPlaceholder}
                      className={inputClassName}
                    />
                  </div>
                </div>
              )}

              {/* --- Currency Filter Updates --- */}
              {showCurrencyFilter && (
                <div className="mb-4">
                  <CustomDropdown
                    label={
                      <span className={labelClassName}>
                        {currencyFilterLabel}
                      </span>
                    }
                    // Pass the actual value ('all' or specific currency)
                    value={tempCurrencyFilter}
                    onChange={handleCurrencyChange}
                    // Pass the FULL options array including 'all'
                    options={currencyOptions}
                    // Still provide the label for the 'all' option display
                    displayAllOption={allCurrenciesLabel}
                  />
                </div>
              )}

              {/* --- Status Filter Updates --- */}
              {showStatusFilter && (
                <div className="mb-4">
                  <CustomDropdown
                    label={
                      <span className={labelClassName}>
                        {statusFilterLabel}
                      </span>
                    }
                    // Pass the actual value ('all' or specific status)
                    value={tempStatusFilter}
                    onChange={handleStatusChange}
                    // Pass the FULL options array including 'all'
                    options={statusOptions}
                    // Still provide the label for the 'all' option display
                    displayAllOption={allStatusesLabel}
                  />
                </div>
              )}

              {/* Date Range (remains the same) */}
              {showDateFilter && (
                <div>
                  <h4 className={labelClassName}>{dateFilterLabel}</h4>
                  <div className="space-y-3">
                    <DateInput
                      placeholder="From Date"
                      value={tempFromDate}
                      onChange={handleFromDateChange}
                    />
                    <DateInput
                      placeholder="To Date"
                      value={tempToDate}
                      onChange={handleToDateChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer (remains the same) */}
            <div
              className={`p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0 ${
                isMobile ? "fixed bottom-0 left-0 right-0" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClearInternalFilters}
                  className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GenericFilters;
