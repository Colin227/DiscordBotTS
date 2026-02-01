// ollama.ts
export type OllamaChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

export async function ollamaChat(opts: {
    model: string;
    messages: OllamaChatMessage[];
    temperature?: number;
}): Promise<string> {
    const res = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: opts.model,
            messages: opts.messages,
            stream: false,
            options: {
                temperature: opts.temperature ?? 0.2,
            },
        }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Ollama error: ${res.status} ${res.statusText}\n${text}`);
    }

    const data = (await res.json()) as { message?: { content?: string } };
    const content = data?.message?.content;
    if (!content) throw new Error("Ollama response missing message.content");
    return content;
}
