const express = require('express');
const router = express.Router();

const labTestApiController = require('../../api/LabTestAPI');

router.get('/', labTestApiController.getLabTests);
router.get('/:labId', labTestApiController.getLabTestById);
router.post('/', labTestApiController.createLabTest);
router.put('/:labId', labTestApiController.updateLabTest);
router.delete('/:labId', labTestApiController.deleteLabTest);

module.exports = router;