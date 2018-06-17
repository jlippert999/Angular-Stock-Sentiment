// Gettign the Newly created Mongoose Model we just created 
var TickerModel = require('../models/ticker.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getTickers = async function() {
    
    // Try Catch the awaited promise to handle the error     
    try {

        var query = TickerModel.find(
            {}, 
            {
                'Ticker':1, 'Company':1, 'Exchange':1, 'Industry':1, 'Sector':1, '_id':0
            })
            .sort( { 'Ticker': 1 } );

        var tickers = await Ticker(query);
        
        // Return the tickers list that was retured by the mongoose promise
        return tickers;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error in getTickers')
    }
}

// Async function to get the To do List
exports.getTicker = async function(ticker) {
    
    // Try Catch the awaited promise to handle the error     
    try {

        var tickerUpper = ticker.toUpperCase();

        var query = TickerModel.find(
            {
                'Ticker': tickerUpper
            }, 
            {
                'Ticker':1, 
                'Company':1, 
                'Exchange':1, 
                'Industry':1, 
                'Sector':1, 
                '_id':0                
            });

        var tickerData = await TickerModel.find(query);
        
        // Return the ticker
        return tickerData;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error in getTicker')
    }
}



// Async function to get the To do List
exports.getTickersPage = async function(page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error     
    try {

        var query = TickerModel.find(
            {}, 
            {
                'Ticker':1, 'Company':1, 'Exchange':1, 'Industry':1, 'Sector':1, '_id':0
            })
            .sort( { 'Ticker': 1 } );

        var tickers = await TickerModel.paginate(query, options)
        
        // Return the tickers list that was retured by the mongoose promise
        return tickers;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Tickers')
    }
}