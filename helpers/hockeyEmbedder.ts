// import { ColorResolvable, MessageEmbed } from "discord.js";
// import { GameSchedule, Team } from "../data/_interfaces";
// import dayjs from "dayjs";
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';


// dayjs.extend(utc);
// dayjs.extend(timezone);

// const tz = "America/Toronto";

// Values for game states, used to determine if a score should be shown.
export const gameStates = [
  'FINAL',
  'LIVE',
  'CRIT',
  'OFF'
]

// export default function embedScore(sched: GameSchedule, team: Team): MessageEmbed {
//   const { 
//     gamesByDate,
// } = sched;

// const fields = [];
// for (const [i, game] of gamesByDate.entries()) {
//   const g = game.games[0];
//   const gameDay = dayjs(g.startTimeUTC);
//   const gameLocal = gameDay.tz(tz);

//   let gameValue = "";

//   const date = gameLocal.format('MM/DD h:mmA')

//   if (gameStates.includes(g.gameState)) {
//     gameValue = `${g.awayTeam.score} - ${g.homeTeam.score}`;
//   } else {
//     gameValue = date;
//   }

//   fields.push({name: `${g.awayTeam.abbrev} @ ${g.homeTeam.abbrev}`, value: `${gameValue}`, inline: true})
  
//   // Add spacing after every 3 inline fields. Second condition ensures no extra spacing at end.
//   if (fields.filter(field => field.inline).length % 3 === 0 && i+1 !== gamesByDate.length ) {
//     fields.push({ name: '\u200B', value: '\u200B', inline: false });
//   }
// }

//     const embed = new MessageEmbed()
//     .setColor(team.color as ColorResolvable) // TODO: Check this casting type
//     .setTitle(`${team.triCode} Schedule`)
//     .setThumbnail(`attachment://${team.triCode}_light.png`)
//     .addFields(fields)
//     return embed;
// }