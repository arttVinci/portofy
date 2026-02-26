import Navbar from "../components/navigation/Navbar";
import HeroSection from "../pages/home/HeroSection";
import HowItWorksSection from "../pages/home/HowItsWorkSection";
import LivePreviewSection from "../pages/home/LivePreviewSection";
import PricingSection from "../pages/home/PricingSection";
import TemplateShowcase from "../pages/home/TemplateShowcase";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TemplateShowcase />
      <LivePreviewSection />
      <PricingSection />
    </>
  );
}
