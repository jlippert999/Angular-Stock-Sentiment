var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var TickerController = require('../../controllers/ticker.controller');

// Map each API to the Controller FUnctions
router.get('/', TickerController.getTickers)

// Export the Router
module.exports = router;