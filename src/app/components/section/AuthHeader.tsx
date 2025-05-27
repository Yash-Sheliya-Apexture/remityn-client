// // components/AuthHeader.tsx
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { IoClose } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// interface AuthHeaderProps {}

// const AuthHeader: React.FC<AuthHeaderProps> = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     // Set initial value
//     handleResize();

//     // Listen for window resize events
//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener on unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="p-4 border-b border-gray-300">
//       <div className="container mx-auto flex justify-between items-center max-w-6xl">
//         <Link href="/" className="text-xl font-semibold text-primary-500">
//           {isMobile ? (
//             <Image
//               src="/assets/images/mobile-wise-logo.svg" // Replace with your mobile logo
//               width={30} // Adjust as needed
//               height={30} // Adjust as needed
//               alt="Wise Logo (Mobile)"
//             />
//           ) : (
//             <Image
//               src="/assets/images/wise-logo.svg"
//               width={100}
//               height={100}
//               alt="Wise Logo"
//             />
//           )}
//         </Link>
//         <Link href="/" className="text-neutral-500 cursor-pointer">
//           <IoClose className="size-10 text-green p-1.5 rounded-full hover:bg-[#16330021]" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AuthHeader;

// // components/AuthHeader.tsx
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { IoClose } from "react-icons/io5";
// import { useState, useEffect } from "react";
// import React from "react";

// const AuthHeader: React.FC = () => {

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       // Ensure window is defined (for server-side rendering safety, although "use client" mitigates this)
//       if (typeof window !== "undefined") {
//         setIsMobile(window.innerWidth < 768);
//       }
//     };

//     // Set initial value
//     handleResize();

//     // Listen for window resize events
//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener on unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []); // Empty dependency array ensures this runs only on mount and unmount

//   return (
//     <header className="bg-white dark:bg-background border-b sticky top-0">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <Link href="/" className="text-xl font-semibold text-primary">
//             {isMobile ? (
//               <Image
//                 src="/assets/images/wise-logo2.svg" // Replace with your mobile logo
//                 width={35} // Adjust as needed
//                 height={35} // Adjust as needed
//                 alt="Wise Logo (Mobile)"
//               />
//             ) : (
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={100}
//                 height={24}
//                 priority
//                 className="md:w-26 h-auto"
//               />
//             )}
//           </Link>

//           <div className="size-12 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear">
//             <Link href="/">
//               <span className="text-neutral-900 dark:text-primary">
//                 <IoClose size={28} />
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AuthHeader;

// components/AuthHeader.tsx
"use client"; // Keep this directive

import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import React from "react"; // No longer need useState, useEffect

const AuthHeader: React.FC = () => {
  return (
    <header className="border-b sticky top-0 z-50">
      {/* Added z-index just in case */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-xl font-semibold text-primary">
            <Image
              src="/assets/images/white_logo.svg"
              alt="Wise Logo"
              width={160}
              height={50}
              priority
              className="w-40 h-auto dark:hidden block"
            />
            <Image
              src="/assets/images/dark_logo.svg"
              alt="Wise Logo"
              width={160}
              height={50}
              priority
              className="w-40 h-auto dark:block hidden"
            />
          </Link>

          {/* Close button remains the same */}
          <div className="size-12 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear">
            <Link href="/">
              <span className="text-neutral-900 dark:text-primary">
                <IoClose size={28} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
