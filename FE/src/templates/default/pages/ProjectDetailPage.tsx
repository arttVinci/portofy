import { useOutletContext, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services";
import type { ProjectResponse } from "@/@types";
import { ApiError } from "@/api/apiError";
import { SectionHeading } from "../components/SectionHeading";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectDetailPage() {
  const { username } = useOutletContext<{ username: string }>();
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project, isLoading } = useQuery<ProjectResponse, ApiError>({
    queryKey: ["project", "public", username, projectId],
    queryFn: () => projectService.getByUsername(username, projectId!),
    enabled: !!username && !!projectId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00d4ff] border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 text-center">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link
          to={`/${username}/projects`}
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#00d4ff] hover:underline"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Back */}
      <Link
        to={`/${username}/projects`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#00d4ff]"
      >
        <ArrowLeft size={14} />
        All Projects
      </Link>

      {/* Hero image */}
      {project.image_url && (
        <div className="mb-8 overflow-hidden rounded-xl border border-border/40">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Title & tools */}
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {project.title}
      </h1>

      {project.tools?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-3 py-1 text-xs font-medium text-[#00d4ff]"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {project.link_url && (
        <a
          href={project.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#00d4ff] transition-colors hover:text-[#00d4ff]/80"
        >
          <ExternalLink size={14} />
          Visit Project
        </a>
      )}

      {/* Description */}
      {project.description && (
        <section className="mt-12">
          <SectionHeading title="Overview" />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {project.description}
          </p>
        </section>
      )}

      {/* Challenges */}
      {project.challenges && (
        <section className="mt-12">
          <SectionHeading title="Challenges" />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {project.challenges}
          </p>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="mt-12">
          <SectionHeading title="Solution" />
          <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {project.solution}
          </p>
        </section>
      )}

      {/* Features */}
      {project.features?.length > 0 && (
        <section className="mt-12">
          <SectionHeading title="Features" />
          <div className="mt-6 space-y-6">
            {project.features.map((feature, i) => (
              <div key={i}>
                <h4 className="font-semibold">{feature.title}</h4>
                <ul className="mt-2 space-y-1 pl-5 list-disc text-sm text-muted-foreground">
                  {feature.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <section className="mt-12">
          <SectionHeading title="Gallery" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border/40"
              >
                <img
                  src={img.image_url}
                  alt={img.caption || `Screenshot ${i + 1}`}
                  className="w-full object-cover"
                />
                {img.caption && (
                  <p className="px-4 py-2.5 text-xs text-muted-foreground">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
