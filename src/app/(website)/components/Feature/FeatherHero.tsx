"use client"; // Required for Framer Motion

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SecuritySection = () => {
  return (
    // Apply whileInView to the main section to trigger animations
    <section
      className="Security-section sm:py-16 py-10 overflow-hidden" // Hide horizontal overflow during animation
      id="security"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text Block */}
          <div
            className="w-full lg:w-1/2"
            // Inherits initial/whileInView timing from parent section
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Seamless Money{" "}
                  <span className="text-primary"> Transfers to India</span>
                </h3>
                <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
                  Experience a secure, fast, and cost-effective way to send money to your loved ones in India. We offer better rates and a transparent process.
                </p>
              </div>
              <div className="flex justify-center md:justify-start mt-8">
                <Link
                  href="/faqs"
                  className="inline-block" // Added inline-block
                >
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    Get Started Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="w-full lg:w-1/2">
            <div className="relative lg:w-[52vw] w-full h-auto flex justify-center">
              <Image
                src="/assets/images/Dashboard.avif"
                width={550}
                height={800}
                alt="Padlock symbolizing security"
                className="object-contain rounded-3xl overflow-visible w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecuritySection;