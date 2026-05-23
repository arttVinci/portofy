import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TabsListProps {
  content: {
    title: string;
    description: string;
    shortDescription: string;
    eyebrow: string;
    video: string;
  }[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}
export default function TabsList({
  content,
  activeTab,
  setActiveTab,
}: TabsListProps) {
  return (
    <div className="flex flex-col gap-3 w-full lg:w-5/12 shrink-0">
      {content.map((item, index) => {
        const isActive = activeTab === index;
        return (
          <div
            key={index}
            onMouseEnter={() => setActiveTab(index)}
            className={cn(
              "cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative",
              isActive
                ? "bg-slate-800/80 border-slate-700 shadow-lg"
                : "bg-transparent border-transparent hover:bg-slate-800/40 opacity-70 hover:opacity-100",
            )}
          >
            {/* Left blue active indicator line */}
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute left-0 top-6 bottom-6 w-1 bg-blue-500 rounded-r-md"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
