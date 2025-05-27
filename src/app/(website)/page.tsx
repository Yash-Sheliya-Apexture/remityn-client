import HeroSection from "./components/Hero/HeroSection";
import HeroSectionNew from "./components/Hero/HeroSectionNew";
import CalculetingSection from "./components/CalculetingSection";
import SecuritySection from "./components/SecuritySection";
import SocialTrustSection from "./components/SocialTrust";
import MissionSection from "./components/MissionSection";
import Principles from "./components/Principles";
import TransferMoney from "./components/TransferMoney";
import Faq from "./components/Faq";
import FlagSection from "./components/FlagSection";
import Secure from "./components/Secure";
import InternationalTransferSection from "./components/InternationalTransferSection";
import ProcessingSteps from "./components/ProcessingSteps";

export default function Home() {
  return (
    <>
      <HeroSectionNew />
      <CalculetingSection />
      <HeroSection />
      <InternationalTransferSection />
      {/* <ProtectionSection /> */}
      <Secure />
      <ProcessingSteps />
      <SecuritySection />
      <SocialTrustSection />
      <FlagSection />
      <MissionSection />
      <Faq />
      <Principles />
      <TransferMoney />
    </>
  );
}
