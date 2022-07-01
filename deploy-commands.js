const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();
// const { clientId, guildId, token } = require('./config.json');

const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
        new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        new SlashCommandBuilder().setName('weather').setDescription('Replies with weather forecast!'),
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.api_token);

rest.put(Routes.applicationGuildCommands(process.env.app_id, process.env.channel_id), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);