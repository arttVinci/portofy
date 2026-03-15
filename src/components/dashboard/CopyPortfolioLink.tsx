import { useState } from "react";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ── Dummy — ganti dengan username dari auth context nanti ─────────────────────
const PORTFOLIO_URL = "https://portof.id/putra.rizky";

export function CopyPortfolioLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PORTFOLIO_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium mb-1.5">Link Portofolio Kamu</p>
            <Input
              readOnly
              value={PORTFOLIO_URL}
              className="h-8 text-xs bg-muted/40 cursor-default"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
          </div>

          <div className="flex items-center gap-2 sm:mt-5.5 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <>
                  <CheckIcon className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Tersalin!
                  </span>
                </>
              ) : (
                <>
                  <CopyIcon className="size-3.5" />
                  Copy
                </>
              )}
            </Button>

            <Button size="sm" variant="outline" asChild>
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                <ExternalLinkIcon className="size-3.5" />
                Buka
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
