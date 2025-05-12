import HeroSection from "./components/Hero/HeroSection";
import ProtectionSection from "./components/ProtectionSection";
import SecuritySection from "./components/SecuritySection";
import SocialTrustSection from "./components/SocialTrust";
import MissionSection from "./components/MissionSection";
import Principles from "./components/Principles";
import TransferMoney from "./components/TransferMoney";
import Faq from "./components/Faq";
import FlagSection from "./components/FlagSection";

export default function Home() {
  return (
    <>
      <HeroSection />
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
