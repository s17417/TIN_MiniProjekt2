const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.getOrders = (req, res, next) => {
    OrderRepository.getOrders()
        .then(ord => {
            res.status(200).json(ord);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrderById = (req, res, next) => {
    const ordId = req.params.ordId;
    OrderRepository.getOrderById(ordId)
        .then(ord => {
            if (!ord) {
                res.status(404).json({
                    message: 'Order with id: ' + ordId + ' not found'
                })
            } else {
                res.status(200).json(ord);
            }
        });
};

exports.createOrder = (req, res, next) => {
    OrderRepository.createOrder(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateOrder = (req, res, next) => {
    const ordId = req.params.ordId;
    OrderRepository.updateOrder(ordId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Order updated!', ord: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOrder = (req, res, next) => {
    const ordId = req.params.ordId;
    OrderRepository.deleteOrder(ordId)
        .then(result => {
            res.status(200).json({ message: 'Removed order', ord: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};