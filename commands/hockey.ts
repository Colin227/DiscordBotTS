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
        // .addUserOption(option =>
		// 	option
		// 		.setName('Team')
		// 		.setDescription('Team Abbreviation: i.e. "TOR" ')
		// 		.setRequired(true))
		.addUserOption((option) =>
			option.setName('team')
				.setDescription('Team abbreviation i.e. "TOR  SEA')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        // const test_game = "2020020001";
        const team = interaction.options.getString('team');
        console.log("team: ", team)
        await interaction.deferReply();

        const score = await getGames(team.trim().toLowerCase()) as GameSchedule;

        console.log("============ resp: ", score);

        if (score) { // TODO: 

            let embeds = [];

            // console.log('resp: ', resp);


            let embed = hockeyEmbedder(score);

            embeds.push(embed);
            // let gameDates = resp.dates;

            // for (const [i, day] of gameDates.entries()) {
                
            //     if (i >= GAME_LIMIT) break;
                

            //     if (day.totalGames > 0) {

                



            //     console.log("destructuring root into game day: ", day);

            //     let embed = embedScore(day.games[0]);

            //     embeds.push(embed);

            //     }


            //     // let resp = embedWeather(weather);
            //     // await interaction.reply({ embeds: [resp] });

            //     // await interaction.editReply(`leafs win woo:ubbyvy ${resp.dates[0].date}`);

            // }
// console.log('embeds ========= : ', embeds);

            // await interaction.editReply({ embeds })

            await interaction.editReply({embeds})
        
        } else {
            await interaction.editReply("No games found.");
        }
    }
}