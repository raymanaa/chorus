/**
 * Chorus landing — friendly blocktile (grammar inspired by Notion's landing).
 *
 * Warm off-white. Big approachable display serif with a decorative dot
 * inline. A vertical stack of rounded-corner cards of varying widths,
 * each a "block" — theme card, quote card, citation card, prevalence
 * card. Friendly voice, generous breathing room.
 */
import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { PARTICIPANTS, STUDIES, THEMES } from "@/lib/mock-data";

export default function Landing() {
  const theme = THEMES[0];
  const prev = Math.round(theme.prevalence * 100);
  const quote = theme.quotes[0];
  const speaker = PARTICIPANTS.find((p) => p.id === quote.participantId);
  const study = STUDIES.find((s) => s.id === theme.studyId);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <MarketingNav />

      {/* Hero */}
      <section className="mx-auto max-w-[980px] px-6 pt-24 pb-12 md:px-10 md:pt-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[12px] text-ink-2">
          <span
            aria-hidden
            className="h-[7px] w-[7px] rounded-full"
            style={{ background: "var(--accent)" }}
          />
          Customer-research synthesis
        </div>

        <h1 className="display mt-6 text-[64px] leading-[1.02] tracking-[-0.014em] text-ink md:text-[108px]">
          Research that{" "}
          <span
            aria-hidden
            className="inline-block align-middle h-[0.55em] w-[0.55em] rounded-full mx-1 -translate-y-[0.05em]"
            style={{ background: "var(--accent)" }}
          />
          <span className="display-italic">sings.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-[46ch] text-[17px] leading-[1.6] text-ink-2">
          Drop a folder of transcripts. Chorus clusters the themes, shows the quote behind every claim, and hands you a brief you&apos;d actually send to your PM.
        </p>

        <div className="mt-9 flex items-center justify-center gap-3">
          <Link
            href="/app"
            className="rounded-full bg-ink text-paper px-6 py-3 text-[14px] font-medium hover:bg-ink-2 transition-colors shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)]"
          >
            Open a study
          </Link>
          <Link
            href="/brief"
            className="rounded-full border border-line bg-card px-5 py-3 text-[14px] text-ink-2 hover:border-line-2 hover:text-ink transition-colors"
          >
            Read a sample brief
          </Link>
        </div>
      </section>

      {/* Stack of friendly blocks */}
      <section className="mx-auto max-w-[980px] px-6 md:px-10 py-16">
        <div className="flex flex-col gap-5">
          {/* Theme block */}
          <div
            className="rounded-[20px] border border-line p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            style={{ background: "var(--card)" }}
          >
            <div className="flex items-baseline gap-2 text-[12px] text-ink-3">
              <span
                aria-hidden
                className="h-[7px] w-[7px] rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span className="smallcaps tracking-[0.18em]">Theme</span>
              <span className="mono">· {prev}% of participants</span>
              <span className="ml-auto mono text-ink-3">{study?.name}</span>
            </div>
            <div className="display mt-3 text-[26px] leading-[1.2] text-ink md:text-[30px]">
              {theme.name}.
            </div>
            <p className="mt-2 text-[14px] leading-[1.65] text-ink-2 max-w-[62ch]">
              {theme.summary}
            </p>
          </div>

          {/* Quote block */}
          <div
            className="rounded-[20px] border p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            style={{
              background: "var(--accent-soft, rgba(0,0,0,0.03))",
              borderColor: "var(--accent)",
            }}
          >
            <div className="smallcaps text-[11px] tracking-[0.18em]" style={{ color: "var(--accent)" }}>
              A quote behind the claim
            </div>
            <blockquote className="display-italic mt-3 text-[22px] leading-[1.4] text-ink md:text-[26px]">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-ink-2">
              <span
                aria-hidden
                className="h-6 w-6 rounded-full flex items-center justify-center font-semibold text-[11px]"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                {speaker?.name.charAt(0)}
              </span>
              <span className="mono uppercase tracking-[0.08em] text-ink">
                {speaker?.name}
              </span>
              <span className="text-ink-3">·</span>
              <span>{speaker?.role}, {speaker?.company}</span>
            </div>
          </div>

          {/* Two side-by-side friendly blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="rounded-[20px] border border-line p-6"
              style={{ background: "var(--card)" }}
            >
              <div className="smallcaps text-[11px] tracking-[0.18em] text-ink-3">
                Prevalence, by segment
              </div>
              <ul className="mt-3 space-y-2.5 text-[12.5px]">
                {theme.segments.map((s) => (
                  <li key={s.segment}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-ink uppercase tracking-[0.08em] text-[11px]">
                        {s.segment}
                      </span>
                      <span className="mono text-ink-3 tabular-nums">
                        {Math.round(s.intensity * 100)}%
                      </span>
                    </div>
                    <div className="mt-1 h-[4px] rounded-full" style={{ background: "var(--line)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.round(s.intensity * 100)}%`, background: "var(--accent)" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-[20px] border border-line p-6"
              style={{ background: "var(--card)" }}
            >
              <div className="smallcaps text-[11px] tracking-[0.18em] text-ink-3">
                Implication
              </div>
              <p className="display-italic mt-3 text-[17px] leading-[1.45] text-ink">
                {theme.implication}
              </p>
              <div className="mt-5 flex items-baseline gap-2 text-[11px] text-ink-3">
                <span
                  aria-hidden
                  className="h-[6px] w-[6px] rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span className="mono">1 of 5 themes · {study?.themeCount} total</span>
              </div>
            </div>
          </div>

          {/* Friendly CTA block */}
          <div
            className="rounded-[20px] border-2 p-6 text-center"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="display text-[22px] leading-tight text-ink">
              Your transcripts, clustered by Monday.
            </div>
            <Link
              href="/app"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] hover:bg-ink-2 transition-colors"
            >
              Open a study
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
