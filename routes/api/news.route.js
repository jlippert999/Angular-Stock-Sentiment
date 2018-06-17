var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var NewsController = require('../../controllers/news.controller');

// Map each API to the Controller FUnctions
router.get('/:ticker', NewsController.getNews)

// Export the Router
module.exports = router;