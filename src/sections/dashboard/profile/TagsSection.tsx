import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ProfileTagInput from "@/components/dashboard/profile/ProfileTagInput";

interface TagsSectionProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  onSave: () => void;
}

export default function TagsSection({
  tags,
  onChange,
  onSave,
}: TagsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tags & Keahlian</CardTitle>
        <CardDescription>
          Tambahkan tag untuk membantu orang menemukan profilmu. Contoh:
          React, UI/UX, Backend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileTagInput
          tags={tags}
          onChange={onChange}
          maxTags={10}
          placeholder="Tambah tag keahlian..."
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
