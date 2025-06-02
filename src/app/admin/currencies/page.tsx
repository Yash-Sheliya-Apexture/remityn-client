// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2,
//   PlusCircle,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
// } from "lucide-react";
// import { IoClose} from "react-icons/io5";
// import { CiSearch } from "react-icons/ci";
// import { IoMdAdd, IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number; // Updated field name
// }

// // Interface for the form data
// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string; // Use string for input
// }

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   // State for inline editing - needs to use the new field name
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // Memoized filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
//     };

//     checkMobileScreen(); // Initial check on mount

//     window.addEventListener("resize", checkMobileScreen); // Add listener for resize

//     return () => {
//       window.removeEventListener("resize", checkMobileScreen); // Cleanup listener on unmount
//     };
//   }, []);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token]); // Removed router dependency unless needed for redirect logic inside fetch

//   const fetchCurrenciesList = async () => {
//     if (!token) {
//       router.push("/auth/login"); // Redirect if no token early
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         // Expect array of Currency
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (err: any) {
//       console.error("Error fetching currencies:", err);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       } else {
//         toast.error(err.response?.data?.message || "Failed to load currencies");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       // Convert code to uppercase immediately
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   // handleCreateCurrency - updated validation and payload
//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0; // Default to 0
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue, // Send parsed number
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({
//         code: "",
//         currencyName: "",
//         flagImage: "",
//         rateAdjustmentPercentage: "",
//       });
//       setIsCreateModalOpen(false);
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to create currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Inline Editing Handlers ---
//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string if null/undefined
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };
//   // --- End Inline Editing Handlers ---

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Close confirmation, reset ID, fetch list, show success
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to delete currency");
//       // Keep modal open on error to show message
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- RENDER ---
//   return (
//     <div className="min-h-screen p-4 bg-gray-50 dark:bg-background dark:text-white">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {/* Header Section */}
//       <div className="py-6 mb-6 border-b">
//         <h1 className="lg:text-3xl text-2xl font-bold text-neutral-900 dark:text-white mb-2.5">
//           Currency Management
//         </h1>
//         <p className="text-gray-500 dark:text-gray-300 capitalize">
//           Manage currency options and custom rates for your application
//         </p>
//       </div>

//       {/* Action Bar */}
//       <div className="flex justify-end flex-col lg:flex-row w-full  md:items-center mb-6 space-y-3 lg:space-y-0 gap-4">
//         <div>
//         <button
//           onClick={() => {
//             setIsCreateModalOpen(true);
//           }} // Clear error on open
//           className="bg-primary text-neutral-900 flex hover:bg-primaryhover text-nowrap font-medium rounded-full text-center lg:px-6 p-2 lg:py-3 lg:h-12.5  items-center gap-1 cursor-pointer transition-all duration-75 ease-linear"
//         >
//           <IoMdAdd
//             className="size-8"
//             title={isMobile ? "Add Currency" : undefined} // Tooltip for mobile
//           />
//           {!isMobile && <span>Add Currency</span>}
//           {/* Conditionally render text */}
//         </button>
//         <div className="text-white ml-2 mt-2 lg:hidden">Add</div>
//         </div>

//         {/* Search Bar */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search currencies..."
//             className="rounded-full pl-10 pr-3 lg:h-12.5 h-12 border w-full transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-none focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <CiSearch className="size-5 absolute top-3.5 left-3 text-neutral-900 dark:text-white" />
//         </div>
//       </div>

//       {/* Currency List / Loading / Empty State */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 size={60} className="text-neutral-900 animate-spin" />
//         </div>
//       ) : filteredCurrencies.length === 0 ? (
//         <div className="p-8 text-center rounded-lg shadow-sm border">
//           <div className="flex justify-center items-center">
//             {/* <IoWarningOutline className="text-error size-20  mx-auto mb-6" /> */}
//             <Image
//               src="/assets/images/money-bag-removebg-preview.png"
//               width={250}
//               height={250}
//               alt="Picture of the author"
//             />
//           </div>
//           <p className="text-neutral-900 font-medium text-xl dark:text-white capitalize">
//             No currencies found You Can Choose Anthor currencies.
//           </p>
//         </div>
//       ) : (
//         // --- Currency    ---
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredCurrencies.map((currency) => (
//             <div
//               key={currency._id}
//               className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//             >
//               <div className="lg:p-5 p-4 flex-grow">
//                 {/* Top Section: Flag, Code, Name */}
//                 <div className="flex items-center gap-4 mb-4">
//                   {/* Flag Image */}
//                   {currency.flagImage ? (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.currencyName} Flag`}
//                       className="size-14 object-contain rounded-full"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).style.display =
//                           "none"; /* Hide on error */
//                       }}
//                     />
//                   ) : (
//                     <div className="size-12 border bg-gray-100  rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                       No flag
//                     </div>
//                   )}

//                   {/* Code and Name */}
//                   <div className="flex-1">
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="text"
//                         name="code"
//                         value={editingFields.code}
//                         onChange={handleEditingInputChange}
//                         className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                         autoFocus
//                         maxLength={3}
//                       />
//                     ) : (
//                       <h3 className="text-lg font-bold text-gray-900 dark:text-white">

//                         {currency.code}
//                       </h3>
//                     )}
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">

//                       {currency.currencyName}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Rate Adjustment Section - UPDATED */}
//                 <div className="p-3 space-y-2 rounded-lg border">
//                   <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                     Our Rates
//                   </label>

//                   {editingCurrencyId === currency._id ? (
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage" // Correct name
//                       value={editingFields.rateAdjustmentPercentage}
//                       onChange={handleEditingInputChange}
//                       placeholder="e.g., 0.5 or +0.1"
//                       step="any"
//                       className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5"
//                     />
//                   ) : (
//                     <p
//                       className={`text-lg font-bold ${
//                         currency.rateAdjustmentPercentage != null
//                           ? "text-neutral-900 font-medium dark:text-white"
//                           : "text-gray-400 italic dark:text-gray-500"
//                       }`}
//                     >
//                       {currency.rateAdjustmentPercentage != null
//                         ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                             undefined,
//                             {
//                               minimumFractionDigits: 0,
//                               maximumFractionDigits: 2,
//                             }
//                           )}%`
//                         : "Not Set"}
//                     </p>
//                   )}
//                   <p className="text-gray-500 dark:text-gray-300 mt-1">
//                     Our Rates vs market rate.
//                   </p>
//                 </div>
//               </div>

//               {/* Actions Footer */}
//               <div className=" border-t p-3">
//                 {editingCurrencyId === currency._id ? (
//                   // --- Save/Cancel Buttons ---
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleUpdateCurrency}
//                       disabled={isSubmitting}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       {isSubmitting ? (
//                         <Loader2 size={20} className="animate-spin" />
//                       ) : (
//                         <Save size={20} />
//                       )}
//                       Save
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <IoMdCloseCircle size={20} /> Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   // --- Details/Edit/Delete Buttons ---
//                   <div className="flex flex-row gap-2">
//                     <Link
//                       href={`/admin/currencies/${currency._id}`}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <Info size={20} /> Details
//                     </Link>
//                     <button
//                       onClick={() => startEditing(currency)}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <Edit size={20} /> Edit
//                     </button>
//                     <button
//                       onClick={() => {
//                         setCurrencyToDeleteId(currency._id);
//                         setIsDeleteConfirmationOpen(true);
//                       }}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <Trash2 size={20} /> Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add Currency Modal */}
//       <AnimatePresence>
//         {isCreateModalOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsCreateModalOpen(false)}
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl w-full sm:max-w-xl relative"
//               onClick={(e) => e.stopPropagation()}
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//             >
//               <button
//                 className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={() => setIsCreateModalOpen(false)}
//                 aria-label="Close modal"
//               >
//                 <IoClose className="size-8 text-neutral-900 " />
//               </button>

//               <div className="lg:p-6 p-4">
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="lg:text-xl font-medium text-neutral-900 dark:text-white">

//                     Add New Currency
//                   </h2>
//                 </div>

//                 {/* Modal Form */}
//                 <div className="space-y-5">
//                   {/* Code */}
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1"
//                     >

//                       Currency Code <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>
//                   {/* Name */}
//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2"
//                     >

//                       Currency Name <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                   </div>
//                   {/* Flag Image Path */}
//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2"
//                     >

//                       Flag Image Path
//                     </label>
//                     <input
//                       type="text"
//                       id="create-flagImage"
//                       name="flagImage"
//                       value={newCurrencyData.flagImage}
//                       onChange={handleCreateInputChange}
//                       placeholder="/assets/icon/flags/usd.png"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
//                       Relative path to the image.
//                     </p>
//                   </div>
//                   {/* Rate Adjustment Percentage - UPDATED */}
//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1"
//                     >
//                       <Percent size={14} className="dark:text-gray-300" /> Rate
//                       Adjustment
//                     </label>
//                     <input
//                       id="create-rateAdjustmentPercentage"
//                       name="rateAdjustmentPercentage" // Correct name
//                       value={newCurrencyData.rateAdjustmentPercentage}
//                       onChange={handleCreateInputChange}
//                       step="any"
//                       placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Modal Actions */}
//                 <div className="flex flex-col gap-2.5 mt-8">
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="bg-primary flex capitalize justify-center items-center gap-2 text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="bg-neutral-900 capitalize flex justify-center items-center gap-2 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {isDeleteConfirmationOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center" // Added padding and inset-0
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsDeleteConfirmationOpen(false)}
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl p-10 w-full sm:max-w-xl relative" // Added dark mode, padding adjustments, shadow
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//             >
//               <button
//                 className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={() => setIsDeleteConfirmationOpen(false)}
//                 aria-label="Close modal"
//               >
//                 <IoClose className="text-neutral-900 dark:text-white size-7" />
//               </button>
//               {/* Icon and Title */}
//               <div className="text-left">
//                 <h3 className="text-3xl font-medium text-neutral-900 dark:text-white mb-6">
//                   Delete Currency ?
//                 </h3>
//                 <div>
//                   <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                     Are you sure you want to delete this currency? This action
//                     cannot be undone.
//                   </p>
//                 </div>
//               </div>
//               {/* Buttons */}
//               <div className="mt-6 flex flex-col gap-4">
//                 <button
//                   onClick={handleDeleteCurrency}
//                   disabled={isSubmitting}
//                   type="button"
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                 >
//                   {isSubmitting ? (
//                     <Loader2 size={20} className="animate-spin" />
//                   ) : (
//                     "Delete"
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setIsDeleteConfirmationOpen(false)}
//                   type="button"
//                   className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center border border-gray w-full cursor-pointer transition-all duration-75 ease-linear"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
// import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios"; // Import AxiosError
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image"; // Keep Image from next/image
// import {
//   Loader2,
//   // PlusCircle, // Removed unused import
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
// } from "lucide-react";
// import { IoClose } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import {
//   MdCancel,
//   MdCurrencyRupee,
// } from "react-icons/md";
// import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
// import { Skeleton } from "@/components/ui/skeleton";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number; // Updated field name
// }

// // Interface for the form data
// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string; // Use string for input
// }

// // Define a type for Axios error responses if needed, or use AxiosError directly
// interface ApiErrorResponse {
//   message: string;
//   // Add other potential fields if your API returns them
// }

// // --- NEW: Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 bg-white dark:bg-background">
//     <div className="space-y-6">
//       {/* Header Skeleton */}
//       <div className="pb-6 mb-6 border-b">
//         <Skeleton className="h-8 w-3/5 sm:w-1/3 rounded mb-3" /> {/* Title */}
//         <Skeleton className="h-4 w-4/5 sm:w-1/2 rounded" /> {/* Description */}
//       </div>

//       {/* Action Bar Skeleton */}
//       <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//         <Skeleton className="h-12 w-12 sm:h-12.5 sm:w-40 rounded-full" />{" "}
//         {/* Add Button */}
//         <Skeleton className="h-12 sm:h-12.5 flex-1 sm:flex-none sm:w-64 rounded-full" />{" "}
//         {/* Search */}
//       </div>

//       {/* Currency Cards Grid Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map(
//           (
//             _,
//             index // Render 6 skeleton cards
//           ) => (
//             <div
//               key={index}
//               className="rounded-xl overflow-hidden border flex flex-col"
//             >
//               {/* Card Content Area */}
//               <div className="lg:p-5 p-4 flex-grow">
//                 {/* Top Section: Flag, Code, Name Skeleton */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <Skeleton className="size-14 rounded-full flex-shrink-0" />{" "}
//                   {/* Flag */}
//                   <div className="flex-1 space-y-1.5">
//                     <Skeleton className="h-6 w-1/3 rounded" /> {/* Code */}
//                     <Skeleton className="h-4 w-2/3 rounded" /> {/* Name */}
//                   </div>
//                 </div>

//                 {/* Rate Adjustment Section Skeleton */}
//                 <div className="p-3 space-y-2 rounded-lg border">
//                   <Skeleton className="h-4 w-1/4 rounded mb-1" /> {/* Label */}
//                   <Skeleton className="h-6 w-1/2 rounded" /> {/* Value */}
//                   <Skeleton className="h-3 w-full rounded mt-1" />{" "}
//                   {/* Description */}
//                 </div>
//               </div>

//               {/* Actions Footer Skeleton */}
//               <div className="border-t p-4">
//                 <div className="flex flex-wrap flex-row gap-2">
//                   <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />{" "}
//                   {/* Button 1 */}
//                   <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />{" "}
//                   {/* Button 2 */}
//                   <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />{" "}
//                   {/* Button 3 */}
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   </div>
// );
// // --- END: Loading Skeleton Component ---

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   // State for inline editing - needs to use the new field name
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // Memoized filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
//     };

//     checkMobileScreen(); // Initial check on mount

//     window.addEventListener("resize", checkMobileScreen); // Add listener for resize

//     return () => {
//       window.removeEventListener("resize", checkMobileScreen); // Cleanup listener on unmount
//     };
//   }, []);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   // Wrap fetchCurrenciesList in useCallback
//   const fetchCurrenciesList = useCallback(async () => {
//     if (!token) {
//       router.push("/auth/login"); // Redirect if no token early
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (error: unknown) {
//       // Use unknown for catch block
//       console.error("Error fetching currencies:", error);
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         // Type guard for AxiosError
//         if (error.response?.status === 403 || error.response?.status === 401) {
//           router.push("/auth/login");
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to load currencies"
//           );
//         }
//       } else if (error instanceof Error) {
//         // Handle generic errors
//         toast.error(error.message);
//       } else {
//         // Handle unknown errors
//         toast.error("An unexpected error occurred while fetching currencies.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, router]); // Add dependencies for useCallback

//   useEffect(() => {
//     if (token) {
//       // Only fetch if token exists
//       fetchCurrenciesList();
//     }
//   }, [fetchCurrenciesList, token]); // Add fetchCurrenciesList to dependency array

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       // Convert code to uppercase immediately
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   // handleCreateCurrency - updated validation and payload
//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0; // Default to 0
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue, // Send parsed number
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({
//         code: "",
//         currencyName: "",
//         flagImage: "",
//         rateAdjustmentPercentage: "",
//       });
//       setIsCreateModalOpen(false);
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (error: unknown) {
//       // Use unknown for catch block
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         // Type guard
//         toast.error(
//           error.response?.data?.message || "Failed to create currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Inline Editing Handlers ---
//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string if null/undefined
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (error: unknown) {
//       // Use unknown for catch block
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         // Type guard
//         toast.error(
//           error.response?.data?.message || "Failed to update currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while updating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };
//   // --- End Inline Editing Handlers ---

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Close confirmation, reset ID, fetch list, show success
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (error: unknown) {
//       // Use unknown for catch block
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         // Type guard
//         toast.error(
//           error.response?.data?.message || "Failed to delete currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while deleting the currency."
//         );
//       }
//       // Keep modal open on error to show message
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   // --- RENDER ---
//   return isLoading ? (
//     <LoadingSkeleton />
//   ) : (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         {/* Header Section */}
//         <div className="pb-6 border-b">
//           <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//             Currency Management
//           </h1>

//           <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//             Easily manage all supported currencies, customize rates, and
//             maintain real-time control over your exchange offerings
//           </p>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//         {/* Action Bar */}
//         <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//           <div>
//             <button
//               onClick={() => {
//                 setIsCreateModalOpen(true);
//               }} // Clear error on open
//               className="bg-primary text-neutral-900 flex items-center justify-center gap-1  hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
//             >
//               <IoMdAdd
//                 size={28}
//                 title={isMobile ? "Add Currency" : undefined} // Tooltip for mobile
//               />
//               {!isMobile && <span>Add Currency</span>}
//               {/* Conditionally render text */}
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="relative sm:w-auto w-full">
//             {/* Search Icon */}
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="size-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>

//             {/* Input Field */}
//             <input
//               type="text"
//               placeholder="Search currencies..."
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* Clear Button (Conditionally Rendered) */}
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 aria-label="Clear search"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Currency List / Loading / Empty State */}
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 size={60} className="text-neutral-900 animate-spin" />
//           </div>
//         ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <MdCurrencyRupee className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               No currencies found
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Currently, there are no currencies available with related
//               descriptions at this time.
//             </p>
//           </div>
//         ) : (
//           // --- Currency Cards ---
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCurrencies.map((currency) => (
//               <div
//                 key={currency._id}
//                 className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//               >
//                 <div className="lg:p-5 p-4 flex-grow">
//                   {/* Top Section: Flag, Code, Name */}
//                   <div className="flex items-center gap-4 mb-4">
//                     {/* Flag Image - Replaced <img> with next/image <Image> */}
//                     {currency.flagImage ? (
//                       <Image
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         width={56} // size-14 = 3.5rem = 56px
//                         height={56} // size-14 = 3.5rem = 56px
//                         className="object-contain rounded-full"
//                         // onError is handled differently in next/image, consider a placeholder if needed
//                       />
//                     ) : (
//                       <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                         No flag
//                       </div>
//                     )}

//                     {/* Code and Name */}
//                     <div className="flex-1">
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           name="code"
//                           value={editingFields.code}
//                           onChange={handleEditingInputChange}
//                           className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Rate Adjustment Section - UPDATED */}
//                   <div className="p-3 space-y-2 rounded-lg border">
//                     <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                       Our Rates
//                     </label>

//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="number"
//                         name="rateAdjustmentPercentage" // Correct name
//                         value={editingFields.rateAdjustmentPercentage}
//                         onChange={handleEditingInputChange}
//                         placeholder="e.g., 0.5 or +0.1"
//                         step="any"
//                         className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
//                       />
//                     ) : (
//                       <p
//                         className={`text-lg font-bold ${
//                           currency.rateAdjustmentPercentage != null
//                             ? "text-neutral-900 font-medium dark:text-white"
//                             : "text-gray-400 italic dark:text-gray-500"
//                         }`}
//                       >
//                         {currency.rateAdjustmentPercentage != null
//                           ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                               undefined,
//                               {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               }
//                             )}%`
//                           : "Not Set"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 dark:text-gray-300 mt-1">
//                       Our Rates vs market rate.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Actions Footer */}
//                 <div className=" border-t p-4">
//                   {editingCurrencyId === currency._id ? (
//                     // --- Save/Cancel Buttons ---
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleUpdateCurrency}
//                         disabled={isSubmitting}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         {isSubmitting ? (
//                           <Loader2 size={20} className="animate-spin" />
//                         ) : (
//                           <Save size={20} />
//                         )}
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <IoMdCloseCircle size={20} /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     // --- Details/Edit/Delete Buttons ---
//                     <div className="flex flex-wrap flex-row gap-2">
//                       <Link
//                         href={`/admin/currencies/${currency._id}`}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Info size={20} /> Details
//                       </Link>
//                       <button
//                         onClick={() => startEditing(currency)}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Edit size={20} /> Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrencyToDeleteId(currency._id);
//                           setIsDeleteConfirmationOpen(true);
//                         }}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Trash2 size={20} /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Currency Modal */}
//         <AnimatePresence>
//           {isCreateModalOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsCreateModalOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 {/* Header */}
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                     onClick={() => setIsCreateModalOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />{" "}
//                     {/* Added dark mode text color */}
//                   </button>
//                 </div>

//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center my-6">
//                   <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                     Add New Currency
//                   </h2>

//                 </div>

//                 {/* Modal Form */}
//                 <div className="space-y-4">
//                   {/* Code */}
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Code{" "}
//                       <span className="text-red-600">*</span>
//                     </label>

//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="mt-1 block px-4 py-3 bg-white dark:bg-background focus:border-[#5f5f5f] h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75" // Added dark mode styles
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>

//                   {/* Name */}
//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Name{" "}
//                       <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="mt-1 block px-4 py-3 bg-white focus:border-[#5f5f5f] font-medium dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75" // Added dark mode styles
//                     />
//                   </div>
//                   {/* Flag Image Path */}
//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Flag Image Path{" "}
//                       <span className="text-red-600">*</span>
//                     </label>

//                     <input
//                       type="text"
//                       id="create-flagImage"
//                       name="flagImage"
//                       value={newCurrencyData.flagImage}
//                       onChange={handleCreateInputChange}
//                       placeholder="/assets/icon/flags/usd.png"
//                       className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75" // Added dark mode styles
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       /assets/icon/flags/usd.png path to the image.
//                     </p>
//                   </div>

//                   {/* Rate Adjustment Percentage - UPDATED */}
//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-gray-500 dark:text-gray-300 capitalize text-sm lg:text-base flex items-center gap-2"
//                     >
//                       Rate Adjustment
//                       <span className="text-red-600">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number" // Ensure type is number for step validation
//                         id="create-rateAdjustmentPercentage"
//                         name="rateAdjustmentPercentage" // Correct name
//                         value={newCurrencyData.rateAdjustmentPercentage}
//                         onChange={handleCreateInputChange}
//                         step="any"
//                         placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner" // Added dark mode styles
//                       />

//                       <div className="absolute top-4 right-4">
//                         <Percent
//                           size={20}
//                           className="dark:text-white text-neutral-900"
//                         />{" "}
//                       </div>

//                     </div>

//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Modal Actions */}
//                 <div className="flex justify-end items-center mt-5 gap-3">
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M12 2V6"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {isDeleteConfirmationOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center" // Added padding and inset-0
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsDeleteConfirmationOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative" // Added dark mode, padding adjustments, shadow
//                 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>
//                 {/* Icon and Title */}
//                 <div className="text-left">
//                   <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                     Delete Currency ?
//                   </h3>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-300 font-medium mb-6">
//                       {" "}
//                       {/* Adjusted text color */}
//                       Are you sure you want to delete this currency? This action
//                       cannot be undone.
//                     </p>
//                   </div>
//                 </div>
//                 {/* Buttons */}
//                 <div className="mt-6 flex flex-col gap-4">
//                   <button
//                     onClick={handleDeleteCurrency}
//                     disabled={isSubmitting}
//                     type="button"
//                     className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed" // Changed to red, added loader handling
//                   >
//                     {isSubmitting ? (
//                       <Loader2 size={20} className="animate-spin mr-2" /> // Added loader
//                     ) : null}
//                     {isSubmitting ? "Deleting..." : "Delete"}
//                   </button>
//                   <button
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     type="button"
//                     disabled={isSubmitting} // Disable cancel while deleting
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles and border colors
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
// import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios"; // Import AxiosError
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image"; // Keep Image from next/image
// import {
//   Loader2,
//   // PlusCircle, // Removed unused import
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
// } from "lucide-react";
// import { IoClose } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel, MdCurrencyRupee } from "react-icons/md";
// import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
// import { Skeleton } from "@/components/ui/skeleton";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number; // Updated field name
// }

// // Interface for the form data
// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string; // Use string for input
// }

// // Define a type for Axios error responses if needed, or use AxiosError directly
// interface ApiErrorResponse {
//   message: string;
//   // Add other potential fields if your API returns them
// }

// // --- NEW: Loading Skeleton Component ---
// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 bg-white dark:bg-background">
//     <div className="space-y-6">
//       {/* Header Skeleton */}
//       <div className="pb-6 mb-6 border-b">
//         <Skeleton className="h-8 w-3/5 sm:w-1/3 rounded mb-3" /> {/* Title */}
//         <Skeleton className="h-4 w-4/5 sm:w-1/2 rounded" /> {/* Description */}
//       </div>

//       {/* Action Bar Skeleton */}
//       <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//         <Skeleton className="h-12 w-12 sm:h-12.5 sm:w-40 rounded-full" />{" "}
//         {/* Add Button */}
//         <Skeleton className="h-12 sm:h-12.5 flex-1 sm:flex-none sm:w-64 rounded-full" />{" "}
//         {/* Search */}
//       </div>

//       {/* Currency Cards Grid Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map(
//           (
//             _,
//             index // Render 6 skeleton cards
//           ) => (
//             <div
//               key={index}
//               className="rounded-xl overflow-hidden border flex flex-col"
//             >
//               {/* Card Content Area */}
//               <div className="lg:p-5 p-4 flex-grow">
//                 {/* Top Section: Flag, Code, Name Skeleton */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <Skeleton className="size-14 rounded-full flex-shrink-0" />{" "}
//                   {/* Flag */}
//                   <div className="flex-1 space-y-1.5">
//                     <Skeleton className="h-6 w-1/3 rounded" /> {/* Code */}
//                     <Skeleton className="h-4 w-2/3 rounded" /> {/* Name */}
//                   </div>
//                 </div>

//                 {/* Rate Adjustment Section Skeleton */}
//                 <div className="p-3 space-y-2 rounded-lg border">
//                   <Skeleton className="h-4 w-1/4 rounded mb-1" /> {/* Label */}
//                   <Skeleton className="h-6 w-1/2 rounded" /> {/* Value */}
//                   <Skeleton className="h-3 w-full rounded mt-1" />{" "}
//                   {/* Description */}
//                 </div>
//               </div>

//               {/* Actions Footer Skeleton */}
//               <div className="border-t p-4">
//                 <div className="flex flex-wrap flex-row gap-2">
//                   <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />{" "}
//                   {/* Button 1 */}
//                   <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />{" "}
//                   {/* Button 2 */}
//                   <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />{" "}
//                   {/* Button 3 */}
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   </div>
// );
// // --- END: Loading Skeleton Component ---

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // Memoized filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   // --- START: Effect to handle body scroll ---
//   useEffect(() => {
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     if (isCreateModalOpen || isDeleteConfirmationOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = originalStyle;
//     }
//     // Cleanup function to restore original style
//     return () => {
//       document.body.style.overflow = originalStyle;
//     };
//   }, [isCreateModalOpen, isDeleteConfirmationOpen]);
//   // --- END: Effect to handle body scroll ---

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   const fetchCurrenciesList = useCallback(async () => {
//     if (!token) {
//       router.push("/auth/login");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (error: unknown) {
//       console.error("Error fetching currencies:", error);
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         if (error.response?.status === 403 || error.response?.status === 401) {
//           router.push("/auth/login");
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to load currencies"
//           );
//         }
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("An unexpected error occurred while fetching currencies.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   useEffect(() => {
//     if (token) {
//       fetchCurrenciesList();
//     }
//   }, [fetchCurrenciesList, token]);

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({
//         code: "",
//         currencyName: "",
//         flagImage: "",
//         rateAdjustmentPercentage: "",
//       });
//       setIsCreateModalOpen(false);
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to create currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to update currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while updating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to delete currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while deleting the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   return isLoading ? (
//     <LoadingSkeleton />
//   ) : (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         <div className="pb-6 border-b">
//           <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//             Currency Management
//           </h1>
//           <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//             Easily manage all supported currencies, customize rates, and
//             maintain real-time control over your exchange offerings
//           </p>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//         <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//           <div>
//             <button
//               onClick={() => {
//                 setIsCreateModalOpen(true);
//               }}
//               className="bg-primary text-neutral-900 flex items-center justify-center gap-1  hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
//             >
//               <IoMdAdd
//                 size={28}
//                 title={isMobile ? "Add Currency" : undefined}
//               />
//               {!isMobile && <span>Add Currency</span>}
//             </button>
//           </div>

//           <div className="relative sm:w-auto w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="size-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currencies..."
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 aria-label="Clear search"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 size={60} className="text-neutral-900 animate-spin" />
//           </div>
//         ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <MdCurrencyRupee className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               No currencies found
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Currently, there are no currencies available with related
//               descriptions at this time.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCurrencies.map((currency) => (
//               <div
//                 key={currency._id}
//                 className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//               >
//                 <div className="lg:p-5 p-4 flex-grow">
//                   <div className="flex items-center gap-4 mb-4">
//                     {currency.flagImage ? (
//                       <Image
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         width={56}
//                         height={56}
//                         className="object-contain rounded-full"
//                       />
//                     ) : (
//                       <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                         No flag
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           name="code"
//                           value={editingFields.code}
//                           onChange={handleEditingInputChange}
//                           className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-3 space-y-2 rounded-lg border">
//                     <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                       Our Rates
//                     </label>
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="number"
//                         name="rateAdjustmentPercentage"
//                         value={editingFields.rateAdjustmentPercentage}
//                         onChange={handleEditingInputChange}
//                         placeholder="e.g., 0.5 or +0.1"
//                         step="any"
//                         className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
//                       />
//                     ) : (
//                       <p
//                         className={`text-lg font-bold ${
//                           currency.rateAdjustmentPercentage != null
//                             ? "text-neutral-900 font-medium dark:text-white"
//                             : "text-gray-400 italic dark:text-gray-500"
//                         }`}
//                       >
//                         {currency.rateAdjustmentPercentage != null
//                           ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                               undefined,
//                               {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               }
//                             )}%`
//                           : "Not Set"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 dark:text-gray-300 mt-1">
//                       Our Rates vs market rate.
//                     </p>
//                   </div>
//                 </div>

//                 <div className=" border-t p-4">
//                   {editingCurrencyId === currency._id ? (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleUpdateCurrency}
//                         disabled={isSubmitting}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         {isSubmitting ? (
//                           <Loader2 size={20} className="animate-spin" />
//                         ) : (
//                           <Save size={20} />
//                         )}
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <IoMdCloseCircle size={20} /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap flex-row gap-2">
//                       <Link
//                         href={`/admin/currencies/${currency._id}`}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Info size={20} /> Details
//                       </Link>
//                       <button
//                         onClick={() => startEditing(currency)}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Edit size={20} /> Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrencyToDeleteId(currency._id);
//                           setIsDeleteConfirmationOpen(true);
//                         }}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Trash2 size={20} /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Currency Modal */}
//         <AnimatePresence>
//           {isCreateModalOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsCreateModalOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                     onClick={() => setIsCreateModalOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>

//                 <div className="flex justify-between items-center my-6">
//                   <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                     Add New Currency
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Code <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="mt-1 block px-4 py-3 bg-white dark:bg-background focus:border-[#5f5f5f] h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Name <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="mt-1 block px-4 py-3 bg-white focus:border-[#5f5f5f] font-medium dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Flag Image Path <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-flagImage"
//                       name="flagImage"
//                       value={newCurrencyData.flagImage}
//                       onChange={handleCreateInputChange}
//                       placeholder="/assets/icon/flags/usd.png"
//                       className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       /assets/icon/flags/usd.png path to the image.
//                     </p>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-gray-500 dark:text-gray-300 capitalize text-sm lg:text-base flex items-center gap-2"
//                     >
//                       Rate Adjustment
//                       <span className="text-red-600">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         id="create-rateAdjustmentPercentage"
//                         name="rateAdjustmentPercentage"
//                         value={newCurrencyData.rateAdjustmentPercentage}
//                         onChange={handleCreateInputChange}
//                         step="any"
//                         placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                       />
//                       <div className="absolute top-4 right-4">
//                         <Percent
//                           size={20}
//                           className="dark:text-white text-neutral-900"
//                         />
//                       </div>
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex justify-end items-center mt-5 gap-3">
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {isDeleteConfirmationOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsDeleteConfirmationOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>
//                 <div className="text-left">
//                   <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                     Delete Currency ?
//                   </h3>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-300 font-medium mb-6">
//                       Are you sure you want to delete this currency? This action
//                       cannot be undone.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex flex-col gap-4">
//                   <button
//                     onClick={handleDeleteCurrency}
//                     disabled={isSubmitting}
//                     type="button"
//                     className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <Loader2 size={20} className="animate-spin mr-2" />
//                     ) : null}
//                     {isSubmitting ? "Deleting..." : "Delete"}
//                   </button>
//                   <button
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     type="button"
//                     disabled={isSubmitting}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// // frontend/src/app/admin/currencies/page.tsx
// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image"; // Ensure Image from next/image is imported
// import {
//   Loader2,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
//   CheckCircle,
//   // ImageIcon, // Not used directly here, but Image from next/image is
// } from "lucide-react";
// import { IoClose } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel, MdCurrencyRupee } from "react-icons/md";
// import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { Skeleton } from "@/components/ui/skeleton";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number;
// }

// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string;
// }

// interface ApiErrorResponse {
//   message: string;
// }

// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 bg-white dark:bg-background">
//     <div className="space-y-6">
//       <div className="pb-6 mb-6 border-b">
//         <Skeleton className="h-8 w-3/5 sm:w-1/3 rounded mb-3" />
//         <Skeleton className="h-4 w-4/5 sm:w-1/2 rounded" />
//       </div>
//       <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//         <Skeleton className="h-12 w-12 sm:h-12.5 sm:w-40 rounded-full" />
//         <Skeleton className="h-12 sm:h-12.5 flex-1 sm:flex-none sm:w-64 rounded-full" />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div
//             key={index}
//             className="rounded-xl overflow-hidden border flex flex-col"
//           >
//             <div className="lg:p-5 p-4 flex-grow">
//               <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                 <div className="flex-1 space-y-1.5">
//                   <Skeleton className="h-6 w-1/3 rounded" />
//                   <Skeleton className="h-4 w-2/3 rounded" />
//                 </div>
//               </div>
//               <div className="p-3 space-y-2 rounded-lg border">
//                 <Skeleton className="h-4 w-1/4 rounded mb-1" />
//                 <Skeleton className="h-6 w-1/2 rounded" />
//                 <Skeleton className="h-3 w-full rounded mt-1" />
//               </div>
//             </div>
//             <div className="border-t p-4">
//               <div className="flex flex-wrap flex-row gap-2">
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // --- NEW: State for flag image error in create modal ---
//   const [createFlagImageError, setCreateFlagImageError] =
//     useState<boolean>(false);

//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   useEffect(() => {
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     if (isCreateModalOpen || isDeleteConfirmationOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = originalStyle;
//     }
//     return () => {
//       document.body.style.overflow = originalStyle;
//     };
//   }, [isCreateModalOpen, isDeleteConfirmationOpen]);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   const fetchCurrenciesList = useCallback(async () => {
//     if (!token) {
//       router.push("/auth/login");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (error: unknown) {
//       console.error("Error fetching currencies:", error);
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         if (error.response?.status === 403 || error.response?.status === 401) {
//           router.push("/auth/login");
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to load currencies"
//           );
//         }
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("An unexpected error occurred while fetching currencies.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   useEffect(() => {
//     if (token) {
//       fetchCurrenciesList();
//     }
//   }, [fetchCurrenciesList, token]);

//   // --- NEW: Functions to open and close create modal, handling flag error state ---
//   const openCreateModal = () => {
//     setNewCurrencyData({
//       // Reset form data for a fresh modal
//       code: "",
//       currencyName: "",
//       flagImage: "",
//       rateAdjustmentPercentage: "",
//     });
//     setCreateFlagImageError(false); // Reset error when opening
//     setIsCreateModalOpen(true);
//   };

//   const closeCreateModal = () => {
//     setIsCreateModalOpen(false);
//     setCreateFlagImageError(false); // Reset error when closing
//     // Optionally re-reset form data if needed, though openCreateModal does this
//     // setNewCurrencyData({ code: "", currencyName: "", flagImage: "", rateAdjustmentPercentage: "" });
//   };

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//     // --- MODIFIED: Reset flag image error on change ---
//     if (name === "flagImage") {
//       setCreateFlagImageError(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }
//     if (
//       newCurrencyData.flagImage &&
//       !newCurrencyData.flagImage.startsWith("/") &&
//       !newCurrencyData.flagImage.startsWith("http")
//     ) {
//       toast.error(
//         "Flag Image Path must be a relative path starting with '/' or a full URL."
//       );
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // setNewCurrencyData is handled by openCreateModal next time or implicitly by close
//       closeCreateModal(); // Use new close function
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to create currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to update currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while updating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to delete currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while deleting the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   return isLoading ? (
//     <LoadingSkeleton />
//   ) : (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         <div className="pb-6 border-b">
//           <h1 className="lg:text-3xl text-2xl font-medium text-mainheading dark:text-primary">
//             Currency Management
//           </h1>
//           <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//             Easily manage all supported currencies, customize rates, and
//             maintain real-time control over your exchange offerings
//           </p>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//         <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//           <div>
//             <button
//               onClick={openCreateModal} // Use new open function
//               className="bg-primary text-neutral-900 flex items-center justify-center gap-1  hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
//             >
//               <IoMdAdd
//                 size={28}
//                 title={isMobile ? "Add Currency" : undefined}
//               />
//               {!isMobile && <span>Add Currency</span>}
//             </button>
//           </div>

//           <div className="relative sm:w-auto w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="size-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currencies..."
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 aria-label="Clear search"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 size={60} className="text-neutral-900 animate-spin" />
//           </div>
//         ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <MdCurrencyRupee className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               No currencies found
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Currently, there are no currencies available with related
//               descriptions at this time.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCurrencies.map((currency) => (
//               <div
//                 key={currency._id}
//                 className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//               >
//                 <div className="lg:p-5 p-4 flex-grow">
//                   <div className="flex items-center gap-4 mb-4">
//                     {currency.flagImage ? (
//                       <Image
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         width={56}
//                         height={56}
//                         className="object-contain rounded-full"
//                         unoptimized={currency.flagImage.startsWith("http")}
//                       />
//                     ) : (
//                       <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                         No flag
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           name="code"
//                           value={editingFields.code}
//                           onChange={handleEditingInputChange}
//                           className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-3 space-y-2 rounded-lg border">
//                     <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                       Our Rates
//                     </label>
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="number"
//                         name="rateAdjustmentPercentage"
//                         value={editingFields.rateAdjustmentPercentage}
//                         onChange={handleEditingInputChange}
//                         placeholder="e.g., 0.5 or +0.1"
//                         step="any"
//                         className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
//                       />
//                     ) : (
//                       <p
//                         className={`text-lg font-bold ${
//                           currency.rateAdjustmentPercentage != null
//                             ? "text-neutral-900 font-medium dark:text-white"
//                             : "text-gray-400 italic dark:text-gray-500"
//                         }`}
//                       >
//                         {currency.rateAdjustmentPercentage != null
//                           ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                               undefined,
//                               {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               }
//                             )}%`
//                           : "Not Set"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 dark:text-gray-300 mt-1">
//                       Our Rates vs market rate.
//                     </p>
//                   </div>
//                 </div>

//                 <div className=" border-t p-4">
//                   {editingCurrencyId === currency._id ? (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleUpdateCurrency}
//                         disabled={isSubmitting}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         {isSubmitting ? (
//                           <Loader2 size={20} className="animate-spin" />
//                         ) : (
//                           <Save size={20} />
//                         )}
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <IoMdCloseCircle size={20} /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap flex-row gap-2">
//                       <Link
//                         href={`/admin/currencies/${currency._id}`}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Info size={20} /> Details
//                       </Link>
//                       <button
//                         onClick={() => startEditing(currency)}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Edit size={20} /> Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrencyToDeleteId(currency._id);
//                           setIsDeleteConfirmationOpen(true);
//                         }}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Trash2 size={20} /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Currency Modal */}
//         <AnimatePresence>
//           {isCreateModalOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeCreateModal} // Use new close function
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                     onClick={closeCreateModal} // Use new close function
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>

//                 <div className="flex justify-between items-center my-6">
//                   <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                     Add New Currency
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Code <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="mt-1 block px-4 py-3 bg-white dark:bg-background focus:border-[#5f5f5f] h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Name <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="mt-1 block px-4 py-3 bg-white focus:border-[#5f5f5f] font-medium dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                   </div>
//                   {/* --- UPDATED: Flag Image Path input with preview --- */}
//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Flag Image Path <span className="text-red-600">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="create-flagImage"
//                         name="flagImage"
//                         value={newCurrencyData.flagImage}
//                         onChange={handleCreateInputChange}
//                         placeholder="/assets/icon/flags/usd.png"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                       />
//                       {newCurrencyData.flagImage && !createFlagImageError && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 size-8 pointer-events-none">
//                           <Image
//                             src={newCurrencyData.flagImage}
//                             alt={`${
//                               newCurrencyData.code || "New Currency"
//                             } flag`}
//                             fill
//                             style={{ objectFit: "contain" }}
//                             onError={() => setCreateFlagImageError(true)}
//                             unoptimized={newCurrencyData.flagImage.startsWith(
//                               "http"
//                             )}
//                           />
//                         </div>
//                       )}
//                       {createFlagImageError && newCurrencyData.flagImage && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-medium text-xs">
//                           Load Error
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Relative path (e.g., /assets/icon/flags/eur.png) or full
//                       URL. Must be accessible.
//                     </p>
//                     {createFlagImageError && (
//                       <p className="mt-2 text-xs font-medium text-red-600">
//                         Could not load the flag image. Check the path/URL.
//                       </p>
//                     )}
//                   </div>
//                   {/* --- END: Updated Flag Image Path input --- */}

//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-gray-500 dark:text-gray-300 capitalize text-sm lg:text-base flex items-center gap-2"
//                     >
//                       Rate Adjustment
//                       <span className="text-red-600">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         id="create-rateAdjustmentPercentage"
//                         name="rateAdjustmentPercentage"
//                         value={newCurrencyData.rateAdjustmentPercentage}
//                         onChange={handleCreateInputChange}
//                         step="any"
//                         placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                       />
//                       <div className="absolute top-4 right-4">
//                         <Percent
//                           size={20}
//                           className="dark:text-white text-neutral-900"
//                         />
//                       </div>
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex justify-end items-center mt-5 gap-3">
//                   <button
//                     onClick={closeCreateModal} // Use new close function
//                     className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {isDeleteConfirmationOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsDeleteConfirmationOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>

//                 <div className="flex justify-center mb-4">
//                   <div className="p-3 bg-green-100 dark:bg-red-900/30 rounded-full">
//                     <CheckCircle className="size-10 text-red-600 dark:text-red-400" />
//                   </div>
//                 </div>

//                 <div className="sm:text-left text-center">
//                   <h3 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white my-5">
//                     Delete Currency Confirmation ?
//                   </h3>

//                   <p className="text-gray-500 dark:text-gray-300 font-medium">
//                     Confirmation modal to delete a selected currency, warning
//                     the admin that this action is irreversible.
//                   </p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 mt-5">
//                   <button
//                     onClick={handleDeleteCurrency}
//                     disabled={isSubmitting}
//                     type="button"
//                     className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Deleting..." : "Delete"}
//                   </button>

//                   <button
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     type="button"
//                     disabled={isSubmitting}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox w-full dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// // frontend/src/app/admin/currencies/page.tsx
// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image"; // Ensure Image from next/image is imported
// import {
//   Loader2,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
//   CheckCircle,
//   // ImageIcon, // Not used directly here, but Image from next/image is
// } from "lucide-react";
// import { IoClose } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel, MdCurrencyRupee } from "react-icons/md";
// import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { Skeleton } from "@/components/ui/skeleton";
// import { FaCoins } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number;
// }

// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string;
// }

// interface ApiErrorResponse {
//   message: string;
// }

// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 bg-white dark:bg-background">
//     <div className="space-y-6">
//       <div className="pb-6 mb-6 border-b">
//         <Skeleton className="h-8 w-3/5 sm:w-1/3 rounded mb-3" />
//         <Skeleton className="h-4 w-4/5 sm:w-1/2 rounded" />
//       </div>
//       <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//         <Skeleton className="h-12 w-12 sm:h-12.5 sm:w-40 rounded-full" />
//         <Skeleton className="h-12 sm:h-12.5 flex-1 sm:flex-none sm:w-64 rounded-full" />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div
//             key={index}
//             className="rounded-xl overflow-hidden border flex flex-col"
//           >
//             <div className="lg:p-5 p-4 flex-grow">
//               <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                 <div className="flex-1 space-y-1.5">
//                   <Skeleton className="h-6 w-1/3 rounded" />
//                   <Skeleton className="h-4 w-2/3 rounded" />
//                 </div>
//               </div>
//               <div className="p-3 space-y-2 rounded-lg border">
//                 <Skeleton className="h-4 w-1/4 rounded mb-1" />
//                 <Skeleton className="h-6 w-1/2 rounded" />
//                 <Skeleton className="h-3 w-full rounded mt-1" />
//               </div>
//             </div>
//             <div className="border-t p-4">
//               <div className="flex flex-wrap flex-row gap-2">
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // --- NEW: State for flag image error in create modal ---
//   const [createFlagImageError, setCreateFlagImageError] =
//     useState<boolean>(false);

//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   // This useEffect handles preventing body scroll when any modal is open.
//   // It correctly includes `isDeleteConfirmationOpen` in its logic.
//   useEffect(() => {
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     if (isCreateModalOpen || isDeleteConfirmationOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = originalStyle;
//     }
//     return () => {
//       document.body.style.overflow = originalStyle;
//     };
//   }, [isCreateModalOpen, isDeleteConfirmationOpen]);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   const fetchCurrenciesList = useCallback(async () => {
//     if (!token) {
//       router.push("/auth/login");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (error: unknown) {
//       console.error("Error fetching currencies:", error);
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         if (error.response?.status === 403 || error.response?.status === 401) {
//           router.push("/auth/login");
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to load currencies"
//           );
//         }
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("An unexpected error occurred while fetching currencies.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   useEffect(() => {
//     if (token) {
//       fetchCurrenciesList();
//     }
//   }, [fetchCurrenciesList, token]);

//   // --- NEW: Functions to open and close create modal, handling flag error state ---
//   const openCreateModal = () => {
//     setNewCurrencyData({
//       // Reset form data for a fresh modal
//       code: "",
//       currencyName: "",
//       flagImage: "",
//       rateAdjustmentPercentage: "",
//     });
//     setCreateFlagImageError(false); // Reset error when opening
//     setIsCreateModalOpen(true);
//   };

//   const closeCreateModal = () => {
//     setIsCreateModalOpen(false);
//     setCreateFlagImageError(false); // Reset error when closing
//     // Optionally re-reset form data if needed, though openCreateModal does this
//     // setNewCurrencyData({ code: "", currencyName: "", flagImage: "", rateAdjustmentPercentage: "" });
//   };

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//     // --- MODIFIED: Reset flag image error on change ---
//     if (name === "flagImage") {
//       setCreateFlagImageError(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }
//     if (
//       newCurrencyData.flagImage &&
//       !newCurrencyData.flagImage.startsWith("/") &&
//       !newCurrencyData.flagImage.startsWith("http")
//     ) {
//       toast.error(
//         "Flag Image Path must be a relative path starting with '/' or a full URL."
//       );
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // setNewCurrencyData is handled by openCreateModal next time or implicitly by close
//       closeCreateModal(); // Use new close function
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to create currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to update currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while updating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to delete currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while deleting the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   return isLoading ? (
//     <LoadingSkeleton />
//   ) : (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         <div className="Activity">
//           <div className="flex items-center gap-3">
//             <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//               <FaCoins className="size-6 text-mainheading dark:text-primary" />
//             </div>

//             <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//               Currency Management
//             </h1>
//           </div>

//           <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//             Easily manage all supported currencies, customize rates, and
//             maintain real-time control over your exchange offerings.
//           </p>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//         <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//           <div>
//             <button
//               onClick={openCreateModal} // Use new open function
//               className="bg-primary text-neutral-900 flex items-center justify-center gap-1  hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
//             >
//               <IoMdAdd
//                 size={28}
//                 title={isMobile ? "Add Currency" : undefined}
//               />
//               {!isMobile && <span>Add Currency</span>}
//             </button>
//           </div>

//           <div className="relative sm:w-auto w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="size-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currencies..."
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 aria-label="Clear search"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 size={60} className="text-neutral-900 animate-spin" />
//           </div>
//         ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <MdCurrencyRupee className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               No currencies found
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Currently, there are no currencies available with related
//               descriptions at this time.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCurrencies.map((currency) => (
//               <div
//                 key={currency._id}
//                 className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//               >
//                 <div className="lg:p-5 p-4 flex-grow">
//                   <div className="flex items-center gap-4 mb-4">
//                     {currency.flagImage ? (
//                       <Image
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         width={56}
//                         height={56}
//                         className="object-contain rounded-full"
//                         unoptimized={currency.flagImage.startsWith("http")}
//                       />
//                     ) : (
//                       <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                         No flag
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           name="code"
//                           value={editingFields.code}
//                           onChange={handleEditingInputChange}
//                           className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-3 space-y-2 rounded-lg border">
//                     <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                       Our Rates
//                     </label>
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="number"
//                         name="rateAdjustmentPercentage"
//                         value={editingFields.rateAdjustmentPercentage}
//                         onChange={handleEditingInputChange}
//                         placeholder="e.g., 0.5 or +0.1"
//                         step="any"
//                         className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
//                       />
//                     ) : (
//                       <p
//                         className={`text-lg font-bold ${
//                           currency.rateAdjustmentPercentage != null
//                             ? "text-neutral-900 font-medium dark:text-white"
//                             : "text-gray-400 italic dark:text-gray-500"
//                         }`}
//                       >
//                         {currency.rateAdjustmentPercentage != null
//                           ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                               undefined,
//                               {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               }
//                             )}%`
//                           : "Not Set"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 dark:text-gray-300 mt-1">
//                       Our Rates vs market rate.
//                     </p>
//                   </div>
//                 </div>

//                 <div className=" border-t p-4">
//                   {editingCurrencyId === currency._id ? (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleUpdateCurrency}
//                         disabled={isSubmitting}
//                         className="flex-1 flex cursor-pointer justify-center gap-1.5 items-center border text-gray-500 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="h-5 w-5 text-gray-500 dark:text-gray-300 animate-spin"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M12 2V6"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M12 18V22"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M4.93 4.93L7.76 7.76"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M16.24 16.24L19.07 19.07"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M2 12H6"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M18 12H22"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M4.93 19.07L7.76 16.24"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M16.24 7.76L19.07 4.93"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </>
//                         ) : (
//                           <Save size={20} />
//                         )}
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <IoMdCloseCircle size={20} /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap flex-row gap-2">
//                       <Link
//                         href={`/admin/currencies/${currency._id}`}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Info size={20} /> Details
//                       </Link>
//                       <button
//                         onClick={() => startEditing(currency)}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Edit size={20} /> Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrencyToDeleteId(currency._id);
//                           setIsDeleteConfirmationOpen(true);
//                         }}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Trash2 size={20} /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Currency Modal */}
//         <AnimatePresence>
//           {isCreateModalOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeCreateModal} // Use new close function
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 {/* Header */}
//                 <div className="p-4 sm:p-6 rounded-t-2xl flex items-center justify-between border-b">
//                   {" "}
//                   {/* Added dark border */}
//                   <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                     <button
//                       className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                       onClick={closeCreateModal}
//                       aria-label="Close modal"
//                       type="button"
//                     >
//                       <IoClose
//                         size={28}
//                         className="text-neutral-900 dark:text-primary"
//                       />
//                     </button>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                       Add New Currency
//                     </h2>
//                   </div>
//                 </div>

//                 {/* Scrollable Content Area */}
//                 <div className="space-y-5 p-4 sm:p-6">
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Code <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="mt-1 block px-4 py-3 bg-white dark:bg-background focus:border-[#5f5f5f] h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Name <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="mt-1 block px-4 py-3 bg-white focus:border-[#5f5f5f] font-medium dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                   </div>
//                   {/* --- UPDATED: Flag Image Path input with preview --- */}
//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Flag Image Path <span className="text-red-600">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="create-flagImage"
//                         name="flagImage"
//                         value={newCurrencyData.flagImage}
//                         onChange={handleCreateInputChange}
//                         placeholder="/assets/icon/flags/usd.png"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                       />
//                       {newCurrencyData.flagImage && !createFlagImageError && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 size-8 pointer-events-none">
//                           <Image
//                             src={newCurrencyData.flagImage}
//                             alt={`${
//                               newCurrencyData.code || "New Currency"
//                             } flag`}
//                             fill
//                             style={{ objectFit: "contain" }}
//                             onError={() => setCreateFlagImageError(true)}
//                             unoptimized={newCurrencyData.flagImage.startsWith(
//                               "http"
//                             )}
//                           />
//                         </div>
//                       )}
//                       {createFlagImageError && newCurrencyData.flagImage && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-medium text-xs">
//                           Load Error
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Relative path (e.g., /assets/icon/flags/eur.png) or full
//                       URL. Must be accessible.
//                     </p>
//                     {createFlagImageError && (
//                       <p className="mt-2 text-xs font-medium text-red-600">
//                         Could not load the flag image. Check the path/URL.
//                       </p>
//                     )}
//                   </div>
//                   {/* --- END: Updated Flag Image Path input --- */}

//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-gray-500 dark:text-gray-300 capitalize text-sm lg:text-base flex items-center gap-2"
//                     >
//                       Rate Adjustment
//                       <span className="text-red-600">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number"
//                         id="create-rateAdjustmentPercentage"
//                         name="rateAdjustmentPercentage"
//                         value={newCurrencyData.rateAdjustmentPercentage}
//                         onChange={handleCreateInputChange}
//                         step="any"
//                         placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                       />
//                       <div className="absolute top-4 right-4">
//                         <Percent
//                           size={20}
//                           className="dark:text-white text-neutral-900"
//                         />
//                       </div>
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Footer (remains the same) */}
//                 <div className="border-t p-4 sm:p-6 flex sm:flex-row flex-col justify-end gap-3">
//                   <button
//                     onClick={closeCreateModal} // Use new close function
//                     className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                 </div>

//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {isDeleteConfirmationOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsDeleteConfirmationOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>

//                 <div className="flex justify-center mb-5">
//                   <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
//                     <CheckCircle className="size-10 text-red-600 dark:text-red-400" />
//                   </div>
//                 </div>

//                 <div className="text-center">
//                   <h3 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white my-5">
//                     Delete Currency Confirmation ?
//                   </h3>

//                   <p className="text-gray-500 dark:text-gray-300 font-medium">
//                     Confirmation modal to delete a selected currency, warning
//                     the admin that this action is irreversible.
//                   </p>
//                 </div>

//                 <div className="flex flex-row gap-3 mt-5">
//                   <button
//                     onClick={handleDeleteCurrency}
//                     disabled={isSubmitting}
//                     type="button"
//                     className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Deleting..." : "Delete"}
//                   </button>

//                   <button
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     type="button"
//                     disabled={isSubmitting}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox w-full dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// // frontend/src/app/admin/currencies/page.tsx
// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image"; // Ensure Image from next/image is imported
// import {
//   Loader2,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
//   CheckCircle,
//   // ImageIcon, // Not used directly here, but Image from next/image is
// } from "lucide-react";
// import { IoClose } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import { MdCancel, MdCurrencyRupee } from "react-icons/md";
// import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { Skeleton } from "@/components/ui/skeleton";
// import { FaCoins } from "react-icons/fa";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number;
// }

// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string;
// }

// interface ApiErrorResponse {
//   message: string;
// }

// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-8 bg-white dark:bg-background">
//     <div className="space-y-6">
//       <div className="pb-6 mb-6 border-b">
//         <Skeleton className="h-8 w-3/5 sm:w-1/3 rounded mb-3" />
//         <Skeleton className="h-4 w-4/5 sm:w-1/2 rounded" />
//       </div>
//       <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//         <Skeleton className="h-12 w-12 sm:h-12.5 sm:w-40 rounded-full" />
//         <Skeleton className="h-12 sm:h-12.5 flex-1 sm:flex-none sm:w-64 rounded-full" />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div
//             key={index}
//             className="rounded-xl overflow-hidden border flex flex-col"
//           >
//             <div className="lg:p-5 p-4 flex-grow">
//               <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                 <div className="flex-1 space-y-1.5">
//                   <Skeleton className="h-6 w-1/3 rounded" />
//                   <Skeleton className="h-4 w-2/3 rounded" />
//                 </div>
//               </div>
//               <div className="p-3 space-y-2 rounded-lg border">
//                 <Skeleton className="h-4 w-1/4 rounded mb-1" />
//                 <Skeleton className="h-6 w-1/2 rounded" />
//                 <Skeleton className="h-3 w-full rounded mt-1" />
//               </div>
//             </div>
//             <div className="border-t p-4">
//               <div className="flex flex-wrap flex-row gap-2">
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // --- NEW: State for flag image error in create modal ---
//   const [createFlagImageError, setCreateFlagImageError] =
//     useState<boolean>(false);

//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   useEffect(() => {
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     if (isCreateModalOpen || isDeleteConfirmationOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = originalStyle;
//     }
//     return () => {
//       document.body.style.overflow = originalStyle;
//     };
//   }, [isCreateModalOpen, isDeleteConfirmationOpen]);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   const fetchCurrenciesList = useCallback(async () => {
//     if (!token) {
//       router.push("/auth/login");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (error: unknown) {
//       console.error("Error fetching currencies:", error);
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         if (error.response?.status === 403 || error.response?.status === 401) {
//           router.push("/auth/login");
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to load currencies"
//           );
//         }
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("An unexpected error occurred while fetching currencies.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   useEffect(() => {
//     if (token) {
//       fetchCurrenciesList();
//     }
//   }, [fetchCurrenciesList, token]);

//   const openCreateModal = () => {
//     setNewCurrencyData({
//       code: "",
//       currencyName: "",
//       flagImage: "",
//       rateAdjustmentPercentage: "",
//     });
//     setCreateFlagImageError(false);
//     setIsCreateModalOpen(true);
//   };

//   const closeCreateModal = () => {
//     setIsCreateModalOpen(false);
//     setCreateFlagImageError(false);
//   };

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//     if (name === "flagImage") {
//       setCreateFlagImageError(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }
//     if (
//       newCurrencyData.flagImage &&
//       !newCurrencyData.flagImage.startsWith("/") &&
//       !newCurrencyData.flagImage.startsWith("http")
//     ) {
//       toast.error(
//         "Flag Image Path must be a relative path starting with '/' or a full URL."
//       );
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       closeCreateModal();
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to create currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to update currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while updating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to delete currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while deleting the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   return isLoading ? (
//     <LoadingSkeleton />
//   ) : (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         <div className="Activity">
//           <div className="flex items-center gap-3">
//             <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//               <FaCoins className="size-6 text-mainheading dark:text-primary" />
//             </div>

//             <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//               Currency Management
//             </h1>
//           </div>

//           <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//             Easily manage all supported currencies, customize rates, and
//             maintain real-time control over your exchange offerings.
//           </p>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//         <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//           <div>
//             <button
//               onClick={openCreateModal}
//               className="bg-primary text-neutral-900 flex items-center justify-center gap-1  hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
//             >
//               <IoMdAdd
//                 size={28}
//                 title={isMobile ? "Add Currency" : undefined}
//               />
//               {!isMobile && <span>Add Currency</span>}
//             </button>
//           </div>

//           <div className="relative sm:w-auto w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="size-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currencies..."
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 aria-label="Clear search"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 size={60} className="text-neutral-900 animate-spin" />
//           </div>
//         ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <MdCurrencyRupee className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               No currencies found
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Currently, there are no currencies available with related
//               descriptions at this time.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCurrencies.map((currency) => (
//               <div
//                 key={currency._id}
//                 className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//               >
//                 <div className="lg:p-5 p-4 flex-grow">
//                   <div className="flex items-center gap-4 mb-4">
//                     {currency.flagImage ? (
//                       <Image
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         width={56}
//                         height={56}
//                         className="object-contain rounded-full"
//                         unoptimized={currency.flagImage.startsWith("http")}
//                       />
//                     ) : (
//                       <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                         No flag
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           name="code"
//                           value={editingFields.code}
//                           onChange={handleEditingInputChange}
//                           className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-3 space-y-2 rounded-lg border">
//                     <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                       Our Rates
//                     </label>
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="number"
//                         name="rateAdjustmentPercentage"
//                         value={editingFields.rateAdjustmentPercentage}
//                         onChange={handleEditingInputChange}
//                         placeholder="e.g., 0.5 or +0.1"
//                         step="any"
//                         className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
//                       />
//                     ) : (
//                       <p
//                         className={`text-lg font-bold ${
//                           currency.rateAdjustmentPercentage != null
//                             ? "text-neutral-900 font-medium dark:text-white"
//                             : "text-gray-400 italic dark:text-gray-500"
//                         }`}
//                       >
//                         {currency.rateAdjustmentPercentage != null
//                           ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                               undefined,
//                               {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               }
//                             )}%`
//                           : "Not Set"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 dark:text-gray-300 mt-1">
//                       Our Rates vs market rate.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="border-t p-4">
//                   {editingCurrencyId === currency._id ? (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleUpdateCurrency}
//                         disabled={isSubmitting}
//                         className="flex-1 flex cursor-pointer justify-center gap-1.5 items-center border text-gray-500 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="h-5 w-5 text-gray-500 dark:text-gray-300 animate-spin"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M12 2V6"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M12 18V22"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M4.93 4.93L7.76 7.76"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M16.24 16.24L19.07 19.07"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M2 12H6"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M18 12H22"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M4.93 19.07L7.76 16.24"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M16.24 7.76L19.07 4.93"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </>
//                         ) : (
//                           <Save size={20} />
//                         )}
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <IoMdCloseCircle size={20} /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap flex-row gap-2">
//                       <Link
//                         href={`/admin/currencies/${currency._id}`}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Info size={20} /> Details
//                       </Link>
//                       <button
//                         onClick={() => startEditing(currency)}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Edit size={20} /> Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrencyToDeleteId(currency._id);
//                           setIsDeleteConfirmationOpen(true);
//                         }}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Trash2 size={20} /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Currency Modal */}
//         <AnimatePresence>
//           {isCreateModalOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeCreateModal}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-none w-full sm:max-w-xl relative flex flex-col overflow-hidden sm:h-auto h-screen"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 {/* Header */}
//                 <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
//                   <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                     Add New Currency
//                   </h2>

//                   <div
//                     onClick={closeCreateModal}
//                     className="size-12 bg-lightgray hover:bg-lightborder cursor-pointer dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" || e.key === " ")
//                         closeCreateModal();
//                     }}
//                     aria-label="Close modal"
//                   >
//                     <button
//                       className="text-neutral-900 dark:text-primary cursor-pointer focus:outline-none"
//                       aria-label="Close"
//                     >
//                       <IoClose size={28}/>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Scrollable Content Area */}
//                 <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6 space-y-5">
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Code <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="mt-1 block px-4 py-3 bg-white dark:bg-background focus:border-[#5f5f5f] h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Currency Name <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="mt-1 block px-4 py-3 bg-white focus:border-[#5f5f5f] font-medium dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                     >
//                       Flag Image Path <span className="text-red-600">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="create-flagImage"
//                         name="flagImage"
//                         value={newCurrencyData.flagImage}
//                         onChange={handleCreateInputChange}
//                         placeholder="/assets/icon/flags/usd.png"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
//                       />
//                       {newCurrencyData.flagImage && !createFlagImageError && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 size-8 pointer-events-none">
//                           <Image
//                             src={newCurrencyData.flagImage}
//                             alt={`${
//                               newCurrencyData.code || "New Currency"
//                             } flag`}
//                             fill
//                             style={{ objectFit: "contain" }}
//                             onError={() => setCreateFlagImageError(true)}
//                             unoptimized={newCurrencyData.flagImage.startsWith(
//                               "http"
//                             )}
//                           />
//                         </div>
//                       )}
//                       {createFlagImageError && newCurrencyData.flagImage && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-medium text-xs">
//                           Load Error
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Relative path (e.g., /assets/icon/flags/eur.png) or full
//                       URL. Must be accessible.
//                     </p>
//                     {createFlagImageError && (
//                       <p className="mt-2 text-xs font-medium text-red-600">
//                         Could not load the flag image. Check the path/URL.
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-gray-500 dark:text-gray-300 capitalize text-sm lg:text-base flex items-center gap-2"
//                     >
//                       Rate Adjustment
//                       <span className="text-red-600">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number"
//                         id="create-rateAdjustmentPercentage"
//                         name="rateAdjustmentPercentage"
//                         value={newCurrencyData.rateAdjustmentPercentage}
//                         onChange={handleCreateInputChange}
//                         step="any"
//                         placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                         className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
//                       />
//                       <div className="absolute top-4 right-4">
//                         <Percent
//                           size={20}
//                           className="dark:text-white text-neutral-900"
//                         />
//                       </div>
//                     </div>
//                     <p className="mt-2 text-sm text-gray-500 font-medium  dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 sm:p-6 border-t  bg-white dark:bg-background flex-shrink-0">
//                   <div className="flex sm:flex-row flex-col justify-end gap-3">
//                     <button
//                       onClick={closeCreateModal}
//                       className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleCreateCurrency}
//                       disabled={
//                         isSubmitting ||
//                         !newCurrencyData.code ||
//                         !newCurrencyData.currencyName
//                       }
//                       className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <svg
//                             className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M12 2V6"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M12 18V22"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M4.93 4.93L7.76 7.76"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M16.24 16.24L19.07 19.07"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M2 12H6"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M18 12H22"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M4.93 19.07L7.76 16.24"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M16.24 7.76L19.07 4.93"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </>
//                       ) : null}
//                       {isSubmitting ? "Adding..." : "Add Currency"}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {isDeleteConfirmationOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsDeleteConfirmationOpen(false)}
//             >
//               <motion.div
//                 className="bg-white dark:bg-background sm:rounded-3xl rounded-none sm:p-8 p-4 w-full sm:max-w-xl relative"
//                 onClick={(e) => e.stopPropagation()}
//                 variants={modalVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>

//                 <div className="flex justify-center mb-5">
//                   <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
//                     <CheckCircle className="size-10 text-red-600 dark:text-red-400" />
//                   </div>
//                 </div>

//                 <div className="text-center">
//                   <h3 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white my-5">
//                     Delete Currency Confirmation ?
//                   </h3>

//                   <p className="text-gray-500 dark:text-gray-300 font-medium">
//                     Confirmation modal to delete a selected currency, warning
//                     the admin that this action is irreversible.
//                   </p>
//                 </div>

//                 <div className="flex flex-row gap-3 mt-5">
//                   <button
//                     onClick={handleDeleteCurrency}
//                     disabled={isSubmitting}
//                     type="button"
//                     className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
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
//                       </>
//                     ) : null}
//                     {isSubmitting ? "Deleting..." : "Delete"}
//                   </button>

//                   <button
//                     onClick={() => setIsDeleteConfirmationOpen(false)}
//                     type="button"
//                     disabled={isSubmitting}
//                     className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox w-full dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// // frontend/src/app/admin/currencies/page.tsx
// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   // Percent, // Moved to AddCurrencyModal
// } from "lucide-react";
// // import { IoClose } from "react-icons/io5"; // Moved to modal components
// import { FiSearch } from "react-icons/fi";
// import { MdCancel, MdCurrencyRupee } from "react-icons/md";
// import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence and motion usage moved to modal components
// import { Skeleton } from "@/components/ui/skeleton";
// import { FaCoins } from "react-icons/fa";

// // Import the new modal components
// import AddCurrencyModal from "../components/AddCurrencyModal";
// import DeleteCurrencyModal from "../components/DeleteCurrencyModal";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number;
// }

// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string;
// }

// interface ApiErrorResponse {
//   message: string;
// }

// const LoadingSkeleton = () => (
//   <div className="container mx-auto px-4 py-5 bg-white dark:bg-background">
//     <div className="space-y-6">
//       <div className="pb-6 mb-6 border-b">
//         <div className="flex gap-3 items-center">
//           <Skeleton className="size-12 rounded-full mb-3" />
//           <Skeleton className="h-9 w-3/5 sm:w-1/5 rounded mb-3" />
//         </div>
//         <div className="space-y-1.5">
//           <Skeleton className="h-4 w-full sm:w-3/4 rounded" />
//           <Skeleton className="h-4 w-full sm:w-1/2 rounded sm:hidden block" />
//           <Skeleton className="h-4 w-40 sm:w-1/2 rounded sm:hidden block" />
//         </div>
//       </div>

//       <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//         <Skeleton className="size-12.5 sm:w-50 rounded-full" />
//         <Skeleton className="h-12.5 flex-1 sm:flex-none sm:w-70 rounded-full" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {Array.from({ length: 8 }).map((_, index) => (
//           <div
//             key={index}
//             className="rounded-xl overflow-hidden border flex flex-col"
//           >
//             <div className="lg:p-5 p-4 flex-grow">
//               <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                 <div className="flex-1 space-y-1.5">
//                   <Skeleton className="h-7 w-1/3 rounded" />
//                   <Skeleton className="h-5 w-2/3 rounded" />
//                 </div>
//               </div>

//               <div className="p-3 space-y-2 rounded-lg border">
//                 <Skeleton className="h-6 w-1/4 rounded mb-1" />
//                 <Skeleton className="h-7 w-1/2 rounded" />
//                 <Skeleton className="h-6 w-full rounded mt-1" />
//               </div>
//             </div>

//             <div className="border-t p-4">
//               <div className="flex w-full gap-2">
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//                 <Skeleton className="h-10 lg:h-12.5 flex-1 rounded-full" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   const [createFlagImageError, setCreateFlagImageError] =
//     useState<boolean>(false);

//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   useEffect(() => {
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     if (isCreateModalOpen || isDeleteConfirmationOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = originalStyle;
//     }
//     return () => {
//       document.body.style.overflow = originalStyle;
//     };
//   }, [isCreateModalOpen, isDeleteConfirmationOpen]);

//   const fetchCurrenciesList = useCallback(async () => {
//     if (!token) {
//       router.push("/auth/login");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (error: unknown) {
//       console.error("Error fetching currencies:", error);
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         if (error.response?.status === 403 || error.response?.status === 401) {
//           router.push("/auth/login");
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to load currencies"
//           );
//         }
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("An unexpected error occurred while fetching currencies.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, router]);

//   useEffect(() => {
//     if (token) {
//       fetchCurrenciesList();
//     }
//   }, [fetchCurrenciesList, token]);

//   const openCreateModal = () => {
//     setNewCurrencyData({
//       code: "",
//       currencyName: "",
//       flagImage: "",
//       rateAdjustmentPercentage: "",
//     });
//     setCreateFlagImageError(false);
//     setIsCreateModalOpen(true);
//   };

//   const closeCreateModal = () => {
//     setIsCreateModalOpen(false);
//     setCreateFlagImageError(false);
//   };

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//     if (name === "flagImage") {
//       setCreateFlagImageError(false);
//     }
//   };

//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }
//     if (
//       newCurrencyData.flagImage &&
//       !newCurrencyData.flagImage.startsWith("/") &&
//       !newCurrencyData.flagImage.startsWith("http")
//     ) {
//       toast.error(
//         "Flag Image Path must be a relative path starting with '/' or a full URL."
//       );
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       closeCreateModal();
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to create currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0",
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to update currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while updating the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (error: unknown) {
//       if (axios.isAxiosError<ApiErrorResponse>(error)) {
//         toast.error(
//           error.response?.data?.message || "Failed to delete currency"
//         );
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while deleting the currency."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   return isLoading ? (
//     <LoadingSkeleton />
//   ) : (
//     <div className="container mx-auto px-4 py-5 relative">
//       <div className="space-y-6">
//         <div className="Activity pb-6 mb-6 border-b">
//           <div className="flex flex-wrap items-center gap-3">
//             <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//               <FaCoins className="size-6 text-mainheading dark:text-primary" />
//             </div>

//             <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//               Currency Management
//             </h1>
//           </div>

//           <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//             Easily manage all supported currencies, customize rates, and
//             maintain real-time control over your exchange offerings.
//           </p>
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//         <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
//           {/* Add Currency */}
//           <div>
//             <button
//               onClick={openCreateModal}
//               className="bg-primary text-neutral-900 flex items-center justify-center gap-1  hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
//             >
//               <IoMdAdd
//                 size={28}
//                 title={isMobile ? "Add Currency" : undefined}
//               />
//               {!isMobile && <span>Add Currency</span>}
//             </button>
//           </div>

//           <div className="relative sm:w-auto w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch
//                 className="size-5 text-neutral-900 dark:text-white"
//                 aria-hidden="true"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Search currencies..."
//               className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-all ease-linear duration-75 focus:outline-0 focus:border-[#5f5f5f] placeholder:text-neutral-900 dark:placeholder:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 type="button"
//                 onClick={clearSearchTerm}
//                 className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//                 aria-label="Clear search"
//               >
//                 <MdCancel size={24} aria-hidden="true" />
//               </button>
//             )}
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 size={60} className="text-neutral-900 animate-spin" />
//           </div>
//         ) : filteredCurrencies.length === 0 ? (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <MdCurrencyRupee className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               No currencies found
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Currently, there are no currencies available with related
//               descriptions at this time.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCurrencies.map((currency) => (
//               <div
//                 key={currency._id}
//                 className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//               >
//                 <div className="lg:p-5 p-4 flex-grow">
//                   <div className="flex items-center gap-4 mb-4">
//                     {currency.flagImage ? (
//                       <Image
//                         src={currency.flagImage}
//                         alt={`${currency.currencyName} Flag`}
//                         width={56}
//                         height={56}
//                         className="object-contain rounded-full"
//                         unoptimized={currency.flagImage.startsWith("http")}
//                       />
//                     ) : (
//                       <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                         No flag
//                       </div>
//                     )}
//                     {/* currency code input */}
//                     <div className="flex-1">
//                       {editingCurrencyId === currency._id ? (
//                         <input
//                           type="text"
//                           name="code"
//                           value={editingFields.code}
//                           onChange={handleEditingInputChange}
//                           className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                           autoFocus
//                           maxLength={3}
//                         />
//                       ) : (
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {currency.code}
//                         </h3>
//                       )}
//                       <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
//                         {currency.currencyName}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Our rate input */}
//                   <div className="p-3 space-y-2 rounded-lg border">
//                     <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                       Our Rates
//                     </label>
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="number"
//                         name="rateAdjustmentPercentage"
//                         value={editingFields.rateAdjustmentPercentage}
//                         onChange={handleEditingInputChange}
//                         placeholder="e.g., 0.5 or +0.1"
//                         step="any"
//                         className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
//                       />
//                     ) : (
//                       <p
//                         className={`text-lg font-bold ${
//                           currency.rateAdjustmentPercentage != null
//                             ? "text-neutral-900 font-medium dark:text-white"
//                             : "text-gray-400 italic dark:text-gray-500"
//                         }`}
//                       >
//                         {currency.rateAdjustmentPercentage != null
//                           ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                               undefined,
//                               {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               }
//                             )}%`
//                           : "Not Set"}
//                       </p>
//                     )}
//                     <p className="text-gray-500 dark:text-gray-300 mt-1">
//                       Our Rates vs market rate.
//                     </p>
//                   </div>
//                 </div>

//                 <div className=" border-t p-4">
//                   {editingCurrencyId === currency._id ? (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleUpdateCurrency}
//                         disabled={isSubmitting}
//                         className="flex-1 flex cursor-pointer justify-center gap-1.5 items-center border text-gray-500 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="h-5 w-5 text-gray-500 dark:text-gray-300 animate-spin"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M12 2V6"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M12 18V22"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M4.93 4.93L7.76 7.76"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M16.24 16.24L19.07 19.07"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M2 12H6"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M18 12H22"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M4.93 19.07L7.76 16.24"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <path
//                                 d="M16.24 7.76L19.07 4.93"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </>
//                         ) : (
//                           <Save size={20} />
//                         )}
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <IoMdCloseCircle size={20} /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap flex-row gap-2">
//                       <Link
//                         href={`/admin/currencies/${currency._id}`}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Info size={20} /> Details
//                       </Link>
//                       <button
//                         onClick={() => startEditing(currency)}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Edit size={20} /> Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setCurrencyToDeleteId(currency._id);
//                           setIsDeleteConfirmationOpen(true);
//                         }}
//                         className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                       >
//                         <Trash2 size={20} /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Currency Modal Component */}
//         <AddCurrencyModal
//           isOpen={isCreateModalOpen}
//           onClose={closeCreateModal}
//           onSubmit={handleCreateCurrency}
//           isSubmitting={isSubmitting}
//           newCurrencyData={newCurrencyData}
//           onInputChange={handleCreateInputChange}
//           createFlagImageError={createFlagImageError}
//           setCreateFlagImageError={setCreateFlagImageError}
//           isMobile={isMobile}
//         />

//         {/* Delete Confirmation Modal Component */}
//         <DeleteCurrencyModal
//           isOpen={isDeleteConfirmationOpen}
//           onClose={() => setIsDeleteConfirmationOpen(false)}
//           onConfirm={handleDeleteCurrency}
//           isSubmitting={isSubmitting}
//           isMobile={isMobile}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;

// frontend/src/app/admin/currencies/page.tsx
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiConfig from "../../config/apiConfig";
import Image from "next/image";
import { Loader2, Info, Edit, Trash2, Save } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { MdCancel, MdCurrencyRupee } from "react-icons/md";
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";

// --- Import Custom Toast and react-toastify components ---
import {
  ToastContainer,
  toast as reactToastifyToast, // Alias to avoid conflict
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions, // Make sure ToastOptions is imported
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import base react-toastify styles
// **IMPORTANT**: Adjust this path if your CustomToast component is elsewhere
import CustomToast, { CustomToastProps } from "../../components/CustomToast";
// Example: if CustomToast.tsx is in frontend/src/app/components/CustomToast.tsx
// import CustomToast, { CustomToastProps } from "../../components/CustomToast";

import { Skeleton } from "@/components/ui/skeleton";
import { FaCoins } from "react-icons/fa";

// Import the modal components (ensure paths are correct)
import AddCurrencyModal from "../components/AddCurrencyModal";
import DeleteCurrencyModal from "../components/DeleteCurrencyModal";

axios.defaults.baseURL = apiConfig.baseUrl;

interface Currency {
  _id: string;
  code: string;
  currencyName: string;
  flagImage?: string;
  rateAdjustmentPercentage?: number;
}

interface NewCurrencyData {
  code: string;
  currencyName: string;
  flagImage: string;
  rateAdjustmentPercentage: string;
}

interface ApiErrorResponse {
  message: string;
}

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-5">
    <div className="space-y-6">
      <div className="pb-6 mb-6 border-b">
        <div className="flex gap-3 items-center">
          <Skeleton className="size-12 rounded-full mb-3" />
          <Skeleton className="h-9 w-3/5 sm:w-1/5 rounded mb-3" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full sm:w-1/2 rounded" />
          <Skeleton className="h-4 w-full sm:w-1/2 rounded sm:hidden block" />
          <Skeleton className="h-4 w-40 sm:w-1/2 rounded sm:hidden block" />
        </div>
      </div>

      <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
        <Skeleton className="size-12.5 sm:w-50 rounded-full" />
        <Skeleton className="h-12.5 flex-1 sm:flex-none sm:w-70 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden border flex flex-col"
          >
            <div className="lg:p-5 p-4 flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="size-14 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-7 w-1/3 rounded" />
                  <Skeleton className="h-5 w-2/3 rounded" />
                </div>
              </div>
              <div className="p-3 space-y-2 rounded-lg border">
                <Skeleton className="h-6 w-1/4 rounded mb-1" />
                <Skeleton className="h-7 w-1/2 rounded" />
                <Skeleton className="h-6 w-full rounded mt-1" />
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex w-full gap-2">
                <Skeleton className="h-12.5 flex-1 rounded-full" />
                <Skeleton className="h-12.5 flex-1 rounded-full" />
                <Skeleton className="h-12.5 flex-1 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdminCurrenciesPage: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
    code: "",
    currencyName: "",
    flagImage: "",
    rateAdjustmentPercentage: "",
  });
  const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
    null
  );
  const [editingFields, setEditingFields] = useState<{
    code: string;
    rateAdjustmentPercentage: string;
  }>({ code: "", rateAdjustmentPercentage: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { token } = useAuth();
  const router = useRouter();
  const [createFlagImageError, setCreateFlagImageError] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false); // For ToastContainer

  // --- Mobile Detection Effect (for ToastContainer & Modals) ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // --- Custom Toast Invocation ---
  const showToast = useCallback(
    (
      message: string,
      type?: CustomToastProps["type"],
      toastSpecificOptions?: Partial<ToastOptions> // This allows passing options like autoClose, onClose
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
      // Pass the options to react-toastify
      reactToastifyToast(
        <CustomToast message={message} type={effectiveType} />,
        {
          progressClassName,
          type: effectiveType as TypeOptions,
          icon: false,
          ...toastSpecificOptions, // Spread the specific options here
        }
      );
    },
    []
  );

  // --- ToastContainer Props and Style ---
  const customToastContainerProps: ToastContainerProps = {
    position: "top-right",
    autoClose: 3000, // Default autoClose for all toasts from this container
    hideProgressBar: false,
    newestOnTop: true, // Changed to true for typical toast behavior
    closeOnClick: false, // Important: To allow onClose callbacks to execute before toast disappears on click
    closeButton: false, // CustomToast can handle its own or rely on autoClose/click
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
    const baseStyle = { zIndex: 99999 }; // Ensure toasts are on top
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

  const filteredCurrencies = useMemo(() => {
    if (!searchTerm) return currencies;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(lowerSearchTerm) ||
        currency.currencyName.toLowerCase().includes(lowerSearchTerm)
    );
  }, [currencies, searchTerm]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isCreateModalOpen || isDeleteConfirmationOpen)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = originalStyle;
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isCreateModalOpen, isDeleteConfirmationOpen]);

  const fetchCurrenciesList = useCallback(async () => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get<Currency[]>("/admin/currencies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrencies(response.data);
    } catch (error: unknown) {
      console.error("Error fetching currencies:", error);
      let errorMsg = "An unexpected error occurred while fetching currencies.";
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          showToast(
            "Session expired or unauthorized. Redirecting to login...",
            "error",
            { onClose: () => router.push("/auth/login") }
          );
          return;
        }
        errorMsg = error.response?.data?.message || "Failed to load currencies";
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      showToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  }, [token, router, showToast]);

  useEffect(() => {
    if (token) fetchCurrenciesList();
  }, [fetchCurrenciesList, token]);

  const openCreateModal = () => {
    setNewCurrencyData({
      code: "",
      currencyName: "",
      flagImage: "",
      rateAdjustmentPercentage: "",
    });
    setCreateFlagImageError(false);
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateFlagImageError(false);
  };

  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCurrencyData((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
    if (name === "flagImage") setCreateFlagImageError(false);
  };

  const handleCreateCurrency = async () => {
    if (!newCurrencyData.code || !newCurrencyData.currencyName) {
      showToast("Currency code and name are required.", "error");
      return;
    }
    if (newCurrencyData.code.length !== 3) {
      showToast("Currency code must be 3 letters.", "error");
      return;
    }
    if (
      newCurrencyData.flagImage &&
      !newCurrencyData.flagImage.startsWith("/") &&
      !newCurrencyData.flagImage.startsWith("http")
    ) {
      showToast(
        "Flag Image Path must be a relative path starting with '/' or a full URL.",
        "error"
      );
      return;
    }
    let adjustmentValue: number = 0;
    if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
      adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
      if (isNaN(adjustmentValue)) {
        showToast(
          "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1).",
          "error"
        );
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...newCurrencyData,
        flagImage: newCurrencyData.flagImage.trim() || null,
        rateAdjustmentPercentage: adjustmentValue,
      };
      await axios.post("/admin/currencies", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeCreateModal();
      await fetchCurrenciesList(); // Refetch after successful creation
      showToast("Currency added successfully!", "success");
    } catch (error: unknown) {
      let errorMsg =
        "An unexpected error occurred while creating the currency.";
      if (axios.isAxiosError<ApiErrorResponse>(error))
        errorMsg = error.response?.data?.message || "Failed to create currency";
      else if (error instanceof Error) errorMsg = error.message;
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (currency: Currency) => {
    setEditingCurrencyId(currency._id);
    setEditingFields({
      code: currency.code,
      rateAdjustmentPercentage:
        currency.rateAdjustmentPercentage?.toString() ?? "0",
    });
  };
  const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingFields((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const handleUpdateCurrency = async () => {
    if (!editingCurrencyId) return;
    if (!editingFields.code || editingFields.code.length !== 3) {
      showToast("Currency code must be 3 letters.", "error");
      return;
    }
    let adjustmentValue: number = 0;
    if (editingFields.rateAdjustmentPercentage.trim() !== "") {
      adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
      if (isNaN(adjustmentValue)) {
        showToast("Rate Adjustment must be a valid number.", "error");
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const payload = {
        code: editingFields.code,
        rateAdjustmentPercentage: adjustmentValue,
      };
      await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingCurrencyId(null);
      setEditingFields({ code: "", rateAdjustmentPercentage: "" });
      await fetchCurrenciesList(); // Refetch after successful update
      showToast("Currency updated successfully!", "success");
    } catch (error: unknown) {
      let errorMsg =
        "An unexpected error occurred while updating the currency.";
      if (axios.isAxiosError<ApiErrorResponse>(error))
        errorMsg = error.response?.data?.message || "Failed to update currency";
      else if (error instanceof Error) errorMsg = error.message;
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEditing = () => {
    setEditingCurrencyId(null);
    setEditingFields({ code: "", rateAdjustmentPercentage: "" });
  };

  const handleDeleteCurrency = async () => {
    if (!currencyToDeleteId) return;
    setIsSubmitting(true);
    try {
      await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleteConfirmationOpen(false);
      setCurrencyToDeleteId(null);
      await fetchCurrenciesList(); // Refetch after successful deletion
      showToast("Currency deleted successfully!", "success");
    } catch (error: unknown) {
      let errorMsg =
        "An unexpected error occurred while deleting the currency.";
      if (axios.isAxiosError<ApiErrorResponse>(error))
        errorMsg = error.response?.data?.message || "Failed to delete currency";
      else if (error instanceof Error) errorMsg = error.message;
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSearchTerm = () => setSearchTerm("");

  // Conditional rendering for loading state
  if (isLoading && currencies.length === 0) {
    // Show skeleton only on initial load
    return (
      <div className="relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-5 relative">
      <ToastContainer
        {...customToastContainerProps}
        style={getToastContainerStyle()}
      />

      <div className="space-y-6">
        <div className="Activity pb-6 mb-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 shrink-0 bg-primary rounded-full flex items-center justify-center">
              <FaCoins className="text-mainheading" size={26} />
            </div>

            <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
              Currency Management
            </h1>
          </div>

          <p className="mt-2 text-subheadingWhite text-base lg:text-lg">
            Take full control of your currency exchange operations with our
            intuitive Currency Management system. Effortlessly handle all
            supported currencies, update and customize exchange rates to suit
            your business needs, and ensure accuracy with real-time rate
            adjustments.
          </p>
        </div>

        <div className="flex sm:justify-between flex-row w-full items-center mb-6 gap-4">
          <div>
            <button
              onClick={openCreateModal}
              className="bg-primary text-mainheading  flex items-center justify-center gap-1 hover:bg-primaryhover text-nowrap font-medium rounded-full text-center sm:px-8 sm:py-3 h-12.5 sm:w-auto w-12.5 cursor-pointer transition-all duration-75 ease-linear"
            >
              <IoMdAdd
                size={28}
                title={isMobile ? "Add Currency" : undefined}
              />
              {!isMobile && <span>Add Currency</span>}
            </button>
          </div>

          <div className="relative sm:w-auto w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiSearch
                className="size-5  text-mainheadingWhite"
                aria-hidden="true"
              />
            </div>

            <input
              type="text"
              placeholder="Search currencies..."
              className="w-full sm:w-80 rounded-full h-12.5 py-3 pl-12 pr-3  focus:outline-0 transition-all duration-75 ease-in-out placeholder:text-gray-400 border border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white bg-primarybox/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearchTerm}
                className="absolute inset-y-0 right-3 flex items-center text-primary dark:text-primary focus:outline-none cursor-pointer"
                aria-label="Clear search"
              >
                <MdCancel size={24} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* loding chalu karavanu che */}
        {isLoading &&
          currencies.length > 0 && ( // Show loader overlay if loading but already have some data
            <div className="fixed gap-2 inset-0 bg-black/50 backdrop-blur-[1px] capitalize h-screen flex items-center justify-center z-50">
              <Loader2 size={48} className="text-primary animate-spin" />
              <p className="text-mainheadingWhite font-medium">
                Loading currency data...
              </p>
            </div>
          )}

        {!isLoading && filteredCurrencies.length === 0 ? (
          <div className="bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
            <div className="lg:size-12 size-10 flex items-center justify-center bg-primary rounded-full mb-2">
              <MdCurrencyRupee className="lg:size-6 size-4 mx-auto text-mainheading" />
            </div>

            <h2 className="lg:text-3xl text-2xl font-medium text-mainheadingWhite mt-1">
              No currencies found
            </h2>

            <p className="text-subheadingWhite max-w-lg mx-auto">
              Currently, there are no currencies available that match your
              search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCurrencies.map((currency) => (
              <div
                key={currency._id}
                className="rounded-xl overflow-hidden transition-all duration-300 flex flex-col border"
              >
                <div className="lg:p-5 p-4 flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    {currency.flagImage ? (
                      <Image
                        src={currency.flagImage}
                        alt={`${currency.currencyName} Flag`}
                        width={56}
                        height={56}
                        className="object-contain rounded-full"
                        unoptimized={currency.flagImage.startsWith("http")}
                      />
                    ) : (
                      <div className="size-14 bg-secondarybox rounded-full flex items-center justify-center text-xs text-mainheadingWhite">
                        No flag
                      </div>
                    )}

                    <div className="flex-1">
                      {editingCurrencyId === currency._id ? (
                        <input
                          type="text"
                          name="code"
                          value={editingFields.code}
                          onChange={handleEditingInputChange}
                          className="text-lg font-bold text-mainheadingWhite border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
                          autoFocus
                          maxLength={3}
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-mainheadingWhite">
                          {currency.code}
                        </h3>
                      )}
                      <p className="text-sm text-subheadingWhite mt-0.5">
                        {currency.currencyName}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 space-y-2 rounded-lg border">
                    <label className="font-medium text-subheadingWhite mb-1 flex items-center gap-1">
                      Our Rates
                    </label>

                    {editingCurrencyId === currency._id ? (
                      <input
                        type="number"
                        name="rateAdjustmentPercentage"
                        value={editingFields.rateAdjustmentPercentage}
                        onChange={handleEditingInputChange}
                        placeholder="e.g., 0.5 or +0.1"
                        step="any"
                        className="text-base font-semibold text-mainheadingWhite border-b border-primary focus:outline-none bg-transparent w-full py-0.5 no-spinner"
                      />
                    ) : (
                      <p
                        className={`text-lg font-bold ${
                          currency.rateAdjustmentPercentage != null
                            ? "text-mainheadingWhite"
                            : "italic text-mainheadingWhite"
                        }`}
                      >
                        {currency.rateAdjustmentPercentage != null
                          ? `${currency.rateAdjustmentPercentage.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }
                            )}%`
                          : "Not Set"}
                      </p>
                    )}
                    <p className="text-subheadingWhite mt-1">
                      Our Rates vs market rate.
                    </p>
                  </div>
                </div>

                <div className="border-t p-4">
                  {editingCurrencyId === currency._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateCurrency}
                        disabled={isSubmitting}
                        className="flex-1 flex cursor-pointer justify-center gap-1.5 items-center border  text-mainheadingWhite font-medium lg:px-6 px-4 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear focus:outline-none"
                      >
                        {isSubmitting ? (
                          <svg
                            className="h-5 w-5 text-white animate-spin"
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
                        ) : (
                          <Save size={20} />
                        )}{" "}
                        Save
                      </button>

                      <button
                        onClick={cancelEditing}
                        className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear focus:outline-none"
                      >
                        <IoMdCloseCircle size={20} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap flex-row gap-3">
                      <Link
                        href={`/admin/currencies/${currency._id}`}
                        className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-mainheadingWhite font-medium lg:px-6 px-4 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear focus:outline-none"
                      >
                        <Info size={20} /> Details
                      </Link>

                      <button
                        onClick={() => startEditing(currency)}
                        className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-mainheadingWhite font-medium lg:px-6 px-4 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear focus:outline-none"
                      >
                        <Edit size={20} /> Edit
                      </button>

                      <button
                        onClick={() => {
                          setCurrencyToDeleteId(currency._id);
                          setIsDeleteConfirmationOpen(true);
                        }}
                        className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear focus:outline-none"
                      >
                        <Trash2 size={20} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <AddCurrencyModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSubmit={handleCreateCurrency}
          isSubmitting={isSubmitting}
          newCurrencyData={newCurrencyData}
          onInputChange={handleCreateInputChange}
          createFlagImageError={createFlagImageError}
          setCreateFlagImageError={setCreateFlagImageError}
          isMobile={isMobile}
        />

        <DeleteCurrencyModal
          isOpen={isDeleteConfirmationOpen}
          onClose={() => setIsDeleteConfirmationOpen(false)}
          onConfirm={handleDeleteCurrency}
          isSubmitting={isSubmitting}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default AdminCurrenciesPage;
