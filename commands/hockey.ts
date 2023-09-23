import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";
import getGames from "../helpers/getHockey";
import embedScore from "../helpers/hockeyEmbedder";
import { Game, Root } from "../data/game";
import { Boxscore } from "../data/_interfaces";
import hockeyEmbedder from "../helpers/hockeyEmbedder";

const GAME_LIMIT = 3;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leafs')
        .setDescription('Replies with Leafs game stat')
        // .addUserOption(option =>
		// 	option
		// 		.setName('Team')
		// 		.setDescription('Team Abbreviation: i.e. "TOR" ')
		// 		.setRequired(true))
		.addStringOption((option) =>
			option.setName('team')
				.setDescription('Team abbreviation i.e. "TOR  SEA')
                .setRequired(true)
                .addChoices(
					{ name: 'Leafs', value: 'TOR' },
					{ name: 'Kraken', value: 'SEA' },
				)
        ),
    async execute(interaction: BaseCommandInteraction) {
        // const test_game = "2020020001";
        const team = interaction.options.get('team');
        await interaction.deferReply();

        const score = await getGames() as Boxscore;

        console.log("============ resp: ", score);

        if (score.id > 0) { // TODO: 

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