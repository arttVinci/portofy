import { useOutletContext } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { SectionHeading } from "../components/SectionHeading";
import { AboutSection } from "../components/AboutSection";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { EducationTimeline } from "../components/EducationTimeline";

export default function AboutPage() {
  const { username } = useOutletContext<{ username: string }>();
  const { profile, experiences, educations } = usePortfolioData(username);

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 space-y-20">
      {/* About */}
      {profile.about && (
        <section>
          <SectionHeading title="About Me" />
          <div className="mt-8">
            <AboutSection about={profile.about} />
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section>
          <SectionHeading title="Experience" />
          <div className="mt-8">
            <ExperienceTimeline experiences={experiences} />
          </div>
        </section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <section>
          <SectionHeading title="Education" />
          <div className="mt-8">
            <EducationTimeline educations={educations} />
          </div>
        </section>
      )}
    </div>
  );
}
