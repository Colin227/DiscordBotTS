// summarize.ts
import { ollamaChat } from "./ollama";

export type SummarizeMode = "normal" | "tea";

export type CasualSummary = {
    title: string;        // short, fun title
    tldr: string;         // 1–2 sentence recap
    topics: string[];     // 3–6 topics
    highlights: string[]; // 3–6 moments (no direct quotes by default)
    vibe: string;         // short, non-judgmental vibe
    tea?: {
        playful_take: string;      // playful gossip-style take
        plot_twists: string[];    // 2–4 surprising plot twists
    }
};



function safeJsonExtract(text: string): unknown | null {
    // Handles models that wrap JSON in extra text/code fences.
    const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i);
    const raw = (fenced?.[1] ?? text).trim();

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;

    const candidate = raw.slice(start, end + 1);
    try {
        return JSON.parse(candidate);
    } catch {
        return null;
    }
}

function clamp(items: string[], max: number, maxLen = 140): string[] {
    return items
        .map((s) => s.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .map((s) => (s.length > maxLen ? s.slice(0, maxLen - 1) + "…" : s))
        .slice(0, max);
}

function toDiscordBullets(items: string[], emptyText = "—"): string {
    if (!items?.length) return emptyText;
    return items.map((x) => `• ${x}`).join("\n");
}


export function formatSummaryForDiscord(s: CasualSummary): string {
    const parts: string[] = [];

    parts.push(`**${s.title || "Recap"}**`);
    parts.push(s.tldr ? `_${s.tldr}_` : `_A quick recap of what went down._`);
    parts.push("");

    parts.push(`**Topics:**`);
    parts.push(toDiscordBullets(s.topics));
    parts.push("");

    parts.push(`**Highlights:**`);
    parts.push(toDiscordBullets(s.highlights));
    parts.push("");

    if (s.tea?.playful_take || s.tea?.plot_twists?.length) {
        parts.push("**Tea ☕**");

        if (s.tea.playful_take) {
            parts.push(s.tea.playful_take);
        }

        if (s.tea.plot_twists?.length) {
            parts.push("");
            parts.push("**Plot twists:**");
            parts.push(toDiscordBullets(s.tea.plot_twists));
        }

        parts.push("");
    }

    parts.push(`**Vibe:** ${s.vibe || "—"}`);

    return parts.join("\n");
}


function buildSystemPrompt(opts: {
    mode: SummarizeMode;
    maxTopics: number;
    maxHighlights: number;
}): string {
    const base = `
You are summarizing a casual Discord chat between friends.
Return ONLY valid JSON matching this schema:

{
  "title": string,
  "tldr": string,
  "topics": string[],
  "highlights": string[],
  "vibe": string,
  "tea"?: {
    "playful_take": string,
    "plot_twists": string[]
  }
}

Hard rules (always):
- Use ONLY the provided transcript; do not invent events, people, or outcomes.
- No harassment, slurs, sexual content, or personal attacks.
- Keep it friendly and non-judgmental.
- Avoid direct quotes; prefer paraphrase.
- Keep bullets short (<= 140 chars).
- "tldr": 1–2 sentences, <= 220 chars.
- If a field has no items, use an empty array (or omit "tea" entirely unless in tea mode).
`;

    const modeRules: Record<SummarizeMode, string> = {
        normal: `
Mode: NORMAL RECAP
- Tone: friendly, casual, helpful.
- "topics": 3–${opts.maxTopics} short noun phrases.
- "highlights": 3–${opts.maxHighlights} interesting moments.
- "vibe": short phrase like "focused with side quests" or "friendly chaos" or "serious ideas, unserious tone" or "vibes: enthusiastic rambling".
`,

        tea: `
Mode: TEA (playful, silly gossip — but SAFE)
- Keep it light, and obviously unserious.
- No mean-spirited reads. No singling out someone negatively. 
- If the transcript includes conflict, frame it as "mild chaos" not blame.
- Fill "tea" with:
  - "playful_take": 1–2 sentences (<= 220 chars)
  - "plot_twists": 2–4 funny bullets (<= 140 chars)
- "tldr/topics/highlights/vibe" still required and should stay accurate.
`,
    };

    return (base + modeRules[opts.mode]).trim();
}



export async function summarizeWithLocalLLM(opts: {
    model: string;
    transcript: string;
    mode?: SummarizeMode;
    maxTopics?: number;      // default 6
    maxHighlights?: number;  // default 6
}): Promise<CasualSummary> {
    const mode = opts.mode ?? "normal";
    const maxTopics = opts.maxTopics ?? 6;
    const maxHighlights = opts.maxHighlights ?? 6;

    const system = buildSystemPrompt({ mode, maxTopics, maxHighlights });


    // Keep transcript bounded for smaller local models
    const transcript = opts.transcript.trim().slice(0, 16_000);
    const user = `Transcript:\n${transcript}`;

    const raw = await ollamaChat({
        model: opts.model,
        messages: [
            { role: "system", content: system.trim() },
            { role: "user", content: user },
        ],
        temperature: mode === "tea" ? 0.7 : 0.3,
    });

    const parsed = safeJsonExtract(raw);

    // Minimal runtime validation (no deps)
    const isOk =
        parsed &&
        typeof parsed === "object" &&
        parsed !== null &&
        typeof (parsed as any).title === "string" &&
        typeof (parsed as any).tldr === "string" &&
        Array.isArray((parsed as any).topics) &&
        Array.isArray((parsed as any).highlights) &&
        typeof (parsed as any).vibe === "string";

    if (!isOk) {
        // Fallback: still return something usable
        return {
            title: "Recap",
            tldr: raw.replace(/\s+/g, " ").trim().slice(0, 220),
            topics: [],
            highlights: [],
            vibe: "friendly chaos",
        };
    }

    const s = parsed as CasualSummary;
    // Tea is optional; if not tea mode, drop it even if model returned it.
    // if (mode !== "tea") delete s.tea;

    // Optionally: if tea mode, validate tea shape
    // if (mode === "tea") {
    //     const tea = (s as any).tea;
    //     if (
    //         !tea ||
    //         typeof tea.playful_take !== "string" ||
    //         !Array.isArray(tea.plot_twists)
    //     ) {
    //         delete (s as any).tea;
    //     }
    // }

    // Normalize to strings only
    const cleanStrings = (arr: unknown[]) =>
        arr.filter((x): x is string => typeof x === "string");

    const title = s.title.replace(/\s+/g, " ").trim();
    const tldr = s.tldr.replace(/\s+/g, " ").trim();
    const vibe = s.vibe.replace(/\s+/g, " ").trim();


    return {
        title: title ? (title.length > 80 ? title.slice(0, 79) + "…" : title) : "Recap",
        tldr: tldr ? (tldr.length > 220 ? tldr.slice(0, 219) + "…" : tldr) : "A quick recap of what went down.",
        topics: clamp(cleanStrings(s.topics), maxTopics, 60),
        highlights: clamp(cleanStrings(s.highlights), maxHighlights, 140),
        vibe: vibe ? (vibe.length > 80 ? vibe.slice(0, 79) + "…" : vibe) : "friendly chaos",
        tea: s.tea
            ? {
                playful_take: s.tea.playful_take.trim().slice(0, 220),
                plot_twists: clamp(s.tea.plot_twists ?? [], 4, 140),
            }
            : undefined,
    };
}