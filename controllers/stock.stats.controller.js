var iexURL = 'https://api.iextrading.com/1.0/stock/$ticker/stats';
const request = require('request');
var rp = require('request-promise');

// Saving the context of this module inside the _the variable   
_this = this


// Async Controller function to get the To do List
exports.getStats = async function(req, res, next) {

    // ticker is required
    if(!req.params.ticker){
        return res.status(400).json({status: 400., message: "Stock Ticker must be present"})
    }

    try {
    
        var url = iexURL.replace('$ticker', encodeURIComponent(req.params.ticker));
        
        const result = await rp(url).then(body => {
            //console.log(body);

            var data = JSON.parse(body);

            // Return the todos list with the appropriate HTTP Status Code and Message.        
            return res.status(200).json({status: 200, data: data, message: "Successfully retrieved stock stats"});

        }).catch(err => {
            console.log(err);
            //return res.status(400).json({status: 400, message: "Unable to fetch news" + err.message});
            return res.status(400).json({status: 200, data: null, message: "No stats for ticker"});
        });        

        
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}
