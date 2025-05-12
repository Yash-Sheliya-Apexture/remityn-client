// import React from 'react';
// import {
//   Shield,
//   AlertTriangle,
//   Flag,
// } from "lucide-react";

// export default function RiskAndCompliance() {
//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
//         Risk Monitoring & Compliance
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Pending Verifications */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Pending Verifications
//             </h4>
//             <Shield className="h-5 w-5 text-yellow-500" />
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 KYC Verifications
//               </p>
//               <div className="flex items-center">
//                 <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                   12
//                 </p>
//                 <div className="ml-2 h-2 w-2 rounded-full bg-yellow-500"></div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 Business Documents
//               </p>
//               <div className="flex items-center">
//                 <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                   8
//                 </p>
//                 <div className="ml-2 h-2 w-2 rounded-full bg-red-500"></div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 Address Verifications
//               </p>
//               <div className="flex items-center">
//                 <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                   5
//                 </p>
//                 <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
//               </div>
//             </div>
//           </div>
//           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//             Process verifications →
//           </button>
//         </div>

//         {/* Security Alerts */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               Security Alerts
//             </h4>
//             <AlertTriangle className="h-5 w-5 text-red-500" />
//           </div>
//           <div className="space-y-3">
//             <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
//               <p className="text-sm font-medium text-red-700 dark:text-red-400">
//                 Multiple failed login attempts (3)
//               </p>
//               <p className="text-xs text-red-600 dark:text-red-300 mt-1">
//                 User ID: 45892 • 25 minutes ago
//               </p>
//             </div>
//             <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
//               <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
//                 Unusual transfer pattern detected
//               </p>
//               <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
//                 Transfer ID: TR-78523 • 1 hour ago
//               </p>
//             </div>
//           </div>
//           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//             Review all alerts →
//           </button>
//         </div>

//         {/* AML Compliance */}
//         <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//               AML Compliance
//             </h4>
//             <Flag className="h-5 w-5 text-blue-500" />
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 Suspicious Activity Reports
//               </p>
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 3 pending
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 Watchlist Matches
//               </p>
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 2 new
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 Transaction Monitoring
//               </p>
//               <p className="text-sm font-semibold text-green-600">
//                 All clear
//               </p>
//             </div>
//           </div>
//           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//             Compliance dashboard →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/DashboardSection/RiskAndCompliance.tsx
"use client"; // <-- Add this

import React from 'react'; // <-- Import hooks
import {
  Shield,
  AlertTriangle,
  Flag,
} from "lucide-react";

export default function RiskAndCompliance() {
    
   return (
        <div className="mb-8">
            {/* Section Title - Remains the same unless you want to change it */}
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Risk Monitoring & Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                

                {/* Security Alerts Card (Remains the same for now) */}
                <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
                        Security Alerts
                        </h4>
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="space-y-3">
                        {/* Placeholder Content */}
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="text-sm font-medium text-red-700 dark:text-red-400">Multiple failed login attempts (3)</p>
                            <p className="text-xs text-red-600 dark:text-red-300 mt-1">User ID: 45892 • 25 minutes ago</p>
                        </div>
                         <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Unusual transfer pattern detected</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">Transfer ID: TR-78523 • 1 hour ago</p>
                        </div>
                    </div>
                    <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
                        Review all alerts →
                    </button>
                </div>

                {/* AML Compliance Card (Remains the same for now) */}
                <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
                        AML Compliance
                        </h4>
                        <Flag className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="space-y-3">
                         {/* Placeholder Content */}
                         <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">Suspicious Activity Reports</p>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">3 pending</p>
                        </div>
                         <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">Watchlist Matches</p>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">2 new</p>
                        </div>
                         <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">Transaction Monitoring</p>
                            <p className="text-sm font-semibold text-green-600">All clear</p>
                        </div>
                    </div>
                    <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
                        Compliance dashboard →
                    </button>
                </div>
            </div>
        </div>
    );
}