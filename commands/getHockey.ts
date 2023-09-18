import dotenv from 'dotenv';
import { Root, Game } from '../data/game';

const test_game = "2020020001";

// Date param is placeholder for development. 
// If not included, returns today's game if any.
// const leafsGameUrl = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=10&startate=2018-01-04";




// dotenv.config();

export default function getGames<Game>(): Promise<Game> {
    let today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(new Date().getDate() - 7);

    const year = today.getFullYear();
    const prevYear = lastWeek.getFullYear();
    const month = today.getMonth();
    const prevMonth = lastWeek.getMonth();
    const day = today.getDate();
    const prevDay = lastWeek.getDate();

    let currentDate = `${year}-${month}-${day}`;
    let prevDate = `${prevYear}-${prevMonth}-${prevDay}`;

    const leafsGameUrl = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=10&teamId=10&startDate=2018-01-04&endDate=2018-02-04";
    return fetch(leafsGameUrl)
        .then(response => {
            if (!response.ok) {
                // console.log(process.env.weather_api_token);
                // console.log(location);
                console.log(response);

                throw new Error(response.statusText)
            }
            // Confirm that this is parsing the response data correctly. 
            //This looks like it is returning the entire response, not just the game data.
            return response.json();
        })
}