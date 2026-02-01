import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { handleSummarize } from './ollama/command-summarize';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summarize')
        .setDescription('Summarize the last N messages in this channel')
        .addIntegerOption((opt) =>
            opt
                .setName('count')
                .setDescription('How many recent messages to include (default 50, max 150)')
                .setMinValue(10)
                .setMaxValue(150)
                .setRequired(false)
        )
        .addStringOption(opt =>
            opt
                .setName("mode")
                .setDescription("Recap style")
                .addChoices(
                    { name: "normal", value: "normal" },
                    { name: "short", value: "short" },
                    { name: "tea", value: "tea" }
                )
                .setRequired(false)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        await handleSummarize(interaction);
    }
};