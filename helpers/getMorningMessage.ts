import { User } from "discord.js";
import Weather from "../data/weather";

/***
 * @param Weather
 * Take in a weather object and return a string with the good morning message.
 */
export default function embedMorning(weather: Weather, user: User | string): string {
    if (typeof user === "string") {
        return ( `Good morning ${user}! The weather in ${weather.location.name} is currently ${weather.current.temp_c}\u00b0C`)
    }
    return (
        `Good morning ${user.username}! The weather in ${weather.location.name} is currently ${weather.current.temp_c}\u00b0C`
    );
}