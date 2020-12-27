exports.showOrderList = (req, res, next) => {
    res.render('pages/Order/Result-list', { navLocation: 'order' });
}

exports.showOrderForm = (req, res, next) => {
    res.render('pages/Order/NewResult-form', { navLocation: 'order' });
}

exports.showOrderDetails = (req, res, next) => {
    res.render('pages/Order/Results-details', { navLocation: 'order' });
}