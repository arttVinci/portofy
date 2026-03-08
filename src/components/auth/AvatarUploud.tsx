import { Camera } from "lucide-react";
import { useRef } from "react";

export default function AvatarUpload({
  preview,
  setAvatarPreviewUrl,
  setAvatarImageFile,
}: {
  preview: string | null;
  setAvatarPreviewUrl: (url: string) => void;
  setAvatarImageFile: (image: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarImageFile(file);
    setAvatarPreviewUrl(url);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="relative size-20 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1.5px dashed rgba(255,255,255,0.12)",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Camera size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <Camera size={16} style={{ color: "rgba(255,255,255,0.8)" }} />
        </div>
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />
      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
        Foto profil
      </p>
    </div>
  );
}
