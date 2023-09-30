import { MessageEmbed } from "discord.js";
import { GameSchedule } from "../data/_interfaces";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

const tz = "America/Toronto";

export default function embedScore(sched: GameSchedule, teamTriCode: string): MessageEmbed {
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

  if (g.gameState === 'FINAL') {
    gameValue = `${g.awayTeam.score} - ${g.homeTeam.score}`;
  } else {
    gameValue = date;
  }

  fields.push({name: `${g.awayTeam.name} @ ${g.homeTeam.name}`, value: `${gameValue}`})
}

    const embed = new MessageEmbed()
    .setColor('#00205B')
    .setTitle(`${teamTriCode} Schedule`)
    .setThumbnail(`attachment://${teamTriCode}_light.png`)
    .addFields(fields)
    return embed;
}