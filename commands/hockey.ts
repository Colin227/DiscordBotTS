import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";
import getGames from "./getHockey";
import embedScore from "../helpers/hockeyEmbedder";
import { Game, Root } from "../data/game";

const GAME_LIMIT = 3;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leafs')
        .setDescription('Replies with Leafs game stat'),
    async execute(interaction: BaseCommandInteraction) {
        // const test_game = "2020020001";

        await interaction.deferReply();

        const resp = await getGames() as Root;



        if (resp.dates !== undefined && resp.dates.length > 0) {

            let embeds = [];

            console.log('resp: ', resp);

            let gameDates = resp.dates;

            for (const [i, day] of gameDates.entries()) {
                
                if (i >= GAME_LIMIT) break;
                

                if (day.totalGames > 0) {

                



                console.log("destructuring root into game day: ", day);

                let embed = embedScore(day.games[0]);

                embeds.push(embed);

                }


                // let resp = embedWeather(weather);
                // await interaction.reply({ embeds: [resp] });

                // await interaction.editReply(`leafs win woo:ubbyvy ${resp.dates[0].date}`);

            }
console.log('embeds ========= : ', embeds);

            await interaction.editReply({ embeds })
        
        } else {
            await interaction.editReply("No games found.");
        }
    }
}