import { useRef, useEffect, useState, useCallback } from "react";

import Background from "@/components/marketing/hero/background";
import LeftContent from "@/components/marketing/hero/LeftContent";
import RightContent from "@/components/marketing/hero/RightContent";

import { CARDS } from "@/contants/home/visual-card";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<Record<string, DOMRect>>({});
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [linesReady, setLinesReady] = useState(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current)
        setContainerRect(containerRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleRect = useCallback(
    (id: string, rect: DOMRect) => {
      setRects((prev) => {
        const next = { ...prev, [id]: rect };
        if (Object.keys(next).length === CARDS.length && containerRect)
          setLinesReady(true);
        return next;
      });
    },
    [containerRect],
  );

  return (
    <section className="relative mx-auto p-14 min-h-screen flex items-center bg-[#070e1b] overflow-hidden">
      {/* Grid Background */}
      <Background />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <LeftContent />

        {/* Right Content */}
        <RightContent
          containerRef={containerRef}
          rects={rects}
          containerRect={containerRect}
          linesReady={linesReady}
          handleRect={handleRect}
        />
      </div>
    </section>
  );
}
