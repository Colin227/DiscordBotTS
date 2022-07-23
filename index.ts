import { REST } from '@discordjs/rest';
import { Client, EmbedFieldData, GuildMember, Intents, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import dotenv from 'dotenv';
import getWeather from './commands/getWeather';
// const { getWeather } = require('./commands/getWeather');
import getLocation from './helpers/getLocation';
import Weather from './data/weather';
import createEmbedMessage from './helpers/embedMessage';
import embedWeather from './helpers/weatherEmbedder';
import Stock from './data/stock';
import getStock from './commands/getStock';
import embedStock from './helpers/stockEmbedder';
import goodMorning from './commands/goodMorning';
import morningMessage from './helpers/getMorningMessage';
import getHelp from './commands/getHelp';

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild?.name}`);
    } else if (commandName === 'user') {
        await interaction.reply(`User info: ${interaction.user}`);
    } else if (commandName === 'weather') {
        try {
            let weather: Weather = await (getWeather(getLocation(interaction.user)));
            let resp = embedWeather(weather);
            await interaction.reply({ embeds: [resp] });
        } catch (e) {
            await interaction.reply(`An error occurred: ${e.message}`);
        }
    } else if (commandName === 'stock') {
        const stock = interaction.options.getString('ticker');
        try {
            const stockResp: any = await (getStock(stock));
            const stockInfo = stockResp.quoteResponse.result[0];
            let resp = embedStock(stockInfo);
            await interaction.reply({ embeds: [resp] });
        } catch (e) {
            console.log(e);
            await interaction.reply(`An error occurred: ${stock} was not found. Contact your local Mat Langer for assistance.`);
        }
    } else if (commandName === 'goodmorning') {
        try {
            let weather: Weather = await (goodMorning(getLocation(interaction.user)));
            


            //console.log(interaction.member?.nickname || interaction.member?.nick);
            let resp = morningMessage(weather, interaction.user);
            await interaction.reply(resp);
        } catch (e) {
            console.log(e);
            await interaction.reply(`An error occurred: contact Mat Langer for support.`);
        }
    } else if (commandName === 'help') {
        try {
            let helpEmbed = getHelp();
            await interaction.reply({ embeds: [helpEmbed]});
        } catch (e) {
            console.log(e);
            await interaction.reply(`An error occurred: contact Mat Langer for support.`);
        }
    }
});


// Login to Discord with your client's token
client.login(process.env.api_token);