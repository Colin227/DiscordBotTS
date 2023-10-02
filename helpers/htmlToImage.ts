import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Game, Team } from "../data/_interfaces";
import { gameStates } from "./hockeyEmbedder";
import Weather from "../data/weather";
import { User } from "discord.js";
import getTimeOfDay from "./getTimeOfDay";
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
    <div class="teamNameSpacer">${gameStates.includes(game.gameState) ? game.gameState : ' '}</div>
    <div class="teamHomeName">${game.homeTeam.abbrev}</div>
    <div class="teamAwayDetails"><span class="score">${game.awayTeam.score || ''}</span></div>
    <div class="teamDetailsSpacer">${gameStates.includes(game.gameState) ? ' ' : dayjs(game.startTimeUTC).tz("America/Toronto").format('MMM DD h:mmA')}</div>
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

const getMorningTemplate = (weather: Weather, user: string) => {
  const timeOfDay = getTimeOfDay(dayjs().tz("America/Toronto")); // Get humanized greeting time of day.
  const weatherCardStyle = `@import url(https://fonts.googleapis.com/css?family=Roboto:400,300);
  html,
  body {
    background-color: #f3f3f3;
    font-family: "Roboto", sans-serif;
  }
  .card {
    margin: 0 auto;
    margin-top: 5%;
    padding: 5px 30px;
    width: 290px;
    height: 470px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
  };
  h1,
  h2,
  h3,
  h4 {
    position: relative;
  }
  
  h1 {
    float: right;
    color: #666;
    font-weight: 300;
    font-size: 6.59375em;
    line-height: 0.2em;
  }
  
  h2 {
    font-weight: 300;
    font-size: 2.25em;
  }
  
  h3 {
    float: left;
    margin-right: 33px;
    color: #777;
    font-weight: 400;
    font-size: 1em;
  }
  
  .measurements {
    margin-left: 24px;
    color: #999;
    font-weight: 300;
  }
  
  .sky {
      position: relative;
      margin-top: 108px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #03A9F4;
      display: flex;
      justify-content; center;
      align-items; center;
  }

  
  table {
      position: relative;
      top: 10px;
      width: 100%;
      text-align: center;
  }
  
  tr:nth-child(1) td:nth-child(1),
  tr:nth-child(1) td:nth-child(2),
  tr:nth-child(1) td:nth-child(3),
  tr:nth-child(1) td:nth-child(4),
  tr:nth-child(1) td:nth-child(5) {
      padding-bottom: 32px;
  }
  
  tr:nth-child(2) td:nth-child(1),
  tr:nth-child(2) td:nth-child(2),
  tr:nth-child(2) td:nth-child(3),
  tr:nth-child(2) td:nth-child(4),
  tr:nth-child(2) td:nth-child(5) {
      padding-bottom: 7px;
  }
  
  tr:nth-child(3) td:nth-child(1),
  tr:nth-child(3) td:nth-child(2),
  tr:nth-child(3) td:nth-child(3),
  tr:nth-child(3) td:nth-child(4),
  tr:nth-child(3) td:nth-child(5) {
      padding-bottom: 7px;
  }
  
  tr:nth-child(2),
  tr:nth-child(3) {
      font-size: .9em;
  }
  
  tr:nth-child(3) {
      color: #999;
  }
  
  tr:nth-child(2),
  tr:nth-child(3) {
      font-size: .9em;
  }
  
  tr:nth-child(3) {
      color: #999;
  }`;

  let forecastDays = ``;
  let forecastHigh = ``;
  let forecastLow = ``;

  for (const f of weather.forecast.forecastday) {
    forecastDays += `<td>${dayjs(f.date).format('ddd').toUpperCase()}</td>`;
    forecastHigh += `<td>${f.day.maxtemp_c}°</td>`;
    forecastLow += `<td>${f.day.mintemp_c}°</td>`;
  }

  return `<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
    ${weatherCardStyle}
    </style>
  </head>
  
  <body class="card">
    
      <h3>Good ${timeOfDay}, ${user}</h3>
      <h2>${weather.location.name}</h2>
      <h3>${weather.current.condition.text}<span class="measurements">Precip ${weather.current.precip_mm}mm</span></h3>
      <h1>${weather.current.temp_c}°</h1>
      <div class="sky"><img src="https:${weather.current.condition.icon}"/></div>
      <table>
              <tr>
                  ${forecastDays}
              </tr>
              <tr>
                  ${forecastHigh}
              </tr>
              <tr>
                  ${forecastLow}
              </tr>
          </table>
  
  </body>
  
  </html>`
}

export { getHockeyTemplate, getMorningTemplate };