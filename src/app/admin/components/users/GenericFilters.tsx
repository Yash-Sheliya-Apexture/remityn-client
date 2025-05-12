// components/admin/users/GenericFilters.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
// Adjust paths based on your actual file structure
// Assuming CustomDropdown is in the same directory for this example
import CustomDropdown from "./CustomDropdown"; // Import props type if available
import DateInput from "../../../dashboard/components/TransactionPageSection/Filter/DateInput"; // Adjust path

// Define the structure for the filter state object passed between parent and this component
export interface FiltersState {
  searchTerm: string;
  fromDate: string; // Keep using string for DateInput compatibility
  toDate: string; // Keep using string for DateInput compatibility
  statusFilter: string; // Generic status filter (can represent KYC, Payment status, etc.)
  currencyFilter: string; // Generic currency filter
  idFilter: string; // Generic ID filter (Payment ID, Order ID, etc.)
  amountFilter: string; // Generic amount filter
  recipientFilter?: string; // Optional recipient/user filter
  // Add other generic filter fields here if needed in the future
  // e.g., typeFilter?: string;
}

interface GenericFiltersProps {
  showFilterModal: boolean;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  // Initial values passed from the parent
  initialFilters: FiltersState;
  // Callbacks to update the parent state
  onApplyFilters: (filters: FiltersState) => void;
  onClearFilters: () => void;

  // --- Options for Dropdowns ---
  currencyOptions: string[]; // Expects ['all', 'USD', 'EUR', ...]
  statusOptions: string[]; // Expects ['all', 'pending', 'completed', ...] or ['all', 'verified', 'pending'] etc.

  // --- Customization & Visibility ---
  // Labels & Placeholders
  searchTermLabel?: string;
  searchTermPlaceholder?: string;
  idFilterLabel?: string;
  idFilterPlaceholder?: string;
  amountFilterLabel?: string;
  amountFilterPlaceholder?: string;
  statusFilterLabel?: string;
  currencyFilterLabel?: string;
  dateFilterLabel?: string;
  recipientFilterLabel?: string;
  recipientFilterPlaceholder?: string;
  allCurrenciesLabel?: string; // Label for the 'all' currency option display
  allStatusesLabel?: string; // Label for the 'all' status option display

  // Visibility Flags (default to true if commonly used, false if optional)
  showSearchTermFilter?: boolean;
  showRecipientFilter?: boolean; // Default false as it's optional
  showIdFilter?: boolean;
  showAmountFilter?: boolean;
  showCurrencyFilter?: boolean;
  showStatusFilter?: boolean;
  showDateFilter?: boolean;
}

const GenericFilters: React.FC<GenericFiltersProps> = ({
  showFilterModal,
  setShowFilterModal,
  initialFilters,
  onApplyFilters,
  onClearFilters,
  currencyOptions,
  statusOptions,
  // Default labels/placeholders
  searchTermLabel = "Search Term",
  searchTermPlaceholder = "Search...",
  idFilterLabel = "ID Filter",
  idFilterPlaceholder = "Filter by ID",
  amountFilterLabel = "Amount",
  amountFilterPlaceholder = "Filter by Amount",
  statusFilterLabel = "Status",
  currencyFilterLabel = "Currency",
  dateFilterLabel = "Date Range",
  recipientFilterLabel = "Recipient",
  recipientFilterPlaceholder = "Filter by Recipient Name/Email",
  allCurrenciesLabel = "All Currencies",
  allStatusesLabel = "All Statuses",
  // Visibility flags defaults
  showSearchTermFilter = true,
  showRecipientFilter = false, // Default to hidden unless explicitly enabled
  showIdFilter = true,
  showAmountFilter = true,
  showCurrencyFilter = true,
  showStatusFilter = true,
  showDateFilter = true,
}) => {
  const filterModalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Internal temporary filter states ---
  // Initialize temp state from initialFilters
  const [tempSearchTerm, setTempSearchTerm] = useState(
    initialFilters.searchTerm
  );
  const [tempStatusFilter, setTempStatusFilter] = useState<string>(
    initialFilters.statusFilter
  );
  const [tempCurrencyFilter, setTempCurrencyFilter] = useState(
    initialFilters.currencyFilter
  );
  const [tempIdFilter, setTempIdFilter] = useState(initialFilters.idFilter);
  const [tempAmountFilter, setTempAmountFilter] = useState(
    initialFilters.amountFilter
  );
  const [tempFromDate, setTempFromDate] = useState(initialFilters.fromDate);
  const [tempToDate, setTempToDate] = useState(initialFilters.toDate);
  const [tempRecipientFilter, setTempRecipientFilter] = useState(
    initialFilters.recipientFilter ?? ""
  );

  // --- Effects ---
  // Mobile check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close if click is outside modal AND not inside a radix popover triggered by the modal
      if (
        showFilterModal &&
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(
          "[data-radix-popper-content-wrapper]"
        ) && // Radix UI v1 specific
        !(event.target as Element).closest('[role="dialog"]') // More general check for dialogs/popovers
      ) {
        // Optional: Apply filters on close? Or just close? Current behavior: just close.
        setShowFilterModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilterModal, setShowFilterModal]);

  // Sync temp state with initialFilters when modal opens or initialFilters change externally
  useEffect(() => {
    if (showFilterModal) {
      setTempSearchTerm(initialFilters.searchTerm);
      setTempStatusFilter(initialFilters.statusFilter);
      setTempCurrencyFilter(initialFilters.currencyFilter);
      setTempIdFilter(initialFilters.idFilter);
      setTempAmountFilter(initialFilters.amountFilter);
      setTempFromDate(initialFilters.fromDate);
      setTempToDate(initialFilters.toDate);
      setTempRecipientFilter(initialFilters.recipientFilter ?? "");
    }
  }, [showFilterModal, initialFilters]); // Rerun when modal opens or parent filters change

  // --- Handlers ---
  const closePopup = () => setShowFilterModal(false);

  const handleApplyFilters = () => {
    const currentFilters: FiltersState = {
      searchTerm: tempSearchTerm,
      statusFilter: tempStatusFilter,
      currencyFilter: tempCurrencyFilter,
      idFilter: tempIdFilter,
      amountFilter: tempAmountFilter,
      fromDate: tempFromDate,
      toDate: tempToDate,
      // Only include recipient filter if it's shown and has a value
      ...(showRecipientFilter && { recipientFilter: tempRecipientFilter }),
    };
    onApplyFilters(currentFilters);
    setShowFilterModal(false);
  };

  const handleClearInternalFilters = () => {
    // Reset temp state to defaults ('all' for dropdowns, '' for inputs)
    setTempSearchTerm("");
    setTempStatusFilter("all");
    setTempCurrencyFilter("all");
    setTempIdFilter("");
    setTempAmountFilter("");
    setTempFromDate("");
    setTempToDate("");
    setTempRecipientFilter("");
    // Call the parent's clear function
    onClearFilters();
    setShowFilterModal(false); // Close after clearing
  };

  // Dropdown handlers (handle null if CustomDropdown allows clearing)
  const handleStatusChange = (value: string | null) => {
    setTempStatusFilter(value ?? "all"); // Default to 'all' if cleared
  };

  const handleCurrencyChange = (value: string | null) => {
    setTempCurrencyFilter(value ?? "all"); // Default to 'all' if cleared
  };

  // Date handlers
  const handleFromDateChange = (date: string) => setTempFromDate(date);
  const handleToDateChange = (date: string) => setTempToDate(date);

  // --- Styling Constants ---
  const sectionSpacing = "space-y-4"; // Consistent spacing between filter sections
  const labelClassName =
    "text-neutral-900 dark:text-gray-300 font-medium mb-3 block relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1";
  const inputClassName =
    "block h-12.5 w-full border rounded-md py-3 px-4 text-neutral-900 hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow ease-in-out duration-300 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white focus:shadow-darkcolor dark:focus:shadow-whitecolor focus:outline-none font-medium";

  // --- Animation Variants ---
  const mobileVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeOut" },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.2, ease: "easeIn" },
    },
  };

  const desktopVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: {
      x: "0%",
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.2, ease: "easeIn" },
    },
  };
  const modalVariants = isMobile ? mobileVariants : desktopVariants;
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {showFilterModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-white/30 z-50"
            onClick={closePopup}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={filterModalRef}
            initial={
              isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
            }
            animate={
              isMobile ? { y: "0%", opacity: 1 } : { x: "0%", opacity: 1 }
            }
            exit={
              isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
            }
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed ${
              isMobile
                ? "bottom-0 left-0 right-0 h-[100vh] max-h-screen"
                : "top-0 right-0 sm:w-[600px] h-full border-l border-gray-200 dark:border-neutral-700"
            } bg-white dark:bg-background z-[51] flex flex-col overflow-hidden`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-modal-heading"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-neutral-700 relative">
              <h3
                id="filter-modal-heading"
                className="font-semibold text-mainheading dark:text-white text-lg"
              >
                Filters
              </h3>
              <button
                onClick={closePopup}
                aria-label="Close filter panel"
                className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
              >
                <IoClose className="text-neutral-900 dark:text-white size-7" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div
              className={`flex-grow overflow-y-auto scrollbar-hide p-6 space-y-6 ${sectionSpacing} ${
                isMobile ? "pb-[100px]" : ""
              }`}
            >
              {/* Search Term Filter */}
              {showSearchTermFilter && (
                <div>
                  <label htmlFor="searchTermFilter" className={labelClassName}>
                    {searchTermLabel}
                  </label>
                  <input
                    type="search" // Use type="search" for potential browser features
                    id="searchTermFilter"
                    value={tempSearchTerm}
                    onChange={(e) => setTempSearchTerm(e.target.value)}
                    placeholder={searchTermPlaceholder}
                    className={inputClassName}
                  />
                </div>
              )}

              {/* ID Filter */}
              {showIdFilter && (
                <div>
                  <label htmlFor="idFilter" className={labelClassName}>
                    {idFilterLabel}
                  </label>
                  <input
                    type="text"
                    id="idFilter"
                    value={tempIdFilter}
                    onChange={(e) => setTempIdFilter(e.target.value)}
                    placeholder={idFilterPlaceholder}
                    className={inputClassName}
                  />
                </div>
              )}

              {/* Amount Filter */}
              {showAmountFilter && (
                <div>
                  <label htmlFor="amountFilter" className={labelClassName}>
                    {amountFilterLabel}
                  </label>
                  <input
                    type="number"
                    id="amountFilter"
                    value={tempAmountFilter}
                    onChange={(e) => setTempAmountFilter(e.target.value)}
                    placeholder={amountFilterPlaceholder}
                    className={`${inputClassName} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} // Hide number spinners
                    step="any" // Allow decimals
                  />
                </div>
              )}

              {/* Recipient Filter */}
              {showRecipientFilter && (
                <div>
                  <label htmlFor="recipientFilter" className={labelClassName}>
                    {recipientFilterLabel}
                  </label>
                  <input
                    type="text"
                    id="recipientFilter"
                    value={tempRecipientFilter}
                    onChange={(e) => setTempRecipientFilter(e.target.value)}
                    placeholder={recipientFilterPlaceholder}
                    className={inputClassName}
                  />
                </div>
              )}

              {/* Currency Filter */}
              {showCurrencyFilter &&
                currencyOptions.length > 1 && ( // Only show if enabled and options exist beyond 'all'
                  <div>
                    <CustomDropdown
                      label={
                        <span className={labelClassName}>
                          {currencyFilterLabel}
                        </span>
                      }
                      value={tempCurrencyFilter}
                      onChange={handleCurrencyChange}
                      options={currencyOptions} // Assumes 'all' is included if needed
                      displayAllOption={allCurrenciesLabel} // Pass the label for 'all'
                      // Removed placeholder prop
                    />
                  </div>
                )}

              {/* Status Filter */}
              {showStatusFilter &&
                statusOptions.length > 1 && ( // Only show if enabled and options exist beyond 'all'
                  <div>
                    <CustomDropdown
                      label={
                        <span className={labelClassName}>
                          {statusFilterLabel}
                        </span>
                      }
                      value={tempStatusFilter}
                      onChange={handleStatusChange}
                      options={statusOptions} // Assumes 'all' is included
                      displayAllOption={allStatusesLabel} // Pass the label for 'all'
                      // Removed placeholder prop
                    />
                  </div>
                )}

              {/* Date Range Filter */}
              {showDateFilter && (
                <div>
                  <h4 className={labelClassName}>{dateFilterLabel}</h4>
                  <div className="space-y-3">
                    <DateInput
                      placeholder="From Date (DD-MM-YYYY)" // Add format hint
                      value={tempFromDate}
                      onChange={handleFromDateChange}
                    />
                    <DateInput
                      placeholder="To Date (DD-MM-YYYY)" // Add format hint
                      value={tempToDate}
                      onChange={handleToDateChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Action Buttons */}
            <div
              className={`p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-background flex-shrink-0 ${
                isMobile ? "fixed bottom-0 left-0 right-0" : "" // Add shadow for mobile footer
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClearInternalFilters}
                  // Use secondary button styling
                  className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  // Use primary button styling
                  className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GenericFilters;
