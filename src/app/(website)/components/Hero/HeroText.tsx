// import React from "react";
// import Link from "next/link";
// import { AiOutlineClockCircle } from "react-icons/ai";
//  import { FaHandHoldingUsd } from "react-icons/fa";
// import { BsShieldLock } from "react-icons/bs";
// import { MdSpeed } from "react-icons/md";

// const HeroText = () => {
//   return (
//     <>
//       <div className="space-y-6">
//         <h1 className="text-4xl md:text-5xl xl:text-7xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//           Transfer Money
//           <span className="text-primary"> at 0% Fees </span>
//         </h1>

//         <p className="lg:text-lg sm:text-base text-sm text-gray-500  leading-relaxed dark:text-gray-300">
//           Experience hassle-free currency conversion with Worldwide Currency
//           Exchange. Enjoy competitive rates, fast service, and secure
//           transactions—perfect for travel, investments, and global business.
//         </p>

//         <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 max-w-lg">
//           {/* Tags */}
//           <div className="flex items-center gap-2.5 text-primary">
//             <AiOutlineClockCircle className="sm:size-6 size-5" />
//             <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
//               Real-Time Conversion
//             </span>
//           </div>

//           <div className="flex items-center gap-2.5 text-primary">
//             <FaHandHoldingUsd className="sm:size-6 size-5" />
//             <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
//               Competitive Rates
//             </span>
//           </div>

//           <div className="flex items-center gap-2.5 text-primary">
//             <BsShieldLock className="sm:size-6 size-5" />
//             <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
//               Secure Transactions
//             </span>
//           </div>

//           <div className="flex items-center gap-2.5 text-primary">
//             <MdSpeed className="sm:size-6 size-5" />
//             <span className="dark:text-white text-mainheading font-medium text-sm sm:text-base">
//               Fast & Easy
//             </span>
//           </div>
//         </div>

//         <div className="md:pt-4 pt-0">
//           <Link href="auth/register">
//             <button className="bg-primary hover:bg-primaryhover cursor-pointer font-medium py-2 text-sm lg:text-base px-8 md:h-12.5 rounded-full transition-colors duration-300 ease-in-out text-mainheading flex items-center justify-center">
//               Get Started Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };
// export default HeroText;



// app/(website)/components/Hero/HeroText.tsx // Or your actual path
"use client"; // Add this if not present, as we're using a hook

import React from "react";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext"; // <--- IMPORT useAuth
import {
  ArrowRight,
  Award,
  Clock,
  Globe,
  Shield,
  TrendingUp,
} from "lucide-react";

const HeroText = () => {
  const { user } = useAuth(); // <--- USE AUTH CONTEXT

  return (
    <>
      <div className="space-y-4 text-center lg:text-left">
        <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
          <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">Trusted by 50K customers worldwide</span>
        </div>

        <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
          Easy Global Money Exchange
          <span className="text-primary"> at 0% Fees </span>
        </h1>


        <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300">
          Experience global money exchange with 0% fees and instant transfers.
          Our platform offers secure, transparent transactions with real-time
          exchange rates. Send money easily across borders, without worrying
          about hidden costs. Start exchanging today and enjoy fast, reliable
          services for all your currency needs.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-w-md mx-auto lg:mx-0">
          <div className="flex items-center gap-3">
            <div className="bg-lightgray dark:bg-primarybox p-2.5 rounded-full">
              <Globe
                size={20}
                className="text-neutral-900 dark:text-primary"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-300 font-medium text-sm sm:text-base">
              Global Coverage
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-lightgray dark:bg-primarybox p-2.5 rounded-full">
              <TrendingUp
                size={20}
                className="text-neutral-900 dark:text-primary"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-300 font-medium text-sm sm:text-base">
              Great Rates
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-lightgray dark:bg-primarybox p-2.5 rounded-full">
              <Shield
                size={20}
                className="text-neutral-900 dark:text-primary"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-300 font-medium text-sm sm:text-base">
              Bank's Security
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-lightgray dark:bg-primarybox p-2.5 rounded-full">
              <Clock
                size={20}
                className="text-neutral-900 dark:text-primary"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-300 font-medium text-sm sm:text-base">
              Fast Transfers
            </span>
          </div>
        </div>

        {/* Trustpilot-like rating */}
        <div className="flex items-center lg:justify-start justify-center space-x-4 pt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Award
                key={star}
                size={20}
                className="text-primary fill-current"
              />
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-300 text-sm capitalize">
            <span className="font-semibold">4.9/5</span> from 1,000+ reviews
          </span>
        </div>


        <div className="lg:block hidden">
          <Link
            href={user ? "/dashboard" : "/auth/register"}
            className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify- w-fit"
          >
            {user ? "Go to Dashboard" : "Get Started Free"}
          </Link>
        </div>
      </div>
    </>
  );
};
export default HeroText;
