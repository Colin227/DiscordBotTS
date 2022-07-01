import { REST } from '@discordjs/rest';
import { Client, EmbedFieldData, Intents, MessageEmbed } from 'discord.js';
import dotenv from 'dotenv';
import getWeather from './commands/getWeather';
// const { getWeather } = require('./commands/getWeather');
import getLocation from './helpers/getLocation';
import Weather from './data/weather';
import createEmbedMessage from './helpers/embedMessage';
import embedWeather from './helpers/weatherEmbedder';
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
        // // get weather based on the user info.
        // let location = getLocation(interaction.user);
        // let weather: Weather = await (getWeather(location));
        // let resp = createEmbedMessage(`${weather.location.name}`, "Weather", weather.forecast.forecastday[0].date, weather.forecast.forecastday[0].day.avgtemp_c.toString());
        // // await interaction.reply(`The weather in ${weather.location.name} today is ${weather.current.temp_c} degrees Celsius.`);
        // await interaction.reply({embeds: [ resp ]});
        // get weather based on the user info.



        let weather: Weather = await (getWeather(getLocation(interaction.user)));

        // let location = getLocation(interaction.user);
        // let weather: Weather = await (getWeather(location));



        //  const fieldDataArray: EmbedFieldData[] = [
        //     {
        //         name: `Date: ${weather.forecast.forecastday[0].date}`, 
        //         value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
        //     }

        // ];
        // create an embedded message - likely change this function to accept the weather data and format it inside the function
        //let resp = createEmbedMessage(`${weather.location.name}`, "Weather", ...fieldDataArray);
        let resp = embedWeather(weather);
        await interaction.reply({ embeds: [resp] });
    }
});


// Login to Discord with your client's token
client.login(process.env.api_token);