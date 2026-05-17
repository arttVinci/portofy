import type { SocialResponse } from "@/@types";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  MessageCircle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  x: Twitter,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  discord: MessageCircle,
  website: Globe,
};

interface SocialLinksProps {
  socials: SocialResponse[];
  size?: "sm" | "md" | "lg";
}

export function SocialLinks({ socials, size = "md" }: SocialLinksProps) {
  const iconSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;

  if (!socials.length) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {socials.map((s) => {
        const Icon = ICON_MAP[s.platform] ?? Globe;
        return (
          <a
            key={s.id}
            href={s.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center rounded-full border border-border/50 bg-card/50 backdrop-blur-sm p-2.5 transition-all duration-300 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
            title={s.platform}
          >
            <Icon
              size={iconSize}
              className="text-muted-foreground transition-colors duration-300 group-hover:text-[#00d4ff]"
            />
          </a>
        );
      })}
    </div>
  );
}
