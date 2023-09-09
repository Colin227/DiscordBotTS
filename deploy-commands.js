const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();
// const { clientId, guildId, token } = require('./config.json');


// Run this utility when adding or editing slash commands

const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
        new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        new SlashCommandBuilder().setName('weather').setDescription('Replies with weather forecast!'),
        new SlashCommandBuilder().setName('stock').setDescription('Replies with stock information!').addStringOption(option =>
            option.setName('ticker')
            .setDescription("The stock ticker to send")
            .setRequired(true)),
        new SlashCommandBuilder().setName('goodmorning').setDescription('Replies with a good morning message!'),
        new SlashCommandBuilder().setName('help').setDescription("Replies with a list of all commands.")
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.api_token);

rest.put(Routes.applicationGuildCommands(process.env.app_id, process.env.channel_id), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);