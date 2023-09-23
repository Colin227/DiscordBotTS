
// import dotenv from 'dotenv';

import { MessageEmbed } from "discord.js";

// dotenv.config();

export default function getHelp() {
    const embed = new MessageEmbed()
    .setColor('#ffe333')
    .setTitle(`Command List`)
    .setDescription("List of all currently available commands and their functions.")
    .addFields(
            [
                {
                    name: `/goodmorning`,
                    value: `Returns a morning greeting with your weather forecast.`
                },
                {
                    name: "/stock <TICKER>",
                    value: `Returns the current stock inforation for the provided ticker.`
                },
                {
                    name: "/weather",
                    value: "Returns the current weather forecast."
                }
            ]
    )
    return embed;

   
}