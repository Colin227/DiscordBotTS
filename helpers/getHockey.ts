// import { config } from('../utils/environment');
import { User } from "discord.js";
import WeatherRequest from "../data/weatherRequest";
import * as users from "../data/users.json";

/***
* Gets the  as a string from the
* users.JSON file. 
* @return string This is the postal code or long/lat of the user's location.
*/
export default function getScore(game: any): any{
    console.log(`hockey score here`);
    // console.log(`User username = ${user.username}`);
    // console.log(user);
    // for (const [key, value] of Object.entries(users)){
    //     if (value.userId === user.tag){
    //         return value.location;
    //     }
    // }





    throw new Error(`No game found for ${game}`);
    // return "No location found.";
}