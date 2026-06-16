import SectionHeader from "@/components/marketing/common/SectionHeader";
import RAGIllustration from "./RAGIllustration";

export default function RAGSection() {
  return (
    <section id="rag-agent" className="relative py-28 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <SectionHeader
          title="RAG Agent"
          titleGradient="Background Scanner"
          description="Agent cerdas yang menelusuri Google, LinkedIn, GitHub, dan berbagai sumber web untuk mencocokkan, memverifikasi, dan memperkaya data latar belakang portofoliomu secara otomatis."
          label="Intelligence Layer"
          isCenterHeader={false}
        />
        <RAGIllustration />
      </div>
    </section>
  );
}
