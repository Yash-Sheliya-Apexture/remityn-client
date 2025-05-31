// // frontend/src/components/inbox/InboxMessageDetailView.tsx
// import React from 'react';
// import type { InboxMessage } from '../../../services/inbox';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Trash2, ChevronLeft, RefreshCw } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// interface InboxMessageDetailViewProps {
//     message: InboxMessage;
//     onBack: () => void;
//     onDelete: (messageId: string) => void;
//     isDeleting: boolean;
// }

// export const InboxMessageDetailView: React.FC<InboxMessageDetailViewProps> = ({
//     message,
//     onBack,
//     onDelete,
//     isDeleting
// }) => {
//     return (
//         <Card className="border shadow-lg animate-in fade-in duration-300">
//             <CardHeader className="border-b pb-3">
//                 <div className="flex justify-between items-start gap-4">
//                     {/* Message Title/Meta */}
//                     <div className='flex-grow overflow-hidden'>
//                         <CardTitle className="text-lg mb-1 text-mainheading dark:text-white break-words">
//                             {message.subject}
//                         </CardTitle>
//                         <CardDescription className="text-xs">
//                             From: {message.sender || 'System'} • Received: <time dateTime={message.sentAt}>{formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}</time>
//                         </CardDescription>
//                     </div>
//                     {/* Action Buttons */}
//                     <div className="flex items-center gap-1 flex-shrink-0">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
//                             onClick={() => onDelete(message._id)}
//                             aria-label="Delete message"
//                             disabled={isDeleting}
//                         >
//                              {isDeleting ? (
//                                 <RefreshCw className="size-4 animate-spin" />
//                              ) : (
//                                 <Trash2 className="size-4" />
//                              )}
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={onBack}
//                             aria-label="Back to inbox list"
//                         >
//                             <ChevronLeft className="mr-1 h-4 w-4" /> Back
//                         </Button>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent className="p-4 md:p-6">
//                 {/* Render body safely */}
//                 <div
//                     className="text-sm whitespace-pre-wrap text-foreground leading-relaxed message-body"
//                     // If body *can* contain HTML, sanitize it here!
//                     // Example using dangerouslySetInnerHTML (USE WITH CAUTION and a SANITIZER)
//                     // dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.body) }}
//                     >
//                     {message.body} {/* Assuming plain text for now */}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// // frontend/src/components/inbox/InboxMessageDetailView.tsx
// import React from "react";
// import type { InboxMessage } from "../../../services/inbox";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator"; // Using Separator component
// import {
//   Trash2,
//   ChevronLeft,
//   RefreshCw,
//   UserRound, // Icon for Sender
//   Clock, // Icon for Time
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// interface InboxMessageDetailViewProps {
//   message: InboxMessage;
//   onBack: () => void;
//   onDelete: (messageId: string) => void;
//   isDeleting: boolean;
// }

// export const InboxMessageDetailView: React.FC<InboxMessageDetailViewProps> = ({
//   message,
//   onBack,
//   onDelete,
//   isDeleting,
// }) => {
//   return (
//     <div className="bg-card text-card-foreground border rounded-lg shadow-md overflow-hidden animate-in fade-in duration-300 flex flex-col h-full">
//       {/* Top Action Bar */}
//       <div className="flex items-center justify-between p-3 border-b bg-muted/40 sticky top-0 z-10">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={onBack}
//           aria-label="Back to inbox list"
//           className="flex items-center"
//         >
//           <ChevronLeft className="mr-1 h-4 w-4" /> Back
//         </Button>

//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
//           onClick={() => onDelete(message._id)}
//           aria-label="Delete message"
//           disabled={isDeleting}
//         >
//           {isDeleting ? (
//             <RefreshCw className="size-4 animate-spin" />
//           ) : (
//             <Trash2 className="size-4" />
//           )}
//         </Button>
//       </div>

//       {/* Message Header & Metadata */}
//       <div className="px-4 pt-4 pb-3 sm:px-6 sm:pt-5">
//         <h1 className="text-xl sm:text-2xl font-semibold text-mainheading dark:text-white mb-3 break-words leading-tight">
//           {message.subject}
//         </h1>
//         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0">
//           <div className="flex items-center">
//             <UserRound
//               className="size-4 mr-1.5 flex-shrink-0"
//               aria-hidden="true"
//             />
//             <span>
//               From:{" "}
//               <span className="font-medium text-foreground/90">
//                 {message.sender || "System"}
//               </span>
//             </span>
//           </div>
//           <div className="flex items-center">
//             <Clock className="size-4 mr-1.5 flex-shrink-0" aria-hidden="true" />
//             <span>
//               Received:{" "}
//               <time dateTime={message.sentAt}>
//                 {formatDistanceToNow(new Date(message.sentAt), {
//                   addSuffix: true,
//                 })}
//               </time>
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Separator */}
//       <Separator className="mx-4 sm:mx-6 my-2" />

//       {/* Message Body - Scrollable */}
//       <div className="px-4 pb-6 sm:px-6 sm:pb-8 flex-grow overflow-y-auto">
//         {/* Ensure parent container allows this to grow and scroll if needed,
//                      or add max-height/height and overflow-y-auto here if the parent
//                      doesn't constrain height. Added flex-grow and overflow-y-auto assuming
//                      this component might be placed within a layout that defines its height.
//                      Adjust as needed for your specific layout.
//                  */}
//         <div
//           className="text-sm sm:text-base text-foreground leading-relaxed message-body whitespace-pre-wrap break-words"
//           // If body *can* contain HTML, SANITIZE IT FIRST before using dangerouslySetInnerHTML
//           // Example: dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.body) }}
//         >
//           {message.body} {/* Assuming plain text */}
//         </div>
//       </div>
//     </div>
//   );
// };

// frontend/src/components/inbox/InboxMessageDetailView.tsx
import React, { useState } from "react";
import type { InboxMessage } from "../../../services/inbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ChevronLeft, RefreshCw, UserRound, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
// --- Make sure this import points to the correct saved file ---
import DeleteMessageModal from "./DeleteMessageModal";
// ---

interface InboxMessageDetailViewProps {
  message: InboxMessage;
  onBack: () => void;
  onDelete: (messageId: string) => void;
  isDeleting: boolean; // Prop definition is correct here
}

export const InboxMessageDetailView: React.FC<InboxMessageDetailViewProps> = ({
  message,
  onBack,
  onDelete,
  isDeleting, // Destructuring is correct here
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    if (!isDeleting) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleCloseDeleteModal = () => {
    // Only allow closing if not actively deleting, prevents accidental close during request
    if (!isDeleting) {
      setIsDeleteModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    onDelete(message._id);
  };

  return (
    <>
      <div className="border rounded-2xl overflow-hidden transition-all ease-linear duration-75 flex flex-col h-full">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between p-4 sm:px-6  bg-primarybox">
          <button
            onClick={onBack}
            aria-label="Back to inbox list"
            className="flex items-center justify-center cursor-pointer gap-2 bg-background/60 hover:bg-secondarybox text-primary sm:px-4 sm:py-2 sm:h-auto h-8 sm:w-auto w-8 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isDeleting}
          >
            <ChevronLeft  size={20} />
            <span className="hidden sm:block text-sm">Back</span>
          </button>

          <button
            className="size-8 bg-secondarybox text-white/90 hover:bg-secondaryboxhover rounded-full transition-all duration-75 ease-linear flex justify-center items-center gap-2 cursor-pointer"
            onClick={handleOpenDeleteModal}
            aria-label="Delete message"
            disabled={isDeleting} // Disable button if delete is in progress
          >
            {/* Keep the icon consistent, spinner logic is inside the modal */}
            <Trash2 className="size-4" />
          </button>
        </div>

        {/* Message Header & Metadata */}
        <div className="p-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl font-medium text-mainheadingWhite mb-3 break-words capitalize">
            {message.subject}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2 text-sm text-primary space-y-1 sm:space-y-0">
            <div className="flex items-center">
              <UserRound
                className="size-4 mr-1.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>
                From:{" "}
                <span className="font-medium text-subheadingWhite">
                  {/* {message.sender || "System"} */}
                  [Webiste Name]
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <Clock
                className="size-4 mr-1.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>
                Received:{" "}
                <time
                  dateTime={message.sentAt}
                  className="font-medium text-subheadingWhite"
                >
                  {formatDistanceToNow(new Date(message.sentAt), {
                    addSuffix: true,
                  })}
                </time>
              </span>
            </div>
          </div>
        </div>

        {/* Separator */}
        {/* <Separator className="mx-4 sm:mx-6 my-2" /> */}

        {/* Message Body - Scrollable */}
        <div className="p-4 sm:px-6 flex-grow overflow-y-auto border-t">
          <div className="text-sm sm:text-base text-subheadingWhite leading-relaxed message-body whitespace-pre-wrap break-words">
            {message.body}
          </div>
        </div>
      </div>

      {/* Render the Delete Confirmation Modal */}
      {/* --- Ensure the prop 'isDeleting' is passed correctly here --- */}
      <DeleteMessageModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        messageSubject={message.subject}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

// --- Exporting the component that uses the modal ---
