import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, CommandInteraction } from "discord.js";
import getGames from "../helpers/getHockey";
import embedScore from "../helpers/hockeyEmbedder";
import { Game, Root } from "../data/game";
import { Boxscore, GameSchedule } from "../data/_interfaces";
import hockeyEmbedder from "../helpers/hockeyEmbedder";
import * as TEAMS from '../data/teams.json';

const GAME_LIMIT = 3;

const Teams = TEAMS;

const teamChoices = Teams.data.slice(0, 25).map((
    team) => {
    return {
        name: team.fullName,
        value: team.triCode
    }
}
);

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
        console.log("team: ", team)
        await interaction.deferReply();
        try {
            const score = await getGames(team.trim().toLowerCase()) as GameSchedule;
            await interaction.editReply({ embeds: [hockeyEmbedder(score)] })
        } catch (e) {
            await interaction.editReply("Error getting game data, try again later.");
        }
    }
}