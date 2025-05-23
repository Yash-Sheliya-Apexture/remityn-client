// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// // import Link from "next/link"; // No longer needed for this snippet
// import { toast } from "sonner";
// import { format, formatDistanceToNow } from 'date-fns';

// // Auth & Services
// import { useAuth } from "@/app/contexts/AuthContext"; // Adjust path if needed
// import inboxAdminService from "../../services/admin/inbox"; // Use correct path
// import type { AdminInboxMessage, AdminInboxListResponse } from "../../services/admin/inbox"; // Match service file

// // Shadcn UI Components (keep non-dropdown ones)
// import {
//     Table, TableBody, TableCell, TableHead, TableHeader, TableRow
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // Remove Shadcn Dropdown imports if no longer used elsewhere
// // import {
// //     DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
// // } from "@/components/ui/dropdown-menu";
// import {
//     Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
// } from "@/components/ui/dialog";
// import Pagination from "../components/Pagination"; // Keep your Pagination

// // --- Import the Custom Dropdown ---
// import CustomDropdown from '../components/CustomDropdown'; // Adjust path if needed

// // Icons (keep as is)
// import {
//     Inbox, Trash2, AlertCircle, RefreshCw, Eye, User, Mail, MessageSquare, MoreHorizontal, CheckCircle2, XCircle, Circle
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Adjust path if needed

// const ITEMS_PER_PAGE = 15;

// // formatDate function (keep as is)
// const formatDate = (dateInput?: string | Date | null): string => {
//     if (!dateInput) return "N/A";
//     try {
//         const date = new Date(dateInput);
//         if (isNaN(date.getTime())) return "Invalid Date";
//         return format(date, "MMM d, yyyy HH:mm");
//     } catch (e) {
//         return "Invalid Date";
//     }
// };

// const AdminInboxPage: React.FC = () => {
//     // Hooks and State (keep as is)
//     const router = useRouter();
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const [inboxData, setInboxData] = useState<AdminInboxListResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [deletingId, setDeletingId] = useState<string | null>(null);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState<AdminInboxMessage | null>(null);

//     // Fetching Logic & Effects (keep as is)
//     const fetchInboxMessages = useCallback(async (page: number) => {
//         // ... (implementation unchanged)
//         if (!isAdmin) {
//             setError("Access Denied: Administrator privileges required.");
//             setLoading(false);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await inboxAdminService.getAllMessagesAdmin(page, ITEMS_PER_PAGE);
//             setInboxData(data);
//              if (data.currentPage !== page) {
//                  setTimeout(() => setCurrentPage(data.currentPage), 0);
//              }
//         } catch (err: any) {
//             console.error("Fetch admin inbox error:", err);
//             setError(err.message || "Failed to load inbox messages.");
//             setInboxData(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [isAdmin]);

//     useEffect(() => {
//         // ... (implementation unchanged)
//         if (authLoading) return;
//         if (!token) {
//             router.push("/auth/login?message=login_required");
//             return;
//         }
//         if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//              return;
//         }
//         fetchInboxMessages(currentPage);
//     }, [token, isAdmin, authLoading, currentPage, router, fetchInboxMessages]);

//     // Handlers (keep as is, including pagination handlers)
//     const goToPage = (newPage: number) => {
//         if (newPage > 0 && newPage !== currentPage && (!inboxData || newPage <= inboxData.totalPages)) {
//             setCurrentPage(newPage);
//         }
//     };
//     const paginate = (pageNumber: number) => goToPage(pageNumber);
//     const goToPreviousPage = () => goToPage(currentPage - 1);
//     const goToNextPage = () => goToPage(currentPage + 1);
//     const handleRefresh = () => { if (!loading) fetchInboxMessages(currentPage); };
//     const openDeleteConfirmation = (message: AdminInboxMessage) => setShowDeleteConfirm(message);
//     const closeDeleteConfirmation = () => setShowDeleteConfirm(null);
//     const handleDeleteMessage = async () => {
//         // ... (implementation unchanged)
//         if (!showDeleteConfirm) return;
//         const messageIdToDelete = showDeleteConfirm._id;
//         setDeletingId(messageIdToDelete);
//         closeDeleteConfirmation();
//         try {
//             await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//             toast.success(`Message (${messageIdToDelete.slice(-6)}) deleted successfully.`);
//             fetchInboxMessages(currentPage);
//              if (inboxData && inboxData.messages.length === 1 && currentPage > 1) {
//                 goToPreviousPage();
//              }
//         } catch (err: any) {
//             console.error("Delete message error:", err);
//             toast.error("Failed to delete message", { description: err.message });
//         } finally {
//             setDeletingId(null);
//         }
//     };

//     // Render Logic (keep skeleton and error renderers)
//     const renderSkeleton = () => (
//         // ... (implementation unchanged)
//         <div className="space-y-4">
//              <div className="flex justify-between items-center mb-6">
//                  <Skeleton className="h-8 w-48" />
//                  <Skeleton className="h-9 w-24" />
//             </div>
//             <div className="border rounded-lg">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             {[...Array(6)].map((_, i) => <TableHead key={i}><Skeleton className="h-5 w-20" /></TableHead>)}
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
//                             <TableRow key={i}>
//                                 {[...Array(6)].map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>
//              <div className="flex justify-center mt-6"><Skeleton className="h-9 w-64" /></div>
//         </div>
//     );

//     const renderError = () => (
//         // ... (implementation unchanged)
//          <Alert variant="destructive" className="mt-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Error Loading Messages</AlertTitle>
//             <AlertDescription>
//                 {error || "An unexpected error occurred."}
//                 <Button variant="secondary" size="sm" onClick={handleRefresh} className="mt-2 ml-auto block">
//                      <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Retry
//                  </Button>
//             </AlertDescription>
//         </Alert>
//     );

//     const renderContent = () => {
//         const totalPages = inboxData?.totalPages ?? 0;
//         if (!inboxData || inboxData.messages.length === 0) {
//             if (!loading) {
//                return <p className="text-center text-muted-foreground py-12">No inbox messages found.</p>;
//             }
//             return null;
//         }

//         return (
//             <>
//                  <div className="border rounded-lg overflow-hidden">
//                     <Table>
//                         <TableHeader className="bg-muted/50">
//                             {/* ... (Table Header unchanged) ... */}
//                             <TableRow>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Recipient</TableHead>
//                                 <TableHead>Sender</TableHead>
//                                 <TableHead>Subject</TableHead>
//                                 <TableHead>Sent At</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {inboxData.messages.map((msg) => (
//                                 <TableRow key={msg._id} className={cn(!msg.isRead && "bg-primary/5")}>
//                                     {/* ... (Other TableCells unchanged) ... */}
//                                     <TableCell>
//                                         <Badge variant={msg.isRead ? "secondary" : "default"} className={cn("capitalize w-[80px] justify-center", msg.isRead ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200")}>
//                                              {msg.isRead ? <CheckCircle2 className="size-3 mr-1" /> : <Circle className="size-3 mr-1 fill-current"/>}
//                                              {msg.isRead ? 'Read' : 'Unread'}
//                                          </Badge>
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className="font-medium truncate max-w-[200px]" title={msg.userId?.email ?? 'N/A'}>
//                                              {msg.userId?.fullName || msg.userId?.email || <span className="italic text-muted-foreground">Unknown User</span>}
//                                         </div>
//                                          <div className="text-xs text-muted-foreground">ID: {msg.userId?._id?.slice(-6) ?? 'N/A'}</div>
//                                     </TableCell>
//                                     <TableCell className="truncate max-w-[200px]">{msg.sender}</TableCell>
//                                     <TableCell className="font-medium truncate max-w-[250px]">{msg.subject}</TableCell>
//                                     <TableCell>
//                                          <span className="whitespace-nowrap">{formatDate(msg.sentAt)}</span>
//                                         <div className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true })}</div>
//                                      </TableCell>

//                                     {/* --- Updated Actions Cell --- */}
//                                     <TableCell className="text-right">
//                                          <CustomDropdown
//                                              disabled={deletingId === msg._id}
//                                              trigger={
//                                                  <Button
//                                                      variant="ghost"
//                                                      size="icon"
//                                                      className="h-8 w-8"
//                                                      // Disabled state is handled by CustomDropdown based on prop
//                                                      aria-label="Actions" // Add aria-label
//                                                  >
//                                                      {deletingId === msg._id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
//                                                      {/* No need for sr-only span here, button itself can have aria-label */}
//                                                  </Button>
//                                              }
//                                          >
//                                              {/* Custom Item */}
//                                              <button
//                                                  onClick={() => openDeleteConfirmation(msg)}
//                                                  disabled={deletingId === msg._id}
//                                                  className={cn(
//                                                      "flex w-full items-center px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none",
//                                                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent" // Style disabled state
//                                                  )}
//                                                  role="menuitem" // Add role
//                                              >
//                                                  <Trash2 className="mr-2 h-4 w-4" /> Delete Message
//                                              </button>
//                                               {/* Add more items here if needed later */}
//                                               {/* <button className="flex w-full items-center px-3 py-1.5 text-sm text-foreground hover:bg-muted ..."> <Eye className="mr-2 h-4 w-4" /> View Details </button> */}
//                                          </CustomDropdown>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>

//                  {/* Pagination Usage (keep as is) */}
//                 {totalPages > 0 && (
//                      <Pagination
//                          currentPage={currentPage}
//                          totalPages={totalPages}
//                          paginate={paginate}
//                          goToPreviousPage={goToPreviousPage}
//                          goToNextPage={goToNextPage}
//                      />
//                  )}
//             </>
//         );
//     };

//     // Main Return and Dialog (keep as is)
//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* ... (Header unchanged) ... */}
//              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//                 <div>
//                     <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
//                          <MessageSquare className="size-7 text-primary" /> Admin Inbox - All Messages
//                     </h1>
//                      <p className="text-muted-foreground text-sm mt-1">View and manage all messages sent to users.</p>
//                  </div>
//                  <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//                      <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
//                      {loading ? 'Refreshing...' : 'Refresh'}
//                  </Button>
//             </div>

//             {/* Conditional Rendering Logic */}
//             {loading && !inboxData ? renderSkeleton() : null}
//             {error ? renderError() : null}
//             {!loading && !error ? renderContent() : null}

//              {/* Delete Confirmation Dialog (keep as is) */}
//              <Dialog open={!!showDeleteConfirm} onOpenChange={(isOpen) => !isOpen && closeDeleteConfirmation()}>
//                  {/* ... (Dialog Content unchanged) ... */}
//                  <DialogContent>
//                      <DialogHeader>
//                          <DialogTitle>Confirm Deletion</DialogTitle>
//                          <DialogDescription>
//                             Are you sure you want to permanently delete this message?
//                             <br />
//                             <strong className="block mt-2">Subject: {showDeleteConfirm?.subject}</strong>
//                              <span className="text-xs block text-muted-foreground">To: {showDeleteConfirm?.userId?.fullName ?? showDeleteConfirm?.userId?.email ?? 'Unknown'} | Sent: {formatDate(showDeleteConfirm?.sentAt)}</span>
//                          </DialogDescription>
//                      </DialogHeader>
//                      <DialogFooter>
//                          <DialogClose asChild>
//                              <Button type="button" variant="outline">Cancel</Button>
//                          </DialogClose>
//                          <Button
//                              type="button"
//                              variant="destructive"
//                              onClick={handleDeleteMessage}
//                              disabled={deletingId === showDeleteConfirm?._id}
//                          >
//                              {deletingId === showDeleteConfirm?._id ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
//                              Delete Message
//                          </Button>
//                      </DialogFooter>
//                  </DialogContent>
//              </Dialog>
//         </div>
//     );
// };

// export default AdminInboxPage;

// Yash bhai code
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { format, formatDistanceToNow } from "date-fns";

// // Auth & Services
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   AdminUpdatePayload,
// } from "../../services/admin/inbox"; // Import payload type
// import type {
//   AdminInboxMessage,
//   AdminInboxListResponse,
// } from "../../services/admin/inbox";

// // Shadcn UI Components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input"; // <-- Add Input
// import { Textarea } from "@/components/ui/textarea"; // <-- Add Textarea
// import { Label } from "@/components/ui/label"; // <-- Add Label
// import Pagination from "../components/Pagination";

// // --- Import the Custom Dropdown ---
// import CustomDropdown from "../components/CustomDropdown";

// // Icons
// import {
//   Inbox,
//   Trash2,
//   AlertCircle,
//   RefreshCw,
//   Eye,
//   User,
//   Mail,
//   MessageSquare,
//   MoreHorizontal,
//   CheckCircle2,
//   XCircle,
//   Circle,
//   Pencil, // <-- Add Pencil
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const ITEMS_PER_PAGE = 15;

// const formatDate = (dateInput?: string | Date | null): string => {
//   // ... (implementation unchanged)
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return format(date, "MMM d, yyyy HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const AdminInboxPage: React.FC = () => {
//   // Hooks and State
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<AdminInboxListResponse | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   // --- Deletion State ---
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<AdminInboxMessage | null>(null);

//   // --- Editing State ---
//   const [editingMessage, setEditingMessage] =
//     useState<AdminInboxMessage | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
//   const [editSubject, setEditSubject] = useState<string>("");
//   const [editBody, setEditBody] = useState<string>("");
//   const [updatingId, setUpdatingId] = useState<string | null>(null); // For loading state during update

//   // Fetching Logic & Effects
//   const fetchInboxMessages = useCallback(
//     async (page: number) => {
//       // ... (implementation unchanged)
//       if (!isAdmin) {
//         setError("Access Denied: Administrator privileges required.");
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await inboxAdminService.getAllMessagesAdmin(
//           page,
//           ITEMS_PER_PAGE
//         );
//         // IMPORTANT: Ensure your service actually returns the 'body' for editing
//         if (data.messages.length > 0 && data.messages[0].body === undefined) {
//           console.warn(
//             "Warning: Message 'body' is not being fetched. Editing will not work correctly."
//           );
//           // Optionally show a persistent warning to the admin
//         }
//         setInboxData(data);
//         if (data.currentPage !== page) {
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Fetch admin inbox error:", err);
//         setError(err.message || "Failed to load inbox messages.");
//         setInboxData(null);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [isAdmin]
//   ); // Added isAdmin dependency

//   useEffect(() => {
//     // ... (implementation unchanged)
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//       return;
//     }
//     if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//       return;
//     }
//     fetchInboxMessages(currentPage);
//   }, [token, isAdmin, authLoading, currentPage, router, fetchInboxMessages]);

//   // --- Pagination and Refresh Handlers ---
//   const goToPage = (newPage: number) => {
//     // ... (implementation unchanged)
//     if (
//       newPage > 0 &&
//       newPage !== currentPage &&
//       (!inboxData || newPage <= inboxData.totalPages)
//     ) {
//       setCurrentPage(newPage);
//     }
//   };
//   const paginate = (pageNumber: number) => goToPage(pageNumber);
//   const goToPreviousPage = () => goToPage(currentPage - 1);
//   const goToNextPage = () => goToPage(currentPage + 1);
//   const handleRefresh = () => {
//     if (!loading) fetchInboxMessages(currentPage);
//   };

//   // --- Delete Handlers ---
//   const openDeleteConfirmation = (message: AdminInboxMessage) =>
//     setShowDeleteConfirm(message);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);
//   const handleDeleteMessage = async () => {
//     // ... (implementation unchanged)
//     if (!showDeleteConfirm) return;
//     const messageIdToDelete = showDeleteConfirm._id;
//     setDeletingId(messageIdToDelete);
//     closeDeleteConfirmation(); // Close dialog immediately
//     try {
//       await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//       toast.success(
//         `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`
//       );
//       // Check if it was the last item on the page
//       const wasLastItem = inboxData?.messages.length === 1 && currentPage > 1;
//       fetchInboxMessages(wasLastItem ? currentPage - 1 : currentPage);
//       if (wasLastItem) {
//         // setCurrentPage(currentPage - 1); // Let fetchInbox handle setting correct page
//       }
//     } catch (err: any) {
//       console.error("Delete message error:", err);
//       toast.error("Failed to delete message", { description: err.message });
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // --- Edit Handlers ---
//   const openEditDialog = (message: AdminInboxMessage) => {
//     setEditingMessage(message);
//     setEditSubject(message.subject);
//     // IMPORTANT: Make sure message.body exists and is fetched from the API
//     setEditBody(message.body || ""); // Default to empty string if body is missing
//     setShowEditDialog(true);
//   };

//   const closeEditDialog = () => {
//     setShowEditDialog(false);
//     setEditingMessage(null);
//     setEditSubject("");
//     setEditBody("");
//     setUpdatingId(null); // Reset updating state on close
//   };

//   const handleUpdateMessage = async () => {
//     if (!editingMessage || updatingId) return; // Prevent double-submit

//     setUpdatingId(editingMessage._id);
//     try {
//       const payload: AdminUpdatePayload = {
//         subject: editSubject.trim(),
//         body: editBody.trim(),
//       };
//       if (!payload.subject || !payload.body) {
//         toast.error("Validation Error", {
//           description: "Subject and body cannot be empty.",
//         });
//         setUpdatingId(null); // Stop loading indicator
//         return;
//       }

//       await inboxAdminService.updateMessageAdmin(editingMessage._id, payload);
//       toast.success(
//         `Message (${editingMessage._id.slice(-6)}) updated successfully.`
//       );
//       closeEditDialog();
//       // Optimistic update could be done here, but refetching is simpler for now
//       fetchInboxMessages(currentPage); // Refresh the list
//     } catch (err: any) {
//       console.error("Update message error:", err);
//       toast.error("Failed to update message", { description: err.message });
//       setUpdatingId(null); // Stop loading indicator on error
//     }
//     // No finally block needed here if we stop loading on error/success within try/catch
//   };

//   // Render Logic (keep skeleton and error renderers)
//   const renderSkeleton = () => (
//     // ... (implementation unchanged)
//     <div className="space-y-4">
//       <div className="flex justify-between items-center mb-6">
//         <Skeleton className="h-8 w-48" />
//         <Skeleton className="h-9 w-24" />
//       </div>
//       <div className="border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               {[...Array(6)].map((_, i) => (
//                 <TableHead key={i}>
//                   <Skeleton className="h-5 w-20" />
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
//               <TableRow key={i}>
//                 {[...Array(6)].map((_, j) => (
//                   <TableCell key={j}>
//                     <Skeleton className="h-5 w-full" />
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex justify-center mt-6">
//         <Skeleton className="h-9 w-64" />
//       </div>
//     </div>
//   );

//   const renderError = () => (
//     // ... (implementation unchanged)
//     <Alert variant="destructive" className="mt-6">
//       <AlertCircle className="h-4 w-4" />
//       <AlertTitle>Error Loading Messages</AlertTitle>
//       <AlertDescription>
//         {error || "An unexpected error occurred."}
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={handleRefresh}
//           className="mt-2 ml-auto block"
//         >
//           <RefreshCw
//             className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
//           />{" "}
//           Retry
//         </Button>
//       </AlertDescription>
//     </Alert>
//   );

//   const renderContent = () => {
//     const totalPages = inboxData?.totalPages ?? 0;
//     if (!inboxData || inboxData.messages.length === 0) {
//       // ... (no messages text unchanged) ...
//       if (!loading) {
//         return (
//           <p className="text-center text-muted-foreground py-12">
//             No inbox messages found.
//           </p>
//         );
//       }
//       return null;
//     }

//     return (
//       <>
//         <div className="border rounded-lg overflow-hidden">
//           <Table>
//             <TableHeader className="bg-muted/50">
//               {/* ... (Table Header unchanged) ... */}
//               <TableRow>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Recipient</TableHead>
//                 <TableHead>Sender</TableHead>
//                 <TableHead>Subject</TableHead>
//                 <TableHead>Sent At</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {inboxData.messages.map((msg) => {
//                 const isDeleting = deletingId === msg._id;
//                 const isUpdating = updatingId === msg._id;
//                 const isDisabled = isDeleting || isUpdating; // Disable actions if either process is running

//                 return (
//                   <TableRow
//                     key={msg._id}
//                     className={cn(!msg.isRead && "bg-primary/5")}
//                   >
//                     {/* ... (Other TableCells unchanged) ... */}
//                     <TableCell>
//                       {/* Status Badge */}
//                       <Badge
//                         variant={msg.isRead ? "secondary" : "default"}
//                         className={cn(
//                           "capitalize w-[80px] justify-center",
//                           msg.isRead
//                             ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
//                             : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//                         )}
//                       >
//                         {msg.isRead ? (
//                           <CheckCircle2 className="size-3 mr-1" />
//                         ) : (
//                           <Circle className="size-3 mr-1 fill-current" />
//                         )}
//                         {msg.isRead ? "Read" : "Unread"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {/* Recipient Info */}
//                       <div
//                         className="font-medium truncate max-w-[200px]"
//                         title={msg.userId?.email ?? "N/A"}
//                       >
//                         {msg.userId?.fullName || msg.userId?.email || (
//                           <span className="italic text-muted-foreground">
//                             Unknown User
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         ID: {msg.userId?._id?.slice(-6) ?? "N/A"}
//                       </div>
//                     </TableCell>
//                     <TableCell className="truncate max-w-[200px]">
//                       {msg.sender}
//                     </TableCell>
//                     <TableCell className="font-medium truncate max-w-[250px]">
//                       {msg.subject}
//                     </TableCell>
//                     <TableCell>
//                       {/* Sent At Info */}
//                       <span className="whitespace-nowrap">
//                         {formatDate(msg.sentAt)}
//                       </span>
//                       <div className="text-xs text-muted-foreground">
//                         {formatDistanceToNow(new Date(msg.sentAt), {
//                           addSuffix: true,
//                         })}
//                       </div>
//                     </TableCell>

//                     {/* --- Updated Actions Cell --- */}
//                     <TableCell className="text-right">
//                       <CustomDropdown
//                         disabled={isDisabled} // Disable dropdown trigger if deleting/updating
//                         trigger={
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8"
//                             disabled={isDisabled} // Also disable button itself
//                             aria-label="Message Actions"
//                           >
//                             {/* Show spinner if deleting OR updating */}
//                             {isDisabled ? (
//                               <RefreshCw className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <MoreHorizontal className="h-4 w-4" />
//                             )}
//                           </Button>
//                         }
//                       >
//                         {/* Edit Item */}
//                         <button
//                           onClick={() => openEditDialog(msg)}
//                           // No need for disabled prop here if CustomDropdown handles it, but explicit doesn't hurt
//                           // disabled={isDisabled}
//                           className={cn(
//                             "flex w-full items-center px-3 py-1.5 text-sm text-foreground hover:bg-muted focus:bg-muted focus:outline-none",
//                             // CustomDropdown likely handles disabled styling, but you can add yours:
//                             "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
//                           )}
//                           role="menuitem"
//                         >
//                           <Pencil className="mr-2 h-4 w-4" /> Edit Message
//                         </button>

//                         {/* Delete Item */}
//                         <button
//                           onClick={() => openDeleteConfirmation(msg)}
//                           // disabled={isDisabled}
//                           className={cn(
//                             "flex w-full items-center px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none",
//                             "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
//                           )}
//                           role="menuitem"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" /> Delete Message
//                         </button>
//                         {/* Add more items here if needed later */}
//                       </CustomDropdown>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination Usage (keep as is) */}
//         {totalPages > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </>
//     );
//   };

//   // Main Return
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* ... (Header unchanged) ... */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
//             <MessageSquare className="size-7 text-primary" /> Admin Inbox - All
//             Messages
//           </h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             View and manage all messages sent to users.
//           </p>
//         </div>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={handleRefresh}
//           disabled={loading}
//         >
//           <RefreshCw
//             className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
//           />
//           {loading ? "Refreshing..." : "Refresh"}
//         </Button>
//       </div>

//       {/* Conditional Rendering Logic */}
//       {loading && !inboxData ? renderSkeleton() : null}
//       {error ? renderError() : null}
//       {!loading && !error ? renderContent() : null}

//       {/* --- Edit Message Dialog --- */}
//       <Dialog
//         open={showEditDialog}
//         onOpenChange={(isOpen) => !isOpen && closeEditDialog()}
//       >
//         <DialogContent className="sm:max-w-[525px]">
//           {" "}
//           {/* Adjust width if needed */}
//           <DialogHeader>
//             <DialogTitle>Edit Message</DialogTitle>
//             <DialogDescription>
//               Update the subject and body of the message.
//               <span className="text-xs block text-muted-foreground mt-1">
//                 Message ID: {editingMessage?._id?.slice(-6)} | To:{" "}
//                 {editingMessage?.userId?.fullName ??
//                   editingMessage?.userId?.email ??
//                   "N/A"}
//               </span>
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             {/* Subject Input */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-subject" className="text-right">
//                 Subject
//               </Label>
//               <Input
//                 id="edit-subject"
//                 value={editSubject}
//                 onChange={(e) => setEditSubject(e.target.value)}
//                 className="col-span-3"
//                 disabled={updatingId === editingMessage?._id}
//                 maxLength={200} // Optional: Add max length
//               />
//             </div>
//             {/* Body Input */}
//             <div className="grid grid-cols-4 items-start gap-4">
//               {" "}
//               {/* items-start for label alignment */}
//               <Label htmlFor="edit-body" className="text-right pt-2">
//                 Body
//               </Label>{" "}
//               {/* Adjust padding */}
//               <Textarea
//                 id="edit-body"
//                 value={editBody}
//                 onChange={(e) => setEditBody(e.target.value)}
//                 className="col-span-3 min-h-[150px]" // Make textarea taller
//                 disabled={updatingId === editingMessage?._id}
//                 placeholder="Enter the message body..."
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant="outline"
//                 disabled={updatingId === editingMessage?._id}
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               type="button"
//               onClick={handleUpdateMessage}
//               disabled={
//                 updatingId === editingMessage?._id ||
//                 !editSubject.trim() ||
//                 !editBody.trim()
//               } // Disable if updating or fields empty
//             >
//               {updatingId === editingMessage?._id ? (
//                 <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 <CheckCircle2 className="mr-2 h-4 w-4" />
//               )}
//               {updatingId === editingMessage?._id
//                 ? "Saving..."
//                 : "Save Changes"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* --- Delete Confirmation Dialog (Unchanged Structure) --- */}
//       <Dialog
//         open={!!showDeleteConfirm}
//         onOpenChange={(isOpen) => !isOpen && closeDeleteConfirmation()}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to permanently delete this message? This
//               action cannot be undone.
//               <br />
//               <strong className="block mt-2">
//                 Subject: {showDeleteConfirm?.subject}
//               </strong>
//               <span className="text-xs block text-muted-foreground">
//                 To:{" "}
//                 {showDeleteConfirm?.userId?.fullName ??
//                   showDeleteConfirm?.userId?.email ??
//                   "Unknown"}{" "}
//                 | Sent: {formatDate(showDeleteConfirm?.sentAt)}
//               </span>
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button type="button" variant="outline">
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={handleDeleteMessage}
//               disabled={deletingId === showDeleteConfirm?._id}
//             >
//               {deletingId === showDeleteConfirm?._id ? (
//                 <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 <Trash2 className="mr-2 h-4 w-4" />
//               )}
//               Delete Message
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminInboxPage;

//
// // frontend/src/app/admin/inbox/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// // Auth & Services
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxAdminService, { AdminUpdatePayload } from '../../services/admin/inbox';
// import type { AdminInboxMessage, AdminInboxListResponse } from '../../services/admin/inbox';

// // Custom Components
// import EditMessageModal from '../components/message/inbox/EditMessageModal';
// import DeleteConfirmationModal from '../components/message/inbox/DeleteConfirmationModal';
// import InboxTable from '../components/message/inbox/InboxTable';
// import { InboxSortField } from '../components/message/inbox/InboxTableHeader'; // <-- IMPORT SORT FIELD TYPE
// import Pagination from '../components/Pagination';

// // Icons
// import { MessageSquare, RefreshCw, Check, X as XIcon } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const ITEMS_PER_PAGE_OPTIONS = [10, 15, 25, 50];

// const AdminInboxPage: React.FC = () => {
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();

//   const [allMessages, setAllMessages] = useState<AdminInboxMessage[]>([]); // Store all fetched messages for client-side sort/filter
//   const [displayedMessages, setDisplayedMessages] = useState<AdminInboxMessage[]>([]); // Messages to actually display after sort/page

//   const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[1]);

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<AdminInboxMessage | null>(null);

//   const [editingMessage, setEditingMessage] = useState<AdminInboxMessage | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<InboxSortField | null>('sentAt'); // Default sort
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default direction

//   // Fetch ALL messages initially if doing client-side sorting/pagination heavily
//   // For true server-side pagination and sorting, this fetch logic would change.
//   // This example will fetch all and then sort/paginate on client.
//   // If your API supports server-side sorting and pagination, adjust `getAllMessagesAdmin` parameters.
//   const fetchInboxMessages = useCallback(async () => {
//     // Removed page and limit from params, assuming fetching all for client-side sort/page
//     // Or, if server-side, pass sortField, sortDirection, page, limit to API
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//       return;
//     }
//     if (!isAdmin) {
//       setErrorMessage("Access Denied: Administrator privileges required.");
//       setLoadingMessages(false);
//       return;
//     }

//     setLoadingMessages(true);
//     setIsRefreshing(true);
//     setErrorMessage(null);
//     try {
//       // For client-side sorting/pagination, you might fetch all (page 1, large limit)
//       // Or, if your API supports server-side sorting, pass sortField and sortDirection here.
//       // Example: const data = await inboxAdminService.getAllMessagesAdmin(1, 9999, sortField, sortDirection);
//       // For now, assuming the service fetches all or a paginated list (without sorting from API)
//       const data = await inboxAdminService.getAllMessagesAdmin(1, 10000); // Fetch a large number for client-side demo

//       if (data.messages.length > 0 && data.messages[0].body === undefined) {
//         console.warn("Warning: Message 'body' is not being fetched. Editing will not work correctly.");
//       }
//       setAllMessages(data.messages); // Store all messages
//       setTotalMessagesCount(data.totalMessages); // Use total from API if available, else data.messages.length

//     } catch (err: any) {
//       console.error("Fetch admin inbox error:", err);
//       setErrorMessage(err.message || "Failed to load inbox messages.");
//       setAllMessages([]);
//       setTotalMessagesCount(0);
//     } finally {
//       setLoadingMessages(false);
//       setIsRefreshing(false);
//     }
//   }, [token, isAdmin, authLoading, router]); // Removed itemsPerPage, sortField, sortDirection for now from deps if getAllMessagesAdmin doesn't use them

//   useEffect(() => {
//     fetchInboxMessages();
//   }, [fetchInboxMessages]);

//   // --- Client-Side Sorting and Pagination Logic ---
//   useEffect(() => {
//     let processedMessages = [...allMessages];

//     // Apply sorting
//     if (sortField) {
//       processedMessages.sort((a, b) => {
//         let valA: any;
//         let valB: any;

//         switch (sortField) {
//           case 'status': // isRead is boolean
//             valA = a.isRead;
//             valB = b.isRead;
//             break;
//           case 'recipient':
//             valA = (a.userId?.fullName || a.userId?.email || '').toLowerCase();
//             valB = (b.userId?.fullName || b.userId?.email || '').toLowerCase();
//             break;
//           case 'sender':
//             valA = (a.sender || '').toLowerCase();
//             valB = (b.sender || '').toLowerCase();
//             break;
//           case 'subject':
//             valA = (a.subject || '').toLowerCase();
//             valB = (b.subject || '').toLowerCase();
//             break;
//           case 'sentAt':
//             valA = a.sentAt ? new Date(a.sentAt).getTime() : 0;
//             valB = b.sentAt ? new Date(b.sentAt).getTime() : 0;
//             break;
//           default:
//             return 0;
//         }

//         if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
//         if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     setTotalPages(Math.ceil(processedMessages.length / itemsPerPage));

//     // Apply pagination
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setDisplayedMessages(processedMessages.slice(startIndex, endIndex));

//   }, [allMessages, sortField, sortDirection, currentPage, itemsPerPage]);

//   // Effect to reset to page 1 when sort or itemsPerPage changes
//   useEffect(() => {
//     if (currentPage !== 1) {
//         setCurrentPage(1);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sortField, sortDirection, itemsPerPage]);

//   const displayMessage = (type: 'success' | 'error', message: string) => {
//     if (type === 'success') setSuccessMessage(message);
//     else setErrorMessage(message);
//     setTimeout(() => {
//       setSuccessMessage(null);
//       setErrorMessage(null);
//     }, 5000);
//   };

//   // --- Pagination and Refresh Handlers ---
//   const goToPage = (newPage: number) => {
//     if (newPage > 0 && newPage !== currentPage && newPage <= totalPages ) {
//       setCurrentPage(newPage);
//     } else if (newPage < 1 && totalPages > 0) {
//         setCurrentPage(1);
//     } else if (newPage > totalPages && totalPages > 0) {
//         setCurrentPage(totalPages);
//     }
//   };
//   const paginate = (pageNumber: number) => goToPage(pageNumber);
//   const goToPreviousPage = () => goToPage(currentPage - 1);
//   const goToNextPage = () => goToPage(currentPage + 1);

//   const handleRefresh = () => {
//     if (!loadingMessages && !isRefreshing) {
//       fetchInboxMessages(); // Refetch all messages
//     }
//   };

//   const handlePageSizeChange = (size: number) => {
//     setItemsPerPage(size);
//     // setCurrentPage(1); // Already handled by the useEffect above
//   };

//   // --- Toggle Sort Function ---
//   const toggleInboxSort = (field: InboxSortField) => {
//     const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   // --- Delete Handlers ---
//   const openDeleteConfirmation = (message: AdminInboxMessage) => setShowDeleteConfirm(message);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteMessage = async () => {
//     if (!showDeleteConfirm) return;
//     const messageIdToDelete = showDeleteConfirm._id;
//     setDeletingId(messageIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//       displayMessage('success', `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`);
//       // Refetch or update client-side data
//       setAllMessages(prev => prev.filter(msg => msg._id !== messageIdToDelete));
//       // Recalculate total messages if not relying on API for this after delete
//       setTotalMessagesCount(prev => prev -1);

//       // Adjust current page if the last item on a page was deleted
//       const newTotalPages = Math.ceil((allMessages.length - 1) / itemsPerPage);
//       if (currentPage > newTotalPages && newTotalPages > 0) {
//         setCurrentPage(newTotalPages);
//       } else if (allMessages.length -1 === 0) { // if all messages are deleted
//         setCurrentPage(1);
//       }

//     } catch (err: any) {
//       console.error("Delete message error:", err);
//       displayMessage('error', `Failed to delete message: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // --- Edit Handlers ---
//   const openEditDialog = (message: AdminInboxMessage) => {
//     setEditingMessage(message);
//     setShowEditDialog(true);
//   };
//   const closeEditDialog = () => {
//     setShowEditDialog(false);
//     setEditingMessage(null);
//     setUpdatingId(null);
//   };

//   const handleSaveMessageUpdate = async (id: string, subject: string, body: string) => {
//     if (!editingMessage || updatingId) return;
//     setUpdatingId(editingMessage._id);
//     try {
//       const payload: AdminUpdatePayload = { subject, body };
//       if (!payload.subject || !payload.body) {
//         displayMessage('error', "Subject and body cannot be empty.");
//         setUpdatingId(null);
//         return;
//       }
//       const updatedMsg = await inboxAdminService.updateMessageAdmin(editingMessage._id, payload); // Assuming service returns updated message
//       displayMessage('success', `Message (${editingMessage._id.slice(-6)}) updated successfully.`);

//       // Update client-side data
//       setAllMessages(prev => prev.map(msg => msg._id === id ? {...msg, ...payload, ...updatedMsg} : msg)); // Spread updatedMsg for other fields like updatedAt

//       closeEditDialog();
//       // No need to fetchInboxMessages if client-side data is updated correctly
//     } catch (err: any) {
//       console.error("Update message error:", err);
//       displayMessage('error', `Failed to update message: ${err.message}`);
//       setUpdatingId(null);
//     }
//   };

//   // const currentMessagesToDisplay = displayedMessages; // Use this for the table

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <div className='flex-1 min-w-[200px]'>
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white flex items-center gap-2">
//               <MessageSquare className="size-7 text-primary" />
//               Admin Inbox
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               View and manage all messages sent to users.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing || loadingMessages}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 py-2.5 h-11 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh inbox data"
//             >
//               <RefreshCw className={`size-5 ${isRefreshing ? "animate-spin" : ""}`} />
//               <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
//             </button>
//           </div>
//         </div>

//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check className="text-green-600 dark:text-green-400" size={18} />
//                 <p className="text-sm font-medium text-green-800 dark:text-green-300">{successMessage}</p>
//               </div>
//               <button onClick={() => setSuccessMessage(null)} className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {errorMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <XIcon className="text-red-600 dark:text-red-400" size={18} />
//                 <p className="text-sm font-medium text-red-800 dark:text-red-300">{errorMessage}</p>
//               </div>
//               <button onClick={() => setErrorMessage(null)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination and Page Size Controls */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">Show:</label>
//             <select
//               id="itemsPerPage"
//               value={itemsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//               disabled={loadingMessages || isRefreshing}
//             >
//               {ITEMS_PER_PAGE_OPTIONS.map(size => <option key={size} value={size} className="dark:bg-dropdowncolor cursor-pointer">{size}</option>)}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">entries</span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing {displayedMessages.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
//             - {Math.min(currentPage * itemsPerPage, totalMessagesCount)}
//             {" "}of {totalMessagesCount} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {/* Inbox Table */}
//         <InboxTable
//           messages={displayedMessages} // Pass the paginated and sorted messages
//           loading={loadingMessages && allMessages.length === 0} // Show skeleton only on initial load or full refresh when no data yet
//           onEdit={openEditDialog}
//           onDelete={openDeleteConfirmation}
//           deletingId={deletingId}
//           updatingId={updatingId}
//           itemsPerPage={itemsPerPage}
//           // --- Pass sorting props ---
//           toggleSort={toggleInboxSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//         />

//         {/* Pagination */}
//         {totalPages > 1 && !loadingMessages && displayedMessages.length > 0 && ( // also check if there are messages to show pagination for
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       {/* Edit Message Modal */}
//       <EditMessageModal
//         isOpen={showEditDialog}
//         onClose={closeEditDialog}
//         message={editingMessage}
//         onSave={handleSaveMessageUpdate}
//         isLoading={!!updatingId}
//       />

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         message={showDeleteConfirm}
//         onConfirm={handleDeleteMessage}
//         isLoading={!!deletingId}
//       />
//     </div>
//   );
// };

// export default AdminInboxPage;

//
// // frontend/src/app/admin/inbox/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// // Auth & Services
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxAdminService, { AdminUpdatePayload } from '../../services/admin/inbox';
// import type { AdminInboxMessage, AdminInboxListResponse } from '../../services/admin/inbox';

// // Custom Components
// import EditMessageModal from '../components/message/inbox/EditMessageModal';
// import DeleteConfirmationModal from '../components/message/inbox/DeleteConfirmationModal';
// import InboxTable from '../components/message/inbox/InboxTable';
// import { InboxSortField } from '../components/message/inbox/InboxTableHeader'; // <-- IMPORT SORT FIELD TYPE
// import Pagination from '../components/Pagination';

// // Icons
// import { MessageSquare, RefreshCw, Check, X as XIcon, Filter } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const ITEMS_PER_PAGE_OPTIONS = [10, 15, 25, 50];

// const AdminInboxPage: React.FC = () => {
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();

//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

//   const [allMessages, setAllMessages] = useState<AdminInboxMessage[]>([]); // Store all fetched messages for client-side sort/filter
//   const [displayedMessages, setDisplayedMessages] = useState<AdminInboxMessage[]>([]); // Messages to actually display after sort/page

//   const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[1]);

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<AdminInboxMessage | null>(null);

//   const [editingMessage, setEditingMessage] = useState<AdminInboxMessage | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<InboxSortField | null>('sentAt'); // Default sort
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default direction

//   const fetchInboxMessages = useCallback(async () => {
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//       return;
//     }
//     if (!isAdmin) {
//       setErrorMessage("Access Denied: Administrator privileges required.");
//       setLoadingMessages(false);
//       return;
//     }

//     setLoadingMessages(true);
//     setIsRefreshing(true); // Set refreshing true at the start of any fetch triggered by this function
//     setErrorMessage(null);
//     try {
//       const data = await inboxAdminService.getAllMessagesAdmin(1, 10000);

//       if (data.messages.length > 0 && data.messages[0].body === undefined) {
//         console.warn("Warning: Message 'body' is not being fetched. Editing will not work correctly.");
//       }
//       setAllMessages(data.messages);
//       setTotalMessagesCount(data.totalMessages);

//     } catch (err: any) {
//       console.error("Fetch admin inbox error:", err);
//       setErrorMessage(err.message || "Failed to load inbox messages.");
//       setAllMessages([]);
//       setTotalMessagesCount(0);
//     } finally {
//       setLoadingMessages(false);
//       setIsRefreshing(false); // Set refreshing false at the end
//     }
//   }, [token, isAdmin, authLoading, router]);

//   useEffect(() => {
//     fetchInboxMessages();
//   }, [fetchInboxMessages]);

//   // --- Client-Side Sorting and Pagination Logic ---
//   useEffect(() => {
//     let processedMessages = [...allMessages];

//     if (sortField) {
//       processedMessages.sort((a, b) => {
//         let valA: any;
//         let valB: any;

//         switch (sortField) {
//           case 'status':
//             valA = a.isRead;
//             valB = b.isRead;
//             break;
//           case 'recipient':
//             valA = (a.userId?.fullName || a.userId?.email || '').toLowerCase();
//             valB = (b.userId?.fullName || b.userId?.email || '').toLowerCase();
//             break;
//           case 'sender':
//             valA = (a.sender || '').toLowerCase();
//             valB = (b.sender || '').toLowerCase();
//             break;
//           case 'subject':
//             valA = (a.subject || '').toLowerCase();
//             valB = (b.subject || '').toLowerCase();
//             break;
//           case 'sentAt':
//             valA = a.sentAt ? new Date(a.sentAt).getTime() : 0;
//             valB = b.sentAt ? new Date(b.sentAt).getTime() : 0;
//             break;
//           default:
//             return 0;
//         }

//         if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
//         if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     setTotalPages(Math.ceil(processedMessages.length / itemsPerPage));

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setDisplayedMessages(processedMessages.slice(startIndex, endIndex));

//   }, [allMessages, sortField, sortDirection, currentPage, itemsPerPage]);

//   useEffect(() => {
//     if (currentPage !== 1) {
//         setCurrentPage(1);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sortField, sortDirection, itemsPerPage]);

//   const displayMessage = (type: 'success' | 'error', message: string) => {
//     if (type === 'success') setSuccessMessage(message);
//     else setErrorMessage(message);
//     setTimeout(() => {
//       setSuccessMessage(null);
//       setErrorMessage(null);
//     }, 5000);
//   };

//   const goToPage = (newPage: number) => {
//     if (newPage > 0 && newPage !== currentPage && newPage <= totalPages ) {
//       setCurrentPage(newPage);
//     } else if (newPage < 1 && totalPages > 0) {
//         setCurrentPage(1);
//     } else if (newPage > totalPages && totalPages > 0) {
//         setCurrentPage(totalPages);
//     }
//   };
//   const paginate = (pageNumber: number) => goToPage(pageNumber);
//   const goToPreviousPage = () => goToPage(currentPage - 1);
//   const goToNextPage = () => goToPage(currentPage + 1);

//   const handleRefresh = () => {
//     if (!loadingMessages && !isRefreshing) { // Ensure not already loading or refreshing
//       fetchInboxMessages();
//     }
//   };

//   const handlePageSizeChange = (size: number) => {
//     setItemsPerPage(size);
//   };

//   const toggleInboxSort = (field: InboxSortField) => {
//     const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const openDeleteConfirmation = (message: AdminInboxMessage) => setShowDeleteConfirm(message);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteMessage = async () => {
//     if (!showDeleteConfirm) return;
//     const messageIdToDelete = showDeleteConfirm._id;
//     setDeletingId(messageIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//       displayMessage('success', `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`);

//       const updatedAllMessages = allMessages.filter(msg => msg._id !== messageIdToDelete);
//       setAllMessages(updatedAllMessages);
//       setTotalMessagesCount(updatedAllMessages.length);

//       const newTotalPages = Math.ceil(updatedAllMessages.length / itemsPerPage);
//       if (currentPage > newTotalPages && newTotalPages > 0) {
//         setCurrentPage(newTotalPages);
//       } else if (updatedAllMessages.length === 0) {
//         setCurrentPage(1);
//       } else if (displayedMessages.length === 1 && currentPage > 1 && updatedAllMessages.length > 0) {
//         // If the last item on a page (not page 1) was deleted, go to previous page
//         setCurrentPage(currentPage - 1);
//       }

//     } catch (err: any) {
//       console.error("Delete message error:", err);
//       displayMessage('error', `Failed to delete message: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const openEditDialog = (message: AdminInboxMessage) => {
//     setEditingMessage(message);
//     setShowEditDialog(true);
//   };
//   const closeEditDialog = () => {
//     setShowEditDialog(false);
//     setEditingMessage(null);
//     setUpdatingId(null);
//   };

//   const handleSaveMessageUpdate = async (id: string, subject: string, body: string) => {
//     if (!editingMessage || updatingId) return;
//     setUpdatingId(editingMessage._id);
//     try {
//       const payload: AdminUpdatePayload = { subject, body };
//       if (!payload.subject || !payload.body) {
//         displayMessage('error', "Subject and body cannot be empty.");
//         setUpdatingId(null);
//         return;
//       }
//       const updatedMsg = await inboxAdminService.updateMessageAdmin(editingMessage._id, payload);
//       displayMessage('success', `Message (${editingMessage._id.slice(-6)}) updated successfully.`);

//       setAllMessages(prev => prev.map(msg => msg._id === id ? {...msg, ...payload, ...updatedMsg} : msg));

//       closeEditDialog();
//     } catch (err: any) {
//       console.error("Update message error:", err);
//       displayMessage('error', `Failed to update message: ${err.message}`);
//       setUpdatingId(null);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white flex items-center gap-2">
//               <MessageSquare className="size-7 text-primary" />
//               Admin Inbox
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               View and manage all messages sent to users.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
//             >
//               <Filter size={18} />
//               Filters
//             </button>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing || loadingMessages}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh inbox data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
//             </button>
//           </div>
//         </div>

//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check
//                   className="text-green-600 dark:text-green-400"
//                   size={18}
//                 />
//                 <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                   {successMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
//               >
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {errorMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <XIcon className="text-red-600 dark:text-red-400" size={18} />
//                 <p className="text-sm font-medium text-red-800 dark:text-red-300">
//                   {errorMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setErrorMessage(null)}
//                 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
//               >
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination and Page Size Controls */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="itemsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="itemsPerPage"
//               value={itemsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//               disabled={loadingMessages || isRefreshing}
//             >
//               {ITEMS_PER_PAGE_OPTIONS.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {displayedMessages.length > 0
//               ? (currentPage - 1) * itemsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * itemsPerPage, totalMessagesCount)} of{" "}
//             {totalMessagesCount} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {/* Inbox Table */}
//         <InboxTable
//           messages={displayedMessages}
//           loading={
//             (loadingMessages && allMessages.length === 0) || isRefreshing
//           }
//           onEdit={openEditDialog}
//           onDelete={openDeleteConfirmation}
//           deletingId={deletingId}
//           updatingId={updatingId}
//           itemsPerPage={itemsPerPage}
//           toggleSort={toggleInboxSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//         />

//         {/* Pagination */}
//         {totalPages > 1 && !loadingMessages && displayedMessages.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       {/* Edit Message Modal */}
//       <EditMessageModal
//         isOpen={showEditDialog}
//         onClose={closeEditDialog}
//         message={editingMessage}
//         onSave={handleSaveMessageUpdate}
//         isLoading={!!updatingId}
//       />

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         message={showDeleteConfirm}
//         onConfirm={handleDeleteMessage}
//         isLoading={!!deletingId}
//       />
//     </div>
//   );
// };

// export default AdminInboxPage;

// Latest yesterday code
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// // Auth & Services
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxAdminService, { AdminUpdatePayload } from '../../../services/admin/inbox';
// import type { AdminInboxMessage } from '../../../services/admin/inbox'; // Removed AdminInboxListResponse as it's not directly used here

// // Custom Components
// import EditMessageModal from '../../components/message/inbox/EditMessageModal';
// import DeleteConfirmationModal from '../../components/message/inbox/DeleteConfirmationModal';
// import InboxTable from '../../components/message/inbox/InboxTable';
// import { InboxSortField } from '../../components/message/inbox/InboxTableHeader';
// import Pagination from '../../components/Pagination';
// import GenericFilters, { FiltersState } from '../../components/GenericFilters'; // <-- IMPORT GenericFilters & FiltersState

// // Icons
// import { MessageSquare, RefreshCw, Check, X as XIcon, Filter } from 'lucide-react';
// // import { cn } from '@/lib/utils'; // cn was not used, removed for now

// const ITEMS_PER_PAGE_OPTIONS = [10, 15, 25, 50];

// // Define initial filter state structure for this page
// const initialInboxFilters: FiltersState = {
//     searchTerm: '',
//     fromDate: '',
//     toDate: '',
//     statusFilter: 'all', // Required by GenericFilters, but won't be used for filtering logic here
//     currencyFilter: 'all', // Required by GenericFilters, but won't be used for filtering logic here
//     idFilter: '', // Required by GenericFilters, won't be shown/used
//     amountFilter: '', // Required by GenericFilters, won't be shown/used
//     recipientFilter: '', // This will be used for "Sender"
// };

// const AdminInboxPage: React.FC = () => {
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();

//   const [allMessages, setAllMessages] = useState<AdminInboxMessage[]>([]);
//   const [displayedMessages, setDisplayedMessages] = useState<AdminInboxMessage[]>([]);

//   const [filteredMessageCount, setFilteredMessageCount] = useState<number>(0); // Count after filtering
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[1]);

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<AdminInboxMessage | null>(null);

//   const [editingMessage, setEditingMessage] = useState<AdminInboxMessage | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   // --- Sorting State ---
//   const [sortField, setSortField] = useState<InboxSortField | null>('sentAt');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

//   // --- Filter State ---
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [activeFilters, setActiveFilters] = useState<FiltersState>(initialInboxFilters);

//   const fetchInboxMessages = useCallback(async () => {
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//       return;
//     }
//     if (!isAdmin) {
//       setErrorMessage("Access Denied: Administrator privileges required.");
//       setLoadingMessages(false);
//       return;
//     }

//     setLoadingMessages(true);
//     setIsRefreshing(true);
//     setErrorMessage(null);
//     try {
//       // Fetching a large number to enable client-side operations for all data
//       // Consider server-side pagination/filtering/sorting for very large datasets
//       const data = await inboxAdminService.getAllMessagesAdmin(1, 100000);

//       if (data.messages.length > 0 && data.messages[0].body === undefined) {
//         console.warn("Warning: Message 'body' is not being fetched. Editing will not work correctly.");
//       }
//       setAllMessages(data.messages);
//       // Initial count before any client-side filtering
//       // setFilteredMessageCount(data.totalMessages); // This will be updated by the filter effect

//     } catch (err: any) {
//       console.error("Fetch admin inbox error:", err);
//       setErrorMessage(err.message || "Failed to load inbox messages.");
//       setAllMessages([]);
//       setFilteredMessageCount(0);
//     } finally {
//       setLoadingMessages(false);
//       setIsRefreshing(false);
//     }
//   }, [token, isAdmin, authLoading, router]);

//   useEffect(() => {
//     fetchInboxMessages();
//   }, [fetchInboxMessages]);

//   // --- Client-Side Filtering, Sorting, and Pagination Logic ---
//   useEffect(() => {
//     let processedMessages = [...allMessages];

//     // 1. Apply Filters
//     if (activeFilters.searchTerm) {
//         const term = activeFilters.searchTerm.toLowerCase();
//         processedMessages = processedMessages.filter(msg =>
//             msg._id.toLowerCase().includes(term) ||
//             (msg.userId?.fullName && msg.userId.fullName.toLowerCase().includes(term)) ||
//             (msg.userId?.email && msg.userId.email.toLowerCase().includes(term)) ||
//             (msg.subject && msg.subject.toLowerCase().includes(term))
//         );
//     }

//     if (activeFilters.recipientFilter) { // This is our "Sender" filter
//         const senderTerm = activeFilters.recipientFilter.toLowerCase();
//         processedMessages = processedMessages.filter(msg =>
//             msg.sender && msg.sender.toLowerCase().includes(senderTerm)
//         );
//     }

//     if (activeFilters.fromDate) {
//         try {
//             const from = new Date(activeFilters.fromDate).getTime();
//             processedMessages = processedMessages.filter(msg =>
//                 msg.sentAt && new Date(msg.sentAt).getTime() >= from
//             );
//         } catch (e) { console.error("Invalid fromDate for filtering:", activeFilters.fromDate); }
//     }

//     if (activeFilters.toDate) {
//         try {
//             const toDateObj = new Date(activeFilters.toDate);
//             toDateObj.setHours(23, 59, 59, 999); // Include the whole 'to' day
//             const to = toDateObj.getTime();
//             processedMessages = processedMessages.filter(msg =>
//                 msg.sentAt && new Date(msg.sentAt).getTime() <= to
//             );
//         } catch (e) { console.error("Invalid toDate for filtering:", activeFilters.toDate); }
//     }

//     setFilteredMessageCount(processedMessages.length); // Update count after filtering

//     // 2. Apply Sorting
//     if (sortField) {
//       processedMessages.sort((a, b) => {
//         let valA: any;
//         let valB: any;

//         switch (sortField) {
//           case 'status':
//             valA = a.isRead;
//             valB = b.isRead;
//             break;
//           case 'recipient': // User (recipient of message)
//             valA = (a.userId?.fullName || a.userId?.email || '').toLowerCase();
//             valB = (b.userId?.fullName || b.userId?.email || '').toLowerCase();
//             break;
//           case 'sender': // Actual sender field from message
//             valA = (a.sender || '').toLowerCase();
//             valB = (b.sender || '').toLowerCase();
//             break;
//           case 'subject':
//             valA = (a.subject || '').toLowerCase();
//             valB = (b.subject || '').toLowerCase();
//             break;
//           case 'sentAt':
//             valA = a.sentAt ? new Date(a.sentAt).getTime() : 0;
//             valB = b.sentAt ? new Date(b.sentAt).getTime() : 0;
//             break;
//           default:
//             return 0;
//         }

//         if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
//         if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     // 3. Apply Pagination
//     const newTotalPages = Math.ceil(processedMessages.length / itemsPerPage);
//     setTotalPages(newTotalPages);

//     // Adjust current page if it's out of bounds after filtering/sorting
//     let newCurrentPage = currentPage;
//     if (newCurrentPage > newTotalPages && newTotalPages > 0) {
//         newCurrentPage = newTotalPages;
//     } else if (newCurrentPage < 1 && newTotalPages > 0) {
//         newCurrentPage = 1;
//     } else if (newTotalPages === 0) {
//         newCurrentPage = 1; // Reset to 1 if no results
//     }
//     // If current page changed, update state. Otherwise, slice with existing currentPage.
//     // This effect will re-run if currentPage changes, so direct slicing is fine.
//     // setCurrentPage(newCurrentPage); // Avoid direct state update in this effect if possible, let pagination controls handle it

//     const startIndex = (newCurrentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setDisplayedMessages(processedMessages.slice(startIndex, endIndex));

//   }, [allMessages, activeFilters, sortField, sortDirection, currentPage, itemsPerPage]);

//   // Reset to page 1 if filters, sort, or itemsPerPage change
//   useEffect(() => {
//     if (currentPage !== 1) {
//         setCurrentPage(1);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeFilters, sortField, sortDirection, itemsPerPage]);

//   const displayMessage = (type: 'success' | 'error', message: string) => {
//     if (type === 'success') setSuccessMessage(message);
//     else setErrorMessage(message);
//     setTimeout(() => {
//       setSuccessMessage(null);
//       setErrorMessage(null);
//     }, 5000);
//   };

//   const goToPage = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     } else if (totalPages === 0 && newPage === 1) { // Allow setting to 1 if no pages
//       setCurrentPage(1);
//     }
//   };

//   const paginate = (pageNumber: number) => goToPage(pageNumber);
//   const goToPreviousPage = () => goToPage(currentPage - 1);
//   const goToNextPage = () => goToPage(currentPage + 1);

//   const handleRefresh = () => {
//     if (!loadingMessages && !isRefreshing) {
//       fetchInboxMessages();
//     }
//   };

//   const handlePageSizeChange = (size: number) => {
//     setItemsPerPage(size);
//     // setCurrentPage(1); // Already handled by the useEffect above
//   };

//   const toggleInboxSort = (field: InboxSortField) => {
//     const newDirection = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc';
//     setSortField(field);
//     setSortDirection(newDirection);
//     // setCurrentPage(1); // Already handled by the useEffect above
//   };

//   // --- Filter Handlers ---
//   const handleApplyInboxFilters = (filters: FiltersState) => {
//     setActiveFilters(filters);
//     // setCurrentPage(1); // Already handled by the useEffect above
//     setShowFilterModal(false); // Close modal on apply
//   };

//   const handleClearInboxFilters = () => {
//     setActiveFilters(initialInboxFilters);
//     // setCurrentPage(1); // Already handled by the useEffect above
//     setShowFilterModal(false); // Close modal on clear
//   };

//   const openDeleteConfirmation = (message: AdminInboxMessage) => setShowDeleteConfirm(message);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteMessage = async () => {
//     if (!showDeleteConfirm) return;
//     const messageIdToDelete = showDeleteConfirm._id;
//     setDeletingId(messageIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//       displayMessage('success', `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`);

//       // Refetch or update client-side state
//       setAllMessages(prev => prev.filter(msg => msg._id !== messageIdToDelete));
//       // Counts and pagination will be recalculated by the main useEffect

//     } catch (err: any)      {
//       console.error("Delete message error:", err);
//       displayMessage('error', `Failed to delete message: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const openEditDialog = (message: AdminInboxMessage) => {
//     setEditingMessage(message);
//     setShowEditDialog(true);
//   };
//   const closeEditDialog = () => {
//     setShowEditDialog(false);
//     setEditingMessage(null);
//     setUpdatingId(null);
//   };

//   const handleSaveMessageUpdate = async (id: string, subject: string, body: string) => {
//     if (!editingMessage || updatingId) return;
//     setUpdatingId(editingMessage._id);
//     try {
//       const payload: AdminUpdatePayload = { subject, body };
//       if (!payload.subject || !payload.body) {
//         displayMessage('error', "Subject and body cannot be empty.");
//         setUpdatingId(null);
//         return;
//       }
//       const updatedMsgFromServer = await inboxAdminService.updateMessageAdmin(editingMessage._id, payload);
//       displayMessage('success', `Message (${editingMessage._id.slice(-6)}) updated successfully.`);

//       // Update client-side state with potentially more fields from server
//       setAllMessages(prev => prev.map(msg => msg._id === id ? {...msg, ...payload, ...updatedMsgFromServer} : msg));

//       closeEditDialog();
//     } catch (err: any) {
//       console.error("Update message error:", err);
//       displayMessage('error', `Failed to update message: ${err.message}`);
//       setUpdatingId(null); // Ensure updatingId is cleared on error too
//     }
//   };

//   // Dummy options for GenericFilters as currency/status are not used on this page
//   const DUMMY_OPTIONS = useMemo(() => ['all'], []);

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <h1 className="text-2xl font-bold text-mainheading dark:text-white flex items-center gap-2">
//               <MessageSquare className="size-7 text-primary" />
//               Admin Inbox
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               View and manage all messages sent to users.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
//             >
//               <Filter size={18} />
//               Filters
//             </button>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing || loadingMessages}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh inbox data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
//             </button>
//           </div>
//         </div>

//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check
//                   className="text-green-600 dark:text-green-400"
//                   size={18}
//                 />
//                 <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                   {successMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
//               >
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {errorMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <XIcon className="text-red-600 dark:text-red-400" size={18} />
//                 <p className="text-sm font-medium text-red-800 dark:text-red-300">
//                   {errorMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setErrorMessage(null)}
//                 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
//               >
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination and Page Size Controls */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="itemsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="itemsPerPage"
//               value={itemsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//               disabled={loadingMessages || isRefreshing}
//             >
//               {ITEMS_PER_PAGE_OPTIONS.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {displayedMessages.length > 0
//               ? (currentPage - 1) * itemsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * itemsPerPage, filteredMessageCount)} of{" "}
//             {filteredMessageCount} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {/* Inbox Table */}
//         <InboxTable
//           messages={displayedMessages}
//           loading={
//             (loadingMessages && allMessages.length === 0 && !isRefreshing) || (isRefreshing && displayedMessages.length === 0)
//           }
//           onEdit={openEditDialog}
//           onDelete={openDeleteConfirmation}
//           deletingId={deletingId}
//           updatingId={updatingId}
//           itemsPerPage={itemsPerPage}
//           toggleSort={toggleInboxSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//         />

//         {/* Pagination */}
//         {totalPages > 1 && !loadingMessages && displayedMessages.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       {/* Generic Filters Modal */}
//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={activeFilters}
//         onApplyFilters={handleApplyInboxFilters}
//         onClearFilters={handleClearInboxFilters}
//         currencyOptions={DUMMY_OPTIONS} // Not used for inbox
//         statusOptions={DUMMY_OPTIONS}   // Not used for inbox

//         // Configure which filters to show
//         showIdFilter={false} // SearchTerm covers ID
//         showAmountFilter={false}
//         showCurrencyFilter={false}
//         showStatusFilter={false}
//         showDateFilter={true}
//         showRecipientFilter={true} // This will be our "Sender" filter

//         // Customize labels for the visible filters
//         recipientFilterLabel="Sender"
//         recipientFilterPlaceholder="Filter by Sender Name"
//         // Search term placeholder is generic enough
//         // Date filter label is generic enough
//       />

//       {/* Edit Message Modal */}
//       <EditMessageModal
//         isOpen={showEditDialog}
//         onClose={closeEditDialog}
//         message={editingMessage}
//         onSave={handleSaveMessageUpdate}
//         isLoading={!!updatingId}
//       />

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         message={showDeleteConfirm}
//         onConfirm={handleDeleteMessage}
//         isLoading={!!deletingId}
//       />
//     </div>
//   );
// };

// export default AdminInboxPage;

// // frontend/src/app/admin/inbox/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// // Auth & Services
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxAdminService, {
//   AdminUpdatePayload,
// } from "../../../services/admin/inbox";
// import type { AdminInboxMessage } from "../../../services/admin/inbox";

// // Custom Components
// import GenericFilters, {
//   FiltersState as GenericFiltersState,
// } from "../../components/GenericFilters";
// import EditMessageModal from "../../components/message/inbox/EditMessageModal";
// import DeleteConfirmationModal from "../../components/message/inbox/DeleteConfirmationModal";
// import InboxTable from "../../components/message/inbox/InboxTable";
// import { InboxSortField } from "../../components/message/inbox/InboxTableHeader";
// import Pagination from "../../components/Pagination";

// // Icons
// import {
//   MessageSquare,
//   RefreshCw,
//   Check,
//   X as XIcon,
//   Filter,
//   Inbox,
// } from "lucide-react";
// import { FaInbox } from "react-icons/fa";

// const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

// interface InboxPageFiltersState {
//   searchTerm: string;
//   senderInput: string;
//   fromDate: string; // Expects dd-MM-yyyy from DateInput via GenericFilters
//   toDate: string; // Expects dd-MM-yyyy from DateInput via GenericFilters
//   statusFilter: string;
// }

// // Helper function to parse date string (dd-MM-yyyy)
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     // Lenient parsing: Allow single/double digits for day/month
//     if (
//       !/^\d{1,2}$/.test(parts[0]) ||
//       !/^\d{1,2}$/.test(parts[1]) ||
//       !/^\d{4}$/.test(parts[2])
//     ) {
//       console.warn("Invalid date parts format:", parts, "Expected dd-MM-yyyy");
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
//     const year = parseInt(parts[2], 10);

//     // Basic range checks
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       console.warn("Date components out of range:", {
//         day,
//         month: month + 1,
//         year,
//       });
//       return null;
//     }
//     // Use UTC to avoid timezone issues if dates are stored/compared in UTC
//     const date = new Date(Date.UTC(year, month, day));
//     // Verify the date wasn't adjusted due to invalid day/month combo (e.g., Feb 30th)
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       console.warn(
//         "Date validation failed after construction (e.g., invalid day for month):",
//         dateString
//       );
//       return null;
//     }
//   }
//   console.warn(
//     "Could not parse date string (expected dd-MM-yyyy):",
//     dateString
//   );
//   return null;
// }

// const AdminInboxPage: React.FC = () => {
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();

//   const [allMessages, setAllMessages] = useState<AdminInboxMessage[]>([]);
//   const [displayedMessages, setDisplayedMessages] = useState<
//     AdminInboxMessage[]
//   >([]);

//   const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(
//     ITEMS_PER_PAGE_OPTIONS[0]
//   );

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] =
//     useState<AdminInboxMessage | null>(null);

//   const [editingMessage, setEditingMessage] =
//     useState<AdminInboxMessage | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

//   const [sortField, setSortField] = useState<InboxSortField | null>("sentAt");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [filters, setFilters] = useState<InboxPageFiltersState>({
//     searchTerm: "",
//     senderInput: "",
//     fromDate: "",
//     toDate: "",
//     statusFilter: "all",
//   });

//   const statusOptionsForFilter = useMemo(() => ["all", "read", "unread"], []);
//   const currencyOptionsForFilter = useMemo(() => ["all"], []);

//   const fetchInboxMessages = useCallback(async () => {
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//       return;
//     }
//     if (!isAdmin) {
//       setErrorMessage("Access Denied: Administrator privileges required.");
//       setLoadingMessages(false);
//       return;
//     }

//     setLoadingMessages(true);
//     setIsRefreshing(true);
//     setErrorMessage(null);
//     try {
//       const data = await inboxAdminService.getAllMessagesAdmin(1, 10000);

//       if (data.messages.length > 0 && data.messages[0].body === undefined) {
//         console.warn(
//           "Warning: Message 'body' is not being fetched. Editing will not work correctly."
//         );
//       }
//       setAllMessages(data.messages);
//     } catch (err: any) {
//       console.error("Fetch admin inbox error:", err);
//       setErrorMessage(err.message || "Failed to load inbox messages.");
//       setAllMessages([]);
//       setTotalMessagesCount(0);
//     } finally {
//       setLoadingMessages(false);
//       setIsRefreshing(false);
//     }
//   }, [token, isAdmin, authLoading, router]);

//   useEffect(() => {
//     fetchInboxMessages();
//   }, [fetchInboxMessages]);

//   useEffect(() => {
//     let processedMessages = [...allMessages];

//     // 1. Apply Filters
//     if (filters.searchTerm) {
//       const term = filters.searchTerm.toLowerCase();
//       processedMessages = processedMessages.filter(
//         (msg) =>
//           msg.userId?._id.toLowerCase().includes(term) ||
//           (msg.userId?.fullName &&
//             msg.userId.fullName.toLowerCase().includes(term)) ||
//           (msg.userId?.email && msg.userId.email.toLowerCase().includes(term))
//       );
//     }

//     if (filters.senderInput) {
//       const senderTerm = filters.senderInput.toLowerCase();
//       processedMessages = processedMessages.filter(
//         (msg) => msg.sender && msg.sender.toLowerCase().includes(senderTerm)
//       );
//     }

//     if (filters.statusFilter && filters.statusFilter !== "all") {
//       const isReadStatus = filters.statusFilter === "read";
//       processedMessages = processedMessages.filter(
//         (msg) => msg.isRead === isReadStatus
//       );
//     }

//     // Date Filtering using the new logic
//     const fromDateObj = parseDateString(filters.fromDate);
//     const toDateObj = parseDateString(filters.toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day in UTC
//       processedMessages = processedMessages.filter((msg) => {
//         if (!msg.sentAt) return false;
//         try {
//           const messageDate = new Date(msg.sentAt); // Assuming sentAt is a valid ISO string or Date object
//           // Compare timestamps for accuracy
//           return (
//             !isNaN(messageDate.getTime()) &&
//             messageDate.getTime() >= fromDateObj.getTime()
//           );
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999); // End of the day in UTC
//       processedMessages = processedMessages.filter((msg) => {
//         if (!msg.sentAt) return false;
//         try {
//           const messageDate = new Date(msg.sentAt); // Assuming sentAt is a valid ISO string or Date object
//           // Compare timestamps
//           return (
//             !isNaN(messageDate.getTime()) &&
//             messageDate.getTime() <= toDateObj.getTime()
//           );
//         } catch {
//           return false;
//         }
//       });
//     }

//     // 2. Apply Sorting
//     if (sortField) {
//       processedMessages.sort((a, b) => {
//         let valA: any;
//         let valB: any;
//         switch (sortField) {
//           case "status":
//             valA = a.isRead;
//             valB = b.isRead;
//             break;
//           case "recipient":
//             valA = (a.userId?.fullName || a.userId?.email || "").toLowerCase();
//             valB = (b.userId?.fullName || b.userId?.email || "").toLowerCase();
//             break;
//           case "sender":
//             valA = (a.sender || "").toLowerCase();
//             valB = (b.sender || "").toLowerCase();
//             break;
//           case "subject":
//             valA = (a.subject || "").toLowerCase();
//             valB = (b.subject || "").toLowerCase();
//             break;
//           case "sentAt":
//             valA = a.sentAt ? new Date(a.sentAt).getTime() : 0;
//             valB = b.sentAt ? new Date(b.sentAt).getTime() : 0;
//             break;
//           default:
//             return 0;
//         }
//         if (valA < valB) return sortDirection === "asc" ? -1 : 1;
//         if (valA > valB) return sortDirection === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setTotalMessagesCount(processedMessages.length);
//     const newTotalPages = Math.ceil(processedMessages.length / itemsPerPage);
//     setTotalPages(newTotalPages);

//     let newCurrentPage = currentPage;
//     if (newCurrentPage > newTotalPages && newTotalPages > 0) {
//       newCurrentPage = newTotalPages;
//     } else if (newCurrentPage <= 0 && newTotalPages > 0) {
//       newCurrentPage = 1;
//     } else if (newTotalPages === 0) {
//       newCurrentPage = 1;
//     }
//     if (
//       currentPage !== newCurrentPage &&
//       !(currentPage === 1 && newTotalPages === 0)
//     ) {
//       setCurrentPage(newCurrentPage);
//     }

//     const startIndex = (newCurrentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setDisplayedMessages(processedMessages.slice(startIndex, endIndex));
//   }, [
//     allMessages,
//     filters,
//     sortField,
//     sortDirection,
//     currentPage,
//     itemsPerPage,
//   ]);

//   const displayMessage = (type: "success" | "error", message: string) => {
//     if (type === "success") setSuccessMessage(message);
//     else setErrorMessage(message);
//     setTimeout(() => {
//       setSuccessMessage(null);
//       setErrorMessage(null);
//     }, 5000);
//   };

//   const goToPage = (newPage: number) => {
//     if (newPage > 0 && newPage !== currentPage && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     } else if (newPage < 1 && totalPages > 0) {
//       setCurrentPage(1);
//     } else if (newPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   };
//   const paginate = (pageNumber: number) => goToPage(pageNumber);
//   const goToPreviousPage = () => goToPage(currentPage - 1);
//   const goToNextPage = () => goToPage(currentPage + 1);

//   const handleRefresh = () => {
//     if (!loadingMessages && !isRefreshing) {
//       fetchInboxMessages();
//     }
//   };

//   const handlePageSizeChange = (size: number) => {
//     setItemsPerPage(size);
//     setCurrentPage(1);
//   };

//   const toggleInboxSort = (field: InboxSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//     setCurrentPage(1);
//   };

//   const handleApplyInboxFilters = useCallback(
//     (newGenericFilters: GenericFiltersState) => {
//       setFilters({
//         searchTerm: newGenericFilters.searchTerm,
//         senderInput: newGenericFilters.recipientFilter || "",
//         fromDate: newGenericFilters.fromDate, // fromDate from GenericFilters (expected as dd-MM-yyyy)
//         toDate: newGenericFilters.toDate, // toDate from GenericFilters (expected as dd-MM-yyyy)
//         statusFilter: newGenericFilters.statusFilter,
//       });
//       setCurrentPage(1);
//     },
//     []
//   );

//   const handleClearInboxFilters = useCallback(() => {
//     setFilters({
//       searchTerm: "",
//       senderInput: "",
//       fromDate: "",
//       toDate: "",
//       statusFilter: "all",
//     });
//     setCurrentPage(1);
//   }, []);

//   const openDeleteConfirmation = (message: AdminInboxMessage) =>
//     setShowDeleteConfirm(message);
//   const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

//   const handleDeleteMessage = async () => {
//     if (!showDeleteConfirm) return;
//     const messageIdToDelete = showDeleteConfirm._id;
//     setDeletingId(messageIdToDelete);
//     closeDeleteConfirmation();
//     try {
//       await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//       displayMessage(
//         "success",
//         `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`
//       );

//       const updatedAllMessages = allMessages.filter(
//         (msg) => msg._id !== messageIdToDelete
//       );
//       setAllMessages(updatedAllMessages);
//     } catch (err: any) {
//       console.error("Delete message error:", err);
//       displayMessage("error", `Failed to delete message: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const openEditDialog = (message: AdminInboxMessage) => {
//     setEditingMessage(message);
//     setShowEditDialog(true);
//   };
//   const closeEditDialog = () => {
//     setShowEditDialog(false);
//     setEditingMessage(null);
//     setUpdatingId(null);
//   };

//   const handleSaveMessageUpdate = async (
//     id: string,
//     subject: string,
//     body: string
//   ) => {
//     if (!editingMessage || updatingId) return;
//     setUpdatingId(editingMessage._id);
//     try {
//       const payload: AdminUpdatePayload = { subject, body };
//       if (!payload.subject || !payload.body) {
//         displayMessage("error", "Subject and body cannot be empty.");
//         setUpdatingId(null);
//         return;
//       }
//       const updatedMsg = await inboxAdminService.updateMessageAdmin(
//         editingMessage._id,
//         payload
//       );
//       displayMessage(
//         "success",
//         `Message (${editingMessage._id.slice(-6)}) updated successfully.`
//       );

//       setAllMessages((prev) =>
//         prev.map((msg) =>
//           msg._id === id ? { ...msg, ...payload, ...updatedMsg } : msg
//         )
//       );

//       closeEditDialog();
//     } catch (err: any) {
//       console.error("Update message error:", err);
//       displayMessage("error", `Failed to update message: ${err.message}`);
//       setUpdatingId(null);
//     }
//   };

//   const initialGenericFilters: GenericFiltersState = useMemo(
//     () => ({
//       searchTerm: filters.searchTerm,
//       fromDate: filters.fromDate,
//       toDate: filters.toDate,
//       statusFilter: filters.statusFilter,
//       currencyFilter: "all",
//       idFilter: "",
//       amountFilter: "",
//       recipientFilter: filters.senderInput,
//     }),
//     [filters]
//   );

//   return (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         {/* Header */}

//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <div className="inbox-massage">
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//                 <FaInbox className="size-6 text-mainheading dark:text-primary" />
//               </div>

//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//                 Admin Inbox
//               </h1>
//             </div>

//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Admin Inbox: View and manage all messages sent to users. Track
//               message status, details, and perform actions like editing.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-6 sm:px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
//             >
//               <Filter size={18} />
//               Filters
//             </button>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing || loadingMessages}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 sm:px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh inbox data"
//             >
//               <RefreshCw
//                 className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check
//                   className="text-green-600 dark:text-green-400"
//                   size={18}
//                 />
//                 <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                   {successMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
//               >
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {errorMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <XIcon className="text-red-600 dark:text-red-400" size={18} />
//                 <p className="text-sm font-medium text-red-800 dark:text-red-300">
//                   {errorMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setErrorMessage(null)}
//                 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
//               >
//                 <XIcon size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination and Page Size Controls */}
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="itemsPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="itemsPerPage"
//               value={itemsPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//               disabled={loadingMessages || isRefreshing}
//             >
//               {ITEMS_PER_PAGE_OPTIONS.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor cursor-pointer"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {displayedMessages.length > 0
//               ? (currentPage - 1) * itemsPerPage + 1
//               : 0}
//             - {Math.min(currentPage * itemsPerPage, totalMessagesCount)} of{" "}
//             {totalMessagesCount} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {/* Inbox Table */}
//         <InboxTable
//           messages={displayedMessages}
//           loading={
//             (loadingMessages &&
//               allMessages.length === 0 &&
//               !filters.searchTerm &&
//               !filters.senderInput &&
//               !filters.fromDate &&
//               !filters.toDate &&
//               filters.statusFilter === "all") ||
//             isRefreshing
//           }
//           onEdit={openEditDialog}
//           onDelete={openDeleteConfirmation}
//           deletingId={deletingId}
//           updatingId={updatingId}
//           itemsPerPage={itemsPerPage}
//           toggleSort={toggleInboxSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//         />

//         {/* Pagination */}
//         {totalPages > 1 && !loadingMessages && displayedMessages.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//       </div>

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={initialGenericFilters}
//         onApplyFilters={handleApplyInboxFilters}
//         onClearFilters={handleClearInboxFilters}
//         currencyOptions={currencyOptionsForFilter}
//         statusOptions={statusOptionsForFilter}
//         searchTermPlaceholder="Search User ID or Name..."
//         recipientFilterLabel="Sender"
//         recipientFilterPlaceholder="Filter by Sender Name"
//         statusFilterLabel="Status"
//         dateFilterLabel="Date Range (DD-MM-YYYY)" // Updated label for clarity
//         showRecipientFilter={true}
//         showIdFilter={false}
//         showAmountFilter={false}
//         showCurrencyFilter={false}
//         showStatusFilter={true}
//         showDateFilter={true}
//         allStatusesLabel="All Statuses"
//         allCurrenciesLabel="All Currencies"
//       />

//       <EditMessageModal
//         isOpen={showEditDialog}
//         onClose={closeEditDialog}
//         message={editingMessage}
//         onSave={handleSaveMessageUpdate}
//         isLoading={!!updatingId}
//       />

//       <DeleteConfirmationModal
//         isOpen={!!showDeleteConfirm}
//         onClose={closeDeleteConfirmation}
//         message={showDeleteConfirm}
//         onConfirm={handleDeleteMessage}
//         isLoading={!!deletingId}
//       />
//     </div>
//   );
// };

// export default AdminInboxPage;

// frontend/src/app/admin/inbox/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Auth & Services
import { useAuth } from "@/app/contexts/AuthContext";
import inboxAdminService, {
  AdminUpdatePayload,
} from "../../../services/admin/inbox";
import type { AdminInboxMessage } from "../../../services/admin/inbox";

// Custom Components
import GenericFilters, {
  FiltersState as GenericFiltersState,
} from "../../components/GenericFilters";
import EditMessageModal from "../../components/message/inbox/EditMessageModal";
import DeleteConfirmationModal from "../../components/message/inbox/DeleteConfirmationModal";
import InboxTable from "../../components/message/inbox/InboxTable";
import { InboxSortField } from "../../components/message/inbox/InboxTableHeader";
import Pagination from "../../components/Pagination";

// Icons
import {
  MessageSquare,
  RefreshCw,
  Check,
  X as XIcon,
  Filter,
  Inbox,
} from "lucide-react";
import { FaInbox } from "react-icons/fa";

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
// **IMPORTANT**: Adjust this path if your CustomToast component is elsewhere
import CustomToast, { CustomToastProps } from "../../../components/CustomToast";
// Example path: if CustomToast is in frontend/src/app/components/CustomToast.tsx
// import CustomToast, { CustomToastProps } from "../../components/CustomToast";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

interface InboxPageFiltersState {
  searchTerm: string;
  senderInput: string;
  fromDate: string;
  toDate: string;
  statusFilter: string;
}

function parseDateString(dateString: string): Date | null {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length === 3) {
    if (
      !/^\d{1,2}$/.test(parts[0]) ||
      !/^\d{1,2}$/.test(parts[1]) ||
      !/^\d{4}$/.test(parts[2])
    ) {
      console.warn("Invalid date parts format:", parts, "Expected dd-MM-yyyy");
      return null;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (
      day < 1 ||
      day > 31 ||
      month < 0 ||
      month > 11 ||
      year < 1900 ||
      year > 3000
    ) {
      console.warn("Date components out of range:", {
        day,
        month: month + 1,
        year,
      });
      return null;
    }
    const date = new Date(Date.UTC(year, month, day));
    if (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month &&
      date.getUTCDate() === day
    )
      return date;
    else {
      console.warn("Date validation failed after construction:", dateString);
      return null;
    }
  }
  console.warn(
    "Could not parse date string (expected dd-MM-yyyy):",
    dateString
  );
  return null;
}

const AdminInboxPage: React.FC = () => {
  const router = useRouter();
  const { token, isAdmin, loading: authLoading } = useAuth();

  const [allMessages, setAllMessages] = useState<AdminInboxMessage[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<
    AdminInboxMessage[]
  >([]);
  const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const [pageLevelError, setPageLevelError] = useState<string | null>(null); // For persistent page errors
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    ITEMS_PER_PAGE_OPTIONS[0]
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState<AdminInboxMessage | null>(null);
  const [editingMessage, setEditingMessage] =
    useState<AdminInboxMessage | null>(null);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [sortField, setSortField] = useState<InboxSortField | null>("sentAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filters, setFilters] = useState<InboxPageFiltersState>({
    searchTerm: "",
    senderInput: "",
    fromDate: "",
    toDate: "",
    statusFilter: "all",
  });
  const [isMobile, setIsMobile] = useState(false); // For ToastContainer

  const statusOptionsForFilter = useMemo(() => ["all", "read", "unread"], []);
  const currencyOptionsForFilter = useMemo(() => ["all"], []); // Not used but kept for GenericFilters compatibility

  // --- Mobile Detection Effect (for ToastContainer) ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Custom Toast Invocation ---
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

  // --- ToastContainer Props and Style ---
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

  const fetchInboxMessages = useCallback(async () => {
    if (authLoading) return;
    if (!token) {
      // showToast("Login required", 'warning', { onClose: () => router.push("/auth/login?message=login_required") });
      router.push("/auth/login?message=login_required");
      return;
    }
    if (!isAdmin) {
      setPageLevelError("Access Denied: Administrator privileges required.");
      showToast("Access Denied.", "error");
      setLoadingMessages(false);
      return;
    }
    setLoadingMessages(true);
    setIsRefreshing(true);
    setPageLevelError(null);
    try {
      const data = await inboxAdminService.getAllMessagesAdmin(1, 10000); // Fetch all for client-side processing
      if (data.messages.length > 0 && data.messages[0].body === undefined) {
        console.warn(
          "Warning: Message 'body' is not being fetched. Editing will not work correctly."
        );
      }
      setAllMessages(data.messages);
    } catch (err: any) {
      console.error("Fetch admin inbox error:", err);
      const errorMsg = err.message || "Failed to load inbox messages.";
      setPageLevelError(errorMsg);
      showToast(errorMsg, "error");
      setAllMessages([]);
      setTotalMessagesCount(0);
    } finally {
      setLoadingMessages(false);
      setIsRefreshing(false);
    }
  }, [token, isAdmin, authLoading, router, showToast]); // Added showToast

  useEffect(() => {
    fetchInboxMessages();
  }, [fetchInboxMessages]);

  useEffect(() => {
    let processedMessages = [...allMessages];
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      processedMessages = processedMessages.filter(
        (msg) =>
          msg.userId?._id.toLowerCase().includes(term) ||
          (msg.userId?.fullName &&
            msg.userId.fullName.toLowerCase().includes(term)) ||
          (msg.userId?.email && msg.userId.email.toLowerCase().includes(term))
      );
    }
    if (filters.senderInput) {
      const senderTerm = filters.senderInput.toLowerCase();
      processedMessages = processedMessages.filter(
        (msg) => msg.sender && msg.sender.toLowerCase().includes(senderTerm)
      );
    }
    if (filters.statusFilter && filters.statusFilter !== "all") {
      const isReadStatus = filters.statusFilter === "read";
      processedMessages = processedMessages.filter(
        (msg) => msg.isRead === isReadStatus
      );
    }
    const fromDateObj = parseDateString(filters.fromDate);
    const toDateObj = parseDateString(filters.toDate);
    if (fromDateObj) {
      fromDateObj.setUTCHours(0, 0, 0, 0);
      processedMessages = processedMessages.filter((msg) => {
        if (!msg.sentAt) return false;
        try {
          const d = new Date(msg.sentAt);
          return !isNaN(d.getTime()) && d.getTime() >= fromDateObj.getTime();
        } catch {
          return false;
        }
      });
    }
    if (toDateObj) {
      toDateObj.setUTCHours(23, 59, 59, 999);
      processedMessages = processedMessages.filter((msg) => {
        if (!msg.sentAt) return false;
        try {
          const d = new Date(msg.sentAt);
          return !isNaN(d.getTime()) && d.getTime() <= toDateObj.getTime();
        } catch {
          return false;
        }
      });
    }
    if (sortField) {
      processedMessages.sort((a, b) => {
        let valA: any, valB: any;
        switch (sortField) {
          case "status":
            valA = a.isRead;
            valB = b.isRead;
            break;
          case "recipient":
            valA = (a.userId?.fullName || a.userId?.email || "").toLowerCase();
            valB = (b.userId?.fullName || b.userId?.email || "").toLowerCase();
            break;
          case "sender":
            valA = (a.sender || "").toLowerCase();
            valB = (b.sender || "").toLowerCase();
            break;
          case "subject":
            valA = (a.subject || "").toLowerCase();
            valB = (b.subject || "").toLowerCase();
            break;
          case "sentAt":
            valA = a.sentAt ? new Date(a.sentAt).getTime() : 0;
            valB = b.sentAt ? new Date(b.sentAt).getTime() : 0;
            break;
          default:
            return 0;
        }
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    setTotalMessagesCount(processedMessages.length);
    const newTotalPages = Math.ceil(processedMessages.length / itemsPerPage);
    setTotalPages(newTotalPages);
    let newCurrentPage = currentPage;
    if (newCurrentPage > newTotalPages && newTotalPages > 0)
      newCurrentPage = newTotalPages;
    else if (newCurrentPage <= 0 && newTotalPages > 0) newCurrentPage = 1;
    else if (newTotalPages === 0) newCurrentPage = 1;
    if (
      currentPage !== newCurrentPage &&
      !(currentPage === 1 && newTotalPages === 0)
    )
      setCurrentPage(newCurrentPage);
    const startIndex = (newCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedMessages(processedMessages.slice(startIndex, endIndex));
  }, [
    allMessages,
    filters,
    sortField,
    sortDirection,
    currentPage,
    itemsPerPage,
  ]);

  const goToPage = (newPage: number) => {
    if (newPage > 0 && newPage !== currentPage && newPage <= totalPages)
      setCurrentPage(newPage);
    else if (newPage < 1 && totalPages > 0) setCurrentPage(1);
    else if (newPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  };
  const paginate = (pageNumber: number) => goToPage(pageNumber);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  const handleRefresh = () => {
    if (!loadingMessages && !isRefreshing) fetchInboxMessages();
  };
  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };
  const toggleInboxSort = (field: InboxSortField) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    setCurrentPage(1);
  };
  const handleApplyInboxFilters = useCallback(
    (newGenericFilters: GenericFiltersState) => {
      setFilters({
        searchTerm: newGenericFilters.searchTerm,
        senderInput: newGenericFilters.recipientFilter || "",
        fromDate: newGenericFilters.fromDate,
        toDate: newGenericFilters.toDate,
        statusFilter: newGenericFilters.statusFilter,
      });
      setCurrentPage(1);
    },
    []
  );
  const handleClearInboxFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      senderInput: "",
      fromDate: "",
      toDate: "",
      statusFilter: "all",
    });
    setCurrentPage(1);
  }, []);
  const openDeleteConfirmation = (message: AdminInboxMessage) =>
    setShowDeleteConfirm(message);
  const closeDeleteConfirmation = () => setShowDeleteConfirm(null);

  const handleDeleteMessage = async () => {
    if (!showDeleteConfirm) return;
    const messageIdToDelete = showDeleteConfirm._id;
    setDeletingId(messageIdToDelete);
    closeDeleteConfirmation();
    try {
      await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
      showToast(
        `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`,
        "success"
      );
      const updatedAllMessages = allMessages.filter(
        (msg) => msg._id !== messageIdToDelete
      );
      setAllMessages(updatedAllMessages);
    } catch (err: any) {
      console.error("Delete message error:", err);
      showToast(`Failed to delete message: ${err.message}`, "error");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditDialog = (message: AdminInboxMessage) => {
    setEditingMessage(message);
    setShowEditDialog(true);
  };
  const closeEditDialog = () => {
    setShowEditDialog(false);
    setEditingMessage(null);
    setUpdatingId(null);
  };

  const handleSaveMessageUpdate = async (
    id: string,
    subject: string,
    body: string
  ) => {
    if (!editingMessage || updatingId) return;
    setUpdatingId(editingMessage._id);
    try {
      const payload: AdminUpdatePayload = { subject, body };
      if (!payload.subject || !payload.body) {
        showToast("Subject and body cannot be empty.", "error");
        setUpdatingId(null);
        return;
      }
      const updatedMsg = await inboxAdminService.updateMessageAdmin(
        editingMessage._id,
        payload
      );
      showToast(
        `Message (${editingMessage._id.slice(-6)}) updated successfully.`,
        "success"
      );
      setAllMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, ...payload, ...updatedMsg } : msg
        )
      );
      closeEditDialog();
    } catch (err: any) {
      console.error("Update message error:", err);
      showToast(`Failed to update message: ${err.message}`, "error");
      setUpdatingId(null); // Ensure updatingId is reset even on error
    }
  };

  const initialGenericFilters: GenericFiltersState = useMemo(
    () => ({
      searchTerm: filters.searchTerm,
      fromDate: filters.fromDate,
      toDate: filters.toDate,
      statusFilter: filters.statusFilter,
      currencyFilter: "all",
      idFilter: "",
      amountFilter: "",
      recipientFilter: filters.senderInput,
    }),
    [filters]
  );

  return (
    <div className="container mx-auto px-4 py-5 relative">
      <ToastContainer
        {...customToastContainerProps}
        style={getToastContainerStyle()}
      />
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="inbox-massage">
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
                <FaInbox className="size-6 text-mainheading dark:text-primary" />
              </div>
              <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
                Admin Inbox
              </h1>
            </div>
            <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
              Admin Inbox: View and manage all messages sent to users. Track
              message status, details, and perform actions like editing.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-6 sm:px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
            >
              <Filter size={18} />
              Filters
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loadingMessages}
              className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 sm:px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh inbox data"
            >
              <RefreshCw
                className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Page Level Error Display for critical load errors */}
        <AnimatePresence>
          {pageLevelError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <XIcon className="text-red-600 dark:text-red-400" size={18} />
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  {pageLevelError}
                </p>
              </div>
              <button
                onClick={() => setPageLevelError(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              >
                <XIcon size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
              disabled={loadingMessages || isRefreshing}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="dark:bg-dropdowncolor cursor-pointer"
                >
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
              entries
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Showing{" "}
            {displayedMessages.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}
            -{Math.min(currentPage * itemsPerPage, totalMessagesCount)} of{" "}
            {totalMessagesCount} results
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>

        <InboxTable
          messages={displayedMessages}
          loading={
            (loadingMessages &&
              allMessages.length === 0 &&
              !filters.searchTerm &&
              !filters.senderInput &&
              !filters.fromDate &&
              !filters.toDate &&
              filters.statusFilter === "all") ||
            isRefreshing
          }
          onEdit={openEditDialog}
          onDelete={openDeleteConfirmation}
          deletingId={deletingId}
          updatingId={updatingId}
          itemsPerPage={itemsPerPage}
          toggleSort={toggleInboxSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        {totalPages > 1 && !loadingMessages && displayedMessages.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}
      </div>

      <GenericFilters
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        initialFilters={initialGenericFilters}
        onApplyFilters={handleApplyInboxFilters}
        onClearFilters={handleClearInboxFilters}
        currencyOptions={currencyOptionsForFilter}
        statusOptions={statusOptionsForFilter}
        searchTermPlaceholder="Search User ID or Name..."
        recipientFilterLabel="Sender"
        recipientFilterPlaceholder="Filter by Sender Name"
        statusFilterLabel="Status"
        dateFilterLabel="Date Range (DD-MM-YYYY)"
        showRecipientFilter={true}
        showIdFilter={false}
        showAmountFilter={false}
        showCurrencyFilter={false}
        showStatusFilter={true}
        showDateFilter={true}
        allStatusesLabel="All Statuses"
        allCurrenciesLabel="All Currencies"
      />
      <EditMessageModal
        isOpen={showEditDialog}
        onClose={closeEditDialog}
        message={editingMessage}
        onSave={handleSaveMessageUpdate}
        isLoading={!!updatingId}
      />
      <DeleteConfirmationModal
        isOpen={!!showDeleteConfirm}
        onClose={closeDeleteConfirmation}
        message={showDeleteConfirm}
        onConfirm={handleDeleteMessage}
        isLoading={!!deletingId}
      />
    </div>
  );
};

export default AdminInboxPage;
