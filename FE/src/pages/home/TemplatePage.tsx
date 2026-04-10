import { HeroParallax } from "@/components/ui/hero-parallax";

export default function TemplatePage() {
  const products = [
    {
      title: "Devfolio - Minimal Software Engineer",
      link: "/templates/devfolio",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Creative - Graphic Designer Portfolio",
      link: "/templates/creative",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Elysian - Elegant Minimalist",
      link: "/templates/elysian",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Nexus - Dark Mode Startup",
      link: "/templates/nexus",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Luminary - Brand Strategist",
      link: "/templates/luminary",
      thumbnail:
        "https://images.unsplash.com/photo-1507238692062-810ceecc6601?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Proxima - Data Scientist",
      link: "/templates/proxima",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Horizon - Consultant CV",
      link: "/templates/horizon",
      thumbnail:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Aura - Colorful 3D",
      link: "/templates/aura",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Velocity - Fast Marketing",
      link: "/templates/velocity",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Cipher - Cyberpunk Dev",
      link: "/templates/cipher",
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Vertex - Product Manager",
      link: "/templates/vertex",
      thumbnail:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Prism - Photographer",
      link: "/templates/prism",
      thumbnail:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Omni - All-in-one Founder",
      link: "/templates/omni",
      thumbnail:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Nova - Space Theme",
      link: "/templates/nova",
      thumbnail:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Zenith - Clean Architect",
      link: "/templates/zenith",
      thumbnail:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Devfolio - Minimal Software Engineer",
      link: "/templates/devfolio",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Creative - Graphic Designer Portfolio",
      link: "/templates/creative",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Elysian - Elegant Minimalist",
      link: "/templates/elysian",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Nexus - Dark Mode Startup",
      link: "/templates/nexus",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Luminary - Brand Strategist",
      link: "/templates/luminary",
      thumbnail:
        "https://images.unsplash.com/photo-1507238692062-810ceecc6601?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Proxima - Data Scientist",
      link: "/templates/proxima",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Horizon - Consultant CV",
      link: "/templates/horizon",
      thumbnail:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Aura - Colorful 3D",
      link: "/templates/aura",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Velocity - Fast Marketing",
      link: "/templates/velocity",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Cipher - Cyberpunk Dev",
      link: "/templates/cipher",
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Vertex - Product Manager",
      link: "/templates/vertex",
      thumbnail:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Prism - Photographer",
      link: "/templates/prism",
      thumbnail:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Omni - All-in-one Founder",
      link: "/templates/omni",
      thumbnail:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Nova - Space Theme",
      link: "/templates/nova",
      thumbnail:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Zenith - Clean Architect",
      link: "/templates/zenith",
      thumbnail:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    },
  ];
  return (
    <div className="bg-[#050a15] min-h-screen">
      <HeroParallax products={products} />
    </div>
  );
}
