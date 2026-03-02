import { Check, Minus } from "lucide-react";

interface ChecklistIconProps {
  val: boolean | string;
}

export default function ChecklistIcon({ val }: ChecklistIconProps) {
  return val ? (
    <div className="flex justify-center">
      <div
        className="size-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <Check
          size={10}
          strokeWidth={2.5}
          style={{ color: "rgba(255,255,255,0.6)" }}
        />
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <Minus
        size={12}
        strokeWidth={1.5}
        style={{ color: "rgba(255,255,255,0.15)" }}
      />
    </div>
  );
}
