import HeroSection from "./components/home/HeroSection";
import CalculetingSection from "./components/home/CalculetingSection";
import ClientTestimonialSection from "./components/home/ClientTestimonialSection";
import SecuritySection from "./components/home/SecuritySection";
import InternationalTransferSection from "./components/InternationalTransferSection";
import CallToActionSection from "./components/CallToActionSection";
import FeaturesList from "./components/FeaturesList";
import StepCardContent from "./components/StepCard/StepContentCard";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CalculetingSection />
      <InternationalTransferSection />
      <SecuritySection />
      <ClientTestimonialSection />
      <FeaturesList />
      <StepCardContent />
      <CallToActionSection />
    </>
  );
}