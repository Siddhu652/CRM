var router = require("express").Router();
const {addCustomer} = require('../controllers/customerController.js');
router.post('/addcustomer', addCustomer);

module.exports = router;
