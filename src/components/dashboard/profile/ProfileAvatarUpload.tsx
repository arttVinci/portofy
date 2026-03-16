import { Camera, Trash2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface ProfileAvatarUploadProps {
  preview: string | null;
  onImageSelect: (file: File, previewUrl: string) => void;
  onImageRemove: () => void;
}

export default function ProfileAvatarUpload({
  preview,
  onImageSelect,
  onImageRemove,
}: ProfileAvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onImageSelect(file, url);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative size-24 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 bg-muted/30"
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Camera className="size-5 text-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground/40">Upload</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="size-4 text-white/80" />
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />

      {preview && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground h-7 gap-1.5 cursor-pointer"
          onClick={onImageRemove}
        >
          <Trash2 className="size-3" />
          Hapus foto
        </Button>
      )}
    </div>
  );
}
