const express = require('express');
const tasks = express.Router();

const tasksCtrl = require('./tasks.ctrl');



tasks.get('/', tasksCtrl.list);
tasks.post('/', tasksCtrl.write);
tasks.delete('/', tasksCtrl.remove);
tasks.patch('/', tasksCtrl.update);

module.exports = tasks;