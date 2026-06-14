import SectionHeader from "@/components/marketing/common/SectionHeader";
import CVParserIllustration from "./CVParserIllustration";

export default function CVParserSection() {
  return (
    <section id="cv-parser" className="relative py-28 overflow-hidden">
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
