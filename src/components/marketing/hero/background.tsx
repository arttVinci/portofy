import { cn } from "@/lib/utils";

export default function Background() {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 z-0 bg-size-[50px_50px]",
          "[background-image:linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)]",
          "opacity-[0.12]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#070e1b] [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black_50%)]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-130 h-130 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/5 -translate-y-1/2 w-90 h-90 bg-violet-600/6 blur-[100px] rounded-full pointer-events-none z-0" />
    </>
  );
}
