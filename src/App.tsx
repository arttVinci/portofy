import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/PublicLayout";
import HomePage from "./templates/subTemp/views/HomePage";
import AboutPage from "./templates/subTemp/views/AboutView";
import AchievementsPage from "./templates/subTemp/views/AchievementView";
import ProjectsPage from "./templates/subTemp/views/ProjectView";
import ContactPage from "./templates/subTemp/views/ContactView";
import DetailProjectPage from "./templates/subTemp/views/DetailProjectPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="project/:id" element={<DetailProjectPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
