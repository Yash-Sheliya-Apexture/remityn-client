// src/types/index.ts (or src/types/payments.ts)

export interface User {
    fullName?: string;
    email?: string;
}

export interface Currency {
    code?: string;
}

// Define the specific status union type
export type PaymentStatus = 'all' | 'pending' | 'in progress' | 'completed' | 'canceled' | 'failed'; // Add 'failed' if used

// Define the canonical Payment type
export interface Payment {
    _id: string;
    user?: User;
    amountToAdd: string;
    payInCurrency?: Currency;
    // Define possible statuses more strictly
    status: 'pending' | 'in progress' | 'completed' | 'canceled' | 'failed' | string; // Allow string for safety
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string - Always reflects last save
    completedAt?: string | null; // ISO Date string or null - Reflects completion time
    referenceCode?: string;
    // Add other fields if needed by frontend (e.g., balanceCurrency)
    balanceCurrency?: Currency;
}

// You might want other shared types here as well