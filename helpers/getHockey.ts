import dotenv from 'dotenv';
import { Root, Game } from '../data/game';
import { Boxscore } from '../data/_interfaces';


export default function getGames<Boxscore>(teamAbbr: string): Promise<Boxscore> {
    const teamGamesUrl = `https://api-web.nhle.com/v1/scoreboard/${teamAbbr}/now`
    return fetch(teamGamesUrl)
        .then(response => {
            if (!response.ok) {
                // console.log(process.env.weather_api_token);
                // console.log(location);
                console.log("======= RESPONSE INVALID =======", response);

                throw new Error(response.statusText)
            }
            // Confirm that this is parsing the response data correctly. 
            //This looks like it is returning the entire response, not just the game data.
            return response.json();
        })
}