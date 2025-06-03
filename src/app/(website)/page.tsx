import HeroSection from "./components/home/HeroSection";
import CalculetingSection from "./components/home/CalculetingSection";
import ClientTestimonialSection from "./components/home/ClientTestimonialSection";
import SecuritySection from "./components/home/SecuritySection";
import InternationalTransferSection from "./components/InternationalTransferSection";
import CallToActionSection from "./components/CallToActionSection";
import FeaturesList from "./components/FeaturesList";
import StepCardContent from "./components/StepCard/StepContentCard";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Fast & Secure International Money Transfers', // This will become "Fast & Secure... | Remityn Clone"
  description: 'Join Remityn Clone for the best rates on international money transfers. Send money to family and friends worldwide with ease.',
  openGraph: {
    title: 'Fast & Secure International Money Transfers by Remityn Clone',
    description: 'Join Remityn Clone for the best rates on international money transfers.',
    // You can specify a unique Open Graph image for this page
    // images: ['/og-homepage.png'],
  },
  twitter: {
    title: 'Fast & Secure International Money Transfers by Remityn Clone',
    description: 'Join Remityn Clone for the best rates on international money transfers.',
    // images: ['/twitter-homepage.png'],
  },
  alternates: { // If you have canonical URLs or other language versions
    canonical: '/', // Relative to metadataBase
    // languages: {
    //   'en-US': '/en-US',
    //   'es-ES': '/es-ES',
    // },
  },
};


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
