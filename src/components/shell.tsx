"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Circle,
  CircleDot,
  Copy,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Link2,
  Quote as QuoteIcon,
  ShareIcon,
  Users,
  Waves,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { encodeShareable, type ShareableBrief } from "@/lib/share";
import {
  getStudy,
  participantById,
  PARTICIPANTS,
  STUDIES,
  segmentColor,
  segmentLabel,
  sentimentTone,
  themesForStudy,
  transcriptsForStudy,
  type Quote,
  type Segment,
  type Study,
  type Theme,
  type Transcript,
} from "@/lib/mock-data";

type StudyTab = "transcripts" | "themes" | "brief";

export function Shell() {
  const [activeStudyId, setActiveStudyId] = useState<string>(STUDIES[0].id);
  const [activeTab, setActiveTab] = useState<StudyTab>("themes");
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const study = useMemo(
    () => getStudy(activeStudyId) ?? STUDIES[0],
    [activeStudyId],
  );
  const transcripts = useMemo(
    () => transcriptsForStudy(activeStudyId),
    [activeStudyId],
  );
  const themes = useMemo(
    () => themesForStudy(activeStudyId),
    [activeStudyId],
  );

  function selectStudy(id: string) {
    setActiveStudyId(id);
    setSelectedThemeId(null);
  }

  return (
    <div className="flex h-full w-full bg-paper text-ink">
      <StudiesNav
        activeStudyId={activeStudyId}
        onSelectStudy={selectStudy}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <StudyHeader study={study} />
        <StudyTabs
          active={activeTab}
          onChange={(t) => {
            setActiveTab(t);
            setSelectedThemeId(null);
          }}
          counts={{
            transcripts: transcripts.length,
            themes: themes.length,
          }}
        />

        <div className="flex flex-1 min-h-0">
          {activeTab === "transcripts" && (
            <TranscriptsView transcripts={transcripts} />
          )}
          {activeTab === "themes" && (
            <ThemesView
              themes={themes}
              selectedThemeId={selectedThemeId}
              onSelect={setSelectedThemeId}
              study={study}
              transcripts={transcripts}
            />
          )}
          {activeTab === "brief" && (
            <BriefView study={study} themes={themes} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Studies sidebar ---------- */

function StudiesNav({
  activeStudyId,
  onSelectStudy,
}: {
  activeStudyId: string;
  onSelectStudy: (id: string) => void;
}) {
  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-line bg-paper">
      <div className="px-5 pt-5 pb-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft text-[color:var(--accent)]"
          >
            <Waves className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="display text-[16px] leading-none text-ink">
            Chorus
          </span>
          <span className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.22em]">
            α
          </span>
        </Link>
        <p className="mt-2 text-[11.5px] leading-[1.5] text-ink-3">
          Research synthesis
        </p>
      </div>
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-t border-line">
        <span className="mono-small">Studies</span>
        <span className="font-mono text-[10.5px] text-ink-3">
          {STUDIES.length}
        </span>
      </div>
      <nav className="flex flex-col px-2 py-1">
        {STUDIES.map((s) => {
          const active = s.id === activeStudyId;
          return (
            <button
              key={s.id}
              onClick={() => onSelectStudy(s.id)}
              className={[
                "group relative mx-0 mb-0.5 flex items-start gap-2.5 rounded-md px-3 py-2.5 text-left transition-colors",
                active
                  ? "bg-card shadow-[0_0_0_1px_var(--line)]"
                  : "hover:bg-paper-2",
              ].join(" ")}
            >
              <StudyStatusDot status={s.status} active={active} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-ink truncate">
                  {s.name}
                </div>
                <div className="text-[10.5px] text-ink-3 truncate font-mono">
                  {s.participantCount} int · {s.themeCount} themes ·{" "}
                  {s.status}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-line px-5 py-4">
        <p className="text-[11px] text-ink-3 leading-[1.6]">
          New studies arrive with a quick intake. Upload transcripts; Chorus
          segments participants and extracts themes.
        </p>
      </div>
    </aside>
  );
}

function StudyStatusDot({
  status,
  active,
}: {
  status: Study["status"];
  active: boolean;
}) {
  const color =
    status === "shipped"
      ? "var(--accent)"
      : status === "analyzing"
        ? "var(--gold)"
        : "var(--ink-3)";
  return (
    <span className="mt-[5px] shrink-0" aria-hidden>
      {status === "collecting" ? (
        <Circle
          className="h-[10px] w-[10px]"
          strokeWidth={2}
          style={{ color: active ? color : "var(--ink-4)" }}
        />
      ) : (
        <CircleDot
          className="h-[10px] w-[10px]"
          strokeWidth={2}
          style={{ color }}
        />
      )}
    </span>
  );
}

/* ---------- Study header & tabs ---------- */

function StudyHeader({ study }: { study: Study }) {
  return (
    <header className="shrink-0 border-b border-line px-8 pt-5">
      <div className="flex items-center gap-2 mono-small">
        <Link href="/" className="hover:text-ink-2">
          Chorus
        </Link>
        <ChevronRight className="h-2.5 w-2.5" strokeWidth={2} />
        <span>Studies</span>
      </div>
      <h1 className="mt-2 quote text-[28px] leading-[1.15] tracking-[-0.018em] text-ink">
        {study.name}
      </h1>
      <p className="mt-1 max-w-[720px] text-[13px] leading-[1.65] text-ink-2">
        {study.description}
      </p>
      <div className="mt-3 flex items-center gap-4 pb-4 text-[11.5px] text-ink-3">
        <span>{study.participantCount} participants</span>
        <span aria-hidden>·</span>
        <span>{study.transcriptCount} transcripts</span>
        <span aria-hidden>·</span>
        <span>{study.themeCount} themes</span>
        <span aria-hidden>·</span>
        <span className="font-mono">Created {study.createdAt}</span>
      </div>
    </header>
  );
}

function StudyTabs({
  active,
  onChange,
  counts,
}: {
  active: StudyTab;
  onChange: (t: StudyTab) => void;
  counts: { transcripts: number; themes: number };
}) {
  const TABS: {
    id: StudyTab;
    label: string;
    icon: typeof FileText;
    count?: number;
  }[] = [
    {
      id: "transcripts",
      label: "Transcripts",
      icon: FileText,
      count: counts.transcripts,
    },
    {
      id: "themes",
      label: "Themes",
      icon: Layers,
      count: counts.themes,
    },
    { id: "brief", label: "Brief", icon: BookOpen },
  ];
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-line px-8 bg-paper">
      <div className="flex items-center gap-1">
        {TABS.map((t) => {
          const isActive = active === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={[
                "relative flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors",
                isActive ? "text-ink" : "text-ink-2 hover:text-ink",
              ].join(" ")}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="font-medium">{t.label}</span>
              {t.count !== undefined && (
                <span className="font-mono text-[10.5px] tabular-nums text-ink-3">
                  {t.count}
                </span>
              )}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Transcripts tab ---------- */

function TranscriptsView({ transcripts }: { transcripts: Transcript[] }) {
  if (transcripts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-10 text-center">
        <div className="max-w-md">
          <FileText
            className="mx-auto h-6 w-6 text-ink-3 mb-3"
            strokeWidth={1.75}
          />
          <h3 className="display text-[18px] text-ink">No transcripts yet.</h3>
          <p className="mt-2 text-[12.5px] text-ink-2">
            Drop .txt, .srt, or .vtt files here or paste directly. Chorus will
            segment participants and queue theme extraction.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <div className="mx-auto max-w-[940px] space-y-3">
        {transcripts.map((t) => {
          const p = participantById(t.participantId);
          return (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0, 0.2, 1] }}
              className="rounded-xl border border-line bg-card px-5 py-4 transition-shadow hover:shadow-[0_2px_12px_rgba(23,23,26,0.04)]"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {p && <ParticipantTag participant={p} />}
                    <span className="font-mono text-[10.5px] text-ink-3">
                      {t.duration}
                    </span>
                    <span aria-hidden className="text-ink-4">
                      ·
                    </span>
                    <span className="font-mono text-[10.5px] text-ink-3">
                      {t.recordedAt}
                    </span>
                  </div>
                  <blockquote className="mt-2.5 quote-italic text-[16px] leading-[1.6] text-ink max-w-[720px]">
                    "{t.excerpt}"
                  </blockquote>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-paper-2 px-1.5 py-0.5 font-mono text-[10.5px] text-ink-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-ink-3 shrink-0 mt-1" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function ParticipantTag({
  participant,
}: {
  participant: (typeof PARTICIPANTS)[number];
}) {
  const color = segmentColor(participant.segment);
  const initials = participant.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="inline-flex items-center gap-2 text-[12px]">
      <span
        aria-hidden
        className="inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-semibold text-paper"
        style={{ background: color }}
      >
        {initials}
      </span>
      <span className="font-medium text-ink">{participant.name}</span>
      <span className="text-ink-3 text-[11.5px]">
        {participant.role} · {participant.company}
      </span>
    </span>
  );
}

/* ---------- Themes tab ---------- */

function ThemesView({
  themes,
  selectedThemeId,
  onSelect,
  study,
  transcripts,
}: {
  themes: Theme[];
  selectedThemeId: string | null;
  onSelect: (id: string | null) => void;
  study: Study;
  transcripts: Transcript[];
}) {
  if (themes.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-10 text-center">
        <div className="max-w-md">
          <Layers
            className="mx-auto h-6 w-6 text-ink-3 mb-3"
            strokeWidth={1.75}
          />
          <h3 className="display text-[18px] text-ink">No themes yet.</h3>
          <p className="mt-2 text-[12.5px] text-ink-2">
            Chorus extracts themes after {Math.max(3, transcripts.length)} or
            more transcripts have been ingested. In alpha this is mocked —
            production runs Gemini 2.5 Pro per transcript and clusters with
            sentence embeddings.
          </p>
        </div>
      </div>
    );
  }

  const selected = themes.find((t) => t.id === selectedThemeId) ?? null;

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-[940px] space-y-3">
          {themes.map((t, i) => (
            <ThemeCard
              key={t.id}
              theme={t}
              index={i + 1}
              active={t.id === selectedThemeId}
              onSelect={() => onSelect(t.id === selectedThemeId ? null : t.id)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {selected && (
          <ThemePanel
            key={selected.id}
            theme={selected}
            study={study}
            onClose={() => onSelect(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeCard({
  theme,
  index,
  active,
  onSelect,
}: {
  theme: Theme;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onSelect}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.03 }}
      className={[
        "group block w-full text-left rounded-xl border bg-card px-6 py-5 transition-colors",
        active
          ? "border-[color:var(--accent)] shadow-[0_0_0_3px_var(--accent-soft)]"
          : "border-line hover:border-line-2",
      ].join(" ")}
    >
      <div className="flex items-start gap-5">
        <div className="font-mono text-[11px] text-ink-3 tabular-nums mt-1 w-5 shrink-0">
          {String(index).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="quote text-[20px] leading-[1.25] tracking-[-0.01em] text-ink">
            {theme.name}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-ink-2 max-w-[700px]">
            {theme.summary}
          </p>
          <div className="mt-3.5 flex flex-wrap items-center gap-4">
            <Prevalence value={theme.prevalence} />
            <SegmentBars segments={theme.segments} />
            <span className="font-mono text-[10.5px] text-ink-3 ml-auto">
              {theme.quotes.length} quote{theme.quotes.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Prevalence({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10.5px] text-ink-3 uppercase tracking-[0.14em]">
        Prevalence
      </span>
      <span className="display text-[14px] text-ink tabular-nums">
        {pct}%
      </span>
      <div className="relative h-[4px] w-20 overflow-hidden rounded-full bg-line">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[color:var(--accent)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SegmentBars({
  segments,
}: {
  segments: { segment: Segment; intensity: number }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10.5px] text-ink-3 uppercase tracking-[0.14em]">
        By segment
      </span>
      <div className="flex items-end gap-1 h-5">
        {segments.map((s) => {
          const h = Math.max(3, Math.round(s.intensity * 16));
          const color = segmentColor(s.segment);
          return (
            <div
              key={s.segment}
              className="flex flex-col items-center gap-0.5"
              title={`${segmentLabel(s.segment)} · ${Math.round(s.intensity * 100)}%`}
            >
              <span
                aria-hidden
                style={{ background: color, height: `${h}px`, width: "6px" }}
                className="rounded-sm"
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1 ml-1">
        {segments.map((s) => (
          <span
            key={s.segment}
            className="font-mono text-[9.5px] text-ink-3"
            title={segmentLabel(s.segment)}
          >
            {segmentLabel(s.segment).slice(0, 3).toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Theme panel (evidence quotes) ---------- */

function ThemePanel({
  theme,
  study,
  onClose,
}: {
  theme: Theme;
  study: Study;
  onClose: () => void;
}) {
  // Group quotes by segment
  const byParticipant = useMemo(() => {
    const groups = new Map<Segment, Quote[]>();
    for (const q of theme.quotes) {
      const p = participantById(q.participantId);
      if (!p) continue;
      const arr = groups.get(p.segment) ?? [];
      arr.push(q);
      groups.set(p.segment, arr);
    }
    return Array.from(groups.entries());
  }, [theme.quotes]);

  return (
    <motion.aside
      initial={{ x: 32, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 32, opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.2, 0, 0.2, 1] }}
      className="flex h-full w-[500px] shrink-0 flex-col border-l border-line bg-paper"
    >
      <header className="flex items-start justify-between border-b border-line px-6 py-5">
        <div className="min-w-0 flex-1">
          <div className="mono-small">Theme</div>
          <h2 className="mt-1.5 quote text-[22px] leading-[1.25] text-ink">
            {theme.name}
          </h2>
          <p className="mt-2 text-[12.5px] leading-[1.65] text-ink-2">
            {theme.summary}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-3 hover:bg-paper-2 hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-line px-6 py-4">
          <div className="mono-small mb-2">Implication</div>
          <p className="text-[13px] leading-[1.7] text-ink">
            {theme.implication}
          </p>
        </section>

        <section className="px-6 py-4">
          <div className="mono-small mb-3">
            Evidence · {theme.quotes.length} quotes across{" "}
            {byParticipant.length} segments
          </div>
          <div className="space-y-5">
            {byParticipant.map(([segment, quotes]) => (
              <SegmentGroup
                key={segment}
                segment={segment}
                quotes={quotes}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-line px-6 py-4">
          <SharePopover study={study} theme={theme} />
        </section>
      </div>
    </motion.aside>
  );
}

function SegmentGroup({
  segment,
  quotes,
}: {
  segment: Segment;
  quotes: Quote[];
}) {
  const color = segmentColor(segment);
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span
          aria-hidden
          className="h-[8px] w-[8px] rounded-full"
          style={{ background: color }}
        />
        <span className="font-mono text-[10.5px] text-ink-2 uppercase tracking-[0.14em]">
          {segmentLabel(segment)} · {quotes.length}
        </span>
      </div>
      <ul className="space-y-3">
        {quotes.map((q) => (
          <QuoteBlock key={q.id} quote={q} />
        ))}
      </ul>
    </div>
  );
}

function QuoteBlock({ quote }: { quote: Quote }) {
  const participant = participantById(quote.participantId);
  const tone = sentimentTone(quote.sentiment);
  const borderColor =
    tone === "blocker"
      ? "var(--gold)"
      : tone === "negative"
        ? "#c2410c"
        : tone === "positive"
          ? "var(--accent)"
          : "var(--line-2)";

  return (
    <motion.li
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className="rounded-md border bg-card px-4 py-3.5"
      style={{ borderColor }}
    >
      <blockquote className="quote-italic text-[14px] leading-[1.65] text-ink">
        "{quote.text}"
      </blockquote>
      <div className="mt-2.5 flex items-center justify-between gap-3 text-[11px]">
        <span className="text-ink-2">
          {participant ? (
            <>
              <span className="font-medium text-ink">
                {participant.name}
              </span>{" "}
              · {participant.role}, {participant.company}
            </>
          ) : (
            quote.participantId
          )}
        </span>
        <span className="font-mono text-ink-3">{quote.context}</span>
      </div>
    </motion.li>
  );
}

/* ---------- Share popover ---------- */

function SharePopover({
  study,
  theme,
}: {
  study: Study;
  theme?: Theme;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const themes = themesForStudy(study.id);

  const url = useMemo(() => {
    if (!open) return "";
    const payload: ShareableBrief = {
      v: 1,
      exportedAt: Date.now(),
      study: {
        id: study.id,
        name: study.name,
        description: study.description,
        participantCount: study.participantCount,
        transcriptCount: study.transcriptCount,
      },
      themes: themes.map((t) => ({
        id: t.id,
        name: t.name,
        summary: t.summary,
        prevalence: t.prevalence,
        segments: t.segments,
        implication: t.implication,
        quotes: t.quotes.map((q) => {
          const p = participantById(q.participantId);
          return {
            id: q.id,
            text: q.text,
            sentiment: q.sentiment,
            context: q.context,
            participant: {
              name: p?.name ?? "Unknown",
              role: p?.role ?? "",
              company: p?.company ?? "",
              segment: p?.segment ?? "pm",
            },
          };
        }),
      })),
    };
    const encoded = encodeShareable(payload);
    if (typeof window === "undefined") return `/brief/?c=${encoded}`;
    return `${window.location.origin}/brief/?c=${encoded}`;
  }, [open, study, themes]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-[12px] text-ink-2 hover:border-ink-3 hover:text-ink transition-colors"
      >
        <ShareIcon className="h-3 w-3" strokeWidth={2} />
        <span>Share brief</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-lg border border-line bg-card p-3"
        >
          <div className="mono-small mb-2 flex items-center gap-1.5">
            <Link2 className="h-3 w-3" strokeWidth={2} />
            Shareable URL
          </div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={url}
              className="flex-1 rounded border border-line bg-paper px-2 py-1.5 font-mono text-[11px] text-ink-2 truncate focus:outline-none focus:border-[color:var(--accent)]"
            />
            <button
              onClick={copy}
              className="flex items-center gap-1 rounded-md bg-ink text-paper px-2.5 py-1.5 text-[11.5px] font-medium hover:bg-[color:var(--ink-2)] transition-colors"
            >
              {copied ? "Copied" : (
                <>
                  <Copy className="h-3 w-3" strokeWidth={2} />
                  Copy
                </>
              )}
            </button>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex items-center gap-1 text-[11px] text-ink-2 hover:text-ink"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
            Open in new tab
          </a>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Brief tab ---------- */

function BriefView({ study, themes }: { study: Study; themes: Theme[] }) {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8">
      <div className="mx-auto max-w-[760px]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="mono-small flex items-center gap-2">
              <Globe className="h-3 w-3" strokeWidth={2} />
              Stakeholder brief
            </div>
            <h2 className="quote mt-2 text-[32px] leading-[1.15] tracking-[-0.02em] text-ink md:text-[40px]">
              {study.name}
            </h2>
            <p className="mt-2 text-[13.5px] leading-[1.7] text-ink-2 max-w-[600px]">
              {study.description}
            </p>
          </div>
          <SharePopover study={study} />
        </div>

        <div className="mt-10 space-y-12">
          {themes.map((theme, i) => (
            <section key={theme.id}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-ink-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Prevalence value={theme.prevalence} />
              </div>
              <h3 className="quote mt-3 text-[24px] leading-[1.25] tracking-[-0.015em] text-ink">
                {theme.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.75] text-ink-2">
                {theme.summary}
              </p>
              <div className="mt-4 rounded-md bg-accent-soft px-4 py-3 border-l-2 border-[color:var(--accent)]">
                <div className="mono-small text-[color:var(--accent-strong)]">
                  Implication
                </div>
                <p className="mt-1 text-[13px] leading-[1.7] text-ink">
                  {theme.implication}
                </p>
              </div>
              {theme.quotes[0] && (
                <figure className="mt-5 relative pl-6 border-l-[3px] border-line-2">
                  <QuoteIcon
                    aria-hidden
                    className="absolute -left-[11px] top-0 h-4 w-4 bg-paper text-[color:var(--accent)]"
                    strokeWidth={2}
                  />
                  <blockquote className="quote-italic text-[17px] leading-[1.55] text-ink">
                    "{theme.quotes[0].text}"
                  </blockquote>
                  {(() => {
                    const p = participantById(theme.quotes[0].participantId);
                    if (!p) return null;
                    return (
                      <figcaption className="mt-2 text-[11.5px] text-ink-3 font-mono">
                        {p.name} · {p.role} · {p.company}
                      </figcaption>
                    );
                  })()}
                </figure>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

// Quiet unused import
void Users;
