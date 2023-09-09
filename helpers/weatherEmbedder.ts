import { MessageEmbed } from "discord.js";
import Weather from "../data/weather";

/***
 * @param Weather
 * Take in a weather object and return a message embed object
 * that contains the formatted weather data.
 */
export default function embedWeather(weather: Weather): MessageEmbed {
    const embed = new MessageEmbed()
    .setColor('#ffe333')
    .setTitle(`${weather.location.name}`)
    .setDescription("Current Forecast")
    .setThumbnail(`https:${weather.current.condition.icon}`)
    .addFields(
            [
                {
                    name: `Current Weather`,
                    value: `${weather.current.temp_c} \u00b0C - ${weather.current.condition.text}`
                    // value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
                },
                {
                    name: "Tomorrow's Forecast",
                    value: `${weather.forecast.forecastday[1].day.avgtemp_c} \u00b0C - ${weather.forecast.forecastday[1].day.condition.text}`
                }
            ]
    )
    return embed;
}