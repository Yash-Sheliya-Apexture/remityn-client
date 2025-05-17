// import React from "react";

// const page = () => {
//   return <div>Reset password Feild</div>;
// };

// export default page;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill this field");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     setIsLoading(true);

//     // Simulate API call
//     try {
//       const response = await simulateResetRequest(email);

//       if (response.success) {
//         setSuccessMessage(
//           "If an account exists with that email, a password reset link has been sent to your email address."
//         );
//       } else {
//         setError(
//           "An error occurred while processing your request. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Reset error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-white justify-center items-center min-h-screen">
//       <div className="mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//         />
//       </div>

//       <h2 className="text-5xl capitalize font-black mb-6">Reset password</h2>
//       <p className="text-center text-gray max-w-md mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             className="border rounded-lg w-full block duration-300 ease-in-out mt-1 px-4 py-3 transition-shadow"
//             id="email"
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//           />
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover text-green font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-gray-500 text-sm mt-6">
//         Need help? Read this
//         <a href="#" className="text-blue-500 hover:underline">
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-white justify-center items-center mb-5 min-h-screen px-4">
//       <div className="mb-4">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//           className="lg:size-60 size-40"
//         />
//       </div>

//       <h2 className="text-3xl capitalize font-black mb-6 md:text-5xl">
//         Reset password
//       </h2>
//       <p className="text-center text-gray text-lg max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-5">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover cursor-pointer text-green font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray mt-6">
//         Need help? Read this
//         <a
//           href="#"
//           className="text-green font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// export default ResetPasswordForm;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false); // New state variable

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);

//       // Simulate API call
//       try {
//         const response = await simulateResetRequest(email);

//         if (response.success) {
//           setEmailSent(true); // Set emailSent to true after successful simulation
//         } else {
//           setError(
//             "An error occurred while processing your request. Please try again."
//           );
//         }
//       } catch (err) {
//         console.error("Reset error:", err);
//         setError("An error occurred. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Render Check Your Email design
//   if (emailSent) {
//     return (
//       <div className="flex flex-col bg-gray-50 justify-center items-center mb-6 min-h-screen">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="size-60"
//             />
//           </div>

//           <h2 className="text-3xl text-black text-center capitalize font-black mb-4 md:text-5xl">
//             Check your email
//           </h2>

//           <p className="text-base text-center text-gray mb-4">
//             We sent an email to
//             <span className="font-medium">
//               <span className="text-green font-medium"> {email}</span>
//             </span>
//           </p>

//           <p className="text-base text-center text-gray mb-4">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           <button
//             onClick={() => setEmailSent(false)} // Go back to the form
//             className="bg-lightgreen rounded-full text-green w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium hover:bg-lightgreen-hover mb-3 mx-auto px-6 py-3 transition-colors"
//           >
//             Send email again
//           </button>

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?
//             <a href="#" className="text-green underline underline-offset-4">
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render Reset Password Form
//   return (
//     <div className="flex flex-col bg-white justify-center items-center mb-5 min-h-screen">
//       <div className="mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//         />
//       </div>

//       <h2 className="text-5xl capitalize font-black mb-6">Reset password</h2>
//       <p className="text-center text-gray text-lg max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-5">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover cursor-pointer text-green font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray mt-6">
//         Need help? Read this
//         <a
//           href="#"
//           className="text-green font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { IoMdCheckmark } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false); // New state variable
//   const [emailResent, setEmailResent] = useState(false);

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);

//       // Simulate API call
//       try {
//         const response = await simulateResetRequest(email);

//         if (response.success) {
//           setEmailSent(true); // Set emailSent to true after successful simulation
//         } else {
//           setError(
//             "An error occurred while processing your request. Please try again."
//           );
//         }
//       } catch (err) {
//         console.error("Reset error:", err);
//         setError("An error occurred. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSendAgain = async () => {
//     setEmailResent(true);
//     setIsLoading(true);

//     try {
//       const response = await simulateResetRequest(email);
//       if (response.success) {
//         setSuccessMessage(
//           "A new password reset link has been sent to your email address."
//         );
//       } else {
//         setError(
//           "An error occurred while processing your request. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Reset error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render Check Your Email design
//   if (emailSent) {
//     return (
//       <div className="flex flex-col justify-center items-center mb-6 min-h-screen">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="size-60"
//             />
//           </div>

//           <h2 className="text-3xl text-black text-center capitalize font-black mb-4 md:text-5xl">
//             Check your email
//           </h2>

//           <p className="text-base text-center text-gray mb-4">
//             We sent an email to
//             <span className="font-medium">
//               <span className="text-green font-medium"> {email}</span>
//             </span>
//           </p>

//           <p className="text-base text-center text-gray mb-4">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           {emailResent && (
//             <div className="flex bg-green/8 p-6 rounded-2xl cursor-pointer gap-4 items-center mb-4">
//               <div className="flex bg-[#2f5711] justify-center rounded-full items-center size-12">
//                 <IoMdCheckmark className="text-white size-6" />
//               </div>
//               <p className="text-gray text-lg">
//                 Please check your email inbox again.
//               </p>
//             </div>
//           )}

//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading}
//             className={`bg-lightgreen rounded-full text-green text-lg w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium hover:bg-lightgreen-hover mb-3 mx-auto px-6 py-3 transition-colors ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Sending..." : "Send email again"}
//           </button>

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?
//             <a href="#" className="text-green underline underline-offset-4">
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render Reset Password Form
//   return (
//     <div className="flex flex-col bg-white justify-center items-center mb-5 min-h-screen">
//       <div className="max-w-xl mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//         />
//       </div>

//       <h2 className="text-5xl capitalize font-black mb-6">Reset password</h2>
//       <p className="text-center text-gray text-lg max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-5">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover cursor-pointer text-green font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray mt-6">
//         Need help? Read this
//         <a
//           href="#"
//           className="text-green font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { IoMdCheckmark } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false); // New state variable
//   const [emailResent, setEmailResent] = useState(false);
//   const [showCheckAgainMessage, setShowCheckAgainMessage] = useState(false); // State to control paragraph visibility

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);

//       // Simulate API call
//       try {
//         const response = await simulateResetRequest(email);

//         if (response.success) {
//           setEmailSent(true); // Set emailSent to true after successful simulation
//         } else {
//           setError(
//             "An error occurred while processing your request. Please try again."
//           );
//         }
//       } catch (err) {
//         console.error("Reset error:", err);
//         setError("An error occurred. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSendAgain = async () => {
//     setEmailResent(true);
//     setIsLoading(true);
//     setShowCheckAgainMessage(false); // Hide paragraph before sending again

//     try {
//       const response = await simulateResetRequest(email);
//       if (response.success) {
//         setSuccessMessage(
//           "A new password reset link has been sent to your email address."
//         );
//         setShowCheckAgainMessage(true); // Show paragraph after successful re-send
//       } else {
//         setError(
//           "An error occurred while processing your request. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Reset error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render Check Your Email design
//   if (emailSent) {
//     return (
//       <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="lg:size-48 size-40"
//             />
//           </div>

//           <h2 className="lg:text-5xl text-center text-3xl capitalize font-black mb-6">
//             Check your email
//           </h2>

//           <p className="lg:text-base text-sm text-center text-gray text-nowrap mb-6">
//             We sent an email to
//             <span className="font-semibold text-secondary">{email}</span>
//           </p>

//           <p className="lg:text-base  text-sm text-center text-gray mb-6">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           {showCheckAgainMessage && (
//             <div className="flex bg-green/8 lg:p-6 p-4 rounded-2xl cursor-pointer lg:gap-4 gap-2 items-center mb-4">
//               <div className="flex bg-green justify-center rounded-full items-center lg:size-12 size-8">
//                 <IoMdCheckmark className="text-white size-6" />
//               </div>
//               <p className="text-gray text-lg">
//                 Please check your email inbox again.
//               </p>
//             </div>
//           )}

//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading}
//             className={`bg-primary hover:bg-primary-hover cursor-pointer rounded-full text-secondary text-lg w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium mb-3 mx-auto py-3 transition-colors ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Sending..." : "Send email again"}
//           </button>

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?
//             <a
//               href="#"
//               className="text-secondary underline font-medium underline-offset-4"
//             >
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render Reset Password Form
//   return (
//     <div className="flex flex-col bg-white justify-center items-center lg:h-[calc(100vh-73px)] px-4 pt-10">
//       <div className="max-w-lg mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//           className="lg:size-48 size-40"
//         />
//       </div>

//       <h2 className="lg:text-5xl text-3xl capitalize font-black mb-4">
//         Reset password
//       </h2>
//       <p className="text-center text-gray lg:text-lg text-base max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-2 lg:mt-5">
//         <div className="mb-4">
//           <label htmlFor="email" className="text-sm text-gray block capitalize">
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-primary hover:bg-primary-hover cursor-pointer text-secondary font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray my-6">
//         Need help? Read this
//         <a
//           href="#"
//           className="text-secondary font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle, IoMdCheckmark } from "react-icons/io";
// import authService from "../../services/auth"; // Correct import path using alias

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [emailError, setEmailError] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [emailSent, setEmailSent] = useState<boolean>(false);
//   const [emailResent, setEmailResent] = useState<boolean>(false); // ADDED: Define setEmailResent state
//   const [showCheckAgainMessage, setShowCheckAgainMessage] =
//     useState<boolean>(false);
//   const [resendError, setResendError] = useState<string>(""); // State for resend error message
//   const [resendAttemptFailed, setResendAttemptFailed] =
//     useState<boolean>(false); // Track if resend has already failed

//   const isValidEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     let isValid = true;
//     setError("");
//     setSuccessMessage("");
//     setEmailSent(false); // Reset emailSent on new submission

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);
//       try {
//         await authService.forgotPassword({ email });
//         setEmailSent(true);
//         setResendAttemptFailed(false); // Reset resend attempt status on successful send
//       } catch (err: any) {
//         setError(
//           err.message ||
//             "An error occurred while processing your request. Please try again."
//         );
//         setEmailSent(false); // Ensure emailSent is false if initial send fails
//         setResendAttemptFailed(false); // Reset resend attempt status even if initial send fails to allow resend attempt
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSendAgain = async () => {
//     if (resendAttemptFailed) {
//       return; // Prevent further resend attempts if already failed
//     }

//     setEmailResent(true);
//     setIsLoading(true);
//     setShowCheckAgainMessage(false);
//     setResendError(""); // Clear any previous resend errors

//     try {
//       await authService.forgotPassword({ email });
//       setSuccessMessage(
//         "A new password reset link has been sent to your email address."
//       );
//       setShowCheckAgainMessage(true);
//       setResendAttemptFailed(false); // Reset resend attempt status on successful resend
//     } catch (err: any) {
//       setResendError(
//         err.message || "Failed to send email again. Please try again later."
//       );
//       setResendAttemptFailed(true); // Set resend attempt to failed
//       setShowCheckAgainMessage(false); // Hide success message if resend fails
//       setSuccessMessage(""); // Clear success message if resend fails
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (emailSent) {
//     return (
//       <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="lg:size-48 size-40"
//             />
//           </div>

//           <h2 className="lg:text-5xl text-center text-3xl capitalize font-black mb-6">
//             Check your email
//           </h2>

//           <p className="lg:text-base text-sm text-center text-gray text-nowrap mb-6">
//             We sent an email to
//             <span className="font-semibold text-secondary">{email}</span>
//           </p>

//           <p className="lg:text-base  text-sm text-center text-gray mb-6">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           {showCheckAgainMessage && (
//             <div className="flex bg-green/8 lg:p-6 p-4 rounded-2xl cursor-pointer lg:gap-4 gap-2 items-center mb-4">
//               <div className="flex bg-green justify-center rounded-full items-center lg:size-12 size-8">
//                 <IoMdCheckmark className="text-white size-6" />
//               </div>
//               <p className="text-gray lg:text-lg text-base">
//                 Please check your email inbox again.
//               </p>
//             </div>
//           )}

//           {resendError && ( // Display resend error message
//             <div
//               className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//               role="alert"
//             >
//               <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-12">
//                 <IoMdCloseCircle className="p-0.5 text-white size-8" />
//               </div>
//               <div>
//                 <span className="text-gray block max-w-60">{resendError}</span>
//               </div>
//             </div>
//           )}

//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading || resendAttemptFailed} // Disable button if loading or resend failed
//             className={`bg-primary hover:bg-primary-hover cursor-pointer rounded-full text-secondary text-lg w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium mb-3 mx-auto py-3 transition-colors
//                             ${
//                               isLoading || resendAttemptFailed
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : ""
//                             }`}
//           >
//             {isLoading ? "Sending..." : "Send email again"}
//           </button>

//           {resendAttemptFailed && ( // Show message if resend failed
//             <p className="text-center text-red-500 text-sm mt-2">
//               Couldn't send email again. Please try again later.
//             </p>
//           )}

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?
//             <a
//               href="#"
//               className="text-secondary underline font-medium underline-offset-4"
//             >
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col bg-white justify-center items-center lg:h-[calc(100vh-73px)] px-4 pt-10">
//       <div className="max-w-lg mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Key Icon"
//           className="lg:size-48 size-40"
//         />
//       </div>

//       <h2 className="lg:text-5xl text-3xl capitalize font-black mb-4">
//         Reset password
//       </h2>
//       <p className="text-center text-gray lg:text-lg text-base max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-2 lg:mt-5">
//         <div className="mb-4">
//           <label htmlFor="email" className="text-sm text-gray block capitalize">
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-primary hover:bg-primary-hover cursor-pointer text-secondary font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray my-6">
//         Need help? Read this
//         <a
//           href="#"
//           className="text-secondary font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// export default ResetPasswordForm;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import authService from "../../services/auth"; // Correct import path using alias
// import { FaCheck } from "react-icons/fa6";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
// import { FiX } from "react-icons/fi";
// import Link from "next/link";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [emailError, setEmailError] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [emailSent, setEmailSent] = useState<boolean>(false);
//   // const [emailResent, setEmailResent] = useState<boolean>(false); // REMOVED: Not used
//   const [showCheckAgainMessage, setShowCheckAgainMessage] =
//     useState<boolean>(false);
//   const [resendError, setResendError] = useState<string>("");
//   const [resendAttemptFailed, setResendAttemptFailed] =
//     useState<boolean>(false);

//   const isValidEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     let isValid = true;
//     setError("");
//     setSuccessMessage("");
//     setEmailSent(false);

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);
//       try {
//         await authService.forgotPassword({ email });
//         setEmailSent(true);
//         setResendAttemptFailed(false); // Reset resend attempt status on successful send
//       } catch (err: unknown) {
//         // FIXED: Use unknown instead of any
//         // Determine error message safely
//         const message =
//           err instanceof Error
//             ? err.message
//             : typeof err === "string"
//             ? err
//             : "An error occurred while processing your request. Please try again.";
//         console.error("Forgot password error:", err); // Log the original error for debugging
//         setError(message);
//         setEmailSent(false); // Ensure emailSent is false if initial send fails
//         setResendAttemptFailed(false); // Reset resend attempt status even if initial send fails to allow resend attempt
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSendAgain = async () => {
//     if (resendAttemptFailed) {
//       return;
//     }

//     // setEmailResent(true); // REMOVED: Not used
//     setIsLoading(true);
//     setShowCheckAgainMessage(false); // Reset before potentially showing again
//     setResendError("");

//     try {
//       await authService.forgotPassword({ email });
//       // Set success message directly or rely on showCheckAgainMessage
//       // setSuccessMessage("A new password reset link has been sent to your email address."); // This state seems unused in the success flow
//       setShowCheckAgainMessage(true);
//       setResendAttemptFailed(false); // Reset resend attempt status on successful resend
//     } catch (err: unknown) {
//       // FIXED: Use unknown instead of any
//       // Determine error message safely
//       const message =
//         err instanceof Error
//           ? err.message
//           : typeof err === "string"
//           ? err
//           : "Failed to send email again. Please try again later.";
//       console.error("Resend password error:", err); // Log the original error for debugging
//       setResendError(message);
//       setResendAttemptFailed(true); // Set resend attempt to failed
//       setShowCheckAgainMessage(false); // Hide success message if resend fails
//       setSuccessMessage(""); // Clear success message if resend fails
//     } finally {
//       setIsLoading(false);
//     }
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

//   if (emailSent) {
//     return (
//       <div className="flex flex-col bg-white dark:bg-background justify-center items-center h-[calc(100vh-82px)] px-4">
//         <div className="max-w-lg space-y-4">
//           <div className="flex justify-center items-center sm:pt-0 pt-10">
//             <Image
//               src="/assets/images/sendmassage.svg"
//               width={600}
//               height={600}
//               alt="Email Icon"
//               className="w-full object-contain xl:h-80 h-70"
//             />
//           </div>

//           <h2 className="text-3xl md:text-4xl font-black text-center text-mainheading dark:text-white uppercase">
//             Check your email
//           </h2>

//           <p className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//             We sent an email to &nbsp;
//             <span className="font-semibold text-primary">{email}</span>
//           </p>

//           <p className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//             If the email hasn&apos;t arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           <AnimatePresence>
//             {showCheckAgainMessage && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative my-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
//                 </div>

//                 <p className="text-gray-500 dark:text-gray-300 block">
//                   Please check your email inbox again.
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <AnimatePresence>
//             {resendError && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative mt-5" // Adjusted styling slightly for consistency
//                 role="alert"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                 </div>

//                 <div className="inline-block">
//                   <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {resendError}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <AnimatePresence>
//             {resendAttemptFailed && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative mt-5" // Adjusted styling slightly for consistency
//                 role="alert"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//                 </div>

//                 <div className="inline-block">
//                   <p className="text-gray-500 dark:text-gray-300">
//                     Couldn&apos;t send email again. Please try again later you
//                     can wait.
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading || resendAttemptFailed}
//             className={`bg-primary hover:bg-primaryhover w-full capitalize text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center
//                             ${
//                               isLoading || resendAttemptFailed
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : ""
//                             }`}
//             type="submit"
//           >
//             {isLoading ? (
//               <>
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
//                 <span>Sending...</span>
//               </>
//             ) : (
//               "Send email again"
//             )}
//           </button>

//           <p className="text-base text-center text-gray-700 dark:text-gray-300 mt-5">
//             Still need help? &nbsp;
//             <a
//               href="#"
//               className="text-primary underline font-medium underline-offset-4"
//             >
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col bg-white dark:bg-background justify-center items-center h-[calc(100vh-82px)] px-4">
//       <div className="max-w-lg space-y-4">
//         <div className="flex justify-center items-center sm:pt-0 pt-10">
//           <Image
//             src="/assets/images/resetpassword.svg"
//             width={600}
//             height={600}
//             alt="Key Icon"
//             className="w-full object-contain xl:h-80 h-70"
//           />
//         </div>

//         <h2 className="text-3xl md:text-4xl font-black text-center text-mainheading dark:text-white uppercase">
//           Reset password
//         </h2>

//         <p className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//           Just enter the email address you registered with and we&apos;ll send
//           you a link to reset your password.
//         </p>

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center relative mt-5" // Added width constraint
//               role="alert"
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               variants={errorVariants}
//             >
//               <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                 <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
//               </div>

//               <div className="inline-block">
//                 <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                   {error} Relative to this path no number right now
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <form onSubmit={handleSubmit}>
//           <div className="my-5">
//             <label
//               htmlFor="email"
//               className=" text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//             >
//               Enter your email address
//             </label>

//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={isLoading}
//               className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                 emailError
//                   ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                   : "focus:border-[#5f5f5f]"
//               }`}
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

//           <div className="flex justify-between items-center">
//             <button
//               className={`bg-primary hover:bg-primaryhover w-full capitalize text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                 isLoading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M12 2V6"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M12 18V22"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M4.93 4.93L7.76 7.76"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.24 16.24L19.07 19.07"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M2 12H6"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M18 12H22"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M4.93 19.07L7.76 16.24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.24 7.76L19.07 4.93"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                   <span>Sending...</span>
//                 </>
//               ) : (
//                 "Send password reset link"
//               )}
//             </button>
//           </div>
//         </form>

//         <p className="text-base text-gray-500 dark:text-gray-300 my-2 text-center">
//           Need help? Read this &nbsp;
//           <Link href="/faqs">
//             <span className="text-primary font-medium underline capitalize underline-offset-4">
//               Help Centre article.
//             </span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordForm;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import authService from "../../services/auth";
// import { FaCheck } from "react-icons/fa6";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiX } from "react-icons/fi";
// import Link from "next/link";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState<string>("");
//   // Single error state for initial submission or resend failures
//   const [formError, setFormError] = useState<string>("");
//   const [emailFieldError, setEmailFieldError] = useState<string>(""); // For specific email format/required validation
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [emailSent, setEmailSent] = useState<boolean>(false);
//   // State to show "Please check again" message after successful resend
//   const [showCheckAgainMessage, setShowCheckAgainMessage] =
//     useState<boolean>(false);

//   const isValidEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Combined function for initial send and resend
//   const handleSendRequest = async (isResend: boolean = false) => {
//     // Prevent resend if already loading
//     if (isLoading) return;

//     let isValid = true;
//     setFormError(""); // Clear general form error
//     setShowCheckAgainMessage(false); // Hide check again message on new attempt

//     // Validate email only needed for initial send, or if email somehow cleared on resend screen (unlikely)
//     if (!isResend || !email) {
//       if (!email) {
//         setEmailFieldError("Please fill email address field");
//         isValid = false;
//       } else if (!isValidEmail(email)) {
//         setEmailFieldError("Please enter a valid email address");
//         isValid = false;
//       } else {
//         setEmailFieldError(""); // Clear specific field error if valid
//       }
//     } else {
//       setEmailFieldError(""); // Ensure field error is clear on resend
//     }

//     if (isValid) {
//       setIsLoading(true);
//       try {
//         // Call the service - backend handles Google/existing token checks silently
//         await authService.forgotPassword({ email });

//         if (isResend) {
//           setShowCheckAgainMessage(true); // Show "check again" on successful resend
//           console.log("Resend request successful.");
//         } else {
//           setEmailSent(true); // Move to the "Check your email" screen on initial successful send
//           console.log("Initial request successful.");
//         }
//       } catch (err: unknown) {
//         // Handle potential API errors (server down, network issues etc.)
//         const message =
//           err instanceof Error
//             ? err.message
//             : "An error occurred. Please try again.";
//         console.error("Forgot password request error:", err);
//         setFormError(message); // Show error message
//         if (!isResend) {
//           setEmailSent(false); // Ensure not moving to next screen if initial send fails
//         }
//         setShowCheckAgainMessage(false); // Hide check again message if error occurs
//       } finally {
//         setIsLoading(false);
//       }
//     } else if (!isResend) {
//       // If initial validation fails, ensure emailSent remains false
//       setEmailSent(false);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleSendRequest(false); // Initial send request
//   };

//   const handleSendAgain = () => {
//     handleSendRequest(true); // Resend request
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

//   // --- RENDER SECTION ---

//   // "Check Your Email" Screen
//   if (emailSent) {
//     return (
//       <div className="flex flex-col bg-white dark:bg-background items-center h-[calc(100vh-82px)] px-4">
//         <div className="max-w-lg space-y-4">
//           <div className="flex justify-center items-center w-full lg:mt-20 mt-10">
//             <Image
//               src="/assets/images/sendmassage.svg"
//               width={600}
//               height={600}
//               alt="Email Icon"
//               className="w-full object-contain xl:h-80 h-70 dark:hidden block"
//             />

//             <Image
//               src="/assets/images/sendmassage-dark.svg"
//               width={600}
//               height={600}
//               alt="Email Icon"
//               className="w-full object-contain xl:h-80 h-70 dark:block hidden"
//             />

//           </div>
//           <h2 className="text-3xl md:text-4xl font-black text-center text-mainheading dark:text-white uppercase">
//             {" "}
//             Check your email{" "}
//           </h2>
//           <p className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//             {" "}
//             If an account exists for
//             <span className="font-semibold text-primary">{email}</span>  and
//             needs a password reset, we've sent a link.{" "}
//           </p>
//           <p className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//             {" "}
//             The link expires in 3 minutes. Check your spam folder if needed.{" "}
//           </p>

//           {/* "Check Again" Success Message after Resend */}
//           <AnimatePresence>
//             {showCheckAgainMessage && (
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center my-4"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   {" "}
//                   <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />{" "}
//                 </div>
//                 <p className="text-gray-500 dark:text-gray-300 block">
//                   {" "}
//                   Please check your email inbox again.{" "}
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Error Message if Resend Fails */}
//           <AnimatePresence>
//             {formError && ( // Display general form error here too if resend fails
//               <motion.div
//                 className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-5"
//                 role="alert"
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={errorVariants}
//               >
//                 <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                   {" "}
//                   <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />{" "}
//                 </div>
//                 <div className="inline-block">
//                   {" "}
//                   <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                     {" "}
//                     {formError}{" "}
//                   </span>{" "}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Resend Button */}
//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading}
//             className={`bg-primary hover:bg-primaryhover w-full capitalize text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? (
//               <>
//                 {" "}
//                 <svg
//                   className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   {" "}
//                   <path
//                     d="M12 2V6"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M12 18V22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M4.93 4.93L7.76 7.76"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M16.24 16.24L19.07 19.07"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M2 12H6"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M18 12H22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M4.93 19.07L7.76 16.24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                   <path
//                     d="M16.24 7.76L19.07 4.93"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />{" "}
//                 </svg>{" "}
//                 <span>Sending...</span>{" "}
//               </>
//             ) : (
//               "Send email again"
//             )}
//           </button>

//           <p className="text-base text-center text-gray-500 dark:text-gray-300 pb-6">
//             {" "}
//             Still need help?  {" "}
//             <Link
//               href="/faqs"
//               className="text-primary underline font-medium underline-offset-4"
//             >
//               {" "}
//               Read this article.{" "}
//             </Link>{" "}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Initial Form Screen
//   return (
//     <div className="flex flex-col bg-white dark:bg-background items-center h-[calc(100vh-82px)] px-4">
//       <div className="max-w-lg space-y-4">
//         <div className="flex justify-center items-center w-full lg:mt-20 mt-10">
//           <Image
//             src="/assets/images/resetpassword.svg"
//             width={600}
//             height={600}
//             alt="Key Icon"
//             className="w-full object-contain xl:h-80 h-70 dark:hidden block"
//           />

//           <Image
//             src="/assets/images/resetpassword-dark.svg"
//             width={600}
//             height={600}
//             alt="Key Icon"
//             className="w-full object-contain xl:h-80 h-70 hidden dark:block"
//           />

//         </div>
//         <h2 className="text-3xl md:text-4xl font-black text-center text-mainheading dark:text-white uppercase">
//           {" "}
//           Reset password{" "}
//         </h2>
//         <p className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//           {" "}
//           Just enter the email address you registered with and we'll send you a
//           link to reset your password.{" "}
//         </p>

//         {/* General Form Error Display */}
//         <AnimatePresence>
//           {formError && (
//             <motion.div
//               className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-5"
//               role="alert"
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               variants={errorVariants}
//             >
//               <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
//                 {" "}
//                 <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />{" "}
//               </div>
//               <div className="inline-block">
//                 {" "}
//                 <span className="text-gray-500 dark:text-gray-300 max-w-60">
//                   {" "}
//                   {formError}{" "}
//                 </span>{" "}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="my-5">
//             <label
//               htmlFor="email"
//               className=" text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//             >
//               {" "}
//               Enter your email address{" "}
//               <span className="text-red-600 dark:text-red-400">*</span>
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (emailFieldError) setEmailFieldError(""); // Clear field error on change
//                 if (formError) setFormError(""); // Clear general error on change
//               }}
//               disabled={isLoading}
//               className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
//                 emailFieldError
//                   ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
//                   : "focus:border-[#5f5f5f]"
//               }`}
//               aria-invalid={!!emailFieldError}
//               aria-describedby={
//                 emailFieldError ? "email-field-error" : undefined
//               }
//             />
//             {/* Specific Email Field Error */}
//             {emailFieldError && (
//               <p
//                 id="email-field-error"
//                 className="flex text-red-700 text-base items-center mt-0.5"
//               >
//                 <span className="mr-1">
//                   {" "}
//                   <IoMdCloseCircle className="size-5" />{" "}
//                 </span>{" "}
//                 {emailFieldError}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-between items-center">
//             <button
//               className={`bg-primary hover:bg-primaryhover w-full capitalize text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
//                 isLoading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   {" "}
//                   <svg
//                     className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     {" "}
//                     <path
//                       d="M12 2V6"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M12 18V22"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M4.93 4.93L7.76 7.76"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M16.24 16.24L19.07 19.07"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M2 12H6"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M18 12H22"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M4.93 19.07L7.76 16.24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                     <path
//                       d="M16.24 7.76L19.07 4.93"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />{" "}
//                   </svg>{" "}
//                   <span>Sending...</span>{" "}
//                 </>
//               ) : (
//                 "Send password reset link"
//               )}
//             </button>
//           </div>
//         </form>

//         <p className="text-base text-gray-500 dark:text-gray-300 pb-6 text-center">
//           {" "}
//           Need help? Read this  {" "}
//           <Link href="/faqs">
//             {" "}
//             <span className="text-primary font-medium underline capitalize underline-offset-4">
//               {" "}
//               Help Centre article.{" "}
//             </span>{" "}
//           </Link>{" "}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordForm;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import authService from "../../services/auth";
import { FaCheck } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import { FiX } from "react-icons/fi";
import Link from "next/link";
// --- Animation Variants (Same as LoginPage/RegisterPage) ---

// Variant for the main container to orchestrate children animations
const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Adjust stagger time as needed
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20, // Optional: Add a slight vertical exit motion
    transition: { duration: 0.2 },
  },
};

// Variant for individual items within the container
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

// Variants for error messages
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

// Variants for success ("Check Again") message
const successVariants = {
  initial: { opacity: 0, y: -10, scale: 0.95 }, // Slightly different entry
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// --- Component ---

const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [emailFieldError, setEmailFieldError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [showCheckAgainMessage, setShowCheckAgainMessage] =
    useState<boolean>(false);
  const [isFormErrorVisible, setIsFormErrorVisible] = useState<boolean>(false); // For error animation control
  const [isCheckAgainVisible, setIsCheckAgainVisible] =
    useState<boolean>(false); // For success animation control

  // Effect to control error visibility for animation
  React.useEffect(() => {
    setIsFormErrorVisible(!!formError);
  }, [formError]);

  // Effect to control "check again" visibility for animation
  React.useEffect(() => {
    setIsCheckAgainVisible(showCheckAgainMessage);
  }, [showCheckAgainMessage]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendRequest = async (isResend: boolean = false) => {
    if (isLoading) return;

    let isValid = true;
    setFormError("");
    setShowCheckAgainMessage(false);

    if (!isResend || !email) {
      if (!email) {
        setEmailFieldError("Please fill email address field");
        isValid = false;
      } else if (!isValidEmail(email)) {
        setEmailFieldError("Please enter a valid email address");
        isValid = false;
      } else {
        setEmailFieldError("");
      }
    } else {
      setEmailFieldError("");
    }

    if (isValid) {
      setIsLoading(true);
      try {
        await authService.forgotPassword({ email });
        if (isResend) {
          setShowCheckAgainMessage(true);
          console.log("Resend request successful.");
        } else {
          setEmailSent(true); // Trigger screen change
          console.log("Initial request successful.");
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error && (err as any).response?.data?.message // Try to get backend message
            ? (err as any).response.data.message
            : err instanceof Error
            ? err.message
            : "An error occurred. Please try again.";
        console.error("Forgot password request error:", err);
        setFormError(message);
        if (!isResend) {
          setEmailSent(false);
        }
        setShowCheckAgainMessage(false);
      } finally {
        setIsLoading(false);
      }
    } else if (!isResend) {
      setEmailSent(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendRequest(false);
  };

  const handleSendAgain = () => {
    handleSendRequest(true);
  };

  // --- RENDER SECTION ---
  return (
    // Main container for flex layout
    <div className="flex flex-col bg-white dark:bg-background items-center justify-center min-h-[calc(100vh-82px)] px-4 py-10 lg:py-0">
      {/* AnimatePresence wraps the conditional rendering to animate screen changes */}
      <AnimatePresence mode="wait">
        {emailSent ? (
          // --- "Check Your Email" Screen ---
          <motion.div
            key="check-email-screen" // Unique key for AnimatePresence
            className="w-full max-w-lg space-y-4"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center w-full"
            >
              <Image
                src="/assets/images/sendmassage.svg"
                width={600}
                height={600}
                alt="Email Icon"
                className="w-full object-contain xl:h-80 h-70 dark:hidden block"
              />
              <Image
                src="/assets/images/sendmassage-dark.svg"
                width={600}
                height={600}
                alt="Email Icon"
                className="w-full object-contain xl:h-80 h-70 dark:block hidden"
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-black text-center text-mainheading dark:text-white uppercase"
            >
              Check your email
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base"
            >
              If an account exists for 
              <span className="font-semibold text-primary">{email}</span> and
              needs a password reset, we've sent a link.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base"
            >
              The link expires in 3 minutes. Check your spam folder if needed.
            </motion.p>

            {/* "Check Again" Success Message after Resend */}
            <AnimatePresence>
              {isCheckAgainVisible && (
                <motion.div
                  className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center"
                  role="status" // Use status for success messages
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={successVariants} // Use success variants
                >
                  <div className="flex bg-green-100 dark:bg-green-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
                    <FaCheck className="p-0.5 text-green-600 dark:text-green-400 lg:size-8 size-6" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-300 block">
                    Please check your email inbox again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message if Resend Fails */}
            <AnimatePresence>
              {isFormErrorVisible &&
                formError && ( // Show error only when it exists and is visible
                  <motion.div
                    className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-5"
                    role="alert"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={errorVariants} // Use error variants
                  >
                    <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
                      <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
                    </div>
                    <div className="inline-block">
                      <span className="text-gray-500 dark:text-gray-300 max-w-60">
                        {formError}
                      </span>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Resend Button */}
            <motion.div variants={itemVariants}>
              <button
                onClick={handleSendAgain}
                disabled={isLoading}
                className={`bg-primary hover:bg-primaryhover w-full capitalize text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
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
                      />{" "}
                      <path
                        d="M12 18V22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M4.93 4.93L7.76 7.76"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M16.24 16.24L19.07 19.07"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M2 12H6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M18 12H22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M4.93 19.07L7.76 16.24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M16.24 7.76L19.07 4.93"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send email again"
                )}
              </button>
            </motion.div>

            {/* Help Link */}
            <motion.p
              variants={itemVariants}
              className="text-base text-center text-gray-500 dark:text-gray-300 pb-6"
            >
              Still need help? 
              <Link
                href="/faqs"
                className="text-primary underline font-medium underline-offset-4"
              >
                Read this article.
              </Link>
            </motion.p>
          </motion.div>
        ) : (
          // --- Initial Form Screen ---
          <motion.div
            key="initial-form-screen" // Unique key for AnimatePresence
            className="w-full max-w-lg space-y-4"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center w-full"
            >
              <Image
                src="/assets/images/resetpassword.svg"
                width={600}
                height={600}
                alt="Key Icon"
                className="w-full object-contain xl:h-80 h-70 dark:hidden block"
              />
              <Image
                src="/assets/images/resetpassword-dark.svg"
                width={600}
                height={600}
                alt="Key Icon"
                className="w-full object-contain xl:h-80 h-70 hidden dark:block"
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-black text-center text-mainheading dark:text-white uppercase"
            >
              Reset password
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-500 dark:text-gray-300 lg:text-lg text-base"
            >
              Just enter the email address you registered with and we'll send
              you a link to reset your password.
            </motion.p>

            {/* General Form Error Display */}
            <AnimatePresence>
              {isFormErrorVisible &&
                formError && ( // Show error only when it exists and is visible
                  <motion.div
                    className="flex bg-lightgray dark:bg-primarybox p-4 rounded-2xl gap-4 items-center mt-4"
                    role="alert"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={errorVariants} // Use error variants
                  >
                    <div className="flex bg-red-100 dark:bg-red-600/20 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
                      <FiX className="p-0.5 text-red-600 dark:text-red-400 lg:size-8 size-6" />
                    </div>
                    <div className="inline-block">
                      <span className="text-gray-500 dark:text-gray-300 max-w-60">
                        {formError}
                      </span>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit}>
              <div className="my-5">
                {/* Keep margin for spacing */}
                <label
                  htmlFor="email"
                  className=" text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
                >
                  Enter your email address{" "}
                  <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailFieldError) setEmailFieldError("");
                    if (formError) setFormError("");
                  }}
                  disabled={isLoading}
                  className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 ${
                    emailFieldError
                      ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
                      : "focus:border-[#5f5f5f]"
                  }`}
                  aria-invalid={!!emailFieldError}
                  aria-describedby={
                    emailFieldError ? "email-field-error" : undefined
                  }
                />
                {/* Specific Email Field Error */}
                {emailFieldError && (
                  <p
                    id="email-field-error"
                    className="flex text-red-700 text-base items-center mt-0.5"
                  >
                    <span className="mr-1">
                      {" "}
                      <IoMdCloseCircle className="size-5" />{" "}
                    </span>{" "}
                    {emailFieldError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center">
                <button
                  className={`bg-primary hover:bg-primaryhover w-full capitalize text-neutral-900 font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
                        />{" "}
                        <path
                          d="M12 18V22"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M4.93 4.93L7.76 7.76"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M16.24 16.24L19.07 19.07"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M2 12H6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M18 12H22"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M4.93 19.07L7.76 16.24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />{" "}
                        <path
                          d="M16.24 7.76L19.07 4.93"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send password reset link"
                  )}
                </button>
              </div>
            </motion.form>

            {/* Help Link */}
            <motion.p
              variants={itemVariants}
              className="text-base text-gray-500 dark:text-gray-300 pb-6 text-center"
            >
              Need help? Read this 
              <Link href="/faqs">
                <span className="text-primary font-medium underline capitalize underline-offset-4">
                  Help Centre article.
                </span>
              </Link>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResetPasswordForm;
