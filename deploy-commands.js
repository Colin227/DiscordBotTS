const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');

dotenv.config();
// const { clientId, guildId, token } = require('./config.json');


// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// Run this utility when adding or editing slash commands

const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
        new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        new SlashCommandBuilder().setName('weather').setDescription('Replies with weather forecast!'),
        new SlashCommandBuilder().setName('space').setDescription('Replies with NASA\'s photo of the day.'),
        new SlashCommandBuilder().setName('stock').setDescription('Replies with stock information!').addStringOption(option =>
            option.setName('ticker')
            .setDescription("The stock ticker to send")
            .setRequired(true)),
        new SlashCommandBuilder().setName('hockey').setDescription('Replies with hockey schedule!').addStringOption((option) =>
        option.setName('team')
            .setDescription('Team abbreviation i.e. "TOR  SEA')
            .setRequired(true)
    ),
        new SlashCommandBuilder().setName('goodmorning').setDescription('Replies with a good morning message!'),
        new SlashCommandBuilder().setName('help').setDescription("Replies with a list of all commands.")
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.api_token);

rest.put(Routes.applicationGuildCommands(process.env.app_id, process.env.channel_id), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);