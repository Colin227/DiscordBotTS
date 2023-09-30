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
        // try {
        //     const t = getTeam(teamStr);
        //     const teamFile = new MessageAttachment(`../Discordjs/assets/teams/${t.triCode}_light.png`);
        //     await interaction.editReply({ embeds: [teamEmbedder(t)], files: [teamFile]});
        // } catch (e) {
        //     await interaction.editReply(`Error getting game data, try again later: ${e}`);
        // }
        
        try {
            const score = await getGames(team.trim().toLowerCase()) as GameSchedule;
            const t = getTeam(teamStr);
            const teamFile = new MessageAttachment(`../Discordjs/assets/teams/${t.triCode}_light.png`);
            await interaction.editReply({ embeds: [hockeyEmbedder(score, t.triCode)], files: [teamFile] })
        } catch (e) {
            await interaction.editReply("Error getting game data, try again later.");
        }
    }
}