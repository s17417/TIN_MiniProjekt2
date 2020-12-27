const express = require('express');
const { showLabTestList, showAddLabTestForm, showLabTestDetails, deleteLabtest, updateLabTest, addLabTest, showEditLabTestForm } = require('../controllers/labTestController');
const router = express.Router();


router.get('/', showLabTestList);
router.get('/add', showAddLabTestForm);
router.get('/edit/:testId', showEditLabTestForm);
router.get('/details/:testId', showLabTestDetails);
router.post('/add', addLabTest); 
router.post('/edit', updateLabTest);
router.get('/delete/:testId', deleteLabtest);

module.exports = router;