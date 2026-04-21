import { Suspense } from "react";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { PublicBrief } from "@/components/public-brief";

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="text-[13px] text-ink-3 font-mono">Loading…</div>
          </div>
        }
      >
        <PublicBrief />
      </Suspense>
      <MarketingFooter />
    </div>
  );
}
