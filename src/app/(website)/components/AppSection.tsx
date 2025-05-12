// import React from "react";
// import Image from "next/image";
// import AppStore from "../../components/AppStore";
// import appScanner from "../../../../public/assets/images/download.png";

// const AppSection: React.FC = () => {
//   return (
//     <section className="app-section py-12">
//       <div className="container mx-auto px-4">
//         <div className="p-10 bg-white shadow rounded-4xl flex flex-col  items-center justify-center space-y-6">
//           <AppStore />

//           <div className="text-center">
//             <h1 className="text-3xl md:text-6xl xl:text-8xl text-main font-black font-mont uppercase tracking-tight">
//               Get the app for managing money everywhere
//             </h1>
//           </div>

//           <div className="flex flex-col items-center space-y-8 pt-6">
//             <div className="flex justify-center items-center gap-2 rounded-xl border border-gray-100 p-4 w-fit">
//               <p className="text-main text-center w-18">
//                 Scan to get the Wise app
//               </p>
//               <Image
//                 src={appScanner}
//                 alt="app scanner"
//                 width={100}
//                 height={100}
//               />
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="cursor-pointer">
//                 <div className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:gap-3 sm:h-14">
//                   <svg viewBox="0 0 384 512" className="w-5 sm:w-7">
//                     <path
//                       d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
//                       fill="currentColor"
//                     ></path>
//                   </svg>
//                   <div>
//                     <div className="text-[.5rem] sm:text-xs text-left">
//                       Download on the
//                     </div>
//                     <div className="text-lg font-semibold font-sans -mt-1 sm:text-2xl">
//                       App Store
//                     </div>
//                   </div>
//                 </div>
//               </button>
//               <button className="cursor-pointer">
//                 <div className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:h-14">
//                   <svg viewBox="30 336.7 120.9 129.2" className="w-5 sm:w-7">
//                     <path
//                       d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
//                       fill="#FFD400"
//                     ></path>
//                     <path
//                       d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
//                       fill="#FF3333"
//                     ></path>
//                     <path
//                       d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
//                       fill="#48FF48"
//                     ></path>
//                     <path
//                       d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
//                       fill="#3BCCFF"
//                     ></path>
//                   </svg>
//                   <div>
//                     <div className="text-[.5rem] sm:text-xs text-left">
//                       GET IT ON
//                     </div>
//                     <div className="text-sm font-semibold font-sans -mt-1 sm:text-xl">
//                       Google Play
//                     </div>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppSection;

// components/AppSection.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link"; //  Import Link
// import AppStore from "../../components/AppStore";
// import appScanner from "../../../../public/assets/images/download.png";
// import appStore from "../../../../public/assets/icons/apple.svg";
// import playStore from "../../../../public/assets/icons/playstore.svg";

// interface Props {
//   videoSrc: string; // Path to your MP4 video
//   posterSrc?: string; // Optional: Path to a poster image (fallback)
// }

// const AppSection: React.FC<Props> = ({ videoSrc, posterSrc }) => {
//   return (
//     <section className="app-section relative py-12">
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto min-w-full min-h-full object-cover" // Responsive, centering, and covering
//           poster={posterSrc}
//         >
//           <source src={videoSrc} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//       <div className="container mx-auto px-4 relative z-10">
//         {/*  Added relative z-index */}
//         <div className="md:p-12 p-6 bg-white/85 shadow rounded-4xl flex flex-col items-center justify-center space-y-6 backdrop-blur-sm">
//           <AppStore />
//           <div className="text-center">
//             <h1 className="text-3xl md:text-6xl xl:text-8xl text-main font-black font-mont uppercase tracking-tight">
//               Get the app for managing money everywhere
//             </h1>
//           </div>

//           {/* App Button */}
//           <button className="flex items-center gap-4 bg-main px-4 py-2 rounded-full cursor-pointer">
//             <Image src={appStore} alt="AppStore" width={32} height={32} />
//             <Image src={playStore} alt="PlayStore" width={32} height={32} />
//             <p className="font-medium text-white text-lg">Download Wise</p>
//           </button>

//           {/* App popup */}
//           <div className="bg-white p-8 rounded-3xl">
//             <div className=" flex justify-center items-center flex-col gap-6">
//               <span className="text-main text-4xl font-bold">
//                 Get the Wise app
//               </span>
//               <span className="text-main text-xl">
//                 Scan this QR code to download the app
//               </span>
//               <Image
//                 src={appScanner}
//                 alt="app scanner"
//                 width={150}
//                 height={150}
//               />
//               <div className="flex items-center gap-4">
//                 {/*  Wrap buttons in Link components */}
//                 <Link
//                   href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                   target="_blank"
//                   passHref
//                 >
//                   <button className="cursor-pointer">
//                     <div className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:gap-3 sm:h-14">
//                       <svg viewBox="0 0 384 512" className="w-5 sm:w-7">
//                         <path
//                           d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
//                           fill="currentColor"
//                         ></path>
//                       </svg>
//                       <div>
//                         <div className="text-[.5rem] sm:text-xs text-left">
//                           Download on the
//                         </div>
//                         <div className="text-lg font-semibold font-sans -mt-1 sm:text-2xl">
//                           App Store
//                         </div>
//                       </div>
//                     </div>
//                   </button>
//                 </Link>

//                 <Link
//                   href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                   target="_blank"
//                   passHref
//                 >
//                   <button className="cursor-pointer">
//                     <div className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:h-14">
//                       <svg
//                         viewBox="30 336.7 120.9 129.2"
//                         className="w-5 sm:w-7"
//                       >
//                         <path
//                           d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
//                           fill="#FFD400"
//                         ></path>
//                         <path
//                           d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
//                           fill="#FF3333"
//                         ></path>
//                         <path
//                           d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
//                           fill="#48FF48"
//                         ></path>
//                         <path
//                           d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
//                           fill="#3BCCFF"
//                         ></path>
//                       </svg>
//                       <div>
//                         <div className="text-[.5rem] sm:text-xs text-left">
//                           GET IT ON
//                         </div>
//                         <div className="text-sm font-semibold font-sans -mt-1 sm:text-xl">
//                           Google Play
//                         </div>
//                       </div>
//                     </div>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppSection;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppStore from "../../components/ui/AppStore";
// import playStore from "../../../../public/assets/icons/playstore.svg";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

interface Props {
  videoSrc: string;
  posterSrc?: string;
}

const AppSection: React.FC<Props> = ({ videoSrc, posterSrc }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Framer Motion Variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 }, // Start slightly scaled down and below
    visible: {
      opacity: 1,
      scale: 1,
      y: 0, // Move to original position
      transition: {
        type: "spring", // Use spring animation
        stiffness: 260, // Adjust for bounciness
        damping: 20, // Adjust for oscillation
      },
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }, // Fade out, scale down, and move down on exit
  };

  return (
    <section className="app-section relative py-12">
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto min-w-full min-h-full object-cover"
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag
        </video>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="md:p-12 p-6 bg-transparent rounded-4xl flex flex-col items-center justify-center space-y-6 backdrop-blur-xs">
          <AppStore />
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl xl:text-8xl text-mainheading  dark:text-white font-black font-mont uppercase tracking-tight">
              Get the app for managing money everywhere
            </h1>
          </div>

          {/* App Button */}
          <button
            className="flex items-center gap-4 bg-mainheading  dark:bg-transparent dark:border-4  px-4 py-2 rounded-full cursor-pointer"
            onClick={togglePopup} // Toggle the popup on click
          >
            <Image
              src="/assets/icon/apple.svg"
              alt="AppStore"
              width={32}
              height={32}
            />
            
            <Image
              src="/assets/icon/play-store-logo.png"
              alt="PlayStore"
              width={32}
              height={32}
            />
            <p className="font-medium text-white text-lg">Download Wise</p>
          </button>

          {/* App popup */}
          <AnimatePresence>
            {" "}
            {/* Wrap with AnimatePresence for exit animations */}
            {isPopupOpen && (
              <motion.div
                className="bg-white dark:bg-background md:p-8 p-6 rounded-3xl"
                variants={popupVariants}
                initial="hidden" // Initial state
                animate="visible" // Animation to perform
                exit="exit" // Animation when unmounting
                key="popup" // Key is important for AnimatePresence
              >
                <div className=" flex justify-center items-center flex-col gap-6">
                  <span className="text-main dark:text-white md:text-4xl text-2xl font-bold">
                    Get the Wise app
                  </span>
                  <span className="text-main dark:text-white text-center text-xl">
                    Scan this QR code to download the app
                  </span>
                  <Image
                    src="/assets/images/download.png"
                    alt="app scanner"
                    width={150}
                    height={150}
                  />
                  <div className="flex md:flex-row flex-col items-center gap-4">
                    <Link
                      href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
                      target="_blank"
                      passHref
                    >
                      <button className="cursor-pointer">
                        <div className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:gap-3 sm:h-14">
                          <svg viewBox="0 0 384 512" className="w-5 sm:w-7">
                            <path
                              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <div>
                            <div className="text-[.5rem] sm:text-xs text-left">
                              Download on the
                            </div>
                            <div className="text-lg font-semibold font-sans -mt-1 sm:text-2xl">
                              App Store
                            </div>
                          </div>
                        </div>
                      </button>
                    </Link>

                    <Link
                      href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
                      target="_blank"
                      passHref
                    >
                      <button className="cursor-pointer">
                        <div className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:h-14">
                          <svg
                            viewBox="30 336.7 120.9 129.2"
                            className="w-5 sm:w-7"
                          >
                            <path
                              d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                              fill="#FFD400"
                            ></path>
                            <path
                              d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                              fill="#FF3333"
                            ></path>
                            <path
                              d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                              fill="#48FF48"
                            ></path>
                            <path
                              d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                              fill="#3BCCFF"
                            ></path>
                          </svg>
                          <div>
                            <div className="text-[.5rem] sm:text-xs text-left">
                              GET IT ON
                            </div>
                            <div className="text-sm font-semibold font-sans -mt-1 sm:text-xl">
                              Google Play
                            </div>
                          </div>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
