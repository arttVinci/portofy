import { Plus, X } from "lucide-react";
import { useState } from "react";

import IStyle from "../utils/IStyle";

interface TagInputProps {
  tags: string[];
  setForm: (field: string, value: string[]) => void;
}
export default function TagInput({ tags, setForm }: TagInputProps) {
  const [value, setValue] = useState("");
  const add = () => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setForm("tags", [...tags, trimmed]);
      setValue("");
    }
  };
  const remove = (t: string) =>
    setForm(
      "tags",
      tags.filter((x) => x !== t),
    );
  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2 min-h-7">
          {tags.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {t}
              <button
                type="button"
                onClick={() => remove(t)}
                className="cursor-pointer hover:opacity-70"
              >
                <X size={9} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add tag..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          style={{ ...IStyle(false), flex: 1, paddingTop: 7, paddingBottom: 7 }}
        />
        <button
          type="button"
          onClick={add}
          className="size-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.85)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(255,255,255,0.07)";
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.5)";
          }}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}
