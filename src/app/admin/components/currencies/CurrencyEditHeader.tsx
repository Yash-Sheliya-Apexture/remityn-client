// FILE: src/app/admin/components/currencies/CurrencyEditHeader.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming Button component exists at this path

interface CurrencyEditHeaderProps {
  currencyName: string | undefined | null;
  currencyCode: string | undefined | null;
}

const CurrencyEditHeader: React.FC<CurrencyEditHeaderProps> = ({
  currencyName,
  currencyCode,
}) => {
  const displayTitle = currencyName
    ? `${currencyName} (${currencyCode || "N/A"})`
    : "Loading...";
  const truncatedTitle =
    displayTitle.length > 25
      ? `${displayTitle.substring(0, 22)}...`
      : displayTitle;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        {/* Breadcrumbs and Title */}
        <div>
          <div className="flex items-center text-sm mb-2 flex-wrap">
            <Link
              href="/admin"
              className="text-subheadingWhite hover:dark:text-primary"
            >
              Admin
            </Link>
            <ChevronRight className="size-4 mx-1 flex-shrink-0 text-mainheadingWhite" />
            <Link
              href="/admin/currencies"
              className="text-subheadingWhite hover:dark:text-primary"
            >
              Currencies
            </Link>
            <ChevronRight className="size-4 mx-1 flex-shrink-0 text-mainheadingWhite" />
            <span
              className="text-subheadingWhite truncate" // Adjust max-width as needed
              title={displayTitle}
            >
              Edit ({truncatedTitle})
            </span>
          </div>


          <h1 className="lg:text-3xl text-2xl font-medium text-primary">
            Edit Currency
          </h1>

        </div>

        {/* Back Button */}
        <Button
          asChild
          variant="link"
          className="text-subheadingWhite hover:text-primary p-0 h-auto self-start sm:self-center"
        >
          <Link href="/admin/currencies">
            <ArrowLeft className="size-5 mr-1.5" />
            All Currencies
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CurrencyEditHeader;
