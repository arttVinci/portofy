import AvatarUpload from "../../../../components/auth/AvatarUploud";
import CvUpload from "../../../../components/auth/CvUploud";
import InputLabel from "../../../../components/auth/InputLabel";
import TagInput from "../../../../components/auth/TagInput";
import IStyle from "../../../../components/utils/IStyle";

interface CreateUserProfileProps {
  fullName: string;
  bio: string;
  about: string;
  address: string;
  tags: string[];
  avatarPreview: string | null;
  cvFile?: File | null;
  focused: string | null;
  set: (field: string, value: string) => void;
  setFocused: (field: string | null) => void;
  setAvatarPreview: (v: string | null) => void;
  setTags: (tags: string[]) => void;
  setCvFile: (file: File | null) => void;
  setAvatarImageFile: (file: File | null) => void;
}
export default function OtpCodeStepper({
  fullName,
  bio,
  about,
  address,
  tags,
  avatarPreview,
  cvFile,
  focused,
  set,
  setFocused,
  setAvatarPreview,
  setTags,
  setCvFile,
  setAvatarImageFile,
}: CreateUserProfileProps) {
  return (
    <div
      className="grid grid-cols-5 divide-x"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Left: profile form */}
      <div
        className="p-5 col-span-3 space-y-3 overflow-y-auto no-scrollbar"
        style={{ maxHeight: 480 }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Isi manual
        </p>

        {/* Avatar + Nama */}
        <div className="flex items-start gap-4">
          <AvatarUpload
            preview={avatarPreview}
            setAvatarPreviewUrl={setAvatarPreview}
            setAvatarImageFile={setAvatarImageFile}
          />
          <div className="flex-1">
            <InputLabel text="Nama Lengkap" />
            <input
              type="text"
              placeholder="Nama di portfolio"
              value={fullName}
              onChange={(e) => set("fullName", e.target.value)}
              onFocus={() => setFocused("fullName")}
              onBlur={() => setFocused(null)}
              style={IStyle(focused === "fullName")}
            />
          </div>
        </div>

        <div>
          <InputLabel text="Bio Singkat" hint="1 kalimat" />
          <input
            type="text"
            placeholder="Seorang designer yang suka clean UI"
            value={bio}
            onChange={(e) => set("bio", e.target.value)}
            onFocus={() => setFocused("bio")}
            onBlur={() => setFocused(null)}
            style={IStyle(focused === "bio")}
          />
        </div>

        <div>
          <InputLabel text="About" />
          <textarea
            rows={3}
            placeholder="Ceritakan lebih detail tentang dirimu..."
            value={about}
            onChange={(e) => set("about", e.target.value)}
            onFocus={() => setFocused("about")}
            onBlur={() => setFocused(null)}
            style={
              {
                ...IStyle(focused === "about"),
                resize: "none",
              } as React.CSSProperties
            }
          />
        </div>

        <div>
          <InputLabel text="Alamat / Kota" />
          <input
            type="text"
            placeholder="Jakarta, ID"
            value={address}
            onChange={(e) => set("address", e.target.value)}
            onFocus={() => setFocused("address")}
            onBlur={() => setFocused(null)}
            style={IStyle(focused === "address")}
          />
        </div>

        <div>
          <InputLabel text="Tags" hint={`${tags.length}/10`} />
          <TagInput tags={tags} onChange={setTags} />
        </div>
      </div>

      {/* Right: CV upload */}
      {!cvFile && (
        <div className="p-5 flex flex-col col-span-2">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Atau upload CV
          </p>
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
