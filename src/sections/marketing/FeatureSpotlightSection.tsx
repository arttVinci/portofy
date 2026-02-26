import { motion } from "framer-motion";
import SpotlightMock from "../../components/marketing/SpotlightMock";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface FeatureSpotlightSectionProps {
  spotlight: {
    tag: string;
    title: string;
    desc: string;
    points: string[];
    mockContent: string;
    reverse?: boolean;
  };
}

export default function FeatureSpotlightSection({
  spotlight,
}: FeatureSpotlightSectionProps) {
  return (
    <section className="py-16 max-w-5xl mx-auto px-6">
      <div
        className={`flex flex-col ${spotlight.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-14`}
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: spotlight.reverse ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smooth }}
          className="flex-1"
        >
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {spotlight.tag}
          </span>
          <h2
            className="text-[34px] font-normal leading-[1.15] tracking-[-0.025em] text-white mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {spotlight.title}
          </h2>
          <p
            className="text-[14px] leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {spotlight.desc}
          </p>
          <ul className="space-y-2.5">
            {spotlight.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3">
                <div
                  className="size-4 rounded-full shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <svg
                    className="size-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span
                  className="text-[13px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Mock */}
        <motion.div
          initial={{ opacity: 0, x: spotlight.reverse ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smooth, delay: 0.1 }}
          className="flex-1 w-full"
        >
          <SpotlightMock type={spotlight.mockContent} />
        </motion.div>
      </div>
    </section>
  );
}
