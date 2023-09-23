import { REST } from '@discordjs/rest';
import { Client, ClientOptions, Collection, EmbedFieldData, GuildMember, Intents, MessageActionRow, MessageButton, MessageEmbed, BaseCommandInteraction } from 'discord.js';
import dotenv from 'dotenv';
import getWeather from './commands/_commands/getWeather';
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
import getHelp from './commands/_commands/getHelp';
import fs from 'node:fs';
import path from 'node:path';
import { ClientC } from './utils/ClientExtended';

dotenv.config();


// Create a new client instance
const client = new ClientC({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const interactionClient = interaction.client as ClientC;
    const command: any = interactionClient.commands.get(interaction.commandName);
    
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found!`);
        return;
    }

    try {
        await command.execute(interaction)
    } catch (e: any) {
        console.log('caught error in index: ', e);
    }
    
    console.log(interaction);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'pinggg') {
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
            let guild = await client.guilds.fetch(process.env.channel_id);
            let guildMember = await guild.members.fetch(interaction.user);
            let nickname = guildMember?.nickname || interaction.user;
            let weather: Weather = await (goodMorning(getLocation(interaction.user)));
            

            let resp = morningMessage(weather, nickname);
            await interaction.reply(resp);
        } catch (e) {
            console.log(e);
            await interaction.reply(`An error occurred: contact Mat Langer for support. ${e.message}`);
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