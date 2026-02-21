import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import AchievementPage from "./pages/public/AchievementPage";
import DetailProjectPage from "./pages/public/DetailProjectPage";
import ContactPage from "./pages/public/ContactPage";
import ProjectPage from "./pages/public/ProjectPage";

export default function App() {
  return (
    <Routes>
      <Route path="/:username" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="achievements" element={<AchievementPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="projects/:projectId" element={<DetailProjectPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
