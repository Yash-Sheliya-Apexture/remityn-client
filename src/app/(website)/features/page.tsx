<<<<<<< HEAD
// import React from "react";
// import Principles from "../components/Principles";

// const page = () => {
//   return (
//     <div className="Features-Main">
//       <Principles />
//     </div>
//   );
// };

// export default page;


// For Pages Router: pages/features.tsx
// For App Router: app/features/page.tsx

import Head from 'next/head';
import {
  FaUserPlus,
  FaMoneyBillWave,
  FaPaperPlane,
  FaShieldAlt,
  FaBalanceScale, // Replaced ScaleIcon for competitive rates
  FaLightbulb,
  FaArrowAltCircleRight,
  FaLock,
  FaGlobeAsia, // More specific for India/Asia
  FaRegCheckCircle, // Example for one of the steps
} from 'react-icons/fa'; // Using Font Awesome icons
import { IoWalletOutline, IoDocumentTextOutline } from 'react-icons/io5'; // Using Ionicons for variety

// For App Router, you'd export the component directly
// export default function FeaturesPage() { ... }

// For Pages Router
const FeaturesPage = () => {
  const features = [
    {
      icon: FaUserPlus,
      title: 'Quick & Easy Account Setup',
      description: 'Get started in minutes. Create your secure account and begin your journey to hassle-free money transfers.',
    },
    {
      icon: IoWalletOutline, // Using an Ionicons example for funding
      title: 'Fund Your Account Your Way',
      description: 'Easily add funds to your account balance using your local currency through various secure payment methods.',
    },
    {
      icon: FaPaperPlane,
      title: 'Direct Transfers to India',
      description: 'Send money directly to any bank account or UPI ID in India. Our specialized service ensures your funds reach their destination efficiently.',
    },
    {
      icon: FaBalanceScale,
      title: 'Competitive Exchange Rates',
      description: 'Enjoy exchange rates that are better than the market average. Get more INR for your currency, maximizing value for your recipient.',
    },
    {
      icon: FaShieldAlt,
      title: 'Bank-Grade Security',
      description: 'Your security is our priority. We use advanced encryption and security protocols to protect your funds and personal data.',
    },
    {
      icon: IoDocumentTextOutline, // Using an Ionicons example for transparency
      title: 'Transparent Fees & Process',
      description: 'No hidden charges. See all fees upfront before you send. Track your transfer every step of the way.',
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Sign up quickly with minimal information.',
      icon: FaUserPlus, // Using the step number as text, icon is optional here if you prefer
    },
    {
      step: 2,
      title: 'Fund Your Wallet',
      description: 'Add money in your local currency.',
      icon: IoWalletOutline,
    },
    {
      step: 3,
      title: 'Initiate Transfer to India',
      description: 'Enter recipient details and amount in INR.',
      icon: FaGlobeAsia,
    },
    {
      step: 4,
      title: 'Money Received',
      description: 'Recipient gets funds directly in their Indian bank account.',
      icon: FaRegCheckCircle, // Changed to a checkmark for completion
    },
  ];
=======
import React from "react";
import FeatherHero from "../components/Feature/FeatherHero";
import OurFeatures from "../components/Feature/OurFeatures";
import CallToActionSection from "../components/CallToActionSection";
import SendMoneySteps from "../components/Feature/SendMoneySteps";
>>>>>>> 7f12ac02c936a4f1f334ac1463fc093242cbdd7e

  return (
<<<<<<< HEAD
    <>
      <Head>
        <title>Our Features - Send Money to India Securely</title>
        <meta
          name="description"
          content="Discover the features that make our platform the best choice for sending money to India: competitive rates, top security, and easy account management."
        />
      </Head>

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Seamless Money Transfers to India
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Experience a secure, fast, and cost-effective way to send money to your loved ones in India.
              We offer better rates and a transparent process.
            </p>
            <a
              href="/register" // Link to your registration page
              className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-lg"
            >
              Get Started Now
            </a>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform is designed with your needs in mind, focusing on security, value, and ease of use for all your transfers to India.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center" // Added flex for centering
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                    <feature.icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Send Money in 4 Simple Steps
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our straightforward process makes sending money to India quicker than ever.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                  {/* Option 1: Display step number as text */}
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4 text-2xl font-bold">
                     {step.step}
                  </div>
                  {/* Option 2: Use an icon for each step (if preferred over step number) */}
                  {/* <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                    <step.icon className="w-8 h-8" />
                  </div> */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Reinforcement Section */}
        <section className="py-16 md:py-24 bg-indigo-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <FaLock className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-indigo-300" /> {/* Adjusted size */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Trust, Our Commitment
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-indigo-100">
              We employ state-of-the-art security measures, including SSL encryption and compliance with financial regulations, to ensure your transactions and data are always protected. Send money with peace of mind.
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Send Money to India?
            </h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">
              Join thousands of satisfied customers who trust us for their international money transfers.
            </p>
            <a
              href="/register" // Link to your registration page
              className="bg-indigo-600 text-white font-semibold py-4 px-10 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 text-lg"
            >
              Create Your Free Account
            </a>
          </div>
        </section>

        {/* Footer (Assuming you have a common Footer component) */}
        {/* <Footer /> */}
      </div>
    </>
=======
    <div className="Features-Main">
      <FeatherHero />
      <OurFeatures />
      <SendMoneySteps />
      <CallToActionSection />
    </div>
>>>>>>> 7f12ac02c936a4f1f334ac1463fc093242cbdd7e
  );
};

export default FeaturesPage; // For Pages Router