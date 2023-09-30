import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment } from "discord.js";
import getGames, { getTeam } from "../helpers/getHockey";
import { GameSchedule } from "../data/_interfaces";
import hockeyEmbedder, { gameStates } from "../helpers/hockeyEmbedder";
import nodeHtmlToImage from "node-html-to-image";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import getHockeyTemplate from "../helpers/htmlToImage";

// TODO: Break this command up into smaller parts - separation of concerns

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

            const gameArr = score.gamesByDate.map((date) => date.games[0]);
            let outputArr = [];

            // Get the first game that is not a finished or in progress game - add the previous 3 (?) games to the template
            const mostRecentGameIndex = gameArr.findLastIndex((game) => gameStates.includes(game.gameState) );

            if (mostRecentGameIndex >= 0) {
                let tmpArr = gameArr.slice(0, mostRecentGameIndex + 2);
                outputArr.push(...tmpArr.slice(-3));
            } else {
                outputArr.push(gameArr);
            }


            const hockeyImg = await nodeHtmlToImage({
                html: getHockeyTemplate(outputArr, t),
                type: 'jpeg',
                quality: 100,
                puppeteer: puppeteer,
                puppeteerArgs: {
                    args: chromium.args,
                    executablePath: chromiumPath
                  },
                encoding: 'binary'
            }) as Buffer;
            
            const imgAttachment = new MessageAttachment(hockeyImg, `${t.triCode}_scoreboard.jpeg`);
            // const scoreboardAttachment = new MessageAttachment( scoreboardImg)
            // await interaction.editReply({ embeds: [hockeyEmbedder(score, t)], files: [teamFile, imgAttachment]})
            await interaction.editReply({ files: [imgAttachment]});
            // await interaction.editReply()
        } catch (e) {
            await interaction.editReply(`Error getting game data, try again later. ${e}`);
        }
    }
}