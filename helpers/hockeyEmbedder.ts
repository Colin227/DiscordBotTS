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
export default function embedScore(sched: GameSchedule): MessageEmbed {
  const { 
    gamesByDate,
} = sched;

const fields = [];
for (let game of gamesByDate) {
  let g = game.games[0];
  let gameDay = dayjs(g.startTimeUTC);
  let gameLocal = gameDay.tz(tz);
  let date = gameLocal.format('MM/DD h:mmA')

  fields.push({name: `${g.awayTeam.name} @ ${g.homeTeam.name}`, value: `${date}`})
}

    const embed = new MessageEmbed()
    .setColor('#00205B')
    .setTitle("Schedule")
    .setDescription("Upcoming Schedule")
    .addFields(fields)
    return embed;
}