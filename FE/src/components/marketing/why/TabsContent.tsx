import { AnimatePresence, motion } from "motion/react";

interface TabsContentProps {
  content: {
    title: string;
    description: string;
    shortDescription: string;
    eyebrow: string;
    content: React.ReactNode;
  }[];
  activeTab: number;
}
export default function TabsContent({ content, activeTab }: TabsContentProps) {
  return (
    <div className="w-full lg:w-7/12 flex flex-col lg:sticky lg:top-32 self-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col bg-slate-900 border border-slate-800/50 p-8 rounded-[2rem] shadow-2xl"
        >
          {/* Content Header */}
          <div className="mb-6">
            <span className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-2 block">
              {content[activeTab].eyebrow}
            </span>
            <h3 className="text-2xl font-bold text-white mb-3">
              {content[activeTab].title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {content[activeTab].shortDescription}
            </p>
          </div>

          {/* Content Visual */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 bg-[#0c1322] shadow-inner mt-4">
            {content[activeTab].content}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
