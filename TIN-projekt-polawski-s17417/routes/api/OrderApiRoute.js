const express = require('express');
const router = express.Router();

const orderApiController = require('../../api/OrderAPI');

router.get('/', orderApiController.getOrders);
router.get('/:ordId', orderApiController.getOrderById);
router.post('/', orderApiController.createOrder);
router.put('/:ordId', orderApiController.updateOrder);
router.delete('/:ordId', orderApiController.deleteOrder);

module.exports = router;