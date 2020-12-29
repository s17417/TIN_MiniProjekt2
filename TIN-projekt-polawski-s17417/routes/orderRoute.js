const express = require('express');
const { showOrderList, showOrderDetails, showEditOrderForm, showAddOrderForm, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/', showOrderList);
router.get('/add', showAddOrderForm);
router.get('/edit/:orderId', showEditOrderForm);
router.get('/details/:orderId', showOrderDetails);
router.post('/add', addOrder);
router.post('/edit', updateOrder);
router.get('/delete/:orderId',deleteOrder);

module.exports = router;