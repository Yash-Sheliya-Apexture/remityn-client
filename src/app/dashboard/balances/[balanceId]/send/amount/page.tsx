// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { FaLock } from 'react-icons/fa'; // Keep lock icon for rate
// // import { FaBolt } from 'react-icons/fa'; // Icons for rate lock and speed
// // import { RiInformationLine } from "react-icons/ri"; // Icon for conversion info
// // import { FiFileText } from "react-icons/fi"; // Icon for fees
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // For loading
// import { debounce } from 'lodash';
// import Link from 'next/link';
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Assuming header exists
// import exchangeRateService from '../../../../../services/exchangeRate'; // Import the service

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface SendAmountParams {
//     balanceId: string;
// }
// interface AccountDetails {
//     _id: string;
//     balance: number;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
// }
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
//     accountNumber?: string;
// }
// interface SendSummary { // Structure expected from /transfers/calculate-summary (NO FEES/ARRIVAL)
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     availableBalance: number;
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }
// interface BaseRatesData { // Structure expected from exchangeRateService
//     base: string;
//     date: string;
//     rates: { [key: string]: string };
//     timestamp: number;
//     updatedAt: Date;
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Steps for the header

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [baseRatesInfo, setBaseRatesInfo] = useState<BaseRatesData | null>(null);
//     const [initialRateDisplay, setInitialRateDisplay] = useState<string | null>(null); // e.g., "1 USD = 85.4850 INR"
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [summary, setSummary] = useState<SendSummary | null>(null); // Result from backend calculation (no fees)
//     const [isLoading, setIsLoading] = useState(true); // Initial page data loading
//     const [isCalculating, setIsCalculating] = useState(false); // Backend calculation loading
//     const [isFetchingRates, setIsFetchingRates] = useState(true); // Initial base rates loading
//     const [error, setError] = useState<string | null>(null); // General/validation errors shown to user
//     const [apiError, setApiError] = useState<string | null>(null); // Specific error from calculation API
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null); // Track which input was last edited
//     const [isSendFocused, setIsSendFocused] = useState(false); // Track focus for send input styling
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false); // Track focus for receive input styling

//     // --- Effect: Fetch Initial Data (Account, Recipient, Base Rates) ---
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true); setIsFetchingRates(true); setApiError(null); setError(null);
//             if (!recipientId || !balanceId || !token) { setError("Missing required information."); setIsLoading(false); setIsFetchingRates(false); return; }
//             try {
//                 const [accountRes, recipientRes, ratesRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     exchangeRateService.getExchangeRatesForCurrencies()
//                 ]);
//                 setSourceAccount(accountRes.data); setRecipient(recipientRes.data);
//                 if (ratesRes && ratesRes.rates) { setBaseRatesInfo(ratesRes.rates); }
//                 else { console.warn("Base rates data missing"); setInitialRateDisplay("Rate unavailable"); }
//             } catch (err: any) {
//                 console.error("Error fetching initial page data:", err); const message = err.response?.data?.message || "Failed to load details."; setError(message); setApiError(message);
//             } finally { setIsLoading(false); setIsFetchingRates(false); }
//         };
//         fetchData();
//     }, [balanceId, recipientId, token]);

//     // --- Effect: Calculate and Set Initial Rate Display String ---
//     useEffect(() => {
//         if (sourceAccount && recipient && baseRatesInfo && baseRatesInfo.rates) {
//             const sendCode = sourceAccount.currency.code; const receiveCode = recipient.currency.code; const rates = baseRatesInfo.rates; const baseCode = baseRatesInfo.base || 'USD';
//             try {
//                 const rateBaseToSend = sendCode === baseCode ? 1 : (rates[sendCode] ? parseFloat(rates[sendCode]) : NaN);
//                 const rateBaseToReceive = receiveCode === baseCode ? 1 : (rates[receiveCode] ? parseFloat(rates[receiveCode]) : NaN);
//                 if (!isNaN(rateBaseToSend) && !isNaN(rateBaseToReceive) && rateBaseToSend !== 0) {
//                     const directRate = rateBaseToReceive / rateBaseToSend; setInitialRateDisplay(`1 ${sendCode} = ${directRate.toFixed(4)} ${receiveCode}`);
//                 } else { console.warn(`Could not find rates for ${sendCode}/${receiveCode}`); setInitialRateDisplay("Rate unavailable"); }
//             } catch (e) { console.error("Error calculating initial rate:", e); setInitialRateDisplay("Rate error"); }
//         } else if (!isFetchingRates && (!sourceAccount || !recipient || !baseRatesInfo)) { setInitialRateDisplay("Rate unavailable"); }
//     }, [sourceAccount, recipient, baseRatesInfo, isFetchingRates]);

//     // --- Debounced Calculation Function (Calls Backend Summary Endpoint - NO FEES) ---
//     const debouncedCalculate = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean) => {
//                 setSummary(null); setApiError(null); if (error && error !== "Insufficient balance.") setError(null);
//                 if (!sourceAccount || !recipient || !token || isNaN(amount) || amount <= 0) { setIsCalculating(false); if(isSending) setReceiveAmount(''); else setSendAmount(''); return; }
//                 setIsCalculating(true);
//                 try {
//                     const response = await axios.post<SendSummary>('/transfers/calculate-summary', { sourceAccountId: sourceAccount._id, recipientId: recipient._id, amount: amount, isSendingAmount: isSending, }, { headers: { Authorization: `Bearer ${token}` } });
//                     setSummary(response.data); // Summary now has no fees/arrival
//                     if (isSending) { setReceiveAmount(response.data.receiveAmount.toFixed(2)); } else { setSendAmount(response.data.sendAmount.toFixed(2)); }
//                     setError(null); setApiError(null);
//                 } catch (err: any) {
//                     console.error("Error calculating send summary (AxiosError check):", err); const message = err.response?.data?.message || "Calculation failed."; const code = err.response?.data?.code; setApiError(`Calculation error: ${message}`); setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message); setSummary(null); if (isSending) setReceiveAmount(''); else setSendAmount('');
//                 } finally { setIsCalculating(false); }
//             }, 500),
//         [sourceAccount, recipient, token, error]
//     );

//     // --- Input Handlers (Keep as is) ---
//     const handleAmountChange = (value: string, type: 'send' | 'receive') => {
//         if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
//             let currentAmount = '';
//             if (type === 'send') { setSendAmount(value); setLastEdited('send'); currentAmount = value; }
//             else { setReceiveAmount(value); setLastEdited('receive'); currentAmount = value; }
//             const amountNum = parseFloat(currentAmount);
//             if (!isNaN(amountNum) && amountNum > 0) { debouncedCalculate(amountNum, type === 'send'); }
//             else { debouncedCalculate.cancel(); setSummary(null); setIsCalculating(false); setApiError(null); if (error && error !== "Insufficient balance.") setError(null); if (type === 'send') setReceiveAmount(''); else setSendAmount(''); }
//         }
//     };
//     const handleFocus = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(true); else setIsReceiveFocused(true); };
//     const handleBlur = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(false); else setIsReceiveFocused(false); };

//      // --- Continue Logic (Keep as is - validation doesn't depend on fees) ---
//     const handleContinue = () => {
//          const isSendValid = sendAmount && parseFloat(sendAmount) > 0;
//          const isReceiveValid = receiveAmount && parseFloat(receiveAmount) > 0;
//          if (!isSendValid && !isReceiveValid) { setError("Please enter an amount."); return; }
//          if (isCalculating) { setError("Calculating..."); return; }
//          if (apiError) { setError(apiError); return; }
//          if (error === "Insufficient balance.") { return; }
//          if (!summary) { setError("Calculation details missing."); return; }
//          if (sourceAccount && summary.sendAmount > sourceAccount.balance) { setError("Insufficient balance."); setApiError("Insufficient balance."); return; }

//         // Store summary (which now has no fees/arrival)
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));
//         const needsReason = recipient?.currency.code === 'INR';
//         const nextPath = needsReason ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}` : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);
//     };

//     // --- Derived State for UI Logic ---
//     const showInitialPrompt = !summary && !isCalculating && !sendAmount && !receiveAmount && !error && !apiError;
//     const showCalculationDetails = summary && !isCalculating && !apiError && !error;
//     const canContinue = !isCalculating && !!summary && !error && !apiError; // Button enabled state

//     // --- Render Logic ---
//     if (isLoading) { /* ... Skeleton ... */ return <div className="p-10">Loading...</div>; }
//     if (!sourceAccount || !recipient) { /* ... Error and Link back ... */ return <div className="p-10 text-red-500">Error loading details. <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`}>Go back</Link></div>; }

//     return (
//         <div className="SendAmount-Page pb-10">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Back Link */}
//                 <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900">
//                     <IoIosArrowBack size={18}/> Back
//                 </Link>

//                 {/* Initial Rate Display */}
//                 <div className="text-right mb-4 h-8">
//                     {isFetchingRates ? (<Skeleton height={28} width={170} inline />) : (initialRateDisplay && ( <span className="text-xs sm:text-sm font-medium p-2 rounded-md bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200 inline-flex items-center gap-1"><FaLock size={10} className="text-gray-500"/> {initialRateDisplay} ›</span> ))}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                     <div data-testid="send-section">
//                          <label className={`block text-xs font-medium mb-1 ml-2 ${showCalculationDetails ? 'text-gray-700' : 'text-gray-500'}`}>
//                              {showCalculationDetails ? 'You send exactly' : 'You send'}
//                          </label>
//                         <div className="flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px]">
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r flex-shrink-0">
//                                  <Image src={sourceAccount.currency.flagImage || `/assets/icon/${sourceAccount.currency.code.toLowerCase()}.svg`} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                 <span className="font-semibold text-base">{sourceAccount.currency.code}</span>
//                             </div>
//                              <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
//                                 className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isSendFocused ? 'text-4xl lg:text-5xl' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'receive' && summary ? 'text-gray-400' : 'text-black' }`}
//                                 placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1 ml-2">Balance available: <span className="font-medium underline cursor-pointer hover:text-blue-700">{sourceAccount.balance.toFixed(2)} {sourceAccount.currency.code}</span></p>
//                         {/* Removed Conversion Info Line */}
//                     </div>

//                     {/* Recipient Gets Section */}
//                      <div data-testid="receive-section">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">{recipient.nickname || recipient.accountHolderName} gets</label>
//                         <div className="flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px]">
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r flex-shrink-0">
//                                 <Image src={recipient.currency.flagImage || `/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                 <span className="font-semibold text-base">{recipient.currency.code}</span>
//                              </div>
//                              <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
//                                 className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isReceiveFocused ? 'text-4xl lg:text-5xl' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'send' && summary ? 'text-gray-400' : 'text-black' }`}
//                                 placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
//                         </div>
//                         {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//                     </div>

//                     {/* Paying With Section */}
//                     <div className="mt-6 mb-6">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
//                          <div className="flex items-center p-3 border rounded-lg bg-gray-50 shadow-sm">
//                               <Image src={sourceAccount.currency.flagImage || `/assets/icon/${sourceAccount.currency.code.toLowerCase()}.svg`} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                <div>
//                                    <p className="text-sm font-semibold text-gray-800">Wise {sourceAccount.currency.code} balance</p>
//                                    <p className="text-xs text-gray-600">{sourceAccount.balance.toFixed(2)} {sourceAccount.currency.code} available</p>
//                                </div>
//                          </div>
//                     </div>

//                     {/* --- REMOVED Details Section (Arrives/Fees) --- */}

//                     {/* Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-4 rounded-lg text-center text-sm bg-gray-100 text-gray-600 mt-6">
//                             <IoIosInformationCircleOutline className="inline mr-1 mb-0.5" /> Enter <span className="font-semibold">either amount</span> to continue
//                          </div>
//                     )}
//                     {/* REMOVED Speed Info */}

//                     {/* Error Display */}
//                      {error && (<p className="text-red-600 text-sm mt-4 text-center bg-red-50 p-2 rounded border border-red-200">{error}</p>)}

//                     {/* Continue Button */}
//                     <button onClick={handleContinue} disabled={!canContinue || isCalculating}
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out ${ canContinue ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed' }`}
//                         data-testid="continue-button">
//                         {isCalculating ? 'Calculating...' : 'Continue'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { FaLock, FaInfoCircle } from 'react-icons/fa';
// import { Loader2, AlertTriangle } from 'lucide-react';
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path if needed
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton";
// import { debounce } from 'lodash';
// import Link from 'next/link';
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Adjust path if needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface SendAmountParams {
//     balanceId: string;
// }
// interface AccountDetails {
//     _id: string;
//     balance: number;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
// }
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
//     accountNumber?: string;
// }
// interface SendSummary {
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     liveExchangeRate?: number | null;
//     rateAdjustmentApplied?: number;
//     availableBalance: number;
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay'];

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [summary, setSummary] = useState<SendSummary | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isCalculating, setIsCalculating] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [apiError, setApiError] = useState<string | null>(null);
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null);
//     const [isSendFocused, setIsSendFocused] = useState(false);
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false);
//     const [initialRatesFetched, setInitialRatesFetched] = useState(false);

//     // --- Effect: Fetch Initial Data and Rates ---
//     useEffect(() => {
//         const fetchInitialDataAndRates = async () => {
//             console.log("Fetching initial account, recipient data and rates...");
//             setIsLoading(true);
//             setInitialRatesFetched(false);
//             setApiError(null); setError(null); setSummary(null);

//             if (!recipientId || !balanceId || !token) {
//                 setError("Missing required information.");
//                 setIsLoading(false);
//                 return;
//             }

//             let fetchedAccount: AccountDetails | null = null;
//             let fetchedRecipient: RecipientDetails | null = null;

//             try {
//                 console.log("Fetching account and recipient details...");
//                 const [accountRes, recipientRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } })
//                 ]);
//                 fetchedAccount = accountRes.data;
//                 fetchedRecipient = recipientRes.data;
//                 setSourceAccount(fetchedAccount);
//                 setRecipient(fetchedRecipient);
//                 console.log("Account and recipient data loaded:", fetchedAccount, fetchedRecipient);

//                 if (fetchedAccount && fetchedRecipient) {
//                     console.log("Fetching initial rates using default amount (1)...");
//                     setIsCalculating(true);
//                     try {
//                         const initialRateResponse = await axios.post<SendSummary>(
//                             '/transfers/calculate-summary',
//                             {
//                                 sourceAccountId: fetchedAccount._id,
//                                 recipientId: fetchedRecipient._id,
//                                 amount: 1,
//                                 isSendingAmount: true,
//                             },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         );
//                         console.log("Initial rate calculation successful:", initialRateResponse.data);
//                         setSummary(initialRateResponse.data);
//                         setInitialRatesFetched(true);
//                         setApiError(null);
//                     } catch (rateErr: any) {
//                         console.error("Error fetching initial rates:", rateErr);
//                         const message = rateErr.response?.data?.message || "Failed to load initial exchange rates.";
//                         setApiError(message);
//                         setSummary(null);
//                     } finally {
//                          setIsCalculating(false);
//                     }
//                 }
//             } catch (err: any) {
//                 console.error("Error fetching initial account/recipient data:", err);
//                 const message = err.response?.data?.message || "Failed to load required details.";
//                 setError(message);
//                 setApiError(message);
//                 setSummary(null);
//             } finally {
//                 setIsLoading(false);
//                 console.log("Initial data and rate fetch process finished.");
//             }
//         };
//         fetchInitialDataAndRates();
//     }, [balanceId, recipientId, token]);

//     // --- Debounced Calculation Function ---
//     const debouncedCalculate = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean) => {
//                 console.log(`Debounced calculate triggered (user input): amount=${amount}, isSending=${isSending}`);
//                 setIsCalculating(true);
//                 setApiError(null);
//                 if (error && error !== "Insufficient balance.") setError(null);

//                 if (!sourceAccount || !recipient || !token || isNaN(amount) || amount <= 0) {
//                     console.log("Calculation skipped: Missing data or invalid amount.");
//                     setIsCalculating(false);
//                     if (isNaN(amount) || amount <= 0) {
//                          setSendAmount('');
//                          setReceiveAmount('');
//                          setSummary(prevSummary => {
//                              if (prevSummary && initialRatesFetched) {
//                                  return { ...prevSummary, sendAmount: 0, receiveAmount: 0 };
//                              }
//                              return null;
//                          });
//                          if (error && error !== "Insufficient balance.") setError(null);
//                          setApiError(null);
//                     }
//                     return;
//                 }

//                 console.log("Calling backend /transfers/calculate-summary for user input...");
//                 try {
//                     const response = await axios.post<SendSummary>(
//                         '/transfers/calculate-summary',
//                         {
//                             sourceAccountId: sourceAccount._id,
//                             recipientId: recipient._id,
//                             amount: amount,
//                             isSendingAmount: isSending,
//                         },
//                         { headers: { Authorization: `Bearer ${token}` } }
//                     );
//                     console.log("Backend calculation successful (user input):", response.data);
//                     setSummary(response.data);
//                     if (isSending) {
//                         setReceiveAmount(response.data.receiveAmount.toFixed(2));
//                     } else {
//                         setSendAmount(response.data.sendAmount.toFixed(2));
//                     }
//                     setError(null);
//                     setApiError(null);
//                 } catch (err: any) {
//                     console.error("Error calling /transfers/calculate-summary (user input):", err);
//                     const message = err.response?.data?.message || "Calculation failed.";
//                     const code = err.response?.data?.code;
//                     setApiError(message);
//                     setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message);
//                     setSummary(prevSummary => {
//                          if (prevSummary) {
//                             return { ...prevSummary, sendAmount: 0, receiveAmount: 0 };
//                          }
//                         return null;
//                     });
//                     if (isSending) setReceiveAmount(''); else setSendAmount('');
//                 } finally {
//                     setIsCalculating(false);
//                     console.log("Calculation process finished (user input).");
//                 }
//             }, 500),
//         [sourceAccount, recipient, token, error, initialRatesFetched]
//     );

//     // --- Input Handlers ---
//     const handleAmountChange = (value: string, type: 'send' | 'receive') => {
//         if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
//             let currentAmount = '';
//             if (type === 'send') {
//                 setSendAmount(value); setLastEdited('send'); currentAmount = value;
//             } else {
//                 setReceiveAmount(value); setLastEdited('receive'); currentAmount = value;
//             }
//             const amountNum = parseFloat(currentAmount);

//             if (!isNaN(amountNum) && amountNum > 0) {
//                 debouncedCalculate(amountNum, type === 'send');
//             } else {
//                 debouncedCalculate.cancel();
//                 setIsCalculating(false);
//                 if (type === 'send') setReceiveAmount(''); else setSendAmount('');
//                 setSummary(prevSummary => {
//                     if (prevSummary && initialRatesFetched) {
//                         return { ...prevSummary, sendAmount: 0, receiveAmount: 0 };
//                     }
//                     return null;
//                 });
//                  if (error && error !== "Insufficient balance.") setError(null);
//                  setApiError(null);
//             }
//         }
//     };
//     const handleFocus = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(true); else setIsReceiveFocused(true); };
//     const handleBlur = (type: 'send' | 'receive') => { if (type === 'send') setIsSendFocused(false); else setIsReceiveFocused(false); };

//      // --- Continue Logic ---
//     const handleContinue = () => {
//          console.log("Continue button clicked.");
//          const isSendValid = sendAmount && parseFloat(sendAmount) > 0;
//          const isReceiveValid = receiveAmount && parseFloat(receiveAmount) > 0;

//          if (!isSendValid && !isReceiveValid) { setError("Please enter an amount."); return; }
//          if (isCalculating && (isSendValid || isReceiveValid)) { return; }

//          const isBlockingApiError = apiError && apiError !== "Insufficient balance." && apiError !== "Failed to load initial exchange rates.";
//          if (isBlockingApiError) {
//              setError(apiError);
//              return;
//          }
//          if (error === "Insufficient balance.") { return; }

//          if (!summary || !(summary.sendAmount > 0)) {
//             setError("Could not calculate transfer details. Please re-enter the amount.");
//             if(summary) {
//                 setSummary(prev => prev ? {...prev, sendAmount: 0, receiveAmount: 0} : null);
//                 setSendAmount('');
//                 setReceiveAmount('');
//             }
//             return;
//          }
//          if (summary.sendAmount > summary.availableBalance) {
//             setError("Insufficient balance.");
//             setApiError("Insufficient balance.");
//             return;
//          }

//         console.log("Validation passed, saving summary and navigating...");
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));

//         const needsReason = recipient?.currency.code === 'INR';
//         const nextPath = needsReason
//            ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//            : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);
//     };

//     // --- Derived State for UI Logic ---
//     const showInitialPrompt = initialRatesFetched && !summary?.sendAmount && !summary?.receiveAmount && !isCalculating && !error && !apiError;
//     const showRates = summary && !(apiError && apiError !== "Failed to load initial exchange rates.");
//     const canContinue = summary && summary.sendAmount > 0 && !isCalculating && !error && !(apiError && apiError !== "Insufficient balance." && apiError !== "Failed to load initial exchange rates.");

//     // --- Format Rates for Display ---
//     const formatRate = (rate: number | null | undefined, precision = 6): string => {
//         if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//         return rate.toFixed(precision);
//     };
//     const formatComparisonRate = (rate: number | null | undefined, precision = 4): string => {
//          if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//          return rate.toFixed(precision);
//     };

//     // --- Prepare display strings ---
//     const adjustedRateDisplay = summary ? `1 ${summary.sendCurrencyCode} = ${formatRate(summary.exchangeRate)} ${summary.receiveCurrencyCode}` : null;
//     const liveRateDisplay = summary?.liveExchangeRate ? `1 ${summary.sendCurrencyCode} ≈ ${formatComparisonRate(summary.liveExchangeRate)} ${summary.receiveCurrencyCode}` : null;

//     // --- Render Logic ---

//     // Initial Loading State
//     if (isLoading) {
//         console.log("Rendering: Initial Loading Skeleton (Account, Recipient, Rates)");
//         return (
//             <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
//                  <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                     <Skeleton className="h-6 w-20 mb-4" />
//                     <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                         <Skeleton className="h-5 w-40 mb-1.5 bg-gray-200" />
//                         <Skeleton className="h-5 w-48 bg-gray-200" />
//                     </div>
//                     <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                     <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                     <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                     <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                     <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" />
//                     <Skeleton className="h-12 w-full rounded-full bg-gray-300" />
//                  </div>
//             </div>
//          );
//      }

//     // Error State if Account/Recipient Fetch Failed Critically
//     if (!sourceAccount || !recipient) {
//          console.log("Rendering: Error Loading Account/Recipient Details");
//          return (
//             <div className="bg-gray-50 min-h-screen">
//                  <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//                  <div className="p-10 text-center">
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10" role="alert">
//                         <strong className="font-bold mr-1">Error!</strong>
//                         <span className="block sm:inline">{error || "Error loading account or recipient details."}</span>
//                     </div>
//                     <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                        <IoIosArrowBack size={18} className="mr-1"/> Go back
//                     </Link>
//                  </div>
//             </div>
//         );
//     }

//     // Main Render
//     console.log("Rendering: Main Send Amount Page Content", { summary, isCalculating, error, apiError, canContinue });
//     // Ensure the return statement is followed directly by the opening parenthesis for the JSX block
//     return (
//         <div className="SendAmount-Page pb-20 bg-gray-50 min-h-screen">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Back Link */}
//                 <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
//                     <IoIosArrowBack size={18}/> Back
//                 </Link>

//                 {/* Rate Display Section */}
//                 <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                     {showRates && (
//                         <>
//                             {adjustedRateDisplay && (
//                                 <div className="text-xs sm:text-sm font-medium p-1.5 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 inline-flex items-center gap-1.5 cursor-default" title={`Rate includes adjustment of ${summary?.rateAdjustmentApplied?.toFixed(2) ?? 0}%. This is the rate applied to your transfer.`}>
//                                     <FaLock size={10} /> Rate Used: {adjustedRateDisplay}
//                                 </div>
//                             )}
//                             {liveRateDisplay && (
//                                 <div className="text-xs font-normal p-1.5 px-2.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
//                                     <FaInfoCircle size={10} /> Market Rate: {liveRateDisplay}
//                                 </div>
//                             )}
//                         </>
//                     )}
//                     {apiError && apiError === "Failed to load initial exchange rates." && !summary && (
//                         <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//                             <AlertTriangle size={12} /> Error loading rates.
//                         </div>
//                     )}
//                     {!showRates && !(apiError && apiError === "Failed to load initial exchange rates." && !summary) && (
//                         <div className="h-[50px]"></div>
//                     )}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                      <div data-testid="send-section">
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {(summary?.sendAmount > 0 && !isCalculating) ? 'You send exactly' : 'You send'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isSendFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'}`}>
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                   <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{sourceAccount.currency.code}</span>
//                              </div>
//                               <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isSendFocused ? 'text-4xl lg:text-5xl text-primary' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'receive' && summary?.receiveAmount > 0 ? 'text-gray-500 font-medium' : 'text-black' }`}
//                                  placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
//                          </div>
//                          <p className="text-xs text-gray-500 mt-1 ml-2">Available balance: <span className="font-medium">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code}</span></p>
//                      </div>

//                     {/* Recipient Gets Section */}
//                       <div data-testid="receive-section">
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {recipient.nickname || recipient.accountHolderName} {(summary?.receiveAmount > 0 && !isCalculating) ? 'gets exactly' : 'gets approx.'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isReceiveFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'}`}>
//                              <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                  <Image src={recipient.currency.flagImage || '/assets/icon/generic.svg'} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{recipient.currency.code}</span>
//                               </div>
//                               <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out ${ isReceiveFocused ? 'text-4xl lg:text-5xl text-primary' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' } ${ lastEdited === 'send' && summary?.sendAmount > 0 ? 'text-gray-500 font-medium' : 'text-black' }`}
//                                  placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
//                          </div>
//                          {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//                      </div>

//                     {/* Paying With Section */}
//                     <div className="mt-6 mb-6">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
//                          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
//                               <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                <div>
//                                    <p className="text-sm font-semibold text-gray-800">Your {sourceAccount.currency.code} balance</p>
//                                    <p className="text-xs text-gray-600">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code} available</p>
//                                </div>
//                          </div>
//                     </div>

//                     {/* Initial Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700 border border-blue-200 mt-6 flex items-center justify-center gap-2">
//                             <IoIosInformationCircleOutline className="inline mb-0.5 flex-shrink-0" size={18}/> Enter <span className="font-semibold">either amount</span> to calculate your transfer.
//                          </div>
//                     )}

//                     {/* Error Display */}
//                      {error && (
//                          <p className={`text-sm mt-4 text-center p-2.5 rounded-md border ${ error === "Insufficient balance." ? "text-orange-800 bg-orange-50 border-orange-300" : "text-red-800 bg-red-50 border-red-300" } flex items-center justify-center gap-2`} data-testid="error-message">
//                              <AlertTriangle size={16} className={`${ error === "Insufficient balance." ? "text-orange-500" : "text-red-500" }`}/>
//                              {error}
//                          </p>
//                      )}
//                      {apiError && apiError !== "Insufficient balance." && apiError !== "Failed to load initial exchange rates." && !error && (
//                         <p className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2" data-testid="api-error-message">
//                             <AlertTriangle size={16} className="text-red-500"/>
//                             {apiError}
//                         </p>
//                     )}

//                     {/* Continue Button */}
//                     <button
//                         onClick={handleContinue}
//                         disabled={!canContinue}
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg ${ canContinue ? 'bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
//                         data-testid="continue-button"
//                     >
//                         {isCalculating && (sendAmount || receiveAmount) ? (
//                              <div className="flex items-center justify-center">
//                                  <Loader2 size={20} className="animate-spin mr-2" /> Calculating...
//                              </div>
//                         ) : 'Continue'}
//                     </button>
//                 </div> {/* Close main content area div */}
//             </div> {/* Close container div */}
//         </div> // Close main page div
//     ); // Close return parentheses
// } // Close component function

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'; // Added useRef
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { FaLock, FaInfoCircle } from 'react-icons/fa';
// import { Loader2, AlertTriangle } from 'lucide-react';
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";
// import { debounce } from 'lodash';
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces (keep as is) ---
// interface SendAmountParams {
//     balanceId: string;
// }
// interface AccountDetails {
//     _id: string;
//     balance: number;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
// }
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//     };
//     accountNumber?: string;
// }
// interface SendSummary {
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     liveExchangeRate?: number | null;
//     rateAdjustmentApplied?: number;
//     availableBalance: number;
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay'];

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [summary, setSummary] = useState<SendSummary | null>(null); // Stores the *latest successfully calculated* summary
//     const [initialRateSummary, setInitialRateSummary] = useState<SendSummary | null>(null); // Stores the initial rate context
//     const [isLoading, setIsLoading] = useState(true); // For initial page load
//     const [isCalculating, setIsCalculating] = useState(false); // For API debounce calculation
//     const [error, setError] = useState<string | null>(null); // User-facing validation/state errors (e.g., insufficient balance)
//     const [apiError, setApiError] = useState<string | null>(null); // Errors from API calls (e.g., network, calculation failed)
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null);
//     const [isSendFocused, setIsSendFocused] = useState(false);
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//     // --- Refs ---
//     // Use refs to access latest state within debounced function without needing them as dependencies
//     const sourceAccountRef = useRef(sourceAccount);
//     const recipientRef = useRef(recipient);
//     const tokenRef = useRef(token);
//     const initialRateSummaryRef = useRef(initialRateSummary);
//     const errorRef = useRef(error);

//     useEffect(() => { sourceAccountRef.current = sourceAccount; }, [sourceAccount]);
//     useEffect(() => { recipientRef.current = recipient; }, [recipient]);
//     useEffect(() => { tokenRef.current = token; }, [token]);
//     useEffect(() => { initialRateSummaryRef.current = initialRateSummary; }, [initialRateSummary]);
//     useEffect(() => { errorRef.current = error; }, [error]);

//     // --- Effect: Fetch Initial Data and Rates ---
//     useEffect(() => {
//         const fetchInitialDataAndRates = async () => {
//             console.log("Fetching initial account, recipient data and rates...");
//             setIsLoading(true);
//             setInitialRateSummary(null); // Reset initial rates
//             setApiError(null); setError(null); setSummary(null); // Reset all states

//             if (!recipientId || !balanceId || !token) {
//                 setError("Missing required information to load page."); // More specific error
//                 setIsLoading(false);
//                 return;
//             }

//             let fetchedAccount: AccountDetails | null = null;
//             let fetchedRecipient: RecipientDetails | null = null;

//             try {
//                 console.log("Fetching account and recipient details...");
//                 // Fetch in parallel
//                 const [accountRes, recipientRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } })
//                 ]);
//                 fetchedAccount = accountRes.data;
//                 fetchedRecipient = recipientRes.data;
//                 setSourceAccount(fetchedAccount);
//                 setRecipient(fetchedRecipient);
//                 console.log("Account and recipient data loaded.");

//                 if (fetchedAccount && fetchedRecipient) {
//                     console.log("Fetching initial rates using default amount (1)...");
//                     // Use a temporary calculating state distinct from user-triggered calculation
//                     setIsCalculating(true); // Indicate rate fetch is happening
//                     try {
//                         const initialRateResponse = await axios.post<SendSummary>(
//                             '/transfers/calculate-summary',
//                             {
//                                 sourceAccountId: fetchedAccount._id,
//                                 recipientId: fetchedRecipient._id,
//                                 amount: 1, // Use a base amount for rate display
//                                 isSendingAmount: true,
//                             },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         );
//                         console.log("Initial rate calculation successful:", initialRateResponse.data);
//                         // Store this separately, it provides context but isn't the active transfer summary yet
//                         setInitialRateSummary(initialRateResponse.data);
//                         setApiError(null); // Clear any previous API errors
//                     } catch (rateErr: any) {
//                         console.error("Error fetching initial rates:", rateErr);
//                         const message = rateErr.response?.data?.message || "Failed to load initial exchange rates.";
//                         setApiError(message); // Set API error specifically for rate loading issue
//                         setInitialRateSummary(null);
//                     } finally {
//                         setIsCalculating(false); // Initial rate fetch finished
//                     }
//                 }
//             } catch (err: any) {
//                 console.error("Error fetching initial account/recipient data:", err);
//                 const message = err.response?.data?.message || "Failed to load required account or recipient details.";
//                 setError(message); // Set user-facing error for critical load failure
//                 setApiError(message); // Also set API error
//                 setSourceAccount(null); // Ensure state is cleared on critical failure
//                 setRecipient(null);
//             } finally {
//                 setIsLoading(false); // Initial data load process finished
//                 console.log("Initial data and rate fetch process finished.");
//             }
//         };

//         fetchInitialDataAndRates();
//         // Dependency array: only re-run if these IDs or the token change
//     }, [balanceId, recipientId, token]);

//     // --- Debounced Calculation Function ---
//     const debouncedCalculate = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean) => {
//                 // Access latest state via refs inside the debounced function
//                 const currentSourceAccount = sourceAccountRef.current;
//                 const currentRecipient = recipientRef.current;
//                 const currentToken = tokenRef.current;
//                 const currentInitialRates = initialRateSummaryRef.current;
//                 const currentError = errorRef.current; // Use ref to check current error state

//                 console.log(`Debounced calculate triggered: amount=${amount}, isSending=${isSending}`);
//                 setIsCalculating(true);
//                 setApiError(null); // Clear previous API calculation errors
//                 // Only clear non-balance related user errors when starting a new calculation
//                 if (currentError && currentError !== "Insufficient balance.") {
//                      setError(null);
//                 }

//                 if (!currentSourceAccount || !currentRecipient || !currentToken || isNaN(amount) || amount <= 0) {
//                     console.log("Calculation skipped: Missing data or invalid amount.");
//                     setIsCalculating(false);
//                     // Clear amounts and summary if input becomes invalid/zero
//                     setSendAmount('');
//                     setReceiveAmount('');
//                     // Reset summary, but potentially keep rate context from initial load if available
//                     setSummary(currentInitialRates ? { ...currentInitialRates, sendAmount: 0, receiveAmount: 0 } : null);
//                      // Don't clear insufficient balance error here, let new calc potentially override
//                     if (currentError && currentError !== "Insufficient balance.") setError(null);
//                     setApiError(null);
//                     return;
//                 }

//                 console.log("Calling backend /transfers/calculate-summary...");
//                 try {
//                     const response = await axios.post<SendSummary>(
//                         '/transfers/calculate-summary',
//                         {
//                             sourceAccountId: currentSourceAccount._id,
//                             recipientId: currentRecipient._id,
//                             amount: amount,
//                             isSendingAmount: isSending,
//                         },
//                         { headers: { Authorization: `Bearer ${currentToken}` } }
//                     );
//                     console.log("Backend calculation successful:", response.data);
//                     setSummary(response.data); // Update the main summary state
//                     // Update the *other* input field based on calculation result
//                     if (isSending) {
//                         setReceiveAmount(response.data.receiveAmount.toFixed(2));
//                     } else {
//                         setSendAmount(response.data.sendAmount.toFixed(2));
//                     }
//                     // Clear errors on successful calculation
//                     setError(null);
//                     setApiError(null);

//                     // Post-calculation balance check
//                     if (response.data.sendAmount > currentSourceAccount.balance) {
//                         setError("Insufficient balance.");
//                         // Keep the calculated summary but flag the error
//                     }

//                 } catch (err: any) {
//                     console.error("Error calling /transfers/calculate-summary:", err);
//                     const message = err.response?.data?.message || "Calculation failed.";
//                     const code = err.response?.data?.code;
//                     setApiError(message); // Set API error
//                     // Set user-facing error based on code or message
//                     setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message);
//                      // Reset amounts and summary on calculation failure
//                     // Keep the input that the user was typing? Maybe not, API failed.
//                     setSendAmount(isSending ? amount.toFixed(2) : ''); // Keep typed amount if sending, clear if receiving resulted in error
//                     setReceiveAmount(isSending ? '' : amount.toFixed(2)); // Keep typed amount if receiving, clear if sending resulted in error
//                     setSummary(currentInitialRates ? { ...currentInitialRates, sendAmount: 0, receiveAmount: 0 } : null); // Reset summary but keep rate context
//                 } finally {
//                     setIsCalculating(false);
//                     console.log("Calculation process finished.");
//                 }
//             }, 500), // 500ms debounce delay
//         [] // No dependencies: the function reads latest state via refs
//     );

//     // --- Input Handlers ---
//     // Use useCallback to memoize handlers, preventing recreation on re-renders unless dependencies change.
//     const handleAmountChange = useCallback((value: string, type: 'send' | 'receive') => {
//         // Allow empty input, numbers, and max 2 decimal places
//         if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
//             setLastEdited(type); // Track which field was last edited

//             if (type === 'send') {
//                 setSendAmount(value);
//                 // If send amount is cleared, clear receive amount too
//                 if (value === '') setReceiveAmount('');
//             } else {
//                 setReceiveAmount(value);
//                 // If receive amount is cleared, clear send amount too
//                  if (value === '') setSendAmount('');
//             }

//             const amountNum = parseFloat(value);

//             if (!isNaN(amountNum) && amountNum > 0) {
//                  // Clear immediate validation errors (like "enter amount") before debouncing
//                  setError(prev => (prev === "Please enter an amount." ? null : prev));
//                 debouncedCalculate(amountNum, type === 'send');
//             } else {
//                 // Cancel any pending calculation if input becomes invalid or zero
//                 debouncedCalculate.cancel();
//                 setIsCalculating(false); // Ensure calculating state is off

//                 // Clear the *other* field if the current one is cleared/invalidated
//                 if (type === 'send') setReceiveAmount('');
//                 else setSendAmount('');

//                 // Reset summary data, keeping initial rate context if available
//                 setSummary(prev => initialRateSummaryRef.current ? { ...initialRateSummaryRef.current, sendAmount: 0, receiveAmount: 0 } : null);

//                 // Don't clear "Insufficient balance" error just because input is cleared
//                 setError(prev => (prev && prev !== "Insufficient balance." ? null : prev));
//                 setApiError(null); // Clear API errors if input is cleared
//             }
//         }
//     }, [debouncedCalculate]); // Recreate if debouncedCalculate instance changes (shouldn't with empty deps)

//     const handleFocus = useCallback((type: 'send' | 'receive') => {
//         if (type === 'send') setIsSendFocused(true);
//         else setIsReceiveFocused(true);
//     }, []); // No dependencies needed

//     const handleBlur = useCallback((type: 'send' | 'receive') => {
//         if (type === 'send') setIsSendFocused(false);
//         else setIsReceiveFocused(false);
//     }, []); // No dependencies needed

//     // --- Continue Logic ---
//     const handleContinue = useCallback(() => {
//         console.log("Continue button clicked.");

//         // Re-check conditions here for robustness
//         const currentSendAmount = parseFloat(sendAmount);
//         const currentReceiveAmount = parseFloat(receiveAmount);
//         const isValidAmountEntered = (currentSendAmount > 0 || currentReceiveAmount > 0);

//         if (!isValidAmountEntered) {
//             setError("Please enter an amount.");
//             return;
//         }

//         // Don't proceed if actively calculating, even if amounts look valid momentarily
//         if (isCalculating) {
//              console.log("Continue blocked: Calculation in progress.");
//              return;
//         }

//         // Don't proceed if there's a blocking API error (not related to rates or balance)
//         const isBlockingApiError = apiError && apiError !== "Failed to load initial exchange rates." && apiError !== "Insufficient balance.";
//         if (isBlockingApiError) {
//             setError(apiError); // Ensure user sees the blocking API error
//             console.log("Continue blocked: Blocking API error exists.");
//             return;
//         }

//         // Don't proceed on insufficient balance error
//         if (error === "Insufficient balance.") {
//             console.log("Continue blocked: Insufficient balance error exists.");
//             return;
//         }

//         // Ensure we have a valid, calculated summary with positive amounts
//         if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//             setError("Could not calculate transfer details. Please re-enter the amount or wait for calculation.");
//             console.log("Continue blocked: Invalid or missing summary.", summary);
//             // Optionally clear amounts if summary is bad
//              // setSendAmount('');
//              // setReceiveAmount('');
//             return;
//         }

//         // Final balance check using the *latest* source account balance and calculated send amount
//         if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//             setError("Insufficient balance.");
//             console.log("Continue blocked: Insufficient balance detected on final check.");
//             return;
//         }

//         console.log("Validation passed, saving summary and navigating...");
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));

//         const needsReason = recipient?.currency.code === 'INR'; // Check recipient from state
//         const nextPath = needsReason
//             ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//             : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);

//     }, [sendAmount, receiveAmount, isCalculating, apiError, error, summary, sourceAccount, recipient, balanceId, recipientId, router]); // Dependencies for handleContinue

//     // --- Derived State for UI Logic (Keep simple, useMemo likely overkill) ---
//     // Show rate info if we have *either* initial rates *or* a calculated summary, and no critical rate fetch error
//     const rateContext = summary ?? initialRateSummary;
//     const showRates = !!rateContext && !(apiError && apiError === "Failed to load initial exchange rates." && !rateContext);
//     // Show prompt only if initial rates are fetched, no amounts entered, not calculating, and no errors
//     const showInitialPrompt = !!initialRateSummary && !sendAmount && !receiveAmount && !isCalculating && !error && !apiError;
//     // Enable continue if we have a valid summary, positive amounts, not calculating, and no blocking errors
//     const canContinue = !!summary && summary.sendAmount > 0 && summary.receiveAmount > 0 && !isCalculating && error !== "Insufficient balance." && !apiError; // Simplified: only balance error blocks directly here, others checked in handler

//     // --- Format Rates for Display (Memoize if formatting becomes complex) ---
//     const formatRate = useCallback((rate: number | null | undefined, precision = 6): string => {
//         if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//         return rate.toFixed(precision);
//     }, []);
//     const formatComparisonRate = useCallback((rate: number | null | undefined, precision = 4): string => {
//          if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//          return rate.toFixed(precision);
//     }, []);

//     // --- Prepare display strings ---
//     const adjustedRateDisplay = rateContext ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(rateContext.exchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const liveRateDisplay = rateContext?.liveExchangeRate ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(rateContext.liveExchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const rateAdjustmentDisplay = rateContext?.rateAdjustmentApplied?.toFixed(2) ?? '0';

//     // --- Render Logic ---

//     // Initial Loading State (Skeleton)
//     if (isLoading) {
//         console.log("Rendering: Initial Loading Skeleton");
//         // Skeleton structure remains the same - this is good practice
//         return (
//              <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
//                   <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                      <Skeleton className="h-6 w-20 mb-4" />
//                      <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                          <Skeleton className="h-5 w-40 mb-1.5 bg-gray-200" />
//                          <Skeleton className="h-5 w-48 bg-gray-200" />
//                      </div>
//                      <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                      <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                      <Skeleton className="h-20 w-full rounded-lg mb-4 bg-gray-200" />
//                      <Skeleton className="h-4 w-1/2 mb-6 bg-gray-200" />
//                      <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" />
//                      <Skeleton className="h-12 w-full rounded-full bg-gray-300" />
//                   </div>
//              </div>
//           );
//     }

//     // Critical Error State (Account/Recipient Fetch Failed)
//     if (!sourceAccount || !recipient) {
//          console.log("Rendering: Critical Error Loading Account/Recipient");
//          // Error display structure remains the same
//          return (
//             <div className="bg-gray-50 min-h-screen">
//                  <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//                  <div className="p-10 text-center">
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10" role="alert">
//                         <strong className="font-bold mr-1">Error!</strong>
//                         <span className="block sm:inline">{error || "Error loading essential page details."}</span>
//                     </div>
//                     {/* Ensure balanceId exists for the back link, or provide a fallback */}
//                     <Link href={balanceId ? `/dashboard/balances/${balanceId}/send/select-recipient` : '/dashboard'} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                        <IoIosArrowBack size={18} className="mr-1"/> Go back
//                     </Link>
//                  </div>
//             </div>
//         );
//     }

//     // --- Main Render ---
//     console.log("Rendering: Main Send Amount Page Content", { summary, initialRateSummary, isCalculating, error, apiError, canContinue });
//     return (
//         <div className="SendAmount-Page pb-20 min-h-screen">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Back Link */}
//                 <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className="inline-flex items-center gap-1 mb-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
//                     <IoIosArrowBack size={18}/> Back
//                 </Link>

//                 {/* Rate Display Section */}
//                 <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//                     {/* Show rates if context exists and no critical load error */}
//                     {showRates && rateContext && (
//                         <>
//                             {adjustedRateDisplay && (
//                                 <div className="text-xs sm:text-sm font-medium p-1.5 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 inline-flex items-center gap-1.5 cursor-default" title={`Rate includes adjustment of ${rateAdjustmentDisplay}%. This is the rate applied to your transfer.`}>
//                                     <FaLock size={10} /> Our Rate: {adjustedRateDisplay}
//                                 </div>
//                             )}
//                             {liveRateDisplay && (
//                                 <div className="text-xs font-normal p-1.5 px-2.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
//                                     <FaInfoCircle size={10} /> Market Rate: {liveRateDisplay}
//                                 </div>
//                             )}
//                         </>
//                     )}
//                     {/* Specific message for initial rate load failure */}
//                     {apiError && apiError === "Failed to load initial exchange rates." && !rateContext && (
//                         <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//                             <AlertTriangle size={12} /> Error loading rates.
//                         </div>
//                     )}
//                      {/* Placeholder for spacing if no rates are shown */}
//                     {!showRates && !(apiError === "Failed to load initial exchange rates.") && (
//                          <div className="h-[50px]"></div>
//                      )}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                      <div data-testid="send-section">
//                           {/* Label indicates exactness only when calculation is done and successful */}
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary?.sendAmount > 0 && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {summary?.sendAmount > 0 && !isCalculating ? 'You send exactly' : 'You send'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isSendFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'} ${error === 'Insufficient balance.' ? 'border-orange-300 ring-orange-300' : ''}`}> {/* Highlight on balance error */}
//                             <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                   <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{sourceAccount.currency.code}</span>
//                              </div>
//                               {/* Input styling adjusted for focus, value presence, and last edited state */}
//                               <input type="text" inputMode="decimal" value={sendAmount} onChange={(e) => handleAmountChange(e.target.value, 'send')} onFocus={() => handleFocus('send')} onBlur={() => handleBlur('send')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out
//                                     ${ isSendFocused ? 'text-4xl lg:text-5xl text-primary' : (sendAmount && parseFloat(sendAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' }
//                                     ${ lastEdited === 'receive' && receiveAmount && parseFloat(receiveAmount) > 0 ? 'text-gray-500 font-medium' : 'text-black' }`} // Dim if the other field was last edited
//                                  placeholder="0" aria-label="Amount to send" data-testid="send-amount-input" />
//                          </div>
//                          {/* Available Balance */}
//                          <p className="text-xs text-gray-500 mt-1 ml-2">Available balance: <span className="font-medium">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code}</span></p>
//                      </div>

//                     {/* Recipient Gets Section */}
//                       <div data-testid="receive-section">
//                            {/* Label indicates exactness only when calculation is done and successful */}
//                           <label className={`block text-xs font-medium mb-1 ml-2 ${summary?.receiveAmount > 0 && !isCalculating ? 'text-gray-700' : 'text-gray-500'}`}>
//                               {recipient.nickname || recipient.accountHolderName} {summary?.receiveAmount > 0 && !isCalculating ? 'gets exactly' : 'gets approx.'}
//                           </label>
//                          <div className={`flex items-center p-3 border rounded-lg bg-white shadow-sm relative min-h-[72px] transition-shadow ${isReceiveFocused ? 'ring-2 ring-primary shadow-md' : 'border-gray-300'}`}>
//                              <div className="flex items-center space-x-2 mr-3 pr-3 border-r border-gray-200 flex-shrink-0">
//                                  <Image src={recipient.currency.flagImage || '/assets/icon/generic.svg'} alt={`${recipient.currency.code} flag`} width={24} height={24} className="rounded-full" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                  <span className="font-semibold text-base text-gray-800">{recipient.currency.code}</span>
//                               </div>
//                                {/* Input styling adjusted */}
//                               <input type="text" inputMode="decimal" value={receiveAmount} onChange={(e) => handleAmountChange(e.target.value, 'receive')} onFocus={() => handleFocus('receive')} onBlur={() => handleBlur('receive')}
//                                  className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-200 ease-out
//                                      ${ isReceiveFocused ? 'text-4xl lg:text-5xl text-primary' : (receiveAmount && parseFloat(receiveAmount) > 0) ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400' }
//                                      ${ lastEdited === 'send' && sendAmount && parseFloat(sendAmount) > 0 ? 'text-gray-500 font-medium' : 'text-black' }`} // Dim if the other field was last edited
//                                  placeholder="0" aria-label="Amount recipient gets" data-testid="receive-amount-input" />
//                          </div>
//                          {/* Recipient Account Info */}
//                          {recipient.accountNumber && <p className="text-xs text-gray-500 mt-1 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//                      </div>

//                     {/* Paying With Section */}
//                     <div className="mt-6 mb-6">
//                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-2">Paying with</label>
//                          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
//                               <Image src={sourceAccount.currency.flagImage || '/assets/icon/generic.svg'} alt={`${sourceAccount.currency.code} flag`} width={32} height={32} className="rounded-full mr-3" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                                <div>
//                                    <p className="text-sm font-semibold text-gray-800">Your {sourceAccount.currency.code} balance</p>
//                                    <p className="text-xs text-gray-600">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code} available</p>
//                                </div>
//                          </div>
//                     </div>

//                     {/* Initial Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700 border border-blue-200 mt-6 flex items-center justify-center gap-2">
//                             <IoIosInformationCircleOutline className="inline mb-0.5 flex-shrink-0" size={18}/> Enter <span className="font-semibold">either amount</span> to calculate your transfer.
//                          </div>
//                     )}

//                     {/* Error Display Section */}
//                     {/* User-facing errors (validation, balance) */}
//                     {error && (
//                          <p className={`text-sm mt-4 text-center p-2.5 rounded-md border ${ error === "Insufficient balance." ? "text-orange-800 bg-orange-50 border-orange-300" : "text-red-800 bg-red-50 border-red-300" } flex items-center justify-center gap-2`} data-testid="error-message">
//                              <AlertTriangle size={16} className={`${ error === "Insufficient balance." ? "text-orange-500" : "text-red-500" }`}/>
//                              {error}
//                          </p>
//                      )}
//                     {/* API errors (calculation failure, non-balance issues), shown only if no user-facing error is present */}
//                      {apiError && !error && apiError !== "Failed to load initial exchange rates." && (
//                         <p className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2" data-testid="api-error-message">
//                             <AlertTriangle size={16} className="text-red-500"/>
//                             {apiError}
//                         </p>
//                     )}

//                     {/* Continue Button */}
//                     <button
//                         onClick={handleContinue}
//                         // Disable logic refined: disable if calculating, or if continue condition isn't met (includes having a valid summary, positive amounts, no blocking errors)
//                         disabled={isCalculating || !canContinue}
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg
//                             ${ (canContinue && !isCalculating) ? 'bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg'
//                             : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
//                         data-testid="continue-button"
//                     >
//                         {/* Show loader only when actively calculating *after* user input */}
//                         {isCalculating && (sendAmount || receiveAmount) ? (
//                              <div className="flex items-center justify-center">
//                                  <Loader2 size={20} className="animate-spin mr-2" /> Calculating...
//                              </div>
//                         ) : 'Continue'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { IoIosArrowBack, IoIosInformationCircleOutline } from 'react-icons/io';
// import { Loader2, AlertTriangle } from 'lucide-react';

// // Hooks & Logic
// import { useSendAmountLogic, SendSummary } from '../../../../../hooks/useSendAmountLogic'; // Adjust path

// // Components
// import DashboardHeader from '@/app/dashboard/components/layout/DashboardHeader'; // Adjust path
// import RateDisplay from '../../../../components/send/RateDisplay'; // Adjust path
// import AmountInput from '../../../../components/send/AmountInput'; // Adjust path
// import PayingWithDisplay from '../../../../components/send/PayingWithDisplay'; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay'];

// interface SendAmountParams {
//     balanceId: string;
// }

// export default function SendAmountPage() {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<SendAmountParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');

//     // --- Custom Hook for Data and Logic ---
//     const {
//         sourceAccount,
//         recipient,
//         summary, // Latest calculated summary
//         initialRateSummary, // Rate context before input
//         isLoading, // Initial data loading
//         isCalculating, // Debounced calculation active
//         error: logicError, // User-facing errors from hook (validation, balance)
//         apiError, // API errors from hook
//         calculateSummary, // Debounced calculation function
//         cancelCalculation, // Function to cancel pending calculation
//         setError: setLogicError // Function to set error in the hook
//     } = useSendAmountLogic(balanceId, recipientId);

//     // --- UI State ---
//     const [sendAmount, setSendAmount] = useState<string>('');
//     const [receiveAmount, setReceiveAmount] = useState<string>('');
//     const [lastEdited, setLastEdited] = useState<'send' | 'receive' | null>(null);
//     const [isSendFocused, setIsSendFocused] = useState(false);
//     const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//     // --- Derived State for UI ---
//     const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
//     const showInitialPrompt = !!initialRateSummary && !sendAmount && !receiveAmount && !isCalculating && !logicError && !apiError;
//     const isInsufficientBalanceError = logicError === "Insufficient balance.";

//     // Effect to sync hook summary changes back to the *other* input field
//     useEffect(() => {
//         if (summary) {
//             const newSend = summary.sendAmount.toFixed(2);
//             const newReceive = summary.receiveAmount.toFixed(2);

//             // Only update the field that wasn't last edited to avoid feedback loops
//             // and allow the user's input to persist during calculation.
//             if (lastEdited === 'send' && receiveAmount !== newReceive) {
//                 setReceiveAmount(newReceive);
//             } else if (lastEdited === 'receive' && sendAmount !== newSend) {
//                 setSendAmount(newSend);
//             }
//         }
//          // Only run when summary changes or lastEdited changes
//     }, [summary, lastEdited]); // Removed sendAmount, receiveAmount deps

//     // --- Input Handlers ---
//     const handleAmountChange = useCallback(async (value: string, type: 'send' | 'receive') => {
//         setLastEdited(type); // Track last edited field

//         if (type === 'send') setSendAmount(value);
//         else setReceiveAmount(value);

//         const amountNum = parseFloat(value);

//         if (!isNaN(amountNum) && amountNum > 0) {
//              // Clear immediate "enter amount" error before debouncing
//             setLogicError(prev => (prev === "Please enter an amount." ? null : prev));
//             // Trigger calculation via the hook
//             calculateSummary(amountNum, type === 'send');
//         } else {
//             // Cancel pending calculation, clear other field, clear summary/errors in hook
//             cancelCalculation();
//             if (type === 'send') setReceiveAmount('');
//             else setSendAmount('');
//             // Let hook handle clearing summary/errors on invalid input
//             calculateSummary(0, true); // Trigger calc with 0 to clear state in hook
//         }
//     }, [calculateSummary, cancelCalculation, setLogicError]); // Added setLogicError dependency

//     const handleFocus = useCallback((type: 'send' | 'receive') => {
//         if (type === 'send') setIsSendFocused(true);
//         else setIsReceiveFocused(true);
//     }, []);

//     const handleBlur = useCallback((type: 'send' | 'receive') => {
//         if (type === 'send') setIsSendFocused(false);
//         else setIsReceiveFocused(false);
//     }, []);

//     // --- Continue Logic ---
//     const handleContinue = useCallback(() => {
//         console.log("Continue clicked. Checking conditions...");
//         const currentSendAmount = parseFloat(sendAmount);
//         const currentReceiveAmount = parseFloat(receiveAmount);

//         if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//             setLogicError("Please enter a valid amount and wait for calculation.");
//             console.log("Continue blocked: Invalid or missing summary.", summary);
//             return;
//         }
//         if (isCalculating) {
//              console.log("Continue blocked: Calculation in progress.");
//              // Optionally show a message, though button is disabled
//              return;
//         }
//          if (isInsufficientBalanceError) {
//             console.log("Continue blocked: Insufficient balance error.");
//              return; // Already handled by button disabled state, but good for clarity
//          }
//          // Check for other blocking API errors (not just rate load fail)
//          const isBlockingApiError = apiError && apiError !== "Failed to load initial exchange rates.";
//          if (isBlockingApiError) {
//              setLogicError(apiError); // Show API error prominently
//              console.log("Continue blocked: Blocking API error.");
//              return;
//          }
//         // Final balance check just in case
//         if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//             setLogicError("Insufficient balance.");
//             console.log("Continue blocked: Final balance check failed.");
//             return;
//         }

//         console.log("Validation passed. Saving summary:", summary);
//         localStorage.setItem('sendTransferSummary', JSON.stringify(summary));

//         const needsReason = recipient?.currency.code === 'INR';
//         const nextPath = needsReason
//             ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//             : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//         router.push(nextPath);

//     }, [sendAmount, receiveAmount, summary, isCalculating, logicError, apiError, sourceAccount, recipient, balanceId, recipientId, router, setLogicError, isInsufficientBalanceError]); // Added dependencies

//      // Enable continue button logic (moved outside handler for clarity)
//      const canContinue = useMemo(() => (
//         !!summary &&
//         summary.sendAmount > 0 &&
//         summary.receiveAmount > 0 &&
//         !isCalculating &&
//         !isInsufficientBalanceError &&
//         !(apiError && apiError !== "Failed to load initial exchange rates.") // Not blocked by other API errors
//     ), [summary, isCalculating, isInsufficientBalanceError, apiError]);

//     // --- Render Logic ---

//     // Initial Loading Skeleton
//      if (isLoading) {
//          // Simplified skeleton, assuming structure is known
//         return (
//              <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
//                   <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                      {/* Mimic structure: Back link, Rate Display Area, 2x Amount Inputs, Paying With, Button */}
//                      <Skeleton className="h-6 w-20 mb-4" />
//                      <Skeleton className="h-[50px] w-1/2 ml-auto mb-4 bg-gray-200" /> {/* Rate Area */}
//                      <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-200" /> {/* Amount Input 1 */}
//                      <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-200" /> {/* Amount Input 2 */}
//                      <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" /> {/* Paying With */}
//                      <Skeleton className="h-12 w-full rounded-full bg-gray-300" /> {/* Button */}
//                   </div>
//              </div>
//         );
//      }

//     // Critical Error State (Account/Recipient Fetch Failed - handled by hook's error state)
//      if (!sourceAccount || !recipient) {
//          return (
//             <div className="bg-gray-50 min-h-screen">
//                  <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//                  <div className="p-10 text-center">
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10" role="alert">
//                         <strong className="font-bold mr-1">Error!</strong>
//                         <span className="block sm:inline">{logicError || apiError || "Error loading essential page details."}</span>
//                     </div>
//                     <Link href={balanceId ? `/dashboard/balances/${balanceId}/send/select-recipient` : '/dashboard'} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover">
//                        <IoIosArrowBack size={18} className="mr-1"/> Go back
//                     </Link>
//                  </div>
//             </div>
//         );
//      }

//     // --- Main Render ---
//     return (
//         <div className="SendAmount-Page pb-20 min-h-screen">
//             <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//             <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//                 {/* Rate Display */}
//                 <RateDisplay rateContext={rateContext} apiError={apiError}/>

//                 {/* Main Content Area */}
//                 <div className="space-y-4">
//                     {/* You Send Section */}
//                     <AmountInput
//                         label="You send"
//                         labelSuffix={summary?.sendAmount && !isCalculating ? 'exactly' : ''}
//                         currencyCode={sourceAccount.currency.code}
//                         flagImage={sourceAccount.currency.flagImage}
//                         value={sendAmount}
//                         onValueChange={(val) => handleAmountChange(val, 'send')}
//                         onFocus={() => handleFocus('send')}
//                         onBlur={() => handleBlur('send')}
//                         isFocused={isSendFocused}
//                         isDimmed={lastEdited === 'receive'}
//                         hasError={isInsufficientBalanceError}
//                         inputId="send-amount"
//                         data-testid="send-amount-input"
//                     />
//                      {/* Available Balance (Remains under specific input) */}
//                      <p className="text-gray-500 text-end -mt-2 dark:text-gray-300">Available balance:  <span className="font-medium text-secondary underline underline-offset-4 cursor-pointer">{sourceAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {sourceAccount.currency.code}</span></p>

//                     {/* Recipient Gets Section */}
//                     <AmountInput
//                         label={`${recipient.nickname || recipient.accountHolderName}`}
//                         labelPrefix="" // Custom prefix here
//                         labelSuffix={summary?.receiveAmount && !isCalculating ? 'gets exactly' : 'gets approx.'}
//                         currencyCode={recipient.currency.code}
//                         flagImage={recipient.currency.flagImage}
//                         value={receiveAmount}
//                         onValueChange={(val) => handleAmountChange(val, 'receive')}
//                         onFocus={() => handleFocus('receive')}
//                         onBlur={() => handleBlur('receive')}
//                         isFocused={isReceiveFocused}
//                         isDimmed={lastEdited === 'send'}
//                         inputId="receive-amount"
//                         data-testid="receive-amount-input"
//                     />
//                     {/* Recipient Account Info (Remains under specific input) */}
//                     {recipient.accountNumber && <p className="text-gray-500 text-end dark:text-gray-300 -mt-2 ml-2">Account ending in {recipient.accountNumber.slice(-4)}</p>}

//                     {/* Paying With Section */}
//                     <PayingWithDisplay sourceAccount={sourceAccount} />

//                      {/* Initial Prompt */}
//                      {showInitialPrompt && (
//                          <div className="p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700 border border-blue-200 mt-6 flex items-center justify-center gap-2">
//                             <IoIosInformationCircleOutline className="inline mb-0.5 flex-shrink-0" size={18}/> Enter <span className="font-semibold">either amount</span> to calculate your transfer.
//                          </div>
//                     )}

//                     {/* Error Display Section */}
//                     {logicError && (
//                          <p className={`text-sm mt-4 text-center p-2.5 rounded-md border ${ isInsufficientBalanceError ? "text-orange-800 bg-orange-50 border-orange-300" : "text-red-800 bg-red-50 border-red-300" } flex items-center justify-center gap-2`} data-testid="error-message">
//                              <AlertTriangle size={16} className={`${ isInsufficientBalanceError ? "text-orange-500" : "text-red-500" }`}/>
//                              {logicError}
//                          </p>
//                      )}
//                     {/* Show API errors only if no primary logic error */}
//                      {apiError && !logicError && apiError !== "Failed to load initial exchange rates." && (
//                         <p className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2" data-testid="api-error-message">
//                             <AlertTriangle size={16} className="text-red-500"/>
//                             {apiError}
//                         </p>
//                     )}

//                     {/* Continue Button */}
//                     <button
//                         onClick={handleContinue}
//                         disabled={!canContinue || isCalculating} // Simplified disabled logic
//                         className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg
//                             ${ (canContinue && !isCalculating) ? 'bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg'
//                             : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
//                         data-testid="continue-button"
//                     >
//                          {/* Show loader only when calculating *due to user input* */}
//                         {isCalculating && (sendAmount || receiveAmount) ? (
//                              <div className="flex items-center justify-center">
//                                  <Loader2 size={20} className="animate-spin mr-2" /> Calculating...
//                              </div>
//                         ) : 'Continue'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { Loader2, AlertTriangle } from "lucide-react";

// // Hooks & Logic
// import {
//   useSendAmountLogic,
//   SendSummary,
// } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { IoClose } from "react-icons/io5";

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// interface SendAmountParams {
//   balanceId: string;
// }

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   const params = useParams<SendAmountParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary, // Latest calculated summary
//     initialRateSummary, // Rate context before input
//     isLoading, // Initial data loading
//     isCalculating, // Debounced calculation active
//     error: logicError, // User-facing errors from hook (validation, balance)
//     apiError, // API errors from hook
//     calculateSummary, // Debounced calculation function
//     cancelCalculation, // Function to cancel pending calculation
//     setError: setLogicError, // Function to set error in the hook
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
//   const showInitialPrompt =
//     !!initialRateSummary &&
//     !sendAmount &&
//     !receiveAmount &&
//     !isCalculating &&
//     !logicError &&
//     !apiError;
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//     if (summary) {
//       const newSend = summary.sendAmount.toFixed(2);
//       const newReceive = summary.receiveAmount.toFixed(2);

//       // Only update the field that wasn't last edited to avoid feedback loops
//       // and allow the user's input to persist during calculation.
//       if (lastEdited === "send" && receiveAmount !== newReceive) {
//         setReceiveAmount(newReceive);
//       } else if (lastEdited === "receive" && sendAmount !== newSend) {
//         setSendAmount(newSend);
//       }
//     }
//     // Only run when summary changes or lastEdited changes
//   }, [summary, lastEdited]); // Removed sendAmount, receiveAmount deps

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     async (value: string, type: "send" | "receive") => {
//       setLastEdited(type); // Track last edited field

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);

//       if (!isNaN(amountNum) && amountNum > 0) {
//         // Clear immediate "enter amount" error before debouncing
//         setLogicError((prev) =>
//           prev === "Please enter an amount." ? null : prev
//         );
//         // Trigger calculation via the hook
//         calculateSummary(amountNum, type === "send");
//       } else {
//         // Cancel pending calculation, clear other field, clear summary/errors in hook
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         // Let hook handle clearing summary/errors on invalid input
//         calculateSummary(0, true); // Trigger calc with 0 to clear state in hook
//       }
//     },
//     [calculateSummary, cancelCalculation, setLogicError]
//   ); // Added setLogicError dependency

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []);

//   const handleBlur = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//   }, []);

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2); // Format to 2 decimal places
//       setSendAmount(availableBalance);
//       handleAmountChange(availableBalance, "send"); // Trigger calculation
//       setLastEdited("send"); // Update last edited to 'send'
//       setIsSendFocused(true); // Focus on the input after setting the value
//     }
//   }, [sourceAccount, handleAmountChange]);

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     console.log("Continue clicked. Checking conditions...");
//     const currentSendAmount = parseFloat(sendAmount);
//     const currentReceiveAmount = parseFloat(receiveAmount);

//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       setLogicError("Please enter a valid amount and wait for calculation.");
//       console.log("Continue blocked: Invalid or missing summary.", summary);
//       return;
//     }
//     if (isCalculating) {
//       console.log("Continue blocked: Calculation in progress.");
//       // Optionally show a message, though button is disabled
//       return;
//     }
//     if (isInsufficientBalanceError) {
//       console.log("Continue blocked: Insufficient balance error.");
//       return; // Already handled by button disabled state, but good for clarity
//     }
//     // Check for other blocking API errors (not just rate load fail)
//     const isBlockingApiError =
//       apiError && apiError !== "Failed to load initial exchange rates.";
//     if (isBlockingApiError) {
//       setLogicError(apiError); // Show API error prominently
//       console.log("Continue blocked: Blocking API error.");
//       return;
//     }
//     // Final balance check just in case
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance.");
//       console.log("Continue blocked: Final balance check failed.");
//       return;
//     }

//     console.log("Validation passed. Saving summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//       ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//       : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     sendAmount,
//     receiveAmount,
//     summary,
//     isCalculating,
//     logicError,
//     apiError,
//     sourceAccount,
//     recipient,
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//     isInsufficientBalanceError,
//   ]); // Added dependencies

//   // Enable continue button logic (moved outside handler for clarity)
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !isInsufficientBalanceError &&
//       !(apiError && apiError !== "Failed to load initial exchange rates."), // Not blocked by other API errors
//     [summary, isCalculating, isInsufficientBalanceError, apiError]
//   );

//   // --- Render Logic ---

//   // Initial Loading Skeleton
//   if (isLoading) {
//     // Simplified skeleton, assuming structure is known
//     return (
//       <div className="p-10 bg-gray-50 min-h-screen animate-pulse">
//         <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//           {/* Mimic structure: Back link, Rate Display Area, 2x Amount Inputs, Paying With, Button */}
//           <Skeleton className="h-[40px] w-1/2 ml-auto mb-4 bg-gray-200" />
//           <Skeleton className="h-[40px] w-1/2 ml-auto mb-4 bg-gray-200" />
//           {/* Rate Area */}
//           <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-200" />
//           {/* Amount Input 1 */}
//           <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-200" />
//           {/* Amount Input 2 */}
//           <Skeleton className="h-16 w-full rounded-lg mb-6 bg-gray-200" />
//           {/* Paying With */}
//           <Skeleton className="h-12 w-full rounded-full bg-gray-300" />
//           {/* Button */}
//         </div>
//       </div>
//     );
//   }

//   // Critical Error State (Account/Recipient Fetch Failed - handled by hook's error state)
//   if (!sourceAccount || !recipient) {
//     return (
//       <div className="bg-gray-50 min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10"
//             role="alert"
//           >
//             <strong className="font-bold mr-1">Error!</strong>
//             <span className="block sm:inline">
//               {logicError ||
//                 apiError ||
//                 "Error loading essential page details."}
//             </span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard"
//             }
//             className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover"
//           >
//             <IoIosArrowBack size={18} className="mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <div className="SendAmount-Page pb-20 min-h-screen">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       <div className="container mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//         {/* Rate Display */}
//         <RateDisplay rateContext={rateContext} apiError={apiError} />

//         {/* Main Content Area */}
//         <div className="space-y-4">
//           {/* You Send Section */}
//           <AmountInput
//             label="You send"
//             labelSuffix={summary?.sendAmount && !isCalculating ? "exactly" : ""}
//             currencyCode={sourceAccount.currency.code}
//             flagImage={sourceAccount.currency.flagImage}
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive"}
//             hasError={isInsufficientBalanceError}
//             inputId="send-amount"
//             data-testid="send-amount-input"
//           />
//           {/* Available Balance (Remains under specific input) */}
//           <p className="text-gray-500 text-end -mt-2 dark:text-gray-300">
//             Available balance:
//             <button
//               onClick={handleAvailableBalanceClick}
//               className="font-medium text-secondary underline underline-offset-4 cursor-pointer"
//             >
//               {sourceAccount.balance.toLocaleString(undefined, {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//               {sourceAccount.currency.code}
//             </button>
//           </p>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             label={`${recipient.nickname || recipient.accountHolderName}`}
//             labelPrefix="" // Custom prefix here
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating
//                 ? "gets exactly"
//                 : "gets approx."
//             }
//             currencyCode={recipient.currency.code}
//             flagImage={recipient.currency.flagImage}
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send"}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//           {/* Recipient Account Info (Remains under specific input) */}
//           {recipient.accountNumber && (
//             <p className="text-gray-500 text-end dark:text-gray-300 -mt-2 ml-2">
//               Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}

//           {/* Paying With Section */}
//           <PayingWithDisplay sourceAccount={sourceAccount} />

//           {/* Error Display Section */}
//           {logicError && (
//             <p className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//               <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                 <IoClose size={20} className="p-0.5 text-white size-8" />
//               </div>

//               <div className="text-gray block max-w-60">{logicError}</div>
//             </p>
//           )}
//           {/* Show API errors only if no primary logic error */}
//           {apiError &&
//             !logicError &&
//             apiError !== "Failed to load initial exchange rates." && (
//               <p
//                 className="text-red-800 text-sm mt-4 text-center bg-red-50 p-2.5 rounded-md border border-red-300 flex items-center justify-center gap-2"
//                 data-testid="api-error-message"
//               >
//                 <AlertTriangle size={16} className="text-red-500" />
//                 {apiError}
//               </p>
//             )}

//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating} // Simplified disabled logic
//             className={`w-full font-semibold py-3 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg
//                             ${
//                               canContinue && !isCalculating
//                                 ? "bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                             }`}
//             data-testid="continue-button"
//           >
//             {/* Show loader only when calculating *due to user input* */}
//             {isCalculating && (sendAmount || receiveAmount) ? (
//               <div className="flex items-center justify-center">
//                 <Loader2 size={20} className="animate-spin mr-2" />
//                 Calculating...
//               </div>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { Loader2, AlertTriangle } from "lucide-react";

// // Hooks & Logic
// import {
//   useSendAmountLogic,
//   SendSummary,
// } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { IoClose } from "react-icons/io5";

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// interface SendAmountParams {
//   balanceId: string;
// }

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   const params = useParams<SendAmountParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary, // Latest calculated summary
//     initialRateSummary, // Rate context before input
//     isLoading, // Initial data loading
//     isCalculating, // Debounced calculation active
//     error: logicError, // User-facing errors from hook (validation, balance)
//     apiError, // API errors from hook
//     calculateSummary, // Debounced calculation function
//     cancelCalculation, // Function to cancel pending calculation
//     setError: setLogicError, // Function to set error in the hook
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
//   const showInitialPrompt =
//     !!initialRateSummary &&
//     !sendAmount &&
//     !receiveAmount &&
//     !isCalculating &&
//     !logicError &&
//     !apiError;
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//     if (summary) {
//       const newSend = summary.sendAmount.toFixed(2);
//       const newReceive = summary.receiveAmount.toFixed(2);

//       // Only update the field that wasn't last edited to avoid feedback loops
//       // and allow the user's input to persist during calculation.
//       if (lastEdited === "send" && receiveAmount !== newReceive) {
//         setReceiveAmount(newReceive);
//       } else if (lastEdited === "receive" && sendAmount !== newSend) {
//         setSendAmount(newSend);
//       }
//     }
//     // Only run when summary changes or lastEdited changes
//   }, [summary, lastEdited]); // Removed sendAmount, receiveAmount deps

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     async (value: string, type: "send" | "receive") => {
//       setLastEdited(type); // Track last edited field

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);

//       if (!isNaN(amountNum) && amountNum > 0) {
//         // Clear immediate "enter amount" error before debouncing
//         setLogicError((prev) =>
//           prev === "Please enter an amount." ? null : prev
//         );
//         // Trigger calculation via the hook
//         calculateSummary(amountNum, type === "send");
//       } else {
//         // Cancel pending calculation, clear other field, clear summary/errors in hook
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         // Let hook handle clearing summary/errors on invalid input
//         calculateSummary(0, true); // Trigger calc with 0 to clear state in hook
//       }
//     },
//     [calculateSummary, cancelCalculation, setLogicError]
//   ); // Added setLogicError dependency

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []);

//   const handleBlur = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//   }, []);

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2); // Format to 2 decimal places
//       setSendAmount(availableBalance);
//       handleAmountChange(availableBalance, "send"); // Trigger calculation
//       setLastEdited("send"); // Update last edited to 'send'
//       setIsSendFocused(true); // Focus on the input after setting the value
//     }
//   }, [sourceAccount, handleAmountChange]);

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     console.log("Continue clicked. Checking conditions...");
//     const currentSendAmount = parseFloat(sendAmount);
//     const currentReceiveAmount = parseFloat(receiveAmount);

//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       setLogicError("Please enter a valid amount and wait for calculation.");
//       console.log("Continue blocked: Invalid or missing summary.", summary);
//       return;
//     }
//     if (isCalculating) {
//       console.log("Continue blocked: Calculation in progress.");
//       // Optionally show a message, though button is disabled
//       return;
//     }
//     if (isInsufficientBalanceError) {
//       console.log("Continue blocked: Insufficient balance error.");
//       return; // Already handled by button disabled state, but good for clarity
//     }
//     // Check for other blocking API errors (not just rate load fail)
//     const isBlockingApiError =
//       apiError && apiError !== "Failed to load initial exchange rates.";
//     if (isBlockingApiError) {
//       setLogicError(apiError); // Show API error prominently
//       console.log("Continue blocked: Blocking API error.");
//       return;
//     }
//     // Final balance check just in case
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance.");
//       console.log("Continue blocked: Final balance check failed.");
//       return;
//     }

//     console.log("Validation passed. Saving summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//       ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//       : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     sendAmount,
//     receiveAmount,
//     summary,
//     isCalculating,
//     logicError,
//     apiError,
//     sourceAccount,
//     recipient,
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//     isInsufficientBalanceError,
//   ]); // Added dependencies

//   // Enable continue button logic (moved outside handler for clarity)
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !isInsufficientBalanceError &&
//       !(apiError && apiError !== "Failed to load initial exchange rates."), // Not blocked by other API errors
//     [summary, isCalculating, isInsufficientBalanceError, apiError]
//   );

//   // --- Render Logic ---

//   // Initial Loading Skeleton
//   if (isLoading) {
//     // Simplified skeleton, assuming structure is known
//     return (
//       <div className="p-10 min-h-screen animate-pulse">
//         <div className="container bg-white dark:bg-background mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//           {/* Mimic structure: Back link, Rate Display Area, 2x Amount Inputs, Paying With, Button */}
//           <Skeleton className="h-[40px] w-1/2 ml-auto mb-4" />
//           <Skeleton className="h-[40px] w-1/2 ml-auto mb-4" />
//           {/* Rate Area */}
//           <Skeleton className="h-24 w-full rounded-lg mb-4" />
//           {/* Amount Input 1 */}
//           <Skeleton className="h-24 w-full rounded-lg mb-4" />
//           {/* Amount Input 2 */}
//           <Skeleton className="h-16 w-full rounded-lg mb-6" />
//           {/* Continue Button */}
//           <Skeleton className="h-16 w-full rounded-lg mb-6" />
//           {/* Paying With */}
//           <Skeleton className="h-12 w-full rounded-full" />
//           {/* Button */}
//         </div>
//       </div>
//     );
//   }

//   // Critical Error State (Account/Recipient Fetch Failed - handled by hook's error state)
//   if (!sourceAccount || !recipient) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10"
//             role="alert"
//           >
//             <strong className="font-bold mr-1">Error!</strong>
//             <span className="block sm:inline">
//               {logicError ||
//                 apiError ||
//                 "Error loading essential page details."}
//             </span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard"
//             }
//             className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover"
//           >
//             <IoIosArrowBack size={18} className="mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <div className="SendAmount-Page pb-20 min-h-screen">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       <div className="container mx-auto max-w-xl p-4 lg:pt-8 border rounded-2xl pb-10">
//         {/* Rate Display */}
//         <RateDisplay rateContext={rateContext} apiError={apiError} />

//         {/* Main Content Area */}
//         <div className="space-y-4">
//           {/* You Send Section */}
//           <AmountInput
//             label="You send"
//             labelSuffix={summary?.sendAmount && !isCalculating ? "exactly" : ""}
//             currencyCode={sourceAccount.currency.code}
//             flagImage={sourceAccount.currency.flagImage}
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive"}
//             hasError={isInsufficientBalanceError}
//             inputId="send-amount"
//             data-testid="send-amount-input"
//           />
//           {/* Available Balance (Remains under specific input) */}
//           <p className="text-gray-500 text-end -mt-2 capitalize dark:text-gray-300">
//             Available balance: &nbsp;
//             <button
//               onClick={handleAvailableBalanceClick}
//               className="font-bold text-green dark:text-primary underline underline-offset-4 cursor-pointer"
//             >
//               {sourceAccount.balance.toLocaleString(undefined, {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//               {sourceAccount.currency.code}
//             </button>
//           </p>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             label={`${recipient.nickname || recipient.accountHolderName}`}
//             labelPrefix="" // Custom prefix here
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating
//                 ? "gets exactly"
//                 : "gets approx"
//             }
//             currencyCode={recipient.currency.code}
//             flagImage={recipient.currency.flagImage}
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send"}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//           {/* Recipient Account Info (Remains under specific input) */}
//           {recipient.accountNumber && (
//             <p className="text-gray-500 capitalize text-end dark:text-gray-300 -mt-2 ml-2">
//               Account Number in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}

//           {/* Paying With Section */}
//           <PayingWithDisplay sourceAccount={sourceAccount} />

//           {/* Error Display Section with Close Icon */}
//           {logicError && (
//             <div className="relative">
//               {/* Make this div relative for absolute positioning of close button */}
//               <p className="flex bg-lightgray dark:bg-primarybox lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                   <IoClose
//                     size={20}
//                     className="p-0.5 text-white size-8"
//                   />
//                 </div>
//                 <div className="text-error block max-w-60">{logicError}</div>
//               </p>
//               <button
//                 onClick={() => setLogicError(null)} // Clear the error when close button is clicked
//                 className="absolute cursor-pointer md:right-3 right-2 top-2 md:top-3"
//                 aria-label="Close error message"
//               >
//                 <IoClose size={20} className="p-1 rounded-full text-gray fill-current hover:bg-green/8 dark:bg-white size-8"/>
//               </button>
//             </div>
//           )}

//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating}
//             className={`w-full font-semibold py-3 rounded-full mt-6 cursor-pointer transition-all duration-300 ease-in-out text-lg
//                             ${
//                               canContinue && !isCalculating
//                                 ? "bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                             }`}
//             data-testid="continue-button"
//           >
//             {/* Show loader only when calculating *due to user input* */}
//             {isCalculating && (sendAmount || receiveAmount) ? (
//               <div className="flex items-center justify-center">
//                 <Loader2 size={20} className="animate-spin mr-2" />
//                 Calculating...
//               </div>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { Loader2, AlertTriangle } from "lucide-react";

// // Hooks & Logic
// import {
//   useSendAmountLogic,
//   SendSummary,
// } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { IoClose } from "react-icons/io5";

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// interface SendAmountParams {
//   balanceId: string;
// }

// const SkeletonAmountInput = () => (
//   <div className="space-y-1 mb-2">
//     <Skeleton className="h-10 w-1/3" />
//     <Skeleton className="h-20 w-full" />
//     <Skeleton className="h-10 w-1/4 ml-auto" />
//   </div>
// );

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   const params = useParams<SendAmountParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary, // Latest calculated summary
//     initialRateSummary, // Rate context before input
//     isLoading, // Initial data loading
//     isCalculating, // Debounced calculation active
//     error: logicError, // User-facing errors from hook (validation, balance)
//     apiError, // API errors from hook
//     calculateSummary, // Debounced calculation function
//     cancelCalculation, // Function to cancel pending calculation
//     setError: setLogicError, // Function to set error in the hook
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
//   const showInitialPrompt =
//     !!initialRateSummary &&
//     !sendAmount &&
//     !receiveAmount &&
//     !isCalculating &&
//     !logicError &&
//     !apiError;
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//     if (summary) {
//       const newSend = summary.sendAmount.toFixed(2);
//       const newReceive = summary.receiveAmount.toFixed(2);

//       // Only update the field that wasn't last edited to avoid feedback loops
//       // and allow the user's input to persist during calculation.
//       if (lastEdited === "send" && receiveAmount !== newReceive) {
//         setReceiveAmount(newReceive);
//       } else if (lastEdited === "receive" && sendAmount !== newSend) {
//         setSendAmount(newSend);
//       }
//     }
//     // Only run when summary changes or lastEdited changes
//   }, [summary, lastEdited]); // Removed sendAmount, receiveAmount deps

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     async (value: string, type: "send" | "receive") => {
//       setLastEdited(type); // Track last edited field

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);

//       if (!isNaN(amountNum) && amountNum > 0) {
//         // Clear immediate "enter amount" error before debouncing
//         setLogicError((prev) =>
//           prev === "Please enter an amount." ? null : prev
//         );
//         // Trigger calculation via the hook
//         calculateSummary(amountNum, type === "send");
//       } else {
//         // Cancel pending calculation, clear other field, clear summary/errors in hook
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         // Let hook handle clearing summary/errors on invalid input
//         calculateSummary(0, true); // Trigger calc with 0 to clear state in hook
//       }
//     },
//     [calculateSummary, cancelCalculation, setLogicError]
//   ); // Added setLogicError dependency

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []);

//   const handleBlur = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//   }, []);

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2); // Format to 2 decimal places
//       setSendAmount(availableBalance);
//       handleAmountChange(availableBalance, "send"); // Trigger calculation
//       setLastEdited("send"); // Update last edited to 'send'
//       setIsSendFocused(true); // Focus on the input after setting the value
//     }
//   }, [sourceAccount, handleAmountChange]);

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     console.log("Continue clicked. Checking conditions...");
//     const currentSendAmount = parseFloat(sendAmount);
//     const currentReceiveAmount = parseFloat(receiveAmount);

//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       setLogicError("Please enter a valid amount and wait for calculation.");
//       console.log("Continue blocked: Invalid or missing summary.", summary);
//       return;
//     }
//     if (isCalculating) {
//       console.log("Continue blocked: Calculation in progress.");
//       // Optionally show a message, though button is disabled
//       return;
//     }
//     if (isInsufficientBalanceError) {
//       console.log("Continue blocked: Insufficient balance error.");
//       return; // Already handled by button disabled state, but good for clarity
//     }
//     // Check for other blocking API errors (not just rate load fail)
//     const isBlockingApiError =
//       apiError && apiError !== "Failed to load initial exchange rates.";
//     if (isBlockingApiError) {
//       setLogicError(apiError); // Show API error prominently
//       console.log("Continue blocked: Blocking API error.");
//       return;
//     }
//     // Final balance check just in case
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance.");
//       console.log("Continue blocked: Final balance check failed.");
//       return;
//     }

//     console.log("Validation passed. Saving summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//       ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//       : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     sendAmount,
//     receiveAmount,
//     summary,
//     isCalculating,
//     logicError,
//     apiError,
//     sourceAccount,
//     recipient,
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//     isInsufficientBalanceError,
//   ]); // Added dependencies

//   // Enable continue button logic (moved outside handler for clarity)
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !isInsufficientBalanceError &&
//       !(apiError && apiError !== "Failed to load initial exchange rates."), // Not blocked by other API errors
//     [summary, isCalculating, isInsufficientBalanceError, apiError]
//   );

//   // --- Render Logic ---

//   // Initial Loading Skeleton
//   if (isLoading) {
//     // Simplified skeleton, assuming structure is known
//     return (
//       <div className="p-10 min-h-screen animate-pulse">
//         <div className="container bg-white dark:bg-background mx-auto max-w-xl p-4 lg:px-8 lg:pt-8">
//           {/* Mimic structure: Back link, Rate Display Area, 2x Amount Inputs, Paying With, Button */}
//           <Skeleton className="h-[40px] w-1/2 ml-auto mb-4" />
//           <Skeleton className="h-[40px] w-1/2 ml-auto mb-4" />
//           {/* Rate Area */}
//           <SkeletonAmountInput />
//           <SkeletonAmountInput />
//           <Skeleton className="h-24 w-full rounded-lg mb-4" />
//           {/* Paying With */}
//           <Skeleton className="h-12 w-full rounded-full mb-4" />
//         </div>
//       </div>
//     );
//   }

//   // Critical Error State (Account/Recipient Fetch Failed - handled by hook's error state)
//   if (!sourceAccount || !recipient) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-10"
//             role="alert"
//           >
//             <strong className="font-bold mr-1">Error!</strong>
//             <span className="block sm:inline">
//               {logicError ||
//                 apiError ||
//                 "Error loading essential page details."}
//             </span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard"
//             }
//             className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover"
//           >
//             <IoIosArrowBack size={18} className="mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <div className="SendAmount-Page pb-20 min-h-screen">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       <div className="container mx-auto max-w-xl p-4 lg:pt-8 border rounded-2xl pb-10">
//         {/* Rate Display */}
//         <RateDisplay rateContext={rateContext} apiError={apiError} />

//         {/* Main Content Area */}
//         <div className="space-y-4">
//           {/* You Send Section */}
//           <AmountInput
//             label="You send"
//             labelSuffix={summary?.sendAmount && !isCalculating ? "exactly" : ""}
//             currencyCode={sourceAccount.currency.code}
//             flagImage={sourceAccount.currency.flagImage}
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive"}
//             hasError={isInsufficientBalanceError}
//             inputId="send-amount"
//             data-testid="send-amount-input"
//           />
//           {/* Available Balance (Remains under specific input) */}
//           <p className="text-gray-500 text-end -mt-2 capitalize dark:text-gray-300">
//             Available balance:
//             <button
//               onClick={handleAvailableBalanceClick}
//               className="font-bold text-green dark:text-primary underline underline-offset-4 cursor-pointer"
//             >
//               {sourceAccount.balance.toLocaleString(undefined, {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//               {sourceAccount.currency.code}
//             </button>
//           </p>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             label={`${recipient.nickname || recipient.accountHolderName}`}
//             labelPrefix="" // Custom prefix here
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating
//                 ? "gets exactly"
//                 : "gets approx"
//             }
//             currencyCode={recipient.currency.code}
//             flagImage={recipient.currency.flagImage}
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send"}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//           {/* Recipient Account Info (Remains under specific input) */}
//           {recipient.accountNumber && (
//             <p className="text-gray-500 capitalize text-end dark:text-gray-300 -mt-2 ml-2">
//               Account Number in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}

//           {/* Paying With Section */}
//           <PayingWithDisplay sourceAccount={sourceAccount} />

//           {/* Error Display Section with Close Icon */}
//           {logicError && (
//             <div className="relative">
//               {/* Make this div relative for absolute positioning of close button */}
//               <p className="flex bg-lightgray dark:bg-primarybox lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                   <IoClose size={20} className="p-0.5 text-white size-8" />
//                 </div>
//                 <div className="text-error block max-w-60">{logicError}</div>
//               </p>
//               <button
//                 onClick={() => setLogicError(null)} // Clear the error when close button is clicked
//                 className="absolute cursor-pointer md:right-3 right-2 top-2 md:top-3"
//                 aria-label="Close error message"
//               >
//                 <IoClose
//                   size={20}
//                   className="p-1 rounded-full text-gray fill-current hover:bg-green/8 dark:bg-white size-8"
//                 />
//               </button>
//             </div>
//           )}

//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating}
//             className={`w-full font-semibold py-3 h-14 rounded-full mt-6 cursor-pointer transition-all duration-300 ease-in-out text-lg
//                             ${
//                               canContinue && !isCalculating
//                                 ? "bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg"
//                                 : "bg-gray-300 dark:bg-background border text-gray-500 dark:text-gray-300 cursor-not-allowed"
//                             }`}
//             data-testid="continue-button"
//           >
//             {/* Show loader only when calculating *due to user input* */}
//             {isCalculating && (sendAmount || receiveAmount) ? (
//               <div className="flex items-center justify-center">
//                 <Loader2 size={20} className="animate-spin mr-2" />
//                 Calculating...
//               </div>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { Loader2 } from "lucide-react"; // Removed AlertTriangle as IoClose is used

// // Hooks & Logic
// import {
//   useSendAmountLogic,
//   // Removed unused SendSummary interface import here as it's likely defined in the hook file
// } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { IoClose } from "react-icons/io5";

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// interface SendAmountParams {
//   balanceId: string;
// }

// // Simplified Skeleton for Amount Input area
// const SkeletonAmountSection = () => (
//   <div className="space-y-4 mb-4">
//     {/* Mimic Rate Display area */}
//     <Skeleton className="h-16 w-full rounded-lg mb-4" />
//     {/* Mimic First Amount Input + available balance */}
//     <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/4" />
//       <Skeleton className="h-12 w-full rounded-lg" />
//       <Skeleton className="h-5 w-1/3 ml-auto" />
//     </div>
//     {/* Mimic Second Amount Input + account details */}
//      <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/3" />
//       <Skeleton className="h-12 w-full rounded-lg" />
//       <Skeleton className="h-5 w-1/2 ml-auto" />
//     </div>
//   </div>
// );

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   const params = useParams<SendAmountParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary, // Latest calculated summary
//     initialRateSummary, // Rate context before input
//     isLoading, // Initial data loading
//     isCalculating, // Debounced calculation active
//     error: logicError, // User-facing errors from hook (validation, balance)
//     apiError, // API errors from hook
//     calculateSummary, // Debounced calculation function
//     cancelCalculation, // Function to cancel pending calculation
//     setError: setLogicError, // Function to set error in the hook
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";
//   const displayError = logicError || apiError; // Combine errors for display

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//       // Only proceed if we have a calculated summary
//       if (!summary) return;

//       const newSend = summary.sendAmount.toFixed(2);
//       const newReceive = summary.receiveAmount.toFixed(2);

//       // Update the field that wasn't the last one edited.
//       // React's setState handles not re-rendering if the value is the same.
//       // No need to compare with current sendAmount/receiveAmount state here.
//       if (lastEdited === "send") {
//           setReceiveAmount(newReceive);
//       } else if (lastEdited === "receive") {
//           setSendAmount(newSend);
//       }
//       // If lastEdited is null (initial load/reset), this won't update fields, which is fine.
//   }, [summary, lastEdited]); // Dependencies are correct now

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     (value: string, type: "send" | "receive") => {
//       setLastEdited(type); // Track last edited field

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);
//       const isValidAmount = !isNaN(amountNum) && amountNum > 0;

//       // Clear non-balance related errors immediately on valid input attempt
//        if (isValidAmount && logicError && !isInsufficientBalanceError) {
//            setLogicError(null);
//        }

//       if (isValidAmount) {
//         // Trigger calculation via the hook
//         calculateSummary(amountNum, type === "send");
//       } else {
//         // Cancel pending calculation, clear other field
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         // Trigger calc with 0 to clear summary/rate state in the hook
//         calculateSummary(0, true);
//          // Set error only if input is explicitly invalid (not just empty)
//          if (value && isNaN(amountNum)) {
//             setLogicError("Please enter a valid number.");
//          } else if (logicError === "Please enter a valid number.") {
//              // Clear the specific 'valid number' error if field becomes empty
//              setLogicError(null);
//          }
//       }
//     },
//     // Added isInsufficientBalanceError to prevent clearing that specific error
//     [calculateSummary, cancelCalculation, setLogicError, logicError, isInsufficientBalanceError]
//   );

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []);

//   const handleBlur = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//     // Optional: If field is empty on blur, maybe set error?
//     // if (type === 'send' && !sendAmount) setLogicError("Please enter an amount.");
//     // else if (type === 'receive' && !receiveAmount) setLogicError("Please enter an amount.");
//   }, []);

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2);
//       setSendAmount(availableBalance); // Directly set state
//       setLastEdited("send"); // Mark as edited
//       // Manually trigger calculation after state update
//       handleAmountChange(availableBalance, "send");
//       // Focus is handled via state now, no need to imperatively focus
//       setIsSendFocused(true); // Set focus state for styling
//     }
//   }, [sourceAccount, handleAmountChange]); // Depends on handleAmountChange

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     // Use summary directly as source of truth for amounts
//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       setLogicError("Please enter a valid amount and wait for calculation.");
//       return;
//     }
//     if (isCalculating) {
//       return; // Button should be disabled, but double-check
//     }
//     if (isInsufficientBalanceError) {
//       return; // Button disabled
//     }
//      // Check for *any* API error state (could be rate fetch or other issues)
//     if (apiError) {
//         // Use the existing apiError message
//         setLogicError(`There was an issue: ${apiError}`);
//         return;
//     }
//     // Final balance check using the definitive summary data
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance."); // Should be caught earlier, but safeguard
//       return;
//     }

//     // If we pass all checks, clear any residual non-blocking errors
//     setLogicError(null);

//     console.log("Saving transfer summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//       ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//       : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     summary, // Use summary directly
//     isCalculating,
//     apiError, // Check any API error
//     sourceAccount,
//     recipient,
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//     isInsufficientBalanceError, // Depends on this derived state
//     // logicError removed as per lint rule, isInsufficientBalanceError covers the relevant part
//     // sendAmount/receiveAmount (local state) removed, rely on summary
//   ]); // Dependencies updated

//   // Enable continue button logic
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !isInsufficientBalanceError && // Check specific balance error
//       !apiError, // Ensure no API errors block continuation
//     [summary, isCalculating, isInsufficientBalanceError, apiError] // Dependencies updated
//   );

//   // --- Render Logic ---

//   // Initial Loading Skeleton
//   if (isLoading) {
//     return (
//       <div className="min-h-screen animate-pulse">
//          <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//           <div className="container mx-auto max-w-xl p-4 lg:pt-8 border rounded-2xl pb-10 mt-4">
//             <SkeletonAmountSection />
//             {/* Paying With Skeleton */}
//             <Skeleton className="h-16 w-full rounded-lg mb-4" />
//             {/* Button Skeleton */}
//             <Skeleton className="h-14 w-full rounded-full mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // Critical Error State (Account/Recipient Fetch Failed)
//   const criticalError = (!sourceAccount || !recipient) ? (logicError || apiError || "Error loading essential page details.") : null;
//   if (criticalError) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg relative max-w-md mx-auto mt-10 shadow-md"
//             role="alert"
//           >
//             <strong className="font-bold mr-2">Error!</strong>
//             <span className="block sm:inline">{criticalError}</span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard" // Fallback to general dashboard if balanceId somehow lost
//             }
//              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//           >
//             <IoIosArrowBack size={20} className="-ml-1 mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   // Now we are sure sourceAccount and recipient exist
//   return (
//     <div className="SendAmount-Page pb-20 min-h-screen">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       {/* Added mt-4 for spacing below header */}
//       <div className="container mx-auto max-w-xl p-4 lg:px-6 lg:pt-6 border dark:border-gray-700 rounded-2xl pb-10 mt-4 bg-white dark:bg-background shadow-sm">
//         {/* Rate Display */}
//         <RateDisplay rateContext={rateContext} apiError={apiError && !logicError ? apiError : null} /> {/* Show API error here only if no logicError */}

//         {/* Main Content Area */}
//         <div className="space-y-4 mt-4"> {/* Added mt-4 */}
//           {/* You Send Section */}
//           <AmountInput
//             label="You send"
//              labelSuffix={summary?.sendAmount && !isCalculating ? "exactly" : ""}
//             currencyCode={sourceAccount.currency.code}
//             flagImage={sourceAccount.currency.flagImage}
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive"}
//             hasError={isInsufficientBalanceError} // Highlight field on this specific error
//             inputId="send-amount"
//             data-testid="send-amount-input"
//             // Consider adding aria-describedby pointing to error/balance if needed
//           />
//           {/* Available Balance */}
//           <div className="text-right -mt-2 pr-1"> {/* Adjusted positioning */}
//              <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Available: </span>
//               <button
//                 onClick={handleAvailableBalanceClick}
//                 className="text-sm font-medium text-primary dark:text-primary-foreground hover:underline focus:outline-none focus:underline"
//                 aria-label={`Use available balance: ${sourceAccount.balance.toFixed(2)} ${sourceAccount.currency.code}`}
//               >
//                 {sourceAccount.balance.toLocaleString(undefined, {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })} {sourceAccount.currency.code}
//               </button>
//           </div>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             // Using nickname or name, ensuring fallback if somehow both are empty
//             label={recipient.nickname || recipient.accountHolderName || "Recipient"}
//             labelPrefix=""
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating
//                 ? "gets exactly"
//                 : "gets approx." // Abbreviated for space
//             }
//             currencyCode={recipient.currency.code}
//             flagImage={recipient.currency.flagImage}
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send"}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//            {/* Recipient Account Info (Optional) */}
//           {recipient.accountNumber && (
//              <p className="text-sm text-gray-600 dark:text-gray-400 text-right -mt-2 pr-1">
//                 Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}

//           {/* Paying With Section */}
//           <PayingWithDisplay sourceAccount={sourceAccount} />

//           {/* Error Display Section */}
//           {/* Show combined error state, prioritize logicError */}
//           {displayError && (
//              <div className={`relative p-4 rounded-lg border ${isInsufficientBalanceError ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300' : 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300'}`} role="alert">
//                  <div className="flex items-center">
//                     <IoIosInformationCircleOutline className={`w-5 h-5 mr-2 ${isInsufficientBalanceError ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
//                     <span className="flex-1 text-sm">{displayError}</span>
//                     <button
//                         onClick={() => {
//                             setLogicError(null);
//                             // Optionally clear apiError too, or let it persist if it's from initial load
//                         }}
//                         className="absolute top-1.5 right-1.5 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//                         aria-label="Dismiss error message"
//                     >
//                         <IoClose size={18} />
//                     </button>
//                  </div>
//              </div>
//           )}

//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating}
//             className={`w-full font-semibold py-3 h-14 rounded-full mt-6 transition-all duration-300 ease-in-out text-lg flex items-center justify-center
//                             ${
//                               canContinue && !isCalculating
//                                 ? "bg-primary text-secondary hover:bg-primary-hover shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                                 : "bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                             }`}
//             data-testid="continue-button"
//           >
//             {/* Show loader only when actively calculating */}
//             {isCalculating ? (
//               <>
//                 <Loader2 size={20} className="animate-spin mr-2" />
//                 Calculating...
//               </>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { Loader2 } from "lucide-react"; // Removed AlertTriangle as IoClose is used

// // Hooks & Logic
// import {
//   useSendAmountLogic,
//   // Removed unused SendSummary interface import here as it's likely defined in the hook file
// } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { IoClose } from "react-icons/io5";

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// // Type for URL parameters expected by this page
// // Adjusted to satisfy the constraint used by next/navigation's useParams
// interface SendAmountPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // Simplified Skeleton for Amount Input area
// const SkeletonAmountSection = () => (
//   <div className="space-y-4 mb-4">
//     {/* Mimic Rate Display area */}
//     <Skeleton className="h-16 w-full rounded-lg mb-4" />
//     {/* Mimic First Amount Input + available balance */}
//     <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/4" />
//       <Skeleton className="h-12 w-full rounded-lg" />
//       <Skeleton className="h-5 w-1/3 ml-auto" />
//     </div>
//     {/* Mimic Second Amount Input + account details */}
//      <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/3" />
//       <Skeleton className="h-12 w-full rounded-lg" />
//       <Skeleton className="h-5 w-1/2 ml-auto" />
//     </div>
//   </div>
// );

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   // Use the adjusted type for useParams
//   const params = useParams<SendAmountPageParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary, // Latest calculated summary
//     initialRateSummary, // Rate context before input
//     isLoading, // Initial data loading
//     isCalculating, // Debounced calculation active
//     error: logicError, // User-facing errors from hook (validation, balance)
//     apiError, // API errors from hook
//     calculateSummary, // Debounced calculation function
//     cancelCalculation, // Function to cancel pending calculation
//     setError: setLogicError, // Function to set error in the hook
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary; // Use calculated summary if available, else initial context
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";
//   const displayError = logicError || apiError; // Combine errors for display

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//       // Only proceed if we have a calculated summary
//       if (!summary) return;

//       const newSend = summary.sendAmount.toFixed(2);
//       const newReceive = summary.receiveAmount.toFixed(2);

//       // Update the field that wasn't the last one edited.
//       // React's setState handles not re-rendering if the value is the same.
//       if (lastEdited === "send") {
//           setReceiveAmount(newReceive);
//       } else if (lastEdited === "receive") {
//           setSendAmount(newSend);
//       }
//       // If lastEdited is null (initial load/reset), this won't update fields, which is fine.
//   }, [summary, lastEdited]);

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     (value: string, type: "send" | "receive") => {
//       setLastEdited(type); // Track last edited field

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);
//       const isValidAmount = !isNaN(amountNum) && amountNum > 0;

//       // Clear non-balance related errors immediately on valid input attempt
//        if (isValidAmount && logicError && !isInsufficientBalanceError) {
//            setLogicError(null);
//        }

//       if (isValidAmount) {
//         // Trigger calculation via the hook
//         calculateSummary(amountNum, type === "send");
//       } else {
//         // Cancel pending calculation, clear other field
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         // Trigger calc with 0 to clear summary/rate state in the hook
//         calculateSummary(0, true);
//          // Set error only if input is explicitly invalid (not just empty)
//          if (value && isNaN(amountNum)) {
//             setLogicError("Please enter a valid number.");
//          } else if (logicError === "Please enter a valid number.") {
//              // Clear the specific 'valid number' error if field becomes empty
//              setLogicError(null);
//          }
//       }
//     },
//     [calculateSummary, cancelCalculation, setLogicError, logicError, isInsufficientBalanceError]
//   );

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []);

//   const handleBlur = useCallback((type: "send" | "receive") => {
//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//     // Optional: If field is empty on blur, maybe set error?
//     // if (type === 'send' && !sendAmount) setLogicError("Please enter an amount.");
//     // else if (type === 'receive' && !receiveAmount) setLogicError("Please enter an amount.");
//   }, []);

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2);
//       setSendAmount(availableBalance); // Directly set state
//       setLastEdited("send"); // Mark as edited
//       // Manually trigger calculation after state update
//       handleAmountChange(availableBalance, "send");
//       setIsSendFocused(true); // Set focus state for styling
//     }
//   }, [sourceAccount, handleAmountChange]);

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     // Use summary directly as source of truth for amounts
//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       setLogicError("Please enter a valid amount and wait for calculation.");
//       return;
//     }
//     if (isCalculating) {
//       return; // Button should be disabled, but double-check
//     }
//     if (isInsufficientBalanceError) {
//       return; // Button disabled
//     }
//      // Check for *any* API error state (could be rate fetch or other issues)
//     if (apiError) {
//         // Use the existing apiError message
//         setLogicError(`There was an issue: ${apiError}`);
//         return;
//     }
//     // Final balance check using the definitive summary data
//     // Added check for sourceAccount just in case, though it should be defined here
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance."); // Should be caught earlier, but safeguard
//       return;
//     }

//     // If we pass all checks, clear any residual non-blocking errors
//     setLogicError(null);

//     console.log("Saving transfer summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     // Added check for recipient just in case, though it should be defined here
//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//     ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//     : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     summary,
//     isCalculating,
//     apiError,
//     sourceAccount,
//     recipient, // Added recipient as dependency
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//     isInsufficientBalanceError,
//   ]);

//   // Enable continue button logic
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !isInsufficientBalanceError &&
//       !apiError,
//     [summary, isCalculating, isInsufficientBalanceError, apiError]
//   );

//   // --- Render Logic ---

//   // Initial Loading Skeleton
//   if (isLoading) {
//     return (
//       <div className="min-h-screen animate-pulse">
//          <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//           <div className="container mx-auto max-w-xl p-4 lg:pt-8 border rounded-2xl pb-10 mt-4">
//             <SkeletonAmountSection />
//             {/* Paying With Skeleton */}
//             <Skeleton className="h-16 w-full rounded-lg mb-4" />
//             {/* Button Skeleton */}
//             <Skeleton className="h-14 w-full rounded-full mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // Critical Error State (Account/Recipient Fetch Failed)
//   // This check ensures sourceAccount and recipient are non-null in the main render below
//   const criticalError = (!sourceAccount || !recipient) ? (logicError || apiError || "Error loading essential page details.") : null;
//   if (criticalError) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg relative max-w-md mx-auto mt-10 shadow-md"
//             role="alert"
//           >
//             <strong className="font-bold mr-2">Error!</strong>
//             <span className="block sm:inline">{criticalError}</span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard"
//             }
//              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//           >
//             <IoIosArrowBack size={20} className="-ml-1 mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   // At this point, sourceAccount and recipient are guaranteed to be non-null due to the criticalError check above.
//   // We can safely use non-null assertions (!) where needed by TypeScript.
//   return (
//     <div className="SendAmount-Page">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       <div className="container mx-auto max-w-xl p-4 sm:p-6 mt-5 border rounded-2xl bg-white dark:bg-background">
//         {/* Rate Display */}
//         <RateDisplay rateContext={rateContext} apiError={apiError && !logicError ? apiError : null} />

//         {/* Main Content Area */}
//         <div className="space-y-4 mt-4">
//           {/* You Send Section */}
//           <AmountInput
//             label="You send"
//              labelSuffix={summary?.sendAmount && !isCalculating ? "exactly" : ""}
//             currencyCode={sourceAccount!.currency.code} // Use ! assertion
//             flagImage={sourceAccount!.currency.flagImage} // Use ! assertion
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive"}
//             hasError={isInsufficientBalanceError}
//             inputId="send-amount"
//             data-testid="send-amount-input"
//           />
//           {/* Available Balance */}
//           <div className="text-right -mt-4 pr-4">
//              <span className="text-sm text-gray-500 dark:text-gray-300">
//                 Available: </span>
//               <button
//                 onClick={handleAvailableBalanceClick}
//                 className="text-sm font-medium text-primary dark:text-primary cursor-pointer hover:underline focus:outline-none focus:underline"
//                 aria-label={`Use available balance: ${sourceAccount!.balance.toFixed(2)} ${sourceAccount!.currency.code}`} // Use ! assertion
//               >
//                 {sourceAccount!.balance.toLocaleString(undefined, { // Use ! assertion
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })} {sourceAccount!.currency.code} {/* Use ! assertion */}
//               </button>
//           </div>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             // Use ! assertion for recipient properties
//             label={recipient!.nickname || recipient!.accountHolderName || "Recipient"}
//             labelPrefix=""
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating
//                 ? "gets exactly"
//                 : "gets approx."
//             }
//             currencyCode={recipient!.currency.code} // Use ! assertion
//             flagImage={`/assets/icon/${recipient!.currency.code.toLowerCase()}.svg`} // Use ! assertion
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send"}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//            {/* Recipient Account Info (Optional) */}
//            {/* Use optional chaining ?. just in case accountNumber isn't always present */}
//           {recipient?.accountNumber && (
//              <p className="text-sm text-gray-500 dark:text-gray-300 text-right -mt-4 pr-4">
//                 Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}

//           {/* Paying With Section */}
//           {/* Use ! assertion as sourceAccount is guaranteed non-null here */}
//           <PayingWithDisplay sourceAccount={sourceAccount!} />

//           {/* Error Display Section */}
//           {displayError && (
//              <div className={`relative p-4 rounded-lg dark:border ${isInsufficientBalanceError ? 'bg-red-50  text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300' : 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300'}`} role="alert">
//                  <div className="flex items-center">
//                     <IoIosInformationCircleOutline className={`w-5 h-5 mr-2 ${isInsufficientBalanceError ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
//                     <span className="flex-1 text-sm">{displayError}</span>
//                     <button
//                         onClick={() => {
//                             setLogicError(null);
//                             // Clear only the logicError, API errors might persist from load
//                         }}
//                         className="absolute top-1.5 cursor-pointer right-1.5 p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
//                         aria-label="Dismiss error message"
//                     >
//                         <IoClose size={18} />
//                     </button>
//                  </div>
//              </div>
//           )}

//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating}
//             className={`flex items-center justify-center w-full bg-primary text-neutral-900 font-medium hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
//             data-testid="continue-button"
//           >
//             {isCalculating ? (
//               <>
//                  <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12 2V6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M12 18V22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 4.93L7.76 7.76"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 16.24L19.07 19.07"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M2 12H6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M18 12H22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 19.07L7.76 16.24"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 7.76L19.07 4.93"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                 <span>Calculating...</span>
//               </>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, { useState, useCallback, useMemo, useEffect, useRef } from "react"; // Import useRef
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { Loader2 } from "lucide-react";

// // Hooks & Logic
// import {
//   useSendAmountLogic,
// } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { IoClose } from "react-icons/io5";

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// interface SendAmountPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // Simplified Skeleton for Amount Input area
// const SkeletonAmountSection = () => (
//   <div className="space-y-4 mb-4">
//     {/* Mimic Rate Display area */}
//     <Skeleton className="h-16 w-full rounded-lg mb-4" />
//     {/* Mimic First Amount Input + available balance */}
//     <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/4" />
//       <Skeleton className="h-12 w-full rounded-lg" />
//       <Skeleton className="h-5 w-1/3 ml-auto" />
//     </div>
//     {/* Mimic Second Amount Input + account details */}
//      <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/3" />
//       <Skeleton className="h-12 w-full rounded-lg" />
//       <Skeleton className="h-5 w-1/2 ml-auto" />
//     </div>
//   </div>
// );

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   const params = useParams<SendAmountPageParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary,
//     initialRateSummary,
//     isLoading,
//     isCalculating,
//     error: logicError,
//     apiError,
//     calculateSummary,
//     cancelCalculation,
//     setError: setLogicError,
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Refs for Inputs and Timers ---
//   const sendInputRef = useRef<HTMLInputElement>(null);
//   const receiveInputRef = useRef<HTMLInputElement>(null);
//   const sendBlurTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const receiveBlurTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary;
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";
//   const displayError = logicError || apiError;

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//       if (!summary) return;
//       const newSend = summary.sendAmount.toFixed(2);
//       const newReceive = summary.receiveAmount.toFixed(2);
//       if (lastEdited === "send") {
//           setReceiveAmount(newReceive);
//       } else if (lastEdited === "receive") {
//           setSendAmount(newSend);
//       }
//   }, [summary, lastEdited]);

//    // --- Timer Cleanup ---
//    useEffect(() => {
//     // Clear timers when the component unmounts
//     return () => {
//       if (sendBlurTimerRef.current) clearTimeout(sendBlurTimerRef.current);
//       if (receiveBlurTimerRef.current) clearTimeout(receiveBlurTimerRef.current);
//     };
//   }, []);

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     (value: string, type: "send" | "receive") => {
//       setLastEdited(type);

//       // Clear existing blur timer for this input
//       const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);
//       const isValidAmount = !isNaN(amountNum) && amountNum > 0;

//        if (isValidAmount && logicError && !isInsufficientBalanceError) {
//            setLogicError(null);
//        }

//       if (isValidAmount) {
//         calculateSummary(amountNum, type === "send");

//         // Start new blur timer
//         timerRef.current = setTimeout(() => {
//           const inputRef = type === 'send' ? sendInputRef.current : receiveInputRef.current;
//           inputRef?.blur(); // Trigger blur on the specific input
//           timerRef.current = null; // Clear the stored timer ID after it fires
//         }, 1000); // 1 second delay

//       } else {
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         calculateSummary(0, true);
//          if (value && isNaN(amountNum)) {
//             setLogicError("Please enter a valid number.");
//          } else if (logicError === "Please enter a valid number.") {
//              setLogicError(null);
//          }
//       }
//     },
//     [calculateSummary, cancelCalculation, setLogicError, logicError, isInsufficientBalanceError] // Refs don't need to be dependencies
//   );

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     // Clear blur timer when input gains focus manually
//     const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }

//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []); // Refs don't need to be dependencies

//   const handleBlur = useCallback((type: "send" | "receive") => {
//      // Clear blur timer if input loses focus for any reason
//      // (e.g., manual click away, or programmatically via the timer)
//      const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
//      if (timerRef.current) {
//        clearTimeout(timerRef.current);
//        timerRef.current = null;
//      }

//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//   }, []); // Refs don't need to be dependencies

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2);
//        // Clear any existing send timer before setting value and calculating
//        if (sendBlurTimerRef.current) {
//          clearTimeout(sendBlurTimerRef.current);
//          sendBlurTimerRef.current = null;
//        }
//       // Set amount and trigger calculation/new timer
//       handleAmountChange(availableBalance, "send");
//       // Manually focus after setting value (optional, but might feel better UX)
//       // Need a slight delay for state update and potential re-render
//       setTimeout(() => sendInputRef.current?.focus(), 0);
//     }
//   }, [sourceAccount, handleAmountChange]); // Added handleAmountChange dependency

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       setLogicError("Please enter a valid amount and wait for calculation.");
//       return;
//     }
//     if (isCalculating) return;
//     if (isInsufficientBalanceError) return;
//     if (apiError) {
//         setLogicError(`There was an issue: ${apiError}`);
//         return;
//     }
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance.");
//       return;
//     }

//     setLogicError(null);

//     console.log("Saving transfer summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//     ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//     : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     summary,
//     isCalculating,
//     apiError,
//     sourceAccount,
//     recipient,
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//     isInsufficientBalanceError,
//   ]);

//   // Enable continue button logic
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !isInsufficientBalanceError &&
//       !apiError,
//     [summary, isCalculating, isInsufficientBalanceError, apiError]
//   );

//   // --- Render Logic ---

//   // Initial Loading Skeleton
//   if (isLoading) {
//     return (
//       <div className="min-h-screen animate-pulse">
//          <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//           <div className="container mx-auto max-w-xl p-4 lg:pt-8 border rounded-2xl pb-10 mt-4">
//             <SkeletonAmountSection />
//             <Skeleton className="h-16 w-full rounded-lg mb-4" />
//             <Skeleton className="h-14 w-full rounded-full mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // Critical Error State
//   const criticalError = (!sourceAccount || !recipient) ? (logicError || apiError || "Error loading essential page details.") : null;
//   if (criticalError) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg relative max-w-md mx-auto mt-10 shadow-md"
//             role="alert"
//           >
//             <strong className="font-bold mr-2">Error!</strong>
//             <span className="block sm:inline">{criticalError}</span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard"
//             }
//              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//           >
//             <IoIosArrowBack size={20} className="-ml-1 mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <div className="SendAmount-Page">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       <div className="mx-auto lg:max-w-xl p-4 sm:p-6 mt-5 border rounded-2xl bg-white dark:bg-background">
//         <RateDisplay rateContext={rateContext} apiError={apiError && !logicError ? apiError : null} />

//         <div className="space-y-4 mt-4">
//           {/* You Send Section */}
//           <AmountInput
//             ref={sendInputRef} // Pass ref here
//             label="You send"
//             labelSuffix={summary?.sendAmount && !isCalculating ? "exactly" : ""}
//             currencyCode={sourceAccount!.currency.code}
//             flagImage={sourceAccount!.currency.flagImage}
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive"}
//             hasError={isInsufficientBalanceError}
//             inputId="send-amount"
//             data-testid="send-amount-input"
//           />
//           <div className="text-right -mt-4 pr-4">
//              <span className="text-sm text-gray-500 dark:text-gray-300">
//                 Available: </span>
//               <button
//                 onClick={handleAvailableBalanceClick}
//                 className="text-sm font-medium text-primary dark:text-primary cursor-pointer hover:underline focus:outline-none focus:underline"
//                 aria-label={`Use available balance: ${sourceAccount!.balance.toFixed(2)} ${sourceAccount!.currency.code}`}
//               >
//                 {sourceAccount!.balance.toLocaleString(undefined, {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })} {sourceAccount!.currency.code}
//               </button>
//           </div>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             ref={receiveInputRef} // Pass ref here
//             label={recipient!.nickname || recipient!.accountHolderName || "Recipient"}
//             labelPrefix=""
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating
//                 ? "gets exactly"
//                 : "gets approx."
//             }
//             currencyCode={recipient!.currency.code}
//             flagImage={`/assets/icon/${recipient!.currency.code.toLowerCase()}.svg`}
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send"}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//           {recipient?.accountNumber && (
//              <p className="text-sm text-gray-500 dark:text-gray-300 text-right -mt-4 pr-4">
//                 Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}

//           <PayingWithDisplay sourceAccount={sourceAccount!} />

//           {/* Error Display Section */}
//           {displayError && (
//              <div className={`relative p-4 rounded-lg dark:border ${isInsufficientBalanceError ? 'bg-red-50  text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300' : 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300'}`} role="alert">
//                  <div className="flex items-center">
//                     <IoIosInformationCircleOutline className={`w-5 h-5 mr-2 ${isInsufficientBalanceError ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
//                     <span className="flex-1 text-sm">{displayError}</span>
//                     <button
//                         onClick={() => {
//                             setLogicError(null);
//                         }}
//                         className="absolute top-1.5 cursor-pointer right-1.5 p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
//                         aria-label="Dismiss error message"
//                     >
//                         <IoClose size={18} />
//                     </button>
//                  </div>
//              </div>
//           )}

//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating}
//             className={`flex items-center justify-center w-full bg-primary text-neutral-900 font-medium hover:bg-primaryhover space-x-3 py-3 px-4 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
//             data-testid="continue-button"
//           >
//             {isCalculating ? (
//               <>
//                  <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12 2V6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M12 18V22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 4.93L7.76 7.76"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 16.24L19.07 19.07"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M2 12H6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M18 12H22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 19.07L7.76 16.24"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 7.76L19.07 4.93"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                 <span>Calculating...</span>
//               </>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
// "use client";
// import React, {
//   useState,
//   useCallback,
//   useMemo,
//   useEffect,
//   useRef,
// } from "react"; // Import useRef
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
// import { TrendingUp } from "lucide-react"; // Import TrendingUp
// import { FaPiggyBank } from "react-icons/fa"; // Import FaPiggyBank
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
// import { IoClose } from "react-icons/io5";

// // Hooks & Logic
// import { useSendAmountLogic } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// // Components
// import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
// import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
// import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
// import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// // --- Component Definition ---
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// interface SendAmountPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // --- Skeleton Component ---
// const SkeletonAmountSection = () => (
//   <div className="space-y-4 mb-4">
//     <div className="flex items-end flex-col gap-1.5">
//       <Skeleton className="h-10 w-72 rounded-full" />
//       <Skeleton className="h-9 w-65 rounded-full" />
//     </div>
//     <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-20" />
//       <div className="flex justify-between">
//         <Skeleton className="h-12.5 w-1/4 rounded-full mt-3" />
//         <Skeleton className="h-12.5 w-40 rounded-lg mt-3" />
//       </div>
//       <Skeleton className="h-5 w-1/3 ml-auto mb-4" />
//     </div>
//     <div className="space-y-1 mb-2">
//       <Skeleton className="h-6 w-1/3" />
//       <div className="flex justify-between">
//         <Skeleton className="h-12.5 w-1/4 rounded-full mt-3" />
//         <Skeleton className="h-12.5 w-40 rounded-lg mt-3" />
//       </div>
//       <Skeleton className="h-5 w-1/3 ml-auto mb-4" />
//     </div>
//   </div>
// );

// // --- Framer Motion Variants (Copied from HeroSection for consistency) ---
// const savingsBannerVariants = {
//   hidden: { opacity: 0, y: -10, scaleY: 0.9, height: 0 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scaleY: 1,
//     height: "auto",
//     transition: {
//       duration: 0.4,
//       ease: [0.25, 0.46, 0.45, 0.94],
//       height: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -15,
//     scaleY: 0.95,
//     height: 0,
//     transition: {
//       duration: 0.35, // Faster exit
//       ease: "easeIn",
//       height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
// };

// export default function SendAmountPage() {
//   // --- Hooks ---
//   const router = useRouter();
//   const params = useParams<SendAmountPageParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");

//   // --- Custom Hook for Data and Logic ---
//   const {
//     sourceAccount,
//     recipient,
//     summary,
//     initialRateSummary,
//     isLoading,
//     isCalculating,
//     error: logicError,
//     apiError,
//     calculateSummary,
//     cancelCalculation,
//     setError: setLogicError,
//   } = useSendAmountLogic(balanceId, recipientId);

//   // --- UI State ---
//   const [sendAmount, setSendAmount] = useState<string>("");
//   const [receiveAmount, setReceiveAmount] = useState<string>("");
//   const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
//   const [isSendFocused, setIsSendFocused] = useState(false);
//   const [isReceiveFocused, setIsReceiveFocused] = useState(false);

//   // --- Refs for Inputs and Timers ---
//   const sendInputRef = useRef<HTMLInputElement>(null);
//   const receiveInputRef = useRef<HTMLInputElement>(null);
//   const sendBlurTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const receiveBlurTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // --- Derived State for UI ---
//   const rateContext = summary ?? initialRateSummary;
//   const isInsufficientBalanceError = logicError === "Insufficient balance.";
//   const displayError = logicError || apiError;

//   // Effect to sync hook summary changes back to the *other* input field
//   useEffect(() => {
//     if (!summary) return;
//     const newSend = summary.sendAmount.toFixed(2);
//     const newReceive = summary.receiveAmount.toFixed(2);
//     if (lastEdited === "send") {
//       setReceiveAmount(newReceive);
//     } else if (lastEdited === "receive") {
//       setSendAmount(newSend);
//     }
//     // Also update if no field was edited last (initial load or external update)
//     else if (!lastEdited) {
//       setSendAmount(newSend);
//       setReceiveAmount(newReceive);
//     }
//   }, [summary, lastEdited]);

//   // --- Timer Cleanup ---
//   useEffect(() => {
//     // Clear timers when the component unmounts
//     return () => {
//       if (sendBlurTimerRef.current) clearTimeout(sendBlurTimerRef.current);
//       if (receiveBlurTimerRef.current)
//         clearTimeout(receiveBlurTimerRef.current);
//     };
//   }, []);

//   // --- Input Handlers ---
//   const handleAmountChange = useCallback(
//     (value: string, type: "send" | "receive") => {
//       setLastEdited(type);

//       // Clear existing blur timer for this input
//       const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }

//       if (type === "send") setSendAmount(value);
//       else setReceiveAmount(value);

//       const amountNum = parseFloat(value);
//       const isValidAmount = !isNaN(amountNum) && amountNum > 0;

//       if (isValidAmount && logicError && !isInsufficientBalanceError) {
//         setLogicError(null); // Clear non-balance errors when user types valid amount
//       }

//       if (isValidAmount) {
//         calculateSummary(amountNum, type === "send");

//         // Start new blur timer
//         timerRef.current = setTimeout(() => {
//           const inputRef =
//             type === "send" ? sendInputRef.current : receiveInputRef.current;
//           inputRef?.blur(); // Trigger blur on the specific input
//           timerRef.current = null; // Clear the stored timer ID after it fires
//         }, 1000); // 1 second delay
//       } else {
//         cancelCalculation();
//         if (type === "send") setReceiveAmount("");
//         else setSendAmount("");
//         // Trigger calculation with 0. The hook will handle setting its internal summary state.
//         calculateSummary(0, true);

//         if (value && isNaN(amountNum)) {
//           setLogicError("Please enter a valid number.");
//         } else if (logicError === "Please enter a valid number.") {
//           setLogicError(null); // Clear valid number error if input becomes empty/valid
//         }
//       }
//     },
//     // Removed initialRateSummary as dependency as the core logic relies on calculateSummary(0) now
//     [
//       calculateSummary,
//       cancelCalculation,
//       setLogicError,
//       logicError,
//       isInsufficientBalanceError,
//     ]
//   );

//   const handleFocus = useCallback((type: "send" | "receive") => {
//     // Clear blur timer when input gains focus manually
//     const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }

//     if (type === "send") setIsSendFocused(true);
//     else setIsReceiveFocused(true);
//   }, []); // Refs don't need to be dependencies

//   const handleBlur = useCallback((type: "send" | "receive") => {
//     // Clear blur timer if input loses focus for any reason
//     const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }

//     if (type === "send") setIsSendFocused(false);
//     else setIsReceiveFocused(false);
//   }, []); // Refs don't need to be dependencies

//   const handleAvailableBalanceClick = useCallback(() => {
//     if (sourceAccount) {
//       const availableBalance = sourceAccount.balance.toFixed(2);
//       // Clear any existing send timer before setting value and calculating
//       if (sendBlurTimerRef.current) {
//         clearTimeout(sendBlurTimerRef.current);
//         sendBlurTimerRef.current = null;
//       }
//       // Set amount and trigger calculation/new timer
//       handleAmountChange(availableBalance, "send");
//       // Manually focus after setting value
//       setTimeout(() => sendInputRef.current?.focus(), 0);
//     }
//   }, [sourceAccount, handleAmountChange]); // Added handleAmountChange dependency

//   // --- Continue Logic ---
//   const handleContinue = useCallback(() => {
//     if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
//       // Ensure an error is set if trying to continue with invalid/missing summary
//       if (!logicError && !apiError) {
//         // Only set if no other error is present
//         setLogicError("Please enter a valid amount and wait for calculation.");
//       }
//       return;
//     }
//     if (isCalculating) return;
//     // Check logicError specifically for insufficient balance AFTER checking summary
//     if (logicError === "Insufficient balance.") {
//       // Keep the error message displayed, but allow potential continuation
//       // The canContinue logic might block it anyway if desired
//     }
//     // Check other potential logic errors or API errors that might block continuation
//     else if (logicError || apiError) {
//       // Update the error slightly for clarity if trying to continue despite it
//       setLogicError(`Cannot proceed due to: ${logicError || apiError}`);
//       return;
//     }

//     // Final balance check before proceeding
//     if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
//       setLogicError("Insufficient balance.");
//       return;
//     }

//     setLogicError(null); // Clear any previous non-blocking errors before navigation

//     console.log("Saving transfer summary:", summary);
//     localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

//     const needsReason = recipient?.currency.code === "INR";
//     const nextPath = needsReason
//       ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
//       : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
//     router.push(nextPath);
//   }, [
//     summary,
//     isCalculating,
//     apiError,
//     logicError, // Added logicError dependency
//     sourceAccount,
//     recipient,
//     balanceId,
//     recipientId,
//     router,
//     setLogicError,
//   ]);

//   // Enable continue button logic
//   const canContinue = useMemo(
//     () =>
//       !!summary &&
//       summary.sendAmount > 0 &&
//       summary.receiveAmount > 0 &&
//       !isCalculating &&
//       !apiError && // Block on API errors
//       logicError !== "Please enter a valid number." && // Block on validation error
//       logicError !== "Please enter a valid amount and wait for calculation." && // Block on this specific error
//       logicError !== "Missing required information." && // Block on critical errors
//       !logicError?.startsWith("Cannot proceed due to:") && // Block on continuation error
//       logicError !== "Insufficient balance.", // **** ALSO BLOCK ON INSUFFICIENT BALANCE ****
//     // Decide if you want to allow clicking continue even with insufficient balance.
//     // If not, add the check above. If yes, remove it. Let's block it for now.
//     [summary, isCalculating, apiError, logicError] // Added logicError
//   );

//   // --- Savings Calculation (Adapted from HeroSection) ---
//   const savingsAmount = useMemo(() => {
//     if (
//       !summary ||
//       !summary.liveExchangeRate ||
//       summary.sendAmount <= 0 ||
//       summary.receiveAmount <= 0 ||
//       isCalculating ||
//       isInsufficientBalanceError || // Use derived state for clarity
//       !!apiError ||
//       logicError === "Please enter a valid number."
//     ) {
//       return null;
//     }

//     const marketRate = summary.liveExchangeRate;
//     const ourRate = summary.exchangeRate;

//     if (ourRate <= marketRate) {
//       return null;
//     }

//     // Calculate based on received amounts: actual vs market hypothetical
//     // This comparison uses the *final* receive amount, implicitly accounting for fees deducted before conversion
//     const amountConverted = summary.receiveAmount / ourRate; // Amount in send currency before fees that was converted
//     const marketEquivalentReceive = amountConverted * marketRate; // What that amount would be worth at market rate

//     const rateDifferenceValue = summary.receiveAmount - marketEquivalentReceive;

//     if (rateDifferenceValue <= 0.01) {
//       return null;
//     }

//     return rateDifferenceValue.toFixed(2);
//   }, [
//     summary,
//     isCalculating,
//     isInsufficientBalanceError,
//     apiError,
//     logicError,
//   ]); // Dependencies

//   // --- Render Logic ---

//   // --- Render Logic ---
//   if (isLoading) {
//     return (
//       <div className="min-h-screen animate-pulse">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="mx-auto lg:max-w-xl p-4 sm:p-6 mt-5 border rounded-2xl bg-white dark:bg-background">
//           <SkeletonAmountSection />
//           <div className="space-y-2">
//             <Skeleton className="h-6 w-30" />
//             <Skeleton className="h-26 w-full rounded-2xl" />
//             <Skeleton className="h-12.5 w-full rounded-full" />
//           </div>
//         </div>
//       </div>
//     );
//   }
//   // Critical Error State (Account/Recipient Load Failure)
//   const criticalError =
//     !sourceAccount || !recipient
//       ? logicError || apiError || "Error loading essential page details."
//       : null;
//   if (criticalError) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//         <div className="p-10 text-center">
//           <div
//             className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg relative max-w-md mx-auto mt-10 shadow-md"
//             role="alert"
//           >
//             <strong className="font-bold mr-2">Error!</strong>
//             <span className="block sm:inline">{criticalError}</span>
//           </div>
//           <Link
//             href={
//               balanceId
//                 ? `/dashboard/balances/${balanceId}/send/select-recipient`
//                 : "/dashboard"
//             }
//             className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//           >
//             <IoIosArrowBack size={20} className="-ml-1 mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <div className="SendAmount-Page">
//       <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
//       <div className="mx-auto lg:max-w-xl p-4 sm:p-6 mt-5 border rounded-2xl bg-white dark:bg-background">
//         <RateDisplay
//           rateContext={rateContext}
//           apiError={apiError && !logicError ? apiError : null}
//         />

//         {/* --- Savings Banner --- */}
//         <AnimatePresence>
//           {savingsAmount &&
//             recipient && ( // Check recipient for currency code
//               <motion.div
//                 key="savings-banner-send-page"
//                 className="my-6 overflow-hidden" // Use margin-top/bottom to space it
//                 variants={savingsBannerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//               >
//                 <div className="bg-lightgray dark:bg-primarybox rounded-xl lg:p-4 p-3 border-l-4 border-primary">
//                   <div className="flex items-center gap-2">
//                     <div className="bg-primary rounded-full p-2 flex-shrink-0">
//                       <FaPiggyBank
//                         size={20}
//                         className="lg:size-6 size-4 text-mainheading"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-bold text-neutral-900 dark:text-primary lg:text-base text-sm flex items-center gap-1">
//                         <span>
//                           Save up to {recipient.currency.code} {savingsAmount}{" "}
//                           with Wise {/* Use recipient currency */}
//                         </span>
//                         <TrendingUp size={18} />
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-300">
//                         Better rates than traditional banks!
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//         </AnimatePresence>
//         {/* --- End Savings Banner --- */}

//         <div className="space-y-4 mt-4">
//           {" "}
//           {/* You Send Section */}
//           <AmountInput
//             ref={sendInputRef} // Pass ref here
//             label="You send"
//             labelSuffix={
//               summary?.sendAmount && !isCalculating && !displayError
//                 ? "exactly"
//                 : ""
//             } // Hide 'exactly' if error
//             currencyCode={sourceAccount!.currency.code}
//             flagImage={sourceAccount!.currency.flagImage}
//             value={sendAmount}
//             onValueChange={(val) => handleAmountChange(val, "send")}
//             onFocus={() => handleFocus("send")}
//             onBlur={() => handleBlur("send")}
//             isFocused={isSendFocused}
//             isDimmed={lastEdited === "receive" && !isCalculating}
//             hasError={isInsufficientBalanceError} // Only specific error for styling
//             inputId="send-amount"
//             data-testid="send-amount-input"
//           />

//           <div className="text-right -mt-4 pr-4">
//             <span className="text-sm text-gray-500 dark:text-gray-300">
//               Available:{" "}
//             </span>
//             <button
//               onClick={handleAvailableBalanceClick}
//               className="text-sm font-medium text-primary dark:text-primary cursor-pointer hover:underline focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
//               aria-label={`Use available balance: ${sourceAccount!.balance.toFixed(
//                 2
//               )} ${sourceAccount!.currency.code}`}
//               disabled={isLoading || isCalculating} // Disable while loading/calculating
//             >
//               {sourceAccount!.balance.toLocaleString(undefined, {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}{" "}
//               {sourceAccount!.currency.code}
//             </button>
//           </div>

//           {/* Recipient Gets Section */}
//           <AmountInput
//             ref={receiveInputRef} // Pass ref here
//             label={
//               recipient!.nickname || recipient!.accountHolderName || "Recipient"
//             }
//             labelPrefix=""
//             labelSuffix={
//               summary?.receiveAmount && !isCalculating && !displayError
//                 ? "gets exactly"
//                 : "gets approx." // Show approx if error or calculating
//             }
//             currencyCode={recipient!.currency.code}
//             flagImage={`/assets/icon/${recipient!.currency.code.toLowerCase()}.svg`}
//             value={receiveAmount}
//             onValueChange={(val) => handleAmountChange(val, "receive")}
//             onFocus={() => handleFocus("receive")}
//             onBlur={() => handleBlur("receive")}
//             isFocused={isReceiveFocused}
//             isDimmed={lastEdited === "send" && !isCalculating}
//             inputId="receive-amount"
//             data-testid="receive-amount-input"
//           />
//           {recipient?.accountNumber && (
//             <p className="text-sm text-gray-500 dark:text-gray-300 text-right -mt-4 pr-4">
//               Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}
//           <PayingWithDisplay sourceAccount={sourceAccount!} />
//           {/* Error Display Section */}
//           {displayError && (
//             <div
//               className={`relative p-4 rounded-lg dark:border ${
//                 isInsufficientBalanceError
//                   ? "bg-red-50  text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300"
//                   : "bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300"
//               }`}
//               role="alert"
//             >
//               <div className="flex items-center">
//                 <IoIosInformationCircleOutline
//                   className={`w-5 h-5 mr-2 ${
//                     isInsufficientBalanceError
//                       ? "text-red-600 dark:text-red-400"
//                       : "text-yellow-600 dark:text-yellow-400"
//                   }`}
//                 />
//                 <span className="flex-1 text-sm">{displayError}</span>
//                 <button
//                   onClick={() => {
//                     setLogicError(null);
//                     // Decide if you want dismissing the error to also clear API errors
//                     // if (apiError) { /* logic to clear apiError if needed */ }
//                   }}
//                   className="absolute top-1.5 cursor-pointer right-1.5 p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
//                   aria-label="Dismiss error message"
//                 >
//                   <IoClose size={18} />
//                 </button>
//               </div>
//             </div>
//           )}
//           {/* Continue Button */}
//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || isCalculating} // Disable also if not canContinue or calculating
//             className={`flex items-center justify-center w-full bg-primary text-neutral-900 font-medium hover:bg-primaryhover space-x-3 py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
//             data-testid="continue-button"
//           >
//             {isCalculating ? (
//               <>
//                 {/* Using the same SVG spinner */}
//                 <svg
//                   className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M12 2V6"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M12 18V22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M4.93 4.93L7.76 7.76"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M16.24 16.24L19.07 19.07"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M2 12H6"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M18 12H22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M4.93 19.07L7.76 16.24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M16.24 7.76L19.07 4.93"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 <span>Calculating...</span>
//               </>
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// frontend/src/app/dashboard/balances/[balanceId]/send/amount/page.tsx
"use client";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react"; // Import useRef
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import { AlertTriangle, TrendingUp } from "lucide-react"; // Import TrendingUp
import { FaPiggyBank } from "react-icons/fa"; // Import FaPiggyBank
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import { IoClose } from "react-icons/io5";

// Hooks & Logic
import { useSendAmountLogic } from "../../../../../hooks/useSendAmountLogic"; // Adjust path

// Components
import DashboardHeader from "@/app/dashboard/components/layout/DashboardHeader"; // Adjust path
import RateDisplay from "../../../../components/send/RateDisplay"; // Adjust path
import AmountInput from "../../../../components/send/AmountInput"; // Adjust path
import PayingWithDisplay from "../../../../components/send/PayingWithDisplay"; // Adjust path
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// --- Component Definition ---
const steps = ["Recipient", "Amount", "Review", "Pay"];

interface SendAmountPageParams extends Record<string, string | string[]> {
  balanceId: string;
}

// --- Skeleton Component ---
const SkeletonAmountSection = () => (
  <div className="space-y-4 mb-4">
    <div className="flex items-end flex-col gap-1.5">
      <Skeleton className="h-10 w-72 rounded-full" />
      <Skeleton className="h-9 w-65 rounded-full" />
    </div>
    <div className="space-y-1 mb-2">
      <Skeleton className="h-6 w-20" />
      <div className="flex justify-between">
        <Skeleton className="h-12.5 w-1/4 rounded-full mt-3" />
        <Skeleton className="h-12.5 w-40 rounded-lg mt-3" />
      </div>
      <Skeleton className="h-5 w-1/3 ml-auto mb-4" />
    </div>
    <div className="space-y-1 mb-2">
      <Skeleton className="h-6 w-1/3" />
      <div className="flex justify-between">
        <Skeleton className="h-12.5 w-1/4 rounded-full mt-3" />
        <Skeleton className="h-12.5 w-40 rounded-lg mt-3" />
      </div>
      <Skeleton className="h-5 w-1/3 ml-auto mb-4" />
    </div>
  </div>
);

// --- Framer Motion Variants (Copied from HeroSection for consistency) ---
const savingsBannerVariants = {
  hidden: { opacity: 0, y: -10, scaleY: 0.9, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    scaleY: 0.95,
    height: 0,
    transition: {
      duration: 0.35, // Faster exit
      ease: "easeIn",
      height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
  },
};

export default function SendAmountPage() {
  // --- Hooks ---
  const router = useRouter();
  const params = useParams<SendAmountPageParams>();
  const searchParams = useSearchParams();
  const { balanceId } = params;
  const recipientId = searchParams.get("recipientId");

  // --- Custom Hook for Data and Logic ---
  const {
    sourceAccount,
    recipient,
    summary,
    initialRateSummary,
    isLoading,
    isCalculating,
    error: logicError,
    apiError,
    calculateSummary,
    cancelCalculation,
    setError: setLogicError,
  } = useSendAmountLogic(balanceId, recipientId);

  // --- UI State ---
  const [sendAmount, setSendAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [lastEdited, setLastEdited] = useState<"send" | "receive" | null>(null);
  const [isSendFocused, setIsSendFocused] = useState(false);
  const [isReceiveFocused, setIsReceiveFocused] = useState(false);

  // --- Refs for Inputs and Timers ---
  const sendInputRef = useRef<HTMLInputElement>(null);
  const receiveInputRef = useRef<HTMLInputElement>(null);
  const sendBlurTimerRef = useRef<NodeJS.Timeout | null>(null);
  const receiveBlurTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Derived State for UI ---
  const rateContext = summary ?? initialRateSummary;
  const isInsufficientBalanceError = logicError === "Insufficient balance.";
  const displayError = logicError || apiError;

  // Effect to sync hook summary changes back to the *other* input field
  useEffect(() => {
    if (!summary) return;
    const newSend = summary.sendAmount.toFixed(2);
    const newReceive = summary.receiveAmount.toFixed(2);
    if (lastEdited === "send") {
      setReceiveAmount(newReceive);
    } else if (lastEdited === "receive") {
      setSendAmount(newSend);
    }
    // Also update if no field was edited last (initial load or external update)
    else if (!lastEdited) {
      setSendAmount(newSend);
      setReceiveAmount(newReceive);
    }
  }, [summary, lastEdited]);

  // --- Timer Cleanup ---
  useEffect(() => {
    // Clear timers when the component unmounts
    return () => {
      if (sendBlurTimerRef.current) clearTimeout(sendBlurTimerRef.current);
      if (receiveBlurTimerRef.current)
        clearTimeout(receiveBlurTimerRef.current);
    };
  }, []);

  // --- Input Handlers ---
  const handleAmountChange = useCallback(
    (value: string, type: "send" | "receive") => {
      setLastEdited(type);

      // Clear existing blur timer for this input
      const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (type === "send") setSendAmount(value);
      else setReceiveAmount(value);

      const amountNum = parseFloat(value);
      const isValidAmount = !isNaN(amountNum) && amountNum > 0;

      if (isValidAmount && logicError && !isInsufficientBalanceError) {
        setLogicError(null); // Clear non-balance errors when user types valid amount
      }

      if (isValidAmount) {
        calculateSummary(amountNum, type === "send");

        // Start new blur timer
        timerRef.current = setTimeout(() => {
          const inputRef =
            type === "send" ? sendInputRef.current : receiveInputRef.current;
          inputRef?.blur(); // Trigger blur on the specific input
          timerRef.current = null; // Clear the stored timer ID after it fires
        }, 1000); // 1 second delay
      } else {
        cancelCalculation();
        if (type === "send") setReceiveAmount("");
        else setSendAmount("");
        // Trigger calculation with 0. The hook will handle setting its internal summary state.
        calculateSummary(0, true); // Or type === "send" based on current context

        if (value && isNaN(amountNum)) {
          setLogicError("Please enter a valid number.");
        } else if (logicError === "Please enter a valid number.") {
          setLogicError(null); // Clear valid number error if input becomes empty/valid
        }
      }
    },
    [
      calculateSummary,
      cancelCalculation,
      setLogicError,
      logicError,
      isInsufficientBalanceError,
    ]
  );

  const handleFocus = useCallback((type: "send" | "receive") => {
    // Clear blur timer when input gains focus manually
    const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (type === "send") setIsSendFocused(true);
    else setIsReceiveFocused(true);
  }, []);

  const handleBlur = useCallback((type: "send" | "receive") => {
    // Clear blur timer if input loses focus for any reason
    const timerRef = type === "send" ? sendBlurTimerRef : receiveBlurTimerRef;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (type === "send") setIsSendFocused(false);
    else setIsReceiveFocused(false);
  }, []);

  const handleAvailableBalanceClick = useCallback(() => {
    if (sourceAccount) {
      const availableBalance = sourceAccount.balance.toFixed(2);
      if (sendBlurTimerRef.current) {
        clearTimeout(sendBlurTimerRef.current);
        sendBlurTimerRef.current = null;
      }
      handleAmountChange(availableBalance, "send");
      setTimeout(() => sendInputRef.current?.focus(), 0);
    }
  }, [sourceAccount, handleAmountChange]);

  // --- Continue Logic ---
  const handleContinue = useCallback(() => {
    if (!summary || !(summary.sendAmount > 0) || !(summary.receiveAmount > 0)) {
      if (!logicError && !apiError) {
        setLogicError("Please enter a valid amount and wait for calculation.");
      }
      return;
    }
    if (isCalculating) return;

    if (logicError === "Insufficient balance.") {
      // Error is already displayed
      return;
    }

    if (logicError || apiError) {
      setLogicError(`Cannot proceed due to: ${logicError || apiError}`);
      return;
    }

    // Final balance check before proceeding (belt and suspenders)
    if (sourceAccount && summary.sendAmount > sourceAccount.balance) {
      setLogicError("Insufficient balance.");
      return;
    }

    setLogicError(null); // Clear any previous non-blocking errors

    console.log("Saving transfer summary:", summary);
    localStorage.setItem("sendTransferSummary", JSON.stringify(summary));

    const needsReason = recipient?.currency.code === "INR";
    const nextPath = needsReason
      ? `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`
      : `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`;
    router.push(nextPath);
  }, [
    summary,
    isCalculating,
    apiError,
    logicError,
    sourceAccount,
    recipient,
    balanceId,
    recipientId,
    router,
    setLogicError,
  ]);

  // Enable continue button logic
  const canContinue = useMemo(
    () =>
      !!summary &&
      summary.sendAmount > 0 &&
      summary.receiveAmount > 0 &&
      !isCalculating &&
      !apiError &&
      logicError !== "Please enter a valid number." &&
      logicError !== "Please enter a valid amount and wait for calculation." &&
      logicError !== "Missing required information." &&
      !logicError?.startsWith("Cannot proceed due to:") &&
      logicError !== "Insufficient balance.", // Block on insufficient balance
    [summary, isCalculating, apiError, logicError]
  );

  // --- Savings Calculation (Adapted from HeroSection) ---
  const savingsAmount = useMemo(() => {
    if (
      !summary ||
      !summary.liveExchangeRate ||
      summary.sendAmount <= 0 ||
      summary.receiveAmount <= 0 ||
      isCalculating ||
      isInsufficientBalanceError ||
      !!apiError ||
      logicError === "Please enter a valid number."
    ) {
      return null;
    }

    const marketRate = summary.liveExchangeRate;
    const ourRate = summary.exchangeRate;

    if (ourRate <= marketRate) {
      return null;
    }

    const amountConverted = summary.receiveAmount / ourRate;
    const marketEquivalentReceive = amountConverted * marketRate;
    const rateDifferenceValue = summary.receiveAmount - marketEquivalentReceive;

    if (rateDifferenceValue <= 0.01) {
      return null;
    }

    return rateDifferenceValue.toFixed(2);
  }, [
    summary,
    isCalculating,
    isInsufficientBalanceError,
    apiError,
    logicError,
  ]);

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="min-h-screen animate-pulse">
        <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
        <div className="mx-auto lg:max-w-xl p-4 sm:p-6 mt-5 border rounded-2xl bg-white dark:bg-background">
          <SkeletonAmountSection />
          <div className="space-y-2">
            <Skeleton className="h-6 w-30" />
            <Skeleton className="h-26 w-full rounded-2xl" />
            <Skeleton className="h-12.5 w-full rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const criticalError =
    !sourceAccount || !recipient
      ? logicError || apiError || "Error loading essential page details."
      : null;
  if (criticalError) {
    return (
      <div className="min-h-screen">
        <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
        <div className="py-8">
          <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-4 flex items-center gap-3">
            <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
              <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <span className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
                Error!
              </span>
              <span className="ml-2 block sm:inline text-red-700 dark:text-red-300/90">
                {criticalError}
              </span>
            </div>
          </div>
          <div className="text-center">
            <Link
              href={
                balanceId
                  ? `/dashboard/balances/${balanceId}/send/select-recipient`
                  : "/dashboard"
              }
              className="mt-6 inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 text-center sm:w-auto w-full transition-all duration-75 ease-linear"
            >
              <IoIosArrowBack size={20} className="-ml-1 mr-1" /> Go back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="SendAmount-Page">
      <DashboardHeader title="Send Money" steps={steps} currentStep={2} />
      <div className="mx-auto lg:max-w-xl p-4 sm:p-6 mt-5 border rounded-2xl bg-white dark:bg-background">
        <RateDisplay
          rateContext={rateContext}
          apiError={apiError && !logicError ? apiError : null}
        />

        <AnimatePresence>
          {savingsAmount && recipient && (
            <motion.div
              key="savings-banner-send-page"
              className="my-6 overflow-hidden"
              variants={savingsBannerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-lightgray dark:bg-primarybox rounded-xl lg:p-4 p-3 border-l-4 border-primary">
                <div className="flex items-center gap-2">
                  <div className="bg-primary rounded-full p-2 flex-shrink-0">
                    <FaPiggyBank
                      size={20}
                      className="lg:size-6 size-4 text-mainheading"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-primary lg:text-base text-sm flex items-center gap-1">
                      <span>
                        Save up to {recipient.currency.code} {savingsAmount}{" "}
                        with Remityn
                      </span>
                      <TrendingUp size={18} />
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      Better rates than traditional banks!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4 mt-4">
          <AmountInput
            ref={sendInputRef}
            label="You send"
            labelSuffix={
              summary?.sendAmount && !isCalculating && !displayError
                ? "exactly"
                : ""
            }
            currencyCode={sourceAccount!.currency.code}
            flagImage={sourceAccount!.currency.flagImage}
            value={sendAmount}
            onValueChange={(val) => handleAmountChange(val, "send")}
            onFocus={() => handleFocus("send")}
            onBlur={() => handleBlur("send")}
            isFocused={isSendFocused}
            isDimmed={lastEdited === "receive" && !isCalculating}
            hasError={isInsufficientBalanceError} // This ensures the input field shows error style
            inputId="send-amount"
            data-testid="send-amount-input"
          />
          <div className="text-right -mt-4 pr-4">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Available:{" "}
            </span>
            <button
              onClick={handleAvailableBalanceClick}
              className="text-sm font-medium text-primary dark:text-primary cursor-pointer hover:underline focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Use available balance: ${sourceAccount!.balance.toFixed(
                2
              )} ${sourceAccount!.currency.code}`}
              disabled={isLoading || isCalculating}
            >
              {sourceAccount!.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {sourceAccount!.currency.code}
            </button>
          </div>
          {/* Recipient Gets Section */}
          <AmountInput
            ref={receiveInputRef}
            label={
              recipient!.nickname || recipient!.accountHolderName || "Recipient"
            }
            labelPrefix=""
            labelSuffix={
              summary?.receiveAmount && !isCalculating && !displayError
                ? "gets exactly"
                : "gets approx."
            }
            currencyCode={recipient!.currency.code}
            flagImage={`/assets/icon/${recipient!.currency.code.toLowerCase()}.svg`}
            value={receiveAmount}
            onValueChange={(val) => handleAmountChange(val, "receive")}
            onFocus={() => handleFocus("receive")}
            onBlur={() => handleBlur("receive")}
            isFocused={isReceiveFocused}
            isDimmed={lastEdited === "send" && !isCalculating}
            // No hasError prop here unless you want to display a specific error for this input too
            inputId="receive-amount"
            data-testid="receive-amount-input"
          />
          {recipient?.accountNumber && (
            <p className="text-sm text-gray-500 dark:text-gray-300 text-right -mt-4 pr-4">
              Account ending in {recipient.accountNumber.slice(-4)}
            </p>
          )}
          <PayingWithDisplay sourceAccount={sourceAccount!} />

          {displayError && (
            <div
              className={`relative flex justify-between items-center p-2 rounded-lg border ${
                isInsufficientBalanceError
                  ? "bg-red-50 dark:bg-red-900/25 border-red-500"
                  : "bg-yellow-50 dark:bg-yellow-900/25 border-yellow-500"
              }`}
              role="alert"
            >
              <div className="flex sm:items-center items-start gap-3">
                <div
                  className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${
                    isInsufficientBalanceError
                      ? "bg-red-600/20 text-red-600 dark:text-red-500"
                      : "bg-yellow-600/20 text-yellow-600 dark:text-yellow-500"
                  }`}
                >
                  <IoIosInformationCircleOutline
                    className={`size-5 sm:size-6 flex-shrink-0`}
                  />
                </div>
                <span
                  className={`${
                    isInsufficientBalanceError
                      ? "text-red-700 dark:text-red-300/90"
                      : "text-yellow-700 dark:text-yellow-300/90"
                  }`}
                >
                  {displayError}
                </span>
              </div>

              <button
                onClick={() => {
                  setLogicError(null);
                  // Decide if you want dismissing the error to also clear API errors
                  // if (apiError) { /* logic to clear apiError if needed */ }
                }}
                className={`ml-2 cursor-pointer p-2 rounded-full focus:outline-none ${
                  isInsufficientBalanceError
                    ? " text-red-600 dark:text-red-500"
                    : " text-yellow-600 dark:text-yellow-500"
                }`}
                aria-label="Dismiss error message"
              >
                <IoClose size={18} />
              </button>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!canContinue || isCalculating}
            className={`flex items-center justify-center w-full bg-primary text-neutral-900 font-medium hover:bg-primaryhover space-x-3 py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            data-testid="continue-button"
          >
            {isCalculating ? (
              <>
                <svg
                  className="h-5 w-5 text-neutral-900 animate-spin mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.93 4.93L7.76 7.76"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.24 16.24L19.07 19.07"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 12H22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.93 19.07L7.76 16.24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.24 7.76L19.07 4.93"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Calculating...</span>
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
