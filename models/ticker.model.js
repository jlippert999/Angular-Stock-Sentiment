var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var TickerSchema = new mongoose.Schema({
    Ticker: { type: String, required: true },
    Company: { type: String, required: true },
    Exchange: { type: String, required: true },
    Industry: { type: String, required: false }, 
    Sector: { type: String, required: false }
});


TickerSchema.plugin(mongoosePaginate)

const Ticker = mongoose.model('Tickers', TickerSchema,'WebCollection');

module.exports = Ticker;