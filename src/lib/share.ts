"use client";

import type { Study, Theme, Quote, Participant } from "@/lib/mock-data";

export type ShareableBrief = {
  v: 1;
  exportedAt: number;
  study: Pick<Study, "id" | "name" | "description" | "participantCount" | "transcriptCount">;
  themes: (Pick<
    Theme,
    "id" | "name" | "summary" | "prevalence" | "segments" | "implication"
  > & {
    quotes: (Pick<Quote, "id" | "text" | "sentiment" | "context"> & {
      participant: Pick<Participant, "name" | "role" | "company" | "segment">;
    })[];
  })[];
};

export function encodeShareable(data: ShareableBrief): string {
  const json = JSON.stringify(data);
  if (typeof window === "undefined") {
    return Buffer.from(json, "utf-8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeShareable(encoded: string): ShareableBrief | null {
  try {
    let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad) b64 += "=".repeat(4 - pad);
    let json: string;
    if (typeof window === "undefined") {
      json = Buffer.from(b64, "base64").toString("utf-8");
    } else {
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      json = new TextDecoder().decode(bytes);
    }
    const parsed = JSON.parse(json) as ShareableBrief;
    if (parsed.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}
