// // frontend/src/app/your-account/inbox/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxService from '../../../services/inbox'; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from '../../../services/inbox'; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Inbox, RefreshCw } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from '../../components/inbox/InboxSkeleton';
// import { InboxEmptyState } from '../../components/inbox/InboxEmptyState';
// import { InboxErrorState } from '../../components/inbox/InboxErrorState';
// import { InboxMessageListItem } from '../../components/inbox/InboxMessageListItem';
// import { InboxMessageDetailView } from '../../components/inbox/InboxMessageDetailView';
// import { InboxPagination } from '../../components/inbox/InboxPagination';

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//     // --- Hooks & State ---
//     const { user, loading: authLoading } = useAuth();
//     const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true); // Start true for initial auth check/load
//     const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);

//     // --- Data Fetching Logic ---
//     // Updated fetchInbox: Simplified, always sets loading state
//     const fetchInbox = useCallback(async (page: number) => {
//         // This function now assumes it should show a loading indicator when called.
//         // The decision *whether* to call fetchInbox is made in the useEffect or handlers.
//         if (!user) {
//             // console.log("fetchInbox called without user, returning.");
//             setError("Authentication required.");
//             setLoading(false); // Ensure loading is off if called erroneously without user
//             setInboxData(null);
//             return;
//         }

//         // console.log(`Fetching inbox page ${page}`);
//         setLoading(true); // <<< Set loading true at the start of EVERY fetch attempt
//         setError(null); // Clear previous errors

//         try {
//             const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//             setInboxData(data);
//             // If the API returns a different page than requested (e.g., requested page 5, but only 3 exist, API returns 3)
//             // Update our state to match the actual page returned by the API.
//             if (data.currentPage !== page) {
//                 // console.log(`API returned page ${data.currentPage}, updating state from ${page}.`);
//                  // Use setTimeout to avoid potential state update conflicts if this fetch was triggered by setCurrentPage
//                  setTimeout(() => setCurrentPage(data.currentPage), 0);
//             }
//             // console.log("Inbox data received:", data);
//         } catch (err: any) {
//             console.error("Failed to fetch inbox:", err);
//             const errorMessage = err.response?.data?.message || err.message || "Could not load messages.";
//             setError(errorMessage);
//             setInboxData(null); // Clear potentially stale data on error
//         } finally {
//             setLoading(false); // <<< Always set loading false when fetch finishes (success or error)
//             // console.log("Loading indicator turned off.");
//         }
//     }, [user]); // Dependency: user. If user changes, we get a new fetch function instance.

//     // Effect to fetch data based on auth state and page changes
//     useEffect(() => {
//         // console.log("InboxPage useEffect triggered. AuthLoading:", authLoading, "User:", !!user, "CurrentPage:", currentPage);

//         // Condition 1: Auth check finished, user exists -> Fetch data
//         if (!authLoading && user) {
//             // console.log("User authenticated, calling fetchInbox for page:", currentPage);
//             fetchInbox(currentPage); // Call fetchInbox for the current page
//         }
//         // Condition 2: Auth check finished, but no user (logged out/unauthenticated)
//         else if (!authLoading && !user) {
//             // console.log("User not authenticated. Clearing state.");
//             setError("Please log in to view your inbox.");
//             setLoading(false); // Ensure loading indicator is off
//             setInboxData(null); // Clear any potential stale data
//             setSelectedMessage(null); // Clear selection
//             // Optional: Reset to page 1 if user logs out (or keep current page if you prefer)
//             // setCurrentPage(1); // Uncomment if you want to reset page on logout
//         }
//         // Condition 3: Auth is still loading - Do nothing here, loading state is already true initially
//         // The initial skeleton will be shown based on the initial state `loading: true`
//         else {
//             // console.log("Auth is loading...");
//             // Ensure loading is true if it somehow got set to false during auth check
//              if (!loading) setLoading(true);
//         }

//         // --- CORRECTED Dependency Array ---
//         // This effect should ONLY re-run if:
//         // - Authentication finishes (`authLoading` changes from true to false)
//         // - The logged-in user changes (`user` object reference changes - login/logout)
//         // - The desired page changes (`currentPage` state changes)
//         // - The fetch function itself changes (due to `user` dependency in useCallback)
//     }, [authLoading, user, currentPage, fetchInbox]); // <<< REMOVED inboxData

//     // --- Action Handlers ---
//     // (Keep handleActionStart and handleActionEnd as they are)
//     const handleActionStart = (messageId: string) => {
//         setActionLoading(prev => ({ ...prev, [messageId]: true }));
//     };

//     const handleActionEnd = (messageId: string) => {
//         setActionLoading(prev => {
//             const newState = { ...prev };
//             delete newState[messageId];
//             return newState;
//         });
//     };

//     // (Keep handleMarkRead as it is - optimistic update logic is fine)
//     const handleMarkRead = useCallback(async (message: InboxMessage) => {
//         if (message.isRead || actionLoading[message._id]) return;

//         handleActionStart(message._id);
//         const originalData = structuredClone(inboxData);
//         const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;

//         setInboxData(prev => {
//             if (!prev) return null;
//             const newMessages = prev.messages.map(msg =>
//                 msg._id === message._id ? { ...msg, isRead: true } : msg
//             );
//             return { ...prev, messages: newMessages };
//         });
//          if (selectedMessage?._id === message._id) {
//             setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
//          }

//         try {
//             await inboxService.markAsRead(message._id);
//         } catch (err) {
//             console.error("Failed to mark as read:", err);
//             setError("Failed to update message status. Please try refreshing.");
//             setInboxData(originalData);
//             setSelectedMessage(originalSelectedMessage);
//         } finally {
//             handleActionEnd(message._id);
//         }
//     }, [inboxData, selectedMessage, actionLoading]);

//     // (Keep handleDelete as it is - optimistic update and page change logic is fine)
//      const handleDelete = useCallback(async (messageId: string) => {
//          if (actionLoading[messageId]) return;

//          handleActionStart(messageId);
//          const originalData = structuredClone(inboxData);
//          const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;
//          const isDeletingSelected = selectedMessage?._id === messageId;

//          let pageToNavigateTo = currentPage;
//          let shouldRefetchPage = false; // Flag to indicate if a refetch is needed after deletion

//          setInboxData(prev => {
//              if (!prev) return null;
//              const newMessages = prev.messages.filter(msg => msg._id !== messageId);
//              const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//              const newTotalPages = Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//              // If we deleted the last item on a page > 1, plan to navigate back
//              if (newMessages.length === 0 && prev.messages.length > 0 && currentPage > 1) {
//                  pageToNavigateTo = Math.max(1, currentPage - 1);
//              }
//               // If we deleted an item but there are still items on the current page,
//               // AND the total number of messages means the last page might now be empty,
//               // we might need to refetch the *current* page to get the next item pulled in from the server.
//               // This handles the case where deleting item 1 on page 1 (of 2 total pages) should show item 11 (now the 10th item overall).
//               else if (newMessages.length < MESSAGES_PER_PAGE && newTotalMessages >= MESSAGES_PER_PAGE * (currentPage -1) + newMessages.length + 1) {
//                 // console.log("Potential need to refetch current page after delete");
//                 shouldRefetchPage = true;
//               }

//              return {
//                  ...prev,
//                  messages: newMessages,
//                  totalMessages: newTotalMessages,
//                  totalPages: newTotalPages,
//                  currentPage: prev.currentPage // Keep current page in state for now
//              };
//          });

//          if (isDeletingSelected) {
//              setSelectedMessage(null);
//          }

//          try {
//              await inboxService.deleteMessage(messageId);
//              // Success: Apply navigation or refetch logic
//              if (pageToNavigateTo !== currentPage) {
//                  // console.log(`Last item deleted on page ${currentPage}, navigating to page ${pageToNavigateTo}`);
//                  setTimeout(() => setCurrentPage(pageToNavigateTo), 0); // Defer state update slightly
//              } else if (shouldRefetchPage) {
//                  // console.log(`Refetching current page ${currentPage} after deletion.`);
//                  // Refetch the current page to potentially pull in the next item
//                  setTimeout(() => fetchInbox(currentPage), 0); // Defer fetch slightly
//              } else if (originalData?.messages.length === 1 && currentPage === 1) {
//                  // Last overall message deleted, UI updated optimistically. No action needed.
//              }

//          } catch (err: any) {
//              console.error("Failed to delete message:", err);
//              setError(err.response?.data?.message || err.message || "Failed to delete message. Please try refreshing.");
//              setInboxData(originalData); // Revert UI
//              if(isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//          } finally {
//              handleActionEnd(messageId);
//          }
//      }, [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]); // Added fetchInbox dependency

//     // (Keep handleSelectMessage as it is)
//     const handleSelectMessage = useCallback((message: InboxMessage) => {
//         setSelectedMessage(message);
//         if (!message.isRead) {
//             handleMarkRead(message);
//         }
//     }, [handleMarkRead]);

//     // (Keep handlePageChange as it is)
//     const handlePageChange = (newPage: number) => {
//         if (loading || newPage === currentPage || newPage < 1 || (inboxData && newPage > inboxData.totalPages)) {
//             return;
//         }
//         setSelectedMessage(null);
//         setCurrentPage(newPage); // Triggers the main useEffect
//     };

//     // Updated handleRefresh: Use the simplified fetchInbox
//      const handleRefresh = useCallback(() => {
//          if (loading) return;
//          // console.log("Refreshing inbox page:", currentPage);
//          setSelectedMessage(null);
//          fetchInbox(currentPage); // Fetch current page again
//      }, [loading, currentPage, fetchInbox]); // Added fetchInbox dependency

//     // --- Render Logic ---

//     // Initial Loading State (Auth check or first fetch)
//     // Show skeleton if auth is loading OR if the main loading flag is true AND we have no data/error yet.
//     if (authLoading || (loading && !inboxData && !error)) {
//         // console.log("Rendering: Skeleton (Initial Load or Auth)");
//         return <InboxSkeleton />;
//     }

//     // Derived state for rendering ease
//     const messages = inboxData?.messages ?? [];
//     const totalMessages = inboxData?.totalMessages ?? 0;
//     const totalPages = inboxData?.totalPages ?? 1;
//     // Use the state currentPage for consistency, as API might return a different page number if requested page was invalid
//     const displayPage = currentPage;

//     // console.log("Rendering: Main Content. Selected:", !!selectedMessage, "Loading:", loading, "Error:", !!error, "Data:", !!inboxData, "Msg Count:", messages.length);

//     return (
//         <section className="Your-Inbox py-8 md:py-12">
//             <div className="max-w-4xl mx-auto px-4">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6 md:mb-8">
//                     <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white flex items-center gap-2">
//                         <Inbox className="size-7 text-primary" /> Your Inbox
//                     </h1>
//                      {/* Refresh Button - Show unless viewing details and no error */}
//                     { (!selectedMessage || error) && (
//                          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//                              <RefreshCw className={cn("mr-2 h-4 w-4", loading && !error && "animate-spin")} />
//                              {loading && !error ? 'Refreshing...' : 'Refresh'}
//                          </Button>
//                      )}
//                 </div>

//                 {/* Error Display Area */}
//                 {error && !loading && ( // Show error only if not actively loading
//                     <div className="mb-6">
//                         <InboxErrorState error={error} onRetry={handleRefresh} />
//                     </div>
//                 )}

//                 {/* Content Area: List or Detail */}
//                 <div className="relative min-h-[300px]"> {/* Added min-height */}
//                     {!selectedMessage ? (
//                         // ----- List View -----
//                         <>
//                             {/* Subtle loading overlay ONLY when actively loading AND data already exists (i.e., refresh/page change) */}
//                             {loading && !error && messages.length > 0 && (
//                                 <div className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
//                                      <RefreshCw className="size-6 animate-spin text-primary" />
//                                 </div>
//                             )}

//                              {/* Show Empty State if NOT loading, NO error, and NO messages */}
//                              {!loading && !error && messages.length === 0 && totalMessages === 0 ? (
//                                 <InboxEmptyState />
//                              ) : null}

//                              {/* Show Message List if NOT loading, NO error, AND messages exist */}
//                              {!loading && !error && messages.length > 0 ? (
//                                 <div className='space-y-3'>
//                                     {messages.map((message) => (
//                                         <InboxMessageListItem
//                                             key={message._id}
//                                             message={message}
//                                             onSelect={handleSelectMessage}
//                                             onDelete={handleDelete}
//                                             isDeleting={!!actionLoading[message._id]}
//                                         />
//                                     ))}
//                                 </div>
//                              ) : null }

//                              {/* Edge case: Loading finished, no error, but messages array is empty (e.g., after deleting last item on a page before navigation/refetch completes)
//                                  Avoid showing Empty State here briefly. The loading overlay or subsequent render will handle it.
//                                  The min-height on the container prevents layout collapse. */}

//                             {/* Pagination - Show if multiple pages exist and no error */}
//                             {totalMessages > 0 && totalPages > 1 && !error && (
//                                  <InboxPagination
//                                      currentPage={displayPage} // Display current state page
//                                      totalPages={totalPages}
//                                      totalMessages={totalMessages}
//                                      onPageChange={handlePageChange}
//                                      isLoading={loading} // Disable during main load/refresh
//                                  />
//                              )}
//                         </>
//                     ) : (
//                         // ----- Detail View -----
//                         <InboxMessageDetailView
//                             message={selectedMessage}
//                             onBack={() => setSelectedMessage(null)}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[selectedMessage._id]}
//                         />
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default InboxPage;

// // frontend/src/app/your-account/inbox/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxService from '../../../services/inbox'; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from '../../../services/inbox'; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator"; // Import Separator
// import { Inbox, RefreshCw, MailWarning } from 'lucide-react'; // Added MailWarning icon
// import { cn } from '@/lib/utils'; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from '../../components/inbox/InboxSkeleton';
// import { InboxEmptyState } from '../../components/inbox/InboxEmptyState';
// import { InboxErrorState } from '../../components/inbox/InboxErrorState';
// import { InboxMessageListItem } from '../../components/inbox/InboxMessageListItem';
// import { InboxMessageDetailView } from '../../components/inbox/InboxMessageDetailView';
// // REMOVE old pagination import
// // import { InboxPagination } from '../../components/inbox/InboxPagination';
// // ADD new pagination import (adjust path as necessary)
// import Pagination from '../../components/Pagination';

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//     // --- Hooks & State ---
//     const { user, loading: authLoading } = useAuth();
//     const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true); // Start true for initial auth check/load
//     const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);

//     // --- Data Fetching Logic ---
//     const fetchInbox = useCallback(async (page: number) => {
//         if (!user) {
//             setError("Authentication required.");
//             setLoading(false);
//             setInboxData(null);
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//             setInboxData(data);
//             if (data.currentPage !== page) {
//                  setTimeout(() => setCurrentPage(data.currentPage), 0);
//             }
//         } catch (err: any) {
//             console.error("Failed to fetch inbox:", err);
//             const errorMessage = err.response?.data?.message || err.message || "Could not load messages.";
//             setError(errorMessage);
//             setInboxData(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [user]);

//     // Effect to fetch data based on auth state and page changes
//     useEffect(() => {
//         if (!authLoading && user) {
//             fetchInbox(currentPage);
//         } else if (!authLoading && !user) {
//             setError("Please log in to view your inbox.");
//             setLoading(false);
//             setInboxData(null);
//             setSelectedMessage(null);
//             // Optional: setCurrentPage(1);
//         } else {
//              if (!loading) setLoading(true);
//         }
//     }, [authLoading, user, currentPage, fetchInbox]);

//     // --- Action Handlers ---
//     const handleActionStart = (messageId: string) => {
//         setActionLoading(prev => ({ ...prev, [messageId]: true }));
//     };

//     const handleActionEnd = (messageId: string) => {
//         setActionLoading(prev => {
//             const newState = { ...prev };
//             delete newState[messageId];
//             return newState;
//         });
//     };

//     const handleMarkRead = useCallback(async (message: InboxMessage) => {
//         if (message.isRead || actionLoading[message._id]) return;

//         handleActionStart(message._id);
//         const originalData = structuredClone(inboxData);
//         const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;

//         // Optimistic Update: Mark as read in the main data
//         setInboxData(prev => {
//             if (!prev) return null;
//             const newMessages = prev.messages.map(msg =>
//                 msg._id === message._id ? { ...msg, isRead: true } : msg
//             );
//             // Note: We don't need to recalculate totalPages etc here, just the message status
//             return { ...prev, messages: newMessages };
//         });
//          if (selectedMessage?._id === message._id) {
//             setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
//          }

//         try {
//             await inboxService.markAsRead(message._id);
//             // No need to refetch, optimistic update handles UI change
//         } catch (err) {
//             console.error("Failed to mark as read:", err);
//             setError("Failed to update message status. Please try refreshing.");
//             // Revert optimistic update on error
//             setInboxData(originalData);
//             setSelectedMessage(originalSelectedMessage);
//         } finally {
//             handleActionEnd(message._id);
//         }
//     }, [inboxData, selectedMessage, actionLoading]);

//      const handleDelete = useCallback(async (messageId: string) => {
//          if (actionLoading[messageId]) return;

//          handleActionStart(messageId);
//          const originalData = structuredClone(inboxData);
//          const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;
//          const isDeletingSelected = selectedMessage?._id === messageId;

//          let pageToNavigateTo = currentPage;
//          let shouldRefetchCurrentPage = false; // Flag to indicate if a refetch is needed after deletion

//          // Optimistic Update: Remove message and recalculate totals/pages
//          setInboxData(prev => {
//              if (!prev) return null;
//              const messageToDelete = prev.messages.find(msg => msg._id === messageId);
//              if (!messageToDelete) return prev; // Should not happen, but safety check

//              const newMessages = prev.messages.filter(msg => msg._id !== messageId);
//              const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//              const newTotalPages = Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//              // If we deleted the last item on a page > 1, plan to navigate back
//              if (newMessages.length === 0 && prev.messages.length > 0 && currentPage > 1) {
//                  pageToNavigateTo = Math.max(1, currentPage - 1);
//              }
//               // If we deleted an item, there are still messages overall, and the current page *might*
//               // need refilling from the next page's items, flag for refetch.
//               else if (newMessages.length < MESSAGES_PER_PAGE && newTotalMessages > newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE) {
//                 shouldRefetchCurrentPage = true;
//               }

//              return {
//                  ...prev,
//                  messages: newMessages,
//                  totalMessages: newTotalMessages,
//                  totalPages: newTotalPages,
//                  // Keep currentPage state reflecting the *API's* current page until navigation/refetch
//                  currentPage: (pageToNavigateTo !== currentPage) ? pageToNavigateTo : prev.currentPage,
//              };
//          });

//          if (isDeletingSelected) {
//              setSelectedMessage(null);
//          }

//          try {
//              await inboxService.deleteMessage(messageId);
//              // Success: Apply navigation or refetch logic AFTER API call confirms delete
//              if (pageToNavigateTo !== currentPage) {
//                  // Navigate to previous page if needed
//                  setTimeout(() => setCurrentPage(pageToNavigateTo), 0); // Defer state update slightly
//              } else if (shouldRefetchCurrentPage) {
//                  // Refetch the current page to pull in the next item
//                  setTimeout(() => fetchInbox(currentPage), 0); // Defer fetch slightly
//              }
//              // If neither of the above, the optimistic update is sufficient

//          } catch (err: any) {
//              console.error("Failed to delete message:", err);
//              setError(err.response?.data?.message || err.message || "Failed to delete message. Please try refreshing.");
//              // Revert optimistic update on error
//              setInboxData(originalData);
//              if(isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//          } finally {
//              handleActionEnd(messageId);
//          }
//      }, [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]);

//     const handleSelectMessage = useCallback((message: InboxMessage) => {
//         setSelectedMessage(message);
//         // Mark as read when selected (if not already)
//         if (!message.isRead) {
//             // Use setTimeout to ensure the detail view transition starts
//             // before the potential state update from marking read.
//             setTimeout(() => handleMarkRead(message), 50);
//         }
//     }, [handleMarkRead]);

//     // Updated handlePageChange to work with the new Pagination component's 'paginate' prop
//     const handlePageChange = (newPage: number) => {
//         // Guard against unnecessary changes or changes during loading
//         if (loading || newPage === currentPage || newPage < 1 || (inboxData && newPage > inboxData.totalPages)) {
//             return;
//         }
//         setSelectedMessage(null); // Clear detail view when changing pages
//         setCurrentPage(newPage); // This will trigger the useEffect to fetch new data
//     };

//      const handleRefresh = useCallback(() => {
//          if (loading) return;
//          setSelectedMessage(null);
//          fetchInbox(currentPage); // Fetch current page again
//      }, [loading, currentPage, fetchInbox]);

//     // --- Derived State for Rendering ---
//     // Filter messages from the current page's data into unread and read lists
//     const { unreadMessages, readMessages } = useMemo(() => {
//         const allMessages = inboxData?.messages ?? [];
//         const unread = allMessages.filter(msg => !msg.isRead);
//         const read = allMessages.filter(msg => msg.isRead);
//         return { unreadMessages: unread, readMessages: read };
//     }, [inboxData?.messages]); // Recalculate only when messages change

//     const totalMessages = inboxData?.totalMessages ?? 0;
//     const totalPages = inboxData?.totalPages ?? 1;
//     // Use the state currentPage for pagination controls, as API might return a different page number if requested page was invalid
//     const displayPage = currentPage;
//     const hasAnyMessagesOnPage = unreadMessages.length > 0 || readMessages.length > 0;

//     // --- Render Logic ---

//     // Initial Loading State (Auth check or first fetch)
//     if (authLoading || (loading && !inboxData && !error && totalMessages === 0)) { // Check totalMessages too
//         return <InboxSkeleton />;
//     }

//     return (
//         <section className="Your-Inbox py-8 md:py-12">
//             <div className="max-w-4xl mx-auto px-4">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6 md:mb-8">
//                     <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white flex items-center gap-2">
//                         <Inbox className="size-7 text-primary" /> Your Inbox
//                     </h1>
//                      {/* Refresh Button - Show unless viewing details */}
//                     { !selectedMessage && (
//                          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//                              <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
//                              {loading ? 'Refreshing...' : 'Refresh'}
//                          </Button>
//                      )}
//                 </div>

//                 {/* Error Display Area */}
//                 {error && ( // Show error regardless of loading state if an error exists
//                     <div className="mb-6">
//                         <InboxErrorState error={error} onRetry={handleRefresh} />
//                     </div>
//                 )}

//                 {/* Content Area: List (Unread + Read) or Detail */}
//                 <div className="relative min-h-[300px]">
//                      {/* Subtle loading overlay ONLY when actively loading AND data might exist (i.e., refresh/page change) */}
//                      {loading && !error && (totalMessages > 0 || hasAnyMessagesOnPage) && (
//                         <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
//                              <RefreshCw className="size-6 animate-spin text-primary" />
//                         </div>
//                     )}

//                     {!selectedMessage ? (
//                         // ----- List View -----
//                         <>
//                              {/* Show Empty State if NOT loading, NO error, and NO messages AT ALL */}
//                              {!loading && !error && totalMessages === 0 ? (
//                                 <InboxEmptyState />
//                              ) : null}

//                              {/* Only render message sections if NOT loading and NO error */}
//                              {!loading && !error && totalMessages > 0 && (
//                                 <div className="space-y-6">

//                                     {/* --- Unread Section --- */}
//                                     {unreadMessages.length > 0 && (
//                                         <div className="space-y-3">
//                                             <div className="flex items-center gap-2 text-sm font-medium text-primary">
//                                                 <MailWarning className="size-4" />
//                                                 <span>New Message</span>
//                                             </div>
//                                             {unreadMessages.map((message) => (
//                                                 <InboxMessageListItem
//                                                     key={message._id}
//                                                     message={message}
//                                                     onSelect={handleSelectMessage}
//                                                     onDelete={handleDelete}
//                                                     isDeleting={!!actionLoading[message._id]}
//                                                 />
//                                             ))}
//                                         </div>
//                                     )}

//                                     {/* Divider if both sections have messages */}
//                                     {unreadMessages.length > 0 && readMessages.length > 0 && (
//                                         <Separator />
//                                     )}

//                                     {/* --- Read Messages Section (for current page) --- */}
//                                     {readMessages.length > 0 && (
//                                         <div className="space-y-3">
//                                             {/* Optional: Add a heading for read messages if needed */}
//                                              {unreadMessages.length > 0 && ( // Only show heading if unread also exists
//                                                  <p className="text-sm font-medium text-muted-foreground">
//                                                     Older Messages
//                                                  </p>
//                                              )}

//                                             {readMessages.map((message) => (
//                                                 <InboxMessageListItem
//                                                     key={message._id}
//                                                     message={message}
//                                                     onSelect={handleSelectMessage}
//                                                     onDelete={handleDelete}
//                                                     isDeleting={!!actionLoading[message._id]}
//                                                 />
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                              )}

//                             {/* Pagination - Show if multiple pages exist and no error */}
//                             {!error && totalPages > 1 && (
//                                  <Pagination
//                                      currentPage={displayPage} // Use the state page
//                                      totalPages={totalPages}
//                                      paginate={handlePageChange} // Pass the handler directly
//                                      goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                                      goToNextPage={() => handlePageChange(displayPage + 1)}
//                                  />
//                              )}
//                         </>
//                     ) : (
//                         // ----- Detail View -----
//                         <InboxMessageDetailView
//                             message={selectedMessage}
//                             onBack={() => setSelectedMessage(null)}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[selectedMessage._id]}
//                         />
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default InboxPage;

// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   MailX,
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem"; // Updated component
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   // --- Hooks & State ---
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Start true for initial auth check/load
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );

//   // --- Data Fetching Logic ---
//   const fetchInbox = useCallback(
//     async (page: number) => {
//       if (!user) {
//         setLoading(false);
//         setInboxData(null);
//         setSelectedMessage(null); // Clear selection if user logs out
//         return;
//       }

//       setLoading(true);
//       setError(null); // Clear previous errors on new fetch

//       try {
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         setInboxData(data);
//         // Sync local page state if API corrected the page number
//         if (data.currentPage !== page) {
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null); // Clear data on error
//         setSelectedMessage(null); // Clear selection on error
//       } finally {
//         setLoading(false);
//       }
//     },
//     [user]
//   );

//   // Effect to fetch data based on auth state and page changes
//   useEffect(() => {
//     if (!authLoading) {
//       if (user) {
//         fetchInbox(currentPage);
//       } else {
//         setError("Please log in to view your inbox.");
//         setLoading(false);
//         setInboxData(null);
//         setSelectedMessage(null);
//       }
//     } else {
//       if (!loading) setLoading(true);
//     }
//   }, [authLoading, user, currentPage, fetchInbox, loading]);

//   // --- Action Handlers ---
//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   // Mark as Read with optimistic update
//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//         // Success: Optimistic update is already applied.
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   // Delete Message with optimistic update
//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev; // Message not found

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1; // Ensure at least 1 page

//         // Determine if page change or refetch is needed
//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1
//         ) {
//           // Deleted the last item on a page > 1, go to previous page
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           // Deleted an item, current page is not full, and there are more messages on subsequent pages -> refetch to pull one up
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       // Clear selection immediately if the selected message is deleted
//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       // Perform API call
//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           setTimeout(() => fetchInbox(currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]
//   );

//   // Select Message and mark as read
//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       // Automatically mark as read when selected, if it's currently unread
//       if (!message.isRead) {
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   // Page Change Handler
//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return; // Avoid unnecessary changes
//     }
//     setSelectedMessage(null); // Clear detail view when changing pages
//     setCurrentPage(newPage); // Triggers useEffect to fetch new data
//   };

//   // Refresh Handler
//   const handleRefresh = useCallback(() => {
//     if (loading) return; // Don't refresh if already loading
//     setSelectedMessage(null); // Go back to list view on refresh
//     fetchInbox(currentPage); // Fetch current page again
//   }, [loading, currentPage, fetchInbox]);

//   // --- Derived State for Rendering ---
//   const { unreadMessages, readMessages } = useMemo(() => {
//     const allMessages = inboxData?.messages ?? [];
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = currentPage;
//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   // --- Render Logic ---

//   // 1. Initial Loading State
//   if (authLoading || (loading && !inboxData && !error && !hasMessagesInTotal)) {
//     return <InboxSkeleton />;
//   }

//   // 2. Not Logged In State
//   if (!authLoading && !user) {
//     return (
//       <section className="Your-Inbox py-8 md:py-12">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // 3. Logged In - Main Content Rendering
//   return (
//     <section className="Your-Inbox py-8 md:py-12">
//       <div className="max-w-5xl mx-auto px-4">
//         {/* Header with improved styling */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg dark:bg-primary/20">
//               <Inbox className="size-7 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>

//               {hasMessagesInTotal && (
//                 <p className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <>
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       {readMessages.length > 0 &&
//                         ` · ${readMessages.length} read`}
//                     </>
//                   ) : (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     }`
//                   )}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Refresh Button - Improved styling */}
//           {!selectedMessage && !loading && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               disabled={actionLoading.refresh}
//               className="flex items-center gap-2 h-9"
//             >
//               <RefreshCw
//                 className={cn(
//                   "h-4 w-4",
//                   actionLoading.refresh && "animate-spin"
//                 )}
//               />
//               <span>Refresh</span>
//             </Button>
//           )}

//           {/* Show spinner if loading during refresh/page change */}
//           {!selectedMessage && loading && hasMessagesInTotal && (
//             <div className="flex items-center gap-2 text-primary">
//               <Loader2 className="h-5 w-5 animate-spin" />
//               <span className="text-sm">Loading...</span>
//             </div>
//           )}
//         </div>

//         {/* Error Display Area */}
//         {error && !loading && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         {/* Content Area: List or Detail */}
//         <div className="relative min-h-[300px]">
//           {/* Loading overlay */}
//           {loading && !error && !selectedMessage && hasMessagesInTotal && (
//             <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
//               <div className="flex flex-col items-center gap-2">
//                 <Loader2 className="size-8 animate-spin text-primary" />
//                 <span className="text-sm font-medium text-primary">
//                   Loading messages...
//                 </span>
//               </div>
//             </div>
//           )}

//           {!selectedMessage ? (
//             // ----- List View -----
//             <>
//               {/* Empty State */}
//               {!loading && !error && !hasMessagesInTotal ? (
//                 <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
//                   <MailX className="size-16 mx-auto text-muted-foreground mb-4" />
//                   <h2 className="text-xl font-semibold text-foreground mb-2">
//                     Your inbox is empty
//                   </h2>
//                   <p className="text-muted-foreground max-w-md mx-auto">
//                     You don't have any messages yet. When you receive
//                     notifications or important updates, they will appear here.
//                   </p>
//                 </div>
//               ) : null}

//               {/* Message Sections */}
//               {!loading && !error && hasMessagesInTotal && (
//                 <div className="space-y-8">
//                   {/* --- New Messages Section with enhanced styling --- */}
//                   {unreadMessages.length > 0 && (
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-2 mb-4">
//                         <div className="bg-primary/10 p-1.5 rounded-md dark:bg-primary/20">
//                           <Bell className="size-5 text-primary" />
//                         </div>
//                         <h2 className="text-lg font-semibold text-primary">
//                           New Messages
//                           <span className="ml-2 text-sm bg-primary/15 text-primary px-2 py-0.5 rounded-full">
//                             {unreadMessages.length}
//                           </span>
//                         </h2>
//                       </div>

//                       <div className="space-y-4">
//                         {unreadMessages.map((message) => (
//                           <InboxMessageListItem
//                             key={message._id}
//                             message={message}
//                             onSelect={handleSelectMessage}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[message._id]}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Divider with improved styling */}
//                   {unreadMessages.length > 0 && readMessages.length > 0 && (
//                     <Separator className="my-8 bg-border/50" />
//                   )}

//                   {/* --- Read Messages Section with enhanced styling --- */}
//                   {readMessages.length > 0 && (
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-2 mb-4">
//                         <div className="bg-muted p-1.5 rounded-md">
//                           <CheckCircle2 className="size-5 text-muted-foreground" />
//                         </div>
//                         <h2 className="text-lg font-medium text-muted-foreground">
//                           Previous Messages
//                           <span className="ml-2 text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
//                             {readMessages.length}
//                           </span>
//                         </h2>
//                       </div>

//                       <div className="space-y-4">
//                         {readMessages.map((message) => (
//                           <InboxMessageListItem
//                             key={message._id}
//                             message={message}
//                             onSelect={handleSelectMessage}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[message._id]}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Empty Page Message */}
//                   {!loading &&
//                     !error &&
//                     !hasAnyMessagesOnPage &&
//                     hasMessagesInTotal && (
//                       <div className="text-center py-12 bg-muted/30 rounded-lg border border-border/50">
//                         <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                         <p className="text-lg font-medium text-foreground mb-1">
//                           No messages on this page
//                         </p>
//                         <p className="text-muted-foreground">
//                           Try navigating to a different page or refreshing your
//                           inbox.
//                         </p>
//                       </div>
//                     )}
//                 </div>
//               )}

//               {/* Pagination with improved styling */}
//               {!loading && !error && totalPages > 1 && (
//                 <div className="mt-8">
//                   <Pagination
//                     currentPage={displayPage}
//                     totalPages={totalPages}
//                     paginate={handlePageChange}
//                     goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                     goToNextPage={() => handlePageChange(displayPage + 1)}
//                   />
//                 </div>
//               )}
//             </>
//           ) : (
//             // ----- Detail View -----
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react"; // Added useRef
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   MailX,
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem"; // Updated component
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct
// import { GoDotFill } from "react-icons/go";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   // --- Hooks & State ---
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   // Start loading true for initial auth check AND first data fetch
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   // Ref to track if it's the very first load attempt after mount/auth
//   const isInitialLoad = useRef(true);

//   // --- Data Fetching Logic ---
//   const fetchInbox = useCallback(
//     async (page: number) => {
//       // No need to check 'user' here again, useEffect handles that.
//       // Ensure loading is true *during* the fetch operation.
//       setLoading(true);
//       setError(null); // Clear previous errors on new fetch

//       try {
//         console.log(`Fetching inbox page ${page}...`);
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         console.log("Inbox data received:", data);
//         setInboxData(data);
//         // Sync local page state if API corrected the page number
//         if (data.currentPage !== page) {
//           // Use setTimeout to avoid state update conflicts during render
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//         // Mark initial load as complete after the first successful fetch
//         isInitialLoad.current = false;
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null); // Clear data on error
//         setSelectedMessage(null); // Clear selection on error
//         // Also mark initial load as complete even on error, so skeleton hides
//         isInitialLoad.current = false;
//       } finally {
//         // Ensure loading is set to false *after* all state updates in try/catch
//         setLoading(false);
//         console.log("Fetch inbox finished, loading set to false.");
//       }
//     },
//     [] // No user dependency needed here, handled by useEffect caller
//   );

//   // Effect to fetch data based on auth state and page changes
//   useEffect(() => {
//     console.log("InboxPage Effect triggered:", {
//       authLoading,
//       user,
//       currentPage,
//     });

//     // If auth is still loading, do nothing yet. The initial 'loading' state is true.
//     if (authLoading) {
//       console.log("Auth is loading, waiting...");
//       // Keep loading true if it isn't already (e.g., if component re-mounted)
//       if (!loading) setLoading(true);
//       return;
//     }

//     // Auth is finished.
//     if (user) {
//       console.log("User found, fetching inbox for page:", currentPage);
//       // User exists, fetch their data for the current page.
//       // fetchInbox handles setting loading true/false internally for the API call duration.
//       fetchInbox(currentPage);
//     } else {
//       // No user.
//       console.log("No user found, setting error and stopping loading.");
//       setError("Please log in to view your inbox.");
//       setLoading(false); // Stop loading state
//       setInboxData(null); // Clear any potential old data
//       setSelectedMessage(null); // Clear selection
//       isInitialLoad.current = false; // Mark initial load attempt as done
//     }

//     // --- Dependencies ---
//     // Re-run when auth loading state changes.
//     // Re-run when user logs in or out.
//     // Re-run when the currentPage changes.
//     // fetchInbox is memoized by useCallback and doesn't need to be here if its own dependencies are stable (which they are now).
//   }, [authLoading, user, currentPage, fetchInbox]); // Removed 'loading' from dependencies

//   // --- Action Handlers (No changes needed in these handlers) ---
//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   // Mark as Read with optimistic update
//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//         // Success: Optimistic update is already applied.
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   // Delete Message with optimistic update
//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev; // Message not found

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1; // Ensure at least 1 page

//         // Determine if page change or refetch is needed
//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1
//         ) {
//           // Deleted the last item on a page > 1, go to previous page
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           // Deleted an item, current page is not full, and there are more messages on subsequent pages -> refetch to pull one up
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       // Clear selection immediately if the selected message is deleted
//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       // Perform API call
//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           // Use fetchInbox directly instead of relying only on useEffect trigger
//           setTimeout(() => fetchInbox(currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox] // Added fetchInbox dependency
//   );

//   // Select Message and mark as read
//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       // Automatically mark as read when selected, if it's currently unread
//       if (!message.isRead) {
//         // Delay slightly to allow UI to update first if needed
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   // Page Change Handler
//   const handlePageChange = (newPage: number) => {
//     if (
//       loading || // Prevent change if already loading new data
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return; // Avoid unnecessary changes
//     }
//     setSelectedMessage(null); // Clear detail view when changing pages
//     setCurrentPage(newPage); // Triggers useEffect to fetch new data
//   };

//   // Refresh Handler
//   const handleRefresh = useCallback(() => {
//     if (loading) return; // Don't refresh if already loading
//     console.log("Refresh triggered");
//     setSelectedMessage(null); // Go back to list view on refresh
//     isInitialLoad.current = false; // Ensure skeleton doesn't show on manual refresh
//     fetchInbox(currentPage); // Fetch current page again
//   }, [loading, currentPage, fetchInbox]);

//   // --- Derived State for Rendering ---
//   const { unreadMessages, readMessages } = useMemo(() => {
//     const allMessages = inboxData?.messages ?? [];
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage; // Use API's current page if available
//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   // --- Render Logic ---

//   // 1. Initial Loading State (Skeleton)
//   // Show skeleton if auth is loading OR if it's the initial component load cycle AND
//   // the main loading state is true (meaning fetch hasn't completed/failed yet)
//   // AND we haven't determined there's an error yet.
//   // Using !inboxData helps ensure skeleton shows until first data/error arrives.
//   // console.log("Render check:", { authLoading, loading, isInitialLoad: isInitialLoad.current, inboxData: !!inboxData, error: !!error });
//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     console.log("Rendering InboxSkeleton");
//     return <InboxSkeleton />;
//   }

//   // 2. Not Logged In State (After auth check is complete)
//   if (!authLoading && !user) {
//     console.log("Rendering Access Denied / Not Logged In");
//     return (
//       <section className="Your-Inbox py-8 md:py-12">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // 3. Logged In - Main Content Rendering
//   console.log("Rendering Main Inbox Content Area");
//   return (
//     <section className="Your-Inbox py-5 md:py-10">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>

//               {/* Show message count only after initial load and if there's data */}
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <p className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <div className="flex items-center gap-1">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       <GoDotFill size={12} />
//                       {readMessages.length > 0 &&
//                         `  ${readMessages.length} read`}
//                     </div>
//                   ) : (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     }`
//                   )}
//                 </p>
//               )}

//               {/* Show subtle loading indicator in header during non-initial loads */}
//               {loading && !isInitialLoad.current && (
//                 <p className="text-sm text-primary flex items-center gap-1">
//                   <Loader2 className="h-3 w-3 animate-spin" />
//                   <span>Updating...</span>
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Refresh Button - Show only when NOT loading and in list view */}
//           {!selectedMessage && !loading && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               // Disable based on generic loading state, not specific action state
//               disabled={loading}
//               className="flex items-center gap-2 h-9"
//             >
//               <RefreshCw
//                 className={cn(
//                   "h-4 w-4",
//                   loading && "animate-spin" // Spin if loading state is true
//                 )}
//               />
//               <span>Refresh</span>
//             </Button>
//           )}

//           {/* Loading Spinner for Refresh/Page Change (Top Right)
//               Show only when loading AFTER the initial load, and in list view */}
//           {!selectedMessage && loading && !isInitialLoad.current && (
//             <div className="flex items-center gap-2 text-primary h-9 px-3">
//               {" "}
//               <Loader2 className="h-5 w-5 animate-spin" />
//               <span className="text-sm">Loading...</span>
//             </div>
//           )}

//         </div>

//         {/* Error Display Area - Show if error exists and we are NOT in the initial loading phase */}
//         {error && !loading && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         {/* Content Area: List or Detail */}
//         {/* Add min-h-[300px] here if needed, or rely on content below */}
//         <div className="relative">
//           {/* Loading overlay - Show only during loading AFTER initial load, over the list view area */}
//           {loading &&
//             !isInitialLoad.current &&
//             !error &&
//             !selectedMessage &&
//             hasMessagesInTotal && (
//               <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 min-h-[200px]">
//                 <div className="flex flex-col items-center gap-2">
//                   <Loader2 className="size-8 animate-spin text-primary" />
//                   <span className="text-sm font-medium text-primary">
//                     Loading messages...
//                   </span>
//                 </div>
//               </div>
//             )}

//           {/* Detail View takes priority */}
//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             // ----- List View -----
//             // Render list structure only when NOT loading OR when loading but it's NOT the initial load
//             // (so the overlay can show above the potentially stale list)
//             (!loading || !isInitialLoad.current) &&
//             !error && (
//               <>
//                 {/* Empty State - Show only if not loading, no error, and no messages AT ALL */}
//                 {!loading && !error && !hasMessagesInTotal ? (
//                   <div className="bg-primarybox rounded-xl lg:p-6 p-4 text-center space-y-4 min-h-[350px] flex flex-col justify-center items-center">
//                     <MailX className="lg:size-16 size-14 mx-auto text-primary" />
//                     <h2 className="lg:text-2xl text-xl font-medium text-neutral-900 dark:text-white">
//                       Your inbox is empty
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
//                       You don't have any messages yet. When you receive
//                       notifications or important updates, they will appear here.
//                     </p>
//                   </div>
//                 ) : null}

//                 {/* Message Sections - Show if not loading OR loading non-initially, no error, and has messages */}
//                 {hasMessagesInTotal && (
//                   <div className="space-y-4">
//                     {/* --- New Messages Section --- */}
//                     {unreadMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="bg-primarybox p-2 rounded-md">
//                             <Bell className="text-white" size={28} />
//                           </div>

//                           <h2 className="text-xl font-medium text-white">
//                             New Messages
//                             <div className="ml-2 text-sm bg-primarybox text-white size-5 rounded-full inline-block">
//                               <span className="flex items-center justify-center">
//                                 {unreadMessages.length}
//                               </span>
//                             </div>
//                           </h2>
//                         </div>

//                         <div className="space-y-4">
//                           {unreadMessages.map((message) => (
//                             <InboxMessageListItem
//                               key={message._id}
//                               message={message}
//                               onSelect={handleSelectMessage}
//                               onDelete={handleDelete}
//                               isDeleting={!!actionLoading[message._id]}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Divider */}
//                     {unreadMessages.length > 0 && readMessages.length > 0 && (
//                       <Separator className="sm:my-8 my-5 bg-border/50" />
//                     )}

//                     {/* --- Read Messages Section --- */}
//                     {readMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="bg-primarybox p-2 rounded-md">
//                             <CheckCircle2 className="text-white" size={28} />
//                           </div>
//                           <h2 className="text-xl font-medium text-white">
//                             Previous Messages
//                             <div className="ml-2 text-sm bg-primarybox text-white size-5 rounded-full inline-block">
//                               <span className="flex items-center justify-center">
//                                 {readMessages.length}
//                               </span>
//                             </div>
//                           </h2>
//                         </div>
//                         <div className="space-y-4">
//                           {readMessages.map((message) => (
//                             <InboxMessageListItem
//                               key={message._id}
//                               message={message}
//                               onSelect={handleSelectMessage}
//                               onDelete={handleDelete}
//                               isDeleting={!!actionLoading[message._id]}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Empty Page Message - Show if NOT loading, has messages total, but none on THIS page */}
//                     {!loading &&
//                       !error &&
//                       !hasAnyMessagesOnPage &&
//                       hasMessagesInTotal && (
//                         <div className="text-center py-12 bg-muted/30 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                           <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                           <p className="text-lg font-medium text-foreground mb-1">
//                             No messages on this page
//                           </p>
//                           <p className="text-muted-foreground">
//                             Try navigating to a different page or refreshing
//                             your inbox.
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {/* Pagination - Show if NOT loading, no error, and more than one page */}
//                 {!loading && !error && totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                       goToNextPage={() => handlePageChange(displayPage + 1)}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   AlertCircle,
//   Loader2,
//   MailX,
// } from "lucide-react";

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem";
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct
// import { GoDotFill } from "react-icons/go";
// import { FaComments } from "react-icons/fa";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   const isInitialLoad = useRef(true);

//   const fetchInbox = useCallback(async (page: number) => {
//     setLoading(true);
//     setError(null);

//     try {
//       console.log(
//         `Fetching inbox page ${page}... (isInitialLoad.current: ${isInitialLoad.current})`
//       );
//       const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//       console.log("Inbox data received:", data);
//       setInboxData(data);
//       if (data.currentPage !== page) {
//         setTimeout(() => setCurrentPage(data.currentPage), 0);
//       }
//       isInitialLoad.current = false;
//     } catch (err: any) {
//       console.error("Failed to fetch inbox:", err);
//       const errorMessage =
//         err.response?.data?.message ||
//         err.message ||
//         "Could not load messages.";
//       setError(errorMessage);
//       setInboxData(null);
//       setSelectedMessage(null);
//       isInitialLoad.current = false;
//     } finally {
//       setLoading(false);
//       console.log(
//         "Fetch inbox finished, loading set to false, isInitialLoad.current set to false."
//       );
//     }
//   }, []);

//   useEffect(() => {
//     console.log("InboxPage Effect triggered:", {
//       authLoading,
//       user,
//       currentPage,
//     });

//     if (authLoading) {
//       console.log("Auth is loading, waiting...");
//       if (!loading) setLoading(true);
//       return;
//     }

//     if (user) {
//       console.log("User found, fetching inbox for page:", currentPage);
//       fetchInbox(currentPage);
//     } else {
//       console.log("No user found, setting error and stopping loading.");
//       setError("Please log in to view your inbox.");
//       setLoading(false);
//       setInboxData(null);
//       setSelectedMessage(null);
//       isInitialLoad.current = false;
//     }
//   }, [authLoading, user, currentPage, fetchInbox]);

//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev;

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1
//         ) {
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           isInitialLoad.current = false;
//           setTimeout(() => fetchInbox(currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]
//   );

//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       if (!message.isRead) {
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return;
//     }
//     setSelectedMessage(null);
//     isInitialLoad.current = false;
//     setCurrentPage(newPage);
//   };

//   const handleRefresh = useCallback(() => {
//     if (loading) return;
//     console.log(
//       "Refresh triggered, setting isInitialLoad.current to true for skeleton display."
//     );
//     setSelectedMessage(null);
//     isInitialLoad.current = true;
//     fetchInbox(currentPage);
//   }, [loading, currentPage, fetchInbox]);

//   const { unreadMessages, readMessages } = useMemo(() => {
//     const allMessages = inboxData?.messages ?? [];
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage;
//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     console.log(
//       "Rendering InboxSkeleton due to authLoading or initial/refresh load."
//     );
//     return <InboxSkeleton />;
//   }

//   if (!authLoading && !user) {
//     console.log("Rendering Access Denied / Not Logged In");
//     return (
//       <section className="Your-Inbox py-5 md:py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   console.log(
//     "Rendering Main Inbox Content Area. Loading:",
//     loading,
//     "isInitialLoad.current:",
//     isInitialLoad.current
//   );
//   return (
//     <section className="Your-Inbox py-5 md:py-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex items-center justify-between mb-8 gap-4">
//           <div className="flex items-center gap-3 ">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>

//               {/* Show message count only after initial load and if there's data */}
//               {/* --- FIX: Changed <p> to <div> --- */}
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <div className="text-sm">
//                   {" "}
//                   {/* Was <p> */}
//                   {unreadMessages.length > 0 ? (
//                     <div className="flex items-center gap-1">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       <GoDotFill size={12} />
//                       {readMessages.length > 0 &&
//                         `  ${readMessages.length} read`}
//                     </div>
//                   ) : (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     }`
//                   )}
//                 </div>
//               )}

//               {loading && !isInitialLoad.current && (
//                 <p className="text-sm text-primary flex items-center gap-1">
//                   <Loader2 className="h-3 w-3 animate-spin" />
//                   <span>Updating...</span>
//                 </p>
//               )}
//             </div>
//           </div>

//           {!selectedMessage && !loading && (
//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <RefreshCw className="size-5" />
//               <span>Refresh</span>
//             </button>
//           )}

//           {!selectedMessage && loading && !isInitialLoad.current && (
//             <div className="flex items-center gap-2 text-primary h-9 px-3">
//               <Loader2 className="h-5 w-5 animate-spin" />
//               <span className="text-sm">Loading...</span>
//             </div>
//           )}
//         </div>

//         {error && !(loading && isInitialLoad.current) && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         <div className="relative">
//           {loading &&
//             !isInitialLoad.current &&
//             !error &&
//             !selectedMessage &&
//             hasMessagesInTotal && (
//               <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 min-h-[200px]">
//                 <div className="flex flex-col items-center gap-2">
//                   <Loader2 className="size-8 animate-spin text-primary" />
//                   <span className="text-sm font-medium text-primary">
//                     Loading messages...
//                   </span>
//                 </div>
//               </div>
//             )}

//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             !error && (
//               <>
//                 {!loading && !error && !hasMessagesInTotal ? (
//                   <div className="bg-primarybox rounded-xl lg:p-6 p-4 text-center space-y-4 min-h-[350px] flex flex-col justify-center items-center">
//                     <MailX className="lg:size-16 size-14 mx-auto text-primary" />
//                     <h2 className="lg:text-2xl text-xl font-medium text-neutral-900 dark:text-white">
//                       Your inbox is empty
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
//                       You don't have any messages yet. When you receive
//                       notifications or important updates, they will appear here.
//                     </p>
//                   </div>
//                 ) : null}

//                 {hasMessagesInTotal && (
//                   <div className="space-y-4">
//                     {unreadMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                             <Bell className="dark:text-white text-neutral-900" size={28} />
//                           </div>
//                           <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                             New Messages
//                             <div className="ml-2 text-sm dark:bg-primarybox bg-lightgray dark:text-white text-neutral-900 size-5 rounded-full inline-block">
//                               <span className="flex items-center justify-center">
//                                 {unreadMessages.length}
//                               </span>
//                             </div>
//                           </h2>
//                         </div>
//                         <div className="space-y-4">
//                           {unreadMessages.map((message) => (
//                             <InboxMessageListItem
//                               key={message._id}
//                               message={message}
//                               onSelect={handleSelectMessage}
//                               onDelete={handleDelete}
//                               isDeleting={!!actionLoading[message._id]}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {unreadMessages.length > 0 && readMessages.length > 0 && (
//                       <Separator className="sm:my-8 my-5 bg-border/50" />
//                     )}

//                     {readMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                             <FaComments className="dark:text-white text-neutral-900" size={28} />
//                           </div>
//                           <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                             Previous Messages
//                             <div className="ml-2 text-sm dark:bg-primarybox bg-lightgray dark:text-white text-neutral-900 size-5 rounded-full inline-block">
//                               <span className="flex items-center justify-center">
//                                 {readMessages.length}
//                               </span>
//                             </div>
//                           </h2>
//                         </div>
//                         <div className="space-y-4">
//                           {readMessages.map((message) => (
//                             <InboxMessageListItem
//                               key={message._id}
//                               message={message}
//                               onSelect={handleSelectMessage}
//                               onDelete={handleDelete}
//                               isDeleting={!!actionLoading[message._id]}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {!loading &&
//                       !error &&
//                       !hasAnyMessagesOnPage &&
//                       hasMessagesInTotal && (
//                         <div className="text-center py-12 bg-muted/30 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                           <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                           <p className="text-lg font-medium text-foreground mb-1">
//                             No messages on this page
//                           </p>
//                           <p className="text-muted-foreground">
//                             Try navigating to a different page or refreshing
//                             your inbox.
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {!error && totalPages > 1 && !loading && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                       goToNextPage={() => handlePageChange(displayPage + 1)}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   AlertCircle,
//   Loader2,
//   MailX,
// } from "lucide-react";
// import { motion } from "framer-motion"; // Added for animations

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem";
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct
// import { GoDotFill } from "react-icons/go";
// import { FaComments } from "react-icons/fa";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   const isInitialLoad = useRef(true);

//   const fetchInbox = useCallback(async (page: number) => {
//     setLoading(true);
//     setError(null); // Clear previous errors on new fetch attempt

//     try {
//       console.log(
//         `Fetching inbox page ${page}... (isInitialLoad.current: ${isInitialLoad.current})`
//       );
//       const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//       console.log("Inbox data received:", data);
//       setInboxData(data);
//       if (data.currentPage !== page) {
//         // Ensure currentPage state syncs with response if backend adjusts it
//         setTimeout(() => setCurrentPage(data.currentPage), 0);
//       }
//       // isInitialLoad.current is set to false in finally, after the first successful or failed fetch
//     } catch (err: any) {
//       console.error("Failed to fetch inbox:", err);
//       const errorMessage =
//         err.response?.data?.message ||
//         err.message ||
//         "Could not load messages.";
//       setError(errorMessage);
//       setInboxData(null); // Clear data on error
//       setSelectedMessage(null); // Clear selection on error
//       // isInitialLoad.current is set to false in finally
//     } finally {
//       setLoading(false);
//       // Only set isInitialLoad to false after the first fetch attempt (success or fail)
//       // This ensures skeleton shows on first load, but not on subsequent refreshes/paginations
//       if (isInitialLoad.current) {
//          isInitialLoad.current = false;
//       }
//       console.log(
//         "Fetch inbox finished, loading set to false, isInitialLoad.current is now:", isInitialLoad.current
//       );
//     }
//   }, []); // Removed MESSAGES_PER_PAGE as it's a constant

//   useEffect(() => {
//     console.log("InboxPage Effect triggered:", {
//       authLoading,
//       user,
//       currentPage,
//     });

//     if (authLoading) {
//       console.log("Auth is loading, waiting...");
//       if (!loading && isInitialLoad.current) setLoading(true); // Ensure loading state for skeleton if auth is slow
//       return;
//     }

//     if (user) {
//       console.log("User found, fetching inbox for page:", currentPage);
//       fetchInbox(currentPage);
//     } else {
//       console.log("No user found, setting error and stopping loading.");
//       setError("Please log in to view your inbox.");
//       setLoading(false);
//       setInboxData(null);
//       setSelectedMessage(null);
//       if (isInitialLoad.current) { // Ensure isInitialLoad is flipped if we bail early
//          isInitialLoad.current = false;
//       }
//     }
//   }, [authLoading, user, currentPage, fetchInbox]); // Removed `loading` as it could cause loops

//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//           // Optionally update unread count if you track it separately in inboxData
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         setInboxData(originalData); // Revert optimistic update
//         setSelectedMessage(originalSelectedMessage); // Revert optimistic update
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading] // No need for structuredClone here, React handles state update fine
//   );

//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev;

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 && // Was last item on page
//           currentPage > 1 &&
//           currentPage === prev.totalPages // And it was the last page
//         ) {
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if ( // If items were removed but page can still be filled by refetching
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages > newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage, // Optimistically update current page if navigating
//         };
//       });

//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       try {
//         await inboxService.deleteMessage(messageId);
//         // Post-delete logic:
//         // If we determined we need to navigate to a previous page
//         if (pageToNavigateTo !== currentPage) {
//           // isInitialLoad.current should be false for page changes
//           // This will trigger useEffect to call fetchInbox for the new page
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         }
//         // If we need to refetch the current page (e.g., to fill it up)
//         else if (shouldRefetchCurrentPage) {
//           // isInitialLoad.current is already false, fetchInbox will show overlay loader
//           setTimeout(() => fetchInbox(currentPage), 0);
//         }
//         // If no messages left at all, and we were on page 1
//         else if (inboxData && inboxData.totalMessages -1 === 0 && currentPage === 1) {
//             // inboxData state would have been updated, triggering re-render
//             // No specific fetch needed, UI will show empty state
//         }

//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         setInboxData(originalData); // Revert
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage); // Revert
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox] // MESSAGES_PER_PAGE is constant
//   );

//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       if (!message.isRead) {
//         // Delay slightly to allow UI to update before marking as read
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return;
//     }
//     setSelectedMessage(null);
//     // isInitialLoad.current is already false, so page changes won't show skeleton
//     setCurrentPage(newPage); // This will trigger useEffect -> fetchInbox
//   };

//   const handleRefresh = useCallback(() => {
//     if (loading) return;
//     console.log(
//       "Refresh triggered. isInitialLoad.current should be false."
//     );
//     setSelectedMessage(null);
//     // DO NOT set isInitialLoad.current = true here.
//     // fetchInbox will be called, and since isInitialLoad.current is (expected to be) false,
//     // the skeleton won't show, but the inline loader will.
//     fetchInbox(currentPage);
//   }, [loading, currentPage, fetchInbox]);

//   const { unreadMessages, readMessages } = useMemo(() => {
//     if (!inboxData?.messages) return { unreadMessages: [], readMessages: [] }; // Guard added
//     const allMessages = inboxData.messages;
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage; // Use inboxData.currentPage if available

//   const hasAnyMessagesOnPage = unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   // Condition for Skeleton:
//   // Show skeleton if auth is loading OR (data is loading AND it's the initial load AND no error has occurred yet)
//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     console.log(
//       "Rendering InboxSkeleton due to authLoading or initial data load."
//     );
//     return <InboxSkeleton />;
//   }

//   if (!authLoading && !user) {
//     console.log("Rendering Access Denied / Not Logged In");
//     return (
//       <section className="Your-Inbox py-5 md:py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   console.log(
//     "Rendering Main Inbox Content Area. Loading:",
//     loading,
//     "isInitialLoad.current:",
//     isInitialLoad.current
//   );

//   return (
//     <section className="Your-Inbox py-5 md:py-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex items-center justify-between mb-8 gap-4">
//           <div className="flex items-center gap-3 ">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <div className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <span className="flex items-center gap-1.5">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       {readMessages.length > 0 && (
//                         <>
//                           <GoDotFill size={8} className="text-muted-foreground/50" />
//                           <span>{readMessages.length} read</span>
//                         </>
//                       )}
//                     </span>
//                   ) : (
//                      readMessages.length > 0 ? // Only show if there are read messages
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     } read`
//                     : "" // Or nothing if both are 0 (covered by empty state)
//                   )}
//                 </div>
//               )}
//               {/* This loader is for the header count area during refresh/pagination */}
//               {loading && !isInitialLoad.current && (
//                 <p className="text-sm text-primary flex items-center gap-1 h-[20px]"> {/* Fixed height to prevent layout shift */}
//                   <Loader2 className="h-3 w-3 animate-spin" />
//                   <span>Updating...</span>
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Refresh button logic */}
//           {!selectedMessage && (
//             <>
//               {loading && !isInitialLoad.current ? (
//                  <div className="flex items-center justify-center text-primary px-8 py-3 h-[50px] sm:w-auto rounded-full"> {/* Matched height */}
//                     <Loader2 className="size-5 animate-spin" />
//                  </div>
//               ) : (
//                 <button
//                   onClick={handleRefresh}
//                   disabled={loading} // Disabled if any loading is true (initial or refresh)
//                   className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-[50px] sm:w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <RefreshCw className="size-5" />
//                   <span>Refresh</span>
//                 </button>
//               )}
//             </>
//           )}
//         </div>

//         {error && !(loading && isInitialLoad.current) && ( // Show error if not initial loading (skeleton handles initial load errors implicitly by not showing)
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         <div className="relative">
//           {/* This is the overlay loader for message list during refresh/pagination */}
//           {loading &&
//             !isInitialLoad.current &&
//             !error &&
//             !selectedMessage &&
//             hasMessagesInTotal && ( // Show only if there were messages to begin with
//               <div className="absolute inset-0 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center z-20 min-h-[200px] rounded-lg">
//                 <div className="flex flex-col items-center gap-2 p-4 bg-primarybox dark:bg-secondarybox rounded-lg shadow-md">
//                   <Loader2 className="size-8 animate-spin text-primary" />
//                   <span className="text-sm font-medium text-primary">
//                     Loading messages...
//                   </span>
//                 </div>
//               </div>
//             )}

//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             // Render message lists or empty/error states only if no message is selected
//             // And no critical error that prevents list display
//             !error && (
//               <>
//                 {/* Case 1: Not loading, no error, and absolutely no messages in total (after first load attempt) */}
//                 {!loading && !hasMessagesInTotal && !isInitialLoad.current && (
//                   <div className="bg-primarybox dark:bg-secondarybox rounded-xl lg:p-6 p-4 text-center space-y-4 min-h-[350px] flex flex-col justify-center items-center">
//                     <MailX className="lg:size-16 size-14 mx-auto text-primary" />
//                     <h2 className="lg:text-2xl text-xl font-medium text-neutral-900 dark:text-white">
//                       Your inbox is empty
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
//                       You don't have any messages yet. When you receive
//                       notifications or important updates, they will appear here.
//                     </p>
//                   </div>
//                 )}

//                 {/* Case 2: Messages exist (either on page or in total) */}
//                 {hasMessagesInTotal && (
//                   <div className="space-y-4">
//                     {unreadMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                             <Bell className="dark:text-white text-neutral-900" size={28} />
//                           </div>
//                           <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                             New Messages
//                             <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {unreadMessages.length}
//                             </span>
//                           </h2>
//                         </div>
//                         <div className="space-y-3"> {/* Reduced gap for list items */}
//                           {unreadMessages.map((message, index) => (
//                             <motion.div
//                               key={message._id}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: index * 0.05, duration: 0.4 }}
//                             >
//                               <InboxMessageListItem
//                                 message={message}
//                                 onSelect={handleSelectMessage}
//                                 onDelete={handleDelete}
//                                 isDeleting={!!actionLoading[message._id]}
//                               />
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {unreadMessages.length > 0 && readMessages.length > 0 && (
//                       <Separator className="sm:my-8 my-5 bg-border/50" />
//                     )}

//                     {readMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                             <FaComments className="dark:text-white text-neutral-900" size={28} />
//                           </div>
//                           <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                             Previous Messages
//                             <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {readMessages.length}
//                             </span>
//                           </h2>
//                         </div>
//                         <div className="space-y-3"> {/* Reduced gap for list items */}
//                           {readMessages.map((message, index) => (
//                             <motion.div
//                               key={message._id}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: index * 0.05, duration: 0.4 }}
//                             >
//                               <InboxMessageListItem
//                                 message={message}
//                                 onSelect={handleSelectMessage}
//                                 onDelete={handleDelete}
//                                 isDeleting={!!actionLoading[message._id]}
//                               />
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Case 3: No messages on *this specific page*, but messages exist in total (e.g. empty page due to pagination) */}
//                     {/* Show this only if not loading and no error, and the page is genuinely empty but there are other pages */}
//                     {!loading && !error && !hasAnyMessagesOnPage && hasMessagesInTotal && (
//                         <div className="text-center py-12 bg-muted/30 dark:bg-primarybox/50 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                           <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                           <p className="text-lg font-medium text-foreground mb-1">
//                             No messages on this page
//                           </p>
//                           <p className="text-muted-foreground">
//                             Try navigating to a different page or refreshing your inbox.
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {/* Pagination: Show if no error, not initial loading, and more than one page */}
//                 {!error && !isInitialLoad.current && totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       // These might not be needed if paginate handles all arrow clicks too
//                       // goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                       // goToNextPage={() => handlePageChange(displayPage + 1)}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { motion } from "framer-motion";

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem";
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct
// import { GoDotFill } from "react-icons/go";
// import { FaComments, FaRegCommentDots } from "react-icons/fa";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   const isInitialLoad = useRef(true);
//   const [listAnimationKey, setListAnimationKey] = useState(0); // For refresh animation

//   const fetchInbox = useCallback(
//     async (page: number, isRefresh: boolean = false) => {
//       setLoading(true);
//       setError(null);

//       try {
//         console.log(
//           `Fetching inbox page ${page}... (isInitialLoad.current: ${isInitialLoad.current}, isRefresh: ${isRefresh})`
//         );
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         console.log("Inbox data received:", data);
//         setInboxData(data);
//         if (data.currentPage !== page) {
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//         if (isRefresh) {
//           // Only update animation key on explicit refresh success
//           setListAnimationKey((prev) => prev + 1);
//           console.log(
//             "Refresh successful, updated listAnimationKey to:",
//             listAnimationKey + 1
//           );
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null);
//         setSelectedMessage(null);
//       } finally {
//         setLoading(false);
//         if (isInitialLoad.current) {
//           isInitialLoad.current = false;
//         }
//         console.log(
//           "Fetch inbox finished, loading set to false, isInitialLoad.current is now:",
//           isInitialLoad.current
//         );
//       }
//     },
//     []
//   ); // listAnimationKey is not a dependency here as we use functional update

//   useEffect(() => {
//     console.log("InboxPage Effect triggered:", {
//       authLoading,
//       user,
//       currentPage,
//     });

//     if (authLoading) {
//       console.log("Auth is loading, waiting...");
//       if (!loading && isInitialLoad.current) setLoading(true);
//       return;
//     }

//     if (user) {
//       console.log("User found, fetching inbox for page:", currentPage);
//       // Pass false for isRefresh for initial load and pagination
//       fetchInbox(currentPage, false);
//     } else {
//       console.log("No user found, setting error and stopping loading.");
//       setError("Please log in to view your inbox.");
//       setLoading(false);
//       setInboxData(null);
//       setSelectedMessage(null);
//       if (isInitialLoad.current) {
//         isInitialLoad.current = false;
//       }
//     }
//   }, [authLoading, user, currentPage, fetchInbox]);

//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev;

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1 &&
//           currentPage === prev.totalPages
//         ) {
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           // Pass false for isRefresh as this is a data consistency refetch, not user-triggered refresh
//           setTimeout(() => fetchInbox(currentPage, false), 0);
//         } else if (
//           inboxData &&
//           inboxData.totalMessages - 1 === 0 &&
//           currentPage === 1
//         ) {
//           // UI will update to empty state
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]
//   );

//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       if (!message.isRead) {
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return;
//     }
//     setSelectedMessage(null);
//     setCurrentPage(newPage);
//   };

//   const handleRefresh = useCallback(() => {
//     if (loading) return;
//     console.log(
//       "Refresh triggered. isInitialLoad.current should be false. Calling fetchInbox with isRefresh=true"
//     );
//     setSelectedMessage(null);
//     // Pass true for isRefresh to trigger listAnimationKey update
//     fetchInbox(currentPage, true);
//   }, [loading, currentPage, fetchInbox]);

//   const { unreadMessages, readMessages } = useMemo(() => {
//     if (!inboxData?.messages) return { unreadMessages: [], readMessages: [] };
//     const allMessages = inboxData.messages;
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage;

//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     console.log(
//       "Rendering InboxSkeleton due to authLoading or initial data load."
//     );
//     return <InboxSkeleton />;
//   }

//   if (!authLoading && !user) {
//     console.log("Rendering Access Denied / Not Logged In");
//     return (
//       <section className="Your-Inbox py-5 md:py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Your-Inbox py-5 md:py-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex items-center justify-between mb-8 gap-4">
//           <div className="flex items-center gap-3 ">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>

//               {/* read and unread massage */}
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <div className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <span className="flex items-center gap-1.5">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       {readMessages.length > 0 && (
//                         <>
//                           <GoDotFill
//                             size={8}
//                             className="text-muted-foreground/50"
//                           />
//                           <span>{readMessages.length} read</span>
//                         </>
//                       )}
//                     </span>
//                   ) : readMessages.length > 0 ? (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     } read`
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {!selectedMessage && (
//             <>
//               <button
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-[50px] sm:w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50"
//               >
//                 <RefreshCw className="size-5" />
//                 <span>Refresh</span>
//               </button>
//             </>
//           )}
//         </div>

//         {error && !(loading && isInitialLoad.current) && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         <div className="relative">
//           {/* OVERLAY LOADER REMOVED FROM HERE */}

//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             !error && (
//               <>
//                 <motion.div key={listAnimationKey}>
//                   {" "}
//                   {/* Key for re-mount on refresh */}
//                   {/* Case 1: Not loading, no error, and absolutely no messages in total (after first load attempt) */}
//                   {!loading &&
//                     !hasMessagesInTotal &&
//                     !isInitialLoad.current && (
//                       <div className="bg-lightgray dark:bg-primarybox rounded-2xl p-6 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//                         <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                           <Inbox className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                         </div>
//                         <h2 className="lg:text-3xl text-2xl font-medium capitalize text-neutral-900 dark:text-white mt-1">
//                           All massage Clear!
//                         </h2>
//                         <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                           Your inbox is currently empty. New messages and
//                           important updates will show up here as soon as they
//                           arrive.
//                         </p>
//                       </div>
//                     )}
//                   {/* Case 2: Messages exist */}
//                   {hasMessagesInTotal && (
//                     <div className="space-y-4">
//                       {unreadMessages.length > 0 && (
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                               <Bell
//                                 className="dark:text-white text-neutral-900"
//                                 size={28}
//                               />
//                             </div>
//                             <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                               New Messages
//                               <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {unreadMessages.length}
//                               </span>
//                             </h2>
//                           </div>
//                           <div className="space-y-3">
//                             {unreadMessages.map((message, index) => (
//                               <motion.div
//                                 key={message._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                   delay: index * 0.05,
//                                   duration: 0.4,
//                                 }}
//                               >
//                                 <InboxMessageListItem
//                                   message={message}
//                                   onSelect={handleSelectMessage}
//                                   onDelete={handleDelete}
//                                   isDeleting={!!actionLoading[message._id]}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {unreadMessages.length > 0 && readMessages.length > 0 && (
//                         <Separator className="sm:my-8 my-5 bg-border/50" />
//                       )}

//                       {readMessages.length > 0 && (
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                               <FaRegCommentDots
//                                 className="dark:text-white text-neutral-900"
//                                 size={28}
//                               />
//                             </div>
//                             <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                               Previous Messages
//                               <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {readMessages.length}
//                               </span>
//                             </h2>
//                           </div>
//                           <div className="space-y-3">
//                             {readMessages.map((message, index) => (
//                               <motion.div
//                                 key={message._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                   delay: index * 0.05,
//                                   duration: 0.4,
//                                 }}
//                               >
//                                 <InboxMessageListItem
//                                   message={message}
//                                   onSelect={handleSelectMessage}
//                                   onDelete={handleDelete}
//                                   isDeleting={!!actionLoading[message._id]}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {!loading &&
//                         !error &&
//                         !hasAnyMessagesOnPage &&
//                         hasMessagesInTotal && (
//                           <div className="text-center py-12 bg-muted/30 dark:bg-primarybox/50 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                             <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                             <p className="text-lg font-medium text-foreground mb-1">
//                               No messages on this page
//                             </p>
//                             <p className="text-muted-foreground">
//                               Try navigating to a different page or refreshing
//                               your inbox.
//                             </p>
//                           </div>
//                         )}
//                     </div>
//                   )}
//                 </motion.div>{" "}
//                 {/* End of motion.div with listAnimationKey */}
//                 {/* Pagination: Show if no error, not initial loading, and more than one page */}
//                 {/* Placed outside the listAnimationKey-ed div so it doesn't re-mount on refresh */}
//                 {!error && !isInitialLoad.current && totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       goToPreviousPage={function (): void {
//                         throw new Error("Function not implemented.");
//                       }}
//                       goToNextPage={function (): void {
//                         throw new Error("Function not implemented.");
//                       }}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   AlertCircle,
//   Loader2, // Kept for potential future use, not actively used for button
// } from "lucide-react";
// import { motion } from "framer-motion";

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem";
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct
// import { GoDotFill } from "react-icons/go";
// import { FaRegCommentDots } from "react-icons/fa"; // FaComments was unused, removed
// import { Skeleton } from "@/components/ui/skeleton";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   const isInitialLoad = useRef(true);
//   const [listAnimationKey, setListAnimationKey] = useState(0); // For refresh animation

//   const fetchInbox = useCallback(
//     async (page: number, isRefresh: boolean = false) => {
//       setLoading(true); // This will trigger the spinner if the refresh button called this
//       setError(null);

//       try {
//         console.log(
//           `Fetching inbox page ${page}... (isInitialLoad.current: ${isInitialLoad.current}, isRefresh: ${isRefresh})`
//         );
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         console.log("Inbox data received:", data);
//         setInboxData(data);
//         if (data.currentPage !== page) {
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//         if (isRefresh) {
//           setListAnimationKey((prev) => prev + 1);
//           console.log(
//             "Refresh successful, updated listAnimationKey to:",
//             listAnimationKey + 1
//           );
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null);
//         setSelectedMessage(null);
//       } finally {
//         setLoading(false);
//         if (isInitialLoad.current) {
//           isInitialLoad.current = false;
//         }
//         console.log(
//           "Fetch inbox finished, loading set to false, isInitialLoad.current is now:",
//           isInitialLoad.current
//         );
//       }
//     },
//     [] // listAnimationKey is not a dependency here as we use functional update
//   );

//   useEffect(() => {
//     console.log("InboxPage Effect triggered:", {
//       authLoading,
//       user,
//       currentPage,
//     });

//     if (authLoading) {
//       console.log("Auth is loading, waiting...");
//       if (!loading && isInitialLoad.current) setLoading(true);
//       return;
//     }

//     if (user) {
//       console.log("User found, fetching inbox for page:", currentPage);
//       fetchInbox(currentPage, false);
//     } else {
//       console.log("No user found, setting error and stopping loading.");
//       setError("Please log in to view your inbox.");
//       setLoading(false);
//       setInboxData(null);
//       setSelectedMessage(null);
//       if (isInitialLoad.current) {
//         isInitialLoad.current = false;
//       }
//     }
//   }, [authLoading, user, currentPage, fetchInbox]); // fetchInbox added as dependency

//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev;

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1 &&
//           currentPage === prev.totalPages
//         ) {
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           setTimeout(() => fetchInbox(currentPage, false), 0);
//         } else if (
//           inboxData &&
//           inboxData.totalMessages - 1 === 0 &&
//           currentPage === 1
//         ) {
//           // UI will update to empty state
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]
//   );

//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       if (!message.isRead) {
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return;
//     }
//     setSelectedMessage(null);
//     setCurrentPage(newPage);
//   };

//   const handleRefresh = useCallback(() => {
//     if (loading) return;
//     console.log(
//       "Refresh triggered. isInitialLoad.current should be false. Calling fetchInbox with isRefresh=true"
//     );
//     setSelectedMessage(null);
//     fetchInbox(currentPage, true); // This will set loading = true
//   }, [loading, currentPage, fetchInbox]);

//   const { unreadMessages, readMessages } = useMemo(() => {
//     if (!inboxData?.messages) return { unreadMessages: [], readMessages: [] };
//     const allMessages = inboxData.messages;
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage;

//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     console.log(
//       "Rendering InboxSkeleton due to authLoading or initial data load."
//     );
//     return <InboxSkeleton />;
//   }

//   if (!authLoading && !user) {
//     console.log("Rendering Access Denied / Not Logged In");
//     return (
//       <section className="Your-Inbox py-5 md:py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Your-Inbox py-5 md:py-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex items-center justify-between mb-8 gap-4 px-4 sm:px-0">
//           <div className="flex items-center gap-3 ">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <div className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <span className="flex items-center gap-1.5">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       {readMessages.length > 0 && (
//                         <>
//                           <GoDotFill
//                             size={8}
//                             className="text-muted-foreground/50"
//                           />
//                           <span>{readMessages.length} read</span>
//                         </>
//                       )}
//                     </span>
//                   ) : readMessages.length > 0 ? (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     } read`
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               )}
//               {/* This loader is for the header count area during refresh/pagination */}
//               {loading && !isInitialLoad.current && (
//                 <div className="flex items-center gap-1">
//                   <Skeleton className="h-4 w-12" />
//                   <Skeleton className="p-1 rounded-full" />
//                   <Skeleton className="h-4 w-12" />
//                 </div>
//               )}
//             </div>
//           </div>

//           {!selectedMessage && (
//             <>
//               <button
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 sm:px-8 py-3 h-[50px] w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw
//                   className={`size-5 ${
//                     loading ? "animate-spin" : "" // THIS IS THE CHANGE
//                   }`}
//                 />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//             </>
//           )}
//         </div>

//         {error && !(loading && isInitialLoad.current) && (
//           <div className="mb-6 px-4 sm:px-0">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         <div className="relative px-4 sm:px-0">
//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             !error && (
//               <>
//                 <motion.div key={listAnimationKey}>
//                   {!loading &&
//                     !hasMessagesInTotal &&
//                     !isInitialLoad.current && (
//                       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//                         <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                           <Inbox className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                         </div>
//                         <h2 className="lg:text-3xl text-2xl font-medium capitalize text-neutral-900 dark:text-white mt-1">
//                           All Messages Clear!
//                         </h2>
//                         <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                           Your inbox is currently empty. New messages and
//                           important updates will show up here as soon as they
//                           arrive.
//                         </p>
//                       </div>
//                     )}
//                   {hasMessagesInTotal && (
//                     <div className="space-y-4">
//                       {unreadMessages.length > 0 && (
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                               <Bell
//                                 className="dark:text-white text-neutral-900"
//                                 size={28}
//                               />
//                             </div>
//                             <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                               New Messages
//                               <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {unreadMessages.length}
//                               </span>
//                             </h2>
//                           </div>
//                           <div className="space-y-3">
//                             {unreadMessages.map((message, index) => (
//                               <motion.div
//                                 key={message._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                   delay: index * 0.05,
//                                   duration: 0.4,
//                                 }}
//                               >
//                                 <InboxMessageListItem
//                                   message={message}
//                                   onSelect={handleSelectMessage}
//                                   onDelete={handleDelete}
//                                   isDeleting={!!actionLoading[message._id]}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {unreadMessages.length > 0 && readMessages.length > 0 && (
//                         <Separator className="sm:my-8 my-5 bg-border/50" />
//                       )}

//                       {readMessages.length > 0 && (
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                               <FaRegCommentDots
//                                 className="dark:text-white text-neutral-900"
//                                 size={28}
//                               />
//                             </div>
//                             <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                               Previous Messages
//                               <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {readMessages.length}
//                               </span>
//                             </h2>
//                           </div>
//                           <div className="space-y-3">
//                             {readMessages.map((message, index) => (
//                               <motion.div
//                                 key={message._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                   delay: index * 0.05,
//                                   duration: 0.4,
//                                 }}
//                               >
//                                 <InboxMessageListItem
//                                   message={message}
//                                   onSelect={handleSelectMessage}
//                                   onDelete={handleDelete}
//                                   isDeleting={!!actionLoading[message._id]}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {!loading &&
//                         !error &&
//                         !hasAnyMessagesOnPage &&
//                         hasMessagesInTotal && (
//                           <div className="text-center py-12 bg-muted/30 dark:bg-primarybox/50 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                             <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                             <p className="text-lg font-medium text-foreground mb-1">
//                               No messages on this page
//                             </p>
//                             <p className="text-muted-foreground">
//                               Try navigating to a different page or refreshing
//                               your inbox.
//                             </p>
//                           </div>
//                         )}
//                     </div>
//                   )}
//                 </motion.div>
//                 {!error && !isInitialLoad.current && totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                       goToNextPage={() => handlePageChange(displayPage + 1)}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;



// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext"; // Ensure this path is correct, or use relative path if needed
// import inboxService from "../../../services/inbox";
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox";
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { motion } from "framer-motion";

// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem";
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination";
// import { GoDotFill } from "react-icons/go";
// import { FaRegCommentDots } from "react-icons/fa";
// import { Skeleton } from "@/components/ui/skeleton";
// import { MdOutlineAccessTime } from "react-icons/md";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   // Destructure fetchUnreadInboxCount from useAuth
//   const { user, loading: authLoading, fetchUnreadInboxCount } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   const isInitialLoad = useRef(true);
//   const [listAnimationKey, setListAnimationKey] = useState(0);

//   const fetchInbox = useCallback(
//     async (page: number, isRefresh: boolean = false) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         setInboxData(data);
//         if (data.currentPage !== page) {
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//         if (isRefresh) {
//           setListAnimationKey((prev) => prev + 1);
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null);
//         setSelectedMessage(null);
//       } finally {
//         setLoading(false);
//         if (isInitialLoad.current) {
//           isInitialLoad.current = false;
//         }
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     if (authLoading) {
//       if (!loading && isInitialLoad.current) setLoading(true);
//       return;
//     }

//     if (user) {
//       fetchInbox(currentPage, false);
//     } else {
//       setError("Please log in to view your inbox.");
//       setLoading(false);
//       setInboxData(null);
//       setSelectedMessage(null);
//       if (isInitialLoad.current) {
//         isInitialLoad.current = false;
//       }
//     }
//   }, [authLoading, user, currentPage, fetchInbox]);

//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//         // ---- MODIFICATION: Refresh global unread count ----
//         if (fetchUnreadInboxCount) {
//             await fetchUnreadInboxCount();
//             console.log("InboxPage: Unread count refreshed after marking message as read.");
//         }
//         // ---- END MODIFICATION ----
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading, fetchUnreadInboxCount] // Added fetchUnreadInboxCount
//   );

//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       // ---- MODIFICATION: Determine if the message was unread BEFORE optimistic update ----
//       let wasMessageUnread = false;
//       if (originalData) { // originalData might be null if inbox hasn't loaded
//           const messageToDelete = originalData.messages.find(msg => msg._id === messageId);
//           if (messageToDelete && !messageToDelete.isRead) {
//               wasMessageUnread = true;
//           }
//       }
//       // ---- END MODIFICATION ----

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev;

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1 &&
//           currentPage === prev.totalPages
//         ) {
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       try {
//         await inboxService.deleteMessage(messageId);

//         // ---- MODIFICATION: Refresh global unread count if an unread message was deleted ----
//         if (wasMessageUnread && fetchUnreadInboxCount) {
//             await fetchUnreadInboxCount();
//             console.log("InboxPage: Unread count refreshed after deleting an unread message.");
//         }
//         // ---- END MODIFICATION ----

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           setTimeout(() => fetchInbox(currentPage, false), 0);
//         } else if (
//           inboxData &&
//           (inboxData.totalMessages - 1 === 0) && // Check previous totalMessages correctly
//           currentPage === 1
//         ) {
//           // UI will update to empty state due to inboxData.totalMessages becoming 0
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox, fetchUnreadInboxCount] // Added fetchUnreadInboxCount
//   );

//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       if (!message.isRead) {
//         // Add a small delay to allow detail view to render before marking as read,
//         // or call handleMarkRead directly if immediate marking is preferred.
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return;
//     }
//     setSelectedMessage(null);
//     setCurrentPage(newPage);
//   };

//   const handleRefresh = useCallback(() => {
//     if (loading) return;
//     setSelectedMessage(null);
//     fetchInbox(currentPage, true);
//   }, [loading, currentPage, fetchInbox]);

//   const { unreadMessages, readMessages } = useMemo(() => {
//     if (!inboxData?.messages) return { unreadMessages: [], readMessages: [] };
//     const allMessages = inboxData.messages;
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage;

//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     return <InboxSkeleton />;
//   }

//   if (!authLoading && !user) {
//     return (
//       <section className="Your-Inbox py-5 md:py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Your-Inbox ">
//       <div className="container mx-auto">
//         <div className="flex flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <div className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <span className="flex items-center gap-1.5">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       {readMessages.length > 0 && (
//                         <>
//                           <GoDotFill
//                             size={8}
//                             className="text-muted-foreground/50"
//                           />
//                           <span>{readMessages.length} read</span>
//                         </>
//                       )}
//                     </span>
//                   ) : readMessages.length > 0 ? (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     } read`
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               )}
//               {loading && !isInitialLoad.current && (
//                 <div className="flex items-center gap-1">
//                   <Skeleton className="h-4 w-12" />
//                   <Skeleton className="p-1 rounded-full" />
//                   <Skeleton className="h-4 w-12" />
//                 </div>
//               )}
//             </div>
//           </div>

//           {!selectedMessage && (
//             <>
//               <button
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 sm:px-8 py-3 h-[50px] w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw
//                   className={`size-5 ${
//                     loading && !isInitialLoad.current ? "animate-spin" : "" // Adjusted to only spin on non-initial loads
//                   }`}
//                 />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//             </>
//           )}
//         </div>

//         {error && !(loading && isInitialLoad.current) && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         <div className="relative">
//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             !error && (
//               <>
//                 <motion.div key={listAnimationKey}>
//                   {!loading &&
//                     !hasMessagesInTotal &&
//                     !isInitialLoad.current && (
//                       <motion.div // <-- MODIFIED: Added motion.div for animation
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.4, delay: 0.1 }} // Sensible transition
//                         className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center"
//                       >
//                         <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                           <Inbox className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                         </div>
//                         <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//                           All Messages Clear!
//                         </h2>
//                         <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                           Your inbox is currently empty. New messages and
//                           important updates will show up here as soon as they
//                           arrive.
//                         </p>
//                       </motion.div>
//                     )}

//                   {hasMessagesInTotal && (
//                     <div className="space-y-4">
//                       {unreadMessages.length > 0 && (
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                               <Bell
//                                 className="dark:text-white text-neutral-900"
//                                 size={28}
//                               />
//                             </div>
//                             <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                               New Messages
//                               <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {unreadMessages.length}
//                               </span>
//                             </h2>
//                           </div>

//                           <div className="space-y-3">
//                             {unreadMessages.map((message, index) => (
//                               <motion.div
//                                 key={message._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                   delay: index * 0.05,
//                                   duration: 0.4,
//                                 }}
//                               >
//                                 <InboxMessageListItem
//                                   message={message}
//                                   onSelect={handleSelectMessage}
//                                   onDelete={handleDelete}
//                                   isDeleting={!!actionLoading[message._id]}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {unreadMessages.length > 0 && readMessages.length > 0 && (
//                         <Separator className="sm:my-8 my-5 bg-border/50" />
//                       )}

//                       {readMessages.length > 0 && (
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
//                               <FaRegCommentDots
//                                 className="dark:text-white text-neutral-900"
//                                 size={28}
//                               />
//                             </div >
//                             <h2 className="text-xl font-medium dark:text-white text-mainheading">
//                               Previous Messages
//                               <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder dark:text-neutral-900 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
//                                 {readMessages.length}
//                               </span>
//                             </h2>
//                           </div>
//                           <div className="space-y-3">
//                             {readMessages.map((message, index) => (
//                               <motion.div
//                                 key={message._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{
//                                   delay: index * 0.05,
//                                   duration: 0.4,
//                                 }}
//                               >
//                                 <InboxMessageListItem
//                                   message={message}
//                                   onSelect={handleSelectMessage}
//                                   onDelete={handleDelete}
//                                   isDeleting={!!actionLoading[message._id]}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {!loading &&
//                         !error &&
//                         !hasAnyMessagesOnPage &&
//                         hasMessagesInTotal && (
//                           <div className="text-center py-12 bg-muted/30 dark:bg-primarybox/50 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                             <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                             <p className="text-lg font-medium text-foreground mb-1">
//                               No messages on this page
//                             </p>
//                             <p className="text-muted-foreground">
//                               Try navigating to a different page or refreshing
//                               your inbox.
//                             </p>
//                           </div>
//                         )}
//                     </div>
//                   )}
//                 </motion.div>
//                 {!error && !isInitialLoad.current && totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                       goToNextPage={() => handlePageChange(displayPage + 1)}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;



"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // Ensure this path is correct, or use relative path if needed
import inboxService from "../../../services/inbox";
import type { InboxMessage, InboxListResponse } from "../../../services/inbox";
import { Separator } from "@/components/ui/separator";
import {
  Inbox,
  RefreshCw,
  Bell,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
import { InboxErrorState } from "../../components/inbox/InboxErrorState";
import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem";
import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
import Pagination from "../../components/Pagination";
import { GoDotFill } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

const MESSAGES_PER_PAGE = 10;

const InboxPage: React.FC = () => {
  const { user, loading: authLoading, fetchUnreadInboxCount } = useAuth();
  const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
    null
  );
  const isInitialLoad = useRef(true);
  const [listAnimationKey, setListAnimationKey] = useState(0);

  const fetchInbox = useCallback(
    async (page: number, isRefresh: boolean = false) => {
      setLoading(true);
      setError(null);

      try {
        const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
        setInboxData(data);
        if (data.currentPage !== page) {
          setTimeout(() => setCurrentPage(data.currentPage), 0);
        }
        if (isRefresh) {
          setListAnimationKey((prev) => prev + 1);
        }
      } catch (err: any) {
        console.error("Failed to fetch inbox:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Could not load messages.";
        setError(errorMessage);
        setInboxData(null);
        setSelectedMessage(null);
      } finally {
        setLoading(false);
        if (isInitialLoad.current) {
          isInitialLoad.current = false;
        }
      }
    },
    []
  );

  useEffect(() => {
    if (authLoading) {
      if (!loading && isInitialLoad.current) setLoading(true);
      return;
    }

    if (user) {
      fetchInbox(currentPage, false);
    } else {
      setError("Please log in to view your inbox.");
      setLoading(false);
      setInboxData(null);
      setSelectedMessage(null);
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }
    }
  }, [authLoading, user, currentPage, fetchInbox]);

  const handleActionStart = (messageId: string) => {
    setActionLoading((prev) => ({ ...prev, [messageId]: true }));
  };

  const handleActionEnd = (messageId: string) => {
    setActionLoading((prev) => {
      const newState = { ...prev };
      delete newState[messageId];
      return newState;
    });
  };

  const handleMarkRead = useCallback(
    async (message: InboxMessage) => {
      if (!message || message.isRead || actionLoading[message._id]) return;

      handleActionStart(message._id);
      const originalData = structuredClone(inboxData);
      const originalSelectedMessage = selectedMessage
        ? structuredClone(selectedMessage)
        : null;

      setInboxData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: prev.messages.map((msg) =>
            msg._id === message._id ? { ...msg, isRead: true } : msg
          ),
        };
      });

      if (selectedMessage?._id === message._id) {
        setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
      }

      try {
        await inboxService.markAsRead(message._id);
        if (fetchUnreadInboxCount) {
            await fetchUnreadInboxCount();
            console.log("InboxPage: Unread count refreshed after marking message as read.");
        }
      } catch (err) {
        console.error("Failed to mark as read:", err);
        setError("Failed to update message status. Please try refreshing.");
        setInboxData(originalData);
        setSelectedMessage(originalSelectedMessage);
      } finally {
        handleActionEnd(message._id);
      }
    },
    [inboxData, selectedMessage, actionLoading, fetchUnreadInboxCount]
  );

  const handleDelete = useCallback(
    async (messageId: string) => {
      if (actionLoading[messageId]) return;

      handleActionStart(messageId);
      const originalData = structuredClone(inboxData); // State BEFORE this delete op's optimistic update
      const originalSelectedMessage = selectedMessage
        ? structuredClone(selectedMessage)
        : null;
      const isDeletingSelected = selectedMessage?._id === messageId;

      let wasMessageUnread = false;
      if (originalData) { 
          const messageToDelete = originalData.messages.find(msg => msg._id === messageId);
          if (messageToDelete && !messageToDelete.isRead) {
              wasMessageUnread = true;
          }
      }

      let pageToNavigateTo = currentPage;
      let shouldRefetchCurrentPage = false;
      // This variable will store the total messages *after* the optimistic update.
      let newTotalMessagesAfterOptimisticUpdate = originalData ? originalData.totalMessages -1 : 0;


      setInboxData((prev) => {
        if (!prev) return null;
        const messageIndex = prev.messages.findIndex(
          (msg) => msg._id === messageId
        );
        if (messageIndex === -1) return prev; // Message not found, should not happen if UI is consistent

        const newMessages = prev.messages.filter(
          (msg) => msg._id !== messageId
        );
        // `newTotalMessages` is local to this callback, correctly calculates the new total
        const newTotalMessages = Math.max(0, prev.totalMessages - 1);
        newTotalMessagesAfterOptimisticUpdate = newTotalMessages; // Store for use after this callback

        const newTotalPages =
          Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

        if (
          newMessages.length === 0 && // Current page becomes empty
          prev.messages.length > 0 && // But there were messages on it before
          currentPage > 1 &&          // And it's not the first page
          currentPage === prev.totalPages // And it was the last page
        ) {
          pageToNavigateTo = Math.max(1, currentPage - 1);
        } else if (
          newMessages.length < MESSAGES_PER_PAGE && // Page has space
          newTotalMessages > // And there are more messages in total than currently shown after this delete on this page
            newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
        ) {
          shouldRefetchCurrentPage = true;
        }

        const optimisticCurrentPage =
          pageToNavigateTo !== currentPage
            ? pageToNavigateTo
            : prev.currentPage;

        return {
          ...prev,
          messages: newMessages,
          totalMessages: newTotalMessages,
          totalPages: newTotalPages,
          currentPage: optimisticCurrentPage,
        };
      });

      if (isDeletingSelected) {
        setSelectedMessage(null);
      }

      try {
        await inboxService.deleteMessage(messageId);

        if (wasMessageUnread && fetchUnreadInboxCount) {
            await fetchUnreadInboxCount();
            console.log("InboxPage: Unread count refreshed after deleting an unread message.");
        }

        if (pageToNavigateTo !== currentPage) {
          setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
        } else if (shouldRefetchCurrentPage) {
          setTimeout(() => fetchInbox(currentPage, false), 0);
        } else if (
          // ---- CORRECTION IS HERE ----
          // Check if the inbox became empty (total messages is now 0)
          // and we were on page 1.
          // `originalData.totalMessages === 1` implies it will become 0 after this delete.
          originalData && originalData.totalMessages === 1 &&
          currentPage === 1
          // ---- END CORRECTION ----
        ) {
          // UI will update to empty state naturally due to inboxData.totalMessages becoming 0
          // No explicit navigation or refetch needed for this case.
        }
      } catch (err: any) {
        console.error("Failed to delete message:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to delete message. Please try refreshing."
        );
        setInboxData(originalData); // Revert optimistic update
        if (isDeletingSelected) setSelectedMessage(originalSelectedMessage); // Revert selected message
      } finally {
        handleActionEnd(messageId);
      }
    },
    [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox, fetchUnreadInboxCount]
  );

  const handleSelectMessage = useCallback(
    (message: InboxMessage) => {
      setSelectedMessage(message);
      if (!message.isRead) {
        setTimeout(() => handleMarkRead(message), 50);
      }
    },
    [handleMarkRead]
  );

  const handlePageChange = (newPage: number) => {
    if (
      loading ||
      newPage === currentPage ||
      newPage < 1 ||
      (inboxData && newPage > inboxData.totalPages)
    ) {
      return;
    }
    setSelectedMessage(null);
    setCurrentPage(newPage);
  };

  const handleRefresh = useCallback(() => {
    if (loading && !isInitialLoad.current) return; 
    setSelectedMessage(null);
    fetchInbox(currentPage, true);
  }, [loading, currentPage, fetchInbox]); 

  const { unreadMessages, readMessages } = useMemo(() => {
    if (!inboxData?.messages) return { unreadMessages: [], readMessages: [] };
    const allMessages = inboxData.messages;
    const unread = allMessages.filter((msg) => !msg.isRead);
    const read = allMessages.filter((msg) => msg.isRead);
    return { unreadMessages: unread, readMessages: read };
  }, [inboxData?.messages]);

  const totalMessages = inboxData?.totalMessages ?? 0;
  const totalPages = inboxData?.totalPages ?? 1;
  const displayPage = inboxData?.currentPage ?? currentPage;

  const hasAnyMessagesOnPage =
    unreadMessages.length > 0 || readMessages.length > 0;
  const hasMessagesInTotal = totalMessages > 0;

  if (authLoading || (loading && isInitialLoad.current && !error)) {
    return <InboxSkeleton />;
  }

  if (!authLoading && !user) {
    return (
      <section className="Your-Inbox py-5 md:py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            {error || "Please log in to view your inbox."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="Your-Inbox ">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
                Your Inbox
              </h1>
              
              {!loading && inboxData && hasMessagesInTotal && (
                <div className="text-sm text-muted-foreground">
                  {unreadMessages.length > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <span className="font-medium text-primary">
                        {unreadMessages.length} new
                      </span>
                      {readMessages.length > 0 && (
                        <>
                          <GoDotFill
                            size={8}
                            className="text-gray"
                          />
                          <span>{readMessages.length} read</span>
                        </>
                      )}
                    </span>
                  ) : readMessages.length > 0 ? (
                    `${readMessages.length} message${
                      readMessages.length !== 1 ? "s" : ""
                    } read`
                  ) : (
                    ""
                  )}
                </div>
              )}
              {loading && !isInitialLoad.current && (
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="p-1 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>
              )}
            </div>
          </div>

          {!selectedMessage && (
            <>
              <button
                onClick={handleRefresh}
                disabled={loading && !isInitialLoad.current} 
                className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 sm:px-8 py-3 h-[50px] w-auto rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`size-5 ${
                    loading && !isInitialLoad.current ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </>
          )}
        </div>

        {error && !(loading && isInitialLoad.current) && (
          <div className="mb-6">
            <InboxErrorState error={error} onRetry={handleRefresh} />
          </div>
        )}

        <div className="relative">
          {selectedMessage ? (
            <InboxMessageDetailView
              message={selectedMessage}
              onBack={() => setSelectedMessage(null)}
              onDelete={handleDelete}
              isDeleting={!!actionLoading[selectedMessage._id]}
            />
          ) : (
            !error && (
              <>
                {!isInitialLoad.current && !hasMessagesInTotal && (
                  <div 
                    className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center"
                  >
                    <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
                      <Inbox className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
                    </div>
                    <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
                      All Messages Clear!
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
                      Your inbox is currently empty. New messages and
                      important updates will show up here as soon as they
                      arrive.
                    </p>
                  </div>
                )}
                
                {hasMessagesInTotal && (
                  <motion.div key={listAnimationKey}>
                    <div className="space-y-4"> 
                      {unreadMessages.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
                              <Bell
                                className="dark:text-white text-neutral-900"
                                size={28}
                              />
                            </div>

                            <h2 className="text-xl font-medium dark:text-white text-mainheading">
                              New Messages
                              <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder text-neutral-900 px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
                                {unreadMessages.length}
                              </span>
                            </h2>
                          </div>

                          <div className="space-y-3">
                            {unreadMessages.map((message, index) => (
                              <motion.div
                                key={message._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  duration: 0.4,
                                }}
                              >
                                <InboxMessageListItem
                                  message={message}
                                  onSelect={handleSelectMessage}
                                  onDelete={handleDelete}
                                  isDeleting={!!actionLoading[message._id]}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {unreadMessages.length > 0 && readMessages.length > 0 && (
                        <Separator className="sm:my-8 my-5 bg-border/50" />
                      )}

                      {readMessages.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="dark:bg-primarybox bg-primary p-2 rounded-md">
                              <FaRegCommentDots
                                className="dark:text-white text-neutral-900"
                                size={28}
                              />
                            </div>
                            
                            <h2 className="text-xl font-medium dark:text-white text-mainheading">
                              Previous Messages
                              <span className="ml-2 text-xs font-semibold dark:bg-primary bg-lightborder text-neutral-900 px-1.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[20px]">
                                {readMessages.length}
                              </span>
                            </h2>
                          </div>
                          <div className="space-y-3">
                            {readMessages.map((message, index) => (
                              <motion.div
                                key={message._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  duration: 0.4,
                                }}
                              >
                                <InboxMessageListItem
                                  message={message}
                                  onSelect={handleSelectMessage}
                                  onDelete={handleDelete}
                                  isDeleting={!!actionLoading[message._id]}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!loading && 
                        !hasAnyMessagesOnPage &&
                        (
                          <div className="text-center py-12 bg-muted/30 dark:bg-primarybox/50 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
                            <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
                            <p className="text-lg font-medium text-foreground mb-1">
                              No messages on this page
                            </p>
                            <p className="text-muted-foreground">
                              Try navigating to a different page or refreshing
                              your inbox.
                            </p>
                          </div>
                        )}
                    </div>
                  </motion.div>
                )}
                
                {!error && !isInitialLoad.current && totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={displayPage}
                      totalPages={totalPages}
                      paginate={handlePageChange}
                      goToPreviousPage={() => handlePageChange(displayPage - 1)}
                      goToNextPage={() => handlePageChange(displayPage + 1)}
                    />
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default InboxPage;