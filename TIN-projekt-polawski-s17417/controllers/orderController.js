const OrderRepository = require('../repository/sequelize/OrderRepository');
const PatientRepository = require('../repository/sequelize/PatientRepository');
const LabTestRepository = require ('../repository/sequelize/LabTestRepository');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders().then(ords =>{
        res.render('pages/Order/Result-list', { 
            ords: ords,
            navLocation: 'order' 
        });
    });
}

exports.showAddOrderForm = (req, res, next) =>{
    let allPats,allLabs;
    PatientRepository.getPatients()
        .then(pats =>{
            allPats=pats;
            return LabTestRepository.getLabTests();
        })
        .then(labs => {
            allLabs=labs;
            res.render('pages/Order/NewResult-form', {
                ord: {},
                allLabs: allLabs,
                allPats: allPats,
                pageTitle: 'Nowe zlecenie',
                formMode: 'createNew',
                btnLabel: 'Dodaj zlecenie',
                formAction: '/orders/add',
                navLocation: 'order' 
            });
        });
}

exports.showEditOrderForm = (req, res, next) =>{
    const ordId=req.params.orderId;
    let allLabs, allPats;
    PatientRepository.getPatients()
        .then(pats => {
            allPats=pats;
            return LabTestRepository.getLabTests();
        })
        .then(labs => {
            allLabs=labs;
            return OrderRepository.getOrderById(ordId);
        })
        .then(ord => {
            res.render('pages/Order/NewResult-form', {
                ord: ord,
                allLabs: allLabs,
                allPats: allPats,
                pageTitle: 'Edycja zlecenia',
                formMode: 'edit',
                btnLabel: 'Edytuj zlecenie',
                formAction: '/orders/edit',
                navLocation: 'order' 
            });
        });
}

exports.showOrderDetails = (req, res, next) => {
    const ordId=req.params.orderId;
    let order, allPats;
    OrderRepository.getOrderById(ordId)
        .then(ord => {
            order=ord;
            return PatientRepository.getPatientById(order.patient_id);
        })
        .then (pat => {
            allPats=[pat];
            return LabTestRepository.getLabTestById(order.labTest_id);
        })
        .then(lab =>{
            res.render('pages/Order/NewResult-form', {
                ord: order,
                allPats: allPats,
                allLabs: [lab],
                pageTitle: 'Szczegóły zlecenia',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'order'
        });
    });
}

exports.addOrder = (req, res, next) => {
    const ordData = { ...req.body};
    console.log(ordData);
    OrderRepository.createOrder(ordData).then( result => {
        res.redirect('/orders');
    }).catch(function(err){
        console.log(err, req.body);
    });
}

exports.updateOrder = (req, res, next) => {
    const ordId = req.body._id;
    const ordData = { ...req.body };
    OrderRepository.updateOrder(ordId, ordData)
        .then(result =>{
            res.redirect('/orders');
        });
}

exports.deleteOrder = (req, res, next) => {
    const ordId = req.params.orderId;
    OrderRepository.deleteOrder(ordId)
        .then(result =>{
            res.redirect('/orders');
        });
}

/*exports.showOrderForm = (req, res, next) => {
    res.render('pages/Order/NewResult-form', { navLocation: 'order' });
}*/

