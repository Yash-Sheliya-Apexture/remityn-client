// components/TawkToScript.tsx
"use client"; // <-- This directive marks the component as a Client Component

import Script from 'next/script'; // Import the next/script component

// Define the props expected by this component
interface TawkToScriptProps {
  src: string; // The Tawk.to embed source URL
}

export default function TawkToScript({ src }: TawkToScriptProps) {
  // Because this runs on the client, we can safely define and pass event handlers like onError.
  return (
    <Script
      id="tawk-to-script" // Assign an ID for easier debugging in browser dev tools
      strategy="lazyOnload" // Load the script after the page is interactive and the browser is idle
      src={src} // The source URL passed from the parent Server Component (layout.tsx)
      onError={(e) => {
        // Handle potential loading errors (e.g., network issue, incorrect IDs)
        console.error(
          'Tawk.to script failed to load. Please check your Property ID/Widget ID environment variables (NEXT_PUBLIC_TAWK_PROPERTY_ID, NEXT_PUBLIC_TAWK_WIDGET_ID) and network connection.',
          e // Log the error event object for more details
        );
      }}
    />
  );
}