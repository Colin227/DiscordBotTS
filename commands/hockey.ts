import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment } from "discord.js";
import getGames, { getTeam } from "../helpers/getHockey";
import { GameSchedule } from "../data/_interfaces";
import hockeyEmbedder from "../helpers/hockeyEmbedder";
import nodeHtmlToImage from "node-html-to-image";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import getHockeyTemplate from "../helpers/htmlToImage";

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
            // Get the team logo from stored assets.
            const teamFile = new MessageAttachment(`../Discordjs/assets/teams/${t.triCode}_light.png`);
            const chromiumPath = await chromium.executablePath();

            const hockeyImg = await nodeHtmlToImage({
                html: getHockeyTemplate(score.gamesByDate[0].games[0]),
                puppeteer: puppeteer,
                puppeteerArgs: {
                    args: chromium.args,
                    executablePath: chromiumPath
                  },
                encoding: 'binary'
            }) as Buffer;
            
            const imgAttachment = new MessageAttachment(hockeyImg, 'TOR.jpeg');
            // const scoreboardAttachment = new MessageAttachment( scoreboardImg)
            await interaction.editReply({ embeds: [hockeyEmbedder(score, t)], files: [teamFile, imgAttachment]})
            // await interaction.editReply()
        } catch (e) {
            await interaction.editReply(`Error getting game data, try again later. ${e}`);
        }
    }
}