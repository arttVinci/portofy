import type { SocialResponse } from "@/@types";
import { SocialLinks } from "./SocialLinks";

interface FooterProps {
  fullName: string;
  socials: SocialResponse[];
}

export function Footer({ fullName, socials }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium">{fullName}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              © {year} All rights reserved.
            </p>
          </div>

          <SocialLinks socials={socials} size="sm" />
        </div>

        <div className="mt-8 flex justify-center">
          <p className="text-xs text-muted-foreground/50">
            Built with{" "}
            <a
              href="https://portofy.id"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#00d4ff]"
            >
              Portofy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
