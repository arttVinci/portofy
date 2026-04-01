import type { ProjectGallery } from "@/@types/entities/project.types";

interface ProjectGalleryProps {
  items: ProjectGallery[];
}

export function ProjectGallery({ items }: ProjectGalleryProps) {
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-lg border bg-muted aspect-video"
        >
          <img
            src={item.image_url}
            alt={item.caption}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {item.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
