var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var StockStatsController = require('../../controllers/stock.stats.controller');

// Map each API to the Controller FUnctions
router.get('/:ticker', StockStatsController.getStats)

// Export the Router
module.exports = router;