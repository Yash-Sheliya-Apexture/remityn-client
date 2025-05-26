import HeroSectionNew from "./components/Hero/HeroSectionNew";
import CalculetingSection from "./components/Hero/CalculetingSection";
import ClientTestimonialSection from "./components/ClientTestimonialSection";
import SecuritySection from "./components/SecuritySection";
import SocialTrustSection from "./components/SocialTrust";
import MissionSection from "./components/MissionSection";
import Principles from "./components/Principles";
import TransferMoney from "./components/TransferMoney";
import Faq from "./components/Faq";
import FlagSection from "./components/FlagSection";
import InternationalTransferSection from "./components/InternationalTransferSection";
import CallToActionSection from "./components/CallToActionSection";
import FeaturesSection from "./components/home/FeaturesSection";
import StepCardContent from "./components/StepCard/StepContentCard";

export default function Home() {
  return (
    <>
      <HeroSectionNew />
      <CalculetingSection />
      <InternationalTransferSection />
      <SecuritySection />
      <ClientTestimonialSection />
      <FeaturesSection />
      <StepCardContent />
      <CallToActionSection />




      {/* <ProtectionSection /> */}

      {/* <ProtectionSection /> */}

      {/* <SocialTrustSection /> */}
      {/* <FlagSection /> */}
      {/* <MissionSection /> */}
      {/* <Principles /> */}
      {/* <TransferMoney /> */}
      {/* <Faq /> */}
    </>
  );
}
