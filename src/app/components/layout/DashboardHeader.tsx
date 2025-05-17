// // frontend/src/components/layout/DashboardHeader.tsx
// import React from 'react';

// interface DashboardHeaderProps {
//     title: string;
//     // You can add more props here if needed, like user profile info, etc.
// }

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
//     return (
//         <header className="DashboardHeader bg-white py-4 sticky px-4 top-0 z-10">
//             <div className="container mx-auto flex justify-between items-center">
//                 <h1 className="text-2xl font-semibold text-main">{title}</h1>
//                 {/* You can add more header content here, like user profile dropdown, notifications, etc. */}
//             </div>
//         </header>
//     );
// };

// export default DashboardHeader;

// // frontend/src/components/layout/DashboardHeader.tsx
// 'use client';
// import React from 'react';
// import { useRouter } from 'next/navigation'; // Import useRouter
// import { GoArrowLeft } from "react-icons/go";

// interface DashboardHeaderProps {
//     title: string;
//     onBack?: () => void; // Generic onBack function
// }

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, onBack }) => {
//     const router = useRouter(); // Initialize useRouter

//     const handleBack = () => { // Simplified handleBack function
//         if (onBack) {
//             onBack(); // Call the onBack function if provided
//         } else {
//             router.back(); // Otherwise, default to browser history back
//         }
//     };

//     return (
//       <header className="DashboardHeader bg-white py-4 sticky px-4 top-0 z-10 mb-6">
//         <div className="container mx-auto flex flex-col gap-2">
//           <h1 className="text-2xl font-semibold text-main">{title}</h1>
//           {/* You can add more header content here, like user profile dropdown, notifications, etc. */}
//           <button // Keep button
//             onClick={handleBack} // Keep handleBack
//             className="relative inline-flex gap-1 items-center text-secondary w-fit font-semibold hover:text-secondary-hover transition-colors duration-200 ease-in-out bg-transparent border-none outline-none p-0 m-0 cursor-pointer
//              after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-secondary
//              group hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
//           >
//             <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">
//               <GoArrowLeft size={20}/>
//             </span>
//             Back
//           </button>
//         </div>
//       </header>
//     );
// };

// export default DashboardHeader;

// frontend/src/components/layout/DashboardHeader.tsx
"use client";
import React from "react";

interface DashboardHeaderProps {
  title: string;
  onBack?: () => void; // Generic onBack function
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <header className="DashboardHeader sticky lg:top-28 top-20 z-10 mb-6 bg-white dark:bg-background">
      <div className="Heading">
        <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default DashboardHeader;
