// // MoneyTransferSteps.tsx
// import React from "react";

// interface StepProps {
//   number: string;
//   title: string;
//   description: string;
// }

// const Step: React.FC<StepProps> = ({ number, title, description }) => {
//   return (
//     <div className="bg-white dark:bg-background dark:border p-8 rounded-2xl">
//       <div className="text-primary size-14 bg-primary rounded-full flex items-center justify-center">
//         <span className="text-mainheading font-bold text-2xl">{number}</span>
//       </div>

//       <h3 className="text-xl font-semibold text-main dark:text-white mt-5">
//         {title}
//       </h3>

//       <p className="text-mainheading dark:text-gray-300 leading-relaxed mt-5">
//         {description}
//       </p>
//     </div>
//   );
// };

// const MoneyTransferSteps: React.FC = () => {
//   const steps: StepProps[] = [
//     {
//       number: "1",
//       title: "Sign up for free",
//       description:
//         "It only takes a few minutes—all you need is an email address, and you're ready to get started.",
//     },
//     {
//       number: "2",
//       title: "Get a quote",
//       description:
//         "Choose your destination country, send & recipient currency, and send amount to generate a quote.",
//     },
//     {
//       number: "3",
//       title: "Add your recipient",
//       description:
//         "Provide your recipient's payment information (you'll need details like their name and address).",
//     },
//     {
//       number: "4",
//       title: "Verify your identity",
//       description:
//         "For some transfers, we may need identifying documents to confirm it's really you and keep your money safe.",
//     },
//     {
//       number: "5",
//       title: "Confirm the quote",
//       description:
//         "Confirm and fund your transfer with a bank account, credit card, or a debit card and you're done!",
//     },
//     {
//       number: "6",
//       title: "Track your transfer",
//       description:
//         "See where your money is and when it arrives to your recipient. Get live chat, phone and email support.",
//     },
//   ];

//   return (
//     <div className="bg-[#f2f4f7] dark:bg-background dark:my-10">
//       <div className="max-w-8xl px-4 container mx-auto">
//         <h1 className="text-5xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//           How to send money
//           <span className="text-primary"> online with Apexture </span>
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {steps.map((step) => (
//             <Step
//               key={step.number}
//               number={step.number}
//               title={step.title}
//               description={step.description}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoneyTransferSteps;

// // MoneyTransferSteps.tsx
// import React from "react";

// const MoneyTransferSteps: React.FC = () => {
//   const steps = [
//     {
//       number: "1",
//       title: "Sign up for free",
//       description:
//         "It only takes a few minutes—all you need is an email address, and you're ready to get started.",
//     },
//     {
//       number: "2",
//       title: "Get a quote",
//       description:
//         "Choose your destination country, send & recipient currency, and send amount to generate a quote.",
//     },
//     {
//       number: "3",
//       title: "Add your recipient",
//       description:
//         "Provide your recipient's payment information (you'll need details like their name and address).",
//     },
//     {
//       number: "4",
//       title: "Verify your identity",
//       description:
//         "For some transfers, we may need identifying documents to confirm it's really you and keep your money safe.",
//     },
//     {
//       number: "5",
//       title: "Confirm the quote",
//       description:
//         "Confirm and fund your transfer with a bank account, credit card, or a debit card and you're done!",
//     },
//     {
//       number: "6",
//       title: "Track your transfer",
//       description:
//         "See where your money is and when it arrives to your recipient. Get live chat, phone and email support.",
//     },
//   ];

//   return (
//     <div className="bg-[#f2f4f7] dark:bg-background py-16">
//       <div className="max-w-8xl container px-4 mx-auto">
//         <h1 className="text-5xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//           How to send money
//           <span className="text-primary"> online with Apexture </span>
//         </h1>

//         <div className="relative">
//           {/* Central vertical line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-primary hidden md:block"></div>

//           <div className="space-y-12 md:space-y-0 mt-10">
//             {steps.map((step, index) => (
//               <div
//                 key={step.number}
//                 className={`flex flex-col md:flex-row items-center md:items-start ${
//                   index % 2 === 0 ? "md:flex-row-reverse" : ""
//                 }`}
//               >
//                 {/* Step number bubble */}
//                 <div className="flex-shrink-0 z-10">
//                   <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green text-white text-2xl font-bold shadow-lg">
//                     {step.number}
//                   </div>
//                 </div>

//                 {/* Content box */}
//                 <div
//                   className={`w-full md:w-5/12 mt-4 md:mt-0 ${
//                     index % 2 === 0 ? "md:pr-8" : "md:pl-8"
//                   }`}
//                 >
//                   <div className="bg-secondary p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1">
//                     <h3 className="text-xl font-bold text-white mb-2">
//                       {step.title}
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-300">{step.description}</p>
//                   </div>
//                 </div>

//                 {/* Spacer for the timeline design */}
//                 <div className="hidden md:block w-1/12"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoneyTransferSteps;

// MoneyTransferSteps.tsx
// "use client";

// import React, { useEffect, useState } from "react";

// const MoneyTransferSteps: React.FC = () => {
//   const moneyTransferSteps = [
//     {
//       title: "Sign up for free",
//       subtitle: "Web Developer | Internship",
//       date: "Jun 2024 - Present",
//       position: "left",
//     },
//     {
//       title: "Get a quote",
//       subtitle: "Frontend Developer",
//       date: "March 2023 - 2024",
//       position: "right",
//     },
//     {
//       title: "Add your recipient",
//       subtitle: "Web Developer | Internship",
//       date: "Jun 2024 - Present",
//       position: "left",
//     },
//     {
//       title: "Verify your identity",
//       subtitle: "Web Developer | Internship",
//       date: "Jun 2024 - Present",
//       position: "right",
//     },
//     {
//       title: "Confirm the quote",
//       subtitle: "Web Developer | Internship",
//       date: "Jun 2024 - Present",
//       position: "left",
//     },
//     {
//       title: "Track your transfer",
//       subtitle: "Web Developer | Internship",
//       date: "Jun 2024 - Present",
//       position: "right",
//     },
//   ];

//   const [activeStepIndex, setActiveStepIndex] = useState(-1); // Initialize to -1 for no active step initially

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("opacity-100");
//             entry.target.classList.add("translate-x-0");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = document.querySelectorAll(".timeline-item");
//     elements.forEach((el) => observer.observe(el));

//     return () => {
//       elements.forEach((el) => observer.unobserve(el));
//     };
//   }, []);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (activeStepIndex < moneyTransferSteps.length - 1) {
//       timer = setTimeout(() => {
//         setActiveStepIndex(activeStepIndex + 1);
//       }, 1500); // Delay between step animations (adjust as needed)
//     }
//     return () => clearTimeout(timer);
//   }, [activeStepIndex, moneyTransferSteps.length]);

//   return (
//     <div className="bg-gray-50 dark:bg-background py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-4xl font-bold mb-16 text-center">
//           <span className="text-gray-800">HOW TO SEND MONEY</span>
//           <span className="block text-green-500">ONLINE WITH APEXTURE</span>
//         </h2>

//         <div className="relative">
//           {/* Central vertical line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-navy-900 hidden md:block">
//             <div
//               className="bg-green-500 h-full w-1 absolute top-0 left-0"
//               style={{
//                 height: `${
//                   ((activeStepIndex + 1) / moneyTransferSteps.length) * 100
//                 }%`,
//                 transition: "height 1.5s ease-in-out",
//               }}
//             ></div>
//           </div>

//           {moneyTransferSteps.map((step, index) => (
//             <div key={index} className="relative mb-12">
//               {/* Number Node */}
//               <div className="absolute left-1/2 top-8 transform -translate-x-1/2 hidden md:block z-10">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy-900 bg-white dark:bg-background ${
//                     index <= activeStepIndex
//                       ? "border-green-500"
//                       : "border-navy-900"
//                   } transition-colors duration-500 ease-in-out`}
//                 >
//                   <span
//                     className={`text-navy-900 font-bold ${
//                       index <= activeStepIndex
//                         ? "text-green-500"
//                         : "text-navy-900"
//                     } transition-colors duration-500 ease-in-out`}
//                   >
//                     {index + 1}
//                   </span>
//                 </div>
//               </div>

//               {/* Content Card (Tooltip Style) */}
//               <div
//                 className={`timeline-item transition-all duration-500 ease-out opacity-0 ${
//                   step.position === "left"
//                     ? "ml-0 mr-auto md:pr-12 translate-x-10 md:w-5/12 md:text-right" // Right align text for left tooltip
//                     : "ml-auto mr-0 md:pl-12 -translate-x-10 md:w-5/12 md:text-left" // Left align text for right tooltip
//                 }`}
//               >
//                 {/* Content Div */}
//                 <div
//                   className={`rounded-md p-4 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-background ${
//                     index <= activeStepIndex
//                       ? "border-green-500"
//                       : "border-transparent"
//                   } transition-colors duration-500 ease-in-out`}
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
//                     {step.subtitle}
//                   </p>
//                   <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs">
//                     {step.date}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoneyTransferSteps;

// export default MoneyTransferSteps;

// // MoneyTransferSteps.tsx
"use client";
import {
  FaUserPlus,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaIdCard,
  FaCheckCircle,
  FaMapMarkedAlt,
} from "react-icons/fa";
// Removed: import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";

const MoneyTransferSteps: React.FC = () => {
  const moneyTransferSteps = [
    {
      title: "Sign up for free",
      description:
        "It only takes a few minutes—all you need is an email address, and you're ready to get started.",
      position: "left",
      icon: <FaUserPlus className="text-primary lg:text-2xl text-xl" />,
    },
    {
      title: "Get a quote",
      description:
        "Choose your destination country, send & recipient currency, and send amount to generate a quote.",
      position: "right",
      icon: (
        <FaFileInvoiceDollar className="text-primary lg:text-2xl text-xl" />
      ),
    },
    {
      title: "Add your recipient",
      description:
        "Provide your recipient's payment information (you'll need details like their name and address).",
      position: "left",
      icon: <FaUserFriends className="text-primary lg:text-2xl text-xl" />,
    },
    {
      title: "Verify your identity",
      description:
        "For some transfers, we may need identifying documents to confirm it's really you and keep your money safe.",
      position: "right",
      icon: <FaIdCard className="text-primary lg:text-2xl text-xl" />,
    },
    {
      title: "Confirm the quote",
      description:
        "Confirm and fund your transfer with a bank account, credit card, or a debit card and you're done!",
      position: "left",
      icon: <FaCheckCircle className="text-primary lg:text-2xl text-xl" />,
    },
    {
      title: "Track your transfer",
      description:
        "See where your money is and when it arrives to your recipient. Get live chat, phone and email support.",
      position: "right",
      icon: <FaMapMarkedAlt className="text-primary lg:text-2xl text-xl" />,
    },
  ];

  // State to track which step is currently active/highlighted
  const [activeStepIndex, setActiveStepIndex] = useState(-1); // Start at -1 (none active)

  // Timer effect to advance the active step
  useEffect(() => {
    let timer: NodeJS.Timeout;
    // Only set the timer if we haven't reached the last step
    if (activeStepIndex < moneyTransferSteps.length - 1) {
      timer = setTimeout(() => {
        setActiveStepIndex(activeStepIndex + 1);
      }, 1500); // Delay between steps (1.5 seconds)
    }
    // Cleanup function to clear the timer if the component unmounts
    // or if activeStepIndex changes before the timer fires
    return () => clearTimeout(timer);
  }, [activeStepIndex, moneyTransferSteps.length]); // Re-run effect when activeStepIndex changes

  return (
    <div className="text-white bg-white dark:bg-background md:py-10 py-5 overflow-x-hidden">
      {/* Added overflow-x-hidden */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
          HOW TO SEND MONEY
          <span className="text-primary"> ONLINE WITH APEXTURE </span>
        </h1>
      </div>
      <div className="container max-w-5xl mx-auto px-4 lg:mt-10 mt-5">
        <div className="relative ">
          {/* Timeline Background Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gray-700 hidden md:block">
            {/* Timeline Progress Line */}
            <div
              className="bg-primary w-1 absolute top-0 left-0"
              style={{
                // Height based on the current active step index
                height: `${
                  activeStepIndex >= 0
                    ? ((activeStepIndex + 1) / moneyTransferSteps.length) * 100
                    : 0
                }%`,
                // Smooth transition for the height change
                transition: "height 1s ease-in-out", // Match timer duration
              }}
            ></div>
          </div>

          {moneyTransferSteps.map((step, index) => {
            // Removed: useInView hook call

            // Determine if the current step is active or completed
            const isStepActiveOrCompleted = index <= activeStepIndex;

            return (
              // Removed: ref={ref}
              <div
                key={index}
                className="relative lg:mb-10 mb-8 flex md:block"
                style={{
                  justifyContent:
                    step.position === "left" ? "flex-start" : "flex-end",
                }}
              >
                {/* Step Number Circle (Timeline Marker) */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:block z-10">
                  <div
                    className={`flex items-center justify-center lg:size-10 size-8 rounded-full border-2 ${
                      isStepActiveOrCompleted // Highlight based on activeStepIndex
                        ? "bg-primary border-primary"
                        : "bg-mainheading border-gray-700"
                    } transition-all duration-700 ease-in-out`} // Transition for color/bg change
                  >
                    <span
                      className={`font-bold ${
                        isStepActiveOrCompleted // Text color based on activeStepIndex
                          ? "text-mainheading" // Or text-white
                          : "text-gray-300"
                      } transition-colors duration-700 ease-in-out`} // Transition for color change
                    >
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    // Added transition classes
                    step.position === "left"
                      ? "lg:ml-10 ml-5 mr-auto" // Position left card
                      : "ml-auto lg:mr-10 mr-5" // Position right card
                  } ${
                    // Animation based SOLELY on activeStepIndex now
                    isStepActiveOrCompleted
                      ? "opacity-100 translate-x-0" // Fade in and move to final position
                      : `opacity-0 ${
                          step.position === "left"
                            ? "-translate-x-10"
                            : "translate-x-10"
                        }` // Start faded out and slightly offset
                  }`}
                >
                  {/* Card styling */}
                  <div className="bg-subheading dark:bg-secondary rounded-lg p-4 text-mainheading relative">
                    {/* Arrow pointing to timeline */}
                    <div
                      className={`absolute top-4 size-4 bg-subheading dark:bg-secondary transform rotate-45 z-0 hidden md:block
                                ${
                                  step.position === "left"
                                    ? "right-[-8px]"
                                    : "left-[-8px]"
                                }`}
                    ></div>
                    {/* Card Content Inner */}
                    <div className="flex items-center gap-2 relative z-10">
                      {step.icon}
                      <h3 className="lg:text-lg text-sm font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 mt-4 lg:text-sm text-xs leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferSteps;
