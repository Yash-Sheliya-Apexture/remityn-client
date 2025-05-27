// import React from "react";

// const FeaturesTab = () => {
//   return (
//     <section className="FeaturesTab lg:py-20 py-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <h1 className="text-7xl font-medium capitalize text-primary">weloocme to new section</h1>
//       </div>
//     </section>
//   );
// };

// export default FeaturesTab;

// // // src/components/FeaturesTab.tsx
// "use client";

// import React, { useState } from "react";

// // Define the structure for a single content item within a tab
// interface ContentItem {
//   id: string;
//   title: string;
//   description: string;
//   digits: number;
// }

// // Define the structure for a tab
// interface Tab {
//   id: string;
//   label: string; // Text for the tab button
//   contentItems: ContentItem[]; // Array of content blocks for this tab
// }

// // Sample Data (You would replace this with your actual data)
// const tabsData: Tab[] = [
//   {
//     id: "online-banking",
//     label: "Online Banking",
//     contentItems: [
//       {
//         id: "access-24-7",
//         title: "24/7 Account Access",
//         digits: "01",
//         description:
//           "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
//       },
//       {
//         id: "mobile-app",
//         title: "Mobile Banking App",
//         digits: "02",
//         description:
//           "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
//       },
//       {
//         id: "secure-transactions",
//         digits : "03",
//         title: "Secure Transactions",
//         description:
//           "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
//       },
//       {
//         id: "bill-pay",
//         digits : "04",
//         title: "Bill Pay and Transfers",
//         description:
//           "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
//       },
//     ],
//   },
//   {
//     id: "financial-tools",
//     label: "Financial Tools",
//     contentItems: [
//       {
//         id: "budget-planner",
//         title: "Budget Planner",
//         digits : "01",
//         description:
//           "Take control of your spending with our intuitive budget planner. Track income, categorize expenses, and set financial goals to manage your money effectively.",
//       },
//       {
//         id: "loan-calculators",
//         title: "Loan Calculators",
//         digits : "02",
//         description:
//           "Estimate payments for mortgages, auto loans, or personal loans with our easy-to-use calculators. Plan your borrowing and understand your financial commitments.",
//       },
//       {
//         id: "investment-insights",
//         title: "Investment Insights",
//         digits : "03",
//         description:
//           "Access market data, research tools, and expert insights to make informed investment decisions and grow your wealth portfolio.",
//       },
//     ],
//   },
//   {
//     id: "customer-support",
//     label: "Customer Support",
//     contentItems: [
//       {
//         id: "faq",
//         title: "FAQ & Help Center",
//         digits : "01",
//         description:
//           "Find answers to common questions in our comprehensive FAQ section or browse helpful articles and tutorials in our online help center.",
//       },
//       {
//         id: "live-chat",
//         title: "Live Chat Support",
//         digits : "02",
//         description:
//           "Get instant assistance from our support team via live chat during business hours. We are here to help with any queries you may have.",
//       },
//       {
//         id: "contact-us",
//         title: "Contact Us",
//         digits : "03",
//         description:
//           "Reach out to us via phone, email, or visit a branch. Our dedicated customer service representatives are ready to assist you.",
//       },
//     ],
//   },
// ];

// const FeaturesTab: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

//   const activeTabData = tabsData.find((tab) => tab.id === activeTab);

//   // Background color from image (dark reddish-brown)
//   const mainBgColor = "bg-[#251212]"; // Darkest background
//   const tabListBgColor = "bg-[#3a2121]/30"; // Slightly lighter for tab list container, semi-transparent
//   const contentCardBgColor = "bg-[#3a2121]/70"; // Background for content cards, semi-transparent

//   // Text colors from image
//   const inactiveTabTextColor = "text-gray-400";
//   const activeTabTextColor = "text-yellow-400"; // Bright yellow for active tab
//   const hoverTabTextColor = "hover:text-yellow-300";
//   const headingTextColor = "text-white";
//   const descriptionTextColor = "text-gray-300";
//   const iconColor = "text-yellow-400";

//   return (
//     <section
//       className={`FeaturesTab lg:py-20 py-10 overflow-hidden ${mainBgColor}`}
//     >
//       <div className="container mx-auto px-4">
//         {/* You can add a section title here if needed, like your "weloocme to new section" */}
//         {/* <h1 className="text-4xl lg:text-5xl font-medium capitalize text-yellow-400 mb-12 text-center">
//           Our Banking Features
//         </h1> */}

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
//           {/* Left Side: Tabs Navigation (25%) */}
//           <div
//             className={`w-full lg:w-1/4 flex-none ${tabListBgColor} lg:bg-transparent p-3 lg:p-0 rounded-lg lg:rounded-none`}
//           >
//             <ul className="space-y-1">
//               {tabsData.map((tab) => (
//                 <li key={tab.id}>
//                   <button
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`
//                       w-full text-left px-4 py-3 rounded-md transition-all duration-200 ease-in-out
//                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
//                       focus-visible:ring-yellow-500 focus-visible:ring-offset-[#251212]
//                       ${
//                         activeTab === tab.id
//                           ? `${activeTabTextColor} font-semibold bg-[#4a3131]/50 lg:bg-transparent lg:border-l-2 lg:border-yellow-400 lg:pl-6`
//                           : `${inactiveTabTextColor} ${hoverTabTextColor} hover:bg-[#4a3131]/30 lg:hover:bg-transparent lg:border-l-2 lg:border-transparent lg:hover:border-gray-600 lg:pl-6`
//                       }
//                     `}
//                   >
//                     {tab.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right Side: Tab Content (75%) */}
//           <div className="w-full lg:w-3/4 flex-grow">
//             {activeTabData && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {activeTabData.contentItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className={`group ${contentCardBgColor} p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-yellow-500/20 relative`}
//                   >
//                     <div>
//                       <span>{item.digits}</span>
//                     </div>
//                     <h3
//                       className={`text-xl font-semibold mb-3 ${headingTextColor}`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p
//                       className={`text-sm leading-relaxed ${descriptionTextColor}`}
//                     >
//                       {item.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesTab;

// "use client";

// // src/components/FeaturesTab.tsx
// import React, { useState } from "react";
// import { IoMdAdd } from "react-icons/io";

// // Define the structure for a single content item within a tab
// interface ContentItem {
//   id: string;
//   title: string;
//   description: string;
// }

// // Define the structure for a tab
// interface Tab {
//   id: string;
//   label: string; // Text for the tab button
//   contentItems: ContentItem[]; // Array of content blocks for this tab
// }

// // Sample Data (You would replace this with your actual data)
// const tabsData: Tab[] = [
//   {
//     id: "online-banking",
//     label: "Add-Money",
//     contentItems: [
//       {
//         id: "access-24-7",
//         title: "Add Money",
//         icon : <IoMdAdd />,
//         description:
//           "Once you’re logged in, go to your dashboard and locate the “Add Money” button. This is typically found on the main screen under your account balance. Tap it to begin the process.",
//       },
//       {
//         id: "mobile-app",
//         title: "Enter the Amount You Want to Add",
//         icon : <IoMdAdd />,
//         description:
//           "You’ll be prompted to enter the amount of money you want to add to your account.Use the number pad to type in the exact amount.Make sure the amount meets any minimum balance requirements.",
//       },
//       {
//         id: "secure-transactions",
//         title: "Select the Payment Method",
//         icon : <IoMdAdd />,
//         description:
//           "Next, choose how you’d like to fund your account. Common options include: All payment options are encrypted and secure.",
//       },
//       {
//         id: "bill-pay",
//         title: "Confirm and Complete the Transaction",
//         icon : <IoMdAdd />,
//         description:
//           "After choosing your payment method, you’ll be redirected to the respective secure payment gateway.Complete the transaction using your UPI PIN or card credentials.",
//       },
//       {
//         id: "bill-pay",
//         title: "Check Your Updated Balance",
//         icon : <IoMdAdd />,
//         description:
//           "Once the transaction is complete, you’ll be redirected back to the app.Your wallet/account balance will be updated in real-time. A confirmation message or receipt will also be shown.You can view the transaction history for details.",
//       },
//     ],
//   },
//   {
//     id: "financial-tools",
//     label: "Add-Recipients",
//     contentItems: [
//       {
//         id: "budget-planner",
//         title: "Budget Planner",
//         description:
//           "Take control of your spending with our intuitive budget planner. Track income, categorize expenses, and set financial goals to manage your money effectively.",
//       },
//       {
//         id: "loan-calculators",
//         title: "Loan Calculators",
//         description:
//           "Estimate payments for mortgages, auto loans, or personal loans with our easy-to-use calculators. Plan your borrowing and understand your financial commitments.",
//       },
//       {
//         id: "investment-insights",
//         title: "Investment Insights",
//         description:
//           "Access market data, research tools, and expert insights to make informed investment decisions and grow your wealth portfolio.",
//       },
//     ],
//   },
//   {
//     id: "customer-support",
//     label: "Send-Money",
//     contentItems: [
//       {
//         id: "faq",
//         title: "FAQ & Help Center",
//         description:
//           "Find answers to common questions in our comprehensive FAQ section or browse helpful articles and tutorials in our online help center.",
//       },
//       {
//         id: "live-chat",
//         title: "Live Chat Support",
//         description:
//           "Get instant assistance from our support team via live chat during business hours. We are here to help with any queries you may have.",
//       },
//       {
//         id: "contact-us",
//         title: "Contact Us",
//         description:
//           "Reach out to us via phone, email, or visit a branch. Our dedicated customer service representatives are ready to assist you.",
//       },
//     ],
//   },
// ];

// const FeaturesTab: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

//   const activeTabData = tabsData.find((tab) => tab.id === activeTab);

//   return (
//     <section className="FeaturesTab lg:py-20 py-10 overflow-hidden ">
//       <div className="container mx-auto px-4">

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
//           {/* Left Side: Tabs Navigation (25%) */}
//           <div className="w-full lg:w-1/4 flex-none p-3 lg:p-0 rounded-lg lg:rounded-none">
//             <ul className="space-y-5">
//               {tabsData.map((tab) => (
//                 <li key={tab.id}>
//                   <button
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`
//                       w-fit text-left px-4 py-3 rounded-md transition-all duration-200 ease-in-out
//                       focus:outline-none inline-block
//                       ${
//                         activeTab === tab.id
//                           ? "text-primary font-semibold bg-[#4a3131]/50 lg:bg-transparent  border lg:pl-6"
//                           : "text-gray-400 hover:text-yellow-300 hover:bg-[#4a3131]/30 lg:hover:bg-transparent lg:border-l-2 lg:border-transparent lg:hover:border-gray-600 lg:pl-6"
//                       }
//                     `}
//                   >
//                     {tab.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right Side: Tab Content (75%) */}
//           <div className="w-full lg:w-3/4 flex-grow">
//             {activeTabData && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {activeTabData.contentItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="group p-6 rounded-lg transition-all duration-300 hover:shadow-yellow-500/20 relative"
//                   >
//                     <div>
//                         {item.icon}
//                     </div>
//                     <h3 className="text-xl font-semibold mb-3 text-white">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm leading-relaxed text-gray-300">
//                       {item.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesTab;

// "use client";

// // src/components/FeaturesTab.tsx
// import React, { useState } from "react";
// import { IoMdAdd } from "react-icons/io";

// // Define the structure for a single content item within a tab
// interface ContentItem {
//   id: string;
//   title: string;
//   description: string;
//   icon?: React.ReactNode; // <-- Add this line: make icon an optional property
// }

// // Define the structure for a tab
// interface Tab {
//   id: string;
//   label: string; // Text for the tab button
//   contentItems: ContentItem[]; // Array of content blocks for this tab
// }

// // Sample Data (You would replace this with your actual data)
// const tabsData: Tab[] = [
//   {
//     id: "online-banking",
//     label: "Add-Money",
//     contentItems: [
//       {
//         id: "access-24-7",
//         title: "Add Money",
//         icon: <IoMdAdd className="lg:size-10 size-8" />, // Now valid
//         description:
//           "Once you’re logged in, go to your dashboard and locate the “Add Money” button. This is typically found on the main screen under your account balance. Tap it to begin the process.",
//       },
//       {
//         id: "mobile-app",
//         title: "Enter the Amount You Want to Add",
//         icon: <IoMdAdd className="lg:size-10 size-8" />, // Now valid
//         description:
//           "You’ll be prompted to enter the amount of money you want to add to your account.Use the number pad to type in the exact amount.Make sure the amount meets any minimum balance requirements.",
//       },
//       {
//         id: "secure-transactions",
//         title: "Select the Payment Method",
//         icon: <IoMdAdd className="lg:size-10 size-8" />, // Now valid
//         description:
//           "Next, choose how you’d like to fund your account. Common options include: All payment options are encrypted and secure.",
//       },
//       {
//         id: "bill-pay",
//         title: "Confirm and Complete the Transaction",
//         icon: <IoMdAdd className="lg:size-10 size-8" />, // Now valid
//         description:
//           "After choosing your payment method, you’ll be redirected to the respective secure payment gateway.Complete the transaction using your UPI PIN or card credentials.",
//       },
//       {
//         id: "bill-pay-check", // Changed id to be unique as per best practice, though not directly causing the error
//         title: "Check Your Updated Balance",
//         icon: <IoMdAdd className="lg:size-10 size-8" />, // Now valid
//         description:
//           "Once the transaction is complete, you’ll be redirected back to the app.Your wallet/account balance will be updated in real-time. A confirmation message or receipt will also be shown.You can view the transaction history for details.",
//       },
//     ],
//   },
//   {
//     id: "financial-tools",
//     label: "Add-Recipients",
//     contentItems: [
//       {
//         id: "loan-calculators",
//         title: "Add Recipient",
//         description:
//           "This begins the process to add a new recipient by opening the currency selection screen.",
//       },
//       {
//         id: "investment-insights",
//         title: "Select the Currency",
//         description:
//           'You’ll be presented with a list of available currencies. Only supported currencies will be active. Others (like USD, EUR, GBP) may show as "Coming soon".',
//       },
//       {
//         id: "investment-insights",
//         title: "Fill in Account Details",
//         description:
//           "Ensure the details are correct and complete. Mandatory fields are marked with an asterisk (*) ",
//       },
//       {
//         id: "investment-insights",
//         title: "Submit the Information",
//         description:
//           "Once submitted, the recipient will be saved in your list and will be ready for transactions.",
//       },
//       {
//         id: "investment-insights",
//         title: "View Recipient Details",
//         description:
//           "Account holder's name, type, number, bank name, email, IFSC, and nickname. You can Send money to or Delete the recipient from this view.",
//       },
//     ],
//   },
//   {
//     id: "customer-support",
//     label: "Send-Money",
//     contentItems: [
//       {
//         id: "faq",
//         title: "FAQ & Help Center",
//         description:
//           "Find answers to common questions in our comprehensive FAQ section or browse helpful articles and tutorials in our online help center.",
//       },
//       {
//         id: "live-chat",
//         title: "Live Chat Support",
//         description:
//           "Get instant assistance from our support team via live chat during business hours. We are here to help with any queries you may have.",
//       },
//       {
//         id: "contact-us",
//         title: "Contact Us",
//         description:
//           "Reach out to us via phone, email, or visit a branch. Our dedicated customer service representatives are ready to assist you.",
//       },
//     ],
//   },
// ];

// const FeaturesTab: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

//   const activeTabData = tabsData.find((tab) => tab.id === activeTab);

//   return (
//     <section className="FeaturesTab lg:py-20 py-10 overflow-hidden ">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
//           {/* Left Side: Tabs Navigation (25%) */}
//           <div className="w-full lg:w-1/4 flex-none p-3 lg:p-0 rounded-lg lg:rounded-none">
//             <ul className="space-y-5">
//               {tabsData.map((tab) => (
//                 <li key={tab.id}>
//                   <button
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`
//                       w-fit text-left px-4 py-3 rounded-md transition-all duration-200 ease-in-out
//                       focus:outline-none inline-block
//                       ${
//                         activeTab === tab.id
//                           ? "text-primary font-semibold bg-[#4a3131]/50 lg:bg-transparent  border lg:pl-6"
//                           : "text-gray-400 hover:text-yellow-300 hover:bg-[#4a3131]/30 lg:hover:bg-transparent lg:border-l-2 lg:border-transparent lg:hover:border-gray-600 lg:pl-6"
//                       }
//                     `}
//                   >
//                     {tab.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right Side: Tab Content (75%) */}
//           <div className="w-full lg:w-3/4 flex-grow">
//             {activeTabData && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {activeTabData.contentItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="group p-6 rounded-lg transition-all duration-300 hover:shadow-yellow-500/20 relative"
//                   >
//                     {item.icon && ( // Conditionally render the div if icon exists
//                       <div className="mb-4 text-primary">
//                         {" "}
//                         {/* Added some styling for visibility */}
//                         {item.icon}
//                       </div>
//                     )}
//                     <h3 className="text-xl font-semibold mb-3 text-white">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm leading-relaxed text-gray-300">
//                       {item.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesTab;

// src/components/FeaturesTab.tsx
"use client";

import React, { useState } from "react";

// Define the structure for a single content item within a tab
interface ContentItem {
  id: string;
  title: string;
  description: string;
  digits: string; // Changed from number to string to match data
}

// Define the structure for a tab
interface Tab {
  id: string;
  label: string; // Text for the tab button
  contentItems: ContentItem[]; // Array of content blocks for this tab
}

// Sample Data (You would replace this with your actual data)
const tabsData: Tab[] = [
  {
    id: "online-banking",
    label: "Online Banking",
    contentItems: [
      {
        id: "access-24-7",
        title: "24/7 Account Access",
        digits: "01",
        description:
          "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
      },
      {
        id: "mobile-app",
        title: "Mobile Banking App",
        digits: "02",
        description:
          "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
      },
      {
        id: "secure-transactions",
        digits: "03",
        title: "Secure Transactions",
        description:
          "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
      },
      {
        id: "bill-pay",
        digits: "04",
        title: "Bill Pay and Transfers",
        description:
          "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
      },
    ],
  },
  {
    id: "financial-tools",
    label: "Financial Tools",
    contentItems: [
      {
        id: "budget-planner",
        title: "Budget Planner",
        digits: "01",
        description:
          "Take control of your spending with our intuitive budget planner. Track income, categorize expenses, and set financial goals to manage your money effectively.",
      },
      {
        id: "loan-calculators",
        title: "Loan Calculators",
        digits: "02",
        description:
          "Estimate payments for mortgages, auto loans, or personal loans with our easy-to-use calculators. Plan your borrowing and understand your financial commitments.",
      },
      {
        id: "investment-insights",
        title: "Investment Insights",
        digits: "03",
        description:
          "Access market data, research tools, and expert insights to make informed investment decisions and grow your wealth portfolio.",
      },
    ],
  },
  {
    id: "customer-support",
    label: "Customer Support",
    contentItems: [
      {
        id: "faq",
        title: "FAQ & Help Center",
        digits: "01",
        description:
          "Find answers to common questions in our comprehensive FAQ section or browse helpful articles and tutorials in our online help center.",
      },
      {
        id: "live-chat",
        title: "Live Chat Support",
        digits: "02",
        description:
          "Get instant assistance from our support team via live chat during business hours. We are here to help with any queries you may have.",
      },
      {
        id: "contact-us",
        title: "Contact Us",
        digits: "03",
        description:
          "Reach out to us via phone, email, or visit a branch. Our dedicated customer service representatives are ready to assist you.",
      },
    ],
  },
];

const FeaturesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

  const activeTabData = tabsData.find((tab) => tab.id === activeTab);

  // Color variables have been removed and their values inlined below.

  return (
    <section
      className="FeaturesTab lg:py-20 py-10 overflow-hidden bg-[#251212]" // Inlined: mainBgColor
    >
      <div className="container mx-auto px-4">
        {/* <h1 className="text-4xl lg:text-5xl font-medium capitalize text-yellow-400 mb-12 text-center">
          Our Banking Features
        </h1> */}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Side: Tabs Navigation (25%) */}
          <div
            className="w-full lg:w-1/4 flex-none  p-3 lg:p-0 rounded-lg lg:rounded-none" // Inlined: tabListBgColor
          >
            <ul className="space-y-1">
              {tabsData.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full text-left px-4 py-3 rounded-md transition-all duration-200 ease-in-out
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                      focus-visible:ring-yellow-500 focus-visible:ring-offset-[#251212]
                      ${
                        activeTab === tab.id
                          ? "text-yellow-400 font-semibold bg-[#4a3131]/50 lg:bg-transparent lg:border-l-2 lg:border-yellow-400 lg:pl-6" // Inlined: activeTabTextColor
                          : "text-gray-400 hover:text-yellow-300 hover:bg-[#4a3131]/30 lg:hover:bg-transparent lg:border-l-2 lg:border-transparent lg:hover:border-gray-600 lg:pl-6" // Inlined: inactiveTabTextColor, hoverTabTextColor
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Tab Content (75%) */}
          <div className="w-full lg:w-3/4 flex-grow">
            {activeTabData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeTabData.contentItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#3a2121]/70 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-yellow-500/20 relative" // Inlined: contentCardBgColor
                  >
                    <div className="mb-2">
                      {" "}
                      {/* Added for spacing for the digits */}
                      <span className="text-yellow-400 text-2xl font-semibold">
                        {" "}
                        {/* Styled digits using iconColor's value and added size/weight */}
                        {item.digits}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3 text-white" // Inlined: headingTextColor
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-gray-300" // Inlined: descriptionTextColor
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTab;
