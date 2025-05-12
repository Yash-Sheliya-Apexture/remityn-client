// // frontend/app/dashboard/transactions/[transactionId]/components/TransactionDetailsContent.tsx
// import React, { useState } from 'react';
// import { PaymentDetails, TransferDetails } from '../../../../types/transaction'; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// interface TransactionDetailsContentProps {
//     transaction: PaymentDetails | TransferDetails;
//     note: string;
//     onNoteChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
//     formatDisplayDate: (dateString: string | undefined) => string;
// }

// const TransactionDetailsContent: React.FC<TransactionDetailsContentProps> = ({
//     transaction,
//     note,
//     onNoteChange,
//     formatDisplayDate
// }) => {
//     const [copySuccess, setCopySuccess] = useState<string | null>(null);
//     const isPayment = transaction.type === 'payment';
//     const isTransfer = transaction.type === 'transfer';

//     const handleCopyToClipboard = (text: string | undefined | null, fieldName: string) => {
//         if (!text) {
//             setCopySuccess(`${fieldName} is empty.`);
//             setTimeout(() => setCopySuccess(null), 1500);
//             return;
//         }
//         navigator.clipboard.writeText(text).then(() => {
//             setCopySuccess(`${fieldName} copied!`);
//             setTimeout(() => setCopySuccess(null), 1500);
//         }).catch(err => {
//             console.error('Failed to copy text: ', err);
//             alert(`Could not copy ${fieldName}. You may need to copy it manually.`);
//         });
//     };

//     const paymentDetails = transaction as PaymentDetails;
//     const transferDetails = transaction as TransferDetails;

//     return (
//         <div className="space-y-8">
//             {/* Section 1: Transaction Breakdown */}
//             <div>
//                 <h3 className="text-base font-semibold mb-4 text-neutral-900 dark:text-white border-b dark:border-border pb-2">
//                     Transaction Breakdown
//                 </h3>
//                 <dl className="space-y-3 text-sm">
//                     {isPayment && (
//                         <>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Amount to Add</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${paymentDetails.amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.balanceCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Wise Fee</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${paymentDetails.wiseFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.payInCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Bank Transfer Fee</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${paymentDetails.bankTransferFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.payInCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center border-t dark:border-border pt-3 mt-2"> <dt className="text-gray-500 dark:text-gray-300 font-semibold">Total Amount to Pay</dt> <dd className="font-semibold text-neutral-900 dark:text-white">{`${paymentDetails.amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.payInCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center mt-2"> <dt className="text-gray-500 dark:text-gray-300">Guaranteed Rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {paymentDetails.payInCurrency?.code} = {paymentDetails.exchangeRate.toFixed(4)} {paymentDetails.balanceCurrency?.code}</dd> </div>
//                             {paymentDetails.failureReason && <div className="flex justify-between items-start text-red-600 dark:text-red-600 pt-3 border-t dark:border-border mt-3"> <dt className="font-medium">Failure Reason</dt> <dd className="text-right ml-4">{paymentDetails.failureReason}</dd> </div>}
//                         </>
//                     )}
//                     {isTransfer && (
//                         <>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">You Sent</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${transferDetails.sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.sendCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Total Fees</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${transferDetails.fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.sendCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Amount Converted</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transferDetails.sendAmount - transferDetails.fees).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.sendCurrency?.code}`}</dd> </div>
//                             <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Guaranteed Rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {transferDetails.sendCurrency?.code} = {transferDetails.exchangeRate.toFixed(4)} {transferDetails.receiveCurrency?.code}</dd> </div>
//                             <div className="flex justify-between items-center border-t dark:border-border pt-3 mt-2"> <dt className="text-gray-500 dark:text-gray-300 font-semibold">Recipient Gets</dt> <dd className="font-semibold text-neutral-900 dark:text-white">{`${transferDetails.receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.receiveCurrency?.code}`}</dd> </div>
//                             {transferDetails.failureReason && <div className="flex justify-between items-start text-red-600 dark:text-red-600 pt-3 border-t dark:border-border mt-3"> <dt className="font-medium">Failure Reason</dt> <dd className="text-right ml-4">{transferDetails.failureReason}</dd> </div>}
//                         </>
//                     )}
//                     <div className="flex justify-between items-center pt-3 border-t dark:border-border mt-3"> <dt className="text-gray-500 dark:text-gray-300">Date Initiated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transaction.createdAt)}</dd> </div>
//                     <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Last Updated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transaction.updatedAt)}</dd> </div>
//                     <div className="flex justify-between items-center">
//                         <dt className="text-gray-500 dark:text-gray-300">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt>
//                         <dd className="font-medium text-neutral-900 dark:text-white break-all text-right ml-4">
//                             {isPayment ? paymentDetails.referenceCode || 'N/A' : transaction._id}
//                         </dd>
//                     </div>
//                 </dl>
//             </div>

//             {/* Section 2: Pay-in Bank Details / Recipient Details */}
//             <div>
//                 <h3 className="text-base font-semibold mb-4 text-neutral-900 dark:text-white border-b pb-2">
//                     {isPayment ? 'Pay-in Bank Details (Send Payment Here)' : 'Recipient Details'}
//                 </h3>
//                 {isPayment && paymentDetails.bankDetails && (
//                     <div className="space-y-3 text-sm">
//                         {/* Payee Name */}
//                         <div className="bg-gray-50 dark:bg-white/5 border p-3 rounded-md flex justify-between items-center gap-2">
//                             <div>
//                                 <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Payee Name</p>
//                                 <p className="font-semibold text-neutral-900 dark:text-white">{paymentDetails.bankDetails?.payeeName || 'N/A'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(paymentDetails.bankDetails?.payeeName, 'Payee name')} className="text-xs font-medium px-2 py-1 rounded-3xl h-auto bg-primary hover:bg-primaryhover text-neutral-900 transition-all duration-75 ease-linear cursor-pointer">Copy</button>
//                         </div>
//                         {/* IBAN */}
//                         <div className="bg-gray-50 dark:bg-white/5 border p-3 rounded-md flex justify-between items-center gap-2">
//                             <div>
//                                 <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">IBAN</p>
//                                 <p className="font-semibold text-neutral-900 dark:text-white break-all">{paymentDetails.bankDetails?.iban || 'N/A'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(paymentDetails.bankDetails?.iban, 'IBAN')} className="text-xs font-medium px-2 py-1 rounded-3xl h-auto bg-primary hover:bg-primaryhover text-neutral-900 transition-all duration-75 ease-linear cursor-pointer">Copy</button>
//                         </div>
//                         {/* BIC/SWIFT */}
//                         <div className="bg-gray-50 dark:bg-white/5 border p-3 rounded-md flex justify-between items-center gap-2">
//                             <div>
//                                 <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank code (BIC/SWIFT)</p>
//                                 <p className="font-semibold text-neutral-900 dark:text-white">{paymentDetails.bankDetails?.bicSwift || 'N/A'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(paymentDetails.bankDetails?.bicSwift, 'BIC/SWIFT')} className="text-xs font-medium px-2 py-1 rounded-3xl h-auto bg-primary hover:bg-primaryhover text-neutral-900 transition-all duration-75 ease-linear cursor-pointer">Copy</button>
//                         </div>
//                         {/* Reference Code */}
//                         {paymentDetails.referenceCode && (
//                             <div className="bg-blue-100 dark:bg-blue-600/20 dark:border-blue-600/80 p-3 rounded-md flex justify-between items-center gap-2">
//                                 <div>
//                                     <p className="text-xs text-blue-600 dark:text-blue-300 mb-0.5 font-semibold">IMPORTANT: Reference Code</p>
//                                     <p className="font-bold text-blue-800 dark:text-blue-200 text-base break-all">{paymentDetails.referenceCode}</p>
//                                     <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">You MUST include this code as the payment reference/description when sending money from your bank.</p>
//                                 </div>
//                                 <button onClick={() => handleCopyToClipboard(paymentDetails.referenceCode, 'Reference Code')} className="text-xs font-medium px-2 py-1 rounded-3xl h-auto bg-primary hover:bg-primaryhover text-neutral-900 transition-all duration-75 ease-linear cursor-pointer self-start">Copy</button>
//                             </div>
//                         )}
//                         {/* Bank Address */}
//                         <div className="bg-gray-50 dark:bg-white/5 border p-3 rounded-md">
//                             <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank Address</p>
//                             <p className="font-semibold text-neutral-900 dark:text-white whitespace-pre-line">{paymentDetails.bankDetails?.bankAddress || 'N/A'}</p>
//                         </div>
//                     </div>
//                  )}
//                  {isPayment && !paymentDetails.bankDetails && (
//                      <p className="text-sm text-gray-500 dark:text-gray-300">Bank details for payment are not available for this transaction.</p>
//                  )}

//                  {isTransfer && transferDetails.recipient && (
//                     <dl className="space-y-2 text-sm">
//                          <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Name</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.accountHolderName}</dd> </div>
//                          {transferDetails.recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Nickname</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.nickname}</dd> </div>}
//                          <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Receiving Currency</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.currency?.code}</dd> </div>
//                          <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Account Number</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.accountNumber}</dd> </div>
//                          <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Bank Name</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.bankName}</dd> </div>
//                          {transferDetails.reference && <div className="flex justify-between pt-2 border-t dark:border-border mt-2"> <dt className="text-gray-500 dark:text-gray-300">Reference for Recipient</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right ml-4">{transferDetails.reference}</dd> </div>}
//                          {transferDetails.reason && <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Reason for Transfer</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right ml-4">{transferDetails.reason}</dd> </div>}
//                     </dl>
//                  )}
//                   {isTransfer && !transferDetails.recipient && (
//                      <p className="text-sm text-gray-500 dark:text-gray-300">Recipient details are not available for this transfer.</p>
//                  )}

//                  {/* Copy Feedback Message Area */}
//                  <div className="h-5 mt-2 text-center">
//                     {copySuccess && (
//                         <p className="text-sm text-green-600 dark:text-green-400 transition-opacity duration-300 ease-in-out">
//                             {copySuccess}
//                         </p>
//                     )}
//                  </div>
//             </div>

//              {/* Section 3: Note Section */}
//              <div>
//                  <h3 className="text-base font-semibold mb-2 text-neutral-900 dark:text-white"> Note (for your reference only)</h3>
//                  <textarea
//                     id="transactionNote"
//                     className="lock px-4 py-3 bg-white dark:bg-background w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]"
//                     placeholder="Add personal notes about this transaction..."
//                     value={note}
//                     onChange={onNoteChange}
//                     rows={3}
//                     aria-label="Transaction Note"
//                 />
//                  {/* <Button size="sm" variant="outline" className="mt-2">Save Note</Button> */}
//             </div>
//         </div>
//     );
// };

// export default TransactionDetailsContent;




// frontend/app/dashboard/transactions/[transactionId]/components/TransactionDetailsContent.tsx
import React, { useState, useCallback } from 'react'; // Added useState and useCallback
import { PaymentDetails, TransferDetails } from '../../../../types/transaction'; // Adjust path
// Removed unused Button import from shadcn
import { Check, Copy } from 'lucide-react'; // Import icons directly

interface TransactionDetailsContentProps {
    transaction: PaymentDetails | TransferDetails;
    note: string;
    onNoteChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    formatDisplayDate: (dateString: string | undefined) => string;
}

// Define keys for the copy status state
type CopyableField = 'payeeName' | 'iban' | 'bicSwift' | 'referenceCode';

const TransactionDetailsContent: React.FC<TransactionDetailsContentProps> = ({
    transaction,
    note,
    onNoteChange,
    formatDisplayDate
}) => {
    // State to track the copied status for each individual button
    const [copyStatus, setCopyStatus] = useState<Record<CopyableField, boolean>>({
        payeeName: false,
        iban: false,
        bicSwift: false,
        referenceCode: false,
    });

    const isPayment = transaction.type === 'payment';
    const isTransfer = transaction.type === 'transfer';

    const handleCopyToClipboard = useCallback((text: string | undefined | null, fieldName: CopyableField) => {
        // Prevent copying if text is empty/null or already in 'Copied!' state
        if (!text || copyStatus[fieldName]) {
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            // Set the specific field's status to true
            setCopyStatus(prevStatus => ({ ...prevStatus, [fieldName]: true }));
            // Reset the status after a delay
            setTimeout(() => {
                setCopyStatus(prevStatus => ({ ...prevStatus, [fieldName]: false }));
            }, 1500); // Reset after 1.5 seconds
        }).catch(err => {
            console.error(`Failed to copy ${fieldName}: `, err);
            alert(`Could not copy ${fieldName}. You may need to copy it manually.`);
            // Ensure status is reset on error as well
             setCopyStatus(prevStatus => ({ ...prevStatus, [fieldName]: false }));
        });
    }, [copyStatus]); // Depend on copyStatus to prevent unnecessary re-renders

    const paymentDetails = transaction as PaymentDetails;
    const transferDetails = transaction as TransferDetails;

    // Define icon classes (adjust size as needed)
    const iconClasses = "h-4 w-4";

    return (
        <div className="space-y-8">
            {/* Section 1: Transaction Breakdown */}
            <div>
                <h3 className="text-base font-semibold mb-4 text-neutral-900 dark:text-white border-b dark:border-border pb-2">
                    Transaction Breakdown
                </h3>
                <dl className="space-y-3 text-sm">
                    {/* ... (Transaction Breakdown details remain unchanged) ... */}
                     {isPayment && (
                        <>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Amount to Add</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${paymentDetails.amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.balanceCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Wise Fee</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${paymentDetails.wiseFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.payInCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Bank Transfer Fee</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${paymentDetails.bankTransferFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.payInCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center border-t dark:border-border pt-3 mt-2"> <dt className="text-gray-500 dark:text-gray-300 font-semibold">Total Amount to Pay</dt> <dd className="font-semibold text-neutral-900 dark:text-white">{`${paymentDetails.amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${paymentDetails.payInCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center mt-2"> <dt className="text-gray-500 dark:text-gray-300">Guaranteed Rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {paymentDetails.payInCurrency?.code} = {paymentDetails.exchangeRate.toFixed(4)} {paymentDetails.balanceCurrency?.code}</dd> </div>
                            {paymentDetails.failureReason && <div className="flex justify-between items-start text-red-600 dark:text-red-600 pt-3 border-t dark:border-border mt-3"> <dt className="font-medium">Failure Reason</dt> <dd className="text-right ml-4">{paymentDetails.failureReason}</dd> </div>}
                        </>
                    )}
                    {isTransfer && (
                        <>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">You Sent</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${transferDetails.sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.sendCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Total Fees</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${transferDetails.fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.sendCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Amount Converted</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transferDetails.sendAmount - transferDetails.fees).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.sendCurrency?.code}`}</dd> </div>
                            <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Guaranteed Rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {transferDetails.sendCurrency?.code} = {transferDetails.exchangeRate.toFixed(4)} {transferDetails.receiveCurrency?.code}</dd> </div>
                            <div className="flex justify-between items-center border-t dark:border-border pt-3 mt-2"> <dt className="text-gray-500 dark:text-gray-300 font-semibold">Recipient Gets</dt> <dd className="font-semibold text-neutral-900 dark:text-white">{`${transferDetails.receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${transferDetails.receiveCurrency?.code}`}</dd> </div>
                            {transferDetails.failureReason && <div className="flex justify-between items-start text-red-600 dark:text-red-600 pt-3 border-t dark:border-border mt-3"> <dt className="font-medium">Failure Reason</dt> <dd className="text-right ml-4">{transferDetails.failureReason}</dd> </div>}
                        </>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t dark:border-border mt-3"> <dt className="text-gray-500 dark:text-gray-300">Date Initiated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transaction.createdAt)}</dd> </div>
                    <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-300">Last Updated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transaction.updatedAt)}</dd> </div>
                    <div className="flex justify-between items-center">
                        <dt className="text-gray-500 dark:text-gray-300">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt>
                         <dd className="font-medium text-neutral-900 dark:text-white break-all text-right ml-4">
                           {/* Note: No copy button provided for this field in the original example */}
                            {isPayment ? paymentDetails.referenceCode || 'N/A' : transaction._id}
                        </dd>
                    </div>
                </dl>
            </div>

            {/* Section 2: Pay-in Bank Details / Recipient Details */}
            <div>
                <h3 className="text-base font-semibold mb-4 text-neutral-900 dark:text-white border-b dark:border-border pb-2">
                    {isPayment ? 'Pay-in Bank Details (Send Payment Here)' : 'Recipient Details'}
                </h3>
                {isPayment && paymentDetails.bankDetails && (
                    <div className="space-y-3 text-sm">
                        {/* Payee Name */}
                        <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md flex justify-between items-center gap-2">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Payee Name</p>
                                <p className="font-semibold text-neutral-900 dark:text-white">{paymentDetails.bankDetails?.payeeName || 'N/A'}</p>
                            </div>
                            {/* --- Inline Copy Button --- */}
                            <button
                                type="button"
                                onClick={() => handleCopyToClipboard(paymentDetails.bankDetails?.payeeName, 'payeeName')}
                                aria-label={`Copy Payee name`}
                                className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox
                                    ${copyStatus.payeeName ? "cursor-default" : "cursor-pointer"}
                                    ${copyStatus.payeeName ? "" : ""} {/* Redundant line kept from original */}
                                `}
                                disabled={copyStatus.payeeName}
                            >
                                {copyStatus.payeeName ? (
                                    <Check className={iconClasses} aria-hidden="true" />
                                ) : (
                                    <Copy className={iconClasses} aria-hidden="true" />
                                )}
                                <span className="ml-1.5">{copyStatus.payeeName ? "Copied!" : "Copy"}</span>
                            </button>
                            {/* --- End Inline Copy Button --- */}
                        </div>
                        {/* IBAN */}
                        <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md flex justify-between items-center gap-2">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">IBAN</p>
                                <p className="font-semibold text-neutral-900 dark:text-white break-all">{paymentDetails.bankDetails?.iban || 'N/A'}</p>
                            </div>
                           {/* --- Inline Copy Button --- */}
                            <button
                                type="button"
                                onClick={() => handleCopyToClipboard(paymentDetails.bankDetails?.iban, 'iban')}
                                aria-label={`Copy IBAN`}
                                className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox
                                    ${copyStatus.iban ? "cursor-default" : "cursor-pointer"}
                                    ${copyStatus.iban ? "" : ""}
                                `}
                                disabled={copyStatus.iban}
                            >
                                {copyStatus.iban ? (
                                    <Check className={iconClasses} aria-hidden="true" />
                                ) : (
                                    <Copy className={iconClasses} aria-hidden="true" />
                                )}
                                <span className="ml-1.5">{copyStatus.iban ? "Copied!" : "Copy"}</span>
                            </button>
                            {/* --- End Inline Copy Button --- */}
                        </div>
                        {/* BIC/SWIFT */}
                        <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md flex justify-between items-center gap-2">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank code (BIC/SWIFT)</p>
                                <p className="font-semibold text-neutral-900 dark:text-white">{paymentDetails.bankDetails?.bicSwift || 'N/A'}</p>
                            </div>
                             {/* --- Inline Copy Button --- */}
                            <button
                                type="button"
                                onClick={() => handleCopyToClipboard(paymentDetails.bankDetails?.bicSwift, 'bicSwift')}
                                aria-label={`Copy BIC/SWIFT`}
                                className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox
                                    ${copyStatus.bicSwift ? "cursor-default" : "cursor-pointer"}
                                    ${copyStatus.bicSwift ? "" : ""}
                                `}
                                disabled={copyStatus.bicSwift}
                            >
                                {copyStatus.bicSwift ? (
                                    <Check className={iconClasses} aria-hidden="true" />
                                ) : (
                                    <Copy className={iconClasses} aria-hidden="true" />
                                )}
                                <span className="ml-1.5">{copyStatus.bicSwift ? "Copied!" : "Copy"}</span>
                            </button>
                            {/* --- End Inline Copy Button --- */}
                        </div>
                        {/* Reference Code */}
                        {paymentDetails.referenceCode && (
                            <div className="bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-600/80 p-3 rounded-md flex justify-between items-start gap-2"> {/* Changed items-center to items-start */}
                                <div>
                                    <p className="text-xs text-blue-600 dark:text-blue-300 mb-0.5 font-semibold">IMPORTANT: Reference Code</p>
                                    <p className="font-bold text-blue-800 dark:text-blue-200 text-base break-all">{paymentDetails.referenceCode}</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">You MUST include this code as the payment reference/description when sending money from your bank.</p>
                                </div>
                                {/* --- Inline Copy Button --- */}
                                <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(paymentDetails.referenceCode, 'referenceCode')}
                                    aria-label={`Copy Reference Code`}
                                    className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox
                                        ${copyStatus.referenceCode ? "cursor-default" : "cursor-pointer"}
                                        ${copyStatus.referenceCode ? "" : ""}
                                    `}
                                    disabled={copyStatus.referenceCode}
                                >
                                    {copyStatus.referenceCode ? (
                                        <Check className={iconClasses} aria-hidden="true" />
                                    ) : (
                                        <Copy className={iconClasses} aria-hidden="true" />
                                    )}
                                    <span className="ml-1.5">{copyStatus.referenceCode ? "Copied!" : "Copy"}</span>
                                </button>
                                {/* --- End Inline Copy Button --- */}
                            </div>
                        )}
                        {/* Bank Address */}
                        <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md">
                            <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank Address</p>
                            <p className="font-semibold text-neutral-900 dark:text-white whitespace-pre-line">{paymentDetails.bankDetails?.bankAddress || 'N/A'}</p>
                        </div>
                    </div>
                 )}
                 {isPayment && !paymentDetails.bankDetails && (
                     <p className="text-sm text-gray-500 dark:text-gray-300">Bank details for payment are not available for this transaction.</p>
                 )}

                 {isTransfer && transferDetails.recipient && (
                    <dl className="space-y-2 text-sm">
                        {/* ... (Transfer recipient details remain unchanged - no copy buttons here) ... */}
                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Name</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.accountHolderName}</dd> </div>
                         {transferDetails.recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Nickname</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.nickname}</dd> </div>}
                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Receiving Currency</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.currency?.code}</dd> </div>
                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Account Number</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.accountNumber}</dd> </div>
                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Bank Name</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right">{transferDetails.recipient.bankName}</dd> </div>
                         {transferDetails.reference && <div className="flex justify-between pt-2 border-t dark:border-border mt-2"> <dt className="text-gray-500 dark:text-gray-300">Reference for Recipient</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right ml-4">{transferDetails.reference}</dd> </div>}
                         {transferDetails.reason && <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Reason for Transfer</dt> <dd className="font-medium text-neutral-900 dark:text-white text-right ml-4">{transferDetails.reason}</dd> </div>}
                    </dl>
                 )}
                  {isTransfer && !transferDetails.recipient && (
                     <p className="text-sm text-gray-500 dark:text-gray-300">Recipient details are not available for this transfer.</p>
                 )}

                 {/* Removed Copy Feedback Message Area */}

            </div>

             {/* Section 3: Note Section */}
             <div>
                 <h3 className="text-base font-semibold mb-2 text-neutral-900 dark:text-white"> Note (for your reference only)</h3>
                 <textarea
                    id="transactionNote"
                    className="lock px-4 py-3 bg-white dark:bg-background w-full border dark:border-border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]"
                    placeholder="Add personal notes about this transaction..."
                    value={note}
                    onChange={onNoteChange}
                    rows={3}
                    aria-label="Transaction Note"
                />
            </div>
        </div>
    );
};

export default TransactionDetailsContent;