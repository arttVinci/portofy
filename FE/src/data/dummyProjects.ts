import type { ProjectResponse } from "@/@types/entities/project.types";

export const DUMMY_PROJECTS: ProjectResponse[] = [
  {
    id: "p1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart, checkout, and payment gateway integration. Built with modern architecture and responsive design.",
    image: "",
    github_url: "https://github.com/username/ecommerce",
    live_url: "https://ecommerce-demo.vercel.app",
    featured: true,
    challenges:
      "Handling real-time inventory sync across multiple users and optimizing database queries for large catalogs.",
    solution:
      "Implemented WebSocket for real-time updates and used Redis caching layer with database indexing.",
    tags: ["fullstack", "e-commerce", "payment"],
    tech_stack: [
      { name: "Next.js", icon: "nextjs", color: "#000000" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
      { name: "Stripe", icon: "stripe", color: "#635BFF" },
    ],
    gallery: [
      { url: "/screenshots/ecommerce-home.png", caption: "Home Page" },
      { url: "/screenshots/ecommerce-cart.png", caption: "Shopping Cart" },
    ],
    features: [
      {
        title: "Shopping Experience",
        items: [
          "Product search & filter",
          "Real-time cart updates",
          "Wishlist management",
        ],
      },
      {
        title: "Admin Dashboard",
        items: ["Inventory management", "Order tracking", "Revenue analytics"],
      },
    ],
    createdAt: 1710000000000,
  },
  {
    id: "p2",
    title: "AI Chat Application",
    description:
      "Real-time chat application powered by AI with smart reply suggestions, message summarization, and language translation features.",
    image: "",
    github_url: "https://github.com/username/ai-chat",
    live_url: "https://ai-chat-demo.vercel.app",
    featured: true,
    challenges:
      "Managing concurrent WebSocket connections and integrating multiple AI model APIs with rate limiting.",
    solution:
      "Used connection pooling with load balancing and implemented a queue-based system for AI API calls.",
    tags: ["ai", "realtime", "chat"],
    tech_stack: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Node.js", icon: "nodejs", color: "#339933" },
      { name: "Socket.IO", icon: "socketio", color: "#010101" },
      { name: "OpenAI", icon: "openai", color: "#412991" },
    ],
    gallery: [],
    features: [
      {
        title: "AI Features",
        items: [
          "Smart reply suggestions",
          "Message summarization",
          "Auto translation",
        ],
      },
    ],
    createdAt: 1712000000000,
  },
  {
    id: "p3",
    title: "Task Management Dashboard",
    description:
      "Kanban-style task management tool with drag-and-drop, team collaboration, and analytics dashboard.",
    image: "",
    github_url: "https://github.com/username/taskboard",
    live_url: "",
    featured: false,
    challenges:
      "Implementing smooth drag-and-drop with optimistic updates and conflict resolution for concurrent edits.",
    solution:
      "Used dnd-kit with optimistic UI patterns and CRDTs for conflict-free concurrent editing.",
    tags: ["productivity", "kanban", "collaboration"],
    tech_stack: [
      { name: "Vue.js", icon: "vuejs", color: "#4FC08D" },
      { name: "Go", icon: "go", color: "#00ADD8" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
    ],
    gallery: [],
    features: [],
    createdAt: 1714000000000,
  },
  {
    id: "p4",
    title: "Portfolio Builder",
    description:
      "A no-code portfolio builder that allows users to create stunning portfolios with customizable templates and themes.",
    image: "",
    github_url: "",
    live_url: "https://portfolio-builder.vercel.app",
    featured: true,
    challenges:
      "Building a flexible template engine that supports dynamic theming and component composition.",
    solution:
      "Designed a registry-based template system with CSS custom properties for theming.",
    tags: ["no-code", "portfolio", "templates"],
    tech_stack: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
      { name: "Vite", icon: "vite", color: "#646CFF" },
    ],
    gallery: [],
    features: [
      {
        title: "Builder Features",
        items: [
          "Drag-and-drop editor",
          "Template marketplace",
          "Custom domain support",
        ],
      },
    ],
    createdAt: 1716000000000,
  },
  {
    id: "p5",
    title: "Weather Forecast App",
    description:
      "Beautiful weather application with 7-day forecasts, location-based weather, and severe weather alerts.",
    image: "",
    github_url: "https://github.com/username/weather-app",
    live_url: "",
    featured: false,
    challenges:
      "Handling geolocation permissions and diverse weather API data formats.",
    solution:
      "Created a unified data transformer layer and progressive permission requests.",
    tags: ["weather", "api", "mobile-friendly"],
    tech_stack: [
      { name: "React Native", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    ],
    gallery: [],
    features: [],
    createdAt: 1718000000000,
  },
  {
    id: "p6",
    title: "DevOps Monitoring Tool",
    description:
      "Infrastructure monitoring dashboard with real-time metrics, alerting system, and incident management workflow.",
    image: "",
    github_url: "https://github.com/username/devops-monitor",
    live_url: "https://devops-monitor.vercel.app",
    featured: false,
    challenges:
      "Processing high-volume metrics data streams and rendering complex charts without performance issues.",
    solution:
      "Used WebWorkers for data processing and virtualized chart rendering with canvas-based graphics.",
    tags: ["devops", "monitoring", "infrastructure"],
    tech_stack: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Go", icon: "go", color: "#00ADD8" },
      { name: "Grafana", icon: "grafana", color: "#F46800" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
    ],
    gallery: [],
    features: [
      {
        title: "Monitoring",
        items: [
          "Real-time metrics dashboard",
          "Custom alert rules",
          "Incident timeline",
        ],
      },
    ],
    createdAt: 1720000000000,
  },
];
