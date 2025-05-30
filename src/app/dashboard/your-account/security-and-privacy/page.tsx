// import React from "react";
// import Link from "next/link";
// import { IoIosArrowForward } from "react-icons/io";
// import { FiShield } from "react-icons/fi";
// import { GrLogout } from "react-icons/gr";
// import { ImInfo } from "react-icons/im";
// import DashboardHeader from "@/app/components/layout/DashboardHeader";

// export default function SecurityAndPrivacyPage() {
//   return (
//     <section className="security-privacy pb-10">
//       <div className="container mx-auto">
//         <DashboardHeader title=" Security and privacy"/>

//         <div className="mt-8">
//           <h4 className="text-2xl font-semibold text-mainheading dark:text-white mb-3">Security</h4>

//           <div className="space-y-2">
//             {/* password */}
//             <div>
//               <Link href="security-and-privacy/change-password">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                     <FiShield size={24} className="text-neutral-900 dark:text-white" />
//                   </div>

//                   <div className="flex-grow">
//                     <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">Password</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       ********
//                     </p>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div className="ml-4">
//                     <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* Log out */}
//             <div>
//               <Link href="security-and-privacy/account-kill">
//                 <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                     <GrLogout size={24} className="text-neutral-900 dark:text-white" />
//                   </div>

//                   {/* Text Content */}
//                   <div className="flex-grow">
//                     <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">
//                       Log out everywhere
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       If you notice any suspicious activity, log out of Wise
//                       across all devices and browsers.
//                     </p>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div className="ml-4">
//                     <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h4 className="text-2xl font-semibold text-mainheading dark:text-white mb-3">Privacy</h4>

//           <div className="space-y-2">
//             <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//               {/* Icon Container */}
//               <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//                 <ImInfo size={24} className="text-neutral-900 dark:text-white" />
//               </div>

//               {/* Text Content */}
//               <div className="flex-grow">
//                 <p className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">Privacy Policy</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                   Learn how we protect and use your personal information.
//                 </p>
//               </div>

//               {/* Right Arrow Icon */}
//               <div className="ml-4">
//                 <IoIosArrowForward size={20} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { FiShield } from "react-icons/fi";
import { ImInfo } from "react-icons/im";
import DashboardHeader from "@/app/components/layout/DashboardHeader";

export default function SecurityAndPrivacyPage() {
  return (
    <section className="Security-Privacy-Wrapper">
      <div className="Security & Privacy">
        <DashboardHeader title=" Security and privacy" />

        <div className="mt-8">
          <h4 className="lg:text-2xl text-xl font-semibold text-white/90 mb-3">
            Security
          </h4>

          <div className="space-y-2">
            {/* password */}
            <div>
              <Link href="security-and-privacy/change-password">
                {/* Wrap with Link */}
                <div className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
                  {/* Icon Container */}
                  <div className="bg-secondarybox p-3 rounded-full">
                    <FiShield
                      size={24}
                      className="text-white/90"
                    />
                  </div>

                  <div className="flex-grow">
                    <p className="font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                      Password
                    </p>
                    <p className="text-sm text-subheadingWhite mt-1">
                      ********
                    </p>
                  </div>

                  {/* Right Arrow Icon */}
                  <div className="ml-4">
                    <IoIosArrowForward
                      size={20}
                      className="text-white/90 group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="lg:text-2xl text-xl font-semibold text-white/90 mb-3">
            Privacy
          </h4>

          <div className="space-y-2">
            <div className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
              {/* Icon Container */}
              <div className="bg-secondarybox p-3 rounded-full">
                <ImInfo
                  size={24}
                  className="text-white/90"
                />
              </div>

              {/* Text Content */}
              <Link href="/privacy-policy" className="flex-grow">
                <p className="font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                  Privacy Policy
                </p>
                <p className="text-sm text-subheadingWhite mt-1">
                  Learn how we protect and use your personal information.
                </p>
              </Link>

              {/* Right Arrow Icon */}
              <div className="ml-4">
                <IoIosArrowForward
                  size={20}
                  className="text-white/90 group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
