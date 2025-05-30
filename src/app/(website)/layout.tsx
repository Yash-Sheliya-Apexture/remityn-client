// "use client";
// import React, { useState, createContext, useContext, ReactNode } from "react";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer";
// import "../globals.css";

// interface LayoutProps {
//   children: ReactNode;
//   initialSelectedSendCurrency?: string; // Optional initial currency
// }

// interface AppContextProps {
//   selectedSendCurrency: string;
//   setSelectedSendCurrency: (currency: string) => void;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// }

// export default function Layout({
//   children,
//   initialSelectedSendCurrency = "USD",
// }: LayoutProps) {
//   //default usd
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
//     initialSelectedSendCurrency
//   );

//   return (
//     <AppContext.Provider
//       value={{ selectedSendCurrency, setSelectedSendCurrency }}
//     >
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </AppContext.Provider>
//   );
// }

// // app/(website)/layout.tsx
// "use client"; // Still needs to be a client component to use the Provider

// import React, { ReactNode } from "react";
// import Header from "./components/Header/Header"; // Make sure path is correct
// import Footer from "./components/Footer"; // Make sure path is correct
// import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
// import "../globals.css"; // Keep this for styles scoped here or globally

// interface LayoutProps {
//   children: ReactNode;
//   // Remove initialSelectedSendCurrency prop here, it's handled by the provider now
// }

// // This default export is the ONLY export Next.js expects (besides metadata etc.)
// export default function WebsiteLayout({ children }: LayoutProps) {
//   return (
//     // Wrap the content with the specific provider for this section
//     <WebsiteAppProvider>
//       {/* Header/Footer likely consume the context via useAppContext internally */}
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </WebsiteAppProvider>
//   );
// }

// // app/(website)/layout.tsx
// "use client"; // Needs to be a client component for useState, useEffect, and DOM interactions

// import React, { ReactNode, useState, useEffect, useRef } from "react";
// import Header from "./components/Header/Header"; // Make sure path is correct
// import Footer from "./components/Footer"; // Make sure path is correct
// import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
// import { FaArrowUp } from "react-icons/fa6"; // Import the icon
// import "../globals.css"; // Keep this for styles scoped here or globally

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function WebsiteLayout({ children }: LayoutProps) {
//   // State to control the visibility of the scroll-to-top button
//   const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
//   // Optional: Ref for the button if needed later, though not strictly necessary for this basic function
//   const scrollToTopButtonRef = useRef<HTMLDivElement>(null);

//   // Function to scroll the window to the top smoothly
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Smooth scroll animation
//     });
//   };

//   // Effect to add and remove the scroll event listener
//   useEffect(() => {
//     // Function to check scroll position and update visibility state
//     const handleScroll = () => {
//       // Show button if scrolled down more than, say, 200 pixels
//       if (window.scrollY > 250) {
//         setIsScrollToTopVisible(true);
//       } else {
//         setIsScrollToTopVisible(false);
//       }
//     };

//     // Add event listener when the component mounts
//     window.addEventListener("scroll", handleScroll);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

//   return (
//     <WebsiteAppProvider>
//       {/* Header likely consumes the context via useAppContext internally */}
//       <Header />

//       {/* Main content area */}
//       <main>{children}</main>

//       {/* Footer likely consumes the context via useAppContext internally */}
//       <Footer />

//       {/* Scroll to Top Button */}
//       <div
//         ref={scrollToTopButtonRef}
//         className={`fixed md:bottom-10 md:right-5 bottom-6 right-2 z-50 cursor-pointer rounded-full bg-primary lg:p-2.5 p-2 text-mainheading shadow-md transition-opacity duration-300 ease-in-out hover:bg-primaryhover ${
//           isScrollToTopVisible
//             ? "opacity-100 pointer-events-auto" // Visible and clickable
//             : "opacity-0 pointer-events-none" // Hidden and non-interactive
//         }`}
//         title="Scroll to Top"
//         onClick={scrollToTop} // Attach the scroll function to the click event
//       >
//         <FaArrowUp className="lg:size-4 size-3 text-mainheading" /> {/* Adjust icon size as needed */}
//       </div>
//     </WebsiteAppProvider>
//   );
// }

// // app/(website)/layout.tsx
// "use client"; // Needs to be a client component for useState, useEffect, and DOM interactions

// import React, { ReactNode, useState, useEffect, useRef } from "react";
// import Header from "./components/Header/Header"; // Make sure path is correct
// import Footer from "./components/Footer"; // Make sure path is correct
// import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
// import { FaArrowUp } from "react-icons/fa6"; // Import the icon
// import "../globals.css"; // Keep this for styles scoped here or globally

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function WebsiteLayout({ children }: LayoutProps) {
//   // State to control the visibility of the scroll-to-top button
//   const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
//   // Optional: Ref for the button if needed later
//   const scrollToTopButtonRef = useRef<HTMLDivElement>(null);

//   // Function to scroll the window to the top smoothly
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Smooth scroll animation
//     });
//   };

//   // Effect to add and remove the scroll event listener
//   useEffect(() => {
//     // Function to check scroll position and update visibility state
//     const handleScroll = () => {
//       // Show button if scrolled down more than, say, 250 pixels
//       if (window.scrollY > 200) {
//         setIsScrollToTopVisible(true);
//       } else {
//         setIsScrollToTopVisible(false);
//       }
//     };

//     // Add event listener when the component mounts
//     window.addEventListener("scroll", handleScroll);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

//   return (
//     <WebsiteAppProvider>
//       {/* Header */}
//       <Header />

//       {/* Main content area */}
//       <main>{children}</main>

//       {/* Footer */}
//       <Footer />

//       {/* Scroll to Top Button - Now with Animation */}
//       <div
//         ref={scrollToTopButtonRef}
//         className={`fixed md:right-5 bottom-10 right-2 z-50 cursor-pointer rounded-full bg-primary lg:p-2.5 p-2 text-mainheading shadow-md
//                    hover:bg-primaryhover
//                    transition-all duration-300 ease-in-out  // Animate ALL changes (opacity and transform)
//                    ${
//                      isScrollToTopVisible
//                        ? "opacity-100 translate-y-0 pointer-events-auto" // Visible: Full opacity, original position, clickable
//                        : "opacity-0 translate-y-10 pointer-events-none" // Hidden: Zero opacity, moved down (adjust '10' as needed), non-clickable
//                    }`}
//         title="Scroll to Top"
//         onClick={scrollToTop} // Attach the scroll function to the click event
//       >
//         <FaArrowUp className="lg:size-4 size-3 text-mainheading" />{" "}
//       </div>
//     </WebsiteAppProvider>
//   );
// }

// // app/(website)/layout.tsx
// "use client"; // Needs to be a client component for useState, useEffect, and DOM interactions

// import React, { ReactNode, useState, useEffect, useRef } from "react";
// import Header from "./components/Header/Header"; // Make sure path is correct
// import Footer from "./components/Footer"; // Make sure path is correct
// import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
// import { FaArrowUp } from "react-icons/fa6"; // Import the icon
// import "../globals.css"; // Keep this for styles scoped here or globally
// import TawkToScript from "../components/TawkToScript"; // Adjust path to your TawkToScript component if necessary

// interface LayoutProps {
//   children: ReactNode;
// }
// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// // Construct the Tawk.to script source URL ONLY if both IDs are available.
// const tawkToSrc =
//   tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null; // Will be null if either ID is missing, preventing script rendering.

// export default function WebsiteLayout({ children }: LayoutProps) {
//   // State to control the visibility of the scroll-to-top button
//   const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
//   // Optional: Ref for the button if needed later
//   const scrollToTopButtonRef = useRef<HTMLDivElement>(null);

//   // Function to scroll the window to the top smoothly
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Smooth scroll animation
//     });
//   };

//   // Effect to add and remove the scroll event listener
//   useEffect(() => {
//     // Function to check scroll position and update visibility state
//     const handleScroll = () => {
//       // Show button if scrolled down more than, say, 250 pixels
//       if (window.scrollY > 200) {
//         setIsScrollToTopVisible(true);
//       } else {
//         setIsScrollToTopVisible(false);
//       }
//     };

//     // Add event listener when the component mounts
//     window.addEventListener("scroll", handleScroll);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

//   return (
//     <WebsiteAppProvider>
//       {/* Header */}
//       <Header />

//       {/* Main content area */}
//       <main>{children}</main>

//       {/* Footer */}
//       <Footer />

//       {/* Scroll to Top Button - Now with Animation */}
//       <div
//         ref={scrollToTopButtonRef}
//         className={`fixed md:right-5 bottom-10 right-2 z-50 cursor-pointer rounded-full bg-primary lg:p-2.5 p-2 text-mainheading shadow-md
//                    hover:bg-primaryhover
//                    transition-all duration-300 ease-in-out  // Animate ALL changes (opacity and transform)
//                    ${
//                      isScrollToTopVisible
//                        ? "opacity-100 translate-y-0 pointer-events-auto" // Visible: Full opacity, original position, clickable
//                        : "opacity-0 translate-y-10 pointer-events-none" // Hidden: Zero opacity, moved down (adjust '10' as needed), non-clickable
//                    }`}
//         title="Scroll to Top"
//         onClick={scrollToTop} // Attach the scroll function to the click event
//       >
//         <FaArrowUp className="lg:size-4 size-3 text-mainheading" />{" "}
//       </div>
//       {/* Tawk.to Live Chat Script */}
//       {/* Conditionally render the TawkToScript Client Component only if the src URL is valid */}
//       {tawkToSrc && <TawkToScript src={tawkToSrc} />}
//     </WebsiteAppProvider>
//   );
// }

// // app/(website)/layout.tsx
// "use client"; // Still needed for WebsiteAppProvider or other client logic if any

// import React, { ReactNode } from "react"; // Removed useState, useEffect, useRef
// import Header from "./components/Header/Header"; // Make sure path is correct
// import Footer from "./components/Footer"; // Make sure path is correct
// import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
// import BackToTopButton from "../../app/dashboard/components/BackToTopButton"; // --- IMPORT THE REUSABLE COMPONENT --- (Adjust path if necessary)
// import TawkToScript from "../components/TawkToScript"; // Adjust path if needed
// import "../globals.css"; // Keep global styles

// interface LayoutProps {
//   children: ReactNode;
// }

// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// const tawkToSrc =
//   tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null;

// export default function WebsiteLayout({ children }: LayoutProps) {
//   // --- REMOVED ---
//   // const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
//   // const scrollToTopButtonRef = useRef<HTMLDivElement>(null);
//   // const scrollToTop = () => { ... };
//   // useEffect(() => { ... handleScroll logic ... }, []);
//   // --- END REMOVED ---

//   return (
//     <WebsiteAppProvider>
//       {/* Header */}
//       <Header />

//       {/* Main content area */}
//       <main>{children}</main>

//       {/* Footer */}
//       <Footer />

//       {/* --- USE THE REUSABLE BUTTON --- */}
//       <BackToTopButton position="center" mobileBehavior="visible"/>

//       {/* --- REMOVED OLD BUTTON JSX ---
//       <div
//         ref={scrollToTopButtonRef}
//         className={`fixed ... etc ... ${
//           isScrollToTopVisible ? ... : ...
//         }`}
//         title="Scroll to Top"
//         onClick={scrollToTop}
//       >
//         <FaArrowUp className="lg:size-4 size-3 text-mainheading" />{" "}
//       </div>
//       --- END REMOVED OLD BUTTON JSX --- */}

//       {/* Tawk.to Live Chat Script */}
//       {tawkToSrc && <TawkToScript src={tawkToSrc} />}
//     </WebsiteAppProvider>
//   );
// }

// app/(website)/layout.tsx
"use client"; // Still needed for WebsiteAppProvider or other client logic if any

import React, { ReactNode } from "react"; // Removed useState, useEffect, useRef
import Header from "./components/Header/Header"; // Make sure path is correct
import Footer from "./components/Footer"; // Make sure path is correct
import { WebsiteAppProvider } from "../contexts/WebsiteAppContext"; // Adjust path as needed
import BackToTopButton from "../../app/dashboard/components/BackToTopButton"; // --- IMPORT THE REUSABLE COMPONENT --- (Adjust path if necessary)
// import TawkToScript from "../components/TawkToScript"; // Adjust path if needed
import "../globals.css"; // Keep global styles
import FloatingActionButtons from "./components/FloatingActionButtons";

interface LayoutProps {
  children: ReactNode;
}

// const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
// const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

// const tawkToSrc =
//   tawkToPropertyId && tawkToWidgetId
//     ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//     : null;

export default function WebsiteLayout({ children }: LayoutProps) {
  // --- REMOVED ---
  // const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
  // const scrollToTopButtonRef = useRef<HTMLDivElement>(null);
  // const scrollToTop = () => { ... };
  // useEffect(() => { ... handleScroll logic ... }, []);
  // --- END REMOVED ---

  return (
    <>
      <head>
        {/* <script dangerouslySetInnerHTML={{ __html: ThemeInitializerScript }} /> */}

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1 " />

        <title>Remityn Clone - Money Transfer</title>
        <meta
          name="description"
          content="Send and receive money internationally with low fees and real exchange rates."
        />

        <link rel="icon" href="./Remityn.ico" sizes="any" />
      </head>
      <WebsiteAppProvider>
        {/* Header */}
        <Header />

        {/* Main content area */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* --- USE THE REUSABLE BUTTON --- */}
        <BackToTopButton position="center" mobileBehavior="visible" />

        {/* --- REMOVED OLD BUTTON JSX ---
      <div
        ref={scrollToTopButtonRef}
        className={`fixed ... etc ... ${
          isScrollToTopVisible ? ... : ...
        }`}
        title="Scroll to Top"
        onClick={scrollToTop}
      >
        <FaArrowUp className="lg:size-4 size-3 text-mainheading" />{" "}
      </div>
      --- END REMOVED OLD BUTTON JSX --- */}

        {/* Tawk.to Live Chat Script */}
        {/* {tawkToSrc && <TawkToScript src={tawkToSrc} />} */}
        <FloatingActionButtons />
      </WebsiteAppProvider>
    </>
  );
}
