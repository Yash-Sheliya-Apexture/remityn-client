// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// export const InboxSkeleton: React.FC = () => {
//   return (
//     <section className="py-8 md:py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Header with gradient background */}
//         <div className="relative mb-8 overflow-hidden rounded-xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className=" rounded-lg">
//               <Skeleton className="h-7 w-36" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-7 w-36" />
//               </div>
//             </div>
//             <Skeleton className="h-7 w-28" />
//           </div>
//         </div>

//         {/* Skeleton for filter or search */}
//         <div className="mb-6 flex justify-between items-center">
//           <div className="flex gap-2">
//             <Skeleton className="h-9 w-20 rounded-md" />
//             <Skeleton className="h-9 w-20 rounded-md" />
//           </div>
//           <Skeleton className="h-9 w-32 rounded-md" />
//         </div>

//         {/* Message list skeleton */}
//         <div className="space-y-3 mb-8">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="flex items-start gap-3 p-4 border rounded-lg"
//             >
//               <Skeleton className="h-10 w-10 rounded-full" />
//               <div className="flex-grow space-y-2">
//                 <div className="flex justify-between">
//                   <Skeleton className="h-4 w-24" />
//                   <Skeleton className="h-4 w-16" />
//                 </div>
//                 <Skeleton className="h-5 w-3/4" />
//                 <Skeleton className="h-4 w-full" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination skeleton */}
//         <div className="flex justify-center items-center gap-3 mt-6">
//           <Skeleton className="h-9 w-9 rounded-md" />
//           <div className="flex gap-1">
//             {[...Array(3)].map((_, i) => (
//               <Skeleton key={i} className="h-9 w-9 rounded-md" />
//             ))}
//           </div>
//           <Skeleton className="h-9 w-9 rounded-md" />
//         </div>
//       </div>
//     </section>
//   );
// };



import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Shadcn/ui Skeleton component

export const InboxSkeleton: React.FC = () => {
  return (
    // Mimic the overall padding and container style of the inbox section
    <div className="space-y-6 rounded-lg py-5 md:py-10">
      {/* 1. Header Section: "Your Inbox", counts, and Refresh button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 ">
          {/* Icon next to title */}
          <Skeleton className="size-10 rounded-lg" />
          <div>
            {/* Title: "Your Inbox" */}
            <Skeleton className="h-9 w-38 mb-1" />
            {/* Subtitle: Counts */}
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="p-1 rounded-full" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. New Messages Section */}
      <div className="space-y-4">
        {/* Section Header: Icon + "New Messages" + Count */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="size-11 rounded-md" />
          <Skeleton className="h-7 w-42" /> {/* "New Messages 2" */}
        </div>

        {/* Message List - New Messages (Mimic 2 items) */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={`new-skeleton-${i}`}
              // Mimic message card style: padding, border, rounded corners, flex layout
              className="flex items-center gap-3 p-4 space-y-4 border rounded-xl" // Use slightly muted background for cards
            >
              {/* Message Icon (left) */}
              <Skeleton className="size-12 rounded-full flex-shrink-0" />
              {/* Message Content (middle) */}
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2">
                  {/* "New" Badge */}
                  <Skeleton className="h-5 w-10 rounded-sm" />
                  {/* Website Name */}
                  <Skeleton className="h-5 w-30" />
                </div>
                {/* Message Subject */}
                <Skeleton className="h-7 w-1/2" />
                {/* Message Snippet (optional, based on image) */}
                <Skeleton className="h-5 w-full" />
              </div>

              {/* Timestamp and Action (right) */}
              <div className="flex flex-col items-end space-y-4 ml-auto flex-shrink-0">
                {/* Timestamp */}
                <Skeleton className="h-4 w-21" />
                {/* Action Icon (e.g., delete) */}
                <Skeleton className="size-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Previous Messages Section */}
      <div className="space-y-4">
        {/* Section Header: Icon + "Previous Messages" + Count */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="size-11 rounded-md" />
          <Skeleton className="h-7 w-42" /> {/* "New Messages 2" */}
        </div>

        {/* Message List - Previous Messages (Mimic 2 items) */}
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={`new-skeleton-${i}`}
              // Mimic message card style: padding, border, rounded corners, flex layout
              className="flex items-center gap-3 p-4 space-y-4 border rounded-xl" // Use slightly muted background for cards
            >
              {/* Message Icon (left) */}
              <Skeleton className="size-12 rounded-full flex-shrink-0" />
              {/* Message Content (middle) */}
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2">
                  {/* "New" Badge */}
                  <Skeleton className="h-5 w-10 rounded-sm" />
                  {/* Website Name */}
                  <Skeleton className="h-5 w-30" />
                </div>
                {/* Message Subject */}
                <Skeleton className="h-7 w-1/2" />
                {/* Message Snippet (optional, based on image) */}
                <Skeleton className="h-5 w-full" />
              </div>

              {/* Timestamp and Action (right) */}
              <div className="flex flex-col items-end space-y-4 ml-auto flex-shrink-0">
                {/* Timestamp */}
                <Skeleton className="h-4 w-21" />
                {/* Action Icon (e.g., delete) */}
                <Skeleton className="size-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
