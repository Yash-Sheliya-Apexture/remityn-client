// frontend/src/types/balance.ts (or wherever you define BalanceDetail)

import { Currency } from './currency'; // Import the Currency type

// Define a basic User type reference (adjust based on your actual User type)
interface UserReference {
  _id: string;
  // Add other user fields if needed within balance context, e.g., name
}

export interface BalanceDetail {
  _id: string; // Balance specific ID (MongoDB ObjectId as string)
  user: UserReference | string; // Reference to the user (can be populated object or just ID string)
  currency: Currency; // Embed or reference the Currency type
  balance: number; // The actual balance amount
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  // Add any other relevant balance properties (e.g., status, isDefault)
}