var mongoose = require('mongoose');

var historicalSchema = new mongoose.Schema({
    Ticker: { type: String, required: true },
    CompanyName: { type: String, required: true },
    Exchange: { type: String, required: true },
    Industry: { type: String, required: false }, 
    Sector: { type: String, required: false },
    Website: { type: String, required: false },
    Description: { type: String, required: false },
    Historical      : {
        CloseDate : Date,
        Open : Number,
        High  : Number,
        Low  : Number,
        Close  : Number,
        Volume  : Number,
        PercentChange  : Number,
        PercentChangeNormalized  : Number,
        TwitterTotal  : Number,
        TwitterSentiment  : Number,
        TwitterSentimentSum  : Number,
        TwitterSpamCount  : Number,
        TwitterPercentChange  : Number,
        TwitterPercentChangeNormalized  : Number,
        RSSTotal  : Number,
        RSSSentiment  : Number,
        RSSSentimentSum  : Number,
        RSSSpamCount  : Number,
        RSSPercentChange  : Number,
        RSSPercentChangeNormalized  : Number,
        RSSPercentChangeND  : Number,
        RSSPercentChangeNormalizedND  : Number,
        RSSPercentChangeC  : Number,
        RSSPercentChangeNormalizedC  : Number
    }
});

const StockHistorical = mongoose.model('WebTickerAnalysis', historicalSchema, 'WebCollection');

module.exports = StockHistorical;