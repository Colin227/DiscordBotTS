import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment, MessageEmbed } from "discord.js";
// import getGames, { getTeam } from "../helpers/getHockey";
// import { Game, GameSchedule } from "../data/_interfaces";
// import nodeHtmlToImage from "node-html-to-image";
// import puppeteer from "puppeteer-core";
// import chromium from "@sparticuz/chromium";
// import { getHockeyTemplate } from "../helpers/htmlToImage";
import dayjs from "dayjs";
import dotenv from 'dotenv';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(isSameOrBefore);
dotenv.config();

// TODO: Break this command up into smaller parts - separation of concerns

module.exports = {
    data: new SlashCommandBuilder()
        .setName('space')
        .setDescription('Astrology photo of the day.'),
        // .addUserOption((option) =>
        //     option.setName('team')
        //         .setDescription('Team abbreviation i.e. "TOR" or "SEA"')
        //         .setRequired(true)
        // ),
    async execute(interaction: CommandInteraction) {
        // const team = interaction.options.getString('team');
        // const teamStr = team.trim().toLowerCase();
        await interaction.deferReply();
        
        try {
            const nasaPhoto = await getApod();

            // console.log(nasaPhoto.hdurl);
            // Get the team data based on the user provided tricode.
            // const t = getTeam(teamStr);
            // Get the current game schedule
            // TODO: Unsure how the NHL api will handle this once preseason is over. Does the api return every game in the season? 
            // const score = await getGames(t.triCode) as GameSchedule;
            // const chromiumPath = await chromium.executablePath();

            // const gameArr = score.gamesByDate.map((date) => date.games[0]);
            // const outputGames = getOutputGames(gameArr);


            // const hockeyImg = await nodeHtmlToImage({
            //     html: getHockeyTemplate(outputGames, t),
            //     type: 'jpeg',
            //     quality: 100,
            //     puppeteer: puppeteer,
            //     puppeteerArgs: {
            //         args: chromium.args,
            //         executablePath: chromiumPath
            //       },
            //     encoding: 'binary'
            // }) as Buffer;
            // const img = new MessageAttachment(nasaPhoto.hdurl, 'apod.jpg')
            // const imgAttachment = new MessageAttachment(hockeyImg, `${t.triCode}_scoreboard.jpeg`);
            // const scoreboardAttachment = new MessageAttachment( scoreboardImg)
            // await interaction.editReply({ embeds: [hockeyEmbedder(score, t)], files: [teamFile, imgAttachment]})
            // await interaction.editReply({ files: []});

            const apodFields = [];
            // apodFields.push({name: `${nasaPhoto.title}`, value: `${nasaPhoto.explanation}`, inline: false})
  
            const nasaEmbed = new MessageEmbed()
                .setColor('DARK_BLUE') // TODO: Get colour
                .setTitle(`Astronomy Picture of the Day - ${nasaPhoto.date}`)
                .setDescription(nasaPhoto.explanation)
                .setImage(nasaPhoto.hdurl)
                // .setThumbnail(`attachment://${team.triCode}_light.png`)
                // .addFields(apodFields)
            
            await interaction.editReply({embeds: [nasaEmbed] });
            // await interaction.editReply()
        } catch (e) {
            console.log(e);
            await interaction.editReply(`Error getting game data, try again later. ${e}`);
        }
    }
}

// const getOutputGames = (games: Game[]) => {            
//     const today = dayjs();
//     let outputGames = games.filter((game) => dayjs(game.gameDate).isSameOrBefore(today)).slice(-2);
//     let nextGame = (games.filter((game) => !dayjs(game.gameDate).isSameOrBefore(today)))[0];
//     outputGames.push(nextGame);
//     return outputGames;
// }

export default function getApod(): Promise<ApodResponse> {
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.nasa_api_token}`
    return fetch(nasaUrl)
        .then(response => {
            if (!response.ok) {
                // console.log(process.env.weather_api_token);
                // console.log(location);
                console.log("======= RESPONSE INVALID =======", response);

                throw new Error(response.statusText)
            }
            // Confirm that this is parsing the response data correctly. 
            //This looks like it is returning the entire response, not just the game data.
            return response.json();
        })
}

interface ApodResponse {
	copyright: string;
	date: string;
	explanation: string;
	hdurl: string;
	media_type: string;
	service_version: string;
	title: string;
	url: string;
}