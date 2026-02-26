import Navbar from "../components/navigation/Navbar";
import CtaBannerSection from "../sections/marketing/CtaBannerSection";
import FaqSection from "../sections/marketing/FaqSection";
import Footer from "../sections/marketing/Footer";
import HeroSection from "../sections/marketing/HeroSection";
import HowItWorksSection from "../sections/marketing/HowItsWorkSection";
import LivePreviewSection from "../sections/marketing/LivePreviewSection";
import PricingSection from "../sections/marketing/PricingSection";
import TemplateShowcase from "../sections/marketing/TemplateShowcase";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TemplateShowcase />
      <LivePreviewSection />
      <PricingSection />
      <FaqSection />
      <CtaBannerSection />
      <Footer />
    </>
  );
}
