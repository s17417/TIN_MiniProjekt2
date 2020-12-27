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
        idnumber: newPatientData.idnumber,
        PatientComments: newPatientData.PatientComments
    }); 
};

exports.updatePatient = (patId, patData) => {
    const firstname = patData.firstname;
    const surname = patData.surname;
    const birthdate = patData.birthdate;
    const idnumber = patData.idnumber;
    const PatientComments = patData.PatientComments;
    return Patient.update(patData, { where: { _id: patId } });
};

exports.deletePatient = (patId) => {
    return Patient.destroy({
        where: { _id: patId }
    });

}; 