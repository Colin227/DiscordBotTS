import { EmbedBuilder } from "discord.js";
import type { CasualSummary } from "./summarize";

function bulletList(items: string[], max = 6): string {
    if (!items?.length) return "—";
    return items.slice(0, max).map((x) => `• ${x}`).join("\n");
}

export function summaryToEmbed(s: CasualSummary): EmbedBuilder {
    const embed = new EmbedBuilder()
        .setTitle(s.title || "Recap")
        .setDescription(s.tldr ? `_${s.tldr}_` : undefined)
        .setColor(0x5865f2) // Discord blurple
        .setTimestamp();

    if (s.topics?.length) {
        embed.addFields({
            name: "Topics",
            value: bulletList(s.topics),
            inline: false,
        });
    }

    if (s.highlights?.length) {
        embed.addFields({
            name: "Highlights",
            value: bulletList(s.highlights),
            inline: false,
        });
    }

    if (s.vibe) {
        embed.addFields({
            name: "Vibe",
            value: s.vibe,
            inline: false,
        });
    }
    if (s.tea?.playful_take) {
        embed.addFields({ name: "Tea ☕", value: s.tea.playful_take, inline: false });
    }
    if (s.tea?.plot_twists?.length) {
        embed.addFields({ name: "Plot twists", value: bulletList(s.tea.plot_twists, 4), inline: false });
    }


    return embed;
}
