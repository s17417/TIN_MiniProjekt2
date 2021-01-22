
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
        pageTitle: res.__('labTest.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: res.__('labTest.form.add.btnLabel'),
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
                pageTitle: res.__('labTest.form.edit.pageTitle'),
                btnLabel: res.__('labTest.form.edit.btnLabel'),
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
                pageTitle: res.__('labTest.form.details.pageTitle'),
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
                pageTitle: res.__('labTest.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: res.__('labTest.form.add.btnLabel'),
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
                    pageTitle: res.__('labTest.form.edit.pageTitle'),
                    btnLabel: res.__('labTest.form.edit.btnLabel'),
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