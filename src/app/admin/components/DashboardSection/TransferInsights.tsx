// import React from 'react';
// import {
//   DollarSign,
//   BarChart,
//   ArrowUpRight,
//   MapPin,
//   RefreshCw,
//   ArrowDownRight,
// } from "lucide-react";

// export default function TransferInsights() {
//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//         Transfer Insights
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Transfer Volume */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Transfer Volume
//             </h4>
//             <DollarSign className="h-5 w-5 text-green-500" />
//           </div>
//           <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
//             {/* Placeholder for actual chart */}
//             <BarChart className="h-24 w-24 text-gray-400" />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 Total Volume
//               </p>
//               <p className="text-lg font-semibold text-neutral-900 dark:text-white">
//                 $1,245,678
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 Growth
//               </p>
//               <p className="text-lg font-semibold text-green-600 flex items-center">
//                 <ArrowUpRight className="h-4 w-4 mr-1" />
//                 15.2%
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Popular Corridors */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Popular Corridors
//             </h4>
//             <MapPin className="h-5 w-5 text-blue-500" />
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
//                     US
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                     US → Mexico
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">
//                     USD to MXN
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 32%
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-xs font-medium text-green-600 dark:text-green-400">
//                     UK
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                     UK → India
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">
//                     GBP to INR
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 24%
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
//                     CA
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                     Canada → Philippines
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-300">
//                     CAD to PHP
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 18%
//               </p>
//             </div>
//           </div>
//           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//             View all corridors →
//           </button>
//         </div>

//         {/* Currency Performance */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Currency Performance
//             </h4>
//             <RefreshCw className="h-5 w-5 text-purple-500" />
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-xs font-medium text-green-600 dark:text-green-400">
//                     USD
//                   </span>
//                 </div>
//                 <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                   US Dollar
//                 </p>
//               </div>
//               <p className="text-sm font-semibold text-green-600 flex items-center">
//                 <ArrowUpRight className="h-4 w-4 mr-1" />
//                 1.2%
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
//                     EUR
//                   </span>
//                 </div>
//                 <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                   Euro
//                 </p>
//               </div>
//               <p className="text-sm font-semibold text-red-500 flex items-center">
//                 <ArrowDownRight className="h-4 w-4 mr-1" />
//                 0.5%
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
//                     GBP
//                   </span>
//                 </div>
//                 <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                   British Pound
//                 </p>
//               </div>
//               <p className="text-sm font-semibold text-green-600 flex items-center">
//                 <ArrowUpRight className="h-4 w-4 mr-1" />
//                 0.8%
//               </p>
//             </div>
//           </div>
//           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//             Currency management →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/components/DashboardSection/TransferInsights.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import {
//   DollarSign,
//   BarChart,
//   ArrowUpRight,
//   MapPin,
//   RefreshCw,
//   ArrowDownRight,
//   TrendingDown, // For negative growth/decrease
// } from "lucide-react";
// // Import the service and types including the new CurrencyPerformanceStat
// import statsAdminService, {
//     AdminDashboardStats,
//     PopularCorridorStat,
//     CurrencyPerformanceStat // <-- Import this
// } from '../../../services/admin/stats.admin'; // Adjust path as needed

// export default function TransferInsights() {
//   // State for the different parts of the insights section
//   const [transferVolume, setTransferVolume] = useState<number | null>(null);
//   const [volumeGrowth, setVolumeGrowth] = useState<number | null>(null);
//   const [popularCorridors, setPopularCorridors] = useState<PopularCorridorStat[]>([]);
//   const [currencyPerformance, setCurrencyPerformance] = useState<CurrencyPerformanceStat[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch all necessary stats when the component mounts
//   useEffect(() => {
//     const fetchInsightStats = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         // Fetch the combined overview stats from the backend
//         const data: AdminDashboardStats = await statsAdminService.getAdminDashboardOverviewStats();
//         setTransferVolume(data.totalVolumeLast30Days);
//         setVolumeGrowth(data.volumeGrowthPercentage);
//         setPopularCorridors(data.popularCorridors || []);
//         setCurrencyPerformance(data.currencyPerformance || []); // Set the currency performance state
//       } catch (err: any) {
//         setError(err.message || 'Failed to load transfer insights.');
//         console.error("Error fetching transfer insights data:", err);
//         // Clear data on error
//         setTransferVolume(null);
//         setVolumeGrowth(null);
//         setPopularCorridors([]);
//         setCurrencyPerformance([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInsightStats();
//   }, []); // Empty dependency array ensures this runs once on mount

//   // Helper function to format currency values
//   const formatCurrency = (value: number | null) => {
//     if (value === null || isNaN(value)) return 'N/A';
//     // Assuming USD for display simplicity. Adjust based on your base currency logic.
//     return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
//   };

//   // Calculate display elements for Transfer Volume Growth
//   const growthTrendForVolume = volumeGrowth ?? 0;
//   const VolumeGrowthIcon = growthTrendForVolume > 0 ? ArrowUpRight : growthTrendForVolume < 0 ? TrendingDown : null;
//   const volumeGrowthColor = growthTrendForVolume > 0 ? "text-green-600" : growthTrendForVolume < 0 ? "text-red-600" : "text-gray-500";
//   const volumeGrowthPrefix = growthTrendForVolume > 0 ? "+" : "";

//   // Helper to get a consistent color for corridor/currency icons based on code
//   const getIconColorStyle = (uniqueString: string) => {
//     let hash = 0;
//     for (let i = 0; i < uniqueString.length; i++) {
//         hash = uniqueString.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const colors = [
//         { bg: 'bg-blue-100 dark:bg-blue-800/30', text: 'text-blue-600 dark:text-blue-400' },
//         { bg: 'bg-green-100 dark:bg-green-800/30', text: 'text-green-600 dark:text-green-400' },
//         { bg: 'bg-purple-100 dark:bg-purple-800/30', text: 'text-purple-600 dark:text-purple-400' },
//         { bg: 'bg-yellow-100 dark:bg-yellow-800/30', text: 'text-yellow-600 dark:text-yellow-400' },
//         { bg: 'bg-red-100 dark:bg-red-800/30', text: 'text-red-600 dark:text-red-400' },
//         { bg: 'bg-indigo-100 dark:bg-indigo-800/30', text: 'text-indigo-600 dark:text-indigo-400' },
//         { bg: 'bg-pink-100 dark:bg-pink-800/30', text: 'text-pink-600 dark:text-pink-400' },
//         { bg: 'bg-teal-100 dark:bg-teal-800/30', text: 'text-teal-600 dark:text-teal-400' },
//     ];
//     return colors[Math.abs(hash) % colors.length];
//   };

//   // Map currency codes to full names (optional, enhance as needed)
//   const currencyNames: { [key: string]: string } = {
//     USD: 'US Dollar',
//     EUR: 'Euro',
//     GBP: 'British Pound',
//     AUD: 'Australian Dollar',
//     CAD: 'Canadian Dollar',
//     INR: 'Indian Rupee',
//     // Add other currencies you track
//   };

//   // --- RENDER LOGIC ---

//   if (loading) {
//     // Skeleton Loader state
//     return (
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//           Transfer Insights
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Skeleton for Transfer Volume */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[250px]">
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//             <div className="h-40 bg-gray-100 dark:bg-gray-700/50 rounded-lg mb-4"></div>
//             <div className="flex justify-between">
//                 <div className="w-1/2 pr-2"><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div></div>
//                 <div className="w-1/2 pl-2"><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div></div>
//             </div>
//           </div>
//           {/* Skeleton for Popular Corridors (for 4 items) */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[280px]">
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//             {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded mb-2"></div>)}
//           </div>
//           {/* Skeleton for Currency Performance */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[250px]">
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//             {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded mb-2"></div>)}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     // Error Display state
//     return (
//         <div className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative" role="alert">
//             <strong className="font-bold">Error loading Transfer Insights:</strong>
//             <span className="block sm:inline"> {error}</span>
//         </div>
//     );
//   }

//   // Success State - Render the cards with dynamic data
//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//         Transfer Insights
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {/* Transfer Volume Card */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Transfer Volume (Last 30d)
//             </h4>
//             <DollarSign className="h-5 w-5 text-green-500" />
//           </div>
//           <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
//             {/* Placeholder for actual chart */}
//             <BarChart className="h-24 w-24 text-gray-400" />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 Total Volume
//               </p>
//               <p className="text-lg font-semibold text-neutral-900 dark:text-white">
//                 {formatCurrency(transferVolume)}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 Growth
//               </p>
//               <p className={`text-lg font-semibold ${volumeGrowthColor} flex items-center`}>
//                 {VolumeGrowthIcon && <VolumeGrowthIcon className="h-4 w-4 mr-1" />}
//                 {volumeGrowth !== null ? `${volumeGrowthPrefix}${volumeGrowth.toFixed(1)}%` : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Popular Corridors Card */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Popular Corridors (Last 90d)
//             </h4>
//             <MapPin className="h-5 w-5 text-blue-500" />
//           </div>
//           <div className="space-y-3">
//             {popularCorridors.length > 0 ? (
//               popularCorridors.map((corridor, index) => {
//                 const corridorColors = getIconColorStyle(corridor.sendCurrencyCode + index); // Use helper
//                 return (
//                   <div key={`${corridor.sendCurrencyCode}-${corridor.receiveCurrencyCode}-${index}`} className="flex justify-between items-center">
//                     <div className="flex items-center overflow-hidden mr-2"> {/* Added overflow-hidden */}
//                       <div className={`h-8 w-8 ${corridorColors.bg} rounded-full flex items-center justify-center mr-2 shrink-0`}>
//                         <span className={`text-xs font-medium ${corridorColors.text}`}>
//                           {corridor.sendCurrencyCode}
//                         </span>
//                       </div>
//                       <div className="truncate"> {/* Added truncate */}
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white truncate"> {/* Added truncate */}
//                           {corridor.sendCurrencyCode} → {corridor.receiveCurrencyCode}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           {corridor.count} transfers
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white shrink-0 ml-2">
//                       {corridor.percentage.toFixed(1)}%
//                     </p>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-300">No popular corridor data available.</p>
//             )}
//           </div>
//           {/* "View all corridors" button removed */}
//         </div>

//         {/* Currency Performance Card */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Currency Performance vs EUR (24h) {/* Updated Title */}
//             </h4>
//             <RefreshCw className="h-5 w-5 text-purple-500" />
//           </div>
//           <div className="space-y-3">
//             {currencyPerformance.length > 0 ? (
//                 currencyPerformance.map((perf) => {
//                     const perfColor = perf.changePercent > 0 ? "text-green-600" : perf.changePercent < 0 ? "text-red-500" : "text-gray-500";
//                     const PerfIcon = perf.changePercent > 0 ? ArrowUpRight : perf.changePercent < 0 ? ArrowDownRight : null;
//                     const perfPrefix = perf.changePercent > 0 ? "+" : "";
//                     const currencyColorStyle = getIconColorStyle(perf.code); // Use helper

//                     return (
//                       <div key={perf.code} className="flex justify-between items-center">
//                         <div className="flex items-center overflow-hidden mr-2"> {/* Added overflow-hidden */}
//                           <div className={`h-8 w-8 ${currencyColorStyle.bg} rounded-full flex items-center justify-center mr-2 shrink-0`}>
//                             <span className={`text-xs font-medium ${currencyColorStyle.text}`}>
//                               {perf.code}
//                             </span>
//                           </div>
//                           <p className="text-sm font-medium text-neutral-900 dark:text-white truncate"> {/* Added truncate */}
//                             {currencyNames[perf.code] || perf.code} {/* Show name or code */}
//                           </p>
//                         </div>
//                         <p className={`text-sm font-semibold ${perfColor} flex items-center shrink-0 ml-2`}>
//                           {PerfIcon && <PerfIcon className="h-4 w-4 mr-1" />}
//                           {perfPrefix}{perf.changePercent.toFixed(1)}%
//                         </p>
//                       </div>
//                     );
//                 })
//             ) : (
//                 <p className="text-sm text-gray-500 dark:text-gray-300">Currency performance data unavailable.</p>
//             )}
//           </div>
//           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//             Currency management →
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// // frontend/src/components/DashboardSection/TransferInsights.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   DollarSign,
//   BarChart,
//   ArrowUpRight,
//   MapPin,
//   //   RefreshCw, // <-- REMOVE if unused
//   //   ArrowDownRight, // <-- REMOVE if unused (TrendingDown is used for volume)
//   TrendingDown,
// } from "lucide-react";
// // --- Remove unused CurrencyPerformanceStat import ---
// import statsAdminService, {
//   AdminDashboardStats,
//   PopularCorridorStat,
//   // CurrencyPerformanceStat <-- REMOVE
// } from "../../../services/admin/stats.admin"; // Adjust path as needed

// export default function TransferInsights() {
//   const [transferVolume, setTransferVolume] = useState<number | null>(null);
//   const [volumeGrowth, setVolumeGrowth] = useState<number | null>(null);
//   const [popularCorridors, setPopularCorridors] = useState<
//     PopularCorridorStat[]
//   >([]);
//   // --- Remove currencyPerformance state ---
//   // const [currencyPerformance, setCurrencyPerformance] = useState<CurrencyPerformanceStat[]>([]);
//   // --- End Remove ---
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInsightStats = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data: AdminDashboardStats =
//           await statsAdminService.getAdminDashboardOverviewStats();
//         setTransferVolume(data.totalVolumeLast30Days);
//         setVolumeGrowth(data.volumeGrowthPercentage);
//         setPopularCorridors(data.popularCorridors || []);
//         // --- Remove setting currency performance state ---
//         // setCurrencyPerformance(data.currencyPerformance || []);
//         // --- End Remove ---
//       } catch (err: any) {
//         setError(err.message || "Failed to load transfer insights.");
//         console.error("Error fetching transfer insights data:", err);
//         setTransferVolume(null);
//         setVolumeGrowth(null);
//         setPopularCorridors([]);
//         // setCurrencyPerformance([]); // Remove
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInsightStats();
//   }, []);

//   const formatCurrency = (value: number | null) => {
//     /* ... remains same ... */
//     if (value === null || isNaN(value)) return "N/A";
//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     })}`;
//   };
//   const growthTrendForVolume = volumeGrowth ?? 0;
//   const VolumeGrowthIcon =
//     growthTrendForVolume > 0
//       ? ArrowUpRight
//       : growthTrendForVolume < 0
//       ? TrendingDown
//       : null;
//   const volumeGrowthColor =
//     growthTrendForVolume > 0
//       ? "text-green-600"
//       : growthTrendForVolume < 0
//       ? "text-red-600"
//       : "text-gray-500";
//   const volumeGrowthPrefix = growthTrendForVolume > 0 ? "+" : "";
//   const getIconColorStyle = (uniqueString: string) => {
//     /* ... remains same ... */
//     let hash = 0;
//     for (let i = 0; i < uniqueString.length; i++) {
//       hash = uniqueString.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const colors = [
//       {
//         bg: "bg-blue-100 dark:bg-blue-800/30",
//         text: "text-blue-600 dark:text-blue-400",
//       },
//       {
//         bg: "bg-green-100 dark:bg-green-800/30",
//         text: "text-green-600 dark:text-green-400",
//       },
//       {
//         bg: "bg-purple-100 dark:bg-purple-800/30",
//         text: "text-purple-600 dark:text-purple-400",
//       },
//       {
//         bg: "bg-yellow-100 dark:bg-yellow-800/30",
//         text: "text-yellow-600 dark:text-yellow-400",
//       },
//       {
//         bg: "bg-red-100 dark:bg-red-800/30",
//         text: "text-red-600 dark:text-red-400",
//       },
//       {
//         bg: "bg-indigo-100 dark:bg-indigo-800/30",
//         text: "text-indigo-600 dark:text-indigo-400",
//       },
//       {
//         bg: "bg-pink-100 dark:bg-pink-800/30",
//         text: "text-pink-600 dark:text-pink-400",
//       },
//       {
//         bg: "bg-teal-100 dark:bg-teal-800/30",
//         text: "text-teal-600 dark:text-teal-400",
//       },
//     ];
//     return colors[Math.abs(hash) % colors.length];
//   };

//   // --- Remove currencyNames map if not used elsewhere ---
//   // const currencyNames: { [key: string]: string } = { ... };
//   // --- End Remove ---

//   if (loading) {
//     // Update skeleton grid to match 2 cards if needed
//     return (
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//           Transfer Insights
//         </h3>
//         {/* Adjust grid columns if you only have 2 cards now */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {" "}
//           {/* Changed lg:grid-cols-3 to md:grid-cols-2 */}
//           {/* Skeleton for Transfer Volume */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[250px]">
//             {/* ... skeleton content ... */}
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//             <div className="h-40 bg-gray-100 dark:bg-gray-700/50 rounded-lg mb-4"></div>
//             <div className="flex justify-between">
//               <div className="w-1/2 pr-2">
//                 <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
//               </div>
//               <div className="w-1/2 pl-2">
//                 <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
//               </div>
//             </div>
//           </div>
//           {/* Skeleton for Popular Corridors */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[280px]">
//             {/* ... skeleton content ... */}
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded mb-2"
//               ></div>
//             ))}
//           </div>
//           {/* Removed third skeleton */}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     /* ... Error display remains same ... */
//     return (
//       <div
//         className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative"
//         role="alert"
//       >
//         {" "}
//         <strong className="font-bold">
//           Error loading Transfer Insights:
//         </strong>{" "}
//         <span className="block sm:inline"> {error}</span>{" "}
//       </div>
//     );
//   }

//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//         Transfer Insights
//       </h3>
//       {/* Adjust grid columns if you only have 2 cards now */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {" "}
//         {/* Changed lg:grid-cols-3 to md:grid-cols-2 */}
//         {/* Transfer Volume Card */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           {/* ... content remains same ... */}
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Transfer Volume (Last 30d)
//             </h4>
//             <DollarSign className="h-5 w-5 text-green-500" />
//           </div>
//           <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
//             <BarChart className="h-24 w-24 text-gray-400" />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 Total Volume
//               </p>
//               <p className="text-lg font-semibold text-neutral-900 dark:text-white">
//                 {formatCurrency(transferVolume)}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-300">Growth</p>
//               <p
//                 className={`text-lg font-semibold ${volumeGrowthColor} flex items-center`}
//               >
//                 {VolumeGrowthIcon && (
//                   <VolumeGrowthIcon className="h-4 w-4 mr-1" />
//                 )}
//                 {volumeGrowth !== null
//                   ? `${volumeGrowthPrefix}${volumeGrowth.toFixed(1)}%`
//                   : "N/A"}
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* Popular Corridors Card */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           {/* ... content remains same ... */}
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Popular Corridors (Last 90d)
//             </h4>
//             <MapPin className="h-5 w-5 text-blue-500" />
//           </div>
//           <div className="space-y-3">
//             {popularCorridors.length > 0 ? (
//               popularCorridors.map((corridor, index) => {
//                 const corridorColors = getIconColorStyle(
//                   corridor.sendCurrencyCode + index
//                 );
//                 return (
//                   <div
//                     key={`${corridor.sendCurrencyCode}-${corridor.receiveCurrencyCode}-${index}`}
//                     className="flex justify-between items-center"
//                   >
//                     <div className="flex items-center overflow-hidden mr-2">
//                       <div
//                         className={`h-8 w-8 ${corridorColors.bg} rounded-full flex items-center justify-center mr-2 shrink-0`}
//                       >
//                         <span
//                           className={`text-xs font-medium ${corridorColors.text}`}
//                         >
//                           {corridor.sendCurrencyCode}
//                         </span>
//                       </div>
//                       <div className="truncate">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
//                           {corridor.sendCurrencyCode} →{" "}
//                           {corridor.receiveCurrencyCode}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           {corridor.count} transfers
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white shrink-0 ml-2">
//                       {corridor.percentage.toFixed(1)}%
//                     </p>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 No popular corridor data available.
//               </p>
//             )}
//           </div>
//         </div>
//         {/* --- REMOVED Currency Performance Card --- */}
//       </div>
//     </div>
//   );
// }

// // frontend/src/components/DashboardSection/TransferInsights.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// // Import stats service and types
// import statsAdminService, {
//   AdminDashboardStats,
//   PopularCorridorStat,
// } from "../../../services/admin/stats.admin"; // Adjust path if needed
// // Import the KYC Card component
// import KycVerificationCard from "./KycVerificationCard"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
// import { FaRegClock } from "react-icons/fa";

// export default function TransferInsights() {
//   // State for Popular Corridors
//   const [popularCorridors, setPopularCorridors] = useState<
//     PopularCorridorStat[]
//   >([]);
//   // State for KYC counts
//   const [kycCounts, setKycCounts] = useState<{
//     notStarted?: number;
//     pending?: number;
//     verified?: number;
//     rejected?: number;
//     skipped?: number;
//   }>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInsightStats = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         // Fetch the overview stats which contains both corridors and KYC counts
//         const data: AdminDashboardStats =
//           await statsAdminService.getAdminDashboardOverviewStats();
//         setPopularCorridors(data.popularCorridors || []);
//         // Set KYC counts state including the new ones
//         setKycCounts({
//           notStarted: data.kycNotStartedCount,
//           pending: data.kycPendingCount,
//           verified: data.kycVerifiedCount,
//           rejected: data.kycRejectedCount,
//           skipped: data.kycSkippedCount,
//         });
//       } catch (err: any) {
//         setError(err.message || "Failed to load insights data.");
//         console.error("Error fetching insights data:", err);
//         setPopularCorridors([]);
//         setKycCounts({}); // Clear KYC counts on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInsightStats();
//   }, []); // Fetch once on mount

//   // Helper to get a consistent color for corridor icons based on currency code
//   const getIconColorStyle = (uniqueString: string) => {
//     let hash = 0;
//     for (let i = 0; i < uniqueString.length; i++) {
//       hash = uniqueString.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     // Expanded color palette for potentially more unique colors
//     const colors = [
//       {
//         bg: "bg-blue-100 dark:bg-blue-800/30",
//         text: "text-blue-600 dark:text-blue-400",
//       },
//       {
//         bg: "bg-green-100 dark:bg-green-800/30",
//         text: "text-green-600 dark:text-green-400",
//       },
//       {
//         bg: "bg-purple-100 dark:bg-purple-800/30",
//         text: "text-purple-600 dark:text-purple-400",
//       },
//       {
//         bg: "bg-yellow-100 dark:bg-yellow-800/30",
//         text: "text-yellow-600 dark:text-yellow-400",
//       },
//       {
//         bg: "bg-red-100 dark:bg-red-800/30",
//         text: "text-red-600 dark:text-red-400",
//       },
//       {
//         bg: "bg-indigo-100 dark:bg-indigo-800/30",
//         text: "text-indigo-600 dark:text-indigo-400",
//       },
//       {
//         bg: "bg-pink-100 dark:bg-pink-800/30",
//         text: "text-pink-600 dark:text-pink-400",
//       },
//       {
//         bg: "bg-teal-100 dark:bg-teal-800/30",
//         text: "text-teal-600 dark:text-teal-400",
//       },
//       {
//         bg: "bg-orange-100 dark:bg-orange-800/30",
//         text: "text-orange-600 dark:text-orange-400",
//       },
//       {
//         bg: "bg-cyan-100 dark:bg-cyan-800/30",
//         text: "text-cyan-600 dark:text-cyan-400",
//       },
//     ];
//     return colors[Math.abs(hash) % colors.length];
//   };

//   if (loading) {
//     // Skeleton state representing both cards
//     return (
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//           Transfer Insights & KYC
//         </h3>

//         {/* Grid for 2 items */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Skeleton for Popular Corridors */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[280px]">
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="flex items-center h-10 bg-gray-100 dark:bg-gray-700/50 rounded mb-2 px-2"
//               >
//                 <Skeleton className="w-8 h-8 rounded-full mr-2 shrink-0" />
//                 <Skeleton className="h-4 flex-grow rounded" />
//               </div>
//             ))}
//           </div>
//           {/* Skeleton for KYC Card (5 items) */}
//           <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border h-[280px]">
//             <div className="flex justify-between items-center mb-4">
//               <Skeleton className="h-6 w-3/5 rounded" />
//               <Skeleton className="h-5 w-5 rounded-full" />
//             </div>
//             <div className="space-y-3 mb-4">
//               <Skeleton className="h-4 w-full rounded" />
//               <Skeleton className="h-4 w-3/4 rounded" />
//               <Skeleton className="h-4 w-2/3 rounded" />
//               <Skeleton className="h-4 w-3/5 rounded" />
//               <Skeleton className="h-4 w-1/2 rounded" />
//             </div>
//             <Skeleton className="h-5 w-1/3 rounded mt-6" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     // Error Display state
//     return (
//       <div
//         className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative"
//         role="alert"
//       >
//         <strong className="font-bold">Error loading Insights:</strong>
//         <span className="block sm:inline"> {error}</span>
//       </div>
//     );
//   }

//   // Success State - Render the cards
//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//         Transfer Insights & KYC Status
//       </h3>
//       {/* Grid layout for the two cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Popular Corridors Card */}
//         <div className="dark:bg-primarybox sm:p-6 p-4 rounded-xl border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                  Corridors (Last 90d)
//             </h4>
//             <FaRegClock  className="text-primary size-5" />
//           </div>
//           <div className="space-y-3">
//             {popularCorridors.length > 0 ? (
//               popularCorridors.map((corridor, index) => {
//                 const corridorColors = getIconColorStyle(
//                   corridor.sendCurrencyCode + index
//                 );
//                 return (
//                   <div
//                     key={`${corridor.sendCurrencyCode}-${corridor.receiveCurrencyCode}-${index}`}
//                     className="flex justify-between items-center"
//                   >
//                     <div className="flex items-center overflow-hidden mr-2">
//                       <div
//                         className={`h-8 w-8 ${corridorColors.bg} rounded-full flex items-center justify-center mr-2 shrink-0`}
//                       >
//                         <span
//                           className={`text-xs font-medium ${corridorColors.text}`}
//                         >
//                           {corridor.sendCurrencyCode}
//                         </span>
//                       </div>
//                       <div className="truncate">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
//                           {corridor.sendCurrencyCode} →{" "}
//                           {corridor.receiveCurrencyCode}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           {corridor.count} transfers
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white shrink-0 ml-2">
//                       {corridor.percentage.toFixed(1)}%
//                     </p>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 No popular corridor data available.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* KYC Verification Card */}
//         {/* This component now receives props and handles its display */}
//         <KycVerificationCard
//           loading={loading} // Pass loading state from this parent
//           error={error} // Pass error state from this parent
//           notStartedCount={kycCounts.notStarted}
//           pendingCount={kycCounts.pending}
//           verifiedCount={kycCounts.verified}
//           rejectedCount={kycCounts.rejected}
//           skippedCount={kycCounts.skipped}
//         />
//       </div>
//     </div>
//   );
// }



// frontend/src/components/DashboardSection/TransferInsights.tsx
"use client";

import React, { useState, useEffect } from "react";
// Import stats service and types
import statsAdminService, {
  AdminDashboardStats,
  PopularCorridorStat,
} from "../../../services/admin/stats.admin"; // Adjust path if needed
// Import the KYC Card component
import KycVerificationCard from "./KycVerificationCard"; // Adjust path if needed
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { FaPercentage, FaRegClock } from "react-icons/fa";
import { AlertCircle } from "lucide-react";

export default function TransferInsights() {
  // State for Popular Corridors
  const [popularCorridors, setPopularCorridors] = useState<
    PopularCorridorStat[]
  >([]);
  // State for KYC counts
  const [kycCounts, setKycCounts] = useState<{
    notStarted?: number;
    pending?: number;
    verified?: number;
    rejected?: number;
    skipped?: number;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsightStats = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch the overview stats which contains both corridors and KYC counts
        const data: AdminDashboardStats =
          await statsAdminService.getAdminDashboardOverviewStats();
        setPopularCorridors(data.popularCorridors || []);
        // Set KYC counts state including the new ones
        setKycCounts({
          notStarted: data.kycNotStartedCount,
          pending: data.kycPendingCount,
          verified: data.kycVerifiedCount,
          rejected: data.kycRejectedCount,
          skipped: data.kycSkippedCount,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load insights data.");
        console.error("Error fetching insights data:", err);
        setPopularCorridors([]);
        setKycCounts({}); // Clear KYC counts on error
      } finally {
        setLoading(false);
      }
    };

    fetchInsightStats();
  }, []); // Fetch once on mount

  // Helper to get a consistent color for corridor icons based on currency code
  const getIconColorStyle = (uniqueString: string) => {
    let hash = 0;
    for (let i = 0; i < uniqueString.length; i++) {
      hash = uniqueString.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Expanded color palette for potentially more unique colors
    const colors = [
      {
        bg: "bg-blue-800/40",
        text: "text-blue-400",
      },
      {
        bg: "bg-green-800/40",
        text: "text-green-400",
      },
      {
        bg: "bg-purple-800/40",
        text: "text-purple-400",
      },
      {
        bg: "bg-yellow-800/40",
        text: "text-yellow-400",
      },
      {
        bg: "bg-red-800/40",
        text: "text-red-400",
      },
      {
        bg: "bg-indigo-800/40",
        text: "text-indigo-400",
      },
      {
        bg: "bg-pink-800/40",
        text: "text-pink-400",
      },
      {
        bg: "bg-teal-800/40",
        text: "text-teal-400",
      },
      {
        bg: "bg-orange-800/40",
        text: "text-orange-400",
      },
      {
        bg: "bg-cyan-800/40",
        text: "text-cyan-400",
      },
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    // Skeleton state representing both cards
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-mainheadingWhite mb-4">
          Transfer Insights & KYC Status{" "}
          {/* Updated text to match success state */}
        </h3>

        {/* Grid for 2 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skeleton for Popular Corridors */}
          <div className="bg-primarybox sm:p-6 p-4 rounded-xl">
            {/* Header: Title and Icon */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-1/3 rounded bg-background/50" />{" "}
              {/* Title: "Corridors (Last 90d)" */}
              <Skeleton className="size-12 rounded-full bg-background/50" />{" "}
              {/* Icon: Clock */}
            </div>
            {/* List of Corridor Skeletons */}
            <div className="space-y-3">
              {" "}
              {/* Matches structure of success state's list container */}
              {[1, 2, 3, 4].map(
                (
                  i // Assuming 4 items as in the image
                ) => (
                  <div key={i} className="flex justify-between items-center">
                    {/* Left part: Icon + Texts */}
                    <div className="flex items-center mr-2">
                      <Skeleton className="sm:size-12 size-10 rounded-full mr-2 shrink-0 bg-background/50" />{" "}
                      {/* Currency Icon */}
                      <div className="space-y-1">
                        {" "}
                        {/* Texts container */}
                        <Skeleton className="h-4 w-24 rounded bg-background/50" />{" "}
                        {/* Placeholder for "EUR -> INR" */}
                        <Skeleton className="h-3 w-16 rounded bg-background/50" />{" "}
                        {/* Placeholder for "11 transfers" */}
                      </div>
                    </div>
                    {/* Right part: Percentage */}
                    <Skeleton className="h-4 w-12 rounded bg-background/50" />{" "}
                    {/* Placeholder for "55.0%" */}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full bg-primarybox sm:p-6 p-4 rounded-xl h-full flex flex-col justify-between">
            {" "}
            {/* Added h-full and flex column layout */}
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-4">
              {" "}
              {/* Added mb-4 to match actual header spacing */}
              <Skeleton className="h-6 w-1/3 rounded-md bg-background/50" />{" "}
              {/* Title: "KYC Verifications", slightly wider w-1/3 */}
              <Skeleton className="size-12 rounded-full bg-background/50" />{" "}
              {/* Icon, rounded-full to match dot style */}
            </div>
            {/* Content Rows Skeleton */}
            {/* space-y-3 matches the actual content's spacing */}
            <div className="space-y-4 flex-grow">
              {" "}
              {/* Use flex-grow to fill available space like the actual content wrapper */}
              {/* Row Skeletons (5 rows matching Not Started, Pending, etc.) */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-28 rounded-md bg-background/50" />{" "}
                  {/* Label */}
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-8 rounded-md bg-background/50" />{" "}
                    {/* Count */}
                    {/* Dot Skeleton: size-2 matches the actual dot size */}
                    <Skeleton className="ml-2 size-2 rounded-full bg-background/50" />
                  </div>
                </div>
              ))}
            </div>
            {/* Footer Link Skeleton */}
            {/* mt-6 matches the margin before the actual link */}
            <div className="mt-6">
              {" "}
              {/* Wrap in a div to match the footer structure */}
              <Skeleton className="h-5 w-1/3 rounded-md bg-background/50" />{" "}
              {/* Adjusted height to h-5 for link appearance */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Error Display state
    return (
      <div
        className="w-full flex relative justify-center items-center  bg-red-900/25 border sm:order-1 order-2 border-red-500 px-5 py-4 rounded-xl"
        role="alert"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
            <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
          </div>

          <div className="flex-1">
            <h4 className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
              Error loading Insights
            </h4>

            <p className="text-sm mt-2 text-red-300/90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Render the cards
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-mainheadingWhite capitalize mb-4">
        Transfer Insights & KYC Status
      </h3>
      {/* Grid layout for the two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Corridors Card */}
        <div className="bg-primarybox sm:p-6 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-medium text-mainheadingWhite">
              Corridors (Last 90d)
            </h1>
            <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
              <FaPercentage className="size-6 text-mainheading" />
            </div>
          </div>

          <div className="space-y-4">
            {popularCorridors.length > 0 ? (
              popularCorridors.map((corridor, index) => {
                const corridorColors = getIconColorStyle(
                  corridor.sendCurrencyCode + index
                );
                return (
                  <div
                    key={`${corridor.sendCurrencyCode}-${corridor.receiveCurrencyCode}-${index}`}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center overflow-hidden mr-2">
                      <div
                        className={`sm:size-12 size-10 ${corridorColors.bg} rounded-full flex items-center justify-center mr-2 shrink-0`}
                      >
                        <span
                          className={`text-xs font-medium ${corridorColors.text}`}
                        >
                          {corridor.sendCurrencyCode}
                        </span>
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-mainheadingWhite truncate">
                          {corridor.sendCurrencyCode} →{" "}
                          {corridor.receiveCurrencyCode}
                        </p>
                        <p className="text-xs text-subheadingWhite">
                          {corridor.count} transfers
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-mainheadingWhite shrink-0 ml-2">
                      {corridor.percentage.toFixed(1)}%
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="font-medium text-center text-mainheadingWhite">
                No popular corridor data available Now.
              </p>
            )}
          </div>
        </div>

        {/* KYC Verification Card */}
        {/* This component now receives props and handles its display */}
        <KycVerificationCard
          loading={loading} // Pass loading state from this parent
          error={error} // Pass error state from this parent
          notStartedCount={kycCounts.notStarted}
          pendingCount={kycCounts.pending}
          verifiedCount={kycCounts.verified}
          rejectedCount={kycCounts.rejected}
          skippedCount={kycCounts.skipped}
        />
      </div>
    </div>
  );
}
