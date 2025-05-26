import HeroSection from "./components/Hero/HeroSection";
import HeroSectionNew from "./components/Hero/HeroSectionNew";
import CalculetingSection from "./components/CalculetingSection";
import ProtectionSection from "./components/ProtectionSection";
import SecuritySection from "./components/SecuritySection";
import SocialTrustSection from "./components/SocialTrust";
import MissionSection from "./components/MissionSection";
import Principles from "./components/Principles";
import TransferMoney from "./components/TransferMoney";
import Faq from "./components/Faq";
import FlagSection from "./components/FlagSection";
import InternationalTransferSection from "./components/InternationalTransferSection";
import StepCardContent from "./components/StepCard/StepContentCard";

export default function Home() {
  return (
    <>
      <HeroSectionNew />
      <CalculetingSection />
      <HeroSection />
      <InternationalTransferSection />
      <StepCardContent />
      <ProtectionSection />
      <SecuritySection />
      <SocialTrustSection />
      <FlagSection />
      <MissionSection />
      <Principles />
      <TransferMoney />
      <Faq />
    </>
  );
}
