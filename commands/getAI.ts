import { OllamaResponse, Translate } from '../data/index';
import dotenv from 'dotenv';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember, MessageAttachment } from 'discord.js';
import { APIInteractionGuildMember } from 'discord.js/node_modules/discord-api-types/v9';
import getOllama from './_commands/getOllama';

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
                // Call the stream for getOllama
                let responseText = '';
                await getOllama(prompt, (chunk) => {
                    console.log("adding chunk to responseTextL ", chunk);
                    responseText += chunk; // Accumulate chunks
                    // Update reply with accumulated text
                    interaction.editReply({ content: responseText }).catch(console.error);
                });

                if (responseText) {
                    await interaction.editReply({ content: responseText });
                }
            }
        } catch (e) {
            console.log(e);
            await interaction.editReply(`An error occurred: contact Mat Langer for support. ${e.message}`);
        }
    }
}