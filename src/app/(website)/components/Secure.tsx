// src/components/EffortelHero.tsx
import Image from "next/image";
import React from "react";

interface EffortelHeroProps {
  // You can add props here if needed, e.g., for dynamic text or image
}

const EffortelHero: React.FC<EffortelHeroProps> = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 gap-6">
      <div className="overflow-hidden max-w-6xl w-full">
        <div className="flex lg:flex-row flex-col lg:gap-6 gap-0">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2  flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-mono text-subheadingWhite uppercase tracking-wider mb-3 sm:mb-4">
              [ Built for safety. Trusted worldwide ]
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl capitalize font-bold mb-6 text-mainheadingWhite">
              Secure Currency Exchange{" "}
              <span className="text-primary"> You Can Trust</span>
            </h1>

            {/* paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed hidden md:block">
              Experience fast, secure, and reliable currency exchange services
              you can trust. With competitive exchange rates, no hidden fees,
              and end-to-end encryption, your transactions are protected at
              every step. Join thousands of satisfied customers who rely on us
              for transparent service, real-time updates, and 24/7 support. Your
              money, your way—safe, simple, and secure.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="lg:w-1/2">
            <Image
              src="/assets/images/Secured.avif"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xl"
              alt="Picture of the author"
            />

            {/* paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed md:hidden mt-5 block">
              Experience fast, secure, and reliable currency exchange services
              you can trust. With competitive exchange rates, no hidden fees,
              and end-to-end encryption, your transactions are protected at
              every step. Join thousands of satisfied customers who rely on us
              for transparent service, real-time updates, and 24/7 support. Your
              money, your way—safe, simple, and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortelHero;
