const express = require('express');
const api = express.Router();

const posts = require('./posts');
const tasks = require('./tasks');
const auth = require('./auth');

api.use('/posts', posts);
api.use('/tasks', tasks);
api.use('/auth', auth);

module.exports = api;