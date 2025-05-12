// // frontend/src/types/transfer.ts
// export interface Transfer {
//     _id: string;
//     user: {
//         _id: string;
//         fullName: string;
//         email: string;
//     };
//     sourceAccount: any; // Define more specific type if needed
//     recipient: {
//         _id: string;
//         accountHolderName: string;
//         accountNumber?: string;
//     };
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrency: { code: string };
//     receiveCurrency: { code: string };
//     exchangeRate: number;
//     fees: number; // Or number, depending if fees are always returned
//     reason?: string;
//     reference?: string;
//     status: string;
//     createdAt: string; // Date strings
//     updatedAt: string;
//     failureReason?: string; // Optional failure reason
//     // ... other fields if any
// }


// frontend/src/types/transfer.ts

// Define a type for the account structure, adjust properties based on your actual API data
export interface AccountSummary {
    _id: string;
    // Add properties relevant to identifying the source account in the transfer context
    accountNumber?: string; // e.g., "******1234" (masked)
    accountName?: string;   // e.g., "Primary Checking"
    institutionName?: string; // e.g., "My Bank"
    currency: { code: string }; // Match the currency format used elsewhere
    // Add other relevant fields provided by your API for the source account
}

// Define a union type for known statuses for better type safety
export type TransferStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'AWAITING_APPROVAL' // Example additional status
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELLED';

export interface Transfer {
    _id: string;
    user: { // Assuming this is the user initiating the transfer
        _id: string;
        fullName: string;
        email: string; // May or may not be present depending on privacy/API design
    };
    sourceAccount: AccountSummary; // Use the specific interface instead of any
    recipient: { // Details of the recipient's destination
        _id: string; // Could be a user ID, or an external recipient ID
        accountHolderName: string;
        accountNumber?: string; // May be masked or partial
        bankName?: string; // Example: if sending to external bank
        iban?: string; // Example
        // Add other relevant recipient details
    };
    sendAmount: number;
    receiveAmount: number;
    sendCurrency: { code: string };
    receiveCurrency: { code: string };
    exchangeRate: number | null; // Use null if same currency or rate not applicable
    fees: number; // Ensure this is consistently a number
    reason?: string; // Optional purpose of transfer
    reference?: string; // Optional user-provided or system-generated reference
    status: TransferStatus; // Use the specific union type
    createdAt: string; // Keep as string for API data, can parse to Date later if needed
    updatedAt: string; // Keep as string
    estimatedDelivery?: string; // Optional estimated delivery time/date string
    failureReason?: string; // Optional reason if status is FAILED
    cancellationReason?: string; // Optional reason if status is CANCELLED
    // ... other relevant fields from your API
}

// You might also want a type for the simplified list item if different
export interface TransferListItem {
    _id: string;
    recipientName: string; // Example simplified field
    amountDisplay: string; // Example formatted amount
    status: TransferStatus;
    date: string; // Example formatted date
}