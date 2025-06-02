// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import authService from "../../../services/auth";
// import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
// import { VscEye } from "react-icons/vsc";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { IoClose } from "react-icons/io5";
// import Link from "next/link";
// interface ResetPasswordPageProps {
//   params: { token: string };
// }

// const NewPasswordPage = ({ params }: ResetPasswordPageProps) => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState<string[]>([]);
//   const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   const { token: tokenFromParams } = useParams();
//   const [validationCriteria, setValidationCriteria] = useState({
//     // State for criteria status
//     hasLetter: false,
//     hasNumber: false,
//     hasMinLength: false,
//   });

//   const token = tokenFromParams as string;

//   useEffect(() => {
//     if (!token) {
//       setResetError("Invalid reset link.");
//     }
//   }, [token]);

//   const validatePassword = (pw: string) => {
//     const errors: string[] = [];
//     let hasLetter = false;
//     let hasNumber = false;
//     let hasMinLength = false;

//     if (!pw) {
//       return {
//         errors: [],
//         hasLetter: false,
//         hasNumber: false,
//         hasMinLength: false,
//       };
//     } else {
//       if (pw.length >= 9) {
//         hasMinLength = true;
//       }
//       if (/[a-zA-Z]/.test(pw)) {
//         hasLetter = true;
//       }
//       if (/
//d/.test(pw)) {
//         hasNumber = true;
//       }
//     }
//     return { errors, hasLetter, hasNumber, hasMinLength };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPasswordError([]);
//     setConfirmPasswordError("");
//     setResetError("");
//     setResetSuccess("");

//     let formIsValid = true;

//     if (!password) {
//       setPasswordError(["New Password is required."]);
//       formIsValid = false;
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Confirm New Password is required.");
//       formIsValid = false;
//     }

//     if (!formIsValid) {
//       return;
//     }

//     const validationResult = validatePassword(password);
//     if (validationResult.errors.length > 0) {
//       setPasswordError(validationResult.errors);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await authService.resetPassword({ token, password });
//       setResetSuccess("Password reset successful! Redirecting to login...");
//       setTimeout(() => {
//         router.push("/auth/login?forgotPasswordSuccess=true");
//       }, 2000);
//     } catch (err: any) {
//       if (err.message === "Invalid or expired password reset token.") {
//         setResetError(
//           "This password reset link has expired. Please request a new password reset link."
//         );
//       } else {
//         setResetError(
//           err.message || "Password reset failed. Please try again."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleCloseResetError = () => {
//     setResetError("");
//   };

//   const validationResult = validatePassword(password);

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     const currentValidation = validatePassword(newPassword);
//     setValidationCriteria({
//       // Update criteria state on password change
//       hasLetter: currentValidation.hasLetter,
//       hasNumber: currentValidation.hasNumber,
//       hasMinLength: currentValidation.hasMinLength,
//     });
//     if (newPassword === "") {
//       setPasswordError(["New Password is required."]);
//     } else {
//       setPasswordError(currentValidation.errors);
//     }
//   };

//   useEffect(() => {
//     if (confirmPassword) {
//       setConfirmPasswordError("");
//     }
//   }, [confirmPassword]);

//   const shouldShowCriteriaList = () => {
//     return (
//       !passwordError.length &&
//       password &&
//       !(
//         validationCriteria.hasLetter &&
//         validationCriteria.hasNumber &&
//         validationCriteria.hasMinLength
//       )
//     );
//   };

//   return (
//     <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//       <div className="w-full max-w-md mt-10">
//         <div className="bg-white">
//           <div className="py-3">
//             <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//               Set your new password
//             </h2>

//             {resetError && (
//               <div
//                 className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                 role="alert"
//               >
//                 <div className="flex bg-error justify-center rounded-full items-center size-12">
//                   <IoClose className="p-0.5 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray block max-w-60">{resetError}</span>
//                 </div>
//                 <button
//                   className="absolute cursor-pointer right-4 top-4"
//                   onClick={handleCloseResetError}
//                 >
//                   <IoClose
//                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                     role="button"
//                   />
//                 </button>
//               </div>
//             )}

//             {resetSuccess && (
//               <div
//                 className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
//                 role="alert"
//               >
//                 <strong className="font-bold">Success!</strong>
//                 <span className="block sm:inline"> {resetSuccess}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="mt-10 space-y-5">
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="text-gray text-sm block capitalize font-medium"
//                 >
//                   New Password <span className="text-error">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${
//                       passwordError.length > 0
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={handlePasswordChange}
//                   />
//                   <button
//                     type="button"
//                     className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? (
//                       <RiEyeCloseLine className="text-secondary size-5" />
//                     ) : (
//                       <VscEye className="text-secondary size-5" />
//                     )}
//                   </button>
//                 </div>
//                 {passwordError.includes("New Password is required.") && (
//                   <p className="flex text-error text-base items-center mt-0.5">
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {passwordError[0]}
//                   </p>
//                 )}
//                 {!passwordError.includes("New Password is required.") &&
//                   passwordError.length > 0 && (
//                     <ul className="mt-2 text-error list-disc pl-5">
//                       {passwordError.map((error, index) => (
//                         <li key={index} className="flex items-center">
//                           <IoMdCloseCircle className="mr-1 text-error size-5" />
//                           {error}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 {shouldShowCriteriaList() && ( // Conditionally render criteria list
//                   <ul className="mt-2 text-gray-500 list-disc">
//                     <li className="flex items-center mb-1">
//                       {validationCriteria.hasLetter ? (
//                         <IoIosCheckmarkCircle className="mr-1 text-green-500 size-5" />
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 text-error size-5" />
//                       )}
//                       Contains a letter
//                     </li>
//                     <li className="flex items-center mb-1">
//                       {validationCriteria.hasNumber ? (
//                         <IoIosCheckmarkCircle className="mr-1 text-green-500 size-5" />
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 text-error size-5" />
//                       )}
//                       Contains a number
//                     </li>
//                     <li className="flex items-center">
//                       {validationCriteria.hasMinLength ? (
//                         <IoIosCheckmarkCircle className="mr-1 text-green-500 size-5" />
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 text-error size-5" />
//                       )}
//                       Has 9 or more characters
//                     </li>
//                   </ul>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirm-password"
//                   className="text-gray text-sm block capitalize font-medium"
//                 >
//                   Confirm New Password <span className="text-error">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirm-password"
//                     className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${
//                       confirmPasswordError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     placeholder="••••••••"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-mdc"
//                     onClick={toggleConfirmPasswordVisibility}
//                   >
//                     {showConfirmPassword ? (
//                       <RiEyeCloseLine className="text-secondary size-5" />
//                     ) : (
//                       <VscEye className="text-secondary size-5" />
//                     )}
//                   </button>
//                 </div>
//                 {confirmPasswordError && (
//                   <p className="flex text-error items-center mt-0.5">
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {confirmPasswordError}
//                   </p>
//                 )}
//                 {confirmPasswordError === "" &&
//                   confirmPassword &&
//                   password !== confirmPassword && (
//                     <p className="flex text-error items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-5" />
//                       </span>
//                       Passwords do not match.
//                     </p>
//                   )}
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   type="submit"
//                   className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                     ${
//                                       isSubmitting
//                                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                         : "bg-primary hover:bg-primary-hover text-secondary"
//                                     }
//                                 `}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
//                         className="h-5 text-green w-5 animate-spin mr-3"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Resetting...
//                     </div>
//                   ) : (
//                     "Reset password"
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="text-center mt-6">
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Go back to
//                 <Link
//                   href="/auth/login"
//                   className="text-secondary font-medium hover:underline dark:text-primary-500"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPasswordPage;

// "use client";

// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { useRouter, useParams } from "next/navigation";
// import authService from "../../../services/auth";
// import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
// import { VscEye } from "react-icons/vsc";
// import { RiEyeCloseLine } from "react-icons/ri";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
// import { FiX } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// // Interface definition removed as it's not used for props in this client component.

// const NewPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   // Store only the primary password error message (like "required")
//   const [passwordRequiredError, setPasswordRequiredError] = useState<
//     string | null
//   >(null);
//   const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   const params = useParams(); // Get params object
//   // Safely access token, handle potential array or undefined
//   const tokenFromParams = params?.token;
//   const token =
//     typeof tokenFromParams === "string" ? tokenFromParams : undefined;

//   const [validationCriteria, setValidationCriteria] = useState({
//     hasLetter: false,
//     hasNumber: false,
//     hasMinLength: false,
//   });

//   useEffect(() => {
//     if (!token) {
//       setResetError("Invalid reset link or token missing.");
//     }
//   }, [token]);

//   // Function to check if all validation criteria are met
//   const areAllCriteriaMet = (criteria: typeof validationCriteria) => {
//     return criteria.hasLetter && criteria.hasNumber && criteria.hasMinLength;
//   };

//   const validatePassword = (pw: string) => {
//     let hasLetter = false;
//     let hasNumber = false;
//     let hasMinLength = false;

//     if (!pw) {
//       return {
//         hasLetter: false,
//         hasNumber: false,
//         hasMinLength: false,
//       };
//     }

//     if (pw.length >= 9) {
//       hasMinLength = true;
//     }
//     if (/[a-zA-Z]/.test(pw)) {
//       hasLetter = true;
//     }
//     if (/\d/.test(pw)) {
//       hasNumber = true;
//     }

//     return { hasLetter, hasNumber, hasMinLength };
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setPasswordRequiredError(null);
//     setConfirmPasswordError("");
//     setResetError("");
//     setResetSuccess("");
//     setIsSubmitting(true);

//     let formIsValid = true;
//     const currentCriteriaMet = areAllCriteriaMet(validationCriteria);

//     if (!password) {
//       setPasswordRequiredError("New Password is required.");
//       formIsValid = false;
//     } else if (!currentCriteriaMet) {
//       formIsValid = false;
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Confirm New Password is required.");
//       formIsValid = false;
//     } else if (password && password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//       formIsValid = false;
//     }

//     if (!formIsValid || !token) {
//       if (!token && !resetError) {
//         setResetError("Invalid reset link or token missing.");
//       }
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       await authService.resetPassword({ token, password });
//       setResetSuccess("Password reset successful! Redirecting to login...");
//       setTimeout(() => {
//         router.push("/auth/login?resetSuccess=true"); // Changed query param for clarity
//       }, 300);
//     } catch (err: unknown) {
//       let errorMessage = "Password reset failed. Please try again.";
//       if (err instanceof Error) {
//         if (err.message.includes("Invalid or expired")) {
//           errorMessage =
//             "This password reset link is invalid or has expired. Please request a new password reset link.";
//         } else if (err.message) {
//           errorMessage = err.message;
//         }
//       }
//       setResetError(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     const currentValidation = validatePassword(newPassword);
//     setValidationCriteria(currentValidation);

//     if (newPassword === "") {
//       setPasswordRequiredError("New Password is required.");
//     } else {
//       setPasswordRequiredError(null);
//     }

//     if (confirmPassword && newPassword !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//     } else if (confirmPassword && newPassword === confirmPassword) {
//       setConfirmPasswordError("");
//     }
//   };

//   const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newConfirmPassword = e.target.value;
//     setConfirmPassword(newConfirmPassword);

//     if (!newConfirmPassword && !passwordRequiredError) {
//       setConfirmPasswordError("");
//     } else if (password && newConfirmPassword !== password) {
//       setConfirmPasswordError("Passwords do not match.");
//     } else {
//       setConfirmPasswordError("");
//     }
//   };

//   // Determines if the criteria list should be shown
//   const shouldShowCriteriaList = () => {
//     return (
//       password &&
//       !passwordRequiredError &&
//       !areAllCriteriaMet(validationCriteria)
//     );
//   };

//   // Determine if the password input itself is invalid (for styling/aria)
//   const isPasswordInputInvalid =
//     !!passwordRequiredError || shouldShowCriteriaList();
//   // Determine if the confirm password input is invalid
//   const isConfirmPasswordInputInvalid = !!confirmPasswordError;

//   // Determine if the submit button should be disabled
//   const isSubmitDisabled =
//     isSubmitting ||
//     !token ||
//     !!passwordRequiredError ||
//     (password && !areAllCriteriaMet(validationCriteria)) ||
//     !confirmPassword || // Disable if confirm password empty
//     !!confirmPasswordError;

//   const errorVariants = {
//     initial: {
//       opacity: 0.5,
//       y: 10, // Start slightly below to gently rise up
//       scale: 0.95, // Start slightly smaller to subtly scale up
//       rotate: "2deg", // A very slight initial rotation for a soft lean-in
//     },
//     animate: {
//       opacity: 1,
//       y: 0, // Move to its natural position
//       scale: 1, // Scale to its normal size
//       rotate: "0deg", // Rotate to straight position
//       transition: {
//         duration: 0.3, // Slightly longer duration for a smoother feel
//         ease: "easeInOut", // Smooth start and end
//         type: "spring", // Use spring for a gentle, bouncy settle
//         stiffness: 95, // Adjust stiffness for desired bounce
//         damping: 10, // Adjust damping to control oscillation
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 10, // Move down slightly as it fades out
//       scale: 0.95, // Scale down slightly as it fades out
//       rotate: "-2deg", // Rotate slightly in the opposite direction for exit
//       transition: {
//         duration: 0.2, // Slightly faster exit
//         ease: "easeIn", // Ease in for a smooth fade out
//       },
//     },
//   };

//   return (
//     // --- Original Layout Structure ---
//     <div className="flex flex-col justify-center items-center h-[calc(100vh-82px)] px-4">
//       <div className="w-full max-w-md">
//         {/* --- Original bg-white Wrapper --- */}
//         <div className="bg-white  dark:bg-background">
//           {/* --- Original py-3 Wrapper --- */}
//           <h2 className="lg:text-3xl text-2xl capitalize text-center text-mainheading  dark:text-white font-semibold mb-4">
//             Set your new password
//           </h2>

//           {/* Reset Error Display (Original Styling) */}
//           <AnimatePresence>
//             {resetError && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative" // Original padding/gap
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                 </div>

//                 <div className="inline-block">
//                   <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {resetError}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Reset Success Display (Original Styling) */}
//           <AnimatePresence>
//             {resetSuccess && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 {/* Adjusted background/padding */}
//                 <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                 </div>

//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-neutral-900 dark:text-primary block font-medium">
//                     Password Reset Successful!
//                   </span>

//                   {/* Improved text */}
//                   <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                     Redirecting to login...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form (Conditionally rendered based on token) */}
//           {token ? (
//             <form onSubmit={handleSubmit} className="mt-10 space-y-4">
//               {/* New Password Field */}
//               <div className="relative">
//                 <label
//                   htmlFor="password"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   New Password{" "}
//                   <span className="text-red-600 dark:text-red-400">*</span>
//                 </label>
//                 <div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     // --- Original Input Classes + Dynamic Error Class ---
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       isPasswordInputInvalid
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" // Keep error state visual
//                         : "focus:border-[#5f5f5f]" // Original normal/hover
//                     }`}
//                     placeholder="••••••••" // --- Original Placeholder ---
//                     value={password}
//                     onChange={handlePasswordChange}
//                     aria-describedby={
//                       shouldShowCriteriaList()
//                         ? "password-criteria"
//                         : passwordRequiredError
//                         ? "password-required-error"
//                         : undefined
//                     }
//                     // --- Fixed aria-invalid ---
//                     aria-invalid={isPasswordInputInvalid ? "true" : undefined}
//                   />
//                   <button
//                     type="button"
//                     // --- Original Button Classes ---
//                     className="absolute right-4 top-11 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                     onClick={togglePasswordVisibility}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {/* --- Original Icon Size --- */}
//                     {showPassword ? (
//                       <LuEye size={26} />
//                     ) : (
//                       <LuEyeClosed size={26} />
//                     )}
//                   </button>
//                 </div>

//                 {/* Password Required Error (Original Styling) */}
//                 {passwordRequiredError && (
//                   <p
//                     id="password-required-error"
//                     className="flex text-red-700 items-center mt-1"
//                   >
//                     {/* Original size/margin */}
//                     <IoMdCloseCircle className="size-4 mr-1" />
//                     {/* Original size */}
//                     {passwordRequiredError}
//                   </p>
//                 )}
//                 {/* Password Criteria List (Original Styling) */}
//                 {shouldShowCriteriaList() && (
//                   <ul
//                     id="password-criteria"
//                     className="mt-2 space-y-1.5 list-none pl-0"
//                   >
//                     {/* Original size/spacing */}
//                     <li
//                       className={`flex items-center ${
//                         validationCriteria.hasMinLength
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {validationCriteria.hasMinLength ? (
//                         <IoIosCheckmarkCircle className="mr-1 size-5" /> // Original size
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 size-5" /> // Original size
//                       )}
//                       Has 9 or more characters
//                     </li>
//                     <li
//                       className={`flex items-center ${
//                         validationCriteria.hasLetter
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {validationCriteria.hasLetter ? (
//                         <IoIosCheckmarkCircle className="mr-1 size-5" /> // Original size
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 size-5" /> // Original size
//                       )}
//                       Contains a letter
//                     </li>
//                     <li
//                       className={`flex items-center ${
//                         validationCriteria.hasNumber
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {validationCriteria.hasNumber ? (
//                         <IoIosCheckmarkCircle className="mr-1 size-5" /> // Original size
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 size-5" /> // Original size
//                       )}
//                       Contains a number
//                     </li>
//                   </ul>
//                 )}
//               </div>

//               {/* Confirm New Password Field */}
//               <div className="relative">
//                 <label
//                   htmlFor="confirm-password"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   Confirm New Password <span className="text-error">*</span>
//                 </label>

//                 <div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirm-password"
//                     // --- Original Input Classes + Dynamic Error Class ---
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       isConfirmPasswordInputInvalid
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" // Keep error state visual
//                         : "focus:border-[#5f5f5f]" // Original normal/hover
//                     }`}
//                     placeholder="••••••••" // --- Original Placeholder ---
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     // --- Fixed aria-invalid ---
//                     aria-invalid={
//                       isConfirmPasswordInputInvalid ? "true" : undefined
//                     }
//                     aria-describedby={
//                       confirmPasswordError
//                         ? "confirm-password-error"
//                         : undefined
//                     }
//                   />
//                   <button
//                     type="button"
//                     // --- Original Button Classes ---
//                     className="absolute right-4 top-11 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background" // Restored original rounded-md
//                     onClick={toggleConfirmPasswordVisibility}
//                     aria-label={
//                       showConfirmPassword
//                         ? "Hide confirm password"
//                         : "Show confirm password"
//                     }
//                   >
//                     {/* --- Original Icon Size --- */}
//                     {showConfirmPassword ? (
//                       <LuEye size={26} />
//                     ) : (
//                       <LuEyeClosed size={26} />
//                     )}
//                   </button>
//                 </div>
//                 {/* Confirm Password Error (Original Styling) */}
//                 {confirmPasswordError && (
//                   <p
//                     id="confirm-password-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {confirmPasswordError}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <button
//                   type="submit"
//                   // --- Original Button Classes + Dynamic Disabled State ---
//                   className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                     isSubmitDisabled
//                       ? "bg-lightgray dark:bg-background dark:border dark:text-white cursor-not-allowed" // Original disabled style
//                       : "bg-primary hover:bg-primaryhover font-medium" // Original enabled style
//                   }`}
//                   disabled={isSubmitDisabled} // Use combined disabled logic
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
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
//                       <span>Resetting...</span>
//                     </div>
//                   ) : (
//                     "Reset password"
//                   )}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // Show message if token is missing and not already showing success
//             !resetSuccess && (
//               <div className="mt-5 text-center">
//                 {/* Error message (resetError) is displayed above */}
//                 <p className="font-medium text-gray-500 dark:text-gray-300">
//                   Please request a new password reset link.
//                 </p>
//               </div>
//             )
//           )}

//           {/* Back to Login Link (Original Structure/Styling) */}
//           {!resetSuccess && (
//             <div className="text-center mt-3">
//               <p className="text-gray-500 dark:text-gray-300">
//                 {/* Kept dark mode class if it was there */}
//                 Go back to &nbsp;
//                 <Link
//                   href="/auth/login"
//                   className="text-primary font-medium underline underline-offset-4" // Kept dark mode class
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPasswordPage;

// "use client";

// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { useRouter, useParams } from "next/navigation";
// import authService from "../../../services/auth"; // Corrected path if needed
// import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
// import { FiX } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// // --- Animation Variants (Same as LoginPage/RegisterPage/ResetPasswordForm) ---

// // Variant for the main container to orchestrate children animations
// const pageContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08, // Adjust stagger time as needed
//       delayChildren: 0.2,
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -20, // Optional: Add a slight vertical exit motion
//     transition: { duration: 0.2 },
//   },
// };

// // Variant for individual items within the container
// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.4,
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     y: -10,
//     opacity: 0,
//     transition: {
//       duration: 0.2,
//       ease: "easeIn",
//     },
//   },
// };

// // Variants for error messages
// const errorVariants = {
//   initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//   animate: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     rotate: "0deg",
//     transition: {
//       duration: 0.3,
//       ease: "easeInOut",
//       type: "spring",
//       stiffness: 95,
//       damping: 10,
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: 10,
//     scale: 0.95,
//     rotate: "-2deg",
//     transition: { duration: 0.2, ease: "easeIn" },
//   },
// };

// // Variants for success message
// const successVariants = {
//   initial: { opacity: 0, y: -20 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     transition: { duration: 0.2, ease: "easeIn" },
//   },
// };

// // --- Component ---

// const NewPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordRequiredError, setPasswordRequiredError] = useState<
//     string | null
//   >(null);
//   const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   const params = useParams();
//   const tokenFromParams = params?.token;
//   const token =
//     typeof tokenFromParams === "string" ? tokenFromParams : undefined;

//   const [validationCriteria, setValidationCriteria] = useState({
//     hasLetter: false,
//     hasNumber: false,
//     hasMinLength: false,
//   });

//   // State for animation visibility control
//   const [isResetErrorVisible, setIsResetErrorVisible] = useState(false);
//   const [isResetSuccessVisible, setIsResetSuccessVisible] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       setResetError("Invalid reset link: Token missing from URL.");
//     } else {
//       setResetError("");
//     }
//   }, [token]);

//   // Effects to control visibility for animations
//   useEffect(() => {
//     setIsResetErrorVisible(!!resetError);
//   }, [resetError]);

//   useEffect(() => {
//     setIsResetSuccessVisible(!!resetSuccess);
//   }, [resetSuccess]);

//   const areAllCriteriaMet = (criteria: typeof validationCriteria) => {
//     return criteria.hasLetter && criteria.hasNumber && criteria.hasMinLength;
//   };

//   const validatePassword = (pw: string) => {
//     return {
//       hasLetter: /[a-zA-Z]/.test(pw),
//       hasNumber: /\d/.test(pw),
//       hasMinLength: pw.length >= 9,
//     };
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setPasswordRequiredError(null);
//     setConfirmPasswordError("");
//     setResetError("");
//     setResetSuccess("");
//     setIsSubmitting(true);

//     let formIsValid = true;
//     const currentCriteriaMet = areAllCriteriaMet(validationCriteria);

//     if (!password) {
//       setPasswordRequiredError("New Password is required.");
//       formIsValid = false;
//     } else if (!currentCriteriaMet) {
//       // Password exists but doesn't meet criteria
//       formIsValid = false;
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Confirm New Password is required.");
//       formIsValid = false;
//     } else if (password && password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//       formIsValid = false;
//     }

//     if (!formIsValid || !token) {
//       if (!token && !resetError) {
//         setResetError("Invalid reset link: Token missing.");
//       }
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       await authService.resetPassword({ token, password });
//       setResetSuccess("Password reset successful! Redirecting to login...");
//       // Clear errors explicitly on success
//       setResetError("");
//       setPasswordRequiredError(null);
//       setConfirmPasswordError("");
//       // Keep submitting true until redirect
//       setTimeout(() => {
//         router.push("/auth/login?resetSuccess=true");
//       }, 2000);
//     } catch (err: any) {
//       console.error("Reset password error:", err);
//       let errorMessage =
//         "Password reset failed. Please try again or request a new link.";
//       if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
//       setResetError(errorMessage);
//       setResetSuccess(""); // Clear success on error
//       setIsSubmitting(false); // Allow retry on error
//     } finally {
//       // Only set submitting false if there was an error, otherwise wait for redirect
//       // This is handled inside catch now.
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);

//   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     const currentValidation = validatePassword(newPassword);
//     setValidationCriteria(currentValidation);

//     setPasswordRequiredError(newPassword ? null : "New Password is required.");

//     // Re-validate confirm password if it has a value
//     if (confirmPassword && newPassword !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//     } else if (confirmPassword) {
//       setConfirmPasswordError("");
//     }
//   };

//   const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newConfirmPassword = e.target.value;
//     setConfirmPassword(newConfirmPassword);
//     if (password && newConfirmPassword !== password) {
//       setConfirmPasswordError("Passwords do not match.");
//     } else {
//       setConfirmPasswordError("");
//     }
//   };

//   // Derived states for UI logic
//   const shouldShowCriteriaList = () =>
//     password &&
//     !passwordRequiredError &&
//     !areAllCriteriaMet(validationCriteria);
//   const isPasswordInputInvalid =
//     !!passwordRequiredError || shouldShowCriteriaList();
//   const isConfirmPasswordInputInvalid = !!confirmPasswordError;
//   const isSubmitDisabled =
//     isSubmitting ||
//     !!resetSuccess || // Disable if successful
//     !token ||
//     //!!resetError || // Don't disable for resetError, allow retry
//     !!passwordRequiredError ||
//     (password && !areAllCriteriaMet(validationCriteria)) ||
//     !confirmPassword ||
//     !!confirmPasswordError;

//   // --- RENDER SECTION ---
//   return (
//     <AnimatePresence mode="wait">
//       {/* Wrap the main content area */}
//       <motion.div
//         key="new-password-content"
//         className="flex flex-col justify-center items-center min-h-[calc(100vh-82px)] px-4 py-10 lg:py-0 bg-white dark:bg-background"
//         variants={pageContainerVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit" // Use exit for potential future transitions
//       >
//         <motion.div className="w-full max-w-md">

//           {/* Title */}
//           <motion.h2
//             variants={itemVariants}
//             className="lg:text-3xl text-2xl capitalize text-center text-mainheading dark:text-white font-semibold mb-4"
//           >
//             Set your new password
//           </motion.h2>

//           {/* Reset Error Display */}
//           <AnimatePresence>
//             {isResetErrorVisible && resetError && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 mb-4" // Added mb-4
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                 </div>
//                 <div className="inline-block">
//                   <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {resetError}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Reset Success Display */}
//           <AnimatePresence>
//             {isResetSuccessVisible && resetSuccess && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mb-4" // Added mb-4
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={successVariants} // Use success variants
//               >
//                 <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                 </div>
//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-neutral-900 dark:text-primary block font-medium">
//                     Password Reset Successful!
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                     Redirecting to login...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>


//           {/* Form Container (Conditionally rendered content *inside* motion.div) */}
//           <motion.div variants={itemVariants}>
//             {token && !resetSuccess ? (
//               <form onSubmit={handleSubmit} noValidate className="space-y-4">
//                 {/* New Password Field */}

//                 <motion.div className="new-password" variants={itemVariants}>
//                   <label
//                     htmlFor="password"
//                     className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                   >
//                     New Password{" "}
//                     <span className="text-red-600">*</span>
//                   </label>

//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                         isPasswordInputInvalid
//                           ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                           : "focus:border-[#5f5f5f]"
//                       }`}
//                       placeholder="•••••••••"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       aria-describedby={
//                         shouldShowCriteriaList()
//                           ? "password-criteria"
//                           : passwordRequiredError
//                           ? "password-required-error"
//                           : undefined
//                       }
//                       aria-invalid={isPasswordInputInvalid ? "true" : undefined}
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                       onClick={togglePasswordVisibility}
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <LuEye size={24} />
//                       ) : (
//                         <LuEyeClosed size={24} />
//                       )}
//                     </button>
//                   </div>

//                   {passwordRequiredError && (
//                     <p
//                       id="password-required-error"
//                       className="flex text-red-700 text-base items-center mt-0.5"
//                     >
//                       <IoMdCloseCircle className="size-5 mr-1" />{" "}
//                       {passwordRequiredError}
//                     </p>
//                   )}

//                   {shouldShowCriteriaList() && (
//                     <ul
//                       id="password-criteria"
//                       className="mt-2 space-y-1 list-none pl-0 text-sm"
//                     >
//                       {" "}
//                       {/* Adjusted size */}
//                       <li
//                         className={`flex items-center ${
//                           validationCriteria.hasMinLength
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {validationCriteria.hasMinLength ? (
//                           <IoIosCheckmarkCircle className="mr-1 size-4" />
//                         ) : (
//                           <IoMdCloseCircle className="mr-1 size-4" />
//                         )}{" "}
//                         Has 9 or more characters
//                       </li>
//                       <li
//                         className={`flex items-center ${
//                           validationCriteria.hasLetter
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {validationCriteria.hasLetter ? (
//                           <IoIosCheckmarkCircle className="mr-1 size-4" />
//                         ) : (
//                           <IoMdCloseCircle className="mr-1 size-4" />
//                         )}{" "}
//                         Contains a letter
//                       </li>
//                       <li
//                         className={`flex items-center ${
//                           validationCriteria.hasNumber
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {validationCriteria.hasNumber ? (
//                           <IoIosCheckmarkCircle className="mr-1 size-4" />
//                         ) : (
//                           <IoMdCloseCircle className="mr-1 size-4" />
//                         )}{" "}
//                         Contains a number
//                       </li>
//                     </ul>
//                   )}
//                 </motion.div>

//                 {/* Confirm New Password Field */}
//                 <motion.div className="confirm-password" variants={itemVariants}>
//                   <label
//                     htmlFor="confirm-password"
//                     className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                   >
//                     Confirm New Password{" "}
//                     <span className="text-red-600">*</span>
//                   </label>

//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       id="confirm-password"
//                       className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                         isConfirmPasswordInputInvalid
//                           ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                           : "focus:border-[#5f5f5f]"
//                       }`}
//                       placeholder="•••••••••"
//                       value={confirmPassword}
//                       onChange={handleConfirmPasswordChange}
//                       aria-invalid={
//                         isConfirmPasswordInputInvalid ? "true" : undefined
//                       }
//                       aria-describedby={
//                         confirmPasswordError
//                           ? "confirm-password-error"
//                           : undefined
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                       onClick={toggleConfirmPasswordVisibility}
//                       aria-label={
//                         showConfirmPassword
//                           ? "Hide confirm password"
//                           : "Show confirm password"
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <LuEye size={24} />
//                       ) : (
//                         <LuEyeClosed size={24} />
//                       )}
//                     </button>
//                   </div>

//                   {confirmPasswordError && (
//                     <p
//                       id="confirm-password-error"
//                       className="flex text-red-700 text-base items-center mt-0.5"
//                     >
//                       <span className="mr-1">
//                         {" "}
//                         <IoMdCloseCircle className="size-5" />{" "}
//                       </span>{" "}
//                       {confirmPasswordError}
//                     </p>
//                   )}
//                 </motion.div>

//                 {/* Submit Button */}
//                 <motion.div variants={itemVariants}>
//                   <button
//                     type="submit"
//                     className={`w-full text-neutral-900 dark:bg-primary bg-lightgray hover:bg-primaryhover font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                       isSubmitDisabled
//                         ? "opacity-50 cursor-not-allowed"
//                         : "bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer"
//                     }`}
//                     disabled={isSubmitDisabled}
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
//                           />{" "}
//                           <path
//                             d="M4.93 4.93L7.76 7.76"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
//                           <path
//                             d="M16.24 16.24L19.07 19.07"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
//                           <path
//                             d="M2 12H6"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
//                           <path
//                             d="M18 12H22"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
//                           <path
//                             d="M4.93 19.07L7.76 16.24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />{" "}
//                           <path
//                             d="M16.24 7.76L19.07 4.93"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <span>Resetting...</span>
//                       </>
//                     ) : (
//                       "Reset password"
//                     )}
//                   </button>
//                 </motion.div>
//               </form>
//             ) : (
//               // Show message if token is missing OR if reset was successful (but success message handled above)
//               <motion.div variants={itemVariants} className="mt-5 text-center">
//                 {!resetSuccess &&
//                   !resetError && ( // Only show this if no specific error/success
//                     <p className="font-medium text-gray-500 dark:text-gray-300">
//                       Invalid or missing reset token. Please request a new
//                       password reset link if needed.
//                     </p>
//                   )}
//                 {/* If there's a resetError, it's displayed above. If success, also displayed above */}
//               </motion.div>
//             )}
//           </motion.div>
//           {/* End of Form container motion.div */}
//           {/* Back to Login Link (Show unless successful) */}
//           {!resetSuccess && (
//             <motion.div variants={itemVariants} className="text-center mt-2">
//               {" "}
//               {/* Added more margin */}
//               <p className="text-gray-500 dark:text-gray-300">
//                 Go back to 
//                 <Link
//                   href="/auth/login"
//                   className="text-primary font-medium underline underline-offset-4"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </motion.div>
//           )}
//         </motion.div>
//       </motion.div>{" "}
//       {/* End of main content motion wrapper */}
//     </AnimatePresence>
//   );
// };

// export default NewPasswordPage;



"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import authService from "../../../services/auth"; // Ensure this path is correct
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { LuEye, LuEyeOff } from "react-icons/lu";

// --- Animation Variants (Copied from LoginPage/ResetPasswordPage) ---
const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const errorVariants = {
  initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: "0deg",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      type: "spring",
      stiffness: 95,
      damping: 10,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    rotate: "-2deg",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const successVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordRequiredError, setPasswordRequiredError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const tokenFromParams = params?.token;
  const token = typeof tokenFromParams === "string" ? tokenFromParams : undefined;

  const [validationCriteria, setValidationCriteria] = useState({
    hasLetter: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const [isResetErrorVisible, setIsResetErrorVisible] = useState(false);
  const [isResetSuccessVisible, setIsResetSuccessVisible] = useState(false);

  useEffect(() => {
    if (!token && !resetSuccess) { // Only set token error if not already successful
      setResetError("Invalid or expired reset link. Please request a new one if needed.");
    } else {
      setResetError(""); // Clear token error if token exists or success
    }
  }, [token, resetSuccess]);

  useEffect(() => {
    setIsResetErrorVisible(!!resetError);
  }, [resetError]);

  useEffect(() => {
    setIsResetSuccessVisible(!!resetSuccess);
  }, [resetSuccess]);

  const areAllCriteriaMet = (criteria: typeof validationCriteria) => {
    return criteria.hasLetter && criteria.hasNumber && criteria.hasMinLength;
  };

  const validatePassword = (pw: string) => {
    return {
      hasLetter: /[a-zA-Z]/.test(pw),
      hasNumber: /\d/.test(pw),
      hasMinLength: pw.length >= 8, // Standard 8 characters
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordRequiredError(null);
    setConfirmPasswordError("");
    setResetError(""); // Clear general errors before submission
    setResetSuccess("");
    setIsSubmitting(true);

    let formIsValid = true;
    const currentCriteriaMet = areAllCriteriaMet(validationCriteria);

    if (!password) {
      setPasswordRequiredError("New Password is required.");
      formIsValid = false;
    } else if (!currentCriteriaMet) {
      setPasswordRequiredError("Password does not meet all criteria."); // General criteria error
      formIsValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm New Password is required.");
      formIsValid = false;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      formIsValid = false;
    }

    if (!formIsValid || !token) {
      if (!token && !resetError) { // Re-check token specifically if not already set
        setResetError("Invalid or expired reset link.");
      }
      setIsSubmitting(false);
      return;
    }

    try {
      await authService.resetPassword({ token, password });
      setResetSuccess("Password reset successful!");
      setPasswordRequiredError(null);
      setConfirmPasswordError("");
      setResetError("");
      // isSubmitting remains true during the success message display and redirect
      setTimeout(() => {
        router.push("/auth/login?resetSuccess=true");
      }, 2000);
    } catch (err: any) {
      let errorMessage = "Password reset failed. The link may be invalid, expired, or an issue occurred. Please try again or request a new link.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setResetError(errorMessage);
      setResetSuccess("");
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const currentValidation = validatePassword(newPassword);
    setValidationCriteria(currentValidation);

    if (newPassword) {
        setPasswordRequiredError(null); // Clear "required" error if field has content
    } // "Does not meet criteria" error is handled in handleSubmit

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else if (confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const shouldShowCriteriaList = () => password && !areAllCriteriaMet(validationCriteria) && !passwordRequiredError;
  const isPasswordInputInvalid = !!passwordRequiredError || (password && !areAllCriteriaMet(validationCriteria) && !passwordRequiredError);
  const isConfirmPasswordInputInvalid = !!confirmPasswordError;

  const isSubmitDisabled =
    isSubmitting ||
    !!resetSuccess ||
    !token ||
    !!passwordRequiredError ||
    (password && !areAllCriteriaMet(validationCriteria)) ||
    !confirmPassword ||
    !!confirmPasswordError;


  const newPasswordSteps = [
    { num: 1, title: "Request Reset", active: false },
    { num: 2, title: "Check Your Email", active: false },
    { num: 3, title: "Set New Password", active: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:p-3">
      {/* Left Panel - Visible on large screens */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] bg-[url(/assets/images/leftPartImage.png)] bg-cover bg-no-repeat bg-center p-10 xl:p-16 rounded-3xl flex-col justify-between relative">
        <div className="absolute top-16 xl:left-16 ">
          <Link href={"/"}>
            <Image
              src="/assets/images/main_logo.svg"
              width={200}
              height={90}
              alt="Remityn Logo"
            />
          </Link>
        </div>

        <div className="flex-grow flex flex-col justify-end items-start text-white pt-20">
          <motion.h1
            className="text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Secure Your Account
            <br />
            Create a New Password
          </motion.h1>
          <motion.p
            className="text-base xl:text-lg text-gray-200 mb-10 xl:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Choose a strong, unique password to keep your account safe.
            <br />
            Make sure it meets the criteria below.
          </motion.p>

          <div className="flex xl:flex-row flex-col gap-4 w-full">
            {newPasswordSteps.map((step) => (
              <motion.div
                key={step.num}
                className={`flex flex-col justify-between xl:w-50 xl:h-50 w-full h-26 p-3.5 xl:p-4 rounded-xl ${
                  step.active ? "bg-white shadow-lg" : "bg-white/12"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`flex items-center justify-center size-7 xl:size-10 rounded-full mr-3 xl:mr-4 shrink-0 ${
                    step.active
                      ? "bg-background text-white"
                      : "bg-white/12 text-white"
                  } font-semibold text-lg`}
                >
                  {step.num}
                </div>
                <span
                  className={`text-lg ${
                    step.active
                      ? "font-medium text-mainheading"
                      : "text-gray-200"
                  }`}
                >
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        <div className="lg:hidden mb-10 self-center">
          <Link href={"/"}>
            <Image
              src="/assets/images/main_logo.svg"
              width={200}
              height={90}
              alt="Remityn Logo"
            />
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="w-full max-w-sm md:max-w-md"
            key="new-password-form-container"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={`space-y-1 mb-6 ${
                resetSuccess ? 'text-center' : 'lg:text-left text-center'
              }`}
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl text-mainheadingWhite font-semibold">
                Set New Password {/* Heading text remains, alignment changes */}
              </h2>
              <p className="text-gray-400">
                {resetSuccess
                  ? "Invalid or missing reset token. Please request a new password reset link if needed." // New description on success
                  : "Please create a new password for your account."}
              </p>
            </motion.div>

            <AnimatePresence>
              {isResetErrorVisible && resetError && (
                <motion.div
                  key="reset-error-msg"
                  className="bg-primary-foreground rounded-xl p-4 flex items-center gap-3 mb-5"
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={errorVariants}
                >
                  <div className="flex bg-red-600/20 justify-center rounded-full items-center size-10 shrink-0">
                    <FiX className="text-red-500 size-6" />
                  </div>
                  <div>
                    <p className="text-white text-sm">{resetError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isResetSuccessVisible && resetSuccess && (
                <motion.div
                  key="reset-success-msg"
                  className="bg-primary-foreground p-4 rounded-xl flex items-center gap-3 mb-5"
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={successVariants}
                >
                  <div className="flex bg-green-600/20 justify-center rounded-full items-center size-10 shrink-0">
                    <FaCheck className="text-green-500 size-5" />
                  </div>
                  <div>
                    <span className="text-white block font-medium text-sm">
                      {resetSuccess}
                    </span>
                    <span className="text-white block text-xs">
                      Redirecting to login...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {token && !resetSuccess ? (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="text-white inline-block mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10
                        ${
                          isPasswordInputInvalid || passwordRequiredError
                            ? "border-red-600 ring-1 ring-red-600"
                            : "border-primarybox"
                        }`}
                      value={password}
                      onChange={handlePasswordChange}
                      aria-invalid={!!(isPasswordInputInvalid || passwordRequiredError)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-300 focus:outline-none"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <LuEye size={18} /> : <LuEyeOff size={18} />}
                    </button>
                  </div>
                  {passwordRequiredError && (
                     <p className="flex text-red-500 text-sm items-center mt-1">
                       <IoMdCloseCircle className="size-3.5 mr-1" /> {passwordRequiredError}
                     </p>
                  )}
                  {/* Password Criteria List - Styled like LoginPage errors/info */}
                  {password && ( // Show criteria always if password field is touched
                    <ul className="mt-1.5 space-y-0.5 list-none pl-0 text-xs">
                      <li className={`flex items-center ${validationCriteria.hasMinLength ? "text-green-500" : "text-red-500"}`}>
                        {validationCriteria.hasMinLength ? <IoIosCheckmarkCircle className="mr-1 size-3.5" /> : <IoMdCloseCircle className="mr-1 size-3.5" />}
                        At least 8 characters
                      </li>
                      <li className={`flex items-center ${validationCriteria.hasLetter ? "text-green-500" : "text-red-500"}`}>
                        {validationCriteria.hasLetter ? <IoIosCheckmarkCircle className="mr-1 size-3.5" /> : <IoMdCloseCircle className="mr-1 size-3.5" />}
                        Contains a letter
                      </li>
                      <li className={`flex items-center ${validationCriteria.hasNumber ? "text-green-500" : "text-red-500"}`}>
                        {validationCriteria.hasNumber ? <IoIosCheckmarkCircle className="mr-1 size-3.5" /> : <IoMdCloseCircle className="mr-1 size-3.5" />}
                        Contains a number
                      </li>
                    </ul>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="confirm-password"
                    className="text-white inline-block mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10
                        ${
                          confirmPasswordError
                            ? "border-red-600 ring-1 ring-red-600"
                            : "border-primarybox"
                        }`}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      aria-invalid={!!confirmPasswordError}
                    />
                     <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-300 focus:outline-none"
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <LuEye size={18} /> : <LuEyeOff size={18} />}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p className="flex text-red-500 text-sm items-center mt-1">
                      <IoMdCloseCircle className="size-3.5 mr-1" /> {confirmPasswordError}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    className={`bg-primary hover:bg-primaryhover w-full text-mainheading font-semibold py-3 px-8 h-14 rounded-lg transition-all duration-75 ease-linear flex items-center justify-center 
                      ${
                        isSubmitDisabled
                          ? "opacity-70 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    disabled={isSubmitDisabled}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-4 w-4 text-mainheading animate-spin mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Resetting Password...</span>
                      </>
                    ) : (
                      "Set New Password"
                    )}
                  </button>
                </motion.div>
              </form>
            ) : (
              // Message if token is invalid or after success (but success message is handled above)
              !resetSuccess && ( // Only show if not already showing success
                 <motion.div variants={itemVariants} className="text-center mt-6">
                    {/* General error already displayed if `resetError` is set */}
                    <p className="text-gray-400">
                        Go back to{" "}
                        <Link
                        href="/auth/login"
                        className="text-primary hover:text-primaryhover font-medium underline underline-offset-2 transition-all duration-75 ease-linear"
                        >
                        Log In
                        </Link>
                        { " " }or try to{ " " }
                        <Link
                        href="/auth/forgot-password"
                        className="text-primary hover:text-primaryhover font-medium underline underline-offset-2 transition-all duration-75 ease-linear"
                        >
                        request a new link
                        </Link>.
                    </p>
                </motion.div>
              )
            )}
             {/* "Back to Login" link shown when form is active and not successful yet */}
            {token && !resetSuccess && !resetError && (
                <motion.div variants={itemVariants} className="text-center mt-6">
                    <Link
                    href="/auth/login"
                    className="text-primary hover:text-primaryhover font-medium underline underline-offset-2 transition-all duration-75 ease-linear"
                    >
                    Back to Log In
                    </Link>
                </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}