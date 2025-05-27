// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     // --- START OF FIX ---
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState(''); // State for session expired message
//     // --- END OF FIX ---
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

//     // Check for query params from URL
//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         // --- START OF FIX ---
//         const sessionExpired = urlParams.get('sessionExpired'); // Check for sessionExpired param
//         // --- END OF FIX ---

//         // --- START OF FIX ---
//         // Set the appropriate message and clear others
//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage(''); // Clear other message
//             // Optional: remove the query param from URL without reload (more complex)
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage(''); // Clear other message
//             // Optional: remove the query param
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else {
//             // Clear messages if neither param is present
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//         // --- END OF FIX ---

//     }, [searchParams]); // Re-run if searchParams change

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 // Redirect to dashboard or intended page after successful login
//                 const redirectUrl = searchParams.get('redirect') || '/dashboard';
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 500); // Short delay after login confirmation

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         // --- START OF FIX ---
//         // Clear notification messages on new attempt
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         // --- END OF FIX ---
//         setForgotPasswordSuccess('');

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//             // Redirect is handled by the useEffect watching the `user` state
//         } catch (err) {
//             console.error("Login error in component:", err);
//             // More specific error handling based on backend response if available
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             } else {
//                 setLoginError(err.message || 'An unexpected error occurred during login.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     // --- START OF FIX ---
//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage(''); // Function to close the session expired message
//     };
//     // --- END OF FIX ---

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white">
//                     {/* Inactive logout message */}
//                     {inactiveLogoutMessage && (

//                         <div className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-gray justify-center rounded-full items-center lg:size-12 size-10">
//                                 <AiOutlineInfo className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray text-sm lg:text-base block max-w-60">{inactiveLogoutMessage}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseInactiveLogoutMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-gray fill-current hover:bg-green/8 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {/* Forgot Password Success Message (if redirected from forgot password flow) */}
//                     {forgotPasswordSuccess && (
//                         <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-green justify-center rounded-full items-center size-12">
//                                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleForgotPasswordSuccessDismiss}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-base text-center text-gray font-light mb-4">
//                             New to Wise?
//                             <Link
//                                 href="/auth/register"
//                                 className="text-secondary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {loginError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoClose className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{loginError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseLoginError}
//                                 >
//                                     <IoClose
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${emailError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray text-sm block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${passwordError
//                                             ? "border-error border-2 !shadow-none"
//                                             : "border-[#c9cbce] hover:shadow-color"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-secondary size-5" /> : <VscEye className="text-secondary size-5" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-secondary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// frontend/src/pages/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FiX } from 'react-icons/fi';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     // --- START OF FIX ---
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState(''); // State for session expired message
//     // --- END OF FIX ---
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

//     // Check for query params from URL
//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         // --- START OF FIX ---
//         const sessionExpired = urlParams.get('sessionExpired'); // Check for sessionExpired param
//         // --- END OF FIX ---

//         // --- START OF FIX ---
//         // Set the appropriate message and clear others
//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage(''); // Clear other message
//             // Optional: remove the query param from URL without reload (more complex)
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage(''); // Clear other message
//             // Optional: remove the query param
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else {
//             // Clear messages if neither param is present
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//         // --- END OF FIX ---

//     }, [searchParams]); // Re-run if searchParams change

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 // Redirect to dashboard or intended page after successful login
//                 let redirectUrl = '/dashboard'; // Default for normal users
//                 if (user.role === 'admin') {
//                     redirectUrl = '/admin'; // Redirect for admins
//                 }
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 500); // Short delay after login confirmation

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         // --- START OF FIX ---
//         // Clear notification messages on new attempt
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         // --- END OF FIX ---
//         setForgotPasswordSuccess('');

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//             // Redirect is handled by the useEffect watching the `user` state
//         } catch (err) {
//             console.error("Login error in component:", err);
//             // More specific error handling based on backend response if available
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             } else {
//                 setLoginError(err.message || 'An unexpected error occurred during login.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     // --- START OF FIX ---
//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage(''); // Function to close the session expired message
//     };
//     // --- END OF FIX ---

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">
//                     {/* Inactive logout message */}
//                     {inactiveLogoutMessage && (

//                         <div className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-gray justify-center rounded-full items-center lg:size-12 size-10">
//                                 <AiOutlineInfo className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray text-sm lg:text-base block max-w-60">{inactiveLogoutMessage}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseInactiveLogoutMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-gray fill-current hover:bg-green/8 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}
//                     {/* Session expired message */}
//                     {sessionExpiredMessage && (
//                         <div className="flex bg-red-200 border-l-4 border-red-500 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative" role="alert">
//                             <div className="flex bg-red-500 justify-center rounded-full items-center lg:size-12 size-10">
//                                 <IoClose className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <p className="font-bold">Session Expired</p>
//                                 <p className="text-sm lg:text-base block max-w-60">{sessionExpiredMessage}</p>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseSessionExpiredMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-red-500 fill-current hover:bg-red-200 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {/* Forgot Password Success Message (if redirected from forgot password flow) */}
//                     {forgotPasswordSuccess && (
//                         <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-green justify-center rounded-full items-center size-12">
//                                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleForgotPasswordSuccessDismiss}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {loginError && (
//                             <div
//                                 className="bg-lightgray dark:bg-red-600/20 border rounded-xl p-4 flex items-center gap-4 relative"
//                                 role="alert"
//                             >
//                                 <div className="p-1 bg-red-700 rounded-full">
//                                     <FiX size={24} className="text-lightgray" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray-500 dark:text-white  block max-w-60">{loginError}</span>
//                                 </div>
//                             </div>
//                         )}

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-error border-2 !shahdow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);

//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         const sessionExpired = urlParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }

//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 let redirectUrl = '/dashboard';
//                 if (user.role === 'admin') {
//                     redirectUrl = '/admin';
//                 }
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 500);

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     useEffect(() => {
//         if (loginError) {
//             setIsLoginErrorVisible(true);
//         } else {
//             setIsLoginErrorVisible(false);
//         }
//     }, [loginError]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false); // Ensure error is hidden before new submission
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         setForgotPasswordSuccess('');

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//         } catch (err) {
//             console.error("Login error in component:", err);
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Invalid email address and password combination.');
//             } else {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage('');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//         setIsLoginErrorVisible(false); // Hide error message when close button is clicked
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     // Framer Motion variants for animation
//     const errorVariants = {
//         initial: { opacity: 0, y: -20, },
//         animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">

//                     {inactiveLogoutMessage && (
//                         <div className="flex bg-lightgray dark:bg-white/5 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex dark:bg-white bg-black/80  justify-center rounded-full items-center lg:size-12 size-10">
//                                 <AiOutlineInfo className="p-0.5 dark:text-mainheading text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray-500 dark:text-gray-300 text-sm lg:text-base block max-w-70">{inactiveLogoutMessage}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-3"
//                                 onClick={handleCloseInactiveLogoutMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full dark:text-white text-mainheading fill-current hover:bg-lightborder dark:hover:bg-primarybox size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {sessionExpiredMessage && (
//                         <div className="flex bg-red-200 border-l-4 border-red-700 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative" role="alert">
//                             <div className="flex bg-red-500 justify-center rounded-full items-center lg:size-12 size-10">
//                                 <IoClose className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <p className="font-bold">Session Expired</p>
//                                 <p className="text-sm lg:text-base block max-w-60">{sessionExpiredMessage}</p>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseSessionExpiredMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-red-500 fill-current hover:bg-red-200 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {forgotPasswordSuccess && (
//                         <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-green justify-center rounded-full items-center size-12">
//                                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleForgotPasswordSuccessDismiss}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         <AnimatePresence> {/* AnimatePresence to handle exit animation */}
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div // Use motion.div for animation
//                                     className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={errorVariants}
//                                 >
//                                     <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                     </div>

//                                     <div>
//                                         <span className="text-gray-500 dark:text-white block max-w-60 ">{loginError}</span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-red-700 border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-red-700 border-2 !shahdow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
// import { FaCheck } from 'react-icons/fa6'; // Import FaCheck icon

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
//     const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false); // State to control login success visibility

//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         const sessionExpired = urlParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }

//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 let redirectUrl = '/dashboard';
//                 if (user.role === 'admin') {
//                     redirectUrl = '/admin';
//                 }
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 300); // delay for success message

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     useEffect(() => {
//         if (loginError) {
//             setIsLoginErrorVisible(true);
//             setIsLoginSuccessVisible(false); // Hide success message if error occurs
//         } else {
//             setIsLoginErrorVisible(false);
//         }
//     }, [loginError]);

//     useEffect(() => {
//         if (loginSuccess) {
//             setIsLoginSuccessVisible(true);
//             setIsLoginErrorVisible(false); // Hide error message if success occurs
//         } else {
//             setIsLoginSuccessVisible(false);
//         }
//     }, [loginSuccess]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false); // Ensure error is hidden before new submission
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         setForgotPasswordSuccess('');
//         setLoginSuccess(false); // Reset loginSuccess on new submission
//         setIsLoginSuccessVisible(false); // Ensure success message is hidden before new submission

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//             setLoginSuccess(true); // Set login success state
//         } catch (err) {
//             console.error("Login error in component:", err);
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Invalid email address and password combination.');
//             } else {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage('');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//         setIsLoginErrorVisible(false); // Hide error message when close button is clicked
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     // // Framer Motion variants for animation
//     // const errorVariants = {
//     //     initial: { opacity: 0, y: -20, },
//     //     animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//     //     exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
//     // };

//     const errorVariants = {
//         initial: {
//             opacity: 0.5,
//             y: 10,         // Start slightly below to gently rise up
//             scale: 0.95,   // Start slightly smaller to subtly scale up
//             rotate: "2deg", // A very slight initial rotation for a soft lean-in
//         },
//         animate: {
//             opacity: 1,
//             y: 0,          // Move to its natural position
//             scale: 1,      // Scale to its normal size
//             rotate: "0deg", // Rotate to straight position
//             transition: {
//                 duration: 0.3,       // Slightly longer duration for a smoother feel
//                 ease: "easeInOut",   // Smooth start and end
//                 type: "spring",      // Use spring for a gentle, bouncy settle
//                 stiffness: 95,       // Adjust stiffness for desired bounce
//                 damping: 10,        // Adjust damping to control oscillation
//             },
//         },
//         exit: {
//             opacity: 0,
//             y: 10,         // Move down slightly as it fades out
//             scale: 0.95,   // Scale down slightly as it fades out
//             rotate: "-2deg",// Rotate slightly in the opposite direction for exit
//             transition: {
//                 duration: 0.2,       // Slightly faster exit
//                 ease: "easeIn",      // Ease in for a smooth fade out
//             },
//         },
//     };

//     const successVariants = {
//         initial: { opacity: 0, y: -20 },
//         animate: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.3, ease: "easeOut" },
//         },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">

//                     {/* User Inactive-LogoutMessage */}
//                     <AnimatePresence>
//                         {inactiveLogoutMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex dark:bg-yellow-600/20 bg-black/80 justify-center rounded-full items-center lg:size-12 size-10">
//                                     <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{inactiveLogoutMessage}</span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* User SessionExpiredMessage */}
//                     <AnimatePresence>
//                         {sessionExpiredMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                     <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                 </div>

//                                 <div>
//                                     <p className="font-medium">Session Expired Please Try Again!</p>
//                                     <p className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{sessionExpiredMessage}</p>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* User ForgotPasswordSuccess Massage */}
//                     <AnimatePresence>
//                         {forgotPasswordSuccess && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4 "
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
//                                     <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{forgotPasswordSuccess}</span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {/* User LoginError Massage */}
//                         <AnimatePresence>
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div
//                                     className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={errorVariants}
//                                 >
//                                     <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                     </div>

//                                     <div>
//                                         <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{loginError}</span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* User Success Message Display */}
//                         <AnimatePresence>
//                             {isLoginSuccessVisible && loginSuccess && (
//                                 <motion.div
//                                     className="flex bg-lightgray dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={successVariants}
//                                 >
//                                     {/* Adjusted background/padding */}
//                                     <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
//                                     </div>
//                                     <div className="flex-grow space-y-0.5">
//                                         <span className="text-mainheading dark:text-primary block font-medium">
//                                             Login successful!
//                                         </span>
//                                         {/* Improved text */}
//                                         <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                                             Redirecting to dashboard...
//                                         </span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-red-700 border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-red-700 border-2 !shahdow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading dark:text-white font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Assuming this service exists and is correctly implemented
// import { useAuth } from '../../contexts/AuthContext'; // Assuming this hook exists and is correctly implemented
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { AiOutlineInfo } from "react-icons/ai";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCheck } from 'react-icons/fa6';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading, isAdmin } = useAuth(); // Get user and loading state
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//     useEffect(() => {
//         const urlParams = new URLSearchParams(searchParams.toString());
//         const autoLogout = urlParams.get('autoLogout');
//         const sessionExpired = urlParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         // This effect handles redirection *after* the user state is updated by login()
//         if (!loading && user) {
//             console.log("Login successful, checking KYC status:", user.kycStatus);

//             let redirectUrl = '';

//             // Determine redirect based on role and KYC status
//             if (isAdmin) {
//                 redirectUrl = '/admin'; // Admins go straight to admin panel
//             } else {
//                 switch (user.kycStatus) {
//                     case 'not_started':
//                     case 'rejected':
//                     case 'skipped': // Treat skipped like not_started for initial flow
//                         redirectUrl = '/kyc/start'; // Start the KYC flow
//                         break;
//                     case 'pending':
//                         redirectUrl = '/kyc/pending'; // Go to a pending status page
//                         break;
//                     case 'verified':
//                         redirectUrl = '/dashboard'; // Go to the main dashboard
//                         break;
//                     default:
//                         redirectUrl = '/dashboard'; // Fallback to dashboard
//                 }
//             }

//             console.log("Redirecting logged-in user to:", redirectUrl);
//              // Delay redirection slightly to allow success message to show
//              const timeoutId = setTimeout(() => {
//                 router.push(redirectUrl);
//             }, 500); // Adjust delay as needed

//             return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
//         }
//     }, [user, loading, router, isAdmin]); // Depend on user, loading, router, isAdmin

//     useEffect(() => {
//         setIsLoginErrorVisible(!!loginError);
//     }, [loginError]);

//     useEffect(() => {
//         setIsLoginSuccessVisible(loginSuccess);
//     }, [loginSuccess]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false);
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         setLoginSuccess(false);
//         setIsLoginSuccessVisible(false);

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             // The login function updates the AuthContext state (user)
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             setLoginSuccess(true); // Show success message
//             login(loggedInUser, token); // This triggers the useEffect above
//             // **Remove direct redirection from here**
//         } catch (err) {
//             console.error("Login error in component:", err);
//              const message = err.message || 'Sorry, that email or password didn\'t work.';
//              if (message.toLowerCase().includes('invalid credentials')) {
//                  setLoginError('Invalid email address and password combination.');
//              } else {
//                  setLoginError(message);
//              }
//              setIsLoginErrorVisible(true);
//              setLoginSuccess(false);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const errorVariants = {
//         initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//         animate: { opacity: 1, y: 0, scale: 1, rotate: "0deg", transition: { duration: 0.3, ease: "easeInOut", type: "spring", stiffness: 95, damping: 10 } },
//         exit: { opacity: 0, y: 10, scale: 0.95, rotate: "-2deg", transition: { duration: 0.2, ease: "easeIn" } },
//     };

//     const successVariants = {
//         initial: { opacity: 0, y: -20 },
//         animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">

//                     {/* User Inactive-LogoutMessage */}
//                     <AnimatePresence>
//                         {inactiveLogoutMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex dark:bg-yellow-600/20 bg-black/80 justify-center rounded-full items-center lg:size-12 size-10">
//                                     <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{inactiveLogoutMessage}</span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* User SessionExpiredMessage */}
//                     <AnimatePresence>
//                         {sessionExpiredMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                     <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                 </div>
//                                 <div>
//                                     <p className="font-medium">Session Expired Please Try Again!</p>
//                                     <p className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{sessionExpiredMessage}</p>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {/* User LoginError Massage */}
//                         <AnimatePresence>
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div
//                                     className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={errorVariants}
//                                 >
//                                     <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                     </div>
//                                     <div>
//                                         <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{loginError}</span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* User Success Message Display */}
//                         <AnimatePresence>
//                             {isLoginSuccessVisible && loginSuccess && (
//                                 <motion.div
//                                     className="flex bg-lightgray dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={successVariants}
//                                 >
//                                     <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
//                                     </div>
//                                     <div className="flex-grow space-y-0.5">
//                                         <span className="text-mainheading dark:text-primary block font-medium">
//                                             Login successful!
//                                         </span>
//                                         {/* <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                                             Redirecting to dashboard...
//                                         </span> */}
//                                         <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                                             Checking account status... {/* Updated message */}
//                                         </span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <button
//                                     type="button" // Changed to button type for accessibility and preventing form submission
//                                     className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3"
//                                     onClick={() => alert('Continue with Google functionality not implemented.')} // Example action
//                                 >
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </button>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     placeholder='Your Email'
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-red-700 border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         placeholder='Your Password'
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-red-700 border-2 !shadow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading dark:text-white font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/login/page.tsx
// "use client";

// import { useState, useEffect, FormEvent } from "react"; // Import FormEvent
// import authService from "../../services/auth"; // Assuming this service exists and is correctly implemented
// import { useAuth } from "../../contexts/AuthContext"; // Assuming this hook exists and is correctly implemented
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// import { VscEye } from "react-icons/vsc";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { AiOutlineInfo } from "react-icons/ai";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck } from "react-icons/fa6";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const { login, user, loading, isAdmin } = useAuth(); // Get user and loading state
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState("");
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const autoLogout = urlParams.get("autoLogout");
//     const sessionExpired = urlParams.get("sessionExpired");

//     if (sessionExpired === "true") {
//       setSessionExpiredMessage(
//         "Your session has expired. Please log in again."
//       );
//       setInactiveLogoutMessage("");
//     } else if (autoLogout === "true") {
//       setInactiveLogoutMessage(
//         "We logged you out because you were inactive for a while — it's to help keep your account secure."
//       );
//       setSessionExpiredMessage("");
//     } else {
//       setInactiveLogoutMessage("");
//       setSessionExpiredMessage("");
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     // This effect handles redirection *after* the user state is updated by login()
//     if (!loading && user) {
//       console.log("Login successful, checking KYC status:", user.kyc?.status);

//       let redirectUrl = "";

//       // Determine redirect based on role and KYC status
//       if (isAdmin) {
//         redirectUrl = "/admin"; // Admins go straight to admin panel
//       } else {
//         switch (user.kyc?.status) {
//           case "not_started":
//           case "rejected":
//           case "skipped": // Treat skipped like not_started for initial flow
//             redirectUrl = "/kyc/start"; // Start the KYC flow
//             break;
//           case "pending":
//             redirectUrl = "/kyc/pending"; // Go to a pending status page
//             break;
//           case "verified":
//             redirectUrl = "/dashboard"; // Go to the main dashboard
//             break;
//           default:
//             redirectUrl = "/dashboard"; // Fallback to dashboard
//         }
//       }

//       console.log("Redirecting logged-in user to:", redirectUrl);
//       // Delay redirection slightly to allow success message to show
//       const timeoutId = setTimeout(() => {
//         router.push(redirectUrl);
//       }, 500); // Adjust delay as needed

//       return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
//     }
//   }, [user, loading, router, isAdmin]); // Depend on user, loading, router, isAdmin

//   useEffect(() => {
//     setIsLoginErrorVisible(!!loginError);
//   }, [loginError]);

//   useEffect(() => {
//     setIsLoginSuccessVisible(loginSuccess);
//   }, [loginSuccess]);

//   // Fix 1: Add type React.FormEvent<HTMLFormElement> to 'e'
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setLoginError("");
//     setIsLoginErrorVisible(false);
//     setInactiveLogoutMessage("");
//     setSessionExpiredMessage("");
//     setLoginSuccess(false);
//     setIsLoginSuccessVisible(false);

//     let isValid = true;
//     if (!email) {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       // The login function updates the AuthContext state (user)
//       const { user: loggedInUser, token } = await authService.login({
//         email,
//         password,
//       });
//       console.log("Login successful in component");
//       setLoginSuccess(true); // Show success message
//       login(loggedInUser, token); // This triggers the useEffect above
//       // **Remove direct redirection from here**
//     } catch (err) {
//       // 'err' is initially 'unknown'
//       console.error("Login error in component:", err);

//       // Fix 2: Check the type of 'err' before accessing properties
//       let message = "Sorry, that email or password didn't work."; // Default message
//       if (err instanceof Error) {
//         // If it's an Error instance, use its message
//         message = err.message || message;
//       } else if (typeof err === "string") {
//         // If it's just a string, use the string as the message
//         message = err;
//       }
//       // Potentially add more checks here if your authService can throw other types of errors

//       // Now use the determined message
//       if (message.toLowerCase().includes("invalid credentials")) {
//         setLoginError("Invalid email address and password combination.");
//       } else {
//         setLoginError(message);
//       }
//       setIsLoginErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const errorVariants = {
//     initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotate: "0deg",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//         type: "spring",
//         stiffness: 95,
//         damping: 10,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 10,
//       scale: 0.95,
//       rotate: "-2deg",
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };

//   const successVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   return (
//     <div className="bg-white dark:bg-background">
//       <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//         <div className="w-full max-w-md lg:mt-20 mt-10">
//           {/* User Inactive-LogoutMessage */}

//           <AnimatePresence>
//             {inactiveLogoutMessage && (
//               <motion.div
//                 className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex dark:bg-yellow-600/20 bg-main/60 justify-center rounded-full items-center lg:size-12 size-10">
//                   <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray-500 dark:text-gray-300 text-sm lg:text-base block max-w-60 leading-relaxed">
//                     {inactiveLogoutMessage}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* User SessionExpiredMessage */}
//           <AnimatePresence>
//             {sessionExpiredMessage && (
//               <motion.div
//                 className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//                 </div>
//                 <div>
//                   <p className="font-medium">
//                     Session Expired Please Try Again!
//                   </p>
//                   <p className="text-mainheading dark:text-whit text-sm lg:text-base block max-w-60 leading-relaxed">
//                     {sessionExpiredMessage}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="py-3">
//             <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//               Welcome back.
//             </h2>

//             <p className="text-center text-gray-700 dark:text-gray-300 font-light mb-4">
//               New to Wise?
//               <Link
//                 href="/auth/register"
//                 className="text-primary font-medium underline underline-offset-4"
//               >
//                 Sign up
//               </Link>
//             </p>

//             {/* User LoginError Massage */}
//             <AnimatePresence>
//               {isLoginErrorVisible && loginError && (
//                 <motion.div
//                   className={`dark:bg-white/5 bg-gray/10 rounded-2xl p-4 flex items-center gap-4 relative`}
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants}
//                 >
//                   <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//                   </div>
//                   <div>
//                     <span className="text-mainheading dark:text-white text-sm lg:text-base block max-w-60 leading-relaxed">
//                       {loginError}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* User Success Message Display */}
//             <AnimatePresence>
//               {isLoginSuccessVisible && loginSuccess && (
//                 <motion.div
//                   className="flex bg-gray/10 dark:bg-white/5 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={successVariants}
//                 >
//                   <div className="flex dark:bg-primary/20 bg-green-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FaCheck className="p-0.5 text-white dark:text-primary lg:size-8 size-6" />
//                   </div>
//                   <div className="flex-grow space-y-0.5">
//                     <span className="text-mainheading dark:text-primary block font-medium">
//                       Login successful!
//                     </span>
//                     <span className="text-mainheading dark:text-gray-300 block text-sm">
//                       Checking account status... {/* Updated message */}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//               <div>
//                 <button
//                   type="button" // Changed to button type for accessibility and preventing form submission
//                   className="flex dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                   onClick={() =>
//                     alert("Continue with Google functionality not implemented.")
//                   } // Example action
//                 >
//                   <Image
//                     src="/assets/icon/google.svg"
//                     width={30}
//                     height={30}
//                     alt="Continue with Google"
//                   />
//                   Continue with Google
//                 </button>
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Your email address <span className="text-error">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Your Email"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                     emailError
//                       ? "border-red-700 border-2 !shadow-none"
//                       : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                   }`}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   aria-invalid={!!emailError} // Added for accessibility
//                   aria-describedby={emailError ? "email-error" : undefined} // Added for accessibility
//                 />
//                 {emailError && (
//                   <p
//                     id="email-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//
//                     {/* Added id */}
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {emailError}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Your password <span className="text-error">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Your Password"
//                     className={`mt-1 block px-4 dark:bg-background py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       passwordError
//                         ? "border-red-700 border-2 !shadow-none"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     aria-invalid={!!passwordError} // Added for accessibility
//                     aria-describedby={
//                       passwordError ? "password-error" : undefined
//                     } // Added for accessibility
//                   />
//                   <button
//                     type="button"
//                     className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                     onClick={togglePasswordVisibility}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     } // Added for accessibility
//                   >
//                     {showPassword ? (
//                       <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" />
//                     ) : (
//                       <VscEye className="text-mainheading size-5 dark:text-white" />
//                     )}
//                   </button>
//                 </div>
//                 {passwordError && (
//                   <p
//                     id="password-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//
//                     {/* Added id */}
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {passwordError}
//                   </p>
//                 )}
//               </div>

//               <div className="text-right">
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-mainheading dark:text-primary inline-block font-medium underline text-sm lg:text-base underline-offset-4"
//                 >
//                   Forgot Password ?
//                 </Link>
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   type="submit"
//                   className={`rounded-full text-mainheading w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium lg:py-3 py-2 lg:h-12.5 transition-colors
//                                     ${
//                                       isSubmitting
//                                         ? "bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed"
//                                         : "bg-primary hover:bg-primaryhover text-mainheading"
//                                     }
//                                 `}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex gap-4 justify-center items-center">
//                       <svg
//                         className="size-5 text-mainheading dark:text-white font-medium animate-spin"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//
//                         {/* Added aria-hidden */}
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
//                       Logging in...
//                     </div>
//                   ) : (
//                     "Log in"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/auth/login/page.tsx
// "use client";

// import { useState, useEffect, FormEvent } from "react"; // Import FormEvent
// import authService from "../../services/auth"; // Assuming this service exists and is correctly implemented
// import { useAuth } from "../../contexts/AuthContext"; // Assuming this hook exists and is correctly implemented
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// import { VscEye } from "react-icons/vsc";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { AiOutlineInfo } from "react-icons/ai";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig"; // Import API config for base URL

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const { login, user, loading, isAdmin } = useAuth(); // Get user and loading state
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState("");
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);
//   const [googleError, setGoogleError] = useState(""); // State for Google-specific errors

//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const autoLogout = urlParams.get("autoLogout");
//     const sessionExpired = urlParams.get("sessionExpired");
//  const googleErr = urlParams.get("googleError"); // Check for Google errors from backend redirect
//     const registerSuccessParam = urlParams.get("registerSuccess"); // Check for successful registration redirect

//     if (googleErr) {
//         setGoogleError(decodeURIComponent(googleErr));
//         setLoginError(""); // Clear general login error
//         setInactiveLogoutMessage("");
//         setSessionExpiredMessage("");
//         setIsLoginErrorVisible(false); // Don't show general error box
//         // Clean the URL
//         router.replace('/auth/login', undefined); // Use replace to remove query params
//     } else if (sessionExpired === "true") {
//         setSessionExpiredMessage("Your session has expired. Please log in again.");
//         setInactiveLogoutMessage("");
//         setGoogleError("");
//     } else if (autoLogout === "true") {
//         setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//         setSessionExpiredMessage("");
//         setGoogleError("");
//     } else if (registerSuccessParam === "true") {
//          // Optionally show a success message after registration redirect
//          // setLoginSuccess(true); // Maybe reuse success state? Or a dedicated one.
//          // setIsLoginSuccessVisible(true);
//          console.log("Registration successful!");
//          // Clean the URL
//          router.replace('/auth/login', undefined);
//     } else {
//         setInactiveLogoutMessage("");
//         setSessionExpiredMessage("");
//         setGoogleError("");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]); // Rerun when searchParams change

//   useEffect(() => {
//     if (!loading && user) {
//         console.log("Login successful (or already logged in), checking KYC status:", user.kyc?.status);
//         let redirectUrl = "";
//         if (isAdmin) { redirectUrl = "/admin"; }
//         else {
//             switch (user.kyc?.status) {
//                 case "not_started": case "rejected": case "skipped": redirectUrl = "/kyc/start"; break;
//                 case "pending": redirectUrl = "/kyc/pending"; break;
//                 case "verified": redirectUrl = "/dashboard"; break;
//                 default: redirectUrl = "/dashboard";
//             }
//         }
//         console.log("Redirecting logged-in user to:", redirectUrl);
//         const timeoutId = setTimeout(() => { router.push(redirectUrl); }, loginSuccess ? 500 : 0); // Delay only if showing success message
//         return () => clearTimeout(timeoutId);
//     }
//   }, [user, loading, router, isAdmin, loginSuccess]); // Added loginSuccess dependency

//   useEffect(() => { setIsLoginErrorVisible(!!loginError); }, [loginError]);
//   useEffect(() => { setIsLoginSuccessVisible(loginSuccess); }, [loginSuccess]);

//   // Fix 1: Add type React.FormEvent<HTMLFormElement> to 'e'
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailError(""); setPasswordError(""); setLoginError(""); setGoogleError(""); // Reset all errors
//     setIsLoginErrorVisible(false); setInactiveLogoutMessage(""); setSessionExpiredMessage("");
//     setLoginSuccess(false); setIsLoginSuccessVisible(false);

//     let isValid = true;
//     if (!email) { setEmailError("Email is required"); isValid = false; }
//     if (!password) { setPasswordError("Password is required"); isValid = false; }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       const { user: loggedInUser, token } = await authService.login({ email, password });
//       console.log("Login successful in component");
//       setLoginSuccess(true);
//       login(loggedInUser, token); // Triggers useEffect for redirection
//     } catch (err: any) { // Catch any type
//       console.error("Login error in component:", err);
//       // Extract message more reliably
//       let message = err?.response?.data?.message || err?.message || "Sorry, that email or password didn't work.";
//       setLoginError(message); // Use the extracted message
//       setIsLoginErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//    // --- Google Login Handler ---
//    const handleGoogleLogin = () => {
//     setLoginError(""); // Clear previous errors
//     setGoogleError("");
//     // Redirect browser to the backend endpoint that starts the Google flow
//     window.location.href = `${apiConfig.baseUrl}/auth/google`; // Use configured base URL
// };

//   const errorVariants = {
//     initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotate: "0deg",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//         type: "spring",
//         stiffness: 95,
//         damping: 10,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 10,
//       scale: 0.95,
//       rotate: "-2deg",
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };

//   const successVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   return (
//     <div className="bg-white dark:bg-background">
//       <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//         <div className="w-full max-w-md lg:mt-20 mt-10">
//           {/* User Inactive-LogoutMessage */}

//           <AnimatePresence>
//             {inactiveLogoutMessage && (
//               <motion.div
//                 className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex dark:bg-yellow-600/20 bg-main/60 justify-center rounded-full items-center lg:size-12 size-10">
//                   <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray-500 dark:text-gray-300 text-sm lg:text-base block max-w-60 leading-relaxed">
//                     {inactiveLogoutMessage}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* User SessionExpiredMessage */}
//           <AnimatePresence>
//             {sessionExpiredMessage && (
//               <motion.div
//                 className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//                 </div>
//                 <div>
//                   <p className="font-medium">
//                     Session Expired Please Try Again!
//                   </p>
//                   <p className="text-mainheading dark:text-whit text-sm lg:text-base block max-w-60 leading-relaxed">
//                     {sessionExpiredMessage}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="py-3">
//             <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//               Welcome back.
//             </h2>

//             <p className="text-center text-gray-700 dark:text-gray-300 font-light mb-4">
//               New to Wise?
//               <Link
//                 href="/auth/register"
//                 className="text-primary font-medium underline underline-offset-4"
//               >
//                 Sign up
//               </Link>
//             </p>

//             {/* User LoginError Massage */}
//             <AnimatePresence>
//               {isLoginErrorVisible && loginError && (
//                 <motion.div
//                   className={`dark:bg-white/5 bg-gray/10 rounded-2xl p-4 flex items-center gap-4 relative`}
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants}
//                 >
//                   <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//                   </div>
//                   <div>
//                     <span className="text-mainheading dark:text-white text-sm lg:text-base block max-w-60 leading-relaxed">
//                       {loginError}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* User Success Message Display */}
//             <AnimatePresence>
//               {isLoginSuccessVisible && loginSuccess && (
//                 <motion.div
//                   className="flex bg-gray/10 dark:bg-white/5 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={successVariants}
//                 >
//                   <div className="flex dark:bg-primary/20 bg-green-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FaCheck className="p-0.5 text-white dark:text-primary lg:size-8 size-6" />
//                   </div>
//                   <div className="flex-grow space-y-0.5">
//                     <span className="text-mainheading dark:text-primary block font-medium">
//                       Login successful!
//                     </span>
//                     <span className="text-mainheading dark:text-gray-300 block text-sm">
//                       Checking account status... {/* Updated message */}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//               <div>
//                 {/* --- Updated Google Button --- */}
//                 <button
//                   type="button" // Keep type="button"
//                   className="flex dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base hover:shadow-md transition-shadow" // Added hover effect
//                   onClick={handleGoogleLogin} // Use the new handler
//                 >
//                   <Image src="/assets/icon/google.svg" width={30} height={30} alt="Continue with Google" />
//                   Continue with Google
//                 </button>
//                 {/* --------------------------- */}
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Your email address <span className="text-error">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Your Email"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                     emailError
//                       ? "border-red-700 border-2 !shadow-none"
//                       : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                   }`}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   aria-invalid={!!emailError} // Added for accessibility
//                   aria-describedby={emailError ? "email-error" : undefined} // Added for accessibility
//                 />
//                 {emailError && (
//                   <p
//                     id="email-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//
//                     {/* Added id */}
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {emailError}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Your password <span className="text-error">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Your Password"
//                     className={`mt-1 block px-4 dark:bg-background py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                       passwordError
//                         ? "border-red-700 border-2 !shadow-none"
//                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                     }`}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     aria-invalid={!!passwordError} // Added for accessibility
//                     aria-describedby={
//                       passwordError ? "password-error" : undefined
//                     } // Added for accessibility
//                   />
//                   <button
//                     type="button"
//                     className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                     onClick={togglePasswordVisibility}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     } // Added for accessibility
//                   >
//                     {showPassword ? (
//                       <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" />
//                     ) : (
//                       <VscEye className="text-mainheading size-5 dark:text-white" />
//                     )}
//                   </button>
//                 </div>
//                 {passwordError && (
//                   <p
//                     id="password-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//
//                     {/* Added id */}
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {passwordError}
//                   </p>
//                 )}
//               </div>

//               <div className="text-right">
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-mainheading dark:text-primary inline-block font-medium underline text-sm lg:text-base underline-offset-4"
//                 >
//                   Forgot Password ?
//                 </Link>
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   type="submit"
//                   className={`rounded-full text-mainheading w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium lg:py-3 py-2 lg:h-12.5 transition-colors
//                                     ${
//                                       isSubmitting
//                                         ? "bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed"
//                                         : "bg-primary hover:bg-primaryhover text-mainheading"
//                                     }
//                                 `}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex gap-4 justify-center items-center">
//                       <svg
//                         className="size-5 text-mainheading dark:text-white font-medium animate-spin"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//
//                         {/* Added aria-hidden */}
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
//                       Logging in...
//                     </div>
//                   ) : (
//                     "Log in"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, FormEvent } from "react";
// import authService from "../../services/auth";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// import { VscEye } from "react-icons/vsc";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { AiOutlineInfo } from "react-icons/ai";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const { login, user, loading, isAdmin } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState("");
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);
//   const [googleError, setGoogleError] = useState("");

//   // Effect to read query params and clean URL (Functional Change)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const autoLogout = urlParams.get("autoLogout");
//     const sessionExpired = urlParams.get("sessionExpired");
//     const googleErr = urlParams.get("googleError");
//     const registerSuccessParam = urlParams.get("registerSuccess");
//     let urlNeedsCleaning = false;

//     // Clear previous messages
//     setInactiveLogoutMessage("");
//     setSessionExpiredMessage("");
//     setGoogleError("");
//     setLoginError("");
//     setIsLoginErrorVisible(false); // Ensure error box is hidden initially

//     if (googleErr) {
//       setGoogleError(decodeURIComponent(googleErr));
//       urlNeedsCleaning = true;
//     } else if (sessionExpired === "true") {
//       setSessionExpiredMessage("Your session has expired. Please log in again.");
//       urlNeedsCleaning = true;
//     } else if (autoLogout === "true") {
//       setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//       urlNeedsCleaning = true;
//     } else if (registerSuccessParam === "true") {
//       console.log("Registration successful!");
//       urlNeedsCleaning = true;
//     }

//     if (urlNeedsCleaning) {
//       router.replace('/auth/login', undefined);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   // Effect to redirect logged-in users (Rely on AuthContext for actual redirect)
//   useEffect(() => {
//     if (!loading && user) {
//       console.log("Login page: User is logged in. AuthContext will handle redirection.");
//       // No router.push here - AuthContext handles it
//     }
//   }, [user, loading]); // Removed isAdmin and router from deps as redirect is external

//   // Effects to control visibility based on state changes (for animations)
//   useEffect(() => {
//     setIsLoginErrorVisible(!!loginError || !!googleError); // Show if either error exists
//    }, [loginError, googleError]);
//   useEffect(() => { setIsLoginSuccessVisible(loginSuccess); }, [loginSuccess]);

//   // Handle form submission (Functional Change)
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Reset errors & messages
//     setEmailError(""); setPasswordError(""); setLoginError(""); setGoogleError("");
//     setIsLoginErrorVisible(false); setInactiveLogoutMessage(""); setSessionExpiredMessage("");
//     setLoginSuccess(false); setIsLoginSuccessVisible(false);
//     router.replace('/auth/login', undefined); // Clean URL on submit

//     let isValid = true;
//     if (!email) { setEmailError("Email is required"); isValid = false; }
//     if (!password) { setPasswordError("Password is required"); isValid = false; }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       const { user: loggedInUser, token } = await authService.login({ email, password });
//       console.log("Login successful in component");
//       setLoginSuccess(true); // Show success message
//       // Update AuthContext - it will handle the redirection.
//       login(loggedInUser, token);
//     } catch (err: any) {
//       console.error("Login error in component:", err);
//       // Improved Error Message Extraction
//       let message = "Sorry, that email or password didn't work.";
//       if (err.response?.data?.message) {
//         message = err.response.data.message;
//       } else if (err.message) {
//         message = err.message;
//       }
//       setLoginError(message);
//       setIsLoginErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // --- Google Login Handler (Functional Change) ---
//   const handleGoogleLogin = () => {
//     setLoginError("");
//     setGoogleError("");
//     // Redirect browser to the backend endpoint
//     window.location.href = `${apiConfig.baseUrl}/auth/google`;
//   };

//   // Animation variants (Keeping your original definitions)
//   const errorVariants = {
//     initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotate: "0deg",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//         type: "spring",
//         stiffness: 95,
//         damping: 10,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 10,
//       scale: 0.95,
//       rotate: "-2deg",
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };

//   const successVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   // --- JSX structure and classes reverted to your original ---
//   return (
//     <div className="bg-white dark:bg-background">
//       <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//         <div className="w-full max-w-md lg:mt-20 mt-10">
//           {/* Inactivity Logout Message */}
//           <AnimatePresence>
//             {inactiveLogoutMessage && (
//               <motion.div
//                 className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex dark:bg-yellow-600/20 bg-main/60 justify-center rounded-full items-center lg:size-12 size-10">
//                   <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                 </div>
//                 <div>
//                   <span className="text-gray-500 dark:text-gray-300 text-sm lg:text-base block max-w-60 leading-relaxed">
//                     {inactiveLogoutMessage}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Session Expired Message */}
//           <AnimatePresence>
//             {sessionExpiredMessage && (
//               <motion.div
//                 className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                  {/* Using FiX icon as in your original potentially */}
//                 <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//                 </div>
//                 <div>
//                   {/* Displaying the message as in your original */}
//                    <p className="font-medium text-mainheading dark:text-white"> {/* Assuming this styling */}
//                     Session Expired Please Try Again!
//                   </p>
//                   <p className="text-mainheading dark:text-whit text-sm lg:text-base block max-w-60 leading-relaxed"> {/* Assuming this styling */}
//                     {sessionExpiredMessage}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Title and Sign Up Link */}
//           <div className="py-3 space-y-2">
//             <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white font-semibold">
//               Welcome back.
//             </h2>
//             <p className="text-center text-gray-700 dark:text-gray-300 font-light">
//               New to Wise?
//               <Link
//                  href="/auth/register"
//                 className="text-primary font-medium underline underline-offset-4"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>

//           {/* General Login Error / Google Error Message */}
//           <AnimatePresence>
//             {isLoginErrorVisible && (loginError || googleError) && ( // Check both error states
//               <motion.div
//                 // Using original classes, assuming this was the intended style for general errors
//                 className={`dark:bg-white/5 bg-gray/10 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//                 </div>
//                 <div>
//                   <span className="text-mainheading dark:text-white text-sm lg:text-base block max-w-60 leading-relaxed">
//                     {loginError || googleError} {/* Display the relevant error */}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Success Message Display */}
//           <AnimatePresence>
//             {isLoginSuccessVisible && loginSuccess && (
//               <motion.div
//                 className="flex bg-gray/10 dark:bg-white/5 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4" // Original success style
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={successVariants}
//               >
//                 <div className="flex dark:bg-primary/20 bg-green-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-white dark:text-primary lg:size-8 size-6" />
//                 </div>
//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-mainheading dark:text-primary block font-medium">
//                     Login successful!
//                   </span>
//                   <span className="text-mainheading dark:text-gray-300 block text-sm">
//                     Checking account status...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form - Using original structure and classes */}
//           <form className="space-y-5 mt-5" onSubmit={handleSubmit} noValidate>
//             {/* Google Button */}
//             <div>
//               <button
//                 type="button"
//                 className="flex dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                 onClick={handleGoogleLogin} // Functional change: Use the handler
//               >
//                 <Image src="/assets/icon/google.svg" width={30} height={30} alt="Continue with Google" />
//                 Continue with Google
//               </button>
//             </div>

//              {/* Removed the "OR" separator if it wasn't in your original */}

//             {/* Email Input */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//               >
//                 Your email address <span className="text-error">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Your Email"
//                 autoComplete="email" // Keep autocomplete
//                 className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                   emailError
//                     ? "border-red-700 border-2 !shadow-none" // Original error class
//                     : "hover:shadow-darkcolor dark:hover:shadow-whitecolor" // Original hover class
//                 }`}
//                 value={email}
//                 onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }} // Clear error on change
//                 aria-invalid={!!emailError}
//                 aria-describedby={emailError ? "email-error" : undefined}
//               />
//               {emailError && (
//                 <p
//                   id="email-error"
//                   className="flex text-red-700 text-base items-center mt-0.5" // Original error text style
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {emailError}
//                 </p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//               >
//                 Your password <span className="text-error">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="Your Password"
//                   autoComplete="current-password" // Keep autocomplete
//                   className={`mt-1 block px-4 dark:bg-background py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
//                     passwordError
//                       ? "border-red-700 border-2 !shadow-none" // Original error class
//                       : "hover:shadow-darkcolor dark:hover:shadow-whitecolor" // Original hover class
//                   }`}
//                   value={password}
//                   onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }} // Clear error on change
//                   aria-invalid={!!passwordError}
//                   aria-describedby={passwordError ? "password-error" : undefined}
//                 />
//                 <button
//                   type="button"
//                   className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background bg-white p-3 rounded-md" // Original button style
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> // Original icon style
//                   ) : (
//                     <VscEye className="text-mainheading size-5 dark:text-white" /> // Original icon style
//                   )}
//                 </button>
//               </div>
//               {passwordError && (
//                 <p
//                   id="password-error"
//                   className="flex text-red-700 text-base items-center mt-0.5" // Original error text style
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {passwordError}
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <Link
//                 href="/auth/forgot-password"
//                 className="text-mainheading dark:text-primary inline-block font-medium underline text-sm lg:text-base underline-offset-4" // Original style
//               >
//                 Forgot Password ?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-between items-center mb-4">
//               <button
//                 type="submit"
//                 className={`rounded-full text-mainheading w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium lg:py-3 py-2 lg:h-12.5 transition-colors
//                   ${ // Original classes for submit button state
//                     isSubmitting
//                       ? "bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed"
//                       : "bg-primary hover:bg-primaryhover text-mainheading"
//                   }
//                 `}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   // Original loading indicator structure
//                   <div className="flex gap-4 justify-center items-center">
//                     <svg
//                       className="size-5 text-mainheading dark:text-white font-medium animate-spin"
//                       viewBox="0 0 24 24"
//                       aria-hidden="true"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12" cy="12" r="10"
//                         stroke="currentColor" strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Logging in...
//                   </div>
//                 ) : (
//                   "Log in"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, FormEvent } from "react";
// import authService from "../../services/auth";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// // Removed: import { AiOutlineInfo } from "react-icons/ai"; // No longer needed for inactivity msg
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const { login, user, loading, isAdmin } = useAuth(); // isAdmin might not be needed here now if redirect relies solely on AuthContext
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   // Removed: const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState("");
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);
//   const [googleError, setGoogleError] = useState("");

//   // Effect to read query params and clean URL (Functional Change)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     // Removed: const autoLogout = urlParams.get("autoLogout");
//     const sessionExpired = urlParams.get("sessionExpired");
//     const googleErr = urlParams.get("googleError");
//     const registerSuccessParam = urlParams.get("registerSuccess");
//     let urlNeedsCleaning = false;

//     // Clear previous messages
//     // Removed: setInactiveLogoutMessage("");
//     setSessionExpiredMessage("");
//     setGoogleError("");
//     setLoginError("");
//     setIsLoginErrorVisible(false); // Ensure error box is hidden initially

//     if (googleErr) {
//       setGoogleError(decodeURIComponent(googleErr));
//       urlNeedsCleaning = true;
//     } else if (sessionExpired === "true") {
//       setSessionExpiredMessage(
//         "Your session has expired. Please log in again."
//       );
//       urlNeedsCleaning = true;
//     }
//     // Removed: else if (autoLogout === "true") { ... }
//     else if (registerSuccessParam === "true") {
//       console.log("Registration successful!"); // Or show a success message if needed
//       urlNeedsCleaning = true;
//     }

//     if (urlNeedsCleaning) {
//       // Use replaceState to clean the URL without adding to history
//       window.history.replaceState(null, "", "/auth/login");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]); // Keep dependency on searchParams to react to URL changes

//   // Effect to redirect logged-in users (Rely on AuthContext for actual redirect)
//   useEffect(() => {
//     if (!loading && user) {
//       console.log(
//         "Login page: User is logged in. AuthContext will handle redirection."
//       );
//       // No router.push here - AuthContext handles it
//     }
//   }, [user, loading]); // Removed isAdmin and router from deps as redirect is external

//   // Effects to control visibility based on state changes (for animations)
//   useEffect(() => {
//     setIsLoginErrorVisible(!!loginError || !!googleError); // Show if either error exists
//   }, [loginError, googleError]);
//   useEffect(() => {
//     setIsLoginSuccessVisible(loginSuccess);
//   }, [loginSuccess]);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setLoginError("");
//     setGoogleError("");
//     setIsLoginErrorVisible(false);
//     setSessionExpiredMessage("");
//     setLoginSuccess(false);
//     setIsLoginSuccessVisible(false);
//     window.history.replaceState(null, "", "/auth/login");

//     let isValid = true;
//     if (!email) {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       const { user: loggedInUser, token } = await authService.login({
//         email,
//         password,
//       });
//       console.log("Login successful in component");
//       setLoginSuccess(true);
//       login(loggedInUser, token);
//     } catch (err: any) {
//       console.error("Login error in component:", err);
//       let message = "Sorry, that email or password didn't work.";
//       if (err.response?.data?.message) {
//         message = err.response.data.message;
//       } else if (err.message) {
//         message = err.message;
//       }
//       setLoginError(message);
//       setIsLoginErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleGoogleLogin = () => {
//     setLoginError("");
//     setGoogleError("");
//     window.location.href = `${apiConfig.baseUrl}/auth/google`;
//   };

//   const errorVariants = {
//     initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotate: "0deg",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//         type: "spring",
//         stiffness: 95,
//         damping: 10,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 10,
//       scale: 0.95,
//       rotate: "-2deg",
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };

//   const successVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   // --- JSX structure and classes reverted to your original ---
//   return (

//     <div className="bg-white dark:bg-background">
//       <div className="flex flex-col justify-center items-center h-[calc(100vh-82px)] px-4">
//         <div className="w-full max-w-md lg:mt-20 mt-10">
//           {/* Session Expired Message */}
//           <AnimatePresence>
//             {sessionExpiredMessage && (
//               <motion.div
//                 className="bg-lightgray dark:bg-primarybox rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-red-600 lg:size-8 size-6" />
//                 </div>

//                 <div className="inline-block">
//                   {/* Displaying the message as in your original */}
//                   <p className="font-medium text-neutral-900 text-sm lg:text-base dark:text-white">
//                     {/* Assuming this styling */}
//                     Session Expired Please Try Again!
//                   </p>
//                   <p className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {sessionExpiredMessage} text is not fine for all times
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Title and Sign Up Link */}
//           <div className="space-y-2">
//             <h2 className="lg:text-3xl text-2xl text-center text-neutral-900 dark:text-white font-medium">
//               Welcome back.
//             </h2>
//             <p className="text-center text-gray-500 dark:text-gray-300">
//               New to Wise?
//               <Link href="/auth/register">
//                 <span className="text-primary font-medium capitalize underline underline-offset-4">
//                   Sign up
//                 </span>
//               </Link>
//             </p>
//           </div>

//           {/* General Login Error / Google Error Message */}
//           <AnimatePresence>
//             {isLoginErrorVisible &&
//               (loginError || googleError) && ( // Check both error states
//                 <motion.div
//                   // Using original classes, assuming this was the intended style for general errors
//                   className={`dark:bg-primarybox bg-lightgray rounded-2xl p-4 flex items-center gap-4 relative my-4`}
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants}
//                 >
//                   <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-red-600 lg:size-8 size-6" />
//                   </div>

//                   <div className="inline-block">
//                     <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                       {loginError || googleError}
//                       {/* Display the relevant error */}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//           </AnimatePresence>

//           {/* Success Message Display */}
//           <AnimatePresence>
//             {isLoginSuccessVisible && loginSuccess && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative my-4" // Original success style
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={successVariants}
//               >
//                 <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                 </div>
//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-neutral-900 dark:text-primary block font-medium">
//                     Login successful!
//                   </span>

//                   <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                     Checking account status...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form - Using original structure and classes */}
//           <form className="space-y-4 mt-5" onSubmit={handleSubmit} noValidate>
//             {/* Google Button */}
//             <div>
//               <button
//                 type="button"
//                 className="flex dark:bg-background border justify-center rounded-lg h-14 text-neutral-900 dark:text-white w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                 onClick={handleGoogleLogin} // Functional change: Use the handler
//               >
//                 <Image
//                   src="/assets/icon/google.svg"
//                   width={28}
//                   height={28}
//                   alt="Continue with Google"
//                 />
//                 Continue with Google
//               </button>
//             </div>

//             {/* Email Input */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Your email address
//                 <span className="text-red-600 dark:text-red-400">*</span>
//               </label>

//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Your Email"
//                 autoComplete="email" // Keep autocomplete
//                 className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                   emailError
//                     ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" // Original error class
//                     : "focus:border-[#5f5f5f]" // Original hover class
//                 }`}
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (emailError) setEmailError("");
//                 }} // Clear error on change
//                 aria-invalid={!!emailError}
//                 aria-describedby={emailError ? "email-error" : undefined}
//               />

//               {emailError && (
//                 <p
//                   id="email-error"
//                   className="flex text-red-700 text-base items-center mt-0.5" // Original error text style
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {emailError}
//                 </p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <label
//                 htmlFor="password"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Your password
//                 <span className="text-red-600 dark:text-red-400">*</span>
//               </label>

//               <div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="Your Password"
//                   autoComplete="current-password" // Keep autocomplete
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                     passwordError
//                       ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" // Original error class
//                       : "focus:border-[#5f5f5f]" // Original hover class
//                   }`}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (passwordError) setPasswordError("");
//                   }} // Clear error on change
//                   aria-invalid={!!passwordError}
//                   aria-describedby={
//                     passwordError ? "password-error" : undefined
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-11 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background" // Original button style
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <LuEye size={26} /> // Original icon style
//                   ) : (
//                     <LuEyeClosed size={26} /> // Original icon style
//                   )}
//                 </button>
//               </div>
//               {passwordError && (
//                 <p
//                   id="password-error"
//                   className="flex text-red-700 text-base items-center mt-0.5" // Original error text style
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {passwordError}
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <Link
//                 href="/auth/forgot-password"
//                 className="inline-block" // Original style
//               >
//                 <span className="text-neutral-900 dark:text-primary font-medium underline text-sm lg:text-base underline-offset-4">
//                   Forgot Password ?
//                 </span>
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-between items-center mb-4">
//               <button
//                 type="submit"
//                 className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center
//                   ${
//                     // Original classes for submit button state
//                     isSubmitting
//                       ? "bg-gray-300 dark:bg-background border dark:text-white text-neutral-900 cursor-not-allowed"
//                       : "bg-primary hover:bg-primaryhover text-neutral-900"
//                   }
//                 `}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
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
//                         strokeWidth="2"users
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
//                     <span>Logging in...</span>
//                   </>
//                 ) : (
//                   "Log in"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, FormEvent } from "react";
// import authService from "../../services/auth";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   // Combined error state for login/google issues
//   const [generalError, setGeneralError] = useState("");
//   const { login, user, loading } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isGeneralErrorVisible, setIsGeneralErrorVisible] = useState(false); // Visibility for general error
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const sessionExpired = urlParams.get("sessionExpired");
//     const googleErr = urlParams.get("googleError");
//     const registerSuccessParam = urlParams.get("registerSuccess");
//     const resetSuccessParam = urlParams.get("resetSuccess");
//     let urlNeedsCleaning = false;

//     setSessionExpiredMessage("");
//     setGeneralError(""); // Clear general error
//     setIsGeneralErrorVisible(false);

//     if (googleErr) {
//       setGeneralError(decodeURIComponent(googleErr)); // Use general error state
//       urlNeedsCleaning = true;
//     } else if (sessionExpired === "true") {
//       setSessionExpiredMessage(
//         "Your session has expired. Please log in again."
//       );
//       urlNeedsCleaning = true;
//     } else if (registerSuccessParam === "true") {
//       console.log("Registration successful parameter detected.");
//       urlNeedsCleaning = true;
//     } else if (resetSuccessParam === "true") {
//       console.log("Password reset successful parameter detected.");
//       urlNeedsCleaning = true;
//     }

//     if (urlNeedsCleaning) {
//       window.history.replaceState(null, "", "/auth/login");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   useEffect(() => {
//     if (!loading && user) {
//       console.log("Login page: User logged in. AuthContext handles redirect.");
//       // AuthContext handles redirection based on user state
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     setIsGeneralErrorVisible(!!generalError); // Update visibility based on generalError
//   }, [generalError]);

//   useEffect(() => {
//     setIsLoginSuccessVisible(loginSuccess);
//   }, [loginSuccess]);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setGeneralError(""); // Clear general error
//     setIsGeneralErrorVisible(false);
//     setSessionExpiredMessage(""); // Clear session expired msg on new attempt
//     setLoginSuccess(false);
//     setIsLoginSuccessVisible(false);

//     let isValid = true;
//     if (!email) {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       const { user: loggedInUser, token } = await authService.login({
//         email,
//         password,
//       });
//       console.log("Login successful in component");
//       setLoginSuccess(true); // Show success message
//       login(loggedInUser, token); // Update AuthContext
//       // AuthContext useEffect will handle redirection
//     } catch (err: any) {
//       // --- MODIFICATION START: Comment out or remove the console.error line ---
//       // console.error("Login error in component:", err); // This line logs the error to the console
//       // --- MODIFICATION END ---

//       let message = "Sorry, that email or password didn't work."; // Default
//       // This part correctly extracts the message from the backend (like the Google Sign-In error)
//       if (err.response?.data?.message) {
//         message = err.response.data.message; // Use backend message
//       } else if (err.message) {
//         // Fallback for network errors or other non-API errors
//         message = err.message;
//       }
//       setGeneralError(message); // Set the specific error message for UI display
//       setIsGeneralErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleGoogleLogin = () => {
//     setGeneralError(""); // Clear any previous errors
//     setIsGeneralErrorVisible(false);
//     setSessionExpiredMessage("");
//     window.location.href = `${apiConfig.baseUrl}/auth/google`;
//   };

//   const errorVariants = {
//     /* ... (keep existing variants) ... */
//     initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       rotate: "0deg",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//         type: "spring",
//         stiffness: 95,
//         damping: 10,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 10,
//       scale: 0.95,
//       rotate: "-2deg",
//       transition: { duration: 0.2, ease: "easeIn" },
//     },
//   };
//   const successVariants = {
//     /* ... (keep existing variants) ... */ initial: { opacity: 0, y: -20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   // --- RENDER SECTION (No changes needed here) ---
//   return (
//     <div className="bg-white dark:bg-background">
//       <div className="flex flex-col items-center h-[calc(100vh-82px)] px-4">
//         <div className="w-full max-w-md lg:mt-20 mt-10">
//           {/* Session Expired Message */}
//           <AnimatePresence>
//             {sessionExpiredMessage && (
//               <motion.div
//                 className="bg-lightgray dark:bg-primarybox rounded-2xl p-4 flex items-center gap-4 mb-4"
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
//                   <p className="font-medium text-neutral-900 text-sm lg:text-base dark:text-white">
//                     Session Expired
//                   </p>
//                   <p className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {sessionExpiredMessage}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Title and Sign Up Link */}
//           <div className="space-y-2">
//             <h2 className="lg:text-3xl text-2xl text-center text-neutral-900 dark:text-white font-medium">
//               Welcome back.
//             </h2>
//             <p className="text-center text-gray-500 dark:text-gray-300">
//               New to Wise?
//               <Link href="/auth/register">
//                 <span className="text-primary font-medium capitalize underline underline-offset-4">
//                   Sign up
//                 </span>
//               </Link>
//             </p>
//           </div>

//           {/* General Login Error / Google Error Message */}
//           <AnimatePresence>
//             {isGeneralErrorVisible && generalError && (
//               <motion.div
//                 className={`dark:bg-primarybox bg-lightgray rounded-2xl p-4 flex items-center gap-4 my-4`}
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
//                     {generalError}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Success Message Display */}
//           <AnimatePresence>
//             {isLoginSuccessVisible && loginSuccess && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center my-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={successVariants}
//               >
//                 <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                 </div>
//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-neutral-900 dark:text-primary block font-medium">
//                     Login successful!
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                     Checking account status...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form */}
//           <form className="space-y-4 mt-5" onSubmit={handleSubmit} noValidate>
//             {/* Google Button */}
//             <div>
//               <button
//                 type="button"
//                 className="flex dark:bg-background border justify-center rounded-lg h-14 text-neutral-900 dark:text-white w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                 onClick={handleGoogleLogin}
//               >
//                 <Image
//                   src="/assets/icon/google.svg"
//                   width={28}
//                   height={28}
//                   alt="Continue with Google"
//                 />
//                 Continue with Google
//               </button>
//             </div>

//             {/* Email Input */}
//             <div className="email">
//               <label
//                 htmlFor="email"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Your email address
//                 <span className="text-red-600 dark:text-red-400">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Your Email"
//                 autoComplete="email"
//                 className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                   emailError
//                     ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                     : "focus:border-[#5f5f5f]"
//                 }`}
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (emailError) setEmailError("");
//                 }}
//                 aria-invalid={!!emailError}
//                 aria-describedby={emailError ? "email-error" : undefined}
//               />
//               {emailError && (
//                 <p
//                   id="email-error"
//                   className="flex text-red-700 text-base items-center mt-0.5"
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {emailError}
//                 </p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div className="password">
//               <label
//                 htmlFor="password"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Your password
//                 <span className="text-red-600 dark:text-red-400">*</span>
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="Your Password"
//                   autoComplete="current-password"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                     passwordError
//                       ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                       : "focus:border-[#5f5f5f]"
//                   }`}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (passwordError) setPasswordError("");
//                   }}
//                   aria-invalid={!!passwordError}
//                   aria-describedby={
//                     passwordError ? "password-error" : undefined
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <LuEye size={22} />
//                   ) : (
//                     <LuEyeClosed size={22} />
//                   )}
//                 </button>
//               </div>
//               {passwordError && (
//                 <p
//                   id="password-error"
//                   className="flex text-red-700 text-base items-center mt-0.5"
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {passwordError}
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <Link href="/auth/forgot-password" className="inline-block">
//                 <span className="text-neutral-900 dark:text-primary font-medium underline text-sm lg:text-base underline-offset-4">
//                   Forgot Password ?
//                 </span>
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-between items-center mb-4">
//               <button
//                 type="submit"
//                 className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                   isSubmitting
//                     ? "bg-gray-300 dark:bg-background border dark:text-white text-neutral-900 cursor-not-allowed"
//                     : "bg-primary hover:bg-primaryhover text-neutral-900"
//                 }`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
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
//                     <span>Logging in...</span>
//                   </>
//                 ) : (
//                   "Log in"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, FormEvent } from "react";
// import authService from "../../services/auth";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion"; // Ensure motion and AnimatePresence are imported
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// // --- Animation Variants ---

// // Variant for the main container to orchestrate children animations
// const pageContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1, // Stagger the animation of children by 0.1s
//       delayChildren: 0.2, // Wait 0.2s before starting children animations
//     },
//   },
//   exit: {
//       opacity: 0,
//       transition: { duration: 0.2 }
//   }
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
//         duration: 0.2,
//         ease: "easeIn"
//     }
//   }
// };

// // Variants for error messages (keeping your existing style)
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

// // Variants for success messages (keeping your existing style)
// const successVariants = {
//   initial: { opacity: 0, y: -20 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
//   exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
// };

// // --- Component ---

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [generalError, setGeneralError] = useState("");
//   const { login, user, loading } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isGeneralErrorVisible, setIsGeneralErrorVisible] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//   // --- useEffect Hooks (No changes needed here) ---
//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const sessionExpired = urlParams.get("sessionExpired");
//     const googleErr = urlParams.get("googleError");
//     const registerSuccessParam = urlParams.get("registerSuccess");
//     const resetSuccessParam = urlParams.get("resetSuccess");
//     let urlNeedsCleaning = false;

//     setSessionExpiredMessage("");
//     setGeneralError("");
//     setIsGeneralErrorVisible(false);

//     if (googleErr) {
//       setGeneralError(decodeURIComponent(googleErr));
//       urlNeedsCleaning = true;
//     } else if (sessionExpired === "true") {
//       setSessionExpiredMessage(
//         "Your session has expired. Please log in again."
//       );
//       urlNeedsCleaning = true;
//     } else if (registerSuccessParam === "true") {
//       console.log("Registration successful parameter detected.");
//       urlNeedsCleaning = true;
//     } else if (resetSuccessParam === "true") {
//       console.log("Password reset successful parameter detected.");
//       urlNeedsCleaning = true;
//     }

//     if (urlNeedsCleaning) {
//       window.history.replaceState(null, "", "/auth/login");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   useEffect(() => {
//     if (!loading && user) {
//       console.log("Login page: User logged in. AuthContext handles redirect.");
//       // AuthContext handles redirection
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     setIsGeneralErrorVisible(!!generalError);
//   }, [generalError]);

//   useEffect(() => {
//     setIsLoginSuccessVisible(loginSuccess);
//   }, [loginSuccess]);

//   // --- Event Handlers (No changes needed here, except removing console.error) ---
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setGeneralError("");
//     setIsGeneralErrorVisible(false);
//     setSessionExpiredMessage("");
//     setLoginSuccess(false);
//     setIsLoginSuccessVisible(false);

//     let isValid = true;
//     if (!email) {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       const { user: loggedInUser, token } = await authService.login({
//         email,
//         password,
//       });
//       console.log("Login successful in component");
//       setLoginSuccess(true);
//       login(loggedInUser, token);
//     } catch (err: any) {
//       // console.error("Login error in component:", err); // Removed as requested
//       let message = "Sorry, that email or password didn't work.";
//       if (err.response?.data?.message) {
//         message = err.response.data.message;
//       } else if (err.message) {
//         message = err.message;
//       }
//       setGeneralError(message);
//       setIsGeneralErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleGoogleLogin = () => {
//     setGeneralError("");
//     setIsGeneralErrorVisible(false);
//     setSessionExpiredMessage("");
//     window.location.href = `${apiConfig.baseUrl}/auth/google`;
//   };

//   // --- RENDER SECTION (Updated with motion wrappers) ---
//   return (
//     <div className="bg-white dark:bg-background">
//       {/* AnimatePresence can wrap the main container if you want exit animations */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           className="flex flex-col items-center justify-center lg:h-[calc(100vh-82px)] px-4"
//           key="login-page" // Add a key for AnimatePresence if needed
//           variants={pageContainerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           {/* Wrap the content container with motion.div */}
//           <motion.div
//             className="w-full max-w-md lg:mt-20 mt-10"
//           >
//             {/* Session Expired Message (Uses existing AnimatePresence/motion) */}
//             <AnimatePresence>
//               {sessionExpiredMessage && (
//                 <motion.div
//                   className="bg-lightgray dark:bg-primarybox rounded-2xl p-4 flex items-center gap-4 mb-4"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants} // Using existing error variants
//                 >
//                   <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="inline-block">
//                     <p className="font-medium text-neutral-900 text-sm lg:text-base dark:text-white">
//                       Session Expired
//                     </p>
//                     <p className="text-gray-500 dark:text-gray-300 max-w-60">
//                       {sessionExpiredMessage}
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Title and Sign Up Link (Apply item variant) */}
//             <motion.div className="space-y-2" variants={itemVariants}>
//               <h2 className="lg:text-3xl text-2xl text-center text-neutral-900 dark:text-white font-medium">
//                 Welcome back.
//               </h2>
//               <p className="text-center text-gray-500 dark:text-gray-300">
//                 New to Wise?{" "}
//                 <Link href="/auth/register">
//                   <span className="text-primary font-medium capitalize underline underline-offset-4">
//                     Sign up
//                   </span>
//                 </Link>
//               </p>
//             </motion.div>

//             {/* General Login Error / Google Error Message (Uses existing AnimatePresence/motion) */}
//             <AnimatePresence>
//               {isGeneralErrorVisible && generalError && (
//                 <motion.div
//                   className={`dark:bg-primarybox bg-lightgray rounded-2xl p-4 flex items-center gap-4 mt-5`}
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants} // Using existing error variants
//                 >
//                   <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="inline-block">
//                     <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                       {generalError}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Success Message Display (Uses existing AnimatePresence/motion) */}
//             <AnimatePresence>
//               {isLoginSuccessVisible && loginSuccess && (
//                 <motion.div
//                   className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-5"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={successVariants} // Using existing success variants
//                 >
//                   <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="flex-grow space-y-0.5">
//                     <span className="text-neutral-900 dark:text-primary block font-medium">
//                       Login successful!
//                     </span>
//                     <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                       Checking account status...
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Form (Wrap the whole form or individual elements) */}
//             {/* Here we wrap the form itself, but individual elements inside could also be wrapped */}
//             {/* If wrapping the form, its children won't inherit stagger unless explicitly done */}
//             {/* Let's wrap individual logical blocks *inside* the form for better stagger control */}
//             <form className="space-y-4 mt-5" onSubmit={handleSubmit} noValidate>

//               {/* Google Button (Apply item variant) */}
//               <motion.div variants={itemVariants}>
//                 <button
//                   type="button"
//                   className="flex dark:bg-background border justify-center rounded-lg h-14 text-neutral-900 dark:text-white w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                   onClick={handleGoogleLogin}
//                 >
//                   <Image
//                     src="/assets/icon/google.svg"
//                     width={28}
//                     height={28}
//                     alt="Continue with Google"
//                   />
//                   Continue with Google
//                 </button>
//               </motion.div>

//               {/* Email Input (Apply item variant) */}
//               <motion.div className="email" variants={itemVariants}>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   Your email address{" "}
//                   <span className="text-red-600 dark:text-red-400">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Your Email"
//                   autoComplete="email"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                     emailError
//                       ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                       : "focus:border-[#5f5f5f]"
//                   }`}
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (emailError) setEmailError("");
//                   }}
//                   aria-invalid={!!emailError}
//                   aria-describedby={emailError ? "email-error" : undefined}
//                 />
//                 {emailError && (
//                   <p
//                     id="email-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {emailError}
//                   </p>
//                 )}
//               </motion.div>

//               {/* Password Input (Apply item variant) */}
//               <motion.div className="password" variants={itemVariants}>
//                 <label
//                   htmlFor="password"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   Your password{" "}
//                   <span className="text-red-600 dark:text-red-400">*</span>
//                 </label>

//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Your Password"
//                     autoComplete="current-password"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       passwordError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       if (passwordError) setPasswordError("");
//                     }}
//                     aria-invalid={!!passwordError}
//                     aria-describedby={
//                       passwordError ? "password-error" : undefined
//                     }
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                     onClick={togglePasswordVisibility}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? (
//                       <LuEye size={24} />
//                     ) : (
//                       <LuEyeClosed size={24} />
//                     )}
//                   </button>
//                 </div>
//                 {passwordError && (
//                   <p
//                     id="password-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {passwordError}
//                   </p>
//                 )}
//               </motion.div>

//               {/* Forgot Password Link (Apply item variant) */}
//               <motion.div className="text-right" variants={itemVariants}>
//                 <Link href="/auth/forgot-password" className="inline-block">
//                   <span className="text-neutral-900 dark:text-primary font-medium underline text-sm lg:text-base underline-offset-4">
//                     Forgot Password ?
//                   </span>
//                 </Link>
//               </motion.div>

//               {/* Submit Button (Apply item variant) */}
//               <motion.div
//                 className="flex justify-between items-center mb-4"
//                 variants={itemVariants}
//               >
//                 <button
//                   type="submit"
//                   className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                     isSubmitting
//                       ? "opacity-50 cursor-not-allowed"
//                       : "bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer"
//                   }`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                         /> <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                       <span>Logging in...</span>
//                     </>
//                   ) : (
//                     "Log in"
//                   )}
//                 </button>
//               </motion.div>
//             </form>
//           </motion.div> {/* End of w-full max-w-md motion wrapper */}
//         </motion.div> {/* End of main flex container motion wrapper */}
//       </AnimatePresence>
//     </div>
//   );
// }

// // frontend/src/app/auth/login/page.tsx
// "use client";

// import { useState, useEffect, FormEvent } from "react";
// import authService from "../../services/auth";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdCloseCircle } from "react-icons/io";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// const pageContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
//   exit: {
//       opacity: 0,
//       transition: { duration: 0.2 }
//   }
// };

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
//         duration: 0.2,
//         ease: "easeIn"
//     }
//   }
// };

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

// const successVariants = {
//   initial: { opacity: 0, y: -20 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
//   exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
// };

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [generalError, setGeneralError] = useState("");
//   const { login, user, loading } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
//   const [isGeneralErrorVisible, setIsGeneralErrorVisible] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const sessionExpired = urlParams.get("sessionExpired");
//     const googleErr = urlParams.get("googleError");
//     const registerSuccessParam = urlParams.get("registerSuccess");
//     const resetSuccessParam = urlParams.get("resetSuccess");
//     let urlNeedsCleaning = false;

//     setSessionExpiredMessage("");
//     setGeneralError("");
//     setIsGeneralErrorVisible(false);

//     if (googleErr) {
//       setGeneralError(decodeURIComponent(googleErr));
//       urlNeedsCleaning = true;
//     } else if (sessionExpired === "true") {
//       setSessionExpiredMessage(
//         "Your session has expired. Please log in again."
//       );
//       urlNeedsCleaning = true;
//     } else if (registerSuccessParam === "true") {
//       console.log("Registration successful parameter detected.");
//       // Optionally set a success message here if desired
//       urlNeedsCleaning = true;
//     } else if (resetSuccessParam === "true") {
//       console.log("Password reset successful parameter detected.");
//       // Optionally set a success message here if desired
//       urlNeedsCleaning = true;
//     }

//     if (urlNeedsCleaning) {
//       window.history.replaceState(null, "", "/auth/login");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   useEffect(() => {
//     if (!loading && user) {
//       console.log("Login page: User logged in. AuthContext handles redirect.");
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     setIsGeneralErrorVisible(!!generalError);
//   }, [generalError]);

//   useEffect(() => {
//     setIsLoginSuccessVisible(loginSuccess);
//   }, [loginSuccess]);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setGeneralError("");
//     setIsGeneralErrorVisible(false);
//     setSessionExpiredMessage("");
//     setLoginSuccess(false);
//     setIsLoginSuccessVisible(false);

//     let isValid = true;
//     if (!email) {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     }
//     if (!isValid) return;

//     setIsSubmitting(true);
//     try {
//       const { user: loggedInUser, token } = await authService.login({
//         email,
//         password,
//       });
//       console.log("Login successful in component");
//       setLoginSuccess(true);
//       login(loggedInUser, token);
//     } catch (err: any) {
//       let message = "Sorry, that email or password didn't work.";
//       if (err.response?.data?.message) {
//         message = err.response.data.message;
//       } else if (err.message) {
//         message = err.message;
//       }
//       setGeneralError(message);
//       setIsGeneralErrorVisible(true);
//       setLoginSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleGoogleLogin = () => {
//     setGeneralError("");
//     setIsGeneralErrorVisible(false);
//     setSessionExpiredMessage("");
//     window.location.href = `${apiConfig.baseUrl}/auth/google`;
//   };

//   return (
//     <div className="">
//       <AnimatePresence mode="wait">
//         <motion.div
//           className="flex flex-col items-center justify-center lg:h-[calc(100vh-82px)] px-4"
//           key="login-page-container"
//           variants={pageContainerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <motion.div
//             className="w-full max-w-md lg:mt-20 mt-10"
//             key="login-form-wrapper" // Added key
//           >
//             <AnimatePresence>
//               {sessionExpiredMessage && (
//                 <motion.div
//                   key="session-expired-msg" // Added key
//                   className="bg-lightgray dark:bg-primarybox rounded-2xl p-4 flex items-center gap-4 mb-4"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants}
//                 >
//                   <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="inline-block">
//                     <p className="font-medium text-neutral-900 text-sm lg:text-base dark:text-white">
//                       Session Expired
//                     </p>
//                     <p className="text-gray-500 dark:text-gray-300 max-w-60">
//                       {sessionExpiredMessage}
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <motion.div className="space-y-2" variants={itemVariants}>
//               <h2 className="lg:text-3xl text-2xl text-center text-neutral-900 dark:text-white font-medium">
//                 Welcome back.
//               </h2>
//               <p className="text-center text-gray-500 dark:text-gray-300">
//                 New to Wise?{" "}
//                 <Link href="/auth/register">
//                   <span className="text-primary font-medium capitalize underline underline-offset-4">
//                     Sign up
//                   </span>
//                 </Link>
//               </p>
//             </motion.div>

//             <AnimatePresence>
//               {isGeneralErrorVisible && generalError && (
//                 <motion.div
//                   key="general-error-msg" // Added key
//                   className={`dark:bg-primarybox bg-lightgray rounded-2xl p-4 flex items-center gap-4 mt-5`}
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={errorVariants}
//                 >
//                   <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="inline-block">
//                     <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                       {generalError}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <AnimatePresence>
//               {isLoginSuccessVisible && loginSuccess && (
//                 <motion.div
//                   key="login-success-msg" // Added key
//                   className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-5"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={successVariants}
//                 >
//                   <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="flex-grow space-y-0.5">
//                     <span className="text-neutral-900 dark:text-primary block font-medium">
//                       Login successful!
//                     </span>
//                     <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                       Checking account status...
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <form className="space-y-4 mt-5" onSubmit={handleSubmit} noValidate>
//               <motion.div variants={itemVariants}>
//                 <button
//                   type="button"
//                   className="flex dark:bg-background border justify-center rounded-lg h-14 text-neutral-900 dark:text-white w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                   onClick={handleGoogleLogin}
//                 >
//                   <Image
//                     src="/assets/icon/google.svg"
//                     width={28}
//                     height={28}
//                     alt="Continue with Google"
//                   />
//                   Continue with Google
//                 </button>
//               </motion.div>

//               <motion.div className="email" variants={itemVariants}>
//                 <label
//                   htmlFor="email"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   Your email address {" "}
//                   <span className="text-red-600">*</span>
//                 </label>

//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Your Email"
//                   autoComplete="email"
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                     emailError
//                       ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                       : "focus:border-[#5f5f5f]"
//                   }`}
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (emailError) setEmailError("");
//                   }}
//                   aria-invalid={!!emailError}
//                   aria-describedby={emailError ? "email-error" : undefined}
//                 />
//                 {emailError && (
//                   <p
//                     id="email-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {emailError}
//                   </p>
//                 )}
//               </motion.div>

//               <motion.div className="password" variants={itemVariants}>
//                 <label
//                   htmlFor="password"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   Your password {" "}
//                   <span className="text-red-600">*</span>
//                 </label>

//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Your Password"
//                     autoComplete="current-password"
//                     className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                       passwordError
//                         ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                         : "focus:border-[#5f5f5f]"
//                     }`}
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       if (passwordError) setPasswordError("");
//                     }}
//                     aria-invalid={!!passwordError}
//                     aria-describedby={
//                       passwordError ? "password-error" : undefined
//                     }
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                     onClick={togglePasswordVisibility}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? (
//                       <LuEye size={24} />
//                     ) : (
//                       <LuEyeClosed size={24} />
//                     )}
//                   </button>
//                 </div>
//                 {passwordError && (
//                   <p
//                     id="password-error"
//                     className="flex text-red-700 text-base items-center mt-0.5"
//                   >
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {passwordError}
//                   </p>
//                 )}
//               </motion.div>

//               <motion.div className="text-right" variants={itemVariants}>
//                 <Link href="/auth/forgot-password" className="inline-block">
//                   <span className="text-neutral-900 dark:text-primary font-medium underline text-sm lg:text-base underline-offset-4">
//                     Forgot Password ?
//                   </span>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 className="flex justify-between items-center mb-4"
//                 variants={itemVariants}
//               >
//                 <button
//                   type="submit"
//                   className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                     isSubmitting
//                       ? "opacity-50 cursor-not-allowed"
//                       : "bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer"
//                   }`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                         /> <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                       <span>Logging in...</span>
//                     </>
//                   ) : (
//                     "Log in"
//                   )}
//                 </button>
//               </motion.div>
//             </form>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, FormEvent } from "react";
import authService from "../../services/auth"; // Ensure this path is correct
import { useAuth } from "../../contexts/AuthContext"; // Ensure this path is correct
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import apiConfig from "../../config/apiConfig"; // Ensure this path is correct
import { LuEye, LuEyeClosed } from "react-icons/lu";

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
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
  const [isGeneralErrorVisible, setIsGeneralErrorVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const sessionExpired = urlParams.get("sessionExpired");
    const googleErr = urlParams.get("googleError");
    const registerSuccessParam = urlParams.get("registerSuccess");
    const resetSuccessParam = urlParams.get("resetSuccess");
    let urlNeedsCleaning = false;

    setSessionExpiredMessage("");
    setGeneralError("");
    setIsGeneralErrorVisible(false);

    if (googleErr) {
      setGeneralError(decodeURIComponent(googleErr));
      urlNeedsCleaning = true;
    } else if (sessionExpired === "true") {
      setSessionExpiredMessage(
        "Your session has expired. Please log in again."
      );
      urlNeedsCleaning = true;
    } else if (registerSuccessParam === "true") {
      console.log("Registration successful parameter detected.");
      urlNeedsCleaning = true;
    } else if (resetSuccessParam === "true") {
      console.log("Password reset successful parameter detected.");
      urlNeedsCleaning = true;
    }

    if (urlNeedsCleaning) {
      window.history.replaceState(null, "", "/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      console.log("Login page: User logged in. AuthContext handles redirect.");
      // The AuthContext should handle the redirect logic.
      // Example: router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsGeneralErrorVisible(!!generalError);
  }, [generalError]);

  useEffect(() => {
    setIsLoginSuccessVisible(loginSuccess);
  }, [loginSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setIsGeneralErrorVisible(false);
    setSessionExpiredMessage("");
    setLoginSuccess(false);
    setIsLoginSuccessVisible(false);

    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      // This error will make the password field red if set
      // The static helper "Must be at least 8 characters" is always visible
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    }

    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const { user: loggedInUser, token } = await authService.login({
        email,
        password,
      });
      console.log("Login successful in component");
      setLoginSuccess(true);
      // Delay redirect slightly to show success message
      setTimeout(() => {
        login(loggedInUser, token);
        // AuthContext will handle redirect after login state is updated
      }, 1000);
    } catch (err: any) {
      let message = "Sorry, that email or password didn't work.";
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setGeneralError(message);
      setIsGeneralErrorVisible(true);
      setLoginSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleGoogleLogin = () => {
    setGeneralError("");
    setIsGeneralErrorVisible(false);
    setSessionExpiredMessage("");
    window.location.href = `${apiConfig.baseUrl}/auth/google`;
  };

  const OnlyPipeLogo = ({ forDarkBg = true }: { forDarkBg?: boolean }) => (
    <div className="flex items-center space-x-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="white" />
        <circle
          cx="12"
          cy="12"
          r="5"
          fill={forDarkBg ? "#1E535E" : "#1E535E"}
        />{" "}
        {/* Adjust inner color if needed */}
      </svg>
      <span
        className={`text-2xl font-semibold ${
          forDarkBg ? "text-white" : "text-white"
        }`}
      >
        OnlyPipe
      </span>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:p-3">
      {/* Left Panel - Visible on large screens */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] bg-[url(/assets/images/leftPartImage.png)] bg-cover bg-no-repeat bg-center p-10 xl:p-16 rounded-3xl flex-col justify-between relative">
        <div className="absolute top-16 left-16 ">
          <Image
            src="/assets/images/main_logo.svg"
            width={200}
            height={90}
            alt=""
          />
        </div>

        <div className="flex-grow flex flex-col justify-end items-start text-white pt-20">
          <motion.h1
            className="text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get Started
            <br />
            with Us
          </motion.h1>
          <motion.p
            className="text-base xl:text-lg text-gray-200 mb-10 xl:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Complete these easy steps
            <br />
            to register your account.
          </motion.p>

          <div className="flex gap-4 w-full">
            {[
              { num: 1, title: "Sign up your account", active: true },
              { num: 2, title: "Sign in your account" },
              { num: 3, title: "Set up your KYC" },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                className={`flex flex-col justify-between w-50 h-50 p-3.5 xl:p-4 rounded-xl transition-all duration-300 ${
                  step.active ? "bg-white shadow-lg" : "bg-white/12"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5}}
              >
                <div
                  className={`flex items-center justify-center size-7 xl:size-10 rounded-full mr-3 xl:mr-4 shrink-0 ${
                    step.active
                      ? "bg-background text-white"
                      : "bg-white/12  text-white"
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

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        <div className="lg:hidden mb-10 self-center">
          <Image
            src="/assets/images/main_logo.svg"
            width={200}
            height={90}
            alt="logo"
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="w-full max-w-sm md:max-w-md"
            key="login-form-container"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AnimatePresence>
              {sessionExpiredMessage && (
                <motion.div
                  key="session-expired-msg"
                  className="bg-[#2B2B2B] rounded-xl p-4 flex items-center gap-3 mb-4"
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={errorVariants}
                >
                  <div className="flex bg-red-500/20 justify-center rounded-full items-center size-10 shrink-0">
                    <FiX className="text-red-400 size-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      Session Expired
                    </p>
                    <p className="text-gray-400 text-xs max-w-xs">
                      {sessionExpiredMessage}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="space-y-1 mb-6 lg:text-left text-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl text-mainheadingWhite font-semibold">
                Welcome back.
              </h2>
              <p className="text-gray-400">
                New to OnlyPipe?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-primaryhover font-medium underline underline-offset-2"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>

            <AnimatePresence>
              {isGeneralErrorVisible && generalError && (
                <motion.div
                  key="general-error-msg"
                  className="bg-[#383E3F] rounded-xl p-4 flex items-center gap-3 mb-5"
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
                    <p className="text-white">{generalError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isLoginSuccessVisible && loginSuccess && (
                <motion.div
                  key="login-success-msg"
                  className="bg-[#383E3F] p-4 rounded-xl flex items-center gap-3 mb-5"
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
                      Login successful!
                    </span>
                    <span className="text-white block">
                      Redirecting to your dashboard...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  className="flex hover:bg-primarybox duration-300 ease-linear border justify-center rounded-lg h-14 text-white w-full cursor-pointer font-medium gap-2.5 items-center px-4 py-3"
                  onClick={handleGoogleLogin}
                >
                  <Image
                    src="/assets/icon/google.svg"
                    width={25}
                    height={24}
                    alt="Google"
                  />
                  Continue with Google
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center py-2"
              >
                <hr className="flex-grow border-t" />
                <span className="px-3 text-white">Or</span>
                <hr className="flex-grow border-t" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="text-white inline-block mb-1.5"
                >
                  Your email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="eg. johnfrans@gmail.com"
                  autoComplete="email"
                  className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg transition-all focus:outline-none ease-linear duration-100
                    ${
                      emailError
                        ? "border-red-600 ring-1 ring-red-600"
                        : "border-primarybox"
                    }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  aria-invalid={!!emailError}
                />
                {emailError && (
                  <p className="flex text-red-500 text-sm items-center mt-1">
                    <IoMdCloseCircle className="size-3.5 mr-1" /> {emailError}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="text-white inline-block mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg transition-all focus:outline-none ease-linear duration-100 pr-10
                      ${
                        passwordError
                          ? "border-red-600 ring-1 ring-red-600"
                          : "border-[#3A3A3A]"
                      }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    aria-invalid={!!passwordError}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-300 focus:outline-none"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <LuEye size={18} />
                    ) : (
                      <LuEyeClosed size={18} />
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-1.5">
                  Must be at least 8 characters.
                </p>
                {passwordError && (
                  <p className="flex text-red-500 text-sm items-center mt-1">
                    <IoMdCloseCircle className="size-3.5 mr-1" />{" "}
                    {passwordError}
                  </p>
                )}
              </motion.div>

              <motion.div className="text-right pt-1" variants={itemVariants}>
                <Link href="/auth/forgot-password" className="inline-block">
                  <span className="text-subheadingWhite hover:text-primary font-medium underline underline-offset-2">
                    Forgot Password?
                  </span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 font-semibold py-3 px-8 h-14 rounded-lg transition-all duration-150 ease-linear flex items-center justify-center 
                    ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  disabled={isSubmitting || loginSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-4 w-4 text-[#1E1E1E] animate-spin mr-2"
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
                      <span>Logging in...</span>
                    </>
                  ) : loginSuccess ? (
                    "Success!"
                  ) : (
                    "Log in"
                  )}
                </button>
              </motion.div>
            </form>
            {/*
                The mobile screenshot includes "Already have an account? Log in" at the very bottom.
                This is unusual for a login page. The "New to OnlyPipe? Sign up" link at the top is more conventional.
                If strictly following the mobile screenshot for this part:
              */}
            {/*
              <motion.p variants={itemVariants} className="text-gray-400 text-xs mt-6 text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="font-medium text-[#4CB8C4] hover:text-[#63c9d6] underline">
                      Log in
                  </Link>
              </motion.p>
              */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
