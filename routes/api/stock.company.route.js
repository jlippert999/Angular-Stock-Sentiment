var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var StockCompanyController = require('../../controllers/stock.company.controller');

// Map each API to the Controller FUnctions
router.get('/:ticker', StockCompanyController.getCompany)

// Export the Router
module.exports = router;