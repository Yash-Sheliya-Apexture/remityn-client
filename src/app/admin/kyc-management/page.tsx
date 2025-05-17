// // frontend/src/app/admin/kyc-management/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import kycAdminService from '../../services/admin/kyc.admin'; // Adjust path if needed
// import type { PendingKycUser } from '../../services/admin/kyc.admin'; // Import the type

// // Icons
// import { LuFileCheck, LuChevronRight } from 'react-icons/lu';
// import { FiAlertCircle } from "react-icons/fi";
// // --- Helper Functions (Keep as is) ---
// const formatDate = (dateInput?: string | Date): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//          if (isNaN(date.getTime())) return 'Invalid Date';
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
//         });
//     } catch (e) {
//         return 'Invalid Date';
//     }
// };

// // --- Custom Button Styling (Example for link styling) ---
// const viewDetailsLinkStyle = "inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors";

// const KycManagementPage: React.FC = () => {
//     // --- State Management (Keep as is) ---
//     const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // --- Data Fetching (Keep as is) ---
//     useEffect(() => {
//         const fetchPendingUsers = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const users = await kycAdminService.getPendingKycUsersAdmin();
//                 setPendingUsers(users);
//             } catch (err: any) {
//                 console.error("Failed to fetch pending KYC users:", err);
//                 setError(err.message || 'An unknown error occurred while fetching pending applications.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchPendingUsers();
//     }, []);

//     // --- Custom Render Functions ---

//     // --- Custom Loading Skeleton ---
//     const renderLoading = () => (
//         <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 animate-pulse">
//                     <thead className="bg-gray-50 dark:bg-gray-700/50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted At</th>
//                             <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                         {[...Array(5)].map((_, index) => ( // Render 5 skeleton rows
//                             <tr key={index}>
//                                 <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></td>
//                                 <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div></td>
//                                 <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div></td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 ml-auto"></div></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//              <div className="px-6 py-3 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
//                  Loading pending applications...
//              </div>
//         </div>
//     );

//     // --- Custom Error Message Display ---
//     const renderError = () => (
//         <div className="border-l-4 border-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md shadow-sm" role="alert">
//             <div className="flex items-center">
//                 <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
//                 <div>
//                     <p className="text-sm font-medium text-red-800 dark:text-red-300">Error Loading Data</p>
//                     <p className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>
//                     {/* Optional: Add a retry button */}
//                     {/* <button onClick={fetchPendingUsers} className="mt-2 text-sm font-medium text-red-700 dark:text-red-400 hover:underline">Retry</button> */}
//                 </div>
//             </div>
//         </div>
//     );

//     // --- Render Main Content (Table or No Data Message) ---
//     const renderContent = () => {
//         if (pendingUsers.length === 0) {
//             return (
//                 <div className="text-center py-16 px-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
//                     <LuFileCheck className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Pending Applications</h3>
//                     <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">There are currently no KYC applications awaiting review.</p>
//                 </div>
//             );
//         }

//         return (
//             // Replaces Table Component Wrapper
//             <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
//                 {/* Responsive Table Wrapper */}
//                 <div className="overflow-x-auto">
//                     {/* Standard HTML Table */}
//                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                         {/* Replaces TableHeader */}
//                         <thead className="bg-gray-50 dark:bg-gray-700/50">
//                             <tr>
//                                 {/* Replaces TableHead */}
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                                     Name
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                                     Email
//                                 </th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                                     Submitted At
//                                 </th>
//                                 <th scope="col" className="relative px-6 py-3">
//                                     <span className="sr-only">Actions</span> {/* Accessibility */}
//                                 </th>
//                             </tr>
//                         </thead>
//                         {/* Replaces TableBody */}
//                         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                             {pendingUsers.map((user) => (
//                                 // Replaces TableRow
//                                 <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors">
//                                     {/* Replaces TableCell */}
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName || 'N/A'}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-600 dark:text-gray-300">{formatDate(user.kyc?.submittedAt)}</div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                         {/* Link styled as a button, replaces Button */}
//                                         <Link href={`/admin/kyc-management/${user._id}`} className={viewDetailsLinkStyle}>
//                                             View Details
//                                             <LuChevronRight className="ml-1 h-3 w-3" />
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                  {/* Replaces TableCaption (optional footer) */}
//                  <div className="px-6 py-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
//                     List of users with pending KYC verification. Found {pendingUsers.length} application(s).
//                 </div>
//             </div>
//         );
//     };

//     // --- Main Component Return ---
//     return (
//         // Use Tailwind for overall page layout and padding
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto"> {/* Use a wider container for tables */}
//                  {/* Page Header */}
//                  <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KYC Management</h1>
//                     <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Review and manage user KYC applications.</p>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="mt-6">
//                      {isLoading ? renderLoading() : error ? renderError() : renderContent()}
//                  </div>
//             </div>
//         </div>
//     );
// };

// export default KycManagementPage;

// // frontend/src/app/admin/kyc-management/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import kycAdminService from '../../services/admin/kyc.admin'; // Adjust path
// import type { PendingKycUser } from '../../services/admin/kyc.admin'; // Type import

// // Icons
// import { FileClock, ChevronRight, Users, Inbox, Loader2, AlertCircle } from 'lucide-react'; // Lucide icons
// import { cn } from '@/lib/utils'; // Utility for class names

// // --- Helper Functions ---
// const formatDate = (dateInput?: string | Date): string => {
//     // ... (keep existing formatDate function)
//      if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//          if (isNaN(date.getTime())) return 'Invalid Date';
//         // More detailed format
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'//, timeZoneName: 'short'
//         });
//     } catch (e) {
//         return 'Invalid Date';
//     }
// };

// // --- KYC Management Page Component ---
// const KycManagementPage: React.FC = () => {
//     const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // --- Data Fetching ---
//     const fetchPendingUsers = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const users = await kycAdminService.getPendingKycUsersAdmin();
//             setPendingUsers(users);
//         } catch (err: any) {
//             console.error("Failed to fetch pending KYC users:", err);
//             setError(err.message || 'An unknown error occurred while fetching applications.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPendingUsers();
//     }, []); // Fetch on initial mount

//     // --- Custom Render Functions ---

//     // Loading Skeleton
//     const renderLoading = () => (
//         <div className="space-y-4 animate-pulse">
//              {/* Skeleton for the heading */}
//              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
//              {/* Skeleton for the table */}
//             <div className="border border-border rounded-lg overflow-hidden">
//                 <div className="w-full">
//                     {/* Skeleton Table Header */}
//                      <div className="h-12 bg-muted/50 dark:bg-muted/20 border-b border-border"></div>
//                      {/* Skeleton Table Rows */}
//                      {[...Array(4)].map((_, index) => (
//                         <div key={index} className="flex justify-between items-center p-4 border-b border-border last:border-b-0">
//                             <div className="space-y-1.5">
//                                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
//                                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
//                             </div>
//                             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
//                             <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );

//     // Error Message Display
//     const renderError = () => (
//         <div className="border-l-4 border-destructive bg-destructive/10 p-4 rounded-md" role="alert">
//             <div className="flex items-center">
//                 <AlertCircle className="h-5 w-5 text-destructive mr-3 flex-shrink-0" />
//                 <div>
//                     <p className="text-sm font-medium text-destructive/90 dark:text-red-300">Error Loading Pending Applications</p>
//                     <p className="mt-1 text-sm text-destructive/80 dark:text-red-400">{error}</p>
//                      <button onClick={fetchPendingUsers} className="mt-2 text-sm font-medium text-destructive/90 hover:underline">Retry</button>
//                 </div>
//             </div>
//         </div>
//     );

//     // Render Main Content (Table or No Data Message)
//     const renderContent = () => {
//         if (pendingUsers.length === 0) {
//             return (
//                 <div className="text-center py-16 px-6 border border-dashed border-border rounded-lg bg-muted/20 dark:bg-muted/10">
//                     <Inbox className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-medium text-foreground">All Clear!</h3>
//                     <p className="mt-1 text-sm text-muted-foreground">There are currently no KYC applications awaiting review.</p>
//                 </div>
//             );
//         }

//         // Render the list/table of pending users
//         return (
//              <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-card dark:bg-card">
//                  <ul role="list" className="divide-y divide-border">
//                      {pendingUsers.map((user) => (
//                          <li key={user._id} className="flex items-center justify-between gap-x-6 px-4 py-4 hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors sm:px-6">
//                              <div className="min-w-0">
//                                 <div className="flex items-start gap-x-3">
//                                     <p className="text-sm font-semibold leading-6 text-foreground">{user.fullName || 'N/A'}</p>
//                                      {/* Optional: Status Badge */}
//                                      {/* <span className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-700">
//                                         Pending
//                                     </span> */}
//                                 </div>
//                                 <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-muted-foreground">
//                                     <p className="whitespace-nowrap truncate" title={user.email}>{user.email}</p>
//                                     <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current"><circle cx={1} cy={1} r={1} /></svg>
//                                     <p className="whitespace-nowrap">
//                                          Submitted: <time dateTime={user.kyc?.submittedAt?.toString()}>{formatDate(user.kyc?.submittedAt)}</time>
//                                      </p>
//                                 </div>
//                              </div>
//                              <div className="flex flex-none items-center gap-x-4">
//                                 <Link
//                                      href={`/admin/kyc-management/${user._id}`}
//                                      className="inline-flex items-center gap-1 rounded-md bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted/80 dark:bg-secondary dark:text-foreground dark:ring-border/50 dark:hover:bg-secondary/80"
//                                 >
//                                      View<span className="sr-only">, {user.fullName}</span>
//                                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
//                                  </Link>
//                              </div>
//                          </li>
//                      ))}
//                  </ul>
//              </div>
//         );
//     };

//     // --- Main Component Return ---
//     return (
//         // Use Tailwind for overall page layout and padding
//         <div className="min-h-screen bg-background dark:bg-muted/20 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//                  {/* Page Header */}
//                  <div className="mb-8 border-b border-border pb-5">
//                     <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">KYC Management</h1>
//                     <p className="mt-2 text-sm text-muted-foreground">Review and manage user Know Your Customer (KYC) applications.</p>
//                 </div>

//                 {/* Pending Users Section */}
//                 <section>
//                      <div className="flex items-center gap-2 mb-4">
//                          <FileClock className="h-5 w-5 text-primary" />
//                          <h2 className="text-xl font-semibold text-foreground">Pending Applications ({isLoading ? '...' : pendingUsers.length})</h2>
//                      </div>
//                      {isLoading ? renderLoading() : error ? renderError() : renderContent()}
//                  </section>

//                  {/* Optional: Section for All Users (requires new endpoint/logic) */}
//                  {/*
//                  <section className="mt-12">
//                     <div className="flex items-center gap-2 mb-4">
//                          <Users className="h-5 w-5 text-muted-foreground" />
//                          <h2 className="text-xl font-semibold text-foreground">All Users</h2>
//                     </div>
//                     <p className="text-muted-foreground text-sm"> (Functionality to list/search all users with filters will be added here)</p>
//                     {/* Placeholder for future table/list of all users */}
//                  {/* </section> */}

//             </div>
//         </div>
//     );
// };

// export default KycManagementPage;

// // frontend/src/app/admin/kyc-management/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import kycAdminService from '../../services/admin/kyc.admin';
// import type { PendingKycUser } from '../../services/admin/kyc.admin';
// import { motion } from 'framer-motion';
// // Icons
// import {
//   FileClock,
//   ChevronRight,
//   Inbox,
//   AlertCircle,
//   RefreshCw
// } from 'lucide-react';
// import { Calendar, SortAsc } from "lucide-react"; // Example icons

// import { cn } from '@/lib/utils';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';
// import { Skeleton } from '@/components/ui/skeleton';

// // --- Helper Functions ---
// const formatDate = (dateInput?: string | Date): string => {
//   if (!dateInput) return 'N/A';
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return 'Invalid Date';
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   } catch (e) {
//     return 'Invalid Date';
//   }
// };

// const KycManagementPage: React.FC = () => {
//   const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
//   const [listKey, setListKey] = useState(0); // <-- 1. Add state for the key

//   // --- Data Fetching ---
//   const fetchPendingUsers = useCallback(async (isRefreshAction = false) => {
//     if (isRefreshAction) {
//       setIsRefreshing(true);
//     } else {
//       setIsLoading(true);
//     }
//     setError(null);

//     try {
//       const users = await kycAdminService.getPendingKycUsersAdmin();
//       setPendingUsers(users);
//       if (isRefreshAction) { // <-- 2. Update key only on successful refresh
//         setListKey(prevKey => prevKey + 1);
//       }
//     } catch (err: any) {
//       console.error("Failed to fetch pending KYC users:", err);
//       setError(err.message || 'An unknown error occurred while fetching applications.');
//     } finally {
//       if (isRefreshAction) {
//         setIsRefreshing(false);
//       } else {
//         setIsLoading(false);
//       }
//     }
//   }, []); // Added listKey to dependency array if you use it inside, but here it's only set
//   const clearSearchQuery = () => {
//     setSearchQuery("");
//   };

//   // --- Initial Data Fetch ---
//   useEffect(() => {
//     fetchPendingUsers(false);
//   }, [fetchPendingUsers]);

//   // --- Filtering and Sorting ---
//   const filteredUsers = pendingUsers.filter(user => {
//     if (!searchQuery) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       (user.fullName?.toLowerCase().includes(query) || false) ||
//       (user.email?.toLowerCase().includes(query) || false)
//     );
//   });

//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//      if (sortBy === 'name') {
//       return (a.fullName || '').localeCompare(b.fullName || '');
//     } else { // Default to date sort
//       const dateA = a.kyc?.submittedAt ? new Date(a.kyc.submittedAt).getTime() : 0;
//       const dateB = b.kyc?.submittedAt ? new Date(b.kyc.submittedAt).getTime() : 0;
//       return dateB - dateA; // Most recent first
//     }
//   });

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
//     };

//     checkMobileScreen(); // Initial check on mount

//     window.addEventListener("resize", checkMobileScreen); // Add listener for resize

//     return () => {
//       window.removeEventListener("resize", checkMobileScreen); // Cleanup listener on unmount
//     };
//   }, []);

//   // --- Render Functions ---

//   // Loading Skeleton
//   const renderLoading = () => (
//     <div className="space-y-4 animate-pulse mt-6">
//       {/* Added mt-6 */}
//       {/* Skeleton for the list part */}
//       <div className="border border-border rounded-lg p-4">
//         <div className="h-10 border-b border-border mb-4"></div> {/* Header */}
//         {[...Array(4)].map((_, i) => (
//           <div key={i} className="block">
//             <div className="block p-2 sm:p-4 rounded-2xl">
//               <div className="flex items-center gap-4">
//                 <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                   <div className="flex-grow">
//                     <Skeleton className="h-4 w-40 mb-2" />
//                     <Skeleton className="h-3 w-32" />
//                   </div>
//                   <div className="shrink-0">
//                     <Skeleton className="h-5 w-16 rounded-full" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Error Message Display (used for both initial load failure and refresh failure)
//   const renderError = () => (
//     <div className="border-l-4 border-destructive bg-destructive/10 p-4 rounded-md mt-6" role="alert"> {/* Added mt-6 */}
//       <div className="flex items-center">
//         <AlertCircle className="h-5 w-5 text-destructive mr-3 flex-shrink-0" />
//         <div>
//           <p className="text-sm font-medium text-destructive/90 dark:text-red-300">
//              {pendingUsers.length > 0 ? 'Error Refreshing Data' : 'Error Loading Applications'}
//           </p>
//           <p className="mt-1 text-sm text-destructive/80 dark:text-red-400">{error}</p>
//           <button
//             onClick={() => fetchPendingUsers(pendingUsers.length > 0)}
//             className="mt-2 text-sm font-medium text-destructive/90 hover:underline flex items-center gap-1 disabled:opacity-50"
//             disabled={isRefreshing || isLoading}
//           >
//             <RefreshCw className={cn("h-3 w-3", (isLoading || isRefreshing) && "animate-spin")} /> Retry
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Empty State
//   const renderEmptyState = () => (
//      <div className="text-center py-16 px-6 border border-dashed border-border rounded-lg bg-card mt-6"> {/* Use bg-card and mt-6 */}
//       <Inbox className="mx-auto h-12 w-12 text-neutral-900 dark:text-white mb-4" />
//       <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
//           {searchQuery ? 'No Matches Found' : 'All Clear!'}
//       </h3>
//       <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
//         {searchQuery
//           ? 'No applications match your current search and filters.'
//           : 'There are currently no KYC applications awaiting review.'}
//       </p>
//       {searchQuery && (
//         <button
//           onClick={() => setSearchQuery('')}
//           className="mt-4 text-sm font-medium text-primary hover:underline"
//         >
//           Clear Search
//         </button>
//       )}
//     </div>
//   );

//   // Render the user list
//   const renderUserList = () => (
//     <div
//       key={listKey} // <-- 3. Apply the key here
//       className={cn(
//         "border rounded-xl overflow-hidden mt-6", // Added mt-6 here as well
//         isRefreshing && "opacity-75 transition-opacity duration-300"
//       )}
//     >
//       {/* Header with count and sort */}
//       <div className="px-6 py-4 flex sm:flex-row flex-col items-center justify-between gap-2 border-b bg-lightgray dark:bg-primarybox">
//         <h4 className="text-lg font-semibold">
//           {filteredUsers.length}{" "}
//           {filteredUsers.length === 1 ? "Application" : "Applications"}
//         </h4>

//         <div className="inline-flex items-center rounded-full bg-white dark:bg-secondarybox p-1 gap-1">
//           <button
//             onClick={() => setSortBy("date")}
//             className={cn(
//               "text-sm px-4 py-2 font-medium rounded-full flex items-center gap-1.5 transition-all duration-200 ease-linearfocus:outline-none cursor-pointer",
//               sortBy === "date"
//                 ? "bg-primary text-neutral-900 shadow-sm" // Active state
//                 : "text-neutral-900 dark:text-white" // Inactive state
//             )}
//           >
//             <Calendar className="h-4 w-4" /> Date
//           </button>
//           <button
//             onClick={() => setSortBy("name")}
//             className={cn(
//               "text-sm px-4 py-2 font-medium rounded-full flex items-center gap-1.5 transition-all duration-200 ease-linear focus:outline-none cursor-pointer",
//               sortBy === "name"
//                 ? "bg-primary text-neutral-900 shadow-sm" // Active state
//                 : "text-neutral-900 dark:text-white" // Inactive state
//             )}
//           >
//             <SortAsc className="h-4 w-4" /> Name
//           </button>
//         </div>
//       </div>

//       {/* User List - Use motion.ul for potential list animations if needed */}
//       <motion.ul role="list" className="divide-y divide-border">
//         {sortedUsers.map((user, index) => ( // <-- Added index here
//           <motion.li // <-- Changed li to motion.li
//             key={user._id}
//             className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 " // Added subtle hover
//             // --- Framer Motion Props ---
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }} // Staggered delay and duration
//             // ---------------------------
//           >
//             <div className="min-w-0 w-full">
//               {/* User header with name and status */}
//               <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-1">
//                 <p className="font-medium text-neutral-900 dark:text-white truncate">
//                   {user.fullName || "N/A"}
//                 </p>
//                 <span className="rounded-full whitespace-nowrap px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400">
//                   Pending
//                 </span>
//               </div>

//               {/* User details with responsive layout */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
//                 <p
//                   className="truncate max-w-full sm:max-w-xs"
//                   title={user.email}
//                 >
//                   {user.email}
//                 </p>

//                 {/* Dot separator - hidden on mobile */}
//                 <svg
//                   viewBox="0 0 2 2"
//                   className="h-1 w-1 fill-current hidden sm:block flex-shrink-0"
//                 >
//                   <circle cx={1} cy={1} r={1} />
//                 </svg>

//                 <p className="flex-shrink-0">
//                   Submitted:{" "}
//                   <time dateTime={user.kyc?.submittedAt?.toString()}>
//                     {formatDate(user.kyc?.submittedAt)}
//                   </time>
//                 </p>
//               </div>
//             </div>

//             {/* Action button - full width on mobile, auto width on desktop */}
//             <Link
//               href={`/admin/kyc-management/${user._id}`}
//               className="mt-3 sm:mt-0 inline-flex items-center justify-center sm:justify-start gap-1 text-sm font-semibold px-4 py-2 text-neutral-900 dark:text-primary bg-primary dark:bg-primarybox hover:bg-primaryhover dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear sm:flex-shrink-0"
//             >
//               Review<span className="sr-only">, {user.fullName}</span>
//               <ChevronRight className="h-4 w-4" />
//             </Link>
//           </motion.li>
//         ))}
//       </motion.ul>
//     </div>
//   );

//   // --- Renders the Search/Refresh Controls ---
//   const renderControls = () => (
//     <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//       <div className="relative flex-1">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//           <FiSearch
//             className="size-5 text-neutral-900 dark:text-white"
//             aria-hidden="true"
//           />
//         </div>
//         <input
//           type="text"
//           className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Increased pr-10 to accommodate cancel icon
//           placeholder="Search by name or email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         {searchQuery && ( // Conditionally render the cancel icon
//           <button
//             onClick={clearSearchQuery}
//             className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer" // Position cancel icon
//           >
//             <MdCancel size={24} aria-hidden="true" />
//           </button>
//         )}
//       </div>

//       {/* Refresh Button */}
//       <button
//         onClick={() => fetchPendingUsers(true)}
//         disabled={isRefreshing || isLoading}
//         className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear"
//         title="Refresh KYC Application List"
//       >
//         <RefreshCw className={`size-5`} />
//         {!isMobile && <span>Refresh</span>}

//       </button>
//     </div>
//   );

//   // --- Renders the List, Empty State, or Refresh Error ---
//   const renderListData = () => (
//      <>
//         {sortedUsers.length === 0 ? renderEmptyState() : renderUserList()}
//         {/* Display error *only* if a refresh failed but we still have data */}
//         {error && !isLoading && pendingUsers.length > 0 && renderError()}
//      </>
//   );

//   // --- Component Return ---
//   return (
//     <div className="min-h-screen bg-white dark:bg-background">
//       <div className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold leading-tight text-mainheading dark:text-white sm:text-3xl">
//             KYC Management
//           </h1>
//           <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
//             Review and manage user Know Your Customer (KYC) applications.
//           </p>
//         </div>

//         {/* Section Header with Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-border pb-4">
//           <h2 className="inline-flex items-center gap-2 text-xl font-bold text-mainheading dark:text-white flex-shrink-0">
//             {" "}
//             {/* Added flex-shrink-0 */}
//             <FileClock className="h-5 w-5 text-primary" />
//             Pending Applications
//           </h2>
//           {/* Render controls here, but only when not initially loading or in full error state */}
//           {!isLoading &&
//             !(error && pendingUsers.length === 0) &&
//             renderControls()}
//         </div>

//         {/* Main Content Area (Loading, Error, or List Data) */}
//         {
//           isLoading
//             ? renderLoading() // Show skeleton only on initial load
//             : error && pendingUsers.length === 0
//             ? renderError() // Show big error only if initial load completely failed
//             : renderListData() // Render the list/empty state/refresh error
//         }
//       </div>
//     </div>
//   );
// };

// export default KycManagementPage;

// // frontend/src/app/admin/kyc-management/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import kycAdminService from '../../services/admin/kyc.admin';
// import type { PendingKycUser } from '../../services/admin/kyc.admin';
// import { motion } from 'framer-motion';

// // Icons
// import {
//   FileClock,
//   ChevronRight,
//   Inbox,
//   AlertCircle,
//   RefreshCw
// } from 'lucide-react';
// import { Calendar, SortAsc } from "lucide-react";

// import { cn } from '@/lib/utils';
// import { FiSearch } from 'react-icons/fi';
// import { MdCancel } from 'react-icons/md';
// import { Skeleton } from '@/components/ui/skeleton';

// // --- Helper Functions ---
// const formatDate = (dateInput?: string | Date): string => {
//   if (!dateInput) return 'N/A';
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return 'Invalid Date';
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   } catch (e) {
//     return 'Invalid Date';
//   }
// };

// const KycManagementPage: React.FC = () => {
//   const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
//   const [listKey, setListKey] = useState(0);
//   const [isMobile, setIsMobile] = useState(false); // Add isMobile state back

//   // --- Data Fetching ---
//   const fetchPendingUsers = useCallback(async (isRefreshAction = false) => {
//     if (isRefreshAction) {
//       setIsRefreshing(true);
//     } else {
//       // Only set setIsLoading on initial load
//       if (pendingUsers.length === 0) {
//          setIsLoading(true);
//       }
//     }
//     setError(null);

//     try {
//       // Simulate loading delay for skeleton visibility (remove in production)
//       // await new Promise(resolve => setTimeout(resolve, 1500));

//       const users = await kycAdminService.getPendingKycUsersAdmin();
//       setPendingUsers(users);
//       if (isRefreshAction) {
//         setListKey(prevKey => prevKey + 1);
//       }
//     } catch (err: any) {
//       console.error("Failed to fetch pending KYC users:", err);
//       setError(err.message || 'An unknown error occurred while fetching applications.');
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   }, [pendingUsers.length]);

//   const clearSearchQuery = () => {
//     setSearchQuery("");
//   };

//   // --- Initial Data Fetch ---
//   useEffect(() => {
//     if (isLoading && pendingUsers.length === 0) {
//        fetchPendingUsers(false);
//     }
//   }, [fetchPendingUsers, isLoading, pendingUsers.length]);

//   // --- Responsive Check ---
//   useEffect(() => {
//     const checkMobileScreen = () => {
//       // Use window.innerWidth directly inside the effect
//       setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []); // Empty dependency array ensures this runs once on mount and cleans up

//   // --- Filtering and Sorting ---
//   const filteredUsers = pendingUsers.filter(user => {
//     if (!searchQuery) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       (user.fullName?.toLowerCase().includes(query) || false) ||
//       (user.email?.toLowerCase().includes(query) || false)
//     );
//   });

//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//      if (sortBy === 'name') {
//       return (a.fullName || '').localeCompare(b.fullName || '');
//     } else {
//       const dateA = a.kyc?.submittedAt ? new Date(a.kyc.submittedAt).getTime() : 0;
//       const dateB = b.kyc?.submittedAt ? new Date(b.kyc.submittedAt).getTime() : 0;
//       return dateB - dateA;
//     }
//   });

//   // --- Render Functions ---

//   // Error Message Display
//   const renderError = () => (
//     <div className="border-l-4 border-destructive bg-destructive/10 p-4 rounded-md mt-6" role="alert">
//       <div className="flex items-center">
//         <AlertCircle className="h-5 w-5 text-destructive mr-3 flex-shrink-0" />
//         <div>
//           <p className="text-sm font-medium text-destructive/90 dark:text-red-300">
//              {error && pendingUsers.length > 0 ? 'Error Refreshing Data' : 'Error Loading Applications'}
//           </p>
//           <p className="mt-1 text-sm text-destructive/80 dark:text-red-400">{error}</p>
//           <button
//             onClick={() => fetchPendingUsers(pendingUsers.length > 0)}
//             className="mt-2 text-sm font-medium text-destructive/90 hover:underline flex items-center gap-1 disabled:opacity-50"
//             disabled={isRefreshing || isLoading}
//           >
//             <RefreshCw className={cn("h-3 w-3", (isLoading || isRefreshing) && "animate-spin")} /> Retry
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Empty State
//   const renderEmptyState = () => (
//      <div className="text-center py-16 px-6 border border-dashed border-border rounded-lg bg-card mt-6">
//       <Inbox className="mx-auto h-12 w-12 text-neutral-900 dark:text-white mb-4" />
//       <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
//           {searchQuery ? 'No Matches Found' : 'All Clear!'}
//       </h3>
//       <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
//         {searchQuery
//           ? 'No applications match your current search and filters.'
//           : 'There are currently no KYC applications awaiting review.'}
//       </p>
//       {searchQuery && (
//         <button
//           onClick={() => setSearchQuery('')}
//           className="mt-4 text-sm font-medium text-primary hover:underline"
//         >
//           Clear Search
//         </button>
//       )}
//     </div>
//   );

//   // Render the user list OR its skeleton loading state
//   const renderUserList = () => (
//     <div
//       key={listKey}
//       className={cn(
//         "border rounded-xl overflow-hidden mt-6",
//         isRefreshing && !isLoading && "opacity-75 transition-opacity duration-300"
//       )}
//     >
//       {/* Header: Skeleton or Actual */}
//       <div className="px-6 py-4 flex sm:flex-row flex-col items-center justify-between gap-2 border-b bg-lightgray dark:bg-primarybox">
//         {isLoading ? (
//           <Skeleton className="h-6 w-36" />
//         ) : (
//           <h4 className="text-lg font-semibold">
//             {filteredUsers.length}{" "}
//             {filteredUsers.length === 1 ? "Application" : "Applications"}
//           </h4>
//         )}
//         {isLoading ? (
//           <Skeleton className="h-10 w-48 rounded-full" />
//         ) : (
//           // Sorting
//           <div className="relative inline-flex items-center rounded-full bg-white dark:bg-secondarybox p-1 gap-1">
//           {/* Date Button */}
//           <button
//             onClick={() => setSortBy('date')}
//             // Make button relative, remove background/shadow from here
//             className={cn(
//               'relative text-sm px-4 py-2 font-medium rounded-full flex items-center gap-1.5 transition-colors duration-200 ease-linear focus:outline-none cursor-pointer z-10' // Ensure button content is above motion.div
//               // Text color is handled below based on active state
//             )}
//           >
//             {/* Animated Background - Conditionally rendered inside the ACTIVE button */}
//             {sortBy === 'date' && (
//               <motion.div
//                 layoutId="activeSortBackground" // Unique ID for the layout animation
//                 className="absolute inset-0 rounded-full bg-primary shadow-sm z-0" // Positioned behind content
//                 transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Customize animation
//               />
//             )}
//             {/* Button Content - Needs relative positioning and z-index to be above the background */}
//             <span
//               className={cn(
//                 'relative z-10 flex items-center gap-1.5', // Position content above background
//                 sortBy === 'date'
//                   ? 'text-neutral-900' // Active text color
//                   : 'text-neutral-900 dark:text-white' // Inactive text color
//               )}
//             >
//               <Calendar className="h-4 w-4" /> Date
//             </span>
//           </button>

//           {/* Name Button */}
//           <button
//             onClick={() => setSortBy('name')}
//             className={cn(
//               'relative text-sm px-4 py-2 font-medium rounded-full flex items-center gap-1.5 transition-colors duration-200 ease-linear focus:outline-none cursor-pointer z-10'
//             )}
//           >
//             {/* Animated Background - Conditionally rendered inside the ACTIVE button */}
//             {sortBy === 'name' && (
//               <motion.div
//                 layoutId="activeSortBackground" // SAME layoutId as the other button
//                 className="absolute inset-0 rounded-full bg-primary shadow-sm z-0"
//                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               />
//             )}
//              {/* Button Content */}
//             <span
//               className={cn(
//                 'relative z-10 flex items-center gap-1.5',
//                 sortBy === 'name'
//                   ? 'text-neutral-900' // Active text color
//                   : 'text-neutral-900 dark:text-white' // Inactive text color
//               )}
//             >
//               <SortAsc className="h-4 w-4" /> Name
//             </span>
//           </button>
//         </div>
//         )}
//       </div>

//       {/* List Body: Skeleton or Actual */}
//       {isLoading ? (
//         <div className="divide-y divide-border">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
//               <div className="min-w-0 w-full space-y-2">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <Skeleton className="h-5 w-32" />
//                   <Skeleton className="h-5 w-16 rounded-full" />
//                 </div>
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                   <Skeleton className="h-4 w-48" />
//                   <Skeleton className="h-4 w-40 " />
//                 </div>
//               </div>
//               <Skeleton className="h-9 w-full sm:w-28 rounded-full mt-3 sm:mt-0 flex-shrink-0" />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <motion.ul role="list" className="divide-y divide-border">
//           {sortedUsers.map((user, index) => (
//             <motion.li
//               key={user._id}
//               className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-lightgray/50 dark:hover:bg-secondarybox/30 transition-colors duration-150"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05, duration: 0.3 }}
//             >
//               {/* Actual user data */}
//               <div className="min-w-0 w-full">
//                 <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-1">
//                   <p className="font-medium text-neutral-900 dark:text-white truncate">{user.fullName || "N/A"}</p>
//                   <span className="rounded-full whitespace-nowrap px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400">Pending</span>
//                 </div>
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
//                   <p className="truncate max-w-full sm:max-w-xs" title={user.email}>{user.email}</p>
//                   <svg viewBox="0 0 2 2" className="h-1 w-1 fill-current hidden sm:block flex-shrink-0"><circle cx={1} cy={1} r={1} /></svg>
//                   <p className="flex-shrink-0">Submitted: <time dateTime={user.kyc?.submittedAt?.toString()}>{formatDate(user.kyc?.submittedAt)}</time></p>
//                 </div>
//               </div>
//               <Link href={`/admin/kyc-management/${user._id}`} className="mt-3 sm:mt-0 inline-flex items-center justify-center sm:justify-start gap-1 text-sm font-semibold px-4 py-2 text-neutral-900 dark:text-primary bg-primary dark:bg-primarybox hover:bg-primaryhover dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear sm:flex-shrink-0">
//                 Review<span className="sr-only">, {user.fullName}</span>
//                 <ChevronRight className="h-4 w-4" />
//               </Link>
//             </motion.li>
//           ))}
//         </motion.ul>
//       )}
//     </div>
//   );

//   // --- Renders the Search/Refresh Controls ---
//   // This function now ONLY renders the actual controls, not skeletons
//   const renderControls = () => (
//     <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//       {/* Search Input */}
//       <div className="relative flex-1">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//           <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//         </div>
//         <input
//           type="text"
//           className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//           placeholder="Search by name or email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           disabled={isRefreshing} // Only disable during refresh, as controls aren't shown during initial load
//         />
//         {searchQuery && (
//           <button
//             onClick={clearSearchQuery}
//             className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//             disabled={isRefreshing}
//           >
//             <MdCancel size={24} aria-hidden="true" />
//           </button>
//         )}
//       </div>

//       {/* Refresh Button */}
//       <button
//         onClick={() => fetchPendingUsers(true)}
//         disabled={isRefreshing} // Only disable during refresh
//         className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
//         title="Refresh KYC Application List"
//       >
//         <RefreshCw className={cn("size-5", isRefreshing && "animate-spin")} /> {/* Spin only on refresh */}
//         {!isMobile && <span>Refresh</span>}
//       </button>
//     </div>
//   );

//   // --- Renders the List/Empty State/Refresh Error ---
//    const renderListData = () => {
//       // If loading, show the skeleton structure via renderUserList
//       if (isLoading) {
//           return renderUserList();
//       }
//       // If not loading, but there was an error fetching initial data
//       if (error && pendingUsers.length === 0) {
//          return renderError(); // Show full page error
//       }
//       // If not loading and no errors (or refresh error), show list or empty state
//       return (
//          <>
//             {/* Use sortedUsers length to decide between empty state and list */}
//             {sortedUsers.length === 0 ? renderEmptyState() : renderUserList()}
//             {/* Display refresh error separately if data exists */}
//             {error && pendingUsers.length > 0 && !isRefreshing && renderError()}
//          </>
//       );
//   };

//   // --- Component Return ---
//   return (
//     <div className="min-h-screen bg-white dark:bg-background">
//       <div className="container mx-auto px-4 py-8">

//         {/* Page Header: Skeleton or Actual */}
//         <div className="mb-8">
//           {isLoading ? (
//             <>
//               <Skeleton className="h-10 w-64 mb-3" /> {/* Skeleton for h1 */}
//               <Skeleton className="h-4 sm:w-2/3 w-full" />    {/* Skeleton for p */}
//             </>
//           ) : (
//             <>
//               <h1 className="text-2xl font-bold leading-tight text-mainheading dark:text-white sm:text-3xl">
//                 KYC Management
//               </h1>
//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
//                 Review and manage user Know Your Customer (KYC) applications.
//               </p>
//             </>
//           )}
//         </div>

//         {/* Section Header with Controls: Skeleton or Actual */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-border pb-4">
//            {isLoading ? (
//              <>
//                 {/* Skeleton for Section Title */}
//                 <Skeleton className="h-8 w-48 flex-shrink-0" />
//                 {/* Skeleton for Controls Area */}
//                 <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//                    <Skeleton className="h-12 sm:w-64 w-full rounded-full" /> {/* Search Skeleton */}
//                    <Skeleton className="sm:h-12 sm:w-28 size-12 rounded-full flex-shrink-0" /> {/* Refresh Button Skeleton */}
//                 </div>
//              </>
//            ) : (
//              <>
//                 {/* Actual Section Title */}
//                 <h2 className="inline-flex items-center gap-2 text-xl font-bold text-mainheading dark:text-white flex-shrink-0">
//                     <FileClock className="h-5 w-5 text-primary" />
//                     Pending Applications
//                 </h2>
//                 {/* Actual Controls (Rendered only if no initial load error) */}
//                 {!(error && pendingUsers.length === 0) && renderControls()}
//             </>
//            )}
//         </div>

//         {/* Main Content Area (List Data, Empty, or Error) */}
//         {renderListData()}

//       </div>
//     </div>
//   );
// };

// export default KycManagementPage;

// frontend/src/app/admin/kyc-management/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react"; // Added useMemo
import Link from "next/link";
import kycAdminService from "../../services/admin/kyc.admin";
import type { PendingKycUser } from "../../services/admin/kyc.admin";
import { motion } from "framer-motion";

// Icons
import {
  FileClock,
  ChevronRight,
  Inbox,
  AlertCircle,
  RefreshCw,
  Calendar,
  SortAsc,
  X, // Import X for closing messages
  ShieldUser,
  ListChecks,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { FiSearch } from "react-icons/fi";
import {
  MdCancel,
  MdManageAccounts,
  MdOutlineAccessTime,
} from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";

// Import Pagination Component
import Pagination from "../components/Pagination"; // Adjust path as needed

// --- Helper Functions ---
const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "Invalid Date";
  }
};

const KycManagementPage: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingKycUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [listKey, setListKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Changed name for clarity
  const pageSizeOptions: number[] = [10, 25, 50];

  // --- Data Fetching ---
  const fetchPendingUsers = useCallback(
    async (isRefreshAction = false) => {
      if (isRefreshAction) {
        setIsRefreshing(true);
      } else {
        // Only set setIsLoading on initial load or if users array is empty
        if (pendingUsers.length === 0) {
          setIsLoading(true);
        }
      }
      setError(null); // Clear error before fetch

      try {
        const users = await kycAdminService.getPendingKycUsersAdmin();
        setPendingUsers(users);
        if (isRefreshAction) {
          setListKey((prevKey) => prevKey + 1);
        }
      } catch (err: any) {
        console.error("Failed to fetch pending KYC users:", err);
        setError(
          err.message ||
            "An unknown error occurred while fetching applications."
        );
        // Don't clear pendingUsers on refresh error, only on initial load error
        if (!isRefreshAction) {
          setPendingUsers([]);
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [pendingUsers.length]
  ); // Dependency on pendingUsers.length to handle initial load state

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  // --- Initial Data Fetch ---
  useEffect(() => {
    // Fetch only if loading is true AND there are no users yet.
    // This prevents refetching just because isLoading was true momentarily.
    if (isLoading && pendingUsers.length === 0) {
      fetchPendingUsers(false);
    }
  }, [fetchPendingUsers, isLoading, pendingUsers.length]);

  // --- Responsive Check ---
  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    };
    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => {
      window.removeEventListener("resize", checkMobileScreen);
    };
  }, []);

  // --- Filtering and Sorting ---
  const filteredUsers = useMemo(() => {
    return pendingUsers.filter((user) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        user.fullName?.toLowerCase().includes(query) ||
        false ||
        user.email?.toLowerCase().includes(query) ||
        false
      );
    });
  }, [pendingUsers, searchQuery]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortBy === "name") {
        return (a.fullName || "").localeCompare(b.fullName || "");
      } else {
        // Default to date sort
        const dateA = a.kyc?.submittedAt
          ? new Date(a.kyc.submittedAt).getTime()
          : 0;
        const dateB = b.kyc?.submittedAt
          ? new Date(b.kyc.submittedAt).getTime()
          : 0;
        return dateB - dateA; // Descending (latest first)
      }
    });
  }, [filteredUsers, sortBy]);

  // --- Reset Page on Filter/Sort Change ---
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, itemsPerPage]); // Also reset on itemsPerPage change

  // --- Pagination Calculation ---
  const { currentUsers, totalPages } = useMemo(() => {
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const paginatedData = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const pages = Math.ceil(sortedUsers.length / itemsPerPage);
    return { currentUsers: paginatedData, totalPages: pages };
  }, [sortedUsers, currentPage, itemsPerPage]);

  // --- Effect to Adjust Page if it becomes invalid ---
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages); // Go to last available page
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1); // Reset to 1 if no pages
    }
  }, [currentPage, totalPages]);

  // --- Pagination Handlers ---
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
    else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
    else if (pageNumber > totalPages && totalPages > 0)
      setCurrentPage(totalPages);
    // Do nothing if totalPages is 0
  };
  const goToPreviousPage = () => paginate(currentPage - 1);
  const goToNextPage = () => paginate(currentPage + 1);

  // --- Page Size Handler ---
  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    // No need to reset currentPage here, the useEffect above handles it
  };

  // --- Render Functions ---

  // Error Message Display
  const renderError = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center mt-4"
      role="alert"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="text-red-600 dark:text-red-400" size={18} />
        <div>
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            {error && pendingUsers.length > 0
              ? "Error Refreshing Data"
              : "Error Loading Applications"}
          </p>
          <p className="mt-1 text-xs text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Retry button only makes sense if there was an error */}
        <button
          onClick={() => fetchPendingUsers(pendingUsers.length > 0)} // Pass true if refreshing existing data
          className="text-xs font-medium text-red-600 dark:text-red-300 hover:underline flex items-center gap-1 disabled:opacity-50"
          disabled={isRefreshing || isLoading}
        >
          <RefreshCw
            className={cn(
              "h-3 w-3",
              (isLoading || isRefreshing) && "animate-spin"
            )}
          />{" "}
          Retry
        </button>
        <button
          onClick={() => setError(null)}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );

  // Empty State (Considers search query)

  const renderEmptyState = () => (
    <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
      <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
        <ListChecks className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
      </div>
      <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
        {searchQuery ? "No Matches Found" : "All Clear KYC !"}
      </h2>

      <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
        {searchQuery
          ? "No applications match your current search query."
          : "There are currently no KYC applications awaiting review so you can try agaain."}
      </p>
    </div>
  );

  // Render the user list OR its skeleton loading state
  const renderUserList = () => (
    <div
      key={listKey} // Used for refresh animation trigger
      className={cn(
        "border rounded-xl overflow-hidden mt-5", // Keep mt-6 here
        isRefreshing &&
          !isLoading &&
          "opacity-75 transition-opacity duration-300"
      )}
    >
      {/* Header: Skeleton or Actual */}
      <div className="px-6 py-4 flex sm:flex-row flex-col items-center justify-between gap-4 bg-lightgray dark:bg-primarybox">
        {isLoading ? (
          <Skeleton className="h-6 w-36" />
        ) : (
          <h4 className="text-lg font-semibold">
            {/* Show total filtered count, not just current page count */}
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "Application" : "Applications"}
          </h4>
        )}

        {isLoading ? (
          <Skeleton className="h-10 w-44 rounded-full" />
        ) : (
          // Sorting Controls (unchanged)
          <div className="relative inline-flex items-center rounded-full bg-white dark:bg-primarybox p-1 gap-1">
            {/* Date Button */}
            <button
              onClick={() => setSortBy("date")}
              className={cn(
                "relative text-sm px-4 py-2 font-medium rounded-full flex items-center gap-1.5 transition-colors duration-200 ease-linear focus:outline-none cursor-pointer z-10"
              )}
            >
              {sortBy === "date" && (
                <motion.div
                  layoutId="activeSortBackground"
                  className="absolute inset-0 rounded-full bg-primary shadow-sm z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-center gap-1.5",
                  sortBy === "date"
                    ? "text-neutral-900"
                    : "text-neutral-900 dark:text-white"
                )}
              >
                <Calendar className="h-4 w-4" /> Date
              </span>
            </button>

            {/* Name Button */}
            <button
              onClick={() => setSortBy("name")}
              className={cn(
                "relative text-sm px-4 py-2 font-medium rounded-full flex items-center gap-1.5 transition-colors duration-200 ease-linear focus:outline-none cursor-pointer z-10"
              )}
            >
              {sortBy === "name" && (
                <motion.div
                  layoutId="activeSortBackground"
                  className="absolute inset-0 rounded-full bg-primary shadow-sm z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-center gap-1.5",
                  sortBy === "name"
                    ? "text-neutral-900"
                    : "text-neutral-900 dark:text-white"
                )}
              >
                <SortAsc className="h-4 w-4" /> Name
              </span>
            </button>
          </div>
        )}
      </div>

      {/* List Body: Skeleton or Actual */}
      {isLoading ? (
        // Skeleton Loading State (Unchanged)
        <div className="divide-y divide-border">
          {[...Array(itemsPerPage)].map(
            (
              _,
              i // Show skeletons based on itemsPerPage
            ) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0 w-full space-y-2">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Skeleton className="h-5 w-38" />
                    <Skeleton className="h-5 w-18 rounded-full" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                </div>
                <Skeleton className="h-9 w-full sm:w-24 rounded-full mt-3 sm:mt-0 flex-shrink-0" />
              </div>
            )
          )}
        </div>
      ) : (
        // Actual User List (Uses currentUsers for pagination)
        <motion.ul role="list" className="divide-y divide-border">
          {currentUsers.map((user, index) => (
            <motion.li
              key={user._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* User data */}
              <div className="min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-1">
                  <p className="font-medium text-neutral-900 dark:text-white truncate">
                    {user.fullName || "N/A"}
                  </p>
                  <span className="rounded-full whitespace-nowrap px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400">
                    Pending
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                  <p
                    className="truncate max-w-full sm:max-w-xs"
                    title={user.email}
                  >
                    {user.email}
                  </p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-1 w-1 fill-current hidden sm:block flex-shrink-0"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="flex-shrink-0">
                    Submitted:{" "}
                    <time dateTime={user.kyc?.submittedAt?.toString()}>
                      {formatDate(user.kyc?.submittedAt)}
                    </time>
                  </p>
                </div>
              </div>
              {/* Link to review page */}
              <Link
                href={`/admin/kyc-management/${user._id}`}
                className="mt-3 sm:mt-0 inline-flex items-center justify-center sm:justify-start gap-1 text-sm font-semibold px-4 py-2 text-neutral-900 dark:text-primary bg-primary dark:bg-primarybox hover:bg-primaryhover dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear sm:flex-shrink-0"
              >
                Review<span className="sr-only">, {user.fullName}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );

  // --- Renders the Search/Refresh Controls ---
  const renderControls = () => (
    <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FiSearch
            className="size-5 text-neutral-900 dark:text-white"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isRefreshing || isLoading} // Disable during initial load or refresh
        />
        {searchQuery && (
          <button
            onClick={clearSearchQuery}
            className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
            disabled={isRefreshing || isLoading}
          >
            <MdCancel size={24} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={() => fetchPendingUsers(true)} // Always trigger refresh
        disabled={isRefreshing || isLoading} // Disable during initial load or refresh
        className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
        title="Refresh KYC Application List"
      >
        <RefreshCw
          className={cn(
            "size-5",
            (isRefreshing || isLoading) && "animate-spin"
          )}
        />
        {!isMobile && <span>Refresh</span>}
      </button>
    </div>
  );

  // --- Renders the List/Empty State/Error Logic ---
  const renderListData = () => {
    // Initial Loading: Show skeletons for controls and list
    if (isLoading && pendingUsers.length === 0) {
      // Skeleton for list is handled within renderUserList
      return renderUserList();
    }

    // Initial Load Error: Show only the error message
    if (error && pendingUsers.length === 0 && !isLoading) {
      return renderError();
    }

    // Data Loaded (or refreshing): Show list or empty state
    return (
      <>
        {/* Show Empty State if NO filtered users, otherwise show list */}
        {filteredUsers.length === 0 ? renderEmptyState() : renderUserList()}

        {/* Pagination Controls - Show only if more than one page AND not loading */}
        {totalPages > 1 && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}

        {/* Refresh Error - Show below list/pagination if data exists */}
        {error &&
          pendingUsers.length > 0 &&
          !isLoading &&
          !isRefreshing &&
          renderError()}
      </>
    );
  };

  // --- Component Return ---
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="container mx-auto px-4 py-5">
        {/* Page Header: Skeleton or Actual */}
        <div className="mb-8">
          {isLoading && pendingUsers.length === 0 ? (
            <div>
              <Skeleton className="h-10 w-64 mb-3" /> {/* Skeleton for h1 */}
              <Skeleton className="h-4 sm:w-2/3 w-full" />{" "}
            </div>
          ) : (
            <div className="Management">
              <div className="flex flex-wrap items-center gap-3">
                <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
                  <MdManageAccounts className="size-6 text-mainheading dark:text-primary" />
                </div>

                <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
                  KYC Management
                </h1>
              </div>

              <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
                Easily review and manage Know Your Customer (KYC) applications.
                Track pending verifications and ensure compliance with secure
                identity checks — all from one central dashboard.{" "}
              </p>
            </div>
          )}
        </div>

        {/* Section Header with Controls: Skeleton or Actual */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-border pb-4">
          {isLoading && pendingUsers.length === 0 ? (
            <>
              {/* Skeleton for Section Title */}
              <Skeleton className="h-8 w-48 flex-shrink-0" />
              {/* Skeleton for Controls Area */}
              <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
                <Skeleton className="h-12.5 sm:w-64 w-full rounded-full" />{" "}
                {/* Search Skeleton */}
                <Skeleton className="sm:h-12.5 sm:w-28 size-12.5 rounded-full flex-shrink-0" />{" "}
                {/* Refresh Button Skeleton */}
              </div>
            </>
          ) : (
            <>
              {/* Actual Section Title */}
              <h2 className="inline-flex items-center gap-2 text-xl font-bold text-mainheading dark:text-white flex-shrink-0">
                <FileClock className="h-5 w-5 text-primary" />
                Pending 
              </h2>

              {/* Actual Controls (Rendered only if no initial load error) */}
              {!(error && pendingUsers.length === 0) && renderControls()}
            </>
          )}
        </div>

        {/* Pagination and Page Size Controls - Render only when not loading initial data */}
        {!isLoading &&
          !(error && pendingUsers.length === 0) &&
          filteredUsers.length > 0 && (
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="itemsPerPage"
                  className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
                >
                  Show:
                </label>

                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
                  disabled={isLoading || isRefreshing} // Disable while loading/refreshing
                >
                  {pageSizeOptions.map((size) => (
                    <option
                      key={size}
                      value={size}
                      className="dark:bg-dropdowncolor cursor-pointer"
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
                {filteredUsers.length > 0
                  ? (currentPage - 1) * itemsPerPage + 1
                  : 0}
                - {Math.min(currentPage * itemsPerPage, filteredUsers.length)}{" "}
                of {filteredUsers.length} results
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>
          )}

        {/* Main Content Area (List Data, Empty, or Error) */}
        {renderListData()}
      </div>
    </div>
  );
};

export default KycManagementPage;
