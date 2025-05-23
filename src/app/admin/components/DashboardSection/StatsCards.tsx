// import React from 'react';
// import {
//   Activity,
//   Users,
//   Globe,
//   TrendingUp,
//   Settings,
// } from "lucide-react";

// export default function StatsCards() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       {/* Total Users Card */}
//       <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-lg font-medium text-neutral-900 dark:text-white">
//               Total Users
//             </p>
//             <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//               150
//             </h3>
//             <p className="text-sm text-green-600 flex items-center mt-2">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               <span>+12% this week</span>
//             </p>
//           </div>
//           <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-lg">
//             <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//           </div>
//         </div>
//       </div>

//       {/* Today's Add Money Card */}
//       <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-lg font-medium text-neutral-900 dark:text-white">
//               Today's Add Money
//             </p>
//             <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//               32
//             </h3>
//             <p className="text-sm text-yellow-600 flex items-center mt-2">
//               <Activity className="h-4 w-4 mr-1" />
//               <span>-5% from yesterday</span>
//             </p>
//           </div>
//           <div className="bg-yellow-100 dark:bg-yellow-600/20 p-3 rounded-lg">
//             <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
//           </div>
//         </div>
//       </div>

//       {/* Today's Send Money Card */}
//       <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-lg font-medium text-neutral-900 dark:text-white">
//               Today's Send Money
//             </p>
//             <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//               98%
//             </h3>
//             <p className="text-sm text-green-600 flex items-center mt-2">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               <span>All systems operational</span>
//             </p>
//           </div>
//           <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-lg">
//             <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
//           </div>
//         </div>
//       </div>

//       {/* Completed Transfers Card */}
//       <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-lg font-medium text-neutral-900 dark:text-white">
//               Completed Transfers
//             </p>
//             <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//               45
//             </h3>
//             <p className="text-sm text-green-600 flex items-center mt-2">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               <span>+3 this month</span>
//             </p>
//           </div>
//           <div className="bg-purple-100 dark:bg-purple-600/20 p-3 rounded-lg">
//             <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// frontend/src/components/DashboardSection/StatsCards.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle, // For completed transfers icon if needed
} from "lucide-react";
import statsAdminService, {
  AdminDashboardStats,
} from "../../../services/admin/stats.admin"; // Adjust path
import { TbMoneybag } from "react-icons/tb";
import { BsCheck2Circle, BsSend } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsCards() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await statsAdminService.getAdminDashboardOverviewStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard statistics.");
        console.error("Error fetching stats cards data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    // Skeleton loader remains the same
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border flex justify-between"
          >
            <div>
              <Skeleton className="h-7 rounded w-46 mb-2"></Skeleton>
              <Skeleton className="h-9 rounded w-20 mb-3"></Skeleton>
              <Skeleton className="h-5 rounded w-2/3"></Skeleton>
            </div>
            <div>
              <Skeleton className="rounded-full size-12"></Skeleton>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    // Error display remains the same
    return (
      <div
        className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative flex items-center"
        role="alert"
      >
        <AlertCircle className="h-5 w-5 mr-2" />
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // --- User Growth Trend ---
  const userGrowthTrend = stats?.growthPercentageThisWeek ?? 0;
  const userTrendColor =
    userGrowthTrend > 0
      ? "text-green-600"
      : userGrowthTrend < 0
      ? "text-red-600"
      : "text-gray-500";
  const UserTrendIconComponent =
    userGrowthTrend > 0
      ? TrendingUp
      : userGrowthTrend < 0
      ? TrendingDown
      : null;
  const userTrendPrefix = userGrowthTrend > 0 ? "+" : "";

  // --- "Add Money" Trend ---
  const addMoneyChange = stats?.addMoneyChangePercentage ?? 0;
  const addMoneyTrendColor =
    addMoneyChange > 0
      ? "text-green-600"
      : addMoneyChange < 0
      ? "text-red-600"
      : "text-gray-500";
  const AddMoneyTrendIconComponent =
    addMoneyChange > 0
      ? TrendingUp
      : addMoneyChange < 0
      ? TrendingDown
      : TbMoneybag;
  const addMoneyTrendPrefix = addMoneyChange > 0 ? "+" : "";

  // --- "Send Money" (Initiation) Trend ---
  const sendMoneyChange = stats?.sendMoneyChangePercentage ?? 0;
  const sendMoneyTrendColor =
    sendMoneyChange > 0
      ? "text-green-600"
      : sendMoneyChange < 0
      ? "text-red-600"
      : "text-gray-500";
  const SendMoneyTrendIconComponent =
    sendMoneyChange > 0
      ? TrendingUp
      : sendMoneyChange < 0
      ? TrendingDown
      : BsSend; // Using Settings if 0% change for variety
  const sendMoneyTrendPrefix = sendMoneyChange > 0 ? "+" : "";

  // --- "Completed Transfers" Trend ---
  const completedChangeCount = stats?.completedTransfersChangeCount ?? 0;
  const completedTrendColor =
    completedChangeCount > 0
      ? "text-green-600"
      : completedChangeCount < 0
      ? "text-red-600"
      : "text-gray-500";
  // For count change, an up or down arrow is good. If 0, maybe no icon or a neutral one.
  const CompletedTrendIconComponent =
    completedChangeCount > 0
      ? TrendingUp
      : completedChangeCount < 0
      ? TrendingDown
      : CheckCircle;
  const completedTrendPrefix = completedChangeCount > 0 ? "+" : ""; // Negative sign inherent

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Total Users Card */}
      <div className="dark:bg-primarybox sm:p-6 p-4 rounded-xl border">
        <div className="flex justify-between items-start">
          <div className="Admin-Card">
            <p className="text-lg font-medium text-gray-500 dark:text-gray-300">
              Total Users
            </p>

            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">
              {stats?.totalUsers ?? "N/A"}
            </h3>
            <p className={`text-sm ${userTrendColor} flex items-center mt-2`}>
              {UserTrendIconComponent && (
                <UserTrendIconComponent className="h-4 w-4 mr-1" />
              )}
              <span>
                {userTrendPrefix}
                {userGrowthTrend.toFixed(1)}% this week
              </span>
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-full">
            <Users className="size-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Today's Add Money Card */}
      <div className="dark:bg-primarybox sm:p-6 p-4 rounded-xl border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-300">
              Today's Add Money
            </p>
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">
              {stats?.todaysAddMoneyCount ?? "N/A"}
            </h3>
            <p
              className={`text-sm ${addMoneyTrendColor} flex items-center mt-2`}
            >
              {AddMoneyTrendIconComponent && (
                <AddMoneyTrendIconComponent className="h-4 w-4 mr-1" />
              )}
              <span>
                {addMoneyTrendPrefix}
                {addMoneyChange.toFixed(1)}% from yesterday
              </span>
            </p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-600/20 p-3 rounded-full">
            <TbMoneybag className="size-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Today's Send Money Card - Now Dynamic */}
      <div className="dark:bg-primarybox sm:p-6 p-4 rounded-xl border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-300">
              Today's Send Money
            </p>
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">
              {stats?.todaysSendMoneyCount ?? "N/A"}
            </h3>
            <p
              className={`text-sm ${sendMoneyTrendColor} flex items-center mt-2`}
            >
              {SendMoneyTrendIconComponent && (
                <SendMoneyTrendIconComponent className="h-4 w-4 mr-1" />
              )}
              <span>
                {sendMoneyTrendPrefix}
                {sendMoneyChange.toFixed(1)}% from yesterday 
              </span>
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-full">
            <BsSend className="size-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Completed Transfers Card - Now Dynamic */}
      <div className="dark:bg-primarybox sm:p-6 p-4 rounded-xl border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-300">
              Completed Transfers
            </p>
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">
              {stats?.completedTransfersThisMonth ?? "N/A"}
            </h3>
            <p
              className={`text-sm ${completedTrendColor} flex items-center mt-2`}
            >
              {CompletedTrendIconComponent && (
                <CompletedTrendIconComponent className="h-4 w-4 mr-1" />
              )}
              <span>
                {completedTrendPrefix}
                {completedChangeCount} this month
              </span>
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-600/20 p-3 rounded-full">
            <BsCheck2Circle  className="size-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
