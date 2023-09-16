import dotenv from 'dotenv';

const test_game = "2020020001";

// Date param is placeholder for development. 
// If not included, returns today's game if any.
const leafsGameUrl = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=10&date=2018-01-04";



// dotenv.config();

export default function getGames<Game>(): Promise<any> {
    
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
            return response.json() as Promise<any>
        })
}