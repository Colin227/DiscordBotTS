import { ColorResolvable, MessageEmbed } from "discord.js";
import { GameSchedule, Team } from "../data/_interfaces";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

const tz = "America/Toronto";

// Values for game states, used to determine if a score should be shown.
const gameStates = [
  'FINAL',
  'LIVE',
  'CRIT',
  'OFF'
]

export default function embedScore(sched: GameSchedule, team: Team): MessageEmbed {
  const { 
    gamesByDate,
} = sched;

const fields = [];
for (let game of gamesByDate) {
  const g = game.games[0];
  const gameDay = dayjs(g.startTimeUTC);
  const gameLocal = gameDay.tz(tz);

  let gameValue = "";

  const date = gameLocal.format('MM/DD h:mmA')

  if (gameStates.includes(g.gameState)) {
    gameValue = `${g.awayTeam.score} - ${g.homeTeam.score}`;
  } else {
    gameValue = date;
  }

  fields.push({name: `${g.awayTeam.name} @ ${g.homeTeam.name}`, value: `${gameValue}`})
}

    const embed = new MessageEmbed()
    .setColor(team.color as ColorResolvable) // TODO: Check this casting type
    .setTitle(`${team.triCode} Schedule`)
    .setThumbnail(`attachment://${team.triCode}_light.png`)
    .addFields(fields)
    return embed;
}