import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { STUDIES, THEMES } from "@/lib/mock-data";

export default function Landing() {
  const theme = THEMES[0];
  const prev = Math.round(theme.prevalence * 100);
  const quote = theme.quotes[0];
  const studies = STUDIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section>
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 pt-24 pb-20 md:pt-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-16">
            <div>
              <div className="label">Customer-research synthesis</div>
              <h1 className="display mt-5 text-[64px] leading-[0.96] tracking-[-0.018em] md:text-[96px]">
                Transcripts in.{" "}
                <span className="display-italic" style={{ color: "var(--accent)" }}>Themes out.</span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.65] text-ink-2">
                Drop a folder of transcripts. Chorus clusters the themes and shows the quote behind every claim.
              </p>
              <div className="mt-8">
                <Link href="/app" className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-[14px] rounded-[3px] hover:bg-ink-2 transition-colors">
                  Open a study
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <div className="border border-line bg-card rounded-[4px] p-5">
              <div className="flex items-baseline justify-between">
                <span className="mono text-[10px] text-ink-3 tracking-[0.12em]">THEME · {prev}% OF PARTICIPANTS</span>
                <span aria-hidden className="h-[8px] w-[8px] rounded-full" style={{ background: "var(--accent)" }} />
              </div>
              <div className="display mt-2 text-[18px] leading-tight text-ink">{theme.name}.</div>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-ink-2">{theme.summary}</p>
              <blockquote className="mt-3 border-l-2 pl-3 py-1 text-[12px] leading-[1.55] italic text-ink" style={{ borderColor: "var(--accent)" }}>
                &ldquo;{quote.text.slice(0, 140)}{quote.text.length > 140 ? "…" : ""}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat n="any length" label="Transcripts: 20 min to 2 hours" />
          <Stat n="every" label="Theme cites its founding quote" />
          <Stat n="by segment" label="Intensity per persona, not just count" />
          <Stat n="0" label="Invented statements attributed to users" />
        </div>
      </section>

      <Section label="The vibes problem">
        <p className="display-italic text-[30px] leading-[1.25] text-ink max-w-[34ch] md:text-[42px]">
          Research tools collapse transcripts into vibes, not themes.
        </p>
        <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.7] text-ink-2">
          Summaries strip out the specific sentence that mattered. Tags reduce a week of interviews to a word cloud. Chorus clusters by the quote and keeps the quote — every theme points at the specific moment it came from, so the brief is defensible when the PM pushes back.
        </p>
      </Section>

      <Section label="How a study becomes a brief">
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <Move n="01" verb="Upload" detail="Transcripts, recordings, or notes. Participant metadata optional but improves segment breakdown." />
          <Move n="02" verb="Cluster" detail="Quotes first, not topics. Themes emerge bottom-up from quote similarity, not from a taxonomy you hand in." />
          <Move n="03" verb="Quantify" detail="Prevalence and per-segment intensity on every theme. The brief knows which personas cared." />
          <Move n="04" verb="Cite" detail="Every sentence in the synthesis points at its founding quote with one click." />
          <Move n="05" verb="Share" detail="A shareable brief URL. Your PM clicks a theme; Chorus opens the transcript at the moment." />
        </ol>
      </Section>

      <Section label="Three things only Chorus does">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature title="Quote-first themes." body="Themes are clusters of quotes, not tags. A theme without at least three cited quotes does not exist in Chorus." />
          <Feature title="Segment intensity, not just count." body="Knowing 67% of participants mentioned it isn&apos;t enough. Chorus tells you which personas mentioned it hardest." />
          <Feature title="Readable by a PM, defensible to a CEO." body="The brief is prose. The citations are one click. You can hand it to either reader." />
        </div>
      </Section>

      <Section label="Made for">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px] leading-[1.65] text-ink-2">
          <Persona title="The research lead">Runs 3 studies a quarter. Needs the synthesis to be reproducible and the evidence chain auditable.</Persona>
          <Persona title="The PM">Reads a lot of briefs. Wants the click-to-quote so when a finding feels strange, the evidence is one scroll away.</Persona>
          <Persona title="The UX designer">Wants the themes to live with the transcripts, not in a separate deck that drifts by week two.</Persona>
        </ul>
      </Section>

      <Section label="Studies this quarter" right={<Link href="/app" className="mono text-[11px] text-ink-3 hover:text-ink transition-colors">all studies →</Link>}>
        <ul className="border-y border-line divide-y divide-line">
          {studies.map((s) => (
            <li key={s.id}>
              <Link href="/app" className="group grid grid-cols-[auto_1fr_auto] gap-5 py-4 items-baseline hover:bg-paper-2/40 transition-colors px-1">
                <span className="mono text-[10px] tracking-[0.14em] text-ink-3">{s.status.toUpperCase()}</span>
                <div>
                  <div className="display text-[18px] text-ink leading-tight">{s.name}.</div>
                  <div className="text-[11.5px] text-ink-3 mt-0.5">{s.participantCount} participants · {s.themeCount} themes · {s.createdAt}</div>
                </div>
                <span className="mono text-[10.5px] text-ink-3 group-hover:text-ink">open →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16">
        <blockquote className="border-l-2 pl-6 max-w-[60ch]" style={{ borderColor: "var(--accent)" }}>
          <p className="display-italic text-[28px] leading-[1.3] text-ink md:text-[34px]">
            &ldquo;The themes I built by hand in two weeks, Chorus found in an afternoon — with the quotes I would have cited anyway.&rdquo;
          </p>
          <footer className="mt-4 smallcaps mono text-[11px] text-ink-3 tracking-[0.14em]">
            — S. Iversen · research lead · &lt;pilot · not a customer&gt;
          </footer>
        </blockquote>
      </section>

      <Section label="Questions">
        <dl className="divide-y divide-line border-y border-line">
          <Faq q="What formats are accepted?">Plain-text transcripts, SRT/VTT, and audio/video (transcribed on ingest). Metadata as CSV or Airtable import.</Faq>
          <Faq q="Is the synthesis trustworthy?">Every claim in the synthesis is pinned to at least one quote. If the quote doesn&apos;t say it, the claim can&apos;t appear.</Faq>
          <Faq q="What about participant privacy?">Participant names can be redacted at upload. The brief can be shared publicly without re-exposing them.</Faq>
          <Faq q="Do you integrate with research repositories?">Dovetail and Condens exports in v0.9. Write-back is tracked in /changelog.</Faq>
          <Faq q="What languages?">English and Spanish at v0.9. Mixed-language transcripts are handled per-utterance.</Faq>
        </dl>
      </Section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-20 text-center">
          <div className="label">Next study</div>
          <h2 className="display mt-3 text-[40px] leading-[1.05] tracking-[-0.018em] text-ink md:text-[54px]">
            Clustered.{" "}
            <span className="display-italic" style={{ color: "var(--accent)" }}>With quotes.</span>
          </h2>
          <div className="mt-8">
            <Link href="/app" className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-[14px] rounded-[3px] hover:bg-ink-2 transition-colors">
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

function Section({ label, right, children }: { label: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-16">
        <div className="flex items-baseline justify-between border-b border-line pb-3 mb-8">
          <span className="label">{label}</span>
          {right}
        </div>
        {children}
      </div>
    </section>
  );
}
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="display text-[28px] leading-none tabular-nums text-ink md:text-[32px]">{n}</div>
      <div className="mt-2 text-[11.5px] leading-[1.45] text-ink-3 max-w-[28ch]">{label}</div>
    </div>
  );
}
function Move({ n, verb, detail }: { n: string; verb: string; detail: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
      <span className="mono text-[11px] text-ink-3 tabular-nums tracking-[0.16em]">{n}</span>
      <div>
        <div className="display text-[22px] leading-none text-ink">{verb}.</div>
        <div className="mt-1 text-[13.5px] leading-[1.6] text-ink-2 max-w-[40ch]">{detail}</div>
      </div>
    </li>
  );
}
function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="display text-[20px] leading-[1.2] text-ink">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-[1.65] text-ink-2 max-w-[36ch]">{body}</p>
    </div>
  );
}
function Persona({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="border-t-2 border-ink pt-3">
      <div className="display text-[18px] leading-tight text-ink">{title}</div>
      <p className="mt-2 max-w-[36ch]">{children}</p>
    </li>
  );
}
function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-10 py-5">
      <dt className="display text-[17px] text-ink leading-tight">{q}</dt>
      <dd className="text-[14px] leading-[1.7] text-ink-2 max-w-[62ch]">{children}</dd>
    </div>
  );
}
