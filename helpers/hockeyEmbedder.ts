import { MessageEmbed } from "discord.js";
import { Game } from "../data/game";


export interface GameDay {
    date: string,
    totalItems: number,
    totalEvents: number,
    totalGames: number,
    games: Array<any>,
    events: Array<any>,
    matches: Array<any>
}


/**
 *   {
    gamePk: 2017020617,
    link: '/api/v1/game/2017020617/feed/live',
    gameType: 'R',
    season: '20172018',
    gameDate: '2018-01-05T00:00:00Z',
    status: {
      abstractGameState: 'Final',
      codedGameState: '7',
      detailedState: 'Final',
      statusCode: '7',
      startTimeTBD: false
    },
    teams: { away: [Object], home: [Object] },
    venue: {
      id: 5015,
      name: 'Air Canada Centre',
      link: '/api/v1/venues/5015'
    },
    content: { link: '/api/v1/game/2017020617/content' }
  }
 * 
 * 
 */

// TODO: Typing 
export default function embedScore(game: Game): MessageEmbed {



    console.log("=== GAMEDAY === :", game);

    const embed = new MessageEmbed()
    .setColor('#00205B')
    .setTitle(`${game.gameDate}`)
    .setDescription("description here")
    // .setThumbnail(``)
    .addFields(
            [
                {
                    name: `${game?.teams?.home.team.name}`,
                    value: `${game?.teams?.home.score}`,
                    // inline: true
                    // value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
                },
                {
                    name: `${game.teams?.away.team.name}`,
                    value: `${game.teams?.away.score}`,
                    // inline: true
                    // value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
                },
                // {
                //     name: "Tomorrow's Forecast",
                //     value: `${weather.forecast.forecastday[1].day.avgtemp_c} \u00b0C - ${weather.forecast.forecastday[1].day.condition.text}`
                // }
            ]
    )
    return embed;
}