// frontend/src/app/auth/google/callback-handler/page.tsx
"use client";

import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import type { BackendUser } from '@/app/contexts/AuthContext';
import { isValidBackendUser } from '@/app/contexts/AuthContext'; // Import validator
import { Loader2 } from 'lucide-react';

// Helper function to decode base64url
function base64UrlDecode(base64UrlString: string): string {
    let base64 = base64UrlString.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if necessary
    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }
    try {
        // Decode base64 -> binary string
        const binaryString = window.atob(base64);
        // Convert binary string to UTF-8 string (handles multi-byte characters)
        const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
        const utf8String = new TextDecoder().decode(bytes);
        return utf8String;
    } catch (e) {
        console.error("Failed to decode base64 string:", e);
        throw new Error("Invalid base64url data received."); // Re-throw specific error
    }
}


// Component containing the core logic
function GoogleCallbackLogic() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const hasProcessed = useRef(false);

    // Capture params immediately
    const initialToken = searchParams.get('token');
    const encodedUserData = searchParams.get('ud'); // Get encoded user data

    useEffect(() => {
        if (typeof window === 'undefined' || hasProcessed.current) return;
        hasProcessed.current = true;

        setIsProcessing(true);
        setError(null);

        // console.log("GoogleCallbackHandler: Processing callback.");
        // // Log presence, not value
        // console.log("GoogleCallbackHandler: Initial token:", initialToken ? 'Present' : 'MISSING');
        // console.log("GoogleCallbackHandler: Encoded User Data (ud):", encodedUserData ? 'Present' : 'MISSING');

        // // --- Clean URL immediately ---
        // console.log("GoogleCallbackHandler: Cleaning params from URL.");
        window.history.replaceState(null, '', window.location.pathname);
        // ---------------------------

        // --- Validate Token and User Data Presence ---
        if (!initialToken || initialToken.trim() === "" || !encodedUserData || encodedUserData.trim() === "") {
            const missing = [];
            if (!initialToken) missing.push('token');
            if (!encodedUserData) missing.push('user data');
            const errorMsg = `Authentication failed: Missing ${missing.join(' and ')}.`;
            console.error("Google OAuth Callback:", errorMsg);
            setError(errorMsg);
            setIsProcessing(false);
            setTimeout(() => { router.replace(`/auth/login?googleError=${encodeURIComponent(errorMsg)}`); }, 3000);
            return;
        }
        // ------------------------------------------

        try {
            // --- *** CORRECTED DECODING HERE *** ---
            // console.log("GoogleCallbackHandler: Decoding user data using base64UrlDecode...");
            const decodedString = base64UrlDecode(encodedUserData); // Use helper function
            // --- *** END CORRECTION *** ---

            const decodedUser = JSON.parse(decodedString) as Partial<BackendUser>;
            // console.log("GoogleCallbackHandler: Decoded user data:", decodedUser);

            // --- Validate Decoded User Data Structure ---
            if (!isValidBackendUser(decodedUser)) {
                 console.error("GoogleCallbackHandler: Decoded user data is invalid.", decodedUser);
                 // Provide more detail if possible
                 let validationError = "Invalid user data structure.";
                 if (!decodedUser) validationError = "Decoded user data is null/undefined.";
                 else if (!decodedUser._id) validationError = "Missing user ID.";
                 else if (!decodedUser.kyc) validationError = "Missing user KYC info.";
                 // Add more checks based on isValidBackendUser logic
                 throw new Error(validationError);
             }
            const validUser = decodedUser as BackendUser;
            // -----------------------------------------

            // ----- SUCCESS -----
            // console.log("GoogleCallbackHandler: User data decoded and validated. Calling AuthContext login...");
            login(validUser, initialToken);
            // console.log("GoogleCallbackHandler: AuthContext login called. Navigation should occur via context effect.");
            // No need to set loading state here, navigation takes over

        } catch (err: any) {
            // ----- FAILURE (Decoding/Validation/JSON Parse) -----
            console.error("GoogleCallbackHandler: Error processing user data:", err);
            const message = err?.message || "Failed to process authentication details.";
            setError(`Authentication failed: ${message}`);
            setIsProcessing(false);
            localStorage.removeItem('token');
            setTimeout(() => { router.replace(`/auth/login?googleError=${encodeURIComponent(message)}`); }, 3000);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login, router]); // Dependencies

    // Render minimal loading or error
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        {isProcessing && !error && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold text-mainheadingWhite">
              Finalizing authentication...
            </p>
            <p className="text-subheadingWhite">Please wait.</p>
          </>
        )}
        {error && (
          <div className="text-center bg-red-600/20 border border-red-500/30 text-red-300 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <p className="text-xl font-semibold mb-2">Authentication Failed</p>
            <p className="mb-4">{error}</p>
            <p className="text-sm">Redirecting to login page...</p>
          </div>
        )}
      </div>
    );
}

// Wrap the logic component with Suspense
export default function GoogleCallbackHandler() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-subheadingWhite p-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            </div>
        }>
            <GoogleCallbackLogic />
        </Suspense>
    );
}