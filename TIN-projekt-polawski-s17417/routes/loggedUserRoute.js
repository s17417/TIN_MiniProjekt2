const express = require('express');
const router = express.Router();
const loggedUserController = require('../controllers/loggedUserController');

router.get('/', loggedUserController.showUsersList);
router.get('/add', loggedUserController.showAddUserForm);
router.get('/edit/:usrId', loggedUserController.showEditUserForm);
router.get('/details/:usrId', loggedUserController.showLoggedUserDetails);
router.post('/add', loggedUserController.addLoggedUser); 
router.post('/edit', loggedUserController.updateLoggedUser);
router.get('/delete/:usrId', loggedUserController.deleteLoggedUser);

module.exports = router;