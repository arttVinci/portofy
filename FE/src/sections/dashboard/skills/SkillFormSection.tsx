import { ArrowLeftIcon, SaveIcon, Loader2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { SkillResponse, UpdateSkillRequest } from "@/@types";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

interface SkillFormSectionProps {
  mode: "add" | "edit";
  initialData?: SkillResponse;
  onBack: () => void;
  onSave: () => void;
  values: UpdateSkillRequest;
  onChange: (field: keyof UpdateSkillRequest, value: string) => void;
  isSaving: boolean;
}

export function SkillFormSection({
  mode,
  initialData,
  onBack,
  onSave,
  values,
  onChange,
  isSaving,
}: SkillFormSectionProps) {
  const isValid = !!(values.title && values.level);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 cursor-pointer"
            onClick={onBack}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <p className="text-sm font-medium">
              {mode === "add" ? "Tambah Skill" : "Edit Skill"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "add"
                ? "Isi form untuk menambah skill baru"
                : `Edit: ${initialData?.title}`}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving || !isValid}
          className="gap-2 shrink-0 cursor-pointer"
        >
          {isSaving ? (
            <Loader2Icon className="size-3.5 animate-spin" />
          ) : (
            <SaveIcon className="size-3.5" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>

      {/* Form card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Informasi Skill
          </CardTitle>
          <CardDescription className="text-xs">
            Skill atau keahlian yang ingin ditampilkan di portofolio
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-2xl">
            {/* Title */}
            <div className="grid gap-1.5">
              <Label htmlFor="skill-title">
                Nama Skill <span className="text-destructive">*</span>
              </Label>
              <Input
                id="skill-title"
                placeholder="React.js"
                value={values.title ?? ""}
                onChange={(e) => onChange("title", e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground text-right">
                {(values.title ?? "").length}/50
              </p>
            </div>

            {/* Level */}
            <div className="grid gap-1.5">
              <Label htmlFor="skill-level">
                Level <span className="text-destructive">*</span>
              </Label>
              <select
                id="skill-level"
                value={values.level ?? ""}
                onChange={(e) => onChange("level", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>
                  Pilih level
                </option>
                {SKILL_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
