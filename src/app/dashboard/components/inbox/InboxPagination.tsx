// frontend/src/components/inbox/InboxPagination.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InboxPaginationProps {
    currentPage: number;
    totalPages: number;
    totalMessages: number;
    onPageChange: (newPage: number) => void;
    isLoading: boolean; // To disable during list loading
}

export const InboxPagination: React.FC<InboxPaginationProps> = ({
    currentPage,
    totalPages,
    totalMessages,
    onPageChange,
    isLoading
}) => {
    if (totalPages <= 1) {
        return null; // Don't render pagination if only one page
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                aria-label="Go to previous page"
            >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
                 <span className="hidden sm:inline"> ({totalMessages} total)</span>
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                aria-label="Go to next page"
            >
                Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
        </div>
    );
};