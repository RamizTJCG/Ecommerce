const express = require('express');
const router = express.Router();

// const { accessLevelVerifier, isAdminVerifier } = require('../middlewares/auth');
const { RegisterController } = require('../controllers');

router.get('/',RegisterController.home);
router.get('/login',RegisterController.login);
router.post('/login',RegisterController.loginSubmit);

router.get('/register',RegisterController.register);
router.post('/register',RegisterController.registerSubmit);


module.exports = router;
