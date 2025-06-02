// // frontend/src/app/(admin)/admin/messages/send/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation"; // Keep if used for auth redirect
// import { toast } from "sonner";
// import { format, formatDistanceToNow } from "date-fns";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse,
//   UpdateBatchPayload,
//   // No need to import UpdateBatchResponse if only used internally in service
// } from "../../../services/admin/inbox"; // Ensure path is correct

// // Shadcn UI Components (ensure all are imported)
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import Pagination from "../../components/Pagination"; // Adjust path as per your project structure

// // Icons
// import {
//   Send,
//   AlertCircle,
//   Loader2,
//   MessageSquareText,
//   Trash2,
//   RefreshCw,
//   History,
//   ListChecks,
//   Newspaper,
//   Pencil,
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // For conditional class names

// const BATCHES_PER_PAGE = 5; // How many past broadcasts to show per page in history

// // Helper function (can be moved to a utils file if used elsewhere)
// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const AdminSendAllMessagePage: React.FC = () => {
//   const router = useRouter(); // For navigation
//   const { isAdmin, loading: authLoading } = useAuth(); // Authentication context

//   // State for Composing and Sending New Broadcast
//   const [subject, setSubject] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);
//   const [sendError, setSendError] = useState<string | null>(null);

//   // State for Listing Past Broadcast Batches (History)
//   const [batchesData, setBatchesData] =
//     useState<BroadcastBatchListResponse | null>(null);
//   const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
//   const [batchesError, setBatchesError] = useState<string | null>(null);
//   const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

//   // State for Deleting a Broadcast Batch
//   const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<BroadcastBatchInfo | null>(null);

//   // State for Editing Batch
//   const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(
//     null
//   );
//   const [editBatchSubject, setEditBatchSubject] = useState<string>("");
//   const [editBatchBody, setEditBatchBody] = useState<string>("");
//   const [showEditBatchDialog, setShowEditBatchDialog] =
//     useState<boolean>(false);
//   const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
//   const [fullEditBodyFetched, setFullEditBodyFetched] =
//     useState<boolean>(false);

//   // --- Data Fetching for Broadcast History ---
//   const fetchBatches = useCallback(
//     async (page: number) => {
//       if (!isAdmin) return; // Guard against unnecessary calls
//       setBatchesLoading(true);
//       setBatchesError(null);
//       try {
//         const data = await inboxAdminService.getBroadcastBatchesAdmin(
//           page,
//           BATCHES_PER_PAGE
//         );
//         setBatchesData(data);
//         if (data.currentPage !== page) {
//           setTimeout(() => setBatchCurrentPage(data.currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Error fetching broadcast batches:", err);
//         setBatchesError(err.message || "Failed to load broadcast history.");
//         setBatchesData(null);
//       } finally {
//         setBatchesLoading(false);
//       }
//     },
//     [isAdmin]
//   );

//   useEffect(() => {
//     if (!authLoading && isAdmin) {
//       fetchBatches(batchCurrentPage);
//     }
//     if (!isAdmin && !authLoading) {
//       setBatchesData(null);
//       setBatchesLoading(false);
//     }
//   }, [authLoading, isAdmin, batchCurrentPage, fetchBatches]);

//   // --- Authentication Check ---
//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />{" "}
//         <span className="ml-2">Loading...</span>
//       </div>
//     );
//   }
//   if (!isAdmin) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <Alert variant="destructive" className="max-w-lg mx-auto">
//           <AlertCircle className="h-5 w-5" />
//           <AlertTitle>Access Denied</AlertTitle>
//           <AlertDescription>
//             You do not have permissions to view this page. Administrator
//             privileges required.
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   // --- Event Handlers ---
//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSendError(null);
//     if (!subject.trim() || !body.trim()) {
//       toast.error("Validation Error", {
//         description: "Subject and Body cannot be empty.",
//       });
//       return;
//     }
//     setIsSending(true);
//     try {
//       const result = await inboxAdminService.sendMessageToAllAdmin(
//         subject.trim(),
//         body.trim()
//       );
//       toast.success("Broadcast Sent", {
//         description:
//           result.message ||
//           `Message queued for ${result.totalAttempted} users.`,
//       });
//       setSubject("");
//       setBody("");
//       if (batchCurrentPage !== 1) setBatchCurrentPage(1);
//       else fetchBatches(1);
//     } catch (err: any) {
//       const errorMsg = err.message || "Failed to send broadcast.";
//       setSendError(errorMsg);
//       toast.error("Sending Failed", { description: errorMsg });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const goToBatchPage = (newPage: number) => {
//     if (
//       newPage > 0 &&
//       newPage !== batchCurrentPage &&
//       (!batchesData || newPage <= batchesData.totalPages)
//     ) {
//       setBatchCurrentPage(newPage);
//     }
//   };
//   const paginateBatches = (pageNumber: number) => goToBatchPage(pageNumber);
//   const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
//   const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1);
//   const handleRefreshBatches = () => {
//     if (!batchesLoading) fetchBatches(batchCurrentPage);
//   };

//   const openDeleteConfirmation = (batch: BroadcastBatchInfo) =>
//     setShowDeleteConfirm(batch);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteBatch = async () => {
//     if (!showDeleteConfirm) return;
//     const batchIdToDelete = showDeleteConfirm.batchId;
//     setDeletingBatchId(batchIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       const result = await inboxAdminService.deleteBroadcastBatchAdmin(
//         batchIdToDelete
//       );
//       toast.success("Batch Deleted", {
//         description:
//           result.message || `Deleted ${result.deletedCount} messages.`,
//       });
//       const wasLastItem =
//         batchesData?.batches.length === 1 && batchCurrentPage > 1;
//       const pageToFetch = wasLastItem ? batchCurrentPage - 1 : batchCurrentPage;
//       if (wasLastItem) setBatchCurrentPage(pageToFetch);
//       else fetchBatches(pageToFetch);
//     } catch (err: any) {
//       toast.error("Failed to delete batch", { description: err.message });
//     } finally {
//       setDeletingBatchId(null);
//     }
//   };

//   // --- Batch Edit Handlers ---
//   const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
//     setEditingBatch(batch);
//     setEditBatchSubject(batch.subject);
//     setShowEditBatchDialog(true);
//     setFullEditBodyFetched(false); // Reset flag
//     setEditBatchBody("Loading full message body..."); // Placeholder while fetching

//     // Simulate fetching full body - replace with actual API call
//     // This requires a backend endpoint like GET /api/admin/inbox/batch/:batchId/sample
//     // that returns one full message from the batch.
//     try {
//       // ---- SIMULATED FETCH - REPLACE THIS ----
//       // const fullMessage = await inboxAdminService.getSampleMessageFromBatch(batch.batchId);
//       // setEditBatchBody(fullMessage.body);
//       // For now, using snippet or a placeholder.
//       // If bodySnippet is usually the full message or close enough, this might be acceptable for some use cases.
//       // Otherwise, you MUST fetch the full body.
//       // Let's assume for this example, if the snippet is short, it might be the full body.
//       if (batch.bodySnippet.length < 100 || batch.bodySnippet.endsWith("...")) {
//         // If snippet is short or seems complete, use it.
//         // In a real app, you'd fetch. For this example, we are proceeding with snippet.
//         setEditBatchBody(
//           batch.bodySnippet.endsWith("...")
//             ? batch.bodySnippet.slice(0, -3)
//             : batch.bodySnippet
//         );
//       } else {
//         // If snippet seems truncated, acknowledge it. Better to fetch.
//         setEditBatchBody(
//           batch.bodySnippet +
//             "\n\n--- (Snippet shown, full body might be longer) ---"
//         );
//       }
//       // ---- END SIMULATED FETCH ----
//       setFullEditBodyFetched(true);
//     } catch (error) {
//       console.error("Failed to fetch full body for edit:", error);
//       setEditBatchBody(
//         batch.bodySnippet +
//           "\n\n--- (Error fetching full body, snippet shown) ---"
//       );
//       toast.error("Could not load full message body for editing.");
//       setFullEditBodyFetched(true); // Allow editing of snippet at least
//     }
//   };

//   const closeEditBatchDialog = () => {
//     setShowEditBatchDialog(false);
//     setEditingBatch(null);
//     setEditBatchSubject("");
//     setEditBatchBody("");
//     setIsUpdatingBatch(false);
//     setFullEditBodyFetched(false);
//   };

//   const handleUpdateBatch = async () => {
//     if (!editingBatch || isUpdatingBatch) return;
//     if (!editBatchSubject.trim() || !editBatchBody.trim()) {
//       toast.error("Validation Error", {
//         description: "Subject and Body cannot be empty.",
//       });
//       return;
//     }
//     setIsUpdatingBatch(true);
//     const payload: UpdateBatchPayload = {
//       subject: editBatchSubject.trim(),
//       body: editBatchBody.trim(),
//     };
//     try {
//       const result = await inboxAdminService.updateBroadcastBatchAdmin(
//         editingBatch.batchId,
//         payload
//       );
//       toast.success("Batch Updated", {
//         description:
//           result.message || `Updated ${result.modifiedCount} messages.`,
//       });
//       closeEditBatchDialog();
//       fetchBatches(batchCurrentPage);
//     } catch (err: any) {
//       toast.error("Failed to update batch", { description: err.message });
//     } finally {
//       setIsUpdatingBatch(false);
//     }
//   };

//   // --- Render Functions ---
//   const renderBatchListSkeleton = () => (
//     /* ... same as before ... */ <div className="space-y-3 mt-6">
//       {[...Array(3)].map((_, i) => (
//         <div
//           key={i}
//           className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-card"
//         >
//           <div className="flex-1 space-y-2">
//             <Skeleton className="h-5 w-3/4" />
//             <Skeleton className="h-4 w-full" />
//             <Skeleton className="h-4 w-1/2" />
//           </div>
//           <Skeleton className="h-9 w-9 rounded-md" />
//         </div>
//       ))}
//     </div>
//   );

//   const renderBatchList = () => {
//     if (batchesLoading && !batchesData) return renderBatchListSkeleton();
//     if (batchesError)
//       return (
//         <Alert variant="destructive" className="mt-6">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error Loading History</AlertTitle>
//           <AlertDescription>
//             {batchesError}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleRefreshBatches}
//               className="mt-2 ml-auto block"
//             >
//               <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//             </Button>
//           </AlertDescription>
//         </Alert>
//       );
//     if (!batchesData || batchesData.batches.length === 0)
//       return (
//         <div className="text-center py-10 text-muted-foreground">
//           <ListChecks className="mx-auto h-12 w-12 mb-3 text-gray-400 dark:text-gray-500" />
//           <p className="text-lg">No Past Broadcasts</p>
//           <p className="text-sm">
//             Messages sent to all users will appear here.
//           </p>
//         </div>
//       );

//     const totalPages = batchesData.totalPages ?? 0;
//     return (
//       <>
//         <div className="mt-6 border rounded-lg overflow-x-auto shadow-sm">
//           <Table>
//             <TableHeader className="bg-muted/50 dark:bg-muted/30">
//               <TableRow>
//                 <TableHead className="min-w-[250px] pl-6">
//                   Subject & Snippet
//                 </TableHead>
//                 <TableHead className="min-w-[180px]">Sent At</TableHead>
//                 <TableHead className="text-center min-w-[100px]">
//                   Recipients
//                 </TableHead>
//                 <TableHead className="text-right pr-6 min-w-[150px]">
//                   Actions
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {batchesData.batches.map((batch) => {
//                 const isDeletingThis = deletingBatchId === batch.batchId;
//                 const isEditingThis =
//                   editingBatch?.batchId === batch.batchId && isUpdatingBatch;
//                 const isDisabled =
//                   batchesLoading || deletingBatchId !== null || isUpdatingBatch;
//                 return (
//                   <TableRow
//                     key={batch.batchId}
//                     className="hover:bg-muted/20 dark:hover:bg-muted/10"
//                   >
//                     <TableCell
//                       className="font-medium max-w-sm truncate pl-6"
//                       title={batch.subject}
//                     >
//                       <span className="block text-sm font-semibold text-foreground">
//                         {batch.subject}
//                       </span>
//                       <p
//                         className="text-xs text-muted-foreground truncate"
//                         title={batch.bodySnippet}
//                       >
//                         {batch.bodySnippet}
//                         {batch.bodySnippet.length >= 100 ? "..." : ""}
//                       </p>
//                     </TableCell>
//                     <TableCell>
//                       <span className="block whitespace-nowrap text-sm">
//                         {formatDate(batch.sentAt)}
//                       </span>
//                       <div className="text-xs text-muted-foreground">
//                         {formatDistanceToNow(new Date(batch.sentAt), {
//                           addSuffix: true,
//                         })}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-center text-sm">
//                       {batch.recipientCount}
//                     </TableCell>
//                     <TableCell className="text-right pr-6">
//                       <div className="flex justify-end items-center gap-1">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-500/10 focus-visible:ring-blue-500"
//                           onClick={() => openEditBatchDialog(batch)}
//                           disabled={isDisabled || isDeletingThis}
//                           aria-label="Edit Batch"
//                         >
//                           {isEditingThis ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Pencil className="h-4 w-4" />
//                           )}
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 focus-visible:ring-destructive"
//                           onClick={() => openDeleteConfirmation(batch)}
//                           disabled={isDisabled || isEditingThis}
//                           aria-label="Delete Batch"
//                         >
//                           {isDeletingThis ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Trash2 className="h-4 w-4" />
//                           )}
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//         {totalPages > 1 && (
//           <Pagination
//             currentPage={batchCurrentPage}
//             totalPages={totalPages}
//             paginate={paginateBatches}
//             goToPreviousPage={goToPreviousBatchPage}
//             goToNextPage={goToNextBatchPage}
//           />
//         )}
//       </>
//     );
//   };

//   // --- Main Page Return ---
//   return (
//     <div className="container mx-auto px-4 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
//           <MessageSquareText className="size-8 text-primary" />
//           Send Broadcast Message
//         </h1>
//         <p className="text-muted-foreground mt-1">
//           Compose and send messages to all users, and manage past broadcasts.
//         </p>
//       </div>

//       <Card className="mb-12 shadow-md">
//         <form onSubmit={handleSendMessage}>
//           <CardHeader>
//             <CardTitle className="text-xl flex items-center gap-2">
//               <Newspaper size={22} /> Compose New Broadcast
//             </CardTitle>
//             <CardDescription>
//               This message will be delivered to the inbox of every registered
//               user.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {sendError && (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>Sending Error</AlertTitle>
//                 <AlertDescription>{sendError}</AlertDescription>
//               </Alert>
//             )}
//             <div className="space-y-2">
//               <Label htmlFor="subject" className="font-semibold">
//                 Subject
//               </Label>
//               <Input
//                 id="subject"
//                 placeholder="E.g., Important System Update"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 maxLength={200}
//                 required
//                 disabled={isSending}
//                 className="text-base"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="body" className="font-semibold">
//                 Body
//               </Label>
//               <Textarea
//                 id="body"
//                 placeholder="Write your message content here..."
//                 value={body}
//                 onChange={(e) => setBody(e.target.value)}
//                 rows={8}
//                 required
//                 disabled={isSending}
//                 className="text-base min-h-[150px]"
//               />
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-end border-t pt-6">
//             <Button
//               type="submit"
//               disabled={isSending || !subject.trim() || !body.trim()}
//               size="lg"
//             >
//               {isSending ? (
//                 <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//               ) : (
//                 <Send className="mr-2 h-5 w-5" />
//               )}
//               {isSending ? "Broadcasting..." : "Send to All Users"}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>

//       <div className="pt-8 border-t dark:border-neutral-700">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2.5">
//               <History className="size-7 text-muted-foreground" />
//               Broadcast History
//             </h2>
//             <p className="text-sm text-muted-foreground mt-1">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>
//           <Button
//             variant="outline"
//             size="default"
//             onClick={handleRefreshBatches}
//             disabled={batchesLoading}
//           >
//             <RefreshCw
//               className={cn("mr-2 h-4 w-4", batchesLoading && "animate-spin")}
//             />
//             {batchesLoading ? "Refreshing..." : "Refresh History"}
//           </Button>
//         </div>
//         {renderBatchList()}
//       </div>

//       {/* Edit Batch Dialog */}
//       <Dialog
//         open={showEditBatchDialog}
//         onOpenChange={(isOpen) => !isOpen && closeEditBatchDialog()}
//       >
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle className="text-lg font-semibold">
//               Edit Broadcast Message
//             </DialogTitle>
//             <DialogDescription className="mt-1 text-sm text-muted-foreground">
//               Modify subject and body. This will update messages for all
//               recipients.
//               <span className="block mt-1 text-xs">
//                 Batch ID: {editingBatch?.batchId.substring(0, 13)}...
//               </span>
//             </DialogDescription>
//           </DialogHeader>
//           {!fullEditBodyFetched && editingBatch ? (
//             <div className="py-8 flex items-center justify-center">
//               <Loader2 className="h-6 w-6 animate-spin text-primary" />{" "}
//               <span className="ml-2">Loading message details...</span>
//             </div>
//           ) : (
//             <div className="grid gap-4 py-4">
//               <div className="space-y-1.5">
//                 <Label htmlFor="edit-batch-subject" className="font-medium">
//                   Subject
//                 </Label>
//                 <Input
//                   id="edit-batch-subject"
//                   value={editBatchSubject}
//                   onChange={(e) => setEditBatchSubject(e.target.value)}
//                   disabled={isUpdatingBatch}
//                   maxLength={200}
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <Label htmlFor="edit-batch-body" className="font-medium">
//                   Body
//                 </Label>
//                 <Textarea
//                   id="edit-batch-body"
//                   value={editBatchBody}
//                   onChange={(e) => setEditBatchBody(e.target.value)}
//                   className="min-h-[150px]"
//                   disabled={isUpdatingBatch}
//                   placeholder="Enter updated message body..."
//                 />
//               </div>
//             </div>
//           )}
//           <DialogFooter className="mt-2">
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant="outline"
//                 disabled={isUpdatingBatch}
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               type="button"
//               onClick={handleUpdateBatch}
//               disabled={
//                 isUpdatingBatch ||
//                 !editBatchSubject.trim() ||
//                 !editBatchBody.trim() ||
//                 (!fullEditBodyFetched && editingBatch != null)
//               }
//             >
//               {isUpdatingBatch ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 <Pencil className="mr-2 h-4 w-4" />
//               )}
//               {isUpdatingBatch ? "Saving..." : "Save Changes"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Batch Confirmation Dialog */}
//       <Dialog
//         open={!!showDeleteConfirm}
//         onOpenChange={(isOpen) => !isOpen && closeDeleteConfirmation()}
//       >
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-lg font-semibold">
//               Confirm Batch Deletion
//             </DialogTitle>
//             <DialogDescription className="mt-2 text-sm text-muted-foreground">
//               Delete all{" "}
//               <strong className="text-foreground">
//                 {showDeleteConfirm?.recipientCount ?? 0}
//               </strong>{" "}
//               messages in this broadcast? This cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-3 text-sm">
//             <p>
//               <strong className="text-foreground">Subject:</strong>{" "}
//               {showDeleteConfirm?.subject}
//             </p>
//             <p>
//               <strong className="text-foreground">Sent:</strong>{" "}
//               {formatDate(showDeleteConfirm?.sentAt)}
//             </p>
//             <p>
//               <strong className="text-foreground">Batch ID:</strong>{" "}
//               {showDeleteConfirm?.batchId.substring(0, 13)}...
//             </p>
//           </div>
//           <DialogFooter className="mt-4">
//             <DialogClose asChild>
//               <Button type="button" variant="outline">
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={handleDeleteBatch}
//               disabled={deletingBatchId === showDeleteConfirm?.batchId}
//             >
//               {deletingBatchId === showDeleteConfirm?.batchId ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 <Trash2 className="mr-2 h-4 w-4" />
//               )}
//               Delete Entire Batch
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminSendAllMessagePage;

// // frontend/src/app/(admin)/admin/messages/send/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { format, formatDistanceToNow } from "date-fns"; // Keep this import for the function
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse,
//   UpdateBatchPayload,
// } from "../../../services/admin/inbox";
// import { cn } from "@/lib/utils";

// // Icons
// import {
//   AlertCircle,
//   Loader2,
//   MessageSquareText,
//   Trash2,
//   Pencil,
//   X,
// } from "lucide-react";

// // Import the components
// import ComposeBroadcastForm from "../../components/message/send/ComposeBroadcastForm";
// import BroadcastHistoryTable from "../../components/message/send/BroadcastHistoryTable";

// // --- Define formatDate directly in this file ---
// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };
// // --- End function definition ---

// const BATCHES_PER_PAGE = 5;

// // Main Page Component
// const AdminSendAllMessagePage: React.FC = () => {
//   // ... (rest of the state declarations remain the same)
//   const router = useRouter();
//   const { isAdmin, loading: authLoading } = useAuth();

//   // State for Composing
//   const [subject, setSubject] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);
//   const [sendError, setSendError] = useState<string | null>(null);

//   // State for History
//   const [batchesData, setBatchesData] = useState<BroadcastBatchListResponse | null>(null);
//   const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
//   const [batchesError, setBatchesError] = useState<string | null>(null);
//   const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

//   // State for Deleting
//   const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<BroadcastBatchInfo | null>(null);

//   // State for Editing
//   const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(null);
//   const [editBatchSubject, setEditBatchSubject] = useState<string>("");
//   const [editBatchBody, setEditBatchBody] = useState<string>("");
//   const [showEditBatchDialog, setShowEditBatchDialog] = useState<boolean>(false);
//   const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
//   const [fullEditBodyFetched, setFullEditBodyFetched] = useState<boolean>(false);

//   // ... (rest of the functions: fetchBatches, useEffect, auth checks, handleSendMessage, etc. remain the same)
//    const fetchBatches = useCallback(
//     async (page: number) => {
//         // ... implementation
//         if (!isAdmin) return;
//         setBatchesLoading(true);
//         setBatchesError(null);
//         try {
//             const data = await inboxAdminService.getBroadcastBatchesAdmin(
//                 page,
//                 BATCHES_PER_PAGE
//             );
//             setBatchesData(data);
//              if (data.currentPage !== page) {
//                setTimeout(() => setBatchCurrentPage(data.currentPage), 0);
//             }
//         } catch (err: any) {
//             console.error("Error fetching broadcast batches:", err);
//             setBatchesError(err.message || "Failed to load broadcast history.");
//             setBatchesData(null);
//         } finally {
//             setBatchesLoading(false);
//         }
//     },
//     [isAdmin]
// );

//   useEffect(() => {
//     // ... implementation
//      if (!authLoading && isAdmin) {
//       fetchBatches(batchCurrentPage);
//     }
//      if (!isAdmin && !authLoading) {
//        setBatchesData(null); // Clear data if not admin
//        setBatchesLoading(false);
//      }
//   }, [authLoading, isAdmin, batchCurrentPage, fetchBatches]);

//    if (authLoading) {
//       // ... implementation
//         return (
//         <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
//           <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//           <span className="ml-2 text-lg">Loading...</span>
//         </div>
//       );
//    }
//    if (!isAdmin) {
//       // ... implementation
//        return (
//         <div className="container mx-auto px-4 py-12">
//           <div className="max-w-lg mx-auto p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//               <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//               <div>
//                   <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Access Denied</h3>
//                   <p className="text-sm text-red-700 dark:text-red-300 mt-1">
//                   You do not have permissions to view this page. Administrator privileges required.
//                   </p>
//               </div>
//           </div>
//         </div>
//       );
//    }

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//      // ... implementation
//      e.preventDefault(); // Prevent default form submission
//      setSendError(null);
//      setIsSending(true);
//      try {
//       const result = await inboxAdminService.sendMessageToAllAdmin(
//         subject.trim(),
//         body.trim()
//       );
//       toast.success("Broadcast Sent", {
//         description: result.message || `Message queued for ${result.totalAttempted} users.`,
//       });
//       setSubject(""); // Clear form
//       setBody("");
//       if (batchCurrentPage !== 1) setBatchCurrentPage(1); // Go to first page of history
//       else fetchBatches(1); // Refresh first page
//     } catch (err: any) {
//       const errorMsg = err.message || "Failed to send broadcast.";
//       setSendError(errorMsg);
//       toast.error("Sending Failed", { description: errorMsg });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const goToBatchPage = (newPage: number) => {
//       // ... implementation
//       if ( newPage > 0 && newPage !== batchCurrentPage && (!batchesData || newPage <= batchesData.totalPages)) {
//          setBatchCurrentPage(newPage);
//      }
//   };
//   const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
//   const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1);
//   const handleRefreshBatches = () => {
//       // ... implementation
//      if (!batchesLoading) fetchBatches(batchCurrentPage);
//   };

//   const openDeleteConfirmation = (batch: BroadcastBatchInfo) => setShowDeleteConfirm(batch);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteBatch = async () => {
//      // ... implementation
//      if (!showDeleteConfirm) return;
//     const batchIdToDelete = showDeleteConfirm.batchId;
//     setDeletingBatchId(batchIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       const result = await inboxAdminService.deleteBroadcastBatchAdmin(batchIdToDelete);
//       toast.success("Batch Deleted", { description: result.message || `Deleted ${result.deletedCount} messages.` });
//       const wasLastItem = batchesData?.batches.length === 1 && batchCurrentPage > 1;
//       const pageToFetch = wasLastItem ? batchCurrentPage - 1 : batchCurrentPage;
//       if (wasLastItem) setBatchCurrentPage(pageToFetch);
//       else fetchBatches(pageToFetch);
//     } catch (err: any) {
//       toast.error("Failed to delete batch", { description: err.message });
//     } finally {
//       setDeletingBatchId(null);
//     }
//   };

//   const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
//     // ... implementation
//       setEditingBatch(batch);
//     setEditBatchSubject(batch.subject);
//     setShowEditBatchDialog(true);
//     setFullEditBodyFetched(false);
//     setEditBatchBody("Loading full message body...");

//     try {
//       // TODO: Replace with actual API call if needed:
//       // const fullMessage = await inboxAdminService.getSampleMessageFromBatch(batch.batchId);
//       // setEditBatchBody(fullMessage.body);
//        setEditBatchBody(batch.bodySnippet.endsWith('...') ? batch.bodySnippet.slice(0, -3) : batch.bodySnippet); // Use snippet for now
//       setFullEditBodyFetched(true);
//     } catch (error) {
//       console.error("Failed to fetch full body for edit:", error);
//       setEditBatchBody(batch.bodySnippet + "\n\n--- (Error fetching full body, snippet shown) ---");
//       toast.error("Could not load full message body for editing.");
//       setFullEditBodyFetched(true);
//     }
//   };

//   const closeEditBatchDialog = () => {
//     // ... implementation
//      setShowEditBatchDialog(false);
//     setEditingBatch(null);
//     setEditBatchSubject("");
//     setEditBatchBody("");
//     setIsUpdatingBatch(false);
//     setFullEditBodyFetched(false);
//   };

//   const handleUpdateBatch = async () => {
//     // ... implementation
//      if (!editingBatch || isUpdatingBatch) return;
//     if (!editBatchSubject.trim() || !editBatchBody.trim()) {
//        toast.error("Validation Error", { description: "Subject and Body cannot be empty." });
//        return;
//     }
//     setIsUpdatingBatch(true);
//     const payload: UpdateBatchPayload = {
//       subject: editBatchSubject.trim(),
//       body: editBatchBody.trim(),
//     };
//     try {
//       const result = await inboxAdminService.updateBroadcastBatchAdmin(editingBatch.batchId, payload);
//       toast.success("Batch Updated", { description: result.message || `Updated ${result.modifiedCount} messages.` });
//       closeEditBatchDialog();
//       fetchBatches(batchCurrentPage); // Refresh the list
//     } catch (err: any) {
//       toast.error("Failed to update batch", { description: err.message });
//     } finally {
//       setIsUpdatingBatch(false); // Ensure this is reset even on error
//     }
//   };

//   // --- Main Page Render ---
//   return (
//     <div className="container mx-auto px-4 lg:px-8 py-8">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-mainheading dark:text-white inline-flex items-center gap-2">
//           <MessageSquareText className="size-6 text-primary" />
//           Send Broadcast Message
//         </h1>
//         <p className="text-gray-500 dark:text-gray-300">
//           Compose and send messages to all users, and manage past broadcasts.
//         </p>
//       </div>

//       {/* Compose Form Component */}
//       <ComposeBroadcastForm
//         subject={subject}
//         onSubjectChange={setSubject}
//         body={body}
//         onBodyChange={setBody}
//         isSending={isSending}
//         sendError={sendError}
//         onSubmit={handleSendMessage}
//       />

//       {/* History Table Component */}
//       <BroadcastHistoryTable
//         batchesData={batchesData}
//         isLoading={batchesLoading}
//         error={batchesError}
//         currentPage={batchCurrentPage}
//         deletingBatchId={deletingBatchId}
//         editingBatchId={editingBatch?.batchId ?? null}
//         isUpdatingBatch={isUpdatingBatch}
//         onRefresh={handleRefreshBatches}
//         onEdit={openEditBatchDialog}
//         onDelete={openDeleteConfirmation}
//         onPreviousPage={goToPreviousBatchPage}
//         onNextPage={goToNextBatchPage}
//       />

//        {/* Edit Batch Dialog (Modal) */}
//        {showEditBatchDialog && editingBatch && (
//          // ... Edit Dialog JSX remains the same
//          // It uses state variables like editBatchSubject, editBatchBody, etc.
//          // Button handlers call handleUpdateBatch and closeEditBatchDialog
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
//           <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//              {/* Header */}
//             <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
//                  <div className="flex-1 mr-4">
//                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Broadcast Message</h3>
//                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                         Modify subject and body. This will update messages for all recipients.
//                          <span className="block mt-1 text-xs">Batch ID: {editingBatch?.batchId.substring(0, 13)}...</span>
//                      </p>
//                  </div>
//                 <button
//                     type="button"
//                     onClick={closeEditBatchDialog}
//                     className={cn(
//                         "inline-flex items-center justify-center rounded-lg text-sm p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none",
//                         "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
//                     )}
//                     disabled={isUpdatingBatch}
//                 >
//                     <X className="w-5 h-5" /> <span className="sr-only">Close modal</span>
//                 </button>
//             </div>
//             {/* Body */}
//             {!fullEditBodyFetched ? (
//                  <div className="p-6 py-10 flex items-center justify-center text-gray-600 dark:text-gray-300">
//                     <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
//                     <span className="ml-2">Loading message details...</span>
//                  </div>
//             ) : (
//                 <div className="p-6 space-y-4">
//                     <div className="space-y-1.5">
//                         <label htmlFor="edit-batch-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
//                         <input id="edit-batch-subject" type="text" value={editBatchSubject} onChange={(e) => setEditBatchSubject(e.target.value)} disabled={isUpdatingBatch} maxLength={200} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50" />
//                     </div>
//                      <div className="space-y-1.5">
//                         <label htmlFor="edit-batch-body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Body</label>
//                         <textarea id="edit-batch-body" value={editBatchBody} onChange={(e) => setEditBatchBody(e.target.value)} className="min-h-[150px] block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50" disabled={isUpdatingBatch} placeholder="Enter updated message body..." rows={6} />
//                     </div>
//                 </div>
//              )}
//             {/* Footer */}
//              <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
//                  <button
//                     type="button"
//                     onClick={closeEditBatchDialog}
//                     disabled={isUpdatingBatch}
//                     className={cn(
//                         "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                         "h-10 px-4 py-2",
//                         "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-100"
//                     )}
//                  >
//                     Cancel
//                  </button>
//                  <button
//                     type="button"
//                     onClick={handleUpdateBatch}
//                     disabled={ isUpdatingBatch || !editBatchSubject.trim() || !editBatchBody.trim() || !fullEditBodyFetched }
//                      className={cn(
//                         "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                         "h-10 px-4 py-2",
//                         "bg-indigo-600 text-white hover:bg-indigo-700"
//                     )}
//                  >
//                     {isUpdatingBatch ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Pencil className="mr-2 h-4 w-4" />}
//                     {isUpdatingBatch ? "Saving..." : "Save Changes"}
//                  </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Batch Confirmation Dialog (Modal) */}
//       {showDeleteConfirm && (
//         // ... Delete Dialog JSX remains the same
//         // It uses showDeleteConfirm for data and deletingBatchId for button state
//         // Buttons call handleDeleteBatch and closeDeleteConfirmation
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
//            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
//               {/* Header */}
//               <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Batch Deletion</h3>
//                  <button
//                     type="button"
//                     onClick={closeDeleteConfirmation}
//                      className={cn(
//                         "inline-flex items-center justify-center rounded-lg text-sm p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none",
//                         "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
//                     )}
//                     disabled={deletingBatchId === showDeleteConfirm?.batchId}
//                 >
//                     <X className="w-5 h-5" /> <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               {/* Body */}
//               <div className="p-6 space-y-3">
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Delete all <strong className="text-gray-800 dark:text-gray-200">{showDeleteConfirm?.recipientCount ?? 0}</strong> messages in this broadcast?
//                       <span className="font-medium text-red-600 dark:text-red-400 block mt-1">This action cannot be undone.</span>
//                   </p>
//                   {/* Use the locally defined formatDate here */}
//                   <div className="text-sm space-y-1 border-t pt-3 mt-3 dark:border-gray-600">
//                       <p><strong className="text-gray-700 dark:text-gray-300">Subject:</strong> {showDeleteConfirm?.subject}</p>
//                       <p><strong className="text-gray-700 dark:text-gray-300">Sent:</strong> {formatDate(showDeleteConfirm?.sentAt)}</p>
//                       <p><strong className="text-gray-700 dark:text-gray-300">Batch ID:</strong> {showDeleteConfirm?.batchId.substring(0, 13)}...</p>
//                   </div>
//               </div>
//               {/* Footer */}
//               <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
//                   <button
//                     type="button"
//                     onClick={closeDeleteConfirmation}
//                     disabled={deletingBatchId === showDeleteConfirm?.batchId}
//                     className={cn(
//                         "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                         "h-10 px-4 py-2",
//                         "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-100"
//                     )}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleDeleteBatch}
//                     disabled={deletingBatchId === showDeleteConfirm?.batchId}
//                     className={cn(
//                         "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:pointer-events-none",
//                         "h-10 px-4 py-2",
//                         "bg-red-600 text-white hover:bg-red-700"
//                     )}
//                   >
//                       {deletingBatchId === showDeleteConfirm?.batchId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
//                       Delete Entire Batch
//                   </button>
//               </div>
//            </div>
//          </div>
//       )}

//     </div>
//   );
// };

// export default AdminSendAllMessagePage;

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { format } from "date-fns"; // Keep this import for the function
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse,
//   UpdateBatchPayload,
// } from "../../../services/admin/inbox";
// // Removed cn from here as it's used in modals

// // Icons
// import {
//   AlertCircle,
//   Loader2,
//   MessageSquareText,
//   // Trash2, Pencil, X - Icons moved to respective modals
// } from "lucide-react";

// // Import the components
// import ComposeBroadcastForm from "../../components/message/send/ComposeBroadcastForm";
// import BroadcastHistoryTable from "../../components/message/send/BroadcastHistoryTable";
// import EditBroadcastBatchModal from "../../components/message/send/EditBroadcastBatchModal";
// import DeleteBroadcastBatchModal from "../../components/message/send/DeleteBroadcastBatchModal";
// import { FaPaperPlane } from "react-icons/fa";

// // --- Define formatDate directly in this file ---
// // This function will be passed as a prop to DeleteBroadcastBatchModal
// const formatDateForDisplay = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };
// // --- End function definition ---

// const BATCHES_PER_PAGE = 5;

// // Main Page Component
// const AdminSendAllMessagePage: React.FC = () => {
//   const router = useRouter();
//   const { isAdmin, loading: authLoading } = useAuth();

//   // State for Composing
//   const [subject, setSubject] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);
//   const [sendError, setSendError] = useState<string | null>(null);

//   // State for History
//   const [batchesData, setBatchesData] =
//     useState<BroadcastBatchListResponse | null>(null);
//   const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
//   const [batchesError, setBatchesError] = useState<string | null>(null);
//   const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

//   // State for Deleting
//   const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<BroadcastBatchInfo | null>(null);

//   // State for Editing
//   const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(
//     null
//   );
//   const [editBatchSubject, setEditBatchSubject] = useState<string>("");
//   const [editBatchBody, setEditBatchBody] = useState<string>("");
//   const [showEditBatchDialog, setShowEditBatchDialog] =
//     useState<boolean>(false);
//   const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
//   const [fullEditBodyFetched, setFullEditBodyFetched] =
//     useState<boolean>(false);

//   const fetchBatches = useCallback(
//     async (page: number) => {
//       if (!isAdmin) return;
//       setBatchesLoading(true);
//       setBatchesError(null);
//       try {
//         const data = await inboxAdminService.getBroadcastBatchesAdmin(
//           page,
//           BATCHES_PER_PAGE
//         );
//         setBatchesData(data);
//         if (data.currentPage !== page) {
//           setTimeout(() => setBatchCurrentPage(data.currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Error fetching broadcast batches:", err);
//         setBatchesError(err.message || "Failed to load broadcast history.");
//         setBatchesData(null);
//       } finally {
//         setBatchesLoading(false);
//       }
//     },
//     [isAdmin]
//   );

//   useEffect(() => {
//     if (!authLoading && isAdmin) {
//       fetchBatches(batchCurrentPage);
//     }
//     if (!isAdmin && !authLoading) {
//       setBatchesData(null);
//       setBatchesLoading(false);
//     }
//   }, [authLoading, isAdmin, batchCurrentPage, fetchBatches]);

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//         <span className="ml-2 text-lg">Loading...</span>
//       </div>
//     );
//   }
//   if (!isAdmin) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <div className="max-w-lg mx-auto p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//           <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//           <div>
//             <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
//               Access Denied
//             </h3>
//             <p className="text-sm text-red-700 dark:text-red-300 mt-1">
//               You do not have permissions to view this page. Administrator
//               privileges required.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSendError(null);
//     setIsSending(true);
//     try {
//       const result = await inboxAdminService.sendMessageToAllAdmin(
//         subject.trim(),
//         body.trim()
//       );
//       toast.success("Broadcast Sent", {
//         description:
//           result.message ||
//           `Message queued for ${result.totalAttempted} users.`,
//       });
//       setSubject("");
//       setBody("");
//       if (batchCurrentPage !== 1) setBatchCurrentPage(1);
//       else fetchBatches(1);
//     } catch (err: any) {
//       const errorMsg = err.message || "Failed to send broadcast.";
//       setSendError(errorMsg);
//       toast.error("Sending Failed", { description: errorMsg });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const goToBatchPage = (newPage: number) => {
//     if (
//       newPage > 0 &&
//       newPage !== batchCurrentPage &&
//       (!batchesData || newPage <= batchesData.totalPages)
//     ) {
//       setBatchCurrentPage(newPage);
//     }
//   };
//   const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
//   const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1);
//   const handleRefreshBatches = () => {
//     if (!batchesLoading) fetchBatches(batchCurrentPage);
//   };

//   const openDeleteConfirmation = (batch: BroadcastBatchInfo) =>
//     setShowDeleteConfirm(batch);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteBatch = async () => {
//     if (!showDeleteConfirm) return;
//     const batchIdToDelete = showDeleteConfirm.batchId;
//     setDeletingBatchId(batchIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       const result = await inboxAdminService.deleteBroadcastBatchAdmin(
//         batchIdToDelete
//       );
//       toast.success("Batch Deleted", {
//         description:
//           result.message || `Deleted ${result.deletedCount} messages.`,
//       });
//       const wasLastItem =
//         batchesData?.batches.length === 1 && batchCurrentPage > 1;
//       const pageToFetch = wasLastItem ? batchCurrentPage - 1 : batchCurrentPage;
//       if (wasLastItem) setBatchCurrentPage(pageToFetch);
//       else fetchBatches(pageToFetch);
//     } catch (err: any) {
//       toast.error("Failed to delete batch", { description: err.message });
//     } finally {
//       setDeletingBatchId(null);
//     }
//   };

//   const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
//     setEditingBatch(batch);
//     setEditBatchSubject(batch.subject);
//     setShowEditBatchDialog(true);
//     setFullEditBodyFetched(false);
//     setEditBatchBody("Loading full message body...");

//     try {
//       // In a real scenario, you might fetch the full body if the snippet is truncated.
//       // For now, we assume the snippet is sufficient or use a placeholder.
//       // const fullMessage = await inboxAdminService.getSampleMessageFromBatch(batch.batchId);
//       // setEditBatchBody(fullMessage.body);
//       setEditBatchBody(
//         batch.bodySnippet.endsWith("...")
//           ? batch.bodySnippet.slice(0, -3)
//           : batch.bodySnippet
//       );
//       setFullEditBodyFetched(true);
//     } catch (error) {
//       console.error("Failed to fetch full body for edit:", error);
//       setEditBatchBody(
//         batch.bodySnippet +
//           "\n\n--- (Error fetching full body, snippet shown) ---"
//       );
//       toast.error("Could not load full message body for editing.");
//       setFullEditBodyFetched(true); // Still allow editing of snippet
//     }
//   };

//   const closeEditBatchDialog = () => {
//     setShowEditBatchDialog(false);
//     setEditingBatch(null);
//     setEditBatchSubject("");
//     setEditBatchBody("");
//     setIsUpdatingBatch(false); // Reset updating state
//     setFullEditBodyFetched(false);
//   };

//   const handleUpdateBatch = async () => {
//     if (!editingBatch || isUpdatingBatch) return;
//     if (!editBatchSubject.trim() || !editBatchBody.trim()) {
//       toast.error("Validation Error", {
//         description: "Subject and Body cannot be empty.",
//       });
//       return;
//     }
//     setIsUpdatingBatch(true);
//     const payload: UpdateBatchPayload = {
//       subject: editBatchSubject.trim(),
//       body: editBatchBody.trim(),
//     };
//     try {
//       const result = await inboxAdminService.updateBroadcastBatchAdmin(
//         editingBatch.batchId,
//         payload
//       );
//       toast.success("Batch Updated", {
//         description:
//           result.message || `Updated ${result.modifiedCount} messages.`,
//       });
//       closeEditBatchDialog();
//       fetchBatches(batchCurrentPage);
//     } catch (err: any) {
//       toast.error("Failed to update batch", { description: err.message });
//       // setIsUpdatingBatch(false); // Already in finally
//     } finally {
//       setIsUpdatingBatch(false);
//     }
//   };

//   // --- Main Page Render ---
//   return (
//     <div className="container mx-auto px-4 py-5">
//       <div className="Send mb-5">
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//             <FaPaperPlane className="size-6 text-mainheading dark:text-primary" />
//           </div>

//           <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//             Send Broadcast Message
//           </h1>
//         </div>

//         <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//           Broadcast messages allow administrators to quickly and efficiently
//           communicate important updates, alerts, or announcements to all users
//           at once
//         </p>
//       </div>

//       {/* Compose Form Component */}
//       <ComposeBroadcastForm
//         subject={subject}
//         onSubjectChange={setSubject}
//         body={body}
//         onBodyChange={setBody}
//         isSending={isSending}
//         sendError={sendError}
//         onSubmit={handleSendMessage}
//       />

//       {/* History Table Component */}
//       <BroadcastHistoryTable
//         batchesData={batchesData}
//         isLoading={batchesLoading}
//         error={batchesError}
//         currentPage={batchCurrentPage}
//         deletingBatchId={deletingBatchId}
//         editingBatchId={editingBatch?.batchId ?? null}
//         isUpdatingBatch={isUpdatingBatch}
//         onRefresh={handleRefreshBatches}
//         onEdit={openEditBatchDialog}
//         onDelete={openDeleteConfirmation}
//         onPreviousPage={goToPreviousBatchPage}
//         onNextPage={goToNextBatchPage}
//       />

//       {/* Edit Batch Dialog (Modal Component) */}
//       <EditBroadcastBatchModal
//         isOpen={showEditBatchDialog}
//         onClose={closeEditBatchDialog}
//         batchToEdit={editingBatch}
//         editSubject={editBatchSubject}
//         onSubjectChange={setEditBatchSubject}
//         editBody={editBatchBody}
//         onBodyChange={setEditBatchBody}
//         onUpdate={handleUpdateBatch}
//         isUpdating={isUpdatingBatch}
//         fullBodyFetched={fullEditBodyFetched}
//       />

//       {/* Delete Batch Confirmation Dialog (Modal Component) */}
//       <DeleteBroadcastBatchModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         batchToDelete={showDeleteConfirm}
//         onDelete={handleDeleteBatch}
//         isDeleting={deletingBatchId === showDeleteConfirm?.batchId}
//         formatDateForDisplay={formatDateForDisplay} // Pass the formatting function
//       />
//     </div>
//   );
// };

// export default AdminSendAllMessagePage;

// frontend/src/app/(admin)/admin/messages/send/page.tsx

// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse, // This type is still used for batchesData state
//   UpdateBatchPayload,
// } from "../../../services/admin/inbox";

// import { AlertCircle, Loader2 } from "lucide-react";

// import ComposeBroadcastForm from "../../components/message/send/ComposeBroadcastForm";
// import BroadcastHistoryTable, {
//   BroadcastSortField,
// } from "../../components/message/send/BroadcastHistoryTable";
// import EditBroadcastBatchModal from "../../components/message/send/EditBroadcastBatchModal";
// import DeleteBroadcastBatchModal from "../../components/message/send/DeleteBroadcastBatchModal";
// import { FaPaperPlane } from "react-icons/fa";

// const formatDateForDisplay = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const BATCHES_PER_PAGE = 5;

// const AdminSendAllMessagePage: React.FC = () => {
//   const router = useRouter();
//   const { isAdmin, loading: authLoading } = useAuth();

//   const [subject, setSubject] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);
//   const [sendError, setSendError] = useState<string | null>(null);

//   const [batchesData, setBatchesData] =
//     useState<BroadcastBatchListResponse | null>(null);
//   const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
//   const [batchesError, setBatchesError] = useState<string | null>(null);
//   const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

//   const [broadcastSortField, setBroadcastSortField] =
//     useState<BroadcastSortField | null>("sentAt");
//   const [broadcastSortDirection, setBroadcastSortDirection] = useState<
//     "asc" | "desc"
//   >("desc");

//   const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<BroadcastBatchInfo | null>(null);

//   const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(
//     null
//   );
//   const [editBatchSubject, setEditBatchSubject] = useState<string>("");
//   const [editBatchBody, setEditBatchBody] = useState<string>("");
//   const [showEditBatchDialog, setShowEditBatchDialog] =
//     useState<boolean>(false);
//   const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
//   const [fullEditBodyFetched, setFullEditBodyFetched] =
//     useState<boolean>(false);

//   const fetchBatches = useCallback(
//     async (page: number) => {
//       if (!isAdmin) return;
//       setBatchesLoading(true);
//       setBatchesError(null);
//       try {
//         const data = await inboxAdminService.getBroadcastBatchesAdmin(
//           page,
//           BATCHES_PER_PAGE
//         );
//         setBatchesData(data);
//         if (data.currentPage !== page && data.totalPages > 0) {
//           if (data.currentPage <= data.totalPages) {
//             setBatchCurrentPage(data.currentPage);
//           } else if (data.totalPages > 0) {
//             setBatchCurrentPage(data.totalPages);
//           } else {
//             setBatchCurrentPage(1);
//           }
//         } else if (page > data.totalPages && data.totalPages > 0) {
//           setBatchCurrentPage(data.totalPages);
//         } else if (data.totalPages === 0) {
//           setBatchCurrentPage(1);
//         }
//       } catch (err: any) {
//         console.error("Error fetching broadcast batches:", err);
//         setBatchesError(err.message || "Failed to load broadcast history.");
//         setBatchesData(null);
//       } finally {
//         setBatchesLoading(false);
//       }
//     },
//     [isAdmin]
//   );

//   useEffect(() => {
//     if (!authLoading && isAdmin) {
//       fetchBatches(batchCurrentPage);
//     }
//     if (!isAdmin && !authLoading) {
//       setBatchesData(null);
//       setBatchesLoading(false);
//       setBatchesError("Administrator privileges required.");
//     }
//   }, [authLoading, isAdmin, batchCurrentPage, fetchBatches]);

//   const sortedBatches = useMemo(() => {
//     if (!batchesData?.batches) return [];
//     const sortableBatches = [...batchesData.batches];

//     if (broadcastSortField) {
//       sortableBatches.sort((a, b) => {
//         let valA: any, valB: any;

//         switch (broadcastSortField) {
//           case "sentAt":
//             valA = new Date(a.sentAt).getTime();
//             valB = new Date(b.sentAt).getTime();
//             break;
//           case "subject":
//             valA = (a.subject || "").toLowerCase();
//             valB = (b.subject || "").toLowerCase();
//             break;
//           case "recipientCount":
//             valA = a.recipientCount;
//             valB = b.recipientCount;
//             break;
//           default:
//             return 0;
//         }

//         let comparison = 0;
//         if (isNaN(valA) && isNaN(valB)) comparison = 0;
//         else if (isNaN(valA))
//           comparison = broadcastSortDirection === "asc" ? 1 : -1;
//         else if (isNaN(valB))
//           comparison = broadcastSortDirection === "asc" ? -1 : 1;
//         else if (valA < valB) comparison = -1;
//         else if (valA > valB) comparison = 1;

//         return broadcastSortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     return sortableBatches;
//   }, [batchesData?.batches, broadcastSortField, broadcastSortDirection]);

//   const handleBroadcastSort = (field: BroadcastSortField) => {
//     const newDirection =
//       broadcastSortField === field && broadcastSortDirection === "asc"
//         ? "desc"
//         : "asc";
//     setBroadcastSortField(field);
//     setBroadcastSortDirection(newDirection);
//   };

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//         <span className="ml-2 text-lg">Loading...</span>
//       </div>
//     );
//   }
//   if (!isAdmin) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <div className="max-w-lg mx-auto p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//           <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//           <div>
//             <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
//               Access Denied
//             </h3>
//             <p className="text-sm text-red-700 dark:text-red-300 mt-1">
//               You do not have permissions to view this page. Administrator
//               privileges required.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSendError(null);
//     setIsSending(true);
//     try {
//       const result = await inboxAdminService.sendMessageToAllAdmin(
//         subject.trim(),
//         body.trim()
//       );
//       toast.success("Broadcast Sent", {
//         description:
//           result.message ||
//           `Message queued for ${result.totalAttempted} users.`,
//       });
//       setSubject("");
//       setBody("");
//       if (batchCurrentPage !== 1) setBatchCurrentPage(1);
//       else fetchBatches(1);
//     } catch (err: any) {
//       const errorMsg = err.message || "Failed to send broadcast.";
//       setSendError(errorMsg);
//       toast.error("Sending Failed", { description: errorMsg });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const goToBatchPage = (newPage: number) => {
//     if (
//       newPage > 0 &&
//       newPage !== batchCurrentPage &&
//       (!batchesData || newPage <= batchesData.totalPages)
//     ) {
//       setBatchCurrentPage(newPage);
//     }
//   };
//   const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
//   const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1);
//   const handleRefreshBatches = () => {
//     if (!batchesLoading) fetchBatches(batchCurrentPage);
//   };

//   const openDeleteConfirmation = (batch: BroadcastBatchInfo) =>
//     setShowDeleteConfirm(batch);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteBatch = async () => {
//     if (!showDeleteConfirm) return;
//     const batchIdToDelete = showDeleteConfirm.batchId;
//     setDeletingBatchId(batchIdToDelete);
//     try {
//       const result = await inboxAdminService.deleteBroadcastBatchAdmin(
//         batchIdToDelete
//       );
//       toast.success("Batch Deleted", {
//         description:
//           result.message || `Deleted ${result.deletedCount} messages.`,
//       });
//       const wasLastItemOnPage =
//         sortedBatches.length === 1 && batchCurrentPage > 1;
//       const pageToFetch = wasLastItemOnPage
//         ? batchCurrentPage - 1
//         : batchCurrentPage;

//       if (wasLastItemOnPage) {
//         setBatchCurrentPage(pageToFetch);
//       } else {
//         fetchBatches(pageToFetch);
//       }
//     } catch (err: any) {
//       toast.error("Failed to delete batch", { description: err.message });
//     } finally {
//       setDeletingBatchId(null);
//       closeDeleteConfirmation();
//     }
//   };

//   const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
//     setEditingBatch(batch);
//     setEditBatchSubject(batch.subject);
//     setShowEditBatchDialog(true);
//     setFullEditBodyFetched(false);
//     setEditBatchBody("Loading full message body...");

//     try {
//       setEditBatchBody(
//         batch.bodySnippet.endsWith("...")
//           ? batch.bodySnippet
//           : batch.bodySnippet
//       );
//       setFullEditBodyFetched(true);
//     } catch (error) {
//       console.error("Failed to fetch full body for edit:", error);
//       setEditBatchBody(
//         batch.bodySnippet +
//           "\n\n--- (Error fetching full body, snippet shown) ---"
//       );
//       toast.error("Could not load full message body for editing.");
//       setFullEditBodyFetched(true);
//     }
//   };

//   const closeEditBatchDialog = () => {
//     setShowEditBatchDialog(false);
//     setEditingBatch(null);
//     setEditBatchSubject("");
//     setEditBatchBody("");
//     setIsUpdatingBatch(false);
//     setFullEditBodyFetched(false);
//   };

//   const handleUpdateBatch = async () => {
//     if (!editingBatch || isUpdatingBatch) return;
//     if (!editBatchSubject.trim() || !editBatchBody.trim()) {
//       toast.error("Validation Error", {
//         description: "Subject and Body cannot be empty.",
//       });
//       return;
//     }
//     setIsUpdatingBatch(true);
//     const payload: UpdateBatchPayload = {
//       subject: editBatchSubject.trim(),
//       body: editBatchBody.trim(),
//     };
//     try {
//       const result = await inboxAdminService.updateBroadcastBatchAdmin(
//         editingBatch.batchId,
//         payload
//       );
//       toast.success("Batch Updated", {
//         description:
//           result.message || `Updated ${result.modifiedCount} messages.`,
//       });
//       closeEditBatchDialog();
//       fetchBatches(batchCurrentPage);
//     } catch (err: any) {
//       toast.error("Failed to update batch", { description: err.message });
//     } finally {
//       setIsUpdatingBatch(false);
//     }
//   };

//   function goToNextPage(): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className="container mx-auto px-4 py-5">
//       <div className="Send mb-5">
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//             <FaPaperPlane className="size-6 text-mainheading dark:text-primary" />
//           </div>
//           <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//             Send Broadcast Message
//           </h1>
//         </div>
//         <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//           Broadcast messages allow administrators to quickly and efficiently
//           communicate important updates, alerts, or announcements to all users
//           at once
//         </p>
//       </div>

//       <ComposeBroadcastForm
//         subject={subject}
//         onSubjectChange={setSubject}
//         body={body}
//         onBodyChange={setBody}
//         isSending={isSending}
//         sendError={sendError}
//         onSubmit={handleSendMessage}
//       />

//       <BroadcastHistoryTable
//         batches={sortedBatches}
//         totalPages={batchesData?.totalPages ?? 0}
//         // totalItems={batchesData?.totalItems ?? 0} // REMOVE THIS LINE
//         isLoading={batchesLoading}
//         error={batchesError}
//         currentPage={batchCurrentPage}
//         deletingBatchId={deletingBatchId}
//         editingBatchId={editingBatch?.batchId ?? null}
//         isUpdatingBatch={isUpdatingBatch}
//         onRefresh={handleRefreshBatches}
//         onEdit={openEditBatchDialog}
//         onDelete={openDeleteConfirmation}
//         onPreviousPage={goToPreviousBatchPage}
//         onNextPage={goToNextPage}
//         onSort={handleBroadcastSort}
//         sortField={broadcastSortField}
//         sortDirection={broadcastSortDirection}
//       />

//       <EditBroadcastBatchModal
//         isOpen={showEditBatchDialog}
//         onClose={closeEditBatchDialog}
//         batchToEdit={editingBatch}
//         editSubject={editBatchSubject}
//         onSubjectChange={setEditBatchSubject}
//         editBody={editBatchBody}
//         onBodyChange={setEditBatchBody}
//         onUpdate={handleUpdateBatch}
//         isUpdating={isUpdatingBatch}
//         fullBodyFetched={fullEditBodyFetched}
//       />

//       <DeleteBroadcastBatchModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         batchToDelete={showDeleteConfirm}
//         onDelete={handleDeleteBatch}
//         isDeleting={deletingBatchId === showDeleteConfirm?.batchId}
//         formatDateForDisplay={formatDateForDisplay}
//       />
//     </div>
//   );
// };

// export default AdminSendAllMessagePage;

// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse,
//   UpdateBatchPayload,
// } from "../../../services/admin/inbox";

// import { AlertCircle, Loader2 } from "lucide-react";

// import ComposeBroadcastForm from "../../components/message/send/ComposeBroadcastForm";
// import BroadcastHistoryTable, {
//   BroadcastSortField,
// } from "../../components/message/send/BroadcastHistoryTable";
// import EditBroadcastBatchModal from "../../components/message/send/EditBroadcastBatchModal";
// import DeleteBroadcastBatchModal from "../../components/message/send/DeleteBroadcastBatchModal";
// import { FaPaperPlane } from "react-icons/fa";

// const formatDateForDisplay = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const BATCHES_PER_PAGE = 5;

// const AdminSendAllMessagePage: React.FC = () => {
//   const router = useRouter();
//   const { isAdmin, loading: authLoading } = useAuth();

//   const [subject, setSubject] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);
//   const [sendError, setSendError] = useState<string | null>(null);

//   const [batchesData, setBatchesData] =
//     useState<BroadcastBatchListResponse | null>(null);
//   const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
//   const [batchesError, setBatchesError] = useState<string | null>(null);
//   const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

//   // Initialize sortField to null, so no icon is active by default.
//   // Default sort direction can be 'desc' for the first click on 'sentAt'.
//   const [broadcastSortField, setBroadcastSortField] =
//     useState<BroadcastSortField | null>(null);
//   const [broadcastSortDirection, setBroadcastSortDirection] = useState<
//     "asc" | "desc"
//   >("desc");

//   const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<BroadcastBatchInfo | null>(null);

//   const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(
//     null
//   );
//   const [editBatchSubject, setEditBatchSubject] = useState<string>("");
//   const [editBatchBody, setEditBatchBody] = useState<string>("");
//   const [showEditBatchDialog, setShowEditBatchDialog] =
//     useState<boolean>(false);
//   const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
//   const [fullEditBodyFetched, setFullEditBodyFetched] =
//     useState<boolean>(false);

//   const fetchBatches = useCallback(
//     async (page: number) => {
//       if (!isAdmin) return;
//       setBatchesLoading(true);
//       setBatchesError(null);
//       try {
//         const data = await inboxAdminService.getBroadcastBatchesAdmin(
//           page,
//           BATCHES_PER_PAGE
//         );
//         setBatchesData(data);
//         if (data.currentPage !== page && data.totalPages > 0) {
//           if (data.currentPage <= data.totalPages) {
//             setBatchCurrentPage(data.currentPage);
//           } else if (data.totalPages > 0) {
//             setBatchCurrentPage(data.totalPages);
//           } else {
//             setBatchCurrentPage(1);
//           }
//         } else if (page > data.totalPages && data.totalPages > 0) {
//           setBatchCurrentPage(data.totalPages);
//         } else if (data.totalPages === 0) {
//           setBatchCurrentPage(1);
//         }
//       } catch (err: any) {
//         console.error("Error fetching broadcast batches:", err);
//         setBatchesError(err.message || "Failed to load broadcast history.");
//         setBatchesData(null);
//       } finally {
//         setBatchesLoading(false);
//       }
//     },
//     [isAdmin]
//   );

//   useEffect(() => {
//     if (!authLoading && isAdmin) {
//       fetchBatches(batchCurrentPage);
//     }
//     if (!isAdmin && !authLoading) {
//       setBatchesData(null);
//       setBatchesLoading(false);
//       setBatchesError("Administrator privileges required.");
//     }
//   }, [authLoading, isAdmin, batchCurrentPage, fetchBatches]);

//   const sortedBatches = useMemo(() => {
//     if (!batchesData?.batches) return [];
//     const sortableBatches = [...batchesData.batches];

//     // Determine the effective sort field and direction
//     // Default to 'sentAt' descending if no user sort is active
//     const effectiveSortField = broadcastSortField ?? "sentAt";
//     const effectiveSortDirection = broadcastSortField
//       ? broadcastSortDirection
//       : "desc";

//     sortableBatches.sort((a, b) => {
//       let valA: any, valB: any;

//       switch (effectiveSortField) {
//         case "sentAt":
//           valA = new Date(a.sentAt).getTime();
//           valB = new Date(b.sentAt).getTime();
//           break;
//         // "subject" case removed as it's no longer sortable
//         case "recipientCount":
//           valA = a.recipientCount;
//           valB = b.recipientCount;
//           break;
//         default:
//           // Should not happen with typed BroadcastSortField
//           return 0;
//       }

//       let comparison = 0;
//       if (isNaN(valA) && isNaN(valB)) comparison = 0;
//       else if (isNaN(valA))
//         comparison = effectiveSortDirection === "asc" ? 1 : -1;
//       else if (isNaN(valB))
//         comparison = effectiveSortDirection === "asc" ? -1 : 1;
//       else if (valA < valB) comparison = -1;
//       else if (valA > valB) comparison = 1;

//       return effectiveSortDirection === "asc" ? comparison : comparison * -1;
//     });

//     return sortableBatches;
//   }, [batchesData?.batches, broadcastSortField, broadcastSortDirection]);

//   const handleBroadcastSort = (field: BroadcastSortField) => {
//     const newDirection =
//       broadcastSortField === field && broadcastSortDirection === "asc"
//         ? "desc"
//         : "asc";
//     setBroadcastSortField(field);
//     setBroadcastSortDirection(newDirection);
//   };

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//         <span className="ml-2 text-lg">Loading...</span>
//       </div>
//     );
//   }
//   if (!isAdmin) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <div className="max-w-lg mx-auto p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//           <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//           <div>
//             <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
//               Access Denied
//             </h3>
//             <p className="text-sm text-red-700 dark:text-red-300 mt-1">
//               You do not have permissions to view this page. Administrator
//               privileges required.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSendError(null);
//     setIsSending(true);
//     try {
//       const result = await inboxAdminService.sendMessageToAllAdmin(
//         subject.trim(),
//         body.trim()
//       );
//       toast.success("Broadcast Sent", {
//         description:
//           result.message ||
//           `Message queued for ${result.totalAttempted} users.`,
//       });
//       setSubject("");
//       setBody("");
//       if (batchCurrentPage !== 1) setBatchCurrentPage(1);
//       else fetchBatches(1);
//     } catch (err: any) {
//       const errorMsg = err.message || "Failed to send broadcast.";
//       setSendError(errorMsg);
//       toast.error("Sending Failed", { description: errorMsg });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const goToBatchPage = (newPage: number) => {
//     if (
//       newPage > 0 &&
//       newPage !== batchCurrentPage &&
//       (!batchesData || newPage <= batchesData.totalPages)
//     ) {
//       setBatchCurrentPage(newPage);
//     }
//   };
//   const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
//   const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1);
//   const handleRefreshBatches = () => {
//     if (!batchesLoading) fetchBatches(batchCurrentPage);
//   };

//   const openDeleteConfirmation = (batch: BroadcastBatchInfo) =>
//     setShowDeleteConfirm(batch);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteBatch = async () => {
//     if (!showDeleteConfirm) return;
//     const batchIdToDelete = showDeleteConfirm.batchId;
//     setDeletingBatchId(batchIdToDelete);
//     try {
//       const result = await inboxAdminService.deleteBroadcastBatchAdmin(
//         batchIdToDelete
//       );
//       toast.success("Batch Deleted", {
//         description:
//           result.message || `Deleted ${result.deletedCount} messages.`,
//       });
//       const wasLastItemOnPage =
//         sortedBatches.length === 1 && batchCurrentPage > 1;
//       const pageToFetch = wasLastItemOnPage
//         ? batchCurrentPage - 1
//         : batchCurrentPage;

//       if (wasLastItemOnPage) {
//         setBatchCurrentPage(pageToFetch);
//       } else {
//         fetchBatches(pageToFetch);
//       }
//     } catch (err: any) {
//       toast.error("Failed to delete batch", { description: err.message });
//     } finally {
//       setDeletingBatchId(null);
//       closeDeleteConfirmation();
//     }
//   };

//   const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
//     setEditingBatch(batch);
//     setEditBatchSubject(batch.subject);
//     setShowEditBatchDialog(true);
//     setFullEditBodyFetched(false);
//     setEditBatchBody("Loading full message body...");

//     try {
//       setEditBatchBody(
//         batch.bodySnippet.endsWith("...")
//           ? batch.bodySnippet
//           : batch.bodySnippet
//       );
//       setFullEditBodyFetched(true);
//     } catch (error) {
//       console.error("Failed to fetch full body for edit:", error);
//       setEditBatchBody(
//         batch.bodySnippet +
//           "\n\n--- (Error fetching full body, snippet shown) ---"
//       );
//       toast.error("Could not load full message body for editing.");
//       setFullEditBodyFetched(true);
//     }
//   };

//   const closeEditBatchDialog = () => {
//     setShowEditBatchDialog(false);
//     setEditingBatch(null);
//     setEditBatchSubject("");
//     setEditBatchBody("");
//     setIsUpdatingBatch(false);
//     setFullEditBodyFetched(false);
//   };

//   const handleUpdateBatch = async () => {
//     if (!editingBatch || isUpdatingBatch) return;
//     if (!editBatchSubject.trim() || !editBatchBody.trim()) {
//       toast.error("Validation Error", {
//         description: "Subject and Body cannot be empty.",
//       });
//       return;
//     }
//     setIsUpdatingBatch(true);
//     const payload: UpdateBatchPayload = {
//       subject: editBatchSubject.trim(),
//       body: editBatchBody.trim(),
//     };
//     try {
//       const result = await inboxAdminService.updateBroadcastBatchAdmin(
//         editingBatch.batchId,
//         payload
//       );
//       toast.success("Batch Updated", {
//         description:
//           result.message || `Updated ${result.modifiedCount} messages.`,
//       });
//       closeEditBatchDialog();
//       fetchBatches(batchCurrentPage);
//     } catch (err: any) {
//       toast.error("Failed to update batch", { description: err.message });
//     } finally {
//       setIsUpdatingBatch(false);
//     }
//   };

//   function goToNextPage(): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className="container mx-auto px-4 py-5">
//       <div className="Send mb-5">
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//             <FaPaperPlane className="size-6 text-mainheading dark:text-primary" />
//           </div>
//           <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//             Send Broadcast Message
//           </h1>
//         </div>
//         <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//           Broadcast messages allow administrators to quickly and efficiently
//           communicate important updates, alerts, or announcements to all users
//           at once
//         </p>
//       </div>

//       <ComposeBroadcastForm
//         subject={subject}
//         onSubjectChange={setSubject}
//         body={body}
//         onBodyChange={setBody}
//         isSending={isSending}
//         sendError={sendError}
//         onSubmit={handleSendMessage}
//       />

//       <BroadcastHistoryTable
//         batches={sortedBatches}
//         totalPages={batchesData?.totalPages ?? 0}
//         isLoading={batchesLoading}
//         error={batchesError}
//         currentPage={batchCurrentPage}
//         deletingBatchId={deletingBatchId}
//         editingBatchId={editingBatch?.batchId ?? null}
//         isUpdatingBatch={isUpdatingBatch}
//         onRefresh={handleRefreshBatches}
//         onEdit={openEditBatchDialog}
//         onDelete={openDeleteConfirmation}
//         onPreviousPage={goToPreviousBatchPage}
//         onNextPage={goToNextPage}
//         onSort={handleBroadcastSort}
//         sortField={broadcastSortField}
//         sortDirection={broadcastSortDirection}
//       />

//       <EditBroadcastBatchModal
//         isOpen={showEditBatchDialog}
//         onClose={closeEditBatchDialog}
//         batchToEdit={editingBatch}
//         editSubject={editBatchSubject}
//         onSubjectChange={setEditBatchSubject}
//         editBody={editBatchBody}
//         onBodyChange={setEditBatchBody}
//         onUpdate={handleUpdateBatch}
//         isUpdating={isUpdatingBatch}
//         fullBodyFetched={fullEditBodyFetched}
//       />

//       <DeleteBroadcastBatchModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         batchToDelete={showDeleteConfirm}
//         onDelete={handleDeleteBatch}
//         isDeleting={deletingBatchId === showDeleteConfirm?.batchId}
//         formatDateForDisplay={formatDateForDisplay}
//       />
//     </div>
//   );
// };

// export default AdminSendAllMessagePage;

// // frontend/src/app/admin/send/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { format } from "date-fns"; // Keep for date formatting if used elsewhere

// // Auth & Services
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse,
//   UpdateBatchPayload,
// } from "../../../services/admin/inbox";

// import { AlertCircle, Loader2 } from "lucide-react";

// import ComposeBroadcastForm from "../../components/message/send/ComposeBroadcastForm";
// import BroadcastHistoryTable, {
//   BroadcastSortField,
// } from "../../components/message/send/BroadcastHistoryTable";
// import EditBroadcastBatchModal from "../../components/message/send/EditBroadcastBatchModal";
// import DeleteBroadcastBatchModal from "../../components/message/send/DeleteBroadcastBatchModal";
// import { FaPaperPlane } from "react-icons/fa";

// // --- Import Custom Toast and react-toastify components ---
// import {
//   ToastContainer,
//   toast as reactToastifyToast,
//   Slide,
//   ToastContainerProps,
//   TypeOptions,
//   ToastOptions,
// } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CustomToast, { CustomToastProps } from "../../../components/CustomToast";

// const formatDateForDisplay = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const BATCHES_PER_PAGE = 1;

// const AdminSendAllMessagePage: React.FC = () => {
//   const router = useRouter();
//   const { isAdmin, loading: authLoading } = useAuth();

//   const [subject, setSubject] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);
//   // sendError state can be removed if errors are only shown via toast
//   // const [sendError, setSendError] = useState<string | null>(null);

//   const [batchesData, setBatchesData] =
//     useState<BroadcastBatchListResponse | null>(null);
//   const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
//   const [batchesError, setBatchesError] = useState<string | null>(null); // For persistent page errors
//   const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

//   const [broadcastSortField, setBroadcastSortField] =
//     useState<BroadcastSortField | null>(null);
//   const [broadcastSortDirection, setBroadcastSortDirection] = useState<
//     "asc" | "desc"
//   >("desc");

//   const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<BroadcastBatchInfo | null>(null);

//   const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(
//     null
//   );
//   const [editBatchSubject, setEditBatchSubject] = useState<string>("");
//   const [editBatchBody, setEditBatchBody] = useState<string>("");
//   const [showEditBatchDialog, setShowEditBatchDialog] =
//     useState<boolean>(false);
//   const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
//   const [fullEditBodyFetched, setFullEditBodyFetched] =
//     useState<boolean>(false);

//   const [isMobile, setIsMobile] = useState(false); // For ToastContainer

//   // --- Mobile Detection Effect (for ToastContainer) ---
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback(
//     (
//       message: string,
//       type?: CustomToastProps["type"],
//       toastSpecificOptions?: Partial<ToastOptions>
//     ) => {
//       const effectiveType = type || "default";
//       let progressClassName: string;
//       switch (effectiveType) {
//         case "success":
//           progressClassName = "toast-progress-success";
//           break;
//         case "error":
//           progressClassName = "toast-progress-error";
//           break;
//         case "info":
//           progressClassName = "toast-progress-info";
//           break;
//         case "warning":
//           progressClassName = "toast-progress-warning";
//           break;
//         default:
//           progressClassName = "toast-progress-default";
//           break;
//       }
//       reactToastifyToast(
//         <CustomToast message={message} type={effectiveType} />,
//         {
//           progressClassName,
//           type: effectiveType as TypeOptions,
//           icon: false,
//           ...toastSpecificOptions,
//         }
//       );
//     },
//     []
//   );

//   // --- ToastContainer Props and Style ---
//   const customToastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false,
//     closeButton: false,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () =>
//       "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
//   };

//   const getToastContainerStyle = (): React.CSSProperties & {
//     [key: `--${string}`]: string | number;
//   } => {
//     const baseStyle = { zIndex: 30 };
//     if (isMobile)
//       return {
//         ...baseStyle,
//         top: "1rem",
//         left: "1rem",
//         right: "1rem",
//         width: "auto",
//       };
//     return { ...baseStyle, top: "0.75rem", right: "0.75rem", width: "320px" };
//   };

//   const fetchBatches = useCallback(
//     async (page: number) => {
//       if (!isAdmin) return;
//       setBatchesLoading(true);
//       setBatchesError(null); // Clear persistent error before fetch
//       try {
//         const data = await inboxAdminService.getBroadcastBatchesAdmin(
//           page,
//           BATCHES_PER_PAGE
//         );
//         setBatchesData(data);
//         // Logic for setting current page based on API response (remains the same)
//         if (data.currentPage !== page && data.totalPages > 0) {
//           if (data.currentPage <= data.totalPages)
//             setBatchCurrentPage(data.currentPage);
//           else if (data.totalPages > 0) setBatchCurrentPage(data.totalPages);
//           else setBatchCurrentPage(1);
//         } else if (page > data.totalPages && data.totalPages > 0) {
//           setBatchCurrentPage(data.totalPages);
//         } else if (data.totalPages === 0) {
//           setBatchCurrentPage(1);
//         }
//       } catch (err: any) {
//         console.error("Error fetching broadcast batches:", err);
//         const errorMsg = err.message || "Failed to load broadcast history.";
//         setBatchesError(errorMsg); // Set persistent error
//         showToast(errorMsg, "error");
//         setBatchesData(null);
//       } finally {
//         setBatchesLoading(false);
//       }
//     },
//     [isAdmin, showToast] // Added showToast to dependencies
//   );

//   useEffect(() => {
//     if (!authLoading && isAdmin) {
//       fetchBatches(batchCurrentPage);
//     }
//     if (!isAdmin && !authLoading) {
//       setBatchesData(null);
//       setBatchesLoading(false);
//       const accessError = "Administrator privileges required.";
//       setBatchesError(accessError);
//       showToast(accessError, "error");
//     }
//   }, [authLoading, isAdmin, batchCurrentPage, fetchBatches, showToast]); // Added showToast

//   const sortedBatches = useMemo(() => {
//     if (!batchesData?.batches) return [];
//     const sortableBatches = [...batchesData.batches];
//     const effectiveSortField = broadcastSortField ?? "sentAt";
//     const effectiveSortDirection = broadcastSortField
//       ? broadcastSortDirection
//       : "desc";
//     sortableBatches.sort((a, b) => {
//       let valA: any, valB: any;
//       switch (effectiveSortField) {
//         case "sentAt":
//           valA = new Date(a.sentAt).getTime();
//           valB = new Date(b.sentAt).getTime();
//           break;
//         case "recipientCount":
//           valA = a.recipientCount;
//           valB = b.recipientCount;
//           break;
//         default:
//           return 0;
//       }
//       let comparison = 0;
//       if (isNaN(valA) && isNaN(valB)) comparison = 0;
//       else if (isNaN(valA))
//         comparison = effectiveSortDirection === "asc" ? 1 : -1;
//       else if (isNaN(valB))
//         comparison = effectiveSortDirection === "asc" ? -1 : 1;
//       else if (valA < valB) comparison = -1;
//       else if (valA > valB) comparison = 1;
//       return effectiveSortDirection === "asc" ? comparison : comparison * -1;
//     });
//     return sortableBatches;
//   }, [batchesData?.batches, broadcastSortField, broadcastSortDirection]);

//   const handleBroadcastSort = (field: BroadcastSortField) => {
//     const newDirection =
//       broadcastSortField === field && broadcastSortDirection === "asc"
//         ? "desc"
//         : "asc";
//     setBroadcastSortField(field);
//     setBroadcastSortDirection(newDirection);
//   };

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // setSendError(null); // No longer needed if only using toasts for sendError
//     setIsSending(true);
//     try {
//       const result = await inboxAdminService.sendMessageToAllAdmin(
//         subject.trim(),
//         body.trim()
//       );
//       showToast(
//         result.message || `Message queued for ${result.totalAttempted} users.`,
//         "success"
//       );
//       setSubject("");
//       setBody("");
//       if (batchCurrentPage !== 1) setBatchCurrentPage(1);
//       else fetchBatches(1); // Refetch to show the new batch
//     } catch (err: any) {
//       const errorMsg = err.message || "Failed to send broadcast.";
//       // setSendError(errorMsg); // No longer needed for form error display if toast is sufficient
//       showToast(errorMsg, "error");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const goToBatchPage = (newPage: number) => {
//     if (
//       newPage > 0 &&
//       newPage !== batchCurrentPage &&
//       (!batchesData || newPage <= batchesData.totalPages)
//     ) {
//       setBatchCurrentPage(newPage);
//     }
//   };
//   const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
//   const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1); // Corrected this line
//   const handleRefreshBatches = () => {
//     if (!batchesLoading) fetchBatches(batchCurrentPage);
//   };
//   const openDeleteConfirmation = (batch: BroadcastBatchInfo) =>
//     setShowDeleteConfirm(batch);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteBatch = async () => {
//     if (!showDeleteConfirm) return;
//     const batchIdToDelete = showDeleteConfirm.batchId;
//     setDeletingBatchId(batchIdToDelete);
//     try {
//       const result = await inboxAdminService.deleteBroadcastBatchAdmin(
//         batchIdToDelete
//       );
//       showToast(
//         result.message || `Deleted ${result.deletedCount} messages.`,
//         "success"
//       );
//       const wasLastItemOnPage =
//         sortedBatches.length === 1 && batchCurrentPage > 1;
//       const pageToFetch = wasLastItemOnPage
//         ? batchCurrentPage - 1
//         : batchCurrentPage;
//       if (wasLastItemOnPage) setBatchCurrentPage(pageToFetch);
//       else fetchBatches(pageToFetch);
//     } catch (err: any) {
//       showToast(`Failed to delete batch: ${err.message}`, "error");
//     } finally {
//       setDeletingBatchId(null);
//       closeDeleteConfirmation();
//     }
//   };

//   const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
//     setEditingBatch(batch);
//     setEditBatchSubject(batch.subject);
//     setShowEditBatchDialog(true);
//     setFullEditBodyFetched(false);
//     setEditBatchBody("Loading full message body...");
//     try {
//       // Assuming batch.bodySnippet is already the full body or you have a way to fetch it
//       // If not, this logic might need adjustment based on how full body is retrieved.
//       // For simplicity, if the snippet is the only available body, we use it.
//       setEditBatchBody(
//         batch.bodySnippet.endsWith("...")
//           ? batch.bodySnippet
//           : batch.bodySnippet
//       );
//       setFullEditBodyFetched(true);
//     } catch (error) {
//       console.error("Failed to fetch full body for edit:", error);
//       setEditBatchBody(
//         batch.bodySnippet +
//           "\n\n--- (Error fetching full body, snippet shown) ---"
//       );
//       showToast("Could not load full message body for editing.", "error");
//       setFullEditBodyFetched(true); // Set to true to allow editing of snippet if full fails
//     }
//   };

//   const closeEditBatchDialog = () => {
//     setShowEditBatchDialog(false);
//     setEditingBatch(null);
//     setEditBatchSubject("");
//     setEditBatchBody("");
//     setIsUpdatingBatch(false);
//     setFullEditBodyFetched(false);
//   };

//   const handleUpdateBatch = async () => {
//     if (!editingBatch || isUpdatingBatch) return;
//     if (!editBatchSubject.trim() || !editBatchBody.trim()) {
//       showToast("Subject and Body cannot be empty.", "error", {
//         toastId: "edit-validation-error",
//       });
//       return;
//     }
//     setIsUpdatingBatch(true);
//     const payload: UpdateBatchPayload = {
//       subject: editBatchSubject.trim(),
//       body: editBatchBody.trim(),
//     };
//     try {
//       const result = await inboxAdminService.updateBroadcastBatchAdmin(
//         editingBatch.batchId,
//         payload
//       );
//       showToast(
//         result.message || `Updated ${result.modifiedCount} messages.`,
//         "success"
//       );
//       closeEditBatchDialog();
//       fetchBatches(batchCurrentPage); // Refresh the list
//     } catch (err: any) {
//       showToast(`Failed to update batch: ${err.message}`, "error");
//     } finally {
//       setIsUpdatingBatch(false);
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-subheadingWhite relative">
//         <ToastContainer
//           {...customToastContainerProps}
//           style={getToastContainerStyle()}
//         />
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-2 text-lg">Loading...</span>
//       </div>
//     );
//   }
//   if (!isAdmin) {
//     // This handles the case where isAdmin is false after authLoading is done
//     return (
//       <div className="container mx-auto px-4 py-10 relative">
//         <ToastContainer
//           {...customToastContainerProps}
//           style={getToastContainerStyle()}
//         />
//         {/* The batchesError will display the "Administrator privileges required." message */}
//         {batchesError && (
//           <div className="max-w-lg mx-auto p-4 border bg-red-900/30 border-red-700 rounded-md flex items-start space-x-3">
//             <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
//             <div>
//               <h3 className="text-lg font-medium text-red-200">
//                 Access Denied
//               </h3>
//               <p className="text-sm text-red-300 mt-1">
//                 {batchesError}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <ToastContainer
//         {...customToastContainerProps}
//         style={getToastContainerStyle()}
//       />
//       <div className="Send mb-5">
//         <div className="flex items-center gap-3">
//           <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
//             <FaPaperPlane className="size-6 text-mainheading" />
//           </div>
//           <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
//             Send Broadcast Message
//           </h1>
//         </div>
//         <p className="mt-2 text-subheadingWhite lg:text-lg">
//           Broadcast messages allow administrators to quickly and efficiently
//           communicate important updates, alerts, or announcements to all users
//           at once
//         </p>
//       </div>

//       <ComposeBroadcastForm
//         subject={subject}
//         onSubjectChange={setSubject}
//         body={body}
//         onBodyChange={setBody}
//         isSending={isSending}
//         sendError={null} // sendError prop is kept for compatibility but error is shown via toast
//         onSubmit={handleSendMessage}
//       />

//       <BroadcastHistoryTable
//         batches={sortedBatches}
//         totalPages={batchesData?.totalPages ?? 0}
//         isLoading={batchesLoading}
//         error={batchesError}
//         currentPage={batchCurrentPage}
//         deletingBatchId={deletingBatchId}
//         editingBatchId={editingBatch?.batchId ?? null}
//         isUpdatingBatch={isUpdatingBatch}
//         onRefresh={handleRefreshBatches}
//         onEdit={openEditBatchDialog}
//         onDelete={openDeleteConfirmation}
//         onPreviousPage={goToPreviousBatchPage}
//         onNextPage={goToNextBatchPage} // Corrected this line
//         onSort={handleBroadcastSort}
//         sortField={broadcastSortField}
//         sortDirection={broadcastSortDirection}
//       />

//       <EditBroadcastBatchModal
//         isOpen={showEditBatchDialog}
//         onClose={closeEditBatchDialog}
//         batchToEdit={editingBatch}
//         editSubject={editBatchSubject}
//         onSubjectChange={setEditBatchSubject}
//         editBody={editBatchBody}
//         onBodyChange={setEditBatchBody}
//         onUpdate={handleUpdateBatch}
//         isUpdating={isUpdatingBatch}
//         fullBodyFetched={fullEditBodyFetched}
//       />

//       <DeleteBroadcastBatchModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         batchToDelete={showDeleteConfirm}
//         onDelete={handleDeleteBatch}
//         isDeleting={deletingBatchId === showDeleteConfirm?.batchId}
//         formatDateForDisplay={formatDateForDisplay}
//       />

//     </div>
//   );
// };

// export default AdminSendAllMessagePage;

// frontend/src/app/admin/send/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

// Auth & Services
import { useAuth } from "@/app/contexts/AuthContext";
import inboxAdminService, {
  BroadcastBatchInfo,
  BroadcastBatchListResponse,
  UpdateBatchPayload,
} from "../../../services/admin/inbox";

import { AlertCircle, Loader2 } from "lucide-react";

import ComposeBroadcastForm from "../../components/message/send/ComposeBroadcastForm";
import BroadcastHistoryTable, {
  BroadcastSortField,
} from "../../components/message/send/BroadcastHistoryTable";
import EditBroadcastBatchModal from "../../components/message/send/EditBroadcastBatchModal";
import DeleteBroadcastBatchModal from "../../components/message/send/DeleteBroadcastBatchModal";
import { FaPaperPlane } from "react-icons/fa";

// --- Import Custom Toast and react-toastify components ---
import {
  ToastContainer,
  toast as reactToastifyToast,
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast, { CustomToastProps } from "../../../components/CustomToast";

const formatDateForDisplay = (dateInput?: string | Date | null): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : format(date, "MMM d, yyyy, HH:mm");
  } catch (e) {
    return "Invalid Date";
  }
};

const BATCHES_PER_PAGE = 1; // This constant is not being used in the `getBroadcastBatchesAdmin` call; it's passed as `limit` in `inboxAdminService.getBroadcastBatchesAdmin`. Double check if this is the intended behavior. For pagination, the `limit` parameter to the backend is crucial.

const AdminSendAllMessagePage: React.FC = () => {
  const router = useRouter();
  const { isAdmin, loading: authLoading } = useAuth();

  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const [batchesData, setBatchesData] =
    useState<BroadcastBatchListResponse | null>(null);
  const [batchesLoading, setBatchesLoading] = useState<boolean>(true);
  const [batchesError, setBatchesError] = useState<string | null>(null);
  const [batchCurrentPage, setBatchCurrentPage] = useState<number>(1);

  const [broadcastSortField, setBroadcastSortField] =
    useState<BroadcastSortField | null>(null);
  const [broadcastSortDirection, setBroadcastSortDirection] = useState<
    "asc" | "desc"
  >("desc");

  const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState<BroadcastBatchInfo | null>(null);

  const [editingBatch, setEditingBatch] = useState<BroadcastBatchInfo | null>(
    null
  );
  const [editBatchSubject, setEditBatchSubject] = useState<string>("");
  const [editBatchBody, setEditBatchBody] = useState<string>("");
  const [showEditBatchDialog, setShowEditBatchDialog] =
    useState<boolean>(false);
  const [isUpdatingBatch, setIsUpdatingBatch] = useState<boolean>(false);
  const [fullEditBodyFetched, setFullEditBodyFetched] =
    useState<boolean>(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type?: CustomToastProps["type"],
      toastSpecificOptions?: Partial<ToastOptions>
    ) => {
      const effectiveType = type || "default";
      let progressClassName: string;
      switch (effectiveType) {
        case "success":
          progressClassName = "toast-progress-success";
          break;
        case "error":
          progressClassName = "toast-progress-error";
          break;
        case "info":
          progressClassName = "toast-progress-info";
          break;
        case "warning":
          progressClassName = "toast-progress-warning";
          break;
        default:
          progressClassName = "toast-progress-default";
          break;
      }
      reactToastifyToast(
        <CustomToast message={message} type={effectiveType} />,
        {
          progressClassName,
          type: effectiveType as TypeOptions,
          icon: false,
          ...toastSpecificOptions,
        }
      );
    },
    []
  );

  const customToastContainerProps: ToastContainerProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: false,
    closeButton: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    transition: Slide,
    toastClassName: () =>
      "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
  };

  const getToastContainerStyle = (): React.CSSProperties & {
    [key: `--${string}`]: string | number;
  } => {
    const baseStyle = { zIndex: 30 };
    if (isMobile)
      return {
        ...baseStyle,
        top: "1rem",
        left: "1rem",
        right: "1rem",
        width: "auto",
      };
    return { ...baseStyle, top: "0.75rem", right: "0.75rem", width: "320px" };
  };

  const fetchBatches = useCallback(
    async (page: number) => {
      if (!isAdmin) return;
      setBatchesLoading(true);
      setBatchesError(null);
      try {
        // Ensure BATCHES_PER_PAGE is correctly passed as the limit
        const data = await inboxAdminService.getBroadcastBatchesAdmin(
          page,
          BATCHES_PER_PAGE
        );
        setBatchesData(data);
        if (data.currentPage !== page && data.totalPages > 0) {
          if (data.currentPage <= data.totalPages)
            setBatchCurrentPage(data.currentPage);
          else if (data.totalPages > 0) setBatchCurrentPage(data.totalPages);
          else setBatchCurrentPage(1);
        } else if (page > data.totalPages && data.totalPages > 0) {
          setBatchCurrentPage(data.totalPages);
        } else if (data.totalPages === 0) {
          setBatchCurrentPage(1);
        }
      } catch (err: any) {
        console.error("Error fetching broadcast batches:", err);
        const errorMsg = err.message || "Failed to load broadcast history.";
        setBatchesError(errorMsg);
        showToast(errorMsg, "error");
        setBatchesData(null);
      } finally {
        setBatchesLoading(false);
      }
    },
    [isAdmin, showToast]
  );

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchBatches(batchCurrentPage);
    }
    if (!isAdmin && !authLoading) {
      setBatchesData(null);
      setBatchesLoading(false);
      const accessError = "Administrator privileges required.";
      setBatchesError(accessError);
      showToast(accessError, "error");
    }
  }, [authLoading, isAdmin, batchCurrentPage, fetchBatches, showToast]);

  const sortedBatches = useMemo(() => {
    if (!batchesData?.batches) return [];
    const sortableBatches = [...batchesData.batches];
    const effectiveSortField = broadcastSortField ?? "sentAt";
    const effectiveSortDirection = broadcastSortField
      ? broadcastSortDirection
      : "desc";
    sortableBatches.sort((a, b) => {
      let valA: any, valB: any;
      switch (effectiveSortField) {
        case "sentAt":
          valA = new Date(a.sentAt).getTime();
          valB = new Date(b.sentAt).getTime();
          break;
        case "recipientCount":
          valA = a.recipientCount;
          valB = b.recipientCount;
          break;
        default:
          return 0;
      }
      let comparison = 0;
      if (isNaN(valA) && isNaN(valB)) comparison = 0;
      else if (isNaN(valA))
        comparison = effectiveSortDirection === "asc" ? 1 : -1;
      else if (isNaN(valB))
        comparison = effectiveSortDirection === "asc" ? -1 : 1;
      else if (valA < valB) comparison = -1;
      else if (valA > valB) comparison = 1;
      return effectiveSortDirection === "asc" ? comparison : comparison * -1;
    });
    return sortableBatches;
  }, [batchesData?.batches, broadcastSortField, broadcastSortDirection]);

  const handleBroadcastSort = (field: BroadcastSortField) => {
    const newDirection =
      broadcastSortField === field && broadcastSortDirection === "asc"
        ? "desc"
        : "asc";
    setBroadcastSortField(field);
    setBroadcastSortDirection(newDirection);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const result = await inboxAdminService.sendMessageToAllAdmin(
        subject.trim(),
        body.trim()
      );
      showToast(
        result.message || `Message queued for ${result.totalAttempted} users.`,
        "success"
      );
      setSubject("");
      setBody("");
      if (batchCurrentPage !== 1) setBatchCurrentPage(1);
      else fetchBatches(1);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to send broadcast.";
      showToast(errorMsg, "error");
    } finally {
      setIsSending(false);
    }
  };

  const goToBatchPage = (newPage: number) => {
    if (
      newPage > 0 &&
      newPage !== batchCurrentPage &&
      (!batchesData || newPage <= batchesData.totalPages)
    ) {
      setBatchCurrentPage(newPage);
    }
  };
  const goToPreviousBatchPage = () => goToBatchPage(batchCurrentPage - 1);
  const goToNextBatchPage = () => goToBatchPage(batchCurrentPage + 1);
  const handleRefreshBatches = () => {
    if (!batchesLoading) fetchBatches(batchCurrentPage);
  };
  const openDeleteConfirmation = (batch: BroadcastBatchInfo) =>
    setShowDeleteConfirm(batch);
  const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

  const handleDeleteBatch = async () => {
    if (!showDeleteConfirm) return;
    const batchIdToDelete = showDeleteConfirm.batchId;
    setDeletingBatchId(batchIdToDelete);
    try {
      const result = await inboxAdminService.deleteBroadcastBatchAdmin(
        batchIdToDelete
      );
      showToast(
        result.message || `Deleted ${result.deletedCount} messages.`,
        "success"
      );
      const wasLastItemOnPage =
        sortedBatches.length === 1 && batchCurrentPage > 1;
      const pageToFetch = wasLastItemOnPage
        ? batchCurrentPage - 1
        : batchCurrentPage;
      if (wasLastItemOnPage) setBatchCurrentPage(pageToFetch);
      else fetchBatches(pageToFetch);
    } catch (err: any) {
      showToast(`Failed to delete batch: ${err.message}`, "error");
    } finally {
      setDeletingBatchId(null);
      closeDeleteConfirmation();
    }
  };

  const openEditBatchDialog = async (batch: BroadcastBatchInfo) => {
    setEditingBatch(batch);
    setEditBatchSubject(batch.subject);
    setShowEditBatchDialog(true);
    setFullEditBodyFetched(false);
    setEditBatchBody("Loading full message body...");
    try {
      // Assuming batch.bodySnippet is already the full body or you have a way to fetch it
      // If not, this logic might need adjustment based on how full body is retrieved.
      // For simplicity, if the snippet is the only available body, we use it.
      setEditBatchBody(
        batch.bodySnippet.endsWith("...")
          ? batch.bodySnippet
          : batch.bodySnippet
      );
      setFullEditBodyFetched(true);
    } catch (error) {
      console.error("Failed to fetch full body for edit:", error);
      setEditBatchBody(
        batch.bodySnippet +
          "\n\n--- (Error fetching full body, snippet shown) ---"
      );
      showToast("Could not load full message body for editing.", "error");
      setFullEditBodyFetched(true);
    }
  };

  const closeEditBatchDialog = () => {
    setShowEditBatchDialog(false);
    setEditingBatch(null);
    setEditBatchSubject("");
    setEditBatchBody("");
    setIsUpdatingBatch(false);
    setFullEditBodyFetched(false);
  };

  const handleUpdateBatch = async () => {
    if (!editingBatch || isUpdatingBatch) return;
    if (!editBatchSubject.trim() || !editBatchBody.trim()) {
      showToast("Subject and Body cannot be empty.", "error", {
        toastId: "edit-validation-error",
      });
      return;
    }
    setIsUpdatingBatch(true);
    const payload: UpdateBatchPayload = {
      subject: editBatchSubject.trim(),
      body: editBatchBody.trim(),
    };
    try {
      const result = await inboxAdminService.updateBroadcastBatchAdmin(
        editingBatch.batchId,
        payload
      );
      showToast(
        result.message || `Updated ${result.modifiedCount} messages.`,
        "success"
      );
      closeEditBatchDialog();
      fetchBatches(batchCurrentPage);
    } catch (err: any) {
      showToast(`Failed to update batch: ${err.message}`, "error");
    } finally {
      setIsUpdatingBatch(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-subheadingWhite relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-10 relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        {batchesError && (
          <div className="max-w-lg mx-auto p-4 border bg-red-900/30 border-red-700 rounded-md flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-red-200">
                Access Denied
              </h3>
              <p className="text-sm text-red-300 mt-1">{batchesError}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-5 relative">
      <ToastContainer
        {...customToastContainerProps}
        style={getToastContainerStyle()}
      />
      <div className="Send mb-5">
        <div className="flex items-center gap-3">
          
          <div className="p-2.5 shrink-0 bg-primary rounded-full flex items-center justify-center">
            <FaPaperPlane className="text-mainheading" size={26} />
          </div>

          <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
            Send Broadcast Message
          </h1>
        </div>

        <p className="mt-2 text-subheadingWhite text-base lg:text-lg">
          Communicate important updates instantly with the Send Broadcast
          Message feature. Designed for speed and efficiency, this tool allows
          administrators to send announcements, alerts, or critical information
          to all users at once.
        </p>
        
      </div>

      <ComposeBroadcastForm
        subject={subject}
        onSubjectChange={setSubject}
        body={body}
        onBodyChange={setBody}
        isSending={isSending}
        sendError={null}
        onSubmit={handleSendMessage}
      />

      <BroadcastHistoryTable
        batches={sortedBatches}
        totalPages={batchesData?.totalPages ?? 0}
        isLoading={batchesLoading}
        error={batchesError}
        currentPage={batchCurrentPage}
        deletingBatchId={deletingBatchId}
        editingBatchId={editingBatch?.batchId ?? null}
        isUpdatingBatch={isUpdatingBatch}
        onRefresh={handleRefreshBatches}
        onEdit={openEditBatchDialog}
        onDelete={openDeleteConfirmation}
        onPreviousPage={goToPreviousBatchPage}
        onNextPage={goToNextBatchPage}
        paginate={goToBatchPage}
        onSort={handleBroadcastSort}
        sortField={broadcastSortField}
        sortDirection={broadcastSortDirection}
      />

      <EditBroadcastBatchModal
        isOpen={showEditBatchDialog}
        onClose={closeEditBatchDialog}
        batchToEdit={editingBatch}
        editSubject={editBatchSubject}
        onSubjectChange={setEditBatchSubject}
        editBody={editBatchBody}
        onBodyChange={setEditBatchBody}
        onUpdate={handleUpdateBatch}
        isUpdating={isUpdatingBatch}
        fullBodyFetched={fullEditBodyFetched}
      />

      <DeleteBroadcastBatchModal
        isOpen={!!showDeleteConfirm}
        onClose={closeDeleteConfirmation}
        batchToDelete={showDeleteConfirm}
        onDelete={handleDeleteBatch}
        isDeleting={deletingBatchId === showDeleteConfirm?.batchId}
        formatDateForDisplay={formatDateForDisplay}
      />
    </div>
  );
};

export default AdminSendAllMessagePage;
