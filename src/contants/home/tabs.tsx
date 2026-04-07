export const TABS_CONTENT = [
  {
    eyebrow: "NO-CODE",
    title: "Template Builder",
    description:
      "Beragam pilihan template modern dan responsif dengan antarmuka editor drag-and-drop yang intuitif. Bebas melakukan kustomisasi terhadap skema warna, font, dan tipe layout tanpa coding.",
    shortDescription:
      "Pilih dari puluhan template gratis dan edit antarmukanya seketika dengan utilitas drag-and-drop.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-slate-900 border border-slate-800">
        <img
          src="/linear.webp"
          className="h-full w-full object-cover opacity-80"
          alt="Template Builder UI"
        />
      </div>
    ),
  },
  {
    eyebrow: "GENERATOR",
    title: "AI-Powered Description",
    description:
      "Pengguna cukup memasukkan informasi dasar tentang proyek atau pengalaman mereka, dan AI akan menghasilkan deskripsi yang profesional, menarik, dan sesuai konteks. Fitur ini membantu pengguna yang kesulitan mengartikulasikan pencapaian mereka dalam kata-kata yang tepat.",
    shortDescription:
      "Cukup masukkan informasi dasar, dan AI akan merangkai deskripsi profesional yang menarik dan kaya konteks.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-400),var(--blue-600))] text-white text-3xl font-bold p-8 text-center drop-shadow-lg">
        AI Description Generator
      </div>
    ),
  },
  {
    eyebrow: "AUTOMATION",
    title: "CV / Resume Parser",
    description:
      "Pengguna dapat mengunggah CV atau resume mereka, dan sistem AI akan secara otomatis mengekstrak informasi penting seperti pengalaman, pendidikan, skill, lalu mengisi profil secara otonom.",
    shortDescription:
      "Upload dokumen lamamu dan biarkan AI mengekstrak metadatanya sekaligus mendeteksi otomatis gap pada profilmu.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--rose-400),var(--red-500))] text-white text-3xl font-bold p-8 text-center drop-shadow-lg">
        CV / Resume Parser
      </div>
    ),
  },
  {
    eyebrow: "ANALYTICS",
    title: "Portfolio Analyzer",
    description:
      "Setelah portofolio selesai dibuat, AI akan melakukan analisis mendalam dan memberikan skor kelayakan portofolio (Portfolio Score), analisis kesesuaian industri, serta flag item yang perlu diperbaiki.",
    shortDescription:
      "Dapatkan skor kelayakan dan analisis mendalam AI demi memperkuat nilai saing portofoliomu.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--amber-400),var(--orange-500))] text-white text-3xl font-bold p-8 text-center drop-shadow-lg">
        Portfolio Analyzer
      </div>
    ),
  },
];
