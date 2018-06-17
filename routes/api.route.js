var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var news = require('./api/news.route')
var ticker = require('./api/ticker.route')
var stockchart = require('./api/stockchart.route')
var historical = require('./api/historical.route')

var stockCompany = require('./api/stock.company.route')
var stockStats = require('./api/stock.stats.route')

router.use('/todos', todos);
router.use('/news', news);
router.use('/tickers', ticker);
router.use('/chart', stockchart);
router.use('/historical', historical);


router.use('/company', stockCompany);
router.use('/stats', stockStats);

module.exports = router;