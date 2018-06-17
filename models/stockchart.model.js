var mongoose = require('mongoose');

var stockChartSchema = new mongoose.Schema({
    Ticker: { type: String, required: true },
    Company: { type: String, required: true },
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
        RSSSentimentND  : Number,
        RSSSentimentC  : Number,
        RSSSentimentSum  : Number,
        RSSSpamCount  : Number,
        RSSPercentChange  : Number,
        RSSPercentChangeND  : Number,
        RSSPercentChangeC  : Number,
        RSSPercentChangeNormalized : Number,        
        RSSPercentChangeNormalizedND : Number,
        RSSPercentChangeNormalizedC : Number
    }
});

const StockChart = mongoose.model('WebTickerAnalysis', stockChartSchema, 'WebCollection');

module.exports = StockChart;