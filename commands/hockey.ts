import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment } from "discord.js";
import getGames, { getTeam } from "../helpers/getHockey";
import { Game, GameSchedule } from "../data/_interfaces";
import hockeyEmbedder, { gameStates } from "../helpers/hockeyEmbedder";
import nodeHtmlToImage from "node-html-to-image";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import getHockeyTemplate from "../helpers/htmlToImage";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

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
            const chromiumPath = await chromium.executablePath();

            const gameArr = score.gamesByDate.map((date) => date.games[0]);
            const outputGames = getOutputGames(gameArr);


            const hockeyImg = await nodeHtmlToImage({
                html: getHockeyTemplate(outputGames, t),
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

const getOutputGames = (games: Game[]) => {            
    const today = dayjs();
    let outputGames = games.filter((game) => dayjs(game.gameDate).isSameOrBefore(today)).slice(-3);
    let nextGame = (games.filter((game) => !dayjs(game.gameDate).isSameOrBefore(today)))[0];
    outputGames.push(nextGame);
    return outputGames;
}