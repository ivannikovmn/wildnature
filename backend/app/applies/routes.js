const express = require('express')
const router = express.Router();
const passport = require('passport')
const {createApply, getEmployeeAplies, deleteApply} = require('./contollers')
const {isEmployee} = require('../auth/middlewares')
const {validateApply, isAuthorOfApply} = require('./middlewares')

router.post('/api/applies', passport.authenticate('jwt', { session: false }), isEmployee, validateApply, createApply)
router.get('/api/applies/employee', passport.authenticate('jwt', { session: false }), isEmployee, getEmployeeAplies)
router.delete('/api/applies/:id', passport.authenticate('jwt', { session: false }), isEmployee, isAuthorOfApply, deleteApply)

module.exports = router;