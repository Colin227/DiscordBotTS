// command-summarize.ts
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    TextChannel,
} from "discord.js";
import { summarizeWithLocalLLM, formatSummaryForDiscord, SummarizeMode } from "./summarize";

export const summarizeCommand = new SlashCommandBuilder()
    .setName("summarize")
    .setDescription("Summarize the last N messages in this channel")
    .addIntegerOption((opt) =>
        opt
            .setName("count")
            .setDescription("How many recent messages to include (default 50, max 150)")
            .setMinValue(10)
            .setMaxValue(150)
            .setRequired(false)
    )
    .addStringOption((opt) =>
        opt
            .setName('mode')
            .setDescription('Summarization mode (normal or tea)')
            .addChoices(
                { name: 'normal', value: 'normal' },
                { name: 'tea', value: 'tea' })
            .setRequired(false)
    );

function compactMessageContent(content: string): string {
    // Remove triple-backtick code blocks but keep a hint
    const stripped = content.replace(/```[\s\S]*?```/g, "[code block]");
    // Shrink excessive whitespace
    return stripped.replace(/\s+/g, " ").trim();
}

export async function handleSummarize(interaction: ChatInputCommandInteraction) {
    const count = Math.min(interaction.options.getInteger("count") ?? 50, 150);
    const mode = interaction.options.getString("mode") as SummarizeMode || "normal";

    if (!interaction.channel || !(interaction.channel instanceof TextChannel)) {
        await interaction.reply({ content: "This command only works in text channels.", ephemeral: true });
        return;
    }

    await interaction.deferReply(); // summaries can take a few seconds locally

    // Fetch recent messages
    const messages = await interaction.channel.messages.fetch({ limit: count });

    // Oldest -> newest, skip bot messages, skip empty
    const ordered = [...messages.values()]
        .filter((m) => !m.author.bot)
        .sort((a, b) => a.createdTimestamp - b.createdTimestamp);

    // Build transcript with light metadata
    const transcriptLines: string[] = [];
    for (const m of ordered) {
        const text = compactMessageContent(m.content);
        if (!text) continue;
        const who = m.member?.displayName ?? m.author.username;
        transcriptLines.push(`[${who}] ${text}`.slice(0, 300)); // cap per message
    }

    if (!transcriptLines.length) {
        await interaction.editReply("Nothing to summarize (no recent user messages).");
        return;
    }

    // Guardrail: keep transcript size reasonable
    // If you find the model struggles, reduce max lines or lower per-message cap.
    const transcript = transcriptLines.slice(-count).join("\n").slice(0, 14_000);

    try {
        const summary = await summarizeWithLocalLLM({
            model: "llama3.1", // change to your local model name
            transcript,
            mode
        });

        const output = formatSummaryForDiscord(summary);

        // Discord message limit: 2000 chars
        const trimmed = output.length > 1900 ? output.slice(0, 1900) + "\n…(trimmed)" : output;

        await interaction.editReply(trimmed);
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await interaction.editReply(`Failed to summarize: ${msg.slice(0, 1800)}`);
    }
}
