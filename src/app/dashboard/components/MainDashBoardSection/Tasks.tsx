// // pages/tasks.tsx
// import React from "react";
// import { GetServerSideProps } from "next";
// import { MdError } from "react-icons/md";
// import { LuPlus } from "react-icons/lu";

// interface Task {
//   id: string;
//   amount: string;
//   currency: string;
//   description: string;
// }

// interface TasksProps {
//   tasks: Task[];
// }

// const Tasks: React.FC<TasksProps> = ({ tasks }) => {
//   return (
//     <section className="Tasks pt-12">
//       <div className="container mx-auto">
//         <div className="w-full">
//           <h1 className="text-3xl font-semibold text-main mb-5">Tasks</h1>

//           <div className="bg-lightgray rounded-2xl p-3">
//             {tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="flex sm:items-center items-start gap-4 "
//               >
//                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200 relative z-10">
//                   <LuPlus size={28} className="text-main" />

//                   {/* status icon */}
//                   <div className="absolute bottom-0 left-6">
//                     <MdError size={18} className="text-amber-500 ml-2" />
//                   </div>
//                 </div>
//                 <div className="flex sm:flex-row flex-col sm:items-center justify-between w-full gap-3">
//                   <div>
//                     <div className="flex items-center">
//                       <p className="font-medium text-main">
//                         {task.amount} {task.currency} to your {task.currency}{" "}
//                         balance
//                       </p>
//                     </div>
//                     <p className="text-sm text-gray-500">{task.description}</p>
//                   </div>

//                   {/* Review Button */}
//                   <button className="w-fit bg-primary text-secondary px-3 py-1 rounded-full text-sm font-medium text-right cursor-pointer">
//                     Review
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Page component that uses the Tasks component
// export default function TasksPage() {
//   // In a real application, this data would come from props provided by getServerSideProps
//   const tasks: Task[] = [
//     {
//       id: "1",
//       amount: "91.87",
//       currency: "EUR",
//       description: "Waiting for you to pay",
//     },
//     // You can add more tasks here if needed
//   ];

//   return <Tasks tasks={tasks} />;
// }

// // This function would normally fetch data from an API
// export const getServerSideProps: GetServerSideProps = async () => {
//   // In a real application, you would fetch tasks from an API or database
//   const tasks: Task[] = [
//     {
//       id: "1",
//       amount: "91.87",
//       currency: "EUR",
//       description: "Waiting for you to pay",
//     },
//   ];

//   return {
//     props: {
//       tasks,
//     },
//   };
// };

// "use client"; // Use client-side rendering for hooks

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { MdErrorOutline } from "react-icons/md"; // Warning icon
// import { LuPlus } from "react-icons/lu"; // Add money icon
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path as needed
// import paymentService from "../../../services/payment"; // Adjust path as needed
// import { Transaction } from "@/types/transaction"; // Adjust path as needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// const TasksPage: React.FC = () => {
//   // --- State ---
//   const [pendingPayments, setPendingPayments] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     console.log("TasksPage: useEffect triggered.");

//     const fetchPendingPayments = async () => {
//       if (!token) {
//         console.log("TasksPage: No token found, skipping fetch.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);
//       setPendingPayments([]);
//       console.log("TasksPage: Starting fetch for pending payments.");

//       try {
//         const allUserPayments = await paymentService.getUserPayments(token);
//         console.log(
//           `TasksPage: Received ${allUserPayments.length} raw payments from API.`
//         );

//         const pending = allUserPayments.filter(
//           (payment): payment is Transaction => {
//             const isPending = payment.status?.toLowerCase() === "pending";
//             const isAddMoney = payment.type === "Add Money";
//             return isPending && isAddMoney;
//           }
//         );
//         console.log(
//           `TasksPage: Filtered down to ${pending.length} pending 'Add Money' tasks.`
//         );
//         setPendingPayments(pending);
//       } catch (err: any) {
//         const errMsg =
//           err.response?.data?.message || err.message || "Failed to load tasks.";
//         setError(errMsg);
//         console.error("TasksPage: Error fetching pending payments:", err);
//       } finally {
//         setIsLoading(false);
//         console.log("TasksPage: Fetch finished.");
//       }
//     };

//     fetchPendingPayments();
//   }, [token]);

//   // --- Early Return Condition ---
//   // If loading is finished, there's no error, AND there are no pending payments, render nothing.
//   if (!isLoading && !error && pendingPayments.length === 0) {
//     console.log("TasksPage: No pending tasks found, rendering null.");
//     return null; // Render absolutely nothing
//   }

//   // --- Render Logic (Only runs if loading, error, or tasks exist) ---
//   return (
//     <section className="Tasks pt-10">
//       {/* --- Heading (Now only rendered if loading, error, or tasks exist) --- */}
//       <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6">
//         Tasks
//       </h1>

//       {/* --- Loading State --- */}
//       {isLoading && (
//         <div className="space-y-4">
//           <Skeleton className="h-24 w-full rounded-lg bg-gray-200" />
//           <Skeleton className="h-24 w-full rounded-lg bg-gray-200" />
//         </div>
//       )}

//       {/* --- Error State --- */}
//       {!isLoading && error && (
//         <div
//           className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center"
//           role="alert"
//         >
//           <strong className="font-bold">Error:</strong>
//           <span className="block sm:inline ml-1">{error}</span>
//         </div>
//       )}

//       {/* --- Task List (Only if not loading, no error, and tasks exist) --- */}
//       {/* This condition is implicitly true if we reach here AND pendingPayments.length > 0 */}
//       {!isLoading && !error && pendingPayments.length > 0 && (
//         <div className="space-y-2">
//           {pendingPayments.map((task) => {
//             const amount = task.amountToAdd ?? task.amountToPay ?? 0;
//             const currency =
//               task.balanceCurrency?.code ?? task.payInCurrency?.code ?? "";

//             return (
//               <Link href={`/dashboard/transactions/${task._id}`} key={task._id} className="block">
//                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
//                   <div className="flex items-center gap-4">
//                     {/* Icon */}
//                     <div className="relative flex-shrink-0">
//                       <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                         <LuPlus
//                           size={24}
//                           className="text-yellow-700 dark:text-yellow-300"
//                         />
//                       </div>
//                       <MdErrorOutline
//                         size={20}
//                         className="absolute -bottom-1 -right-1 text-orange-500 bg-white rounded-full p-0.5 shadow"
//                       />
//                     </div>
//                     {/* Details & Action */}
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       {/* Text Details */}
//                       <div className="flex-grow">
//                         <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}{" "}
//                           {currency} to your {currency} balance
//                         </p>
//                         <p className="text-sm text-orange-600 font-semibold mt-1">
//                           Waiting for you to pay
//                         </p>
//                       </div>
//                       {/* Review Button */}
//                       <button
//                         tabIndex={-1}
//                         className="shrink-0 bg-primary text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primaryhover transition-colors duration-500 ease-in-out focus:outline-none focus:ring-0 cursor-pointer"
//                       >
//                         Review
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// };

// export default TasksPage;

// "use client"; // Use client-side rendering for hooks

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { MdErrorOutline } from "react-icons/md"; // Warning icon
// import { LuPlus } from "react-icons/lu"; // Add money icon
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path as needed
// import paymentService from "../../../services/payment"; // Adjust path as needed
// import { Transaction } from "@/types/transaction"; // Adjust path as needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

// const TasksPage: React.FC = () => {
//   // --- State ---
//   const [pendingPayments, setPendingPayments] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();
//   const initialVisibleTaskCount = 3;
//   const [visibleTaskCount, setVisibleTaskCount] = useState(initialVisibleTaskCount);
//   const [allTasksVisible, setAllTasksVisible] = useState(false); // Track if all tasks are visible

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     console.log("TasksPage: useEffect triggered.");

//     const fetchPendingPayments = async () => {
//       if (!token) {
//         console.log("TasksPage: No token found, skipping fetch.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);
//       setPendingPayments([]);
//       setVisibleTaskCount(initialVisibleTaskCount); // Reset to initial count on refresh
//       setAllTasksVisible(false); // Reset allTasksVisible on refresh
//       console.log("TasksPage: Starting fetch for pending payments.");

//       try {
//         const allUserPayments = await paymentService.getUserPayments(token);
//         console.log(
//           `TasksPage: Received ${allUserPayments.length} raw payments from API.`
//         );

//         const pending = allUserPayments.filter(
//           (payment): payment is Transaction => {
//             const isPending = payment.status?.toLowerCase() === "pending";
//             const isAddMoney = payment.type === "Add Money";
//             return isPending && isAddMoney;
//           }
//         );
//         console.log(
//           `TasksPage: Filtered down to ${pending.length} pending 'Add Money' tasks.`
//         );
//         setPendingPayments(pending);
//       } catch (err: any) {
//         const errMsg =
//           err.response?.data?.message || err.message || "Failed to load tasks.";
//         setError(errMsg);
//         console.error("TasksPage: Error fetching pending payments:", err);
//       } finally {
//         setIsLoading(false);
//         console.log("TasksPage: Fetch finished.");
//       }
//     };

//     fetchPendingPayments();
//   }, [token]);

//   // --- Effect to Update allTasksVisible ---
//   useEffect(() => {
//     if (pendingPayments.length > 0) {
//       setAllTasksVisible(visibleTaskCount >= pendingPayments.length);
//     } else {
//       setAllTasksVisible(false); // No tasks, so not all visible
//     }
//   }, [visibleTaskCount, pendingPayments.length]);

//   // --- Early Return Condition ---
//   if (!isLoading && !error && pendingPayments.length === 0) {
//     console.log("TasksPage: No pending tasks found, rendering null.");
//     return null; // Render absolutely nothing
//   }

//   const displayedTasks = pendingPayments.slice(0, visibleTaskCount);
//   const hasMoreTasksToLoad = visibleTaskCount < pendingPayments.length;
//   const showToggleButton = pendingPayments.length > initialVisibleTaskCount; // Only show button if there are potentially more tasks than initial

//   const handleToggleViewMoreLess = () => {
//     if (allTasksVisible) {
//       setVisibleTaskCount(initialVisibleTaskCount); // View Less - reset to initial
//       setAllTasksVisible(false);
//     } else {
//       setVisibleTaskCount((prevCount) => prevCount + 3); // View More - load more tasks
//     }
//   };

//   const buttonText = allTasksVisible ? "View Less" : "View More";

//   const taskItemVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
//     exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeInOut" } },
//   };

//   // --- Render Logic ---
//   return (
//     <section className="Tasks pt-10">
//       <div className="container mx-auto">
//         {/* --- Heading --- */}
//         <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6">
//           Tasks
//         </h1>

//         {/* --- Loading State with Skeleton --- */}
//         {isLoading && (
//           <div className="space-y-2">
//             {Array(3)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block">
//                   <div className="block p-2 sm:p-4 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                       {/* Icon Skeleton */}
//                       <div className="relative flex-shrink-0">
//                         <div className="flex items-center justify-center">
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                       </div>
//                       {/* Text and Button Skeletons */}
//                       <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                         <div className="flex-grow">
//                           <Skeleton className="h-4 w-40 mb-2" />
//                           <Skeleton className="h-3 w-32" />
//                         </div>
//                         <div className="shrink-0">
//                           <Skeleton className="h-5 w-20 rounded-full" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}

//         {/* --- Error State --- */}
//         {!isLoading && error && (
//           <div
//             className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center"
//             role="alert"
//           >
//             <strong className="font-bold">Error:</strong>
//             <span className="block sm:inline ml-1">{error}</span>
//           </div>
//         )}

//         {/* --- Task List --- */}
//         {!isLoading && !error && displayedTasks.length > 0 && (
//           <motion.div layout className="space-y-2">
//             <AnimatePresence>
//               {displayedTasks.map((task) => {
//                 const amount = task.amountToAdd ?? task.amountToPay ?? 0;
//                 const currency =
//                   task.balanceCurrency?.code ?? task.payInCurrency?.code ?? "";

//                 return (
//                   <motion.div
//                     key={task._id}
//                     variants={taskItemVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     layout
//                   >
//                     <Link
//                       href={`/dashboard/transactions/${task._id}`}
//                       className="block"
//                     >
//                       <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                         <div className="flex items-center gap-4">
//                           {/* Icon */}
//                           <div className="relative flex-shrink-0">
//                             <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                               <LuPlus
//                                 size={24}
//                                 className="text-yellow-700 dark:text-yellow-300"
//                               />
//                             </div>
//                             <MdErrorOutline
//                               size={20}
//                               className="absolute -bottom-1 -right-1 text-orange-500 bg-white rounded-full p-0.5 shadow"
//                             />
//                           </div>
//                           {/* Details & Action */}
//                           <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                             {/* Text Details */}
//                             <div className="flex-grow">
//                               <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                 {amount.toLocaleString(undefined, {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 })}{" "}
//                                 {currency} to your {currency} balance
//                               </p>
//                               <p className="text-sm text-orange-600 font-semibold mt-1">
//                                 Waiting for you to pay
//                               </p>
//                             </div>
//                             {/* Review Button */}
//                             <button
//                               tabIndex={-1}
//                               className="shrink-0 bg-primary text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primaryhover transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer"
//                             >
//                               Review
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* --- View More/Less Button --- */}
//         {!isLoading &&
//           !error &&
//           showToggleButton && ( // Conditionally render button if needed
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleToggleViewMoreLess}
//                 className="bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer"
//               >
//                 {buttonText}
//               </button>
//             </div>
//           )}
//       </div>
//     </section>
//   );
// };

// export default TasksPage;

// "use client"; // Use client-side rendering for hooks

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { MdErrorOutline } from "react-icons/md"; // Warning icon
// import { LuPlus } from "react-icons/lu"; // Add money icon
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed
// import paymentService from "../../../services/payment"; // Adjust path as needed
// import { Transaction } from "@/types/transaction"; // Adjust path as needed
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
// import { AxiosError } from "axios"; // Import AxiosError for better error handling

// const TasksPage: React.FC = () => {
//   // --- State ---
//   const [pendingPayments, setPendingPayments] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();
//   const initialVisibleTaskCount = 3;
//   const [visibleTaskCount, setVisibleTaskCount] = useState(initialVisibleTaskCount);
//   const [allTasksVisible, setAllTasksVisible] = useState(false); // Track if all tasks are visible

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     console.log("TasksPage: useEffect triggered.");

//     const fetchPendingPayments = async () => {
//       if (!token) {
//         console.log("TasksPage: No token found, skipping fetch.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);
//       setPendingPayments([]);
//       setVisibleTaskCount(initialVisibleTaskCount); // Reset to initial count on refresh
//       setAllTasksVisible(false); // Reset allTasksVisible on refresh
//       console.log("TasksPage: Starting fetch for pending payments.");

//       try {
//         const allUserPayments = await paymentService.getUserPayments(token);
//         console.log(
//           `TasksPage: Received ${allUserPayments.length} raw payments from API.`
//         );

//         const pending = allUserPayments.filter(
//           (payment): payment is Transaction => {
//             const isPending = payment.status?.toLowerCase() === "pending";
//             const isAddMoney = payment.type === "Add Money";
//             return isPending && isAddMoney;
//           }
//         );
//         console.log(
//           `TasksPage: Filtered down to ${pending.length} pending 'Add Money' tasks.`
//         );
//         setPendingPayments(pending);
//       } catch (err: unknown) { // Changed 'any' to 'unknown'
//         let errMsg = "Failed to load tasks."; // Default error message

//         if (err instanceof AxiosError) { // Check if it's an Axios error
//           // Try to get message from response data, fallback to Axios message
//           errMsg = err.response?.data?.message || err.message || errMsg;
//         } else if (err instanceof Error) { // Check if it's a standard Error
//           errMsg = err.message || errMsg;
//         }
//         // If it's neither, keep the default message

//         setError(errMsg);
//         console.error("TasksPage: Error fetching pending payments:", err);
//       } finally {
//         setIsLoading(false);
//         console.log("TasksPage: Fetch finished.");
//       }
//     };

//     fetchPendingPayments();
//   }, [token]);

//   // --- Effect to Update allTasksVisible ---
//   useEffect(() => {
//     if (pendingPayments.length > 0) {
//       setAllTasksVisible(visibleTaskCount >= pendingPayments.length);
//     } else {
//       setAllTasksVisible(false); // No tasks, so not all visible
//     }
//   }, [visibleTaskCount, pendingPayments.length]);

//   // --- Early Return Condition ---
//   if (!isLoading && !error && pendingPayments.length === 0) {
//     console.log("TasksPage: No pending tasks found, rendering null.");
//     return null; // Render absolutely nothing
//   }

//   const displayedTasks = pendingPayments.slice(0, visibleTaskCount);
//   // Removed unused variable: const hasMoreTasksToLoad = visibleTaskCount < pendingPayments.length;
//   const showToggleButton = pendingPayments.length > initialVisibleTaskCount; // Only show button if there are potentially more tasks than initial

//   const handleToggleViewMoreLess = () => {
//     if (allTasksVisible) {
//       setVisibleTaskCount(initialVisibleTaskCount); // View Less - reset to initial
//       // setAllTasksVisible(false); // This is handled by the useEffect now
//     } else {
//       // Ensure we don't go beyond the actual number of payments
//       const newCount = Math.min(pendingPayments.length, visibleTaskCount + 3);
//       setVisibleTaskCount(newCount); // View More - load more tasks up to the total
//     }
//   };

//   const buttonText = allTasksVisible ? "View Less" : "View More";

//   const taskItemVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
//     exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeInOut" } },
//   };

//   // --- Render Logic ---
//   return (
//     <section className="Tasks pt-10">
//       <div className="container mx-auto">
//         {/* --- Heading --- */}
//         <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6">
//           Tasks
//         </h1>

//         {/* --- Loading State with Skeleton --- */}
//         {isLoading && (
//           <div className="space-y-2">
//             {Array(3)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block">
//                   <div className="block p-2 sm:p-4 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                       {/* Icon Skeleton */}
//                       <div className="relative flex-shrink-0">
//                         <div className="flex items-center justify-center">
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                       </div>
//                       {/* Text and Button Skeletons */}
//                       <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                         <div className="flex-grow">
//                           <Skeleton className="h-4 w-40 mb-2" />
//                           <Skeleton className="h-3 w-32" />
//                         </div>
//                         <div className="shrink-0">
//                           <Skeleton className="h-5 w-20 rounded-full" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}

//         {/* --- Error State --- */}
//         {!isLoading && error && (
//           <div
//             className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center"
//             role="alert"
//           >
//             <strong className="font-bold">Error:</strong>
//             <span className="block sm:inline ml-1">{error}</span>
//           </div>
//         )}

//         {/* --- Task List --- */}
//         {!isLoading && !error && displayedTasks.length > 0 && (
//           <motion.div layout className="space-y-2">
//             <AnimatePresence initial={false}> {/* Disable initial animation for AnimatePresence itself */}
//               {displayedTasks.map((task) => {
//                 const amount = task.amountToAdd ?? task.amountToPay ?? 0;
//                 const currency =
//                   task.balanceCurrency?.code ?? task.payInCurrency?.code ?? "";

//                 return (
//                   <motion.div
//                     key={task._id}
//                     variants={taskItemVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     layout // Add layout prop for smooth transitions when items are added/removed
//                   >
//                     <Link
//                       href={`/dashboard/transactions/${task._id}`}
//                       className="block"
//                     >
//                       <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                         <div className="flex items-center gap-4">
//                           {/* Icon */}
//                           <div className="relative flex-shrink-0">
//                             <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                               <LuPlus
//                                 size={24}
//                                 className="text-yellow-700 dark:text-yellow-300"
//                               />
//                             </div>
//                             <MdErrorOutline
//                               size={20}
//                               className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow" // Adjusted background for dark mode visibility
//                             />
//                           </div>
//                           {/* Details & Action */}
//                           <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                             {/* Text Details */}
//                             <div className="flex-grow">
//                               <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                 {amount.toLocaleString(undefined, {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 })}{" "}
//                                 {currency} to your {currency} balance
//                               </p>
//                               <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mt-1"> {/* Adjusted text color for dark mode */}
//                                 Waiting for you to pay
//                               </p>
//                             </div>
//                             {/* Review Button */}
//                             <button
//                               tabIndex={-1}
//                               className="shrink-0 bg-primary text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primaryhover transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer"
//                             >
//                               Review
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* --- View More/Less Button --- */}
//         {!isLoading &&
//           !error &&
//           showToggleButton && ( // Conditionally render button if needed
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleToggleViewMoreLess}
//                 className="bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer" // Adjusted hover for dark mode
//               >
//                 {buttonText}
//               </button>
//             </div>
//           )}
//       </div>
//     </section>
//   );
// };

// export default TasksPage;

"use client"; // Use client-side rendering for hooks

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdErrorOutline } from "react-icons/md"; // Warning icon
import { LuPlus } from "react-icons/lu"; // Add money icon
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed
import paymentService from "../../../services/payment"; // Adjust path as needed
import { Transaction } from "@/types/transaction"; // Adjust path as needed
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import { AxiosError } from "axios"; // Import AxiosError for better error handling

const TasksPage: React.FC = () => {
  // --- State ---
  const [pendingPayments, setPendingPayments] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const initialVisibleTaskCount = 3;
  const [visibleTaskCount, setVisibleTaskCount] = useState(
    initialVisibleTaskCount
  );
  const [allTasksVisible, setAllTasksVisible] = useState(false); // Track if all tasks are visible

  // --- Data Fetching Effect ---
  useEffect(() => {
    console.log("TasksPage: useEffect triggered.");

    const fetchPendingPayments = async () => {
      if (!token) {
        console.log("TasksPage: No token found, skipping fetch.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setPendingPayments([]);
      setVisibleTaskCount(initialVisibleTaskCount); // Reset to initial count on refresh
      setAllTasksVisible(false); // Reset allTasksVisible on refresh
      console.log("TasksPage: Starting fetch for pending payments.");

      try {
        const allUserPayments = await paymentService.getUserPayments(token);
        console.log(
          `TasksPage: Received ${allUserPayments.length} raw payments from API.`
        );

        // Instead of using a type predicate:
        // Use a filter followed by a map to explicitly convert types:
        const pending = allUserPayments
          .filter((payment) => {
            const isPending = payment.status?.toLowerCase() === "pending";
            const isAddMoney = payment.type === "Add Money";
            return isPending && isAddMoney;
          })
          .map(
            (payment) =>
              ({
                _id: payment._id,
                status: payment.status,
                type: payment.type as "Add Money" | "Send Money",
                amountToAdd: payment.amountToAdd,
                amountToPay: payment.amountToPay,
                balanceCurrency: payment.balanceCurrency,
                payInCurrency: payment.payInCurrency,
                // Include any other required Transaction properties
              } as Transaction)
          );
        console.log(
          `TasksPage: Filtered down to ${pending.length} pending 'Add Money' tasks.`
        );
        setPendingPayments(pending);
      } catch (err: unknown) {
        // Changed 'any' to 'unknown'
        let errMsg = "Failed to load tasks."; // Default error message

        if (err instanceof AxiosError) {
          // Check if it's an Axios error
          // Try to get message from response data, fallback to Axios message
          errMsg = err.response?.data?.message || err.message || errMsg;
        } else if (err instanceof Error) {
          // Check if it's a standard Error
          errMsg = err.message || errMsg;
        }
        // If it's neither, keep the default message

        setError(errMsg);
        console.error("TasksPage: Error fetching pending payments:", err);
      } finally {
        setIsLoading(false);
        console.log("TasksPage: Fetch finished.");
      }
    };

    fetchPendingPayments();
  }, [token]);

  // --- Effect to Update allTasksVisible ---
  useEffect(() => {
    if (pendingPayments.length > 0) {
      setAllTasksVisible(visibleTaskCount >= pendingPayments.length);
    } else {
      setAllTasksVisible(false); // No tasks, so not all visible
    }
  }, [visibleTaskCount, pendingPayments.length]);

  // --- Early Return Condition ---
  if (!isLoading && !error && pendingPayments.length === 0) {
    console.log("TasksPage: No pending tasks found, rendering null.");
    return null; // Render absolutely nothing
  }

  const displayedTasks = pendingPayments.slice(0, visibleTaskCount);
  // Removed unused variable: const hasMoreTasksToLoad = visibleTaskCount < pendingPayments.length;
  const showToggleButton = pendingPayments.length > initialVisibleTaskCount; // Only show button if there are potentially more tasks than initial

  const handleToggleViewMoreLess = () => {
    if (allTasksVisible) {
      setVisibleTaskCount(initialVisibleTaskCount); // View Less - reset to initial
      // setAllTasksVisible(false); // This is handled by the useEffect now
    } else {
      // Ensure we don't go beyond the actual number of payments
      const newCount = Math.min(pendingPayments.length, visibleTaskCount + 3);
      setVisibleTaskCount(newCount); // View More - load more tasks up to the total
    }
  };

  const buttonText = allTasksVisible ? "View Less" : "View More";

  const taskItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  // --- Render Logic ---
  return (
    <section className="Tasks-Wrapper">
      <div className="Tasks">
        {/* --- Heading --- */}
        <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-4">
          Tasks
        </h1>

        {/* --- Loading State with Skeleton --- */}
        {isLoading && (
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="block">
                  <div className="block p-2 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                      {/* Icon Skeleton */}
                      <div className="relative flex-shrink-0">
                        <div className="flex items-center justify-center">
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                      </div>
                      {/* Text and Button Skeletons */}
                      <div className="flex-grow flex flex-row justify-between items-center gap-4">
                        <div className="flex-grow">
                          <Skeleton className="h-4 w-40 mb-2" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <div className="shrink-0">
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* --- Error State --- */}
        {!isLoading && error && (
          <div
            className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        {/* --- Task List --- */}
        {!isLoading && !error && displayedTasks.length > 0 && (
          <motion.div layout className="space-y-2">
            <AnimatePresence initial={false}>
              {" "}
              {/* Disable initial animation for AnimatePresence itself */}
              {displayedTasks.map((task) => {
                const currency =
                  task.balanceCurrency?.code ?? task.payInCurrency?.code ?? "";

                return (
                  <motion.div
                    key={task._id}
                    variants={taskItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout // Add layout prop for smooth transitions when items are added/removed
                  >
                    <Link
                      href={`/dashboard/transactions/${task._id}`}
                      className="block"
                    >
                      <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                        <div className="flex sm:items-center sm:gap-4 gap-2">
                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
                              <LuPlus
                                size={24}
                                className="text-yellow-700 dark:text-yellow-300"
                              />
                            </div>
                            <MdErrorOutline
                              size={20}
                              className="absolute top-8 -right-1 text-orange-500 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow" // Adjusted background for dark mode visibility
                            />
                          </div>
                          {/* Details & Action */}
                          <div className="flex-grow flex flex-row justify-between items-center gap-4">
                            {/* Text Details */}
                            <div className="flex-grow">
                              <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
                                To your {currency} balance
                              </p>
                              <p className="sm:text-sm text-13px text-orange-600 dark:text-orange-400 font-semibold mt-1">
                                {" "}
                                {/* Adjusted text color for dark mode */}
                                Waiting for you to pay
                              </p>
                            </div>
                            {/* Review Button */}
                            <button
                              tabIndex={-1}
                              className="shrink-0 bg-primary text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primaryhover transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer"
                            >
                              Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- View More/Less Button --- */}
        {!isLoading &&
          !error &&
          showToggleButton && ( // Conditionally render button if needed
            <div className="flex justify-center mt-4">
              <button
                onClick={handleToggleViewMoreLess}
                className="bg-lightgray hover:bg-lightborder dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer" // Adjusted hover for dark mode
              >
                {buttonText}
              </button>
            </div>
          )}
      </div>
    </section>
  );
};

export default TasksPage;










// "use client"; // Use client-side rendering for hooks

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { MdErrorOutline } from "react-icons/md"; // Warning icon
// import { LuPlus } from "react-icons/lu"; // Add money icon
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed
// import paymentService from "../../../services/payment"; // Adjust path as needed
// import { Transaction } from "@/types/transaction"; // Adjust path as needed, Import PaymentDetailsResponse
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
// import { AxiosError } from "axios"; // Import AxiosError for better error handling

// const TasksPage: React.FC = () => {
//   // --- State ---
//   const [pendingPayments, setPendingPayments] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();
//   const initialVisibleTaskCount = 3;
//   const [visibleTaskCount, setVisibleTaskCount] = useState(initialVisibleTaskCount);
//   const [allTasksVisible, setAllTasksVisible] = useState(false); // Track if all tasks are visible

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     console.log("TasksPage: useEffect triggered.");

//     const fetchPendingPayments = async () => {
//       if (!token) {
//         console.log("TasksPage: No token found, skipping fetch.");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);
//       setPendingPayments([]);
//       setVisibleTaskCount(initialVisibleTaskCount); // Reset to initial count on refresh
//       setAllTasksVisible(false); // Reset allTasksVisible on refresh
//       console.log("TasksPage: Starting fetch for pending payments.");

//       try {
//         // Assuming getUserPayments returns PaymentDetailsResponse[]
//         const allUserPaymentsResponse = await paymentService.getUserPayments(token);
//         console.log(
//           `TasksPage: Received ${allUserPaymentsResponse.length} raw payments from API.`
//         );
//         console.log("TasksPage: Raw API Response:", allUserPaymentsResponse); // Log raw response for inspection

//         // Map PaymentDetailsResponse to Transaction, handling potential missing 'type'
//         const allUserPayments: Transaction[] = allUserPaymentsResponse.map(
//           (paymentResponse) => {
//             return {
//               ...paymentResponse, // Spread all properties from PaymentDetailsResponse
//               type: paymentResponse.type || "Unknown", // Default type or handle as needed - Still assuming 'type' might be missing
//               // Ensure all properties of Transaction are here, use defaults if necessary
//               _id: paymentResponse._id, // Assuming _id exists in PaymentDetailsResponse
//               status: paymentResponse.status, // Assuming status exists
//               amountToAdd: paymentResponse.amountToPay, // Using amountToPay as suggested by error message
//               amountToPay: paymentResponse.amountToPay, // Keeping amountToPay as well, adjust if needed based on your types
//               balanceCurrency: paymentResponse.balanceCurrencyCode, // Using balanceCurrencyCode as suggested
//               payInCurrency: paymentResponse.payInCurrencyCode, // Using payInCurrencyCode as suggested
//               // ... add other properties from Transaction type and map from PaymentDetailsResponse if available
//             } as Transaction; // Type assertion after mapping
//           }
//         );

//         const pending = allUserPayments.filter(
//           (payment): payment is Transaction => {
//             const isPending = payment.status?.toLowerCase() === "pending";
//             const isAddMoney = payment.type === "Add Money";
//             return isPending && isAddMoney;
//           }
//         );
//         console.log(
//           `TasksPage: Filtered down to ${pending.length} pending 'Add Money' tasks.`
//         );
//         setPendingPayments(pending);
//       } catch (err: unknown) { // Changed 'any' to 'unknown'
//         let errMsg = "Failed to load tasks."; // Default error message

//         if (err instanceof AxiosError) { // Check if it's an Axios error
//           // Try to get message from response data, fallback to Axios message
//           errMsg = err.response?.data?.message || err.message || errMsg;
//         } else if (err instanceof Error) { // Check if it's a standard Error
//           errMsg = err.message || errMsg;
//         }
//         // If it's neither, keep the default message

//         setError(errMsg);
//         console.error("TasksPage: Error fetching pending payments:", err);
//       } finally {
//         setIsLoading(false);
//         console.log("TasksPage: Fetch finished.");
//       }
//     };

//     fetchPendingPayments();
//   }, [token]);

//   // --- Effect to Update allTasksVisible ---
//   useEffect(() => {
//     if (pendingPayments.length > 0) {
//       setAllTasksVisible(visibleTaskCount >= pendingPayments.length);
//     } else {
//       setAllTasksVisible(false); // No tasks, so not all visible
//     }
//   }, [visibleTaskCount, pendingPayments.length]);

//   // --- Early Return Condition ---
//   if (!isLoading && !error && pendingPayments.length === 0) {
//     console.log("TasksPage: No pending tasks found, rendering null.");
//     return null; // Render absolutely nothing
//   }

//   const displayedTasks = pendingPayments.slice(0, visibleTaskCount);
//   // Removed unused variable: const hasMoreTasksToLoad = visibleTaskCount < pendingPayments.length;
//   const showToggleButton = pendingPayments.length > initialVisibleTaskCount; // Only show button if there are potentially more tasks than initial

//   const handleToggleViewMoreLess = () => {
//     if (allTasksVisible) {
//       setVisibleTaskCount(initialVisibleTaskCount); // View Less - reset to initial
//       // setAllTasksVisible(false); // This is handled by the useEffect now
//     } else {
//       // Ensure we don't go beyond the actual number of payments
//       const newCount = Math.min(pendingPayments.length, visibleTaskCount + 3);
//       setVisibleTaskCount(newCount); // View More - load more tasks up to the total
//     }
//   };

//   const buttonText = allTasksVisible ? "View Less" : "View More";

//   const taskItemVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
//     exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeInOut" } },
//   };

//   // --- Render Logic ---
//   return (
//     <section className="Tasks pt-10">
//       <div className="container mx-auto">
//         {/* --- Heading --- */}
//         <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white mb-6">
//           Tasks
//         </h1>

//         {/* --- Loading State with Skeleton --- */}
//         {isLoading && (
//           <div className="space-y-2">
//             {Array(3)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block">
//                   <div className="block p-2 sm:p-4 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                       {/* Icon Skeleton */}
//                       <div className="relative flex-shrink-0">
//                         <div className="flex items-center justify-center">
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                       </div>
//                       {/* Text and Button Skeletons */}
//                       <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                         <div className="flex-grow">
//                           <Skeleton className="h-4 w-40 mb-2" />
//                           <Skeleton className="h-3 w-32" />
//                         </div>
//                         <div className="shrink-0">
//                           <Skeleton className="h-5 w-20 rounded-full" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}

//         {/* --- Error State --- */}
//         {!isLoading && error && (
//           <div
//             className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center"
//             role="alert"
//           >
//             <strong className="font-bold">Error:</strong>
//             <span className="block sm:inline ml-1">{error}</span>
//           </div>
//         )}

//         {/* --- Task List --- */}
//         {!isLoading && !error && displayedTasks.length > 0 && (
//           <motion.div layout className="space-y-2">
//             <AnimatePresence initial={false}> {/* Disable initial animation for AnimatePresence itself */}
//               {displayedTasks.map((task) => {
//                 const amount = task.amountToAdd ?? task.amountToPay ?? 0;
//                 const currency =
//                   task.balanceCurrency?.code ?? task.payInCurrency?.code ?? "";

//                 return (
//                   <motion.div
//                     key={task._id}
//                     variants={taskItemVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     layout // Add layout prop for smooth transitions when items are added/removed
//                   >
//                     <Link
//                       href={`/dashboard/transactions/${task._id}`}
//                       className="block"
//                     >
//                       <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                         <div className="flex items-center gap-4">
//                           {/* Icon */}
//                           <div className="relative flex-shrink-0">
//                             <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                               <LuPlus
//                                 size={24}
//                                 className="text-yellow-700 dark:text-yellow-300"
//                               />
//                             </div>
//                             <MdErrorOutline
//                               size={20}
//                               className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow" // Adjusted background for dark mode visibility
//                             />
//                           </div>
//                           {/* Details & Action */}
//                           <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                             {/* Text Details */}
//                             <div className="flex-grow">
//                               <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                 {amount.toLocaleString(undefined, {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 })}
//                                 {currency} to your {currency} balance
//                               </p>
//                               <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mt-1"> {/* Adjusted text color for dark mode */}
//                                 Waiting for you to pay
//                               </p>
//                             </div>
//                             {/* Review Button */}
//                             <button
//                               tabIndex={-1}
//                               className="shrink-0 bg-primary text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primaryhover transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer"
//                             >
//                               Review
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* --- View More/Less Button --- */}
//         {!isLoading &&
//           !error &&
//           showToggleButton && ( // Conditionally render button if needed
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleToggleViewMoreLess}
//                 className="bg-lightgray dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition-all duration-75 ease-linear focus:outline-none focus:ring-0 cursor-pointer" // Adjusted hover for dark mode
//               >
//                 {buttonText}
//               </button>
//             </div>
//           )}
//       </div>
//     </section>
//   );
// };

// export default TasksPage;
