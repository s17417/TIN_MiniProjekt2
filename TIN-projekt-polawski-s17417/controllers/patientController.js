const PatientRepository = require('../repository/sequelize/PatientRepository');

exports.showPatientList = (req, res, next) => {
    PatientRepository.getPatients()
        .then(pats => {
            res.render('pages/Patient/Patient-list', {
                pats: pats,
                navLocation: 'patient'
            });
        });
}

exports.showAddPatientForm = (req, res, next) => {
    res.render('pages/Patient/Patient-form', {
        pat: {},
        pageTitle: 'Nowy pacjent',
        formMode: 'createNew',
        btnLabel: 'Dodaj pacjenta',
        formAction: '/patients/add',
        navLocation: 'patient'
    });
}

exports.showEditPatientForm = (req, res, next) => {
    const patId = req.params.patId;
    PatientRepository.getPatientById(patId)
        .then(pat => {
            res.render('pages/Patient/Patient-form', {
                pat: pat,
                formMode: 'edit',
                pageTitle: 'Edycja pacjenta',
                btnLabel: 'Edytuj pacjenta',
                formAction: '/patients/edit',
                navLocation: 'patient'
            });
        });
};

exports.showPatientDetails = (req, res, next) => {
    const patId = req.params.patId;
    PatientRepository.getPatientById(patId)
        .then(pat => {
            res.render('pages/Patient/Patient-form', {
                pat: pat,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pacjenta',
                formAction: '',
                navLocation: 'patient'
            });
        });
}

/*exports.showPatientForm = (req, res, next) => {
    res.render('pages/Patient/Patient-form', { navLocation: 'patient' });
}*/

exports.addPatient = (req, res, next) => {
    const patData = { ...req.body };
    PatientRepository.createPatient(patData)
        .then( result => {
            res.redirect('/patients');
        }).catch(function(err){
            console.log(err, req.body);
        });
};

exports.updatePatient = (req, res, next) => {
    const patId = req.body._id;
    const patData = { ...req.body };
    PatientRepository.updatePatient(patId, patData)
        .then( result => {
            res.redirect('/patients');
        });

};

exports.deletePatient = (req, res, next) => {
    const patId = req.params.patId;
    PatientRepository.deletePatient(patId)
    .then( () => {
        res.redirect('/patients');
    });
};
/*exports.showPatientDetails = (req, res, next) => {
    res.render('pages/Patient/Patient-details', { navLocation: 'patient' });
}*/