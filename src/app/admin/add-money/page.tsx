// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Search, Filter, ChevronDown, Check, X, Calendar as CalendarIcon, ArrowDownUp, Edit, Copy } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Custom Dropdown Component
// const CustomDropdown = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-gray mb-1">{label}</label>
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between capitalize cursor-pointer w-full border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-main focus:outline-none"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-gray-400" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute mt-2 w-full capitalize bg-white rounded-md shadow-lg z-10 border border-gray-300 overflow-hidden"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer flex justify-between items-center"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// // Copy to clipboard hook
// const useCopyToClipboard = () => {
//      const [isCopied, setIsCopied] = useState(false);

//     const copy = async (text) => {
//         if (!navigator?.clipboard) {
//             console.error('Clipboard API not available');
//             return false;
//         }
//         try {
//             await navigator.clipboard.writeText(text);
//             setIsCopied(true);
//             setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
//             return true;
//         } catch (error) {
//             console.error('Failed to copy to clipboard', error);
//             setIsCopied(false);
//             return false;
//         }
//     };

//     return { copy, isCopied };
// };

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
//     const [editFormData, setEditFormData] = useState({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState(false);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Refs for detecting clicks outside dropdown/modal
//     const filterModalRef = useRef(null);
//     const editModalRef = useRef(null);

//     // Copy to clipboard hook
//     const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//     const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
//                 }

//                 if (typeof valueA === 'string') {
//                     valueA = valueA.toLowerCase();
//                     valueB = valueB.toLowerCase();
//                 }

//                 if (sortDirection === 'asc') {
//                     return valueA > valueB ? 1 : -1;
//                 } else {
//                     return valueA < valueB ? 1 : -1;
//                 }
//             });
//         }

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     // Handle clicks outside dropdowns and modals
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             // Close filter modal if clicked outside
//             if (showFilterModal && filterModalRef.current && !filterModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setShowFilterModal(false);
//             }
//             // Close edit modal if clicked outside
//             if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setIsEditModalOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showFilterModal, isEditModalOpen]);

//     const toggleSort = (field) => {
//         if (sortField === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-700 bg-green-300 ';
//             case 'pending':
//                 return 'text-yellow-700 bg-yellow-300 ';
//             case 'in progress':
//                 return 'text-blue-700 bg-blue-300 ';
//             case 'canceled':
//                 return 'text-red-700 bg-red-300 ';
//             default:
//                 return 'text-gray-700 bg-gray-300 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleStatusDropdownChange = (status) => {
//         setEditFormData({ ...editFormData, status: status });
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Payload to update ONLY the status
//             const payload = {
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update payments state - ONLY update the status
//             const updatedPayments = payments.map(payment =>
//                 payment._id === selectedPaymentForEdit._id ? {
//                     ...payment,
//                     status: editFormData.status
//                 } : payment
//             );
//             setPayments(updatedPayments);
//             setFilteredPayments(updatedPayments); // Keep filtered payments in sync

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     if (loadingPayments) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-6xl">
//                 <h1 className="text-2xl font-bold text-main mb-4">Payment Management</h1>
//                 <div className="space-y-4">
//                     <div><Skeleton className="h-10 w-64" /></div>
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
//                         <table className="min-w-full">
//                             <thead>
//                                 <tr className="bg-white border-b border-gray-300">
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                     <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider"><Skeleton className="h-5 w-20" /></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <tr key={i} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                  </div>
//              </div>
//          );
//      }

//      return (
//          <div className="container mx-auto px-4 py-8 max-w-7xl relative">
//              <div className="space-y-6">
//                  <div className="flex justify-between items-start">
//                      <h1 className="text-2xl font-bold text-main">Payment Management</h1>
//                      <div className="flex gap-3 items-start">
//                          {/* Payment Filter */}
//                          <div className="relative">
//                              <input
//                                  type="text"
//                                  value={searchTerm}
//                                  onChange={(e) => setSearchTerm(e.target.value)}
//                                  placeholder="Search by User Name or Email..."
//                                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-64"
//                              />
//                              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                          </div>
//                          <div>
//                              <button
//                                  onClick={() => setShowFilterModal(true)}
//                                  className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 rounded-lg hover:bg-primary-hover transition-colors"
//                              >
//                                  <Filter size={18} />
//                                  Filters
//                              </button>
//                          </div>
//                      </div>
//                  </div>

//                  {/* Success Message */}
//                  <AnimatePresence>
//                      {successMessage && (
//                          <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10 }}
//                              className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
//                          >
//                              <div className="flex items-start">
//                                  <div className="flex-shrink-0">
//                                      <Check className="h-5 w-5 text-green-500" />
//                                  </div>
//                                  <div className="ml-3">
//                                      <p className="text-sm text-green-700">{successMessage}</p>
//                                  </div>
//                                  <button
//                                      onClick={() => setSuccessMessage(null)}
//                                      className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
//                                  >
//                                      <X size={18} />
//                                  </button>
//                              </div>
//                          </motion.div>
//                      )}
//                  </AnimatePresence>

//                  {/* Error Message */}
//                  <AnimatePresence>
//                      {error && (
//                          <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10 }}
//                              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow"
//                          >
//                              <div className="flex items-start">
//                                  <div className="flex-shrink-0">
//                                      <X className="h-5 w-5 text-red-500" />
//                                  </div>
//                                  <div className="ml-3">
//                                      <p className="text-sm text-red-700">{error}</p>
//                                  </div>
//                                  <button
//                                      onClick={() => setError(null)}
//                                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
//                                  >
//                                      <X size={18} />
//                                  </button>
//                              </div>
//                          </motion.div>
//                      )}
//                  </AnimatePresence>

//                  {/* Payments Table */}
//                  <div
//                      className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden"
//                  >
//                      <div className="overflow-x-auto">
//                          <table className="min-w-full">
//                              <thead>
//                                  <tr className="bg-white border-b border-gray-300">
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('_id')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  Payment ID
//                                                  {sortField === '_id' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('user')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  User
//                                                  {sortField === 'user' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('amount')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  Amount
//                                                  {sortField === 'amount' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Currency</th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500  tracking-wider">

//                                              <button
//                                                  onClick={() => toggleSort('status')}
//                                                  className="flex items-center gap-1 hover:text-primary uppercase"
//                                              >
//                                                  Status
//                                                  {sortField === 'status' && (
//                                                      <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                                                  )}
//                                              </button>
//                                      </th>
//                                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                  </tr>
//                              </thead>
//                              <tbody className="divide-y divide-gray-200">
//                                  {filteredPayments.length === 0 ? (
//                                      <tr>
//                                          <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
//                                              No payments found matching your filters.
//                                          </td>
//                                      </tr>
//                                  ) : (
//                                      filteredPayments.map((payment, index) => (
//                                          <motion.tr
//                                              key={payment._id}
//                                              initial={{ opacity: 0, y: 20 }}
//                                              animate={{ opacity: 1, y: 0 }}
//                                              transition={{ delay: index * 0.05 }}
//                                          >
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  <span className="font-medium text-main">{payment._id.substring(0, 10)}...</span>
//                                              </td>
//                                              <td className="px-6 py-4">
//                                                  <div className="flex flex-col">
//                                                      <span className="font-medium capitalize">{payment.user?.fullName || 'N/A'}</span>
//                                                      <span className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</span>
//                                                  </div>
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                  {payment.amountToAdd}
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  {payment.payInCurrency?.code || 'N/A'}
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  <span className="text-gray-600">{payment.referenceCode || 'N/A'}</span>
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap">
//                                                  <span className={`inline-flex items-center px-4 py-2 w-28 font-medium rounded-md capitalize ${getStatusColor(payment.status)}`}>
//                                                      {payment.status}
//                                                  </span>
//                                              </td>
//                                              <td className="px-6 py-4 whitespace-nowrap font-medium">
//                                                  <motion.button
//                                                      onClick={() => handleEditPayment(payment)}
//                                                      className="bg-white border border-error cursor-pointer rounded-md px-6 py-2 font-medium text-error focus:outline-none flex items-center"
//                                                  >
//                                                      <Edit size={18} className="mr-1" />
//                                                      Edit
//                                                  </motion.button>
//                                              </td>
//                                          </motion.tr>
//                                      ))
//                                  )}
//                              </tbody>
//                          </table>
//                      </div>
//                  </div>
//              </div>

//              {/* Edit Payment Modal */}
//              <AnimatePresence>
//                  {isEditModalOpen && selectedPaymentForEdit && (
//                      <motion.div
//                          ref={editModalRef}
//                          initial={{ opacity: 0 }}
//                          animate={{ opacity: 1 }}
//                          exit={{ opacity: 0 }}
//                          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
//                      >
//                          <motion.div
//                              initial={{ y: 50, opacity: 0 }}
//                              animate={{ y: 0, opacity: 1 }}
//                              exit={{ y: 50, opacity: 0 }}
//                              className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
//                          >
//                              <div className="mb-6">
//                                  <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
//                              </div>

//                              <div className="space-y-4">
//                                  <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
//                                      <div>
//                                          <label htmlFor="paymentId" className="block font-semibold text-main mb-1">Payment ID : </label>
//                                          <span className="font-medium text-gray-700">{selectedPaymentForEdit._id}</span>
//                                      </div>
//                                      <button
//                                          onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                                          className="p-2 rounded hover:bg-gray-100 focus:outline-none"
//                                          aria-label="Copy Payment ID"
//                                      >
//                                          <Copy className="size-4 text-gray-500" />
//                                      </button>
//                                  </div>
//                                  {isPaymentIdCopied && <p className="text-sm text-green-500 mt-1">Payment ID copied!</p>}

//                                  <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
//                                      <div>
//                                          <label htmlFor="referenceCode" className="block font-semibold text-main mb-1">Reference Code</label>
//                                          <span className="font-medium text-gray-700">{selectedPaymentForEdit.referenceCode || 'N/A'}</span>
//                                      </div>
//                                      <button
//                                          onClick={() => copyReferenceCode(selectedPaymentForEdit.referenceCode || '')}
//                                          className="p-2 rounded hover:bg-gray-100 focus:outline-none"
//                                          aria-label="Copy Reference Code"
//                                      >
//                                          <Copy className="size-4 text-gray-500" />
//                                      </button>
//                                  </div>
//                                  {isReferenceCodeCopied && <p className="text-sm text-green-500 mt-1">Reference Code copied!</p>}

//                                  <div className='bg-green/10 p-3 rounded-md'>
//                                      <label htmlFor="amountToAdd" className="block font-semibold text-main mb-1">Amount</label>
//                                      <span className="font-medium text-gray-700">{selectedPaymentForEdit.amountToAdd}</span>
//                                  </div>
//                                  <div className='bg-green/10 p-3 rounded-md flex items-center'>
//                                      <label htmlFor="currency" className="block font-semibold text-main mb-1 mr-2">Currency</label>
//                                      <span className="font-medium text-gray-700">{selectedPaymentForEdit.payInCurrency?.code || 'N/A'}</span>
//                                  </div>
//                                  <div>
//                                      <CustomDropdown
//                                          label="Status"
//                                          value={editFormData.status || null}
//                                          onChange={handleStatusDropdownChange}
//                                          options={statusOptions.filter(opt => opt !== 'all')}
//                                      />
//                                  </div>
//                              </div>

//                              <div className="mt-6 flex justify-end space-x-2">
//                                  <button
//                                      onClick={() => setIsEditModalOpen(false)}
//                                      className="px-4 w-full py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-md focus:outline-none"
//                                  >
//                                      Cancel
//                                  </button>
//                                  <button
//                                      onClick={handleSaveEdit}
//                                      disabled={editLoading}
//                                      className={`px-4 py-3 w-full cursor-pointer bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
//                                  >
//                                      {editLoading ? 'Saving...' : 'Save'}
//                                  </button>
//                              </div>
//                          </motion.div>
//                      </motion.div>
//                  )}
//              </AnimatePresence>

//              {/* Filter Sidebar */}
//              <AnimatePresence>
//                  {showFilterModal && (
//                      <motion.div
//                          ref={filterModalRef}
//                          initial={{ opacity: 0, x: '100%' }}
//                          animate={{ opacity: 1, x: '0%' }}
//                          exit={{ opacity: 0, x: '100%' }}
//                          transition={{ duration: 0.3 }}
//                          className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto"
//                      >
//                          <div className="p-6 border-b border-gray-200">
//                              <div className="flex justify-between items-center">
//                                  <h3 className="text-lg font-medium text-gray-900">Filter Payments</h3>
//                                  <button
//                                      onClick={() => setShowFilterModal(false)}
//                                      className="text-gray-400 hover:text-gray-500"
//                                  >
//                                      <X size={20} />
//                                  </button>
//                              </div>
//                          </div>

//                          <div className="p-6 space-y-6">
//                              {/* Payment ID Filter */}
//                              <div>
//                                  <label className="block font-medium text-gray-700 mb-1">
//                                      Payment ID
//                                  </label>
//                                  <input
//                                      type="text"
//                                      value={paymentIdFilter}
//                                      onChange={(e) => setPaymentIdFilter(e.target.value)}
//                                      placeholder="Filter by Payment ID"
//                                      className="mt-1 block px-4 focus:outline-none py-3 w-full border-gray-300 rounded-md border sm:text-sm"
//                                  />
//                              </div>
//                              {/* Amount Filter */}
//                              <div>
//                                  <label className="block font-medium text-gray-700 mb-1">
//                                      Amount
//                                  </label>
//                                  <input
//                                      type="number"
//                                      value={amountFilter}
//                                      onChange={(e) => setAmountFilter(e.target.value)}
//                                      placeholder="Filter by Amount"
//                                      className="mt-1 block px-4 py-3 focus:outline-none border w-full border-gray-300 rounded-md sm:text-sm"
//                                  />
//                              </div>

//                              {/* Currency Filter - Custom Dropdown */}
//                              <CustomDropdown
//                                  label="Currency"
//                                  value={currencyFilter === 'all' ? null : currencyFilter}
//                                  onChange={setCurrencyFilter}
//                                  options={currencyOptions}
//                              />

//                              {/* Status Filter - Custom Dropdown */}
//                              <CustomDropdown
//                                  label="Status"
//                                  value={statusFilter === 'all' ? null : statusFilter}
//                                  onChange={setStatusFilter}
//                                  options={statusOptions}
//                              />

//                              {/* Date Range Filter */}
//                              <div>
//                                  <label className="block font-medium text-gray-700 mb-1">
//                                      Date Range
//                                  </label>
//                                  <div className="relative">
//                                      <button className='w-full'>
//                                          <button
//                                              type="button"
//                                              onClick={() => setShowCalendar(!showCalendar)}
//                                              className="flex items-center w-full justify-between border border-gray-300 rounded-md px-4 py-3 bg-white font-medium text-gray-700 focus:outline-none"
//                                          >
//                                              <span>
//                                                  {dateRange.from ? (
//                                                      dateRange.to ? (
//                                                          `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                      ) : (
//                                                          `From ${format(dateRange.from, 'MMM dd, yyyy')}`
//                                                      )
//                                                  ) : dateRange.to ? (
//                                                      `Until ${format(dateRange.to, 'MMM dd, yyyy')}`
//                                                  ) : (
//                                                      'Select date range'
//                                                  )}
//                                              </span>
//                                              <CalendarIcon className="size-5 text-gray-400" />
//                                          </button>
//                                      </button>

//                                      <AnimatePresence>
//                                          {showCalendar && (
//                                              <motion.div
//                                                  initial={{ opacity: 0, y: 10 }}
//                                                  animate={{ opacity: 1, y: 0 }}
//                                                  exit={{ opacity: 0, y: 10 }}
//                                                  className="absolute mt-2 bg-white p-4 rounded-md shadow-lg z-10 border border-gray-300"
//                                              >
//                                                  <Calendar
//                                                      mode="range"
//                                                      selected={dateRange}
//                                                      onSelect={(range) => {
//                                                          setDateRange(range);
//                                                          setShowCalendar(false);
//                                                      }}
//                                                  />
//                                                  {(dateRange.from || dateRange.to) && (
//                                                      <div className="mt-2 flex justify-end">
//                                                          <button
//                                                              type="button"
//                                                              onClick={() => {
//                                                                  setDateRange({ from: null, to: null });
//                                                                  setShowCalendar(false);
//                                                              }}
//                                                              className="text-sm text-error"
//                                                          >
//                                                              Clear dates
//                                                          </button>
//                                                      </div>
//                                                  )}
//                                              </motion.div>
//                                          )}
//                                      </AnimatePresence>
//                                  </div>
//                              </div>
//                          </div>

//                          <div className="px-6 flex justify-end gap-3">
//                              <button
//                                  type="button"
//                                  onClick={clearFilters}
//                                  className="text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                              >
//                                  Clear All
//                              </button>
//                              <button
//                                  type="button"
//                                  onClick={() => setShowFilterModal(false)}
//                                  className="inline-flex justify-center px-6 py-3  cursor-pointer text-secondary font-medium bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                              >
//                                  Apply Filters
//                              </button>
//                          </div>
//                          {/* Applied Filters Display inside Sidebar */}
//                          <div className="px-6 py-4">
//                              <h4 className="font-semibold text-gray-800 mb-3">Applied Filters</h4>
//                              <div className="space-y-2">
//                                  {searchTerm && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>User Search: {searchTerm}</span>
//                                          <button onClick={() => setSearchTerm('')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {paymentIdFilter && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Payment ID: {paymentIdFilter}</span>
//                                          <button onClick={() => setPaymentIdFilter('')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {amountFilter && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Amount: {amountFilter}</span>
//                                          <button onClick={() => setAmountFilter('')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {currencyFilter && currencyFilter !== 'all' && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Currency: {currencyFilter}</span>
//                                          <button onClick={() => setCurrencyFilter('all')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {statusFilter !== 'all' && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Status: {statusFilter}</span>
//                                          <button onClick={() => setStatusFilter('all')} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                                  {(dateRange.from || dateRange.to) && (
//                                      <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center justify-between">
//                                          <span>Date: {dateRange.from ? format(dateRange.from, 'MMM dd') : ''}
//                                              {dateRange.from && dateRange.to ? ' - ' : ''}
//                                              {dateRange.to ? format(dateRange.to, 'MMM dd') : ''}
//                                          </span>
//                                          <button onClick={() => setDateRange({ from: null, to: null })} className="ml-2">
//                                              <X size={16} />
//                                          </button>
//                                      </div>
//                                  )}
//                              </div>
//                          </div>
//                      </motion.div>
//                  )}
//              </AnimatePresence>
//          </div >
//      );
//  };

//  export default AdminPaymentsPage;

// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const AdminPaymentsPage = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loadingPayments, setLoadingPayments] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateRange, setDateRange] = useState({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState('');
//     const [amountFilter, setAmountFilter] = useState('');
//     const [currencyFilter, setCurrencyFilter] = useState('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState(null);
//     const [editFormData, setEditFormData] = useState({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState(false);

//     // Sorting
//     const [sortField, setSortField] = useState(null);
//     const [sortDirection, setSortDirection] = useState('asc');

//     useEffect(() => {
//         const fetchPayments = async () => {
//             setLoadingPayments(true);
//             setError(null);
//             setSuccessMessage(null);
//             try {
//                 const response = await axios.get('/admin/payments', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPayments(response.data);
//                 setFilteredPayments(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load payments');
//                 console.error("Error fetching payments:", err);
//             } finally {
//                 setLoadingPayments(false);
//             }
//         };

//         fetchPayments();
//     }, [token]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA, valueB;

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField];
//                     valueB = b[sortField];
//                 }

//                 if (typeof valueA === 'string') {
//                     valueA = valueA.toLowerCase();
//                     valueB = valueB.toLowerCase();
//                 }

//                 if (sortDirection === 'asc') {
//                     return valueA > valueB ? 1 : -1;
//                 } else {
//                     return valueA < valueB ? 1 : -1;
//                 }
//             });
//         }

//         setFilteredPayments(results);
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     const toggleSort = (field) => {
//         if (sortField === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled':
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Payload to update ONLY the status
//             const payload = {
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update payments state - ONLY update the status
//             const updatedPayments = payments.map(payment =>
//                 payment._id === selectedPaymentForEdit._id ? {
//                     ...payment,
//                     status: editFormData.status
//                 } : payment
//             );
//             setPayments(updatedPayments);
//             setFilteredPayments(updatedPayments); // Keep filtered payments in sync

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="w-xl rounded-full py-2 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 h-12.5 rounded-3xl hover:bg-primaryhover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success Message */}
//                 <AnimatePresence>
//                     {successMessage && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0">
//                                     <Check className="h-5 w-5 text-green-500" />
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-green-700">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Error Message */}
//                 <AnimatePresence>
//                     {error && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0">
//                                     <X className="h-5 w-5 text-red-500" />
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-red-700">{error}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setError(null)}
//                                     className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={filteredPayments}
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
//                 />
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 statusOptions={statusOptions}
//             />

//             {/* Filter Sidebar */}
//             <PaymentFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange}
//                 statusFilter={statusFilter}
//                 setStatusFilter={setStatusFilter}
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter}
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Payment {
//     _id: string;
//     user: {
//         fullName?: string;
//         email?: string;
//     };
//     amountToAdd: string;
//     payInCurrency?: {
//         code?: string;
//     };
//     status: string;
//     createdAt: string;
//     // Add other properties as needed based on your Payment object structure
// }

// const AdminPaymentsPage: React.FC = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [statusUpdateLoading, setStatusUpdateLoading] = useState<{ [paymentId: string]: boolean }>({});
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in progress' | 'completed' | 'canceled'>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for payments per page

//     // Update payments per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     useEffect(() => {
//         fetchPayments();
//     }, [token]);

//     const fetchPayments = async () => {
//         setLoadingPayments(true); // Corrected: setLoadingPayments instead of setIsLoading
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const response = await axios.get('/admin/payments', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setPayments(response.data);
//             setFilteredPayments(response.data);
//         } catch (err: any) { // Type err as any or Error
//             setError(err.response?.data?.message || 'Failed to load payments');
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false); // Corrected: setLoadingPayments instead of setIsLoading
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     };

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter (user name and email)
//         if (searchTerm) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(payment => parseFloat(payment.amountToAdd) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(payment => {
//                 const paymentDate = new Date(payment.createdAt);
//                 return paymentDate <= toDate;
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA: any, valueB: any; // Type as any to handle different types

//                 // Handle nested properties and special cases
//                 if (sortField === 'user') {
//                     valueA = a.user?.fullName || '';
//                     valueB = b.user?.fullName || '';
//                 } else if (sortField === 'amount') {
//                     valueA = parseFloat(a.amountToAdd);
//                     valueB = parseFloat(b.amountToAdd);
//                 } else {
//                     valueA = a[sortField as keyof Payment]; // Type assertion to Payment key
//                     valueB = b[sortField as keyof Payment]; // Type assertion to Payment key
//                 }

//                 if (typeof valueA === 'string') {
//                     valueA = valueA.toLowerCase();
//                     valueB = valueB.toLowerCase();
//                 }

//                 if (sortDirection === 'asc') {
//                     return valueA > valueB ? 1 : -1;
//                 } else {
//                     return valueA < valueB ? 1 : -1;
//                 }
//             });
//         }

//         setFilteredPayments(results);
//         setCurrentPage(1); // Reset page to 1 when filters change
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     const toggleSort = (field: string) => {
//         if (sortField === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled':
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(payments.map(p => p.payInCurrency?.code).filter(Boolean)))];
//     const statusOptions: ('all' | 'pending' | 'in progress' | 'completed' | 'canceled')[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Payload to update ONLY the status
//             const payload = {
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // Update payments state - ONLY update the status
//             const updatedPayments = payments.map(payment =>
//                 payment._id === selectedPaymentForEdit._id ? {
//                     ...payment,
//                     status: editFormData.status
//                 } : payment
//             );
//             setPayments(updatedPayments);
//             setFilteredPayments(updatedPayments); // Keep filtered payments in sync

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//         } catch (err: any) { // Type err as any or Error
//             setError(err.response?.data?.message || 'Failed to update payment status');
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = () => {
//         fetchPayments();
//     };

//     // Pagination logic
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//     const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
//     const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Payment Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User Name or Email..."
//                                 className="w-xl rounded-full py-2 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 h-12.5 rounded-3xl hover:bg-primaryhover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         {/* Refresh Data Button */}
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing}
//                             className="flex items-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12.5 rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <RefreshCw
//                                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                             />
//                             <span>Refresh</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success Message */}
//                 <AnimatePresence>
//                     {successMessage && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0">
//                                     <Check className="h-5 w-5 text-green-500" />
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-green-700">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Error Message */}
//                 <AnimatePresence>
//                     {error && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0">
//                                     <X className="h-5 w-5 text-red-500" />
//                                 </div>
//                                 <div className="ml-3">
//                                     <p className="text-sm text-red-700">{error}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setError(null)}
//                                     className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 <div className="flex justify-between items-center mb-4">
//                     {/* Show per page dropdown */}
//                     <div>
//                         <label htmlFor="paymentsPerPage" className="mr-2 text-sm font-medium text-gray-600 dark:text-white">Show</label>
//                         <select
//                             id="paymentsPerPage"
//                             value={paymentsPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="mt-1 block w-full pl-3 pr-10 py-2 focus:outline-none border sm:text-sm rounded-md  bg-lightgray dark:bg-[#2E2E2E] dark:text-white"
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-white">
//                         Page {currentPage} of {totalPages}
//                     </p>
//                 </div>

//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={currentPayments} // Use currentPayments for pagination
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
//                 />
//                 {/* Pagination Controls */}
//                 <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     paginate={paginate}
//                     goToPreviousPage={goToPreviousPage}
//                     goToNextPage={goToNextPage}
//                 />
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 statusOptions={statusOptions}
//             />

//             {/* Filter Sidebar */}
//             <PaymentFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange}
//                 statusFilter={statusFilter}
//                 setStatusFilter={setStatusFilter}
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter}
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useAuth } from '../../hooks/useAuth';
// import axios, { AxiosError } from 'axios'; // Import AxiosError for better error typing
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface User {
//     fullName?: string;
//     email?: string;
// }

// interface Currency {
//     code?: string;
// }
// interface Payment {
//     _id: string;
//     user: User;
//     amountToAdd: string;
//     payInCurrency?: Currency;
//     status: string;
//     createdAt: string;
//     // Add other properties as needed based on your Payment object structure
// }

// // Define a type for API error responses if known
// interface ApiErrorResponse {
//     message: string;
// }

// const AdminPaymentsPage: React.FC = () => {
//     const { token } = useAuth();
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     // Removed unused state: statusUpdateLoading, setStatusUpdateLoading
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in progress' | 'completed' | 'canceled'>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for payments per page

//     // Update payments per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     // Memoize fetchPayments to satisfy exhaustive-deps and prevent potential issues
//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         setSuccessMessage(null); // Clear previous success message on refresh
//         try {
//             const response = await axios.get<{ data: Payment[] }>('/admin/payments', { // Add type for response data if known
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // Assuming the API returns an object with a 'data' property containing the array
//              if (Array.isArray(response.data)) { // Check if response.data is an array
//                 setPayments(response.data);
//                 setFilteredPayments(response.data); // Initialize filtered payments
//             } else {
//                  // Handle cases where the structure might be different, e.g., response.data.data
//                 console.warn("API response format unexpected:", response.data);
//                 // Attempt to find the array if nested, adjust as needed
//                 const paymentData = (response.data as any)?.data ?? []; // Example: Try accessing response.data.data
//                 if (Array.isArray(paymentData)) {
//                     setPayments(paymentData);
//                     setFilteredPayments(paymentData);
//                 } else {
//                     throw new Error("Invalid data structure received from API");
//                 }
//             }
//         } catch (err: unknown) { // Type err as unknown
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>; // Type assertion
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     }, [token]); // Add setters if needed, but usually stable refs from useState are fine

//     useEffect(() => {
//         if (token) { // Ensure token exists before fetching
//              fetchPayments();
//         }
//     }, [token, fetchPayments]); // Add fetchPayments to dependency array

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter (user name, email, and payment ID)
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Payment ID filter (can be combined with general search or separate)
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//              // Use try-catch for robust parsing
//              try {
//                 const amount = parseFloat(amountFilter);
//                 if (!isNaN(amount)) { // Check if parsing was successful
//                      results = results.filter(payment => {
//                          try {
//                             return parseFloat(payment.amountToAdd) === amount;
//                          } catch {
//                              return false; // Ignore payments with non-numeric amounts during filtering
//                          }
//                      });
//                 }
//              } catch {
//                  // Handle case where amountFilter is not a valid number (optional)
//              }
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0); // Start of the day

//             results = results.filter(payment => {
//                 try {
//                     const paymentDate = new Date(payment.createdAt);
//                     return !isNaN(paymentDate.getTime()) && paymentDate >= fromDate; // Check for valid date
//                 } catch {
//                     return false; // Ignore invalid dates
//                 }
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999); // End of the day

//             results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate <= toDate; // Check for valid date
//                  } catch {
//                      return false; // Ignore invalid dates
//                  }
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 // Use unknown for initial values, then check types
//                 let valueA: unknown;
//                 let valueB: unknown;

//                 // Handle nested properties and special cases
//                 switch (sortField) {
//                     case 'user':
//                         valueA = a.user?.fullName?.toLowerCase() || '';
//                         valueB = b.user?.fullName?.toLowerCase() || '';
//                         break;
//                     case 'email': // Assuming you might want to sort by email too
//                         valueA = a.user?.email?.toLowerCase() || '';
//                         valueB = b.user?.email?.toLowerCase() || '';
//                         break;
//                     case 'amount':
//                         // Parse safely
//                         valueA = parseFloat(a.amountToAdd) || 0;
//                         valueB = parseFloat(b.amountToAdd) || 0;
//                         break;
//                     case 'currency':
//                          valueA = a.payInCurrency?.code?.toLowerCase() || '';
//                          valueB = b.payInCurrency?.code?.toLowerCase() || '';
//                          break;
//                      case 'createdAt':
//                           // Compare dates directly
//                          valueA = new Date(a.createdAt);
//                          valueB = new Date(b.createdAt);
//                           // Handle invalid dates if necessary
//                           if (isNaN((valueA as Date).getTime())) valueA = new Date(0); // Treat invalid date as earliest
//                           if (isNaN((valueB as Date).getTime())) valueB = new Date(0);
//                          break;
//                     case '_id':
//                     case 'status':
//                         // Direct access for string properties
//                         valueA = (a[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                         valueB = (b[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                         break;
//                     default:
//                         // Fallback for potentially other simple properties
//                         valueA = a[sortField as keyof Payment];
//                         valueB = b[sortField as keyof Payment];
//                 }

//                  // Comparison logic
//                 const comparison = () => {
//                     if (valueA === valueB) return 0;
//                     if (valueA === null || valueA === undefined) return -1; // Handle null/undefined
//                     if (valueB === null || valueB === undefined) return 1;

//                     // Check types for appropriate comparison
//                     if (typeof valueA === 'number' && typeof valueB === 'number') {
//                         return valueA > valueB ? 1 : -1;
//                     }
//                     if (valueA instanceof Date && valueB instanceof Date) {
//                         return valueA.getTime() > valueB.getTime() ? 1 : -1;
//                     }
//                     // Default to string comparison
//                     return String(valueA).localeCompare(String(valueB));
//                 };

//                 return sortDirection === 'asc' ? comparison() : comparison() * -1;
//             });
//         }

//         setFilteredPayments(results);
//         if (payments.length > 0) { // Only reset page if filters actually changed the list potentially
//             setCurrentPage(1); // Reset page to 1 when filters change
//         }
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter]);

//     const toggleSort = (field: string) => {
//         if (sortField === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         // Optionally reset sorting
//         // setSortField(null);
//         // setSortDirection('asc');
//     };

//     const getStatusColor = (status: string): string => { // Add return type
//         switch (status?.toLowerCase()) { // Handle potential null/undefined and case variations
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled':
//             case 'cancelled': // Handle variations
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     // Use useMemo to calculate currency options only when payments change
//     const currencyOptions = React.useMemo(() => {
//         const codes = payments
//             .map(p => p.payInCurrency?.code)
//             .filter((code): code is string => Boolean(code)); // Type guard to ensure only strings
//         return ['all', ...Array.from(new Set(codes))];
//     }, [payments]);

//     const statusOptions: ('all' | 'pending' | 'in progress' | 'completed' | 'canceled')[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Payload to update ONLY the status
//             const payload = {
//                 status: editFormData.status
//             };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//              // Update local state immediately for better UX
//              // Create a new array with the updated payment
//              const updatedPayments = payments.map(p =>
//                  p._id === selectedPaymentForEdit._id
//                      ? { ...p, status: editFormData.status }
//                      : p
//              );
//              setPayments(updatedPayments); // Update the base list

//             // No need to call setFilteredPayments here, the useEffect hook watching `payments` will handle it.

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null); // Clear selected payment
//         } catch (err: unknown) { // Type err as unknown
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = () => {
//         fetchPayments(); // Call the memoized function
//     };

//     // Pagination logic
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     // currentPayments derived from filteredPayments ensures filtering is applied before pagination
//     const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         }
//     };
//     const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1)); // Ensure not going below 1
//     const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1)); // Ensure not exceeding totalPages

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex flex-wrap justify-between items-center gap-4"> {/* Added flex-wrap and items-center */}
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex flex-wrap gap-3 items-center"> {/* Added flex-wrap and items-center */}
//                         {/* Search Input */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search Payments..." // Simplified placeholder
//                                 className="w-full sm:w-64 rounded-full py-2 pl-10 pr-3 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900/30 dark:border-white/30 hover:shadow-md dark:hover:shadow-white/20 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox" // Adjusted styling for consistency
//                             />
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> {/* Centered icon */}
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors" // Adjusted padding/height
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         {/* Refresh Data Button */}
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing || loadingPayments} // Disable while loading or refreshing
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted padding/height
//                         >
//                             <RefreshCw
//                                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                             />
//                             <span>Refresh</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success Message */}
//                 <AnimatePresence>
//                     {successMessage && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                             className="bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700 p-4 rounded-md shadow-sm" // Subtle styling
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0 pt-0.5"> {/* Adjusted alignment */}
//                                     <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1"> {/* Added flex-1 */}
//                                     <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     aria-label="Dismiss success message" // Added aria-label
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-primarybox" // Improved focus and hover
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Error Message */}
//                 <AnimatePresence>
//                     {error && (
//                         <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                              className="bg-red-50 border border-red-300 dark:bg-red-900/30 dark:border-red-700 p-4 rounded-md shadow-sm" // Subtle styling
//                         >
//                             <div className="flex items-start">
//                                  <div className="flex-shrink-0 pt-0.5"> {/* Adjusted alignment */}
//                                     {/* Using X for error indication */}
//                                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1"> {/* Added flex-1 */}
//                                     <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                                 </div>
//                                 <button
//                                      aria-label="Dismiss error message" // Added aria-label
//                                      onClick={() => setError(null)}
//                                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-primarybox" // Improved focus and hover
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                  {/* Pagination and Page Size Controls */}
//                 <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                     {/* Show per page dropdown */}
//                     <div className="flex items-center gap-2">
//                         <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show entries:</label>
//                         <select
//                             id="paymentsPerPage"
//                             value={paymentsPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white" // Consistent styling
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                      {/* Pagination Info */}
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Showing {filteredPayments.length > 0 ? indexOfFirstPayment + 1 : 0} - {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} results
//                         {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//                     </p>
//                 </div>

//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={currentPayments} // Pass paginated data
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
//                 />

//                  {/* Render Pagination only if there are pages */}
//                 {totalPages > 1 && (
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         paginate={paginate}
//                         goToPreviousPage={goToPreviousPage}
//                         goToNextPage={goToNextPage}
//                     />
//                 )}
//                  {/* Show message if no payments match filters */}
//                  {!loadingPayments && filteredPayments.length === 0 && (
//                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                          No payments found matching your criteria.
//                      </div>
//                  )}
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 statusOptions={statusOptions.filter(s => s !== 'all')} // Exclude 'all' from edit options
//             />

//             {/* Filter Sidebar */}
//             <PaymentFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange}
//                 statusFilter={statusFilter}
//                 setStatusFilter={setStatusFilter}
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter}
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
// import { useAuth } from '../../contexts/AuthContext';
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination';

// // Import Shared Types
// import { Payment, PaymentStatus } from '../../../types/payment'; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define a type for API error responses if known
// interface ApiErrorResponse {
//     message: string;
// }

// const AdminPaymentsPage: React.FC = () => {
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     // Use the specific PaymentStatus type for state
//     const [statusFilter, setStatusFilter] = useState<PaymentStatus>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     // Edit form data should reflect the possible status values for saving
//     const [editFormData, setEditFormData] = useState<{ status: string }>({ // Keep as string here if API expects any string
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50];

//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1);
//     };

//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             // Use the imported Payment type for the expected response structure
//             const response = await axios.get<{ data: Payment[] } | Payment[]>('/admin/payments', { // Allow for both structures
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             let paymentData: Payment[] = [];
//             // Check common API response structures
//             if (Array.isArray(response.data)) {
//                 paymentData = response.data;
//             } else if (response.data && Array.isArray((response.data as any).data)) {
//                 paymentData = (response.data as any).data;
//             } else {
//                 console.warn("API response format unexpected:", response.data);
//                  throw new Error("Invalid data structure received from API");
//             }

//             // Ensure data conforms to Payment type (optional, good for safety)
//             // const validatedData = paymentData.map(p => ({ ...p, amountToAdd: String(p.amountToAdd) })); // Example validation/transformation if needed
//              setPayments(paymentData);
//              setFilteredPayments(paymentData);

//         } catch (err: unknown) {
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         if (token) {
//              fetchPayments();
//         }
//     }, [token, fetchPayments]);

//     // Apply filters when any filter changes (useEffect remains largely the same)
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//              try {
//                 const amount = parseFloat(amountFilter);
//                 if (!isNaN(amount)) {
//                      results = results.filter(payment => {
//                          try {
//                             // Compare string amount with parsed filter amount
//                             return parseFloat(payment.amountToAdd) === amount;
//                          } catch {
//                              return false;
//                          }
//                      });
//                 }
//              } catch { /* Ignore invalid amount input */ }
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);
//             results = results.filter(payment => {
//                 try {
//                     const paymentDate = new Date(payment.createdAt);
//                     return !isNaN(paymentDate.getTime()) && paymentDate >= fromDate;
//                 } catch { return false; }
//             });
//         }
//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);
//             results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate <= toDate;
//                  } catch { return false; }
//             });
//         }

//          // Apply sorting (remains the same logic, uses the unified Payment type)
//          if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: unknown;
//                  let valueB: unknown;

//                  switch (sortField) {
//                      case 'user':
//                          valueA = a.user?.fullName?.toLowerCase() || '';
//                          valueB = b.user?.fullName?.toLowerCase() || '';
//                          break;
//                      case 'email':
//                          valueA = a.user?.email?.toLowerCase() || '';
//                          valueB = b.user?.email?.toLowerCase() || '';
//                          break;
//                      case 'amount':
//                          // Parse string amounts for comparison
//                          valueA = parseFloat(a.amountToAdd) || 0;
//                          valueB = parseFloat(b.amountToAdd) || 0;
//                          break;
//                      case 'currency':
//                           valueA = a.payInCurrency?.code?.toLowerCase() || '';
//                           valueB = b.payInCurrency?.code?.toLowerCase() || '';
//                           break;
//                       case 'createdAt':
//                           try {
//                               valueA = new Date(a.createdAt);
//                               valueB = new Date(b.createdAt);
//                               if (isNaN((valueA as Date).getTime())) valueA = new Date(0);
//                               if (isNaN((valueB as Date).getTime())) valueB = new Date(0);
//                           } catch {
//                               valueA = new Date(0);
//                               valueB = new Date(0);
//                           }
//                           break;
//                      case '_id':
//                      case 'status': // Access status directly
//                      case 'referenceCode': // Add if sorting by referenceCode is needed
//                          valueA = (a[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                          valueB = (b[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                          break;
//                      default:
//                          valueA = a[sortField as keyof Payment];
//                          valueB = b[sortField as keyof Payment];
//                  }

//                   const comparison = () => {
//                      if (valueA === valueB) return 0;
//                      if (valueA === null || valueA === undefined || valueA === '') return -1; // Treat empty/null as less
//                      if (valueB === null || valueB === undefined || valueB === '') return 1;

//                      if (typeof valueA === 'number' && typeof valueB === 'number') {
//                          return valueA > valueB ? 1 : -1;
//                      }
//                      if (valueA instanceof Date && valueB instanceof Date) {
//                          return valueA.getTime() > valueB.getTime() ? 1 : -1;
//                      }
//                      return String(valueA).localeCompare(String(valueB));
//                  };

//                  return sortDirection === 'asc' ? comparison() : comparison() * -1;
//              });
//          }

//         setFilteredPayments(results);
//         // Reset page only if filters might have changed the total item count or order
//         // A simple check is if the filtered results length differs from the base or if sorting/filtering is active
//         if (results.length !== filteredPayments.length || searchTerm || statusFilter !== 'all' || dateRange.from || dateRange.to || sortField || paymentIdFilter || amountFilter || currencyFilter !== 'all') {
//              if (currentPage !== 1) setCurrentPage(1); // Reset page to 1 only if not already on page 1
//         }

//     // Ensure filteredPayments itself is not in the dependency array to avoid infinite loops
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter, currentPage]); // Added currentPage

//     const toggleSort = (field: string) => {
//         // If already sorting by this field, reverse direction
//         if (sortField === field) {
//             setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
//         } else {
//             // Otherwise, set the new field and default to ascending
//             setSortField(field);
//             setSortDirection('asc');
//         }
//         setCurrentPage(1); // Reset to page 1 when sorting changes
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         // Optionally reset sorting
//         // setSortField(null);
//         // setSortDirection('asc');
//         setCurrentPage(1); // Reset page when clearing filters
//     };

//     const getStatusColor = (status: string): string => {
//         switch (status?.toLowerCase()) {
//             case 'completed': return 'text-green-600 bg-green-600/20 ';
//             case 'pending': return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress': return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled': case 'cancelled': return 'text-red-600 bg-red-600/20 ';
//             default: return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     // Use useMemo for currency options
//     const currencyOptions = useMemo(() => {
//         const codes = payments
//             .map(p => p.payInCurrency?.code)
//             .filter((code): code is string => Boolean(code));
//         return ['all', ...Array.from(new Set(codes))];
//     }, [payments]);

//     // Use the imported PaymentStatus type for status options
//     const statusOptions: PaymentStatus[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || '' // Initialize with current status
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             const payload = { status: editFormData.status };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//              // Update local state *after* successful API call
//              const updatedPayments = payments.map(p =>
//                  p._id === selectedPaymentForEdit._id
//                      ? { ...p, status: editFormData.status } // Update status using the unified Payment type structure
//                      : p
//              );
//              setPayments(updatedPayments); // Update the base list which triggers the filter useEffect

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null);
//         } catch (err: unknown) {
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = () => {
//         fetchPayments();
//     };

//     // Pagination logic (remains the same)
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         }
//     };
//     const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
//     const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

//     // --- JSX REMAINS THE SAME FROM HERE DOWN ---
//     // No changes needed in the return/JSX structure based on the errors.
//     // The props passed to child components will now have the correct types.

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 {/* Header and Search/Filter Buttons */}
//                 <div className="flex flex-wrap justify-between items-center gap-4">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex flex-wrap gap-3 items-center">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search Payments..."
//                                 className="w-full sm:w-64 rounded-full py-2 pl-10 pr-3 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900/30 dark:border-white/30 hover:shadow-md dark:hover:shadow-white/20 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox"
//                             />
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing || loadingPayments}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <RefreshCw
//                                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                             />
//                             <span>Refresh</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success Message */}
//                 <AnimatePresence>
//                     {successMessage && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                             className="bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700 p-4 rounded-md shadow-sm"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0 pt-0.5">
//                                     <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     aria-label="Dismiss success message"
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-primarybox"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Error Message */}
//                 <AnimatePresence>
//                     {error && (
//                         <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                              className="bg-red-50 border border-red-300 dark:bg-red-900/30 dark:border-red-700 p-4 rounded-md shadow-sm"
//                         >
//                             <div className="flex items-start">
//                                  <div className="flex-shrink-0 pt-0.5">
//                                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                                 </div>
//                                 <button
//                                      aria-label="Dismiss error message"
//                                      onClick={() => setError(null)}
//                                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-primarybox"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                  {/* Pagination and Page Size Controls */}
//                 <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                     <div className="flex items-center gap-2">
//                         <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show entries:</label>
//                         <select
//                             id="paymentsPerPage"
//                             value={paymentsPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white"
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Showing {filteredPayments.length > 0 ? indexOfFirstPayment + 1 : 0} - {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} results
//                         {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//                     </p>
//                 </div>

//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={currentPayments} // Pass paginated data using shared Payment type
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort} // Type is string, handled internally
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment} // Prop now expects shared Payment type
//                 />

//                  {/* Pagination */}
//                 {totalPages > 1 && (
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         paginate={paginate}
//                         goToPreviousPage={goToPreviousPage}
//                         goToNextPage={goToNextPage}
//                     />
//                 )}
//                  {/* No Results Message */}
//                  {!loadingPayments && filteredPayments.length === 0 && payments.length > 0 && ( // Only show if initial load is done and filters applied
//                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                          No payments found matching your criteria.
//                      </div>
//                  )}
//                   {!loadingPayments && payments.length === 0 && ( // Show if no payments loaded at all
//                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                          No payments available.
//                      </div>
//                  )}
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit} // Prop now expects shared Payment type or null
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 // Provide the status options excluding 'all'
//                 statusOptions={statusOptions.filter(s => s !== 'all')}
//             />

//             {/* Filter Sidebar */}
//             <PaymentFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange} // Pass the state setter directly
//                 statusFilter={statusFilter} // Pass the state value (PaymentStatus)
//                 setStatusFilter={setStatusFilter} // Pass the state setter (Dispatch<SetStateAction<PaymentStatus>>)
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter} // Pass the state setter directly
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter} // Pass the state setter directly
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter} // Pass the state setter directly
//                 currencyOptions={currencyOptions} // Pass string[]
//                 statusOptions={statusOptions} // Pass PaymentStatus[]
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
// import { useAuth } from '../../contexts/AuthContext';
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters';
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination';

// // Import Shared Types
// import { Payment, PaymentStatus } from '../../../types/payment'; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define a type for API error responses if known
// interface ApiErrorResponse {
//     message: string;
// }

// const AdminPaymentsPage: React.FC = () => {
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     // Use the specific PaymentStatus type for state
//     const [statusFilter, setStatusFilter] = useState<PaymentStatus>('all'); // Correctly typed state
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     // Edit form data should reflect the possible status values for saving
//     const [editFormData, setEditFormData] = useState<{ status: string }>({ // Keep as string here if API expects any string or input is generic
//         status: ''
//     });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50];

//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1);
//     };

//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             // Use the imported Payment type for the expected response structure
//             const response = await axios.get<{ data: Payment[] } | Payment[]>('/admin/payments', { // Allow for both structures
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             let paymentData: Payment[] = [];
//             // Check common API response structures
//             if (Array.isArray(response.data)) {
//                 paymentData = response.data;
//             } else if (response.data && Array.isArray((response.data as any).data)) {
//                 paymentData = (response.data as any).data;
//             } else {
//                 console.warn("API response format unexpected:", response.data);
//                  throw new Error("Invalid data structure received from API");
//             }

//             // Optional: Validate/transform data if needed
//             // Ensure amountToAdd is treated as string if necessary, though often better handled in display
//             const validatedData = paymentData.map(p => ({
//                 ...p,
//                 amountToAdd: String(p.amountToAdd), // Ensure it's string for consistency if needed
//                 createdAt: p.createdAt || new Date(0).toISOString() // Provide default if missing
//             }));

//              setPayments(validatedData);
//              setFilteredPayments(validatedData);

//         } catch (err: unknown) {
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         if (token) {
//              fetchPayments();
//         }
//     }, [token, fetchPayments]);

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//              try {
//                 const amount = parseFloat(amountFilter);
//                 if (!isNaN(amount)) {
//                      results = results.filter(payment => {
//                          try {
//                             return parseFloat(payment.amountToAdd) === amount;
//                          } catch {
//                              return false;
//                          }
//                      });
//                 }
//              } catch { /* Ignore invalid amount input */ }
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter (uses PaymentStatus type)
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);
//             results = results.filter(payment => {
//                 try {
//                     const paymentDate = new Date(payment.createdAt);
//                     return !isNaN(paymentDate.getTime()) && paymentDate >= fromDate;
//                 } catch { return false; }
//             });
//         }
//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);
//             results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate <= toDate;
//                  } catch { return false; }
//             });
//         }

//          // Apply sorting
//          if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: unknown;
//                  let valueB: unknown;

//                  switch (sortField) {
//                      case 'user':
//                          valueA = a.user?.fullName?.toLowerCase() || '';
//                          valueB = b.user?.fullName?.toLowerCase() || '';
//                          break;
//                      case 'email':
//                          valueA = a.user?.email?.toLowerCase() || '';
//                          valueB = b.user?.email?.toLowerCase() || '';
//                          break;
//                      case 'amount':
//                          valueA = parseFloat(a.amountToAdd) || 0;
//                          valueB = parseFloat(b.amountToAdd) || 0;
//                          break;
//                      case 'currency':
//                           valueA = a.payInCurrency?.code?.toLowerCase() || '';
//                           valueB = b.payInCurrency?.code?.toLowerCase() || '';
//                           break;
//                       case 'createdAt':
//                           try {
//                               // Ensure createdAt is a valid date string or handle errors
//                               const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
//                               const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
//                               valueA = !isNaN(dateA.getTime()) ? dateA : new Date(0);
//                               valueB = !isNaN(dateB.getTime()) ? dateB : new Date(0);
//                           } catch {
//                               valueA = new Date(0);
//                               valueB = new Date(0);
//                           }
//                           break;
//                      case '_id':
//                      case 'status':
//                      case 'referenceCode':
//                          valueA = (a[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                          valueB = (b[sortField as keyof Payment] as string)?.toLowerCase() ?? '';
//                          break;
//                      default:
//                          valueA = a[sortField as keyof Payment];
//                          valueB = b[sortField as keyof Payment];
//                  }

//                   const comparison = () => {
//                      if (valueA === valueB) return 0;
//                      if (valueA === null || valueA === undefined || valueA === '') return -1;
//                      if (valueB === null || valueB === undefined || valueB === '') return 1;

//                      if (typeof valueA === 'number' && typeof valueB === 'number') {
//                          return valueA > valueB ? 1 : -1;
//                      }
//                      if (valueA instanceof Date && valueB instanceof Date) {
//                         // Ensure valid dates before comparing times
//                         if (isNaN(valueA.getTime())) return -1;
//                         if (isNaN(valueB.getTime())) return 1;
//                         return valueA.getTime() > valueB.getTime() ? 1 : -1;
//                      }
//                      // Ensure comparison values are strings
//                      return String(valueA).localeCompare(String(valueB));
//                  };

//                  return sortDirection === 'asc' ? comparison() : comparison() * -1;
//              });
//          }

//         setFilteredPayments(results);
//         // Reset page only if necessary and not already on page 1
//         const filtersApplied = searchTerm || statusFilter !== 'all' || dateRange.from || dateRange.to || paymentIdFilter || amountFilter || currencyFilter !== 'all';
//         const sortingApplied = !!sortField;
//         if ((filtersApplied || sortingApplied) && currentPage !== 1) {
//             setCurrentPage(1);
//         }

//     // Removed filteredPayments from dependencies
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [payments, searchTerm, statusFilter, dateRange, sortField, sortDirection, paymentIdFilter, amountFilter, currencyFilter, currentPage]); // Added currentPage

//     const toggleSort = (field: string) => {
//         if (sortField === field) {
//             setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//         // No need to reset page here, the useEffect handles it
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setDateRange({ from: null, to: null });
//         setStatusFilter('all'); // Reset to 'all' (PaymentStatus type)
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         // No need to reset page here, the useEffect handles it when filters change
//     };

//     const getStatusColor = (status: string): string => {
//         switch (status?.toLowerCase()) {
//             case 'completed': return 'text-green-600 bg-green-600/20 ';
//             case 'pending': return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress': return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled': case 'cancelled': return 'text-red-600 bg-red-600/20 ';
//             default: return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = useMemo(() => {
//         const codes = payments
//             .map(p => p.payInCurrency?.code)
//             .filter((code): code is string => Boolean(code));
//         return ['all', ...Array.from(new Set(codes))];
//     }, [payments]);

//     // Use the imported PaymentStatus type for status options
//     const statusOptions: PaymentStatus[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || '' // Initialize with current status (string ok for form)
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             // Ensure the status being sent matches an expected value if API is strict
//             const payload = { status: editFormData.status };

//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//              // Update local state *after* successful API call
//              const updatedPayments = payments.map(p =>
//                  p._id === selectedPaymentForEdit._id
//                      ? { ...p, status: editFormData.status as PaymentStatus } // Cast to PaymentStatus for local state consistency
//                      : p
//              );
//              setPayments(updatedPayments); // Update the base list

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null);
//         } catch (err: unknown) {
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = useCallback(() => {
//         fetchPayments();
//     }, [fetchPayments]); // Ensure fetchPayments is stable or included

//     // Pagination logic
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
//     const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         }
//     };
//     const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
//     const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

//     // --- JSX ---
//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 {/* Header and Search/Filter Buttons */}
//                 <div className="flex flex-wrap justify-between items-center gap-4">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Payment Management</h1>
//                     <div className="flex flex-wrap gap-3 items-center">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search Payments..."
//                                 className="w-full sm:w-64 rounded-full py-2 pl-10 pr-3 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900/30 dark:border-white/30 hover:shadow-md dark:hover:shadow-white/20 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox"
//                             />
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing || loadingPayments}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <RefreshCw
//                                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                             />
//                             <span>Refresh</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success Message */}
//                 <AnimatePresence>
//                     {successMessage && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                             className="bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700 p-4 rounded-md shadow-sm"
//                         >
//                             <div className="flex items-start">
//                                 <div className="flex-shrink-0 pt-0.5">
//                                     <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                                 </div>
//                                 <button
//                                     aria-label="Dismiss success message"
//                                     onClick={() => setSuccessMessage(null)}
//                                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-primarybox"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Error Message */}
//                 <AnimatePresence>
//                     {error && (
//                         <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                              className="bg-red-50 border border-red-300 dark:bg-red-900/30 dark:border-red-700 p-4 rounded-md shadow-sm"
//                         >
//                             <div className="flex items-start">
//                                  <div className="flex-shrink-0 pt-0.5">
//                                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
//                                 </div>
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                                 </div>
//                                 <button
//                                      aria-label="Dismiss error message"
//                                      onClick={() => setError(null)}
//                                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-primarybox"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                  {/* Pagination and Page Size Controls */}
//                 <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                     <div className="flex items-center gap-2">
//                         <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show entries:</label>
//                         <select
//                             id="paymentsPerPage"
//                             value={paymentsPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white"
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Showing {filteredPayments.length > 0 ? indexOfFirstPayment + 1 : 0} - {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} results
//                         {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//                     </p>
//                 </div>

//                 {/* Payments Table */}
//                 <PaymentTable
//                     filteredPayments={currentPayments} // Pass paginated data
//                     loadingPayments={loadingPayments}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                     handleEditPayment={handleEditPayment}
//                 />

//                  {/* Pagination */}
//                 {totalPages > 1 && (
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         paginate={paginate}
//                         goToPreviousPage={goToPreviousPage}
//                         goToNextPage={goToNextPage}
//                     />
//                 )}
//                  {/* No Results Message */}
//                  {!loadingPayments && filteredPayments.length === 0 && payments.length > 0 && (
//                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                          No payments found matching your criteria.
//                      </div>
//                  )}
//                   {!loadingPayments && payments.length === 0 && !error && ( // Only show if no payments and no error
//                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                          No payments available.
//                      </div>
//                  )}
//             </div>

//             {/* Edit Payment Modal */}
//             <PaymentEditModal
//                 isEditModalOpen={isEditModalOpen}
//                 setIsEditModalOpen={setIsEditModalOpen}
//                 selectedPaymentForEdit={selectedPaymentForEdit}
//                 editFormData={editFormData}
//                 setEditFormData={setEditFormData}
//                 editLoading={editLoading}
//                 handleSaveEdit={handleSaveEdit}
//                 // Provide the status options excluding 'all' for editing
//                 statusOptions={statusOptions.filter(s => s !== 'all')}
//             />

//             {/* Filter Sidebar */}
//             <PaymentFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 dateRange={dateRange}
//                 setDateRange={setDateRange}
//                 statusFilter={statusFilter} // Pass PaymentStatus value
//                 setStatusFilter={setStatusFilter} // Pass Dispatch<SetStateAction<PaymentStatus>>
//                 currencyFilter={currencyFilter}
//                 setCurrencyFilter={setCurrencyFilter}
//                 paymentIdFilter={paymentIdFilter}
//                 setPaymentIdFilter={setPaymentIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions} // Pass PaymentStatus[] for display in dropdown
//                 clearFilters={clearFilters}
//             />
//         </div >
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable';
// import PaymentFilters from '../components/add-money/PaymentFilters'; // Ensure path is correct
// import PaymentEditModal from '../components/add-money/PaymentEditModal';
// import Pagination from '../components/Pagination';

// // Import Shared Types
// import { Payment, PaymentStatus } from '../../../types/payment'; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define a type for API error responses if known
// interface ApiErrorResponse {
//     message: string;
// }

// const AdminPaymentsPage: React.FC = () => {
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');
//     const [statusFilter, setStatusFilter] = useState<PaymentStatus>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');

//     // Edit Modal State
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({ status: '' });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null); // Default sort can be set here e.g., 'createdAt'
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default sort direction

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50];

//     // Helper function to parse date string (dd-MM-yyyy) to Date object
//     // Keep this function as it's used in filtering logic
//     function parseDateString(dateString: string): Date | null {
//         if (!dateString) return null;
//         const parts = dateString.split('-');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0], 10);
//             const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//             const year = parseInt(parts[2], 10);
//             const date = new Date(year, month, day);
//             if (!isNaN(date.getTime())) {
//                 return date;
//             }
//         }
//         console.warn("Could not parse date string:", dateString); // Added warning
//         return null;
//     }

//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const response = await axios.get<{ data: Payment[] } | Payment[]>('/admin/payments', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             let paymentData: Payment[] = [];
//             if (Array.isArray(response.data)) {
//                 paymentData = response.data;
//             } else if (response.data && Array.isArray((response.data as any).data)) {
//                 paymentData = (response.data as any).data;
//             } else {
//                  console.warn("API response format unexpected:", response.data);
//                  throw new Error("Invalid data structure received from API");
//             }

//             const validatedData = paymentData.map(p => ({
//                 ...p,
//                 amountToAdd: String(p.amountToAdd ?? ''), // Ensure string, handle null/undefined
//                 createdAt: p.createdAt || new Date(0).toISOString()
//             }));

//              setPayments(validatedData);
//              // Initial filtering/sorting will be handled by the useEffect below

//         } catch (err: unknown) {
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         if (token) {
//              fetchPayments();
//         }
//     }, [token, fetchPayments]);

//     // Apply filters and sorting whenever payments or filter/sort parameters change
//     // This useEffect determines the *content* of filteredPayments
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.referenceCode?.toLowerCase().includes(lowerSearchTerm) // Also search reference code
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//              try {
//                 const amount = parseFloat(amountFilter);
//                 if (!isNaN(amount)) {
//                      results = results.filter(payment => {
//                          try {
//                              // Compare parsed numbers for accuracy
//                             return parseFloat(payment.amountToAdd) === amount;
//                          } catch {
//                              return false;
//                          }
//                      });
//                 }
//              } catch { /* Ignore invalid amount input */ }
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status === statusFilter);
//         }

//         // Apply from date filter
//         if (fromDate) {
//             const fromDateObj = parseDateString(fromDate);
//             if (fromDateObj) {
//                 fromDateObj.setHours(0, 0, 0, 0); // Start of the day
//                 results = results.filter(payment => {
//                     try {
//                         const paymentDate = new Date(payment.createdAt);
//                         return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//                     } catch { return false; }
//                 });
//             }
//         }

//         // Apply to date filter
//         if (toDate) {
//             const toDateObj = parseDateString(toDate);
//             if (toDateObj) {
//                 toDateObj.setHours(23, 59, 59, 999); // End of the day
//                 results = results.filter(payment => {
//                      try {
//                          const paymentDate = new Date(payment.createdAt);
//                          return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//                      } catch { return false; }
//                 });
//             }
//         }

//          // Apply sorting
//          if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: unknown;
//                  let valueB: unknown;

//                  // Helper to safely access potentially nested properties
//                  const getSafeValue = (obj: any, path: string) => {
//                     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//                  }

//                  switch (sortField) {
//                      case 'user':
//                          valueA = a.user?.fullName?.toLowerCase() || '';
//                          valueB = b.user?.fullName?.toLowerCase() || '';
//                          break;
//                      case 'email':
//                          valueA = a.user?.email?.toLowerCase() || '';
//                          valueB = b.user?.email?.toLowerCase() || '';
//                          break;
//                      case 'amount':
//                          valueA = parseFloat(a.amountToAdd) || 0;
//                          valueB = parseFloat(b.amountToAdd) || 0;
//                          break;
//                      case 'currency':
//                           valueA = a.payInCurrency?.code?.toLowerCase() || '';
//                           valueB = b.payInCurrency?.code?.toLowerCase() || '';
//                           break;
//                       case 'createdAt':
//                           try {
//                               const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
//                               const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
//                               valueA = !isNaN(dateA.getTime()) ? dateA : new Date(0);
//                               valueB = !isNaN(dateB.getTime()) ? dateB : new Date(0);
//                           } catch {
//                               valueA = new Date(0);
//                               valueB = new Date(0);
//                           }
//                           break;
//                      case '_id':
//                      case 'status':
//                      case 'referenceCode':
//                          // Use keyof Payment for type safety, default to empty string if undefined/null
//                          valueA = (a[sortField as keyof Payment] as string | undefined | null)?.toLowerCase() ?? '';
//                          valueB = (b[sortField as keyof Payment] as string | undefined | null)?.toLowerCase() ?? '';
//                          break;
//                      default:
//                          // Handle potentially nested properties if needed, e.g., 'user.country'
//                          valueA = getSafeValue(a, sortField);
//                          valueB = getSafeValue(b, sortField);
//                  }

//                  // Comparison logic
//                  const comparison = () => {
//                      if (valueA === valueB) return 0;
//                      if (valueA === null || valueA === undefined || valueA === '') return -1; // Put nulls/empty first
//                      if (valueB === null || valueB === undefined || valueB === '') return 1;

//                      if (typeof valueA === 'number' && typeof valueB === 'number') {
//                          return valueA > valueB ? 1 : -1;
//                      }
//                      if (valueA instanceof Date && valueB instanceof Date) {
//                         if (isNaN(valueA.getTime())) return -1; // Invalid dates first
//                         if (isNaN(valueB.getTime())) return 1;
//                         return valueA.getTime() > valueB.getTime() ? 1 : -1;
//                      }
//                      // Ensure comparison values are strings for localeCompare
//                      return String(valueA).localeCompare(String(valueB));
//                  };

//                  return sortDirection === 'asc' ? comparison() : comparison() * -1;
//              });
//          }

//         setFilteredPayments(results);

//     // Dependencies: Only include state variables that directly influence the filtering/sorting result
//     }, [payments, searchTerm, statusFilter, fromDate, toDate, paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection]);

//     // **FIXED: Separate useEffect to reset page when filters/sorting change**
//     useEffect(() => {
//         // Reset to page 1 *only* when the filters or sorting parameters change.
//         // Check if currentPage is not already 1 to prevent unnecessary re-renders.
//         if (currentPage !== 1) {
//              setCurrentPage(1);
//         }
//     // Dependencies: Only the filter/sort parameters that trigger the reset.
//     // We intentionally don't include `currentPage` here.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [searchTerm, statusFilter, fromDate, toDate, paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection]);

//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1); // Reset to page 1 when page size changes
//     };

//     const toggleSort = (field: string) => {
//         if (sortField === field) {
//             setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//          // Page reset is handled by the dedicated useEffect above
//     };

//     const clearFilters = () => {
//         setSearchTerm('');
//         setFromDate('');
//         setToDate('');
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//          // Page reset is handled by the dedicated useEffect above
//     };

//     const getStatusColor = (status: string): string => {
//         switch (status?.toLowerCase()) {
//             case 'completed': return 'text-green-600 bg-green-600/20 ';
//             case 'pending': return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'in progress': return 'text-blue-600 bg-blue-600/20 ';
//             case 'canceled': case 'cancelled': return 'text-red-600 bg-red-600/20 ';
//             default: return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = useMemo(() => {
//         const codes = payments
//             .map(p => p.payInCurrency)
//             .filter((currency): currency is { code: string, name?: string } => Boolean(currency) && typeof currency === 'object' && typeof currency.code === 'string')
//             .map(currency => currency.code);
//         return ['all', ...Array.from(new Set(codes)).sort()]; // Sort currency codes
//     }, [payments]);

//     const statusOptions: PaymentStatus[] = ['all', 'pending', 'in progress', 'completed', 'canceled'];

//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({
//             status: payment.status || ''
//         });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);

//         try {
//             const payload = { status: editFormData.status };
//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//              // Option 1: Refetch all data to ensure consistency
//              // await fetchPayments();

//              // Option 2: Update local state directly (faster UI update)
//              const updatedStatus = editFormData.status as PaymentStatus;
//              const updatedPayments = payments.map(p =>
//                  p._id === selectedPaymentForEdit._id ? { ...p, status: updatedStatus } : p
//              );
//              setPayments(updatedPayments); // Update the base list, the filter useEffect will handle the rest

//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null);
//         } catch (err: unknown) {
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//             console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = useCallback(() => {
//         fetchPayments();
//     }, [fetchPayments]); // Ensure fetchPayments is stable or included

//     // --- Pagination Calculation (Memoized for performance) ---
//     const { currentPayments, totalPages } = useMemo(() => {
//         const indexOfLastPayment = currentPage * paymentsPerPage;
//         const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//         const paginatedData = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
//         const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//         return { currentPayments: paginatedData, totalPages: pages };
//     }, [filteredPayments, currentPage, paymentsPerPage]);

//     // Pagination handlers
//     const paginate = (pageNumber: number) => {
//         // Basic validation already happens in Pagination component, but good practice here too
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         }
//     };
//     const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
//     const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

//     // --- JSX ---
//     return (
//       <div className="container mx-auto px-4 py-8 relative">
//         <div className="space-y-6">
//           {/* Header and Search/Filter Buttons */}
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white">
//               Payment Management
//             </h1>
//             <div className="flex md:flex-nowrap flex-wrap justify-between gap-3 items-center lg:w-auto w-full">
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search ID, Name, Email, Ref..." // Updated placeholder
//                   className="w-full sm:w-72 rounded-full py-2 pl-10 pr-3 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900/30 dark:border-white/30 hover:shadow-md dark:hover:shadow-white/20 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox"
//                 />
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400"
//                   size={20}
//                 />
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setShowFilterModal(true)}
//                   className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
//                 >
//                   <Filter size={18} />
//                   Filters
//                 </button>
//                 <button
//                   onClick={refreshData}
//                   disabled={isRefreshing || loadingPayments}
//                   className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   title="Refresh payment data" // Added title
//                 >
//                   <RefreshCw
//                     className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                   />
//                   <span>Refresh</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           <AnimatePresence>
//             {successMessage && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                 className="bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700 p-4 rounded-md shadow-sm"
//               >
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 pt-0.5">
//                     <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
//                   </div>
//                   <div className="ml-3 flex-1">
//                     <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                       {successMessage}
//                     </p>
//                   </div>
//                   <button
//                     aria-label="Dismiss success message"
//                     onClick={() => setSuccessMessage(null)}
//                     className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-primarybox"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Error Message */}
//           <AnimatePresence>
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
//                 className="bg-red-50 border border-red-300 dark:bg-red-900/30 dark:border-red-700 p-4 rounded-md shadow-sm"
//               >
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 pt-0.5">
//                     {/* Consistent icon usage */}
//                     <X className="h-5 w-5 text-red-500 dark:text-red-400" />
//                   </div>
//                   <div className="ml-3 flex-1">
//                     <p className="text-sm font-medium text-red-800 dark:text-red-300">
//                       {error}
//                     </p>
//                   </div>
//                   <button
//                     aria-label="Dismiss error message"
//                     onClick={() => setError(null)}
//                     className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-primarybox"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pagination and Page Size Controls */}
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//             <div className="flex items-center gap-2">
//               <label
//                 htmlFor="paymentsPerPage"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap"
//               >
//                 Show entries:
//               </label>
//               <select
//                 id="paymentsPerPage"
//                 value={paymentsPerPage}
//                 onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                 className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white"
//               >
//                 {pageSizeOptions.map((size) => (
//                   <option
//                     key={size}
//                     value={size}
//                     className="dark:bg-dropdowncolor"
//                   >
//                     {size}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* Display range based on current *paginated* data */}
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Showing{" "}
//               {filteredPayments.length > 0
//                 ? (currentPage - 1) * paymentsPerPage + 1
//                 : 0}{" "}
//               -{" "}
//               {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//               of {filteredPayments.length} results
//               {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//             </p>
//           </div>

//           {/* Payments Table */}
//           <PaymentTable
//             filteredPayments={currentPayments} // Pass the memoized, paginated data
//             loadingPayments={loadingPayments}
//             getStatusColor={getStatusColor}
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//             handleEditPayment={handleEditPayment}
//           />

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages} // Use the calculated totalPages
//               paginate={paginate}
//               goToPreviousPage={goToPreviousPage}
//               goToNextPage={goToNextPage}
//             />
//           )}

//         </div>

//         {/* Edit Payment Modal */}
//         <PaymentEditModal
//           isEditModalOpen={isEditModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           selectedPaymentForEdit={selectedPaymentForEdit}
//           editFormData={editFormData}
//           setEditFormData={setEditFormData}
//           editLoading={editLoading}
//           handleSaveEdit={handleSaveEdit}
//           statusOptions={statusOptions.filter((s) => s !== "all")} // Exclude 'all' from edit options
//         />

//         {/* Filter Sidebar */}
//         <PaymentFilters
//           showFilterModal={showFilterModal}
//           setShowFilterModal={setShowFilterModal}
//           // Pass temporary filter state handlers to the modal if using temp state,
//           // otherwise pass the main state setters directly. The current setup passes main setters.
//           // Consider using temporary state within PaymentFilters if needed for "Apply" button logic.
//           // For simplicity, this version updates main state directly from filters modal.
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           fromDate={fromDate}
//           setFromDate={setFromDate}
//           toDate={toDate}
//           setToDate={setToDate}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//           currencyFilter={currencyFilter}
//           setCurrencyFilter={setCurrencyFilter}
//           paymentIdFilter={paymentIdFilter}
//           setPaymentIdFilter={setPaymentIdFilter}
//           amountFilter={amountFilter}
//           setAmountFilter={setAmountFilter}
//           currencyOptions={currencyOptions}
//           statusOptions={statusOptions} // Pass all options including 'all' for display
//           clearFilters={clearFilters}
//         />
//       </div>
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if needed
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable'; // Adjust path if needed
// // *** IMPORT THE GENERIC FILTER COMPONENT AND TYPE ***
// import GenericFilters, { FiltersState } from '../components/add-money/PaymentFilters'; // Adjust path if needed
// import PaymentEditModal from '../components/add-money/PaymentEditModal'; // Adjust path if needed
// import Pagination from '../components/Pagination'; // Adjust path if needed

// // Import Shared Types
// import { Payment, PaymentStatus } from '../../../types/payment'; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//     message: string;
// }

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         if (!/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
//             console.warn("Invalid date parts:", parts);
//             return null;
//         }
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 3000) {
//             console.warn("Date components out of range:", { day, month, year });
//             return null;
//         }
//         const date = new Date(Date.UTC(year, month, day));
//         if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//             return date;
//         } else {
//             console.warn("Date validation failed after construction:", dateString);
//             return null;
//         }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// const AdminPaymentsPage: React.FC = () => {
//     // --- Core States (remain mostly the same) ---
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//     // --- Filter States (Managed by this parent component) ---
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [fromDate, setFromDate] = useState<string>(''); // String for DateInput
//     const [toDate, setToDate] = useState<string>('');   // String for DateInput
//     // *** Change statusFilter state to string for GenericFilters compatibility ***
//     const [statusFilter, setStatusFilter] = useState<string>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<string>('all'); // string is fine

//     // --- Edit Modal State (remains the same) ---
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({ status: '' });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // --- Sorting State (remains the same) ---
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

//     // --- Pagination State (remains the same) ---
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50];

//     // --- Fetching Data (remains the same) ---
//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true);
//         setError(null);
//         // setSuccessMessage(null); // Optional: Clear success on refresh
//         try {
//             const response = await axios.get<{ data: Payment[] } | Payment[]>('/admin/payments', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             let paymentData: Payment[] = [];
//              if (response.data && Array.isArray((response.data as any).data)) {
//                  paymentData = (response.data as any).data;
//              } else if (Array.isArray(response.data)) {
//                  paymentData = response.data;
//              } else {
//                   console.warn("API response format unexpected:", response.data);
//                   paymentData = [];
//              }

//             // Validate and sanitize data
//              const validatedData = paymentData
//                 .filter(p => p && typeof p === 'object')
//                 .map(p => ({
//                     ...p,
//                     _id: String(p._id ?? ''),
//                     amountToAdd: String(p.amountToAdd ?? ''),
//                     // Ensure status is a valid PaymentStatus or a default string
//                     status: (p.status && statusOptions.includes(p.status)) ? p.status : 'unknown',
//                     createdAt: p.createdAt || new Date(0).toISOString(),
//                     user: p.user && typeof p.user === 'object' ? {
//                         ...p.user,
//                         fullName: String(p.user.fullName ?? 'N/A'),
//                         email: String(p.user.email ?? 'N/A'),
//                     } : { fullName: 'N/A', email: 'N/A' },
//                     payInCurrency: p.payInCurrency && typeof p.payInCurrency === 'object' ? {
//                          ...p.payInCurrency,
//                          code: String(p.payInCurrency.code ?? 'N/A'),
//                     } : { code: 'N/A' },
//                     referenceCode: String(p.referenceCode ?? '')
//             }));

//             setPayments(validatedData);

//         } catch (err: unknown) {
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//              setPayments([]); // Clear data on error
//              console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false);
//         }
//     }, [token]); // statusOptions dependency removed as it's static or memoized below

//     useEffect(() => {
//         if (token) {
//              fetchPayments();
//         } else {
//              setError("Authentication required.");
//              setLoadingPayments(false);
//              setPayments([]);
//         }
//     }, [token, fetchPayments]);

//     // --- Filtering and Sorting Logic (remains mostly the same) ---
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Payment ID filter (using paymentIdFilter state)
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter (using amountFilter state)
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             if (!isNaN(amount)) {
//                  results = results.filter(payment => {
//                      const paymentAmount = parseFloat(payment.amountToAdd);
//                      return !isNaN(paymentAmount) && paymentAmount === amount;
//                  });
//             }
//         }

//         // Apply Currency filter (using currencyFilter state)
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter (using statusFilter state - now a string)
//         if (statusFilter !== 'all') {
//             // Compare strings directly
//             results = results.filter(payment => payment.status.toLowerCase() === statusFilter.toLowerCase());
//         }

//         // Apply date filters (using fromDate/toDate strings)
//         const fromDateObj = parseDateString(fromDate);
//         const toDateObj = parseDateString(toDate);

//         if (fromDateObj) {
//              fromDateObj.setUTCHours(0, 0, 0, 0);
//              results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//                  } catch { return false; }
//              });
//          }

//          if (toDateObj) {
//              toDateObj.setUTCHours(23, 59, 59, 999);
//              results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//                  } catch { return false; }
//              });
//          }

//          // Apply sorting (logic remains the same)
//          if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: any;
//                  let valueB: any;

//                  const getSafeValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

//                  switch (sortField) {
//                      case 'user': valueA = a.user?.fullName?.toLowerCase() || ''; valueB = b.user?.fullName?.toLowerCase() || ''; break;
//                      case 'email': valueA = a.user?.email?.toLowerCase() || ''; valueB = b.user?.email?.toLowerCase() || ''; break;
//                      case 'amount': valueA = parseFloat(a.amountToAdd) || 0; valueB = parseFloat(b.amountToAdd) || 0; break;
//                      case 'currency': valueA = a.payInCurrency?.code?.toLowerCase() || ''; valueB = b.payInCurrency?.code?.toLowerCase() || ''; break;
//                      case 'createdAt': valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0; valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0; if (isNaN(valueA)) valueA = 0; if (isNaN(valueB)) valueB = 0; break;
//                      case '_id': case 'status': case 'referenceCode':
//                          valueA = (a[sortField as keyof Payment] as string | undefined | null)?.toLowerCase() ?? '';
//                          valueB = (b[sortField as keyof Payment] as string | undefined | null)?.toLowerCase() ?? '';
//                          break;
//                      default: valueA = getSafeValue(a, sortField); valueB = getSafeValue(b, sortField); if (typeof valueA === 'string') valueA = valueA.toLowerCase(); if (typeof valueB === 'string') valueB = valueB.toLowerCase(); break;
//                  }

//                  let comparison = 0;
//                  if (valueA < valueB) comparison = -1;
//                  else if (valueA > valueB) comparison = 1;

//                  return sortDirection === 'asc' ? comparison : comparison * -1;
//              });
//          }

//         setFilteredPayments(results);

//     }, [payments, searchTerm, statusFilter, fromDate, toDate, paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection]);

//     // --- Reset Page on Filter/Sort Change (remains the same) ---
//     useEffect(() => {
//         if (currentPage !== 1) {
//              setCurrentPage(1);
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [searchTerm, statusFilter, fromDate, toDate, paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection]);

//     // --- Callback for GenericFilters to apply selected filters ---
//     const handleApplyFilters = useCallback((filters: FiltersState) => {
//         setSearchTerm(filters.searchTerm);
//         setFromDate(filters.fromDate);
//         setToDate(filters.toDate);
//         setStatusFilter(filters.statusFilter); // Directly use the string status
//         // Map idFilter back to paymentIdFilter
//         setPaymentIdFilter(filters.idFilter);
//         setAmountFilter(filters.amountFilter);
//         setCurrencyFilter(filters.currencyFilter);
//         // No recipient filter to set for payments
//         // Page reset is handled by the useEffect above
//     }, []); // No dependencies needed

//     // --- Callback for GenericFilters to clear all filters ---
//     const handleClearAllFilters = useCallback(() => {
//         setSearchTerm('');
//         setFromDate('');
//         setToDate('');
//         setStatusFilter('all'); // Reset to string 'all'
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         // Optionally reset sorting
//         // setSortField(null);
//         // setSortDirection('desc');
//         // Page reset is handled by the useEffect above
//     }, []); // No dependencies needed

//     // --- Other Handlers (Page Size, Sort, Edit - remain the same) ---
//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1);
//     };

//     const toggleSort = (field: string) => {
//         const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//         setSortField(field);
//         setSortDirection(newDirection);
//     };

//     const getStatusColor = (status: string): string => {
//          switch (status?.toLowerCase()) {
//              case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400';
//              case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400';
//              case 'in progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400';
//              case 'canceled': case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400';
//              case 'failed': return 'text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400'; // Added example
//              default: return 'text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400'; // Default
//          }
//     };

//     // Memoize options
//     const currencyOptions = useMemo(() => {
//         const codes = new Set(payments.map(p => p.payInCurrency?.code).filter((code): code is string => Boolean(code) && code !== 'N/A'));
//         return ['all', ...Array.from(codes).sort()];
//     }, [payments]);

//     // Static list of possible payment statuses (as strings for GenericFilters)
//     // Keep PaymentStatus type for defining potential values if needed elsewhere
//     const statusOptions: string[] = useMemo(() => {
//        // Could derive from data: new Set(payments.map(p => p.status).filter(Boolean))
//        // Or define statically:
//        return ['all', 'pending', 'in progress', 'completed', 'canceled', 'failed', 'unknown']; // Ensure 'unknown' or other defaults are here if used
//     }, []); // Or depend on [payments] if deriving

//     // Edit Modal Handlers (remain the same)
//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({ status: payment.status ?? 'unknown' });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit?._id) return;
//         // Add validation if needed: !editFormData.status || editFormData.status === 'all' ...
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const payload = { status: editFormData.status }; // Send the selected string status
//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//              // Update local state
//              setPayments(prevPayments =>
//                  prevPayments.map(p =>
//                      p._id === selectedPaymentForEdit._id ? { ...p, status: editFormData.status } : p
//                  )
//              );
//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null);
//         } catch (err: unknown) {
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  errorMessage = (err.response?.data as ApiErrorResponse)?.message || err.message;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//              console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = useCallback(() => {
//         fetchPayments();
//     }, [fetchPayments]);

//     // --- Pagination Calculation (Memoized - remains the same) ---
//     const { currentPayments, totalPages } = useMemo(() => {
//         const indexOfLastPayment = currentPage * paymentsPerPage;
//         const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//         const paginatedData = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
//         const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//         return { currentPayments: paginatedData, totalPages: pages };
//     }, [filteredPayments, currentPage, paymentsPerPage]);

//     // --- Effect to Adjust Page (remains the same) ---
//      useEffect(() => {
//          if (totalPages > 0 && currentPage > totalPages) {
//              setCurrentPage(totalPages);
//          }
//      }, [currentPage, totalPages]);

//     // Pagination handlers (remain the same)
//     const paginate = (pageNumber: number) => {
//          if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//          else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//          else if (pageNumber > totalPages && totalPages > 0) setCurrentPage(totalPages);
//     };
//     const goToPreviousPage = () => paginate(currentPage - 1);
//     const goToNextPage = () => paginate(currentPage + 1);

//     // --- Bundle current filters into an object for GenericFilters prop ---
//     const currentFilterState: FiltersState = useMemo(() => ({
//         searchTerm,
//         fromDate,
//         toDate,
//         statusFilter, // Pass the string status
//         currencyFilter,
//         idFilter: paymentIdFilter, // Map paymentIdFilter to idFilter
//         amountFilter,
//         // recipientFilter: undefined, // Explicitly undefined or omit
//     }), [searchTerm, fromDate, toDate, statusFilter, currencyFilter, paymentIdFilter, amountFilter]);

//     // --- JSX ---
//     return (
//       <div className="container mx-auto px-4 py-8 relative">
//         <div className="space-y-6">
//           {/* Header */}
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white">
//               Payment Management
//             </h1>
//             {/* Search input is now inside the Filter modal */}
//             <div className="flex items-center gap-3 justify-end">
//               <button
//                 onClick={() => setShowFilterModal(true)}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
//               >
//                 <Filter size={18} />
//                 Filters
//               </button>
//               <button
//                 onClick={refreshData}
//                 disabled={isRefreshing || loadingPayments}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Refresh payment data"
//               >
//                 <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>

//           {/* Success/Error Messages (Keep as is) */}
//           <AnimatePresence>
//             {successMessage && (
//               <motion.div /* ... success message ... */>
//                 {/* ... content ... */}
//                  <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                  <button onClick={() => setSuccessMessage(null)}>{/* ... */}</button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <AnimatePresence>
//             {error && (
//               <motion.div /* ... error message ... */>
//                 {/* ... content ... */}
//                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                  <button onClick={() => setError(null)}>{/* ... */}</button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pagination and Page Size Controls (Keep as is) */}
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//              <div className="flex items-center gap-2">
//                   <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show:</label>
//                   <select id="paymentsPerPage" value={paymentsPerPage} onChange={(e) => handlePageSizeChange(Number(e.target.value))} className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white">
//                        {pageSizeOptions.map(size => <option key={size} value={size} className="dark:bg-dropdowncolor">{size}</option>)}
//                   </select>
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">entries</span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing {filteredPayments.length > 0 ? (currentPage - 1) * paymentsPerPage + 1 : 0}
//                   - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}
//                   {" "}of {filteredPayments.length} results
//                   {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//               </p>
//           </div>

//           {/* Payments Table (Keep as is) */}
//           <PaymentTable
//             filteredPayments={currentPayments}
//             loadingPayments={loadingPayments}
//             getStatusColor={getStatusColor}
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//             handleEditPayment={handleEditPayment}
//           />

//           {/* Pagination (Keep as is) */}
//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={paginate}
//               goToPreviousPage={goToPreviousPage}
//               goToNextPage={goToNextPage}
//             />
//           )}

//         </div>

//         {/* Edit Payment Modal (Keep as is) */}
//         <PaymentEditModal
//           isEditModalOpen={isEditModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           selectedPaymentForEdit={selectedPaymentForEdit}
//           editFormData={editFormData}
//           setEditFormData={setEditFormData}
//           editLoading={editLoading}
//           handleSaveEdit={handleSaveEdit}
//           // Pass only valid, selectable statuses (excluding 'all', 'unknown')
//           statusOptions={statusOptions.filter(s => s !== 'all' && s !== 'unknown')}
//         />

//         {/* *** USE GENERIC FILTERS COMPONENT *** */}
//         <GenericFilters
//             showFilterModal={showFilterModal}
//             setShowFilterModal={setShowFilterModal}
//             initialFilters={currentFilterState} // Pass the mapped state
//             onApplyFilters={handleApplyFilters}   // Pass the apply handler
//             onClearFilters={handleClearAllFilters} // Pass the clear handler
//             currencyOptions={currencyOptions}      // Pass payment currencies
//             statusOptions={statusOptions}          // Pass payment statuses (as strings)
//             // Configure for Payments
//             idFilterLabel="Payment ID"
//             idFilterPlaceholder="Filter by Payment ID"
//             showRecipientFilter={false} // <<-- IMPORTANT: Hide recipient filter
//             // Other filters are shown by default (can be explicit: showAmountFilter={true}, etc.)
//         />
//       </div>
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if needed
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import PaymentTable from '../components/add-money/PaymentTable'; // Adjust path if needed
// import GenericFilters, { FiltersState } from '../components/add-money/PaymentFilters'; // Adjust path if needed
// import PaymentEditModal from '../components/add-money/PaymentEditModal'; // Adjust path if needed
// import Pagination from '../components/Pagination'; // Adjust path if needed

// // Import Shared Types
// import { Payment } from '../../../types/payment'; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//     message: string;
// }

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         if (!/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
//             console.warn("Invalid date parts:", parts);
//             return null;
//         }
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 3000) {
//             console.warn("Date components out of range:", { day, month, year });
//             return null;
//         }
//         const date = new Date(Date.UTC(year, month, day));
//         if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//             return date;
//         } else {
//             console.warn("Date validation failed after construction:", dateString);
//             return null;
//         }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// const AdminPaymentsPage: React.FC = () => {
//     // --- Core States ---
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//     const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const { token } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//     // --- Filter States ---
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');
//     const [statusFilter, setStatusFilter] = useState<string>('all');
//     const [paymentIdFilter, setPaymentIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<string>('all');

//     // --- Edit Modal State ---
//     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//     const [selectedPaymentForEdit, setSelectedPaymentForEdit] = useState<Payment | null>(null);
//     const [editFormData, setEditFormData] = useState<{ status: string }>({ status: '' });
//     const [editLoading, setEditLoading] = useState<boolean>(false);

//     // --- Sorting State (Initialize for default date sort) ---
//     // -------------------- VVVV CHANGE HERE VVVV --------------------
//     const [sortField, setSortField] = useState<string | null>('createdAt'); // Default sort by date
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default latest first
//     // -------------------- ^^^^ CHANGE HERE ^^^^ --------------------

//     // --- Pagination State ---
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50];

//     // --- Fetching Data ---
//     const fetchPayments = useCallback(async () => {
//         setLoadingPayments(true);
//         setIsRefreshing(true);
//         setError(null);
//         try {
//             const response = await axios.get<{ data: Payment[] } | Payment[]>('/admin/payments', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             let paymentData: Payment[] = [];
//              if (response.data && Array.isArray((response.data as any).data)) {
//                  paymentData = (response.data as any).data;
//              } else if (Array.isArray(response.data)) {
//                  paymentData = response.data;
//              } else {
//                   console.warn("API response format unexpected:", response.data);
//                   paymentData = [];
//              }

//              // Validate and sanitize data
//               const validatedData = paymentData
//                  .filter(p => p && typeof p === 'object')
//                  .map(p => ({
//                      ...p,
//                      _id: String(p._id ?? ''),
//                      amountToAdd: String(p.amountToAdd ?? ''),
//                      status: (p.status && statusOptions.includes(p.status)) ? p.status : 'unknown',
//                      createdAt: p.createdAt || new Date(0).toISOString(), // Ensure createdAt exists
//                      user: p.user && typeof p.user === 'object' ? {
//                          ...p.user,
//                          fullName: String(p.user.fullName ?? 'N/A'),
//                          email: String(p.user.email ?? 'N/A'),
//                      } : { fullName: 'N/A', email: 'N/A' },
//                      payInCurrency: p.payInCurrency && typeof p.payInCurrency === 'object' ? {
//                           ...p.payInCurrency,
//                           code: String(p.payInCurrency.code ?? 'N/A'),
//                      } : { code: 'N/A' },
//                      referenceCode: String(p.referenceCode ?? '')
//              }));

//             setPayments(validatedData);

//         } catch (err: unknown) {
//              let errorMessage = 'Failed to load payments';
//              if (axios.isAxiosError(err)) {
//                  const axiosError = err as AxiosError<ApiErrorResponse>;
//                  errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//              setPayments([]); // Clear data on error
//              console.error("Error fetching payments:", err);
//         } finally {
//             setLoadingPayments(false);
//             setIsRefreshing(false);
//         }
//     }, [token]); // removed statusOptions as it's memoized below

//     // Static list of possible payment statuses (as strings for GenericFilters)
//     const statusOptions: string[] = useMemo(() => {
//        return ['all', 'pending', 'in progress', 'completed', 'canceled', 'failed', 'unknown'];
//     }, []);

//     useEffect(() => {
//         if (token) {
//              fetchPayments();
//         } else {
//              setError("Authentication required.");
//              setLoadingPayments(false);
//              setPayments([]);
//         }
//     }, [token, fetchPayments]);

//     // --- Filtering and Sorting Logic ---
//     useEffect(() => {
//         let results: Payment[] = [...payments];

//         // Apply search filter
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(payment =>
//                 payment._id.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//                 payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Payment ID filter
//         if (paymentIdFilter) {
//              results = results.filter(payment =>
//                  payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//              );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             if (!isNaN(amount)) {
//                  results = results.filter(payment => {
//                      const paymentAmount = parseFloat(payment.amountToAdd);
//                      return !isNaN(paymentAmount) && paymentAmount === amount;
//                  });
//             }
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(payment => payment.payInCurrency?.code === currencyFilter);
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(payment => payment.status.toLowerCase() === statusFilter.toLowerCase());
//         }

//         // Apply date filters
//         const fromDateObj = parseDateString(fromDate);
//         const toDateObj = parseDateString(toDate);

//         if (fromDateObj) {
//              fromDateObj.setUTCHours(0, 0, 0, 0);
//              results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//                  } catch { return false; }
//              });
//          }

//          if (toDateObj) {
//              toDateObj.setUTCHours(23, 59, 59, 999);
//              results = results.filter(payment => {
//                  try {
//                      const paymentDate = new Date(payment.createdAt);
//                      return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//                  } catch { return false; }
//              });
//          }

//          // Apply sorting (This will now apply the default sort initially)
//          if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: any;
//                  let valueB: any;

//                  const getSafeValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

//                  switch (sortField) {
//                      case 'user': valueA = a.user?.fullName?.toLowerCase() || ''; valueB = b.user?.fullName?.toLowerCase() || ''; break;
//                      case 'email': valueA = a.user?.email?.toLowerCase() || ''; valueB = b.user?.email?.toLowerCase() || ''; break;
//                      case 'amount': valueA = parseFloat(a.amountToAdd) || 0; valueB = parseFloat(b.amountToAdd) || 0; break;
//                      case 'currency': valueA = a.payInCurrency?.code?.toLowerCase() || ''; valueB = b.payInCurrency?.code?.toLowerCase() || ''; break;
//                      case 'createdAt': // The crucial case for date sorting
//                          valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//                          valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//                          if (isNaN(valueA)) valueA = 0; // Handle potential invalid dates
//                          if (isNaN(valueB)) valueB = 0; // Handle potential invalid dates
//                          break;
//                      case '_id': case 'status': case 'referenceCode':
//                          valueA = (a[sortField as keyof Payment] as string | undefined | null)?.toLowerCase() ?? '';
//                          valueB = (b[sortField as keyof Payment] as string | undefined | null)?.toLowerCase() ?? '';
//                          break;
//                      default: valueA = getSafeValue(a, sortField); valueB = getSafeValue(b, sortField); if (typeof valueA === 'string') valueA = valueA.toLowerCase(); if (typeof valueB === 'string') valueB = valueB.toLowerCase(); break;
//                  }

//                  let comparison = 0;
//                  if (valueA < valueB) comparison = -1;
//                  else if (valueA > valueB) comparison = 1;

//                  return sortDirection === 'asc' ? comparison : comparison * -1;
//              });
//          }

//         setFilteredPayments(results);

//     }, [payments, searchTerm, statusFilter, fromDate, toDate, paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection]);

//     // --- Reset Page on Filter/Sort Change ---
//     useEffect(() => {
//         if (currentPage !== 1) {
//              setCurrentPage(1);
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [searchTerm, statusFilter, fromDate, toDate, paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection]);

//     // --- Callback for GenericFilters to apply selected filters ---
//     const handleApplyFilters = useCallback((filters: FiltersState) => {
//         setSearchTerm(filters.searchTerm);
//         setFromDate(filters.fromDate);
//         setToDate(filters.toDate);
//         setStatusFilter(filters.statusFilter);
//         setPaymentIdFilter(filters.idFilter);
//         setAmountFilter(filters.amountFilter);
//         setCurrencyFilter(filters.currencyFilter);
//     }, []);

//     // --- Callback for GenericFilters to clear all filters ---
//     const handleClearAllFilters = useCallback(() => {
//         setSearchTerm('');
//         setFromDate('');
//         setToDate('');
//         setStatusFilter('all');
//         setPaymentIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         // Optionally reset sort back to default if desired
//         // setSortField('createdAt');
//         // setSortDirection('desc');
//     }, []);

//     // --- Other Handlers ---
//     const handlePageSizeChange = (size: number) => {
//         setPaymentsPerPage(size);
//         setCurrentPage(1);
//     };

//     const toggleSort = (field: string) => {
//         const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//         setSortField(field);
//         setSortDirection(newDirection);
//     };

//     const getStatusColor = (status: string): string => {
//          switch (status?.toLowerCase()) {
//              case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400';
//              case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400';
//              case 'in progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400';
//              case 'canceled': case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400';
//              case 'failed': return 'text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400';
//              default: return 'text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400';
//          }
//     };

//     // Memoize options
//     const currencyOptions = useMemo(() => {
//         const codes = new Set(payments.map(p => p.payInCurrency?.code).filter((code): code is string => Boolean(code) && code !== 'N/A'));
//         return ['all', ...Array.from(codes).sort()];
//     }, [payments]);

//     // Edit Modal Handlers
//     const handleEditPayment = (payment: Payment) => {
//         setSelectedPaymentForEdit(payment);
//         setEditFormData({ status: payment.status ?? 'unknown' });
//         setIsEditModalOpen(true);
//     };

//     const handleSaveEdit = async () => {
//         if (!selectedPaymentForEdit?._id) return;
//         setEditLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const payload = { status: editFormData.status };
//             await axios.put(`/admin/payments/${selectedPaymentForEdit._id}`, payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//              setPayments(prevPayments =>
//                  prevPayments.map(p =>
//                      p._id === selectedPaymentForEdit._id ? { ...p, status: editFormData.status } : p
//                  )
//              );
//             setSuccessMessage('Payment status updated successfully!');
//             setIsEditModalOpen(false);
//             setSelectedPaymentForEdit(null);
//         } catch (err: unknown) {
//              let errorMessage = 'Failed to update payment status';
//              if (axios.isAxiosError(err)) {
//                  errorMessage = (err.response?.data as ApiErrorResponse)?.message || err.message;
//              } else if (err instanceof Error) {
//                  errorMessage = err.message;
//              }
//              setError(errorMessage);
//              console.error("Error updating payment status:", err);
//         } finally {
//             setEditLoading(false);
//         }
//     };

//     const refreshData = useCallback(() => {
//         fetchPayments();
//     }, [fetchPayments]);

//     // --- Pagination Calculation ---
//     const { currentPayments, totalPages } = useMemo(() => {
//         const indexOfLastPayment = currentPage * paymentsPerPage;
//         const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//         const paginatedData = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
//         const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//         return { currentPayments: paginatedData, totalPages: pages };
//     }, [filteredPayments, currentPage, paymentsPerPage]);

//     // --- Effect to Adjust Page ---
//      useEffect(() => {
//          if (totalPages > 0 && currentPage > totalPages) {
//              setCurrentPage(totalPages);
//          }
//      }, [currentPage, totalPages]);

//     // Pagination handlers
//     const paginate = (pageNumber: number) => {
//          if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//          else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//          else if (pageNumber > totalPages && totalPages > 0) setCurrentPage(totalPages);
//     };
//     const goToPreviousPage = () => paginate(currentPage - 1);
//     const goToNextPage = () => paginate(currentPage + 1);

//     // --- Bundle current filters into an object for GenericFilters prop ---
//     const currentFilterState: FiltersState = useMemo(() => ({
//         searchTerm,
//         fromDate,
//         toDate,
//         statusFilter,
//         currencyFilter,
//         idFilter: paymentIdFilter,
//         amountFilter,
//     }), [searchTerm, fromDate, toDate, statusFilter, currencyFilter, paymentIdFilter, amountFilter]);

//     // --- JSX ---
//     return (
//       <div className="container mx-auto px-4 py-8 relative">
//         <div className="space-y-6">
//           {/* Header */}
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white">
//               Payment Management
//             </h1>
//             <div className="flex items-center gap-3 justify-end">
//               <button
//                 onClick={() => setShowFilterModal(true)}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
//               >
//                 <Filter size={18} />
//                 Filters
//               </button>
//               <button
//                 onClick={refreshData}
//                 disabled={isRefreshing || loadingPayments}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Refresh payment data"
//               >
//                 <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>

//           {/* Success/Error Messages */}
//           <AnimatePresence>
//             {successMessage && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//                 >
//                     <div className="flex items-center gap-2">
//                         <Check className="text-green-600 dark:text-green-400" size={18} />
//                         <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                     </div>
//                     <button onClick={() => setSuccessMessage(null)} className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">
//                         <X size={18} />
//                     </button>
//                 </motion.div>
//             )}
//           </AnimatePresence>
//           <AnimatePresence>
//             {error && (
//                  <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//                 >
//                    <div className="flex items-center gap-2">
//                         <X className="text-red-600 dark:text-red-400" size={18} />
//                         <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                     </div>
//                     <button onClick={() => setError(null)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
//                         <X size={18} />
//                     </button>
//                 </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pagination and Page Size Controls */}
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//              <div className="flex items-center gap-2">
//                   <label htmlFor="paymentsPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show:</label>
//                   <select id="paymentsPerPage" value={paymentsPerPage} onChange={(e) => handlePageSizeChange(Number(e.target.value))} className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white">
//                        {pageSizeOptions.map(size => <option key={size} value={size} className="dark:bg-dropdowncolor">{size}</option>)}
//                   </select>
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">entries</span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing {filteredPayments.length > 0 ? (currentPage - 1) * paymentsPerPage + 1 : 0}
//                   - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}
//                   {" "}of {filteredPayments.length} results
//                   {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//               </p>
//           </div>

//           {/* Payments Table */}
//           <PaymentTable
//             filteredPayments={currentPayments}
//             loadingPayments={loadingPayments}
//             getStatusColor={getStatusColor}
//             toggleSort={toggleSort}
//             sortField={sortField} // Pass the current sort field
//             sortDirection={sortDirection} // Pass the current sort direction
//             handleEditPayment={handleEditPayment}
//           />

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={paginate}
//               goToPreviousPage={goToPreviousPage}
//               goToNextPage={goToNextPage}
//             />
//           )}

//         </div>

//         {/* Edit Payment Modal */}
//         <PaymentEditModal
//           isEditModalOpen={isEditModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           selectedPaymentForEdit={selectedPaymentForEdit}
//           editFormData={editFormData}
//           setEditFormData={setEditFormData}
//           editLoading={editLoading}
//           handleSaveEdit={handleSaveEdit}
//           statusOptions={statusOptions.filter(s => s !== 'all' && s !== 'unknown')}
//         />

//         {/* Generic Filters Component */}
//         <GenericFilters
//             showFilterModal={showFilterModal}
//             setShowFilterModal={setShowFilterModal}
//             initialFilters={currentFilterState}
//             onApplyFilters={handleApplyFilters}
//             onClearFilters={handleClearAllFilters}
//             currencyOptions={currencyOptions}
//             statusOptions={statusOptions}
//             idFilterLabel="Payment ID"
//             idFilterPlaceholder="Filter by Payment ID"
//             showRecipientFilter={false}
//         />
//       </div>
//     );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../config/apiConfig"; // Adjust path if needed
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, X, Filter, RefreshCw, HandCoinsIcon } from "lucide-react";

// // Import components
// import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
// import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
// import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
// import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
// import Pagination from "../components/Pagination"; // Adjust path if needed

// // Import Shared Types
// import { Payment } from "../../../types/payment"; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//   message: string;
// }

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       console.warn("Invalid date parts:", parts);
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       console.warn("Date components out of range:", { day, month, year });
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       console.warn("Date validation failed after construction:", dateString);
//       return null;
//     }
//   }
//   console.warn("Could not parse date string:", dateString);
//   return null;
// }

// const AdminPaymentsPage: React.FC = () => {
//   // --- Core States ---
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//   const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
//   const [amountFilter, setAmountFilter] = useState<string>("");
//   const [currencyFilter, setCurrencyFilter] = useState<string>("all");

//   // --- Edit Modal State ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//   const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
//     useState<Payment | null>(null);
//   const [editFormData, setEditFormData] = useState<{ status: string }>({
//     status: "",
//   });
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // --- Sorting State (Initialize for default date sort) ---
//   // -------------------- VVVV CHANGE HERE VVVV --------------------
//   const [sortField, setSortField] = useState<PaymentSortField | null>(
//     "createdAt"
//   ); // Default sort by date
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc"); // Default latest first
//   // -------------------- ^^^^ CHANGE HERE ^^^^ --------------------

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   // --- Fetching Data ---
//   const fetchPayments = useCallback(async () => {
//     setLoadingPayments(true);
//     setIsRefreshing(true);
//     setError(null);
//     try {
//       const response = await axios.get<{ data: Payment[] } | Payment[]>(
//         "/admin/payments",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       let paymentData: Payment[] = [];
//       if (response.data && Array.isArray((response.data as any).data)) {
//         paymentData = (response.data as any).data;
//       } else if (Array.isArray(response.data)) {
//         paymentData = response.data;
//       } else {
//         console.warn("API response format unexpected:", response.data);
//         paymentData = [];
//       }

//       // Validate and sanitize data
//       const validatedData = paymentData
//         .filter((p) => p && typeof p === "object")
//         .map((p) => ({
//           ...p,
//           _id: String(p._id ?? ""),
//           amountToAdd: String(p.amountToAdd ?? ""),
//           status:
//             p.status && statusOptions.includes(p.status) ? p.status : "unknown",
//           createdAt: p.createdAt || new Date(0).toISOString(), // Ensure createdAt exists
//           user:
//             p.user && typeof p.user === "object"
//               ? {
//                   ...p.user,
//                   fullName: String(p.user.fullName ?? "N/A"),
//                   email: String(p.user.email ?? "N/A"),
//                 }
//               : { fullName: "N/A", email: "N/A" },
//           payInCurrency:
//             p.payInCurrency && typeof p.payInCurrency === "object"
//               ? {
//                   ...p.payInCurrency,
//                   code: String(p.payInCurrency.code ?? "N/A"),
//                 }
//               : { code: "N/A" },
//           referenceCode: String(p.referenceCode ?? ""),
//         }));

//       setPayments(validatedData);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load payments";
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorResponse>;
//         errorMessage =
//           axiosError.response?.data?.message ||
//           axiosError.message ||
//           errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       setError(errorMessage);
//       setPayments([]); // Clear data on error
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoadingPayments(false);
//       setIsRefreshing(false);
//     }
//   }, [token]); // removed statusOptions as it's memoized below

//   // Static list of possible payment statuses (as strings for GenericFilters)
//   const statusOptions: string[] = useMemo(() => {
//     return [
//       "all",
//       "pending",
//       "in progress",
//       "completed",
//       "canceled",
//       "failed",
//       "unknown",
//     ];
//   }, []);

//   useEffect(() => {
//     if (token) {
//       fetchPayments();
//     } else {
//       setError("Authentication required.");
//       setLoadingPayments(false);
//       setPayments([]);
//     }
//   }, [token, fetchPayments]);

//   // --- Filtering and Sorting Logic ---
//   useEffect(() => {
//     let results: Payment[] = [...payments];

//     // Apply search filter
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (payment) =>
//           payment._id.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }

//     // Apply Payment ID filter
//     if (paymentIdFilter) {
//       results = results.filter((payment) =>
//         payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//       );
//     }

//     // Apply Amount filter
//     if (amountFilter) {
//       const amount = parseFloat(amountFilter);
//       if (!isNaN(amount)) {
//         results = results.filter((payment) => {
//           const paymentAmount = parseFloat(payment.amountToAdd);
//           return !isNaN(paymentAmount) && paymentAmount === amount;
//         });
//       }
//     }

//     // Apply Currency filter
//     if (currencyFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.payInCurrency?.code === currencyFilter
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Apply date filters
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//         } catch {
//           return false;
//         }
//       });
//     }

//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//         } catch {
//           return false;
//         }
//       });
//     }

//     // Apply sorting (This will now apply the default sort initially)
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;

//         const getSafeValue = (obj: any, path: string) =>
//           path.split(".").reduce((acc, part) => acc && acc[part], obj);

//         switch (sortField) {
//           case "user":
//             // Sort by user's full name (as intended by the type)
//             valueA = a.user?.fullName?.toLowerCase() || "";
//             valueB = b.user?.fullName?.toLowerCase() || "";
//             break;
//           // REMOVED: case 'email': was not part of PaymentSortField
//           case "amount":
//             valueA = parseFloat(a.amountToAdd) || 0; // Or use 'amount' field if that's correct
//             valueB = parseFloat(b.amountToAdd) || 0; // Or use 'amount' field if that's correct
//             break;
//           // REMOVED: case 'currency': was not part of PaymentSortField
//           case "createdAt": // This case handles date sorting
//             valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//             valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//             if (isNaN(valueA)) valueA = 0;
//             if (isNaN(valueB)) valueB = 0;
//             break;
//           case "_id":
//             valueA = (a._id ?? "").toLowerCase();
//             valueB = (b._id ?? "").toLowerCase();
//             break;
//           case "status":
//             valueA = (a.status ?? "").toLowerCase();
//             valueB = (b.status ?? "").toLowerCase();
//             break;
//           default:
//             valueA = getSafeValue(a, sortField);
//             valueB = getSafeValue(b, sortField);
//             if (typeof valueA === "string") valueA = valueA.toLowerCase();
//             if (typeof valueB === "string") valueB = valueB.toLowerCase();
//             break;
//         }

//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;

//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }

//     setFilteredPayments(results);
//   }, [
//     payments,
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     paymentIdFilter,
//     amountFilter,
//     currencyFilter,
//     sortField,
//     sortDirection,
//   ]);

//   // --- Reset Page on Filter/Sort Change ---
//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     paymentIdFilter,
//     amountFilter,
//     currencyFilter,
//     sortField,
//     sortDirection,
//   ]);

//   // --- Callback for GenericFilters to apply selected filters ---
//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setPaymentIdFilter(filters.idFilter);
//     setAmountFilter(filters.amountFilter);
//     setCurrencyFilter(filters.currencyFilter);
//   }, []);

//   // --- Callback for GenericFilters to clear all filters ---
//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentIdFilter("");
//     setAmountFilter("");
//     setCurrencyFilter("all");
//     // Optionally reset sort back to default if desired
//     // setSortField('createdAt');
//     // setSortDirection('desc');
//   }, []);

//   // --- Other Handlers ---
//   const handlePageSizeChange = (size: number) => {
//     setPaymentsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleSort = (field: PaymentSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "pending":
//         return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "in progress":
//         return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "canceled":
//       case "cancelled":
//         return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//       case "failed":
//         return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//       default:
//         return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   // Memoize options
//   const currencyOptions = useMemo(() => {
//     const codes = new Set(
//       payments
//         .map((p) => p.payInCurrency?.code)
//         .filter((code): code is string => Boolean(code) && code !== "N/A")
//     );
//     return ["all", ...Array.from(codes).sort()];
//   }, [payments]);

//   // Edit Modal Handlers
//   const handleEditPayment = (payment: Payment) => {
//     setSelectedPaymentForEdit(payment);
//     setEditFormData({ status: payment.status ?? "unknown" });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedPaymentForEdit?._id) return;
//     setEditLoading(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const payload = { status: editFormData.status };
//       await axios.put(
//         `/admin/payments/${selectedPaymentForEdit._id}`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setPayments((prevPayments) =>
//         prevPayments.map((p) =>
//           p._id === selectedPaymentForEdit._id
//             ? { ...p, status: editFormData.status }
//             : p
//         )
//       );
//       setSuccessMessage("Payment status updated successfully!");
//       setIsEditModalOpen(false);
//       setSelectedPaymentForEdit(null);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update payment status";
//       if (axios.isAxiosError(err)) {
//         errorMessage =
//           (err.response?.data as ApiErrorResponse)?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       setError(errorMessage);
//       console.error("Error updating payment status:", err);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const refreshData = useCallback(() => {
//     fetchPayments();
//   }, [fetchPayments]);

//   // --- Pagination Calculation ---
//   const { currentPayments, totalPages } = useMemo(() => {
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const paginatedData = filteredPayments.slice(
//       indexOfFirstPayment,
//       indexOfLastPayment
//     );
//     const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     return { currentPayments: paginatedData, totalPages: pages };
//   }, [filteredPayments, currentPage, paymentsPerPage]);

//   // --- Effect to Adjust Page ---
//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   // Pagination handlers
//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0)
//       setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   // --- Bundle current filters into an object for GenericFilters prop ---
//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter,
//       currencyFilter,
//       idFilter: paymentIdFilter,
//       amountFilter,
//     }),
//     [
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter,
//       currencyFilter,
//       paymentIdFilter,
//       amountFilter,
//     ]
//   );

//   // --- JSX ---
//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         {/* Header Parts */}
//         <div className="flex sm:flex-row flex-col justify-between items-center ">
//           <div className="flex flex-col mb-5">

//             <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Add-Money Management
//             </h1>

//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track and manage all incoming payments, statuses, and user
//               transactions in real time with full control and visibility.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
//             >
//               <Filter size={18} />
//               Filters
//             </button>

//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingPayments}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh payment data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check
//                   className="text-green-600 dark:text-green-400"
//                   size={18}
//                 />
//                 <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                   {successMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="text-green-600 dark:text-green-400 cursor-pointer hover:text-green-800 dark:hover:text-green-200"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <X className="text-red-600 dark:text-red-400" size={18} />
//                 <p className="text-sm font-medium text-red-800 dark:text-red-300">
//                   {error}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setError(null)}
//                 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination and Page Size Controls */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="paymentsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="paymentsPerPage"
//               value={paymentsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredPayments.length > 0
//               ? (currentPage - 1) * paymentsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//             of {filteredPayments.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {/* Payments Table */}
//         <PaymentTable
//           filteredPayments={currentPayments}
//           loadingPayments={loadingPayments}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort} // Pass the updated toggleSort
//           sortField={sortField} // Pass the state (now correctly typed)
//           sortDirection={sortDirection} // Pass the current sort direction
//           handleEditPayment={handleEditPayment}
//         />

//         {/* Pagination */}
//         {totalPages > 1 && !loadingPayments && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       {/* Edit Payment Modal */}
//       <PaymentEditModal
//         isEditModalOpen={isEditModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         selectedPaymentForEdit={selectedPaymentForEdit}
//         editFormData={editFormData}
//         setEditFormData={setEditFormData}
//         editLoading={editLoading}
//         handleSaveEdit={handleSaveEdit}
//         statusOptions={statusOptions.filter(
//           (s) => s !== "all" && s !== "unknown"
//         )}
//       />

//       {/* Generic Filters Component */}
//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User Name or Email..."
//         currencyOptions={currencyOptions}
//         statusOptions={statusOptions}
//         idFilterLabel="Payment ID"
//         idFilterPlaceholder="Filter by Payment ID"
//         showRecipientFilter={false}
//       />
//     </div>
//   );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../config/apiConfig"; // Adjust path if needed
// import {
//     Filter,
//     RefreshCw,
//     HandCoinsIcon,
//     X,
//     BellDot, // Generic icon for CustomToast
//     // Import other icons if you differentiate them in CustomToast:
//     // CheckCircle, XCircle, InfoIcon as LucideInfoIcon, AlertTriangle,
// } from "lucide-react";

// // Import react-toastify
// import { ToastContainer, toast, Slide, ToastContainerProps } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import components
// import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
// import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
// import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
// import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
// import Pagination from "../components/Pagination"; // Adjust path if needed

// // Import Shared Types
// import { Payment } from "../../../types/payment"; // Adjust path as needed
// import { TbMoneybag } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//   message: string;
// }

// // --- CustomToastProps Definition ---
// interface CustomToastProps {
//   closeToast?: () => void;
//   message: string;
//   type?: 'success' | 'error' | 'info' | 'warning' | 'default';
// }

// // --- CustomToast Component Definition ---
// const CustomToast: React.FC<CustomToastProps> = ({ closeToast, message, type = 'default' }) => {
//   const iconColorClass = 'text-neutral-900 dark:text-white';
//   const bgColorClass = 'bg-lightgray dark:bg-[#2d2d2d]';
//   const textColorClass = 'text-neutral-900 dark:text-white';
//   const borderColorClass = 'border-primary dark:border-primary';
//   let IconComponent = BellDot;

//   // Optional: Differentiate icon based on type
//   // For example, if you import CheckCircle, XCircle, etc. from lucide-react:
//   // switch (type) {
//   //   case 'success': IconComponent = CheckCircle; break;
//   //   case 'error': IconComponent = XCircle; break;
//   //   case 'info': IconComponent = LucideInfoIcon; break; // Ensure LucideInfoIcon is imported as InfoIcon
//   //   case 'warning': IconComponent = AlertTriangle; break;
//   //   default: IconComponent = BellDot;
//   // }

//   return (
//     <div
//       className={`flex items-start p-4 rounded-md shadow-lg w-full max-w-md border-l-4 ${bgColorClass} ${borderColorClass}`}
//       role="alert"
//     >
//       <div className="flex-shrink-0 pt-0.5">
//         <IconComponent className={`h-6 w-6 ${iconColorClass}`} aria-hidden="true" />
//       </div>
//       <div className="ml-3 flex-1">
//         <p className={`text-sm font-medium ${textColorClass}`}>
//           {message}
//         </p>
//       </div>
//       {closeToast && (
//         <div className="ml-auto pl-3">
//           <div className="-mx-1.5 -my-1.5">
//             <button
//               type="button"
//               onClick={closeToast}
//               className={`inline-flex rounded-md p-1.5 ${textColorClass} cursor-pointer focus:outline-none `}
//             >
//               <span className="sr-only">Dismiss</span>
//               <X className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// const AdminPaymentsPage: React.FC = () => {
//   // --- Core States ---
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//   const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//   const { token } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
//   const [amountFilter, setAmountFilter] = useState<string>("");
//   const [currencyFilter, setCurrencyFilter] = useState<string>("all");

//   // --- Edit Modal State ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//   const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
//     useState<Payment | null>(null);
//   const [editFormData, setEditFormData] = useState<{ status: string }>({
//     status: "",
//   });
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<PaymentSortField | null>("createdAt");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const statusOptions: string[] = useMemo(() => {
//     return ["all", "pending", "in progress", "completed", "canceled", "failed", "unknown"];
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback((message: string, type?: CustomToastProps['type']) => {
//     toast(<CustomToast message={message} type={type || 'default'} />, {
//       // Toast-specific options if needed
//     });
//   }, []);

//   const fetchPayments = useCallback(async () => {
//     setLoadingPayments(true);
//     setIsRefreshing(true);
//     try {
//       const response = await axios.get<{ data: Payment[] } | Payment[]>(
//         "/admin/payments",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       let paymentData: Payment[] = [];
//       if (response.data && Array.isArray((response.data as any).data)) {
//         paymentData = (response.data as any).data;
//       } else if (Array.isArray(response.data)) {
//         paymentData = response.data;
//       } else {
//         console.warn("API response format unexpected:", response.data);
//         paymentData = [];
//       }
//       const validatedData = paymentData
//         .filter((p) => p && typeof p === "object")
//         .map((p) => ({
//           ...p,
//           _id: String(p._id ?? ""),
//           amountToAdd: String(p.amountToAdd ?? ""),
//           status: p.status && statusOptions.includes(p.status) ? p.status : "unknown",
//           createdAt: p.createdAt || new Date(0).toISOString(),
//           user: p.user && typeof p.user === "object" ? { ...p.user, fullName: String(p.user.fullName ?? "N/A"), email: String(p.user.email ?? "N/A"), } : { fullName: "N/A", email: "N/A" },
//           payInCurrency: p.payInCurrency && typeof p.payInCurrency === "object" ? { ...p.payInCurrency, code: String(p.payInCurrency.code ?? "N/A"), } : { code: "N/A" },
//           referenceCode: String(p.referenceCode ?? ""),
//         }));
//       setPayments(validatedData);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load payments";
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorResponse>;
//         errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       setPayments([]);
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoadingPayments(false);
//       setIsRefreshing(false);
//     }
//   }, [token, statusOptions, showToast]);

//   useEffect(() => {
//     if (token) {
//       fetchPayments();
//     } else {
//       showToast("Authentication required.", 'error');
//       setLoadingPayments(false);
//       setPayments([]);
//     }
//   }, [token, fetchPayments, showToast]);

//   useEffect(() => {
//     let results: Payment[] = [...payments];
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (payment) =>
//           payment._id.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (paymentIdFilter) {
//       results = results.filter((payment) =>
//         payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//       );
//     }
//     if (amountFilter) {
//       const amount = parseFloat(amountFilter);
//       if (!isNaN(amount)) {
//         results = results.filter((payment) => {
//           const paymentAmount = parseFloat(payment.amountToAdd);
//           return !isNaN(paymentAmount) && paymentAmount === amount;
//         });
//       }
//     }
//     if (currencyFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.payInCurrency?.code === currencyFilter
//       );
//     }
//     if (statusFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//         } catch { return false; }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//         } catch { return false; }
//       });
//     }
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         const getSafeValue = (obj: any, path: string) =>
//           path.split(".").reduce((acc, part) => acc && acc[part], obj);

//         switch (sortField) {
//           case "user": valueA = a.user?.fullName?.toLowerCase() || ""; valueB = b.user?.fullName?.toLowerCase() || ""; break;
//           case "amount": valueA = parseFloat(a.amountToAdd) || 0; valueB = parseFloat(b.amountToAdd) || 0; break;
//           case "createdAt": valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0; valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0; if (isNaN(valueA)) valueA = 0; if (isNaN(valueB)) valueB = 0; break;
//           case "_id": valueA = (a._id ?? "").toLowerCase(); valueB = (b._id ?? "").toLowerCase(); break;
//           case "status": valueA = (a.status ?? "").toLowerCase(); valueB = (b.status ?? "").toLowerCase(); break;
//           default: valueA = getSafeValue(a, sortField); valueB = getSafeValue(b, sortField); if (typeof valueA === "string") valueA = valueA.toLowerCase(); if (typeof valueB === "string") valueB = valueB.toLowerCase(); break;
//         }
//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     setFilteredPayments(results);
//   }, [
//     payments, searchTerm, statusFilter, fromDate, toDate,
//     paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm, statusFilter, fromDate, toDate, paymentIdFilter,
//     amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setPaymentIdFilter(filters.idFilter);
//     setAmountFilter(filters.amountFilter);
//     setCurrencyFilter(filters.currencyFilter);
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentIdFilter("");
//     setAmountFilter("");
//     setCurrencyFilter("all");
//   }, []);

//   const handlePageSizeChange = (size: number) => {
//     setPaymentsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleSort = (field: PaymentSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case "completed": return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "pending": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "in progress": return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "canceled": case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//       case "failed": return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//       default: return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   const currencyOptions = useMemo(() => {
//     const codes = new Set(
//       payments
//         .map((p) => p.payInCurrency?.code)
//         .filter((code): code is string => Boolean(code) && code !== "N/A")
//     );
//     return ["all", ...Array.from(codes).sort()];
//   }, [payments]);

//   const handleEditPayment = (payment: Payment) => {
//     setSelectedPaymentForEdit(payment);
//     setEditFormData({ status: payment.status ?? "unknown" });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedPaymentForEdit?._id) return;
//     setEditLoading(true);
//     try {
//       const payload = { status: editFormData.status };
//       await axios.put(
//         `/admin/payments/${selectedPaymentForEdit._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPayments((prevPayments) =>
//         prevPayments.map((p) =>
//           p._id === selectedPaymentForEdit._id
//             ? { ...p, status: editFormData.status }
//             : p
//         )
//       ); // Corrected line - removed the stray "_id"
//       showToast("Payment status updated successfully!", 'success');
//       setIsEditModalOpen(false);
//       setSelectedPaymentForEdit(null);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update payment status";
//       if (axios.isAxiosError(err)) {
//         errorMessage = (err.response?.data as ApiErrorResponse)?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       console.error("Error updating payment status:", err);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const refreshData = useCallback(() => {
//     fetchPayments();
//   }, [fetchPayments]);

//   const { currentPayments, totalPages } = useMemo(() => {
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const paginatedData = filteredPayments.slice(
//       indexOfFirstPayment,
//       indexOfLastPayment
//     );
//     const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     return { currentPayments: paginatedData, totalPages: pages };
//   }, [filteredPayments, currentPage, paymentsPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0) setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, idFilter: paymentIdFilter, amountFilter,
//     }),
//     [
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, paymentIdFilter, amountFilter,
//     ]
//   );

//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false, // User clicks on toast body won't close it
//     closeButton: false,  // THIS IS THE KEY CHANGE
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () => "p-0 shadow-none rounded-md bg-transparent", // Adjusted for no margin, let CustomToast handle spacing if needed
//     // bodyClassName: () => "p-0 m-0 block",
//   };

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <ToastContainer {...toastContainerProps} />
//       <div className="space-y-6">
//         <div className="flex sm:flex-row flex-col justify-between items-center ">
//           <div className="flex flex-col mb-5">
//             <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Add-Money Management
//             </h1>
//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track and manage all incoming payments, statuses, and user transactions in real time with full control and visibility.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center bg-primary h-12.5 px-8 py-3 cursor-pointer rounded-full sm:w-auto w-full text-neutral-900 justify-center "
//             >
//               <Filter size={18} className="mr-2" />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingPayments}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh payment data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="paymentsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="paymentsPerPage"
//               value={paymentsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredPayments.length > 0
//               ? (currentPage - 1) * paymentsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//             of {filteredPayments.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <PaymentTable
//           filteredPayments={currentPayments}
//           loadingPayments={loadingPayments}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           handleEditPayment={handleEditPayment}
//         />

//         {totalPages > 1 && !loadingPayments && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       <PaymentEditModal
//         isEditModalOpen={isEditModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         selectedPaymentForEdit={selectedPaymentForEdit}
//         editFormData={editFormData}
//         setEditFormData={setEditFormData}
//         editLoading={editLoading}
//         handleSaveEdit={handleSaveEdit}
//         statusOptions={statusOptions.filter(
//           (s) => s !== "all" && s !== "unknown"
//         )}
//       />

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User Name or Email..."
//         currencyOptions={currencyOptions}
//         statusOptions={statusOptions}
//         idFilterLabel="Payment ID"
//         idFilterPlaceholder="Filter by Payment ID"
//         showRecipientFilter={false}
//       />
//     </div>
//   );
// };

// export default AdminPaymentsPage;

// // Latest code
// // frontend/src/app/admin/payments/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../config/apiConfig"; // Adjust path if needed
// import {
//     Filter,
//     RefreshCw,
//     HandCoinsIcon,
//     X,
//     BellDot, // Generic icon for CustomToast
//     // Import other icons if you differentiate them in CustomToast:
//     // CheckCircle, XCircle, InfoIcon as LucideInfoIcon, AlertTriangle,
// } from "lucide-react";

// // Import react-toastify
// import { ToastContainer, toast, Slide, ToastContainerProps } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import components
// import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
// import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
// import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
// import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
// import Pagination from "../components/Pagination"; // Adjust path if needed

// // Import Shared Types
// import { Payment } from "../../../types/payment"; // Adjust path as needed
// import { TbMoneybag } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//   message: string;
// }

// // --- CustomToastProps Definition ---
// interface CustomToastProps {
//   closeToast?: () => void;
//   message: string;
//   type?: 'success' | 'error' | 'info' | 'warning' | 'default';
// }

// // --- CustomToast Component Definition ---
// const CustomToast: React.FC<CustomToastProps> = ({ closeToast, message, type = 'default' }) => {
//   const iconColorClass = 'text-neutral-900 dark:text-white';
//   const bgColorClass = 'bg-lightgray dark:bg-[#2d2d2d]';
//   const textColorClass = 'text-neutral-900 dark:text-white';
//   const borderColorClass = 'border-primary dark:border-primary';
//   let IconComponent = BellDot;

//   return (
//     <div
//       className={`flex items-start p-4 rounded-md shadow-lg w-full max-w-md mx-auto ${bgColorClass} ${borderColorClass}`}
//       role="alert"
//     >
//       <div className="flex-shrink-0 pt-0.5">
//         <IconComponent className={`h-6 w-6 ${iconColorClass}`} aria-hidden="true" />
//       </div>
//       <div className="ml-3 flex-1">
//         <p className={`text-sm font-medium ${textColorClass}`}>
//           {message}
//         </p>
//       </div>
//       {closeToast && (
//         <div className="ml-auto pl-3">
//           <div className="-mx-1.5 -my-1.5">
//             <button
//               type="button"
//               onClick={closeToast}
//               className={`inline-flex rounded-md p-1.5 ${textColorClass} cursor-pointer focus:outline-none `}
//             >
//               <span className="sr-only">Dismiss</span>
//               <X className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// const AdminPaymentsPage: React.FC = () => {
//   // --- Core States ---
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//   const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//   const { token } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
//   const [amountFilter, setAmountFilter] = useState<string>("");
//   const [currencyFilter, setCurrencyFilter] = useState<string>("all");

//   // --- Edit Modal State ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//   const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
//     useState<Payment | null>(null);
//   const [editFormData, setEditFormData] = useState<{ status: string }>({
//     status: "",
//   });
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<PaymentSortField | null>("createdAt");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const statusOptions: string[] = useMemo(() => {
//     return ["all", "pending", "in progress", "completed", "canceled", "failed", "unknown"];
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback((message: string, type?: CustomToastProps['type']) => {
//     toast(<CustomToast message={message} type={type || 'default'} />, {
//       // Toast-specific options if needed
//     });
//   }, []);

//   // --- Mobile Detection State ---
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const fetchPayments = useCallback(async () => {
//     setLoadingPayments(true);
//     setIsRefreshing(true);
//     try {
//       const response = await axios.get<{ data: Payment[] } | Payment[]>(
//         "/admin/payments",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       let paymentData: Payment[] = [];
//       if (response.data && Array.isArray((response.data as any).data)) {
//         paymentData = (response.data as any).data;
//       } else if (Array.isArray(response.data)) {
//         paymentData = response.data;
//       } else {
//         console.warn("API response format unexpected:", response.data);
//         paymentData = [];
//       }
//       const validatedData = paymentData
//         .filter((p) => p && typeof p === "object")
//         .map((p) => ({
//           ...p,
//           _id: String(p._id ?? ""),
//           amountToAdd: String(p.amountToAdd ?? ""),
//           status: p.status && statusOptions.includes(p.status) ? p.status : "unknown",
//           createdAt: p.createdAt || new Date(0).toISOString(),
//           user: p.user && typeof p.user === "object" ? { ...p.user, fullName: String(p.user.fullName ?? "N/A"), email: String(p.user.email ?? "N/A"), } : { fullName: "N/A", email: "N/A" },
//           payInCurrency: p.payInCurrency && typeof p.payInCurrency === "object" ? { ...p.payInCurrency, code: String(p.payInCurrency.code ?? "N/A"), } : { code: "N/A" },
//           referenceCode: String(p.referenceCode ?? ""),
//         }));
//       setPayments(validatedData);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load payments";
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorResponse>;
//         errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       setPayments([]);
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoadingPayments(false);
//       setIsRefreshing(false);
//     }
//   }, [token, statusOptions, showToast]);

//   useEffect(() => {
//     if (token) {
//       fetchPayments();
//     } else {
//       showToast("Authentication required.", 'error');
//       setLoadingPayments(false);
//       setPayments([]);
//     }
//   }, [token, fetchPayments, showToast]);

//   useEffect(() => {
//     let results: Payment[] = [...payments];
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (payment) =>
//           payment._id.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (paymentIdFilter) {
//       results = results.filter((payment) =>
//         payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//       );
//     }
//     if (amountFilter) {
//       const amount = parseFloat(amountFilter);
//       if (!isNaN(amount)) {
//         results = results.filter((payment) => {
//           const paymentAmount = parseFloat(payment.amountToAdd);
//           return !isNaN(paymentAmount) && paymentAmount === amount;
//         });
//       }
//     }
//     if (currencyFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.payInCurrency?.code === currencyFilter
//       );
//     }
//     if (statusFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//         } catch { return false; }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//         } catch { return false; }
//       });
//     }
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         const getSafeValue = (obj: any, path: string) =>
//           path.split(".").reduce((acc, part) => acc && acc[part], obj);

//         switch (sortField) {
//           case "user": valueA = a.user?.fullName?.toLowerCase() || ""; valueB = b.user?.fullName?.toLowerCase() || ""; break;
//           case "amount": valueA = parseFloat(a.amountToAdd) || 0; valueB = parseFloat(b.amountToAdd) || 0; break;
//           case "createdAt": valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0; valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0; if (isNaN(valueA)) valueA = 0; if (isNaN(valueB)) valueB = 0; break;
//           case "_id": valueA = (a._id ?? "").toLowerCase(); valueB = (b._id ?? "").toLowerCase(); break;
//           case "status": valueA = (a.status ?? "").toLowerCase(); valueB = (b.status ?? "").toLowerCase(); break;
//           default: valueA = getSafeValue(a, sortField); valueB = getSafeValue(b, sortField); if (typeof valueA === "string") valueA = valueA.toLowerCase(); if (typeof valueB === "string") valueB = valueB.toLowerCase(); break;
//         }
//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     setFilteredPayments(results);
//   }, [
//     payments, searchTerm, statusFilter, fromDate, toDate,
//     paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm, statusFilter, fromDate, toDate, paymentIdFilter,
//     amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setPaymentIdFilter(filters.idFilter);
//     setAmountFilter(filters.amountFilter);
//     setCurrencyFilter(filters.currencyFilter);
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentIdFilter("");
//     setAmountFilter("");
//     setCurrencyFilter("all");
//   }, []);

//   const handlePageSizeChange = (size: number) => {
//     setPaymentsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleSort = (field: PaymentSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case "completed": return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "pending": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "in progress": return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "canceled": case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//       case "failed": return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//       default: return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   const currencyOptions = useMemo(() => {
//     const codes = new Set(
//       payments
//         .map((p) => p.payInCurrency?.code)
//         .filter((code): code is string => Boolean(code) && code !== "N/A")
//     );
//     return ["all", ...Array.from(codes).sort()];
//   }, [payments]);

//   const handleEditPayment = (payment: Payment) => {
//     setSelectedPaymentForEdit(payment);
//     setEditFormData({ status: payment.status ?? "unknown" });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedPaymentForEdit?._id) return;
//     setEditLoading(true);
//     try {
//       const payload = { status: editFormData.status };
//       await axios.put(
//         `/admin/payments/${selectedPaymentForEdit._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPayments((prevPayments) =>
//         prevPayments.map((p) =>
//           p._id === selectedPaymentForEdit._id
//             ? { ...p, status: editFormData.status }
//             : p
//         )
//       );
//       showToast("Payment status updated successfully!", 'success');
//       setIsEditModalOpen(false);
//       setSelectedPaymentForEdit(null);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update payment status";
//       if (axios.isAxiosError(err)) {
//         errorMessage = (err.response?.data as ApiErrorResponse)?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       console.error("Error updating payment status:", err);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const refreshData = useCallback(() => {
//     fetchPayments();
//   }, [fetchPayments]);

//   const { currentPayments, totalPages } = useMemo(() => {
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const paginatedData = filteredPayments.slice(
//       indexOfFirstPayment,
//       indexOfLastPayment
//     );
//     const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     return { currentPayments: paginatedData, totalPages: pages };
//   }, [filteredPayments, currentPage, paymentsPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0) setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, idFilter: paymentIdFilter, amountFilter,
//     }),
//     [
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, paymentIdFilter, amountFilter,
//     ]
//   );

//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false,
//     closeButton: false,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () => "p-0 shadow-none rounded-md bg-transparent w-full",
//   };

//   // Dynamic styles for ToastContainer based on screen size
//   // Updated return type to allow CSS custom properties
//   const getToastContainerStyle = (): React.CSSProperties & { [key: `--${string}`]: string | number } => {
//     const baseStyle = { // Type is inferred here, includes custom CSS properties
//       "--toastify-color-progress-light": "#adfa1d",
//       "--toastify-color-progress-dark": "#adfa1d",
//       zIndex: 99999, // Standard CSS property
//     };

//     if (isMobile) {
//       return {
//         ...baseStyle,
//         top: "1rem",    // 16px from top
//         left: "1rem",   // 16px from left
//         right: "1rem",  // 16px from right
//         width: "auto",  // Container fills space between left/right margins
//       };
//     } else { // Desktop
//       return {
//         ...baseStyle,
//         top: "0.75rem", // 12px from top
//         right: "0.75rem",// 12px from right
//         width: "320px",  // Default react-toastify width, or adjust as needed
//       };
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <ToastContainer
//         {...toastContainerProps}
//         style={getToastContainerStyle()}
//       />
//       <div className="space-y-6">
//         <div className="flex sm:flex-row flex-col justify-between items-center ">
//           <div className="flex flex-col mb-5">
//             <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Add-Money Management
//             </h1>
//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track and manage all incoming payments, statuses, and user
//               transactions in real time with full control and visibility.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center bg-primary h-12.5 px-8 py-3 cursor-pointer rounded-full sm:w-auto w-full text-neutral-900 justify-center "
//             >
//               <Filter size={18} className="mr-2" />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingPayments}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh payment data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="paymentsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="paymentsPerPage"
//               value={paymentsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredPayments.length > 0
//               ? (currentPage - 1) * paymentsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//             of {filteredPayments.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <PaymentTable
//           filteredPayments={currentPayments}
//           loadingPayments={loadingPayments}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           handleEditPayment={handleEditPayment}
//         />

//         {totalPages > 1 && !loadingPayments && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       <PaymentEditModal
//         isEditModalOpen={isEditModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         selectedPaymentForEdit={selectedPaymentForEdit}
//         editFormData={editFormData}
//         setEditFormData={setEditFormData}
//         editLoading={editLoading}
//         handleSaveEdit={handleSaveEdit}
//         statusOptions={statusOptions.filter(
//           (s) => s !== "all" && s !== "unknown"
//         )}
//       />

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User Name or Email..."
//         currencyOptions={currencyOptions}
//         statusOptions={statusOptions}
//         idFilterLabel="Payment ID"
//         idFilterPlaceholder="Filter by Payment ID"
//         showRecipientFilter={false}
//       />
//     </div>
//   );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../config/apiConfig"; // Adjust path if needed
// import {
//     Filter,
//     RefreshCw,
// } from "lucide-react";

// // Import react-toastify
// import { ToastContainer, toast, Slide, ToastContainerProps } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import components
// import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
// import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
// import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
// import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
// import Pagination from "../components/Pagination"; // Adjust path if needed
// // Assuming this path is correct for your project structure
// import CustomToast, { CustomToastProps } from "../../../app/components/CustomToast";

// // Import Shared Types
// import { Payment } from "../../../types/payment"; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//   message: string;
// }

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// // Helper to map payment status to Toast type for icon and progress bar logic
// const mapPaymentStatusToToastType = (status: string): CustomToastProps['type'] => {
//     const lowerStatus = status.toLowerCase();
//     switch (lowerStatus) {
//         case "completed":
//             return "success";
//         case "pending":
//         case "in progress":
//             return "info";
//         case "canceled": // Both "canceled" and "cancelled" will be handled
//         case "cancelled":
//         case "failed":
//             return "error";
//         case "unknown":
//             return "warning"; // Or 'default'
//         default:
//             return "default";
//     }
// };

// const AdminPaymentsPage: React.FC = () => {
//   // --- Core States ---
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//   const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//   const { token } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
//   const [amountFilter, setAmountFilter] = useState<string>("");
//   const [currencyFilter, setCurrencyFilter] = useState<string>("all");

//   // --- Edit Modal State ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//   const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
//     useState<Payment | null>(null);
//   const [editFormData, setEditFormData] = useState<{ status: string }>({
//     status: "",
//   });
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<PaymentSortField | null>("createdAt");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const statusOptions: string[] = useMemo(() => {
//     return ["all", "pending", "in progress", "completed", "canceled", "failed", "unknown"];
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback((
//     message: string,
//     type?: CustomToastProps['type']
//   ) => {
//     const effectiveType = type || 'default';
//     let progressBarColor: string;

//     // Determine progress bar color based on the effectiveType, matching icon colors
//     switch(effectiveType) {
//       case 'success':
//         progressBarColor = "#22c55e"; // text-green-500
//         break;
//       case 'error':
//         progressBarColor = "#ef4444"; // text-red-500
//         break;
//       case 'info':
//         progressBarColor = "#3b82f6"; // text-blue-500
//         break;
//       case 'warning':
//         progressBarColor = "#eab308"; // text-yellow-500
//         break;
//       case 'default':
//       default:
//         progressBarColor = "#6b7280"; // text-gray-500
//         break;
//     }

//     document.documentElement.style.setProperty('--toastify-color-progress-light', progressBarColor);
//     // If you specifically use a dark theme for ToastContainer (e.g., theme="dark"),
//     // you would also set --toastify-color-progress-dark
//     // document.documentElement.style.setProperty('--toastify-color-progress-dark', progressBarColor);

//     toast(<CustomToast message={message} type={effectiveType} />, {
//       // We no longer use progressStyle here, as CSS variables are more reliable
//     });
//   }, []);

//   // --- Mobile Detection State ---
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const fetchPayments = useCallback(async () => {
//     setLoadingPayments(true);
//     setIsRefreshing(true);
//     try {
//       const response = await axios.get<{ data: Payment[] } | Payment[]>(
//         "/admin/payments",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       let paymentData: Payment[] = [];
//       if (response.data && Array.isArray((response.data as any).data)) {
//         paymentData = (response.data as any).data;
//       } else if (Array.isArray(response.data)) {
//         paymentData = response.data;
//       } else {
//         console.warn("API response format unexpected:", response.data);
//         paymentData = [];
//       }
//       const validatedData = paymentData
//         .filter((p) => p && typeof p === "object")
//         .map((p) => ({
//           ...p,
//           _id: String(p._id ?? ""),
//           amountToAdd: String(p.amountToAdd ?? ""),
//           status: p.status && statusOptions.includes(p.status) ? p.status : "unknown",
//           createdAt: p.createdAt || new Date(0).toISOString(),
//           user: p.user && typeof p.user === "object" ? { ...p.user, fullName: String(p.user.fullName ?? "N/A"), email: String(p.user.email ?? "N/A"), } : { fullName: "N/A", email: "N/A" },
//           payInCurrency: p.payInCurrency && typeof p.payInCurrency === "object" ? { ...p.payInCurrency, code: String(p.payInCurrency.code ?? "N/A"), } : { code: "N/A" },
//           referenceCode: String(p.referenceCode ?? ""),
//         }));
//       setPayments(validatedData);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load payments";
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorResponse>;
//         errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       setPayments([]);
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoadingPayments(false);
//       setIsRefreshing(false);
//     }
//   }, [token, statusOptions, showToast]);

//   useEffect(() => {
//     if (token) {
//       fetchPayments();
//     } else {
//       showToast("Authentication token not found. Please log in.", 'error');
//       setLoadingPayments(false);
//       setPayments([]);
//     }
//   }, [token, fetchPayments, showToast]);

//   useEffect(() => {
//     let results: Payment[] = [...payments];
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (payment) =>
//           payment._id.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (paymentIdFilter) {
//       results = results.filter((payment) =>
//         payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//       );
//     }
//     if (amountFilter) {
//       const amount = parseFloat(amountFilter);
//       if (!isNaN(amount)) {
//         results = results.filter((payment) => {
//           const paymentAmount = parseFloat(payment.amountToAdd);
//           return !isNaN(paymentAmount) && paymentAmount === amount;
//         });
//       }
//     }
//     if (currencyFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.payInCurrency?.code === currencyFilter
//       );
//     }
//     if (statusFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//         } catch { return false; }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//         } catch { return false; }
//       });
//     }
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         const getSafeValue = (obj: any, path: string) =>
//           path.split(".").reduce((acc, part) => acc && acc[part], obj);

//         switch (sortField) {
//           case "user": valueA = a.user?.fullName?.toLowerCase() || ""; valueB = b.user?.fullName?.toLowerCase() || ""; break;
//           case "amount": valueA = parseFloat(a.amountToAdd) || 0; valueB = parseFloat(b.amountToAdd) || 0; break;
//           case "createdAt": valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0; valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0; if (isNaN(valueA)) valueA = 0; if (isNaN(valueB)) valueB = 0; break;
//           case "_id": valueA = (a._id ?? "").toLowerCase(); valueB = (b._id ?? "").toLowerCase(); break;
//           case "status": valueA = (a.status ?? "").toLowerCase(); valueB = (b.status ?? "").toLowerCase(); break;
//           default: valueA = getSafeValue(a, sortField); valueB = getSafeValue(b, sortField); if (typeof valueA === "string") valueA = valueA.toLowerCase(); if (typeof valueB === "string") valueB = valueB.toLowerCase(); break;
//         }
//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     setFilteredPayments(results);
//   }, [
//     payments, searchTerm, statusFilter, fromDate, toDate,
//     paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm, statusFilter, fromDate, toDate, paymentIdFilter,
//     amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setPaymentIdFilter(filters.idFilter);
//     setAmountFilter(filters.amountFilter);
//     setCurrencyFilter(filters.currencyFilter);
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentIdFilter("");
//     setAmountFilter("");
//     setCurrencyFilter("all");
//   }, []);

//   const handlePageSizeChange = (size: number) => {
//     setPaymentsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleSort = (field: PaymentSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case "completed": return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "pending": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "in progress": return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "canceled": case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//       case "failed": return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//       default: return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   const currencyOptions = useMemo(() => {
//     const codes = new Set(
//       payments
//         .map((p) => p.payInCurrency?.code)
//         .filter((code): code is string => Boolean(code) && code !== "N/A")
//     );
//     return ["all", ...Array.from(codes).sort()];
//   }, [payments]);

//   const handleEditPayment = (payment: Payment) => {
//     setSelectedPaymentForEdit(payment);
//     setEditFormData({ status: payment.status ?? "unknown" });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedPaymentForEdit?._id) return;
//     setEditLoading(true);
//     const newStatus = editFormData.status;
//     try {
//       const payload = { status: newStatus };
//       await axios.put(
//         `/admin/payments/${selectedPaymentForEdit._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPayments((prevPayments) =>
//         prevPayments.map((p) =>
//           p._id === selectedPaymentForEdit._id
//             ? { ...p, status: newStatus }
//             : p
//         )
//       );

//       const toastTypeForStatus = mapPaymentStatusToToastType(newStatus);
//       showToast(
//         `Payment status updated to "${newStatus}" successfully!`,
//         toastTypeForStatus
//       );

//       setIsEditModalOpen(false);
//       setSelectedPaymentForEdit(null);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update payment status";
//       if (axios.isAxiosError(err)) {
//         errorMessage = (err.response?.data as ApiErrorResponse)?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       console.error("Error updating payment status:", err);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const refreshData = useCallback(() => {
//     fetchPayments();
//   }, [fetchPayments]);

//   const { currentPayments, totalPages } = useMemo(() => {
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const paginatedData = filteredPayments.slice(
//       indexOfFirstPayment,
//       indexOfLastPayment
//     );
//     const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     return { currentPayments: paginatedData, totalPages: pages };
//   }, [filteredPayments, currentPage, paymentsPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0) setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, idFilter: paymentIdFilter, amountFilter,
//     }),
//     [
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, paymentIdFilter, amountFilter,
//     ]
//   );

//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false,
//     closeButton: false,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () => "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
//   };

//   const getToastContainerStyle = (): React.CSSProperties & { [key: `--${string}`]: string | number } => {
//     const baseStyle = {
//       zIndex: 99999,
//     };

//     if (isMobile) {
//       return {
//         ...baseStyle,
//         top: "1rem",
//         left: "1rem",
//         right: "1rem",
//         width: "auto",
//       };
//     } else {
//       return {
//         ...baseStyle,
//         top: "0.75rem",
//         right: "0.75rem",
//         width: "320px",
//       };
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <ToastContainer
//         {...toastContainerProps}
//         style={getToastContainerStyle()}
//       />
//       <div className="space-y-6">
//         <div className="flex sm:flex-row flex-col justify-between items-center ">
//           <div className="flex flex-col mb-5">
//             <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Add-Money Management
//             </h1>
//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track and manage all incoming payments, statuses, and user
//               transactions in real time with full control and visibility.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center bg-primary h-12.5 px-8 py-3 cursor-pointer rounded-full sm:w-auto w-full text-neutral-900 justify-center "
//             >
//               <Filter size={18} className="mr-2" />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingPayments}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh payment data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="paymentsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="paymentsPerPage"
//               value={paymentsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredPayments.length > 0
//               ? (currentPage - 1) * paymentsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//             of {filteredPayments.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <PaymentTable
//           filteredPayments={currentPayments}
//           loadingPayments={loadingPayments}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           handleEditPayment={handleEditPayment}
//         />

//         {totalPages > 1 && !loadingPayments && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       <PaymentEditModal
//         isEditModalOpen={isEditModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         selectedPaymentForEdit={selectedPaymentForEdit}
//         editFormData={editFormData}
//         setEditFormData={setEditFormData}
//         editLoading={editLoading}
//         handleSaveEdit={handleSaveEdit}
//         statusOptions={statusOptions.filter(
//           (s) => s !== "all" && s !== "unknown"
//         )}
//       />

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User Name or Email..."
//         currencyOptions={currencyOptions}
//         statusOptions={statusOptions}
//         idFilterLabel="Payment ID"
//         idFilterPlaceholder="Filter by Payment ID"
//         showRecipientFilter={false}
//       />
//     </div>
//   );
// };

// export default AdminPaymentsPage;

// // New Latest code
// // frontend/src/app/admin/payments/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../config/apiConfig"; // Adjust path if needed
// import {
//     Filter,
//     RefreshCw,
// } from "lucide-react";

// // Import react-toastify
// import { ToastContainer, toast, Slide, ToastContainerProps, TypeOptions } from 'react-toastify'; // Added TypeOptions
// import 'react-toastify/dist/ReactToastify.css';

// // Import components
// import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
// import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
// import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
// import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
// import Pagination from "../components/Pagination"; // Adjust path if needed
// // Assuming this path is correct for your project structure
// import CustomToast, { CustomToastProps } from "../../../app/components/CustomToast";

// // Import Shared Types
// import { Payment } from "../../../types/payment"; // Adjust path as needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//   message: string;
// }

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// // Helper to map payment status to Toast type for icon and progress bar logic
// const mapPaymentStatusToToastType = (status: string): CustomToastProps['type'] => {
//     const lowerStatus = status.toLowerCase();
//     switch (lowerStatus) {
//         case "completed":
//             return "success";
//         case "pending":
//         case "in progress":
//             return "info";
//         case "canceled": // Both "canceled" and "cancelled" will be handled
//         case "cancelled":
//         case "failed":
//             return "error";
//         case "unknown":
//             return "warning"; // Or 'default'
//         default:
//             return "default";
//     }
// };

// const AdminPaymentsPage: React.FC = () => {
//   // --- Core States ---
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//   const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//   const { token } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
//   const [amountFilter, setAmountFilter] = useState<string>("");
//   const [currencyFilter, setCurrencyFilter] = useState<string>("all");

//   // --- Edit Modal State ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//   const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
//     useState<Payment | null>(null);
//   const [editFormData, setEditFormData] = useState<{ status: string }>({
//     status: "",
//   });
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<PaymentSortField | null>("createdAt");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const statusOptions: string[] = useMemo(() => {
//     return ["all", "pending", "in progress", "completed", "canceled", "failed", "unknown"];
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback((
//     message: string,
//     type?: CustomToastProps['type']
//   ) => {
//     const effectiveType = type || 'default';
//     let progressClassName: string;
//     // Map CustomToastProps['type'] to react-toastify's TypeOptions for consistency if needed,
//     // though for progressClassName we are defining custom classes.
//     // The `type` prop for CustomToast primarily drives its internal icon and color.
//     // react-toastify also has a `type` option which can set default styling if not overridden.

//     switch(effectiveType) {
//       case 'success':
//         progressClassName = "toast-progress-success";
//         break;
//       case 'error':
//         progressClassName = "toast-progress-error";
//         break;
//       case 'info':
//         progressClassName = "toast-progress-info";
//         break;
//       case 'warning':
//         progressClassName = "toast-progress-warning";
//         break;
//       case 'default':
//       default:
//         progressClassName = "toast-progress-default";
//         break;
//     }

//     // The `type` option for react-toastify itself could also be set here
//     // if you want its built-in themes to align, e.g. type: effectiveType as TypeOptions
//     // However, CustomToast already handles its appearance, and we're styling the progress bar.
//     toast(<CustomToast message={message} type={effectiveType} />, {
//       progressClassName: progressClassName,
//       // type: effectiveType as TypeOptions, // Optional: if you want react-toastify's themes too
//     });
//   }, []);

//   // --- Mobile Detection State ---
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const fetchPayments = useCallback(async () => {
//     setLoadingPayments(true);
//     setIsRefreshing(true);
//     try {
//       const response = await axios.get<{ data: Payment[] } | Payment[]>(
//         "/admin/payments",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       let paymentData: Payment[] = [];
//       if (response.data && Array.isArray((response.data as any).data)) {
//         paymentData = (response.data as any).data;
//       } else if (Array.isArray(response.data)) {
//         paymentData = response.data;
//       } else {
//         console.warn("API response format unexpected:", response.data);
//         paymentData = [];
//       }
//       const validatedData = paymentData
//         .filter((p) => p && typeof p === "object")
//         .map((p) => ({
//           ...p,
//           _id: String(p._id ?? ""),
//           amountToAdd: String(p.amountToAdd ?? ""),
//           status: p.status && statusOptions.includes(p.status) ? p.status : "unknown",
//           createdAt: p.createdAt || new Date(0).toISOString(),
//           user: p.user && typeof p.user === "object" ? { ...p.user, fullName: String(p.user.fullName ?? "N/A"), email: String(p.user.email ?? "N/A"), } : { fullName: "N/A", email: "N/A" },
//           payInCurrency: p.payInCurrency && typeof p.payInCurrency === "object" ? { ...p.payInCurrency, code: String(p.payInCurrency.code ?? "N/A"), } : { code: "N/A" },
//           referenceCode: String(p.referenceCode ?? ""),
//         }));
//       setPayments(validatedData);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load payments";
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorResponse>;
//         errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       setPayments([]);
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoadingPayments(false);
//       setIsRefreshing(false);
//     }
//   }, [token, statusOptions, showToast]);

//   useEffect(() => {
//     if (token) {
//       fetchPayments();
//     } else {
//       showToast("Authentication token not found. Please log in.", 'error');
//       setLoadingPayments(false);
//       setPayments([]);
//     }
//   }, [token, fetchPayments, showToast]);

//   useEffect(() => {
//     let results: Payment[] = [...payments];
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (payment) =>
//           payment._id.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (paymentIdFilter) {
//       results = results.filter((payment) =>
//         payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//       );
//     }
//     if (amountFilter) {
//       const amount = parseFloat(amountFilter);
//       if (!isNaN(amount)) {
//         results = results.filter((payment) => {
//           const paymentAmount = parseFloat(payment.amountToAdd);
//           return !isNaN(paymentAmount) && paymentAmount === amount;
//         });
//       }
//     }
//     if (currencyFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.payInCurrency?.code === currencyFilter
//       );
//     }
//     if (statusFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//         } catch { return false; }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//         } catch { return false; }
//       });
//     }
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         const getSafeValue = (obj: any, path: string) =>
//           path.split(".").reduce((acc, part) => acc && acc[part], obj);

//         switch (sortField) {
//           case "user": valueA = a.user?.fullName?.toLowerCase() || ""; valueB = b.user?.fullName?.toLowerCase() || ""; break;
//           case "amount": valueA = parseFloat(a.amountToAdd) || 0; valueB = parseFloat(b.amountToAdd) || 0; break;
//           case "createdAt": valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0; valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0; if (isNaN(valueA)) valueA = 0; if (isNaN(valueB)) valueB = 0; break;
//           case "_id": valueA = (a._id ?? "").toLowerCase(); valueB = (b._id ?? "").toLowerCase(); break;
//           case "status": valueA = (a.status ?? "").toLowerCase(); valueB = (b.status ?? "").toLowerCase(); break;
//           default: valueA = getSafeValue(a, sortField); valueB = getSafeValue(b, sortField); if (typeof valueA === "string") valueA = valueA.toLowerCase(); if (typeof valueB === "string") valueB = valueB.toLowerCase(); break;
//         }
//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     setFilteredPayments(results);
//   }, [
//     payments, searchTerm, statusFilter, fromDate, toDate,
//     paymentIdFilter, amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm, statusFilter, fromDate, toDate, paymentIdFilter,
//     amountFilter, currencyFilter, sortField, sortDirection,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setPaymentIdFilter(filters.idFilter);
//     setAmountFilter(filters.amountFilter);
//     setCurrencyFilter(filters.currencyFilter);
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentIdFilter("");
//     setAmountFilter("");
//     setCurrencyFilter("all");
//   }, []);

//   const handlePageSizeChange = (size: number) => {
//     setPaymentsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleSort = (field: PaymentSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case "completed": return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "pending": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "in progress": return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "canceled": case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//       case "failed": return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//       default: return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   const currencyOptions = useMemo(() => {
//     const codes = new Set(
//       payments
//         .map((p) => p.payInCurrency?.code)
//         .filter((code): code is string => Boolean(code) && code !== "N/A")
//     );
//     return ["all", ...Array.from(codes).sort()];
//   }, [payments]);

//   const handleEditPayment = (payment: Payment) => {
//     setSelectedPaymentForEdit(payment);
//     setEditFormData({ status: payment.status ?? "unknown" });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedPaymentForEdit?._id) return;
//     setEditLoading(true);
//     const newStatus = editFormData.status;
//     try {
//       const payload = { status: newStatus };
//       await axios.put(
//         `/admin/payments/${selectedPaymentForEdit._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPayments((prevPayments) =>
//         prevPayments.map((p) =>
//           p._id === selectedPaymentForEdit._id
//             ? { ...p, status: newStatus }
//             : p
//         )
//       );

//       const toastTypeForStatus = mapPaymentStatusToToastType(newStatus);
//       showToast(
//         `Payment status updated to "${newStatus}" successfully!`,
//         toastTypeForStatus
//       );

//       setIsEditModalOpen(false);
//       setSelectedPaymentForEdit(null);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update payment status";
//       if (axios.isAxiosError(err)) {
//         errorMessage = (err.response?.data as ApiErrorResponse)?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, 'error');
//       console.error("Error updating payment status:", err);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const refreshData = useCallback(() => {
//     fetchPayments();
//   }, [fetchPayments]);

//   const { currentPayments, totalPages } = useMemo(() => {
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const paginatedData = filteredPayments.slice(
//       indexOfFirstPayment,
//       indexOfLastPayment
//     );
//     const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     return { currentPayments: paginatedData, totalPages: pages };
//   }, [filteredPayments, currentPage, paymentsPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0) setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, idFilter: paymentIdFilter, amountFilter,
//     }),
//     [
//       searchTerm, fromDate, toDate, statusFilter,
//       currencyFilter, paymentIdFilter, amountFilter,
//     ]
//   );

//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false,
//     closeButton: false,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () => "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
//   };

//   const getToastContainerStyle = (): React.CSSProperties & { [key: `--${string}`]: string | number } => {
//     const baseStyle = {
//       zIndex: 99999,
//     };

//     if (isMobile) {
//       return {
//         ...baseStyle,
//         top: "1rem",
//         left: "1rem",
//         right: "1rem",
//         width: "auto",
//       };
//     } else {
//       return {
//         ...baseStyle,
//         top: "0.75rem",
//         right: "0.75rem",
//         width: "320px",
//       };
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <ToastContainer
//         {...toastContainerProps}
//         style={getToastContainerStyle()}
//       />
//       <div className="space-y-6">
//         <div className="flex sm:flex-row flex-col justify-between items-center ">
//           <div className="flex flex-col mb-5">
//             <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Add-Money Management
//             </h1>
//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track and manage all incoming payments, statuses, and user
//               transactions in real time with full control and visibility.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center bg-primary h-12.5 px-8 py-3 cursor-pointer rounded-full sm:w-auto w-full text-neutral-900 justify-center "
//             >
//               <Filter size={18} className="mr-2" />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingPayments}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh payment data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="paymentsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="paymentsPerPage"
//               value={paymentsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredPayments.length > 0
//               ? (currentPage - 1) * paymentsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//             of {filteredPayments.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <PaymentTable
//           filteredPayments={currentPayments}
//           loadingPayments={loadingPayments}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           handleEditPayment={handleEditPayment}
//         />

//         {totalPages > 1 && !loadingPayments && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       <PaymentEditModal
//         isEditModalOpen={isEditModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         selectedPaymentForEdit={selectedPaymentForEdit}
//         editFormData={editFormData}
//         setEditFormData={setEditFormData}
//         editLoading={editLoading}
//         handleSaveEdit={handleSaveEdit}
//         statusOptions={statusOptions.filter(
//           (s) => s !== "all" && s !== "unknown"
//         )}
//       />

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User Name or Email..."
//         currencyOptions={currencyOptions}
//         statusOptions={statusOptions}
//         idFilterLabel="Payment ID"
//         idFilterPlaceholder="Filter by Payment ID"
//         showRecipientFilter={false}
//       />
//     </div>
//   );
// };

// export default AdminPaymentsPage;

// // frontend/src/app/admin/payments/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../config/apiConfig"; // Adjust path if needed
// import { Filter, RefreshCw } from "lucide-react";

// // Import react-toastify
// import {
//   ToastContainer,
//   toast,
//   Slide,
//   ToastContainerProps,
//   TypeOptions,
// } from "react-toastify"; // Added TypeOptions
// import "react-toastify/dist/ReactToastify.css";

// // Import components
// import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
// import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
// import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
// import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
// import Pagination from "../components/Pagination"; // Adjust path if needed
// // Assuming this path is correct for your project structure
// import CustomToast, {
//   CustomToastProps,
// } from "../../../app/components/CustomToast";

// // Import Shared Types
// import { Payment } from "../../../types/payment"; // Adjust path as needed
// import { FaCoins } from "react-icons/fa";
// import { TbMoneybag } from "react-icons/tb";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface ApiErrorResponse {
//   message: string;
// }

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// // Helper to map payment status to Toast type for icon and progress bar logic
// const mapPaymentStatusToToastType = (
//   status: string
// ): CustomToastProps["type"] => {
//   const lowerStatus = status.toLowerCase();
//   switch (lowerStatus) {
//     case "completed":
//       return "success";
//     case "pending":
//     case "in progress":
//       return "info";
//     case "canceled": // Both "canceled" and "cancelled" will be handled
//     case "cancelled":
//     case "failed":
//       return "error";
//     case "unknown":
//       return "warning"; // Or 'default'
//     default:
//       return "default";
//   }
// };

// const AdminPaymentsPage: React.FC = () => {
//   // --- Core States ---
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
//   const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
//   const { token } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
//   const [amountFilter, setAmountFilter] = useState<string>("");
//   const [currencyFilter, setCurrencyFilter] = useState<string>("all");

//   // --- Edit Modal State ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
//   const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
//     useState<Payment | null>(null);
//   const [editFormData, setEditFormData] = useState<{ status: string }>({
//     status: "",
//   });
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<PaymentSortField | null>(
//     "createdAt"
//   );
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const statusOptions: string[] = useMemo(() => {
//     return [
//       "all",
//       "pending",
//       "in progress",
//       "completed",
//       "canceled",
//       "failed",
//       "unknown",
//     ];
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback(
//     (message: string, type?: CustomToastProps["type"]) => {
//       const effectiveType = type || "default";
//       let progressClassName: string;
//       // Map CustomToastProps['type'] to react-toastify's TypeOptions for consistency if needed,
//       // though for progressClassName we are defining custom classes.
//       // The `type` prop for CustomToast primarily drives its internal icon and color.
//       // react-toastify also has a `type` option which can set default styling if not overridden.

//       switch (effectiveType) {
//         case "success":
//           progressClassName = "toast-progress-success";
//           break;
//         case "error":
//           progressClassName = "toast-progress-error";
//           break;
//         case "info":
//           progressClassName = "toast-progress-info";
//           break;
//         case "warning":
//           progressClassName = "toast-progress-warning";
//           break;
//         case "default":
//         default:
//           progressClassName = "toast-progress-default";
//           break;
//       }

//       // The `type` option for react-toastify itself could also be set here
//       // if you want its built-in themes to align, e.g. type: effectiveType as TypeOptions
//       // However, CustomToast already handles its appearance, and we're styling the progress bar.
//       toast(<CustomToast message={message} type={effectiveType} />, {
//         progressClassName: progressClassName,
//         type: effectiveType as TypeOptions,
//         icon: false, // MODIFIED: Pass type to react-toastify
//       });
//     },
//     []
//   );

//   // --- Mobile Detection State ---
//   const [isMobile, setIsMobile] = useState(false);

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

//   const fetchPayments = useCallback(async () => {
//     setLoadingPayments(true);
//     setIsRefreshing(true);
//     try {
//       const response = await axios.get<{ data: Payment[] } | Payment[]>(
//         "/admin/payments",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       let paymentData: Payment[] = [];
//       if (response.data && Array.isArray((response.data as any).data)) {
//         paymentData = (response.data as any).data;
//       } else if (Array.isArray(response.data)) {
//         paymentData = response.data;
//       } else {
//         console.warn("API response format unexpected:", response.data);
//         paymentData = [];
//       }
//       const validatedData = paymentData
//         .filter((p) => p && typeof p === "object")
//         .map((p) => ({
//           ...p,
//           _id: String(p._id ?? ""),
//           amountToAdd: String(p.amountToAdd ?? ""),
//           status:
//             p.status && statusOptions.includes(p.status) ? p.status : "unknown",
//           createdAt: p.createdAt || new Date(0).toISOString(),
//           user:
//             p.user && typeof p.user === "object"
//               ? {
//                   ...p.user,
//                   fullName: String(p.user.fullName ?? "N/A"),
//                   email: String(p.user.email ?? "N/A"),
//                 }
//               : { fullName: "N/A", email: "N/A" },
//           payInCurrency:
//             p.payInCurrency && typeof p.payInCurrency === "object"
//               ? {
//                   ...p.payInCurrency,
//                   code: String(p.payInCurrency.code ?? "N/A"),
//                 }
//               : { code: "N/A" },
//           referenceCode: String(p.referenceCode ?? ""),
//         }));
//       setPayments(validatedData);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to load payments";
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorResponse>;
//         errorMessage =
//           axiosError.response?.data?.message ||
//           axiosError.message ||
//           errorMessage;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, "error");
//       setPayments([]);
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoadingPayments(false);
//       setIsRefreshing(false);
//     }
//   }, [token, statusOptions, showToast]);

//   useEffect(() => {
//     if (token) {
//       fetchPayments();
//     } else {
//       showToast("Authentication token not found. Please log in.", "error");
//       setLoadingPayments(false);
//       setPayments([]);
//     }
//   }, [token, fetchPayments, showToast]);

//   useEffect(() => {
//     let results: Payment[] = [...payments];
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (payment) =>
//           payment._id.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//           payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (paymentIdFilter) {
//       results = results.filter((payment) =>
//         payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
//       );
//     }
//     if (amountFilter) {
//       const amount = parseFloat(amountFilter);
//       if (!isNaN(amount)) {
//         results = results.filter((payment) => {
//           const paymentAmount = parseFloat(payment.amountToAdd);
//           return !isNaN(paymentAmount) && paymentAmount === amount;
//         });
//       }
//     }
//     if (currencyFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.payInCurrency?.code === currencyFilter
//       );
//     }
//     if (statusFilter !== "all") {
//       results = results.filter(
//         (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((payment) => {
//         try {
//           const paymentDate = new Date(payment.createdAt);
//           return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         const getSafeValue = (obj: any, path: string) =>
//           path.split(".").reduce((acc, part) => acc && acc[part], obj);

//         switch (sortField) {
//           case "user":
//             valueA = a.user?.fullName?.toLowerCase() || "";
//             valueB = b.user?.fullName?.toLowerCase() || "";
//             break;
//           case "amount":
//             valueA = parseFloat(a.amountToAdd) || 0;
//             valueB = parseFloat(b.amountToAdd) || 0;
//             break;
//           case "createdAt":
//             valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//             valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//             if (isNaN(valueA)) valueA = 0;
//             if (isNaN(valueB)) valueB = 0;
//             break;
//           case "_id":
//             valueA = (a._id ?? "").toLowerCase();
//             valueB = (b._id ?? "").toLowerCase();
//             break;
//           case "status":
//             valueA = (a.status ?? "").toLowerCase();
//             valueB = (b.status ?? "").toLowerCase();
//             break;
//           default:
//             valueA = getSafeValue(a, sortField);
//             valueB = getSafeValue(b, sortField);
//             if (typeof valueA === "string") valueA = valueA.toLowerCase();
//             if (typeof valueB === "string") valueB = valueB.toLowerCase();
//             break;
//         }
//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     setFilteredPayments(results);
//   }, [
//     payments,
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     paymentIdFilter,
//     amountFilter,
//     currencyFilter,
//     sortField,
//     sortDirection,
//   ]);

//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     paymentIdFilter,
//     amountFilter,
//     currencyFilter,
//     sortField,
//     sortDirection,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setPaymentIdFilter(filters.idFilter);
//     setAmountFilter(filters.amountFilter);
//     setCurrencyFilter(filters.currencyFilter);
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentIdFilter("");
//     setAmountFilter("");
//     setCurrencyFilter("all");
//   }, []);

//   const handlePageSizeChange = (size: number) => {
//     setPaymentsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleSort = (field: PaymentSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//       case "pending":
//         return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//       case "in progress":
//         return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//       case "canceled":
//       case "cancelled":
//         return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//       case "failed":
//         return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//       default:
//         return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//     }
//   };

//   const currencyOptions = useMemo(() => {
//     const codes = new Set(
//       payments
//         .map((p) => p.payInCurrency?.code)
//         .filter((code): code is string => Boolean(code) && code !== "N/A")
//     );
//     return ["all", ...Array.from(codes).sort()];
//   }, [payments]);

//   const handleEditPayment = (payment: Payment) => {
//     setSelectedPaymentForEdit(payment);
//     setEditFormData({ status: payment.status ?? "unknown" });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedPaymentForEdit?._id) return;
//     setEditLoading(true);
//     const newStatus = editFormData.status;
//     try {
//       const payload = { status: newStatus };
//       await axios.put(
//         `/admin/payments/${selectedPaymentForEdit._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPayments((prevPayments) =>
//         prevPayments.map((p) =>
//           p._id === selectedPaymentForEdit._id ? { ...p, status: newStatus } : p
//         )
//       );

//       const toastTypeForStatus = mapPaymentStatusToToastType(newStatus);
//       showToast(
//         `Payment status updated to "${newStatus}" successfully!`,
//         toastTypeForStatus
//       );

//       setIsEditModalOpen(false);
//       setSelectedPaymentForEdit(null);
//     } catch (err: unknown) {
//       let errorMessage = "Failed to update payment status";
//       if (axios.isAxiosError(err)) {
//         errorMessage =
//           (err.response?.data as ApiErrorResponse)?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       showToast(errorMessage, "error");
//       console.error("Error updating payment status:", err);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const refreshData = useCallback(() => {
//     fetchPayments();
//   }, [fetchPayments]);

//   const { currentPayments, totalPages } = useMemo(() => {
//     const indexOfLastPayment = currentPage * paymentsPerPage;
//     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//     const paginatedData = filteredPayments.slice(
//       indexOfFirstPayment,
//       indexOfLastPayment
//     );
//     const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
//     return { currentPayments: paginatedData, totalPages: pages };
//   }, [filteredPayments, currentPage, paymentsPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0)
//       setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter,
//       currencyFilter,
//       idFilter: paymentIdFilter,
//       amountFilter,
//     }),
//     [
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter,
//       currencyFilter,
//       paymentIdFilter,
//       amountFilter,
//     ]
//   );

//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false,
//     closeButton: false,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () =>
//       "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
//   };

//   const getToastContainerStyle = (): React.CSSProperties & {
//     [key: `--${string}`]: string | number;
//   } => {
//     const baseStyle = {
//       zIndex: 30,
//     };

//     if (isMobile) {
//       return {
//         ...baseStyle,
//         top: "1rem",
//         left: "1rem",
//         right: "1rem",
//         width: "auto",
//       };
//     } else {
//       return {
//         ...baseStyle,
//         top: "0.75rem",
//         right: "0.75rem",
//         width: "320px",
//       };
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <ToastContainer
//         {...toastContainerProps}
//         style={getToastContainerStyle()}
//       />
//       <div className="space-y-6">
//         <div className="flex sm:flex-row flex-col justify-between items-center gap-3">
//           <div className="Add-Money">
//             <div className="flex items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//                 <TbMoneybag className="size-6 text-mainheading dark:text-primary" />
//               </div>

//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//                 Add-Money Management
//               </h1>
//             </div>

//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track and manage all incoming payments, statuses, and user
//               transactions in real time with full control and visibility.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center bg-primary h-12.5 px-8 py-3 cursor-pointer rounded-full sm:w-auto w-full text-neutral-900 justify-center "
//             >
//               <Filter size={18} className="mr-2" />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingPayments}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh payment data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="paymentsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="paymentsPerPage"
//               value={paymentsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredPayments.length > 0
//               ? (currentPage - 1) * paymentsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
//             of {filteredPayments.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <PaymentTable
//           filteredPayments={currentPayments}
//           loadingPayments={loadingPayments}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           handleEditPayment={handleEditPayment}
//         />

//         {totalPages > 1 && !loadingPayments && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       <PaymentEditModal
//         isEditModalOpen={isEditModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         selectedPaymentForEdit={selectedPaymentForEdit}
//         editFormData={editFormData}
//         setEditFormData={setEditFormData}
//         editLoading={editLoading}
//         handleSaveEdit={handleSaveEdit}
//         statusOptions={statusOptions.filter(
//           (s) => s !== "all" && s !== "unknown"
//         )}
//       />

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User Name or Email..."
//         currencyOptions={currencyOptions}
//         statusOptions={statusOptions}
//         idFilterLabel="Payment ID"
//         idFilterPlaceholder="Filter by Payment ID"
//         showRecipientFilter={false}
//       />
//     </div>
//   );
// };

// export default AdminPaymentsPage;

// frontend/src/app/admin/payments/page.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
import axios, { AxiosError } from "axios";
import apiConfig from "../../config/apiConfig"; // Adjust path if needed
import { Filter, RefreshCw } from "lucide-react";

// Import react-toastify
import {
  ToastContainer,
  toast,
  Slide,
  ToastContainerProps,
  TypeOptions,
} from "react-toastify"; // Added TypeOptions
import "react-toastify/dist/ReactToastify.css";

// Import components
import PaymentTable from "../components/add-money/PaymentTable"; // Adjust path if needed
import { PaymentSortField } from "../components/add-money/PaymentTableHeader";
import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
import PaymentEditModal from "../components/add-money/PaymentEditModal"; // Adjust path if needed
import Pagination from "../components/Pagination"; // Adjust path if needed
// Assuming this path is correct for your project structure
import CustomToast, {
  CustomToastProps,
} from "../../../app/components/CustomToast";

// Import Shared Types
import { Payment } from "../../../types/payment"; // Adjust path as needed
import { FaCoins } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";

axios.defaults.baseURL = apiConfig.baseUrl;

interface ApiErrorResponse {
  message: string;
}

// Helper function to parse date string (dd-MM-yyyy) to Date object
function parseDateString(dateString: string): Date | null {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length === 3) {
    if (
      !/^\d+$/.test(parts[0]) ||
      !/^\d+$/.test(parts[1]) ||
      !/^\d+$/.test(parts[2])
    ) {
      return null;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (
      day < 1 ||
      day > 31 ||
      month < 0 ||
      month > 11 ||
      year < 1900 ||
      year > 3000
    ) {
      return null;
    }
    const date = new Date(Date.UTC(year, month, day));
    if (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month &&
      date.getUTCDate() === day
    ) {
      return date;
    } else {
      return null;
    }
  }
  return null;
}

// Helper to map payment status to Toast type for icon and progress bar logic
const mapPaymentStatusToToastType = (
  status: string
): CustomToastProps["type"] => {
  const lowerStatus = status.toLowerCase();
  switch (lowerStatus) {
    case "completed":
      return "success";
    case "pending":
    case "in progress":
      return "info";
    case "canceled": // Both "canceled" and "cancelled" will be handled
    case "cancelled":
    case "failed":
      return "error";
    case "unknown":
      return "warning"; // Or 'default'
    default:
      return "default";
  }
};

const AdminPaymentsPage: React.FC = () => {
  // --- Core States ---
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState<boolean>(true);
  const { token } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // --- Filter States ---
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentIdFilter, setPaymentIdFilter] = useState<string>("");
  const [amountFilter, setAmountFilter] = useState<string>("");
  const [currencyFilter, setCurrencyFilter] = useState<string>("all");

  // --- Edit Modal State ---
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedPaymentForEdit, setSelectedPaymentForEdit] =
    useState<Payment | null>(null);
  const [editFormData, setEditFormData] = useState<{ status: string }>({
    status: "",
  });
  const [editLoading, setEditLoading] = useState<boolean>(false);

  // --- Sorting State ---
  const [sortField, setSortField] = useState<PaymentSortField | null>(
    "createdAt"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState<number>(10);
  const pageSizeOptions: number[] = [10, 25, 50];

  const statusOptions: string[] = useMemo(() => {
    return [
      "all",
      "pending",
      "in progress",
      "completed",
      "canceled",
      "failed",
      "unknown",
    ];
  }, []);

  // --- Custom Toast Invocation ---
  const showToast = useCallback(
    (message: string, type?: CustomToastProps["type"]) => {
      const effectiveType = type || "default";
      let progressClassName: string;
      // Map CustomToastProps['type'] to react-toastify's TypeOptions for consistency if needed,
      // though for progressClassName we are defining custom classes.
      // The `type` prop for CustomToast primarily drives its internal icon and color.
      // react-toastify also has a `type` option which can set default styling if not overridden.

      switch (effectiveType) {
        case "success":
          progressClassName = "toast-progress-success";
          break;
        case "error":
          progressClassName = "toast-progress-error";
          break;
        case "info":
          progressClassName = "toast-progress-info";
          break;
        case "warning":
          progressClassName = "toast-progress-warning";
          break;
        case "default":
        default:
          progressClassName = "toast-progress-default";
          break;
      }

      // The `type` option for react-toastify itself could also be set here
      // if you want its built-in themes to align, e.g. type: effectiveType as TypeOptions
      // However, CustomToast already handles its appearance, and we're styling the progress bar.
      toast(<CustomToast message={message} type={effectiveType} />, {
        progressClassName: progressClassName,
        type: effectiveType as TypeOptions,
        icon: false, // MODIFIED: Pass type to react-toastify
      });
    },
    []
  );

  // --- Mobile Detection State ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchPayments = useCallback(async () => {
    setLoadingPayments(true);
    setIsRefreshing(true);
    try {
      const response = await axios.get<{ data: Payment[] } | Payment[]>(
        "/admin/payments",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let paymentData: Payment[] = [];
      if (response.data && Array.isArray((response.data as any).data)) {
        paymentData = (response.data as any).data;
      } else if (Array.isArray(response.data)) {
        paymentData = response.data;
      } else {
        console.warn("API response format unexpected:", response.data);
        paymentData = [];
      }
      const validatedData = paymentData
        .filter((p) => p && typeof p === "object")
        .map((p) => ({
          ...p,
          _id: String(p._id ?? ""),
          amountToAdd: String(p.amountToAdd ?? ""),
          status:
            p.status && statusOptions.includes(p.status) ? p.status : "unknown",
          createdAt: p.createdAt || new Date(0).toISOString(),
          user:
            p.user && typeof p.user === "object"
              ? {
                  ...p.user,
                  fullName: String(p.user.fullName ?? "N/A"),
                  email: String(p.user.email ?? "N/A"),
                }
              : { fullName: "N/A", email: "N/A" },
          payInCurrency:
            p.payInCurrency && typeof p.payInCurrency === "object"
              ? {
                  ...p.payInCurrency,
                  code: String(p.payInCurrency.code ?? "N/A"),
                }
              : { code: "N/A" },
          referenceCode: String(p.referenceCode ?? ""),
        }));
      setPayments(validatedData);
    } catch (err: unknown) {
      let errorMessage = "Failed to load payments";
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      showToast(errorMessage, "error");
      setPayments([]);
      console.error("Error fetching payments:", err);
    } finally {
      setLoadingPayments(false);
      setIsRefreshing(false);
    }
  }, [token, statusOptions, showToast]);

  useEffect(() => {
    if (token) {
      fetchPayments();
    } else {
      showToast("Authentication token not found. Please log in.", "error");
      setLoadingPayments(false);
      setPayments([]);
    }
  }, [token, fetchPayments, showToast]);

  useEffect(() => {
    let results: Payment[] = [...payments];
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        (payment) =>
          payment._id.toLowerCase().includes(lowerSearchTerm) ||
          payment.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
          payment.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
          payment.referenceCode?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    if (paymentIdFilter) {
      results = results.filter((payment) =>
        payment._id.toLowerCase().includes(paymentIdFilter.toLowerCase())
      );
    }
    if (amountFilter) {
      const amount = parseFloat(amountFilter);
      if (!isNaN(amount)) {
        results = results.filter((payment) => {
          const paymentAmount = parseFloat(payment.amountToAdd);
          return !isNaN(paymentAmount) && paymentAmount === amount;
        });
      }
    }
    if (currencyFilter !== "all") {
      results = results.filter(
        (payment) => payment.payInCurrency?.code === currencyFilter
      );
    }
    if (statusFilter !== "all") {
      results = results.filter(
        (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    const fromDateObj = parseDateString(fromDate);
    const toDateObj = parseDateString(toDate);

    if (fromDateObj) {
      fromDateObj.setUTCHours(0, 0, 0, 0);
      results = results.filter((payment) => {
        try {
          const paymentDate = new Date(payment.createdAt);
          return !isNaN(paymentDate.getTime()) && paymentDate >= fromDateObj;
        } catch {
          return false;
        }
      });
    }
    if (toDateObj) {
      toDateObj.setUTCHours(23, 59, 59, 999);
      results = results.filter((payment) => {
        try {
          const paymentDate = new Date(payment.createdAt);
          return !isNaN(paymentDate.getTime()) && paymentDate <= toDateObj;
        } catch {
          return false;
        }
      });
    }
    if (sortField) {
      results.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        const getSafeValue = (obj: any, path: string) =>
          path.split(".").reduce((acc, part) => acc && acc[part], obj);

        switch (sortField) {
          case "user":
            valueA = a.user?.fullName?.toLowerCase() || "";
            valueB = b.user?.fullName?.toLowerCase() || "";
            break;
          case "amount":
            valueA = parseFloat(a.amountToAdd) || 0;
            valueB = parseFloat(b.amountToAdd) || 0;
            break;
          case "createdAt":
            valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            if (isNaN(valueA)) valueA = 0;
            if (isNaN(valueB)) valueB = 0;
            break;
          case "_id":
            valueA = (a._id ?? "").toLowerCase();
            valueB = (b._id ?? "").toLowerCase();
            break;
          case "status":
            valueA = (a.status ?? "").toLowerCase();
            valueB = (b.status ?? "").toLowerCase();
            break;
          default:
            valueA = getSafeValue(a, sortField);
            valueB = getSafeValue(b, sortField);
            if (typeof valueA === "string") valueA = valueA.toLowerCase();
            if (typeof valueB === "string") valueB = valueB.toLowerCase();
            break;
        }
        let comparison = 0;
        if (valueA < valueB) comparison = -1;
        else if (valueA > valueB) comparison = 1;
        return sortDirection === "asc" ? comparison : comparison * -1;
      });
    }
    setFilteredPayments(results);
  }, [
    payments,
    searchTerm,
    statusFilter,
    fromDate,
    toDate,
    paymentIdFilter,
    amountFilter,
    currencyFilter,
    sortField,
    sortDirection,
  ]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    statusFilter,
    fromDate,
    toDate,
    paymentIdFilter,
    amountFilter,
    currencyFilter,
    sortField,
    sortDirection,
  ]);

  const handleApplyFilters = useCallback((filters: FiltersState) => {
    setSearchTerm(filters.searchTerm);
    setFromDate(filters.fromDate);
    setToDate(filters.toDate);
    setStatusFilter(filters.statusFilter);
    setPaymentIdFilter(filters.idFilter);
    setAmountFilter(filters.amountFilter);
    setCurrencyFilter(filters.currencyFilter);
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setSearchTerm("");
    setFromDate("");
    setToDate("");
    setStatusFilter("all");
    setPaymentIdFilter("");
    setAmountFilter("");
    setCurrencyFilter("all");
  }, []);

  const handlePageSizeChange = (size: number) => {
    setPaymentsPerPage(size);
    setCurrentPage(1);
  };

  const toggleSort = (field: PaymentSortField) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-600/20 text-green-400";
      case "pending":
        return "bg-yellow-600/20 text-yellow-400";
      case "in progress":
        return "bg-blue-600/20 text-blue-400";
      case "canceled":
      case "cancelled":
        return "bg-red-600/20 text-red-400";
      case "failed":
        return "bg-rose-600/20 text-rose-400";
      default:
        return "bg-gray-600/20 text-gray-400";
    }
  };

  const currencyOptions = useMemo(() => {
    const codes = new Set(
      payments
        .map((p) => p.payInCurrency?.code)
        .filter((code): code is string => Boolean(code) && code !== "N/A")
    );
    return ["all", ...Array.from(codes).sort()];
  }, [payments]);

  const handleEditPayment = (payment: Payment) => {
    setSelectedPaymentForEdit(payment);
    setEditFormData({ status: payment.status ?? "unknown" });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedPaymentForEdit?._id) return;
    setEditLoading(true);
    const newStatus = editFormData.status;
    try {
      const payload = { status: newStatus };
      await axios.put(
        `/admin/payments/${selectedPaymentForEdit._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p._id === selectedPaymentForEdit._id ? { ...p, status: newStatus } : p
        )
      );

      const toastTypeForStatus = mapPaymentStatusToToastType(newStatus);
      showToast(
        `Payment status updated to "${newStatus}" successfully!`,
        toastTypeForStatus
      );

      setIsEditModalOpen(false);
      setSelectedPaymentForEdit(null);
    } catch (err: unknown) {
      let errorMessage = "Failed to update payment status";
      if (axios.isAxiosError(err)) {
        errorMessage =
          (err.response?.data as ApiErrorResponse)?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      showToast(errorMessage, "error");
      console.error("Error updating payment status:", err);
    } finally {
      setEditLoading(false);
    }
  };

  const refreshData = useCallback(() => {
    fetchPayments();
  }, [fetchPayments]);

  const { currentPayments, totalPages } = useMemo(() => {
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const paginatedData = filteredPayments.slice(
      indexOfFirstPayment,
      indexOfLastPayment
    );
    const pages = Math.ceil(filteredPayments.length / paymentsPerPage);
    return { currentPayments: paginatedData, totalPages: pages };
  }, [filteredPayments, currentPage, paymentsPerPage]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
    else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
    else if (pageNumber > totalPages && totalPages > 0)
      setCurrentPage(totalPages);
  };
  const goToPreviousPage = () => paginate(currentPage - 1);
  const goToNextPage = () => paginate(currentPage + 1);

  const currentFilterState: FiltersState = useMemo(
    () => ({
      searchTerm,
      fromDate,
      toDate,
      statusFilter,
      currencyFilter,
      idFilter: paymentIdFilter,
      amountFilter,
    }),
    [
      searchTerm,
      fromDate,
      toDate,
      statusFilter,
      currencyFilter,
      paymentIdFilter,
      amountFilter,
    ]
  );

  const toastContainerProps: ToastContainerProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: false,
    closeButton: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    transition: Slide,
    toastClassName: () =>
      "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
  };

  const getToastContainerStyle = (): React.CSSProperties & {
    [key: `--${string}`]: string | number;
  } => {
    const baseStyle = {
      zIndex: 30,
    };

    if (isMobile) {
      return {
        ...baseStyle,
        top: "1rem",
        left: "1rem",
        right: "1rem",
        width: "auto",
      };
    } else {
      return {
        ...baseStyle,
        top: "0.75rem",
        right: "0.75rem",
        width: "320px",
      };
    }
  };

  return (
    <div className="container mx-auto px-4 py-5 relative">
      <ToastContainer
        {...toastContainerProps}
        style={getToastContainerStyle()}
      />
      <div className="space-y-6">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-3">
          <div className="Add-Money">
            <div className="flex items-center gap-3">

              <div className="p-2.5 shrink-0 bg-primary rounded-full flex items-center justify-center">
                <TbMoneybag className="text-mainheading" size={26} />
              </div>

              <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
                Add-Money Management
              </h1>
            </div>

            <p className="mt-2 text-subheadingWhite text-base lg:text-lg max-w-5xl">
              Efficiently oversee all incoming funds with the Add-Money
              Management system. Monitor user deposits, track payment statuses,
              and manage every transaction in real time from a single, intuitive
              dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center bg-primary text-mainheading hover:bg-primaryhover h-12.5 px-8 py-3 cursor-pointer font-medium rounded-full sm:w-auto w-full justify-center"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            <button
              onClick={refreshData}
              disabled={isRefreshing || loadingPayments}
              className="flex items-center justify-center cursor-pointer gap-2 text-primary bg-primarybox hover:bg-secondarybox font-medium px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh Add Money data"
            >
              <RefreshCw
                className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="paymentsPerPage"
              className="text-sm font-medium text-subheadingWhite whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="paymentsPerPage"
              value={paymentsPerPage}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-primarybox text-mainheadingWhite cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="bg-primarybox cursor-pointer"
                >
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-subheadingWhite whitespace-nowrap">
              Entries
            </span>
          </div>
          <p className="text-sm text-subheadingWhite">
            Showing{" "}
            {filteredPayments.length > 0
              ? (currentPage - 1) * paymentsPerPage + 1
              : 0}
            - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)}{" "}
            of {filteredPayments.length} results
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>

        <PaymentTable
          filteredPayments={currentPayments}
          loadingPayments={loadingPayments}
          getStatusColor={getStatusColor}
          toggleSort={toggleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          handleEditPayment={handleEditPayment}
        />

        {totalPages > 1 && !loadingPayments && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}
      </div>

      <PaymentEditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedPaymentForEdit={selectedPaymentForEdit}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        editLoading={editLoading}
        handleSaveEdit={handleSaveEdit}
        statusOptions={statusOptions.filter(
          (s) => s !== "all" && s !== "unknown"
        )}
      />

      <GenericFilters
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        initialFilters={currentFilterState}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearAllFilters}
        searchTermPlaceholder="Search User Name or Email..."
        currencyOptions={currencyOptions}
        statusOptions={statusOptions}
        idFilterLabel="Payment ID"
        idFilterPlaceholder="Filter by Payment ID"
        showRecipientFilter={false}
      />
    </div>
  );
};

export default AdminPaymentsPage;
