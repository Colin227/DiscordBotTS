import { Translate } from '../data/index';
import dotenv from 'dotenv';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import getTranslation from './_commands/getTranslate';

dotenv.config();
const validInputPattern = /^[a-zA-Z0-9\s.,!?'"-]*$/; // Only allow specific characters
module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text'),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        try {
            if (!interaction.isChatInputCommand()) return;
            const language = interaction.options.getString('lang');
            const queryText = interaction.options.getString('text');
            if (!language || !queryText) {
                await interaction.editReply(`An error occurred: No language or query text. Contact your local Mat Langer for assistance.`);
            } else if (!validInputPattern.test(queryText)) {
                // Validate input using regex
                await interaction.editReply('An error occurred: Input contains invalid characters. Please only use letters, numbers, and punctuation.');
            } else {
                const response = await getTranslation(language, queryText) as Translate;
                await interaction.editReply({ content: `Translation: ${response.translatedText}` })
            }
        } catch (e) {
            console.log(e);
            await interaction.editReply(`An error occurred: contact Mat Langer for support. ${e.message}`);
        }
    }
}