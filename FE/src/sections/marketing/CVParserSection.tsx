import SectionHeader from "@/components/marketing/common/SectionHeader";
import CVParserIllustration from "./CVParserIllustration";

export default function CVParserSection() {
  return (
    <section
      id="cv-parser"
      className="relative bg-[#050505] py-28 overflow-hidden"
    >
      {/* Background ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/[0.03] blur-[200px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <SectionHeader
          title="AI CV Parser"
          titleGradient="Multi-Agent Pipeline"
          description="Upload CV-mu dalam format PDF/DOCX, lalu biarkan 7 AI agent bekerja paralel — membersihkan teks, mengekstrak data profil, pengalaman, edukasi, skills, dan proyek, hingga memvalidasi hasilnya secara otomatis."
          label="Fitur Unggulan"
          isCenterHeader={true}
        />

        {/* Illustration */}
        <CVParserIllustration />
      </div>
    </section>
  );
}
