import { MessageEmbed } from "discord.js";


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
export default function embedScore(gameDay: GameDay): MessageEmbed {
    // if (gameDay.totalGames < 1) {
    //     return embed;
    // }
    // TODO: handle no games on the provided day

    console.log('game home team: ', gameDay.games[0].teams.home);

    

    const embed = new MessageEmbed()
    .setColor('#00205B')
    .setTitle(`${gameDay.date}`)
    .setDescription("description here")
    // .setThumbnail(``)
    .addFields(
            [
                {
                    name: `${gameDay.games[0].teams.home.team.name}`,
                    value: `${gameDay.games[0].teams.home.score}`,
                    // inline: true
                    // value: `${weather.forecast.forecastday[0].day.avgtemp_c} \u00b0C` 
                },
                {
                    name: `${gameDay.games[0].teams.away.team.name}`,
                    value: `${gameDay.games[0].teams.away.score}`,
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