import type { ProfileResponse, SocialResponse } from "@/@types";
import { SocialLinks } from "./SocialLinks";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  profile: ProfileResponse;
  socials: SocialResponse[];
  username: string;
}

export function HeroSection({ profile, socials, username }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-12 sm:py-0">
      {/* Background gradient orb */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#00d4ff]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Avatar — mobile first (appears on top) */}
        {profile.image_url && (
          <div className="relative flex-shrink-0 order-first lg:order-last">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#00d4ff]/30 to-transparent blur-md" />
            <img
              src={profile.image_url}
              alt={profile.full_name}
              className="relative h-40 w-40 rounded-full border-2 border-border/40 object-cover shadow-xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80"
            />
          </div>
        )}

        {/* Text side */}
        <div className="flex-1 text-center lg:text-left">
          {profile.tags?.length > 0 && (
            <div className="mb-3 sm:mb-4 flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-start">
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-[#00d4ff]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {profile.full_name}
          </h1>

          {profile.bio && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg lg:mx-0 lg:text-xl">
              {profile.bio}
            </p>
          )}

          <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
            <Link
              to={`/${username}/projects`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00d4ff] px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-[#00d4ff]/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] sm:w-auto"
            >
              View Projects
            </Link>
            <Link
              to={`/${username}/contact`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 px-6 py-3 text-sm font-semibold transition-all hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 sm:w-auto"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8 lg:justify-start">
            <SocialLinks socials={socials} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <ArrowDown size={20} className="text-muted-foreground/40" />
      </div>
    </section>
  );
}
