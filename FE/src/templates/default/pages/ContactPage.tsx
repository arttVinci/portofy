import { useOutletContext } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { SectionHeading } from "../components/SectionHeading";
import { SocialLinks } from "../components/SocialLinks";
import { MapPin, Mail } from "lucide-react";

export default function ContactPage() {
  const { username } = useOutletContext<{ username: string }>();
  const { profile, socials } = usePortfolioData(username);

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Get in Touch"
        subtitle="Feel free to reach out through any of the platforms below"
        align="center"
      />

      <div className="mt-12 flex flex-col items-center gap-8">
        {/* Info cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {profile.address && (
            <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/50 px-5 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00d4ff]/10">
                <MapPin size={18} className="text-[#00d4ff]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{profile.address}</p>
              </div>
            </div>
          )}

          {/* Try to find an email from socials or just show a mailto icon */}
          <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/50 px-5 py-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00d4ff]/10">
              <Mail size={18} className="text-[#00d4ff]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Reach out</p>
              <p className="text-sm font-medium">via social media</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {socials.length > 0 && (
          <div className="mt-4">
            <SocialLinks socials={socials} size="lg" />
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 rounded-xl border border-border/40 bg-gradient-to-br from-[#00d4ff]/5 to-transparent p-8 text-center backdrop-blur-sm max-w-md">
          <h3 className="text-lg font-semibold">Let's work together</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            I'm always open to new opportunities, collaborations, and
            interesting conversations. Don't hesitate to reach out!
          </p>
        </div>
      </div>
    </div>
  );
}
