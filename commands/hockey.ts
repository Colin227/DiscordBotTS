import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment } from "discord.js";
import getGames, { getTeam } from "../helpers/getHockey";
import { GameSchedule } from "../data/_interfaces";
import hockeyEmbedder from "../helpers/hockeyEmbedder";
import teamEmbedder from "../helpers/teamEmbedder";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hockey')
        .setDescription('Replies with hockey game schedule.')
        .addUserOption((option) =>
            option.setName('team')
                .setDescription('Team abbreviation i.e. "TOR  SEA')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const team = interaction.options.getString('team');
        const teamStr = team.trim().toLowerCase();
        await interaction.deferReply();
        
        try {
            // Get the team data based on the user provided tricode.
            const t = getTeam(teamStr);
            // Get the current game schedule
            // TODO: Unsure how the NHL api will handle this once preseason is over. Does the api return every game in the season? 
            const score = await getGames(t.triCode) as GameSchedule;
            // Get the team logo from stored assets. These aren't stored on git due to the logos being copyright of their respective teams.
            const teamFile = new MessageAttachment(`../Discordjs/assets/teams/${t.triCode}_light.png`);
            
            await interaction.editReply({ embeds: [hockeyEmbedder(score, t.triCode)], files: [teamFile] })
        } catch (e) {
            await interaction.editReply("Error getting game data, try again later.");
        }
    }
}