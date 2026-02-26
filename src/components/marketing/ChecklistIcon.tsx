interface ChecklistIconProps {
  val: boolean;
}

export default function ChecklistIcon({ val }: ChecklistIconProps) {
  return val ? (
    <div className="flex items-center justify-center">
      <div
        className="size-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <svg
          className="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div
        className="size-1.5 rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      />
    </div>
  );
}
