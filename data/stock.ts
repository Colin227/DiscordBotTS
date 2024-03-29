export default interface Stock {
    ask: number;
    askSize: number;
    averageDailyVolume10Day: number;
    averageDailyVolume3Month: number;
    bid: number;
    bidSize: number;
    bookValue: number;
    currency: string;
    displayName: string;
    dividendDate: number;
    earningsTimestamp: number;
    earningsTimestampEnd: number;
    earningsTimestampStart: number;
    epsCurrentYear: number;
    epsForward: number;
    epsTrailingTwelveMonths: number;
    esgPopulated: boolean;
    exchange: string;
    exchangeDataDelayedBy: number;
    exchangeTimezoneName: string;
    exchangeTimezoneShortName: string;
    fiftyDayAverage: number;
    fiftyDayAverageChange: number;
    fiftyDayAverageChangePercent: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string;
    financialCurrency: string;
    firstTradeDateMilliseconds: any;
    forwardPE: number;
    fullExchangeName: string;
    gmtOffSetMilliseconds: number;
    language: string;
    longName: string;
    market: string;
    marketCap: any;
    marketState: string;
    messageBoardId: string;
    postMarketChange: number;
    postMarketChangePercent: number;
    postMarketPrice: number;
    postMarketTime: number;
    priceEpsCurrentYear: number;
    priceHint: number;
    priceToBook: number;
    quoteSourceName: string;
    quoteType: string;
    region: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketDayRange: string;
    regularMarketOpen: number;
    regularMarketPreviousClose: number;
    regularMarketPrice: number;
    regularMarketTime: number;
    regularMarketVolume: number;
    sharesOutstanding: any;
    shortName: string;
    sourceInterval: number;
    symbol: string;
    tradeable: boolean;
    trailingAnnualDividendRate: number;
    trailingAnnualDividendYield: number;
    trailingPE: number;
    triggerable: boolean;
    twoHundredDayAverage: number;
    twoHundredDayAverageChange: number;
    twoHundredDayAverageChangePercent: number;
}

export interface QuoteResponse {
    error?: any;
    result: Stock[];
}

export interface RootObject {
    quoteResponse: QuoteResponse;
}



