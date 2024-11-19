const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


console.log('userController:', userController);

console.log('userController.login:', userController.login ? 'Defined' : 'Undefined');



router.post('/login', userController.login);


router.post('/create-account', userController.createAccount);


router.get('/account-info', userController.getAccountInfo);


router.put('/account-info', userController.updateAccountInfo);


router.delete('/account-info', userController.deleteAccount);

module.exports = router;
