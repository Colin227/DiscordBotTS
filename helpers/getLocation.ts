// import { config } from('../utils/environment');
import { User } from "discord.js";
import WeatherRequest from "../data/weatherRequest";
import * as users from "../data/users.json";

export default function getLocation(user: User): string {
    console.log(`User tag = ${user.tag}`);
    for (const [key, value] of Object.entries(users)){
        if (value.userId === user.tag){
            // console.log(`The user tag is a match for user: `)
            return value.location;
        }
    }
    return "No location found.";
}