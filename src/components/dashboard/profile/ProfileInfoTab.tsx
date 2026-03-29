import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UpdateProfileRequest } from "@/@types/entities/profile.types";

interface ProfileInfoTabProps {
  values: UpdateProfileRequest;
  onChange: (field: keyof UpdateProfileRequest, value: string) => void;
}

export function ProfileInfoTab({ values, onChange }: ProfileInfoTabProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ── Location & Links ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Lokasi & Link</CardTitle>
          <CardDescription className="text-xs">
            Ditampilkan di profil publik
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="url_profile">URL Portofolio Publik</Label>
            <div className="flex items-center rounded-md border bg-muted/40 focus-within:ring-1 focus-within:ring-ring overflow-hidden">
              <span className="px-3 text-sm text-muted-foreground border-r bg-muted select-none h-9 flex items-center">
                portof.id/
              </span>
              <Input
                id="url_profile"
                placeholder="putra.rizky"
                value={values.image_url}
                onChange={(e) =>
                  onChange(
                    "image_url",
                    e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""),
                  )
                }
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Hanya huruf kecil, angka, titik, dan strip. Contoh:{" "}
              <code className="text-xs bg-muted px-1 rounded">putra.rizky</code>
            </p>
          </div>
        </CardContent>
      </Card>
      {/* ── Identity ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Identitas</CardTitle>
          <CardDescription className="text-xs">
            Nama dan bio singkat yang tampil di header portofolio
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input
              id="full_name"
              placeholder="Putra Rizky Nugraha"
              value={values.full_name}
              onChange={(e) => onChange("full_name", e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="address">Lokasi</Label>
            <Input
              id="address"
              placeholder="Jakarta, Indonesia"
              value={values.address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bio">
              Bio / Headline
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                (tampil di bawah nama)
              </span>
            </Label>
            <Input
              id="bio"
              placeholder="Fullstack Developer · Software Engineering Student"
              value={values.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {values.bio.length}/100
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="about">
              About
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                (deskripsi panjang, tampil di section About)
              </span>
            </Label>
            <Textarea
              id="about"
              placeholder="Ceritakan tentang dirimu, perjalanan karir, dan apa yang sedang kamu kerjakan..."
              value={values.about}
              onChange={(e) => onChange("about", e.target.value)}
              className="min-h-28 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {values.about.length}/500
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
