import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { THEMES } from "@/lib/mock-data";

export default function Landing() {
  const theme = THEMES[0];
  const prev = Math.round(theme.prevalence * 100);
  const quote = theme.quotes[0];

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section className="flex-1">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 pt-24 pb-20 md:pt-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-16">
            <div>
              <div className="label">Customer-research synthesis</div>
              <h1 className="display mt-5 text-[64px] leading-[0.96] tracking-[-0.018em] md:text-[96px]">
                Transcripts in.{" "}
                <span className="display-italic" style={{ color: "var(--accent)" }}>
                  Themes out.
                </span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.65] text-ink-2">
                Drop a folder of transcripts. Chorus clusters the themes and shows the quote behind every claim.
              </p>
              <div className="mt-8">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-[14px] rounded-[3px] hover:bg-ink-2 transition-colors"
                >
                  Open a study
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="border border-line bg-card rounded-[4px] p-5">
              <div className="flex items-baseline justify-between">
                <span className="mono text-[10px] text-ink-3 tracking-[0.12em]">
                  THEME · {prev}% OF PARTICIPANTS
                </span>
                <span
                  aria-hidden
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </div>
              <div className="display mt-2 text-[18px] leading-tight text-ink">
                {theme.name}.
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-ink-2">
                {theme.summary}
              </p>
              <blockquote
                className="mt-3 border-l-2 pl-3 py-1 text-[12px] leading-[1.55] italic text-ink"
                style={{ borderColor: "var(--accent)" }}
              >
                &ldquo;{quote.text.slice(0, 140)}{quote.text.length > 140 ? "…" : ""}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        <div className="border-y border-line">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Step n="01" verb="Upload" detail="Transcripts, any length" />
            <Step n="02" verb="Cluster" detail="Themes by quote, not by vibes" />
            <Step n="03" verb="Cite" detail="Every claim → its moment" />
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Step({ n, verb, detail }: { n: string; verb: string; detail: string }) {
  return (
    <div>
      <div className="mono text-[10.5px] text-ink-3 tracking-[0.16em]">{n}</div>
      <div className="display mt-1 text-[26px] leading-none text-ink">{verb}.</div>
      <div className="mt-1 text-[13px] text-ink-2">{detail}</div>
    </div>
  );
}
