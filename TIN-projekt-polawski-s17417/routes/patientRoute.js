const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.showPatientList);
router.get('/add', patientController.showAddPatientForm);
router.get('/edit/:patId', patientController.showEditPatientForm);
router.get('/details/:patId', patientController.showPatientDetails);
router.post('/add', patientController.addPatient); 
router.post('/edit', patientController.updatePatient);
router.get('/delete/:patId', patientController.deletePatient);

module.exports = router;


