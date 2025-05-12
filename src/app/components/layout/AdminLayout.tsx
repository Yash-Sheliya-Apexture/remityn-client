// // frontend/src/components/layout/AdminLayout.tsx
// "use client";

// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader"; // Import AdminHeader

// export default function AdminLayout({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       router.push("/auth/login"); // Redirect to login if not admin or not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading admin panel...</p>; // Or a spinner
//   }

//   if (!user || user.role !== "admin") {
//     return null; // Redirect is handled in useEffect
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminSidebar /> {/* Include Sidebar */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminHeader /> Include Header
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
//
//           {/* Increased padding for main content */}
//           <div className="container mx-auto">{children}</div>
//         </main>
//         <footer className="bg-gray-300 text-gray-700 p-4 text-center">
//           <p>
//             © {new Date().getFullYear()} Wise Admin Panel. All rights reserved.
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// frontend/src/app/components/layout/AdminLayout.tsx
// "use client";

// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";
// import React from "react"; // Import React if not already imported

// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       router.push("/auth/login"); // Redirect to login if not admin or not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading admin panel...</p>; // Or a spinner
//   }

//   if (!user || user.role !== "admin") {
//     return null; // Redirect is handled in useEffect
//   }

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar /> {/* Include Sidebar */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminHeader /> {/* Include Header */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F7FAFC]">
//           <div className="container mx-auto p-6">
//             {children} {/* Render content based on route */}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// frontend/src/app/components/layout/AdminLayout.tsx
// "use client";

// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";
// import React from "react"; // Import React if not already imported

// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       router.push("/auth/login"); // Redirect to login if not admin or not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading admin panel...</p>; // Or a spinner
//   }

//   if (!user || user.role !== "admin") {
//     return null; // Redirect is handled in useEffect
//   }

//   return (
//     <div className="flex h-screen bg-[#F7FAFC]">
//       {/* Sidebar - Hidden on small screens, slide in on mobile menu click */}
//       <AdminSidebar
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminHeader toggleSidebar={toggleSidebar} />
//         {/* Include Header and pass toggle function */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           <div className="container mx-auto p-6">
//             {children} {/* Render content based on route */}
//           </div>
//         </main>
//       </div>

//       {/* Backdrop to blur content when sidebar is open on mobile */}
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" // Hidden on larger screens
//         ></div>
//       )}
//     </div>
//   );
// }

// frontend/src/app/components/layout/AdminLayout.tsx
// "use client";

// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";
// import React from "react"; // Import React if not already imported

// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       router.push("/auth/login");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading admin panel...</p>;
//   }

//   if (!user || user.role !== "admin") {
//     return null;
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Light background for overall layout */}
//       <AdminSidebar
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminHeader toggleSidebar={toggleSidebar} />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           {/* Increased padding for content area */}
//           {children}
//         </main>
//       </div>
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 lg:hidden" // Adjusted backdrop blur
//         ></div>
//       )}
//     </div>
//   );
// }

// // frontend/src/app/components/layout/AdminLayout.tsx
// "use client";

// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";
// import React from "react"; // Import React if not already imported


// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       router.push("/auth/login");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading admin panel...</p>;
//   }

//   if (!user || user.role !== "admin") {
//     return null;
//   }

//   return (
//     <div className="flex h-dvh">
//       {/* Left Sidebar */}
//       <AdminSidebar
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminHeader toggleSidebar={toggleSidebar} />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-3 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//           {/* Increased padding for content area */}
//           {children}
//         </main>
//       </div>
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 dark:bg-white/30 z-40 lg:hidden" // Adjusted backdrop blur
//         ></div>
//       )}
//     </div>
//   );
// }



// frontend/src/app/components/layout/AdminLayout.tsx
"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import React from "react"; // Import React if not already imported


interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading admin panel...</p>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="admin-layout">
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-col flex-grow lg:w-[calc(100%-256px)] w-full">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-grow overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-3 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
          {/* Increased padding for content area */}
          {children}
        </main>
      </div>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 dark:bg-white/30 z-40 lg:hidden" // Adjusted backdrop blur
        ></div>
      )}
    </div>
    </div>
  );
}
