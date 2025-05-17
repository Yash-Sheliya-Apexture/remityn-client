// // frontend/src/app/admin/transfers/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import TransferList from "../components/TransferList";
// import adminTransferService from "../../services/admin/transfer";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { ChevronDown, Filter, RefreshCw, AlertCircle } from "lucide-react";

// const AdminTransfersPage = () => {
//   const [transfers, setTransfers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Status options with colors
//   const statusOptions = [
//     { value: "", label: "All Statuses", color: "bg-gray-500" },
//     { value: "pending", label: "Pending", color: "bg-yellow-500" },
//     { value: "processing", label: "Processing", color: "bg-blue-500" },
//     { value: "completed", label: "Completed", color: "bg-green-500" },
//     { value: "failed", label: "Failed", color: "bg-red-500" },
//     { value: "canceled", label: "Canceled", color: "bg-gray-500" },
//   ];

//   useEffect(() => {
//     if (loadingAuth) return;
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }

//     fetchTransfers();
//   }, [token, isAdmin, loadingAuth, router, statusFilter]);

//   const fetchTransfers = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const filters = statusFilter ? { status: statusFilter } : {};
//       const data = await adminTransferService.getAdminTransfers(token, filters);
//       setTransfers(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfers.");
//       console.error("Error fetching admin transfers:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusFilterChange = (value: string) => {
//     setStatusFilter(value);
//     setDropdownOpen(false);
//   };

//   const refreshData = () => {
//     fetchTransfers();
//   };

//   // Get current status label and color
//   const currentStatus =
//     statusOptions.find((option) => option.value === statusFilter) ||
//     statusOptions[0];

//   if (loadingAuth) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
//           <div className="h-12 bg-gray-200 rounded mb-6"></div>
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-20 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
//           <div className="flex items-center justify-center text-red-500 mb-4">
//             <AlertCircle size={48} />
//           </div>
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//             Access Denied
//           </h2>
//           <p className="text-main text-center max-w-3xl">
//             You don't have permission to access this area. Please contact your
//             administrator if you believe this is a mistake.
//           </p>
//           <button
//             onClick={() => router.push("/dashboard")}
//             className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-8xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-md border p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-main">
//                 Transfer Management
//               </h1>
//               <p className="text-gray text-lg mt-4 max-w-4xl">
//                 This page allows administrators to view, manage, and process
//                 transfer requests. Key features include filtering transfers by
//                 status (pending, approved, rejected), reviewing transaction
//                 details, and manually approving or canceling transfers.
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               {/* Refresh-Data */}
//               <button
//                 onClick={refreshData}
//                 className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all duration-200"
//               >
//                 <RefreshCw className="size-5"/>
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 text-main">
//               <Filter size={18} />
//               <span className="font-medium">Filters</span>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex cursor-pointer items-center justify-between w-48 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm transition-colors duration-300"
//               >
//                 <div className="flex items-center space-x-2">
//                   <span
//                     className={`size-3 rounded-full ${currentStatus.color}`}
//                   ></span>
//                   <span>{currentStatus.label}</span>
//                 </div>
//                 <ChevronDown
//                   size={20}
//                   className={`transition-transform duration-200 text-gray ${
//                     dropdownOpen ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//                   {statusOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={() => handleStatusFilterChange(option.value)}
//                       className={`flex items-center space-x-2 px-4 py-3 hover:bg-sky-100 cursor-pointer transition-colors duration-200 ${
//                         statusFilter === option.value ? "bg-gray-100" : ""
//                       }`}
//                     >
//                       <span
//                         className={`w-3 h-3 rounded-full ${option.color}`}
//                       ></span>
//                       <span>{option.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
//               <div className="flex items-center">
//                 <AlertCircle size={20} className="text-red-500 mr-2" />
//                 <p className="text-red-700">{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Transfers List Content */}
//           <div>
//             <TransferList transfers={transfers} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTransfersPage;

// // frontend/src/app/admin/transfers/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import TransferList from "../components/TransferList";
// import adminTransferService from "../../services/admin/transfer";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { ChevronDown, Filter, RefreshCw, AlertCircle } from "lucide-react";

// const AdminTransfersPage = () => {
//   const [transfers, setTransfers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter();
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false); // State for refresh animation

//   // Status options with colors
//   const statusOptions = [
//     { value: "", label: "All Statuses", color: "bg-gray-500" },
//     { value: "pending", label: "Pending", color: "bg-yellow-500" },
//     { value: "processing", label: "Processing", color: "bg-blue-500" },
//     { value: "completed", label: "Completed", color: "bg-green-500" },
//     { value: "failed", label: "Failed", color: "bg-red-500" },
//     { value: "canceled", label: "Canceled", color: "bg-gray-500" },
//   ];

//   useEffect(() => {
//     if (loadingAuth) return;
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }

//     fetchTransfers();
//   }, [token, isAdmin, loadingAuth, router, statusFilter]);

//   const fetchTransfers = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const filters = statusFilter ? { status: statusFilter } : {};
//       const data = await adminTransferService.getAdminTransfers(token, filters);
//       setTransfers(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfers.");
//       console.error("Error fetching admin transfers:", err);
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false); // Stop refresh animation after data is fetched
//     }
//   };

//   const handleStatusFilterChange = (value: string) => {
//     setStatusFilter(value);
//     setDropdownOpen(false);
//   };

//   const refreshData = () => {
//     setIsRefreshing(true); // Start refresh animation
//     fetchTransfers();
//   };

//   // Get current status label and color
//   const currentStatus =
//     statusOptions.find((option) => option.value === statusFilter) ||
//     statusOptions[0];

//   if (loadingAuth) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
//           <div className="h-12 bg-gray-200 rounded mb-6"></div>
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-20 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
//           <div className="flex items-center justify-center text-red-500 mb-4">
//             <AlertCircle size={48} />
//           </div>
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//             Access Denied
//           </h2>
//           <p className="text-main text-center max-w-3xl">
//             You don't have permission to access this area. Please contact your
//             administrator if you believe this is a mistake.
//           </p>
//           <button
//             onClick={() => router.push("/dashboard")}
//             className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-8xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-2xl font-medium text-main">
//                 Transfer Management
//               </h1>
//             </div>
//             <div className="mt-4 md:mt-0">
//               {/* Refresh-Data */}
//               <button
//                 onClick={refreshData}
//                 disabled={isRefreshing} // Disable button during refresh
//                 className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw
//                   className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
//             <div className="flex items-center">
//               <AlertCircle size={20} className="text-red-500 mr-2" />
//               <p className="text-red-700">{error}</p>
//             </div>
//           </div>
//         )}
//         {/* Transfers List Content */}
//       </div>
//       <TransferList transfers={transfers} isLoading={isLoading} />
//     </div>
//   );
// };

// export default AdminTransfersPage;

// // frontend/src/app/admin/transfers/page.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import TransferTable from '../components/transfers/TransferTable';
// import TransferFilters from '../components/transfers/TransferFilters';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Transfer {
//     _id: string;
//     user: {
//         fullName?: string;
//         email?: string;
//     };
//     sendAmount: string;
//     sendCurrency?: {
//         code?: string;
//     };
//     status: string;
//     createdAt: string;
//     recipient?: {
//         accountHolderName?: string;
//     }
//     // Add other properties as needed based on your Transfer object structure
// }

// const AdminTransfersPage: React.FC = () => {
//     const { token } = useAuth();
//     const [transfers, setTransfers] = useState<Transfer[]>([]);
//     const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
//     const [loadingTransfers, setLoadingTransfers] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled'>('all');
//     const [transferIdFilter, setTransferIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');
//     const [recipientFilter, setRecipientFilter] = useState<string>('');

//     // Sorting
//     const [sortField, setSortField] = useState<string | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [transfersPerPage, setTransfersPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for transfers per page

//     // Update transfers per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setTransfersPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     useEffect(() => {
//         fetchTransfers();
//     }, [token]);

//     const fetchTransfers = async () => {
//         setLoadingTransfers(true);
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             const response = await axios.get('/admin/transfers', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTransfers(response.data);
//             setFilteredTransfers(response.data);
//         } catch (err: any) { // Type err as any or Error
//             setError(err.response?.data?.message || 'Failed to load transfers');
//             console.error("Error fetching transfers:", err);
//         } finally {
//             setLoadingTransfers(false);
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     };

//     // Apply filters when any filter changes
//     useEffect(() => {
//         let results: Transfer[] = [...transfers];

//         // Apply search filter (user name and email, transfer ID)
//         if (searchTerm) {
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transfer.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transfer.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply Transfer ID filter
//         if (transferIdFilter) {
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(transferIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             results = results.filter(transfer => parseFloat(transfer.sendAmount) === amount);
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(transfer => transfer.sendCurrency?.code === currencyFilter);
//         }

//         // Apply Recipient filter
//         if (recipientFilter) {
//             results = results.filter(transfer =>
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(recipientFilter.toLowerCase())
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(transfer => transfer.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0);

//             results = results.filter(transfer => {
//                 const transferDate = new Date(transfer.createdAt);
//                 return transferDate >= fromDate;
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999);

//             results = results.filter(transfer => {
//                 const transferDate = new Date(transfer.createdAt);
//                 return transferDate <= toDate;
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
//                     valueA = parseFloat(a.sendAmount);
//                     valueB = parseFloat(b.sendAmount);
//                 } else if (sortField === 'recipient') {
//                     valueA = a.recipient?.accountHolderName || '';
//                     valueB = b.recipient?.accountHolderName || '';
//                 }
//                 else {
//                     valueA = a[sortField as keyof Transfer]; // Type assertion to Transfer key
//                     valueB = b[sortField as keyof Transfer]; // Type assertion to Transfer key
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

//         setFilteredTransfers(results);
//         setCurrentPage(1); // Reset page to 1 when filters change
//     }, [transfers, searchTerm, statusFilter, dateRange, sortField, sortDirection, transferIdFilter, amountFilter, currencyFilter, recipientFilter]);

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
//         setTransferIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         setRecipientFilter('');
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'completed':
//                 return 'text-green-600 bg-green-600/20 ';
//             case 'pending':
//                 return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'processing':
//                 return 'text-blue-600 bg-blue-600/20 ';
//             case 'failed':
//                 return 'text-rose-600 bg-rose-600/20 ';
//             case 'canceled':
//                 return 'text-red-600 bg-red-600/20 ';
//             default:
//                 return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     const currencyOptions = ['all', ...Array.from(new Set(transfers.map(p => p.sendCurrency?.code).filter(Boolean)))];
//     const statusOptions: ('all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled')[] = ['all', 'pending', 'processing', 'completed', 'failed', 'canceled'];

//     const refreshData = () => {
//         fetchTransfers();
//     };

//     // Pagination logic
//     const indexOfLastTransfer = currentPage * transfersPerPage;
//     const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
//     const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);

//     const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage);
//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//     const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
//     const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Transfer Management</h1>
//                     <div className="flex gap-3 items-start">
//                         {/* Transfer Filter */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User, Recipient or Email..."
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
//                         <label htmlFor="transfersPerPage" className="mr-2 text-sm font-medium text-gray-600 dark:text-white">Show</label>
//                         <select
//                             id="transfersPerPage"
//                             value={transfersPerPage}
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

//                 {/* Transfers Table */}
//                 <TransferTable
//                     filteredTransfers={currentTransfers} // Use currentTransfers for pagination
//                     loadingTransfers={loadingTransfers}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
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

//             {/* Filter Sidebar */}
//             <TransferFilters
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
//                 transferIdFilter={transferIdFilter}
//                 setTransferIdFilter={setTransferIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//                 recipientFilter={recipientFilter}
//                 setRecipientFilter={setRecipientFilter}
//             />
//         </div >
//     );
// };

// export default AdminTransfersPage;

// // frontend/src/app/admin/transfers/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import { useAuth } from '../../contexts/AuthContext';
// import axios from 'axios'; // Import AxiosError for type checking
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import TransferTable from '../components/transfers/TransferTable';
// import TransferFilters from '../components/transfers/TransferFilters';
// import Pagination from '../components/Pagination'; // Import Pagination component

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Define Transfer type used WITHIN this component ---
// interface Transfer {
//     _id: string;
//     user: { // Made user non-optional as it seems core
//         fullName?: string;
//         email?: string;
//     };
//     sendAmount: string; // Keep as string as per original definition and API
//     sendCurrency?: {
//         code?: string;
//     };
//     status: string;
//     createdAt: string; // ISO date string
//     recipient?: { // Recipient is optional
//         accountHolderName?: string;
//     };
//     // Add other properties as needed based on your Transfer object structure
// }

// // Define the type for the sortable fields more explicitly
// // Includes top-level keys and nested keys used for sorting
// type TransferSortField = keyof Omit<Transfer, 'user' | 'recipient' | 'sendCurrency'> | 'user' | 'recipient' | 'createdAt' | 'amount' | '_id'; // Alias for user.fullName and recipient.accountHolderName used in switch

// const AdminTransfersPage: React.FC = () => {
//     const { token } = useAuth();
//     const [transfers, setTransfers] = useState<Transfer[]>([]);
//     const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
//     const [loadingTransfers, setLoadingTransfers] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh animation

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [dateRange, setDateRange] = useState<{ from: Date | null, to: Date | null }>({ from: null, to: null });
//     const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled'>('all');
//     const [transferIdFilter, setTransferIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');
//     const [recipientFilter, setRecipientFilter] = useState<string>('');

//     // Sorting
//     // --- FIX: Update sortField state type ---
//     const [sortField, setSortField] = useState<TransferSortField | null>(null); // Use the more specific type
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [transfersPerPage, setTransfersPerPage] = useState<number>(10); // Default to 10 per page
//     const pageSizeOptions: number[] = [10, 25, 50]; // Options for transfers per page

//     // Update transfers per page and reset to first page
//     const handlePageSizeChange = (size: number) => {
//         setTransfersPerPage(size);
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     // --- Start of Fixes ---

//     // 1. Wrap fetchTransfers in useCallback
//     const fetchTransfers = useCallback(async () => {
//         setLoadingTransfers(true);
//         setIsRefreshing(true); // Start refresh animation
//         setError(null);
//         // Clear success message on new fetch? Optional, depends on desired UX
//         // setSuccessMessage(null);
//         try {
//             // Use the local Transfer type for the response
//             const response = await axios.get<{ data: Transfer[] }>('/admin/transfers', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const fetchedData = response.data.data || response.data || []; // Ensure it's an array
//             setTransfers(fetchedData);
//         } catch (err: unknown) { // 2. Change 'any' to 'unknown'
//             // 3. Type check the error before accessing properties
//             let message = 'Failed to load transfers'; // Default message
//             if (axios.isAxiosError(err)) {
//                 message = err.response?.data?.message || err.message || 'An unexpected error occurred.';
//             } else if (err instanceof Error) {
//                 message = err.message;
//             } else if (typeof err === 'string') {
//                 message = err;
//             }
//             setError(message);
//             console.error("Error fetching transfers:", err);
//         } finally {
//             setLoadingTransfers(false);
//             setIsRefreshing(false); // Stop refresh animation
//         }
//     }, [token]); // Simplified dependencies as setters are stable

//     useEffect(() => {
//         if (token) { // Ensure token exists before fetching
//              fetchTransfers();
//         }
//     // 4. Add fetchTransfers to dependency array
//     }, [token, fetchTransfers]);

//     // --- End of Fixes for useEffect dependency ---

//     // Apply filters and sorting when dependencies change
//     useEffect(() => {
//         let results: Transfer[] = [...transfers]; // Start with the original full list

//         // Apply search filter (user name and email, transfer ID, recipient)
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(lowerSearchTerm) ||
//                 transfer.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 transfer.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Transfer ID filter
//         if (transferIdFilter) {
//             const lowerTransferIdFilter = transferIdFilter.toLowerCase();
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(lowerTransferIdFilter)
//             );
//         }

//         // Apply Amount filter
//         if (amountFilter) {
//             // Use parseFloat for comparison, handle potential NaN
//             const amount = parseFloat(amountFilter);
//             if (!isNaN(amount)) {
//                 // Compare parsed amount from filter with parsed amount from transfer
//                 results = results.filter(transfer => parseFloat(transfer.sendAmount) === amount);
//             }
//         }

//         // Apply Currency filter
//         if (currencyFilter !== 'all') {
//             results = results.filter(transfer => transfer.sendCurrency?.code === currencyFilter);
//         }

//         // Apply Recipient filter
//         if (recipientFilter) {
//             const lowerRecipientFilter = recipientFilter.toLowerCase();
//             results = results.filter(transfer =>
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(lowerRecipientFilter)
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             results = results.filter(transfer => transfer.status === statusFilter);
//         }

//         // Apply date range filter
//         if (dateRange.from) {
//             const fromDate = new Date(dateRange.from);
//             fromDate.setHours(0, 0, 0, 0); // Start of the day

//             results = results.filter(transfer => {
//                 const transferDate = new Date(transfer.createdAt);
//                 return !isNaN(transferDate.getTime()) && transferDate >= fromDate; // Check for valid date
//             });
//         }

//         if (dateRange.to) {
//             const toDate = new Date(dateRange.to);
//             toDate.setHours(23, 59, 59, 999); // End of the day

//             results = results.filter(transfer => {
//                 const transferDate = new Date(transfer.createdAt);
//                 return !isNaN(transferDate.getTime()) && transferDate <= toDate; // Check for valid date
//             });
//         }

//         // Apply sorting
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA: string | number | Date | undefined;
//                 let valueB: string | number | Date | undefined;

//                 // Extract values based on sortField
//                 switch (sortField) {
//                     case 'user': // Represents sorting by user.fullName
//                         valueA = a.user?.fullName?.toLowerCase() ?? '';
//                         valueB = b.user?.fullName?.toLowerCase() ?? '';
//                         break;
//                     case 'amount': // Represents sorting by sendAmount
//                         // Parse string amount to number for comparison
//                         valueA = parseFloat(a.sendAmount);
//                         valueB = parseFloat(b.sendAmount);
//                         break;
//                     case 'recipient': // Represents sorting by recipient.accountHolderName
//                         valueA = a.recipient?.accountHolderName?.toLowerCase() ?? '';
//                         valueB = b.recipient?.accountHolderName?.toLowerCase() ?? '';
//                         break;
//                     case 'createdAt':
//                         valueA = new Date(a.createdAt); // Compare as Date objects
//                         valueB = new Date(b.createdAt);
//                         break;
//                     case 'status':
//                          valueA = a.status.toLowerCase();
//                          valueB = b.status.toLowerCase();
//                          break;
//                     case '_id':
//                          valueA = a._id;
//                          valueB = b._id;
//                          break;
//                     // Add direct key access if needed, ensuring type safety
//                     // default:
//                     //     const key = sortField as keyof Transfer; // Assert key type
//                     //     // Ensure values are comparable (e.g., convert to string if mixed types)
//                     //     valueA = (a[key] as any)?.toString().toLowerCase() ?? '';
//                     //     valueB = (b[key] as any)?.toString().toLowerCase() ?? '';
//                     //     break;
//                 }

//                 // Comparison Logic - Handle different types
//                 let comparison = 0;

//                 if (valueA instanceof Date && valueB instanceof Date) {
//                     const timeA = !isNaN(valueA.getTime()) ? valueA.getTime() : -Infinity;
//                     const timeB = !isNaN(valueB.getTime()) ? valueB.getTime() : -Infinity;
//                     comparison = timeA - timeB;
//                 }
//                 else if (typeof valueA === 'number' && typeof valueB === 'number') {
//                     const numA = isNaN(valueA) ? -Infinity : valueA;
//                     const numB = isNaN(valueB) ? -Infinity : valueB;
//                     comparison = numA - numB;
//                 }
//                 else {
//                     const strA = String(valueA ?? '').toLowerCase();
//                     const strB = String(valueB ?? '').toLowerCase();
//                     comparison = strA.localeCompare(strB);
//                 }

//                 // Apply direction
//                 return sortDirection === 'asc' ? comparison : -comparison;
//             });
//         }

//         setFilteredTransfers(results);
//         // Reset page to 1 only if filters/sorting change *after* the initial load
//         if (transfers.length > 0) { // Basic check to see if it's not the initial empty state
//             setCurrentPage(1);
//         }
//     }, [transfers, searchTerm, statusFilter, dateRange, sortField, sortDirection, transferIdFilter, amountFilter, currencyFilter, recipientFilter]); // Keep all relevant dependencies

//     // --- FIX: Ensure field passed to toggleSort matches TransferSortField type ---
//     const toggleSort = (field: TransferSortField) => {
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
//         setTransferIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         setRecipientFilter('');
//         setSortField(null); // Clear sorting when clearing filters
//         setSortDirection('asc');
//         setCurrentPage(1); // Reset page when clearing filters
//     };

//     const getStatusColor = (status: string) => {
//         switch (status?.toLowerCase()) { // Added toLowerCase for safety
//             case 'completed': return 'text-green-600 bg-green-600/20 ';
//             case 'pending': return 'text-yellow-600 bg-yellow-600/20 ';
//             case 'processing': return 'text-blue-600 bg-blue-600/20 ';
//             case 'failed': return 'text-rose-600 bg-rose-600/20 ';
//             case 'canceled': return 'text-red-600 bg-red-600/20 ';
//             default: return 'text-gray-600 bg-gray-600/20 ';
//         }
//     };

//     // Memoize calculation of options to prevent re-computation on every render
//     const currencyOptions = React.useMemo(() => {
//         const codes = new Set(transfers.map(p => p.sendCurrency?.code).filter((code): code is string => Boolean(code)));
//         return ['all', ...Array.from(codes)];
//     }, [transfers]);

//     const statusOptions: ('all' | 'pending' | 'processing' | 'completed' | 'failed' | 'canceled')[] = ['all', 'pending', 'processing', 'completed', 'failed', 'canceled'];

//     const refreshData = () => {
//         fetchTransfers();
//     };

//     // Pagination logic
//     const indexOfLastTransfer = currentPage * transfersPerPage;
//     const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
//     const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer); // Use the locally defined Transfer type

//     const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage);
//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         }
//     };
//     const goToPreviousPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
//     const goToNextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 <div className="flex flex-wrap justify-between items-center gap-4">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Transfer Management</h1>
//                     <div className="flex flex-wrap gap-3 items-center">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search by User, Recipient or Email..."
//                                 className="w-full sm:w-64 md:w-xl rounded-full py-2 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//                             />
//                             <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                         </div>
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-lg px-8 py-2 h-12.5 rounded-3xl hover:bg-primaryhover transition-colors whitespace-nowrap"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing || loadingTransfers}
//                             className="flex items-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12.5 rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
//                                     aria-label="Dismiss success message"
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
//                                     aria-label="Dismiss error message"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
//                     <div className="flex items-center gap-2">
//                         <label htmlFor="transfersPerPage" className="text-sm font-medium text-gray-600 dark:text-white whitespace-nowrap">Show per page:</label>
//                         <select
//                             id="transfersPerPage"
//                             value={transfersPerPage}
//                             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                             className="block w-auto pl-3 pr-10 py-2 border focus:outline-none sm:text-sm rounded-md bg-lightgray dark:bg-[#2E2E2E] dark:text-white dark:border-gray-600"
//                         >
//                             {pageSizeOptions.map(size => (
//                                 <option key={size} value={size}>{size}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-white">
//                         Showing {filteredTransfers.length > 0 ? indexOfFirstTransfer + 1 : 0}-{Math.min(indexOfLastTransfer, filteredTransfers.length)} of {filteredTransfers.length} results
//                          {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//                     </p>
//                 </div>

//                 {/* Transfers Table */}
//                 <TransferTable
//                     // --- FIX: Pass currentTransfers which now uses the local Transfer type ---
//                     filteredTransfers={currentTransfers}
//                     loadingTransfers={loadingTransfers}
//                     getStatusColor={getStatusColor}
//                     // --- FIX: Pass toggleSort which now expects TransferSortField ---
//                     toggleSort={toggleSort}
//                     // --- FIX: Pass sortField which now has the specific type TransferSortField | null ---
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                 />
//                 {/* Pagination Controls - Only show if more than one page */}
//                  {totalPages > 1 && (
//                      <Pagination
//                          currentPage={currentPage}
//                          totalPages={totalPages}
//                          paginate={paginate}
//                          goToPreviousPage={goToPreviousPage}
//                          goToNextPage={goToNextPage}
//                      />
//                  )}
//             </div>

//             {/* Filter Sidebar */}
//             <TransferFilters
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
//                 transferIdFilter={transferIdFilter}
//                 setTransferIdFilter={setTransferIdFilter}
//                 amountFilter={amountFilter}
//                 setAmountFilter={setAmountFilter}
//                 currencyOptions={currencyOptions}
//                 statusOptions={statusOptions}
//                 clearFilters={clearFilters}
//                 recipientFilter={recipientFilter}
//                 setRecipientFilter={setRecipientFilter}
//             />
//         </div >
//     );
// };

// export default AdminTransfersPage;

// // frontend/src/app/admin/transfers/page.tsx
// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
// import { useAuth } from '../../contexts/AuthContext';
// import axios, { AxiosError } from 'axios'; // Import AxiosError
// import apiConfig from '../../config/apiConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';

// // Import components
// import TransferTable from '../components/transfers/TransferTable';
// // *** IMPORT THE GENERIC FILTER COMPONENT ***
// import GenericFilters, { FiltersState } from '../components/add-money/PaymentFilters'; // Adjust path if needed
// import Pagination from '../components/Pagination';

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Transfer type (keep as is) ---
// interface Transfer {
//     _id: string;
//     user: {
//         fullName?: string;
//         email?: string;
//     };
//     sendAmount: string;
//     sendCurrency?: { code?: string };
//     status: string;
//     createdAt: string; // ISO date string
//     recipient?: { accountHolderName?: string };
//     // Add other properties as needed
// }

// // TransferSortField type (keep as is)
// type TransferSortField = keyof Omit<Transfer, 'user' | 'recipient' | 'sendCurrency'> | 'user' | 'recipient' | 'createdAt' | 'amount' | '_id';

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         // Basic check if parts look like numbers
//         if (!/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
//             console.warn("Invalid date parts:", parts);
//             return null;
//         }
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);

//         // Additional validation for reasonable date values
//         if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 3000) {
//             console.warn("Date components out of range:", { day, month, year });
//             return null;
//         }

//         const date = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues

//         // Final check to ensure the date wasn't rolled over
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

// const AdminTransfersPage: React.FC = () => {
//     const { token } = useAuth();
//     const [transfers, setTransfers] = useState<Transfer[]>([]);
//     const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
//     const [loadingTransfers, setLoadingTransfers] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//     // Filter state
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     // *** CHANGE dateRange state to use strings ***
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');
//     const [statusFilter, setStatusFilter] = useState<string>('all'); // Use string
//     const [transferIdFilter, setTransferIdFilter] = useState<string>('');
//     const [amountFilter, setAmountFilter] = useState<string>('');
//     const [currencyFilter, setCurrencyFilter] = useState<'all' | string>('all');
//     const [recipientFilter, setRecipientFilter] = useState<string>('');

//     // Sorting state (keep as is)
//     const [sortField, setSortField] = useState<TransferSortField | null>(null);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//     // Pagination State (keep as is)
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [transfersPerPage, setTransfersPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50];

//     // Fetch transfers (keep as is, wrapped in useCallback)
//     const fetchTransfers = useCallback(async () => {
//         setLoadingTransfers(true);
//         setIsRefreshing(true);
//         setError(null);
//         try {
//             const response = await axios.get<{ data: Transfer[] } | Transfer[]>('/admin/transfers', {
//                  headers: { Authorization: `Bearer ${token}` },
//             });
//              // Robust data checking
//              let transferData: Transfer[] = [];
//              if (response.data && Array.isArray((response.data as any).data)) {
//                  transferData = (response.data as any).data;
//              } else if (Array.isArray(response.data)) {
//                  transferData = response.data;
//              } else {
//                   console.warn("API response format unexpected:", response.data);
//                   transferData = [];
//              }
//             // Add basic validation/defaults if needed
//             const validatedData = transferData.map(t => ({
//                 ...t,
//                 _id: String(t._id ?? ''),
//                 sendAmount: String(t.sendAmount ?? ''),
//                 status: String(t.status ?? 'unknown'),
//                 createdAt: t.createdAt || new Date(0).toISOString(),
//                 user: t.user ?? { fullName: 'N/A', email: 'N/A' },
//                 recipient: t.recipient ?? { accountHolderName: 'N/A' },
//                 sendCurrency: t.sendCurrency ?? { code: 'N/A'}
//             }));

//             setTransfers(validatedData);
//         } catch (err: unknown) {
//             let message = 'Failed to load transfers';
//             if (axios.isAxiosError(err)) {
//                 const axiosError = err as AxiosError<{ message?: string }>; // Type the error response data
//                 message = axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred.';
//             } else if (err instanceof Error) {
//                 message = err.message;
//             }
//             setError(message);
//             setTransfers([]); // Clear data on error
//             console.error("Error fetching transfers:", err);
//         } finally {
//             setLoadingTransfers(false);
//             setIsRefreshing(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         if (token) {
//             fetchTransfers();
//         } else {
//             setError("Authentication required.");
//             setLoadingTransfers(false);
//             setTransfers([]);
//         }
//     }, [token, fetchTransfers]);

//     // Apply filters and sorting
//     useEffect(() => {
//         let results: Transfer[] = [...transfers];

//         // Apply search filter (as before)
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase();
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(lowerSearchTerm) ||
//                 transfer.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//                 transfer.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(lowerSearchTerm)
//             );
//         }

//         // Apply Transfer ID filter (using transferIdFilter state)
//         if (transferIdFilter) {
//             results = results.filter(transfer =>
//                 transfer._id.toLowerCase().includes(transferIdFilter.toLowerCase())
//             );
//         }

//         // Apply Amount filter (using amountFilter state)
//         if (amountFilter) {
//             const amount = parseFloat(amountFilter);
//             if (!isNaN(amount)) {
//                 results = results.filter(transfer => {
//                      const transferAmount = parseFloat(transfer.sendAmount);
//                      return !isNaN(transferAmount) && transferAmount === amount;
//                 });
//             }
//         }

//         // Apply Currency filter (using currencyFilter state)
//         if (currencyFilter !== 'all') {
//             results = results.filter(transfer => transfer.sendCurrency?.code === currencyFilter);
//         }

//         // Apply Recipient filter (using recipientFilter state)
//         if (recipientFilter) {
//             const lowerRecipientFilter = recipientFilter.toLowerCase();
//             results = results.filter(transfer =>
//                 transfer.recipient?.accountHolderName?.toLowerCase().includes(lowerRecipientFilter)
//             );
//         }

//         // Apply status filter (using statusFilter state)
//         if (statusFilter !== 'all') {
//             results = results.filter(transfer => transfer.status.toLowerCase() === statusFilter.toLowerCase());
//         }

//         // Apply date range filter *** USING fromDate and toDate strings ***
//         const fromDateObj = parseDateString(fromDate);
//         const toDateObj = parseDateString(toDate);

//         if (fromDateObj) {
//             fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day UTC
//              results = results.filter(transfer => {
//                  try {
//                      const transferDate = new Date(transfer.createdAt); // Assume createdAt is ISO string
//                      return !isNaN(transferDate.getTime()) && transferDate >= fromDateObj;
//                  } catch { return false; }
//              });
//          }

//          if (toDateObj) {
//              toDateObj.setUTCHours(23, 59, 59, 999); // End of the day UTC
//              results = results.filter(transfer => {
//                  try {
//                      const transferDate = new Date(transfer.createdAt);
//                      return !isNaN(transferDate.getTime()) && transferDate <= toDateObj;
//                  } catch { return false; }
//              });
//          }

//         // Apply sorting (keep sorting logic as is)
//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA: any;
//                 let valueB: any;

//                 switch (sortField) {
//                     case 'user': valueA = a.user?.fullName?.toLowerCase() ?? ''; valueB = b.user?.fullName?.toLowerCase() ?? ''; break;
//                     case 'amount': valueA = parseFloat(a.sendAmount) || 0; valueB = parseFloat(b.sendAmount) || 0; break;
//                     case 'recipient': valueA = a.recipient?.accountHolderName?.toLowerCase() ?? ''; valueB = b.recipient?.accountHolderName?.toLowerCase() ?? ''; break;
//                     case 'createdAt': valueA = new Date(a.createdAt).getTime() || 0; valueB = new Date(b.createdAt).getTime() || 0; break;
//                     case 'status': valueA = a.status.toLowerCase(); valueB = b.status.toLowerCase(); break;
//                     case '_id': valueA = a._id; valueB = b._id; break;
//                     default: valueA = ''; valueB = ''; // Should not happen with TransferSortField type
//                 }

//                 let comparison = 0;
//                 if (valueA < valueB) comparison = -1;
//                 else if (valueA > valueB) comparison = 1;

//                 return sortDirection === 'asc' ? comparison : comparison * -1;
//             });
//         }

//         setFilteredTransfers(results);

//     }, [transfers, searchTerm, statusFilter, fromDate, toDate, sortField, sortDirection, transferIdFilter, amountFilter, currencyFilter, recipientFilter]); // Include new date states

//     // --- Reset Page on Filter/Sort Change ---
//     useEffect(() => {
//         if (currentPage !== 1) {
//              setCurrentPage(1);
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [searchTerm, statusFilter, fromDate, toDate, transferIdFilter, amountFilter, currencyFilter, recipientFilter, sortField, sortDirection]);

//     // --- Callback for GenericFilters to apply selected filters ---
//     const handleApplyFilters = useCallback((filters: FiltersState) => {
//         setSearchTerm(filters.searchTerm);
//         setFromDate(filters.fromDate); // Use string date
//         setToDate(filters.toDate);     // Use string date
//         setStatusFilter(filters.statusFilter);
//         // Map idFilter back to transferIdFilter
//         setTransferIdFilter(filters.idFilter);
//         setAmountFilter(filters.amountFilter);
//         setCurrencyFilter(filters.currencyFilter);
//         // Use recipientFilter, provide default empty string if undefined
//         setRecipientFilter(filters.recipientFilter ?? '');
//         // Page reset is handled by the useEffect above
//     }, []); // No dependencies needed as it only uses setters

//     // --- Callback for GenericFilters to clear all filters ---
//     const handleClearAllFilters = useCallback(() => {
//         setSearchTerm('');
//         setFromDate(''); // Clear string date
//         setToDate('');   // Clear string date
//         setStatusFilter('all');
//         setTransferIdFilter('');
//         setAmountFilter('');
//         setCurrencyFilter('all');
//         setRecipientFilter('');
//         // Optionally reset sorting
//         // setSortField(null);
//         // setSortDirection('asc');
//         // Page reset is handled by the useEffect above
//     }, []); // No dependencies needed

//     // Page size change handler (keep as is)
//     const handlePageSizeChange = (size: number) => {
//         setTransfersPerPage(size);
//         setCurrentPage(1);
//     };

//     // Toggle sort handler (keep as is)
//     const toggleSort = (field: TransferSortField) => {
//         const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//         setSortField(field);
//         setSortDirection(newDirection);
//     };

//     // Get status color helper (keep as is)
//     const getStatusColor = (status: string) => {
//          switch (status?.toLowerCase()) {
//              case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400';
//              case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400';
//              case 'processing': return 'text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400';
//              case 'failed': return 'text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400';
//              case 'canceled': return 'text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400';
//              default: return 'text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400';
//          }
//     };

//     // Memoized options
//     const currencyOptions = useMemo(() => {
//         const codes = new Set(transfers.map(t => t.sendCurrency?.code).filter((code): code is string => Boolean(code) && code !== 'N/A'));
//         return ['all', ...Array.from(codes).sort()];
//     }, [transfers]);

//     // Use string array for status options
//     const statusOptions: string[] = useMemo(() => {
//         const statuses = new Set(transfers.map(t => t.status).filter(Boolean));
//         return ['all', ...Array.from(statuses).sort()];
//      }, [transfers]);

//     const refreshData = useCallback(() => {
//         fetchTransfers();
//     }, [fetchTransfers]);

//     // --- Pagination Calculation (Memoized) ---
//     const { currentTransfers, totalPages } = useMemo(() => {
//         const indexOfLastTransfer = currentPage * transfersPerPage;
//         const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
//         const paginatedData = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);
//         const pages = Math.ceil(filteredTransfers.length / transfersPerPage);
//         // Ensure currentPage is valid after filtering
//         if (currentPage > pages && pages > 0) {
//             // Use setCurrentPage in a useEffect triggered by totalPages change if direct setting causes issues
//             // For now, try direct setting, but be mindful of potential render loops
//              // setCurrentPage(pages); // Be cautious here
//              // Safer approach: Let pagination component handle clamping or use effect
//         }
//         return { currentTransfers: paginatedData, totalPages: pages };
//     }, [filteredTransfers, currentPage, transfersPerPage]);

//     // Effect to adjust current page if it becomes invalid after filtering/page size change
//      useEffect(() => {
//          if (totalPages > 0 && currentPage > totalPages) {
//              setCurrentPage(totalPages);
//          }
//           // Reset to 1 if filters result in no pages but there used to be pages
//          else if (totalPages === 0 && currentPage !== 1 && filteredTransfers.length === 0 && transfers.length > 0) {
//              // Only reset if filters cleared everything, not on initial load
//              // setCurrentPage(1); // Maybe not needed if pagination handles 0 pages gracefully
//          }
//      }, [currentPage, totalPages, filteredTransfers.length, transfers.length]);

//     // Pagination handlers
//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//              setCurrentPage(pageNumber);
//         } else if (pageNumber < 1 && totalPages > 0) {
//             setCurrentPage(1);
//         } else if (pageNumber > totalPages && totalPages > 0) {
//             setCurrentPage(totalPages);
//         }
//     };
//     const goToPreviousPage = () => paginate(currentPage - 1);
//     const goToNextPage = () => paginate(currentPage + 1);

//     // --- Bundle current filters into an object for GenericFilters prop ---
//     const currentFilterState: FiltersState = useMemo(() => ({
//         searchTerm,
//         fromDate, // Use string date
//         toDate,   // Use string date
//         statusFilter,
//         currencyFilter,
//         idFilter: transferIdFilter, // Map transferIdFilter to idFilter
//         amountFilter,
//         recipientFilter,         // Pass recipientFilter
//     }), [searchTerm, fromDate, toDate, statusFilter, currencyFilter, transferIdFilter, amountFilter, recipientFilter]);

//     return (
//         <div className="container mx-auto px-4 py-8 relative">
//             <div className="space-y-6">
//                 {/* Header */}
//                 <div className="flex flex-wrap justify-between items-center gap-4">
//                     <h1 className="text-2xl font-bold text-mainheading dark:text-white">Transfer Management</h1>
//                     <div className="flex flex-wrap justify-end gap-3 items-center">
//                         {/* Search moved to Filter modal, keep buttons */}
//                         <button
//                             onClick={() => setShowFilterModal(true)}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors"
//                         >
//                             <Filter size={18} />
//                             Filters
//                         </button>
//                         <button
//                             onClick={refreshData}
//                             disabled={isRefreshing || loadingTransfers}
//                             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             title="Refresh transfer data"
//                         >
//                             <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
//                             <span>Refresh</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success/Error Messages (Keep as is) */}
//                 <AnimatePresence>
//                     {successMessage && <motion.div /* ... */>{successMessage}</motion.div>}
//                 </AnimatePresence>
//                 <AnimatePresence>
//                     {error && <motion.div /* ... */>{error}</motion.div>}
//                 </AnimatePresence>

//                 {/* Pagination and Page Size Controls (Keep as is) */}
//                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                     <div className="flex items-center gap-2">
//                          <label htmlFor="transfersPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show:</label>
//                          <select id="transfersPerPage" value={transfersPerPage} onChange={(e) => handlePageSizeChange(Number(e.target.value))} className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-primarybox dark:text-white">
//                               {pageSizeOptions.map(size => <option key={size} value={size} className="dark:bg-dropdowncolor">{size}</option>)}
//                          </select>
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">entries</span>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                          Showing {filteredTransfers.length > 0 ? (currentPage - 1) * transfersPerPage + 1 : 0}
//                          - {Math.min(currentPage * transfersPerPage, filteredTransfers.length)}
//                          {" "}of {filteredTransfers.length} results
//                          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//                      </p>
//                  </div>

//                 {/* Transfers Table (Keep as is) */}
//                 <TransferTable
//                     filteredTransfers={currentTransfers} // Pass paginated data
//                     loadingTransfers={loadingTransfers}
//                     getStatusColor={getStatusColor}
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                 />

//                 {/* Pagination Component (Keep as is) */}
//                 {totalPages > 1 && (
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         paginate={paginate}
//                         goToPreviousPage={goToPreviousPage}
//                         goToNextPage={goToNextPage}
//                     />
//                 )}
//             </div>

//             {/* *** USE GENERIC FILTERS COMPONENT *** */}
//             <GenericFilters
//                 showFilterModal={showFilterModal}
//                 setShowFilterModal={setShowFilterModal}
//                 initialFilters={currentFilterState} // Pass the mapped state
//                 onApplyFilters={handleApplyFilters} // Pass the apply handler
//                 onClearFilters={handleClearAllFilters} // Pass the clear handler
//                 currencyOptions={currencyOptions} // Pass transfer currencies
//                 statusOptions={statusOptions} // Pass transfer statuses (as strings)
//                 // Customize labels/visibility for Transfers
//                 idFilterLabel="Transfer ID"
//                 idFilterPlaceholder="Filter by Transfer ID"
//                 recipientFilterLabel="Recipient Name"
//                 recipientFilterPlaceholder="Filter by Recipient"
//                 showRecipientFilter={true} // Enable the recipient filter field
//                 showIdFilter={true}
//                 showAmountFilter={true}
//                 showCurrencyFilter={true}
//                 showStatusFilter={true}
//                 showDateFilter={true}
//             />
//         </div >
//     );
// };

// export default AdminTransfersPage;


// new latest code 
// frontend/src/app/admin/transfers/page.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react"; // Added useMemo
import { useAuth } from "../../contexts/AuthContext";
import axios, { AxiosError } from "axios"; // Import AxiosError
import apiConfig from "../../config/apiConfig";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Search,
  Filter,
  RefreshCw,
  Send,
  ArrowRightLeft,
} from "lucide-react";

// Import components
import TransferTable from "../components/transfers/TransferTable";
import { TransferSortField } from "../components/transfers/TransferTableHeader";

// *** IMPORT THE GENERIC FILTER COMPONENT ***
import GenericFilters, { FiltersState } from "../components/GenericFilters"; // Adjust path if needed
import Pagination from "../components/Pagination";
import { BsSend } from "react-icons/bs";

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Transfer type (keep as is) ---
interface Transfer {
  _id: string;
  user: {
    fullName?: string;
    email?: string;
  };
  sendAmount: string;
  sendCurrency?: { code?: string };
  status: string;
  createdAt: string; // ISO date string
  recipient?: { accountHolderName?: string };
  // Add other properties as needed
}

// Helper function to parse date string (dd-MM-yyyy) to Date object
function parseDateString(dateString: string): Date | null {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length === 3) {
    // Basic check if parts look like numbers
    if (
      !/^\d+$/.test(parts[0]) ||
      !/^\d+$/.test(parts[1]) ||
      !/^\d+$/.test(parts[2])
    ) {
      console.warn("Invalid date parts:", parts);
      return null;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);

    // Additional validation for reasonable date values
    if (
      day < 1 ||
      day > 31 ||
      month < 0 ||
      month > 11 ||
      year < 1900 ||
      year > 3000
    ) {
      console.warn("Date components out of range:", { day, month, year });
      return null;
    }

    const date = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues

    // Final check to ensure the date wasn't rolled over
    if (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month &&
      date.getUTCDate() === day
    ) {
      return date;
    } else {
      console.warn("Date validation failed after construction:", dateString);
      return null;
    }
  }
  console.warn("Could not parse date string:", dateString);
  return null;
}

const AdminTransfersPage: React.FC = () => {
  const { token } = useAuth();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
  const [loadingTransfers, setLoadingTransfers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filter state
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // *** CHANGE dateRange state to use strings ***
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all"); // Use string
  const [transferIdFilter, setTransferIdFilter] = useState<string>("");
  const [amountFilter, setAmountFilter] = useState<string>("");
  const [currencyFilter, setCurrencyFilter] = useState<"all" | string>("all");
  const [recipientFilter, setRecipientFilter] = useState<string>("");

  // Sorting state (keep as is)
  const [sortField, setSortField] = useState<TransferSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination State (keep as is)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transfersPerPage, setTransfersPerPage] = useState<number>(10);
  const pageSizeOptions: number[] = [10, 25, 50];

  // Fetch transfers (keep as is, wrapped in useCallback)
  const fetchTransfers = useCallback(async () => {
    setLoadingTransfers(true);
    setIsRefreshing(true);
    setError(null);
    try {
      const response = await axios.get<{ data: Transfer[] } | Transfer[]>(
        "/admin/transfers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Robust data checking
      let transferData: Transfer[] = [];
      if (response.data && Array.isArray((response.data as any).data)) {
        transferData = (response.data as any).data;
      } else if (Array.isArray(response.data)) {
        transferData = response.data;
      } else {
        console.warn("API response format unexpected:", response.data);
        transferData = [];
      }
      // Add basic validation/defaults if needed
      const validatedData = transferData.map((t) => ({
        ...t,
        _id: String(t._id ?? ""),
        sendAmount: String(t.sendAmount ?? ""),
        status: String(t.status ?? "unknown"),
        createdAt: t.createdAt || new Date(0).toISOString(),
        user: t.user ?? { fullName: "N/A", email: "N/A" },
        recipient: t.recipient ?? { accountHolderName: "N/A" },
        sendCurrency: t.sendCurrency ?? { code: "N/A" },
      }));

      setTransfers(validatedData);
    } catch (err: unknown) {
      let message = "Failed to load transfers";
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>; // Type the error response data
        message =
          axiosError.response?.data?.message ||
          axiosError.message ||
          "An unexpected error occurred.";
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      setTransfers([]); // Clear data on error
      console.error("Error fetching transfers:", err);
    } finally {
      setLoadingTransfers(false);
      setIsRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTransfers();
    } else {
      setError("Authentication required.");
      setLoadingTransfers(false);
      setTransfers([]);
    }
  }, [token, fetchTransfers]);

  // Apply filters and sorting
  useEffect(() => {
    let results: Transfer[] = [...transfers];

    // Apply search filter (as before)
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        (transfer) =>
          transfer._id.toLowerCase().includes(lowerSearchTerm) ||
          transfer.user?.fullName?.toLowerCase().includes(lowerSearchTerm) ||
          transfer.user?.email?.toLowerCase().includes(lowerSearchTerm) ||
          transfer.recipient?.accountHolderName
            ?.toLowerCase()
            .includes(lowerSearchTerm)
      );
    }

    // Apply Transfer ID filter (using transferIdFilter state)
    if (transferIdFilter) {
      results = results.filter((transfer) =>
        transfer._id.toLowerCase().includes(transferIdFilter.toLowerCase())
      );
    }

    // Apply Amount filter (using amountFilter state)
    if (amountFilter) {
      const amount = parseFloat(amountFilter);
      if (!isNaN(amount)) {
        results = results.filter((transfer) => {
          const transferAmount = parseFloat(transfer.sendAmount);
          return !isNaN(transferAmount) && transferAmount === amount;
        });
      }
    }

    // Apply Currency filter (using currencyFilter state)
    if (currencyFilter !== "all") {
      results = results.filter(
        (transfer) => transfer.sendCurrency?.code === currencyFilter
      );
    }

    // Apply Recipient filter (using recipientFilter state)
    if (recipientFilter) {
      const lowerRecipientFilter = recipientFilter.toLowerCase();
      results = results.filter((transfer) =>
        transfer.recipient?.accountHolderName
          ?.toLowerCase()
          .includes(lowerRecipientFilter)
      );
    }

    // Apply status filter (using statusFilter state)
    if (statusFilter !== "all") {
      results = results.filter(
        (transfer) =>
          transfer.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply date range filter *** USING fromDate and toDate strings ***
    const fromDateObj = parseDateString(fromDate);
    const toDateObj = parseDateString(toDate);

    if (fromDateObj) {
      fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day UTC
      results = results.filter((transfer) => {
        try {
          const transferDate = new Date(transfer.createdAt); // Assume createdAt is ISO string
          return !isNaN(transferDate.getTime()) && transferDate >= fromDateObj;
        } catch {
          return false;
        }
      });
    }

    if (toDateObj) {
      toDateObj.setUTCHours(23, 59, 59, 999); // End of the day UTC
      results = results.filter((transfer) => {
        try {
          const transferDate = new Date(transfer.createdAt);
          return !isNaN(transferDate.getTime()) && transferDate <= toDateObj;
        } catch {
          return false;
        }
      });
    }

    // Apply sorting (keep sorting logic as is)
    if (sortField) {
      results.sort((a, b) => {
        let valueA: any;
        let valueB: any;

        switch (sortField) {
          case "user":
            valueA = a.user?.fullName?.toLowerCase() ?? "";
            valueB = b.user?.fullName?.toLowerCase() ?? "";
            break;
          case "amount":
            valueA = parseFloat(a.sendAmount) || 0;
            valueB = parseFloat(b.sendAmount) || 0;
            break;
          case "recipient":
            valueA = a.recipient?.accountHolderName?.toLowerCase() ?? "";
            valueB = b.recipient?.accountHolderName?.toLowerCase() ?? "";
            break;
          case "createdAt":
            valueA = new Date(a.createdAt).getTime() || 0;
            valueB = new Date(b.createdAt).getTime() || 0;
            break;
          case "status":
            valueA = a.status.toLowerCase();
            valueB = b.status.toLowerCase();
            break;
          case "_id":
            valueA = a._id;
            valueB = b._id;
            break;
          default:
            valueA = "";
            valueB = ""; // Should not happen with TransferSortField type
        }

        let comparison = 0;
        if (valueA < valueB) comparison = -1;
        else if (valueA > valueB) comparison = 1;

        return sortDirection === "asc" ? comparison : comparison * -1;
      });
    }

    setFilteredTransfers(results);
  }, [
    transfers,
    searchTerm,
    statusFilter,
    fromDate,
    toDate,
    sortField,
    sortDirection,
    transferIdFilter,
    amountFilter,
    currencyFilter,
    recipientFilter,
  ]); // Include new date states

  // --- Reset Page on Filter/Sort Change ---
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
    transferIdFilter,
    amountFilter,
    currencyFilter,
    recipientFilter,
    sortField,
    sortDirection,
  ]);

  // --- Callback for GenericFilters to apply selected filters ---
  const handleApplyFilters = useCallback((filters: FiltersState) => {
    setSearchTerm(filters.searchTerm);
    setFromDate(filters.fromDate); // Use string date
    setToDate(filters.toDate); // Use string date
    setStatusFilter(filters.statusFilter);
    // Map idFilter back to transferIdFilter
    setTransferIdFilter(filters.idFilter);
    setAmountFilter(filters.amountFilter);
    setCurrencyFilter(filters.currencyFilter);
    // Use recipientFilter, provide default empty string if undefined
    setRecipientFilter(filters.recipientFilter ?? "");
    // Page reset is handled by the useEffect above
  }, []); // No dependencies needed as it only uses setters

  // --- Callback for GenericFilters to clear all filters ---
  const handleClearAllFilters = useCallback(() => {
    setSearchTerm("");
    setFromDate(""); // Clear string date
    setToDate(""); // Clear string date
    setStatusFilter("all");
    setTransferIdFilter("");
    setAmountFilter("");
    setCurrencyFilter("all");
    setRecipientFilter("");
    // Optionally reset sorting
    // setSortField(null);
    // setSortDirection('asc');
    // Page reset is handled by the useEffect above
  }, []); // No dependencies needed

  // Page size change handler (keep as is)
  const handlePageSizeChange = (size: number) => {
    setTransfersPerPage(size);
    setCurrentPage(1);
  };

  // Toggle sort handler (keep as is)
  const toggleSort = (field: TransferSortField) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  // Get status color helper (keep as is)
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
      case "processing":
        return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
      case "failed":
        return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
      case "canceled":
        return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
    }
  };

  // Memoized options
  const currencyOptions = useMemo(() => {
    const codes = new Set(
      transfers
        .map((t) => t.sendCurrency?.code)
        .filter((code): code is string => Boolean(code) && code !== "N/A")
    );
    return ["all", ...Array.from(codes).sort()];
  }, [transfers]);

  // Use string array for status options
  const statusOptions: string[] = useMemo(() => {
    const statuses = new Set(transfers.map((t) => t.status).filter(Boolean));
    return ["all", ...Array.from(statuses).sort()];
  }, [transfers]);

  const refreshData = useCallback(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  // --- Pagination Calculation (Memoized) ---
  const { currentTransfers, totalPages } = useMemo(() => {
    const indexOfLastTransfer = currentPage * transfersPerPage;
    const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
    const paginatedData = filteredTransfers.slice(
      indexOfFirstTransfer,
      indexOfLastTransfer
    );
    const pages = Math.ceil(filteredTransfers.length / transfersPerPage);
    // Ensure currentPage is valid after filtering
    if (currentPage > pages && pages > 0) {
      // Use setCurrentPage in a useEffect triggered by totalPages change if direct setting causes issues
      // For now, try direct setting, but be mindful of potential render loops
      // setCurrentPage(pages); // Be cautious here
      // Safer approach: Let pagination component handle clamping or use effect
    }
    return { currentTransfers: paginatedData, totalPages: pages };
  }, [filteredTransfers, currentPage, transfersPerPage]);

  // Effect to adjust current page if it becomes invalid after filtering/page size change
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    // Reset to 1 if filters result in no pages but there used to be pages
    else if (
      totalPages === 0 &&
      currentPage !== 1 &&
      filteredTransfers.length === 0 &&
      transfers.length > 0
    ) {
      // Only reset if filters cleared everything, not on initial load
      // setCurrentPage(1); // Maybe not needed if pagination handles 0 pages gracefully
    }
  }, [currentPage, totalPages, filteredTransfers.length, transfers.length]);

  // Pagination handlers
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else if (pageNumber < 1 && totalPages > 0) {
      setCurrentPage(1);
    } else if (pageNumber > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };
  const goToPreviousPage = () => paginate(currentPage - 1);
  const goToNextPage = () => paginate(currentPage + 1);

  // --- Bundle current filters into an object for GenericFilters prop ---
  const currentFilterState: FiltersState = useMemo(
    () => ({
      searchTerm,
      fromDate, // Use string date
      toDate, // Use string date
      statusFilter,
      currencyFilter,
      idFilter: transferIdFilter, // Map transferIdFilter to idFilter
      amountFilter,
      recipientFilter, // Pass recipientFilter
    }),
    [
      searchTerm,
      fromDate,
      toDate,
      statusFilter,
      currencyFilter,
      transferIdFilter,
      amountFilter,
      recipientFilter,
    ]
  );

  return (
    <div className="container mx-auto px-4 py-5 relative">
      <div className="space-y-6">
        {/* Header Part */}
        <div className="flex sm:flex-row flex-col justify-between items-center gap-3">
          <div className="Management">
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
                <BsSend className="size-6 text-mainheading dark:text-primary" />
              </div>

              <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
                Send-Money Management
              </h1>
            </div>

            <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
              Track and manage all money transfers seamlessly with clear
              recipient details, currency types, and real-time transaction
              statuses.
            </p>
          </div>

          <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base sm:px-8 px-6 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
            >
              <Filter size={18} />
              Filters
            </button>
            <button
              onClick={refreshData}
              disabled={isRefreshing || loadingTransfers}
              className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 px-6 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh payment data"
            >
              <RefreshCw
                className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Pagination and Page Size Controls (Keep as is) */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="transfersPerPage"
              className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="transfersPerPage"
              value={transfersPerPage}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="dark:bg-dropdowncolor"
                >
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
              entries
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Showing{" "}
            {filteredTransfers.length > 0
              ? (currentPage - 1) * transfersPerPage + 1
              : 0}
            -{" "}
            {Math.min(currentPage * transfersPerPage, filteredTransfers.length)}{" "}
            of {filteredTransfers.length} results
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>

        {/* Transfers Table (Keep as is) */}
        <TransferTable
          filteredTransfers={currentTransfers} // Pass paginated data
          loadingTransfers={loadingTransfers}
          getStatusColor={getStatusColor}
          toggleSort={toggleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        {/* Pagination Component (Keep as is) */}
        {totalPages > 1 && !loadingTransfers && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}
      </div>

      {/* *** USE GENERIC FILTERS COMPONENT *** */}
      <GenericFilters
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        initialFilters={currentFilterState} // Pass the mapped state
        onApplyFilters={handleApplyFilters} // Pass the apply handler
        onClearFilters={handleClearAllFilters} // Pass the clear handler
        currencyOptions={currencyOptions} // Pass transfer currencies
        statusOptions={statusOptions} // Pass transfer statuses (as strings)
        // Customize labels/visibility for Transfers
        searchTermPlaceholder="Search User Name, Email or Recipient..."
        idFilterLabel="Transfer ID"
        idFilterPlaceholder="Filter by Transfer ID"
        recipientFilterLabel="Recipient Name"
        recipientFilterPlaceholder="Filter by Recipient"
        showRecipientFilter={true} // Enable the recipient filter field
        showIdFilter={true}
        showAmountFilter={true}
        showCurrencyFilter={true}
        showStatusFilter={true}
        showDateFilter={true}
      />
    </div>
  );
};

export default AdminTransfersPage;
