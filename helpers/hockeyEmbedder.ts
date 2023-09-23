import { EmbedFieldData, MessageEmbed } from "discord.js";
import { Game } from "../data/game";
import { Boxscore, GameSchedule } from "../data/_interfaces";
import dayjs, { Dayjs } from "dayjs";

// export interface GameDay {
//     date: string,
//     totalItems: number,
//     totalEvents: number,
//     totalGames: number,
//     games: Array<any>,
//     events: Array<any>,
//     matches: Array<any>
// }



// TODO: Typing 
export default function embedScore(sched: GameSchedule): MessageEmbed {
  const { 
    focusedDate,
    gamesByDate,
} = sched;

const fields = [];
for (let game of gamesByDate) {
  let g = game.games[0];
  fields.push({name: `${g.awayTeam.name} @ ${g.homeTeam.name}`, value: dayjs(g.startTimeUTC).format('MM/DD h:mmA')})
  

}


    // console.log("=== GAMEDAY === :", game);
    console.log("EMBEDDING HOCKEY BOXSCORE - fields: ", fields);
    const embed = new MessageEmbed()
    .setColor('#00205B')
    .setTitle("Schedule")
    .setDescription("Upcoming Schedule")
    .addFields(fields)
    // const embed = new MessageEmbed()
    // .setColor('#00205B')
    // .setTitle(`${awayTeam.name} @ ${homeTeam.name}`)
    // // .setTitle(`${game.gameDate}`)
    // .setDescription(gameDate.toString())
    // // .setThumbnail(``)
    // .addFields(
    //         [
    //             {
    //                 name: `TESTING NAME`,
    //                 value: `TESTING VALUE`,
                    
    //             },
    //             // {
    //             //     name: `${game.teams?.away.team.name}`,
    //             //     value: `${game.teams?.away.score}`,
    //             //     // inline: true
    //             //     // value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
    //             // },
    //             // {
    //             //     name: "Tomorrow's Forecast",
    //             //     value: `${weather.forecast.forecastday[1].day.avgtemp_c} \u00b0C - ${weather.forecast.forecastday[1].day.condition.text}`
    //             // }
    //             {
    //                 name: `hello`,
    //                 value: `world`,
    //                 // inline: true
    //                 // value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
    //             },
    //         ]
    // )
    return embed;
}