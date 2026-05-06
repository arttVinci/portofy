import WhySection from "@/sections/marketing/WhySection";
import HowItWorksSection from "@/sections/marketing/HowItWorksSection";
// import CTASection from "@/sections/marketing/CTASection";
import PremiumSection from "@/sections/marketing/PremiumSection";
// import BlogSection from "@/sections/marketing/BlogSection";
import FAQSection from "@/sections/marketing/FAQSection";
import FooterSection from "@/sections/marketing/FooterSection";

export default function HomePage() {
  return (
    <>
      {/* <HeroSection /> */}
      <WhySection />
      <HowItWorksSection />
      {/* <CTASection /> */}
      <PremiumSection />
      {/* <BlogSection /> */}
      <FAQSection />
      <FooterSection />
    </>
  );
}
