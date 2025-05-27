import Image from "next/image";
import Link from "next/link";
import React from "react";

const Features_Hero = () => {
  return (
    <section className="FeatureHero lg:py-20 py-5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 lg:order-1 order-2">
            <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
              <div className="inline-block">
                <span className="text-subheadingWhite font-medium text-sm uppercase">
                  <span className="text-subheadingWhite/30">[</span> Our
                  features <span className="text-subheadingWhite/30">]</span>
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
                Fast, Secure & Affordable{" "}
                <span className="text-primary">
                  {" "}
                  Currency Exchange Services
                </span>
              </h2>

              <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
                Unlock the best value for your money with our fast and secure
                currency exchange services. We offer competitive rates,
                real-time conversions, and a smooth exchange process designed
                for travelers, students, and businesses alike. No long waits, no
                hidden charges—just honest service you can trust. Wherever
                you're headed, exchange with ease and confidence.
              </p>

              <div className="flex justify-center md:justify-start">
                <Link href="/auth/register" className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    More Features
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2 lg:order-1 order-2" // Image first on SM, left on LG
          >
            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/images/Features.png" // Original image path
                alt="Currency exchange services illustration" // Updated alt text for clarity
                width={550}
                height={800}
                className="object-contain rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features_Hero;
