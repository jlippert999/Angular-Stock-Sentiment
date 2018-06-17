// Accessing the Service that we just created
var StockChartService = require('../services/stockchart.service')

// Saving the context of this module inside the _the variable
_this = this


// Async Controller function to get the To do List
exports.getSentimentOverlayChart = async function(req, res, next) {
    
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value    
    if(!req.params.ticker) {
        return res.status(400).json({status: 400., message: "Ticker must be present"})
    }

    try {        
        
        var chartData = await StockChartService.getSentimentOverlayChart(req.params.ticker)

        // Return the todos list with the appropriate HTTP Status Code and Message.        
        return res.status(200).json({status: 200, data: chartData, message: "Successfully retrieved stock sentiment chart data"});
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}