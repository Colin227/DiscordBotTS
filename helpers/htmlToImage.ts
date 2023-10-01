import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Game, Team } from "../data/_interfaces";
import { gameStates } from "./hockeyEmbedder";
dayjs.extend(utc);
dayjs.extend(timezone);

const getHockeyTemplate = (games: Game[], primaryTeam: Team) => {
  let gameScores: string = '';
  for (let game of games) {
    gameScores += `<div class="parent">
      <div class="teamAwayLogo"><img src="${game.awayTeam.logo}" class="logo"></div>
    <div class="logoSpacer">@</div>
    <div class="teamHomeLogo">
    <img src="${game.homeTeam.logo}" class="logo">
    </div>
    <div class="teamAwayName">${game.awayTeam.abbrev}</div>
    <div class="teamNameSpacer"></div>
    <div class="teamHomeName">${game.homeTeam.abbrev}</div>
    <div class="teamAwayDetails"><span class="score">${game.awayTeam.score || ''}</span></div>
    <div class="teamDetailsSpacer">${gameStates.includes(game.gameState) ? game.gameState : dayjs(game.startTimeUTC).tz("America/Toronto").format('MM/DD h:mmA')}</div>
    <div class="teamHomeDetails"><span class="score">${game.homeTeam.score || ''}</span></div>
  </div>`
  }

  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background: rgb(22, 22, 22);
        border: 5px solid ${primaryTeam.color};
        color: #fff;
        max-width: 500px;
        height: fit-content;
      }
      .parent {
        display: grid;
        grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        }
        
        .teamAwayLogo { grid-area: 1 / 1 / 3 / 3; }
        .logoSpacer { 
            grid-area: 1 / 3 / 3 / 4; 

        }
        .teamHomeLogo { grid-area: 1 / 4 / 3 / 6; }
        .teamAwayName{ grid-area: 3 / 1 / 4 / 3; }
        .teamNameSpacer { 
          grid-area: 3 / 3 / 4 / 4;
          font-size: 3fr;
          font-weight: 700;
      }
        .teamHomeName { grid-area: 3 / 4 / 4 / 6; }
        .teamAwayDetails { grid-area: 4 / 1 / 6 / 3; }
        .teamDetailsSpacer { 
          grid-area: 4 / 3 / 6 / 4;
          text-align: center;
        }
        .teamHomeDetails { grid-area: 4 / 4 / 6 / 6; }
        .parent > * {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .score {
            font-size: 50px;
            font-weight: 900;
        }
        .logo {
            max-width: 100px;
            padding-top: 10px;
        }
        .parent:not(:last-child) {
          border-bottom: 1px solid #e0e0e0;
        }
        
    </style>
  </head>
  <body>
  ${gameScores}
  </body>
</html>
    `
}

export default getHockeyTemplate;