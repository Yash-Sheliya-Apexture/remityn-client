"use client"

import React from 'react'; // Import React for React.FC and React.ReactNode
import {
  IoRocketOutline,       // For speed
  IoSwapHorizontalOutline, // For transfer/exchange
  IoWalletOutline,       // For competitive rates/value
} from 'react-icons/io5'; // Import from react-icons
// You might need to install react-icons if you haven't: npm install react-icons or yarn add react-icons

// Define icons using React Icons components
// Only icons used by 'individuals' are kept
const icons = {
  rocket: (
    <IoRocketOutline className="w-8 h-8 text-primary" />
  ),
  transfer: (
    <IoSwapHorizontalOutline className="w-8 h-8 text-primary" />
  ),
  wallet: (
    <IoWalletOutline className="w-8 h-8 text-primary" />
  ),
};

type Product = {
  icon: React.ReactNode; // Changed from JSX.Element to React.ReactNode
  title: string;
  description: string;
};

// Data is now only for individuals, 'businesses' section removed
const individualsProductsData: Product[] = [
  {
    icon: icons.transfer,
    title: 'Send Money to India (INR)',
    description: 'Easily transfer funds to family and friends in India. Enjoy a seamless experience with direct bank deposits and UPI payments.',
  },
  {
    icon: icons.rocket,
    title: 'Fast & Secure Transfers',
    description: 'Experience swift and secure international money transfers to INR. Our robust platform ensures your money reaches its destination safely and quickly.',
  },
  {
    icon: icons.wallet,
    title: 'Competitive INR Exchange Rates',
    description: 'Get the best value for your money with our highly competitive exchange rates for USD, EUR, GBP (and more) to INR, and transparent low fees.',
  },
];

const InternationalTransferSection: React.FC = () => {
  const currentProducts = individualsProductsData;

  return (
    <section className="InternationalTransferSection py-20">
      <div className="container mx-auto px-4">
        {/* Header Section - simplified as tabs are removed */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Send Money to <span className="text-primary">India</span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Transfer funds internationally to India with ease, speed, and
            security. We offer competitive exchange rates and a seamless
            experience for your INR remittances.
          </p>
        </div>

        {/* Products Grid - remains largely the same, iterates over currentProducts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:mt-25 mt-16">
          {currentProducts.map((product, index) => {
            const isLast = index === currentProducts.length - 1;
            let conditionalClasses = "";

            if (!isLast) {
              // Original border and padding logic for non-last items
              conditionalClasses = "lg:border-r border-r-gray-600/50 lg:border-b-0 border-b border-b-gray-600/50 lg:pr-10 lg:pb-0 pb-10";
            } else {
              if (currentProducts.length === 1 || currentProducts.length % 2 !== 0) {
                conditionalClasses = "sm:col-span-2 lg:col-span-1"; // lg:col-span-1 ensures it takes 1/3 on large screens
              } else {
                conditionalClasses = "lg:col-span-1";
              }
            }

            return (
              <div
                key={index}
                // Ensure space before conditionalClasses if it's not empty
                className={`text-center space-y-6${conditionalClasses ? ' ' + conditionalClasses.trim() : ''}`}
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
                      {product.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl text-mainheadingWhite font-semibold">
                  {product.title}
                </h3>
                <p className="text-subheadingWhite lg:text-lg text-base">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InternationalTransferSection;