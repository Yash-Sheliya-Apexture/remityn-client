// // frontend/src/app/admin/users/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed
// import userAdminService from '../../services/admin/user.admin'; // Adjust path
// import type { AdminUserListItem } from '../../services/admin/user.admin'; // Adjust path
// import UserTable from '../components/users/UserTable'; // Adjust path
// import type { UserSortField } from '../components/users/UserTableHeader'; // Adjust path
// import Pagination from '../components/Pagination'; // Adjust path
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button'; // Import button
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import select
// import { RefreshCw, Search, Users, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { debounce } from 'lodash'; // For debouncing search input
// import { FiAlertCircle } from 'react-icons/fi';

// const AdminUsersPage: React.FC = () => {
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const [users, setUsers] = useState<AdminUserListItem[]>([]);
//     const [filteredUsers, setFilteredUsers] = useState<AdminUserListItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     // Filtering & Sorting State
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [sortField, setSortField] = useState<UserSortField | null>('createdAt'); // Default sort
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default newest first

//     // Pagination State
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [usersPerPage, setUsersPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50, 100];

//     // Fetching Data
//     const fetchUsers = useCallback(async (isRefresh = false) => {
//         if (!isAdmin) { // Prevent fetching if not admin
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//              setIsRefreshing(false);
//              return;
//         }
//         if (!isRefresh) setLoading(true);
//         setIsRefreshing(true);
//         setError(null);
//         try {
//             const data = await userAdminService.getAllUsersAdmin();
//             setUsers(data);
//         } catch (err: any) {
//             setError(err.message || 'Failed to load users.');
//             setUsers([]);
//         } finally {
//             if (!isRefresh) setLoading(false);
//             setIsRefreshing(false);
//         }
//     }, [isAdmin]); // Added isAdmin dependency

//     useEffect(() => {
//         if (authLoading) return; // Wait for auth check

//         if (token && isAdmin) {
//             fetchUsers(false);
//         } else if (!token) {
//              setError("Authentication required.");
//              setLoading(false);
//         } else if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//         }
//     }, [token, isAdmin, authLoading, fetchUsers]);

//     // Debounced search handler
//     const debouncedSearch = useCallback(
//         debounce((term: string) => {
//             setSearchTerm(term);
//         }, 300), // 300ms delay
//         [] // No dependencies needed for debounce itself
//     );

//     // Filtering and Sorting Logic
//     useEffect(() => {
//         let results: AdminUserListItem[] = [...users];

//         if (searchTerm) {
//             const lowerSearch = searchTerm.toLowerCase();
//             results = results.filter(user =>
//                 user.fullName?.toLowerCase().includes(lowerSearch) ||
//                 user.email?.toLowerCase().includes(lowerSearch) ||
//                 user._id.toLowerCase().includes(lowerSearch)
//             );
//         }

//         if (sortField) {
//             results.sort((a, b) => {
//                 let valueA: any;
//                 let valueB: any;
//                 const getNestedValue = (obj: any, path: string): any => path.split('.').reduce((acc, part) => acc?.[part], obj);

//                 if (sortField.startsWith('kyc.')) {
//                     valueA = getNestedValue(a, sortField);
//                     valueB = getNestedValue(b, sortField);
//                 } else {
//                     valueA = a[sortField as keyof AdminUserListItem];
//                     valueB = b[sortField as keyof AdminUserListItem];
//                 }

//                 // Type handling for comparison
//                 const typeA = typeof valueA;
//                 const typeB = typeof valueB;

//                 // Handle date sorting robustly
//                 if (sortField === 'createdAt' || sortField === 'kyc.dateOfBirth') {
//                     const dateA = valueA ? new Date(valueA).getTime() : 0;
//                     const dateB = valueB ? new Date(valueB).getTime() : 0;
//                     valueA = isNaN(dateA) ? (sortDirection === 'desc' ? -Infinity : Infinity) : dateA; // Handle invalid dates for sorting
//                     valueB = isNaN(dateB) ? (sortDirection === 'desc' ? -Infinity : Infinity) : dateB;
//                 }
//                 // Handle string comparison
//                 else if (typeA === 'string' && typeB === 'string') {
//                     valueA = valueA.toLowerCase();
//                     valueB = valueB.toLowerCase();
//                 }
//                 // Handle potentially mixed types or nulls/undefined
//                 else {
//                      valueA = valueA ?? (typeA === 'number' ? 0 : ''); // Default nulls appropriately
//                      valueB = valueB ?? (typeB === 'number' ? 0 : '');
//                 }

//                 let comparison = 0;
//                 if (valueA < valueB) comparison = -1;
//                 else if (valueA > valueB) comparison = 1;

//                 return sortDirection === 'asc' ? comparison : comparison * -1;
//             });
//         }

//         setFilteredUsers(results);

//     }, [users, searchTerm, sortField, sortDirection]);

//      // --- Reset Page on Filter/Sort Change ---
//      useEffect(() => {
//          if (currentPage !== 1) {
//               setCurrentPage(1);
//          }
//      }, [searchTerm, sortField, sortDirection]); // Only trigger on these changes

//     // Pagination Calculation
//     const { currentUsers, totalPages } = useMemo(() => {
//         const indexOfLastUser = currentPage * usersPerPage;
//         const indexOfFirstUser = indexOfLastUser - usersPerPage;
//         const paginatedData = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//         const pages = Math.ceil(filteredUsers.length / usersPerPage);
//         return { currentUsers: paginatedData, totalPages: pages };
//     }, [filteredUsers, currentPage, usersPerPage]);

//      // --- Effect to Adjust Page if it becomes invalid ---
//      useEffect(() => {
//          if (totalPages > 0 && currentPage > totalPages) {
//              setCurrentPage(totalPages);
//          }
//      }, [currentPage, totalPages]);

//     // Handlers
//     const handlePageSizeChange = (value: string) => {
//         setUsersPerPage(Number(value));
//         setCurrentPage(1); // Reset to first page when size changes
//     };

//     const toggleSort = (field: UserSortField) => {
//         const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//         setSortField(field);
//         setSortDirection(newDirection);
//     };

//     const paginate = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     };
//     const goToPreviousPage = () => paginate(currentPage - 1);
//     const goToNextPage = () => paginate(currentPage + 1);

//     const refreshData = () => fetchUsers(true);

//     // --- Render ---
//     if (authLoading) {
//         // Optional: Show a basic loading state while checking auth
//         return <div className="flex justify-center items-center h-screen">Loading...</div>;
//     }

//     return (
//         <div className="min-h-screen bg-background dark:bg-background p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto space-y-6">
//                 {/* Header */}
//                 <div className="flex flex-wrap justify-between items-center gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-foreground sm:text-3xl inline-flex items-center gap-2">
//                            <Users className="h-6 w-6 text-primary" /> User Management
//                         </h1>
//                         <p className="mt-1 text-sm text-muted-foreground">
//                             View and manage registered users.
//                         </p>
//                     </div>
//                      <Button
//                          onClick={refreshData}
//                          variant="outline"
//                          size="sm"
//                          disabled={isRefreshing || loading}
//                          className="h-9 px-3 gap-1.5"
//                      >
//                          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
//                          Refresh
//                      </Button>
//                 </div>

//                  {/* Error Display */}
//                  <AnimatePresence>
//                      {error && (
//                          <motion.div
//                              initial={{ opacity: 0, y: -10 }}
//                              animate={{ opacity: 1, y: 0 }}
//                              exit={{ opacity: 0, y: -10 }}
//                              className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-sm font-medium text-destructive flex items-center gap-2"
//                              role="alert"
//                          >
//                               <FiAlertCircle className="h-5 w-5 flex-shrink-0" />
//                               <span>{error}</span>
//                               <Button variant="ghost" size="sm" onClick={() => setError(null)} className="ml-auto h-6 px-1 text-destructive hover:bg-destructive/20">
//                                    <X className="h-4 w-4" />
//                               </Button>
//                          </motion.div>
//                      )}
//                  </AnimatePresence>

//                  {/* Search and Controls */}
//                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-card border border-border rounded-lg">
//                      <div className="relative w-full md:max-w-sm">
//                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                          <Input
//                              type="search"
//                              placeholder="Search by name, email, user ID..."
//                              // Use defaultValue for initial render, onChange for debounced update
//                              defaultValue={searchTerm}
//                              onChange={(e) => debouncedSearch(e.target.value)}
//                              className="pl-9 bg-background border-border h-10"
//                          />
//                      </div>
//                      <div className="flex items-center gap-2">
//                          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Show:</span>
//                          <Select value={String(usersPerPage)} onValueChange={handlePageSizeChange}>
//                              <SelectTrigger className="w-[70px] h-10 bg-background border-border">
//                                  <SelectValue placeholder="Size" />
//                              </SelectTrigger>
//                              <SelectContent>
//                                  {pageSizeOptions.map(size => (
//                                      <SelectItem key={size} value={String(size)}>{size}</SelectItem>
//                                  ))}
//                              </SelectContent>
//                          </Select>
//                          <span className="text-sm text-muted-foreground whitespace-nowrap">entries</span>
//                      </div>
//                  </div>

//                  {/* Results Info */}
//                  {!loading && (
//                     <p className="text-sm text-muted-foreground text-right pr-1">
//                         Showing {filteredUsers.length > 0 ? (currentPage - 1) * usersPerPage + 1 : 0}
//                         - {Math.min(currentPage * usersPerPage, filteredUsers.length)}
//                         {" "}of {filteredUsers.length} results
//                         {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//                     </p>
//                  )}

//                 {/* User Table */}
//                 <UserTable
//                     users={currentUsers}
//                     loading={loading} // Pass the main loading state
//                     toggleSort={toggleSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                 />

//                  {/* Pagination */}
//                  {totalPages > 1 && !loading && (
//                      <Pagination
//                          currentPage={currentPage}
//                          totalPages={totalPages}
//                          paginate={paginate}
//                          goToPreviousPage={goToPreviousPage}
//                          goToNextPage={goToNextPage}
//                      />
//                  )}
//             </div>
//         </div>
//     );
// };

// export default AdminUsersPage;

// // frontend/src/app/admin/users/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed
// import userAdminService from '../../services/admin/user.admin'; // Adjust path
// import type { AdminUserListItem } from '../../services/admin/user.admin'; // Adjust path
// import type { KycStatus } from '../../services/kyc'; // Adjust path
// import { motion, AnimatePresence } from 'framer-motion';
// // Use consistent icons from Payments page where applicable
// import { X, Filter, RefreshCw, Users, AlertCircle, Check } from 'lucide-react';

// // Import Components (using consistent naming/paths if possible)
// import UserTable from '../components/users/UserTable'; // Path verified
// import type { UserSortField } from '../components/users/UserTableHeader'; // Path verified
// import Pagination from '../components/Pagination'; // Use shared Pagination
// import GenericFilters, { FiltersState as GenericFiltersState } from '../components/users/GenericFilters'; // Use GenericFilters (or shared if applicable)

// // Helper function to parse date string (dd-MM-yyyy) - Ensure it's the same as in Payments
// function parseDateString(dateString: string): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         // Lenient parsing: Allow single/double digits for day/month
//         if (!/^\d{1,2}$/.test(parts[0]) || !/^\d{1,2}$/.test(parts[1]) || !/^\d{4}$/.test(parts[2])) {
//             console.warn("Invalid date parts format:", parts);
//             return null;
//         }
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
//         const year = parseInt(parts[2], 10);

//         // Basic range checks
//         if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 3000) {
//             console.warn("Date components out of range:", { day, month: month + 1, year });
//             return null;
//         }
//         // Use UTC to avoid timezone issues if dates are stored/compared in UTC
//         const date = new Date(Date.UTC(year, month, day));
//         // Verify the date wasn't adjusted due to invalid day/month combo (e.g., Feb 30th)
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

// // --- KYC Status Options (Ensure these match KycStatus type exactly) ---
// const kycStatusOptions: Array<KycStatus | 'all'> = [
//     'all', 'verified', 'rejected', 'pending', 'skipped', 'not_started'
// ];
// // Convert to string array for GenericFilters
// const kycStatusOptionsStrings: string[] = kycStatusOptions as string[]; // Cast as string array

// const AdminUsersPage: React.FC = () => {
//     // --- Core States ---
//     const [users, setUsers] = useState<AdminUserListItem[]>([]);
//     const [filteredUsers, setFilteredUsers] = useState<AdminUserListItem[]>([]);
//     const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//     // Add success message state for consistency
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     // --- Filter States ---
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');
//     const [kycStatusFilter, setKycStatusFilter] = useState<string>('all');

//     // --- Sorting State (Default to Date Joined Desc) ---
//     const [sortField, setSortField] = useState<UserSortField | null>('createdAt');
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

//     // --- Pagination State ---
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [usersPerPage, setUsersPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50, 100]; // User specific options, match payment styling

//     // --- Fetching Data ---
//     const fetchUsers = useCallback(async (isRefresh = false) => {
//         // Clear messages on fetch/refresh
//         setError(null);
//         setSuccessMessage(null); // Clear success too

//         if (!isAdmin) {
//             setError("Access Denied: Administrator privileges required.");
//             setLoadingUsers(false);
//             setIsRefreshing(false);
//             setUsers([]);
//             return;
//         }
//         // Keep isRefreshing true during the fetch process
//         if (!isRefresh) setLoadingUsers(true); // Only set full loading true on initial load
//         setIsRefreshing(true); // Always indicate refresh activity

//         try {
//             const data = await userAdminService.getAllUsersAdmin();
//             // Improved validation/sanitization matching Payment page style
//             const validatedData: AdminUserListItem[] = data
//                 .filter(user => user && typeof user === 'object' && user._id) // Ensure user is object and has _id
//                 .map(user => {
//                     const kycData: AdminUserListItem['kyc'] = user.kyc && typeof user.kyc === 'object' ? {
//                         status: (user.kyc.status && kycStatusOptionsStrings.includes(user.kyc.status as string)) ? user.kyc.status : 'not_started',
//                         dateOfBirth: user.kyc.dateOfBirth, // Pass through, formatting happens in table
//                         mobile: user.kyc.mobile && typeof user.kyc.mobile === 'object' ? {
//                             countryCode: String(user.kyc.mobile.countryCode ?? '').trim(),
//                             number: String(user.kyc.mobile.number ?? '').trim(),
//                         } : undefined,
//                     } : { status: 'not_started', dateOfBirth: undefined, mobile: undefined }; // Default KYC

//                     // Validate createdAt
//                     let validCreatedAt = new Date(0).toISOString(); // Default to epoch if invalid
//                     if (user.createdAt) {
//                         const parsedDate = new Date(user.createdAt);
//                         if (!isNaN(parsedDate.getTime())) {
//                             validCreatedAt = parsedDate.toISOString();
//                         }
//                     }

//                     return {
//                         // Spread known/expected properties for better type safety if possible
//                         _id: String(user._id), // Already checked _id exists
//                         email: String(user.email ?? 'N/A').trim(),
//                         fullName: String(user.fullName ?? 'N/A').trim(),
//                         createdAt: validCreatedAt,
//                         kyc: kycData,
//                         // Include other properties if they exist and are needed
//                         // e.g., role: user.role, etc.
//                     };
//                 });
//             setUsers(validatedData);
//             if (isRefresh) {
//                  // Optional: Add success message on successful refresh
//                  // setSuccessMessage("User list refreshed.");
//                  // setTimeout(() => setSuccessMessage(null), 3000); // Auto-clear after 3 seconds
//             }
//         } catch (err: any) {
//              // Consistent error handling
//             const errorMessage = err.response?.data?.message || err.message || 'Failed to load users.';
//             setError(errorMessage);
//             console.error("Error fetching users:", err);
//             setUsers([]); // Clear data on error
//         } finally {
//             // Always set loading to false and isRefreshing to false after fetch attempt
//             setLoadingUsers(false);
//             setIsRefreshing(false);
//         }
//     }, [isAdmin]); // Removed token dependency as it's checked in useEffect

//     useEffect(() => {
//         if (authLoading) return; // Wait for auth check

//         if (token && isAdmin) {
//             fetchUsers(false);
//         } else if (!token) {
//             setError("Authentication required.");
//             setLoadingUsers(false);
//             setUsers([]); // Clear data
//         } else if (!isAdmin) { // Handle case where token exists but user is not admin
//             setError("Access Denied: Administrator privileges required.");
//             setLoadingUsers(false);
//             setUsers([]); // Clear data
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [token, isAdmin, authLoading]); // Fetch only when these change

//     // --- Filtering and Sorting Logic (Robust version) ---
//     useEffect(() => {
//         let results: AdminUserListItem[] = [...users];

//         // Search filter (Name, Email, ID)
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase().trim();
//             if (lowerSearchTerm) { // Only filter if search term is not empty after trimming
//                 results = results.filter(user => {
//                     const nameMatch = (user.fullName || '').toLowerCase().includes(lowerSearchTerm);
//                     const emailMatch = (user.email || '').toLowerCase().includes(lowerSearchTerm);
//                     // Ensure _id is treated as string and lowercased before checking
//                     const idMatch = String(user._id || '').toLowerCase().includes(lowerSearchTerm); // <--- ID CHECK IS HERE
//                     return nameMatch || emailMatch || idMatch; // Returns true if any field matches
//                 });
//             }
//         }

//         // KYC status filter
//         if (kycStatusFilter !== 'all') {
//             results = results.filter(user => (user.kyc?.status ?? 'not_started').toLowerCase() === kycStatusFilter.toLowerCase());
//         }

//          // Date filters (Date Joined - createdAt)
//          const fromDateObj = parseDateString(fromDate);
//          const toDateObj = parseDateString(toDate);

//          if (fromDateObj) {
//               fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day in UTC
//               results = results.filter(user => {
//                   try {
//                       const userDate = new Date(user.createdAt);
//                       // Compare timestamps for accuracy
//                       return !isNaN(userDate.getTime()) && userDate.getTime() >= fromDateObj.getTime();
//                   } catch { return false; }
//               });
//           }
//           if (toDateObj) {
//               toDateObj.setUTCHours(23, 59, 59, 999); // End of the day in UTC
//               results = results.filter(user => {
//                   try {
//                       const userDate = new Date(user.createdAt);
//                       // Compare timestamps
//                       return !isNaN(userDate.getTime()) && userDate.getTime() <= toDateObj.getTime();
//                   } catch { return false; }
//               });
//           }

//         // Sorting (Robust version like Payments - FIXED TS ERRORS)
//         if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: any;
//                  let valueB: any;
//                  // Helper to safely get nested values
//                  const getNestedValue = (obj: any, path: string): any => path.split('.').reduce((acc, part) => acc?.[part], obj);

//                  // Assign values based on sortField with explicit checks
//                  if (sortField === 'kyc.dateOfBirth' || sortField === 'kyc.status') {
//                      // Handle nested KYC fields specifically
//                      valueA = getNestedValue(a, sortField);
//                      valueB = getNestedValue(b, sortField);
//                  } else if (sortField === 'fullName' || sortField === 'email' || sortField === 'createdAt') {
//                      // Handle direct properties explicitly
//                      // TypeScript now knows sortField is one of these keys of AdminUserListItem
//                      valueA = a[sortField];
//                      valueB = b[sortField];
//                  } else {
//                      // This case should technically not be reachable if UserSortField is accurate
//                      console.warn("Unexpected sort field:", sortField);
//                      valueA = undefined;
//                      valueB = undefined;
//                  }

//                  let comparison = 0;

//                  // 1. Handle Dates ('createdAt', 'kyc.dateOfBirth')
//                  if (sortField === 'createdAt' || sortField === 'kyc.dateOfBirth') {
//                      const timeA = valueA ? new Date(valueA).getTime() : NaN;
//                      const timeB = valueB ? new Date(valueB).getTime() : NaN;
//                      // Place invalid/missing dates last when ascending, first when descending
//                      const numA = isNaN(timeA) ? (sortDirection === 'asc' ? Infinity : -Infinity) : timeA;
//                      const numB = isNaN(timeB) ? (sortDirection === 'asc' ? Infinity : -Infinity) : timeB;

//                      if (numA < numB) comparison = -1;
//                      else if (numA > numB) comparison = 1;
//                  }
//                  // 2. Handle Strings ('fullName', 'email', 'kyc.status') - Case-insensitive, N/A/nulls last
//                  // This 'else' covers the remaining sortable fields which are strings
//                  else {
//                      const strA = String(valueA ?? '').toLowerCase();
//                      const strB = String(valueB ?? '').toLowerCase();
//                      // Consider 'n/a' or null/undefined as "nullish" for sorting purposes
//                      const isANull = valueA == null || strA === 'n/a';
//                      const isBNull = valueB == null || strB === 'n/a';

//                      if (isANull && isBNull) comparison = 0;      // Both nullish, treat as equal
//                      else if (isANull) comparison = 1;            // A is nullish, B is not -> A comes after B
//                      else if (isBNull) comparison = -1;           // B is nullish, A is not -> A comes before B
//                      else if (strA < strB) comparison = -1;       // Standard string comparison
//                      else if (strA > strB) comparison = 1;
//                  }

//                  // Apply direction
//                  return sortDirection === 'asc' ? comparison : comparison * -1;
//              });
//          }

//         setFilteredUsers(results);

//     }, [users, searchTerm, kycStatusFilter, fromDate, toDate, sortField, sortDirection]);

//     // --- Reset Page on Filter/Sort Change ---
//     useEffect(() => {
//         if (currentPage !== 1) {
//             setCurrentPage(1);
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [searchTerm, kycStatusFilter, fromDate, toDate, sortField, sortDirection, usersPerPage]); // Added usersPerPage

//     // --- Filter Handlers ---
//     const handleApplyFilters = useCallback((filters: GenericFiltersState) => {
//         setSearchTerm(filters.searchTerm);
//         setFromDate(filters.fromDate);
//         setToDate(filters.toDate);
//         setKycStatusFilter(filters.statusFilter); // Map statusFilter to kycStatusFilter
//         setShowFilterModal(false); // Close modal on apply
//     }, []);

//     const handleClearAllFilters = useCallback(() => {
//         setSearchTerm('');
//         setFromDate('');
//         setToDate('');
//         setKycStatusFilter('all');
//         // Reset sort to default when clearing filters (Optional but good practice)
//         setSortField('createdAt');
//         setSortDirection('desc');
//         setShowFilterModal(false); // Close modal on clear
//     }, []);

//     // --- Other Handlers ---
//     const handlePageSizeChange = (size: number) => {
//         setUsersPerPage(size);
//         // No need to reset page here, the effect above handles it
//     };

//     const toggleSort = (field: UserSortField) => {
//         // If sorting by the same field, reverse direction, otherwise sort ascending
//         const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//         setSortField(field);
//         setSortDirection(newDirection);
//     };

//     // --- MODIFIED refreshData function ---
//     const refreshData = useCallback(() => {
//         // Re-fetch, showing the table skeleton during the refresh
//         if (!isRefreshing && !loadingUsers) { // Prevent multiple refresh calls while already refreshing or loading
//              setLoadingUsers(true); // <<-- SET LOADING TRUE HERE to show skeleton
//              fetchUsers(true); // Fetch with isRefresh=true; this will handle setting loading false later
//         }
//     }, [fetchUsers, isRefreshing, loadingUsers]); // Add dependencies

//     // --- Pagination Calculation (Consistent with Payments) ---
//     const { currentUsers, totalPages } = useMemo(() => {
//         // If loading, return empty array for currentUsers to avoid slicing on potentially old data
//         const usersToPaginate = loadingUsers ? [] : filteredUsers;
//         const indexOfLastUser = currentPage * usersPerPage;
//         const indexOfFirstUser = indexOfLastUser - usersPerPage;
//         const paginatedData = usersToPaginate.slice(indexOfFirstUser, indexOfLastUser);
//         const pages = Math.ceil(filteredUsers.length / usersPerPage); // Calculate total pages based on *filtered* count
//         return { currentUsers: paginatedData, totalPages: Math.max(1, pages) }; // Ensure totalPages is at least 1
//     }, [filteredUsers, currentPage, usersPerPage, loadingUsers]); // Added loadingUsers dependency

//     // --- Effect to Adjust Page if it becomes invalid ---
//      useEffect(() => {
//          // If current page is greater than total pages after filtering/data change, go to last page
//          if (currentPage > totalPages && totalPages > 0) {
//              setCurrentPage(totalPages);
//          }
//          // If data becomes empty, reset to page 1
//          else if (filteredUsers.length === 0 && currentPage !== 1) {
//             setCurrentPage(1);
//          }
//      }, [currentPage, totalPages, filteredUsers.length]); // Rerun when page, totalPages or filtered count changes

//     // --- Pagination Handlers (Consistent) ---
//     const paginate = (pageNumber: number) => {
//         const newPage = Math.max(1, Math.min(pageNumber, totalPages)); // Clamp page number
//         setCurrentPage(newPage);
//     };
//     const goToPreviousPage = () => paginate(currentPage - 1);
//     const goToNextPage = () => paginate(currentPage + 1);

//     // --- Current Filter State for GenericFilters Prop (Consistent) ---
//     const currentFilterState: GenericFiltersState = useMemo(() => ({
//         searchTerm: searchTerm,
//         fromDate: fromDate,
//         toDate: toDate,
//         statusFilter: kycStatusFilter, // Pass KYC status as 'statusFilter'
//         // Provide defaults for unused GenericFilters fields
//         currencyFilter: 'all',
//         idFilter: '',
//         amountFilter: '',
//         recipientFilter: '',
//     }), [searchTerm, fromDate, toDate, kycStatusFilter]);

//     // --- Auth Loading State ---
//     if (authLoading) {
//         // Consistent basic loading indicator
//         return <div className="flex justify-center items-center h-screen"><p>Loading authentication...</p></div>;
//     }

//     // Determine how many skeleton rows to show
//     const skeletonRowCount = useMemo(() => {
//         // Use the current page size if data was previously loaded, otherwise default to 10
//         return usersPerPage > 0 ? usersPerPage : 10;
//     }, [usersPerPage]);

//     // --- JSX ---
//     return (
//       // Consistent container padding
//       <div className="container mx-auto px-4 py-8 relative">
//         <div className="space-y-6">
//           {/* Header - Matching Payments structure and styling */}
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white flex items-center gap-2">
//                <Users className="h-6 w-6 text-primary" /> User Management
//             </h1>
//             <div className="flex items-center gap-3 justify-end">
//               {/* Filter Button - Matching Payments styling */}
//               <button
//                 onClick={() => setShowFilterModal(true)}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-secondary font-medium text-base px-6 py-2 h-12 rounded-full hover:bg-primaryhover transition-colors" // Use text-secondary for light text on dark primary bg
//               >
//                 <Filter size={18} />
//                 Filters
//               </button>
//               {/* Refresh Button - Matching Payments styling */}
//               <button
//                 onClick={refreshData}
//                 disabled={isRefreshing || loadingUsers} // Disable while EITHER refreshing OR loading
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Refresh user data"
//               >
//                 {/* Apply animate-spin class conditionally based on isRefreshing */}
//                 <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>

//           {/* Success/Error Messages - Matching Payments styling and animation */}
//           <AnimatePresence>
//             {successMessage && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//                     role="status"
//                 >
//                     <div className="flex items-center gap-2">
//                         <Check className="text-green-600 dark:text-green-400" size={18} />
//                         <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                     </div>
//                     <button onClick={() => setSuccessMessage(null)} aria-label="Dismiss success message" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">
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
//                     role="alert"
//                 >
//                    <div className="flex items-center gap-2">
//                          {/* Use AlertCircle consistently */}
//                         <AlertCircle className="text-red-600 dark:text-red-400" size={18} />
//                         <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                     </div>
//                     <button onClick={() => setError(null)} aria-label="Dismiss error message" className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
//                         <X size={18} />
//                     </button>
//                 </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pagination and Page Size Controls - Matching Payments structure and styling */}
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//              <div className="flex items-center gap-2">
//                   <label htmlFor="usersPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Show:</label>
//                   <select
//                     id="usersPerPage"
//                     value={usersPerPage}
//                     onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                     // Consistent select styling
//                     className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white"
//                   >
//                        {pageSizeOptions.map(size => <option key={size} value={size} className="dark:bg-dropdowncolor">{size}</option>)}
//                   </select>
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">entries</span>
//               </div>
//               {/* Consistent results text - Show based on filteredUsers length even if loading */}
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing {loadingUsers ? 0 : (filteredUsers.length > 0 ? (currentPage - 1) * usersPerPage + 1 : 0)}
//                   - {loadingUsers ? 0 : Math.min(currentPage * usersPerPage, filteredUsers.length)}
//                   {" "}of {filteredUsers.length} results
//                   {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//               </p>
//           </div>

//           {/* User Table Component Call - Props match PaymentTable call structure */}
//           <UserTable
//             users={currentUsers} // Pass paginated users (will be empty if loading)
//             loading={loadingUsers} // Pass loading state
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//             skeletonRowCount={skeletonRowCount} // Pass down the calculated skeleton row count
//           />

//           {/* Pagination Component Call - Consistent */}
//           {/* Only show pagination if more than one page AND not loading */}
//           {totalPages > 1 && !loadingUsers && (
//             <div className="mt-6"> {/* Add margin top consistent with Payments */}
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   paginate={paginate}
//                   goToPreviousPage={goToPreviousPage}
//                   goToNextPage={goToNextPage}
//                 />
//             </div>
//           )}

//         </div>

//         {/* Generic Filters Component - Configured for Users */}
//         <GenericFilters
//             showFilterModal={showFilterModal}
//             setShowFilterModal={setShowFilterModal}
//             initialFilters={currentFilterState}
//             onApplyFilters={handleApplyFilters}
//             onClearFilters={handleClearAllFilters}
//             searchTermPlaceholder='Search ID, Name, Email...'
//             statusOptions={kycStatusOptionsStrings} // Pass KYC statuses
//             statusFilterLabel="KYC Status"
//             allStatusesLabel="All KYC Statuses"
//             currencyOptions={['all']} // Not used for users, provide dummy 'all'
//             // Disable unused filters explicitly for clarity
//             showIdFilter={false}        // User ID search is part of main search bar
//             showAmountFilter={false}
//             showCurrencyFilter={false}
//             showRecipientFilter={false} // Assuming recipient isn't relevant here
//             // Enable used filters explicitly for clarity
//             showStatusFilter={true} // For KYC status
//             showDateFilter={true} // For Date Joined
//             dateFilterLabel="Date Joined Range" // Customize label
//         />
//       </div>
//     );
// };

// export default AdminUsersPage;

// // frontend/src/app/admin/users/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '../../contexts/AuthContext'; // Adjust path if needed
// import userAdminService from '../../services/admin/user.admin'; // Adjust path
// import type { AdminUserListItem } from '../../services/admin/user.admin'; // Adjust path
// import type { KycStatus } from '../../services/kyc'; // Adjust path
// import { motion, AnimatePresence } from 'framer-motion';
// // Use consistent icons from Payments page where applicable
// import { Filter, RefreshCw, Users } from 'lucide-react';

// // Import Components (using consistent naming/paths if possible)
// import UserTable from '../components/users/UserTable'; // Path verified
// import type { UserSortField } from '../components/users/UserTableHeader'; // Path verified
// import Pagination from '../components/Pagination'; // Use shared Pagination
// import GenericFilters, { FiltersState as GenericFiltersState } from '../components/users/GenericFilters'; // Use GenericFilters (or shared if applicable)

// // Helper function to parse date string (dd-MM-yyyy) - Ensure it's the same as in Payments
// function parseDateString(dateString: string): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         // Lenient parsing: Allow single/double digits for day/month
//         if (!/^\d{1,2}$/.test(parts[0]) || !/^\d{1,2}$/.test(parts[1]) || !/^\d{4}$/.test(parts[2])) {
//             console.warn("Invalid date parts format:", parts);
//             return null;
//         }
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
//         const year = parseInt(parts[2], 10);

//         // Basic range checks
//         if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 3000) {
//             console.warn("Date components out of range:", { day, month: month + 1, year });
//             return null;
//         }
//         // Use UTC to avoid timezone issues if dates are stored/compared in UTC
//         const date = new Date(Date.UTC(year, month, day));
//         // Verify the date wasn't adjusted due to invalid day/month combo (e.g., Feb 30th)
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

// // --- KYC Status Options (Ensure these match KycStatus type exactly) ---
// const kycStatusOptions: Array<KycStatus | 'all'> = [
//     'all', 'verified', 'rejected', 'pending', 'skipped', 'not_started'
// ];
// // Convert to string array for GenericFilters
// const kycStatusOptionsStrings: string[] = kycStatusOptions as string[]; // Cast as string array

// const AdminUsersPage: React.FC = () => {
//     // --- Core States ---
//     const [users, setUsers] = useState<AdminUserListItem[]>([]);
//     const [filteredUsers, setFilteredUsers] = useState<AdminUserListItem[]>([]);
//     const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//     // Add success message state for consistency
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     // --- Filter States ---
//     const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');
//     const [kycStatusFilter, setKycStatusFilter] = useState<string>('all');

//     // --- Sorting State (Default to Date Joined Desc) ---
//     const [sortField, setSortField] = useState<UserSortField | null>('createdAt');
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

//     // --- Pagination State ---
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [usersPerPage, setUsersPerPage] = useState<number>(10);
//     const pageSizeOptions: number[] = [10, 25, 50, 100]; // User specific options, match payment styling

//     // --- Fetching Data ---
//     const fetchUsers = useCallback(async (isRefresh = false) => {
//         // Clear messages on fetch/refresh
//         setError(null);
//         setSuccessMessage(null); // Clear success too

//         if (!isAdmin) {
//             setError("Access Denied: Administrator privileges required.");
//             setLoadingUsers(false);
//             setIsRefreshing(false);
//             setUsers([]);
//             return;
//         }
//         // Keep isRefreshing true during the fetch process
//         if (!isRefresh) setLoadingUsers(true); // Only set full loading true on initial load
//         setIsRefreshing(true); // Always indicate refresh activity

//         try {
//             const data = await userAdminService.getAllUsersAdmin();
//             // Improved validation/sanitization matching Payment page style
//             const validatedData: AdminUserListItem[] = data
//                 .filter(user => user && typeof user === 'object' && user._id) // Ensure user is object and has _id
//                 .map(user => {
//                     const kycData: AdminUserListItem['kyc'] = user.kyc && typeof user.kyc === 'object' ? {
//                         status: (user.kyc.status && kycStatusOptionsStrings.includes(user.kyc.status as string)) ? user.kyc.status : 'not_started',
//                         dateOfBirth: user.kyc.dateOfBirth, // Pass through, formatting happens in table
//                         mobile: user.kyc.mobile && typeof user.kyc.mobile === 'object' ? {
//                             countryCode: String(user.kyc.mobile.countryCode ?? '').trim(),
//                             number: String(user.kyc.mobile.number ?? '').trim(),
//                         } : undefined,
//                     } : { status: 'not_started', dateOfBirth: undefined, mobile: undefined }; // Default KYC

//                     // Validate createdAt
//                     let validCreatedAt = new Date(0).toISOString(); // Default to epoch if invalid
//                     if (user.createdAt) {
//                         const parsedDate = new Date(user.createdAt);
//                         if (!isNaN(parsedDate.getTime())) {
//                             validCreatedAt = parsedDate.toISOString();
//                         }
//                     }

//                     return {
//                         // Spread known/expected properties for better type safety if possible
//                         _id: String(user._id), // Already checked _id exists
//                         email: String(user.email ?? 'N/A').trim(),
//                         fullName: String(user.fullName ?? 'N/A').trim(),
//                         createdAt: validCreatedAt,
//                         kyc: kycData,
//                         // Include other properties if they exist and are needed
//                         // e.g., role: user.role, etc.
//                     };
//                 });
//             setUsers(validatedData);
//             if (isRefresh) {
//                  // Optional: Add success message on successful refresh
//                  // setSuccessMessage("User list refreshed.");
//                  // setTimeout(() => setSuccessMessage(null), 3000); // Auto-clear after 3 seconds
//             }
//         } catch (err: any) {
//              // Consistent error handling
//             const errorMessage = err.response?.data?.message || err.message || 'Failed to load users.';
//             setError(errorMessage);
//             console.error("Error fetching users:", err);
//             setUsers([]); // Clear data on error
//         } finally {
//             // Always set loading to false and isRefreshing to false after fetch attempt
//             setLoadingUsers(false);
//             setIsRefreshing(false);
//         }
//     }, [isAdmin]); // Removed token dependency as it's checked in useEffect

//     useEffect(() => {
//         if (authLoading) return; // Wait for auth check

//         if (token && isAdmin) {
//             fetchUsers(false);
//         } else if (!token) {
//             setError("Authentication required.");
//             setLoadingUsers(false);
//             setUsers([]); // Clear data
//         } else if (!isAdmin) { // Handle case where token exists but user is not admin
//             setError("Access Denied: Administrator privileges required.");
//             setLoadingUsers(false);
//             setUsers([]); // Clear data
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [token, isAdmin, authLoading]); // Fetch only when these change

//     // --- Filtering and Sorting Logic (Robust version) ---
//     useEffect(() => {
//         let results: AdminUserListItem[] = [...users];

//         // Search filter (Name, Email, ID)
//         if (searchTerm) {
//             const lowerSearchTerm = searchTerm.toLowerCase().trim();
//             if (lowerSearchTerm) { // Only filter if search term is not empty after trimming
//                 results = results.filter(user => {
//                     const nameMatch = (user.fullName || '').toLowerCase().includes(lowerSearchTerm);
//                     const emailMatch = (user.email || '').toLowerCase().includes(lowerSearchTerm);
//                     // Ensure _id is treated as string and lowercased before checking
//                     const idMatch = String(user._id || '').toLowerCase().includes(lowerSearchTerm); // <--- ID CHECK IS HERE
//                     return nameMatch || emailMatch || idMatch; // Returns true if any field matches
//                 });
//             }
//         }

//         // KYC status filter
//         if (kycStatusFilter !== 'all') {
//             results = results.filter(user => (user.kyc?.status ?? 'not_started').toLowerCase() === kycStatusFilter.toLowerCase());
//         }

//          // Date filters (Date Joined - createdAt)
//          const fromDateObj = parseDateString(fromDate);
//          const toDateObj = parseDateString(toDate);

//          if (fromDateObj) {
//               fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day in UTC
//               results = results.filter(user => {
//                   try {
//                       const userDate = new Date(user.createdAt);
//                       // Compare timestamps for accuracy
//                       return !isNaN(userDate.getTime()) && userDate.getTime() >= fromDateObj.getTime();
//                   } catch { return false; }
//               });
//           }
//           if (toDateObj) {
//               toDateObj.setUTCHours(23, 59, 59, 999); // End of the day in UTC
//               results = results.filter(user => {
//                   try {
//                       const userDate = new Date(user.createdAt);
//                       // Compare timestamps
//                       return !isNaN(userDate.getTime()) && userDate.getTime() <= toDateObj.getTime();
//                   } catch { return false; }
//               });
//           }

//         // Sorting (Robust version like Payments - FIXED TS ERRORS)
//         if (sortField) {
//              results.sort((a, b) => {
//                  let valueA: any;
//                  let valueB: any;
//                  // Helper to safely get nested values
//                  const getNestedValue = (obj: any, path: string): any => path.split('.').reduce((acc, part) => acc?.[part], obj);

//                  // Assign values based on sortField with explicit checks
//                  if (sortField === 'kyc.dateOfBirth' || sortField === 'kyc.status') {
//                      // Handle nested KYC fields specifically
//                      valueA = getNestedValue(a, sortField);
//                      valueB = getNestedValue(b, sortField);
//                  } else if (sortField === 'fullName' || sortField === 'email' || sortField === 'createdAt') {
//                      // Handle direct properties explicitly
//                      // TypeScript now knows sortField is one of these keys of AdminUserListItem
//                      valueA = a[sortField];
//                      valueB = b[sortField];
//                  } else {
//                      // This case should technically not be reachable if UserSortField is accurate
//                      console.warn("Unexpected sort field:", sortField);
//                      valueA = undefined;
//                      valueB = undefined;
//                  }

//                  let comparison = 0;

//                  // 1. Handle Dates ('createdAt', 'kyc.dateOfBirth')
//                  if (sortField === 'createdAt' || sortField === 'kyc.dateOfBirth') {
//                      const timeA = valueA ? new Date(valueA).getTime() : NaN;
//                      const timeB = valueB ? new Date(valueB).getTime() : NaN;
//                      // Place invalid/missing dates last when ascending, first when descending
//                      const numA = isNaN(timeA) ? (sortDirection === 'asc' ? Infinity : -Infinity) : timeA;
//                      const numB = isNaN(timeB) ? (sortDirection === 'asc' ? Infinity : -Infinity) : timeB;

//                      if (numA < numB) comparison = -1;
//                      else if (numA > numB) comparison = 1;
//                  }
//                  // 2. Handle Strings ('fullName', 'email', 'kyc.status') - Case-insensitive, N/A/nulls last
//                  // This 'else' covers the remaining sortable fields which are strings
//                  else {
//                      const strA = String(valueA ?? '').toLowerCase();
//                      const strB = String(valueB ?? '').toLowerCase();
//                      // Consider 'n/a' or null/undefined as "nullish" for sorting purposes
//                      const isANull = valueA == null || strA === 'n/a';
//                      const isBNull = valueB == null || strB === 'n/a';

//                      if (isANull && isBNull) comparison = 0;      // Both nullish, treat as equal
//                      else if (isANull) comparison = 1;            // A is nullish, B is not -> A comes after B
//                      else if (isBNull) comparison = -1;           // B is nullish, A is not -> A comes before B
//                      else if (strA < strB) comparison = -1;       // Standard string comparison
//                      else if (strA > strB) comparison = 1;
//                  }

//                  // Apply direction
//                  return sortDirection === 'asc' ? comparison : comparison * -1;
//              });
//          }

//         setFilteredUsers(results);

//     }, [users, searchTerm, kycStatusFilter, fromDate, toDate, sortField, sortDirection]);

//     // --- Reset Page on Filter/Sort Change ---
//     useEffect(() => {
//         if (currentPage !== 1) {
//             setCurrentPage(1);
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [searchTerm, kycStatusFilter, fromDate, toDate, sortField, sortDirection, usersPerPage]); // Added usersPerPage

//     // --- Filter Handlers ---
//     const handleApplyFilters = useCallback((filters: GenericFiltersState) => {
//         setSearchTerm(filters.searchTerm);
//         setFromDate(filters.fromDate);
//         setToDate(filters.toDate);
//         setKycStatusFilter(filters.statusFilter); // Map statusFilter to kycStatusFilter
//         setShowFilterModal(false); // Close modal on apply
//     }, []);

//     const handleClearAllFilters = useCallback(() => {
//         setSearchTerm('');
//         setFromDate('');
//         setToDate('');
//         setKycStatusFilter('all');
//         // Reset sort to default when clearing filters (Optional but good practice)
//         setSortField('createdAt');
//         setSortDirection('desc');
//         setShowFilterModal(false); // Close modal on clear
//     }, []);

//     // --- Other Handlers ---
//     const handlePageSizeChange = (size: number) => {
//         setUsersPerPage(size);
//         // No need to reset page here, the effect above handles it
//     };

//     const toggleSort = (field: UserSortField) => {
//         // If sorting by the same field, reverse direction, otherwise sort ascending
//         const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//         setSortField(field);
//         setSortDirection(newDirection);
//     };

//     // --- MODIFIED refreshData function ---
//     const refreshData = useCallback(() => {
//         // Re-fetch, showing the table skeleton during the refresh
//         if (!isRefreshing && !loadingUsers) { // Prevent multiple refresh calls while already refreshing or loading
//              setLoadingUsers(true); // <<-- SET LOADING TRUE HERE to show skeleton
//              fetchUsers(true); // Fetch with isRefresh=true; this will handle setting loading false later
//         }
//     }, [fetchUsers, isRefreshing, loadingUsers]); // Add dependencies

//     // --- Pagination Calculation (Consistent with Payments) ---
//     const { currentUsers, totalPages } = useMemo(() => {
//         // If loading, return empty array for currentUsers to avoid slicing on potentially old data
//         const usersToPaginate = loadingUsers ? [] : filteredUsers;
//         const indexOfLastUser = currentPage * usersPerPage;
//         const indexOfFirstUser = indexOfLastUser - usersPerPage;
//         const paginatedData = usersToPaginate.slice(indexOfFirstUser, indexOfLastUser);
//         const pages = Math.ceil(filteredUsers.length / usersPerPage); // Calculate total pages based on *filtered* count
//         return { currentUsers: paginatedData, totalPages: Math.max(1, pages) }; // Ensure totalPages is at least 1
//     }, [filteredUsers, currentPage, usersPerPage, loadingUsers]); // Added loadingUsers dependency

//     // --- Current Filter State for GenericFilters Prop (Consistent) ---
//     const currentFilterState: GenericFiltersState = useMemo(() => ({
//         searchTerm: searchTerm,
//         fromDate: fromDate,
//         toDate: toDate,
//         statusFilter: kycStatusFilter, // Pass KYC status as 'statusFilter'
//         // Provide defaults for unused GenericFilters fields
//         currencyFilter: 'all',
//         idFilter: '',
//         amountFilter: '',
//         recipientFilter: '',
//     }), [searchTerm, fromDate, toDate, kycStatusFilter]);

//     // --- Determine how many skeleton rows to show ---
//     // *** Moved this useMemo call to the top level ***
//     const skeletonRowCount = useMemo(() => {
//         // Use the current page size if data was previously loaded, otherwise default to 10
//         return usersPerPage > 0 ? usersPerPage : 10;
//     }, [usersPerPage]);

//     // --- Effect to Adjust Page if it becomes invalid ---
//      useEffect(() => {
//          // If current page is greater than total pages after filtering/data change, go to last page
//          if (currentPage > totalPages && totalPages > 0) {
//              setCurrentPage(totalPages);
//          }
//          // If data becomes empty, reset to page 1
//          else if (filteredUsers.length === 0 && currentPage !== 1) {
//             setCurrentPage(1);
//          }
//      }, [currentPage, totalPages, filteredUsers.length]); // Rerun when page, totalPages or filtered count changes

//     // --- Pagination Handlers (Consistent) ---
//     const paginate = (pageNumber: number) => {
//         const newPage = Math.max(1, Math.min(pageNumber, totalPages)); // Clamp page number
//         setCurrentPage(newPage);
//     };
//     const goToPreviousPage = () => paginate(currentPage - 1);
//     const goToNextPage = () => paginate(currentPage + 1);

//     // --- Auth Loading State ---
//     if (authLoading) {
//         // Consistent basic loading indicator
//         return <div className="flex justify-center items-center h-screen"><p>Loading authentication...</p></div>;
//     }

//     // --- JSX ---
//     return (
//       // Consistent container padding
//       <div className="container mx-auto px-4 py-8 relative">
//         <div className="space-y-6">
//           {/* Header - Matching Payments structure and styling */}
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <h1 className="text-2xl font-bold leading-tight text-mainheading dark:text-white sm:text-3xl inline-flex items-center gap-2">
//               <Users size={28} className='text-primary'/>
//               User Management
//             </h1>
//             <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//               {/* Filter Button - Matching Payments styling */}
//               <button
//                 onClick={() => setShowFilterModal(true)}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear" // Use text-secondary for light text on dark primary bg
//               >
//                 <Filter size={20} />
//                 <span>Filters</span>
//               </button>
//               {/* Refresh Button - Matching Payments styling */}
//               <button
//                 onClick={refreshData}
//                 disabled={isRefreshing || loadingUsers} // Disable while EITHER refreshing OR loading
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Refresh user data"
//               >
//                 {/* Apply animate-spin class conditionally based on isRefreshing */}
//                 <RefreshCw
//                   className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>

//           {/* Success/Error Messages - Matching Payments styling and animation */}
//           {/* <AnimatePresence>
//             {successMessage && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//                     role="status"
//                 >
//                     <div className="flex items-center gap-2">
//                         <Check className="text-green-600 dark:text-green-400" size={18} />
//                         <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//                     </div>
//                     <button onClick={() => setSuccessMessage(null)} aria-label="Dismiss success message" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">
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
//                     role="alert"
//                 >
//                    <div className="flex items-center gap-2">
//                         <AlertCircle className="text-red-600 dark:text-red-400" size={18} />
//                         <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
//                     </div>
//                     <button onClick={() => setError(null)} aria-label="Dismiss error message" className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
//                         <X size={18} />
//                     </button>
//                 </motion.div>
//             )}
//           </AnimatePresence> */}

//           {/* Pagination and Page Size Controls - Matching Payments structure and styling */}
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//             <div className="flex items-center gap-2">
//               <label
//                 htmlFor="usersPerPage"
//                 className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//               >
//                 Show:
//               </label>
//               <select
//                 id="usersPerPage"
//                 value={usersPerPage}
//                 onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                 // Consistent select styling
//                 className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//               >
//                 {pageSizeOptions.map((size) => (
//                   <option
//                     key={size}
//                     value={size}
//                     className="dark:bg-dropdowncolor cursor-pointer"
//                   >
//                     {size}
//                   </option>
//                 ))}
//               </select>
//               <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//                 entries
//               </span>
//             </div>
//             {/* Consistent results text - Show based on filteredUsers length even if loading */}
//             <p className="text-sm text-gray-500 dark:text-gray-300">
//               Showing{" "}
//               {loadingUsers
//                 ? 0
//                 : filteredUsers.length > 0
//                 ? (currentPage - 1) * usersPerPage + 1
//                 : 0}
//               -{" "}
//               {loadingUsers
//                 ? 0
//                 : Math.min(
//                     currentPage * usersPerPage,
//                     filteredUsers.length
//                   )}{" "}
//               of {filteredUsers.length} results
//               {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//             </p>
//           </div>

//           {/* User Table Component Call - Props match PaymentTable call structure */}
//           <UserTable
//             users={currentUsers} // Pass paginated users (will be empty if loading)
//             loading={loadingUsers} // Pass loading state
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//             skeletonRowCount={skeletonRowCount} // Pass down the calculated skeleton row count
//           />

//           {/* Pagination Component Call - Consistent */}
//           {/* Only show pagination if more than one page AND not loading */}
//           {totalPages > 1 && !loadingUsers && (
//             <div className="mt-6">
//               {" "}
//               {/* Add margin top consistent with Payments */}
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 paginate={paginate}
//                 goToPreviousPage={goToPreviousPage}
//                 goToNextPage={goToNextPage}
//               />
//             </div>
//           )}
//         </div>

//         {/* Generic Filters Component - Configured for Users */}
//         <GenericFilters
//           showFilterModal={showFilterModal}
//           setShowFilterModal={setShowFilterModal}
//           initialFilters={currentFilterState}
//           onApplyFilters={handleApplyFilters}
//           onClearFilters={handleClearAllFilters}
//           searchTermPlaceholder="Search ID, Name, Email..."
//           statusOptions={kycStatusOptionsStrings} // Pass KYC statuses
//           statusFilterLabel="KYC Status"
//           allStatusesLabel="All KYC Statuses"
//           currencyOptions={["all"]} // Not used for users, provide dummy 'all'
//           // Disable unused filters explicitly for clarity
//           showIdFilter={false} // User ID search is part of main search bar
//           showAmountFilter={false}
//           showCurrencyFilter={false}
//           showRecipientFilter={false} // Assuming recipient isn't relevant here
//           // Enable used filters explicitly for clarity
//           showStatusFilter={true} // For KYC status
//           showDateFilter={true} // For Date Joined
//           dateFilterLabel="Date Joined Range" // Customize label
//         />
//       </div>
//     );
// };

// export default AdminUsersPage;

// // frontend/src/app/admin/users/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
// import userAdminService from "../../services/admin/user.admin"; // Adjust path
// import type { AdminUserListItem } from "../../services/admin/user.admin"; // Adjust path
// import type { KycStatus } from "../../services/kyc"; // Adjust path
// import { motion, AnimatePresence } from "framer-motion";
// // Use consistent icons from Payments page where applicable
// import { Filter, RefreshCw, Users } from "lucide-react";

// // Import Components (using consistent naming/paths if possible)
// import UserTable from "../components/users/UserTable"; // Path verified
// import type { UserSortField } from "../components/users/UserTableHeader"; // Path verified
// import Pagination from "../components/Pagination"; // Use shared Pagination
// import GenericFilters, {
//   FiltersState as GenericFiltersState,
// } from "../components/GenericFilters"; // Use GenericFilters from the specified path
// import { FaUsers } from "react-icons/fa";

// // Helper function to parse date string (dd-MM-yyyy) - Ensure it's the same as in Payments
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     // Lenient parsing: Allow single/double digits for day/month
//     if (
//       !/^\d{1,2}$/.test(parts[0]) ||
//       !/^\d{1,2}$/.test(parts[1]) ||
//       !/^\d{4}$/.test(parts[2])
//     ) {
//       console.warn("Invalid date parts format:", parts);
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
//     const year = parseInt(parts[2], 10);

//     // Basic range checks
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       console.warn("Date components out of range:", {
//         day,
//         month: month + 1,
//         year,
//       });
//       return null;
//     }
//     // Use UTC to avoid timezone issues if dates are stored/compared in UTC
//     const date = new Date(Date.UTC(year, month, day));
//     // Verify the date wasn't adjusted due to invalid day/month combo (e.g., Feb 30th)
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

// // --- KYC Status Options (Ensure these match KycStatus type exactly) ---
// const kycStatusOptions: Array<KycStatus | "all"> = [
//   "all",
//   "verified",
//   "rejected",
//   "pending",
//   "skipped",
//   "not_started",
// ];
// // Convert to string array for GenericFilters
// const kycStatusOptionsStrings: string[] = kycStatusOptions as string[]; // Cast as string array

// const AdminUsersPage: React.FC = () => {
//   // --- Core States ---
//   const [users, setUsers] = useState<AdminUserListItem[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<AdminUserListItem[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   // Add success message state for consistency
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // --- Filter States ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [kycStatusFilter, setKycStatusFilter] = useState<string>("all");

//   // --- Sorting State (Default to Date Joined Desc) ---
//   const [sortField, setSortField] = useState<UserSortField | null>("createdAt");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // --- Pagination State ---
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [usersPerPage, setUsersPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50, 100]; // User specific options, match payment styling

//   // --- Fetching Data ---
//   const fetchUsers = useCallback(
//     async (isRefresh = false) => {
//       // Clear messages on fetch/refresh
//       setError(null);
//       setSuccessMessage(null); // Clear success too

//       if (!isAdmin) {
//         setError("Access Denied: Administrator privileges required.");
//         setLoadingUsers(false);
//         setIsRefreshing(false);
//         setUsers([]);
//         return;
//       }
//       // Keep isRefreshing true during the fetch process
//       if (!isRefresh) setLoadingUsers(true); // Only set full loading true on initial load
//       setIsRefreshing(true); // Always indicate refresh activity

//       try {
//         const data = await userAdminService.getAllUsersAdmin();
//         // Improved validation/sanitization matching Payment page style
//         const validatedData: AdminUserListItem[] = data
//           .filter((user) => user && typeof user === "object" && user._id) // Ensure user is object and has _id
//           .map((user) => {
//             const kycData: AdminUserListItem["kyc"] =
//               user.kyc && typeof user.kyc === "object"
//                 ? {
//                     status:
//                       user.kyc.status &&
//                       kycStatusOptionsStrings.includes(
//                         user.kyc.status as string
//                       )
//                         ? user.kyc.status
//                         : "not_started",
//                     dateOfBirth: user.kyc.dateOfBirth, // Pass through, formatting happens in table
//                     mobile:
//                       user.kyc.mobile && typeof user.kyc.mobile === "object"
//                         ? {
//                             countryCode: String(
//                               user.kyc.mobile.countryCode ?? ""
//                             ).trim(),
//                             number: String(user.kyc.mobile.number ?? "").trim(),
//                           }
//                         : undefined,
//                   }
//                 : {
//                     status: "not_started",
//                     dateOfBirth: undefined,
//                     mobile: undefined,
//                   }; // Default KYC

//             // Validate createdAt
//             let validCreatedAt = new Date(0).toISOString(); // Default to epoch if invalid
//             if (user.createdAt) {
//               const parsedDate = new Date(user.createdAt);
//               if (!isNaN(parsedDate.getTime())) {
//                 validCreatedAt = parsedDate.toISOString();
//               }
//             }

//             return {
//               // Spread known/expected properties for better type safety if possible
//               _id: String(user._id), // Already checked _id exists
//               email: String(user.email ?? "N/A").trim(),
//               fullName: String(user.fullName ?? "N/A").trim(),
//               createdAt: validCreatedAt,
//               kyc: kycData,
//               // Include other properties if they exist and are needed
//               // e.g., role: user.role, etc.
//             };
//           });
//         setUsers(validatedData);
//         if (isRefresh) {
//           // Optional: Add success message on successful refresh
//           // setSuccessMessage("User list refreshed.");
//           // setTimeout(() => setSuccessMessage(null), 3000); // Auto-clear after 3 seconds
//         }
//       } catch (err: any) {
//         // Consistent error handling
//         const errorMessage =
//           err.response?.data?.message || err.message || "Failed to load users.";
//         setError(errorMessage);
//         console.error("Error fetching users:", err);
//         setUsers([]); // Clear data on error
//       } finally {
//         // Always set loading to false and isRefreshing to false after fetch attempt
//         setLoadingUsers(false);
//         setIsRefreshing(false);
//       }
//     },
//     [isAdmin]
//   ); // Removed token dependency as it's checked in useEffect

//   useEffect(() => {
//     if (authLoading) return; // Wait for auth check

//     if (token && isAdmin) {
//       fetchUsers(false);
//     } else if (!token) {
//       setError("Authentication required.");
//       setLoadingUsers(false);
//       setUsers([]); // Clear data
//     } else if (!isAdmin) {
//       // Handle case where token exists but user is not admin
//       setError("Access Denied: Administrator privileges required.");
//       setLoadingUsers(false);
//       setUsers([]); // Clear data
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, isAdmin, authLoading]); // Fetch only when these change

//   // --- Filtering and Sorting Logic (Robust version) ---
//   useEffect(() => {
//     let results: AdminUserListItem[] = [...users];

//     // Search filter (Name, Email, ID)
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase().trim();
//       if (lowerSearchTerm) {
//         // Only filter if search term is not empty after trimming
//         results = results.filter((user) => {
//           const nameMatch = (user.fullName || "")
//             .toLowerCase()
//             .includes(lowerSearchTerm);
//           const emailMatch = (user.email || "")
//             .toLowerCase()
//             .includes(lowerSearchTerm);
//           // Ensure _id is treated as string and lowercased before checking
//           const idMatch = String(user._id || "")
//             .toLowerCase()
//             .includes(lowerSearchTerm); // <--- ID CHECK IS HERE
//           return nameMatch || emailMatch || idMatch; // Returns true if any field matches
//         });
//       }
//     }

//     // KYC status filter
//     if (kycStatusFilter !== "all") {
//       results = results.filter(
//         (user) =>
//           (user.kyc?.status ?? "not_started").toLowerCase() ===
//           kycStatusFilter.toLowerCase()
//       );
//     }

//     // Date filters (Date Joined - createdAt)
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day in UTC
//       results = results.filter((user) => {
//         try {
//           const userDate = new Date(user.createdAt);
//           // Compare timestamps for accuracy
//           return (
//             !isNaN(userDate.getTime()) &&
//             userDate.getTime() >= fromDateObj.getTime()
//           );
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999); // End of the day in UTC
//       results = results.filter((user) => {
//         try {
//           const userDate = new Date(user.createdAt);
//           // Compare timestamps
//           return (
//             !isNaN(userDate.getTime()) &&
//             userDate.getTime() <= toDateObj.getTime()
//           );
//         } catch {
//           return false;
//         }
//       });
//     }

//     // Sorting (Robust version like Payments - FIXED TS ERRORS)
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         // Helper to safely get nested values
//         const getNestedValue = (obj: any, path: string): any =>
//           path.split(".").reduce((acc, part) => acc?.[part], obj);

//         // Assign values based on sortField with explicit checks
//         if (sortField === "kyc.dateOfBirth" || sortField === "kyc.status") {
//           // Handle nested KYC fields specifically
//           valueA = getNestedValue(a, sortField);
//           valueB = getNestedValue(b, sortField);
//         } else if (
//           sortField === "fullName" ||
//           sortField === "email" ||
//           sortField === "createdAt"
//         ) {
//           // Handle direct properties explicitly
//           // TypeScript now knows sortField is one of these keys of AdminUserListItem
//           valueA = a[sortField];
//           valueB = b[sortField];
//         } else {
//           // This case should technically not be reachable if UserSortField is accurate
//           console.warn("Unexpected sort field:", sortField);
//           valueA = undefined;
//           valueB = undefined;
//         }

//         let comparison = 0;

//         // 1. Handle Dates ('createdAt', 'kyc.dateOfBirth')
//         if (sortField === "createdAt" || sortField === "kyc.dateOfBirth") {
//           const timeA = valueA ? new Date(valueA).getTime() : NaN;
//           const timeB = valueB ? new Date(valueB).getTime() : NaN;
//           // Place invalid/missing dates last when ascending, first when descending
//           const numA = isNaN(timeA)
//             ? sortDirection === "asc"
//               ? Infinity
//               : -Infinity
//             : timeA;
//           const numB = isNaN(timeB)
//             ? sortDirection === "asc"
//               ? Infinity
//               : -Infinity
//             : timeB;

//           if (numA < numB) comparison = -1;
//           else if (numA > numB) comparison = 1;
//         }
//         // 2. Handle Strings ('fullName', 'email', 'kyc.status') - Case-insensitive, N/A/nulls last
//         // This 'else' covers the remaining sortable fields which are strings
//         else {
//           const strA = String(valueA ?? "").toLowerCase();
//           const strB = String(valueB ?? "").toLowerCase();
//           // Consider 'n/a' or null/undefined as "nullish" for sorting purposes
//           const isANull = valueA == null || strA === "n/a";
//           const isBNull = valueB == null || strB === "n/a";

//           if (isANull && isBNull)
//             comparison = 0; // Both nullish, treat as equal
//           else if (isANull)
//             comparison = 1; // A is nullish, B is not -> A comes after B
//           else if (isBNull)
//             comparison = -1; // B is nullish, A is not -> A comes before B
//           else if (strA < strB) comparison = -1; // Standard string comparison
//           else if (strA > strB) comparison = 1;
//         }

//         // Apply direction
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }

//     setFilteredUsers(results);
//   }, [
//     users,
//     searchTerm,
//     kycStatusFilter,
//     fromDate,
//     toDate,
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
//     kycStatusFilter,
//     fromDate,
//     toDate,
//     sortField,
//     sortDirection,
//     usersPerPage,
//   ]); // Added usersPerPage

//   // --- Filter Handlers ---
//   const handleApplyFilters = useCallback((filters: GenericFiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setKycStatusFilter(filters.statusFilter); // Map statusFilter to kycStatusFilter
//     setShowFilterModal(false); // Close modal on apply
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setKycStatusFilter("all");
//     // Reset sort to default when clearing filters (Optional but good practice)
//     setSortField("createdAt");
//     setSortDirection("desc");
//     setShowFilterModal(false); // Close modal on clear
//   }, []);

//   // --- Other Handlers ---
//   const handlePageSizeChange = (size: number) => {
//     setUsersPerPage(size);
//     // No need to reset page here, the effect above handles it
//   };

//   const toggleSort = (field: UserSortField) => {
//     // If sorting by the same field, reverse direction, otherwise sort ascending
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   // --- MODIFIED refreshData function ---
//   const refreshData = useCallback(() => {
//     // Re-fetch, showing the table skeleton during the refresh
//     if (!isRefreshing && !loadingUsers) {
//       // Prevent multiple refresh calls while already refreshing or loading
//       setLoadingUsers(true); // <<-- SET LOADING TRUE HERE to show skeleton
//       fetchUsers(true); // Fetch with isRefresh=true; this will handle setting loading false later
//     }
//   }, [fetchUsers, isRefreshing, loadingUsers]); // Add dependencies

//   // --- Pagination Calculation (Consistent with Payments) ---
//   const { currentUsers, totalPages } = useMemo(() => {
//     // If loading, return empty array for currentUsers to avoid slicing on potentially old data
//     const usersToPaginate = loadingUsers ? [] : filteredUsers;
//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const paginatedData = usersToPaginate.slice(
//       indexOfFirstUser,
//       indexOfLastUser
//     );
//     const pages = Math.ceil(filteredUsers.length / usersPerPage); // Calculate total pages based on *filtered* count
//     return { currentUsers: paginatedData, totalPages: Math.max(1, pages) }; // Ensure totalPages is at least 1
//   }, [filteredUsers, currentPage, usersPerPage, loadingUsers]); // Added loadingUsers dependency

//   // --- Current Filter State for GenericFilters Prop (Consistent) ---
//   const currentFilterState: GenericFiltersState = useMemo(
//     () => ({
//       searchTerm: searchTerm,
//       fromDate: fromDate,
//       toDate: toDate,
//       statusFilter: kycStatusFilter, // Pass KYC status as 'statusFilter'
//       // Provide defaults for unused GenericFilters fields
//       currencyFilter: "all",
//       idFilter: "",
//       amountFilter: "",
//       recipientFilter: "",
//     }),
//     [searchTerm, fromDate, toDate, kycStatusFilter]
//   );

//   // --- Determine how many skeleton rows to show ---
//   // *** Moved this useMemo call to the top level ***
//   const skeletonRowCount = useMemo(() => {
//     // Use the current page size if data was previously loaded, otherwise default to 10
//     return usersPerPage > 0 ? usersPerPage : 10;
//   }, [usersPerPage]);

//   // --- Effect to Adjust Page if it becomes invalid ---
//   useEffect(() => {
//     // If current page is greater than total pages after filtering/data change, go to last page
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//     // If data becomes empty, reset to page 1
//     else if (filteredUsers.length === 0 && currentPage !== 1) {
//       setCurrentPage(1);
//     }
//   }, [currentPage, totalPages, filteredUsers.length]); // Rerun when page, totalPages or filtered count changes

//   // --- Pagination Handlers (Consistent) ---
//   const paginate = (pageNumber: number) => {
//     const newPage = Math.max(1, Math.min(pageNumber, totalPages)); // Clamp page number
//     setCurrentPage(newPage);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   // --- Auth Loading State ---
//   if (authLoading) {
//     // Consistent basic loading indicator
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading authentication...</p>
//       </div>
//     );
//   }

//   // --- JSX ---
//   return (
//     // Consistent container padding
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         {/* Header - Matching Payments structure and styling */}
//         <div className="flex flex-wrap justify-between items-center gap-3">
//           <div className="Activity">
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//                 <FaUsers className="size-6 text-mainheading dark:text-primary" />
//               </div>

//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//                 All Recent Activity
//               </h1>
//             </div>

//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Track all user transactions, KYC submissions, and status updates
//               in real time with detailed logs for complete transparency.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             {/* Filter Button - Matching Payments styling */}
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base sm:px-8 px-6 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear" // Use text-secondary for light text on dark primary bg
//             >
//               <Filter size={20} />
//               <span>Filters</span>
//             </button>

//             {/* Refresh Button - Matching Payments styling */}
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingUsers} // Disable while EITHER refreshing OR loading
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 px-6 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh user data"
//             >
//               {/* Apply animate-spin class conditionally based on isRefreshing */}
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Pagination and Page Size Controls - Matching Payments structure and styling */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="usersPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="usersPerPage"
//               value={usersPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               // Consistent select styling
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
//           {/* Consistent results text - Show based on filteredUsers length even if loading */}
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {loadingUsers
//               ? 0
//               : filteredUsers.length > 0
//               ? (currentPage - 1) * usersPerPage + 1
//               : 0}
//             -{" "}
//             {loadingUsers
//               ? 0
//               : Math.min(currentPage * usersPerPage, filteredUsers.length)}{" "}
//             of {filteredUsers.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {/* User Table Component Call - Props match PaymentTable call structure */}
//         <UserTable
//           users={currentUsers} // Pass paginated users (will be empty if loading)
//           loading={loadingUsers} // Pass loading state
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           skeletonRowCount={skeletonRowCount} // Pass down the calculated skeleton row count
//         />

//         {/* Pagination Component Call - Consistent */}
//         {/* Only show pagination if more than one page AND not loading */}
//         {totalPages > 1 && !loadingUsers && (
//           <div>
//             {" "}
//             {/* Add margin top consistent with Payments */}
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={paginate}
//               goToPreviousPage={goToPreviousPage}
//               goToNextPage={goToNextPage}
//             />
//           </div>
//         )}
//       </div>

//       {/* Generic Filters Component - Configured for Users */}
//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         searchTermPlaceholder="Search User ID, Name or Email..."
//         // searchTermPlaceholder is internal to GenericFilters; it uses initialFilters.searchTerm
//         // and has its own placeholder: "Search ID, Name, Email, Ref..."
//         statusOptions={kycStatusOptionsStrings} // Pass KYC statuses
//         statusFilterLabel="KYC Status"
//         allStatusesLabel="All KYC Statuses"
//         currencyOptions={["all"]} // Not used for users, provide dummy 'all'
//         // Disable unused filters explicitly for clarity
//         showIdFilter={false} // User ID search is part of main search bar in GenericFilters
//         showAmountFilter={false}
//         showCurrencyFilter={false}
//         showRecipientFilter={false} // Assuming recipient isn't relevant here
//         // Enable used filters explicitly for clarity
//         showStatusFilter={true} // For KYC status
//         showDateFilter={true} // For Date Joined
//         dateFilterLabel="Date Joined Range" // Customize label
//       />
//     </div>
//   );
// };

// export default AdminUsersPage;

// frontend/src/app/admin/users/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed
import userAdminService from "../../services/admin/user.admin"; // Adjust path
import type { AdminUserListItem } from "../../services/admin/user.admin"; // Adjust path
import type { KycStatus } from "../../services/kyc"; // Adjust path
import { motion, AnimatePresence } from "framer-motion";
// Use consistent icons from Payments page where applicable
import { Filter, RefreshCw, Users } from "lucide-react";

// Import Components (using consistent naming/paths if possible)
import UserTable from "../components/users/UserTable"; // Path verified
import type { UserSortField } from "../components/users/UserTableHeader"; // Path verified
import Pagination from "../components/Pagination"; // Use shared Pagination
import GenericFilters, {
  FiltersState as GenericFiltersState,
} from "../components/GenericFilters"; // Use GenericFilters from the specified path
import { FaUsers } from "react-icons/fa";

// Helper function to parse date string (dd-MM-yyyy) - Ensure it's the same as in Payments
function parseDateString(dateString: string): Date | null {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length === 3) {
    // Lenient parsing: Allow single/double digits for day/month
    if (
      !/^\d{1,2}$/.test(parts[0]) ||
      !/^\d{1,2}$/.test(parts[1]) ||
      !/^\d{4}$/.test(parts[2])
    ) {
      console.warn("Invalid date parts format:", parts);
      return null;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const year = parseInt(parts[2], 10);

    // Basic range checks
    if (
      day < 1 ||
      day > 31 ||
      month < 0 ||
      month > 11 ||
      year < 1900 ||
      year > 3000
    ) {
      console.warn("Date components out of range:", {
        day,
        month: month + 1,
        year,
      });
      return null;
    }
    // Use UTC to avoid timezone issues if dates are stored/compared in UTC
    const date = new Date(Date.UTC(year, month, day));
    // Verify the date wasn't adjusted due to invalid day/month combo (e.g., Feb 30th)
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

// --- KYC Status Options (Ensure these match KycStatus type exactly) ---
const kycStatusOptions: Array<KycStatus | "all"> = [
  "all",
  "verified",
  "rejected",
  "pending",
  "skipped",
  "not_started",
];
// Convert to string array for GenericFilters
const kycStatusOptionsStrings: string[] = kycStatusOptions as string[]; // Cast as string array

const AdminUsersPage: React.FC = () => {
  // --- Core States ---
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUserListItem[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAdmin, loading: authLoading } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  // Add success message state for consistency
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- Filter States ---
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [kycStatusFilter, setKycStatusFilter] = useState<string>("all");

  // --- Sorting State (Default to Date Joined Desc) ---
  const [sortField, setSortField] = useState<UserSortField | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const pageSizeOptions: number[] = [10, 25, 50, 100]; // User specific options, match payment styling

  // --- Fetching Data ---
  const fetchUsers = useCallback(
    async (isRefresh = false) => {
      // Clear messages on fetch/refresh
      setError(null);
      setSuccessMessage(null); // Clear success too

      if (!isAdmin) {
        setError("Access Denied: Administrator privileges required.");
        setLoadingUsers(false);
        setIsRefreshing(false);
        setUsers([]);
        return;
      }
      // Keep isRefreshing true during the fetch process
      if (!isRefresh) setLoadingUsers(true); // Only set full loading true on initial load
      setIsRefreshing(true); // Always indicate refresh activity

      try {
        const data = await userAdminService.getAllUsersAdmin();
        // Improved validation/sanitization matching Payment page style
        const validatedData: AdminUserListItem[] = data
          .filter((user) => user && typeof user === "object" && user._id) // Ensure user is object and has _id
          .map((user) => {
            const kycData: AdminUserListItem["kyc"] =
              user.kyc && typeof user.kyc === "object"
                ? {
                    status:
                      user.kyc.status &&
                      kycStatusOptionsStrings.includes(
                        user.kyc.status as string
                      )
                        ? user.kyc.status
                        : "not_started",
                    dateOfBirth: user.kyc.dateOfBirth, // Pass through, formatting happens in table
                    mobile:
                      user.kyc.mobile && typeof user.kyc.mobile === "object"
                        ? {
                            countryCode: String(
                              user.kyc.mobile.countryCode ?? ""
                            ).trim(),
                            number: String(user.kyc.mobile.number ?? "").trim(),
                          }
                        : undefined,
                  }
                : {
                    status: "not_started",
                    dateOfBirth: undefined,
                    mobile: undefined,
                  }; // Default KYC

            // Validate createdAt
            let validCreatedAt = new Date(0).toISOString(); // Default to epoch if invalid
            if (user.createdAt) {
              const parsedDate = new Date(user.createdAt);
              if (!isNaN(parsedDate.getTime())) {
                validCreatedAt = parsedDate.toISOString();
              }
            }

            return {
              // Spread known/expected properties for better type safety if possible
              _id: String(user._id), // Already checked _id exists
              email: String(user.email ?? "N/A").trim(),
              fullName: String(user.fullName ?? "N/A").trim(),
              createdAt: validCreatedAt,
              kyc: kycData,
              // Include other properties if they exist and are needed
              // e.g., role: user.role, etc.
            };
          });
        setUsers(validatedData);
        if (isRefresh) {
          // Optional: Add success message on successful refresh
          // setSuccessMessage("User list refreshed.");
          // setTimeout(() => setSuccessMessage(null), 3000); // Auto-clear after 3 seconds
        }
      } catch (err: any) {
        // Consistent error handling
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to load users.";
        setError(errorMessage);
        console.error("Error fetching users:", err);
        setUsers([]); // Clear data on error
      } finally {
        // Always set loading to false and isRefreshing to false after fetch attempt
        setLoadingUsers(false);
        setIsRefreshing(false);
      }
    },
    [isAdmin]
  ); // Removed token dependency as it's checked in useEffect

  useEffect(() => {
    if (authLoading) return; // Wait for auth check

    if (token && isAdmin) {
      fetchUsers(false);
    } else if (!token) {
      setError("Authentication required.");
      setLoadingUsers(false);
      setUsers([]); // Clear data
    } else if (!isAdmin) {
      // Handle case where token exists but user is not admin
      setError("Access Denied: Administrator privileges required.");
      setLoadingUsers(false);
      setUsers([]); // Clear data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAdmin, authLoading]); // Fetch only when these change

  // --- Filtering and Sorting Logic (Robust version) ---
  useEffect(() => {
    let results: AdminUserListItem[] = [...users];

    // Search filter (Name, Email, ID)
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      if (lowerSearchTerm) {
        // Only filter if search term is not empty after trimming
        results = results.filter((user) => {
          const nameMatch = (user.fullName || "")
            .toLowerCase()
            .includes(lowerSearchTerm);
          const emailMatch = (user.email || "")
            .toLowerCase()
            .includes(lowerSearchTerm);
          // Ensure _id is treated as string and lowercased before checking
          const idMatch = String(user._id || "")
            .toLowerCase()
            .includes(lowerSearchTerm); // <--- ID CHECK IS HERE
          return nameMatch || emailMatch || idMatch; // Returns true if any field matches
        });
      }
    }

    // KYC status filter
    if (kycStatusFilter !== "all") {
      results = results.filter(
        (user) =>
          (user.kyc?.status ?? "not_started").toLowerCase() ===
          kycStatusFilter.toLowerCase()
      );
    }

    // Date filters (Date Joined - createdAt)
    const fromDateObj = parseDateString(fromDate);
    const toDateObj = parseDateString(toDate);

    if (fromDateObj) {
      fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day in UTC
      results = results.filter((user) => {
        try {
          const userDate = new Date(user.createdAt);
          // Compare timestamps for accuracy
          return (
            !isNaN(userDate.getTime()) &&
            userDate.getTime() >= fromDateObj.getTime()
          );
        } catch {
          return false;
        }
      });
    }
    if (toDateObj) {
      toDateObj.setUTCHours(23, 59, 59, 999); // End of the day in UTC
      results = results.filter((user) => {
        try {
          const userDate = new Date(user.createdAt);
          // Compare timestamps
          return (
            !isNaN(userDate.getTime()) &&
            userDate.getTime() <= toDateObj.getTime()
          );
        } catch {
          return false;
        }
      });
    }

    // Sorting (Robust version like Payments - FIXED TS ERRORS)
    if (sortField) {
      results.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        // Helper to safely get nested values
        const getNestedValue = (obj: any, path: string): any =>
          path.split(".").reduce((acc, part) => acc?.[part], obj);

        // Assign values based on sortField with explicit checks
        if (sortField === "kyc.dateOfBirth" || sortField === "kyc.status") {
          // Handle nested KYC fields specifically
          valueA = getNestedValue(a, sortField);
          valueB = getNestedValue(b, sortField);
        } else if (
          sortField === "fullName" ||
          sortField === "email" ||
          sortField === "createdAt"
        ) {
          // Handle direct properties explicitly
          // TypeScript now knows sortField is one of these keys of AdminUserListItem
          valueA = a[sortField];
          valueB = b[sortField];
        } else {
          // This case should technically not be reachable if UserSortField is accurate
          console.warn("Unexpected sort field:", sortField);
          valueA = undefined;
          valueB = undefined;
        }

        let comparison = 0;

        // 1. Handle Dates ('createdAt', 'kyc.dateOfBirth')
        if (sortField === "createdAt" || sortField === "kyc.dateOfBirth") {
          const timeA = valueA ? new Date(valueA).getTime() : NaN;
          const timeB = valueB ? new Date(valueB).getTime() : NaN;
          // Place invalid/missing dates last when ascending, first when descending
          const numA = isNaN(timeA)
            ? sortDirection === "asc"
              ? Infinity
              : -Infinity
            : timeA;
          const numB = isNaN(timeB)
            ? sortDirection === "asc"
              ? Infinity
              : -Infinity
            : timeB;

          if (numA < numB) comparison = -1;
          else if (numA > numB) comparison = 1;
        }
        // 2. Handle Strings ('fullName', 'email', 'kyc.status') - Case-insensitive, N/A/nulls last
        // This 'else' covers the remaining sortable fields which are strings
        else {
          const strA = String(valueA ?? "").toLowerCase();
          const strB = String(valueB ?? "").toLowerCase();
          // Consider 'n/a' or null/undefined as "nullish" for sorting purposes
          const isANull = valueA == null || strA === "n/a";
          const isBNull = valueB == null || strB === "n/a";

          if (isANull && isBNull)
            comparison = 0; // Both nullish, treat as equal
          else if (isANull)
            comparison = 1; // A is nullish, B is not -> A comes after B
          else if (isBNull)
            comparison = -1; // B is nullish, A is not -> A comes before B
          else if (strA < strB) comparison = -1; // Standard string comparison
          else if (strA > strB) comparison = 1;
        }

        // Apply direction
        return sortDirection === "asc" ? comparison : comparison * -1;
      });
    }

    setFilteredUsers(results);
  }, [
    users,
    searchTerm,
    kycStatusFilter,
    fromDate,
    toDate,
    sortField,
    sortDirection,
  ]);

  // --- Reset Page on Filter/Sort Change ---
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    kycStatusFilter,
    fromDate,
    toDate,
    sortField,
    sortDirection,
    usersPerPage,
  ]); // Added usersPerPage

  // --- Filter Handlers ---
  const handleApplyFilters = useCallback((filters: GenericFiltersState) => {
    setSearchTerm(filters.searchTerm);
    setFromDate(filters.fromDate);
    setToDate(filters.toDate);
    setKycStatusFilter(filters.statusFilter); // Map statusFilter to kycStatusFilter
    setShowFilterModal(false); // Close modal on apply
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setSearchTerm("");
    setFromDate("");
    setToDate("");
    setKycStatusFilter("all");
    // Reset sort to default when clearing filters (Optional but good practice)
    setSortField("createdAt");
    setSortDirection("desc");
    setShowFilterModal(false); // Close modal on clear
  }, []);

  // --- Other Handlers ---
  const handlePageSizeChange = (size: number) => {
    setUsersPerPage(size);
    // No need to reset page here, the effect above handles it
  };

  const toggleSort = (field: UserSortField) => {
    // If sorting by the same field, reverse direction, otherwise sort ascending
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  // --- MODIFIED refreshData function ---
  const refreshData = useCallback(() => {
    // Re-fetch, showing the table skeleton during the refresh
    if (!isRefreshing && !loadingUsers) {
      // Prevent multiple refresh calls while already refreshing or loading
      setLoadingUsers(true); // <<-- SET LOADING TRUE HERE to show skeleton
      fetchUsers(true); // Fetch with isRefresh=true; this will handle setting loading false later
    }
  }, [fetchUsers, isRefreshing, loadingUsers]); // Add dependencies

  // --- Pagination Calculation (Consistent with Payments) ---
  const { currentUsers, totalPages } = useMemo(() => {
    // If loading, return empty array for currentUsers to avoid slicing on potentially old data
    const usersToPaginate = loadingUsers ? [] : filteredUsers;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginatedData = usersToPaginate.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    const pages = Math.ceil(filteredUsers.length / usersPerPage); // Calculate total pages based on *filtered* count
    return { currentUsers: paginatedData, totalPages: Math.max(1, pages) }; // Ensure totalPages is at least 1
  }, [filteredUsers, currentPage, usersPerPage, loadingUsers]); // Added loadingUsers dependency

  // --- Current Filter State for GenericFilters Prop (Consistent) ---
  const currentFilterState: GenericFiltersState = useMemo(
    () => ({
      searchTerm: searchTerm,
      fromDate: fromDate,
      toDate: toDate,
      statusFilter: kycStatusFilter, // Pass KYC status as 'statusFilter'
      // Provide defaults for unused GenericFilters fields
      currencyFilter: "all",
      idFilter: "",
      amountFilter: "",
      recipientFilter: "",
    }),
    [searchTerm, fromDate, toDate, kycStatusFilter]
  );

  // --- Determine how many skeleton rows to show ---
  // *** Moved this useMemo call to the top level ***
  const skeletonRowCount = useMemo(() => {
    // Use the current page size if data was previously loaded, otherwise default to 10
    return usersPerPage > 0 ? usersPerPage : 10;
  }, [usersPerPage]);

  // --- Effect to Adjust Page if it becomes invalid ---
  useEffect(() => {
    // If current page is greater than total pages after filtering/data change, go to last page
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
    // If data becomes empty, reset to page 1
    else if (filteredUsers.length === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, filteredUsers.length]); // Rerun when page, totalPages or filtered count changes

  // --- Pagination Handlers (Consistent) ---
  const paginate = (pageNumber: number) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages)); // Clamp page number
    setCurrentPage(newPage);
  };
  const goToPreviousPage = () => paginate(currentPage - 1);
  const goToNextPage = () => paginate(currentPage + 1);

  // --- Auth Loading State ---
  if (authLoading) {
    // Consistent basic loading indicator
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading authentication...</p>
      </div>
    );
  }

  // --- JSX ---
  return (
    // Consistent container padding
    <div className="container mx-auto px-4 py-5 relative">
      <div className="space-y-6">
        {/* Header - Matching Payments structure and styling */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="Activity">
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
                <FaUsers className="size-6 text-mainheading" />
              </div>

              <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
                All Recent Activity
              </h1>

            </div>
    
            <p className="mt-2 text-subheadingWhite lg:text-lg">
              Track all user transactions, KYC submissions, and status updates
              in real time with detailed logs for complete transparency.
            </p>
          </div>

          <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
            {/* Filter Button - Matching Payments styling */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center bg-primary text-mainheading hover:bg-primaryhover gap-2 h-12.5 px-8 py-3 cursor-pointer font-medium rounded-full sm:w-auto w-full justify-center transition-all duration-75 ease-linear" // Use text-secondary for light text on dark primary bg
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            {/* Refresh Button - Matching Payments styling */}
            <button
              onClick={refreshData}
              disabled={isRefreshing || loadingUsers} // Disable while EITHER refreshing OR loading
              className="flex items-center justify-center cursor-pointer gap-2 text-primary bg-primarybox hover:bg-secondarybox font-medium px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh Send Money "
            >
              {/* Apply animate-spin class conditionally based on isRefreshing */}
              <RefreshCw
                className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Pagination and Page Size Controls - Matching Payments structure and styling */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="usersPerPage"
              className="text-sm font-medium text-subheadingWhite whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="usersPerPage"
              value={usersPerPage}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              // Consistent select styling
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
              entries
            </span>
          </div>
          {/* Consistent results text - Show based on filteredUsers length even if loading */}
          <p className="text-sm text-subheadingWhite">
            Showing{" "}
            {loadingUsers
              ? 0
              : filteredUsers.length > 0
              ? (currentPage - 1) * usersPerPage + 1
              : 0}
            -{" "}
            {loadingUsers
              ? 0
              : Math.min(currentPage * usersPerPage, filteredUsers.length)}{" "}
            of {filteredUsers.length} results
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>

        {/* User Table Component Call - Props match PaymentTable call structure */}
        <UserTable
          users={currentUsers} // Pass paginated users (will be empty if loading)
          loading={loadingUsers} // Pass loading state
          toggleSort={toggleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          skeletonRowCount={skeletonRowCount} // Pass down the calculated skeleton row count
        />

        {/* Pagination Component Call - Consistent */}
        {/* Only show pagination if more than one page AND not loading */}
        {totalPages > 1 && !loadingUsers && (
          <div>
            {" "}
            {/* Add margin top consistent with Payments */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        )}
      </div>

      {/* Generic Filters Component - Configured for Users */}
      <GenericFilters
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        initialFilters={currentFilterState}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearAllFilters}
        searchTermPlaceholder="Search User ID, Name or Email..."
        // searchTermPlaceholder is internal to GenericFilters; it uses initialFilters.searchTerm
        // and has its own placeholder: "Search ID, Name, Email, Ref..."
        statusOptions={kycStatusOptionsStrings} // Pass KYC statuses
        statusFilterLabel="KYC Status"
        allStatusesLabel="All KYC Statuses"
        currencyOptions={["all"]} // Not used for users, provide dummy 'all'
        // Disable unused filters explicitly for clarity
        showIdFilter={false} // User ID search is part of main search bar in GenericFilters
        showAmountFilter={false}
        showCurrencyFilter={false}
        showRecipientFilter={false} // Assuming recipient isn't relevant here
        // Enable used filters explicitly for clarity
        showStatusFilter={true} // For KYC status
        showDateFilter={true} // For Date Joined
        dateFilterLabel="Date Joined Range" // Customize label
      />
    </div>
  );
};

export default AdminUsersPage;
