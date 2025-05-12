// frontend/src/components/inbox/InboxErrorState.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from 'lucide-react';

interface InboxErrorStateProps {
    error: string;
    onRetry: () => void;
}

export const InboxErrorState: React.FC<InboxErrorStateProps> = ({ error, onRetry }) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
        </Alert>
    );
};