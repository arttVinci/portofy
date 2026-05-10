import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SparklesIcon, PlusIcon, XIcon, Loader2Icon } from "lucide-react";
import type { GenerateAboutDescriptionRequest } from "@/@types/entities/ai_description.types";

interface AIGenerateAboutModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (payload: GenerateAboutDescriptionRequest) => Promise<void>;
  isGenerating: boolean;
  /* Pre-fill data dari profile */
  prefill?: {
    name?: string;
    role?: string;
    location?: string;
    skills?: string[];
  };
}

const TONE_OPTIONS = [
  {
    value: "professional",
    label: "Professional",
    desc: "Formal, authoritative",
  },
  { value: "casual", label: "Casual", desc: "Friendly, conversational" },
  { value: "creative", label: "Creative", desc: "Expressive, memorable" },
];

const LANGUAGE_OPTIONS = [
  { value: "Indonesia", label: "Bahasa Indonesia" },
  { value: "English", label: "English" },
];

export function AIGenerateAboutModal({
  open,
  onClose,
  onGenerate,
  isGenerating,
  prefill,
}: AIGenerateAboutModalProps) {
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("Indonesia");
  const [yearsExp, setYearsExp] = useState("2");
  const [pointInput, setPointInput] = useState("");
  const [points, setPoints] = useState<string[]>([]);

  const addPoint = () => {
    const trimmed = pointInput.trim();
    if (!trimmed || points.length >= 10) return;
    setPoints((prev) => [...prev, trimmed]);
    setPointInput("");
  };

  const removePoint = (idx: number) => {
    setPoints((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPoint();
    }
  };

  const handleGenerate = async () => {
    const userNotesFormatted =
      points.length > 0
        ? `Poin penting yang harus dimasukkan:\n${points.map((p, i) => `${i + 1}. ${p}`).join("\n")}`
        : "";

    const payload: GenerateAboutDescriptionRequest = {
      name: prefill?.name ?? "",
      role: prefill?.role ?? "",
      years_exp: parseInt(yearsExp) || 0,
      skill: prefill?.skills?.join(", ") ?? "",
      tone,
      location: prefill?.location ?? "",
      language,
      user_notes: userNotesFormatted,
    };

    await onGenerate(payload);
  };

  const handleClose = () => {
    if (!isGenerating) {
      setPoints([]);
      setPointInput("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="size-4 text-primary" />
            Generate About dengan AI
          </DialogTitle>
          <DialogDescription>
            Masukkan poin-poin penting tentang dirimu, lalu biarkan AI
            menyusunnya menjadi deskripsi yang profesional.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          {/* ── Row: Tone & Language ── */}
          <div className="grid grid-cols-2 gap-20">
            <div className="grid gap-1.5">
              <Label htmlFor="ai-tone">Gaya Penulisan</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="ai-tone">
                  <SelectValue placeholder="Pilih gaya" />
                </SelectTrigger>
                <SelectContent>
                  {TONE_OPTIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <span className="font-medium">{t.label}</span>
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        — {t.desc}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="ai-language">Bahasa</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="ai-language">
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Years Experience ── */}
          <div className="grid gap-1.5">
            <Label htmlFor="ai-years">Pengalaman (tahun)</Label>
            <Input
              id="ai-years"
              type="number"
              min={0}
              max={50}
              value={yearsExp}
              onChange={(e) => setYearsExp(e.target.value)}
              className="w-32"
            />
          </div>

          <Separator />

          {/* ── Key Points ── */}
          <div className="grid gap-2">
            <div>
              <Label htmlFor="ai-point-input">
                Poin Penting{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (opsional, maks 10)
                </span>
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tambahkan hal-hal spesifik yang ingin ditonjolkan. Misalnya:
                prestasi, proyek, nilai, atau keahlian khusus.
              </p>
            </div>

            {/* Existing points */}
            {points.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {points.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm animate-in fade-in-0 slide-in-from-top-1 duration-200"
                  >
                    <span className="shrink-0 text-xs font-mono text-muted-foreground mt-0.5 w-4">
                      {idx + 1}.
                    </span>
                    <span className="flex-1">{point}</span>
                    <button
                      type="button"
                      onClick={() => removePoint(idx)}
                      className="shrink-0 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors text-muted-foreground hover:text-foreground"
                      aria-label={`Hapus poin ${idx + 1}`}
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input new point */}
            {points.length < 10 && (
              <div className="flex gap-2">
                <Input
                  id="ai-point-input"
                  placeholder='Contoh: "Pernah memimpin tim 5 orang di startup fintech"'
                  value={pointInput}
                  onChange={(e) => setPointInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addPoint}
                  disabled={!pointInput.trim()}
                  className="shrink-0 gap-1"
                >
                  <PlusIcon className="size-3.5" />
                  Tambah
                </Button>
              </div>
            )}

            {points.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap mt-1">
                <Badge variant="secondary" className="text-xs">
                  {points.length}/10 poin
                </Badge>
              </div>
            )}
          </div>

          {/* ── Preview prefill data ── */}
          {(prefill?.name || prefill?.role || prefill?.location) && (
            <>
              <Separator />
              <div className="rounded-md bg-muted/50 border px-3 py-2.5 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground mb-1.5">
                  Data dari profil (otomatis)
                </p>
                {prefill?.name && (
                  <p>
                    <span className="font-medium">Nama:</span> {prefill.name}
                  </p>
                )}
                {prefill?.role && (
                  <p>
                    <span className="font-medium">Role:</span> {prefill.role}
                  </p>
                )}
                {prefill?.location && (
                  <p>
                    <span className="font-medium">Lokasi:</span>{" "}
                    {prefill.location}
                  </p>
                )}
                {prefill?.skills && prefill.skills.length > 0 && (
                  <p>
                    <span className="font-medium">Skills:</span>{" "}
                    {prefill.skills.join(", ")}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isGenerating}
          >
            Batal
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2Icon className="size-3.5 animate-spin" />
                Sedang Generate...
              </>
            ) : (
              <>
                <SparklesIcon className="size-3.5" />
                Generate Deskripsi
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
