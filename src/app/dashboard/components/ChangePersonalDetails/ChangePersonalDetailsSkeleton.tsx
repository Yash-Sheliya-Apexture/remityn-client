// src/app/components/skeletons/ChangePersonalDetailsSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ChangePersonalDetailsSkeleton: React.FC = () => {
  return (
    <section className="Change-Personal-Details-Wrapper">
      <div className="Change-Personal-Information">
        {/* DashboardHeader Skeleton */}
        <div className="mb-6 md:mb-8">
          <Skeleton className="h-8 w-3/4 sm:w-1/2 rounded-md" />
        </div>

        <div className="w-full lg:max-w-xl rounded-lg">
          <div className="space-y-8">
            {/* Personal details Section Skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/3 rounded-md" /> {/* Section Title */}
              <div className="border-b pb-2"></div> {/* Visual separator */}

              {/* First Name Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/4 rounded-md" /> {/* Label */}
                <Skeleton className="h-14 w-full rounded-lg" /> {/* Input */}
              </div>

              {/* Last Name Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/4 rounded-md" /> {/* Label */}
                <Skeleton className="h-14 w-full rounded-lg" /> {/* Input */}
              </div>

              {/* Nationality Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/4 rounded-md" /> {/* Label */}
                <Skeleton className="h-14 w-full rounded-lg" /> {/* Input */}
                <Skeleton className="h-4 w-3/4 rounded-md" /> {/* Description */}
              </div>

              {/* Date of birth Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3 rounded-md" /> {/* Section Title */}
                <div className="border-b pb-2"></div> {/* Visual separator */}
                <div className="flex gap-2 mt-2">
                  <div className="w-1/3 space-y-1">
                    <Skeleton className="h-5 w-1/2 rounded-md" /> {/* Label */}
                    <Skeleton className="h-14 w-full rounded-lg" /> {/* Input */}
                  </div>
                  <div className="w-1/2 space-y-1">
                    <Skeleton className="h-5 w-1/2 rounded-md" /> {/* Label */}
                    <Skeleton className="h-14 w-full rounded-lg" /> {/* Input */}
                  </div>
                  <div className="w-1/3 space-y-1">
                    <Skeleton className="h-5 w-1/2 rounded-md" /> {/* Label */}
                    <Skeleton className="h-14 w-full rounded-lg" /> {/* Input */}
                  </div>
                </div>
                <Skeleton className="h-4 w-full mt-1 rounded-md" /> {/* Description */}
              </div>

              {/* Mobile Number Skeleton */}
              <div className="space-y-2 pt-2">
                <Skeleton className="h-5 w-1/3 rounded-md" /> {/* Label */}
                <Skeleton className="h-14 w-full rounded-lg mt-1" /> {/* Input */}
                <Skeleton className="h-4 w-3/4 mt-1 rounded-md" /> {/* Description */}
              </div>
            </div>

            {/* Additional Information Section Skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-6 w-2/5 rounded-md" /> {/* Section Title */}
              <div className="border-b pb-2"></div> {/* Visual separator */}

              {/* Occupation Combobox Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3 rounded-md" /> {/* Label */}
                <Skeleton className="h-14 w-full rounded-lg" /> {/* Combobox Button */}
              </div>
            </div>

            {/* Save Button Skeleton */}
            <div className="mt-8">
              <Skeleton className="h-12 w-full rounded-full" /> {/* Button */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePersonalDetailsSkeleton;