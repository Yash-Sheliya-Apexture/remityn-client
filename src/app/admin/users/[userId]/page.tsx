// // frontend/src/app/admin/users/[userId]/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import userAdminService from '../../../services/admin/user.admin';
// // Import specific types needed
// import type { AdminUserDetailResponse } from '../../../services/admin/user.admin';
// import type { KycMobile, KycStatus } from '../../../services/kyc';
// import type { Payment } from '@/types/payment';
// import type { Transfer } from '@/types/transfer';
// import { useAuth } from '../../../contexts/AuthContext';

// // Components
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator"; // <<<--- ADD THIS IMPORT

// // Icons
// import {
//     ArrowLeft, User, Mail, ShieldCheck, CalendarDays, Phone, Briefcase, UserCheck, UserX, HelpCircle,
//     BadgeDollarSign, Fingerprint, Globe, FileText, AlertCircle, Info, Workflow,
//     ExternalLink, Eye, Wallet, Send, Download, Landmark, Clock
// } from 'lucide-react';
// import { cn } from "@/lib/utils";

// // --- Helper Functions (Keep as they are) ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//         if (isNaN(date.getTime())) return 'Invalid Date';
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric', month: 'short', day: 'numeric', // Changed month format
//             ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true })
//         };
//         return date.toLocaleDateString('en-US', options);
//     } catch (e) {
//         return 'Invalid Date';
//     }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//     if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
//     return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//     const statusMap: Record<KycStatus | 'unknown', { color: string; icon: React.ElementType; label: string }> = {
//         verified: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: ShieldCheck, label: 'Verified' },
//         rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', icon: UserX, label: 'Rejected' },
//         pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: Clock, label: 'Pending' },
//         skipped: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: ArrowLeft, label: 'Skipped' },
//         not_started: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: HelpCircle, label: 'Not Started' },
//         unknown: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: HelpCircle, label: 'Unknown' } // Fallback
//     };
//     return statusMap[status || 'not_started'] || statusMap.unknown;
// };

// const getTransactionStatusColor = (status?: string | null): string => {
//      switch (status?.toLowerCase()) {
//          case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400';
//          case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400';
//          case 'processing': case 'in progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400';
//          case 'failed': return 'text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400';
//          case 'canceled': case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400';
//          default: return 'text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400';
//      }
//  };

// const getInitials = (name?: string): string => {
//     if (!name) return '??';
//     return name.split(' ').map(part => part[0]).filter(Boolean).join('').substring(0, 2).toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // --- DetailItem Component (Keep as is) ---
// const DetailItem = ({ label, value, icon: Icon, isImportant = false, className = '' }: { label: string; value: React.ReactNode; icon?: React.ElementType; isImportant?: boolean; className?: string }) => (
//     <div className={cn("py-2.5 space-y-1", className)}>
//         <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
//             {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />} {label}
//         </dt>
//         <dd className={cn("text-sm min-h-[20px] break-words", isImportant ? "font-semibold text-foreground" : "text-foreground/90")}>
//             {value || <span className="italic text-muted-foreground/80">N/A</span>}
//         </dd>
//     </div>
// );

// // --- Loading Skeleton Component (Keep as is) ---
// const LoadingSkeleton = () => (
//     <div className="space-y-6 animate-pulse">
//          <div className="flex items-center gap-2 mb-4">
//            <Skeleton className="h-6 w-6 rounded-full" />
//            <Skeleton className="h-5 w-36 bg-muted rounded" />
//          </div>
//          <Card className="shadow-sm">
//              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-border">
//                  <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
//                  <div className="space-y-2 flex-1">
//                      <Skeleton className="h-6 w-3/4 bg-muted rounded" />
//                      <Skeleton className="h-4 w-1/2 bg-muted rounded" />
//                      <Skeleton className="h-5 w-20 bg-muted rounded-md" />
//                  </div>
//                   <div className="space-y-1 text-right flex-shrink-0">
//                      <Skeleton className="h-3 w-28 bg-muted rounded" />
//                      <Skeleton className="h-3 w-24 bg-muted rounded" />
//                      <Skeleton className="h-3 w-32 bg-muted rounded" />
//                   </div>
//              </CardHeader>
//              <CardContent className="p-4 sm:p-6">
//                  <Skeleton className="h-4 w-1/4 bg-muted rounded mb-3" />
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                       {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full bg-muted rounded-md" />)}
//                   </div>
//              </CardContent>
//          </Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/3 bg-muted rounded" /></CardHeader><CardContent className="p-4 sm:p-6"><Skeleton className="h-40 w-full bg-muted rounded-md" /></CardContent></Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/2 bg-muted rounded" /></CardHeader><CardContent className="p-4 sm:p-6"><Skeleton className="h-32 w-full bg-muted rounded-md" /></CardContent></Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/4 bg-muted rounded" /></CardHeader><CardContent className="p-0"><Skeleton className="h-48 w-full" /></CardContent></Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/4 bg-muted rounded" /></CardHeader><CardContent className="p-0"><Skeleton className="h-48 w-full" /></CardContent></Card>
//     </div>
// );

// // --- Error Display Component (Keep as is) ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//      <Alert variant="destructive" className="mt-6">
//        <AlertCircle className="h-4 w-4" />
//        <AlertTitle>Error Loading User Details</AlertTitle>
//        <AlertDescription>
//          {error || "An unexpected error occurred."}
//          <Button variant="destructive" size="sm" onClick={onRetry} className="mt-2 ml-auto block">
//            Retry
//          </Button>
//        </AlertDescription>
//      </Alert>
//  );

// // --- Transaction Table Component (Keep as is) ---
// const TransactionTable = ({ data, type }: { data: (Transfer | Payment)[], type: 'transfer' | 'payment' }) => {
//      if (!data || data.length === 0) {
//          return <p className="text-sm text-muted-foreground text-center py-6 px-4">No {type}s found for this user.</p>;
//      }

//      const isTransfer = (item: Transfer | Payment): item is Transfer => type === 'transfer';

//      return (
//          <div className="overflow-x-auto">
//              <Table>
//                  <TableHeader>
//                      <TableRow>
//                          <TableHead className="w-[100px]">ID</TableHead>
//                          {type === 'transfer' && <TableHead>Recipient</TableHead>}
//                          <TableHead>Amount</TableHead>
//                          <TableHead>Currency</TableHead>
//                          <TableHead>Status</TableHead>
//                          <TableHead>Date</TableHead>
//                          <TableHead className="text-right">Details</TableHead>
//                      </TableRow>
//                  </TableHeader>
//                  <TableBody>
//                      {data.slice(0, 5).map((item) => {
//                           const statusColor = getTransactionStatusColor(item.status);
//                           const amount = isTransfer(item) ? item.sendAmount : (item as Payment).amountToAdd;
//                            // Ensure currency objects exist before accessing code
//                            const currencyCode = isTransfer(item)
//                                ? (typeof item.sendCurrency === 'object' ? item.sendCurrency?.code : 'N/A')
//                                : (item as Payment).payInCurrency?.code;
//                           const recipientName = isTransfer(item) ? item.recipient?.accountHolderName : undefined;
//                           const detailLink = type === 'transfer'
//                                ? `/admin/transfers/${item._id}`
//                                : `/admin/payments`; // Maybe link to payment list for now

//                           return (
//                              <TableRow key={item._id} className="text-xs">
//                                  <TableCell>
//                                      <TooltipProvider delayDuration={100}>
//                                          <Tooltip>
//                                              <TooltipTrigger asChild>
//                                                  <span className="font-mono cursor-help underline decoration-dashed decoration-border">
//                                                      {item._id.substring(item._id.length - 6)}
//                                                  </span>
//                                              </TooltipTrigger>
//                                              <TooltipContent><p>{item._id}</p></TooltipContent>
//                                          </Tooltip>
//                                      </TooltipProvider>
//                                  </TableCell>
//                                   {type === 'transfer' && <TableCell className="max-w-[150px] truncate">{recipientName || 'N/A'}</TableCell>}
//                                  <TableCell className="font-medium">{amount != null ? Number(amount).toFixed(2) : 'N/A'}</TableCell>
//                                  <TableCell>{currencyCode || 'N/A'}</TableCell>
//                                  <TableCell>
//                                      <Badge variant="outline" className={cn("text-[11px] capitalize px-2 py-0.5", statusColor)}>
//                                          {item.status || 'Unknown'}
//                                      </Badge>
//                                  </TableCell>
//                                  <TableCell>{formatDate(item.createdAt, true)}</TableCell>
//                                  <TableCell className="text-right">
//                                       <Button asChild variant="ghost" size="icon" className="h-7 w-7" title={`View ${type} details`}>
//                                            <Link href={detailLink} target="_blank" rel="noopener noreferrer">
//                                                <ExternalLink className="h-3.5 w-3.5" />
//                                            </Link>
//                                       </Button>
//                                  </TableCell>
//                              </TableRow>
//                           );
//                       })}
//                  </TableBody>
//              </Table>
//          </div>
//      );
//  };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//     const params = useParams();
//     const router = useRouter();
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const userId = params.userId as string;

//     const [userData, setUserData] = useState<AdminUserDetailResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // Fetching Logic (Keep as is)
//     const fetchUserDetails = useCallback(async () => {
//          if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//              return;
//          }
//         if (!userId) {
//             setError("User ID is missing from the URL.");
//             setLoading(false);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await userAdminService.getUserDetailsAdmin(userId);
//             setUserData(data);
//         } catch (err: any) {
//             setError(err.message || 'Failed to load user details.');
//             setUserData(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [userId, isAdmin]);

//     useEffect(() => {
//         if (authLoading) return;

//         if (token && isAdmin) {
//             fetchUserDetails();
//         } else if (!token) {
//              router.push('/auth/login?message=login_required');
//         } else if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//         }
//     }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

//     // --- Render Logic ---
//     if (loading || authLoading) return <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8"><LoadingSkeleton /></div>;
//     if (error) return <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8"><ErrorDisplay error={error} onRetry={fetchUserDetails} /></div>;
//     if (!userData) return <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">User data could not be loaded.</div>;

//     const { kyc, accounts, transfers, payments } = userData;
//     const kycStatusConfig = getKycStatusConfig(kyc?.status);

//     return (
//         <div className="min-h-screen bg-background dark:bg-background">
//             <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
//                 {/* Back Navigation */}
//                 <Button asChild variant="outline" size="sm" className="gap-1.5 mb-4 h-8 px-3">
//                     <Link href="/admin/users">
//                         <ArrowLeft className="h-4 w-4" />
//                         Back to User List
//                     </Link>
//                 </Button>

//                 {/* User Profile Card */}
//                 <Card className="shadow-sm overflow-hidden border-border">
//                     <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-border">
//                         {/* ... (Avatar, Title, etc. - Keep as is) ... */}
//                          <div className="flex items-center gap-4">
//                             <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 border-2 border-border">
//                                 <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
//                                     {getInitials(userData.fullName)}
//                                 </AvatarFallback>
//                             </Avatar>
//                             <div className="space-y-0.5">
//                                 <CardTitle className="text-lg sm:text-xl text-foreground">{userData.fullName}</CardTitle>
//                                 <CardDescription className="text-sm text-muted-foreground">{userData.email}</CardDescription>
//                                 <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'} className="mt-1.5 text-xs capitalize">
//                                      {userData.role} Account
//                                 </Badge>
//                             </div>
//                         </div>
//                          <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-muted-foreground flex-shrink-0 mt-2 sm:mt-0">
//                               <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3"/> Joined: {formatDate(userData.createdAt)}</span>
//                               <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> Updated: {formatDate(userData.updatedAt)}</span>
//                               <TooltipProvider delayDuration={100}>
//                                   <Tooltip>
//                                       <TooltipTrigger asChild>
//                                           <span className="font-mono cursor-help underline decoration-dotted">ID: {userData._id.substring(userData._id.length - 8)}</span>
//                                       </TooltipTrigger>
//                                       <TooltipContent side="bottom"><p>{userData._id}</p></TooltipContent>
//                                   </Tooltip>
//                               </TooltipProvider>
//                          </div>
//                     </CardHeader>
//                      {/* Account Balances */}
//                      <CardContent className="p-4 sm:p-6 bg-muted/30 dark:bg-secondarybox/20">
//                           <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
//                               <Wallet className="h-4 w-4" /> Account Balances
//                           </h3>
//                           {accounts && accounts.length > 0 ? (
//                               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                                   {accounts.map(acc => (
//                                        <div key={acc._id} className="border border-border rounded-md p-3 bg-card shadow-sm">
//                                           <div className="flex items-center justify-between mb-0.5">
//                                              <span className="text-xs font-semibold text-foreground">{acc.currency?.code}</span>
//                                           </div>
//                                           <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
//                                                {acc.balance != null ? acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
//                                           </div>
//                                            {/* --- FIX: Use currencyName --- */}
//                                           <div className="text-[11px] text-muted-foreground truncate" title={acc.currency?.currencyName ?? ''}>
//                                               {acc.currency?.currencyName || 'Unknown Currency'} {/* <-- Use currencyName */}
//                                           </div>
//                                            {/* --- END FIX --- */}
//                                        </div>
//                                   ))}
//                               </div>
//                           ) : (
//                               <p className="text-sm text-muted-foreground italic py-2">No accounts found for this user.</p>
//                           )}
//                      </CardContent>
//                 </Card>

//                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left Column (KYC + Documents) */}
//                     <div className="lg:col-span-1 space-y-6">
//                         {/* KYC Details Card */}
//                         <Card className="shadow-sm border-border">
//                              {/* ... (CardHeader with Status - Keep as is) ... */}
//                              <CardHeader className="border-b border-border p-4">
//                                 <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                     <UserCheck className="h-5 w-5 text-primary" /> KYC Information
//                                 </CardTitle>
//                                 <CardDescription className="flex items-center gap-2 pt-1">
//                                     Status:
//                                     <Badge variant="outline" className={cn("text-xs capitalize px-2 py-0.5 font-medium", kycStatusConfig.color)}>
//                                         <kycStatusConfig.icon className="h-3 w-3 mr-1 flex-shrink-0" />
//                                         {kycStatusConfig.label}
//                                     </Badge>
//                                 </CardDescription>
//                                 {kyc?.status === 'rejected' && kyc.rejectionReason && (
//                                 <p className="text-xs text-destructive pt-1.5 !mt-1.5 border-t border-destructive/20">
//                                     <span className="font-medium">Rejection Reason:</span> {kyc.rejectionReason}
//                                 </p>
//                                 )}
//                             </CardHeader>
//                             <CardContent className="p-4 space-y-1">
//                                 {kyc ? (
//                                     <>
//                                         <DetailItem label="First Name" value={kyc.firstName} />
//                                         <DetailItem label="Last Name" value={kyc.lastName} />
//                                         <DetailItem label="Date of Birth" value={formatDate(kyc.dateOfBirth)} icon={CalendarDays} />
//                                         <DetailItem label="Mobile" value={formatMobile(kyc.mobile)} icon={Phone} />
//                                         <DetailItem label="Nationality" value={kyc.nationality} icon={Globe} />
//                                         <DetailItem label="Occupation" value={kyc.occupation} icon={Briefcase} />
//                                         <DetailItem label="Salary Range" value={kyc.salaryRange ? salaryDisplayMap[kyc.salaryRange] : undefined} icon={BadgeDollarSign} />
//                                         {/* --- FIX: Use Separator component --- */}
//                                         <Separator className="my-2.5" />
//                                         {/* --- END FIX --- */}
//                                         <DetailItem label="ID Type" value={<span className="capitalize">{kyc.idType?.replace("_", " ")}</span>} icon={Fingerprint} />
//                                         <DetailItem label="ID Number" value={kyc.idNumber} />
//                                         <DetailItem label="ID Issue Date" value={formatDate(kyc.idIssueDate)} icon={CalendarDays} />
//                                         <DetailItem label="ID Expiry Date" value={formatDate(kyc.idExpiryDate)} icon={CalendarDays} />
//                                          {/* --- FIX: Use Separator component --- */}
//                                         <Separator className="my-2.5" />
//                                          {/* --- END FIX --- */}
//                                         <DetailItem label="Submitted At" value={formatDate(kyc.submittedAt, true)} icon={Clock} />
//                                         <DetailItem label="Last Updated" value={formatDate(kyc.lastUpdatedAt, true)} icon={Clock} />
//                                     </>
//                                 ) : (
//                                     <p className="text-sm text-muted-foreground italic py-4 text-center">KYC details not submitted.</p>
//                                 )}
//                             </CardContent>
//                         </Card>

//                        {/* Documents Card (Keep as is) */}
//                        {kyc?.documents && kyc.documents.length > 0 && (
//                             <Card className="shadow-sm border-border">
//                                 <CardHeader className="p-4 border-b border-border">
//                                     <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                         <FileText className="h-5 w-5 text-primary" /> Submitted Documents
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="p-4 space-y-4">
//                                     {kyc.documents.map((doc) => (
//                                         <div key={doc.public_id} className="border border-border rounded-lg overflow-hidden bg-card">
//                                             <div className="p-2 border-b bg-muted/50">
//                                                 <h4 className="text-xs font-medium capitalize">
//                                                     {doc.docType.replace('_', ' ')}
//                                                 </h4>
//                                             </div>
//                                             <div className="p-2 flex items-center justify-center aspect-video bg-muted overflow-hidden relative group">
//                                                 {doc.url ? (
//                                                         <>
//                                                         {doc.url.toLowerCase().endsWith('.pdf') ? (
//                                                             <FileText className="h-12 w-12 text-muted-foreground/50" />
//                                                         ) : (
//                                                             <Image
//                                                                 src={doc.url} alt={`${doc.docType} preview`} fill
//                                                                 className="object-contain" unoptimized
//                                                             />
//                                                         )}
//                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer"
//                                                             className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
//                                                             aria-label={`View full ${doc.docType.replace('_', ' ')} document`}>
//                                                             <Eye className="h-6 w-6 text-white" />
//                                                             </a>
//                                                         </>
//                                                     ) : (
//                                                         <p className="text-xs text-muted-foreground italic">No preview</p>
//                                                     )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </div>

//                     {/* Right Column (Transactions - Keep as is) */}
//                     <div className="lg:col-span-2 space-y-6">
//                          <Card className="shadow-sm border-border">
//                              <CardHeader className="p-4 border-b border-border">
//                                  <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                      <Send className="h-5 w-5 text-primary" /> Recent Transfers
//                                  </CardTitle>
//                                  <CardDescription>Last 5 transfers initiated by this user.</CardDescription>
//                              </CardHeader>
//                              <CardContent className="p-0">
//                                  <TransactionTable data={transfers} type="transfer" />
//                              </CardContent>
//                          </Card>
//                          <Card className="shadow-sm border-border">
//                              <CardHeader className="p-4 border-b border-border">
//                                  <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                      <Landmark className="h-5 w-5 text-primary" /> Recent Payments (Add Money)
//                                  </CardTitle>
//                                 <CardDescription>Last 5 payment attempts by this user.</CardDescription>
//                              </CardHeader>
//                              <CardContent className="p-0">
//                                  <TransactionTable data={payments} type="payment" />
//                              </CardContent>
//                          </Card>
//                     </div>
//                  </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetailPage;

// // frontend/src/app/admin/users/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import userAdminService from "../../../services/admin/user.admin";
// // Import specific types needed
// import type { AdminUserDetailResponse } from "../../../services/admin/user.admin";
// import type { KycMobile, KycStatus } from "../../../services/kyc";
// import type { Payment } from "@/types/payment";
// import type { Transfer } from "@/types/transfer";
// import { useAuth } from "../../../contexts/AuthContext";

// // Components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"; // Removed CardFooter as it wasn't used
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator"; // <<<--- IMPORT CONFIRMED

// // Icons
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   ShieldCheck,
//   CalendarDays,
//   Phone,
//   Briefcase,
//   UserCheck,
//   UserX,
//   HelpCircle,
//   BadgeDollarSign,
//   Fingerprint,
//   Globe,
//   FileText,
//   AlertCircle,
//   Info,
//   Workflow,
//   ExternalLink,
//   Eye,
//   Wallet,
//   Send,
//   Download,
//   Landmark,
//   Clock,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Helper Functions (Keep as they are) ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//   const statusMap: Record<
//     KycStatus | "unknown",
//     { color: string; icon: React.ElementType; label: string }
//   > = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700/50",
//       icon: ShieldCheck,
//       label: "Verified",
//     },
//     rejected: {
//       color:
//         "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700/50",
//       icon: UserX,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color:
//         "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     not_started: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
//       icon: HelpCircle,
//       label: "Not Started",
//     },
//     unknown: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
//       icon: HelpCircle,
//       label: "Unknown",
//     }, // Fallback
//   };
//   return statusMap[status || "not_started"] || statusMap.unknown;
// };

// const getTransactionStatusColor = (status?: string | null): string => {
//   switch (status?.toLowerCase()) {
//     case "completed":
//       return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400 border-green-200 dark:border-green-600/30";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-600/30";
//     case "processing":
//     case "in progress":
//       return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 border-blue-200 dark:border-blue-600/30";
//     case "failed":
//       return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400 border-rose-200 dark:border-rose-600/30";
//     case "canceled":
//     case "cancelled":
//       return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400 border-red-200 dark:border-red-600/30";
//     default:
//       return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400 border-gray-200 dark:border-gray-600/30";
//   }
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .filter(Boolean)
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // --- DetailItem Component (Minor styling adjustments) ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
//   className = "",
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
//   className?: string;
// }) => (
//   <div className={cn("py-2 space-y-0.5", className)}>
//     {/* Reduced vertical padding slightly */}
//     <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
//       {Icon && (
//         <Icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />
//       )}
//       {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm min-h-[20px] break-words",
//         isImportant ? "font-semibold text-foreground" : "text-foreground/90"
//       )}
//     >
//       {value || <span className="italic text-muted-foreground/80">N/A</span>}
//     </dd>
//   </div>
// );

// // --- Loading Skeleton Component (Keep as is, fits the theme) ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 relative">
//     <div className="space-y-6 animate-pulse">
//       <div className="flex items-center gap-2 mb-4">
//         <Skeleton className="h-8 w-8 rounded-full bg-muted" />
//         {/* Slightly larger icon */}
//         <Skeleton className="h-5 w-36 bg-muted rounded" />
//       </div>
//       {/* Card Skeleton - Use background colors matching the non-shadowed style */}
//       <div className="border border-border rounded-lg bg-card overflow-hidden">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-border">
//           <Skeleton className="h-16 w-16 rounded-full flex-shrink-0 bg-muted" />
//           <div className="space-y-2 flex-1">
//             <Skeleton className="h-6 w-3/4 bg-muted rounded" />
//             <Skeleton className="h-4 w-1/2 bg-muted rounded" />
//             <Skeleton className="h-5 w-20 bg-muted rounded-md" />
//           </div>
//           <div className="space-y-1 text-right flex-shrink-0">
//             <Skeleton className="h-3 w-28 bg-muted rounded" />
//             <Skeleton className="h-3 w-24 bg-muted rounded" />
//             <Skeleton className="h-3 w-32 bg-muted rounded" />
//           </div>
//         </div>
//         <div className="p-4 sm:p-6 bg-muted/30 dark:bg-card">
//           {/* Match balance section bg */}
//           <Skeleton className="h-4 w-1/4 bg-muted rounded mb-3" />
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//             {[...Array(4)].map((_, i) => (
//               <Skeleton key={i} className="h-16 w-full bg-muted rounded-md" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Other Section Skeletons - Using border structure */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-1 space-y-6">
//           <div className="border border-border rounded-lg bg-card">
//             <div className="border-b border-border p-4">
//               <Skeleton className="h-6 w-1/2 bg-muted rounded" />
//             </div>
//             <div className="p-4 sm:p-6">
//               <Skeleton className="h-40 w-full bg-muted rounded-md" />
//             </div>
//           </div>
//           <div className="border border-border rounded-lg bg-card">
//             <div className="border-b border-border p-4">
//               <Skeleton className="h-6 w-1/3 bg-muted rounded" />
//             </div>
//             <div className="p-4 sm:p-6">
//               <Skeleton className="h-32 w-full bg-muted rounded-md" />
//             </div>
//           </div>
//         </div>
//         <div className="lg:col-span-2 space-y-6">
//           <div className="border border-border rounded-lg bg-card">
//             <div className="border-b border-border p-4">
//               <Skeleton className="h-6 w-1/4 bg-muted rounded" />
//             </div>
//             <div className="p-0">
//               <Skeleton className="h-48 w-full" />
//             </div>
//           </div>
//           <div className="border border-border rounded-lg bg-card">
//             <div className="border-b border-border p-4">
//               <Skeleton className="h-6 w-1/4 bg-muted rounded" />
//             </div>
//             <div className="p-0">
//               <Skeleton className="h-48 w-full" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component (Keep as is) ---
// const ErrorDisplay = ({
//   error,
//   onRetry,
// }: {
//   error: string | null;
//   onRetry: () => void;
// }) => (
//   <Alert variant="destructive" className="mt-6">
//     <AlertCircle className="h-4 w-4" />
//     <AlertTitle>Error Loading User Details</AlertTitle>
//     <AlertDescription>
//       {error || "An unexpected error occurred."}
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={onRetry}
//         className="mt-2 ml-auto block"
//       >
//         Retry
//       </Button>
//     </AlertDescription>
//   </Alert>
// );

// // --- Transaction Table Component (Add subtle borders, adjust padding) ---
// const TransactionTable = ({
//   data,
//   type,
// }: {
//   data: (Transfer | Payment)[];
//   type: "transfer" | "payment";
// }) => {
//   if (!data || data.length === 0) {
//     return (
//       <p className="text-sm text-muted-foreground text-center py-8 px-4">
//         No {type}s found for this user.
//       </p>
//     );
//   }

//   const isTransfer = (item: Transfer | Payment): item is Transfer =>
//     type === "transfer";

//   return (
//     <div className="overflow-x-auto">
//       <Table className="text-xs">
//         {/* Apply text-xs globally */}
//         <TableHeader className="bg-muted/50 dark:bg-muted/30">
//           <TableRow className="border-b-border">
//             <TableHead className="w-[100px] px-3 py-2 h-9">ID</TableHead>
//             {/* Reduced padding/height */}
//             {type === "transfer" && (
//               <TableHead className="px-3 py-2 h-9">Recipient</TableHead>
//             )}
//             <TableHead className="px-3 py-2 h-9">Amount</TableHead>
//             <TableHead className="px-3 py-2 h-9">Currency</TableHead>
//             <TableHead className="px-3 py-2 h-9">Status</TableHead>
//             <TableHead className="px-3 py-2 h-9">Date</TableHead>
//             <TableHead className="text-right px-3 py-2 h-9">Details</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.slice(0, 5).map((item) => {
//             const statusColor = getTransactionStatusColor(item.status);
//             const amount = isTransfer(item)
//               ? item.sendAmount
//               : (item as Payment).amountToAdd;
//             const currencyCode = isTransfer(item)
//               ? typeof item.sendCurrency === "object"
//                 ? item.sendCurrency?.code
//                 : "N/A"
//               : (item as Payment).payInCurrency?.code;
//             const recipientName = isTransfer(item)
//               ? item.recipient?.accountHolderName
//               : undefined;
//             const detailLink =
//               type === "transfer"
//                 ? `/admin/transfer/${item._id}`
//                 : `/admin/add-money`; // Maybe link to payment list for now

//             return (
//               <TableRow
//                 key={item._id}
//                 className="border-b-border hover:bg-muted/30 dark:hover:bg-muted/20"
//               >
//                 <TableCell className="px-3 py-2">
//                   {/* Reduced padding */}
//                   <TooltipProvider delayDuration={100}>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <span className="font-mono cursor-help underline decoration-dashed decoration-border">
//                           {item._id.substring(item._id.length - 6)}
//                         </span>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>{item._id}</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </TableCell>
//                 {type === "transfer" && (
//                   <TableCell className="max-w-[150px] truncate px-3 py-2">
//                     {recipientName || "N/A"}
//                   </TableCell>
//                 )}
//                 <TableCell className="font-medium px-3 py-2">
//                   {amount != null ? Number(amount).toFixed(2) : "N/A"}
//                 </TableCell>
//                 <TableCell className="px-3 py-2">
//                   {currencyCode || "N/A"}
//                 </TableCell>
//                 <TableCell className="px-3 py-2">
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       "text-[10px] capitalize px-1.5 py-0.5 border",
//                       statusColor
//                     )}
//                   >
//                     {/* Adjusted badge style/size */}
//                     {item.status || "Unknown"}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-3 py-2 whitespace-nowrap">
//                   {formatDate(item.createdAt, true)}
//                 </TableCell>
//                 <TableCell className="text-right px-3 py-2">
//                   <Button
//                     asChild
//                     variant="ghost"
//                     size="icon"
//                     className="h-6 w-6"
//                     title={`View ${type} details`}
//                   >
//                     {/* Smaller button */}
//                     <Link
//                       href={detailLink}
//                       rel="noopener noreferrer"
//                     >
//                       <ExternalLink className="h-3.5 w-3.5" />
//                     </Link>
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminUserDetailResponse | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetching Logic (Keep as is)
//   const fetchUserDetails = useCallback(async () => {
//     if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//       return;
//     }
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await userAdminService.getUserDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load user details.");
//       setUserData(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, isAdmin]);

//   useEffect(() => {
//     if (authLoading) return;

//     if (token && isAdmin) {
//       fetchUserDetails();
//     } else if (!token) {
//       router.push("/auth/login?message=login_required");
//     } else if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//     }
//   }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

//   // --- Render Logic ---
//   if (loading || authLoading)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <LoadingSkeleton />
//       </div>
//     );
//   if (error)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <ErrorDisplay error={error} onRetry={fetchUserDetails} />
//       </div>
//     );
//   if (!userData)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">
//         User data could not be loaded.
//       </div>
//     );

//   const { kyc, accounts, transfers, payments } = userData;
//   const kycStatusConfig = getKycStatusConfig(kyc?.status);

//   return (
//     // Use background for overall page, spacing handled by container/elements
//   <div className="container mx-auto px-4 py-8 relative">
//     <div className="pb-10">
//       <div className="space-y-6">
//         {/* Back Navigation */}
//         <Button
//           variant="outline"
//           size="sm"
//           className="gap-1.5 mb-4 h-8 px-3 bg-card hover:bg-muted"
//           onClick={() => router.push("/admin/users")} // Use onClick instead
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to User List
//         </Button>

//         {/* User Profile Card - Use border instead of shadow */}
//         <Card className="overflow-hidden border border-border bg-card shadow-none">
//           {/* Explicitly bg-card, no shadow */}
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-border">
//             {/* User Info */}
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 border-2 border-border">
//                 <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="space-y-0.5">
//                 <CardTitle className="text-lg sm:text-xl text-foreground">
//                   {userData.fullName}
//                 </CardTitle>
//                 <CardDescription className="text-sm text-muted-foreground">
//                   {userData.email}
//                 </CardDescription>
//                 <Badge
//                   variant={userData.role === "admin" ? "default" : "secondary"}
//                   className={cn(
//                     "mt-1.5 text-xs capitalize",
//                     userData.role === "admin"
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted text-muted-foreground"
//                   )}
//                 >
//                   {userData.role} Account
//                 </Badge>
//               </div>
//             </div>
//             {/* Meta Info */}
//             <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-muted-foreground flex-shrink-0 mt-2 sm:mt-0">
//               <span className="flex items-center gap-1.5">
//                 <CalendarDays className="h-3 w-3" /> Joined:
//                 {formatDate(userData.createdAt)}
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Clock className="h-3 w-3" /> Updated:
//                 {formatDate(userData.updatedAt)}
//               </span>
//               <TooltipProvider delayDuration={100}>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <span className="font-mono cursor-help underline decoration-dotted decoration-border">
//                       ID: {userData._id.substring(userData._id.length - 8)}
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent side="bottom">
//                     <p>{userData._id}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </CardHeader>
//           {/* Account Balances - Use subtle background difference */}
//           <CardContent className="p-4 sm:p-6 bg-muted/30 dark:bg-muted/20">
//             <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
//               <Wallet className="h-4 w-4" /> Account Balances
//             </h3>
//             {accounts && accounts.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                 {accounts.map((acc) => (
//                   <div
//                     key={acc._id}
//                     className="border border-border/70 rounded-md p-3 bg-card"
//                   >
//                     {/* Use card bg for contrast */}
//                     <div className="flex items-center justify-between mb-0.5">
//                       <span className="text-xs font-semibold text-foreground">
//                         {acc.currency?.code}
//                       </span>
//                       {/* Optional: Add a country flag if available */}
//                     </div>
//                     <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
//                       {acc.balance != null
//                         ? acc.balance.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })
//                         : "N/A"}
//                     </div>
//                     <div
//                       className="text-[11px] text-muted-foreground truncate"
//                       title={acc.currency?.currencyName ?? ""}
//                     >
//                       {acc.currency?.currencyName || "Unknown Currency"}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-muted-foreground italic py-2">
//                 No accounts found for this user.
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column (KYC + Documents) - Combine into one bordered block */}
//           <div className="lg:col-span-1 space-y-6">
//             <Card className="border border-border bg-card shadow-none">
//               {/* Single card for KYC + Docs */}
//               <CardHeader className="border-b border-border p-4">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-base font-semibold flex items-center gap-2">
//                     <UserCheck className="h-5 w-5 text-primary" /> KYC
//                     Information
//                   </CardTitle>
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       "text-xs capitalize px-2 py-0.5 font-medium border",
//                       kycStatusConfig.color
//                     )}
//                   >
//                     <kycStatusConfig.icon className="h-3 w-3 mr-1 flex-shrink-0" />
//                     {kycStatusConfig.label}
//                   </Badge>
//                 </div>
//                 {kyc?.status === "rejected" && kyc.rejectionReason && (
//                   <p className="text-xs text-destructive pt-2 mt-2 border-t border-destructive/20">
//                     <span className="font-medium">Rejection Reason:</span>
//                     {kyc.rejectionReason}
//                   </p>
//                 )}
//               </CardHeader>
//               <CardContent className="p-4 space-y-1">
//                 {/* Consistent padding */}
//                 {kyc ? (
//                   <>
//                     {/* Group personal details */}
//                     <DetailItem label="First Name" value={kyc.firstName} />
//                     <DetailItem label="Last Name" value={kyc.lastName} />
//                     <DetailItem
//                       label="Date of Birth"
//                       value={formatDate(kyc.dateOfBirth)}
//                       icon={CalendarDays}
//                     />
//                     <DetailItem
//                       label="Mobile"
//                       value={formatMobile(kyc.mobile)}
//                       icon={Phone}
//                     />
//                     <DetailItem
//                       label="Nationality"
//                       value={kyc.nationality}
//                       icon={Globe}
//                     />
//                     <DetailItem
//                       label="Occupation"
//                       value={kyc.occupation}
//                       icon={Briefcase}
//                     />
//                     <DetailItem
//                       label="Salary Range"
//                       value={
//                         kyc.salaryRange
//                           ? salaryDisplayMap[kyc.salaryRange]
//                           : undefined
//                       }
//                       icon={BadgeDollarSign}
//                     />
//                     <Separator className="my-3" /> {/* Use Separator */}
//                     {/* Group ID details */}
//                     <DetailItem
//                       label="ID Type"
//                       value={
//                         <span className="capitalize">
//                           {kyc.idType?.replace("_", " ")}
//                         </span>
//                       }
//                       icon={Fingerprint}
//                     />
//                     <DetailItem label="ID Number" value={kyc.idNumber} />
//                     <DetailItem
//                       label="ID Issue Date"
//                       value={formatDate(kyc.idIssueDate)}
//                       icon={CalendarDays}
//                     />
//                     <DetailItem
//                       label="ID Expiry Date"
//                       value={formatDate(kyc.idExpiryDate)}
//                       icon={CalendarDays}
//                     />
//                     <Separator className="my-3" /> {/* Use Separator */}
//                     {/* Group Timestamps */}
//                     <DetailItem
//                       label="Submitted At"
//                       value={formatDate(kyc.submittedAt, true)}
//                       icon={Clock}
//                     />
//                     <DetailItem
//                       label="Last Updated"
//                       value={formatDate(kyc.lastUpdatedAt, true)}
//                       icon={Clock}
//                     />
//                   </>
//                 ) : (
//                   <p className="text-sm text-muted-foreground italic py-4 text-center">
//                     KYC details not submitted.
//                   </p>
//                 )}
//               </CardContent>
//               {/* Documents Section (within the same card if they exist) */}
//               {kyc?.documents && kyc.documents.length > 0 && (
//                 <>
//                   <Separator className="mx-4" />
//                   {/* Separator before documents section */}
//                   <div className="p-4">
//                     {/* Padding for the documents section */}
//                     <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
//                       <FileText className="h-5 w-5 text-primary" /> Submitted
//                       Documents
//                     </h3>
//                     <div className="space-y-4">
//                       {kyc.documents.map((doc) => (
//                         <div
//                           key={doc.public_id}
//                           className="border border-border rounded-lg overflow-hidden bg-muted/30 dark:bg-muted/20"
//                         >
//                           <div className="p-2 border-b border-border bg-muted/60 dark:bg-muted/40">
//                             <h4 className="text-xs font-medium capitalize">
//                               {doc.docType.replace("_", " ")}
//                             </h4>
//                           </div>
//                           <div className="p-2 flex items-center justify-center aspect-video bg-background/50 dark:bg-muted/10 overflow-hidden relative group">
//                             {doc.url ? (
//                               <>
//                                 {doc.url.toLowerCase().endsWith(".pdf") ? (
//                                   <FileText className="h-12 w-12 text-muted-foreground/50" />
//                                 ) : (
//                                   <Image
//                                     src={doc.url}
//                                     alt={`${doc.docType} preview`}
//                                     fill
//                                     className="object-contain"
//                                     unoptimized
//                                   />
//                                 )}
//                                 <a
//                                   href={doc.url}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
//                                   aria-label={`View full ${doc.docType.replace(
//                                     "_",
//                                     " "
//                                   )} document`}
//                                 >
//                                   <Eye className="h-6 w-6 text-white" />
//                                 </a>
//                               </>
//                             ) : (
//                               <p className="text-xs text-muted-foreground italic">
//                                 No preview
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               )}
//             </Card>
//           </div>

//           {/* Right Column (Transactions) - Use border instead of shadow */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card className="border border-border bg-card shadow-none">
//               <CardHeader className="p-4 border-b border-border">
//                 <CardTitle className="text-base font-semibold flex items-center gap-2">
//                   <Send className="h-5 w-5 text-primary" /> Recent Transfers
//                 </CardTitle>
//                 <CardDescription className="text-xs !mt-1">
//                   Last 5 transfers initiated by this user.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-0">
//                 {/* Remove padding to let table fill */}
//                 <TransactionTable data={transfers} type="transfer" />
//               </CardContent>
//             </Card>

//             <Card className="border border-border bg-card shadow-none">
//               <CardHeader className="p-4 border-b border-border">
//                 <CardTitle className="text-base font-semibold flex items-center gap-2">
//                   <Landmark className="h-5 w-5 text-primary" /> Recent Payments
//                   (Add Money)
//                 </CardTitle>
//                 <CardDescription className="text-xs !mt-1">
//                   Last 5 payment attempts by this user.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-0">
//                 {/* Remove padding */}
//                 <TransactionTable data={payments} type="payment" />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default UserDetailPage;

// // frontend/src/app/admin/users/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import userAdminService from "../../../services/admin/user.admin";
// // Import specific types needed
// import type { AdminUserDetailResponse } from "../../../services/admin/user.admin";
// import type { KycMobile, KycStatus } from "../../../services/kyc";
// import type { Payment } from "@/types/payment";
// import type { Transfer } from "@/types/transfer";
// import { useAuth } from "../../../contexts/AuthContext";

// // Components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator";
// // --- NEW: Import Tabs components ---
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";

// // Icons
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   ShieldCheck,
//   CalendarDays,
//   Phone,
//   Briefcase,
//   UserCheck,
//   UserX,
//   HelpCircle,
//   BadgeDollarSign,
//   Fingerprint,
//   Globe,
//   FileText,
//   AlertCircle,
//   Info,
//   Workflow,
//   ExternalLink,
//   Eye,
//   Wallet,
//   Send,
//   Download,
//   Landmark,
//   Clock,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Helper Functions (Keep as they are - No changes needed) ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//   const statusMap: Record<
//     KycStatus | "unknown",
//     { color: string; icon: React.ElementType; label: string }
//   > = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700/50",
//       icon: ShieldCheck,
//       label: "Verified",
//     },
//     rejected: {
//       color:
//         "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700/50",
//       icon: UserX,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color:
//         "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",
//       icon: ArrowLeft, // Changed from HelpCircle to fit "skipped" better
//       label: "Skipped",
//     },
//     not_started: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
//       icon: HelpCircle,
//       label: "Not Started",
//     },
//     unknown: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
//       icon: HelpCircle,
//       label: "Unknown",
//     }, // Fallback
//   };
//   return statusMap[status || "not_started"] || statusMap.unknown;
// };

// const getTransactionStatusColor = (status?: string | null): string => {
//   switch (status?.toLowerCase()) {
//     case "completed":
//       return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400 border-green-200 dark:border-green-600/30";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-600/30";
//     case "processing":
//     case "in progress":
//       return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 border-blue-200 dark:border-blue-600/30";
//     case "failed":
//       return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400 border-rose-200 dark:border-rose-600/30";
//     case "canceled":
//     case "cancelled":
//       return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400 border-red-200 dark:border-red-600/30";
//     default:
//       return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400 border-gray-200 dark:border-gray-600/30";
//   }
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .filter(Boolean)
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // --- DetailItem Component (Keep as is) ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
//   className = "",
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
//   className?: string;
// }) => (
//   <div className={cn("py-2 space-y-2", className)}>
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
//       {Icon && (
//         <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
//       )}
//       {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm  break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">N/A</span>}
//     </dd>
//   </div>
// );

// // --- Loading Skeleton Component (Keep as is - already adapted to border style) ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 relative">
//     <div className="space-y-6 animate-pulse">
//       <div className="flex items-center gap-2 mb-4">
//         <Skeleton className="h-8 w-8 rounded-full bg-muted" />
//         <Skeleton className="h-5 w-36 bg-muted rounded" />
//       </div>
//       {/* Main Profile Card Skeleton */}
//       <div className="border border-border rounded-lg bg-card overflow-hidden">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-border">
//           <Skeleton className="h-16 w-16 rounded-full flex-shrink-0 bg-muted" />
//           <div className="space-y-2 flex-1">
//             <Skeleton className="h-6 w-3/4 bg-muted rounded" />
//             <Skeleton className="h-4 w-1/2 bg-muted rounded" />
//             <Skeleton className="h-5 w-20 bg-muted rounded-md" />
//           </div>
//           <div className="space-y-1 text-right flex-shrink-0">
//             <Skeleton className="h-3 w-28 bg-muted rounded" />
//             <Skeleton className="h-3 w-24 bg-muted rounded" />
//             <Skeleton className="h-3 w-32 bg-muted rounded" />
//           </div>
//         </div>
//         <div className="p-4 sm:p-6 bg-muted/30 dark:bg-card">
//           <Skeleton className="h-4 w-1/4 bg-muted rounded mb-3" />
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//             {[...Array(4)].map((_, i) => (
//               <Skeleton key={i} className="h-16 w-full bg-muted rounded-md" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tab Skeleton */}
//       <div className="space-y-4">
//         <div className="flex space-x-1 rounded-md bg-muted p-1 w-full">
//           <Skeleton className="h-9 w-1/3 rounded-sm flex-1 bg-background" />
//           <Skeleton className="h-9 w-1/3 rounded-sm flex-1 bg-background" />
//           <Skeleton className="h-9 w-1/3 rounded-sm flex-1 bg-background" />
//         </div>
//         <div className="border border-border rounded-lg bg-card p-4 sm:p-6">
//            <Skeleton className="h-40 w-full bg-muted rounded-md" />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component (Keep as is) ---
// const ErrorDisplay = ({
//   error,
//   onRetry,
// }: {
//   error: string | null;
//   onRetry: () => void;
// }) => (
//   <Alert variant="destructive" className="mt-6">
//     <AlertCircle className="h-4 w-4" />
//     <AlertTitle>Error Loading User Details</AlertTitle>
//     <AlertDescription>
//       {error || "An unexpected error occurred."}
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={onRetry}
//         className="mt-2 ml-auto block"
//       >
//         Retry
//       </Button>
//     </AlertDescription>
//   </Alert>
// );

// // --- Transaction Table Component ---
// const TransactionTable = ({
//   data,
//   type,
// }: {
//   data: (Transfer | Payment)[];
//   type: "transfer" | "payment";
// }) => {
//   if (!data || data.length === 0) {
//     return (
//       <p className="text-sm text-muted-foreground text-center py-8 px-4">
//         No {type}s found for this user.
//       </p>
//     );
//   }

//   const isTransfer = (item: Transfer | Payment): item is Transfer =>
//     type === "transfer";

//   return (
//     <div className="overflow-x-auto">
//       <Table className="text-base">
//         <TableHeader className="bg-muted/50 dark:bg-muted/30">
//           <TableRow className="border-b-border">
//             <TableHead className="w-[100px] px-3 py-2 h-9">ID</TableHead>
//             {type === "transfer" && (
//               <TableHead className="px-3 py-2 h-9">Recipient</TableHead>
//             )}
//             <TableHead className="px-3 py-2 h-9">Amount</TableHead>
//             <TableHead className="px-3 py-2 h-9">Currency</TableHead>
//             <TableHead className="px-3 py-2 h-9">Status</TableHead>
//             <TableHead className="px-3 py-2 h-9">Date</TableHead>
//             <TableHead className="text-right px-3 py-2 h-9">Details</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.slice(0, 5).map((item) => {
//             const statusColor = getTransactionStatusColor(item.status);
//             const amount = isTransfer(item)
//               ? item.sendAmount
//               : (item as Payment).amountToAdd;
//             const currencyCode = isTransfer(item)
//               ? typeof item.sendCurrency === "object"
//                 ? item.sendCurrency?.code
//                 : "N/A"
//               : (item as Payment).payInCurrency?.code;
//             const recipientName = isTransfer(item)
//               ? item.recipient?.accountHolderName
//               : undefined;
//             const detailLink =
//               type === "transfer"
//                 ? `/admin/transfer/${item._id}`
//                 : `/admin/add-money`; // Maybe link to payment list for now

//             return (
//               <TableRow
//                 key={item._id}
//                 className="border-b-border hover:bg-muted/30 dark:hover:bg-muted/20"
//               >
//                 <TableCell className="px-3 py-2">
//                   <TooltipProvider delayDuration={100}>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <span className="font-mono cursor-help underline decoration-dashed decoration-border">
//                           {item._id.substring(item._id.length - 6)}
//                         </span>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>{item._id}</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </TableCell>
//                 {type === "transfer" && (
//                   <TableCell className="max-w-[150px] truncate px-3 py-2">
//                     {recipientName || "N/A"}
//                   </TableCell>
//                 )}
//                 <TableCell className="font-medium px-3 py-2">
//                   {amount != null ? Number(amount).toFixed(2) : "N/A"}
//                 </TableCell>
//                 <TableCell className="px-3 py-2">
//                   {currencyCode || "N/A"}
//                 </TableCell>
//                 <TableCell className="px-3 py-2">
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       "text-[10px] capitalize px-1.5 py-0.5 border",
//                       statusColor
//                     )}
//                   >
//                     {item.status || "Unknown"}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-3 py-2 whitespace-nowrap">
//                   {formatDate(item.createdAt, true)}
//                 </TableCell>
//                 <TableCell className="text-right px-3 py-2">
//                   <Button
//                     asChild
//                     variant="ghost"
//                     size="icon"
//                     className="h-6 w-6"
//                     title={`View ${type} details`}
//                   >
//                     <Link
//                       href={detailLink}
//                       rel="noopener noreferrer"
//                     >
//                       <ExternalLink className="h-3.5 w-3.5" />
//                     </Link>
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminUserDetailResponse | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetching Logic (Keep as is)
//   const fetchUserDetails = useCallback(async () => {
//     if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//       return;
//     }
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await userAdminService.getUserDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load user details.");
//       setUserData(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, isAdmin]);

//   useEffect(() => {
//     if (authLoading) return;

//     if (token && isAdmin) {
//       fetchUserDetails();
//     } else if (!token) {
//       router.push("/auth/login?message=login_required");
//     } else if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//     }
//   }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

//   // --- Render Logic ---
//   if (loading || authLoading)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <LoadingSkeleton />
//       </div>
//     );
//   if (error)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <ErrorDisplay error={error} onRetry={fetchUserDetails} />
//       </div>
//     );
//   if (!userData)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">
//         User data could not be loaded.
//       </div>
//     );

//   const { kyc, accounts, transfers, payments } = userData;
//   const kycStatusConfig = getKycStatusConfig(kyc?.status);

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6 pb-10">
//         {" "}
//         {/* Added space-y-6 for spacing */}
//         {/* Back Navigation */}
//         <Button
//           variant="outline"
//           size="sm"
//           className="gap-1.5 h-8 px-3 bg-card hover:bg-muted" // Removed mb-4, handled by parent space-y
//           onClick={() => router.push("/admin/users")}
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to User List
//         </Button>
//         {/* User Profile Card - Remains the same */}
//         <Card className="overflow-hidden border border-border bg-card shadow-none">
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-border">
//             {/* User Info */}
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 border-2 border-border">
//                 <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="space-y-0.5">
//                 <CardTitle className="text-lg sm:text-xl text-foreground">
//                   {userData.fullName}
//                 </CardTitle>
//                 <CardDescription className="text-sm text-muted-foreground">
//                   {userData.email}
//                 </CardDescription>
//                 <Badge
//                   variant={userData.role === "admin" ? "default" : "secondary"}
//                   className={cn(
//                     "mt-1.5 text-xs capitalize",
//                     userData.role === "admin"
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted text-muted-foreground"
//                   )}
//                 >
//                   {userData.role} Account
//                 </Badge>
//               </div>
//             </div>
//             {/* Meta Info */}
//             <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-muted-foreground flex-shrink-0 mt-2 sm:mt-0">
//               <span className="flex items-center gap-1.5">
//                 <CalendarDays className="h-3 w-3" /> Joined:
//                 {formatDate(userData.createdAt)}
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Clock className="h-3 w-3" /> Updated:
//                 {formatDate(userData.updatedAt)}
//               </span>
//               <TooltipProvider delayDuration={100}>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <span className="font-mono cursor-help underline decoration-dotted decoration-border">
//                       ID: {userData._id.substring(userData._id.length - 8)}
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent side="bottom">
//                     <p>{userData._id}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </CardHeader>
//           {/* Account Balances */}
//           <CardContent className="p-4 sm:p-6 bg-muted/30 dark:bg-muted/20">
//             <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
//               <Wallet className="h-4 w-4" /> Account Balances
//             </h3>
//             {accounts && accounts.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                 {accounts.map((acc) => (
//                   <div
//                     key={acc._id}
//                     className="border border-border/70 rounded-md p-3 bg-card"
//                   >
//                     <div className="flex items-center justify-between mb-0.5">
//                       <span className="text-xs font-semibold text-foreground">
//                         {acc.currency?.code}
//                       </span>
//                     </div>
//                     <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
//                       {acc.balance != null
//                         ? acc.balance.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })
//                         : "N/A"}
//                     </div>
//                     <div
//                       className="text-[11px] text-muted-foreground truncate"
//                       title={acc.currency?.currencyName ?? ""}
//                     >
//                       {acc.currency?.currencyName || "Unknown Currency"}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-muted-foreground italic py-2">
//                 No accounts found for this user.
//               </p>
//             )}
//           </CardContent>
//         </Card>
//         {/* --- NEW: Tabs Section --- */}
//         <Tabs defaultValue="kyc" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 h-11 mb-4">
//             {" "}
//             {/* Adjusted height and added mb */}
//             <TabsTrigger
//               value="kyc"
//               className="gap-1.5 text-xs sm:text-sm text-neutral-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:text-primary cursor-pointer"
//             >
//               <UserCheck className="h-4 w-4" />
//               KYC & Documents
//             </TabsTrigger>
//             <TabsTrigger
//               value="transfers"
//               className="gap-1.5 text-xs sm:text-sm text-neutral-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:text-primary cursor-pointer"
//             >
//               <Send className="h-4 w-4" />
//               Transfers (Send)
//             </TabsTrigger>
//             <TabsTrigger
//               value="payments"
//               className="gap-1.5 text-xs sm:text-sm text-neutral-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:text-primary cursor-pointer"
//             >
//               <Landmark className="h-4 w-4" />
//               Payments (Add)
//             </TabsTrigger>
//           </TabsList>

//           {/* KYC Information Tab Content */}
//           <TabsContent value="kyc">
//             <Card className="border overflow-hidden mb-4">
//               <CardHeader className="border-b border-border px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                     <UserCheck className="h-5 w-5 text-primary" /> KYC
//                     Information
//                   </CardTitle>
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       "text-sm capitalize px-4 py-2 font-medium border",
//                       kycStatusConfig.color
//                     )}
//                   >
//                     <kycStatusConfig.icon className="h-4 w-4 mr-1 flex-shrink-0" />
//                     {kycStatusConfig.label}
//                   </Badge>
//                 </div>
//                 {kyc?.status === "rejected" && kyc.rejectionReason && (
//                   <p className="text-xs text-destructive pt-2 mt-2 border-t border-destructive/20">
//                     <span className="font-medium">Rejection Reason:</span>{" "}
//                     {kyc.rejectionReason}
//                   </p>
//                 )}
//               </CardHeader>
//               <CardContent>
//                 {kyc ? (
//                   <>
//                     <div className="p-4">
//                       <h4 className="border-b pb-2 mb-2 font-medium text-neutral-900 dark:text-white">Personal Details</h4>
//                       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                         <DetailItem label="First Name" value={kyc.firstName} />
//                         <DetailItem label="Last Name" value={kyc.lastName} />
//                         <DetailItem
//                           label="Date of Birth"
//                           value={formatDate(kyc.dateOfBirth)}
//                           icon={CalendarDays}
//                         />
//                         <DetailItem
//                           label="Mobile"
//                           value={formatMobile(kyc.mobile)}
//                           icon={Phone}
//                         />
//                         <DetailItem
//                           label="Nationality"
//                           value={kyc.nationality}
//                           icon={Globe}
//                         />
//                         <DetailItem
//                           label="Occupation"
//                           value={kyc.occupation}
//                           icon={Briefcase}
//                         />
//                         <DetailItem
//                           label="Salary Range"
//                           value={
//                             kyc.salaryRange
//                               ? salaryDisplayMap[kyc.salaryRange]
//                               : undefined
//                           }
//                           icon={BadgeDollarSign}
//                         />
//                       </div>
//                     </div>

//                     <div className="p-4">
//                       <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">Identification Details</h4>
//                       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                         <DetailItem
//                           label="ID Type"
//                           value={
//                             <span className="capitalize">
//                               {kyc.idType?.replace("_", " ")}
//                             </span>
//                           }
//                           icon={Fingerprint}
//                         />
//                         <DetailItem label="ID Number" value={kyc.idNumber} />
//                         <DetailItem
//                           label="ID Issue Date"
//                           value={formatDate(kyc.idIssueDate)}
//                           icon={CalendarDays}
//                         />
//                         <DetailItem
//                           label="ID Expiry Date"
//                           value={formatDate(kyc.idExpiryDate)}
//                           icon={CalendarDays}
//                         />
//                       </div>
//                     </div>

//                     <div className="p-4">
//                       <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">Updating Information</h4>
//                       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                         <DetailItem
//                           label="Submitted At"
//                           value={formatDate(kyc.submittedAt, true)}
//                           icon={Clock}
//                         />
//                         <DetailItem
//                           label="Last Updated"
//                           value={formatDate(kyc.lastUpdatedAt, true)}
//                           icon={Clock}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <p className="text-sm text-muted-foreground italic py-4 text-center">
//                     KYC details not submitted.
//                   </p>
//                 )}
//               </CardContent>
//             </Card>
//             <Card className="border overflow-hidden mb-4">
//               <CardHeader className="border-b border-border px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                 <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                   <FileText className="h-5 w-5 text-primary" /> Submitted
//                   Documents
//                 </CardTitle>
//               </CardHeader>
//               {/* Documents Section */}
//               {kyc?.documents && kyc.documents.length > 0 && (
//                 <div className="p-4">
//                   <div className="flex md:flex-row flex-col gap-4">
//                     {kyc.documents.map((doc) => (
//                       <div
//                         key={doc.public_id}
//                         className="border border-border rounded-lg overflow-hidden bg-muted/30 dark:bg-muted/20 md:w-1/2 w-full"
//                       >
//                         <div className="p-3 border-b border-border text-neutral-900 dark:text-white">
//                           <h4 className="text-sm font-medium capitalize">
//                             {doc.docType.replace("_", " ")}
//                           </h4>
//                         </div>
//                         <div className="p-2 flex items-center justify-center aspect-video bg-white dark:bg-background overflow-hidden relative group">
//                           {doc.url ? (
//                             <>
//                               {doc.url.toLowerCase().endsWith(".pdf") ? (
//                                 <FileText className="h-12 w-12 text-gray-500 dark:text-gray-300" />
//                               ) : (
//                                 <Image
//                                   src={doc.url}
//                                   alt={`${doc.docType} preview`}
//                                   fill
//                                   className="object-contain"
//                                   unoptimized
//                                 />
//                               )}
//                               <a
//                                 href={doc.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="absolute inset-0 bg-black/50 dark:bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
//                                 aria-label={`View full ${doc.docType.replace(
//                                   "_",
//                                   " "
//                                 )} document`}
//                               >
//                                 <Eye className="h-6 w-6 text-white" />
//                               </a>
//                             </>
//                           ) : (
//                             <p className="text-xs text-gray-500 dark:text-gray-300 italic">
//                               No preview
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </Card>
//           </TabsContent>

//           {/* Recent Transfers Tab Content */}
//           <TabsContent value="transfers">
//             <Card className="border border-border bg-card shadow-none">
//               <CardHeader className="p-4 border-b border-border">
//                 <CardTitle className="text-base font-semibold flex items-center gap-2">
//                   <Send className="h-5 w-5 text-primary" /> Recent Transfers
//                   (Send Money)
//                 </CardTitle>
//                 <CardDescription className="text-xs !mt-1">
//                   Last 5 transfers initiated by this user.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <TransactionTable data={transfers} type="transfer" />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Recent Payments Tab Content */}
//           <TabsContent value="payments">
//             <Card className="border border-border bg-card shadow-none">
//               <CardHeader className="p-4 border-b border-border">
//                 <CardTitle className="text-base font-semibold flex items-center gap-2">
//                   <Landmark className="h-5 w-5 text-primary" /> Recent Payments
//                   (Add Money)
//                 </CardTitle>
//                 <CardDescription className="text-xs !mt-1">
//                   Last 5 payment attempts by this user.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <TransactionTable data={payments} type="payment" />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default UserDetailPage;

// // frontend/src/app/admin/users/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion"; // Import motion

// import userAdminService from "../../../services/admin/user.admin";
// // Import specific types needed from the service
// import type { AdminUserDetailResponse as OriginalAdminUserDetailResponse } from "../../../services/admin/user.admin";
// import type { KycMobile, KycStatus } from "../../../services/kyc";
// import type { Payment } from "@/types/payment";

// // --- Define Local Transfer type used WITHIN UserDetailPage ---
// interface Transfer {
//   _id: string;
//   user?: {
//     _id?: string;
//     fullName?: string;
//     email?: string;
//   };
//   recipient?: {
//     _id?: string;
//     accountHolderName?: string;
//   };
//   sendAmount: string;
//   sendCurrency?: {
//     code?: string;
//   };
//   status: string;
//   createdAt: string;
// }

// // --- Define Local State Type based on Service Response but with modified Transfer type ---
// interface UserDetailState extends Omit<OriginalAdminUserDetailResponse, 'transfers'> {
//   transfers: Transfer[];
// }

// import { useAuth } from "../../../contexts/AuthContext";

// // Components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Icons
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   ShieldCheck,
//   CalendarDays,
//   ChevronRight,
//   Phone,
//   Briefcase,
//   UserCheck,
//   UserX,
//   HelpCircle,
//   BadgeDollarSign,
//   Fingerprint,
//   Globe,
//   FileText,
//   AlertCircle,
//   Eye,
//   Wallet,
//   Send,
//   Landmark,
//   Clock,
//   Copy,
//   Check,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Helper Functions (Keep as they are) ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//   const statusMap: Record<
//     KycStatus | "unknown",
//     { color: string; icon: React.ElementType; label: string }
//   > = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700/50",
//       icon: ShieldCheck,
//       label: "Verified",
//     },
//     rejected: {
//       color:
//         "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700/50",
//       icon: UserX,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color:
//         "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     not_started: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
//       icon: HelpCircle,
//       label: "Not Started",
//     },
//     unknown: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
//       icon: HelpCircle,
//       label: "Unknown",
//     },
//   };
//   return statusMap[status || "not_started"] || statusMap.unknown;
// };

// const getTransactionStatusColorClasses = (status?: string | null): string => {
//   switch (status?.toLowerCase()) {
//     case "completed":
//     case "credited":
//       return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "processing":
//     case "in progress":
//       return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     case "failed":
//       return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//     case "canceled":
//     case "cancelled":
//       return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//     default:
//       return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .filter(Boolean)
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // --- DetailItem Component (Keep as is) ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
//   className = "",
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
//   className?: string;
// }) => (
//   <div className={cn("py-2 space-y-2", className)}>
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
//       {Icon && <Icon className="h-4 w-4 flex-shrink-0 text-primary" />}
//       {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">N/A</span>}
//     </dd>
//   </div>
// );

// // --- Loading Skeleton Component (Detailed) ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8"> {/* Added container */}
//     <div className="space-y-6 pb-10">
//       {/* Header Skeleton */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <Skeleton className="h-4 w-64 mb-3 rounded " /> {/* Breadcrumbs */}
//           <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//         </div>
//         <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}
//       </div>

//       {/* User Profile Card Skeleton */}
//       <div className="border rounded-lg bg-card overflow-hidden"> {/* Mimic Card */}
//         {/* Mimic CardHeader */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//           <div className="flex items-center gap-4 flex-1">
//             <Skeleton className="h-14 w-14 sm:h-16 sm:w-16 rounded-full flex-shrink-0 " /> {/* Avatar */}
//             <div className="space-y-1.5 flex-1">
//               <Skeleton className="h-6 w-3/4  rounded" /> {/* Name */}
//               <Skeleton className="h-4 w-1/2  rounded" /> {/* Email */}
//               <Skeleton className="h-5 w-20  rounded-md" /> {/* Role Badge */}
//             </div>
//           </div>
//           <div className="space-y-1 text-right flex-shrink-0">
//             <Skeleton className="h-3 w-28  rounded" /> {/* Joined Date */}
//             <Skeleton className="h-3 w-24  rounded" /> {/* Updated Date */}
//             <Skeleton className="h-3 w-32  rounded" /> {/* ID */}
//           </div>
//         </div>

//         {/* Mimic CardContent for Balances */}
//         <div className="p-4 sm:p-6">
//           <Skeleton className="h-5 w-1/4  rounded mb-4" /> {/* Balances Title */}
//           <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
//             {[...Array(4)].map((_, i) => ( // Simulate 4 balance boxes
//               <Skeleton key={i} className="flex-shrink-0 w-36 sm:w-auto h-24  rounded-lg border" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tabs Section Skeleton */}
//       <div className="w-full">
//         {/* Mimic TabsList */}
//         <div className="overflow-hidden mb-4">
//             <div className="relative flex w-full h-full overflow-x-auto whitespace-nowrap bg-lightborder dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//                 <Skeleton className="h-9 flex-1 rounded-full bg-white dark:bg-secondarybox mr-1" />
//                 <Skeleton className="h-9 flex-1 rounded-full bg-white dark:bg-secondarybox mr-1" />
//                 <Skeleton className="h-9 flex-1 rounded-full bg-white dark:bg-secondarybox" />
//             </div>
//         </div>

//         {/* Mimic TabsContent (showing KYC content skeleton by default) */}
//         <div className="space-y-4">
//           {/* KYC Info Card Skeleton */}
//           <div className="border rounded-lg bg-card overflow-hidden"> {/* Mimic Card */}
//             {/* Mimic CardHeader */}
//             <div className="border-b px-6 py-4 bg-lightgray dark:bg-primarybox">
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-6 w-40  rounded" /> {/* Title */}
//                 <Skeleton className="h-7 w-24  rounded-full" /> {/* Status Badge */}
//               </div>
//             </div>
//             {/* Mimic CardContent */}
//             <div className="p-4 sm:p-6 space-y-4">
//                 {/* Personal Details Section Skeleton */}
//                 <div>
//                     <Skeleton className="h-4 w-32  rounded mb-3 border-b border-transparent pb-2" /> {/* Section Title */}
//                     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                         {[...Array(6)].map((_, i) => ( // 6 personal details
//                             <div key={`pd-skel-${i}`} className="py-2 space-y-2">
//                                 <Skeleton className="h-4 w-1/3  rounded" /> {/* Label */}
//                                 <Skeleton className="h-5 w-3/4  rounded" /> {/* Value */}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                  {/* Identification Details Section Skeleton */}
//                 <div>
//                     <Skeleton className="h-4 w-40  rounded mb-3 border-b border-transparent pb-2" /> {/* Section Title */}
//                     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                         {[...Array(4)].map((_, i) => ( // 4 ID details
//                             <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                                 <Skeleton className="h-4 w-1/3  rounded" /> {/* Label */}
//                                 <Skeleton className="h-5 w-3/4  rounded" /> {/* Value */}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                  {/* Update Info Section Skeleton */}
//                  <div>
//                     <Skeleton className="h-4 w-48  rounded mb-3 border-b border-transparent pb-2" /> {/* Section Title */}
//                     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                         {[...Array(2)].map((_, i) => ( // 2 Update details
//                             <div key={`upd-skel-${i}`} className="py-2 space-y-2">
//                                 <Skeleton className="h-4 w-1/3  rounded" /> {/* Label */}
//                                 <Skeleton className="h-5 w-3/4  rounded" /> {/* Value */}
//                             </div>
//                         ))}
//                     </div>
//                  </div>
//             </div>
//           </div>

//           {/* Documents Card Skeleton */}
//           <div className="border rounded-lg bg-card overflow-hidden"> {/* Mimic Card */}
//             {/* Mimic CardHeader */}
//             <div className="border-b px-6 py-4 bg-lightgray dark:bg-primarybox">
//               <Skeleton className="h-6 w-44  rounded" /> {/* Title */}
//             </div>
//             {/* Mimic CardContent */}
//             <div className="p-4 sm:p-6">
//               <div className="flex md:flex-row flex-col gap-4">
//                  {/* Simulate 2 document skeletons */}
//                  <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
//                     <div className="p-3 border-b"><Skeleton className="h-4 w-1/3  rounded"/></div>
//                     <Skeleton className="aspect-video w-full " />
//                  </div>
//                  <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
//                     <div className="p-3 border-b"><Skeleton className="h-4 w-1/3  rounded"/></div>
//                     <Skeleton className="aspect-video w-full " />
//                  </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component (Keep as is) ---
// const ErrorDisplay = ({
//   error,
//   onRetry,
// }: {
//   error: string | null;
//   onRetry: () => void;
// }) => (
//   <Alert variant="destructive" className="mt-6">
//     <AlertCircle className="h-4 w-4" />
//     <AlertTitle>Error Loading User Details</AlertTitle>
//     <AlertDescription>
//       {error || "An unexpected error occurred."}
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={onRetry}
//         className="mt-2 ml-auto block"
//       >
//         Retry
//       </Button>
//     </AlertDescription>
//   </Alert>
// );

// // --- Transaction Table Component (Keep as is) ---
// const TransactionTable = ({
//   data,
//   type,
// }: {
//   data: (Transfer | Payment)[];
//   type: "transfer" | "payment";
// }) => {
//   const isTransfer = (item: Transfer | Payment): item is Transfer =>
//     type === "transfer";

//   const [copiedId, setCopiedId] = useState<string | null>(null);

//   const handleCopy = (idToCopy: string) => {
//     navigator.clipboard.writeText(idToCopy).then(
//       () => {
//         setCopiedId(idToCopy);
//         setTimeout(() => setCopiedId(null), 1500);
//       },
//       (err) => {
//         console.error("Failed to copy ID: ", err);
//         // Consider a more user-friendly error feedback (e.g., toast)
//         alert("Failed to copy ID to clipboard.");
//       }
//     );
//   };

//   const numberOfColumns = type === "transfer" ? 7 : 6;

//   return (
//     <div className="rounded-xl border overflow-hidden overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//       <table className="min-w-full overflow-hidden">
//         <thead className="bg-lightgray dark:bg-primarybox ">
//           <tr className="border-b">
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               ID
//             </th>
//             {type === "transfer" && (
//               <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//                 Recipient
//               </th>
//             )}
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Amount
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Currency
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Status
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Date
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Details
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y overflow-hidden">
//           {!data || data.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={numberOfColumns}
//                 className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//               >
//                 No {type}s found for this user.
//               </td>
//             </tr>
//           ) : (
//             data.slice(0, 5).map((item) => {
//               const statusColorClasses = getTransactionStatusColorClasses(
//                 item.status
//               );
//               const amountValue = isTransfer(item)
//                 ? item.sendAmount
//                 : String((item as Payment).amountToAdd ?? "0");

//               const formattedAmount =
//                 amountValue != null
//                   ? Number(amountValue).toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })
//                   : "N/A";

//               const currencyCode = isTransfer(item)
//                 ? item.sendCurrency?.code
//                 : (item as Payment).payInCurrency?.code;

//               const recipientName = isTransfer(item)
//                 ? item.recipient?.accountHolderName
//                 : undefined;

//               const detailLink =
//                 type === "transfer"
//                   ? `/admin/transfer/${item._id}`
//                   : `/admin/add-money`; // TODO: Update payment link if specific detail page exists

//               const isCopied = copiedId === item._id;

//               return (
//                 <tr key={item._id}>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     <div className="flex items-center gap-1.5">
//                       <span className="underline decoration-dashed decoration-border cursor-default">
//                         {item._id.substring(item._id.length - 6)}
//                       </span>
//                       <TooltipProvider delayDuration={100}>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className={cn(
//                                 "h-5 w-5 p-0 text-muted-foreground hover:text-foreground transition-colors",
//                                 isCopied && "text-green-500 hover:text-green-600"
//                               )}
//                               onClick={() => handleCopy(item._id)}
//                               aria-label={isCopied ? "Copied!" : "Copy transaction ID"}
//                             >
//                               {isCopied ? (
//                                 <Check className="h-3.5 w-3.5" />
//                               ) : (
//                                 <Copy className="h-3.5 w-3.5" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent side="top">
//                             <p>{isCopied ? "Copied!" : "Copy ID"}</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </td>
//                   {type === "transfer" && (
//                     <td className="px-4 py-3 whitespace-nowrap font-medium capitalize text-neutral-900 dark:text-white">
//                       {recipientName || "N/A"}
//                     </td>
//                   )}
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {formattedAmount}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {currencyCode || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={cn(
//                         "inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize",
//                         statusColorClasses
//                       )}
//                     >
//                       {item.status || "Unknown"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium">
//                     {formatDate(item.createdAt, true)}
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap ">
//                     <Button
//                       asChild
//                       className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
//                       title={`View ${type} details`}
//                     >
//                       <Link href={detailLink}>
//                         <span>View Details</span>
//                       </Link>
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<UserDetailState | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("kyc"); // State to track active tab for Framer Motion

//   // Fetching Logic
//   const fetchUserDetails = useCallback(async () => {
//     // Removed isAdmin check here as it's done in useEffect
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const data: OriginalAdminUserDetailResponse = await userAdminService.getUserDetailsAdmin(userId);

//       const processedData: UserDetailState = {
//         ...data,
//         transfers: data.transfers.map((t) => ({
//           _id: t._id,
//           user: t.user,
//           recipient: t.recipient,
//           sendAmount: String(t.sendAmount ?? "0"),
//           sendCurrency: t.sendCurrency,
//           status: t.status,
//           createdAt: t.createdAt,
//         })),
//         payments: data.payments.map(p => ({ ...p })) // Simple spread for payments
//       };

//       setUserData(processedData);

//     } catch (err: any) {
//       console.error("Fetch user details error:", err); // Log the actual error
//       setError(
//         err.response?.data?.message || err.message || "Failed to load user details."
//       );
//       setUserData(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]); // Removed isAdmin from dependency as it's checked before calling

//   useEffect(() => {
//     if (authLoading) return;

//     if (!token) {
//       router.push("/auth/login?message=login_required");
//     } else if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//     } else {
//       fetchUserDetails();
//     }
//   }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]); // fetchUserDetails added

//   // --- Render Logic ---
//   if (loading || authLoading)
//     return (
//       <div className="min-h-screen bg-white dark:bg-background p-4 sm:p-6 lg:p-8">
//         <LoadingSkeleton />
//       </div>
//     );
//   if (error)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <ErrorDisplay error={error} onRetry={fetchUserDetails} />
//       </div>
//     );
//   if (!userData)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">
//         User data could not be loaded or found. Please try again or check the user ID.
//       </div>
//     );

//   // Destructure from userData
//   const { kyc, accounts, transfers, payments } = userData;
//   const kycStatusConfig = getKycStatusConfig(kyc?.status);

//   // Define Tabs for dynamic rendering and Framer Motion
//   const tabs = [
//     { value: "kyc", label: "KYC & Documents", icon: UserCheck },
//     { value: "transfers", label: "Transfers (Send)", icon: Send },
//     { value: "payments", label: "Payments (Add)", icon: Landmark },
//   ];

//     // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6 pb-10">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div className="Heading">
//             {/* Corrected typo */}
//             <div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
//               <Link
//                 href="/admin"
//                 className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary"
//               >
//                 Admin
//               </Link>
//               <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//               <Link
//                 href="/admin/users"
//                 className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary"
//               >
//                 Users
//               </Link>
//               <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//               <span
//                 className="text-neutral-900 dark:text-white truncate"
//                 title={userId}
//               >
//                 Details (
//                 {userId ? `${userId.substring(0, 8)}...` : "Loading..."})
//               </span>
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
//               User Details
//             </h1>
//           </div>

//           <Button
//             asChild
//             variant="link"
//             className="text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary p-0 h-auto self-start sm:self-center"
//           >
//             <Link href="/admin/users">
//               <ArrowLeft className="size-5 mr-1.5" />
//               All Users
//             </Link>
//           </Button>
//         </div>

//         {/* User Profile Card */}
//         <Card className="overflow-hidden border shadow-none">
//           {/* --- User Profile Header (Always Renders) --- */}
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                 <AvatarFallback className="text-xl font-semibold text-neutral-900 dark:text-white">
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="space-y-0.5">
//                 <CardTitle className="text-lg sm:text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName}
//                 </CardTitle>
//                 <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
//                   {userData.email}
//                 </CardDescription>
//                 <Badge
//                   variant={userData.role === "admin" ? "default" : "secondary"}
//                   className={cn(
//                     "mt-1.5 text-xs capitalize px-3 py-2",
//                     userData.role === "admin"
//                       ? "bg-primary text-neutral-900"
//                       : "bg-lightgray dark:bg-primarybox text-neutral-900 dark:text-white"
//                   )}
//                 >
//                   {userData.role} Account
//                 </Badge>
//               </div>
//             </div>
//             <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-gray-500 dark:text-gray-300 flex-shrink-0">
//               <span className="flex items-center gap-1.5">
//                 <CalendarDays className="h-4 w-4" /> Joined:{" "}
//                 {formatDate(userData.createdAt)}
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Clock className="h-4 w-4" /> Updated:{" "}
//                 {formatDate(userData.updatedAt)}
//               </span>
//               <TooltipProvider delayDuration={100}>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <span className="cursor-help underline decoration-dotted decoration-border">
//                       ID: {userData._id.substring(userData._id.length - 8)}
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent side="bottom" className="text-neutral-900">
//                     <p>{userData._id}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </CardHeader>

//           {/* --- Conditional Rendering for Account Balances Section --- */}
//           {/* Only render this CardContent if accounts exist and the array is not empty */}
//           {accounts && accounts.length > 0 && (
//             <CardContent className="p-4 sm:p-6">
//               <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
//                 <Wallet className="h-5 w-5 text-primary" />
//                 Account Balances
//               </h3>
//               {/* The container for account boxes - no longer needs internal conditional rendering */}
//               <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
//                 {accounts.map((acc) => (
//                   <div
//                     key={acc._id}
//                     // Added min-h for consistency & currency name section back
//                     className="flex-shrink-0 w-36 sm:w-auto border rounded-lg p-4 hover:bg-lightgray dark:hover:bg-primarybox transition-all duration-75 ease-linear flex flex-col justify-between"
//                   >
//                     {/* Top Section */}
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                           {acc.currency?.code || "N/A"}
//                         </span>
//                         {/* Optional: Add a small icon/flag here if available */}
//                       </div>
//                       <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-1">
//                         {acc.balance != null
//                           ? acc.balance.toLocaleString(undefined, {
//                               minimumFractionDigits: 2,
//                               maximumFractionDigits: 2,
//                             })
//                           : "--.--"}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* The "No accounts found" message is entirely removed */}
//             </CardContent>
//           )}
//           {/* --- End Conditional Rendering --- */}
//         </Card>

//         {/* Tabs Section with Framer Motion */}
//         <Tabs
//           defaultValue="kyc"
//           value={activeTab} // Control the active tab using state
//           onValueChange={setActiveTab} // Update state when tab changes
//           className="w-full"
//         >
//           <div className="overflow-hidden mb-4 ">
//             <TabsList className="relative z-20 flex w-full h-full overflow-x-auto whitespace-nowrap bg-lightborder dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//               {tabs.map((tab) => (
//                 <TabsTrigger
//                   key={tab.value}
//                   value={tab.value}
//                   className={cn(
//                     "relative px-4 py-3 flex items-center justify-center gap-2 text-base shrink-0 min-w-max rounded-full", // Added rounded-full here
//                     "text-neutral-900 dark:text-white data-[state=active]:text-neutral-900 dark:data-[state=active]:text-primary",
//                     "border-none", // Ensure no borders interfere
//                     "data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent",
//                     "data-[state=active]:shadow-none cursor-pointer transition-colors duration-150 ease-in-out",
//                     "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" // Standard focus styling
//                   )}
//                 >
//                   {/* Motion Div for Animated Pill Background */}
//                   {activeTab === tab.value && (
//                     <motion.div
//                       layoutId="active-tab-indicator" // Unique ID for layout animation
//                       className="absolute inset-0 -z-10 bg-primary dark:bg-secondarybox rounded-full shadow-sm"
//                       transition={{ stiffness: 350, damping: 30 }} // Animation (spring)
//                     />
//                   )}
//                   {/* Icon and Label */}
//                   <tab.icon className="size-5" />{" "}
//                   {/* Using h-5 w-5 for clarity */}
//                   <span className="truncate">{tab.label}</span>
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </div>

//           {/* KYC Tab Content */}
//           <TabsContent value="kyc">
//             <motion.div
//               key="kyc-content" // Ensures re-animation on tab switch
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="space-y-4"
//             >
//               <motion.div variants={itemVariants}>
//                 <Card className="border overflow-hidden mb-4 shadow-none">
//                   <CardHeader className="border-b px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                         <UserCheck className="h-5 w-5 text-primary" /> KYC
//                         Information
//                       </CardTitle>
//                       <Badge
//                         variant="outline"
//                         className={cn(
//                           "text-sm capitalize px-4 py-2 font-medium border",
//                           kycStatusConfig.color
//                         )}
//                       >
//                         <kycStatusConfig.icon className="h-4 w-4 mr-1 flex-shrink-0" />{" "}
//                         {kycStatusConfig.label}
//                       </Badge>
//                     </div>
//                     {kyc?.status === "rejected" && kyc.rejectionReason && (
//                       <p className="text-xs text-destructive pt-2 mt-2 border-t border-destructive/20">
//                         <span className="font-medium">Rejection Reason:</span>{" "}
//                         {kyc.rejectionReason}
//                       </p>
//                     )}
//                   </CardHeader>
//                   <CardContent>
//                     {kyc ? (
//                       <>
//                         <div className="p-4 sm:p-6">
//                           <h4 className="border-b pb-2 mb-2 font-medium text-neutral-900 dark:text-white">
//                             Personal Details
//                           </h4>
//                           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                             <DetailItem
//                               label="First Name"
//                               value={kyc.firstName}
//                             />
//                             <DetailItem
//                               label="Last Name"
//                               value={kyc.lastName}
//                             />
//                             <DetailItem
//                               label="Date of Birth"
//                               value={formatDate(kyc.dateOfBirth)}
//                               icon={CalendarDays}
//                             />
//                             <DetailItem
//                               label="Mobile"
//                               value={formatMobile(kyc.mobile)}
//                               icon={Phone}
//                             />
//                             <DetailItem
//                               label="Nationality"
//                               value={kyc.nationality}
//                               icon={Globe}
//                             />
//                             <DetailItem
//                               label="Occupation"
//                               value={kyc.occupation}
//                               icon={Briefcase}
//                             />
//                             <DetailItem
//                               label="Salary Range"
//                               value={
//                                 kyc.salaryRange
//                                   ? salaryDisplayMap[kyc.salaryRange]
//                                   : undefined
//                               }
//                               icon={BadgeDollarSign}
//                             />
//                           </div>
//                         </div>
//                         <div className="p-4 sm:p-6">
//                           <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">
//                             Identification Details
//                           </h4>
//                           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                             <DetailItem
//                               label="ID Type"
//                               value={
//                                 <span className="capitalize">
//                                   {kyc.idType?.replace("_", " ")}
//                                 </span>
//                               }
//                               icon={Fingerprint}
//                             />
//                             <DetailItem
//                               label="ID Number"
//                               value={kyc.idNumber}
//                             />
//                             <DetailItem
//                               label="ID Issue Date"
//                               value={formatDate(kyc.idIssueDate)}
//                               icon={CalendarDays}
//                             />
//                             <DetailItem
//                               label="ID Expiry Date"
//                               value={formatDate(kyc.idExpiryDate)}
//                               icon={CalendarDays}
//                             />
//                           </div>
//                         </div>
//                         <div className="p-4 sm:p-6">
//                           <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">
//                             Updating Information
//                           </h4>
//                           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                             <DetailItem
//                               label="Submitted At"
//                               value={formatDate(kyc.submittedAt, true)}
//                               icon={Clock}
//                             />
//                             <DetailItem
//                               label="Last Updated"
//                               value={formatDate(kyc.lastUpdatedAt, true)}
//                               icon={Clock}
//                             />
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="text-sm text-gray-500 dark:text-gray-300 italic py-4 text-center">
//                         KYC details not submitted.
//                       </p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <Card className="border overflow-hidden mb-4  shadow-none">
//                   <CardHeader className="border-b px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                     <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                       <FileText className="h-5 w-5 text-primary" /> Submitted
//                       Documents
//                     </CardTitle>
//                   </CardHeader>
//                   {kyc?.documents && kyc.documents.length > 0 ? (
//                     <div className="p-4 sm:p-6">
//                       <div className="flex md:flex-row flex-col gap-4">
//                         {kyc.documents.map((doc) => (
//                           <div
//                             key={doc.public_id}
//                             className="border rounded-lg overflow-hidden bg-muted/30 dark:bg-muted/20 md:w-1/2 w-full"
//                           >
//                             <div className="p-3 border-b text-neutral-900 dark:text-white">
//                               <h4 className="text-sm font-medium capitalize">
//                                 {doc.docType.replace("_", " ")}
//                               </h4>
//                             </div>
//                             <div className="p-2 flex items-center justify-center aspect-video bg-white dark:bg-background overflow-hidden relative group">
//                               {doc.url ? (
//                                 <>
//                                   {doc.url.toLowerCase().endsWith(".pdf") ? (
//                                     <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
//                                       <FileText className="h-12 w-12 mb-2" />
//                                       <span className="text-xs">
//                                         PDF Document
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     <Image
//                                       src={doc.url}
//                                       alt={`${doc.docType} preview`}
//                                       fill
//                                       className="object-contain"
//                                       unoptimized // Consider removing if optimization works
//                                     />
//                                   )}
//                                   <a
//                                     href={doc.url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer"
//                                     aria-label={`View full ${doc.docType.replace(
//                                       "_",
//                                       " "
//                                     )} document`}
//                                   >
//                                     <Eye className="h-6 w-6 mb-1" />
//                                     <span className="text-xs font-medium">
//                                       View Full
//                                     </span>
//                                   </a>
//                                 </>
//                               ) : (
//                                 <p className="text-xs text-muted-foreground italic">
//                                   Document URL missing or invalid.
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <CardContent className="p-4">
//                       <p className="text-sm text-gray-500 dark:text-gray-300 italic text-center">
//                         No documents submitted.
//                       </p>
//                     </CardContent>
//                   )}
//                 </Card>
//               </motion.div>
//             </motion.div>
//           </TabsContent>

//           {/* Recent Transfers Tab Content */}
//           <TabsContent value="transfers">
//             <motion.div
//               key="transfers-content" // Ensures re-animation on tab switch
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.div variants={itemVariants}>
//                 <Card className="border-0 bg-transparent shadow-none overflow-hidden">
//                   <CardHeader className="p-4 ">
//                     <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
//                       <Send className="h-5 w-5 text-primary" /> Recent Transfers
//                       (Send Money)
//                     </CardTitle>
//                     <CardDescription className="text-sm !mt-1 text-gray-500 dark:text-gray-300">
//                       Last 5 transfers initiated by this user.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="p-0">
//                     <TransactionTable data={transfers} type="transfer" />
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </motion.div>
//           </TabsContent>

//           {/* Recent Payments Tab Content */}
//           <TabsContent value="payments">
//             <motion.div
//               key="payments-content" // Ensures re-animation on tab switch
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.div variants={itemVariants}>
//                 <Card className="border-0 bg-transparent shadow-none overflow-hidden">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
//                       <Landmark className="h-5 w-5 text-primary" /> Recent
//                       Payments (Add Money)
//                     </CardTitle>
//                     <CardDescription className="text-sm !mt-1 text-gray-500 dark:text-gray-300">
//                       Last 5 payment attempts by this user.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="p-0">
//                     <TransactionTable data={payments} type="payment" />
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </motion.div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default UserDetailPage;

// // frontend/src/app/admin/users/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion"; // Import motion

// // Service Imports
// import userAdminService from "../../../services/admin/user.admin";
// import type { AdminUserDetailResponse as OriginalAdminUserDetailResponse } from "../../../services/admin/user.admin";
// import type { KycMobile, KycStatus } from "../../../services/kyc";
// import type { Payment } from "@/types/payment"; // Assuming Payment type exists

// // Auth Context
// import { useAuth } from "../../../contexts/AuthContext";

// // Shadcn UI Components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Icons (Lucide React)
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   ShieldCheck,
//   CalendarDays,
//   ChevronRight,
//   Phone,
//   Briefcase,
//   UserCheck,
//   UserX,
//   HelpCircle,
//   BadgeDollarSign,
//   Fingerprint,
//   Globe,
//   FileText,
//   AlertCircle,
//   Eye,
//   Wallet,
//   Send,
//   Landmark,
//   Clock,
//   Copy,
//   Check,
//   MessageSquarePlus,
//   IdCard,
//   CloudUpload,
//   CheckCircle,
//   XCircle, // For the trigger button
// } from "lucide-react";

// // Utility & Toast
// import { cn } from "@/lib/utils";
// import { toast } from "sonner"; // For feedback

// // --- Import the Send Message Modal ---
// import SendMessageModal from "../../components/users/SendMessageModal"; // Adjust path if needed

// // --- Define Local Transfer type used WITHIN UserDetailPage ---
// // (Ensure this matches the structure returned by your backend or adapt as needed)
// interface Transfer {
//   _id: string;
//   user?: {
//     _id?: string;
//     fullName?: string;
//     email?: string;
//   };
//   recipient?: {
//     _id?: string;
//     accountHolderName?: string;
//   };
//   sendAmount: string; // Assuming string representation after processing
//   sendCurrency?: {
//     code?: string;
//   };
//   status: string;
//   createdAt: string; // ISO Date string
// }

// // --- Define Local State Type based on Service Response but with modified Transfer type ---
// interface UserDetailState
//   extends Omit<OriginalAdminUserDetailResponse, "transfers"> {
//   transfers: Transfer[];
//   payments: Payment[]; // Assuming Payment type is already correct
// }

// // --- Helper Functions ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//   const statusMap: Record<
//     KycStatus | "unknown",
//     { color: string; icon: React.ElementType; label: string }
//   > = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//       icon: CheckCircle,
//       label: "Verified",
//     },
//     rejected: {
//       color:
//         "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       icon: XCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color:
//         "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//       icon: ArrowLeft,
//       label: "Skipped", // Assuming ArrowLeft is appropriate
//     },
//     not_started: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: HelpCircle,
//       label: "Not Started",
//     },
//     unknown: {
//       color:
//         "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: AlertCircle,
//       label: "Unknown",
//     },
//   };
//   return statusMap[status || "not_started"] || statusMap.unknown;
// };

// const getTransactionStatusColorClasses = (status?: string | null): string => {
//   switch (status?.toLowerCase()) {
//     case "completed":
//     case "credited":
//       return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "processing":
//     case "in progress":
//       return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     case "failed":
//       return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//     case "canceled":
//     case "cancelled":
//       return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//     default:
//       return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// const getInitials = (name?: string | null): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .filter(Boolean)
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000", // Assuming these map to ranges like annual salary
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // --- DetailItem Component ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
//   className = "",
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
//   className?: string;
// }) => (
//   <div className={cn("py-2 space-y-2", className)}>
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
//       {Icon && <Icon className="flex-shrink-0 text-primary size-4" />}
//       {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">N/A</span>}
//     </dd>
//   </div>
// );

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8">
//     <div className="space-y-6 pb-10">
//       {/* Header Skeleton */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <Skeleton className="h-4 w-64 mb-3 rounded " /> {/* Breadcrumbs */}
//           <Skeleton className="h-10 w-48 rounded " /> {/* Title */}
//         </div>
//         {/* Combined Actions Skeleton */}
//         <div className="flex items-center gap-2">
//           <Skeleton className="h-12 w-50 rounded-full" />{" "}
//           {/* Send Message Button Skeleton */}
//         </div>
//       </div>
//       {/* User Profile Card Skeleton */}
//       <div className="border rounded-lg bg-card overflow-hidden">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//           <div className="flex items-center gap-4 flex-1">
//             <Skeleton className="h-14 w-14 sm:h-16 sm:w-16 rounded-full flex-shrink-0 " />
//             <div className="space-y-1.5 flex-1">
//               <Skeleton className="h-6 w-3/4  rounded" />{" "}
//               <Skeleton className="h-4 w-1/2  rounded" />{" "}
//               <Skeleton className="h-5 w-20  rounded-md" />
//             </div>
//           </div>
//           <div className="space-y-1 text-right flex-shrink-0">
//             <Skeleton className="h-3 w-28  rounded" />{" "}
//             <Skeleton className="h-3 w-24  rounded" />{" "}
//             <Skeleton className="h-3 w-32  rounded" />
//           </div>
//         </div>
//         <div className="p-4 sm:p-6">
//           <Skeleton className="h-5 w-1/4  rounded mb-4" />
//           <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
//             {[...Array(5)].map((_, i) => (
//               <Skeleton
//                 key={i}
//                 className="flex-shrink-0 w-36 sm:w-auto h-24 rounded-lg"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tabs Section Skeleton */}
//       <div className="w-full">
//         <div className="overflow-hidden mb-4">
//           <div className="relative flex w-full h-full overflow-x-auto whitespace-nowrap gap-3 bg-lightborder dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//             <Skeleton className="h-9 flex-1 rounded-full" />
//             <Skeleton className="h-9 flex-1 rounded-full" />
//             <Skeleton className="h-9 flex-1 rounded-full" />
//           </div>
//         </div>
//         <div className="space-y-4">
//           <div className="border rounded-lg bg-card overflow-hidden">
//             <div className="px-6 py-4 bg-lightgray dark:bg-primarybox">
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-6 w-40  rounded" />{" "}
//                 <Skeleton className="h-7 w-24  rounded-full" />
//               </div>
//             </div>
//             <div className="p-4 sm:p-6 space-y-4">
//               <div>
//                 <Skeleton className="h-4 w-32  rounded mb-3 border-b border-transparent pb-2" />
//                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={`pd-skel-${i}`} className="py-2 space-y-2">
//                       <Skeleton className="h-4 w-1/3  rounded" />
//                       <Skeleton className="h-5 w-3/4  rounded" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Skeleton className="h-4 w-40  rounded mb-3 border-b border-transparent pb-2" />
//                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                   {[...Array(4)].map((_, i) => (
//                     <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                       <Skeleton className="h-4 w-1/3  rounded" />
//                       <Skeleton className="h-5 w-3/4  rounded" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Skeleton className="h-4 w-48  rounded mb-3 border-b border-transparent pb-2" />
//                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                   {[...Array(2)].map((_, i) => (
//                     <div key={`upd-skel-${i}`} className="py-2 space-y-2">
//                       <Skeleton className="h-4 w-1/3  rounded" />
//                       <Skeleton className="h-5 w-3/4  rounded" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border rounded-lg bg-card overflow-hidden">
//             <div className="px-6 py-4 bg-lightgray dark:bg-primarybox">
//               <Skeleton className="h-6 w-44 rounded" />
//             </div>
//             <div className="p-4 sm:p-6">
//               <div className="flex md:flex-row flex-col gap-4">
//                 <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
//                   <div className="p-3">
//                     <Skeleton className="h-4 w-1/3  rounded" />
//                   </div>
//                   <Skeleton className="aspect-video w-full rounded-none" />
//                 </div>
//                 <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
//                   <div className="p-3">
//                     <Skeleton className="h-4 w-1/3  rounded" />
//                   </div>
//                   <Skeleton className="aspect-video w-full rounded-none" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component ---
// const ErrorDisplay = ({
//   error,
//   onRetry,
// }: {
//   error: string | null;
//   onRetry: () => void;
// }) => (
//   <Alert variant="destructive" className="mt-6">
//     <AlertCircle className="h-4 w-4" />
//     <AlertTitle>Error Loading User Details</AlertTitle>
//     <AlertDescription>
//       {error || "An unexpected error occurred."}
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={onRetry}
//         className="mt-2 ml-auto block"
//       >
//         Retry
//       </Button>
//     </AlertDescription>
//   </Alert>
// );

// // --- Transaction Table Component ---
// const TransactionTable = ({
//   data,
//   type,
// }: {
//   data: (Transfer | Payment)[];
//   type: "transfer" | "payment";
// }) => {
//   const isTransfer = (item: Transfer | Payment): item is Transfer =>
//     type === "transfer";
//   const [copiedId, setCopiedId] = useState<string | null>(null);

//   const handleCopy = (idToCopy: string) => {
//     navigator.clipboard.writeText(idToCopy).then(
//       () => {
//         setCopiedId(idToCopy);
//         setTimeout(() => setCopiedId(null), 1500);
//       },
//       (err) => {
//         console.error("Failed to copy ID: ", err);
//         toast.error("Failed to copy ID");
//       }
//     );
//   };

//   const numberOfColumns = type === "transfer" ? 7 : 6; // Adjust based on columns

//   return (
//     <div className="rounded-xl border overflow-hidden overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//       <table className="min-w-full overflow-hidden">
//         <thead className="bg-lightgray dark:bg-primarybox ">
//           <tr className="border-b">
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               ID
//             </th>
//             {type === "transfer" && (
//               <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//                 Recipient
//               </th>
//             )}
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Amount
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Currency
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Status
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Date
//             </th>
//             <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider uppercase">
//               Details
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y overflow-hidden">
//           {!data || data.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={numberOfColumns}
//                 className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//               >
//                 No {type}s found.
//               </td>
//             </tr>
//           ) : (
//             data.slice(0, 5).map((item) => {
//               // Displaying only top 5
//               const statusColorClasses = getTransactionStatusColorClasses(
//                 item.status
//               );
//               const amountValue = isTransfer(item)
//                 ? item.sendAmount
//                 : String((item as Payment).amountToAdd ?? "0");
//               const formattedAmount =
//                 amountValue != null
//                   ? Number(amountValue).toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })
//                   : "N/A";
//               const currencyCode = isTransfer(item)
//                 ? item.sendCurrency?.code
//                 : (item as Payment).payInCurrency?.code;
//               const recipientName = isTransfer(item)
//                 ? item.recipient?.accountHolderName
//                 : undefined;
//               const detailLink =
//                 type === "transfer"
//                   ? `/admin/transfer/${item._id}`
//                   : `/admin/add-money`; // Adapt payment link if needed
//               const isCopied = copiedId === item._id;

//               return (
//                 <tr key={item._id}>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     <div className="flex items-center gap-2">
//                       <span className="underline decoration-dashed decoration-border cursor-default">
//                         {item._id.substring(item._id.length - 6)}
//                       </span>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <button
//                             className={cn(
//                               "h-5 w-5 p-0 text-muted-foreground hover:text-foreground transition-colors",
//                               isCopied && "text-green-500 hover:text-green-600"
//                             )}
//                             onClick={() => handleCopy(item._id)}
//                             aria-label={isCopied ? "Copied!" : "Copy ID"}
//                           >
//                             {isCopied ? (
//                               <Check size={18} />
//                             ) : (
//                               <Copy size={18} />
//                             )}
//                           </button>
//                         </TooltipTrigger>

//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-50 xl:max-w-lg"
//                         >
//                           <p>{isCopied ? "Copied!" : "Copy ID"}</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </td>
//                   {type === "transfer" && (
//                     <td className="px-4 py-3 whitespace-nowrap font-medium capitalize text-neutral-900 dark:text-white">
//                       {recipientName || "N/A"}
//                     </td>
//                   )}
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {formattedAmount}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {currencyCode || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={cn(
//                         "inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize",
//                         statusColorClasses
//                       )}
//                     >
//                       {item.status || "Unknown"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium">
//                     {formatDate(item.createdAt, true)}
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap ">
//                     <Button
//                       asChild
//                       className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
//                       title={`View ${type} details`}
//                     >
//                       <Link href={detailLink}>
//                         <span>View Details</span>
//                       </Link>
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const userId = params.userId as string;

//   // Component State
//   const [userData, setUserData] = useState<UserDetailState | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("kyc");

//   // State for Send Message Modal
//   const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
//   const [messageSubject, setMessageSubject] = useState("");
//   const [messageBody, setMessageBody] = useState("");
//   const [isSendingMessage, setIsSendingMessage] = useState(false);
//   const [sendMessageError, setSendMessageError] = useState<string | null>(null);

//   // Fetching Logic
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const data: OriginalAdminUserDetailResponse =
//         await userAdminService.getUserDetailsAdmin(userId);
//       // Ensure transfers and payments are always arrays, even if null/undefined from API
//       const processedData: UserDetailState = {
//         ...data,
//         transfers: (data.transfers || []).map((t) => ({
//           _id: t._id,
//           user: t.user,
//           recipient: t.recipient,
//           sendAmount: String(t.sendAmount ?? "0"),
//           sendCurrency: t.sendCurrency,
//           status: t.status,
//           createdAt: t.createdAt,
//         })),
//         payments: (data.payments || []).map((p) => ({ ...p })), // Ensure payments array exists
//       };
//       setUserData(processedData);
//     } catch (err: any) {
//       console.error("Fetch user details error:", err);
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to load user details."
//       );
//       setUserData(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   // Effect for initial fetch and auth checks
//   useEffect(() => {
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//     } else if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//     } else {
//       fetchUserDetails();
//     }
//   }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

//   // Function to handle sending the message
//   const handleSendMessage = async () => {
//     if (!userData || !messageSubject.trim() || !messageBody.trim()) {
//       setSendMessageError("Subject and body cannot be empty.");
//       return;
//     }
//     setIsSendingMessage(true);
//     setSendMessageError(null); // Clear previous errors on new attempt
//     try {
//       await userAdminService.sendMessageToUser(userData._id, {
//         subject: messageSubject.trim(),
//         body: messageBody.trim(),
//       });
//       toast.success("Message sent successfully!");
//       setMessageSubject(""); // Reset form
//       setMessageBody("");
//       setIsSendMessageModalOpen(false); // Close modal on success
//     } catch (err: any) {
//       console.error("Send message error:", err);
//       const errorMsg =
//         err.response?.data?.message || err.message || "Failed to send message.";
//       setSendMessageError(errorMsg); // Set error to display in modal
//       toast.error("Failed to send message", { description: errorMsg });
//     } finally {
//       setIsSendingMessage(false);
//     }
//   };

//   // Function to clear the send error state (passed to modal)
//   const clearSendError = () => {
//     setSendMessageError(null);
//   };

//   // --- Render Logic ---
//   if (loading || authLoading) return <LoadingSkeleton />;

//   if (error)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <ErrorDisplay error={error} onRetry={fetchUserDetails} />
//       </div>
//     );
//   if (!userData)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">
//         User data not found.
//       </div>
//     );

//   // Destructure data for easier access
//   const { kyc, accounts, transfers, payments } = userData;
//   const kycStatusConfig = getKycStatusConfig(kyc?.status);

//   // Tabs definition (for dynamic rendering and motion)
//   const tabs = [
//     { value: "kyc", label: "KYC & Documents", icon: FileText },
//     { value: "transfers", label: "Transfers (Send)", icon: Send },
//     { value: "payments", label: "Payments (Add)", icon: Landmark },
//   ];

//   // Framer Motion Variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   };
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6 pb-10">
//         {/* --- Header Section --- */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div className="Heading">
//             <div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
//               <Link
//                 href="/admin"
//                 className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary"
//               >
//                 Admin
//               </Link>
//               <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//               <Link
//                 href="/admin/users"
//                 className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary"
//               >
//                 Users
//               </Link>
//               <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//               <span
//                 className="text-neutral-900 dark:text-white truncate"
//                 title={userId}
//               >
//                 Details (
//                 {userId ? `${userId.substring(0, 8)}...` : "Loading..."})
//               </span>
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
//               User Details
//             </h1>
//           </div>

//           {/* --- Action Buttons Area --- */}
//           <div className="flex items-center gap-2 flex-wrap">
//             {/* Send Message Button Trigger */}
//             <button
//               onClick={() => setIsSendMessageModalOpen(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
//             >
//               <MessageSquarePlus className="size-4 mr-1.5" /> Send Message
//             </button>
//           </div>
//         </div>

//         {/* --- User Profile Card --- */}
//         <Card className="overflow-hidden border shadow-none">
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                 <AvatarFallback className="text-xl font-semibold text-neutral-900 dark:text-white">
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="space-y-0.5">
//                 <CardTitle className="text-lg sm:text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName}
//                 </CardTitle>

//                 <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
//                   {userData.email}
//                 </CardDescription>

//                 <Badge
//                   variant={userData.role === "admin" ? "default" : "secondary"}
//                   className={cn(
//                     "mt-1.5 text-xs capitalize px-3 py-2 rounded-full",
//                     userData.role === "admin"
//                       ? "bg-primary text-neutral-900"
//                       : "bg-lightgray dark:bg-primarybox text-neutral-900 dark:text-white"
//                   )}
//                 >
//                   {userData.role} Account
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-gray-500 dark:text-gray-300 flex-shrink-0">
//               <span className="flex items-center gap-1.5">
//                 <CalendarDays className="h-4 w-4" /> Joined:{" "}
//                 {formatDate(userData.createdAt)}
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Clock className="h-4 w-4" /> Updated:{" "}
//                 {formatDate(userData.updatedAt)}
//               </span>

//               {/* Tooltip Design For ID: */}
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <span className="cursor-help underline decoration-dotted decoration-border">
//                     ID: {userData._id.substring(userData._id.length - 8)}
//                   </span>
//                 </TooltipTrigger>

//                 <TooltipContent
//                   side="bottom"
//                   sideOffset={5}
//                   className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 sm:mr-5 mr-0 rounded-2xl max-w-60 xl:max-w-lg"
//                 >
//                   <p className="font-medium dark:text-white text-neutral-900 text-xs">
//                     {userData._id}
//                   </p>
//                 </TooltipContent>
//               </Tooltip>
//             </div>
//           </CardHeader>

//           {accounts && accounts.length > 0 && (
//             <CardContent className="p-4 sm:p-6">
//               <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
//                 <Wallet className="h-5 w-5 text-primary" /> Account Balances
//               </h3>
//               <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
//                 {accounts.map((acc) => (
//                   <div
//                     key={acc._id}
//                     className="flex-shrink-0 w-36 sm:w-auto border rounded-lg p-4 hover:bg-lightgray dark:hover:bg-primarybox transition-all duration-75 ease-linear flex flex-col justify-between"
//                   >
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                           {acc.currency?.code || "N/A"}
//                         </span>
//                       </div>
//                       <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-1">
//                         {acc.balance != null
//                           ? acc.balance.toLocaleString(undefined, {
//                               minimumFractionDigits: 2,
//                               maximumFractionDigits: 2,
//                             })
//                           : "--.--"}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           )}
//         </Card>

//         {/* --- Tabs Section --- */}
//         <Tabs
//           defaultValue="kyc"
//           value={activeTab}
//           onValueChange={setActiveTab}
//           className="w-full"
//         >
//           <div className="overflow-hidden mb-4 rounded-full">
//             <TabsList className="relative z-20 flex w-full h-full overflow-x-auto whitespace-nowrap dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//               {tabs.map((tab) => (
//                 <TabsTrigger
//                   key={tab.value}
//                   value={tab.value}
//                   className={cn(
//                     "relative px-4 py-3 flex items-center justify-center gap-2 text-base shrink-0 min-w-max rounded-full text-neutral-900 dark:text-white data-[state=active]:text-neutral-900 dark:data-[state=active]:text-primary border-none data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                   )}
//                 >
//                   {activeTab === tab.value && (
//                     <motion.div
//                       layoutId="active-tab-indicator"
//                       className="absolute inset-0 -z-10 bg-primary dark:bg-secondarybox rounded-full shadow-sm"
//                       transition={{ stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                   <tab.icon className="size-5" />{" "}
//                   <span className="truncate">{tab.label}</span>
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </div>

//           {/* --- KYC Tab Content --- */}
//           <TabsContent value="kyc">
//             <motion.div
//               key="kyc-content"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="space-y-4"
//             >
//               <motion.div variants={itemVariants}>
//                 <Card className="border overflow-hidden mb-4 shadow-none">
//                   <CardHeader className="px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                         <FileText className="text-primary size-5" /> KYC Information
//                       </CardTitle>

//                       <Badge
//                         className={cn(
//                           "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
//                           kycStatusConfig.color
//                         )}
//                       >
//                         <kycStatusConfig.icon className="h-4 w-4" />{" "}
//                         {kycStatusConfig.label}
//                       </Badge>

//                     </div>

//                     {kyc?.status === "rejected" && kyc.rejectionReason && (
//                       <p className="text-xs text-destructive pt-2 mt-2 border-t border-destructive/20">
//                         <span className="font-medium">Rejection Reason:</span>{" "}
//                         {kyc.rejectionReason}
//                       </p>
//                     )}
//                   </CardHeader>
//                   <CardContent>
//                     {kyc ? (
//                       <>
//                         <div className="p-4 sm:p-6">
//                           <h4 className="border-b pb-2 mb-2 font-medium text-neutral-900 dark:text-white">
//                             Personal Details
//                           </h4>
//                           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-4">
//                             <DetailItem
//                               label="First Name"
//                               value={kyc.firstName}
//                               icon={User}
//                             />
//                             <DetailItem
//                               label="Last Name"
//                               value={kyc.lastName}
//                               icon={User}
//                             />
//                             <DetailItem
//                               label="Date of Birth"
//                               value={formatDate(kyc.dateOfBirth)}
//                               icon={CalendarDays}
//                             />
//                             <DetailItem
//                               label="Mobile"
//                               value={formatMobile(kyc.mobile)}
//                               icon={Phone}
//                             />
//                             <DetailItem
//                               label="Nationality"
//                               value={kyc.nationality}
//                               icon={Globe}
//                             />
//                             <DetailItem
//                               label="Occupation"
//                               value={kyc.occupation}
//                               icon={Briefcase}
//                             />
//                             <DetailItem
//                               label="Salary Range"
//                               value={
//                                 kyc.salaryRange
//                                   ? salaryDisplayMap[kyc.salaryRange]
//                                   : undefined
//                               }
//                               icon={BadgeDollarSign}
//                             />
//                           </div>
//                         </div>
//                         <div className="p-4 sm:p-6">
//                           <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">
//                             Identification Details
//                           </h4>
//                           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                             <DetailItem
//                               label="ID Type"
//                               value={
//                                 <span className="capitalize">
//                                   {kyc.idType?.replace("_", " ")}
//                                 </span>
//                               }
//                               icon={Fingerprint}
//                             />
//                             <DetailItem
//                               label="ID Number"
//                               value={kyc.idNumber}
//                               icon={IdCard}
//                             />
//                             <DetailItem
//                               label="ID Issue Date"
//                               value={formatDate(kyc.idIssueDate)}
//                               icon={CalendarDays}
//                             />
//                             <DetailItem
//                               label="ID Expiry Date"
//                               value={formatDate(kyc.idExpiryDate)}
//                               icon={CalendarDays}
//                             />
//                           </div>
//                         </div>
//                         <div className="p-4 sm:p-6">
//                           <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">
//                             Updating Information
//                           </h4>
//                           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                             <DetailItem
//                               label="Submitted At"
//                               value={formatDate(kyc.submittedAt, true)}
//                               icon={Clock}
//                             />
//                             <DetailItem
//                               label="Last Updated"
//                               value={formatDate(kyc.lastUpdatedAt, true)}
//                               icon={Clock}
//                             />
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="text-sm text-gray-500 dark:text-gray-300 italic py-4 text-center">
//                         KYC details not submitted.
//                       </p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//               <motion.div variants={itemVariants}>
//                 <Card className="border overflow-hidden mb-4 shadow-none">
//                   <CardHeader className="px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                     <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                       <CloudUpload className="text-primary" /> Submitted
//                       Documents
//                     </CardTitle>
//                   </CardHeader>

//                   {kyc?.documents && kyc.documents.length > 0 ? (
//                     <div className="p-4 sm:p-6">
//                       <div className="flex md:flex-row flex-col gap-4">
//                         {kyc.documents.map((doc) => (
//                           <div
//                             key={doc.public_id}
//                             className="border rounded-lg overflow-hidden bg-muted/30 dark:bg-muted/20 md:w-1/2 w-full"
//                           >
//                             <div className="p-3 border-b text-neutral-900 dark:text-white">
//                               <h4 className="text-sm font-medium capitalize">
//                                 {doc.docType.replace("_", " ")}
//                               </h4>
//                             </div>
//                             <div className="p-2 flex items-center justify-center aspect-video bg-white dark:bg-background overflow-hidden relative group">
//                               {doc.url ? (
//                                 <>
//                                   {doc.url.toLowerCase().endsWith(".pdf") ? (
//                                     <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
//                                       <FileText className="h-12 w-12 mb-2" />
//                                       <span className="text-xs">
//                                         PDF Document
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     <Image
//                                       src={doc.url}
//                                       alt={`${doc.docType} preview`}
//                                       fill
//                                       className="object-contain"
//                                       unoptimized
//                                     />
//                                   )}
//                                   <a
//                                     href={doc.url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer"
//                                     aria-label={`View full ${doc.docType.replace(
//                                       "_",
//                                       " "
//                                     )} document`}
//                                   >
//                                     <Eye className="h-6 w-6 mb-1" />{" "}
//                                     <span className="text-xs font-medium">
//                                       View Fullflex flex-col items-center
//                                     </span>
//                                   </a>
//                                 </>
//                               ) : (
//                                 <p className="text-xs text-muted-foreground italic">
//                                   Document URL missing.
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <CardContent className="p-4">
//                       <p className="text-sm text-gray-500 dark:text-gray-300 italic text-center">
//                         No documents submitted.
//                       </p>
//                     </CardContent>
//                   )}
//                 </Card>
//               </motion.div>
//             </motion.div>
//           </TabsContent>

//           {/* --- Transfers Tab Content --- */}
//           <TabsContent value="transfers">
//             <motion.div
//               key="transfers-content"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.div variants={itemVariants}>
//                 <Card className="border-0 bg-transparent shadow-none overflow-hidden">
//                   <CardHeader className="p-4 ">
//                     <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
//                       <Send className="h-5 w-5 text-primary" /> Recent Transfers
//                       (Send Money)
//                     </CardTitle>
//                     <CardDescription className="text-sm mt-1 text-gray-500 dark:text-gray-300">
//                       Last 5 transfers by this user.
//                     </CardDescription>
//                   </CardHeader>
//                   {/* Pass transfers array, ensuring it's never null/undefined */}
//                   <CardContent className="p-0">
//                     <TransactionTable data={transfers ?? []} type="transfer" />
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </motion.div>
//           </TabsContent>

//           {/* --- Payments Tab Content --- */}
//           <TabsContent value="payments">
//             <motion.div
//               key="payments-content"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.div variants={itemVariants}>
//                 <Card className="border-0 bg-transparent shadow-none overflow-hidden">
//                   <CardHeader className="p-4">
//                     <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
//                       <Landmark className="h-5 w-5 text-primary" /> Recent
//                       Payments (Add Money)
//                     </CardTitle>
//                     <CardDescription className="text-sm !mt-1 text-gray-500 dark:text-gray-300">
//                       Last 5 payment attempts.
//                     </CardDescription>
//                   </CardHeader>
//                   {/* Pass payments array, ensuring it's never null/undefined */}
//                   <CardContent className="p-0">
//                     <TransactionTable data={payments ?? []} type="payment" />
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </motion.div>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* --- Render the SendMessageModal --- */}
//       {/* Placed outside the main layout flow as it uses fixed positioning */}
//       <SendMessageModal
//         isOpen={isSendMessageModalOpen}
//         setIsOpen={setIsSendMessageModalOpen}
//         userName={userData?.fullName || "this user"} // Pass user name safely
//         subject={messageSubject}
//         setSubject={setMessageSubject}
//         body={messageBody}
//         setBody={setMessageBody}
//         isSending={isSendingMessage}
//         handleSend={handleSendMessage} // Pass the send handler function
//         sendError={sendMessageError} // Pass the error state
//         clearSendError={clearSendError} // Pass the error clearing function
//       />
//     </div>
//   );
// };

// export default UserDetailPage;

// // Last code
// // frontend/src/app/admin/users/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion"; // Import motion

// // Service Imports
// import userAdminService from "../../../services/admin/user.admin";
// import type { AdminUserDetailResponse as OriginalAdminUserDetailResponse } from "../../../services/admin/user.admin";
// import type { KycMobile, KycStatus } from "../../../services/kyc";
// import type { Payment } from "@/types/payment"; // Assuming Payment type exists

// // Auth Context
// import { useAuth } from "../../../contexts/AuthContext";

// // Shadcn UI Components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Icons (Lucide React)
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   ShieldCheck,
//   CalendarDays,
//   ChevronRight,
//   Phone,
//   Briefcase,
//   UserCheck,
//   UserX,
//   HelpCircle,
//   BadgeDollarSign,
//   Fingerprint,
//   Globe,
//   FileText,
//   AlertCircle,
//   Eye,
//   Wallet,
//   Send,
//   Landmark,
//   Clock,
//   Copy,
//   Check,
//   MessageSquarePlus,
//   IdCard,
//   CloudUpload,
//   CheckCircle,
//   XCircle, // For the trigger button
//   ArrowUpDown, // For sorting
//   ArrowDownUp, // For sorting
// } from "lucide-react";

// // Utility & Toast
// import { cn } from "@/lib/utils";
// import { toast } from "sonner"; // For feedback

// // --- Import the Send Message Modal ---
// import SendMessageModal from "../../components/users/SendMessageModal"; // Adjust path if needed

// // --- Define Local Transfer type used WITHIN UserDetailPage ---
// interface Transfer {
//   _id: string;
//   user?: {
//     _id?: string;
//     fullName?: string;
//     email?: string;
//   };
//   recipient?: {
//     _id?: string;
//     accountHolderName?: string;
//   };
//   sendAmount: string; // Will be parsed to number for sorting
//   sendCurrency?: {
//     code?: string;
//   };
//   status: string;
//   createdAt: string; // ISO Date string
// }

// // --- Define Local State Type based on Service Response but with modified Transfer type ---
// interface UserDetailState
//   extends Omit<OriginalAdminUserDetailResponse, "transfers"> {
//   transfers: Transfer[];
//   payments: Payment[];
// }

// // --- Define Sortable Fields for TransactionTable ---
// type TransactionSortableField =
//   | "_id"
//   | "recipient.accountHolderName" // Transfer only
//   | "sendAmount" // Transfer only (maps to amount for sorting)
//   | "amountToAdd" // Payment only (maps to amount for sorting)
//   | "sendCurrency.code" // Transfer only
//   | "payInCurrency.code" // Payment only
//   | "status"
//   | "createdAt";

// // --- Helper Functions ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//   const statusMap: Record<
//     KycStatus | "unknown",
//     { color: string; icon: React.ElementType; label: string }
//   > = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//       icon: CheckCircle,
//       label: "Verified",
//     },
//     rejected: {
//       color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       icon: XCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     not_started: {
//       color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: HelpCircle,
//       label: "Not Started",
//     },
//     unknown: {
//       color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: AlertCircle,
//       label: "Unknown",
//     },
//   };
//   return statusMap[status || "not_started"] || statusMap.unknown;
// };

// const getTransactionStatusColorClasses = (status?: string | null): string => {
//   switch (status?.toLowerCase()) {
//     case "completed":
//     case "credited":
//       return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "processing":
//     case "in progress":
//       return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     case "failed":
//       return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400";
//     case "canceled":
//     case "cancelled":
//       return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400";
//     default:
//       return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// const getInitials = (name?: string | null): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .filter(Boolean)
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // Helper to safely get nested values
// const getNestedValue = (obj: any, path: string): any => {
//   if (!path) return obj;
//   return path
//     .split(".")
//     .reduce(
//       (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
//       obj
//     );
// };

// // --- DetailItem Component ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
//   className = "",
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
//   className?: string;
// }) => (
//   <div className={cn("py-2 space-y-2", className)}>
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
//       {Icon && <Icon className="flex-shrink-0 text-primary size-4" />}
//       {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">N/A</span>}
//     </dd>
//   </div>
// );

// // --- Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8">
//     <div className="space-y-6 pb-10">
//       {/* Header Skeleton */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <Skeleton className="h-4 w-64 mb-3 rounded " /> {/* Breadcrumbs */}
//           <Skeleton className="h-10 w-48 rounded " /> {/* Title */}
//         </div>
//         <div className="flex items-center gap-2">
//           <Skeleton className="h-12 w-50 rounded-full" />
//         </div>
//       </div>
//       {/* User Profile Card Skeleton */}
//       <div className="border rounded-lg bg-card overflow-hidden">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//           <div className="flex items-center gap-4 flex-1">
//             <Skeleton className="h-14 w-14 sm:h-16 sm:w-16 rounded-full flex-shrink-0 " />
//             <div className="space-y-1.5 flex-1">
//               <Skeleton className="h-6 w-3/4  rounded" />
//               <Skeleton className="h-4 w-1/2  rounded" />
//               <Skeleton className="h-5 w-20  rounded-md" />
//             </div>
//           </div>
//           <div className="space-y-1 text-right flex-shrink-0">
//             <Skeleton className="h-3 w-28  rounded" />
//             <Skeleton className="h-3 w-24  rounded" />
//             <Skeleton className="h-3 w-32  rounded" />
//           </div>
//         </div>
//         <div className="p-4 sm:p-6">
//           <Skeleton className="h-5 w-1/4  rounded mb-4" />
//           <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
//             {[...Array(5)].map((_, i) => (
//               <Skeleton
//                 key={i}
//                 className="flex-shrink-0 w-36 sm:w-auto h-24 rounded-lg"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tabs Section Skeleton */}
//       <div className="w-full">
//         <div className="overflow-hidden mb-4">
//           <div className="relative flex w-full h-full overflow-x-auto whitespace-nowrap gap-3 bg-lightborder dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//             <Skeleton className="h-9 flex-1 rounded-full" />
//             <Skeleton className="h-9 flex-1 rounded-full" />
//             <Skeleton className="h-9 flex-1 rounded-full" />
//           </div>
//         </div>
//         <div className="space-y-4">
//           <div className="border rounded-lg bg-card overflow-hidden">
//             <div className="px-6 py-4 bg-lightgray dark:bg-primarybox">
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-6 w-40  rounded" />
//                 <Skeleton className="h-7 w-24  rounded-full" />
//               </div>
//             </div>
//             <div className="p-4 sm:p-6 space-y-4">
//               <div>
//                 <Skeleton className="h-4 w-32  rounded mb-3 border-b border-transparent pb-2" />
//                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={`pd-skel-${i}`} className="py-2 space-y-2">
//                       <Skeleton className="h-4 w-1/3  rounded" />
//                       <Skeleton className="h-5 w-3/4  rounded" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Skeleton className="h-4 w-40  rounded mb-3 border-b border-transparent pb-2" />
//                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                   {[...Array(4)].map((_, i) => (
//                     <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                       <Skeleton className="h-4 w-1/3  rounded" />
//                       <Skeleton className="h-5 w-3/4  rounded" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Skeleton className="h-4 w-48  rounded mb-3 border-b border-transparent pb-2" />
//                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                   {[...Array(2)].map((_, i) => (
//                     <div key={`upd-skel-${i}`} className="py-2 space-y-2">
//                       <Skeleton className="h-4 w-1/3  rounded" />
//                       <Skeleton className="h-5 w-3/4  rounded" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border rounded-lg bg-card overflow-hidden">
//             <div className="px-6 py-4 bg-lightgray dark:bg-primarybox">
//               <Skeleton className="h-6 w-44 rounded" />
//             </div>
//             <div className="p-4 sm:p-6">
//               <div className="flex md:flex-row flex-col gap-4">
//                 <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
//                   <div className="p-3">
//                     <Skeleton className="h-4 w-1/3  rounded" />
//                   </div>
//                   <Skeleton className="aspect-video w-full rounded-none" />
//                 </div>
//                 <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
//                   <div className="p-3">
//                     <Skeleton className="h-4 w-1/3  rounded" />
//                   </div>
//                   <Skeleton className="aspect-video w-full rounded-none" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Error Display Component ---
// const ErrorDisplay = ({
//   error,
//   onRetry,
// }: {
//   error: string | null;
//   onRetry: () => void;
// }) => (
//   <Alert variant="destructive" className="mt-6">
//     <AlertCircle className="h-4 w-4" />
//     <AlertTitle>Error Loading User Details</AlertTitle>
//     <AlertDescription>
//       {error || "An unexpected error occurred."}
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={onRetry}
//         className="mt-2 ml-auto block"
//       >
//         Retry
//       </Button>
//     </AlertDescription>
//   </Alert>
// );

// // --- Transaction Table Component ---
// interface TransactionTableProps {
//   data: (Transfer | Payment)[];
//   type: "transfer" | "payment";
//   sortField: TransactionSortableField | null;
//   sortDirection: "asc" | "desc";
//   onSort: (field: TransactionSortableField) => void;
// }

// const TransactionTable: React.FC<TransactionTableProps> = ({
//   data,
//   type,
//   sortField,
//   sortDirection,
//   onSort,
// }) => {
//   const isTransfer = (item: Transfer | Payment): item is Transfer =>
//     type === "transfer";
//   const [copiedId, setCopiedId] = useState<string | null>(null);

//   const handleCopy = (idToCopy: string) => {
//     navigator.clipboard.writeText(idToCopy).then(
//       () => {
//         setCopiedId(idToCopy);
//         setTimeout(() => setCopiedId(null), 1500);
//       },
//       (err) => {
//         console.error("Failed to copy ID: ", err);
//         toast.error("Failed to copy ID");
//       }
//     );
//   };

//   const renderSortIcon = (field: TransactionSortableField) => {
//     const baseIconClasses = "ml-1.5 transition-all ease-linear duration-75";
//     const hoverRevealClasses =
//       "opacity-0 group-hover:opacity-100 transition-opacity duration-150";

//     if (sortField === field) {
//       const activeClasses = `${baseIconClasses} ${hoverRevealClasses} group-hover:text-primary`;
//       if (sortDirection === "asc") {
//         return <ArrowUpDown size={16} className={activeClasses} />;
//       } else {
//         return <ArrowDownUp size={16} className={activeClasses} />;
//       }
//     }
//     const inactiveClasses = `${baseIconClasses} ${hoverRevealClasses}`;
//     return <ArrowDownUp size={16} className={inactiveClasses} />;
//   };

//   const headerCellClasses =
//     "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//   const buttonClasses =
//     "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

//   const columns: {
//     key: TransactionSortableField;
//     label: string;
//     sortable: boolean;
//     transferOnly?: boolean;
//     paymentOnly?: boolean;
//   }[] = [
//     { key: "_id", label: "ID", sortable: true },
//     {
//       key: "recipient.accountHolderName",
//       label: "Recipient",
//       sortable: true,
//       transferOnly: true,
//     },
//     {
//       key: type === "transfer" ? "sendAmount" : "amountToAdd",
//       label: "Amount",
//       sortable: true,
//     },
//     {
//       key: type === "transfer" ? "sendCurrency.code" : "payInCurrency.code",
//       label: "Currency",
//       sortable: true,
//     },
//     { key: "status", label: "Status", sortable: true },
//     { key: "createdAt", label: "Date", sortable: true },
//     { key: "details" as any, label: "Details", sortable: false }, // 'details' is not a real data field for sorting
//   ];

//   const numberOfDataColumns = columns
//     .filter((col) => (type === "transfer" ? true : !col.transferOnly))
//     .filter((col) => (type === "payment" ? true : !col.paymentOnly)).length;

//   return (
//     <div className="rounded-xl border overflow-hidden overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//       <table className="min-w-full overflow-hidden">
//         <thead className="bg-lightgray dark:bg-primarybox ">
//           <tr>
//             {columns.map((col) => {
//               if (type === "payment" && col.transferOnly) return null;
//               if (type === "transfer" && col.paymentOnly) return null;

//               return (
//                 <th key={col.key} className={headerCellClasses}>
//                   {col.sortable ? (
//                     <button
//                       onClick={() => onSort(col.key)}
//                       className={buttonClasses}
//                     >
//                       {col.label} {renderSortIcon(col.key)}
//                     </button>
//                   ) : (
//                     <span className="uppercase">{col.label}</span>
//                   )}
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody className="divide-y overflow-hidden">
//           {!data || data.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={numberOfDataColumns}
//                 className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//               >
//                 No {type}s found.
//               </td>
//             </tr>
//           ) : (
//             data.slice(0, 5).map((item) => {
//               const statusColorClasses = getTransactionStatusColorClasses(
//                 item.status
//               );
//               const amountValue = isTransfer(item)
//                 ? item.sendAmount
//                 : String((item as Payment).amountToAdd ?? "0");
//               const formattedAmount =
//                 amountValue != null
//                   ? Number(amountValue).toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })
//                   : "N/A";
//               const currencyCode = isTransfer(item)
//                 ? item.sendCurrency?.code
//                 : (item as Payment).payInCurrency?.code;
//               const recipientName = isTransfer(item)
//                 ? item.recipient?.accountHolderName
//                 : undefined;
//               const detailLink =
//                 type === "transfer"
//                   ? `/admin/transfer/${item._id}`
//                   : `/admin/add-money`;
//               const isCopied = copiedId === item._id;

//               return (
//                 <tr key={item._id}>
//                   {/* ID */}
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     <div className="flex items-center gap-2">
//                       <span className="underline decoration-dashed decoration-border cursor-default">
//                         {item._id.substring(item._id.length - 6)}
//                       </span>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <button
//                             className={cn(
//                               "h-5 w-5 p-0 text-muted-foreground hover:text-foreground transition-colors",
//                               isCopied && "text-green-500 hover:text-green-600"
//                             )}
//                             onClick={() => handleCopy(item._id)}
//                             aria-label={isCopied ? "Copied!" : "Copy ID"}
//                           >
//                             {isCopied ? (
//                               <Check size={18} />
//                             ) : (
//                               <Copy size={18} />
//                             )}
//                           </button>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="bottom"
//                           sideOffset={5}
//                           className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-50 xl:max-w-lg"
//                         >
//                           <p>{isCopied ? "Copied!" : "Copy ID"}</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </td>
//                   {/* Recipient (Transfer only) */}
//                   {type === "transfer" && (
//                     <td className="px-4 py-3 whitespace-nowrap font-medium capitalize text-neutral-900 dark:text-white">
//                       {recipientName || "N/A"}
//                     </td>
//                   )}
//                   {/* Amount */}
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {formattedAmount}
//                   </td>
//                   {/* Currency */}
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {currencyCode || "N/A"}
//                   </td>
//                   {/* Status */}
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={cn(
//                         "inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize",
//                         statusColorClasses
//                       )}
//                     >
//                       {item.status || "Unknown"}
//                     </span>
//                   </td>
//                   {/* Date */}
//                   <td className="px-6 py-3 whitespace-nowrap font-medium">
//                     {formatDate(item.createdAt, true)}
//                   </td>
//                   {/* Details Button */}
//                   <td className="px-6 py-3 whitespace-nowrap ">
//                     <Button
//                       asChild
//                       className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
//                       title={`View ${type} details`}
//                     >
//                       <Link href={detailLink}>
//                         <span>View Details</span>
//                       </Link>
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const { token, isAdmin, loading: authLoading } = useAuth();
//   const userId = params.userId as string;

//   // Component State
//   const [userData, setUserData] = useState<UserDetailState | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("kyc");

//   // State for Send Message Modal
//   const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
//   const [messageSubject, setMessageSubject] = useState("");
//   const [messageBody, setMessageBody] = useState("");
//   const [isSendingMessage, setIsSendingMessage] = useState(false);
//   const [sendMessageError, setSendMessageError] = useState<string | null>(null);

//   // State for Transaction Table Sorting
//   const [transferSortField, setTransferSortField] =
//     useState<TransactionSortableField | null>("createdAt");
//   const [transferSortDirection, setTransferSortDirection] = useState<
//     "asc" | "desc"
//   >("desc");
//   const [paymentSortField, setPaymentSortField] =
//     useState<TransactionSortableField | null>("createdAt");
//   const [paymentSortDirection, setPaymentSortDirection] = useState<
//     "asc" | "desc"
//   >("desc");

//   // Fetching Logic
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const data: OriginalAdminUserDetailResponse =
//         await userAdminService.getUserDetailsAdmin(userId);
//       const processedData: UserDetailState = {
//         ...data,
//         transfers: (data.transfers || []).map((t) => ({
//           ...t, // spread original transfer properties
//           _id: t._id, // ensure _id is present
//           sendAmount: String(t.sendAmount ?? "0"), // ensure sendAmount is string
//           status: t.status || "unknown", // ensure status is present
//           createdAt: t.createdAt || new Date(0).toISOString(), // ensure createdAt is present
//         })),
//         payments: (data.payments || []).map((p) => ({
//           ...p, // spread original payment properties
//           status: p.status || "unknown", // ensure status is present
//           createdAt: p.createdAt || new Date(0).toISOString(), // ensure createdAt is present
//         })),
//       };
//       setUserData(processedData);
//     } catch (err: any) {
//       console.error("Fetch user details error:", err);
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to load user details."
//       );
//       setUserData(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   // Effect for initial fetch and auth checks
//   useEffect(() => {
//     if (authLoading) return;
//     if (!token) {
//       router.push("/auth/login?message=login_required");
//     } else if (!isAdmin) {
//       setError("Access Denied: Administrator privileges required.");
//       setLoading(false);
//     } else {
//       fetchUserDetails();
//     }
//   }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

//   // Function to handle sending the message
//   const handleSendMessage = async () => {
//     if (!userData || !messageSubject.trim() || !messageBody.trim()) {
//       setSendMessageError("Subject and body cannot be empty.");
//       return;
//     }
//     setIsSendingMessage(true);
//     setSendMessageError(null);
//     try {
//       await userAdminService.sendMessageToUser(userData._id, {
//         subject: messageSubject.trim(),
//         body: messageBody.trim(),
//       });
//       toast.success("Message sent successfully!");
//       setMessageSubject("");
//       setMessageBody("");
//       setIsSendMessageModalOpen(false);
//     } catch (err: any) {
//       console.error("Send message error:", err);
//       const errorMsg =
//         err.response?.data?.message || err.message || "Failed to send message.";
//       setSendMessageError(errorMsg);
//       toast.error("Failed to send message", { description: errorMsg });
//     } finally {
//       setIsSendingMessage(false);
//     }
//   };

//   const clearSendError = () => {
//     setSendMessageError(null);
//   };

//   // --- Sorting Logic for Transactions ---
//   const handleTransactionSort = (
//     field: TransactionSortableField,
//     type: "transfer" | "payment"
//   ) => {
//     if (type === "transfer") {
//       const newDirection =
//         transferSortField === field && transferSortDirection === "asc"
//           ? "desc"
//           : "asc";
//       setTransferSortField(field);
//       setTransferSortDirection(newDirection);
//     } else {
//       // payment
//       const newDirection =
//         paymentSortField === field && paymentSortDirection === "asc"
//           ? "desc"
//           : "asc";
//       setPaymentSortField(field);
//       setPaymentSortDirection(newDirection);
//     }
//   };

//   const sortedTransfers = useMemo(() => {
//     if (!userData?.transfers) return [];
//     const sortableTransfers = [...userData.transfers];
//     if (transferSortField) {
//       sortableTransfers.sort((a, b) => {
//         const valA = getNestedValue(a, transferSortField);
//         const valB = getNestedValue(b, transferSortField);

//         let comparison = 0;
//         if (transferSortField === "createdAt") {
//           comparison = new Date(valA).getTime() - new Date(valB).getTime();
//         } else if (transferSortField === "sendAmount") {
//           comparison = parseFloat(valA) - parseFloat(valB);
//         } else {
//           // Default to string comparison
//           comparison = String(valA ?? "")
//             .toLowerCase()
//             .localeCompare(String(valB ?? "").toLowerCase());
//         }
//         return transferSortDirection === "asc" ? comparison : -comparison;
//       });
//     }
//     return sortableTransfers;
//   }, [userData?.transfers, transferSortField, transferSortDirection]);

//   const sortedPayments = useMemo(() => {
//     if (!userData?.payments) return [];
//     const sortablePayments = [...userData.payments];
//     if (paymentSortField) {
//       sortablePayments.sort((a, b) => {
//         const valA = getNestedValue(a, paymentSortField);
//         const valB = getNestedValue(b, paymentSortField);

//         let comparison = 0;
//         if (paymentSortField === "createdAt") {
//           comparison = new Date(valA).getTime() - new Date(valB).getTime();
//         } else if (paymentSortField === "amountToAdd") {
//           comparison = (Number(valA) || 0) - (Number(valB) || 0);
//         } else {
//           // Default to string comparison
//           comparison = String(valA ?? "")
//             .toLowerCase()
//             .localeCompare(String(valB ?? "").toLowerCase());
//         }
//         return paymentSortDirection === "asc" ? comparison : -comparison;
//       });
//     }
//     return sortablePayments;
//   }, [userData?.payments, paymentSortField, paymentSortDirection]);

//   // --- Render Logic ---
//   if (loading || authLoading) return <LoadingSkeleton />;

//   if (error)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//         <ErrorDisplay error={error} onRetry={fetchUserDetails} />
//       </div>
//     );
//   if (!userData)
//     return (
//       <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">
//         User data not found.
//       </div>
//     );

//   const { kyc, accounts } = userData; // transfers and payments are now sortedTransfers, sortedPayments
//   const kycStatusConfig = getKycStatusConfig(kyc?.status);

//   const tabs = [
//     { value: "kyc", label: "KYC & Documents", icon: FileText },
//     { value: "transfers", label: "Transfers (Send)", icon: Send },
//     { value: "payments", label: "Payments (Add)", icon: Landmark },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   };
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   return (
//     <TooltipProvider>
//       {" "}
//       {/* Added TooltipProvider here for TransactionTable tooltips */}
//       <div className="container mx-auto px-4 py-8 relative">
//         <div className="space-y-6 pb-10">
//           {/* --- Header Section --- */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div className="Heading">
//               <div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
//                 <Link
//                   href="/admin"
//                   className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary"
//                 >
//                   Admin
//                 </Link>
//                 <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//                 <Link
//                   href="/admin/users"
//                   className="text-gray-500 hover:text-primary dark:text-gray-300 hover:dark:text-primary"
//                 >
//                   Users
//                 </Link>
//                 <ChevronRight className="size-4 mx-1 flex-shrink-0 dark:text-white" />
//                 <span
//                   className="text-neutral-900 dark:text-white truncate"
//                   title={userId}
//                 >
//                   Details (
//                   {userId ? `${userId.substring(0, 8)}...` : "Loading..."})
//                 </span>
//               </div>
//               <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
//                 User Details
//               </h1>
//             </div>

//             <div className="flex items-center gap-2 flex-wrap">
//               <button
//                 onClick={() => setIsSendMessageModalOpen(true)}
//                 className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
//               >
//                 <MessageSquarePlus className="size-4 mr-1.5" /> Send Message
//               </button>
//             </div>
//           </div>

//           {/* --- User Profile Card --- */}
//           <Card className="overflow-hidden border shadow-none">
//             <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//               <div className="flex items-center gap-4">
//                 <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                   <AvatarFallback className="text-xl font-semibold text-neutral-900 dark:text-white">
//                     {getInitials(userData.fullName)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="space-y-0.5">
//                   <CardTitle className="text-lg sm:text-xl text-neutral-900 dark:text-white">
//                     {userData.fullName}
//                   </CardTitle>
//                   <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
//                     {userData.email}
//                   </CardDescription>
//                   <Badge
//                     variant={
//                       userData.role === "admin" ? "default" : "secondary"
//                     }
//                     className={cn(
//                       "mt-1.5 text-xs capitalize px-3 py-2 rounded-full",
//                       userData.role === "admin"
//                         ? "bg-primary text-neutral-900"
//                         : "bg-lightgray dark:bg-primarybox text-neutral-900 dark:text-white"
//                     )}
//                   >
//                     {userData.role} Account
//                   </Badge>
//                 </div>
//               </div>
//               <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-gray-500 dark:text-gray-300 flex-shrink-0">
//                 <span className="flex items-center gap-1.5">
//                   <CalendarDays className="h-4 w-4" /> Joined:{" "}
//                   {formatDate(userData.createdAt)}
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <Clock className="h-4 w-4" /> Updated:{" "}
//                   {formatDate(userData.updatedAt)}
//                 </span>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <span className="cursor-help underline decoration-dotted decoration-border">
//                       ID: {userData._id.substring(userData._id.length - 8)}
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent
//                     side="bottom"
//                     sideOffset={5}
//                     className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 sm:mr-5 mr-0 rounded-2xl max-w-60 xl:max-w-lg"
//                   >
//                     <p className="font-medium dark:text-white text-neutral-900 text-xs">
//                       {userData._id}
//                     </p>
//                   </TooltipContent>
//                 </Tooltip>
//               </div>
//             </CardHeader>
//             {accounts && accounts.length > 0 && (
//               <CardContent className="p-4 sm:p-6">
//                 <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
//                   <Wallet className="h-5 w-5 text-primary" /> Account Balances
//                 </h3>
//                 <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
//                   {accounts.map((acc) => (
//                     <div
//                       key={acc._id}
//                       className="flex-shrink-0 w-36 sm:w-auto border rounded-lg p-4 hover:bg-lightgray dark:hover:bg-primarybox transition-all duration-75 ease-linear flex flex-col justify-between"
//                     >
//                       <div>
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
//                             {acc.currency?.code || "N/A"}
//                           </span>
//                         </div>
//                         <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-1">
//                           {acc.balance != null
//                             ? acc.balance.toLocaleString(undefined, {
//                                 minimumFractionDigits: 2,
//                                 maximumFractionDigits: 2,
//                               })
//                             : "--.--"}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             )}
//           </Card>

//           {/* --- Tabs Section --- */}
//           <Tabs
//             defaultValue="kyc"
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="w-full"
//           >
//             <div className="overflow-hidden mb-4 rounded-full z-0">
//               <TabsList className="relative z-20 flex w-full h-full overflow-x-auto whitespace-nowrap dark:bg-primarybox p-1.5 rounded-full justify-normal items-center">
//                 {tabs.map((tab) => (
//                   <TabsTrigger
//                     key={tab.value}
//                     value={tab.value}
//                     className={cn(
//                       "relative px-4 py-3 flex items-center justify-center gap-2 text-base shrink-0 min-w-max rounded-full text-neutral-900 dark:text-white data-[state=active]:text-neutral-900 dark:data-[state=active]:text-primary border-none data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                     )}
//                   >
//                     {activeTab === tab.value && (
//                       <motion.div
//                         layoutId="active-tab-indicator"
//                         className="absolute inset-0 -z-10 bg-primary dark:bg-secondarybox rounded-full shadow-sm"
//                         transition={{ stiffness: 350, damping: 30 }}
//                       />
//                     )}
//                     <tab.icon className="size-5" />{" "}
//                     <span className="truncate">{tab.label}</span>
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </div>

//             {/* --- KYC Tab Content --- */}
//             <TabsContent value="kyc">
//               <motion.div
//                 key="kyc-content"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="space-y-4"
//               >
//                 <motion.div variants={itemVariants}>
//                   <Card className="border overflow-hidden mb-4 shadow-none">
//                     <CardHeader className="px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                       <div className="flex items-center justify-between">
//                         <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                           <FileText className="text-primary size-5" /> KYC
//                           Information
//                         </CardTitle>
//                         <Badge
//                           className={cn(
//                             "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
//                             kycStatusConfig.color
//                           )}
//                         >
//                           <kycStatusConfig.icon className="h-4 w-4" />{" "}
//                           {kycStatusConfig.label}
//                         </Badge>
//                       </div>
//                       {kyc?.status === "rejected" && kyc.rejectionReason && (
//                         <p className="text-xs text-destructive pt-2 mt-2 border-t border-destructive/20">
//                           <span className="font-medium">Rejection Reason:</span>{" "}
//                           {kyc.rejectionReason}
//                         </p>
//                       )}
//                     </CardHeader>
//                     <CardContent>
//                       {kyc ? (
//                         <>
//                           <div className="p-4 sm:p-6">
//                             <h4 className="border-b pb-2 mb-2 font-medium text-neutral-900 dark:text-white">
//                               Personal Details
//                             </h4>
//                             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-4">
//                               <DetailItem
//                                 label="First Name"
//                                 value={kyc.firstName}
//                                 icon={User}
//                               />
//                               <DetailItem
//                                 label="Last Name"
//                                 value={kyc.lastName}
//                                 icon={User}
//                               />
//                               <DetailItem
//                                 label="Date of Birth"
//                                 value={formatDate(kyc.dateOfBirth)}
//                                 icon={CalendarDays}
//                               />
//                               <DetailItem
//                                 label="Mobile"
//                                 value={formatMobile(kyc.mobile)}
//                                 icon={Phone}
//                               />
//                               <DetailItem
//                                 label="Nationality"
//                                 value={kyc.nationality}
//                                 icon={Globe}
//                               />
//                               <DetailItem
//                                 label="Occupation"
//                                 value={kyc.occupation}
//                                 icon={Briefcase}
//                               />
//                               <DetailItem
//                                 label="Salary Range"
//                                 value={
//                                   kyc.salaryRange
//                                     ? salaryDisplayMap[kyc.salaryRange]
//                                     : undefined
//                                 }
//                                 icon={BadgeDollarSign}
//                               />
//                             </div>
//                           </div>
//                           <div className="p-4 sm:p-6">
//                             <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">
//                               Identification Details
//                             </h4>
//                             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                               <DetailItem
//                                 label="ID Type"
//                                 value={
//                                   <span className="capitalize">
//                                     {" "}
//                                     {kyc.idType?.replace("_", " ")}{" "}
//                                   </span>
//                                 }
//                                 icon={Fingerprint}
//                               />
//                               <DetailItem
//                                 label="ID Number"
//                                 value={kyc.idNumber}
//                                 icon={IdCard}
//                               />
//                               <DetailItem
//                                 label="ID Issue Date"
//                                 value={formatDate(kyc.idIssueDate)}
//                                 icon={CalendarDays}
//                               />
//                               <DetailItem
//                                 label="ID Expiry Date"
//                                 value={formatDate(kyc.idExpiryDate)}
//                                 icon={CalendarDays}
//                               />
//                             </div>
//                           </div>
//                           <div className="p-4 sm:p-6">
//                             <h4 className="border-b pb-2 mb-2 text-neutral-900 dark:text-white">
//                               Updating Information
//                             </h4>
//                             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                               <DetailItem
//                                 label="Submitted At"
//                                 value={formatDate(kyc.submittedAt, true)}
//                                 icon={Clock}
//                               />
//                               <DetailItem
//                                 label="Last Updated"
//                                 value={formatDate(kyc.lastUpdatedAt, true)}
//                                 icon={Clock}
//                               />
//                             </div>
//                           </div>
//                         </>
//                       ) : (
//                         <p className="text-sm text-gray-500 dark:text-gray-300 italic py-4 text-center">
//                           KYC details not submitted.
//                         </p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//                 <motion.div variants={itemVariants}>
//                   <Card className="border overflow-hidden mb-4 shadow-none">
//                     <CardHeader className="px-6 py-4 bg-lightgray dark:bg-primarybox ">
//                       <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white ">
//                         <CloudUpload className="text-primary" /> Submitted
//                         Documents
//                       </CardTitle>
//                     </CardHeader>
//                     {kyc?.documents && kyc.documents.length > 0 ? (
//                       <div className="p-4 sm:p-6">
//                         <div className="flex md:flex-row flex-col gap-4">
//                           {kyc.documents.map((doc) => (
//                             <div
//                               key={doc.public_id}
//                               className="border rounded-lg overflow-hidden bg-muted/30 dark:bg-muted/20 md:w-1/2 w-full"
//                             >
//                               <div className="p-3 border-b text-neutral-900 dark:text-white">
//                                 <h4 className="text-sm font-medium capitalize">
//                                   {doc.docType.replace("_", " ")}
//                                 </h4>
//                               </div>
//                               <div className="p-2 flex items-center justify-center aspect-video bg-white dark:bg-background overflow-hidden relative group">
//                                 {doc.url ? (
//                                   <>
//                                     {doc.url.toLowerCase().endsWith(".pdf") ? (
//                                       <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
//                                         <FileText className="h-12 w-12 mb-2" />
//                                         <span className="text-xs">
//                                           {" "}
//                                           PDF Document{" "}
//                                         </span>
//                                       </div>
//                                     ) : (
//                                       <Image
//                                         src={doc.url}
//                                         alt={`${doc.docType} preview`}
//                                         fill
//                                         className="object-contain"
//                                         unoptimized
//                                       />
//                                     )}
//                                     <a
//                                       href={doc.url}
//                                       target="_blank"
//                                       rel="noopener noreferrer"
//                                       className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer"
//                                       aria-label={`View full ${doc.docType.replace(
//                                         "_",
//                                         " "
//                                       )} document`}
//                                     >
//                                       <Eye className="h-6 w-6 mb-1" />{" "}
//                                       <span className="text-xs font-medium">
//                                         {" "}
//                                         View Full Document{" "}
//                                       </span>
//                                     </a>
//                                   </>
//                                 ) : (
//                                   <p className="text-xs text-muted-foreground italic">
//                                     {" "}
//                                     Document URL missing.{" "}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <CardContent className="p-4">
//                         <p className="text-sm text-gray-500 dark:text-gray-300 italic text-center">
//                           No documents submitted.
//                         </p>
//                       </CardContent>
//                     )}
//                   </Card>
//                 </motion.div>
//               </motion.div>
//             </TabsContent>

//             {/* --- Transfers Tab Content --- */}
//             <TabsContent value="transfers">
//               <motion.div
//                 key="transfers-content"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <motion.div variants={itemVariants}>
//                   <Card className="border-0 bg-transparent shadow-none overflow-hidden">
//                     <CardHeader className="p-4 ">
//                       <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
//                         <Send className="h-5 w-5 text-primary" /> Recent
//                         Transfers (Send Money)
//                       </CardTitle>
//                       <CardDescription className="text-sm mt-1 text-gray-500 dark:text-gray-300">
//                         Last 5 transfers by this user.
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <TransactionTable
//                         data={sortedTransfers}
//                         type="transfer"
//                         sortField={transferSortField}
//                         sortDirection={transferSortDirection}
//                         onSort={(field) =>
//                           handleTransactionSort(field, "transfer")
//                         }
//                       />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </motion.div>
//             </TabsContent>

//             {/* --- Payments Tab Content --- */}
//             <TabsContent value="payments">
//               <motion.div
//                 key="payments-content"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <motion.div variants={itemVariants}>
//                   <Card className="border-0 bg-transparent shadow-none overflow-hidden">
//                     <CardHeader className="p-4">
//                       <CardTitle className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
//                         <Landmark className="h-5 w-5 text-primary" /> Recent
//                         Payments (Add Money)
//                       </CardTitle>
//                       <CardDescription className="text-sm !mt-1 text-gray-500 dark:text-gray-300">
//                         Last 5 payment attempts.
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <TransactionTable
//                         data={sortedPayments}
//                         type="payment"
//                         sortField={paymentSortField}
//                         sortDirection={paymentSortDirection}
//                         onSort={(field) =>
//                           handleTransactionSort(field, "payment")
//                         }
//                       />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </motion.div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <SendMessageModal
//           isOpen={isSendMessageModalOpen}
//           setIsOpen={setIsSendMessageModalOpen}
//           userName={userData?.fullName || "this user"}
//           subject={messageSubject}
//           setSubject={setMessageSubject}
//           body={messageBody}
//           setBody={setMessageBody}
//           isSending={isSendingMessage}
//           handleSend={handleSendMessage}
//           sendError={sendMessageError}
//           clearSendError={clearSendError}
//         />
//       </div>
//     </TooltipProvider>
//   );
// };

// export default UserDetailPage;

// frontend/src/app/admin/users/[userId]/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Service Imports
import userAdminService from "../../../services/admin/user.admin";
import type { AdminUserDetailResponse as OriginalAdminUserDetailResponse } from "../../../services/admin/user.admin";
import type { KycMobile, KycStatus } from "../../../services/kyc";
import type { Payment } from "@/types/payment";

// Auth Context
import { useAuth } from "../../../contexts/AuthContext";

// Shadcn UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icons
import {
  ArrowLeft,
  User,
  CalendarDays,
  ChevronRight,
  Phone,
  Briefcase,
  HelpCircle,
  BadgeDollarSign,
  Fingerprint,
  Globe,
  FileText,
  AlertCircle,
  Eye,
  Wallet,
  Send,
  Landmark,
  Clock,
  Copy,
  Check,
  MessageSquarePlus,
  IdCard,
  CloudUpload,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  ArrowDownUp,
  ListChecks,
  Loader2,
} from "lucide-react";

// Utility & Toast
import { cn } from "@/lib/utils";

// --- Import Custom Toast and react-toastify components ---
import {
  ToastContainer,
  toast as reactToastifyToast,
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions, // Ensure ToastOptions is imported
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast, { CustomToastProps } from "../../../components/CustomToast";

import SendMessageModal from "../../components/users/SendMessageModal";

interface Transfer {
  _id: string;
  user?: { _id?: string; fullName?: string; email?: string };
  recipient?: { _id?: string; accountHolderName?: string };
  sendAmount: string;
  sendCurrency?: { code?: string };
  status: string;
  createdAt: string;
}

interface UserDetailState
  extends Omit<OriginalAdminUserDetailResponse, "transfers" | "payments"> {
  transfers: Transfer[];
  payments: Payment[];
}

type TransactionSortableField =
  | "_id"
  | "recipient.accountHolderName"
  | "sendAmount"
  | "amountToAdd"
  | "sendCurrency.code"
  | "payInCurrency.code"
  | "status"
  | "createdAt";

const formatDate = (
  dateInput?: string | Date | null,
  includeTime = false
): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    return date.toLocaleDateString("en-US", options);
  } catch (e) {
    return "Invalid Date";
  }
};
const formatMobile = (mobile?: KycMobile | null): string => {
  if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
    return "N/A";
  return `${mobile.countryCode} ${mobile.number}`;
};
const getKycStatusConfig = (status?: KycStatus | null) => {
  const statusMap: Record<
    KycStatus | "unknown",
    { color: string; icon: React.ElementType; label: string }
  > = {
    verified: {
      color: "bg-green-900/40 text-green-400",
      icon: CheckCircle,
      label: "Verified",
    },
    rejected: {
      color: "bg-red-900/40 text-red-400",
      icon: XCircle,
      label: "Rejected",
    },
    pending: {
      color: "bg-yellow-900/40 text-yellow-400",
      icon: Clock,
      label: "Pending",
    },
    skipped: {
      color: "bg-blue-900/40 text-blue-400",
      icon: ArrowLeft,
      label: "Skipped",
    },
    not_started: {
      color: "bg-secondarybox text-mainheadingWhite",
      icon: HelpCircle,
      label: "Not Started",
    },
    unknown: {
      color: "bg-gray-700/40 text-gray-400",
      icon: AlertCircle,
      label: "Unknown",
    },
  };
  return statusMap[status || "not_started"] || statusMap.unknown;
};
const getTransactionStatusColorClasses = (status?: string | null): string => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "credited":
      return "bg-green-600/20 text-green-400";
    case "pending":
      return "bg-yellow-600/20 text-yellow-400";
    case "processing":
    case "in progress":
      return "bg-blue-600/20 text-blue-400";
    case "failed":
      return "bg-rose-600/20 text-rose-400";
    case "canceled":
    case "cancelled":
      return "bg-red-600/20 text-red-400";
    default:
      return "bg-gray-600/20 text-gray-400";
  }
};
const getInitials = (name?: string | null): string => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .substring(0, 2)
    .toUpperCase();
};
const salaryDisplayMap: Record<string, string> = {
  "0-1000": "Below $10,000",
  "10000-50000": "$10,000 - $49,999",
  "50000-100000": "$50,000 - $99,999",
  "100000+": "$100,000 or more",
};
const getNestedValue = (obj: any, path: string): any => {
  if (!path) return obj;
  return path
    .split(".")
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj
    );
};

const DetailItem = ({
  label,
  value,
  icon: Icon,
  isImportant = false,
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  isImportant?: boolean;
  className?: string;
}) => (
  <div className={cn("py-2 space-y-2", className)}>
    <dt className="text-sm font-medium text-mainheadingWhite uppercase tracking-wider flex items-center gap-2">
      {Icon && <Icon className="flex-shrink-0 text-primary size-4" />}
      {label}
    </dt>
    <dd
      className={cn(
        "text-sm break-words text-subheadingWhite",
        isImportant ? "font-semibold" : ""
      )}
    >
      {value || <span className="italic">N/A</span>}
    </dd>
  </div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <Skeleton className="h-4 w-64 mb-1 rounded " />
          <Skeleton className="h-10 w-48 rounded " />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
          <div className="flex items-center gap-4 flex-1">
            <Skeleton className="h-14 w-14 sm:h-16 sm:w-16 rounded-full flex-shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-8.5 w-27 rounded-full" />
            </div>
          </div>
          <div className="space-y-1 text-right flex-shrink-0">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <Skeleton className="h-5 w-1/4 rounded mb-4" />
          <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="flex-shrink-0 w-36 sm:w-auto h-24 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="overflow-hidden mb-4">
          <div className="relative flex w-full h-full overflow-x-auto bg-primarybox whitespace-nowrap gap-3 p-1.5 rounded-full justify-normal items-center">
            <Skeleton className="h-9 flex-1 rounded-full bg-background/50" />
            <Skeleton className="h-9 flex-1 rounded-full bg-background/50" />
            <Skeleton className="h-9 flex-1 rounded-full bg-background/50" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg bg-background overflow-hidden">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40 rounded" />
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 bg-background">
              <div>
                <Skeleton className="h-4 w-32  rounded mb-3 border-b border-transparent pb-2" />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={`pd-skel-${i}`} className="py-2 space-y-2">
                      <Skeleton className="h-4 w-1/3 rounded" />
                      <Skeleton className="h-5 w-3/4 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-4 w-40  rounded mb-3 border-b border-transparent pb-2" />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={`id-skel-${i}`} className="py-2 space-y-2">
                      <Skeleton className="h-4 w-1/3  rounded" />
                      <Skeleton className="h-5 w-3/4  rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-4 w-48  rounded mb-3 border-b border-transparent pb-2" />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={`upd-skel-${i}`} className="py-2 space-y-2">
                      <Skeleton className="h-4 w-1/3  rounded" />
                      <Skeleton className="h-5 w-3/4  rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-background overflow-hidden">
            <div className="px-6 py-4">
              <Skeleton className="h-6 w-44 rounded" />
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex md:flex-row flex-col gap-4">
                <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
                  <div className="p-3">
                    <Skeleton className="h-4 w-1/3 rounded" />
                  </div>
                  <Skeleton className="aspect-video w-full rounded-none" />
                </div>
                <div className="border rounded-lg overflow-hidden md:w-1/2 w-full">
                  <div className="p-3">
                    <Skeleton className="h-4 w-1/3 rounded" />
                  </div>
                  <Skeleton className="aspect-video w-full rounded-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) => (
  <div className="my-10">
    <div
      className="w-full flex justify-between relative items-center bg-red-900/25 border sm:order-1 order-2 border-red-500 p-4 rounded-xl"
      role="alert"
    >
      <div className="flex items-center gap-3 text-center">
        <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
          <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
        </div>

        <div className="flex-1 text-left">
          <h4 className="font-medium sm:text-2xl text-lg text-red-600 capitalize">
            Error Loading User Details
          </h4>

          <p className="text-sm text-left text-red-300/90">
            {error || "An unexpected error occurred."}
          </p>
        </div>
      </div>

      <button onClick={onRetry} className="mt-2 block px-6 py-2 bg-red-700/20 rounded-full text-red-600 hover:bg-red-800/20 transition-all ease-linear duration-75 cursor-pointer font-medium">
        Retry
      </button>
    </div>
  </div>
);

interface TransactionTableProps {
  data: (Transfer | Payment)[];
  type: "transfer" | "payment";
  sortField: TransactionSortableField | null;
  sortDirection: "asc" | "desc";
  onSort: (field: TransactionSortableField) => void;
  showToast: (
    message: string,
    type?: CustomToastProps["type"],
    options?: Partial<ToastOptions>
  ) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  type,
  sortField,
  sortDirection,
  onSort,
  showToast,
}) => {
  const isTransfer = (item: Transfer | Payment): item is Transfer =>
    type === "transfer";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (idToCopy: string) => {
    navigator.clipboard.writeText(idToCopy).then(
      () => {
        setCopiedId(idToCopy);
        setTimeout(() => setCopiedId(null), 1500);
      },
      (err) => {
        console.error("Failed to copy ID: ", err);
        showToast("Failed to copy ID", "error");
      }
    );
  };

  const renderSortIcon = (field: TransactionSortableField) => {
    const baseIconClasses = "ml-1.5 transition-all ease-linear duration-75";
    const hoverRevealClasses =
      "opacity-0 group-hover:opacity-100 transition-opacity duration-150";
    if (sortField === field) {
      const activeClasses = `${baseIconClasses} ${hoverRevealClasses} group-hover:text-primary`;
      return sortDirection === "asc" ? (
        <ArrowUpDown size={18} className={activeClasses} />
      ) : (
        <ArrowDownUp size={18} className={activeClasses} />
      );
    }
    return (
      <ArrowDownUp
        size={16}
        className={`${baseIconClasses} ${hoverRevealClasses}`}
      />
    );
  };

  const headerCellClasses =
    "px-6 py-4 text-left font-medium text-mainheadingWhite tracking-wider whitespace-nowrap";
  const buttonClasses =
    "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

  const columns: {
    key: TransactionSortableField;
    label: string;
    sortable: boolean;
    transferOnly?: boolean;
    paymentOnly?: boolean;
  }[] = [
    { key: "_id", label: "ID", sortable: true },
    {
      key: "recipient.accountHolderName",
      label: "Recipient",
      sortable: true,
      transferOnly: true,
    },
    {
      key: type === "transfer" ? "sendAmount" : "amountToAdd",
      label: "Amount",
      sortable: true,
    },
    {
      key: type === "transfer" ? "sendCurrency.code" : "payInCurrency.code",
      label: "Currency",
      sortable: true,
    },
    { key: "status", label: "Status", sortable: true },
    { key: "createdAt", label: "Date", sortable: true },
    { key: "details" as any, label: "Details", sortable: false },
  ];
  const numberOfDataColumns = columns
    .filter((col) => (type === "transfer" ? true : !col.transferOnly))
    .filter((col) => (type === "payment" ? true : !col.paymentOnly)).length;

  return (
    <div className="rounded-xl border overflow-hidden overflow-x-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
      <table className="min-w-full overflow-hidden">
        <thead className="bg-primarybox ">
          <tr>
            {columns.map((col) => {
              if (type === "payment" && col.transferOnly) return null;
              if (type === "transfer" && col.paymentOnly) return null;
              return (
                <th key={col.key} className={headerCellClasses}>
                  {col.sortable ? (
                    <button
                      onClick={() => onSort(col.key)}
                      className={buttonClasses}
                    >
                      {col.label} {renderSortIcon(col.key)}
                    </button>
                  ) : (
                    <span className="uppercase">{col.label}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y overflow-hidden">
          {!data || data.length === 0 ? (
            <tr>
              <td
                colSpan={numberOfDataColumns}
                className="px-6 py-10 text-center text-subheadingWhite"
              >
                No {type}s found.
              </td>
            </tr>
          ) : (
            data.slice(0, 5).map((item) => {
              const statusColorClasses = getTransactionStatusColorClasses(
                item.status
              );
              const amountValue = isTransfer(item)
                ? item.sendAmount
                : String((item as Payment).amountToAdd ?? "0");
              const formattedAmount =
                amountValue != null
                  ? Number(amountValue).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "N/A";
              const currencyCode = isTransfer(item)
                ? item.sendCurrency?.code
                : (item as Payment).payInCurrency?.code;
              const recipientName = isTransfer(item)
                ? item.recipient?.accountHolderName
                : undefined;
              const detailLink =
                type === "transfer"
                  ? `/admin/transfer/${item._id}`
                  : `/admin/add-money`;
              const isCopied = copiedId === item._id;
              return (
                <tr key={item._id}>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-mainheadingWhite">
                    <div className="flex items-center gap-2">
                      <span className="underline decoration-dashed decoration-border cursor-default">
                        {item._id.substring(item._id.length - 6)}
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className={cn(
                              "h-5 w-5 p-0 text-mainheadingWhite cursor-pointer hover:text-subheadingWhite transition-all ease-linear duration-75",
                              isCopied && "text-green-500 hover:text-green-600"
                            )}
                            onClick={() => handleCopy(item._id)}
                            aria-label={isCopied ? "Copied!" : "Copy ID"}
                          >
                            {isCopied ? (
                              <Check size={18} />
                            ) : (
                              <Copy size={18} />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          sideOffset={5}
                          className="bg-secondarybox text-mainheadingWhite p-2 px-3 rounded-2xl max-w-50 xl:max-w-lg"
                        >
                          <p>{isCopied ? "Copied!" : "Copy Id"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </td>

                  {type === "transfer" && (
                    <td className="px-4 py-3 whitespace-nowrap font-medium capitalize text-mainheadingWhite">
                      {recipientName || "N/A"}
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-mainheadingWhite">
                    {formattedAmount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-mainheadingWhite">
                    {currencyCode || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize",
                        statusColorClasses
                      )}
                    >
                      {item.status || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium text-mainheadingWhite">
                    {formatDate(item.createdAt, true)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap ">
                    <button
                      className="inline-flex items-center group px-6 py-2 rounded-3xl transition-all duration-75 ease-linear font-medium bg-primarybox hover:bg-secondarybox text-primary focus:outline-none"
                      title={`View ${type} details`}
                    >
                      <Link href={detailLink}>
                        <span>View Details</span>
                      </Link>
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { token, isAdmin, loading: authLoading } = useAuth();
  const userId = params.userId as string;

  const [userData, setUserData] = useState<UserDetailState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("kyc");
  const [isMobile, setIsMobile] = useState(false);

  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sendMessageError, setSendMessageError] = useState<string | null>(null);

  const [transferSortField, setTransferSortField] =
    useState<TransactionSortableField | null>("createdAt");
  const [transferSortDirection, setTransferSortDirection] = useState<
    "asc" | "desc"
  >("desc");
  const [paymentSortField, setPaymentSortField] =
    useState<TransactionSortableField | null>("createdAt");
  const [paymentSortDirection, setPaymentSortDirection] = useState<
    "asc" | "desc"
  >("desc");

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
      toastSpecificOptions?: Partial<ToastOptions> // Correctly typed parameter
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
          ...toastSpecificOptions, // Spread the options here
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

  const fetchUserDetails = useCallback(async () => {
    if (!userId) {
      setError("User ID is missing from the URL.");
      showToast("User ID is missing.", "error");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data: OriginalAdminUserDetailResponse =
        await userAdminService.getUserDetailsAdmin(userId);
      const processedData: UserDetailState = {
        ...data,
        transfers: (data.transfers || []).map((t) => ({
          ...t,
          _id: t._id,
          sendAmount: String(t.sendAmount ?? "0"),
          status: t.status || "unknown",
          createdAt: t.createdAt || new Date(0).toISOString(),
        })),
        payments: (data.payments || []).map((p) => ({
          ...p,
          status: p.status || "unknown",
          createdAt: p.createdAt || new Date(0).toISOString(),
        })),
      };
      setUserData(processedData);
    } catch (err: any) {
      console.error("Fetch user details error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load user details.";
      setError(errorMsg);
      showToast(errorMsg, "error");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [userId, showToast]);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      router.push("/auth/login?message=login_required");
    } else if (!isAdmin) {
      setError("Access Denied: Administrator privileges required.");
      showToast("Access Denied.", "error");
      setLoading(false);
    } else {
      fetchUserDetails();
    }
  }, [
    token,
    isAdmin,
    authLoading,
    userId,
    router,
    fetchUserDetails,
    showToast,
  ]);

  const handleSendMessage = async () => {
    if (!userData || !messageSubject.trim() || !messageBody.trim()) {
      setSendMessageError("Subject and body cannot be empty.");
      return;
    }
    setIsSendingMessage(true);
    setSendMessageError(null);
    try {
      await userAdminService.sendMessageToUser(userData._id, {
        subject: messageSubject.trim(),
        body: messageBody.trim(),
      });
      showToast("Message sent successfully!", "success");
      setMessageSubject("");
      setMessageBody("");
      setIsSendMessageModalOpen(false);
    } catch (err: any) {
      console.error("Send message error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to send message.";
      setSendMessageError(errorMsg);
      // Corrected: Pass errorMsg as the message for the toast
      showToast(errorMsg, "error", { autoClose: 7000 });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const clearSendError = () => setSendMessageError(null);

  const handleTransactionSort = (
    field: TransactionSortableField,
    type: "transfer" | "payment"
  ) => {
    if (type === "transfer") {
      const newDirection =
        transferSortField === field && transferSortDirection === "asc"
          ? "desc"
          : "asc";
      setTransferSortField(field);
      setTransferSortDirection(newDirection);
    } else {
      const newDirection =
        paymentSortField === field && paymentSortDirection === "asc"
          ? "desc"
          : "asc";
      setPaymentSortField(field);
      setPaymentSortDirection(newDirection);
    }
  };

  const sortedTransfers = useMemo(() => {
    if (!userData?.transfers) return [];
    const sortableTransfers = [...userData.transfers];
    if (transferSortField) {
      sortableTransfers.sort((a, b) => {
        const valA = getNestedValue(a, transferSortField);
        const valB = getNestedValue(b, transferSortField);
        let comparison = 0;
        if (transferSortField === "createdAt")
          comparison = new Date(valA).getTime() - new Date(valB).getTime();
        else if (transferSortField === "sendAmount")
          comparison = parseFloat(valA) - parseFloat(valB);
        else
          comparison = String(valA ?? "")
            .toLowerCase()
            .localeCompare(String(valB ?? "").toLowerCase());
        return transferSortDirection === "asc" ? comparison : -comparison;
      });
    }
    return sortableTransfers;
  }, [userData?.transfers, transferSortField, transferSortDirection]);

  const sortedPayments = useMemo(() => {
    if (!userData?.payments) return [];
    const sortablePayments = [...userData.payments];
    if (paymentSortField) {
      sortablePayments.sort((a, b) => {
        const valA = getNestedValue(a, paymentSortField);
        const valB = getNestedValue(b, paymentSortField);
        let comparison = 0;
        if (paymentSortField === "createdAt")
          comparison = new Date(valA).getTime() - new Date(valB).getTime();
        else if (paymentSortField === "amountToAdd")
          comparison = (Number(valA) || 0) - (Number(valB) || 0);
        else
          comparison = String(valA ?? "")
            .toLowerCase()
            .localeCompare(String(valB ?? "").toLowerCase());
        return paymentSortDirection === "asc" ? comparison : -comparison;
      });
    }
    return sortablePayments;
  }, [userData?.payments, paymentSortField, paymentSortDirection]);

  if (loading || authLoading) {
    return (
      <div className="relative min-h-screen bg-background">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="relative min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <ErrorDisplay error={error} onRetry={fetchUserDetails} />
      </div>
    );
  }

  if (!userData) {
    return (
       <div className="fixed gap-2 inset-0 bg-black/50 backdrop-blur-[1px] h-screen flex items-center justify-center z-50">
         <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <Loader2 size={48} className="text-primary animate-spin" />
        <p className="text-mainheadingWhite font-medium">
          Loading UsersData...
        </p>
      </div>
    );
  }

  const { kyc, accounts } = userData;
  const kycStatusConfig = getKycStatusConfig(kyc?.status);
  const tabs = [
    { value: "kyc", label: "KYC & Documents", icon: FileText },
    { value: "transfers", label: "Transfers (Send)", icon: Send },
    { value: "payments", label: "Payments (Add)", icon: Landmark },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8 relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <div className="space-y-6 pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="Heading">
              <div className="flex items-center text-sm flex-wrap">
                <Link
                  href="/admin"
                  className="text-subheadingWhite hover:text-primary"
                >
                  Admin
                </Link>
                <ChevronRight className="size-4 mx-1 flex-shrink-0 text-mainheadingWhite" />
                <Link
                  href="/admin/users"
                  className="text-subheadingWhite hover:text-primary"
                >
                  Users
                </Link>
                <ChevronRight className="size-4 mx-1 flex-shrink-0 text-mainheadingWhite" />
                <span className="text-subheadingWhite truncate" title={userId}>
                  Details (
                  {userId ? `${userId.substring(0, 8)}...` : "Loading..."})
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl mt-1 font-bold text-mainheadingWhite">
                User Details
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsSendMessageModalOpen(true)}
                className="flex items-center justify-center cursor-pointer gap-2 bg-primarybox hover:bg-secondarybox text-mainheadingWhite px-6 py-3 h-12 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
              >
                <MessageSquarePlus className="size-4" /> Send Message
              </button>
            </div>
          </div>

          <Card className="overflow-hidden bg-primarybox shadow-none">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-14 sm:size-16 flex-shrink-0">
                  <AvatarFallback className="text-xl font-semibold text-mainheadingWhite">
                    {getInitials(userData.fullName)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-0.5">
                  <CardTitle className="text-lg sm:text-xl text-mainheadingWhite">
                    {userData.fullName}
                  </CardTitle>
                  <CardDescription className="text-sm text-subheadingWhite">
                    {userData.email}
                  </CardDescription>
                  <Badge
                    variant={
                      userData.role === "admin" ? "default" : "secondary"
                    }
                    className={cn(
                      "mt-1.5 text-xs capitalize px-3 py-2 rounded-full",
                      userData.role === "admin"
                        ? "bg-primary text-neutral-900"
                        : "bg-secondarybox text-mainheadingWhite"
                    )}
                  >
                    {userData.role} Account
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-subheadingWhite flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" /> Joined:{" "}
                  {formatDate(userData.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> Updated:{" "}
                  {formatDate(userData.updatedAt)}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help underline decoration-dotted decoration-border">
                      ID: {userData._id.substring(userData._id.length - 8)}
                    </span>
                  </TooltipTrigger>

                  <TooltipContent
                    side="bottom"
                    sideOffset={5}
                    className="bg-secondarybox text-mainheadingWhite p-2 px-3 sm:mr-5 mr-0 rounded-2xl max-w-60 xl:max-w-lg"
                  >
                    <p className="font-medium text-xs">{userData._id}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>

            {accounts && accounts.length > 0 && (
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-mainheadingWhite mb-4 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" /> Account Balances
                </h3>

                <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 sm:pb-0 sm:overflow-x-visible">
                  {accounts.map((acc) => (
                    <div
                      key={acc._id}
                      className="flex-shrink-0 w-36 sm:w-auto border rounded-lg p-4 hover:bg-secondarybox transition-all duration-75 ease-linear flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium uppercase tracking-wide text-subheadingWhite">
                            {acc.currency?.code || "N/A"}
                          </span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-mainheadingWhite tracking-tight mb-1">
                          {acc.balance != null
                            ? acc.balance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : "--.--"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          <Tabs
            defaultValue="kyc"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="overflow-hidden mb-4 rounded-full z-0">
              <TabsList className="relative z-20 flex w-full h-full overflow-x-auto whitespace-nowrap bg-primarybox p-1.5 rounded-full justify-normal items-center">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "relative px-4 py-3 flex items-center justify-center gap-2 text-base shrink-0 min-w-max rounded-full text-mainheadingWhite data-[state=active]:text-mainheading dark:data-[state=active]:text-primary border-none data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                  >
                    {activeTab === tab.value && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 -z-10 bg-primary rounded-full"
                        transition={{ stiffness: 350, damping: 30 }}
                      />
                    )}
                    <tab.icon className="size-5" />{" "}
                    <span className="truncate">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="kyc">
              <motion.div
                key="kyc-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border overflow-hidden mb-4 shadow-none">
                    <CardHeader className="px-6 py-4 bg-primarybox">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-mainheadingWhite ">
                          <FileText className="text-primary size-5" /> KYC
                          Information
                        </CardTitle>
                        <Badge
                          className={cn(
                            "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
                            kycStatusConfig.color
                          )}
                        >
                          <kycStatusConfig.icon className="h-4 w-4" />{" "}
                          {kycStatusConfig.label}
                        </Badge>
                      </div>

                      {kyc?.status === "rejected" && kyc.rejectionReason && (
                        <p className="text-xs text-red-600 pt-2 mt-2 border-t">
                          <span className="font-medium">Rejection Reason:</span>{" "}
                          {kyc.rejectionReason}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      {kyc ? (
                        <>
                          <div className="p-4 sm:p-6">
                            <h4 className="border-b pb-2 mb-2 font-medium text-mainheadingWhite">
                              Personal Details
                            </h4>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-4">
                              <DetailItem
                                label="First Name"
                                value={kyc.firstName}
                                icon={User}
                              />
                              <DetailItem
                                label="Last Name"
                                value={kyc.lastName}
                                icon={User}
                              />
                              <DetailItem
                                label="Date of Birth"
                                value={formatDate(kyc.dateOfBirth)}
                                icon={CalendarDays}
                              />
                              <DetailItem
                                label="Mobile"
                                value={formatMobile(kyc.mobile)}
                                icon={Phone}
                              />
                              <DetailItem
                                label="Nationality"
                                value={kyc.nationality}
                                icon={Globe}
                              />
                              <DetailItem
                                label="Occupation"
                                value={kyc.occupation}
                                icon={Briefcase}
                              />
                              <DetailItem
                                label="Salary Range"
                                value={
                                  kyc.salaryRange
                                    ? salaryDisplayMap[kyc.salaryRange]
                                    : undefined
                                }
                                icon={BadgeDollarSign}
                              />
                            </div>
                          </div>
                          <div className="p-4 sm:p-6">
                            <h4 className="border-b pb-2 mb-2 text-mainheadingWhite">
                              Identification Details
                            </h4>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                              <DetailItem
                                label="ID Type"
                                value={
                                  <span className="capitalize">
                                    {" "}
                                    {kyc.idType?.replace("_", " ")}{" "}
                                  </span>
                                }
                                icon={Fingerprint}
                              />
                              <DetailItem
                                label="ID Number"
                                value={kyc.idNumber}
                                icon={IdCard}
                              />
                              <DetailItem
                                label="ID Issue Date"
                                value={formatDate(kyc.idIssueDate)}
                                icon={CalendarDays}
                              />
                              <DetailItem
                                label="ID Expiry Date"
                                value={formatDate(kyc.idExpiryDate)}
                                icon={CalendarDays}
                              />
                            </div>
                          </div>
                          <div className="p-4 sm:p-6">
                            <h4 className="border-b pb-2 mb-2 text-mainheadingWhite">
                              Updating Information
                            </h4>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                              <DetailItem
                                label="Submitted At"
                                value={formatDate(kyc.submittedAt, true)}
                                icon={Clock}
                              />
                              <DetailItem
                                label="Last Updated"
                                value={formatDate(kyc.lastUpdatedAt, true)}
                                icon={Clock}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-subheadingWhite italic py-4 text-center">
                          KYC details not submitted.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border overflow-hidden mb-4 shadow-none">
                    <CardHeader className="px-6 py-4 bg-primarybox ">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-mainheadingWhite ">
                        <CloudUpload className="text-primary" /> Submitted
                        Documents
                      </CardTitle>
                    </CardHeader>

                    {kyc?.documents && kyc.documents.length > 0 ? (
                      <div className="p-4 sm:p-6">
                        <div className="flex md:flex-row flex-col gap-4">
                          {kyc.documents.map((doc) => (
                            <div
                              key={doc.public_id}
                              className="border rounded-lg overflow-hidden bg-primarybox text-mainheadingWhite md:w-1/2 w-full"
                            >
                              <div className="p-3 border-b text-mainheadingWhite">
                                <h4 className="text-sm font-medium capitalize">
                                  {doc.docType.replace("_", " ")}
                                </h4>
                              </div>

                              <div className="p-2 flex items-center justify-center aspect-video bg-background overflow-hidden relative group">
                                {doc.url ? (
                                  <>
                                    {doc.url.toLowerCase().endsWith(".pdf") ? (
                                      <div className="flex flex-col items-center justify-center text-center text-mainheadingWhite">
                                        <FileText className="h-12 w-12 mb-2" />
                                        <span className="text-xs">
                                          {" "}
                                          PDF Document{" "}
                                        </span>
                                      </div>
                                    ) : (
                                      <Image
                                        src={doc.url}
                                        alt={`${doc.docType} preview`}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                      />
                                    )}
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer"
                                      aria-label={`View full ${doc.docType.replace(
                                        "_",
                                        " "
                                      )} document`}
                                    >
                                      <Eye className="h-6 w-6 mb-1 text-white" />{" "}
                                      <span className="text-sm font-medium text-white">
                                        {" "}
                                        View Full Document{" "}
                                      </span>
                                    </a>
                                  </>
                                ) : (
                                  <p className="text-xs text-subheadingWhite italic">
                                    {" "}
                                    Document URL missing.{" "}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <CardContent className="p-4 flex items-center justify-center flex-col space-y-4">
                        <div className="lg:size-16 size-14 flex items-center justify-center bg-primary rounded-full">
                          <ListChecks className="lg:size-8 size-6 mx-auto text-mainheading dark:text-primary" />
                        </div>

                        <h2 className="lg:text-3xl text-2xl font-medium text-mainheadingWhite">
                          No documents submitted.
                        </h2>

                        <p className="text-subheadingWhite max-w-lg mx-auto">
                          No files have been uploaded in Submitted Documents.
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="transfers">
              <motion.div
                key="transfers-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-0 bg-transparent shadow-none overflow-hidden">
                    <CardHeader className="p-4 ">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-mainheadingWhite">
                        <Send className="h-5 w-5 text-primary" /> Recent
                        Transfers (Send Money)
                      </CardTitle>

                      <CardDescription className="text-sm mt-1 text-subheadingWhite">
                        Last 5 transfers by this user.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <TransactionTable
                        data={sortedTransfers}
                        type="transfer"
                        sortField={transferSortField}
                        sortDirection={transferSortDirection}
                        onSort={(field) =>
                          handleTransactionSort(field, "transfer")
                        }
                        showToast={showToast}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            <TabsContent value="payments">
              <motion.div
                key="payments-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-0 bg-transparent shadow-none overflow-hidden">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-mainheadingWhite">
                        <Landmark className="h-5 w-5 text-primary" /> Recent
                        Payments (Add Money)
                      </CardTitle>
                      <CardDescription className="text-sm !mt-1 text-subheadingWhite">
                        Last 5 payment attempts.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <TransactionTable
                        data={sortedPayments}
                        type="payment"
                        sortField={paymentSortField}
                        sortDirection={paymentSortDirection}
                        onSort={(field) =>
                          handleTransactionSort(field, "payment")
                        }
                        showToast={showToast}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        <SendMessageModal
          isOpen={isSendMessageModalOpen}
          setIsOpen={setIsSendMessageModalOpen}
          userName={userData?.fullName || "this user"}
          subject={messageSubject}
          setSubject={setMessageSubject}
          body={messageBody}
          setBody={setMessageBody}
          isSending={isSendingMessage}
          handleSend={handleSendMessage}
          sendError={sendMessageError}
          clearSendError={clearSendError}
        />
      </div>
    </TooltipProvider>
  );
};

export default UserDetailPage;
