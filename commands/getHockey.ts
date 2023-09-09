// import Game from '../data/Game';
// import dotenv from 'dotenv';

// const test_game = "2020020001";


// dotenv.config();

// export default function getGames<Game>(gameDateID: string): Promise<Game> {
//     return fetch(`http://statsapi.web.nhl.com/api/v1/game/${gameDateID}}/content`)
//         .then(response => {
//             if (!response.ok) {
//                 // console.log(process.env.weather_api_token);
//                 // console.log(location);
//                 // console.log(response);

//                 throw new Error(response.statusText)
//             }
//             // Confirm that this is parsing the response data correctly. 
//             //This looks like it is returning the entire response, not just the game data.
//             return response.json() as Promise<Game>
//         })
// }