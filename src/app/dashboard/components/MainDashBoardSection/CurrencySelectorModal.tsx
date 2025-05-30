// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../../../hooks/useAuth";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import apiConfig from "../../../config/apiConfig";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle  } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface CurrencyOption {
//   code: string;
//   currencyName?: string;
//   flagImage?: string;
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: any) => void;
// }

// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("/currencies");
//         // Filter out INR when setting the initial list
//         const availableCurrencies = response.data.filter(
//           (currency: CurrencyOption) => currency.code !== "INR"
//         );
//         setCurrencies(availableCurrencies);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to load currencies");
//         setIsLoading(false);
//         console.error("Error fetching currencies:", err);
//       }
//     };

//     if (isOpen) {
//       // Fetch only when the modal is opened
//       fetchCurrencies();
//       // Reset state when opening
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//     }
//   }, [isOpen]); // Re-fetch when isOpen changes to true

//   // Filter based on search query (INR is already removed from the base `currencies` state)
//   const filteredCurrencies = currencies.filter(
//     (currency) =>
//       currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (currency.currencyName &&
//         currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleCurrencySelect = (code: string) => {
//     // Double-check here just in case, though it shouldn't be possible if filtered out
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//     }
//   };

//   const handleConfirm = async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       // Add extra check
//       alert("Please select a valid currency.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCurrencyAdded(response.data);
//       // No need to call onClose here, Dialog's onOpenChange handles it
//       // onClose();
//       // Reset state after successful addition for next opening
//       setIsLoading(false);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to add currency account");
//       setIsLoading(false);
//       console.error("Error adding currency account:", err);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchQuery("");
//   };

//   // Use the Dialog's onOpenChange for closing logic
//   const handleOpenChange = (open: boolean) => {
//     if (!open) {
//       // Reset state when closing via any method (overlay click, escape key, cancel button)
//       clearSearchTerm();
//       setSelectedCurrencyCode(""); // Clear selection on close
//       setError(null); // Clear error on close
//       onClose(); // Call the original onClose handler
//     }
//     // If opening, the useEffect handles fetching and state reset
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       {/* Use handleOpenChange */}
//       <DialogContent >
//         <div className="mt-4 h-[calc(100%-80px)] flex flex-col gap-4">
//           <DialogHeader>
//             <DialogTitle>Open a balance</DialogTitle>
//           </DialogHeader>

//           <div className="relative">
//             <div className="absolute sm:inset-y-0 top-4 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="h-5 w-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currency..."
//               className="w-full rounded-full py-3 pl-12 pr-3 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {searchQuery && (
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>

//           <DialogDescription>
//             Choose a currency to add to your account.
//           </DialogDescription>

//           {isLoading && <p>Loading currencies...</p>}
//           {error && !isLoading && (
//             <div className="p-4 rounded-lg bg-lightgray dark:bg-primarybox inline-flex items-center gap-2">
//                 <FaExclamationCircle  className="text-red-600"/>
//                 <p className="text-red-600">{error}</p>
//             </div>
//           )}

//           <div className={`sm:h-64 overflow-y-auto scrollbar-hide mb-4 space-y-2`}>
//             {!isLoading && filteredCurrencies.length > 0
//               ? filteredCurrencies.map((currency) => (
//                   <div className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer ${
//                         selectedCurrencyCode === currency.code
//                           ? "bg-lightgray dark:bg-primarybox"
//                           : ""
//                       }`} key={currency.code}>
//                     <div
//                       className={`flex items-center gap-4`}
//                       onClick={() => handleCurrencySelect(currency.code)}
//                     >
//                       {currency.flagImage && (
//                         <Image
//                           src={currency.flagImage.trim()}
//                           alt={`${currency.currencyName || currency.code} flag`}
//                           width={44}
//                           height={44}
//                           onError={() =>
//                             console.error(
//                               `Error loading image for ${currency.code}: ${currency.flagImage}`
//                             )
//                           }
//                         />
//                       )}
//                       <div className="flex flex-col">
//                         <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                           {currency.code}
//                         </span>
//                         {currency.currencyName && (
//                           <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
//                             {currency.currencyName}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               : !isLoading && (
//                   <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                     No results found.
//                   </p>
//                 )}
//           </div>
//         </div>

//         <DialogFooter>
//           {/* Cancel button now implicitly uses handleOpenChange */}
//           <button
//             className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer"
//             onClick={() => handleOpenChange(false)} // Explicitly call close logic
//             disabled={isLoading}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer" // Added disabled styling
//             type="button"
//             onClick={handleConfirm}
//             disabled={
//               isLoading ||
//               !selectedCurrencyCode || // Still need a selection
//               selectedCurrencyCode === "INR" // Belt-and-suspenders check
//               // No need to check filteredCurrencies.length === 0 if !selectedCurrencyCode handles it
//             }
//           >
//             {isLoading ? "Adding..." : "Confirm"} {/* Loading text */}
//           </button>
//         </DialogFooter>

//         {/* Display error message related to adding account */}
//         {error && isLoading && (
//           <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CurrencySelectorModal;

// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import { useAuth } from "../../../contexts/AuthContext";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import apiConfig from "../../../config/apiConfig";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define a more specific type for the currency options fetched from the API
// interface CurrencyOption {
//   code: string;
//   currencyName?: string; // Optional as it might not always be present
//   flagImage?: string; // Optional as it might not always be present
// }

// // Define a more specific type for the newly created account returned by the API
// // Adjust properties based on what your POST /accounts endpoint actually returns
// interface NewAccount {
//   id: string; // Example property: account ID
//   userId: string; // Example property: user ID
//   currencyCode: string;
//   balance: number; // Example property: initial balance
//   createdAt: string; // Example property: creation timestamp
//   updatedAt: string; // Example property: update timestamp
//   // Add other properties returned by your API
// }

// // Define a type for the expected structure of API error responses
// interface ApiErrorResponse {
//     message?: string;
//     // Add other potential error properties if known, e.g., errorCode, details
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: NewAccount) => void; // Use the specific NewAccount type
// }

// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true); // Keep true initially for fetch on open
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         // Assuming the API returns an array of CurrencyOption objects
//         const response = await axios.get<CurrencyOption[]>("/currencies");
//         // Filter out INR when setting the initial list
//         const availableCurrencies = response.data.filter(
//           (currency) => currency.code !== "INR"
//         );
//         setCurrencies(availableCurrencies);
//         setIsLoading(false);
//       } catch (err) { // Catch block now handles unknown/AxiosError
//         setIsLoading(false);
//         let message = "Failed to load currencies"; // Default message
//         if (axios.isAxiosError<ApiErrorResponse>(err)) {
//             // If it's an Axios error, try to get the message from the response data
//             message = err.response?.data?.message || err.message || message;
//         } else if (err instanceof Error) {
//             // If it's a generic Error, use its message
//             message = err.message;
//         }
//         setError(message);
//         console.error("Error fetching currencies:", err);
//       }
//     };

//     if (isOpen) {
//       // Fetch only when the modal is opened
//       fetchCurrencies();
//       // Reset state when opening
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//     }
//   }, [isOpen]); // Re-fetch when isOpen changes to true

//   // Filter based on search query (INR is already removed from the base `currencies` state)
//   const filteredCurrencies = currencies.filter(
//     (currency) =>
//       currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (currency.currencyName &&
//         currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleCurrencySelect = (code: string) => {
//     // Double-check here just in case, though it shouldn't be possible if filtered out
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//     }
//   };

//   const handleConfirm = async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       // Add extra check
//       // Consider using a more user-friendly error display instead of alert
//       setError("Please select a valid currency.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       // Assuming the API returns a NewAccount object on success
//       const response = await axios.post<NewAccount>(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCurrencyAdded(response.data); // Pass the specifically typed data
//       // No need to call onClose here, Dialog's onOpenChange handles it
//       // Reset state after successful addition for next opening
//       setIsLoading(false);
//        // Optionally close the modal on success by calling handleOpenChange(false)
//       // handleOpenChange(false); // Or let the user close it manually
//     } catch (err) { // Catch block now handles unknown/AxiosError
//       setIsLoading(false);
//       let message = "Failed to add currency account"; // Default message
//        if (axios.isAxiosError<ApiErrorResponse>(err)) {
//            // If it's an Axios error, try to get the message from the response data
//            message = err.response?.data?.message || err.message || message;
//        } else if (err instanceof Error) {
//            // If it's a generic Error, use its message
//            message = err.message;
//        }
//       setError(message);
//       console.error("Error adding currency account:", err);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchQuery("");
//   };

//   // Use the Dialog's onOpenChange for closing logic
//   const handleOpenChange = (open: boolean) => {
//     if (!open) {
//       // Reset state when closing via any method (overlay click, escape key, cancel button)
//       clearSearchTerm();
//       setSelectedCurrencyCode(""); // Clear selection on close
//       setError(null); // Clear error on close
//       setIsLoading(true); // Reset loading state for next open
//       onClose(); // Call the original onClose handler
//     }
//     // If opening, the useEffect handles fetching and state reset
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       {/* Use handleOpenChange */}
//       <DialogContent>
//         {/* Removed fixed height for DialogContent to allow natural expansion */}
//         <div className="mt-4 flex flex-col gap-4"> {/* Removed h-[calc(100%-80px)] */}
//           <DialogHeader>
//             <DialogTitle>Open a balance</DialogTitle>
//           </DialogHeader>

//           <div className="relative">
//             <div className="absolute sm:inset-y-0 top-4 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="h-5 w-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currency..."
//               className="w-full rounded-full py-3 pl-12 pr-10 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Added pr-10 for cancel button spacing
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {searchQuery && (
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none"
//                 aria-label="Clear search" // Added aria-label for accessibility
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>

//           <DialogDescription>
//             Choose a currency to add to your account.
//           </DialogDescription>

//           {/* Display Loading or Error State for Fetching */}
//            {isLoading && !error && currencies.length === 0 && <p className="text-center py-4">Loading currencies...</p>}
//            {error && !isLoading && ( // Show fetch error only when not loading
//              <div className="p-4 rounded-lg bg-lightgray dark:bg-primarybox inline-flex items-center gap-2">
//                  <FaExclamationCircle className="text-red-600 flex-shrink-0" />
//                  <p className="text-red-600 text-sm">{error}</p>
//              </div>
//            )}

//           {/* Currency List Section */}
//           {/* Adjusted height and handling of loading/empty states */}
//           <div className={`sm:max-h-64 overflow-y-auto scrollbar-hide mb-4 space-y-2 ${isLoading && currencies.length === 0 ? 'hidden' : ''}`}>
//              {!isLoading && filteredCurrencies.length > 0
//                ? filteredCurrencies.map((currency) => (
//                    <div
//                      key={currency.code}
//                      className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer ${
//                          selectedCurrencyCode === currency.code
//                            ? "bg-lightgray dark:bg-primarybox"
//                            : ""
//                        }`}
//                      onClick={() => handleCurrencySelect(currency.code)}
//                      role="button" // Added role for accessibility
//                      tabIndex={0} // Make it focusable
//                      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleCurrencySelect(currency.code) : null} // Allow selection with keyboard
//                    >
//                      <div className="flex items-center gap-4">
//                        {currency.flagImage ? ( // Check if flagImage exists and is not empty
//                          <Image
//                            src={currency.flagImage.trim()}
//                            alt={`${currency.currencyName || currency.code} flag`}
//                            width={44}
//                            height={44}
//                            onError={(e) => {
//                              // Optional: Hide image or show placeholder on error
//                              console.error(`Error loading image for ${currency.code}: ${currency.flagImage}`);
//                              (e.target as HTMLImageElement).style.display = 'none'; // Example: hide broken image
//                            }}
//                            className="rounded-full object-cover" // Added styling
//                          />
//                        ) : (
//                            // Optional: Placeholder if no image URL is provided
//                             <div className="w-[44px] h-[44px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700">
//                                 {currency.code.substring(0, 2)}
//                             </div>
//                        )}
//                        <div className="flex flex-col">
//                          <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                            {currency.code}
//                          </span>
//                          {currency.currencyName && (
//                            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
//                              {currency.currencyName}
//                            </span>
//                          )}
//                        </div>
//                      </div>
//                    </div>
//                  ))
//                : !isLoading && searchQuery && ( // Show "No results" only if not loading and a search query exists
//                    <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                      No results found for &quot;{searchQuery}&quot;.
//                    </p>
//                  )}
//                {/* Consider adding a message if currencies array is empty initially after load */}
//                {!isLoading && currencies.length === 0 && !searchQuery && (
//                  <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                     No available currencies to add.
//                  </p>
//                )}
//            </div>
//         </div>

//         <DialogFooter>
//           {/* Cancel button now implicitly uses handleOpenChange */}
//           <button
//             className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer"
//             onClick={() => handleOpenChange(false)} // Explicitly call close logic
//             disabled={isLoading && selectedCurrencyCode === ""} // Disable only if actively adding
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer" // Added disabled styling
//             type="button"
//             onClick={handleConfirm}
//             disabled={
//               isLoading || // Disable if loading anything (fetching or adding)
//               !selectedCurrencyCode || // Still need a selection
//               selectedCurrencyCode === "INR" // Belt-and-suspenders check
//             }
//           >
//             {isLoading && selectedCurrencyCode ? "Adding..." : "Confirm"} {/* Loading text only when adding */}
//           </button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CurrencySelectorModal;

// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import { useAuth } from "../../../contexts/AuthContext";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import apiConfig from "../../../config/apiConfig";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define a more specific type for the currency options fetched from the API
// interface CurrencyOption {
//   code: string;
//   currencyName?: string; // Optional as it might not always be present
//   flagImage?: string; // Optional as it might not always be present
// }

// // Define a more specific type for the newly created account returned by the API
// // Adjust properties based on what your POST /accounts endpoint actually returns
// interface NewAccount {
//   _id: string; // ADD _id here to match Account interface
//   userId: string; // Example property: user ID
//   currencyCode: string;
//   balance: string; // Change balance to string to match Account interface
//   createdAt: string; // Example property: creation timestamp
//   updatedAt: string; // Example property: update timestamp
//   // Add other properties returned by your API
// }

// // Define a type for the expected structure of API error responses
// interface ApiErrorResponse {
//     message?: string;
//     // Add other potential error properties if known, e.g., errorCode, details
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: NewAccount) => void; // Use the specific NewAccount type
// }

// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true); // Keep true initially for fetch on open
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         // Assuming the API returns an array of CurrencyOption objects
//         const response = await axios.get<CurrencyOption[]>("/currencies");
//         // Filter out INR when setting the initial list
//         const availableCurrencies = response.data.filter(
//           (currency) => currency.code !== "INR"
//         );
//         setCurrencies(availableCurrencies);
//         setIsLoading(false);
//       } catch (err) { // Catch block now handles unknown/AxiosError
//         setIsLoading(false);
//         let message = "Failed to load currencies"; // Default message
//         if (axios.isAxiosError<ApiErrorResponse>(err)) {
//             // If it's an Axios error, try to get the message from the response data
//             message = err.response?.data?.message || err.message || message;
//         } else if (err instanceof Error) {
//             // If it's a generic Error, use its message
//             message = err.message;
//         }
//         setError(message);
//         console.error("Error fetching currencies:", err);
//       }
//     };

//     if (isOpen) {
//       // Fetch only when the modal is opened
//       fetchCurrencies();
//       // Reset state when opening
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//     }
//   }, [isOpen]); // Re-fetch when isOpen changes to true

//   // Filter based on search query (INR is already removed from the base `currencies` state)
//   const filteredCurrencies = currencies.filter(
//     (currency) =>
//       currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (currency.currencyName &&
//         currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleCurrencySelect = (code: string) => {
//     // Double-check here just in case, though it shouldn't be possible if filtered out
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//     }
//   };

//   const handleConfirm = async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       // Add extra check
//       // Consider using a more user-friendly error display instead of alert
//       setError("Please select a valid currency.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       // Assuming the API returns a NewAccount object on success
//       const response = await axios.post<NewAccount>(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCurrencyAdded(response.data); // Pass the specifically typed data
//       // No need to call onClose here, Dialog's onOpenChange handles it
//       // Reset state after successful addition for next opening
//       setIsLoading(false);
//        // Optionally close the modal on success by calling handleOpenChange(false)
//       // handleOpenChange(false); // Or let the user close it manually
//     } catch (err) { // Catch block now handles unknown/AxiosError
//       setIsLoading(false);
//       let message = "Failed to add currency account"; // Default message
//        if (axios.isAxiosError<ApiErrorResponse>(err)) {
//            // If it's an Axios error, try to get the message from the response data
//            message = err.response?.data?.message || err.message || message;
//        } else if (err instanceof Error) {
//            // If it's a generic Error, use its message
//            message = err.message;
//        }
//       setError(message);
//       console.error("Error adding currency account:", err);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchQuery("");
//   };

//   // Use the Dialog's onOpenChange for closing logic
//   const handleOpenChange = (open: boolean) => {
//     if (!open) {
//       // Reset state when closing via any method (overlay click, escape key, cancel button)
//       clearSearchTerm();
//       setSelectedCurrencyCode(""); // Clear selection on close
//       setError(null); // Clear error on close
//       setIsLoading(true); // Reset loading state for next open
//       onClose(); // Call the original onClose handler
//     }
//     // If opening, the useEffect handles fetching and state reset
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       {/* Use handleOpenChange */}
//       <DialogContent>
//         {/* Removed fixed height for DialogContent to allow natural expansion */}
//         <div className="mt-4 h-[calc(100%-80px)] flex flex-col gap-4"> {/* Removed h-[calc(100%-80px)] */}
//           <DialogHeader>
//             <DialogTitle>Open a balance</DialogTitle>
//           </DialogHeader>

//           <div className="relative">
//             <div className="absolute sm:inset-y-0 top-4 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="h-5 w-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currency..."
//               className="w-full rounded-full py-3 pl-12 pr-10 h-12.5 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Added pr-10 for cancel button spacing
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {searchQuery && (
//               <button
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none"
//                 aria-label="Clear search" // Added aria-label for accessibility
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>

//           <DialogDescription>
//             Choose a currency to add to your account.
//           </DialogDescription>

//           {/* Display Loading or Error State for Fetching */}
//            {isLoading && !error && currencies.length === 0 && <p className="text-center py-4">Loading currencies...</p>}
//            {error && !isLoading && ( // Show fetch error only when not loading
//              <div className="p-4 rounded-lg bg-lightgray dark:bg-primarybox inline-flex items-center gap-2">
//                  <FaExclamationCircle className="text-red-600 flex-shrink-0" />
//                  <p className="text-red-600 text-sm">{error}</p>
//              </div>
//            )}

//           {/* Currency List Section */}
//           {/* Adjusted height and handling of loading/empty states */}
//           <div className={`sm:max-h-64 overflow-y-auto scrollbar-hide mb-4 space-y-2 ${isLoading && currencies.length === 0 ? 'hidden' : ''}`}>
//              {!isLoading && filteredCurrencies.length > 0
//                ? filteredCurrencies.map((currency) => (
//                    <div
//                      key={currency.code}
//                      className={`block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer ${
//                          selectedCurrencyCode === currency.code
//                            ? "bg-lightgray dark:bg-primarybox"
//                            : ""
//                        }`}
//                      onClick={() => handleCurrencySelect(currency.code)}
//                      role="button" // Added role for accessibility
//                      tabIndex={0} // Make it focusable
//                      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleCurrencySelect(currency.code) : null} // Allow selection with keyboard
//                    >
//                      <div className="flex items-center gap-4">
//                        {currency.flagImage ? ( // Check if flagImage exists and is not empty
//                          <Image
//                            src={currency.flagImage.trim()}
//                            alt={`${currency.currencyName || currency.code} flag`}
//                            width={44}
//                            height={44}
//                            onError={(e) => {
//                              // Optional: Hide image or show placeholder on error
//                              console.error(`Error loading image for ${currency.code}: ${currency.flagImage}`);
//                              (e.target as HTMLImageElement).style.display = 'none'; // Example: hide broken image
//                            }}
//                            className="rounded-full object-cover" // Added styling
//                          />
//                        ) : (
//                            // Optional: Placeholder if no image URL is provided
//                             <div className="w-[44px] h-[44px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700">
//                                 {currency.code.substring(0, 2)}
//                             </div>
//                        )}
//                        <div className="flex flex-col">
//                          <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">
//                            {currency.code}
//                          </span>
//                          {currency.currencyName && (
//                            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
//                              {currency.currencyName}
//                            </span>
//                          )}
//                        </div>
//                      </div>
//                    </div>
//                  ))
//                : !isLoading && searchQuery && ( // Show "No results" only if not loading and a search query exists
//                    <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                      No results found for "{searchQuery}".
//                    </p>
//                  )}
//                {/* Consider adding a message if currencies array is empty initially after load */}
//                {!isLoading && currencies.length === 0 && !searchQuery && (
//                  <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                     No available currencies to add.
//                  </p>
//                )}
//            </div>
//         </div>

//         <DialogFooter>
//           {/* Cancel button now implicitly uses handleOpenChange */}
//           <button
//             className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer"
//             onClick={() => handleOpenChange(false)} // Explicitly call close logic
//             disabled={isLoading && selectedCurrencyCode === ""} // Disable only if actively adding
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer" // Added disabled styling
//             type="button"
//             onClick={handleConfirm}
//             disabled={
//               isLoading || // Disable if loading anything (fetching or adding)
//               !selectedCurrencyCode || // Still need a selection
//               selectedCurrencyCode === "INR" // Belt-and-suspenders check
//             }
//           >
//             {isLoading && selectedCurrencyCode ? "Adding..." : "Confirm"} {/* Loading text only when adding */}
//           </button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CurrencySelectorModal;

// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios, { AxiosError } from "axios";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
// import { useAuth } from "../../../contexts/AuthContext";
// import apiConfig from "../../../config/apiConfig";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";
// import { XIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces remain the same ---
// interface CurrencyOption {
//   code: string;
//   currencyName?: string;
//   flagImage?: string;
// }

// interface NewAccount {
//   _id: string;
//   userId: string;
//   currencyCode: string;
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiErrorResponse {
//   message?: string;
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: NewAccount) => void;
// }

// // --- Framer Motion Variants ---
// const mobileContentVariants = {
//   initial: { y: "100%", opacity: 0 }, // Slide in from bottom
//   animate: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
//   exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
// };

// const desktopContentVariants = {
//   initial: { y: -30, opacity: 0, scale: 0.95 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
//   exit: { y: -30, opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
// };

// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false); // State for mobile detection
//   const { token } = useAuth();
//   const modalContentRef = useRef<HTMLDivElement>(null);

//   // --- Effect for Mobile Detection ---
//   useEffect(() => {
//     const checkMobile = () => {
//         // Use a common breakpoint like 640px (Tailwind's sm)
//         setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile(); // Initial check
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // --- Fetching logic remains the same ---
//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       // Ensure loading state is true when starting fetch
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get<CurrencyOption[]>("/currencies");
//         const availableCurrencies = response.data.filter(
//           (currency) => currency.code !== "INR"
//         );
//         setCurrencies(availableCurrencies);
//       } catch (err) {
//         let message = "Failed to load currencies";
//         if (axios.isAxiosError<ApiErrorResponse>(err)) {
//           message = err.response?.data?.message || err.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setError(message);
//         console.error("Error fetching currencies:", err);
//       } finally {
//          // Always set loading to false after fetch attempt completes
//          setIsLoading(false);
//       }
//     };

//     if (isOpen) {
//       fetchCurrencies();
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//       // Don't reset isLoading here, fetchCurrencies handles it
//     } else {
//         // Optionally reset currencies list when closed if needed
//         // setCurrencies([]);
//     }
//   }, [isOpen]);

//   // --- Filtering logic remains the same ---
//   const filteredCurrencies = currencies.filter(
//     (currency) =>
//       currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (currency.currencyName &&
//         currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   // --- Selection logic remains the same ---
//   const handleCurrencySelect = (code: string) => {
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//     }
//   };

//   // --- Confirmation logic remains the same ---
//   const handleConfirm = async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       setError("Please select a valid currency.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post<NewAccount>(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCurrencyAdded(response.data);
//       // No need to set isLoading false here if we close immediately
//       onClose(); // Close modal on success
//     } catch (err) {
//        // Ensure loading is set to false in case of error
//       setIsLoading(false);
//       let message = "Failed to add currency account";
//       if (axios.isAxiosError<ApiErrorResponse>(err)) {
//         message = err.response?.data?.message || err.message || message;
//       } else if (err instanceof Error) {
//         message = err.message;
//       }
//       setError(message);
//       console.error("Error adding currency account:", err);
//     }
//   };

//   // --- Search clearing logic remains the same ---
//   const clearSearchTerm = () => {
//     setSearchQuery("");
//   };

//   // --- Effect to handle Escape key remains the same ---
//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [isOpen, onClose]);

//   // --- Select appropriate content variants ---
//   const modalContentVariants = isMobile ? mobileContentVariants : desktopContentVariants;

//   return (
//     // Use AnimatePresence to handle exit animations
//     <AnimatePresence mode="wait">
//       {isOpen && ( // Conditionally render the entire modal structure
//         <motion.div
//           className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-100 flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close when clicking overlay
//           >

//           {/* Content with dynamic animation */}
//           {/* bg-white dark:bg-background fixed z-120 flex flex-col justify-between w-full border shadow-lg  translate-y-0 rounded-t-3xl sm:rounded-3xl sm:max-w-2xl sm:h-auto max-h-[70vh] h-auto p-4 sm:p-8 gap-4 */}
//           <motion.div
//             ref={modalContentRef}
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-2xl relative flex flex-col justify-between max-h-[70vh]"
//             variants={modalContentVariants} // Apply dynamic variants
//             initial="initial"
//             animate="animate"
//             exit="exit"
//           >
//             {/* Close Button (position adjusted slightly for mobile) */}
//             <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//             <button
//               onClick={onClose}
//               aria-label="Close"
//               className="p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//             >
//               <XIcon className="w-7 h-7 text-neutral-900 dark:text-white" />
//             </button>
//             </div>

//             {/* Inner content structure */}
//             {/* Use overflow-y-auto on the scrollable part, not the whole content */}
//             <div className="flex flex-col gap-4 flex-grow overflow-hidden">
//
//               {/* Allow header/footer, scroll middle */}
//               {/* Header */}
//               <div
//                 data-slot="modal-header"
//                 className={cn(
//                   "flex flex-col gap-1 sm:gap-2 text-center sm:text-left flex-shrink-0"
//                 )}
//               >
//                 <h2
//                   id="currency-modal-title"
//                   data-slot="modal-title"
//                   className={cn(
//                     "sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mt-6"
//                   )}
//                 >
//                   Open a balance
//                 </h2>
//                 {/* Description moved below search for better mobile flow */}
//               </div>
//               {/* Search Input */}
//               <div className="relative flex-shrink-0">
//                 {/* ... search input code remains the same ... */}
//                 <div className="absolute sm:inset-y-0 top-4 left-0 flex items-center pl-4 pointer-events-none">
//                   <FiSearch
//                     className="h-5 w-5 text-neutral-900 dark:text-white"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search currency..."
//                   className="w-full rounded-full py-3 pl-12 pr-10 h-12 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white" // Adjusted height slightly
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearchTerm}
//                     className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none"
//                     aria-label="Clear search"
//                   >
//                     <MdCancel size={24} aria-hidden="true" />
//                   </button>
//                 )}
//               </div>
//               {/* Description */}
//               <p
//                 id="currency-modal-description"
//                 data-slot="modal-description"
//                 className={cn(
//                   "text-sm sm:text-base text-neutral-500 dark:text-gray-300 font-medium flex-shrink-0"
//                 )}
//               >
//                 Choose a currency to add to your account.
//               </p>

//               {/* Loading/Error State */}
//               <div className="flex-shrink-0">
//                 {/* Wrap loading/error in a div to prevent layout shifts affecting scroll parent */}
//                 {isLoading && !error && currencies.length === 0 && (
//                   <p className="text-center py-4">Loading currencies...</p>
//                 )}
//                 {error &&
//                   !isLoading && ( // Show API or selection error
//                     <div className="p-3 sm:p-4 rounded-lg bg-red-50 dark:bg-red-900/30 inline-flex items-center gap-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-600/50">
//                       <FaExclamationCircle className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//               </div>

//               {/* Currency List Section - Make this the scrollable part */}
//               <div
//                 className={`flex-grow overflow-y-auto scrollbar-hide space-y-2 mb-3 ${
//                   isLoading && currencies.length === 0 ? "hidden" : ""
//                 }`}
//               >
//                 {!isLoading && filteredCurrencies.length > 0
//                   ? filteredCurrencies.map((currency) => (
//                       <div
//                         key={currency.code}
//                         className={`block hover:bg-lightgray dark:hover:bg-primarybox p-3 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer ${
//                           selectedCurrencyCode === currency.code
//                             ? "bg-lightgray dark:bg-primarybox" // Add visual selection indicator
//                             : ""
//                         }`}
//                         onClick={() => handleCurrencySelect(currency.code)}
//                         role="button"
//                         tabIndex={0}
//                         onKeyDown={(e) =>
//                           e.key === "Enter" || e.key === " "
//                             ? handleCurrencySelect(currency.code)
//                             : null
//                         }
//                       >
//                         {/* ... currency item structure remains the same ... */}
//                         <div className="flex items-center gap-3 sm:gap-4">
//                           {currency.flagImage ? (
//                             <Image
//                               src={currency.flagImage.trim()}
//                               alt={`${
//                                 currency.currencyName || currency.code
//                               } flag`}
//                               width={40} // Slightly smaller images
//                               height={40}
//                               onError={(e) => {
//                                 console.error(
//                                   `Error loading image for ${currency.code}: ${currency.flagImage}`
//                                 );
//                                 (e.target as HTMLImageElement).style.display =
//                                   "none";
//                               }}
//                               className="rounded-full object-cover flex-shrink-0" // Added flex-shrink-0
//                             />
//                           ) : (
//                             <div className="w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 flex-shrink-0">
//                               {currency.code.substring(0, 2)}
//                             </div>
//                           )}
//                           <div className="flex flex-col overflow-hidden">
//
//                             {/* Prevent text overflow */}
//                             <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                               {" "}
//                               {/* Added truncate */}
//                               {currency.code}
//                             </span>
//                             {currency.currencyName && (
//                               <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 truncate">
//                                 {" "}
//                                 {/* Added truncate */}
//                                 {currency.currencyName}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   : !isLoading &&
//                     searchQuery && (
//                       <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                         No results found for "{searchQuery}".
//                       </p>
//                     )}
//                 {!isLoading && currencies.length === 0 && !searchQuery && (
//                   <p className="text-gray-700 dark:text-gray-300 text-center py-4">
//                     No available currencies to add.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Footer */}
//             <div
//               data-slot="modal-footer"
//               className={cn(
//                 "flex-shrink-0 inline-flex flex-col sm:flex-row items-center gap-2 sm:justify-end pt-4 border-t"
//               )}
//             >
//               {/* Cancel Button */}
//               <button
//                 className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-bold py-2.5 sm:py-2 px-6 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto transition-all duration-75 ease-linear cursor-pointer order-2 sm:order-1" // Adjust order for mobile
//                 onClick={onClose}
//                 disabled={isLoading && !!selectedCurrencyCode} // Disable only if adding
//                 type="button"
//               >
//                 Cancel
//               </button>
//               {/* Confirm Button */}
//               <button
//                 className="bg-primary text-neutral-900 hover:bg-primaryhover font-bold py-2.5 sm:py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto transition-all duration-75 ease-linear cursor-pointer order-1 sm:order-2" // Adjust order for mobile
//                 type="button"
//                 onClick={handleConfirm}
//                 disabled={
//                   isLoading || // Disable if fetching currencies OR adding account
//                   !selectedCurrencyCode ||
//                   selectedCurrencyCode === "INR"
//                 }
//               >
//                 {/* Show "Adding..." only when confirm is clicked and loading */}
//                 {isLoading && selectedCurrencyCode ? "Adding..." : "Confirm"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CurrencySelectorModal;

// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import axios, { AxiosError } from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../../../contexts/AuthContext";
// import apiConfig from "../../../config/apiConfig";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";
// import { cn } from "@/lib/utils";
// import { IoClose } from "react-icons/io5";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface CurrencyOption {
//   code: string;
//   currencyName?: string;
//   flagImage?: string;
// }

// interface NewAccount {
//   _id: string;
//   userId: string;
//   currencyCode: string;
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiErrorResponse {
//   message?: string;
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: NewAccount) => void;
// }

// // --- Framer Motion Variants (No changes needed) ---
// const mobileContentVariants = {
//   initial: { y: 50, opacity: 0 },
//   animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//   exit: { y: 50, opacity: 0 },
// };

// const desktopContentVariants = {
//   initial: { y: -30, opacity: 0, scale: 0.95 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
//   exit: { y: -30, opacity: 0, scale: 0.95 },
// };

// // --- Component ---
// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // Default to false
//   const [isFetching, setIsFetching] = useState(false); // Separate state for initial fetch
//   const [isAdding, setIsAdding] = useState(false); // Separate state for adding currency
//   const [error, setError] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const { token } = useAuth();
//   const modalContentRef = useRef<HTMLDivElement>(null);

//   // --- Hooks ---

//   // Detect mobile view
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Fetch currencies when modal opens
//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsFetching(true); // Indicate fetch start
//       setIsLoading(true); // General loading indicator
//       setError(null);
//       setCurrencies([]); // Clear previous results
//       try {
//         const response = await axios.get<CurrencyOption[]>("/currencies");
//         // Filter out INR if necessary (consider if backend should handle this)
//         const availableCurrencies = response.data.filter(
//           (currency) => currency.code !== "INR"
//         );
//         setCurrencies(availableCurrencies);
//       } catch (err) {
//         let message = "Failed to load currencies";
//         if (axios.isAxiosError<ApiErrorResponse>(err)) {
//           message = err.response?.data?.message || err.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setError(message);
//         console.error("Error fetching currencies:", err);
//       } finally {
//         setIsFetching(false);
//         setIsLoading(false); // General loading indicator off
//       }
//     };

//     if (isOpen) {
//       // Reset state for fresh modal opening
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//       setIsAdding(false); // Ensure adding state is reset
//       fetchCurrencies();
//     } else {
//         // Optional: Clear currencies when closing to free memory if list is huge
//         // setCurrencies([]);
//     }
//   }, [isOpen]);

//   // Close modal on Escape key
//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isOpen, onClose]);

//   // --- Memoized Values ---

//   // Memoize filtered currencies to avoid recalculation on every render
//   const filteredCurrencies = useMemo(() => {
//     const query = searchQuery.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(query) ||
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(query))
//     );
//   }, [currencies, searchQuery]);

//   // Determine Framer Motion variants based on screen size
//   const modalContentVariants = isMobile ? mobileContentVariants : desktopContentVariants;

//   // --- Event Handlers ---

//   const handleCurrencySelect = useCallback((code: string) => {
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//       setError(null); // Clear selection/add errors when a new currency is selected
//     }
//   }, []); // No dependencies needed as it only uses its argument and setState

//   const handleConfirm = useCallback(async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       setError("Please select a valid currency.");
//       return;
//     }

//     setIsAdding(true); // Indicate add start
//     setIsLoading(true); // General loading indicator
//     setError(null);

//     try {
//       const response = await axios.post<NewAccount>(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCurrencyAdded(response.data);
//       onClose(); // Close modal on success
//       // No need to set loading false here, modal closes/resets
//     } catch (err) {
//       setIsAdding(false); // Reset adding state on error
//       setIsLoading(false); // Reset general loading state on error
//       let message = "Failed to add currency account";
//       if (axios.isAxiosError<ApiErrorResponse>(err)) {
//         if (err.response?.status === 409) {
//           message = err.response?.data?.message || `You already have an account with ${selectedCurrencyCode}.`;
//         } else {
//           message = err.response?.data?.message || err.message || message;
//         }
//       } else if (err instanceof Error) {
//         message = err.message;
//       }
//       setError(message);
//       console.error("Error adding currency account:", err);
//     }
//   }, [selectedCurrencyCode, token, onCurrencyAdded, onClose]);

//   const clearSearchTerm = useCallback(() => {
//     setSearchQuery("");
//   }, []); // No dependencies, only uses setState

//   // --- Render Logic Helper ---

//   const renderContent = () => {
//     // 1. Initial Fetch Loading State
//     if (isFetching) {
//       return (
//         <div className="flex-grow flex items-center justify-center py-4">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
//           {/* <p className="ml-2">Loading currencies...</p> */}
//         </div>
//       );
//     }

//     // 2. Fetch Success but No Currencies Available (and not due to error)
//     if (!isFetching && !error && currencies.length === 0) {
//       return (
//         <div className="flex-grow flex items-center justify-center text-center py-4">
//           <p className="text-gray-700 dark:text-gray-300">
//             No available currencies to add at this time.
//           </p>
//         </div>
//       );
//     }

//     // 3. Currencies Loaded, Display List or No Search Results
//     if (currencies.length > 0) {
//       return (
//         <div
//           // Use flex-grow here to allow scrolling within the constrained parent
//           // Remove fixed height, rely on parent's max-height and overflow
//           className="flex-grow overflow-y-auto scrollbar-hide space-y-2 mb-3 pr-1" // Added pr-1 to prevent scrollbar overlap if visible
//         >
//           {filteredCurrencies.length > 0 ? (
//             filteredCurrencies.map((currency) => (
//               <div
//                 key={currency.code}
//                 className={cn(
//                   "block hover:bg-lightgray dark:hover:bg-primarybox p-3 sm:p-4 rounded-2xl transition-colors duration-200 ease-in-out cursor-pointer",
//                   selectedCurrencyCode === currency.code && "bg-lightgray dark:bg-primarybox" // Enhanced selection indicator
//                 )}
//                 onClick={() => handleCurrencySelect(currency.code)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) =>
//                   e.key === "Enter" || e.key === " "
//                     ? handleCurrencySelect(currency.code)
//                     : null
//                 }
//                 aria-pressed={selectedCurrencyCode === currency.code} // Accessibility improvement
//               >
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   {currency.flagImage ? (
//                     <Image
//                       src={currency.flagImage.trim()}
//                       alt={`${currency.currencyName || currency.code} flag`}
//                       width={40}
//                       height={40}
//                       onError={(e) => {
//                         console.error(
//                           `Error loading image for ${currency.code}: ${currency.flagImage}`
//                         );
//                         // Hide broken image icon, keep the space
//                         (e.target as HTMLImageElement).style.opacity = '0';
//                         (e.target as HTMLImageElement).style.display = 'none'; // Also hide completely to avoid layout shifts if needed
//                       }}
//                       className="rounded-full object-cover flex-shrink-0 w-[40px] h-[40px]" // Ensure size consistency
//                       unoptimized={currency.flagImage.includes('flagcdn.com')} // Example: Disable optimization for specific external sources if needed
//                     />
//                   ) : (
//                     <div className="w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 flex-shrink-0">
//                       {currency.code.substring(0, 2)}
//                     </div>
//                   )}
//                   <div className="flex flex-col overflow-hidden">
//                     <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                       {currency.code}
//                     </span>
//                     {currency.currencyName && (
//                       <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 truncate">
//                         {currency.currencyName}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             // Only show "no results" if there was a search query
//             searchQuery && (
//               <p className="text-gray-700 lg:py-10 py-5 bg-white/5 rounded-lg capitalize dark:text-gray-300 text-center">
//                 No results found for "{searchQuery}".
//               </p>
//             )
//           )}
//         </div>
//       );
//     }
//     // Fallback: Should ideally not be reached if logic above is correct
//     return null;
//   };

//   // --- Render Component ---
//   return (
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 dark:bg-white/30 z-[100] flex sm:items-center items-end justify-center" // Use inset-0, slightly darker bg, added backdrop-blur
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close on overlay click
//           aria-modal="true" // Accessibility
//           role="dialog"
//           aria-labelledby="currency-modal-title"
//           aria-describedby="currency-modal-description"
//         >
//           <motion.div
//             ref={modalContentRef}
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-6 p-4 w-full sm:max-w-2xl relative flex flex-col max-h-[70vh] sm:max-h-[65vh]" // Slightly smaller max-width, adjusted padding
//             variants={modalContentVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
//           >
//             {/* Close Button */}
//             <div className="absolute sm:top-2 sm:right-2 top-1 right-1"> {/* Ensure button is above content */}
//               <button
//                 onClick={onClose}
//                 aria-label="Close currency selector"
//                 className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//               >
//                 <IoClose  className="text-neutral-900 dark:text-primary" size={28} />
//               </button>
//             </div>

//             {/* Inner content structure */}
//             <div className="flex flex-col gap-4 flex-grow overflow-hidden"> {/* Manages overall layout */}
//               {/* Header */}
//               <div className="text-left flex-shrink-0 mt-6"> {/* Added padding top for mobile, pr for spacing from close button */}
//                 <h2
//                   id="currency-modal-title"
//                   className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white"
//                 >
//                   Open a balance
//                 </h2>
//                 <p
//                   id="currency-modal-description"
//                   className="text-gray dark:text-gray-300 font-medium"
//                 >
//                   Choose a currency to add to your account.
//                 </p>
//               </div>

//               {/* Search Input */}
//               <div className="relative flex-shrink-0">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                   <FiSearch
//                     className="size-5 text-neutral-900 dark:text-white"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search currency (e.g., USD, Euro)"
//                   className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all duration-75 ease-linear focus:outline-none focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   aria-label="Search for a currency" // Accessibility
//                 />

//                 {searchQuery && (
//                   <button
//                     onClick={clearSearchTerm}
//                     className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                     aria-label="Clear search"
//                   >
//                     <MdCancel size={20} aria-hidden="true" />
//                   </button>
//                 )}
//               </div>

//               {/* Error Display Area */}
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="overflow-hidden flex-shrink-0"
//                     role="alert" // Accessibility
//                   >
//                      <div className="mt-1 mb-1 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 inline-flex items-center gap-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-600/50 w-full">
//                       <FaExclamationCircle className="flex-shrink-0 w-5 h-5" />
//                       <p className="text-sm font-medium">{error}</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               {renderContent()}
//             </div>

//             {/* Footer */}
//             <div
//               className={cn(
//                 "w-full flex flex-col sm:flex-row sm:justify-end items-center gap-3 pt-4 border-t border-lightborder dark:border-secondarybox flex-shrink-0 mt-auto" // Ensure footer sticks to bottom
//               )}
//             >
//               <button
//                 className="cursor-pointer  bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-all duration-75 ease-linear"
//                 onClick={onClose}
//                 disabled={isAdding} // Only disable cancel if actively adding
//                 type="button"
//               >
//                 Cancel
//               </button>

//               <button
//                 className="cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//                 type="button"
//                 onClick={handleConfirm}
//                 disabled={
//                   isAdding || // Disable if adding
//                   isFetching || // Disable if initially fetching
//                   !selectedCurrencyCode ||
//                   selectedCurrencyCode === "INR"
//                 }
//               >
//                 {/* Show specific text for adding state */}
//                 {isAdding ? (
//                      <div className="flex items-center justify-center gap-2">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
//                         <span>Adding...</span>
//                      </div>
//                  ) : "Confirm"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CurrencySelectorModal;

// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import axios, { AxiosError } from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../../../contexts/AuthContext";
// import apiConfig from "../../../config/apiConfig";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";
// import { cn } from "@/lib/utils";
// import { IoClose } from "react-icons/io5";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface CurrencyOption {
//   code: string;
//   currencyName?: string;
//   flagImage?: string; // Make sure your API provides this or adjust logic
// }

// // Interface representing the successful response from POST /accounts
// interface NewAccountResponse {
//   _id: string;
//   userId: string;
//   // Use the nested structure if your API returns it like this
//   currency: {
//     code: string;
//     // other currency fields if present
//   };
//   balance: string; // Typically string from API
//   createdAt: string;
//   updatedAt: string;
// }

// // Interface expected by the CountryCard's onCurrencyAdded handler
// // Map the API response to this structure if they differ
// export interface AddedAccountInfo {
//   // <--- ADD 'export' HERE
//   _id: string;
//   balance: string;
//   currency?: { code: string } | null; // Match CountryCard's Account interface
// }
// interface ApiErrorResponse {
//   message?: string;
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: AddedAccountInfo) => void; // Use the mapped interface
// }

// // --- Framer Motion Variants ---
// const mobileContentVariants = {
//   initial: { y: "100%", opacity: 0 }, // Start from bottom
//   animate: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 100, damping: 20 },
//   },
//   exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
// };

// const desktopContentVariants = {
//   initial: { y: -30, opacity: 0, scale: 0.95 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
//   exit: { y: -30, opacity: 0, scale: 0.95 },
// };

// // --- Component ---
// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFetching, setIsFetching] = useState(false); // For initial currency list fetch
//   const [isAdding, setIsAdding] = useState(false); // For adding currency API call
//   const [error, setError] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const { token } = useAuth();
//   const modalContentRef = useRef<HTMLDivElement>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null); // Ref for the search input

//   // --- Hooks ---

//   // Body Scroll Lock
//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [isOpen]);

//   // Detect mobile view
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Fetch currencies when modal opens
//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsFetching(true);
//       setError(null);
//       setCurrencies([]); // Clear previous results
//       try {
//         // Ensure your API endpoint '/currencies' and response structure match this.
//         // Example: [{ "code": "USD", "currencyName": "US Dollar", "flagImage": "/path/to/usd.svg" }, ...]
//         const response = await axios.get<CurrencyOption[]>("/currencies");
//         // Filter out INR if necessary (ideally backend handles this)
//         const availableCurrencies = response.data.filter(
//           (currency) => currency.code !== "INR" // Example filter
//         );
//         setCurrencies(availableCurrencies);
//       } catch (err) {
//         let message = "Failed to load currencies";
//         if (axios.isAxiosError<ApiErrorResponse>(err)) {
//           message = err.response?.data?.message || err.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setError(message);
//         console.error("Error fetching currencies:", err);
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     if (isOpen) {
//       // Reset state for fresh modal opening
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//       setIsAdding(false);
//       fetchCurrencies();

//       // ---- FOCUS LOGIC ----
//       // Use setTimeout to ensure the element is rendered and animations might have started
//       const timer = setTimeout(() => {
//         searchInputRef.current?.focus();
//       }, 100); // Adjust delay if needed (e.g., 50-150ms)

//       return () => clearTimeout(timer); // Cleanup timeout if modal closes quickly
//       // ---- END FOCUS LOGIC ----
//     } else {
//       // Optional: Clear currencies when closing to free memory if list is huge
//       // setCurrencies([]);
//     }
//   }, [isOpen]); // Dependency only on isOpen

//   // Close modal on Escape key
//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, onClose]);

//   // --- Memoized Values ---

//   // Memoize filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     const query = searchQuery.toLowerCase().trim();
//     if (!query) return currencies; // Return all if search is empty
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(query) ||
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(query))
//     );
//   }, [currencies, searchQuery]);

//   // Determine Framer Motion variants based on screen size
//   const modalVariants = isMobile
//     ? mobileContentVariants
//     : desktopContentVariants;

//   // --- Event Handlers ---

//   const handleCurrencySelect = useCallback((code: string) => {
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//       setError(null); // Clear errors on selection
//     }
//   }, []);

//   const handleConfirm = useCallback(async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       setError("Please select a valid currency.");
//       return;
//     }

//     setIsAdding(true);
//     setError(null);

//     try {
//       // Ensure your POST /accounts endpoint and response structure match this.
//       // Example response: { "_id": "...", "userId": "...", "currency": { "code": "USD" }, "balance": "0.00", ... }
//       const response = await axios.post<NewAccountResponse>(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Map the successful API response to the structure expected by CountryCard
//       const addedAccountInfo: AddedAccountInfo = {
//         _id: response.data._id,
//         balance: response.data.balance,
//         currency: response.data.currency
//           ? { code: response.data.currency.code }
//           : null,
//       };

//       onCurrencyAdded(addedAccountInfo); // Pass the mapped data
//       onClose(); // Close modal on success
//     } catch (err) {
//       let message = "Failed to add currency account";
//       if (axios.isAxiosError<ApiErrorResponse>(err)) {
//         if (err.response?.status === 409) {
//           // Conflict error
//           message =
//             err.response?.data?.message ||
//             `You already have an account with ${selectedCurrencyCode}.`;
//         } else {
//           message = err.response?.data?.message || err.message || message;
//         }
//       } else if (err instanceof Error) {
//         message = err.message;
//       }
//       setError(message);
//       console.error("Error adding currency account:", err);
//     } finally {
//       setIsAdding(false); // Reset adding state regardless of outcome
//     }
//   }, [selectedCurrencyCode, token, onCurrencyAdded, onClose]);

//   const clearSearchTerm = useCallback(() => {
//     setSearchQuery("");
//     searchInputRef.current?.focus(); // Re-focus after clearing
//   }, []);

//   // --- Render Logic Helper ---

//   const renderContent = () => {
//     // 1. Initial Fetch Loading State
//     if (isFetching) {
//       return (
//         <div className="flex-grow flex items-center justify-center py-4 min-h-[100px]">
//           {" "}
//           {/* Added min-height */}
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       );
//     }

//     // 2. Fetch Error State
//     // Display fetch error prominently if it occurs before list rendering
//     if (!isFetching && error && currencies.length === 0) {
//       return (
//         <div className="flex-grow flex flex-col items-center justify-center text-center py-4 min-h-[100px]">
//           <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20">
//             <FaExclamationCircle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//           </div>
//           <p className="text-red-500 font-medium">
//             {error || "Could not load currencies."}
//           </p>
//         </div>
//       );
//     }

//     // 3. Fetch Success but No Currencies Available
//     if (!isFetching && !error && currencies.length === 0) {
//       return (
//         <div className="flex-grow flex items-center justify-center text-center py-4 min-h-[100px]">
//           <p className="text-gray-700 dark:text-gray-300">
//             No available currencies to add at this time.
//           </p>
//         </div>
//       );
//     }

//     // 4. Currencies Loaded, Display List or No Search Results
//     return (
//       <div
//         className="flex-grow overflow-y-auto scrollbar-hide space-y-2 mb-3 pr-1 min-h-[150px]" // Added min-height, pr-1 to prevent scrollbar overlap
//       >
//         {filteredCurrencies.length > 0
//           ? filteredCurrencies.map((currency) => (
//               <div
//                 key={currency.code}
//                 className={cn(
//                   "block hover:bg-lightgray dark:hover:bg-primarybox p-3 sm:p-4 rounded-2xl transition-colors duration-150 ease-in-out cursor-pointer focus:outline-none", // Added focus styles
//                   selectedCurrencyCode === currency.code &&
//                     "bg-lightgray dark:bg-primarybox" // Enhanced selection indicator with ring
//                 )}
//                 onClick={() => handleCurrencySelect(currency.code)}
//                 role="button"
//                 tabIndex={0} // Make it focusable
//                 onKeyDown={(e) =>
//                   e.key === "Enter" || e.key === " "
//                     ? handleCurrencySelect(currency.code)
//                     : null
//                 }
//                 aria-pressed={selectedCurrencyCode === currency.code}
//               >
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   {/* Use provided flagImage or fallback */}
//                   {currency.flagImage ? (
//                     <Image
//                       src={currency.flagImage.trim()} // Use the flagImage from API data
//                       alt={`${currency.currencyName || currency.code} flag`}
//                       width={40}
//                       height={40}
//                       onError={(e) => {
//                         console.warn(
//                           // Use warn for non-critical image load errors
//                           `Warning: Could not load image for ${currency.code}: ${currency.flagImage}. Hiding image.`
//                         );
//                         (e.target as HTMLImageElement).style.display = "none"; // Hide broken image icon
//                       }}
//                       className="rounded-full object-cover flex-shrink-0 w-[40px] h-[40px] bg-gray-200 dark:bg-gray-700" // Added fallback bg
//                       unoptimized={currency.flagImage.includes("flagcdn.com")} // Example for external source
//                     />
//                   ) : (
//                     // Fallback display if no flagImage provided
//                     <div className="w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-medium flex-shrink-0">
//                       {currency.code.substring(0, 3)}
//                     </div>
//                   )}
//                   <div className="flex flex-col overflow-hidden">
//                     <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                       {currency.code}
//                     </span>
//                     {currency.currencyName && (
//                       <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 truncate">
//                         {currency.currencyName}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           : // Only show "no results" if there was a search query AND the initial fetch didn't fail
//             searchQuery &&
//             !isFetching &&
//             !(error && currencies.length === 0) && (
//               <p className="text-gray-700 lg:py-10 py-5 bg-white/5 rounded-lg capitalize dark:text-gray-300 text-center">
//                 No results found for "{searchQuery}".
//               </p>
//             )}
//       </div>
//     );
//   };

//   // --- Render Component ---
//   return (
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 dark:bg-white/30 z-[100] flex sm:items-center items-end justify-center" // Added padding for mobile view, adjusted backdrop
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close on overlay click
//           aria-modal="true"
//           role="dialog"
//           aria-labelledby="currency-modal-title"
//           aria-describedby="currency-modal-description"
//         >
//           {/* Stop propagation prevents closing when clicking inside the modal */}
//           <motion.div
//             ref={modalContentRef}
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-6 p-2 w-full sm:max-w-2xl relative flex flex-col max-h-[70vh] sm:max-h-[65vh]" // Adjusted max-height, padding
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <div className="absolute top-2 right-2 z-10">
//               {/* Ensure button is above content */}
//               <button
//                 onClick={onClose}
//                 aria-label="Close currency selector"
//                 className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none" // Adjusted size and focus ring
//               >
//                 <IoClose
//                   className="text-neutral-900 dark:text-primary"
//                   size={28}
//                 />
//                 {/* Adjusted size */}
//               </button>
//             </div>
//             {/* Inner content structure */}
//             <div className="flex flex-col gap-4 flex-grow overflow-hidden px-4 sm:px-0">
//               {/* Header */}
//               <div className="text-left flex-shrink-0 mt-4 sm:mt-0">
//                 <h2
//                   id="currency-modal-title"
//                   className="sm:text-2xl text-xl font-semibold text-mainheading dark:text-white pr-10" // Adjusted size, added padding-right for close btn space
//                 >
//                   Open a balance
//                 </h2>
//                 <p
//                   id="currency-modal-description"
//                   className="text-gray dark:text-gray-300 font-normal text-sm sm:text-base" // Adjusted size/weight
//                 >
//                   Choose a currency to add to your account.
//                 </p>
//               </div>

//               {/* Search Input */}
//               <div className="relative flex-shrink-0">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                   <FiSearch
//                     className="size-5 text-neutral-500 dark:text-neutral-400" // Adjusted color
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <input
//                   ref={searchInputRef} // **** ATTACH REF HERE ****
//                   type="text"
//                   placeholder="Search currency (e.g., USD, Euro)"
//                   className="w-full rounded-full h-12 py-3 pl-11 pr-10 border focus:border-[#5f5f5f] transition-all duration-75 ease-linear focus:outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-neutral-900 dark:text-white" // Enhanced styling
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   aria-label="Search for a currency"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearchTerm}
//                     className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                     aria-label="Clear search"
//                   >
//                     <MdCancel size={28} aria-hidden="true" />
//                   </button>
//                 )}
//               </div>

//               {/* This specifically handles errors related to selection or the add process, fetch errors are handled in renderContent */}
//               <AnimatePresence>
//                 {error &&
//                   currencies.length > 0 && ( // Only show this error if currencies are loaded (not a fetch error)
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden flex-shrink-0"
//                       role="alert"
//                     >
//                       <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
//                         <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20">
//                           <FaExclamationCircle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                         </div>
//                         <p className="text-sm font-medium text-red-700 dark:text-red-300/90">
//                           {error}
//                         </p>
//                       </div>
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//               {/* Dynamic Content Area (List, Loading, No Results) */}

//               {/* Scrollable Content Area */}
//               {renderContent()}
//             </div>{" "}

//             {/* Footer */}
//             {!isFetching && (
//               <div
//                 className={cn(
//                   "w-full flex flex-col sm:flex-row sm:justify-end items-center gap-3 pt-4 border-t flex-shrink-0 mt-auto px-4 sm:px-0" // Added padding horizontal for mobile
//                 )}
//               >
//                 <button
//                   className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 text-center w-full transition-all duration-75 ease-linear" // Adjusted styles, sm:w-auto
//                   onClick={onClose}
//                   disabled={isAdding} // Only disable cancel if actively adding
//                   type="button"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="inline-flex items-center justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 order-1 sm:order-2 disabled:opacity-50 disabled:bg-primary/50 disabled:cursor-not-allowed font-medium rounded-full px-8 py-3 text-center w-full transition-all duration-75 ease-linear" // Adjusted styles, sm:w-auto
//                   type="button"
//                   onClick={handleConfirm}
//                   disabled={
//                     isAdding || // Disable if adding
//                     !selectedCurrencyCode || // Disable if no selection
//                     selectedCurrencyCode === "INR" // Disable if invalid selection
//                   }
//                 >
//                   {/* Show specific text for adding state */}
//                   {isAdding ? (
//                     <>
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         aria-hidden="true"
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
//                       <span>Adding...</span>
//                     </>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CurrencySelectorModal;

// // frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import axios, { AxiosError } from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import apiConfig from "../../../config/apiConfig"; // Adjust path if needed
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";
// import { cn } from "@/lib/utils"; // Adjust path if needed
// import { IoClose } from "react-icons/io5";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface CurrencyOption {
//   code: string;
//   currencyName?: string;
//   flagImage?: string;
// }

// interface NewAccountResponse {
//   _id: string;
//   userId: string;
//   currency: {
//     code: string;
//   };
//   balance: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AddedAccountInfo {
//   _id: string;
//   balance: string;
//   currency?: { code: string } | null;
// }
// interface ApiErrorResponse {
//   message?: string;
// }

// interface CurrencySelectorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCurrencyAdded: (newAccount: AddedAccountInfo) => void;
// }

// // --- Framer Motion Variants ---
// const mobileContentVariants = {
//   initial: { y: "100%", opacity: 0 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 100, damping: 20 },
//   },
//   exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
// };

// const desktopContentVariants = {
//   initial: { y: -30, opacity: 0, scale: 0.95 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
//   exit: { y: -30, opacity: 0, scale: 0.95 },
// };

// // --- Component ---
// const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
//   isOpen,
//   onClose,
//   onCurrencyAdded,
// }) => {
//   const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFetching, setIsFetching] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const { token } = useAuth();
//   const modalContentRef = useRef<HTMLDivElement>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   // --- Hooks ---

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       setIsFetching(true);
//       setError(null);
//       setCurrencies([]);
//       try {
//         const response = await axios.get<CurrencyOption[]>("/currencies");
//         const availableCurrencies = response.data.filter(
//           (currency) => currency.code !== "INR"
//         );
//         setCurrencies(availableCurrencies);
//       } catch (err) {
//         let message = "Failed to load currencies";
//         if (axios.isAxiosError<ApiErrorResponse>(err)) {
//           message = err.response?.data?.message || err.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setError(message);
//         console.error("Error fetching currencies:", err);
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     if (isOpen) {
//       setSelectedCurrencyCode("");
//       setSearchQuery("");
//       setError(null);
//       setIsAdding(false);
//       fetchCurrencies();
//       const timer = setTimeout(() => {
//         searchInputRef.current?.focus();
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, onClose]);

//   const filteredCurrencies = useMemo(() => {
//     const query = searchQuery.toLowerCase().trim();
//     if (!query) return currencies;
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(query) ||
//         (currency.currencyName &&
//           currency.currencyName.toLowerCase().includes(query))
//     );
//   }, [currencies, searchQuery]);

//   const modalVariants = isMobile
//     ? mobileContentVariants
//     : desktopContentVariants;

//   const handleCurrencySelect = useCallback((code: string) => {
//     if (code !== "INR") {
//       setSelectedCurrencyCode(code);
//       setError(null);
//     }
//   }, []);

//   const handleConfirm = useCallback(async () => {
//     if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
//       setError("Please select a valid currency.");
//       return;
//     }
//     setIsAdding(true);
//     setError(null);
//     try {
//       const response = await axios.post<NewAccountResponse>(
//         "/accounts",
//         { currencyCode: selectedCurrencyCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const addedAccountInfo: AddedAccountInfo = {
//         _id: response.data._id,
//         balance: response.data.balance,
//         currency: response.data.currency
//           ? { code: response.data.currency.code }
//           : null,
//       };
//       onCurrencyAdded(addedAccountInfo);
//       onClose();
//     } catch (err) {
//       let message = "Failed to add currency account";
//       if (axios.isAxiosError<ApiErrorResponse>(err)) {
//         if (err.response?.status === 409) {
//           message =
//             err.response?.data?.message ||
//             `You already have an account with ${selectedCurrencyCode}.`;
//         } else {
//           message = err.response?.data?.message || err.message || message;
//         }
//       } else if (err instanceof Error) {
//         message = err.message;
//       }
//       setError(message);
//       console.error("Error adding currency account:", err);
//     } finally {
//       setIsAdding(false);
//     }
//   }, [selectedCurrencyCode, token, onCurrencyAdded, onClose]);

//   const clearSearchTerm = useCallback(() => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   }, []);

//   const renderContent = () => {
//     if (isFetching) {
//       return (
//         <div className="flex-grow flex items-center justify-center py-4 min-h-[100px]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       );
//     }
//     if (!isFetching && error && currencies.length === 0) {
//       return (
//         <div className="flex-grow flex flex-col items-center justify-center text-center py-4 min-h-[100px]">
//           <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20">
//             <FaExclamationCircle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//           </div>
//           <p className="text-red-500 font-medium">
//             {error || "Could not load currencies."}
//           </p>
//         </div>
//       );
//     }
//     if (!isFetching && !error && currencies.length === 0) {
//       return (
//         <div className="flex-grow flex items-center justify-center text-center py-4 min-h-[100px]">
//           <p className="text-gray-700 dark:text-gray-300">
//             No available currencies to add at this time.
//           </p>
//         </div>
//       );
//     }
//     return (
//       <div className="space-y-2 min-h-[150px]">
//         {" "}
//         {/* Removed flex-grow, overflow, mb, pr */}
//         {filteredCurrencies.length > 0
//           ? filteredCurrencies.map((currency) => (
//               <div
//                 key={currency.code}
//                 className={cn(
//                   "block hover:bg-lightgray dark:hover:bg-primarybox p-3 sm:p-4 rounded-2xl transition-colors duration-150 ease-in-out cursor-pointer focus:outline-none",
//                   selectedCurrencyCode === currency.code &&
//                     "bg-lightgray dark:bg-primarybox"
//                 )}
//                 onClick={() => handleCurrencySelect(currency.code)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) =>
//                   e.key === "Enter" || e.key === " "
//                     ? handleCurrencySelect(currency.code)
//                     : null
//                 }
//                 aria-pressed={selectedCurrencyCode === currency.code}
//               >
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   {currency.flagImage ? (
//                     <Image
//                       src={currency.flagImage.trim()}
//                       alt={`${currency.currencyName || currency.code} flag`}
//                       width={40}
//                       height={40}
//                       onError={(e) => {
//                         console.warn(
//                           `Warning: Could not load image for ${currency.code}: ${currency.flagImage}. Hiding image.`
//                         );
//                         (e.target as HTMLImageElement).style.display = "none";
//                       }}
//                       className="rounded-full object-cover flex-shrink-0 w-[40px] h-[40px] bg-gray-200 dark:bg-gray-700"
//                       unoptimized={currency.flagImage.includes("flagcdn.com")}
//                     />
//                   ) : (
//                     <div className="w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-medium flex-shrink-0">
//                       {currency.code.substring(0, 3)}
//                     </div>
//                   )}
//                   <div className="flex flex-col overflow-hidden">
//                     <span className="font-medium text-neutral-900 dark:text-white text-sm md:text-base truncate">
//                       {currency.code}
//                     </span>
//                     {currency.currencyName && (
//                       <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 truncate">
//                         {currency.currencyName}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           : searchQuery &&
//             !isFetching &&
//             !(error && currencies.length === 0) && (
//               <p className="text-gray-700 lg:py-10 py-5 bg-white/5 rounded-lg capitalize dark:text-gray-300 text-center">
//                 No results found for "{searchQuery}".
//               </p>
//             )}
//       </div>
//     );
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 dark:bg-white/30 z-[100] flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//           aria-modal="true"
//           role="dialog"
//           aria-labelledby="currency-modal-title"
//           aria-describedby="currency-modal-description"
//         >
//           <motion.div
//             ref={modalContentRef}
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-2xl relative flex flex-col overflow-hidden max-h-[85vh] sm:max-h-[80vh]" // Adjusted max-height, removed direct padding (p-2, sm:p-6)
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b ">
//               <div>
//                 {" "}
//                 {/* Wrapper for title and description */}
//                 <h2
//                   id="currency-modal-title"
//                   className="sm:text-2xl text-xl font-semibold text-mainheading dark:text-white"
//                 >
//                   Open a balance
//                 </h2>
//                 <p
//                   id="currency-modal-description"
//                   className="text-gray dark:text-gray-300 font-normal text-sm sm:text-base"
//                 >
//                   Choose a currency to add to your account.
//                 </p>
//               </div>
//               <div
//                 onClick={onClose}
//                 className="size-12 bg-lightgray hover:bg-lightborder cursor-pointer dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") onClose();
//                 }}
//                 aria-label="Close modal"
//               >
//                 <button
//                   className="text-neutral-900 dark:text-primary cursor-pointer focus:outline-none"
//                   aria-label="Close"
//                 >
//                   <IoClose size={28} />
//                 </button>
//               </div>
//             </div>

//             {/* Scrollable Content Area */}
//             <div className="flex-grow overflow-y-auto scrollbar-hide">
//               <div className="p-4 sm:p-6 space-y-4">
//                 {" "}
//                 {/* Padding and spacing for content items */}
//                 {/* Search Input */}
//                 <div className="relative flex-shrink-0">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                     <FiSearch
//                       className="size-5 text-neutral-500 dark:text-neutral-400"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     placeholder="Search currency (e.g., USD, Euro)"
//                     className="w-full rounded-full h-12 py-3 pl-11 pr-10 border focus:border-[#5f5f5f] transition-all duration-75 ease-linear focus:outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-neutral-900 dark:text-white bg-white dark:bg-background border-gray-300 dark:border-neutral-700" // Added bg and border for explicitness
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     aria-label="Search for a currency"
//                   />
//                   {searchQuery && (
//                     <button
//                       onClick={clearSearchTerm}
//                       className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                       aria-label="Clear search"
//                     >
//                       <MdCancel size={28} aria-hidden="true" />
//                     </button>
//                   )}
//                 </div>

//                 {/* Error Message for selection/add process */}
//                 <AnimatePresence>
//                   {error && currencies.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden flex-shrink-0" // flex-shrink-0 to prevent it from shrinking
//                       role="alert"
//                     >
//                       <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
//                         <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20">
//                           <FaExclamationCircle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                         </div>
//                         <p className="text-sm font-medium text-red-700 dark:text-red-300/90">
//                           {error}
//                         </p>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//                 {/* Dynamic Content (List, Loading, No Results) from renderContent() */}
//                 {renderContent()}
//               </div>
//             </div>

//             {/* Footer */}
//             {!isFetching && (
//               <div className="p-4 sm:p-6 border-t  bg-white dark:bg-background flex-shrink-0">
//                 <div className="flex sm:flex-row flex-col justify-end gap-3">
//                   <button
//                     className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full sm:w-auto transition-all duration-75 ease-linear" // Added sm:w-auto
//                     onClick={onClose}
//                     disabled={isAdding}
//                     type="button"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="inline-flex items-center justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 order-1 sm:order-2 disabled:opacity-50 disabled:bg-primary/50 disabled:cursor-not-allowed font-medium rounded-full px-8 py-3 h-12.5 text-center w-full sm:w-auto transition-all duration-75 ease-linear" // Added sm:w-auto
//                     type="button"
//                     onClick={handleConfirm}
//                     disabled={
//                       isAdding ||
//                       !selectedCurrencyCode ||
//                       selectedCurrencyCode === "INR"
//                     }
//                   >
//                     {isAdding ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                           aria-hidden="true"
//                         >
//                           <path
//                             d="M12 2V6"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M12 18V22"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M4.93 4.93L7.76 7.76"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M16.24 16.24L19.07 19.07"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M2 12H6"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M18 12H22"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M4.93 19.07L7.76 16.24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M16.24 7.76L19.07 4.93"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <span>Adding...</span>
//                       </>
//                     ) : (
//                       "Confirm"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CurrencySelectorModal;

// frontend/components/dashboard/components/MainDashBoardSection/CurrencySelectorModal.tsx
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios, { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
import apiConfig from "../../../config/apiConfig"; // Adjust path if needed
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import { cn } from "@/lib/utils"; // Adjust path if needed
import { IoClose } from "react-icons/io5";

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces ---
interface CurrencyOption {
  code: string;
  currencyName?: string;
  flagImage?: string;
}

interface NewAccountResponse {
  _id: string;
  userId: string;
  currency: {
    code: string;
  };
  balance: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddedAccountInfo {
  _id: string;
  balance: string;
  currency?: { code: string } | null;
}
interface ApiErrorResponse {
  message?: string;
}

interface CurrencySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCurrencyAdded: (newAccount: AddedAccountInfo) => void;
}

// --- Framer Motion Variants ---
const mobileContentVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
};

const desktopContentVariants = {
  initial: { y: -30, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { y: -30, opacity: 0, scale: 0.95 },
};

// --- Component ---
const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
  isOpen,
  onClose,
  onCurrencyAdded,
}) => {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { token } = useAuth();
  const modalContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for search input (can still be used for other interactions like clear)

  // --- Hooks ---

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsFetching(true);
      setError(null);
      setCurrencies([]);
      try {
        const response = await axios.get<CurrencyOption[]>("/currencies");
        const availableCurrencies = response.data.filter(
          (currency) => currency.code !== "INR"
        );
        setCurrencies(availableCurrencies);
      } catch (err) {
        let message = "Failed to load currencies";
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
          message = err.response?.data?.message || err.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
        console.error("Error fetching currencies:", err);
      } finally {
        setIsFetching(false);
      }
    };

    if (isOpen) {
      setSelectedCurrencyCode("");
      setSearchQuery("");
      setError(null);
      setIsAdding(false);
      fetchCurrencies();
      // ---- FOCUS LOGIC REMOVED ----
      // const timer = setTimeout(() => {
      //   searchInputRef.current?.focus();
      // }, 100);
      // return () => clearTimeout(timer);
      // ---- END FOCUS LOGIC REMOVED ----
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCurrencies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return currencies;
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        (currency.currencyName &&
          currency.currencyName.toLowerCase().includes(query))
    );
  }, [currencies, searchQuery]);

  const modalVariants = isMobile
    ? mobileContentVariants
    : desktopContentVariants;

  const handleCurrencySelect = useCallback((code: string) => {
    if (code !== "INR") {
      setSelectedCurrencyCode(code);
      setError(null);
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!selectedCurrencyCode || selectedCurrencyCode === "INR") {
      setError("Please select a valid currency.");
      return;
    }
    setIsAdding(true);
    setError(null);
    try {
      const response = await axios.post<NewAccountResponse>(
        "/accounts",
        { currencyCode: selectedCurrencyCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const addedAccountInfo: AddedAccountInfo = {
        _id: response.data._id,
        balance: response.data.balance,
        currency: response.data.currency
          ? { code: response.data.currency.code }
          : null,
      };
      onCurrencyAdded(addedAccountInfo);
      onClose();
    } catch (err) {
      let message = "Failed to add currency account";
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        if (err.response?.status === 409) {
          message =
            err.response?.data?.message ||
            `You already have an account with ${selectedCurrencyCode}.`;
        } else {
          message = err.response?.data?.message || err.message || message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      console.error("Error adding currency account:", err);
    } finally {
      setIsAdding(false);
    }
  }, [selectedCurrencyCode, token, onCurrencyAdded, onClose]);

  const clearSearchTerm = useCallback(() => {
    setSearchQuery("");
    // Optionally, you might still want to focus if the user *manually* clears.
    // If not, comment out the line below.
    // searchInputRef.current?.focus();
  }, []);

  const renderContent = () => {
    if (isFetching) {
      return (
        <div className="flex-grow flex items-center justify-center py-4 min-h-[100px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }
    if (!isFetching && error && currencies.length === 0) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-4 min-h-[100px]">
          <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20">
            <FaExclamationCircle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
          </div>
          <p className="text-red-500 font-medium">
            {error || "Could not load currencies."}
          </p>
        </div>
      );
    }
    if (!isFetching && !error && currencies.length === 0) {
      return (
        <div className="flex-grow flex items-center justify-center text-center py-4 min-h-[100px]">
          <p className="text-subheadingWhite">
            No available currencies to add at this time.
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-2 min-h-[150px]">
        {filteredCurrencies.length > 0
          ? filteredCurrencies.map((currency) => (
              <div
                key={currency.code}
                className={cn(
                  "block hover:bg-primarybox p-3 sm:p-4 rounded-2xl transition-colors duration-150 ease-in-out cursor-pointer focus:outline-none",
                  selectedCurrencyCode === currency.code &&
                    "bg-primarybox"
                )}
                onClick={() => handleCurrencySelect(currency.code)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" || e.key === " "
                    ? handleCurrencySelect(currency.code)
                    : null
                }
                aria-pressed={selectedCurrencyCode === currency.code}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {currency.flagImage ? (
                    <Image
                      src={currency.flagImage.trim()}
                      alt={`${currency.currencyName || currency.code} flag`}
                      width={40}
                      height={40}
                      onError={(e) => {
                        console.warn(
                          `Warning: Could not load image for ${currency.code}: ${currency.flagImage}. Hiding image.`
                        );
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                      className="rounded-full object-cover flex-shrink-0 w-[40px] h-[40px] bg-gray-200 dark:bg-gray-700"
                      unoptimized={currency.flagImage.includes("flagcdn.com")}
                    />
                  ) : (
                    <div className="w-[40px] h-[40px] rounded-full bg-primarybox flex items-center justify-center text-white/90 text-xs font-medium flex-shrink-0">
                      {currency.code.substring(0, 3)}
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-mainheadingWhite text-sm md:text-base truncate">
                      {currency.code}
                    </span>
                    {currency.currencyName && (
                      <span className="text-xs md:text-sm text-subheadingWhite truncate">
                        {currency.currencyName}
                      </span>
                    )}
                  </div>
                </div>
                
              </div>
            ))
          : searchQuery &&
            !isFetching &&
            !(error && currencies.length === 0) && (
              <p className=" lg:py-10 py-5 rounded-lg bg-primarybox capitalize text-white/90 text-center">
                No results found for "{searchQuery}".
              </p>
            )}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white/15 z-[100] flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="currency-modal-title"
          aria-describedby="currency-modal-description"
        >
          <motion.div
            ref={modalContentRef}
            className="bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-2xl relative flex flex-col overflow-hidden max-h-[85vh] sm:max-h-[80vh]"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b ">
              <div>
                <h2
                  id="currency-modal-title"
                  className="sm:text-2xl text-xl font-semibold text-mainheadingWhite"
                >
                  Open a balance
                </h2>
                <p
                  id="currency-modal-description"
                  className="text-secondheadingWhite font-normal text-sm sm:text-base"
                >
                  Choose a currency to add to your account.
                </p>
              </div>
              <button
                className="p-2.5 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                onClick={onClose}
                aria-label="Close modal"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              <div className="p-4 sm:p-6 space-y-4">
                {/* Search Input */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FiSearch
                      className="size-5 text-neutral-500 dark:text-neutral-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    ref={searchInputRef} // Ref is still attached
                    type="text"
                    placeholder="Search currency (e.g., USD, Euro)"
                    className="w-full rounded-full h-12 py-3 pl-11 pr-10 border placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white bg-primarybox/50 transition-all duration-75 ease-linear focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search for a currency"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearchTerm}
                      className="absolute inset-y-0 right-3 flex items-center text-primary focus:outline-none cursor-pointer"
                      aria-label="Clear search"
                    >
                      <MdCancel size={24} aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Error Message for selection/add process */}
                <AnimatePresence>
                  {error && currencies.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden flex-shrink-0"
                      role="alert"
                    >
                      <div className="bg-red-900/25 border border-red-500 rounded-xl p-3 flex items-center gap-3">
                        <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20">
                          <FaExclamationCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
                        </div>
                        <p className="font-medium text-red-600">
                          {error}
                        </p>
                      </div>
                      
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dynamic Content (List, Loading, No Results) from renderContent() */}
                {renderContent()}
              </div>
            </div>

            {/* Footer */}
            {!isFetching && (
              <div className="p-4 sm:p-6 border-t flex-shrink-0">
                <div className="flex sm:flex-row flex-col justify-end gap-3">
                  <button
                    className="inline-flex justify-center cursor-pointer text-primary bg-primarybox hover:bg-secondarybox order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed  font-medium rounded-full px-8 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
                    onClick={onClose}
                    disabled={isAdding}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="inline-flex items-center justify-center cursor-pointer bg-primary text-mainheading hover:bg-primaryhover order-1 sm:order-2 disabled:opacity-50 disabled:bg-primary/80 disabled:cursor-not-allowed font-medium rounded-full px-8 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
                    type="button"
                    onClick={handleConfirm}
                    disabled={
                      isAdding ||
                      !selectedCurrencyCode ||
                      selectedCurrencyCode === "INR"
                    }
                  >
                    {isAdding ? (
                      <>
                        <svg
                          className="h-5 w-5 text-neutral-900 animate-spin mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
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
                        <span>Adding...</span>
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurrencySelectorModal;
