import React from 'react';
import {
  CreditCard,
  DollarSign,
  Globe,
  Clock,
} from "lucide-react";

export default function PaymentAndSettlement() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
        Payment Methods & Settlement
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
              Payment Methods
            </h4>
            <CreditCard className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
                  <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Credit/Debit Cards
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Success rate: 98.2%
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                45%
              </p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Bank Transfers
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Success rate: 99.7%
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                35%
              </p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center mr-2">
                  <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Digital Wallets
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Success rate: 97.5%
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                20%
              </p>
            </div>
          </div>
          <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
            Configure payment methods →
          </button>
        </div>

        {/* Settlement Status */}
        <div className="bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
              Settlement Status
            </h4>
            <Clock className="h-5 w-5 text-green-500" />
          </div>
          {/* Repeating example content for demonstration */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    { i === 1 ? 'USD → EUR Settlement' : i === 2 ? 'GBP → CAD Settlement' : 'AUD → USD Settlement' }
                  </p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    { i === 1 ? '$55,000' : i === 2 ? '£30,200' : 'A$15,800' }
                  </p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-green-600 dark:text-green-300">
                    Completed • { i === 1 ? 'Today' : i === 2 ? 'Yesterday' : '2 days ago'}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    Batch ID: ST{7890 + i}
                  </p>
                </div>
              </div>
             ))}
          </div>
           <button className="mt-4 text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
             View settlements →
           </button>
        </div>
      </div>
    </div>
  );
}