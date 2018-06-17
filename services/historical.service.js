// Gettign the Newly created Mongoose Model we just created 
var StockChart = require('../models/stockchart.model')

// Saving the context of this module inside the _the variable
_this = this


// Async function to get the To do List
exports.getHistoricalChart = async function(ticker, type) {

    // Try Catch the awaited promise to handle the error     
    try {

        var today = new Date();  
        var begin = DateAdd(today, 'd', -90);

        switch(type) {
            case '5d':
                begin = DateAdd(today, 'd', -5);
                break;
            case '10d':
                begin = DateAdd(today, 'd', -10);
                break;
            case '1m':
                begin = DateAdd(today, 'd', -30);
                break;
            case '3m':
                begin = DateAdd(today, 'd', -90);
                break;
            case '6m':
                begin = DateAdd(today, 'd', -180);
                break;
            case 'max':
                begin = DateAdd(today, 'd', -365);
                break;
        };
      
        //var end = today;

        var tickerUpper = ticker.toUpperCase();
        var query = ([
            { $match: {Ticker: tickerUpper}},
            { $project: {
                Historical: {$filter: {
                    input: '$Historical',
                    as: 'item',                    
                    cond: { $and: [
                        { $gt: ['$$item.CloseDate', begin] }
                    ] }
                }}
            }}        
        ])

        // var query = ([
        //     { $match: {Ticker: tickerUpper}},
        //     { $project: {
        //         Historical: {$filter: {
        //             input: '$Historical',
        //             as: 'item',                    
        //             cond: { $and: [
        //                 { $gt: ['$$item.CloseDate', begin] },
        //                 { $lt: ['$$item.CloseDate', end] }
        //             ] }
        //         }}
        //     }}        
        // ])

        var historicalMongo = await StockChart.aggregate(query)
        var historical = historicalMongo[0].Historical;

        UpdatePercentChange(historical);    



        // Return the historical list that was retured by the mongoose promise
        return historical;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Fetching HistoricalChart')
    }
}

function UpdatePercentChange(historical)
{

    var valueMaxClose = 0;
    var valueMinClose = 999999999;

    var valueMaxTwitter = -1;
    var valueMinTwitter = 1;

    var valueMaxRSS = -1;
    var valueMinRSS = 1;
    var valueMaxRSSND = -1;
    var valueMinRSSND = 1;
    var valueMaxRSSC = -1;
    var valueMinRSSC = 1;

    var previous;

    for(var i = 0; i < historical.length; i++) {
        
        historical[i].PercentChange = 0;
        historical[i].TwitterPercentChange = 0;
        historical[i].RSSPercentChange = 0;
        historical[i].RSSPercentChangeND = 0;
        historical[i].RSSPercentChangeC = 0;

        if (previous != null)
        {
            
            if (previous.Close != 0)
            {
                var change = (historical[i].Close - previous.Close) / Math.abs(previous.Close);
                //var change = Math.log10(historical[i].Close) - Math.log10(previous.Close); // / Math.log10(Math.abs(previous.Close));
                historical[i].PercentChange = precisionRound(change, 4);
            }
            
            if (historical[i].TwitterSentiment != null && previous.TwitterSentiment != null)
            {
                if (previous.TwitterSentiment != 0)
                {
                    var change = (historical[i].TwitterSentiment - previous.TwitterSentiment) / Math.abs(previous.TwitterSentiment);
                    //var change = Math.log10(historical[i].TwitterSentiment) - Math.log10(previous.TwitterSentiment); // / Math.log10(Math.abs(previous.TwitterSentiment));
                    historical[i].TwitterPercentChange = precisionRound(change, 4);
                }
            }
            
            if (historical[i].RSSSentiment != null && previous.RSSSentiment != null)
            {
                if (previous.RSSSentiment != 0)
                {
                    var change = (historical[i].RSSSentiment - previous.RSSSentiment) / Math.abs(previous.RSSSentiment);
                    //var change = Math.log10(historical[i].RSSSentiment) - Math.log10(previous.RSSSentiment); // / Math.log10(Math.abs(previous.RSSSentiment));
                    historical[i].RSSPercentChange = precisionRound(change, 4);                    
                }
            }
            
            if (historical[i].RSSSentimentND != null && previous.RSSSentimentND != null)
            {
                if (previous.RSSSentimentND != 0)
                {
                    var change = (historical[i].RSSSentimentND - previous.RSSSentimentND) / Math.abs(previous.RSSSentimentND);
                    historical[i].RSSPercentChangeND = precisionRound(change, 4);                    
                }
            }
            
            if (historical[i].RSSSentimentC != null && previous.RSSSentimentC != null)
            {
                if (previous.RSSSentimentC != 0)
                {
                    var change = (historical[i].RSSSentimentC - previous.RSSSentimentC) / Math.abs(previous.RSSSentimentC);
                    historical[i].RSSPercentChangeC = precisionRound(change, 4);                    
                }
            }
        }

        if (historical[i].PercentChange > valueMaxClose) { valueMaxClose = historical[i].PercentChange};
        if (historical[i].PercentChange < valueMinClose) { valueMinClose = historical[i].PercentChange};
        if (historical[i].TwitterPercentChange > valueMaxTwitter) { valueMaxTwitter = historical[i].TwitterPercentChange};
        if (historical[i].TwitterPercentChange < valueMinTwitter) { valueMinTwitter = historical[i].TwitterPercentChange};
        if (historical[i].RSSPercentChange > valueMaxRSS) { valueMaxRSS = historical[i].RSSPercentChange};
        if (historical[i].RSSPercentChange < valueMinRSS) { valueMinRSS = historical[i].RSSPercentChange};
        if (historical[i].RSSPercentChangeND > valueMaxRSSND) { valueMaxRSSND = historical[i].RSSPercentChangeND};
        if (historical[i].RSSPercentChangeND < valueMinRSSND) { valueMinRSSND = historical[i].RSSPercentChangeND};
        if (historical[i].RSSPercentChangeC > valueMaxRSSC) { valueMaxRSSC = historical[i].RSSPercentChangeC};
        if (historical[i].RSSPercentChangeC < valueMinRSSC) { valueMinRSSC = historical[i].RSSPercentChangeC};
        

        previous = historical[i];
    };   



    //
    // normalize the data (ref: https://stackoverflow.com/questions/1226587/how-to-normalize-a-list-of-int-values)
    //    
    var scaleMin = -1; //the normalized minimum desired
    var scaleMax = 1; //the normalized maximum desired
    var scaleRange = scaleMax - scaleMin;

    var valueRangeClose = valueMaxClose - valueMinClose;
    var valueRangeTwitter = valueMaxTwitter - valueMinTwitter;
    var valueRangeRSS = valueMaxRSS - valueMinRSS;
    var valueRangeRSSND = valueMaxRSSND - valueMinRSSND;
    var valueRangeRSSC = valueMaxRSSC - valueMinRSSC;


    for(var i = 0; i < historical.length; i++) {
        
        historical[i].PercentChangeNormalized = 0;
        historical[i].TwitterPercentChangeNormalized = 0;
        historical[i].RSSPercentChangeNormalized = 0;
        historical[i].RSSPercentChangeNormalizedND = 0;
        historical[i].RSSPercentChangeNormalizedC = 0;
        
        if (historical[i].PercentChange != 0 && historical[i].PercentChange != 0) {
            var val = ((scaleRange * (historical[i].PercentChange - valueMinClose)) / valueRangeClose) + scaleMin;
            historical[i].PercentChangeNormalized = precisionRound(val, 2);  
        }   
            
        
        if (historical[i].TwitterPercentChange != null && historical[i].TwitterPercentChange != 0) {
            var val =  ((scaleRange * (historical[i].TwitterPercentChange - valueMinTwitter)) / valueRangeTwitter) + scaleMin;
            historical[i].TwitterPercentChangeNormalized = precisionRound(val, 2);  
        }
        
        if (historical[i].RSSPercentChange != null && historical[i].RSSPercentChange != 0) {
            var val =  ((scaleRange * (historical[i].RSSPercentChange - valueMinRSS)) / valueRangeRSS) + scaleMin;
            historical[i].RSSPercentChangeNormalized = precisionRound(val, 2);  
        } 
        
        if (historical[i].RSSPercentChangeND != null && historical[i].RSSPercentChangeND != 0) {
            var val =  ((scaleRange * (historical[i].RSSPercentChangeND - valueMinRSSND)) / valueRangeRSSND) + scaleMin;
            historical[i].RSSPercentChangeNormalizedND = precisionRound(val, 2);  
        }    
        
        if (historical[i].RSSPercentChangeC != null && historical[i].RSSPercentChangeC != 0) {
            var val =  ((scaleRange * (historical[i].RSSPercentChangeC - valueMinRSSC)) / valueRangeRSSC) + scaleMin;
            historical[i].RSSPercentChangeNormalizedC = precisionRound(val, 2);  
        }               
    };
}


function DateAdd(date, type, amount){
    var y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();
    if(type === 'y'){
        y += amount;
    };
    if(type === 'm'){
        m += amount;
    };
    if(type === 'd'){
        d += amount;
    };
    return new Date(y, m, d);
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}