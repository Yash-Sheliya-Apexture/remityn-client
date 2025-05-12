// src/types/filter.ts (Create this file if it doesn't exist)

export interface AppliedFilters {
    selectedRecipients: (string | number)[];
    selectedDirection: string; // Ensure it's string, 'all' is the default
    selectedStatus: string | null;
    selectedBalance: string[];
    fromDate: string; // Represents date string or empty string
    toDate: string;   // Represents date string or empty string
}