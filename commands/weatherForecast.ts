
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember, MessageAttachment } from 'discord.js';
import dotenv from 'dotenv';
import { APIInteractionGuildMember } from 'discord.js/node_modules/discord-api-types/v9';
import getWeatherData from '../helpers/getWeatherData';
import getLocation from '../helpers/getLocation';
import Weather from '../data/weather';
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import nodeHtmlToImage from 'node-html-to-image';
import { getForecastTemplate } from '../helpers/htmlToImage';

dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Replies with a good morning message!'),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        try {
            const nickname = getNickname(interaction.member);
            const weather: Weather = await getWeatherData(getLocation(interaction.user));
            const chromiumPath = await chromium.executablePath();
            const forecastImg = await nodeHtmlToImage({
                html: getForecastTemplate(weather, nickname),
                type: 'jpeg',
                quality: 100,
                puppeteer: puppeteer,
                puppeteerArgs: {
                    args: chromium.args,
                    executablePath: chromiumPath
                },
                encoding: 'binary'
            }) as Buffer;

            const imgAttachment = new MessageAttachment(forecastImg, `forecast_${nickname}.jpeg`);
            await interaction.editReply({ files: [imgAttachment] });

        } catch (e) {
            console.log(e);
            await interaction.reply(`An error occurred: contact Mat Langer for support. ${e.message}`);
        }
    }
}

type Mem =
    | GuildMember
    | APIInteractionGuildMember;

const getNickname = (member: Mem): string  => {
    if ("displayName" in member) {
        return member.displayName;
    }
    return member.nick;
}
