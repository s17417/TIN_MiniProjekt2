const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    console.log(loggedUser);
    if(loggedUser) {
        next();
    } else {
        throw new Error('unauthorized access');
    }
}

exports.permitAuthenticatedAdmin = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    console.log(loggedUser);
    if(loggedUser&&loggedUser.isAdmin) {
        next();
    } else {
        throw new Error('unauthorized access');
    }
}