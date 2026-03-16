import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ProfileFormField from "@/components/dashboard/profile/ProfileFormField";

interface PersonalInfoData {
  full_name: string;
  username: string;
  email: string;
  no_telp: string;
  address: string;
  bio: string;
}

interface PersonalInfoSectionProps {
  data: PersonalInfoData;
  onChange: <K extends keyof PersonalInfoData>(field: K, value: PersonalInfoData[K]) => void;
  onSave: () => void;
}

export default function PersonalInfoSection({
  data,
  onChange,
  onSave,
}: PersonalInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Informasi Pribadi</CardTitle>
        <CardDescription>
          Data dasar profil kamu yang tampil di portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileFormField
            id="full_name"
            label="Nama Lengkap"
            value={data.full_name}
            onChange={(v) => onChange("full_name", v)}
            placeholder="Masukkan nama lengkap"
          />
          <ProfileFormField
            id="username"
            label="Username"
            value={data.username}
            onChange={(v) => onChange("username", v)}
            placeholder="username"
            helperText="portof.id/username"
            disabled
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileFormField
            id="email"
            label="Email"
            type="email"
            value={data.email}
            onChange={(v) => onChange("email", v)}
            placeholder="email@example.com"
          />
          <ProfileFormField
            id="no_telp"
            label="No. Telepon"
            type="tel"
            value={data.no_telp}
            onChange={(v) => onChange("no_telp", v)}
            placeholder="+62 812 3456 7890"
          />
        </div>

        <ProfileFormField
          id="address"
          label="Alamat"
          value={data.address}
          onChange={(v) => onChange("address", v)}
          placeholder="Jakarta, Indonesia"
        />

        <ProfileFormField
          id="bio"
          label="Bio Singkat"
          value={data.bio}
          onChange={(v) => onChange("bio", v)}
          placeholder="Deskripsikan diri kamu dalam satu kalimat..."
          multiline
          rows={2}
          maxLength={160}
        />

        <div className="flex justify-end pt-2">
          <Button onClick={onSave} size="sm" className="gap-1.5 cursor-pointer">
            <Save className="size-3.5" />
            Simpan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
