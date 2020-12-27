const express = require('express');
const { showOrderList, showOrderForm, showOrderDetails } = require('../controllers/orderController');
const router = express.Router();

router.get('/', showOrderList);
router.get('/add', showOrderForm);
router.get('/details/:orderId', showOrderDetails);

module.exports = router;