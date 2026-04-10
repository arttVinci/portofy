import { cn } from "@/lib/utils";
import AvatarUpload from "../../../../components/auth/AvatarUploud";
import CvUpload from "../../../../components/auth/CvUploud";
import TagInput from "../../../../components/auth/TagInput";

interface CreateUserProfileProps {
  fullName: string;
  bio: string;
  about: string;
  address: string;
  tags: string[];
  avatarPreview: string | null;
  cvFile?: File | null;
  focused: string | null;
  setForm: (field: string, value: string | string[]) => void;
  setFocused: (field: string | null) => void;
  setAvatarPreview: (v: string | null) => void;
  setCvFile: (file: File | null) => void;
  setAvatarImageFile: (file: File | null) => void;
}

const inputCn = (isFocused: boolean) =>
  cn(
    "w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200",
    isFocused
      ? "border-blue-500/40 bg-white/[0.05] shadow-[0_0_15px_rgba(59,130,246,0.08)]"
      : "border-white/[0.08] hover:border-white/[0.12]",
  );

export default function CreateUserProfile({
  fullName,
  bio,
  about,
  address,
  tags,
  avatarPreview,
  cvFile,
  focused,
  setForm,
  setFocused,
  setAvatarPreview,
  setCvFile,
  setAvatarImageFile,
}: CreateUserProfileProps) {
  return (
    <div
      className="grid grid-cols-5 divide-x divide-white/[0.06]"
    >
      {/* Left: profile form */}
      <div
        className="p-5 col-span-3 space-y-3.5 overflow-y-auto no-scrollbar"
        style={{ maxHeight: 480 }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
          Isi manual
        </span>

        {/* Avatar + Nama */}
        <div className="flex items-start gap-4">
          <AvatarUpload
            preview={avatarPreview}
            setAvatarPreviewUrl={setAvatarPreview}
            setAvatarImageFile={setAvatarImageFile}
          />
          <div className="flex-1">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChange={(e) => setForm("fullName", e.target.value)}
              onFocus={() => setFocused("fullName")}
              onBlur={() => setFocused(null)}
              className={inputCn(focused === "fullName")}
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
            Bio Singkat
          </label>
          <input
            type="text"
            placeholder="Masukkan bio singkat"
            value={bio}
            onChange={(e) => setForm("bio", e.target.value)}
            onFocus={() => setFocused("bio")}
            onBlur={() => setFocused(null)}
            className={inputCn(focused === "bio")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
            Tentang
          </label>
          <textarea
            rows={3}
            placeholder="Ceritakan tentang dirimu..."
            value={about}
            onChange={(e) => setForm("about", e.target.value)}
            onFocus={() => setFocused("about")}
            onBlur={() => setFocused(null)}
            className={cn(inputCn(focused === "about"), "resize-none")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
            Alamat / Kota
          </label>
          <input
            type="text"
            placeholder="Masukkan alamat"
            value={address}
            onChange={(e) => setForm("address", e.target.value)}
            onFocus={() => setFocused("address")}
            onBlur={() => setFocused(null)}
            className={inputCn(focused === "address")}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              Tags
            </label>
            <span className="text-[10px] text-slate-600">{tags.length}/10</span>
          </div>
          <TagInput tags={tags} setForm={setForm} />
        </div>
      </div>

      {/* Right: CV upload */}
      {!cvFile && (
        <div className="p-5 flex flex-col col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 mb-3">
            Atau upload CV
          </span>
          <div className="flex-1">
            <CvUpload
              file={cvFile || null}
              onFile={setCvFile}
              onClear={() => setCvFile(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
