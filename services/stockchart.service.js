// Gettign the Newly created Mongoose Model we just created 
var StockChart = require('../models/stockchart.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getSentimentOverlayChart = async function(ticker) {

    // Try Catch the awaited promise to handle the error     
    try {
        
        var tickerUpper = ticker.toUpperCase();
        var query = StockChart.find(
            {
                'Ticker': tickerUpper
            }, 
            {
                'Ticker':1, 
                'Company':1, 
                'Exchange':1, 
                'Industry':1, 
                'Sector':1, 
                '_id':0,
                'Historical.CloseDate':1,
                'Historical.Open':1,
                'Historical.High':1,
                'Historical.Low':1,
                'Historical.Close':1,
                'Historical.Volume':1,
                'Historical.TwitterTotal':1,
                'Historical.TwitterSentimentSum':1,
                'Historical.TwitterSpamCount':1,
                'Historical.RSSTotal':1,
                'Historical.RSSSentiment':1,
                'Historical.RSSSentimentND':1,
                'Historical.RSSSentimentC':1
            });


        var charData = await StockChart.find(query);
    

       
        // Return the todod list that was retured by the mongoose promise
        return charData;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Fetching SentimentOverlayChart')
    }
}