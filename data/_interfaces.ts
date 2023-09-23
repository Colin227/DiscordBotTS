export interface Teams {
    data:  Team[];
    total: number;
}

export interface Team {
    id:          number;
    franchiseId: number | null;
    fullName:    string;
    leagueId:    number;
    rawTricode:  string;
    triCode:     string;
}


// All nhl teams endpoint: https://api.nhle.com/stats/rest/en/team


export interface Boxscore {
    id:                number;
    season:            number;
    gameType:          number;
    gameDate:          Date;
    venue:             string;
    startTimeUTC:      Date;
    easternUTCOffset:  string;
    venueUTCOffset:    string;
    tvBroadcasts:      TvBroadcast[];
    gameState:         string;
    gameScheduleState: string;
    period:            number;
    awayTeam:          BoxscoreAwayTeam;
    homeTeam:          BoxscoreAwayTeam;
    clock:             Clock;
    boxscore:          BoxscoreClass;
    gameOutcome:       GameOutcome;
    gameVideo:         GameVideo;
}

export interface BoxscoreAwayTeam {
    id:                  number;
    name:                string;
    abbrev:              string;
    score:               number;
    sog:                 number;
    faceoffWinningPctg:  number;
    powerPlayConversion: string;
    pim:                 number;
    hits:                number;
    blocks:              number;
    logo:                string;
}

export interface BoxscoreClass {
    linescore:         Linescore;
    shotsByPeriod:     ByPeriod[];
    gameReports:       GameReports;
    playerByGameStats: PlayerByGameStats;
    gameInfo:          GameInfo;
}

export interface GameInfo {
    referees: string[];
    linesmen: string[];
    awayTeam: GameInfoAwayTeam;
    homeTeam: GameInfoAwayTeam;
}

export interface GameInfoAwayTeam {
    headCoach: string;
    scratches: Scratch[];
}

export interface Scratch {
    id:        number;
    firstName: string;
    lastName:  string;
}

export interface GameReports {
    gameSummary:       string;
    eventSummary:      string;
    playByPlay:        string;
    faceoffSummary:    string;
    faceoffComparison: string;
    rosters:           string;
    shotSummary:       string;
    shiftChart:        string;
    toiAway:           string;
    toiHome:           string;
}

export interface Linescore {
    byPeriod: ByPeriod[];
    shootout: Shootout;
    totals:   Totals;
}

export interface ByPeriod {
    period: number;
    away:   number;
    home:   number;
}

export interface Shootout {
    awayDecidingGoal: number;
    awayConversions:  number;
    awayAttempts:     number;
    homeDecidingGoal: number;
    homeConversions:  number;
    homeAttempts:     number;
}

export interface Totals {
    away: number;
    home: number;
}

export interface PlayerByGameStats {
    awayTeam: PlayerByGameStatsAwayTeam;
    homeTeam: PlayerByGameStatsAwayTeam;
}

export interface PlayerByGameStatsAwayTeam {
    forwards: Defense[];
    defense:  Defense[];
    goalies:  Goalie[];
}

export interface Defense {
    playerId:           number;
    sweaterNumber:      number;
    name:               string;
    position:           Position;
    goals:              number;
    assists:            number;
    points:             number;
    plusMinus:          number;
    pim:                number;
    hits:               number;
    blockedShots:       number;
    powerPlayGoals:     number;
    powerPlayPoints:    number;
    shorthandedGoals:   number;
    shPoints:           number;
    shots:              number;
    faceoffs:           string;
    faceoffWinningPctg: number;
    toi:                string;
    powerPlayToi:       string;
    shorthandedToi:     string;
}

export enum Position {
    C = "C",
    D = "D",
    L = "L",
    R = "R",
}

export interface Goalie {
    playerId:                 number;
    sweaterNumber:            number;
    name:                     string;
    position:                 string;
    evenStrengthShotsAgainst: string;
    powerPlayShotsAgainst:    string;
    shorthandedShotsAgainst:  string;
    saveShotsAgainst:         string;
    savePctg:                 string;
    evenStrengthGoalsAgainst: number;
    powerPlayGoalsAgainst:    number;
    shorthandedGoalsAgainst:  number;
    pim:                      number;
    goalsAgainst:             number;
    toi:                      string;
}

export interface Clock {
    timeRemaining:    string;
    secondsRemaining: number;
    running:          boolean;
    inIntermission:   boolean;
}

export interface GameOutcome {
    lastPeriodType: string;
}

export interface GameVideo {
    threeMinRecap: number;
    condensedGame: number;
}

export interface TvBroadcast {
    id:          number;
    market:      string;
    countryCode: string;
    network:     string;
}
