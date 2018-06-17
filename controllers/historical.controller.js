// Accessing the Service that we just created
var StockHistoricalService = require('../services/historical.service')

// Saving the context of this module inside the _the variable
_this = this


// Async Controller function to get the To do List
exports.getHistoricalChart = async function(req, res, next) {
    
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value    
    if(!req.params.ticker) {
        return res.status(400).json({status: 400., message: "Stock Ticker must be present"})
    }

    var type = '3m';
    if(req.params.type) {
        type = req.params.type;
    }

    try {        
        
        var chartData = await StockHistoricalService.getHistoricalChart(req.params.ticker, type)

        // Return the todos list with the appropriate HTTP Status Code and Message.        
        return res.status(200).json({status: 200, data: chartData, message: "Successfully Retrieved Sentiment Overlay Chart"});
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}