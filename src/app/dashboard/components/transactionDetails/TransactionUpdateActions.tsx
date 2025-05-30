// // frontend/app/dashboard/transactions/[transactionId]/components/TransactionUpdateActions.tsx
// import React from "react";
// import { Button } from "@/components/ui/button"; // Adjust path
// import { PaymentDetails, TransferDetails } from "../../../../types/transaction"; // Adjust path

// interface TransactionUpdateActionsProps {
//   transaction: PaymentDetails | TransferDetails;
//   canCancel: boolean;
//   isSubmitting: boolean;
//   showAwaitingVerificationView: boolean; // Needed to hide confirm button
//   submissionError: string | null;
//   onConfirmPayment: () => void;
//   onOpenCancelModal: () => void;
//   onSwitchToDetailsTab: () => void;
// }

// const TransactionUpdateActions: React.FC<TransactionUpdateActionsProps> = ({
//   transaction,
//   canCancel,
//   isSubmitting,
//   showAwaitingVerificationView,
//   submissionError,
//   onConfirmPayment,
//   onOpenCancelModal,
//   onSwitchToDetailsTab,
// }) => {
//   const isPayment = transaction.type === "payment";
//   const isPendingPayment = isPayment && transaction.status === "pending";

//   return (
//     <>
//       {/* Action: Confirm Payment (Only for PENDING payments, not in 'awaiting' view) */}
//       {isPendingPayment && !showAwaitingVerificationView && (
//         <div className="mt-4 pt-4 border-t">
//           <h3 className="text-base font-semibold mb-2 text-neutral-900 dark:text-white">
//             Have you sent the payment?
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
//             Please find the bank details in the{" "}
//             <button
//               onClick={onSwitchToDetailsTab}
//               className="text-primary hover:underline font-medium"
//             >
//               Details tab
//             </button>
//             . Once you've completed the bank transfer, click the button below to
//             let us know.
//           </p>
//           {submissionError && (
//             <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">
//               {submissionError}
//             </p>
//           )}
          
//           <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-5">
//             <button
//               onClick={onOpenCancelModal}
//               disabled={isSubmitting}
//               className="order-2 sm:order-1 px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer"
//             >
//               Cancel Payment
//             </button>
//             <button
//               onClick={onConfirmPayment}
//               disabled={isSubmitting}
//               className="order-1 sm:order-2 px-4 py-2 w-full sm:w-auto bg-primary text-neutral-900 hover:bg-primaryhover rounded-full transition-all duration-75 ease-linear cursor-pointer"
//             >
//               {isSubmitting ? "Processing..." : "Yes, I've Paid"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Action: General Cancel Button (If cancelable and NOT the pending payment case handled above) */}
//       {canCancel && !isPendingPayment && (
//         <div className="mt-8 pt-6 border-t flex justify-end">
//           {submissionError && (
//             <p className="text-sm text-red-600 dark:text-red-400 mr-4 self-center">
//               {submissionError}
//             </p>
//           )}
//           <button
//             onClick={onOpenCancelModal}
//             disabled={isSubmitting}
//             className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-75 ease-linear cursor-pointer"
//           >
//             {isSubmitting
//               ? "Cancelling..."
//               : `Cancel ${isPayment ? "Payment" : "Transfer"}`}
//           </button>
//         </div>
//       )}

//       {/* Display general submission error if it occurred but wasn't shown elsewhere */}
//       {submissionError && !canCancel && !isPendingPayment && (
//         <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">
//           {submissionError}
//         </p>
//       )}
//     </>
//   );
// };

// export default TransactionUpdateActions;

// frontend/app/dashboard/transactions/[transactionId]/components/TransactionUpdateActions.tsx
import React from "react";
// Import the specific Button component if needed for Refresh
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { PaymentDetails, TransferDetails } from "../../../../types/transaction"; // Adjust path

interface TransactionUpdateActionsProps {
  transaction: PaymentDetails | TransferDetails;
  canCancel: boolean; // Reflects if cancellation *should* be possible based on current data
  isSubmitting: boolean;
  showAwaitingVerificationView: boolean;
  submissionError: string | null; // The error message from a failed action
  onConfirmPayment: () => void;
  onOpenCancelModal: () => void;
  onSwitchToDetailsTab: () => void;
  onRefresh: () => void; // <-- Add a refresh handler prop
}

const TransactionUpdateActions: React.FC<TransactionUpdateActionsProps> = ({
  transaction,
  canCancel,
  isSubmitting,
  showAwaitingVerificationView,
  submissionError,
  onConfirmPayment,
  onOpenCancelModal,
  onSwitchToDetailsTab,
  onRefresh, // <-- Destructure the new prop
}) => {
  const isPayment = transaction.type === "payment";
  const isTransfer = transaction.type === "transfer";
  const isPendingPayment = isPayment && transaction.status === "pending";

  // Determine if action sections should render based on state
  const shouldRenderConfirmPayment = isPendingPayment && !showAwaitingVerificationView;
  const shouldRenderCancelAction = canCancel;

  // Only render the container if actions or errors are relevant
  if (!shouldRenderConfirmPayment && !shouldRenderCancelAction && !submissionError) {
    return null;
  }

  // Flag to know if the error shown is specifically from a failed cancellation attempt
  // We infer this if there's a submissionError AND the transaction was considered cancellable
  // *before* the failed attempt (using the passed `canCancel` prop).
  // Note: `canCancel` might become false *after* a refresh following the error,
  //       but we base the Refresh button visibility on whether the *attempt* could have been made.
  const isCancellationError = !!submissionError && canCancel;

  return (
    <div className="mt-6 pt-6 border-t">

      {/* --- Action: Confirm Payment --- */}
      {shouldRenderConfirmPayment && (
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-mainheadingWhite">
            Have you sent the payment?
          </h3>
          <p className="text-sm text-subheadingWhite mb-4">
            Find bank details in the{" "}
            <button onClick={onSwitchToDetailsTab} className="text-primary hover:underline font-medium cursor-pointer">Details tab</button>.
            Once transferred, click below.
          </p>
          {/* Error specific to Confirm Payment */}
          {submissionError && !isCancellationError && ( // Show only if not a cancellation error
             <p className="mb-4 text-sm text-center text-red-400 bg-red-900/20 p-2 rounded border border-red-700/40">
               {submissionError}
             </p>
          )}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-5">
            {/* Cancel Button within Confirm Payment */}
            {shouldRenderCancelAction && (
              <button
                onClick={onOpenCancelModal}
                disabled={isSubmitting} // Disable if any action is submitting
                className="order-2 sm:order-1 px-4 py-2 text-primary bg-primarybox hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50"
              >
                Cancel Payment
              </button>
            )}
            <button
              onClick={onConfirmPayment}
              disabled={isSubmitting} // Disable if any action is submitting
              className="order-1 sm:order-2 px-4 py-2 w-full sm:w-auto bg-primary text-mainheading hover:bg-primaryhover rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Yes, I've Paid"}
            </button>
          </div>
        </div>
      )}

      {/* --- Action: General Cancel Button Section --- */}
      {/* Renders if cancellable AND NOT the confirm payment case */}
      {shouldRenderCancelAction && !shouldRenderConfirmPayment && (
        <div className="flex flex-col items-end gap-3"> {/* Use gap for button spacing */}
          {/* Error specifically from a failed cancellation attempt */}
          {isCancellationError && (
            <p className="mb-1 w-full text-sm text-center text-red-400 bg-red-900/20 p-2 rounded border border-red-700/40">
              {submissionError}
            </p>
          )}
          <div className="flex flex-wrap justify-end gap-3"> {/* Container for buttons */}
            {/* Cancel Button */}
            <button
              onClick={onOpenCancelModal}
              disabled={isSubmitting} // Disable if submitting
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Cancelling..."
                : `Cancel ${isPayment ? "Payment" : "Transfer"}`}
            </button>

            {/* --- START: Refresh Button --- */}
            {/* Show Refresh button ONLY if there was a cancellation error */}
            {isCancellationError && (
               <Button
                 variant="outline" // Use outline variant for secondary action
                 onClick={onRefresh}
                 disabled={isSubmitting} // Disable if confirm/cancel is already submitting
                 className="px-4 py-2 rounded-full transition-all duration-75 ease-linear cursor-pointer"
               >
                 Refresh Status
               </Button>
            )}
            {/* --- END: Refresh Button --- */}
          </div>
        </div>
      )}

      {/* --- Fallback Error Display --- */}
      {/* Shows error if it exists but NO actions were rendered */}
      {submissionError && !shouldRenderConfirmPayment && !shouldRenderCancelAction && (
         <p className="text-sm text-center text-red-400 bg-red-900/20 p-3 rounded-md border border-red-700/40">
           {submissionError}
         </p>
      )}
    </div>
  );
};

export default TransactionUpdateActions;