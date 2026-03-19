import type { ProjectResponse } from "@/@types/entities/project";

export const DUMMY_PROJECTS: ProjectResponse[] = [
  {
    id: "1",
    title: "portof.id",
    description:
      "Platform SaaS Multi-Tenant untuk membuat portofolio profesional tanpa coding. Dibangun dengan fokus pada scalability dan clean architecture.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    github_url: "https://github.com/arttVinci/portof",
    live_url: "https://portof.id",
    featured: true,
    challenges:
      "Membangun sistem multi-tenant yang scalable dengan isolasi data per user yang ketat, sekaligus mendukung ribuan template dinamis.",
    solution:
      "Menggunakan repository pattern dan arsitektur Headless UI agar setiap user bisa punya template berbeda tanpa duplikasi kode.",
    tags: ["saas", "multi-tenant", "portfolio", "web"],
    tech_stack: [
      { name: "Laravel", icon: "laravel", color: "#FF2D20" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "MySQL", icon: "mysql", color: "#4479A1" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
        caption: "Dashboard overview",
      },
      {
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80",
        caption: "Profile editor",
      },
    ],
    features: [
      {
        title: "Multi-tenant",
        items: ["Isolasi data per user", "Custom domain", "Template dinamis"],
      },
      {
        title: "Content CRUD",
        items: [
          "Profile, Projects, Experience",
          "Skills & Achievements",
          "Testimonials",
        ],
      },
      {
        title: "AI Assistant",
        items: ["Auto-fill dari CV upload", "Generate bio otomatis"],
      },
    ],
    createdAt: 1700000000,
  },
  {
    id: "2",
    title: "Go REST API Boilerplate",
    description:
      "Boilerplate REST API dengan Golang menggunakan clean architecture. Includes auth, middleware, dan docker setup siap production.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    github_url: "https://github.com/arttVinci/go-api",
    live_url: "",
    featured: false,
    challenges:
      "Membuat struktur yang opinionated tapi tetap fleksibel untuk berbagai use case.",
    solution:
      "Menerapkan clean architecture dengan layer yang jelas: handler, service, repository.",
    tags: ["golang", "api", "backend", "boilerplate"],
    tech_stack: [
      { name: "Go", icon: "go", color: "#00ACD7" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "MySQL", icon: "mysql", color: "#4479A1" },
    ],
    gallery: [],
    features: [
      {
        title: "Auth",
        items: ["JWT authentication", "Refresh token", "Role-based access"],
      },
      {
        title: "Architecture",
        items: [
          "Clean architecture",
          "Repository pattern",
          "Dependency injection",
        ],
      },
    ],
    createdAt: 1690000000,
  },
  {
    id: "3",
    title: "React Component Library",
    description:
      "Kumpulan reusable React components dengan Tailwind CSS dan TypeScript. Storybook documentation included.",
    image:
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600&q=80",
    github_url: "https://github.com/arttVinci/ui-lib",
    live_url: "https://ui.arttVinci.dev",
    featured: false,
    challenges:
      "Membuat komponen yang accessible, themeable, dan tidak opinionated terhadap design system tertentu.",
    solution:
      "Menggunakan CSS variables untuk theming dan Radix UI sebagai accessibility foundation.",
    tags: ["react", "ui", "components", "typescript"],
    tech_stack: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Tailwind", icon: "tailwind", color: "#06B6D4" },
    ],
    gallery: [],
    features: [
      {
        title: "Components",
        items: ["30+ components", "Dark mode support", "Accessible (WCAG 2.1)"],
      },
    ],
    createdAt: 1680000000,
  },
  {
    id: "4",
    title: "React Component Library",
    description:
      "Kumpulan reusable React components dengan Tailwind CSS dan TypeScript. Storybook documentation included.",
    image:
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=600&q=80",
    github_url: "https://github.com/arttVinci/ui-lib",
    live_url: "https://ui.arttVinci.dev",
    featured: false,
    challenges:
      "Membuat komponen yang accessible, themeable, dan tidak opinionated terhadap design system tertentu.",
    solution:
      "Menggunakan CSS variables untuk theming dan Radix UI sebagai accessibility foundation.",
    tags: ["react", "ui", "components", "typescript"],
    tech_stack: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Tailwind", icon: "tailwind", color: "#06B6D4" },
    ],
    gallery: [],
    features: [
      {
        title: "Components",
        items: ["30+ components", "Dark mode support", "Accessible (WCAG 2.1)"],
      },
    ],
    createdAt: 1680000000,
  },
];
