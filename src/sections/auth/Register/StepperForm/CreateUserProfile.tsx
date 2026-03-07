import AvatarUpload from "../../../../components/auth/AvatarUploud";
import CvUpload from "../../../../components/auth/CvUploud";
import InputLabel from "../../../../components/auth/InputLabel";
import TagInput from "../../../../components/auth/TagInput";
import IStyle from "../../../../components/utils/IStyle";

interface CreateUserProfileProps {
  fullName: string;
  bio: string;
  about: string;
  birthdate: string;
  address: string;
  website: string;
  tags: string[];
  avatarPreview: string | null;
  cvFile: File | null;
  focused: string | null;
  set: (field: string, value: string) => void;
  setFocused: (field: string | null) => void;
  setAvatarPreview: (v: string | null) => void;
  setTags: (tags: string[]) => void;
  setCvFile: (file: File | null) => void;
}
export default function OtpCodeStepper({
  fullName,
  bio,
  about,
  birthdate,
  address,
  website,
  tags,
  avatarPreview,
  cvFile,
  focused,
  set,
  setFocused,
  setAvatarPreview,
  setTags,
  setCvFile,
}: CreateUserProfileProps) {
  return (
    <div
      className="grid grid-cols-2 divide-x"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Left: profile form */}
      <div className="p-5 space-y-3 overflow-y-auto" style={{ maxHeight: 480 }}>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Isi manual
        </p>

        {/* Avatar + Nama */}
        <div className="flex items-start gap-4">
          <AvatarUpload preview={avatarPreview} onChange={setAvatarPreview} />
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
          <InputLabel text="About" hint="opsional" />
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

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <InputLabel text="Tanggal Lahir" hint="opsional" />
            <input
              type="date"
              value={birthdate}
              onChange={(e) => set("birthdate", e.target.value)}
              onFocus={() => setFocused("birthdate")}
              onBlur={() => setFocused(null)}
              style={{
                ...IStyle(focused === "birthdate"),
                colorScheme: "dark",
              }}
            />
          </div>
          <div>
            <InputLabel text="Alamat / Kota" hint="opsional" />
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
        </div>

        <div>
          <InputLabel text="Website / Sosmed" hint="opsional" />
          <input
            type="text"
            placeholder="https://linkedin.com/in/username"
            value={website}
            onChange={(e) => set("website", e.target.value)}
            onFocus={() => setFocused("website")}
            onBlur={() => setFocused(null)}
            style={IStyle(focused === "website")}
          />
        </div>

        <div>
          <InputLabel text="Tags" hint={`${tags.length}/10`} />
          <TagInput tags={tags} onChange={setTags} />
        </div>
      </div>

      {/* Right: CV upload */}
      <div className="p-5 flex flex-col">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Atau upload CV
        </p>
        <div className="flex-1">
          <CvUpload
            file={cvFile}
            onFile={setCvFile}
            onClear={() => setCvFile(null)}
          />
        </div>
      </div>
    </div>
  );
}
