import { Routes, Route } from "react-router-dom";

// 1. Layouts
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

// 2. Pages Marketing
import HomePage from "./pages/home/HomePage";
import TemplatePage from "./pages/home/TemplatePage";
import MarketingAboutPage from "./pages/home/AboutPage";

// 3. Pages Auth
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

// Pages Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import DashboardProjectPage from "./pages/dashboard/ProjectPage";
import DashboardAchievementPage from "./pages/dashboard/AchievementPage";
import DashboardEducationPage from "./pages/dashboard/EducationPage";
import DashboardExperiencePage from "./pages/dashboard/ExperiencePage";
import DashboardSkillPage from "./pages/dashboard/SkillPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="templates" element={<TemplatePage />} />
        <Route path="about" element={<MarketingAboutPage />} />
        <Route path="#langganan" element={<HomePage />} />
      </Route>

      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="projects" element={<DashboardProjectPage />} />
        <Route path="achievements" element={<DashboardAchievementPage />} />
        <Route path="education" element={<DashboardEducationPage />} />
        <Route path="experience" element={<DashboardExperiencePage />} />
        <Route path="skills" element={<DashboardSkillPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* <Route path="/:username" element={<PublicLayout />}>
        <Route index element={<PortfolioHomePage />} />{" "}
        <Route path="about" element={<AboutPage />} />
        <Route path="achievements" element={<AchievementPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="projects/:projectId" element={<DetailProjectPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route> */}
    </Routes>
  );
}
