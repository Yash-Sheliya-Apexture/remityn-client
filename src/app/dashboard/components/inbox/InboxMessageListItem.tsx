// // frontend/src/components/inbox/InboxMessageListItem.tsx
// import React from 'react';
// import type { InboxMessage } from '../../../services/inbox';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Trash2, Mail, MailOpen, RefreshCw } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import { cn } from '@/lib/utils';

// interface InboxMessageListItemProps {
//     message: InboxMessage;
//     onSelect: (message: InboxMessage) => void;
//     onDelete: (messageId: string) => void;
//     isDeleting: boolean;
// }

// export const InboxMessageListItem: React.FC<InboxMessageListItemProps> = React.memo(({
//     message,
//     onSelect,
//     onDelete,
//     isDeleting
// }) => {
//     const handleDeleteClick = (e: React.MouseEvent) => {
//         e.stopPropagation(); // Prevent card click when deleting
//         onDelete(message._id);
//     };

//     return (
//         <Card
//             onClick={() => onSelect(message)}
//             className={cn(
//                 "cursor-pointer hover:shadow-md transition-shadow duration-150 border relative overflow-hidden",
//                 !message.isRead ? "border-primary/30" : "border-border/50"
//             )}
//             aria-label={`Select message from ${message.sender || 'System'} with subject ${message.subject}`}
//         >
//             <CardContent className={cn(
//                 "p-4 flex items-start gap-4",
//                 !message.isRead && "pl-6" // Adjust padding for indicator
//             )}>
//                 {/* Icon */}
//                 <div className={cn(
//                         "flex justify-center items-center w-10 h-10 rounded-3xl bg-primarybox ",
//                         !message.isRead ? "text-primary" : "text-muted-foreground"
//                     )} aria-hidden="true">
//                     {!message.isRead ? <Mail className="size-5" /> : <MailOpen className="size-5" />}
//                 </div>

//                 {/* Message Info */}
//                 <div className="flex-grow overflow-hidden mr-10 w-[calc(100%-110px)]"> {/* Space for delete button */}
//                      <div className="flex justify-between items-baseline mb-1 text-xs">
//                         <p className={cn(
//                             "font-medium text-muted-foreground truncate",
//                             !message.isRead && "text-foreground/90 dark:text-foreground/80"
//                         )} title='Website name'>
//                             From: Website Name
//                         </p>
//                         <time dateTime={message.sentAt} className="text-muted-foreground flex-shrink-0 ml-2 whitespace-nowrap">
//                             {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}
//                         </time>
//                     </div>
//                     <p className={cn(
//                         "text-sm font-semibold truncate text-mainheading dark:text-white",
//                         !message.isRead && "font-bold"
//                     )} title={message.subject}>
//                         {message.subject}
//                     </p>
//                     <p className={cn(
//                         "text-sm text-muted-foreground/80 dark:text-muted-foreground/70 line-clamp-1 mt-1",
//                         !message.isRead && "text-foreground/70 dark:text-foreground/60"
//                     )}>
//                         {message.body}
//                     </p>
//                 </div>

//                 {/* Delete Button */}
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 z-10"
//                     onClick={handleDeleteClick}
//                     aria-label={`Delete message: ${message.subject}`}
//                     disabled={isDeleting}
//                 >
//                     {isDeleting ? (
//                         <RefreshCw className="size-4 animate-spin" />
//                     ) : (
//                         <Trash2 className="size-4" />
//                     )}
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// });

// InboxMessageListItem.displayName = 'InboxMessageListItem'; // Add display name for React DevTools

// // frontend/src/components/inbox/InboxMessageListItem.tsx
// import React from "react";
// import type { InboxMessage } from "../../../services/inbox"; // Adjust path if necessary
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Trash2, Mail, MailOpen, RefreshCw, AlertCircle } from "lucide-react"; // Added AlertCircle for emphasis
// import { formatDistanceToNow } from "date-fns";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// interface InboxMessageListItemProps {
//   message: InboxMessage;
//   onSelect: (message: InboxMessage) => void;
//   onDelete: (messageId: string) => void;
//   isDeleting: boolean;
// }

// export const InboxMessageListItem: React.FC<InboxMessageListItemProps> =
//   React.memo(({ message, onSelect, onDelete, isDeleting }) => {
//     const handleDeleteClick = (e: React.MouseEvent) => {
//       e.stopPropagation(); // Prevent card click when deleting
//       onDelete(message._id);
//     };

//     const isUnread = !message.isRead;

//     return (
//       <Card
//         onClick={() => onSelect(message)}
//         className={cn(
//           "cursor-pointer hover:shadow-md transition-shadow duration-150 border relative overflow-hidden group", // Added group for potential hover effects
//           isUnread
//             ? "border-primary/40 dark:border-primary/60 bg-primary/5 dark:bg-primary/10" // Style for unread
//             : "border-border/60 dark:border-border/40 bg-card" // Style for read
//         )}
//         aria-label={`${isUnread ? "Unread m" : "M"}essage from ${
//           message.sender || "System"
//         } with subject ${message.subject}`}
//       >
//         {/* Optional: Subtle visual indicator for unread */}
//         {isUnread && (
//           <div
//             className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-md"
//             aria-hidden="true"
//           ></div>
//         )}

//         <CardContent
//           className={cn(
//             "p-4 flex items-start gap-3 sm:gap-4",
//             isUnread && "pl-6" // Keep extra padding for unread
//           )}
//         >
//           {/* Icon Section */}
//           <div
//             className={cn(
//               "flex-shrink-0 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 rounded-full",
//               isUnread
//                 ? "bg-primary/10 text-primary" // Icon style for unread
//                 : "bg-muted/50 text-muted-foreground" // Icon style for read
//             )}
//             aria-hidden="true"
//           >
//             {isUnread ? (
//               <Mail className="size-4 sm:size-5" />
//             ) : (
//               <MailOpen className="size-4 sm:size-5" />
//             )}
//           </div>

//           {/* Message Info Section */}
//           <div className="flex-grow overflow-hidden mr-10 w-[calc(100%-110px)]">
//             {" "}
//             {/* Adjust width calc if needed */}
//             {/* Top Row: Sender & Time */}
//             <div className="flex justify-between items-center mb-1 text-xs sm:text-sm">
//               <p
//                 className={cn(
//                   "font-medium truncate",
//                   isUnread
//                     ? "text-primary dark:text-primary/90" // Sender style for unread
//                     : "text-muted-foreground" // Sender style for read
//                 )}
//                 title={message.sender || "System Message"}
//               >
//                 {message.sender || "System Message"}{" "}
//                 {/* Display sender or fallback */}
//               </p>
//               <time
//                 dateTime={message.sentAt}
//                 className="text-muted-foreground flex-shrink-0 ml-2 whitespace-nowrap text-xs"
//               >
//                 {formatDistanceToNow(new Date(message.sentAt), {
//                   addSuffix: true,
//                 })}
//               </time>
//             </div>
//             {/* Subject */}
//             <p
//               className={cn(
//                 "text-sm sm:text-base truncate text-mainheading dark:text-white",
//                 isUnread
//                   ? "font-semibold" // Subject style for unread
//                   : "font-medium" // Subject style for read
//               )}
//               title={message.subject}
//             >
//               {message.subject}
//             </p>
//             {/* Body Snippet */}
//             <p
//               className={cn(
//                 "text-xs sm:text-sm line-clamp-1 mt-1",
//                 isUnread
//                   ? "text-foreground/80 dark:text-foreground/70" // Snippet style for unread
//                   : "text-muted-foreground/90 dark:text-muted-foreground/80" // Snippet style for read
//               )}
//               // Simple approach: render plain text body for snippet
//               dangerouslySetInnerHTML={{
//                 __html:
//                   message.body.replace(/<[^>]*>?/gm, "").substring(0, 100) +
//                   (message.body.length > 100 ? "..." : ""),
//               }} // Basic text snippet
//               // OR if body is always plain text: {message.body.substring(0, 100)}...
//             ></p>
//           </div>

//           {/* Delete Button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" // Show on hover/focus
//             onClick={handleDeleteClick}
//             aria-label={`Delete message: ${message.subject}`}
//             disabled={isDeleting}
//           >
//             {isDeleting ? (
//               <RefreshCw className="size-4 animate-spin" />
//             ) : (
//               <Trash2 className="size-4" />
//             )}
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   });

// InboxMessageListItem.displayName = "InboxMessageListItem";

// // frontend/src/components/inbox/InboxMessageListItem.tsx
// import React from "react";
// import type { InboxMessage } from "../../../services/inbox"; // Adjust path if necessary
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"; // Import Badge component
// import {
//   Trash2,
//   RefreshCw,
//   Bell,
//   CheckCircle2,
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// interface InboxMessageListItemProps {
//   message: InboxMessage;
//   onSelect: (message: InboxMessage) => void;
//   onDelete: (messageId: string) => void;
//   isDeleting: boolean;
// }

// export const InboxMessageListItem: React.FC<InboxMessageListItemProps> =
//   React.memo(({ message, onSelect, onDelete, isDeleting }) => {
//     const handleDeleteClick = (e: React.MouseEvent) => {
//       e.stopPropagation(); // Prevent card click when deleting
//       onDelete(message._id);
//     };

//     const isUnread = !message.isRead;

//     return (
//       <Card
//         onClick={() => onSelect(message)}
//         className={cn(
//           "cursor-pointer transition-all duration-200 border relative overflow-hidden group",
//           isUnread
//             ? "border-primary shadow-[0_0_0_1px_rgba(var(--primary),0.3)] hover:shadow-[0_0_0_1px_rgba(var(--primary),0.5),0_4px_8px_rgba(var(--primary),0.25)] dark:hover:shadow-[0_0_0_1px_rgba(var(--primary),0.6),0_4px_8px_rgba(0,0,0,0.4)]"
//             : "border-border hover:shadow-md dark:hover:shadow-md/30"
//         )}
//         aria-label={`${isUnread ? "Unread m" : "M"}essage from ${
//           message.sender || "System"
//         } with subject ${message.subject}`}
//       >
//         <CardContent
//           className={cn(
//             "p-4 flex items-start gap-3 sm:gap-4",
//             isUnread ? "bg-primary/5 dark:bg-primary/10" : "bg-card"
//           )}
//         >
//           {/* Icon Section - Different icons and styles for read vs unread */}
//           <div
//             className={cn(
//               "flex-shrink-0 flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full",
//               isUnread
//                 ? "bg-primary/15 text-primary ring-2 ring-primary/30 dark:bg-primary/20"
//                 : "bg-muted/70 text-muted-foreground"
//             )}
//             aria-hidden="true"
//           >
//             {isUnread ? (
//               <Bell className="size-5 sm:size-6" />
//             ) : (
//               <CheckCircle2 className="size-5 sm:size-6" />
//             )}
//           </div>

//           {/* Message Info Section */}
//           <div className="flex-grow overflow-hidden mr-10 py-1">
//             {/* Top Row: Badge, Sender & Time */}
//             <div className="flex flex-wrap items-center gap-2 mb-1.5">
//               {/* Status Badge */}
//               <Badge
//                 variant={isUnread ? "default" : "outline"}
//                 className={cn(
//                   "text-xs font-medium py-0 h-5",
//                   isUnread
//                     ? "bg-primary/90 hover:bg-primary text-primary-foreground"
//                     : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
//                 )}
//               >
//                 {isUnread ? "New" : "Read"}
//               </Badge>

//               {/* Sender */}
//               <p
//                 className={cn(
//                   "font-medium text-sm sm:text-base",
//                   isUnread
//                     ? "text-foreground dark:text-foreground"
//                     : "text-muted-foreground dark:text-muted-foreground"
//                 )}
//                 title={message.sender || "System Message"}
//               >
//                 {message.sender || "System Message"}
//               </p>

//               {/* Time */}
//               <time
//                 dateTime={message.sentAt}
//                 className="text-muted-foreground text-xs ml-auto flex-shrink-0 whitespace-nowrap"
//               >
//                 {formatDistanceToNow(new Date(message.sentAt), {
//                   addSuffix: true,
//                 })}
//               </time>
//             </div>

//             {/* Subject - Enhanced styling */}
//             <h3
//               className={cn(
//                 "text-base sm:text-lg leading-tight mb-1.5",
//                 isUnread
//                   ? "font-semibold text-primary dark:text-primary-foreground/90"
//                   : "font-medium text-foreground/90 dark:text-foreground/80"
//               )}
//               title={message.subject}
//             >
//               {message.subject}
//             </h3>

//             {/* Body Snippet - Enhanced with better contrast */}
//             <p
//               className={cn(
//                 "text-sm line-clamp-2",
//                 isUnread
//                   ? "text-foreground/80 dark:text-foreground/70"
//                   : "text-muted-foreground dark:text-muted-foreground/80"
//               )}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   message.body.replace(/<[^>]*>?/gm, "").substring(0, 120) +
//                   (message.body.length > 120 ? "..." : ""),
//               }}
//             ></p>
//           </div>

//           {/* Unread indicator pip */}
//           {isUnread && (
//             <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
//           )}

//           {/* Delete Button - With improved positioning and hover effect */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className={cn(
//               "absolute bottom-3 right-3 h-8 w-8 rounded-full",
//               "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
//               isUnread
//                 ? "text-primary hover:text-white hover:bg-primary"
//                 : "text-muted-foreground hover:text-white hover:bg-destructive"
//             )}
//             onClick={handleDeleteClick}
//             aria-label={`Delete message: ${message.subject}`}
//             disabled={isDeleting}
//           >
//             {isDeleting ? (
//               <RefreshCw className="size-4 animate-spin" />
//             ) : (
//               <Trash2 className="size-4" />
//             )}
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   });

// InboxMessageListItem.displayName = "InboxMessageListItem";

// // frontend/src/components/inbox/InboxMessageListItem.tsx
// import React from "react";
// import type { InboxMessage } from "../../../services/inbox"; // Adjust path if necessary
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"; // Import Badge component
// import {
//   Trash2,
//   RefreshCw, // Note: RefreshCw here is only used for the delete spin state
//   Bell,
//   CheckCircle2,
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// interface InboxMessageListItemProps {
//   message: InboxMessage;
//   onSelect: (message: InboxMessage) => void;
//   onDelete: (messageId: string) => void;
//   isDeleting: boolean;
// }

// export const InboxMessageListItem: React.FC<InboxMessageListItemProps> =
//   React.memo(({ message, onSelect, onDelete, isDeleting }) => {
//     const handleDeleteClick = (e: React.MouseEvent) => {
//       e.stopPropagation(); // Prevent card click when deleting
//       onDelete(message._id);
//     };

//     const isUnread = !message.isRead;

//     return (
//       <Card
//         onClick={() => onSelect(message)}
//         className={cn(
//           "cursor-pointer transition-all ease-linear duration-75 relative overflow-hidden group",
//           isUnread
//             ? ""
//             : "border-border hover:shadow-md dark:hover:shadow-md/30"
//         )}
//         aria-label={`${isUnread ? "Unread m" : "M"}essage from ${
//           message.sender || "System"
//         } with subject ${message.subject}`}
//       >
//         <CardContent
//           className={cn(
//             "lg:p-4 p-3 flex items-start gap-3",
//             isUnread ? "bg-primary/5 dark:bg-primary/10" : "bg-card"
//           )}
//         >
//           {/* Icon Section */}
//           <div
//             className={cn(
//               "flex-shrink-0 flex justify-center items-center w-10 h-10 sm:size-12 rounded-full",
//               isUnread
//                 ? "bg-primary/15 text-primary dark:bg-primary/20"
//                 : "bg-primarybox text-white"
//             )}
//             aria-hidden="true"
//           >
//             {isUnread ? <Bell size={24} /> : <CheckCircle2 size={24} />}
//           </div>

//           {/* Message Info Section */}
//           <div className="flex-grow overflow-hidden mr-10">
//             {/* Top Row: Badge, Sender & Time */}
//             <div className="flex flex-col sm:flex-row justify-between sm:items-center sm:gap-2 mb-1.5">
//               <div className="flex gap-2">
//                 {/* Status Badge */}
//                 <Badge
//                   variant={isUnread ? "default" : "outline"}
//                   className={cn(
//                     "text-xs font-medium py-0 h-5",
//                     isUnread
//                       ? "bg-primary/90 hover:bg-primary text-primary-foreground"
//                       : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
//                   )}
//                 >
//                   {isUnread ? "New" : "Read"}
//                 </Badge>

//                 {/* Sender */}
//                 <p
//                   className={cn(
//                     "font-medium text-sm sm:text-base",
//                     isUnread
//                       ? "text-foreground dark:text-foreground"
//                       : "text-muted-foreground dark:text-muted-foreground"
//                   )}
//                   title={message.sender || "System Message"}
//                 >
//                   [Website Name]
//                 </p>
//               </div>

//               {/* Time */}
//               <div>
//                 <time
//                   dateTime={message.sentAt}
//                   className="text-gray-500 dark:text-gray-300 text-xs ml-auto flex-shrink-0 whitespace-nowrap"
//                 >
//                   {formatDistanceToNow(new Date(message.sentAt), {
//                     addSuffix: true,
//                   })}
//                 </time>
//               </div>
//             </div>

//             {/* Subject */}
//             <h3
//               className="text-base sm:text-lg mb-1.5 capitalize  text-neutral-900 dark:text-white"
//               title={message.subject}
//             >
//               {message.subject}
//             </h3>

//             {/* Body Snippet */}
//             <p
//               className="text-sm line-clamp-2 font-medium text-gray-500 dark:text-gray-300"
//               dangerouslySetInnerHTML={{
//                 __html:
//                   message.body.replace(/<[^>]*>?/gm, "").substring(0, 120) +
//                   (message.body.length > 120 ? "..." : ""),
//               }}
//             ></p>
//           </div>

//           {/* Unread indicator pip */}
//           {isUnread && (
//             <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
//           )}

//           {/* Delete Button */}
//           <button
//             className={cn(
//               "absolute bottom-3 right-3 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer",
//               "",
//               isUnread
//                 ? "text-primary bg-primary/20"
//                 : "bg-primarybox text-white"
//             )}
//             onClick={handleDeleteClick}
//             aria-label={`Delete message: ${message.subject}`}
//             disabled={isDeleting}
//           >
//             {isDeleting ? (
//               <RefreshCw className="size-4 animate-spin" />
//             ) : (
//               <Trash2 className="size-4" />
//             )}
//           </button>
//         </CardContent>
//       </Card>
//     );
//   });

// InboxMessageListItem.displayName = "InboxMessageListItem";

// frontend/src/components/inbox/InboxMessageListItem.tsx
import React, { useState } from "react"; // Added useState
import type { InboxMessage } from "../../../services/inbox"; // Adjust path if necessary
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, RefreshCw, Bell, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils"; // Adjust path if necessary
import DeleteMessageModal from "./DeleteMessageModal"; // Import the new modal

interface InboxMessageListItemProps {
  message: InboxMessage;
  onSelect: (message: InboxMessage) => void;
  onDelete: (messageId: string) => void;
  isDeleting: boolean; // This prop will now control the spinner *during* the delete API call, not just for opening the modal
}

export const InboxMessageListItem: React.FC<InboxMessageListItemProps> =
  React.memo(({ message, onSelect, onDelete, isDeleting }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for modal visibility

    const handleOpenDeleteModal = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when opening modal
      setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
      setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
      onDelete(message._id);
      // The modal will be closed by its own onConfirmDelete logic if needed,
      // or you can manage closing it here after the onDelete promise resolves if it's async
      // For now, DeleteMessageModal handles its own close on confirm.
    };

    const isUnread = !message.isRead;

    return (
      <>
        <div
          onClick={() => onSelect(message)}
          className={cn(
            "cursor-pointer transition-all ease-linear duration-75 relative rounded-2xl overflow-hidden group",
            isUnread ? "" : "border"
          )}
          aria-label={`${isUnread ? "Unread m" : "M"}essage from ${
            message.sender || "System"
          } with subject ${message.subject}`}
        >
          <div
            className={cn(
              "p-4 flex items-start gap-3",
              isUnread ? "bg-lightgray dark:bg-primary/10" : ""
            )}
          >
            {/* Icon Section */}
            <div
              className={cn(
                "flex-shrink-0 flex justify-center items-center size-10 sm:size-12 rounded-full border dark:border-none",
                isUnread
                  ? "bg-primary dark:bg-primary text-neutral-900"
                  : "bg-lightgray dark:bg-primarybox text-neutral-900 dark:text-white"
              )}
              aria-hidden="true"
            >
              {isUnread ? <Bell size={24} /> : <CheckCircle2 size={24} />}
            </div>

            {/* Message Info Section */}
            <div className="flex-grow overflow-hidden mr-10">
              {" "}
              {/* Adjusted mr-10 to ensure space for pip if needed */}
              {/* Top Row: Badge, Sender & Time */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center sm:gap-2">
                <div className="flex gap-2 items-center">
                  {/* Sender */}
                  <p
                    className={cn(
                      "font-medium text-sm truncate", // Added truncate
                      isUnread
                        ? "text-foreground dark:text-foreground"
                        : "text-muted-foreground dark:text-muted-foreground"
                    )}
                    title={"Website Name"}
                  >
                    {/* Using a placeholder for website name as per original */}
                    [Website Name]
                  </p>

                </div>

                {/* Time */}
                <div> 
                  <time
                    dateTime={message.sentAt}
                    className="text-gray-500 dark:text-gray-300 text-xs ml-auto flex-shrink-0 whitespace-nowrap"
                  >
                    {formatDistanceToNow(new Date(message.sentAt), {
                      addSuffix: true,
                    })}
                  </time>
                </div>
              </div>
              {/* Subject */}
              <h3
                className="text-base sm:text-lg mb-1.5 capitalize text-neutral-900 dark:text-white truncate" // Added truncate
                title={message.subject}
              >
                {message.subject}
              </h3>
              {/* Body Snippet */}
              <p
                className="text-sm line-clamp-2 text-gray-500 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html:
                    message.body.replace(/<[^>]*>?/gm, "").substring(0, 110) +
                    (message.body.length > 110 ? "..." : ""),
                }}
              ></p>
            </div>

            {/* Unread indicator pip */}
            {isUnread && (
              <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            )}

            {/* Delete Button */}
            <button
              className="absolute bottom-3 right-3 size-8 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white rounded-full transition-all duration-75 ease-linear flex justify-center items-center gap-2 cursor-pointer"
              onClick={handleOpenDeleteModal} // Changed to open modal
              aria-label={`Delete message: ${message.subject}`}
              disabled={isDeleting} // Keep disabled if a delete operation is in progress
            >
              {isDeleting ? ( // Show spinner if actual deletion is in progress (passed from parent)
                <RefreshCw className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </button>
          </div>
        </div>

        <DeleteMessageModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          messageSubject={message.subject}
          onConfirmDelete={handleConfirmDelete}
        />
      </>
    );
  });

InboxMessageListItem.displayName = "InboxMessageListItem";
