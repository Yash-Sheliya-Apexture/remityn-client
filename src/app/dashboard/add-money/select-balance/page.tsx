// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import { IoIosArrowForward } from "react-icons/io";
// import { GoPlus } from "react-icons/go"; // Import the Plus icon

// // Re-use Account interface from useBalances or define here
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// interface Account {
//     _id: string;
//     balance: string;
//     currency: Currency;
//     user: string;
//     createdAt: string;
//     updatedAt: string;
// }

// const SelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth();

//     useEffect(() => {
//         // Redirect logic remains the same
//         if (!isLoading && !error && balances.length === 0 && token) {
//             router.replace('/dashboard/add-balance');
//         }
//          if (error?.includes("Unauthorized")) {
//             router.replace('/auth/login');
//          }
//     }, [isLoading, balances, error, router, token]);

//     const handleSelectBalance = (balanceId: string) => {
//         router.push(`/dashboard/balances/${balanceId}/add-money`);
//     };

//     // --- Loading State ---
//     if (isLoading) {
//       return (
//         <div className=""> {/* Add a container for loading state */}
//           <Skeleton className="h-10 w-72 sm:w-96 mx-auto rounded-md mb-8" /> {/* Title Skeleton */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* Skeletons for balance cards */}
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Skeleton key={`bal-skel-${i}`} className="h-28 w-full rounded-2xl" />
//               ))}
//              {/* Skeleton for the "Add New" card */}
//              <Skeleton key="add-skel" className="h-28 w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600" />
//           </div>
//         </div>
//       );
//     }

//     // --- Main Content ---
//     return (
//         <div className="">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-mainheading dark:text-white text-center mb-8"> {/* Added margin-bottom */}
//                 Select a Balance to Add Money To
//             </h1>

//             {/* --- Error State --- */}
//             {error && !isLoading && (
//                 <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6"> {/* Added margin-bottom */}
//                     <p>Error loading balances: {error}</p>
//                     <button
//                         onClick={refetchBalances}
//                         className="mt-2 px-4 py-1 bg-primary text-neutral-900 rounded hover:bg-primaryhover"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             )}

//              {/* --- No Balances State --- */}
//              {!isLoading && !error && balances.length === 0 && token && (
//                  <div className="text-center text-neutral-600 dark:text-gray-400 p-6 bg-lightgray dark:bg-primarybox rounded-lg">
//                      You don't have any currency balances yet.
//                      <Link href="/dashboard/add-balance" className="text-primary hover:underline block mt-3 font-medium">
//                          Create your first balance to add money
//                      </Link>
//                  </div>
//              )}

//             {/* --- Balances Grid --- */}
//             {!isLoading && !error && balances.length > 0 && (
//                 // Apply grid layout here
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {/* Map existing balances */}
//                     {balances.map((account) => (
//                         <div
//                             key={account._id}
//                             onClick={() => handleSelectBalance(account._id)}
//                             className="p-6 bg-lightgray dark:bg-primarybox hover:bg-neutral-200/70 hover:dark:bg-secondarybox rounded-2xl flex justify-between items-center gap-2 transition-all duration-75 ease-linear cursor-pointer min-h-[112px]" // Added min-height for consistency
//                             role="button"
//                             tabIndex={0}
//                             onKeyPress={(e) => e.key === 'Enter' && handleSelectBalance(account._id)}
//                         >
//                             <div className="flex items-center gap-4 overflow-hidden"> {/* Added overflow-hidden */}
//                                 <Image
//                                     src={account.currency.flagImage || `/assets/icon/${account.currency.code.toLowerCase()}.svg`}
//                                     alt={`${account.currency.code} flag`}
//                                     width={40}
//                                     height={40}
//                                     className="rounded-full flex-shrink-0" // Added flex-shrink-0
//                                     onError={(e) => {
//                                         (e.target as HTMLImageElement).src = "/assets/icon/default.svg";
//                                     }}
//                                     unoptimized
//                                 />
//                                 <div className="flex-grow min-w-0"> {/* Added flex-grow and min-w-0 */}
//                                     <p className="text-neutral-900 dark:text-white text-lg font-semibold truncate"> {/* Added truncate */}
//                                         {account.currency.code} Balance
//                                     </p>
//                                     <p className="text-neutral-500 dark:text-gray-300 font-semibold text-sm"> {/* Adjusted text size */}
//                                         {parseFloat(account.balance).toFixed(2)} {account.currency.code}
//                                     </p>
//                                 </div>
//                             </div>
//                             <IoIosArrowForward className='text-neutral-900 dark:text-white ml-2 flex-shrink-0'/> {/* Added flex-shrink-0 */}
//                         </div>
//                     ))}

//                     {/* "Add Another Balance" Card - Now a Link styled as a card */}
//                     <Link
//                         href="/dashboard/add-balance?source=select"
//                         className="p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300">
//                          <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
//                              <GoPlus size={24} className="text-neutral-900 dark:text-white"/>
//                          </div>
//                          <span className="text-center text-neutral-500 dark:text-white">
//                             Add another currency to your account
//                          </span>
//                     </Link>
//                 </div>
//             )}

//              {/* --- Logged Out State --- */}
//              {!token && !isLoading && (
//                   <div className="text-center text-neutral-600 dark:text-gray-400 p-4">
//                      Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> to manage your balances.
//                   </div>
//               )}
//         </div>
//     );
// };

// export default SelectBalancePage;

// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component

// const AddMoneySelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth(); // Get token status

//     // --- Redirect Logic ---
//     useEffect(() => {
//         // If user isn't logged in and not loading, redirect to login
//         // Let the component handle the display if token exists but balances are empty
//         if (!token && !isLoading && !error) {
//              router.replace('/auth/login');
//         }
//          // Let the component handle auth errors displayed to the user
//     }, [token, isLoading, error, router]);

//     // --- Selection Handler ---
//     const handleSelectBalanceForAddMoney = useCallback((balanceId: string) => {
//         router.push(`/dashboard/balances/${balanceId}/add-money`);
//     }, [router]);

//     // --- Render the reusable component ---
//     return (
//         <SelectBalanceComponent
//             balances={balances}
//             isLoading={isLoading}
//             error={error}
//             refetchBalances={refetchBalances}
//             onSelectBalance={handleSelectBalanceForAddMoney}
//             allowAddBalance={true} // IMPORTANT: Allow adding new balance
//             pageTitle="Select a Balance to Add Money To"
//             noBalancePrimaryMessage="You don't have any currency balances yet."
//             noBalanceSecondaryMessage="Create your first balance to add money"
//             addBalanceHref="/dashboard/add-balance" // Link to create page
//             addBalanceLinkText="Add New Balance" // Text for the add card
//             tokenExists={!!token} // Pass token presence
//         />
//     );
// };

// export default AddMoneySelectBalancePage;

// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Import the reusable component
// import CurrencySelectorModal from '../../components/MainDashBoardSection/CurrencySelectorModal'; // Import the modal *** ADJUST PATH ***

// // --- Interface for NewAccount from Modal ---
// interface NewAccount {
//   _id: string;
//   userId: string;
//   currencyCode: string;
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const AddMoneySelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token } = useAuth(); // Get token status

//     // --- State for the Currency Selector Modal ---
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // --- Redirect Logic (no changes) ---
//     useEffect(() => {
//         if (!token && !isLoading && !error) {
//              router.replace('/auth/login');
//         }
//     }, [token, isLoading, error, router]);

//     // --- Selection Handler for existing balances (no changes) ---
//     const handleSelectBalanceForAddMoney = useCallback((balanceId: string) => {
//         router.push(`/dashboard/balances/${balanceId}/add-money`);
//     }, [router]);

//     // --- Modal Control Functions ---
//     const handleOpenModal = useCallback(() => {
//         setIsModalOpen(true);
//     }, []);

//     const handleCloseModal = useCallback(() => {
//         setIsModalOpen(false);
//     }, []);

//     // --- Handler for when a currency is successfully added ---
//     const handleCurrencyAdded = useCallback((newAccount: NewAccount) => {
//         console.log("New currency account added:", newAccount);
//         handleCloseModal(); // Close the modal
//         refetchBalances(); // Refresh the list of balances to show the new one
//         // Optional: Navigate somewhere, e.g., directly to add money for the new balance
//         // router.push(`/dashboard/balances/${newAccount._id}/add-money`);
//     }, [handleCloseModal, refetchBalances]); // Removed router dependency unless you uncomment the navigation

//     // --- Render the reusable component and the modal ---
//     return (
//         <>
//             <SelectBalanceComponent
//                 balances={balances}
//                 isLoading={isLoading}
//                 error={error}
//                 refetchBalances={refetchBalances}
//                 onSelectBalance={handleSelectBalanceForAddMoney}
//                 allowAddBalance={true} // Keep this true
//                 pageTitle="Select a Balance to Add Money To"
//                 noBalancePrimaryMessage="You don't have any currency balances yet."
//                 noBalanceSecondaryMessage="Create your first balance to add money"
//                 // addBalanceHref="/dashboard/add-balance" // Remove or comment out this prop - onAddBalanceClick takes precedence
//                 onAddBalanceClick={handleOpenModal} // *** Pass the function to open the modal ***
//                 addBalanceLinkText="Add New Balance" // Text for the add card
//                 tokenExists={!!token}
//             />

//             {/* Render the Modal */}
//             <CurrencySelectorModal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onCurrencyAdded={handleCurrencyAdded} // Pass the success handler
//             />
//         </>
//     );
// };

// export default AddMoneySelectBalancePage;

// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useBalances } from '../../../hooks/useBalances'; // Adjust path as needed
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust path & ensure it provides user object
// import SelectBalanceComponent from '../../../components/ui/SelectBalanceComponent'; // Adjust path as needed
// import CurrencySelectorModal from '../../components/MainDashBoardSection/CurrencySelectorModal'; // Adjust path as needed
// import KycRequiredModal from '@/app/dashboard/components/KycRequiredModal'; // Adjust path as needed
// // import LoadingSpinner from '@/components/ui/LoadingSpinner'; // Optional: if needed for other async ops

// // --- Interfaces ---
// interface NewAccount { // From CurrencySelectorModal
//   _id: string;
//   userId: string;
//   currencyCode: string;
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
// }
// // --- Assumed User structure from useAuth ---
// interface AuthUser {
//     kycStatus: 'verified' | 'pending' | 'not_started' | 'rejected' | null | undefined;
// }
// interface AuthContextType {
//     token: string | null;
//     user: AuthUser | null;
// }

// const AddMoneySelectBalancePage = () => {
//     const router = useRouter();
//     const { balances, isLoading, error, refetchBalances } = useBalances();
//     const { token, user } = useAuth() as AuthContextType; // Cast or ensure useAuth provides user

//     // --- State for Modals ---
//     const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
//     const [isKycModalOpen, setIsKycModalOpen] = useState(false);

//     // --- Determine KYC Status ---
//     const isKycVerified = user?.kycStatus === 'verified';

//     // --- Redirect Logic ---
//     useEffect(() => {
//         if (!isLoading && !error && !token) {
//              console.log("No token found on Add Money page, redirecting to login.");
//              router.replace('/auth/login');
//         }
//     }, [token, user, isLoading, error, router]);

//      // --- KYC Modal Actions ---
//      const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//      const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//      const handleStartVerification = useCallback(() => {
//          router.push('/dashboard/kyc'); // Adjust path to your KYC page
//          handleCloseKycModal();
//      }, [router, handleCloseKycModal]);

//     // --- Selection Handler for EXISTING balances (with KYC Check) ---
//     const handleSelectBalanceForAddMoney = useCallback((balanceId: string) => {
//         // 1. Check KYC Status
//         if (!isKycVerified) {
//             console.log("KYC not verified. Showing KYC modal.");
//             handleOpenKycModal();
//             return;
//         }
//         // 2. Proceed if KYC is verified
//         console.log("KYC verified. Navigating to add money page for balance:", balanceId);
//         router.push(`/dashboard/balances/${balanceId}/add-money`);
//     }, [router, isKycVerified, handleOpenKycModal]);

//     // --- Handler for clicking "Add New Balance" card/link (with KYC Check) ---
//     const handleAddBalanceClick = useCallback(() => {
//         // 1. Check KYC Status
//         if (!isKycVerified) {
//             console.log("KYC not verified. Showing KYC modal instead of currency selector.");
//             handleOpenKycModal();
//             return;
//         }
//         // 2. Proceed if KYC is verified: Open Currency Selector
//         console.log("KYC verified. Opening currency selector modal.");
//         setIsCurrencyModalOpen(true);
//     }, [isKycVerified, handleOpenKycModal]);

//     // --- Currency Selector Modal Control Functions ---
//     const handleCloseCurrencyModal = useCallback(() => {
//         setIsCurrencyModalOpen(false);
//     }, []);

//     const handleCurrencyAdded = useCallback((newAccount: NewAccount) => {
//         console.log("New currency account added:", newAccount);
//         handleCloseCurrencyModal();
//         refetchBalances(); // Refresh list to show the new balance
//     }, [handleCloseCurrencyModal, refetchBalances, router, isKycVerified]); // Add dependencies if using navigation

//     // --- Render ---
//     return (
//         <>
//             <SelectBalanceComponent
//                 balances={balances}
//                 isLoading={isLoading}
//                 error={error}
//                 refetchBalances={refetchBalances}
//                 onSelectBalance={handleSelectBalanceForAddMoney} // Use KYC-aware handler
//                 allowAddBalance={true} // Allow adding new balances
//                 onAddBalanceClick={handleAddBalanceClick} // Use KYC-aware handler for add action
//                 pageTitle="Select a Balance to Add Money To"
//                 // Conditional primary message
//                 noBalancePrimaryMessage={
//                     isLoading ? "" :
//                     !user ? "" :
//                     isKycVerified
//                         ? "You don't have any currency balances yet."
//                         : "Complete KYC verification to add balances and funds."
//                 }
//                 // Conditional secondary message (will trigger onAddBalanceClick)
//                 noBalanceSecondaryMessage={
//                     isLoading ? "" :
//                     !user ? "" :
//                     isKycVerified
//                         ? "Create your first balance to add money"
//                         : "Start KYC verification now"
//                 }
//                 addBalanceLinkText="Add New Balance" // Text for the card
//                 tokenExists={!!token}
//             />

//             {/* Currency Selector Modal */}
//             <CurrencySelectorModal
//                 isOpen={isCurrencyModalOpen}
//                 onClose={handleCloseCurrencyModal}
//                 onCurrencyAdded={handleCurrencyAdded}
//             />

//             {/* KYC Required Modal */}
//             <KycRequiredModal
//                 isOpen={isKycModalOpen}
//                 onClose={handleCloseKycModal}
//                 onStartVerification={handleStartVerification}
//             />
//         </>
//     );
// };

// export default AddMoneySelectBalancePage;

// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useBalances } from "../../../hooks/useBalances"; // Adjust path as needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path & ensure it provides user object
// import SelectBalanceComponent from "../../../components/ui/SelectBalanceComponent"; // Adjust path as needed
// import CurrencySelectorModal from "../../components/MainDashBoardSection/CurrencySelectorModal"; // Adjust path as needed
// import KycRequiredModal from "@/app/dashboard/components/KycRequiredModal"; // Adjust path as needed
// // import LoadingSpinner from '@/components/ui/LoadingSpinner'; // Optional: if needed for other async ops

// // --- Interfaces ---
// interface NewAccount {
//   // From CurrencySelectorModal
//   _id: string;
//   userId: string;
//   currencyCode: string;
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
// }
// // NOTE: We don't need to redefine AuthUser/AuthContextType here if useAuth provides typed context.
// // AuthContext itself exports the necessary types.

// const AddMoneySelectBalancePage = () => {
//   const router = useRouter();
//   const {
//     balances,
//     isLoading: isBalancesLoading,
//     error,
//     refetchBalances,
//   } = useBalances();
//   // Get user and auth loading status from context
//   const { token, user, loading: isAuthLoading } = useAuth();

//   // --- State for Modals ---
//   const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);

//   // --- Determine KYC Status ---
//   // Check only after auth is loaded and user exists
//   const isKycVerified = !isAuthLoading && user?.kyc.status === "verified";

//   // --- Redirect Logic ---
//   useEffect(() => {
//     // Redirect ONLY after initial auth loading is complete
//     if (!isAuthLoading && !token) {
//       console.log(
//         "Add Money: No token after auth check, redirecting to login."
//       );
//       router.replace("/auth/login");
//     }
//     // NOTE: The `token` dependency alone is usually sufficient if token is cleared on logout.
//     // `user` can be added if login flow might set token before user object is fully ready.
//   }, [token, isAuthLoading, router]);

//   // --- KYC Modal Actions ---
//   const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//   const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//   const handleStartVerification = useCallback(() => {
//     // Use router to navigate to the start page of the KYC flow
//     router.push("/kyc/start"); // Ensure this is the correct path
//     handleCloseKycModal();
//   }, [router, handleCloseKycModal]);

//   // --- Selection Handler for EXISTING balances (with KYC Check) ---
//   const handleSelectBalanceForAddMoney = useCallback(
//     (balanceId: string) => {
//       // 1. Wait for auth loading to finish
//       if (isAuthLoading) {
//         console.log("Select Balance (Add Money): Waiting for auth...");
//         return; // Or show some indicator
//       }
//       // 2. Check KYC Status
//       if (!isKycVerified) {
//         console.log(
//           "Select Balance (Add Money): KYC not verified. Showing KYC modal."
//         );
//         handleOpenKycModal();
//         return;
//       }
//       // 3. Proceed if KYC is verified
//       console.log(
//         "Select Balance (Add Money): KYC verified. Navigating to add money page for balance:",
//         balanceId
//       );
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//     },
//     [router, isKycVerified, isAuthLoading, handleOpenKycModal]
//   ); // Add isAuthLoading dependency

//   // --- Handler for clicking "Add New Balance" card/link (with KYC Check) ---
//   const handleAddBalanceClick = useCallback(() => {
//     // 1. Wait for auth loading to finish
//     if (isAuthLoading) {
//       console.log("Add Balance Click: Waiting for auth...");
//       return; // Or show some indicator
//     }
//     // 2. Check KYC Status
//     if (!isKycVerified) {
//       console.log(
//         "Add Balance Click: KYC not verified. Showing KYC modal instead of currency selector."
//       );
//       handleOpenKycModal();
//       return;
//     }
//     // 3. Proceed if KYC is verified: Open Currency Selector
//     console.log(
//       "Add Balance Click: KYC verified. Opening currency selector modal."
//     );
//     setIsCurrencyModalOpen(true);
//   }, [isKycVerified, isAuthLoading, handleOpenKycModal]); // Add isAuthLoading dependency

//   // --- Currency Selector Modal Control Functions ---
//   const handleCloseCurrencyModal = useCallback(() => {
//     setIsCurrencyModalOpen(false);
//   }, []);

//   const handleCurrencyAdded = useCallback(
//     (newAccount: NewAccount) => {
//       console.log("New currency account added:", newAccount);
//       handleCloseCurrencyModal();
//       refetchBalances(); // Refresh list to show the new balance
//     },
//     [handleCloseCurrencyModal, refetchBalances]
//   ); // Removed router/kyc dependency unless navigation is added

//   // Combined loading state
//   const isLoading = isBalancesLoading || isAuthLoading;

//   // --- Render ---
//   return (
//     <>
//       <main className="Add-Money">
//         <SelectBalanceComponent
//           balances={balances}
//           isLoading={isLoading} // Use combined loading state
//           error={error}
//           refetchBalances={refetchBalances}
//           onSelectBalance={handleSelectBalanceForAddMoney} // Use KYC-aware handler
//           allowAddBalance={true} // Allow adding new balances
//           onAddBalanceClick={handleAddBalanceClick} // Use KYC-aware handler for add action
//           pageTitle="Select a Balance to Add Money To"
//           // Conditional primary message based on KYC status *after* loading finishes
//           noBalancePrimaryMessage={
//             isLoading
//               ? "Loading balances..." // Show loading text
//               : !user
//               ? "Login required to manage balances." // Should be handled by redirect, but good fallback
//               : isKycVerified
//               ? "You don't have any currency balances yet."
//               : "Complete KYC verification to add balances and funds."
//           }
//           // Conditional secondary message (will trigger respective handler)
//           noBalanceSecondaryMessage={
//             isLoading
//               ? "" // No secondary text while loading
//               : !user
//               ? ""
//               : isKycVerified
//               ? "Create your first balance to add money" // Triggers handleAddBalanceClick -> currency modal
//               : "Start KYC verification now" // Triggers handleAddBalanceClick -> KYC modal
//           }
//           addBalanceLinkText="Add New Balance" // Text for the card/link
//           tokenExists={!!token} // Keep this for potential internal logic in SelectBalanceComponent
//         />

//         {/* Currency Selector Modal */}
//         <CurrencySelectorModal
//           isOpen={isCurrencyModalOpen}
//           onClose={handleCloseCurrencyModal}
//           onCurrencyAdded={handleCurrencyAdded}
//         />

//         {/* KYC Required Modal */}
//         <KycRequiredModal
//           isOpen={isKycModalOpen}
//           onClose={handleCloseKycModal}
//           onStartVerification={handleStartVerification}
//         />
//       </main>
//     </>
//   );
// };

// export default AddMoneySelectBalancePage;

// // Last code
// // frontend/src/app/dashboard/add-money/select-balance/page.tsx
// "use client";

// import React, { useEffect, useCallback, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useBalances } from "../../../hooks/useBalances"; // Adjust path as needed
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path & ensure it provides user object
// import SelectBalanceComponent from "../../../components/ui/SelectBalanceComponent"; // Adjust path as needed
// // Import both the component and the type definition
// import CurrencySelectorModal, { AddedAccountInfo } from "../../components/MainDashBoardSection/CurrencySelectorModal"; // Adjust path as needed & IMPORT AddedAccountInfo
// import KycRequiredModal from "@/app/dashboard/components/KycRequiredModal"; // Adjust path as needed
// // import LoadingSpinner from '@/components/ui/LoadingSpinner'; // Optional: if needed for other async ops

// // --- Interfaces ---
// // REMOVED: The NewAccount interface defined here seems to match the *API response* structure,
// // but the CurrencySelectorModal explicitly passes the *mapped* AddedAccountInfo
// // to the onCurrencyAdded prop. So, this type is not needed here.
// // interface NewAccount {
// //   // From CurrencySelectorModal
// //   _id: string;
// //   userId: string;
// //   currencyCode: string;
// //   balance: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }
// // NOTE: We don't need to redefine AuthUser/AuthContextType here if useAuth provides typed context.
// // AuthContext itself exports the necessary types.

// const AddMoneySelectBalancePage = () => {
//   const router = useRouter();
//   const {
//     balances,
//     isLoading: isBalancesLoading,
//     error,
//     refetchBalances,
//   } = useBalances();
//   // Get user and auth loading status from context
//   const { token, user, loading: isAuthLoading } = useAuth();

//   // --- State for Modals ---
//   const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);

//   // --- Determine KYC Status ---
//   // Check only after auth is loaded and user exists
//   const isKycVerified = !isAuthLoading && user?.kyc.status === "verified";

//   // --- Redirect Logic ---
//   useEffect(() => {
//     // Redirect ONLY after initial auth loading is complete
//     if (!isAuthLoading && !token) {
//       console.log(
//         "Add Money: No token after auth check, redirecting to login."
//       );
//       router.replace("/auth/login");
//     }
//   }, [token, isAuthLoading, router]);

//   // --- KYC Modal Actions ---
//   const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//   const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//   const handleStartVerification = useCallback(() => {
//     router.push("/kyc/start"); // Ensure this is the correct path
//     handleCloseKycModal();
//   }, [router, handleCloseKycModal]);

//   // --- Selection Handler for EXISTING balances (with KYC Check) ---
//   const handleSelectBalanceForAddMoney = useCallback(
//     (balanceId: string) => {
//       if (isAuthLoading) {
//         console.log("Select Balance (Add Money): Waiting for auth...");
//         return;
//       }
//       if (!isKycVerified) {
//         console.log(
//           "Select Balance (Add Money): KYC not verified. Showing KYC modal."
//         );
//         handleOpenKycModal();
//         return;
//       }
//       console.log(
//         "Select Balance (Add Money): KYC verified. Navigating to add money page for balance:",
//         balanceId
//       );
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//     },
//     [router, isKycVerified, isAuthLoading, handleOpenKycModal]
//   );

//   // --- Handler for clicking "Add New Balance" card/link (with KYC Check) ---
//   const handleAddBalanceClick = useCallback(() => {
//     if (isAuthLoading) {
//       console.log("Add Balance Click: Waiting for auth...");
//       return;
//     }
//     if (!isKycVerified) {
//       console.log(
//         "Add Balance Click: KYC not verified. Showing KYC modal instead of currency selector."
//       );
//       handleOpenKycModal();
//       return;
//     }
//     console.log(
//       "Add Balance Click: KYC verified. Opening currency selector modal."
//     );
//     setIsCurrencyModalOpen(true);
//   }, [isKycVerified, isAuthLoading, handleOpenKycModal]);

//   // --- Currency Selector Modal Control Functions ---
//   const handleCloseCurrencyModal = useCallback(() => {
//     setIsCurrencyModalOpen(false);
//   }, []);

//   // FIX: Change the expected type from NewAccount to AddedAccountInfo
//   const handleCurrencyAdded = useCallback(
//     (newAccountInfo: AddedAccountInfo) => { // Use the correct type received from the modal
//       console.log("New currency account added:", newAccountInfo);
//       // You can now use newAccountInfo._id, newAccountInfo.balance, etc.
//       handleCloseCurrencyModal();
//       refetchBalances();
//     },
//     [handleCloseCurrencyModal, refetchBalances]
//   );

//   // --- Effect to handle body scroll based on modal state using inline styles ---
//   useEffect(() => {
//     // Store the original overflow style
//     const originalOverflow = document.body.style.overflow;

//     // Check if *either* modal is open
//     const isAnyModalOpen = isCurrencyModalOpen || isKycModalOpen;

//     if (isAnyModalOpen) {
//       // Apply 'hidden' to prevent scrolling
//       document.body.style.overflow = 'hidden';
//       // console.log("Modal open, setting body overflow: hidden"); // Optional logging
//     } else {
//       // Restore the original overflow style only if it was changed by this effect
//       // (This check prevents overriding other potential overflow settings)
//       if (document.body.style.overflow === 'hidden') {
//          document.body.style.overflow = originalOverflow || ''; // Use original or reset if none
//         // console.log("Modals closed, restoring body overflow:", originalOverflow || 'default'); // Optional logging
//       }
//     }

//     // --- Cleanup function ---
//     // This runs when the component unmounts OR before the effect runs again.
//     // It ensures the style is reset if the component is destroyed while a modal is open.
//     return () => {
//        // Only restore if we actually set it to hidden
//        if (document.body.style.overflow === 'hidden') {
//          document.body.style.overflow = originalOverflow || ''; // Use original or reset
//          // console.log("Effect cleanup: Restoring body overflow:", originalOverflow || 'default'); // Optional logging
//        }
//     };
//     // We include originalOverflow in dependencies technically, but since it's read
//     // *before* the effect logic, it doesn't cause re-runs itself. The core dependencies
//     // that trigger the effect are the modal states.
//   }, [isCurrencyModalOpen, isKycModalOpen]); // Re-run effect when modal states change


//   // Combined loading state
//   const isLoading = isBalancesLoading || isAuthLoading;

//   // --- Render ---
//   return (
//     <>
//       {/* The main content area */}
//       <main className="Add-Money">
//         <SelectBalanceComponent
//           balances={balances}
//           isLoading={isLoading}
//           error={error}
//           refetchBalances={refetchBalances}
//           onSelectBalance={handleSelectBalanceForAddMoney}
//           allowAddBalance={true}
//           onAddBalanceClick={handleAddBalanceClick}
//           pageTitle="Select a Balance to Add Money"
//           noBalancePrimaryMessage={
//             isLoading
//               ? "Loading balances..."
//               : !user
//               ? "Login required to manage balances."
//               : isKycVerified
//               ? "You don't have any currency balances yet."
//               : "Complete KYC verification to add balances and funds."
//           }
//           noBalanceSecondaryMessage={
//             isLoading
//               ? ""
//               : !user
//               ? ""
//               : isKycVerified
//               ? "Create your first balance to add money"
//               : "Start KYC verification now"
//           }
//           addBalanceLinkText="Add New Balance"
//           tokenExists={!!token}
//         />
//       </main> {/* End of main content */}

//         {/* Currency Selector Modal */}
//         <CurrencySelectorModal
//           isOpen={isCurrencyModalOpen}
//           onClose={handleCloseCurrencyModal}
//           onCurrencyAdded={handleCurrencyAdded} // This prop expects AddedAccountInfo
//         />

//       {/* KYC Required Modal */}
//       {/* Modal itself should handle its own internal scrolling if needed */}
//       <KycRequiredModal
//         isOpen={isKycModalOpen}
//         onClose={handleCloseKycModal}
//         onStartVerification={handleStartVerification}
//       />
//     </>
//   );
// };

// export default AddMoneySelectBalancePage;



// frontend/src/app/dashboard/add-money/select-balance/page.tsx
"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useBalances } from "../../../hooks/useBalances"; // Adjust path as needed
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path & ensure it provides user object
import SelectBalanceComponent from "../../../components/ui/SelectBalanceComponent"; // Adjust path as needed
// Import both the component and the type definition
import CurrencySelectorModal, { AddedAccountInfo } from "../../components/MainDashBoardSection/CurrencySelectorModal"; // Adjust path as needed & IMPORT AddedAccountInfo
import KycRequiredModal from "@/app/dashboard/components/KycRequiredModal"; // Adjust path as needed
// import LoadingSpinner from '@/components/ui/LoadingSpinner'; // Optional: if needed for other async ops

const AddMoneySelectBalancePage = () => {
  const router = useRouter();
  const {
    balances,
    isLoading: isBalancesLoading,
    error,
    refetchBalances,
  } = useBalances();
  // Get user and auth loading status from context
  const { token, user, loading: isAuthLoading } = useAuth();

  // --- State for Modals ---
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  // --- Determine KYC Status ---
  // Check only after auth is loaded and user exists
  const isKycVerified = !isAuthLoading && user?.kyc.status === "verified";

  // --- Redirect Logic ---
  useEffect(() => {
    // Redirect ONLY after initial auth loading is complete
    if (!isAuthLoading && !token) {
      console.log(
        "Add Money: No token after auth check, redirecting to login."
      );
      router.replace("/auth/login");
    }
  }, [token, isAuthLoading, router]);

  // --- KYC Modal Actions ---
  const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
  const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
  const handleStartVerification = useCallback(() => {
    router.push("/kyc/start"); // Ensure this is the correct path
    handleCloseKycModal();
  }, [router, handleCloseKycModal]);

  // --- Selection Handler for EXISTING balances (with KYC Check) ---
  const handleSelectBalanceForAddMoney = useCallback(
    (balanceId: string) => {
      if (isAuthLoading) {
        console.log("Select Balance (Add Money): Waiting for auth...");
        return;
      }
      if (!isKycVerified) {
        console.log(
          "Select Balance (Add Money): KYC not verified. Showing KYC modal."
        );
        handleOpenKycModal();
        return;
      }
      console.log(
        "Select Balance (Add Money): KYC verified. Navigating to add money page for balance:",
        balanceId
      );
      router.push(`/dashboard/balances/${balanceId}/add-money`);
    },
    [router, isKycVerified, isAuthLoading, handleOpenKycModal]
  );

  // --- Handler for clicking "Add New Balance" card/link (KYC check REMOVED for this action) ---
  const handleAddBalanceClick = useCallback(() => {
    if (isAuthLoading) {
      console.log("Add Balance Click: Waiting for auth...");
      return;
    }
    // If !isAuthLoading, it implies token/user status is determined.
    // If !token, the useEffect would have redirected. So token should exist if we reach here.
    // No KYC check here - directly open currency selector.
    console.log(
      "Add Balance Click: Opening currency selector modal."
    );
    setIsCurrencyModalOpen(true);
  }, [isAuthLoading]); // Dependencies updated

  // --- Currency Selector Modal Control Functions ---
  const handleCloseCurrencyModal = useCallback(() => {
    setIsCurrencyModalOpen(false);
  }, []);

  const handleCurrencyAdded = useCallback(
    (newAccountInfo: AddedAccountInfo) => {
      console.log("New currency account added:", newAccountInfo);
      handleCloseCurrencyModal();
      refetchBalances();
    },
    [handleCloseCurrencyModal, refetchBalances]
  );

  // --- Effect to handle body scroll based on modal state using inline styles ---
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const isAnyModalOpen = isCurrencyModalOpen || isKycModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      if (document.body.style.overflow === 'hidden') {
         document.body.style.overflow = originalOverflow || '';
      }
    }
    return () => {
       if (document.body.style.overflow === 'hidden') {
         document.body.style.overflow = originalOverflow || '';
       }
    };
  }, [isCurrencyModalOpen, isKycModalOpen]);


  // Combined loading state
  const isLoading = isBalancesLoading || isAuthLoading;

  // --- Render ---
  return (
    <>
      {/* The main content area */}
      <main className="Add-Money">
        <SelectBalanceComponent
          balances={balances}
          isLoading={isLoading}
          error={error}
          refetchBalances={refetchBalances}
          onSelectBalance={handleSelectBalanceForAddMoney}
          allowAddBalance={true}
          onAddBalanceClick={handleAddBalanceClick}
          pageTitle="Select a Balance to Add Money"
          noBalancePrimaryMessage={
            isLoading // Covers balances loading or auth loading
              ? "Loading..."
              // The following applies if !isLoading.
              // Auth state (user, isKycVerified) is resolved.
              // SelectBalanceComponent renders this block if balances.length === 0 and tokenExists.
              : !isKycVerified
              ? "Add your first currency balance. KYC verification will be needed to add funds."
              : "You don't have any currency balances yet."
          }
          noBalanceSecondaryMessage={
            isLoading
              ? ""
              // The following applies if !isLoading and balances.length === 0 and tokenExists
              : "Add New Balance" // This text will be used for the button
          }
          addBalanceLinkText="Add New Balance" // This text is for the "+" card when balances exist
          tokenExists={!!token}
        />
      </main> {/* End of main content */}

        {/* Currency Selector Modal */}
        <CurrencySelectorModal
          isOpen={isCurrencyModalOpen}
          onClose={handleCloseCurrencyModal}
          onCurrencyAdded={handleCurrencyAdded}
        />

      {/* KYC Required Modal */}
      <KycRequiredModal
        isOpen={isKycModalOpen}
        onClose={handleCloseKycModal}
        onStartVerification={handleStartVerification}
      />
    </>
  );
};

export default AddMoneySelectBalancePage;