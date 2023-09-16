import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";
import getGames from "./getHockey";
import embedScore from "../helpers/hockeyEmbedder";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leafs')
        .setDescription('Replies with Leafs game stat'),
    async execute(interaction: BaseCommandInteraction) {
        const test_game = "2020020001";

        await interaction.deferReply();

        const resp = await getGames();

        console.log('resp: ', resp);

        let embed = embedScore(resp.dates[0]);

        // let resp = embedWeather(weather);
            // await interaction.reply({ embeds: [resp] });

        // await interaction.editReply(`leafs win woo:ubbyvy ${resp.dates[0].date}`);
        await interaction.editReply({ embeds: [embed] })
        
    }
}