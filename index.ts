import { REST } from '@discordjs/rest';
import { Client, EmbedFieldData, Intents, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
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
// type Weather = typeof WeatherResponse;
dotenv.config();



// const commands = [{
//     name: 'ping',
//     description: 'Replies with Pong!',
// }, ];

// const rest = new REST({ version: '10' }).setToken(process.env.api_token);

// (async() => {
//     try {
//         console.log('Started refreshing application (/) commands.');

//         await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

//         console.log('Successfully reloaded application (/) commands.');
//     } catch (error) {
//         console.error(error);
//     }
// })();

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
            
            // TODO: move this to an embedStock function.
            // await interaction.reply(`${stockInfo[0].symbol}: $${stockInfo[0].regularMarketPrice} ${stockInfo[0].currency}`) ;
            await interaction.reply({ embeds: [resp] });
        } catch (e) {
            console.log(e);
            await interaction.reply(`An error occurred: ${stock} was not found.`);
        }
    }
});


// Login to Discord with your client's token
client.login(process.env.api_token);