const Sequelize = require('sequelize');

const Patient = require("../../model/sequelize/Patient");
const Order = require("../../model/sequelize/Order");
const LabTest = require("../../model/sequelize/LabTest");

exports.getLabTests = () => {
    return LabTest.findAll();
};

exports.getLabTestById = (labId) => {
    return LabTest.findByPk(labId,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Patient,
                    as: 'patient'
                }]
            }]
        });
};

exports.createLabTest = (newLabTestData) => {
    return LabTest.create({
        name: newLabTestData.name,
        units: newLabTestData.units
    });
};

exports.updateLabTest = (labId, labData) => {
    const name = labData.name;
    const units = labData.units;
    return LabTest.update(labData, { where: { _id: labId } });
};

exports.deleteLabTest = (labId) => {
    return LabTest.destroy({
        where: { _id: labId }
    });

}; 