const Sequelize = require('sequelize');

const Patient = require("../../model/sequelize/Patient");
const Order = require("../../model/sequelize/Order");
const LabTest = require("../../model/sequelize/LabTest");

exports.getPatients = () => {
    return Patient.findAll();
};

exports.getPatientById = (patId) => {
    return Patient.findByPk(patId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: LabTest,
                    as: 'labTest'
                }]
            }]
        });
};

exports.createPatient = (newPatientData) => {
        return Patient.create({
        firstname: newPatientData.firstname,
        surname: newPatientData.surname,
        birthdate: newPatientData.birthdate,
        idnumber: newPatientData.idnumber!='' ? newPatientData.idnumber : null,
        PatientComments: newPatientData.PatientComments
    }); 
};

exports.updatePatient = (patId, patData) => {
    return Patient.update({
        firstname: patData.firstname,
        surname: patData.surname,
        birthdate: patData.birthdate,
        idnumber: patData.idnumber!='' ? patData.idnumber : null,
        PatientComments: patData.PatientComments
    },
        { where: { _id: patId } });
};

exports.deletePatient = (patId) => {
    return Patient.destroy({
        where: { _id: patId }
    });

}; 