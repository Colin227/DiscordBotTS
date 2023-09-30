import dotenv from 'dotenv';
import { Root, Game } from '../data/game';
import { Boxscore, Team, Teams } from '../data/_interfaces';
import * as _teams from '../data/teams.json';

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

export function getTeam(teamAbbr: string): Team {
    const { data } = _teams;
    const team = data.find(obj => {
        return obj.triCode === teamAbbr.trim().toUpperCase(); // TODO: could handle user input more securely
    })

    if (team === undefined) {
        return {
            id:          0,
            franchiseId: null,
            fullName:    "NO_TEAM",
            leagueId:    0,
            rawTricode:  "nnn",
            triCode:     "nnn",
        } as Team;
    }
    return team as Team;
}

