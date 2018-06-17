var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var HistoricalController = require('../../controllers/historical.controller');

// Map each API to the Controller FUnctions
router.get('/:ticker', HistoricalController.getHistoricalChart)
router.get('/:ticker/:type', HistoricalController.getHistoricalChart)

// Export the Router
module.exports = router;