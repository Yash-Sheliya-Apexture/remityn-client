// frontend/src/types/currency.ts (or wherever you define Currency)

export interface Currency {
    _id: string; // Typically the MongoDB ObjectId as a string
    code: string; // e.g., "USD", "EUR", "INR"
    currencyName?: string; // e.g., "US Dollar", "Euro" (Optional)
    flagImage?: string; // URL or path to the flag image (Optional)
    // Add the adjustment percentage here!
    rateAdjustmentPercentage?: number; // Optional, as it might not apply to all currencies or setups
    // Add any other relevant currency properties
  }