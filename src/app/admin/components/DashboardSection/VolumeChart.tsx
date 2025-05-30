// // frontend/src/components/DashboardSection/VolumeChart.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import statsAdminService, { ChartDataPoint, ChartType, ChartRange } from '../../../services/admin/stats.admin'; // Adjust path
// import moment from 'moment'; // <-- ADD THIS IMPORT

// // Define props for the reusable chart
// interface VolumeChartProps {
//     title: string;
//     description: string;
//     chartType: ChartType; // 'payments' or 'transfers'
//     initialRange?: ChartRange; // Default range
//     yAxisLabel?: string; // e.g., "Volume" or "Amount"
//     dataKey?: string; // e.g., 'volume' (key in ChartDataPoint)
//     fillColorVar?: string; // e.g., "hsl(var(--chart-1))" or define custom CSS var
// }

// // Default chart config (can be overridden or extended if needed)
// const defaultChartConfig = {
//   volume: {
//     label: "Volume",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function VolumeChart({
//     title,
//     description,
//     chartType,
//     initialRange = 'month',
//     yAxisLabel = "Volume", // Default Y-axis label
//     dataKey = "volume",    // Default data key
//     fillColorVar = "hsl(var(--chart-1))", // Default fill color
// }: VolumeChartProps) {
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Data fetching logic
//   const fetchData = useCallback(async (range: ChartRange) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await statsAdminService.getAdminChartData(chartType, range);
//       setChartData(data);
//     } catch (err: any) {
//       setError(err.message || `Failed to load ${chartType} data.`);
//       setChartData([]);
//       console.error(`Error fetching ${chartType} chart data (${range}):`, err);
//     } finally {
//       setLoading(false);
//     }
//   }, [chartType]);

//   // Fetch data on mount and when timeRange changes
//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);

//   // Memoize processed data for the chart and total calculation
//   const processedData = useMemo(() => chartData, [chartData]);
//   const totalVolume = useMemo(
//     () => processedData.reduce((acc, curr) => acc + (curr[dataKey as keyof ChartDataPoint] as number || 0), 0), // Use dataKey dynamically
//     [processedData, dataKey]
//   );

//    // Dynamic chart config based on props
//    const dynamicChartConfig = useMemo(() => ({
//         [dataKey]: { label: yAxisLabel, color: fillColorVar },
//     // Merge with default if necessary, or keep simple if only one data key is used per chart
//     }), [dataKey, yAxisLabel, fillColorVar]);

//   // Format currency (simple version)
//   const formatAsCurrency = (value: number) => {
//      if (isNaN(value)) return 'N/A'; // Handle NaN
//      if (value >= 1000 && value % 1 === 0) {
//          return value.toLocaleString();
//      }
//      return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//    };

//   return (
//     <Card className="flex flex-col h-full bg-primarybox">
//       <CardHeader className="flex-shrink-0">
//         <div className="flex flex-wrap justify-between items-start gap-2 pt-3 px-3"> {/* Added flex-wrap */}
//              <div className='mb-2 sm:mb-0'> {/* Added margin for spacing on small screens */}
//                  <CardTitle>{title}</CardTitle>
//                  <CardDescription>{description}</CardDescription>
//              </div>
//              <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as ChartRange)} className="flex-shrink-0">
//                  <TabsList className="grid w-full grid-cols-2 h-9">
//                      <TabsTrigger value="month" className="h-7 text-xs px-2">Last Month</TabsTrigger>
//                      <TabsTrigger value="year" className="h-7 text-xs px-2">Last Year</TabsTrigger>
//                  </TabsList>
//              </Tabs>
//          </div>
//       </CardHeader>
//       <CardContent className="flex-grow flex flex-col px-2 pb-4 sm:px-6 sm:pb-6">
//          {loading && (
//             <div className="flex-grow flex flex-col justify-center items-center space-y-4">
//                 <Skeleton className="h-[180px] w-full rounded-md" />
//                 <Skeleton className="h-6 w-1/2 rounded-md" />
//             </div>
//          )}
//          {error && !loading && (
//              <div className="flex-grow flex justify-center items-center text-center text-red-600 p-4">
//                  <p className='text-sm'>Error loading chart data: <br/> <span className='text-xs'>{error}</span></p>
//              </div>
//          )}
//          {!loading && !error && processedData.length === 0 && (
//              <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
//                  <p className='text-sm'>No data available for the selected period.</p>
//              </div>
//          )}
//          {!loading && !error && processedData.length > 0 && (
//             <>
//                 <div className="text-xl sm:text-2xl font-bold mb-2 text-center text-neutral-900 dark:text-white">
//                      {/* Assuming '$' prefix, adjust if needed */}
//                      ${totalVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
//                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
//                         Total ({timeRange === 'month' ? '30d' : '12m'})
//                     </span>
//                 </div>
//                 <ChartContainer
//                   config={dynamicChartConfig}
//                   className="aspect-auto h-[200px] w-full flex-grow"
//                 >
//                   <ResponsiveContainer width="100%" height="100%">
//                       <BarChart accessibilityLayer data={processedData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
//                         <CartesianGrid vertical={false} strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey="date"
//                           tickLine={false}
//                           axisLine={false}
//                           tickMargin={8}
//                           minTickGap={timeRange === 'month' ? 5 : 20}
//                           tickFormatter={(value) => {
//                             // Use moment for reliable parsing and formatting
//                             const date = moment(value, "YYYY-MM-DD"); // Specify input format
//                             if (!date.isValid()) return '';
//                             return timeRange === 'month'
//                                 ? date.format("D MMM") // e.g., 15 May
//                                 : date.format("MMM"); // e.g., May
//                           }}
//                         />
//                         <ChartTooltip
//                            cursor={false}
//                            content={
//                             <ChartTooltipContent
//                               labelFormatter={(label) => moment(label, "YYYY-MM-DD").format(timeRange === 'month' ? 'MMM DD, YYYY' : 'MMM YYYY')} // Specify input format
//                               formatter={(value) => `$${formatAsCurrency(value as number)}`}
//                               indicator="dot"
//                             />
//                           }
//                         />
//                         <Bar
//                            dataKey={dataKey}
//                            fill={fillColorVar}
//                            radius={4}
//                          />
//                       </BarChart>
//                    </ResponsiveContainer>
//                 </ChartContainer>
//              </>
//          )}
//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/components/DashboardSection/VolumeChart.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BarChartIcon, RefreshCw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import statsAdminService, { ChartDataPoint, ChartType, ChartRange } from '../../../services/admin/stats.admin';
// import moment from 'moment';

// // Define props for the reusable chart
// interface VolumeChartProps {
//     title: string;
//     description: string;
//     chartType: ChartType;
//     initialRange?: ChartRange;
//     yAxisLabel?: string;
//     dataKey?: string;
//     fillColorVar?: string;
//     showRefreshButton?: boolean;
//     className?: string;
// }

// export function VolumeChart({
//     title,
//     description,
//     chartType,
//     initialRange = 'month',
//     yAxisLabel = "Volume",
//     dataKey = "volume",
//     fillColorVar = "#adfa1c",
//     showRefreshButton = true,
//     className = "",
// }: VolumeChartProps) {
//   // State management
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Dynamic chart config based on props
//   const chartConfig = useMemo<ChartConfig>(() => ({
//     [dataKey]: { label: yAxisLabel, color: fillColorVar },
//   }), [dataKey, yAxisLabel, fillColorVar]);

//   // Data fetching logic
//   const fetchData = useCallback(async (range: ChartRange) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await statsAdminService.getAdminChartData(chartType, range);
//       setChartData(data);
//     } catch (err: any) {
//       setError(err.message || `Failed to load ${chartType} data.`);
//       setChartData([]);
//       console.error(`Error fetching ${chartType} chart data (${range}):`, err);
//     } finally {
//       setLoading(false);
//     }
//   }, [chartType]);

//   // Fetch data on mount and when timeRange changes
//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);

//   // Handle refresh button click
//   const handleRefresh = () => {
//     fetchData(timeRange);
//   };

//   // Calculate total volume
//   const totalVolume = useMemo(
//     () => chartData.reduce((acc, curr) => acc + (curr[dataKey as keyof ChartDataPoint] as number || 0), 0),
//     [chartData, dataKey]
//   );

//   // Format currency with appropriate scale
//   const formatCurrency = (value: number) => {
//     if (isNaN(value)) return 'N/A';

//     // Scale based on size
//     if (value >= 1000000) {
//       return `$${(value / 1000000).toFixed(1)}M`;
//     } else if (value >= 1000) {
//       return `$${(value / 1000).toFixed(1)}K`;
//     }

//     return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//   };

//   // Format dates based on time range
//   const formatDate = (dateString: string, format: 'tooltip' | 'axis') => {
//     const date = moment(dateString, "YYYY-MM-DD");
//     if (!date.isValid()) return '';

//     if (format === 'tooltip') {
//       return timeRange === 'month'
//         ? date.format('MMM DD, YYYY')
//         : date.format('MMM YYYY');
//     }

//     return timeRange === 'month'
//       ? date.format("D MMM")
//       : date.format("MMM");
//   };

//   return (
//     <Card className={`flex flex-col h-full dark:bg-primarybox shadow-none ${className}`}>
//       <CardHeader className="flex-shrink-0 p-3">
//         <div className="flex flex-wrap items-start justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <div className="flex justify-center items-center w-12 h-12 bg-lightgray dark:bg-primarybox rounded-full">
//             <BarChartIcon className="h-5 w-5 text-primary" />
//             </div>
//             <div>
//               <CardTitle className="text-lg font-semibold">{title}</CardTitle>
//               <CardDescription className="text-xs">{description}</CardDescription>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {showRefreshButton && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="h-12 w-12 rounded-full hover:bg-lightborder dark:hover:bg-primarybox"
//               >
//                 <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//             )}

//             <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as ChartRange)}>
//               <TabsList className="grid w-full grid-cols-2 h-12 p-2 bg-lightgray dark:bg-primarybox rounded-full">
//                 <TabsTrigger value="month" className="h-7 text-xs px-2 cursor-pointer">30 Days</TabsTrigger>
//                 <TabsTrigger value="year" className="h-7 text-xs px-2 cursor-pointer">12 Months</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
//         {loading && (
//           /* Skeleton For A VolumeChart */
//           <div className="flex-grow flex flex-col justify-center items-center space-y-4">
//             <Skeleton className="h-[180px] w-full rounded-md" />
//             <Skeleton className="h-6 w-1/2 rounded-md" />
//           </div>
//         )}

//         {error && !loading && (
//           <div className="flex-grow flex justify-center items-center text-center p-4">
//             <div className="text-red-500 dark:text-red-400">
//               <p className="text-sm font-medium">Error loading chart data</p>
//               <p className="text-xs mt-1">{error}</p>
//               <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-3">
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Try Again
//               </Button>
//             </div>
//           </div>
//         )}

//         {!loading && !error && chartData.length === 0 && (
//           <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
//             <p className="text-sm">No data available for the selected period.</p>
//           </div>
//         )}

//         {!loading && !error && chartData.length > 0 && (
//           <>
//             <div className="flex flex-col items-center justify-center mb-4">
//               <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.9_0.2334_128.99)]">
//                 {formatCurrency(totalVolume)}
//               </div>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-sm">
//                   Total {timeRange === 'month' ? '30 days' : '12 months'}
//                 </span>
//                 <Badge variant="outline" className="text-xs font-normal bg-[oklch(0.44_0_0)] text-white">
//                   {chartType === 'payments' ? 'Payments' : 'Transfers'}
//                 </Badge>
//               </div>
//             </div>

//             <ChartContainer
//               config={chartConfig}
//               className="aspect-auto h-[200px] w-full flex-grow"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
//                   barGap={2}
//                   barSize={timeRange === 'month' ? 12 : 24}
//                 >
//                   <CartesianGrid
//                     vertical={false}
//                     strokeDasharray="3 3"
//                     strokeOpacity={0.7}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     minTickGap={timeRange === 'month' ? 5 : 20}
//                     tickFormatter={(value) => formatDate(value, 'axis')}
//                     fontSize={12}
//                   />
//                   <ChartTooltip
//                     cursor={{ fill: 'oklch(0.9 0.2334 128.99 / 10%)', opacity: 0.3 }}
//                     content={
//                       <ChartTooltipContent
//                         labelFormatter={(label) => formatDate(label, 'tooltip')}
//                         formatter={(value) => formatCurrency(value as number)}
//                         indicator="dot"
//                       />
//                     }
//                   />
//                   <Bar
//                     dataKey={dataKey}
//                     fill={fillColorVar}
//                     radius={[4, 4, 0, 0]}
//                     animationDuration={300}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </>
//         )}

//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/components/DashboardSection/VolumeChart.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BarChartIcon, RefreshCw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import statsAdminService, {
//   ChartDataPoint,
//   ChartType,
//   ChartRange,
// } from "../../../services/admin/stats.admin";
// import moment from "moment";

// // Define props for the reusable chart
// interface VolumeChartProps {
//   title: string;
//   description: string;
//   chartType: ChartType;
//   initialRange?: ChartRange;
//   yAxisLabel?: string;
//   dataKey?: string;
//   fillColorVar?: string;
//   showRefreshButton?: boolean;
//   className?: string;
// }

// export function VolumeChart({
//   title,
//   description,
//   chartType,
//   initialRange = "month",
//   yAxisLabel = "Volume",
//   dataKey = "volume",
//   fillColorVar = "#adfa1c",
//   showRefreshButton = true,
//   className = "",
// }: VolumeChartProps) {
//   // State management
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Dynamic chart config based on props
//   const chartConfig = useMemo<ChartConfig>(
//     () => ({
//       [dataKey]: { label: yAxisLabel, color: fillColorVar },
//     }),
//     [dataKey, yAxisLabel, fillColorVar]
//   );

//   // Data fetching logic
//   const fetchData = useCallback(
//     async (range: ChartRange) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await statsAdminService.getAdminChartData(
//           chartType,
//           range
//         );
//         setChartData(data);
//       } catch (err: any) {
//         setError(err.message || `Failed to load ${chartType} data.`);
//         setChartData([]);
//         console.error(
//           `Error fetching ${chartType} chart data (${range}):`,
//           err
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [chartType]
//   );

//   // Fetch data on mount and when timeRange changes
//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);

//   // Handle refresh button click
//   const handleRefresh = () => {
//     fetchData(timeRange);
//   };

//   // Calculate total volume
//   const totalVolume = useMemo(
//     () =>
//       chartData.reduce(
//         (acc, curr) =>
//           acc + ((curr[dataKey as keyof ChartDataPoint] as number) || 0),
//         0
//       ),
//     [chartData, dataKey]
//   );

//   // Format currency with appropriate scale
//   const formatCurrency = (value: number) => {
//     if (isNaN(value)) return "N/A";

//     // Scale based on size
//     if (value >= 1000000) {
//       return `$${(value / 1000000).toFixed(1)}M`;
//     } else if (value >= 1000) {
//       return `$${(value / 1000).toFixed(1)}K`;
//     }

//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   // Format dates based on time range
//   const formatDate = (dateString: string, format: "tooltip" | "axis") => {
//     const date = moment(dateString, "YYYY-MM-DD");
//     if (!date.isValid()) return "";

//     if (format === "tooltip") {
//       return timeRange === "month"
//         ? date.format("MMM DD, YYYY")
//         : date.format("MMM YYYY");
//     }

//     return timeRange === "month" ? date.format("D MMM") : date.format("MMM");
//   };

//   return (
//     <Card
//       className={`flex flex-col h-full dark:bg-primarybox shadow-none ${className}`}
//     >
//       <CardHeader className="flex-shrink-0 p-3">
//         <div className="flex flex-wrap items-start justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <div className="flex justify-center items-center w-12 h-12 bg-lightgray dark:bg-primarybox rounded-full">
//               {/* Dayanamic icons added */}
//               <BarChartIcon className="h-5 w-5 text-primary" />
//             </div>

//             <div>
//               <CardTitle className="text-lg font-semibold">{title}</CardTitle>
//               <CardDescription className="text-xs">
//                 {description}
//               </CardDescription>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {showRefreshButton && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="h-12 w-12 rounded-full hover:bg-lightborder dark:hover:bg-primarybox"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
//                 />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//             )}

//             <Tabs
//               value={timeRange}
//               onValueChange={(value) => setTimeRange(value as ChartRange)}
//             >
//               <TabsList className="grid w-full grid-cols-2 h-12 p-2 bg-lightgray dark:bg-primarybox rounded-full">
//                 <TabsTrigger
//                   value="month"
//                   className="h-7 text-xs px-2 cursor-pointer"
//                 >
//                   30 Days
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="year"
//                   className="h-7 text-xs px-2 cursor-pointer"
//                 >
//                   12 Months
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
//         {loading && (
//           <>
//             {/* Skeleton for Total Volume and Details */}
//             <div className="flex flex-col items-center justify-center mb-4 pt-2">
//               {" "}
//               {/* Added pt-2 for some top spacing */}
//               <Skeleton className="h-7 w-2/5 max-w-[160px] sm:h-8 rounded-md" />{" "}
//               {/* Simulates $920.3K */}
//               <div className="flex items-center gap-2 mt-1">
//                 <Skeleton className="h-4 w-20 rounded-sm" />{" "}
//                 {/* Simulates "Total 30 days" */}
//                 <Skeleton className="h-5 w-16 rounded-md" />{" "}
//                 {/* Simulates "Payments" Badge */}
//               </div>
//             </div>

//             {/* Skeleton for Chart Area - this wrapper should mimic ChartContainer's flex-grow and min-height behavior */}
//             <div
//               className="flex-grow w-full flex flex-col"
//               style={{ minHeight: "200px" }}
//             >
//               {" "}
//               {/* Mimics ChartContainer's size and flex behavior */}
//               {/* Main chart plot area skeleton */}
//               <Skeleton className="flex-grow w-full rounded-md" />{" "}
//               {/* Takes up available space, accounts for X-axis below */}
//               {/* X-axis ticks skeleton */}
//               <div className="flex justify-between w-full px-1 pt-2">
//                 {" "}
//                 {/* pt-2 for spacing from chart body */}
//                 {[...Array(7)].map(
//                   (
//                     _,
//                     i // 7 ticks for a representative look
//                   ) => (
//                     <Skeleton
//                       key={i}
//                       className="h-5 w-20 rounded-xl opacity-70"
//                     />
//                   )
//                 )}
//               </div>
//             </div>
//           </>
//         )}

//         {error && !loading && (
//           <div className="flex-grow flex justify-center items-center text-center p-4">
//             <div className="text-red-500 dark:text-red-400">
//               <p className="text-sm font-medium">Error loading chart data</p>
//               <p className="text-xs mt-1">{error}</p>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleRefresh}
//                 className="mt-3"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Try Again
//               </Button>
//             </div>
//           </div>
//         )}

//         {!loading && !error && chartData.length === 0 && (
//           <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
//             <p className="text-sm">
//               No data available for the selected period.
//             </p>
//           </div>
//         )}

//         {!loading && !error && chartData.length > 0 && (
//           <>
//             <div className="flex flex-col items-center justify-center mb-4 pt-2">
//               {" "}
//               {/* Added pt-2 to match skeleton */}
//               <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.9_0.2334_128.99)]">
//                 {formatCurrency(totalVolume)}
//               </div>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-sm">
//                   Total {timeRange === "month" ? "30 days" : "12 months"}
//                 </span>
//                 <Badge
//                   variant="outline"
//                   className="text-xs font-normal bg-[oklch(0.44_0_0)] text-white"
//                 >
//                   {chartType === "payments" ? "Payments" : "Transfers"}
//                 </Badge>
//               </div>
//             </div>

//             <ChartContainer
//               config={chartConfig}
//               className="aspect-auto h-[200px] w-full flex-grow" // This has h-[200px] and flex-grow
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
//                   barGap={2}
//                   barSize={timeRange === "month" ? 12 : 24}
//                 >
//                   <CartesianGrid
//                     vertical={false}
//                     strokeDasharray="3 3"
//                     strokeOpacity={0.7}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     minTickGap={timeRange === "month" ? 5 : 20}
//                     tickFormatter={(value) => formatDate(value, "axis")}
//                     fontSize={12}
//                   />
//                   <ChartTooltip
//                     cursor={{
//                       fill: "oklch(0.9 0.2334 128.99 / 10%)",
//                       opacity: 0.3,
//                     }}
//                     content={
//                       <ChartTooltipContent
//                         labelFormatter={(label) => formatDate(label, "tooltip")}
//                         formatter={(value) => formatCurrency(value as number)}
//                         indicator="dot"
//                       />
//                     }
//                   />
//                   <Bar
//                     dataKey={dataKey}
//                     fill={fillColorVar}
//                     radius={[4, 4, 0, 0]}
//                     animationDuration={300}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/components/DashboardSection/VolumeChart.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BarChartIcon, RefreshCw } from "lucide-react"; // BarChartIcon can be a default or removed if icon is always provided
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import statsAdminService, {
//   ChartDataPoint,
//   ChartType,
//   ChartRange,
// } from "../../../services/admin/stats.admin";
// import moment from "moment";

// // Define props for the reusable chart
// interface VolumeChartProps {
//   title: string;
//   description: string;
//   chartType: ChartType;
//   icon: React.ReactNode; // New prop for dynamic icon
//   initialRange?: ChartRange;
//   yAxisLabel?: string;
//   dataKey?: string;
//   fillColorVar?: string;
//   showRefreshButton?: boolean;
//   className?: string;
// }


// // export function VolumeChart({
//   title,
//   description,
//   chartType,
//   icon, // Destructure the new icon prop
//   initialRange = "month",
//   yAxisLabel = "Volume",
//   dataKey = "volume",
//   fillColorVar = "#adfa1c",
//   showRefreshButton = true,
//   className = "",
// }: VolumeChartProps) {
//   // State management
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Dynamic chart config based on props
//   const chartConfig = useMemo<ChartConfig>(
//     () => ({
//       [dataKey]: { label: yAxisLabel, color: fillColorVar },
//     }),
//     [dataKey, yAxisLabel, fillColorVar]
//   );

//   // Data fetching logic
//   const fetchData = useCallback(
//     async (range: ChartRange) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await statsAdminService.getAdminChartData(
//           chartType,
//           range
//         );
//         setChartData(data);
//       } catch (err: any) {
//         setError(err.message || `Failed to load ${chartType} data.`);
//         setChartData([]);
//         console.error(
//           `Error fetching ${chartType} chart data (${range}):`,
//           err
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [chartType]
//   );

//   // Fetch data on mount and when timeRange changes
//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);

//   // Handle refresh button click
//   const handleRefresh = () => {
//     fetchData(timeRange);
//   };

//   // Calculate total volume
//   const totalVolume = useMemo(
//     () =>
//       chartData.reduce(
//         (acc, curr) =>
//           acc + ((curr[dataKey as keyof ChartDataPoint] as number) || 0),
//         0
//       ),
//     [chartData, dataKey]
//   );

//   // Format currency with appropriate scale
//   const formatCurrency = (value: number) => {
//     if (isNaN(value)) return "N/A";

//     // Scale based on size
//     if (value >= 1000000) {
//       return `$${(value / 1000000).toFixed(1)}M`;
//     } else if (value >= 1000) {
//       return `$${(value / 1000).toFixed(1)}K`;
//     }

//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   // Format dates based on time range
//   const formatDate = (dateString: string, format: "tooltip" | "axis") => {
//     const date = moment(dateString, "YYYY-MM-DD");
//     if (!date.isValid()) return "";

//     if (format === "tooltip") {
//       return timeRange === "month"
//         ? date.format("MMM DD, YYYY")
//         : date.format("MMM YYYY");
//     }

//     return timeRange === "month" ? date.format("D MMM") : date.format("MMM");
//   };

//   return (
//     <Card
//       className={`flex flex-col h-full dark:bg-primarybox shadow-none border ${className}`}
//     >
//       <CardHeader className="flex-shrink-0 p-3">
//         <div className="flex flex-wrap items-start justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <div className="flex justify-center items-center w-12 h-12 bg-lightgray dark:bg-primarybox rounded-full">
//               {/* Dynamic icon is used here */}
//               {icon}
//             </div>

//             <div>
//               <CardTitle className="text-lg font-semibold">{title}</CardTitle>
//               <CardDescription className="text-xs">
//                 {description}
//               </CardDescription>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {showRefreshButton && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="h-12 w-12 rounded-full hover:bg-lightborder dark:hover:bg-primarybox"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
//                 />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//             )}

//             {/* Tabing-Parts */}
//             <Tabs
//               value={timeRange}
//               onValueChange={(value) => setTimeRange(value as ChartRange)}
//             >
//               <TabsList className="grid w-full grid-cols-2 h-12 p-2.5 bg-lightgray dark:bg-primarybox rounded-full">
//                 <TabsTrigger
//                   value="month"
//                   className="h-7 text-xs px-2 cursor-pointer"
//                 >
//                   30 Days
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="year"
//                   className="h-7 text-xs px-2 cursor-pointer"
//                 >
//                   12 Months
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
//         {loading && (
//           <>
//             {/* Skeleton for Total Volume and Details */}
//             <div className="flex flex-col items-center justify-center mb-4 pt-2">
//               {" "}
//               {/* Added pt-2 for some top spacing */}
//               <Skeleton className="h-7 w-2/5 max-w-[160px] sm:h-8 rounded-md" />{" "}
//               {/* Simulates $920.3K */}
//               <div className="flex items-center gap-2 mt-1">
//                 <Skeleton className="h-4 w-20 rounded-sm" />{" "}
//                 {/* Simulates "Total 30 days" */}
//                 <Skeleton className="h-5 w-16 rounded-md" />{" "}
//                 {/* Simulates "Payments" Badge */}
//               </div>
//             </div>

//             {/* Skeleton for Chart Area - this wrapper should mimic ChartContainer's flex-grow and min-height behavior */}
//             <div
//               className="flex-grow w-full flex flex-col"
//               style={{ minHeight: "200px" }}
//             >
//               {" "}
//               {/* Mimics ChartContainer's size and flex behavior */}
//               {/* Main chart plot area skeleton */}
//               <Skeleton className="flex-grow w-full rounded-md" />{" "}
//               {/* Takes up available space, accounts for X-axis below */}
//               {/* X-axis ticks skeleton */}
//               <div className="flex justify-between w-full px-1 pt-2">
//                 {" "}
//                 {/* pt-2 for spacing from chart body */}
//                 {[...Array(7)].map(
//                   (
//                     _,
//                     i // 7 ticks for a representative look
//                   ) => (
//                     <Skeleton
//                       key={i}
//                       className="h-5 w-20 rounded-xl opacity-70"
//                     />
//                   )
//                 )}
//               </div>
//             </div>
//           </>
//         )}

//         {error && !loading && (
//           <div className="flex-grow flex justify-center items-center text-center p-4">
//             <div className="text-red-500 dark:text-red-400">
//               <p className="text-sm font-medium">Error loading chart data</p>
//               <p className="text-xs mt-1">{error}</p>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleRefresh}
//                 className="mt-3"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Try Again
//               </Button>
//             </div>
//           </div>
//         )}

//         {!loading && !error && chartData.length === 0 && (
//           <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
//             <p className="text-sm">
//               No data available for the selected period.
//             </p>
//           </div>
//         )}

//         {!loading && !error && chartData.length > 0 && (
//           <>
//             <div className="flex flex-col items-center justify-center mb-4 pt-2">
//               {" "}
//               {/* Added pt-2 to match skeleton */}
//               <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.9_0.2334_128.99)]">
//                 {formatCurrency(totalVolume)}
//               </div>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-sm">
//                   Total {timeRange === "month" ? "30 days" : "12 months"}
//                 </span>
//                 <Badge
//                   variant="outline"
//                   className="text-xs font-normal bg-[oklch(0.44_0_0)] text-white"
//                 >
//                   {chartType === "payments" ? "Payments" : "Transfers"}
//                 </Badge>
//               </div>
//             </div>

//             <ChartContainer
//               config={chartConfig}
//               className="aspect-auto h-[200px] w-full flex-grow" // This has h-[200px] and flex-grow
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
//                   barGap={2}
//                   barSize={timeRange === "month" ? 12 : 24}
//                 >
//                   <CartesianGrid
//                     vertical={false}
//                     strokeDasharray="3 3"
//                     strokeOpacity={0.7}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     minTickGap={timeRange === "month" ? 5 : 20}
//                     tickFormatter={(value) => formatDate(value, "axis")}
//                     fontSize={12}
//                   />
//                   <ChartTooltip
//                     cursor={{
//                       fill: "oklch(0.9 0.2334 128.99 / 10%)",
//                       opacity: 0.3,
//                     }}
//                     content={
//                       <ChartTooltipContent
//                         labelFormatter={(label) => formatDate(label, "tooltip")}
//                         formatter={(value) => formatCurrency(value as number)}
//                         indicator="dot"
//                       />
//                     }
//                   />
//                   <Bar
//                     dataKey={dataKey}
//                     fill={fillColorVar}
//                     radius={[4, 4, 0, 0]}
//                     animationDuration={300}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


// // frontend/src/components/DashboardSection/VolumeChart.tsx

// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // ShadCN UI Tab components
// import { RefreshCw } from "lucide-react"; // BarChartIcon removed as icon is a prop now
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import statsAdminService, {
//   ChartDataPoint,
//   ChartType,
//   ChartRange,
// } from "../../../services/admin/stats.admin"; // Adjusted path based on typical project structure
// import moment from "moment";
// import { motion } from "framer-motion"; // Import motion for animations
// import { cn } from "@/lib/utils"; // Import cn utility

// // Define props for the reusable chart
// interface VolumeChartProps {
//   title: string;
//   description: string;
//   chartType: ChartType;
//   icon: React.ReactNode; // New prop for dynamic icon
//   initialRange?: ChartRange;
//   yAxisLabel?: string;
//   dataKey?: string;
//   fillColorVar?: string;
//   showRefreshButton?: boolean;
//   className?: string;
// }

// // Define the tabs configuration for time range, similar to TransactionTabs
// const timeRangeTabs = [
//   { id: "month", label: "30 Days" },
//   { id: "year", label: "12 Months" },
// ] as const; // Use "as const" for stricter typing

// export function VolumeChart({
//   title,
//   description,
//   chartType,
//   icon, // Destructure the new icon prop
//   initialRange = "month",
//   yAxisLabel = "Volume",
//   dataKey = "volume",
//   fillColorVar = "#adfa1c", // This is the bar color
//   showRefreshButton = true,
//   className = "",
// }: VolumeChartProps) {
//   // State management
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Dynamic chart config based on props
//   const chartConfig = useMemo<ChartConfig>(
//     () => ({
//       [dataKey]: { label: yAxisLabel, color: fillColorVar },
//     }),
//     [dataKey, yAxisLabel, fillColorVar]
//   );

//   // Data fetching logic
//   const fetchData = useCallback(
//     async (range: ChartRange) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await statsAdminService.getAdminChartData(
//           chartType,
//           range
//         );
//         setChartData(data);
//       } catch (err: any) {
//         setError(err.message || `Failed to load ${chartType} data.`);
//         setChartData([]);
//         console.error(
//           `Error fetching ${chartType} chart data (${range}):`,
//           err
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [chartType]
//   );

//   // Fetch data on mount and when timeRange changes
//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);

//   // Handle refresh button click
//   const handleRefresh = () => {
//     fetchData(timeRange);
//   };

//   // Calculate total volume
//   const totalVolume = useMemo(
//     () =>
//       chartData.reduce(
//         (acc, curr) =>
//           acc + ((curr[dataKey as keyof ChartDataPoint] as number) || 0),
//         0
//       ),
//     [chartData, dataKey]
//   );

//   // Format currency with appropriate scale
//   const formatCurrency = (value: number) => {
//     if (isNaN(value)) return "N/A";

//     if (value >= 1000000) {
//       return `$${(value / 1000000).toFixed(1)}M`;
//     } else if (value >= 1000) {
//       return `$${(value / 1000).toFixed(1)}K`;
//     }

//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   // Format dates based on time range
//   const formatDate = (dateString: string, format: "tooltip" | "axis") => {
//     const date = moment(dateString, "YYYY-MM-DD");
//     if (!date.isValid()) return "";

//     if (format === "tooltip") {
//       return timeRange === "month"
//         ? date.format("MMM DD, YYYY")
//         : date.format("MMM YYYY");
//     }

//     return timeRange === "month" ? date.format("D MMM") : date.format("MMM");
//   };

//   return (
//     <Card
//       className={`flex flex-col h-full dark:bg-primarybox shadow-none border ${className}`}
//     >
//       <CardHeader className="flex-shrink-0 p-3">
//         <div className="flex flex-wrap items-start justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <div className="flex justify-center items-center w-12 h-12 bg-lightgray dark:bg-primarybox rounded-full">
//               {icon}
//             </div>

//             <div>
//               <CardTitle className="text-lg font-semibold">{title}</CardTitle>
//               <CardDescription className="text-xs">
//                 {description}
//               </CardDescription>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {showRefreshButton && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="size-10 rounded-full hover:bg-lightgray dark:hover:bg-primarybox"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
//                 />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//             )}

//             {/* Tabing-Parts - Styled like TransactionTabs */}
//             <Tabs
//               value={timeRange}
//               onValueChange={(value) => setTimeRange(value as ChartRange)}
//             >
//               <TabsList
//                 className={cn(
//                   // Base styles from TransactionTabs's inner tab container
//                   "relative inline-flex items-center rounded-full py-5 overflow-hidden",
//                   " dark:bg-primarybox bg-lightgray",
//                   "sm:w-auto w-full"
//                 )}
//               >
//                 {timeRangeTabs.map((tab) => (
//                   <TabsTrigger
//                     key={tab.id}
//                     value={tab.id}
//                     className={cn(
//                       // Base button styles from TransactionTabs, adapted for flex child
//                       "flex-1 relative text-sm  p-4 font-medium rounded-full",
//                       "flex items-center justify-center", // Ensure content (span) is centered
//                       "transition-colors duration-200 ease-linear focus:outline-none cursor-pointer",
//                       // Neutralize default ShadCN active styles for TabsTrigger to allow our motion.div to control appearance
//                       // Optional: Clearer focus styling if default is obtrusive
//                       "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
//                     )}
//                     style={{ WebkitTapHighlightColor: "transparent" }}
//                   >
//                     {/* Animated background: Renders only for the active tab */}
//                     {timeRange === tab.id && (
//                       <motion.div
//                         layoutId="activeVolumeChartTabIndicator" // Unique layoutId for this tab group
//                         className="absolute inset-0 rounded-full bg-primary shadow-sm z-0" // Style from TransactionTabs
//                         transition={{
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 30,
//                         }}
//                       />
//                     )}

//                     {/* Tab Label: Text is always rendered */}
//                     <span
//                       className={cn(
//                         "relative z-0", // Ensures text is stackable; DOM order will place it above the motion.div (also z-0)
//                         // Conditional text color based on active state, from TransactionTabs
//                         timeRange === tab.id
//                           ? "text-neutral-900" // Active tab text color
//                           : "text-neutral-900 dark:text-white" // Inactive tab text color
//                       )}
//                     >
//                       {tab.label}
//                     </span>
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
//         {loading && (
//           <>
//             <div className="flex flex-col items-center justify-center mb-4 pt-2">
//               <Skeleton className="h-7 w-2/5 max-w-[160px] sm:h-8 rounded-md" />
//               <div className="flex items-center gap-2 mt-1">
//                 <Skeleton className="h-4 w-20 rounded-sm" />
//                 <Skeleton className="h-5 w-16 rounded-md" />
//               </div>
//             </div>
//             <div
//               className="flex-grow w-full flex flex-col"
//               style={{ minHeight: "200px" }}
//             >
//               <Skeleton className="flex-grow w-full rounded-md" />
//               <div className="flex justify-between w-full px-1 pt-2">
//                 {[...Array(7)].map((_, i) => (
//                   <Skeleton
//                     key={i}
//                     className="h-5 w-20 rounded-xl opacity-70"
//                   />
//                 ))}
//               </div>
//             </div>
//           </>
//         )}

//         {error && !loading && (
//           <div className="flex-grow flex justify-center items-center text-center p-4">
//             <div className="text-red-500 dark:text-red-400">
//               <p className="text-sm font-medium">Error loading chart data</p>
//               <p className="text-xs mt-1">{error}</p>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleRefresh}
//                 className="mt-3"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" /> Try Again
//               </Button>
//             </div>
//           </div>
//         )}

//         {!loading && !error && chartData.length === 0 && (
//           <div className="flex-grow flex justify-center items-center text-center text-gray-500 dark:text-gray-400">
//             <p className="text-sm">
//               No data available for the selected period.
//             </p>
//           </div>
//         )}

//         {!loading && !error && chartData.length > 0 && (
//           <>
//             <div className="flex flex-col items-center sm:space-y-2 space-y-1 justify-center mb-4 pt-2">
//               <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.9_0.2334_128.99)]">
//                 {formatCurrency(totalVolume)}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm">
//                   Total {timeRange === "month" ? "30 days" : "12 months"}
//                 </span>
                
//                 <Badge
//                   variant="outline"
//                   className="text-xs font-normal bg-[oklch(0.44_0_0)] text-white"
//                 >
//                   {chartType === "payments" ? "Payments" : "Transfers"}
//                 </Badge>
//               </div>
//             </div>
            
//             <ChartContainer
//               config={chartConfig}
//               className="aspect-auto h-[200px] w-full flex-grow"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
//                   barGap={2}
//                   barSize={timeRange === "month" ? 12 : 24}
//                 >
//                   <CartesianGrid
//                     vertical={false}
//                     strokeDasharray="3 3"
//                     strokeOpacity={0.7}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     minTickGap={timeRange === "month" ? 5 : 20}
//                     tickFormatter={(value) => formatDate(value, "axis")}
//                     fontSize={12}
//                   />
//                   <ChartTooltip
//                     cursor={{
//                       fill: "oklch(0.9 0.2334 128.99 / 10%)",
//                       opacity: 0.3,
//                     }}
//                     content={
//                       <ChartTooltipContent
//                         labelFormatter={(label) => formatDate(label, "tooltip")}
//                         formatter={(value) => formatCurrency(value as number)}
//                         indicator="dot"
//                       />
//                     }
//                   />
//                   <Bar
//                     dataKey={dataKey}
//                     fill={fillColorVar}
//                     radius={[4, 4, 0, 0]}
//                     animationDuration={300}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


// // frontend/src/app/admin/components/DashboardSection/VolumeChart.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   ResponsiveContainer,
//   Tooltip,
//   YAxis,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { RefreshCw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import statsAdminService, {
//   ChartDataPoint,
//   ChartType,
//   ChartRange,
// } from "../../../services/admin/stats.admin"; // Ensure this path is correct
// import moment from "moment";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils"; // Ensure cn utility is correctly set up

// interface VolumeChartProps {
//   title: string;
//   description: string;
//   chartType: ChartType;
//   icon: React.ReactNode;
//   initialRange?: ChartRange;
//   yAxisLabel?: string;
//   dataKey?: string;
//   fillColorVar?: string; // Note: The component now primarily uses theme colors, this prop might be overridden or less effective
//   showRefreshButton?: boolean;
//   className?: string;
// }

// const timeRangeTabs = [
//   { id: "month", label: "30 Days" },
//   { id: "year", label: "12 Months" },
//   { id: "all", label: "All Time" },
// ] as const;

// export function VolumeChart({
//   title,
//   description,
//   chartType,
//   icon,
//   initialRange = "month",
//   yAxisLabel = "Volume",
//   dataKey = "volume",
//   fillColorVar, // Prop still exists, but theme color is prioritized for the bar
//   showRefreshButton = true,
//   className = "",
// }: VolumeChartProps) {
//   const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Chart config uses the theme's primary color by default, or fillColorVar if provided.
//   // However, the <Bar fill={...}> below directly uses the theme's primary.
//   const chartConfig = useMemo<ChartConfig>(
//     () => ({
//       [dataKey]: {
//         label: yAxisLabel,
//         color: fillColorVar || "hsl(var(--primary))", // Fallback to prop, then theme
//       },
//     }),
//     [dataKey, yAxisLabel, fillColorVar]
//   );

//   const fetchData = useCallback(
//     async (range: ChartRange) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await statsAdminService.getAdminChartData(
//           chartType,
//           range
//         );
//         setChartData(data);
//       } catch (err: any) {
//         const errorMessage =
//           err.message || `Failed to load ${chartType} data.`;
//         setError(errorMessage);
//         setChartData([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [chartType]
//   );

//   useEffect(() => {
//     fetchData(timeRange);
//   }, [timeRange, fetchData]);

//   const handleRefresh = () => {
//     fetchData(timeRange);
//   };

//   const totalVolume = useMemo(
//     () =>
//       chartData.reduce(
//         (acc, curr) =>
//           acc + ((curr[dataKey as keyof ChartDataPoint] as number) || 0),
//         0
//       ),
//     [chartData, dataKey]
//   );

//   const formatCurrency = (value: number) => {
//     if (isNaN(value) || value === null) return "N/A";
//     if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: value < 1000 ? 2 : 0,
//     })}`;
//   };

//   const formatYAxisTick = (value: number) => {
//     if (value >= 1000000) return `${value / 1000000}M`;
//     if (value >= 1000) return `${value / 1000}K`;
//     return `${value}`;
//   };

//   const formatDate = (dateString: string, format: "tooltip" | "axis"): string => {
//     const date = moment(dateString, "YYYY-MM-DD");
//     if (!date.isValid()) return "";
//     if (format === "tooltip") {
//       if (timeRange === "month") return date.format("MMM DD, YYYY");
//       if (timeRange === "year") return date.format("MMM YYYY");
//       if (timeRange === "all") return date.format("YYYY");
//     }
//     if (timeRange === "month") return date.format("D MMM");
//     if (timeRange === "year") return date.format("MMM");
//     if (timeRange === "all") return date.format("YYYY");
//     return "";
//   };

//   const barSize = useMemo(() => {
//     if (timeRange === "month") return 12;
//     if (timeRange === "year") return 24;
//     if (timeRange === "all") return Math.max(10, 40 - chartData.length * 1.5);
//     return 12;
//   }, [timeRange, chartData.length]);

//   const minTickGap = useMemo(() => {
//     if (timeRange === "month") return 5;
//     if (timeRange === "year") return 15;
//     if (timeRange === "all") return 10;
//     return 5;
//   }, [timeRange]);

//   return (
//     <Card
//       className={cn(
//         "flex flex-col h-full dark:bg-primarybox shadow-none border border-border", // Explicitly adding border-border for theme border
//         className
//       )}
//     >
//       <CardHeader className="flex-shrink-0 p-3">
//         <div className="flex flex-wrap items-start justify-between gap-2">
//           <div className="flex items-center gap-2">
//             {/* STYLING: Icon background */}
//             <div className="flex justify-center items-center w-12 h-12 bg-muted dark:bg-primarybox rounded-full">
//               {icon}
//             </div>
//             <div>
//               {/* STYLING: Card Title and Description text colors */}
//               <CardTitle className="text-lg font-semibold text-card-foreground dark:text-card-foreground">
//                 {title}
//               </CardTitle>
//               <CardDescription className="text-xs text-muted-foreground">
//                 {description}
//               </CardDescription>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             {showRefreshButton && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 // STYLING: Refresh button text and hover background
//                 className="size-10 rounded-full text-muted-foreground hover:bg-primarybox"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
//                 />
//                 <span className="sr-only">Refresh</span>
//               </Button>
//             )}
//             <Tabs
//               value={timeRange}
//               onValueChange={(value) => setTimeRange(value as ChartRange)}
//             >
//               <TabsList
//                 className={cn(
//                   "relative inline-flex items-center rounded-full py-1.5 px-1.5 overflow-hidden",
//                   // STYLING: TabsList background
//                   "bg-muted dark:bg-primarybox",
//                   "sm:w-auto w-full"
//                 )}
//               >
//                 {timeRangeTabs.map((tab) => (
//                   <TabsTrigger
//                     key={tab.id}
//                     value={tab.id}
//                     className={cn(
//                       "flex-1 relative text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 font-medium rounded-full",
//                       "flex items-center justify-center",
//                       "transition-colors duration-200 ease-linear focus:outline-none cursor-pointer",
//                       "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:shadow-sm" // Added active shadow
//                     )}
//                     style={{ WebkitTapHighlightColor: "transparent" }}
//                   >
//                     {timeRange === tab.id && (
//                       <motion.div
//                         layoutId={`activeVolumeChartTabIndicator-${chartType}`}
//                         // STYLING: Active tab indicator background
//                         className="absolute inset-0 rounded-full bg-background dark:bg-primarybox shadow-md" // Changed to background for inset effect
//                         transition={{
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 30,
//                         }}
//                       />
//                     )}
//                     <span
//                       className={cn(
//                         "relative z-10",
//                         // STYLING: Active and inactive tab text colors
//                         timeRange === tab.id
//                           ? "text-primary dark:text-primary-foreground" // Active text on primarybox is tricky, using primary-foreground
//                           : "text-muted-foreground"
//                       )}
//                     >
//                       {tab.label}
//                     </span>
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
//         {loading && (
//           <> {/* Skeleton styles should use muted backgrounds */}
//             <div className="flex flex-col items-center justify-center mb-4 pt-2">
//               <Skeleton className="h-7 w-2/5 max-w-[160px] sm:h-8 rounded-md bg-muted" />
//               <div className="flex items-center gap-2 mt-1">
//                 <Skeleton className="h-4 w-20 rounded-sm bg-muted" />
//                 <Skeleton className="h-5 w-16 rounded-md bg-muted" />
//               </div>
//             </div>
//             <div
//               className="flex-grow w-full flex flex-col"
//               style={{ minHeight: "200px" }}
//             >
//               <Skeleton className="flex-grow w-full rounded-md bg-muted" />
//               <div className="flex justify-between w-full px-1 pt-2">
//                 {[...Array(5)].map((_, i) => (
//                     <Skeleton key={i} className="h-5 w-12 sm:w-16 rounded-xl opacity-70 bg-muted"/>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}

//         {error && !loading && ( /* Error message styling */
//           <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
//             <div className="text-destructive dark:text-destructive-foreground">
//               <p className="text-sm font-semibold">Error Loading Chart Data</p>
//               <p className="text-xs mt-1">{error}</p>
//               <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-3 text-xs">
//                 <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Try Again
//               </Button>
//             </div>
//           </div>
//         )}

//         {!loading && !error && chartData.length === 0 && ( /* No data message styling */
//           <div className="flex-grow flex justify-center items-center text-center text-muted-foreground p-4">
//             <p className="text-sm">No data available for the selected period.</p>
//           </div>
//         )}

//         {!loading && !error && chartData.length > 0 && (
//           <>
//             <div className="flex flex-col items-center sm:space-y-1 space-y-0.5 justify-center mb-4 pt-2">
//               {/* STYLING: Total volume text color */}
//               <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-primary">
//                 {formatCurrency(totalVolume)}
//               </div>
//               <div className="flex items-center gap-2">
//                 {/* STYLING: "Total..." text color */}
//                 <span className="text-xs sm:text-sm text-muted-foreground">
//                   Total{" "}
//                   {timeRange === "month"
//                     ? "last 30 days"
//                     : timeRange === "year"
//                     ? "last 12 months"
//                     : "all time"}
//                 </span>
//                 {/* STYLING: Badge background and text */}
//                 <Badge
//                   variant="outline"
//                   className="text-xs font-normal border-primary/30 bg-primary/10 text-primary dark:text-primary dark:bg-primary/20"
//                 >
//                   {chartType === "payments" ? "Payments" : "Transfers"}
//                 </Badge>
//               </div>
//             </div>
//             <ChartContainer
//               config={chartConfig}
//               className="aspect-auto h-[200px] w-full flex-grow"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ left: -10, right: 10, top: 5, bottom: 0 }}
//                   barGap={timeRange === 'month' ? 2 : 4}
//                   barCategoryGap={timeRange === 'all' ? '20%' : '10%'}
//                   barSize={barSize}
//                 >
//                   {/* STYLING: CartesianGrid stroke */}
//                   <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.7}/>
//                   {/* STYLING: XAxis stroke and font size */}
//                   <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={minTickGap}
//                     tickFormatter={(value) => formatDate(value, "axis")} fontSize={10} stroke="hsl(var(--muted-foreground))"
//                   />
//                   {/* STYLING: YAxis stroke and font size */}
//                   <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10}
//                     tickFormatter={formatYAxisTick} stroke="hsl(var(--muted-foreground))"
//                   />
//                   <ChartTooltip
//                     cursor={{ fill: "hsl(var(--primary) / 0.1)" }} // STYLING: Tooltip cursor fill
//                     content={ // STYLING: Tooltip content background and text
//                       <ChartTooltipContent
//                         labelFormatter={(label) => formatDate(label, "tooltip")}
//                         formatter={(value) => formatCurrency(value as number)}
//                         indicator="dot"
//                         className="bg-popover text-popover-foreground dark:bg-primarybox/95 dark:text-white backdrop-blur-sm"
//                       />
//                     }
//                   />
//                   <Bar // STYLING: Bar fill color
//                     dataKey={dataKey}
//                     fill="#adfa1c"
//                     radius={[4, 4, 0, 0]}
//                     animationDuration={500}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import statsAdminService, {
  ChartDataPoint, // Using the updated ChartDataPoint
  ChartType,
  ChartRange,
} from "../../../services/admin/stats.admin";
import moment from "moment";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VolumeChartProps {
  title: string;
  description: string;
  chartType: ChartType;
  icon: React.ReactNode;
  initialRange?: ChartRange;
  yAxisLabel?: string;
  dataKey?: string; // This will always be 'volume'
  fillColorVar?: string;
  showRefreshButton?: boolean;
  className?: string;
}

const timeRangeTabs = [
  { id: "month", label: "30 Days" },
  { id: "year", label: "12 Months" },
  { id: "all", label: "All Time" },
  { id: "by_currency", label: "By Currency" },
] as const;

export function VolumeChart({
  title,
  description,
  chartType,
  icon,
  initialRange = "month",
  yAxisLabel = "Volume",
  dataKey = "volume",
  fillColorVar,
  showRefreshButton = true,
  className = "",
}: VolumeChartProps) {
  const [timeRange, setTimeRange] = useState<ChartRange>(initialRange);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const chartConfig = useMemo<ChartConfig>(() => {
    const baseConfig: ChartConfig = {
      [dataKey]: {
        // 'volume'
        label: yAxisLabel,
        color: fillColorVar || "hsl(var(--primary))",
      },  
    };
    if (timeRange === "by_currency" && chartData.length > 0) {
      chartData.forEach((item) => {
        if (item.category) {
          baseConfig[item.category] = {
            label: item.currencyName || item.category,
            color: fillColorVar || "hsl(var(--primary))",
          };
        }
      });
    }
    return baseConfig;
  }, [dataKey, yAxisLabel, fillColorVar, chartData, timeRange]);

  const fetchData = useCallback(
    async (range: ChartRange) => {
      setLoading(true);
      setError(null);
      try {
        const data = await statsAdminService.getAdminChartData(
          chartType,
          range
        );
        setChartData(data);
      } catch (err: any) {
        const errorMessage =
          err.message || `Failed to load ${chartType} data.`;
        setError(errorMessage);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    },
    [chartType]
  );

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange, fetchData]);

  const handleRefresh = () => {
    fetchData(timeRange);
  };

  const totalVolume = useMemo(
    () => chartData.reduce((acc, curr) => acc + (curr.volume || 0), 0),
    [chartData]
  );

  const formatCurrency = (value: number) => {
    if (isNaN(value) || value === null) return "N/A";
    // Display full amount
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2, // Always show 2 decimal places for consistency
      maximumFractionDigits: 2,
    })}`;
  };

  const formatYAxisTick = (value: number) => {
    // For Y-axis, using K/M might still be preferable for very large numbers
    // to avoid clutter. If full numbers are strictly needed here too,
    // then this function should also be changed.
    // For now, keeping K/M for Y-axis ticks for better readability of scale.
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return `${value}`;
  };

  const formatCategory = (
    categoryString: string,
    formatType: "tooltip" | "axis"
  ): string => {
    if (timeRange === "by_currency") {
      const dataPoint = chartData.find((d) => d.category === categoryString);
      if (formatType === "tooltip" && dataPoint?.currencyName) {
        return `${dataPoint.currencyName} (${categoryString})`;
      }
      return categoryString;
    }
    const date = moment(categoryString, "YYYY-MM-DD");
    if (!date.isValid()) return categoryString;

    if (formatType === "tooltip") {
      if (timeRange === "month") return date.format("MMM DD, YYYY");
      if (timeRange === "year") return date.format("MMM YYYY");
      if (timeRange === "all") return date.format("YYYY");
    }
    if (timeRange === "month") return date.format("D MMM");
    if (timeRange === "year") return date.format("MMM");
    if (timeRange === "all") return date.format("YYYY");
    return categoryString;
  };

  const barSize = useMemo(() => {
    if (timeRange === "month") return 12;
    if (timeRange === "year") return 24;
    if (timeRange === "all" || timeRange === "by_currency") {
      return Math.max(10, 60 - chartData.length * 2);
    }
    return 12;
  }, [timeRange, chartData.length]);

  const minTickGap = useMemo(() => {
    if (timeRange === "month") return 5;
    if (timeRange === "year") return 15;
    if (timeRange === "all" || timeRange === "by_currency") return 0;
    return 5;
  }, [timeRange]);

  const xAxisDataKey = "category";

  const getSubtitleText = () => {
    if (timeRange === "month") return "last 30 days";
    if (timeRange === "year") return "last 12 months";
    if (timeRange === "all") return "all time";
    if (timeRange === "by_currency")
      return "across all currencies (all time)";
    return "";
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full bg-primarybox shadow-none",
        className
      )}
    >
      <CardHeader className="flex-shrink-0 p-3">
        <div className="flex lg:flex-row flex-col items-center justify-between w-full gap-3">
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex gap-3">
              <div className="flex justify-center items-center size-12 bg-secondarybox rounded-full flex-shrink-0">
                {icon}
              </div>

              <div>
                <CardTitle className="text-lg font-semibold text-mainheadingWhite capitalize">
                  {title}
                </CardTitle>

                <CardDescription className="text-subheadingWhite">
                  {description}
                </CardDescription>
              </div>
            </div>

            <div className="flex font-medium">
              {showRefreshButton && (
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center justify-center cursor-pointer text-primary gap-2 bg-secondarybox hover:bg-secondaryboxhover size-10 rounded-full transition-all duration-75 ease-linear"
                >
                  <RefreshCw
                    className={`size-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span className="sr-only"> Refresh</span>
                </button>
              )}
            </div>
          </div>

          {/* Tabing */}
          <Tabs
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as ChartRange)}
            className="w-full"
          >
            <div className="rounded-full overflow-hidden">
              <TabsList
                className={cn(
                  "relative flex justify-normal items-center rounded-full p-1",
                  "bg-secondarybox",
                  "w-full h-auto whitespace-nowrap z-0 overflow-x-auto"
                )}
              >
                {timeRangeTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "flex-1 relative text-xs sm:text-sm px-4 py-1.5 font-medium rounded-full",
                      "flex items-center justify-center",
                      "transition-all duration-75 ease-linear focus:outline-none cursor-pointer",
                      "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                      "border-none data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {timeRange === tab.id && (
                      <motion.div
                        layoutId={`activeVolumeChartTabIndicator-${chartType}`}
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 ",
                        timeRange === tab.id
                          ? "text-mainheading font-semibold"
                          : "text-subheadingWhite"
                      )}
                    >
                      {tab.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col px-2 pb-4 pt-0 sm:px-4 sm:pb-6">
        {loading && (
          <>
            <div className="flex flex-col items-center justify-center mb-4 pt-2">
              <Skeleton className="sm:w-1/3 w-1/2 h-10 rounded-md" />
              <div className="flex items-center gap-1.5 mt-1">
                <Skeleton className="h-6 sm:w-32 w-24 rounded-md" />
                <Skeleton className="h-6 sm:w-25 w-18 rounded-md" />
              </div>
            </div>
            <div
              className="flex-grow w-full flex flex-col"
              style={{ minHeight: "194px" }}
            >
              <Skeleton className="flex-grow w-full rounded-md" />
              <div className="flex justify-between w-full gap-1 pt-2">
                {[...Array(timeRange === "by_currency" ? 5 : 8)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-5 w-12 sm:w-16 rounded-xl opacity-70"
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {error && !loading && (
          <div className="flex-grow flex flex-col justify-center items-center text-center space-y-3">
              <p className="lg:text-2xl text-xl font-semibold text-mainheadingWhite">Error Loading Chart Data</p>
              <p className="text-subheadingWhite">{error}</p>
              <button
                onClick={handleRefresh}
                className="flex items-center text-center px-8 py-3 mx-auto bg-secondarybox hover:bg-secondaryboxhover text-primary transition-all ease-linear duration-75 cursor-pointer rounded-full"
              >
                <RefreshCw className="size-4 mr-1.5" /> Try Again
              </button>
          </div>
        )}

        {!loading && !error && chartData.length === 0 && (
          <div className="flex-grow flex justify-center items-center text-center p-4">
            <p className="text-base text-mainheadingWhite">
              No data available for the selected period.
            </p>
          </div>
        )}


        {!loading && !error && chartData.length > 0 && (
          <>
            <div className="flex flex-col items-center space-y-1 justify-center mb-4 pt-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {formatCurrency(totalVolume)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-subheadingWhite">
                  Total {getSubtitleText()}
                </span>

                <Badge
                  variant="outline"
                  className="text-sm text-primary bg-primary/20 border border-primary font-medium"
                >
                  {chartType === "payments" ? "Add Money" : "Send Money"}
                </Badge>
              </div>
            </div>

            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[200px] w-full flex-grow"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ left: -10, right: 10, top: 5, bottom: 0 }}
                  barGap={
                    timeRange === "month"
                      ? 2
                      : timeRange === "by_currency"
                      ? 4
                      : 4
                  }
                  barCategoryGap={
                    timeRange === "all" || timeRange === "by_currency"
                      ? "20%"
                      : "10%"
                  }
                  barSize={barSize}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    strokeOpacity={0.7}
                  />
                  
                  <XAxis
                    dataKey={xAxisDataKey} // Use generic 'category'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={minTickGap}
                    tickFormatter={(value) => formatCategory(value, "axis")}
                    fontSize={10}
                    stroke="hsl(var(--muted-foreground))"
                    interval={timeRange === "by_currency" ? 0 : undefined} // Show all labels for currency
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={10}
                    tickFormatter={formatYAxisTick}
                    stroke="hsl(var(--muted-foreground))"
                  />

                  <ChartTooltip
                    cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) =>
                          formatCategory(label, "tooltip")
                        }
                        formatter={(value, name, props) => {
                          const formattedValue = formatCurrency(
                            value as number
                          );
                          if (
                            timeRange === "by_currency" &&
                            props.payload?.currencyName &&
                            props.payload?.category !==
                              props.payload?.currencyName
                          ) {
                            return [
                              formattedValue,
                              `${props.payload.currencyName} (${props.payload.category})`,
                            ];
                          }
                          return formattedValue;
                        }}
                        indicator="dot"
                        className="bg-primarybox/95 border border-gray-600 text-mainheadingWhite backdrop-blur-sm"
                      />
                    }
                  />
                  <Bar
                    dataKey={dataKey} // 'volume'
                    fill="#66e8fa"
                    radius={[4, 4, 0, 0]}
                    animationDuration={500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}