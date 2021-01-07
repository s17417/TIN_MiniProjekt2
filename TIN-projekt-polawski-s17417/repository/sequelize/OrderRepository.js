const Sequelize = require('sequelize');

const Patient = require("../../model/sequelize/Patient");
const Order = require("../../model/sequelize/Order");
const LabTest = require("../../model/sequelize/LabTest");

exports.getOrders = () => {
    return Order.findAll({
        include: [
            {
                model: Patient,
                as: 'patient'
            },
            {
                model: LabTest,
                as: 'labTest'
            }]
    });
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId, {
        include: [
            {
                model: Patient,
                as: 'patient'
            },
            {
                model: LabTest,
                as: 'labTest'
            }]
    });
};

exports.createOrder = (data) => {
    return Order.create({
        patient_id: data.patient_id,
        orderDate: data.orderDate=='' ? null: data.orderDate,
        resultDate: data.resultDate=='' ? null: data.resultDate,
        labTest_id: data.labTest_id,
        status: data.status,
        resultValue: data.resultValue=='' ? null: data.resultValue,
        resultComments: data.resultComments
    });
};

exports.updateOrder = (orderId, data) => {
    return Order.update({
        patient_id: data.patient_id,
        orderDate: data.orderDate=='' ? null: data.orderDate,
        resultDate: data.resultDate=='' ? null: data.resultDate,
        labTest_id: data.labTest_id,
        status: data.status,
        resultValue: data.resultValue=='' ? null: data.resultValue,
        resultComments: data.resultComments
    },
        { where: { _id: orderId } });
}

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: { _id: orderId }
    });
}

exports.deleteManyOrders = (orderIds) => {
    return Order.find({ _id: { [Sequelize.Op.in]: orderIds } })
}


