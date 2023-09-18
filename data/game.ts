export interface Root {
    copyright: string
    totalItems: number
    totalEvents: number
    totalGames: number
    totalMatches: number
    metaData: MetaData
    wait: number
    dates: Date[]
  }
  
  export interface MetaData {
    timeStamp: string
  }
  
  export interface Date {
    date: string
    totalItems: number
    totalEvents: number
    totalGames: number
    totalMatches: number
    games: Game[]
    events: any[]
    matches: any[]
  }
  
  export interface Game {
    gamePk: number
    link: string
    gameType: string
    season: string
    gameDate: string
    status: Status
    teams: Teams
    venue: Venue
    content: Content
  }
  
  export interface Status {
    abstractGameState: string
    codedGameState: string
    detailedState: string
    statusCode: string
    startTimeTBD: boolean
  }
  
  export interface Teams {
    away: Away
    home: Home
  }
  
  export interface Away {
    leagueRecord: LeagueRecord
    score: number
    team: Team
  }
  
  export interface LeagueRecord {
    wins: number
    losses: number
    ot: number
    type: string
  }
  
  export interface Team {
    id: number
    name: string
    link: string
  }
  
  export interface Home {
    leagueRecord: LeagueRecord2
    score: number
    team: Team2
  }
  
  export interface LeagueRecord2 {
    wins: number
    losses: number
    ot: number
    type: string
  }
  
  export interface Team2 {
    id: number
    name: string
    link: string
  }
  
  export interface Venue {
    id: number
    name: string
    link: string
  }
  
  export interface Content {
    link: string
  }
  

// export interface Game {
//     gamePk: number;
//     link: string;
//     gameType: string;
//     season: string;
//     gameDate: string;
//     status: {
//       abstractGameState: string;
//       codedGameState: string;
//       detailedState: string;
//       statusCode: string;
//       startTimeTBD: boolean;
//     };
//     teams: {
//       away: {
//         leagueRecord: {
//           wins: number;
//           losses: number;
//           ot: number;
//           type: string;
//         };
//         score: number;
//         team: {
//           id: number;
//           name: string;
//           link: string;
//         };
//       };
//       home: {
//         leagueRecord: {
//           wins: number;
//           losses: number;
//           ot: number;
//           type: string;
//         };
//         score: number;
//         team: {
//           id: number;
//           name: string;
//           link: string;
//         };
//       };
//     };
//     venue: {
//       id: number;
//       name: string;
//       link: string;
//     };
//     content: {
//       link: string;
//     };
//   }
  
// export interface GameList {
//     games: Game[];
//   }
  