// // frontend/src/app/admin/page.tsx
// export default function AdminHomePage() {
//   return (
//     <div className="p-4">
//       <h2 className="lg:text-2xl mb-4 font-medium text-main">
//         Admin Dashboard Home
//       </h2>
//       <p className="text-gray lg:text-lg text-sm leading-relaxed">
//         Welcome to the admin panel! Here you can manage currencies, users, and
//         other aspects of the application.
//       </p>
//       {/* Add more admin dashboard content here */}
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="bg-white shadow border border-gray-300 rounded-lg p-4">
//           <h3 className="font-medium text-gray mb-2.5">Total Users</h3>
//           <p className="text-xl text-main font-bold text-end">150</p>
//         </div>
//         <div className="bg-white shadow border border-gray-300 rounded-lg p-4">
//           <h3 className="font-medium text-gray mb-2.5">Total Currencies</h3>
//           <p className="text-xl text-main font-bold text-end">45</p>
//         </div>
//         <div className="bg-white shadow border border-gray-300 rounded-lg p-4">
//           <h3 className="font-medium text-gray mb-2.5">
//             Transactions Today
//           </h3>
//           <p className="text-xl text-main font-bold text-end">32</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// import {
//   Activity,
//   Users,
//   Globe,
//   TrendingUp,
//   BarChart2,
//   Settings,
//   Bell,
//   Search,
// } from "lucide-react";
// import Link from "next/link";

// export default function AdminHomePage() {
//   return (
//     <section className="Admin-Dashboard py-3">
//       <div className="container mx-auto px-4">
//         {/* Main dashboard content */}
//         <div className="">
//           <div className="mb-8">
//             <h2 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Admin Dashboard Home
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg leading-relaxed">
//               Welcome to the admin panel! Here you can manage currencies, users,
//               and other aspects of the application.
//             </p>
//           </div>

//           {/* Stats cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Total Users
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     150
//                   </h3>
//                   <p className="text-sm text-green-600 flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     <span>+12% this week</span>
//                   </p>
//                 </div>
//                 <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-lg">
//                   <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 </div>

//               </div>
//             </div>

//             <div className="bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Today's Add Money
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     32
//                   </h3>
//                   <p className="text-sm text-yellow-600 flex items-center mt-2">
//                     <Activity className="h-4 w-4 mr-1" />
//                     <span>-5% from yesterday</span>
//                   </p>
//                 </div>
//                 <div className="bg-yellow-100 dark:bg-yellow-600/20 p-3 rounded-lg">
//                   <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Today's Send Money
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     98%
//                   </h3>
//                   <p className="text-sm text-green-600 flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     <span>All systems operational</span>
//                   </p>
//                 </div>
//                 <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-lg">
//                   <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Completed Transfers
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     45
//                   </h3>
//                   <p className="text-sm text-green-600 flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     <span>+3 this month</span>
//                   </p>
//                 </div>
//                 <div className="bg-purple-100 dark:bg-purple-600/20 p-3 rounded-lg">
//                   <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Recent activity and quick actions */}
//           <div className="flex lg:flex-row flex-col gap-6">
//             {/* Recent activity */}
//             <div className="lg:w-2/3 w-full bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm border">
//               <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
//                 Recent Activity
//               </h3>
//               <div className="space-y-4">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-start border-b pb-3"
//                   >
//                     <div className="h-10 w-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
//                       <span className="text-neutral-900 font-medium">{item}</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="font-medium text-neutral-900 dark:text-white">
//                         New user registered:{" "}
//                         {item === 1
//                           ? "Sarah Johnson"
//                           : item === 2
//                           ? "Michael Lee"
//                           : item === 3
//                           ? "David Chen"
//                           : "Emma Wilson"}
//                       </p>
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                         {item} hour{item !== 1 ? "s" : ""} ago
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                 View all activity →
//               </button>
//             </div>

//             {/* Quick actions */}
//             <div className="lg:w-1/3 w-full bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm border">
//               <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
//                 Quick Actions
//               </h3>
//               <div className="space-y-3 flex flex-col justify-between h-[calc(100%-47.97px)]">
//                 <button className="w-full text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">Add New User</span>
//                   <Users className="h-5 w-5" />
//                 </button>
//                 <button className="w-full text-purple-600 bg-purple-100 dark:bg-purple-600/20 dark:text-purple-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">Add Currency</span>
//                   <Globe className="h-5 w-5" />
//                 </button>
//                 <button className="w-full text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">View Transactions</span>
//                   <Activity className="h-5 w-5" />
//                 </button>
//                 <button className="w-full text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">System Settings</span>
//                   <Settings className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import {
//   Activity,
//   Users,
//   Globe,
//   TrendingUp,
//   BarChart2,
//   Settings,
//   Bell,
//   Search,
//   AlertTriangle,
//   Download,
//   DollarSign,
//   Shield,
//   PieChart,
//   Clock,
//   MapPin,
//   Flag,
//   BarChart,
//   ArrowUpRight,
//   ArrowDownRight,
//   CreditCard,
//   RefreshCw,
// } from "lucide-react";
// import Link from "next/link";

// export default function AdminHomePage() {
//   return (
//     <section className="Admin-Dashboard py-3">
//       <div className="container mx-auto px-4">
//         {/* Main dashboard content */}
//         <div className="">
//           <div className="mb-8">
//             <h2 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Admin Dashboard Home
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg leading-relaxed">
//               Welcome to the admin panel! Here you can manage currencies, users,
//               transfers, and other aspects of the money transfer platform.
//             </p>
//           </div>

//           {/* Stats cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Total Users
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     150
//                   </h3>
//                   <p className="text-sm text-green-600 flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     <span>+12% this week</span>
//                   </p>
//                 </div>
//                 <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-lg">
//                   <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Today's Add Money
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     32
//                   </h3>
//                   <p className="text-sm text-yellow-600 flex items-center mt-2">
//                     <Activity className="h-4 w-4 mr-1" />
//                     <span>-5% from yesterday</span>
//                   </p>
//                 </div>
//                 <div className="bg-yellow-100 dark:bg-yellow-600/20 p-3 rounded-lg">
//                   <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Today's Send Money
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     98%
//                   </h3>
//                   <p className="text-sm text-green-600 flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     <span>All systems operational</span>
//                   </p>
//                 </div>
//                 <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-lg">
//                   <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Completed Transfers
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-300 mt-1">
//                     45
//                   </h3>
//                   <p className="text-sm text-green-600 flex items-center mt-2">
//                     <TrendingUp className="h-4 w-4 mr-1" />
//                     <span>+3 this month</span>
//                   </p>
//                 </div>
//                 <div className="bg-purple-100 dark:bg-purple-600/20 p-3 rounded-lg">
//                   <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Transfer Insights */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//               Transfer Insights
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Transfer Volume */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Transfer Volume
//                   </h4>
//                   <DollarSign className="h-5 w-5 text-green-500" />
//                 </div>
//                 <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
//                   <BarChart className="h-24 w-24 text-gray-400" />
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-300">
//                       Total Volume
//                     </p>
//                     <p className="text-lg font-semibold text-neutral-900 dark:text-white">
//                       $1,245,678
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-300">
//                       Growth
//                     </p>
//                     <p className="text-lg font-semibold text-green-600 flex items-center">
//                       <ArrowUpRight className="h-4 w-4 mr-1" />
//                       15.2%
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Popular Corridors */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Popular Corridors
//                   </h4>
//                   <MapPin className="h-5 w-5 text-blue-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
//                         <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
//                           US
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                           US → Mexico
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           USD to MXN
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       32%
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
//                         <span className="text-xs font-medium text-green-600 dark:text-green-400">
//                           UK
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                           UK → India
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           GBP to INR
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       24%
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center mr-2">
//                         <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
//                           CA
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                           Canada → Philippines
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           CAD to PHP
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       18%
//                     </p>
//                   </div>
//                 </div>
//                 <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                   View all corridors →
//                 </button>
//               </div>

//               {/* Currency Performance */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Currency Performance
//                   </h4>
//                   <RefreshCw className="h-5 w-5 text-purple-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
//                         <span className="text-xs font-medium text-green-600 dark:text-green-400">
//                           USD
//                         </span>
//                       </div>
//                       <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                         US Dollar
//                       </p>
//                     </div>
//                     <p className="text-sm font-semibold text-green-600 flex items-center">
//                       <ArrowUpRight className="h-4 w-4 mr-1" />
//                       1.2%
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
//                         <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
//                           EUR
//                         </span>
//                       </div>
//                       <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                         Euro
//                       </p>
//                     </div>
//                     <p className="text-sm font-semibold text-red-500 flex items-center">
//                       <ArrowDownRight className="h-4 w-4 mr-1" />
//                       0.5%
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center mr-2">
//                         <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
//                           GBP
//                         </span>
//                       </div>
//                       <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                         British Pound
//                       </p>
//                     </div>
//                     <p className="text-sm font-semibold text-green-600 flex items-center">
//                       <ArrowUpRight className="h-4 w-4 mr-1" />
//                       0.8%
//                     </p>
//                   </div>
//                 </div>
//                 <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                   Currency management →
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Recent activity and quick actions */}
//           <div className="flex lg:flex-row flex-col gap-6 mb-8">
//             {/* Recent activity */}
//             <div className="lg:w-2/3 w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//               <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
//                 Recent Activity
//               </h3>
//               <div className="space-y-4">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div key={item} className="flex items-start border-b pb-3">
//                     <div className="h-10 w-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
//                       <span className="text-neutral-900 font-medium">
//                         {item}
//                       </span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="font-medium text-neutral-900 dark:text-white">
//                         New user registered:{" "}
//                         {item === 1
//                           ? "Sarah Johnson"
//                           : item === 2
//                           ? "Michael Lee"
//                           : item === 3
//                           ? "David Chen"
//                           : "Emma Wilson"}
//                       </p>
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                         {item} hour{item !== 1 ? "s" : ""} ago
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                 View all activity →
//               </button>
//             </div>

//             {/* Quick actions */}
//             <div className="lg:w-1/3 w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//               <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
//                 Quick Actions
//               </h3>
//               <div className="space-y-3 flex flex-col justify-between h-[calc(100%-47.97px)]">
//                 <button className="w-full text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">Add New User</span>
//                   <Users className="h-5 w-5" />
//                 </button>
//                 <button className="w-full text-purple-600 bg-purple-100 dark:bg-purple-600/20 dark:text-purple-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">Add Currency</span>
//                   <Globe className="h-5 w-5" />
//                 </button>
//                 <button className="w-full text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">View Transactions</span>
//                   <Activity className="h-5 w-5" />
//                 </button>
//                 <button className="w-full text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400 py-3 px-4 rounded-lg flex items-center justify-between transition-colors">
//                   <span className="font-medium">System Settings</span>
//                   <Settings className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Risk Monitoring & Compliance */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//               Risk Monitoring & Compliance
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Pending Verifications */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Pending Verifications
//                   </h4>
//                   <Shield className="h-5 w-5 text-yellow-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       KYC Verifications
//                     </p>
//                     <div className="flex items-center">
//                       <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                         12
//                       </p>
//                       <div className="ml-2 h-2 w-2 rounded-full bg-yellow-500"></div>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       Business Documents
//                     </p>
//                     <div className="flex items-center">
//                       <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                         8
//                       </p>
//                       <div className="ml-2 h-2 w-2 rounded-full bg-red-500"></div>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       Address Verifications
//                     </p>
//                     <div className="flex items-center">
//                       <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                         5
//                       </p>
//                       <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                   Process verifications →
//                 </button>
//               </div>

//               {/* Security Alerts */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Security Alerts
//                   </h4>
//                   <AlertTriangle className="h-5 w-5 text-red-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
//                     <p className="text-sm font-medium text-red-700 dark:text-red-400">
//                       Multiple failed login attempts (3)
//                     </p>
//                     <p className="text-xs text-red-600 dark:text-red-300 mt-1">
//                       User ID: 45892 • 25 minutes ago
//                     </p>
//                   </div>
//                   <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
//                     <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
//                       Unusual transfer pattern detected
//                     </p>
//                     <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
//                       Transfer ID: TR-78523 • 1 hour ago
//                     </p>
//                   </div>
//                 </div>
//                 <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                   Review all alerts →
//                 </button>
//               </div>

//               {/* AML Compliance */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     AML Compliance
//                   </h4>
//                   <Flag className="h-5 w-5 text-blue-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       Suspicious Activity Reports
//                     </p>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       3 pending
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       Watchlist Matches
//                     </p>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       2 new
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       Transaction Monitoring
//                     </p>
//                     <p className="text-sm font-semibold text-green-600">
//                       All clear
//                     </p>
//                   </div>
//                 </div>
//                 <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                   Compliance dashboard →
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Payment Methods & Settlement */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//               Payment Methods & Settlement
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Payment Methods */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Payment Methods
//                   </h4>
//                   <CreditCard className="h-5 w-5 text-indigo-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
//                         <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                           Credit/Debit Cards
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           Success rate: 98.2%
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       45%
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
//                         <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                           Bank Transfers
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           Success rate: 99.7%
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       35%
//                     </p>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center mr-2">
//                         <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                           Digital Wallets
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-300">
//                           Success rate: 97.5%
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                       20%
//                     </p>
//                   </div>
//                 </div>
//                 <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                   Configure payment methods →
//                 </button>
//               </div>

//               {/* Settlement Status */}
//               <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//                 <div className="flex justify-between items-center mb-4">
//                   <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                     Settlement Status
//                   </h4>
//                   <Clock className="h-5 w-5 text-green-500" />
//                 </div>
//                 <div className="space-y-3">
//                   <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//                     <div className="flex justify-between">
//                       <p className="text-sm font-medium text-green-700 dark:text-green-400">
//                         EUR → GBP Settlement
//                       </p>
//                       <p className="text-sm font-medium text-green-700 dark:text-green-400">
//                         €42,500
//                       </p>
//                     </div>
//                     <div className="flex justify-between mt-1">
//                       <p className="text-xs text-green-600 dark:text-green-300">
//                         Completed • Today
//                       </p>
//                       <p className="text-xs text-green-600 dark:text-green-300">
//                         Batch ID: ST7892
//                       </p>
//                     </div>
//                   </div>
//                   <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//                     <div className="flex justify-between">
//                       <p className="text-sm font-medium text-green-700 dark:text-green-400">
//                         EUR → GBP Settlement
//                       </p>
//                       <p className="text-sm font-medium text-green-700 dark:text-green-400">
//                         €42,500
//                       </p>
//                     </div>
//                     <div className="flex justify-between mt-1">
//                       <p className="text-xs text-green-600 dark:text-green-300">
//                         Completed • Today
//                       </p>
//                       <p className="text-xs text-green-600 dark:text-green-300">
//                         Batch ID: ST7892
//                       </p>
//                     </div>
//                   </div>
//                   <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//                     <div className="flex justify-between">
//                       <p className="text-sm font-medium text-green-700 dark:text-green-400">
//                         EUR → GBP Settlement
//                       </p>
//                       <p className="text-sm font-medium text-green-700 dark:text-green-400">
//                         €42,500
//                       </p>
//                     </div>
//                     <div className="flex justify-between mt-1">
//                       <p className="text-xs text-green-600 dark:text-green-300">
//                         Completed • Today
//                       </p>
//                       <p className="text-xs text-green-600 dark:text-green-300">
//                         Batch ID: ST7892
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // frontend/src/app/admin/page.tsx
// "use client"; // <-- ADDED: This page now needs hooks for data fetching

// import React from "react"; // <-- ADDED hooks
// // Import the new components
// import StatsCards from "./components/DashboardSection/StatsCards"; // Adjust path as needed
// import TransferInsights from "./components/DashboardSection/TransferInsights"; // Adjust path as needed
// import RecentActivity from "./components/DashboardSection/RecentActivity"; // Adjust path as needed
// // --- ADD Chart Imports ---
// import PaymentsVolumeChart from "./components/DashboardSection/PaymentsVolumeChart";
// import TransfersVolumeChart from "./components/DashboardSection/TransfersVolumeChart";
// // --- END Chart Imports ---

// export default function AdminHomePage() {
//   return (
//     <section className="Admin-Dashboard py-5">
//       <div className="container mx-auto px-4">
//         {/* Main dashboard content */}
//         <div className="overflow-y-auto">
//           <div className="mb-8">
//             <h2 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//               Admin Dashboard Home
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg leading-relaxed">
//               Welcome to the admin panel! Here you can manage currencies, users,
//               transfers, and other aspects of the money transfer platform.
//             </p>
//           </div>

//           {/* Stats cards Component */}
//           <StatsCards />

//           {/* --- ADD Charts Section --- */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <PaymentsVolumeChart />
//             <TransfersVolumeChart />
//           </div>
//           {/* --- END Charts Section --- */}

//           {/* Recent activity and KYC Verifications side-by-side */}
//           <div className="flex lg:flex-row flex-col gap-6 mb-8">
//             <RecentActivity />
//           </div>

//           {/* Transfer Insights Component */}
//           <TransferInsights />

//           {/* Risk Monitoring & Compliance Component */}
//           {/* <RiskAndCompliance /> */}

//           {/* Payment Methods & Settlement Component */}
//           {/* <PaymentAndSettlement /> */}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import React from "react";
import StatsCards from "./components/DashboardSection/StatsCards";
import TransferInsights from "./components/DashboardSection/TransferInsights";
import RecentActivity from "./components/DashboardSection/RecentActivity";
import PaymentsVolumeChart from "./components/DashboardSection/PaymentsVolumeChart";
import TransfersVolumeChart from "./components/DashboardSection/TransfersVolumeChart";
import BalanceDistributionChart from "./components/DashboardSection/BalanceDistributionChart"; // <-- ADD THIS IMPORT
import { FaChartPie } from "react-icons/fa";

export default function AdminHomePage() {
  return (
    <section className="Admin-Dashboard py-5">
      <div className="container mx-auto px-4">
        <div className="overflow-y-auto">
          {/* Admin-Header */}
          <div className="Admin-Header mb-8">
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 shrink-0 bg-primary rounded-full flex items-center justify-center">
                <FaChartPie className="text-mainheading" size={26} />
              </div>  

              <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
                Admin Dashboard Home
              </h1>
            </div>

            <p className="mt-2 text-subheadingWhite text-base lg:text-lg">
              Welcome to your Admin Dashboard – the central hub for managing and
              monitoring your platform. Get a quick overview of key metrics,
              recent activities, user insights, and system performance. From
              here, you can easily navigate to user management, content updates,
              transaction logs, reports, and more.
            </p>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <PaymentsVolumeChart />
            <TransfersVolumeChart />
          </div>

          

          {/* Recent activity and Balance Distribution side-by-side */}
          <div className="flex xl:flex-row order-1 sm:order-2 flex-col gap-6 mb-8">
            {" "}
            {/* Changed to grid */}
            <RecentActivity />
            <BalanceDistributionChart /> {/* <-- ADDED THE NEW CHART */}
          </div>
          
          <TransferInsights />
        </div>
      </div>
    </section>
  );
}
