// src/app/admin/components/kyc/KycDetailHeader.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="Heding">
        <div className="flex items-center text-sm mb-2 flex-wrap">
          {/* Breadcrumb Item 1: Admin */}
          <Link href="/admin" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
            Admin
          </Link>
          <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" /> {/* Adjusted color */}

          {/* Breadcrumb Item 2: KYC Management */}
          <Link href="/admin/kyc-management" className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary">
            KYC Management
          </Link>
          
          <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" /> {/* Adjusted color */}

          {/* Breadcrumb Item 3: Current Details */}
          <span
            className="text-neutral-900 dark:text-white truncate" // Adjusted color
            title={userId || "Loading User ID"} // Show full ID on hover
          >
            Details ({displayUserId})
          </span>
        </div>
        
        <h1 className="lg:text-3xl text-2xl font-medium text-mainheading  dark:text-primary">
          KYC Application Details
        </h1>

      </div>

      {/* Right Side: Back Button */}
      <Button
        asChild
        variant="link"
        className="text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary p-0 h-auto self-start sm:self-center"
      >
        <Link href="/admin/kyc-management">
          <ArrowLeft className="size-5 mr-1.5" />
          All Applications
        </Link>
      </Button>
    </div>
  );
};

export default KycDetailHeader;