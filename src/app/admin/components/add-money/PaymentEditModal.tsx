// // components/admin/payments/PaymentEditModal.tsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Copy, X } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';
// import { useCopyToClipboard } from './useCopyToClipboard';

// interface PaymentEditModalProps {
//     isEditModalOpen: boolean;
//     setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     selectedPaymentForEdit: any; // Replace 'any' with a more specific type if possible
//     editFormData: { status: string };
//     setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//     editLoading: boolean;
//     handleSaveEdit: () => Promise<void>;
//     statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//     isEditModalOpen,
//     setIsEditModalOpen,
//     selectedPaymentForEdit,
//     editFormData,
//     setEditFormData,
//     editLoading,
//     handleSaveEdit,
//     statusOptions,
// }) => {
//     const editModalRef = useRef(null);
//     const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//     const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
//                 setIsEditModalOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isEditModalOpen, setIsEditModalOpen]);

//     const handleStatusDropdownChange = (status: string) => {
//         setEditFormData({ ...editFormData, status: status });
//     };

//     if (!selectedPaymentForEdit) return null; // Or handle this case appropriately

//     return (
//         <AnimatePresence>
//             {isEditModalOpen && selectedPaymentForEdit && (
//                 <motion.div
//                     ref={editModalRef}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
//                 >
//                     <motion.div
//                         initial={{ y: -30, opacity: 0, scale: 0.95 }}
//                         animate={{ y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}
//                         exit={{ y: -30, opacity: 0, scale: 0.95 }}
//                         className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
//                     >
//                         <div className="mb-6">
//                             <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
//                         </div>

//                         <div className="space-y-4">
//                             <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
//                                 <div>
//                                     <label htmlFor="paymentId" className="block font-semibold text-main mb-1">Payment ID : </label>
//                                     <span className="font-medium text-gray-700">{selectedPaymentForEdit._id}</span>
//                                 </div>
//                                 <button
//                                     onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                                     className="p-2 rounded hover:bg-gray-100 focus:outline-none"
//                                     aria-label="Copy Payment ID"
//                                 >
//                                     <Copy className="size-4 text-gray-500" />
//                                 </button>
//                             </div>
//                             {isPaymentIdCopied && <p className="text-sm text-green-500 mt-1">Payment ID copied!</p>}

//                             <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
//                                 <div>
//                                     <label htmlFor="referenceCode" className="block font-semibold text-main mb-1">Reference Code</label>
//                                     <span className="font-medium text-gray-700">{selectedPaymentForEdit.referenceCode || 'N/A'}</span>
//                                 </div>
//                                 <button
//                                     onClick={() => copyReferenceCode(selectedPaymentForEdit.referenceCode || '')}
//                                     className="p-2 rounded hover:bg-gray-100 focus:outline-none"
//                                     aria-label="Copy Reference Code"
//                                 >
//                                     <Copy className="size-4 text-gray-500" />
//                                 </button>
//                             </div>
//                             {isReferenceCodeCopied && <p className="text-sm text-green-500 mt-1">Reference Code copied!</p>}

//                             <div className='bg-green/10 p-3 rounded-md'>
//                                 <label htmlFor="amountToAdd" className="block font-semibold text-main mb-1">Amount</label>
//                                 <span className="font-medium text-gray-700">{selectedPaymentForEdit.amountToAdd}</span>
//                             </div>
//                             <div className='bg-green/10 p-3 rounded-md flex items-center'>
//                                 <label htmlFor="currency" className="block font-semibold text-main mb-1 mr-2">Currency</label>
//                                 <span className="font-medium text-gray-700">{selectedPaymentForEdit.payInCurrency?.code || 'N/A'}</span>
//                             </div>
//                             <div>
//                                 <CustomDropdown
//                                     label="Status"
//                                     value={editFormData.status || null}
//                                     onChange={handleStatusDropdownChange}
//                                     options={statusOptions.filter(opt => opt !== 'all')}
//                                 />
//                             </div>
//                         </div>

//                         <div className="mt-6 flex justify-end space-x-2">
//                             <button
//                                 onClick={() => setIsEditModalOpen(false)}
//                                 className="px-4 w-full py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-md focus:outline-none"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSaveEdit}
//                                 disabled={editLoading}
//                                 className={`px-4 py-3 w-full cursor-pointer bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
//                             >
//                                 {editLoading ? 'Saving...' : 'Save'}
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default PaymentEditModal;

// // components/admin/payments/PaymentEditModal.tsx
// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Copy, X, CreditCard, Hash, DollarSign, Globe } from 'lucide-react';
// import CustomDropdown from './CustomDropdown';
// import { useCopyToClipboard } from './useCopyToClipboard';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';

// interface Payment {
//   _id: string;
//   referenceCode?: string;
//   amountToAdd: number;
//   payInCurrency?: {
//     code: string;
//   };
//   status: string;
// }

// interface PaymentEditModalProps {
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedPaymentForEdit: Payment | null;
//   editFormData: { status: string };
//   setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//   editLoading: boolean;
//   handleSaveEdit: () => Promise<void>;
//   statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedPaymentForEdit,
//   editFormData,
//   setEditFormData,
//   editLoading,
//   handleSaveEdit,
//   statusOptions,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//   const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isEditModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node) &&
//         !(event.target as Element).closest('[id^="radix-ui-popper-"]')
//       ) {
//         setIsEditModalOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isEditModalOpen, setIsEditModalOpen]);

//   const handleStatusChange = (status: string) => {
//     setEditFormData(prev => ({ ...prev, status }));
//   };

//   if (!selectedPaymentForEdit) return null;

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && selectedPaymentForEdit && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center items-center px-4"
//         >
//           <motion.div
//             ref={modalRef}
//             initial={{ y: -30, opacity: 0, scale: 0.95 }}
//             animate={{
//               y: 0,
//               opacity: 1,
//               scale: 1,
//               transition: { type: "spring", stiffness: 100, damping: 15 },
//             }}
//             exit={{ y: -30, opacity: 0, scale: 0.95 }}
//             className="bg-white dark:bg-background rounded-2xl shadow-xl w-full max-w-lg "
//           >
//             {/* Header */}
//             <div className="p-6 rounded-t-2xl flex items-center justify-between border-b">
//               <h2 className="text-xl font-bold flex items-center text-neutral-900 dark:text-white">
//                 <CreditCard className="mr-2 size-6 text-primary" />
//                 Edit Payment Status
//               </h2>
//               <button
//                 onClick={() => setIsEditModalOpen(false)} >
//                 <X className="size-6 text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary transition-all duration-75 ease-linear cursor-pointer" />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-6 space-y-5">
//               {/* Payment ID Field */}
//               <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Payment ID
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit._id}
//                     </p>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                     className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder"
//                   >
//                     <Copy className="size-3.5 mr-1" />{" "}
//                     {isPaymentIdCopied ? "Copied!" : "Copy"}
//                   </Button>
//                 </  div>
//               </div>

//               {/* Reference Code Field */}
//               <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Reference Code
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit.referenceCode || "N/A"}
//                     </p>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       copyReferenceCode(
//                         selectedPaymentForEdit.referenceCode || ""
//                       )
//                     }
//                     disabled={!selectedPaymentForEdit.referenceCode}
//                     className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder"
//                   >
//                     <Copy className="size-3.5 mr-1" />{" "}
//                     {isReferenceCodeCopied ? "Copied!" : "Copy"}
//                   </Button>
//                 </div>
//               </div>

//               {/* Amount and Currency */}
//               <div className="flex gap-4">
//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border">
//                   <div className="flex items-center mb-1.5">
//                     <DollarSign className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Amount
//                     </span>
//                   </div>
//                   <p className="font-semibold text-lg text-gray-500 dark:text-gray-300">
//                     {selectedPaymentForEdit.amountToAdd}
//                   </p>
//                 </div>

//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border">
//                   <div className="flex items-center mb-1.5">
//                     <Globe className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Currency
//                     </span>
//                   </div>
//                   <Badge variant="outline" className="text-sm font-medium text-gray-500 dark:text-gray-300">
//                     {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
//                   </Badge>
//                 </div>
//               </div>

//               {/* Status Dropdown */}
//               <div className="pt-2">
//                 <CustomDropdown
//                   label="Payment Status"
//                   value={editFormData.status}
//                   onChange={handleStatusChange}
//                   options={statusOptions.filter((opt) => opt !== "all")}
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="border-t  p-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full sm:w-auto cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEdit}
//                 disabled={editLoading}
//                 className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full sm:w-auto cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 {editLoading ? "Saving..." : "Update Status"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentEditModal;

// // frontend/src/app/dashboard/components/PaymentEditModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from 'react'; // Import useState and useEffect
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose as X } from "react-icons/io5";
// import { Copy, CreditCard, DollarSign, Globe, Hash } from 'lucide-react';

// import CustomDropdown from './CustomDropdown';
// import { useCopyToClipboard } from './useCopyToClipboard';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';

// interface Payment {
//   _id: string;
//   referenceCode?: string;
//   amountToAdd: number;
//   payInCurrency?: {
//     code: string;
//   };
//   status: string;
// }

// interface PaymentEditModalProps {
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedPaymentForEdit: Payment | null;
//   editFormData: { status: string };
//   setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//   editLoading: boolean;
//   handleSaveEdit: () => Promise<void>;
//   statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedPaymentForEdit,
//   editFormData,
//   setEditFormData,
//   editLoading,
//   handleSaveEdit,
//   statusOptions,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//   const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//   // State and useEffect for mobile responsiveness (copied from DeleteRecipientModal)
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//       const checkMobileScreen = () => {
//           setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
//       };

//       checkMobileScreen(); // Initial check on mount

//       window.addEventListener('resize', checkMobileScreen); // Add listener for resize

//       return () => {
//           window.removeEventListener('resize', checkMobileScreen); // Cleanup listener on unmount
//       };
//   }, []);

//   const mobileVariants = {
//       initial: { y: 50, opacity: 0 },
//       animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//       exit: { y: 50, opacity: 0 },
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
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isEditModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node) &&
//         !(event.target as Element).closest('[id^="radix-ui-popper-"]')
//       ) {
//         setIsEditModalOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isEditModalOpen, setIsEditModalOpen]);

//   const handleStatusChange = (status: string) => {
//     setEditFormData(prev => ({ ...prev, status }));
//   };

//   if (!selectedPaymentForEdit) return null;

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && selectedPaymentForEdit && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center sm:items-center items-end"
//         >
//           <motion.div
//             ref={modalRef}
//             variants={modalVariants} // Apply modalVariants here
//             initial="initial"      // Set initial variant
//             animate="animate"      // Set animate variant
//             exit="exit"          // Set exit variant
//             className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl w-full sm:max-w-lg "
//           >
//             {/* Header */}
//             <div className="p-6 rounded-t-2xl flex items-center justify-between border-b">
//               <h2 className="text-xl font-bold flex items-center text-neutral-900 dark:text-white">
//                 <CreditCard className="mr-2 size-6 text-primary" />
//                 Edit Payment Status
//               </h2>
//               <button
//                 onClick={() => setIsEditModalOpen(false)} >
//                 <X className="size-6 text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary transition-all duration-75 ease-linear cursor-pointer" />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-6 space-y-5">

//                 {/* Status Dropdown */}
//               <div className="pt-2">
//                 <CustomDropdown
//                   label="Payment Status"
//                   value={editFormData.status}
//                   onChange={handleStatusChange}
//                   options={statusOptions.filter((opt) => opt !== "all")}
//                 />
//               </div>
//               {/* Payment ID Field */}
//               <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Payment ID
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit._id}
//                     </p>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                     className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder"
//                   >
//                     <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                     {isPaymentIdCopied ? "Copied!" : "Copy"}
//                   </Button>
//                 </  div>
//               </div>

//               {/* Reference Code Field */}
//               <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Reference Code
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit.referenceCode || "N/A"}
//                     </p>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       copyReferenceCode(
//                         selectedPaymentForEdit.referenceCode || ""
//                       )
//                     }
//                     disabled={!selectedPaymentForEdit.referenceCode}
//                     className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder"
//                   >
//                     <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                     {isReferenceCodeCopied ? "Copied!" : "Copy"}
//                   </Button>
//                 </div>
//               </div>

//               {/* Amount and Currency */}
//               <div className="flex gap-4">
//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border">
//                   <div className="flex items-center mb-1.5">
//                     <DollarSign className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Amount
//                     </span>
//                   </div>
//                   <p className="font-semibold text-lg text-gray-500 dark:text-gray-300">
//                     {selectedPaymentForEdit.amountToAdd}
//                   </p>
//                 </div>

//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border">
//                   <div className="flex items-center mb-1.5">
//                     <Globe className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Currency
//                     </span>
//                   </div>
//                   <Badge variant="outline" className="text-sm font-medium text-gray-500 dark:text-gray-300">
//                     {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
//                   </Badge>
//                 </div>
//               </div>

//             </div>

//             {/* Footer */}
//             <div className="border-t  p-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full sm:w-auto cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEdit}
//                 disabled={editLoading}
//                 className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full sm:w-auto cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 {editLoading ? "Saving..." : "Update Status"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentEditModal;

// // frontend/src/app/admin/components/add-money/PaymentEditModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose as X } from "react-icons/io5";
// import { Copy, CreditCard, DollarSign, Globe, Hash } from "lucide-react";

// // Assume CustomDropdown is correctly imported from its actual location
// import CustomDropdown from "./CustomDropdown"; // Or adjust path
// import { useCopyToClipboard } from "./useCopyToClipboard"; // Adjust path if needed
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Payment } from "../../../../types/payment"; // Import shared Payment type - Adjust path if needed

// interface PaymentEditModalProps {
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedPaymentForEdit: Payment | null; // Use shared Payment type
//   editFormData: { status: string }; // Keep as string if the input/API expects generic string
//   setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//   editLoading: boolean;
//   handleSaveEdit: () => Promise<void>;
//   statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedPaymentForEdit,
//   editFormData,
//   setEditFormData,
//   editLoading,
//   handleSaveEdit,
//   statusOptions, // Receives filtered statuses
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { copy: copyPaymentId, isCopied: isPaymentIdCopied } =
//     useCopyToClipboard();
//   const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } =
//     useCopyToClipboard();
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
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isEditModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node) &&
//         !(event.target as Element).closest('[id^="radix-ui-popper-"]') // Keep Radix check
//       ) {
//         setIsEditModalOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isEditModalOpen, setIsEditModalOpen]);

//   const handleStatusChange = (status: string) => {
//     setEditFormData((prev) => ({ ...prev, status }));
//   };

//   // No changes needed inside the return/JSX logic itself, as it uses properties
//   // that are present in the shared Payment type. `amountToAdd` is displayed as string.
//   if (!selectedPaymentForEdit) return null;

//   return (
//     <AnimatePresence>
//       {isEditModalOpen &&
//         selectedPaymentForEdit && ( // selectedPaymentForEdit is now correctly typed
//           <motion.div
//             // ... backdrop div ...
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center sm:items-center items-end"
//           >
//             <motion.div
//               ref={modalRef}
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl w-full sm:max-w-lg "
//             >
//               {/* Header */}
//               <div className="p-6 rounded-t-2xl flex items-center justify-between border-b ">
//                 <h2 className="text-xl font-bold flex items-center text-neutral-900 dark:text-white">
//                   <CreditCard className="mr-2 size-6 text-primary" />
//                   Edit Payment Status
//                 </h2>
//                 <button
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-6 space-y-5">
//                 {/* Status Dropdown */}
//                 <div className="pt-2">
//                   <CustomDropdown
//                     label="Payment Status"
//                     value={editFormData.status} // Current selected status for editing
//                     onChange={handleStatusChange} // Updates editFormData
//                     options={statusOptions} // Use the filtered options passed as props
//                   />
//                 </div>

//                 {/* Payment ID Field */}
//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border ">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center mb-1.5">
//                         <Hash className="size-4 text-primary mr-2" />
//                         <span className="font-medium text-neutral-900 dark:text-white">
//                           Payment ID
//                         </span>
//                       </div>
//                       <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                         {selectedPaymentForEdit._id}
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                       className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder"
//                     >
//                       <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                       {isPaymentIdCopied ? "Copied!" : "Copy"}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Reference Code Field */}
//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border ">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center mb-1.5">
//                         <Hash className="size-4 text-primary mr-2" />
//                         <span className="font-medium text-neutral-900 dark:text-white">
//                           Reference Code
//                         </span>
//                       </div>
//                       <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                         {selectedPaymentForEdit.referenceCode || "N/A"}{" "}
//                         {/* Use optional chaining */}
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() =>
//                         copyReferenceCode(
//                           selectedPaymentForEdit.referenceCode || ""
//                         )
//                       }
//                       disabled={!selectedPaymentForEdit.referenceCode}
//                       className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                       {isReferenceCodeCopied ? "Copied!" : "Copy"}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Amount and Currency */}
//                 <div className="flex gap-4">
//                   <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border ">
//                     <div className="flex items-center mb-1.5">
//                       <DollarSign className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Amount
//                       </span>
//                     </div>
//                     {/* Display amount (string) */}
//                     <p className="font-semibold text-lg text-gray-700 dark:text-gray-300">
//                       {selectedPaymentForEdit.amountToAdd}
//                     </p>
//                   </div>

//                   <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border ">
//                     <div className="flex items-center mb-1.5">
//                       <Globe className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Currency
//                       </span>
//                     </div>
//                     <Badge
//                       variant="outline"
//                       className="text-sm font-medium text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
//                     >
//                       {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="border-t  p-6 flex justify-end gap-3">
//                 <Button
//                   variant="secondary" // Use a secondary variant for cancel
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="w-full sm:w-auto" // Adjust width for mobile/desktop
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleSaveEdit}
//                   disabled={editLoading}
//                   className="w-full sm:w-auto" // Adjust width for mobile/desktop
//                 >
//                   {editLoading ? "Saving..." : "Update Status"}
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//     </AnimatePresence>
//   );
// };

// export default PaymentEditModal;

// // frontend/src/app/admin/components/add-money/PaymentEditModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose as X } from "react-icons/io5";
// import { Copy, CreditCard, DollarSign, Globe, Hash } from "lucide-react";

// // Assume CustomDropdown is correctly imported from its actual location
// import CustomDropdown from "./CustomDropdown"; // Or adjust path
// import { useCopyToClipboard } from "./useCopyToClipboard"; // Adjust path if needed
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Payment, PaymentStatus } from "../../../../types/payment"; // Import shared Payment type and status - Adjust path if needed

// interface PaymentEditModalProps {
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedPaymentForEdit: Payment | null; // Use shared Payment type
//   editFormData: { status: string }; // Keep as string for form input
//   setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//   editLoading: boolean;
//   handleSaveEdit: () => Promise<void>;
//   // Expect string options for the dropdown, excluding 'all'
//   statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedPaymentForEdit,
//   editFormData,
//   setEditFormData,
//   editLoading,
//   handleSaveEdit,
//   statusOptions, // Receives filtered string statuses suitable for dropdown
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { copy: copyPaymentId, isCopied: isPaymentIdCopied } =
//     useCopyToClipboard();
//   const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } =
//     useCopyToClipboard();
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
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isEditModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node) &&
//         !(event.target as Element).closest('[id^="radix-ui-popper-"]')
//       ) {
//         setIsEditModalOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isEditModalOpen, setIsEditModalOpen]);

//   // Handler for CustomDropdown (assuming it returns string or null)
//   const handleStatusChange = (status: string | null) => {
//     // Update the form state with the selected string value, default to empty string if null
//     setEditFormData((prev) => ({ ...prev, status: status ?? '' }));
//   };

//   if (!selectedPaymentForEdit) return null;

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && selectedPaymentForEdit && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center sm:items-center items-end"
//             aria-labelledby="edit-payment-modal-title"
//             role="dialog"
//             aria-modal="true"
//           >
//             <motion.div
//               ref={modalRef}
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl w-full sm:max-w-lg "
//             >
//               {/* Header */}
//               <div className="p-6 rounded-t-2xl flex items-center justify-between border-b ">
//                 <h2 id="edit-payment-modal-title" className="text-xl font-bold flex items-center text-neutral-900 dark:text-white">
//                   <CreditCard className="mr-2 size-6 text-primary" />
//                   Edit Payment Status
//                 </h2>
//                 <button
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary p-1 rounded-full" // Added padding and rounding
//                   aria-label="Close edit payment modal"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-6 space-y-5">
//                 {/* Status Dropdown */}
//                 <div className="pt-2">
//                   <CustomDropdown
//                     label="Payment Status"
//                     value={editFormData.status} // Current selected status string for editing
//                     onChange={handleStatusChange} // Updates editFormData (string)
//                     options={statusOptions} // Use the filtered string options passed as props
//                     // Ensure CustomDropdown handles 'string[]' options correctly
//                   />
//                 </div>

//                 {/* Payment ID Field */}
//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border ">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center mb-1.5">
//                         <Hash className="size-4 text-primary mr-2" />
//                         <span className="font-medium text-neutral-900 dark:text-white">
//                           Payment ID
//                         </span>
//                       </div>
//                       <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                         {selectedPaymentForEdit._id}
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                       className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder dark:border-gray-600 dark:text-white dark:hover:bg-neutral-700"
//                     >
//                       <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                       {isPaymentIdCopied ? "Copied!" : "Copy"}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Reference Code Field */}
//                 <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 transition-all border ">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center mb-1.5">
//                         <Hash className="size-4 text-primary mr-2" />
//                         <span className="font-medium text-neutral-900 dark:text-white">
//                           Reference Code
//                         </span>
//                       </div>
//                       <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                         {selectedPaymentForEdit.referenceCode || "N/A"}
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() =>
//                         copyReferenceCode(
//                           selectedPaymentForEdit.referenceCode || ""
//                         )
//                       }
//                       disabled={!selectedPaymentForEdit.referenceCode}
//                        className="shrink-0 h-8 text-xs cursor-pointer hover:bg-lightborder dark:border-gray-600 dark:text-white dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                       {isReferenceCodeCopied ? "Copied!" : "Copy"}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Amount and Currency */}
//                 <div className="flex flex-col sm:flex-row gap-4"> {/* Stack on small screens */}
//                   <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border ">
//                     <div className="flex items-center mb-1.5">
//                       <DollarSign className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Amount
//                       </span>
//                     </div>
//                     <p className="font-semibold text-lg text-gray-700 dark:text-gray-100"> {/* Adjusted dark text */}
//                       {selectedPaymentForEdit.amountToAdd} {/* Display string */}
//                     </p>
//                   </div>

//                   <div className="bg-lightgray dark:bg-white/5 rounded-lg p-4 flex-1 transition-all border ">
//                     <div className="flex items-center mb-1.5">
//                       <Globe className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Currency
//                       </span>
//                     </div>
//                     <Badge
//                       variant="outline"
//                       className="text-sm font-medium text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
//                     >
//                       {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="border-t  p-6 flex justify-end gap-3">
//                 <button
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-lg px-4   py-2 text-center cursor-pointer transition-all duration-75 ease-linear" // Dark mode secondary
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveEdit}
//                   disabled={editLoading || !editFormData.status} // Disable if no status selected
//                   className="w-full sm:w-auto bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-lg px-4 py-2 text-center cursor-pointer transition-all duration-75 ease-linear"
//                 >
//                   {editLoading ? "Saving..." : "Update Status"}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//     </AnimatePresence>
//   );
// };

// export default PaymentEditModal;

// // frontend/src/app/admin/components/add-money/PaymentEditModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose, IoClose as X } from "react-icons/io5";
// import {
//   Copy,
//   CreditCard,
//   DollarSign,
//   Globe,
//   Hash,
//   AlertCircle,
// } from "lucide-react"; // Added AlertCircle

// // Assume CustomDropdown is correctly imported from its actual location
// import CustomDropdown from "./CustomDropdown"; // Or adjust path
// import { useCopyToClipboard } from "./useCopyToClipboard"; // Adjust path if needed
// import { Payment } from "../../../../types/payment"; // Import shared Payment type - Adjust path if needed

// // Define which payment statuses are considered final (cannot be changed)
// const FINAL_PAYMENT_STATUSES: string[] = ["completed", "canceled", "failed"]; // Use lowercase for comparison

// interface PaymentEditModalProps {
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedPaymentForEdit: Payment | null; // Use shared Payment type
//   editFormData: { status: string }; // Keep as string for form input
//   setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//   editLoading: boolean;
//   handleSaveEdit: () => Promise<void>;
//   // Expect string options for the dropdown, excluding 'all' and 'unknown' might be desired here too
//   statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedPaymentForEdit,
//   editFormData,
//   setEditFormData,
//   editLoading,
//   handleSaveEdit,
//   statusOptions,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { copy: copyPaymentId, isCopied: isPaymentIdCopied } =
//     useCopyToClipboard();
//   const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } =
//     useCopyToClipboard();
//   const [isMobile, setIsMobile] = useState(false);

//   // Determine if the *original* status of the selected payment is final
//   const isFinalStatus = selectedPaymentForEdit
//     ? FINAL_PAYMENT_STATUSES.includes(
//         selectedPaymentForEdit.status?.toLowerCase() || ""
//       )
//     : false;

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
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isEditModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node) &&
//         !(event.target as Element).closest('[id^="radix-ui-popper-"]') // Check for radix popovers specifically
//       ) {
//         setIsEditModalOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isEditModalOpen, setIsEditModalOpen]);

//   // Handler for CustomDropdown (assuming it returns string or null)
//   const handleStatusChange = (status: string | null) => {
//     setEditFormData((prev) => ({ ...prev, status: status ?? "" }));
//   };

//   // If no payment is selected (shouldn't happen if modal is open, but good practice)
//   if (!selectedPaymentForEdit) return null;

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && selectedPaymentForEdit && (
//         <motion.div
//           className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center sm:items-center items-end"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           aria-labelledby="edit-payment-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <motion.div
//             ref={modalRef}
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-xl relative "
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 rounded-t-2xl flex items-center justify-between border-b">
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                   onClick={() => setIsEditModalOpen(false)}
//                   aria-label="Close modal"
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />{" "}
//                   {/* Added dark mode text color */}
//                 </button>
//               </div>

//               <div className="flex justify-between items-center">
//                 <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                   Edit Payment Status
//                 </h2>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 sm:p-6 space-y-5">
//               {/* Status Dropdown */}
//               <div className="Status-dropdown">
//                 <CustomDropdown
//                   label="Payment Status"
//                   value={editFormData.status}
//                   onChange={handleStatusChange}
//                   options={statusOptions}
//                   // Disable if the original status is final OR if currently loading
//                   disabled={isFinalStatus || editLoading}
//                 />

//                 {/* Informational message if status is final */}
//                 {isFinalStatus && (
//                   <p className="text-xs text-gray-500 dark:text-gray-300 mt-2 flex items-center gap-1">
//                     <AlertCircle size={18} className="text-primary size-4"/>
//                     This payment has reached a final status and cannot be
//                     changed.
//                   </p>
//                 )}
//               </div>

//               {/* Payment ID Field */}
//               <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 transition-all border ">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Payment ID
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit._id}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                     className="shrink-0 h-8 px-2.5 cursor-pointer  text-xs font-medium transition-all duration-75 ease-linear focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox"
//                   >
//                     <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                     {isPaymentIdCopied ? "Copied!" : "Copy"}
//                   </button>
//                 </div>
//               </div>

//               {/* Reference Code Field */}
//               <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 transition-all border ">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Reference Code
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit.referenceCode || "N/A"}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() =>
//                       copyReferenceCode(
//                         selectedPaymentForEdit.referenceCode || ""
//                       )
//                     }
//                     disabled={!selectedPaymentForEdit.referenceCode}
//                     className="shrink-0 h-8 px-2.5 cursor-pointer text-xs font-medium transition-all duration-75 ease-linear focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox"
//                   >
//                     <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                     {isReferenceCodeCopied ? "Copied!" : "Copy"}
//                   </button>
//                 </div>
//               </div>

//               {/* Amount and Currency */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 flex-1 transition-all border ">
//                   <div className="flex items-center mb-1.5">
//                     <DollarSign className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Amount
//                     </span>
//                   </div>
//                   <p className="font-semibold text-lg text-gray-700 dark:text-gray-100">
//                     {selectedPaymentForEdit.amountToAdd}
//                   </p>
//                 </div>

//                 <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 flex-1 transition-all border ">
//                   <div className="flex items-center mb-1.5">
//                     <Globe className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Currency
//                     </span>
//                   </div>
//                   <div className="text-sm font-medium border rounded-md inline-block px-4 py-1 bg-white dark:bg-primarybox">
//                     <span className="text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="border-t p-4 sm:p-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear" // Dark mode secondary
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEdit}
//                 // Disable if loading, OR if no status selected, OR if original status is final
//                 disabled={editLoading || !editFormData.status || isFinalStatus}
//                 className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
//               >
//                  {editLoading ? (
//                   // Original loading indicator structure
//                   <>
//                     <svg
//                       className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 2V6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M12 18V22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 4.93L7.76 7.76"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 16.24L19.07 19.07"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M2 12H6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M18 12H22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 19.07L7.76 16.24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 7.76L19.07 4.93"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   "Update Status"
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentEditModal;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5"; // IoClose is X, so only one import needed
// import {
//   Copy,
//   // CreditCard, // Not used
//   DollarSign,
//   Globe,
//   Hash,
//   AlertCircle,
// } from "lucide-react"; // Added AlertCircle

// // Assume CustomDropdown is correctly imported from its actual location
// import CustomDropdown from "./CustomDropdown"; // Or adjust path
// import { useCopyToClipboard } from "./useCopyToClipboard"; // Adjust path if needed
// import { Payment } from "../../../../types/payment"; // Import shared Payment type - Adjust path if needed

// // Define which payment statuses are considered final (cannot be changed)
// const FINAL_PAYMENT_STATUSES: string[] = ["completed", "canceled", "failed"]; // Use lowercase for comparison

// interface PaymentEditModalProps {
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedPaymentForEdit: Payment | null; // Use shared Payment type
//   editFormData: { status: string }; // Keep as string for form input
//   setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
//   editLoading: boolean;
//   handleSaveEdit: () => Promise<void>;
//   // Expect string options for the dropdown, excluding 'all' and 'unknown' might be desired here too
//   statusOptions: string[];
// }

// const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedPaymentForEdit,
//   editFormData,
//   setEditFormData,
//   editLoading,
//   handleSaveEdit,
//   statusOptions,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { copy: copyPaymentId, isCopied: isPaymentIdCopied } =
//     useCopyToClipboard();
//   const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } =
//     useCopyToClipboard();
//   const [isMobile, setIsMobile] = useState(false);

//   // Determine if the *original* status of the selected payment is final
//   const isFinalStatus = selectedPaymentForEdit
//     ? FINAL_PAYMENT_STATUSES.includes(
//         selectedPaymentForEdit.status?.toLowerCase() || ""
//       )
//     : false;

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

//   // Effect to handle body scroll lock
//   useEffect(() => {
//     if (isEditModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = ""; // Revert to default
//     }
//     // Cleanup function to ensure scroll is restored when component unmounts
//     // or before the effect runs again if isEditModalOpen changes.
//     return () => {
//       document.body.style.overflow = ""; // Revert to default
//     };
//   }, [isEditModalOpen]);

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
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isEditModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node) &&
//         !(event.target as Element).closest('[id^="radix-ui-popper-"]') // Check for radix popovers specifically
//       ) {
//         setIsEditModalOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isEditModalOpen, setIsEditModalOpen]);

//   // Handler for CustomDropdown (assuming it returns string or null)
//   const handleStatusChange = (status: string | null) => {
//     setEditFormData((prev) => ({ ...prev, status: status ?? "" }));
//   };

//   // If no payment is selected (shouldn't happen if modal is open, but good practice)
//   if (!selectedPaymentForEdit) return null;

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && selectedPaymentForEdit && (
//         <motion.div
//           className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center sm:items-center items-end"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           aria-labelledby="edit-payment-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <motion.div
//             ref={modalRef}
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-xl relative "
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 rounded-t-2xl flex items-center justify-between border-b">
//               {" "}
//               {/* Added dark border */}
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                   onClick={() => setIsEditModalOpen(false)}
//                   aria-label="Close modal"
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>
//               <div className="flex justify-between items-center">
//                 <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                   Edit Payment Status
//                 </h2>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 sm:p-6 space-y-5">
//               {/* Status Dropdown */}
//               <div className="Status-dropdown">
//                 <CustomDropdown
//                   label="Payment Status"
//                   value={editFormData.status}
//                   onChange={handleStatusChange}
//                   options={statusOptions}
//                   // Disable if the original status is final OR if currently loading
//                   disabled={isFinalStatus || editLoading}
//                 />

//                 {/* Informational message if status is final */}
//                 {isFinalStatus && (
//                   <p className="text-xs text-gray-500 dark:text-gray-300 mt-2 flex items-center gap-1">
//                     <AlertCircle size={18} className="text-primary size-4" />
//                     This payment has reached a final status and cannot be
//                     changed.
//                   </p>
//                 )}
//               </div>

//               {/* Payment ID Field */}
//               <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 transition-all border dark:border-neutral-700">
//                 {" "}
//                 {/* Added dark border */}
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Payment ID
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit._id}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
//                     className="shrink-0 h-8 px-2.5 cursor-pointer  text-xs font-medium transition-all duration-75 ease-linear focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox"
//                   >
//                     <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                     {isPaymentIdCopied ? "Copied!" : "Copy"}
//                   </button>
//                 </div>
//               </div>

//               {/* Reference Code Field */}
//               <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 transition-all border dark:border-neutral-700">
//                 {" "}
//                 {/* Added dark border */}
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-1.5">
//                       <Hash className="size-4 text-primary mr-2" />
//                       <span className="font-medium text-neutral-900 dark:text-white">
//                         Reference Code
//                       </span>
//                     </div>
//                     <p className="text-sm break-all text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit.referenceCode || "N/A"}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() =>
//                       copyReferenceCode(
//                         selectedPaymentForEdit.referenceCode || ""
//                       )
//                     }
//                     disabled={!selectedPaymentForEdit.referenceCode}
//                     className="shrink-0 h-8 px-2.5 cursor-pointer text-xs font-medium transition-all duration-75 ease-linear focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox"
//                   >
//                     <Copy className="size-3.5 mr-1 text-neutral-900 dark:text-white" />{" "}
//                     {isReferenceCodeCopied ? "Copied!" : "Copy"}
//                   </button>
//                 </div>
//               </div>

//               {/* Amount and Currency */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 flex-1 transition-all border dark:border-neutral-700">
//                   {" "}
//                   {/* Added dark border */}
//                   <div className="flex items-center mb-1.5">
//                     <DollarSign className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Amount
//                     </span>
//                   </div>
//                   <p className="font-semibold text-lg text-gray-700 dark:text-gray-100">
//                     {selectedPaymentForEdit.amountToAdd}
//                   </p>
//                 </div>

//                 <div className="bg-lightgray dark:bg-primarybox rounded-lg p-4 flex-1 transition-all border dark:border-neutral-700">
//                   {" "}
//                   {/* Added dark border */}
//                   <div className="flex items-center mb-1.5">
//                     <Globe className="size-4 text-primary mr-2" />
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       Currency
//                     </span>
//                   </div>
//                   <div className="text-sm font-medium border rounded-md inline-block px-4 py-1 bg-white dark:bg-primarybox dark:border-neutral-600">
//                     {" "}
//                     {/* Added dark border */}
//                     <span className="text-gray-500 dark:text-gray-300">
//                       {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="border-t p-4 sm:p-6 flex sm:flex-row flex-col justify-end gap-3">
//               {" "}
//               {/* Added dark border */}
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear" // Dark mode secondary
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEdit}
//                 // Disable if loading, OR if no status selected, OR if original status is final
//                 disabled={editLoading || !editFormData.status || isFinalStatus}
//                 className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
//               >
//                 {editLoading ? (
//                   <>
//                     <svg
//                       className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 2V6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M12 18V22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 4.93L7.76 7.76"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 16.24L19.07 19.07"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M2 12H6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M18 12H22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 19.07L7.76 16.24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 7.76L19.07 4.93"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   "Update Status"
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PaymentEditModal;




// components/admin/payments/PaymentEditModal.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Copy, DollarSign, Globe, Hash, AlertCircle } from "lucide-react";

// Assume CustomDropdown is correctly imported from its actual location
import CustomDropdown from "./CustomDropdown"; // Or adjust path
import { useCopyToClipboard } from "./useCopyToClipboard"; // Adjust path if needed
import { Payment } from "../../../../types/payment"; // Import shared Payment type - Adjust path if needed

// Define which payment statuses are considered final (cannot be changed)
const FINAL_PAYMENT_STATUSES: string[] = ["completed", "canceled", "failed"]; // Use lowercase for comparison

interface PaymentEditModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPaymentForEdit: Payment | null; // Use shared Payment type
  editFormData: { status: string }; // Keep as string for form input
  setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
  editLoading: boolean;
  handleSaveEdit: () => Promise<void>;
  // Expect string options for the dropdown, excluding 'all' and 'unknown' might be desired here too
  statusOptions: string[];
}

const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedPaymentForEdit,
  editFormData,
  setEditFormData,
  editLoading,
  handleSaveEdit,
  statusOptions,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { copy: copyPaymentId, isCopied: isPaymentIdCopied } =
    useCopyToClipboard();
  const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } =
    useCopyToClipboard();
  const [isMobile, setIsMobile] = useState(false);

  // Determine if the *original* status of the selected payment is final
  const isFinalStatus = selectedPaymentForEdit
    ? FINAL_PAYMENT_STATUSES.includes(
        selectedPaymentForEdit.status?.toLowerCase() || ""
      )
    : false;

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => {
      window.removeEventListener("resize", checkMobileScreen);
    };
  }, []);

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Revert to default
    }
    return () => {
      document.body.style.overflow = ""; // Revert to default
    };
  }, [isEditModalOpen]);

  const mobileVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
    exit: { y: 50, opacity: 0 },
  };

  const desktopVariants = {
    initial: { y: -30, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { y: -30, opacity: 0, scale: 0.95 },
  };
  const modalVariants = isMobile ? mobileVariants : desktopVariants;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[id^="radix-ui-popper-"]')
      ) {
        setIsEditModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditModalOpen, setIsEditModalOpen]);

  const handleStatusChange = (status: string | null) => {
    setEditFormData((prev) => ({ ...prev, status: status ?? "" }));
  };

  if (!selectedPaymentForEdit) return null;

  return (
    <AnimatePresence>
      {isEditModalOpen && selectedPaymentForEdit && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white/15 z-50 flex justify-center sm:items-center items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-labelledby="edit-payment-modal-title"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsEditModalOpen(false)} // Close on backdrop click
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-background sm:rounded-3xl rounded-none  w-full sm:max-w-xl relative flex flex-col overflow-hidden sm:h-auto h-screen" // Added flex flex-col overflow-hidden max-h
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
              <h2
                id="edit-payment-modal-title"
                className="lg:text-2xl text-xl font-semibold text-mainheadingWhite"
              >
                Edit Payment Status
              </h2>
              <div
                onClick={() => setIsEditModalOpen(false)}
                className="p-2.5 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setIsEditModalOpen(false);
                }}
                aria-label="Close modal"
              >
                  <IoClose size={26} />
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              <div className="p-4 sm:p-6 space-y-5">
                {/* Status Dropdown */}
                <div className="Status-dropdown">
                  <CustomDropdown
                    label="Payment Status"
                    value={editFormData.status}
                    onChange={handleStatusChange}
                    options={statusOptions}
                    disabled={isFinalStatus || editLoading}
                  />
                  {isFinalStatus && (
                    <p className="text-sm text-subheadingWhite mt-2 flex items-center gap-1">
                      <AlertCircle size={18} className="text-primary size-4" />
                      This payment has reached a final status and cannot be
                      changed.
                    </p>
                  )}
                </div>

                {/* Payment ID Field */}
                <div className="bg-primarybox rounded-lg p-4 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1.5">
                        <Hash className="size-4 text-primary mr-2" />
                        <span className="font-medium text-mainheadingWhite">
                          Payment ID
                        </span>
                      </div>
                      <p className="text-sm break-all text-white/90">
                        {selectedPaymentForEdit._id}
                      </p>
                    </div>
                    <button
                      onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
                      className="shrink-0 h-8 px-3 gap-2 text-xs font-medium transition-all duration-75 ease-linear focus-visible:outline-none rounded-full flex items-center justify-center text-mainheadingWhite bg-secondarybox hover:bg-secondaryboxhover cursor-pointer"
                    >
                      <Copy className="size-3.5" />
                      {isPaymentIdCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Reference Code Field */}
                <div className="bg-primarybox rounded-lg p-4 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1.5">
                        <Hash className="size-4 text-primary mr-2" />
                        <span className="font-medium text-mainheadingWhite">
                          Reference Code
                        </span>
                      </div>
                      <p className="text-sm break-all text-white/90">
                        {selectedPaymentForEdit.referenceCode || "N/A"}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyReferenceCode(
                          selectedPaymentForEdit.referenceCode || ""
                        )
                      }
                      disabled={!selectedPaymentForEdit.referenceCode}
                      className="shrink-0 h-8 px-3 gap-2 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-full flex items-center justify-center text-mainheadingWhite bg-secondarybox hover:bg-secondaryboxhover cursor-pointer"
                    >
                      <Copy className="size-3.5" />
                      {isReferenceCodeCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Amount and Currency */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-primarybox rounded-lg p-4 flex-1 transition-all">
                    <div className="flex items-center mb-1.5">
                      <DollarSign className="size-4 text-primary mr-2" />
                      <span className="ffont-medium text-mainheadingWhite">
                        Amount
                      </span>
                    </div>
                    <p className="font-semibold text-lg text-mainheadingWhite">
                      {selectedPaymentForEdit.amountToAdd}
                    </p>
                  </div>

                  <div className="bg-primarybox rounded-lg p-4 flex-1 transition-all">
                    <div className="flex items-center mb-1.5">
                      <Globe className="size-4 text-primary mr-2" />
                      <span className="font-medium text-mainheadingWhite">
                        Currency
                      </span>
                    </div>
                    <div className="text-sm font-medium rounded-full inline-block px-4 py-1 bg-secondarybox">
                      <span className="text-mainheadingWhite">
                        {selectedPaymentForEdit.payInCurrency?.code || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t flex-shrink-0">
              <div className="flex sm:flex-row flex-col justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="inline-flex justify-center cursor-pointer text-primary bg-primarybox hover:bg-secondarybox font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={
                    editLoading || !editFormData.status || isFinalStatus
                  }
                  className="inline-flex justify-center cursor-pointer bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? (
                    <>
                      <svg
                        className="h-5 w-5 text-mainheading animate-spin mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG paths for spinner */}
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
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Update Status"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentEditModal;
