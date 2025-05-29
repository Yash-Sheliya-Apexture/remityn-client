import Image from "next/image";
import Link from "next/link";
import React from "react";

const Features_Hero = () => {
  return (
    <section className="FeatureHero lg:py-20 py-5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 order-2 md:order-1">
            <div className="space-y-4 text-center md:text-left">
              <div className="sm:inline-block hidden">
                <span className="text-subheadingWhite font-medium text-sm uppercase">
                  <span className="text-subheadingWhite/30">[</span> Our
                  features
                  <span className="text-subheadingWhite/30">]</span>
                </span>
              </div>

              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
                  Fast, Secure & Affordable{" "}
                  <span className="text-primary">
                    Currency Exchange Services{" "}
                  </span>
                </h3>
                <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
                  Unlock the best value for your money with our fast and secure
                  currency exchange services. We offer competitive rates,
                  real-time conversions, and a smooth exchange process designed
                  for travelers, students, and businesses alike. No long waits,
                  no hidden charges—just honest service you can trust. Wherever
                  you're headed, exchange with ease and confidence.
                </p>
              </div>

              <div className="flex justify-center md:justify-start mt-8">
                <Link
                  href="/auth/register"
                  className="inline-block" // Added inline-block
                >
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    More Features
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2 order-1 md:order-2" // Image first on SM, left on LG
          >
            <div className="sm:hidden block">
              <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
                <span className="text-subheadingWhite/30">[</span> Our
                  features
                <span className="text-subheadingWhite/30">]</span>
              </span>

              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Fast, Secure & Affordable {" "}
                  <span className="text-primary">Currency Exchange Services</span>
                </h3>
              </div>
            </div>

            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/images/men.png" // Original image path
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
