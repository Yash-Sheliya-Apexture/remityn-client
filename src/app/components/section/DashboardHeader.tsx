// import React from "react";
// import Image from "next/image";

// const DashboardHeader: React.FC = () => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra Sutariya";
//   const isOnline = true;

//   return (
//     <div className="border-b border-gray-300">
//       <div className="container mx-auto max-w-6xl">
//         <div className="flex items-center justify-between p-2 py-6">
//           <div>
//             <Image
//               src="/assets/images/wise-logo.svg"
//               width={100}
//               height={100}
//               alt="Picture of the author"
//             />
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center">
//             <img
//               src="/assets/images/app-store-logo.png"
//               alt="User Avatar"
//               className="rounded-full size-10 object-cover"
//             />
//             {isOnline && (
//               <div className="absolute top-0 left-7  size-3.5 bg-red-500 rounded-full border-2 border-white"></div>
//             )}

//             {/* User Name */}
//             <div className="ml-2 font-medium text-gray">{name}</div>

//             {/* Icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               className="w-5 h-5 text-gray-700 mr-4"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;



import React from "react";
import Image from "next/image"; // Make sure Image is imported

const DashboardHeader: React.FC = () => {
  // Hardcoded data (replace with your actual image path or URL)
  const name = "rudra Sutariya";
  const isOnline = true;
  const userAvatarSrc = "/assets/images/app-store-logo.png"; // Store src in a variable for clarity
  const logoSrc = "/assets/images/wise-logo.svg";

  return (
    <div className="border-b border-gray-300">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between p-2 py-6">
          <div>
            <Image
              src={logoSrc}
              width={100} // Keep original dimensions or adjust as needed
              height={24}  // Adjusted height for a more typical logo aspect ratio (you might need to check the actual SVG)
              alt="Wise Logo" // Changed alt text for clarity
            />
          </div>

          {/* Profile Section */}
          <div className="relative flex items-center">
            {/* Profile Picture using next/image */}
            <Image
              src={userAvatarSrc}
              alt="User Avatar"
              width={40} // Corresponds to size-10 (10 * 4px = 40px)
              height={40} // Corresponds to size-10
              className="rounded-full object-cover" // size-10 might be redundant but can be kept for explicit styling if needed
              priority // Add priority if this image is critical for LCP (e.g., above the fold)
            />

            {/* Online Status Indicator */}
            {isOnline && (
              <div className="absolute top-0 left-7 size-3.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}

            {/* User Name */}
            <div className="ml-2 font-medium text-gray-800">{name}</div>
             {/* Changed text-gray to text-gray-800 for better contrast */}

            {/* Dropdown Icon */}
            {/* Consider making this part of a button or link for accessibility */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 w-5 h-5 text-gray-500 cursor-pointer" // Added ml-1, changed color, added cursor-pointer
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" // Changed to a dropdown chevron
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;