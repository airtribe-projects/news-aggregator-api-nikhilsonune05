const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { login, signUp, logOut } = userController;

router.post('/register', signUp);

router.post('/login', login);

router.get('/logout', logOut);

module.exports = router;
