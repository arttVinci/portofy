import HeroSection from "../../sections/marketing/HeroSection";
import HowItWorksSection from "../../sections/marketing/HowItsWorkSection";
import TemplateShowcase from "../../sections/marketing/TemplateShowcase";
import LivePreviewSection from "../../sections/marketing/LivePreviewSection";
import PricingSection from "../../sections/marketing/PricingSection";
import FaqSection from "../../sections/marketing/FaqSection";
import CtaBannerSection from "../../sections/marketing/CtaBannerSection";
import Footer from "../../sections/marketing/Footer";

export default function HomePage() {
  return (
    <>
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
