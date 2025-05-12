// src/types/account.ts
// (Adjust path based on your project structure, e.g., frontend/src/types/account.ts)

/**
 * Interface defining the structure for Currency information,
 * often nested within an Account.
 */
export interface CurrencyDetails {
    _id: string;          // MongoDB ObjectId of the currency document
    code: string;         // The standard 3-letter currency code (e.g., "USD", "EUR"). REQUIRED.
    currencyName?: string; // Optional: Full name of the currency (e.g., "US Dollar").
    flagImage?: string;    // Optional: Path or URL to the currency's flag image.
    // Add any other relevant currency fields returned by your API (e.g., symbol)
  }
  
  /**
   * Interface defining the structure for a user's currency account (balance).
   * This matches the expected data from the /api/accounts endpoint.
   */
  export interface Account {
    _id: string;                   // MongoDB ObjectId of the account document
    user: string;                  // MongoDB ObjectId of the user who owns the account
    currency: CurrencyDetails;     // Nested object containing details about the account's currency
    balance: number;               // The current numerical balance in this account
    accountNumber?: string;        // Optional: Specific account number associated with this balance (if applicable)
    createdAt: string;             // ISO 8601 date string representing when the account was created
    updatedAt: string;             // ISO 8601 date string representing when the account was last updated
    __v?: number;                  // Optional: Mongoose version key, usually not needed in the frontend
    // Add any other relevant fields returned by your API for an account
  }