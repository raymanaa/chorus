"use client";

import { Printer, Quote as QuoteIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { decodeShareable } from "@/lib/share";

// Demo payload for /brief/?c=demo (so the landing CTA has something to show)
const DEMO_ENCODED = ""; // intentionally empty; falls through to demo data below

type DemoTheme = {
  id: string;
  name: string;
  summary: string;
  prevalence: number;
  implication: string;
  firstQuote: { text: string; name: string; role: string; company: string };
};

const DEMO: {
  studyName: string;
  studyDescription: string;
  participants: number;
  transcripts: number;
  themes: DemoTheme[];
} = {
  studyName: "Onboarding friction — Q2",
  studyDescription:
    "Why new-signup to first-value is taking too long. 12 customers across Pro and Team plans.",
  participants: 12,
  transcripts: 12,
  themes: [
    {
      id: "th-terminology",
      name: "Inconsistent terminology blocks non-technical users",
      summary:
        "Designers, PMs, and ops users consistently stall on overlapping terms like 'project', 'workspace', 'team', and 'space'. Engineers barely notice; everyone else treats it as a wall.",
      prevalence: 0.67,
      implication:
        "Rename or consolidate: pick one. Add a 'concepts' page to the docs root and link to it from every 'new <thing>' button.",
      firstQuote: {
        text:
          "For someone like me — I'm a designer, not a dev — the terminology is a wall. 'Workspace' vs 'project' vs 'team' — same thing three times.",
        name: "Lin Takahashi",
        role: "Design Lead",
        company: "Orbit",
      },
    },
    {
      id: "th-quiet-failure",
      name: "Silent failures in cross-user flows kill momentum",
      summary:
        "Invites, SSO setup, and data imports fail quietly. No email, no error, no nudge. Users discover failures days later and conclude the product is flaky.",
      prevalence: 0.5,
      implication:
        "Add retry + delivery receipts to invites and imports. Surface any pending-outbox state visibly on the workspace dashboard.",
      firstQuote: {
        text:
          "The invite flow quietly failed — no email, no error. They joined a week later when I re-sent.",
        name: "Jules Moreau",
        role: "Design Engineer",
        company: "Plateau",
      },
    },
    {
      id: "th-docs-drift",
      name: "Docs claim '5 minutes'; reality is 3–9 days",
      summary:
        "Every single participant cited a gap between the marketing/docs promise and lived experience. Trust erodes fastest in the first 48 hours.",
      prevalence: 0.83,
      implication:
        "Recalibrate the marketing promise. Quote realistic setup times per tier. Offer a 'get me to first-value' concierge option for Team+.",
      firstQuote: {
        text:
          "I signed up expecting to be running by the weekend — it took nine days. The docs say '5 minutes' and then you hit the SSO dance and all the side quests.",
        name: "Maya Alves",
        role: "CTO",
        company: "Thatch",
      },
    },
  ],
};

export function PublicBrief() {
  const searchParams = useSearchParams();
  const c = searchParams.get("c");

  // Attempt to decode; fall back to DEMO for ?c=demo or no param (landing CTA preview)
  const decoded = useMemo(() => {
    if (!c || c === "demo") return null;
    return decodeShareable(c);
  }, [c]);

  // If no param at all, show intro state (rare; landing links to ?c=demo)
  if (!c) {
    return <IntroState />;
  }

  if (decoded) {
    return (
      <article className="flex-1 px-6 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mono-small">
            Stakeholder brief · {decoded.study.participantCount} participants ·{" "}
            {decoded.study.transcriptCount} transcripts
          </div>
          <h1 className="quote mt-3 text-[40px] leading-[1.08] tracking-[-0.022em] text-ink md:text-[52px]">
            {decoded.study.name}
          </h1>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-ink-2">
            {decoded.study.description}
          </p>
          <PrintButton />

          <div className="mt-12 space-y-14">
            {decoded.themes.map((theme, i) => (
              <ThemeSection
                key={theme.id}
                index={i + 1}
                name={theme.name}
                summary={theme.summary}
                prevalence={theme.prevalence}
                implication={theme.implication}
                firstQuote={
                  theme.quotes[0] && {
                    text: theme.quotes[0].text,
                    name: theme.quotes[0].participant.name,
                    role: theme.quotes[0].participant.role,
                    company: theme.quotes[0].participant.company,
                  }
                }
              />
            ))}
          </div>

          <Footer exportedAt={decoded.exportedAt} />
        </div>
      </article>
    );
  }

  // Demo / invalid → use DEMO
  return (
    <article className="flex-1 px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mono-small">
          Sample brief · {DEMO.participants} participants ·{" "}
          {DEMO.transcripts} transcripts
        </div>
        <h1 className="quote mt-3 text-[40px] leading-[1.08] tracking-[-0.022em] text-ink md:text-[52px]">
          {DEMO.studyName}
        </h1>
        <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-ink-2">
          {DEMO.studyDescription}
        </p>
        <p className="mt-2 text-[11.5px] text-ink-3 font-mono">
          This is a sample brief. Generate your own from the{" "}
          <Link href="/app" className="text-[color:var(--accent)] hover:underline">
            studio
          </Link>
          .
        </p>
        <PrintButton />

        <div className="mt-12 space-y-14">
          {DEMO.themes.map((theme, i) => (
            <ThemeSection
              key={theme.id}
              index={i + 1}
              name={theme.name}
              summary={theme.summary}
              prevalence={theme.prevalence}
              implication={theme.implication}
              firstQuote={theme.firstQuote}
            />
          ))}
        </div>

        <Footer />
      </div>
    </article>
  );
}

function ThemeSection({
  index,
  name,
  summary,
  prevalence,
  implication,
  firstQuote,
}: {
  index: number;
  name: string;
  summary: string;
  prevalence: number;
  implication: string;
  firstQuote?: {
    text: string;
    name: string;
    role: string;
    company: string;
  };
}) {
  const pct = Math.round(prevalence * 100);
  return (
    <section>
      <div className="flex items-center gap-4 font-mono text-[11px] text-ink-3">
        <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
        <span className="uppercase tracking-[0.14em]">Prevalence</span>
        <span className="display text-[13px] text-ink">{pct}%</span>
        <div className="relative h-[4px] w-20 overflow-hidden rounded-full bg-line">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[color:var(--accent)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <h2 className="quote mt-3 text-[26px] leading-[1.2] tracking-[-0.015em] text-ink md:text-[30px]">
        {name}
      </h2>
      <p className="mt-3 text-[14.5px] leading-[1.75] text-ink-2">{summary}</p>
      <div className="mt-5 rounded-md bg-accent-soft px-4 py-3 border-l-2 border-[color:var(--accent)]">
        <div className="mono-small text-[color:var(--accent-strong)]">
          Implication
        </div>
        <p className="mt-1 text-[13.5px] leading-[1.7] text-ink">
          {implication}
        </p>
      </div>
      {firstQuote && (
        <figure className="mt-6 relative pl-6 border-l-[3px] border-line-2">
          <QuoteIcon
            aria-hidden
            className="absolute -left-[11px] top-0 h-4 w-4 bg-paper text-[color:var(--accent)]"
            strokeWidth={2}
          />
          <blockquote className="quote-italic text-[19px] leading-[1.55] text-ink">
            "{firstQuote.text}"
          </blockquote>
          <figcaption className="mt-2 text-[11.5px] text-ink-3 font-mono">
            {firstQuote.name} · {firstQuote.role} · {firstQuote.company}
          </figcaption>
        </figure>
      )}
    </section>
  );
}

function PrintButton() {
  return (
    <div className="mt-6 print:hidden">
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-[12.5px] text-ink-2 hover:border-ink-3 hover:text-ink transition-colors"
      >
        <Printer className="h-3.5 w-3.5" strokeWidth={2} />
        <span>Print / export PDF</span>
      </button>
    </div>
  );
}

function Footer({ exportedAt }: { exportedAt?: number }) {
  return (
    <div className="mt-14 rounded-xl border border-line bg-paper-2 px-6 py-5">
      <div className="mono-small">Signed</div>
      <div className="mt-1 font-mono text-[12px] text-ink-2">
        Produced by Chorus · {exportedAt ? new Date(exportedAt).toISOString() : "sample brief"}
      </div>
      <p className="mt-2 text-[11.5px] leading-[1.65] text-ink-3">
        Every theme is backed by verbatim transcript evidence. Prevalence is
        computed as fraction of interviewed participants who raised the theme
        unprompted. For the live studio,{" "}
        <Link href="/app" className="underline hover:text-ink-2">
          open Chorus
        </Link>
        .
      </p>
    </div>
  );
}

function IntroState() {
  return (
    <div className="flex-1 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="quote text-[34px] leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px]">
          A stakeholder brief lives at this URL.
        </h1>
        <p className="mt-4 text-[14px] leading-[1.7] text-ink-2">
          Add <span className="font-mono text-[12px]">?c=…</span> to render a
          shared synthesis. Generate one from the studio's Share button.
        </p>
        <div className="mt-6">
          <Link
            href="/app"
            className="group inline-flex items-center gap-1.5 rounded-md bg-ink text-paper px-5 py-2.5 text-[13.5px] font-medium hover:bg-[color:var(--ink-2)] transition-colors"
          >
            Open the studio
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Quiet unused demo encoded string
void DEMO_ENCODED;
