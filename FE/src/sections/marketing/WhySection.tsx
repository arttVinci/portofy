import { useState } from "react";
import SectionHeader from "@/components/marketing/common/SectionHeader";
import Tabs from "@/components/marketing/why/Tabs";
import { TABS_CONTENT } from "@/contants/home/tabs";

export default function WhySection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-20 lg:py-28 bg-[#3B82F6]/5 overflow-hidden">
      {/* Background glow lines */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          title="Kenapa Memilih"
          titleGradient="PortofId"
          description="Memungkinkan siapa pun membangun portofolio profesional secara online tanpa perlu keahlian coding sama sekali. Pendekatan intuitif yang dioptimalkan untuk pengguna Indonesia."
          label="Kenapa Memilih"
          isCenterHeader={false}
        />

        {/* Tabs Layout */}
        <Tabs
          content={TABS_CONTENT}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </section>
  );
}
