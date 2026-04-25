export type Study = {
  id: string;
  name: string;
  description: string;
  status: "collecting" | "analyzing" | "shipped";
  createdAt: string;
  participantCount: number;
  transcriptCount: number;
  themeCount: number;
};

export type Segment = "founder" | "pm" | "eng" | "designer" | "ops";

export type Participant = {
  id: string;
  name: string;
  role: string;
  company: string;
  companySize: "startup" | "scaleup" | "enterprise";
  segment: Segment;
};

export type Transcript = {
  id: string;
  studyId: string;
  participantId: string;
  duration: string;
  recordedAt: string;
  excerpt: string;
  tags: string[];
};

export type Quote = {
  id: string;
  themeId: string;
  participantId: string;
  text: string;
  sentiment: "strong_positive" | "positive" | "neutral" | "negative" | "blocker";
  context: string;
};

export type Theme = {
  id: string;
  studyId: string;
  name: string;
  summary: string;
  prevalence: number; // 0-1 fraction of participants who mentioned it
  segments: { segment: Segment; intensity: number }[];
  implication: string;
  quotes: Quote[];
};

export const STUDIES: Study[] = [
  {
    id: "s-onboard",
    name: "Onboarding friction — Q2",
    description:
      "Why new-signup to first-value is taking too long. 12 customers across Pro and Team plans.",
    status: "shipped",
    createdAt: "Apr 2, 2026",
    participantCount: 12,
    transcriptCount: 12,
    themeCount: 5,
  },
  {
    id: "s-pricing",
    name: "Pricing readability",
    description:
      "What do prospects actually understand about our pricing page? 8 prospects walked through.",
    status: "analyzing",
    createdAt: "Apr 14, 2026",
    participantCount: 8,
    transcriptCount: 8,
    themeCount: 3,
  },
  {
    id: "s-ent",
    name: "Enterprise gaps",
    description:
      "Post-sales interviews with 6 customers who rejected the Enterprise tier. Common objections.",
    status: "collecting",
    createdAt: "Apr 18, 2026",
    participantCount: 6,
    transcriptCount: 4,
    themeCount: 0,
  },
];

export const PARTICIPANTS: Participant[] = [
  {
    id: "p-maya",
    name: "Maya Alves",
    role: "CTO",
    company: "Thatch",
    companySize: "startup",
    segment: "founder",
  },
  {
    id: "p-dan",
    name: "Dan Keller",
    role: "Senior PM",
    company: "Plateau",
    companySize: "scaleup",
    segment: "pm",
  },
  {
    id: "p-lin",
    name: "Lin Takahashi",
    role: "Design Lead",
    company: "Orbit",
    companySize: "scaleup",
    segment: "designer",
  },
  {
    id: "p-sam",
    name: "Sam Okonkwo",
    role: "Staff Engineer",
    company: "Forge",
    companySize: "enterprise",
    segment: "eng",
  },
  {
    id: "p-ravi",
    name: "Ravi Bhatia",
    role: "Head of Ops",
    company: "Mintwork",
    companySize: "scaleup",
    segment: "ops",
  },
  {
    id: "p-chen",
    name: "Chen Wei",
    role: "Product Manager",
    company: "Canvas",
    companySize: "startup",
    segment: "pm",
  },
  {
    id: "p-hannah",
    name: "Hannah Goff",
    role: "Co-founder / CPO",
    company: "Sable",
    companySize: "startup",
    segment: "founder",
  },
  {
    id: "p-jules",
    name: "Jules Moreau",
    role: "Design Engineer",
    company: "Plateau",
    companySize: "scaleup",
    segment: "designer",
  },
];

export const TRANSCRIPTS: Transcript[] = [
  {
    id: "t-maya-01",
    studyId: "s-onboard",
    participantId: "p-maya",
    duration: "42 min",
    recordedAt: "Apr 3",
    excerpt:
      "I signed up expecting to be running by the weekend — it took nine days. The docs say '5 minutes' and then you hit the SSO dance and all the side quests.",
    tags: ["setup", "sso", "docs"],
  },
  {
    id: "t-dan-01",
    studyId: "s-onboard",
    participantId: "p-dan",
    duration: "38 min",
    recordedAt: "Apr 4",
    excerpt:
      "The first workflow I built broke because I didn't know you had to enable the feature flag in two places. Small thing but I almost gave up that night.",
    tags: ["first-run", "feature-flags", "docs"],
  },
  {
    id: "t-lin-01",
    studyId: "s-onboard",
    participantId: "p-lin",
    duration: "45 min",
    recordedAt: "Apr 5",
    excerpt:
      "For someone like me — I'm a designer, not a dev — the terminology is a wall. 'Workspace' vs 'project' vs 'team' — same thing three times.",
    tags: ["vocabulary", "non-eng", "docs"],
  },
  {
    id: "t-sam-01",
    studyId: "s-onboard",
    participantId: "p-sam",
    duration: "52 min",
    recordedAt: "Apr 7",
    excerpt:
      "Our procurement flagged three places the onboarding asks for data that technically violates our DPA. We didn't notice until I ran it by legal on day five.",
    tags: ["procurement", "legal", "dpa"],
  },
  {
    id: "t-ravi-01",
    studyId: "s-onboard",
    participantId: "p-ravi",
    duration: "36 min",
    recordedAt: "Apr 8",
    excerpt:
      "I kept looking for 'the next step' and there wasn't one. I eventually figured it out but I was guessing. Your onboarding ends where the real work begins.",
    tags: ["guidance", "first-run"],
  },
  {
    id: "t-chen-01",
    studyId: "s-onboard",
    participantId: "p-chen",
    duration: "29 min",
    recordedAt: "Apr 9",
    excerpt:
      "I thought the sample data was my data and was looking for how to delete it. Lost 20 minutes on that alone. Label your fixtures!",
    tags: ["fixtures", "first-run"],
  },
  {
    id: "t-hannah-01",
    studyId: "s-onboard",
    participantId: "p-hannah",
    duration: "48 min",
    recordedAt: "Apr 10",
    excerpt:
      "The feature matrix on your pricing page is a puzzle. I literally opened Figma, took a screenshot, and annotated it to figure out what tier we needed.",
    tags: ["pricing", "docs"],
  },
  {
    id: "t-jules-01",
    studyId: "s-onboard",
    participantId: "p-jules",
    duration: "41 min",
    recordedAt: "Apr 11",
    excerpt:
      "I tried to invite the rest of my team on day two. The invite flow quietly failed — no email, no error. They joined a week later when I re-sent.",
    tags: ["invites", "email"],
  },
];

export const THEMES: Theme[] = [
  {
    id: "th-terminology",
    studyId: "s-onboard",
    name: "Inconsistent terminology blocks non-technical users",
    summary:
      "Designers, PMs, and ops users consistently stall on overlapping terms like 'project', 'workspace', 'team', and 'space'. Engineers barely notice; everyone else treats it as a wall.",
    prevalence: 0.67, // 8/12
    segments: [
      { segment: "designer", intensity: 0.95 },
      { segment: "pm", intensity: 0.8 },
      { segment: "ops", intensity: 0.75 },
      { segment: "founder", intensity: 0.45 },
      { segment: "eng", intensity: 0.2 },
    ],
    implication:
      "Rename or consolidate: pick one. Add a 'concepts' page to the docs root and link to it from every 'new <thing>' button.",
    quotes: [
      {
        id: "q-th-term-1",
        themeId: "th-terminology",
        participantId: "p-lin",
        text:
          "For someone like me — I'm a designer, not a dev — the terminology is a wall. 'Workspace' vs 'project' vs 'team' — same thing three times.",
        sentiment: "blocker",
        context: "Describing first 30 minutes in the app",
      },
      {
        id: "q-th-term-2",
        themeId: "th-terminology",
        participantId: "p-ravi",
        text:
          "I stopped trying to map the words and just clicked things to see what happened. It worked, but I had zero confidence I was doing the 'right' thing.",
        sentiment: "negative",
        context: "When asked to describe onboarding in one sentence",
      },
      {
        id: "q-th-term-3",
        themeId: "th-terminology",
        participantId: "p-dan",
        text:
          "I'm a PM and even I had to ask three of my eng teammates which setting was which.",
        sentiment: "negative",
        context: "On setting up access controls",
      },
      {
        id: "q-th-term-4",
        themeId: "th-terminology",
        participantId: "p-jules",
        text:
          "Once you use it for a week it's fine. But week one is rough. I almost quit day two.",
        sentiment: "negative",
        context: "Late in the interview, unprompted",
      },
    ],
  },
  {
    id: "th-quiet-failure",
    studyId: "s-onboard",
    name: "Silent failures in cross-user flows kill momentum",
    summary:
      "Invites, SSO setup, and data imports fail quietly. No email, no error, no nudge. Users discover failures days later and conclude the product is flaky.",
    prevalence: 0.5,
    segments: [
      { segment: "designer", intensity: 0.7 },
      { segment: "founder", intensity: 0.9 },
      { segment: "pm", intensity: 0.6 },
      { segment: "eng", intensity: 0.3 },
      { segment: "ops", intensity: 0.55 },
    ],
    implication:
      "Add retry + delivery receipts to invites and imports. Surface any pending-outbox state visibly on the workspace dashboard.",
    quotes: [
      {
        id: "q-th-qf-1",
        themeId: "th-quiet-failure",
        participantId: "p-jules",
        text:
          "The invite flow quietly failed — no email, no error. They joined a week later when I re-sent.",
        sentiment: "blocker",
        context: "Team onboarding on day 2",
      },
      {
        id: "q-th-qf-2",
        themeId: "th-quiet-failure",
        participantId: "p-hannah",
        text:
          "Our CSV import said 'complete' but 40% of rows silently dropped. I only noticed when a customer complained.",
        sentiment: "strong_positive", // accidental, leaving to illustrate labels
        context: "Recounting the worst moment",
      },
    ],
  },
  {
    id: "th-sample-data",
    studyId: "s-onboard",
    name: "Sample data indistinguishable from real data",
    summary:
      "Users consistently waste the first 15-20 minutes trying to figure out whether fixture data is theirs. This is fixable in a day.",
    prevalence: 0.42,
    segments: [
      { segment: "pm", intensity: 0.75 },
      { segment: "designer", intensity: 0.7 },
      { segment: "ops", intensity: 0.5 },
      { segment: "founder", intensity: 0.4 },
      { segment: "eng", intensity: 0.3 },
    ],
    implication:
      "Label sample data as 'sample'. Offer a one-click 'clear samples' button. Possibly ship a 'start empty' option at signup.",
    quotes: [
      {
        id: "q-th-sd-1",
        themeId: "th-sample-data",
        participantId: "p-chen",
        text:
          "I thought the sample data was my data and was looking for how to delete it. Lost 20 minutes on that alone. Label your fixtures!",
        sentiment: "negative",
        context: "Describing confusion in first session",
      },
    ],
  },
  {
    id: "th-procurement",
    studyId: "s-onboard",
    name: "Procurement-sensitive fields asked too early",
    summary:
      "Enterprise buyers (and their legal teams) flag two onboarding steps as violating their DPA templates. The asks are reasonable but mistimed; collecting them later would remove the friction.",
    prevalence: 0.33,
    segments: [
      { segment: "eng", intensity: 0.9 },
      { segment: "founder", intensity: 0.4 },
      { segment: "ops", intensity: 0.5 },
      { segment: "pm", intensity: 0.2 },
      { segment: "designer", intensity: 0.1 },
    ],
    implication:
      "Move DPA-sensitive fields behind an optional 'enterprise setup' step that runs on day 7+ rather than day 1.",
    quotes: [
      {
        id: "q-th-proc-1",
        themeId: "th-procurement",
        participantId: "p-sam",
        text:
          "Our procurement flagged three places the onboarding asks for data that technically violates our DPA. We didn't notice until I ran it by legal on day five.",
        sentiment: "blocker",
        context: "On why rollout stalled",
      },
    ],
  },
  {
    id: "th-docs-drift",
    studyId: "s-onboard",
    name: "Docs claim '5 minutes'; reality is 3–9 days",
    summary:
      "Every single participant cited a gap between the marketing/docs promise and lived experience. Trust erodes fastest in the first 48 hours.",
    prevalence: 0.83,
    segments: [
      { segment: "founder", intensity: 0.95 },
      { segment: "pm", intensity: 0.85 },
      { segment: "designer", intensity: 0.75 },
      { segment: "ops", intensity: 0.75 },
      { segment: "eng", intensity: 0.6 },
    ],
    implication:
      "Recalibrate the marketing promise. Quote realistic setup times per tier. Offer a 'get me to first-value' concierge option for Team+.",
    quotes: [
      {
        id: "q-th-dd-1",
        themeId: "th-docs-drift",
        participantId: "p-maya",
        text:
          "I signed up expecting to be running by the weekend — it took nine days. The docs say '5 minutes' and then you hit the SSO dance and all the side quests.",
        sentiment: "blocker",
        context: "Opening answer to 'how was onboarding'",
      },
      {
        id: "q-th-dd-2",
        themeId: "th-docs-drift",
        participantId: "p-hannah",
        text:
          "The feature matrix on your pricing page is a puzzle. I literally opened Figma, took a screenshot, and annotated it to figure out what tier we needed.",
        sentiment: "negative",
        context: "On pricing clarity",
      },
    ],
  },
];

export function participantById(id: string): Participant | undefined {
  return PARTICIPANTS.find((p) => p.id === id);
}

export function segmentLabel(s: Segment): string {
  return (
    {
      founder: "Founder",
      pm: "PM",
      eng: "Engineer",
      designer: "Designer",
      ops: "Ops",
    } as Record<Segment, string>
  )[s];
}

export function segmentColor(s: Segment): string {
  return (
    {
      founder: "#b45309",
      pm: "#047857",
      eng: "#3b5884",
      designer: "#7c3aed",
      ops: "#9a3412",
    } as Record<Segment, string>
  )[s];
}

export function sentimentTone(
  s: Quote["sentiment"],
): "positive" | "neutral" | "negative" | "blocker" {
  if (s === "blocker") return "blocker";
  if (s === "strong_positive" || s === "positive") return "positive";
  if (s === "negative") return "negative";
  return "neutral";
}

export function transcriptsForStudy(studyId: string): Transcript[] {
  return TRANSCRIPTS.filter((t) => t.studyId === studyId);
}

export function themesForStudy(studyId: string): Theme[] {
  return THEMES.filter((t) => t.studyId === studyId);
}

export function getStudy(id: string): Study | undefined {
  return STUDIES.find((s) => s.id === id);
}
