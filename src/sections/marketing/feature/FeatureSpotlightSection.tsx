import { motion } from "framer-motion";
import SpotlightMock from "../../../components/marketing/SpotlightMock";
import SpotlightContent from "../../../components/marketing/SpotlightContent";

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
    <section
      id="feature-spotlight-section"
      className="py-16 max-w-5xl mx-auto px-6"
    >
      <div
        className={`flex flex-col ${spotlight.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-14`}
      >
        {/* Text */}
        <SpotlightContent
          tag={spotlight.tag}
          title={spotlight.title}
          desc={spotlight.desc}
          points={spotlight.points}
          reverse={spotlight.reverse}
        />

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
