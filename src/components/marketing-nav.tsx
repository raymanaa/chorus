"use client";

import { Waves } from "lucide-react";
import Link from "next/link";

export function MarketingNav() {
  return (
    <header className="relative z-10 flex items-center justify-between border-b border-line px-6 py-4 md:px-10">
      <Link href="/" className="flex items-center gap-2 group">
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft text-[color:var(--accent)]"
        >
          <Waves className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <span className="display text-[17px] leading-none text-ink group-hover:text-ink/80">
          Chorus
        </span>
        <span className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.22em] ml-1">
          α
        </span>
      </Link>
      <Link
        href="/app"
        className="group flex items-center gap-1.5 rounded-md bg-ink text-paper px-3.5 py-1.5 text-[13px] font-medium hover:bg-[color:var(--ink-2)] transition-colors"
      >
        <span>Open studio</span>
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </header>
  );
}
