import { useState } from "react";
import SectionHeader from "@/components/marketing/common/SectionHeader";
import Tabs from "@/components/marketing/why/Tabs";
import { TABS_CONTENT } from "@/contants/home/tabs";

export default function WhySection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative bg-[#070e1b] py-20 lg:py-28 overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute -top-[20%] left-0 h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[50%] right-0 h-[50%] w-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

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
