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
    color:       string;
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


// Scoreboard endpoint

export interface Scoreboard {
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
    awayTeam:          Team;
    homeTeam:          Team;
    clock:             Clock;
    rosterSpots:       RosterSpot[];
    displayPeriod:     number;
    gameOutcome:       GameOutcome;
    plays:             Play[];
}

export interface Team {
    id:     number;
    name:   string;
    abbrev: string;
    score:  number;
    sog:    number;
    logo:   string;
    onIce:  any[];
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

export interface Play {
    eventId:               number;
    period:                number;
    timeInPeriod:          string;
    timeRemaining:         string;
    situationCode?:        string;
    homeTeamDefendingSide: HomeTeamDefendingSide;
    typeCode:              number;
    typeDescKey:           TypeDescKey;
    sortOrder:             number;
    details?:              Details;
}

export interface Details {
    eventOwnerTeamId?:    number;
    losingPlayerId?:      number;
    winningPlayerId?:     number;
    xCoord?:              number;
    yCoord?:              number;
    zoneCode?:            Market;
    hittingPlayerId?:     number;
    hitteePlayerId?:      number;
    blockingPlayerId?:    number;
    shootingPlayerId?:    number;
    reason?:              string;
    playerId?:            number;
    shotType?:            ShotType;
    goalieInNetId?:       number;
    awaySOG?:             number;
    homeSOG?:             number;
    secondaryReason?:     SecondaryReason;
    typeCode?:            TypeCode;
    descKey?:             string;
    duration?:            number;
    committedByPlayerId?: number;
    drawnByPlayerId?:     number;
    scoringPlayerId?:     number;
    assist1PlayerId?:     number;
    awayScore?:           number;
    homeScore?:           number;
    assist2PlayerId?:     number;
    servedByPlayerId?:    number;
}

export enum SecondaryReason {
    ChlgVisMissedStoppage = "chlg-vis-missed-stoppage",
    RinkRepair = "rink-repair",
    TvTimeout = "tv-timeout",
}

export enum ShotType {
    Backhand = "backhand",
    Deflected = "deflected",
    Poke = "poke",
    Slap = "slap",
    Snap = "snap",
    TipIn = "tip-in",
    WrapAround = "wrap-around",
    Wrist = "wrist",
}

export enum TypeCode {
    Ben = "BEN",
    MIS = "MIS",
    Min = "MIN",
}

export enum Market {
    D = "D",
    N = "N",
    O = "O",
}

export enum HomeTeamDefendingSide {
    Left = "left",
    Right = "right",
}

export enum TypeDescKey {
    BlockedShot = "blocked-shot",
    DelayedPenalty = "delayed-penalty",
    Faceoff = "faceoff",
    GameEnd = "game-end",
    Giveaway = "giveaway",
    Goal = "goal",
    Hit = "hit",
    MissedShot = "missed-shot",
    Penalty = "penalty",
    PeriodEnd = "period-end",
    PeriodStart = "period-start",
    ShotOnGoal = "shot-on-goal",
    Stoppage = "stoppage",
    Takeaway = "takeaway",
}

export interface RosterSpot {
    teamId:        number;
    playerId:      number;
    firstName:     string;
    lastName:      string;
    sweaterNumber: number;
    positionCode:  PositionCode;
    headshot:      string;
}

export enum PositionCode {
    C = "C",
    D = "D",
    G = "G",
    L = "L",
    R = "R",
}

export interface TvBroadcast {
    id:          number;
    market:      string; // TODO: This was originally of type Market 
    countryCode: string;
    network:     string;
}

export interface GameSchedule {
    focusedDate:      Date;
    focusedDateCount: number;
    clubTimeZone:     string;
    clubUTCOffset:    string;
    clubScheduleLink: string;
    gamesByDate:      GamesByDate[];
}

export interface GamesByDate {
    date:  Date;
    games: Game[];
}

export interface Game {
    id:                number;
    season:            number;
    gameType:          number;
    gameDate:          Date;
    gameCenterLink:    string;
    venue:             string;
    startTimeUTC:      Date;
    easternUTCOffset:  string;
    venueUTCOffset:    string;
    tvBroadcasts:      TvBroadcast[];
    gameState:         string;
    gameScheduleState: string;
    awayTeam:          Team;
    homeTeam:          Team;
    ticketsLink:       string;
}

export interface Team {
    id:     number;
    name:   string;
    abbrev: string;
    logo:   string;
}

export interface TvBroadcast {
    id:          number;
    market:      string;
    countryCode: string;
    network:     string;
}

export enum CountryCode {
    CA = "CA",
    Us = "US",
}

// export enum Market {
//     A = "A",
//     H = "H",
//     N = "N",
// }
