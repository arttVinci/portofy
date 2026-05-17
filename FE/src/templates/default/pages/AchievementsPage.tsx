import { useOutletContext } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { SectionHeading } from "../components/SectionHeading";
import { AchievementCard } from "../components/AchievementCard";

export default function AchievementsPage() {
  const { username } = useOutletContext<{ username: string }>();
  const { achievements } = usePortfolioData(username);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Achievements"
        subtitle="Awards, certifications, and recognitions"
      />

      {achievements.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No achievements yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      )}
    </div>
  );
}
