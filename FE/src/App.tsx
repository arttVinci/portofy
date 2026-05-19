import { Routes, Route } from "react-router-dom";

// 1. Layouts
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

// 2. Pages Marketing
import HomePage from "./pages/home/HomePage";
// import TemplatePage from "./pages/home/TemplatePage";
import MarketingAboutPage from "./pages/home/AboutPage";

// 3. Pages Auth
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import OAuthCallbackPage from "./pages/auth/OAuthCallbackPage";

// Pages Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import DashboardProjectPage from "./pages/dashboard/ProjectPage";
import DashboardAchievementPage from "./pages/dashboard/AchievementPage";
import DashboardEducationPage from "./pages/dashboard/EducationPage";
import DashboardExperiencePage from "./pages/dashboard/ExperiencePage";
import DashboardSkillPage from "./pages/dashboard/SkillPage";
import CVBuilderPage from "./pages/dashboard/CVParserPage";

// 4. Public Portfolio Templates
import {
  DefaultLayout,
  DefaultHomePage,
  DefaultAboutPage,
  DefaultProjectsPage,
  DefaultProjectDetailPage,
  DefaultAchievementsPage,
  DefaultContactPage,
} from "./templates/default";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="templates" element={<TemplatePage />} /> */}
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
        <Route path="cv-parser" element={<CVBuilderPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="callback" element={<OAuthCallbackPage />} />
      </Route>

      {/* Public Portfolio — Default Template */}
      <Route path="/:username" element={<DefaultLayout />}>
        <Route index element={<DefaultHomePage />} />
        <Route path="about" element={<DefaultAboutPage />} />
        <Route path="achievements" element={<DefaultAchievementsPage />} />
        <Route path="projects" element={<DefaultProjectsPage />} />
        <Route
          path="projects/:projectId"
          element={<DefaultProjectDetailPage />}
        />
        <Route path="contact" element={<DefaultContactPage />} />
      </Route>
    </Routes>
  );
}
