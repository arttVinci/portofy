import FeatureCard from "@/components/marketing/hero/FeatureCard";
import ConnectorLines from "@/components/marketing/hero/ConnectorLines";

import { CARDS } from "@/contants/home/visual-card";

interface RightContentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  rects: Record<string, DOMRect>;
  containerRect: DOMRect | null;
  linesReady: boolean;
  handleRect: (id: string, rect: DOMRect) => void;
}

export default function RightContent({
  containerRef,
  rects,
  containerRect,
  linesReady,
  handleRect,
}: RightContentProps) {
  return (
    <div ref={containerRef} className="relative hidden lg:flex h-150">
      <ConnectorLines
        rects={rects}
        containerRect={containerRect}
        visible={linesReady}
      />
      {CARDS.map((card, i) => (
        <FeatureCard key={i} card={card} onRect={handleRect} index={i} />
      ))}
    </div>
  );
}
