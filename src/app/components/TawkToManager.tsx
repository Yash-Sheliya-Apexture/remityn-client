// // app/components/TawkToManager.tsx
// "use client"; // Required for hooks and window access

// import { usePathname } from 'next/navigation';
// import { useEffect, useRef } from 'react';
// import Script from 'next/script'; // Use next/script for efficient loading

// // Fetch environment variables
// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
// const tawkToSrc = tawkToPropertyId && tawkToWidgetId ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}` : null;

// // --- TypeScript Definition for Tawk_API ---
// // This helps TypeScript understand the Tawk_API object.
// declare global {
//     interface Window {
//         Tawk_API?: {
//             hideWidget: () => void;
//             showWidget: () => void;
//             // You can add other Tawk_API methods here if needed
//         };
//         // Optional: Define Tawk_LoadStart if you use it elsewhere
//         // Tawk_LoadStart?: Date;
//     }
// }
// // --- End TypeScript Definition ---

// export default function TawkToManager() {
//     const pathname = usePathname();
//     // Use a ref to track if the Tawk API is ready to be called.
//     // This prevents calling the API before the script has fully loaded.
//     const tawkApiReady = useRef(false);

//     // --- Function to Safely Call Tawk API ---
//     const updateTawkVisibility = (show: boolean) => {
//         // Check if the script has loaded (tawkApiReady.current is true)
//         // and if the Tawk_API object exists on the window
//         if (tawkApiReady.current && window.Tawk_API) {
//             try {
//                 if (show) {
//                     console.log(`TawkToManager: Showing widget for path: ${pathname}`);
//                     window.Tawk_API.showWidget();
//                 } else {
//                     console.log(`TawkToManager: Hiding widget for path: ${pathname}`);
//                     window.Tawk_API.hideWidget();
//                 }
//             } catch (error) {
//                 console.error("TawkToManager: Error calling Tawk_API:", error);
//                 // Consider resetting the flag if calls fail consistently
//                 // tawkApiReady.current = false;
//             }
//         } else {
//              console.log(`TawkToManager: Tawk API not ready (Ready: ${tawkApiReady.current}, API Exists: ${!!window.Tawk_API}). Cannot update visibility.`);
//         }
//     };

//     // --- Effect to Control Visibility on Path Change ---
//     useEffect(() => {
//         // Determine if the widget *should* be shown based on the current path
//         const isWebsitePath = !pathname.startsWith('/dashboard') && !pathname.startsWith('/auth') && !pathname.startsWith('/admin');
//         const isYourAccountPath = pathname === '/dashboard/your-account' || pathname.startsWith('/dashboard/your-account/');
//         const shouldShowWidget = isWebsitePath || isYourAccountPath;

//         // Update visibility using the API
//         updateTawkVisibility(shouldShowWidget);

//         // This effect runs every time the pathname changes
//     }, [pathname]);

//     // --- Callback for when the Script Loads ---
//     const handleScriptLoad = () => {
//         console.log("TawkToManager: Tawk.to script finished loading.");
//         tawkApiReady.current = true; // Mark API as ready

//         // Set the *initial* visibility correctly based on the path *at the time of loading*
//         const isWebsitePath = !pathname.startsWith('/dashboard') && !pathname.startsWith('/auth');
//         const isYourAccountPath = pathname === '/dashboard/your-account' || pathname.startsWith('/dashboard/your-account/');
//         const shouldShowWidget = isWebsitePath || isYourAccountPath;
//         updateTawkVisibility(shouldShowWidget);
//     };

//     // --- Render the Script Component ---
//     // Only render the Script tag if the source URL is valid.
//     // It will load only once across navigation unless the component is fully unmounted.
//     if (!tawkToSrc) {
//         console.warn("TawkToManager: Missing Tawk.to Property ID or Widget ID in environment variables. Tawk.to disabled.");
//         return null; // Don't render anything if IDs are missing
//     }

//     return (
//         <Script
//             id="tawkto-script-manager" // Unique ID for the script tag
//             strategy="lazyOnload" // Load the script after the page is interactive
//             src={tawkToSrc}
//             onLoad={handleScriptLoad} // Function to call when script loads successfully
//             onError={(e) => { // Function to call if script fails to load
//                 console.error('TawkToManager: Tawk.to script failed to load:', e);
//                 tawkApiReady.current = false; // Ensure API is marked as not ready on error
//             }}
//         />
//     );
// }

// // app/components/TawkToManager.tsx
// "use client";

// import { usePathname } from 'next/navigation';
// import { useEffect, useRef, useCallback } from 'react';
// import Script from 'next/script';

// // --- Environment Variables ---
// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
// const tawkToSrc = tawkToPropertyId && tawkToWidgetId ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}` : null;

// // --- TypeScript Definition ---
// interface TawkAPI {
//     hideWidget: () => void;
//     showWidget: () => void;
//     onLoad?: () => void;
//     [key: string]: any;
// }

// declare global {
//     interface Window {
//         Tawk_API?: TawkAPI;
//     }
// }

// // --- Helper Function (Visibility Logic - unchanged) ---
// const shouldShowWidgetBasedOnPath = (currentPath: string): boolean => {
//     const isAdminPath = currentPath.startsWith('/admin');
//     const isAuthPath = currentPath.startsWith('/auth');
//     const isDashboardPath = currentPath.startsWith('/dashboard');
//     const isYourAccountPath = currentPath.startsWith('/dashboard/your-account');

//     if (isAdminPath || isAuthPath) return false;
//     if (isDashboardPath) return isYourAccountPath;
//     return true; // Default show for public pages
// };


// // --- TawkToManager Component ---
// export default function TawkToManager() {
//     const pathname = usePathname();
//     const tawkApiReady = useRef(false);
//     const pathnameRef = useRef(pathname);

//     useEffect(() => {
//         pathnameRef.current = pathname;
//     }, [pathname]);

//     // --- Update Visibility Function ---
//     // Ensures API is ready and methods exist before calling
//     const updateTawkVisibility = useCallback((show: boolean, reason: string) => {
//         // We primarily rely on tawkApiReady flag now, set only when methods are confirmed
//         if (tawkApiReady.current && window.Tawk_API) {
//             try {
//                 if (show) {
//                     console.log(`TawkToManager: Showing widget (${reason}) for path: ${pathnameRef.current}`);
//                     // Check specifically for showWidget before calling
//                     if (typeof window.Tawk_API.showWidget === 'function') {
//                        window.Tawk_API.showWidget();
//                     } else {
//                        console.warn(`TawkToManager: showWidget function not found when trying to show.`);
//                     }
//                 } else {
//                     console.log(`TawkToManager: Hiding widget (${reason}) for path: ${pathnameRef.current}`);
//                      // Check specifically for hideWidget before calling
//                     if (typeof window.Tawk_API.hideWidget === 'function') {
//                        window.Tawk_API.hideWidget();
//                     } else {
//                        console.warn(`TawkToManager: hideWidget function not found when trying to hide.`);
//                     }
//                 }
//             } catch (error) {
//                 console.error("TawkToManager: Error calling Tawk_API:", error);
//             }
//         } else {
//              console.log(`TawkToManager: Tawk API not ready. Cannot update visibility (${reason}) for path: ${pathnameRef.current}`);
//         }
//     }, []); // No dependencies needed as it uses refs and window

//     // --- Setup Tawk_API.onLoad ---
//     useEffect(() => {
//         // Ensure Tawk_API exists on window
//         if (!window.Tawk_API) {
//             window.Tawk_API = {} as TawkAPI;
//         }

//         // Define the onLoad callback
//         window.Tawk_API.onLoad = () => {
//             console.log("TawkToManager: Tawk_API.onLoad fired.");

//             // --- HIDE FIRST STRATEGY ---
//             // Immediately try to hide the widget as soon as Tawk signals it's ready.
//             // This prevents the flash of default visibility.
//             try {
//                 if (typeof window.Tawk_API?.hideWidget === 'function') {
//                     console.log("TawkToManager: Tawk_API.onLoad - Pre-emptively hiding widget.");
//                     window.Tawk_API.hideWidget();
//                 } else {
//                     console.warn("TawkToManager: Tawk_API.onLoad - hideWidget not available for pre-emptive hide.");
//                 }
//             } catch (e) {
//                 console.error("TawkToManager: Error during pre-emptive hide:", e);
//             }
//             // --- END HIDE FIRST ---

//             // Now, check if API methods are fully available
//             if (typeof window.Tawk_API?.showWidget === 'function' &&
//                 typeof window.Tawk_API?.hideWidget === 'function')
//             {
//                 console.log("TawkToManager: Tawk API methods confirmed.");
//                 tawkApiReady.current = true; // Mark API as ready

//                 // Determine visibility based on path rules
//                 const shouldShow = shouldShowWidgetBasedOnPath(pathnameRef.current);

//                 // Only show if the rules allow it (it's already hidden otherwise)
//                 if (shouldShow) {
//                     updateTawkVisibility(true, 'initial load - rules allow');
//                 } else {
//                      console.log("TawkToManager: Tawk_API.onLoad - Widget remains hidden based on path rules.");
//                      // No need to call hide again, but ensure state is consistent
//                      // updateTawkVisibility(false, 'initial load - rules deny'); // Optional: Call hide again for super-safety/logging
//                 }
//             } else {
//                 console.error("TawkToManager: Tawk_API.onLoad fired, but showWidget/hideWidget methods are still missing or not functions!");
//                 tawkApiReady.current = false;
//             }
//         };

//         // Cleanup
//         return () => {
//             if (window.Tawk_API && window.Tawk_API.onLoad) {
//                  window.Tawk_API.onLoad = undefined;
//             }
//         };
//     }, [updateTawkVisibility]); // Dependency array


//     // --- Effect for Path Changes (Handles Navigation AFTER initial load) ---
//      useEffect(() => {
//         // Only run updates if the API has been marked as ready by the onLoad callback
//         if (tawkApiReady.current) {
//             const shouldShow = shouldShowWidgetBasedOnPath(pathname);
//             updateTawkVisibility(shouldShow, 'navigation');
//         }
//         // If API is not ready, the initial onLoad logic will handle the first visibility state correctly.
//     }, [pathname, updateTawkVisibility]); // Re-run when path changes

//     // --- Render Script ---
//     if (!tawkToSrc) {
//         console.warn("TawkToManager: Missing Tawk.to Property ID or Widget ID. Tawk.to disabled.");
//         return null;
//     }

//     return (
//         <Script
//             id="tawkto-script-manager"
//             strategy="lazyOnload"
//             src={tawkToSrc}
//             onError={(e) => {
//                 console.error('TawkToManager: Tawk.to script failed to load:', e);
//                 tawkApiReady.current = false; // Ensure not marked ready on error
//             }}
//         />
//     );
// }

// // app/components/TawkToManager.tsx
// "use client";

// import { usePathname } from 'next/navigation';
// import { useEffect, useRef, useCallback } from 'react';
// import Script from 'next/script';

// // --- Environment Variables ---
// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
// const tawkToSrc = tawkToPropertyId && tawkToWidgetId ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}` : null;

// // --- TypeScript Definition ---
// interface TawkAPI {
//     hideWidget: () => void;
//     showWidget: () => void;
//     onLoad?: () => void;
//     [key: string]: any;
// }

// declare global {
//     interface Window {
//         Tawk_API?: TawkAPI;
//     }
// }

// // --- Helper Function (Visibility Logic - unchanged) ---
// const shouldShowWidgetBasedOnPath = (currentPath: string): boolean => {
//     const isAdminPath = currentPath.startsWith('/admin');
//     const isAuthPath = currentPath.startsWith('/auth');
//     const isDashboardPath = currentPath.startsWith('/dashboard');
//     // Specific check for the target page if Tawk needs unique behavior there
//     const isYourAccountPath = currentPath === '/dashboard/your-account'; // Use exact match

//     if (isAdminPath || isAuthPath) return false;

//     // Example: Show on '/dashboard/your-account', hide on other dashboard pages
//     if (isDashboardPath) return isYourAccountPath;

//     return true; // Default show for public pages
// };

// // --- TawkToManager Component ---
// export default function TawkToManager() {
//     const pathname = usePathname();
//     const tawkApiReady = useRef(false);
//     const pathnameRef = useRef(pathname);

//     // Keep pathnameRef updated for Tawk API callbacks
//     useEffect(() => {
//         pathnameRef.current = pathname;
//     }, [pathname]);

//     // --- Update Tawk Visibility Function (Unchanged from your version) ---
//     const updateTawkVisibility = useCallback((show: boolean, reason: string) => {
//         if (tawkApiReady.current && window.Tawk_API) {
//             try {
//                 if (show) {
//                     console.log(`TawkToManager: Showing widget (${reason}) for path: ${pathnameRef.current}`);
//                     if (typeof window.Tawk_API.showWidget === 'function') {
//                        window.Tawk_API.showWidget();
//                     } else {
//                        console.warn(`TawkToManager: showWidget function not found when trying to show.`);
//                     }
//                 } else {
//                     console.log(`TawkToManager: Hiding widget (${reason}) for path: ${pathnameRef.current}`);
//                     if (typeof window.Tawk_API.hideWidget === 'function') {
//                        window.Tawk_API.hideWidget();
//                     } else {
//                        console.warn(`TawkToManager: hideWidget function not found when trying to hide.`);
//                     }
//                 }
//             } catch (error) {
//                 console.error("TawkToManager: Error calling Tawk_API:", error);
//             }
//         } else {
//              console.log(`TawkToManager: Tawk API not ready. Cannot update visibility (${reason}) for path: ${pathnameRef.current}`);
//         }
//     }, []);

//     // --- Setup Tawk_API.onLoad (Unchanged from your version) ---
//      useEffect(() => {
//         if (!window.Tawk_API) {
//             window.Tawk_API = {} as TawkAPI;
//         }
//         window.Tawk_API.onLoad = () => {
//             console.log("TawkToManager: Tawk_API.onLoad fired.");
//             try {
//                 if (typeof window.Tawk_API?.hideWidget === 'function') {
//                     console.log("TawkToManager: Tawk_API.onLoad - Pre-emptively hiding widget.");
//                     window.Tawk_API.hideWidget();
//                 } else {
//                     console.warn("TawkToManager: Tawk_API.onLoad - hideWidget not available for pre-emptive hide.");
//                 }
//             } catch (e) {
//                 console.error("TawkToManager: Error during pre-emptive hide:", e);
//             }

//             if (typeof window.Tawk_API?.showWidget === 'function' && typeof window.Tawk_API?.hideWidget === 'function')
//             {
//                 console.log("TawkToManager: Tawk API methods confirmed.");
//                 tawkApiReady.current = true;
//                 const shouldShow = shouldShowWidgetBasedOnPath(pathnameRef.current);
//                 if (shouldShow) {
//                     updateTawkVisibility(true, 'initial load - rules allow');
//                 } else {
//                      console.log("TawkToManager: Tawk_API.onLoad - Widget remains hidden based on path rules.");
//                 }
//             } else {
//                 console.error("TawkToManager: Tawk_API.onLoad fired, but showWidget/hideWidget methods are still missing or not functions!");
//                 tawkApiReady.current = false;
//             }
//         };
//         return () => {
//             if (window.Tawk_API && window.Tawk_API.onLoad) {
//                  window.Tawk_API.onLoad = undefined;
//             }
//         };
//     }, [updateTawkVisibility]); // Keep dependency

//     // --- Effect for Tawk Visibility on Path Changes (Unchanged from your version) ---
//      useEffect(() => {
//         if (tawkApiReady.current) {
//             const shouldShow = shouldShowWidgetBasedOnPath(pathname);
//             updateTawkVisibility(shouldShow, 'navigation');
//         }
//     }, [pathname, updateTawkVisibility]); // Keep dependencies

//     // --- *** NEW EFFECT: Manage Body Class based on Path *** ---
//     useEffect(() => {
//         const targetPath = '/dashboard/your-account';
//         const bodyClass = 'your-account-page-active'; // Choose your desired class name

//         // Check if the current path matches the target path
//         if (pathname === targetPath) {
//             document.body.classList.add(bodyClass);
//             console.log(`BodyClassManager: Added class '${bodyClass}' for path: ${pathname}`);

//             // Return a cleanup function to remove the class when the path changes
//             // away from the target path OR when the component unmounts.
//             return () => {
//                 document.body.classList.remove(bodyClass);
//                 console.log(`BodyClassManager: Removed class '${bodyClass}' (cleanup)`);
//             };
//         } else {
//              // Ensure the class is removed if the path is not the target one
//              // This handles cases where the component might mount on a different page
//              // or when navigating *away* from the target page.
//              document.body.classList.remove(bodyClass);
//         }
//     }, [pathname]); // Re-run this effect whenever the pathname changes

//     // --- Render Script (Unchanged from your version) ---
//     if (!tawkToSrc) {
//         console.warn("TawkToManager: Missing Tawk.to Property ID or Widget ID. Tawk.to disabled.");
//         return null;
//     }

//     return (
//         <Script
//             id="tawkto-script-manager"
//             strategy="lazyOnload"
//             src={tawkToSrc}
//             onError={(e) => {
//                 console.error('TawkToManager: Tawk.to script failed to load:', e);
//                 tawkApiReady.current = false;
//             }}
//         />
//     );
// }


// app/components/TawkToManager.tsx
"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

// --- Environment Variables ---
const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
const tawkToSrc = tawkToPropertyId && tawkToWidgetId ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}` : null;

// --- TypeScript Definition ---
interface TawkCustomStyleVisibility {
  position?: 'br' | 'bl' | 'tr' | 'tl' | 'cr' | 'cl' | 'mm'; // bottom-right, bottom-left, etc.
  xOffset?: number;
  yOffset?: number;
}

interface TawkCustomStyleBubble {
  rotate?: string; // e.g., '0deg'
  xOffset?: number;
  yOffset?: number;
  backgroundColor?: string; // Optional: Tawk.to might support these
  foregroundColor?: string; // Optional
}

interface TawkCustomStyleObject {
  visibility?: {
    desktop?: TawkCustomStyleVisibility;
    mobile?: TawkCustomStyleVisibility;
    bubble?: TawkCustomStyleBubble;
  };
  // You can add other top-level customStyle properties here if Tawk.to supports them
}

interface TawkAPI {
    hideWidget: () => void;
    showWidget: () => void;
    onLoad?: () => void;
    customStyle?: TawkCustomStyleObject;
    [key: string]: any;
}

declare global {
    interface Window {
        Tawk_API?: TawkAPI;
    }
}

// --- Define Custom Styles ---
const defaultTawkCustomStyle: TawkCustomStyleObject = {
    visibility: {
        desktop: {
            position: 'bl',
            xOffset: 25,
            yOffset: 25
        },
        mobile: {
            position: 'br',
            xOffset: 30,
            yOffset: 100
        },
        bubble: {
            rotate: '0deg',
            xOffset: 0,
            yOffset: 0
        }
    }
};

const yourAccountPageTawkCustomStyle: TawkCustomStyleObject = {
    visibility: {
        desktop: {
            position: 'bl',
            xOffset: 25,
            yOffset: 25
        },
        mobile: {
            position: 'br',
            xOffset: 15,
            yOffset: 75
        },
        bubble: {
            rotate: '0deg',
            xOffset: -50,
            yOffset: -10
        }
    }
};

const themeSettingsPageTawkCustomStyle: TawkCustomStyleObject = {
    visibility: {
        desktop: {
            position: 'br',
            xOffset: 30,      // Example: Different X offset for theme page
            yOffset: 95       // Example: Different Y offset for theme page
        },
        mobile: {
            position: 'br',
            xOffset: 20,      // Example: Different mobile X offset
            yOffset: 85       // Example: Different mobile Y offset
        },
        bubble: {
            rotate: '0deg',
            xOffset: 0,
            yOffset: 0
        }
    }
};

// --- Helper Function: Get Custom Style based on Path ---
const getCustomStyleForPath = (currentPath: string): TawkCustomStyleObject => {
    if (currentPath === '/dashboard/your-account/theme-settings') {
        // console.log(`TawkToManager: Using themeSettingsPageTawkCustomStyle for ${currentPath}`);
        return themeSettingsPageTawkCustomStyle;
    }
    if (currentPath === '/dashboard/your-account') {
        // console.log(`TawkToManager: Using yourAccountPageTawkCustomStyle for ${currentPath}`);
        return yourAccountPageTawkCustomStyle;
    }
    // console.log(`TawkToManager: Using defaultTawkCustomStyle for ${currentPath}`);
    return defaultTawkCustomStyle;
};


// --- Helper Function (Visibility Logic) ---
const shouldShowWidgetBasedOnPath = (currentPath: string): boolean => {
    const isAdminPath = currentPath.startsWith('/admin');
    const isAuthPath = currentPath.startsWith('/auth');
    const isDashboardPath = currentPath.startsWith('/dashboard');
    const isYourAccountPath = currentPath === '/dashboard/your-account';
    const isThemeSettingsPath = currentPath === '/dashboard/your-account/theme-settings';

    if (isAdminPath || isAuthPath) return false;

    // Show on specific dashboard pages, hide on others
    if (isDashboardPath) {
        return isYourAccountPath || isThemeSettingsPath;
    }

    return true; // Default show for public pages
};

// --- TawkToManager Component ---
export default function TawkToManager() {
    const pathname = usePathname();
    const tawkApiReady = useRef(false);
    const pathnameRef = useRef(pathname);

    // Keep pathnameRef updated for Tawk API callbacks
    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    // Effect to initialize Tawk_API, set customStyle, and handle onLoad
    useEffect(() => {
        if (typeof window === 'undefined') return; // Ensure running in browser

        window.Tawk_API = window.Tawk_API || ({} as TawkAPI);

        const initialPath = pathnameRef.current;
        window.Tawk_API.customStyle = getCustomStyleForPath(initialPath);
        console.log(`TawkToManager (Initial Setup): Set customStyle for ${initialPath}`, window.Tawk_API.customStyle);

        window.Tawk_API.onLoad = () => {
            console.log("TawkToManager: Tawk_API.onLoad fired.");
            tawkApiReady.current = true;

            const pathAtLoadTime = pathnameRef.current;
            const styleAtLoadTime = getCustomStyleForPath(pathAtLoadTime);

            if (window.Tawk_API!.customStyle !== styleAtLoadTime) {
                console.log(`TawkToManager (onLoad Update): Correcting customStyle for ${pathAtLoadTime}`, styleAtLoadTime);
                window.Tawk_API!.customStyle = styleAtLoadTime;
            }

            try {
                if (typeof window.Tawk_API?.hideWidget === 'function') {
                    console.log(`TawkToManager (onLoad): Pre-emptively hiding widget for path ${pathAtLoadTime}.`);
                    window.Tawk_API.hideWidget();
                } else {
                    console.warn("TawkToManager (onLoad): hideWidget not available for pre-emptive hide.");
                }
            } catch (e) {
                console.error("TawkToManager (onLoad): Error during pre-emptive hide:", e);
            }

            const shouldShow = shouldShowWidgetBasedOnPath(pathAtLoadTime);
            if (shouldShow) {
                if (typeof window.Tawk_API?.showWidget === 'function') {
                    console.log(`TawkToManager (onLoad): Showing widget for path: ${pathAtLoadTime}`);
                    window.Tawk_API.showWidget();
                } else {
                    console.warn(`TawkToManager (onLoad): showWidget function not found when trying to show for ${pathAtLoadTime}.`);
                }
            } else {
                console.log(`TawkToManager (onLoad): Widget remains hidden for ${pathAtLoadTime} based on rules.`);
            }
        };

        return () => {
            if (window.Tawk_API && window.Tawk_API.onLoad) {
                window.Tawk_API.onLoad = undefined;
            }
        };
    }, []); // Runs once on mount to set up Tawk_API and onLoad.

    // Effect for Tawk Visibility and Custom Style on Path Changes (after initial load)
     useEffect(() => {
        if (!tawkApiReady.current || !window.Tawk_API || typeof window === 'undefined') {
            return;
        }

        const currentPath = pathname;
        const styleToApply = getCustomStyleForPath(currentPath);

        if (window.Tawk_API.customStyle !== styleToApply) {
            console.log(`TawkToManager (Path Change): Applying customStyle for path: ${currentPath}`, styleToApply);
            window.Tawk_API.customStyle = styleToApply;
        }

        try {
            if (typeof window.Tawk_API.hideWidget === 'function') {
                // console.log(`TawkToManager (Path Change): Hiding widget before visibility check for ${currentPath}`);
                window.Tawk_API.hideWidget();
            } else {
                 console.warn(`TawkToManager (Path Change): hideWidget not found when attempting to hide for ${currentPath}.`);
            }
        } catch (error) {
            console.error(`TawkToManager (Path Change): Error hiding widget for ${currentPath}:`, error);
        }

        const shouldShow = shouldShowWidgetBasedOnPath(currentPath);
        if (shouldShow) {
            if (typeof window.Tawk_API.showWidget === 'function') {
                console.log(`TawkToManager (Path Change): Showing widget for path: ${currentPath}`);
                window.Tawk_API.showWidget();
            } else {
                console.warn(`TawkToManager (Path Change): showWidget function not found when trying to show for ${currentPath}.`);
            }
        } else {
            console.log(`TawkToManager (Path Change): Widget remains hidden for path: ${currentPath} based on rules.`);
        }
    }, [pathname]); // Re-run this effect whenever the pathname changes.

    // --- Effect: Manage Body Class based on Path ---
    useEffect(() => {
        const targetPaths = ['/dashboard/your-account', '/dashboard/your-account/theme-settings'];
        const bodyClass = 'your-account-page-active'; // You can make this dynamic if needed

        if (targetPaths.includes(pathname)) {
            document.body.classList.add(bodyClass);
            // console.log(`BodyClassManager: Added class '${bodyClass}' for path: ${pathname}`);
            return () => {
                document.body.classList.remove(bodyClass);
                // console.log(`BodyClassManager: Removed class '${bodyClass}' (cleanup for path: ${pathname})`);
            };
        } else {
             // Ensure class is removed if current path is not one of the targets
             if (document.body.classList.contains(bodyClass)) {
                document.body.classList.remove(bodyClass);
                // console.log(`BodyClassManager: Removed class '${bodyClass}' as path is not a target: ${pathname}`);
             }
        }
    }, [pathname]); // Re-run this effect whenever the pathname changes

    // --- Render Script ---
    if (!tawkToSrc) {
        console.warn("TawkToManager: Missing Tawk.to Property ID or Widget ID. Tawk.to disabled.");
        return null;
    }

    return (
        <Script
            id="tawkto-script-manager"
            strategy="lazyOnload"
            src={tawkToSrc}
            onError={(e) => {
                console.error('TawkToManager: Tawk.to script failed to load:', e);
                tawkApiReady.current = false; // Ensure API ready state is false on error
            }}
        />
    );
}