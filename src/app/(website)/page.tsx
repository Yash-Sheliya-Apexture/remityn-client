import HeroSection from "./components/home/HeroSection";
import CalculetingSection from "./components/home/CalculetingSection";
import ClientTestimonialSection from "./components/home/ClientTestimonialSection";
import SecuritySection from "./components/home/SecuritySection";
import InternationalTransferSection from "./components/InternationalTransferSection";
import CallToActionSection from "./components/home/CallToActionSection";
import FeaturesSection from "./components/home/FeaturesSection";
import StepCardContent from "./components/StepCard/StepContentCard";
// import FaqSection from "./components/home/Faq";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CalculetingSection />
      <InternationalTransferSection />
      <SecuritySection />
      <ClientTestimonialSection />
      <FeaturesSection />
      <StepCardContent />
      {/* <FaqSection /> */}
      <CallToActionSection />
    </>
  );
}