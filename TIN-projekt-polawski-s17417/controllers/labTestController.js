
const LabTest = require('../model/sequelize/LabTest');
const LabTestRepository= require('../repository/sequelize/LabTestRepository')

exports.showLabTestList = (req, res, next) => {
    LabTestRepository.getLabTests()
        .then(labs => {
            res.render('pages/LabTest/LabTest-list', { 
                labs: labs,
                navLocation: 'labTest' 
            });
        });
    
}

exports.showAddLabTestForm = (req, res, next) => {
    res.render('pages/LabTest/LabTest-form', { 
        lab: [],
        pageTitle: 'Nowe badanie',
        formMode: 'createNew',
        btnLabel: 'Dodaj badanie',
        formAction: '/labTests/add',
        navLocation: 'labTest',
        validationErrors: [] 
    });
}

exports.showEditLabTestForm = (req, res, next) => {
    const labId = req.params.testId;
    LabTestRepository.getLabTestById(labId)
        .then(lab => {
            res.render('pages/LabTest/LabTest-form', {
                lab: lab,
                formMode: 'edit',
                pageTitle: 'Edycja badania',
                btnLabel: 'Edytuj badanie',
                formAction: '/labTests/edit',
                navLocation: 'labTest',
                validationErrors: []
            });
        });
};


exports.showLabTestDetails = (req, res, next) => {
    const labId = req.params.testId;
    LabTestRepository.getLabTestById(labId)
        .then(lab => {
            res.render('pages/LabTest/LabTest-form', {
                lab: lab,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły badania',
                formAction: '',
                navLocation: 'labTest',
                validationErrors: []
            });
        });
}

exports.addLabTest = (req, res, next) => {
    const labData = { ...req.body };
    LabTestRepository.createLabTest(labData)
        .then( result => {
            res.redirect('/labTests');
        }).catch(err => {
            console.log(err);
            res.render('pages/LabTest/LabTest-form', { 
                lab: labData,
                pageTitle: 'Nowe badanie',
                formMode: 'createNew',
                btnLabel: 'Dodaj badanie',
                formAction: '/labTests/add',
                navLocation: 'labTest',
                validationErrors: err.errors
            });
        });
};

exports.updateLabTest = (req, res, next) => {
    const labId = req.body._id;
    const labData = { ...req.body };
    LabTestRepository.updateLabTest(labId, labData)
        .then( result => {
            res.redirect('/labTests');
        }).catch(err => {
            console.log(err);
            LabTestRepository.getLabTestById(labId)
            .then(lab => {
                labData.orders=lab.orders;
                res.render('pages/LabTest/LabTest-form', { 
                    lab: labData,
                    formMode: 'edit',
                    pageTitle: 'Edycja badania',
                    btnLabel: 'Edytuj badanie',
                    formAction: '/labTests/edit',
                    navLocation: 'labTest',
                    validationErrors: err.errors
                });
            })
        });
};

exports.deleteLabtest = (req, res, next) => {
    const labId = req.params.testId;
    LabTestRepository.deleteLabTest(labId)
    .then( () => {
        res.redirect('/labTests');
    });
};

/*exports.showLabTestForm = (req, res, next) => {
    res.render('pages/LabTest/LabTest-form', { navLocation: 'patient' });
}*/