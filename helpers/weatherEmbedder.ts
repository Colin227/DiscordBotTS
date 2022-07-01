import { MessageEmbed } from "discord.js";
import Weather from "../data/weather";

export default function embedWeather(weather: Weather): MessageEmbed {
    const embed = new MessageEmbed()
    .setColor('#00099ff')
    .setTitle(`${weather.location.name}`)
    .setDescription("Current Forecast")
    .addFields(
            [
                {
                    name: `Date: ${weather.forecast.forecastday[0].date}`,
                    value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
                }
            ]
    )
    return embed;
}