import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lightweight loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#070e1b]">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
  </div>
);

// 1. Layouts (lazy-loaded per route group)
const HomeLayout = lazy(() => import("./layouts/HomeLayout"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// 2. Pages Marketing
const HomePage = lazy(() => import("./pages/home/HomePage"));
const MarketingAboutPage = lazy(() => import("./pages/home/AboutPage"));

// 3. Pages Auth
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const OAuthCallbackPage = lazy(() => import("./pages/auth/OAuthCallbackPage"));

// 4. Pages Dashboard
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/dashboard/ProfilePage"));
const DashboardProjectPage = lazy(
  () => import("./pages/dashboard/ProjectPage"),
);
const DashboardAchievementPage = lazy(
  () => import("./pages/dashboard/AchievementPage"),
);
const DashboardEducationPage = lazy(
  () => import("./pages/dashboard/EducationPage"),
);
const DashboardExperiencePage = lazy(
  () => import("./pages/dashboard/ExperiencePage"),
);
const DashboardSkillPage = lazy(() => import("./pages/dashboard/SkillPage"));
const CVBuilderPage = lazy(() => import("./pages/dashboard/CVParserPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));

// 5. Public Portfolio Templates (lazy barrel export)
const DefaultLayout = lazy(() =>
  import("./templates/default").then((m) => ({ default: m.DefaultLayout })),
);
const DefaultHomePage = lazy(() =>
  import("./templates/default").then((m) => ({ default: m.DefaultHomePage })),
);
const DefaultAboutPage = lazy(() =>
  import("./templates/default").then((m) => ({ default: m.DefaultAboutPage })),
);
const DefaultProjectsPage = lazy(() =>
  import("./templates/default").then((m) => ({
    default: m.DefaultProjectsPage,
  })),
);
const DefaultProjectDetailPage = lazy(() =>
  import("./templates/default").then((m) => ({
    default: m.DefaultProjectDetailPage,
  })),
);
const DefaultAchievementsPage = lazy(() =>
  import("./templates/default").then((m) => ({
    default: m.DefaultAchievementsPage,
  })),
);
const DefaultContactPage = lazy(() =>
  import("./templates/default").then((m) => ({
    default: m.DefaultContactPage,
  })),
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
          <Route
            path="achievements"
            element={<DashboardAchievementPage />}
          />
          <Route path="education" element={<DashboardEducationPage />} />
          <Route path="experience" element={<DashboardExperiencePage />} />
          <Route path="skills" element={<DashboardSkillPage />} />
          <Route path="cv-parser" element={<CVBuilderPage />} />
          <Route path="settings" element={<SettingsPage />} />
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
          <Route
            path="achievements"
            element={<DefaultAchievementsPage />}
          />
          <Route path="projects" element={<DefaultProjectsPage />} />
          <Route
            path="projects/:projectId"
            element={<DefaultProjectDetailPage />}
          />
          <Route path="contact" element={<DefaultContactPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
