// src/components/FeatureCard.tsx
import React from 'react';
// Import appropriate icons from react-icons, as they are used in the features array
import {
  FaUserPlus,      // For Account Setup
  FaWallet,        // For Fund Your Account
  FaPaperPlane,    // For Direct Transfers
  FaExchangeAlt,   // For Exchange Rates
  FaShieldAlt,     // For Security
  FaReceipt,       // For Transparent Fees
  FaHeadset,       // For Customer Support
} from "react-icons/fa";

// Interface for a single feature item
export interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  colSpanLarge: string; // To define column span on large screens (lg:)
  iconBgColor: string;
}

// The features data array
export const features: Feature[] = [
  {
    id: 1,
    icon: FaUserPlus,
    title: "Quick & Easy Account Setup",
    description: "Get started in minutes. Create your secure account and begin your journey to hassle-free money transfers.",
    colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
    iconBgColor: "#e3ffd1", // Light green
  },
  {
    id: 2,
    icon: FaWallet,
    title: "Fund Your Account Your Way",
    description: "Easily add funds to your account balance using your local currency through various secure payment methods.",
    colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
    iconBgColor: "#9bf7ff", // Light blue
  },
  {
    id: 3,
    icon: FaPaperPlane,
    title: "Direct Transfers to India",
    description: "Send money from wallet to recipient account in India. Our specialized service ensures your funds reach their destination efficiently.",
    colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
    iconBgColor: "#e2c9fb", // Light pink
  },
  {
    id: 4,
    icon: FaExchangeAlt,
    title: "Competitive Exchange Rates",
    description: "Enjoy exchange rates that are better than the market average. Get more INR for your currency, maximizing value for your recipient.",
    colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
    iconBgColor: "#fbcdcd", // Light orange
  },
  {
    id: 5,
    icon: FaShieldAlt,
    title: "In-House, Enterprise-Grade Security",
    description: "Our security systems are developed and maintained entirely in-house, giving us full control to implement the highest standards of data protection and fraud prevention.",
    colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
    iconBgColor: "#fee09f", // Light purple
  },
  {
    id: 6,
    icon: FaReceipt,
    title: "Transparent Fees & Process",
    description: "No hidden charges. See all fees upfront before you send. Track your transfer every step of the way.",
    colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
    iconBgColor: "#98FB98", // Light cyan
  },
  {
    id: 7,
    icon: FaHeadset,
    title: "24/7 Customer Support",
    description: "Get help anytime with our dedicated support team, ready to assist you with any queries or issues.",
    colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
    iconBgColor: "#FFA07A", // Light yellow
  },
];

// Props interface for the FeatureCard component
export interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgColor: string;
}

// The FeatureCard component
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconBgColor,
}) => {
  return (
    <div className="bg-background relative w-full h-full xl:h-[20rem] rounded-3xl p-4 md:p-6 flex flex-col ">
      <div className="mb-4">
        <div
          className="xl:w-20 lg:w-18 w-14 xl:h-20 lg:h-18 h-14 xl:rounded-2xl rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className="text-mainheading transition-colors duration-300 ease-in-out xl:size-6 size-5" />
        </div>
      </div>
      <div className="flex flex-col flex-grow xl:justify-end">
        <h3 className=" text-mainheadingWhite group-hover:text-primary text-2xl font-semibold line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-subheadingWhite lg:text-lg text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;