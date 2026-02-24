import Navbar from "../components/ui/Navbar";
import HeroSection from "../pages/home/HeroSection";
import HowItWorksSection from "../pages/home/HowItsWorkSection";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <HowItWorksSection />
      <HowItWorksSection />
    </>
  );
}
