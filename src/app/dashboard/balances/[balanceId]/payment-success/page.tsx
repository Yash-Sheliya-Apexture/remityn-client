// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter, useParams, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import WiseLogo from '../../../../../../public/assets/images/plane-medium.png'; // Adjust path as needed
// import { useAuth } from '../../../../hooks/useAuth';
// import paymentService from '../../../../services/payment'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// interface PaymentSuccessParams {
//     balanceId: string;
// }

// interface PaymentDetails {
//     _id: string;
//     amountToAdd: number;
//     balanceCurrency: { code: string };
//     payInCurrency: { code: string };
//     // Add any other fields needed, e.g., estimated arrival if available
// }

// const PaymentSuccessPage = () => {
//     const router = useRouter();
//     const params = useParams<PaymentSuccessParams>();
//     const searchParams = useSearchParams();
//     const paymentId = searchParams.get('paymentId');
//     const { token } = useAuth();
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

//     // Optional: Fetch payment details for dynamic content (like arrival time)
//     useEffect(() => {
//         const fetchDetails = async () => {
//             if (!paymentId || !token) {
//                 setError("Payment details cannot be loaded.");
//                 setIsLoading(false);
//                 return;
//             }
//             try {
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: any) {
//                 console.error("Failed to fetch payment details for success page:", err);
//                 setError("Could not load specific payment details."); // Non-blocking error
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchDetails();
//     }, [paymentId, token]);

//     const handleGotIt = () => {
//         // Navigate to a relevant page, e.g., transactions or dashboard home
//         router.push('/dashboard/transactions');
//     };

//     // Estimate - replace with actual data if available from paymentDetails
//     const estimatedArrivalTime = "in 2 hours";

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-green-700 text-white p-4">
//             <div className="absolute top-6 left-6">
//                 <Image src={WiseLogo} alt="Wise Logo" width={100} height={25} />
//             </div>

//             <div className="text-center">
//                 {/* Placeholder for Paper Airplane Image */}
//                 <div className="mb-8 text-6xl">
//                     {/* You can use an emoji or ideally an SVG/Image component */}
//                     💸 {/* Placeholder */}
//                     {/* Example with an image:
//                     <Image
//                         src="/path/to/paper-airplane.svg" // Add your image path
//                         alt="Paper Airplane"
//                         width={150}
//                         height={150}
//                         className="mx-auto"
//                     />
//                     */}
//                 </div>

//                 <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
//                     Your Money's on the Move
//                 </h1>

//                 {isLoading && <Skeleton className="h-5 w-64 mx-auto bg-green-600 mb-8" />}
//                 {!isLoading && (
//                      <p className="text-lg mb-8">
//                         Your money should arrive {estimatedArrivalTime}. We'll keep you posted.
//                         {/* Optional: Show amount if details loaded */}
//                         {/* {paymentDetails && ` Adding ${paymentDetails.amountToAdd} ${paymentDetails.balanceCurrency.code}.`} */}
//                     </p>
//                 )}
//                  {error && <p className="text-yellow-300 mb-8 text-sm">{error}</p>}

//                 <button
//                     onClick={handleGotIt}
//                     className="bg-green-400 hover:bg-green-300 text-green-900 font-bold py-3 px-10 rounded-md transition duration-200"
//                 >
//                     Got it
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentSuccessPage;

// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter, useSearchParams } from 'next/navigation';
// // Removed unused import: import Link from 'next/link';
// import WiseLogo from '../../../../../../public/assets/images/plane-medium.png'; // Adjust path as needed
// import { useAuth } from '../../../../hooks/useAuth';
// import paymentService from '../../../../services/payment'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// // Removed unused interface: interface PaymentSuccessParams { balanceId: string; }

// interface PaymentDetails {
//     _id: string;
//     amountToAdd: number;
//     balanceCurrency: { code: string };
//     payInCurrency: { code: string };
//     // Add any other fields needed, e.g., estimated arrival if available
//     // estimatedArrival?: string; // Example if API provides this
// }

// const PaymentSuccessPage = () => {
//     const router = useRouter();
//     // Removed unused hook and variable: const params = useParams<PaymentSuccessParams>();
//     const searchParams = useSearchParams();
//     const paymentId = searchParams.get('paymentId');
//     const { token } = useAuth();
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

//     // Optional: Fetch payment details for dynamic content (like arrival time)
//     useEffect(() => {
//         const fetchDetails = async () => {
//             if (!paymentId) {
//                 setError("Payment ID missing from URL. Cannot load details.");
//                 setIsLoading(false);
//                 return;
//             }
//             if (!token) {
//                 // Handle case where user might lose auth state somehow
//                 // Or simply rely on protected route logic elsewhere
//                 setError("Authentication token missing. Cannot load details.");
//                 setIsLoading(false);
//                 // Optionally redirect to login: router.push('/login');
//                 return;
//             }

//             setIsLoading(true); // Ensure loading state is true before fetch
//             setError(null); // Clear previous errors

//             try {
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: unknown) { // Use unknown instead of any
//                 let errorMessage = "Could not load specific payment details.";
//                 if (err instanceof Error) {
//                     // You can log the specific error message for debugging
//                     console.error("Failed to fetch payment details:", err.message, err);
//                     // Optionally refine the user-facing message based on err.message if safe
//                 } else {
//                     console.error("An unexpected error occurred:", err);
//                 }
//                 setError(errorMessage); // Keep it a non-blocking error for the UI
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [paymentId, token, router]); // Added router to dependency array if used for redirection inside effect

//     const handleGotIt = () => {
//         // Navigate to a relevant page, e.g., transactions or dashboard home
//         router.push('/dashboard/transactions');
//     };

//     // Estimate - replace with actual data if available from paymentDetails
//     // Example: const estimatedArrivalTime = paymentDetails?.estimatedArrival || "soon";
//     const estimatedArrivalTime = "in 2 hours"; // Keep as placeholder for now

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4">

//                 <Image src={WiseLogo} alt="Wise Logo" width={160} height={25} />

//             <div className="text-center">
//                 {/* Fixed unescaped entity */}
//                 <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
//                     Your Money's on the Move
//                 </h1>

//                 {isLoading && <Skeleton className="h-5 w-64 mx-auto mb-8" />}
//                 {!isLoading && (
//                      <p className="text-lg mb-8">
//                         {/* Fixed unescaped entity */}
//                         Your money should arrive {estimatedArrivalTime}. We'll keep you posted.
//                         {/* Using paymentDetails now */}
//                         {paymentDetails && ` Adding ${paymentDetails.amountToAdd} ${paymentDetails.balanceCurrency.code}.`}
//                     </p>
//                 )}
//                  {error && <p className="text-yellow-300 mb-8 text-sm">{error}</p>}

//                 <button
//                     onClick={handleGotIt}
//                     className="bg-green-400 hover:bg-green-300 text-green-900 font-bold py-3 px-10 rounded-md transition duration-200"
//                 >
//                     Got it
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentSuccessPage;

// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter, useSearchParams } from 'next/navigation';
// import WiseLogo from '../../../../../../public/assets/images/plane-medium.png'; // Adjust path as needed
// import { useAuth } from '../../../../contexts/AuthContext'; // Adjust path as needed
// import paymentService from '../../../../services/payment'; // Adjust path as needed
// import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// interface PaymentDetails {
//     _id: string;
//     amountToAdd: number;
//     balanceCurrency: { code: string };
//     payInCurrency: { code: string };
// }

// const PaymentSuccessPage = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const paymentId = searchParams.get('paymentId');
//     const { token } = useAuth();
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

//     // Fetch payment details for dynamic content
//     useEffect(() => {
//         const fetchDetails = async () => {
//             if (!paymentId) {
//                 setError("Payment ID missing from URL. Cannot load details.");
//                 setIsLoading(false);
//                 return;
//             }
//             if (!token) {
//                 setError("Authentication token missing. Cannot load details.");
//                 setIsLoading(false);
//                 // Optionally redirect to login: router.push('/login');
//                 return;
//             }

//             setIsLoading(true);
//             setError(null);

//             try {
//                 // Ensure paymentService.getPaymentDetails expects (paymentId, token)
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: unknown) {
//                 let errorMessage = "Could not load specific payment details.";
//                 if (err instanceof Error) {
//                     console.error("Failed to fetch payment details:", err.message, err);
//                     // Optionally refine message based on err.message if safe and meaningful
//                 } else {
//                     console.error("An unexpected error occurred:", err);
//                 }
//                 setError(errorMessage); // Keep it non-blocking for the general success UI
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchDetails();
//         // Dependencies are correct: fetch runs if paymentId or token changes.
//         // Router included in case redirection logic is added inside the effect later.
//     }, [paymentId, token, router]); // Removed unnecessary eslint-disable comment

//     const handleGotIt = () => {
//         // Navigate to a relevant page, e.g., transactions or dashboard home
//         router.push('/dashboard/transactions');
//     };

//     // Estimate - replace with actual data if available from paymentDetails
//     // Example: const estimatedArrivalTime = paymentDetails?.estimatedArrival || "soon";
//     const estimatedArrivalTime = "in 2 hours"; // Placeholder

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">

//             <div className="mb-8"> {/* Added margin-bottom to space logo from text */}
//                  <Image src={WiseLogo} alt="Wise Logo" width={160} height={25} priority /> {/* Added priority for LCP */}
//             </div>

//             <div className="text-center">
//                 {/* Fixed unescaped entity */}
//                 <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
//                     Your Money&apos;s on the Move
//                 </h1>

//                 {/* Loading state for the dynamic paragraph content */}
//                 {isLoading && <Skeleton className="h-6 w-3/4 mx-auto mb-8" />}

//                 {/* Content when not loading */}
//                 {!isLoading && (
//                     <p className="text-lg mb-8">
//                         {/* Fixed unescaped entity */}
//                         Your money should arrive {estimatedArrivalTime}. We&apos;ll keep you posted.
//                         {/* Conditionally display details only if available */}
//                         {paymentDetails ? ` Adding ${paymentDetails.amountToAdd} ${paymentDetails.balanceCurrency.code}.` : ''}
//                     </p>
//                 )}

//                 {/* Display error message if fetching details failed (non-blocking) */}
//                 {error && <p className="text-yellow-300 mb-8 text-sm -mt-4">{error}</p>} {/* Added negative margin to pull it closer */}

//                 <button
//                     onClick={handleGotIt}
//                     className="bg-green-400 hover:bg-green-300 text-green-900 font-bold py-3 px-10 rounded-md transition duration-200"
//                 >
//                     Got it
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentSuccessPage;

// src/app/dashboard/balances/[balanceId]/payment-success/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import WiseLogo from "../../../../../../public/assets/images/plane-medium.png"; // Adjust path as needed
import { useAuth } from "../../../../contexts/AuthContext"; // Adjust path as needed
import paymentService, {
  PaymentDetailsResponse,
} from "../../../../services/payment"; // Adjust path as needed
import { Skeleton } from "@/components/ui/skeleton";

// Interface for component state
interface PaymentDetails {
  _id: string;
  amountToAdd: number;
  balanceCurrency: { code: string };
  payInCurrency: { code: string };
}

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      setPaymentDetails(null);

      if (!paymentId) {
        setError("Payment ID missing from URL.");
        setIsLoading(false);
        return;
      }
      if (!token) {
        setError("Authentication required.");
        setIsLoading(false);
        return;
      }

      try {
        const apiResponse: PaymentDetailsResponse =
          await paymentService.getPaymentDetails(paymentId, token);

        // --- BETTER DEBUGGING: Log the RAW response ---
        // console.log("Raw API Response for Payment Details:", apiResponse);

        // --- ADDED CHECK: Ensure apiResponse is not empty and has essential keys ---
        // Check for _id as a minimum requirement from the API itself
        if (
          !apiResponse ||
          typeof apiResponse !== "object" ||
          !apiResponse._id
        ) {
          // If the response is empty or lacks the core identifier, treat it as an error.
          console.error(
            "Received empty or invalid payment details structure from API:",
            apiResponse
          );
          throw new Error(
            "Failed to retrieve valid payment details from the server."
          );
        }
        // --- End Added Check ---

        // **** TRANSFORMATION LOGIC ****
        const formattedDetails: PaymentDetails = {
          _id: apiResponse._id, // We know _id exists due to the check above
          amountToAdd: apiResponse.amountAdded ?? 0,
          balanceCurrency: { code: apiResponse.balanceCurrencyCode ?? "N/A" },
          payInCurrency: { code: apiResponse.payInCurrencyCode ?? "N/A" },
        };

        // --- Refined Validation (Focus on what's critical for THIS page) ---
        // Maybe only the ID is truly critical here, the rest is for display enhancement.
        // Decide if amount/currency being unavailable should block the success feeling.
        // If amount/currency might legitimately be missing temporarily (e.g., processing):
        if (
          formattedDetails.amountToAdd <= 0 ||
          formattedDetails.balanceCurrency.code === "N/A"
        ) {
          // Log it as a warning, but maybe don't throw a blocking error
          console.warn(
            "Payment details retrieved, but amount or currency code is missing/invalid:",
            formattedDetails
          );
          // Optionally set a non-blocking message:
          // setError("Displaying basic info; full details might be updating.");
        }
        // --- End Refined Validation ---

        setPaymentDetails(formattedDetails);

        // Optional ETA update logic here...
      } catch (err: unknown) {
        let errorMessage = "Could not load specific payment details.";
        if (err instanceof Error) {
          console.error("Error fetching or processing payment details:", err); // Log the full error
          errorMessage = err.message; // Use the error's message
        } else {
          console.error("An unexpected error occurred:", err);
          errorMessage = "An unexpected error occurred while loading details.";
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [paymentId, token, router]);

  const handleGotIt = () => {
    router.push("/dashboard/transactions");
  };

  // --- JSX (No changes needed here from the previous version) ---
  return (
    <section className="Payment-Success">
      <div className="flex flex-col items-center justify-center bg-background text-subheadingWhite mt-10">
        <div className="md:mb-8 mb-6">
          <Image
            src={WiseLogo}
            alt="Wise Logo"
            width={200}
            height={200}
            priority
            className="md:size-36 size-26"
          />
        </div>

        <div className="text-center max-w-lg w-full space-y-3">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheadingWhite uppercase md:leading-16">
            Your Money's
            <span className="text-primary"> on the Move </span>
          </h1>

          {!isLoading &&
            paymentDetails &&
            !error && ( // Show even if details are partial but essential ID is there
              <p className="sm:text-lg text-base leading-tight text-subheadingWhite">
                Track your transfers in real-time and enjoy fast, secure
                delivery to your recipients — anytime, anywhere.
                {/* Conditionally display amount/currency only if valid */}
                {
                  paymentDetails.amountToAdd > 0 &&
                  paymentDetails.balanceCurrency.code !== "N/A"
                    ? ` Adding ${paymentDetails.amountToAdd} ${paymentDetails.balanceCurrency.code}.`
                    : "" // Don't display if amount/currency is missing/invalid
                }
              </p>
            )}

          {/* Generic Success (Fallback if paymentDetails couldn't be set but no blocking error) */}
          {!isLoading && !paymentDetails && !error && (
            <p className="text-lg mb-8 text-subheadingWhite">
              Your payment is processing and should arrive 2 hours. We'll keep
              you posted.
            </p>
          )}

          {/* Error Message Display */}
          {error && !isLoading && (
            <div className="bg-red-600/20 border border-red-600/50 rounded-xl p-4">
              <p className="text-red-400 text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleGotIt}
            className="bg-primary hover:bg-primaryhover mt-4 font-medium py-3 px-8 rounded-full transition-all duration-75 ease-linear text-mainheading focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Check Now's
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;
