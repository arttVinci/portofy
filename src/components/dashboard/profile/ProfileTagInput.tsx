import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileTagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export default function ProfileTagInput({
  tags,
  onChange,
  maxTags = 10,
  placeholder = "Tambah tag...",
}: ProfileTagInputProps) {
  const [value, setValue] = useState("");

  const add = () => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      onChange([...tags, trimmed]);
      setValue("");
    }
  };

  const remove = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-3">
      {/* Tags display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 pr-1 text-xs font-normal"
            >
              {tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors cursor-pointer"
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className="flex-1"
          disabled={tags.length >= maxTags}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={add}
          disabled={tags.length >= maxTags || !value.trim()}
          className="shrink-0 size-8"
        >
          <Plus className="size-3.5" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {tags.length}/{maxTags} tag digunakan. Tekan Enter untuk menambahkan.
      </p>
    </div>
  );
}
