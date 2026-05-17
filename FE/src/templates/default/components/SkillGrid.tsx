import type { SkillResponse } from "@/@types";

interface SkillGridProps {
  skills: SkillResponse[];
}

const LEVEL_COLORS: Record<string, string> = {
  Expert: "border-[#00d4ff]/40 bg-[#00d4ff]/10 text-[#00d4ff]",
  Advanced: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Beginner: "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
};

export function SkillGrid({ skills }: SkillGridProps) {
  if (!skills.length) return null;

  // Group by level
  const grouped = skills.reduce(
    (acc, skill) => {
      const level = skill.level || "Beginner";
      if (!acc[level]) acc[level] = [];
      acc[level].push(skill);
      return acc;
    },
    {} as Record<string, SkillResponse[]>,
  );

  const levelOrder = ["Expert", "Advanced", "Intermediate", "Beginner"];

  return (
    <div className="space-y-6">
      {levelOrder.map((level) => {
        const items = grouped[level];
        if (!items?.length) return null;
        return (
          <div key={level}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {level}
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill.id}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${LEVEL_COLORS[level] ?? LEVEL_COLORS.Beginner}`}
                >
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
