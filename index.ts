import { Intents } from 'discord.js';
import dotenv from 'dotenv';
import getStock from './commands/getStock';
import embedStock from './helpers/stockEmbedder';
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