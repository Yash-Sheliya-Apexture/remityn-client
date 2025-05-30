// // 'use client';

// // import { useState, useEffect } from 'react';
// // import authService from '../../services/auth'; // Correct import path using alias
// // import { useRouter } from 'next/navigation';
// // import { FaEye, FaEyeSlash } from 'react-icons/fa';
// // import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// // import Link from "next/link";
// // import Image from "next/image";
// // import { IoMdCloseCircle } from "react-icons/io";
// // import { FaExclamation } from "react-icons/fa6";
// // import { RiEyeCloseLine } from "react-icons/ri";
// // import { VscEye } from "react-icons/vsc";

// // export default function RegisterPage() {
// //     const [fullName, setFullName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [confirmPassword, setConfirmPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //     const router = useRouter();
// //     const { user, loading } = useAuth(); // Get user and loading from AuthContext

// //     // Redirect if user is already logged in
// //     useEffect(() => {
// //         if (!loading && user) {
// //             router.push('/dashboard');
// //         }
// //     }, [user, loading, router]);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError('');

// //         if (password !== confirmPassword) {
// //             setError("Passwords do not match.");
// //             return;
// //         }

// //         try {
// //             await authService.register({ fullName, email, password });
// //             router.push('/auth/login?registerSuccess=true');
// //         } catch (err) {
// //             setError(err);
// //         }
// //     };

// //     const togglePasswordVisibility = () => {
// //         setShowPassword(!showPassword);
// //     };

// //     const toggleConfirmPasswordVisibility = () => {
// //         setShowConfirmPassword(!showConfirmPassword);
// //     };

// //     if (loading) { // Add loading state handling
// //         return <p>Loading...</p>; // Or a loading spinner
// //     }

// //     if (user) { // User is already logged in
// //         return null; // Redirect is handled by useEffect
// //     }

// //     return (
// //         <div className="flex justify-center items-center min-h-screen px-4">
// //             <div className="w-full max-w-md mt-1.5">
// //                 <h2 className="text-3xl text-center text-main font-semibold mb-4">
// //                     Create your Wise account
// //                 </h2>

// //                 <p className="text-base text-center text-gray mb-4">
// //                     Already have an account?
// //                     <Link
// //                         href="/login"
// //                         className="text-green font-medium underline underline-offset-4"
// //                     >
// //                         Log in
// //                     </Link>
// //                 </p>

// //                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

// //                 <form onSubmit={handleSubmit} className="mt-10 space-y-4">
// //                     <div>
// //                         <label
// //                             htmlFor="fullName"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Full Name
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="fullName"
// //                             className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
// //                             value={fullName}
// //                             onChange={(e) => setFullName(e.target.value)}
// //                         />
// //                     </div>

// //                     <div>
// //                         <label
// //                             htmlFor="email"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Email Address
// //                         </label>
// //                         <input
// //                             type="email"
// //                             id="email"
// //                             className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                         />
// //                     </div>

// //                     <div>
// //                         <label
// //                             htmlFor="password"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Password
// //                         </label>
// //                         <div className="relative">
// //                             <input
// //                                 type={showPassword ? "text" : "password"}
// //                                 id="password"
// //                                 className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
// //                                 value={password}
// //                                 onChange={(e) => setPassword(e.target.value)}
// //                             />
// //                             <button
// //                                 type="button"
// //                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
// //                                 onClick={togglePasswordVisibility}
// //                             >
// //                                 {showPassword ? (
// //                                     <RiEyeCloseLine className="text-green size-5" />
// //                                 ) : (
// //                                     <VscEye className="text-green size-5" />
// //                                 )}
// //                             </button>
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <label
// //                             htmlFor="confirmPassword"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Confirm Password
// //                         </label>
// //                         <div className="relative">
// //                             <input
// //                                 type={showConfirmPassword ? "text" : "password"}
// //                                 id="confirmPassword"
// //                                 className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
// //                                 value={confirmPassword}
// //                                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                             />
// //                             <button
// //                                 type="button"
// //                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
// //                                 onClick={toggleConfirmPasswordVisibility}
// //                             >
// //                                 {showConfirmPassword ? (
// //                                     <RiEyeCloseLine className="text-green size-5" />
// //                                 ) : (
// //                                     <VscEye className="text-green size-5" />
// //                                 )}
// //                             </button>
// //                         </div>
// //                     </div>

// //                     {/* Next Button */}
// //                     <button
// //                         type="submit"
// //                         className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
// //                     >
// //                         Next
// //                     </button>
// //                 </form>

// //                 <div className="mt-4">
// //                     <p className="text-base text-gray mb-3">Or log in with</p>
// //                     <div className="mt-4">
// //                         <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
// //                             <Image
// //                                 src="/assets/icon/google.svg"
// //                                 width={30}
// //                                 height={30}
// //                                 alt="Continue with Google"
// //                             />
// //                             Continue with Google
// //                         </button>
// //                     </div>
// //                 </div>

// //                 <p className="text-center text-gray my-5">
// //                     By registering, you accept our
// //                     <Link
// //                         href="/terms-and-conditions"
// //                         className="text-green font-medium underline underline-offset-4"
// //                     >
// //                         Terms of use
// //                     </Link>
// //                     and
// //                     <Link
// //                         href="/privacy-policy-en"
// //                         className="text-green font-medium underline underline-offset-4"
// //                     >
// //                         Privacy Policy
// //                     </Link>
// //                 </p>

// //             </div>
// //         </div>
// //     );
// // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import authService from '../../services/auth'; // Correct import path using alias
// // import { useRouter } from 'next/navigation';
// // import { FaEye, FaEyeSlash } from 'react-icons/fa';
// // import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// // import Link from "next/link";
// // import Image from "next/image";
// // import { IoMdCloseCircle } from "react-icons/io";
// // import { FaExclamation } from "react-icons/fa6";
// // import { RiEyeCloseLine } from "react-icons/ri";
// // import { VscEye } from "react-icons/vsc";

// // export default function RegisterPage() {
// //     const [fullName, setFullName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [confirmPassword, setConfirmPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //     const router = useRouter();
// //     const { user, loading } = useAuth(); // Get user and loading from AuthContext

// //     const [fullNameError, setFullNameError] = useState('');
// //     const [emailError, setEmailError] = useState('');
// //     const [passwordError, setPasswordError] = useState('');
// //     const [confirmPasswordError, setConfirmPasswordError] = useState('');

// //     // Redirect if user is already logged in
// //     useEffect(() => {
// //         if (!loading && user) {
// //             router.push('/dashboard');
// //         }
// //     }, [user, loading, router]);

// //     const validateForm = () => {
// //         let isValid = true;

// //         if (!fullName.trim()) {
// //             setFullNameError('Full Name is required');
// //             isValid = false;
// //         } else {
// //             setFullNameError('');
// //         }

// //         if (!email.trim()) {
// //             setEmailError('Email is required');
// //             isValid = false;
// //         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
// //             setEmailError('Invalid email format');
// //             isValid = false;
// //         } else {
// //             setEmailError('');
// //         }

// //         if (!password.trim()) {
// //             setPasswordError('Password is required');
// //             isValid = false;
// //         } else if (password.length < 6) {
// //             setPasswordError('Password must be at least 6 characters');
// //             isValid = false;
// //         } else {
// //             setPasswordError('');
// //         }

// //         if (!confirmPassword.trim()) {
// //             setConfirmPasswordError('Confirm Password is required');
// //             isValid = false;
// //         } else if (password !== confirmPassword) {
// //             setConfirmPasswordError('Passwords do not match');
// //             isValid = false;
// //         } else {
// //             setConfirmPasswordError('');
// //         }

// //         return isValid;
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError('');

// //         if (!validateForm()) {
// //             return;
// //         }

// //         try {
// //             await authService.register({ fullName, email, password });
// //             router.push('/auth/login?registerSuccess=true');
// //         } catch (err) {
// //             setError(err);
// //         }
// //     };

// //     const togglePasswordVisibility = () => {
// //         setShowPassword(!showPassword);
// //     };

// //     const toggleConfirmPasswordVisibility = () => {
// //         setShowConfirmPassword(!showConfirmPassword);
// //     };

// //     if (loading) { // Add loading state handling
// //         return <p>Loading...</p>; // Or a loading spinner
// //     }

// //     if (user) { // User is already logged in
// //         return null; // Redirect is handled by useEffect
// //     }

// //     return (
// //         <div className="flex justify-center items-center min-h-screen px-4">
// //             <div className="w-full max-w-md mt-10">
// //                 <h2 className="text-3xl text-center text-main font-semibold mb-4">
// //                     Create your Wise account
// //                 </h2>

// //                 <p className="text-base text-center text-gray mb-4">
// //                     Already have an account?
// //                     <Link
// //                         href="/login"
// //                         className="text-green font-medium underline underline-offset-4"
// //                     >
// //                         Log in
// //                     </Link>
// //                 </p>

// //                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

// //                 <form onSubmit={handleSubmit} className="mt-5 space-y-4">
// //                     <div>
// //                         <label
// //                             htmlFor="fullName"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Full Name
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="fullName"
// //                             className={`mt-1 block px-4 py-3 w-full border rounded-lg ${fullNameError ? 'border-error' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
// //                             value={fullName}
// //                             onChange={(e) => setFullName(e.target.value)}
// //                         />
// //                         {fullNameError && (
// //                             <p className="flex text-red-600 text-base items-center mt-0.5">
// //                                 <span className="mr-1">
// //                                     <IoMdCloseCircle className="size-5" />
// //                                 </span>
// //                                 {fullNameError}
// //                             </p>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label
// //                             htmlFor="email"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Email Address
// //                         </label>
// //                         <input
// //                             type="email"
// //                             id="email"
// //                             className={`mt-1 block px-4 py-3 w-full border rounded-lg ${emailError ? 'border-error' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                         />
// //                         {emailError && (
// //                             <p className="flex text-error text-base items-center mt-0.5">
// //                                 <span className="mr-1">
// //                                     <IoMdCloseCircle className="size-5" />
// //                                 </span>
// //                                 {emailError}
// //                             </p>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label
// //                             htmlFor="password"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Password
// //                         </label>
// //                         <div className="relative">
// //                             <input
// //                                 type={showPassword ? "text" : "password"}
// //                                 id="password"
// //                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg ${passwordError ? 'border-error' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
// //                                 value={password}
// //                                 onChange={(e) => setPassword(e.target.value)}
// //                             />
// //                             <button
// //                                 type="button"
// //                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
// //                                 onClick={togglePasswordVisibility}
// //                             >
// //                                 {showPassword ? (
// //                                     <RiEyeCloseLine className="text-green size-5" />
// //                                 ) : (
// //                                     <VscEye className="text-green size-5" />
// //                                 )}
// //                             </button>
// //                         </div>
// //                         {passwordError && (
// //                             <p className="flex text-error text-base items-center mt-0.5">
// //                                 <span className="mr-1">
// //                                     <IoMdCloseCircle className="size-5" />
// //                                 </span>
// //                                 {passwordError}
// //                             </p>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label
// //                             htmlFor="confirmPassword"
// //                             className="text-base text-gray block capitalize"
// //                         >
// //                             Confirm Password
// //                         </label>
// //                         <div className="relative">
// //                             <input
// //                                 type={showConfirmPassword ? "text" : "password"}
// //                                 id="confirmPassword"
// //                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg ${confirmPasswordError ? 'border-error' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
// //                                 value={confirmPassword}
// //                                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                             />
// //                             <button
// //                                 type="button"
// //                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
// //                                 onClick={toggleConfirmPasswordVisibility}
// //                             >
// //                                 {showConfirmPassword ? (
// //                                     <RiEyeCloseLine className="text-green size-5" />
// //                                 ) : (
// //                                     <VscEye className="text-green size-5" />
// //                                 )}
// //                             </button>
// //                         </div>
// //                         {confirmPasswordError && (
// //                             <p className="flex text-error text-base items-center mt-0.5">
// //                                 <span className="mr-1">
// //                                     <IoMdCloseCircle className="size-5" />
// //                                 </span>
// //                                 {confirmPasswordError}
// //                             </p>
// //                         )}
// //                     </div>

// //                     {/* Next Button */}
// //                     <button
// //                         type="submit"
// //                         className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
// //                     >
// //                         Next
// //                     </button>
// //                 </form>

// //                 <div className="mt-4">
// //                     <p className="text-base text-gray mb-3">Or log in with</p>
// //                     <div className="mt-4">
// //                         <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
// //                             <Image
// //                                 src="/assets/icon/google.svg"
// //                                 width={30}
// //                                 height={30}
// //                                 alt="Continue with Google"
// //                             />
// //                             Continue with Google
// //                         </button>
// //                     </div>
// //                 </div>

// //                 <p className="text-center text-gray my-5">
// //                     By registering, you accept our
// //                     <Link
// //                         href="/terms-and-conditions"
// //                         className="text-green font-medium underline underline-offset-4"
// //                     >
// //                         Terms of use
// //                     </Link>
// //                     and
// //                     <Link
// //                         href="/privacy-policy-en"
// //                         className="text-green font-medium underline underline-offset-4"
// //                     >
// //                         Privacy Policy
// //                     </Link>
// //                 </p>

// //             </div>
// //         </div>
// //     );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Correct import path using alias
// import { useRouter } from 'next/navigation';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { FaExclamation } from "react-icons/fa6";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";
// import { IoClose } from 'react-icons/io5';

// export default function RegisterPage() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const router = useRouter();
//     const { user, loading } = useAuth(); // Get user and loading from AuthContext

//     const [fullNameError, setFullNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');

//     const inputBaseClasses = "mt-1 block px-4 py-3 w-full border rounded-lg hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300";

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
//         }
//     }, [user, loading, router]);

//     const validateForm = () => {
//         let isValid = true;

//         if (!fullName.trim()) {
//             setFullNameError('Full Name is required');
//             isValid = false;
//         } else {
//             setFullNameError('');
//         }

//         if (!email.trim()) {
//             setEmailError('Email is required');
//             isValid = false;
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             setEmailError('Invalid email format');
//             isValid = false;
//         } else {
//             setEmailError('');
//         }

//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             isValid = false;
//         } else if (password.length < 8) {
//             setPasswordError('Password must be at least 8 characters');
//             isValid = false;
//         } else {
//             setPasswordError('');
//         }

//         if (!confirmPassword.trim()) {
//             setConfirmPasswordError('Confirm Password is required');
//             isValid = false;
//         } else if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match');
//             isValid = false;
//         } else {
//             setConfirmPasswordError('');
//         }

//         return isValid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             await authService.register({ fullName, email, password });
//             router.push('/auth/login?registerSuccess=true');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     if (loading) { // Add loading state handling
//         return <p>Loading...</p>; // Or a loading spinner
//     }

//     if (user) { // User is already logged in
//         return null; // Redirect is handled by useEffect
//     }

//     const handleCloseLoginError = () => {
//         setLoginError("");
//     };

//     return (
//         <div className="flex justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md">
//                 <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mt-5 mb-4">
//                     Create your Wise account
//                 </h2>

//                 <p className="text-base text-center text-gray mb-4">
//                     Already have an account?
//                     <Link
//                         href="/auth/login"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Log in
//                     </Link>
//                 </p>

//                 {error && (
//                     <div
//                         className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                         role="alert"
//                     >
//                         <div className="flex bg-error justify-center rounded-full items-center size-12">
//                             <IoClose className="p-0.5 text-white size-8" />
//                         </div>

//                         <div>
//                             <span className="text-gray block max-w-60">{error}</span>
//                         </div>

//                         <button
//                             className="absolute cursor-pointer right-4 top-4"
//                             onClick={handleCloseLoginError}
//                         >
//                             <IoClose
//                                 className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                 role="button"
//                             />
//                         </button>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="mt-10 space-y-4">
//                     <div>
//                         <div className="mt-4">
//                             <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </a>
//                         </div>
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="fullName"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Full Name <span className="text-error">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${fullNameError
//                                 ? "border-error border-2"
//                                 : "border-[#c9cbce] hover:shadow-color"
//                                 }`}
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                         />
//                         {fullNameError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {fullNameError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Email Address <span className="text-error">*</span>
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${emailError
//                                 ? "border-error border-2"
//                                 : "border-[#c9cbce] hover:shadow-color"
//                                 }`}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         {emailError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {emailError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Password <span className="text-error">*</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${passwordError
//                                     ? "border-error border-2"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                                 onClick={togglePasswordVisibility}
//                             >
//                                 {showPassword ? (
//                                     <RiEyeCloseLine className="text-secondary size-5" />
//                                 ) : (
//                                     <VscEye className="text-secondary size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {passwordError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {passwordError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="confirmPassword"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Confirm Password <span className="text-error">*</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${confirmPasswordError
//                                     ? "border-error border-2"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                                 onClick={toggleConfirmPasswordVisibility}
//                             >
//                                 {showConfirmPassword ? (
//                                     <RiEyeCloseLine className="text-secondary size-5" />
//                                 ) : (
//                                     <VscEye className="text-secondary size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {confirmPasswordError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {confirmPasswordError}
//                             </p>
//                         )}
//                     </div>

//                     {/* Next Button */}
//                     <button
//                         type="submit"
//                         className="bg-primary hover:bg-primary-hover rounded-full text-secondary text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors"
//                     >
//                         Next
//                     </button>
//                 </form>

//                 <p className="text-center text-gray my-3 text-sm">
//                     By registering, you accept our
//                     <Link
//                         href="/terms-and-conditions"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Terms of use
//                     </Link>
//                     and
//                     <Link
//                         href="/privacy-policy-en"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Privacy Policy
//                     </Link>
//                 </p>

//             </div>
//         </div>
//     );
// }

// // frontend/src/pages/auth/register/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Correct import path using alias
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";
// import { IoClose } from 'react-icons/io5';

// export default function RegisterPage() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const router = useRouter();
//     const { user, loading } = useAuth(); // Get user and loading from AuthContext

//     const [fullNameError, setFullNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');
//     const [registerSuccess, setRegisterSuccess] = useState(false); // State for successful registration

//     const inputBaseClasses = "mt-1 block px-4 py-3 w-full border rounded-lg hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300";

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
//         }
//     }, [user, loading, router]);

//     // Redirect to login page with success message after registration
//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         if (params.get('registerSuccess') === 'true') {
//             setRegisterSuccess(true);
//             // Optionally clear the param from URL
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         }
//     }, []);

//     const validateForm = () => {
//         let isValid = true;

//         if (!fullName.trim()) {
//             setFullNameError('Full Name is required');
//             isValid = false;
//         } else {
//             setFullNameError('');
//         }

//         if (!email.trim()) {
//             setEmailError('Email is required');
//             isValid = false;
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             setEmailError('Invalid email format');
//             isValid = false;
//         } else {
//             setEmailError('');
//         }

//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             isValid = false;
//         } else if (password.length < 8) {
//             setPasswordError('Password must be at least 8 characters');
//             isValid = false;
//         } else {
//             setPasswordError('');
//         }

//         if (!confirmPassword.trim()) {
//             setConfirmPasswordError('Confirm Password is required');
//             isValid = false;
//         } else if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match');
//             isValid = false;
//         } else {
//             setConfirmPasswordError('');
//         }

//         return isValid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             await authService.register({ fullName, email, password });
//             setRegisterSuccess(true); // Set success state to true
//             // Optionally redirect immediately or show a success message for a few seconds then redirect
//             setTimeout(() => {
//                 router.push('/auth/login?registerSuccess=true'); // Redirect after successful registration
//             }, 2000); // Delay for showing success message (adjust as needed)

//         } catch (err) {
//             setError(err.errors?.message || err.message || 'Registration failed'); // Handle backend validation errors if structured that way
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     if (loading) { // Add loading state handling
//         return <p>Loading...</p>; // Or a loading spinner
//     }

//     if (user) { // User is already logged in
//         return null; // Redirect is handled by useEffect
//     }

//     const handleCloseLoginError = () => {
//         setError("");
//     };

//     return (
//         <div className="flex justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md">
//                 <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mt-5 mb-4">
//                     Create your Wise account
//                 </h2>

//                 <p className="text-base text-center text-gray mb-4">
//                     Already have an account?
//                     <Link
//                         href="/auth/login"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Log in
//                     </Link>
//                 </p>

//                 {error && (
//                     <div
//                         className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                         role="alert"
//                     >
//                         <div className="flex bg-error justify-center rounded-full items-center size-12">
//                             <IoClose className="p-0.5 text-white size-8" />
//                         </div>

//                         <div>
//                             <span className="text-gray block max-w-60">{error}</span>
//                         </div>

//                         <button
//                             className="absolute cursor-pointer right-4 top-4"
//                             onClick={handleCloseLoginError}
//                         >
//                             <IoClose
//                                 className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                 role="button"
//                             />
//                         </button>
//                     </div>
//                 )}

//                 {registerSuccess && (
//                     <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                         <div className="flex bg-green justify-center rounded-full items-center size-12">
//                             <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                         </div>
//                         <div>
//                             <span className="text-gray block max-w-60">Registration successful! Redirecting to login...</span>
//                         </div>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="mt-10 space-y-4">
//                     <div>
//                         <div className="mt-4">
//                             <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </a>
//                         </div>
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="fullName"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Full Name <span className="text-error">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${fullNameError
//                                 ? "border-error border-2"
//                                 : "border-[#c9cbce] hover:shadow-color"
//                                 }`}
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                         />
//                         {fullNameError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {fullNameError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Email Address <span className="text-error">*</span>
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${emailError
//                                 ? "border-error border-2"
//                                 : "border-[#c9cbce] hover:shadow-color"
//                                 }`}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         {emailError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {emailError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Password <span className="text-error">*</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${passwordError
//                                     ? "border-error border-2"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                                 onClick={togglePasswordVisibility}
//                             >
//                                 {showPassword ? (
//                                     <RiEyeCloseLine className="text-secondary size-5" />
//                                 ) : (
//                                     <VscEye className="text-secondary size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {passwordError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {passwordError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="confirmPassword"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Confirm Password <span className="text-error">*</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${confirmPasswordError
//                                     ? "border-error border-2"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                                 onClick={toggleConfirmPasswordVisibility}
//                             >
//                                 {showConfirmPassword ? (
//                                     <RiEyeCloseLine className="text-secondary size-5" />
//                                 ) : (
//                                     <VscEye className="text-secondary size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {confirmPasswordError && (
//                             <p className="flex text-error text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {confirmPasswordError}
//                             </p>
//                         )}
//                     </div>

//                     {/* Next Button */}
//                     <button
//                         type="submit"
//                         className="bg-primary hover:bg-primary-hover rounded-full text-secondary text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors"
//                     >
//                         Next
//                     </button>
//                 </form>

//                 <p className="text-center text-gray my-3 text-sm">
//                     By registering, you accept our
//                     <Link
//                         href="/terms-and-conditions"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Terms of use
//                     </Link>
//                     and
//                     <Link
//                         href="/privacy-policy-en"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Privacy Policy
//                     </Link>
//                 </p>

//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/register/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Correct import path using alias
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";
// import { IoClose } from 'react-icons/io5';
// import { IoMdCheckmarkCircleOutline } from "react-icons/io"; // <-- Import the missing icon

// export default function RegisterPage() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const router = useRouter();
//     const { user, loading } = useAuth(); // Get user and loading from AuthContext

//     const [fullNameError, setFullNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');
//     const [registerSuccess, setRegisterSuccess] = useState(false); // State for successful registration

//     // Removed unused inputBaseClasses variable

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
//         }
//     }, [user, loading, router]);

//     // Redirect to login page with success message after registration
//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         if (params.get('registerSuccess') === 'true') {
//             setRegisterSuccess(true);
//             // Optionally clear the param from URL
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         }
//     }, []);

//     const validateForm = () => {
//         let isValid = true;

//         setFullNameError(''); // Reset errors on validation
//         setEmailError('');
//         setPasswordError('');
//         setConfirmPasswordError('');

//         if (!fullName.trim()) {
//             setFullNameError('Full Name is required');
//             isValid = false;
//         }

//         if (!email.trim()) {
//             setEmailError('Email is required');
//             isValid = false;
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             setEmailError('Invalid email format');
//             isValid = false;
//         }

//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             isValid = false;
//         } else if (password.length < 8) {
//             setPasswordError('Password must be at least 8 characters');
//             isValid = false;
//         }

//         if (!confirmPassword.trim()) {
//             setConfirmPasswordError('Confirm Password is required');
//             isValid = false;
//         } else if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match');
//             isValid = false;
//         }

//         return isValid;
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Added type for event
//         e.preventDefault();
//         setError('');

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             await authService.register({ fullName, email, password });
//             setRegisterSuccess(true); // Set success state to true
//             // Optionally redirect immediately or show a success message for a few seconds then redirect
//             setTimeout(() => {
//                 router.push('/auth/login?registerSuccess=true'); // Redirect after successful registration
//             }, 2000); // Delay for showing success message (adjust as needed)

//         } catch (err: any) { // Keep 'any' for now or define a specific error type from your service
//             setError(err.response?.data?.message || err.message || 'Registration failed'); // Handle backend validation errors if structured that way
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     if (loading) { // Add loading state handling
//         return <p>Loading...</p>; // Or a loading spinner
//     }

//     if (user && !loading) { // Ensure not loading before checking user
//         return null; // Redirect is handled by useEffect
//     }

//     const handleCloseLoginError = () => {
//         setError("");
//     };

//     return (
//         <div className="flex justify-center items-center lg:h-[calc(100vh-73px)] px-4 py-8"> {/* Added padding */}
//             <div className="w-full max-w-md">
//                 <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mt-5 mb-4">
//                     Create your Wise account
//                 </h2>

//                 <p className="text-base text-center text-gray mb-4">
//                     Already have an account?
//                     <Link
//                         href="/auth/login"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Log in
//                     </Link>
//                 </p>

//                 {error && (
//                     <div
//                         className="flex bg-red-100 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4" // Changed background, added margin
//                         role="alert"
//                     >
//                         <div className="flex bg-error justify-center rounded-full items-center size-12 shrink-0"> {/* Added shrink-0 */}
//                             <IoClose className="p-0.5 text-white size-8" />
//                         </div>

//                         <div className="flex-grow"> {/* Added flex-grow */}
//                             <span className="text-error block">{error}</span> {/* Changed text color */}
//                         </div>

//                         <button
//                             className="absolute cursor-pointer right-4 top-4 p-1 rounded-full text-error hover:bg-red-200" // Adjusted styles
//                             onClick={handleCloseLoginError}
//                             aria-label="Close error message" // Added aria-label
//                         >
//                             <IoClose
//                                 className="size-6" // Adjusted size
//                                 role="button"
//                             />
//                         </button>
//                     </div>
//                 )}

//                 {registerSuccess && (
//                     <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"> {/* Added margin */}
//                         <div className="flex bg-green justify-center rounded-full items-center size-12 shrink-0"> {/* Added shrink-0 */}
//                             {/* Use the imported icon */}
//                             <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                         </div>
//                         <div className="flex-grow"> {/* Added flex-grow */}
//                             <span className="text-gray block">Registration successful! Redirecting to login...</span>
//                         </div>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="mt-10 space-y-4">
//                     <div>
//                         <div className="mt-4">
//                             <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </a>
//                         </div>
//                     </div>
//                     <div className="text-center my-4 text-gray-500">OR</div> {/* Added OR separator */}
//                     <div>
//                         <label
//                             htmlFor="fullName"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Full Name <span className="text-error">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             aria-required="true" // Added aria-required
//                             aria-invalid={!!fullNameError} // Added aria-invalid
//                             aria-describedby={fullNameError ? "fullName-error" : undefined} // Added aria-describedby
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${fullNameError
//                                 ? "border-error border-2"
//                                 : "border-[#c9cbce] hover:shadow-color"
//                                 }`}
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                         />
//                         {fullNameError && (
//                             <p id="fullName-error" className="flex text-error text-sm items-center mt-1"> {/* Changed to text-sm, added id */}
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-4" /> {/* Adjusted size */}
//                                 </span>
//                                 {fullNameError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Email Address <span className="text-error">*</span>
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             aria-required="true"
//                             aria-invalid={!!emailError}
//                             aria-describedby={emailError ? "email-error" : undefined}
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${emailError
//                                 ? "border-error border-2"
//                                 : "border-[#c9cbce] hover:shadow-color"
//                                 }`}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         {emailError && (
//                             <p id="email-error" className="flex text-error text-sm items-center mt-1">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-4" />
//                                 </span>
//                                 {emailError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Password <span className="text-error">*</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 aria-required="true"
//                                 aria-invalid={!!passwordError}
//                                 aria-describedby={passwordError ? "password-error" : undefined}
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${passwordError
//                                     ? "border-error border-2"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none hover:text-gray-700" // Adjusted positioning
//                                 onClick={togglePasswordVisibility}
//                                 aria-label={showPassword ? "Hide password" : "Show password"} // Added aria-label
//                             >
//                                 {showPassword ? (
//                                     <RiEyeCloseLine className="text-secondary size-5" />
//                                 ) : (
//                                     <VscEye className="text-secondary size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {passwordError && (
//                             <p id="password-error" className="flex text-error text-sm items-center mt-1">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-4" />
//                                 </span>
//                                 {passwordError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="confirmPassword"
//                             className="text-gray text-sm block capitalize"
//                         >
//                             Confirm Password <span className="text-error">*</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 aria-required="true"
//                                 aria-invalid={!!confirmPasswordError}
//                                 aria-describedby={confirmPasswordError ? "confirmPassword-error" : undefined}
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${confirmPasswordError
//                                     ? "border-error border-2"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none hover:text-gray-700" // Adjusted positioning
//                                 onClick={toggleConfirmPasswordVisibility}
//                                 aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} // Added aria-label
//                             >
//                                 {showConfirmPassword ? (
//                                     <RiEyeCloseLine className="text-secondary size-5" />
//                                 ) : (
//                                     <VscEye className="text-secondary size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {confirmPasswordError && (
//                             <p id="confirmPassword-error" className="flex text-error text-sm items-center mt-1">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-4" />
//                                 </span>
//                                 {confirmPasswordError}
//                             </p>
//                         )}
//                     </div>

//                     {/* Next Button */}
//                     <button
//                         type="submit"
//                         className="bg-primary hover:bg-primary-hover rounded-full text-secondary text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors mt-6" // Added margin-top
//                     >
//                         Register
//                     </button>
//                 </form>

//                 <p className="text-center text-gray my-5 text-sm"> {/* Adjusted margin */}
//                     By registering, you accept our
//                     <Link
//                         href="/terms-and-conditions"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Terms of use
//                     </Link>
//                     and
//                     <Link
//                         href="/privacy-policy-en"
//                         className="text-secondary font-medium underline underline-offset-4"
//                     >
//                         Privacy Policy
//                     </Link>
//                 </p>

//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/register/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import authService from "../../services/auth"; // Correct import path using alias
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCheckmarkCircleOutline, IoMdCloseCircle } from "react-icons/io";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";
// import { IoClose } from "react-icons/io5";

// // Import AxiosError if your authService likely throws it for HTTP errors
// // import { AxiosError } from 'axios'; // Uncomment if using Axios

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Get user and loading from AuthContext

//   const [fullNameError, setFullNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [registerSuccess, setRegisterSuccess] = useState(false); // State for successful registration
//   const [isErrorVisible, setIsErrorVisible] = useState(false); // State to control error visibility for animation

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (!loading && user) {
//       router.push("/dashboard");
//     }
//   }, [user, loading, router]);

//   // Check for success message on mount (e.g., after redirection from register)
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("registerSuccess") === "true") {
//       setRegisterSuccess(true);
//       // Optionally clear the param from URL if you want it shown only once
//       // window.history.replaceState({}, document.title, window.location.pathname);
//     }
//   }, []); // Run only once on mount

//   useEffect(() => {
//     if (error) {
//       setIsErrorVisible(true);
//     } else {
//       setIsErrorVisible(false);
//     }
//   }, [error]);

//   const validateForm = () => {
//     let isValid = true;

//     setFullNameError(""); // Reset errors on validation
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     if (!fullName.trim()) {
//       setFullNameError("Full Name is required");
//       isValid = false;
//     }

//     if (!email.trim()) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Invalid email format");
//       isValid = false;
//     }

//     if (!password.trim()) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       isValid = false;
//     }

//     if (!confirmPassword.trim()) {
//       setConfirmPasswordError("Confirm Password is required");
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setRegisterSuccess(false); // Reset success state on new submission

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await authService.register({ fullName, email, password });
//       setRegisterSuccess(true); // Set success state to true
//       // Redirect to login page with a success indicator after a short delay
//       setTimeout(() => {
//         router.push("/auth/login?registerSuccess=true");
//       }, 2000); // Delay allows user to see the success message
//     } catch (err: unknown) {
//       // <-- Use unknown instead of any
//       let errorMessage = "Registration failed. Please try again."; // Default error message

//       // Check if the error object has a structure typical of Axios errors
//       // (or similar HTTP client errors) where the backend message is nested.
//       if (typeof err === "object" && err !== null) {
//         // Type assertion to check for nested properties safely
//         const potentialError = err as {
//           response?: { data?: { message?: string } };
//           message?: string;
//         };

//         if (potentialError.response?.data?.message) {
//           errorMessage = potentialError.response.data.message;
//         } else if (potentialError.message) {
//           // Fallback to the top-level message property if response.data.message doesn't exist
//           errorMessage = potentialError.message;
//         }
//       }
//       // Optional: Handle cases where a plain string might be thrown (less common)
//       // else if (typeof err === 'string') {
//       //    errorMessage = err;
//       // }

//       setError(errorMessage);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!setShowConfirmPassword);
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Or a loading spinner
//   }

//   // Redirect is handled by useEffect, no need to render anything here if logged in
//   // if (user && !loading) {
//   //     return null;
//   // }

//   const handleCloseLoginError = () => {
//     setError("");
//     setIsErrorVisible(false); // Hide error when close button is clicked
//   };

//   // Framer Motion variants for animation
//   const errorVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//   };

//   return (
//     <div className="flex justify-center items-center lg:h-[calc(100vh-73px)] px-4 py-8">
//
//       {/* Added padding */}
//       <div className="w-full max-w-md">
//         <h2 className="lg:text-3xl text-2xl text-center text-mainheading dark:text-white font-semibold mt-5 mb-4">
//           Create your Wise account
//         </h2>

//         <p className="text-base text-center text-gray-500 dark:text-gray-300 mb-4">
//           Already have an account? {/* Added space */}
//           <Link
//             href="/auth/login"
//             className="text-primary font-medium underline underline-offset-4"
//           >
//             Log in
//           </Link>
//         </p>

//         {/* Error Message Display */}
//         {error && (
//           <div
//             className="flex bg-red-100 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4" // Changed background, added margin
//             role="alert"
//           >
//             <div className="flex bg-error justify-center rounded-full items-center size-12 shrink-0">
//               <IoClose className="p-0.5 text-white size-8" />
//             </div>

//             <div className="flex-grow">
//               <span className="text-error block">{error}</span>
//             </div>

//             <button
//               className="absolute cursor-pointer right-4 top-4 p-1 rounded-full text-error hover:bg-red-200"
//               onClick={handleCloseLoginError}
//               aria-label="Close error message"
//             >
//               <IoClose
//                 className="size-6"
//                 role="button"
//                 aria-hidden="true" // Hide decorative icon from screen readers
//               />
//             </button>
//           </div>
//         )}

//         {/* Success Message Display */}
//         {registerSuccess &&
//           !error && ( // Show success only if there's no error from a subsequent attempt
//             <div className="flex bg-green/10 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4">
//
//               {/* Adjusted background/padding */}
//               <div className="flex bg-green justify-center rounded-full items-center size-12 shrink-0">
//                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//               </div>
//               <div className="flex-grow">
//                 <span className="text-green block font-medium">
//                   Registration successful!
//                 </span>
//                 {/* Improved text */}
//                 <span className="text-gray block text-sm">
//                   Redirecting to login...
//                 </span>
//               </div>
//             </div>
//           )}

//         <form onSubmit={handleSubmit} className="mt-10 space-y-4">
//           {/* Google Button */}
//           <div>
//             {/* Consider making this a button or handling the click properly */}
//             <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 h-14">
//               <Image
//                 src="/assets/icon/google.svg"
//                 width={24} // Adjusted size
//                 height={24} // Adjusted size
//                 alt="Google icon"
//               />
//               Continue with Google
//             </a>
//           </div>

//           {/* Full Name Input */}
//           <div>
//             <label
//               htmlFor="fullName"
//               className="text-gray-500 dark:text-gray-300 font-medium block mb-1" // Adjusted styling
//             >
//               Full Name <span className="text-error">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               autoComplete="name" // Added autocomplete
//               aria-required="true"
//               aria-invalid={!!fullNameError}
//               aria-describedby={fullNameError ? "fullName-error" : undefined}
//               className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                 fullNameError
//                   ? "border-red-700 border-2" // Simplified error state
//                   : "dark:hover:shadow-whitecolor" // Adjusted normal/focus states
//               }`}
//               value={fullName}
//               onChange={(e) => {
//                 setFullName(e.target.value);
//                 if (fullNameError) setFullNameError("");
//               }} // Clear error on change
//             />
//             {fullNameError && (
//               <p
//                 id="fullName-error"
//                 className="flex text-red-700 text-base items-center mt-0.5"
//                 role="alert"
//               >
//
//                 {/* Adjusted style/role */}
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {fullNameError}
//               </p>
//             )}
//           </div>

//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="email"
//               className="text-gray-500 dark:text-gray-300 font-medium block mb-1"
//             >
//               Email Address <span className="text-error">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               autoComplete="email" // Added autocomplete
//               aria-required="true"
//               aria-invalid={!!emailError}
//               aria-describedby={emailError ? "email-error" : undefined}
//               className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                 emailError
//                   ? "border-red-700 border-2"
//                   : "dark:hover:shadow-whitecolor hover:shadow-darkcolor"
//               }`}
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (emailError) setEmailError("");
//               }} // Clear error on change
//             />
//             {emailError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {emailError}
//               </p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="password"
//               className="text-gray-500 dark:text-gray-300 font-medium block mb-1"
//             >
//               Password <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 autoComplete="new-password" // Important for password managers
//                 aria-required="true"
//                 aria-invalid={!!passwordError}
//                 aria-describedby={passwordError ? "password-error" : undefined}
//                 className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                   passwordError
//                     ? "border-red-700 border-2"
//                     : "dark:hover:shadow-whitecolor hover:shadow-darkcolor"
//                 }`}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   if (passwordError) setPasswordError("");
//                 }} // Clear error on change
//               />
//               <button
//                 type="button"
//                 className="text-gray-500 dark:text-white -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white dark:bg-background p-3 rounded-md" // Adjusted focus style
//                 onClick={togglePasswordVisibility}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <RiEyeCloseLine className="text-mainheading dark:text-white size-5" />
//                 ) : (
//                   <VscEye className="text-mainheading dark:text-white size-5" />
//                 )}
//               </button>
//             </div>
//             {passwordError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {passwordError}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password Input */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="text-gray-500 dark:text-gray-300 font-medium block mb-1"
//             >
//               Confirm Password <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 autoComplete="new-password"
//                 aria-required="true"
//                 aria-invalid={!!confirmPasswordError}
//                 aria-describedby={
//                   confirmPasswordError ? "confirmPassword-error" : undefined
//                 }
//                 className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                   confirmPasswordError
//                     ? "border-red-700 border-2"
//                     : "dark:hover:shadow-whitecolor hover:shadow-darkcolor"
//                 }`}
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   if (confirmPasswordError) setConfirmPasswordError("");
//                 }} // Clear error on change
//               />
//               <button
//                 type="button"
//                 className="text-gray-500 dark:text-white -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white dark:bg-background p-3 rounded-md"
//                 onClick={toggleConfirmPasswordVisibility}
//                 aria-label={
//                   showConfirmPassword
//                     ? "Hide confirm password"
//                     : "Show confirm password"
//                 }
//               >
//                 {showConfirmPassword ? (
//                   <RiEyeCloseLine className="text-mainheading dark:text-white size-5" />
//                 ) : (
//                   <VscEye className="text-mainheading dark:text-white size-5" />
//                 )}
//               </button>
//             </div>
//             {confirmPasswordError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {confirmPasswordError}
//               </p>
//             )}
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             disabled={registerSuccess} // Disable button after successful registration to prevent double clicks
//             className={`bg-primary hover:bg-primaryhover rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors`} // Adjusted styles, disabled state
//           >
//             {registerSuccess ? "Registered!" : "Register"}
//           </button>
//         </form>

//         {/* Terms and Policy Links */}
//         <p className="text-center text-gray-500 dark:text-gray-300 my-3 text-sm">
//
//           {/* Adjusted styles */}
//           By registering, you accept our{" "}
//           <Link
//             href="/terms-and-conditions"
//             className="text-primary font-medium underline underline-offset-4" // Adjusted offset/hover
//           >
//             Terms of use
//           </Link>{" "}
//           and{" "}
//           <Link
//             href="/privacy-policy-en"
//             className="text-primary font-medium underline underline-offset-4"
//           >
//             Privacy Policy
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/auth/register/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import authService from "../../services/auth"; // Correct import path using alias
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
// import { FiX } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Get user and loading from AuthContext

//   const [fullNameError, setFullNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [registerSuccess, setRegisterSuccess] = useState(false); // State for successful registration
//   const [isErrorVisible, setIsErrorVisible] = useState(false); // State to control error visibility for animation

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (!loading && user) {
//       router.push("/dashboard");
//     }
//   }, [user, loading, router]);

//   // Check for success message on mount (e.g., after redirection from register)
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("registerSuccess") === "true") {
//       setRegisterSuccess(true);
//     }
//   }, []); // Run only once on mount

//   useEffect(() => {
//     if (error) {
//       setIsErrorVisible(true);
//     } else {
//       setIsErrorVisible(false);
//     }
//   }, [error]);

//   const validateForm = () => {
//     let isValid = true;

//     setFullNameError(""); // Reset errors on validation
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     if (!fullName.trim()) {
//       setFullNameError("Full Name is required");
//       isValid = false;
//     }

//     if (!email.trim()) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Invalid email format");
//       isValid = false;
//     }

//     if (!password.trim()) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       isValid = false;
//     }

//     if (!confirmPassword.trim()) {
//       setConfirmPasswordError("Confirm Password is required");
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setRegisterSuccess(false); // Reset success state on new submission

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await authService.register({ fullName, email, password });
//       setRegisterSuccess(true); // Set success state to true
//       // Redirect to login page with a success indicator after a short delay
//       setTimeout(() => {
//         router.push("/auth/login?registerSuccess=true");
//       }, 300); // Delay allows user to see the success message
//     } catch (err: unknown) {
//       // <-- Use unknown instead of any
//       let errorMessage = "Registration failed. Please try again."; // Default error message

//       // Check if the error object has a structure typical of Axios errors
//       // (or similar HTTP client errors) where the backend message is nested.
//       if (typeof err === "object" && err !== null) {
//         // Type assertion to check for nested properties safely
//         const potentialError = err as {
//           response?: { data?: { message?: string } };
//           message?: string;
//         };

//         if (potentialError.response?.data?.message) {
//           errorMessage = potentialError.response.data.message;
//         } else if (potentialError.message) {
//           // Fallback to the top-level message property if response.data.message doesn't exist
//           errorMessage = potentialError.message;
//         }
//       }

//       setError(errorMessage);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Or a loading spinner
//   }

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
//     <div className="flex justify-center items-center lg:h-[calc(100vh-73px)] px-4 py-8 bg-white dark:bg-background">
//       {/* Added padding */}
//       <div className="w-full max-w-md">
//         <h2 className="lg:text-3xl text-xl text-center text-mainheading dark:text-white font-semibold mt-5 mb-2">
//           Create your Wise account
//         </h2>

//         <p className="lg:text-base text-sm text-center text-gray-700 dark:text-gray-300 mb-6">
//           Already have an account? {/* Added space */}
//           <Link
//             href="/auth/login"
//             className="text-primary font-medium underline underline-offset-4"
//           >
//             Log in
//           </Link>
//         </p>

//         {/* Error Message Display */}
//         <AnimatePresence>
//           {isErrorVisible && error && (
//             <motion.div
//               className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//               role="alert"
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               variants={errorVariants}
//             >
//               <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                 <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
//               </div>

//               <div>
//                 <span className="text-mainheading lg:text-base text-sm dark:text-white block max-w-60 leading-relaxed">
//                   {error}
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Success Message Display */}
//         <AnimatePresence>
//           {registerSuccess &&
//             !error && ( // Show success only if there's no error from a subsequent attempt
//               <motion.div
//                 className="flex bg-gray/10 dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 {/* Adjusted background/padding */}
//                 <div className="flex dark:bg-primary/20 bg-green-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-white dark:text-primary lg:size-8 size-6" />
//                 </div>
//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-mainheading dark:text-primary block font-medium">
//                     Registration successful!
//                   </span>
//                   {/* Improved text */}
//                   <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                     Redirecting to login...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//         </AnimatePresence>

//         <form onSubmit={handleSubmit} className="mt-0 space-y-4">
//           {/* Google Button */}
//           <div>
//             <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 h-14">
//               <Image
//                 src="/assets/icon/google.svg"
//                 width={28}
//                 height={28}
//                 alt="Google icon"
//               />
//               Continue with Google
//             </a>
//           </div>

//           {/* Full Name Input */}
//           <div>
//             <label
//               htmlFor="fullName"
//               className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base" // Adjusted styling
//             >
//               Full Name <span className="text-error">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               placeholder="Your Full Name "
//               autoComplete="name" // Added autocomplete
//               aria-required="true"
//               aria-invalid={!!fullNameError}
//               aria-describedby={fullNameError ? "fullName-error" : undefined}
//               className={`mt-1.5 block px-4 py-3 h-14 w-full border bg-white dark:bg-background rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                 fullNameError
//                   ? "border-red-700 border-2" // Simplified error state
//                   : "hover:shadow-darkcolor dark:hover:shadow-whitecolor" // Adjusted normal/focus states
//               }`}
//               value={fullName}
//               onChange={(e) => {
//                 setFullName(e.target.value);
//                 if (fullNameError) setFullNameError("");
//               }} // Clear error on change
//             />
//             {fullNameError && (
//               <p
//                 id="fullName-error"
//                 className="flex text-red-700 text-base items-center mt-0.5"
//                 role="alert"
//               >
//                 {/* Adjusted style/role */}
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {fullNameError}
//               </p>
//             )}
//           </div>

//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="email"
//               className="text-gray-500 dark:text-gray-300 block mb-1 lg:text-base text-sm"
//             >
//               Email Address <span className="text-error">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Your Email "
//               autoComplete="email" // Added autocomplete
//               aria-required="true"
//               aria-invalid={!!emailError}
//               aria-describedby={emailError ? "email-error" : undefined}
//               className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                 emailError
//                   ? "border-red-700 border-2"
//                   : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//               }`}
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (emailError) setEmailError("");
//               }} // Clear error on change
//             />
//             {emailError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {emailError}
//               </p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="password"
//               className="text-gray-500 dark:text-gray-300 block mb-1 lg:text-base text-sm"
//             >
//               Password <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Your Password"
//                 autoComplete="new-password" // Important for password managers
//                 aria-required="true"
//                 aria-invalid={!!passwordError}
//                 aria-describedby={passwordError ? "password-error" : undefined}
//                 className={`mt-1.5 block px-4 py-3 h-14 w-full border bg-white dark:bg-background rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                   passwordError
//                     ? "border-red-700 border-2"
//                     : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                 }`}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   if (passwordError) setPasswordError("");
//                 }} // Clear error on change
//               />
//               <button
//                 type="button"
//                 className="text-gray-500 dark:text-white cursor-pointer -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white dark:bg-background p-3 rounded-md" // Adjusted focus style
//                 onClick={togglePasswordVisibility}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <RiEyeCloseLine className="text-mainheading dark:text-white size-5" />
//                 ) : (
//                   <VscEye className="text-mainheading dark:text-white size-5" />
//                 )}
//               </button>
//             </div>
//             {passwordError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {passwordError}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password Input */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="text-gray-500 dark:text-gray-300 block mb-1 lg:text-base text-sm"
//             >
//               Confirm Password <span className="text-error">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 placeholder="Your Confirm Password"
//                 autoComplete="new-password"
//                 aria-required="true"
//                 aria-invalid={!!confirmPasswordError}
//                 aria-describedby={
//                   confirmPasswordError ? "confirmPassword-error" : undefined
//                 }
//                 className={`mt-1.5 block px-4 py-3 h-14 w-full border bg-white dark:bg-background rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
//                   confirmPasswordError
//                     ? "border-red-700 border-2"
//                     : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                 }`}
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   if (confirmPasswordError) setConfirmPasswordError("");
//                 }} // Clear error on change
//               />
//               <button
//                 type="button"
//                 className="text-gray-500 dark:text-white cursor-pointer -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white dark:bg-background p-3 rounded-md"
//                 onClick={toggleConfirmPasswordVisibility}
//                 aria-label={
//                   showConfirmPassword
//                     ? "Hide confirm password"
//                     : "Show confirm password"
//                 }
//               >
//                 {showConfirmPassword ? (
//                   <RiEyeCloseLine className="text-mainheading dark:text-white size-5" />
//                 ) : (
//                   <VscEye className="text-mainheading dark:text-white size-5" />
//                 )}
//               </button>
//             </div>
//             {confirmPasswordError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {confirmPasswordError}
//               </p>
//             )}
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             disabled={registerSuccess} // Disable button after successful registration to prevent double clicks
//             className={`bg-primary hover:bg-primaryhover rounded-full text-mainheading w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium  lg:py-3 py-2 lg:h-12.5 transition-colors`} // Adjusted styles, disabled state
//           >
//             {registerSuccess ? "Registered!" : "Register"}
//           </button>
//         </form>

//         {/* Terms and Policy Links */}
//         <p className="text-center text-mainheading dark:text-gray-300 my-3 text-sm">
//           {/* Adjusted styles */}
//           By registering, you accept our &nbsp;
//           <Link
//             href="/terms-and-conditions"
//             className="text-lime-500 dark:text-primary font-medium underline underline-offset-4" // Adjusted offset/hover
//           >
//             Terms of use &nbsp;
//           </Link>
//           and
//           <Link
//             href="/privacy-policy"
//             className="text-lime-500 dark:text-primary font-medium underline underline-offset-4"
//           >
//             &nbsp; Privacy Policy
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/auth/register/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import authService from "../../services/auth"; // Correct import path using alias
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
// import { FiX } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig"; // Import API config
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Get user and loading from AuthContext

//   const [fullNameError, setFullNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [registerSuccess, setRegisterSuccess] = useState(false); // State for successful registration
//   const [isErrorVisible, setIsErrorVisible] = useState(false); // State to control error visibility for animation
//   const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (!loading && user) {
//       router.push("/dashboard");
//     }
//   }, [user, loading, router]);

//   // Check for success message on mount (e.g., after redirection from register)
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("registerSuccess") === "true") {
//       setRegisterSuccess(true);
//     }
//   }, []); // Run only once on mount

//   useEffect(() => {
//     if (error) {
//       setIsErrorVisible(true);
//     } else {
//       setIsErrorVisible(false);
//     }
//   }, [error]);

//   const validateForm = () => {
//     let isValid = true;

//     setFullNameError(""); // Reset errors on validation
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     if (!fullName.trim()) {
//       setFullNameError("Full Name is required");
//       isValid = false;
//     }

//     if (!email.trim()) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Invalid email format");
//       isValid = false;
//     }

//     if (!password.trim()) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       isValid = false;
//     }

//     if (!confirmPassword.trim()) {
//       setConfirmPasswordError("Confirm Password is required");
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setRegisterSuccess(false);

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true); // Set submitting true
//     try {
//       await authService.register({ fullName, email, password });
//       setRegisterSuccess(true);
//       setTimeout(() => {
//         router.push("/auth/login?registerSuccess=true");
//       }, 300);
//     } catch (err: unknown) {
//       let errorMessage = "Registration failed. Please try again.";
//       if (typeof err === "object" && err !== null) {
//         const potentialError = err as {
//           response?: { data?: { message?: string } };
//           message?: string;
//         };
//         if (potentialError.response?.data?.message) {
//           errorMessage = potentialError.response.data.message;
//         } else if (potentialError.message) {
//           errorMessage = potentialError.message;
//         }
//       }
//       setError(errorMessage);
//     } finally {
//       setIsSubmitting(false); // Set submitting false
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };
//   // --- Google Login/Register Handler ---
//   const handleGoogleRegister = () => {
//     setError(""); // Clear previous errors
//     // Redirect browser to the backend endpoint that starts the Google flow
//     window.location.href = `${apiConfig.baseUrl}/auth/google`; // Same endpoint as login
//   };
//   // ----------------------------------

//   if (loading) {
//     return <p>Loading...</p>; // Or a loading spinner
//   }

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
//     <div className="flex justify-center items-center lg:h-[calc(100vh-82px)] px-4 bg-white dark:bg-background">
//       {/* Added padding */}
//       <div className="w-full max-w-md space-y-2 lg:mt-20 mt-10">
//         <h2 className="lg:text-3xl text-2xl text-center text-neutral-900 dark:text-white font-medium">
//           Create your Wise account
//         </h2>

//         <p className="text-center text-gray-500 dark:text-gray-300">
//           Already have an account? {/* Added space */}
//           <Link href="/auth/login">
//             <span className="text-primary font-medium capitalize underline underline-offset-4">
//               Log in
//             </span>
//           </Link>
//         </p>

//         {/* Error Message Display */}
//         <AnimatePresence>
//           {isErrorVisible && error && (
//             <motion.div
//               className="bg-lightgray dark:bg-primarybox rounded-2xl p-4 flex items-center gap-4 my-4"
//               role="alert"
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               variants={errorVariants}
//             >
//               <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                 <FiX className="p-0.5 text-red-600 lg:size-8 size-6" />
//               </div>

//               <div className="inline-block">
//                 <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                   {error}
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {registerSuccess &&
//             !error && ( // Show success only if there's no error from a subsequent attempt
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center my-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 {/* Adjusted background/padding */}
//                 <div className="flex dark:bg-primary/20 bg-green-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-white dark:text-primary lg:size-8 size-6" />
//                 </div>

//                 <div className="flex-grow space-y-0.5">
//                   <span className="text-neutral-900 dark:text-primary block font-medium">
//                     Registration successful!
//                   </span>
//                   {/* Improved text */}
//                   <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                     Redirecting to login...
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//         </AnimatePresence>

//         <form onSubmit={handleSubmit} className="mt-5 space-y-4">
//           {/* --- Updated Google Button --- */}
//           <div>
//             <button
//               type="button" // Keep type="button"
//               className="flex dark:bg-background border justify-center rounded-lg h-14 text-neutral-900 dark:text-white w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base" // Added hover effect
//               onClick={handleGoogleRegister} // Use the new handler
//             >
//               <Image
//                 src="/assets/icon/google.svg"
//                 width={28}
//                 height={28}
//                 alt="Google icon"
//               />
//               Continue with Google
//             </button>
//           </div>

//           {/* Full Name Input */}
//           <div>
//             <label
//               htmlFor="fullName"
//               className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base" // Adjusted styling
//             >
//               Full Name{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               placeholder="Your Full Name "
//               autoComplete="name" // Added autocomplete
//               aria-required="true"
//               aria-invalid={!!fullNameError}
//               aria-describedby={fullNameError ? "fullName-error" : undefined}
//               className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                 fullNameError
//                   ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" // Simplified error state
//                   : "focus:border-[#5f5f5f]" // Adjusted normal/focus states
//               }`}
//               value={fullName}
//               onChange={(e) => {
//                 setFullName(e.target.value);
//                 if (fullNameError) setFullNameError("");
//               }} // Clear error on change
//             />
//             {fullNameError && (
//               <p
//                 id="fullName-error"
//                 className="flex text-red-700 text-base items-center mt-0.5"
//                 role="alert"
//               >
//                 {/* Adjusted style/role */}
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {fullNameError}
//               </p>
//             )}
//           </div>

//           {/* Email Input */}
//           <div className="email">
//             <label
//               htmlFor="email"
//               className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//             >
//               Email Address{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Your Email "
//               autoComplete="email" // Added autocomplete
//               aria-required="true"
//               aria-invalid={!!emailError}
//               aria-describedby={emailError ? "email-error" : undefined}
//               className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                 emailError
//                   ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                   : "focus:border-[#5f5f5f]"
//               }`}
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (emailError) setEmailError("");
//               }} // Clear error on change
//             />
//             {emailError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {emailError}
//               </p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div className="password">
//             <label
//               htmlFor="password"
//               className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//             >
//               Password <span className="text-red-600">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Your Password"
//                 autoComplete="new-password" // Important for password managers
//                 aria-required="true"
//                 aria-invalid={!!passwordError}
//                 aria-describedby={passwordError ? "password-error" : undefined}
//                 className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                   passwordError
//                     ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                     : "focus:border-[#5f5f5f]"
//                 }`}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   if (passwordError) setPasswordError("");
//                 }} // Clear error on change
//               />
//               <button
//                 type="button"
//                 className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background" // Adjusted focus style
//                 onClick={togglePasswordVisibility}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <LuEye size={22} /> : <LuEyeClosed size={22} />}
//               </button>
//             </div>
//             {passwordError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5" />
//                 </span>
//                 {passwordError}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password Input */}
//           <div className="conform-password">
//             <label
//               htmlFor="confirmPassword"
//               className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//             >
//               Confirm Password{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 placeholder="Your Confirm Password"
//                 autoComplete="new-password"
//                 aria-required="true"
//                 aria-invalid={!!confirmPasswordError}
//                 aria-describedby={
//                   confirmPasswordError ? "confirmPassword-error" : undefined
//                 }
//                 className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                   confirmPasswordError
//                     ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                     : "focus:border-[#5f5f5f]"
//                 }`}
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   if (confirmPasswordError) setConfirmPasswordError("");
//                 }} // Clear error on change
//               />
//               <button
//                 type="button"
//                 className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                 onClick={toggleConfirmPasswordVisibility}
//                 aria-label={
//                   showConfirmPassword
//                     ? "Hide confirm password"
//                     : "Show confirm password"
//                 }
//               >
//                 {showConfirmPassword ? (
//                   <LuEye size={22} />
//                 ) : (
//                   <LuEyeClosed size={22} />
//                 )}
//               </button>
//             </div>
//             {confirmPasswordError && (
//               <p className="flex text-red-700 text-base items-center mt-0.5">
//                 <span className="mr-1">
//                   <IoMdCloseCircle className="size-5"/>
//                 </span>
//                 {confirmPasswordError}
//               </p>
//             )}
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             disabled={registerSuccess} // Disable button after successful registration to prevent double clicks
//             className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center`} // Adjusted styles, disabled state
//           >
//             {registerSuccess ? "Registered!" : "Register"}
//           </button>
//         </form>

//         {/* Terms and Policy Links */}
//         <p className="text-center text-neutral-900 dark:text-gray-300 pb-6 text-sm">
//           {/* Adjusted styles */}
//           By registering, you accept our &nbsp;
//           <Link
//             href="/terms-and-conditions"
//             className="text-primary font-medium underline underline-offset-4" // Adjusted offset/hover
//           >
//             Terms of use &nbsp;
//           </Link>
//           and
//           <Link
//             href="/privacy-policy"
//             className="text-primary font-medium underline underline-offset-4"
//           >
//             &nbsp; Privacy Policy
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/auth/register/page.tsx
// "use client";

// import { useState, useEffect, FormEvent } from "react"; // Correct import for FormEvent
// import authService from "../../services/auth"; // Correct import path using alias
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
// import { FiX } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";
// import apiConfig from "../../config/apiConfig"; // Import API config
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// // --- Animation Variants (Same as LoginPage) ---

// // Variant for the main container to orchestrate children animations
// const pageContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08, // Slightly faster stagger for potentially more elements
//       delayChildren: 0.2, // Wait 0.2s before starting children animations
//     },
//   },
//   exit: {
//     opacity: 0,
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

// // Variants for error messages (keeping your existing style)
// const errorVariants = {
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

// // Variants for success message (using a similar style to error for consistency, adjust if needed)
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

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Get user and loading from AuthContext

//   const [fullNameError, setFullNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [registerSuccess, setRegisterSuccess] = useState(false); // State for successful registration
//   const [isErrorVisible, setIsErrorVisible] = useState(false); // State to control error visibility for animation
//   const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state
//   const [isSuccessVisible, setIsSuccessVisible] = useState(false); // State for success animation visibility

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (!loading && user) {
//       router.push("/dashboard"); // Or appropriate logged-in route
//     }
//   }, [user, loading, router]);

//   // Check for success message on mount (if redirected with param)
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("registerSuccess") === "true") {
//       // You might not need to set registerSuccess here if the login page handles it,
//       // but keeping it doesn't hurt if you want a visual cue *before* login.
//       // Let's remove the direct setting here and rely on the login page message.
//       window.history.replaceState(null, "", "/auth/register"); // Clean URL
//     }
//   }, []); // Run only once on mount

//   // Control error visibility for animation
//   useEffect(() => {
//     setIsErrorVisible(!!error);
//   }, [error]);

//   // Control success visibility for animation
//   useEffect(() => {
//     setIsSuccessVisible(registerSuccess);
//   }, [registerSuccess]);

//   const validateForm = () => {
//     let isValid = true;
//     setFullNameError("");
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError("");
//     setError(""); // Clear general error as well

//     if (!fullName.trim()) {
//       setFullNameError("Full Name is required");
//       isValid = false;
//     }
//     if (!email.trim()) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Invalid email format");
//       isValid = false;
//     }
//     if (!password.trim()) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       isValid = false;
//     }
//     if (!confirmPassword.trim()) {
//       setConfirmPasswordError("Confirm Password is required");
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       isValid = false;
//     }
//     return isValid;
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     // Use FormEvent
//     e.preventDefault();
//     setError("");
//     setRegisterSuccess(false); // Reset success state on new submit attempt

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await authService.register({ fullName, email, password });
//       setRegisterSuccess(true); // Set success state to show message
//       // Add a slight delay before redirecting to allow user to see the success message
//       setTimeout(() => {
//         router.push("/auth/login?registerSuccess=true");
//       }, 1500); // Redirect after 1.5 seconds
//     } catch (err: unknown) {
//       let errorMessage = "Registration failed. Please try again.";
//       if (typeof err === "object" && err !== null) {
//         const potentialError = err as {
//           response?: { data?: { message?: string } };
//           message?: string;
//         };
//         if (potentialError.response?.data?.message) {
//           errorMessage = potentialError.response.data.message;
//         } else if (potentialError.message) {
//           errorMessage = potentialError.message;
//         }
//       }
//       setError(errorMessage);
//       setRegisterSuccess(false); // Ensure success state is false on error
//     } finally {
//       // Don't set submitting false immediately if successful, wait for redirect
//       if (!registerSuccess) {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);

//   const handleGoogleRegister = () => {
//     setError("");
//     setRegisterSuccess(false);
//     window.location.href = `${apiConfig.baseUrl}/auth/google`;
//   };

//   // Optional Loading State (already present)
//   if (loading && !user) {
//     // Only show loading if not already logged in
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading...</p> {/* Replace with a proper spinner */}
//       </div>
//     );
//   }

//   // --- RENDER SECTION (Updated with motion wrappers) ---
//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-82px)] px-4 bg-white dark:bg-background">
//       {/* Use AnimatePresence for potential exit animations if needed */}
//       <AnimatePresence mode="wait">
//         {/* Apply page container variants to the main content div */}
//         <motion.div
//           key="register-content" // Key for AnimatePresence
//           className="w-full max-w-md space-y-2 lg:mt-16 mt-10" // Removed lg:mt-20, handled by flex parent
//           variants={pageContainerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           {/* Title */}
//           <motion.h2
//             variants={itemVariants}
//             className="lg:text-3xl text-2xl text-center text-neutral-900 dark:text-white font-medium"
//           >
//             Create your Wise account
//           </motion.h2>

//           {/* Login Link */}
//           <motion.p
//             variants={itemVariants}
//             className="text-center text-gray-500 dark:text-gray-300"
//           >
//             Already have an account?{" "}
//             <Link href="/auth/login">
//               <span className="text-primary font-medium capitalize underline underline-offset-4">
//                 Log in
//               </span>
//             </Link>
//           </motion.p>

//           {/* Error Message Display (Uses existing AnimatePresence/motion) */}
//           <AnimatePresence>
//             {isErrorVisible && error && (
//               <motion.div
//                 className="bg-lightgray dark:bg-primarybox rounded-2xl p-4 flex items-center gap-4 mt-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants} // Using error variants
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-red-600 lg:size-8 size-6" />
//                 </div>
//                 <div className="inline-block">
//                   <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {error}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Success Message Display */}
//           <AnimatePresence>
//             {isSuccessVisible &&
//               !error && ( // Show only if successful and no overriding error
//                 <motion.div
//                   className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-4"
//                   role="alert"
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   variants={successVariants} // Using success variants
//                 >
//                   <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                     <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                   </div>
//                   <div className="flex-grow space-y-0.5">
//                     <span className="text-neutral-900 dark:text-primary block font-medium">
//                       Registration successful!
//                     </span>
//                     <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                       Redirecting to login...
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//           </AnimatePresence>

//           {/* Form */}
//           {/* We apply itemVariants to each logical block within the form */}
//           <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
//             {/* Google Button */}
//             <motion.div variants={itemVariants}>
//               <button
//                 type="button"
//                 className="flex dark:bg-background border justify-center rounded-lg h-14 text-neutral-900 dark:text-white w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
//                 onClick={handleGoogleRegister}
//                 disabled={isSubmitting || registerSuccess} // Disable during submit/success
//               >
//                 <Image
//                   src="/assets/icon/google.svg"
//                   width={28}
//                   height={28}
//                   alt="Google icon"
//                 />
//                 Continue with Google
//               </button>
//             </motion.div>

//             {/* Full Name Input */}
//             <motion.div variants={itemVariants}>
//               <label
//                 htmlFor="fullName"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Full Name{" "}
//                 <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="fullName"
//                 placeholder="Your Full Name"
//                 autoComplete="name"
//                 aria-required="true"
//                 aria-invalid={!!fullNameError}
//                 aria-describedby={fullNameError ? "fullName-error" : undefined}
//                 className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                   fullNameError
//                     ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                     : "focus:border-[#5f5f5f]"
//                 }`}
//                 value={fullName}
//                 onChange={(e) => {
//                   setFullName(e.target.value);
//                   if (fullNameError) setFullNameError("");
//                 }}
//                 disabled={isSubmitting || registerSuccess} // Disable during submit/success
//               />
//               {fullNameError && (
//                 <p
//                   id="fullName-error"
//                   className="flex text-red-700 text-base items-center mt-0.5"
//                   role="alert"
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {fullNameError}
//                 </p>
//               )}
//             </motion.div>

//             {/* Email Input */}
//             <motion.div className="email" variants={itemVariants}>
//               <label
//                 htmlFor="email"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Your email address{" "}
//                 <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Your Email"
//                 autoComplete="email"
//                 aria-required="true"
//                 aria-invalid={!!emailError}
//                 aria-describedby={emailError ? "email-error" : undefined}
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
//                 disabled={isSubmitting || registerSuccess} // Disable during submit/success
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
//             </motion.div>

//             {/* Password Input */}
//             <motion.div className="password" variants={itemVariants}>
//               <label
//                 htmlFor="password"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Password{" "}
//                 <span className="text-red-600">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="Your Password"
//                   autoComplete="new-password"
//                   aria-required="true"
//                   aria-invalid={!!passwordError}
//                   aria-describedby={
//                     passwordError ? "password-error" : undefined
//                   }
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
//                   disabled={isSubmitting || registerSuccess} // Disable during submit/success
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   disabled={isSubmitting || registerSuccess} // Disable during submit/success
//                 >
//                   {showPassword ? (
//                     <LuEye size={24} />
//                   ) : (
//                     <LuEyeClosed size={24} />
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
//             </motion.div>

//             {/* Confirm Password Input */}
//             <motion.div className="conform-password" variants={itemVariants}>
//               <label
//                 htmlFor="confirmPassword"
//                 className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//               >
//                 Confirm Password{" "}
//                 <span className="text-red-600">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   placeholder="Confirm Your Password" // Adjusted placeholder
//                   autoComplete="new-password"
//                   aria-required="true"
//                   aria-invalid={!!confirmPasswordError}
//                   aria-describedby={
//                     confirmPasswordError ? "confirmPassword-error" : undefined
//                   }
//                   className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                     confirmPasswordError
//                       ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                       : "focus:border-[#5f5f5f]"
//                   }`}
//                   value={confirmPassword}
//                   onChange={(e) => {
//                     setConfirmPassword(e.target.value);
//                     if (confirmPasswordError) setConfirmPasswordError("");
//                   }}
//                   disabled={isSubmitting || registerSuccess} // Disable during submit/success
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-4 top-4 cursor-pointer text-gray-500 dark:text-gray-300 focus:outline-none bg-white dark:bg-background"
//                   onClick={toggleConfirmPasswordVisibility}
//                   aria-label={
//                     showConfirmPassword
//                       ? "Hide confirm password"
//                       : "Show confirm password"
//                   }
//                   disabled={isSubmitting || registerSuccess} // Disable during submit/success
//                 >
//                   {showConfirmPassword ? (
//                     <LuEye size={24} />
//                   ) : (
//                     <LuEyeClosed size={24} />
//                   )}
//                 </button>
//               </div>
//               {confirmPasswordError && (
//                 <p
//                   id="confirmPassword-error"
//                   className="flex text-red-700 text-base items-center mt-0.5"
//                 >
//                   <span className="mr-1">
//                     <IoMdCloseCircle className="size-5" />
//                   </span>
//                   {confirmPasswordError}
//                 </p>
//               )}
//             </motion.div>

//             {/* Register Button */}
//             <motion.div variants={itemVariants}>
//               <button
//                 type="submit"
//                 disabled={isSubmitting || registerSuccess} // Disable button during submission or after success
//                 className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                   isSubmitting || registerSuccess
//                     ? "opacity-50 cursor-not-allowed" // Disabled style
//                     : "bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer" // Normal style
//                 }`}
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
//                     <span>Registering...</span>
//                   </>
//                 ) : registerSuccess ? (
//                   "Registered!"
//                 ) : (
//                   "Register"
//                 )}
//               </button>
//             </motion.div>

//             {/* Terms and Policy Links */}
//             <motion.p
//               variants={itemVariants}
//               className="text-center text-neutral-900 dark:text-gray-300 pb-6 text-sm"
//             >
//               By registering, you accept our  
//               <Link
//                 href="/terms-and-conditions"
//                 className="text-primary font-medium underline underline-offset-4"
//               >
//                 Terms of use 
//               </Link>
//               and
//               <Link
//                 href="/privacy-policy"
//                 className="text-primary font-medium underline underline-offset-4"
//               >
//                  Privacy Policy
//               </Link>
//               .
//             </motion.p>
//           </form>
//         </motion.div>{" "}
//         {/* End of main content motion wrapper */}
//       </AnimatePresence>
//     </div>
//   );
// }




"use client";

import { useState, useEffect, FormEvent } from "react";
import authService from "../../services/auth"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext"; // Ensure this path is correct
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import apiConfig from "../../config/apiConfig"; // Ensure this path is correct
import { LuEye, LuEyeOff } from "react-icons/lu";

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

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneralErrorVisible, setIsGeneralErrorVisible] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isRegisterSuccessVisible, setIsRegisterSuccessVisible] =
    useState(false);

  useEffect(() => {
    if (!loading && user) {
      console.log("Register page: User logged in. Redirecting to dashboard.");
      router.push("/dashboard"); // Or appropriate logged-in route
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsGeneralErrorVisible(!!generalError);
  }, [generalError]);

  useEffect(() => {
    setIsRegisterSuccessVisible(registerSuccess);
  }, [registerSuccess]);

  const validateForm = () => {
    let isValid = true;
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");
    setIsGeneralErrorVisible(false);

    if (!fullName.trim()) {
      setFullNameError("Full Name is required");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterSuccess(false);
    setIsRegisterSuccessVisible(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.register({ fullName, email, password });
      console.log("Registration successful in component");
      setRegisterSuccess(true);
      setTimeout(() => {
        router.push("/auth/login?registerSuccess=true");
      }, 1500);
    } catch (err: any) {
      let message = "Registration failed. Please try again.";
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setGeneralError(message);
      setIsGeneralErrorVisible(true);
      setRegisterSuccess(false);
    } finally {
      // Don't set submitting false immediately if successful, wait for redirect
      if (!registerSuccess) {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleGoogleRegister = () => {
    setGeneralError("");
    setIsGeneralErrorVisible(false);
    setRegisterSuccess(false);
    setIsRegisterSuccessVisible(false);
    window.location.href = `${apiConfig.baseUrl}/auth/google`;
  };

  const steps = [
    { num: 1, title: "Sign up your account", active: true },
    { num: 2, title: "Sign in your account" },
    { num: 3, title: "Set up your KYC" },
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
            Create Your
            <br />
            Account
          </motion.h1>
          <motion.p
            className="text-base xl:text-lg text-gray-200 mb-10 xl:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Follow these simple steps to
            <br />
            get started with Remityn.
          </motion.p>

          <div className="flex xl:flex-row flex-col gap-4 w-full">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                className={`flex flex-col justify-between xl:w-50 xl:h-50 w-full h-26 p-3.5 xl:p-4 rounded-xl transition-all duration-300 ${
                  step.active ? "bg-white shadow-lg" : "bg-white/12"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`flex items-center justify-center size-7 xl:size-10 rounded-full mr-3 xl:mr-4 shrink-0 ${
                    step.active
                      ? "bg-background text-white" // Assuming bg-background is dark for active step number
                      : "bg-white/12 text-white"
                  } font-semibold text-lg`}
                >
                  {step.num}
                </div>
                <span
                  className={`text-lg ${
                    step.active
                      ? "font-medium text-mainheading" // Assuming text-mainheading is dark for active step title
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

      {/* Right Panel - Register Form */}
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
            key="register-form-container"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="space-y-1 mb-6 lg:text-left text-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl text-mainheadingWhite font-semibold">
                Create Account.
              </h2>
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primaryhover font-medium underline underline-offset-2 transition-all duration-75 ease-linear"
                >
                  Log in
                </Link>
              </p>
            </motion.div>

            <AnimatePresence>
              {isGeneralErrorVisible && generalError && (
                <motion.div
                  key="general-error-msg"
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
                    <p className="text-white">{generalError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isRegisterSuccessVisible && registerSuccess && (
                <motion.div
                  key="register-success-msg"
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
                      Registration successful!
                    </span>
                    <span className="text-white block">
                      Redirecting to login...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  className="flex hover:bg-primarybox transition-all duration-75 ease-linear border justify-center rounded-lg h-14 text-white w-full cursor-pointer font-medium gap-2.5 items-center px-4 py-3"
                  onClick={handleGoogleRegister}
                  disabled={isSubmitting || registerSuccess}
                >
                  <Image
                    src="/assets/icon/google.svg"
                    width={25}
                    height={24}
                    alt="Google"
                  />
                  Sign up with Google
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center py-2"
              >
                <hr className="flex-grow border-t border-gray-600" /> {/* Adjusted border color */}
                <span className="px-3 text-white">Or</span>
                <hr className="flex-grow border-t border-gray-600" /> {/* Adjusted border color */}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="fullName"
                  className="text-white inline-block mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="eg. John Doe"
                  autoComplete="name"
                  className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear
                    ${
                      fullNameError
                        ? "border-red-600 ring-1 ring-red-600"
                        : "border-primarybox"
                    }`}
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fullNameError) setFullNameError("");
                  }}
                  aria-invalid={!!fullNameError}
                  disabled={isSubmitting || registerSuccess}
                />
                {fullNameError && (
                  <p className="flex text-red-500 text-sm items-center mt-1">
                    <IoMdCloseCircle className="size-3.5 mr-1" />{" "}
                    {fullNameError}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="text-white inline-block mb-1.5"
                >
                  Your email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="eg. john.doe@example.com"
                  autoComplete="email"
                  className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear 
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
                  disabled={isSubmitting || registerSuccess}
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
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all ease-linear duration-75 pr-10
                      ${
                        passwordError
                          ? "border-red-600 ring-1 ring-red-600"
                          : "border-[#3A3A3A]" // Matched login page
                      }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    aria-invalid={!!passwordError}
                    disabled={isSubmitting || registerSuccess}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-300 focus:outline-none transition-all duration-75 ease-linear"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isSubmitting || registerSuccess}
                  >
                    {showPassword ? (
                      <LuEye size={18} />
                    ) : (
                      <LuEyeOff size={18} />
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

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="confirmPassword"
                  className="text-white inline-block mb-1.5"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10
                      ${
                        confirmPasswordError
                          ? "border-red-600 ring-1 ring-red-600"
                          : "border-[#3A3A3A]" // Matched login page
                      }`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError("");
                    }}
                    aria-invalid={!!confirmPasswordError}
                    disabled={isSubmitting || registerSuccess}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-300 focus:outline-none transition-all duration-75 ease-linear"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    disabled={isSubmitting || registerSuccess}
                  >
                    {showConfirmPassword ? (
                      <LuEye size={18} />
                    ) : (
                      <LuEyeOff size={18} />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="flex text-red-500 text-sm items-center mt-1">
                    <IoMdCloseCircle className="size-3.5 mr-1" />{" "}
                    {confirmPasswordError}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  className={`bg-primary hover:bg-primaryhover w-full text-neutral-900 font-semibold py-3 px-8 h-14 rounded-lg transition-all duration-75 ease-linear flex items-center justify-center 
                    ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  disabled={isSubmitting || registerSuccess}
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
                      <span>Creating Account...</span>
                    </>
                  ) : registerSuccess ? (
                    "Success!"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </motion.div>
            </form>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-xs mt-6 text-center"
            >
              By creating an account, you agree to our{" "}
              <Link
                href="/terms-and-conditions"
                className="font-medium text-primary hover:text-primaryhover underline underline-offset-2 transition-all duration-75 ease-linear"
              >
                Terms of use
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-primary hover:text-primaryhover underline underline-offset-2 transition-all duration-75 ease-linear"
              >
                Privacy Policy
              </Link>
              .
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}