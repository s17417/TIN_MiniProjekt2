const express = require('express');
const router = express.Router();

const patientApiController = require('../../api/PatientAPI');

router.get('/', patientApiController.getPatients);
router.get('/:patId', patientApiController.getPatientById);
router.post('/', patientApiController.createPatient);
router.put('/:patId', patientApiController.updatePatient);
router.delete('/:patId', patientApiController.deletePatient);

module.exports = router;