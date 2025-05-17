// // frontend/src/app/admin/components/users/UserTable.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import UserTableHeader, { UserSortField } from "./UserTableHeader";
// import type { AdminUserListItem } from "../../../services/admin/user.admin";
// import type { KycStatus, KycMobile } from "../../../services/kyc";
// import { cn } from "@/lib/utils";
// import {
//   Eye,
//   ShieldCheck,
//   AlertCircle,
//   HelpCircle,
//   Clock,
//   Info,
// } from "lucide-react";
// import { motion } from "framer-motion"; // Import motion

// // --- Helper Functions (Keep existing helpers) ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   options?: Intl.DateTimeFormatOptions
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//         // More robust parsing attempt (e.g., DD-MM-YYYY)
//         if (typeof dateInput === 'string') {
//             const parts = dateInput.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/); // DD/MM/YYYY or DD-MM-YYYY
//             if (parts) {
//                 const day = parseInt(parts[1], 10);
//                 const month = parseInt(parts[2], 10) - 1; // Month is 0-indexed
//                 const year = parseInt(parts[3], 10);
//                 const altDate = new Date(Date.UTC(year, month, day));
//                 if (!isNaN(altDate.getTime())) {
//                     return formatDate(altDate, options); // Recursively format valid date
//                 }
//             }
//              // Try YYYY-MM-DD
//             const isoParts = dateInput.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
//              if (isoParts) {
//                 const year = parseInt(isoParts[1], 10);
//                 const month = parseInt(isoParts[2], 10) - 1;
//                 const day = parseInt(isoParts[3], 10);
//                 const altDate = new Date(Date.UTC(year, month, day));
//                  if (!isNaN(altDate.getTime())) {
//                     return formatDate(altDate, options);
//                 }
//              }
//         }
//       return "Invalid Date";
//     }
//     const defaultOptions: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     };
//     return date.toLocaleDateString("en-GB", { ...defaultOptions, ...options });
//   } catch (e) {
//     console.error("Error formatting date:", dateInput, e);
//     return "Error";
//   }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//   if (!mobile || (!mobile.countryCode?.trim() && !mobile.number?.trim()))
//     return "N/A";
//   const cc = mobile.countryCode?.trim() || "";
//   const num = mobile.number?.trim() || "";
//   if (!cc && !num) return "N/A";
//   if (!cc) return num;
//   if (!num) return cc;
//   return `${cc} ${num}`;
// };

// const getStatusConfig = (
//   status?: KycStatus | string | null
// ): { color: string; icon: React.ElementType; label: string } => {
//   const lowerStatus =
//     typeof status === "string" ? status.toLowerCase() : "not_started";
//   const statusMap: Record<
//     string,
//     { color: string; icon: React.ElementType; label: string }
//   > = {
//     verified: {
//       color:
//         "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400",
//       icon: ShieldCheck,
//       label: "Verified",
//     },
//     rejected: {
//       color:
//         "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400",
//       icon: AlertCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color:
//         "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400",
//       icon: Info,
//       label: "Skipped",
//     },
//     not_started: {
//       color:
//         "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400",
//       icon: HelpCircle,
//       label: "Not Started",
//     },
//   };
//   return statusMap[lowerStatus] || statusMap.not_started;
// };

// // --- Component Props ---
// interface UserTableProps {
//   users: AdminUserListItem[];
//   loading: boolean;
//   toggleSort: (field: UserSortField) => void;
//   sortField: UserSortField | null;
//   sortDirection: "asc" | "desc";
// }

// // --- Component ---
// const UserTable: React.FC<UserTableProps> = ({
//   users,
//   loading,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   const numberOfColumns = 7; // Ensure this matches UserTableHeader

//   if (loading) {
//     return (
//       <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//          {/* Added scroll container for consistency even during loading */}
//          <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <table className="min-w-full">
//             <UserTableHeader
//                 toggleSort={toggleSort}
//                 sortField={sortField}
//                 sortDirection={sortDirection}
//             />
//             {/* Use tbody for skeleton rows as well for structure consistency */}
//             <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
//                 {Array(users.length > 0 ? users.length : 10) // Use current page size or default 10
//                 .fill(0)
//                 .map((_, i) => (
//                     <tr key={`skel-${i}`}>
//                     {Array(numberOfColumns).fill(0).map((_, j) => (
//                         <td key={`skel-cell-${i}-${j}`} className="px-4 py-3 whitespace-nowrap">
//                         {/* Use full-width skeleton like PaymentTable */}
//                         <Skeleton className="h-4 w-full" />
//                         </td>
//                     ))}
//                     </tr>
//                 ))}
//             </tbody>
//             </table>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//       {/* Add the scrollable container with custom scrollbars */}
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full overflow-hidden">
//           <UserTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           {/* Add divide-y and overflow-hidden to tbody */}
//           <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden">
//             {users.length === 0 ? (
//               <tr>
//                 <td
//                   // Ensure colSpan matches numberOfColumns
//                   colSpan={numberOfColumns}
//                   className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
//                 >
//                   No users found matching your criteria.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user, index) => { // Add index for animation delay
//                 const kycStatus = user.kyc?.status ?? "not_started";
//                 const statusConfig = getStatusConfig(kycStatus);
//                 const userDob = user.kyc?.dateOfBirth;

//                 return (
//                   // Use motion.tr for animation and update hover styles
//                   <motion.tr
//                     key={user._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }} // Staggered animation
//                     // Use hover styles from PaymentTable
//                     className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-100"
//                   >
//                     {/* Full Name - Use styles closer to PaymentTable */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       {user.fullName || <span className="text-gray-400 dark:text-gray-500 italic">N/A</span>}
//                     </td>
//                     {/* Email - Use styles closer to PaymentTable */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       {user.email || <span className="text-gray-400 dark:text-gray-500 italic">N/A</span>}
//                     </td>
//                     {/* Date of Birth */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       {formatDate(userDob)}
//                     </td>
//                     {/* Mobile */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       {formatMobile(user.kyc?.mobile)}
//                     </td>
//                     {/* KYC Status - Badge styling remains good */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       <div
//                         className={cn(
//                           "inline-flex justify-center items-center px-4 py-1 w-32 font-medium rounded-3xl capitalize",
//                           statusConfig.color
//                         )}
//                       >
//                         <statusConfig.icon
//                           className="h-3 w-3 mr-1 flex-shrink-0"
//                           aria-hidden="true"
//                         />
//                         {statusConfig.label}
//                       </div>
//                     </td>
//                     {/* Date Joined */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       {formatDate(user.createdAt)}
//                     </td>
//                     {/* Actions - Style Link to look like PaymentTable button */}
//                     <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
//                       <motion.div whileTap={{ scale: 0.95 }}>
//                         <Link
//                           href={`/admin/users/${user._id}`}
//                           aria-label={`View details for ${user.fullName || user.email}`}
//                           // Apply button styles directly to Link
//                           className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex justify-center items-center" // Adjusted padding/height/text size for consistency
//                         >
//                           <Eye size={16} className="mr-1" />Details
//                         </Link>
//                       </motion.div>
//                     </td>
//                   </motion.tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserTable;




  // frontend/src/app/admin/components/users/UserTable.tsx
  "use client";
  import React from "react";
  import Link from "next/link";
  import { Skeleton } from "@/components/ui/skeleton";
  import UserTableHeader, { UserSortField } from "./UserTableHeader";
  import type { AdminUserListItem } from "../../../services/admin/user.admin";
  import type { KycStatus, KycMobile } from "../../../services/kyc";
  import { cn } from "@/lib/utils";
  import {
    Eye,
    ShieldCheck,
    AlertCircle,
    HelpCircle,
    Clock,
    Info,
  } from "lucide-react";
  import { motion } from "framer-motion"; // Import motion

  // --- Helper Functions (Keep existing helpers) ---
  const formatDate = (
    dateInput?: string | Date | null,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    if (!dateInput) return "N/A";
    let date: Date | null = null;

    // Try parsing as standard Date object or ISO string first
    try {
        date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            date = null; // Reset if invalid
        }
    } catch {
        date = null;
    }

    // If standard parsing failed or resulted in an invalid date, try custom formats
    if (!date && typeof dateInput === 'string') {
        // Try DD/MM/YYYY or DD-MM-YYYY
        let parts = dateInput.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
        if (parts) {
            const day = parseInt(parts[1], 10);
            const month = parseInt(parts[2], 10) - 1; // Month is 0-indexed
            const year = parseInt(parts[3], 10);
            // Basic sanity checks
            if (day >= 1 && day <= 31 && month >= 0 && month <= 11 && year > 1900 && year < 3000) {
                const testDate = new Date(Date.UTC(year, month, day));
                // Check if date components match after construction (avoids Feb 30 etc.)
                if (testDate.getUTCDate() === day && testDate.getUTCMonth() === month && testDate.getUTCFullYear() === year) {
                    date = testDate;
                }
            }
        }

        // If still no valid date, try YYYY-MM-DD or YYYY/MM/DD
        if (!date) {
            parts = dateInput.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
            if (parts) {
                const year = parseInt(parts[1], 10);
                const month = parseInt(parts[2], 10) - 1; // Month is 0-indexed
                const day = parseInt(parts[3], 10);
                // Basic sanity checks
                if (day >= 1 && day <= 31 && month >= 0 && month <= 11 && year > 1900 && year < 3000) {
                    const testDate = new Date(Date.UTC(year, month, day));
                    // Check if date components match
                    if (testDate.getUTCDate() === day && testDate.getUTCMonth() === month && testDate.getUTCFullYear() === year) {
                        date = testDate;
                    }
                }
            }
        }
    }

    // If still no valid date after all attempts
    if (!date || isNaN(date.getTime())) {
        // console.warn("Could not parse date:", dateInput); // Optionally keep warning
        return "Invalid Date";
    }

    // Format the valid date
    try {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: 'UTC', // Assume UTC dates if not specified otherwise
        };
        return date.toLocaleDateString("en-GB", { ...defaultOptions, ...options });
    } catch (e) {
        console.error("Error formatting date:", dateInput, e);
        return "Error";
    }
  };

  const formatMobile = (mobile?: KycMobile | null): string => {
    if (!mobile || (!mobile.countryCode?.trim() && !mobile.number?.trim()))
      return "N/A";
    const cc = mobile.countryCode?.trim() || "";
    const num = mobile.number?.trim() || "";
    if (!cc && !num) return "N/A";
    if (!cc) return num;
    if (!num) return cc;
    // Add "+" if country code doesn't have it
    const formattedCC = cc.startsWith('+') ? cc : `+${cc}`;
    return `${formattedCC} ${num}`;
  };

  const getStatusConfig = (
    status?: KycStatus | string | null
  ): { color: string; icon: React.ElementType; label: string } => {
    const lowerStatus =
      typeof status === "string" ? status.toLowerCase().trim() : "not_started";
    const statusMap: Record<
      string,
      { color: string; icon: React.ElementType; label: string }
    > = {
      verified: {
        color:
          "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400",
        icon: ShieldCheck,
        label: "Verified",
      },

      rejected: {
        color:
          "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400",
        icon: AlertCircle,
        label: "Rejected",
      },
      pending: {
        color:
          "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400",
        icon: Clock,
        label: "Pending",
      },
      skipped: {
        color:
          "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400",
        icon: Info,
        label: "Skipped",
      },
      not_started: {
        color:
          "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400",
        icon: HelpCircle,
        label: "Not Started",
      },
      // Add any other potential statuses if necessary
    };
    // Return specific status or default to 'not_started'
    return statusMap[lowerStatus] || statusMap.not_started;
  };

  // --- Component Props ---
  interface UserTableProps {
    users: AdminUserListItem[];
    loading: boolean;
    toggleSort: (field: UserSortField) => void;
    sortField: UserSortField | null;
    sortDirection: "asc" | "desc";
    skeletonRowCount: number; // <-- Add prop for skeleton row count
  }

  // --- Component ---
  const UserTable: React.FC<UserTableProps> = ({
    users,
    loading,
    toggleSort,
    sortField,
    sortDirection,
    skeletonRowCount, // <-- Destructure the new prop
  }) => {
    const numberOfColumns = 7; // Full Name, Email, DOB, Mobile, KYC, Joined, Actions

    const formatDateForDisplay = (dateInput?: string | Date | null) => {
      // Use the robust formatDate helper
      return formatDate(dateInput, { year: "numeric", month: "short", day: "numeric" });
    };

    const formatDateJoined = (dateString: string) => {
      if (!dateString || isNaN(new Date(dateString).getTime())) {
          return "Invalid Date";
      }
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleString(undefined, options);
    };


    // Loading Skeleton
    if (loading) {
      return (
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
              <table className="min-w-full">
                
              <UserTableHeader
                  toggleSort={toggleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
              />

              {/* Use tbody for skeleton rows */}
              <tbody>
                  {/* Use skeletonRowCount prop */}
                  {Array(skeletonRowCount)
                  .fill(0)
                  .map((_, i) => (
                      <tr key={`skel-${i}`} >
                      {Array(numberOfColumns).fill(0).map((_, j) => (
                          <td key={`skel-cell-${i}-${j}`} className="px-6 py-4 h-[70px] whitespace-nowrap">
                            {/* Use full-width skeleton */}
                            <Skeleton className="h-4 w-full" />
                          </td>
                      ))}
                      </tr>
                  ))}
              </tbody>
              </table>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border overflow-hidden">
        {/* Add the scrollable container with custom scrollbars */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
          <table className="min-w-full overflow-hidden">
            <UserTableHeader
              toggleSort={toggleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            {/* Add divide-y and overflow-hidden to tbody */}
            <tbody className="divide-y overflow-hidden">
              {users.length === 0 ? (
                <tr>
                  <td
                    // Ensure colSpan matches numberOfColumns
                    colSpan={numberOfColumns}
                    className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
                  >
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => { // Add index for animation delay
                  const kycStatus = user.kyc?.status ?? "not_started";
                  const statusConfig = getStatusConfig(kycStatus);
                  const userDob = user.kyc?.dateOfBirth;

                  return (
                    // Use motion.tr for animation and update hover styles
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }} // Staggered animation
                      // Use hover styles from PaymentTable
                      // className="hover:bg-lightgray dark:hover:bg-primarybox transition-all duration-75 ease-linear"
                    >
                      {/* Full Name - Use styles closer to PaymentTable */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap capitalize">
                        {user.fullName && user.fullName.toLowerCase() !== 'n/a' ? user.fullName : <span className="text-gray-500 dark:text-gray-300 italic">N/A</span>}
                      </td>
                      {/* Email - Use styles closer to PaymentTable */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                        {user.email && user.email.toLowerCase() !== 'n/a' ? user.email : <span className="text-gray-500 dark:text-gray-300 italic">N/A</span>}
                      </td>
                      {/* Date of Birth */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                        {formatDateForDisplay(userDob)}
                      </td>
                      {/* Mobile */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                        {formatMobile(user.kyc?.mobile)}
                      </td>
                      {/* KYC Status - Badge styling remains good */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                        <div
                          className={cn(
                            "inline-flex justify-center items-center gap-1.5 px-4 py-1 w-28 font-medium rounded-3xl capitalize", // Ensure width is sufficient
                            statusConfig.color
                          )}
                        >
                          {statusConfig.label}
                        </div>
                      </td>
                      {/* Date Joined */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                        {formatDateJoined(user.createdAt)}
                      </td>
                      {/* Actions - Style Link to look like PaymentTable button */}
                      <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap ">
                      
                          <Link
                            href={`/admin/users/${user._id}`}
                            aria-label={`View details for ${user.fullName || user.email}`}
                            // Apply button styles directly to Link - matching PaymentTable Edit button
                            className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none" // Adjusted padding/height/text size for consistency
                          >
                            {/* <Eye size={16} className="mr-1" />Details */}
                            <span>View Details</span>
                          </Link>

                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default UserTable;