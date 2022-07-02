// import { config } from('../utils/environment');
import { User } from "discord.js";
import WeatherRequest from "../data/weatherRequest";
import * as users from "../data/users.json";

/***
* Gets the user's location information as a string from the
* users.JSON file. 
* @return string This is the postal code or long/lat of the user's location.
*/
export default function getLocation(user: User): string {
    console.log(`User tag = ${user.tag}`);
    for (const [key, value] of Object.entries(users)){
        if (value.userId === user.tag){
            return value.location;
        }
    }
    return "No location found.";
}