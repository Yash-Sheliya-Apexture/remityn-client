// // src/app/admin/components/kyc/KycDetailHeader.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { ChevronRight, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface KycDetailHeaderProps {
//   userId: string | undefined;
//   // Optionally add userName if you want to display it later
//   // userName?: string | null;
// }

// const KycDetailHeader: React.FC<KycDetailHeaderProps> = ({ userId }) => {
//   const displayUserId = userId ? `${userId.substring(0, 12)}...` : "Loading...";

//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
//       {/* Left Side: Breadcrumbs and Title */}
//       <div className="Heding">
//         <div className="flex items-center text-sm mb-2 flex-wrap">
//           {/* Breadcrumb Item 1: Admin */}
//           <Link href="/admin" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
//             Admin
//           </Link>
//           <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" /> {/* Adjusted color */}

//           {/* Breadcrumb Item 2: KYC Management */}
//           <Link href="/admin/kyc-management" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
//             KYC Management
//           </Link>

//           <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" /> {/* Adjusted color */}

//           {/* Breadcrumb Item 3: Current Details */}
//           <span
//             className="text-neutral-900 dark:text-white truncate" // Adjusted color
//             title={userId || "Loading User ID"} // Show full ID on hover
//           >
//             Details ({displayUserId})
//           </span>
//         </div>

//         <h1 className="lg:text-3xl text-2xl font-medium text-mainheading  dark:text-primary">
//           KYC Application Details
//         </h1>

//       </div>

//       {/* Right Side: Back Button */}
//       <Button
//         asChild
//         variant="link"
//         className="text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary p-0 h-auto self-start sm:self-center"
//       >
//         <Link href="/admin/kyc-management">
//           <ArrowLeft className="size-5 mr-1.5" />
//           All Applications
//         </Link>
//       </Button>
//     </div>
//   );
// };

// export default KycDetailHeader;

// src/app/admin/components/kyc/KycDetailHeader.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdManageAccounts } from "react-icons/md";

interface KycDetailHeaderProps {
  userId: string | undefined;
  // Optionally add userName if you want to display it later
  // userName?: string | null;
}

const KycDetailHeader: React.FC<KycDetailHeaderProps> = ({ userId }) => {
  const displayUserId = userId ? `${userId.substring(0, 12)}...` : "Loading...";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
      {/* Left Side: Breadcrumbs and Title */}
      <div className="KYC Details">
        <div className="flex items-center gap-3">
          <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
            <MdManageAccounts className="size-6 text-mainheading" />
          </div>

          <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
            KYC Application Details
          </h1>
        </div>

        <p className="mt-2 text-subheadingWhite lg:text-lg">
          Track money transfers seamlessly with clear recipient details,
          currency types, and real-time transaction statuses.
        </p>
      </div>

      {/* Right Side: Back Button */}

      <Link
        href="/admin/kyc-management" // Corrected link from /admin/transfer to /admin/transfers
        className="flex items-center bg-primary text-mainheading hover:bg-primaryhover h-12.5 px-8 py-3 cursor-pointer font-medium rounded-full sm:w-auto w-full justify-center transition-all duration-75 ease-linear"
      >
        <ArrowLeft className="size-5 mr-1.5" />
        All Applications
      </Link>
    </div>
  );
};

export default KycDetailHeader;
