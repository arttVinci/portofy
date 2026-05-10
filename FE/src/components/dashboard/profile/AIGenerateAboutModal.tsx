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
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SparklesIcon, Loader2Icon } from "lucide-react";
import type { GenerateAboutDescriptionRequest } from "@/@types/entities/ai_description.types";
import { Textarea } from "@/components/ui/textarea";

interface AIGenerateAboutModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (payload: GenerateAboutDescriptionRequest) => Promise<void>;
  isGenerating: boolean;
  prefill?: {
    name?: string;
    role?: string;
  };
}

const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "creative", label: "Creative" },
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
  const [userNotesInput, setUserNotesInput] = useState("");

  const handleGenerate = async () => {
    const payload: GenerateAboutDescriptionRequest = {
      name: prefill?.name ?? "",
      role: prefill?.role ?? "",
      tone: tone ?? "Professional",
      language: language ?? "Indonesia",
      user_notes: userNotesInput ?? "",
    };

    await onGenerate(payload);
    handleClose();
  };

  const handleClose = () => {
    if (!isGenerating) {
      setUserNotesInput("");
      setTone("professional");
      setLanguage("Indonesia");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pt-1.5">
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
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="grid gap-1.5">
              <Label htmlFor="ai-tone">Gaya Penulisan</Label>
              <Select
                defaultValue="professional"
                value={tone}
                onValueChange={setTone}
              >
                <SelectTrigger id="ai-tone" className="w-full">
                  <SelectValue placeholder="Pilih gaya" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {TONE_OPTIONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="ai-language">Bahasa</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="ai-language" className="w-full">
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {LANGUAGE_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* ── Key Points ── */}
          <div className="grid gap-2">
            <div>
              <Label htmlFor="user-notes">
                Poin Penting{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  — opsional
                </span>
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tambahkan hal-hal spesifik yang ingin ditonjolkan. Misalnya:
                prestasi, proyek, nilai, atau keahlian khusus.
              </p>
            </div>

            <div className="flex gap-2">
              <Textarea
                value={userNotesInput}
                onChange={(e) => setUserNotesInput(e.target.value)}
                className="overflow-y-auto"
                placeholder='Contoh: "Pernah memimpin tim 5 orang di startup fintech..."'
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-3">
          <Button
            id="user-notes"
            variant="outline"
            onClick={handleClose}
            disabled={isGenerating}
            className="cursor-pointer"
          >
            Batal
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2Icon className="size-3.5 animate-spin " />
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
