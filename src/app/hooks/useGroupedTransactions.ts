// // src/app/hooks/useGroupedTransactions.ts
// import { useMemo } from 'react';
// import { Transaction } from '@/types/transaction'; // Adjust path

// export interface GroupedTransactions {
//     [date: string]: Transaction[];
// }

// export const useGroupedTransactions = (transactions: Transaction[]) => {

//     const groupedData = useMemo(() => {
//         // 1. Needs Attention: 'Add Money' transactions with status 'pending'
//         const pendingAttention = transactions.filter(
//             (tx) => tx.type === "Add Money" && tx.status === "pending"
//         );

//         // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
//         const inProgress = transactions.filter(
//             (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
//                      (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
//         );

//         // 3. Processed: Completed, Canceled/Cancelled, Failed transactions
//         const processed = transactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//         );

//         // Sort processed transactions by date (newest first)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1;
//             if (!dateB) return -1;
//             try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//             catch { return 0; }
//         });

//         // Group sorted processed transactions by date string
//         const grouped = sortedProcessed.reduce((groups: GroupedTransactions, tx) => {
//             const groupDateStr = tx.updatedAt || tx.createdAt;
//             if (!groupDateStr) {
//                 const unknownDateKey = 'Unknown Date';
//                 groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
//                 return groups;
//             }
//             try {
//                 const dateKey = new Date(groupDateStr).toLocaleDateString(undefined, {
//                     year: "numeric", month: "long", day: "numeric",
//                 });
//                 groups[dateKey] = [...(groups[dateKey] || []), tx];
//             } catch (e) {
//                 console.error("Error formatting date for grouping:", groupDateStr, e);
//                 const errorKey = 'Date Error';
//                 groups[errorKey] = [...(groups[errorKey] || []), tx];
//             }
//             return groups;
//         }, {});

//         return {
//             pendingAttentionTransactions: pendingAttention,
//             inProgressTransactions: inProgress,
//             groupedProcessedTransactions: grouped || {},
//             hasProcessedTransactions: processed.length > 0,
//             hasAnyTransactionsToDisplay: pendingAttention.length > 0 || inProgress.length > 0 || processed.length > 0,
//         };
//     }, [transactions]); // Recalculate only when the input transactions change

//     return groupedData;
// };






// src/app/hooks/useGroupedTransactions.ts
import { useMemo } from 'react';
import { Transaction } from '@/types/transaction'; // Adjust path

export interface GroupedTransactions {
    [date: string]: Transaction[];
}

export const useGroupedTransactions = (transactions: Transaction[]) => {

    const groupedData = useMemo(() => {
        // 1. Needs Attention: 'Add Money' transactions with status 'pending'
        const pendingAttention = transactions.filter(
            (tx) => tx.type === "Add Money" && tx.status === "pending"
        );

        // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
        const inProgress = transactions.filter(
            (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
                     (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
        );

        // 3. Processed: Completed, Canceled, Failed transactions
        const processed = transactions.filter(
            (tx) => tx.status === "completed" ||
                   tx.status === "canceled" || // Use the correct spelling from the type
                // tx.status === "cancelled" || // REMOVED - Incorrect spelling
                   tx.status === "failed"
        );

        // Sort processed transactions by date (newest first)
        const sortedProcessed = [...processed].sort((a, b) => {
            const dateA = a.updatedAt || a.createdAt;
            const dateB = b.updatedAt || b.createdAt;
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
            catch { return 0; }
        });

        // Group sorted processed transactions by date string
        const grouped = sortedProcessed.reduce((groups: GroupedTransactions, tx) => {
            const groupDateStr = tx.updatedAt || tx.createdAt;
            if (!groupDateStr) {
                const unknownDateKey = 'Unknown Date';
                groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
                return groups;
            }
            try {
                const dateKey = new Date(groupDateStr).toLocaleDateString(undefined, {
                    year: "numeric", month: "long", day: "numeric",
                });
                groups[dateKey] = [...(groups[dateKey] || []), tx];
            } catch (e) {
                console.error("Error formatting date for grouping:", groupDateStr, e);
                const errorKey = 'Date Error';
                groups[errorKey] = [...(groups[errorKey] || []), tx];
            }
            return groups;
        }, {});

        return {
            pendingAttentionTransactions: pendingAttention,
            inProgressTransactions: inProgress,
            groupedProcessedTransactions: grouped || {},
            hasProcessedTransactions: processed.length > 0,
            hasAnyTransactionsToDisplay: pendingAttention.length > 0 || inProgress.length > 0 || processed.length > 0,
        };
    }, [transactions]);

    return groupedData;
};