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
          title="Portofy Sebagai Platform Portofolio Builder"
          titleGradient="Cerdas Berbasis AI."
          description="Platform portfolio builder berbasis AI Agent untuk kreator
            Indonesia — dari upload CV, AI otomatis parsing profil kamu, RAG
            Agent menelusuri web untuk verifikasi background, hingga Design
            Agent yang membantu kamu bangun tampilan portfolio lewat chat.
            Profesional, tanpa coding, dalam hitungan menit."
          label="Kenapa Memilih Kami?"
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
