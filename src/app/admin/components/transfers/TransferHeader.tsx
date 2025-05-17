// "use client";
// import React from "react";
// import Link from "next/link";
// import { ChevronRight, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface TransferHeaderProps {
//   transferId: string | undefined;
// }

// const TransferHeader: React.FC<TransferHeaderProps> = ({ transferId }) => {
//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//       <div className="Heding">
//         <div className="flex items-center text-sm text-slate-500 mb-2 flex-wrap">
//           <Link href="/admin" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
//             Admin
//           </Link>
//           <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//           <Link href="/admin/transfer" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
//             Transfers
//           </Link>
//           <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//           <span
//             className="text-neutral-900 dark:text-white truncate"
//             title={transferId}
//           >
//             Details ({transferId ? `${transferId.substring(0, 8)}...` : "Loading..."})
//           </span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
//           Transfer Details
//         </h1>
//       </div>

//       <Button
//         asChild
//         variant="link"
//         className="text-neutral-900 hover:text-primary p-0 h-auto self-start sm:self-center"
//       >
//         <Link href="/admin/transfer">
//           <ArrowLeft className="size-5 mr-1.5" />
//           All Transfers
//         </Link>
//       </Button>
//     </div>
//   );
// };

// export default TransferHeader;


// FILE: src/app/admin/components/transfers/TransferHeader.tsx
// No changes needed based on the errors provided for this file.
// Keeping the version from the prompt.
"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransferHeaderProps {
  transferId: string | undefined;
}

const TransferHeader: React.FC<TransferHeaderProps> = ({ transferId }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="Heding">
        <div className="flex items-center tex-tsm text-slate-500 mb-2 flex-wrap">
          <Link href="/admin" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
            Admin
          </Link>
          <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
          <Link href="/admin/transfer" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
            Transfers
          </Link>
          <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
          <span
            className="text-neutral-900 dark:text-white truncate"
            title={transferId}
          >
            Details ({transferId ? `${transferId.substring(0, 8)}...` : "Loading..."})
          </span>
        </div>


        <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
          Transfer Details
        </h1>
        
      </div>

      <Button
        asChild
        variant="link"
        className="text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary p-0 h-auto self-start sm:self-center"
      >
        <Link href="/admin/transfer">
          <ArrowLeft className="size-5 mr-1.5" />
          All Transfers
        </Link>
      </Button>
    </div>
  );
};

export default TransferHeader;