import { AnimatePresence, motion } from "motion/react";

interface TabsContentProps {
  content: {
    title: string;
    description: string;
    shortDescription: string;
    eyebrow: string;
    video: string;
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
            <p className="text-slate-300 text-sm leading-relaxed">
              {content[activeTab].shortDescription}
            </p>
          </div>

          {/* Content Visual */}

          {content[activeTab].video != "" && (
            <div className="relative w-full  rounded-2xl overflow-hidden border border-slate-700/50 bg-[#0c1322] shadow-inner">
              <video
                className="w-full aspect-video object-cover"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                crossOrigin="anonymous"
                poster={content[activeTab].video.replace(".mp4", ".jpg")}
              >
                <source src={content[activeTab].video} type="video/mp4" />
                Browser kamu tidak mendukung pemutaran video.
              </video>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
