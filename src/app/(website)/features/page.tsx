import React from "react";
import FeatherHero from "../components/Feature/FeatherHero";
import OurFeatures from "../components/Feature/OurFeatures";
import CallToActionSection from "../components/CallToActionSection";
import SendMoneySteps from "../components/Feature/SendMoneySteps";

const page = () => {
  return (
    <div className="Features-Main">
      <FeatherHero />
      <OurFeatures />
      <SendMoneySteps />
      <CallToActionSection />
    </div>
  );
};

export default page;
