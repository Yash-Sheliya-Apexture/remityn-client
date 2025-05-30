// // frontend/src/components/inbox/InboxErrorState.tsx
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { AlertCircle, RefreshCw } from 'lucide-react';

// interface InboxErrorStateProps {
//     error: string;
//     onRetry: () => void;
// }

// export const InboxErrorState: React.FC<InboxErrorStateProps> = ({ error, onRetry }) => {
//     return (
//         <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//             <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
//                 <RefreshCw className="mr-2 h-4 w-4" /> Retry
//             </Button>
//         </Alert>
//     );
// };


// frontend/src/components/inbox/InboxErrorState.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from 'lucide-react';

interface InboxErrorStateProps {
    error: string;
    onRetry: () => void;
}

export const InboxErrorState: React.FC<InboxErrorStateProps> = ({ error, onRetry }) => {
    return (
      <Alert className="bg-red-900/25 border border-red-500 rounded-xl flex justify-between items-center">
        <div className="flex sm:items-center gap-3">

        <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20 shrink-0">
          <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
        </div>
        <div>
          <AlertTitle className="text-red-500">Error</AlertTitle>
          <AlertDescription className="font-medium text-red-300/90">{error}Error fetching inbox messages</AlertDescription>
        </div>
        </div>
        <button onClick={onRetry} className="inline-flex items-center py-2 px-4 rounded-full bg-red-600/20 text-red-500 cursor-pointer">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </button>
      </Alert>
    );
};