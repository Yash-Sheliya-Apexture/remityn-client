// // layout.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import Sidebar from "../../dashboard/components/Sidebar"; // Import Sidebar component
// import Header from "../../dashboard/components/Header";

// export default function DashboardLayout({ children }) {
//   // State to manage sidebar, notifications, and active section
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login"); // Redirect to login if not authenticated
//     }
//   }, [user, loading, router]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>; // Or a spinner
//   }

//   if (!user) {
//     return null; // Redirect is handled in useEffect, so return null here
//   }

//   return (
//     <div className="dashboard-layout">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex h-screen">
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <Header toggleSidebar={toggleSidebar} />
//             {/* Main Content */}
//             <main className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide">
//               <div className="max-w-5xl mx-auto px-4 sm:pb-0 pb-22">
//                 {children} {/* Render page content here */}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // layout.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import Sidebar from "../../dashboard/components/Sidebar"; // Import Sidebar component
// import Header from "../../dashboard/components/Header";

// export default function DashboardLayout({ children }) {
//   // State to manage sidebar, notifications, and active section
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login"); // Redirect to login if not authenticated
//     }
//   }, [user, loading, router]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>; // Or a spinner
//   }

//   if (!user) {
//     return null; // Redirect is handled in useEffect, so return null here
//   }

//   return (
//     <div className="dashboard-layout">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex">
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="flex-1 flex flex-col">
//             <Header toggleSidebar={toggleSidebar} />
//             {/* Main Content */}
//             <main className="flex-1">
//               <div className="max-w-5xl mx-auto px-4 sm:pb-0 pb-22">
//                 {children} {/* Render page content here */}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// // layout.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import Sidebar from "../../dashboard/components/Sidebar";
// import Header from "../../dashboard/components/Header";
// import BackToTopButton from '../../dashboard/components/BackToTopButton'; // Adjust path as needed

// export default function DashboardLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login");
//     }
//   }, [user, loading, router]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="dashboard-layout"> {/* You might want relative positioning here if needed */}
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex">
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="lg:w-[calc(100%-256px)] w-full"> {/* Ensure flex container takes height */}
//             <Header toggleSidebar={toggleSidebar} />
//             {/* Main Content */}
//             <main className="flex-1">
//               <div className="max-w-5xl mx-auto px-4 lg:pb-0 sm:pb-10 pb-24">
//                 {children} {/* Render page content here */}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//       <BackToTopButton />
//     </div>
//   );
// }



// // layout.tsx
// "use client";

// import React, { useState, useEffect, ReactNode } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import Sidebar from "../../dashboard/components/Sidebar";
// import Header from "../../dashboard/components/Header";  
// import BackToTopButton from '../../dashboard/components/BackToTopButton';


// interface UserType {
//   id: string;
//   email: string;
//   name?: string;
// }

// interface DashboardLayoutProps {
//   children: ReactNode; 
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

//   const { user, loading } = useAuth() as { user: UserType | null; loading: boolean }; // Type assertion might be needed if useAuth isn't typed

//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login");
//     }
//   }, [user, loading, router]);

//   const toggleSidebar = (): void => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="dashboard-layout">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex min-h-screen"> 
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="flex flex-col flex-grow lg:w-[calc(100%-256px)] w-full"> 
//             <Header toggleSidebar={toggleSidebar} />
//             <main className="flex-grow"> 
//               <div className="max-w-5xl mx-auto px-4 pt-4 sm:px-6 lg:px-8 pb-24 sm:pb-10 lg:pb-10"> 
//               {children}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//       <BackToTopButton position="right" mobileBehavior="hidden"/>
//     </div>
//   );
// }



// // app/(dashboard)/layout.tsx
// "use client";

// import React, { useState, useEffect, ReactNode } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter, usePathname } from "next/navigation"; // <-- Import usePathname
// import Sidebar from "../../dashboard/components/Sidebar"; // Adjust path if necessary
// import Header from "../../dashboard/components/Header"; // Adjust path if necessary
// import BackToTopButton from '../../dashboard/components/BackToTopButton'; // Adjust path if necessary
// import TawkToScript from "../../components/TawkToScript"; // <-- Import TawkToScript (Adjust path if necessary relative to this file)


// interface UserType {
//   id: string;
//   email: string;
//   name?: string;
// }

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

//   // Type assertion might be needed if useAuth isn't typed
//   const { user, loading } = useAuth() as { user: UserType | null; loading: boolean };

//   const router = useRouter();
//   const pathname = usePathname(); // <-- Get the current pathname

//   // Redirect logic
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login");
//     }
//   }, [user, loading, router]);

//   // Logic to determine if Tawk.to should be shown
//   const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
//   const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

//   const tawkToSrc =
//     tawkToPropertyId && tawkToWidgetId
//       ? `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
//       : null;

//   // <-- Define the condition for showing Tawk.to -->
//   const shouldShowTawkTo = pathname === '/dashboard/your-account' || pathname.startsWith('/dashboard/your-account/');
//   // <----------------------------------------------->


//   const toggleSidebar = (): void => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>;
//   }

//   if (!user) {
//     return null; // Or render a loading/redirecting spinner if preferred
//   }

//   return (
//     <div className="dashboard-layout">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex min-h-screen">
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="flex flex-col flex-grow lg:w-[calc(100%-256px)] w-full">
//             <Header toggleSidebar={toggleSidebar} />
//             <main className="flex-grow">
//               <div className="max-w-5xl mx-auto px-4 pt-4 sm:px-6 lg:px-8 pb-24 sm:pb-10 lg:pb-10">
//                 {children}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//       <BackToTopButton position="right" mobileBehavior="hidden"/>

//       {/* <-- Conditionally render Tawk.to script --> */}
//       {tawkToSrc && shouldShowTawkTo && (
//           <TawkToScript src={tawkToSrc} />
//       )}
//       {/* <-------------------------------------> */}

//     </div>
//   );
// }



// app/(dashboard)/layout.tsx
"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation"; // <-- Import usePathname
import Sidebar from "../../dashboard/components/Sidebar"; // Adjust path if necessary
import Header from "../../dashboard/components/Header"; // Adjust path if necessary
import BackToTopButton from '../../dashboard/components/BackToTopButton'; // Adjust path if necessary


interface UserType {
  id: string;
  email: string;
  name?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Type assertion might be needed if useAuth isn't typed
  const { user, loading } = useAuth() as { user: UserType | null; loading: boolean };

  const router = useRouter();

  // Redirect logic
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);


  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!user) {
    return null; // Or render a loading/redirecting spinner if preferred
  }

  return (
    <div className="dashboard-layout">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex min-h-screen">
          <Sidebar
            sidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div className="flex flex-col flex-grow lg:w-[calc(100%-256px)] w-full">
            <Header toggleSidebar={toggleSidebar} />
            <main className="flex-grow">
              <div className="max-w-5xl mx-auto px-4 pb-32 sm:pb-10 lg:pb-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      <BackToTopButton position="right" mobileBehavior="hidden"/>
    </div>
  );
}