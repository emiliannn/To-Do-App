const router = require('express')();
const tasks = require('./tasks');
router.use(require('express').json())  
router.use(require('express').urlencoded({ extended: true })) 

module.exports = tasks;