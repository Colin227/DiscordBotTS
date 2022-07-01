// import { config } from('../utils/environment');
import { User } from "discord.js";
import WeatherRequest from "../data/weatherRequest";
import users from "../data/users.json";

export default function getLocation(user: User): string {
    for (const [key, value] of Object.entries(users)){
        if (value.userId === user.id){
            console.log(`The user id is a match for user:`)
        }
    }
    return "hi";
}