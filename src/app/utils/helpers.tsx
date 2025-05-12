// src/app/utils/helpers.tsx
import React from "react";
// Add the necessary icon imports here:
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// Get Status Badge Component
export const GetStatusBadge = ({ status }: { status: string }) => {
  const variants: { [key: string]: string } = {
    pending: "bg-yellow-600/20 text-yellow-600",
    processing: "bg-blue-600/20 text-blue-600",
    completed: "bg-green-600/20 text-green-600",
    failed: "bg-rose-600/20 text-rose-600",
    canceled: "bg-red-600/20 text-red-600",
    default: "bg-slate-600/20 text-slate-600",
  };

  const icons: { [key: string]: React.ReactNode } = {
    // Now Clock, RefreshCw, etc., are defined because they were imported
    pending: <Clock className="size-4 mr-1.5 flex-shrink-0" />,
    processing: (
      <RefreshCw className="size-4 mr-1.5 flex-shrink-0 animate-spin" />
    ),
    completed: <CheckCircle className="size-4 mr-1.5 flex-shrink-0" />,
    failed: <XCircle className="size-4 mr-1.5 flex-shrink-0" />,
    canceled: <AlertCircle className="size-4 mr-1.5 flex-shrink-0" />,
    default: <AlertCircle className="size-4 mr-1.5 flex-shrink-0" />,
  };

  const variant = variants[status] || variants.default;
  const icon = icons[status] || icons.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${variant}`}
    >
      {icon}
      <span className="capitalize">{status}</span>
    </span>
  );
};

// Get Time Ago Function
export const getTimeAgo = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date string provided to getTimeAgo:", dateString);
      return "Invalid date";
    }
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 5) return "just now";
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  } catch (error) {
    console.error("Error parsing date in getTimeAgo:", error);
    return "Error calculating time";
  }
};

// Format Date Function (Example)
export const formatFullDateTime = (
  dateString: string | undefined
): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Invalid date string provided to formatFullDateTime:", dateString);
      return "Invalid date";
    }
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch (error) {
    console.error("Error parsing date in formatFullDateTime:", error);
    return "Error formatting date";
  }
};

// Format Currency (Example)
export const formatCurrency = (
  amount: number | undefined | null,
  currencyCode?: string,
  digits = 2
): string => {
  if (amount === null || typeof amount === "undefined") return "N/A";
  const formattedAmount = amount.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return currencyCode ? `${formattedAmount} ${currencyCode}` : formattedAmount;
};