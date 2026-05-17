import { useOutletContext } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { HeroSection } from "../components/HeroSection";
import { SectionHeading } from "../components/SectionHeading";
import { AboutSection } from "../components/AboutSection";
import { SkillGrid } from "../components/SkillGrid";
import { ProjectGrid } from "../components/ProjectGrid";

export default function HomePage() {
  const { username } = useOutletContext<{ username: string }>();
  const { profile, projects, skills, socials } = usePortfolioData(username);

  if (!profile) return null;

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <HeroSection profile={profile} socials={socials} username={username} />

      {/* About preview */}
      {profile.about && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading title="About Me" />
          <div className="mt-8">
            <AboutSection
              about={
                profile.about.length > 500
                  ? profile.about.slice(0, 500) + "..."
                  : profile.about
              }
            />
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="border-t border-border/20 bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <SectionHeading title="Skills & Technologies" />
            <div className="mt-8">
              <SkillGrid skills={skills} />
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {displayProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            title="Projects"
            subtitle="A selection of work I'm proud of"
          />
          <div className="mt-10">
            <ProjectGrid projects={displayProjects} username={username} />
          </div>
        </section>
      )}
    </div>
  );
}
