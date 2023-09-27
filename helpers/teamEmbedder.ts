import { MessageEmbed } from "discord.js";
import { GameSchedule, Team } from "../data/_interfaces";
// // import dayjs from "dayjs";
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';


// dayjs.extend(utc);
// dayjs.extend(timezone);

// const tz = "America/Toronto";

export default function embedTeam(team: Team): MessageEmbed {
//   const { 
//     gamesByDate,
// } = sched;

// const fields = [];
// for (let game of gamesByDate) {
//   let g = game.games[0];
//   let gameDay = dayjs(g.startTimeUTC);
//   let gameLocal = gameDay.tz(tz);
//   let date = gameLocal.format('MM/DD h:mmA')

//   fields.push({name: `${g.awayTeam.name} @ ${g.homeTeam.name}`, value: `${date}`})
// }

    const embed = new MessageEmbed()
    .setColor('#00205B')
    .setTitle("Team")
    .setDescription(`team: ${team.fullName}`)
    .addFields([
        {name: "hello", value: "world"},
    ])
    .setImage('../assets/teams/.svg')
    return embed;
}