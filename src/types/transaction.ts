// // frontend/src/types/transaction.ts
// export interface Transaction {
//     _id: string;
//     type: "Add Money" | "Send Money";
//     name?: string;
//     description?: string;
//     createdAt?: string;
//     updatedAt?: string;
//     sendAmount?: number;
//     receiveAmount?: number;
//     amountToAdd?: number;
//     amountToPay?: number;
//     sendCurrency?: { code: string };
//     receiveCurrency?: { code: string };
//     balanceCurrency?: { code: string };
//     payInCurrency?: { code: string };
//     status: "pending" | "completed" | "canceled" | "in progress";
//     recipient?: { accountHolderName: string; _id: string } | string; // Recipient can be object or ID string
// }


// // frontend/src/types/transaction.ts

// export interface Currency {
//     _id: string; // Typically the MongoDB ObjectId as a string
//     code: string; // e.g., "USD", "EUR", "INR"
//     currencyName?: string; // e.g., "US Dollar", "Euro" (Optional)
//     flagImage?: string; // URL or path to the flag image (Optional)
//     // Add the adjustment percentage here!
//     rateAdjustmentPercentage?: number; // Optional, as it might not apply to all currencies or setups
//     // Add any other relevant currency properties
//   }
  
// export interface Transaction {
//     _id: string;
//     type: "Add Money" | "Send Money";
//     name?: string; // Usually for Send Money recipient
//     description?: string; // Optional generic description
//     createdAt?: string;
//     updatedAt?: string;

//     // Add Money (Payment) specific fields
//     amountToAdd?: number;
//     amountToPay?: number;
//     balanceCurrency?: { _id: string, code: string }; // Ensure _id is available
//     payInCurrency?: { _id: string, code: string };
//     account?: { _id: string } | string; // <-- ADD THIS: Reference to Account (can be object or string ID)

//     // Send Money (Transfer) specific fields
//     sendAmount?: number;
//     receiveAmount?: number;
//     sendCurrency?: { _id: string, code: string };
//     receiveCurrency?: { _id: string, code: string };
//     recipient?: { accountHolderName: string; _id: string } | string;
//     sourceAccountId?: string; // ID of the source Account for transfers

//     // Common fields
//     status: "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing"; // Added processing/failed
// }


// frontend/src/types/transaction.ts

// Re-export Currency type if needed elsewhere
export interface Currency {
  _id: string;
  code: string;
  currencyName?: string;
  flagImage?: string;
  rateAdjustmentPercentage?: number;
}

// Define Recipient structure used within Transaction
interface TransactionRecipient {
  _id: string;
  accountHolderName: string;
}

// Define Account structure used within Transaction
interface TransactionAccount {
  _id: string;
  // Add other fields if you need them from the account within a transaction context
}

// ***** MODIFIED LINE *****
export type TransactionStatus = "pending" | "completed" | "canceled" | "in progress" | "failed" | "processing" | "unknown"; // Added 'unknown'

export interface Transaction {
  _id: string;
  type: "Add Money" | "Send Money";
  status: TransactionStatus; // Use the specific type alias
  createdAt?: string;
  updatedAt?: string;

  // Fields primarily for Add Money (Payment)
  amountToAdd?: number; // Amount deposited into balance
  balanceCurrency?: Currency; // The balance being added to
  amountToPay?: number; // Amount paid by user (might differ due to fees)
  payInCurrency?: Currency; // Currency user paid with
  account?: TransactionAccount | string; // Account associated with the payment/balance

  // Fields primarily for Send Money (Transfer)
  name?: string; // Recipient name (derived)
  sendAmount?: number; // Amount sent from source
  sendCurrency?: Currency; // Currency sent
  receiveAmount?: number; // Amount received by recipient
  receiveCurrency?: Currency; // Currency received
  recipient?: TransactionRecipient | string; // Recipient details or ID
  sourceAccountId?: string; // ID of the source Account/Balance for transfers

  // Optional generic description (maybe useful sometimes)
  description?: string;
}


// Interface for route parameters, ensuring compatibility with useParams constraint
export interface TransactionDetailsPageParams extends Record<string, string | string[] | undefined> {
  transactionId: string;
}

// Define the structure for Payment details
export interface PaymentDetails {
  _id: string;
  type: 'payment'; // Discriminator property
  user: { _id: string; email?: string; fullName?: string };
  balanceCurrency: { _id: string; code: string; flagImage?: string }; // Currency being added to
  payInCurrency: { _id: string; code: string; flagImage?: string }; // Currency user pays with
  amountToAdd: number; // Amount credited to balance
  amountToPay: number; // Amount user needs to send
  exchangeRate: number;
  wiseFee: number; // Fee charged by Wise
  bankTransferFee: number; // Any specific fee for the bank transfer method
  referenceCode?: string; // Reference for the bank transfer
  paymentMethod: string; // e.g., 'bank_transfer', 'card'
  status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Robust status handling
  bankDetails?: { // Details of the bank account to pay into (e.g., Wise's account)
      payeeName?: string;
      iban?: string;
      bicSwift?: string;
      bankAddress?: string;
  };
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  note?: string; // User-added note
  failureReason?: string; // Reason if status is 'failed'
}

// Define the structure for Transfer details
export interface TransferDetails {
  _id: string;
  type: 'transfer'; // Discriminator property
  user: { _id: string; email?: string; fullName?: string };
  sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } }; // Account money is sent FROM
  recipient: { // Details of the recipient
      _id: string; // Recipient ID in the system
      accountHolderName: string;
      nickname?: string;
      currency: { _id: string; code: string; flagImage?: string }; // Currency recipient receives
      accountNumber: string; // Essential for display/verification
      bankName: string; // Essential for display/verification
  };
  sendAmount: number; // Amount debited from source account
  receiveAmount: number; // Amount recipient gets after conversion/fees
  sendCurrency: { _id: string; code: string; flagImage?: string };
  receiveCurrency: { _id: string; code: string; flagImage?: string };
  exchangeRate: number;
  fees: number; // Total fees for the transfer
  reason?: string; // Purpose of the transfer
  reference?: string; // Reference for the recipient
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string; // Robust status handling
  failureReason?: string; // Reason if status is 'failed'
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  note?: string; // User-added note
}

// Union type for any transaction
export type TransactionDetails = PaymentDetails | TransferDetails;

// Define timeline step structure
export type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
export interface TimelineStep {
  id: string;
  label: string;
  status: TimelineStatus;
  date?: string; // Formatted display date
  info?: string | null; // Additional context for the step
  showCancelAction?: boolean; // Flag for inline cancel button (e.g., "I've not paid")
}