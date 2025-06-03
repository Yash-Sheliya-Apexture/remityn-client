// // app/components/BrevoManager.tsx
// "use client"; // This is a client component

// import Script from 'next/script';

// // --- Environment Variable ---
// // Get the Brevo Conversations ID from environment variables.
// // This variable must start with NEXT_PUBLIC_ to be available client-side.
// const brevoConversationsId = process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID;

// // --- Brevo Script Snippet ---
// // The Brevo script dynamically creates and appends a script tag.
// // We need to replicate the *initial* setup part of the script using dangerouslySetInnerHTML
// // and potentially use next/script's src attribute for the main conversations.js file.
// // However, the provided snippet itself handles loading the main script.
// // The simplest and safest way is to just provide the *entire* snippet to dangerouslySetInnerHTML
// // via next/script's inline script functionality.

// // We'll construct the full snippet string dynamically using the ID.
// const brevoFullSnippet = brevoConversationsId ? `
// (function(d, w, c) {
//     w.BrevoConversationsID = '${brevoConversationsId}'; // Use the environment variable ID
//     w[c] = w[c] || function() {
//         (w[c].q = w[c].q || []).push(arguments);
//     };
//     var s = d.createElement('script');
//     s.async = true;
//     // The main script URL is hardcoded in the original snippet
//     s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
//     if (d.head) d.head.appendChild(s);
// })(document, window, 'BrevoConversations');
// ` : ''; // If ID is missing, the snippet is an empty string

// // --- BrevoManager Component ---
// export default function BrevoManager() {
//     // If the environment variable is not set, do not render the script.
//     if (!brevoConversationsId) {
//         console.warn("BrevoManager: Missing NEXT_PUBLIC_BREVO_CONVERSATIONS_ID. Brevo Conversations disabled.");
//         return null;
//     }

//     return (
//         // Use next/script for optimized loading
//         <Script
//             id="brevo-conversations-script-manager" // Give it a unique ID
//             strategy="lazyOnload" // Load the script lazily when the browser is idle
//             // Alternatively, use "afterInteractive" if you want it to load as soon as possible after the page is interactive.
//             // For a chat widget, lazyOnload is usually appropriate.

//             // We use dangerouslySetInnerHTML to inject the entire Brevo snippet.
//             // next/script will handle appending this inline script tag to the DOM.
//             dangerouslySetInnerHTML={{ __html: brevoFullSnippet }}

//             // Optional: Add an error handler if the script fails to load
//             onError={(e) => {
//                 console.error('BrevoManager: Brevo Conversations script failed to load:', e);
//             }}
//         />
//     );
// }


// app/components/BrevoManager.tsx
"use client"; // This is a client component

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

// --- Environment Variable ---
const brevoConversationsId = process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID;

// --- Brevo Script Snippet (dynamically constructed) ---
// This snippet loads the main brevo-conversations.js script.
// It's designed to be executed early to initialize window.BrevoConversations
// as a queue function, allowing commands like 'onChatboxLoaded' to be
// pushed *before* the main script finishes loading.
const brevoFullSnippet = brevoConversationsId ? `
    (function(d, w, c) {
        w.BrevoConversationsID = '${brevoConversationsId}'; // Set the Conversation ID
        // Initialize w[c] as a function/queue if it doesn't exist.
        // This allows us to push commands (like 'onChatboxLoaded') to a queue
        // before the full API script loads and replaces this function with the real one.
        // This line is crucial: it ensures window.BrevoConversations exists immediately.
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        var s = d.createElement('script');
        s.async = true;
        // The main script URL is hardcoded in the original snippet
        s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
        // Append the script to the head
        if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations');
` : ''; // If ID is missing, the snippet is an empty string

// --- TypeScript Definition for Brevo Conversations API ---
// Based on the snippet and common chat widget patterns.
// The main function accepts commands as the first argument.
declare global {
    interface Window {
        BrevoConversations?: (command: string, ...args: any[]) => void | any;
        // Brevo also uses a queue pattern before the full script loads,
        // where commands like 'onChatboxLoaded' can be pushed to the queue.
        // Add the queue property explicitly for better type safety if needed,
        // though the primary API call uses the function signature.
        // BrevoConversations?: { (...args: any[]): void; q?: any[][] };
    }
}

// --- Helper Function (Visibility Logic) ---
// This function determines whether the Brevo widget should be shown based on the current path.
const shouldShowBrevoWidgetBasedOnPath = (currentPath: string): boolean => {
    const isAdminPath = currentPath.startsWith('/admin');
    const isAuthPath = currentPath.startsWith('/auth');
    const isDashboardPath = currentPath.startsWith('/dashboard');

    // Specific checks for the dashboard pages where we *do* want it to show
    const isYourAccountPath = currentPath === '/dashboard/your-account';
    const isThemeSettingsPath = currentPath === '/dashboard/your-account/theme-settings';
     // Allow it on the dashboard root if needed, or remove this line
     const isDashboardRoot = currentPath === '/dashboard';


    // Rule 1: Hide on admin or auth paths
    if (isAdminPath || isAuthPath) {
        // console.log(`BrevoManager (Visibility Logic): Path ${currentPath} is admin or auth. Hiding.`);
        return false;
    }

    // Rule 2: If it's a dashboard path, ONLY show it if it's the specific
    // '/dashboard', '/dashboard/your-account' or '/dashboard/your-account/theme-settings' path.
    // Otherwise, hide it on all other dashboard sub-paths.
    if (isDashboardPath) {
         const showOnSpecificDashboardPages = isDashboardRoot || isYourAccountPath || isThemeSettingsPath;
         // console.log(`BrevoManager (Visibility Logic): Path ${currentPath} is dashboard. Show on specific pages: ${showOnSpecificDashboardPages}`);
         return showOnSpecificDashboardPages;
    }

    // Rule 3: If it's not an admin, auth, or dashboard path, show it by default (e.g., public pages like '/', '/about', '/contact', etc.).
    // console.log(`BrevoManager (Visibility Logic): Path ${currentPath} is public. Showing.`);
    return true;
};

// --- BrevoManager Component ---
export default function BrevoManager() {
    const pathname = usePathname();
    // Ref to track if the Brevo API is fully initialized and ready to receive commands
    // beyond the initial queueing provided by the snippet.
    const brevoApiReady = useRef(false);

    // --- Safely Call Brevo API Function ---
    // This function attempts to call the BrevoConversations API with a command.
    // It checks if the API function exists (which it *should* after the snippet runs).
    // We rely on Brevo's internal queueing if the main script hasn't fully loaded,
    // but we primarily use this helper after brevoApiReady is true.
    const callBrevoAPI = (command: string, reason: string, currentPath: string, ...args: any[]) => {
        // Check if the BrevoConversations function exists (either the queue or the real one)
        // The snippet ensures window.BrevoConversations is defined very early.
        if (typeof window !== 'undefined' && window.BrevoConversations && typeof window.BrevoConversations === 'function') {
            try {
                // console.log(`BrevoManager: Calling API command '${command}' (${reason}) for path: ${currentPath}`);
                window.BrevoConversations(command, ...args);
            } catch (error) {
                console.error(`BrevoManager: Error calling BrevoConversations API command '${command}':`, error);
            }
        } else {
             // This should ideally not happen if the script strategy is correct,
             // unless the environment variable is missing or there's a fundamental script loading issue.
             console.error(`BrevoManager: window.BrevoConversations API function not available to call '${command}' (${reason}) for path: ${currentPath}. Check script loading and env var.`);
        }
    };

    // --- Effect 1: Define the onChatboxLoaded callback ---
    // This effect runs ONCE on mount to set up the listener BEFORE the main Brevo script might execute it.
    // It replaces the polling logic.
    useEffect(() => {
        if (typeof window === 'undefined') return; // Ensure running in browser
        if (!brevoConversationsId) return; // Don't do anything if ID is missing

        // console.log("BrevoManager: Setting up onChatboxLoaded callback.");

        // Define the callback function that fires when the chatbox UI is ready
        const handleBrevoChatboxLoaded = () => {
            // console.log("BrevoManager: Brevo 'onChatboxLoaded' event fired. API is now considered ready.");

            brevoApiReady.current = true; // Mark API as ready

            // Use window.location.pathname as it reflects the path the user was on
            // when the chatbox finished loading.
            const currentPathAtLoaded = window.location.pathname;

            // --- IMPLEMENT "HIDE FIRST" STRATEGY on load ---
            // Immediately hide the widget as soon as it's loaded to prevent flash,
            // then conditionally show based on the path.
            // Use the direct window.BrevoConversations call here as this callback
            // is invoked by Brevo's internal mechanism once the full API is ready.
             if (typeof window !== 'undefined' && window.BrevoConversations) {
                // console.log(`BrevoManager: Calling 'hideChatbox' initially for path: ${currentPathAtLoaded}`);
                window.BrevoConversations('hideChatbox'); // Hide immediately

                // Determine the correct visibility based on the path at the moment the chatbox loaded
                const shouldShow = shouldShowBrevoWidgetBasedOnPath(currentPathAtLoaded);

                // Apply the correct visibility state
                if (shouldShow) {
                    //  console.log(`BrevoManager: Path ${currentPathAtLoaded} allows show. Calling 'showChatbox'.`);
                    window.BrevoConversations('showChatbox');
                } else {
                     // It's already hidden from the "hide first" call, no need to call hide again.
                    //  console.log(`BrevoManager: Widget remains hidden for path: ${currentPathAtLoaded} based on rules after load.`);
                }
             } else {
                 console.error("BrevoManager: window.BrevoConversations not available inside onChatboxLoaded callback unexpectedly.");
             }
        };

        // Register the callback using the Brevo API command pattern.
        // This command is pushed to the queue if the main script isn't loaded yet,
        // or executed directly if it is.
        // The snippet ensures window.BrevoConversations exists as a function (the queue placeholder) here.
        if (typeof window !== 'undefined' && window.BrevoConversations) {
            window.BrevoConversations('onChatboxLoaded', handleBrevoChatboxLoaded);
            //  console.log("BrevoManager: Registered 'onChatboxLoaded' callback.");
        } else {
             // This error should now be fixed by changing the script strategy to 'beforeInteractive'.
             // If you still see this, there's a deeper issue with script loading or env var.
             console.error("BrevoManager: window.BrevoConversations not available when trying to register 'onChatboxLoaded'. Check NEXT_PUBLIC_BREVO_CONVERSATIONS_ID and script strategy.");
        }

        // Cleanup: Standard effect cleanup.
        return () => {
            //  console.log("BrevoManager: Brevo onChatboxLoaded effect cleanup.");
        };
    }, [brevoConversationsId]); // Dependency: Re-run if the ID changes (unlikely)


    // --- Effect 2: Update visibility on Path Changes (AFTER API is ready) ---
    // This effect runs whenever the 'pathname' changes.
     useEffect(() => {
        // Only attempt to change visibility if the API is confirmed ready by the first effect.
        // We also check window.BrevoConversations again just for robustness, though
        // brevoApiReady.current implies it should exist.
        if (brevoApiReady.current && typeof window !== 'undefined' && window.BrevoConversations) {
            const currentPath = pathname; // Use the pathname from the hook for navigation changes
            const shouldShow = shouldShowBrevoWidgetBasedOnPath(currentPath);

            // console.log(`BrevoManager: Path changed to ${currentPath}. Should show: ${shouldShow}.`);

            // Apply the correct visibility state for the new path
            if (shouldShow) {
                callBrevoAPI('showChatbox', 'navigation change', currentPath);
            } else {
                callBrevoAPI('hideChatbox', 'navigation change', currentPath);
            }
        } else if (!brevoApiReady.current) {
             // console.log(`BrevoManager: Path changed to ${pathname}, but API not ready. Visibility will be set on load.`);
        } else {
             console.error("BrevoManager: window.BrevoConversations not available during path change effect unexpectedly.");
        }
        // Re-run whenever the path changes.
    }, [pathname, brevoApiReady.current]); // Add brevoApiReady.current as dependency
     // This ensures that when brevoApiReady *first* becomes true, this effect also runs
     // to set the correct visibility for the *current* path immediately after load.


    // --- Render Script ---
    // Render the Script tag only if the environment variable is set.
    // Use 'beforeInteractive' strategy to ensure the snippet runs early
    // and initializes window.BrevoConversations as a queue before client-side React logic.
    if (!brevoConversationsId) {
        console.warn("BrevoManager: Missing NEXT_PUBLIC_BREVO_CONVERSATIONS_ID. Brevo Conversations disabled.");
        return null; // Don't render anything if ID is missing
    }

    return (
        // Use next/script for optimized loading of the inline snippet
        <Script
            id="brevo-conversations-script-manager" // Unique ID for the script tag
            strategy="beforeInteractive" // CHANGE THIS FROM lazyOnload
            dangerouslySetInnerHTML={{ __html: brevoFullSnippet }} // Inject the Brevo snippet code
            onError={(e) => {
                console.error('BrevoManager: Brevo Conversations script failed to load:', e);
                brevoApiReady.current = false; // Ensure flag is false on error
            }}
            // We don't need an onLoad on the Script tag itself because the snippet
            // defines the queue immediately and the 'onChatboxLoaded' event
            // is how we know the *widget* is fully ready.
        />
    );
}