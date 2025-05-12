// frontend/app/dashboard/transactions/[transactionId]/components/AwaitingVerificationView.tsx
import React from "react";
import { Button } from "@/components/ui/button"; // Adjust path
import { FaRegClock } from "react-icons/fa";
import { PaymentDetails } from "../../../../types/transaction"; // Adjust path

interface AwaitingVerificationViewProps {
  transaction: PaymentDetails;
  onRefresh: () => void;
  isSubmitting: boolean; // To disable refresh button if needed
}

const AwaitingVerificationView: React.FC<AwaitingVerificationViewProps> = ({
  transaction,
  onRefresh,
  isSubmitting,
}) => {
  return (
    <div className="mt-8 pt-6 border-t text-center">
      <FaRegClock className="text-5xl text-primary mx-auto mb-5 animate-spin" />
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Thanks! We're checking your payment
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-6 max-w-md mx-auto">
        We received your confirmation and are now verifying the bank transfer.
        This usually takes a few hours, but can sometimes take up to 1-2
        business days depending on your bank and the payment method. We'll
        update the status here automatically once confirmed.
      </p>

      <p className="text-xs text-gray-700 dark:text-gray-300 mb-6">
        Reference Code:{" "}
        <span className="text-primary">
          {transaction.referenceCode || "N/A"}
        </span>
      </p>

      <button
        onClick={onRefresh}
        className="mt-2 px-4 py-3 bg-primary font-semibold cursor-pointer rounded-full text-mainheading"
        disabled={isSubmitting}
      >
        Check for Updates
      </button>
    </div>
  );
};

export default AwaitingVerificationView;
