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
        pageTitle: res.__('patient.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: res.__('patient.form.add.btnLabel'),
        formAction: '/patients/add',
        navLocation: 'patient',
        validationErrors: []
    });
}

exports.showEditPatientForm = (req, res, next) => {
    const patId = req.params.patId;
    PatientRepository.getPatientById(patId)
        .then(pat => {
            res.render('pages/Patient/Patient-form', {
                pat: pat,
                formMode: 'edit',
                pageTitle: res.__('patient.form.edit.pageTitle'),
                btnLabel: res.__('patient.form.edit.btnLabel'),
                formAction: '/patients/edit',
                navLocation: 'patient',
                validationErrors:[]
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
                pageTitle: res.__('patient.form.details.pageTitle'),
                formAction: '',
                navLocation: 'patient',
                validationErrors:[]
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
        }).catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('idnumber') && e.type == 'unique violation') {
                    e.message = "Podany PESEL już istnieje w bazie";
                }
             });
            res.render('pages/Patient/Patient-form', {
                pat: patData,
                pageTitle: res.__('patient.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: res.__('patient.form.add.btnLabel'),
                formAction: '/patients/add',
                navLocation: 'patient',
                validationErrors: err.errors
            });
        });  
};

exports.updatePatient = (req, res, next) => {
    const patId = req.body._id;
    const patData = { ...req.body };
    PatientRepository.updatePatient(patId, patData)
        .then( result => {
            res.redirect('/patients');
        }).catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('idnumber') && e.type == 'unique violation') {
                    e.message = "Podany PESEL już istnieje w bazie";
                }
             });
            PatientRepository.getPatientById(patId).then( pat =>{
            patData.orders=pat.orders;
            res.render('pages/Patient/Patient-form', {
                pat: patData,
                pageTitle: res.__('patient.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: res.__('patient.form.edit.btnLabel'),
                formAction: '/patients/edit',
                navLocation: 'patient',
                validationErrors: err.errors
            });
        });
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