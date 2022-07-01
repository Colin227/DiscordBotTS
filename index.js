import { REST } from '@discordjs/rest';
import { Routes, Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
// const { getWeather } = require('./commands/getWeather');
import { getLocation } from './helpers/getLocation.ts';

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
        await interaction.reply(`Server name: ${interaction.guild.name}`);
    } else if (commandName === 'user') {
        await interaction.reply(`User info: ${interaction.user}`);
    } else if (commandName === 'weather') {
        // get weather based on the user info.
        getLocation(interaction.user);
        await interaction.reply("Weather here");
    }
});


// Login to Discord with your client's token
client.login(process.env.api_token);