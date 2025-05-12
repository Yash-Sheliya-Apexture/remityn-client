import React from 'react';
import {
  Activity,
  Users,
  Globe,
  Settings,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="lg:w-1/3 w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      {/* Adjusted height calculation slightly for robustness */}
      <div className="space-y-3 flex flex-col justify-between h-[calc(100%-48px)]">
        <button className="w-full text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 py-3 px-4 rounded-lg flex items-center justify-between hover:bg-blue-200 dark:hover:bg-blue-600/30 transition-colors">
          <span className="font-medium">Add New User</span>
          <Users className="h-5 w-5" />
        </button>
        <button className="w-full text-purple-600 bg-purple-100 dark:bg-purple-600/20 dark:text-purple-400 py-3 px-4 rounded-lg flex items-center justify-between hover:bg-purple-200 dark:hover:bg-purple-600/30 transition-colors">
          <span className="font-medium">Add Currency</span>
          <Globe className="h-5 w-5" />
        </button>
        <button className="w-full text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400 py-3 px-4 rounded-lg flex items-center justify-between hover:bg-yellow-200 dark:hover:bg-yellow-600/30 transition-colors">
          <span className="font-medium">View Transactions</span>
          <Activity className="h-5 w-5" />
        </button>
        <button className="w-full text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400 py-3 px-4 rounded-lg flex items-center justify-between hover:bg-green-200 dark:hover:bg-green-600/30 transition-colors">
          <span className="font-medium">System Settings</span>
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}