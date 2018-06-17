var iexURL = 'https://api.iextrading.com/1.0/stock/$ticker/company';
const request = require('request');
var rp = require('request-promise');


var TickerService = require('../services/ticker.service')

// Saving the context of this module inside the _the variable   
_this = this


// Async Controller function to get the To do List
exports.getCompany = async function(req, res, next) {

    // ticker is required
    if(!req.params.ticker){
        return res.status(400).json({status: 400., message: "Stock Ticker must be present"})
    }

    try {
    
        var data = '';
        var url = iexURL.replace('$ticker', encodeURIComponent(req.params.ticker));
        const result = await rp(url).then(body => {            
            data = JSON.parse(body)            
        }).catch(err => {
            console.log(err);
            //return res.status(400).json({status: 200, data: null, message: "Unable to retreive company info"});
        });    


        if (data == '') {
            var tickerData = await TickerService.getTicker(req.params.ticker)
            
            // convert mongodb bson object to same result as vendor api
            var jsonData = {
                symbol:  tickerData[0].Ticker,
                companyName:  tickerData[0].Company,
                exchange:  tickerData[0].Exchange,
                sector:  tickerData[0].Sector,
                industry:  tickerData[0].Industry,           
                website: '',
                description: '',
                'CEO': '',
                issueType: ''
            };
            
            data = jsonData;
        }
        
        // Return the todos list with the appropriate HTTP Status Code and Message.        
        return res.status(200).json({status: 200, data: data, message: "Successfully retrieved stock stats"});
        
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}
