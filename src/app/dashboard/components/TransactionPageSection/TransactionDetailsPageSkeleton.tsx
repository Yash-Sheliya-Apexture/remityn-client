// frontend/app/dashboard/components/transactionDetails/TransactionDetailsPageSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

const TransactionDetailsPageSkeleton = () => {
  return (
    <section className="Transaction-Detial-Page-Wrapper">
      <div className="Transaction-Detial">
        {/* Main Content Card */}
        <div className="bg-background p-4 rounded-2xl border mx-auto lg:max-w-5xl">
          {/* Card Header Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="md:size-14 size-10 rounded-full flex-shrink-0" />
            <div className="flex-grow flex flex-row justify-between items-center gap-4">
              <div className="flex-grow">
                <Skeleton className="h-5 md:w-40 w-28 mb-2" />
                <Skeleton className="h-4 md:w-58 w-20" />
              </div>
              <div className="shrink-0">
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
            </div>
          </div>

          {/* Tabs Navigation Skeleton */}
          <div className="flex border-b py-4">
            <Skeleton className="h-10 w-26 mr-4 rounded-t-md" />
            {/* Active Tab */}
            <Skeleton className="h-10 w-26 rounded-t-md" /> {/* Inactive Tab */}
          </div>
          {/* Tab Content Area Skeleton (Mimics "Updates" Tab by default) */}
          <div className="py-4">
            {/* Transaction ID / Reference Code Skeleton */}
            <div className="flex items-center mb-6 text-sm gap-2">
              <Skeleton className="h-5 w-24" /> {/* Label */}
              <Skeleton className="h-5 w-40 sm:w-60" /> {/* Value */}
            </div>

            {/* Timeline Skeleton */}
            <div className="space-y-6">
              {[...Array(5)].map(
                (
                  _,
                  index // Assuming 4 timeline steps typical
                ) => (
                  <div key={index} className="flex items-center gap-3">
                    <Skeleton className="size-6 rounded-full flex-shrink-0" />
                    {/* Icon */}
                    <div className="flex-grow">
                      <Skeleton className="h-5 w-3/4 md:w-1/4 mb-1" />{" "}
                      {/* Label */}
                      <Skeleton className="h-3 w-1/3 md:w-24" />{" "}
                      {/* Date/Info */}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="py-4 border-t mt-5 space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-full" />
              <div className="flex  flex-col md:flex-row lg:justify-end gap-3 mt-5">
                <Skeleton className="h-10 md:w-40 rounded-full" />
                <Skeleton className="h-10 md:w-40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionDetailsPageSkeleton;
