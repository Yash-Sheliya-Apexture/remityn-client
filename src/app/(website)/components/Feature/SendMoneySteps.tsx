// import React from "react";
// import { UserPlus, Wallet, Send, CheckCircle } from "lucide-react";

// const SendMoneySteps = () => {
//   const steps = [
//     {
//       id: 1,
//       icon: <UserPlus className="w-6 h-6 text-primary" />, 
//       title: "Create Your Account",
//       description: "Sign up quickly with minimal information.",
//     },
//     {
//       id: 2,
//       icon: <Wallet className="w-6 h-6 text-primary" />,
//       title: "Fund Your Wallet",
//       description: "Add money in your local currency.",
//     },
//     {
//       id: 3,
//       icon: <Send className="w-6 h-6 text-primary" />,
//       title: "Initiate Transfer to India",
//       description: "Enter recipient details and amount in INR.",
//     },
//     {
//       id: 4,
//       icon: <CheckCircle className="w-6 h-6 text-primary" />,
//       title: "Money Received",
//       description:
//         "Recipient gets funds directly in their Indian bank account.",
//     },
//   ];

//   return (
//     <div className="SendMoneyStep py-20">
//       {" "}
//       {/* Assuming this class might set a theme, e.g., dark background */}
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left">
//           <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Send Money in <span className="text-primary">4 Simple Steps</span>
//           </h3>
//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Our straightforward process makes sending money to India quicker
//             than ever.
//           </p>
//         </div>

//         {/* Steps Container */}
//         <div className="lg:mt-25 mt-16">

//           {steps.map((step, index) => (
//             <div key={step.id} className="relative">

//               {/* Step Content */}
//               <div className="flex items-start gap-8">
                
//                 <div className="flex justify-center">
//                   <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                     <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                       {step.icon}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex-1 pt-2">
//                   <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                     {step.title}
//                   </h3>
//                   <p className="text-subheadingWhite lg:text-lg text-base">
//                     {step.description}
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

// export default SendMoneySteps;




import React from "react";
import { UserPlus, Wallet, Send, CheckCircle } from "lucide-react";
import Image from "next/image";

const SendMoneySteps = () => {
  const steps = [
  {
    id: 1,
    icon: <UserPlus className="w-6 h-6 text-primary" />,
    title: "Create Your Account",
    description:
      "Sign up quickly with minimal information to get started. All you need is a valid email address and a few personal details.",
  },
  {
    id: 2,
    icon: <Wallet className="w-6 h-6 text-primary" />,
    title: "Fund Your Wallet",
    description:
      "Easily add money to your wallet using your preferred payment method. We support a range of local currency options for your convenience.",
  },
  {
    id: 3,
    icon: <Send className="w-6 h-6 text-primary" />,
    title: "Initiate Transfer to India",
    description:
      "Enter the recipient's bank details and the amount you wish to send. Review the exchange rate and confirm your transfer in a few clicks.",
  },
  {
    id: 4,
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    title: "Money Received",
    description:
      "The recipient receives the money directly into their Indian bank account. They are notified instantly once the transfer is successful.",
  },
];


  return (
    <div className="SendMoneyStep sm:py-16 py-10">
      {" "}
      {/* Assuming this class might set a theme, e.g., dark background */}
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Send Money in <span className="text-primary">4 Simple Steps</span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Send money quickly and securely in just four easy steps. From setting up your account to your recipient receiving funds in India, our streamlined process ensures a smooth and hassle-free experience.
          </p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:mt-16 mt-10">
          <div className="Steps-Container w-full lg:w-2/5">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative ${
                  index < steps.length - 1 ? "pb-12" : ""
                }`}
              >
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute w-0.5 bg-primary z-[1]"
                    style={{
                      left: "2.5rem",
                      top: "2.5rem",
                      bottom: "-2.5rem",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Step Content Wrapper (Icon + Text Block) */}
                <div className="flex items-start gap-8 relative z-[2]">
                  {/* Left Side - Icon Container */}
                  <div className="flex justify-center bg-background shrink-0">
                    <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="sm:text-2xl text-xl text-mainheadingWhite font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-subheadingWhite lg:text-lg text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-3/5 lg:block hidden">
            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/images/steps_image-1.png"
                width={550}
                height={800}
                alt="Padlock symbolizing security"
                className="object-contain w-[70%] hrounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneySteps;