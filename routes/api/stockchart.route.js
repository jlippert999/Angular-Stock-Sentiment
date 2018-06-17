var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var StockChartController = require('../../controllers/stockchart.controller');

// Map each API to the Controller FUnctions
router.get('/:ticker', StockChartController.getSentimentOverlayChart)

// Export the Router
module.exports = router;