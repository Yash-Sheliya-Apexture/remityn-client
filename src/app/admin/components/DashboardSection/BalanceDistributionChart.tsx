// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Pie, PieChart, Tooltip, Label as RechartsLabel, Cell } from "recharts"; // Added Cell
// import { TrendingUp, CircleDollarSign, AlertCircle, RefreshCw, Info } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip as ShadcnChartTooltip, // Use ShadcnChartTooltip for consistency
//   ChartTooltipContent as ShadcnChartTooltipContent, // Use ShadcnChartTooltipContent
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button"; // Using Shadcn Button
// import statsAdminService, {
//   BalanceDistributionDataPoint,
// } from "../../../services/admin/stats.admin"; // Adjust path if necessary
// import { cn } from "@/lib/utils";

// // Define a list of distinct colors for the pie chart segments
// // These should correspond to CSS variables defined in your globals.css
// const PREDEFINED_COLORS_HSL = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
//   "hsl(var(--chart-4))",
//   "hsl(var(--chart-5))",
//   "hsl(var(--chart-6))",
//   "hsl(var(--chart-7))",
//   "hsl(var(--chart-8))",
// ];

// export default function BalanceDistributionChart() {
//   // State for chart data, excluding the 'fill' property initially
//   // 'fill' will be applied via <Cell> or can be added to chartConfig for tooltips
//   const [chartData, setChartData] = useState<Omit<BalanceDistributionDataPoint, 'fill'>[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await statsAdminService.getAdminBalanceDistribution();
//       // Data from API doesn't need 'fill' if we use <Cell> components for coloring
//       setChartData(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load balance distribution data.");
//       console.error("Error fetching balance distribution:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array means this runs once on mount

//   const chartConfig = useMemo(() => {
//     const config: ChartConfig = {
//       totalBalance: { label: "Balance" }, // For the tooltip value if not overridden by formatter
//     };
//     chartData.forEach((item, index) => {
//       config[item.currencyCode] = {
//         label: `${item.currencyCode} (${item.currencyName})`,
//         // Assign color to chartConfig for tooltip label/indicator consistency
//         color: PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length],
//       };
//     });
//     return config;
//   }, [chartData]);

//   const totalOverallBalance = useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.totalBalance, 0);
//   }, [chartData]);

//   const formatCurrency = (value: number) => {
//     if (isNaN(value) || value === null) return "N/A";
//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   if (loading) {
//     return (
//       <Card className="flex flex-col lg:w-1/4 w-full h-full bg-lightgray dark:bg-primarybox ">
//         <CardHeader className="items-center pb-0">
//           <Skeleton className="h-6 w-3/4 rounded-md bg-muted" />
//           <Skeleton className="h-4 w-1/2 mt-1 rounded-md bg-muted" />
//         </CardHeader>
//         <CardContent className="flex-1 pb-0 flex items-center justify-center">
//           <Skeleton className="aspect-square w-full max-w-[200px] rounded-full bg-muted" />
//         </CardContent>
//         <CardFooter className="flex-col gap-2 text-sm pt-4">
//           <Skeleton className="h-4 w-3/5 rounded-md bg-muted" />
//           <Skeleton className="h-4 w-4/5 mt-1 rounded-md bg-muted" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="flex flex-col items-center justify-center sm:w-1/4 w-full h-full p-6 bg-card dark:bg-primarybox ">
//         <AlertCircle className="w-12 h-12 text-destructive mb-4" />
//         <CardTitle className="text-lg text-destructive text-center">Loading Failed</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground text-center mt-1 mb-4">
//           {error}
//         </CardDescription>
//         <Button variant="outline" onClick={fetchData} size="sm">
//           <RefreshCw className="w-4 h-4 mr-2" />
//           Try Again
//         </Button>
//       </Card>
//     );
//   }

//   if (chartData.length === 0) {
//      return (
//       <Card className="flex flex-col items-center justify-center text-center sm:w-1/4 w-full h-full p-6 bg-card dark:bg-primarybox ">
//         <Info className="w-12 h-12 text-muted-foreground mb-4" />
//         <CardTitle className="text-lg text-card-foreground">No Balance Data</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground mt-1">
//           There are currently no account balances to display.
//         </CardDescription>
//       </Card>
//     );
//   }

//   // Type for the props passed to the Label's content function
//   type LabelContentProps = {
//     viewBox?: { cx?: number; cy?: number; [key: string]: any };
//     [key: string]: any;
//   };

//   return (
//     <Card className="sm:w-1/4 w-full bg-card dark:bg-primarybox sm:p-6 p-4 rounded-xl  relative overflow-hidden">
//       <CardHeader className="items-center pb-0">
//         <div className="flex items-center gap-2 mt-4 mb-1">
//             <CircleDollarSign className="w-5 h-5 text-primary" />
//             <CardTitle className="text-card-foreground">Account Balances</CardTitle>
//         </div>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square w-full max-w-[300px] sm:max-w-[320px] md:max-w-[280px] lg:max-w-[400px]"
//         >
//           <PieChart>
//             <ShadcnChartTooltip
//               cursor={false} // No cursor effect on hover for pie chart
//               content={
//                 <ShadcnChartTooltipContent
//                   formatter={(value, name, entry) => { // entry is the payload for the hovered segment
//                     // 'name' here is the nameKey from <Pie> (currencyCode)
//                     // 'value' is the dataKey from <Pie> (totalBalance)
//                     // 'entry.payload' contains the original data object for the segment
//                     const currencyLabel = chartConfig[name as string]?.label || name;
//                     return [`${formatCurrency(value as number)}`, currencyLabel];
//                   }}
//                   hideLabel={false} // Will use the second item returned by formatter as label
//                   className="bg-popover text-popover-foreground dark:bg-primarybox/95 dark:text-white backdrop-blur-sm"
//                   // To show color indicator in tooltip, Recharts usually uses entry.payload.fill or chartConfig color
//                   // indicator="dot" // or "line", "dashed" - depends on ShadcnChartTooltipContent capabilities
//                 />
//               }
//             />
//             <Pie
//               data={chartData}
//               dataKey="totalBalance"
//               nameKey="currencyCode" // Used to link to chartConfig for tooltips
//               innerRadius={60}
//               strokeWidth={5}
//               // stroke="hsl(var(--background))" // Optional: adds a border around segments, using background for separation
//               // activeIndex={0} // Optionally set an active segment
//             >
//               {/* Map over chartData to render a <Cell> for each segment to control its color */}
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${entry.currencyCode}-${index}`}
//                   fill={PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length]}
//                   stroke="hsl(var(--border))" // Add a border to each cell for better separation
//                   strokeWidth={1} // Adjust if strokeWidth on Pie is also high
//                 />
//               ))}
//               <RechartsLabel
//                 content={(props: LabelContentProps) => {
//                   const { viewBox } = props;
//                   if (viewBox && typeof viewBox.cx === 'number' && typeof viewBox.cy === 'number') {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {formatCurrency(totalOverallBalance)}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy + 24}
//                           className="fill-muted-foreground text-sm"
//                         >
//                           Total Balance
//                         </tspan>
//                       </text>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Pie, PieChart, Tooltip, Label as RechartsLabel, Cell } from "recharts";
// import { TrendingUp, CircleDollarSign, AlertCircle, RefreshCw, Info } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip as ShadcnChartTooltip,
//   ChartTooltipContent as ShadcnChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import statsAdminService, {
//   BalanceDistributionDataPoint,
// } from "../../../services/admin/stats.admin";
// import { cn } from "@/lib/utils";

// const PREDEFINED_COLORS_HSL = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
//   "hsl(var(--chart-4))",
//   "hsl(var(--chart-5))",
//   "hsl(var(--chart-6))",
//   "hsl(var(--chart-7))",
//   "hsl(var(--chart-8))",
// ];

// export default function BalanceDistributionChart() {
//   const [chartData, setChartData] = useState<Omit<BalanceDistributionDataPoint, 'fill'>[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await statsAdminService.getAdminBalanceDistribution();
//       setChartData(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load balance distribution data.");
//       console.error("Error fetching balance distribution:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const chartConfig = useMemo(() => {
//     const config: ChartConfig = {
//       totalBalance: { label: "Balance" },
//     };
//     chartData.forEach((item, index) => {
//       config[item.currencyCode] = {
//         label: `${item.currencyCode} (${item.currencyName})`,
//         color: PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length],
//       };
//     });
//     return config;
//   }, [chartData]);

//   const totalOverallBalance = useMemo(() => {
//     // This will now sum the corrected balances from the API
//     return chartData.reduce((acc, curr) => acc + curr.totalBalance, 0);
//   }, [chartData]);

//   const formatCurrency = (value: number) => {
//     if (isNaN(value) || value === null) return "N/A";
//     return `$${value.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   if (loading) {
//     return (
//       <Card className="flex flex-col sm:w-1/4 w-full h-full bg-card dark:bg-primarybox ">
//         <CardHeader className="items-center pb-0">
//           <Skeleton className="h-6 w-3/4 rounded-md bg-muted" />
//           <Skeleton className="h-4 w-1/2 mt-1 rounded-md bg-muted" />
//         </CardHeader>
//         <CardContent className="flex-1 pb-0 flex items-center justify-center">
//           <Skeleton className="aspect-square w-full max-w-[200px] rounded-full bg-muted" />
//         </CardContent>
//         <CardFooter className="flex-col gap-2 text-sm pt-4">
//           <Skeleton className="h-4 w-3/5 rounded-md bg-muted" />
//           <Skeleton className="h-4 w-4/5 mt-1 rounded-md bg-muted" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="flex flex-col items-center justify-center sm:w-1/4 w-full h-full p-6 bg-card dark:bg-primarybox ">
//         <AlertCircle className="w-12 h-12 text-destructive mb-4" />
//         <CardTitle className="text-lg text-destructive text-center">Loading Failed</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground text-center mt-1 mb-4">
//           {error}
//         </CardDescription>
//         <Button variant="outline" onClick={fetchData} size="sm">
//           <RefreshCw className="w-4 h-4 mr-2" />
//           Try Again
//         </Button>
//       </Card>
//     );
//   }

//   if (chartData.length === 0) {
//      return (
//       <Card className="flex flex-col items-center justify-center text-center sm:w-1/4 w-full h-full p-6 bg-card dark:bg-primarybox ">
//         <Info className="w-12 h-12 text-muted-foreground mb-4" />
//         <CardTitle className="text-lg text-card-foreground">No Balance Data</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground mt-1">
//           There are currently no calculated account balances to display.
//         </CardDescription>
//       </Card>
//     );
//   }

//   type LabelContentProps = {
//     viewBox?: { cx?: number; cy?: number; [key: string]: any };
//     [key: string]: any;
//   };

//   return (
//     <Card className="sm:w-1/4 w-full bg-card dark:bg-primarybox sm:p-6 p-4 rounded-xl  relative overflow-hidden">
//       <CardHeader className="items-center pb-0">
//         <div className="flex items-center gap-2 mt-4 mb-1">
//             <CircleDollarSign className="w-5 h-5 text-primary" />
//             <CardTitle className="text-card-foreground">Account Balances</CardTitle>
//         </div>
//         <CardDescription className="text-xs text-center text-muted-foreground">
//             Net calculated balances (Completed Add Money - Completed Send Money)
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square w-full max-w-[300px] sm:max-w-[320px] md:max-w-[280px] lg:max-w-[400px]"
//         >
//           <PieChart>
//             <ShadcnChartTooltip
//               cursor={false}
//               content={
//                 <ShadcnChartTooltipContent
//                   formatter={(value, name, entry) => {
//                     const currencyLabel = chartConfig[name as string]?.label || name;
//                     return [`${formatCurrency(value as number)}`, currencyLabel];
//                   }}
//                   hideLabel={false}
//                   className="bg-popover text-popover-foreground dark:bg-primarybox/95 dark:text-white backdrop-blur-sm"
//                 />
//               }
//             />
//             <Pie
//               data={chartData}
//               dataKey="totalBalance"
//               nameKey="currencyCode"
//               innerRadius={60}
//               strokeWidth={5}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${entry.currencyCode}-${index}`}
//                   fill={PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length]}
//                   stroke="hsl(var(--border))"
//                   strokeWidth={1}
//                 />
//               ))}
//               <RechartsLabel
//                 content={(props: LabelContentProps) => {
//                   const { viewBox } = props;
//                   if (viewBox && typeof viewBox.cx === 'number' && typeof viewBox.cy === 'number') {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {formatCurrency(totalOverallBalance)}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy + 24}
//                           className="fill-muted-foreground text-sm"
//                         >
//                           Total Net Balance
//                         </tspan>
//                       </text>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//    Cell,
// } from "recharts";
// import {  AlertCircle, RefreshCw, Info, BarChart2 } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip as ShadcnChartTooltip,
//   ChartTooltipContent as ShadcnChartTooltipContent,
// } from "@/components/ui/chart"; // Keep for consistency if other charts use it
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import statsAdminService, {
//   BalanceDistributionDataPoint,
// } from "../../../services/admin/stats.admin";
// import { cn } from "@/lib/utils";
// import { FaWallet } from "react-icons/fa6";

// const PREDEFINED_COLORS_HSL = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
//   "hsl(var(--chart-4))",
//   "hsl(var(--chart-5))",
//   "hsl(var(--chart-6))",
//   "hsl(var(--chart-7))",
//   "hsl(var(--chart-8))",
// ];

// // Helper to format currency values
// const formatCurrency = (value: number | undefined | null, showDollarSign = true) => {
//   if (value === undefined || value === null || isNaN(value)) return "N/A";
//   return `${showDollarSign ? '$' : ''}${value.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// };

// // Helper for Y-axis tick formatting
// const formatYAxisTick = (value: number) => {
//   if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
//   if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}K`;
//   return `${value}`;
// };

// export default function BalanceDistributionChart() {
//   const [chartData, setChartData] = useState<BalanceDistributionDataPoint[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await statsAdminService.getAdminBalanceDistribution();
//       // Assign colors for the bar chart, similar to how pie chart did
//       const dataWithColors = data.map((item, index) => ({
//         ...item,
//         fill: PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length],
//       }));
//       setChartData(dataWithColors);
//     } catch (err: any) {
//       setError(err.message || "Failed to load balance distribution data.");
//       console.error("Error fetching balance distribution:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const chartConfig = useMemo(() => {
//     const config: ChartConfig = {
//       totalBalance: {
//         label: "Balance",
//         // color: "hsl(var(--chart-1))", // Default color, can be overridden by item.fill
//       },
//     };
//     chartData.forEach((item) => {
//       config[item.currencyCode] = { // Not strictly necessary for BarChart if using item.fill
//         label: item.currencyName || item.currencyCode,
//         color: item.fill,
//       };
//     });
//     return config;
//   }, [chartData]);

//   const totalOverallBalance = useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.totalBalance, 0);
//   }, [chartData]);

//   const barSize = useMemo(() => {
//     const numBars = chartData.length;
//     if (numBars === 0) return 20;
//     // Adjust bar size based on number of bars to prevent them from being too wide or too narrow
//     // This is a heuristic, you might need to fine-tune it
//     const baseSize = 60;
//     const minSize = 15;
//     const maxSize = 80;
//     const calculatedSize = Math.max(minSize, baseSize - numBars * 5);
//     return Math.min(maxSize, calculatedSize);
//   }, [chartData.length]);

//   if (loading) {
//     return (

//       /* Skleton */
//       <Card className="flex flex-col sm:w-1/4 w-full h-full bg-card dark:bg-primarybox ">
//         <CardHeader className="items-start pb-2">
//           <div className="flex items-center gap-2 mb-1">
//             <BarChart2 className="w-5 h-5 text-primary" />
//             <Skeleton className="h-6 w-3/4 rounded-md bg-muted" />
//           </div>
//           <Skeleton className="h-4 w-full rounded-md bg-muted" />
//           <Skeleton className="h-8 w-1/2 mt-3 rounded-md bg-muted" /> {/* For total balance */}
//         </CardHeader>
//         <CardContent className="flex-1 flex items-end justify-center pb-4">
//           <Skeleton className="w-full h-[150px] rounded-md bg-muted" />
//         </CardContent>
//         <CardFooter className="flex-col gap-1 text-xs pt-2 items-start">
//             <Skeleton className="h-3 w-20 rounded-md bg-muted" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="flex flex-col items-center justify-center sm:w-1/4 w-full h-full p-6 bg-card dark:bg-primarybox ">
//         <AlertCircle className="w-12 h-12 text-destructive mb-4" />
//         <CardTitle className="text-lg text-destructive text-center">Loading Failed</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground text-center mt-1 mb-4">
//           {error}
//         </CardDescription>
//         <Button variant="outline" onClick={fetchData} size="sm">
//           <RefreshCw className="w-4 h-4 mr-2" />
//           Try Again
//         </Button>
//       </Card>
//     );
//   }

//   if (chartData.length === 0) {
//      return (
//       <Card className="flex flex-col items-center justify-center text-center sm:w-1/4 w-full h-full p-6 bg-card dark:bg-primarybox ">
//         <Info className="w-12 h-12 text-muted-foreground mb-4" />
//         <CardTitle className="text-lg text-card-foreground">No Balance Data</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground mt-1">
//           There are currently no calculated account balances to display.
//         </CardDescription>
//       </Card>
//     );
//   }

//   return (
//     <Card className="sm:w-1/4 w-full bg-lightgray dark:bg-primarybox p-4 rounded-xl  relative overflow-hidden">
//       <CardHeader className="items-start pb-2">
//         <div className="flex items-center gap-2 mb-1">
//             <FaWallet className="w-5 h-5 text-primary" />
//             <CardTitle className="text-neutral-900 dark:text-white text-base sm:text-lg">Account Balances</CardTitle>
//         </div>
//         <CardDescription className="text-xs text-gray-500 dark:text-gray-300">
//             Net calculated balances (Completed Add Money - Completed Send Money) by currency.
//         </CardDescription>

//         <div className="mt-3">
//             <p className="text-xs text-gray-500 dark:text-gray-300">Total Net Balance</p>
//             <p className="text-2xl font-bold text-primary">
//                 {formatCurrency(totalOverallBalance)}
//             </p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 pb-0 pt-4">
//         <ChartContainer
//           config={chartConfig}
//           className="w-full h-[200px]" // Adjust height as needed
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{
//                 top: 5,
//                 right: 5, // Add some right margin if labels are long
//                 left: -10, // Adjust if Y-axis labels are cut off
//                 bottom: 0,
//               }}
//               barCategoryGap="20%" // Gap between categories of bars
//             >
//               <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5}/>
//               <XAxis
//                 dataKey="currencyCode"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 fontSize={10}
//                 stroke="hsl(var(--muted-foreground))"
//                 interval={0} // Show all currency codes if space allows
//               />
//               <YAxis
//                 tickFormatter={formatYAxisTick}
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 fontSize={10}
//                 stroke="hsl(var(--muted-foreground))"
//                 domain={['auto', 'auto']} // Allow negative balances if possible
//               />
//               <ShadcnChartTooltip
//                 cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
//                 content={
//                   <ShadcnChartTooltipContent
//                     formatter={(value, name, props) => {
//                       const currencyLabel = props.payload?.currencyName ? `${props.payload.currencyName} (${props.payload.currencyCode})` : props.payload?.currencyCode;
//                       return [formatCurrency(value as number), currencyLabel];
//                     }}
//                     indicator="dot"
//                     className="bg-popover text-popover-foreground dark:bg-primarybox/95 dark:text-white backdrop-blur-sm"
//                   />
//                 }
//               />
//               <Bar
//                 dataKey="totalBalance"
//                 radius={[4, 4, 0, 0]} // Rounded top corners for bars
//                 barSize={barSize}
//               >
//                 {chartData.map((entry) => (
//                   <Cell key={`cell-${entry.currencyCode}`} fill={entry.fill} />
//                 ))}
//                 {/* Optional: Add labels on top of bars if desired */}
//                 {/* <LabelList dataKey="totalBalance" position="top" formatter={(value:number) => formatCurrency(value, false)} fontSize={9} fill="hsl(var(--muted-foreground))" /> */}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//        <CardFooter className="flex-col gap-1 text-xs pt-4 items-start">
//             <p className="text-muted-foreground">Showing balances for active currencies.</p>
//         </CardFooter>
//     </Card>
//   );
// }

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Cell,
//   LabelList, // Added LabelList for optional labels on bars
// } from "recharts";
// import { AlertCircle, RefreshCw, Info, BarChart2 } from "lucide-react"; // BarChart2 is not used in the final card, but kept in imports

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip as ShadcnChartTooltip,
//   ChartTooltipContent as ShadcnChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import statsAdminService, {
//   BalanceDistributionDataPoint,
// } from "../../../services/admin/stats.admin";
// import { FaWallet } from "react-icons/fa6"; // FaWallet is used in the final card

// const PREDEFINED_COLORS_HSL = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
//   "hsl(var(--chart-4))",
//   "hsl(var(--chart-5))",
//   "hsl(var(--chart-6))",
//   "hsl(var(--chart-7))",
//   "hsl(var(--chart-8))",
// ];

// // Helper to format currency values
// const formatCurrency = (
//   value: number | undefined | null,
//   showDollarSign = true
// ) => {
//   if (value === undefined || value === null || isNaN(value)) return "N/A";
//   return `${showDollarSign ? "$" : ""}${value.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// };

// // Helper for Y-axis tick formatting
// const formatYAxisTick = (value: number) => {
//   if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
//   if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}K`;
//   return `${value}`;
// };

// export default function BalanceDistributionChart() {
//   const [chartData, setChartData] = useState<BalanceDistributionDataPoint[]>(
//     []
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate a network delay for better skeleton visualization
//       // await new Promise(resolve => setTimeout(resolve, 1500)); // Optional delay

//       const data = await statsAdminService.getAdminBalanceDistribution();
//       // Assign colors for the bar chart, similar to how pie chart did
//       const dataWithColors = data.map((item, index) => ({
//         ...item,
//         fill: PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length],
//       }));
//       setChartData(dataWithColors);
//     } catch (err: any) {
//       setError(err.message || "Failed to load balance distribution data.");
//       console.error("Error fetching balance distribution:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const chartConfig = useMemo(() => {
//     const config: ChartConfig = {
//       totalBalance: {
//         label: "Balance",
//         // color: "hsl(var(--chart-1))", // Default color, can be overridden by item.fill
//       },
//     };
//     chartData.forEach((item) => {
//       config[item.currencyCode] = {
//         // Not strictly necessary for BarChart if using item.fill
//         label: item.currencyName || item.currencyCode,
//         color: item.fill,
//       };
//     });
//     return config;
//   }, [chartData]);

//   const totalOverallBalance = useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.totalBalance, 0);
//   }, [chartData]);

//   const barSize = useMemo(() => {
//     const numBars = chartData.length;
//     if (numBars === 0) return 20;
//     // Adjust bar size based on number of bars to prevent them from being too wide or too narrow
//     // This is a heuristic, you might need to fine-tune it
//     const baseSize = 60;
//     const minSize = 15;
//     const maxSize = 80;
//     const calculatedSize = Math.max(minSize, baseSize - numBars * 5);
//     return Math.min(maxSize, calculatedSize);
//   }, [chartData.length]);

//   if (loading) {
//     return (
//       // Updated Skeleton Structure
//       <Card className="flex flex-col xl:w-1/4 w-full sm:order-2 order-1 bg-primarybox p-6 rounded-xl relative overflow-hidden">
//         <CardHeader className="items-start pb-2">
//           {/* Icon and Title */}
//           <div className="flex items-center gap-2 mb-1">
//             <Skeleton className="w-5 h-5 rounded-full bg-background/50" />
//             <Skeleton className="h-6 w-3/4 rounded-md bg-background/50" />
//           </div>

//           {/* Skeleton for the description */}
//           <Skeleton className="h-4 w-full rounded-md bg-background/50" />
//           {/* Skeleton for Total Net Balance Label and Value */}
//           <div className="mt-3 flex flex-col gap-1">
//             {/* Skeleton for the label "Total Net Balance" */}
//             <Skeleton className="h-3 w-1/4 rounded-md bg-background/50" />
//             {/* Skeleton for the large total balance value */}
//             <Skeleton className="h-8 w-1/2 rounded-md bg-background/50" />
//           </div>
//         </CardHeader>

//         {/* Skeleton for the Chart Area */}
//         <CardContent className="flex-1 pb-0 pt-4">
//           {/* Skeleton block mimicking the chart container */}
//           <Skeleton className="w-full h-[200px] rounded-md bg-background/50" />
//           {/* Optional: Add small skeletons for Y-axis/X-axis labels if desired for more detail */}
//           <div className="flex justify-between mt-2">
//             <Skeleton className="h-3 w-12 rounded-md bg-background/50" />
//             <Skeleton className="h-3 w-12 rounded-md bg-background/50" />
//             <Skeleton className="h-3 w-12 rounded-md bg-background/50" />
//             <Skeleton className="h-3 w-12 rounded-md bg-background/50" />
//             <Skeleton className="h-3 w-12 rounded-md bg-background/50" />
//           </div>
//         </CardContent>

//         {/* Skeleton for the Footer Text */}
//         <CardFooter className="flex text-xs justify-center">
//           <Skeleton className="h-4 w-2/3 rounded-md bg-background/50" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="flex flex-col items-center space-y-3 justify-center sm:order-2 order-1 xl:w-1/4 w-full p-6 bg-primarybox  text-center">
//         {" "}
//         {/* Added text-center */}
//         <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
//           <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
//         </div>
//         <CardTitle className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
//           Loading Failed
//         </CardTitle>{" "}
//         {/* Removed text-center, let Card handle it */}
//         <CardDescription className="text-sm text-red-300/90">
//           {" "}
//           {/* Removed text-center */}
//           {error}
//         </CardDescription>
//         <button
//           onClick={fetchData}
//           className="px-6 py-3 text-mainheadingWhite cursor-pointer flex items-center bg-secondarybox rounded-full"
//         >
//           <RefreshCw className="w-4 h-4 mr-2" />
//           Try Again
//         </button>
//       </Card>
//     );
//   }

//   if (chartData.length === 0) {
//     return (
//       <div className="py-10">
//         <div className="bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-3 flex flex-col justify-center items-center">
//           <div className="lg:size-16 size-14 flex items-center justify-center bg-primary rounded-full">
//             <Info className="lg:size-8 size-6 mx-auto text-subheading" />
//           </div>

//           <h1 className="lg:text-3xl md:text-2xl text-xl font-medium text-mainheadingWhite max-w-xl">
//             No Balance Data
//           </h1>

//           <p className="sm:text-lg text-base text-subheadingWhite">
//             There are currently no calculated account balances to display.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Card className="xl:w-1/4 w-full dark:bg-primarybox sm:order-2 order-1 p-4 rounded-xl shadow-none relative overflow-hidden">
//       <CardHeader className="flex justify-between flex-wrap gap-3">
//         {/* Icon and Title */}
//         <div className="flex items-start gap-3">

//           <div className="size-12 shrink-0 bg-secondarybox rounded-full flex items-center justify-center">
//             <FaWallet className="size-6 text-primary" />
//           </div>

//           <div>
//             <CardTitle className="text-lg font-semibold text-mainheadingWhite">
//               Account Balances
//             </CardTitle>

//             {/* Description */}
//             <CardDescription className="text-xs text-subheadingWhite max-w-68">
//               Net calculated balances (Completed Add Money - Completed Send
//               Money) by currency.
//             </CardDescription>
//           </div>
//         </div>

//         {/* Total Net Balance */}
//         <div className="mt-3">
//           <p className="text-xs text-mainheadingWhite">
//             Total Net Balance
//           </p>

//           <p className="text-2xl font-bold text-primary">
//             {formatCurrency(totalOverallBalance)}
//           </p>
//         </div>
//       </CardHeader>

//       {/* Chart Area */}
//       <CardContent className="flex-1 pb-0 pt-5">
//         <ChartContainer
//           config={chartConfig}
//           className="w-full" // This height is matched in the skeleton
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{
//                 top: 5,
//                 right: 5,
//                 left: -10,
//                 bottom: 0,
//               }}
//               barCategoryGap="20%"
//             >
//               <CartesianGrid
//                 vertical={false}
//                 strokeDasharray="3 3"
//                 stroke="hsl(var(--border))"
//                 opacity={0.5}
//               />
//               <XAxis
//                 dataKey="currencyCode"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 fontSize={10}
//                 stroke="hsl(var(--muted-foreground))"
//                 interval={0}
//               />
//               <YAxis
//                 tickFormatter={formatYAxisTick}
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 fontSize={10}
//                 stroke="hsl(var(--muted-foreground))"
//                 domain={["auto", "auto"]}
//               />
//               <ShadcnChartTooltip
//                 cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
//                 content={
//                   <ShadcnChartTooltipContent
//                     formatter={(value, name, props) => {
//                       const currencyLabel = props.payload?.currencyName
//                         ? `${props.payload.currencyName} (${props.payload.currencyCode})`
//                         : props.payload?.currencyCode;
//                       return [formatCurrency(value as number), currencyLabel];
//                     }}
//                     indicator="dot"
//                     className="bg-primarybox/95 text-white backdrop-blur-sm"
//                   />
//                 }
//               />
//               <Bar
//                 dataKey="totalBalance"
//                 radius={[4, 4, 0, 0]}
//                 barSize={barSize}
//               >
//                 {chartData.map((entry) => (
//                   <Cell key={`cell-${entry.currencyCode}`} fill={entry.fill} />
//                 ))}
//                 {/* Optional: Add labels on top of bars if desired */}
//                 {/* <LabelList dataKey="totalBalance" position="top" formatter={(value:number) => formatCurrency(value, false)} fontSize={9} fill="hsl(var(--muted-foreground))" /> */}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//       {/* Footer Text */}

//       <CardFooter className="text-xs flex justify-center">
//         <p className="text-subheadingWhite text-sm">
//           Showing balances for active currencies.
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Cell,
//   LabelList, // Added LabelList for optional labels on bars
// } from "recharts";
// import { AlertCircle, RefreshCw, Info, BarChart2 } from "lucide-react"; // BarChart2 is not used

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip as ShadcnChartTooltip,
//   ChartTooltipContent as ShadcnChartTooltipContent,
// } from "@/components/ui/chart";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button"; // Button is used in error state but not directly in skeleton
// import statsAdminService, {
//   BalanceDistributionDataPoint,
// } from "../../../services/admin/stats.admin";
// import { FaWallet } from "react-icons/fa6";

// const PREDEFINED_COLORS_HSL = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
//   "hsl(var(--chart-4))",
//   "hsl(var(--chart-5))",
//   "hsl(var(--chart-6))",
//   "hsl(var(--chart-7))",
//   "hsl(var(--chart-8))",
// ];

// // Helper to format currency values
// const formatCurrency = (
//   value: number | undefined | null,
//   showDollarSign = true
// ) => {
//   if (value === undefined || value === null || isNaN(value)) return "N/A";
//   return `${showDollarSign ? "$" : ""}${value.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// };

// // Helper for Y-axis tick formatting
// const formatYAxisTick = (value: number) => {
//   if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
//   if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}K`;
//   return `${value}`;
// };

// export default function BalanceDistributionChart() {
//   const [chartData, setChartData] = useState<BalanceDistributionDataPoint[]>(
//     []
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate a network delay for better skeleton visualization
//       // await new Promise(resolve => setTimeout(resolve, 1500));

//       const data = await statsAdminService.getAdminBalanceDistribution();
//       const dataWithColors = data.map((item, index) => ({
//         ...item,
//         fill: PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length],
//       }));
//       setChartData(dataWithColors);
//     } catch (err: any) {
//       setError(err.message || "Failed to load balance distribution data.");
//       console.error("Error fetching balance distribution:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const chartConfig = useMemo(() => {
//     const config: ChartConfig = {
//       totalBalance: {
//         label: "Balance",
//       },
//     };
//     chartData.forEach((item) => {
//       config[item.currencyCode] = {
//         label: item.currencyName || item.currencyCode,
//         color: item.fill,
//       };
//     });
//     return config;
//   }, [chartData]);

//   const totalOverallBalance = useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.totalBalance, 0);
//   }, [chartData]);

//   const barSize = useMemo(() => {
//     const numBars = chartData.length;
//     if (numBars === 0) return 20;
//     const baseSize = 60;
//     const minSize = 15;
//     const maxSize = 80;
//     const calculatedSize = Math.max(minSize, baseSize - numBars * 5);
//     return Math.min(maxSize, calculatedSize);
//   }, [chartData.length]);

//   if (loading) {
//     return (
//       <Card className="flex flex-col xl:w-1/4 w-full sm:order-2 order-1 bg-primarybox p-4 rounded-xl shadow-none relative overflow-hidden">
//         <CardHeader className="flex justify-between flex-wrap gap-3">
//           {/* Block 1: Icon and Title/Description */}
//           <div className="flex items-start gap-3">
//             <Skeleton className="size-12 shrink-0 rounded-full bg-background/50" />{" "}
//             {/* Icon */}
//             <div>
//               <Skeleton className="h-5 w-48 rounded-md bg-background/50" />{" "}
//               {/* Title (text-lg is ~18px, h-5 is 20px) */}
//               <Skeleton className="h-3 w-64 rounded-md bg-background/50 mt-2" />{" "}
//               {/* Description (text-xs is ~12px, h-3 is 12px) */}
//             </div>
//           </div>

//           {/* Block 2: Total Net Balance (mirrors the div className="mt-3" from final card) */}
//           <div className="mt-3 w-full">
//             {" "}
//             {/* This div takes full width when wrapped, common for flex-wrap */}
//             <Skeleton className="h-3 w-28 rounded-md bg-background/50" />{" "}
//             {/* Label (text-xs is ~12px) */}
//             <Skeleton className="h-6 w-40 rounded-md bg-background/50 mt-1" />{" "}
//             {/* Value (text-2xl is ~24px, h-6 is 24px) */}
//           </div>
//         </CardHeader>

//         <CardContent className="flex-1 pb-0 pt-5">
//           {" "}
//           {/* Matched pt-5 */}
//           <Skeleton className="w-full h-[180px] rounded-md bg-background/50" />{" "}
//           {/* Adjusted chart height */}
//           {/* X-axis labels approximation */}
//           <div className="flex justify-between mt-2 px-1">
//             {" "}
//             {/* px-1 to mimic potential XAxis offset */}
//             {Array.from({ length: 5 }).map(
//               (
//                 _,
//                 i // Assuming around 5 visible ticks
//               ) => (
//                 <Skeleton
//                   key={i}
//                   className="h-3 w-8 rounded-md bg-background/50"
//                 />
//               )
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="flex justify-center pt-4">
//           {" "}
//           {/* Added pt-4 for spacing */}
//           {/* Footer text (text-sm is ~14px, h-4 is 16px) */}
//           <Skeleton className="h-4 w-2/3 rounded-md bg-background/50" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="flex flex-col items-center space-y-3 justify-center sm:order-2 order-1 xl:w-1/4 w-full p-6 bg-primarybox text-center">
//         <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
//           <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
//         </div>
//         <CardTitle className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
//           Loading Failed
//         </CardTitle>
//         <CardDescription className="text-sm text-red-300/90">
//           {error}
//         </CardDescription>
//         <button
//           onClick={fetchData}
//           className="px-6 py-3 text-mainheadingWhite cursor-pointer flex items-center bg-secondarybox rounded-full"
//         >
//           <RefreshCw className="w-4 h-4 mr-2" />
//           Try Again
//         </button>
//       </Card>
//     );
//   }

//   if (chartData.length === 0) {
//     return (
//       <div className="py-10">
//         <div className="bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-3 flex flex-col justify-center items-center">
//           <div className="lg:size-16 size-14 flex items-center justify-center bg-primary rounded-full">
//             <Info className="lg:size-8 size-6 mx-auto text-subheading" />
//           </div>
//           <h1 className="lg:text-3xl md:text-2xl text-xl font-medium text-mainheadingWhite max-w-xl">
//             No Balance Data
//           </h1>
//           <p className="sm:text-lg text-base text-subheadingWhite">
//             There are currently no calculated account balances to display.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Card className="xl:w-1/4 w-full dark:bg-primarybox sm:order-2 order-1 p-4 rounded-xl shadow-none relative overflow-hidden">
//       <CardHeader className="flex justify-between flex-wrap gap-3">
//         {/* Icon and Title */}
//         <div className="flex items-start gap-3">
//           <div className="size-12 shrink-0 bg-secondarybox rounded-full flex items-center justify-center">
//             <FaWallet className="size-6 text-primary" />
//           </div>
//           <div>
//             <CardTitle className="text-lg font-semibold text-mainheadingWhite">
//               Account Balances
//             </CardTitle>
//             <CardDescription className="text-xs text-subheadingWhite max-w-68">
//               Net calculated balances (Completed Add Money - Completed Send
//               Money) by currency.
//             </CardDescription>
//           </div>
//         </div>

//         {/* Total Net Balance */}
//         <div className="mt-3">
//           <p className="text-xs text-mainheadingWhite">Total Net Balance</p>
//           <p className="text-2xl font-bold text-primary">
//             {formatCurrency(totalOverallBalance)}
//           </p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 pb-0 pt-5">
//         <ChartContainer config={chartConfig} className="w-full">
//           <ResponsiveContainer width="100%" height={180}>
//             {" "}
//             {/* Explicit height for consistency, adjust as needed */}
//             <BarChart
//               data={chartData}
//               margin={{
//                 top: 5,
//                 right: 5,
//                 left: -10, // Adjusted for YAxis labels not to be cut off
//                 bottom: 0,
//               }}
//               barCategoryGap="20%"
//             >
//               <CartesianGrid
//                 vertical={false}
//                 strokeDasharray="3 3"
//                 stroke="hsl(var(--border))"
//                 opacity={0.5}
//               />
//               <XAxis
//                 dataKey="currencyCode"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 fontSize={10}
//                 stroke="hsl(var(--muted-foreground))"
//                 interval={0}
//               />
//               <YAxis
//                 tickFormatter={formatYAxisTick}
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 fontSize={10}
//                 stroke="hsl(var(--muted-foreground))"
//                 domain={["auto", "auto"]}
//               />
//               <ShadcnChartTooltip
//                 cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
//                 content={
//                   <ShadcnChartTooltipContent
//                     formatter={(value, name, props) => {
//                       const currencyLabel = props.payload?.currencyName
//                         ? `${props.payload.currencyName} (${props.payload.currencyCode})`
//                         : props.payload?.currencyCode;
//                       return [formatCurrency(value as number), currencyLabel];
//                     }}
//                     indicator="dot"
//                     className="bg-primarybox/95 text-white backdrop-blur-sm"
//                   />
//                 }
//               />
//               <Bar
//                 dataKey="totalBalance"
//                 radius={[4, 4, 0, 0]}
//                 barSize={barSize}
//               >
//                 {chartData.map((entry) => (
//                   <Cell key={`cell-${entry.currencyCode}`} fill={entry.fill} />
//                 ))}
//                 {/* <LabelList dataKey="totalBalance" position="top" formatter={(value:number) => formatCurrency(value, false)} fontSize={9} fill="hsl(var(--muted-foreground))" /> */}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>

//       <CardFooter className="text-xs flex justify-center pt-4">
//         {" "}
//         {/* Added pt-4 for spacing consistency with skeleton */}
//         <p className="text-subheadingWhite text-sm">
//           Showing balances for active currencies.
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList, // Added LabelList for optional labels on bars
} from "recharts";
import { AlertCircle, RefreshCw, Info, BarChart2 } from "lucide-react"; // BarChart2 is not used

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip as ShadcnChartTooltip,
  ChartTooltipContent as ShadcnChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Button is used in error state but not directly in skeleton
import statsAdminService, {
  BalanceDistributionDataPoint,
} from "../../../services/admin/stats.admin";
import { FaWallet } from "react-icons/fa6";

const PREDEFINED_COLORS_HSL = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

// Helper to format currency values
const formatCurrency = (
  value: number | undefined | null,
  showDollarSign = true
) => {
  if (value === undefined || value === null || isNaN(value)) return "N/A";
  return `${showDollarSign ? "$" : ""}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Helper for Y-axis tick formatting
const formatYAxisTick = (value: number) => {
  if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return `${value}`;
};

export default function BalanceDistributionChart() {
  const [chartData, setChartData] = useState<BalanceDistributionDataPoint[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate a network delay for better skeleton visualization
      // await new Promise(resolve => setTimeout(resolve, 1500));

      const data = await statsAdminService.getAdminBalanceDistribution();
      const dataWithColors = data.map((item, index) => ({
        ...item,
        fill: PREDEFINED_COLORS_HSL[index % PREDEFINED_COLORS_HSL.length],
      }));
      setChartData(dataWithColors);
    } catch (err: any) {
      setError(err.message || "Failed to load balance distribution data.");
      console.error("Error fetching balance distribution:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      totalBalance: {
        label: "Balance",
      },
    };
    chartData.forEach((item) => {
      config[item.currencyCode] = {
        label: item.currencyName || item.currencyCode,
        color: item.fill,
      };
    });
    return config;
  }, [chartData]);

  const totalOverallBalance = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalBalance, 0);
  }, [chartData]);

  const barSize = useMemo(() => {
    const numBars = chartData.length;
    if (numBars === 0) return 20;
    const baseSize = 60;
    const minSize = 15;
    const maxSize = 80;
    const calculatedSize = Math.max(minSize, baseSize - numBars * 5);
    return Math.min(maxSize, calculatedSize);
  }, [chartData.length]);

  if (loading) {
    return (
      <Card className="flex flex-col xl:w-1/4 w-full sm:order-2 order-1 bg-primarybox p-4 rounded-xl shadow-none relative overflow-hidden">
        <CardHeader className="flex justify-between flex-wrap gap-3">
          {/* Block 1: Icon and Title/Description */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-12 shrink-0 rounded-full bg-background/50" />{" "}
            {/* Icon */}
            <div>
              <Skeleton className="h-5 w-48 rounded-md bg-background/50" />{" "}
              {/* Title (text-lg is ~18px, h-5 is 20px) */}
              <Skeleton className="h-3 w-64 rounded-md bg-background/50 mt-2" />{" "}
              {/* Description (text-xs is ~12px, h-3 is 12px) */}
            </div>
          </div>

          {/* Block 2: Total Net Balance (mirrors the div className="mt-3" from final card) */}
          <div className="mt-3 w-full">
            {" "}
            {/* This div takes full width when wrapped, common for flex-wrap */}
            <Skeleton className="h-3 w-28 rounded-md bg-background/50" />{" "}
            {/* Label (text-xs is ~12px) */}
            <Skeleton className="h-6 w-40 rounded-md bg-background/50 mt-1" />{" "}
            {/* Value (text-2xl is ~24px, h-6 is 24px) */}
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-0 pt-4">
          {" "}
          {/* Matched pt-5 */}
          <Skeleton className="w-full h-[180px] rounded-md bg-background/50" />{" "}
          {/* Adjusted chart height */}
          {/* X-axis labels approximation */}
          <div className="flex justify-between mt-4 px-1">
            {" "}
            {/* px-1 to mimic potential XAxis offset */}
            {Array.from({ length: 6 }).map(
              (
                _,
                i // Assuming around 5 visible ticks
              ) => (
                <Skeleton
                  key={i}
                  className="h-3 sm:w-12 w-10 rounded-md bg-background/50"
                />
              )
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-4">
          {" "}
          {/* Added pt-4 for spacing */}
          {/* Footer text (text-sm is ~14px, h-4 is 16px) */}
          <Skeleton className="h-4 w-2/3 rounded-md bg-background/50" />
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center space-y-3 justify-center sm:order-2 order-1 xl:w-1/4 w-full p-6 bg-primarybox text-center">
        <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
          <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
        </div>
        <CardTitle className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
          Loading Failed
        </CardTitle>
        <CardDescription className="text-sm text-red-300/90">
          {error}
        </CardDescription>
        <button
          onClick={fetchData}
          className="px-6 py-3 text-mainheadingWhite cursor-pointer flex items-center bg-secondarybox  hover:bg-secondaryboxhover transition-all ease-linear duration-75 rounded-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="py-10">
        <div className="bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-3 flex flex-col justify-center items-center">
          <div className="lg:size-16 size-14 flex items-center justify-center bg-primary rounded-full">
            <Info className="lg:size-8 size-6 mx-auto text-subheading" />
          </div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-medium text-mainheadingWhite max-w-xl">
            No Balance Data
          </h1>
          <p className="sm:text-lg text-base text-subheadingWhite">
            There are currently no calculated account balances to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="xl:w-1/4 w-full bg-primarybox sm:order-2 order-1 p-4 rounded-xl shadow-none relative overflow-hidden">
      <CardHeader className="flex justify-between flex-wrap gap-3">
        {/* Icon and Title */}
        <div className="flex items-start gap-3">
          <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
            <FaWallet className="size-6 text-mainheading" />
          </div>

          <div>
            <CardTitle className="text-lg font-semibold text-mainheadingWhite">
              Account Balances
            </CardTitle>
            <CardDescription className="text-xs text-subheadingWhite max-w-68">
              Net calculated balances (Completed Add Money - Completed Send
              Money) by currency.
            </CardDescription>
          </div>
        </div>

        {/* Total Net Balance */}
        <div className="mt-3">
          <p className="text-xs text-mainheadingWhite">Total Net Balance</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalOverallBalance)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0 pt-5">
        <ChartContainer config={chartConfig} className="w-full">
          {/* Explicit height for consistency, adjust as needed */}
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: -10, // Adjusted for YAxis labels not to be cut off
                bottom: 0,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.5}
              />
              <XAxis
                dataKey="currencyCode"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
                stroke="hsl(var(--muted-foreground))"
                interval={0}
              />
              <YAxis
                tickFormatter={formatYAxisTick}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
                stroke="hsl(var(--muted-foreground))"
                domain={["auto", "auto"]}
              />
              <ShadcnChartTooltip
                cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
                content={
                  <ShadcnChartTooltipContent
                    formatter={(value, name, props) => {
                      const currencyLabel = props.payload?.currencyName
                        ? `${props.payload.currencyName} (${props.payload.currencyCode})`
                        : props.payload?.currencyCode;
                      return [formatCurrency(value as number), currencyLabel];
                    }}
                    indicator="dot"
                    className="bg-primarybox/95 text-white backdrop-blur-sm"
                  />
                }
              />
              <Bar
                dataKey="totalBalance"
                radius={[4, 4, 0, 0]}
                barSize={barSize}
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.currencyCode}`} fill={entry.fill} />
                ))}
                {/* <LabelList dataKey="totalBalance" position="top" formatter={(value:number) => formatCurrency(value, false)} fontSize={9} fill="hsl(var(--muted-foreground))" /> */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="text-xs flex justify-center pt-4">
        {" "}
        {/* Added pt-4 for spacing consistency with skeleton */}
        <p className="text-subheadingWhite text-sm">
          Showing balances for active currencies.
        </p>
      </CardFooter>
    </Card>
  );
}
