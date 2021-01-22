const LoggedUserRepository = require('../repository/sequelize/LoggedUserRepository');
const authUtil = require('../util/authUtils');
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    LoggedUserRepository.findByUserName(email)
        .then(usr => {
            if(!usr) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, usr.password) === true) {
                req.session.loggedUser = usr;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
