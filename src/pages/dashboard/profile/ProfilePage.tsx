import { useState } from "react";
import type { ProfileResponse } from "@/@types/entities/profile";
import type { UserResponse } from "@/@types/entities/user";

import ProfileHeaderSection from "@/sections/dashboard/profile/ProfileHeaderSection";
import PersonalInfoSection from "@/sections/dashboard/profile/PersonalInfoSection";
import AboutSection from "@/sections/dashboard/profile/AboutSection";
import TagsSection from "@/sections/dashboard/profile/TagsSection";

// ── Dummy data — ganti dengan data dari API nanti ─────────────────────────────
const DUMMY_USER: UserResponse = {
  id: "user-001",
  username: "putra.rizky",
  email: "putra.rizky@gmail.com",
  no_telp: "+62 812 3456 7890",
  created_at: 1700000000,
  updated_at: 1710000000,
};

const DUMMY_PROFILE: ProfileResponse = {
  id: "profile-001",
  full_name: "Putra Rizky Firmansyah",
  url_profile: "https://portof.id/putra.rizky/avatar.jpg",
  address: "Jakarta, Indonesia",
  about:
    "Seorang Full-Stack Developer dengan pengalaman 4+ tahun membangun aplikasi web modern. Passionate tentang clean code, design system, dan developer experience. Saat ini fokus di React, TypeScript, dan Go untuk backend.",
  bio: "Full-Stack Developer • React & TypeScript Enthusiast",
  theme: "default",
  tags: ["React", "TypeScript", "Go", "UI/UX", "Next.js"],
};

export default function ProfilePage() {
  // ── Local state (simulasi CRUD tanpa API) ───────────────────────────────────
  const [profile, setProfile] = useState(DUMMY_PROFILE);
  const [user] = useState(DUMMY_USER);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    DUMMY_PROFILE.url_profile
  );

  // ── Handler helpers ─────────────────────────────────────────────────────────
  const updateProfile = <K extends keyof ProfileResponse>(
    field: K,
    value: ProfileResponse[K]
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const personalInfo = {
    full_name: profile.full_name,
    username: user.username,
    email: user.email ?? "",
    no_telp: user.no_telp ?? "",
    address: profile.address,
    bio: profile.bio,
  };

  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: string
  ) => {
    if (field === "full_name" || field === "address" || field === "bio") {
      updateProfile(field, value);
    }
    // username, email, no_telp would update user state in real app
  };

  const handleSave = () => {
    // Placeholder — akan diganti dengan API call nanti
    console.log("Saving profile:", profile);
  };

  const handleDeleteAccount = () => {
    // Placeholder — akan diganti dengan API call + confirmation modal
    console.log("Delete account requested");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola informasi profil dan pengaturan akunmu.
        </p>
      </div>

      {/* ── Profile header card ────────────────────────────────────────────── */}
      <ProfileHeaderSection
        profile={profile}
        username={user.username}
        email={user.email ?? ""}
        avatarUrl={avatarUrl}
        onAvatarSelect={(_file, previewUrl) => setAvatarUrl(previewUrl)}
        onAvatarRemove={() => setAvatarUrl(null)}
      />

      {/* ── Personal info form ─────────────────────────────────────────────── */}
      <PersonalInfoSection
        data={personalInfo}
        onChange={handlePersonalInfoChange}
        onSave={handleSave}
      />

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <AboutSection
        about={profile.about}
        onChange={(v) => updateProfile("about", v)}
        onSave={handleSave}
      />

      {/* ── Tags ───────────────────────────────────────────────────────────── */}
      <TagsSection
        tags={profile.tags}
        onChange={(tags) => updateProfile("tags", tags)}
        onSave={handleSave}
      />
    </div>
  );
}
