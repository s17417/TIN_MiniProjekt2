const Sequelize = require('sequelize');
const LoggedUser = require('../../model/sequelize/LoggedUser');

exports.findByUserName = (email) => {
    return LoggedUser.findOne({
        where: {email: email}
    });
};

exports.findUsers = () => {
    return LoggedUser.findAll();
};

exports.getLoggedUserById = (usrId) =>{
    return LoggedUser.findByPk(usrId);
};

exports.createLoggedUser = (newLoggedUserData) => {
    return LoggedUser.create({
        email: newLoggedUserData.email,
        isAdmin: newLoggedUserData.isAdmin=='on'? 1:0,
        password: newLoggedUserData.password,
        password1: newLoggedUserData.password1,
    });
};

exports.updateLoggedUser = (usrId, usrData) => {
    usrData.isAdmin = usrData.isAdmin=='on'? 1:0;
    return LoggedUser.update(usrData, { where: { _id: usrId }, individualHooks: true });
};

exports.deleteLoggedUser = (usrId) => {
    return LoggedUser.destroy({
        where: { _id: usrId }
    });
}   