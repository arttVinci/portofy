import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  pageType?: "home" | "portfolio" | "cv" | "webbuilder" | "template" | "blog";
}

const PAGE_META = {
  home: {
    title: "Portofy — Buat Portofolio & Website Gratis Tanpa Coding | CV ATS Indonesia",
    description: "Buat portofolio online, website, landing page, dan CV ATS tanpa coding. Dilengkapi AI CV Parser, Generator Deskripsi, dan Analitik. Gratis untuk pelajar & freelancer Indonesia.",
    keywords: "buat portofolio online gratis, portfolio builder Indonesia, buat website gratis tanpa coding, website builder gratis Indonesia, CV ATS gratis, personal branding website, portofy",
  },
  portfolio: {
    title: "Buat Portofolio Online Profesional Gratis — Portofy",
    description: "Buat website portofolio profesional tanpa coding dalam hitungan menit. Cocok untuk mahasiswa, fresh graduate, desainer, developer, dan freelancer Indonesia.",
    keywords: "buat portofolio online gratis, website portofolio mahasiswa, portofolio freelancer online, contoh portofolio fresh graduate, portofolio desainer grafis, portofolio developer Indonesia",
  },
  cv: {
    title: "Buat CV ATS Gratis & Template CV ATS Friendly — Portofy",
    description: "Buat CV ATS lolos seleksi otomatis perusahaan besar. AI CV Parser otomatis isi data kamu. Download template CV ATS gratis sekarang.",
    keywords: "buat CV ATS gratis, template CV ATS Indonesia, apa itu CV ATS friendly, tips lolos seleksi CV ATS, AI CV parser Indonesia, generator deskripsi kerja AI",
  },
  webbuilder: {
    title: "Buat Website & Landing Page Gratis Tanpa Coding — Portofy",
    description: "Buat website profesional, landing page, atau microsite drag-and-drop tanpa coding. Gratis untuk UMKM, freelancer, dan kreator Indonesia. Alternatif Wix & Canva.",
    keywords: "buat website gratis tanpa coding, website builder gratis Indonesia, buat landing page gratis, landing page UMKM gratis, microsite builder Indonesia, website drag and drop gratis, no-code website builder, link in bio profesional",
  },
  template: {
    title: "Template Portofolio & Website Gratis — Portofy",
    description: "Ratusan template portofolio dan website profesional siap pakai. Cocok untuk fresh graduate, desainer grafis, developer, dan freelancer Indonesia.",
    keywords: "template portofolio gratis, template website profesional Indonesia, contoh portofolio fresh graduate, template landing page gratis, template CV ATS Indonesia",
  },
  blog: {
    title: "Blog Tips Portofolio, Website & Karir — Portofy",
    description: "Tips cara buat portofolio dilirik HRD, panduan CV ATS, dan strategi personal branding online untuk mahasiswa dan freelancer Indonesia.",
    keywords: "cara buat portofolio kerja, tips portofolio dilirik HRD, apa itu CV ATS, buat website gratis pemula, personal branding online Indonesia, portofolio vs LinkedIn",
  },
};

export default function SEO({
  title,
  description,
  image = "https://portofy.net/images/og-cover.png",
  url = "https://portofy.net",
  keywords,
  pageType = "home",
}: SEOProps) {
  const meta = PAGE_META[pageType];
  const resolvedTitle = title ?? meta.title;
  const resolvedDesc = description ?? meta.description;
  const resolvedKeywords = keywords ?? meta.keywords;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="title" content={resolvedTitle} />
      <meta name="description" content={resolvedDesc} />
      <meta name="keywords" content={resolvedKeywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
