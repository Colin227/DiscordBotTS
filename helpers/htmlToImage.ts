import { Game, Team } from "../data/_interfaces";

const getHockeyTemplate = (game: Game, primaryTeam: Team) => {
    return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background: rgb(22, 22, 22);
        border: 2px solid ${primaryTeam.color};
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
            font-size: 3fr;
            font-weight: 700;
        }
        .teamHomeLogo { grid-area: 1 / 4 / 3 / 6; }
        .teamAwayName{ grid-area: 3 / 1 / 4 / 3; }
        .teamNameSpacer { grid-area: 3 / 3 / 4 / 4; }
        .teamHomeName { grid-area: 3 / 4 / 4 / 6; }
        .teamAwayDetails { grid-area: 4 / 1 / 6 / 3; }
        .teamDetailsSpacer { grid-area: 4 / 3 / 6 / 4; }
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
            padding: 10px;
        }
        
    </style>
  </head>
  <body>
  <div class="parent">
    <div class="teamAwayLogo"><img src='${game.awayTeam.logo}' class='logo'></div>
    <div class="logoSpacer">@</div>
    <div class="teamHomeLogo"><img src='${game.homeTeam.logo}' class='logo'></div>
    <div class="teamAwayName">${game.awayTeam.name}</div>
    <div class="teamNameSpacer"></div>
    <div class="teamHomeName">${game.homeTeam.name}</div>
    <div class="teamAwayDetails"><span class="score">${game.awayTeam.score}</span></div>
    <div class="teamDetailsSpacer"> </div>
    <div class="teamHomeDetails"><span class="score">${game.homeTeam.score}</span></div>
  </div> 
  </body>
</html>
    `
}

export default getHockeyTemplate;