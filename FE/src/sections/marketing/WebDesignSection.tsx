import SectionHeader from "@/components/marketing/common/SectionHeader";
import WebDesignIllustration from "./WebDesignIllustration";

export default function WebDesignSection() {
  return (
    <section id="web-design-agent" className="relative py-28 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6">
        <SectionHeader
          title="Web Design"
          titleGradient="Berbasis Agentic"
          description="Tidak perlu drag-and-drop yang rumit. Cukup ketik apa yang kamu inginkan, dan Agent kami akan menyusun layout portofolio impianmu secara real-time."
          label="The Killer Feature"
          isCenterHeader={true}
        />
        <WebDesignIllustration />
      </div>
    </section>
  );
}
