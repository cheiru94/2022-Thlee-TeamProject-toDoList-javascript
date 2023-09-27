const express = require('express');
const auth = express.Router();

const authCtrl = require('./auth.ctrl');

auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.register);
auth.get('/logout', authCtrl.logout);


module.exports = auth;
