// // Assuming you're using React or a similar framework.
// // If not, you can adapt the JSX to HTML.

// import React from "react";

// // Define an interface for the currency rate data
// interface CurrencyRate {
//   id: string;
//   fromCurrency: string;
//   fromSymbol: string;
//   fromFlag: string; // Emoji or URL to an SVG/image
//   toCurrency: string;
//   toSymbol: string;
//   toFlag: string; // Emoji or URL to an SVG/image
//   buyRate: number;
//   sellRate: number;
//   dailyChange: number; // Percentage
// }

// // Sample data - in a real app, this would come from an API
// const liveRatesData: CurrencyRate[] = [
//   {
//     id: "usd-eur",
//     fromCurrency: "USD",
//     fromSymbol: "$",
//     fromFlag: "🇺🇸",
//     toCurrency: "EUR",
//     toSymbol: "€",
//     toFlag: "🇪🇺",
//     buyRate: 0.9215,
//     sellRate: 0.9225,
//     dailyChange: 0.12,
//   },
//   {
//     id: "gbp-usd",
//     fromCurrency: "GBP",
//     fromSymbol: "£",
//     fromFlag: "🇬🇧",
//     toCurrency: "USD",
//     toSymbol: "$",
//     toFlag: "🇺🇸",
//     buyRate: 1.2705,
//     sellRate: 1.2715,
//     dailyChange: -0.05,
//   },
//   {
//     id: "usd-jpy",
//     fromCurrency: "USD",
//     fromSymbol: "$",
//     fromFlag: "🇺🇸",
//     toCurrency: "JPY",
//     toSymbol: "¥",
//     toFlag: "🇯🇵",
//     buyRate: 157.2,
//     sellRate: 157.3,
//     dailyChange: 0.25,
//   },
//   {
//     id: "eur-gbp",
//     fromCurrency: "EUR",
//     fromSymbol: "€",
//     fromFlag: "🇪🇺",
//     toCurrency: "GBP",
//     toSymbol: "£",
//     toFlag: "🇬🇧",
//     buyRate: 0.852,
//     sellRate: 0.853,
//     dailyChange: 0.08,
//   },
//   {
//     id: "usd-cad",
//     fromCurrency: "USD",
//     fromSymbol: "$",
//     fromFlag: "🇺🇸",
//     toCurrency: "CAD",
//     toSymbol: "$",
//     toFlag: "🇨🇦",
//     buyRate: 1.365,
//     sellRate: 1.366,
//     dailyChange: -0.11,
//   },
//   {
//     id: "aud-usd",
//     fromCurrency: "AUD",
//     fromSymbol: "$",
//     fromFlag: "🇦🇺",
//     toCurrency: "USD",
//     toSymbol: "$",
//     toFlag: "🇺🇸",
//     buyRate: 0.6655,
//     sellRate: 0.6665,
//     dailyChange: 0.15,
//   },
// ];

// const LiveExchangeRatesSection: React.FC = () => {
//   return (
//     <section className="bg-gray-900 py-16 sm:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="text-base font-semibold text-lime-400 tracking-wide uppercase">
//             Stay Updated
//           </h2>
//           <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//             Live Currency <span className="text-lime-400">Exchange Rates</span>
//           </p>
//           <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
//             Explore real-time exchange rates for popular currency pairs. Make
//             informed decisions for your international money transfers.
//           </p>
//         </div>

//         <div className="mt-12 overflow-x-auto">
//           <div className="inline-block min-w-full py-2 align-middle">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-gray-800">
//               {/* Using divs for table structure for easier Tailwind styling, but <table> is semantically correct */}
//               {/* Header */}
//               <div className="min-w-full">
//                 <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700">
//                   <div className="col-span-2 sm:col-span-1">Currency Pair</div>
//                   <div className="text-right">Buy Rate</div>
//                   <div className="text-right">Sell Rate</div>
//                   <div className="text-right hidden sm:block">24h Change</div>
//                   <div className="text-right sm:hidden">Change</div>{" "}
//                   {/* Mobile: shorter header */}
//                 </div>

//                 {/* Body */}
//                 <div className="divide-y divide-gray-700">
//                   {liveRatesData.map((rate) => (
//                     <div
//                       key={rate.id}
//                       className="grid grid-cols-4 sm:grid-cols-5 gap-4 px-6 py-4 text-sm text-gray-200 hover:bg-gray-700/50 transition-colors duration-150"
//                     >
//                       <div className="col-span-2 sm:col-span-1 font-medium flex items-center space-x-2">
//                         <span className="text-xl">{rate.fromFlag}</span>
//                         <span>{rate.fromCurrency}</span>
//                         <span className="text-gray-500">/</span>
//                         <span className="text-xl">{rate.toFlag}</span>
//                         <span>{rate.toCurrency}</span>
//                       </div>
//                       <div className="text-right">
//                         {rate.buyRate.toFixed(4)}
//                       </div>
//                       <div className="text-right">
//                         {rate.sellRate.toFixed(4)}
//                       </div>
//                       <div
//                         className={`text-right font-medium ${
//                           rate.dailyChange >= 0
//                             ? "text-green-400"
//                             : "text-red-400"
//                         }`}
//                       >
//                         {rate.dailyChange >= 0 ? "+" : ""}
//                         {rate.dailyChange.toFixed(2)}%
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 text-center">
//           <a
//             href="#" // Link to your actual exchange page
//             className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-lime-500 hover:bg-lime-600 transition-colors duration-150"
//           >
//             Start Exchanging Now
//           </a>
//           <p className="mt-4 text-sm text-gray-500">
//             Rates are indicative and subject to change. Fees may apply.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LiveExchangeRatesSection;

// Assuming you're using React or a similar framework.

import React from "react";
import { FaClock } from "react-icons/fa";
import { MdSyncAlt } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { JSX } from "react/jsx-runtime";

// Define an interface for the advantage item data
interface AdvantageItem {
  id: string;
  icon: JSX.Element; // Using JSX for embedded SVG icons
  title: string;
  description: string;
}

// Sample data - customize with your core advantages
const advantagesData: AdvantageItem[] = [
  {
    id: "advantage-pricing",
    icon: <MdSyncAlt className="size-6 text-primary" />,
    title: "Real-Time Exchange Rates",
    description:
      "Get the most accurate and up-to-date exchange rates sourced from global financial markets.",
  },

  {
    id: "advantage-speed",
    // Abstract speed/flow icon
    icon: <FaClock className="size-6 text-primary" />,
    title: "Multi-Currency Support",
    description:
      "Exchange between dozens of global currencies including USD, EUR,GBP, JPY, INR, and more.",
  },

  {
    id: "advantage-pricing",
    icon: <RiCustomerService2Fill className="size-6 text-primary" />,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock support to help you with your currency-related queries and transactions",
  },
];

const RemitynAdvantageSection: React.FC = () => {
  return (
    <section className="bg-background py-5 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
            <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
              Core Benefits
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
            Fast, Reliable & Global
            <span className="text-primary"> Currency Exchange Services </span>
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-400">
            We deliver a seamless currency exchange experience powered by
            real-time rates, multi-currency support, instant processing, and
            24/7 customer care. Whether you're sending money abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {advantagesData.map((advantage) => (
            <div
              key={advantage.id}
              className="bg-primarybox p-6 rounded-xl space-y-3 transition-all duration-300 ease-in-out transform flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className={`p-3 rounded-full bg-primarybox inline-block`}>
                {advantage.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {advantage.title}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemitynAdvantageSection;
