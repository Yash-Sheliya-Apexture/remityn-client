// // frontend/src/app/kyc/layout.tsx
// import React, { ReactNode } from 'react';
// import { KycProvider } from '../contexts/KycContext'; // Import the provider
// import KycHeader from '../components/KycHeader'; // Optional: A header specific to KYC
// import KycStepper from '../components/KycStepper'; // Optional: Visual stepper

// interface KycLayoutProps {
//     children: ReactNode;
// }

// export default function KycLayout({ children }: KycLayoutProps) {
//     return (
//         <KycProvider> {/* Wrap the KYC section in the context provider */}
//             <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
//                  {/* You might have a specific Header for KYC */}
//                  <KycHeader />

//                 <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
//                     <div className="max-w-3xl mx-auto">
//                          {/* Optional: Add a visual stepper component */}
//                          <KycStepper />

//                         <div className="bg-white dark:bg-secondary p-6 md:p-8 rounded-lg shadow-md mt-6">
//                              {children} {/* Render the specific KYC page content */}
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </KycProvider>
//     );
// }

// // frontend/src/app/kyc/layout.tsx
// 'use client'; // Mark this layout as a Client Component to use context/hooks

// import React, { ReactNode } from 'react';
// import { KycProvider } from '../contexts/KycContext'; // Import the provider
// import KycHeader from '../components/KycHeader'; // Optional: A header specific to KYC
// import KycStepper from '../components/KycStepper'; // Optional: Visual stepper
// import { usePathname } from 'next/navigation'; // To conditionally show stepper

// interface KycLayoutProps {
//     children: ReactNode;
// }

// export default function KycLayout({ children }: KycLayoutProps) {
//     const pathname = usePathname();

//     // Determine if the current page is one of the form steps
//     const isFormStep = /^\/kyc\/(personal|details|identity|upload|review)/.test(pathname);

//     return (
//         <KycProvider> {/* Wrap the entire KYC section */}
//             <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
//                 <KycHeader />

//                 <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
//                     <div className="max-w-3xl mx-auto">
//                         {/* Conditionally render the Stepper only on form pages */}
//                         {isFormStep && (
//                             <div className="mb-6 md:mb-8">
//                                 <KycStepper />
//                             </div>
//                         )}
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </KycProvider>
//     );
// }


// // frontend/src/app/kyc/layout.tsx
// import React from 'react';
// import { KycProvider } from '../contexts/KycContext'; // Adjust path if needed
// import KycLayout from '../components/KycLayout';   // Import the new layout wrapper


// export default function KycRootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <KycProvider>
//             <KycLayout>{children}</KycLayout>
//         </KycProvider>
//     );
// }


// // frontend/src/app/kyc/layout.tsx
// import React from 'react';
// import { KycProvider } from '@/app/contexts/KycContext'; // Adjust path if needed
// import KycLayoutComponent from '../components/KycLayout'; // Adjust path if needed

// // Layout for all routes under /kyc/*
// export default function KycRouteGroupLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <KycProvider>
//             <KycLayoutComponent>{children}</KycLayoutComponent>
//         </KycProvider>
//     );
// }

// import React from 'react';
// import { KycProvider } from '@/app/contexts/KycContext'; // Adjust path if needed
// import KycLayoutComponent from '../components/KycLayout'; // Adjust path if needed

// // Layout for all routes under /kyc/*
// export default function KycRouteGroupLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     // KycProvider wraps the specific layout component, which then renders children
//     return (
//         <KycProvider>
//             <KycLayoutComponent>{children}</KycLayoutComponent>
//         </KycProvider>
//     );
// }.



// frontend/src/app/kyc/layout.tsx
import React from 'react';
import { KycProvider } from '@/app/contexts/KycContext'; // Adjust path if needed
import KycLayoutComponent from '../components/KycLayout'; // Adjust path if needed

// Layout for all routes under /kyc/*
export default function KycRouteGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // KycProvider wraps the specific layout component, which then renders children
    // This ensures KycContext is available for KycLayoutComponent and its children
    return (
        <KycProvider>
            <KycLayoutComponent>{children}</KycLayoutComponent>
        </KycProvider>
    );
}