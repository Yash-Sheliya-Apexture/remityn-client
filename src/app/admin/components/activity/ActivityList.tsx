// 'use client';
// import React from 'react';
// import { motion } from 'framer-motion';
// import moment from 'moment';
// import { ActivityItem } from '../../../services/admin/activity.admin'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
// import { User, CreditCard, Send, FileText, MessageSquare, Activity } from 'lucide-react'; // Added more icons

// interface ActivityListProps {
//     activities: ActivityItem[];
//     loading: boolean; // For initial load or when filters/pagination changes significantly
//     isRefreshing: boolean; // Specifically for the refresh button action
//     activitiesPerPage: number; // To show correct number of skeletons
// }

// // Helper to get an icon and color based on activity type for a more vibrant UI
// const getActivityDisplayProps = (type: ActivityItem['type']) => {
//     switch (type) {
//         case 'NEW_USER':
//             return { icon: <User size={20} />, color: 'text-blue-500 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' };
//         case 'NEW_PAYMENT':
//             return { icon: <CreditCard size={20} />, color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' };
//         case 'NEW_TRANSFER':
//             return { icon: <Send size={20} />, color: 'text-purple-500 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' };
//         case 'KYC_PENDING':
//             return { icon: <FileText size={20} />, color: 'text-yellow-500 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' };
//         case 'KYC_VERIFIED':
//             return { icon: <FileText size={20} />, color: 'text-teal-500 dark:text-teal-400', bgColor: 'bg-teal-100 dark:bg-teal-900/30' };
//         case 'KYC_REJECTED':
//             return { icon: <FileText size={20} />, color: 'text-red-500 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' };
//         case 'SUPPORT_MESSAGE':
//              return { icon: <MessageSquare size={20} />, color: 'text-indigo-500 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' };
//         default:
//             return { icon: <Activity size={20} />, color: 'text-gray-500 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-700/30' };
//     }
// };


// const ActivityList: React.FC<ActivityListProps> = ({
//     activities,
//     loading,
//     isRefreshing,
//     activitiesPerPage
// }) => {

//     const showSkeletons = loading || isRefreshing;

//     if (showSkeletons) {
//         return (
//             <div className="space-y-3 mt-1">
//                 {[...Array(activitiesPerPage)].map((_, i) => (
//                     <div key={`skel-activity-${i}`} className="flex items-start bg-lightgray dark:bg-primarybox p-4 rounded-lg ">
//                         <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-lightborder dark:bg-accent" />
//                         <div className="flex-grow space-y-2.5">
//                             <Skeleton className="h-4 w-4/5 rounded-full bg-lightborder dark:bg-accent" />
//                             <Skeleton className="h-3 w-2/5 rounded-full bg-lightborder dark:bg-accent" />
//                         </div>
//                         <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-lightborder dark:bg-accent" />
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     if (!activities || activities.length === 0) {
//         return (
//             <div className="text-center py-16 text-gray-500 dark:text-gray-400">
//                 <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     No activities found matching your criteria.
//                 </motion.p>
//             </div>
//         );
//     }

//     return (
//         <div className="mt-1 space-y-3">
//             {activities.map((activity, index) => {
//                 const { icon, color, bgColor } = getActivityDisplayProps(activity.type);
//                 return (
//                     <motion.div
//                         key={activity.itemId ? `${activity.itemId}-${activity.timestamp}` : `${activity.message}-${index}`}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05, duration: 0.3 }}
//                         className="flex items-start bg-lightgray dark:bg-primarybox p-3.5 sm:p-4 rounded-lg transition-all duration-150 ease-out cursor-default"
//                     >
//                         <div className={`flex-shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full ${bgColor} flex items-center justify-center mr-3.5 sm:mr-4 ${color}`}>
//                             {icon}
//                         </div>
//                         <div className="flex-grow min-w-0"> {/* Added min-w-0 for better flex handling of long text */}
//                             <p className="text-sm text-neutral-800 dark:text-neutral-100 leading-relaxed break-words"> {/* break-words for long messages */}
//                                 {activity.message}
//                                 {activity.itemId && (
//                                     <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
//                                         ID: {activity.itemId}
//                                     </span>
//                                 )}
//                             </p>
//                         </div>

//                         {/* Date & time */}
//                         <div className="text-right ml-2 sm:ml-4 flex-shrink-0 self-start pt-0.5">
//                             <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                                 {moment(activity.timestamp).format('MMM D, YYYY h:mm A')}
//                             </p>
//                             <p className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap hidden md:block">
//                                 ({moment(activity.timestamp).fromNow()})
//                             </p>
//                         </div>
//                     </motion.div>
//                 );
//             })}
//         </div>
//     );
// };

// export default ActivityList;



'use client';
import React, { useState, useEffect } from 'react'; // Added useState and useEffect
import { motion } from 'framer-motion';
import moment from 'moment';
import { ActivityItem } from '../../../services/admin/activity.admin'; // Adjust path
import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
import { User, CreditCard, Send, FileText, MessageSquare, Activity } from 'lucide-react';

interface ActivityListProps {
    activities: ActivityItem[];
    loading: boolean;
    isRefreshing: boolean;
    activitiesPerPage: number;
}

const getActivityDisplayProps = (type: ActivityItem['type']) => {
    switch (type) {
        case 'NEW_USER':
            return { icon: <User size={20} />, color: 'text-blue-500 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' };
        case 'NEW_PAYMENT':
            return { icon: <CreditCard size={20} />, color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' };
        case 'NEW_TRANSFER':
            return { icon: <Send size={20} />, color: 'text-purple-500 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' };
        case 'KYC_PENDING':
            return { icon: <FileText size={20} />, color: 'text-yellow-500 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' };
        case 'KYC_VERIFIED':
            return { icon: <FileText size={20} />, color: 'text-teal-500 dark:text-teal-400', bgColor: 'bg-teal-100 dark:bg-teal-900/30' };
        case 'KYC_REJECTED':
            return { icon: <FileText size={20} />, color: 'text-red-500 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' };
        case 'SUPPORT_MESSAGE':
             return { icon: <MessageSquare size={20} />, color: 'text-indigo-500 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' };
        default:
            return { icon: <Activity size={20} />, color: 'text-gray-500 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-700/30' };
    }
};

const ActivityList: React.FC<ActivityListProps> = ({
    activities,
    loading,
    isRefreshing,
    activitiesPerPage
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
        };

        checkScreenSize(); // Initial check
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const showSkeletons = loading || isRefreshing;

    if (showSkeletons) {
        return (
            <div className="space-y-3 mt-1">
                {[...Array(activitiesPerPage)].map((_, i) => (
                    <div key={`skel-activity-${i}`} className="flex items-start bg-lightgray dark:bg-primarybox p-4 rounded-lg ">
                        <Skeleton className="h-10 w-10 rounded-full mr-4 flex-shrink-0 bg-lightborder dark:bg-accent" />
                        <div className="flex-grow space-y-2.5">
                            <Skeleton className="h-4 w-4/5 rounded-full bg-lightborder dark:bg-accent" />
                            <Skeleton className="h-3 w-2/5 rounded-full bg-lightborder dark:bg-accent" />
                        </div>
                        <Skeleton className="h-3 w-24 rounded-full ml-4 flex-shrink-0 self-start mt-1 bg-lightborder dark:bg-accent" />
                    </div>
                ))}
            </div>
        );
    }

    if (!activities || activities.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    No activities found matching your criteria.
                </motion.p>
            </div>
        );
    }

    return (
        <div className="mt-1 space-y-3">
            {activities.map((activity, index) => {
                const { icon, color, bgColor } = getActivityDisplayProps(activity.type);
                return (
                  <motion.div
                    key={
                      activity.itemId
                        ? `${activity.itemId}-${activity.timestamp}`
                        : `${activity.message}-${index}`
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start bg-lightgray dark:bg-primarybox p-3.5 sm:p-4 rounded-lg transition-all duration-150 ease-out cursor-default"
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full ${bgColor} flex items-center justify-center mr-3.5 sm:mr-4`}
                    >
                      <span className={color}>{icon}</span>
                    </div>

                    {/* Main content: Message, ID, and conditionally Mobile Date/Time */}
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

                    {/* Conditionally Desktop Date/Time */}
                    {!isMobile && (
                      <div className="flex flex-col items-end gap-1 ml-2 sm:ml-4 flex-shrink-0 self-start pt-0.5">
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
                  </motion.div>
                );
            })}
        </div>
    );
};

export default ActivityList;