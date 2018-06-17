// Accessing the Service that we just created
var TickerService = require('../services/ticker.service')

// Saving the context of this module inside the _the variable
_this = this


// Async Controller function to get the To do List
exports.getTickers = async function(req, res, next) {
     
    try {
        //var tickers = await TickerService.getTickers()
        
        var tickers = await TickerService.getTickersPage(1, 30000)

        // Return the todos list with the appropriate HTTP Status Code and Message.        
        return res.status(200).json({status: 200, data: tickers.docs, message: "Successfully retrieved stock ticker list"});
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

// Async Controller function to get the To do List
exports.getTickersPage = async function(req, res, next) {
        
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 30; 

    try {
    
        // var include = {'Ticker':1, 'CompanyName':1, 'Exchange':1, 'Industry':1, 'Sector':1, '_id':0};
        // var query = {},include;

        var tickers = await TickerService.getTickersPage(page, limit)

        // Return the todos list with the appropriate HTTP Status Code and Message.        
        return res.status(200).json({status: 200, data: tickers, message: "Succesfully Retrieved Tickers"});
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}



