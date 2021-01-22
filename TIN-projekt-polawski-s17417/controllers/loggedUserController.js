const LoggedUser = require('../model/sequelize/LoggedUser');
const LoggedUserRepository = require('../repository/sequelize/LoggedUserRepository');
const authUtil = require('../util/authUtils');

exports.showUsersList = (req, res, next) => {
    LoggedUserRepository.findUsers()
        .then(usrs => {
            res.render('pages/Users/Users-list', {
                usrs: usrs,
                navLocation: 'user'
            });
        });
}

exports.showAddUserForm = (req, res, next) => {
    res.render('pages/Users/Users-form', { 
        usr: [],
        pageTitle: res.__('users.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel:  res.__('users.form.add.btnLabel'),
        formAction: '/users/add',
        navLocation: 'user',
        validationErrors: [] 
    });
}

exports.showEditUserForm = (req, res, next) => {
    const usrId = req.params.usrId;
    LoggedUserRepository.getLoggedUserById(usrId)
        .then(usr => {
            res.render('pages/users/users-form', {
                usr: usr,
                formMode: 'edit',
                pageTitle:  res.__('users.form.edit.pageTitle'),
                btnLabel:  res.__('users.form.edit.btnLabel'),
                formAction: '/users/edit',
                navLocation: 'user',
                validationErrors: []
            });
        });
};


exports.showLoggedUserDetails = (req, res, next) => {
    const usrId = req.params.usrId;
    LoggedUserRepository.getLoggedUserById(usrId)
        .then(usr => {
            res.render('pages/users/users-form', {
                usr: usr,
                formMode: 'showDetails',
                pageTitle:  res.__('users.form.details.pageTitle'),
                formAction: '',
                navLocation: 'user',
                validationErrors: []
            });
        });
}

exports.addLoggedUser = (req, res, next) => {
    const usrData = { ...req.body };
    
    LoggedUserRepository.createLoggedUser(usrData)
        .then( result => {
            res.redirect('/users');
        }).catch(err => {
            console.log(err);
            res.render('pages/users/users-form', { 
                usr: usrData,
                pageTitle: res.__('users.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: res.__('users.form.add.btnLabel'),
                formAction: '/users/add',
                navLocation: 'user',
                validationErrors: err.errors
            });
        });
};

exports.updateLoggedUser = (req, res, next) => {
    const usrId = req.body._id;
    const usrData = { ...req.body };
    LoggedUserRepository.updateLoggedUser(usrId, usrData)
        .then( result => {
            res.redirect('/users');
        }).catch(err => {
            console.log(err);
            LoggedUserRepository.getLoggedUserById(usrId)
            .then(usr => {
                res.render('pages/users/Users-form', { 
                    usr: usrData,
                    formMode: 'edit',
                    pageTitle: res.__('users.form.edit.pageTitle'),
                    btnLabel: res.__('users.form.rdit.btnLabel'),
                    formAction: '/users/edit',
                    navLocation: 'user',
                    validationErrors: err.errors
                });
            })
        });
};

exports.deleteLoggedUser = (req, res, next) => {
    const usrId = req.params.usrId;
    LoggedUserRepository.deleteLoggedUser(usrId)
    .then( () => {
        res.redirect('/users');
    });
};