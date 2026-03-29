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
  setForm: (field: string, value: string | string[]) => void;
  setFocused: (field: string | null) => void;
  setAvatarPreview: (v: string | null) => void;
  setCvFile: (file: File | null) => void;
  setAvatarImageFile: (file: File | null) => void;
}
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
            <InputLabel text="Full Name" />
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setForm("fullName", e.target.value)}
              onFocus={() => setFocused("fullName")}
              onBlur={() => setFocused(null)}
              style={IStyle(focused === "fullName")}
            />
          </div>
        </div>

        <div>
          <InputLabel text="Short Bio" />
          <input
            type="text"
            placeholder="Enter your short bio"
            value={bio}
            onChange={(e) => setForm("bio", e.target.value)}
            onFocus={() => setFocused("bio")}
            onBlur={() => setFocused(null)}
            style={IStyle(focused === "bio")}
          />
        </div>

        <div>
          <InputLabel text="About" />
          <textarea
            rows={3}
            placeholder="Tell us more about yourself..."
            value={about}
            onChange={(e) => setForm("about", e.target.value)}
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
          <InputLabel text="Address / City" />
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setForm("address", e.target.value)}
            onFocus={() => setFocused("address")}
            onBlur={() => setFocused(null)}
            style={IStyle(focused === "address")}
          />
        </div>

        <div>
          <InputLabel text="Tags" hint={`${tags.length}/10`} />
          <TagInput tags={tags} setForm={setForm} />
        </div>
      </div>

      {/* Right: CV upload */}
      {!cvFile && (
        <div className="p-5 flex flex-col col-span-2">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Or upload CV
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
