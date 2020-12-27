const LabTestRepository = require('../repository/sequelize/LabTestRepository');

exports.getLabTests = (req, res, next) => {
    LabTestRepository.getLabTests()
        .then(lab => {
            res.status(200).json(lab);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLabTestById = (req, res, next) => {
    const labId = req.params.labId;
    LabTestRepository.getLabTestById(labId)
        .then(lab => {
            if (!lab) {
                res.status(404).json({
                    message: 'Laboratory test with id: ' + labId + ' not found'
                })
            } else {
                res.status(200).json(lab);
            }
        });
};

exports.createLabTest = (req, res, next) => {
    LabTestRepository.createLabTest(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateLabTest = (req, res, next) => {
    const labId = req.params.labId;
    LabTestRepository.updateLabTest(labId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Laboratory test updated!', lab: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteLabTest = (req, res, next) => {
    const labId = req.params.labId;
    LabTestRepository.deleteLabTest(labId)
        .then(result => {
            res.status(200).json({ message: 'Removed laboratory test', lab: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};