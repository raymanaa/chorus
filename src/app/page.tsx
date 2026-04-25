import { FileText, Layers, Quote, Users } from "lucide-react";
import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section className="relative overflow-hidden px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-6">
            <span
              aria-hidden
              className="h-[7px] w-[7px] rounded-sm bg-[color:var(--accent)]"
            />
            <span className="mono-small">Alpha · portfolio project</span>
          </div>

          <h1 className="quote text-[46px] leading-[1.03] tracking-[-0.022em] text-ink max-w-[840px] md:text-[68px]">
            30 interviews.{" "}
            <span className="quote-italic text-[color:var(--accent)]">
              Five themes.
            </span>{" "}
            Ten minutes.
          </h1>

          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-ink-2 md:text-[17px]">
            Chorus reads your interview transcripts and extracts the themes
            worth shipping — with verbatim quotes from every participant that
            said it. For product teams, founding teams, and UX researchers who
            do this weekly and don't have a week to spare.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="group flex items-center gap-1.5 rounded-md bg-ink text-paper px-5 py-2.5 text-[14px] font-medium hover:bg-[color:var(--ink-2)] transition-colors"
            >
              <span>Open the studio</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/brief/?c=demo"
              className="flex items-center gap-1.5 rounded-md border border-line bg-card px-5 py-2.5 text-[14px] font-medium text-ink-2 hover:border-line-2 hover:text-ink transition-colors"
            >
              <span>See a sample brief</span>
            </Link>
          </div>

          <figure className="mt-20 rounded-2xl border border-line bg-card px-8 py-10 md:px-14 md:py-14 relative">
            <Quote
              aria-hidden
              className="absolute -top-3 left-10 h-6 w-6 text-[color:var(--accent)] bg-paper p-1 rounded"
              strokeWidth={2}
            />
            <blockquote className="quote-italic text-[24px] md:text-[28px] leading-[1.35] tracking-[-0.01em] text-ink max-w-[720px]">
              "I thought the sample data was my data and was looking for how
              to delete it. Lost 20 minutes on that alone. Label your
              fixtures."
            </blockquote>
            <figcaption className="mt-5 text-[12.5px] text-ink-3 font-mono">
              Chen Wei · Product Manager · Canvas ·{" "}
              <span className="text-[color:var(--accent)]">
                quoted in "Sample data indistinguishable from real data"
              </span>
            </figcaption>
          </figure>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--accent) 5%, transparent) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 70% 45% at 50% 20%, black 30%, transparent 75%)",
          }}
        />
      </section>

      <section className="border-t border-line bg-paper-2 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-[620px]">
            <div className="mono-small">How it works</div>
            <h2 className="quote mt-3 text-[32px] leading-[1.12] tracking-[-0.02em] text-ink md:text-[40px]">
              Four steps, from{" "}
              <span className="quote-italic text-[color:var(--accent)]">
                pile
              </span>{" "}
              to{" "}
              <span className="quote-italic text-[color:var(--accent)]">
                ship.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Step n="01" icon={FileText} title="Upload transcripts" body="Paste or drop 5–50 transcripts. Zoom, Gong, Otter, or plain text." />
            <Step n="02" icon={Users} title="Segment automatically" body="Participants tagged by role, company size, and custom dimensions." />
            <Step n="03" icon={Layers} title="Extract themes" body="Gemini 2.5 Pro reads every transcript and surfaces themes with prevalence and intensity per segment." />
            <Step n="04" icon={Quote} title="Share the brief" body="A polished read-only URL your team, exec staff, and stakeholders can open without an account." />
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="quote text-[36px] leading-[1.1] tracking-[-0.02em] text-ink md:text-[48px]">
            Your research{" "}
            <span className="quote-italic text-[color:var(--accent)]">
              deserves shipping.
            </span>
          </h2>
          <p className="mt-5 max-w-[520px] mx-auto text-[14.5px] leading-[1.7] text-ink-2">
            The alpha is seeded with a real-feeling onboarding study, a
            pricing study mid-analysis, and an enterprise-gaps study still
            collecting transcripts.
          </p>
          <div className="mt-8">
            <Link
              href="/app"
              className="group inline-flex items-center gap-1.5 rounded-md bg-ink text-paper px-6 py-3 text-[14px] font-medium hover:bg-[color:var(--ink-2)] transition-colors"
            >
              <span>Open the studio</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: string;
  icon: typeof FileText;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-card px-5 py-5 transition-colors hover:border-line-2">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-[color:var(--accent)]">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="font-mono text-[10.5px] text-ink-3 tabular-nums">
          {n}
        </span>
      </div>
      <h3 className="display mt-5 text-[17px] leading-[1.2] text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[12.5px] leading-[1.7] text-ink-2">{body}</p>
    </div>
  );
}
