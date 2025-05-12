// import React from 'react';

// export default function RecentActivity() {
//   return (
//     <div className="lg:w-2/3 w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//       <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
//         Recent Activity
//       </h3>
//       <div className="space-y-4">
//         {[1, 2, 3, 4].map((item) => (
//           <div key={item} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
//             {/* Using a placeholder background color instead of primary to avoid specific color dependency */}
//             <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
//               <span className="text-neutral-700 dark:text-neutral-300 font-medium">
//                 {/* Replace with actual icon or initials if available */}
//                 {item}
//               </span>
//             </div>
//             <div className="ml-4">
//               <p className="font-medium text-neutral-900 dark:text-white">
//                 New user registered:{" "}
//                 {item === 1
//                   ? "Sarah Johnson"
//                   : item === 2
//                   ? "Michael Lee"
//                   : item === 3
//                   ? "David Chen"
//                   : "Emma Wilson"}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                 {item} hour{item !== 1 ? "s" : ""} ago
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//         View all activity →
//       </button>
//     </div>
//   );
// }

// // frontend/src/components/DashboardSection/RecentActivity.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // For the "View all" button
// import { User, CreditCard, Send, FileText, AlertCircle } from 'lucide-react';
// import activityAdminService, { ActivityItem } from '../../../services/admin/activity.admin'; // Adjust path
// import moment from 'moment';

// const getActivityIcon = (type: ActivityItem['type']) => {
//     switch (type) {
//         case 'NEW_USER':
//             return <User className="h-5 w-5 text-blue-500" />;
//         case 'NEW_PAYMENT':
//             return <CreditCard className="h-5 w-5 text-green-500" />;
//         case 'NEW_TRANSFER':
//             return <Send className="h-5 w-5 text-purple-500" />;
//         case 'KYC_PENDING':
//             return <FileText className="h-5 w-5 text-yellow-500" />;
//         default:
//             return <User className="h-5 w-5 text-gray-400" />;
//     }
// };

// export default function RecentActivity() {
//     const [activities, setActivities] = useState<ActivityItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchActivities = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await activityAdminService.getRecentActivities(4, 1);
//                 setActivities(response.data || []);
//             } catch (err: any) {
//                 setError(err.message || "Failed to load recent activities.");
//                 console.error("Error fetching recent activities:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchActivities();
//     }, []);

//     if (loading) {
//         return (
//             <div className="w-full bg-lightgray/60 dark:bg-primarybox sm:p-6 p-4 rounded-xl shadow-sm border animate-pulse">
//                 <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
//                 <div className="space-y-4">
//                     {[...Array(4)].map((_, i) => (
//                         <div key={i} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
//                             <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
//                             <div className="ml-4 w-full">
//                                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-6"></div> {/* Adjusted margin-top */}
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="w-full bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative" role="alert">
//                 <div className="flex items-center">
//                     <AlertCircle className="h-5 w-5 mr-2"/>
//                     <span className="block sm:inline">{error}</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//             <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
//                 Recent Activity
//             </h3>
//             <div className="space-y-4">
//                 {activities.length > 0 ? activities.map((activity) => (
//                     <div key={activity.itemId + activity.timestamp + Math.random()} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
//                         <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0 flex items-center justify-center">
//                             {getActivityIcon(activity.type)}
//                         </div>
//                         <div className="ml-4">
//                             <p className="font-medium text-neutral-900 dark:text-white text-sm leading-snug">
//                                 {activity.message}
//                             </p>
//                             <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
//                                 {moment(activity.timestamp).fromNow()}
//                             </p>
//                         </div>
//                     </div>
//                 )) : (
//                     <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity to display.</p>
//                 )}
//             </div>
//             {/* --- MODIFICATION START --- */}
//             <Link href="/admin/activity"
//                   className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer"
//             >
//                 View all activity →
//             </Link>
//             {/* --- MODIFICATION END --- */}
//         </div>
//     );
// }

// "use client";

// import React, { useState, useEffect, useMemo } from 'react';
// import Link from 'next/link';
// import {
//   User, CreditCard, Send, FileText, AlertCircle,
//   Clock, ChevronRight, RefreshCw, Activity
// } from 'lucide-react';
// import activityAdminService, { ActivityItem } from '../../../services/admin/activity.admin';
// import moment from 'moment';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';

// type ActivityConfig = {
//   icon: React.ReactNode;
//   color: string;
//   bgColor: string;
//   borderColor: string;
//   textColor: string;
// };

// /**
//  * Premium Recent Activity Component
//  *
//  * Displays the most recent system activity with enhanced UI/UX
//  * and sophisticated animations for a premium dashboard experience.
//  */
// export default function RecentActivity() {
//   const [activities, setActivities] = useState<ActivityItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState<boolean>(false);

//   // Activity type configuration with consistent theming
//   const activityConfig = useMemo<Record<string, ActivityConfig>>(() => ({
//     'NEW_USER': {
//       icon: <User className="h-4 w-4" />,
//       color: 'text-blue-500 dark:text-blue-400',
//       bgColor: 'bg-blue-50 dark:bg-blue-900/20',
//       borderColor: 'border-blue-100 dark:border-blue-800/30',
//       textColor: 'text-blue-700 dark:text-blue-300'
//     },
//     'NEW_PAYMENT': {
//       icon: <CreditCard className="h-4 w-4" />,
//       color: 'text-emerald-500 dark:text-emerald-400',
//       bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
//       borderColor: 'border-emerald-100 dark:border-emerald-800/30',
//       textColor: 'text-emerald-700 dark:text-emerald-300'
//     },
//     'NEW_TRANSFER': {
//       icon: <Send className="h-4 w-4" />,
//       color: 'text-violet-500 dark:text-violet-400',
//       bgColor: 'bg-violet-50 dark:bg-violet-900/20',
//       borderColor: 'border-violet-100 dark:border-violet-800/30',
//       textColor: 'text-violet-700 dark:text-violet-300'
//     },
//     'KYC_PENDING': {
//       icon: <FileText className="h-4 w-4" />,
//       color: 'text-amber-500 dark:text-amber-400',
//       bgColor: 'bg-amber-50 dark:bg-amber-900/20',
//       borderColor: 'border-amber-100 dark:border-amber-800/30',
//       textColor: 'text-amber-700 dark:text-amber-300'
//     },
//     'DEFAULT': {
//       icon: <Clock className="h-4 w-4" />,
//       color: 'text-gray-500 dark:text-gray-400',
//       bgColor: 'bg-gray-50 dark:bg-gray-800/30',
//       borderColor: 'border-gray-100 dark:border-gray-700/30',
//       textColor: 'text-gray-600 dark:text-gray-300'
//     }
//   }), []);

//   // Activity card animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.2,
//         ease: "easeOut"
//       }
//     }),
//     exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
//   };

//   const fetchActivities = async (showRefreshing = false) => {
//     try {
//       if (showRefreshing) setRefreshing(true);
//       else setLoading(true);

//       setError(null);
//       const response = await activityAdminService.getRecentActivities(4, 1);
//       setActivities(response.data || []);
//     } catch (err: any) {
//       setError(err.message || "Failed to load recent activities.");
//       console.error("Error fetching recent activities:", err);
//     } finally {
//       setLoading(false);
//       if (showRefreshing) {
//         setTimeout(() => setRefreshing(false), 300); // Give visual feedback
//       }
//     }
//   };

//   useEffect(() => {
//     fetchActivities();

//     // Optional: Set up auto-refresh interval
//     const refreshInterval = setInterval(() => {
//       fetchActivities(true);
//     }, 60000); // Refresh every minute

//     return () => clearInterval(refreshInterval);
//   }, []);

//   // Get activity configuration based on type
//   const getActivityConfig = (type: ActivityItem['type']): ActivityConfig => {
//     return activityConfig[type] || activityConfig['DEFAULT'];
//   };

//   // Format human-readable time with smarter logic
//   const formatTime = (timestamp: string): string => {
//     const timeAgo = moment(timestamp).fromNow();
//     const today = moment().startOf('day');
//     const activityDate = moment(timestamp);

//     if (activityDate.isSame(today, 'day')) {
//       return `Today, ${activityDate.format('h:mm A')}`;
//     } else if (activityDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
//       return `Yesterday, ${activityDate.format('h:mm A')}`;
//     } else {
//       return timeAgo;
//     }
//   };

//   // Handler to manually refresh activities
//   const handleRefresh = (e: React.MouseEvent) => {
//     e.preventDefault();
//     fetchActivities(true);
//   };

//   if (loading) {
//     return (
//       <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border backdrop-blur-sm">
//         <div className="flex items-center justify-between mb-6">
//           <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
//           <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
//         </div>
//         <div className="space-y-3">
//           {[...Array(4)].map((_, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-4 p-3.5 rounded-lg border border-gray-200 dark:border-gray-700/50"
//               style={{
//                 opacity: 1 - (i * 0.15),
//                 animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`
//               }}
//             >
//               <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
//               <div className="flex-1">
//                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2.5"></div>
//                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-6"></div>
//         <style jsx>{`
//           @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 px-5 py-4 rounded-xl" role="alert">
//         <div className="flex items-center gap-3">
//           <div className="flex-shrink-0">
//             <AlertCircle className="h-5 w-5"/>
//           </div>
//           <div className="flex-1">
//             <h4 className="font-medium text-red-800 dark:text-red-300">Unable to load activities</h4>
//             <p className="text-sm mt-1">{error}</p>
//           </div>
//           <button
//             onClick={handleRefresh}
//             className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
//             aria-label="Retry loading activities"
//           >
//             <RefreshCw className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Calculate time categories for grouping
//   const hasRecentActivity = activities.some(a => moment(a.timestamp).isAfter(moment().subtract(4, 'hours')));

//   return (
//     <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border relative overflow-hidden">
//       {/* Header section */}
//       <div className="flex items-center justify-between mb-5 relative z-10">
//         <div className="flex items-center gap-2">
//           <Activity className="h-5 w-5 text-primary" />
//           <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
//             Recent Activity
//           </h3>
//         </div>

//         <div className="flex items-center gap-2">
//           {hasRecentActivity && (
//             <span className="flex items-center text-xs font-medium px-5 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full border border-green-100 dark:border-green-800/30">
//               <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
//               Recent
//             </span>
//           )}
//           <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className="h-12 w-12 rounded-full hover:bg-lightborder dark:hover:bg-primarybox"
//               >
//                 <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//         </div>
//       </div>

//       {/* Activity list with animations */}
//       <AnimatePresence mode="wait">
//         <div className="space-y-3 relative z-10">
//           {activities.length > 0 ? (
//             activities.map((activity, index) => {
//               const config = getActivityConfig(activity.type);

//               return (
//                 <motion.div
//                   key={`${activity.itemId}-${activity.timestamp}`}
//                   custom={index}
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   layout
//                   className={`p-3.5 rounded-lg border ${config.borderColor} ${config.bgColor} transition-all hover:shadow-md`}
//                 >
//                   <div className="flex items-center gap-3.5">
//                     <div className={`h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex-shrink-0 flex items-center justify-center shadow-sm border ${config.borderColor}`}>
//                       <span className={config.color}>
//                         {config.icon}
//                       </span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-neutral-800 dark:text-white text-sm">
//                         {activity.message}
//                       </p>
//                       <div className="flex items-center mt-1.5 text-xs font-medium">
//                         <span className={`${config.textColor}`}>
//                           {formatTime(activity.timestamp)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex flex-col items-center justify-center py-8 text-center"
//             >
//               <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
//                 <Clock className="h-6 w-6 text-gray-400 dark:text-gray-500" />
//               </div>
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No recent activity</p>
//               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Check back later for updates</p>
//             </motion.div>
//           )}
//         </div>
//       </AnimatePresence>
//       {/* View all button */}
//       <Link
//         href="/admin/activity"
//         className="mt-6 flex items-center justify-center w-full py-2.5 text-primary hover:text-white text-sm font-medium bg-primary/5 hover:bg-primary dark:bg-primary/10 dark:hover:bg-primary rounded-lg transition-all duration-200 group relative z-10"
//       >
//         <span>View all activity</span>
//         <ChevronRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
//       </Link>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  User,
  CreditCard,
  Send,
  FileText,
  AlertCircle,
  Clock,
  RefreshCw,
  Activity as ActivityIcon,
  MessageSquare,
  Activity,
} from "lucide-react";
import activityAdminService, {
  ActivityItem,
} from "../../../services/admin/activity.admin";
import moment from "moment";
// import { Button } from '@/components/ui/button'; // Removed Shadcn Button
import { Skeleton } from "@/components/ui/skeleton";

type ActivityConfig = {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
};

/**
 * Premium Recent Activity Component
 *
 * Displays the most recent system activity.
 * Design and skeleton for items match ActivityList.tsx.
 * Framer Motion animations have been removed.
 */
export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For initial load
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Specifically for refresh button click
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const activityConfig = useMemo<Record<string, ActivityConfig>>(
    () => ({
      NEW_USER: {
        icon: <User size={20} />,
        color: "text-blue-500 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
      },
      NEW_PAYMENT: {
        icon: <CreditCard size={20} />,
        color: "text-green-500 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
      },
      NEW_TRANSFER: {
        icon: <Send size={20} />,
        color: "text-purple-500 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
      },
      KYC_PENDING: {
        icon: <FileText size={20} />,
        color: "text-yellow-500 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      },
      SUPPORT_MESSAGE: {
        icon: <MessageSquare size={20} />,
        color: "text-indigo-500 dark:text-indigo-400",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      },
      KYC_VERIFIED: {
        icon: <FileText size={20} />,
        color: "text-teal-500 dark:text-teal-400",
        bgColor: "bg-teal-100 dark:bg-teal-900/30",
      },
      KYC_REJECTED: {
        icon: <FileText size={20} />,
        color: "text-red-500 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
      },
      DEFAULT: {
        icon: <Activity size={20} />,
        color: "text-gray-500 dark:text-gray-400",
        bgColor: "bg-gray-100 dark:bg-gray-700/30",
      },
    }),
    []
  );

  const fetchActivities = async (isRefreshClick = false) => {
    if (isRefreshClick) {
      setRefreshing(true); // Set refreshing true only for manual refresh clicks
    } else {
      setLoading(true); // Set loading true for initial load and interval refreshes
    }
    setError(null);
    try {
      const response = await activityAdminService.getRecentActivities(4, 1); // Fetch 4 items for recent activity
      setActivities(response.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load recent activities.");
      console.error("Error fetching recent activities:", err);
    } finally {
      if (isRefreshClick) {
        // Short delay for visual feedback on manual refresh
        setTimeout(() => setRefreshing(false), 300);
      }
      setLoading(false); // Always set loading to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchActivities(); // Initial fetch
    const refreshInterval = setInterval(() => {
      fetchActivities(false); // Interval refresh should not trigger the 'refreshing' state for skeletons
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(refreshInterval);
  }, []);

  const getActivityConfig = (type: ActivityItem["type"]): ActivityConfig => {
    return activityConfig[type] || activityConfig["DEFAULT"];
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!refreshing) {
      // Prevent multiple rapid clicks
      fetchActivities(true); // Pass true to indicate it's a manual refresh click
    }
  };

  const activitiesToDisplayCount = 4;
  const showSkeletons = loading || refreshing; // Show skeletons if initial loading OR if manually refreshing

  // Skeleton for initial loading (covers header and full component)
  if (loading && !refreshing && activities.length === 0) {
    // More specific condition for full component skeleton
    return (
      <div className="sm:w-3/4 w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="h-6 rounded-md w-40" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="space-y-3 mt-1">
          {[...Array(activitiesToDisplayCount)].map((_, i) => (
            <div
              key={`skel-recent-activity-${i}`}
              className="flex items-start bg-lightgray dark:bg-primarybox p-4 rounded-lg "
            >
              <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-lightborder dark:bg-accent" />
              <div className="flex-grow space-y-2.5">
                <Skeleton className="h-4 w-4/5 rounded-full bg-lightborder dark:bg-accent" />
                <Skeleton className="h-3 w-2/5 rounded-full bg-lightborder dark:bg-accent" />
              </div>
              <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-lightborder dark:bg-accent" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 rounded-lg w-full mt-6" />
      </div>
    );
  }

  if (error && !refreshing) {
    // Don't show main error if we are just trying to refresh
    return (
      <div
        className="sm:w-3/4 w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 px-5 py-4 rounded-xl"
        role="alert"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-red-800 dark:text-red-300">
              Unable to load activities
            </h4>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
            aria-label="Retry loading activities"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const hasRecentActivity = activities.some((a) =>
    moment(a.timestamp).isAfter(moment().subtract(4, "hours"))
  );

  return (
    <div className="sm:w-3/4 w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border relative overflow-hidden">
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-2">
          <ActivityIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Recent Activity
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Link
              href="/admin/activity"
              className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
            >
              <span>All Activity</span>
            </Link>
          )}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading} // Disable if already refreshing or initial loading
            className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white h-12.5 w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Refresh recent activity"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-3 relative">
        {showSkeletons ? ( // Show skeletons for the list if loading OR refreshing
          [...Array(activitiesToDisplayCount)].map((_, i) => (
            <div
              key={`skel-list-item-${i}`}
              className="flex items-start bg-lightgray dark:bg-primarybox p-4 rounded-lg "
            >
              <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-lightborder dark:bg-accent" />
              <div className="flex-grow space-y-2.5">
                <Skeleton className="h-4 w-4/5 rounded-full bg-lightborder dark:bg-accent" />
                <Skeleton className="h-3 w-2/5 rounded-full bg-lightborder dark:bg-accent" />
              </div>
              <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-lightborder dark:bg-accent" />
            </div>
          ))
        ) : activities.length > 0 ? (
          activities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            return (
              <div
                key={`${activity.itemId || "activity"}-${
                  activity.timestamp
                }-${index}`}
                className="flex items-start bg-lightgray dark:bg-primarybox p-3.5 sm:p-4 rounded-lg transition-all duration-150 ease-out cursor-default"
              >
                <div
                  className={`flex-shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full ${config.bgColor} flex items-center justify-center mr-3.5 sm:mr-4`}
                >
                  <span className={config.color}>{config.icon}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm text-neutral-900 dark:text-white break-words">
                    {activity.message}
                    {activity.itemId && (
                      <span className="block text-xs text-gray-500 dark:text-gray-300 sm:mt-1 mt-2">
                        ID: {activity.itemId}
                      </span>
                    )}
                  </p>
                  {isMobile && (
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {moment(activity.timestamp).format(
                          "MMM D, YYYY h:mm A"
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        ({moment(activity.timestamp).fromNow()})
                      </p>
                    </div>
                  )}
                </div>
                {!isMobile && (
                  <div className="flex flex-col items-end gap-1 ml-2 sm:ml-4 flex-shrink-0 self-start pt-0.5">
                    <p className="text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      {moment(activity.timestamp).format("MMM D, YYYY h:mm A")}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      ({moment(activity.timestamp).fromNow()})
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
              <Clock className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No recent activity
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Check back later for updates
            </p>
          </div>
        )}
      </div>
      {isMobile && (
            <Link
              href="/admin/activity"
              className="mt-3 flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
            >
              <span>All Activity</span>
            </Link>
          )}
    </div>
  );
}


// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
// import Link from "next/link";
// import {
//   User,
//   CreditCard,
//   Send,
//   FileText,
//   AlertCircle,
//   Clock,
//   RefreshCw,
//   Activity as ActivityIcon, // Renamed to avoid conflict with local Activity type if any
//   MessageSquare,
// } from "lucide-react";
// import activityAdminService, {
//   ActivityItem,
// } from "../../../services/admin/activity.admin";
// import moment from "moment";
// import { Skeleton } from "@/components/ui/skeleton";

// type ActivityConfig = {
//   icon: React.ReactNode;
//   color: string;
//   bgColor: string;
// };

// /**
//  * Premium Recent Activity Component
//  *
//  * Displays the most recent system activity.
//  * Data is fetched on initial load and on manual refresh.
//  */
// export default function RecentActivity() {
//   const [activities, setActivities] = useState<ActivityItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true); // For initial load
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState<boolean>(false); // Specifically for refresh button click
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const activityConfig = useMemo<Record<string, ActivityConfig>>(
//     () => ({
//       NEW_USER: {
//         icon: <User size={20} />,
//         color: "text-blue-500 dark:text-blue-400",
//         bgColor: "bg-blue-100 dark:bg-blue-900/30",
//       },
//       NEW_PAYMENT: {
//         icon: <CreditCard size={20} />,
//         color: "text-green-500 dark:text-green-400",
//         bgColor: "bg-green-100 dark:bg-green-900/30",
//       },
//       NEW_TRANSFER: {
//         icon: <Send size={20} />,
//         color: "text-purple-500 dark:text-purple-400",
//         bgColor: "bg-purple-100 dark:bg-purple-900/30",
//       },
//       KYC_PENDING: {
//         icon: <FileText size={20} />,
//         color: "text-yellow-500 dark:text-yellow-400",
//         bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
//       },
//       SUPPORT_MESSAGE: {
//         icon: <MessageSquare size={20} />,
//         color: "text-indigo-500 dark:text-indigo-400",
//         bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
//       },
//       KYC_VERIFIED: {
//         icon: <FileText size={20} />,
//         color: "text-teal-500 dark:text-teal-400",
//         bgColor: "bg-teal-100 dark:bg-teal-900/30",
//       },
//       KYC_REJECTED: {
//         icon: <FileText size={20} />,
//         color: "text-red-500 dark:text-red-400",
//         bgColor: "bg-red-100 dark:bg-red-900/30",
//       },
//       DEFAULT: {
//         icon: <ActivityIcon size={20} />, // Using renamed import
//         color: "text-gray-500 dark:text-gray-400",
//         bgColor: "bg-gray-100 dark:bg-gray-700/30",
//       },
//     }),
//     []
//   );

//   // Using useCallback for fetchActivities as it's a dependency of useEffect
//   const fetchActivities = useCallback(async (isManualRefresh = false) => {
//     if (isManualRefresh) {
//       setRefreshing(true);
//     } else {
//       setLoading(true); // Only set general loading for initial fetch
//     }
//     setError(null);
//     try {
//       const response = await activityAdminService.getRecentActivities(4, 1);
//       setActivities(response.data || []);
//     } catch (err: any) {
//       setError(err.message || "Failed to load recent activities.");
//       console.error("Error fetching recent activities:", err);
//     } finally {
//       if (isManualRefresh) {
//         setTimeout(() => setRefreshing(false), 300); // Visual feedback for manual refresh
//       }
//       setLoading(false); // Always set general loading to false
//     }
//   }, []); // Empty dependency array as it doesn't depend on props/state outside its scope

//   // Effect for initial data fetch
//   useEffect(() => {
//     fetchActivities(false); // Initial fetch, not a manual refresh
//   }, [fetchActivities]); // fetchActivities is now stable due to useCallback

//   const getActivityConfig = (type: ActivityItem["type"]): ActivityConfig => {
//     return activityConfig[type] || activityConfig["DEFAULT"];
//   };

//   const handleRefresh = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (!refreshing && !loading) { // Prevent refresh if already refreshing or initial loading
//       fetchActivities(true); // Indicate manual refresh
//     }
//   };

//   const activitiesToDisplayCount = 4;
//   const showSkeletonsForList = refreshing || (loading && activities.length === 0); // Show list skeletons if refreshing OR (initial loading AND no activities yet)

//   // Skeleton for the entire component on initial load when no activities are present yet
//   if (loading && activities.length === 0 && !refreshing) {
//     return (
//       <div className="sm:w-3/4 w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border border-border">
//         <div className="flex items-center justify-between mb-5">
//           <Skeleton className="h-6 rounded-md w-40 bg-muted" />
//           <Skeleton className="h-9 w-9 rounded-full bg-muted" />
//         </div>
//         <div className="space-y-3 mt-1">
//           {[...Array(activitiesToDisplayCount)].map((_, i) => (
//             <div
//               key={`skel-recent-activity-${i}`}
//               className="flex items-start bg-muted/50 dark:bg-primarybox/70 p-4 rounded-lg "
//             >
//               <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-muted" />
//               <div className="flex-grow space-y-2.5">
//                 <Skeleton className="h-4 w-4/5 rounded-full bg-muted" />
//                 <Skeleton className="h-3 w-2/5 rounded-full bg-muted" />
//               </div>
//               <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-muted" />
//             </div>
//           ))}
//         </div>
//         <Skeleton className="h-10 rounded-lg w-full mt-6 bg-muted" />
//       </div>
//     );
//   }

//   if (error && !refreshing) { // Show main error only if not in the middle of a manual refresh
//     return (
//       <div
//         className="sm:w-3/4 w-full bg-destructive/10 dark:bg-destructive/20 border border-destructive/30 text-destructive dark:text-destructive-foreground px-5 py-4 rounded-xl"
//         role="alert"
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex-shrink-0">
//             <AlertCircle className="h-5 w-5" />
//           </div>
//           <div className="flex-1">
//             <h4 className="font-medium">Unable to load activities</h4>
//             <p className="text-sm mt-1">{error}</p>
//           </div>
//           <button
//             onClick={handleRefresh}
//             className="p-2 rounded-md hover:bg-destructive/20 dark:hover:bg-destructive/30 transition-colors"
//             aria-label="Retry loading activities"
//           >
//             <RefreshCw className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="sm:w-3/4 w-full bg-card dark:bg-primarybox sm:p-6 p-4 rounded-xl border border-border relative overflow-hidden">
//       <div className="flex items-center justify-between mb-5 relative">
//         <div className="flex items-center gap-2">
//           <ActivityIcon className="h-5 w-5 text-primary" />
//           <h3 className="text-lg font-semibold text-card-foreground dark:text-white">
//             Recent Activity
//           </h3>
//         </div>
//         <div className="flex items-center gap-2">
//           {!isMobile && (
//             <Link
//               href="/admin/activity"
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-primary-foreground font-medium text-sm px-6 py-2.5 h-10 rounded-full hover:bg-primary/90 transition-all duration-75 ease-linear"
//             >
//               <span>All Activity</span>
//             </Link>
//           )}
//           <button
//             type="button"
//             onClick={handleRefresh}
//             disabled={refreshing || loading}
//             className="flex items-center justify-center cursor-pointer gap-2 bg-muted hover:bg-muted/80 dark:bg-primarybox/70 dark:hover:bg-secondarybox text-muted-foreground dark:text-white h-10 w-10 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
//             aria-label="Refresh recent activity"
//           >
//             <RefreshCw
//               className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
//             />
//           </button>
//         </div>
//       </div>

//       <div className="space-y-3 relative">
//         {showSkeletonsForList ? (
//           [...Array(activitiesToDisplayCount)].map((_, i) => (
//             <div
//               key={`skel-list-item-${i}`}
//               className="flex items-start bg-muted/50 dark:bg-primarybox/70 p-4 rounded-lg "
//             >
//               <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-muted" />
//               <div className="flex-grow space-y-2.5">
//                 <Skeleton className="h-4 w-4/5 rounded-full bg-muted" />
//                 <Skeleton className="h-3 w-2/5 rounded-full bg-muted" />
//               </div>
//               <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-muted" />
//             </div>
//           ))
//         ) : activities.length > 0 ? (
//           activities.map((activity, index) => {
//             const config = getActivityConfig(activity.type);
//             return (
//               <div
//                 key={`${activity.itemId || "activity"}-${activity.timestamp}-${index}`}
//                 className="flex items-start bg-muted/30 dark:bg-primarybox/60 p-3.5 sm:p-4 rounded-lg transition-all duration-150 ease-out cursor-default"
//               >
//                 <div
//                   className={`flex-shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full ${config.bgColor} flex items-center justify-center mr-3.5 sm:mr-4`}
//                 >
//                   <span className={config.color}>{config.icon}</span>
//                 </div>
//                 <div className="flex-grow min-w-0">
//                   <p className="text-sm text-foreground dark:text-white break-words">
//                     {activity.message}
//                     {activity.itemId && (
//                       <span className="block text-xs text-muted-foreground sm:mt-0.5 mt-1">
//                         ID: {activity.itemId}
//                       </span>
//                     )}
//                   </p>
//                   {isMobile && ( // Timestamp for mobile shown below message
//                     <div className="mt-1.5 flex flex-col items-start gap-0.5">
//                       <p className="text-xs text-muted-foreground whitespace-nowrap">
//                         {moment(activity.timestamp).format("MMM D, h:mm A")}
//                       </p>
//                       <p className="text-xs text-muted-foreground/80 whitespace-nowrap">
//                         ({moment(activity.timestamp).fromNow()})
//                       </p>
//                     </div>
//                   )}
//                 </div>
//                 {!isMobile && ( // Timestamp for desktop on the right
//                   <div className="flex flex-col items-end gap-0.5 ml-2 sm:ml-4 flex-shrink-0 self-start pt-0.5">
//                     <p className="text-xs text-muted-foreground whitespace-nowrap">
//                       {moment(activity.timestamp).format("MMM D, YYYY h:mm A")}
//                     </p>
//                     <p className="text-xs text-muted-foreground/80 whitespace-nowrap">
//                       ({moment(activity.timestamp).fromNow()})
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         ) : ( // No activities state
//           <div className="flex flex-col items-center justify-center py-8 text-center">
//             <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
//               <Clock className="h-6 w-6 text-muted-foreground/70" />
//             </div>
//             <p className="text-sm font-medium text-muted-foreground">
//               No recent activity
//             </p>
//             <p className="text-xs text-muted-foreground/80 mt-1">
//               Check back later or try refreshing.
//             </p>
//           </div>
//         )}
//       </div>
//       {isMobile && ( // "All Activity" button for mobile shown at the bottom
//             <Link
//               href="/admin/activity"
//               className="mt-4 flex items-center justify-center cursor-pointer gap-2 bg-primary text-primary-foreground font-medium text-sm px-6 py-2.5 h-10 rounded-full hover:bg-primary/90 transition-all duration-75 ease-linear"
//             >
//               <span>All Activity</span>
//             </Link>
//           )}
//     </div>
//   );
// }