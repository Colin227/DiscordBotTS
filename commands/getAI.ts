import dotenv from 'dotenv';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import generateText from './_commands/getPromptResponse';

dotenv.config();
const validInputPattern = /^[a-zA-Z0-9\s.,!?'"-]*$/; // Only allow specific characters
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Ask AI a question'),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        try {
            const prompt = interaction.options.getString('prompt');
            console.log("received prompt: ", prompt);
            if (!prompt) {
                await interaction.editReply(`An error occurred: No prompt provided. Contact your local Mat Langer for assistance.`);
                return;
            } else if (!validInputPattern.test(prompt)) {
                // Validate input using regex
                await interaction.editReply('An error occurred: Input contains invalid characters. Please only use letters, numbers, and punctuation.');
                return;
            } else {

                const text = await generateText(prompt);

                if (text) {
                    await interaction.editReply({ content: text });
                }
            }
        } catch (e) {
            console.log(e);
            await interaction.editReply(`An error occurred: contact Mat Langer for support. ${e.message}`);
        }
    }
}