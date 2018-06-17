export class stockAnalysisDetail {

    constructor(
        date?: Date,
        open?: number,
        high?: number,
        low?: number,
        close?: number,
        volume?: number,
        percentChange?: number,
        percentChangeNormalized?: number,
        twitterTotal?: number,
        twitterSentiment?: number,
        twitterSentimentSum?: number,
        twitterSpamCount?: number,
        twitterPercentChange?: number,
        twitterPercentChangeNormalized?: number,
        rssTotal?: number,
        rssCompound?: number,
        rssNaiveBayesScore?: number,
        rssNaiveBayesWeightedScore?: number,
        rssAverage?: number,
        rssTopTwoAverage?: number,
        rssPercentChange?: number,
        rssPercentChangeNormalized?: number) {

        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;;
        this.close = close;
        this.volume = volume;
        this.percentChange = percentChange;
        this.percentChange = percentChangeNormalized;
        this.twitterTotal = twitterTotal;
        this.twitterSentiment = twitterSentiment;
        this.twitterSentimentSum = twitterSentimentSum;
        this.twitterSpamCount = twitterSpamCount;
        this.twitterPercentChange = twitterPercentChange;
        this.twitterPercentChange = twitterPercentChangeNormalized;
        this.rssTotal = rssTotal;
        this.rssCompound = rssCompound;
        this.rssNaiveBayesScore = rssNaiveBayesScore;
        this.rssNaiveBayesWeightedScore = rssNaiveBayesWeightedScore;
        this.rssAverage = rssAverage;
        this.rssTopTwoAverage = rssTopTwoAverage;
        this.rssPercentChange = rssPercentChange;
        this.rssPercentChange = rssPercentChangeNormalized;
    }

    public date: Date;
    public open: number;
    public high: number;
    public low: number;
    public close: number;
    public volume: number;
    public percentChange: number;
    public percentChangeNormalized: number;

    public twitterTotal: number;
    public twitterSentiment: number;
    public twitterSentimentSum: number;
    public twitterSpamCount: number;
    public twitterPercentChange: number;
    public twitterPercentChangeNormalized: number;

    public rssTotal: number;
    public rssCompound: number;
    public rssNaiveBayesScore: number;
    public rssNaiveBayesWeightedScore: number;
    public rssAverage: number;
    public rssTopTwoAverage: number;
    public rssPercentChange: number;
    public rssPercentChangeNormalized: number;

}
