var yahooURL = 'https://query1.finance.yahoo.com/v2/finance/news?lang=en-US&region=US&symbols=$stock';
//const rp = require('request-promise');
const request = require('request');
var rp = require('request-promise');
// Saving the context of this module inside the _the variable   
_this = this




// Async Controller function to get the To do List
exports.getNews = async function(req, res, next) {
    //var ticker = req.query.ticker ? req.query.ticker : "QQQ"

    // ticker is required
    if(!req.params.ticker){
        return res.status(400).json({status: 400., message: "Stock Ticker must be present"})
    }

    try {
    
        var url = yahooURL.replace('$stock', encodeURIComponent(req.params.ticker));
        var yahooBody;

        const result = await rp(url).then(body => {
            yahooBody = body;
            //console.log(body);


            // data to use...
            var keepers = ['provider_name', 'provider_publish_time', 'title','url','thumbnail'];           
            
            var obj = JSON.parse(yahooBody);
            var yahooContent = obj.Content.result;
    
            var dataString = JSON.stringify(yahooContent, keepers, null, '\t');
            var retJson = JSON.parse(dataString, keepers, null, '\t');

            // format publisher date
            for(var i = 0; i < retJson.length; i++) {
                var published = retJson[i].provider_publish_time;
            
                console.log(published);
                            
                var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(published)
                
                console.log(d.toUTCString());
                
                retJson[i].provider_publish_time = d.toUTCString();

                //retJson[i].provider_name = unescape(retJson[i].provider_name);                
                //retJson[i].title = unescape(retJson[i].title);
            }

            // Return the todos list with the appropriate HTTP Status Code and Message.        
            return res.status(200).json({status: 200, data: retJson, message: "Successfully retrieved stock news"});

        }).catch(err => {
            console.log(err);
            //return res.status(400).json({status: 400, message: "Unable to fetch news" + err.message});
            return res.status(200).json({status: 200, data: null, message: "No stock news for ticker"});
        });        

        
        
    } catch(e){
        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json({status: 400, message: e.message});
        
    }   
}


// Async Controller function to get the To do List
// exports.getNews = async function(req, res, next) {
//     var ticker = req.query.ticker ? req.query.ticker : "MSFT"
//     try {
    
//         var url = yahooURL.replace('$stock', encodeURIComponent(ticker));
//         var yahooData;

//         const result = await rp(url).then(body => {
//             yahooData = body;
//             console.log(body);
//         }).catch(err => {
//             console.log(err);
//         });

//         var obj = JSON.parse(yahooData);
//         var yahooContent = obj.Content.result;

//         // var fields = ['provider_name', 'provider_publish_time', 'title','url','thumbnail']);
//         // var retData = [];
//         // for (var key in json) {
//         //     if (fields.indexOf(key) > -1) {
//         //         if (json.hasOwnProperty(key)) {
//         //             retData[key] = 
//         //             alert(json[key].id);
//         //             alert(json[key].msg);
//         //         }
//         //     }
//         // }

//         var arr = [ {"id":"10", "class": "child-of-9"}, {"id":"11", "classd": "child-of-10"}];

//         for (var i = 0; i < arr.length; i++){
//             var obj = arr[i];
//             for (var key in obj){
//                 var attrName = key;
//                 var attrValue = obj[key];
//             }
//         }

//         var keepers = ['provider_name', 'provider_publish_time', 'title','url','thumbnail'];
//         var retData = [];
        
//         for (var i = 0; i < yahooContent.length; i++){
//             var obj = yahooContent[i];
//             var dict = [];
//             var arr = [];
            
//             var data = {};
//             var data2 = {};

//             for (var key in obj){
//                 if (keepers.indexOf(key) > -1) {
//                     var attrName = key;
//                     var attrValue = obj[key];
//                     //retData[i] = [key, obj[key]];

//                     //innerArr.push({attrName:obj[key]});
//                     dict.push({
//                         key:   key,
//                         value: obj[key]
//                     });
//                     arr[key] = obj[key];

//                     var j={key:obj[key]};
//                     var j2 = JSON.stringify(j);

//                     data[key]=obj[key];
//                     //data2 = data2 + createObject(key,obj[key]);
//                 }
//             }

//             var innerJson = JSON.stringify(data); 

            
//             var aa = JSON.stringify(obj, keepers);
            
//             retData.push({id:i,aa});
//         }
//         //  const news: any[] = get(data, 'Content.result', []);
//         // return news.map((item: any) => {
//         //   return {
//         //     source: item.provider_name,
//         //     date: this.convertDate(item.provider_publish_time),
//         //     title: item.title,
//         //     url: item.url,
//         //     image: item.thumbnail
//         //   };
//         // });

//         var bb = JSON.stringify(yahooContent, keepers, null, '\t');
//         var cc = JSON.parse(bb);
//         // Return the todos list with the appropriate HTTP Status Code and Message.        
//         return res.status(200).json({status: 200, data: cc, message: "Succesfully News Recieved"});
        
//     } catch(e){
        
//         //Return an Error Response Message with Code and the Error Message.        
//         return res.status(400).json({status: 400, message: e.message});
        
//     }
// }
