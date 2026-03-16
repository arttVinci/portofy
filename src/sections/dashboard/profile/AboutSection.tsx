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

interface AboutSectionProps {
  about: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export default function AboutSection({
  about,
  onChange,
  onSave,
}: AboutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tentang Saya</CardTitle>
        <CardDescription>
          Ceritakan lebih detail tentang dirimu, pengalaman, dan keahlian.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileFormField
          id="about"
          label="Tentang"
          value={about}
          onChange={onChange}
          placeholder="Ceritakan tentang dirimu, latar belakang, pengalaman, dan apa yang kamu sukai..."
          multiline
          rows={6}
          maxLength={1000}
        />

        <div className="flex justify-end">
          <Button onClick={onSave} size="sm" className="gap-1.5 cursor-pointer">
            <Save className="size-3.5" />
            Simpan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
