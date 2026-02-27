import { Routes, Route } from "react-router-dom";

// 1. Layouts
import HomeLayout from "./layouts/HomeLayout";
import PublicLayout from "./layouts/PublicLayout";

// 2. Pages Marketing (Jualan)
import MarketingHomePage from "./pages/home/HomePage";
import FeaturedPage from "./pages/home/FeaturedPage";
import TemplatePage from "./pages/home/TemplatePage";
import PricingPage from "./pages/home/PricingPage";
import BlogPage from "./pages/home/BlogPage";

// 3. Pages Portfolio (Public)
import PortfolioHomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import AchievementPage from "./pages/public/AchievementPage";
import DetailProjectPage from "./pages/public/DetailProjectPage";
import ContactPage from "./pages/public/ContactPage";
import ProjectPage from "./pages/public/ProjectPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<MarketingHomePage />} />
        <Route path="fitur" element={<FeaturedPage />} />
        <Route path="template" element={<TemplatePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="blog" element={<BlogPage />} />
      </Route>

      <Route path="/:username" element={<PublicLayout />}>
        <Route index element={<PortfolioHomePage />} />{" "}
        <Route path="about" element={<AboutPage />} />
        <Route path="achievements" element={<AchievementPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="projects/:projectId" element={<DetailProjectPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
