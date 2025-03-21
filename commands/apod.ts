import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment, MessageEmbed } from "discord.js";
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('space')
        .setDescription('Astrology photo of the day.'),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        
        try {
            const nasaPhoto = await getApod();

            console.log('nasaPhoto: ', nasaPhoto)

            // const apodFields = [];
  
            const nasaEmbed = new MessageEmbed()
                .setColor('DARK_BLUE') // TODO: Get colour
                .setTitle(`Astronomy Picture of the Day - ${nasaPhoto.date}`)
                .setDescription(nasaPhoto.explanation)
                .setImage(nasaPhoto.hdurl)
            
            await interaction.editReply({embeds: [nasaEmbed] });
        } catch (e) {
            console.log(e);
            await interaction.editReply(`Error getting NASA data, try again later. ${e}`);
        }
    }
}
/**
 * This function fetches the Astronomy Picture of the Day (APOD) from NASA's API
 * @returns A Promise that resolves to the APOD response.
 */

export default function getApod(): Promise<ApodResponse> {
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.nasa_api_token}`
    return fetch(nasaUrl)
        .then(response => {
            if (!response.ok) {
                console.log("======= RESPONSE INVALID =======", response);
                throw new Error(response.statusText)
            }
            return response.json();
        })
}

interface ApodResponse {
	copyright: string;
	date: string;
	explanation: string;
	hdurl: string;
	media_type: string;
	service_version: string;
	title: string;
	url: string;
}