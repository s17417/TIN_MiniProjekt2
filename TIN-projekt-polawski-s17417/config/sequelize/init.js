const sequelize = require('./sequelize');

const Patient = require('../../model/sequelize/Patient');
const LabTest = require('../../model/sequelize/LabTest');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Patient.hasMany(Order, { as: 'orders', foreignKey: { name: 'patient_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Order.belongsTo(Patient, { as: 'patient', foreignKey: { name: 'patient_id', allowNull: false } });
    LabTest.hasMany(Order, { as: 'orders', foreignKey: { name: 'labTest_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Order.belongsTo(LabTest, { as: 'labTest', foreignKey: { name: 'labTest_id', allowNull: false } });

    let allPatients, allLabTest;

    return sequelize
        .sync({ force: true })
        .then(() => {
            return Patient.findAll();
        })
        .then(pat => {
            if (!pat || pat.length == 0) {
                return Patient.bulkCreate([
                    { firstname: 'Jan', surname: 'Kowalski', idnumber: '12345678901', birthdate: '2000-01-03', PatientComments: 'komentarz taki tam sobie' },
                    { firstname: 'Adam', surname: 'Zieliński', idnumber: '56789012345', birthdate: '1956-01-03', PatientComments: 'komentarz taki tam sobie numer2' },
                    { firstname: 'Marian', surname: 'Nowak', idnumber: '90123456789', birthdate: '1990-08-03', PatientComments: 'komentarz taki tam sobie numer3' },
                ])
                    .then(() => {
                        return Patient.findAll();
                    });
            } else {
                return pat;
            }
        })
        .then(pat => {
            allPatients = pat;
            return LabTest.findAll();
        })
        .then(labT => {
            if (!labT || labT.length == 0) {
                return LabTest.bulkCreate([
                    { name: 'Troponina', units: 'IU' },
                    { name: 'Bilirubina', units: 'mg/dl' }
                ])
                    .then(() => {
                        return LabTest.findAll();
                    });
            } else {
                return labT;
            }
        })
        .then(labT => {
            allLabTest = labT;
            return Order.findAll();
        })
        .then(ord => {
            if (!ord || ord.length == 0) {
                return Order.bulkCreate([
                    { patient_id: allPatients[0]._id, orderDate: '2020-10-04', resultDate: '2020-11-04', labTest_id: allLabTest[0]._id, status: 'zwykły', resultValue: 50.02, resultComment: 'kolejny istotny komentarz' },
                    { patient_id: allPatients[1]._id, orderDate: '2020-10-11', resultDate: null, labTest_id: allLabTest[0]._id, status: 'zwykły', resultValue: null, resultComment: 'kolejny istotny komentarz' },
                    { patient_id: allPatients[0]._id, orderDate: '2020-10-04', resultDate: '2020-11-04', labTest_id: allLabTest[1]._id, status: 'cito', resultValue: 4.2, resultComment: 'kolejny istotny komentarz' }
                ]);
            } else {
                return ord;
            }
        });
};