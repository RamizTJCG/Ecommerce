const express = require('express');
const router = express.Router();

// const { accessLevelVerifier, isAdminVerifier } = require('../middlewares/auth');
const { RegisterController } = require('../controllers');

const test = router.get('/',RegisterController.register);

module.exports = test;
