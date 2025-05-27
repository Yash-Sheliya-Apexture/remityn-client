import HeroSectionNew from "./components/Hero/HeroSectionNew";
import CalculetingSection from "./components/Hero/CalculetingSection";
import ClientTestimonialSection from "./components/ClientTestimonialSection";
import SecuritySection from "./components/SecuritySection";
import InternationalTransferSection from "./components/InternationalTransferSection";
import CallToActionSection from "./components/CallToActionSection";
import FeaturesSection from "./components/home/FeaturesSection";
import StepCardContent from "./components/StepCard/StepContentCard";
// import FaqSection from "./components/Faq";

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
      {/* <FaqSection /> */}
    </>
  );
}