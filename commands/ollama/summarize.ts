// summarize.ts
import { ollamaChat } from "./ollama";

export type ThreadSummary = {
    topic: string;
    key_points: string[];
    decisions: string[];
    open_questions: string[];
    next_actions: string[];
};

function safeJsonExtract(text: string): unknown | null {
    // Handles models that wrap JSON in extra text/code fences.
    const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i);
    const raw = fenced?.[1] ?? text;

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

function toDiscordBullets(items: string[], emptyText = "—"): string {
    if (!items?.length) return emptyText;
    return items.map((x) => `• ${x}`).join("\n");
}

export function formatSummaryForDiscord(s: ThreadSummary): string {
    return [
        `**Thread Summary**`,
        `**Topic:** ${s.topic || "—"}`,
        ``,
        `**Key points:**`,
        toDiscordBullets(s.key_points),
        ``,
        `**Decisions:**`,
        toDiscordBullets(s.decisions),
        ``,
        `**Open questions:**`,
        toDiscordBullets(s.open_questions),
        ``,
        `**Next actions:**`,
        toDiscordBullets(s.next_actions),
    ].join("\n");
}

export async function summarizeWithLocalLLM(opts: {
    model: string;
    transcript: string;
}): Promise<ThreadSummary> {
    const system = `
You are summarizing a Discord thread.
Return ONLY valid JSON matching this schema:

{
  "topic": string,
  "key_points": string[],
  "decisions": string[],
  "open_questions": string[],
  "next_actions": string[]
}

Rules:
- Use only the provided transcript; do not invent facts.
- Keep bullets short (<= 140 chars each).
- If there are no items for a section, return an empty array.
- "next_actions" should include owner mentions if clearly stated (e.g., "@alex do X").`;

    const user = `Transcript:\n${opts.transcript}`;

    const raw = await ollamaChat({
        model: opts.model,
        messages: [
            { role: "system", content: system.trim() },
            { role: "user", content: user },
        ],
        temperature: 0.2,
    });

    const parsed = safeJsonExtract(raw);

    // Minimal runtime validation (no deps)
    if (
        !parsed ||
        typeof parsed !== "object" ||
        parsed === null ||
        typeof (parsed as any).topic !== "string" ||
        !Array.isArray((parsed as any).key_points) ||
        !Array.isArray((parsed as any).decisions) ||
        !Array.isArray((parsed as any).open_questions) ||
        !Array.isArray((parsed as any).next_actions)
    ) {
        // Fallback: make a basic summary without JSON (still useful)
        return {
            topic: "Summary",
            key_points: [raw.slice(0, 800)],
            decisions: [],
            open_questions: [],
            next_actions: [],
        };
    }

    const s = parsed as ThreadSummary;

    // Normalize to strings only
    const clean = (arr: unknown[]) => arr.filter((x): x is string => typeof x === "string").slice(0, 10);

    return {
        topic: s.topic.slice(0, 120),
        key_points: clean(s.key_points),
        decisions: clean(s.decisions),
        open_questions: clean(s.open_questions),
        next_actions: clean(s.next_actions),
    };
}
