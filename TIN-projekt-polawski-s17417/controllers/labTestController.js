
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
        navLocation: 'labTest' 
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
                navLocation: 'labTest'
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
                navLocation: 'labTest'
            });
        });
}

exports.addLabTest = (req, res, next) => {
    const labData = { ...req.body };
    LabTestRepository.createLabTest(labData)
        .then( result => {
            res.redirect('/labTests');
        }).catch(function(err){
            console.log(err, req.body);
        });
};

exports.updateLabTest = (req, res, next) => {
    const labId = req.body._id;
    const labData = { ...req.body };
    LabTestRepository.updateLabTest(labId, labData)
        .then( result => {
            res.redirect('/labTests');
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